# Unmatched / Partially-Matched Courses — Needs Clinical Review Before Publishing

For the courses listed below, no dedicated research brief exists in either `docs/5-pillar-refactoring/` or `docs/reference/course-research-prompts/`. The rewrite drafts for these are flagged inline with a ⚠️ block and are grounded in the nearest adjacent brief. A clinical reviewer should either (a) commission a dedicated brief, or (b) confirm the nearest-brief grounding is acceptable before publishing.

All unmatched courses had the rewrite strip the fabricated specific-percentage stat in the current title (the strongest unsupported claim) and the associated stub citation.

---

## dwa-010 Seasonal Affective Disorder (SAD)

- **Briefs searched:** All therapeutic briefs in `docs/reference/course-research-prompts/`. No dedicated SAD brief exists.
- **Nearest adjacent:** `Depression Course Research Package.md` (covers depression broadly), `Course-1-research.md` (exercise for mood).
- **Strongest unsupported claim stripped:** "60% response rate to light therapy" with stub citation "Journal of Affective Disorders, 2024." Light therapy for SAD does have a real clinical evidence base (APA / CANMAT guidelines), but the specific 60% figure and its citation are unsourced in available briefs. A brief citing APA practice parameters for light therapy dose (10,000 lux, morning, 30 min) and contraindications (bipolar spectrum, photosensitizing medications, retinal disease) would be the minimum for a responsible publish.

---

## dwa-014 Attachment Wounds & Relationship Patterns

- **Briefs searched:** All therapeutic briefs. No dedicated attachment-wounds brief.
- **Nearest adjacent:** `course-10-research.md` (Relationship Dynamics — covers attachment dimensions evidence, 132-study meta-analysis), `Trauma Recovery Course Research.md` (developmental-trauma overlap).
- **Strongest unsupported claim stripped:** "53% shift toward secure attachment" with stub "Attachment & Human Development, 2023." The attachment brief (course-10) is explicit that security is *dimensional and dynamic, not categorical*, so a "53% shift" framing is conceptually incoherent independent of the stat being unsourced.

---

## dwa-017 Conflict Resolution in Relationships

- **Briefs searched:** All therapeutic briefs + 5-pillar briefs.
- **Nearest adjacent:** `course-10-research.md` (Relationship Dynamics — covers Gottman research and IPV safety as "the single most important safety issue").
- **Strongest unsupported claim stripped:** "73% reduction in destructive conflict patterns" with stub "Family Process, 2024."

---

## dwa-018 Breaking Codependency Patterns

- **Briefs searched:** All therapeutic briefs + 5-pillar briefs.
- **Nearest adjacent:** `course-7-research.md` (Healthy Boundaries — covers Differentiation of Self scoping review, assertiveness research).
- **Strongest unsupported claim stripped:** "61% improvement in autonomy measures" with stub "Journal of Family Psychology, 2023." Note: "codependency" itself is a popular-psychology construct, not a DSM diagnosis. The rewrite reframes the course around the better-operationalized adjacent constructs (Differentiation of Self, assertiveness) per the adjacent brief.

---

## dwa-019 Building Healthy Relationships

- **Briefs searched:** All therapeutic briefs + 5-pillar briefs.
- **Nearest adjacent:** `course-10-research.md` (Relationship Dynamics).
- **Strongest unsupported claim stripped:** "71% sustained relationship improvements at 1 year" with stub "Personal Relationships, 2024."

---

## dwa-020 Intimacy & Emotional Connection

- **Briefs searched:** All therapeutic briefs + 5-pillar briefs.
- **Nearest adjacent:** `course-10-research.md` (Relationship Dynamics — attachment, vulnerability in close relationships).
- **Strongest unsupported claim stripped:** "66% increase in emotional intimacy scores" with stub "Journal of Sex & Marital Therapy, 2023."

---

## dwa-023 Mindfulness Fundamentals

- **Briefs searched:** All therapeutic briefs + 5-pillar briefs. No dedicated mindfulness brief.
- **Nearest adjacent:** `Chronic Stress & Burnout Management.md` (covers MBSR meta-analytic evidence), `Course 12_ Emotional Dysregulation &amp; DBT Skill.md` (DBT mindfulness module).
- **Strongest unsupported claim stripped:** "47% reduction in rumination and worry" with stub "Clinical Psychology Review, 2023."

---

## Notes on partial matches

Some dwa-* courses use a brief that was primarily written for a sibling course:

- **dwa-005 (DBT crisis skills) and dwa-021 (DBT emotion regulation) and dwa-022 (DBT distress tolerance)** all share `Course 12_ Emotional Dysregulation &amp; DBT Skill.md`. This is an appropriate shared brief — DBT is a unified framework — and the three DWA courses split its modules cleanly.
- **dwa-011 (trauma/PTSD), dwa-012 (complex trauma), and dwa-015 (somatic trauma)** all share `Trauma Recovery Course Research.md`. Appropriate given the trauma-informed scope, but dwa-012 (complex trauma) and dwa-015 (somatic) would benefit from complex-trauma- and somatic-specific briefs if published beyond the initial release.
- **dwa-007 (behavioral activation) and dwa-008 (self-compassion)** both use `Depression Course Research Package.md` as a base; dwa-008 additionally draws on the Low Self-Esteem brief for CFT/self-compassion grounding.
- **dwa-024 (self-esteem)** uses `13. Low Self-Esteem &amp; Self-Worth_Research Prom.md` — a direct match, not unmatched.

---

## Egregious fabricated-claim flags (worth surfacing to user)

While every page had a fabricated-stat title, three stand out as especially problematic beyond the boilerplate pattern:

1. **dwa-004 OCD: Exposure & Response Prevention** — the course title positions it as ERP *delivery*. ERP is a therapist-guided protocol that the CBT Fundamentals brief explicitly flags as outside safe self-guided course scope (can worsen OCD if attempted without clinical scaffolding). This is a clinical safety issue beyond a marketing fix — the rewrite renames the course and makes explicit that it prepares for, not delivers, ERP.

2. **opt-1 Movement Medicine (already done)** and **opt-5 CBT Fundamentals** and **opt-4 Growth Mindset** — all three carry "as effective as antidepressants" / "proven as effective as medication" / "36% depression reduction" claims that are not supported by their own research briefs. The briefs are actively cautious about these exact overstatements. These three pages historically sat furthest from their own evidence base and merit special attention from a clinical reviewer.

3. **opt-13 Mental Health First Aid** — the "suicide prevention" deliverable and "certified Mental Health First Responder" framing together create a meaningful regulatory and clinical safety exposure. The 2023 Cochrane review (the highest-rigor MHFA synthesis) could not conclude MHFA training reduces suicide or improves recipient mental health, yet the page markets these outcomes. Strip is non-optional.

4. **opt-15 Legacy Building, opt-16 Recreational Therapy, opt-17 Creative Expression, opt-19 Music & Movement** — each carries either credentialed-profession framing ("Art Therapy," "Recreational Therapy," "Music Therapy," "Dance/Movement Therapy") or "Board-Certified PMHNP" author attribution that appears unverifiable. Credentialed-profession framing in particular can expose DWA to scope-of-practice complaints in states where these professions are regulated.
