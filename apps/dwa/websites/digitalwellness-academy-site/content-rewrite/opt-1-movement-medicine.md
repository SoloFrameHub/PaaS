# opt-1 Movement Medicine — Marketing Page Rewrite

**Source:** `site/courses/opt-1-movement-medicine.html`
**Brief:** `docs/5-pillar-refactoring/Course-1-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Exercise as Mental Health Treatment" — regulatory framing (treatment ≠ education).
2. **Meta / OG:** "proven as effective as antidepressants for treating depression, anxiety, PTSD, and ADHD" — overstatement; not supported for PTSD or ADHD, and only partially supported short-term for mild-to-moderate depression with low-certainty evidence.
3. **Hero:** "proven as effective as antidepressants—without the side effects" — same.
4. **"Board-Certified PMHNP"** author attribution — unsubstantiated.
5. Specific numbers without cited source: "BDNF by up to 38%", "reduce inflammation by 20-30%", "9% vs 38% relapse from SMILE".
6. Sidebar card with Columbus OH address and phone — verify or remove.

---

## New title + meta

**Title:** `Movement Medicine — Evidence-Based Exercise Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on physical activity as an evidence-based adjunct to mental health care, grounded in the 2024 BMJ and 2026 Cochrane reviews.`

**OG title / description:** same.

---

## Hero paragraph (replaces current hero lead + long neuroscience block)

> Physical activity is one of the most consistently evidence-supported adjuncts to mental health care. This 20-lesson psychoeducation course translates the current science — including the 2024 *BMJ* network meta-analysis of 218 randomized trials and the 2026 Cochrane review — into a practical, self-paced program on modality, dose, adherence, and building a sustainable movement practice alongside professional care. It is not a substitute for medication, therapy, or clinical assessment.

That's the whole page description. Lesson list stays as-is.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Movement Medicine: Evidence-Based Exercise Psychoeducation",
  "description": "A 20-lesson psychoeducation course on physical activity as an evidence-based adjunct to mental health care. Grounded in the 2024 BMJ network meta-analysis and 2026 Cochrane review.",
  "courseCode": "DWA-OPT-01",
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

Removed from current schema: "PTSD", "ADHD", "as effective as antidepressants", "Natural mental health treatment" audience, SMILE-specific description claims.
