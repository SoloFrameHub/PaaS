/**
 * RAG (Retrieval-Augmented Generation) for the Provider Portal
 *
 * Flow:
 *   1. Embeddings are seeded once via scripts/seed-embeddings.ts
 *   2. Provider submits a natural-language query
 *   3. Query is embedded with text-embedding-3-small
 *   4. Top-K chunks retrieved via cosine similarity (computed in JS)
 *   5. Retrieved chunks passed to LLM → synthesized answer
 *
 * No pgvector required — embeddings stored as JSONB float arrays.
 */

import OpenAI from 'openai';
import { getDb } from '@/lib/db';
import { contentEmbedding } from '@/lib/db/schema';
import { aiClient } from './client';
import { logger } from '@/lib/logger';

// Dedicated embedding client — always direct OpenAI (embeddings not routed via OpenRouter)
const embeddingClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMS = 1536;

// ─── Embedding ───────────────────────────────────────────────────────────────

export async function embedText(text: string): Promise<number[]> {
  const res = await embeddingClient.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text.slice(0, 8000), // model limit
  });
  return res.data[0].embedding;
}

// ─── Cosine similarity (pure JS) ─────────────────────────────────────────────

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot   += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

// ─── Retrieval ────────────────────────────────────────────────────────────────

export interface RetrievedChunk {
  id: number;
  sourceType: string;
  sourceId: string;
  title: string;
  body: string;
  score: number;
  metadata: Record<string, unknown> | null;
}

export async function retrieveChunks(
  queryEmbedding: number[],
  topK = 6,
  sourceFilter?: string, // 'course' | 'assessment' | 'clinical'
): Promise<RetrievedChunk[]> {
  const db = getDb();
  if (!db) return [];

  // Load all embeddings (hard cap: 1000 rows to bound memory usage)
  const rows = await db.select({
    id:         contentEmbedding.id,
    sourceType: contentEmbedding.sourceType,
    sourceId:   contentEmbedding.sourceId,
    title:      contentEmbedding.title,
    body:       contentEmbedding.body,
    embedding:  contentEmbedding.embedding,
    metadata:   contentEmbedding.metadata,
  }).from(contentEmbedding).limit(1000);

  const scored = rows
    .filter(r => !sourceFilter || r.sourceType === sourceFilter)
    .map(r => ({
      id:         r.id,
      sourceType: r.sourceType,
      sourceId:   r.sourceId,
      title:      r.title,
      body:       r.body,
      score:      cosineSimilarity(queryEmbedding, r.embedding as number[]),
      metadata:   r.metadata as Record<string, unknown> | null,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}

// ─── RAG answer synthesis ─────────────────────────────────────────────────────

export interface RAGResult {
  answer: string;
  sources: Array<{ title: string; sourceId: string; sourceType: string; score: number }>;
  model: string;
}

export async function ragQuery(
  query: string,
  options: { topK?: number; sourceFilter?: string } = {},
): Promise<RAGResult> {
  const queryEmbedding = await embedText(query);
  const chunks = await retrieveChunks(queryEmbedding, options.topK ?? 6, options.sourceFilter);

  if (chunks.length === 0) {
    return {
      answer: 'No relevant content found in the knowledge base for this query.',
      sources: [],
      model: 'none',
    };
  }

  const contextBlock = chunks
    .map((c, i) => `[${i + 1}] ${c.title}\n${c.body}`)
    .join('\n\n---\n\n');

  const systemPrompt = `You are a clinical support assistant for mental health providers.
Answer the provider's question using ONLY the retrieved course content below.
Be concise, clinically accurate, and cite which section is most relevant.
Never fabricate clinical claims beyond what the content states.`;

  const userPrompt = `Provider question: ${query}

Retrieved content:
${contextBlock}

Provide a helpful, clinically grounded answer based on the above content.`;

  const model = 'gpt-4o-mini';
  const completion = await aiClient.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: 600,
    temperature: 0.3,
  });

  return {
    answer: completion.choices[0].message.content ?? '',
    sources: chunks.map(c => ({
      title:      c.title,
      sourceId:   c.sourceId,
      sourceType: c.sourceType,
      score:      Math.round(c.score * 100) / 100,
    })),
    model,
  };
}

// ─── Session prep brief ───────────────────────────────────────────────────────

export interface SessionPrepContext {
  patientAlias: string;          // provider-set display name (no real name)
  recentAlerts: string[];        // distress level strings
  completedCourses: string[];
  currentCourse: string | null;
  latestMoodRating: number | null;
  latestAnxietyLevel: number | null;
  latestSleepQuality: number | null;
  pendingAssignments: string[];
  providerNotes: string | null;
}

export async function generateSessionPrepBrief(ctx: SessionPrepContext): Promise<string> {
  const prompt = `You are a clinical assistant generating a concise session preparation brief
for a mental health provider. The patient's identity is anonymized.

Patient alias: ${ctx.patientAlias}
Recent distress alerts: ${ctx.recentAlerts.length > 0 ? ctx.recentAlerts.join(', ') : 'None'}
Completed courses: ${ctx.completedCourses.length > 0 ? ctx.completedCourses.join(', ') : 'None'}
Current course: ${ctx.currentCourse ?? 'None'}
Pending assignments: ${ctx.pendingAssignments.length > 0 ? ctx.pendingAssignments.join(', ') : 'None'}
Most recent mood (1-10): ${ctx.latestMoodRating ?? 'N/A'}
Most recent anxiety (1-10): ${ctx.latestAnxietyLevel ?? 'N/A'}
Most recent sleep (1-10): ${ctx.latestSleepQuality ?? 'N/A'}
Provider notes: ${ctx.providerNotes ?? 'None'}

Generate a concise session prep brief (5-8 bullet points) covering:
- Key things to check in on based on recent data
- Progress made (completed courses, assignments)
- Areas of concern (alerts, poor sleep/mood)
- Suggested session focus topics
Keep it clinical, brief, and actionable.`;

  const completion = await aiClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
    temperature: 0.4,
  });

  return completion.choices[0].message.content ?? '';
}

// ─── Embedding insertion helper (used by seed script) ────────────────────────

export interface ContentChunk {
  sourceType: string;
  sourceId: string;
  chunkIndex: number;
  title: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export async function upsertEmbedding(chunk: ContentChunk): Promise<void> {
  const db = getDb();
  if (!db) throw new Error('No database connection');

  const embedding = await embedText(`${chunk.title}\n\n${chunk.body}`);

  await db.insert(contentEmbedding).values({
    sourceType:  chunk.sourceType,
    sourceId:    chunk.sourceId,
    chunkIndex:  chunk.chunkIndex,
    title:       chunk.title,
    body:        chunk.body,
    embedding,
    metadata:    chunk.metadata ?? {},
  }).onConflictDoNothing();
}
