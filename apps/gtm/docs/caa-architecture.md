# Customer Acquisition Academy (CAA) - Architecture Documentation

> Last updated: February 2026

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Application Architecture](#application-architecture)
5. [Database Layer](#database-layer)
6. [Authentication & Authorization](#authentication--authorization)
7. [AI & LLM Integration](#ai--llm-integration)
8. [Forum & Community System](#forum--community-system)
9. [Background Jobs (Trigger.dev)](#background-jobs-triggerdev)
10. [Payments (Polar.sh)](#payments-polarsh)
11. [Storage (S3/MinIO)](#storage-s3minio)
12. [Caching (Redis)](#caching-redis)
13. [Email (Resend)](#email-resend)
14. [Deployment Architecture](#deployment-architecture)
15. [Networking & SSL/TLS](#networking--ssltls)
16. [API Reference](#api-reference)
17. [Security Model](#security-model)
18. [Ops & Monitoring](#ops--monitoring)

---

## Overview

The Customer Acquisition Academy (CAA) is a B2B SaaS learning platform that teaches solo technical founders how to acquire customers. It combines structured courses, AI-powered coaching, sales roleplay practice, cohort-based learning pods, and an AI-moderated community forum.

### Key Capabilities

- **Structured Academy** - Multi-track curriculum with video lessons, quizzes, and progress tracking
- **AI Coaching** - Context-aware GPT-4o chat that knows the founder's business, DISC profile, and progress
- **Sales Roleplay** - Practice sales conversations with AI-generated buyer personas, with performance evaluation
- **Community Pods** - DISC-based peer matching into small groups (max 6) with AI facilitator
- **AI Forum Personas** - 4 bot personas (Alex, Jordan, Morgan, Sam) that engage in pod discussions with natural fade-out
- **Online Book** - Full-text searchable book reader with reading progress tracking
- **Native Forms** - Lead capture forms with scoring and workflow automation
- **Payments** - Monthly ($39/mo) and annual ($259.95/yr) subscriptions via Polar.sh

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router, Turbopack) | 16.1.6 |
| **Runtime** | Node.js | 20 (Alpine) |
| **Language** | TypeScript | 5.x |
| **UI** | React | 19.2.3 |
| **Styling** | Tailwind CSS + @tailwindcss/postcss | 4.0.3 |
| **Auth** | Lucia + @lucia-auth/adapter-drizzle | 3.2.2 |
| **ORM** | Drizzle ORM | 0.38.0 |
| **Database** | PostgreSQL | 15 |
| **Cache** | Redis (ioredis) | - |
| **AI** | OpenAI API | 6.17.0 |
| **Payments** | Polar.sh (@polar-sh/nextjs) | 0.9.3 |
| **Storage** | S3/MinIO (@aws-sdk/client-s3) | 3.700.0 |
| **Background Jobs** | Trigger.dev | 4.3.3 |
| **Forum** | NodeBB (external) | - |
| **Email** | Resend | - |
| **Testing** | Vitest (unit) + Playwright (E2E) | 3.2.4 / 1.57.0 |
| **CDN/DNS** | Cloudflare (proxied) | - |
| **Deployment** | Dokploy on VPS | - |
| **Reverse Proxy** | Traefik + Let's Encrypt | - |
| **Analytics** | Metabase + Umami | - |

---

## Project Structure

```
soloframehub-v3/
├── app/                          # Next.js App Router
│   ├── (auth)/                   #   Auth pages (signin, signup, verify, reset)
│   ├── (default)/                #   Main app routes (dashboard, academy, community, ...)
│   ├── (onboarding)/             #   Multi-step founder onboarding & assessment
│   ├── (book)/                   #   Book reader interface
│   ├── (public)/                 #   Public form pages
│   ├── (double-sidebar)/         #   Messaging & profile pages
│   └── api/                      #   47+ API route handlers
├── apps/
│   └── forms/                    # Standalone forms app (separate Next.js + Dockerfile)
├── components/                   # Shared React components (UI, charts, forms, AI)
├── hooks/                        # Custom React hooks
├── lib/                          # Core business logic
│   ├── ai/                       #   OpenAI coaching, flows, helpers
│   ├── api/                      #   Auth middleware, error handling, API client
│   ├── auth-lucia.ts             #   Lucia auth configuration
│   ├── context/                  #   React context (FounderContext)
│   ├── data/                     #   Static data (curriculum, personas, book structure)
│   ├── db/                       #   Drizzle ORM schema + client
│   ├── email/                    #   Resend email integration
│   ├── forms/                    #   Form definitions, scoring, workflows
│   ├── nodebb/                   #   NodeBB API client (singleton + retry)
│   ├── prompts/                  #   AI prompt templates (facilitator, personas)
│   ├── redis.ts                  #   Redis client (singleton + cache helpers)
│   ├── repositories/             #   Repository pattern (profile, master data)
│   ├── services/                 #   25+ business logic services
│   ├── storage/                  #   S3/MinIO client
│   ├── trigger.ts                #   Trigger.dev SDK client
│   └── validations/              #   Zod schemas (auth, onboarding, community, AI)
├── public/                       # Static assets (HTML landing pages, images, blog)
├── scripts/                      # Build, migration, and ops scripts
│   ├── docker-entrypoint.js      #   Container startup (DB migration + server)
│   ├── db-migrate.ts             #   Local dev migration
│   ├── ops/                      #   Health check, backup, restore, maintenance
│   └── seed-demo-data.sql        #   Demo data for Metabase
├── seed-data/                    # Master data JSON files
├── server/data/content/          # Course content markdown (loaded at runtime)
├── types/                        # TypeScript type definitions
├── Dockerfile                    # Multi-stage Docker build
├── middleware.ts                 # Request routing (subdomain, auth redirect, rewrites)
├── next.config.js                # Security headers, CSP, standalone output
└── package.json                  # Dependencies & scripts
```

---

## Application Architecture

### Route Groups

The Next.js App Router uses layout groups to organize pages:

| Group | Path | Purpose |
|-------|------|---------|
| `(auth)` | `/signin`, `/signup`, `/verify-email`, `/reset-password` | Authentication flows |
| `(onboarding)` | `/founder-assessment`, `/onboarding/*` | Multi-step founder assessment (DISC, business context, goals) |
| `(default)` | `/dashboard`, `/academy`, `/community`, `/coach`, `/roleplay`, `/settings`, `/checkout` | Main protected app |
| `(book)` | `/book/[chapterSlug]` | Online book reader |
| `(public)` | `/forms/[slug]` | Public form submissions |
| `(double-sidebar)` | `/messages`, `/inbox`, `/community/profile` | Messaging & profiles |

### Middleware Routing

`middleware.ts` handles:
- **www to non-www** redirect (301 for SEO)
- **Root URL**: authenticated users → `/dashboard`; unauthenticated → `/home.html`
- **Subdomain mapping**: `ai-solo-gtm-os.soloframehub.com` → landing page HTML
- **Directory rewrites**: `/blog` → `/blog/index.html`, `/es` → `/es/index.html`

### Service Layer Architecture

```
API Route Handler
    ↓ validates request (Zod)
    ↓ checks auth (withAuth middleware)
    ↓
Service Layer (lib/services/)
    ↓ business logic, orchestration
    ↓
Repository Layer (lib/repositories/)
    ↓ data access abstraction
    ↓
Drizzle ORM → PostgreSQL
```

Key services:

| Service | Responsibility |
|---------|---------------|
| `profileService` | Founder profile CRUD (facade over core + context services) |
| `profileCoreService` | Core getOrCreate, get, update operations |
| `profileContextService` | Safe context extraction for AI (no PII in prompts) |
| `onboardingService` | Multi-step onboarding flow, DISC calculation, founder category |
| `quizService` | Quiz loading, answer evaluation, learning plan generation |
| `roleplayService` | Sales roleplay sessions with AI buyer personas |
| `voiceService` | TTS (text-to-speech) and STT (speech-to-text) via OpenAI Whisper |
| `podService` | Pod lifecycle: create, add/remove members, health scoring |
| `podMatchingService` | DISC-based matching algorithm with hard/soft constraints |
| `facilitatorService` | AI weekly rhythm: Mon kickoff, Wed nudge, Fri synthesis |
| `personaService` | AI persona responses with rate limiting and fade-out logic |
| `forumStructureService` | NodeBB category hierarchy and bot account setup |
| `forumSyncService` | Sync NodeBB topics/posts to Postgres for Metabase |
| `milestoneService` | Achievement celebrations posted to forum |

---

## Database Layer

### Technology

- **PostgreSQL 15** accessed via **Drizzle ORM** (0.38.0)
- Connection pooling via `pg.Pool`
- Schema defined in `lib/db/schema.ts`

### Migration Strategy

Idempotent `CREATE TABLE IF NOT EXISTS` embedded in `scripts/docker-entrypoint.js` (~520 lines of SQL). Runs automatically at container startup before the Next.js server starts. No Drizzle migration files needed.

### Tables

**Auth & Profile (3 tables)**:
| Table | Purpose |
|-------|---------|
| `user` | Lucia auth (email, hashed_password, email_verified, verification_code) |
| `session` | Lucia sessions (id, user_id, expires_at) |
| `profile` | Founder profile (JSONB: business context, DISC, onboarding state) |

**Subscriptions & Purchases (2)**:
| Table | Purpose |
|-------|---------|
| `subscription` | Polar.sh subscription tracking (status, plan, period dates) |
| `book_purchase` | One-time book purchases via Polar |

**Academy & Learning (4)**:
| Table | Purpose |
|-------|---------|
| `lesson_event` | Lesson completion events (user, course, lesson, timestamp) |
| `chat_session` / `chat_message` | AI coaching chat history |
| `assessment_snapshot` | Founder readiness assessment (6-dimension scoring, 0-100) |
| `roleplay_session` | Sales roleplay transcripts & AI evaluations |

**Forum & Community (9)**:
| Table | Purpose |
|-------|---------|
| `pod` | Peer learning groups (name, max 6 members, curriculum stage) |
| `pod_member` | Pod membership with engagement scores |
| `member_matching_profile` | DISC profile + business context for matching algorithm |
| `pod_activity` | Pod event tracking (posts, milestones) |
| `facilitator_context` | Weekly AI facilitator summaries per pod |
| `persona_activity` | Bot persona posting rate limiting & fade-out |
| `forum_analytics_event` | Forum engagement analytics |
| `forum_topic_sync` / `forum_post_sync` | NodeBB data mirrored to Postgres for Metabase |

**Books (3)**:
| Table | Purpose |
|-------|---------|
| `book_search_index` | Full-text search index (PostgreSQL tsvector) |
| `book_reading_event` | Reading progress tracking |
| `book_purchase` | One-time purchase records |

**Forms (2)**:
| Table | Purpose |
|-------|---------|
| `form_submission` | Native form submissions with lead scoring |
| `form_workflow_log` | Form workflow automation log |

**Analytics & Content (3)**:
| Table | Purpose |
|-------|---------|
| `content_version` | Audit trail for curriculum/content changes |
| `social_signal` | Social media mention tracking |
| `seo_research` | NeuronWriter SEO research data |

### Metabase Views

The entrypoint also creates analytics views for Metabase dashboards:
- `v_user_progress` - Aggregated user progress
- `v_completed_lessons_flat` - Denormalized lesson completions
- `v_assessment_scores` - Assessment dimension scores
- Plus 7+ more views

---

## Authentication & Authorization

### Stack

- **Lucia v3.2.2** with PostgreSQL adapter (Drizzle)
- **Argon2** password hashing (`@node-rs/argon2`)
- Session-based auth with secure cookies (in production)

### Flow

1. User signs up with email + password → Argon2 hash stored
2. 6-digit verification code emailed (15-min expiry) via Resend
3. User verifies email → `email_verified = true`
4. Lucia creates session → secure HTTP-only cookie set
5. Subsequent requests: `withAuth` middleware validates session cookie

### API Protection

- **Protected routes**: `withAuth(handler)` wrapper returns 401 if no valid session
- **Admin endpoints**: require `ADMIN_API_SECRET` (checked via Bearer token or `?secret=` query param)
- **Webhook endpoints**: validated with service-specific secrets (`NODEBB_WEBHOOK_SECRET`, Polar signature)
- **Beta access**: `BETA_EMAILS` env var whitelists allowed signups (comma-separated)

---

## AI & LLM Integration

### Provider

**OpenAI API** (v6.17.0) — replaced Firebase Genkit. Model: GPT-4o-mini (cost-effective for high volume).

### Features

| Feature | Endpoint | Description |
|---------|----------|-------------|
| **Coaching Chat** | `POST /api/ai/chat` | Streaming chat with founder context (DISC, business, progress) |
| **Sales Roleplay** | `POST /api/ai/roleplay` | Practice sales conversations with AI-generated buyer personas |
| **Roleplay Evaluation** | `POST /api/ai/roleplay/evaluate` | AI evaluates roleplay transcript; scores technique, rapport, objection handling (60s timeout) |
| **ICP Validation** | `POST /api/ai/icp-validation` | Validates Ideal Customer Profile definition |
| **Text-to-Speech** | `POST /api/ai/voice/tts` | Lesson narration via OpenAI TTS |
| **Speech-to-Text** | `POST /api/ai/voice/stt` | Transcription via OpenAI Whisper |
| **Founder Assessment** | During onboarding | Analyzes questionnaire responses, generates 6-dimension assessment |
| **Facilitator Posts** | `POST /api/admin/facilitator` | Weekly AI-generated forum posts (Mon/Wed/Fri) per pod |
| **Persona Responses** | `POST /api/internal/persona-respond` | AI-generated forum replies from 4 bot personas |

### Context Injection

AI features receive safe, PII-stripped founder context via `profileContextService.getSafeContext()`:
- DISC profile (primary + secondary type)
- Business stage, industry, deal size
- Current curriculum progress
- RAG signals (recent lessons, quiz scores)

### Prompt Architecture

```
lib/prompts/
├── facilitator/
│   ├── weekly-kickoff.ts        # Monday: set focus, introduce theme
│   ├── mid-week-nudge.ts        # Wednesday: celebrate wins, nudge quiet members
│   └── friday-synthesis.ts      # Friday: summarize learnings, preview next week
└── personas/
    ├── alex.ts                  # D-type: skeptic, demands data
    ├── jordan.ts                # I-type: builder, relationship-focused
    ├── morgan.ts                # C-type: perfectionist, process-focused
    └── sam.ts                   # S-type: mentor, empathetic
```

---

## Forum & Community System

### Architecture

The community system uses **NodeBB** as the forum engine, integrated via its Write API v3. CAA manages the forum structure, bot accounts, pod-based categories, and AI-generated content.

### NodeBB Integration

- **Client**: `lib/nodebb/client.ts` — singleton with retry (exponential backoff, max 3 attempts) and master token `_uid` injection
- **Internal URL**: `http://compose-index-open-source-sensor-4r72s9-nodebb-1:4567/api/v3` (Docker network — Cloudflare blocks external API calls)
- **Master token**: NodeBB API key requires `_uid` parameter in every request (query param for GET/DELETE, body for POST/PUT)

### Category Hierarchy

```
Academy-Wide (cid: 6)
├── Announcements (7)
├── Wins & Celebrations (8)
└── General Discussion (9)
Pods (cid: 10) ← parent for dynamic pod categories
├── Pod "Relentless Closers" (dynamic)
├── Pod "Growth Hackers" (dynamic)
└── ...
Course Discussions (11)
├── Foundation (12)
├── Lead Gen (13)
└── Sales Conversations (14)
Resources (15)
├── Templates (16)
├── Tools & Reviews (17)
└── Book Club (18)
```

### Bot Accounts

| Bot | UID | DISC Type | Personality |
|-----|-----|-----------|-------------|
| Facilitator | 2 | — | Weekly rhythm moderator |
| Alex (Skeptic) | 3 | D (Direct) | Demands data, challenges vague claims |
| Jordan (Builder) | 4 | I (Influencer) | Relationship-focused, encouraging |
| Morgan (Perfectionist) | 5 | C (Compliant) | Process-focused, detail-oriented |
| Sam (Mentor) | 6 | S (Supporter) | Empathetic, supportive |

### Pod Matching Algorithm

`podMatchingService.ts` uses a scoring system:

**Hard Constraints** (must pass):
- Curriculum stage must match (±1 stage allowed)
- Time commitment must be compatible

**Soft Scoring** (pod selection):
- DISC diversity — prefers different DISC types in the group
- Deal-size clustering — groups similar deal sizes
- Industry diversity — avoids all same industry
- Pod health — recent activity preferred over empty pods

If best match score < 0.4, creates a new pod with an auto-generated name.

### Persona Response Logic

1. User posts in pod category → NodeBB webhook fires
2. Webhook handler (`/api/webhooks/nodebb`) validates, logs analytics, updates pod activity
3. `triggerPersonaResponse()` fires Trigger.dev task with durable delay (10-60 min)
4. After delay, Trigger.dev calls `/api/internal/persona-respond`
5. Persona selected based on thread content, posting history, and rate limits
6. **Rate limiting**: 4-hour cooldown between same persona posts
7. **Fade-out**: Personas gradually reduce posting after week 3 in a pod
8. **Cap**: Max 20% of pod threads can be bot responses

---

## Background Jobs (Trigger.dev)

### Setup

- **Separate project**: `/Volumes/ext-data/github/soloframehub-trigger/` (cross-cutting, serves all platforms)
- **Cloud project**: `proj_cembbtjyifivpfhnnnhp`
- **SDK**: `@trigger.dev/sdk` v4.3.3 installed in CAA, client configured in `lib/trigger.ts`
- **Integration**: Fire-and-forget via `tasks.trigger()` — CAA does not wait for results

### Scheduled Tasks (3 of 10 free schedules)

| Schedule | Cron | Purpose |
|----------|------|---------|
| **Facilitator Rhythm** | `0 8 * * *` (daily 8am, Mon/Wed/Fri active) | AI-generated weekly posts per pod |
| **Forum Sync** | `0 2 * * *` (daily 2am) | Sync NodeBB topics/posts → Postgres for Metabase |
| **Health Check** | `*/15 * * * *` (every 15min) | System health monitoring |

### Event-Driven Tasks

| Task | Trigger | Description |
|------|---------|-------------|
| `caa-persona-delayed-response` | NodeBB webhook → `triggerPersonaResponse()` | Durable delay (10-60 min) then AI persona posts a reply |

**Why Trigger.dev?** Replaced n8n for:
- Durable delays that survive container restarts
- TypeScript-native task definitions
- Cloud-hosted — no self-hosted worker to maintain
- Better observability and retry semantics

---

## Payments (Polar.sh)

### Configuration

- **SDK**: `@polar-sh/nextjs` v0.9.3
- **Mode**: `POLAR_MODE` env var — `sandbox` for testing, `production` for live
- **Webhook**: `POST /api/webhook/polar` handles order & subscription events

### Products

| Product | Polar ID | Price |
|---------|----------|-------|
| Monthly | `a75bcdb7-34ad-4fc5-b878-b2309ea0611b` | $39/month |
| Annual | `16521213-3716-4406-9437-35f85693b71e` | $259.95/year (~$21.66/mo) |

### Flow

1. User clicks subscribe → `POST /api/checkout` creates Polar checkout session
2. Polar handles payment → redirects to `POLAR_SUCCESS_URL` (must be absolute URL)
3. Polar webhook fires → updates `subscription` table (status, plan, period dates)
4. App checks subscription status via `GET /api/subscription`

---

## Storage (S3/MinIO)

### Configuration (`lib/storage/s3.ts`)

- **Provider**: MinIO (self-hosted, S3-compatible) — also supports Cloudflare R2 or AWS S3
- **Client**: AWS SDK v3 `S3Client` with force path-style for MinIO
- **Env vars**: `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
- **Fallback**: Checks `R2_*` then `AWS_*` prefixed env vars
- **Auto-bucket**: `ensureBucket()` creates bucket if missing

### MinIO Deployment

- Deployed as Docker Compose service in Dokploy
- **Ports**: 9010 (API), 9011 (console) — internal only, not exposed to internet
- **Compose ID**: `tV-arf4pHH0BWZ83ZMYyQ`

---

## Caching (Redis)

### Configuration (`lib/redis.ts`)

- **Client**: ioredis with singleton pattern and lazy connection
- **URL**: `REDIS_URL` (default `redis://localhost:6379`)
- **Toggle**: `REDIS_ENABLED` env var can disable
- **Retry**: Max 3 retries, exponential backoff (50-2000ms)

### API

```typescript
getCache<T>(key: string): Promise<T | null>     // JSON deserialization
setCache(key, value, ttlSeconds = 3600)          // JSON + TTL (default 1h)
invalidateCache(key: string)                      // DELETE
```

### Deployment

- Redis service in Dokploy (ID: `4td-G0tekZgpkpxr8-vxn`)
- Internal Docker network only — no external port exposed

---

## Email (Resend)

- **SDK**: `resend` package via `lib/email/resend.ts`
- **Usage**: Email verification codes during signup, form submission notifications
- **Env var**: `RESEND_API_KEY`

---

## Deployment Architecture

### Infrastructure Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare (CDN/DNS)                     │
│            SSL termination, DDoS protection, proxy           │
│                    All domains proxied (orange)               │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS (Full Strict)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  VPS: 46.202.88.248                          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Dokploy Platform                       │ │
│  │              (dokploy.startupapps.cloud)                │ │
│  │                                                         │ │
│  │  ┌──────────────────┐  ┌──────────────────────────┐   │ │
│  │  │    Traefik        │  │  Let's Encrypt            │   │ │
│  │  │  Reverse Proxy    │  │  Certificate Resolver     │   │ │
│  │  └────────┬─────────┘  └──────────────────────────┘   │ │
│  │           │                                             │ │
│  │  ┌────────┴──────────────────────────────────────────┐ │ │
│  │  │              Docker Network                        │ │ │
│  │  │                                                    │ │ │
│  │  │  ┌─────────────┐ ┌────────────┐ ┌─────────────┐  │ │ │
│  │  │  │  CAA App     │ │ Forms App  │ │   NodeBB    │  │ │ │
│  │  │  │  (Next.js)   │ �� (Next.js)  │ │  (Forum)    │  │ │ │
│  │  │  │  :3000       │ │ :3000      │ │  :4567      │  │ │ │
│  │  │  └──────┬───────┘ └─────┬──────┘ └─────────────┘  │ │ │
│  │  │         │               │                           │ │ │
│  │  │  ┌──────┴───────┐ ┌────┴──────┐ ┌─────────────┐  │ │ │
│  │  │  │ PostgreSQL   │ │  Redis    │ │   MinIO     │  │ │ │
│  │  │  │   :5432      │ │  :6379   │ │ :9010/:9011 │  │ │ │
│  │  │  └──────────────┘ └──────────┘ └─────────────┘  │ │ │
│  │  │                                                    │ │ │
│  │  │  ┌─────────────┐ ┌────────────┐ ┌─────────────┐  │ │ │
│  │  │  │   Ghost     │ │  Metabase  │ │  Listmonk   │  │ │ │
│  │  │  │  (Blog)     │ │ (Analytics)│ │  (Email)    │  │ │ │
│  │  │  └─────────────┘ └────────────┘ └─────────────┘  │ │ │
│  │  │                                                    │ │ │
│  │  │  ┌─────────────┐ ┌────────────┐                   │ │ │
│  │  │  │  Typebot    │ │  n8n       │                   │ │ │
│  │  │  │ (Chatbot)   │ │ (Legacy)   │                   │ │ │
│  │  │  └─────────────┘ └────────────┘                   │ │ │
│  │  └────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

         ┌─────────────────────────┐
         │    Trigger.dev Cloud    │  ← Background jobs
         │  (separate project)     │    (schedules + events)
         └─────────────────────────┘

         ┌─────────────────────────┐
         │       Polar.sh          │  ← Payment processing
         │  (webhooks → CAA API)   │    (subscriptions)
         └─────────────────────────┘

         ┌─────────────────────────┐
         │      OpenAI API         │  ← AI/LLM
         │  (GPT-4o-mini)          │    (chat, roleplay, eval)
         └─────────────────────────┘
```

### Dokploy Projects

**CAA Project** (`iyKR7Je5owrRswqZKQlHP`):
| Service | ID | Domain | Resources |
|---------|----|--------|-----------|
| CAA App | `7tDDUfiTNW_hchmoz9qsD` | `ai-solo-gtm-os.soloframehub.com` | 2560MB RAM, 2.0 CPU |
| PostgreSQL | `4oC4KtADaWshPutMDiWyx` | internal :5432 | — |
| Redis | `4td-G0tekZgpkpxr8-vxn` | internal :6379 | — |
| MinIO | `tV-arf4pHH0BWZ83ZMYyQ` (compose) | internal :9010/:9011 | — |

**Business Apps Project** (`0pHHBGwnk-Yj4Bs1ydwOr`):
| Service | Domain |
|---------|--------|
| Ghost (blog) | `blog.soloframehub.com` |
| Metabase (analytics) | `metabase.soloframehub.com` |
| NodeBB (forum) | `ai-caa-forum.soloframehub.com` |
| Listmonk (email marketing) | `listmonk.soloframehub.com` |
| n8n (legacy workflows) | `n8n.soloframehub.com` |
| Typebot (chatbot) | `typebot.soloframehub.com` + `bot.soloframehub.com` |
| Forms App | `forms.soloframehub.com` |

**MHE Project** (`buCXGrr2qC9KfHvZhWbM7`):
| Service | Domain |
|---------|--------|
| MHE App | `mental-health-education.soloframehub.com` |
| PostgreSQL | internal |

### Docker Build

**Multi-stage Dockerfile**:

```
Stage 1: Builder (node:20-alpine)
  → npm install --legacy-peer-deps
  → npm run build (Next.js standalone output)

Stage 2: Runner (node:20-alpine)
  → Non-root user: nextjs (uid 1001)
  → Copies: .next/standalone, .next/static, public/
  → Copies: server/ (course content), docs/manuscript/ (book), seed-data/
  → Copies: scripts/docker-entrypoint.js → entrypoint.js
  → CMD: node entrypoint.js
```

**Build-time args** (embedded by Next.js):
- `NEXT_PUBLIC_POLAR_MONTHLY_ID`
- `NEXT_PUBLIC_POLAR_ANNUAL_ID`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_FORUM_URL`

**Container startup** (`docker-entrypoint.js`):
1. Run idempotent DB migration (~520 lines of CREATE TABLE IF NOT EXISTS + views)
2. Start Next.js server on port 3000

---

## Networking & SSL/TLS

### DNS & CDN

- All domains use **Cloudflare** with **proxied** (orange cloud) DNS records
- Server IP (46.202.88.248) is hidden behind Cloudflare
- Cloudflare SSL mode: **Full (Strict)** on both `soloframehub.com` and `startupapps.cloud`

### Certificate Chain

```
Client → Cloudflare (edge cert) → Traefik (Let's Encrypt cert) → App container
```

- **Traefik** uses Let's Encrypt as cert resolver (`certificateType: "letsencrypt"`)
- Let's Encrypt certs issued successfully even behind Cloudflare proxy
- Cert files stored at `/etc/dokploy/traefik/dynamic/certificates/`

### Critical: Never set `certificateType: "none"`

Setting cert type to `"none"` causes Dokploy to NOT generate Traefik router configs, making services completely inaccessible.

---

## API Reference

### Authentication (6 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/signup` | Public | Register with email/password |
| POST | `/api/auth/signin` | Public | Login |
| POST | `/api/auth/signout` | Session | Logout |
| POST | `/api/auth/verify-email` | Public | Verify email code |
| POST | `/api/auth/resend-code` | Public | Resend verification |
| GET | `/api/auth/session` | Session | Check session status |

### Profile & Onboarding (11 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/profile` | Session | Get founder profile |
| PUT | `/api/profile` | Session | Update profile fields |
| POST | `/api/onboarding/business` | Session | Save business info |
| POST | `/api/onboarding/questionnaire` | Session | Save questionnaire |
| POST | `/api/onboarding/industries` | Session | Get industries list |
| POST | `/api/onboarding/goal` | Session | Save learning goal |
| POST | `/api/onboarding/upload` | Session | Upload document |
| POST | `/api/onboarding/analyze` | Session | Analyze document |
| POST | `/api/onboarding/context` | Session | Get onboarding context |
| POST | `/api/onboarding/complete-assessment` | Session | Save DISC + assessment |
| POST | `/api/onboarding/complete` | Session | Mark onboarding done |

### Academy (2 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/academy/complete-lesson` | Session | Mark lesson complete, earn XP |
| POST | `/api/academy/quiz/[sectionId]/[courseId]/[lessonId]` | Session | Submit quiz answers |

### AI Features (6 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/ai/chat` | Session | Streaming coaching chat |
| POST | `/api/ai/roleplay` | Session | Sales roleplay conversation |
| POST | `/api/ai/roleplay/evaluate` | Session | Evaluate roleplay (60s timeout) |
| POST | `/api/ai/icp-validation` | Session | Validate ICP definition |
| POST | `/api/ai/voice/tts` | Session | Text-to-speech |
| POST | `/api/ai/voice/stt` | Session | Speech-to-text |

### Community (5 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/community/entrance-survey` | Session | Submit matching survey → assign pod |
| POST | `/api/community/matching` | Admin | Trigger matching for user |
| GET | `/api/community/pods` | Session | List user's pods |
| GET | `/api/community/pods/[podId]` | Session | Get pod details |
| POST | `/api/community/pods/[podId]/members` | Session | Get pod members |

### Books (3 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/book/search` | Session | Full-text search (tsvector) |
| POST | `/api/book/reading-event` | Session | Log reading progress |
| GET | `/api/book/reading-progress` | Session | Get reading history |

### Forms (4 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/forms/submit` | Public | Submit native form |
| GET | `/api/admin/forms` | Admin | List submissions |
| POST | `/api/admin/forms/export` | Admin | Export CSV |
| DELETE | `/api/admin/forms/[id]` | Admin | Delete submission |

### Webhooks & Internal (3 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/webhook/polar` | Polar signature | Payment events |
| POST | `/api/webhooks/nodebb` | Webhook secret | Forum topic/post events |
| POST | `/api/internal/persona-respond` | Admin secret | Trigger.dev → AI persona response |

### Admin (5 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/admin/forum-setup` | Admin | One-time NodeBB initialization |
| POST | `/api/admin/facilitator` | Admin | Trigger weekly facilitator posts |
| POST | `/api/admin/forum-sync` | Admin | Sync NodeBB → Postgres |
| POST | `/api/admin/content-version` | Admin | Log content changes |
| POST | `/api/admin/seed-demo` | Admin | Seed demo data |

### Utilities (2 endpoints)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | Public | Health check |
| GET | `/api/subscription` | Session | Subscription status |

---

## Security Model

### Container Security
- Non-root user (`nextjs`, uid 1001)
- Alpine Linux (minimal attack surface)
- No privileged Docker permissions

### Network Security
- All databases on internal Docker network (no external port exposure)
- Cloudflare DDoS protection and WAF
- HSTS headers (2 years, with preload)
- Content Security Policy (separate for marketing vs. app routes)

### Application Security
- Argon2 password hashing (`@node-rs/argon2`)
- Session-based auth (secure HTTP-only cookies in production)
- `withAuth` middleware on all protected endpoints
- Admin endpoints require `ADMIN_API_SECRET`
- Webhook validation (Polar signature, NodeBB secret)
- Safe AI context extraction (PII stripped via `profileContextService.getSafeContext()`)
- Allowed-fields whitelist on profile updates (prevents mass assignment)
- Form honeypot anti-spam (`components/forms/form-honeypot.tsx`)
- Zod validation on all API inputs

### Security Headers (via `next.config.js`)

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
Content-Security-Policy: [route-specific policies]
```

---

## Ops & Monitoring

### Health Check

- `GET /api/health` → `{ status: 'ok', service: 'soloframehub-academy' }`
- Trigger.dev health-check schedule every 15 minutes

### Scripts (`scripts/ops/`)

| Script | Purpose |
|--------|---------|
| `health-check.sh` | VPS health monitoring |
| `backup.sh` | PostgreSQL database backup |
| `restore.sh` | Database restore from backup |
| `maintenance.sh` | VM maintenance tasks |
| `security-audit.sh` | Security scanning |
| `install-crons.sh` | Trigger.dev schedule setup |
| `cloudflare-firewall.sh` | Cloudflare security configuration |

### Analytics

- **Metabase** (`metabase.soloframehub.com`) — dashboards powered by Postgres views
- **Forum sync**: Daily cron copies NodeBB data to Postgres for Metabase queries
- **Content versioning**: Audit trail via `content_version` table and `/api/admin/content-version`

### Deployment Logs

Dokploy API key cannot read deployment logs. Use SSH:
```bash
ssh -i ~/.ssh/vps_backup root@46.202.88.248
```

---

## Environment Variables

### Required for Production

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `OPENAI_API_KEY` | OpenAI API key |
| `TRIGGER_SECRET_KEY` | Trigger.dev secret key |
| `POLAR_API_KEY` | Polar.sh API key |
| `POLAR_MODE` | `sandbox` or `production` |
| `POLAR_SUCCESS_URL` | Checkout success redirect (absolute URL) |
| `S3_ENDPOINT` | MinIO/S3 endpoint |
| `S3_BUCKET` | Storage bucket name |
| `S3_ACCESS_KEY_ID` | Storage access key |
| `S3_SECRET_ACCESS_KEY` | Storage secret key |
| `NODEBB_API_KEY` | NodeBB master token |
| `NODEBB_INTERNAL_URL` | NodeBB Docker network URL |
| `NODEBB_WEBHOOK_SECRET` | Webhook validation secret |
| `ADMIN_API_SECRET` | Admin endpoint auth secret |
| `BETA_EMAILS` | Comma-separated signup whitelist |
| `RESEND_API_KEY` | Resend email API key |

### Build-Time (embedded in Docker image)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_POLAR_MONTHLY_ID` | Monthly product ID |
| `NEXT_PUBLIC_POLAR_ANNUAL_ID` | Annual product ID |
| `NEXT_PUBLIC_APP_URL` | Application URL |
| `NEXT_PUBLIC_FORUM_URL` | Forum URL |
