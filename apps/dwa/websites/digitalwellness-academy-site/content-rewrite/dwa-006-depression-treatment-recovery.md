# dwa-006 Depression: Understanding and Recovery — Marketing Page Rewrite

**Source:** `site/courses/dwa-006-depression-treatment-recovery.html`
**Brief:** `docs/reference/course-research-prompts/Depression Course Research Package.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Depression Treatment & Recovery | 52% reduction in PHQ-9 depression scores" — "treatment" framing mischaracterizes psychoeducation; brief explicitly maintains boundaries between education and treatment. The 52% figure isn't sourced in the brief (which reports self-guided intervention g = 0.53, BA g = 0.87, exercise SMD -0.12 — all different metrics). Strip the stat.
2. **"American Journal of Psychiatry, 2023"** — stub citation, remove every instance.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Evidence-based strategies for depression using behavioral activation, cognitive restructuring…"** — soften "using" to psychoeducation about these approaches at self-help level.

---

## New title + meta

**Title:** `Depression — Understanding and Recovery Psychoeducation | Digital Wellness Academy`

**Meta:** `A 10-lesson psychoeducation course on depression: behavioral activation, cognitive skills, and lifestyle factors. Aligned with CANMAT 2023 and NICE 2022 guidelines. Adjunct to, not replacement for, clinical care.`

**OG title / description:** same.

---

## Hero paragraph

> A 10-lesson psychoeducation course on depression — how it feels, how it's maintained by withdrawal and inactivity, and what the evidence actually says about behavioral activation (effect size g ≈ 0.87 vs. controls), cognitive skills, and lifestyle factors including exercise, diet, and sleep. Aligned with the CANMAT 2023 and NICE 2022 stepped-care guidelines, which recommend guided self-help and lifestyle interventions as first-line support for mild-to-moderate depression. This course is an adjunct to, not a replacement for, psychotherapy, medication, or professional assessment — particularly for moderate-to-severe depression.

---

## Safety panel

> **This course is:** psychoeducation about depression and the behavioral/cognitive model; self-help practice of behavioral activation and basic cognitive skills; orientation to the professional treatment options in current guidelines.
>
> **This course is not:** individual CBT or IPT, medication advice, a treatment for severe or suicidal depression, or a replacement for clinical assessment.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Depression — Understanding and Recovery: A Psychoeducation Course",
  "description": "A 10-lesson psychoeducation course on depression, behavioral activation, cognitive skills, and evidence-based lifestyle interventions. Grounded in CANMAT 2023 and NICE 2022 stepped-care guidelines.",
  "courseCode": "DWA-006",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 10,
  "timeRequired": "PT5H",
  "inLanguage": "en-US"
}
```

Removed: fabricated 52% PHQ-9 stat, "American Journal of Psychiatry, 2023" stub citation, "Treatment & Recovery" framing.
