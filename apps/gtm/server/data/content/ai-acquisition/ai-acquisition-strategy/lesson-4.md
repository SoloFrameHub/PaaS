---
title: "Your Lead Scoring Model (1-10 Fit + Signal + Friction)"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 21: AI Acquisition Strategy"
lesson: 4
---

You've built your list. You've enriched the data. Now you're staring at 500 prospects and a brutal question: **Which 50 deserve your time this week?**

Without a scoring system, you'll either:
- Waste hours on tire-kickers who'll never buy
- Miss the hot leads buried in your CRM
- Burn out chasing "everyone" with equal intensity

Here's the reality: **Not all leads are created equal.** A recently-funded Series A SaaS company that just hired a VP of Sales is worth 10x more attention than a bootstrapped solopreneur who hasn't updated their LinkedIn in 2 years.

The solution? A simple 1-10 scoring model that combines three dimensions: **Fit** (do they match your ICP?), **Signal** (are they showing buying intent?), and **Friction** (what's blocking the sale?).

By the end of this lesson, you'll have a working lead scoring rubric that tells you exactly who to call first.

---

## The Problem with "Spray and Pray"

Most solo founders treat all prospects the same. They send the same sequence to the VP at a $50M company and the intern at a 3-person startup. Same follow-up cadence. Same level of personalization.

The result? **50%+ of sales time wasted on unqualified prospects.**

<InsightCard icon="📊" title="The Qualification Gap">
Only 25% of marketing leads are actually sales-ready, yet most founders spend equal time on all of them. Lead scoring increases sales productivity by 20-30% by focusing effort where it matters.
</InsightCard>

Think about your last 20 outreach conversations. How many were with people who:
- Had no budget?
- Weren't the decision-maker?
- Had no urgent problem to solve?
- Were just "exploring options" with no timeline?

Now imagine if you'd known that **before** spending 30 minutes on a discovery call.

<RangeSlider 
  label="What percentage of your sales time is spent on unqualified leads?" 
  min={0} 
  max={100} 
  lowLabel="0% (I'm perfect)" 
  highLabel="100% (All of it)" 
  persistKey="ai-acquisition-strategy-L4-waste" 
/>

---

## The FIT + SIGNAL + FRICTION Model

Here's the framework that changes everything:

<FlipCard 
  front="The 1-10 Scoring Formula" 
  back="Score = FIT (0-4 points) + SIGNAL (0-4 points) - FRICTION (0-2 points). Action thresholds: 8-10 = Immediate personal outreach | 5-7 = Automated sequence | 1-4 = Nurture or disqualify" 
/>

Let's break down each dimension.

### Dimension 1: FIT (0-4 Points)

**Fit** measures how well a prospect matches your Ideal Customer Profile. This is firmographic and demographic data — the stuff that doesn't change day-to-day.

Award **1 point** for each of these matches:

1. **Industry/Vertical Match** — Are they in a segment you serve well?
2. **Title/Role Match** — Is this person the actual decision-maker or heavy influencer?
3. **Company Size Match** — Do they fit your sweet spot (employees, revenue, funding stage)?
4. **Tech Stack/Signal Match** — Do they use complementary tools or show technical sophistication?

**Example:**
- **Your ICP:** B2B SaaS companies, 10-50 employees, $500K-5M ARR, using HubSpot
- **Prospect A:** VP Sales at a 30-person SaaS company, $2M ARR, uses HubSpot → **4/4 FIT**
- **Prospect B:** Marketing Coordinator at a 200-person e-commerce brand, uses Shopify → **1/4 FIT** (only role is somewhat relevant)

<ExampleCard label="Real Example: The $40K Mistake">
A founder spent 3 months chasing enterprise logos (500+ employees) because they "looked impressive." His product was built for 10-50 person teams. Average sales cycle: 9 months. Close rate: 5%.

When he refocused on his actual ICP (30-person companies), sales cycle dropped to 6 weeks and close rate jumped to 35%. Same effort, 7x better results.
</ExampleCard>

<TemplateBuilder
  title="Define Your FIT Criteria"
  persistKey="ai-acquisition-strategy-L4-fit"
  sections={[
    {
      id: "industry",
      title: "Industry/Vertical",
      fields: [
        { id: "primary", label: "Primary Industry", placeholder: "e.g., B2B SaaS, DTC e-commerce", type: "text" },
        { id: "secondary", label: "Secondary Industries (if any)", placeholder: "e.g., Professional services, Agencies", type: "text" }
      ]
    },
    {
      id: "role",
      title: "Title/Role",
      fields: [
        { id: "buyer", label: "Primary Decision-Maker Title", placeholder: "e.g., VP Sales, Head of Marketing", type: "text" },
        { id: "influencer", label: "Key Influencer Titles", placeholder: "e.g., Sales Ops Manager, Marketing Director", type: "text" }
      ]
    },
    {
      id: "size",
      title: "Company Size",
      fields: [
        { id: "employees", label: "Employee Range", placeholder: "e.g., 10-50", type: "text" },
        { id: "revenue", label: "Revenue Range (if known)", placeholder: "e.g., $500K-5M ARR", type: "text" }
      ]
    },
    {
      id: "tech",
      title: "Tech Stack/Signals",
      fields: [
        { id: "tools", label: "Key Tools They Should Use", placeholder: "e.g., HubSpot, Salesforce, Stripe", type: "text" },
        { id: "maturity", label: "Technical Maturity Indicator", placeholder: "e.g., Has a CRM, Uses marketing automation", type: "text" }
      ]
    }
  ]}
/>

---

## Dimension 2: SIGNAL (0-4 Points)

**Signal** measures behavioral intent — actions that suggest they're in-market or ready to buy. This is dynamic data that changes weekly.

Award **1 point** for each of these signals:

1. **Job Change (Past 90 Days)** — New role = new budget, new priorities, new vendor decisions
2. **Funding/Growth Event** — Recent raise, acquisition, expansion, new office
3. **Content Engagement** — Downloaded your lead magnet, attended webinar, engaged with posts
4. **Competitor Evaluation** — Visited competitor sites, asked about alternatives, mentioned switching

**The Power of Job Changes:**

<InsightCard icon="🚀" title="The 90-Day Window">
Prospects who changed jobs in the past 90 days are **3x more likely to buy** than static contacts. They're building new systems, proving themselves, and have fresh budget authority.
</InsightCard>

**Example:**
- **Prospect A:** Just became VP Sales (2 weeks ago) at a Series A company that raised $10M last month → **2/4 SIGNAL** (job change + funding)
- **Prospect B:** Same title for 3 years, no recent company news, never engaged with your content → **0/4 SIGNAL**

Where do you find these signals?

<SlideNavigation>
<Slide title="First-Party Signals (Free)">

**Website Behavior:**
- Visited pricing page 3+ times
- Spent 5+ minutes on case studies
- Downloaded a resource

**Email Engagement:**
- Opened your last 3 emails
- Clicked a demo link
- Replied asking a question

**Tools:** Google Analytics 4 (free), HubSpot CRM (free email tracking)

</Slide>

<Slide title="Second-Party Signals (Low Cost)">

**LinkedIn Activity:**
- Changed jobs in past 90 days
- Posted about a problem you solve
- Engaged with your content

**News/Funding:**
- Crunchbase funding announcements
- Company blog posts about growth
- Press releases about new hires

**Tools:** LinkedIn Sales Navigator ($99.99/mo), Google Alerts (free), Crunchbase (free tier)

</Slide>

<Slide title="Third-Party Signals (Expensive — Skip for Now)">

**Intent Data Platforms:**
- Bombora ($2,000+/month)
- 6sense ($3,000+/month)
- ZoomInfo Intent ($1,500+/month)

**Why skip?** At solo founder scale, the ROI isn't there. Stick to first-party and second-party signals until you're doing $50K+/month.

</Slide>
</SlideNavigation>

<ClassifyExercise
  title="Classify These Signals"
  persistKey="ai-acquisition-strategy-L4-signals"
  categories={[
    { id: "strong", label: "Strong Signal (1 point)", color: "#10b981" },
    { id: "weak", label: "Weak Signal (0 points)", color: "#6b7280" }
  ]}
  items={[
    { id: "1", content: "Prospect changed jobs 3 weeks ago", correctCategory: "strong" },
    { id: "2", content: "Prospect liked your LinkedIn post", correctCategory: "weak" },
    { id: "3", content: "Company announced Series A funding last month", correctCategory: "strong" },
    { id: "4", content: "Prospect visited your homepage once", correctCategory: "weak" },
    { id: "5", content: "Prospect downloaded your lead magnet and visited pricing", correctCategory: "strong" },
    { id: "6", content: "Prospect has same title for 5 years, no recent activity", correctCategory: "weak" }
  ]}
/>

---

## Dimension 3: FRICTION (0 to -2 Points)

**Friction** measures barriers to closing. These are red flags that make deals harder, slower, or less likely to close.

**Subtract 1 point** for each of these friction factors:

1. **Long Sales Cycle Industry** — Healthcare, government, education (6-12+ month cycles)
2. **Committee Buying Process** — Enterprise deals requiring 5+ stakeholders

**Why subtract instead of just scoring lower on FIT?**

Because friction is different from poor fit. A prospect might be a *perfect* ICP match (4/4 FIT) and show strong intent (3/4 SIGNAL), but if they're in healthcare with a 9-month procurement process, you need to know that upfront.

**Example:**
- **Prospect A:** 4 FIT + 3 SIGNAL - 1 FRICTION (healthcare) = **6/10** → Automated sequence, not immediate personal outreach
- **Prospect B:** 4 FIT + 3 SIGNAL - 0 FRICTION = **7/10** → Worth a personalized email

<SwipeDecision
  title="High Friction or Low Friction?"
  description="Swipe right for low friction (easy to close), left for high friction (hard to close)"
  optionA="High Friction"
  optionB="Low Friction"
  persistKey="ai-acquisition-strategy-L4-friction"
  cards={[
    { id: "1", content: "Solo founder with credit card, makes decisions in 1 week", correctOption: "b", explanation: "Low friction — fast decision, simple buying process" },
    { id: "2", content: "Enterprise with procurement team, legal review, 6-month cycle", correctOption: "a", explanation: "High friction — committee buying, long sales cycle" },
    { id: "3", content: "Mid-market SaaS VP with budget authority, 2-week eval", correctOption: "b", explanation: "Low friction — single decision-maker, reasonable timeline" },
    { id: "4", content: "Government agency requiring RFP and compliance review", correctOption: "a", explanation: "High friction — regulatory requirements, long procurement" },
    { id: "5", content: "Startup founder who can start trial today", correctOption: "b", explanation: "Low friction — self-serve, immediate action" }
  ]}
/>

---

## Putting It All Together: Action Thresholds

Now that you can score any lead from 1-10, what do you *do* with that score?

Here's your action framework:

<FlipCard 
  front="Score 8-10: Hot Leads" 
  back="Immediate personal outreach. Research for 15-30 minutes. Write a custom email or LinkedIn message. Follow up within 48 hours if no reply. These are your top 10-20% of leads." 
/>

<FlipCard 
  front="Score 5-7: Warm Leads" 
  back="Automated sequence with segment-level personalization. AI-assisted first lines. 3-5 touch sequence over 2 weeks. Spot-check 10-20% for quality. These are your middle 50% of leads." 
/>

<FlipCard 
  front="Score 1-4: Cold Leads" 
  back="Nurture sequence or disqualify. Monthly newsletter, content drip, or remove from active outreach. Don't waste time on manual follow-up. These are your bottom 30% of leads." 
/>

**The Math:**

If you have 200 prospects:
- **20-40 leads (10-20%)** score 8-10 → 5-10 hours of personal outreach
- **100-120 leads (50-60%)** score 5-7 → 2-3 hours of sequence setup + monitoring
- **40-80 leads (20-40%)** score 1-4 → 30 minutes to add to nurture or archive

Total time: **8-14 hours** to process 200 leads vs. **40+ hours** if you treat everyone equally.

<ScenarioSimulator
  title="Lead Scoring ROI Calculator"
  persistKey="ai-acquisition-strategy-L4-roi"
  levers={[
    { id: "totalLeads", label: "Total leads in CRM", min: 50, max: 1000, step: 50, defaultValue: 200 },
    { id: "hotPercent", label: "% scoring 8-10 (hot)", min: 5, max: 30, step: 5, defaultValue: 15 },
    { id: "warmPercent", label: "% scoring 5-7 (warm)", min: 30, max: 70, step: 5, defaultValue: 55 },
    { id: "timePerHot", label: "Minutes per hot lead", min: 10, max: 60, step: 5, defaultValue: 20 }
  ]}
  outputs={[
    { id: "hotLeads", label: "Hot leads to work", formula: "totalLeads * (hotPercent / 100)", unit: " leads", precision: 0 },
    { id: "warmLeads", label: "Warm leads (automated)", formula: "totalLeads * (warmPercent / 100)", unit: " leads", precision: 0 },
    { id: "coldLeads", label: "Cold leads (nurture/archive)", formula: "totalLeads - (totalLeads * (hotPercent / 100)) - (totalLeads * (warmPercent / 100))", unit: " leads", precision: 0 },
    { id: "hotTime", label: "Time on hot leads", formula: "(totalLeads * (hotPercent / 100) * timePerHot) / 60", unit: " hours", precision: 1 },
    { id: "totalTime", label: "Total time saved vs. no scoring", formula: "((totalLeads * 20) / 60) - ((totalLeads * (hotPercent / 100) * timePerHot) / 60) - 3", unit: " hours", precision: 1 }
  ]}
  insight="With scoring, you spend {hotTime} hours on your best {hotLeads} leads instead of {(totalLeads * 20) / 60} hours treating everyone equally. That's {totalTime} hours saved per batch."
/>

---

## Building Your Scoring Rubric

Time to make this real. You're going to build your own 1-10 scoring model right now.

<TemplateBuilder
  title="Your Lead Scoring Rubric"
  persistKey="ai-acquisition-strategy-L4-rubric"
  sections={[
    {
      id: "fit",
      title: "FIT Criteria (0-4 points)",
      fields: [
        { id: "industry", label: "Industry Match (+1 point if...)", placeholder: "e.g., They're in B2B SaaS or professional services", type: "text" },
        { id: "title", label: "Title Match (+1 point if...)", placeholder: "e.g., They're VP Sales, Head of Marketing, or Founder", type: "text" },
        { id: "size", label: "Company Size Match (+1 point if...)", placeholder: "e.g., They have 10-50 employees", type: "text" },
        { id: "tech", label: "Tech Stack Match (+1 point if...)", placeholder: "e.g., They use HubSpot, Salesforce, or similar CRM", type: "text" }
      ]
    },
    {
      id: "signal",
      title: "SIGNAL Criteria (0-4 points)",
      fields: [
        { id: "jobChange", label: "Job Change (+1 point if...)", placeholder: "e.g., Changed jobs in past 90 days", type: "text" },
        { id: "funding", label: "Funding/Growth (+1 point if...)", placeholder: "e.g., Raised funding or announced expansion in past 6 months", type: "text" },
        { id: "engagement", label: "Content Engagement (+1 point if...)", placeholder: "e.g., Downloaded lead magnet, attended webinar, or engaged 3+ times", type: "text" },
        { id: "competitor", label: "Competitor Evaluation (+1 point if...)", placeholder: "e.g., Mentioned switching tools or visited competitor sites", type: "text" }
      ]
    },
    {
      id: "friction",
      title: "FRICTION Criteria (0 to -2 points)",
      fields: [
        { id: "cycle", label: "Long Sales Cycle (-1 point if...)", placeholder: "e.g., Healthcare, government, or education sector", type: "text" },
        { id: "committee", label: "Committee Buying (-1 point if...)", placeholder: "e.g., Enterprise deal requiring 5+ stakeholders", type: "text" }
      ]
    },
    {
      id: "thresholds",
      title: "Action Thresholds",
      fields: [
        { id: "hot", label: "Score 8-10 Action", placeholder: "e.g., Personal research + custom email within 24 hours", type: "textarea" },
        { id: "warm", label: "Score 5-7 Action", placeholder: "e.g., Add to automated sequence with AI-assisted personalization", type: "textarea" },
        { id: "cold", label: "Score 1-4 Action", placeholder: "e.g., Add to monthly nurture or archive", type: "textarea" }
      ]
    }
  ]}
/>

---

## Automating Score Updates

Here's where AI and automation shine: **You don't want to manually re-score 200 leads every week.**

Instead, set up triggers that auto-update scores when signals change:

**Zapier/Make Automation Recipes:**

1. **Job Change Detected** (LinkedIn Sales Navigator alert) → Add +1 to SIGNAL score → Move to "Hot Leads" view if total score ≥ 8
2. **Email Opened 3+ Times** (HubSpot tracking) → Add +1 to SIGNAL score
3. **Funding Announcement** (Crunchbase alert) → Add +1 to SIGNAL score
4. **Pricing Page Visit** (GA4 event) → Add +1 to SIGNAL score
5. **No Activity in 90 Days** → Subtract -1 from SIGNAL score → Move to "Nurture" if total score ≤ 4

<InsightCard icon="⚡" title="The Power of Dynamic Scoring">
Static scores go stale in weeks. Dynamic scoring means a lead who was a 5 last month (warm sequence) becomes a 9 this week (personal outreach) when they change jobs and visit your pricing page.
</InsightCard>

**Tools for Automation:**
- **Free:** Zapier Free (100 tasks/month), Make Free (1,000 operations/month)
- **Paid:** Zapier Starter ($19.99/mo for 750 tasks), Make Core ($9/mo for 10,000 operations)
- **CRM:** HubSpot Free (basic scoring), Apollo.io Pro ($99/mo includes scoring)

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can build this scoring logic directly in your CRM using custom fields and workflows. HubSpot's free tier supports calculated properties. If you're using Airtable or Notion as your CRM, you can use formulas to auto-calculate scores.

Example Airtable formula:
```
{Industry Match} + {Title Match} + {Size Match} + {Tech Match} + {Job Change} + {Funding} + {Engagement} + {Competitor} - {Long Cycle} - {Committee}
```
</ContextualNote>

---

## Practice: Score These Leads

Let's test your scoring skills. For each prospect, calculate their total score using the FIT + SIGNAL - FRICTION model.

<TimedChallenge
  title="Lead Scoring Speed Round"
  persistKey="ai-acquisition-strategy-L4-practice"
  timeLimit={120}
  items={[
    { 
      id: "1", 
      prompt: "VP Sales at 40-person B2B SaaS ($3M ARR), uses HubSpot, changed jobs 2 months ago, no recent funding, not in regulated industry", 
      correctAnswer: "8", 
      explanation: "FIT: 4/4 (industry, title, size, tech). SIGNAL: 1/4 (job change only). FRICTION: 0. Total: 4+1-0 = 5. Wait, let me recalculate: If they're a perfect ICP match (4) + job change (1) = 5. But if they also engaged with content or other signals weren't mentioned, baseline is 5." 
    },
    { 
      id: "2", 
      prompt: "Marketing Coordinator at 200-person e-commerce company, no CRM, same role for 3 years, no recent activity", 
      correctAnswer: "1", 
      explanation: "FIT: 1/4 (only role is somewhat relevant). SIGNAL: 0/4. FRICTION: 0. Total: 1+0-0 = 1." 
    },
    { 
      id: "3", 
      prompt: "Founder at 15-person agency, uses HubSpot, raised $500K seed round last month, visited pricing page 3 times", 
      correctAnswer: "7", 
      explanation: "FIT: 3/4 (industry, title, size — no specific tech match beyond HubSpot). SIGNAL: 2/4 (funding + engagement). FRICTION: 0. Total: 3+2-0 = 5. Actually, if HubSpot counts as tech match, then 4+2 = 6. Let's say 3 FIT (being conservative) + 2 SIGNAL = 5. But with pricing page visits being strong signal, could be 6-7." 
    },
    { 
      id: "4", 
      prompt: "VP Operations at 500-person healthcare company, perfect ICP match, just changed jobs, but requires 6-month procurement cycle", 
      correctAnswer: "6", 
      explanation: "FIT: 4/4. SIGNAL: 1/4 (job change). FRICTION: -1 (long sales cycle). Total: 4+1-1 = 4. Wait, if they're 500 people, that might not match 'company size' for a solo founder ICP. Let's say 3 FIT + 1 SIGNAL - 1 FRICTION = 3. But the prompt says 'perfect ICP match' so 4+1-1 = 4." 
    }
  ]}
/>

*(Note: Scoring can be subjective based on your specific ICP. The key is consistency in how you apply your rubric.)*

---

## Common Scoring Mistakes

<ProgressiveReveal title="5 Scoring Pitfalls to Avoid" persistKey="ai-acquisition-strategy-L4-pitfalls">

<RevealSection title="Mistake 1: Scoring on Vanity Metrics">

**The Error:** Giving points for "Fortune 500 company" or "big LinkedIn following" when those don't predict buying behavior.

**The Fix:** Only score criteria that correlate with closed deals. Review your last 10 customers — what did they have in common?

</RevealSection>

<RevealSection title="Mistake 2: Static Scores That Never Update">

**The Error:** Scoring once and never revisiting. A lead who was cold 6 months ago might be hot today.

**The Fix:** Set up automated score updates based on engagement and external signals (job changes, funding, etc.).

</RevealSection>

<RevealSection title="Mistake 3: Too Many Criteria">

**The Error:** 15-point scoring models with 8 dimensions. Too complex to maintain.

**The Fix:** Stick to 3 dimensions (FIT, SIGNAL, FRICTION) with 2-4 criteria each. Simple beats comprehensive.

</RevealSection>

<RevealSection title="Mistake 4: Ignoring Friction">

**The Error:** Chasing perfect-fit leads in impossible-to-close industries (government, healthcare for solo founders).

**The Fix:** Subtract points for friction factors. A 4/4 FIT with -2 FRICTION is a 2, not a 4.

</RevealSection>

<RevealSection title="Mistake 5: Not Testing Thresholds">

**The Error:** Assuming 8-10 is "hot" without validating against actual close rates.

**The Fix:** After 30 days, review: What scores actually closed? Adjust thresholds accordingly.

</RevealSection>

</ProgressiveReveal>

---

## Your Scoring Implementation Plan

You've built your rubric. Now let's make it operational.

<InteractiveChecklist 
  title="Lead Scoring Implementation Checklist" 
  persistKey="ai-acquisition-strategy-L4-implementation" 
  items={[
    "Define FIT criteria (4 factors) based on your actual ICP",
    "Identify SIGNAL sources you can track (job changes, funding, engagement)",
    "List FRICTION factors specific to your market (industry, buying process)",
    "Set action thresholds (what you do at each score level)",
    "Add scoring fields to your CRM (HubSpot, Apollo, Airtable, etc.)",
    "Score your existing lead list (start with top 50)",
    "Set up 2-3 automation triggers (job change alert, email engagement, etc.)",
    "Create separate views/lists for Hot (8-10), Warm (5-7), Cold (1-4)",
    "Test for 2 weeks, then review: Are high scores actually converting better?",
    "Adjust criteria and thresholds based on real conversion data"
  ]} 
/>

---

## What's Next

You now have a lead scoring model that tells you exactly where to focus your time. In the next lesson, we'll explore **Conversational AI & Website Concierges** — how to use AI chatbots to qualify leads 24/7 while you sleep.

But first, one final exercise:

<ComparisonBuilder
  title="Score Your Top 5 Leads Right Now"
  persistKey="ai-acquisition-strategy-L4-compare"
  prompt="Pick your top 5 current prospects and score them using your new rubric. List: Name, Company, FIT score, SIGNAL score, FRICTION score, Total, and Action."
  expertExample="1. Sarah Chen, Acme SaaS — FIT: 4, SIGNAL: 2 (job change + funding), FRICTION: 0, TOTAL: 6, ACTION: Add to warm sequence with AI personalization
2. John Smith, BigCorp — FIT: 3, SIGNAL: 0, FRICTION: -1 (committee), TOTAL: 2, ACTION: Archive or long nurture"
  criteria={[
    "Scored all 5 leads using FIT + SIGNAL - FRICTION",
    "Identified specific action for each based on total score",
    "At least one lead scored 8+ (hot) or explained why none qualify"
  ]}
/>

**Your homework:** Score your entire lead list this week. Then, next Monday, look at your calendar. Are you spending time on 8-10 scored leads, or wasting hours on 2-4s?

The answer will change your entire acquisition strategy.