# dwa-013 Grief & Loss — Marketing Page Rewrite

**Source:** `site/courses/dwa-013-grief-loss-healing-after-loss.html`
**Brief:** `docs/reference/course-research-prompts/Grief & Loss: Navigating Bereavement.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "62% reduction in prolonged grief symptoms" — not sourced in the brief; strip.
2. **"JAMA Psychiatry, 2023"** — stub citation, remove every instance.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Evidence-based bereavement support"** is acceptable, but "navigate grief through meaning reconstruction, continuing bonds, and complicated grief interventions" reads as a clinical intervention. Soften.

---

## New title + meta

**Title:** `Grief and Loss — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `A 10-lesson psychoeducation course on grief and bereavement: the Dual Process Model, continuing bonds, meaning-making, normal grief vs. Prolonged Grief Disorder, and when to seek support.`

**OG title / description:** same.

---

## Hero paragraph

> A 10-lesson psychoeducation course on grief — not as a set of stages to complete, but as a human response that moves between feeling the loss and re-engaging with daily life. The course covers Stroebe and Schut's Dual Process Model, continuing-bonds theory, meaning-making approaches to bereavement, the distinction between normal grief and Prolonged Grief Disorder (recognized in DSM-5-TR), and the risk factors and supports that matter most. Grief is a natural response, not a pathology — and this course is validation and education, not therapy for complicated grief.

---

## Safety panel

> **This course is:** psychoeducation about grief, modern grief models, and normal vs. prolonged grief reactions; an introduction to self-care during bereavement.
>
> **This course is not:** complicated-grief therapy, Prolonged Grief Disorder treatment, or a replacement for professional support — especially after traumatic, sudden, or suicide bereavement.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Grief and Loss — A Psychoeducation Course",
  "description": "A 10-lesson psychoeducation course on grief and bereavement. Covers the Dual Process Model, continuing bonds, meaning-making, and the distinction between normal grief and Prolonged Grief Disorder.",
  "courseCode": "DWA-013",
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

Removed: fabricated 62% stat, "JAMA Psychiatry, 2023" stub citation.
