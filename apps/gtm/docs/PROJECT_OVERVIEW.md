# Solo GTM OS — Complete Platform Reference

**Solo GTM OS** (SoloFrameHub v3) is a full-stack, AI-powered operating system purpose-built for solo technical founders who need to learn and execute systematic customer acquisition — from first principles through to closing deals, managing pipelines, and scaling their go-to-market engine.

This is not a course platform with a chatbot bolted on. It is an integrated learning environment, AI coaching system, sales execution toolkit, community platform, and certification program — all running on a single Next.js application backed by PostgreSQL, Redis, and a constellation of purpose-built services.

---

## Table of Contents

1. [Platform Architecture](#platform-architecture)
2. [Technology Stack](#technology-stack)
3. [The Academy — 49 Courses, 487 Lessons](#the-academy)
4. [AI Systems — Multi-Provider Intelligence Layer](#ai-systems)
5. [Sales Execution Toolkit](#sales-execution-toolkit)
6. [Community & Cohort Learning System](#community--cohort-learning-system)
7. [Gamification & Progression Engine](#gamification--progression-engine)
8. [The Book — Integrated Digital Publication](#the-book)
9. [Certification Program](#certification-program)
10. [Interactive MDX Component Library](#interactive-mdx-component-library)
11. [Authentication & Authorization](#authentication--authorization)
12. [Payments & Subscription](#payments--subscription)
13. [Database Architecture](#database-architecture)
14. [External Integrations](#external-integrations)
15. [Public Lead Capture System](#public-lead-capture-system)
16. [Background Jobs & Automation](#background-jobs--automation)
17. [Deployment Infrastructure](#deployment-infrastructure)
18. [Security Architecture](#security-architecture)
19. [Analytics & Business Intelligence](#analytics--business-intelligence)
20. [Internationalization](#internationalization)
21. [Development & Testing](#development--testing)
22. [Environment Configuration](#environment-configuration)
23. [Project Structure](#project-structure)

---

## Platform Architecture

The platform is organized around **eight route groups**, each with its own layout, navigation, and access control:

| Route Group        | Purpose                                                                                                     | Auth Required                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `(auth)`           | Sign in, sign up, email verification, password reset                                                        | No                               |
| `(onboarding)`     | Multi-step founder profiling — business info, goals, DISC assessment, AI analysis                           | Yes                              |
| `(default)`        | The main platform — dashboard, academy, community, coach, roleplay, settings, pipeline, outreach, analytics | Yes                              |
| `(book)`           | Online book reader with full-text search and reading progress                                               | No (paywall on premium chapters) |
| `(public)`         | Public-facing pages — readiness score quiz, certification criteria, dynamic forms, comparison page          | No                               |
| `(double-sidebar)` | Messaging inbox and community profile pages                                                                 | Yes                              |
| `(pay)`            | Payment processing flows                                                                                    | Varies                           |
| `(alternative)`    | Component library showcase, finance demos, utility pages (FAQ, roadmap, changelog)                          | No                               |

**Middleware** handles www-to-non-www redirects, session-based root routing (authenticated users → dashboard, public → marketing homepage), platform subdomain handling, legacy URL redirects, and static directory rewrites for the blog and Spanish content.

**Total Surface Area:**

- ~74 distinct pages across all route groups
- 90+ REST API endpoints across 20+ categories
- Static marketing website served via HTML (English + Spanish)

---

## Technology Stack

| Layer                     | Technology                                                   | Version                   |
| ------------------------- | ------------------------------------------------------------ | ------------------------- |
| **Framework**             | Next.js (App Router, Turbopack, standalone output)           | 16.1.6                    |
| **Language**              | TypeScript                                                   | 5.7.3                     |
| **UI**                    | React                                                        | 19.2.3                    |
| **Styling**               | Tailwind CSS v4 + @tailwindcss/postcss (dark-mode first)     | 4.0.3                     |
| **Auth**                  | Lucia with Drizzle PostgreSQL adapter                        | 3.2.2                     |
| **ORM**                   | Drizzle ORM                                                  | 0.38.0                    |
| **Database**              | PostgreSQL 15 (with pgvector extension)                      | 15.x                      |
| **Caching**               | Redis via ioredis (sessions, rate limiting, ephemeral cache) | 5.8.2                     |
| **AI (Primary)**          | OpenAI API (GPT-4o, GPT-4o-mini)                             | 6.17.0                    |
| **AI (Anthropic)**        | Anthropic SDK (Claude Haiku 4.5, Claude Sonnet 4.6)          | 0.80.0                    |
| **AI (Router)**           | OpenRouter (30+ models, auto-routing)                        | via OpenAI-compatible API |
| **Storage**               | S3-compatible (MinIO self-hosted, Cloudflare R2 ready)       | AWS SDK 3.700.0           |
| **Payments**              | Polar.sh (@polar-sh/nextjs)                                  | 0.9.3                     |
| **Email (Transactional)** | Resend                                                       | 6.9.1                     |
| **Email (Marketing)**     | Listmonk (self-hosted)                                       | v6                        |
| **Forum**                 | NodeBB (Docker, internal network)                            | Latest                    |
| **Background Jobs**       | n8n (self-hosted at n8n.soloframehub.com)                    | Latest                    |
| **CRM**                   | Attio + Pipedrive (BYOK)                                     | API                       |
| **Digital Badges**        | Badgr (Open Badges 3.0)                                      | API                       |
| **Analytics**             | Google Analytics 4 + Umami (self-hosted) + Metabase          | —                         |
| **Support**               | Chatwoot CE (self-hosted)                                    | Latest                    |
| **Testing (Unit)**        | Vitest                                                       | 3.2.4                     |
| **Testing (E2E)**         | Playwright                                                   | 1.57.0                    |
| **Deployment**            | Dokploy on VPS (Traefik + Let's Encrypt)                     | —                         |
| **CDN/DNS**               | Cloudflare (proxied, Full Strict SSL)                        | —                         |

---

## The Academy

The academy is a structured, self-paced curriculum spanning the entire customer acquisition lifecycle for solo technical founders. It is organized into **7 tracks, 49 courses, and 487 lessons**, each with a corresponding quiz.

### Track 1: Foundations (5 courses, 48 lessons)

The strategic bedrock. Sales psychology, ICP definition, positioning, channel selection, and list building.

| #   | Course                                     | Lessons | Focus                                                                             |
| --- | ------------------------------------------ | ------- | --------------------------------------------------------------------------------- |
| 0   | Solo Founder Sales Psychology              | 8       | Avoidance patterns, rejection math, reframing, sustainable rhythm                 |
| 1   | ICP Builder Workshop                       | 13      | 12+ attribute ICP, firmographic/behavioral/psychographic criteria, Golden Segment |
| 2   | Positioning & Value Proposition            | 10      | Messaging framework, differentiation, competitive positioning                     |
| 3   | Choose Your Acquisition Path               | 6       | Channel selection, inbound vs outbound, resource allocation                       |
| 4   | List Building & Prospecting Infrastructure | 11      | Email acquisition, community building, prospect databases                         |

### Track 2: Marketing Engine (8 courses, 88 lessons)

Inbound and outbound marketing channels — from cold email to SEO to community-led growth.

| #   | Course                           | Lessons | Focus                                                               |
| --- | -------------------------------- | ------- | ------------------------------------------------------------------- |
| 5   | Technical Content Engine         | 13      | Developer content, technical blog posts, documentation-as-marketing |
| 6   | SEO & Answer Engine Optimization | 12      | Traditional SEO + AI search optimization (AEO/GEO/LLMO)             |
| 7   | LinkedIn Growth Engine           | 10      | Profile optimization, content strategy, DM outreach                 |
| 8   | Cold Email Mastery               | 12      | Deliverability, sequences, personalization, reply handling          |
| 9   | Community-Based Lead Generation  | 11      | Community strategy, value-first engagement, conversion              |
| 10  | Email Nurture & Newsletter       | 10      | Drip campaigns, segmentation, newsletter growth                     |
| 11  | Social Proof & Referral Systems  | 10      | Testimonials, case studies, referral programs                       |
| 12  | Marketing Automation & Analytics | 10      | Attribution, workflow automation, marketing ops                     |

### Track 3: Sales Methodology (8 courses, 83 lessons)

The complete sales process — from discovery calls through closing, with DISC-based persona training.

| #   | Course                            | Lessons | Focus                                                       |
| --- | --------------------------------- | ------- | ----------------------------------------------------------- |
| 13  | Understanding DISC Buyer Personas | 12      | Dominant, Influential, Steady, Compliant buyer types        |
| 14  | Discovery Framework (BANT/MEDDIC) | 12      | Qualification frameworks adapted for solo founders          |
| 15  | Discovery Call Simulations        | 10      | Practice scenarios with AI feedback                         |
| 16  | Demo Architecture                 | 9       | Structure, storytelling, technical vs business demos        |
| 17  | Objection Handling Database       | 10      | Price, timing, competition, authority, need objections      |
| 18  | Proposals, Pricing & Negotiation  | 10      | Proposal templates, pricing psychology, negotiation tactics |
| 19  | Closing & Next Steps              | 10      | Closing techniques, follow-up cadences, post-close          |
| 20  | Sales Pipeline Management         | 10      | Stage definitions, velocity metrics, forecasting            |

### Track 4: AI Acquisition (7 courses, 76 lessons)

AI-powered customer acquisition — from strategy through autonomous SDR systems.

| #   | Course                                | Lessons | Focus                                                 |
| --- | ------------------------------------- | ------- | ----------------------------------------------------- |
| 21  | AI Acquisition Strategy               | 10      | AI in the sales stack, strategy, tool selection       |
| 22  | Email Deliverability & Infrastructure | 12      | Domain warmup, DNS records, inbox placement           |
| 23  | AI Lead Research & Enrichment         | 10      | Data enrichment, intent signals, lead scoring with AI |
| 24  | AI Outreach Automation                | 12      | Automated sequences, personalization at scale         |
| 25  | LinkedIn AI Applications              | 10      | AI-assisted LinkedIn outreach and content             |
| 26  | Autonomous SDR Systems                | 10      | Building AI SDR agents, workflow design               |
| 27  | Building Custom AI Sales Agents       | 12      | Custom agent development, tool use, deployment        |

### Track 5: Creator Track (8 courses, 72 lessons)

For founders who build audiences — converting followers into customers.

| #   | Course                       | Lessons | Focus                                                    |
| --- | ---------------------------- | ------- | -------------------------------------------------------- |
| 28  | The Creator Sales Mindset    | 8       | Creator-to-seller transition, authenticity in sales      |
| 29  | Audience to Buyer Conversion | 10      | Funnel design, lead magnets, audience segmentation       |
| 30  | Webinar & Challenge Funnels  | 10      | Live events, challenge launches, conversion optimization |
| 31  | Creator Sales Conversations  | 10      | Selling in DMs, on calls, and through content            |
| 32  | DM Selling & Social Commerce | 8       | Platform-specific selling strategies                     |
| 33  | Creator Metrics That Matter  | 8       | Revenue metrics vs vanity metrics, attribution           |
| 34  | Scaling Creator Sales        | 10      | From manual to automated, team building                  |
| 35  | Community-Led Sales          | 8       | Community monetization, hybrid course + community offers |

### Track 6: Customer Success (4 courses, 36 lessons)

Post-sale excellence — onboarding, retention, expansion, and advocacy.

| #   | Course                       | Lessons | Focus                                                   |
| --- | ---------------------------- | ------- | ------------------------------------------------------- |
| 36  | Customer Onboarding          | 10      | Time-to-value, implementation playbooks, health scoring |
| 37  | Retention & Churn Prevention | 10      | Churn signals, save plays, engagement loops             |
| 38  | Expansion & Upsell           | 8       | Land-and-expand, cross-sell timing, price increases     |
| 39  | Customer Advocacy            | 8       | Referral programs, case studies, advisory boards        |

### Track 7: Operations & Systems (9 courses, 84 lessons)

Building the operational infrastructure that turns sales into a repeatable system.

| #   | Course                        | Lessons | Focus                                                        |
| --- | ----------------------------- | ------- | ------------------------------------------------------------ |
| 40  | Advanced CRM Setup            | 10      | CRM architecture, custom fields, workflow automation         |
| 41  | Sales Analytics & BI          | 10      | Dashboard design, KPI tracking, forecasting models           |
| 42  | Sales Automation              | 10      | Workflow design, trigger-based actions, integration patterns |
| 43  | Outsourcing & VAs             | 8       | Delegation frameworks, VA management, SOPs                   |
| 44  | The Sales Playbook            | 10      | Playbook documentation, process codification                 |
| 45  | Scaling to First Sales Hire   | 10      | Hiring, training, compensation, management                   |
| 46  | Sales Legal & Contracts       | 7       | Terms, contracts, liability, compliance                      |
| 47  | Sales Finance & Tax           | 7       | Revenue recognition, sales tax, financial ops                |
| 48  | Multi-Million Dollar Capstone | 12      | Comprehensive capstone integrating all tracks                |

### Lesson Architecture

Every lesson is a Markdown/MDX file with YAML frontmatter (title, duration, track, course, lesson number). Lessons embed **35+ custom interactive React components** directly in the content — not bolted-on widgets, but native MDX elements that render inline with the text. Each lesson has a matching JSON quiz file for assessment. All quizzes support multiple-choice, true/false, single-choice, and AI-evaluated reflection questions.

**Quiz coverage: 100% — every lesson has a quiz.**

---

## AI Systems

The platform runs a multi-provider AI layer supporting OpenAI, Anthropic Claude, and OpenRouter with per-task model routing and a 3-tier override chain (task-specific env var → legacy env var → hardcoded default).

### 16 Distinct AI Task Types

| Task                | Purpose                                                                   | Default Model                  |
| ------------------- | ------------------------------------------------------------------------- | ------------------------------ |
| `coaching`          | Solo Advisor — strategic coaching contextualized by founder profile + RAG | GPT-4o-mini / Claude Haiku 4.5 |
| `roleplay`          | Sales roleplay simulation against DISC-typed buyer personas               | GPT-4o-mini / Claude Haiku 4.5 |
| `roleplay-eval`     | Post-roleplay performance evaluation and scoring                          | GPT-4o-mini / Claude Haiku 4.5 |
| `assessment`        | Founder readiness assessment across 6 dimensions (60s timeout)            | GPT-4o / Claude Sonnet         |
| `mini-assessment`   | Quick assessments within lessons                                          | GPT-4o-mini / Claude Haiku 4.5 |
| `icp-validation`    | ICP scoring against a panel of buyer personas                             | GPT-4o / Claude Sonnet         |
| `website-analysis`  | Audit a founder's website for positioning and messaging                   | GPT-4o / Claude Sonnet         |
| `linkedin-analysis` | Audit a founder's LinkedIn profile                                        | GPT-4o / Claude Sonnet         |
| `rag-extraction`    | Document chunking and context extraction                                  | GPT-4o-mini / Claude Haiku 4.5 |
| `quiz-reflection`   | AI evaluation of open-ended quiz responses                                | GPT-4o-mini / Claude Haiku 4.5 |
| `facilitator`       | Weekly pod facilitation posts (Mon/Wed/Fri rhythm)                        | GPT-4o-mini / Claude Haiku 4.5 |
| `persona`           | Forum persona bot responses with fade-out logic                           | GPT-4o-mini / Claude Haiku 4.5 |
| `tts`               | Text-to-speech (OpenAI voice API)                                         | OpenAI TTS                     |
| `stt`               | Speech-to-text (Whisper)                                                  | OpenAI Whisper                 |
| `workshop`          | Guided workshop content generation                                        | GPT-4o-mini / Claude Haiku 4.5 |
| `daily-digest`      | Daily progress digest email generation                                    | GPT-4o-mini / Claude Haiku 4.5 |

### Solo Advisor (AI Coaching)

The AI coaching system is not a generic chatbot. It operates with a rich context pipeline:

1. **Founder Profile** — business model, stage, industry, elevator pitch, target audience, DISC profile
2. **Assessment Scores** — 6-dimension readiness scores with gap analysis
3. **Course Context** — current lesson, section, and track position
4. **RAG Pipeline** — semantic search over user-uploaded documents (pitch decks, proposals, contracts) via pgvector embeddings (1536-dimensional, OpenAI text-embedding-3-small)
5. **Activity Context** — recent lessons completed, outreach activity, pipeline state

The coaching system supports both the main coach page and a **flyout chat widget** that appears on every lesson page, providing contextual help while studying.

### Sales Roleplay Engine

AI-powered sales simulations against **6 distinct buyer personas**, each with:

- **DISC personality type** (D, I, S, or C) with realistic behavioral traits
- **Industry and company context** (Enterprise SaaS, GenAI Startup, Manufacturing, B2B Tech, Digital Agency, Healthcare)
- **Hidden agendas** that the founder must discover through skillful questioning
- **Common objections** calibrated to difficulty level (Easy, Medium, Hard)
- **Personality quirks** (interrupts meetings, checks phone, asks for free customization, ghosts after setup)

**The personas:**

| Persona                                  | Role                           | DISC            | Difficulty | Hidden Agenda                                                                  |
| ---------------------------------------- | ------------------------------ | --------------- | ---------- | ------------------------------------------------------------------------------ |
| Marcus — The Skeptical CTO               | CTO, Enterprise SaaS           | C (Analytical)  | Hard       | Burned by a vendor security incident; will find any technical excuse to say no |
| Sarah — The Visionary Founder            | CEO, GenAI Startup             | I (Influential) | Medium     | 3 months of cash left; needs a magic bullet or can't buy                       |
| David — The Procurement Gatekeeper       | CFO, Manufacturing             | D (Dominant)    | Hard       | Bonus tied to reducing vendor spend; actively looks for reasons to kill deals  |
| Elena — The Stressed VP of Sales         | VP Sales, B2B Tech             | D (Dominant)    | Medium     | At risk of missing annual number; needs a quick win for the board              |
| Raj — The Overwhelmed Marketing Director | Dir. Marketing, Digital Agency | S (Steady)      | Easy       | Burned out; wants autopilot tools; will ghost if heavy setup required          |
| + Additional persona configurations      | Various                        | Various         | Various    | Various                                                                        |

Each session generates a transcript, AI evaluation with scoring across multiple dimensions, and coaching feedback. Sessions are persisted for progress tracking and can be reviewed later.

### RAG Pipeline (pgvector)

User documents (pitch decks, proposals, PDFs) are processed through:

1. **Chunking** — 800 characters with 100-character overlap
2. **Embedding** — OpenAI text-embedding-3-small (1536 dimensions)
3. **Storage** — PostgreSQL with pgvector extension
4. **Retrieval** — Cosine similarity search, contextualized to the user's query

The RAG pipeline enriches coaching responses with specific references to the user's own materials.

---

## Sales Execution Toolkit

Beyond learning, the platform includes real tools for executing sales:

### Pipeline Manager

A full Kanban-style deal tracker with 6 stages:

- **Lead** → **Contacted** → **Meeting** → **Proposal** → **Won** → **Lost**

Each deal tracks: prospect name/company/email/LinkedIn, deal value (currency-aware), win probability, expected close date, loss reason, internal notes, and syncs bidirectionally with Attio CRM.

### Outreach Tracker

Daily activity logging for sales outreach across channels:

- **Channels**: Email, LinkedIn, Phone, Twitter, Events, Other
- **Actions**: Initial outreach, follow-up, meeting booked, meeting held, proposal sent
- **Outcomes**: Positive, neutral, negative

Generates daily/weekly outreach summaries and feeds into the coaching nudge engine.

### Artifact System

Founders build tangible sales assets throughout the curriculum:

- ICP Document
- Positioning Statement
- Value Proposition
- Cold Email Templates
- Discovery Call Script
- Objection Handling Playbook
- Proposal Template
- Sales Playbook
- Pipeline Configuration
- Competitive Battlecard

Artifacts are created through guided exercises in lessons, stored on the user profile, and can be exported as Markdown, CSV, or HTML.

### AI Workshops

Structured, multi-step workshops that combine teaching with hands-on creation:

1. **Show Current State** — displays what the AI knows about the user from their profile
2. **Teach Framework** — AI-generated lesson using the user's specific business context
3. **Guided Edit** — user drafts their artifact with framework guidance
4. **AI Review** — AI evaluates and suggests improvements
5. **Save Artifact** — persists the final version to their profile

Workshops automatically trigger reassessment of the relevant readiness dimension upon completion.

### Connected Integrations (BYOK)

Users can connect their own tools via OAuth or API keys:

| Integration | Connection Type | Purpose                                 |
| ----------- | --------------- | --------------------------------------- |
| Attio       | OAuth + Webhook | CRM sync — deals, contacts, activity    |
| Pipedrive   | API Key (BYOK)  | CRM sync (popular in LATAM)             |
| Notion      | OAuth           | Export artifacts and notes to workspace |
| Hunter.io   | API Key (BYOK)  | Email finder and domain verification    |

---

## Community & Cohort Learning System

The community system is built on a tight integration between the Next.js application and a self-hosted NodeBB forum, connected via internal Docker networking.

### Pod System (Cohort-Based Learning)

Founders are grouped into **pods of up to 6 members** through an algorithmic matching system that considers:

**Hard Constraints** (must match):

- Curriculum stage (onboarding, stage 1/2/3, alumni)
- Time commitment (part-time, full-time, self-paced)

**Soft Scoring** (optimized):

- DISC profile diversity (pods benefit from complementary personality types)
- Deal size tier (SMB, mid-market, enterprise)
- Industry variety
- Learning goal alignment

Each pod gets its own NodeBB category with threaded discussions, and is managed by:

### AI Facilitator

An AI-powered weekly facilitation rhythm running on n8n cron triggers:

| Day           | Activity         | Purpose                                                                                           |
| ------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| **Monday**    | Weekly Kickoff   | Sets the theme based on curriculum stage, highlights member progress, poses a discussion question |
| **Wednesday** | Mid-Week Nudge   | Engagement prompt, surfaces members who haven't posted, offers encouragement                      |
| **Friday**    | Weekly Synthesis | Summarizes the week's discussions, celebrates wins, previews next week                            |

The facilitator builds context from each member's curriculum progress, engagement score, and recent pod activity.

### AI Personas (Forum Bots)

Four distinct AI personas participate in pod discussions, each with a unique perspective:

| Persona                              | UID | Role                         | Personality                                             |
| ------------------------------------ | --- | ---------------------------- | ------------------------------------------------------- |
| **Alex** — The Aggressive Closer     | 3   | D/I — High energy challenger | Pushes founders to take action, challenges excuses      |
| **Jordan** — The Data-Driven Analyst | 4   | C/D — Analytical             | Asks for metrics, demands evidence, provides frameworks |
| **Sam** — The Consensus Builder      | 6   | S/I — Team-focused           | Supportive, asks about team impact, collaborative       |
| **Morgan** — The Strategic Visionary | 5   | I/D — Ambitious              | Big-picture thinking, connects dots across discussions  |

Personas use a **fade-out algorithm** — they post actively in early weeks, then gradually reduce activity as real members take over the conversation. Post frequency, timing, and fade-out status are tracked per persona per pod.

### Community Features

- **Activity Feed** — Aggregated platform events: lesson completions, badge earnings, artifact creation, community posts
- **Forum Categories** — Academy-wide (Announcements, Wins, General), Course Discussions (Foundation, Lead Gen, Sales), Resources (Templates, Tools, Book Club)
- **Member Directory** — Tile and tab views with profile cards
- **Meetups** — Event creation and listing for virtual/in-person meetups
- **Entrance Survey** — Community onboarding assessment for pod matching
- **User Profiles** — Public profiles showing progress, badges, and activity

### NodeBB Integration Architecture

- **API Pattern**: Master token with `_uid` parameter in every request
- **Network**: Internal Docker network (Cloudflare blocks external API calls)
- **Sync**: Bidirectional — topics and posts mirrored to PostgreSQL for analytics
- **Webhooks**: NodeBB → Next.js for real-time event processing
- **Category CIDs**: Academy-Wide (6-9), Pods parent (10), Course Discussions (11-14), Resources (15-18)

---

## Gamification & Progression Engine

### XP System (10 Levels)

| Level | Title        | Min XP | Level | Title            | Min XP |
| ----- | ------------ | ------ | ----- | ---------------- | ------ |
| 1     | Beginner     | 0      | 6     | Expert           | 1,500  |
| 2     | Novice       | 100    | 7     | Master           | 2,500  |
| 3     | Apprentice   | 300    | 8     | Grandmaster      | 4,000  |
| 4     | Journeyman   | 600    | 9     | Legend           | 6,000  |
| 5     | Practitioner | 1,000  | 10    | Academy Champion | 10,000 |

XP is earned through lesson completions, quiz performance, roleplay sessions, and artifact creation.

### Badge System (24 Badges, 4 Tiers)

Badges are organized across 6 categories with bronze → silver → gold → platinum progression:

**Milestone Badges**: First Steps (1st lesson), Foundation Layer (1st course), Track Master (full track), Halfway There (24 courses), OS Graduate (all courses)

**Streak Badges**: Getting Going (3 days), Week Warrior (7 days), Two-Week Titan (14 days), Month of Mastery (30 days)

**XP Badges**: Novice Seller (100 XP), Apprentice (500 XP), Journeyman (1,000 XP), Expert (2,500 XP), Master Closer (5,000 XP)

**Artifact Badges**: Builder (1st artifact), ICP Architect (ICP complete), Half a Playbook (5/10 artifacts), Playbook Master (all 10)

**Roleplay Badges**: First Pitch (1st session), Practice Pro (10 sessions), Sales Ace (90+ score)

**Community Badges**: Voice Found (1st post), Helpful Hand (5 upvotes)

### Celebration System

A React context-based celebration engine that orchestrates:

- **Confetti bursts** (gold, stars, default) with canvas-based physics simulation
- **Badge earned modals** with tier-specific gradient backgrounds and glow effects
- **Level-up overlays** showing progression
- **Streak toasts** with milestone messaging

Celebrations are queued and displayed sequentially to avoid overlapping.

### Coaching Nudge Engine

A rule-based engine (no AI call required) that generates 3 proactive coaching nudges per dashboard visit:

| Nudge Type              | Trigger                            |
| ----------------------- | ---------------------------------- |
| `outreach_gap`          | No outreach logged recently        |
| `pipeline_stale`        | Deals stuck in a stage too long    |
| `assessment_weakness`   | Low score in a readiness dimension |
| `artifact_missing`      | Required artifact not yet created  |
| `streak_risk`           | Streak about to break              |
| `milestone_approaching` | Close to earning a badge or level  |

Nudges are dismissible with persistence (tracked via API).

### Streak System

Timezone-aware daily learning streak calculation using calendar day boundaries. Tracks current streak length, longest streak, and surfaces milestone achievements (3, 7, 14, 30 days).

---

## The Book

**"The Solo Founder's Customer Acquisition Playbook"** by Mike Sullivan is integrated directly into the platform as a searchable, trackable digital book.

### Structure

- **Front Matter**: How to Use This Book, Introduction
- **Part 1**: Psychology & Positioning (3 chapters)
- **Part 2**: Conversations & Conversion (4 chapters)
- **Part 3**: Systems, Metrics & Playbooks (6 chapters)
- **Part 4**: Your Playbook & The Future (3 chapters)
- **Back Matter**: 30-Day Action Plan, Framework Index, Glossary, Sources

### Features

- **Full-Text Search** — PostgreSQL tsvector-based search index across all chapters
- **Reading Progress** — Per-chapter start/complete event tracking
- **Chapter Sidebar** — Navigation with progress indicators
- **Paywall** — Configurable free/premium chapter gating with gradient fade-out
- **Academy CTA** — Contextual cross-selling to related courses
- **Book Purchase** — Standalone purchase via Polar.sh (separate from subscription)
- **Dedicated Layout** — Minimal header (logo, theme toggle, sign-in) optimized for reading

---

## Certification Program

### Certified Solo GTM Practitioner

A verifiable credential issued upon meeting three requirements:

1. **Track 1 Complete** — All 5 Foundations courses (Courses 0–4)
2. **Track 3 Complete** — All 8 Sales Methodology courses (Courses 13–20)
3. **Roleplay Average Score ≥ 75** — Demonstrated competence in live simulations

Upon eligibility:

- Certificate stored on profile (idempotent — safe to check on every course completion)
- **Badgr assertion issued** (Open Badges 3.0 standard) — verifiable digital credential
- Public certification page at `/certified` lists certified practitioners
- Criteria page at `/certification/criteria` shows requirements and progress

The certification check gracefully degrades if Badgr is unconfigured. Supports English and Spanish locales.

---

## Interactive MDX Component Library

Every lesson can embed any of **35+ purpose-built interactive React components** directly in the Markdown content. These are not generic widgets — each is designed for a specific type of learning interaction.

### Assessment & Evaluation

- **AssessmentEngine** — Likert scales + scenario quizzes with scoring, retake support, and feedback tiers
- **ScenarioQuiz** — Multi-choice with immediate explanation reveal
- **LikertScale** — 5-7 point scales with custom labels
- **TimedChallenge** — High-pressure quiz with SVG circular countdown timer, keyboard support (1-4 keys), and best-score tracking
- **PredictionGate** — Forces a prediction before unlocking content, then compares

### Sales Practice

- **MiniRoleplay** — In-lesson sales call simulator with prospect messages, user responses, and expert comparison
- **RewriteExercise** — Text improvement with progressive hint reveals and self-evaluation checklist
- **ArtifactExercise** — Multi-stage artifact creation with peer examples and rubrics
- **ClassifyExercise** — Categorization practice with drag-and-drop or button-based interaction

### Interactive Builders

- **ICPWorkshop** — 13-step ICP definition workshop with multi-field inputs, committee role CRUD, progress tracking, and PDF/TXT export
- **PersonaBuilder** — Dynamic persona card creation with auto-generated avatar
- **TemplateBuilder** — Field-by-field text builder with live preview and profile pre-population from FounderContext
- **ComparisonBuilder** — Side-by-side expert vs. user comparison with toggleable expert column
- **GoldenSegmentCalculator** — Multi-attribute scoring matrix for segment prioritization
- **ScenarioSimulator** — Dynamic business simulator with slider controls, real-time formula evaluation, and insight interpolation

### Decision & Strategy

- **DecisionTree** — Interactive flowchart with node-based navigation, breadcrumb trail, and explored-path tracking
- **StrategyDuel** — Two-column strategy comparison with hidden pros/cons and expert verdict reveal
- **SwipeDecision** — Rapid-fire decision cards with keyboard/swipe mechanics, score tracking, and mistake review

### Content & Presentation

- **ProgressiveReveal** — Step-by-step content disclosure
- **SlideNavigation** — Carousel with Previous/Next navigation
- **FlipCard** — Hover/click-reveal flashcards
- **EnhancedAccordion** — Collapsible sections for optional deep dives
- **InsightCard**, **ExampleCard**, **StepCard**, **TakeawayBox** — Callout and content formatting components
- **ContextualNote** — Conditional tip/warning display
- **ConceptReframe** — Before/after misconception correction
- **LinterFeedback** — Code/text quality feedback with severity levels

### AI-Powered Components

- **AILessonCoach** — Per-lesson chat coaching embedded in the MDX (question limit, persisted history, rate limiting)
- **PersonalizedExample** — Dynamic examples generated from the user's FounderContext (industry, roles, pain points)

### Persistence

All stateful components use a `persistKey` prop (convention: `{courseId}-{lessonId}-{descriptor}`) to persist state to localStorage and optionally sync to the server via the `usePersistedState` hook. This means a founder can leave a lesson halfway through an ICP Workshop, come back days later, and pick up exactly where they left off.

---

## Authentication & Authorization

### Lucia Auth (Session-Based)

- **Password hashing**: Argon2 via @node-rs/argon2 (memory-hard, configurable cost)
- **Sessions**: PostgreSQL-backed with httpOnly secure cookies
- **Email verification**: Code-based flow with configurable expiration
- **Password reset**: Code-based flow with configurable expiration

### Access Modes

| Mode            | Config                                 | Behavior                                              |
| --------------- | -------------------------------------- | ----------------------------------------------------- |
| **Production**  | Default                                | Full auth + subscription checks                       |
| **Beta**        | `OPEN_ACCESS=true` + `BETA_EMAILS=...` | Auth required, subscription bypassed, email whitelist |
| **Development** | `NEXT_PUBLIC_MOCK_AUTH=true`           | Mock auth for rapid testing                           |

### Route Protection

- **API middleware**: `withAuth()` wrapper validates session on all protected endpoints
- **Admin API**: Separate `ADMIN_API_SECRET` header for internal/cron endpoints
- **Public routes**: Readiness score, forms, book (free chapters), certification criteria

---

## Payments & Subscription

### Polar.sh Integration

| Product              | Price            | Product ID                                           |
| -------------------- | ---------------- | ---------------------------------------------------- |
| Monthly Subscription | $29.95/mo        | `a75bcdb7-34ad-4fc5-b878-b2309ea0611b`               |
| Annual Subscription  | $259.95/year     | `16521213-3716-4406-9437-35f85693b71e`               |
| Book (one-time)      | Separate pricing | Configurable via `NEXT_PUBLIC_POLAR_BOOK_PRODUCT_ID` |

**Flow**: Checkout page → Polar hosted checkout → Webhook (`/api/webhook/polar`) processes payment events → upserts subscription table → Confirmation page

**Status**: Currently in beta with free access. 7-day free trial planned for launch.

---

## Database Architecture

PostgreSQL 15 with pgvector extension. **33 tables + 11 materialized views** managed by Drizzle ORM with idempotent migrations applied automatically on deploy.

### Core Tables

| Table          | Purpose                                                                          |
| -------------- | -------------------------------------------------------------------------------- |
| `user`         | Lucia auth — email, Argon2 hashed password, verification codes, timestamps       |
| `session`      | Lucia session management with expiration                                         |
| `profile`      | JSONB founder profile (questionnaire, assessment, progress, artifacts, settings) |
| `subscription` | Polar.sh subscription status, product/customer IDs, period end                   |

### Learning & Assessment

| Table                  | Purpose                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `lesson_event`         | Lesson/module completion tracking with XP earned                                    |
| `lesson_feedback`      | Per-lesson sentiment (positive/negative) with optional category and comment         |
| `roleplay_session`     | Full transcript + AI evaluation per roleplay, indexed by DISC type/industry/role    |
| `chat_session`         | AI coaching sessions with course/lesson/section context                             |
| `chat_message`         | Individual messages within sessions                                                 |
| `assessment_snapshot`  | Historical 6-dimension readiness scores + recommended path + quick wins/gaps counts |
| `content_version`      | Curriculum version tracking (entity type/ID, change summary, metadata)              |
| `user_component_state` | React component state persistence (e.g., expanded sections, scroll position)        |

### Community & Cohort

| Table                     | Purpose                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| `pod`                     | Cohort pods — status, curriculum stage, deal size tier, week number, NodeBB category link |
| `pod_member`              | Membership with engagement scoring, post count, last active tracking                      |
| `member_matching_profile` | DISC profile, business context, time commitment, learning goals for matching              |
| `pod_activity`            | Event log: joins, leaves, posts, stage advances                                           |
| `facilitator_context`     | Weekly AI-generated pod summaries with health scores                                      |
| `persona_activity`        | Bot persona engagement tracking with fade-out status                                      |
| `forum_topic_sync`        | NodeBB topic mirror (title, slug, post/view/vote counts)                                  |
| `forum_post_sync`         | NodeBB post mirror (content preview, votes)                                               |
| `forum_analytics_event`   | Forum engagement events (views, posts, upvotes)                                           |
| `nodebb_user_map`         | Maps app users to NodeBB UIDs                                                             |
| `activity_event`          | Gamification feed: lessons, badges, artifacts, streaks, community posts                   |

### Sales & CRM

| Table               | Purpose                                                                            |
| ------------------- | ---------------------------------------------------------------------------------- |
| `outreach_log`      | Daily outreach activity (prospect, channel, action, outcome) with compound indexes |
| `pipeline_deal`     | Kanban deals — 6 stages, value/currency, probability, Attio sync, loss reason      |
| `connected_account` | OAuth/API tokens for Attio, Notion, Hunter, Pipedrive (encrypted at rest)          |

### Intelligence & Research

| Table                | Purpose                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| `document_embedding` | pgvector embeddings (1536-dim) for RAG search over user documents + lessons |
| `social_signal`      | Social media monitoring (platform, sentiment, relevance score)              |
| `seo_research`       | NeuronWriter SEO data (keyword, volume, difficulty, ranking)                |

### Payments & Book

| Table                | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `book_purchase`      | One-time book purchases (separate from subscription) |
| `book_search_index`  | Full-text tsvector search index for book chapters    |
| `book_reading_event` | Per-chapter reading progress events                  |

### Forms & Workflows

| Table               | Purpose                                                             |
| ------------------- | ------------------------------------------------------------------- |
| `form_submission`   | Lead capture form responses with scoring, UTM tracking, admin notes |
| `form_workflow_log` | n8n workflow trigger tracking (email, CRM sync, etc.)               |

### Metabase Views (11 Analytics Views)

| View                       | Purpose                                          |
| -------------------------- | ------------------------------------------------ |
| `v_user_progress`          | Flattened user progress + completion counts      |
| `v_completed_lessons_flat` | One row per completed lesson                     |
| `v_assessment_scores`      | Flattened assessment dimensions                  |
| `v_roleplay_analysis`      | Roleplay session analysis                        |
| `v_pod_health`             | Pod health overview (active members, activities) |
| `v_questionnaire_data`     | Extracted questionnaire responses                |
| `v_social_signals_summary` | Platform signal aggregation by date              |
| `v_seo_performance`        | SEO keyword rankings                             |
| `v_outreach_summary`       | Daily outreach activity summary                  |
| `v_pipeline_overview`      | Deal pipeline overview by stage                  |
| `v_form_submissions`       | Form analytics view                              |

### Cascade Behavior

All user-scoped tables use `ON DELETE CASCADE` — deleting a user removes all their data. Pod-scoped tables cascade from `pod.id`. Optional foreign keys (system events, historical records) use `ON DELETE SET NULL` to preserve history.

---

## External Integrations

| Service                | Purpose                                              | Integration Pattern                                           |
| ---------------------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| **NodeBB**             | Community forum with pod categories and bot personas | Master API token, internal Docker network, bidirectional sync |
| **Attio**              | CRM — deal/contact sync, enrichment, webhooks        | API key + webhook, bidirectional                              |
| **Pipedrive**          | CRM (LATAM market)                                   | BYOK API key                                                  |
| **Notion**             | Document/artifact export to user workspace           | OAuth flow                                                    |
| **Hunter.io**          | Email finder and domain verification                 | BYOK API key                                                  |
| **Badgr**              | Digital badge issuance (Open Badges 3.0)             | Email/password auth                                           |
| **Polar.sh**           | Subscription payments + book purchases               | SDK + webhook                                                 |
| **Resend**             | Transactional email (verification, password reset)   | API key                                                       |
| **Listmonk**           | Email marketing campaigns                            | Internal Docker URL, API auth                                 |
| **Brevo**              | Email marketing (LATAM)                              | API key                                                       |
| **Chatwoot CE**        | Customer support (help center + live chat)           | Self-hosted, widget embed                                     |
| **WhatsApp Business**  | Messaging integration                                | API                                                           |
| **Google Analytics 4** | Traffic and event analytics (client + server)        | Measurement Protocol                                          |
| **Umami**              | Privacy-first analytics (self-hosted)                | Script embed                                                  |
| **Metabase**           | Business intelligence dashboards                     | Direct PostgreSQL connection                                  |
| **Cloudflare**         | DNS, CDN, KV storage, DDoS protection                | Proxied DNS, API                                              |

---

## Public Lead Capture System

### Readiness Score Quiz

A public lead magnet at `/readiness-score` — an 8-dimension assessment inspired by Workera's skill assessment methodology. No authentication required. Results page shows scores with dimension breakdowns and a CTA to sign up.

### Dynamic Forms Engine

A native form system with 10 pre-built forms:

1. Beta Tester Application
2. Entrance Survey (business context)
3. Pod Matching Survey
4. Quick Win Assessment
5. Assessment Baseline
6. Learning Preference
7. Outreach Channel Selection
8. Deal Status Update
9. Artifact Creation
10. Lesson Feedback

Forms support multi-step flows, conditional logic, field scoring, honeypot spam protection, UTM tracking, and n8n webhook triggers for post-submission workflows (email, CRM sync, Brevo list add).

### Standalone Forms App

A separate Next.js application (`apps/forms/`) with its own Dockerfile, deployable independently. Shares the main PostgreSQL database. Serves public form pages at `forms.soloframehub.com`.

---

## Background Jobs & Automation

### n8n (Self-Hosted)

Running at `n8n.soloframehub.com`, managed via MCP integration.

**Key Workflows:**

- **Facilitator Rhythm** — Daily cron at 8am → checks day of week → triggers Monday/Wednesday/Friday facilitator posts via `/api/admin/facilitator`
- **Forum Sync** — Periodic NodeBB topic/post synchronization
- **Health Check** — VPS and service monitoring
- **Form Workflows** — Post-submission automation (email, CRM, list management)
- **Daily Digest** — Progress digest generation via `/api/admin/daily-digest`
- **Weekly Progress** — Weekly summary generation via `/api/admin/weekly-progress`

### Admin API Endpoints

All admin endpoints are protected by `ADMIN_API_SECRET` header authentication:

| Endpoint                             | Trigger             | Purpose                                |
| ------------------------------------ | ------------------- | -------------------------------------- |
| `POST /api/admin/facilitator`        | n8n cron (daily)    | AI facilitator weekly rhythm           |
| `POST /api/admin/daily-digest`       | n8n cron (daily)    | Daily progress digest                  |
| `POST /api/admin/weekly-progress`    | n8n cron (weekly)   | Weekly summary report                  |
| `POST /api/admin/forum-sync`         | n8n cron (periodic) | NodeBB data synchronization            |
| `POST /api/admin/forum-setup`        | Manual (one-time)   | NodeBB category + bot account creation |
| `POST /api/admin/readiness-followup` | n8n trigger         | Follow-up emails for readiness quiz    |
| `POST /api/admin/seed-demo`          | Manual              | Seed demo data for Metabase            |
| `POST /api/admin/content-version`    | Manual              | Record curriculum version changes      |

---

## Deployment Infrastructure

### Docker Build

Multi-stage build (node:20-alpine):

**Stage 1 (Builder)**: Install deps, build Next.js with Turbopack, generate standalone output

**Stage 2 (Runtime)**: Non-root user (`nextjs:1001`), copies standalone server + static assets + course content + book manuscripts + seed data + entrypoint script

**Entrypoint** (`scripts/docker-entrypoint.js`):

1. Check `DATABASE_URL` exists
2. Run idempotent SQL migration (CREATE TABLE IF NOT EXISTS for all 33 tables + 11 views)
3. Start Next.js server

### Dokploy Deployment

| Component           | Details                                                          |
| ------------------- | ---------------------------------------------------------------- |
| **VPS**             | 46.202.88.248 (31.3 GiB RAM, ~6.1 GiB used across 31 containers) |
| **Reverse Proxy**   | Traefik with automatic Let's Encrypt SSL                         |
| **DNS**             | Cloudflare proxied (orange cloud), Full Strict SSL mode          |
| **MCP Tools**       | Dokploy + n8n MCP servers configured in `.mcp.json`              |
| **Resource Limits** | App: 2560MB memory, 2.0 CPU                                      |

### Service Map

| Service                | Domain                            | Technology               |
| ---------------------- | --------------------------------- | ------------------------ |
| Solo GTM OS (main app) | `ai-solo-gtm-os.soloframehub.com` | Next.js 16               |
| PostgreSQL             | Internal                          | PostgreSQL 15 + pgvector |
| Redis                  | Internal                          | Redis                    |
| MinIO                  | Internal (9010:9000, 9011:9001)   | S3-compatible storage    |
| NodeBB Forum           | `ai-caa-forum.soloframehub.com`   | NodeBB (Docker)          |
| n8n Automation         | `n8n.soloframehub.com`            | n8n                      |
| Metabase Analytics     | `metabase.soloframehub.com`       | Metabase                 |
| Forms App              | `forms.soloframehub.com`          | Next.js (standalone)     |
| Chatwoot Support       | `support.soloframehub.com`        | Chatwoot CE              |
| Listmonk Email         | `listmonk.soloframehub.com`       | Listmonk v6              |
| Dokploy Panel          | `dokploy.startupapps.cloud`       | Dokploy                  |

### Deployment Flow

```
Git push → Dokploy builds Docker image → docker-entrypoint.js (idempotent DB migration) → Next.js server starts on port 3000
```

---

## Security Architecture

### Rate Limiting (Redis Sliding Window)

| Scope          | Limit                     |
| -------------- | ------------------------- |
| AI endpoints   | 10 requests/minute        |
| General API    | 60 requests/minute        |
| Authentication | Configurable per endpoint |

### Input Validation

Zod schemas on all API endpoints with typed validation. Categories: auth, onboarding, community, pipeline, forms, academy, AI, outreach, export.

### Password Security

Argon2 hashing via @node-rs/argon2 (memory-hard, configurable memory cost of 19,456 KB).

### Encryption

AES symmetric encryption for sensitive data at rest (connected account tokens, API keys). Encryption key stored as `ENCRYPTION_KEY` environment variable (32-byte hex).

### HTTP Security Headers

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
X-DNS-Prefetch-Control: on
Referrer-Policy: origin-when-cross-origin
Content-Security-Policy: [route-specific CSP]
```

### Content Security Policy

Two distinct CSPs:

- **Marketing pages**: Allows Google Analytics, Iconify, Visitor Tracking
- **App routes**: Allows OpenAI API, Google Fonts, Analytics

### CSRF Protection

Origin verification on all mutating requests.

### Infrastructure Security

- Non-root Docker container (`nextjs:1001`)
- Cloudflare DDoS protection and WAF
- Let's Encrypt TLS certificates (auto-renewed via Traefik)
- Internal Docker networking for service-to-service communication (NodeBB, MinIO, Listmonk, PostgreSQL, Redis)
- VPS security audit script (`scripts/ops/security-audit.sh`)

---

## Analytics & Business Intelligence

### Client-Side

- **Google Analytics 4** — Page views, events, conversion tracking
- **Umami** — Privacy-first analytics (self-hosted, no cookies)

### Server-Side

- **GA4 Measurement Protocol** — Server-side event tracking for API actions
- **Structured Logging** — Google Cloud Logging format via custom logger
- **Token Usage Logging** — AI API spend tracking across all providers

### Business Intelligence (Metabase)

11 materialized database views designed specifically for Metabase dashboards:

- User progress and completion funnels
- Assessment score distributions
- Roleplay performance analysis
- Pod health and engagement metrics
- Outreach activity summaries
- Pipeline stage analysis
- Form submission analytics
- SEO keyword performance
- Social signal monitoring

---

## Internationalization

### Spanish Content

The platform supports English and Spanish content. Current translation status:

| Track             | English Lessons | Spanish Lessons | Coverage |
| ----------------- | --------------- | --------------- | -------- |
| Foundations       | 48              | 48              | 100%     |
| Creator Track     | 72              | 72              | 100%     |
| Customer Success  | 36              | 36              | 100%     |
| Sales Methodology | 83              | 20              | 24%      |
| Marketing Engine  | 88              | 15              | 17%      |
| AI Acquisition    | 76              | 10              | 13%      |
| Operations        | 84              | 10              | 12%      |
| **Total**         | **487**         | **211**         | **43%**  |

### Marketing Website

Full Spanish marketing website at `/es/` including all legal pages (acceptable use, AI disclaimer, community guidelines, cookie policy, earnings disclaimer, privacy policy, refund policy, terms of service).

---

## Development & Testing

### Commands

```bash
npm run dev              # Dev server (Turbopack)
npm run dev:mock         # Dev with mock auth
npm run build            # Production build (Next.js + Drizzle migrations)
npm run start            # Start production server
npm run lint             # ESLint
npm run test             # Vitest unit tests (watch mode)
npm run test:coverage    # Vitest with V8 coverage
npm run test:e2e         # Playwright E2E tests
npm run test:e2e:ui      # Playwright UI mode
npm run test:e2e:debug   # Playwright debug mode
npm run test:e2e:headed  # Playwright with visible browser
npm run test:all         # Unit + E2E combined
npm run validate-lessons # Validate MDX curriculum content
npm run db:migrate       # Run Drizzle migrations locally
npm run db:studio        # Open Drizzle Studio (DB introspection)
npm run analyze          # Webpack bundle analysis
```

### Testing Architecture

**Vitest (Unit)**:

- Node.js environment with V8 coverage
- Tests co-located with services (`*.test.ts`)
- Covers: quiz evaluation, profile services, roleplay prompt building, voice service, profile context building

**Playwright (E2E)**:

- Chromium browser, serial execution (1 worker)
- Mock auth + open access for test isolation
- Redis disabled during tests
- 90s test timeout, 60s navigation timeout, 2 retries
- HTML reporter with screenshots and video capture

### Curriculum Validation

`scripts/validate-curriculum.ts` validates the entire curriculum:

- Checks for missing lesson files
- Validates quiz JSON schemas (Zod)
- Detects metadata mismatches
- Finds orphaned content not referenced in the curriculum tree

---

## Environment Configuration

The platform uses **162+ environment variables** organized by concern. Key categories:

| Category                 | Variables | Examples                                                                                             |
| ------------------------ | --------- | ---------------------------------------------------------------------------------------------------- |
| **Core**                 | 4         | `DATABASE_URL`, `REDIS_URL`, `REDIS_ENABLED`, `ENCRYPTION_KEY`                                       |
| **Auth**                 | 5         | `OPEN_ACCESS`, `BETA_EMAILS`, `ADMIN_EMAILS`, `ADMIN_API_SECRET`, `NEXT_PUBLIC_MOCK_AUTH`            |
| **AI Providers**         | 3         | `AI_PROVIDER`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `OPENROUTER_API_KEY`                           |
| **AI Models (per-task)** | 16        | `AI_MODEL_COACHING`, `AI_MODEL_ROLEPLAY`, `AI_MODEL_ASSESSMENT`, etc.                                |
| **Storage**              | 6         | `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION`, `S3_PUBLIC_URL` |
| **Payments**             | 7         | `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`, `POLAR_MODE`, `POLAR_SUCCESS_URL`, product IDs         |
| **Forum**                | 8         | `NODEBB_URL`, `NODEBB_API_KEY`, `NODEBB_ADMIN_UID`, `NODEBB_PODS_PARENT_CID`, bot UIDs               |
| **Email**                | 5         | `RESEND_API_KEY`, `LISTMONK_API_URL`, `LISTMONK_API_USER`, `LISTMONK_API_PASS`                       |
| **Analytics**            | 5         | `GA4_MEASUREMENT_ID`, `GA4_API_SECRET`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_METABASE_URL`   |
| **Integrations**         | 8+        | `NOTION_CLIENT_ID`, `BADGR_BASE_URL`, `ATTIO_WEBHOOK_SECRET`, `N8N_FORM_WEBHOOK_URL`                 |
| **Deployment**           | 3         | `DOKPLOY_API_URL`, `DEPLOY_API_KEY`, `NEXT_PUBLIC_APP_URL`                                           |

Full reference: [.env.example](../.env.example)

---

## Project Structure

```
soloframehub-v3/
├── app/                              # Next.js App Router
│   ├── (auth)/                       # Sign in, sign up, verify email, reset password
│   ├── (onboarding)/                 # 7-step founder profiling flow
│   ├── (default)/                    # Main platform
│   │   ├── dashboard/                # Dashboard + admin panel + analytics
│   │   ├── academy/                  # 49 courses, lesson player, ICP builder tool
│   │   ├── community/               # Feed, forum, meetups, pods, user directory
│   │   ├── coach/                    # AI coaching page
│   │   ├── roleplay/                # Sales roleplay simulations
│   │   ├── settings/                # Account, apps, billing, notifications, plans
│   │   ├── subscribe/               # Subscription management
│   │   └── workshop/                # Guided AI workshops
│   ├── (book)/                       # Book reader with chapter navigation
│   ├── (public)/                     # Readiness score, forms, certification, comparison
│   ├── (double-sidebar)/             # Messages, inbox, community profile
│   ├── (pay)/                        # Payment flows
│   ├── (alternative)/                # Component library, finance demos, utility pages
│   └── api/                          # 90+ REST endpoints
│       ├── auth/                     # Authentication (signin, signup, signout, session, verify, reset)
│       ├── academy/                  # Lessons, quizzes, feedback, artifacts
│       ├── ai/                       # Chat, roleplay, ICP validation, voice, workshop
│       ├── admin/                    # Facilitator, digest, forum, forms, content versioning
│       ├── community/               # Feed, forum, pods, matching, members
│       ├── profile/                  # Profile CRUD, artifacts, score history, export
│       ├── pipeline/                # Deal CRUD, stage moves, stats
│       ├── outreach/                # Activity logging, stats
│       ├── book/                    # Reading events, search
│       ├── certification/           # Eligibility check
│       ├── settings/               # Connected accounts management
│       ├── webhook/                 # Polar, Attio, NodeBB webhooks
│       └── ...                      # checkout, subscription, forms, hunter, notion, health
├── components/                       # React components
│   ├── ai/                          # Flyout chat, AI lesson coach
│   ├── book/                        # Book reader, paywall, search, chapter sidebar
│   ├── celebrations/                # Confetti, badge modal, level-up, streak toast
│   ├── charts/                      # Chart.js visualizations (17+ chart types)
│   ├── dashboard/                   # Coaching nudges, journey map, badges, XP, streaks, pipeline, outreach
│   ├── forms/                       # Form field, honeypot
│   ├── mdx/                         # 35+ interactive learning components
│   └── ui/                          # Header, sidebar, modals, dropdowns, tooltips, calendar, search
├── lib/                              # Core business logic
│   ├── ai/                          # Multi-provider AI client, task flows, coaching, vectorizer, models
│   ├── api/                         # Auth middleware, error handling, API client
│   ├── attio/                       # Attio CRM integration
│   ├── badgr/                       # Digital badge issuance (Open Badges 3.0)
│   ├── brevo/                       # Brevo email marketing
│   ├── context/                     # React contexts (FounderContext)
│   ├── data/                        # Curriculum (49 courses), personas (6), badges (24), XP levels, workshops
│   ├── db/                          # Drizzle schema (33 tables), migrations, client
│   ├── email/                       # Resend integration, daily digest template
│   ├── export/                      # Artifact export (Markdown, CSV, HTML)
│   ├── forms/                       # 10 form definitions, scoring, workflows
│   ├── hooks/                       # usePersistedState (localStorage + server sync)
│   ├── hunter/                      # Hunter.io email lookup
│   ├── nodebb/                      # NodeBB API client (retry, rate limiting, master token)
│   ├── notion/                      # Notion OAuth + API
│   ├── pipedrive/                   # Pipedrive CRM integration
│   ├── prompts/                     # AI system prompts (facilitator, personas)
│   ├── repositories/               # Repository pattern (profile, master data) with factory
│   ├── services/                    # 39 service files — the business logic layer
│   ├── storage/                     # S3/MinIO client
│   ├── utils/                       # Action routing, encryption, object helpers
│   ├── validations/                 # Zod schemas (8 categories)
│   └── whatsapp/                    # WhatsApp Business API
├── server/data/                      # Runtime content
│   ├── content/                     # 487 lesson files (Markdown/MDX) across 49 courses
│   ├── content/es/                  # 211 Spanish lesson translations
│   ├── quizzes/                     # 487 quiz JSON files (100% coverage)
│   └── quizzes/es/                  # Spanish quiz translations
├── seed-data/                        # Master reference data (industries, roles, founders, DISC profiles)
├── scripts/                          # Build, migration, ops
│   ├── docker-entrypoint.js         # Container startup (DB migration → server)
│   ├── validate-curriculum.ts       # Curriculum content validation
│   ├── index-lesson-embeddings.ts   # RAG document embedding pipeline
│   ├── n8n-facilitator-workflow.json # Facilitator automation workflow
│   └── ops/                         # health-check.sh, backup.sh, restore.sh, maintenance.sh, security-audit.sh
├── website/                          # Static marketing website (HTML, English + Spanish)
├── docs/                             # Documentation, manuscript chapters, cold email campaigns
├── .agents/skills/                   # 95+ Claude agent skills (marketing, SEO, sales, ops)
├── apps/forms/                       # Standalone forms microapp (own Dockerfile + deployment)
├── Dockerfile                        # Multi-stage Docker build (node:20-alpine)
├── middleware.ts                     # Request routing (auth, redirects, rewrites)
├── next.config.js                   # Security headers, CSP, rewrites, image optimization
├── drizzle.config.ts                # Drizzle ORM migration configuration
├── playwright.config.ts             # E2E test configuration
├── vitest.config.ts                 # Unit test configuration
└── .mcp.json                        # MCP server configuration (Dokploy, n8n)
```

---

## Key Numbers

| Metric                     | Count                       |
| -------------------------- | --------------------------- |
| Courses                    | 49                          |
| Lessons (English)          | 487                         |
| Lessons (Spanish)          | 211                         |
| Quizzes                    | 487 (100% coverage)         |
| Interactive MDX Components | 35+                         |
| API Endpoints              | 90+                         |
| Database Tables            | 33                          |
| Analytics Views            | 11                          |
| AI Task Types              | 16                          |
| Buyer Personas (Roleplay)  | 6                           |
| Forum Bot Personas         | 4                           |
| Badges                     | 24 (4 tiers × 6 categories) |
| XP Levels                  | 10                          |
| Form Definitions           | 10                          |
| Business Services          | 39                          |
| External Integrations      | 16                          |
| Environment Variables      | 162+                        |
| Claude Agent Skills        | 95+                         |
| Docker Containers (VPS)    | 31                          |

---

## Known Gotchas

- **`__NEXT_PRIVATE_STANDALONE_CONFIG`** — If set, Next.js silently skips `next.config.js`. Fix: `unset __NEXT_PRIVATE_STANDALONE_CONFIG`
- **`NODE_ENV=production`** — Causes `npm install` to skip devDependencies. Fix: `npm install --include=dev`
- **Dokploy `memoryLimit`** — Never use string values like `"512M"` (Dokploy strips suffix, Docker sees 512 bytes). Use `null` or integer.
- **Dokploy `certificateType`** — Never set to `"none"` — it removes Traefik router configs entirely, making services unreachable.
- **NodeBB API** — Requires `_uid` parameter in every request (master token pattern). Cloudflare blocks external calls — must use internal Docker network URL.
- **Assessment AI timeout** — Must be 60 seconds (default 20s is too short for complex assessments).
- **Files in `_archive/`** — Excluded from TypeScript compilation via tsconfig.
