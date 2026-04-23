# opt-16 Recreational Therapy — Marketing Page Rewrite

**Source:** `site/courses/opt-16-recreational-therapy.html`
**Brief:** `docs/5-pillar-refactoring/course-16-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Recreational Therapy: The Science of Play as Mental Health Medicine | 20-Lesson Evidence-Based Course by Board-Certified PMHNP" — strip PMHNP. The brief is explicit that "mental health medicine" / "powerful medicine" framing is scientifically imprecise. Soften.
2. **Meta:** "proven to reduce depression by 25% and improve stress management by 30%" — the 25% figure appears in hero text as well; the brief does not support this specific figure. Strip.
3. **"Stuart Brown's play research"** — Brown's work is observational/theoretical; not RCT evidence. Include as theoretical framework, not as outcome evidence.
4. **"Recreational Therapy"** as a course title implies the course itself is RT. RT is a licensed allied health profession (CTRS credential). Recast the course as psychoeducation *about* the research and play/leisure psychology.

---

## New title + meta

**Title:** `Play, Leisure, and Recreation for Mental Health — Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on the research behind play, leisure, and recreational therapy: flow state, therapeutic recreation, and adult play barriers. Not clinical recreational therapy.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on the psychology of play, leisure, and recreation as part of a mental health repertoire. The evidence is strongest for physical-activity-based recreational interventions (consistent with the broader 2024 BMJ exercise meta-analysis), moderate for recreational therapy as a licensed allied-health profession (CTRS scope, with growing but thinner RCT evidence than exercise), and weaker for informal "adult play" as a mental-health intervention per se. The course draws on Stuart Brown's observational work on play, Csikszentmihalyi's flow research, and therapeutic-recreation literature — and is honest that "play as medicine" is metaphorically compelling but not a substitute for evidence-based treatment. This is psychoeducation, not recreational therapy delivered by a licensed CTRS.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Play, Leisure, and Recreation for Mental Health — A Psychoeducation Course",
  "description": "A 20-lesson psychoeducation course on the research behind play, leisure, and therapeutic recreation. Covers flow state, leisure satisfaction, adult play barriers, and the scope of licensed recreational therapy.",
  "courseCode": "DWA-OPT-16",
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

Removed: "play as mental health medicine" framing, 25% / 30% unsourced stats, PMHNP credential.
