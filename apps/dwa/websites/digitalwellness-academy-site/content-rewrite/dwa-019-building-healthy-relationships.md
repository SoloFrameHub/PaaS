# dwa-019 Building Healthy Relationships — Marketing Page Rewrite

**Source:** `site/courses/dwa-019-building-healthy-relationships.html`
**Brief:** Closest: `docs/5-pillar-refactoring/course-10-research.md` (Relationship Dynamics)
**Scope:** Marketing copy only. Course itself is live and unchanged.

> ⚠️ **No exact match.** Grounded in the Relationship Dynamics brief (attachment theory, Gottman research, IPV safety). Needs clinical review.

---

## Strip list

1. **Title:** "71% sustained relationship improvements at 1 year" — not sourced; strip.
2. **"Personal Relationships, 2024"** — stub citation, remove.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Foundations of healthy relationships: secure attachment…"** — acceptable if framed as psychoeducation; strip anything that implies the course delivers EFT or couples therapy.
5. Must include IPV safety note.

---

## New title + meta

**Title:** `Building Healthy Relationships — Psychoeducation Course | Digital Wellness Academy`

**Meta:** `A 10-lesson psychoeducation course on healthy relationship foundations: attachment security, communication, trust, and mutual respect. Grounded in attachment meta-analytic and Gottman research.`

**OG title / description:** same.

---

## Hero paragraph

> A 10-lesson psychoeducation course on the foundations of healthy relationships — attachment security as a dynamic rather than fixed quality, communication patterns associated with relationship satisfaction (drawn from Gottman's longitudinal research), trust-building, repair after rupture, and the role of values and mutual respect. The course draws on attachment meta-analytic evidence (132 studies showing both anxiety and avoidance predict lower satisfaction over time) and the Gottman research program. This is psychoeducation and self-reflection — it is not couples therapy, and it is not appropriate for abusive or coercively controlling relationships.

---

## Safety panel

> **This course is:** psychoeducation about healthy-relationship foundations and evidence-informed communication patterns.
>
> **This course is not:** couples therapy, Emotionally Focused Therapy, the Gottman Method, or a tool for navigating abusive or coercively controlling relationships.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline). If you are experiencing intimate partner violence, call the National Domestic Violence Hotline at 1-800-799-7233.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Building Healthy Relationships — A Psychoeducation Course",
  "description": "A 10-lesson psychoeducation course on healthy-relationship foundations — attachment security, communication, trust, and mutual respect. Grounded in attachment meta-analytic and Gottman research.",
  "courseCode": "DWA-019",
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

Removed: fabricated 71% stat, "Personal Relationships, 2024" stub citation.
