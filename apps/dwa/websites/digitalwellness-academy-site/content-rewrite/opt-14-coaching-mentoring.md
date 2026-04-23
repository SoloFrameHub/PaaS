# opt-14 Coaching & Mentoring — Marketing Page Rewrite

**Source:** `site/courses/opt-14-coaching-mentoring.html`
**Brief:** `docs/5-pillar-refactoring/course-14-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Coaching & Mentoring Others: Evidence-Based Mental Health Skills… by Board-Certified PMHNP" — strip PMHNP; soften "Evidence-Based Mental Health Skills" since the brief is explicit that coaching-as-symptom-change has low-certainty evidence.
2. **Meta:** "Master evidence-based coaching and mentoring skills to guide others through behavioral change" — "master" and "behavioral change" overstate; soften.
3. Schema `teaches` must not imply graduates are qualified to treat, diagnose, or substitute for clinical care.

---

## New title + meta

**Title:** `Coaching and Mentoring Others — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on coaching and peer-mentoring skills: motivational interviewing principles, the GROW model, strengths-based and solution-focused techniques, and clear non-clinical role boundaries.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on coaching and mentoring in a mental-health-growth context — scoped carefully to the non-clinical lane. The course teaches supportive listening, goal clarification, accountability structures, motivational-communication principles, strengths- and solution-focused approaches, peer-support principles, and referral skills. It also teaches what the research actually says: evidence supports peer-support and motivational-communication techniques, but the evidence for coaching as a symptom-change intervention is consistently low-certainty. Graduates are equipped to be thoughtful, ethical supports — not to treat, diagnose, or substitute for licensed psychotherapy or counseling.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Coaching and Mentoring Others — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on coaching and peer-mentoring skills: motivational-interviewing principles, the GROW model, strengths-based and solution-focused techniques, and non-clinical role boundaries.",
  "courseCode": "DWA-OPT-14",
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

Removed: PMHNP credential, "master" framing, any implication of symptom-change or treatment role.
