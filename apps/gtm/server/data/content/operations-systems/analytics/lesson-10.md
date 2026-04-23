---
title: "Your Analytics Playbook"
duration: "45 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 10
---

You've spent nine lessons building the analytics infrastructure most founders never create. You have a funnel dashboard, a velocity tracker, a commit/upside forecast model, a unit economics calculator, an MRR waterfall, a channel attribution system, a dashboard tool, and a weekly review ritual.

Now it's time to put it all together.

This final lesson has three jobs: verify you've actually built what you set out to build, install the 7-day sprint that activates everything, and show you how analytics and automation connect so your system keeps improving.

**Let's make sure your analytics engine is live.**

---

## Step 1: The Complete Analytics Stack Audit

Before you can call yourself an analytics-driven founder, you need to verify that all nine lesson artifacts are in place.

<InsightCard icon="📊" title="Why the Audit Matters">
Most founders complete lessons but don't complete implementations. The audit forces you to distinguish between "I understand this concept" and "I have this live and running." Understanding is worthless. A live dashboard is a competitive advantage.
</InsightCard>

Run through each artifact now:

<InteractiveChecklist
  title="Analytics Artifact Audit"
  persistKey="analytics-L10-audit"
  items={[
    "Metrics Philosophy Map (L1): 3 questions mapped to specific metrics with data sources and review cadence",
    "Funnel Dashboard (L2): Leads → Meetings → Proposals → Wins with conversion % at each stage",
    "Pipeline Velocity Tracker (L3): Average days per stage tracked, total cycle length trend visible",
    "Forecast Model (L4): Commit vs upside classification + stage-weighted probabilities configured",
    "Unit Economics Calculator (L5): CAC, LTV, payback period, and LTV:CAC ratio calculated by channel",
    "MRR Waterfall Dashboard (L6): New, expansion, contraction, churned MRR tracked monthly",
    "Channel Attribution Tracker (L7): Lead source tracked on every deal, channel ROI calculated",
    "Dashboard Tool Live (L8): Google Sheets, CRM dashboards, or Metabase configured and connected to CRM",
    "Weekly Review Ritual (L9): Fixed day/time scheduled, agenda documented, first review completed"
  ]}
/>

If you have 9 of 9 checked, you've built something most $10M+ companies don't have. If you're missing items, use the 7-day sprint below to close the gaps.

---

## The 7-Day Analytics Sprint

Whether you're starting fresh or filling gaps, this sprint installs your complete analytics system in one focused week.

<SlideNavigation>
<Slide title="Day 1: Dashboard Tool Setup">

**Goal:** Your dashboard tool is live and connected to your CRM.

**Actions:**
1. Choose your tool: Google Sheets (free), HubSpot Dashboards (free if using HubSpot), Pipedrive Insights (included), or Metabase (free self-hosted)
2. Create a new dashboard or spreadsheet titled "Sales Analytics — [Your Name]"
3. Connect to your CRM data source (export CSV or use native integration)
4. Verify you can see deal data flowing into the dashboard

**Time:** 60-90 minutes

**Output:** Dashboard tool configured and populated with at least 30 days of CRM data.

</Slide>

<Slide title="Day 2: Funnel Dashboard">

**Goal:** Live funnel showing Leads → Meetings → Proposals → Wins with conversion rates.

**Actions:**
1. Count deals at each pipeline stage in your CRM right now
2. Calculate conversion rate at each transition (L2 formulas apply)
3. Build the funnel visualization (bar chart in Sheets, or CRM report)
4. Compare your conversion rates against the benchmarks from L2

**Benchmarks:** MQL→SQL: 20-30%. SQL→Meeting: 40-60%. Meeting→Proposal: 30-50%. Proposal→Won: 20-40%.

**Time:** 45-60 minutes

**Output:** Funnel dashboard with live data and benchmark comparison.

</Slide>

<Slide title="Day 3: Velocity Tracking">

**Goal:** Average days per stage calculated, total sales cycle length tracked.

**Actions:**
1. Pull "date entered" and "date exited" for each stage from your CRM (most CRMs track this)
2. Calculate average days per stage across your last 20+ deals
3. Add velocity tracking to your dashboard
4. Flag any current deals exceeding 2x the average stage duration

**Time:** 45-60 minutes

**Output:** Velocity tracker showing average days per stage and current stale deals.

</Slide>

<Slide title="Day 4: Forecast Model">

**Goal:** Commit/upside forecast configured with stage-weighted probabilities.

**Actions:**
1. Open your CRM pipeline
2. Apply the "$1,000 bet" test to every deal — classify as Commit or Upside
3. Add stage probabilities (Lead 5%, Contacted 10%, Engaged 20%, Meeting 40%, Proposal 60%, Verbal Yes 80%)
4. Calculate your commit total and upside total for this month

**Time:** 30-45 minutes

**Output:** This month's forecast: Commit = $X, Upside = $Y, Weighted Total = $Z.

</Slide>

<Slide title="Day 5: Unit Economics">

**Goal:** CAC, LTV, payback period, and LTV:CAC calculated by channel.

**Actions:**
1. Add up all acquisition costs for the last 90 days (tools + ads + time × hourly rate)
2. Divide by number of new customers — that's your blended CAC
3. Calculate LTV: ARPU / monthly churn rate (or average project value × repeat rate)
4. Calculate payback: CAC / monthly revenue per customer
5. Break down CAC by channel if you have attribution data

**Time:** 60-90 minutes

**Output:** Unit economics dashboard with CAC, LTV, payback, and LTV:CAC by channel.

</Slide>

<Slide title="Day 6: MRR Waterfall and Attribution">

**Goal:** MRR waterfall live, channel attribution on every deal.

**Actions:**
1. Log last month's MRR waterfall: Starting MRR + New - Contraction - Churn = Ending MRR
2. Calculate NRR for last month
3. Audit your CRM: does every deal have a lead source?
4. Calculate revenue by channel (if you have 3+ months of data)

**Time:** 45-60 minutes

**Output:** MRR waterfall for last 3 months, channel attribution for last 90 days.

</Slide>

<Slide title="Day 7: First Friday Review">

**Goal:** Run your first complete 30-minute Friday review using the full dashboard.

**Agenda:**
1. Funnel snapshot (5 min): volume and conversion at each stage
2. Velocity check (5 min): any deals stuck >2x average stage duration?
3. Forecast update (5 min): commit total, upside total, any changes?
4. Channel check (5 min): which source produced the most meetings this week?
5. Action items (10 min): 3 specific actions for next week

**This is your first real test.** If something's missing, note it and add it.

**Time:** 30-45 minutes

**Output:** Completed Friday review with 3 action items documented.

</Slide>
</SlideNavigation>

---

## The Analytics → Automation Handoff

Your analytics system doesn't just measure what's happening — it tells you *what to automate next*.

<InsightCard icon="🔗" title="The Analytics-Automation Loop">
Measure → Identify bottleneck → Automate the fix → Measure improvement. This is the loop that separates founders who grow from founders who plateau. Analytics without automation is diagnosis without treatment.
</InsightCard>

Here's how each analytics insight maps to a Course 42 automation:

<FlipCard
  front="Bottleneck: Slow follow-up after outreach (high drop-off at Contacted stage)"
  back="Automation fix: Follow-Up Reminder chain (Day 3/7/14). Build in Lesson 4 of Course 42. Automates task creation when no reply detected after outreach. Expected improvement: 20-30% more replies."
/>

<FlipCard
  front="Bottleneck: Meetings not logged in CRM (velocity data is incomplete)"
  back="Automation fix: Meeting Logger. Build in Lesson 3 of Course 42. Auto-logs every Calendly/Google Calendar event to CRM as activity. Expected improvement: 100% meeting capture rate."
/>

<FlipCard
  front="Bottleneck: Proposals sitting unsigned >14 days (proposal→won conversion below benchmark)"
  back="Automation fix: Contract Chaser. Build in Lesson 5 of Course 42. Auto-creates reminders at Day 3, 7, and 14 after proposal sent. Expected improvement: 15-25% faster close rates."
/>

<FlipCard
  front="Bottleneck: New leads not entered in CRM (funnel data incomplete)"
  back="Automation fix: Lead Catcher. Build in Lesson 2 of Course 42. Auto-creates CRM contact from every form submission, Calendly booking, and outreach reply. Expected improvement: 100% lead capture."
/>

<ExampleCard label="Case Study: The Analytics-First Automation Path">
Daniel ran his analytics sprint and discovered two things: his meeting-to-proposal conversion was 22% (below the 30-50% benchmark), and 40% of his meetings never appeared in his CRM.

He built the Meeting Logger automation from Course 42. Within 30 days, he had 100% meeting capture and could see the actual bottleneck: he wasn't sending proposals within 7 days of meetings.

He built a Contract Chaser automation that reminded him to send proposals within 24 hours of each meeting.

Six weeks later, his meeting-to-proposal conversion hit 41% — a 90% improvement — and his sales cycle shortened from 47 days to 31 days.

**The analytics told him what was broken. The automations fixed it.**
</ExampleCard>

---

## The 90-Day Improvement Targets

Having a dashboard isn't enough. You need specific targets and a structured improvement plan.

<TemplateBuilder
  title="Your 90-Day Analytics Improvement Plan"
  persistKey="analytics-L10-improvement-plan"
  sections={[
    {
      id: "baseline",
      title: "Your Baseline (Today)",
      fields: [
        {
          id: "funnel",
          label: "Weakest funnel stage conversion rate",
          placeholder: "e.g., Meeting→Proposal: 18% (benchmark: 30-50%)",
          type: "text"
        },
        {
          id: "velocity",
          label: "Current total sales cycle length",
          placeholder: "e.g., 52 days (SMB target: 20-45 days)",
          type: "text"
        },
        {
          id: "cac",
          label: "Current blended CAC",
          placeholder: "e.g., $840 across all channels",
          type: "text"
        },
        {
          id: "payback",
          label: "Current CAC payback period",
          placeholder: "e.g., 8 months (bootstrapped target: 1-3 months)",
          type: "text"
        }
      ]
    },
    {
      id: "targets",
      title: "Your 90-Day Targets",
      fields: [
        {
          id: "funnel_target",
          label: "Target improvement for weakest funnel stage",
          placeholder: "e.g., Improve Meeting→Proposal from 18% to 30%",
          type: "text"
        },
        {
          id: "velocity_target",
          label: "Target sales cycle reduction",
          placeholder: "e.g., Reduce from 52 days to 38 days",
          type: "text"
        },
        {
          id: "cac_target",
          label: "Target CAC reduction",
          placeholder: "e.g., Reduce blended CAC from $840 to $600 via channel optimization",
          type: "text"
        }
      ]
    },
    {
      id: "actions",
      title: "Your Top 3 Actions",
      fields: [
        {
          id: "action1",
          label: "Action 1 (implement this week)",
          placeholder: "e.g., Build Meeting Logger automation to capture 100% of meetings",
          type: "textarea"
        },
        {
          id: "action2",
          label: "Action 2 (implement week 2-3)",
          placeholder: "e.g., Kill LinkedIn as a channel (CAC 3x higher than email)",
          type: "textarea"
        },
        {
          id: "action3",
          label: "Action 3 (implement week 4-6)",
          placeholder: "e.g., Build Contract Chaser automation to reduce Proposal→Won cycle time",
          type: "textarea"
        }
      ]
    }
  ]}
/>

---

## The Continuous Improvement Loop

Analytics is not a one-time project. It's a discipline. Here's the loop that keeps your system improving:

<ProgressiveReveal title="The Four-Stage Improvement Loop" persistKey="analytics-L10-loop">

<RevealSection title="Stage 1: Measure">

**What:** Run your weekly Friday review and monthly deep dive.

**How:** Using the dashboard you built in Lessons 2-8 and the ritual from Lesson 9.

**When:** Every Friday (30 min) and first Friday of each month (60 min).

**Output:** Clear picture of what's working and what's broken.

</RevealSection>

<RevealSection title="Stage 2: Identify Bottleneck">

**What:** Find the single metric furthest from its benchmark.

**How:** Compare your funnel conversion rates, velocity numbers, and unit economics against the benchmarks from each lesson.

**Rule:** Fix one bottleneck at a time. Don't try to improve everything simultaneously.

**Output:** One clearly identified bottleneck with a hypothesis for the root cause.

</RevealSection>

<RevealSection title="Stage 3: Hypothesis and Test">

**What:** Form a specific, testable hypothesis and run a 4-week test.

**How:** "I believe [specific change] will improve [specific metric] by [specific amount] within [timeframe]."

**Example:** "I believe adding a live demo before every proposal will improve Meeting→Proposal conversion from 22% to 35% within 60 days."

**Output:** A documented test with clear success criteria.

</RevealSection>

<RevealSection title="Stage 4: Measure Again">

**What:** After 4-6 weeks, did the metric improve?

**How:** Compare the metric before and after the change.

**Rule:** Only test one variable at a time. If you change messaging AND add demos simultaneously, you won't know which worked.

**Output:** Confirmed improvement (double down) or failed test (new hypothesis).

</RevealSection>

</ProgressiveReveal>

<ScenarioSimulator
  title="Revenue Growth Simulator"
  persistKey="analytics-L10-simulator"
  levers={[
    { id: "funnel_conversion", label: "Proposal→Won Conversion Rate (%)", min: 10, max: 50, step: 5, defaultValue: 25 },
    { id: "velocity_days", label: "Average Sales Cycle (days)", min: 15, max: 90, step: 5, defaultValue: 45 },
    { id: "deal_size", label: "Average Deal Size ($)", min: 500, max: 10000, step: 500, defaultValue: 3000 },
    { id: "proposals_month", label: "Proposals Sent Per Month", min: 2, max: 20, step: 1, defaultValue: 6 }
  ]}
  outputs={[
    { id: "monthly_revenue", label: "Monthly Revenue from Closings", formula: "(funnel_conversion / 100) * proposals_month * deal_size", unit: "$", precision: 0 },
    { id: "annual_run_rate", label: "Annual Run Rate", formula: "(funnel_conversion / 100) * proposals_month * deal_size * 12", unit: "$", precision: 0 },
    { id: "deals_per_month", label: "Deals Closed Per Month", formula: "(funnel_conversion / 100) * proposals_month", unit: "", precision: 1 }
  ]}
  insight="At `{monthly_revenue}`/month, small improvements compound fast. A 10% lift in proposal conversion adds `{deals_per_month}` deals/month — focus on your weakest metric first."
/>

---

## The AI Analytics Future

You've built a manually-reviewed analytics system. What comes next?

<InsightCard icon="🤖" title="Where Analytics Is Heading">
The next evolution is AI that answers "Why did we lose 3 deals this week?" from your CRM data. It reads meeting notes, email threads, stage durations, and deal sizes — then surfaces root causes you'd miss in a manual review.

This requires the AI-ready CRM schema from Course 40. If you built it, you're ready. If you skipped Course 40's structured fields, that's your next project.
</InsightCard>

The analytics stack you've built in this course feeds directly into Course 27 (Building Custom AI Sales Agents). Your dashboards become the source of truth that AI agents read to prioritize outreach, identify at-risk deals, and draft personalized follow-ups.

**The groundwork you laid here is the infrastructure for your AI sales layer.**

---

## The "Earn the Right to Complexity" Rule

One final principle before you finish the course:

<ConceptReframe
  concept="Adding More Metrics"
  defaultLens="technical-founder"
  lenses={[
    {
      id: "technical-founder",
      label: "Technical Founder View",
      explanation: "The instinct is to instrument everything. Build a real-time dashboard with 40 metrics. Connect every API. Create custom reports for every possible question. This feels productive. It produces noise."
    },
    {
      id: "operator",
      label: "Operator View",
      explanation: "Add metrics only when you've acted on every metric you already have for 8+ weeks. Each new metric must earn its place by changing a decision. The 5-metric dashboard that you actually review weekly beats the 30-metric dashboard you glance at monthly."
    },
    {
      id: "coach",
      label: "Coach View",
      explanation: "Ask: what decision would this metric change? If you can't name a specific decision, don't add the metric. Complexity is a coping mechanism for founders who want to feel data-driven without having to act on what the data says."
    }
  ]}
/>

---

## Your Completion Assessment

You've spent this course learning nine frameworks. Let's verify you can apply the most critical ones:

<TimedChallenge
  title="Analytics Speed Round"
  persistKey="analytics-L10-timed"
  timeLimit={90}
  items={[
    {
      id: "1",
      prompt: "Your Meeting→Proposal conversion is 15%. The benchmark is 30-50%. What does this indicate?",
      correctAnswer: "discovery or demo weakness",
      explanation: "Low Meeting→Proposal conversion indicates a discovery or demo problem — you're having meetings but not compelling prospects enough to see the proposal as valuable."
    },
    {
      id: "2",
      prompt: "What is the formula for Pipeline Velocity?",
      correctAnswer: "opportunities times win rate times deal size divided by cycle length",
      explanation: "V = (N × W × D) / L — opportunities, win rate, average deal size, divided by average cycle length in days."
    },
    {
      id: "3",
      prompt: "A deal has verbal yes confirmed, budget approved, and timeline set. Is it Commit or Upside?",
      correctAnswer: "commit",
      explanation: "Commit deals have champion confirmed, budget approved, timeline set, and verbal yes received with no unresolved blockers. This meets all criteria."
    },
    {
      id: "4",
      prompt: "Your bootstrapped CAC payback is 8 months. Is this on target?",
      correctAnswer: "no",
      explanation: "Bootstrapped founders need 1-3 month payback for cash flow survival. 8 months is acceptable for seed-funded companies. 8 months bootstrapped = cash flow crisis."
    }
  ]}
/>

---

## What You've Built

Across 10 lessons, you've created a complete analytics infrastructure:

<PredictionGate
  question="What percentage of $1M+ ARR companies have all 9 of these analytics artifacts in place?"
  persistKey="analytics-L10-predict"
  type="choice"
  choices={[
    { id: "a", text: "Most — analytics is table stakes above $1M ARR" },
    { id: "b", text: "About half — many companies rely on gut feel even at scale" },
    { id: "c", text: "A small minority — complete analytics stacks are rarer than you think" }
  ]}
  correctId="c"
>

**The answer: C — and it's not close.**

Studies consistently show that fewer than 20% of B2B companies have complete analytics visibility across funnel conversion, pipeline velocity, unit economics, and channel attribution simultaneously.

Most companies have *some* dashboards. Very few have *all* of them working together with a consistent weekly review ritual.

You now have what most $5M+ ARR companies don't. Use it.

</PredictionGate>

---

## Your Final Action Items

<InteractiveChecklist
  title="Your Analytics Playbook Launch Checklist"
  persistKey="analytics-L10-actions"
  items={[
    "Complete the 9-artifact audit above — identify any gaps",
    "Run the 7-day sprint to close any gaps (or validate everything is live)",
    "Define your 90-day improvement targets in the template above",
    "Schedule your first monthly deep dive (first Friday of next month, 60 min)",
    "Identify your single biggest funnel bottleneck and form a hypothesis to fix it",
    "Connect your analytics findings to Course 42 automations — what should you automate first?",
    "Share your weekly metrics with one accountability partner or community"
  ]}
/>

---

## Congratulations: You're an Analytics Architect

You started this course not knowing which 5 metrics to track. You're finishing it with a complete analytics stack: funnel dashboard, velocity tracker, forecast model, unit economics calculator, MRR waterfall, channel attribution, a dashboard tool, and a weekly review ritual.

More importantly, you have the **discipline** — a fixed weekly ritual that turns data into decisions.

**In Course 42 (Sales Automation)**, you'll automate the manual parts of your sales process: lead capture, meeting logging, follow-up reminders, contract chasing, and reply routing. Your analytics will tell you which automations to build first.

See you there.

---

## Quiz: The Analytics Playbook

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "In the analytics → automation loop, what does analytics tell you?",
      "options": [
        "How to build Zapier automations",
        "Which bottlenecks to prioritize for automation",
        "How to reduce your automation budget",
        "When to switch CRM tools"
      ],
      "correctAnswer": 1,
      "explanation": "Analytics identifies bottlenecks. Automation fixes them. The loop: Measure → Identify bottleneck → Automate fix → Measure improvement."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "How long should you test a hypothesis before drawing conclusions?",
      "options": [
        "1-2 weeks",
        "4-6 weeks",
        "6 months",
        "1 year"
      ],
      "correctAnswer": 1,
      "explanation": "4-6 weeks provides enough data to see trends without waiting so long that you miss the window to course-correct. 1-2 weeks is noise; 6+ months is too slow."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "You should test multiple variables simultaneously to find improvements faster.",
      "correctAnswer": false,
      "explanation": "False. Test one variable at a time. If you change messaging AND add demos simultaneously, you won't know which change drove the improvement."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "When should you add a new metric to your dashboard?",
      "options": [
        "Whenever you find an interesting data source",
        "After consistently acting on all existing metrics for 8+ weeks",
        "Monthly, to keep your dashboard fresh",
        "Only when investors request it"
      ],
      "correctAnswer": 1,
      "explanation": "Earn the right to complexity. Only add metrics when you've acted on everything you already track for 8+ weeks. Each new metric must change a decision."
    }
  ]
}
```
