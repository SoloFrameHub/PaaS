# Digital Wellness Academy — Comprehensive Platform Architecture & Features

**Version:** 3.0 (Production)  
**Last Updated:** April 19, 2026  
**Repository:** SoloFrameHub/mental-health-education-platform  
**Production Domain:** mental-health-education.soloframehub.com  
**Status:** Live, HIPAA-compliant

---

## Table of Contents

1. [Executive Overview](#executive-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Database Schema](#database-schema)
5. [API Architecture](#api-architecture)
6. [Feature Set](#feature-set)
7. [AI/ML Systems](#aiml-systems)
8. [Content & Curriculum](#content--curriculum)
9. [Security & Compliance](#security--compliance)
10. [Business Logic & Services](#business-logic--services)
11. [Deployment & Operations](#deployment--operations)
12. [Development Workflow](#development-workflow)

---

## Executive Overview

### What This Platform Is

A **HIPAA-compliant mental health education and provider coordination platform** designed for the **practice licensing + revenue-share model** (B2B2C). Practices license the platform and split subscription revenue. The platform provides:

- **Two schools of content:**
  - **Therapeutic School:** Symptoms-based clinical education (CBT, DBT, ERP, nutritional psychiatry, CBT-I)
  - **Optimization School:** Peak performance and human optimization (Five Pillars)

- **Multi-role architecture:**
  - **Users:** Access education, AI coaching, community, and tracking tools
  - **Providers:** Monitor patients, receive distress alerts, assign content, access clinical resources
  - **Admins:** Review provider applications and manage platform operations

### Platform Metrics

| Asset | Count | Location |
|-------|-------|----------|
| **Content** | | |
| Therapeutic courses | 24 | 5 clinical tracks |
| Optimization courses | ~10 | 5 pillars |
| Lesson MDX files | 337+ | `/server/data/content/` |
| External quiz JSONs | 421 | `/server/data/quizzes/` |
| Clinical assessments | 22 | `/server/data/assessments/` |
| Checklists | 31 | `/server/data/checklists/` |
| Thought record templates | 16 | `/server/data/thought-records/` |
| Tracking log templates | 21 | `/server/data/tracking-logs/` |
| **Code** | | |
| Interactive lesson components | 36 | `/app/(default)/academy/components/` |
| Shared UI components | 73+ | `/components/` |
| Chart components | 18 | `/components/charts/` |
| Database tables | 18 | `/lib/db/schema.ts` |
| API endpoints | 48 | `/app/api/` |
| Frontend routes | 60+ | `/app/` |
| Type definition files | 13 | `/types/` |

### Revenue Model

**Practice Licensing + Revenue Share:**
1. Practice pays upfront licensing fee ($X,000) + customization
2. Practice pays recurring OR revenue share on subscriptions (70/30 split)
3. Practice promotes platform to their patients (no customer acquisition cost)
4. Scales to 100+ practices without proportional cost increase

**Defensibility:**
- Practice has skin in the game
- Recurring revenue stream
- Network effect: 10 practices × 200 patients = 2,000 users without direct CAC
- Analytics moat: Rapid iteration based on real-time usage data
- Competitors need 1-2 years of data to replicate

---

## System Architecture

### High-Level Architecture

```
                    ┌─────────────────────────────────┐
                    │         Dokploy (Docker)         │
                    │    auto-deploys on push to main  │
                    └────────────────┬────────────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
    ┌─────────▼──────────┐  ┌───────▼────────┐  ┌─────────▼──────────┐
    │   Next.js 16 App   │  │   PostgreSQL   │  │   Redis (optional) │
    │   (Node 20 Alpine) │  │   (Managed)    │  │   (disabled by     │
    │   Port 3000        │  │   Drizzle ORM  │  │    default)        │
    └────────┬───────────┘  └────────────────┘  └────────────────────┘
             │
    ┌────────┼──────────────────────────────┐
    │        │                              │
    │  ┌─────▼───────────┐  ┌──────────────▼──────────────┐
    │  │ Maia Classifier  │  │ External Services            │
    │  │ (FastAPI Python)  │  │ - OpenRouter/OpenAI (LLMs)  │
    │  │ DistilBERT 255MB │  │ - Flarum (forum)            │
    │  │ Port 8001        │  │ - NPPES (NPI verification)  │
    │  │ CPU-only         │  │ - S3/R2 (object storage)    │
    │  │ 3s timeout       │  │ - Polar.sh (payments)       │
    │  └──────────────────┘  │ - Umami (analytics)         │
    │                        └─────────────────────────────┘
    │
    │  ┌───────────────────────────────────────┐
    │  │ Client Layer                           │
    │  │ - React 19 + Tailwind 4               │
    │  │ - TanStack React Query                │
    │  │ - next-themes (dark mode)             │
    │  │ - Framer Motion (animations)          │
    │  │ - Service Worker (PWA, cache-first)   │
    │  └───────────────────────────────────────┘
```

### Component Responsibilities

**Next.js Application:**
- Server-side rendering + API routes
- Authentication (Lucia sessions)
- MDX content rendering
- Client-side state management
- Progressive Web App capabilities

**PostgreSQL Database:**
- User accounts and sessions
- Wellness profiles (JSONB)
- Progress tracking
- Clinical data (mood entries, distress events)
- Provider-patient relationships
- Content embeddings (RAG)

**Maia Classifier (FastAPI):**
- Distress detection (crisis/mild/none)
- Forum topic routing
- Content quality scoring
- Content atomization tagging

**External Services:**
- **OpenRouter/OpenAI:** LLM routing, embeddings, TTS/STT
- **Flarum:** Community forum backend
- **NPPES:** National Provider Identifier verification
- **S3/R2:** Object storage for user-generated content
- **Polar.sh:** Subscription billing
- **Umami:** Privacy-focused analytics

---

## Technology Stack

### Core Framework & Runtime

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Next.js (App Router + Turbopack) | 16.2.1 |
| UI Library | React | 19.2.3 |
| Language | TypeScript (strict mode) | 5.7.3 |
| Runtime | Node.js | 20 (Alpine) |
| Package Manager | npm | — |

### Styling & UI

| Component | Technology | Version |
|-----------|-----------|---------|
| CSS Framework | Tailwind CSS | 4.1.18 |
| Typography | @tailwindcss/typography | — |
| Forms | @tailwindcss/forms | — |
| Theme Management | next-themes (dark mode) | — |
| Icons | Lucide React | 0.562.0 |
| Animation | Framer Motion | 12.34.0 |
| Charts | Recharts + Chart.js | 3.7.0 / 4.4.7 |
| Drag & Drop | @dnd-kit | 6.3.1 |
| Diagrams | @xyflow/react | 12.10.0 |

### Data Layer

| Component | Technology | Version |
|-----------|-----------|---------|
| Database | PostgreSQL | — |
| ORM | Drizzle ORM | 0.38.0 |
| Caching | Redis (ioredis) | 5.8.2 |
| Data Fetching | TanStack React Query | 5.90.16 |
| Validation | Zod | 3.25.76 |

### Authentication & Security

| Component | Technology | Version |
|-----------|-----------|---------|
| Auth | Lucia (session-based) | 3.2.2 |
| Password Hashing | Argon2 | — |
| Sanitization | isomorphic-dompurify | — |

### AI & ML

| Component | Technology | Version |
|-----------|-----------|---------|
| LLM SDK | OpenAI SDK | 6.17.0 |
| LLM Routing | OpenRouter API | — |
| Distress Classifier | DistilBERT (FastAPI, Python 3.11) | Custom fine-tuned |

### Content Management

| Component | Technology | Version |
|-----------|-----------|---------|
| Content Format | MDX | — |
| MDX Rendering | next-mdx-remote + @next/mdx | 6.0.0 |
| Frontmatter | gray-matter | — |

### Storage & Assets

| Component | Technology | Version |
|-----------|-----------|---------|
| Object Storage | S3/R2/MinIO (S3-compatible) | — |
| S3 SDK | @aws-sdk | 3.700.0 |
| PDF Generation | pdf-lib | 1.17.1 |
| PDF Parsing | pdf-parse | 1.17.1 |

### External Integrations

| Component | Technology | Version |
|-----------|-----------|---------|
| Forum | Flarum (JSON:API) | External |
| Payments | Polar.sh | Sandbox mode |
| Analytics | Umami | Optional |

### Testing

| Component | Technology | Version |
|-----------|-----------|---------|
| Unit Testing | Vitest | 3.2.4 |
| E2E Testing | Playwright | 1.57.0 |
| Coverage | v8 provider | — |

### Deployment

| Component | Technology | Version |
|-----------|-----------|---------|
| Container | Docker | — |
| Orchestration | Dokploy | — |
| CI/CD | GitHub Actions | — |

### Utilities

| Component | Technology | Version |
|-----------|-----------|---------|
| Date Handling | date-fns | 4.1.0 |
| Canvas Effects | canvas-confetti | — |

---

## Database Schema

### Overview

- **ORM:** Drizzle (type-safe SQL, schema-first)
- **Schema file:** `/lib/db/schema.ts`
- **Connection:** Lazy-initialized, max 10 connections, 5s timeout
- **Migrations:** Drizzle generate + docker-entrypoint runs on startup
- **Total tables:** 18

### Schema Diagram

```
Authentication
├── user (id, email, hashedPassword, role, createdAt, updatedAt)
└── session (id, userId FK, expiresAt)

User Data
├── profile (userId FK 1:1, data JSONB, updatedAt)
├── moodEntry (id, userId FK, date, ratings, notes, triggers)
└── lessonFeedback (id, userId FK, courseId, lessonId, rating, message)

Clinical
├── distressEvent (id, userId FK nullable, level, context, providerAlerted)
├── coachSession (id, userId FK, transcript JSONB, topic, crisisDetected)

Provider Portal
├── providerProfile (userId FK 1:1, credentials, npiData JSONB, verificationStatus)
├── providerPatient (id, providerId FK, patientId FK, displayName, status)
├── patientAssignment (id, providerId FK, patientId FK, courseId, completedAt)
└── providerInvite (id, code, providerId FK, usedBy FK, expiresAt)

AI/ML Systems
├── contentEmbedding (id, sourceType, body, embedding JSONB[1536])
├── aiClassificationEvent (id, classifier, primaryLabel, confidence, result JSONB)
├── forumTopicClassification (id, discussionId, topic, routing, needsProvider)
├── contentQualityScore (id, courseId, lessonId, quality, publishReady)
└── contentAtomizationTag (id, courseId, lessonId, tag, extractable)

Community
├── forumBookmark (userId, discussionId, composite PK)
└── moderationLog (id, userId FK, riskLevel, categories JSONB, action)
```

### Key Design Patterns

**HIPAA Compliance:**
- Text content excluded from `distressEvent` and `moderationLog` — only metadata stored
- Patient display names are provider-assigned aliases (not real names)
- Audit trail preservation via `onDelete: 'set null'` on FK relationships

**JSONB Usage:**
- Profiles: 30+ fields stored as flexible JSON
- Transcripts: Coach chat messages
- Embeddings: 1536-dimensional float arrays
- NPI data: NPPES API response
- Classifications: Full classifier outputs

**Row-Level Access:**
- Providers see only their own patients via FK filtering
- All provider routes filter by `providerId`

**Race-Condition Safety:**
- Profile creation uses `onConflictDoNothing` + re-read pattern

---

## API Architecture

### Endpoint Overview

**Total endpoints:** 48 across 10 functional domains

### API Domain Breakdown

| Domain | Endpoints | Purpose |
|--------|-----------|---------|
| Authentication | 4 | Login, signup, signout, session |
| Health & Diagnostics | 3 | Service health, AI status, debug |
| Onboarding | 8 | Multi-step profile creation |
| Academy | 8 | Lesson completion, quizzes, assessments |
| AI | 3 | Coaching chat (streaming), TTS, STT |
| Safety | 1 | Distress classification |
| Forum | 7 | Discussions, posts, bookmarks |
| Provider Portal | 9 | Patients, alerts, assignments, RAG |
| Admin | 2 | Provider approval workflow |
| Profile | 2 | Profile read/update |
| Utility | 2 | OpenAPI docs, test endpoint |

### API Patterns

**Authentication:**
- Middleware: `withAuth`, `withAdminAuth`, `withProviderAuth`
- Lucia session validation
- Role-based access control (RBAC)

**Rate Limiting:**
- Redis-backed sliding window with in-memory fallback
- Per-user identification
- Configurable limits: AI (10/min), Auth (5/15min), General (60/min)

**Validation:**
- Zod schemas for all inputs
- Request body validation via `validateBody()`
- Type-safe with TypeScript

**Error Handling:**
- Custom `AppError` class hierarchy
- `UnauthorizedError` (401), `ForbiddenError` (403), `NotFoundError` (404), `ValidationError` (400)
- Generic error responses to clients (no stack traces in production)
- Server-side structured logging

**Response Format:**
- Success: `{ data: {...} }` with 200
- Error: `{ error: "message" }` with appropriate status code

**Streaming:**
- AI chat uses Server-Sent Events (SSE)
- Crisis detection via response headers: `X-Crisis-Detected`, `X-Crisis-Level`

**Moderation:**
- `withModeration` middleware pre-screens forum content
- Blocks posts with riskLevel >= 2
- Returns crisis resources when needed

---

## Feature Set

### Multi-Role Layout Hierarchy

```
app/layout.tsx (root: Inter font, providers, dark mode)
├── (marketing)/layout.tsx — Public landing page
├── (auth)/ — Login/signup (uses root layout)
├── (onboarding)/layout.tsx — OnboardingProvider context
├── (default)/layout.tsx — Authenticated: Sidebar + Header + FlyoutChat
│   ├── dashboard/
│   ├── academy/
│   ├── coach/
│   ├── community/
│   ├── resources/
│   ├── settings/
│   └── optimization/
├── (provider)/layout.tsx — Provider: role check + ProviderSidebar
│   ├── provider/dashboard
│   ├── provider/patients
│   ├── provider/alerts
│   ├── provider/resources
│   └── provider/profile
├── (admin)/layout.tsx — Admin: role check
│   └── admin/providers
└── (double-sidebar)/layout.tsx — Community profile/messaging
```

### User Features

**Landing Page (`/`)**
- Hero section with animated gradient
- Platform statistics (courses, lessons, tracks, evidence-based badge)
- Feature highlights (4 columns)
- Wellness track showcase (5 color-coded tracks)
- Course catalog with tier badges
- Testimonials
- FAQ (6 Q&A pairs)
- Crisis resources (988 hotline in footer)

**Onboarding (9-step flow)**
1. Welcome — Introduction and orientation
2. About You — Name, demographics
3. Safety — Crisis screening (suicidal ideation, self-harm, concerns)
4. Symptoms — Primary symptoms with severity + duration
5. Your Experience — Coping strategies, therapy history, triggers
6. Assessment — GAD-7 + PHQ-9 clinical screening
7. In Your Words — Free-form reflection for AI personalization
8. Goals — Wellness goals (19 options), learning style, time commitment
9. Complete — Profile finalized, course recommendations generated

**Dashboard (`/dashboard`)**
- Progress summary (courses completed, XP earned)
- Recommended courses (max 3, personalized)
- Wellness dimension scores (5 dimensions)
- Full curriculum organized by track
- Course cards with completion status, lesson progress, tier badges
- Wellness alerts (clinical flags, reassessment prompts, inactivity notices)

**Academy (`/academy`)**
- Course catalog (filterable by track)
- Course overview pages (learning outcomes, evidence badges, lesson list)
- Lesson viewer with:
  - Two-column layout (sticky navigation + MDX content)
  - 36 interactive components (breathing exercises, CBT diagrams, thought records, etc.)
  - Post-lesson completion flow
  - Next lesson/course navigation
- Course completion celebration (confetti animation)
- My Path — Personalized learning journey

**AI Wellness Coach (`/coach`)**
- Full-height chat interface
- Also available as flyout widget on every page
- Features:
  - Streaming responses
  - Crisis detection (dual-layer: keywords + ML)
  - Voice input/output (Whisper STT, OpenAI TTS)
  - Context-aware (wellness profile, symptoms, progress)
  - Trauma-informed system prompt
  - Pre-built crisis responses (not LLM-generated)

**Community (`/community`)**
- Forum integration (Flarum backend)
- Discussion threads with sorting (popular, newest, top)
- Tag/category filtering
- Search functionality
- AI moderation (pre-screens posts for risk)
- Bookmarking
- Topic routing (needs-provider vs. community-handles)
- Like/unlike posts
- Activity feed
- Meetup coordination (virtual/local)
- User directory (tabs and tiles view)

**Resources (`/resources`)**
- Health resources hub
- Crisis resources page (988 Crisis Line, emergency info, safety planning)

**Settings (`/settings`)**
- Account management (profile, email, password)
- Billing (subscription management via Polar.sh)
- Plans & pricing
- Notification preferences
- Feedback submission
- Connected apps/integrations

**Daily Tracking**
- Mood entry (mood, anxiety, sleep, energy ratings 1-10)
- Triggers and coping techniques tracking
- Free-form notes
- Sleep tracking with derived metrics:
  - Time in bed (TIB)
  - Total sleep time (TST)
  - Sleep efficiency (%)

### Provider Features

**Access Control**
- Role check (provider or admin)
- Verification status gates:
  - Pending → `/provider-pending`
  - Manual review → `/provider-pending`
  - Rejected → `/provider-rejected`

**Dashboard (`/provider/dashboard`)**
- Patient overview
- Alert summary
- Assignment status

**Patient Roster (`/provider/patients`)**
- All linked patients with status (active/discharged)
- HIPAA-compliant: Display names are provider-assigned aliases

**Patient Profile (`/provider/patients/[patientId]`)**
- Mood trend charts
- Completed courses and current progress
- Assignment history
- Private clinical notes

**Alerts (`/provider/alerts`)**
- Real-time distress events from patient activity
- 50 unresolved + 20 resolved alerts displayed
- Resolve workflow with timestamps
- Linked to patient with distress level + context

**Resources (`/provider/resources`)**
- RAG-powered search over course library + clinical assessments
- Natural language queries
- Source attribution (links to originating content)

**Session Prep (`/api/provider/session-prep/[patientId]`)**
- AI-generated clinical brief:
  - Recent distress alerts
  - Completed courses + pending assignments
  - Latest mood/anxiety/sleep metrics
  - Provider notes
- Returns 5-8 actionable bullet points

**Provider Profile (`/provider/profile`)**
- Edit credentials, specialty, license info
- View verification status

**Invite System**
- Generate alphanumeric invite codes
- Code expiration tracking
- Patient linkage on code redemption
- Usage tracking (who used, when)

**Provider Signup Flow**
1. Registration form (name, credentials, specialty, license #, NPI)
2. NPI auto-verification via NPPES API
3. Admin review at `/admin/providers`
4. Status update (pending → verified/manual_review/rejected)
5. Redirect based on status

### Admin Features

**Provider Management (`/admin/providers`)**
- List all provider applications
- Approve/reject workflow
- View NPI verification data
- Manual review queue

---

## AI/ML Systems

### System Architecture

```
User Input (text, voice, quiz, forum post)
    │
    ├─ Maia Classifier (/lib/ai/maia-client.ts)
    │   ├─ distress → none/mild/crisis + provider alert
    │   ├─ forum-topic → topic + routing
    │   ├─ content-quality → publish-ready flag
    │   └─ content-atomization → marketing extraction
    │
    ├─ Coaching Chat (/lib/ai/openai-coaching.ts)
    │   ├─ Crisis keyword detection (immediate/high/moderate)
    │   ├─ Context assembly from wellness profile
    │   ├─ LLM response (Claude Haiku via OpenRouter)
    │   └─ Crisis headers for frontend UI intervention
    │
    ├─ Forum Moderation (/lib/ai/forum-moderation.ts)
    │   ├─ Risk scoring (0-3)
    │   ├─ Category flagging
    │   └─ Redis-cached by SHA-256 hash
    │
    ├─ Quiz Reflection (/lib/ai/openai-flows.ts)
    │   └─ AI feedback on reflections (Gemini 2.5 Flash)
    │
    ├─ Provider RAG (/lib/ai/rag.ts)
    │   ├─ Embedding: text-embedding-3-small (1536 dims)
    │   ├─ Retrieval: cosine similarity (JSONB arrays)
    │   ├─ Synthesis: gpt-4o-mini
    │   └─ Session prep briefs
    │
    └─ Voice (/lib/services/voiceService.ts)
        ├─ STT: OpenAI Whisper
        └─ TTS: OpenAI tts-1 (6 voices)
```

### 1. Maia — Unified Classification Layer

**Service Architecture:**
- Location: `/services/maia/` (Python FastAPI)
- Model: Fine-tuned DistilBERT (255MB SafeTensors)
- Runtime: FastAPI (Python 3.11), Docker Swarm, CPU-only
- Port: 8001 (internal)
- Timeout: 3 seconds with fail-safe defaults

**Four Classifiers:**

**1. Distress Detection**
- Input: text + context (journal/assessment/forum/checkin)
- Output: `{ level: 'none'|'mild'|'crisis', confidence: 0-1, flag: boolean, crisis: boolean }`
- Thresholds: Crisis >= 85%, Mild 60-85%, None < 60%
- On crisis: Creates `distressEvent` record, alerts provider
- Privacy: Text NEVER stored (HIPAA-compliant)

**2. Forum Topic Routing**
- Input: discussion/post text
- Output: `{ topic, confidence, routing: 'needs-provider'|'community-handles'|'informational', needs_provider: boolean }`
- Topics: anxiety, depression, relationships, medication, coping-strategies, crisis, general-wellness, optimization

**3. Content Quality Scoring**
- Input: lesson section text
- Output: `{ quality: 'clinically-appropriate'|'needs-revision'|'potentially-harmful'|'overly-clinical'|'missing-validation', confidence, publish_ready: boolean }`

**4. Content Atomization**
- Input: lesson section text
- Output: `{ tag: 'standalone-blog-excerpt'|'email-teaser'|'social-snippet'|'needs-full-context'|'not-extractable', confidence, extractable: boolean }`

**Deployment:**
- VPS: 46.202.88.248 (Hostinger)
- Directory: `/opt/distress-classifier/`
- Systemd service managed
- Fine-tuning: 3-6 hours on CPU
- Evaluation scripts included

### 2. Wellness Coaching Chat

**Crisis Detection (Layer 1 - Keywords):**
- Immediate: "want to die", "kill myself", "ending my life", "suicide plan"
- High: "suicidal", "self-harm", "cutting myself", "no reason to live"
- Moderate: "can't take it anymore", "feeling trapped", "desperate"
- 13+ research-backed keywords per level

**System Prompt:**
- 100+ lines defining role and boundaries
- Trauma-informed principles: safety, choice, validation, pacing
- Evidence-based techniques: CBT, DBT, grounding, psychoeducation
- Explicit limitations (not a therapist, not emergency service)

**Crisis Response:**
- Pre-built clinically-reviewed responses (NOT LLM-generated)
- 988 Suicide & Crisis Lifeline prominently displayed
- Link to `/resources/crisis`
- Blocks further AI chat until acknowledged

**Context Assembly:**
- De-identified wellness summary built from profile
- Symptom categories (not raw scores)
- Goals and learning style
- Assessment summary
- Progress metrics
- Sanitized against prompt injection

**Voice Integration:**
- TTS: OpenAI tts-1 (6 voices: alloy, echo, fable, onyx, nova, shimmer)
- STT: OpenAI Whisper (webm/mp3 input)

**Model Routing:**
| Task | Default Model | Provider |
|------|--------------|----------|
| Coaching | `anthropic/claude-haiku-4-5` | OpenRouter |
| Quiz reflection | `google/gemini-2.5-flash` | OpenRouter |
| Forum moderation | `google/gemini-2.5-flash` | OpenRouter |
| RAG synthesis | `gpt-4o-mini` | Direct OpenAI |
| TTS/STT | `tts-1` / `whisper-1` | Direct OpenAI |

### 3. Provider RAG System

**Pipeline:**
1. **Embed query:** OpenAI `text-embedding-3-small` (1536 dimensions)
2. **Retrieve:** Cosine similarity in JavaScript against JSONB float arrays
3. **Synthesize:** gpt-4o-mini generates clinically-grounded answer
4. **Attribute:** Top-K chunks ranked by score, sources cited

**Knowledge Base:**
- All course descriptions + lesson summaries (380+ lessons)
- Standardized assessments: GAD-7, PHQ-9, PDSS-SR, OCD, PSQI, etc.
- Filterable by sourceType: 'course' | 'assessment' | 'clinical'

**Seed Script:** `/scripts/seed-embeddings.ts`
- One-time execution: chunks courses + assessments
- Generates embeddings via OpenAI API
- Upserts to `contentEmbedding` table

**Current Limitation:** JSONB float arrays with JS cosine similarity works but won't scale beyond ~5,000 embeddings. Planned migration to pgvector.

### 4. Forum Moderation

**System Prompt:** Mental-health-aware moderation
- Distinguishes recovery discussion from harmful promotion
- Risk levels: 0 (safe), 1 (sensitive), 2 (concerning), 3 (severe)

**`moderateContent(text, contentType)`:**
- Redis caching by SHA-256 hash (avoids re-classifying identical content)
- Returns: riskLevel, flaggedCategories, reasoning, crisisResourcesNeeded
- Categories: self-harm, violence, harassment, misinformation, spam, crisis-signals
- 3-second timeout, fail-safe to allow
- Posts with riskLevel >= 2 blocked by middleware (422 + crisis resources)

### 5. Safety Architecture (4 Layers)

```
User text input
    │
    ▼
┌─ Layer 1: Keyword Detection ─────────────────┐
│  Immediate triggers → hard block + 988        │
│  High triggers → escalation                   │
│  Moderate triggers → caution                  │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌─ Layer 2: Maia ML Classifier ─────────────────┐
│  DistilBERT inference (3s timeout)            │
│  Crisis >= 85% confidence → provider alert    │
│  Fail-safe: returns 'none' on any error       │
│  Text NEVER stored (HIPAA)                    │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌─ Layer 3: Provider Coordination ──────────────┐
│  distressEvent created (metadata only)        │
│  Provider alert dashboard                     │
│  Resolve workflow with timestamps             │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌─ Layer 4: User-Facing Safety ─────────────────┐
│  Crisis modal with 988 number                 │
│  Link to /resources/crisis                    │
│  Blocks further AI interaction                │
│  Pre-built (non-LLM) crisis responses         │
└───────────────────────────────────────────────┘
```

---

## Content & Curriculum

### Content Architecture

```
/server/data/
├── content/{trackId}/{courseId}/lesson-{n}.md     (337+ MDX files)
├── quizzes/{trackId}/{courseId}/lesson-{n}.json   (421 quiz files)
├── assessments/{assessmentId}.json                (22 instruments)
├── checklists/{checklistId}.json                  (31 templates)
├── thought-records/{recordId}.json                (16 templates)
├── tracking-logs/{logId}.json                     (21 templates)
└── lesson-map.json (in each subdirectory)

/lib/data/
├── curriculum.ts (916 lines, 5 tracks)
├── optimization-curriculum.ts (914 lines, 5 pillars)
├── landing-curriculum.ts (marketing preview)
├── onboarding-data.ts (template responses)
├── personas.ts (user personas)
└── terminology.ts (glossary)
```

### Therapeutic School (5 Tracks, 24 Courses)

**Track 1: Anxiety & Fear Management (8 courses, ~64 lessons)**
- Understanding & Managing Anxiety (CBT, NICE 2024)
- Managing Panic Attacks & Panic Disorder (CBT, Gold-standard)
- Social Anxiety: Building Confidence (CBT, NICE 2024)
- OCD Toolkit (ERP, First-line)
- Anxiety Toolkit series (3 courses + combined)

**Track 2: Mood & Emotional Health (7 courses, ~56 lessons)**
- Depression: From Understanding to Action (CBT/BA, NICE 2024)
- Bipolar Disorder: Mood Stability (IPSRT, CANMAT 2023)
- Emotional Dysregulation & DBT Skills (DBT, Evidence-based)
- Managing Anger & Irritability (CBT)
- Grief & Loss: Navigating Bereavement (CFT)
- Low Self-Esteem & Self-Worth (CBT/CFT)
- Managing Perfectionism (CBT)

**Track 3: Nutrition & Brain Health (5 courses, ~57 lessons)**
- The Food-Mood Connection (Nutritional Psych, CANMAT 2024)
- Gut-Brain Foundations (RCT-Supported)
- Dietary Patterns for Mental Health (Mediterranean diet)
- Precision Nutrition Protocols (ISNPR 2024)
- Food-Mood Mastery (Advanced)

**Track 4: Sleep & Recovery (2 courses, ~20 lessons)**
- Sleep Problems & Insomnia Solutions (CBT-I, First-line)
- Sleep Mastery (CBT-I, Gold-standard)

**Track 5: Stress & Resilience (2 courses, ~16 lessons)**
- Chronic Stress & Burnout Management (CBT/Mindfulness)
- Trauma Recovery: Understanding PTSD (Trauma-focused CBT, NICE 2018)

### Optimization School (5 Pillars)

**Pillar 1: Physical Vitality & Movement**
- Movement for Mental Performance (20 lessons)
- Workplace Mental Health (20 lessons)

**Pillar 2: Social Connection & Community**
- Social Circle Mastery (20 lessons)
- Team Sports & Collective Activity (20 lessons)
- Relationship Dynamics (20 lessons)

**Pillar 3: Mental Clarity & Cognitive Performance**
- Digital Wellness (20 lessons)

**Pillar 4: Emotional Resilience & Stress Management**
- CBT Fundamentals (20 lessons)
- Growth Mindset (12+ lessons)
- Healthy Boundaries (20 lessons)
- Stress Challenge Navigation (19 lessons)

### Lesson Structure

**Frontmatter:**
```yaml
---
title: "Lesson Title"
duration: "20 min"  # or "55 min"
track: "Track Name"
course: "Course Name"
lesson: 3
objectives: ["objective 1", "objective 2"]
keyPoints: ["point 1", "point 2"]
---
```

**Content:** Markdown with embedded MDX components

**Processing:**
- Gray-matter frontmatter parsing
- Strip embedded quiz JSON blocks (loaded separately)
- Calculate reading time (~200 words/minute)

### Interactive Components (36 Total)

**Breathing & Mindfulness:**
- InteractiveBreathingExercise (box breathing 4-4-4-4)
- GuidedGrounding (5 senses)
- MindfulnessTimer

**Clinical Exercises:**
- ThoughtRecord (~300 lines, PDF export)
- ExposureHierarchyBuilder (~250 lines)
- ExposureLog, ExposurePlanWorksheet
- BodyMap (interactive symptom mapping)

**Assessment & Tracking:**
- LessonQuiz, LikertAssessment
- TrackingLog, TrackingTrendChart
- Checklist, Checkin
- AssessmentHistoryChart

**Ranking & Decision:**
- CopingStrategyRanker (drag-and-drop)
- CopingStrategyRankerDynamic (AI-powered)

**Scenarios & Learning:**
- ScenarioCard, InteractiveScenario + Choice
- FlipCard, LessonDiagrams

**Layout & Structure:**
- EnhancedAccordion + AccordionItem
- StepByStep + Step
- ToolkitCard, InsightGrid + InsightItem
- Callout, SlideNavigation + Slide

**Presentation:**
- GammaPresentation (slide viewer)

**Progress & Feedback:**
- EngagementSummary, LessonFeedback
- CompleteButton, useConfetti

### Clinical Assessments (22 Instruments)

**Core Screening:**
- GAD-7 (Anxiety, 0-21 scale)
- PHQ-9 (Depression, 0-27 scale)
- PHQ-2 (Depression screening, 0-6 scale)
- SPIN (Social Phobia Inventory)
- PDSS-SR (Panic Disorder Severity Scale)
- PSQI (Pittsburgh Sleep Quality Index)

**Condition-Specific (16 instruments):**
Anger, Bipolar mood, Burnout, Emotional dysregulation, Grief, Insomnia, Self-esteem, OCD, Perfectionism, Trauma, Dietary patterns, Food-mood awareness, Gut-brain axis, Nutrient awareness, and more.

**Schema Features:**
- Validated scoring bands with severity labels
- Crisis item detection (e.g., PHQ-9 question 9)
- Color-coded severity (green/yellow/orange/red)
- Educational disclaimers (not clinical diagnosis)

### Evidence Grading System

All courses include evidence badges:
- **Gold-Standard:** First-line recommended treatment
- **NICE 2024:** UK National Institute for Health and Care Excellence guidelines
- **CANMAT 2023/2024:** Canadian Network for Mood and Anxiety Treatments
- **ISNPR 2024:** International Society for Nutritional Psychiatry Research
- **RCT-Supported:** Randomized controlled trial evidence
- **Research-Backed:** Multiple studies supporting approach

---

## Security & Compliance

### HIPAA Compliance

**Data Minimization:**
- Distress text NEVER stored in database
- `distressEvent` table stores only metadata (level, confidence, context)
- `moderationLog` stores content snippets (truncated)
- Forum content stays in Flarum (separate service)

**Patient Privacy:**
- Provider-assigned aliases (not real names) in `providerPatient.displayName`
- De-identified context in AI prompts
- No PII in logs

**Audit Trail:**
- `onDelete: 'set null'` on user FK relationships (preserves audit logs after account deletion)
- Timestamps on all distress events and moderation actions
- Provider alert resolution tracking

**Access Control:**
- Role-based access control (user/provider/admin)
- Row-level security via FK filtering
- Providers only see their own patients
- Session-based authentication (Lucia)

### Authentication & Sessions

**Lucia Configuration:**
- Session-based (not JWT)
- Argon2 password hashing
- HttpOnly cookies
- SameSite: lax
- Secure flag derived from `NEXT_PUBLIC_APP_URL` protocol
- Session expiration

**Mock Auth (Development):**
- `NEXT_PUBLIC_MOCK_AUTH=true` enables mock cookie auth
- Never used in production

### Security Headers

**Next.js Config (next.config.js):**
- `X-DNS-Prefetch-Control: on`
- `X-XSS-Protection: 1; mode=block`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000` (production only)
- Content-Security-Policy (strict defaults)

**CSRF Protection:**
- Origin check in `proxy.ts` (54-74)
- Validates request origin against `NEXT_PUBLIC_APP_URL`

### Rate Limiting

**Implementation:**
- Redis-backed sliding window
- In-memory fallback (Map-based) when Redis unavailable
- Atomic multi-exec for accurate counting
- Cleanup routine every 60s for stale keys

**Configurations:**
| Limit Type | Rate | Window |
|-----------|------|--------|
| AI | 10 requests | 1 minute |
| Auth | 5 attempts | 15 minutes |
| General | 60 requests | 1 minute |

### Content Sanitization

- isomorphic-dompurify for HTML sanitization
- Forum content processed through `withModeration` middleware
- User input validation via Zod schemas

### Vulnerability Management

**Current Status (as of April 18, 2026):**
- Drizzle ORM <0.45.2: SQL injection CVE (needs upgrade)
- Next.js 16.2.1: DoS CVE (needs `npm audit fix`)
- DOMPurify <=3.3.3: FORBID_TAGS bypass (needs `npm audit fix`)

**Gitleaks Integration:**
- Pre-commit hook installed
- `.gitleaks.toml` configuration
- Allowlists for false positives (MDX `persistKey` props)

---

## Business Logic & Services

### Service Layer Architecture

```
/lib/services/
├── profileCoreService.ts       — Profile lifecycle (CRUD + migration)
├── profileService.ts           — Facade (delegates to core + context + onboarding)
├── profileContextService.ts    — AI-safe context assembly
├── onboardingService.ts        — Onboarding data persistence
├── quizService.ts              — Quiz loading, grading, AI reflection
├── voiceService.ts             — TTS + STT
├── npiService.ts               — NPPES NPI verification

/lib/repositories/
├── profileRepository.ts            — Interface (IProfileRepository)
├── postgresProfileRepository.ts    — Postgres/JSONB implementation
├── mockProfileRepository.ts        — In-memory fallback
```

### Repository Pattern

**Design:**
- Interface-based (IProfileRepository)
- Two implementations: Postgres (production) + Mock (dev/testing)
- Factory selects based on `DATABASE_URL` presence

**Postgres Implementation:**
- Dot-path updates: `'progress.badges'` → `jsonb_set(data, '{progress,badges}', value)`
- Handles intermediate nulls in nested paths
- Race-condition safe: `onConflictDoNothing` + re-read

### Profile System

**Core Service Functions:**
- `getOrCreateProfile(userId)` — Safe creation with conflict handling
- `getProfile(userId)` — Fetch with automatic schema migration
- `updateProfile(userId, updates)` — Flattens nested updates, invalidates AI context cache
- `updateProgress(userId, progress)` — XP, badges, course/lesson completion tracking
- `migrateProfile(userId, profile)` — Ensures v3 required fields exist

**Onboarding Service:**
- `saveSymptomSelection()` — Primary symptoms + severity
- `saveWellnessGoals()` — Goals array + learning style
- `saveAboutYou()` — Demographics (age range, life stage)
- `saveYourExperience()` — Coping strategies, therapy history, triggers
- `saveCrisisScreening()` — Crisis safety data

**AI Context Service:**
- `getSafeContext(userId)` — De-identified wellness summary for AI prompts
- Strips PII (name, email)
- Includes: symptoms, goals, learning style, assessment summary, progress metrics
- Sanitizes against prompt injection

### Wellness Scoring System

**5 Dimensions (0-100 scale each):**

| Dimension | Assessment | Courses |
|-----------|-----------|---------|
| Anxiety Management | GAD-7 | 8 courses |
| Mood Stability | PHQ-9 | 7 courses |
| Sleep Quality | PSQI | 2 courses |
| Stress Resilience | Burnout check | 2 courses |
| Nutrition Awareness | Food-mood | 5 courses |

**Scoring Algorithm:**
1. **Assessment Score:** Inverts clinical scale (low symptoms = high wellness)
   - Linear: `(1 - rawScore/maxScore) * 100`
2. **Engagement Score:** From lessons, logs, thought records
   - Soft-capped: 50 engagement points = 100 score

**Functions:**
- `normalizeAssessmentScore(rawScore, maxScore)`
- `computeAssessmentScoreForDimension(dimension, profile)`
- `computeEngagementScoreForDimension(dimension, profile)`

### Wellness Alerts

| Alert Type | Trigger | Priority |
|-----------|---------|----------|
| Clinical flag | PHQ-9 severe + 7+ days inactive | 0 (never suppressed) |
| Reassess | 14+ days since assessment + 3+ lessons | 2 |
| Inactivity (gentle) | 5-13 days inactive | 3 |
| Inactivity (warm) | 14+ days inactive | 3 |
| Stagnation | Score plateau detected | 4 |

### Quiz System

**Loading:**
- `loadQuiz()` — Strips correct answers for client delivery
- `loadFullQuiz()` — Includes answers (server-side only)
- `hasQuiz()` — Boolean check

**Grading:**
- Multiple-choice: Exact match
- Reflection: Minimum length + optional AI feedback
- Returns: score, passed, per-question results, AI feedback

### Tracking Logs with Derived Metrics

**Sleep Diary Example:**
- **Inputs:** bedTime, outOfBedTime, SOL (sleep onset latency), WASO (wake after sleep onset)
- **Derived Metrics:**
  - Time in bed (TIB) = outOfBedTime - bedTime
  - Total sleep time (TST) = TIB - SOL - WASO
  - Sleep efficiency (%) = (TST / TIB) × 100

**Function:** `computeDerivedMetrics(config, data)`

### PDF Generation

**Library:** pdf-lib

**Features:**
- US Letter size (8.5×11)
- Auto-pagination
- Text wrapping
- Field types: text, multiline, number, rating, checkbox
- Used for: thought records, exposure plans, tracking logs

**Functions:**
- `generateWorksheetPdf(config)` — Creates fillable PDF
- `downloadPdf(bytes, filename)` — Triggers browser download

### Forum Client

**FlarumClient class (424 lines):**
- JSON:API normalization (Flarum uses JSON:API spec)
- Avatar URL rewriting
- Tag caching (5 minutes)

**Methods:**
- `listDiscussions()` — Paginated search
- `getDiscussion(id)` — Full thread + posts
- `createDiscussion()`, `createPost()` — New content
- `likePost()`, `unlikePost()` — Voting
- `getTags()` — Category list
- `getOrCreateUserToken()` — SSO integration

---

## Deployment & Operations

### Docker Configuration

**Next.js App (Dockerfile):**
- Base: `node:20-alpine`
- Build: Two-stage (builder → runner)
- Output: `standalone` (optimized for Docker)
- Entrypoint: `/scripts/docker-entrypoint.js` (runs migrations, then starts server)
- User: `nextjs:nextjs` (UID 1001, non-root)
- Port: 3000
- Healthcheck: `GET /api/health` (30s interval, 10s timeout, 3 retries)

**Maia Classifier (services/maia/Dockerfile):**
- Base: `python:3.11-slim`
- Runtime: uvicorn + FastAPI
- User: `classifier` (UID 1001, non-root)
- Port: 8001
- Healthcheck: `curl -f http://localhost:8001/health`
- Model: Loads from `./model/` if present, else downloads from HuggingFace

**Compose Files:**
- `docker-compose.yml` — Local development
- `docker-compose-dokploy.yml` — Production

### CI/CD Pipeline

**GitHub Actions (deploy-classifier.yml):**
- Trigger: Manual workflow dispatch with optional `retrain` input
- Deploys to VPS (46.202.88.248) via SSH
- Steps: copy code → create venv → install deps → create systemd service → health check
- Installs to `/opt/distress-classifier/`
- Optional: Fine-tuning in background (3-6 hours on CPU)

**Dokploy Auto-Deploy:**
- Push to `main` triggers rebuild + deploy
- Config: `apphosting.yaml` (1 CPU, 1GB RAM, max 10 instances)
- Domain: `mental-health-education.soloframehub.com`
- App ID: `MTvypAjHqdhuGJjFg9rLJ`

### Environment Variables (60+)

**Critical Required:**
- `DATABASE_URL` — PostgreSQL connection
- `NEXT_PUBLIC_APP_URL` — Public app URL
- `OPENROUTER_API_KEY` or `OPENAI_API_KEY` — LLM access
- `MAIA_URL` — Classifier service URL

**See full list in Architecture section above**

### Monitoring & Logging

**Structured Logger (`/lib/logger.ts`):**
- Development: Human-readable console
- Production: Google Cloud Logging JSON format
- Severity levels: INFO/WARNING/ERROR/DEBUG
- Error context: service name + version
- AI token usage logged per task

**Health Checks:**
- `/api/health` — App + DB status
- `/api/health/ai` — AI service status (diag mode)
- Responds in 457ms average

**Analytics:**
- Umami (optional, privacy-focused)
- Events: lesson completion, quiz scores, coaching sessions, onboarding steps

**Missing:**
- APM (Application Performance Monitoring)
- Centralized error tracking (Sentry)
- Metabase (mentioned as in development)

### Backup & Disaster Recovery

**Current State:**
- No automated backup scripts in repo
- Needs verification of Dokploy external backups
- PHI requires: documented RPO/RTO, offsite copy, quarterly restore tests

---

## Development Workflow

### Package.json Scripts

| Command | Purpose |
|---------|---------|
| `dev` | `next dev --turbopack` |
| `build` | `next build` (standalone) |
| `start` | `next start` |
| `lint` | `eslint .` |
| `validate-lessons` | Curriculum structure check |
| `test` | `vitest` (unit tests) |
| `test:coverage` | Coverage report (v8) |
| `test:e2e` | Playwright E2E tests |
| `test:all` | Coverage + E2E combined |
| `analyze` | Bundle analysis |

### Testing

**Vitest (Unit Tests):**
- Environment: Node, globals enabled
- Coverage: v8 provider
- Setup: `@testing-library/jest-dom`, cleanup after each
- Current: 110 of 117 tests pass

**Playwright (E2E Tests):**
- Test directory: `./e2e`
- Base URL: `http://localhost:3111` (separate test server)
- Workers: 1 (sequential for mock storage safety)
- Retries: 2 on first failure
- Screenshots + video on failure
- 17 spec files exist

### Project Structure

```
/
├── .claude/                       # Claude Code configuration
│   ├── CLAUDE.md                  # Strategic context
│   ├── VISION.md                  # Full strategic vision
│   ├── COURSE_BUILD_BLUEPRINT.md  # 5-step course creation
│   ├── settings.json              # Claude settings
│   └── agents/                    # Custom agents
├── app/                           # Next.js App Router
│   ├── (marketing)/               # Public pages
│   ├── (auth)/                    # Login/signup
│   ├── (onboarding)/              # 9-step onboarding
│   ├── (default)/                 # Authenticated user routes
│   ├── (provider)/                # Provider portal
│   ├── (admin)/                   # Admin pages
│   └── api/                       # API routes (48 endpoints)
├── components/                    # Shared UI components (73+)
├── docs/                          # Documentation
│   ├── _Full-Platform-Capabilities-Plans/  # 9 knowledge base docs
│   └── v3-update-research-Nebius/         # Nebius award research
├── e2e/                           # Playwright E2E tests
├── lib/                           # Business logic
│   ├── ai/                        # AI/ML clients
│   ├── api/                       # API utilities
│   ├── data/                      # Curriculum definitions
│   ├── db/                        # Database (Drizzle)
│   ├── repositories/              # Repository pattern
│   ├── services/                  # Service layer
│   ├── utils/                     # Utilities
│   └── validations/               # Zod schemas
├── public/                        # Static assets
│   ├── presentations/             # PDF slide decks (24)
│   └── sw.js                      # Service Worker (PWA)
├── scripts/                       # Automation scripts (12)
├── server/data/                   # Content files
│   ├── content/                   # 337+ MDX lessons
│   ├── quizzes/                   # 421 JSON quizzes
│   ├── assessments/               # 22 instruments
│   ├── checklists/                # 31 templates
│   ├── thought-records/           # 16 templates
│   └── tracking-logs/             # 21 templates
├── services/                      # Python services
│   ├── maia/                      # Unified classifier
│   └── distress-classifier/       # Legacy classifier
├── types/                         # TypeScript types (13 files)
├── Dockerfile                     # Next.js container
├── docker-compose.yml             # Local development
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── vitest.config.ts               # Vitest configuration
└── playwright.config.ts           # Playwright configuration
```

### Claude Code Configuration

**Files:**
- `.claude/CLAUDE.md` — Strategic context, revenue model, priorities
- `.claude/VISION.md` — Full strategic vision
- `.claude/COURSE_BUILD_BLUEPRINT.md` — Canonical 5-step course creation
- `.claude/COURSE_QUALITY_STANDARDS.md` — A+ quality requirements
- `.claude/settings.json` — Permissions, hooks, experimental features
- `.claude/hooks/secret-guard.sh` — Pre-tool-use secret detection

**Memory System:**
- Location: `~/.claude/projects/-Volumes-ext-data-github-mental-health-education-platform-main/memory/`
- Types: user, feedback, project, reference
- Indexed in `MEMORY.md`

---

## Strategic Context

### Why This Matters (Nebius Life Science Award)

**AI Innovation:**
- Scoped, deliberate AI use (DistilBERT for clinical, keyword-gate for optimization)
- Shows architectural judgment, not AI-everything approach

**Market:**
- Serves two TAMs simultaneously:
  - Clinical mental health: $2-3B
  - Human optimization: $20-30B
  - Total addressable market expansion: 10×

**Functionality:**
- Only platform combining:
  - Clinical treatment education
  - Peak performance optimization
  - Provider coordination
  - On HIPAA infrastructure

**Research:**
- Analytics moat generates peer-reviewed outcomes data
- 6+ months of usage patterns
- Learning outcomes across multiple clinical domains

**Defensibility:**
- Forum + analytics + rapid iteration loop
- Competitors need 1-2 years of data to replicate
- Practice licensing model = distribution without CAC

### Current Priorities (v3 Phase)

**HIGH PRIORITY:**
1. Forum integration — Community stickiness + improvement signals
2. Two-school architecture — Market differentiation + TAM expansion
3. Analytics moat — Metabase → signals → rapid iteration loop
4. Content atomization — Email sequences, blog posts, newsletters

**MEDIUM PRIORITY:**
5. White-label customization UI
6. Revenue dashboard for practices
7. Provider coordination refinement

**LOWER PRIORITY (Phase 2+):**
8. Webinars
9. CME/CE credits
10. Disability accessibility
11. International translation

---

## Document Change Log

| Date | Changes |
|------|---------|
| 2026-04-19 | Initial comprehensive document created from full platform knowledge base |

---

## Related Documentation

For deeper dives into specific areas, see:

- **INDEX.md** — Master index with depth ratings
- **00-OVERVIEW.md** — Executive summary
- **01-ARCHITECTURE.md** — System architecture details
- **02-DATABASE-API.md** — Complete schema + endpoint documentation
- **03-FEATURES.md** — Feature details + user flows
- **04-AI-ML-SYSTEMS.md** — AI/ML technical deep dive
- **05-CONTENT-CURRICULUM.md** — Content inventory + schemas
- **06-BUSINESS-LOGIC.md** — Service layer details
- **07-ML-STRATEGY.md** — Nebius application ML plan
- **08-ML-RESEARCH-LANDSCAPE.md** — Adaptive learning research

All documentation located in: `/docs/_Full-Platform-Capabilities-Plans/`

---

**End of Document**
