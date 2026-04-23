---
title: "The 3 Questions Your Metrics Must Answer"
duration: "45 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 1
---

You're three months into your solo founder journey. You've sent 400 cold emails, posted on LinkedIn 15 times, had 12 discovery calls, sent 5 proposals, and closed... 1 deal.

Is that good? Bad? Should you double down on email? Abandon LinkedIn? Change your pricing?

**You have no idea.** Because you're not tracking the right things.

Most solo founders track *something* — email open rates, LinkedIn followers, website visitors. But these are **vanity metrics**. They feel productive to watch, but they don't answer the questions that actually matter.

Today, you're going to learn the only 3 questions your metrics need to answer. By the end of this lesson, you'll have a framework that turns data into decisions.

---

## The Founder's Metrics Trap

Here's what usually happens:

You install Google Analytics. You check your CRM dashboard. You watch your email open rates. You feel like you're being "data-driven."

But when someone asks "How's acquisition going?" you say: "Pretty good, I think? I'm getting some interest."

That's not data-driven. That's **data-adjacent**.

<InsightCard icon="⚠️" title="The Real Problem">
76% of sales leaders say they don't have the right dashboards. Even big teams get this wrong. Solo founders are drowning in metrics that don't matter while ignoring the 5 that do.
</InsightCard>

The solution isn't *more* metrics. It's **3 questions** that every metric must answer.

---

## Question 1: Is Acquisition Working?

This sounds obvious, but most founders can't actually answer it with data.

"Acquisition working" means: **Are you generating qualified pipeline at a predictable rate?**

Not: "Did someone like my LinkedIn post?"
Not: "Did my email get opened?"

<FlipCard 
  front="Leading vs. Lagging Indicators" 
  back="Leading indicators (outreach volume, reply rate, meetings booked) tell you what's happening NOW. Lagging indicators (revenue, deals won) tell you what happened 30-90 days ago. Solo founders must track leading indicators because lagging indicators arrive too late to course-correct." 
/>

### The Leading Indicators That Matter

These tell you *this week* if acquisition is working:

1. **Prospects added to pipeline** — How many new qualified leads entered your system?
2. **Outreach volume** — How many personalized messages did you send?
3. **Reply rate** — What % of outreach got responses?
4. **Meetings booked** — How many discovery calls did you schedule?

### The Lagging Indicators That Confirm

These tell you *last month* if acquisition worked:

1. **Deals won** — How many customers did you close?
2. **Revenue** — How much MRR or cash did you collect?
3. **CAC** — How much did each customer cost to acquire?

<ExampleCard label="Case Study: The Vanity Metrics Trap">
Marcus spent 6 months optimizing his LinkedIn profile. His follower count grew from 200 to 2,400. His post engagement tripled.

**Pipeline added: 3 leads. Deals closed: 0.**

He was tracking followers and likes — metrics that felt good but didn't answer "Is acquisition working?"

When he switched to tracking *reply rate* and *meetings booked*, he realized his outreach messaging was broken. He fixed it in 2 weeks and booked 8 meetings the next month.
</ExampleCard>

<RangeSlider 
  label="Right now, how confident are you that your acquisition is working?" 
  min={1} 
  max={10} 
  lowLabel="No idea" 
  highLabel="Very confident" 
  persistKey="analytics-L1-acquisition-confidence" 
/>

---

## Question 2: Are Customers Staying?

You can't build a business on a leaky bucket.

If you're acquiring 5 customers per month but losing 4, you're not growing — you're treading water.

<FlipCard 
  front="The Churn Reality" 
  back="Average SMB SaaS monthly logo churn: 3-7%. That means if you do nothing, you lose 36-84% of customers per year. Healthy retention isn't optional — it's survival." 
/>

### The Retention Metrics That Matter

1. **Monthly logo churn rate** — What % of customers cancel each month?
   - Formula: Customers lost this month / Customers at start of month
   - Target: &lt;3% monthly for SMB SaaS

2. **Net Revenue Retention (NRR)** — Are existing customers growing or shrinking?
   - Formula: (Starting MRR + Expansion - Contraction - Churn) / Starting MRR × 100
   - Target: ≥100% (meaning expansion offsets churn)

3. **Expansion revenue** — How much additional revenue came from existing customers?
   - Upgrades, add-ons, seat expansions
   - Top SaaS companies get 30-40% of revenue from expansion

<InsightCard icon="💰" title="The Expansion Advantage">
$1 of expansion revenue costs 60% less than $1 of new customer revenue. If you're not tracking expansion, you're leaving money on the table.
</InsightCard>

### Why This Matters for Solo Founders

You have limited time. If you're spending 100% of your time on acquisition while customers quietly churn, you're running on a treadmill.

**The math:** If you acquire 5 customers/month at $100 MRR but lose 3/month, you net +2. That's $200 MRR growth.

If you acquire 3 customers/month but lose 1/month, you net +2. That's the same $200 MRR growth — but you spent 40% less time on acquisition.

<ClassifyExercise
  title="Classify These Metrics"
  persistKey="analytics-L1-classify"
  categories={[
    { id: "acquisition", label: "Acquisition", color: "#3b82f6" },
    { id: "retention", label: "Retention", color: "#10b981" },
    { id: "vanity", label: "Vanity", color: "#6b7280" }
  ]}
  items={[
    { id: "1", content: "LinkedIn followers", correctCategory: "vanity" },
    { id: "2", content: "Monthly logo churn rate", correctCategory: "retention" },
    { id: "3", content: "Meetings booked per week", correctCategory: "acquisition" },
    { id: "4", content: "Email open rate", correctCategory: "vanity" },
    { id: "5", content: "Net Revenue Retention (NRR)", correctCategory: "retention" },
    { id: "6", content: "Reply rate on outreach", correctCategory: "acquisition" },
    { id: "7", content: "Website visitors", correctCategory: "vanity" },
    { id: "8", content: "Expansion MRR", correctCategory: "retention" }
  ]}
/>

---

## Question 3: Where Should I Focus?

You have 5-7 hours per week for acquisition. Where do you spend them?

This is the question that separates founders who scale from founders who spin their wheels.

<FlipCard 
  front="The Time Allocation Problem" 
  back="Most founders allocate time based on what feels comfortable, not what produces results. They spend 10 hours on content because it's fun, and 1 hour on outreach because it's hard — even when outreach produces 10x the pipeline." 
/>

### The Metrics That Answer "Where?"

1. **Channel attribution** — Which source produces the most wins?
   - Outbound email vs. LinkedIn vs. content vs. referrals
   - Track: Lead source → Meetings → Wins → Revenue

2. **Pipeline stage bottleneck** — Where do deals stall?
   - If 50% of deals die at the proposal stage, your pricing or closing process is broken
   - If 50% of leads never book a meeting, your outreach messaging is broken

3. **Time allocation vs. results** — ROI per hour spent
   - If you spend 5 hours on LinkedIn and book 1 meeting, that's 5 hours/meeting
   - If you spend 2 hours on email and book 3 meetings, that's 0.67 hours/meeting
   - **3x better ROI** — so do more email, less LinkedIn

<ExampleCard label="Case Study: The Channel Reallocation">
Priya tracked her time for 4 weeks:

- **Content marketing:** 12 hours/week → 2 inbound leads/month → 0 deals closed
- **LinkedIn outreach:** 3 hours/week → 8 meetings/month → 1 deal closed
- **Cold email:** 2 hours/week → 12 meetings/month → 2 deals closed

She killed content, doubled down on email, and kept LinkedIn at 3 hours. Result: 3x more deals with the same time investment.

**The data told her where to focus.**
</ExampleCard>

<SwipeDecision
  title="Good Metric or Vanity Metric?"
  description="Swipe right for metrics that answer one of the 3 questions. Swipe left for vanity metrics."
  optionA="Vanity"
  optionB="Good Metric"
  persistKey="analytics-L1-swipe"
  cards={[
    { 
      id: "1", 
      content: "Number of LinkedIn connections", 
      correctOption: "a", 
      explanation: "Doesn't answer any of the 3 questions. Connections don't equal pipeline." 
    },
    { 
      id: "2", 
      content: "Meetings booked per week by channel", 
      correctOption: "b", 
      explanation: "Answers Question 1 (Is acquisition working?) AND Question 3 (Where should I focus?)" 
    },
    { 
      id: "3", 
      content: "Email open rate", 
      correctOption: "a", 
      explanation: "Opens don't predict replies or meetings. This is a vanity metric." 
    },
    { 
      id: "4", 
      content: "Monthly logo churn rate", 
      correctOption: "b", 
      explanation: "Directly answers Question 2 (Are customers staying?)" 
    },
    { 
      id: "5", 
      content: "Blog post views", 
      correctOption: "a", 
      explanation: "Views don't equal pipeline unless you track view → lead → customer conversion." 
    },
    { 
      id: "6", 
      content: "CAC by channel", 
      correctOption: "b", 
      explanation: "Answers Question 3 (Where should I focus?) by showing cost efficiency." 
    }
  ]}
/>

---

## The Anti-Vanity Metrics Principle

Here's the rule that will save you from dashboard bloat:

**Track only metrics that change decisions.**

If a metric goes up or down and you do nothing differently, stop tracking it.

<InsightCard icon="🎯" title="The 'So What?' Test">
For every metric on your dashboard, ask: "So what? What will I do differently if this changes?"

If the answer is "nothing," delete it.
</InsightCard>

### Common Vanity Metrics to Delete

- **Email open rate** — Opens don't predict replies. Track reply rate instead.
- **Website visitors** — Traffic doesn't equal pipeline. Track form submissions or demo requests.
- **Social media followers** — Followers don't equal customers. Track DMs or inbound leads from social.
- **Page views on content** — Views don't equal conversions. Track content → lead → customer attribution.

### The Exception: Diagnostic Metrics

Sometimes you track a metric temporarily to diagnose a problem.

Example: Your reply rate drops. You add "email deliverability score" to your dashboard. You fix the issue. You remove the metric.

**Diagnostic metrics are fine. Just don't let them become permanent.**

<RangeSlider 
  label="How many metrics are you currently tracking?" 
  min={0} 
  max={50} 
  lowLabel="None" 
  highLabel="50+" 
  persistKey="analytics-L1-metric-count" 
/>

---

## The 5-Metric Starter Dashboard

You don't need 30 metrics. You need **5 metrics** that answer the 3 questions.

Here's the starter dashboard for solo founders:

<SlideNavigation>
<Slide title="Metric 1: Prospects Added/Week">

**Question:** Is acquisition working?

**What it measures:** How many new qualified leads entered your pipeline this week.

**Target:** Depends on your sales cycle and close rate, but a good starting point is 10-20 new prospects/week for SMB SaaS.

**Why it matters:** If this number is zero, you have no pipeline. If it's growing, acquisition is working.

**How to track:** Count new contacts added to your CRM with status = "Prospect" or "Lead."

</Slide>

<Slide title="Metric 2: Meetings Booked/Week">

**Question:** Is acquisition working?

**What it measures:** How many discovery calls or demos you scheduled this week.

**Target:** 3-5 meetings/week for solo founders (12-20/month).

**Why it matters:** Meetings are the bridge between outreach and deals. No meetings = no pipeline.

**How to track:** Count calendar events tagged as "Discovery" or "Demo."

</Slide>

<Slide title="Metric 3: Pipeline Value">

**Question:** Is acquisition working?

**What it measures:** Total value of all open deals in your CRM.

**Target:** 3x your monthly revenue goal. If you want $10K MRR, maintain $30K pipeline.

**Why it matters:** Pipeline coverage tells you if you have enough deals in motion to hit your target.

**How to track:** Sum of (Deal Value × Stage Probability) for all open deals.

</Slide>

<Slide title="Metric 4: Win Rate">

**Question:** Is acquisition working? Where should I focus?

**What it measures:** % of qualified opportunities that close.

**Target:** 20-40% for SMB SaaS. Below 20% = qualification or closing problem.

**Why it matters:** Win rate tells you if you're targeting the right people and closing effectively.

**How to track:** Deals won / (Deals won + Deals lost) over the last 90 days.

</Slide>

<Slide title="Metric 5: Revenue (MRR or Cash)">

**Question:** Is acquisition working? Are customers staying?

**What it measures:** Monthly Recurring Revenue (SaaS) or cash collected (services/coaching).

**Target:** Month-over-month growth. Even 5-10% monthly compounds to 80-200% annually.

**Why it matters:** Revenue is the ultimate lagging indicator. It confirms that everything upstream is working.

**How to track:** Sum of active subscriptions (SaaS) or rolling 3-month average (services).

</Slide>
</SlideNavigation>

<InsightCard icon="📊" title="Why Only 5 Metrics?">
More metrics = more noise. The 5-metric dashboard forces you to focus on what matters. You can add more later, but start here.
</InsightCard>

---

## Metrics Cadence: When to Review What

Not all metrics need daily attention. Here's the review cadence that works for solo founders:

<ProgressiveReveal title="Your Metrics Review Schedule" persistKey="analytics-L1-cadence">

<RevealSection title="Daily (5 minutes)">

**What to check:**
- Inbox for replies to outreach
- CRM tasks (follow-ups, meeting prep)

**Why daily:** Responding fast to inbound replies is the #1 velocity lever. Within 5 minutes = 100x more likely to connect.

**When:** First thing in the morning or last thing before lunch.

</RevealSection>

<RevealSection title="Weekly (30 minutes)">

**What to check:**
- The 5-metric dashboard
- Pipeline stage movement (did deals advance or stall?)
- Channel performance (which source booked the most meetings?)

**Why weekly:** Weekly reviews catch trends before they become problems. Monthly is too slow.

**When:** Every Friday at the same time. Consistency builds pattern recognition.

</RevealSection>

<RevealSection title="Monthly (60 minutes)">

**What to check:**
- Unit economics (CAC, LTV, payback period)
- MRR waterfall (new, expansion, churned revenue)
- Channel ROI (revenue per channel / cost per channel)

**Why monthly:** Unit economics and revenue composition change slowly. Monthly is frequent enough to spot issues, not so frequent that you're reacting to noise.

**When:** First Friday of each month. Extend your weekly review to 90 minutes.

</RevealSection>

<RevealSection title="Quarterly (2-3 hours)">

**What to check:**
- Strategic pivot analysis (should you change ICP, channels, or offer?)
- Cohort retention (are customers from Q1 still here in Q3?)
- Forecast accuracy (how close were your predictions to reality?)

**Why quarterly:** Strategic decisions need 90 days of data to be meaningful. Quarterly reviews prevent knee-jerk pivots.

**When:** Last week of each quarter. Block a half-day.

</RevealSection>

</ProgressiveReveal>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You're tempted to build a real-time dashboard with 30 metrics. Resist. Start with the 5-metric weekly review. Add complexity only after 8 weeks of consistent reviews reveal what's missing.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches & Consultants">
Your revenue is often project-based, not recurring. Track "rolling 3-month average revenue" instead of MRR. Track "pipeline coverage ratio" (pipeline value / 3-month revenue target) instead of MRR growth.
</ContextualNote>

---

## Building Your Metrics Philosophy Map

Now it's time to create your first artifact: a **Metrics Philosophy Map**.

This is a one-page document that maps the 3 questions to your specific metrics, data sources, and review cadence.

<TemplateBuilder
  title="Your Metrics Philosophy Map"
  persistKey="analytics-L1-philosophy-map"
  sections={[
    {
      id: "question1",
      title: "Question 1: Is Acquisition Working?",
      fields: [
        { 
          id: "leading", 
          label: "Leading Indicators (track weekly)", 
          placeholder: "e.g., Prospects added/week, Meetings booked/week, Reply rate", 
          type: "textarea" 
        },
        { 
          id: "lagging", 
          label: "Lagging Indicators (track monthly)", 
          placeholder: "e.g., Deals won, Revenue, CAC", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "question2",
      title: "Question 2: Are Customers Staying?",
      fields: [
        { 
          id: "retention", 
          label: "Retention Metrics (track monthly)", 
          placeholder: "e.g., Monthly logo churn rate, NRR, Expansion MRR", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "question3",
      title: "Question 3: Where Should I Focus?",
      fields: [
        { 
          id: "focus", 
          label: "Focus Metrics (track weekly/monthly)", 
          placeholder: "e.g., Channel attribution, Pipeline bottleneck, Time ROI", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "sources",
      title: "Data Sources",
      fields: [
        { 
          id: "crm", 
          label: "CRM Tool", 
          placeholder: "e.g., HubSpot, Pipedrive, Attio", 
          type: "text" 
        },
        { 
          id: "dashboard", 
          label: "Dashboard Tool", 
          placeholder: "e.g., Google Sheets, HubSpot Dashboards, Metabase", 
          type: "text" 
        }
      ]
    },
    {
      id: "cadence",
      title: "Review Cadence",
      fields: [
        { 
          id: "weekly", 
          label: "Weekly Review Day/Time", 
          placeholder: "e.g., Every Friday at 4pm", 
          type: "text" 
        },
        { 
          id: "monthly", 
          label: "Monthly Review Day/Time", 
          placeholder: "e.g., First Friday of each month at 3pm", 
          type: "text" 
        }
      ]
    }
  ]}
/>

---

## The Pattern Recognition Game

After 4-8 weeks of consistent metrics reviews, you'll start seeing patterns.

Here are real patterns solo founders discovered:

<ExampleCard label="Pattern 1: Channel Quality">
"LinkedIn leads close at 3x the rate of cold email leads, but I get 5x more email leads. Total wins: email still produces more revenue. But LinkedIn leads have 2x higher LTV."

**Decision:** Keep email volume high for cash flow. Invest more time in LinkedIn for long-term value.
</ExampleCard>

<ExampleCard label="Pattern 2: Stage Bottleneck">
"60% of my deals die at the proposal stage. But deals that include a live demo before the proposal close at 80%. Proposals without demos close at 10%."

**Decision:** Never send a proposal without a demo. Add 'Demo Completed' as a required stage.
</ExampleCard>

<ExampleCard label="Pattern 3: Time Allocation">
"I spend 8 hours/week on content. It generates 2 inbound leads/month. I spend 3 hours/week on outbound email. It generates 15 meetings/month."

**Decision:** Cut content to 2 hours/week (just enough to maintain authority). Reallocate 6 hours to outbound.
</ExampleCard>

<PredictionGate
  question="After 8 weeks of tracking, what pattern do you think most solo founders discover?"
  persistKey="analytics-L1-predict"
  type="choice"
  choices={[
    { id: "a", text: "They're spending too much time on low-ROI channels" },
    { id: "b", text: "Their win rate is higher than they thought" },
    { id: "c", text: "Their pipeline is too small to hit their revenue goal" }
  ]}
  correctId="a"
>

**The answer: A — Time allocation is the #1 pattern.**

Most solo founders discover they're spending 60-80% of their time on channels that produce &lt;20% of their results.

The data forces them to kill their favorite channel (usually content or LinkedIn) and double down on what works (usually outbound email or referrals).

It's painful. But it's the difference between $5K MRR and $50K MRR.

</PredictionGate>

---

## Your Action Items

You've learned the 3 questions your metrics must answer. Now it's time to implement.

<InteractiveChecklist 
  title="Your Week 1 Action Items" 
  persistKey="analytics-L1-actions" 
  items={[
    "Complete your Metrics Philosophy Map (above)",
    "Audit your current metrics — delete any that don't answer the 3 questions",
    "Set up the 5-metric starter dashboard (we'll build this in Lesson 2)",
    "Schedule your weekly metrics review (same day/time every week)",
    "Track your time allocation for 1 week — where are you actually spending your 5-7 hours?"
  ]} 
/>

---

## What's Next

In **Lesson 2**, you'll build your first dashboard: the **Funnel Dashboard**.

You'll learn:
- How to visualize Leads → Meetings → Proposals → Wins
- SaaS funnel benchmarks (and where you stack up)
- How to identify your #1 bottleneck in 5 minutes
- How to track conversion rates at each stage

By the end of Lesson 2, you'll have a live funnel dashboard pulling data from your CRM.

**See you there.**

---

## Quiz: The 3 Questions

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Which of these is a LEADING indicator of acquisition success?",
      "options": [
        "Revenue this month",
        "Deals closed this month",
        "Meetings booked this week",
        "Customer churn rate"
      ],
      "correctAnswer": 2,
      "explanation": "Meetings booked this week is a leading indicator — it tells you NOW if acquisition is working. Revenue and deals closed are lagging indicators (they reflect past actions). Churn is a retention metric."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "What is the primary purpose of tracking metrics?",
      "options": [
        "To feel productive and data-driven",
        "To have something to show investors",
        "To change decisions based on what's working",
        "To compare yourself to competitors"
      ],
      "correctAnswer": 2,
      "explanation": "The Anti-Vanity Metrics Principle: Track only metrics that change decisions. If a metric doesn't influence what you do, delete it."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "Healthy SMB SaaS monthly logo churn should be:",
      "options": [
        "Under 1%",
        "Under 3%",
        "Under 10%",
        "Under 20%"
      ],
      "correctAnswer": 1,
      "explanation": "Healthy SMB SaaS monthly logo churn is &lt;3%. Above 5% and you're in trouble. Above 10% and you have a product-market fit problem."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "Email open rate is a good metric to track because it shows engagement.",
      "correctAnswer": false,
      "explanation": "False. Email open rate is a vanity metric. Opens don't predict replies or meetings. Track reply rate instead."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "How often should solo founders review their 5-metric dashboard?",
      "options": [
        "Daily",
        "Weekly",
        "Monthly",
        "Quarterly"
      ],
      "correctAnswer": 1,
      "explanation": "Weekly. Daily is too frequent (you'll react to noise). Monthly is too slow (you'll miss trends). Weekly reviews catch problems before they compound."
    },
    {
      "id": "q6",
      "type": "multiple-choice",
      "question": "Which metric answers 'Where should I focus?'",
      "options": [
        "Total revenue",
        "Channel attribution (wins by source)",
        "Monthly churn rate",
        "Email open rate"
      ],
      "correctAnswer": 1,
      "explanation": "Channel attribution tells you which source produces the most wins, which directly answers 'Where should I focus?' Revenue is a lagging indicator. Churn answers 'Are customers staying?' Open rate is vanity."
    }
  ]
}