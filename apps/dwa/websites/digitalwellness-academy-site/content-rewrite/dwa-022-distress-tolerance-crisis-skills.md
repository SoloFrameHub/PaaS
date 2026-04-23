# dwa-022 Distress Tolerance & Crisis Skills — Marketing Page Rewrite

**Source:** `site/courses/dwa-022-distress-tolerance-crisis-skills.html`
**Brief:** `docs/reference/course-research-prompts/Course 12_ Emotional Dysregulation &amp; DBT Skill.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "64% reduction in crisis behaviors" — not sourced; strip.
2. **"Journal of Clinical Psychology, 2024"** — stub citation, remove every instance.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"DBT distress tolerance skills for crisis survival"** — acceptable with softening; make clear this teaches skills at a psychoeducational level.

---

## New title + meta

**Title:** `DBT Distress Tolerance and Crisis Skills — Psychoeducation | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on DBT distress tolerance: TIPP, distraction, self-soothing, radical acceptance, and getting through crises without making them worse. Adjunct to clinical care.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course introducing the distress-tolerance module from Dialectical Behavior Therapy (DBT). The course covers crisis-survival skills — TIPP (Temperature, Intense exercise, Paced breathing, Paired muscle relaxation), distraction, self-soothing with the five senses, and "improving the moment" — and the reality-acceptance skills (radical acceptance, turning the mind, willingness) used when change is not immediately possible. The aim is to get through difficult moments without making things worse. This course teaches the skills at a self-help level as an adjunct to — not a replacement for — standard DBT with a trained clinician, especially for learners with chronic suicidality, self-harm, or BPD.

---

## Safety panel

> **This course is:** psychoeducation about DBT distress-tolerance skills; self-help practice of TIPP, distraction, self-soothing, and radical acceptance.
>
> **This course is not:** standard DBT, a crisis intervention service, a treatment for chronic suicidality, self-harm, or BPD, or a replacement for professional care.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line. If you are in immediate danger, call 911.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "DBT Distress Tolerance and Crisis Skills — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on DBT distress-tolerance skills: TIPP, distraction, self-soothing, and radical acceptance. Adjunct to, not replacement for, clinical DBT.",
  "courseCode": "DWA-022",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 8,
  "timeRequired": "PT4H",
  "inLanguage": "en-US"
}
```

Removed: fabricated 64% stat, "Journal of Clinical Psychology, 2024" stub citation.
