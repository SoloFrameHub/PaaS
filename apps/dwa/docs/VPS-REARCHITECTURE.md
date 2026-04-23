# Course Platform VPS Rearchitecture (Google-Free)

Re-architecting the course platform to run on a **Hostinger KVM 8 VPS (32GB RAM)** via **Coolify**, with **no reliance on Genkit, Gemini, or any Google products**. Stack is TypeScript-native and self-hostable.

---

## Current Dependencies to Remove

| Area | Current (Google) | Notes |
|------|------------------|--------|
| **AI / LLM** | Genkit + Gemini | All flows: coaching chat, roleplay, ICP validation, onboarding analyze, RAG, assessment generator |
| **Auth** | Firebase Auth | Session cookies verified via Firebase Admin |
| **Database** | Firestore | Profiles, curriculum state, onboarding, etc. |
| **Storage** | Firebase Storage | Uploads, assets |
| **RAG / Search** | Vertex AI Discovery Engine | Document search for coaching/RAG |
| **TTS / STT** | Google Cloud Text-to-Speech, Speech-to-Text | Voice features |
| **Hosting** | Firebase App Hosting | Move to Coolify on VPS |

---

## Coolify & VPS

- **Coolify**: Already configured at `COOLIFY_BASE_URL` / `COOLIFY_API_KEY` in `.env.local`.
- **Inspect existing VPS** (servers, projects, deployments):
  ```bash
  npx tsx scripts/coolify-inspect.ts
  ```
- Coolify API: [List Servers](https://coolify.io/docs/api-reference/api/operations/list-servers), [List Projects](https://coolify.io/docs/api-reference/api/operations/list-projects), [List Deployments](https://coolify.io/docs/api-reference/api/operations/list-deployments). Use Bearer token from `COOLIFY_API_KEY`.

---

## Recommended Tech Stack (TypeScript-Native, No Google)

### Application & API

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 16 (keep) | Already in use, TypeScript, App Router, API routes |
| **Language** | TypeScript | End-to-end TS; no Genkit/Google SDKs |

### Auth & Users

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Auth** | **Lucia** or **NextAuth.js** | TypeScript-native, session-based, no Firebase |
| **Session store** | **Redis** (already have `ioredis`) or **Postgres** | Same VPS; Redis for speed, Postgres for single-DB simplicity |

### Data & Storage

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Primary DB** | **PostgreSQL** | Single relational DB; run in Docker on VPS or use Supabase/Neon if you prefer managed |
| **ORM / types** | **Drizzle** or **Prisma** | TypeScript-native, migrations, type-safe |
| **File storage** | **S3-compatible** (MinIO on VPS or **Cloudflare R2**) | No Firebase Storage; R2 no egress fees |
| **RAG / vectors** | **pgvector** (Postgres extension) or **Qdrant** (Docker) | Replace Vertex AI Search; TypeScript SDKs available |

### AI (No Genkit, No Gemini)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **LLM / chat** | **Vercel AI SDK** (`ai`, `@ai-sdk/openai`, `@ai-sdk/anthropic`) or **OpenAI SDK** | TypeScript-native; supports OpenAI, Anthropic, and local (e.g. Ollama) |
| **Structured output** | **Vercel AI SDK** + Zod or **OpenAI** with response format | Replace Genkit flows with typed TS functions |
| **TTS** | **OpenAI TTS** or **ElevenLabs** or **Piper** (self-hosted) | Replace Google Cloud TTS |
| **STT** | **OpenAI Whisper** (API or self-hosted) or **Vosk** (self-hosted) | Replace Google Cloud Speech-to-Text |

### Background Jobs & Workers

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Job queue** | **Trigger.dev** (self-hosted on same VPS) | TypeScript-native tasks; Docker Compose; no Google/Genkit |
| **Use cases** | Onboarding analysis, RAG indexing, assessment generation, heavy AI flows | Offload from Next.js API routes; retries, logs, dashboard |

Trigger.dev self-hosted: [Overview](https://trigger.dev/docs/self-hosting/overview), [Docker Compose](https://trigger.dev/docs/self-hosting/docker). Rough needs: Webapp ~3 vCPU / 6GB RAM; Worker ~4 vCPU / 8GB RAM; combined fits 32GB VPS.

### Analytics & Product

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Analytics** | **Plausible** (self-hosted) or **Umami** or **PostHog** (self-hosted) | Privacy-friendly, TS-friendly; run in Docker on VPS |

### Observability & Backup

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Monitoring** | **Uptime Kuma** (Docker) + Coolify dashboard | HTTP/checks; Coolify for deploy status |
| **Logs / APM** | **Coolify logs** or **Grafana Loki** (optional) | Centralized logs on VPS |
| **Backup** | **restic** or **Borg** to S3-compatible (R2/MinIO) or VPS snapshots | Postgres dumps + app data; automated cron on VPS |

---

## High-Level Architecture (Post-Migration)

```
[ Coolify on VPS ]
├── Next.js app (Node, PM2 or Docker)
├── PostgreSQL (+ pgvector)
├── Redis (sessions / cache)
├── MinIO or R2 (object storage)
├── Trigger.dev (Docker Compose: webapp + worker)
├── Umami / Plausible / PostHog (analytics)
├── Uptime Kuma (monitoring)
└── Optional: Qdrant (if not using pgvector)
```

External APIs only: **OpenAI** (and/or **Anthropic**), **ElevenLabs** (if used), **Mailgun** (existing), **n8n** (existing). No Google/Genkit/Firebase/Vertex.

---

## Migration Order (Suggested)

1. **Database & Auth**  
   - Introduce Postgres + Drizzle/Prisma; define schema (users, profiles, curriculum state).  
   - Implement Lucia or NextAuth with Postgres (and optionally Redis) session.  
   - Migrate Firestore data to Postgres; dual-write or one-time ETL.  
   - Remove Firebase Auth and Firestore from app and env.

2. **Storage**  
   - Add S3-compatible client (e.g. `@aws-sdk/client-s3` with R2 or MinIO).  
   - Migrate Firebase Storage assets; switch uploads to S3-compatible.  
   - Remove Firebase Storage.

3. **AI layer (no Genkit/Gemini)**  
   - Replace Genkit flows with Vercel AI SDK or OpenAI SDK: coaching chat, roleplay, ICP validation, onboarding analyze, assessment generator.  
   - Replace Vertex AI RAG with pgvector (or Qdrant): index documents, implement retriever in TS.  
   - Replace Google TTS/STT with OpenAI (or chosen TTS/STT).  
   - Remove Genkit, Gemini, Vertex, and all `@google-cloud/*` / `genkit` deps.

4. **Background jobs**  
   - Deploy Trigger.dev (Docker Compose) on VPS.  
   - Move long-running or heavy AI flows to Trigger.dev tasks; call from Next.js via Trigger.dev client.  
   - Remove any remaining Genkit usage.

5. **Deploy & ops**  
   - Deploy Next.js app via Coolify (Docker or Node).  
   - Configure analytics, Uptime Kuma, backups (restic/Borg + S3-compatible).  
   - Retire Firebase App Hosting and all Google config (env, `apphosting.yaml`).

---

## Env / Config Cleanup (After Migration)

Remove from `.env.local` and any Coolify/App Hosting config:

- All `FIREBASE_*`, `NEXT_PUBLIC_FIREBASE_*`
- `GOOGLE_GENAI_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS`
- `VERTEX_AI_*`
- Genkit/Google-specific vars

Keep or add:

- `COOLIFY_BASE_URL`, `COOLIFY_API_KEY`
- `DATABASE_URL` (Postgres)
- `REDIS_URL` (if used)
- `S3_*` or `R2_*` for object storage
- **`OPENAI_API_KEY`** — required for AI (coaching chat uses OpenAI; optional `OPENAI_CHAT_MODEL`, default `gpt-4o-mini`)
- `TRIGGER_SECRET_KEY`, `TRIGGER_API_URL` (self-hosted Trigger.dev)
- Existing: `N8N_*`, `MAILGUN_*`, `LISTMONK_*`, etc.

---

## Summary

- **No Genkit, Gemini, or Google products**: auth → Lucia/NextAuth + Postgres; DB → Postgres; storage → S3-compatible; AI → Vercel AI SDK / OpenAI (and/or Anthropic, Ollama); RAG → pgvector or Qdrant; TTS/STT → OpenAI or self-hosted.
- **TypeScript-native**: Next.js, Drizzle/Prisma, Vercel AI SDK, Trigger.dev, Lucia/NextAuth.
- **VPS**: Single Hostinger KVM 8 (32GB) with Coolify; Trigger.dev, Postgres, Redis, optional MinIO/Umami/Uptime Kuma on same box; analytics, monitoring, and backup as above.

Use `npx tsx scripts/coolify-inspect.ts` to inspect the current Coolify VPS before and during migration.
