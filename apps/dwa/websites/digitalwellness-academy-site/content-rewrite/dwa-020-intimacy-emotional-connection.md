# dwa-020 Intimacy & Emotional Connection — Marketing Page Rewrite

**Source:** `site/courses/dwa-020-intimacy-emotional-connection.html`
**Brief:** Closest: `docs/5-pillar-refactoring/course-10-research.md` (Relationship Dynamics)
**Scope:** Marketing copy only. Course itself is live and unchanged.

> ⚠️ **No dedicated intimacy brief.** Grounded in Relationship Dynamics brief (attachment, vulnerability). Needs clinical review.

---

## Strip list

1. **Title:** "66% increase in emotional intimacy scores" — not sourced; strip.
2. **"Journal of Sex & Marital Therapy, 2023"** — stub citation, remove.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Deepen emotional and physical intimacy through vulnerability, attachment security, and evidence-based connection practices"** — acceptable language but strip any implication the course delivers sex therapy or couples therapy.

---

## New title + meta

**Title:** `Intimacy and Emotional Connection — Psychoeducation | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on emotional intimacy, vulnerability, attachment security, and the communication patterns associated with close, connected partnerships.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course on emotional intimacy — what the research says about vulnerability as a connection practice, how attachment security supports closeness, the pursuer-distancer dynamic and how insecure patterns tend to compound over time, and everyday practices (emotional attunement, bids for connection, shared meaning-making) that research links to relationship quality. The course is psychoeducation for individuals or couples who want to understand intimacy from a research-informed perspective. It is not couples therapy, sex therapy, or a replacement for professional support where deeper issues are present.

---

## Safety panel

> **This course is:** psychoeducation about emotional intimacy, vulnerability, and attachment-informed connection practices.
>
> **This course is not:** couples therapy, sex therapy, trauma-focused work for intimacy after sexual trauma, or a tool for navigating abusive relationships.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline). If you are experiencing intimate partner violence, call the National Domestic Violence Hotline at 1-800-799-7233.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Intimacy and Emotional Connection — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on emotional intimacy, vulnerability, attachment security, and connection practices in adult relationships.",
  "courseCode": "DWA-020",
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

Removed: fabricated 66% stat, "Journal of Sex & Marital Therapy, 2023" stub citation.
