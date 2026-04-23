# dwa-003 Social Anxiety: Building Confidence — Marketing Page Rewrite

**Source:** `site/courses/dwa-003-social-anxiety-building-confidence.html`
**Brief:** `docs/reference/course-research-prompts/Social Anxiety Course Research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "58% reduction in LSAS social anxiety scores" — brief cites CBT effect sizes (Hedges' g = 0.74 long-term; d = 0.9–1.2 in routine practice; 47.8–73.5% showing reliable positive change). No 58% figure is cited; strip.
2. **"Clinical Psychology Review, 2023"** stub citation — remove every instance.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Master" and "graduated exposure"** as deliverables — the course explains graduated exposure, it doesn't clinically administer it.
5. Schema `teaches` — prune anything implying clinician-level delivery; fix trailing comma if present.

---

## New title + meta

**Title:** `Social Anxiety: Building Confidence — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on social anxiety, the CBT model (Clark & Wells), cognitive restructuring, attention training, and graduated exposure concepts. Adjunct to therapy, not a replacement.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course on social anxiety — why fear of judgment develops, how self-focused attention and post-event rumination keep it going, and what the evidence says about CBT, cognitive restructuring, attention training, and graduated exposure. CBT has large, durable effect sizes for social anxiety (Hedges' g = 0.74 at long-term follow-up across 25 RCTs), and this course translates those principles into a self-paced introduction. It is not a substitute for CBT with a licensed clinician, especially for clinical Social Anxiety Disorder.

---

## Safety panel

> **This course is:** psychoeducation about social anxiety and the CBT model; introductions to cognitive restructuring and attention-training skills; preparation for clinical CBT if needed.
>
> **This course is not:** individual CBT, clinician-guided exposure therapy, treatment for Social Anxiety Disorder with comorbid conditions (e.g., alcohol use disorder, depression), or a replacement for professional assessment.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Social Anxiety: Building Confidence — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on social anxiety, the CBT model, cognitive restructuring, attention training, and graduated exposure concepts. Grounded in meta-analytic CBT evidence. Does not substitute for individual therapy.",
  "courseCode": "DWA-003",
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

Removed: fabricated 58% LSAS stat, "Clinical Psychology Review, 2023" stub citation.
