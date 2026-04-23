# Content & Curriculum

**Depth: [DEEP]** — Every track, course, and content type inventoried. Lesson structure, quiz schema, assessment schema documented. Interactive component library cataloged.

---

## Content Architecture

```
/server/data/
├── content/{trackId}/{courseId}/lesson-{n}.md     (337+ MDX files)
├── quizzes/{trackId}/{courseId}/lesson-{n}.json   (421 quiz files)
├── assessments/{assessmentId}.json                (22 instruments)
├── checklists/{checklistId}.json                  (31 templates)
├── thought-records/{recordId}.json                (16 templates)
├── tracking-logs/{logId}.json                     (21 templates)
└── lesson-map.json (in each subdirectory)         (maps lessons to resources)

/lib/data/
├── curriculum.ts                                  (916 lines, 5 tracks)
├── optimization-curriculum.ts                     (914 lines, 5 pillars)
├── landing-curriculum.ts                          (marketing preview)
├── onboarding-data.ts                            (template responses)
├── personas.ts                                    (user personas)
└── terminology.ts                                 (glossary)

/public/presentations/                             (24 PDF slide decks)
```

---

## Therapeutic School (5 Tracks, 24 Courses)

### Track 1: Anxiety & Fear Management
**Track ID:** `anxiety-and-fear` | **Courses:** 8 | **Lessons:** ~64

| # | Course | ID | Lessons | Framework | Evidence |
|---|--------|----|---------|-----------|----------|
| 1 | Understanding & Managing Anxiety | anxiety-management | 8 | CBT | NICE 2024 |
| 2 | Managing Panic Attacks & Panic Disorder | panic-disorder | 8 | CBT | Gold-standard |
| 3 | Social Anxiety: Building Confidence | social-anxiety | 8 | CBT | NICE 2024 |
| 4 | OCD Toolkit | ocd-toolkit | 8 | ERP | First-line |
| 5 | Anxiety Toolkit - Foundations | anxiety-toolkit-foundations | 8 | CBT | Core skills |
| 6 | Anxiety Toolkit - Crisis Skills & Exposure | anxiety-toolkit-skills | 8 | CBT/Exposure | NICE 2024 |
| 7 | Anxiety Toolkit - Social Skills & Resilience | anxiety-toolkit-resilience | 8 | CBT/DBT | NICE 2024 |
| 8 | Anxiety Toolkit (Combined) | anxiety-toolkit | 12 | CBT | Combined |

### Track 2: Mood & Emotional Health
**Track ID:** `mood-emotional-health` | **Courses:** 7 | **Lessons:** ~56

| # | Course | ID | Lessons | Framework | Evidence |
|---|--------|----|---------|-----------|----------|
| 1 | Depression: From Understanding to Action | depression-action | 8 | CBT/BA | NICE 2024 |
| 2 | Bipolar Disorder: Mood Stability | bipolar-disorder | 8 | IPSRT | CANMAT 2023 |
| 3 | Emotional Dysregulation & DBT Skills | emotional-dysregulation | 8 | DBT | Evidence-based |
| 4 | Managing Anger & Irritability | anger-management | 8 | CBT | Research-backed |
| 5 | Grief & Loss: Navigating Bereavement | grief-loss | 8 | CFT | Research-backed |
| 6 | Low Self-Esteem & Self-Worth | low-self-esteem | 8 | CBT/CFT | Research-backed |
| 7 | Managing Perfectionism | managing-perfectionism | 8 | CBT | Research-backed |

### Track 3: Nutrition & Brain Health
**Track ID:** `nutrition-brain-health` | **Courses:** 5 | **Lessons:** ~57

| # | Course | ID | Lessons | Framework | Evidence |
|---|--------|----|---------|-----------|----------|
| 1 | The Food-Mood Connection | food-mood-connection | 9 | Nutritional Psych | CANMAT 2024 |
| 2 | Gut-Brain Foundations | gut-brain-foundations | 12 | Nutritional Psych | RCT-Supported |
| 3 | Dietary Patterns for Mental Health | dietary-patterns | 12 | Nutritional Psych | Mediterranean |
| 4 | Precision Nutrition Protocols | precision-nutrition | 12 | Nutritional Psych | ISNPR 2024 |
| 5 | Food-Mood Mastery | food-mood-mastery | 12 | Nutritional Psych | Advanced |

### Track 4: Sleep & Recovery
**Track ID:** `sleep-recovery` | **Courses:** 2 | **Lessons:** ~20

| # | Course | ID | Lessons | Framework | Evidence |
|---|--------|----|---------|-----------|----------|
| 1 | Sleep Problems & Insomnia Solutions | sleep-insomnia | 8 | CBT-I | First-line |
| 2 | Sleep Mastery | sleep-mastery | 12 | CBT-I | Gold-standard |

### Track 5: Stress & Resilience
**Track ID:** `stress-resilience` | **Courses:** 2 | **Lessons:** ~16

| # | Course | ID | Lessons | Framework | Evidence |
|---|--------|----|---------|-----------|----------|
| 1 | Chronic Stress & Burnout Management | stress-burnout | 8 | CBT/Mindfulness | Research-backed |
| 2 | Trauma Recovery: Understanding PTSD | trauma-recovery | 8 | Trauma-focused CBT | NICE 2018 |

---

## Optimization School (5 Pillars)

Defined in `/lib/data/optimization-curriculum.ts`

### Pillar 1: Physical Vitality & Movement (2 courses, ~40 lessons)
| Course | ID | Lessons |
|--------|----|---------|
| Movement for Mental Performance | movement-for-mental-performance | 20 |
| Workplace Mental Health | workplace-mental-health | 20 |

### Pillar 2: Social Connection & Community (3 courses, ~60 lessons)
| Course | ID | Lessons |
|--------|----|---------|
| Social Circle Mastery | social-circle-mastery | 20 |
| Team Sports & Collective Activity | team-sports-collective-activity | 20 |
| Relationship Dynamics | relationship-dynamics | 20 |

### Pillar 3: Mental Clarity & Cognitive Performance (1 course, 20 lessons)
| Course | ID | Lessons |
|--------|----|---------|
| Digital Wellness | digital-wellness | 20 |

### Pillar 4: Emotional Resilience & Stress Management (3+ courses)
| Course | ID | Lessons |
|--------|----|---------|
| CBT Fundamentals | cbt-fundamentals | 20 |
| Growth Mindset | growth-mindset | 12+ |
| Healthy Boundaries | healthy-boundaries | 20 |
| Stress Challenge Navigation | stress-challenge-navigation | 19 |

---

## Lesson File Format

**Location:** `/server/data/content/{trackId}/{courseId}/lesson-{n}.md`

**Frontmatter:**
```yaml
---
title: "Lesson Title"
duration: "20 min"  # or "55 min" for complex lessons
track: "Track Name"
course: "Course Name"
lesson: 3  # lesson number
objectives: ["objective 1", "objective 2"]  # optional
keyPoints: ["point 1", "point 2"]  # optional
---
```

**Content:** Markdown with embedded MDX components (breathing exercises, diagrams, callouts, slides, etc.)

**Processing:** `/lib/lessons.ts`
- `getLessonContent(trackId, courseId, lessonId)` — loads markdown + gray-matter frontmatter
- Strips embedded quiz JSON blocks (quizzes loaded separately)
- `calculateReadingTime(content)` — ~200 words/minute

---

## Quiz Schema

**Location:** `/server/data/quizzes/{trackId}/{courseId}/lesson-{n}.json`
**Total:** 421 files

```json
{
  "id": "course-id-lesson-number",
  "lessonId": "1",
  "courseId": "anxiety-management",
  "sectionId": "anxiety-and-fear",
  "title": "Quiz Title",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Question text",
      "options": [
        {"id": "opt1", "text": "Option text"},
        {"id": "opt2", "text": "Option text"}
      ],
      "correctAnswer": "opt2",
      "explanation": "Evidence-based explanation"
    }
  ]
}
```

**Quiz Service (`/lib/services/quizService.ts`):**
- `loadQuiz(trackId, courseId, lessonId)` — strips correct answers for client delivery
- `loadFullQuiz(...)` — includes answers (server-side only)
- `hasQuiz(...)` — boolean check
- `evaluateAnswers(quiz, answers)` — grades submission
  - Multiple-choice: exact match
  - Reflection: min length + optional AI feedback
  - Returns: score, passed, per-question results, AI feedback

---

## Assessment Schema

**Location:** `/server/data/assessments/`
**Total:** 22 instruments

### Complete Inventory

**Core Screening (6):**
| File | Instrument | Items | Scale |
|------|-----------|-------|-------|
| gad7.json | GAD-7 Anxiety | 7 | 0-21 |
| phq9.json | PHQ-9 Depression | 9 | 0-27 |
| phq2.json | PHQ-2 Depression Screening | 2 | 0-6 |
| spin.json | Social Phobia Inventory | — | — |
| pdss-sr.json | Panic Disorder Severity Scale | — | — |
| psqi-sleep-quality.json | Pittsburgh Sleep Quality Index | — | — |

**Condition-Specific (16):**
| File | Instrument |
|------|-----------|
| anger-self-check.json | Anger Self-Assessment |
| bipolar-mood-check.json | Bipolar Mood Tracking |
| burnout-self-check.json | Burnout Self-Assessment |
| emotional-dysregulation-check.json | Emotional Dysregulation |
| grief-experience-check.json | Grief Experience |
| insomnia-severity-check.json | Insomnia Severity Index |
| low-self-esteem-check.json / self-esteem-check.json | Self-Esteem |
| ocd-self-check.json | OCD Self-Assessment |
| perfectionism-self-check.json | Perfectionism |
| trauma-response-check.json | Trauma Response |
| dietary-pattern-check.json | Dietary Pattern |
| food-mood-awareness.json | Food-Mood Awareness |
| food-mood-mastery-check.json | Food-Mood Mastery |
| gut-brain-awareness.json | Gut-Brain Axis |
| nutrient-awareness-check.json | Nutrient Awareness |

**Schema:**
```json
{
  "id": "gad7",
  "title": "GAD-7 Anxiety Self-Assessment",
  "description": "Brief validated measure...",
  "instructions": "Over the past 2 weeks...",
  "timeframe": "past 2 weeks",
  "questions": [{"id": "q1", "text": "Feeling nervous, anxious..."}],
  "scale": {
    "min": 0, "max": 3,
    "labels": {"0": "Not at all", "1": "Several days", "2": "More than half", "3": "Nearly every day"}
  },
  "scoring": {
    "maxScore": 21,
    "bands": [
      {"min": 0, "max": 4, "severity": "minimal", "label": "Minimal Anxiety", "color": "green"},
      {"min": 5, "max": 9, "severity": "mild", "label": "Mild Anxiety", "color": "yellow"},
      {"min": 10, "max": 14, "severity": "moderate", "label": "Moderate Anxiety", "color": "orange"},
      {"min": 15, "max": 21, "severity": "severe", "label": "Severe Anxiety", "color": "red"}
    ]
  },
  "crisisItemIds": ["phq9-9"],
  "disclaimer": "Educational self-check tool, not clinical diagnosis..."
}
```

**Assessment Service (`/lib/assessments.ts`):**
- `getAssessmentConfig(id)` — load by ID
- `getAssessmentForLesson(courseId, lessonId)` — lookup via lesson-map.json
- `scoreAssessment(config, responses)` — total score, severity band, crisis item trigger (supports reverse-scored items)

---

## Checklists (31)

**Location:** `/server/data/checklists/`

Actionable takeaway worksheets: anxiety-first-aid, bedroom-audit, dbt-skills-practice-plan, distress-tolerance-toolkit, grief-self-care, gut-health-habits, lifestyle-audit, ocd-lifestyle-support, perfectionism-maintenance, relapse-prevention, resilience-routine, safety-behaviors, self-care-stabilization, self-compassion, sleep-hygiene, sleep-toolkit, social-confidence-builder, social-rhythm, supplement-safety, and more.

**Service (`/lib/checklists.ts`):** `getChecklistConfig()`, `getChecklistForLesson()`

---

## Thought Records (16)

**Location:** `/server/data/thought-records/`

CBT cognitive restructuring worksheets: anxiety, panic, social-anxiety, OCD (intrusive-thought), depression, anger, bipolar, perfectionism, self-esteem, sleep, nutrition, trigger-response, boundary-setting, continuing-bonds-reflection, emotion-analysis.

**Service (`/lib/thought-records.ts`):** `getThoughtRecordConfig()`, `getThoughtRecordForLesson()`, `filterAndSortEntries()` (last 10, descending)

---

## Tracking Logs (21)

**Location:** `/server/data/tracking-logs/`

Daily/weekly self-monitoring: anxiety-tracker, panic-attack-log, stress-trigger-log, mood-stability-log, anger-episode-log, emotion-skills-log, activity-mood-log, sleep-diary, sleep-reflection-log, dietary-pattern-log, food-mood-log, mindful-eating-log, nutrient-supplement-log, gut-brain-tracker, behavioral-experiment-log, ocd-cycle-log, perfectionism-pattern-log, self-criticism-log, grief-wave-log, window-of-tolerance-tracker.

**Service (`/lib/tracking-logs.ts`):**
- `getTrackingLogConfig(id)`, `getTrackingLogForLesson()`
- `computeDerivedMetrics(config, data)` — e.g., sleep efficiency = TST/TIB x 100

---

## Interactive Lesson Components (36)

**Location:** `/app/(default)/academy/components/`

### Breathing & Mindfulness
| Component | File | Purpose |
|-----------|------|---------|
| InteractiveBreathingExercise | interactive-breathing.tsx | Box breathing (4-4-4-4) with animated circle |
| GuidedGrounding | guided-grounding.tsx | 5 senses grounding exercise |
| MindfulnessTimer | mindfulness-timer.tsx | Customizable meditation timer |

### Clinical Exercises
| Component | File | Purpose |
|-----------|------|---------|
| ThoughtRecord | thought-record.tsx | CBT cognitive restructuring (~300 lines, PDF export) |
| ExposureHierarchyBuilder | exposure-hierarchy.tsx | Anxiety ladder builder (~250 lines) |
| ExposureLog | exposure-log.tsx | Track exposure practice |
| ExposurePlanWorksheet | exposure-plan-worksheet.tsx | Structured exposure planning |
| BodyMap | body-map.tsx | Interactive symptom mapping on human figure |

### Assessment & Tracking
| Component | File | Purpose |
|-----------|------|---------|
| LessonQuiz | lesson-quiz.tsx | Quiz renderer with scoring |
| LikertAssessment | likert-assessment.tsx | Renders GAD-7, PHQ-9, etc. |
| TrackingLog | tracking-log.tsx | Sleep/mood/symptom with time inputs |
| TrackingTrendChart | tracking-trend-chart.tsx | Recharts visualization |
| Checklist | checklist.tsx | Interactive task list with persistence |
| Checkin | (inline MDX) | Quick check-in component |
| AssessmentHistoryChart | assessment-history-chart.tsx | Time-series of scores |

### Ranking & Decision
| Component | File | Purpose |
|-----------|------|---------|
| CopingStrategyRanker | coping-strategy-ranker.tsx | Drag-and-drop ranking |
| CopingStrategyRankerDynamic | coping-strategy-ranker-dynamic.tsx | AI-powered suggestions |

### Scenarios & Learning
| Component | File | Purpose |
|-----------|------|---------|
| ScenarioCard | scenario-card.tsx | Interactive scenario cards |
| InteractiveScenario + Choice | interactive-scenario.tsx | Multi-step branching scenarios |
| FlipCard | flip-card.tsx | Reveal-on-click flashcards |
| LessonDiagrams | lesson-diagrams.tsx | CBT model, anxiety cycle, thought flow |

### Layout & Structure
| Component | File | Purpose |
|-----------|------|---------|
| EnhancedAccordion + AccordionItem | enhanced-accordion.tsx | Multi-section accordion |
| StepByStep + Step | step-by-step.tsx | Numbered walkthrough |
| ToolkitCard | toolkit-card.tsx | Coping tool cards |
| InsightGrid + InsightItem | insight-grid.tsx | Grid of tips/insights |
| Callout | callout.tsx | Highlighted warnings/notes/tips |
| SlideNavigation + Slide | slide-navigation.tsx | Slide carousel |

### Presentation
| Component | File | Purpose |
|-----------|------|---------|
| GammaPresentation | gamma-presentation.tsx | Slide-based viewer |

### Progress & Feedback
| Component | File | Purpose |
|-----------|------|---------|
| EngagementSummary | engagement-summary.tsx | Summary stats |
| LessonFeedback | lesson-feedback.tsx | Rating + category + message |
| CompleteButton | complete-button.tsx | Lesson completion trigger |

### Utilities
| Component | File | Purpose |
|-----------|------|---------|
| useConfetti | use-confetti.tsx | Celebration animations (canvas-confetti) |
| useComponentState | use-component-state.ts | Client state persistence hook |

---

## Curriculum TypeScript Definitions

### `curriculum.ts` (916 lines)
Exports:
- `CURRICULUM: Track[]` — 5 tracks with full course/lesson metadata
- `getAllCourses()`, `getCourse(id)`, `getCourseByNumber(num)`, `getLesson(courseId, lessonId)`
- `getTrackIdForCourse(courseId)`, `getCourseTier(courseId)` -> 'Essentials'|'Techniques'|'Mastery'
- `DIMENSION_COURSE_MAP` — maps wellness dimensions to course arrays
- `DIMENSION_ASSESSMENT_MAP` — maps dimensions to assessment configs
- `getCourseDimension(courseId)` — which wellness dimension a course serves

### `optimization-curriculum.ts` (914 lines)
- `OPTIMIZATION_CURRICULUM` — separate structure for Five Pillars
- Same export pattern as therapeutic curriculum

### Wellness Dimension Mapping
| Dimension | Courses | Assessment |
|-----------|---------|------------|
| anxietyManagement | 8 courses | GAD-7 |
| moodStability | 7 courses | PHQ-9 |
| sleepQuality | 2 courses | PSQI |
| stressResilience | 2 courses | Burnout check |
| nutritionAwareness | 5 courses | Food-mood awareness |

---

## Evidence Grading System

All courses include evidence badges:
- **Gold-Standard** — First-line recommended treatment (e.g., CBT-I for insomnia, ERP for OCD)
- **NICE 2024** — UK National Institute for Health and Care Excellence guidelines
- **CANMAT 2023/2024** — Canadian Network for Mood and Anxiety Treatments
- **ISNPR 2024** — International Society for Nutritional Psychiatry Research
- **RCT-Supported** — Randomized controlled trial evidence
- **Research-Backed** — Multiple studies supporting approach

All assessments include educational disclaimers emphasizing they are not clinical diagnoses.
