# opt-2 Workplace Mental Health — Marketing Page Rewrite

**Source:** `site/courses/opt-2-workplace-mental-health.html`
**Brief:** `docs/5-pillar-refactoring/Course-2-workplace-mental-health.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Burnout Prevention & Career Wellbeing" / "Board-Certified PMHNP" — the PMHNP author attribution is unsubstantiated. The brief is unusually blunt: individual-level wellbeing interventions (resilience training, mindfulness apps, stress classes) failed to show benefit in the 2024 Fleming et al. 46,336-worker UK study. Marketing the course as "burnout prevention" overstates what individual-level psychoeducation can deliver.
2. **Meta:** "Master workplace mental health… Treat work-related anxiety, depression, chronic stress, compassion fatigue" — strip "Treat"; strip "Master"; strip the implication that an online course treats clinical conditions.
3. Any stats that aren't in the brief's evidence matrix.
4. "Board-Certified PMHNP" and "20 interactive lessons by board-certified PMHNP" — unverified credential claim.

---

## New title + meta

**Title:** `Workplace Mental Health — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on occupational stress, burnout as a WHO-classified occupational phenomenon, and what individual-level skills can — and can't — do. Grounded in JD-R, MBI, and the 2024 Fleming et al. Oxford study.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on workplace mental health that takes the research seriously. The strongest evidence for worker wellbeing sits at the *organizational* level — workload, job control, leadership quality, and psychosocial safety climate. Individual-level "wellbeing" training has a surprisingly weak track record; a 2024 study of 46,336 UK workers (Fleming, Oxford Well-being Research Centre) found resilience training, mindfulness, and wellbeing apps did not outperform non-participation. This course teaches what *can* be responsibly learned by an individual — burnout recognition (WHO ICD-11 framework), CBT-based stress skills, boundary-setting, help-seeking literacy — alongside an honest explanation of what belongs to organizational policy and leadership, not personal coping.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Workplace Mental Health — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on occupational stress and burnout. Covers the WHO ICD-11 burnout framework, JD-R model, CBT-based stress skills, boundary-setting, and help-seeking literacy, with honest structural-literacy framing about what individual coping can and cannot address.",
  "courseCode": "DWA-OPT-02",
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

Removed: "Board-Certified PMHNP" attribution, "treatment" framing, unsourced stats.
