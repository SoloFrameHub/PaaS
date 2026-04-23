/**
 * RAG search service — semantic similarity search over user documents
 * using pgvector cosine distance.
 */

import { aiClient } from "../ai/client";
import { getDb } from "../db";
import { sql } from "drizzle-orm";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSIONS = 1536;

export interface RagResult {
  chunkText: string;
  similarity: number;
  source?: string;
  metadata: {
    fileName?: string;
    documentType?: string;
    trackId?: string;
    courseId?: string;
    lessonId?: string;
    lessonTitle?: string;
    courseTitle?: string;
    charStart?: number;
    charEnd?: number;
  } | null;
}

/** Generate a single query embedding. */
async function embedQuery(query: string): Promise<number[]> {
  try {
    const response = await aiClient.embeddings.create({
      model: EMBEDDING_MODEL,
      input: query,
      dimensions: EMBEDDING_DIMENSIONS,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("[embedQuery] failed:", error);
    throw error;
  }
}

/**
 * Search a user's documents for semantically similar chunks.
 * Uses pgvector cosine distance (<=> operator).
 */
export async function searchDocuments(
  userId: string,
  query: string,
  options: {
    limit?: number;
    minSimilarity?: number;
    includeLessons?: boolean;
  } = {},
): Promise<RagResult[]> {
  try {
    const db = getDb();
    if (!db) return [];

    const { limit = 5, minSimilarity = 0.3, includeLessons = true } = options;
    const queryEmbedding = await embedQuery(query);
    const embeddingStr = `[${queryEmbedding.join(",")}]`;

    // Search user documents + shared lesson content
    const userFilter = includeLessons
      ? sql`(user_id = ${userId} OR source = 'lesson')`
      : sql`user_id = ${userId}`;

    const results = await db.execute(sql`
      SELECT
        chunk_text,
        source,
        metadata,
        1 - (embedding <=> ${embeddingStr}::vector) AS similarity
      FROM document_embedding
      WHERE ${userFilter}
        AND 1 - (embedding <=> ${embeddingStr}::vector) > ${minSimilarity}
      ORDER BY embedding <=> ${embeddingStr}::vector
      LIMIT ${limit}
    `);

    return (results.rows as any[]).map((row) => ({
      chunkText: row.chunk_text,
      similarity: parseFloat(row.similarity),
      source: row.source as string,
      metadata: row.metadata,
    }));
  } catch (error) {
    console.error("[searchDocuments] failed:", error);
    throw error;
  }
}

/**
 * Build a RAG context string for AI prompts from a user's documents.
 * Returns the top matching chunks formatted for injection into a prompt.
 */
export async function buildRagContext(
  userId: string,
  query: string,
  options: { maxChunks?: number; maxChars?: number } = {},
): Promise<string> {
  try {
    const { maxChunks = 5, maxChars = 3000 } = options;
    const results = await searchDocuments(userId, query, { limit: maxChunks });

    if (results.length === 0) return "";

    let context = "";
    for (const result of results) {
      let label = "";
      if (result.source === "lesson" && result.metadata?.lessonTitle) {
        label = ` (from lesson: "${result.metadata.lessonTitle}" in ${result.metadata.courseTitle || result.metadata.courseId})`;
      } else if (result.metadata?.fileName) {
        label = ` (from uploaded doc: ${result.metadata.fileName})`;
      }
      const entry = `---${label}\n${result.chunkText}\n`;
      if (context.length + entry.length > maxChars) break;
      context += entry;
    }

    return context;
  } catch (error) {
    console.error("[buildRagContext] failed:", error);
    throw error;
  }
}
