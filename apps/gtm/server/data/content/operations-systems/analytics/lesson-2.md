---
title: "Funnel Dashboard: Leads → Meetings → Proposals → Wins"
duration: "55 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 2
---

## The $40K Mistake That Could Have Been Avoided

Sarah spent three months building her coaching practice. She had 127 "leads" in her spreadsheet. She felt busy. She felt productive.

Then she looked at her bank account: $4,200 in revenue. Three clients. From 127 leads.

**That's a 2.4% conversion rate.**

She had no idea where deals were dying because she never tracked the funnel. Were leads not booking calls? Were calls not converting to proposals? Were proposals getting ghosted?

Without a funnel dashboard, every lost deal is a mystery. With one, every bottleneck is obvious — and fixable.

Today, you're building the single most important view in your entire sales operation: the conversion funnel from first contact to closed deal.

<InsightCard icon="📊" title="Why This Matters">
Your funnel dashboard answers the question: "Where are deals dying?" Once you know that, you know exactly what skill to improve, what message to test, or what process to fix. Without it, you're flying blind.
</InsightCard>

---

## The SaaS Conversion Funnel: Your Revenue Pipeline Visualized

Every deal flows through predictable stages. For most solo founders, the funnel looks like this:

**MQL** (Marketing Qualified Lead) → **SQL** (Sales Qualified Lead) → **Meeting** → **Proposal** → **Won**

Let's break down what each stage means:

<FlipCard 
  front="MQL (Marketing Qualified Lead)" 
  back="Someone who matches your ICP and has shown interest (downloaded content, replied to outreach, engaged on LinkedIn). Not yet vetted for budget/timeline/authority." 
/>

<FlipCard 
  front="SQL (Sales Qualified Lead)" 
  back="An MQL you've qualified through research or conversation. They have budget, timeline, authority, and a real problem you can solve. Worth your time to pursue." 
/>

<FlipCard 
  front="Meeting Held" 
  back="You've had a discovery call, demo, or consultation. They've invested time to learn about your solution." 
/>

<FlipCard 
  front="Proposal Sent" 
  back="You've sent a formal proposal, quote, or pricing. The ball is in their court." 
/>

<FlipCard 
  front="Won" 
  back="They said yes. Contract signed, payment received, or project started." 
/>

Your job is to track **volume** (how many at each stage) and **conversion rate** (what % move from one stage to the next).

<RangeSlider 
  label="How clearly can you currently see where deals are getting stuck in your pipeline?" 
  min={1} 
  max={10} 
  lowLabel="No visibility" 
  highLabel="Crystal clear" 
  persistKey="analytics-L2-visibility" 
/>

---

## Benchmark Reality Check: What "Good" Looks Like

Here's the uncomfortable truth: most solo founders massively overestimate their conversion rates.

You think 50% of your meetings turn into proposals. The data says it's closer to 30%.

Let's calibrate your expectations with real B2B SaaS benchmarks:

<SlideNavigation>
<Slide title="MQL → SQL Conversion">

**Benchmark: 20-30%**

This is the "qualification" filter. You're separating tire-kickers from real buyers.

**Below 20%?** Your ICP targeting is too broad, or your lead scoring is broken. You're letting unqualified leads into your pipeline.

**Above 35%?** Either you're crushing it, or you're being too conservative with who you mark as an MQL. Double-check your definitions.

<ExampleCard label="Real Example: The Targeting Fix">
Marcus was converting only 12% of MQLs to SQLs. He realized his LinkedIn outreach was targeting "anyone in marketing" instead of "VP Marketing at 50-200 person SaaS companies." He tightened his filters. MQL→SQL jumped to 28% within two weeks.
</ExampleCard>

</Slide>

<Slide title="SQL → Meeting Conversion">

**Benchmark: 40-60%**

This is your outreach and messaging effectiveness. If someone is truly qualified, you should be able to get them on a call.

**Below 40%?** Your messaging isn't resonating, your follow-up cadence is weak, or your CTAs are unclear.

**Above 65%?** You're either a messaging wizard, or your SQLs aren't actually qualified (they're just being polite).

<InsightCard icon="⚡" title="The 5-Minute Rule">
Responding to an SQL within 5 minutes makes you **100x more likely to connect** than waiting 24 hours. Speed is the easiest conversion lever to pull.
</InsightCard>

</Slide>

<Slide title="Meeting → Proposal Conversion">

**Benchmark: 30-50%**

This measures your discovery and demo effectiveness. Not every meeting should result in a proposal — some aren't a fit. But if you're qualifying well, 30-50% should be proposal-worthy.

**Below 30%?** You're either bad at discovery (not uncovering real pain), bad at demos (not showing value), or still letting unqualified leads through.

**Above 55%?** You might be sending proposals to people who aren't ready. That inflates this metric but tanks your next one.

</Slide>

<Slide title="Proposal → Won Conversion">

**Benchmark: 20-40%**

This is your closing effectiveness. It's also where pricing, competition, and timing come into play.

**Below 20%?** Your proposals aren't compelling, your pricing is off, or you're proposing to people who were never going to buy.

**Above 45%?** You're either an incredible closer, or you're only proposing to slam-dunks (which means you're leaving revenue on the table by being too conservative).

<ExampleCard label="Real Example: The Proposal Timing Shift">
Jen was closing only 15% of proposals. She realized she was sending proposals immediately after discovery calls, before prospects had time to think. She started scheduling a "proposal review call" 2 days after sending. Close rate jumped to 32%.
</ExampleCard>

</Slide>

<Slide title="Overall MQL → Won Conversion">

**Benchmark: 2-8%**

This is the compound effect of all your conversion rates multiplied together.

If you're at:
- **MQL→SQL: 25%**
- **SQL→Meeting: 50%**
- **Meeting→Proposal: 40%**
- **Proposal→Won: 30%**

Your overall conversion is: 0.25 × 0.5 × 0.4 × 0.3 = **1.5%**

That's actually below average. But here's the magic: **improve each stage by just 10%, and your overall conversion jumps to 2.4%** — a 60% improvement.

</Slide>
</SlideNavigation>

<ClassifyExercise
  title="Classify These Conversion Rates"
  persistKey="analytics-L2-classify-rates"
  categories={[
    { id: "below", label: "Below Benchmark", color: "#ef4444" },
    { id: "average", label: "Average", color: "#f59e0b" },
    { id: "above", label: "Above Benchmark", color: "#10b981" }
  ]}
  items={[
    { id: "1", content: "MQL→SQL: 15%", correctCategory: "below" },
    { id: "2", content: "SQL→Meeting: 55%", correctCategory: "average" },
    { id: "3", content: "Meeting→Proposal: 60%", correctCategory: "above" },
    { id: "4", content: "Proposal→Won: 18%", correctCategory: "below" },
    { id: "5", content: "Overall MQL→Won: 6%", correctCategory: "average" },
    { id: "6", content: "SQL→Meeting: 25%", correctCategory: "below" }
  ]}
/>

---

## Building Your Funnel Dashboard: The Guided Build

Time to stop theorizing and start building. You're going to create a live funnel dashboard using your actual pipeline data.

**What you'll need:**
- Your CRM data from Course 40 (or a spreadsheet if you're not using a CRM yet)
- 20 minutes of focused time
- The template we're about to build together

<InsightCard icon="🎯" title="Dashboard Philosophy">
Your dashboard should be **one page, updated weekly, and answer one question: where are deals dying?** If it takes more than 5 minutes to update or understand, it's too complex.
</InsightCard>

### Step 1: Define Your Funnel Stages

First, let's map your actual sales process to the standard funnel stages. Your process might be slightly different — that's fine. The key is consistency.

<TemplateBuilder
  title="Your Funnel Stage Definitions"
  persistKey="analytics-L2-stages"
  sections={[
    {
      id: "mql",
      title: "MQL (Marketing Qualified Lead)",
      fields: [
        { 
          id: "mql-definition", 
          label: "What makes someone an MQL in your business?", 
          placeholder: "e.g., Replied to outreach, downloaded lead magnet, engaged on LinkedIn", 
          type: "textarea" 
        },
        { 
          id: "mql-source", 
          label: "Where do you track MQLs?", 
          placeholder: "e.g., HubSpot 'Lead' status, Google Sheet 'Prospects' tab", 
          type: "text" 
        }
      ]
    },
    {
      id: "sql",
      title: "SQL (Sales Qualified Lead)",
      fields: [
        { 
          id: "sql-definition", 
          label: "What qualifies an MQL as an SQL?", 
          placeholder: "e.g., Confirmed budget, timeline, and authority in initial conversation", 
          type: "textarea" 
        },
        { 
          id: "sql-source", 
          label: "Where do you track SQLs?", 
          placeholder: "e.g., HubSpot 'Qualified' status, moved to 'Active Pipeline' sheet", 
          type: "text" 
        }
      ]
    },
    {
      id: "meeting",
      title: "Meeting Held",
      fields: [
        { 
          id: "meeting-definition", 
          label: "What counts as a 'meeting'?", 
          placeholder: "e.g., Discovery call, demo, consultation (not just a quick chat)", 
          type: "textarea" 
        },
        { 
          id: "meeting-source", 
          label: "Where do you track meetings?", 
          placeholder: "e.g., Calendar + CRM activity log, 'Meeting Held' stage", 
          type: "text" 
        }
      ]
    },
    {
      id: "proposal",
      title: "Proposal Sent",
      fields: [
        { 
          id: "proposal-definition", 
          label: "What counts as a 'proposal'?", 
          placeholder: "e.g., Formal quote, pricing doc, SOW, contract sent", 
          type: "textarea" 
        },
        { 
          id: "proposal-source", 
          label: "Where do you track proposals?", 
          placeholder: "e.g., 'Proposal Sent' stage in CRM, 'Pending' tab in sheet", 
          type: "text" 
        }
      ]
    },
    {
      id: "won",
      title: "Won",
      fields: [
        { 
          id: "won-definition", 
          label: "What makes a deal 'won'?", 
          placeholder: "e.g., Contract signed, first payment received, project kickoff scheduled", 
          type: "textarea" 
        },
        { 
          id: "won-source", 
          label: "Where do you track wins?", 
          placeholder: "e.g., 'Closed Won' stage, 'Customers' sheet", 
          type: "text" 
        }
      ]
    }
  ]}
/>

### Step 2: Pull Your Current Funnel Data

Now, go into your CRM or spreadsheet and count how many deals are at each stage **right now**.

If you're using a CRM, run a report grouped by deal stage. If you're using a spreadsheet, count rows in each status category.

<TemplateBuilder
  title="Current Funnel Snapshot"
  persistKey="analytics-L2-snapshot"
  sections={[
    {
      id: "counts",
      title: "Deal Counts by Stage (This Week)",
      fields: [
        { id: "mql-count", label: "MQLs", placeholder: "e.g., 47", type: "number" },
        { id: "sql-count", label: "SQLs", placeholder: "e.g., 12", type: "number" },
        { id: "meeting-count", label: "Meetings Held", placeholder: "e.g., 6", type: "number" },
        { id: "proposal-count", label: "Proposals Sent", placeholder: "e.g., 3", type: "number" },
        { id: "won-count", label: "Deals Won", placeholder: "e.g., 1", type: "number" }
      ]
    }
  ]}
/>

### Step 3: Calculate Conversion Rates

Now the magic happens. We calculate the percentage of deals that move from one stage to the next.

**Formula:** (Deals at Stage B / Deals at Stage A) × 100

For example:
- If you have 12 SQLs and 47 MQLs: **MQL→SQL = (12 / 47) × 100 = 25.5%**
- If you have 6 meetings and 12 SQLs: **SQL→Meeting = (6 / 12) × 100 = 50%**

<ScenarioSimulator
  title="Funnel Conversion Calculator"
  persistKey="analytics-L2-calculator"
  levers={[
    { id: "mql", label: "MQLs", min: 0, max: 500, step: 1, defaultValue: 47 },
    { id: "sql", label: "SQLs", min: 0, max: 200, step: 1, defaultValue: 12 },
    { id: "meeting", label: "Meetings", min: 0, max: 100, step: 1, defaultValue: 6 },
    { id: "proposal", label: "Proposals", min: 0, max: 50, step: 1, defaultValue: 3 },
    { id: "won", label: "Wins", min: 0, max: 20, step: 1, defaultValue: 1 }
  ]}
  outputs={[
    { id: "mql-sql", label: "MQL → SQL", formula: "sql > 0 && mql > 0 ? ((sql / mql) * 100) : 0", unit: "%", precision: 1 },
    { id: "sql-meeting", label: "SQL → Meeting", formula: "meeting > 0 && sql > 0 ? ((meeting / sql) * 100) : 0", unit: "%", precision: 1 },
    { id: "meeting-proposal", label: "Meeting → Proposal", formula: "proposal > 0 && meeting > 0 ? ((proposal / meeting) * 100) : 0", unit: "%", precision: 1 },
    { id: "proposal-won", label: "Proposal → Won", formula: "won > 0 && proposal > 0 ? ((won / proposal) * 100) : 0", unit: "%", precision: 1 },
    { id: "overall", label: "Overall MQL → Won", formula: "won > 0 && mql > 0 ? ((won / mql) * 100) : 0", unit: "%", precision: 1 }
  ]}
  insight="Your weakest conversion is the bottleneck. Fix that stage first for maximum impact."
/>

---

## Diagnosing Bottlenecks: Where Deals Die (And Why)

Now that you have your conversion rates, let's diagnose what's broken.

Each bottleneck has a different root cause and a different fix. Here's how to decode your funnel:

<ProgressiveReveal title="Bottleneck Diagnosis Guide" persistKey="analytics-L2-diagnosis">

<RevealSection title="Low MQL → SQL (Below 20%)">

**What this means:** You're attracting the wrong people, or your qualification criteria are too loose.

**Common causes:**
- ICP is too broad ("all small businesses")
- Lead magnets attract curiosity, not intent
- Outreach targets anyone who matches a job title
- No qualification questions before marking someone as an MQL

**How to fix it:**
1. Tighten your ICP (Course 21: AI Acquisition Strategy)
2. Add a qualification step before marking leads as MQLs
3. Review your last 20 MQLs who didn't convert — what pattern do you see?
4. Implement lead scoring (budget + timeline + authority + need)

<ExampleCard label="Case Study: The ICP Tightening">
David was converting only 14% of MQLs to SQLs. He reviewed his lost leads and realized 60% were solopreneurs with no budget. He changed his outreach filters to exclude companies under 10 employees. MQL→SQL jumped to 31% immediately.
</ExampleCard>

</RevealSection>

<RevealSection title="Low SQL → Meeting (Below 40%)">

**What this means:** Your messaging isn't compelling, or your follow-up is weak.

**Common causes:**
- Generic outreach that doesn't speak to specific pain
- No clear CTA or next step
- Weak follow-up cadence (only 1-2 touches)
- Asking for 60-minute calls instead of 15-minute chats
- No social proof or credibility signals

**How to fix it:**
1. Rewrite your outreach using the frameworks from Course 31: Cold Email Mastery
2. Reduce meeting friction (offer 15 minutes, not 60)
3. Add 3-5 follow-up touches with new value each time
4. Include a case study or testimonial in your second touch
5. Test different CTAs (calendar link vs. "reply with your availability")

<ExampleCard label="Case Study: The CTA Shift">
Maria was converting only 28% of SQLs to meetings. She was asking for "a call to discuss your needs." She changed it to "a 15-minute screen share where I'll show you exactly how we solved this for [similar company]." Conversion jumped to 52%.
</ExampleCard>

</RevealSection>

<RevealSection title="Low Meeting → Proposal (Below 30%)">

**What this means:** Your discovery or demo isn't uncovering real pain, or you're still letting unqualified people onto calls.

**Common causes:**
- Skipping discovery and jumping straight to pitching
- Not asking about budget or timeline
- Demoing features instead of outcomes
- Not identifying a champion or decision-maker
- Proposing to people who are "just exploring"

**How to fix it:**
1. Use the SPIN or MEDDIC frameworks from Course 32: Discovery & Qualification
2. Ask budget and timeline questions in the first 10 minutes
3. Don't send a proposal unless you've identified a champion
4. Practice saying "I don't think we're a fit" when you uncover disqualifying factors
5. End every meeting with a clear next step (not "I'll send you a proposal")

<ExampleCard label="Case Study: The Discovery Overhaul">
Tom was converting only 22% of meetings to proposals. He realized he was demoing his product for 45 minutes without asking questions. He switched to a 20-minute discovery, 10-minute demo, 5-minute next steps format. Meeting→Proposal jumped to 44%.
</ExampleCard>

</RevealSection>

<RevealSection title="Low Proposal → Won (Below 20%)">

**What this means:** Your pricing is off, your proposals aren't compelling, or you're proposing to people who were never going to buy.

**Common causes:**
- Proposals are too complex or long (10+ pages)
- No clear ROI or value justification
- Pricing is higher than alternatives without differentiation
- No urgency or deadline
- Sending proposals and ghosting (no follow-up)
- Proposing to people without budget or authority

**How to fix it:**
1. Simplify proposals to 1-3 pages max
2. Lead with ROI and outcomes, not features
3. Include a clear next step and deadline
4. Schedule a "proposal review call" instead of just emailing it
5. Follow up 2-3 times after sending
6. Test different pricing structures (monthly vs. annual, tiered vs. flat)

<ExampleCard label="Case Study: The Proposal Review Call">
Jen was closing only 16% of proposals. She started scheduling a 15-minute "proposal review call" 48 hours after sending. On the call, she walked through the proposal, answered questions, and asked for the close. Win rate jumped to 34%.
</ExampleCard>

</RevealSection>

</ProgressiveReveal>

<SwipeDecision
  title="Bottleneck or Not?"
  description="Swipe right if this is a real bottleneck that needs fixing, left if it's acceptable"
  optionA="Acceptable"
  optionB="Fix This"
  persistKey="analytics-L2-swipe-bottleneck"
  cards={[
    { 
      id: "1", 
      content: "MQL→SQL: 18%", 
      correctOption: "b", 
      explanation: "Below the 20% benchmark. Your ICP targeting or qualification is broken." 
    },
    { 
      id: "2", 
      content: "SQL→Meeting: 58%", 
      correctOption: "a", 
      explanation: "Solidly in the 40-60% range. This is working." 
    },
    { 
      id: "3", 
      content: "Meeting→Proposal: 25%", 
      correctOption: "b", 
      explanation: "Below the 30% benchmark. Your discovery or demo needs work." 
    },
    { 
      id: "4", 
      content: "Proposal→Won: 38%", 
      correctOption: "a", 
      explanation: "In the 20-40% range. Solid closing performance." 
    },
    { 
      id: "5", 
      content: "Overall MQL→Won: 1.8%", 
      correctOption: "b", 
      explanation: "Below the 2-8% benchmark. Multiple stages need improvement." 
    }
  ]}
/>

---

## The Weekly Funnel Snapshot Ritual

Your funnel dashboard is only useful if you actually look at it. Here's the weekly ritual that takes 10 minutes and keeps you from flying blind:

**Every Friday at 4pm** (or whatever time works for you):

1. **Update the numbers** — Pull current counts from your CRM or spreadsheet (5 min)
2. **Calculate conversion rates** — Use the formulas above or your dashboard auto-calculates (1 min)
3. **Identify the bottleneck** — Which conversion rate is lowest? (1 min)
4. **Ask "Why?"** — What's the root cause of that bottleneck? (2 min)
5. **Pick ONE action** — What will you test next week to improve it? (1 min)

<TemplateBuilder
  title="Your Weekly Funnel Review Template"
  persistKey="analytics-L2-weekly-review"
  sections={[
    {
      id: "snapshot",
      title: "This Week's Snapshot",
      fields: [
        { id: "date", label: "Week of", placeholder: "e.g., Jan 15, 2025", type: "text" },
        { id: "mql", label: "MQLs", placeholder: "47", type: "number" },
        { id: "sql", label: "SQLs", placeholder: "12", type: "number" },
        { id: "meeting", label: "Meetings", placeholder: "6", type: "number" },
        { id: "proposal", label: "Proposals", placeholder: "3", type: "number" },
        { id: "won", label: "Wins", placeholder: "1", type: "number" }
      ]
    },
    {
      id: "analysis",
      title: "Analysis",
      fields: [
        { 
          id: "bottleneck", 
          label: "Biggest bottleneck (lowest conversion rate)", 
          placeholder: "e.g., Meeting → Proposal at 25%", 
          type: "text" 
        },
        { 
          id: "why", 
          label: "Why is this happening?", 
          placeholder: "e.g., I'm not asking budget questions in discovery", 
          type: "textarea" 
        },
        { 
          id: "action", 
          label: "ONE action to test next week", 
          placeholder: "e.g., Add budget question to discovery script and test on 3 calls", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

<InsightCard icon="🔄" title="The Compound Effect">
If you improve your weakest conversion rate by just 5% every month, your overall funnel conversion will **double in 6 months**. Small, consistent improvements compound.
</InsightCard>

---

## Cohort Analysis: Not All Leads Are Created Equal

Here's a secret most solo founders miss: **different lead sources have wildly different conversion rates**.

A referral might convert at 40% overall (MQL→Won), while a cold LinkedIn message converts at 2%.

If you lump them all together, you can't see which channels are worth your time.

**The fix:** Track your funnel metrics **by lead source**.

<TemplateBuilder
  title="Funnel by Lead Source"
  persistKey="analytics-L2-cohort"
  sections={[
    {
      id: "outbound-email",
      title: "Outbound Email",
      fields: [
        { id: "oe-mql", label: "MQLs", placeholder: "25", type: "number" },
        { id: "oe-sql", label: "SQLs", placeholder: "5", type: "number" },
        { id: "oe-meeting", label: "Meetings", placeholder: "2", type: "number" },
        { id: "oe-proposal", label: "Proposals", placeholder: "1", type: "number" },
        { id: "oe-won", label: "Wins", placeholder: "0", type: "number" }
      ]
    },
    {
      id: "linkedin",
      title: "LinkedIn Outreach",
      fields: [
        { id: "li-mql", label: "MQLs", placeholder: "15", type: "number" },
        { id: "li-sql", label: "SQLs", placeholder: "6", type: "number" },
        { id: "li-meeting", label: "Meetings", placeholder: "3", type: "number" },
        { id: "li-proposal", label: "Proposals", placeholder: "2", type: "number" },
        { id: "li-won", label: "Wins", placeholder: "1", type: "number" }
      ]
    },
    {
      id: "referral",
      title: "Referrals",
      fields: [
        { id: "ref-mql", label: "MQLs", placeholder: "7", type: "number" },
        { id: "ref-sql", label: "SQLs", placeholder: "6", type: "number" },
        { id: "ref-meeting", label: "Meetings", placeholder: "5", type: "number" },
        { id: "ref-proposal", label: "Proposals", placeholder: "3", type: "number" },
        { id: "ref-won", label: "Wins", placeholder: "2", type: "number" }
      ]
    }
  ]}
/>

**What you'll discover:**
- Referrals convert at 5-10x the rate of cold outreach
- LinkedIn leads might have higher deal sizes but longer sales cycles
- Inbound content leads are pre-qualified and convert faster

This tells you **where to spend more time** (double down on referrals) and **where to optimize** (fix your cold email messaging).

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can automate cohort tracking with a simple SQL query or pivot table. Group deals by `lead_source` field, then calculate conversion rates per source. This is a 10-minute script that saves hours of manual analysis.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches & Consultants">
Your referral funnel will always outperform cold outreach. Track it separately and ask every new client: "Who else do you know who has this problem?" Your best leads come from happy clients.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Content Creators">
Your content funnel is different: Audience → Engaged Follower → Email Subscriber → Offer Click → Purchase. Track each stage. Most creators lose 80% between "engaged follower" and "email subscriber" because they don't have a compelling lead magnet.
</ContextualNote>

---

## Building Your Dashboard in Google Sheets (Free Template)

You don't need expensive BI tools. Google Sheets is free, flexible, and good enough for 95% of solo founders.

Here's how to build your funnel dashboard in 15 minutes:

### Template Structure

**Sheet 1: Weekly Snapshots**
- Columns: Date, MQLs, SQLs, Meetings, Proposals, Wins
- One row per week
- Formulas auto-calculate conversion rates

**Sheet 2: Conversion Rates**
- Pulls from Sheet 1
- Displays: MQL→SQL %, SQL→Meeting %, Meeting→Proposal %, Proposal→Won %, Overall %
- Conditional formatting: red if below benchmark, green if above

**Sheet 3: By Lead Source**
- Same structure as Sheet 1, but filtered by source
- Separate sections for Outbound Email, LinkedIn, Referrals, Inbound, etc.

**Sheet 4: Charts**
- Funnel visualization (horizontal bar chart)
- Conversion rate trends (line chart over time)
- Lead source comparison (stacked bar chart)

<InsightCard icon="📥" title="Download the Template">
We've pre-built this entire dashboard for you. It includes formulas, conditional formatting, and charts. Just make a copy and plug in your numbers.

[Access the Funnel Dashboard Template →](#)
</InsightCard>

### Setting It Up

1. **Make a copy** of the template
2. **Week 1:** Manually enter your current funnel numbers
3. **Week 2-4:** Update the numbers every Friday (takes 5 minutes)
4. **Month 2:** You'll have enough data to see trends

<LinterFeedback
  title="Dashboard Quality Check"
  persistKey="analytics-L2-dashboard-linter"
  inputLabel="Describe your current dashboard setup (or paste a screenshot description)"
  rules={[
    { 
      id: "weekly-update", 
      label: "Weekly Update Cadence", 
      description: "Dashboard is updated at least weekly", 
      keywords: ["weekly", "every friday", "each week"], 
      antiKeywords: ["monthly", "when i remember", "occasionally"] 
    },
    { 
      id: "conversion-rates", 
      label: "Conversion Rates Visible", 
      description: "Shows conversion % between each stage", 
      keywords: ["conversion", "percentage", "%", "rate"], 
      antiKeywords: [] 
    },
    { 
      id: "benchmarks", 
      label: "Benchmarks Included", 
      description: "Compares your rates to industry benchmarks", 
      keywords: ["benchmark", "target", "goal", "average"], 
      antiKeywords: [] 
    },
    { 
      id: "lead-source", 
      label: "Lead Source Tracking", 
      description: "Tracks funnel by channel/source", 
      keywords: ["source", "channel", "cohort", "segment"], 
      antiKeywords: [] 
    },
    { 
      id: "one-page", 
      label: "One-Page View", 
      description: "All key metrics visible on one screen", 
      keywords: ["one page", "single view", "dashboard"], 
      antiKeywords: ["multiple tabs", "several sheets", "complex"] 
    }
  ]}
/>

---

## The 10% Improvement Challenge

Here's your homework for the next 30 days:

**Pick your weakest conversion rate. Improve it by 10%.**

That's it. One bottleneck. One 10% improvement.

If your Meeting→Proposal rate is 25%, get it to 27.5%. If your SQL→Meeting rate is 35%, get it to 38.5%.

<DecisionTree
  title="Your 30-Day Improvement Path"
  persistKey="analytics-L2-improvement-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "What's your weakest conversion rate?", 
      choices: [
        { label: "MQL → SQL", nextNodeId: "mql-sql" },
        { label: "SQL → Meeting", nextNodeId: "sql-meeting" },
        { label: "Meeting → Proposal", nextNodeId: "meeting-proposal" },
        { label: "Proposal → Won", nextNodeId: "proposal-won" }
      ]
    },
    { 
      id: "mql-sql", 
      content: "Focus: Tighten your ICP and qualification criteria. Action: Review your last 20 MQLs who didn't convert. What pattern do you see? Adjust your targeting filters accordingly.", 
      choices: [
        { label: "Start 30-day challenge", nextNodeId: "commit" }
      ]
    },
    { 
      id: "sql-meeting", 
      content: "Focus: Improve your outreach messaging and follow-up. Action: Rewrite your outreach using a specific pain point from Course 31. Add 2 more follow-up touches with new value.", 
      choices: [
        { label: "Start 30-day challenge", nextNodeId: "commit" }
      ]
    },
    { 
      id: "meeting-proposal", 
      content: "Focus: Strengthen your discovery process. Action: Add budget and timeline questions to your discovery script. Practice on your next 3 calls. Don't send proposals without clear answers.", 
      choices: [
        { label: "Start 30-day challenge", nextNodeId: "commit" }
      ]
    },
    { 
      id: "proposal-won", 
      content: "Focus: Improve your proposal quality and follow-up. Action: Simplify your proposal to 1-3 pages. Schedule a 'proposal review call' instead of just emailing it. Follow up 3 times.", 
      choices: [
        { label: "Start 30-day challenge", nextNodeId: "commit" }
      ]
    },
    { 
      id: "commit", 
      content: "You've committed to improving one conversion rate by 10% in 30 days. Track it weekly in your funnel dashboard. Report back in the community with your results.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

---

## Summary: Your Funnel Dashboard Checklist

You've just built the foundation of your entire sales analytics system. Here's what you should have by the end of this lesson:

<InteractiveChecklist 
  title="Funnel Dashboard Completion Checklist" 
  persistKey="analytics-L2-completion" 
  items={[
    "Defined your 5 funnel stages (MQL, SQL, Meeting, Proposal, Won)",
    "Pulled your current funnel snapshot (deal counts at each stage)",
    "Calculated conversion rates between each stage",
    "Compared your rates to industry benchmarks",
    "Identified your #1 bottleneck (weakest conversion rate)",
    "Diagnosed the root cause of that bottleneck",
    "Built a Google Sheets funnel dashboard (or set up CRM reports)",
    "Set up weekly Friday funnel review (10 minutes)",
    "Started tracking funnel by lead source (cohort analysis)",
    "Committed to improving your weakest rate by 10% in 30 days"
  ]} 
/>

**Next lesson:** We'll add **pipeline velocity tracking** to your dashboard. You'll learn how to measure the average days between each stage and identify where deals are getting stuck in time (not just volume).

The combination of conversion rates (this lesson) + velocity (next lesson) gives you complete visibility into your sales engine.

<InsightCard icon="🎯" title="The Real Win">
Most solo founders never build a funnel dashboard. They operate on gut feel and hope. You now have data. You know where deals die. You know what to fix. That's a massive competitive advantage.
</InsightCard>

---

```json
{
  "quiz": {
    "title": "Funnel Dashboard Mastery Check",
    "questions": [
      {
        "id": "q1",
        "question": "What's the industry benchmark for MQL → SQL conversion in B2B SaaS?",
        "options": [
          "10-15%",
          "20-30%",
          "40-50%",
          "60-70%"
        ],
        "correctIndex": 1,
        "explanation": "The benchmark is 20-30%. Below 20% indicates ICP targeting or qualification issues. Above 35% might mean you're being too conservative with MQL definitions."
      },
      {
        "id": "q2",
        "question": "If you have 50 MQLs, 15 SQLs, 8 meetings, 4 proposals, and 2 wins, what's your overall MQL → Won conversion rate?",
        "options": [
          "2%",
          "4%",
          "8%",
          "13%"
        ],
        "correctIndex": 1,
        "explanation": "2 wins / 50 MQLs = 4%. This is right in the middle of the 2-8% benchmark range for B2B SaaS."
      },
      {
        "id": "q3",
        "question": "Your Meeting → Proposal conversion is 22% (below the 30% benchmark). What's the most likely root cause?",
        "options": [
          "Your ICP targeting is too broad",
          "Your outreach messaging isn't compelling",
          "Your discovery process isn't uncovering real pain or qualifying properly",
          "Your proposals aren't compelling enough"
        ],
        "correctIndex": 2,
        "explanation": "Low Meeting → Proposal conversion indicates a discovery or qualification problem. You're getting people on calls who aren't actually qualified or you're not uncovering enough pain to warrant a proposal."
      },
      {
        "id": "q4",
        "question": "Why should you track your funnel metrics by lead source (cohort analysis)?",
        "options": [
          "It makes your dashboard look more impressive",
          "Different channels have wildly different conversion rates and you need to know which are worth your time",
          "It's required for tax purposes",
          "It helps you forecast revenue more accurately"
        ],
        "correctIndex": 1,
        "explanation": "Different lead sources (referrals, cold email, LinkedIn, inbound) convert at vastly different rates. Tracking by source tells you where to invest more time and where to optimize or cut."
      },
      {
        "id": "q5",
        "question": "What's the #1 action you should take after identifying your funnel bottleneck?",
        "options": [
          "Immediately hire someone to fix it",
          "Ignore it and focus on volume instead",
          "Pick ONE specific improvement to test over the next 30 days",
          "Rebuild your entire sales process from scratch"
        ],
        "correctIndex": 2,
        "explanation": "The best approach is to pick ONE specific improvement and test it consistently for 30 days. Small, focused improvements compound over time. Trying to fix everything at once leads to confusion and no measurable progress."
      }
    ]
  }
}