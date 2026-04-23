# opt-13 Mental Health First Aid — Marketing Page Rewrite

**Source:** `site/courses/opt-13-mental-health-first-aid.html`
**Brief:** `docs/5-pillar-refactoring/course-13-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Mental Health First Aid Training & Crisis Intervention | ALGEE Framework Course" — "Crisis Intervention" overstates; MHFA teaches crisis *recognition* and escalation, not crisis intervention. Strip.
2. **Meta:** "Become a certified Mental Health First Responder" — "certified" is a regulatory claim; MHFA USA has a specific certification process this course may or may not reflect. Strip unless verified.
3. **"suicide prevention"** as a deliverable — the 2023 Cochrane review (highest-rigor synthesis) could not draw conclusions about MHFA's effect on patient mental health or suicide rates. Marketing copy that implies MHFA "saves lives" or "prevents suicide" is unsupported. The brief is explicit: trainee-level outcomes (literacy, stigma, confidence, intent to help) are where the evidence actually is.
4. **"Board-certified PMHNP"** — unverified; strip.

---

## New title + meta

**Title:** `Mental Health First Aid — Evidence-Based Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on the ALGEE framework, crisis recognition, safe messaging, and referral. Grounded in the 2023 Cochrane systematic review and AFSP/SPRC/WHO safe-messaging guidelines.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on Mental Health First Aid — the internationally validated ALGEE action plan (Approach/assess, Listen, Give information, Encourage professional help, Encourage self-help). The 2023 Cochrane systematic review found strong evidence that MHFA training improves trainee knowledge, reduces stigma, and increases intent to help, with moderate evidence for short-term helping behavior — but it could not draw conclusions about recipient mental health or suicide rates. The course calibrates accordingly: it teaches learners to act as an informed, caring bridge (crisis recognition, safe messaging, professional referral, managing their own wellbeing while supporting others), not as a treatment provider. This course is not clinical crisis intervention, and it is not formal MHFA USA certification.

---

## Safety panel (lighter — scope and crisis context)

> **This course is:** psychoeducation about recognizing distress, active listening, safe messaging, and facilitating professional help.
>
> **This course is not:** clinical crisis intervention, suicide safety planning, mandated-reporter training, or MHFA USA certification.
>
> **If someone is in crisis**, call or text **988** (U.S. Suicide & Crisis Lifeline). In immediate danger, call 911.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Mental Health First Aid — Evidence-Based Psychoeducation",
  "description": "A 20-lesson psychoeducation course on the ALGEE action plan, crisis recognition, safe messaging, and professional referral. Grounded in the 2023 Cochrane systematic review and AFSP/SPRC/WHO safe-messaging guidelines.",
  "courseCode": "DWA-OPT-13",
  "educationalLevel": "Introductory",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Digital Wellness Academy",
    "url": "https://digitalwellness.academy"
  },
  "numberOfLessons": 20,
  "timeRequired": "PT18H",
  "inLanguage": "en-US"
}
```

Removed: "suicide prevention" as deliverable (unsupported per Cochrane), "certified Mental Health First Responder" (regulatory overclaim), PMHNP credential, "crisis intervention" framing.
