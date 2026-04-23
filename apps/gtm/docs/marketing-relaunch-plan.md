# Solo GTM OS — Marketing Relaunch Plan

**Date:** March 29, 2026 (Updated with 92 skills integration)
**Context:** Book + platform launched February 2026 but marketing was delayed due to cardiac bypass surgery. Platform has evolved significantly since book was written. 17 n8n marketing workflows exist but have never been activated. 92 marketing skills now installed. Time to catch up.

**Manuscript update:** Mike will update and publish the revised manuscript this week (week of March 31, 2026). Key changes: pricing $49→$29.95, Academy→OS branding, author bio rewrite using LinkedIn references, updated URLs, remove "$3.7M" claim, fix Chapter 14 SEO markup.

---

## What We're Working With (Already Built)

### Infrastructure (Live)

- **Listmonk** — Newsletter platform at listmonk.soloframehub.com
- **Brevo** — Email marketing + CRM (LATAM focus)
- **Resend** — Transactional email (noreply@mail.soloframehub.com)
- **n8n** — 22 workflows (5 active infra, 17 dormant marketing)
- **Chatwoot** — Support widget + AI auto-responder (active)
- **Readiness Score** — Free lead magnet at /readiness-score (live)
- **10 Lead Capture Forms** — Beta tester, waitlist, book interest, partnership, etc.
- **GA4 + Metabase** — Analytics tracking
- **Attio CRM** — Primary CRM with pipeline sync
- **Hunter.io** — Email discovery integration
- **InVideo MCP** — AI video generation

### 92 Marketing Skills Installed (.agents/skills/)

Skills mapped by channel (full reference: `reference_marketing_skills.md`):

| Channel             | Skills                                                                                                                                             | Use For                                                 |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Cold Email          | `/cold-email`, `/email-sequence`, `/instantly-automation`, `/lemlist-automation`, `/clay-gtm-outbound`, `/apollo-automation`, `/hunter-automation` | Generate sequences, manage platforms, enrich leads      |
| LinkedIn & Social   | `/social-content`, `/typefully` (multi-platform), `/twitter-algorithm-optimizer`, `/x-article-publisher`, `/facebook-automation`                   | Content calendar, cross-posting, algorithm optimization |
| SEO & Content       | `/ai-seo`, `/seo-audit`, `/programmatic-seo`, `/schema-markup`, `/content-research-writer`, `/ahrefs-automation`, `/semrush-automation`            | AI search optimization, blog content, structured data   |
| Copy & Messaging    | `/copywriting`, `/copy-editing`, `/product-messaging`, `/product-positioning`, `/ai-humanizer`, `/case-study-builder`, `/press-release`            | Unified messaging, manuscript updates, launch copy      |
| CRO & Conversion    | `/page-cro`, `/signup-flow-cro`, `/onboarding-cro`, `/form-cro`, `/paywall-upgrade-cro`, `/ab-test-setup`                                          | Readiness Score page, signup flow, paywall optimization |
| Launch & GTM        | `/launch-strategy`, `/product-launch-gtm`, `/lifecycle-marketing-campaigns`, `/marketing-ideas`, `/marketing-psychology`                           | Book relaunch campaign, lifecycle email design          |
| Pricing & Retention | `/pricing-strategy`, `/churn-prevention`, `/referral-program`                                                                                      | $29.95 validation, dunning, Endorsely affiliate setup   |
| Research            | `/customer-research`, `/icp-persona`, `/competitive-ads-extractor`, `/lead-research-assistant`                                                     | ICP refinement, competitor analysis, lead sourcing      |
| Ads                 | `/ad-creative`, `/paid-ads`, `/googleads-automation`, `/metaads-automation`                                                                        | Paid amplification when ready                           |
| Analytics & CRM     | `/analytics-tracking`, `/revops`, `/sales-enablement`, `/attio-automation`, `/n8n-automation`                                                      | GA4 audit, CRM sync, n8n workflow activation            |

### Dormant n8n Workflows (Never Executed)

| Priority | Workflow                      | ID               | What It Does                                                        |
| -------- | ----------------------------- | ---------------- | ------------------------------------------------------------------- |
| 1        | Cold Email CSV Enrichment     | EkFWpNQlL9VO05lZ | AI-personalized icebreakers via OpenRouter — **already SFH-native** |
| 2        | Lead Gen + AI Scoring + Brevo | EMKPDaev3kF8C8ng | Crawl prospects, score with AI, send via Brevo                      |
| 3        | AI Social Media Publisher     | 5zaRWiS9Chgyy7ua | Form → Gemini → publish to X + LinkedIn + Facebook + Instagram      |
| 4        | RSS to Social (AI + Approval) | FRD5cuKEwT9m2eli | RSS → OpenAI → Telegram approval → publish to all platforms         |
| 5        | Google Trends to Social       | d91a1neIVmBgLVFb | Trending topics → Perplexity research → social posts (2x/day)       |
| 6        | Newsletter Automation + GPT   | wwtQY8hb9kHxuYJ6 | Google Sheets → GPT newsletter → Gmail distribution                 |
| 7        | SEO Blog + Social             | mFARBh0xjzLcJ4qq | AI blog posts → WordPress → social distribution                     |
| 8        | CRM Enrichment                | xqHKbFP4jm1jMQI7 | Pipedrive contacts → LinkedIn scrape → GPT enrichment               |
| 9        | Smart Email Auto-Responder    | EVvdUmTPeJZk2bEv | Gmail polling → Gemini classify → auto-reply + Brevo add            |
| 10       | AI Viral Video Generator      | LUneKUA0hRPegkfO | Form → Seedance video + Fal AI sound                                |

### Content Assets Ready to Deploy

- **The book** — 15 chapters, 98K words, fully written
- **48 courses / 7 tracks** — Curriculum content ready
- **Archived research** — 32K word LinkedIn B2B doc, cold email state-of-art, community-led growth
- **50+ personalized email CSVs** — From Kanbox enrichment (docs/website-reloaded-2/email-marketing/)
- **Hyper-personalization prompt** — Claude prompt for generating 3-email cold sequences
- **Instantly.io formatting guide** — Ready for cold email platform import
- **Cold email blog post** — Already published at /blog/cold-email-system-for-technical-founders.html

### LinkedIn References (Social Proof Gold)

- Jay Strauss (AirDefense VP) — "transformed the cabling guys into the go-to group"
- J. Damian Vitale (Unisys) — "star performer... clone his methodology across the Western Region"
- Guido DiGregorio (Proxim/CIC) — "built a highly effective sales team from scratch"
- Russ Davis (CIC COO) — "paramount to taking a struggling company to almost $1B market cap"
- Tim O'Toole (Oracle AVP) — "innovative thinker, natural leader"
- Tom Middlemass — "visionary thinking and contagious energy"

---

## Phase 0: Foundation (Week 1)

### 0.1 Update the Manuscript

Priority changes to align book with current platform:

1. **Author bio** — Rewrite using LinkedIn reference themes (CIC ~$1B, team transformation, methodology cloning). Remove "$3.7M" from platform code.
2. **CONTINUE-YOUR-JOURNEY.md** — Complete rewrite with current features, pricing ($29.95), and OS branding
3. **All pricing** — $49 → $29.95/month everywhere (manuscript + platform components)
4. **URLs** — .html static paths → actual platform URLs
5. **Academy → OS** — Update branding in introduction, CTAs, Chapter 14 SEO examples
6. **Trigger.dev** — Remove from Chapter 8
7. **Timeline** — Update Chapter 15 "February 2026" to actual status
8. **book-structure.ts** — Fix author bio, remove "$3.7M+ enterprise deals"

### 0.2 Install Marketing Skills — DONE (92 skills installed)

All skills installed at `.agents/skills/`. See skills table above for full mapping.

### 0.3 Update Existing Instantly Campaign Copy

The "Al Educators SF Book Launch" campaign (1,202 ZeroBounce-validated leads) needs these fixes before resuming:

- Remove "$3.7M deals" from PS lines — replace with "built revenue engines at five companies from scratch — one to nearly $1B market cap"
- Update pricing: "$49/mo" → "$29.95/mo" or omit (beta is free)
- Update terminology: "Academy" → "OS" / "Solo GTM OS"
- Update URLs to current platform domain
- Update "36 courses" → "48 courses across 7 tracks"
- Skills to use: `/cold-email` for sequence rewrite, `/product-messaging` for consistent voice

### 0.4 Cold Email Infrastructure (Existing + New)

**Already running:**

- Instantly.ai account with 5 sending domains
- ZeroBounce-validated lists: 1,202 (AI Educators), 1,174 (Technical Purists), 625 (Founders)
- Warmup may need restarting after campaign pause

**New setup needed:**

- Verify sending domain warmup status after pause period
- Re-check sender reputation scores
- Skills to use: `/instantly-automation` for campaign management

---

## Phase 1: Book Relaunch Campaign (Weeks 2-4)

### 1.1 Cold Email Marketing

**Strategy:** Leverage the existing Kanbox-enriched prospect lists and hyper-personalization prompts.

**Segments:**
| Segment | ICP | Source | Approach |
|---------|-----|--------|----------|
| Solo SaaS founders | Pre-revenue to $10K MRR, technical, bootstrapped | LinkedIn Sales Navigator, Indie Hackers, MicroConf attendees | Value-first: free Readiness Score + book chapter |
| Creator founders | Course/coaching sellers, $1K-$50K MRR | Gumroad, Teachable, Podia creators | Pain-point: "acquisition without feeling sleazy" |
| Freelancers/consultants | Upwork/Toptal with 90%+ JSS, want to go direct | Upwork public profiles, LinkedIn | Authority: "14 years 100% satisfaction → here's the system" |
| Agency owners (1-5 people) | Boutique dev/design/marketing shops | Clutch, LinkedIn | Systematic: "stop relying on referrals alone" |

**Sequence (3-email, 5-day cadence):**

1. **Day 0** — Value hook: free chapter + Readiness Score link. Subject: "{FirstName}, your acquisition system has a gap"
2. **Day 3** — Social proof: Russ Davis quote + "built from 30 years of doing this, not theorizing"
3. **Day 5** — Direct CTA: "The book is free to read online. The OS is $29.95/mo. Either way, the Readiness Score takes 5 minutes and might surprise you."

**Skills to use:** `/cold-email` (sequence generation), `/icp-persona` (segment refinement), `/lead-research-assistant` (new prospect sourcing), `/apollo-automation` (B2B lead database)

**n8n Activation:**

- Activate `EkFWpNQlL9VO05lZ` (Cold Email CSV Enrichment) — configure OpenRouter credentials
- Activate `EMKPDaev3kF8C8ng` (Lead Gen + AI Scoring) — connect Brevo credentials
- Use `/n8n-automation` skill to help configure workflows

**Volume:** Start at 20/day per domain, scale to 50/day after warmup. Target: 500-1000 personalized outreach emails/week across 3 domains.

### 1.2 LinkedIn Campaign

**Personal Profile Optimization:**

- Update headline: "Built a sales team that took a company to $1B market cap. Now I teach solo founders the system. | Solo GTM OS"
- Featured section: Book cover + Readiness Score link
- About section: Reference-backed narrative (not resume)

**Content Calendar (3x/week minimum):**
| Day | Content Type | Theme |
|-----|-------------|-------|
| Monday | Framework post | One book framework with visual (ICP, MVQ, Constraint Triangle, PID) |
| Wednesday | Story post | "Building in public" — a specific metric, lesson learned, or decision from building SoloFrameHub |
| Friday | Engagement post | "The worst sales advice I ever got was..." / polls / questions |

**LinkedIn Outreach (Manual + Semi-Automated):**

- Connect requests to ICP matches with personalized notes (no pitch)
- After connection: value-add comment on their content for 1-2 weeks
- Then DM with Readiness Score link or book chapter

**Skills to use:** `/social-content` (content calendar), `/typefully` (publish to LinkedIn + cross-post), `/product-positioning` (profile optimization), `/case-study-builder` (turn LinkedIn references into social proof posts), `/phantombuster-automation` (LinkedIn data enrichment)

**n8n Activation:**

- Consider `xqHKbFP4jm1jMQI7` (CRM Enrichment) to enrich new connections in Pipedrive

### 1.3 X/Twitter Campaign

**Profile Setup:**

- @soloframehub — optimize bio, pinned tweet (book + Readiness Score)
- Header image: Book cover + "Free to read online"

**Content Strategy (daily, 1-3 tweets):**

- Thread Tuesdays: Unroll one book chapter into a Twitter thread (15 chapters = 15 weeks of threads)
- Quote-tweet/reply to founder conversations about acquisition, sales, cold email, bootstrapping
- Repost/engage with complementary accounts (MicroConf, Indie Hackers, Patrick McKenzie, etc.)

**Skills to use:** `/twitter-algorithm-optimizer` (optimize each tweet for reach), `/typefully` (schedule + cross-post), `/x-article-publisher` (book chapters as X Articles), `/content-research-writer` (thread drafting)

**n8n Activation:**

- Activate `5zaRWiS9Chgyy7ua` (AI Social Media Publisher) — cross-post to X + LinkedIn + Facebook
- Activate `FRD5cuKEwT9m2eli` (RSS to Social) — auto-create social posts from any blog/content RSS

### 1.4 Direct Outreach to Podcast Hosts

**Target:** 20-30 podcasts for solo founders, bootstrappers, indie hackers

| Podcast                               | Why                           | Angle                                                                     |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| Indie Hackers Podcast                 | Core ICP audience             | "I paused writing the book to build the platform — here's what I learned" |
| MicroConf On Air                      | Bootstrapped SaaS community   | "Acquisition system for solo founders under $10K MRR"                     |
| Startups For the Rest of Us           | Rob Walling's audience        | "Why generic sales advice fails solo founders"                            |
| My First Million                      | Broader reach                 | "30 years in tech sales → built an OS for founders who hate selling"      |
| The Bootstrapped Founder (Arvid Kahl) | Perfect audience match        | "The diagnostic approach to selling"                                      |
| SaaS Club                             | SaaS-specific                 | "From $0 to $10K MRR: the solo founder's constraint triangle"             |
| Tropical MBA                          | Location-independent founders | "Customer acquisition while building in public"                           |

**Outreach template:** Short, specific, referencing a recent episode + what unique angle you'd bring.

**Skills to use:** `/cold-email` (outreach template), `/press-release` (media kit), `/case-study-builder` (proof points for pitch)

---

## Phase 2: Content Engine (Weeks 3-8)

### 2.1 Substack / Newsletter

**Strategy:** Weekly newsletter that repurposes book content + platform insights.

**Setup:**

- Substack or use existing Listmonk (cost advantage)
- Cross-post to LinkedIn newsletter feature
- Archive on platform blog

**Content Mix:**
| Week | Type | Example |
|------|------|---------|
| 1 | Book excerpt + commentary | "Why You Hate Selling (Ch 1 excerpt + what I learned building the OS)" |
| 2 | Framework deep-dive | "The MVQ Framework: Stop wasting discovery calls" |
| 3 | Building in public | "March metrics: X signups, Y readiness scores, Z conversion rate" |
| 4 | Tool review / comparison | "I tested 5 cold email platforms as a solo founder. Here's what worked." |

**Skills to use:** `/content-strategy` (editorial calendar), `/content-research-writer` (draft articles with research), `/email-sequence` (nurture design), `/copywriting` (newsletter copy), `/ai-humanizer` (natural voice)

**n8n Activation:**

- Activate `wwtQY8hb9kHxuYJ6` (Newsletter Automation) — GPT-assisted newsletter drafting
- Configure Listmonk as distribution channel

### 2.2 SEO/AEO Content (Chapter 14 in Practice)

**Strategy:** Practice what the book preaches. Create answer-engine-optimized content.

**Target Keywords:**

- "customer acquisition for solo founders"
- "solo founder sales system"
- "how to sell as a technical founder"
- "bootstrapped SaaS customer acquisition"
- "cold email for solo founders" (blog post exists, expand)
- "ICP template for solo founders"

**Skills to use:** `/ai-seo` (AI search optimization), `/seo-audit` (technical audit), `/programmatic-seo` (scale pages like "/for-saas-founders", "/for-coaches"), `/schema-markup` (fix JSON-LD), `/ahrefs-automation` + `/semrush-automation` (keyword research), `/competitor-alternatives` (comparison pages)

**n8n Activation:**

- Activate `mFARBh0xjzLcJ4qq` (SEO Blog + Social) — AI blog generation + social distribution
- Activate `d91a1neIVmBgLVFb` (Google Trends to Social) — trend-riding content

### 2.3 Video Content

**Short-form (Reels/Shorts/TikTok):**

- 60-second framework explanations from book chapters
- "One thing I wish I knew about selling as a founder" series
- Screen recordings of the platform in action (Readiness Score, AI roleplay, coaching)

**Tools:**

- InVideo MCP (already connected) for script-to-video
- n8n `LUneKUA0hRPegkfO` (AI Viral Video Generator) for format optimization

**Long-form (YouTube):**

- Book chapter video versions (start with Chapters 1-3)
- Platform walkthrough / demo
- "Building in Public" series

---

## Phase 3: Partnerships & Influencers (Weeks 4-12)

### 3.1 Influencer / Creator Partnerships

**Tier 1 — Direct Outreach (micro-influencers, 5K-50K followers):**
| Creator | Platform | Why | Offer |
|---------|----------|-----|-------|
| Bootstrapped SaaS founders with audiences | Twitter/LinkedIn | They ARE the ICP and have followers who are too | Free OS access + affiliate commission |
| Indie Hackers top posters | IH community | High-intent audience | Co-branded content + affiliate |
| Sales methodology creators (non-competing) | YouTube/LinkedIn | Complementary audience | Guest content swap |
| AI tool reviewers | YouTube | Tech-forward audience | Demo + honest review |

**Tier 2 — Community Partnerships:**

- Indie Hackers group partnerships
- MicroConf community sponsorship
- SaaS-focused Slack/Discord communities
- Reddit r/SaaS, r/Entrepreneur, r/startups (helper approach from Ch 15)

### 3.2 Affiliate Program

**Activate Endorsely** (already configured in env, just commented out):

- 20-30% recurring commission on monthly subscriptions
- Provide affiliates with: landing page, email swipe copy, social assets, book excerpts
- Track via UTM params already built into form system

### 3.3 Strategic Content Swaps

- Guest posts on bootstrapping blogs (SaaStr, Close.io blog, Baremetrics, ChartMogul)
- Reciprocal: offer platform content/expertise in exchange for audience exposure
- Book reviews: activate the `book-reviewer` form (already built!)

---

## Phase 4: Scale & Optimize (Weeks 8+)

### 4.1 Paid Amplification (Small Budget)

- **LinkedIn Ads**: Boost top-performing organic posts ($10-20/day)
- **Twitter/X Ads**: Promote book threads + Readiness Score ($5-10/day)
- **Reddit Ads**: r/SaaS, r/startups, r/Entrepreneur ($5-10/day)
- Total: $20-40/day = $600-1200/month (within solo founder budget)

### 4.2 Referral Program

- Activate Endorsely integration
- In-app referral flow: "Share with a fellow founder, both get a free month"
- Add referral CTA to daily digest emails

### 4.3 Conversion Optimization

- A/B test Readiness Score landing page (current vs. shorter version)
- Optimize book → OS conversion path (book-paywall.tsx, book-academy-cta.tsx)
- Add exit-intent popup with Readiness Score CTA

### 4.4 Community-Led Growth

- Activate pod matching for engaged users
- Encourage forum posts and wins sharing
- "Student spotlight" social content from community members

---

## Metrics & Tracking

### Weekly Dashboard (Metabase)

| Metric                         | Target (Month 1) | Target (Month 3) |
| ------------------------------ | ---------------- | ---------------- |
| Readiness Score completions    | 50/week          | 200/week         |
| Email list size (Listmonk)     | 500              | 2,000            |
| Cold emails sent               | 500/week         | 1,000/week       |
| Cold email reply rate          | 5-8%             | 8-12%            |
| LinkedIn followers             | +200/month       | +500/month       |
| X followers                    | +100/month       | +300/month       |
| Newsletter subscribers         | 200              | 1,000            |
| Beta applications              | 30/week          | 100/week         |
| Paying subscribers (post-beta) | —                | 50               |
| Book chapter reads             | 200/week         | 1,000/week       |

### Attribution

- UTM params on all outbound links (already built into form system)
- GA4 events for: readiness_score_completed, book_chapter_read, signup, subscription
- Attio CRM deal tracking for high-touch prospects

---

## Execution Priority (First 7 Days)

1. **Day 1**: Update manuscript (author bio, pricing, URLs, branding) + fix book-structure.ts
2. **Day 1**: Install marketing skills (coreyhaines31/marketingskills)
3. **Day 2**: Purchase + configure secondary sending domains
4. **Day 2**: Activate Cold Email CSV Enrichment workflow (EkFWpNQlL9VO05lZ) — configure credentials
5. **Day 3**: Optimize LinkedIn profile + publish first framework post
6. **Day 3**: Activate AI Social Media Publisher workflow (5zaRWiS9Chgyy7ua)
7. **Day 4**: Draft first 3-email cold sequence using hyper-personalization prompt
8. **Day 4**: Set up Substack or Listmonk newsletter template
9. **Day 5**: Begin LinkedIn outreach (20 connection requests/day to ICP matches)
10. **Day 5**: Draft first newsletter issue (book Chapter 1 excerpt + platform intro)
11. **Day 6**: Compile podcast target list, begin outreach
12. **Day 7**: Review metrics, adjust approach, plan Week 2

---

## Budget Estimate

| Item                      | Monthly Cost     |
| ------------------------- | ---------------- |
| Secondary domains (3x)    | $30/year total   |
| Instantly.ai (Growth)     | $97/month        |
| LinkedIn Sales Navigator  | $99/month        |
| Paid social amplification | $600-1200/month  |
| Substack (if Pro)         | $0 (free tier)   |
| **Total**                 | ~$800-1400/month |

Everything else (n8n, Listmonk, Brevo, InVideo, Readiness Score, forms) is already deployed and running.
