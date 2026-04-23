# Solo GTM OS — Complete Product Analysis

> Generated 2026-03-31 via deep codebase analysis. **This is the canonical platform
> reference** — supersedes all prior audits and analyses (archived to `_archive/old-docs/`).
> When in doubt about what the platform is or does, start here.

## Executive Summary

SoloFrameHub V3 is a **vertically-integrated go-to-market operating system** for solo founders.
It combines structured education, AI coaching, sales execution tools, cohort-based community,
and gamification into a single platform. This is closer to **Salesforce + Coursera + a personal
GTM coach** unified for solo founders than any single product category.

---

## 1. Structured Curriculum

**49 courses across 7 tracks, 200+ lessons, bilingual (EN + ES)**

| Track                     | # Courses      | Focus                                                                                             |
| ------------------------- | -------------- | ------------------------------------------------------------------------------------------------- |
| 1. Foundations            | 5 (46 lessons) | Sales psychology, ICP, positioning, acquisition paths, list building                              |
| 2. Marketing Engine       | 8              | Content, SEO/AEO, LinkedIn, cold email, community, email nurture, social proof, automation        |
| 3. Sales Methodology      | 8              | DISC personas, discovery, demos, objections, proposals, closing, pipeline                         |
| 4. AI-Powered Acquisition | 7              | AI strategy, deliverability, lead research, outreach, LinkedIn AI, autonomous SDRs, custom agents |
| 5. Creator Economy        | 8              | Mindset, audience conversion, webinars, DM selling, metrics, scaling, community-led sales         |
| 6. Customer Success       | 4              | Onboarding, retention, expansion, advocacy                                                        |
| 7. Operations & Systems   | 9              | CRM, analytics, automation, outsourcing, playbook, scaling, legal, finance, capstone              |

- **All 49 courses published** with complete MDX lessons + metadata
- Lessons are **6,000-18,000 words each** with 6+ interactive elements
- Full **Spanish translations** mirror the English directory structure
- MDX-based with 31 interactive components embedded inline

---

## 2. Interactive Learning Components (31 types)

Not passive reading. Every lesson contains hands-on exercises.

### Tier 1: Assessment & Scoring

- **AssessmentEngine** — Likert (1-5/7-point) + scenario quizzes, composite scoring, tier-based feedback
- **AILessonCoach** — 3 questions/lesson, RAG-powered, persisted conversation history
- **TimedChallenge** — Countdown exercises with performance scoring

### Tier 2: Builders & Workshops

- **ICPWorkshop** — 13-step interactive ICP builder with golden segment calculator
- **GoldenSegmentCalculator** — 4-point scoring matrix, auto-tier mapping
- **PersonaBuilder** — Multi-dimension DISC persona builder with auto-lock on completion
- **TemplateBuilder** — Form-based artifact builder with auto-save
- **ComparisonBuilder** — Side-by-side comparison tables
- **ArtifactExercise** — 10 saveable deliverable types (ICP doc, email sequences, playbook, etc.)

### Tier 3: Practice & Simulation

- **MiniRoleplay** — Single-turn conversation practice within lessons
- **DecisionTree** — Branching scenario navigation
- **StrategyDuel** — Pick A vs B with justification, expert verdict reveal
- **SwipeDecision** — Swipe/click cards for binary evaluation
- **ClassifyExercise** — Categorization exercises with feedback
- **RewriteExercise** — Before/after improvement with AI feedback
- **ScenarioSimulator** — Real-world scenario simulation
- **LinterFeedback** — AI-generated quality scores on artifacts
- **PredictionGate** — Predict outcomes before reveal (calibration training)

### Tier 4: Content & Engagement

- **SlideNavigation** — Multi-slide framework with progress bar, keyboard support
- **EnhancedAccordion** — Collapsible sections with smooth animation
- **ProgressiveReveal** — Expandable content sections
- **InsightCard**, **ExampleCard**, **StepCard**, **TakeawayBox** — Styled content blocks
- **ConceptReframe** — Multi-lens concept explanation (founder vs coach vs consultant)
- **FlipCard** — 3D flip question/answer pairs
- **ContextualNote** — Side notes and tips
- **InteractiveChecklist** — Persistent checkboxes with completion percentage
- **RangeSlider** — Scale input with localStorage persistence

### Persistence Convention

All stateful components use `persistKey` format: `{courseId}-{lessonId}-{descriptor}`

```
slider-sales-psych-L1-dread
checklist-course1-lesson3-action-items
assessment-course2-lesson1
workshop-icp-workshop
persona-disc-primary
```

---

## 3. AI Coaching System

### Solo Advisor (Chat Coach)

- Multi-provider AI (OpenAI, Anthropic Claude, OpenRouter via `AI_PROVIDER` env)
- **Context-aware**: references user's profile, DISC type, assessment scores, completed artifacts, uploaded documents, current lesson progress
- **RAG pipeline**: pgvector embeddings over 200+ lesson chunks + user-uploaded documents (OpenAI `text-embedding-3-small`, 1536 dims, cosine similarity threshold 0.3)
- **Framework-based**: introduces ICP Framework, Prescription Frame, MVQ Framework, Diagnostic Discovery, etc.
- Adapts tone to user's DISC personality type

### Coaching Nudges (6 rule-based types)

| Type                  | Trigger                                 | Example                                                                  |
| --------------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| Outreach gap          | No activity 3+ days with active deals   | "You have 3 open deals but no outreach in 4 days"                        |
| Pipeline stale        | Deal in same stage 7+ days              | "Your deal with Acme has been in Proposal for 9 days"                    |
| Assessment weakness   | Score < 40% on dimension                | "Your ICP Clarity is at 35% — Course 1 can help"                         |
| Artifact missing      | Enough courses but artifact not created | "You've completed Course 2 but haven't saved your Positioning Statement" |
| Streak risk           | Active streak but no activity today     | "Your 7-day streak is at risk!"                                          |
| Milestone approaching | Close to next XP level                  | "42 XP to Level 5"                                                       |

---

## 4. Sales Roleplay Simulator

- **12-dimensional context**: founder category x industry x buyer role x DISC type
- **4 founder categories**: Reluctant Seller, Imposter, Overconfident, Proven Operator
- **3 methodologies**: MEDDIC, SPIN, CHALLENGER
- **Voice mode**: speech-to-text recording + text-to-speech playback
- **Adaptive difficulty**: easier for user's strong DISC types, harder for weak types
- **Scoring**: 0-100 per session with AI-generated strengths/improvements
- Full transcripts saved to database
- Badge triggers when average score >= 75

---

## 5. Sales Execution Tools

### Pipeline/Deal Tracker

- Kanban board: Lead -> Contacted -> Meeting -> Proposal -> Won -> Lost
- Deal data: prospect name/company, LinkedIn, email, value, probability, close date, notes
- Stage transition tracking, loss reason logging
- Deal value aggregation & conversion rates

### Outreach Logger

- Channels: Email, LinkedIn, Phone, Twitter, WhatsApp, Event, Other
- Actions: Initial outreach, Follow-up, Meeting booked, Meeting held, Proposal sent
- Outcomes: Positive, Neutral, Negative, Pending
- 7-day stats dashboard with per-channel breakdowns

### Integrations

- **Attio CRM** — Two-way deal sync with encrypted token storage
- **Notion** — OAuth2 artifact/playbook export
- **Hunter.io** — Domain email discovery for prospecting
- **Chatwoot** — Help center + live chat support widget

---

## 6. Community & Cohort Pods

### DISC-Based Pod Matching

- Groups of <= 6 founders matched by:
  - Personality diversity (DISC complementarity)
  - Deal-size clustering
  - Industry mix
  - Curriculum stage alignment (+/-1 stage)
- Pod health scoring based on engagement metrics

### AI Facilitator Bot (3-day rhythm via n8n cron)

| Day       | Post Type                                |
| --------- | ---------------------------------------- |
| Monday    | Weekly kickoff — introduces week's theme |
| Wednesday | Mid-week nudge — encourages engagement   |
| Friday    | Weekly synthesis & next-week teaser      |

### 4 AI Personas Per Pod

| Persona | DISC              | Role                                    |
| ------- | ----------------- | --------------------------------------- |
| Alex    | D (Dominant)      | Skeptic — challenges assumptions        |
| Jordan  | I (Influential)   | Builder — action-oriented encouragement |
| Morgan  | C (Conscientious) | Perfectionist — detail-focused feedback |
| Sam     | S (Steady)        | Mentor — supportive guidance            |

Personas have **fade-out logic**: reduce bot posts as human engagement exceeds 90%.
Bot cooldown: minimum 4-hour gaps between persona posts.

### NodeBB Forum Structure

- Academy-Wide: Announcements, Wins, General
- Pods: Dynamic per-cohort private categories
- Course Discussions: Foundation, Lead Gen, Sales
- Resources: Templates, Tools, Book Club

---

## 7. Gamification Layer

### XP & Leveling

- XP earned per lesson completion, quiz passes, artifact saves, roleplay sessions
- 9+ named levels from 200 XP to 8000+ XP
- Milestone notifications when approaching next level

### Streaks

- Daily lesson activity tracking (timezone-aware)
- 1-day grace window
- Milestones: 3, 7, 14, 30 days
- Streak-risk nudges when at risk of breaking

### Badges (40+ across 6 categories)

| Category  | Examples                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------- |
| Milestone | First Lesson, Course Complete, Track Complete, Halfway (24 courses), Academy Graduate (48 courses) |
| Streak    | 3-day, 7-day, 14-day, 30-day                                                                       |
| XP        | 100, 500, 1000, 2500, 5000 XP thresholds                                                           |
| Artifact  | First artifact, ICP complete, 5 artifacts, 10 artifacts                                            |
| Roleplay  | First roleplay, Roleplay Ace (90+), 10 sessions                                                    |
| Community | First post, 5 upvotes earned                                                                       |

**4 tiers**: Bronze -> Silver -> Gold -> Platinum

---

## 8. Readiness Assessment (Lead Magnet)

Public at `/readiness-score` — 8-dimension founder readiness quiz:

1. ICP Clarity
2. Positioning Strength
3. Messaging Consistency
4. Channel Readiness
5. Sales Process Maturity
6. Quick Wins identification
7. Critical Gaps identification
8. Personalized learning path recommendation

Generates: overall score (0-100), dimension scores, recommended starting course, recommended GTM path (Foundation/Lead Gen/Sales Conversion).

---

## 9. Saveable Artifacts (10 types)

Every artifact is versioned (last 5 versions), course-associated, timestamped, and referenced by the AI coach.

1. **ICP Document** — Ideal Customer Profile (Course 1)
2. **Positioning Statement** — Value articulation (Course 2)
3. **Value Proposition Canvas** — Problem/solution mapping (Course 2)
4. **Acquisition Path** — Channel strategy (Course 3)
5. **List-Building Criteria** — Prospect sourcing rules (Course 4)
6. **DISC Profile** — Personal sales style
7. **Discovery Playbook** — Qualification framework (Course 14)
8. **Objection Library** — Versioned objection responses
9. **Email Sequences** — Outreach templates (Course 8)
10. **Personal Sales Playbook** — Complete ops manual (Course 44)

---

## 10. Certification

**Certified Solo GTM Practitioner** (via Badgr, open badge standard)

Requirements:

- All Track 1 (Foundations) courses complete (0-4)
- All Track 3 (Sales Methodology) complete (13-20)
- Roleplay average score >= 75

---

## 11. Personalization Depth

### Onboarding Captures 48+ Fields

- Business model, industry, deal size, revenue range, customer count
- DISC personality profile (primary + secondary type)
- Founder category (Reluctant Seller, Imposter, Overconfident, Proven Operator)
- Learning style + time commitment (5-10h, 10-15h, 15-20h, 20h+)
- Target roles, sales journey stage, success goals (90 days)
- Optional LinkedIn analysis for business signal extraction

### AI-Inferred Context

- ICP summary with confidence scores
- Value proposition
- Competitive positioning
- Pricing structure
- Industry vertical
- Common objections
- Typical use cases

### Dashboard Personalization

- **Acquisition Health Widget** — 5 readiness dimensions with color-coded scores and deltas
- **Journey Map** — Multi-phase timeline showing Foundation -> Lead Gen -> Sales Conversations
- **Next Actions** — Prioritized by impact from quick wins + critical gaps + roleplay suggestions
- **Coaching Nudges** — Rule-based, context-aware, dismissible

---

## 12. Platform Scale

| Metric                 | Count                                                                |
| ---------------------- | -------------------------------------------------------------------- |
| Page routes            | 99                                                                   |
| API endpoints          | 96                                                                   |
| Interactive components | 31                                                                   |
| Dashboard widgets      | 14                                                                   |
| Chart types            | 12+                                                                  |
| Courses                | 49 (all published)                                                   |
| Lessons                | 200+                                                                 |
| Badge definitions      | 40+                                                                  |
| Artifact types         | 10                                                                   |
| Languages              | 2 (English + Spanish)                                                |
| Database integrations  | 7 (PostgreSQL, NodeBB, Attio, Notion, Hunter.io, Listmonk, Chatwoot) |

---

## 13. Tech Stack

- **Framework**: Next.js 16.1.6 (Turbopack, standalone output)
- **Styling**: Tailwind CSS v4
- **Auth**: Lucia + Drizzle ORM + PostgreSQL
- **AI**: Multi-provider (OpenAI, Anthropic Claude, OpenRouter)
- **RAG**: pgvector + OpenAI embeddings
- **Storage**: S3/MinIO
- **Deployment**: Dokploy on VPS (46.202.88.248)
- **Background Jobs**: n8n (n8n.soloframehub.com)
- **Forum**: NodeBB (Docker compose, internal network)
- **Email**: Listmonk
- **Support**: Chatwoot CE
- **Analytics**: Metabase
- **Payments**: Polar.sh
- **DNS/CDN**: Cloudflare (proxied, Full Strict SSL)
- **TLS**: Let's Encrypt via Traefik

---

## 14. Subscription & Pricing

| Tier    | Price        | Status    |
| ------- | ------------ | --------- |
| Beta    | Free         | Current   |
| Monthly | $29.95/mo    | Post-beta |
| Annual  | $259.95/year | Post-beta |

7-day free trial after beta period ends. Payments via Polar.sh.

---

## 15. Competitive Positioning

This platform is **not** a course marketplace, a generic LMS, or an AI chatbot wrapper. It is:

- **Learning that produces deliverables** — every lesson builds toward a saveable artifact
- **AI coaching with full business context** — not generic advice, references your actual ICP doc, deal pipeline, and uploaded materials
- **Community with structure** — DISC-matched pods with AI facilitators, not a Discord free-for-all
- **Execution tools built in** — pipeline tracker, outreach logger, CRM sync mean you do the work inside the platform
- **Gamification for the hard part** — XP, streaks, badges drive retention through the painful early stages of solo selling
- **Personalized from day one** — 48-field onboarding + 8-dimension assessment shapes every recommendation

The closest comparable would be assembling: HubSpot Academy (education) + Gong (roleplay) + Pipedrive (CRM) + Circle (community) + a personal gtm coach — into one integrated experience purpose-built for solo founders.
