# Business Logic, Services & Utilities

**Depth: [SOLID]** — Core services and utilities documented with function signatures. Needs deepening: full WellnessProfile type (30+ fields), personalization algorithm details, engagement scoring formulas.

---

## Service Layer Overview

```
/lib/services/
├── profileCoreService.ts    — Profile lifecycle (create, read, update, migrate)
├── profileService.ts        — Facade (delegates to core + context + onboarding)
├── profileContextService.ts — AI-safe context assembly (de-identified)
├── onboardingService.ts     — Onboarding data persistence
├── quizService.ts           — Quiz loading, grading, AI reflection
├── voiceService.ts          — TTS + STT (OpenAI)
├── npiService.ts            — NPPES NPI verification

/lib/repositories/
├── profileRepository.ts       — Interface (IProfileRepository)
├── postgresProfileRepository.ts — Postgres/JSONB implementation
├── mockProfileRepository.ts   — In-memory fallback

/lib/utils/
├── wellness-scores.ts    — Dimension scoring (0-100)
├── wellness-alerts.ts    — Clinical + engagement alerts
├── wellness-actions.ts   — Prioritized next-step suggestions
├── onboarding-assessment.ts — Symptom → score computation
├── personalization.ts    — Course recommendations by symptom profile
├── lesson-engagement.ts  — Per-lesson completion tracking
├── object.ts             — Deep object flattening for JSONB updates

/lib/
├── assessments.ts     — Assessment config loading + scoring
├── checklists.ts      — Checklist config loading
├── thought-records.ts — Thought record config loading
├── tracking-logs.ts   — Tracking log config + derived metrics
├── lessons.ts         — Lesson MDX loading + reading time
├── pdf-worksheets.ts  — PDF generation (pdf-lib)
├── flarum.ts          — Flarum forum JSON:API client
├── logger.ts          — Structured logging
├── redis.ts           — Redis client + cache helpers
├── security.ts        — Rate limiting (Redis + memory fallback)
├── auth.ts            — Server session management
├── auth-lucia.ts      — Lucia configuration
```

---

## Profile System

### Repository Pattern (`/lib/repositories/`)

**Interface:** `IProfileRepository`
- `getById(userId)` — retrieve JSONB profile
- `save(userId, data)` — create with onConflictDoNothing (race-condition safe)
- `update(userId, updates)` — complex `jsonb_set` for nested dot-path updates
- `getByEmail(email)` — lookup by email

**Implementations:**
- `PostgresProfileRepository` — production (Drizzle + Postgres)
  - Dot-path updates: `'progress.badges'` → `jsonb_set(data, '{progress,badges}', value)`
  - Handles intermediate nulls in nested paths
- `MockProfileRepository` — in-memory map for dev/testing
- Factory in `profileRepository.ts` selects based on `DATABASE_URL` presence

### Profile Core Service (`/lib/services/profileCoreService.ts`)

- `getOrCreateProfile(userId)` — safe with `onConflictDoNothing` + re-read
- `getProfile(userId)` — fetch with automatic schema migration
- `updateProfile(userId, updates)` — flattens nested updates, invalidates AI context cache
- `updateProgress(userId, progress)` — XP, badges, course/lesson completion tracking
- `migrateProfile(userId, profile)` — ensures all v3 required fields exist (non-blocking persist)

### Profile Facade (`/lib/services/profileService.ts`)

- Delegates to profileCoreService, profileContextService, onboardingService
- `getExpandedProfile()` — returns profile + symptoms + recommendations + wellness score

### Onboarding Service (`/lib/services/onboardingService.ts`)

- `saveSymptomSelection(userId, symptoms)` — primary symptoms + severity + isPrimary flag
- `saveWellnessGoals(userId, data)` — goals array + learning style + time commitment
- `saveAboutYou(userId, data)` — demographics (age range, life stage, support network)
- `saveYourExperience(userId, data)` — coping strategies, therapy history, triggers, worst time
- `saveCrisisScreening(userId, data)` — crisis safety data (suicidal intent, self-harm, concerns)

### AI Context Service (`/lib/services/profileContextService.ts`)

- `getSafeContext(userId)` — de-identified wellness summary for AI prompts
  - Symptom categories (not raw scores)
  - Goals + learning style
  - De-identified demographics (age range, life stage — NOT name)
  - Assessment summary (score, priority, recommended courses)
  - Progress metrics (completed course count, streak, XP)
- Sanitizes user text against prompt injection patterns

---

## Wellness Scoring (`/lib/utils/wellness-scores.ts`)

### Dimensions
5 wellness dimensions, each scored 0-100:

| Dimension | Key | Assessment | Courses |
|-----------|-----|-----------|---------|
| Anxiety Management | anxietyManagement | GAD-7 | 8 courses |
| Mood Stability | moodStability | PHQ-9 | 7 courses |
| Sleep Quality | sleepQuality | PSQI | 2 courses |
| Stress Resilience | stressResilience | Burnout check | 2 courses |
| Nutrition Awareness | nutritionAwareness | Food-mood | 5 courses |

### Scoring Functions

- `normalizeAssessmentScore(rawScore, maxScore)` — maps clinical score to 0-100 wellness
  - **Inverts scale:** low symptoms = high wellness (0 on GAD-7 → 100 wellness)
  - Linear: `(1 - rawScore/maxScore) * 100`

- `computeAssessmentScoreForDimension(dimension, profile)` — latest assessment for dimension

- `computeEngagementScoreForDimension(dimension, profile)` — engagement points from lessons, logs, records
  - Soft-capped: 50 engagement points = 100 score (diminishing returns)

---

## Wellness Alerts (`/lib/utils/wellness-alerts.ts`)

| Alert Type | Trigger | Priority | Response |
|-----------|---------|----------|----------|
| `clinical-flag` | PHQ-9 severe + 7+ days inactive | 0 (never suppressed) | Crisis resources |
| `reassess` | 14+ days since assessment + 3+ lessons completed | 2 | Suggest re-assessment |
| `inactivity` (gentle) | 5-13 days inactive | 3 | Encouraging nudge |
| `inactivity` (warm) | 14+ days inactive | 3 | Warmer re-engagement |
| `stagnation` | Score plateau detected | 4 | Suggest new approach |

---

## Wellness Actions (`/lib/utils/wellness-actions.ts`)

- `buildAssessmentAction(dimension)` — suggests first assessment for dimension
  - Warm, encouraging titles/descriptions
- Symptom-to-dimension mapping: anxiety → anxietyManagement, depression → moodStability, etc.
- Prioritizes primary actions over secondary
- Used on dashboard "Next Steps" section

---

## Onboarding Assessment (`/lib/utils/onboarding-assessment.ts`)

- `computeOverallScoreFromSymptoms(symptoms)` — maps symptom array to 0-100
- `computeDimensionScoreFromSymptoms(dimension, symptoms)` — per-dimension
- `computeAreasForGrowthFromSymptoms(symptoms)` — identify focus areas
- `computePersonalizedInsight(profile)` — tailored welcome message

---

## Personalization (`/lib/utils/personalization.ts`)

- Adapts course recommendations based on symptom profile
- Filters by learning style preference
- Ranks by relevance to primary symptoms

> **Needs deepening:** Full algorithm details, weighting factors, edge cases.

---

## Lesson Engagement (`/lib/utils/lesson-engagement.ts`)

- `getLessonEngagement(courseId, lessonId, profile)` — analyzes interactive element completion
  - Checks: quiz, checklist, assessment, tracking log, thought record, check-in
  - Scans markdown for inline `<Checkin>` components
  - Checks profile progress arrays for completion status

---

## Content Loading

### Lessons (`/lib/lessons.ts`)
- `getLessonContent(trackId, courseId, lessonId)` — loads MDX + gray-matter frontmatter
- Strips embedded quiz JSON blocks
- `calculateReadingTime(content)` — ~200 words/minute

### Assessments (`/lib/assessments.ts`)
- `getAssessmentConfig(id)` — load JSON by assessment ID
- `getAssessmentForLesson(courseId, lessonId)` — lookup via lesson-map.json
- `scoreAssessment(config, responses)` — total score + severity band + crisis item trigger
  - Supports reverse-scored items

### Checklists (`/lib/checklists.ts`)
- `getChecklistConfig(id)`, `getChecklistForLesson(courseId, lessonId)`

### Thought Records (`/lib/thought-records.ts`)
- `getThoughtRecordConfig(id)`, `getThoughtRecordForLesson(courseId, lessonId)`
- `filterAndSortEntries(entries)` — last 10, descending date

### Tracking Logs (`/lib/tracking-logs.ts`)
- `getTrackingLogConfig(id)`, `getTrackingLogForLesson(courseId, lessonId)`
- `computeDerivedMetrics(config, data)` — secondary calculations:
  - `timeInBed`: bedTime → outOfBedTime
  - `totalSleepTime`: TIB - SOL - WASO
  - `sleepEfficiency`: (TST / TIB) x 100%

---

## PDF Generation (`/lib/pdf-worksheets.ts`)

- **Library:** pdf-lib
- `generateWorksheetPdf(config)` — creates fillable PDF
  - US Letter (8.5x11), margins, auto-pagination
  - Field types: text, multiline, number, rating, checkbox
  - Text wrapping for long content
- `downloadPdf(bytes, filename)` — triggers browser download
- Used for: thought records, exposure plans, tracking logs

---

## Forum Client (`/lib/flarum.ts`)

**FlarumClient class (424 lines):**
- Base URL: `FLARUM_URL` / Public URL: `FLARUM_PUBLIC_URL` / API Key: `FLARUM_API_KEY`
- JSON:API normalization (Flarum uses JSON:API spec)

**Methods:**
- `listDiscussions(sort, tagSlug, page, limit, q)` — paginated search
- `getDiscussion(id)` — full thread + posts
- `createDiscussion(data, userToken)` — new discussion
- `createPost(data, userToken)` — reply
- `likePost() / unlikePost()` — vote management
- `getTags()` — all tags (cached 5 min)
- `getOrCreateUserToken(userId)` — generate/retrieve token (master key auth)

**Normalization:** normalizeUser, normalizeTag, normalizePost, normalizeDiscussion
- Avatar URL rewriting: `mhe-forum.soloframehub.com/assets/` prefix

---

## Security (`/lib/security.ts`)

**Rate Limiting:** Redis-backed sliding window with in-memory fallback

`isRateLimited(identifier, config, namespace)`:
- Atomic multi-exec for accurate counting in Redis
- In-memory fallback (Map-based) when Redis unavailable
- Cleanup routine every 60s for stale keys

**Configurations:**
| Config | Limit | Window |
|--------|-------|--------|
| `AI_RATE_LIMIT` | 10 requests | 1 minute |
| `AUTH_RATE_LIMIT` | 5 attempts | 15 minutes |
| `GENERAL_RATE_LIMIT` | 60 requests | 1 minute |

---

## Authentication (`/lib/auth.ts`, `/lib/auth-lucia.ts`)

### Server Session (`/lib/auth.ts`)
- `getServerSession()` — cached, supports Lucia (production) + mock cookie (dev)
- `getCurrentUser()` — wrapper
- `getAuthContext()` — returns `{user, profile}` tuple
- `getUserProfile()` — convenience extractor

### Lucia Config (`/lib/auth-lucia.ts`)
- `getLucia()` — creates Lucia instance (Postgres + Drizzle adapter)
- Session cookie: secure flag derived from `NEXT_PUBLIC_APP_URL` protocol
- `AuthUser` type: `{ id, email, role }`

---

## Utility Functions

### `utils.ts`
- `cn(...)` — Tailwind class merging (clsx + tailwind-merge)
- `formatDate(date)` — US locale formatting
- `absoluteUrl(path)` — builds against NEXT_PUBLIC_APP_URL

### `utils/object.ts`
- `flattenObject(obj)` — deep flattens to dot-notation keys
  - Handles cycles, excludes Arrays and Dates
  - Used for JSONB profile updates

---

## Scripts (`/scripts/`)

| Script | Purpose |
|--------|---------|
| `db-migrate.ts` | Drizzle migration runner |
| `seed-embeddings.ts` | Populate RAG embeddings |
| `reindex-course-content.ts` | Rebuild search index |
| `validate-curriculum.ts` | Check course structure integrity |
| `validate-lessons.mjs` | Verify MDX files |
| `generate-openapi.ts` | OpenAPI 3.0 spec generation |
| `audit-word-counts.js` | Content length metrics |
| `test-cycle-detection.ts` | Prerequisite dependency cycle detection |
| `deep-render-test.mjs` | Pre-render all lessons |
| `verify-rate-limits.ts` | Rate limit config validator |
| `docker-entrypoint.js` | Container startup (migrations + server) |
| `setup-secrets.sh` | Environment setup |
