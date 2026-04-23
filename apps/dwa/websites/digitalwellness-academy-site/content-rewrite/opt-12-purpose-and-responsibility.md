# opt-12 Purpose & Responsibility — Marketing Page Rewrite

**Source:** `site/courses/opt-12-purpose-and-responsibility.html`
**Brief:** `docs/5-pillar-refactoring/course-12-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Meta:** "Purpose reduces depression (r=-0.49)" — this figure IS in the brief (2023 meta-analysis, k=99, n=66,468). Keep, but include proper framing that this is correlational. Add context so it doesn't read as "this course reduces depression."
2. **"Evidence-based course on Viktor Frankl's logotherapy, finding life purpose, ikigai…"** — the brief is explicit that a course framed as "discover your unique purpose" risks activating *meaning-search* (associated with *worse* wellbeing) rather than *meaning-recognition*. This is the brief's most important design constraint.
3. **"Responsibility and serving others create profound mental health benefits"** — the brief flags this as context-dependent and potentially harmful (caregiving overload, perfectionism/over-responsibility as transdiagnostic risk factors, moral injury).
4. **"Combat existential crisis through service"** — overstated.

---

## New title + meta

**Title:** `Purpose, Meaning, and Contribution — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on meaning in life, Frankl's logotherapy, values-based living, and contribution. Grounded in Steger's meaning model and a 2023 meta-analysis (k=99).`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on meaning, purpose, and contribution — taught with unusual care for the research. A 2023 meta-analysis (k=99, n=66,468) found purpose in life correlated with lower depression (r = −0.49) and anxiety (r = −0.36), large effects by psychological standards. But a key finding is more subtle: *searching* for meaning (without already experiencing it) is consistently associated with *worse* wellbeing outcomes. The course is therefore scoped around meaning *recognition* and values-based action (ACT, character strengths, life review) rather than "discover your unique purpose." It covers Frankl's logotherapy, contribution and volunteering research, and the conditions under which responsibility and service genuinely support mental health — and the conditions (caregiver overload, perfectionism, moral injury) where they don't.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Purpose, Meaning, and Contribution — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on meaning in life, values-based action, Frankl's logotherapy, and contribution. Grounded in Steger's meaning model and a 2023 meta-analysis (k=99, n=66,468).",
  "courseCode": "DWA-OPT-12",
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

Removed: "discover your unique purpose" framing (design risk per brief), "responsibility creates profound benefits" as unqualified claim, "combat existential crisis" overreach.
