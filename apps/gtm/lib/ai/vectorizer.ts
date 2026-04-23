/**
 * Document vectorizer — chunks text and generates embeddings via OpenAI.
 * Stores results in the document_embedding table via pgvector.
 */

import { aiClient } from "./client";
import { getDb } from "../db";
import { documentEmbedding } from "../db/schema";
import { eq, and } from "drizzle-orm";

const CHUNK_SIZE = 800; // ~200 tokens per chunk
const CHUNK_OVERLAP = 100;
const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSIONS = 1536;
const MAX_CHUNKS_PER_DOC = 200;

/** Split text into overlapping chunks. */
export function chunkText(
  text: string,
  chunkSize = CHUNK_SIZE,
  overlap = CHUNK_OVERLAP,
): { text: string; charStart: number; charEnd: number }[] {
  const chunks: { text: string; charStart: number; charEnd: number }[] = [];
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return chunks;

  let start = 0;
  while (start < cleaned.length && chunks.length < MAX_CHUNKS_PER_DOC) {
    const end = Math.min(start + chunkSize, cleaned.length);
    let sliceEnd = end;

    // Try to break at sentence/paragraph boundary
    if (end < cleaned.length) {
      const lastPeriod = cleaned.lastIndexOf(". ", end);
      const lastNewline = cleaned.lastIndexOf("\n", end);
      const breakPoint = Math.max(lastPeriod, lastNewline);
      if (breakPoint > start + chunkSize * 0.5) {
        sliceEnd = breakPoint + 1;
      }
    }

    const chunk = cleaned.slice(start, sliceEnd).trim();
    if (chunk.length > 20) {
      chunks.push({ text: chunk, charStart: start, charEnd: sliceEnd });
    }
    start = sliceEnd - overlap;
    const lastStart = chunks[chunks.length - 1]?.charStart ?? -1;
    if (start <= lastStart) {
      start = sliceEnd;
    }
  }
  return chunks;
}

/** Generate embeddings for an array of texts (batched). */
async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];

  const response = await aiClient.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
    dimensions: EMBEDDING_DIMENSIONS,
  });

  return response.data
    .sort((a, b) => a.index - b.index)
    .map((d) => d.embedding);
}

/** Vectorize a document: chunk, embed, and store in the database. */
export async function vectorizeDocument(
  userId: string,
  documentId: string,
  content: string,
  metadata?: { fileName?: string; documentType?: string },
): Promise<{ chunkCount: number }> {
  const db = getDb();
  if (!db) throw new Error("Database not available");

  // Remove old embeddings for this document
  await db
    .delete(documentEmbedding)
    .where(
      and(
        eq(documentEmbedding.userId, userId),
        eq(documentEmbedding.documentId, documentId),
      ),
    );

  const chunks = chunkText(content);
  if (chunks.length === 0) return { chunkCount: 0 };

  // Generate embeddings in batches of 20
  const batchSize = 20;
  const allEmbeddings: number[][] = [];
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize).map((c) => c.text);
    const embeddings = await generateEmbeddings(batch);
    allEmbeddings.push(...embeddings);
  }

  // Insert all chunks with embeddings
  const rows = chunks.map((chunk, i) => ({
    userId,
    documentId,
    chunkIndex: i,
    chunkText: chunk.text,
    embedding: allEmbeddings[i],
    metadata: {
      ...metadata,
      charStart: chunk.charStart,
      charEnd: chunk.charEnd,
    },
  }));

  await db.insert(documentEmbedding).values(rows);

  return { chunkCount: chunks.length };
}

/** Delete all embeddings for a user's document. */
export async function deleteDocumentEmbeddings(
  userId: string,
  documentId: string,
): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db
    .delete(documentEmbedding)
    .where(
      and(
        eq(documentEmbedding.userId, userId),
        eq(documentEmbedding.documentId, documentId),
      ),
    );
}
