# Database Schema & API Endpoints

**Depth: [DEEP]** — All 18 tables documented with columns. All 48 API endpoints listed with methods and auth requirements. Validation schemas documented.

---

## Database Overview

- **ORM:** Drizzle (type-safe SQL, schema-first)
- **Schema file:** `/lib/db/schema.ts`
- **Connection:** `/lib/db/index.ts` — lazy-initialized, max 10 connections, 5s timeout
- **Migrations:** Drizzle generate + docker-entrypoint runs on startup
- **Client:** `getDb()` singleton, `hasDatabase()` check

---

## Tables (18)

### Authentication

**user**
| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | Generated ID |
| email | text (unique) | Login identifier |
| hashedPassword | text | Argon2 hash |
| role | text | `'user'` / `'provider'` / `'admin'` |
| createdAt | timestamp | Auto |
| updatedAt | timestamp | Auto |

**session**
| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | Session token |
| userId | text (FK -> user, CASCADE) | Owner |
| expiresAt | timestamp | TTL |

### User Data

**profile**
| Column | Type | Notes |
|--------|------|-------|
| userId | text (PK, FK -> user) | 1:1 with user |
| data | jsonb | Full WellnessProfile object (30+ fields) |
| updatedAt | timestamp | Auto |

**moodEntry**
| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | Generated |
| userId | text (FK) | Owner |
| date | timestamp | Entry date |
| moodRating | integer | 1-10 scale |
| anxietyLevel | integer | 1-10 scale |
| sleepQuality | integer | 1-10 scale |
| energyLevel | integer | 1-10 scale |
| notes | text | Free-form |
| copingTechniquesUsed | jsonb | Array of strings |
| triggers | jsonb | Array of strings |
| createdAt | timestamp | Auto |

### Clinical

**distressEvent** (HIPAA: NO text stored)
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | Auto-increment |
| userId | text (FK, nullable) | Patient (nullable for anonymous) |
| level | text | `'mild'` / `'crisis'` |
| confidence | real | 0-1 classifier confidence |
| context | text | Source: `'journal'` / `'assessment'` / `'forum'` / `'checkin'` |
| courseId | text | Where detected (nullable) |
| lessonId | text | Where detected (nullable) |
| providerAlerted | boolean | Whether provider notified |
| resolvedAt | timestamp | When resolved (soft delete pattern) |
| createdAt | timestamp | Auto |

**coachSession**
| Column | Type | Notes |
|--------|------|-------|
| id | text (PK) | Generated |
| userId | text (FK) | Owner |
| transcript | jsonb | Array of `{role, content}` |
| topic | text | e.g., 'anxiety', 'breathing-exercise', 'crisis-support' |
| crisisDetected | integer | Boolean as int |
| createdAt | timestamp | Auto |

**lessonFeedback**
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | Auto-increment |
| userId | text (FK) | Reviewer |
| courseId | text | Course |
| lessonId | text | Lesson |
| rating | integer | 1-5 scale |
| category | text | `'content'` / `'technical'` / `'suggestion'` / `'other'` |
| message | text | Free-form feedback |
| createdAt | timestamp | Auto |

### Provider Portal

**providerProfile**
| Column | Type | Notes |
|--------|------|-------|
| userId | text (PK, FK -> user) | 1:1 with user |
| displayName | text | Public name |
| credentials | text | e.g., "MD", "LCSW" |
| specialty | text | Clinical specialty |
| licenseNumber | text | State license |
| npiNumber | text | National Provider Identifier |
| verificationStatus | text | `'pending'` / `'verified'` / `'manual_review'` / `'rejected'` |
| npiData | jsonb | NPPES API response data |
| verifiedBy | text | Admin who verified |
| verifiedAt | timestamp | When verified |
| createdAt | timestamp | Auto |

**providerPatient**
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | Auto-increment |
| providerId | text (FK -> user) | Provider |
| patientId | text (FK -> user) | Patient |
| displayName | text | Provider-assigned alias (NOT real name, HIPAA) |
| notes | text | Private clinical notes |
| status | text | `'active'` / `'discharged'` |
| createdAt | timestamp | Auto |

**patientAssignment**
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | Auto-increment |
| providerId | text (FK) | Assigner |
| patientId | text (FK) | Assignee |
| courseId | text | Assigned course |
| lessonId | text (nullable) | Specific lesson (optional) |
| dueDate | timestamp (nullable) | Optional deadline |
| completedAt | timestamp (nullable) | When finished |
| createdAt | timestamp | Auto |

**providerInvite**
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | Auto-increment |
| code | text (unique) | Alphanumeric invite code |
| providerId | text (FK) | Issuer |
| usedBy | text (FK, nullable) | Patient who used it |
| usedAt | timestamp (nullable) | When used |
| expiresAt | timestamp | Expiration |
| createdAt | timestamp | Auto |

### AI/ML Systems

**contentEmbedding**
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | Auto-increment |
| sourceType | text | `'course'` / `'assessment'` / `'clinical'` |
| sourceId | text | Reference to source |
| chunkIndex | integer | Position in chunked doc |
| title | text | Human-readable title |
| body | text | Full text content |
| embedding | jsonb | Float array (1536 dimensions) |
| metadata | jsonb | Additional context |
| createdAt | timestamp | Auto |

**aiClassificationEvent** (unified audit log)
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | Auto-increment |
| classifier | text | `'distress'` / `'forum-topic'` / `'content-quality'` / `'content-atomization'` |
| sourceType | text | Where text came from |
| sourceId | text | Reference |
| primaryLabel | text | Classification result |
| confidence | real | 0-1 |
| result | jsonb | Full classifier output |
| processingMs | integer | Inference time |
| createdAt | timestamp | Auto |

**forumTopicClassification** (denormalized for quick access)
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | Auto-increment |
| discussionId | text | Flarum discussion ID |
| topic | text | Classified topic |
| confidence | real | 0-1 |
| routing | text | `'needs-provider'` / `'community-handles'` / `'informational'` |
| needsProvider | boolean | Quick flag |
| createdAt | timestamp | Auto |

**contentQualityScore**
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | |
| courseId | text | |
| lessonId | text | |
| sectionIndex | integer | |
| quality | text | `'clinically-appropriate'` / `'needs-revision'` / `'potentially-harmful'` / `'overly-clinical'` / `'missing-validation'` |
| confidence | real | |
| publishReady | boolean | |
| createdAt | timestamp | |

**contentAtomizationTag**
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | |
| courseId, lessonId, sectionIndex | text/int | Location |
| sectionText | text | Content snippet |
| tag | text | `'standalone-blog-excerpt'` / `'email-teaser'` / `'social-snippet'` / `'needs-full-context'` / `'not-extractable'` |
| confidence | real | |
| extractable | boolean | |
| createdAt | timestamp | |

### Community

**forumBookmark**
| Column | Type | Notes |
|--------|------|-------|
| userId | text (composite PK) | |
| discussionId | text (composite PK) | |
| createdAt | timestamp | |

**moderationLog** (HIPAA: text limited to snippet)
| Column | Type | Notes |
|--------|------|-------|
| id | serial (PK) | |
| userId | text | |
| contentType | text | `'discussion'` / `'post'` |
| contentSnippet | text | Truncated preview |
| riskLevel | integer | 0-3 |
| categories | jsonb | Flagged categories array |
| action | text | Action taken |
| reasoning | text | AI reasoning |
| createdAt | timestamp | |

### Key Design Patterns
- **HIPAA:** Text content excluded from `distressEvent` and `moderationLog` — only metadata stored
- **JSONB:** Profiles, transcripts, embeddings, NPI data, classifications stored as flexible JSON
- **Soft deletes:** `resolvedAt` for alert lifecycle (not hard deletes)
- **Composite keys:** `forumBookmark` uses (userId, discussionId)
- **Row-level access:** Providers see only their own patients
- **Race-condition safety:** `onConflictDoNothing` + re-read for profile creation

---

## API Endpoints (48)

### Authentication (4)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/signin` | Public | Login |
| POST | `/api/auth/signup` | Public | Register |
| POST | `/api/auth/signout` | User | Logout |
| GET | `/api/auth/session` | User | Current session |

### Health & Diagnostics (3)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/health` | Public | Service health (DB, Redis, classifier) |
| GET | `/api/health/ai` | Public | AI service status |
| POST | `/api/diagnostic` | User | Debug diagnostics |

### Onboarding (8)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/onboarding/basic-info` | User | Name, display name |
| POST | `/api/onboarding/symptoms` | User | Primary symptoms + severity |
| POST | `/api/onboarding/your-experience` | User | Duration, coping, therapy history |
| POST | `/api/onboarding/questionnaire` | User | GAD-7 + PHQ-9 screening |
| POST | `/api/onboarding/crisis-screening` | User | Suicide/self-harm assessment |
| POST | `/api/onboarding/assessment` | User | Learning style preferences |
| POST | `/api/onboarding/in-your-words` | User | Free-text reflection |
| POST | `/api/onboarding/goals` | User | Wellness goals |
| POST | `/api/onboarding/complete` | User | Finalize profile + recommendations |

### Academy (8)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/academy/complete-lesson` | User | Mark lesson complete |
| POST | `/api/academy/quiz/[sectionId]/[courseId]/[lessonId]` | User | Submit quiz (AI reflection) |
| POST | `/api/academy/assessment/[courseId]/[lessonId]` | User | Submit clinical assessment |
| POST | `/api/academy/thought-record/[courseId]/[lessonId]` | User | Submit thought record |
| POST | `/api/academy/checklist/[courseId]/[lessonId]` | User | Submit checklist |
| POST | `/api/academy/tracking-log/[courseId]/[lessonId]` | User | Submit tracking log |
| GET | `/api/academy/component-state/[courseId]/[lessonId]` | User | Fetch lesson component state |
| POST | `/api/academy/feedback` | User | Submit lesson feedback |

### AI (3)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/ai/chat` | User | Wellness coach (streaming) |
| POST | `/api/ai/voice/tts` | User | Text-to-speech |
| POST | `/api/ai/voice/stt` | User | Speech-to-text |

### Safety (1)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/safety/classify` | User | Distress classification via Maia |

### Forum (7)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/forum/discussions` | User | List discussions (filtered) |
| GET | `/api/forum/discussions/[id]` | User | Discussion detail + posts |
| POST | `/api/forum/discussions` | User | Create discussion |
| POST | `/api/forum/posts` | User | Post reply |
| POST | `/api/forum/posts/[id]/like` | User | Like/unlike post |
| GET | `/api/forum/tags` | User | List categories/tags |
| POST | `/api/forum/bookmarks` | User | Bookmark discussion |

### Provider Portal (9)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/provider/patients` | Provider | Patient list |
| GET | `/api/provider/patients/[patientId]` | Provider | Patient detail (mood, courses, assignments) |
| POST | `/api/provider/patients/[patientId]` | Provider | Update patient notes |
| POST | `/api/provider/patients/[patientId]/assign` | Provider | Assign course/lesson |
| POST | `/api/provider/invite` | Provider | Generate invite code |
| GET | `/api/provider/alerts` | Provider | Distress alerts |
| POST | `/api/provider/alerts/[alertId]/resolve` | Provider | Resolve alert |
| POST | `/api/provider/profile` | Provider | Update provider profile |
| POST | `/api/provider/rag` | Provider | RAG search |
| GET | `/api/provider/session-prep/[patientId]` | Provider | AI session prep brief |

### Admin (2)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/admin/providers` | Admin | List provider applications |
| POST | `/api/admin/providers/[userId]` | Admin | Approve/reject provider |

### Profile (2)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/profile` | User | Get wellness profile |
| POST | `/api/profile` | User | Update wellness profile |

### Utility (2)
| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/docs` | Public | OpenAPI spec |
| GET | `/api/hello` | Public | Test endpoint |

---

## API Middleware

### Auth Middleware (`/lib/api/with-auth.ts`)
- `withAuth(handler)` — validates Lucia session, returns 401 if missing
- `withAdminAuth(handler)` — enforces role === 'admin' (403)
- `withProviderAuth(handler)` — allows 'provider' or 'admin' (403)

### Moderation Middleware (`/lib/api/with-moderation.ts`)
- `withModeration(options)` — pre-screens content before handler
- Options: `contentType` ('discussion'/'post'), `extractText` function
- Returns 422 if riskLevel >= 2 (with crisis resources if needed)
- Async logging to `moderationLog` table (fire-and-forget)

### Error Handling (`/lib/api/errors.ts`)
- `AppError` base class (message, statusCode, code)
- `UnauthorizedError` (401), `ForbiddenError` (403), `NotFoundError` (404), `ValidationError` (400)

### Response Utilities (`/lib/api/response-utils.ts`)
- `successResponse(data)` — wraps in `{ data }` with 200
- `validateBody(request, schema)` — JSON parse + Zod validation
- `errorResponse(error)` — handles AppError/ZodError/generic, logs server-side, generic to client

### API Client (`/lib/api/client.ts`)
- Frontend `ApiClient` class: get/post/put/patch/delete
- 15s timeout with AbortController

---

## Validation Schemas (`/lib/validations/`) [SOLID]

### auth.ts
- `signinSchema`: email + password (min 12 chars)
- `signupSchema`: email + password + name (optional)

### academy.ts
- `completeLessonSchema`: courseId, lessonId, xpEarned (default 10), isLastLesson
- `quizSubmissionSchema`: Record<string, string>
- `lessonFeedbackSchema`: 1-5 rating + 12 categories + message

### forum.ts
- `createDiscussionSchema`: title (5-200), content (10-10k), tagIds (1-5)
- `createPostSchema`: discussionId, content (1-10k)

### onboarding.ts
- 11 symptom categories: anxiety, depression, sleep, panic, social-anxiety, trauma, stress, ocd, anger, grief, other
- 19 wellness goals with legacy aliases
- Schemas for each onboarding step (basicInfo, symptoms, crisisScreening, goals, etc.)

### ai.ts
- Chat message: 1-4000 chars
- History: up to 20 messages (role + content)
- Context: optional courseId, lessonId, sectionId, pageContext
