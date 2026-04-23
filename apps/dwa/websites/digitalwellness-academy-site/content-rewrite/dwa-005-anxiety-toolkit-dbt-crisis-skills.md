# dwa-005 Anxiety Toolkit: DBT Crisis Skills — Marketing Page Rewrite

**Source:** `site/courses/dwa-005-anxiety-toolkit-dbt-crisis-skills.html`
**Brief:** `docs/reference/course-research-prompts/Course 12_ Emotional Dysregulation &amp; DBT Skill.md` + `anxiety-course-research-package.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "54% reduction in anxiety-related distress" — no such figure in either brief; strip.
2. **"Behavior Therapy, 2024"** stub citation — remove every instance.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Master CBT and DBT skills for… crisis intervention"** — course teaches DBT skills at a psychoeducational level; standard DBT is a multi-component therapy delivered by trained clinicians. Soften.
5. Schema — verify no trailing commas; prune any `teaches` items implying clinician-delivered DBT program.

---

## New title + meta

**Title:** `Anxiety Toolkit: DBT-Informed Crisis Skills — Psychoeducation | Digital Wellness Academy`

**Meta:** `A 15-lesson psychoeducation course on anxiety, distress tolerance, emotion regulation, and DBT-informed crisis skills (TIPP, Wise Mind). Complements, does not replace, clinical DBT.`

**OG title / description:** same.

---

## Hero paragraph

> A 15-lesson psychoeducation course that introduces DBT-informed skills for anxiety — mindfulness, distress tolerance (including the TIPP sequence: Temperature, Intense exercise, Paced breathing, Paired muscle relaxation), emotion regulation, and a working understanding of the Wise Mind framework. DBT, developed by Marsha Linehan, is a full clinical treatment with strong evidence for BPD, chronic suicidality, and emotion dysregulation across conditions; this course teaches the underlying skills at a self-help level as an adjunct to, not a replacement for, standard DBT with a trained clinician.

---

## Safety panel

> **This course is:** psychoeducation about DBT-informed skills; self-help practice of distress tolerance (TIPP), mindfulness, and basic emotion regulation concepts; a bridge to formal DBT.
>
> **This course is not:** standard DBT (which includes weekly skills group, individual therapy, phone coaching, and therapist consultation), a treatment for BPD or chronic suicidality, or a replacement for professional care.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Anxiety Toolkit: DBT-Informed Crisis Skills — A Psychoeducation Course",
  "description": "A 15-lesson psychoeducation course introducing DBT-informed skills for anxiety — mindfulness, distress tolerance (TIPP), emotion regulation, and the Wise Mind framework. Adjunct to, not replacement for, full clinical DBT.",
  "courseCode": "DWA-005",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 15,
  "timeRequired": "PT6H",
  "inLanguage": "en-US"
}
```

Removed: fabricated 54% stat, "Behavior Therapy, 2024" stub citation, framing as full DBT delivery.
