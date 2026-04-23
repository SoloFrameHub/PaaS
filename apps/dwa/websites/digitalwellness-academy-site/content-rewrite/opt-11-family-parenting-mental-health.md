# opt-11 Family & Parenting Mental Health — Marketing Page Rewrite

**Source:** `site/courses/opt-11-family-parenting-mental-health.html`
**Brief:** `docs/5-pillar-refactoring/course-11-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Evidence-Based Parenting Course… Break Generational Trauma… by board-certified PMHNP" — strip PMHNP attribution; "break generational trauma" is overstated for a psychoeducation course.
2. **Meta:** "Master evidence-based parenting strategies… break intergenerational trauma patterns" — soften "Master" and "break."
3. Schema `teaches` — prune anything implying the course delivers Triple P, Incredible Years, or clinical parenting interventions (those are structured programs delivered by trained facilitators).

---

## New title + meta

**Title:** `Family and Parenting Mental Health — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course for parents: co-regulation, emotion coaching, attachment principles, and parental burnout. Grounded in 2023 WHO Parenting Guidelines and 2024 Lancet meta-analysis.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course for parents, grounded in the 2023 WHO Guidelines on Parenting Interventions and a 2024 Lancet Child & Adolescent Health meta-analysis (25 RCTs, n=8,520). The course covers the bidirectional relationship between parental mental health and child wellbeing, modifiable parenting skills (co-regulation, emotion coaching, warm structure, consistent routines), screen-time and sleep-hygiene guidance, parental burnout prevention, and when and how to seek additional support. It is universal psychoeducation — not a structured parenting program like Triple P or Incredible Years, and not a substitute for clinical care when a child has significant mental health symptoms or when parental psychopathology is itself untreated.

---

## Safety panel (lighter — referral context)

> This course is universal parenting psychoeducation. It is not appropriate as a primary intervention for child-protection concerns, child self-harm or eating disorder symptoms, severe neurodevelopmental presentations, or untreated parental psychopathology — each requires clinical care. If you or your child is in crisis, call or text **988**.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Family and Parenting Mental Health — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course for parents on co-regulation, emotion coaching, attachment principles, and parental burnout. Grounded in the 2023 WHO Parenting Guidelines and the 2024 Lancet meta-analysis.",
  "courseCode": "DWA-OPT-11",
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

Removed: PMHNP attribution, "break generational trauma" overclaim, implication that course delivers structured parenting programs.
