# dwa-011 Trauma & PTSD — Marketing Page Rewrite

**Source:** `site/courses/dwa-011-trauma-processing-ptsd.html`
**Brief:** `docs/reference/course-research-prompts/Trauma Recovery Course Research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Trauma Processing & PTSD | 56% reduction in PCL-5 PTSD symptoms" — "processing" contradicts the brief (this is psychoeducation, not processing); the 56% stat is not found in any citable source and the brief's actual psychoeducation meta-analysis reports SMD = −0.08.
2. **"Journal of Traumatic Stress, 2023"** — no authors, no DOI, not findable. Appears in meta, overview, sidebar card, evidence card. Remove every instance.
3. **Meta / OG / hero lead:** "Evidence-based trauma treatment using CPT, PE, and EMDR frameworks. Safe processing of traumatic memories." — the course does not deliver CPT/PE/EMDR and does not process traumatic memories. Brief is explicit.
4. **Schema `teaches`:** "Cognitive Processing Therapy (CPT)", "Prolonged Exposure fundamentals", "EMDR basics and bilateral stimulation" — these are therapist-delivered protocols, not psychoeducation deliverables. Also fix trailing comma (invalid JSON).
5. **Audience:** "Patients seeking structured, evidence-based treatment approaches" — positions psychoeducation as treatment.
6. **Sidebar "Key Research Finding" card** — entire card (the 56% claim + Journal of Traumatic Stress attribution). Remove.

---

## New title + meta

**Title:** `Understanding Trauma and PTSD — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `A gentle, trauma-informed psychoeducation course on trauma responses, the nervous system, grounding skills, and evidence-based treatment options. Prepares for — does not replace — professional trauma therapy.`

**OG title / description:** same.

**Canonical:** fix file-path mismatch (`dwa-011-trauma-processing-ptsd.html` vs `/courses/trauma-processing-ptsd/`).

---

## Hero paragraph (replaces current hero lead)

> A gentle, trauma-informed psychoeducation course on how trauma affects the nervous system, how to recognize common trauma responses (hypervigilance, avoidance, intrusive symptoms), and how to build grounding and stabilization skills. The course also explains the evidence-based professional treatments recommended by the VA/DoD 2023 and APA PTSD guidelines, so that if you decide to seek trauma therapy, you know what to look for. This is psychoeducation — it prepares you for trauma therapy, and it does not replace it.

---

## Safety panel (keep — clinically required, not optional)

This is the one additional block that needs to render on this page. It is lifted verbatim from the brief and exists to keep the marketing page aligned with the course's own safety framing.

> **This course is:** psychoeducation about trauma, the nervous system, and common responses; an introduction to grounding and stabilization; preparation for trauma therapy with a licensed clinician.
>
> **This course is not:** processing traumatic memories, reliving trauma experiences, exposure-based treatment, CPT, PE, EMDR, or a replacement for professional trauma therapy.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Understanding Trauma and PTSD — A Psychoeducation Course",
  "description": "A gentle, trauma-informed psychoeducation course covering trauma responses, the Window of Tolerance framework, grounding and stabilization skills, and an overview of evidence-based professional trauma treatments. Psychoeducation only — does not process traumatic memories.",
  "courseCode": "DWA-011",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 12,
  "timeRequired": "PT6H",
  "inLanguage": "en-US"
}
```

Removed: "Trauma Processing" name, "safe processing of traumatic memories" description, CPT/PE/EMDR as `teaches` deliverables, fabricated 56% stat. Fixed trailing comma.
