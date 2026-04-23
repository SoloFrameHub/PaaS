---
title: "Commit vs Upside Forecasting"
duration: "50 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 4
---

## The $80K Revenue Hole

Meet Jordan, a technical founder running a dev tools SaaS. Three months ago, he forecasted $80K in revenue for Q4. He had 12 deals in pipeline, all "looking good." His spreadsheet showed verbal interest from prospects, positive demo feedback, and follow-up meetings scheduled.

Actual Q4 revenue: $31K.

What happened? Jordan fell into the **founder optimism trap**. Every deal in his pipeline felt like it was going to close. The prospect who said "this looks interesting" got weighted the same as the one who said "send me a contract." The demo that went well got counted as a near-certain win.

By December, Jordan was scrambling. He'd turned down consulting work because he thought he had $80K coming. He'd hired a contractor he couldn't afford. And he'd lost three months he could've spent actually closing deals instead of celebrating phantom revenue.

<InsightCard icon="🎯" title="The Real Problem">
Founders don't lie about their pipeline. They just can't tell the difference between "interested" and "committed" until it's too late.
</InsightCard>

Today, you're going to learn the **binary commit/upside forecasting system** that neutralizes optimism bias and gives you accurate revenue predictions. By the end of this lesson, you'll be able to look at your pipeline and know — with 70-80% accuracy — what's actually going to close this month.

---

## Why Founders Over-Forecast (And How to Stop)

### The Optimism Bias Tax

Every founder pays it. You're wired to see possibility in every conversation. A prospect says "let me think about it" and you hear "I'm 80% in." They ask for a proposal and you mentally book the revenue.

The data is brutal:

<FlipCard 
  front="What % of pipeline deals are already dead?" 
  back="60% of deals in your pipeline are already lost — you just don't know it yet. (CSO Insights)" 
/>

<RangeSlider 
  label="How often do you hit your monthly revenue forecast?" 
  min={0} 
  max={10} 
  lowLabel="Never" 
  highLabel="Always" 
  persistKey="analytics-L4-forecast-accuracy" 
/>

Here's what the research shows:

- **Average forecast accuracy across all sales orgs: 47%** (Gartner) — basically a coin flip
- **Solo founders over-forecast by 40-60% on average** — optimism bias is extreme without team calibration
- **Even professional SDRs only hit 60% of quota** (Bridge Group) — and they have managers keeping them honest

The problem isn't that you're bad at sales. It's that **verbal interest feels like commitment** when you're the one who needs the revenue.

<ExampleCard label="Case Study: The Verbal Yes That Wasn't">
Alex, a coaching business founder, had a prospect say "yes, let's do this" on a discovery call. Alex sent the contract. The prospect went silent for two weeks, then replied: "Actually, I need to talk to my business partner first."

Alex had already counted that $5K in his forecast. He'd even planned how to spend it. The deal eventually closed... three months later, after two more "yes" moments that weren't actually yes.

**The lesson:** Until money moves or a contract is signed, it's not a commit. It's upside.
</ExampleCard>

### The Four Stages of Founder Delusion

Most founders move through these stages as they learn to forecast:

<SlideNavigation>
<Slide title="Stage 1: Pure Optimism">
**"Everyone's going to buy!"**

You count every lead as a future customer. Your forecast is just your pipeline × 100%. You're constantly surprised when deals don't close.

**Reality check:** This stage usually lasts 3-6 months until you've been burned enough times.
</Slide>

<Slide title="Stage 2: Arbitrary Discounting">
**"Okay, maybe 50% will close."**

You start applying a blanket discount to your pipeline. "I have $100K in pipeline, so I'll forecast $50K." Better than Stage 1, but still wildly inaccurate because not all deals are created equal.

**Reality check:** This gets you to maybe 40-50% accuracy. Still missing forecast by half.
</Slide>

<Slide title="Stage 3: Stage-Weighted Guessing">
**"Leads are 10%, meetings are 40%, proposals are 60%..."**

You assign probabilities by stage. This is closer to real forecasting, but you're still guessing at the percentages. And you're not accounting for deal quality differences within stages.

**Reality check:** This gets you to 50-60% accuracy if you calibrate well. But it takes 6+ months of data.
</Slide>

<Slide title="Stage 4: Binary Commit/Upside">
**"Would I bet $1,000 this closes?"**

You stop trying to probability-weight everything. Instead, you classify deals into two buckets: **Commit** (you'd bet money on it) and **Upside** (possible but not certain). Then you forecast Commit + (Upside × 30%).

**Reality check:** This gets you to 70-80% accuracy immediately, even without historical data.
</Slide>
</SlideNavigation>

We're going to skip straight to Stage 4.

---

## The Binary Commit/Upside Model

Here's the framework that changed Jordan's forecasting from 39% accurate to 76% accurate in 90 days:

### The Two Buckets

<ComparisonBuilder
  title="Commit vs Upside Classification"
  persistKey="analytics-L4-commit-definition"
  prompt="Write your definition of a 'Commit' deal"
  expertExample="Commit = Champion confirmed + Budget approved + Timeline set + Verbal yes received + No unresolved blockers. Everything else is Upside."
  criteria={[
    "Includes specific verification criteria",
    "Requires active confirmation, not passive interest",
    "Has a clear 'yes/no' test you can apply"
  ]}
/>

**Commit deals** are the ones you'd bet your rent on. Literally. If someone offered you $1,000 to bet that this deal closes this month, you'd take the bet.

**Upside deals** are everything else. They might close. They probably won't. But they're possible.

The forecast formula is simple:

**Monthly Forecast = Commit Total + (Upside Total × 30%)**

That 30% is conservative. In reality, maybe 20-40% of your upside deals will close. But starting at 30% keeps you honest.

### The "$1,000 Bet" Test

For every deal in your pipeline, ask yourself:

> "Would I personally bet $1,000 of my own money that this deal closes in the next 30 days?"

If the answer is anything other than "yes, absolutely," it's upside, not commit.

<SwipeDecision
  title="Commit or Upside?"
  description="Swipe right for Commit, left for Upside"
  optionA="Upside"
  optionB="Commit"
  persistKey="analytics-L4-swipe-classify"
  cards={[
    {
      id: "1",
      content: "Prospect said 'this looks great' after demo and asked for pricing",
      correctOption: "a",
      explanation: "Asking for pricing is interest, not commitment. No timeline, no budget confirmation, no champion identified. Upside."
    },
    {
      id: "2",
      content: "Prospect verbally agreed to terms, asked you to send contract, and said 'I'll sign this week'",
      correctOption: "b",
      explanation: "Verbal yes + timeline + contract requested = Commit. You'd bet $1K on this."
    },
    {
      id: "3",
      content: "Prospect introduced you to their boss and said 'we need to get budget approval, but I'm pushing for this'",
      correctOption: "a",
      explanation: "Champion is identified and engaged, but budget isn't approved yet. Upside until the boss says yes."
    },
    {
      id: "4",
      content: "Prospect sent you a signed contract and said 'processing payment this week'",
      correctOption: "b",
      explanation: "Contract signed = Commit. Even if payment is pending, this is as close to certain as it gets."
    },
    {
      id: "5",
      content: "Prospect said 'we're evaluating 3 vendors and will decide next month'",
      correctOption: "a",
      explanation: "You're in a competitive process with no decision timeline. Upside at best, maybe even dead."
    },
    {
      id: "6",
      content: "Prospect said 'send me the proposal, I'll review with my team and get back to you'",
      correctOption: "a",
      explanation: "Proposal requested is progress, but no timeline, no commitment to decide. Upside."
    },
    {
      id: "7",
      content: "Prospect said 'we're starting January 1st, here's our credit card for the first month'",
      correctOption: "b",
      explanation: "Payment method provided + start date = Commit. This is closed."
    },
    {
      id: "8",
      content: "Prospect replied to your follow-up email with 'still interested, just busy right now'",
      correctOption: "a",
      explanation: "'Still interested' is the kiss of death. This is either dead or very low upside."
    }
  ]}
/>

### What Makes a Deal "Commit"?

Here are the five criteria. A deal must have **all five** to be Commit:

<InteractiveChecklist
  title="Commit Deal Criteria"
  persistKey="analytics-L4-commit-criteria"
  items={[
    "**Champion confirmed** — You have a specific person internally who wants this to happen and has influence",
    "**Budget approved** — They've confirmed budget exists and is allocated (not 'we'll find budget')",
    "**Timeline set** — They've given you a specific decision date or start date (not 'soon' or 'next quarter')",
    "**Verbal yes received** — They've explicitly said 'yes, we want to move forward' (not 'this looks good')",
    "**No unresolved blockers** — No pending approvals, no competing priorities, no 'we need to check with X first'"
  ]}
/>

If a deal is missing even one of these, it's Upside.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Think of Commit criteria like a test suite. All tests must pass (green) for the deal to ship. One failing test = not ready to deploy. Same logic here.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches & Consultants">
Your "Commit" bar should be even higher. Until they've paid a deposit or signed a contract, it's Upside. Verbal commitments in coaching often evaporate when the prospect has to pull out their credit card.
</ContextualNote>

---

## Stage-Weighted Forecasting (The Alternative Approach)

Some founders prefer a more granular approach: assigning probabilities to each pipeline stage and summing the weighted values.

Here's how it works:

### Default Stage Probabilities

<TemplateBuilder
  title="Your Stage Probability Model"
  persistKey="analytics-L4-stage-weights"
  sections={[
    {
      id: "stages",
      title: "Pipeline Stages & Probabilities",
      fields: [
        {
          id: "lead",
          label: "Lead (not yet contacted)",
          placeholder: "5%",
          type: "text",
          helperText: "Default: 5%. Adjust after 90 days based on your data."
        },
        {
          id: "contacted",
          label: "Contacted (replied but not qualified)",
          placeholder: "10%",
          type: "text",
          helperText: "Default: 10%"
        },
        {
          id: "engaged",
          label: "Engaged (qualified, interested)",
          placeholder: "20%",
          type: "text",
          helperText: "Default: 20%"
        },
        {
          id: "meeting",
          label: "Meeting Held (demo or discovery done)",
          placeholder: "40%",
          type: "text",
          helperText: "Default: 40%"
        },
        {
          id: "proposal",
          label: "Proposal Sent",
          placeholder: "60%",
          type: "text",
          helperText: "Default: 60%"
        },
        {
          id: "verbal",
          label: "Verbal Yes (commitment given)",
          placeholder: "80%",
          type: "text",
          helperText: "Default: 80%"
        }
      ]
    }
  ]}
/>

**How to use this:**

1. List every deal in your pipeline
2. Assign each deal to a stage
3. Multiply deal value × stage probability
4. Sum all weighted values = your forecast

**Example:**
- 10 Leads @ $5K each × 5% = $2,500
- 5 Engaged @ $5K each × 20% = $5,000
- 3 Meetings @ $5K each × 40% = $6,000
- 2 Proposals @ $5K each × 60% = $6,000
- 1 Verbal Yes @ $5K × 80% = $4,000

**Total forecast: $23,500**

### The Problem with Stage-Weighted Forecasting

It's better than nothing, but it has three fatal flaws for solo founders:

<FlipCard 
  front="Flaw #1: False Precision" 
  back="You're guessing at probabilities. Is a proposal really 60%? Or is it 40%? Or 75%? You won't know until you have 50+ deals of historical data." 
/>

<FlipCard 
  front="Flaw #2: Ignores Deal Quality" 
  back="Two 'Proposal Sent' deals can have wildly different close probabilities. One has a champion and budget. The other is a tire-kicker. Stage-weighting treats them the same." 
/>

<FlipCard 
  front="Flaw #3: Optimism Still Creeps In" 
  back="You'll unconsciously inflate your stage probabilities to make the forecast look better. 'Maybe proposals are 70%, not 60%...' And you're back to over-forecasting." 
/>

**When to use stage-weighted forecasting:**
- You have 6+ months of historical data to calibrate probabilities
- You have 20+ deals in pipeline at any given time
- You're tracking this in a CRM that auto-calculates weighted values

**When to use binary commit/upside instead:**
- You're a solo founder with &lt;20 deals in pipeline
- You don't have historical data yet
- You need accuracy NOW, not in 6 months

---

## Building Your Forecast Model

Let's build the actual spreadsheet you'll use every week.

<TemplateBuilder
  title="Monthly Forecast Model"
  persistKey="analytics-L4-forecast-model"
  sections={[
    {
      id: "commit",
      title: "Commit Deals",
      fields: [
        {
          id: "commit-deals",
          label: "List your Commit deals (name + value)",
          placeholder: "e.g., Acme Corp - $5,000\nWidgetCo - $3,500",
          type: "textarea",
          helperText: "Only include deals that pass all 5 Commit criteria"
        },
        {
          id: "commit-total",
          label: "Total Commit Value",
          placeholder: "Auto-calculated from above",
          type: "text",
          helperText: "This is your floor. You should hit at least this number."
        }
      ]
    },
    {
      id: "upside",
      title: "Upside Deals",
      fields: [
        {
          id: "upside-deals",
          label: "List your Upside deals (name + value)",
          placeholder: "e.g., BetaCo - $4,000\nGammaCorp - $2,500",
          type: "textarea",
          helperText: "Everything else in your pipeline"
        },
        {
          id: "upside-total",
          label: "Total Upside Value",
          placeholder: "Auto-calculated from above",
          type: "text",
          helperText: "Multiply this by 30% for your upside forecast"
        }
      ]
    },
    {
      id: "forecast",
      title: "Final Forecast",
      fields: [
        {
          id: "final-forecast",
          label: "Monthly Forecast",
          placeholder: "Commit + (Upside × 0.30)",
          type: "text",
          helperText: "This is what you should plan around"
        },
        {
          id: "stretch-forecast",
          label: "Stretch Forecast (if 50% of Upside closes)",
          placeholder: "Commit + (Upside × 0.50)",
          type: "text",
          helperText: "Your best-case scenario"
        }
      ]
    }
  ]}
/>

### How to Use This Model Weekly

Every Friday (or Monday), update your forecast:

1. **Review Commit deals** — Did any lose Commit status? (timeline slipped, blocker emerged, champion went dark) → Move to Upside
2. **Review Upside deals** — Did any gain Commit status? (got verbal yes, budget approved, timeline set) → Move to Commit
3. **Add new deals** — Classify as Commit or Upside from day one
4. **Remove dead deals** — If a deal has been in Upside for 60+ days with no movement, mark it dead and remove it

<InteractiveChecklist
  title="Weekly Forecast Update Checklist"
  persistKey="analytics-L4-weekly-update"
  items={[
    "Review each Commit deal: still passes all 5 criteria?",
    "Review each Upside deal: any movement toward Commit?",
    "Add any new deals from this week",
    "Remove deals that have been stalled 60+ days",
    "Calculate new forecast: Commit + (Upside × 30%)",
    "Compare to last week's forecast: what changed and why?"
  ]}
/>

---

## Forecast Accuracy Tracking

The model is only useful if you track how accurate it is. Here's how:

### Monthly Actuals vs Forecast

At the end of each month, record:

<ScenarioSimulator
  title="Forecast Accuracy Calculator"
  persistKey="analytics-L4-accuracy-sim"
  levers={[
    {
      id: "forecast",
      label: "Your forecast for the month",
      min: 0,
      max: 100000,
      step: 1000,
      defaultValue: 25000
    },
    {
      id: "actual",
      label: "Actual revenue closed",
      min: 0,
      max: 100000,
      step: 1000,
      defaultValue: 20000
    }
  ]}
  outputs={[
    {
      id: "accuracy",
      label: "Forecast accuracy",
      formula: "100 - (Math.abs(forecast - actual) / forecast * 100)",
      unit: "%",
      precision: 1
    },
    {
      id: "variance",
      label: "Variance",
      formula: "actual - forecast",
      unit: "$",
      precision: 0
    }
  ]}
  insight="Target: >70% accuracy. If you're consistently over-forecasting, lower your Upside multiplier from 30% to 20%. If you're consistently under-forecasting, raise it to 40%."
/>

After 3 months of tracking, you'll see patterns:

- **Consistently over-forecasting?** → Your Commit criteria are too loose, or your Upside multiplier is too high
- **Consistently under-forecasting?** → Your Commit criteria are too strict, or your Upside multiplier is too low
- **Wildly inconsistent?** → You're not updating the forecast weekly, or you're not classifying deals consistently

### Calibration Exercise

<ClassifyExercise
  title="Calibrate Your Forecast Model"
  persistKey="analytics-L4-calibrate"
  categories={[
    { id: "over", label: "Over-Forecasting", color: "#ef4444" },
    { id: "accurate", label: "Accurate", color: "#10b981" },
    { id: "under", label: "Under-Forecasting", color: "#3b82f6" }
  ]}
  items={[
    {
      id: "1",
      content: "Forecast: $30K | Actual: $18K",
      correctCategory: "over",
      explanation: "40% miss. You're counting too many Upside deals or being too optimistic about Commit."
    },
    {
      id: "2",
      content: "Forecast: $25K | Actual: $22K",
      correctCategory: "accurate",
      explanation: "88% accuracy. This is excellent. Keep doing what you're doing."
    },
    {
      id: "3",
      content: "Forecast: $20K | Actual: $28K",
      correctCategory: "under",
      explanation: "40% upside surprise. You're being too conservative. Raise your Upside multiplier."
    },
    {
      id: "4",
      content: "Forecast: $15K | Actual: $14.5K",
      correctCategory: "accurate",
      explanation: "97% accuracy. Nearly perfect."
    },
    {
      id: "5",
      content: "Forecast: $40K | Actual: $12K",
      correctCategory: "over",
      explanation: "70% miss. Your Commit criteria are broken. Deals you thought were certain fell through."
    }
  ]}
/>

---

## The Forecast Review Ritual

Forecasting isn't a one-time exercise. It's a weekly discipline.

### The 15-Minute Friday Forecast Review

<ProgressiveReveal title="Your Weekly Forecast Ritual" persistKey="analytics-L4-ritual-reveal">
<RevealSection title="Step 1: Update Deal Stages (5 min)">
Open your CRM or pipeline spreadsheet. For each deal:

- Did it move forward? (meeting scheduled, proposal sent, verbal yes received)
- Did it move backward? (timeline slipped, blocker emerged, champion went dark)
- Is it dead? (no response in 30+ days, explicit "no," went with competitor)

Update the stage for each deal.
</RevealSection>

<RevealSection title="Step 2: Reclassify Commit vs Upside (5 min)">
For each deal, ask the "$1,000 bet" question:

> Would I bet $1,000 of my own money that this closes in the next 30 days?

If yes → Commit. If no → Upside.

Move deals between buckets as needed.
</RevealSection>

<RevealSection title="Step 3: Calculate New Forecast (2 min)">
Sum your Commit deals. Sum your Upside deals. Calculate:

**Forecast = Commit + (Upside × 30%)**

Write this number down. This is what you're planning around for the next 30 days.
</RevealSection>

<RevealSection title="Step 4: Compare to Last Week (3 min)">
How did your forecast change from last week?

- **Forecast went up** → New deals added, or Upside moved to Commit. Good sign.
- **Forecast went down** → Deals fell out, or Commit moved to Upside. Warning sign.
- **Forecast stayed flat** → Pipeline is stagnant. You need more top-of-funnel activity.

Identify the single biggest change and note why it happened.
</RevealSection>
</ProgressiveReveal>

### Monthly Deep Dive

Once a month (first Friday of the month), add a 30-minute deep dive:

<InteractiveChecklist
  title="Monthly Forecast Deep Dive"
  persistKey="analytics-L4-monthly-review"
  items={[
    "Compare last month's forecast to actual revenue — calculate accuracy %",
    "Identify which Commit deals closed and which didn't — what was different?",
    "Identify which Upside deals closed — did they have common traits?",
    "Adjust your Upside multiplier if you're consistently over/under-forecasting",
    "Review your Commit criteria — are they too strict or too loose?",
    "Set a revenue target for next month based on current pipeline + expected new deals"
  ]}
/>

---

## Common Forecasting Mistakes (And How to Avoid Them)

<StrategyDuel
  title="Forecasting Approach Comparison"
  persistKey="analytics-L4-strategy-duel"
  scenario="You have $50K in Commit deals and $80K in Upside deals. What do you forecast?"
  strategyA={{
    name: "Optimistic Forecast",
    description: "Forecast $50K + ($80K × 50%) = $90K because 'I have a good feeling about these deals'",
    pros: ["Motivating", "Allows for bigger plans"],
    cons: ["Likely to miss by 30-40%", "Sets you up for disappointment", "Makes bad hiring/spending decisions"]
  }}
  strategyB={{
    name: "Conservative Forecast",
    description: "Forecast $50K + ($80K × 30%) = $74K and treat anything above that as upside surprise",
    pros: ["70-80% accuracy", "Protects against optimism bias", "Allows smart planning"],
    cons: ["Might feel 'pessimistic'", "Requires discipline"]
  }}
  expertVerdict="Strategy B wins. Forecasting is about accuracy, not motivation. You can be optimistic about your ability to execute while being realistic about what's actually going to close. The 30% Upside multiplier is calibrated from thousands of sales orgs. Trust the math."
/>

### Mistake #1: Counting Verbal Interest as Commitment

**The trap:** Prospect says "this looks great" or "I'm interested" and you mentally book the revenue.

**The fix:** Verbal interest is Upside at best. Until they say "yes, let's move forward" AND give you a timeline, it's not even close to Commit.

### Mistake #2: Not Removing Dead Deals

**The trap:** A deal has been in your pipeline for 90 days with no movement. You keep it in Upside "just in case."

**The fix:** If a deal has been stalled for 60+ days, it's dead. Remove it. Your forecast should only include deals with active momentum.

<PredictionGate
  question="What % of deals that stall for 60+ days eventually close?"
  persistKey="analytics-L4-predict-stalled"
  type="choice"
  choices={[
    { id: "a", text: "30-40%" },
    { id: "b", text: "10-20%" },
    { id: "c", text: "&lt;5%" }
  ]}
  correctId="c"
>
**Less than 5%** of deals that stall for 60+ days ever close. (CSO Insights)

If a deal goes dark for two months, it's dead. The prospect either went with a competitor, lost budget, or deprioritized the problem. Keeping it in your forecast is wishful thinking.

**Action:** Set a recurring monthly task to review all deals that haven't moved in 60+ days and mark them "Closed Lost."
</PredictionGate>

### Mistake #3: Inflating Upside Multiplier

**The trap:** You start at 30%, but after a few months you think "my deals are better than average" and raise it to 50% or 60%.

**The fix:** Only adjust your Upside multiplier based on **actual data**. Track forecast vs actual for 3+ months. If you're consistently under-forecasting by 20%, raise it to 40%. But don't adjust based on gut feel.

### Mistake #4: Not Updating Weekly

**The trap:** You build a forecast at the start of the month and don't touch it again until the end.

**The fix:** Deals change status constantly. A Commit deal can lose its champion. An Upside deal can get budget approval. Update your forecast every Friday so you always know where you stand.

---

## Your Forecast Model in Action

Let's walk through a real example:

<MiniRoleplay
  scenario="You're reviewing your pipeline on Friday. You have 8 deals. Classify each as Commit or Upside."
  role="You are the founder making classification decisions"
  persistKey="analytics-L4-roleplay-classify"
  modelResponse="Here's how I'd classify:

**Commit (3 deals, $14K total):**
1. **WidgetCo ($5K)** — Verbal yes received, contract sent, they said 'signing Monday'
2. **Acme Corp ($4K)** — Champion confirmed, budget approved, start date set for next month
3. **BetaCo ($5K)** — Paid deposit, onboarding scheduled

**Upside (5 deals, $22K total):**
4. **GammaCorp ($3K)** — Had demo, said 'looks good,' but no timeline or budget discussion
5. **DeltaInc ($5K)** — Proposal sent 2 weeks ago, no response yet
6. **EpsilonLLC ($4K)** — Meeting scheduled for next week, but haven't qualified budget
7. **ZetaCo ($6K)** — Said 'we're interested' but need to talk to their team first
8. **ThetaCorp ($4K)** — Engaged, asking good questions, but no champion identified yet

**Forecast:** $14K (Commit) + ($22K × 30%) = $14K + $6.6K = **$20.6K**

If 50% of Upside closes (stretch scenario): $14K + $11K = **$25K**"
/>

---

## Summary: Your Forecasting System

Here's what you're walking away with:

<InteractiveChecklist
  title="Your Forecast System Checklist"
  persistKey="analytics-L4-summary-actions"
  items={[
    "Understand the 5 Commit criteria: Champion, Budget, Timeline, Verbal Yes, No Blockers",
    "Apply the '$1,000 bet' test to every deal in your pipeline",
    "Build your Commit/Upside forecast model in a spreadsheet",
    "Set up a weekly Friday forecast review (15 minutes)",
    "Track monthly forecast vs actual to calibrate accuracy",
    "Remove deals that have been stalled 60+ days",
    "Adjust your Upside multiplier only after 3+ months of data"
  ]}
/>

**Next lesson:** We'll take this forecast and connect it to your unit economics (CAC, LTV, payback period) to answer the question: "Can I afford to grow at this rate?"

---

## Quiz: Test Your Forecasting Knowledge

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "A prospect says 'this looks great, send me a proposal.' How should you classify this deal?",
      "options": [
        "Commit — they asked for a proposal",
        "Upside — no timeline or budget confirmed",
        "Dead — they're just tire-kicking",
        "50/50 — weight it at 50% probability"
      ],
      "correctAnswer": 1,
      "explanation": "Asking for a proposal is progress, but it's not commitment. No timeline, no budget discussion, no verbal yes. This is Upside."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "You have $30K in Commit deals and $60K in Upside deals. What should you forecast?",
      "options": [
        "$90K (all deals will close)",
        "$30K (only count Commit)",
        "$48K (Commit + Upside × 30%)",
        "$60K (Commit + Upside × 50%)"
      ],
      "correctAnswer": 2,
      "explanation": "$30K + ($60K × 30%) = $48K. This is the binary commit/upside formula."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "A deal has been in your pipeline for 75 days with no movement. What should you do?",
      "options": [
        "Keep it in Upside — it might still close",
        "Move it to Commit — it's been there a while",
        "Mark it Closed Lost and remove it",
        "Send one more follow-up email"
      ],
      "correctAnswer": 2,
      "explanation": "Deals stalled 60+ days have &lt;5% close rate. Remove it from your forecast. You can still send a follow-up, but don't count it in your numbers."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "Your forecast accuracy for the last 3 months: 55%, 62%, 58%. What should you do?",
      "options": [
        "Nothing — this is good enough",
        "Lower your Upside multiplier to 20%",
        "Raise your Upside multiplier to 40%",
        "Tighten your Commit criteria"
      ],
      "correctAnswer": 0,
      "explanation": "55-62% accuracy is below the 70% target, but you need more data before adjusting. Track for 3 more months. If the pattern continues, then tighten Commit criteria or lower Upside multiplier."
    },
    {
      "id": "q5",
      "type": "true-false",
      "question": "True or False: A deal with a verbal yes, timeline set, and budget approved should be classified as Commit even if you haven't identified a champion.",
      "correctAnswer": false,
      "explanation": "False. All 5 criteria must be met for Commit. No champion = no one internally pushing for this. It's Upside until you have a champion."
    }
  ]
}