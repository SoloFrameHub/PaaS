# dwa-016 Communication Skills & Assertiveness — Marketing Page Rewrite

**Source:** `site/courses/dwa-016-communication-skills-assertiveness.html`
**Brief:** `docs/5-pillar-refactoring/course-7-research.md` (Healthy Boundaries brief, covers assertiveness as "forgotten evidence-based treatment" per Speed et al. 2018)
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "68% improvement in relationship satisfaction" — not sourced; strip.
2. **"Journal of Social and Personal Relationships, 2023"** — stub citation, remove.
3. **Sidebar "Key Research Finding"** card — remove.
4. **"Master assertive communication, active listening, and conflict resolution"** — soften "master" to a learner frame.

---

## New title + meta

**Title:** `Communication Skills and Assertiveness — Psychoeducation | Digital Wellness Academy`

**Meta:** `An 8-lesson psychoeducation course on assertive communication, active listening, and conflict basics. Grounded in assertiveness training research (Speed et al. 2018) and DBT's DEAR MAN framework.`

**OG title / description:** same.

---

## Hero paragraph

> An 8-lesson psychoeducation course on communication skills, with assertiveness training at the center. A 2018 clinical psychology review (Speed et al.) described assertiveness training as "a forgotten evidence-based treatment" — relevant across clinical populations and producing meaningful improvements in anxiety, self-esteem, and interpersonal functioning. The course teaches the three communication styles (passive, aggressive, assertive), active listening, how to express needs without guilt or aggression, and DBT's DEAR MAN framework for interpersonal effectiveness. This is psychoeducation and skill practice — it is not a substitute for therapy for clinical anxiety, trauma, or abusive relationship dynamics.

---

## Safety panel

> **This course is:** psychoeducation and skill practice for everyday communication and assertiveness; an introduction to DBT-informed interpersonal effectiveness.
>
> **This course is not:** therapy, couples counseling, or a tool for navigating abusive or coercively controlling relationships — in those contexts, "better communication" is not the solution.
>
> **If you are in crisis** or thinking about self-harm, call or text **988** (U.S. Suicide & Crisis Lifeline), or contact your local crisis line. If you are experiencing intimate partner violence, call the National Domestic Violence Hotline at 1-800-799-7233.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Communication Skills and Assertiveness — A Psychoeducation Course",
  "description": "An 8-lesson psychoeducation course on assertive communication, active listening, and interpersonal effectiveness. Grounded in assertiveness training research and DBT's DEAR MAN framework.",
  "courseCode": "DWA-016",
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

Removed: fabricated 68% stat, "Journal of Social and Personal Relationships, 2023" stub citation.
