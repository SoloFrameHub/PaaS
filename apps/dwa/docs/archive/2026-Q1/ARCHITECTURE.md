# Platform Architecture

> Mental Health Education Platform (Wellness Academy)
> `SoloFrameHub/mental-health-education-platform`
> Last updated: 2026-02-13

---

## 1. Platform Overview

A self-hosted mental health education platform delivering evidence-based wellness courses with interactive therapeutic exercises, AI-powered coaching, and mood tracking. Deployed on a VPS via Dokploy with auto-deploy on push to `main`.

**Live URL**: `mental-health-education.soloframehub.com`

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.0.10 |
| **Language** | TypeScript | 5.7 |
| **Runtime** | Node.js | >= 20.0.0 |
| **Styling** | Tailwind CSS + @tailwindcss/typography + @tailwindcss/forms | 4.1 |
| **UI Components** | Headless UI, Radix UI (Popover), Lucide icons | -- |
| **State/Data Fetching** | TanStack React Query | 5.x |
| **Animation** | Framer Motion | 12.x |
| **Charts** | Recharts + Chart.js (with date-fns adapter) | 3.x / 4.x |
| **Flow Diagrams** | @xyflow/react | 12.x |
| **Drag & Drop** | @dnd-kit (core, sortable, utilities) | 6.x / 10.x |
| **Database ORM** | Drizzle ORM (node-postgres) | 0.38 |
| **Database** | PostgreSQL | -- |
| **Cache** | Redis (ioredis) | 5.x |
| **Auth** | Lucia v3 + @lucia-auth/adapter-drizzle | 3.2 |
| **Password Hashing** | @node-rs/argon2 | 2.x |
| **AI Coach** | OpenAI API (gpt-4o-mini default) | 6.x SDK |
| **Object Storage** | S3-compatible (MinIO) via @aws-sdk/client-s3 | 3.x |
| **Content Format** | Markdown (gray-matter + next-mdx-remote + remark-gfm) | -- |
| **PDF Generation** | pdf-lib + pdf-parse | -- |
| **Sanitization** | isomorphic-dompurify | -- |
| **Validation** | Zod | 3.x |
| **Dark Mode** | next-themes | -- |
| **Confetti** | canvas-confetti (lesson completion celebrations) | -- |

### Dev & Testing

| Tool | Purpose |
|------|---------|
| Vitest + @testing-library/react | Unit & component tests |
| Playwright | End-to-end tests |
| @vitest/coverage-v8 | Code coverage |
| @next/bundle-analyzer | Bundle size analysis |
| ESLint (eslint-config-next) | Linting |
| Turbopack | Dev server (`next dev --turbopack`) |

---

## 3. Application Architecture

### 3.1 Directory Structure

```
/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth pages (signin, signup, reset-password)
│   ├── (default)/              # Main authenticated layout
│   │   ├── academy/            # Course browser & lesson viewer
│   │   │   ├── [courseId]/     # Dynamic course pages
│   │   │   └── components/    # Academy-specific components
│   │   ├── coach/             # AI wellness coach chat
│   │   ├── community/         # Community features (feed, forum, meetups)
│   │   ├── dashboard/         # User dashboard + analytics
│   │   └── settings/          # Account, billing, plans, notifications, apps, feedback
│   ├── (double-sidebar)/       # Double-sidebar layout (messages, inbox, community profile)
│   ├── (onboarding)/           # Multi-step onboarding flow
│   │   └── onboarding/
│   │       ├── welcome/
│   │       ├── symptoms/
│   │       ├── goals/
│   │       ├── assessment/
│   │       └── safety/
│   ├── (alternative)/          # Component library & utility pages
│   ├── api/                    # API routes
│   │   ├── auth/              # signin, signup, signout, session
│   │   ├── academy/           # assessment, checklist, complete-lesson, quiz, thought-record, tracking-log
│   │   ├── ai/               # chat, voice
│   │   ├── onboarding/       # assessment, complete, goals, questionnaire
│   │   ├── profile/          # User profile CRUD
│   │   └── health/           # Health check endpoint
│   └── components/landing/    # Landing page components
├── components/                 # Shared React components
│   ├── ui/                    # Core UI (sidebar, header, logo, calendar, popover)
│   ├── ai/                    # AI coach components
│   ├── analytics/             # Analytics & charts
│   ├── charts/                # Chart components (20+)
│   └── utils/                 # Utility components
├── lib/                        # Server & shared logic
│   ├── ai/                    # OpenAI coaching, voice service
│   ├── api/                   # API client helpers
│   ├── data/                  # Curriculum data loaders
│   ├── db/                    # Drizzle schema + connection (index.ts, schema.ts)
│   ├── firebase/              # Legacy Firebase client/admin (being phased out)
│   ├── repositories/          # Data access (PostgresProfileRepository, mockProfileRepository)
│   ├── services/              # Business logic (profile, onboarding, quiz, voice)
│   ├── storage/               # S3 storage client
│   ├── validations/           # Zod schemas (ai, onboarding, academy)
│   ├── auth.ts                # Server auth (session resolution)
│   ├── auth-lucia.ts          # Lucia configuration
│   ├── redis.ts               # Redis singleton + cache helpers
│   ├── security.ts            # Security utilities
│   ├── logger.ts              # Structured logging
│   ├── lessons.ts             # Lesson content loader (Markdown → HTML)
│   ├── assessments.ts         # Likert assessment data
│   ├── checklists.ts          # Checklist data
│   ├── thought-records.ts     # Thought record data
│   └── tracking-logs.ts       # Tracking log data
├── server/data/                # Static content (shipped in Docker image)
│   ├── content/               # Markdown lesson files (by track/course)
│   ├── assessments/           # Likert assessment JSON configs
│   ├── checklists/            # Checklist JSON configs
│   ├── thought-records/       # CBT thought record JSON configs
│   ├── tracking-logs/         # Tracking log JSON configs
│   └── quizzes/               # Quiz JSON files (by track/course)
├── hooks/                      # Custom React hooks
├── e2e/                        # Playwright end-to-end tests
├── docker/                     # Docker Compose files (MinIO)
├── scripts/                    # Build & utility scripts
├── docs/                       # Project documentation
└── _archive/                   # Archived code
```

### 3.2 Route Groups (Next.js App Router)

| Group | Layout | Purpose |
|-------|--------|---------|
| `(auth)` | Minimal, no sidebar | Sign in, sign up, reset password |
| `(default)` | Sidebar + header | Main authenticated pages (academy, dashboard, coach, settings) |
| `(double-sidebar)` | Two sidebars | Messages, inbox, community profile |
| `(onboarding)` | Step-by-step wizard | New user onboarding (wellness assessment) |
| `(alternative)` | Utility | Component library, changelog, FAQs, roadmap |

---

## 4. Database Schema (PostgreSQL + Drizzle)

### Tables

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `user` | User accounts (Lucia auth) | `id` (PK), `email` (unique), `hashed_password`, `created_at`, `updated_at` |
| `session` | Auth sessions (Lucia) | `id` (PK), `user_id` (FK → user), `expires_at` |
| `profile` | Wellness profile as JSONB | `user_id` (PK, FK → user), `data` (JSONB), `updated_at` |
| `mood_entry` | Daily mood check-ins | `id` (PK), `user_id` (FK), `date`, `mood_rating` (1-10), `anxiety_level`, `sleep_quality`, `energy_level`, `notes`, `coping_techniques_used` (JSONB), `triggers` (JSONB) |
| `coach_session` | AI coaching transcripts | `id` (PK), `user_id` (FK), `transcript` (JSONB array), `topic`, `crisis_detected` (int), `created_at` |

All foreign keys cascade on delete. Timestamps use `withTimezone: true`.

### Connection

- Drizzle connects via `DATABASE_URL` env var using `pg.Pool`
- Lazy initialization — only connects when first needed
- Graceful fallback: app functions without database (mock auth mode for dev)

---

## 5. Authentication

**Lucia v3** with Drizzle PostgreSQL adapter.

| Aspect | Detail |
|--------|--------|
| **Adapter** | `DrizzlePostgreSQLAdapter(db, session, user)` |
| **Password hashing** | Argon2 via `@node-rs/argon2` |
| **Session storage** | PostgreSQL `session` table |
| **Cookie** | `session` cookie, `sameSite: lax`, secure when HTTPS |
| **Fallback** | Mock session cookie when `NEXT_PUBLIC_MOCK_AUTH=true` (dev only) |

### Auth Flow

1. `POST /api/auth/signup` — Create user + hash password + create session
2. `POST /api/auth/signin` — Verify password + create session
3. `POST /api/auth/signout` — Invalidate session
4. `GET /api/auth/session` — Check current session
5. Server-side: `getServerSession()` in `lib/auth.ts` — cached per request via `React.cache()`

---

## 6. AI Wellness Coach

**OpenAI API** with trauma-informed coaching system prompt.

| Component | Detail |
|-----------|--------|
| **Model** | `gpt-4o-mini` (configurable via `OPENAI_CHAT_MODEL`) |
| **API Routes** | `POST /api/ai/chat`, `POST /api/ai/voice` |
| **Crisis Detection** | 3-tier keyword matching (immediate, high, moderate) |
| **Crisis Response** | Pre-defined responses for immediate/high — bypasses AI, provides 988 Lifeline |
| **System Prompt** | Trauma-informed, strengths-based, non-diagnostic wellness guidance |
| **Context** | User profile + course progress injected as context string |
| **Session Storage** | `coach_session` table with full transcript JSONB |

### Crisis Detection Keywords

- **Immediate**: "want to die", "kill myself", "suicide plan", etc.
- **High**: "suicidal", "self-harm", "cutting myself", etc.
- **Moderate**: "can't take it anymore", "feeling trapped", "desperate", etc.

For immediate/high crisis, the system returns hardcoded safety responses with **988 Suicide & Crisis Lifeline** info without calling the AI.

---

## 7. Content System

### 7.1 Content Architecture

Lessons are **Markdown files with YAML frontmatter**, stored in the filesystem at `server/data/content/<track>/<course>/lesson-N.md`. They are read at runtime, parsed with `gray-matter`, and rendered with `next-mdx-remote`.

```
server/data/content/
├── foundations/           # Business foundations track
├── marketing-engine/      # Marketing track
├── sales-methodology/     # Sales track
└── wellness-education/    # Mental health track (primary)
```

### 7.2 Interactive Components (JSON-driven)

Lessons reference interactive therapeutic exercises by ID in their Markdown. Exercise definitions are stored as JSON files:

| Component Type | Location | Example |
|---------------|----------|---------|
| **Assessments** (Likert scales) | `server/data/assessments/` | PHQ-9, GAD-7, SPIN, PSQI |
| **Checklists** | `server/data/checklists/` | Sleep hygiene, anxiety first aid, resilience routine |
| **Thought Records** | `server/data/thought-records/` | CBT thought challenging worksheets |
| **Tracking Logs** | `server/data/tracking-logs/` | Mood tracking, sleep logs, habit tracking |
| **Quizzes** | `server/data/quizzes/<track>/<course>/` | Per-lesson knowledge checks |

### 7.3 Wellness Education Curriculum

**20 courses, 161 total lessons:**

| Course | Lessons | Therapeutic Approach |
|--------|---------|---------------------|
| anger-management | 8 | CBT anger management |
| anxiety-management | 8 | CBT for anxiety |
| anxiety-toolkit-foundations | 8 | Anxiety psychoeducation |
| anxiety-toolkit-skills | 8 | DBT skills for anxiety |
| anxiety-toolkit-resilience | 8 | Long-term anxiety resilience |
| bipolar-disorder | 8 | Bipolar psychoeducation + social rhythm |
| depression-action | 8 | Behavioral activation for depression |
| emotional-dysregulation | 8 | Emotion regulation skills |
| food-mood-connection | 9 | Gut-brain axis, nutritional psychiatry |
| grief-loss | 8 | Grief processing + self-care |
| interactive-lab | 8 | Practice lab for therapeutic techniques |
| low-self-esteem | 6 | Self-worth building |
| managing-perfectionism | 8 | Perfectionism management |
| ocd-toolkit | 8 | OCD psychoeducation + ERP |
| panic-disorder | 8 | Panic management + exposure |
| sleep-insomnia | 8 | CBT-I (Cognitive Behavioral Therapy for Insomnia) |
| sleep-mastery | 12 | Sleep neuroscience + provider-guided |
| social-anxiety | 8 | Social anxiety management |
| stress-burnout | 8 | Stress management + burnout prevention |
| trauma-recovery | 8 | Trauma-informed recovery |

### 7.4 Clinical Assessments (16 instruments)

| Assessment | Type |
|-----------|------|
| PHQ-2, PHQ-9 | Depression screening |
| GAD-7 | Generalized anxiety |
| SPIN | Social anxiety |
| PDSS-SR | Panic disorder |
| PSQI Sleep Quality | Sleep quality |
| Anger Self-Check | Anger management |
| Bipolar Mood Check | Mood episode screening |
| Burnout Self-Check | Burnout assessment |
| Emotional Dysregulation Check | Emotion regulation |
| Grief Experience Check | Grief processing |
| OCD Self-Check | OCD screening |
| Perfectionism Self-Check | Perfectionism assessment |
| Self-Esteem Check | Self-worth assessment |
| Trauma Response Check | Trauma response screening |

### 7.5 Other Tracks (Non-wellness)

The platform also serves business education content across 3 additional tracks:

| Track | Courses | Total Lessons |
|-------|---------|---------------|
| **foundations** | 5 (choose-path, icp-builder, list-building, positioning-value, sales-psychology) | 48 |
| **marketing-engine** | 8 (cold-email, community-lead-gen, email-nurture, linkedin-engine, seo-aeo, technical-content, social-proof-referral, marketing-automation) | 88 |
| **sales-methodology** | 8 (closing, discovery-simulations, demo-architecture, disc-personas, discovery-framework, objection-handling, pipeline-management, proposals-pricing) | 83 |

---

## 8. Deployment Architecture

### 8.1 Infrastructure

```
┌──────────────────────────────────────────────────────┐
│  VPS: 46.202.88.248 (Hostinger KVM)                  │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Dokploy (Panel: :3000)                          │ │
│  │                                                   │ │
│  │  ┌───────────────┐  ┌──────────┐  ┌───────────┐ │ │
│  │  │  Next.js App   │  │ Postgres │  │   Redis   │ │ │
│  │  │  (Docker)      │  │          │  │           │ │ │
│  │  │  Port 3000     │  │  Port    │  │  Port     │ │ │
│  │  │  standalone    │  │  5432    │  │  6379     │ │ │
│  │  └───────────────┘  └──────────┘  └───────────┘ │ │
│  │                                                   │ │
│  │  ┌───────────────┐                               │ │
│  │  │    MinIO       │  (S3-compatible storage)      │ │
│  │  │  API: 9000     │                               │ │
│  │  │  Console: 9001 │                               │ │
│  │  └───────────────┘                               │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Flarum Forum (separate container)               │ │
│  │  mhe-forum.soloframehub.com                      │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘

External Services:
  ├── OpenAI API (gpt-4o-mini) — AI coaching
  ├── Trigger.dev (separate repo) — Background jobs
  └── GitHub — Source repo, auto-deploy via Dokploy
```

### 8.2 Docker Build

Multi-stage Docker build (see `Dockerfile`):

1. **Builder stage** (`node:20-alpine`): `npm install` + `npm run build` (Next.js standalone output)
2. **Runner stage** (`node:20-alpine`): Copies standalone output + static assets + `/server` data directory
3. **Entrypoint**: `node entrypoint.js` — runs DB migration then starts server
4. **Non-root user**: `nextjs:nodejs` (UID/GID 1001)
5. **Health check**: `curl` installed for container health probes

### 8.3 Deployment Pipeline

```
Developer pushes to main
        │
        ▼
GitHub webhook triggers Dokploy
        │
        ▼
Dokploy pulls latest code
        │
        ▼
Docker build (multi-stage)
        │
        ▼
Run entrypoint.js (DB migration)
        │
        ▼
Start Next.js server (port 3000)
        │
        ▼
Dokploy reverse proxy → HTTPS
```

- **Dokploy App ID**: `MTvypAjHqdhuGJjFg9rLJ`
- **Dokploy Project ID**: `buCXGrr2qC9KfHvZhWbM7`
- **API Auth**: `x-api-key` header (not Bearer)
- **Domain**: `mental-health-education.soloframehub.com`

### 8.4 Next.js Configuration

- **Output**: `standalone` (for Docker deployment)
- **Turbopack**: Used in dev mode
- **Server Actions**: 10MB body size limit
- **Image Formats**: AVIF, WebP
- **Security Headers**: HSTS, X-Frame-Options DENY, CSP, XSS protection, nosniff

### 8.5 Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `REDIS_ENABLED` | Toggle Redis (`true`/`false`) |
| `OPENAI_API_KEY` | OpenAI API for wellness coach |
| `OPENAI_CHAT_MODEL` | Override default model (gpt-4o-mini) |
| `NEXT_PUBLIC_APP_URL` | Public app URL |
| `NEXT_PUBLIC_MOCK_AUTH` | Enable mock auth for dev |
| `S3_*` | MinIO/S3 configuration |
| `TRIGGER_SECRET_KEY` | Trigger.dev webhook auth |

### 8.6 Redis Usage

- **Session caching**: Reduces DB lookups for session validation
- **Lesson/content caching**: Cache parsed Markdown content (default 1hr TTL)
- **Toggleable**: `REDIS_ENABLED=false` disables gracefully (app works without it)
- **Retry strategy**: Exponential backoff, max 3 retries per request

---

## 9. Security

### HTTP Security Headers (via next.config.js)

| Header | Value |
|--------|-------|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` |
| X-Frame-Options | `DENY` |
| X-Content-Type-Options | `nosniff` |
| X-XSS-Protection | `1; mode=block` |
| Referrer-Policy | `origin-when-cross-origin` |
| Content-Security-Policy | Restrictive (self + Google Fonts + OpenAI API) |

### Application Security

- Argon2 password hashing
- Input validation with Zod on all API routes
- HTML sanitization with DOMPurify
- CSRF protection via SameSite cookies
- Non-root Docker container
- Structured logging (never logs PHI/passwords)

---

## 10. Testing

| Type | Tool | Command |
|------|------|---------|
| Unit/Component | Vitest + Testing Library | `npm test` |
| Coverage | @vitest/coverage-v8 | `npm run test:coverage` |
| End-to-End | Playwright | `npm run test:e2e` |
| All Tests | Combined | `npm run test:all` |
| Content Validation | Custom script | `npm run validate-lessons` |
| Bundle Analysis | @next/bundle-analyzer | `npm run analyze` |

---

## 11. External Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| **OpenAI** | AI wellness coaching | REST API via `openai` SDK |
| **Trigger.dev** | Background jobs (separate repo) | REST API webhook, `TRIGGER_SECRET_KEY` |
| **MinIO** | S3-compatible object storage | Docker Compose, `@aws-sdk/client-s3` |
| **Flarum** | Community forum | Separate container, `mhe-forum.soloframehub.com` |

### Legacy (Being Phased Out)

The `apphosting.yaml` and `lib/firebase/` reference a previous Firebase/Google Cloud deployment that has been replaced by the self-hosted VPS architecture. These remain in the codebase but are not active in the current Dokploy deployment:
- Firebase Auth (replaced by Lucia)
- Firestore (replaced by PostgreSQL)
- Firebase Storage (replaced by MinIO)
- Vertex AI / Genkit (replaced by OpenAI)
- Firebase App Hosting (replaced by Dokploy)
