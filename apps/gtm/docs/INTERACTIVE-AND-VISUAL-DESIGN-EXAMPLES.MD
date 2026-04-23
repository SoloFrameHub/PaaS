# Interactive & Visual Design Patterns

Reference documentation for the interactive and visual techniques used across our course content. These patterns make lessons more engaging, accessible, and therapeutically effective.

---

## Interactive Components

### 1. 3D Flip Cards
**What:** Cards that rotate 180 degrees on click to reveal content on the back.
**Why:** Encourages active exploration instead of passive reading. Good for concept/definition pairs, myth-busting, and "before/after" framing.
**How:** CSS 3D transforms with `perspective: 1000px` and `rotateY(180deg)`. Keyboard accessible (Enter/Space). Each card has a front (icon + title) and back (detail text on gradient background).
**Used in:** Concept definitions, neurotransmitter facts, therapy technique summaries.

### 2. Expandable Accordions
**What:** Click-to-expand sections that reveal detailed content.
**Why:** Reduces cognitive overload by letting users control how much they see. Keeps lessons scannable while still offering depth.
**How:** JavaScript toggle with animated icon rotation (+ rotates 45 degrees to become x). ARIA `expanded`/`controls` attributes for screen readers. Single or multiple open modes.
**Used in:** FAQ sections, detailed explanations, "learn more" deep dives within lessons.

### 3. Interactive Checklists
**What:** Clickable task lists where items get checked off with visual feedback.
**Why:** Creates a sense of accomplishment and progress. Maps well to therapeutic homework assignments and action plans.
**How:** Custom checkboxes with green fill animation and a brief "Checked!" popup. ARIA `checkbox` role. Items dim slightly when completed.
**Used in:** Action plans, daily practice lists, self-care checklists, safety plans.

### 4. Range Sliders (Intensity Scales)
**What:** Draggable sliders that show a live numeric value.
**Why:** Lets users rate subjective experiences (distress, mood, sleep quality) in a way that feels natural and low-pressure.
**How:** HTML5 `<input type="range">` with custom-styled thumb (24px, primary color) and track. Live value display updates on drag.
**Used in:** SUDS ratings (Subjective Units of Distress), mood tracking, sleep quality scales, pre/post exercise assessments.

### 5. Slide Navigation (Mini-Presentations)
**What:** Multi-slide content sections with Previous/Next buttons, dot indicators, and a progress bar.
**Why:** Breaks long content into digestible chunks. Creates a guided, paced learning experience.
**How:** JavaScript slide engine with keyboard navigation (arrow keys). Dot indicators with `role="tab"`. Auto-focus management when slides change. Screen reader announcements via `aria-live`.
**Used in:** Step-by-step guides, multi-part explanations, guided exercises.

### 6. Assessment Engine (Quizzes & Scales)
**What:** Scenario-based multiple-choice questions and Likert-style rating scales with scoring and feedback.
**Why:** Self-assessment is core to therapeutic education. Gives users personalized insight into their patterns.
**How:** Data-attribute-driven initialization. Scenario challenges show correct/incorrect feedback with explanation. Rating scales use circular button options. Scores calculate and display results with category interpretation.
**Used in:** PSQI (Pittsburgh Sleep Quality Index), anxiety severity scales, movement readiness assessments, knowledge checks.

### 7. Interactive Diagrams (Click-to-Explore)
**What:** Visual diagrams where users click on elements to reveal information popups.
**Why:** Makes complex systems (brain anatomy, sleep cycles, gut-brain axis) explorable rather than just described.
**How:** Clickable elements with hover scale (1.05x) and info popups. Progress counter tracks "X / Y elements explored." Completion callback when all explored.
**Used in:** Brain chemistry diagrams, neurotransmitter pathways, sleep architecture, digestive system.

### 8. Brain Chemistry Simulator (Movement Medicine)
**What:** A dashboard showing neurotransmitter meters (serotonin, dopamine, endorphins) that respond to exercise type buttons.
**Why:** Makes the invisible visible. Users see how different exercise types affect brain chemistry in real-time.
**How:** Three meter bars that fill to different levels based on which exercise button is pressed (Cardio, Strength Training, Yoga). Live percentage displays and text feedback.
**Used in:** Movement Medicine Lesson 1 (The Brain on Exercise).

### 9. PSQI Assessment Form (Sleep Mastery)
**What:** A structured 7-component sleep quality assessment with scoring, category determination, and component breakdown visualization.
**Why:** The PSQI is a validated clinical tool. Making it interactive lets users get immediate, personalized sleep quality feedback.
**How:** Radio button groups per component, form validation, hidden results section that reveals on submit. Animated progress bars show per-component scores. Results persist in localStorage for retaking/comparison.
**Used in:** Sleep Mastery Module 1 Lesson 2.

### 10. Mood Tracker (Before/After)
**What:** Pre- and post-activity mood rating that tracks changes over time.
**Why:** Helps users see the concrete impact of exercises and lessons on their emotional state. Builds motivation through visible progress.
**How:** Dedicated `mood-tracker.js` (13KB). Captures mood before and after lesson activities. Stores data locally for trend tracking.
**Used in:** Movement Medicine lessons (before/after exercise), anxiety toolkit exercises.

---

## Visual Design Techniques

### Card System (6 Variants)
| Card Type | Purpose | Visual Treatment |
|-----------|---------|-----------------|
| **Header Card** | Lesson/module titles | Gradient background (dark to light primary), white text |
| **Intro Card** | Course introductions | Surface-tinted background, 5px left accent border |
| **Step Card** | Multi-step processes | Numbered circle (36px), hover lift (-2px + shadow) |
| **Flip Card** | Interactive concept pairs | 3D perspective, grid layout, gradient back |
| **Insight Card** | Key takeaways | Icon + small title + description, hover lift (-3px) |
| **Final Card** | Lesson completions | Green accent border, centered, larger font |

### Color Theming Per Course
Each course has its own CSS theme file that overrides the design token variables:

| Course | Theme | Primary Color | Mood |
|--------|-------|--------------|------|
| Default | `brand-blue.css` | Platform blue | Trustworthy, professional |
| Sleep Mastery | `sleep-blue.css` | `#126cbe` clinical blue | Calm, authoritative |
| Anxiety Toolkit | `calming-teal.css` | Teal | Soothing, safe |
| Nature-focused | `nature-blue.css` | Nature blue | Grounding, organic |

### Therapeutic UI Components
- **Takeaway Box:** Green-tinted background with green left border and heading. Signals "important insight to remember."
- **Example Card:** Surface background with a labeled badge. Marks real-world scenarios and case studies.
- **Analogy Card:** Subtle gradient, centered icon. Used for metaphor-based teaching (e.g., "anxiety is like a smoke alarm").
- **Breathing Guide:** 100x100px animated circle that scales from 1x to 1.2x over 6 seconds with opacity pulse. Visual anchor for guided breathing exercises.
- **Cycle/Process Diagram:** Flexbox step boxes with arrow separators. Shows loops and processes (e.g., CBT thought cycle, sleep-wake cycle).

### Animation Patterns
| Animation | Duration | Purpose |
|-----------|----------|---------|
| **Card hover lift** | 0.3s | Feedback that element is interactive |
| **Flip card rotation** | 0.6s | Reveal hidden content dramatically |
| **Accordion icon rotate** | 0.3s | Visual cue that section is opening |
| **Progress bar fill** | Variable | Show completion/scoring results |
| **Breathing circle pulse** | 6s loop | Guide breathing rhythm |
| **Fade in/up** | 0.2-0.5s | Gentle content appearance (AOS library) |
| **Float** | 6s loop | Subtle movement on hero elements |
| **Checklist feedback** | 1s | Brief confirmation then disappear |

### Scroll Animations (AOS)
The homepage and landing pages use the AOS (Animate On Scroll) library for entrance animations. Elements fade-up, fade-in, or slide into view as users scroll. This creates a polished, modern feel without being distracting.

### Responsive Design
- **768px breakpoint:** Grid layouts collapse to single column, crisis banner reflows vertically, touch targets enlarge
- **480px breakpoint:** Insight grids go single-column, simplified navigation
- **High contrast mode:** Crisis elements get black background with white borders, larger borders on interactive elements
- **Print:** Crisis banner stays visible in black/white, navigation hidden, content optimized for paper

---

## Safety & Accessibility (Built Into Every Component)

### Crisis Detection System
Every lesson page includes real-time crisis monitoring:
- **30+ keyword phrases** scanned on text input blur (e.g., "kill myself", "self-harm", "can't go on")
- **Course-specific keywords** added per domain (e.g., "starving myself" for food-mood, "insomnia killing me" for sleep)
- **< 2 second response time** from detection to showing crisis modal
- **Persistent banner** stays active across page navigation after triggering
- **Crisis modal** with direct action buttons: Call 988, Text 741741, Chat 988lifeline.org
- **Focus trapping** in crisis modal so keyboard users can't tab away from help

### Accessibility Standards
- **ARIA everywhere:** All interactive components use appropriate roles, states, and properties
- **Keyboard navigation:** Every interactive element works with Tab, Enter, Space, Arrow keys
- **Screen reader announcements:** `aria-live` regions for dynamic content changes
- **Focus management:** Auto-focus moves to relevant content on state changes
- **Skip links:** Jump past navigation to main content
- **Color contrast:** 4.5:1 minimum (7:1 for crisis elements)
- **Crisis resources:** Reachable in < 5 tab stops from any page

### Data Handling
- **localStorage:** Assessment results, lesson completion, progress tracking
- **sessionStorage:** Crisis state (volatile, per-session only)
- **No PHI in URLs or logs:** Sensitive data stays client-side or encrypted

---

## Architecture

```
shared/
  css/
    variables.css          -- Design tokens (colors, spacing, typography, shadows)
    base.css               -- Reset, typography, containers
    accessibility.css      -- Focus styles, screen reader utilities
    crisis.css             -- Crisis banner, modal, action buttons
    components/
      accordion.css        -- Expandable sections
      assessment.css       -- Quizzes and rating scales
      cards.css            -- All 6 card variants + flip cards
      interactive.css      -- Sliders, checklists, diagrams
      safe-space.css       -- Therapeutic UI (takeaway, analogy, breathing)
      slide-navigation.css -- Multi-slide presentation
    themes/
      brand-blue.css       -- Default
      sleep-blue.css       -- Sleep Mastery
      calming-teal.css     -- Anxiety Toolkit
      nature-blue.css      -- Nature courses
  js/
    assessment-engine.js   -- Scenario quizzes + Likert scales
    accordion.js           -- Expand/collapse sections
    interactive-elements.js-- Flip cards, checklists, sliders, diagrams
    slide-navigation.js    -- Multi-slide presentations
    accessibility.js       -- Focus trapping, ARIA, announcements
    crisis-detection.js    -- Real-time keyword monitoring
```

Course-specific directories add their own JS on top of the shared library:
- **Anxiety Toolkit:** `fabric-utils.js` (canvas diagrams), custom crisis keywords
- **Sleep Mastery:** PSQI assessment form with localStorage persistence
- **Movement Medicine:** `lesson-template-engine.js` (41KB dynamic lesson system), `mood-tracker.js`, `forum-integration.js`, brain chemistry simulator
- **Food-Mood Connection:** Basic structure (earliest stage of development)

---

## Porting Notes for Live Platform

When converting these HTML courses to the Next.js platform's Markdown format, these interactive elements map to React components:

| This Repo (Vanilla JS) | Live Platform (React) |
|------------------------|----------------------|
| Assessment Engine | `<LikertAssessment />` |
| Checklists | `<Checklist />` |
| Mood Tracker | `<TrackingLog />` |
| (no equivalent) | `<ThoughtRecord />` |
| Range Sliders | Native or custom `<Slider />` |
| Flip Cards | New component needed |
| Brain Chemistry Simulator | New component needed |
| PSQI Form | New component needed |
| Slide Navigation | New component needed |
| Accordions | Shadcn `<Accordion />` or custom |
| Interactive Diagrams | New component needed |

The shared CSS design tokens translate to Tailwind theme configuration. The per-course color themes become Tailwind color variants or CSS custom properties.
