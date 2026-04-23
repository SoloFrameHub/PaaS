# Platform Implementation Plan — Audit Findings
**Created:** 2026-03-25 | Based on PROVIDER-AUDIT-2026-03-25.md

---

## Overview

Seven issue categories identified in the provider audit. Several previously assumed gaps are partially or fully resolved — corrections are noted below. Work is sequenced into five phases, from no-risk quick wins through content-heavy track creation.

---

## Corrections to Audit Assumptions

Before the plan, three issues were found to be narrower than described after inspecting the actual code.

**Issue 1 (Personalization):** The academy page already has a "Recommended for You" section driven by `profile.assessment?.recommendedCourses`. Course detail pages already show a relevance banner via `buildRelevanceMessage()` and a "What's Next" card via `getNextCourseSuggestion()`. The `buildWellnessContextString()` function IS wired into `/app/api/ai/chat/route.ts`. The actual gaps are: (a) `learningStyle` and `timeCommitment` are stored but consumed nowhere in the UI, (b) the "Recommended for You" section disappears for users whose assessment ran before the recommendation engine was added, (c) `open-advisor-button.tsx` is a stub that sets `window.location.hash` — nothing listens to it, so the flyout chat CTA on the dashboard is broken.

**Issue 6 (Post-lesson dead ends):** The course complete page already shows `getNextCourseSuggestion()`. The real gap is that the last lesson page doesn't preview the next course *before* the user hits Complete — they only see it after.

**Issue 7 (Bipolar caveats):** `lesson-1.md` already has strong disclaimer language and a dedicated medication section. The gap is that lessons 2–8 have no per-lesson safety callout, and the course card in the catalog has no clinical caveat badge.

---

## Issue 1: Personalization Data Not Surfaced

**Problem:** Rich onboarding data (learning style, time commitment, symptom severity) is collected and stored but never influences what users see.

### Changes Required

| File | Change | Size |
|------|--------|------|
| `components/ai/open-advisor-button.tsx` | Replace `window.location.hash = 'advisor'` stub with `new CustomEvent('open-flyout-chat')` dispatch | S |
| `components/ai/flyout-chat.tsx` | Add `useEffect` listener for `open-flyout-chat` event; call `setIsOpen(true)` when received | S |
| `app/(default)/academy/page.tsx` | Replace `recommendedCourseIds = profile.assessment?.recommendedCourses ?? []` guard with the same padded scoring logic already used in `academy-dashboard.tsx` so the section never disappears | S |
| `app/(default)/dashboard/academy-dashboard.tsx` | Add learning style hint text on the Continue Course card when `profile.questionnaire?.learningStyle` is set; add "Try this 5-min exercise first" link for `timeCommitment === '5-10min'` users | S |
| `lib/utils/personalization.ts` *(new)* | Export `getTimeCommitmentFilter(profile)` → `'short' \| 'medium' \| 'any'` and `getLearningStyleLabel(profile)` helpers | S |

**Dependencies:** None. Can start immediately.

---

## Issue 2: Effort-to-Reward / Quick-Win Entry Points

**Problem:** Interactive tools (breathing, mindfulness timer, thought records) are buried inside lesson sequences. No standalone "try this in 5 minutes" path exists. Users are asked for sustained commitment before experiencing any value.

### Changes Required

| File | Change | Size |
|------|--------|------|
| `app/(default)/dashboard/academy-dashboard.tsx` | Add "Quick Tools" card for first-session users (0 completed lessons) with 3 deep-links: 2-min breathing exercise, 5-min mindfulness timer, thought record — each badged with time and benefit | M |
| `app/(default)/academy/page.tsx` | Add "Try Now — No Commitment" strip above the Recommended section for users with `completedCourses.length === 0` | S |
| `lib/data/curriculum.ts` | Add optional `quickWinLessons` array to relevant courses: `{ lessonId, tool, timeMinutes, tagline }` | S |
| `types/course.ts` | Add `quickWinLessons?: { lessonId: string; tool: string; timeMinutes: number; tagline: string }[]` to `Course` interface | S |

**Dependencies:** Soft dependency on Issue 5 (more tools available once specialty components are deployed to more lessons).

---

## Issue 3: Onboarding Friction — 8 Steps, No Exit Ramp

**Problem:** Users must complete all 8 steps before accessing courses. Step 7 presents 5 free-text reflection fields to someone who may be anxious or depressed. The progress bar shows "Step X of 8" making the full length immediately daunting. Symptoms alone (step 2) are sufficient to route users to courses — steps 4–7 improve personalization but are not required on day one.

### Changes Required

| File | Change | Size |
|------|--------|------|
| `app/(onboarding)/onboarding/safety/page.tsx` | After saving crisis data, if `crisisLevel === 'none' && hasThoughtsSuicide === false && hasThoughtsSelfHarm === false`, show a secondary "Skip to courses — complete your profile later" CTA that calls `completeOnboarding()` and redirects to `/academy`. Primary "Continue →" unchanged. | M |
| `app/(onboarding)/onboarding-progress.tsx` | On mobile, show "Step X of 3" for users who haven't passed step 3, reflecting the minimum required path. Steps 4–8 appear as "optional details" in a secondary label. Desktop preserves the full 8-step view. | M |
| `app/(onboarding)/onboarding/in-your-words/page.tsx` | Show only 1 prompt by default; collapse remaining 4 behind "Add another reflection" expansion. Add prominent "Skip all →" button. | M |
| `app/(onboarding)/onboarding/assessment/page.tsx` | Add banner: "You can finish setting up your profile later from your dashboard." with "Go to Dashboard now" link. | S |

> **Safety note:** The skip button on the safety page must only appear when BOTH suicidal thoughts AND self-harm thoughts are explicitly `false` — not null (unanswered) or true. The condition must be: `crisisLevel === 'none' && hasThoughtsSuicide === false && hasThoughtsSelfHarm === false`. The skip path must call the same server-save as the normal submit so crisis screening data is recorded regardless.

**Dependencies:** None. Independent of all other issues.

---

## Issue 4: Evidence Not Visible on the Surface

**Problem:** Clinical depth is buried inside lessons. Course cards show no evidence badges, no guideline references, no clinical framework labels. The value vs. free internet content is invisible at first glance.

### Changes Required

| File | Change | Size |
|------|--------|------|
| `types/course.ts` | Add `evidenceBadge?: string` and `clinicalFramework?: string` to `Course` interface | S |
| `lib/data/curriculum.ts` | Populate `evidenceBadge` and `clinicalFramework` for all ~35 courses. Examples: `anxiety-management` → `'CBT gold-standard'`; `depression-action` → `'NICE 2024'`; `sleep-insomnia` → `'CBT-I first-line'`; `bipolar-disorder` → `'IPSRT + CBT'` | M |
| `app/(default)/academy/page.tsx` | Render `evidenceBadge` as a chip on course cards in track list and Recommended section | S |
| `app/(default)/academy/[courseId]/page.tsx` | Render `evidenceBadge` and `clinicalFramework` in the course header and sidebar info block | S |
| `server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-1.md` | Add `<Callout type="warning" title="Medical Safety Note">` at top: "Always discuss changes to your diet, supplements, or medications with your healthcare provider before making them." | S |
| `server/data/content/nutrition-brain-health/food-mood-connection/lesson-1.md` | Same safety callout as above | S |

**Dependencies:** Type extension must precede `curriculum.ts` and page rendering changes.

---

## Issue 5: Specialty Interactive Components Underdeployed

**Problem:** `InteractiveBreathingExercise` and `MindfulnessTimer` are concentrated in the anxiety and sleep tracks. `BodyMap` is absent from nutrition. `ToolkitCard` was built in a git worktree but never merged to main — it has 0 uses anywhere. `wellness-education` track has no lesson files.

### Changes Required

| File | Change | Size |
|------|--------|------|
| `app/(default)/academy/components/toolkit-card.tsx` *(new)* | Port from `.claude/worktrees/priceless-jang/app/(default)/academy/components/toolkit-card.tsx` into the main components directory | S |
| `app/(default)/academy/[courseId]/[lessonId]/page.tsx` | Import and register `ToolkitCard` in the `MDXRemote` components map | S |
| `server/data/content/mood-emotional-health/depression-action/lesson-3.md` | Add `<InteractiveBreathingExercise>` and `<MindfulnessTimer>` to the behavioral activation lesson | S |
| `server/data/content/mood-emotional-health/bipolar-disorder/lesson-4.md` | Add `<MindfulnessTimer>` to the sleep/social rhythm lesson (IPSRT sleep routine timing) | S |
| `server/data/content/mood-emotional-health/emotional-dysregulation/lesson-2.md` | Add `<InteractiveBreathingExercise>` and `<MindfulnessTimer>` to the Wise Mind mindfulness module | S |
| `server/data/content/mood-emotional-health/grief-loss/lesson-4.md` | Add `<BodyMap>` to body-awareness grief lesson | S |
| `server/data/content/stress-resilience/trauma-recovery/lesson-3.md` | Add `<InteractiveBreathingExercise>` (trauma-sensitive breathing) | S |
| `server/data/content/nutrition-brain-health/gut-brain-foundations/lesson-3.md` | Add `<MindfulnessTimer>` (mindful eating practice) | S |
| `server/data/content/wellness-education/` *(new files)* | Confirm course definitions in `curriculum.ts` first, then create lesson MDX stubs | L |

> **Note on ToolkitCard localStorage:** The component stores data under `'interactive-lab-toolkit-card'`. All instances across lessons share this key intentionally — it is the user's persistent toolkit. Correct behaviour, but worth documenting.

> **Note on wellness-education track:** Confirm that course entries for this track exist in `curriculum.ts` before creating any MDX files. Creating lesson files that reference undefined courses causes `getLessonContent()` to return null and the lesson page to 404.

**Dependencies:** ToolkitCard port must complete before any MDX files can reference it. `wellness-education` content creation blocked on curriculum definition confirmation.

---

## Issue 6: Post-Lesson Dead Ends

**Problem:** When a user finishes the last lesson of a course, the next course recommendation only appears *after* hitting Complete. There is no preview before the commit.

### Changes Required

| File | Change | Size |
|------|--------|------|
| `app/(default)/academy/[courseId]/[lessonId]/page.tsx` | When `nextLesson === null`, render a "What's Next" preview block above `CompleteButton` using `getNextCourseSuggestion()` — surfaces the next recommended course before the user acts, not after | S |
| `app/(default)/academy/components/complete-button.tsx` | When `!nextLessonId`, add secondary text: "This completes the course — here's what comes next." with the next course title passed as a prop | S |

**Dependencies:** `getNextCourseSuggestion()` already implemented and working. Pure UI addition.

---

## Issue 7: Bipolar Disorder Clinical Caveats

**Problem:** `lesson-1.md` has strong disclaimer content but lessons 2–8 have none. A user who enters the course mid-way sees no reminder that this is educational content and that medication decisions require a clinician. The course card in the catalog has no visual differentiation from self-management courses.

### Changes Required

| File | Change | Size |
|------|--------|------|
| `server/data/content/mood-emotional-health/bipolar-disorder/lesson-2.md` through `lesson-8.md` (7 files) | Add standardized `<Callout type="warning" title="Educational Content — Not Medical Advice">` as the first component after the opening paragraph: *"This course provides psychoeducational information about bipolar disorder. It does not replace psychiatric care, medication management, or therapy. All medication decisions must be made with your prescribing clinician."* | S each |
| `types/course.ts` | Add `clinicalCaveat?: 'medication-required' \| 'consult-provider' \| 'none'` to `Course` interface | S |
| `lib/data/curriculum.ts` | Set `clinicalCaveat: 'medication-required'` on the `bipolar-disorder` course entry | S |
| `app/(default)/academy/page.tsx` | Render a "Clinical guidance required" badge on the course card for courses where `clinicalCaveat === 'medication-required'` | S |

**Dependencies:** Type extension must precede `curriculum.ts` and page rendering changes.

---

## Phased Execution Order

### Phase 1 — No-Risk Quick Wins (1–2 days)

Contained changes with no logic risk and immediate visible impact.

1. Fix `open-advisor-button.tsx` → `flyout-chat.tsx` custom event wiring *(Issue 1)*
2. Add "What's Next" preview block above `CompleteButton` on last lesson *(Issue 6)*
3. Add `evidenceBadge`, `clinicalFramework`, `clinicalCaveat`, and `quickWinLessons` to `types/course.ts` *(Issues 2, 4, 7 — type foundation)*
4. Populate `evidenceBadge`, `clinicalFramework`, and `clinicalCaveat` in `curriculum.ts` *(Issues 4, 7 — data, no rendering yet)*
5. Add per-lesson safety callouts to bipolar lessons 2–8 *(Issue 7 — content only)*

### Phase 2 — Rendering and UX (2–4 days)

Changes that touch rendered UI.

6. Render evidence badges on academy catalog and course detail pages *(Issue 4)*
7. Render `clinicalCaveat` badge on bipolar course card *(Issue 7)*
8. Patch academy "Recommended for You" section to use padded scoring so it never disappears *(Issue 1)*
9. Add `learningStyle` and `timeCommitment` hint text to dashboard *(Issue 1)*
10. Add safety page early exit ramp with full crisis state condition *(Issue 3)*
11. Simplify `in-your-words` to 1 visible prompt with expansion *(Issue 3)*

### Phase 3 — Interactive Content (3–5 days)

Predominantly MDX content additions and one component port.

12. Port `ToolkitCard` from worktree to main components directory and register in lesson page *(Issue 5)*
13. Add `InteractiveBreathingExercise`, `MindfulnessTimer`, `BodyMap` to targeted lessons in mood, trauma, and nutrition tracks *(Issue 5 — 8 MDX file edits)*
14. Add nutrition safety callouts to `gut-brain-foundations/lesson-1.md` and `food-mood-connection/lesson-1.md` *(Issue 4)*

### Phase 4 — Quick Win Entry Points and Onboarding Polish (2–3 days)

15. Add "Quick Tools" card to dashboard and academy page *(Issue 2)*
16. Update onboarding progress bar mobile view to show minimum 3-step path *(Issue 3)*
17. Add "Go to Dashboard now" fallback banner on assessment page *(Issue 3)*

### Phase 5 — Wellness Education Track (1–2 weeks, content-heavy)

18. Confirm `wellness-education` course definitions in `curriculum.ts`
19. Create minimum viable lesson files for the track *(Issue 5)*

---

## Dependency Map

```
types/course.ts extensions
    ├── lib/data/curriculum.ts — evidenceBadge, clinicalCaveat population
    │       └── academy/page.tsx and [courseId]/page.tsx — badge rendering
    └── lib/data/curriculum.ts — quickWinLessons population
            └── dashboard/academy-dashboard.tsx — quick tools card

ToolkitCard component port
    └── lesson page MDXRemote registration
            └── MDX lesson files that reference <ToolkitCard>

open-advisor-button.tsx CustomEvent fix
    └── flyout-chat.tsx event listener addition

wellness-education curriculum.ts confirmation
    └── wellness-education MDX lesson file creation
```

All other changes are independent of each other.
