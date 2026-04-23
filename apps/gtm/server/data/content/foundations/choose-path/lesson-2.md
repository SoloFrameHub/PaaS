---
title: "B2B SaaS Acquisition Path"
duration: "45 min"
track: "Foundations"
course: "Course 2: Choose Your Path"
lesson: 2
---

## B2B SaaS Acquisition Path

If you're selling software or services to businesses, this lesson is your tactical playbook. The psychology you learned in Course 0 applies universally, but the execution looks different when you're navigating buying committees, longer sales cycles, and organizational politics.

Here's the reality nobody warned you about: even when you're having a one-on-one conversation with a prospect, you're selling to a committee. That enthusiastic VP who loves your demo still needs budget approval. That champion who sees your value still needs to navigate procurement. Understanding this dynamic changes everything about how you approach B2B acquisition.

<FlipCard front="The Committee Paradox" back="Even when your product is self-serve and a single user signs up, enterprise buyers never buy alone. Your champion needs budget approval, IT signoff, and procurement clearance. You are always selling to a committee." />

### The B2B SaaS Reality for Solo Founders

You don't have SDRs doing cold outreach while you focus on closing. You don't have a marketing team generating inbound leads. You don't have a sales engineer handling technical questions. You are all of these people, plus the one building the product.

This constraint actually creates an advantage: **you can move faster and be more personal than any enterprise competitor**. The VP of Engineering who's frustrated with their current vendor's 6-week response time will be shocked when the founder responds in 6 minutes.

<InsightCard icon="⚡" title="The Solo Founder Advantage">
You can move faster and be more personal than any enterprise competitor. The VP frustrated with their current vendor's 6-week response time will be shocked when the founder responds in 6 minutes.
</InsightCard>

But you need to be strategic about where you spend your limited time.

**Revenue math matters.** If your ACV (annual contract value) is $1,000, you need 100 customers to hit $100K ARR. If your ACV is $10,000, you need 10. This dramatically changes which acquisition tactics make sense.

For most B2B SaaS founders in the $1,000-$10,000 ACV range, the math works out to needing 2-4 new customers per month. Your acquisition system needs to generate 20-40 qualified conversations to close those deals at typical conversion rates.

<ScenarioSimulator
  title="B2B SaaS Revenue Math Calculator"
  persistKey="choose-path-L2-simulator"
  levers={[
    { id: "acv", label: "Annual Contract Value ($)", min: 500, max: 50000, step: 500, defaultValue: 5000 },
    { id: "targetArr", label: "Target ARR ($)", min: 50000, max: 500000, step: 10000, defaultValue: 100000 },
    { id: "closeRate", label: "Close rate (%)", min: 5, max: 50, step: 5, defaultValue: 15 }
  ]}
  outputs={[
    { id: "customersNeeded", label: "Customers needed", formula: "Math.ceil(targetArr / acv)", unit: "", precision: 0 },
    { id: "monthlyCustomers", label: "New customers/month", formula: "Math.ceil((targetArr / acv) / 12)", unit: "", precision: 0 },
    { id: "monthlyConvos", label: "Qualified conversations/month", formula: "Math.ceil(((targetArr / acv) / 12) / (closeRate / 100))", unit: "", precision: 0 }
  ]}
  insight="At ${acv} ACV, you need {customersNeeded} total customers to hit ${targetArr} ARR. That's {monthlyCustomers} new customers per month, requiring {monthlyConvos} qualified conversations at a {closeRate}% close rate."
/>

### The B2B SaaS Acquisition Stack

After testing nearly every approach over three decades—from enterprise partnerships at GE to bootstrap SaaS growth—I've found this allocation works for most solo B2B founders:

**Primary Channels (90% of effort):**

- **LinkedIn (60% of effort):** Prospecting + content + warm outreach
- **Cold Email (25% of effort):** Targeted campaigns to ICP matches
- **Content/SEO (15% of effort):** Long-term lead generation asset

**Secondary Channels (10% when primary is working):**

- Partnerships and integrations
- Product-led growth hooks
- Community presence
- Referrals (often underutilized)

The percentages aren't prescriptive—they're a starting framework. Some founders find cold email works so well they shift 50% of effort there. Others discover LinkedIn content generates all the inbound they need. The key is starting with this allocation, measuring what works, and adjusting.

### The B2B Weekly Rhythm

Consistency beats intensity. A sustainable weekly rhythm outperforms sporadic bursts of activity. Here's the template I recommend:

| Day | Focus | Activities |
|-----|-------|------------|
| Monday | Prospecting | Identify 20-30 new prospects, research, add to sequences |
| Tuesday | Outreach | Send personalized LinkedIn connection requests, follow-ups |
| Wednesday | Engagement | Respond to all LinkedIn activity, engage with prospect content |
| Thursday | Outreach | Cold email sends, LinkedIn messages to warm connections |
| Friday | Content + Admin | Write one piece of content, update CRM, review metrics |

**Time commitment:** 15-20 hours per week on acquisition. This sounds like a lot when you're also building product, but it's the minimum viable effort for consistent results.

**The 90 Minutes of Gold:** Block 90 minutes every morning for prospecting and outreach. This is your highest-leverage time. No Slack, no email, no product work. Just acquisition activities. Founders who protect this time consistently outperform those who "fit it in when possible."

### Navigating the Buying Committee

Here's what B2B SaaS founders miss: even when your product is self-serve, enterprise buyers don't buy alone.

The roles you'll encounter:

<SlideNavigation>
<Slide title="The Champion">

The person who discovered you and wants to buy. Your best friend, but often lacks authority. They need ammunition (ROI stories, one-pagers, competitive comparisons) to sell internally on your behalf.

</Slide>
<Slide title="The Influencer">

People whose opinions matter but don't have final say. IT security, legal, existing vendors. They can kill a deal with a single "I have concerns" but rarely initiate a purchase.

</Slide>
<Slide title="The Decision-Maker">

The person who signs the check. Often invisible until late in the process. You may never meet them directly — your champion presents your case for you.

</Slide>
<Slide title="Procurement">

The process gatekeepers. Can't say yes, but can slow things down indefinitely. They care about compliance, terms, and process — not your product's features.

</Slide>
</SlideNavigation>

The questions that reveal committee dynamics:

- "Who else needs to be involved in this decision?"
- "What's the typical process for bringing in a new tool?"
- "Have you bought similar solutions before? How did that work?"
- "What would need to happen for this to move forward?"

Your champion is your navigator through this maze. Make them successful by giving them the ammunition they need: clear ROI stories, one-pagers they can share, answers to the objections their colleagues will raise.

### Academy Course Prioritization for B2B SaaS

You don't need to complete all 33 courses. Here's your prioritized sequence:

**Tier 1 (Complete First):**
- **Course 4:** List Building & Prospecting Infrastructure — You need systems before you scale outreach
- **Course 8:** Cold Email Mastery — Your highest-leverage outbound channel
- **Course 14:** Discovery Framework (BANT/MEDDIC) — Qualification is everything in B2B

**Tier 2 (Next 60 Days):**
- **Course 7:** LinkedIn Growth Engine — Your primary platform for visibility and connections
- **Course 13:** Understanding DISC Buyer Personas — Navigate different decision-maker personalities
- **Course 17:** Objection Handling Database — Arm yourself (and your champions) with responses

**Tier 3 (When Established):**
- **Course 5:** Technical Content Engine — Build long-term inbound
- **Course 6:** SEO & Answer Engine Optimization — Compound returns over time
- **Course 20:** Sales Pipeline Management — Systematize as you grow

**Skip for now:** Creator-focused courses (9, 10), Customer Success courses until you have customers to retain.

### B2B SaaS Metrics That Matter

Track these weekly:

**Activity Metrics:**
- Outreach volume: 30-50 cold emails per day, 20 LinkedIn touches per day
- Connection acceptance rate: 30%+ means your targeting is good
- Response rate: 10-20% for cold email, 30%+ for warm LinkedIn

**Pipeline Metrics:**
- Demos scheduled per week: Track trend, not absolute numbers
- Demo-to-proposal rate: 30-50% indicates good qualification
- Proposal-to-close rate: 25-40% is healthy for B2B

**Warning Signs:**
- Response rates under 5%: Your messaging or targeting is off
- Demos that don't convert: Your demo isn't connecting to pain
- Deals stalled at proposal (20%+): Pricing, champion strength, or decision-maker access issues

<RangeSlider label="How confident are you in your current B2B SaaS acquisition system?" min={1} max={10} lowLabel="No system at all" highLabel="Fully operational pipeline" persistKey="choose-path-L2-confidence" />

### Your 90-Day B2B SaaS Focus Plan

**Days 1-30: Infrastructure + First Outreach**
- Set up cold email infrastructure (5 domains, warming, SPF/DKIM/DMARC)
- Build first prospect list (50-100 ICP matches)
- Launch initial email sequences and LinkedIn outreach
- Goal: 10-15 discovery conversations

**Days 31-60: Optimize Messaging**
- Analyze which messages get responses
- A/B test subject lines and opening hooks
- Refine based on conversation patterns
- Goal: Improve response rates by 25%

**Days 61-90: Scale What Works**
- Double down on the channel showing best results
- Cut or pause what's not working (sunk cost is real)
- Build repeatable weekly rhythm
- Goal: First closed deal validates entire approach

### Key Takeaways

- B2B SaaS means selling through buying committees, even when talking to individuals
- Allocate 60% LinkedIn, 25% cold email, 15% content as your starting framework
- Protect 90 minutes every morning for prospecting and outreach
- Your champion needs ammunition to sell internally for you
- Focus on Courses 4, 8, and 14 first—then expand based on what's working

### Practice Exercise

Create your B2B SaaS 90-Day Focus Plan:

<TemplateBuilder
  title="Your B2B SaaS 90-Day Focus Plan"
  persistKey="choose-path-L2-plan"
  sections={[
    {
      id: "revenue-math",
      title: "Revenue Math",
      fields: [
        { id: "acv", label: "Your ACV (Annual Contract Value)", placeholder: "e.g., $5,000", type: "text" },
        { id: "target", label: "Customers needed this quarter", placeholder: "e.g., 6 new customers", type: "text" }
      ]
    },
    {
      id: "prospecting",
      title: "Prospecting Plan",
      fields: [
        { id: "gold-time", label: "When is your daily '90 Minutes of Gold'?", placeholder: "e.g., 8:00-9:30 AM, before product work", type: "text" },
        { id: "first-25", label: "Describe your first 25 prospects", placeholder: "e.g., VP of Marketing at B2B SaaS companies doing $1-5M ARR", type: "textarea" }
      ]
    },
    {
      id: "discovery",
      title: "Discovery",
      fields: [
        { id: "question", label: "Your go-to discovery question for buying committee", placeholder: "e.g., Who else would need to be involved in evaluating a tool like this?", type: "textarea" }
      ]
    }
  ]}
/>

<InteractiveChecklist title="B2B SaaS Action Items" persistKey="choose-path-L2-actions" items={["Calculate your revenue math (ACV x customers needed)", "Block 90 Minutes of Gold on your calendar for the next 30 days", "Identify your first 25 prospects and the platform where you'll reach them", "Write one discovery question for understanding buying committees", "Set up cold email infrastructure (domains, warming, SPF/DKIM/DMARC)"]} />

Bring this plan to the next lesson as evidence that you've committed to focused execution.
