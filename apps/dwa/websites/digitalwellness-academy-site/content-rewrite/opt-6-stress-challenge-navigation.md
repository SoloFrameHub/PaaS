# opt-6 Stress & Challenge Navigation — Marketing Page Rewrite

**Source:** `site/courses/opt-6-stress-challenge-navigation.html`
**Brief:** `docs/5-pillar-refactoring/Course-6-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Build Resilience & Master Nervous System Regulation… by Board-Certified PMHNP" — strip PMHNP attribution; soften "Master."
2. **"polyvagal theory, vagal tone training"** — the brief is explicit: Polyvagal Theory was declared "untenable" by 39 neuroscientists in 2026 and should NOT be used as scientific rationale, though the practices it inspires can be taught. Strip.
3. **"Transform chronic stress into resilience through evidence-based HPA axis regulation"** — HPA axis is real; "regulating" it through coping skills overstates. The brief notes chronic stress allostatic load is "not fully reversible" through stress-management alone.
4. **"Stress-is-enhancing mindset"** — small effect sizes only, conditional not universal per the brief.

---

## New title + meta

**Title:** `Stress and Challenge Navigation — Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on stress, resilience, and evidence-based regulation skills. Grounded in Lazarus-Folkman transactional stress model, CBT-MBSR meta-analyses, and honest framing of Polyvagal Theory's contested status.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on stress and resilience that tries to be careful about its own claims. Stress is a person-environment transaction, not just an event; acute stress is adaptive while chronic stress produces measurable allostatic load that stress-management alone cannot fully reverse. The course teaches practices with moderate-to-good evidence — slow breathing, progressive muscle relaxation, HRV-supporting skills, CBT-based reappraisal, mindfulness practices (d = 0.44–0.73 on resilience outcomes when combined) — while being honest that popular frameworks like Polyvagal Theory are scientifically contested, and that no individual-skill course can substitute for addressing structural stressors such as unsafe workplaces or chronic overload.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Stress and Challenge Navigation — A Psychoeducation Course",
  "description": "A 20-lesson psychoeducation course on stress, resilience, and evidence-based regulation skills. Grounded in the Lazarus-Folkman model, CBT-MBSR meta-analyses, and an honest appraisal of contested frameworks like Polyvagal Theory.",
  "courseCode": "DWA-OPT-06",
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

Removed: PMHNP attribution, Polyvagal Theory as scientific rationale, "master" framing.
