# dwa-008 Self-Compassion & Depression — Marketing Page Rewrite

**Source:** `site/courses/dwa-008-self-compassion-depression.html`
**Brief:** `docs/reference/course-research-prompts/13. Low Self-Esteem &amp; Self-Worth_Research Prom.md` (covers CFT/self-compassion)
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "41% reduction in self-criticism" — the brief cites meta-analytic CFT support but no specific 41% figure; strip.
2. **"Clinical Psychology Review, 2023"** — stub citation, remove.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Transform self-criticism into self-compassion using Kristin Neff's framework"** — wording is acceptable but soften "transform" and clarify this is psychoeducation, not CFT therapy.

---

## New title + meta

**Title:** `Self-Compassion for Depression — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on self-compassion, self-criticism, and shame, drawing on Kristin Neff's framework and Compassion-Focused Therapy research. Adjunct to, not replacement for, clinical care.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course on self-compassion — the three-component framework from Kristin Neff (self-kindness, common humanity, mindfulness), the CBT and schema-therapy view of how self-critical core beliefs are maintained, and the Compassion-Focused Therapy (CFT) evidence that cultivating a compassionate inner voice can reduce self-criticism and shame. The course teaches self-compassion practices at a self-help level as an adjunct to care for depression. It is not CFT itself, and it does not replace therapy for moderate-to-severe depression.

---

## Safety panel

> **This course is:** psychoeducation about self-compassion and the mechanisms of self-criticism and shame; self-help practice of compassion exercises.
>
> **This course is not:** Compassion-Focused Therapy, a treatment for severe depression or trauma-based shame, or a replacement for professional care.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Self-Compassion for Depression — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on self-compassion, self-criticism, and shame. Draws on Kristin Neff's self-compassion framework and Compassion-Focused Therapy research. Psychoeducation only.",
  "courseCode": "DWA-008",
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

Removed: fabricated 41% stat, stub citation.
