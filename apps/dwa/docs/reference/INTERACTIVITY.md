# Course Interactivity — Implementation Tracker

Tracks which interactive components have been built and how they map to courses.

## Component Status

| # | Component | Status | Files |
|---|-----------|--------|-------|
| 1 | **LikertAssessment** | DONE | `types/assessment.ts`, `lib/assessments.ts`, `app/api/academy/assessment/[courseId]/[lessonId]/route.ts`, `app/(default)/academy/components/likert-assessment.tsx` |
| 2 | GuidedExercise | Not started | — |
| 3 | **TrackingLog** | DONE | `types/tracking-log.ts`, `lib/tracking-logs.ts`, `app/api/academy/tracking-log/[courseId]/[lessonId]/route.ts`, `app/(default)/academy/components/tracking-log.tsx` |
| 4 | **ThoughtRecord** | DONE | `types/thought-record.ts`, `lib/thought-records.ts`, `app/api/academy/thought-record/[courseId]/[lessonId]/route.ts`, `app/(default)/academy/components/thought-record.tsx` |
| 5 | **Checklist** | DONE | `types/checklist.ts`, `lib/checklists.ts`, `app/api/academy/checklist/[courseId]/[lessonId]/route.ts`, `app/(default)/academy/components/checklist.tsx` |
| 6 | FearHierarchy | Not started | — |
| 7 | WeeklyReview (composite) | Not started | — |
| 8 | BehavioralExperiment (composite) | Not started | — |
| 9 | SafetyPlan (composite) | Not started | — |
| 10 | ProgressDashboard (composite) | Not started | — |

## Fillable PDF Downloads

All completed components support downloadable fillable PDFs via `lib/pdf-worksheets.ts` (uses `pdf-lib`).

| Component | Download Options |
|-----------|-----------------|
| LikertAssessment | "Download Results as PDF" (pre-filled with scores + responses) |
| TrackingLog | "Download Blank Log" (empty fillable form) + "Download Entries as PDF" (recent entries summary) |
| ThoughtRecord | "Download Blank Worksheet" (empty fillable form) + "Download as PDF" (pre-filled after submission) |
| Checklist | "Download Blank Checklist" (empty fillable form) + "Download My Progress" (pre-filled with current state) |

PDFs are generated client-side using `pdf-lib` (~90KB). AcroForm fields (text inputs, checkboxes) are fillable in Adobe Reader, Chrome, Preview, etc.

## Assessment Configs

| Config | File | Items | Scale | Used By |
|--------|------|-------|-------|---------|
| GAD-7 | `server/data/assessments/gad7.json` | 7 | 0-3 | anxiety-management lesson 1 |
| PHQ-2 | `server/data/assessments/phq2.json` | 2 | 0-3 | depression-action lesson 1 |
| PHQ-9 | `server/data/assessments/phq9.json` | 9 | 0-3 (crisis item q9) | depression-action lesson 2 |

Lesson mappings: `server/data/assessments/lesson-map.json`

## Tracking Log Configs

| Config | File | Fields | Frequency | Used By |
|--------|------|--------|-----------|---------|
| Sleep Diary | `server/data/tracking-logs/sleep-diary.json` | 9 (times, numbers, rating, text) | daily | sleep-insomnia lesson 2 |
| Activity-Mood Log | `server/data/tracking-logs/activity-mood-log.json` | 6 (text, ratings, select) | per-event | depression-action lesson 3 |
| Anxiety Tracker | `server/data/tracking-logs/anxiety-tracker.json` | 2 (ratings 1-10) | daily | anxiety-management lesson 8 |

Lesson mappings: `server/data/tracking-logs/lesson-map.json`

Derived metrics (computed server-side): Sleep Diary computes Time in Bed, Total Sleep Time, and Sleep Efficiency (%) with color-coded thresholds.

## Thought Record Configs

| Config | File | Fields | Used By |
|--------|------|--------|---------|
| Anxiety Thought Record | `server/data/thought-records/anxiety-thought-record.json` | 8 (situation, thought, emotions 0-100, thinking trap select, evidence for/against, balanced thought, re-rate 0-100) | anxiety-management lesson 3 |
| Depression Thought Record | `server/data/thought-records/depression-thought-record.json` | 10 (situation, thought, belief% 0-100, emotions text, evidence for/against, distortion select, balanced thought, new belief% 0-100, outcome emotions) | depression-action lesson 5 |

Lesson mappings: `server/data/thought-records/lesson-map.json`

Both configs include a cognitive distortions reference list (collapsible in the UI).

## Checklist Configs

| Config | File | Items | Type | Used By |
|--------|------|-------|------|---------|
| Sleep Hygiene | `server/data/checklists/sleep-hygiene.json` | 15 (10 Daily Habits + 5 Environment) | checkbox | sleep-insomnia lesson 3 |
| Bedroom Audit | `server/data/checklists/bedroom-audit.json` | 16 (4 Temperature + 4 Darkness + 4 Sound + 4 Comfort) | checkbox | sleep-insomnia lesson 5 |
| Lifestyle Audit | `server/data/checklists/lifestyle-audit.json` | 16 (8 rating + 8 text, across 4 categories) | rating + text | depression-action lesson 7 |
| Anxiety First Aid | `server/data/checklists/anxiety-first-aid.json` | 5 fill-in-the-blank fields | text | anxiety-management lesson 8 |

Lesson mappings: `server/data/checklists/lesson-map.json`

Checklists are **persistent** (not repeated entries like TrackingLog/ThoughtRecord). Progress is saved on each change and loaded on re-visit. Auto-saves with 1s debounce. 10 XP awarded on first completion (all checkbox items checked).

## Course Coverage Matrix

Shows which interactive element types each course needs (from research docs) and current build status.

### Course 1: anxiety-management (8 lessons)

| Element | Research Doc Specifies | Status |
|---------|----------------------|--------|
| GAD-7 Self-Assessment | Yes (lesson 1) | DONE |
| Thought Record (8-step) | Yes (lesson 3) | DONE |
| Exposure Hierarchy + SUDS | Yes | Needs FearHierarchy component |
| Box Breathing / PMR guide | Yes | Needs GuidedExercise component |
| 5-4-3-2-1 Grounding | Yes | Needs GuidedExercise component |
| Worry Dump journaling | Yes | Needs JournalPrompt component |
| Daily Mood/Anxiety Tracker | Yes (lesson 8) | DONE — `anxiety-tracker` config |
| Anxiety First Aid Card | Yes (lesson 8) | DONE — `anxiety-first-aid` checklist |

### Course 2: depression-action (8 lessons)

| Element | Research Doc Specifies | Status |
|---------|----------------------|--------|
| PHQ-2 Screener | Yes (lesson 1) | DONE |
| PHQ-9 Full Assessment | Yes (lesson 2) | DONE |
| Activity-Mood Log | Yes (lesson 3) | DONE — `activity-mood-log` config |
| Weekly Activity Planner | Yes | Needs TrackingLog variant |
| Thought Record Worksheet | Yes (lesson 5) | DONE |
| Lifestyle Audit Checklist | Yes (lesson 7) | DONE — `lifestyle-audit` checklist |
| Course Progress Tracker | Yes | Needs ProgressDashboard composite |

### Course 3: sleep-insomnia (8 lessons)

| Element | Research Doc Specifies | Status |
|---------|----------------------|--------|
| 2-Week Sleep Diary | Yes (lesson 2) | DONE — `sleep-diary` config with derived metrics |
| Sleep Efficiency Calculator | Yes (lesson 2) | DONE — derived metric in `sleep-diary` config |
| Sleep Hygiene Checklist | Yes (lesson 3) | DONE — `sleep-hygiene` checklist (15 items, 2 categories) |
| Bedroom Audit Tool | Yes (lesson 5) | DONE — `bedroom-audit` checklist (16 items, 4 categories) |
| Sleep Restriction Tracking | Yes | Needs TrackingLog variant |
| PMR / Diaphragmatic Breathing | Yes | Needs GuidedExercise component |
| 5-4-3-2-1 Grounding | Yes | Needs GuidedExercise component |

**Note:** The sleep course does not use a standard Likert screening assessment. Its primary tracking tool is the Sleep Diary (a multi-field daily log). It also has no thought record — CBT for insomnia uses different cognitive techniques.

## Architecture Notes

**Shared patterns (all Tier 1 components):**
- JSON config files in `server/data/<type>/` with a `lesson-map.json` for routing
- Server-side config loader in `lib/<type>.ts` (uses `fs.readFileSync`)
- API route in `app/api/academy/<type>/[courseId]/[lessonId]/route.ts` (GET + POST/PUT, using `withAuth`)
- Client component in `app/(default)/academy/components/<type>.tsx`
- Components auto-load via API if a mapping exists; render nothing otherwise
- All rendered between article content and quiz in `app/(default)/academy/[courseId]/[lessonId]/page.tsx`

**Component-specific:**
- LikertAssessment: Blue/primary styling, assessment history on `WellnessProfile.assessment.assessmentHistory[]`, crisis items trigger 988 banner, 25 XP per completion
- TrackingLog: Teal styling, 6 field types (text/number/time/rating/boolean/select), derived metrics computed server-side with threshold bands, entries on `WellnessProfile.progress.trackingLogs[]`, 10 XP per entry
- ThoughtRecord: Violet/purple styling, textarea/text/rating/select fields, cognitive distortions reference, entries on `WellnessProfile.progress.thoughtRecords[]`, 15 XP per entry
- Checklist: Emerald/green styling, persistent (not repeated entries), 3 item types (checkbox/text/rating), category grouping, auto-save with 1s debounce, progress on `WellnessProfile.progress.checklists[]`, 10 XP on first completion

**PDF Downloads:**
- Shared utility: `lib/pdf-worksheets.ts` (client-side, `'use client'` directive)
- Uses `pdf-lib` for real AcroForm fillable fields
- `generateWorksheetPdf(config)` → `Uint8Array`, `downloadPdf(bytes, filename)` → triggers browser download
- US Letter format, Helvetica fonts, 50px margins
