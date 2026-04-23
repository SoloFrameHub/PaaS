# opt-15 Legacy Building & Wisdom Sharing — Marketing Page Rewrite

**Source:** `site/courses/opt-15-legacy-building.html`
**Brief:** `docs/5-pillar-refactoring/course-15-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Legacy Building & Wisdom Sharing: Generativity Psychology | 20-Lesson Evidence-Based Course by Board-Certified PMHNP" — strip PMHNP.
2. **Meta:** "Master Erik Erikson's generativity vs stagnation theory and life review therapy for mental health" — life review therapy is a clinical intervention; the course explains it. Strip "Master." Strip "for mental health" overreach — the brief specifically cautions against marketing language implying "all participants will become wiser, resolve life regrets, heal grief, or create measurable long-term impact."
3. Strongest evidence in the brief is for depression-focused life review / reminiscence and palliative dignity therapy — neither is what this 20-lesson online course is.

---

## New title + meta

**Title:** `Legacy, Generativity, and Wisdom Sharing — Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on generativity, life review, narrative identity, and contribution — grounded in Erikson's developmental framework and meta-analytic evidence on reminiscence interventions.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on the adult-development themes of generativity, legacy, and wisdom sharing. The strongest evidence is for structured reminiscence and life review interventions reducing depressive symptoms in older adults (meta-analytic support, particularly in clinical and at-risk groups), moderate support for meaning-in-aging and volunteering-and-contribution research, and palliative dignity-therapy evidence. The course uses Erikson's framework as a developmental lens rather than a strict stage theory, and its register is "evidence-informed practices that may support reflection, contribution, meaning, and connection." It is not life-review therapy, dignity therapy, or a clinical intervention — and it does not promise wisdom, regret resolution, or measurable legacy outcomes.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Legacy, Generativity, and Wisdom Sharing — A Psychoeducation Course",
  "description": "A 20-lesson psychoeducation course on generativity, life review, narrative identity, and contribution. Grounded in Erikson's developmental framework and meta-analytic reminiscence-intervention evidence.",
  "courseCode": "DWA-OPT-15",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 20,
  "timeRequired": "PT18H",
  "inLanguage": "en-US"
}
```

Removed: PMHNP credential, "Master" framing, "resolve life regrets / heal grief / create measurable impact" overclaims.
