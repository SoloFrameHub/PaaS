# dwa-004 OCD: Exposure & Response Prevention — Marketing Page Rewrite

**Source:** `site/courses/dwa-004-ocd-exposure-response-prevention.html`
**Brief:** `docs/reference/course-research-prompts/Obsessive-compulsive disorder.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "45% reduction in Y-BOCS OCD severity" — no such figure in the brief; strip.
2. **"JAMA Psychiatry, 2023"** stub citation — remove every instance.
3. **"Master Exposure and Response Prevention (ERP) - the gold-standard treatment"** — critical issue. ERP is therapist-delivered and the brief is explicit that self-help ERP is best framed as *supplement*, not replacement, and can be harmful if self-administered without clinical scaffolding (per the CBT Fundamentals brief as well). Course must explain ERP, not deliver it.
4. **"OCD: Exposure & Response Prevention"** title implies the course *is* ERP. Rename.
5. Sidebar "Key Research Finding" card — remove.

---

## New title + meta

**Title:** `Understanding OCD and ERP — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `A 10-lesson psychoeducation course on OCD, obsessions and compulsions, ERP as the gold-standard professional treatment, and SSRI options. Prepares learners for clinician-delivered ERP — does not replace it.`

**OG title / description:** same.

---

## Hero paragraph

> A 10-lesson psychoeducation course on OCD — how obsessions and compulsions work, common themes (contamination, harm, symmetry, taboo thoughts), and why OCD is sometimes called "the doubt disease." The course explains Exposure and Response Prevention (ERP), the first-line, evidence-based psychotherapy for OCD, along with SSRI medication options, so that learners can recognize OCD patterns and engage informed, effective professional care. This course prepares for ERP with a trained clinician — it does not deliver ERP, which can be harmful if attempted without clinical scaffolding, especially for severe or complex presentations.

---

## Safety panel

> **This course is:** psychoeducation about OCD, obsessions and compulsions, and the evidence base for ERP and SSRIs; preparation for clinician-delivered ERP.
>
> **This course is not:** ERP itself, a self-administered exposure protocol, medication advice, or a replacement for professional OCD treatment. Attempting self-directed exposure without clinical support can worsen OCD for some learners.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Understanding OCD and ERP — A Psychoeducation Course",
  "description": "A 10-lesson psychoeducation course on OCD symptoms, subtypes, the cognitive model, ERP as the first-line professional treatment, and SSRI medication options. Psychoeducation only — does not deliver self-directed exposure therapy.",
  "courseCode": "DWA-004",
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

Removed: fabricated 45% Y-BOCS stat, "JAMA Psychiatry, 2023" stub citation, framing of course as delivering ERP.
