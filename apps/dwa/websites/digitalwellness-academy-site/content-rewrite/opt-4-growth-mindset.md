# opt-4 Growth Mindset — Marketing Page Rewrite

**Source:** `site/courses/opt-4-growth-mindset.html`
**Brief:** `docs/5-pillar-refactoring/course-4-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Meta:** "Transform your relationship with challenges through Carol Dweck's research-backed growth mindset training… achieve a 36% depression reduction through 20 evidence-based lessons" — the brief is explicit: academic-achievement intervention evidence is "weak to modest and likely inflated by publication bias," while correlational evidence with distress is moderate (r = −0.22 to −0.25). A 36% depression-reduction claim isn't supported. Strip.
2. **"Master neuroplasticity, overcome limiting beliefs, build resilience, and achieve a 36% depression reduction"** — multiple overstatements. Growth mindset is conflated with neuroplasticity, grit, self-efficacy, psychological flexibility, self-compassion, and resilience — the brief explicitly separates these.
3. **"Stress-is-enhancing mindset"** — limited evidence in its own right; reframe.

---

## New title + meta

**Title:** `The Growth Mindset — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on Carol Dweck's growth mindset research, what the evidence supports and what it doesn't, and adjacent constructs (self-efficacy, psychological flexibility, self-compassion) with stronger clinical evidence.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on growth mindset — taught honestly. Carol Dweck's research shows a moderate correlational association between growth mindset and lower psychological distress (r = −0.22 to −0.25), and single-session growth-mindset interventions have genuine promise in at-risk adolescent mental health. But the academic-achievement intervention evidence is weaker than popular framings suggest, and growth mindset is often conflated with grit, self-efficacy, psychological flexibility, and self-compassion — each of which has its own, sometimes stronger, evidence base. This course teaches the construct with care, distinguishes it from adjacent concepts, and avoids the toxic-positivity and structural-attribution pitfalls that well-designed growth-mindset education explicitly warns against.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "The Growth Mindset — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on growth mindset research and adjacent constructs (self-efficacy, psychological flexibility, self-compassion). Grounded in current meta-analytic evidence, with honest scoping of what the research supports.",
  "courseCode": "DWA-OPT-04",
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

Removed: fabricated 36% depression-reduction claim, conflation of growth mindset with neuroplasticity/grit/self-efficacy as equivalents.
