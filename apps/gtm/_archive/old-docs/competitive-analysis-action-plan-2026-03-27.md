# Solo GTM OS — Competitive Analysis & Action Plan

**Date:** 2026-03-27
**Context:** Exhaustive competitive analysis conducted via Claude Code with full codebase and web research.

---

## Platform Identity (Confirmed)

- **Company:** SoloFrameHub
- **Product name (proposed):** Solo GTM OS (replaces "AI Client Acquisition OS" — drops "AI" which will date, adds "GTM" for category credibility, keeps "Solo" as defensible moat)
- **Tagline:** _Not a course. An operating system._
- **Target:** Solo technical founders, bootstrapped B2B SaaS builders, first-time founders
- **Pricing:** $29.95/month post-beta
- **Full curriculum:** 7 tracks, 49 courses, 487 lessons — all published
- **Spanish:** Track 1 fully translated (server/data/content/es/foundations/). Mike lives in Bogota, has LATAM connections.
- **Attio integration:** Fully built — BYOK API key, bi-directional pipeline sync, client + service + webhook all live.

---

## Competitive Position Summary

SoloFrameHub occupies genuine white space: the **only sub-$50/month product combining curriculum + AI coaching + execution tools + community + pipeline** specifically for solo founders.

| Competitor Category                  | Their Gap                            | Our Advantage                                       |
| ------------------------------------ | ------------------------------------ | --------------------------------------------------- |
| Reforge ($1,995/yr)                  | PMs at funded companies, no tooling  | 66× cheaper, solo-founder specific, execution tools |
| Demand Curve ($1,200 OTP)            | Static course, no AI, no updates     | AI-native, living platform, 12× cheaper             |
| Apollo.io ($49–$99/mo)               | No strategy layer, no curriculum     | Education + execution in one                        |
| Clay ($185–$495/mo)                  | Steep learning curve, no education   | Beginner-accessible, BYOK enrichment                |
| AI SDRs — Artisan/11x ($900–$50K/mo) | Way too expensive, no skill-building | $29.95/mo, you learn while you execute              |
| MicroConf ($499/yr)                  | Community only, no curriculum, no AI | Full OS at lower price                              |
| Justin Welsh ($150 OTP)              | LinkedIn/content only, no SaaS GTM   | Full GTM coverage across all channels               |
| Indie Hackers (free)                 | No curriculum, no tooling            | Structured execution path                           |

**Uncontested markets:** Spanish-language GTM education for LATAM (zero competitors at any price).

---

## Action Plan

### Initiative 1: Rebrand to "Solo GTM OS"

**Priority:** High — affects all marketing copy, social, SEO
**Effort:** 1–2 days copy changes, 1 day site/meta updates

#### Tasks

- [ ] Update `website/index.html` hero headline and meta title
- [ ] Update `website/solo-founders-ai-client-acquisition-os.html` — rename page and update all references
- [ ] Update all ES equivalents in `website/es/`
- [ ] Update `website/sitemap.xml`
- [ ] Update OG image text
- [ ] Update app `<title>` tags and any in-app references to "AI Client Acquisition OS"
- [ ] Update `docs/PROJECT_OVERVIEW.md` and `CLAUDE.md`

#### Testing

- [ ] Verify all 301 redirects from old URLs function correctly
- [ ] Check no broken internal links: `grep -r "client-acquisition-os" website/` — update or redirect all
- [ ] Lighthouse: confirm OG tags render correctly in social preview tools (opengraph.xyz)
- [ ] Spell-check all updated pages
- [ ] Mobile render check on updated hero sections

---

### Initiative 2: Attio Contact Enrichment Extension

**Priority:** High — lowest effort, highest leverage (infrastructure 90% done)
**Effort:** 1 day
**Files to touch:** `lib/attio/client.ts`, ICP Builder component, pipeline deal view

#### What to Build

Extend the existing Attio client to read enriched attributes back after asserting a company or person. When a user adds a target company domain or prospect email anywhere in the platform (ICP Builder, List Building course tool, pipeline deal), the OS:

1. Pushes the record to Attio via existing `assertCompany(domain)` / `assertPerson(email)`
2. Queries back the enriched attributes (company size, industry, LinkedIn, employee count, funding, tech stack)
3. Surfaces that data inline in the ICP Builder context panel and pipeline deal view

#### Tasks

- [ ] Add `getCompanyRecord(apiKey, domain)` method to `lib/attio/client.ts` — calls `/objects/companies/records/query` filtered by domain
- [ ] Add `getPersonRecord(apiKey, email)` method — calls `/objects/people/records/query` filtered by email
- [ ] Add enrichment display panel to ICP Builder: show enriched company attributes when connected
- [ ] Add enriched contact card to pipeline deal view
- [ ] Handle async enrichment delay — Attio enriches within seconds; add a "Refreshing..." state with a re-poll after 3s if attributes are empty
- [ ] Add "Enrich from Attio" button on relevant inputs (domain field, prospect email field)
- [ ] Update `apps-panel.tsx` description to mention enrichment: "Sync pipeline + auto-enrich companies and contacts"

#### Testing

- [ ] Unit test: `getCompanyRecord` returns expected shape when Attio responds
- [ ] Unit test: graceful handling when Attio returns 404 (record not found)
- [ ] Unit test: graceful handling when Attio not connected (no API key)
- [ ] Integration test: assert a real company domain → verify enriched attributes return within 10s
- [ ] E2E test: connect Attio in Settings → add a prospect in Pipeline → verify enriched data appears
- [ ] Test with no Attio connection — verify enrichment UI is hidden, no errors thrown
- [ ] Test with invalid API key — verify error message surfaces clearly in UI
- [ ] Test with a domain that Attio can't enrich — verify graceful empty state ("No enrichment data available")

---

### Initiative 3: Hunter.io BYOK Integration (Email Finding)

**Priority:** Medium — complements Attio (Attio enriches, Hunter finds emails)
**Effort:** 1 day
**Pattern:** follows the exact BYOK pattern already built for Attio

#### What to Build

Add Hunter.io as a third Connected App. Surface in List Building course (Track 1, Course 4) and ICP Builder's "Find contacts" flow: user enters a company domain, platform calls Hunter's `/domain-search` endpoint with their key, returns verified emails.

#### Tasks

- [ ] Add `"hunter"` provider to `INTEGRATIONS` array in `apps-panel.tsx`
- [ ] Add Hunter API key validation to `app/api/settings/connections/route.ts`
- [ ] Create `lib/hunter/client.ts` — domain-search and email-finder endpoints
- [ ] Add `app/api/hunter/domain-search/route.ts` — proxies Hunter API using user's key
- [ ] Add "Find emails at this company" UI element to ICP Builder and List Building lesson tool
- [ ] Store nothing — results are returned to client, never persisted

#### Testing

- [ ] Unit test: Hunter client returns correct shape from domain-search
- [ ] Unit test: handles Hunter 401 (invalid key) with clear user error
- [ ] Unit test: handles Hunter 402 (out of credits) with "Top up your Hunter account" message
- [ ] Integration test: real domain search returns ≥1 result for a known company
- [ ] E2E test: connect Hunter → run domain search in ICP Builder → emails appear
- [ ] Test: no Hunter key connected — "Find emails" button hidden or prompts connection
- [ ] Privacy check: confirm no email addresses written to database (only in-memory/client)
- [ ] Rate limit test: verify 429 responses are caught and surfaced gracefully

---

### Initiative 4: Quick Win Onboarding Path

**Priority:** High — directly reduces 30-day churn (time-to-first-value)
**Effort:** 0.5–1 day
**No new content needed — pure routing/UX change**

#### What to Build

After Readiness Score completion, present a named "Your 90-Minute Quick Win Path" — 3 lessons selected based on the user's lowest-scoring dimension. Add a "Quick Wins" mode toggle to the Academy page that filters to one high-impact lesson per course.

#### Tasks

- [ ] Tag ~50 lessons with `quickWin: true` in `lib/data/curriculum.ts` (one per course, the highest-impact lesson based on outcomes)
- [ ] Add Academy page filter: `[ Quick Wins ]  [ Full OS ]` toggle, defaulting to Full OS for returning users and Quick Wins for first session
- [ ] Build `getQuickWinPath(readinessScoreDimensions)` function — maps lowest 1–2 scoring dimensions to 3 specific lesson IDs
- [ ] Add "Your Quick Win Path" card to dashboard/home for users who haven't completed their first 3 lessons
- [ ] Add "Start here →" CTA on Academy page for users with 0 lessons completed

#### Testing

- [ ] Unit test: `getQuickWinPath` returns exactly 3 lessons for each of the 8 readiness dimensions
- [ ] Unit test: returns valid lesson IDs that exist in curriculum
- [ ] E2E test: complete Readiness Score → verify Quick Win path card appears on dashboard
- [ ] E2E test: click "Start here" → correct lesson loads
- [ ] Test: returning user (>3 lessons complete) — Quick Win card does not appear
- [ ] Test: toggle between Quick Wins / Full OS modes — correct lessons filter
- [ ] Verify no quick-win-tagged lessons are from locked/premium content

---

### Initiative 5: Spanish Translation — Tracks 2–7

**Priority:** High — uncontested LATAM market, Track 1 already done, Mike in Bogota
**Effort:** 6–8 weeks (AI-assisted bulk translation + human review)
**Infrastructure:** i18n already exists (ES website pages live, Track 1 ES lesson files exist at `server/data/content/es/foundations/`)

#### Tasks — Infrastructure

- [ ] Audit current ES content structure: confirm `server/data/content/es/` path pattern is consistent
- [ ] Confirm quiz ES files exist at `server/data/quizzes/es/foundations/` — verify parity with EN
- [ ] Add language switcher to app UI (if not already present) — toggle EN/ES
- [ ] Add `locale` to user profile schema so language preference persists
- [ ] Ensure AI coaching (Solo Advisor) responds in Spanish when locale=es — verify Claude/Gemini handles es-CO naturally (it does)
- [ ] Ensure roleplay personas use Spanish when locale=es

#### Tasks — Content Translation (per track)

For each of Tracks 2–7:

- [ ] Bulk AI-translate all lesson .md files using Claude API (script: `scripts/translate-track.ts`)
- [ ] Human review pass on first 2 lessons per course (Mike or LATAM connection)
- [ ] Bulk AI-translate quiz JSON files
- [ ] Spot-check 3 random lessons per track for cultural accuracy (not just linguistic)
- [ ] LATAM-specific: check examples reference LATAM companies/contexts where relevant

#### Tasks — LATAM Go-to-Market

- [ ] Identify 3–5 beta testers in Colombia/Bogota for Spanish platform
- [ ] Research iNNpulsa Colombia, Endeavor Colombia, Ruta N (Medellín), Apps.co partnership angles
- [ ] Create ES-specific landing page emphasizing LATAM market (not just translated EN page)

#### Testing

- [ ] Automated: run `npm run validate-lessons` equivalent for ES content — confirm all ES lesson files referenced in curriculum have corresponding .md files
- [ ] Spot-check: load 5 random ES lessons in the app — render correctly, no broken MDX
- [ ] Quiz: complete a quiz in Spanish — all questions render, answers save correctly
- [ ] AI coach: send Spanish message → verify response is in Spanish
- [ ] Roleplay: start session with locale=es → DISC persona responds in Spanish
- [ ] Full E2E: Spanish user registers → completes onboarding → completes Lesson 1 → quiz saves → progress tracked
- [ ] Regression: switching locale EN→ES→EN does not corrupt progress data
- [ ] Native speaker review: have a Colombian founder do a full Track 1 run and report any awkward phrasing

---

### Initiative 6: "Certified Solo GTM Practitioner" Badge

**Priority:** Medium — long-tail credibility engine, low engineering effort
**Effort:** 3–4 days engineering + ongoing ops
**Stack:** Badgr.com (free, Open Badges 3.0) → Credly when volume exceeds 1,000

#### What to Build

Issue a digital badge upon completing: Track 1 (Foundations) + Track 3 (Sales Methodology) + roleplay session score ≥ 75%. One-click "Add to LinkedIn" on completion screen. Public `/certified` directory page on website.

#### Tasks — Engineering

- [ ] Create issuer account on Badgr.com
- [ ] Design badge image (logo + "Certified Solo GTM Practitioner" text, clean SVG)
- [ ] Define criteria page at `soloframehub.com/certification/criteria` — describes exactly what's required
- [ ] Add `certificationEarned` field to user profile schema
- [ ] Build `checkCertificationEligibility(userId)` service function — queries course completion + roleplay score
- [ ] Add POST to Badgr API when eligibility is met: issues badge assertion, returns badge URL
- [ ] Add certification completion screen with "Add to LinkedIn" button — pre-fills LinkedIn certification form URL with credential URL
- [ ] Build `/certified` public page — list of certified founders with name, company, optional revenue milestone

#### Tasks — LinkedIn Add Flow

LinkedIn "Add Certification" pre-fill URL format:

```
https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME
&name=Certified+Solo+GTM+Practitioner
&organizationId=[your-linkedin-org-id]
&issueYear=2026&issueMonth=03
&certUrl=[badgr-assertion-url]
&certId=[unique-cert-id]
```

- [ ] Register SoloFrameHub as LinkedIn organization (free — just needs a LinkedIn company page)
- [ ] Get LinkedIn organization ID from company page URL
- [ ] Build the pre-fill URL generator in the completion screen component

#### Tasks — Spanish Certification

- [ ] Create Spanish equivalent: "Profesional Certificado en Solo GTM"
- [ ] Separate badge design with ES label
- [ ] ES criteria page at `/es/certification/criteria`

#### Testing

- [ ] Unit test: `checkCertificationEligibility` returns false for incomplete Track 1
- [ ] Unit test: returns false for roleplay score < 75%
- [ ] Unit test: returns true when all criteria met
- [ ] Unit test: idempotent — issuing badge twice for same user doesn't create duplicate
- [ ] Integration test: Badgr API call succeeds and returns assertion URL
- [ ] Integration test: Badgr API failure is caught gracefully — cert stored locally even if badge issuance fails (retry queue)
- [ ] E2E test: complete all criteria → completion screen appears → "Add to LinkedIn" button present → URL is valid
- [ ] E2E test: `/certified` page loads and shows certified founder entries
- [ ] Manual: click "Add to LinkedIn" — verify LinkedIn form pre-populates correctly
- [ ] Edge case: user deletes their account — remove from `/certified` directory

---

## Competitive Weaknesses Remaining (Post-Implementation)

After all 6 initiatives are complete, the remaining gaps vs. competition:

| Gap                        | vs. Who                               | Mitigation                                                                         |
| -------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------- |
| No native contact database | Apollo (275M contacts)                | Hunter BYOK + Attio enrichment covers 80% of use case                              |
| No email sequencing in-app | Instantly, Lemlist                    | Track 4 curriculum teaches this in external tools; consider native sequencer in v2 |
| Brand awareness near zero  | All competitors have years of content | "Build in public" transparency + LATAM first-mover                                 |
| No social proof yet        | Demand Curve/Reforge alumni networks  | `/certified` directory is the social proof engine                                  |

---

## Key Decisions Made in This Session

1. **Rebrand:** "AI Client Acquisition OS" → **"Solo GTM OS"** (drop "AI" which dates, add "GTM" for category, keep "Solo" as moat)
2. **Enrichment strategy:** Extend existing Attio integration (not a new vendor) + Hunter BYOK as complement
3. **No subsidized credit pool** — all enrichment is BYOK to eliminate support liability
4. **Quick wins:** UX routing change, not a new product tier
5. **Spanish:** Highest ROI investment available; no competition; Mike's LATAM presence is the unfair advantage
6. **Certification:** Badgr (free) now, Credly later; rigorous gate (Track 1 + Track 3 + roleplay ≥ 75%) to ensure it signals something real

---

## Implementation Order

| Sprint         | Initiative                 | Effort    | Key Outcome                         |
| -------------- | -------------------------- | --------- | ----------------------------------- |
| **Week 1**     | Rebrand copy               | 1–2 days  | Clean positioning live              |
| **Week 1**     | Attio enrichment extension | 1 day     | Enrichment live for connected users |
| **Week 1**     | Quick Win path             | 0.5 day   | Churn reduction starts              |
| **Week 2**     | Hunter.io integration      | 1 day     | Email finding live                  |
| **Week 2**     | Certification setup        | 3–4 days  | Badge program live                  |
| **Weeks 3–10** | Spanish Tracks 2–7         | 6–8 weeks | LATAM market open                   |
