# Business Context & Vision

**For anyone continuing the Customer Acquisition Academy business.**
**Last Updated:** 2026-02-20

---

## What This Is

The Customer Acquisition Academy (branded as SoloFrameHub) is an AI-powered education platform that teaches solo founders how to build systematic customer acquisition engines. It combines structured coursework, AI coaching, sales roleplay practice, peer learning pods, and a companion book.

The target customer is a solo founder or very early-stage founder (pre-team) who needs to learn how to sell their product but doesn't have a sales background.

---

## Revenue Model

### Subscription Plans (via Polar.sh)

| Plan | Product ID | Price |
|------|-----------|-------|
| Monthly | `a75bcdb7-34ad-4fc5-b878-b2309ea0611b` | *(fill in: price)* |
| Annual | `16521213-3716-4406-9437-35f85693b71e` | *(fill in: price)* |

### Book Purchase (One-Time)
- **Title:** "The Solo Founder's Customer Acquisition Playbook"
- **Author:** Mike Sullivan
- **Product ID:** Set via `NEXT_PUBLIC_POLAR_BOOK_PRODUCT_ID`
- **Checkout Link:** `https://buy.polar.sh/polar_cl_5kdgZ7QpABnaVU1NWM6t4SIKxojRXd1w3U37r1lzDRL`

### Payment Status
- **Currently in Sandbox mode** (`POLAR_MODE=sandbox`)
- Switch to `production` in Dokploy env vars when ready for real payments

### Revenue Metrics
- *(fill in: current MRR, subscriber count, churn rate)*
- Analytics available in Metabase at `https://metabase.soloframehub.com`

---

## What's Built vs. What's Planned

### Available Now (21 courses, 219 lessons)
- **Foundations Track** (5 courses) — Sales psychology, ICP building, positioning, prospecting
- **Marketing Engine Track** (8 courses) — Content, SEO, LinkedIn, cold email, community, automation
- **Sales Methodology Track** (8 courses) — DISC personas, discovery calls, demos, objections, closing, pipeline

### Partially Built (8 courses, 72 lessons)
- **Creator Economy Track** — Content exists but infrastructure is partially complete

### Planned / Coming Soon (19 courses, 206 lessons)
- **AI-Powered Acquisition Track** (7 courses) — AI outreach, autonomous SDR, custom sales agents
- **Customer Success Track** (4 courses) — Onboarding, retention, expansion, advocacy
- **Operations & Systems Track** (9 courses) — CRM, analytics, automation, hiring, legal, capstone

### AI Features
- AI Coaching Chat — Working (Claude Sonnet 4.5 via OpenRouter)
- Sales Roleplay with DISC Personas — Working (with voice TTS/STT)
- ICP Validation — Working
- AI-Graded Quiz Reflections — Working
- AI Facilitator (pod nudges) — Working (triggered by n8n cron)

### Community Features
- Pod-based peer groups — Built, uses NodeBB forum
- Pod matching algorithm — Built
- Forum integration — Built with sync to Postgres for analytics

### Book
- 16 chapters fully written with visuals
- 3 free chapters, 12 premium (requires subscription or purchase)
- Full-text search and reading progress tracking

---

## Platform Access Tiers

### Unauthenticated
- Marketing homepage, blog, Spanish site
- Public forms
- 3 free book chapters

### Free / Beta Users (signed up, email verified)
- Founder profiling and assessment
- Limited course access *(fill in: which courses are free?)*
- AI coaching *(fill in: any usage limits?)*

### Paid Subscribers
- Full course access (all available tracks)
- Full book access (all 16 chapters)
- Sales roleplay with voice
- Community pod membership
- AI coaching (rate limited: 10 req/min)

---

## Key Business Decisions to Know

### Beta Phase
- Currently using `BETA_EMAILS` whitelist for signups
- Set via env var (comma-separated email list)
- Remove this restriction when ready for public launch

### Payment Provider
- Using **Polar.sh** (not Stripe directly)
- Polar handles checkout, subscription management, webhooks
- Currently in **sandbox mode** — no real charges

### AI Cost Management
- OpenRouter routes to cheapest-appropriate model per task
- High-value tasks (coaching, roleplay) use Claude Sonnet 4.5
- Structured/scoring tasks use GPT-4o-mini (much cheaper)
- Token usage is logged for spend tracking: search logs for `ai_token_usage`
- Rate limiting (10 AI req/min per user) prevents runaway costs

### Content Strategy
- The book and curriculum cover the same material from different angles
- Book is a standalone product; academy is the interactive/applied version
- Curriculum is defined in `lib/data/curriculum.ts` (88 KB master file)
- Lesson content is markdown in `server/data/content/`
- Adding a new lesson: add to curriculum.ts + create the markdown file + create quiz JSON

---

## Who to Contact

*(Fill in these contacts)*

| Role | Name | Contact |
|------|------|---------|
| Founder / Creator | Mike Sullivan | *(email, phone)* |
| Technical Contact | *(if any)* | |
| Legal / Business | *(if any)* | |
| Hosting (Hostinger) | Support | hpanel.hostinger.com |
| Domain (Cloudflare) | Support | dash.cloudflare.com |
| Payments (Polar.sh) | Support | polar.sh |

---

## Financial Obligations

*(Fill in recurring costs)*

| Service | Cost | Billing Cycle | Renewal Date |
|---------|------|---------------|-------------|
| Hostinger VPS | | | |
| Cloudflare | Free plan / Pro? | | |
| OpenRouter (AI) | Pay-as-you-go | Monthly | |
| OpenAI (Voice) | Pay-as-you-go | Monthly | |
| Resend (Email) | | | |
| Polar.sh | | | |
| soloframehub.com domain | | Annual | |
| GitHub (if paid plan) | | | |

---

## Intellectual Property

### Created Content
- 48 courses of original curriculum (497 lessons)
- 16-chapter book manuscript (`docs/manuscript/`)
- 13 industry vertical datasets (`seed-data/industries/`)
- DISC personality patterns and founder category taxonomy
- All AI system prompts and coaching frameworks

### Code
- Full-stack Next.js application (proprietary)
- Repository: `https://github.com/SoloFrameHub/customer-acquisition-academy-vps`
- License: *(fill in: proprietary? any open-source components?)*

### Brand
- SoloFrameHub brand name
- `soloframehub.com` domain and all subdomains
- "Customer Acquisition Academy" product name
- "Solo Founder's Customer Acquisition Playbook" book title

---

## Vision & Roadmap

*(Fill in your own words — what was the 1-year, 3-year vision?)*

### Near-Term Priorities
- *(fill in)*

### Long-Term Vision
- *(fill in)*

### Features Under Consideration
- *(fill in: anything you were planning to build next?)*
