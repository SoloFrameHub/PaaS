# opt-18 Adventure & Outdoor Mental Health — Marketing Page Rewrite

**Source:** `site/courses/opt-18-adventure-outdoor-mental-health.html`
**Brief:** `docs/5-pillar-refactoring/course-18-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Nature Therapy & Ecotherapy… Course by Board-Certified PMHNP" — strip PMHNP credential. "Nature therapy" is loose — the brief distinguishes passive exposure, green exercise, structured nature-based interventions (NBIs), and adventure therapy. Use plainer framing.
2. **Meta:** "Master evidence-based ecotherapy and nature therapy protocols… proven to reduce stress, anxiety, and depression through adventure therapy" — the brief is explicit that "nature as trauma healer" is preliminary and mostly qualitative and "must not be presented as an evidence-based treatment pathway in a self-guided course." Evidence is strong for green exercise and attention restoration; moderate for NBIs; preliminary for trauma. Strip trauma framing.
3. **"Forest bathing (shinrin-yoku)"** is acceptable with proper scoping; the physiological evidence is moderate.

---

## New title + meta

**Title:** `Nature, Movement, and Outdoor Mental Health — Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on the research behind nature-based mental health practices: green exercise, attention restoration, forest bathing, and adventure programs. Not trauma treatment.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on nature, movement, and outdoor practices for mental health — scoped to what the evidence actually supports. Strong evidence: green exercise (outdoor physical activity), attention restoration theory, and time in nature for stress physiology. Moderate evidence: nature-based interventions (NBIs) more broadly, and adventure therapy for specific populations. Preliminary or qualitative: nature as trauma healer — a framing the course explicitly avoids, because overclaiming it can delay evidence-based trauma care. The course covers forest bathing (shinrin-yoku), green exercise, park prescriptions, and practical ways to integrate outdoor practices alongside professional care.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Nature, Movement, and Outdoor Mental Health — A Psychoeducation Course",
  "description": "A 20-lesson psychoeducation course on nature-based practices for mental health: green exercise, attention restoration, forest bathing, and adventure programs. Scoped to current evidence; not a trauma-treatment pathway.",
  "courseCode": "DWA-OPT-18",
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

Removed: PMHNP credential, "nature as healer" applied to trauma, "Master" framing.
