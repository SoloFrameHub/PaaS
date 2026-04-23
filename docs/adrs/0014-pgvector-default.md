# ADR 0014 — pgvector default; adapter ready for Qdrant

- **Status:** Accepted
- **Date:** 2026-04-22

## Context
A separate vector DB (Qdrant, Pinecone, Weaviate) means a second store to back up, monitor, and tenant-isolate. pgvector with HNSW is good enough through ~10M chunks per tenant.

## Decision
Default vector store is pgvector in the shared Postgres, HNSW indexed, RLS-scoped. The interface in `@platform/knowledge-engine` is adapter-shaped so a Qdrant backend can drop in without rewriting callers. **Stop using JSONB float arrays** in the legacy `lib/ai/rag.ts` by Day 17. (Hard Decisions §C.8, Implementation Blueprint §6.6.)

## Consequences
- **Good:** one DB, RLS by construction, transactional writes with knowledge metadata.
- **Acceptable cost:** index build time on large corpora; query plan tuning per tenant if a corpus is huge.
- **Trigger to revisit:** any tenant exceeds ~10M chunks, or HNSW recall falls below product target — then move that tenant to Qdrant.

## Killed alternatives
- Per-tenant separate vector DB.
- JSONB float arrays (deprecated).
