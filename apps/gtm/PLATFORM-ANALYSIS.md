# Customer Acquisition Academy — Platform Analysis

**Platform:** SoloFrameHub v2 — AI-Powered Customer Acquisition Academy
**Last Updated:** 2026-02-20
**Stack:** Next.js 16 / React 19 / TypeScript / Postgres / Redis / OpenRouter AI

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Architecture & Tech Stack](#2-architecture--tech-stack)
3. [Page Routes](#3-page-routes)
4. [API Endpoints](#4-api-endpoints)
5. [AI Integration](#5-ai-integration)
6. [Course Curriculum](#6-course-curriculum)
7. [Book / Manuscript](#7-book--manuscript)
8. [Authentication & Security](#8-authentication--security)
9. [Database Schema](#9-database-schema)
10. [Services Layer](#10-services-layer)
11. [Component Library](#11-component-library)
12. [External Integrations](#12-external-integrations)
13. [Deployment & Infrastructure](#13-deployment--infrastructure)
14. [Environment Variables](#14-environment-variables)
15. [Content & Data Files](#15-content--data-files)
16. [Platform Statistics](#16-platform-statistics)

---

## 1. Platform Overview

The Customer Acquisition Academy is a full-stack SaaS education platform built for solo founders who need to build systematic customer acquisition engines. It combines structured coursework, AI coaching, sales roleplay simulations, community pods, and a companion book into a single platform.

### Core Capabilities

| Capability | Description |
|-----------|-------------|
| **Academy** | 48 courses across 7 tracks, 497 lessons, quizzes with AI-graded reflections |
| **AI Coach** | Personalized coaching chat powered by multi-model AI (OpenRouter) |
| **Sales Roleplay** | DISC-based buyer persona simulations with voice support (TTS/STT) |
| **Founder Profiling** | Multi-step onboarding with AI assessment across 6 readiness dimensions |
| **Community** | Pod-based peer groups with AI facilitator, NodeBB forum integration |
| **Book Reader** | 16-chapter digital book with full-text search and reading progress tracking |
| **Analytics** | Metabase dashboards, assessment snapshots, chat session persistence |
| **Forms Engine** | Custom public forms with admin review, CSV export, and workflow logs |

### Key URLs

| Service | URL |
|---------|-----|
| App | `https://ai-solo-gtm-os.soloframehub.com` |
| Forum | `https://ai-caa-forum.soloframehub.com` |
| Analytics | `https://metabase.soloframehub.com` |
| Dokploy | `http://46.202.88.248:3000` |

---

## 2. Architecture & Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS v4, Headless UI, Radix UI
- **State:** TanStack React Query (server state), React context (local state)
- **Charts:** Chart.js with date-fns adapter
- **Icons:** Lucide React
- **Themes:** next-themes (dark mode)
- **MDX:** next-mdx-remote, remark-gfm

### Backend
- **Runtime:** Node.js 20 (Alpine)
- **ORM:** Drizzle ORM (PostgreSQL)
- **Auth:** Lucia v3 with Drizzle adapter
- **Password Hashing:** @node-rs/argon2
- **Validation:** Zod schemas
- **Email:** Resend.io
- **Cache:** Redis (ioredis) — sliding window rate limiting, session caching
- **Storage:** AWS S3 / MinIO
- **AI:** OpenAI SDK routing through OpenRouter

### Infrastructure
- **Hosting:** Dokploy on Hostinger VPS
- **Containerization:** Docker (multi-stage, standalone output)
- **Database:** PostgreSQL
- **Cache:** Redis
- **Payments:** Polar.sh (monthly/annual subscriptions, book purchase)
- **Forum:** NodeBB (separate service, synced via API)
- **Automation:** n8n workflows (facilitator cron jobs)
- **Analytics:** Metabase (connected to Postgres)

### Testing
- **Unit:** Vitest + Testing Library
- **E2E:** Playwright (Chrome, Firefox, Safari)
- **Coverage:** @vitest/coverage-v8

---

## 3. Page Routes

70 page routes across 8 layout groups.

### Authentication `(auth)`
| Route | Purpose |
|-------|---------|
| `/signin` | Email/password sign-in |
| `/signup` | New user registration (beta whitelist) |
| `/verify-email` | 6-digit email verification |
| `/reset-password` | Password reset flow |

### Main App `(default)`

**Academy:**
| Route | Purpose |
|-------|---------|
| `/academy` | Course listing by track |
| `/academy/[courseId]` | Course detail with lesson list |
| `/academy/[courseId]/[lessonId]` | Lesson content + quiz |
| `/academy/tools/icp-builder` | Interactive ICP Builder tool |

**Dashboard:**
| Route | Purpose |
|-------|---------|
| `/dashboard` | Main dashboard with progress, milestones, quick actions |
| `/dashboard/analytics` | Personal analytics |
| `/dashboard/fintech` | Fintech-specific variant |
| `/dashboard/admin/forms` | Admin: form submission management |
| `/dashboard/admin/forms/[id]` | Admin: individual form detail |

**Community:**
| Route | Purpose |
|-------|---------|
| `/community` | Community hub |
| `/community/forum` | NodeBB forum listing |
| `/community/forum/post/[postId]` | Forum post detail |
| `/community/meetups` | Meetup listing |
| `/community/meetups/post/[postId]` | Meetup post detail |
| `/community/entrance-survey` | New member survey for pod matching |
| `/community/feed` | Activity feed |
| `/community/pods/[podId]` | Learning pod detail |
| `/community/users-tabs` | Member directory (tab view) |
| `/community/users-tiles` | Member directory (grid view) |

**AI Tools:**
| Route | Purpose |
|-------|---------|
| `/coach` | AI coaching chat interface |
| `/roleplay` | Sales roleplay simulator with voice |

**Settings:**
| Route | Purpose |
|-------|---------|
| `/settings/account` | Account settings |
| `/settings/billing` | Billing management |
| `/settings/notifications` | Notification preferences |
| `/settings/feedback` | Feedback form |
| `/settings/plans` | Plan selection |
| `/settings/apps` | Connected apps |

**Other:**
| Route | Purpose |
|-------|---------|
| `/subscribe` | Subscription page |
| `/checkout/confirmation` | Post-checkout confirmation |
| `/analytics` | Metabase embed |

### Onboarding `(onboarding)`
| Route | Purpose |
|-------|---------|
| `/onboarding` | Entry point |
| `/onboarding/welcome` | Welcome step |
| `/onboarding/business` | Business info collection |
| `/onboarding/goal` | Primary goal selection |
| `/onboarding/context` | Context gathering |
| `/onboarding/questionnaire` | Assessment questionnaire |
| `/onboarding/assessment` | Assessment results review |
| `/onboarding/analyzing` | AI analysis in progress |
| `/founder-assessment` | Founder category assessment |

### Book `(book)`
| Route | Purpose |
|-------|---------|
| `/book` | Chapter listing |
| `/book/[chapterSlug]` | Chapter reader |

### Public `(public)`
| Route | Purpose |
|-------|---------|
| `/forms/[slug]` | Public-facing custom form |
| `/forms/thank-you` | Form submission confirmation |

### Messaging `(double-sidebar)`
| Route | Purpose |
|-------|---------|
| `/messages` | Direct messages |
| `/inbox` | Message inbox |
| `/community/profile` | User profile |

### Marketing (Static)
| Route | Purpose |
|-------|---------|
| `/` | Marketing homepage (static HTML, rewrites for authenticated users) |
| `/blog` | Blog (static HTML) |
| `/es` | Spanish homepage |

---

## 4. API Endpoints

49 API routes organized by domain.

### AI APIs
| Method | Endpoint | Auth | Rate Limit | Purpose |
|--------|----------|------|------------|---------|
| POST | `/api/ai/chat` | Session | 10/min per user | AI coaching conversation |
| POST | `/api/ai/roleplay` | Session | 10/min per user | Sales roleplay scenario |
| POST | `/api/ai/roleplay/evaluate` | Session | 10/min per user | Roleplay scoring/feedback |
| POST | `/api/ai/icp-validation` | Session | 10/min per user | ICP validation with AI |
| POST | `/api/ai/voice/tts` | Session | 10/min per user | Text-to-speech |
| POST | `/api/ai/voice/stt` | Session | 10/min per user | Speech-to-text |

### Auth APIs
| Method | Endpoint | Auth | Rate Limit | Purpose |
|--------|----------|------|------------|---------|
| POST | `/api/auth/signup` | None | 5/15min by IP | User registration |
| POST | `/api/auth/signin` | None | 5/15min by IP | User login |
| POST | `/api/auth/signout` | Session | — | Logout |
| POST | `/api/auth/verify-email` | Session | 5/15min by user | Email verification |
| POST | `/api/auth/resend-code` | Session | 5/15min by user | Resend verification code |
| GET | `/api/auth/session` | Session | — | Get current session |

### Academy APIs
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/academy/complete-lesson` | Session | Mark lesson complete, award XP |
| GET | `/api/academy/quiz/[sectionId]/[courseId]/[lessonId]` | Session | Load quiz for lesson |

### Onboarding APIs
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/onboarding/business` | Session | Save business info |
| POST | `/api/onboarding/goal` | Session | Save primary goal |
| POST | `/api/onboarding/context` | Session | Save inferred context |
| POST | `/api/onboarding/questionnaire` | Session | Save questionnaire response |
| POST | `/api/onboarding/complete-assessment` | Session | Save assessment results |
| POST | `/api/onboarding/complete` | Session | Mark onboarding done |
| POST | `/api/onboarding/analyze` | Session | Trigger AI analysis |
| POST | `/api/onboarding/upload` | Session | Document upload (PDF) |
| GET | `/api/onboarding/industries` | Session | Industry list |

### Profile & Subscription APIs
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/api/profile` | Session | Get founder profile |
| POST | `/api/subscription` | Session | Manage subscription |
| POST | `/api/checkout` | Session | Stripe/Polar checkout |

### Community APIs
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/community/entrance-survey` | Session | Save entrance survey |
| POST | `/api/community/matching` | Admin | Trigger pod matching |
| GET | `/api/community/pods` | Session | List user's pods |
| POST | `/api/community/pods` | Admin | Create new pod |
| GET | `/api/community/pods/[podId]` | Session | Pod detail |
| POST | `/api/community/pods/[podId]/members` | Admin | Add pod member |

### Book APIs
| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/api/book/reading-event` | Session | Track reading progress |
| GET | `/api/book/search` | Session | Full-text book search |

### Admin APIs (Authorization: Bearer header only)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/admin/forms` | List form submissions with filters |
| GET | `/api/admin/forms/[id]` | Form submission detail |
| PATCH | `/api/admin/forms/[id]` | Update form status/notes |
| GET | `/api/admin/forms/export` | CSV export of submissions |
| POST | `/api/admin/forum-setup` | Initialize NodeBB structure |
| POST | `/api/admin/forum-sync` | Sync forum data to Postgres |
| POST | `/api/admin/facilitator` | Trigger facilitator posts |
| POST | `/api/admin/content-version` | Log content changes |
| GET | `/api/admin/content-version` | List content versions |
| POST | `/api/admin/seed-demo` | Seed demo data |

### Webhook & Utility APIs
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/webhook/polar` | Polar.sh payment webhooks |
| POST | `/api/webhooks/nodebb` | NodeBB event webhooks |
| POST | `/api/forms/submit` | Public form submission |
| GET | `/api/roleplay/roles` | Available roleplay personas |
| GET | `/api/health` | Health check |

---

## 5. AI Integration

### Multi-Model Architecture

All AI calls route through a centralized client factory (`lib/ai/client.ts`) that uses **OpenRouter** as the primary provider, falling back to direct **OpenAI** if no OpenRouter key is set.

Voice services (TTS/STT) always use the direct OpenAI client since OpenRouter doesn't support audio endpoints.

```
┌─────────────────┐
│  AI Task Request │
└────────┬────────┘
         │
    ┌────▼─────┐
    │ models.ts │  ← resolveModel(task) picks the right model
    │ 13 tasks  │     ENV override → legacy ENV → hardcoded default
    └────┬─────┘
         │
    ┌────▼──────┐          ┌──────────────┐
    │ client.ts │──text──▶ │  OpenRouter   │
    │ aiClient  │          │ (multi-model) │
    └───────────┘          └──────────────┘
         │
    ┌────▼──────┐          ┌──────────────┐
    │ client.ts │──audio─▶ │  OpenAI      │
    │voiceClient│          │ (TTS/STT)    │
    └───────────┘          └──────────────┘
```

### AI Task Types & Active Models

13 AI tasks, each with its own model assignment configured via env var (`AI_MODEL_*`). These are the models actually running in production via OpenRouter:

| Task | Active Model | Env Var | Purpose |
|------|-------------|---------|---------|
| `coaching` | `anthropic/claude-sonnet-4-5` | `AI_MODEL_COACHING` | Solo Advisor coaching chat |
| `roleplay` | `anthropic/claude-sonnet-4-5` | `AI_MODEL_ROLEPLAY` | Sales conversation simulation |
| `roleplay-eval` | `openai/gpt-4o` | `AI_MODEL_ROLEPLAY_EVAL` | Roleplay scoring & feedback |
| `assessment` | `openai/gpt-4o-mini` | `AI_MODEL_ASSESSMENT` | Founder readiness assessment |
| `icp-validation` | `openai/gpt-4o-mini` | `AI_MODEL_ICP_VALIDATION` | ICP scoring against personas |
| `website-analysis` | `openai/gpt-4o-mini` | `AI_MODEL_WEBSITE_ANALYSIS` | Business website analysis |
| `linkedin-analysis` | `openai/gpt-4o-mini` | `AI_MODEL_LINKEDIN_ANALYSIS` | LinkedIn profile analysis |
| `rag-extraction` | `anthropic/claude-sonnet-4-5` | `AI_MODEL_RAG_EXTRACTION` | Document content extraction |
| `quiz-reflection` | `openai/gpt-4o-mini` | `AI_MODEL_QUIZ_REFLECTION` | AI-graded quiz reflections |
| `facilitator` | `openai/gpt-4o-mini` | `AI_MODEL_FACILITATOR` | Pod facilitator posts |
| `persona` | `openai/gpt-4o-mini` | `AI_MODEL_PERSONA` | Founder persona generation |
| `tts` | `tts-1` | `AI_MODEL_TTS` | Text-to-speech (direct OpenAI) |
| `stt` | `whisper-1` | `AI_MODEL_STT` | Speech-to-text (direct OpenAI) |

**Model resolution** (`lib/ai/models.ts`): Each task checks its env var first, then a legacy env var (e.g. `OPENAI_FLOW_MODEL`), then falls back to `gpt-4o-mini`. In practice the env vars are always set, so the fallback chain is just a safety net.

### AI Flow Files

| File | Purpose |
|------|---------|
| `lib/ai/client.ts` | Centralized client factory (OpenRouter/OpenAI) |
| `lib/ai/models.ts` | 13-task model resolution + token usage logging |
| `lib/ai/openai-coaching.ts` | Coaching conversation handler |
| `lib/ai/openai-flows.ts` | Structured JSON/text flows (ICP, assessment, roleplay, etc.) |

---

## 6. Course Curriculum

### 7 Tracks, 48 Courses, 497 Lessons

#### Track 1: Foundations (5 Courses, 48 Lessons)
| # | Course | Lessons | Status |
|---|--------|---------|--------|
| 0 | Solo Founder Sales Psychology | 8 | Available |
| 1 | ICP Builder Workshop | 13 | Available |
| 2 | Positioning & Value Proposition | 10 | Available |
| 3 | Choose Your Acquisition Path | 6 | Available |
| 4 | List Building & Prospecting Infrastructure | 11 | Available |

#### Track 2: Marketing Engine (8 Courses, 88 Lessons)
| # | Course | Lessons | Status |
|---|--------|---------|--------|
| 5 | Technical Content Engine | 13 | Available |
| 6 | SEO & Answer Engine Optimization | 12 | Available |
| 7 | LinkedIn Growth Engine | 10 | Available |
| 8 | Cold Email Mastery | 12 | Available |
| 9 | Community-Based Lead Generation | 11 | Available |
| 10 | Email Nurture & Newsletter | 10 | Available |
| 11 | Social Proof & Referral Systems | 10 | Available |
| 12 | Marketing Automation & Analytics | 10 | Available |

#### Track 3: Sales Methodology (8 Courses, 83 Lessons)
| # | Course | Lessons | Status |
|---|--------|---------|--------|
| 13 | Understanding DISC Buyer Personas | 12 | Available |
| 14 | Discovery Framework — BANT/MEDDIC | 12 | Available |
| 15 | Discovery Call Simulations | 10 | Available |
| 16 | Demo Architecture | 9 | Available |
| 17 | Objection Handling Database | 10 | Available |
| 18 | Proposals, Pricing & Negotiation | 10 | Available |
| 19 | Closing & Next Steps | 10 | Available |
| 20 | Sales Pipeline Management | 10 | Available |

#### Track 4: AI-Powered Acquisition (7 Courses, 76 Lessons)
| # | Course | Lessons | Status |
|---|--------|---------|--------|
| 21 | AI Acquisition Strategy | 10 | Coming Soon |
| 22 | Email Deliverability & Infrastructure | 12 | Coming Soon |
| 23 | AI Lead Research & Enrichment | 10 | Coming Soon |
| 24 | AI Outreach Automation | 12 | Coming Soon |
| 25 | LinkedIn AI Applications | 10 | Coming Soon |
| 26 | Autonomous SDR Systems | 10 | Coming Soon |
| 27 | Building Custom AI Sales Agents | 12 | Coming Soon |

#### Track 5: Creator Economy (8 Courses, 72 Lessons)
| # | Course | Lessons | Status |
|---|--------|---------|--------|
| 28 | The Creator Sales Mindset | 8 | Partial |
| 29 | Audience to Buyer Conversion | 10 | Partial |
| 30 | Webinar & Challenge Funnels | 10 | Partial |
| 31 | Creator Sales Conversations | 10 | Partial |
| 32 | DM Selling & Social Commerce | 8 | Partial |
| 33 | Creator Metrics That Matter | 8 | Partial |
| 34 | Scaling Creator Sales | 10 | Partial |
| 35 | Community-Led Sales | 8 | Partial |

#### Track 6: Customer Success (4 Courses, 36 Lessons)
| # | Course | Lessons | Status |
|---|--------|---------|--------|
| 36 | Customer Onboarding | 10 | Coming Soon |
| 37 | Retention & Churn Prevention | 10 | Coming Soon |
| 38 | Expansion & Upsell | 8 | Coming Soon |
| 39 | Customer Advocacy | 8 | Coming Soon |

#### Track 7: Operations & Systems (9 Courses, 84 Lessons)
| # | Course | Lessons | Status |
|---|--------|---------|--------|
| 40 | Advanced CRM Setup | 10 | Coming Soon |
| 41 | Sales Analytics & BI | 10 | Coming Soon |
| 42 | Sales Automation | 10 | Coming Soon |
| 43 | Outsourcing & VAs | 8 | Coming Soon |
| 44 | The Sales Playbook | 10 | Coming Soon |
| 45 | Scaling to First Sales Hire | 10 | Coming Soon |
| 46 | Sales Legal & Contracts | 7 | Coming Soon |
| 47 | Sales Finance & Tax | 7 | Coming Soon |
| 48 | Multi-Million Dollar Capstone | 12 | Coming Soon |

### Content Delivery
- **291 lesson markdown files** deployed in `/server/data/content/`
- **289 quiz JSON files** with multiple-choice, calculations, and AI-graded reflections
- Lessons average 45-60 minutes; total estimated: 400+ hours of content
- Quizzes require 70-80% to pass

---

## 7. Book / Manuscript

**Title:** "The Solo Founder's Customer Acquisition Playbook"
**Author:** Mike Sullivan
**Format:** 32 markdown chapters (~890 KB), 43 visual assets

### Structure

| Part | Chapters | Topics |
|------|----------|--------|
| Front Matter | How to Use This Book, Introduction | Setup, philosophy |
| Part 1: Psychology & Positioning | 3 chapters | Sales psychology, ICP, positioning |
| Part 2: Conversations & Conversion | 4 chapters | Discovery, DISC, demos, closing |
| Part 3: Systems, Metrics & Playbooks | 6 chapters | Pipeline, automation, content, analytics |
| Part 4: Your Playbook & The Future | 3 chapters | Personal playbook, AI sales, future |
| Appendices | 3 appendices | Framework index, glossary, sources |
| Back Matter | Your Next 30 Days | 30-day action plan |

### Access Model
- **3 free chapters:** Introduction, How to Use, Why You Hate Selling
- **12 premium chapters:** Require subscription or book purchase via Polar.sh

### Features
- Full-text search (`/api/book/search`)
- Reading progress tracking (`/api/book/reading-event`)
- Formatted text rendering (not raw markdown)

---

## 8. Authentication & Security

### Auth Stack
- **Library:** Lucia v3
- **Adapter:** Drizzle (Postgres)
- **Password Hashing:** Argon2 via @node-rs/argon2 (19456 memory, 2 time cost)
- **Sessions:** HTTP-only cookies, database-backed
- **Email Verification:** 6-digit code, 15-minute expiry
- **Beta Access:** `BETA_EMAILS` whitelist (comma-separated)
- **Mock Mode:** `NEXT_PUBLIC_MOCK_AUTH=true` for dev/testing

### Rate Limiting (Redis sliding window)
| Scope | Limit | Window | Identifier |
|-------|-------|--------|------------|
| Auth (signin, signup) | 5 attempts | 15 minutes | Client IP |
| Auth (verify-email, resend-code) | 5 attempts | 15 minutes | User ID |
| AI endpoints (chat, ICP, roleplay, voice) | 10 requests | 1 minute | User ID |
| General API | 60 requests | 1 minute | Client IP |

### Admin API Security
- All 9 admin/community endpoints accept auth via `Authorization: Bearer <secret>` header only
- No query parameter fallback (removed — tokens were leaking in server logs)
- Secret stored in `ADMIN_API_SECRET` env var

### Input Validation
- Email: `/.+@.+\..+/` regex + lowercase normalization
- Passwords: Minimum 6 characters
- All API bodies validated with Zod schemas
- HTML sanitization via isomorphic-dompurify

### Middleware
- `www` to non-www redirect (301)
- Authenticated root redirects to `/dashboard`
- Platform subdomain routing

---

## 9. Database Schema

PostgreSQL via Drizzle ORM. 11 core tables.

### Tables

| Table | Primary Key | Purpose |
|-------|-------------|---------|
| `user` | `id` (text) | User accounts — email, hashedPassword, emailVerified, emailVerificationCode, emailVerificationExpiresAt |
| `session` | `id` (text) | Lucia sessions — userId (FK), expiresAt |
| `profile` | `userId` (text) | Founder profiles — `data` (JSONB blob), updatedAt |
| `subscription` | `id` (text) | Polar.sh subscriptions — userId, polarCustomerId, status, currentPeriodEnd |
| `lesson_event` | `id` (text) | Course progress — userId, courseId, lessonId, eventType, xpEarned |
| `roleplay_session` | `id` (text) | Roleplay records — userId, industryId, roleId, discType, transcript (JSON), evaluation |
| `chat_session` | `id` (text) | AI chat sessions — userId, contextCourseId, messageCount |
| `chat_message` | `id` (text) | Chat messages — sessionId (FK), role, content |
| `assessment_snapshot` | `id` (text) | Historical assessments — userId, overallReadiness, 6 dimension scores, recommendedPath |
| `form_submission` | `id` (text) | Public form entries — formSlug, email, name, data (JSONB), score, status, UTM params |
| `form_workflow_log` | `id` (text) | Form workflow audit log — submissionId (FK), action, details |
| `content_version` | `id` (text) | Content change log — entityType, entityId, versionLabel, changeSummary |
| `forum_topic_sync` | `nodebbTid` | NodeBB topic cache — title, categoryName, postCount, viewCount |
| `forum_post_sync` | `nodebbPid` | NodeBB post cache — nodebbTid (FK), contentPreview, voteCount |

### Key Design Decisions
- **JSONB `profile.data`** — flexible schema, no migrations for new profile fields
- **Atomic JSONB merge** on profile updates: `COALESCE(data, '{}') || patch::jsonb` (no read-modify-write race condition)
- **`getByEmail()`** uses JSONB operator: `data->>'email' = $1` with `LIMIT 1` (no full-table scan)
- **Assessment snapshots** are append-only for Metabase historical analysis
- **Forum sync tables** mirror NodeBB for cross-platform analytics

---

## 10. Services Layer

26 service files in `lib/services/` implementing core business logic.

| Service | File | Key Methods |
|---------|------|-------------|
| **Profile (Facade)** | `profileService.ts` | getProfile, updateProfile, saveArtifact, getSafeContext |
| **Profile Core** | `profileCoreService.ts` | JSONB persistence, merge logic |
| **Profile Context** | `profileContextService.ts` | Build context strings for AI prompts |
| **Onboarding** | `onboardingService.ts` | saveBusinessInfo, saveGoalInfo, saveAssessment |
| **Quiz** | `quizService.ts` | loadQuiz, calculateScore, getQuizDetails |
| **Roleplay** | `roleplayService.server.ts` | Server-side roleplay flow execution |
| **Roleplay Prompts** | `roleplayPromptBuilder.ts` | System prompt construction for DISC scenarios |
| **Persona** | `personaService.ts` | calculateFounderCategory, getPersonas |
| **Pod** | `podService.ts` | createPod, addMember, getPodDetails |
| **Pod Matching** | `podMatchingService.ts` | Profile-based matching algorithm |
| **Forum Structure** | `forumStructureService.ts` | NodeBB category hierarchy |
| **Forum Sync** | `forumSyncService.ts` | Sync topics/posts from NodeBB to Postgres |
| **Milestone** | `milestoneService.ts` | trackMilestone, getAchievements |
| **Facilitator** | `facilitatorService.ts` | AI-generated weekly nudges and synthesis |
| **Voice** | `voiceService.ts` | TTS (OpenAI) and STT (Whisper) |

### Repository Layer

| Repository | File | Purpose |
|-----------|------|---------|
| **Profile (Interface)** | `lib/repositories/profileRepository.ts` | IProfileRepository interface |
| **Profile (Postgres)** | `lib/repositories/postgresProfileRepository.ts` | Drizzle implementation |

---

## 11. Component Library

90 React components across 7 categories.

### UI Primitives (`components/ui/`) — 13 files
Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card, Checkbox, Date Picker, Dialog, Dropdown, Form, Input, Label, Pagination, Popover, Radio, Select, Separator, Switch, Table, Tabs, Textarea, Tooltip

### AI Components (`components/ai/`) — 3 files
Chat interface, Roleplay scenario display, Coaching feedback UI

### Book Components (`components/book/`) — 7 files
Reader, Chapter navigation, Markdown rendering, Search

### Chart Components (`components/charts/`) — 22 files
Chart.js wrappers: Line, Bar, Area, Pie, Doughnut, Radar + analytics visualizations

### MDX Components (`components/mdx/`) — 13 files
Code blocks, Callouts, Images, Embedded components for lesson content

### Form Components (`components/forms/`) — 4 files
Custom form fields, Validation UI

### Utilities (`components/utils/`) — 5 files
Error boundary, PWA registration, Theme toggle, Search modal, React Query provider

---

## 12. External Integrations

| Service | Purpose | Config |
|---------|---------|--------|
| **OpenRouter** | Multi-model AI gateway | `OPENROUTER_API_KEY` |
| **OpenAI** | TTS/STT + fallback AI | `OPENAI_API_KEY` |
| **Polar.sh** | Payments (subscription + book) | `POLAR_WEBHOOK_SECRET`, product IDs |
| **Resend.io** | Transactional email | `RESEND_API_KEY` |
| **NodeBB** | Community forum | `NODEBB_URL`, `NODEBB_API_KEY`, `NODEBB_ADMIN_UID` |
| **Redis** | Caching + rate limiting | `REDIS_URL` |
| **PostgreSQL** | Primary database | `DATABASE_URL` |
| **AWS S3 / MinIO** | File storage | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` |
| **Metabase** | Analytics dashboards | `NEXT_PUBLIC_METABASE_URL` |
| **Listmonk** | Email newsletter | `LISTMONK_API_URL`, `LISTMONK_API_USER`, `LISTMONK_API_PASS` |
| **n8n** | Workflow automation | Calls admin API endpoints on cron |
| **Dokploy** | Deployment management | `DOKPLOY_DEPLOY_API_KEY` |

---

## 13. Deployment & Infrastructure

### Docker Build
```
Multi-stage: Node 20 Alpine
Build → Standalone output
Runtime → Minimal image (non-root nextjs user)
Entrypoint: scripts/docker-entrypoint.js (runs DB migrations on start)
Port: 3000
```

### Files Copied into Container
- `.next/standalone` — App code
- `.next/static` — Client JS/CSS
- `public/` — Static assets
- `server/` — Course content (markdown)
- `docs/manuscript/` — Book chapters
- `seed-data/` — Master data JSONs
- `scripts/docker-entrypoint.js` — Startup script

### Dokploy
- **Host:** `http://46.202.88.248:3000`
- **App ID:** `7tDDUfiTNW_hchmoz9qsD`
- **API Auth:** `x-api-key` header
- **Auto-deploy:** Pushes to `main` branch trigger builds

### Operations Scripts (`scripts/ops/`)
| Script | Purpose |
|--------|---------|
| `backup.sh` | Database backup |
| `restore.sh` | Database restore |
| `health-check.sh` | Service health checks |
| `install-crons.sh` | Setup cron jobs |
| `maintenance.sh` | Maintenance tasks |
| `security-audit.sh` | Security audit |

---

## 14. Environment Variables

43 environment variables across 10 categories.

### AI / OpenRouter
```
OPENROUTER_API_KEY                 # Primary AI provider
OPENAI_API_KEY                     # Fallback + voice services
AI_MODEL_COACHING                  # Per-task model overrides (13 total)
AI_MODEL_ROLEPLAY
AI_MODEL_ROLEPLAY_EVAL
AI_MODEL_ASSESSMENT
AI_MODEL_ICP_VALIDATION
AI_MODEL_WEBSITE_ANALYSIS
AI_MODEL_LINKEDIN_ANALYSIS
AI_MODEL_RAG_EXTRACTION
AI_MODEL_QUIZ_REFLECTION
AI_MODEL_FACILITATOR
AI_MODEL_PERSONA
AI_MODEL_TTS
AI_MODEL_STT
```

### Database & Cache
```
DATABASE_URL                       # Postgres connection string
REDIS_URL                          # Redis connection (default: localhost:6379)
REDIS_ENABLED                      # Enable/disable Redis
```

### Authentication
```
BETA_EMAILS                        # Comma-separated beta whitelist
ADMIN_EMAILS                       # Admin notification recipients
ADMIN_API_SECRET                   # Admin API bearer token
```

### Payments (Polar.sh)
```
NEXT_PUBLIC_POLAR_MONTHLY_ID       # Monthly subscription product
NEXT_PUBLIC_POLAR_ANNUAL_ID        # Annual subscription product
NEXT_PUBLIC_POLAR_BOOK_PRODUCT_ID  # Book purchase product
POLAR_WEBHOOK_SECRET               # Webhook verification
```

### Email
```
RESEND_API_KEY                     # Resend.io API key
```

### Forum (NodeBB)
```
NODEBB_URL                         # Forum base URL
NODEBB_API_KEY                     # Forum admin API key
NODEBB_ADMIN_UID                   # Admin user ID
NODEBB_PODS_PARENT_CID             # Parent category for pods
FACILITATOR_BOT_UID                # Bot user ID
```

### Newsletter (Listmonk)
```
LISTMONK_API_URL
LISTMONK_API_USER
LISTMONK_API_PASS
```

### Storage (S3)
```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
```

### App Config
```
NEXT_PUBLIC_APP_URL                # App root URL
NEXT_PUBLIC_FORUM_URL              # Forum root URL
NEXT_PUBLIC_METABASE_URL           # Metabase URL
NEXT_PUBLIC_APP_NAME               # Display name
NEXT_PUBLIC_APP_VERSION            # Version string
NEXT_PUBLIC_MOCK_AUTH              # Mock auth for dev (true/false)
OPENAI_TTS_VOICE                   # TTS voice (alloy/echo/fern/nova/onyx/shimmer)
```

### Build & Deployment
```
NODE_ENV                           # development / production
NEXT_TELEMETRY_DISABLED            # Disable Next.js telemetry
DOKPLOY_DEPLOY_API_KEY             # Dokploy API access
```

---

## 15. Content & Data Files

### Curriculum Data (`lib/data/`)
| File | Size | Content |
|------|------|---------|
| `curriculum.ts` | 88 KB | Master curriculum: 48 courses, 497 lessons |
| `book-structure.ts` | 9.4 KB | 32-chapter book hierarchy |
| `onboarding-data.ts` | 4.7 KB | Assessment questions, DISC scenarios |
| `landing-curriculum.ts` | 13 KB | Marketing landing page curriculum preview |
| `personas.ts` | 7.1 KB | Founder persona definitions |
| `personas-forum.ts` | 6.3 KB | Forum bot personas |
| `forum-bots.ts` | 1.9 KB | Forum moderator bot config |
| `terminology.ts` | 2 KB | Glossary |

### Seed Data (`seed-data/`)
| File | Content |
|------|---------|
| `discPatterns.json` | DISC personality patterns for roleplay |
| `clientRoles.json` | Client role definitions |
| `founderCategories.json` | Founder category taxonomy |
| `industries/*.json` | 13 industry verticals (fintech, SaaS, agencies, edtech, ecommerce, real estate, healthtech, devtools, martech, manufacturing, professional services, HR/recruiting) |

### Lesson Content (`server/data/content/`)
- 291 markdown files organized by track/course
- Path pattern: `[track]/[course]/lesson-[N].md`

### Quiz Content (`server/data/quizzes/`)
- 289 JSON quiz files
- Mix of multiple-choice, calculation, and AI-graded reflection questions

### Documentation (`docs/`)
- 75+ markdown files
- Migration docs, setup guides, architecture decisions
- Manuscript in `docs/manuscript/` (32 chapters + 43 visuals)

---

## 16. Platform Statistics

| Metric | Count |
|--------|-------|
| Page Routes | 70 |
| API Endpoints | 49 |
| Services | 26 |
| React Components | 90 |
| Database Tables | 14 |
| TypeScript Type Files | 9 |
| Courses | 48 |
| Lessons | 497 |
| Quiz Files | 289 |
| Book Chapters | 32 |
| Industry Verticals | 13 |
| AI Task Types | 13 |
| Environment Variables | 43 |
| External Integrations | 12 |
| Documentation Files | 75+ |
| Estimated Content Hours | 400+ |

### Course Availability

| Status | Courses | Lessons |
|--------|---------|---------|
| Available | 21 | 219 |
| Partial | 8 | 72 |
| Coming Soon | 19 | 206 |
| **Total** | **48** | **497** |
