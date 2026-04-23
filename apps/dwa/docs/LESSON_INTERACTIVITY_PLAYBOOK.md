# Lesson Interactivity Playbook
**Purpose:** Extract interactivity patterns from therapeutic lessons for consistent application to optimization school courses.

**Date:** 2026-04-14  
**Analyzed Lessons:** Anxiety Management L1, Sleep Insomnia L1, Depression Action L1, Stress Burnout L1  
**Component Directory:** `app/(default)/academy/components/`

---

## 1. Component Inventory

**Total components documented:** 12 (10 MDX-embeddable + 2 auto-rendered)

### **MDX-Embeddable Components** (used within lesson markdown)
These components are written directly in lesson `.md` files and rendered via `<MDXRemote>`.



### **BodyMap** — Interactive body awareness mapping
- **Purpose:** Users identify where they physically experience symptoms (anxiety, depression, etc.)
- **User Input:** Click/tap on body diagram regions (head, chest, stomach, neck, hands, back, legs)
- **Output/Effect:** Selected regions highlight; descriptive text explains the physiological response
- **Data Persistence:** Database (via `useComponentState` → `bodyMaps` record) + localStorage fallback
- **Props:** `title`, `prompt`, `persistKey` (optional)
- **Example lesson:** Anxiety Management L1 (line 45), Depression Action L1 (line 109)
- **Optimization school analog:** "Movement Body Map" — where you feel energy, tension, or strength during exercise

**File:** [body-map.tsx](../app/(default)/academy/components/body-map.tsx)  
**Key features:**
- SVG-based interactive body silhouette (200×420 viewport, transformed from 20833-space path)
- 7 clickable regions with primary/secondary dots (hands have bilateral dots)
- Real-time save on selection (optimistic update + 1s debounced server save)
- "X of 7 areas explored" progress indicator
- AnimatePresence for smooth region description reveal

---

### **InteractiveScenario** — Branching scenario exploration
- **Purpose:** Present real-world scenarios with multiple response options; users explore each path and receive feedback
- **User Input:** Click to expand choice cards (A, B, C, D format)
- **Output/Effect:** Reveals feedback for each choice; categorizes responses (Common, Avoidant, Healthy, Mixed)
- **Data Persistence:** Database (`scenarios` record) + localStorage fallback (tracks which choices explored)
- **Props:** `title`, `description` (or `scenario`), children are `<Choice>` components
- **Example lesson:** Anxiety Management L1 (lines 113-118) — "A Stressful Morning" with 4 response paths
- **Optimization school analog:** "Performance Scenario" — e.g., "You're 20 minutes into a run and feeling fatigued. What do you do?"

**File:** [interactive-scenario.tsx](../app/(default)/academy/components/interactive-scenario.tsx)  
**Key features:**
- Parses `<Choice label="..." feedback="..." type="..." />` children from MDX
- Tracks "X of Y explored" progress
- Type badges: common (gray), avoidant (amber), healthy (teal), mixed (indigo)
- Insight message appears after exploring at least one choice
- Rose/purple gradient styling (distinct from other interactive components)

---

### **EnhancedAccordion** — Collapsible content sections
- **Purpose:** Organize content into expandable/collapsible sections; reduce cognitive load
- **User Input:** Click to expand/collapse accordion items
- **Output/Effect:** Reveals hidden content; marks items as "Read" after first open
- **Data Persistence:** Database (`accordions.opened` array) + localStorage fallback
- **Props:** `title` (for single accordion), `items` (array mode), `children` (for nested `<AccordionItem>`)
- **Example lesson:** Anxiety Management L1 (lines 77-107) — "The Four F's: Fight, Flight, Freeze, Fawn"
- **Optimization school analog:** Same usage — e.g., "Five Pillars of Physical Vitality" with expandable explanations

**File:** [enhanced-accordion.tsx](../app/(default)/academy/components/enhanced-accordion.tsx)  
**Key features:**
- Three rendering modes: single, array, or container for `<AccordionItem>` children
- Checkmark badge shows "Read" status when collapsed after first open
- Smooth AnimatePresence height transitions
- Prose styling for content (supports markdown)

---

### **FlipCard** — Myth/fact or question/answer cards
- **Purpose:** Present front-facing statement; user flips to reveal back content (often myth-busting or deeper explanation)
- **User Input:** Click/tap card to flip
- **Output/Effect:** 3D flip animation (perspective transform); reveals back content
- **Data Persistence:** Database (`flipCards.reviewed` array) + localStorage fallback
- **Props:** `front`, `back`, `frontIcon` (optional emoji/icon), `persistKey` (optional)
- **Example lesson:** Sleep Insomnia L1 (lines 69-77) — "Myth: You need exactly 8 hours of sleep" → truth
- **Optimization school analog:** "Performance Myth vs. Fact" — e.g., "Myth: You should stretch before running" → evidence

**File:** [flip-card.tsx](../app/(default)/academy/components/flip-card.tsx)  
**Key features:**
- CSS 3D perspective (1000px) + rotateY animation
- Front: indigo/purple gradient; Back: emerald/teal gradient
- "Reviewed" badge shows when flipped back to front after first review
- Keyboard accessible (Enter/Space to flip)

---

### **SlideNavigation** — Multi-slide carousel with progress tracking
- **Purpose:** Present sequential content (e.g., concept building, explanations) with Previous/Next navigation
- **User Input:** Previous/Next buttons, dot navigation, or arrow keys
- **Output/Effect:** Animated slide transitions (left/right swipe effect)
- **Data Persistence:** Database (`slides[persistKey]` with `current` index + `visited` array)
- **Props:** `persistKey` (optional), `showDots` (default true), children are `<Slide>` components
- **Example lesson:** Anxiety Management L1 (lines 51-67) — "Gas Pedal vs. Brake Pedal" (3 slides)
- **Optimization school analog:** "Progressive Overload Explained" — multi-slide concept breakdown

**File:** [slide-navigation.tsx](../app/(default)/academy/components/slide-navigation.tsx)  
**Key features:**
- Extracts `<Slide title="...">content</Slide>` children from MDX
- Tracks current slide + visited slides (dots show visited vs. unvisited)
- Keyboard navigation (ArrowLeft/ArrowRight)
- "X of Y" progress counter
- Motion variants for enter/exit animations (80px slide distance)

---

### **Checkin** — Reflection prompts (scale, text, or choice)
- **Purpose:** Prompt user reflection or self-assessment; collect subjective data
- **User Input:** 
  - **Scale:** 1-10 slider with low/high labels
  - **Reflect:** Freeform textarea (word count shown)
  - **Choice:** Pipe-separated options (button toggles)
- **Output/Effect:** Saves response; shows contextual feedback based on value
- **Data Persistence:** Database (`checkins` record) + localStorage fallback (2s debounce for text)
- **Props:** `type` (scale/reflect/choice), `question`, `low`, `high`, `options` (pipe-separated)
- **Example lesson:** Anxiety Management L1 (line 165), Sleep Insomnia L1 (line 174), Depression Action L1 (line 182)
- **Optimization school analog:** "How confident do you feel about this pillar right now?" (scale 1-10)

**File:** [checkin.tsx](../app/(default)/academy/components/checkin.tsx)  
**Key features:**
- Tap-to-expand interaction (question visible, input hidden until clicked)
- Scale: live slider with large numeric display
- Reflect: auto-growing textarea with word count
- Choice: pill-style button group
- Contextual feedback on save (different messages for low/mid/high scale values)
- Fires `exercise-completed` custom event for tracking

---

### **Callout** — Highlighted informational boxes
- **Purpose:** Emphasize key information, warnings, tips, examples, or reflections
- **User Input:** None (static content)
- **Output/Effect:** Styled box with icon and colored theme
- **Data Persistence:** None
- **Props:** `type` (info/warning/tip/example/reflection), `title` (optional), `children`
- **Example lesson:** Used in all lessons (info: line 122, tip: line 69, reflection: line 12, warning: line 123)
- **Optimization school analog:** Same usage — highlight safety warnings, performance tips, etc.

**File:** [callout.tsx](../app/(default)/academy/components/callout.tsx)  
**Key features:**
- 5 color themes with matching icons, borders, backgrounds
- Supports markdown in children (paragraphs, lists, strong emphasis)
- Left-aligned icon + title + content layout

**Type configurations:**
| Type | Color | Use Case |
|------|-------|----------|
| `info` | Blue | General explanations, statistics, context |
| `warning` | Amber | Safety information, important caveats |
| `tip` | Teal | Helpful suggestions, pro tips |
| `example` | Indigo | Concrete examples, case studies |
| `reflection` | Rose | Empathy, normalization, encouragement |

---

### **InsightGrid** + **InsightItem** — 2-column grid of key concepts
- **Purpose:** Display 2-4 key concepts/facts in a scannable grid layout
- **User Input:** None (static content; hover effect only)
- **Output/Effect:** Hover lifts card slightly with shadow
- **Data Persistence:** None
- **Props:** `icon` (emoji), `title`, `children` (content)
- **Example lesson:** Anxiety Management L1 (lines 22-35) — "Heart Races", "Breathing Quickens", etc.
- **Optimization school analog:** "Benefits of Movement" — 4 cards with icons (brain, heart, muscle, sleep)

**File:** [insight-grid.tsx](../app/(default)/academy/components/insight-grid.tsx)  
**Key features:**
- Responsive grid (1 col mobile, 2 cols sm+)
- Each item: emoji icon + bold title + description
- Hover: lift (-translate-y-0.5) + shadow-md transition

---

### **StepByStep** + **Step** — Numbered sequential steps
- **Purpose:** Present ordered processes or key takeaways with visual numbering
- **User Input:** None (static content)
- **Output/Effect:** Auto-numbered steps with connecting vertical line
- **Data Persistence:** None
- **Props:** `title` (optional), `children` (Step components) OR `steps` array (title/content objects)
- **Example lesson:** Anxiety Management L1 (lines 147-162) — "What You Learned" (5 takeaways)
- **Optimization school analog:** "How to Build an Exercise Habit" — sequential action steps

**File:** [step-by-step.tsx](../app/(default)/academy/components/step-by-step.tsx)  
**Key features:**
- CSS counter for auto-numbering (no hardcoded numbers)
- Gradient circle (teal-to-emerald) for number badge
- Vertical connecting line (hides after last step)
- Supports both `<Step>` children and `steps={[...]}` array prop

---

### **ScenarioCard** — Single highlighted scenario/example
- **Purpose:** Present a single narrative scenario or analogy
- **User Input:** None (static content)
- **Output/Effect:** Visual distinction from body text
- **Data Persistence:** None
- **Props:** `title`, `children`
- **Example lesson:** Anxiety Management L1 (lines 37-39, 140-143)
- **Optimization school analog:** "The Compound Interest of Movement" — analogy card

**File:** [scenario-card.tsx](../app/(default)/academy/components/scenario-card.tsx)  
**Key features:**
- Purple gradient background
- Icon + title header
- Simple prose styling for content

---

### **Static Visual Components** (embedded in MDX, no user interaction)
These are SVG-based visual aids used to illustrate concepts. They don't save state or track user interaction.

---

### **Lesson Diagrams** — Static SVG visualizations

**File:** [lesson-diagrams.tsx](../app/(default)/academy/components/lesson-diagrams.tsx)

Three diagram types available:

1. **BoxBreathingDiagram** — Animated 4-4-4-4 breathing square
   - Visual guide for box breathing technique
   - Animated circle traces the square path (16s loop)
   - Teal/cyan gradient styling
   - Used in: Anxiety Management L4 (breathing exercises)
   - **Optimization analog:** "Movement Timing Diagram" for exercise intervals

2. **CBTTriangleDiagram** — Thoughts-Feelings-Behaviors triangle
   - Three vertices with bidirectional arrows showing mutual influence
   - Indigo (thoughts) / Rose (feelings) / Emerald (behaviors) color coding
   - Used in: Anxiety Management L3 (cognitive restructuring)
   - **Optimization analog:** "Performance Triangle" (Mindset-Energy-Action)

3. **ThoughtFlowDiagram** — Visual representation of thought processes
   - (Additional diagram component in same file)
   - Used for illustrating cognitive patterns
   - **Optimization analog:** Could show "Goal → Obstacle → Strategy → Action" flow

**Key features:**
- All diagrams are static SVG (no user input)
- Some include CSS animations (breathing indicator, pulse effects)
- Responsive sizing (max-w-sm to max-w-md containers)
- Accessible (role="img" with aria-label descriptions)
- Gradient backgrounds matching platform color scheme

**Usage in MDX:**
```markdown
<CBTTriangleDiagram />
<BoxBreathingDiagram />
<ThoughtFlowDiagram />
```

---

### **Auto-Rendered Components** (rendered by page.tsx after MDX content)
These components are NOT written in lesson markdown. They automatically appear at the end of every lesson.

---

### **LessonQuiz** — End-of-lesson knowledge assessment
- **Purpose:** Test comprehension via multiple-choice or reflection questions; pass/fail grading
- **User Input:** Radio buttons (multiple choice) or textarea (reflection, min character count)
- **Output/Effect:** Immediate grading with correct/incorrect feedback; shows explanations; optional AI coaching feedback
- **Data Persistence:** Quiz responses + results saved to database via `/api/academy/quiz` endpoint
- **Props:** `sectionId` (trackId), `courseId`, `lessonId` — quiz data loaded from API
- **Example lesson:** Rendered AFTER all MDX content on every lesson page (not in MDX itself)
- **Optimization school analog:** Same usage — test understanding of movement principles, pillar concepts, etc.

**File:** [lesson-quiz.tsx](../app/(default)/academy/components/lesson-quiz.tsx)  
**Key features:**
- Loads quiz from `/api/academy/quiz/:sectionId/:courseId/:lessonId` (separate from lesson content)
- Two question types:
  - **Multiple-choice:** Radio button selection with correct answer validation
  - **Reflection:** Freeform text with minimum character count (50+ chars typical)
- **Results view:**
  - Score percentage with pass/fail threshold
  - Per-question feedback: green (correct) / red (incorrect)
  - Shows correct answer for wrong multiple-choice questions
  - Optional explanation text per question
  - Optional AI coaching feedback (personalized encouragement/guidance)
- **Retry mechanism:** "Try Again" button if failed (resets answers, keeps quiz)
- **Event emission:** Fires `exercise-completed` custom event when passed (for engagement tracking)
- **Amber/orange gradient styling** (distinct from other interactive components)
- **Empty state:** Silently returns `null` if no quiz available for lesson

**Quiz creation:** Quizzes are created separately (not in MDX). Typical structure:
```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is the minimum effective dose of movement for cognitive benefits?",
      "options": [
        { "id": "a", "text": "60 minutes daily" },
        { "id": "b", "text": "10-20 minutes daily" },
        { "id": "c", "text": "90 minutes 3x/week" }
      ],
      "correctAnswer": "b",
      "explanation": "Research shows 10-20 minutes of moderate movement is enough to trigger BDNF release and improve focus."
    },
    {
      "id": "q2",
      "type": "reflection",
      "question": "Describe one way you could incorporate 10 minutes of movement into your daily routine.",
      "minLength": 50
    }
  ]
}
```

---

### **LessonFeedback** — User feedback collection
- **Purpose:** Collect qualitative feedback on lesson quality; categorized by sentiment (helpful vs needs improvement)
- **User Input:** 
  1. Sentiment button (👍 It was helpful / ✏️ Needs improvement)
  2. Category selection (pill buttons: "Clear & helpful", "Hard to follow", etc.)
  3. Freeform textarea (2000 char max) with contextual placeholder
- **Output/Effect:** Submits feedback to database; shows success confirmation
- **Data Persistence:** Saved to database via `/api/academy/feedback` endpoint (rating, category, message)
- **Props:** `courseId`, `lessonId`, `lessonTitle`
- **Example lesson:** Rendered AFTER quiz on every lesson page (collapses until user clicks "Share feedback")
- **Optimization school analog:** Same usage — collect feedback to iterate on optimization course content

**File:** [lesson-feedback.tsx](../app/(default)/academy/components/lesson-feedback.tsx)  
**Key features:**
- **3-step progressive disclosure:**
  1. Collapsed button: "Share feedback on this lesson"
  2. Sentiment selection: Positive (green, 👍) or Negative (amber, ✏️)
  3. Category selection: Different categories per sentiment
  4. Freeform message: Contextual placeholder based on category
- **Positive categories:** Clear & helpful, Great examples, Good exercises, Well structured, Something else
- **Negative categories:** Hard to follow, Wrong difficulty, Needs better examples, Something is broken, Missing info, Too long, I have a suggestion
- **Contextual placeholders:** Each category has a targeted placeholder question (e.g., "confusing" → "Which part was confusing, and what would make it clearer?")
- **Success state:** Green confirmation box with "Thanks for your feedback!" + close button
- **Rating conversion:** Positive sentiment = rating 5, Negative sentiment = rating 2 (saved to DB)
- **Character counter:** Shows "X/2000" as user types
- **Reset mechanism:** Close button collapses form and resets all state

**Why feedback matters for optimization school:**
- Captures which analogies/examples resonate (e.g., "compound interest of movement")
- Identifies confusing neuroscience explanations
- Reveals missing practical application examples
- Informs rapid iteration (analytics moat strategy)

---

## 2. Lesson Structure Template

Based on analysis of 4 lesson-1 files across therapeutic tracks:

### **Typical Therapeutic Lesson Flow:**

```markdown
---
title: "Lesson Title (What + Why format)"
duration: "45 min"
track: "Wellness Education"
course: "Course Title"
lesson: 1
---

1. **Hook Paragraph** (2-3 sentences)
   - Relatable question or scenario
   - Creates immediate connection

2. **Opening Callout** (type="reflection")
   - Normalizes experience ("You Are Not Broken")
   - Sets compassionate tone
   - Preview of lesson value

3. **Core Concept 1: Foundation** (## heading)
   - Explanation of the problem/mechanism
   - InsightGrid with 3-4 key facts
   - ScenarioCard for analogy

4. **Interactive Component 1** (early engagement)
   - BodyMap OR InteractiveScenario
   - Appears by ~20% into lesson
   - Personalizes content to user's experience

5. **Core Concept 2: Deeper Dive** (## heading)
   - Expands on mechanism/patterns
   - SlideNavigation for sequential concept building
   - OR EnhancedAccordion for categorization

6. **Core Concept 3: Practical Application** (## heading)
   - FlipCard(s) for myth-busting
   - OR InteractiveScenario for skill practice

7. **Core Concept 4: Assessment/Recognition** (## heading)
   - Tables or lists for comparison (normal vs. clinical)
   - Callout (type="warning") for safety info if needed

8. **Key Takeaways** (## heading)
   - StepByStep with 3-5 numbered takeaways
   - OR bullet list summary

9. **Reflection Checkin** (end of lesson)
   - Checkin component (type="reflect" most common)
   - Open-ended question about lesson impact

10. **Summary Checklist** (## heading, optional)
    - Markdown checkbox list (- [ ] format)
    - Self-assessment of understanding
    - MDX renders as InteractiveCheckbox components

11. **Crisis Resources** (footer, conditional)
    - Callout (type="warning") with hotline info
    - Only in mental health lessons (not needed for optimization)

---

### **Post-MDX Components** (rendered by page.tsx, not in lesson MDX)

These components appear AFTER the lesson content automatically:

12. **LessonQuiz** (automatic if quiz exists)
    - 3-5 questions (multiple-choice + reflection)
    - Pass/fail grading with explanations
    - "Try Again" on failure
    - See [page.tsx](../app/(default)/academy/[courseId]/[lessonId]/page.tsx) line 270

13. **LessonFeedback** (automatic on all lessons)
    - Collapsible feedback form
    - Sentiment → Category → Message flow
    - See [page.tsx](../app/(default)/academy/[courseId]/[lessonId]/page.tsx) line 273

14. **EngagementSummary** (conditional, if exercises exist)
    - "X of Y exercises completed" progress bar
    - Appears if lesson has trackable components

15. **CompleteButton** (automatic on all lessons)
    - "Mark as Complete" button
    - Links to next lesson or next course suggestion
```

### **Estimated Structure Metrics:**
- **Total word count:** 1,800-2,500 words
- **Reading time:** ~10-15 min of pure reading
- **Interactive time:** ~5-10 min of engagement
- **Total duration:** 45 min (includes reflection, re-reading, practice)
- **Markdown headings:** 6-10 H2 sections
- **Interactive components:** 4-7 per lesson

---

## 3. Interactivity Density Analysis

### **Component Frequency (from 4 analyzed lessons):**

| Component | Anxiety L1 | Sleep L1 | Depression L1 | Stress L1 | **Avg per Lesson** |
|-----------|------------|----------|---------------|-----------|-------------------|
| Callout | 3 | 1 | 2 | 1 | **1.75** |
| InsightGrid | 1 | 1 | 1 | 1 | **1.00** (near-universal) |
| BodyMap | 1 | 0 | 1 | 0 | **0.50** |
| InteractiveScenario | 1 | 0 | 0 | 0 | **0.25** |
| EnhancedAccordion | 4 items | 0 | 5 items | 4 items | **3.25 items** |
| FlipCard | 2 | 5 | 2 | 4 | **3.25** |
| SlideNavigation | 1 (3 slides) | 0 | 0 | 1 (5 slides) | **0.50** (4 slides avg) |
| Checkin | 1 | 1 | 1 | 1 | **1.00** (universal) |
| StepByStep | 1 | 0 | 1 | 0 | **0.50** |
| ScenarioCard | 2 | 1 | 1 | 0 | **1.00** |
| **LessonQuiz** | *(auto)* | *(auto)* | *(auto)* | *(auto)* | **1.00** (rendered by page.tsx) |
| **LessonFeedback** | *(auto)* | *(auto)* | *(auto)* | *(auto)* | **1.00** (rendered by page.tsx) |

### **Interactivity Ratio:**
- **Read-only content:** ~55-60% (headings, paragraphs, tables, lists)
- **Static interactive:** ~20-25% (Callout, InsightGrid, ScenarioCard, StepByStep)
- **User-driven interactive:** ~15-20% (BodyMap, Scenario, Accordion, FlipCard, Slide, Checkin)

### **Engagement Pattern:**
1. **First 20%:** Foundation (read-heavy with static visuals)
2. **Middle 60%:** Core learning (mix of read + interactive)
3. **Final 20%:** Consolidation (takeaways + reflection)

**Key insight:** Interactive components appear every ~200-400 words. Never more than 2 paragraphs between interactive elements.

---

## 4. Progress & Data Model

### **Lesson Completion Tracking:**

**What triggers "lesson complete"?**
- Currently: Explicit "Mark Complete" button click (see [complete-button.tsx](../app/(default)/academy/components/complete-button.tsx))
- NOT automatic based on scroll or component interaction
- User-initiated completion gives agency

**Component-level tracking:**
All component interactions save to database via `useComponentState` hook:

**File:** [use-component-state.ts](../app/(default)/academy/components/use-component-state.ts)

**Database schema (conceptual):**
```typescript
interface LessonComponentState {
  courseId: string;
  lessonId: string;
  flipCards?: { reviewed: string[] };         // persistKey array
  accordions?: { opened: string[] };          // persistKey array
  slides?: Record<string, {                   // persistKey → state
    current: number;
    visited: number[];
  }>;
  checkins?: Record<string, {                 // componentKey → response
    type: 'scale' | 'reflect' | 'choice';
    value: number | string;
  }>;
  scenarios?: Record<string, number[]>;       // componentKey → explored choice indices
  bodyMaps?: Record<string, string[]>;        // componentKey → selected region IDs
  groundingExercises?: Record<string, any>;   // (other components)
  copingRanker?: Record<string, any>;
  exposureHierarchy?: Record<string, any>;
  exposureLogs?: Record<string, any>;
  exposurePlans?: Record<string, any>;
  updatedAt: string;
}
```

**Save strategy:**
- **Optimistic update:** Local state updates immediately
- **Debounced server save:** 1 second delay (prevents excessive API calls)
- **Fallback:** localStorage backup if server save fails
- **Deduplication:** Multiple components on same page share cached GET request

**Progress flow to sidebar/dashboard:**
- Component state saves are independent of lesson completion
- Lesson completion writes to separate `course_progress` table
- Dashboard aggregates `course_progress` for "X of Y lessons complete"
- Component state used for "resume where you left off" (e.g., restore slide position)

---

## 5. Customization Points for Optimization Courses

### **Components Reusable As-Is:**
✅ **InsightGrid** — Benefits of movement, sleep quality factors, nutrition facts  
✅ **StepByStep** — How to build habits, progressive overload explained  
✅ **Callout** — Safety warnings, performance tips, motivation  
✅ **ScenarioCard** — Training analogies, real-world examples  
✅ **FlipCard** — Performance myths vs. facts  
✅ **SlideNavigation** — Multi-stage concept explanations  
✅ **Checkin** — Self-assessment, commitment tracking  

### **Components Needing Re-theming (Language Only):**

| Therapeutic Component | Optimization Reframe | Changes Needed |
|-----------------------|----------------------|----------------|
| **BodyMap** | "Movement Body Map" or "Energy Map" | Region descriptions: "anxiety → energy", "tension → strength zones" |
| **InteractiveScenario** | "Performance Scenario" | Scenario context: "stress response → training decision", choice types same |
| **EnhancedAccordion** | No change | Same usage (FAQs, pillar breakdowns) |

**Re-theming strategy:**
- Copy component file → create `*-optimization.tsx` variant
- Update only description text (REGIONS array for BodyMap, TYPE_META for Scenario)
- Keep all interaction logic identical
- OR: Add `theme` prop (`clinical` | `optimization`) and conditional text

### **Components Needing Structural Changes:**
🛠 **ThoughtRecord** → **ValuesRecord** or **GoalRecord**  
- Current: Situation → Thought → Emotion → Evidence  
- Optimization: Goal → Current State → Obstacle → Action Plan  
- Same form structure, different field labels

🛠 **ExposureHierarchy** → **ChallengeHierarchy** or **ProgressionBuilder**  
- Current: Anxiety-provoking situations ranked by SUDS  
- Optimization: Physical challenges ranked by difficulty/readiness  
- Same drag-and-drop ranking UI, different context

🛠 **CopingStrategyRanker** → **PillarPriorityRanker**  
- Current: Rank coping tools by effectiveness  
- Optimization: Rank Five Pillars by current focus  
- Same ranking mechanism, different item set

### **New Components Needed (Optimization-Specific):**
📊 **PillarProgressTracker** — Visual dashboard of user's progress across 5 pillars  
📈 **HabitStreakCounter** — Gamified streak tracking for consistency  
🎯 **GoalSettingWorksheet** — SMART goal builder with save/review  
📅 **WeeklyPlanningGrid** — Drag-and-drop weekly schedule builder  

---

## 6. Recommendations for First Optimization Course  
**"Physical Vitality: Movement for Mental Performance"**

### **Recommended Lesson 1 Structure:**

```markdown
---
title: "Movement as Medicine: The Brain-Body Connection"
duration: "45 min"
pillar: "Physical Vitality"
course: "Movement for Mental Performance"
lesson: 1
---

## Hook (relatable question)
"Have you noticed how a 10-minute walk can clear your head better than scrolling for an hour?"

<Callout type="reflection" title="Movement Is Not Just Physical">
This lesson explores how movement reshapes your brain, regulates your mood, and amplifies your mental performance. It's not about being an athlete—it's about being alive.
</Callout>

## 1. The Neuroscience of Movement (## heading)
**Why movement is the most powerful cognitive enhancer:**

<InsightGrid>
<InsightItem icon="🧠" title="BDNF Release">
Movement triggers brain-derived neurotrophic factor—think of it as fertilizer for your neurons. 20 minutes of moderate activity increases BDNF for hours afterward.
</InsightItem>
<InsightItem icon="⚡" title="Prefrontal Cortex Activation">
Exercise increases blood flow to the decision-making, focus, and emotional regulation centers of your brain—exactly the areas burnout and stress shut down.
</InsightItem>
<InsightItem icon="🌊" title="Cortisol Regulation">
Movement metabolizes stress hormones. It doesn't eliminate stress—it gives stress an exit route.
</InsightItem>
<InsightItem icon="😊" title="Endorphin + Dopamine">
Not just a "runner's high"—even walking, stretching, or dancing releases feel-good neurotransmitters that improve mood and motivation.
</InsightItem>
</InsightGrid>

## 2. Where Do You Feel Movement? (interactive)

<BodyMap title="Your Movement Body Map" prompt="Tap the areas where you feel energy, strength, or tension during or after movement. There are no wrong answers—this is about awareness." />

## 3. The Dose-Response Curve (concept building)

<SlideNavigation persistKey="movement-dose-response">
<Slide title="Minimum Effective Dose">
**10-20 minutes of moderate movement daily** is enough to see cognitive and mood benefits. You don't need an hour at the gym—you need consistency.
</Slide>
<Slide title="Optimal Zone">
**150 minutes per week** (WHO guideline) balances neurogenesis, cardiovascular health, and stress resilience. That's ~20-30 min/day or 3-5 sessions per week.
</Slide>
<Slide title="Diminishing Returns">
**Beyond 300 min/week**, benefits plateau and injury risk increases for most people. More is not always better—recovery is part of the equation.
</Slide>
</SlideNavigation>

## 4. Movement Myths vs. Facts (myth-busting)

<FlipCard front="Myth: You need a gym membership to get benefits" back="Walking, bodyweight exercises, dancing in your living room, or gardening all count. The best movement is the one you'll actually do." />

<FlipCard front="Myth: No pain, no gain" back="Soreness is not the goal—neurochemical change is. Sustainable movement beats burnout every time." />

<FlipCard front="Myth: Cardio is best for mental health" back="Resistance training, yoga, and even stretching all improve mood and cognition. Variety is ideal." />

## 5. What Would You Do? (scenario practice)

<InteractiveScenario title="A Stressful Afternoon" description="You've been at your desk for 4 hours straight. Your focus is shot, your mood is low, and you have 3 more hours of work ahead.">
<Choice label="Power through—take a break later when the work is done" type="common" feedback="This is the 'productivity trap.' Your brain's prefrontal cortex is already fatigued—pushing harder reduces output and increases errors. A 10-minute movement break would restore 30+ minutes of focus." />
<Choice label="Scroll social media for 10 minutes to decompress" type="avoidant" feedback="Passive scrolling doesn't reset your nervous system—it keeps you in the same seated, screen-based posture. Movement is the pattern interrupt your brain needs." />
<Choice label="Do 10 minutes of bodyweight exercises or a quick walk" type="healthy" feedback="This is the neuroscience sweet spot. A short movement break increases blood flow to your prefrontal cortex, metabolizes cortisol, and improves focus for the next work block. You've just hacked your afternoon." />
<Choice label="Skip the break and caffeinate instead" type="avoidant" feedback="Caffeine can mask fatigue but won't restore cognitive function. Movement addresses the root cause—stagnant blood flow and accumulated stress hormones." />
</InteractiveScenario>

## 6. Types of Movement for Mental Performance (accordion)

<EnhancedAccordion>
<AccordionItem title="Cardiovascular (Walking, Running, Cycling)">
**Mental benefits:** BDNF release, mood elevation, anxiety reduction  
**Minimum dose:** 10-20 min moderate intensity  
**Best for:** Morning energy, stress relief, creative problem-solving (the "shower effect")
</AccordionItem>
<AccordionItem title="Resistance Training (Weights, Bodyweight)">
**Mental benefits:** Confidence building, cortisol regulation, improved sleep  
**Minimum dose:** 20-30 min, 2-3x/week  
**Best for:** Long-term resilience, self-efficacy, focus
</AccordionItem>
<AccordionItem title="Mind-Body (Yoga, Tai Chi, Stretching)">
**Mental benefits:** Parasympathetic activation (rest-and-digest), body awareness, emotional regulation  
**Minimum dose:** 10-15 min daily  
**Best for:** Burnout recovery, anxiety management, sleep quality
</AccordionItem>
</EnhancedAccordion>

## 7. Key Takeaways

<StepByStep title="What You Learned">
<Step title="Movement is brain medicine">
It's not just about fitness—it's about neuroplasticity, mood regulation, and cognitive performance.
</Step>
<Step title="Consistency beats intensity">
10-20 minutes daily is more valuable than sporadic 90-minute sessions. Build the habit first.
</Step>
<Step title="All movement counts">
Walking, stretching, dancing, resistance training—variety is ideal, but the best movement is the one you'll do.
</Step>
<Step title="Use movement as a pattern interrupt">
When stuck, stressed, or fatigued, a 10-minute movement break restores hours of focus.
</Step>
</StepByStep>

<Checkin type="reflect" question="After this lesson, what's one way you could add 10 minutes of movement to your day this week? What would make it easy and sustainable?" />

## Summary Checklist

- [ ] Can you explain how movement affects your brain (BDNF, cortisol, prefrontal cortex)?
- [ ] Do you know the minimum effective dose (10-20 min daily)?
- [ ] Have you identified one type of movement you'd like to try this week?
- [ ] Do you understand why movement is a performance tool, not just a physical practice?

---

**Quiz (create separately via API):**
```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is the minimum effective dose of movement for cognitive and mood benefits?",
      "options": [
        { "id": "a", "text": "60 minutes daily at high intensity" },
        { "id": "b", "text": "10-20 minutes of moderate movement daily" },
        { "id": "c", "text": "3 hours per week of vigorous exercise" },
        { "id": "d", "text": "You must join a gym to see benefits" }
      ],
      "correctAnswer": "b",
      "explanation": "Research shows 10-20 minutes of moderate movement daily is enough to trigger BDNF release, improve focus, and regulate cortisol. Consistency beats intensity."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Which brain chemical is often called 'fertilizer for neurons' and increases with movement?",
      "options": [
        { "id": "a", "text": "Serotonin" },
        { "id": "b", "text": "Dopamine" },
        { "id": "c", "text": "BDNF (Brain-Derived Neurotrophic Factor)" },
        { "id": "d", "text": "Cortisol" }
      ],
      "correctAnswer": "c",
      "explanation": "BDNF supports neuroplasticity and brain health. Movement is one of the most reliable ways to increase BDNF levels naturally."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "According to the lesson, what's the best type of movement for mental performance?",
      "options": [
        { "id": "a", "text": "Only high-intensity cardio" },
        { "id": "b", "text": "Only resistance training" },
        { "id": "c", "text": "The one you'll actually do consistently" },
        { "id": "d", "text": "You must do yoga for mental benefits" }
      ],
      "correctAnswer": "c",
      "explanation": "Variety is ideal, but the best movement is the one you'll do. Consistency beats perfection every time."
    },
    {
      "id": "q4",
      "type": "reflection",
      "question": "Describe one specific situation this week where you could use a 10-minute movement break to improve your focus or mood. What type of movement would you do?",
      "minLength": 75,
      "aiFeedback": "Great thinking! The key is identifying triggers (when you feel stuck/stressed) and having a go-to movement ready. The easier you make it, the more likely you'll do it."
    }
  ]
}
```

**Feedback (automatic):** LessonFeedback component renders automatically — no setup needed.

---
```

### **Why This Structure Works:**

1. **Mirrors therapeutic lesson density** (4-6 interactive components)
2. **Reframes clinical language** without losing depth ("anxiety → performance", "symptoms → energy")
3. **Maintains compassionate tone** (Callout: "Movement Is Not Just Physical")
4. **Uses familiar components** (InsightGrid, BodyMap, Scenario, FlipCard, Accordion, StepByStep, Checkin)
5. **Focuses on neuroscience + practicality** (not moralizing or fitness-shaming)
6. **Ends with low-barrier reflection** (Checkin: "one way to add 10 min")

### **Lesson 2-8 Suggested Progression:**
- **L2:** Building a Movement Habit (habit science, cue-routine-reward, streaks)
- **L3:** Movement for Different Mental States (energizing vs. calming)
- **L4:** Overcoming Barriers (time, motivation, fatigue, injury)
- **L5:** Progressive Overload for Beginners (building from 10 → 30 min)
- **L6:** Movement for Focus and Flow (pre-work rituals, walking meetings)
- **L7:** Recovery as Performance (rest days, sleep, active recovery)
- **L8:** Your Movement Plan (goal setting, weekly planning, tracking)

---

## 7. Code References & Integration Points

### **How Components Integrate into Lessons:**

**File:** [app/(default)/academy/[courseId]/[lessonId]/page.tsx](../app/(default)/academy/[courseId]/[lessonId]/page.tsx)

**MDX Rendering:**
- Lesson content stored as markdown files: `server/data/content/{track}/{course}/lesson-{N}.md`
- Parsed via `getLessonContent()` → returns frontmatter + markdown body
- Rendered with `next-mdx-remote/rsc` → `<MDXRemote source={content} components={{...}} />`

**Component registration (lines 164-191):**
```typescript
<MDXRemote
  source={lessonData.content}
  components={{
    // Interactive components
    InteractiveBreathingExercise,
    BodyMap,
    InteractiveScenario,
    Choice,
    ExposureHierarchyBuilder,
    // ... (all components imported and passed to MDX)
    
    // Display components
    Callout,
    InsightGrid,
    InsightItem,
    StepByStep,
    Step,
    // ...
  }}
/>
```

**Usage in MDX:**
```markdown
<BodyMap title="Your Anxiety Body Map" prompt="Tap where you feel symptoms." />

<InteractiveScenario title="A Stressful Morning" description="You wake up to...">
<Choice label="Option A" feedback="..." type="common" />
<Choice label="Option B" feedback="..." type="healthy" />
</InteractiveScenario>
```

**Progress tracking:**
- Each component uses `useComponentState()` hook
- Hook reads `courseId` and `lessonId` from route params (`useParams()`)
- Saves to `/api/academy/component-state/:courseId/:lessonId`
- See [use-component-state.ts](../app/(default)/academy/components/use-component-state.ts) lines 53-217

---

## 8. Quick Reference: Component Decision Tree

**When to use each component:**

```
Need to show facts/concepts?
├─ 2-4 items → InsightGrid
├─ 5+ items, user should expand → EnhancedAccordion  
└─ Sequential explanation → SlideNavigation

Need user to self-assess?
├─ Body location → BodyMap
├─ Scenario response → InteractiveScenario
├─ Reflection/rating → Checkin
└─ Myth-busting → FlipCard

Need to emphasize information?
├─ Warning/safety → Callout (type="warning")
├─ Encouragement → Callout (type="reflection")
├─ Tip/hack → Callout (type="tip")
└─ Example story → ScenarioCard

Need to show process/steps?
├─ Numbered steps → StepByStep
└─ Comparison → Table (markdown)

Lesson completion elements?
├─ Knowledge test → LessonQuiz (created via API, auto-renders)
├─ Collect feedback → LessonFeedback (auto-renders, no setup)
└─ Mark complete → CompleteButton (auto-renders)
```

---

## 9. Success Criteria Checklist

**When building the first optimization course, verify:**

- [ ] **Lesson 1 has 45 min duration** (matches therapeutic standard)
- [ ] **4-6 interactive components in MDX** (matches density analysis)
- [ ] **Opening Callout (type="reflection")** to set tone
- [ ] **InsightGrid appears in first 20%** of lesson (early visual engagement)
- [ ] **BodyMap OR InteractiveScenario by ~30%** (personalization)
- [ ] **FlipCards for myth-busting** (3-5 cards for common misconceptions)
- [ ] **StepByStep for key takeaways** (end of lesson)
- [ ] **Checkin (type="reflect") at end of MDX** (consolidation)
- [ ] **Quiz created (3-4 questions: 2-3 multiple-choice + 1 reflection)** (via API, not in MDX)
- [ ] **LessonFeedback renders automatically** (no setup needed, page.tsx handles it)
- [ ] **Language is reframed** (no clinical terminology unless explaining neuroscience)
- [ ] **Tone is empowering, not prescriptive** ("you can" not "you must")
- [ ] **No crisis resources** (not a clinical course)
- [ ] **All components save to database** (useComponentState working)

---

## 10. Next Steps

**To build "Physical Vitality: Movement for Mental Performance" course:**

1. **Copy lesson structure** from this playbook's Section 6
2. **Create 8 lesson files** in `server/data/content/optimization/movement-performance/lesson-{1-8}.md`
3. **Create quiz for each lesson** via API endpoint (3-4 questions per lesson):
   - 2-3 multiple-choice (test comprehension of key concepts)
   - 1 reflection question (apply learning to personal context)
   - Include explanations for all multiple-choice answers
   - Optional: Add AI feedback for reflection questions
4. **Verify component imports** in lesson page (should work out-of-box)
5. **Test one lesson end-to-end:**
   - Write lesson-1.md
   - Create quiz-1.json via `/api/academy/quiz` endpoint
   - Navigate to `/optimization/movement-performance/1` (route TBD — may need routing updates)
   - Verify all components render + save
   - Test quiz submission + feedback form
   - Check responsiveness (mobile/desktop)
6. **Iterate on tone/language** based on user testing + feedback submissions
7. **Repeat for remaining 7 lessons**

**Estimated build time:**
- Lesson 1 (with this playbook): **2-3 hours** (MDX writing + testing)
- Quiz 1 creation: **30 min** (4 questions + explanations)
- Lessons 2-8 (pattern established): **1-2 hours each MDX + 30 min quiz** (~12-16 hours total)
- **Total: ~18-20 hours** for full 8-lesson course with quizzes

**Confidence level:** High — all components exist, data model proven, only content creation needed.

---

# SECTION B: PHYSICAL VITALITY CONTENT STRUCTURE (from HTML5)

## Course Overview: Movement Medicine

**Full Course Title:** Movement Medicine: Exercise as Mental Health Treatment

**Duration:** 20 lessons × 50 minutes = ~16.5 hours total

**Learning Arc:** The course progresses from foundational neuroscience (L1-5) → assessment/application (L6-9) → specific modalities (L10-15) → integration/sustainability (L16-20).

**Target Outcomes:**
- Understand exercise as evidence-based mental health intervention
- Build personalized movement practice matched to mental health needs
- Create sustainable exercise habits for long-term wellbeing
- Apply movement medicine principles to clinical conditions (depression, anxiety, PTSD, ADHD)

**Research Foundation:** All lessons reference window of tolerance (Dr. Dan Siegel), Polyvagal Theory (Dr. Stephen Porges), BDNF/neuroplasticity research, grounding techniques, and emotion regulation frameworks.

**Note on HTML5 Templates:** The HTML5 lessons appear to use a template with repetitive content (Window of Tolerance, grounding techniques, dyadic regulation). The UNIQUE lesson-specific content is in the opening paragraph, learning objectives, and research statistics. This analysis extracts those unique elements for MDX adaptation.

---

## Lesson-by-Lesson Breakdown

### Lesson 1: The Science of Exercise as Medicine

**Learning Objectives:**
- Understand how exercise increases BDNF to promote brain health and neuroplasticity
- Learn how movement regulates key neurotransmitters like serotonin, dopamine, and norepinephrine
- Recognize how different types of exercise can reduce symptoms of depression and anxiety
- Identify key structural brain changes that result from consistent physical activity

**Key Concepts:**
- BDNF (Brain-Derived Neurotrophic Factor) as "Miracle-Gro for the brain"
- Neurotransmitter regulation: serotonin, dopamine, norepinephrine
- Structural brain changes: hippocampus volume increase, prefrontal cortex strengthening
- Anti-inflammatory effects of exercise on mood

**Research Foundation:**
- 20-30% depression risk reduction with regular physical activity (1.4M participants)
- 2% hippocampal volume increase from one year of aerobic exercise
- 26% depression risk reduction from just 15 minutes daily moderate activity
- Exercise effectiveness equal to psychotherapy for mild-moderate depression

**Content Flow:**
1. Introduction: Exercise as brain medicine (not just physical health)
2. Neuroscience Deep Dive: BDNF, neurotransmitters, structural changes, inflammation
3. Body Scan Practice (5-minute mindfulness exercise)
4. Movement Prescriptions: Depression (activation), Anxiety (regulation), Focus (cognitive boost)
5. Movement & Mood Log (tracking before/after metrics)
6. Reflection questions

**Interactive Opportunities:**
- BodyMap: "Where do you feel movement benefits?" (energy, strength, tension)
- SlideNavigation: BDNF → Neurotransmitters → Structural Changes (concept building)
- FlipCard: Myth vs. fact (exercise misconceptions)
- Checkin: Post-movement mood/energy tracking
- InsightGrid: Research statistics (20-30% reduction, 2% hippocampal growth, etc.)

**Duration:** 45-50 min (standardized)

---

### Lesson 2: Depression and the Movement Prescription

**Learning Objectives:**
- Learn the optimal exercise prescription for depression (type, duration, frequency)
- Understand how to overcome motivational barriers when depressed
- Master behavioral activation strategies using movement

**Key Concepts:**
- Depression creates vicious cycle: low mood → reduced activity → deeper symptoms
- Exercise as first-line treatment (clinical guidelines)
- Behavioral activation through movement
- Overcoming anhedonia and motivational barriers

**Research Foundation:**
- 30-45 min moderate aerobic activity 3-4x weekly optimal for depression
- 10 min brief walks show measurable mood improvements within 2-3 sessions
- 12 weeks duration needed for antidepressant effects comparable to medication
- Enhanced outcomes from group exercise versus solo activity

**Content Flow:**
1. Depression-exercise vicious cycle explanation
2. Evidence for exercise as antidepressant intervention
3. Grounding techniques practice (reused template content)
4. Dyadic regulation strategies
5. Cognitive reframing for social anxiety
6. Progress tracking + reflection

**Interactive Opportunities:**
- InteractiveScenario: "Overcoming low motivation" with 4 response paths
- ProgressTracker: Tracking regulation skills development
- Reflection prompts: Personal barriers, support systems

**Duration:** 45-50 min

---

### Lesson 3: Anxiety Disorders and Movement Therapy

**Learning Objectives:**
- Understand how exercise reduces anxiety sensitivity and improves stress response
- Learn which exercise types work best for different anxiety disorders
- Master interoceptive exposure through controlled movement

**Key Concepts:**
- Anxiety involves dysregulation of stress response system
- Physiological symptoms of anxiety mirror exercise sensations (therapeutic through interoceptive exposure)
- Exercise as anxiety management tool

**Research Foundation:**
- HIIT (high-intensity interval training) shows strongest evidence for anxiety reduction
- Lower baseline cortisol levels in regular yoga practitioners vs. sedentary controls
- Improved heart rate variability and stress recovery in regular exercisers
- Breathing techniques from mind-body exercise become portable anxiety management tools

**Content Flow:**
1. Anxiety disorders and exercise connection
2. Interoceptive exposure explanation
3. Exercise types for anxiety (HIIT, yoga, mindful movement)
4. Grounding techniques (template content)
5. Progress tracking

**Interactive Opportunities:**
- BodyMap: "Where do you feel anxiety in your body?"
- EnhancedAccordion: Different anxiety disorders + movement recommendations
- Breathing exercise component (interactive guided practice)

**Duration:** 45-50 min

---

### Lesson 4: PTSD and Trauma-Informed Movement

**Learning Objectives:**
- Understand trauma-informed principles for movement programming
- Learn rhythmic activities that support trauma processing
- Master choice and control in exercise experiences

**Key Concepts:**
- PTSD alters mind-body relationship (disconnection, feeling unsafe in physical body)
- Trauma-informed movement recognizes traditional programs may trigger trauma responses
- Importance of choice, control, and safety in movement

**Research Foundation:**
- Significant PTSD symptom reductions from trauma-sensitive yoga practice
- Bilateral stimulation from rhythmic movement supports trauma integration
- Improved body awareness and emotional regulation from trauma-informed practice
- Empowerment sense rebuilt through choice-centered movement

**Content Flow:**
1. PTSD and mind-body disconnection
2. Trauma-informed movement principles
3. Rhythmic activities (bilateral stimulation)
4. Choice and control strategies
5. Safety considerations

**Interactive Opportunities:**
- Checkin: "What movement feels safe to you right now?"
- SlideNavigation: Trauma-informed principles (choice → control → safety)
- BodyMap: "Map areas that feel safe vs. unsafe during movement"

**Duration:** 45-50 min

---

### Lesson 5: ADHD and Movement-Based Focus Enhancement

**Learning Objectives:**
- Learn how exercise improves attention and reduces hyperactivity in ADHD
- Understand which activities provide optimal cognitive enhancement
- Master morning movement routines for all-day focus

**Key Concepts:**
- ADHD involves brain structure/function differences making sustained focus challenging
- Exercise increases dopamine and norepinephrine (same neurotransmitters ADHD medications target)
- Movement as cognitive enhancer

**Research Foundation:**
- 2-4 hours duration of attention improvement after single exercise bout
- 30-40 min combined aerobic and strength training provides optimal cognitive enhancement
- Significant improvements in classroom behavior with morning movement programs
- Activities requiring coordination, balance, rapid decision-making best for ADHD

**Content Flow:**
1. ADHD neuroscience and exercise connection
2. Dopamine/norepinephrine effects
3. Morning movement routines
4. Activities for cognitive enhancement
5. Focus tracking

**Interactive Opportunities:**
- StepByStep: "Build Your Morning Movement Routine" (sequential habit building)
- InteractiveScenario: "Managing afternoon focus crash" with movement solutions
- Tracker: Before/after focus ratings

**Duration:** 45-50 min

---

### Lesson 6: Building Your Personal Movement Assessment

**Learning Objectives:**
- Conduct comprehensive mental health and movement assessment
- Identify movement joy and personal preferences
- Recognize barriers and create realistic solutions

**Key Concepts:**
- Assessment goes beyond basic fitness to include mental health history, current symptoms, movement preferences, barriers
- Assessment process itself is therapeutic (recognizes mind-body connections)
- Personalization is key to adherence

**Content Flow:**
1. Comprehensive assessment framework
2. Mental health + movement history questions
3. Preference identification
4. Barrier recognition + problem-solving
5. Goal setting

**Interactive Opportunities:**
- Assessment questionnaire (multi-part Checkin components)
- BarrierSolver: Interactive tool for identifying + addressing obstacles
- PreferenceRanker: Rank movement types by enjoyment/accessibility

**Duration:** 45-50 min

---

### Lesson 7: The Neuroscience of Movement and Mood

**Learning Objectives:**
- Understand BDNF and neuroplasticity from exercise
- Learn how exercise affects neurotransmitter systems
- Recognize the gut-brain axis and exercise connection

**Key Concepts:**
- Brain's response to exercise involves complex neurobiological cascades (minutes → hours)
- Increased blood flow delivers oxygen/nutrients during aerobic exercise
- BDNF promotion
- Gut-brain axis connection to movement

**Content Flow:**
1. Neurobiological cascades timeline
2. BDNF deep dive
3. Neurotransmitter system changes
4. Gut-brain axis explanation
5. Mood tracking

**Interactive Opportunities:**
- SlideNavigation: Timeline of neurobiological changes (5 min → 1 hour → 24 hours)
- InsightGrid: Neurotransmitter effects (serotonin, dopamine, GABA, endorphins)
- FlipCard: "How long do exercise benefits last?" myths vs. facts

**Duration:** 45-50 min

---

### Lesson 8: Cardio for Mental Clarity and Emotional Regulation

**Learning Objectives:**
- (Based on filename: likely focuses on cardiovascular exercise benefits for mental health)
- Understand optimal cardio intensity for mood improvement
- Learn rhythmic cardio for stress regulation

**Key Concepts:**
- Cardiovascular exercise as mental clarity tool
- Emotional regulation through rhythmic movement
- Intensity zones for different mental health goals

**Content Flow:**
- (HTML5 file appears incomplete/missing specific content beyond template)

**Interactive Opportunities:**
- Heart rate zone calculator
- Movement mood tracker
- Cardio type preference ranker

**Duration:** 45-50 min

---

### Lesson 9: Strength Training for Self-Esteem and Resilience

**Learning Objectives:**
- (Based on filename: focuses on resistance training psychological benefits)
- Understand how strength training builds self-efficacy
- Learn progressive overload for mental resilience

**Key Concepts:**
- Strength training as confidence builder
- Physical strength → psychological resilience connection
- Progressive overload principle

**Content Flow:**
- (HTML5 file appears incomplete/missing specific content beyond template)

**Interactive Opportunities:**
- ProgressionBuilder: Plan gradual strength increases
- StrengthJournal: Track physical + mental strength gains

**Duration:** 45-50 min

---

### Lesson 10: Yoga and Mindful Movement for Mental Health

**Learning Objectives:**
- Understand how yoga reduces stress through nervous system regulation
- Learn which yoga styles match different mental health needs
- Master trauma-sensitive yoga principles and practices

**Key Concepts:**
- Yoga integrates physical movement, breath regulation, and mindfulness
- Parasympathetic nervous system activation during yoga counters chronic stress
- Different yoga styles for different mental health needs (restorative vs. vigorous)

**Content Flow:**
1. Yoga as comprehensive mental health approach
2. Parasympathetic activation explanation
3. Yoga styles matched to needs (anxiety → restorative, depression → vigorous flow)
4. Trauma-sensitive yoga principles
5. Breath-movement coordination

**Interactive Opportunities:**
- YogaStyleMatcher: Input symptoms → get recommended yoga style
- BreathingPractice: Guided pranayama exercises
- BodyMap: "Where do you hold tension?" → targeted poses

**Duration:** 45-50 min

---

### Lesson 11: High-Intensity Interval Training (HIIT) for Mental Toughness

**Learning Objectives:**
- (Based on filename: HIIT benefits for psychological resilience)
- Understand mental toughness development through HIIT
- Learn safe HIIT protocols for beginners

**Key Concepts:**
- HIIT as mental resilience training
- Discomfort tolerance building
- Brief, intense efforts for maximum benefit

**Content Flow:**
- HIIT neuroscience
- Mental toughness connection
- Beginner-friendly HIIT protocols
- Safety considerations

**Interactive Opportunities:**
- HIIT workout builder
- Interval timer integration
- Progress tracker (physical + mental metrics)

**Duration:** 45-50 min

---

### Lesson 12: Team Sports and Social Connection Through Movement

**Learning Objectives:**
- (Based on filename: social benefits of team-based movement)
- Understand social connection as mental health factor
- Learn how to find movement communities

**Key Concepts:**
- Social connection through movement
- Team sports psychological benefits
- Overcoming social anxiety in group movement settings

**Content Flow:**
- Social connection + mental health research
- Team sports options (recreational, organized, casual)
- Finding movement communities
- Social anxiety management in group settings

**Interactive Opportunities:**
- CommunityFinder: Local movement groups/classes
- SocialAnxietyToolkit: Strategies for joining groups
- Accountability partner matching

**Duration:** 45-50 min

---

### Lesson 13: Individual Sport Psychology and Personal Growth

**Learning Objectives:**
- (Based on filename: psychological benefits of solo sports)
- Understand self-reliance through individual sports
- Learn goal-setting for personal athletic development

**Key Concepts:**
- Individual sports as self-discovery tool
- Intrinsic motivation development
- Personal best vs. competition with others

**Content Flow:**
- Individual vs. team sports psychology
- Self-reliance building
- Goal-setting frameworks
- Progress tracking

**Interactive Opportunities:**
- GoalSetter: SMART goals for personal athletic development
- ProgressJournal: Track personal bests
- ReflectionPrompts: "What did I learn about myself?"

**Duration:** 45-50 min

---

### Lesson 14: Dance and Creative Movement Therapy

**Learning Objectives:**
- (Based on filename: therapeutic benefits of dance/creative movement)
- Understand dance as emotional expression
- Learn accessible dance practices for non-dancers

**Key Concepts:**
- Dance as creative movement therapy
- Emotional expression through movement
- Body-mind integration
- No "dance skill" required

**Content Flow:**
- Dance therapy research
- Emotional expression benefits
- Accessible dance practices (movement to music, free-form, structured)
- Overcoming self-consciousness

**Interactive Opportunities:**
- MusicMoodMatcher: Playlist creator for different emotional states
- MovementPrompts: Creative movement exercises
- VideoGuides: Simple dance sequences

**Duration:** 45-50 min

---

### Lesson 15: Outdoor Exercise and Nature's Mental Health Benefits

**Learning Objectives:**
- (Based on filename: "green exercise" benefits)
- Understand nature exposure + exercise synergy
- Learn accessible outdoor movement practices

**Key Concepts:**
- "Green exercise" (movement in nature)
- Attention restoration theory
- Nature as stress buffer
- Seasonal considerations

**Content Flow:**
- Nature + exercise research (additive benefits)
- Attention restoration theory
- Outdoor movement options (hiking, walking, outdoor yoga)
- Seasonal adaptations
- Accessibility considerations

**Interactive Opportunities:**
- TrailFinder: Local nature walking paths
- SeasonalPlanner: Adapt movement to weather
- NatureJournal: Track outdoor movement experiences

**Duration:** 45-50 min

---

### Lesson 16: Creating Sustainable Exercise Habits

**Learning Objectives:**
- (Based on filename: habit formation for exercise)
- Understand habit science (cue-routine-reward)
- Learn to overcome common adherence barriers

**Key Concepts:**
- Habit formation neuroscience
- Cue-routine-reward loop
- Identity-based habits ("I am someone who moves")
- Barrier troubleshooting

**Content Flow:**
1. Habit science foundations
2. Cue-routine-reward framework
3. Identity-based habits
4. Common barriers + solutions
5. Streak tracking

**Interactive Opportunities:**
- HabitBuilder: Design your cue-routine-reward loop
- BarrierSolver: Identify + troubleshoot adherence obstacles
- StreakTracker: Visual consistency tracking

**Duration:** 45-50 min

---

### Lesson 17: Exercise for Sleep and Circadian Rhythm Optimization

**Learning Objectives:**
- (Based on filename: movement-sleep connection)
- Understand exercise timing for sleep quality
- Learn circadian rhythm optimization through movement

**Key Concepts:**
- Exercise-sleep bidirectional relationship
- Timing considerations (morning light exposure, evening intensity)
- Circadian rhythm regulation
- Sleep hygiene + movement

**Content Flow:**
1. Exercise-sleep research
2. Timing recommendations (morning vs. evening)
3. Circadian rhythm optimization
4. Sleep hygiene integration
5. Sleep tracking

**Interactive Opportunities:**
- TimingCalculator: Optimal exercise timing based on sleep goals
- SleepTracker: Before/after exercise sleep quality
- CircadianScheduler: Plan movement for rhythm optimization

**Duration:** 45-50 min

---

### Lesson 18: Nutrition and Exercise Synergy for Mental Health

**Learning Objectives:**
- (Based on filename: nutrition-exercise interaction for mental health)
- Understand nutrition-exercise synergy
- Learn pre/post-exercise nutrition for mood

**Key Concepts:**
- Nutrition + exercise as complementary mental health tools
- Pre-exercise fueling for performance + mood
- Post-exercise nutrition for recovery
- Hydration effects on mental clarity

**Content Flow:**
1. Nutrition-exercise synergy research
2. Pre-exercise nutrition
3. Post-exercise recovery nutrition
4. Hydration for mental performance
5. Integration planning

**Interactive Opportunities:**
- MealPlanner: Pre/post-exercise nutrition ideas
- HydrationTracker: Water intake + mood correlation
- SynergyJournal: Track nutrition + movement effects

**Duration:** 45-50 min

---

### Lesson 19: Technology and Exercise Tracking for Mental Health

**Learning Objectives:**
- (Based on filename: using tech for movement tracking)
- Understand benefits + pitfalls of exercise tracking
- Learn to use data for mental health insights

**Key Concepts:**
- Wearables + mental health tracking
- Data-driven movement insights
- Avoiding obsessive tracking
- Useful metrics (HRV, resting heart rate, sleep, activity minutes)

**Content Flow:**
1. Technology landscape (wearables, apps)
2. Useful metrics for mental health
3. Data interpretation
4. Avoiding tracking obsession
5. Integration strategies

**Interactive Opportunities:**
- MetricsDashboard: Visualize personal data trends
- GoalSetter: Data-informed goal creation
- ReflectionPrompts: "What patterns do you notice?"

**Duration:** 45-50 min

---

### Lesson 20: Building Your Personal Movement Medicine Plan

**Learning Objectives:**
- (Based on filename: capstone lesson - personalized plan creation)
- Synthesize course learnings into personalized plan
- Create sustainable weekly movement schedule
- Set SMART goals for next 30/60/90 days

**Key Concepts:**
- Personalization is key to adherence
- Weekly planning for consistency
- Progressive goal setting
- Accountability systems

**Content Flow:**
1. Course synthesis (review key learnings)
2. Personal assessment review
3. Weekly schedule creation
4. Goal setting (30/60/90 day)
5. Accountability planning
6. Next steps

**Interactive Opportunities:**
- WeeklyPlanner: Drag-and-drop schedule builder
- GoalSetter: SMART goals across timeframes
- AccountabilityMatcher: Find partners/communities
- ProgressDashboard: Track course completion + commitments

**Duration:** 45-50 min

---

## Content Themes & Progression

### Module 1: Foundations (Lessons 1-5)
**Theme:** Understanding exercise as mental health medicine  
**Progression:** General science → Specific conditions (depression, anxiety, PTSD, ADHD)  
**Key Takeaway:** Exercise targets same neurochemical systems as medications

### Module 2: Assessment & Application (Lessons 6-9)
**Theme:** Personalizing movement practice  
**Progression:** Assessment → Neuroscience deep-dive → Modality-specific benefits (cardio, strength)  
**Key Takeaway:** Personalization drives adherence

### Module 3: Modalities & Contexts (Lessons 10-15)
**Theme:** Different movement approaches for different needs  
**Progression:** Mind-body (yoga) → Intensity (HIIT) → Social (team/individual) → Creative (dance) → Environmental (nature)  
**Key Takeaway:** Variety in movement prevents boredom, addresses multiple needs

### Module 4: Integration & Sustainability (Lessons 16-20)
**Theme:** Making movement medicine a lifelong practice  
**Progression:** Habit formation → Sleep optimization → Nutrition synergy → Tech tracking → Personalized plan  
**Key Takeaway:** Sustainability requires systems thinking (habits, environment, support)

---

## Integration Recommendations

### How to Merge HTML5 Content + Therapeutic Interactivity Patterns

**Problem Identified:**  
The HTML5 lessons contain valuable unique content (opening paragraphs, learning objectives, research stats) BUT are wrapped in repetitive template content (Window of Tolerance, grounding techniques, social anxiety reframing) that appears copy-pasted and doesn't match the lesson topics.

**Solution: Extract + Reframe**

1. **Extract Unique Content:**
   - Opening paragraph (lesson-specific introduction)
   - 3 learning objectives
   - Research statistics (4 stat boxes)
   - Lesson title

2. **Discard Template Content:**
   - Window of Tolerance sections (not specific to movement)
   - 5-4-3-2-1 grounding, Box Breathing, PMR, Ice Cube (social anxiety focus)
   - Dyadic regulation, cognitive reframing for social anxiety
   - Generic emotion regulation trackers

3. **Replace with Movement-Specific Interactivity:**
   - BodyMap → "Where do you feel movement benefits?" (energy, strength, relaxation)
   - InteractiveScenario → Movement decision scenarios (e.g., "You're tired - push through or rest?")
   - FlipCard → Movement myths vs. facts
   - InsightGrid → Research statistics (already in HTML5)
   - SlideNavigation → Concept building (BDNF cascade, habit loop, etc.)
   - StepByStep → How-to guides (build morning routine, progressive overload)
   - Checkin → Reflective questions + commitment tracking
   - EnhancedAccordion → Movement types, conditions, FAQs

4. **Maintain Lesson Structure:**
   ```
   Opening Callout (hook + context)
   ↓
   Neuroscience/Research Section (InsightGrid + text)
   ↓
   Interactive Component 1 (BodyMap, Scenario, or FlipCard)
   ↓
   Deep-Dive Concept (SlideNavigation or Accordion)
   ↓
   Interactive Component 2 (different type from #1)
   ↓
   Application Section (StepByStep)
   ↓
   Reflection + Commitment (Checkin)
   ↓
   Summary Checklist
   ```

5. **Tone Adjustments:**
   - HTML5 tone: Clinical, therapeutic, compassionate
   - MDX tone: Performance-focused, empowering, science-backed
   - Keep: Compassion, evidence-based approach
   - Reframe: "Symptoms → Performance", "Coping → Optimization"

### Example Transformation:

**HTML5 Lesson 1 Opening:**
> "Exercise is not just for physical health—it is one of the most powerful, evidence-based interventions for improving mental health. When you move your body, you are directly influencing your brain's chemistry, structure, and function in ways that build resilience against stress, depression, and anxiety."

**MDX Optimization Version:**
```markdown
<Callout type="reflection" title="Movement Is Brain Medicine">
Exercise isn't just about fitness—it's one of the most powerful tools for upgrading your brain's chemistry, structure, and function. Every time you move, you're triggering neurobiological changes that build resilience, sharpen focus, and regulate mood.
</Callout>
```

**HTML5 Research Stats:**
- 20-30% depression risk reduction
- 2% hippocampal volume increase  
- 26% risk reduction from 15 min/day
- Equal effectiveness to psychotherapy

**MDX Optimization Version:**
```markdown
<InsightGrid>
<InsightItem icon="📉" title="20-30% Depression Risk Reduction">
Meta-analysis of 1.4M participants shows regular physical activity reduces depression risk by up to 30%. Movement is medicine.
</InsightItem>
<InsightItem icon="🧠" title="2% Hippocampal Growth">
One year of aerobic exercise increases hippocampus volume by 2%—the brain region critical for learning, memory, and emotional regulation.
</InsightItem>
<InsightItem icon="⚡" title="15 Minutes = 26% Risk Reduction">
Even brief daily movement (15 min moderate activity) reduces depression risk by 26%. Consistency beats intensity.
</InsightItem>
<InsightItem icon="🎯" title="Equal to Psychotherapy">
For mild-moderate depression, structured exercise programs show equivalent effectiveness to cognitive-behavioral therapy.
</InsightItem>
</InsightGrid>
```

---

## Ready for Implementation

**Status:** Section B complete. You now have:

✅ **Section A:** Therapeutic interactivity patterns (15 components, usage examples)  
✅ **Section B:** Physical Vitality content structure (20 lessons, learning objectives, research foundations)

**Next Action:** Build first Physical Vitality lesson in MDX format using:
- Lesson 1 content structure (this section)
- Component patterns (Section A)
- Example lesson structure (playbook Section 6)

**Estimated Time to First Lesson:** 2-3 hours (content extraction + MDX writing + testing)

---

**End of Playbook**  
*Last updated: 2026-04-14*  
*Section A: Therapeutic interactivity patterns | Section B: Physical Vitality HTML5 content structure*  
*Next chat can use this document to build optimization courses with zero rework.*
