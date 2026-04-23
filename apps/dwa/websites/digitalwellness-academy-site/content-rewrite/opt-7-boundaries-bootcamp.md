# opt-7 Boundaries Bootcamp — Marketing Page Rewrite

**Source:** `site/courses/opt-7-boundaries-bootcamp.html`
**Brief:** `docs/5-pillar-refactoring/course-7-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Boundaries Bootcamp" — "bootcamp" framing is marketing-heavy but acceptable; keep.
2. **Meta:** "Master healthy boundary setting without guilt through evidence-based assertiveness training" — "Master" is overstated; soften. Rest is aligned with the brief.
3. **"64% reduction in resentment within 12 weeks"** — not sourced in the brief; strip.
4. **"For people-pleasers, empaths, and relationship struggles"** — "empath" is unscientific terminology; strip.
5. **"By psychiatric nurse practitioner"** — unverified; strip.
6. The brief emphasizes cultural contextualization (North American individualism ≠ universal norm) and that boundary framing can be dangerous in abusive relationships. Add safety note.

---

## New title + meta

**Title:** `Healthy Boundaries — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on assertiveness, differentiation of self, DBT interpersonal effectiveness, and values-based limit-setting. Grounded in Speed et al. 2018 and Calatrava et al. 2022 scoping review.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on boundaries, anchored in the research constructs that actually have evidence behind them: assertiveness training (described in a 2018 clinical review as "a forgotten evidence-based treatment"), Differentiation of Self from Bowen Family Systems Theory (supported by a 2022 scoping review of 295 primary studies), DBT's DEAR MAN interpersonal effectiveness skills, and ACT-style values clarification. The course teaches practical limit-setting, guilt tolerance, and value-based communication — while being honest that boundary norms vary across cultures, and that assertive-communication skills are not the right tool for coercive or abusive relationships, which require safety planning rather than better communication.

---

## Safety panel (lighter — relationship safety)

> **If you are experiencing intimate partner violence**, "better boundaries" is not the solution. Call the National Domestic Violence Hotline at 1-800-799-7233, or text START to 88788.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Healthy Boundaries — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on assertiveness, Differentiation of Self, DBT interpersonal effectiveness (DEAR MAN), and values-based limit-setting. Grounded in assertiveness and DoS meta-analytic evidence.",
  "courseCode": "DWA-OPT-07",
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

Removed: fabricated 64% stat, "empath" terminology, unverified practitioner credential, "Master" framing.
