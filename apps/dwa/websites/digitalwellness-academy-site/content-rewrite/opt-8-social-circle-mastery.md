# opt-8 Social Circle Mastery — Marketing Page Rewrite

**Source:** `site/courses/opt-8-social-circle-mastery.html`
**Brief:** `docs/5-pillar-refactoring/course-8-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Overcoming Loneliness & Building Authentic Connections" with "by PMHNP" — strip credential attribution; soften "mastery."
2. **Meta:** "Combat the loneliness epidemic with evidence-based social skills training" — acceptable; soften "combat."
3. Must explicitly scope out Social Anxiety Disorder per the brief's most critical framing error (SAD affects ~7% of U.S. adults and requires clinical treatment).
4. **"Surgeon General loneliness advisory, attachment theory, and UCLA Loneliness Scale research"** — all grounded; keep.

---

## New title + meta

**Title:** `Building Social Connection — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on loneliness, belonging, and friendship formation. Grounded in the 2023 U.S. Surgeon General's Advisory and the 280-study Lasgaard meta-analysis on loneliness reduction.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on loneliness, belonging, and building authentic social connection. The public-health case is serious: the 2023 U.S. Surgeon General's Advisory identified social disconnection as comparable in mortality risk to smoking 15 cigarettes a day, and the largest meta-analysis on loneliness reduction (Lasgaard et al., 280 studies, APA 2024) found a moderate effect (SMD = −0.50) across interventions — with the strongest leverage coming from shifting maladaptive social cognition, the same domain CBT targets. The course teaches cognitive, behavioral, and belonging-focused skills at a psychoeducational level. It is explicitly not treatment for clinical Social Anxiety Disorder, which requires CBT with a licensed clinician.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Building Social Connection — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on loneliness, belonging, and friendship formation. Grounded in the 2023 U.S. Surgeon General's Advisory and the Lasgaard et al. (280 studies) loneliness-reduction meta-analysis.",
  "courseCode": "DWA-OPT-08",
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

Removed: PMHNP credential attribution, "mastery" framing, implication that course treats clinical SAD.
