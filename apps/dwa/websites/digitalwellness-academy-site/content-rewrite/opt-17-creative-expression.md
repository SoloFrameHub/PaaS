# opt-17 Creative Expression — Marketing Page Rewrite

**Source:** `site/courses/opt-17-creative-expression.html`
**Brief:** `docs/5-pillar-refactoring/course-17-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Creative Expression & Art Therapy for Mental Health | … by Board-Certified PMHNP" — "art therapy" is a regulated, credentialed profession (ATR-BC). A psychoeducation course is not art therapy. Strip from title.
2. **Meta:** "Master evidence-based expressive arts therapy including art therapy, journaling, music therapy, and dance movement" — strip "Master" and "therapy" framings. The brief is explicit: formal art therapy is reserved for licensed art therapists; this course teaches creative micro-practices.
3. **"600+ creative mechanisms"** — marketing puffery; strip.
4. **"Pennebaker's writing paradigm"** — keep but with proper caution. The brief notes expressive writing is appropriate at *low intensity*; high-intensity or trauma-focused writing requires clinical context.
5. **PMHNP attribution** — strip.

---

## New title + meta

**Title:** `Creative Expression for Emotional Wellness — Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on creative practices for mental wellness: journaling, brief expressive writing, visual art for emotion awareness, music, and movement. Not licensed art therapy.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on creative expression as part of an emotional-wellness practice. The course teaches skills, not therapy: reflective journaling, brief and time-limited expressive writing (drawing on Pennebaker's paradigm, used in low-intensity form with safety caveats), visual art for emotion labeling and awareness, creative routines that support regulation and pleasure, and basic meaning-making tools. It also teaches the lines: formal art therapy, trauma processing, and interpretation of a person's artwork belong to licensed art therapists (ATR-BC) and clinical psychotherapy, not a generic education course. Trauma-informed principles — choice, pacing, no forced disclosure — run throughout.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Creative Expression for Emotional Wellness — A Psychoeducation Course",
  "description": "A 20-lesson psychoeducation course on creative practices for emotional wellbeing: reflective journaling, brief expressive writing, visual art for emotion awareness, music, and movement. Not licensed art therapy.",
  "courseCode": "DWA-OPT-17",
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

Removed: "Art Therapy" framing (regulated term), PMHNP credential, "600+ mechanisms" marketing puffery, "Master" framing.
