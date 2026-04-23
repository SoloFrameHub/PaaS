# dwa-023 Mindfulness Fundamentals — Marketing Page Rewrite

**Source:** `site/courses/dwa-023-mindfulness-fundamentals.html`
**Brief:** ⚠️ No dedicated mindfulness brief. Adjacent: `docs/reference/course-research-prompts/Chronic Stress & Burnout Management.md` (covers MBSR), `Course 12_ Emotional Dysregulation &amp; DBT Skill.md` (DBT mindfulness).
**Scope:** Marketing copy only. Course itself is live and unchanged.

> ⚠️ **No dedicated mindfulness brief.** Grounded in the MBSR evidence from the Chronic Stress brief and DBT mindfulness from the DBT brief. Needs clinical review.

---

## Strip list

1. **Title:** "47% reduction in rumination and worry" — not sourced; strip.
2. **"Clinical Psychology Review, 2023"** — stub citation, remove.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Neuroplastic brain changes"** — language is popular-science; MBSR has reasonable brain-imaging literature but the course should not overclaim. Reframe to behavioral and subjective outcomes.

---

## New title + meta

**Title:** `Mindfulness Fundamentals — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on mindfulness: present-moment awareness, breath and body practices, and the MBSR and DBT traditions. Grounded in MBSR meta-analytic evidence.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course on mindfulness — what it is (and isn't), how present-moment awareness is cultivated through simple breath, body, and attention practices, and the two main clinical traditions the course draws on: Jon Kabat-Zinn's Mindfulness-Based Stress Reduction (MBSR), and DBT's "what" and "how" mindfulness skills with the three states of mind (Emotion Mind, Reasonable Mind, Wise Mind). MBSR has moderate-effect-size evidence for reducing perceived stress and improving emotion regulation across randomized trials. This course teaches the fundamentals at a self-paced level — it is not MBSR as delivered in the 8-week clinical program, and it is not a substitute for therapy where clinical symptoms are present.

---

## Safety panel

> **This course is:** psychoeducation and guided practice for mindfulness at a self-paced, introductory level.
>
> **This course is not:** the formal 8-week MBSR program, a treatment for clinical anxiety, depression, or trauma, or a replacement for professional care. Some trauma survivors find sustained silent meditation destabilizing — pace yourself and seek professional guidance if practice increases distress.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Mindfulness Fundamentals — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on mindfulness: present-moment awareness, breath and body practices, and the MBSR and DBT traditions. Grounded in MBSR meta-analytic evidence.",
  "courseCode": "DWA-023",
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

Removed: fabricated 47% stat, "Clinical Psychology Review, 2023" stub citation, unqualified neuroplasticity language.
