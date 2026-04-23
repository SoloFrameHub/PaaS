# dwa-012 Complex Trauma & Developmental Wounds — Marketing Page Rewrite

**Source:** `site/courses/dwa-012-complex-trauma-developmental-wounds.html`
**Brief:** `docs/reference/course-research-prompts/Trauma Recovery Course Research.md` (shared with dwa-011; covers complex trauma)
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "48% improvement in interpersonal functioning" — not sourced in the brief; strip.
2. **"Psychological Trauma, 2024"** — stub citation, remove every instance.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Address complex PTSD… using phase-based treatment and somatic approaches"** — the course cannot "address" cPTSD; it can only educate. Phase-based trauma treatment and somatic therapies are clinician-delivered. Strip any `teaches` entries implying the course delivers phase-based trauma therapy or somatic experiencing.
5. **Audience framing** — like dwa-011, ensure the page does not position this as trauma processing.

---

## New title + meta

**Title:** `Complex Trauma & Developmental Wounds — Psychoeducation | Digital Wellness Academy`

**Meta:** `A 14-lesson trauma-informed psychoeducation course on complex PTSD, developmental trauma, attachment injuries, and the phase-based treatment model. Prepares for — does not replace — professional trauma therapy.`

**OG title / description:** same.

---

## Hero paragraph

> A gentle, trauma-informed psychoeducation course on complex trauma and developmental wounds — how prolonged or repeated early adversity shapes the nervous system, attachment, and self-concept, and how complex PTSD differs from single-incident PTSD. The course covers Judith Herman's phase-based model (safety and stabilization → processing → reconnection) as a map for professional treatment, the Window of Tolerance framework, grounding and stabilization skills, and how to recognize trauma-trained clinicians. This is psychoeducation that prepares for clinical trauma therapy — it does not process traumatic memories, deliver somatic therapies, or replace professional care.

---

## Safety panel

> **This course is:** psychoeducation about complex trauma and developmental wounds; an introduction to the Window of Tolerance, grounding, and stabilization; a preparation for phase-based trauma therapy with a licensed clinician.
>
> **This course is not:** processing of traumatic memories, Somatic Experiencing, sensorimotor psychotherapy, EMDR, or a replacement for professional trauma therapy.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Complex Trauma & Developmental Wounds — A Psychoeducation Course",
  "description": "A 14-lesson trauma-informed psychoeducation course covering complex PTSD, developmental trauma, attachment injuries, and the phase-based treatment model. Psychoeducation only — does not deliver trauma therapy.",
  "courseCode": "DWA-012",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 14,
  "timeRequired": "PT7H",
  "inLanguage": "en-US"
}
```

Removed: fabricated 48% stat, "Psychological Trauma, 2024" stub citation, framing as phase-based treatment delivery.
