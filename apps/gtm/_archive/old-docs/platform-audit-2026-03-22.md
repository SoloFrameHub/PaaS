# SoloFrameHub V3 — Comprehensive Platform Audit

**Date:** 2026-03-22
**Scope:** Lesson content, AI coaching, artifact generation, onboarding, progress tracking, MDX rendering

---

## Executive Summary

Audited 485 lesson files across 49 courses (9 tracks), the complete AI coaching pipeline, artifact generation system, onboarding flow, progress/unlock system, and all 31 interactive MDX components.

**Overall platform health: Strong.** The architecture is well-designed with excellent separation of concerns. Issues found were mostly integration gaps (context not flowing between systems) rather than fundamental design problems.

### Issues Fixed in This Audit

| #   | Issue                                                                                                          | Severity | Files Changed      |
| --- | -------------------------------------------------------------------------------------------------------------- | -------- | ------------------ |
| 1   | 4 ArtifactExercise components missing `persistKey` props                                                       | High     | 4 lesson .md files |
| 2   | 3 dead artifact types had no lesson exercises (positioningStatement, valuePropositionCanvas, personalPlaybook) | High     | 2 lesson .md files |
| 3   | Coaching chat sent no course context to AI                                                                     | High     | coaching-chat.tsx  |
| 4   | AI chat API couldn't resolve numeric courseId from AILessonCoach                                               | High     | chat/route.ts      |
| 5   | RangeSlider had 3 redundant persistence useEffects + missing try-catch                                         | Medium   | range-slider.tsx   |
| 6   | Unused import `getTrackIdForCourse` in chat API                                                                | Low      | chat/route.ts      |

---

## 1. Lesson Content Audit

### Stats

- **485 lessons** across 49 courses in 9 tracks
- **481/485** (99.2%) contain interactive MDX components
- **6,676 total** interactive component instances
- Average lesson length: ~2,100 words

### Component Usage (Top 10)

| Component            | Count | persistKey Required | Compliance |
| -------------------- | ----- | ------------------: | ---------- |
| InsightCard          | 1,690 |                  No | N/A        |
| SlideNavigation      | 988   |                  No | N/A        |
| InteractiveChecklist | 743   |                 Yes | 100%       |
| FlipCard             | 713   |                 Yes | 100%       |
| RangeSlider          | 479   |                 Yes | 100%       |
| ProgressiveReveal    | 346   |                  No | N/A        |
| ClassifyExercise     | 257   |                 Yes | 100%       |
| ScenarioSimulator    | 227   |                 Yes | 100%       |
| PredictionGate       | 116   |                 Yes | 100%       |
| DecisionTree         | 110   |                 Yes | 100%       |

### Fixed: Missing persistKey

4 `ArtifactExercise` components were missing `persistKey`:

- `foundations/list-building/lesson-11.md` → added `persistKey="list-building-L11"`
- `marketing-engine/cold-email-mastery/lesson-12.md` → added `persistKey="cold-email-mastery-L12"`
- `sales-methodology/discovery-framework/lesson-12.md` → added `persistKey="discovery-framework-L12"`
- `sales-methodology/objection-handling/lesson-10.md` → added `persistKey="objection-handling-L10"`

---

## 2. AI Coaching Audit

### Architecture

The AI coaching system has 3 entry points:

1. **AILessonCoach** (in-lesson, 23 instances) → passes courseId + lessonId
2. **Coaching Chat** (/coach page) → was passing NO course context
3. **Mini-Assessment** (every 3 courses) → passes assessment data

### Context Pipeline

```
User Profile → profileContextService.getSafeContext(coaching: true) →
  questionnaire, DISC profile, RAG signals, assessment scores,
  artifacts (truncated), progress, lesson context → System Prompt
```

### Fixed: Coaching Chat Context Gap

**Before:** Coaching chat sent `{ currentTopic: 'General Coaching' }` with no course info. AI had zero awareness of what the user was currently studying.

**After:** Now includes `courseId: String(profile.progress.currentCourse)` so the AI knows the user's current course and can provide relevant advice.

### Fixed: Numeric CourseId Resolution

**Before:** AILessonCoach sent `courseId: parseInt("course-1".replace(/\D/g, ''))` → `1`. The API called `getCourse("1")` which failed because course IDs are slugs like `"icp-builder"`.

**After:** API now falls back to `getCourseByNumber()` for numeric IDs. Both slug and numeric lookups work.

### What's Working Well

- System prompt quality is excellent — references DISC type, assessment scores, artifact presence
- Framework-to-dimension mapping proactively guides coaching (e.g., ICP Clarity < 40 → suggest ICP framework)
- All 23 AILessonCoach instances have explicit courseId and lessonId props
- Chat history persistence for Metabase analytics
- Rate limiting on AI endpoints

### Remaining Opportunities

- AI only sees truncated artifact summaries (300-400 chars). Consider passing fuller content for deep coaching.
- Progress tracking is coarse — AI knows total lessons completed but not per-lesson assessment scores.
- No mechanism to track "last visited lesson" for coaching chat (only tracks `currentCourse`).

---

## 3. Artifact Generation Audit

### Artifact Types (9 defined)

| Artifact               | Course                          | Lesson Exercise | Status               |
| ---------------------- | ------------------------------- | :-------------: | -------------------- |
| icpDocument            | Course 1 (icp-builder)          |    Lesson 13    | Active               |
| positioningStatement   | Course 2 (positioning-value)    |  **Lesson 9**   | **Fixed** (was dead) |
| valuePropositionCanvas | Course 2 (positioning-value)    |  **Lesson 9**   | **Fixed** (was dead) |
| acquisitionPath        | Course 3 (choose-path)          |    Lesson 6     | Active               |
| listBuildingCriteria   | Course 4 (list-building)        |    Lesson 11    | Active               |
| emailSequences         | Course 8 (cold-email-mastery)   |    Lesson 12    | Active               |
| discoveryPlaybook      | Course 14 (discovery-framework) |    Lesson 12    | Active               |
| objectionLibrary       | Course 17 (objection-handling)  |    Lesson 10    | Active               |
| personalPlaybook       | Course 44 (playbook)            |  **Lesson 10**  | **Fixed** (was dead) |

### Fixed: Dead Artifact Types

3 artifact types were defined in `artifact-map.ts` with TypeScript types and dashboard cards, but had NO corresponding `<ArtifactExercise>` in any lesson. Users could never create them.

Added exercises to:

- `positioning-value/lesson-9.md` — positioningStatement (1 exercise) + valuePropositionCanvas (2 exercises: customer + solution sections)
- `playbook/lesson-10.md` — personalPlaybook (2 exercises: rhythm + process sections)

### Artifact Lifecycle

- **Creation:** `<ArtifactExercise>` → form UI → `POST /api/academy/save-artifact` → deep merge → badge check
- **Storage:** PostgreSQL profile JSONB with VersionedArtifact wrapper (version, history, createdAt)
- **AI Context:** Artifacts summarized and injected into coaching prompts
- **Dashboard:** Playbook page shows completion status with links to courses
- **Issue:** `acquisitionPath` doesn't use VersionedArtifact wrapper (no version history)

### No Artifact Detail Viewer

Users can only see artifact completion status on the dashboard. There is no page to view or edit full artifact content after creation. Users must return to the course lesson to modify artifacts.

---

## 4. Onboarding & Progress Audit

### Two Onboarding Paths Exist

- **New path:** `/onboarding/*` (welcome → questionnaire → assessment → business → goal → context → analyzing)
- **Old path:** `/founder-assessment` (still active, academy page redirects to it)

**Recommendation:** Consolidate to one path. The old `/founder-assessment` should redirect to `/onboarding/welcome`.

### Unlock System — Well Designed

6 unlock rules work correctly:

1. Course 0 always unlocked
2. Completed courses accessible for review
3. Sequential within track (N → N+1)
4. Assessment-driven (recommended start course + gap courses)
5. Cross-track unlock (Course 3 + recommended path)
6. Journey map phases

**Edge case:** If `assessment.recommendedPath` is undefined, no cross-track unlock happens. Consider defaulting to `'hybrid'`.

### Quiz Coverage Gap

- Tracks 1-3 + Creator Track: Full quiz coverage
- **Track 4 (AI Acquisition), Track 6 (Customer Success), Track 7 (Operations):** Missing quiz data directories. If lessons in these tracks require quizzes, users may be unable to complete them.

### XP Inconsistency

- Lesson completion without quiz: 10 XP
- Lesson completion with quiz: 25 XP
- Users in quiz-less tracks level up 40% slower

---

## 5. MDX Rendering Audit

### Pipeline — Production-Ready

- `MDXRemote` (server-side) → all 31 components registered
- `gray-matter` parses frontmatter, quiz JSON stripped separately
- Path traversal protection in lesson loader
- CSP headers support MDX runtime (`'unsafe-eval'`)

### All 31 Components Verified

All components have `'use client'` directive, proper hydration handling, and functional API endpoints.

### Fixed: RangeSlider

- Removed 2 redundant `useEffect` hooks (load + save were duplicated)
- Added `try-catch` around localStorage in `useState` initializer
- Consolidated to: one `useState` initializer (with try-catch) + one save `useEffect`

### Component State Persistence — Robust

`usePersistedState` hook implements dual-layer persistence:

1. Immediate: localStorage (synchronous)
2. Background: server sync via `/api/component-state` (debounced 500ms)
3. Server-wins merge strategy
4. Graceful auth failure handling

---

## 6. Additional Fixes (Phase 2)

All P0-P2 items from the initial audit have been addressed:

| #   | Issue                                                                               | Status |
| --- | ----------------------------------------------------------------------------------- | ------ |
| 7   | Consolidated onboarding — `/founder-assessment` → redirect to `/onboarding/welcome` | Fixed  |
| 8   | All 8 pages referencing `/founder-assessment` updated                               | Fixed  |
| 9   | Unlock service defaults to `hybrid` if `recommendedPath` missing                    | Fixed  |
| 10  | Artifact detail viewer at `/dashboard/playbook/[artifactType]`                      | Fixed  |
| 11  | PlaybookCard links to detail viewer for completed artifacts                         | Fixed  |
| 12  | AI coaching artifact context expanded (300 → 800 chars)                             | Fixed  |
| 13  | Last-visited lesson tracking added to profile                                       | Fixed  |
| 14  | Coaching chat sends lastVisitedLesson to AI API                                     | Fixed  |
| 15  | AI chat API falls back to lastVisitedLesson context                                 | Fixed  |
| 16  | XP standardized to 25 XP for all lesson completions                                 | Fixed  |
| 17  | Quiz JSON files extracted for tracks 4, 6, 7                                        | Fixed  |

### Remaining Opportunity

- **Standardize `acquisitionPath`** to use `VersionedArtifact` wrapper (currently plain object)

---

## All Files Modified

### Phase 1 — Content & AI Fixes

| File                                                                     | Change                                             |
| ------------------------------------------------------------------------ | -------------------------------------------------- |
| `server/data/content/sales-methodology/discovery-framework/lesson-12.md` | Added persistKey                                   |
| `server/data/content/sales-methodology/objection-handling/lesson-10.md`  | Added persistKey                                   |
| `server/data/content/foundations/list-building/lesson-11.md`             | Added persistKey                                   |
| `server/data/content/marketing-engine/cold-email-mastery/lesson-12.md`   | Added persistKey                                   |
| `server/data/content/foundations/positioning-value/lesson-9.md`          | Added 3 ArtifactExercise components                |
| `server/data/content/operations-systems/playbook/lesson-10.md`           | Added 2 ArtifactExercise components                |
| `app/api/ai/chat/route.ts`                                               | Numeric courseId, lastVisitedLesson fallback       |
| `components/mdx/range-slider.tsx`                                        | Fix redundant persistence + localStorage try-catch |

### Phase 2 — Platform-Wide Improvements

| File                                                                          | Change                                         |
| ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `app/(onboarding)/founder-assessment/page.tsx`                                | Replaced with redirect                         |
| `app/(default)/academy/page.tsx`                                              | Redirect → `/onboarding/welcome`               |
| `app/(default)/academy/[courseId]/page.tsx`                                   | Redirect → `/onboarding/welcome`               |
| `app/(default)/academy/[courseId]/[lessonId]/page.tsx`                        | Redirect → `/onboarding/welcome`               |
| `app/(default)/academy/tools/icp-builder/page.tsx`                            | Redirect → `/onboarding/welcome`               |
| `app/(default)/coach/page.tsx`                                                | Redirect → `/onboarding/welcome`               |
| `app/(default)/coach/coaching-chat.tsx`                                       | Pass currentCourse + lastVisitedLesson context |
| `app/(default)/roleplay/page.tsx`                                             | Redirect → `/onboarding/welcome`               |
| `app/(default)/dashboard/playbook/page.tsx`                                   | Redirect → `/onboarding/welcome`               |
| `app/(default)/dashboard/badges/page.tsx`                                     | Redirect → `/onboarding/welcome`               |
| `app/(default)/dashboard/playbook/[artifactType]/page.tsx`                    | New: artifact detail viewer                    |
| `app/(default)/dashboard/playbook/[artifactType]/artifact-detail-view.tsx`    | New: content renderer                          |
| `components/dashboard/playbook-card.tsx`                                      | Added View link                                |
| `lib/services/unlockService.ts`                                               | Default recommendedPath to hybrid              |
| `lib/services/profileContextService.ts`                                       | Expanded artifact truncation                   |
| `lib/services/profileCoreService.ts`                                          | Track lastVisitedLesson                        |
| `app/api/academy/complete-lesson/route.ts`                                    | Standardized XP to 25                          |
| `scripts/extract-quizzes.js`                                                  | New: quiz extraction script                    |
| `server/data/quizzes/{ai-acquisition,customer-success,operations-systems}/**` | New: quiz files                                |
