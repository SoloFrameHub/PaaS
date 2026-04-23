# dwa-017 Conflict Resolution in Relationships — Marketing Page Rewrite

**Source:** `site/courses/dwa-017-conflict-resolution-in-relationships.html`
**Brief:** Closest: `docs/5-pillar-refactoring/course-10-research.md` (Relationship Dynamics, covers Gottman research and IPV safety)
**Scope:** Marketing copy only. Course itself is live and unchanged.

> ⚠️ **No conflict-resolution-specific brief.** Grounded in the Relationship Dynamics brief, which covers Gottman research and emphasizes mandatory IPV screening. Needs clinical review before publishing.

---

## Strip list

1. **Title:** "73% reduction in destructive conflict patterns" — not sourced; strip.
2. **"Family Process, 2024"** — stub citation, remove.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Evidence-based conflict resolution using Gottman Method"** — Gottman Method is a couples therapy modality delivered by trained clinicians; the course teaches Gottman-informed *concepts* (Four Horsemen, repair attempts, soft start-up). Recast.
5. **Audience framing** — must exclude active intimate partner violence contexts, where "conflict skills" can be weaponized or used to blame the victim.

---

## New title + meta

**Title:** `Conflict Resolution in Relationships — Psychoeducation | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on everyday relationship conflict: the Gottman Four Horsemen, repair attempts, soft start-up, and de-escalation. Not for use in abusive relationships.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course on everyday relationship conflict — what the research shows about the communication patterns that predict relationship distress (the "Four Horsemen" from Gottman's research: criticism, contempt, defensiveness, stonewalling), how repair attempts and soft start-up work, and practical skills for de-escalation and collaborative problem-solving. This course is for healthy or struggling-but-safe relationships. It is not appropriate for relationships involving abuse, coercive control, or intimate partner violence, where communication-skills framing can cause harm by misdirecting responsibility.

---

## Safety panel

> **This course is:** psychoeducation about conflict patterns and Gottman-informed skills for everyday relationship friction.
>
> **This course is not:** couples therapy, the Gottman Method itself, or a tool for navigating abusive or coercively controlling relationships. "Better conflict skills" is not the answer in those contexts.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline). If you are experiencing intimate partner violence, call the National Domestic Violence Hotline at 1-800-799-7233.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Conflict Resolution in Relationships — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on relationship conflict patterns, the Gottman Four Horsemen, repair attempts, soft start-up, and de-escalation skills. Not appropriate for abusive relationships.",
  "courseCode": "DWA-017",
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

Removed: fabricated 73% stat, "Family Process, 2024" stub citation, framing as Gottman Method delivery.
