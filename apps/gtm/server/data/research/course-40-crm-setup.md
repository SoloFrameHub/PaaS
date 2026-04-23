# Course 40: Advanced CRM Setup — Research Package

**Track:** Operations & Systems (Track 7)
**Duration:** 10 lessons | ~8 hours total
**Budget Constraint:** <$50/month CRM spend (free tiers preferred)
**Time Constraint:** 5-7 hours/week on acquisition
**Primary Output Artifact:** AI-Ready Field Schema with events, notes, and health indicators
**Core Interactions:** CRM selection wizard, schema designer, pipeline builder, migration planner

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Understand CRM as a system of action, not a passive database | Lesson 1 | CRM Philosophy Statement |
| Compare HubSpot Free, Attio, Folk, Close, and Pipedrive for solo founder use | Lessons 2, 3, 8 | CRM Comparison Matrix |
| Configure universal pipeline stages (Lead → Contacted → Engaged → Meeting → Proposal → Won/Lost) | Lesson 4 | Pipeline Stage Map |
| Set up email logging, deal tracking, custom fields, and contact enrichment | Lessons 5, 6 | Field Schema Document |
| Design an "AI-ready" schema so Course 27 agents can reason on CRM data | Lessons 6, 10 | AI-Ready Field Schema |
| Choose the right CRM by sales motion (B2B volume vs creator relationship) | Lesson 8 | Decision Matrix |
| Migrate between CRMs without losing data or context | Lesson 9 | Migration Checklist |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + diagrams explaining the core concept
2. **Guided Build Session** — Artifact creation with AI suggestions + linters
3. **Simulation/Roleplay** — Where applicable (Lessons 4, 6, 8)
4. **Implementation Sprint** — Course culminates in a 7-day CRM setup sprint (Lesson 10)

---

## LESSON 1: CRM Philosophy: System of Action, Not Just a Database (45 min)

### Key Topics

1. **The System of Action Concept** — A CRM should tell you what to do next, not just store contact info. Every field must earn its place by triggering a decision or automation.
2. **Why Solo Founders Abandon CRMs** — Analysis of the three failure modes: over-engineering (too many fields), under-using (glorified spreadsheet), and wrong tool (enterprise CRM for a solo operation)
3. **The 3 CRM Jobs** — (1) Remember everything so you don't have to, (2) Surface the next best action, (3) Measure what's working
4. **CRM as AI Foundation** — Your CRM is the memory layer for every AI agent you'll build in Course 27. Garbage in = garbage agents out.
5. **The "Would I Act on This?" Test** — For every custom field: if the answer is no, delete it
6. **Solo Founder CRM Principles** — Fewer fields, more automations. Log context, not just data. Review weekly, not daily.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| 30-40% reduction in time spent on research and updating CRM with AI augmentation | BCG AI Agents in B2B Sales 2025 | AI layered on clean CRM data saves 10-15 hours/month |
| 65% of CRM implementations fail to meet expectations | Forrester | Usually from over-customization or under-adoption |
| Sales reps spend only 28% of their time actually selling | Salesforce State of Sales | CRM admin eats the rest — solo founders can't afford this |
| Peer-reviewed research confirms AI in CRM improves personalization, retention, and sales efficiency when tightly integrated | ScienceDirect 2025 | Integration matters more than which CRM you pick |
| Companies using CRM effectively see 29% increase in sales revenue | Nucleus Research | But "effectively" means minimal fields, consistent use |

### Frameworks & Models

- **The 3-Job CRM Model**: (1) Memory — contacts, notes, history. (2) Action — tasks, reminders, next steps. (3) Measurement — pipeline value, conversion rates, velocity.
- **The AI-Readiness Test**: Can an AI agent answer "Who should I contact today and why?" from your CRM data alone? If not, your schema needs work.
- **The Field Justification Framework**: For each field, answer: (1) What decision does this inform? (2) Will I update this consistently? (3) Can an automation populate it?

### Artifact Component

**CRM Philosophy Statement** — One-page document defining the student's CRM strategy: chosen tool, 3 guiding principles, what NOT to track, and AI-readiness goals.

### Interactive Element

**Concept Capsule Quiz:** Identify CRM anti-patterns (over-engineering vs. under-using); classify fields as "earns its place" vs "vanity"; match CRM jobs to real scenarios.

---

## LESSON 2: HubSpot Free & Attio: Comparison for Solo Founders (55 min)

### Key Topics

1. **HubSpot Free CRM Deep Dive** — Unlimited contacts, email tracking (200 notifications/mo), meeting scheduler, deal pipeline, live chat, basic reporting
2. **HubSpot Free Limitations** — 5 email templates, 1 pipeline, limited automation (no workflows on free), HubSpot branding, limited custom properties
3. **HubSpot Starter ($20/seat/mo)** — Removes branding, adds simple automation, 2 pipelines, 1,000 custom properties
4. **Attio Deep Dive** — Relationship-first CRM. Automatic contact enrichment, email sync, flexible data model, modern UI
5. **Attio Pricing** — Free for up to 3 users (limited), Plus at $29/user/mo (full features, enrichment, automations)
6. **Head-to-Head Comparison** — HubSpot wins on ecosystem and integrations. Attio wins on modern UX, flexibility, and AI-native design.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| HubSpot Free: unlimited contacts, 1 deal pipeline | HubSpot pricing page 2025-2026 | Best free tier for beginners |
| Attio Plus: $29/user/mo, automatic enrichment, AI features | Attio pricing 2025-2026 | Modern alternative for AI-first founders |
| HubSpot has 1,600+ integrations in its marketplace | HubSpot App Marketplace | Largest CRM integration ecosystem |
| Attio auto-syncs email, calendar, and enriches contacts from public data | Attio documentation | Zero manual data entry for basic contact info |
| HubSpot Starter removes free-tier limits for $20/seat/mo (annual) | HubSpot 2025-2026 | Sweet spot for solo founders who outgrow free |

### Tools to Reference

| Tool | Tier | Price | Key Strength | Key Limitation |
|------|------|-------|-------------|----------------|
| HubSpot Free | Free | $0 | Unlimited contacts, huge ecosystem | 1 pipeline, limited automation, branding |
| HubSpot Starter | Paid | $20/seat/mo | Simple automation, 2 pipelines | Still limited vs Pro |
| Attio Free | Free | $0 (3 users) | Modern UI, auto-enrichment | Limited records and features |
| Attio Plus | Paid | $29/user/mo | Flexible data model, AI-native | Smaller integration ecosystem |

### Artifact Component

**CRM Comparison Scorecard (HubSpot vs Attio)** — Feature-by-feature matrix scored for solo founder relevance (not enterprise).

### Interactive Element

**Guided Build:** AI wizard asks about your sales motion, volume, budget, and integration needs, then recommends HubSpot or Attio with reasoning.

---

## LESSON 3: Folk & Close: Relationship vs Volume CRMs (55 min)

### Key Topics

1. **Folk CRM Deep Dive** — Lightweight, relationship-first CRM designed for founders who manage deals through personal connections. Chrome extension imports from LinkedIn, Twitter, Gmail.
2. **Folk Pricing** — Free (up to 100 contacts), Standard at $20/user/mo (unlimited contacts, mail merge, enrichment), Premium at $40/user/mo (AI features, advanced reporting)
3. **Close CRM Deep Dive** — Built for outbound sales teams. Built-in calling, SMS, email sequences, power dialer. Designed for high-volume prospecting.
4. **Close Pricing** — Startup at $29/user/mo (1 pipeline, built-in calling), Professional at $59/user/mo (multiple pipelines, power dialer, custom activities)
5. **Pipedrive as Middle Ground** — Visual pipeline, activity-based selling, AI sales assistant. Essential at $14/user/mo, Advanced at $34/user/mo (automation, email sync).
6. **Choosing by Personality** — Folk for relationship builders (consultants, coaches, creator). Close for volume hunters (outbound B2B, cold email). Pipedrive for visual thinkers.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Folk: 100 contacts free, $20/user/mo standard | Folk pricing 2025-2026 | Lightweight but paid barrier hits early |
| Close: built-in calling + sequences from $29/user/mo | Close pricing 2025-2026 | All-in-one for phone-heavy sales |
| Pipedrive: $14/user/mo Essential, $34/user/mo Advanced | Pipedrive pricing 2025-2026 | Best value for visual pipeline management |
| Pipedrive claims 28% more deals closed in first year of use | Pipedrive marketing | Activity-based approach keeps pipeline moving |
| Close users report 30% reduction in tools needed (no separate dialer/sequencer) | Close case studies | Consolidation saves money and complexity |

### Tools to Reference

| Tool | Price Range | Best For | Integration Depth |
|------|-----------|----------|------------------|
| Folk | $0-40/user/mo | Relationship-driven sales, creators, consultants | LinkedIn, Gmail, Twitter import |
| Close | $29-59/user/mo | High-volume outbound, phone sales | Built-in calling, SMS, sequences |
| Pipedrive | $14-34/user/mo | Visual pipeline management, activity-based | 400+ integrations, Zapier |

### Artifact Component

**CRM Selection Decision Tree** — Flowchart: Sales motion → Volume → Budget → Recommended CRM with rationale.

### Interactive Element

**Strategy Duel:** Present two CRM configurations (one Folk-based for relationship selling, one Close-based for volume outbound); student picks and justifies; AI coach critiques reasoning.

---

## LESSON 4: Universal Pipeline Stages Setup (50 min)

### Key Topics

1. **The 6-Stage Pipeline** — Lead → Contacted → Engaged → Meeting → Proposal → Won/Lost. Why these stages work universally.
2. **Stage Definitions with Exit Criteria** — Lead: new contact, not yet reached. Contacted: first outreach sent. Engaged: replied or showed interest. Meeting: call/demo scheduled or completed. Proposal: pricing/terms sent. Won/Lost: deal closed.
3. **Stage-Based Automation Triggers** — Contacted → auto-schedule follow-up at Day 3. Engaged → auto-create meeting task. Meeting completed → auto-send proposal template. No activity 14 days → auto-flag stale.
4. **Pipeline Hygiene Rules** — Max 30 days in any stage before review. Lost deals must have a reason code. Weekly pipeline sweep (15 min).
5. **B2B vs Creator Pipeline Variants** — B2B: standard 6-stage. Creator: Follower → Subscriber → Applicant → Call Booked → Enrolled → Won/Lost.
6. **Multi-Pipeline Setup** — When you need more than one pipeline (inbound vs outbound, different products). Keep to 2 max as a solo founder.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average B2B sales cycle: 84 days (enterprise), 30-45 days (SMB) | Gartner / HubSpot | Solo founders should target <30 days |
| Deals without next steps die 2x faster | InsideSales.com | Every deal needs a scheduled next action |
| Companies with defined stages have 18% higher revenue growth | Harvard Business Review | Structure beats ad-hoc |
| 60% of deals in the average pipeline are already dead | CSO Insights | Pipeline hygiene is a weekly discipline |

### Frameworks & Models

- **The 6-Stage Pipeline**:
  - Stage 1 — Lead: Raw contact, ICP-fit confirmed, no outreach yet
  - Stage 2 — Contacted: First message sent (email, DM, call), awaiting response
  - Stage 3 — Engaged: Prospect replied, showed interest, or clicked
  - Stage 4 — Meeting: Discovery call or demo scheduled/completed
  - Stage 5 — Proposal: Pricing, terms, or offer document sent
  - Stage 6 — Won/Lost: Deal closed (with win/loss reason logged)

- **Exit Criteria Matrix**: Every stage transition requires a specific observable event (not a gut feeling).

### Artifact Component

**Pipeline Stage Map** — Visual diagram with stage definitions, exit criteria, automation triggers, and time-in-stage targets.

### Interactive Element

**Guided Build:** Student maps their actual sales process to the 6-stage pipeline. AI wizard suggests exit criteria and automation triggers based on their CRM choice from Lessons 2-3.

---

## LESSON 5: Email Logging & Contact Enrichment (45 min)

### Key Topics

1. **Why Email Logging Matters** — Every email is a data point. Without logging, your CRM is a memory with amnesia. AI agents need email history to personalize follow-ups.
2. **Setting Up Email Sync** — HubSpot: automatic Gmail/Outlook sync (free tier). Attio: automatic sync. Pipedrive: Advanced tier. Close: built-in. Folk: Gmail extension.
3. **BCC Logging vs Full Sync** — BCC: manual, miss inbound emails. Full sync: automatic, captures both sides. Always prefer full sync.
4. **Contact Enrichment Sources** — CRM built-in (HubSpot, Attio auto-enrich), Apollo.io free tier (10K records/mo), Clay (paid), LinkedIn manual research.
5. **Enrichment Fields That Matter** — Company size, industry, role, LinkedIn URL, last funding event, tech stack (for SaaS), content topics (for creators). Skip everything you won't act on.
6. **Enrichment Automation** — New contact created → trigger enrichment lookup → populate key fields → assign lead score. Zapier/Make recipe.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Email addresses decay at ~2-3% per month | NeverBounce | Regular enrichment keeps data fresh |
| HubSpot free email tracking: 200 open notifications/month | HubSpot 2025-2026 | Enough for solo founders |
| Attio auto-enriches contacts from public data at no extra cost | Attio documentation | Best free enrichment built into a CRM |
| Apollo free tier: 10K records/month for enrichment | Apollo.io 2025-2026 | Supplement CRM-native enrichment |
| Enriched contacts convert 2-3x better than raw imports | Demand Gen Report | Context drives conversion |

### Tools to Reference

| Tool | Function | Price | Integration |
|------|----------|-------|-------------|
| HubSpot Email Tracking | Open/click tracking | Free (200 notifications/mo) | Native |
| Attio Email Sync | Full bidirectional sync | Included | Native |
| Apollo.io | Contact enrichment | Free (10K/mo) / $49/mo | Zapier, API |
| Hunter.io | Email verification | Free (25/mo) / $49/mo | Zapier, API |

### Artifact Component

**Email Logging & Enrichment Setup Checklist** — Step-by-step configuration for the student's chosen CRM, plus enrichment automation recipe.

### Interactive Element

**Guided Build:** Configure email sync for chosen CRM. Build a Zapier/Make automation: new contact → Apollo enrichment → populate CRM fields.

---

## LESSON 6: Deal Tracking & Custom Fields (50 min)

### Key Topics

1. **Deal Record Architecture** — Deal name, amount, stage, close date, owner, associated contacts, associated company. These are non-negotiable.
2. **Custom Fields That Earn Their Place** — Lead source (where they came from), ICP fit score (1-10), engagement score, deal priority (Hot/Warm/Cold), next action date, loss reason
3. **The AI-Ready Schema** — Fields that enable Course 27 agents to reason: structured event log (not free-text notes), health indicators (last contact date, response time, engagement trend), categorical tags (industry, persona, buying stage)
4. **Structured Notes vs Free-Text** — Free-text notes are invisible to AI. Use structured fields: "Last Objection" (dropdown), "Champion Identified" (yes/no), "Decision Timeline" (date), "Competitor Mentioned" (multi-select).
5. **Activity Timeline** — Every interaction logged with type (email, call, meeting, note), date, and outcome. This becomes the AI reasoning chain.
6. **Field Naming Conventions** — Prefix with category (fit_, signal_, deal_, note_). Use snake_case for API compatibility. Keep display names human-readable.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Agentic CRM: agents retrieve knowledge, summarize, recommend, and update CRM as a conversational layer | AWS AI Agents Enterprise Guide | The future of CRM is agent-driven |
| 20-40% reduction in research/CRM time with agentic systems | BCG 2025 | AI needs structured data to deliver this |
| Only 18% of CRM data is structured enough for AI analysis | Gartner 2024 | Most CRMs are free-text graveyards |
| Structured fields are 5x more useful for AI agents than free-text notes | Practical AI implementation data | Design for machines, display for humans |

### Frameworks & Models

- **The AI-Ready Field Schema (Template)**:
  - **Contact Fields**: name, email, company, role, linkedin_url, icp_fit_score (1-10), disc_type (D/I/S/C), lead_source, first_contact_date
  - **Deal Fields**: deal_name, amount, stage, close_date, priority (Hot/Warm/Cold), lead_source, competitor_mentioned, champion_identified (Y/N), decision_timeline
  - **Event Log Fields**: event_type (email_sent, email_received, call, meeting, note), event_date, event_outcome (positive/neutral/negative), next_action, next_action_date
  - **Health Indicators**: days_since_last_contact, avg_response_time_hours, engagement_trend (up/flat/down), meetings_held_count, emails_exchanged_count

- **The "Would an Agent Understand This?" Test**: Before saving any note, ask: could a GPT-4 class model extract the key insight from this field without additional context? If not, structure it.

### Artifact Component

**AI-Ready Field Schema Document** — Complete field list with names, types, dropdowns, and AI-reasoning annotations. Exportable as JSON for Course 27 agent configuration.

### Interactive Element

**Schema Designer:** Drag-and-drop fields into categories (Contact, Deal, Event, Health). AI suggests enrichment prompts per field. Linter flags free-text fields that should be structured.

---

## LESSON 7: CRM Hygiene: Keeping Data Clean (45 min)

### Key Topics

1. **The Weekly 15-Minute Sweep** — Review stale deals (no activity 14+ days), update stages, close dead deals, verify next actions. Non-negotiable ritual.
2. **Duplicate Detection & Merge** — HubSpot: built-in dedupe. Attio: automatic merging. Pipedrive: merge tool. Schedule monthly dedupe check.
3. **Data Decay Management** — Contacts change jobs every 2-3 years. Emails decay 2-3%/month. Run quarterly verification on active pipeline contacts.
4. **Stale Deal Protocol** — 14 days no activity: flag yellow. 30 days: flag red. 45 days: move to Lost with reason "Gone Dark." Exception: deals with scheduled next action.
5. **The "One Source of Truth" Rule** — If data lives in both your CRM and a spreadsheet, one is wrong. CRM is the authority. Kill the spreadsheet.
6. **Hygiene Automation** — Auto-flag deals without next action. Auto-archive contacts with bounced emails. Auto-tag contacts who haven't engaged in 90 days.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| CRM data decays at ~30% per year | Salesforce / ZoomInfo | Without hygiene, your CRM is 30% lies |
| Average sales team wastes 27% of time on bad data | Dun & Bradstreet | Solo founders waste even more (no data team) |
| 60% of pipeline is typically already dead | CSO Insights | Hygiene turns 60% dead into 20% dead |
| Job tenure averages 2.3 years for roles <Director level | Bureau of Labor Statistics | Champion changed jobs? Update or lose the deal |

### Frameworks & Models

- **The 15-Minute Weekly Sweep Protocol**:
  1. Filter deals with no activity in 14+ days (3 min)
  2. Update or close each stale deal (5 min)
  3. Verify every deal has a next action with a date (3 min)
  4. Check for new duplicates and merge (2 min)
  5. Review lost deals for pattern insights (2 min)

- **Stale Deal Escalation Ladder**: 14 days → Yellow flag + personal follow-up task. 30 days → Red flag + "break-up" email task. 45 days → Auto-move to Lost.

### Artifact Component

**CRM Hygiene Checklist** — Weekly, monthly, and quarterly hygiene tasks with automation recipes.

### Interactive Element

**Simulation:** Student receives a CRM with 20 sample deals in various states of decay. Must triage each deal (advance, follow up, close as lost, merge) within a time limit. AI scores accuracy.

---

## LESSON 8: Choosing by Sales Motion (B2B vs Creator) (45 min)

### Key Topics

1. **B2B Volume Motion** — High outbound volume (100+ emails/week), multiple pipeline stages, deal-centric, needs sequences and calling. Best CRMs: Close ($29/mo), HubSpot + Instantly, Pipedrive ($14/mo).
2. **B2B Relationship Motion** — Lower volume, higher touch, longer cycles, multi-threading. Best CRMs: HubSpot (free or Starter), Attio ($29/mo).
3. **Creator/Coach Motion** — Audience-first, application funnels, enrollment calls, community overlap. Best CRMs: Folk ($20/mo), HubSpot Free, Attio.
4. **The Decision Matrix** — Score each CRM on: (1) Price, (2) Ease of use, (3) Automation depth, (4) Integration breadth, (5) AI-readiness, (6) Match to your motion.
5. **Hybrid Motions** — Many solo founders run both inbound and outbound. Use one CRM with two pipelines, not two CRMs.
6. **The "Good Enough" Principle** — Pick one, configure it well, use it for 90 days. Switching CRMs every quarter is worse than any individual CRM's shortcomings.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| B2B outbound founders send 100-500 emails/week | Course 24 data | Volume motion needs robust sequences |
| Creator enrollment calls convert at 20-40% from warm audience | Course 31 data | Relationship motion needs notes and context, not volume |
| CRM switching costs: 20-40 hours of setup, 2-4 weeks of disrupted workflow | Industry estimates | Don't switch without a compelling reason |

### Frameworks & Models

**CRM Selection Matrix:**

| Criteria | HubSpot Free | HubSpot Starter | Attio Plus | Folk Standard | Close Startup | Pipedrive Essential |
|----------|-------------|----------------|-----------|--------------|--------------|-------------------|
| Price | $0 | $20/mo | $29/mo | $20/mo | $29/mo | $14/mo |
| B2B Volume | Good | Better | Good | Fair | Best | Good |
| B2B Relationship | Good | Good | Best | Good | Fair | Fair |
| Creator/Coach | Good | Good | Good | Best | Poor | Fair |
| Automation | None | Basic | Good | Basic | Good | Good |
| AI-Readiness | Good | Good | Best | Fair | Fair | Fair |
| Integrations | Best | Best | Good | Fair | Good | Good |

### Artifact Component

**CRM Decision Matrix (Completed)** — Personalized matrix with scores based on the student's specific context, budget, and sales motion.

### Interactive Element

**CRM Selection Wizard:** AI asks 8 questions (motion type, volume, budget, integration needs, AI plans, team size, phone usage, relationship depth) and generates a scored recommendation with reasoning.

---

## LESSON 9: Migration: Moving Between CRMs Without Losing Data (45 min)

### Key Topics

1. **When Migration Makes Sense** — You've outgrown free tier and the paid tier doesn't fit. Your sales motion changed. You need features the current CRM can't provide. You're spending more time fighting the CRM than using it.
2. **When Migration Doesn't Make Sense** — You're just bored of the UI. You saw a shiny new tool. You haven't actually maxed out your current CRM's capabilities.
3. **The Migration Checklist** — (1) Export all contacts, deals, notes, activities. (2) Map fields between old and new CRM. (3) Test import with 20 records. (4) Full import. (5) Verify data integrity. (6) Rebuild automations. (7) Update integrations.
4. **Data Mapping Pitfalls** — Custom fields that don't transfer. Activity history that gets flattened. Pipeline stages that don't map 1:1. Tags vs properties confusion.
5. **Preserving AI-Ready Data** — Structured event logs must maintain their structure. Don't let migration flatten structured fields into free-text notes.
6. **Post-Migration Validation** — Spot-check 10% of records. Verify pipeline totals match. Confirm email sync works. Test automations on a sample deal.

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| CRM migration costs 20-40 hours of setup time | Industry estimates | Plan for a 1-2 week project |
| 15-25% of data is lost or corrupted in typical CRM migrations | CRM consultant reports | Test imports prevent this |
| Most CRMs support CSV import/export | Universal | Lowest-common-denominator migration path |
| HubSpot-to-Attio and Pipedrive-to-HubSpot have native migration tools | HubSpot / Attio | Check for native migration before going CSV |

### Frameworks & Models

- **The Migration Decision Framework**: (1) Am I using >80% of current CRM features? (2) Is the blocker a feature gap or a usage gap? (3) Will migration disruption cost me active deals? (4) Can I migrate during a slow period?
- **Field Mapping Template**: Old CRM Field → New CRM Field → Transformation needed (e.g., "Status: Active/Inactive" → "Lifecycle Stage: Customer/Former Customer")

### Artifact Component

**CRM Migration Checklist & Field Mapping Template** — Step-by-step migration plan with field mapping spreadsheet and validation protocol.

### Interactive Element

**Guided Build:** Student maps their current CRM fields to a target CRM. AI identifies data that would be lost and suggests preservation strategies.

---

## LESSON 10: Your CRM Setup Checklist (45 min)

### Key Topics

1. **The Complete CRM Setup Review** — Walk through all 9 lessons' artifacts and verify completeness
2. **The 7-Day CRM Sprint** — Day 1: Choose CRM, create account. Day 2: Configure pipeline stages. Day 3: Set up email sync and enrichment. Day 4: Build AI-ready field schema. Day 5: Import existing contacts and deals. Day 6: Configure automations (stale deal flags, follow-up reminders). Day 7: Test everything with 5 real contacts.
3. **Integration Verification** — CRM connects to: email (sync), calendar (meetings), Zapier/Make (automations), outreach tools (Instantly, etc.), enrichment (Apollo).
4. **AI-Readiness Audit** — Review field schema against Course 27 agent requirements. Verify structured event logging works. Test that an LLM can reason on a sample contact's data.
5. **The Weekly CRM Rhythm** — Monday: review pipeline (15 min). Wednesday: log meeting notes (as they happen). Friday: 15-minute hygiene sweep.
6. **Handoff to Course 41** — Your CRM is now the data source for all analytics and dashboards built in Course 41.

### Frameworks & Models

**7-Day CRM Sprint:**

| Day | Activity | Output |
|-----|----------|--------|
| 1 | Choose CRM, create account, invite any collaborators | Account live |
| 2 | Configure 6-stage pipeline with exit criteria | Pipeline active |
| 3 | Set up email sync and enrichment automation | Emails logging |
| 4 | Build AI-ready field schema (contact + deal + event + health) | Schema deployed |
| 5 | Import existing contacts and map to new schema | Data migrated |
| 6 | Configure 3 automations: stale flags, follow-ups, notifications | Automations live |
| 7 | Test with 5 real contacts, verify end-to-end | System validated |

**AI-Readiness Score (1-10):**
- 1-3: Free-text notes, no structure, no event logging
- 4-6: Some structured fields, basic pipeline, email sync
- 7-8: Full AI-ready schema, structured events, health indicators
- 9-10: Schema + automations + tested with AI agent queries

### Artifact Component

**Complete CRM Setup Checklist** (Primary Course Artifact) — Compiles all lesson artifacts: CRM Philosophy Statement, Comparison Scorecard, Decision Matrix, Pipeline Map, Field Schema, Hygiene Checklist, Migration Plan. Includes AI-Readiness Score.

### Interactive Element

**Implementation Sprint Launcher:** AI generates personalized 7-day sprint calendar. Daily check-ins verify setup progress. Day 7 review scores AI-readiness and identifies gaps.

---

## TOOL PRICING SUMMARY

### Budget Options

| CRM | Free Tier | Paid Solo Tier | Best For |
|-----|-----------|---------------|----------|
| HubSpot | $0 (unlimited contacts, 1 pipeline) | $20/seat/mo Starter | Beginners, ecosystem |
| Attio | $0 (3 users, limited) | $29/user/mo Plus | AI-native, modern UX |
| Folk | $0 (100 contacts) | $20/user/mo Standard | Relationship selling, creators |
| Close | None | $29/user/mo Startup | Volume outbound, phone sales |
| Pipedrive | None | $14/user/mo Essential | Visual pipeline, value pricing |

### Recommended Starting Points
- **$0/mo**: HubSpot Free (most generous free tier, largest ecosystem)
- **$14-20/mo**: Pipedrive Essential or Folk Standard (if you need more than HubSpot Free offers)
- **$29/mo**: Attio Plus (if AI-readiness is a priority) or Close Startup (if phone-heavy)

---

## ALL ARTIFACTS CREATED

1. CRM Philosophy Statement (L1)
2. CRM Comparison Scorecard — HubSpot vs Attio (L2)
3. CRM Selection Decision Tree — Folk, Close, Pipedrive (L3)
4. Pipeline Stage Map with exit criteria and automations (L4)
5. Email Logging & Enrichment Setup Checklist (L5)
6. AI-Ready Field Schema Document (L6)
7. CRM Hygiene Checklist — weekly, monthly, quarterly (L7)
8. CRM Decision Matrix — personalized by sales motion (L8)
9. CRM Migration Checklist & Field Mapping Template (L9)
10. Complete CRM Setup Checklist (L10) — compiles all above

**Completion Badge:** "CRM Architect" — 200 XP
