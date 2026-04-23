# dwa-002 Managing Panic Attacks & Panic Disorder — Marketing Page Rewrite

**Source:** `site/courses/dwa-002-managing-panic-attacks-panic-disorder.html`
**Brief:** `docs/reference/course-research-prompts/Panic Disorder Course Research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "71% reduction in panic frequency after 8 weeks" — the brief cites SMDs from a 74-RCT network meta-analysis (guided self-help CBT SMD -0.42; 60–80% response rates for agoraphobia in vivo exposure, not panic frequency per se). No 71% figure is cited. Strip.
2. **"Behaviour Research and Therapy, 2024"** — no authors/DOI. Remove every instance.
3. **Sidebar "Key Research Finding"** card — remove entirely.
4. **Meta/hero:** "master cognitive restructuring for lasting recovery" reads as clinical treatment; soften. Course explains interoceptive exposure rather than delivering it clinically.
5. Validate schema JSON for trailing commas in `teaches`.

---

## New title + meta

**Title:** `Managing Panic Attacks & Panic Disorder — Psychoeducation | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on panic physiology, the fear-of-fear cycle, and CBT-based self-help skills. Grounded in NICE CG113 and 74-RCT network meta-analysis evidence. Adjunct to professional care.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course on how panic attacks work — the fight-or-flight physiology, the fear-of-fear cycle, and why panic sensations feel dangerous but aren't — and on the CBT-based self-help skills (diaphragmatic breathing, cognitive restructuring, a learner-paced introduction to interoceptive exposure) that show the strongest evidence across 74 randomized trials. The core message from the research is simple: panic attacks are terrifying but not dangerous. This course is a guided introduction, not a substitute for CBT with a licensed clinician or for medication assessment.

---

## Safety panel

> **This course is:** psychoeducation about panic physiology and the panic cycle; a self-help introduction to CBT-based coping skills; preparation for panic-focused CBT or pharmacotherapy if needed.
>
> **This course is not:** individual CBT for panic disorder, clinical interoceptive or in vivo exposure, medication advice, or a replacement for professional assessment.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line. If you believe you are having a medical emergency, call 911.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Managing Panic Attacks & Panic Disorder — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on panic physiology, the fear-of-fear cycle, and CBT-based self-help skills including diaphragmatic breathing and cognitive restructuring. Introduces interoceptive exposure concepts; does not deliver clinical exposure therapy.",
  "courseCode": "DWA-002",
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

Removed: fabricated 71% stat, "Behaviour Research and Therapy, 2024" stub citation.
