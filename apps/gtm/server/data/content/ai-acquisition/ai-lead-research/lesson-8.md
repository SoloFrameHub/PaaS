---
title: "B2B Enrichment Fields vs Creator Enrichment Fields"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 23: AI Lead Research & Enrichment"
lesson: 8
---

You've built a waterfall enrichment pipeline. It's humming along, pulling emails at 75% coverage. Your ICP scoring agent is tagging Tier A leads. Everything works.

Then you decide to expand. Maybe you're adding a creator partnership program. Or launching a community for solopreneurs. Or targeting consultants who straddle B2B and personal brand worlds.

You run your enrichment pipeline on this new list.

**It returns 30% coverage and garbage data.**

Why? Because you're trying to enrich creators with B2B fields. It's like asking Apollo for someone's Substack subscriber count or their YouTube niche. The tools don't speak that language.

This lesson teaches you to **speak both dialects fluently** — B2B enrichment and creator enrichment — and build pipelines that adapt based on who you're targeting.

---

## The Two Enrichment Universes

<FlipCard 
  front="Why do B2B and creator enrichment require different fields?" 
  back="B2B buying happens through companies (budgets, committees, tech stacks). Creator buying happens through individuals (audience size, engagement, monetization model). The data that predicts fit is fundamentally different." 
/>

Here's the reality: **B2B enrichment tools were built for company-centric sales.** They excel at:
- Company size, industry, revenue
- Job titles, departments, org charts
- Tech stack, funding rounds, hiring signals

**Creator enrichment requires person-centric data:**
- Audience size, platform mix, engagement rate
- Content niche, monetization model, brand partnerships
- Creator tools used, content frequency, audience demographics

<InsightCard icon="🎯" title="The Hybrid Opportunity">
The fastest-growing solo founder segment is **creator-operators** — people who have both a personal brand AND a B2B service/product. They need enrichment that captures both sides. Most tools only do one.
</InsightCard>

Let's map the two universes side by side.

---

## B2B Enrichment Field Map

<SlideNavigation>
<Slide title="Core Identity Fields">

These fields identify **who they are in a company context:**

| Field | Example Value | Enrichment Source | Why It Matters |
|-------|---------------|-------------------|----------------|
| `job_title` | "VP of Marketing" | Apollo, LinkedIn | Decision-making authority |
| `department` | "Marketing" | Apollo, Clearbit | Budget ownership |
| `seniority_level` | "Director" | Apollo | Buying power |
| `company_name` | "Acme Corp" | Apollo, Hunter | Company context |
| `company_size` | "50-200 employees" | Apollo, Clearbit | Deal size potential |
| `industry` | "B2B SaaS" | Apollo, Clearbit | Vertical fit |
| `location` | "San Francisco, CA" | Apollo, LinkedIn | Timezone, market |

**Enrichment Strategy:** Apollo + LinkedIn Sales Navigator cover 90% of these fields. Use Clay waterfall for gaps.

</Slide>

<Slide title="Firmographic Fields">

These fields describe **the company they work for:**

| Field | Example Value | Enrichment Source | Why It Matters |
|-------|---------------|-------------------|----------------|
| `company_revenue` | "$10M-50M ARR" | Clearbit, Crunchbase | Budget capacity |
| `employee_count` | 150 | Apollo, LinkedIn | Org complexity |
| `funding_stage` | "Series B" | Crunchbase, PitchBook | Growth trajectory |
| `funding_amount` | "$15M raised" | Crunchbase | Budget unlocked signal |
| `founded_year` | 2019 | Clearbit, Apollo | Maturity stage |
| `headquarters` | "Austin, TX" | Clearbit | Geographic focus |
| `parent_company` | "Acme Holdings" | Clearbit | Enterprise complexity |

**Enrichment Strategy:** Crunchbase API for funding. Clearbit/Apollo for firmographics. BuiltWith for tech stack.

</Slide>

<Slide title="Technographic Fields">

These fields reveal **what tools they use:**

| Field | Example Value | Enrichment Source | Why It Matters |
|-------|---------------|-------------------|----------------|
| `tech_stack` | ["HubSpot", "Salesforce", "Slack"] | BuiltWith, Datanyze | Integration compatibility |
| `crm_platform` | "Salesforce" | BuiltWith | Replacement/add-on fit |
| `marketing_automation` | "HubSpot" | BuiltWith | Marketing maturity |
| `analytics_tools` | ["Google Analytics", "Mixpanel"] | BuiltWith | Data sophistication |
| `hosting_provider` | "AWS" | BuiltWith | Technical infrastructure |

**Enrichment Strategy:** BuiltWith API ($295/mo) or Datanyze. Clay has built-in BuiltWith integration.

</Slide>

<Slide title="Signal Fields">

These fields indicate **buying intent or timing:**

| Field | Example Value | Enrichment Source | Why It Matters |
|-------|---------------|-------------------|----------------|
| `job_changed_90d` | true | LinkedIn, Apollo | New role = new budget |
| `recent_funding` | true | Crunchbase | Budget unlocked |
| `hiring_for_roles` | ["SDR", "Marketing Manager"] | LinkedIn Jobs, Greenhouse | Growth signal |
| `recent_news` | "Launched new product" | Google News API, Perplexity | Conversation hook |
| `website_traffic_trend` | "Growing 20% MoM" | SimilarWeb, SEMrush | Market momentum |
| `g2_reviews` | 4.5 stars, 120 reviews | G2 API | Product-market fit |

**Enrichment Strategy:** LinkedIn for job changes. Crunchbase for funding. Google News API or Perplexity for recent news. SimilarWeb for traffic (expensive; use sparingly).

</Slide>
</SlideNavigation>

<ExampleCard label="B2B Enrichment in Action">

**Target ICP:** VP of Marketing at B2B SaaS companies, 50-500 employees, using HubSpot, recently funded.

**Enrichment Recipe:**
1. Apollo: Find contacts matching title + company size + industry
2. Crunchbase: Check funding status (last 6 months)
3. BuiltWith: Verify HubSpot usage
4. LinkedIn: Check job change recency
5. Google News: Pull recent company announcements

**Result:** 200 prospects → 160 enriched (80%) → 45 Tier A (recent funding + HubSpot + VP title) → 90 Tier B → 25 Tier C

**Cost:** ~$0.35/prospect (Clay waterfall) = $70 for 200 prospects
</ExampleCard>

---

## Creator Enrichment Field Map

Now let's flip to the creator universe. **None of the B2B fields above matter here.** Creators don't have "company size" or "tech stack." They have audience size and content niche.

<SlideNavigation>
<Slide title="Core Identity Fields">

These fields identify **who they are as a creator:**

| Field | Example Value | Enrichment Source | Why It Matters |
|-------|---------------|-------------------|----------------|
| `primary_platform` | "YouTube" | Manual research, Phyllo | Where they build audience |
| `content_niche` | "Personal finance" | AI research agent, bio scraping | Relevance to your offer |
| `creator_type` | "Educator" | AI classification | Content style fit |
| `full_time_creator` | true | Bio analysis, LinkedIn | Commitment level |
| `location` | "Los Angeles, CA" | Twitter/YouTube bio | Timezone, partnerships |
| `years_creating` | 3 | Channel creation date | Experience level |

**Enrichment Strategy:** Manual research + AI agent. No single API covers all platforms. Phyllo API aggregates some data but is expensive ($299/mo+).

</Slide>

<Slide title="Audience Fields">

These fields describe **their audience size and engagement:**

| Field | Example Value | Enrichment Source | Why It Matters |
|-------|---------------|-------------------|----------------|
| `youtube_subscribers` | 45000 | YouTube API (free) | Reach potential |
| `youtube_avg_views` | 8000 | YouTube API | Engagement quality |
| `twitter_followers` | 12000 | Twitter API (free tier) | Cross-platform presence |
| `email_list_size` | 5000 (estimated) | AI inference from mentions | Direct access |
| `instagram_followers` | 18000 | Instagram scraping (risky) or manual | Visual content reach |
| `linkedin_followers` | 3000 | LinkedIn (manual) | B2B creator signal |
| `total_audience_reach` | ~88000 | Calculated sum | Overall influence |
| `engagement_rate` | 6.5% | Calculated (views/subs) | Audience quality |

**Enrichment Strategy:** YouTube API (free, 10K requests/day). Twitter API (free tier, limited). Instagram = manual or risky scrapers. Email list = AI inference from "join my list" mentions.

</Slide>

<Slide title="Monetization Fields">

These fields reveal **how they make money:**

| Field | Example Value | Enrichment Source | Why It Matters |
|-------|---------------|-------------------|----------------|
| `monetization_model` | ["Sponsorships", "Courses", "Affiliate"] | AI research agent | Revenue sophistication |
| `has_paid_product` | true | Website scraping, AI agent | Product-market fit |
| `course_platform` | "Teachable" | BuiltWith, manual | Creator tool usage |
| `membership_platform` | "Patreon" | Bio links, manual | Recurring revenue signal |
| `sponsor_history` | ["BetterHelp", "Skillshare"] | Video descriptions, AI | Brand partnership quality |
| `estimated_monthly_revenue` | "$5K-15K" | AI inference (very rough) | Budget capacity |

**Enrichment Strategy:** AI research agent scrapes website, YouTube descriptions, bio links. BuiltWith for course platforms. Manual for sponsor history.

</Slide>

<Slide title="Content Fields">

These fields describe **what and how often they create:**

| Field | Example Value | Enrichment Source | Why It Matters |
|-------|---------------|-------------------|----------------|
| `content_frequency` | "2 videos/week" | YouTube API (upload dates) | Consistency signal |
| `content_format` | ["Long-form video", "Shorts"] | AI classification | Format preferences |
| `avg_video_length` | "12 minutes" | YouTube API | Content depth |
| `recent_topics` | ["Budgeting", "Investing", "Side hustles"] | AI topic extraction | Relevance to offer |
| `collaboration_history` | ["Creator X", "Creator Y"] | Video descriptions | Network quality |
| `content_quality_score` | 8/10 | AI scoring (production value) | Professionalism |

**Enrichment Strategy:** YouTube API for metadata. AI agent for topic extraction and quality scoring.

</Slide>

<Slide title="Creator Tool Stack">

These fields reveal **what tools they use to create:**

| Field | Example Value | Enrichment Source | Why It Matters |
|-------|---------------|-------------------|----------------|
| `video_editing_tool` | "Final Cut Pro" (inferred) | AI inference from mentions | Technical sophistication |
| `email_platform` | "ConvertKit" | Website footer, BuiltWith | Email marketing maturity |
| `analytics_tool` | "TubeBuddy" | Mentions in content | Data-driven approach |
| `scheduling_tool` | "Later" | Mentions, integrations | Workflow optimization |
| `community_platform` | "Discord" | Bio links | Audience engagement |

**Enrichment Strategy:** BuiltWith for website tools. AI agent for tool mentions in content. Manual for community platforms.

</Slide>
</SlideNavigation>

<ExampleCard label="Creator Enrichment in Action">

**Target ICP:** YouTube creators in personal finance niche, 20K-100K subscribers, monetizing via courses/coaching, posting 1+ video/week.

**Enrichment Recipe:**
1. YouTube API: Pull subscriber count, avg views, upload frequency
2. AI Research Agent: Scrape channel about page + recent video descriptions for niche, monetization model, tools mentioned
3. BuiltWith: Check website for course platform (Teachable, Gumroad, etc.)
4. Manual: Check bio links for Patreon, Discord, email signup
5. AI Scoring: Rate content quality 1-10 based on production value

**Result:** 150 creators → 120 enriched (80%) → 30 Tier A (perfect niche fit + active monetization + high engagement) → 60 Tier B → 30 Tier C

**Cost:** ~$0.10/creator (mostly AI API calls + manual time) = $15 for 150 creators
</ExampleCard>

---

## The Hybrid Creator-Operator Profile

Here's where it gets interesting. **The fastest-growing segment is creator-operators** — people who have both:
- A personal brand (YouTube, newsletter, podcast)
- A B2B service or product (consulting, SaaS, agency)

Think: 
- A marketing consultant with 30K YouTube subscribers teaching marketing
- A SaaS founder with a 10K-person newsletter about bootstrapping
- A sales coach with 50K LinkedIn followers selling a course + consulting

**These people need BOTH enrichment universes.**

<ComparisonBuilder
  title="Hybrid Enrichment Profile"
  persistKey="ai-lead-research-L8-hybrid"
  prompt="Design a hybrid enrichment schema for a creator-operator in your niche"
  expertExample="For a B2B SaaS founder with a newsletter: Enrich for company (revenue, funding, tech stack) AND creator metrics (newsletter subscribers, open rate, content niche). Score fit on both dimensions: B2B product fit + audience relevance."
  criteria={[
    "Includes both B2B firmographic fields and creator audience fields",
    "Defines how to score fit across both dimensions",
    "Identifies which enrichment sources cover which fields"
  ]}
/>

### Hybrid Enrichment Field Map

| Field Category | B2B Fields | Creator Fields | Enrichment Source |
|----------------|-----------|----------------|-------------------|
| **Identity** | Job title, company | Primary platform, content niche | Apollo + AI agent |
| **Scale** | Company size, revenue | Audience size, engagement rate | Apollo + YouTube/Twitter API |
| **Monetization** | Budget, funding | Paid products, sponsorships | Crunchbase + AI agent |
| **Tools** | Tech stack (CRM, marketing automation) | Creator tools (email platform, editing software) | BuiltWith + AI agent |
| **Signals** | Job change, hiring | Content frequency, recent launches | LinkedIn + YouTube API |

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Creator Founders">
You're in the hybrid zone. When prospecting partners or sponsors, enrich for BOTH your creator metrics (audience, engagement) AND your business metrics (revenue, customer count). Sponsors care about reach. B2B partners care about traction.
</ContextualNote>

---

## Building Dual-Context Enrichment Pipelines

You can't use the same pipeline for B2B and creators. But you CAN build a **context-switching pipeline** that adapts based on the prospect type.

Here's the architecture:

<SlideNavigation>
<Slide title="Step 1: Classify the Prospect Type">

Before enrichment, **classify each prospect as B2B, Creator, or Hybrid.**

**Classification Logic:**
- If `company_domain` exists AND `linkedin_url` contains "/company/" → B2B
- If `youtube_channel_url` OR `twitter_handle` exists AND no company domain → Creator
- If BOTH exist → Hybrid

**Implementation:**
- Clay: Add a "Classify Prospect Type" formula column
- n8n: Add a "Switch" node based on field presence
- Manual: Tag prospects during list building

</Slide>

<Slide title="Step 2: Route to the Right Enrichment Recipe">

**B2B Route:**
1. Apollo: Job title, company, industry, size
2. Crunchbase: Funding, revenue
3. BuiltWith: Tech stack
4. LinkedIn: Job change signals
5. AI Agent: Recent news, conversation hooks

**Creator Route:**
1. YouTube API: Subscribers, avg views, upload frequency
2. Twitter API: Followers, engagement
3. AI Agent: Niche, monetization model, content topics
4. BuiltWith: Website tools (email platform, course platform)
5. Manual: Bio links (Patreon, Discord, email signup)

**Hybrid Route:**
1. Run BOTH pipelines
2. Merge results into a single enriched record
3. Score fit on both dimensions (B2B fit + creator fit)
4. Prioritize based on combined score

</Slide>

<Slide title="Step 3: Define Context-Specific Scoring">

**B2B Scoring (FIT + SIGNAL + FRICTION):**
- FIT: Industry, title, company size, tech stack match
- SIGNAL: Job change, funding, hiring
- FRICTION: Enterprise sales cycle, committee buying

**Creator Scoring (AUDIENCE + ENGAGEMENT + MONETIZATION):**
- AUDIENCE: Subscriber/follower count in target range
- ENGAGEMENT: Engagement rate >3%, content frequency >1/week
- MONETIZATION: Has paid product, active sponsorships

**Hybrid Scoring:**
- B2B Fit Score (0-5) + Creator Fit Score (0-5) = Total (0-10)
- Tier A: 8-10 (strong on both dimensions)
- Tier B: 5-7 (strong on one dimension)
- Tier C: 1-4 (weak on both)

</Slide>

<Slide title="Step 4: Adapt Personalization by Type">

**B2B Personalization:**
- Reference company news, funding, tech stack
- Lead with business pain points
- CTA: "15-minute call to discuss [specific challenge]"

**Creator Personalization:**
- Reference recent content, audience growth, niche
- Lead with audience/monetization opportunities
- CTA: "Quick chat about [partnership/tool/opportunity]"

**Hybrid Personalization:**
- Reference BOTH business and creator achievements
- Lead with how your offer bridges both worlds
- CTA: "Let's explore how [offer] fits your [business + audience]"

</Slide>
</SlideNavigation>

<TemplateBuilder
  title="Dual-Context Enrichment Schema"
  persistKey="ai-lead-research-L8-schema"
  sections={[
    {
      id: "prospect-type",
      title: "Prospect Classification",
      fields: [
        { id: "type", label: "Prospect Type", placeholder: "B2B / Creator / Hybrid", type: "select", options: ["B2B", "Creator", "Hybrid"] },
        { id: "classification-logic", label: "How did you classify this?", placeholder: "e.g., Has company domain + LinkedIn company page = B2B", type: "textarea" }
      ]
    },
    {
      id: "b2b-fields",
      title: "B2B Enrichment Fields (if applicable)",
      fields: [
        { id: "job-title", label: "Job Title", placeholder: "e.g., VP of Marketing", type: "text" },
        { id: "company-size", label: "Company Size", placeholder: "e.g., 50-200 employees", type: "text" },
        { id: "tech-stack", label: "Tech Stack", placeholder: "e.g., HubSpot, Salesforce", type: "text" },
        { id: "recent-funding", label: "Recent Funding?", placeholder: "Yes/No + amount", type: "text" }
      ]
    },
    {
      id: "creator-fields",
      title: "Creator Enrichment Fields (if applicable)",
      fields: [
        { id: "primary-platform", label: "Primary Platform", placeholder: "e.g., YouTube", type: "text" },
        { id: "audience-size", label: "Audience Size", placeholder: "e.g., 45K YouTube subscribers", type: "text" },
        { id: "content-niche", label: "Content Niche", placeholder: "e.g., Personal finance", type: "text" },
        { id: "monetization", label: "Monetization Model", placeholder: "e.g., Courses, sponsorships", type: "text" }
      ]
    },
    {
      id: "scoring",
      title: "Fit Scoring",
      fields: [
        { id: "b2b-fit", label: "B2B Fit Score (0-5)", placeholder: "0-5", type: "number" },
        { id: "creator-fit", label: "Creator Fit Score (0-5)", placeholder: "0-5", type: "number" },
        { id: "total-score", label: "Total Score (0-10)", placeholder: "Auto-calculated", type: "number" },
        { id: "tier", label: "Priority Tier", placeholder: "A / B / C", type: "select", options: ["A", "B", "C"] }
      ]
    }
  ]}
/>

---

## Tool Stack for Dual-Context Enrichment

Different tools excel at different contexts. Here's your stack:

<SlideNavigation>
<Slide title="B2B Enrichment Tools">

| Tool | Primary Use | Pricing | Coverage |
|------|-------------|---------|----------|
| Apollo.io | Contact + company data | Free / $49-99/mo | 90% B2B coverage |
| Clearbit (Breeze) | Firmographic enrichment | HubSpot paid plans | 70% company data |
| Crunchbase | Funding, revenue | $29/mo (Basic) / $99/mo (Pro) | 80% funded companies |
| BuiltWith | Tech stack | $295/mo (API) | 60% websites |
| LinkedIn Sales Nav | Manual research | $99.99/mo | 100% LinkedIn profiles |

**Recommended Stack for Solo Founders:**
- Apollo Free (10K records/mo) + Crunchbase Basic ($29/mo) + BuiltWith (manual checks) = **$29/mo**
- OR Clay Explorer ($149/mo) with built-in integrations = **$149/mo** (higher coverage, less manual work)

</Slide>

<Slide title="Creator Enrichment Tools">

| Tool | Primary Use | Pricing | Coverage |
|------|-------------|---------|----------|
| YouTube API | Subscriber count, views, uploads | Free (10K requests/day) | 100% YouTube |
| Twitter API | Follower count, tweets | Free tier (limited) | 100% Twitter |
| Phyllo API | Multi-platform creator data | $299/mo+ | 80% major platforms |
| AI Research Agent (GPT-4/Claude) | Niche, monetization, tools | ~$0.02-0.05/prospect | Variable (depends on public data) |
| BuiltWith | Website tools (email, course platforms) | $295/mo (API) or manual | 60% creator websites |

**Recommended Stack for Solo Founders:**
- YouTube API (free) + Twitter API (free) + AI Research Agent (ChatGPT API ~$20/mo) + Manual checks = **$20/mo**
- OR Phyllo API ($299/mo) for automated multi-platform enrichment = **$299/mo** (expensive; only if high volume)

</Slide>

<Slide title="Hybrid Enrichment Tools">

For creator-operators, you need BOTH stacks. Budget options:

**Option 1: Manual Hybrid ($50/mo)**
- Apollo Free (B2B data)
- YouTube + Twitter APIs (free)
- AI Research Agent (ChatGPT API $20/mo)
- Crunchbase Basic ($29/mo)
- Manual BuiltWith checks

**Option 2: Clay-Powered Hybrid ($149/mo)**
- Clay Explorer ($149/mo)
- Built-in Apollo, BuiltWith, AI columns
- Add YouTube/Twitter API integrations (free)
- Manual Phyllo checks for deep creator data

**Option 3: High-Volume Hybrid ($450/mo)**
- Clay Pro ($349/mo)
- Phyllo API ($299/mo) — only if enriching 500+ creators/month
- Crunchbase Pro ($99/mo)

</Slide>
</SlideNavigation>

<RangeSlider 
  label="What's your monthly enrichment budget?" 
  min={0} 
  max={500} 
  step={50}
  lowLabel="$0" 
  highLabel="$500+" 
  persistKey="ai-lead-research-L8-budget" 
/>

<ContextualNote showWhen={{ budget: "&lt;100" }} variant="tip" title="Budget-Conscious Approach">
Stick with **Apollo Free + YouTube/Twitter APIs + AI Research Agent** for $20-30/mo. Manually check BuiltWith for key prospects. You'll hit 60-70% coverage, which is enough to start.
</ContextualNote>

<ContextualNote showWhen={{ budget: "100-200" }} variant="tip" title="Sweet Spot Budget">
**Clay Explorer ($149/mo)** is your best bet. It automates the waterfall, includes AI research columns, and integrates with YouTube/Twitter APIs. Add Crunchbase Basic ($29/mo) if you need funding data. Total: $178/mo.
</ContextualNote>

---

## Hands-On: Build Your Dual-Context Pipeline

Let's build a working dual-context enrichment pipeline. You'll create a schema, define enrichment sources, and set up scoring logic.

<InteractiveChecklist 
  title="Dual-Context Pipeline Build Checklist" 
  persistKey="ai-lead-research-L8-build" 
  items={[
    "Define your two ICPs: B2B and Creator (or Hybrid)",
    "List 10 B2B enrichment fields you need (from the field map above)",
    "List 10 Creator enrichment fields you need (from the field map above)",
    "Choose your enrichment tools (Apollo, Clay, YouTube API, etc.)",
    "Write a classification rule: How do you determine B2B vs Creator vs Hybrid?",
    "Define scoring logic for B2B fit (FIT + SIGNAL + FRICTION)",
    "Define scoring logic for Creator fit (AUDIENCE + ENGAGEMENT + MONETIZATION)",
    "Build a test enrichment on 10 prospects (5 B2B, 5 Creator)",
    "Review enrichment coverage: Did you hit 70%+ on both types?",
    "Adjust your waterfall or add manual steps where coverage is low"
  ]} 
/>

### Classification Exercise

Let's practice classifying prospects.

<ClassifyExercise
  title="Classify These Prospects"
  persistKey="ai-lead-research-L8-classify"
  categories={[
    { id: "b2b", label: "B2B", color: "#3b82f6" },
    { id: "creator", label: "Creator", color: "#8b5cf6" },
    { id: "hybrid", label: "Hybrid", color: "#10b981" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Sarah Chen, VP of Marketing at Acme Corp (B2B SaaS, 150 employees). LinkedIn: linkedin.com/in/sarahchen. No YouTube or Twitter.", 
      correctCategory: "b2b",
      explanation: "Clear B2B profile. No creator presence."
    },
    { 
      id: "2", 
      content: "Alex Rivera, YouTube creator with 60K subscribers in personal finance niche. Posts 2x/week. No company affiliation.", 
      correctCategory: "creator",
      explanation: "Pure creator. No B2B company connection."
    },
    { 
      id: "3", 
      content: "Jordan Lee, Founder of GrowthTools (SaaS, $500K ARR) + 25K newsletter subscribers teaching bootstrapping.", 
      correctCategory: "hybrid",
      explanation: "Both B2B (SaaS founder) and Creator (newsletter). Hybrid enrichment needed."
    },
    { 
      id: "4", 
      content: "Taylor Morgan, Sales Coach with 40K LinkedIn followers, runs a consulting firm (5 employees), sells a $2K course.", 
      correctCategory: "hybrid",
      explanation: "Hybrid: B2B service (consulting firm) + Creator (course + LinkedIn audience)."
    },
    { 
      id: "5", 
      content: "Chris Patel, Director of Sales at TechCo (500 employees). Active on LinkedIn (3K followers) but no content creation.", 
      correctCategory: "b2b",
      explanation: "B2B. LinkedIn presence doesn't make them a creator unless they're actively creating content."
    },
    { 
      id: "6", 
      content: "Jamie Kim, Twitch streamer (15K followers) in gaming niche. No business, no products, just streaming.", 
      correctCategory: "creator",
      explanation: "Pure creator. No B2B angle."
    }
  ]}
/>

---

## Scoring Dual-Context Prospects

Now let's practice scoring. You'll see enriched profiles and assign fit scores.

<SwipeDecision
  title="Score This Prospect: B2B Fit"
  description="Swipe right for HIGH fit (7-10), left for LOW fit (1-6)"
  optionA="Low Fit (1-6)"
  optionB="High Fit (7-10)"
  persistKey="ai-lead-research-L8-b2b-score"
  cards={[
    { 
      id: "1", 
      content: "VP of Marketing, B2B SaaS, 100 employees, uses HubSpot, raised $10M Series A 3 months ago, hiring 2 SDRs.", 
      correctOption: "b", 
      explanation: "Perfect B2B fit: Right title, industry, size, tech stack, recent funding (budget unlocked), hiring (growth signal). Score: 9/10." 
    },
    { 
      id: "2", 
      content: "Marketing Coordinator, E-commerce company, 20 employees, no funding, uses Mailchimp.", 
      correctOption: "a", 
      explanation: "Low fit: Junior title, small company, no funding, basic tools. Score: 3/10." 
    },
    { 
      id: "3", 
      content: "Director of Sales, Enterprise SaaS, 2,000 employees, uses Salesforce, no recent funding or hiring.", 
      correctOption: "a", 
      explanation: "Medium-low fit: Right title and tools, but enterprise = long sales cycle (friction). No signals. Score: 5/10." 
    }
  ]}
/>

<SwipeDecision
  title="Score This Prospect: Creator Fit"
  description="Swipe right for HIGH fit (7-10), left for LOW fit (1-6)"
  optionA="Low Fit (1-6)"
  optionB="High Fit (7-10)"
  persistKey="ai-lead-research-L8-creator-score"
  cards={[
    { 
      id: "1", 
      content: "YouTube: 50K subscribers, personal finance niche, 8% engagement rate, posts 2x/week, sells a $500 course on Teachable.", 
      correctOption: "b", 
      explanation: "High fit: Right niche, strong engagement, consistent posting, active monetization. Score: 9/10." 
    },
    { 
      id: "2", 
      content: "YouTube: 5K subscribers, gaming niche, 2% engagement rate, posts 1x/month, no monetization.", 
      correctOption: "a", 
      explanation: "Low fit: Small audience, low engagement, inconsistent posting, no monetization. Score: 2/10." 
    },
    { 
      id: "3", 
      content: "YouTube: 80K subscribers, tech reviews niche, 5% engagement rate, posts 1x/week, has sponsorships but no paid products.", 
      correctOption: "b", 
      explanation: "Medium-high fit: Large audience, decent engagement, consistent posting, monetizing via sponsorships. Score: 7/10." 
    }
  ]}
/>

---

## Common Pitfalls in Dual-Context Enrichment

<SlideNavigation>
<Slide title="Pitfall 1: Using B2B Tools for Creators">

**The Mistake:** Running Apollo or LinkedIn Sales Navigator searches for YouTube creators.

**Why It Fails:** Apollo doesn't index YouTube subscriber counts or engagement rates. LinkedIn doesn't show Patreon memberships or course sales.

**The Fix:** Use YouTube API + AI Research Agent for creators. Apollo for B2B only.

</Slide>

<Slide title="Pitfall 2: Ignoring Hybrid Profiles">

**The Mistake:** Classifying a SaaS founder with a 20K newsletter as "B2B only" and missing the creator angle.

**Why It Fails:** You lose a major personalization hook (their audience) and potential partnership opportunities.

**The Fix:** Always check for creator presence (YouTube, newsletter, podcast, LinkedIn content) even on B2B prospects. Tag as Hybrid if both exist.

</Slide>

<Slide title="Pitfall 3: Over-Relying on Expensive Tools">

**The Mistake:** Paying $299/mo for Phyllo API when you're only enriching 50 creators/month.

**Why It Fails:** Cost-per-prospect is $6 ($299 ÷ 50). You could do it manually for $0.10/prospect with YouTube API + AI agent.

**The Fix:** Use expensive tools ONLY if you're enriching 500+ prospects/month. Otherwise, manual + AI is cheaper.

</Slide>

<Slide title="Pitfall 4: Not Verifying Creator Data">

**The Mistake:** Trusting subscriber counts from scraped data without checking the actual channel.

**Why It Fails:** Subscriber counts can be inflated (bought followers), outdated, or misattributed.

**The Fix:** Always spot-check 10% of creator data manually. Verify subscriber counts, engagement rates, and monetization claims.

</Slide>
</SlideNavigation>

---

## Your Dual-Context Enrichment Recipe

Time to build your own enrichment recipe. This will be your operating manual for the next 90 days.

<TemplateBuilder
  title="My Dual-Context Enrichment Recipe"
  persistKey="ai-lead-research-L8-recipe"
  sections={[
    {
      id: "icp-definition",
      title: "ICP Definition",
      fields: [
        { id: "b2b-icp", label: "B2B ICP (if applicable)", placeholder: "e.g., VP of Marketing at B2B SaaS, 50-500 employees, using HubSpot", type: "textarea" },
        { id: "creator-icp", label: "Creator ICP (if applicable)", placeholder: "e.g., YouTube creators in personal finance, 20K-100K subscribers, monetizing via courses", type: "textarea" },
        { id: "hybrid-icp", label: "Hybrid ICP (if applicable)", placeholder: "e.g., SaaS founders with 10K+ newsletter subscribers", type: "textarea" }
      ]
    },
    {
      id: "b2b-enrichment",
      title: "B2B Enrichment Steps",
      fields: [
        { id: "b2b-source-1", label: "Primary B2B Source", placeholder: "e.g., Apollo.io", type: "text" },
        { id: "b2b-fields-1", label: "Fields from Source 1", placeholder: "e.g., Job title, company size, industry", type: "textarea" },
        { id: "b2b-source-2", label: "Secondary B2B Source", placeholder: "e.g., Crunchbase", type: "text" },
        { id: "b2b-fields-2", label: "Fields from Source 2", placeholder: "e.g., Funding, revenue", type: "textarea" },
        { id: "b2b-verification", label: "Verification Step", placeholder: "e.g., MillionVerifier for emails", type: "text" }
      ]
    },
    {
      id: "creator-enrichment",
      title: "Creator Enrichment Steps",
      fields: [
        { id: "creator-source-1", label: "Primary Creator Source", placeholder: "e.g., YouTube API", type: "text" },
        { id: "creator-fields-1", label: "Fields from Source 1", placeholder: "e.g., Subscribers, avg views, upload frequency", type: "textarea" },
        { id: "creator-source-2", label: "Secondary Creator Source", placeholder: "e.g., AI Research Agent", type: "text" },
        { id: "creator-fields-2", label: "Fields from Source 2", placeholder: "e.g., Niche, monetization model, tools used", type: "textarea" },
        { id: "creator-manual", label: "Manual Checks", placeholder: "e.g., Bio links for Patreon, Discord", type: "textarea" }
      ]
    },
    {
      id: "scoring-logic",
      title: "Scoring Logic",
      fields: [
        { id: "b2b-scoring", label: "B2B Fit Scoring (0-5)", placeholder: "e.g., +1 for industry match, +1 for title match, +1 for tech stack, +1 for funding, +1 for hiring", type: "textarea" },
        { id: "creator-scoring", label: "Creator Fit Scoring (0-5)", placeholder: "e.g., +1 for niche match, +1 for audience size, +1 for engagement rate, +1 for monetization, +1 for content frequency", type: "textarea" },
        { id: "tier-thresholds", label: "Tier Thresholds", placeholder: "e.g., 8-10 = Tier A, 5-7 = Tier B, 1-4 = Tier C", type: "textarea" }
      ]
    },
    {
      id: "budget-estimate",
      title: "Budget & Volume Estimate",
      fields: [
        { id: "monthly-volume", label: "Monthly Enrichment Volume", placeholder: "e.g., 200 B2B + 100 Creator = 300 total", type: "text" },
        { id: "tool-costs", label: "Tool Costs", placeholder: "e.g., Clay $149/mo + Crunchbase $29/mo = $178/mo", type: "textarea" },
        { id: "cost-per-prospect", label: "Cost per Prospect", placeholder: "e.g., $178 ÷ 300 = $0.59/prospect", type: "text" }
      ]
    }
  ]}
/>

---

## Summary & Next Steps

You now understand the **two enrichment universes** — B2B and Creator — and how to build pipelines that handle both.

**Key Takeaways:**
1. **B2B enrichment** focuses on company data (firmographics, tech stack, funding). Tools: Apollo, Clearbit, Crunchbase, BuiltWith.
2. **Creator enrichment** focuses on audience data (subscribers, engagement, monetization). Tools: YouTube API, Twitter API, AI Research Agent, Phyllo.
3. **Hybrid profiles** (creator-operators) need BOTH enrichment types. Classify → Route → Enrich → Score on both dimensions.
4. **Budget matters:** Manual + AI ($20-50/mo) works for &lt;200 prospects/month. Clay ($149/mo) scales to 500+. Phyllo ($299/mo) only if high creator volume.
5. **Always verify:** Spot-check 10% of enriched data for accuracy. AI hallucinates. Scraped data goes stale.

<InteractiveChecklist 
  title="Your Action Items" 
  persistKey="ai-lead-research-L8-actions" 
  items={[
    "Define your B2B ICP and Creator ICP (or Hybrid ICP)",
    "List 10 enrichment fields for each ICP type",
    "Choose your enrichment tools based on budget and volume",
    "Build a classification rule to route prospects to the right pipeline",
    "Set up a test enrichment on 20 prospects (10 B2B, 10 Creator)",
    "Review coverage: Did you hit 70%+ on both types?",
    "Define scoring logic for both B2B fit and Creator fit",
    "Document your dual-context enrichment recipe (use the template above)",
    "Calculate your cost-per-prospect and monthly budget",
    "Schedule a weekly enrichment sprint: 50-100 prospects/week"
  ]} 
/>

**Next Lesson Preview:** In Lesson 9, we'll tackle the **Build vs Buy decision** — when to use Clay/Apollo vs building your own enrichment pipeline with n8n + APIs. You'll learn the breakeven math, technical requirements, and maintenance costs of each approach.

---

## Quick Quiz

Test your understanding of dual-context enrichment.

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "What's the primary difference between B2B and Creator enrichment?",
      "options": [
        "B2B uses LinkedIn, Creator uses YouTube",
        "B2B focuses on company data, Creator focuses on audience data",
        "B2B is cheaper, Creator is more expensive",
        "B2B is automated, Creator is manual"
      ],
      "correctIndex": 1,
      "explanation": "B2B enrichment centers on company-level data (firmographics, tech stack). Creator enrichment centers on individual audience data (subscribers, engagement, monetization)."
    },
    {
      "id": "q2",
      "question": "Which tool is best for enriching YouTube creator data?",
      "options": [
        "Apollo.io",
        "LinkedIn Sales Navigator",
        "YouTube API + AI Research Agent",
        "Clearbit"
      ],
      "correctIndex": 2,
      "explanation": "YouTube API provides subscriber counts, views, and upload data. AI Research Agent scrapes niche, monetization, and tools. Apollo and LinkedIn don't index creator metrics."
    },
    {
      "id": "q3",
      "question": "How should you classify a SaaS founder with a 20K newsletter?",
      "options": [
        "B2B only",
        "Creator only",
        "Hybrid (both B2B and Creator)",
        "Neither — not enough data"
      ],
      "correctIndex": 2,
      "explanation": "They have both a B2B business (SaaS) and a creator presence (newsletter). Enrich for both company data and audience data. Score on both dimensions."
    },
    {
      "id": "q4",
      "question": "What's the recommended budget for dual-context enrichment at 200 prospects/month?",
      "options": [
        "$20-50/mo (manual + AI)",
        "$150-200/mo (Clay + Crunchbase)",
        "$500+/mo (Phyllo + Clay Pro)",
        "$0 (all free tools)"
      ],
      "correctIndex": 1,
      "explanation": "At 200 prospects/month, Clay Explorer ($149/mo) + Crunchbase Basic ($29/mo) = $178/mo is the sweet spot. Manual + AI ($20-50/mo) works but is time-intensive. Phyllo ($299/mo) is overkill unless you're doing 500+ creators/month."
    },
    {
      "id": "q5",
      "question": "What's the biggest risk when enriching creator data?",
      "options": [
        "LinkedIn will ban your account",
        "AI will hallucinate monetization details",
        "YouTube API is too expensive",
        "Creators don't have email addresses"
      ],
      "correctIndex": 1,
      "explanation": "AI research agents can hallucinate monetization models, tool usage, and niche details if they don't find clear evidence. Always spot-check 10% of creator enrichments manually."
    }
  ]
}