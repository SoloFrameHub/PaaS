# Roadmap to 9.5 Quality: Personalization & Course Interactivity

> **Priority: TOP — until complete, this is the primary workstream.**

---

## Current State Summary

### Onboarding Questionnaire (8 Steps — Well Built)

| Step | Data Collected |
|------|---------------|
| 1. Welcome | Display name |
| 2. Symptoms | 11 categories with severity (mild/moderate/severe) + primary flag |
| 3. Safety | Crisis screening (4 questions) -> risk level calculation |
| 4. Goals | Wellness goals, learning style, time commitment |
| 5. About You | Age, life stage, living situation, support network, group preference |
| 6. Experience | Coping strategies, unhealthy patterns, therapy history, triggers, worst time of day |
| 7. Reflect | 5 free-text prompts (good day, challenge, hoped support, patterns, anything else) |
| 8. Your Plan | Auto-generated: top 5 recommended courses, wellness scores, insights |

### Personalization: Where It Works

- **AI Coach** — Full profile context feeds into every conversation
- **Assessment/Recommendations** — Symptom severity x primary multiplier generates top-5 courses
- **Dashboard** — Shows setup prompts, wellness score banner, current course

### Personalization: Major Gaps (data collected but unused)

| Gap | Impact | Data Available |
|-----|--------|---------------|
| Academy course listing shows all courses in flat order | Users can't find recommended courses | `assessment.recommendedCourses`, `assessment.priorityFocus` |
| Sidebar "Your Learning Path" is a static label | No personalized pathway exists | All symptom/goal data |
| Course detail pages show no relevance indicators | Users don't know why a course matters to them | Symptom-course mapping |
| No "recommended next" after completing a lesson/course | Dead-end after completion | Progress + symptoms |
| Learning style preference is ignored | Collected but never adapts content delivery | `questionnaire.learningStyle` |
| Time commitment is ignored | Doesn't adjust lesson pacing | `questionnaire.timeCommitment` |
| Flyout chat doesn't pass profile context | Misses personalization opportunity | Profile data available |

---

## Course Content: Interactive Richness Tiers

### Gold Standard (9.5) — Anxiety Management

Uses 9+ interactive component types: Checkin (3x), Callout, InsightGrid, BodyMap, SlideNavigation, ScenarioCard, InteractiveScenario, EnhancedAccordion (4x), FlipCard, StepByStep.

### MODERATE (6-7) — 8 Courses

- `low-self-esteem` — Deep text, embedded reflections, no interactive components
- `food-mood-connection` — Has Checkins, expert voice, needs interactive visuals
- `gut-brain-foundations` — Research briefs + Checkins, needs pathway visualizer
- `sleep-mastery` — Checkins + strong neuroscience, needs sleep cycle interactive
- `emotional-dysregulation` — Strong DBT framework, needs emotion scale interactive
- `managing-perfectionism` — Balanced with reflections, needs perfectionism scale
- `anxiety-toolkit-foundations` — FlipCards + Checkins, on the right track
- `anxiety-toolkit-skills` — Has InteractiveBreathingExercise, needs more

### BARE (3-5) — 11 Courses with Zero Interactive Components

- `panic-disorder`, `social-anxiety`, `ocd-toolkit`
- `depression-action`, `anger-management`, `grief-loss`
- `bipolar-disorder`
- `sleep-insomnia`
- `stress-burnout`, `trauma-recovery`
- Remaining nutrition courses (`gut-brain-foundations`, `dietary-patterns`, `precision-nutrition`, `food-mood-mastery`)

---

## Evaluation Tools Coverage Gaps

| Track | Quizzes | Assessments | Tracking Logs | Thought Records | Checklists |
|-------|---------|-------------|---------------|-----------------|------------|
| Anxiety (7 courses) | 4/7 complete | 4/7 | 4/7 | 4/7 | 5/7 |
| Mood (7 courses) | 5/7 | 7/7 | 7/7 | 7/7 | 7/7 |
| Nutrition (5 courses) | 1/5 | 5/5 | 5/5 | **0/5** | 5/5 |
| Sleep (2 courses) | 2/2 | 1/2 | 2/2 | **0/2** | 2/2 |
| Stress (2 courses) | **0/2** | 2/2 | 2/2 | 2/2 | 2/2 |

---

## Execution Plan

### Tier 1: Personalization Infrastructure (High Leverage)

- [ ] **1.1** Academy page: "Recommended for You" section at top, surface `assessment.recommendedCourses` with visual badges
- [ ] **1.2** Sidebar: Dynamic learning path — reorder/highlight courses based on recommendations + progress
- [ ] **1.3** Course detail pages: Relevance indicators ("Recommended because you selected Anxiety (severe)")
- [ ] **1.4** Post-lesson/course: Smart "Next" suggestions based on symptoms + progress
- [ ] **1.5** Flyout chat: Wire `buildWellnessContextString()` into flyout chat component

### Tier 2: Bring 11 Bare Courses to Rich (Biggest Content Lift)

Each bare course needs per lesson (minimum):
- 2-3 Checkins (opening + mid + closing)
- 1 BodyMap or equivalent personalized input tool
- 1 InteractiveScenario or FlipCard set
- 1 EnhancedAccordion for layered depth
- 1 InsightGrid or SlideNavigation for visual variety
- 1 Callout (reflection/tip)

Priority order:

- [ ] **2.1** `depression-action` — Most common condition, completely bare
- [ ] **2.2** `panic-disorder` — High urgency, needs BodyMap for panic symptoms
- [ ] **2.3** `trauma-recovery` — Sensitive population, needs careful interactive pacing
- [ ] **2.4** `social-anxiety` — Common comorbidity, needs scenario-based learning
- [ ] **2.5** `sleep-insomnia` — Highly actionable, needs sleep diary interactive
- [ ] **2.6** `stress-burnout` — Universal relevance, needs burnout assessment interactive
- [ ] **2.7** `ocd-toolkit` — Complex condition, needs OCD cycle visualization
- [ ] **2.8** `anger-management` — Needs arousal thermometer interactive
- [ ] **2.9** `grief-loss` — Needs grief wave visualization
- [ ] **2.10** `bipolar-disorder` — Needs mood spectrum interactive
- [ ] **2.11** Remaining nutrition courses — Need food-mood interactive tools

### Tier 3: Fill Evaluation Tool Gaps

- [ ] **3.1** Add quizzes to 10 courses: panic-disorder, social-anxiety, ocd-toolkit, anger-management, grief-loss, gut-brain-foundations, dietary-patterns, precision-nutrition, food-mood-mastery, stress-burnout, trauma-recovery
- [ ] **3.2** Add thought records to 7+ courses: anxiety-toolkit-*, all 5 nutrition, sleep-insomnia, sleep-mastery
- [ ] **3.3** Add tracking logs to 3 anxiety-toolkit courses
- [ ] **3.4** Add missing assessments to anxiety-toolkit-foundations, anxiety-toolkit-skills

### Tier 4: Extend Rich Content Beyond Lesson 1

- [ ] **4.1** Apply interactive component enrichment across all 200+ lessons (components exist, embed in MDX)

### Tier 5: Advanced Personalization

- [ ] **5.1** Adaptive content — different scenarios/examples based on age range, life stage, triggers
- [ ] **5.2** Learning style adaptation — more visual for "interactive" learners, more text for "self-paced"
- [ ] **5.3** Time-aware suggestions — suggest bite-size segments for "5-10 min" users
- [ ] **5.4** Trigger-aware content warnings — flag lessons touching user's known triggers
- [ ] **5.5** Progress-based AI coaching — coach references specific lessons/exercises completed
