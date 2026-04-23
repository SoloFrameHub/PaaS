<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Prompt D2 – What incubators/accelerators want from GTM programs

“Research expectations that Latin American incubators, accelerators, and chambers of commerce (starting with Colombia) have for sales/GTM programs offered to their founders. Identify:
Core outcomes they need to report (revenue, pipeline, meetings, skills).
Preferred program structures (cohorts, weeks, workshops, mentoring).
Data and dashboards they want from a platform like Solo GTM OS (engagement, completion, artifacts, roleplay scores).
Deliver recommendations on how to position, structure, and instrument Solo GTM OS so it aligns naturally with these expectations.”

Now I have everything needed for a complete, deeply sourced response. Let me compose it.

***

# What LatAm Incubators \& Accelerators Want from GTM Programs — And How Solo GTM OS Aligns

LatAm incubators and accelerators are not looking for generic sales courses — they need **verifiable outcomes they can report to government ministries, corporate sponsors, and investors** who fund their operations. Understanding this reporting obligation is the master key to positioning Solo GTM OS as an institutional partner, not just a tool for individual founders.

***

## The Reporting Imperative

Programs like **iNNpulsa/Apps.co** (MinTIC-backed), **Ruta N** (Medellín), **HubBOG**, and the **Cámara de Comercio de Bogotá's Incubadora Future Startups** are held accountable by a paper trail of measurable outcomes — not learner satisfaction scores. Apps.co 2023 selection criteria explicitly required startups to have at least COP \$12,000,000 in accumulated sales before entering the growth phase, demonstrating that revenue evidence is a hard gate, not a soft metric. Understanding this shapes everything about how Solo GTM OS should position, structure, and instrument itself for institutional B2B sales.[^1][^2]

***

## Core Outcomes Incubators Need to Report

These outcomes divide into three tiers based on audience: government sponsors, corporate investors, and the founders themselves.

### Tier 1 — Government \& Sponsor-Facing Metrics (Hardest to Fake)

| Outcome | Typical Measurement | Solo GTM OS Data Source |
| :-- | :-- | :-- |
| **Revenue generated** | COP/USD in closed deals during cohort | Pipeline Kanban: Won stage deal value, currency-aware [^3] |
| **Meetings booked** | \# qualified discovery/demo meetings | Outreach Logger: "Meeting booked" action type per founder [^4] |
| **Pipeline created** | Total deal value across all stages | `vpipelineoverview` Metabase view: pipeline by stage aggregation [^3] |
| **Jobs created/maintained** | Headcount at program entry vs. exit | Not currently captured — add field to founder profile |
| **Startups still operating 6/12 months later** | Survival rate | Platform login activity, streak data as proxy signal |
| **Certifications earned** | Verifiable skill credentials | Badgr Open Badges 3.0 digital certificates already issued [^3] |

### Tier 2 — Accelerator Program-Facing Metrics (Engagement Quality)

| Outcome | Measurement | Solo GTM OS Data Source |
| :-- | :-- | :-- |
| **Skill progression** | Pre/post assessment delta | 8-dimension readiness score at entry vs. exit via `vassessmentscores` [^4] |
| **Artifacts produced** | ICPs, playbooks, email sequences built | Artifact system: 10 versioned artifact types, timestamped [^4] |
| **Outreach activity** | Emails/DMs/WhatsApp messages sent | `voutreachsummary` view: daily channel activity per founder [^3] |
| **Roleplay performance** | AI-scored sales conversation quality | `vroleplayanalysis` view: session scores, trend over time [^3] |
| **Cohort engagement** | Pod participation, forum posts | `vpodhealth` view: active members, activities per pod [^3] |

### Tier 3 — Founder-Facing Progress (Retention Drivers)

These are what keep founders returning and completing the program — completion rates, streaks, XP levels, badge milestones, and coaching nudges. Accelerators care about these because founder dropout is their biggest program failure mode.[^4]

***

## Preferred Program Structures in LatAm

Reviewing the Bogotá Chamber of Commerce incubator, Apps.co, iNNpulsa, AWS Impact Accelerator LatAm, Founder Institute Colombia, and Seedstars reveals a remarkably consistent structural pattern:[^5][^6][^7][^8][^1]

- **Duration:** 8–12 weeks is the modal length. CCB's program runs 3 months; AWS Impact runs 8 weeks; Founder Institute runs a structured multi-semester program[^8][^5][^1]
- **Format:** Cohort-based with weekly synchronous sessions (workshops or mentoring) + async self-paced work between sessions. The cohort model is non-negotiable — peer accountability is cited as the \#1 retention mechanism across all reviewed programs[^7]
- **Structure:** Design Sprint → Workshops → Mentoring → Demo Day / Pitch Day is the canonical LatAm accelerator arc, exactly matching CCB's model[^1]
- **Cadence:** Monday kickoff / midweek check-in / Friday synthesis — eerily identical to the AI facilitator rhythm already built into Solo GTM OS's n8n workflow (Mon/Wed/Fri posts)[^3]
- **Culminating event:** A Pitch Day or Demo Day where founders present to investors/jury. Every program reviewed ends this way[^9][^1]
- **Cohort size:** 10–25 founders per batch. CCB runs 5 batches per year. AWS Impact runs small, curated cohorts[^5][^1]
- **Mentoring:** 1:1 sessions with domain experts in addition to group workshops. The best programs offer both[^7]

***

## What Data \& Dashboards They Want from a Platform

Based on the reporting requirements above and the existing Metabase infrastructure in Solo GTM OS, here is the specific dashboard structure that would satisfy a LatAm accelerator's reporting needs:[^3]

### Dashboard 1 — Cohort Operator View (for program directors)

This is the single most important deliverable. A program director at iNNpulsa or CCB needs to pull one dashboard to write their progress report. It must show:

- **Cohort enrollment \& active users** — total enrolled vs. active (logged in last 7 days)
- **Average readiness score at entry vs. current** — pulled from `vassessmentscores`, showing skill delta per cohort
- **Artifact completion rate** — % of cohort with ICP doc, Positioning Statement, and Discovery Playbook completed (the three foundational artifacts that signal real progress)[^4]
- **Total pipeline created** — aggregate COP/USD deal value across all cohort members' Kanban boards
- **Total meetings booked** — sum of "Meeting booked" outreach log entries across cohort
- **Certifications earned** — count of Badgr-issued badges per cohort[^3]
- **Pod health heatmap** — engagement score per pod, flagging pods at risk of going dark
- **Weekly outreach activity trend** — line chart of channel activity (WhatsApp, email, LinkedIn, calls) over cohort duration


### Dashboard 2 — Individual Founder Progress Card (for mentors)

Mentors in a 1:1 session need a single-page brief on a founder before each meeting:

- Readiness score by dimension with delta since last session
- Artifacts completed vs. pending
- Pipeline: \# deals, total value, stage distribution
- Outreach activity last 7 days by channel
- Roleplay average score + last 3 session scores
- Current learning streak and course progress


### Dashboard 3 — Program Outcome Report (for sponsors/government)

An exportable summary for reporting to MinTIC, iNNpulsa, or corporate sponsors:

- Total revenue in pipeline created by cohort
- Total meetings booked across cohort
- % founders with completed ICP + value proposition (proxy for "GTM-ready")
- Before/after assessment score comparison (evidence of skill transfer)
- Certifications issued (with Badgr badge verification links)
- Channel activity breakdown showing LatAm-specific channels (WhatsApp, Instagram)

***

## Positioning \& Structuring Solo GTM OS for Incubator Partners

The platform already contains most of the data and infrastructure needed. What's missing is the institutional packaging — the B2B product layer that sits on top of the founder-facing experience.

### Positioning Recommendation: "The GTM OS for Accelerators"

Do not position Solo GTM OS as a course platform that accelerators can recommend. Position it as **the operating system that powers the GTM track of your accelerator program** — replacing the patchwork of Google Slides decks, Notion wikis, and WhatsApp groups that most LatAm programs use for their sales curriculum. The positioning message:

> *"Solo GTM OS gives your GTM track a structured 8-week curriculum, AI sales coaching, real pipeline execution tools, and a Metabase dashboard your team can show to MinTIC or your corporate sponsor — all in one platform, in Spanish."*

### Structural Recommendations

**1. Create an "Accelerator Mode" cohort configuration.** A program director should be able to create a cohort in Solo GTM OS, invite 10–25 founders via email or access code, set a start date, and have the platform auto-configure:

- A shared Pod per 6-founder sub-group (using existing DISC pod matching)[^3]
- An 8-week curriculum track auto-selected based on cohort stage (pre-revenue: Foundations + Sales Methodology; post-revenue: AI Acquisition + Operations)
- The Demo Day pipeline stage added automatically to every cohort member's Kanban
- Weekly progress digests sent to the program director (not just the founder) via the existing n8n daily-digest endpoint[^3]

**2. Add a "Program Director" role to the auth system.** The current system has user + admin roles. An institutional role is needed: Program Director can view all founder dashboards within their cohort, export the cohort outcome report, and access the Metabase operator view — but cannot modify individual founder data.

**3. Build the Cohort Outcome Export.** The 11 existing Metabase views  already have the raw data for a PDF/CSV outcome report. A one-click "Export Cohort Report" button (PDF) covering the 5 key metrics — readiness delta, artifacts, pipeline value, meetings, certifications — would be the single highest-value feature for institutional sales.[^3]

**4. Map the curriculum to a Demo Day arc.** The existing 49-course structure needs an 8-week "Cohort Fast Track" sequence that culminates in Demo Day readiness:


| Week | Focus | Key Deliverable |
| :-- | :-- | :-- |
| 1 | ICP + Positioning | ICP Document artifact |
| 2 | Value proposition + channel selection | Positioning Statement artifact |
| 3 | List building + WhatsApp/email outreach | First 20 contacts logged in Outreach Tracker |
| 4 | Discovery frameworks + roleplay (Easy) | Discovery Playbook artifact |
| 5 | Demo architecture + objection handling | Roleplay score ≥ 65 on Medium difficulty |
| 6 | Proposals + pricing | Proposal Template artifact |
| 7 | Pipeline review + closing techniques | Active pipeline with ≥ 3 deals |
| 8 | Pitch Day prep + playbook finalization | Personal Sales Playbook artifact + Badgr certification |

**5. Price the institutional tier separately.** The \$29.95/month individual plan is not the right entry point for an accelerator buying seats for 20 founders. A cohort license (e.g., \$499–\$999/cohort of up to 25 founders for 12 weeks) aligns with the budget authority that program directors actually have and the free/subsidized model many LatAm programs require.[^1]

***

## Critical Gap: The Pitch Day Dashboard

Every program ends with a Demo Day or Pitch Day. The platform currently has no feature that maps directly to this milestone. A simple **"Pitch Day Readiness Score"** — a composite of readiness score + artifacts completed + pipeline value + roleplay average — displayed on the founder's dashboard in the final two weeks of a cohort would become the single most-referenced metric by both founders and program directors in the lead-up to the event. It should print on a one-page "Founder Brief" that mentors hold during the pitch session.[^9][^1]
<span style="display:none">[^10][^11][^12][^13][^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30][^31][^32][^33]</span>

<div align="center">⁂</div>

[^1]: https://www.ccb.org.co/en/business/create-your-company/constitute-your-company/incubator-future-startups

[^2]: https://www.innpulsacolombia.com/apps-co-2023-convocatoria-ambiente-de-crecimiento/

[^3]: PROJECT_OVERVIEW.md

[^4]: platform-product-analysis.md

[^5]: https://aws.amazon.com/blogs/startups/applications-are-open-for-the-aws-impact-accelerator-latino-founders-cohort/

[^6]: https://www.sramanamitra.com/2025/09/24/startup-latin-america-deep-dive-into-the-accelerator-ecosystem-in-cordoba/

[^7]: https://maccelerator.la/en/blog/startups/the-35-best-online-accelerator-programs-for-startups-in-2025/

[^8]: https://fi.co/insight/build-a-great-startup-in-2025-with-the-fi-colombia-startup-accelerator

[^9]: https://www.facebook.com/GlobalBusinessSchool/posts/g-accelerator-impact-call-2025-demo-day-took-place-yesterday-december-16th-at-at/1447029874091196/

[^10]: https://aws.amazon.com/startups/learn/announcing-the-startups-selected-for-the-aws-impact-accelerator-latino-founders-cohort

[^11]: https://docs.aws.amazon.com/de_de/AmazonCloudWatch/latest/APIReference/API_StartMetricStreams.html

[^12]: https://sellercentral.amazon.com/seller-forums/discussions/t/8dac9dd7493cfb10114aed67679902bd

[^13]: https://sellercentral-europe.amazon.com/seller-forums/discussions/t/8d3a05eeb1df1e5cfc3e074c8847acd3

[^14]: https://aws.amazon.com/startups/lp/aws-impact-bootcamps?lang=en-US

[^15]: https://music.amazon.com/es-co/podcasts/c9b4ce93-eae3-4e79-a14f-ea0199d0baec/episodes/99f9cfe1-b060-44ad-a189-ca0b3b9d9147/brazil-crypto-report-164-avenia's-matheus-moura-on-why-every-company-will-be-a-financial-services-company

[^16]: https://aws.amazon.com/developer/language/python/

[^17]: https://aws.amazon.com/startups/programs/education-accelerator?lang=en-US

[^18]: https://sell.amazon.com/es/learn/start-ecommerce-business?mons_sel_locale=es_US

[^19]: https://aws.amazon.com/tw/blogs/architecture/bbva-architecture-for-large-scale-macie-implementation/

[^20]: https://aws.amazon.com/startups/accelerators/education-accelerator?lang=es

[^21]: https://sellercentral.amazon.com/seller-forums/discussions/t/9f65dafd-8e74-4b4c-81ed-a424b5405810

[^22]: https://docs.aws.amazon.com/sdk-for-go/api/service/wafv2/

[^23]: https://docs.aws.amazon.com/pt_br/eventbridge/latest/userguide/eb-events-structure.html

[^24]: https://latinamericareports.com/15-go-to-market-leaders-showcasing-excellence-in-the-region/13992/

[^25]: https://indicelatam.cl/wp-content/uploads/2025/01/ILIA_2024_Ingles_020125_compressed.pdf

[^26]: https://scioteca.caf.com/bitstream/handle/123456789/2582/Unlocking growth in a changing world.pdf?sequence=4\&isAllowed=y

[^27]: http://repository.eclac.org/bitstream/handle/11362/48461/S2200897_en.pdf?sequence=4\&isAllowed=y

[^28]: https://bogota.gov.co/boletin-oferta-internacional/outcomes-accelerator-financia-proyectos-obf-en-america-latina

[^29]: https://apps.co/765/articles-237957_Terminos_de_Referencia_MDN.pdf

[^30]: https://fiveonelabs.org/blog/the-2025-ideation-cohort-of-the-incubator-program-in-barranquilla-has-reached-the-finish-line

[^31]: https://www.innpulsacolombia.com/wp-content/uploads/2023/07/Anexo-2-APPS-PD-23-Marco-Metodologico-Producto-Digital.pdf

[^32]: https://www.undp.org/sites/g/files/zskgke326/files/2025-06/undp-global-deep-tech-ecosystems.pdf

[^33]: https://www.linkedin.com/posts/davidars_2026s-list-of-accelerator-and-incubator-activity-7419778915638046720-IM5p

