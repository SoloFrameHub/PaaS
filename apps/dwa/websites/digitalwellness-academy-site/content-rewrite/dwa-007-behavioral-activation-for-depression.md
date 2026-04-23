# dwa-007 Behavioral Activation for Depression — Marketing Page Rewrite

**Source:** `site/courses/dwa-007-behavioral-activation-for-depression.html`
**Brief:** `docs/reference/course-research-prompts/Depression Course Research Package.md` (shared with dwa-006, covers BA)
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Effect size d=0.78 vs. control" — the brief reports g = 0.87 for activity scheduling vs. controls (Hedges' g, not Cohen's d), so the exact figure is misreported. Strip the specific stat from the title; include the accurate effect size in the hero paragraph with proper framing.
2. **"Behavior Therapy, 2024"** — stub citation, remove.
3. **Sidebar "Key Research Finding"** card — remove; replace with hero framing.
4. **"Gold-standard behavioral intervention"** — overstatement. BA is an evidence-supported intervention, not universally designated gold-standard; softer framing fits the evidence.
5. **"Break depression cycles through activity scheduling, value-based action…"** — soften "break" to psychoeducation + skill practice.

---

## New title + meta

**Title:** `Behavioral Activation for Depression — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on behavioral activation — activity scheduling, value-based action, and momentum building — an evidence-supported first-line approach for mild-to-moderate depression.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course on behavioral activation (BA) — how depression drives withdrawal, how withdrawal deepens depression, and how structured activity scheduling, value-based action, and gradual momentum can reverse the cycle. A 16-study meta-analysis found BA produced a large effect (Hedges' g ≈ 0.87) versus controls and performed comparably to full cognitive therapy. Digital and self-guided BA shows meaningful short-to-medium-term benefit. This course teaches the underlying skills at a self-help level — it complements, but does not replace, clinical care, especially for moderate-to-severe depression.

---

## Safety panel

> **This course is:** psychoeducation about behavioral activation; self-help practice of activity scheduling, values clarification, and graded task assignment.
>
> **This course is not:** individual therapy, medication advice, a treatment for severe or suicidal depression, or a replacement for professional assessment.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Behavioral Activation for Depression — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on behavioral activation — activity scheduling, value-based action, and momentum building — for mild-to-moderate depression. Grounded in meta-analytic BA evidence (g ≈ 0.87).",
  "courseCode": "DWA-007",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 8,
  "timeRequired": "PT4H",
  "inLanguage": "en-US"
}
```

Removed: misreported d=0.78 stat (actual metric is Hedges' g), "Behavior Therapy, 2024" stub citation, "gold-standard" claim.
