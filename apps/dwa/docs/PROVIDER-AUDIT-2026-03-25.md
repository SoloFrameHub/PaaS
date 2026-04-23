# Comprehensive Platform Audit — Response to Provider Feedback

**Audited:** 2026-03-25 | 24 courses, 200+ lessons, 14 research packages, full codebase

---

## What the Provider Got Right (And Why It Matters)

Autumn's feedback is valuable precisely because it reflects the authentic reaction of a provider who looked at the platform without selling themselves on it. Each point is assessed against what the code and research actually show.

---

## Part 1: "Better Than Before" — What's Actually Working

### Evidence Base: Solid

The research packages are legitimately strong. All 14 course research documents are built on 2023–2025 clinical guidelines:

- **CANMAT 2024** (depression, anxiety, ADHD)
- **NICE CG113 (updated 2024)** (anxiety, GAD, panic)
- **NHS Clinical Guidelines July 2024**

Key evidence numbers baked into the curriculum:

| Finding | Effect |
|--------|--------|
| Behavioral activation | g = 0.87 (large effect, comparable to full CBT) |
| Self-guided CBT | g = 0.53, maintained at 6–12 months |
| CBT-I for insomnia | 19 min faster sleep onset, 67% clinical improvement |
| Exercise + depression | 25% reduced risk at 150 min/week |

This is not recycled blog content. It is real clinical research translated into lesson sequences.

### Personalization Infrastructure: Built But Underutilized

The 7-step onboarding is genuinely thorough — one of the platform's strongest assets. It collects:

- 11 symptom categories with severity ratings
- Crisis screening with 988 escalation
- Learning style, time commitment, age range, life stage
- Coping history, triggers, therapy background
- 5 open-text reflection prompts

**The problem:** Much of this data is collected but never used on the academy pages. The academy shows all courses in flat order. There is no "Recommended for You" section. The sidebar "Your Learning Path" is a static label. Post-lesson, there is no smart next-step suggestion — users hit a dead end.

The personalization promise exists in the onboarding but is invisible in the course experience itself.

### Interactive Tools: Strong Where They Exist

The platform has 18+ interactive component types:

- `LikertAssessment`, `ThoughtRecord`, `TrackingLog`, `Checklist`, `LessonQuiz`
- `InteractiveBreathingExercise`, `ExposureHierarchy`, `CopingStrategyRanker`
- `MindfulnessTimer`, `FlipCard`, `ScenarioCard`, `BodyMap`

These are genuine differentiators from free internet content. A GAD-7 assessment embedded in a lesson, saved to a database, and trackable over time is not something a Wikipedia article provides.

---

## Part 2: "Hard Sell — Takes Time and Work"

This is the most actionable critique. Here is what the audit found.

### Clarification: What "Too Hard" Actually Means

Autumn's exact words were: *"Still feels like a hard sell because it takes time and work, which most people don't want to do."*

That phrasing — "takes time and work" — refers more naturally to the **courses themselves** than to the onboarding. A 24-course platform with 8 lessons per course, thought records, tracking logs, and exposure hierarchies is a significant ongoing commitment. That is the thing most people won't sustain, and that is likely what she means by "hard sell." She also noted she "didn't go through it extensively" — suggesting she may not have reached deep enough to experience the full onboarding friction at all.

This means there are two distinct problems to solve:

1. **Onboarding friction** — a legitimate technical issue (detailed below), fixable with progressive enrichment
2. **Perceived effort-to-reward ratio** — Autumn's actual criticism, which requires better surfacing of quick wins and immediate value *before* asking for sustained commitment

The second problem is harder. The research on self-guided CBT acknowledges it directly: completion rates are low across the entire category, not just this platform. The solution is positioning and experience design — making the return on 15 minutes of effort visible before asking for 4–5 hours.

---

### Root Cause 1: Onboarding Preference Data Not Honored

The onboarding collects `timeCommitment` (5–10 min, 15–20 min, 30+ min). This value is stored in the profile but never influences content delivery. A user who said "I have 5 minutes" sees the same 8-lesson course with the same lesson lengths as someone who said "30+ minutes."

> *"Time commitment is ignored. Doesn't adjust lesson pacing. Data available: `questionnaire.timeCommitment`"*
> — ROADMAP-9.5-QUALITY.md

### Root Cause 2: No Quick-Win Entry Points

There is no "Try this in 5 minutes" path. The interactive breathing exercise, mindfulness timer, and thought record are buried in lesson sequences — not surfaced as standalone tools on the homepage or dashboard. A skeptical user with 5 minutes who hits lesson 1 of a course gets a text-heavy psychoeducation intro, not an immediate experience of value.

### Root Cause 3: Specialty Interactive Components Are Underdeployed

A full audit of all 217 lesson files confirms that all five content tracks now have extensive interactive components. The earlier roadmap assessment ("11 bare courses") was written before enrichment work was completed and is no longer accurate.

Current component deployment across all tracks:

| Component | Total Instances | Tracks |
|-----------|----------------|--------|
| FlipCard | 275 | All 5 |
| EnhancedAccordion | 201 | 4/5 |
| InteractiveScenario | 189 | All 5 |
| InsightGrid | 189 | All 5 |
| SlideNavigation | 141 | All 5 |
| BodyMap | 9 | 3/5 |
| InteractiveBreathingExercise | 8 | anxiety, sleep only |
| ExposureHierarchy / ExposureLog | 6 | anxiety only |
| ToolkitCard | **0** | not used anywhere |

The real gap is narrower: high-value specialty components (`InteractiveBreathingExercise`, `MindfulnessTimer`, `BodyMap`) are concentrated in anxiety and sleep tracks and not deployed across mood, nutrition, or stress-resilience content where they would be equally appropriate. `ToolkitCard` is built but never used in any lesson. `wellness-education` has no lesson files at all.

---

## Part 3: "Information Is Easily Found on the Internet"

This is the most strategically important piece of feedback. It reflects a perception problem, not an accuracy problem — but the platform is currently not communicating why it is different.

### What the Platform Provides That the Internet Does Not

**1. Clinical decision-support, not a literature dump**

The research packages show this clearly. The Depression research package does not just cite that "exercise helps depression" — it explains the dosing threshold (150 min/week), the mechanism (HPA axis regulation, BDNF upregulation), the interaction with antidepressant medication, and how to talk about it with patients. The internet has the fact. The platform has the protocol.

**2. Cross-silo integration**

The Precision Nutrition course integrates: omega-3 dosing in MDD, vitamin D deficiency screening, magnesium's role in anxiety, MTHFR variants and B12/folate, and SSRI drug–nutrient interactions — in one coherent framework. To assemble this from the internet, a clinician would need to search PubMed, a pharmacology database, a dietary reference handbook, and several specialist journals, then reconcile conflicting findings.

**3. Safety screening the internet actively misses**

The research packages encode safety content that generic web content underplays:

- Serotonin syndrome risk with SSRIs + 5-HTP / tryptophan / St. John's Wort
- Lithium–sodium–magnesium–inositol interactions
- MAOI–tyramine emergencies
- PHQ-9 item 9 (suicide ideation) triggering 988 escalation

This is not trivial to assemble and is legitimately protective.

**4. Evidence hierarchy handled properly**

The courses distinguish RCT-level evidence from case reports, flag where evidence is emerging vs. robust, and teach how to discuss uncertainty with patients. A Google search surfaces all levels of evidence indiscriminately.

### The Communication Problem

The platform is not *showing* any of this on the surface. A user browsing courses sees titles like "Understanding & Managing Anxiety" — which could be any blog post. There are no visible evidence badges, no "Based on NICE 2024 guidelines" markers on course cards, no "This lesson integrates 3 clinical guidelines" indicators. The clinical depth is buried inside lessons that look, on first glance, like self-help articles.

---

## Part 4: "Seemed to Make Sense, No Obvious Errors"

This is the accuracy baseline passing. Cross-referencing lesson content against research packages:

| Course | Claim | Verified Against |
|--------|-------|-----------------|
| Depression lesson 3 | Behavioral activation g = 0.87, Lewinsohn's model | Depression Research Package ✓ |
| Anxiety lessons | NICE stepped-care model | Anxiety Research Package ✓ |
| Sleep course | CBT-I: 19 min / 26 min / 67% statistics | Sleep Research Package ✓ |
| OCD lessons | ERP as gold standard | OCD Research Package ✓ |

**One area to watch:** The bipolar disorder course currently has zero interactive components and a thinner research package than anxiety and depression. Bipolar content needs stronger caveats about the platform's educational scope vs. clinical treatment, given that bipolar management involves complex medication decisions.

---

## Prioritized Action Plan

### Immediate — Address "Hard Sell" Directly

**1. Surface the personalization that already exists**
- Add a "Recommended for You" section at the top of the academy page using `assessment.recommendedCourses`
- Add "Recommended because you selected [symptom] ([severity])" badges on course cards
- Wire the existing `buildWellnessContextString()` into the flyout AI chat (built but not connected)

**2. Create a 5-minute entry path**
- Homepage or dashboard: "Try a quick exercise" — direct link to interactive breathing, grounding technique, or mindfulness timer without requiring course enrollment
- Show users value in under 5 minutes before asking for time investment

**3. Honor the time commitment preference**
- Users who selected "5–10 min" should see short lesson segments or micro-exercises surfaced first
- The data is already collected — it just needs to be used

### Medium Term — Address "Easily Found" and Lift Bare Courses

**4. Make the evidence base visible**
- Add evidence-level badges to course cards: "NICE 2024 Endorsed" / "RCT-backed"
- Add a one-line clinical framing to each course description
- Add safety callout blocks to nutrition and advanced lessons: "Drug interaction alert: If on SSRIs..."

**5. Deploy specialty components across all tracks**

The enrichment work is largely done. The remaining gap is that high-value specialty components are concentrated in anxiety and sleep:

- `InteractiveBreathingExercise` and `MindfulnessTimer` should appear in mood, stress-resilience, and nutrition tracks — breathing and mindfulness are relevant everywhere
- `BodyMap` (9 instances) should be deployed in depression, trauma, and burnout courses where somatic awareness is clinically relevant
- `ToolkitCard` is built but deployed nowhere — evaluate whether it belongs in any track
- `wellness-education` track has no lesson files and needs content

**6. Add post-lesson "next step" flow**

Currently users hit a dead end after completing a lesson or course. A simple "Based on your progress, your next recommended lesson is..." would materially change the engagement curve.

### Strategic — Differentiate for Provider Audience

**7. Position explicitly as a clinical decision-support layer**

The platform serves providers as:

- A pre-synthesized, condition-specific protocol reference — "We've translated meta-analyses into step-by-step algorithms with clear start/stop/avoid rules"
- A risk management tool with drug-interaction flags — encoded safety rules that random online articles miss
- A patient education asset with ready-to-use scripts and visuals
- A shared team framework for evidence-based wellness practice

This positioning should appear on the landing page and course descriptions — not buried in lesson content.

---

## Summary Assessment

Autumn's feedback is accurate but incomplete. The content is correct, evidence-based, and more personalized than it appears on the surface. The platform's genuine strengths — clinical research integration, cross-silo synthesis, safety screening, interactive tools — are not visible enough at first glance.

The "hard sell" and "easily found" criticisms point to the same root problem: **the value is built but not communicated, and the personalization data is collected but not surfaced.**

Fixing the five immediate items above would address both of Autumn's concerns without rewriting any existing content.

The framing for the provider audience is: this is a clinical decision-support layer, not a literature dump. That framing applies equally across the anxiety, depression, sleep, and nutrition tracks — and it is the clearest answer to why this platform is different from a Google search.
