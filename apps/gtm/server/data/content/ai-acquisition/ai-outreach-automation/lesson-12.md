---
title: "Your Outreach Stack Blueprint"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 24: AI Outreach Automation"
lesson: 12
---

You've spent 11 lessons learning platforms, sequences, personalization, deliverability, and compliance. Now comes the moment of truth: **assembling your actual outreach stack.**

Not a theoretical stack. Not a "someday when I have budget" stack. Your **real, working, under-$200/month system** that you'll use starting next week.

This lesson is different. No new concepts. Just decisions, configurations, and a complete blueprint you can execute in 4-6 hours.

---

## The Stack Assembly Challenge

Here's what makes this hard: **every tool you add creates integration debt.**

- Instantly + Clay = you need Zapier to connect them
- Instantly + HeyReach = two separate inboxes to monitor
- Add a CRM = now you need reply routing automation
- Add Loom = manual workflow for when to record videos

The goal isn't to use every tool. It's to **build the minimum viable stack that covers your strategy** without creating operational chaos.

<InsightCard icon="🎯" title="The $200 Constraint Is a Feature">
Budget limits force prioritization. A $2,000/month stack with 12 tools creates more problems than it solves for solo founders. Constraint breeds clarity.
</InsightCard>

Let's build your stack in 4 phases:

1. **Core Platform Selection** (the foundation)
2. **Essential Integrations** (what must connect)
3. **Optional Enhancements** (nice-to-haves if budget allows)
4. **Operational Workflow** (how you actually use it daily)

---

## Phase 1: Core Platform Selection

Your core platform is where sequences live and emails send. Everything else connects to this.

<SlideNavigation>
<Slide title="Decision 1: Email-Only or Multi-Channel?">

This is the first fork in the road.

**Email-Only Stack:**
- Instantly or Smartlead as the core
- Total cost: $37-39/month
- Best for: Low-to-mid ticket (&lt;$5K ACV), high-volume outreach, time-constrained founders

**Multi-Channel Stack:**
- Lemlist or La Growth Machine as the core
- Total cost: $59-100/month
- Best for: Mid-to-high ticket (>$5K ACV), relationship-first sales, LinkedIn-native industries

**The Hybrid Stack:**
- Instantly for email + HeyReach for LinkedIn
- Total cost: $116/month ($37 + $79)
- Best for: Founders who want best-in-class for each channel

<RangeSlider 
  label="What's your average deal size?" 
  min={500} 
  max={25000} 
  step={500}
  lowLabel="$500" 
  highLabel="$25K+" 
  persistKey="ai-outreach-automation-L12-acv" 
/>

**Decision Rule:**
- ACV < $2K → Email-only (Instantly)
- ACV $2K-$10K → Email-only or Hybrid (Instantly + HeyReach if LinkedIn-heavy ICP)
- ACV > $10K → Multi-channel (Lemlist or LGM)

</Slide>

<Slide title="Decision 2: Which Specific Tool?">

Assuming you've chosen email-only, here's the final decision:

**Instantly vs Smartlead:**

| Factor | Instantly | Smartlead | Winner |
|--------|-----------|-----------|--------|
| Price | $37/mo | $39/mo | Instantly |
| A/B Testing | 26 variants | Standard | Instantly |
| API/Webhooks | Basic | Advanced | Smartlead |
| UX | Cleaner | More technical | Instantly |
| Lead Database | Included (1K/mo) | Not included | Instantly |
| Warmup | Excellent | Excellent | Tie |

**Recommendation for 90% of solo founders: Instantly Growth ($37/mo)**

Choose Smartlead only if:
- You need advanced API integrations (custom CRM sync, n8n workflows)
- You're a technical founder who values developer experience
- You already have a lead source and don't need the built-in database

<SwipeDecision
  title="Instantly or Smartlead?"
  description="Based on your needs, which platform fits better?"
  optionA="Instantly"
  optionB="Smartlead"
  persistKey="ai-outreach-automation-L12-platform"
  cards={[
    { 
      id: "1", 
      content: "I want the simplest setup and best A/B testing", 
      correctOption: "a", 
      explanation: "Instantly wins on ease of use and native A/B testing (up to 26 variants)" 
    },
    { 
      id: "2", 
      content: "I need to build custom integrations via API", 
      correctOption: "b", 
      explanation: "Smartlead has superior API documentation and webhook flexibility" 
    },
    { 
      id: "3", 
      content: "I want a built-in lead database to get started fast", 
      correctOption: "a", 
      explanation: "Instantly includes Lead Finder (1K leads/month on Growth plan)" 
    },
    { 
      id: "4", 
      content: "I'm technical and want full control over data flows", 
      correctOption: "b", 
      explanation: "Smartlead's API-first design gives more programmatic control" 
    }
  ]}
/>

</Slide>

<Slide title="Decision 3: Multi-Channel Tool Selection">

If you chose multi-channel, here's the breakdown:

**Lemlist vs La Growth Machine:**

| Factor | Lemlist | La Growth Machine | Winner |
|--------|---------|------------------|--------|
| Price (entry) | $59/mo | $60/mo | Tie |
| Channels | Email + LinkedIn + Calls | Email + LinkedIn + Twitter | LGM (more channels) |
| Image Personalization | Excellent | Basic | Lemlist |
| Sequence Builder | Good | Excellent (visual) | LGM |
| Warmup | lemwarm (solid) | Included | Tie |
| European Market | Good | Excellent | LGM |

**Recommendation:**
- **Lemlist** if you value image/video personalization and simpler UX
- **La Growth Machine** if you want the most channels and visual sequence building

**HeyReach (LinkedIn-First):**
- Use if your ICP lives on LinkedIn and you're doing 80%+ LinkedIn outreach
- $79/mo for 1 LinkedIn account, 1 sender
- Risk: LinkedIn automation detection (use conservatively)

</Slide>
</SlideNavigation>

<TemplateBuilder
  title="Your Core Platform Decision"
  persistKey="ai-outreach-automation-L12-core"
  sections={[
    {
      id: "platform",
      title: "Platform Selection",
      fields: [
        { 
          id: "choice", 
          label: "Core Platform", 
          placeholder: "e.g., Instantly Growth", 
          type: "text" 
        },
        { 
          id: "reasoning", 
          label: "Why This Platform?", 
          placeholder: "e.g., Best value for email-only, excellent A/B testing, built-in lead database", 
          type: "textarea" 
        },
        { 
          id: "monthly-cost", 
          label: "Monthly Cost", 
          placeholder: "e.g., $37", 
          type: "text" 
        }
      ]
    }
  ]}
/>

---

## Phase 2: Essential Integrations

Your core platform doesn't work in isolation. Here are the **must-have** connections:

### 2.1 Lead Enrichment (Choose One)

You need data to personalize. Three options:

**Option A: Built-In Database (Instantly Lead Finder)**
- Cost: $0 (included in Instantly Growth)
- Quality: Good for basic firmographic data
- Limit: 1,000 leads/month
- Best for: Getting started fast, low-budget

**Option B: Apollo.io**
- Cost: $49/mo (Basic) or $79/mo (Professional)
- Quality: Excellent B2B database, 10K+ contacts/month
- Best for: High-volume prospecting, need phone numbers

**Option C: Clay**
- Cost: $149/mo (Starter) — **exceeds budget alone**
- Quality: Best-in-class enrichment + AI personalization
- Best for: High-ticket, research-intensive outreach
- **Budget Hack:** Use Clay's free tier (100 credits/month) for Tier A leads only

<InsightCard icon="💡" title="The Budget-Conscious Choice">
Start with Instantly Lead Finder (free). After 2 months of consistent execution, upgrade to Apollo Basic ($49) if you need more volume or better data quality.
</InsightCard>

**Decision Matrix:**

| Your Situation | Recommended Tool | Monthly Cost |
|---------------|-----------------|--------------|
| Just starting, &lt;500 emails/month | Instantly Lead Finder | $0 |
| Scaling to 1K+ emails/month | Apollo Basic | $49 |
| High-ticket, need deep research | Clay Free (Tier A) + Instantly (Tier B/C) | $0 |
| High-volume, need phone + email | Apollo Professional | $79 |

### 2.2 CRM (Choose One or None)

**The Controversial Take: You might not need a CRM yet.**

If you're doing &lt;50 conversations/month, a spreadsheet + email labels work fine. Save the $20-50/month.

**When You DO Need a CRM:**
- 50+ active conversations/month
- Multiple team members (VA, co-founder)
- Complex sales cycles (multiple touchpoints, long cycles)

**Budget-Friendly CRM Options:**

| CRM | Pricing | Best For |
|-----|---------|----------|
| HubSpot (Free) | $0 | Solo founders, simple pipeline |
| Pipedrive | $14/mo (Essential) | Visual pipeline, easy setup |
| Attio | $29/mo (Plus) | Modern UX, relationship-focused |
| Notion (as CRM) | $0-10/mo | DIY, full customization |

**Recommendation:** Start with **HubSpot Free**. Upgrade to Pipedrive ($14) only when you need better automation or reporting.

### 2.3 Automation Glue (Zapier/Make/n8n)

You need something to connect:
- Outreach platform → CRM (when someone replies)
- CRM → Outreach platform (when deal closes, stop sequences)
- Enrichment tool → Outreach platform (data flow)

**Three Options:**

| Tool | Pricing | Complexity | Best For |
|------|---------|-----------|----------|
| Zapier | $20/mo (Starter, 750 tasks) | Low | Non-technical founders |
| Make | $9/mo (Core, 10K ops) | Medium | Budget-conscious, some tech skills |
| n8n | $0 (self-hosted) or $20/mo (cloud) | High | Technical founders |

**Recommendation:** **Make.com Core ($9/mo)** for best value. Zapier if you want simplest UX.

<ExampleCard label="Essential Zap/Scenario: Reply Detection">

**Trigger:** New reply detected in Instantly
**Action 1:** Create deal in HubSpot (or update existing)
**Action 2:** Stop the sequence for that contact
**Action 3:** Send Slack notification (optional)
**Action 4:** Add to "Replied" list for tracking

**Make.com Cost:** ~50 operations/month = well within free tier or $9 plan

</ExampleCard>

---

## Phase 3: Optional Enhancements

These are **nice-to-haves** if you have budget left after core + essentials.

### 3.1 LinkedIn Automation (If Multi-Channel)

**If you chose email-only core (Instantly), but want LinkedIn:**

- **HeyReach Starter:** $79/mo (LinkedIn automation)
- **Expandi:** $99/mo (more features, higher risk)
- **Dripify:** $59/mo (budget option, medium risk)

**Budget Check:**
- Instantly ($37) + HeyReach ($79) + Make ($9) = **$125/mo**
- Leaves $75 for enrichment (Apollo Basic $49) = **$174/mo total**

### 3.2 Video Personalization (High-Ticket Only)

**Loom:**
- Free: 25 videos, 5 min each
- Starter: $12.50/mo, unlimited videos
- **Use case:** Tier A prospects only (top 10-20%)

**Vidyard:**
- Free: Unlimited 1:1 videos
- **Better for:** Solo founders (free tier is generous)

**Recommendation:** Start with **Vidyard Free**. Upgrade to Loom Starter only if you're recording 30+ videos/month.

### 3.3 AI Writing Assistant (If Not Using Clay)

**If you're NOT using Clay for AI personalization:**

- **ChatGPT Plus:** $20/mo (GPT-4 access for manual personalization)
- **Claude Pro:** $20/mo (better for long-form, nuanced copy)
- **Jasper/Copy.ai:** $49+/mo (overkill for solo founders)

**Recommendation:** **ChatGPT Plus ($20/mo)** if you're manually personalizing Tier A emails. Otherwise, use Instantly's built-in AI (free).

---

## Phase 4: Your Complete Stack Blueprints

Here are **3 complete stacks** at different price points and strategies:

<SlideNavigation>
<Slide title="Stack A: Email-Only Starter ($37/mo)">

**Best For:** Solo founders just starting, low-to-mid ticket, time-constrained

| Component | Tool | Cost |
|-----------|------|------|
| Core Platform | Instantly Growth | $37/mo |
| Lead Enrichment | Instantly Lead Finder | $0 (included) |
| CRM | HubSpot Free | $0 |
| Automation | Make Free Tier | $0 |
| AI Writing | Instantly AI Writer | $0 (included) |
| **Total** | | **$37/mo** |

**What You Can Do:**
- Send 5,000 emails/month across unlimited inboxes
- A/B test up to 26 variants per step
- Enrich 1,000 leads/month from built-in database
- AI-generate first lines and subject lines
- Track opens, replies, clicks
- Basic reply routing to HubSpot

**Limitations:**
- No LinkedIn automation
- Limited enrichment data (1K leads/month)
- Manual Tier A personalization
- No advanced integrations

**When to Upgrade:** When you're consistently sending 3K+ emails/month and need more enrichment data or LinkedIn.

</Slide>

<Slide title="Stack B: Email + Enrichment ($86/mo)">

**Best For:** Scaling founders, need better data, 1K+ emails/month

| Component | Tool | Cost |
|-----------|------|------|
| Core Platform | Instantly Growth | $37/mo |
| Lead Enrichment | Apollo Basic | $49/mo |
| CRM | HubSpot Free | $0 |
| Automation | Make Core | $9/mo |
| AI Writing | Instantly AI Writer | $0 (included) |
| **Total** | | **$95/mo** |

**What You Can Do:**
- Send 5,000 emails/month
- Enrich 10,000+ contacts/month (Apollo)
- Phone numbers + verified emails
- Advanced filtering (tech stack, funding, hiring)
- Multi-step Make scenarios (reply routing, deal creation)
- Better data quality = higher reply rates

**Limitations:**
- Still no LinkedIn automation
- Manual Tier A personalization

**When to Upgrade:** When you need LinkedIn outreach or AI-powered deep personalization.

</Slide>

<Slide title="Stack C: Multi-Channel Pro ($174/mo)">

**Best For:** High-ticket founders (>$5K ACV), relationship-first sales, LinkedIn-heavy ICP

| Component | Tool | Cost |
|-----------|------|------|
| Core Platform | Instantly Growth | $37/mo |
| LinkedIn Automation | HeyReach Starter | $79/mo |
| Lead Enrichment | Apollo Basic | $49/mo |
| CRM | HubSpot Free | $0 |
| Automation | Make Core | $9/mo |
| AI Writing | Instantly AI Writer | $0 (included) |
| **Total** | | **$174/mo** |

**What You Can Do:**
- Send 5,000 emails/month (Instantly)
- 50-100 LinkedIn connection requests/week (HeyReach)
- Multi-channel sequences (email → LinkedIn view → connect → message)
- Enrich 10K+ contacts/month
- Advanced reply routing and deal creation
- LinkedIn + email in one workflow

**Limitations:**
- No AI-powered deep personalization (would need Clay at $149 = over budget)
- LinkedIn automation risk (use conservatively)

**When to Upgrade:** When you're doing $10K+ MRR and can afford Clay ($149) for AI research-based personalization.

</Slide>

<Slide title="Stack D: Multi-Channel All-In-One ($99/mo)">

**Best For:** Founders who want simplicity over best-in-class per channel

| Component | Tool | Cost |
|-----------|------|------|
| Core Platform | Lemlist Multichannel Expert | $99/mo |
| Lead Enrichment | Lemlist built-in + manual CSV | $0 |
| CRM | HubSpot Free | $0 |
| Automation | Zapier Free Tier | $0 |
| AI Writing | Lemlist AI | $0 (included) |
| **Total** | | **$99/mo** |

**What You Can Do:**
- Email + LinkedIn + calls in one platform
- Image and video personalization
- lemwarm for deliverability
- 5 email accounts per plan
- Simpler setup (fewer integrations)

**Limitations:**
- Less powerful A/B testing than Instantly
- Smaller email volume (5 accounts vs unlimited)
- Enrichment data quality lower than Apollo

**When to Choose This:** If you value simplicity and all-in-one over best-in-class per channel.

</Slide>
</SlideNavigation>

<ComparisonBuilder
  title="Build Your Stack"
  persistKey="ai-outreach-automation-L12-stack"
  prompt="Based on your ACV, volume, and strategy, which stack fits best?"
  expertExample="Stack B (Email + Enrichment, $95/mo) — I'm doing $3K ACV, 800 emails/month, email-only strategy. Apollo gives me better data than Instantly's built-in database, and Make lets me route replies to HubSpot automatically."
  criteria={[
    "Matches your ACV and sales motion",
    "Fits within $200/month budget",
    "Covers your primary channel (email, LinkedIn, or both)",
    "Includes necessary integrations (enrichment, CRM, automation)"
  ]}
/>

---

## Your Stack Implementation Checklist

You've chosen your stack. Now execute the setup in **4-6 hours** over the next week.

<InteractiveChecklist 
  title="Stack Setup Sprint (Week 1)" 
  persistKey="ai-outreach-automation-L12-setup" 
  items={[
    "Sign up for core platform (Instantly, Smartlead, Lemlist, or LGM)",
    "Connect 2-3 email inboxes (Google Workspace or Microsoft 365)",
    "Start warmup on all inboxes (14-day minimum before sending)",
    "Sign up for enrichment tool (Apollo, Clay, or use built-in)",
    "Set up HubSpot Free CRM (or chosen CRM)",
    "Create Make.com account and build reply routing scenario",
    "Import first 100-200 leads into platform",
    "Create first campaign (3-5 step sequence)",
    "Set daily send limits (start at 25/inbox/day)",
    "Run deliverability check (GlockApps or Mail-Tester)",
    "Send first 25 emails as a test batch",
    "Monitor for 48 hours (opens, replies, bounces)",
    "Adjust and scale to 50/inbox/day if metrics are healthy"
  ]} 
/>

<InsightCard icon="⚠️" title="The 14-Day Warmup Rule">
Do NOT skip warmup. Sending cold emails from a fresh inbox = instant spam folder. Start warmup on Day 1, send first real emails on Day 15+.
</InsightCard>

---

## Daily Operational Workflow

Your stack is live. Here's how you **actually use it** every day:

### Morning Routine (15 minutes)

<ProgressiveReveal title="Daily Outreach Workflow" persistKey="ai-outreach-automation-L12-workflow">
<RevealSection title="Step 1: Check Replies (5 min)">

**In your outreach platform:**
- Review new replies from yesterday
- Classify: Positive, Objection, Not Interested, Out of Office
- For Positive: move to CRM, schedule call
- For Objection: respond with LARA framework (from Course 17)
- For Not Interested: mark as closed, remove from sequence

**Automation handles:**
- Reply detection → CRM deal creation
- Sequence stopping for replied contacts
- Slack notification (if configured)

</RevealSection>

<RevealSection title="Step 2: Review Metrics (3 min)">

**Key metrics to check daily:**
- Open rate (target: 40-60%)
- Reply rate (target: 5-15%)
- Bounce rate (target: &lt;2%)
- Unsubscribe rate (target: &lt;0.5%)

**Red flags:**
- Open rate &lt;30% → deliverability issue
- Bounce rate >5% → list quality issue
- Unsubscribe rate >1% → messaging or targeting problem

</RevealSection>

<RevealSection title="Step 3: Add New Leads (5 min)">

**Daily lead addition:**
- Import 20-50 new leads (from Apollo, Clay, or manual research)
- Run enrichment (if using external tool)
- Assign to appropriate campaign
- Review AI-generated first lines (spot-check 10%)

**Weekly lead addition:**
- Import 100-200 leads on Monday
- Spread across the week's campaigns

</RevealSection>

<RevealSection title="Step 4: Adjust Campaigns (2 min)">

**Based on yesterday's data:**
- Pause underperforming variants (reply rate &lt;3%)
- Promote high-performing variants (reply rate >10%)
- Adjust daily send limits if needed
- Update subject lines or first lines if stale

</RevealSection>
</ProgressiveReveal>

### Weekly Routine (60 minutes)

<InteractiveChecklist 
  title="Weekly Stack Maintenance" 
  persistKey="ai-outreach-automation-L12-weekly" 
  items={[
    "Review full-week metrics (opens, replies, meetings booked)",
    "Run A/B test analysis (which variants won?)",
    "Update ICP based on who's replying (refine targeting)",
    "Clean bounced/invalid emails from lists",
    "Check inbox health scores (Instantly/Smartlead analytics)",
    "Review and respond to all objections from the week",
    "Plan next week's campaigns (new segments, new angles)",
    "Update CRM pipeline (move deals forward)",
    "Backup lead data and campaign templates",
    "Spot-check 20 AI-generated emails for quality"
  ]} 
/>

---

## Scaling Your Stack (Months 2-6)

Your stack isn't static. Here's how it evolves:

### Month 2: Optimize

<FlipCard 
  front="What to optimize in Month 2?" 
  back="Focus on reply rate improvement: better targeting (tighter ICP), better personalization (AI + manual Tier A), better sequences (A/B test results). Don't add tools yet." 
/>

**Key activities:**
- Run 3-5 A/B tests on subject lines, first lines, CTAs
- Refine ICP based on who's actually replying
- Improve personalization quality (AI prompts, manual Tier A)
- Increase send volume gradually (25 → 50 → 75/inbox/day)

### Month 3: Scale Volume

**When to scale:**
- Reply rate consistently >5%
- Bounce rate &lt;2%
- No deliverability issues for 30+ days

**How to scale:**
- Add 2-3 more email inboxes (stay within platform limits)
- Increase daily send limits to 75-100/inbox/day
- Import larger lead batches (500-1000/week)
- Consider upgrading enrichment tool if hitting limits

### Month 4-6: Add Channels or Upgrade

**Upgrade triggers:**
- Consistently hitting platform limits (contacts, emails, inboxes)
- Need better data quality (upgrade Apollo Basic → Pro)
- Want to add LinkedIn (add HeyReach or switch to Lemlist)
- Need AI-powered deep personalization (add Clay)

**Budget reallocation:**
- If revenue is growing, reinvest 10-20% into stack upgrades
- Example: $5K MRR → $100-200/month stack budget is reasonable

---

## Common Stack Mistakes (and How to Avoid Them)

<ClassifyExercise
  title="Stack Decision: Smart or Mistake?"
  persistKey="ai-outreach-automation-L12-mistakes"
  categories={[
    { id: "smart", label: "Smart Move", color: "#10b981" },
    { id: "mistake", label: "Mistake", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Signing up for 5 tools in Week 1 to 'have everything ready'", 
      correctCategory: "mistake",
      explanation: "Integration debt kills execution. Start with core platform + 1-2 essentials. Add tools only when you hit a real limitation."
    },
    { 
      id: "2", 
      content: "Starting with Instantly Growth ($37) and upgrading later if needed", 
      correctCategory: "smart",
      explanation: "Start lean. Upgrade when you have data proving you need more capacity or features."
    },
    { 
      id: "3", 
      content: "Skipping warmup to 'get started faster'", 
      correctCategory: "mistake",
      explanation: "Warmup is non-negotiable. Skipping it = spam folder = wasted time and money."
    },
    { 
      id: "4", 
      content: "Using HubSpot Free instead of paying for a CRM in Month 1", 
      correctCategory: "smart",
      explanation: "HubSpot Free is excellent for solo founders. Upgrade only when you need automation or advanced reporting."
    },
    { 
      id: "5", 
      content: "Adding Clay ($149/mo) in Week 1 for AI personalization", 
      correctCategory: "mistake",
      explanation: "Clay is powerful but expensive. Start with built-in AI (Instantly/Lemlist). Add Clay only for high-ticket Tier A leads after Month 2-3."
    },
    { 
      id: "6", 
      content: "Building Make scenarios to automate reply routing before sending first email", 
      correctCategory: "smart",
      explanation: "Set up automation BEFORE you have replies to route. Prevents manual chaos when replies start coming in."
    }
  ]}
/>

---

## Your Final Stack Blueprint

You've made all the decisions. Now document your stack for future reference.

<TemplateBuilder
  title="My Outreach Stack Blueprint"
  persistKey="ai-outreach-automation-L12-blueprint"
  sections={[
    {
      id: "core",
      title: "Core Platform",
      fields: [
        { id: "platform", label: "Platform Name", placeholder: "e.g., Instantly Growth", type: "text" },
        { id: "plan", label: "Plan", placeholder: "e.g., Growth ($37/mo)", type: "text" },
        { id: "inboxes", label: "Number of Inboxes", placeholder: "e.g., 3", type: "text" },
        { id: "daily-limit", label: "Daily Send Limit (per inbox)", placeholder: "e.g., 50", type: "text" }
      ]
    },
    {
      id: "enrichment",
      title: "Lead Enrichment",
      fields: [
        { id: "tool", label: "Enrichment Tool", placeholder: "e.g., Apollo Basic", type: "text" },
        { id: "cost", label: "Monthly Cost", placeholder: "e.g., $49", type: "text" },
        { id: "limit", label: "Monthly Lead Limit", placeholder: "e.g., 10,000", type: "text" }
      ]
    },
    {
      id: "crm",
      title: "CRM",
      fields: [
        { id: "crm-name", label: "CRM Name", placeholder: "e.g., HubSpot Free", type: "text" },
        { id: "crm-cost", label: "Monthly Cost", placeholder: "e.g., $0", type: "text" }
      ]
    },
    {
      id: "automation",
      title: "Automation",
      fields: [
        { id: "automation-tool", label: "Automation Tool", placeholder: "e.g., Make Core", type: "text" },
        { id: "automation-cost", label: "Monthly Cost", placeholder: "e.g., $9", type: "text" },
        { id: "key-scenarios", label: "Key Scenarios", placeholder: "e.g., Reply routing, Deal creation, Sequence stopping", type: "textarea" }
      ]
    },
    {
      id: "optional",
      title: "Optional Tools",
      fields: [
        { id: "linkedin", label: "LinkedIn Tool (if any)", placeholder: "e.g., HeyReach Starter ($79)", type: "text" },
        { id: "video", label: "Video Tool (if any)", placeholder: "e.g., Vidyard Free", type: "text" },
        { id: "ai-writing", label: "AI Writing Tool (if any)", placeholder: "e.g., ChatGPT Plus ($20)", type: "text" }
      ]
    },
    {
      id: "total",
      title: "Total Monthly Cost",
      fields: [
        { id: "total-cost", label: "Total Stack Cost", placeholder: "e.g., $95/mo", type: "text" },
        { id: "budget-check", label: "Within Budget? (&lt;$200)", placeholder: "e.g., Yes, $105 under budget", type: "text" }
      ]
    }
  ]}
/>

---

## Your 7-Day Implementation Sprint

This is it. The final push. **7 days to go from blueprint to live outreach system.**

<TimedChallenge
  title="Day 1 Challenge: Platform Setup (60 min)"
  persistKey="ai-outreach-automation-L12-day1"
  timeLimit={3600}
  items={[
    { 
      id: "1", 
      prompt: "Sign up for core platform and connect first inbox", 
      correctAnswer: "complete", 
      explanation: "Start warmup immediately after connecting" 
    },
    { 
      id: "2", 
      prompt: "Configure warmup settings (enable, set to gradual ramp)", 
      correctAnswer: "complete", 
      explanation: "14-day warmup before sending cold emails" 
    },
    { 
      id: "3", 
      prompt: "Connect 2 additional inboxes (total 3)", 
      correctAnswer: "complete", 
      explanation: "More inboxes = more daily send capacity" 
    },
    { 
      id: "4", 
      prompt: "Set daily send limits to 25/inbox/day (conservative start)", 
      correctAnswer: "complete", 
      explanation: "Scale up gradually over 2 weeks" 
    }
  ]}
/>

<InteractiveChecklist 
  title="7-Day Implementation Sprint" 
  persistKey="ai-outreach-automation-L12-sprint" 
  items={[
    "Day 1: Platform setup + warmup start (60 min)",
    "Day 2: CRM setup + Make scenario creation (60 min)",
    "Day 3: Enrichment tool setup + first lead import (45 min)",
    "Day 4: First campaign creation (3-5 step sequence) (60 min)",
    "Day 5: AI personalization setup + quality check (45 min)",
    "Day 6: Deliverability check + test batch (25 emails) (30 min)",
    "Day 7: Monitor test batch + adjust settings (30 min)",
    "Day 14: Warmup complete → scale to 50/inbox/day",
    "Day 21: Review first week of real outreach → optimize",
    "Day 30: Full-month review → plan Month 2 improvements"
  ]} 
/>

---

## Final Thoughts: The Stack Is a System, Not a Collection of Tools

Here's what separates successful solo founders from those who burn out on outreach:

**Successful founders:**
- Choose 3-5 tools max
- Integrate them tightly (automation, reply routing)
- Use them consistently (daily routine, weekly review)
- Optimize based on data (A/B tests, metrics)
- Upgrade only when hitting real limits

**Struggling founders:**
- Sign up for 10+ tools "just in case"
- Never integrate them (manual chaos)
- Use them sporadically (no rhythm)
- Chase shiny objects (new tools every month)
- Upgrade prematurely (before proving need)

Your stack is a **system**. It should:
1. **Capture leads** (enrichment tool)
2. **Personalize at scale** (AI + templates)
3. **Send multi-touch sequences** (outreach platform)
4. **Route replies** (automation)
5. **Track pipeline** (CRM)
6. **Improve over time** (A/B testing, metrics)

If any piece is missing, the system breaks. If you have extra pieces that don't connect, they create drag.

**Build the minimum viable system. Execute consistently. Optimize based on data. Scale when ready.**

That's the blueprint.

---

## Course Completion: Your Outreach System Is Live

You've completed **Course 24: AI Outreach Automation**.

You now have:
- ✅ A chosen outreach platform (Instantly, Smartlead, Lemlist, or LGM)
- ✅ Multi-channel sequence templates (email-only or email + LinkedIn)
- ✅ AI personalization workflows (in-tool or external LLM)
- ✅ Deliverability infrastructure (warmup, DNS, monitoring)
- ✅ Reply routing automation (Make/Zapier → CRM)
- ✅ A complete stack blueprint (&lt;$200/month)
- ✅ A 7-day implementation sprint plan

**Next steps:**
1. Execute your 7-day sprint (start today)
2. Send first test batch on Day 6
3. Scale to 50-75/inbox/day by Day 21
4. Review Month 1 metrics and optimize
5. Move to **Course 25: LinkedIn AI Applications** (if multi-channel) or **Course 26: Autonomous SDR Systems** (if scaling)

**Your outreach system is no longer theoretical. It's real, configured, and ready to generate pipeline.**

Now go build it. 🚀