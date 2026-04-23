# opt-9 Team Sports & Mental Health — Marketing Page Rewrite

**Source:** `site/courses/opt-9-team-sports-mental-health.html`
**Brief:** `docs/5-pillar-refactoring/course-9-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "22.3% Reduction in Poor Mental Health Days" — this specific figure is repeated throughout the page. The brief references the Eather et al. 2023 systematic review on adult team sport benefits but does not cite 22.3% as a headline outcome. Strip the specific stat from the title.
2. **"34% reduction in loneliness within 12 weeks"** — not sourced in the brief; strip.
3. **"British Journal of Sports Medicine Meta-Analysis (2023): Team Sports and Mental Health Conditions"** — verify or remove; the brief's actual flagship citation is the 2024 BMJ Noetel et al. exercise meta-analysis, and the 2023 Eather et al. 29-study adult review. Replace vague BJSM citations with sourced references.
4. Audience framing must address the brief's three critical distinctions: recreational vs. competitive sport (benefits don't extend to elite/competitive), team vs. general-sport evidence (co-varies with exercise volume), and access/inclusion gaps.

---

## New title + meta

**Title:** `Team Sports and Mental Health — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on team sports and collective physical activity for mental health. Grounded in the 2023 Eather et al. 29-study adult systematic review and the 2024 BMJ exercise meta-analysis.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on team sports and collective physical activity as part of a mental health repertoire. The evidence is real and growing: the 2023 Eather et al. systematic review of 29 adult studies found sport participation associated with better mental health and social outcomes, with team sport outperforming individual sport for adult depression, anxiety, self-esteem, and sense of belonging. The 2024 BMJ meta-analysis (Noetel et al., 218 RCTs) established exercise broadly as comparable to antidepressants and psychotherapy for depression. The course teaches the "social cure" mechanism — belonging, identity, mutual support — while being honest about the distinctions that matter: recreational and community sport (not competitive/elite), team-specific benefits (which co-vary with exercise volume), and the access and inclusion barriers that affect who can participate in the first place.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Team Sports and Mental Health — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on team sports and collective physical activity for mental health. Grounded in the 2023 Eather et al. 29-study adult review and the 2024 BMJ Noetel et al. 218-RCT exercise meta-analysis.",
  "courseCode": "DWA-OPT-09",
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

Removed: headline 22.3% stat, 34% loneliness-reduction stat, vague BJSM citation format.
