/**
 * Index all lesson content into pgvector for RAG-powered coaching.
 * Run: npx tsx scripts/index-lesson-embeddings.ts
 *
 * Requires DATABASE_URL and OPENAI_API_KEY (or OPENROUTER_API_KEY) in environment.
 */

import pg from "pg";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import OpenAI from "openai";
import { CURRICULUM } from "../lib/data/curriculum";

const CONTENT_PATH = path.join(process.cwd(), "server/data/content");
const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 100;
const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSIONS = 1536;
const BATCH_SIZE = 20;
const SYSTEM_USER_ID = "__system__"; // Lesson embeddings aren't user-specific

function getOpenAIClient(): OpenAI {
  if (process.env.OPENROUTER_API_KEY) {
    return new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });
  }
  if (process.env.OPENAI_API_KEY) {
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  throw new Error("Set OPENAI_API_KEY or OPENROUTER_API_KEY");
}

function chunkText(
  text: string,
): { text: string; charStart: number; charEnd: number }[] {
  const chunks: { text: string; charStart: number; charEnd: number }[] = [];
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return chunks;

  let start = 0;
  while (start < cleaned.length && chunks.length < 200) {
    const end = Math.min(start + CHUNK_SIZE, cleaned.length);
    let sliceEnd = end;

    if (end < cleaned.length) {
      const lastPeriod = cleaned.lastIndexOf(". ", end);
      const lastNewline = cleaned.lastIndexOf("\n", end);
      const breakPoint = Math.max(lastPeriod, lastNewline);
      if (breakPoint > start + CHUNK_SIZE * 0.5) {
        sliceEnd = breakPoint + 1;
      }
    }

    const chunk = cleaned.slice(start, sliceEnd).trim();
    if (chunk.length > 20) {
      chunks.push({ text: chunk, charStart: start, charEnd: sliceEnd });
    }
    start = sliceEnd - CHUNK_OVERLAP;
    const lastStart = chunks[chunks.length - 1]?.charStart ?? -1;
    if (start <= lastStart) {
      start = sliceEnd;
    }
  }
  return chunks;
}

function stripMarkdownComponents(content: string): string {
  // Remove MDX component tags, import statements, and code fences with JSON quizzes
  return content
    .replace(/^import\s+.*$/gm, "")
    .replace(/<[A-Z][^>]*\/>/g, "")
    .replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, "")
    .replace(/```json[\s\S]*?```/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .trim();
}

async function generateEmbeddings(
  client: OpenAI,
  texts: string[],
): Promise<number[][]> {
  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
    dimensions: EMBEDDING_DIMENSIONS,
  });
  return response.data
    .sort((a, b) => a.index - b.index)
    .map((d) => d.embedding);
}

async function indexLessons() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const pool = new pg.Pool({ connectionString });
  const client = getOpenAIClient();

  // Ensure system user exists for lesson embeddings
  await pool.query(`
    INSERT INTO "user" (id, email, hashed_password, email_verified)
    VALUES ('__system__', 'system@internal', 'not-a-real-hash', true)
    ON CONFLICT (id) DO NOTHING
  `);

  // Clear old lesson embeddings
  await pool.query(`DELETE FROM document_embedding WHERE source = 'lesson'`);
  console.log("Cleared old lesson embeddings.");

  let totalChunks = 0;
  let totalLessons = 0;
  let errors = 0;

  for (const track of CURRICULUM) {
    for (const course of track.courses) {
      for (const lesson of course.lessons) {
        const filePath = path.join(
          CONTENT_PATH,
          track.id,
          course.id,
          `lesson-${lesson.id}.md`,
        );

        try {
          const raw = await fs.readFile(filePath, "utf-8");
          const { content } = matter(raw);
          const plainText = stripMarkdownComponents(content);

          if (plainText.length < 50) {
            console.log(
              `  [skip] ${course.id}/lesson-${lesson.id} (too short)`,
            );
            continue;
          }

          const chunks = chunkText(plainText);
          if (chunks.length === 0) continue;

          // Generate embeddings in batches
          const allEmbeddings: number[][] = [];
          for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
            const batch = chunks.slice(i, i + BATCH_SIZE).map((c) => c.text);
            const embeddings = await generateEmbeddings(client, batch);
            allEmbeddings.push(...embeddings);
          }

          // Insert all chunks
          const documentId = `lesson:${course.id}:${lesson.id}`;
          for (let i = 0; i < chunks.length; i++) {
            const embeddingStr = `[${allEmbeddings[i].join(",")}]`;
            await pool.query(
              `INSERT INTO document_embedding (user_id, document_id, chunk_index, chunk_text, embedding, source, metadata)
               VALUES ($1, $2, $3, $4, $5::vector, 'lesson', $6)`,
              [
                SYSTEM_USER_ID,
                documentId,
                i,
                chunks[i].text,
                embeddingStr,
                JSON.stringify({
                  trackId: track.id,
                  courseId: course.id,
                  lessonId: lesson.id,
                  lessonTitle: lesson.title,
                  courseTitle: course.title,
                  charStart: chunks[i].charStart,
                  charEnd: chunks[i].charEnd,
                }),
              ],
            );
          }

          totalChunks += chunks.length;
          totalLessons++;
          console.log(
            `  [ok] ${course.id}/lesson-${lesson.id}: "${lesson.title}" (${chunks.length} chunks)`,
          );
        } catch (err) {
          errors++;
          console.error(`  [error] ${course.id}/lesson-${lesson.id}: ${err}`);
        }
      }
    }
  }

  await pool.end();
  console.log(
    `\nDone. ${totalLessons} lessons indexed, ${totalChunks} chunks, ${errors} errors.`,
  );
}

indexLessons();
