# dwa-001 Understanding & Managing Anxiety — Marketing Page Rewrite

**Source:** `site/courses/dwa-001-understanding-managing-anxiety.html`
**Brief:** `docs/reference/course-research-prompts/anxiety-course-research-package.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "63% reduction in GAD-7 anxiety scores" — the brief does not cite this number; CBT recovery rates of 50–60% are the closest grounded figure, and framing a self-guided psychoeducation course as producing a 63% clinical score reduction overstates the evidence.
2. **"Journal of Anxiety Disorders, 2023"** — no authors, DOI, or findable citation. Remove every instance (meta, hero, sidebar, evidence card).
3. **Sidebar "Key Research Finding" card** (63% + Journal of Anxiety Disorders) — remove entirely.
4. **Schema `teaches` trailing comma** (invalid JSON). Also prune "Exposure therapy fundamentals" as a deliverable — course explains it, learner doesn't self-administer clinical exposure.
5. **Meta:** "Master evidence-based CBT…" reads as treatment; soften to psychoeducation framing.

---

## New title + meta

**Title:** `Understanding & Managing Anxiety — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on anxiety, worry cycles, CBT-informed skills, and lifestyle factors, aligned with NICE CG113 and CANMAT 2024 guidelines.`

**OG title / description:** same.

---

## Hero paragraph (replaces current hero lead)

> An 8-lesson psychoeducation course on how anxiety works — the fight-or-flight response, the worry cycle, and the role of avoidance — and on the CBT-informed skills, relaxation practices, and lifestyle factors (sleep, movement, caffeine, nutrition) that mainstream clinical guidelines recommend as first-line support for mild-to-moderate anxiety. Grounded in the NICE CG113 (updated 2024) and CANMAT 2024 guidelines, this course is a self-paced introduction and an adjunct to professional care — not a replacement for therapy or medication.

---

## Safety panel

> **This course is:** psychoeducation about anxiety and the worry cycle; CBT-informed skills practice at a self-help level; an introduction to lifestyle factors that influence anxiety.
>
> **This course is not:** individual CBT, medication advice, clinical exposure therapy, or a substitute for assessment by a licensed clinician.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Understanding & Managing Anxiety — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on anxiety, the worry cycle, CBT-informed self-help skills, and evidence-based lifestyle factors. Aligned with NICE CG113 and CANMAT 2024 guidelines. Not a substitute for individual therapy or medication.",
  "courseCode": "DWA-001",
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

Removed: "63% reduction in GAD-7" framing, "Exposure therapy fundamentals" as deliverable, trailing comma in `teaches` array, unsubstantiated "Journal of Anxiety Disorders, 2023" attribution.
