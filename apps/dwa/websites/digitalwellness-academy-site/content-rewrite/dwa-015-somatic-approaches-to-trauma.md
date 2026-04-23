# dwa-015 Somatic Approaches to Trauma — Marketing Page Rewrite

**Source:** `site/courses/dwa-015-somatic-approaches-to-trauma.html`
**Brief:** `docs/reference/course-research-prompts/Trauma Recovery Course Research.md` (shared with dwa-011/012; covers nervous system and Window of Tolerance); `docs/5-pillar-refactoring/Course-6-research.md` (flags Polyvagal Theory as empirically contested)
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "51% reduction in somatic symptoms" — not sourced; strip.
2. **"Journal of Traumatic Stress, 2024"** — stub citation, remove.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Body-based trauma healing using Somatic Experiencing, sensorimotor psychotherapy, and polyvagal-informed approaches"** — two issues. First, SE and sensorimotor psychotherapy are clinician-delivered; the course can explain them but not deliver them. Second, Polyvagal Theory as scientific rationale has been formally challenged as "untenable" by 39 neuroscientists in a 2026 paper (per Course-6 brief). Recast.
5. **"Somatic Approaches to Trauma"** — title is defensible if reframed as psychoeducation; the course should not position itself as "body-based trauma healing."

---

## New title + meta

**Title:** `Body-Aware Approaches to Trauma — Psychoeducation | Digital Wellness Academy`

**Meta:** `A 10-lesson trauma-informed psychoeducation course on the nervous system, the Window of Tolerance, grounding skills, and a careful overview of body-aware trauma therapies. Prepares for professional care.`

**OG title / description:** same.

---

## Hero paragraph

> A 10-lesson trauma-informed psychoeducation course on how trauma lives in the body — the autonomic nervous system, the Window of Tolerance framework from Dan Siegel, and practical grounding and stabilization skills. The course also gives a careful overview of body-aware trauma therapies (Somatic Experiencing, sensorimotor psychotherapy), what the current evidence does and does not support, and why Polyvagal Theory is better treated as a useful metaphor than a settled neuroscience framework. This course is psychoeducation and skill practice at a self-help level — it is not Somatic Experiencing, sensorimotor psychotherapy, or any body-based trauma therapy, and it does not process traumatic memories.

---

## Safety panel

> **This course is:** psychoeducation about the nervous system and trauma; Window of Tolerance work; grounding and stabilization skills; orientation to body-aware trauma therapies.
>
> **This course is not:** Somatic Experiencing, sensorimotor psychotherapy, or any clinician-delivered body-based trauma therapy; it does not process traumatic memories.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Body-Aware Approaches to Trauma — A Psychoeducation Course",
  "description": "A 10-lesson trauma-informed psychoeducation course on the nervous system, the Window of Tolerance, grounding skills, and a careful overview of body-aware trauma therapies. Does not deliver somatic therapy.",
  "courseCode": "DWA-015",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 10,
  "timeRequired": "PT5H",
  "inLanguage": "en-US"
}
```

Removed: fabricated 51% stat, "Journal of Traumatic Stress, 2024" stub citation, Polyvagal Theory as unqualified scientific rationale, framing as body-based trauma healing.
