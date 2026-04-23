# MHE Platform Analysis

> Full architecture reference for the Mental Health Education platform.
> Last updated: 2026-02-20

---

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Node.js | >= 20 |
| Framework | Next.js (App Router) | 16.0.10 |
| UI | React + Tailwind CSS | 19.2.3 / 4.1.18 |
| ORM | Drizzle | 0.38.0 |
| Database | Postgres | (Dokploy-managed) |
| Cache | Redis (ioredis) | 5.8.2 |
| Auth | Lucia + Argon2 | 3.2.2 |
| AI | OpenAI (via OpenRouter) | 6.17.0 |
| Storage | S3-compatible (MinIO) | @aws-sdk/client-s3 |
| Payments | Polar | sandbox mode |
| Analytics | Umami | client-side |
| Content | MDX (next-mdx-remote) | 5.0.0 |

---

## Database Schema (Postgres)

5 tables, all defined in `lib/db/schema.ts`:

| Table | Primary Key | Purpose |
|-------|------------|---------|
| `user` | `id` (text) | Lucia auth users. email (unique), hashed_password (Argon2) |
| `session` | `id` (text) | Lucia sessions. FK -> user.id, expires_at |
| `profile` | `user_id` (text) | Wellness profile as JSONB. FK -> user.id |
| `mood_entry` | `id` (text) | Daily mood check-ins. mood/anxiety/sleep/energy (1-10), triggers, coping techniques |
| `coach_session` | `id` (text) | AI coaching transcripts. topic, crisis_detected flag |

Migrations run automatically via `scripts/docker-entrypoint.js` (CREATE TABLE IF NOT EXISTS).

---

## API Routes (21 endpoints)

### Auth (4)
| Method | Path | Auth | Rate Limited |
|--------|------|------|-------------|
| POST | `/api/auth/signin` | No | Yes (5/15min by IP) |
| POST | `/api/auth/signup` | No | Yes (5/15min by IP) |
| POST | `/api/auth/signout` | Session | No |
| GET | `/api/auth/session` | Session | No |

### AI (3)
| Method | Path | Auth | Rate Limited |
|--------|------|------|-------------|
| POST | `/api/ai/chat` | Session | Yes (10/min by userId) |
| POST | `/api/ai/voice/tts` | No | Yes (10/min by IP) |
| POST | `/api/ai/voice/stt` | Session | Yes (10/min by userId) |

### Academy (7)
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/academy/complete-lesson` | Session |
| GET/POST | `/api/academy/assessment/[courseId]/[lessonId]` | Session |
| GET/POST | `/api/academy/checklist/[courseId]/[lessonId]` | Session |
| GET/POST | `/api/academy/component-state/[courseId]/[lessonId]` | Session |
| GET/POST | `/api/academy/quiz/[sectionId]/[courseId]/[lessonId]` | Session |
| GET/POST | `/api/academy/thought-record/[courseId]/[lessonId]` | Session |
| GET/POST | `/api/academy/tracking-log/[courseId]/[lessonId]` | Session |

### Onboarding (4)
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/onboarding/assessment` | Session |
| POST | `/api/onboarding/complete` | Session |
| POST | `/api/onboarding/goals` | Session |
| POST | `/api/onboarding/questionnaire` | Session |

### Other (3)
| Method | Path | Auth |
|--------|------|------|
| GET/PUT | `/api/profile` | Session |
| GET | `/api/health` | No |
| GET | `/api/hello` | No |

---

## AI Architecture

### Client Routing (`lib/ai/client.ts`)
- `aiClient` — Routes through OpenRouter when `OPENROUTER_API_KEY` is set, direct OpenAI otherwise
- `voiceClient` — Always direct OpenAI (OpenRouter doesn't support audio)

### Per-Task Model Resolution (`lib/ai/models.ts`)

| Task | Env Var | Legacy Fallback | Default |
|------|---------|----------------|---------|
| coaching | `AI_MODEL_COACHING` | `OPENAI_CHAT_MODEL` | gpt-4o-mini |
| quiz-reflection | `AI_MODEL_QUIZ_REFLECTION` | `OPENAI_FLOW_MODEL` | gpt-4o-mini |
| tts | `AI_MODEL_TTS` | `OPENAI_TTS_MODEL` | tts-1 |
| stt | `AI_MODEL_STT` | — | whisper-1 |

### Current Production Models
- **Coaching**: `anthropic/claude-sonnet-4-5` (via OpenRouter)
- **Quiz Reflection**: `openai/gpt-4o-mini` (via OpenRouter)
- **TTS/STT**: `tts-1` / `whisper-1` (direct OpenAI)

### AI Files
| File | Purpose |
|------|---------|
| `lib/ai/client.ts` | Client factory (OpenRouter / direct OpenAI) |
| `lib/ai/models.ts` | Model resolution + token usage logging |
| `lib/ai/openai-coaching.ts` | Wellness coach with crisis detection |
| `lib/ai/openai-flows.ts` | Quiz reflection (structured JSON output) |
| `lib/services/voiceService.ts` | TTS + STT via OpenAI audio API |

### Crisis Detection
`openai-coaching.ts` includes keyword-based crisis detection:
- **Immediate**: suicide plan, self-harm intent -> returns pre-built 988 Lifeline response
- **High**: suicidal ideation, hopelessness -> returns 988 Lifeline resources
- **Moderate**: overwhelm, desperation -> handled by AI with extra care
- **None**: normal conversation

---

## Curriculum Structure

5 tracks, 30+ courses, 200+ MDX lessons in `server/data/content/`:

| Track | Courses | Content Path |
|-------|---------|-------------|
| Anxiety & Fear | 7 (anxiety mgmt, panic, social anxiety, OCD, toolkit x3) | `anxiety-and-fear/` |
| Mood & Emotional Health | 7 (depression, anger, bipolar, grief, dysregulation, self-esteem, perfectionism) | `mood-emotional-health/` |
| Sleep & Recovery | 2 (insomnia, sleep mastery) | `sleep-recovery/` |
| Stress & Resilience | 2 (trauma recovery, burnout) | `stress-resilience/` |
| Nutrition & Brain Health | 5 (food-mood x2, gut-brain, dietary patterns, precision nutrition) | `nutrition-brain-health/` |

Each course has: MDX lessons, JSON quizzes, JSON assessments, checklists, thought records, tracking logs.

---

## Interactive Components (20+)

All in `app/(default)/academy/components/`:

| Component | Purpose |
|-----------|---------|
| `lesson-quiz.tsx` | Multiple choice + reflection quizzes with AI feedback |
| `thought-record.tsx` | CBT thought records |
| `tracking-log.tsx` | Mood/anxiety/sleep/energy tracking |
| `likert-assessment.tsx` | Validated assessments (GAD-7, PHQ-9, etc.) |
| `interactive-breathing.tsx` | Guided breathing exercises |
| `exposure-hierarchy.tsx` | Exposure therapy planning |
| `exposure-log.tsx` | Exposure practice tracking |
| `coping-strategy-ranker.tsx` | Rank coping strategies |
| `mindfulness-timer.tsx` | Meditation timer |
| `flip-card.tsx` | Flashcard learning |
| `scenario-card.tsx` | Case study scenarios |
| `callout.tsx` | Styled callout boxes |
| `insight-grid.tsx` | Grid layout for insights |
| `step-by-step.tsx` | Step-by-step guides |
| `checklist.tsx` | Interactive checklists |
| `slide-navigation.tsx` | Lesson slide navigation |
| `enhanced-accordion.tsx` | Expandable content sections |
| `toolkit-card.tsx` | Wellness toolkit items |

---

## Security

| Measure | Implementation |
|---------|---------------|
| Password hashing | Argon2 (memoryCost: 19456, timeCost: 2) |
| Session management | Lucia (secure cookies, SameSite: lax) |
| Rate limiting | Redis sliding window (auth: 5/15min, AI: 10/min) |
| HSTS | max-age=63072000, includeSubDomains, preload |
| CSP | default-src 'self', restricted connect-src |
| XSS | X-XSS-Protection + DOMPurify for user content |
| Clickjacking | X-Frame-Options: DENY |
| Email validation | Regex with TLD check + lowercase normalization |
| Profile updates | Atomic JSONB merge (no read-modify-write race) |

---

## Key File Paths

| Category | Path |
|----------|------|
| DB schema | `lib/db/schema.ts` |
| DB client | `lib/db/index.ts` |
| Auth | `lib/auth.ts`, `lib/auth-lucia.ts` |
| AI client | `lib/ai/client.ts` |
| AI models | `lib/ai/models.ts` |
| Coaching | `lib/ai/openai-coaching.ts` |
| Rate limiting | `lib/security.ts` |
| Redis | `lib/redis.ts` |
| S3 storage | `lib/storage/s3.ts` |
| API middleware | `lib/api/with-auth.ts` |
| Curriculum data | `lib/data/curriculum.ts` |
| Profile service | `lib/services/profileService.ts` |
| Profile repo | `lib/repositories/postgresProfileRepository.ts` |
| Docker entrypoint | `scripts/docker-entrypoint.js` |
| Migrations | `scripts/db-migrate.ts` |
