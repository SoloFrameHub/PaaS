# dwa-024 Building Self-Esteem & Confidence — Marketing Page Rewrite

**Source:** `site/courses/dwa-024-building-self-esteem-confidence.html`
**Brief:** `docs/reference/course-research-prompts/13. Low Self-Esteem &amp; Self-Worth_Research Prom.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "58% improvement in self-esteem measures" — not sourced in the brief; strip.
2. **"Journal of Personality and Social Psychology, 2024"** — stub citation, remove every instance.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Evidence-based strategies for building genuine self-esteem through self-compassion, values alignment, and competence development"** — acceptable if reframed as psychoeducation.

---

## New title + meta

**Title:** `Building Self-Esteem and Confidence — Psychoeducation | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on self-esteem, self-criticism, and shame. Draws on CBT, schema therapy, and Compassion-Focused Therapy research. Adjunct to, not replacement for, therapy.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course on self-esteem and self-worth — how low self-esteem is maintained by negative core beliefs ("I am unworthy"), harsh self-criticism, and safety behaviors, and what three evidence-based traditions contribute to changing these patterns: CBT (thought records and behavioral experiments), schema therapy (defectiveness/shame schema work), and Compassion-Focused Therapy (cultivating a compassionate inner voice to replace the threat-based self-critic). The course teaches the underlying concepts and self-help practices at a psychoeducational level. It is not therapy, and it is not a replacement for professional support when self-criticism is tied to clinical depression, trauma, or eating disorders.

---

## Safety panel

> **This course is:** psychoeducation about self-esteem, self-criticism, and shame, drawing on CBT, schema therapy, and Compassion-Focused Therapy.
>
> **This course is not:** therapy, a treatment for clinical depression, trauma-based shame, or eating disorders, or a replacement for professional care.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Building Self-Esteem and Confidence — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on self-esteem, self-criticism, and shame. Draws on CBT, schema therapy, and Compassion-Focused Therapy research.",
  "courseCode": "DWA-024",
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

Removed: fabricated 58% stat, "Journal of Personality and Social Psychology, 2024" stub citation.
