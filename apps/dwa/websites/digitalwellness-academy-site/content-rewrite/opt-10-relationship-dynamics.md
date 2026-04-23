# opt-10 Relationship Dynamics — Marketing Page Rewrite

**Source:** `site/courses/opt-10-relationship-dynamics.html`
**Brief:** `docs/5-pillar-refactoring/course-10-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Attachment Theory & Healthy Relationships… by Board-Certified PMHNP" — strip PMHNP credential attribution.
2. **Meta:** "neuroscience of love" — the brief is explicit that this phrase is "largely pop-neuroscience that the current evidence cannot support as a course premise" (2023 Stanford prairie vole study directly challenged oxytocin-as-love-hormone). Strip.
3. **Attachment styles** as fixed diagnostic categories — the brief is clear these are continuous dimensions, not a labeling system for partners. Recast.
4. IPV framing must be explicit — the brief calls this the "single most important safety issue" for this course.

---

## New title + meta

**Title:** `Relationship Dynamics — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on adult relationship dynamics: attachment dimensions, Gottman research, communication, and relational repair. Not appropriate for abusive relationships.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on adult romantic relationships, grounded in the psychology and behavioral science of relationships rather than the pop-neuroscience of love. The course covers attachment anxiety and avoidance as continuous dimensions (not fixed diagnostic categories), meta-analytic findings that both dimensions predict lower relationship satisfaction over time, the Gottman research program on communication patterns associated with relationship distress, and how attachment security can shift with significant relational or therapeutic experience. The course is explicitly contraindicated in active intimate partner violence, where communication-skills framing can cause harm, and it is psychoeducation — not couples therapy.

---

## Safety panel (relationship safety)

> **If you are experiencing intimate partner violence**, "relationship skills" are not the right tool — call the National Domestic Violence Hotline at 1-800-799-7233, or text START to 88788.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Relationship Dynamics — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on adult relationships. Covers attachment anxiety and avoidance as continuous dimensions, Gottman communication research, and earned-security pathways. Not appropriate for abusive relationships.",
  "courseCode": "DWA-OPT-10",
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

Removed: PMHNP attribution, "neuroscience of love" pop-neuroscience framing, attachment-style-as-label framing.
