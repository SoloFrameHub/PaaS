# Interactive MDX Component System

Reference documentation for the interactive lesson component library used in the Customer Acquisition Academy. This system transforms static markdown lessons into hands-on workshops with persistent state, AI coaching, and personalized content.

## Architecture Overview

```
Lesson Markdown (.md)          MDX Component Registry          React Components
  Contains JSX tags    --->    components/mdx/index.ts    --->   'use client' TSX
  e.g. <FlipCard />            Maps tag names to imports         Tailwind CSS v4
                                                                  localStorage persistence
```

**Stack:** Next.js 16 + MDXRemote (next-mdx-remote/rsc v5) + Tailwind CSS v4 + TypeScript

**Registration:** Components are imported in `components/mdx/index.ts` and spread into `MDXRemote` via `components={{ ...mdxComponents }}` in the lesson page.

**Styling conventions:**
- All components use `not-prose` class to escape markdown prose styling
- Dark mode via `dark:` prefix throughout
- Consistent spacing: `my-8` for cards, `my-6` for compact
- Consistent borders: `border border-gray-200 dark:border-gray-700`
- Consistent rounding: `rounded-2xl` for cards, `rounded-xl` for buttons/inputs

---

## Component Catalog (18 Components)

### Tier 1: Visual Enhancement (No State)

These wrap existing content to make it visually distinct. No JavaScript state, no persistence.

#### InsightCard

Highlighted callout box for key principles and warnings.

```mdx
<InsightCard icon="💡" title="The Core Principle">

Your insight content here. Supports **markdown** inside.

</InsightCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | string | `"💡"` | Emoji icon displayed in header |
| `title` | string | required | Header text |
| `children` | ReactNode | required | Content (supports markdown) |

**Styling:** Primary-colored left border (`border-l-4 border-primary-500`), light primary background, subtle hover lift.

---

#### ExampleCard

Case study container with floating label badge.

```mdx
<ExampleCard label="Case Study: Drift's Category Creation">

**The Pivot:** Drift repositioned from "Live Chat Widget" to "Conversational Marketing"...

</ExampleCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | `"Real-World Example"` | Badge text above card |
| `children` | ReactNode | required | Case study content |

**Styling:** Gray background, absolute-positioned label badge with uppercase tracking.

---

#### StepCard

Numbered step in a sequence. Use multiple in order for process flows.

```mdx
<StepCard number={1} title="Define Your Target">

Describe exactly who you're building for...

</StepCard>

<StepCard number={2} title="Validate the Pain">

Talk to 5 people in that segment...

</StepCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `number` | number | required | Step number (displayed in circle) |
| `title` | string | required | Step heading |
| `children` | ReactNode | required | Step content |

**Styling:** Primary-colored number circle on left, content on right.

---

#### TakeawayBox

Summary box for end-of-lesson key takeaways. Emerald/green color scheme.

```mdx
<TakeawayBox title="Key Takeaway">

*   **Don't start with TAM.** Start with a Beachhead.
*   **Golden Segment = Pain + Access + Right-to-Win.**
*   **Score > 24.** If it's lower, you're fighting gravity.

</TakeawayBox>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `"Key Takeaway"` | Header text |
| `children` | ReactNode | required | Summary content |

**Styling:** Emerald left border (`border-l-4 border-emerald-500`), emerald background tint.

---

### Tier 2: Interactive (Client State, No Persistence)

These have JavaScript interactivity but reset on page reload.

#### FlipCard

Click-to-reveal card with 3D flip animation. Great for "question on front, answer on back" patterns.

```mdx
<FlipCard
  front="Why does Vertical segmentation beat Horizontal?"
  back="Three reasons: (1) Maximum Credibility, (2) Referrals stay within verticals, (3) Similar Tech Stacks."
  frontIcon="📐"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `front` | string | required | Front-side text |
| `back` | string | required | Back-side text (revealed on click) |
| `frontIcon` | string | none | Emoji displayed on front |

**Interactivity:** Click or keyboard (Enter/Space) to flip. CSS 3D transforms with `perspective: 1000px`.

---

#### SlideNavigation + Slide

Multi-slide navigation with progress bar and dot indicators. Good for multi-step frameworks.

```mdx
<SlideNavigation>
<Slide title="Step 1: Win the Head Pin">

Focus all resources on your Golden Segment...

</Slide>
<Slide title="Step 2: Knock Down Adjacent Pins">

Use social proof from Step 1 to expand...

</Slide>
<Slide title="Step 3: Expand the Platform">

Now you have case studies from two verticals...

</Slide>
</SlideNavigation>
```

**SlideNavigation Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | `<Slide>` children |
| `showDots` | boolean | `true` | Show dot navigation |

**Slide Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | none | Slide heading |
| `children` | ReactNode | required | Slide content |

**Interactivity:** Previous/Next buttons, dot navigation, arrow key support (Left/Right).

---

#### EnhancedAccordion

Collapsible section with smooth height animation. Ideal for dual-context (B2B vs Creator) examples.

```mdx
<EnhancedAccordion title="B2B SaaS: Enterprise Database Tool">

*   **The Play:** Reposition from "SQL editor" to "Secure Data Operations Platform for Fintech"
*   **Why:** Category shift from $10/mo to $800/mo pricing

</EnhancedAccordion>

<EnhancedAccordion title="Creator/Coach: Productivity Course">

*   **The Play:** Reposition from "Learn Notion" to "Executive Operating System for ADHD Founders"
*   **Why:** Specificity creates authority

</EnhancedAccordion>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Accordion header |
| `children` | ReactNode | required | Collapsible content |
| `defaultOpen` | boolean | `false` | Start expanded |

**Accessibility:** `aria-expanded`, `aria-controls`, `role="region"`, unique IDs via `useId()`.

---

#### RangeSlider

Self-assessment slider. Resets on page reload (no persistence).

```mdx
<RangeSlider
  label="How specific is your current target market definition?"
  min={1}
  max={10}
  lowLabel="Everyone with a pulse"
  highLabel="Laser-focused niche"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | required | Question text |
| `min` | number | `0` | Minimum value |
| `max` | number | `10` | Maximum value |
| `step` | number | `1` | Step increment |
| `defaultValue` | number | midpoint | Initial value |
| `lowLabel` | string | none | Label at min end |
| `highLabel` | string | none | Label at max end |

---

### Tier 3: Persistent (localStorage)

These save progress across page reloads via localStorage.

#### InteractiveChecklist

Checkbox list that persists checked state. Use for practice exercise tracking.

```mdx
<InteractiveChecklist
  title="Niche Strategy Audit"
  persistKey="lesson-1-niche-checklist"
  items={[
    "Have I defined my market so broadly that my message is diluted?",
    "If I could only sell to 10 customers, which group would be easiest?",
    "Am I listening to 'Bad Fit' customers pulling my product off track?",
    "Does my positioning make me sound like a commodity or a specialist?"
  ]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | none | Checklist header |
| `items` | string[] | required | Checkbox labels |
| `persistKey` | string | none | localStorage key (`checklist-{persistKey}`) |

**Storage:** `checklist-{persistKey}` = JSON array of checked indices (e.g., `[0, 2, 3]`).
**UI:** Progress bar, completion counter, strikethrough on checked items.

---

#### AssessmentEngine + LikertScale + ScenarioQuiz

Composite assessment system. Wraps LikertScale and ScenarioQuiz children, calculates aggregate score, provides tiered feedback.

```mdx
<AssessmentEngine
  title="Positioning Readiness Assessment"
  persistKey="course2-lesson1-assessment"
  scoringFeedback={[
    { min: 0, max: 10, label: "Needs Work", message: "Review the core concepts..." },
    { min: 11, max: 20, label: "Getting There", message: "You have the basics..." },
    { min: 21, max: 30, label: "Strong", message: "You're ready to execute..." }
  ]}
>

<LikertScale question="I can explain my product's value in one sentence" />

<LikertScale question="I know exactly who my ideal customer is" scale={7} />

<ScenarioQuiz
  question="Which positioning statement is strongest?"
  options={[
    { id: "a", text: "We help companies save time." },
    { id: "b", text: "We help SEO agencies automate client reporting." },
    { id: "c", text: "We are an AI-powered platform." }
  ]}
  correctId="b"
  explanation="Specificity signals authority and resonates with the target."
/>

</AssessmentEngine>
```

**AssessmentEngine Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Assessment header |
| `children` | ReactNode | required | LikertScale/ScenarioQuiz children |
| `persistKey` | string | none | localStorage key (`assessment-{persistKey}`) |
| `scoringFeedback` | ScoringFeedback[] | none | Tiered feedback based on score |

**LikertScale Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `question` | string | required | Statement to rate |
| `scale` | number | `5` | Number of points (5 or 7) |
| `labels` | string[] | auto | Custom labels per point |

**ScenarioQuiz Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `question` | string | required | Quiz question |
| `options` | {id, text}[] | required | Answer choices |
| `correctId` | string | required | Correct answer ID |
| `explanation` | string | required | Shown after selection |

**Scoring:** Likert values (1-5 or 1-7) + 5 bonus points per correct ScenarioQuiz answer.
**Storage:** `assessment-{persistKey}` = `{ submitted: boolean, score: number }`.

---

### Tier 4: Workshop Components (localStorage + Cross-Lesson)

These persist data that accumulates across multiple lessons, creating a progressive workshop experience.

#### ICPWorkshop

Progressive form that spans all 13 lessons of Course 1. Each lesson reveals new fields. By lesson 13, the founder has a complete ICP document.

```mdx
<ICPWorkshop step={3} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | number | required | Current lesson step (1-13) |

**Storage:** `icp-workshop` = full workshop data object with all fields from all steps.
**Features:**
- Progress bar (X/13 sections complete)
- Current step fields expanded, prior steps collapsed (click to review)
- "Mark Section Complete" button per step
- Step 10: Committee role editor (add up to 5 roles with title/influence/messaging)
- Step 13: "Export ICP Summary Document" button (generates .txt download)

**Data schema per step:**

| Step | Fields |
|------|--------|
| 1 | targetMarket, nicheReason |
| 2 | companySize, industry, geography, techStack |
| 3 | segments[] (synced with GoldenSegmentCalculator) |
| 4 | championTitle, championGoals, economicBuyerTitle |
| 5 | buyerMindset, riskTolerance, careerAmbition |
| 6 | triggerEvents[], timingSignals |
| 7 | disqualifiers[], antiPersonaTraits |
| 8 | tier1Criteria, tier2Criteria, tier3Criteria |
| 9 | dataSourcePrimary, dataSourceSecondary, verificationProcess |
| 10 | committeeRoles[] (title + influence + messaging) |
| 11 | compellingEvent, costOfInaction |
| 12 | validHundredCriteria, outreachChannel |
| 13 | followerPersona, wedgeProduct |

---

#### GoldenSegmentCalculator

Interactive segment scoring tool. Syncs with ICPWorkshop step 3 data.

```mdx
<GoldenSegmentCalculator />
```

No props. Reads/writes to `icp-workshop` localStorage key (segments field).

**Features:**
- Add up to 3 segments by name
- 4 scoring sliders per segment (Budget Potential, Tech Alignment, Growth Signal, Influence Potential) each 0-3
- Live total score per segment (max 12)
- Color-coded tier badges: 10-12 = Tier 1 (green), 6-9 = Tier 2 (amber), 1-5 = Tier 3 (gray), 0 = DQ (red)
- "Golden Segment" star badge on highest-scoring segment
- Side-by-side comparison bar chart

---

#### PersonaBuilder

Guided persona creation card with edit/view modes.

```mdx
<PersonaBuilder
  personaId="champion"
  title="Your Champion Persona"
  dimensions={["Title/Role", "Primary Goal", "Key Fear", "How They Evaluate Solutions", "Success Metric"]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `personaId` | string | required | Unique key (used in localStorage) |
| `title` | string | auto from personaId | Display name |
| `dimensions` | string[] | required | Field labels to fill in |

**Storage:** `persona-{personaId}` = `{ "Title/Role": "VP of Marketing", ... }`.
**Features:**
- Input field per dimension
- Progress indicator (X/Y filled)
- Switches to read-only card view when all dimensions complete
- Edit toggle to return to form mode
- Avatar with first character of first dimension value

---

### Tier 5: AI-Powered Components

#### AILessonCoach

Mini AI chat with per-lesson question limit. Uses existing `/api/ai/chat` endpoint.

```mdx
<AILessonCoach
  lessonContext="This lesson covers Golden Segment strategy, the 24-point threshold, and the Bowling Alley framework."
  courseId="course-1"
  lessonId="lesson-3"
  maxQuestions={3}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lessonContext` | string | required | Topic description sent to AI for context |
| `courseId` | string | `"course-1"` | Course identifier |
| `lessonId` | string | `"unknown"` | Lesson identifier |
| `maxQuestions` | number | `3` | Max questions per lesson |

**Storage:** `coach-{courseId}-{lessonId}` = JSON array of `{ question, answer }` objects.
**API:** `POST /api/ai/chat` with `{ message, history, context: { courseId, lessonId, sectionId } }`. Requires authentication.
**Features:**
- Collapsed by default ("Need help? Ask your AI Coach")
- Expands on click, shows prior Q&A on revisit
- Remaining question counter
- Loading spinner during API call
- Error handling with retry messaging

---

#### PersonalizedExample

Founder-context-aware example that adapts to the user's industry and target roles.

```mdx
<PersonalizedExample generic="If you're selling to [buyer role] in [industry], the pain of [pain point] is costing them real money. Your [terminology] expertise is your structural advantage.">

If you're selling to decision-makers, the pain of their key problem is costing them real money. Your domain expertise is your structural advantage.

</PersonalizedExample>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `generic` | string | none | Template with `[industry]`, `[buyer role]`, `[pain point]`, `[terminology]` placeholders |
| `children` | ReactNode | required | Fallback content when no profile exists |

**Placeholder tokens:** `[industry]`, `[buyer role]`, `[pain point]`, `[terminology]` (case-insensitive).
**Dependency:** Requires `FounderProvider` context wrapping the page (provides `getPersonalizedExample()` function).
**Behavior:**
- If profile exists and placeholders resolve: Shows personalized text with green "Context-Aware" badge
- If no profile or unresolved placeholders: Shows amber "Setup Required" badge with link to onboarding
- Falls back to `children` content if no `generic` prop

---

## localStorage Key Reference

| Key Pattern | Component | Data Format |
|-------------|-----------|-------------|
| `checklist-{persistKey}` | InteractiveChecklist | `number[]` (checked indices) |
| `assessment-{persistKey}` | AssessmentEngine | `{ submitted: boolean, score: number }` |
| `icp-workshop` | ICPWorkshop + GoldenSegmentCalculator | Full workshop data object |
| `persona-{personaId}` | PersonaBuilder | `{ [dimension]: value }` |
| `coach-{courseId}-{lessonId}` | AILessonCoach | `{ question, answer }[]` |

---

## How to Add Components to a New Course

### Step 1: Write lesson content in Markdown

Create lesson files at `server/data/content/{track}/{course}/lesson-{N}.md` with frontmatter:

```yaml
---
title: "Lesson Title"
duration: "45 min"
track: "Track Name"
course: "Course Name"
lesson: 1
---
```

### Step 2: Insert components into the markdown

Components are used as JSX tags directly in the markdown. MDXRemote compiles them at render time.

**Important:** Content inside components (children) must be separated from the opening/closing tags by blank lines for MDX to parse markdown within them:

```mdx
<InsightCard icon="🎯" title="The Key Insight">

This content will be **parsed as markdown** because of the blank lines.

</InsightCard>
```

### Step 3: Component placement patterns

A typical enhanced lesson follows this structure:

```
# Lesson Title

[Intro text]

<InsightCard>              -- Key concept highlight
<FlipCard />               -- Concept reveal
<RangeSlider />            -- Self-assessment

## Framework Section

<SlideNavigation>          -- Multi-step framework
  <Slide>...</Slide>
</SlideNavigation>

## Case Study

<ExampleCard>              -- Wrap the case study
<PersonalizedExample>      -- Personalized variant

## Dual Context

<EnhancedAccordion>B2B</EnhancedAccordion>
<EnhancedAccordion>Creator</EnhancedAccordion>

## Practice Exercise

<StepCard number={1}>...</StepCard>
<StepCard number={2}>...</StepCard>
<InteractiveChecklist />   -- Track completion

<AILessonCoach />          -- AI coaching (before summary)

## Summary

<TakeawayBox>              -- Key takeaways

<ICPWorkshop step={N} />   -- Workshop form (if applicable)

## Quiz
```json
{ "quizId": "...", ... }
```
```

### Step 4: Register any new components

If you create course-specific components (like GoldenSegmentCalculator for Course 1), add them to `components/mdx/index.ts`:

```typescript
import NewComponent from './new-component';

export const mdxComponents = {
  // ... existing
  NewComponent,
};
```

---

## Adapting for Another Platform

To reuse this system on a different Next.js platform:

1. **Copy `components/mdx/`** — All components are self-contained with Tailwind classes
2. **Install `next-mdx-remote`** — `npm install next-mdx-remote`
3. **Set up the lesson page** — Use `MDXRemote` with the component registry
4. **Adjust color tokens** — Replace `primary-500` etc. with your design system colors
5. **Remove platform-specific components** — ICPWorkshop, GoldenSegmentCalculator are CAA-specific
6. **PersonalizedExample** — Requires a FounderContext equivalent; can be simplified to a static component
7. **AILessonCoach** — Requires an authenticated AI chat API endpoint; can be adapted to any OpenAI-backed endpoint

**Portable components (no dependencies):** InsightCard, ExampleCard, StepCard, TakeawayBox, FlipCard, SlideNavigation, EnhancedAccordion, RangeSlider, InteractiveChecklist, AssessmentEngine, LikertScale, ScenarioQuiz

**Platform-specific (needs adaptation):** AILessonCoach (needs API), PersonalizedExample (needs user context), ICPWorkshop (course-specific), GoldenSegmentCalculator (course-specific), PersonaBuilder (course-specific)
