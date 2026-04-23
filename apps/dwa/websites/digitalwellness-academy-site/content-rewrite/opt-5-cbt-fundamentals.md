# opt-5 CBT Fundamentals — Marketing Page Rewrite

**Source:** `site/courses/opt-5-cbt-fundamentals.html`
**Brief:** `docs/5-pillar-refactoring/Course-5-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Meta:** "Master cognitive behavioral therapy techniques proven as effective as medication for treating depression and anxiety" — the brief is explicit that the course is psychoeducation, not CBT delivery, and that several serious conditions (OCD, severe/suicidal depression, active trauma, psychosis, anorexia, personality disorders) are outside safe self-guided course scope. Strip "as effective as medication" / "Master" / "treating."
2. **"Rewiring Thoughts"** — the brief specifically flags this phrase as oversimplifying neuroplasticity. Strip.
3. **"Exposure therapy"** as a deliverable — outside safe self-guided scope per the brief. The course can explain exposure, not deliver it.
4. **"Board-Certified PMHNP"** — unverified attribution.

---

## New title + meta

**Title:** `CBT Fundamentals — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on cognitive behavioral therapy: the cognitive model, thought monitoring, behavioral activation, and problem solving. Adjunct to, not replacement for, clinical CBT.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on Cognitive Behavioral Therapy (CBT) — the most extensively researched psychological intervention in clinical science. The course covers the cognitive model (how thoughts, feelings, behaviors, and physical sensations interact), thought monitoring and common cognitive distortions, basic cognitive restructuring, behavioral activation, structured problem-solving, worry management, and relapse-prevention planning. The course is scoped for learners with mild-to-moderate symptoms as an adjunct to — not a replacement for — clinical CBT. Trauma processing, OCD-specific exposure, safety planning, and medication decisions are outside scope and require a trained clinician.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "CBT Fundamentals — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on cognitive behavioral therapy. Covers the cognitive model, thought monitoring, cognitive distortions, behavioral activation, and problem solving. Adjunct to, not replacement for, clinical CBT.",
  "courseCode": "DWA-OPT-05",
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

Removed: "Rewiring Thoughts" framing, "as effective as medication" overstatement, exposure therapy as deliverable, "Board-Certified PMHNP" attribution.
