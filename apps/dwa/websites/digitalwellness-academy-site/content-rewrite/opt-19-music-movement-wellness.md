# opt-19 Music & Movement Wellness — Marketing Page Rewrite

**Source:** `site/courses/opt-19-music-movement-wellness.html`
**Brief:** `docs/5-pillar-refactoring/course-19-research.md`
**Scope:** Marketing copy only. Course itself is live and unchanged.

---

## Strip list

1. **Title:** "Music & Movement Wellness: Evidence-Based Music Therapy & Dance/Movement Therapy… by PMHNP" — strip PMHNP. Strip "Music Therapy" and "Dance/Movement Therapy" framings — these are board-certified professions (MT-BC, BC-DMT) that a psychoeducation course does not deliver.
2. **Meta:** "Master evidence-based music therapy and dance/movement therapy for anxiety, depression, trauma, and nervous system regulation" — "Master," "for… trauma," and "therapy" framings all overstate. The brief explicitly notes that music/movement for trauma, bipolar, and psychosis needs clinical context, not self-guided practice.
3. **"Neurologic music therapy"** — a specific clinical intervention (NMT) delivered by trained clinicians; the course can explain it but not deliver it.

---

## New title + meta

**Title:** `Music and Movement for Wellness — Psychoeducation | Digital Wellness Academy`

**Meta:** `A 20-lesson psychoeducation course on music listening, rhythmic movement, and dance-based self-care practices for mood and stress. Not licensed music therapy or dance/movement therapy.`

**OG title / description:** same.

---

## Hero paragraph

> A 20-lesson psychoeducation course on music listening, rhythmic movement, and dance-based self-care practices. The course teaches the basic mechanisms (how tempo, mode, and familiarity influence arousal and emotion; how rhythmic movement affects mood and stress physiology), self-guided practices (intentional music listening, free and structured movement, group music and dance for social connection), and self-observation skills to recognize when a practice feels destabilizing. It also teaches the lines: board-certified music therapists (MT-BC) and dance/movement therapists (BC-DMT) deliver assessment-based, individualized treatment — not what a self-guided wellness course does. For trauma, bipolar spectrum, or psychosis, these practices belong in clinical context.

---

## Schema.org replacement

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Music and Movement for Wellness — A Psychoeducation Course",
  "description": "A 20-lesson psychoeducation course on intentional music listening, rhythmic movement, and dance-based self-care practices for mood and stress. Not licensed music therapy or dance/movement therapy.",
  "courseCode": "DWA-OPT-19",
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

Removed: PMHNP credential, "Music Therapy" and "Dance/Movement Therapy" framings (regulated professions), "for trauma" overreach, "Master" framing.
