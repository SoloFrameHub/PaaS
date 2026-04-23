# dwa-010 Seasonal Affective Disorder (SAD) — Marketing Page Rewrite

**Source:** `site/courses/dwa-010-seasonal-affective-disorder-sad.html`
**Brief:** ⚠️ No dedicated SAD brief found. Closest adjacent briefs: Depression Course Research Package.md (covers CBT for depression), Course-1-research.md (exercise evidence for depression).
**Scope:** Marketing copy only. Course itself is live and unchanged.

> ⚠️ **No matching research brief found.** Copy below is generic, guideline-aligned psychoeducation framing based on the broader depression brief. Needs clinical review before publishing. Specific light-therapy dosing claims and SAD-specific effect sizes have been stripped rather than invented.

---

## Strip list

1. **Title:** "60% response rate to light therapy" — not sourced in any available brief; strip. (Light therapy for SAD does have clinical evidence, but specific response-rate numbers should be sourced to a clinical-practice guideline like APA or CANMAT, not left unsupported.)
2. **"Journal of Affective Disorders, 2024"** — stub citation, remove every instance.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Master light therapy, CBT-SAD, behavioral activation…"** — soften. Course explains these approaches; learners should pursue light therapy only with guidance and proper devices, as there are contraindications (bipolar spectrum, retinal disease, photosensitive medications).

---

## New title + meta

**Title:** `Seasonal Affective Disorder (SAD) — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `A 6-lesson psychoeducation course on seasonal depression: seasonal patterns, light therapy (benefits and contraindications), CBT-SAD, behavioral activation, and preventive strategies. Flagged for clinical review.`

**OG title / description:** same.

---

## Hero paragraph

> A 6-lesson psychoeducation course on Seasonal Affective Disorder (SAD) — how seasonal depression differs from non-seasonal major depression, the role of reduced light exposure in fall and winter, and the main evidence-based options: bright-light therapy (with attention to contraindications including bipolar spectrum conditions and photosensitizing medications), CBT adapted for SAD (CBT-SAD), behavioral activation, and practical winter strategies like movement, social contact, and sleep routines. This course is psychoeducation — it helps learners understand SAD and engage professional care, and it is not a prescription for light therapy or medication.

---

## Safety panel

> **This course is:** psychoeducation about seasonal depression and current evidence-based approaches; preparation for professional assessment.
>
> **This course is not:** a prescription for light therapy devices or parameters, medication advice, or a replacement for clinical care — particularly for learners with bipolar disorder (light therapy can precipitate hypomania) or retinal/photosensitivity concerns.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Seasonal Affective Disorder (SAD) — A Psychoeducation Course",
  "description": "A 6-lesson psychoeducation course on seasonal depression: seasonal patterns, light therapy overview and contraindications, CBT-SAD, behavioral activation, and preventive strategies.",
  "courseCode": "DWA-010",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 6,
  "timeRequired": "PT3H",
  "inLanguage": "en-US"
}
```

Removed: 60% response-rate stat (unsourced in available briefs), "Journal of Affective Disorders, 2024" stub citation.
