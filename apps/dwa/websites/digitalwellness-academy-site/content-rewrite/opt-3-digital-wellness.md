# opt-3 Digital Wellness — Marketing Page Rewrite

**Source:** `site/courses/opt-3-digital-wellness.html`
**Brief:** `docs/5-pillar-refactoring/course-3-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Screen Addiction, Social Media Anxiety & Dopamine Regulation" — these are partially contested terms. "Screen addiction" is not a formally recognized DSM diagnosis; "dopamine regulation" as marketing language oversimplifies neuroscience. The brief explicitly flags these framings.
2. **Meta/hero:** "Break smartphone addiction… regulate dopamine" — overstated. Recast.
3. Any unsourced numerical claims.

---

## New title + meta

**Title:** `Digital Wellness — Psychoeducation for Healthy Technology Habits | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on technology and mental health: what the evidence actually supports, intentional vs. passive use, sleep and blue light, cyberbullying, and sustainable habits.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on technology and mental health that sticks to what the evidence actually supports. Compulsive or problematic use patterns, nighttime screen exposure and sleep disruption, cyberbullying, and upward social comparison on image-based platforms have solid evidence bases. Popular framings like "screen addiction," "dopamine detox," and strict time-limit thresholds are less well-supported than the wellness industry suggests — effect sizes in general-population samples are typically small, and quality of engagement matters more than quantity (a 2026 study of 842 adults found intentional, goal-directed use predicted better attentional control and wellbeing independent of total screen time). The course teaches the difference, with honest framing throughout.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Digital Wellness — Psychoeducation for Healthy Technology Habits",
  "description": "A 20-lesson psychoeducation course on technology and mental health. Covers compulsive-use patterns, sleep and blue light, cyberbullying, social comparison, and intentional technology use — with honest framing about where the evidence is strong and where it is contested.",
  "courseCode": "DWA-OPT-03",
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

Removed: "screen addiction" and "dopamine regulation" as unqualified framings, unsourced numeric claims.
