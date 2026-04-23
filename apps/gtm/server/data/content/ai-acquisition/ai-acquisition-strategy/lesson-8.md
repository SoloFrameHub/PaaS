---
title: "Measuring What Matters: KPIs for AI-Assisted Sales"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 21: AI Acquisition Strategy"
lesson: 8
---

You've built the AI stack. You've automated the research. You've launched sequences. Now comes the question that separates successful solo founders from those drowning in dashboards: **What do you actually measure?**

Here's the trap: Most AI sales tools give you 47 metrics. Open rates, click rates, bounce rates, reply rates, positive reply rates, meeting-booked rates, domain reputation scores, sender scores, engagement scores... and you end up checking 12 different dashboards every morning, feeling productive while your pipeline stays empty.

**The reality:** You need exactly **5 metrics** to run an AI-assisted acquisition system as a solo founder. Not 47. Not 12. Five.

This lesson teaches you which five, why they matter, and how to build a single-screen dashboard that tells you everything you need to know in under 60 seconds.

---

## The Dashboard Disaster

<ExampleCard label="Case Study: The Metrics Trap">

Marcus spent 6 months building what he called "the perfect AI sales machine." Apollo for prospecting. Clay for enrichment. Instantly for sequences. LinkedIn Sales Navigator for intent signals. ChatGPT for personalization.

His morning routine: 45 minutes checking dashboards.

- Apollo: "You added 127 prospects this week!"
- Instantly: "18% open rate! 4.2% reply rate!"
- Clay: "You enriched 89 records!"
- Sales Navigator: "23 job changes detected!"
- HubSpot: "47 activities logged!"

He felt busy. He felt data-driven. He felt like he was winning.

His actual pipeline: **$12K** after 6 months. Two deals closed, both from referrals that had nothing to do with his AI stack.

The problem wasn't the tools. It was that he was measuring **activity** instead of **outcomes**, and **vanity metrics** instead of **leading indicators**.

When he finally stripped his dashboard down to 5 metrics and started tracking them daily, his pipeline hit **$67K** in 90 days.

</ExampleCard>

<InsightCard icon="📊" title="The Metric Paradox">

The more metrics you track, the less you understand what's actually working. AI tools make it easy to measure everything, which makes it dangerously easy to measure nothing that matters.

</InsightCard>

---

## The 5-Metric Dashboard Framework

Here's what you actually need to track:

### Metric 1: **Prospects Added/Week** (Input)
### Metric 2: **Emails Sent/Week** (Activity)
### Metric 3: **Reply Rate %** (Efficiency)
### Metric 4: **Conversations Booked/Week** (Conversion)
### Metric 5: **Pipeline Value/Month** (Outcome)

That's it. Everything else is either a vanity metric or a diagnostic tool you check only when something breaks.

<FlipCard 
  front="Why only 5 metrics?" 
  back="Because you're a solo founder with 5-7 hours/week for acquisition. You need a dashboard you can check in 60 seconds, understand immediately, and act on today. More metrics = analysis paralysis." 
/>

Let's break down each one and build your dashboard.

---

## Metric 1: Prospects Added/Week (The Pipeline Fuel Gauge)

**What it measures:** How many new, qualified prospects entered your system this week.

**Why it matters:** If this number goes to zero, your pipeline dies in 4-8 weeks. This is your early warning system.

**Target range for solo founders:** 20-50/week

- Below 20: You're not feeding the machine enough
- 20-50: Sustainable for 5-7 hours/week
- Above 50: You're either crushing it or adding junk leads

**How to track it:**
- Apollo: Filter by "Date Added" = "This Week"
- HubSpot: Create a "New Contacts This Week" report
- Clay: Track "Records Created" by week

<RangeSlider 
  label="How many prospects are you currently adding per week?" 
  min={0} 
  max={100} 
  lowLabel="0 (danger zone)" 
  highLabel="100+ (unsustainable)" 
  persistKey="ai-acquisition-strategy-L8-prospects-added" 
/>

<InsightCard icon="⚠️" title="The Zero-Week Warning">

If you add zero prospects for two consecutive weeks, your pipeline will be empty in 60 days. This metric is your canary in the coal mine.

</InsightCard>

### What "Qualified" Actually Means

Not all prospects are equal. A "qualified prospect" for this metric means:

1. **Fits your ICP** (industry, company size, role)
2. **Has contact info** (verified email or LinkedIn connection)
3. **Passes your lead score threshold** (6+ on your 1-10 scale from Lesson 4)

<InteractiveChecklist 
  title="Prospect Quality Checklist" 
  persistKey="ai-acquisition-strategy-L8-quality-check" 
  items={[
    "I have a clear ICP definition (from Course 2)",
    "I'm using lead scoring (from Lesson 4)",
    "I verify emails before adding to sequences",
    "I remove prospects who don't fit after initial research"
  ]} 
/>

---

## Metric 2: Emails Sent/Week (The Activity Baseline)

**What it measures:** Total outbound emails sent (first touch + follow-ups).

**Why it matters:** This is your activity baseline. If you're not sending enough emails, nothing else matters. But if you're sending too many, you risk deliverability issues.

**Target range for solo founders:** 150-500/week

- Below 150: You're not reaching enough people
- 150-500: Sweet spot for AI-assisted personalization
- Above 500: You're either scaling successfully or about to get flagged as spam

**How to track it:**
- Instantly/Smartlead: Built-in "Emails Sent" dashboard
- HubSpot: "Email Sends" report
- Gmail/Outlook: Use a tracking extension or manual count

<ScenarioSimulator
  title="Email Volume Impact Calculator"
  persistKey="ai-acquisition-strategy-L8-volume-sim"
  levers={[
    { id: "emailsPerWeek", label: "Emails sent per week", min: 50, max: 1000, step: 50, defaultValue: 250 },
    { id: "replyRate", label: "Reply rate (%)", min: 1, max: 20, step: 1, defaultValue: 7 }
  ]}
  outputs={[
    { id: "repliesPerWeek", label: "Replies per week", formula: "(emailsPerWeek * (replyRate / 100))", unit: "", precision: 1 },
    { id: "repliesPerMonth", label: "Replies per month", formula: "(emailsPerWeek * 4 * (replyRate / 100))", unit: "", precision: 0 }
  ]}
  insight="At {repliesPerWeek} replies/week, if 30% convert to conversations, that's {repliesPerWeek * 0.3} meetings/week or roughly {repliesPerWeek * 0.3 * 4} meetings/month."
/>

### The Volume vs. Quality Tradeoff

<StrategyDuel
  title="High Volume vs. High Quality"
  persistKey="ai-acquisition-strategy-L8-volume-duel"
  scenario="You have 5 hours this week for outreach."
  strategyA={{ 
    name: "High Volume", 
    description: "Send 500 emails with AI-generated first lines (Level 2 personalization)", 
    pros: ["More at-bats", "Faster learning", "Scales with AI"], 
    cons: ["Lower reply rate (3-5%)", "Deliverability risk if quality drops"] 
  }}
  strategyB={{ 
    name: "High Quality", 
    description: "Send 100 emails with deep manual research (Level 4 personalization)", 
    pros: ["Higher reply rate (15-25%)", "Better conversations", "Stronger relationships"], 
    cons: ["Slower", "Doesn't scale", "Burnout risk"] 
  }}
  expertVerdict="The answer is BOTH. Use the Draft + Human Gate model from Lesson 3: AI drafts 500, you manually review and personalize the top 100 (20%). Send all 500, but expect the top 100 to drive 60-70% of your replies."
/>

---

## Metric 3: Reply Rate % (The Efficiency Indicator)

**What it measures:** (Replies ÷ Emails Sent) × 100

**Why it matters:** This tells you if your targeting and messaging are working. A dropping reply rate means something is broken — bad list, weak personalization, or deliverability issues.

**Target range for solo founders:**

- **5-15%** = AI-assisted personalization at moderate scale (150-500 emails/week)
- **15-25%** = Manual personalization for small batches (50-100 emails/week)
- **Below 5%** = Something is broken (targeting, messaging, or deliverability)
- **Above 25%** = Either you're crushing it or your sample size is too small

**How to track it:**
- Instantly/Smartlead: Built-in reply rate dashboard
- HubSpot: Create a custom report (Replies ÷ Sends)
- Manual: Track in a spreadsheet

<InsightCard icon="🎯" title="The 5% Floor">

If your reply rate drops below 5% for two consecutive weeks, STOP sending and diagnose:

1. Check deliverability (spam folder rate, domain reputation)
2. Review personalization quality (are you hallucinating?)
3. Audit your list (are these actually your ICP?)
4. Test new messaging

</InsightCard>

### What Counts as a "Reply"?

For this metric, count:

✅ **Positive replies** ("Tell me more")  
✅ **Objection replies** ("Not interested right now")  
✅ **Question replies** ("How does this work?")  
✅ **Out-of-office** (if they engage after returning)

❌ **Unsubscribes** (track separately)  
❌ **Bounces** (deliverability issue, not engagement)  
❌ **Auto-replies** (unless they engage after)

<ClassifyExercise
  title="Classify These Replies"
  persistKey="ai-acquisition-strategy-L8-classify-replies"
  categories={[
    { id: "positive", label: "Positive Reply", color: "#10b981" },
    { id: "objection", label: "Objection Reply", color: "#f59e0b" },
    { id: "ignore", label: "Ignore (Don't Count)", color: "#6b7280" }
  ]}
  items={[
    { id: "1", content: "Thanks for reaching out. Can you send me pricing?", correctCategory: "positive" },
    { id: "2", content: "Not interested. Please remove me from your list.", correctCategory: "objection" },
    { id: "3", content: "Out of office until next Monday.", correctCategory: "ignore" },
    { id: "4", content: "We already have a solution for this.", correctCategory: "objection" },
    { id: "5", content: "Interesting. Let's schedule a call.", correctCategory: "positive" },
    { id: "6", content: "[Automated bounce: Email address not found]", correctCategory: "ignore" }
  ]}
/>

---

## Metric 4: Conversations Booked/Week (The Conversion Metric)

**What it measures:** How many discovery calls, demos, or sales conversations you booked this week.

**Why it matters:** This is the bridge between outreach activity and revenue. If you're getting replies but not booking conversations, your qualification or CTA is broken.

**Target range for solo founders:** 2-5/week

- Below 2: Not enough activity or poor conversion from reply → meeting
- 2-5: Sustainable for 5-7 hours/week
- Above 5: You're either scaling successfully or need to hire

**How to track it:**
- Calendly/SavvyCal: "Meetings Booked This Week"
- HubSpot: "Meetings Created" report
- Manual: Count calendar invites

<RangeSlider 
  label="How many conversations are you currently booking per week?" 
  min={0} 
  max={10} 
  lowLabel="0 (broken funnel)" 
  highLabel="10+ (hire help)" 
  persistKey="ai-acquisition-strategy-L8-conversations-booked" 
/>

### The Reply-to-Conversation Conversion Rate

Most solo founders focus on reply rate and forget this critical step:

**Reply-to-Conversation Rate = (Conversations Booked ÷ Replies) × 100**

**Target:** 20-40%

- Below 20%: Your qualification or CTA is weak
- 20-40%: Healthy conversion
- Above 40%: You're either great at qualification or only talking to hot leads

<ExampleCard label="Diagnosis: High Replies, Low Conversions">

**Scenario:** You're getting 15 replies/week (10% reply rate) but only booking 2 conversations (13% conversion).

**Diagnosis:** Your messaging is attracting interest, but your qualification or CTA is failing.

**Fixes:**
1. Add a qualifying question in your first reply: "Are you currently using [competitor] or handling this manually?"
2. Make your CTA more specific: "15-minute call Tuesday at 2pm?" instead of "Let's chat sometime"
3. Use a Calendly link with pre-qualifying questions

</ExampleCard>

---

## Metric 5: Pipeline Value/Month (The Outcome Metric)

**What it measures:** Total dollar value of opportunities in your pipeline, measured monthly.

**Why it matters:** This is the only metric that directly correlates to revenue. Everything else is a leading indicator; this is the outcome.

**Target range:** Depends on your deal size and close rate, but a healthy pipeline should be **3-5x your monthly revenue goal**.

**How to track it:**
- HubSpot/Pipedrive: "Pipeline Value" report
- Manual: Sum of (Deal Size × Probability) for all open opportunities

<ScenarioSimulator
  title="Pipeline Math Calculator"
  persistKey="ai-acquisition-strategy-L8-pipeline-math"
  levers={[
    { id: "monthlyRevGoal", label: "Monthly revenue goal ($)", min: 5000, max: 100000, step: 5000, defaultValue: 20000 },
    { id: "avgDealSize", label: "Average deal size ($)", min: 1000, max: 50000, step: 1000, defaultValue: 5000 },
    { id: "closeRate", label: "Close rate (%)", min: 10, max: 50, step: 5, defaultValue: 25 }
  ]}
  outputs={[
    { id: "dealsNeeded", label: "Deals needed per month", formula: "(monthlyRevGoal / avgDealSize)", unit: "", precision: 1 },
    { id: "pipelineNeeded", label: "Pipeline value needed", formula: "(monthlyRevGoal / (closeRate / 100))", unit: "$", precision: 0 },
    { id: "conversationsNeeded", label: "Conversations needed", formula: "(monthlyRevGoal / avgDealSize / (closeRate / 100))", unit: "", precision: 0 }
  ]}
  insight="To hit ${monthlyRevGoal}/month, you need ${pipelineNeeded} in pipeline and roughly {conversationsNeeded} conversations per month (or {conversationsNeeded / 4} per week)."
/>

### Working Backwards from Revenue

Here's the math every solo founder should know:

1. **Revenue Goal** ÷ **Deal Size** = **Deals Needed**
2. **Deals Needed** ÷ **Close Rate** = **Conversations Needed**
3. **Conversations Needed** ÷ **Reply-to-Conversation Rate** = **Replies Needed**
4. **Replies Needed** ÷ **Reply Rate** = **Emails Needed**

**Example:**
- Revenue Goal: $10K/month
- Deal Size: $2K
- Close Rate: 25%
- Reply-to-Conversation Rate: 30%
- Reply Rate: 7%

**Math:**
1. $10K ÷ $2K = **5 deals/month**
2. 5 ÷ 0.25 = **20 conversations/month** (5/week)
3. 20 ÷ 0.30 = **67 replies/month**
4. 67 ÷ 0.07 = **957 emails/month** (~240/week)

<TemplateBuilder
  title="Your Pipeline Math"
  persistKey="ai-acquisition-strategy-L8-pipeline-template"
  sections={[
    {
      id: "goals",
      title: "Revenue Goals",
      fields: [
        { id: "monthlyRevGoal", label: "Monthly revenue goal ($)", placeholder: "e.g., 10000", type: "number" },
        { id: "avgDealSize", label: "Average deal size ($)", placeholder: "e.g., 2000", type: "number" }
      ]
    },
    {
      id: "rates",
      title: "Conversion Rates",
      fields: [
        { id: "closeRate", label: "Close rate (%)", placeholder: "e.g., 25", type: "number" },
        { id: "replyToConvo", label: "Reply-to-conversation rate (%)", placeholder: "e.g., 30", type: "number" },
        { id: "replyRate", label: "Reply rate (%)", placeholder: "e.g., 7", type: "number" }
      ]
    },
    {
      id: "outputs",
      title: "Required Activity",
      fields: [
        { id: "dealsNeeded", label: "Deals needed per month", placeholder: "Auto-calculated", type: "text" },
        { id: "conversationsNeeded", label: "Conversations needed per month", placeholder: "Auto-calculated", type: "text" },
        { id: "repliesNeeded", label: "Replies needed per month", placeholder: "Auto-calculated", type: "text" },
        { id: "emailsNeeded", label: "Emails needed per month", placeholder: "Auto-calculated", type: "text" }
      ]
    }
  ]}
/>

---

## Building Your Single-Screen Dashboard

Now let's put it all together. You need a dashboard that shows all 5 metrics in one place, updates automatically, and takes less than 60 seconds to review.

### Option 1: Google Sheets (Free)

**Setup time:** 30 minutes  
**Tools needed:** Google Sheets + Zapier (free tier)

**Structure:**

| Metric | This Week | Last Week | 4-Week Avg | Target | Status |
|--------|-----------|-----------|------------|--------|--------|
| Prospects Added | 32 | 28 | 30 | 20-50 | ✅ |
| Emails Sent | 287 | 310 | 295 | 150-500 | ✅ |
| Reply Rate | 8.4% | 7.2% | 7.8% | 5-15% | ✅ |
| Conversations Booked | 4 | 3 | 3.5 | 2-5 | ✅ |
| Pipeline Value | $34K | $29K | $31K | $30K+ | ✅ |

**How to automate:**
1. Connect Instantly/Apollo to Zapier
2. Send weekly stats to Google Sheets
3. Use formulas for calculations and conditional formatting for status

### Option 2: HubSpot Dashboard (Free CRM)

**Setup time:** 20 minutes  
**Tools needed:** HubSpot Free CRM

**Reports to add:**
1. "New Contacts This Week" (Prospects Added)
2. "Email Sends This Week" (Emails Sent)
3. "Email Reply Rate" (Reply Rate)
4. "Meetings Booked This Week" (Conversations Booked)
5. "Pipeline Value" (Pipeline Value)

### Option 3: Notion Dashboard (Free)

**Setup time:** 45 minutes  
**Tools needed:** Notion + Zapier

**Structure:** Database with weekly entries, each row = one week, columns = 5 metrics + notes.

<InsightCard icon="🎯" title="The 60-Second Rule">

Your dashboard should answer three questions in under 60 seconds:

1. **Am I feeding the machine?** (Prospects Added)
2. **Is the machine working?** (Reply Rate + Conversations Booked)
3. **Is the machine producing revenue?** (Pipeline Value)

If you can't answer these in 60 seconds, your dashboard is too complex.

</InsightCard>

---

## Diagnostic Metrics (Check Only When Something Breaks)

These are NOT part of your daily dashboard, but you should know how to check them when a core metric drops:

### When Reply Rate Drops Below 5%:

1. **Deliverability Score** (Google Postmaster Tools, Instantly health check)
2. **Spam Folder Rate** (Instantly/Smartlead inbox placement test)
3. **Domain Reputation** (Sender Score, MXToolbox)
4. **Bounce Rate** (should be &lt;2%)
5. **Unsubscribe Rate** (should be &lt;0.5%)

### When Conversations Booked Drops:

1. **Reply-to-Conversation Rate** (Conversations ÷ Replies)
2. **CTA Click Rate** (if using Calendly links)
3. **Qualification Rate** (% of replies that fit ICP)

### When Pipeline Value Stagnates:

1. **Deal Velocity** (average days from conversation → close)
2. **Win Rate by Source** (which channels close best?)
3. **Average Deal Size** (is it shrinking?)

<InteractiveChecklist 
  title="Dashboard Setup Checklist" 
  persistKey="ai-acquisition-strategy-L8-dashboard-setup" 
  items={[
    "Choose dashboard tool (Sheets, HubSpot, or Notion)",
    "Set up automated data feeds from Instantly/Apollo",
    "Add all 5 core metrics",
    "Set target ranges for each metric",
    "Add conditional formatting (green/yellow/red)",
    "Schedule weekly review (same day/time every week)",
    "Document diagnostic metrics to check when core metrics drop"
  ]} 
/>

---

## The Weekly Review Ritual

Metrics are useless if you don't act on them. Here's a 15-minute weekly review ritual:

### Monday Morning (15 minutes)

1. **Check the 5 metrics** (2 minutes)
2. **Identify the bottleneck** (3 minutes)
   - If Prospects Added is low → Schedule 90 min for list building this week
   - If Reply Rate is low → Audit last 10 emails for quality
   - If Conversations Booked is low → Review your CTA and qualification
3. **Set one improvement goal** (5 minutes)
   - Example: "Increase reply rate from 6% to 8% by improving first lines"
4. **Plan the week's activity** (5 minutes)
   - How many emails will you send?
   - How many prospects will you add?
   - How many conversations do you need to book?

<TemplateBuilder
  title="Weekly Review Template"
  persistKey="ai-acquisition-strategy-L8-weekly-review"
  sections={[
    {
      id: "metrics",
      title: "This Week's Metrics",
      fields: [
        { id: "prospectsAdded", label: "Prospects Added", placeholder: "e.g., 32", type: "number" },
        { id: "emailsSent", label: "Emails Sent", placeholder: "e.g., 287", type: "number" },
        { id: "replyRate", label: "Reply Rate (%)", placeholder: "e.g., 8.4", type: "number" },
        { id: "conversationsBooked", label: "Conversations Booked", placeholder: "e.g., 4", type: "number" },
        { id: "pipelineValue", label: "Pipeline Value ($)", placeholder: "e.g., 34000", type: "number" }
      ]
    },
    {
      id: "bottleneck",
      title: "Bottleneck Analysis",
      fields: [
        { id: "bottleneck", label: "What's the biggest bottleneck this week?", placeholder: "e.g., Reply rate dropped to 4.2%", type: "textarea" },
        { id: "rootCause", label: "What's the likely root cause?", placeholder: "e.g., Switched to new list segment, personalization quality dropped", type: "textarea" }
      ]
    },
    {
      id: "action",
      title: "This Week's Focus",
      fields: [
        { id: "improvementGoal", label: "One improvement goal", placeholder: "e.g., Increase reply rate to 7% by improving first-line quality", type: "textarea" },
        { id: "weeklyPlan", label: "Activity plan for this week", placeholder: "e.g., Send 250 emails, add 40 prospects, book 4 conversations", type: "textarea" }
      ]
    }
  ]}
/>

---

## Common Dashboard Mistakes

<ExampleCard label="Mistake 1: Tracking Open Rates">

**The Problem:** Open rates are increasingly unreliable due to Apple Mail Privacy Protection and other email clients pre-loading images. In 2026, open rates are 30-50% inflated.

**The Fix:** Ignore open rates entirely. Focus on reply rates instead.

</ExampleCard>

<ExampleCard label="Mistake 2: Obsessing Over Click Rates">

**The Problem:** Click rates on links in cold emails are typically 1-3%. You'll drive yourself crazy optimizing for such small numbers.

**The Fix:** Only track click rates if you're running a content-first strategy (e.g., "Here's a free resource"). For direct sales outreach, focus on replies.

</ExampleCard>

<ExampleCard label="Mistake 3: Tracking Too Many Segments">

**The Problem:** "Let me see reply rates by industry, by title, by company size, by day of week, by time of day..."

**The Fix:** Start with ONE segment (your primary ICP). Only add segments when you have 500+ emails sent to each.

</ExampleCard>

<ExampleCard label="Mistake 4: Daily Dashboard Checks">

**The Problem:** Checking your dashboard 3x/day creates anxiety and doesn't give you enough data to make decisions.

**The Fix:** Check once per week, same day/time. Let the data accumulate.

</ExampleCard>

---

## Advanced: Cohort Analysis for AI Outreach

Once you've mastered the 5-metric dashboard, you can add one advanced layer: **cohort analysis**.

**What it is:** Tracking groups of prospects by the week they were added, then measuring conversion rates over time.

**Why it matters:** It tells you if your AI personalization is improving or degrading over time.

**How to do it:**

1. Tag prospects with "Week Added" (W1, W2, W3, etc.)
2. Track reply rate and conversion rate by cohort
3. Compare cohorts to see if newer prospects perform better

**Example:**

| Cohort | Prospects | Emails Sent | Reply Rate | Conversations | Conv Rate |
|--------|-----------|-------------|------------|---------------|-----------|
| W1 (Jan 1-7) | 50 | 200 | 6.5% | 3 | 23% |
| W2 (Jan 8-14) | 45 | 180 | 8.2% | 4 | 27% |
| W3 (Jan 15-21) | 52 | 208 | 9.1% | 5 | 29% |

**Insight:** Reply rate is improving week-over-week, suggesting better targeting or personalization.

<InsightCard icon="📈" title="When to Use Cohort Analysis">

Only add cohort analysis after you've sent 1,000+ emails and have 8+ weeks of data. Before that, focus on the 5 core metrics.

</InsightCard>

---

## Summary: Your Action Plan

<InteractiveChecklist 
  title="KPI Dashboard Implementation" 
  persistKey="ai-acquisition-strategy-L8-action-plan" 
  items={[
    "Choose your dashboard tool (Google Sheets, HubSpot, or Notion)",
    "Set up automated data feeds from your AI stack",
    "Add the 5 core metrics with target ranges",
    "Calculate your pipeline math (work backwards from revenue goal)",
    "Schedule your weekly review ritual (Monday mornings, 15 minutes)",
    "Document diagnostic metrics to check when core metrics drop",
    "Run your first weekly review this Monday",
    "After 4 weeks, review trends and adjust targets"
  ]} 
/>

---

## What's Next

In **Lesson 9**, we'll tackle the economics question every solo founder asks: **"Should I hire an SDR or keep using AI?"**

You'll build a complete cost comparison model, calculate your breakeven point, and learn when (and how) to make the transition from solo AI operator to AI-assisted team.

But first, go build your dashboard. You can't optimize what you don't measure.