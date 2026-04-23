---
title: "Automation Tools: Zapier vs Make vs n8n vs Trigger.dev"
duration: "50 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 1
---

You're spending 5-7 hours per week on sales activities. At least 2 of those hours are on tasks a machine could do in seconds.

Logging a new lead from a form into your CRM. Creating a follow-up task after a meeting. Sending yourself a Slack message when a deal changes stages. Reminding yourself to follow up when a prospect hasn't replied in 3 days.

**This is automation's job. Not yours.**

But before you can build automations, you need to pick the right platform. And right now, there are four serious options for solo founders — each with different tradeoffs on cost, power, and learning curve.

By the end of this lesson, you'll know exactly which tool fits your situation and why.

---

## Why Automation Matters for Solo Founders

Before the comparison, let's be clear about what you're buying.

<InsightCard icon="⏰" title="The Time Math">
The 5 core automations you'll build in this course (Lead Catcher, Meeting Logger, Follow-Up Reminder, Contract Chaser, Deal Notifications) save 15-25 hours per month when running. At a conservative $50/hour effective rate, that's $750-$1,250 of recovered time every month. Even a $50/month automation platform pays for itself 15x over.
</InsightCard>

That's the ROI case. But automation also prevents the problem that costs founders more than time: **things falling through the cracks**.

Prospects who replied and never got a response. Contracts that sat unsigned for 3 weeks while you forgot to follow up. New leads who didn't hear from you for 6 hours because you were in meetings.

Automation doesn't just save time. It plugs revenue leaks.

<RangeSlider
  label="How many hours per week are you spending on tasks a machine could do?"
  min={0}
  max={20}
  lowLabel="Very few"
  highLabel="Half my week"
  persistKey="automation-L1-time-estimate"
/>

---

## The Four Players: An Honest Overview

Here's the landscape without the marketing spin:

<SlideNavigation>
<Slide title="Zapier: The Easiest Starting Point">

Zapier built the no-code automation category. It has 7,000+ app integrations — more than anyone else — and the simplest trigger-action model you'll find.

**How it works:** Choose a trigger (e.g., "New Typeform submission"). Add actions (e.g., "Create HubSpot contact," then "Send Slack message"). Done. No code, no logic gates, no visual diagrams.

**Pricing:**
- Free: 100 tasks/month, 5 single-step Zaps
- Starter: $19.99/month — 750 tasks, multi-step Zaps, filters
- Professional: $49/month — 2,000 tasks, paths/conditional logic

**The catch:** Task consumption. Each step in a Zap consumes one task. A 5-step Zap that runs 100 times = 500 tasks. At Starter level (750 tasks), you get headroom for about 100-150 automation runs per month at 5 steps each.

**Best for:** Founders who want things working in 10 minutes. Maximum integrations with minimum friction.

</Slide>

<Slide title="Make: More Power at Lower Cost">

Make (formerly Integromat) uses a visual scenario builder — you see the entire flow as a diagram with modules connected by data paths. More complex to learn than Zapier, but dramatically more powerful and cheaper per operation.

**How it works:** Drag modules onto a canvas. Connect them with arrows. Add routers, filters, and iterators to handle branching logic. Data flows visually from left to right.

**Pricing:**
- Free: 1,000 operations/month, 2 active scenarios
- Core: $10.59/month — 10,000 operations/month
- Pro: $18.82/month — 10,000 operations + advanced features

**The advantage:** Operations are counted differently from Zapier tasks. A 5-step scenario that runs 100 times = 500 operations. At Core ($10.59), you get 10,000 operations — roughly 2,000 automation runs at 5 steps each. That's 2.7x more volume than Zapier Starter at half the price.

**Best for:** Founders who need complex branching logic (if/else, loops, aggregators) at lower cost. Worth the slightly steeper learning curve.

</Slide>

<Slide title="n8n: Free If You Host It">

n8n is open-source workflow automation. You can self-host it on a $5-10/month VPS (DigitalOcean, Vultr, Hetzner) and run unlimited workflows for free. If you don't want to self-host, the cloud version is $24/month for 2,500 executions.

**How it works:** Visual workflow editor similar to Make. 400+ built-in integrations. Full code access — you can write JavaScript inside any node. Can run sub-workflows. Supports webhooks, cron jobs, and complex logic.

**Pricing:**
- Self-hosted: Free (+ $5-10/month for VPS)
- Cloud: $24/month for 2,500 executions

**The technical requirement:** Self-hosting requires comfort with servers, Docker or npm, and basic Linux commands. It's a 1-2 hour setup, not a 10-minute one. But once running, it's zero ongoing automation cost.

**Best for:** Technical founders who want full control, unlimited workflows, and no per-operation costs. Also ideal if you want to add custom JavaScript logic to any automation step.

</Slide>

<Slide title="Trigger.dev: For Developers Only">

Trigger.dev is code-first, event-driven automation built for developers. You write TypeScript jobs that run in the cloud, triggered by webhooks, schedules, or API events. It's not a drag-and-drop tool — it's a background job runner with a friendly developer experience.

**How it works:** You define jobs in code with `client.defineJob()`. Jobs have triggers (webhooks, schedules, HTTP events) and run server-side. The Trigger.dev dashboard shows job runs, logs, and failures.

**Pricing:**
- Free: 10,000 runs/month
- Pro: $25/month

**The technical requirement:** TypeScript/JavaScript. You need to write code. There is no UI for building automations.

**Best for:** Technical founders who want to express automation logic that can't fit in no-code tools. Complex conditional logic, database queries, AI API calls mid-flow.

</Slide>
</SlideNavigation>

---

## Head-to-Head Comparison

<ComparisonBuilder
  title="Platform Comparison: Zapier vs Make for the 5 Core Automations"
  persistKey="automation-L1-compare"
  prompt="Based on the comparison above, which platform would you choose for your solo founder automation stack and why?"
  expertExample="I'd choose Make at the Core tier ($10.59/month) for three reasons: (1) 10,000 operations gives me 10x the headroom of Zapier Starter at half the price, (2) the visual scenario builder helps me debug flows when they break, and (3) complex scenarios like the Reply Routing flow (with conditional branching based on reply sentiment) are easier to build in Make than Zapier. I'd use Zapier only if I needed a specific integration that Make doesn't support."
  criteria={["Cost per automation run", "Ease of building complex branching logic", "Number of app integrations", "Debugging and error visibility", "Long-term scalability within $100/month budget"]}
/>

---

## The Decision Framework

Stop overthinking. Here's a decision tree that handles 95% of solo founder situations:

<DecisionTree
  title="Which Automation Platform Is Right for You?"
  persistKey="automation-L1-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "Are you comfortable writing code (JavaScript/TypeScript)?",
      choices: [
        { label: "Yes — I write code regularly", nextNodeId: "developer" },
        { label: "No — I prefer visual tools", nextNodeId: "no_code" }
      ]
    },
    {
      id: "developer",
      content: "Do you need complete custom logic, database queries, or AI API calls mid-flow?",
      choices: [
        { label: "Yes — complex custom logic is required", nextNodeId: "trigger_dev" },
        { label: "No — standard trigger/action with some customization", nextNodeId: "n8n" }
      ]
    },
    {
      id: "trigger_dev",
      content: "Use Trigger.dev. Free tier (10K runs/month) covers all 5 core automations easily. Write TypeScript jobs with full flexibility. Best choice for pure developers who want their automations to feel like code.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "n8n",
      content: "Use n8n. Self-host on a $5-10/month VPS for unlimited workflows at near-zero cost. 400+ integrations, full JavaScript access in any node. Takes 1-2 hours to set up, saves forever after.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "no_code",
      content: "Do you need complex branching logic (if prospect replied with negative → unsubscribe, if positive → create priority task)?",
      choices: [
        { label: "Yes — my flows have multiple branches", nextNodeId: "make" },
        { label: "No — mostly linear trigger → action flows", nextNodeId: "budget" }
      ]
    },
    {
      id: "make",
      content: "Use Make at Core tier ($10.59/month). Visual scenario builder handles complex routing with routers, filters, and aggregators. 10K operations/month is plenty for all 5 core automations plus reply routing.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "budget",
      content: "Is maximum app coverage more important than cost optimization?",
      choices: [
        { label: "Yes — I use many different tools", nextNodeId: "zapier" },
        { label: "No — I use standard tools (HubSpot/Pipedrive + Calendly + Slack)", nextNodeId: "make_simple" }
      ]
    },
    {
      id: "zapier",
      content: "Use Zapier Starter ($19.99/month). 7,000+ integrations covers almost any tool. 750 tasks/month handles all 5 core automations at moderate volume. Easiest to get started quickly.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "make_simple",
      content: "Use Make Free or Core. Free tier (1,000 ops/month) is enough to test all 5 automations. Core ($10.59/month) scales comfortably as volume grows. Better value than Zapier if you use standard tools.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

---

## Real Cost Calculation: What Will You Actually Spend?

The pricing pages tell you task/operation limits. But what does that mean for your actual automation stack?

<ScenarioSimulator
  title="Monthly Automation Cost Estimator"
  persistKey="automation-L1-cost-sim"
  levers={[
    { id: "leads_month", label: "New leads per month", min: 5, max: 100, step: 5, defaultValue: 20 },
    { id: "meetings_month", label: "Meetings per month", min: 2, max: 30, step: 2, defaultValue: 8 },
    { id: "active_deals", label: "Active deals in pipeline", min: 5, max: 50, step: 5, defaultValue: 15 },
    { id: "steps_per_flow", label: "Average steps per automation", min: 3, max: 8, step: 1, defaultValue: 5 }
  ]}
  outputs={[
    { id: "monthly_ops", label: "Estimated monthly operations", formula: "(leads_month + meetings_month + active_deals * 2) * steps_per_flow", unit: "ops", precision: 0 },
    { id: "zapier_tasks", label: "Zapier tasks consumed", formula: "(leads_month + meetings_month + active_deals * 2) * steps_per_flow", unit: "tasks", precision: 0 },
    { id: "make_ops_pct", label: "Make Free tier utilization (%)", formula: "((leads_month + meetings_month + active_deals * 2) * steps_per_flow) / 10", unit: "%", precision: 0 }
  ]}
  insight="At `{monthly_ops}` operations per month, you're well within Make Core (10K ops). Zapier Starter (750 tasks) handles this too. If your Make Free tier utilization hits `{make_ops_pct}`%, upgrade to Make Core at $10.59/month."
/>

<InsightCard icon="💡" title="The Practical Budget Reality">
For most solo founders running all 5 core automations at moderate volume (20-50 leads/month, 8-15 meetings/month, 10-20 active deals), the total automation platform cost is $10-20/month on Make or Zapier Starter. You stay comfortably under the $100/month budget with room for growth.
</InsightCard>

---

## CRM-Native Automations: Use These First

Before paying for a third-party platform, check what your CRM already does for free.

<FlipCard
  front="HubSpot Free Automations"
  back="HubSpot Free includes deal stage automation (e.g., 'When deal moves to Proposal, send owner a task'). No multi-step workflows — those require Starter ($15/month). Good for: stage-change notifications and simple task creation."
/>

<FlipCard
  front="Pipedrive Automations"
  back="All Pipedrive plans include automations (Essential plan at $14/month includes 30 active automations). Supports triggers based on deal stage changes, contact creation, and activity completion. Covers many of the 5 core automations natively."
/>

<FlipCard
  front="Attio Automations"
  back="Attio's automation system (available on Pro plan, $34/month/seat) supports trigger-action workflows with filters. Good native coverage for lead routing and deal stage updates. Zapier integration available on free plan."
/>

<ExampleCard label="Case Study: The CRM-First Approach">
Rachel used Pipedrive's native automations (included in her $14/month Essential plan) to handle three of the five core automations without any additional tools:

1. **Meeting Logger**: Pipedrive auto-logs Calendly events and creates follow-up activities via Zapier (1 Zap, minimal tasks)
2. **Deal Notifications**: Pipedrive's native automations send her a Slack message when a deal changes stages (built-in, zero additional cost)
3. **Follow-Up Reminder**: Pipedrive creates tasks 3 and 7 days after deal creation if no activity logged (native automation, free)

She only needed Zapier for the Lead Catcher (form → CRM) and Contract Chaser. Her total automation cost: $14/month (Pipedrive) + $0 (Zapier free tier for 2 single-step Zaps).

**Total: $14/month for a complete automation stack.**
</ExampleCard>

---

## The Integration Quality Question

All automation platforms claim to integrate with everything. The reality is more nuanced.

<SwipeDecision
  title="Which Platform Would You Use?"
  description="For each scenario, pick the automation platform that fits best."
  optionA="Zapier"
  optionB="Make"
  persistKey="automation-L1-swipe"
  cards={[
    {
      id: "1",
      content: "You want to connect Typeform → HubSpot → Slack in 15 minutes. You've never used automation tools before.",
      correctOption: "a",
      explanation: "Zapier wins for speed. The three-step Zap takes 10-15 minutes to configure with Zapier's guided setup. No visual diagram needed."
    },
    {
      id: "2",
      content: "You want to route replies differently based on sentiment: positive replies → priority task, negative replies → unsubscribe + CRM update, out-of-office → reschedule task.",
      correctOption: "b",
      explanation: "Make wins for branching logic. The router module handles three-way conditional routing cleanly. This would require Zapier Paths (professional tier, $49/month) but is available in Make Core ($10.59/month)."
    },
    {
      id: "3",
      content: "You use an obscure industry-specific CRM that doesn't have a Make integration but has a Zapier integration.",
      correctOption: "a",
      explanation: "Zapier wins when you need a specific integration that Make doesn't support. Zapier's 7,000+ integration library is the decisive differentiator for niche tool support."
    },
    {
      id: "4",
      content: "You need to process 500 leads per month through a 5-step automation on a $20/month budget.",
      correctOption: "b",
      explanation: "Make wins on volume economics. 500 leads × 5 steps = 2,500 operations. Make Core ($10.59/month) includes 10,000 operations. Zapier Starter ($19.99/month) only includes 750 tasks — you'd exceed that limit."
    }
  ]}
/>

---

## Picking Your Platform and Committing

The worst outcome is platform paralysis — spending 3 weeks comparing tools while your automations sit unbuilt.

Here's the rule: **pick one platform this week and build your first automation by Sunday**.

<TemplateBuilder
  title="My Automation Platform Decision"
  persistKey="automation-L1-platform-decision"
  sections={[
    {
      id: "choice",
      title: "My Platform Choice",
      fields: [
        {
          id: "platform",
          label: "Platform I'm choosing",
          placeholder: "e.g., Make Core at $10.59/month",
          type: "text"
        },
        {
          id: "reason",
          label: "Primary reason for this choice",
          placeholder: "e.g., Best cost/operation ratio for my volume, and I need branching logic for reply routing",
          type: "textarea"
        }
      ]
    },
    {
      id: "setup",
      title: "My Setup Plan",
      fields: [
        {
          id: "crm",
          label: "CRM I'm automating",
          placeholder: "e.g., HubSpot Free",
          type: "text"
        },
        {
          id: "tools",
          label: "Other tools in my stack (calendar, forms, Slack)",
          placeholder: "e.g., Calendly, Typeform, Slack",
          type: "text"
        },
        {
          id: "first_automation",
          label: "First automation I'll build (Lesson 2: Lead Catcher)",
          placeholder: "e.g., Typeform → HubSpot contact creation → Slack notification",
          type: "textarea"
        }
      ]
    },
    {
      id: "budget",
      title: "My Monthly Budget",
      fields: [
        {
          id: "platform_cost",
          label: "Platform cost per month",
          placeholder: "e.g., $10.59/month (Make Core)",
          type: "text"
        },
        {
          id: "remaining",
          label: "Remaining budget for other automation tools",
          placeholder: "e.g., $89.41 remaining from $100 budget",
          type: "text"
        }
      ]
    }
  ]}
/>

---

## Your Action Items

<InteractiveChecklist
  title="Lesson 1 Action Items"
  persistKey="automation-L1-actions"
  items={[
    "Run the decision tree above and identify your platform",
    "Create an account on your chosen platform (Zapier, Make, n8n, or Trigger.dev)",
    "Connect your CRM as the first integration — verify the connection works",
    "Audit your CRM's native automations — list which of the 5 core automations it can handle natively",
    "Calculate your estimated monthly operation volume using the simulator above",
    "Complete your Platform Decision template above",
    "Read Lesson 2 to build your first automation: the Lead Catcher"
  ]}
/>

---

## What's Next

In **Lesson 2**, you'll build the Lead Catcher: the automation that captures new leads from any source (form, Calendly, email reply) and creates a CRM contact, sets the lead source, and notifies you via Slack — all in under 30 seconds.

By the end of Lesson 2, no lead will ever fall through the cracks again.

---

## Quiz: Automation Platform Basics

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Which platform offers the most app integrations?",
      "options": ["Make", "n8n", "Zapier", "Trigger.dev"],
      "correctAnswer": 2,
      "explanation": "Zapier has 7,000+ integrations — the most of any platform. This is its primary advantage over Make (1,500+) and n8n (400+)."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "A 5-step Zapier Zap runs 200 times per month. How many tasks does this consume?",
      "options": ["200", "500", "1,000", "5"],
      "correctAnswer": 2,
      "explanation": "Each step in a Zap consumes one task. 5 steps × 200 runs = 1,000 tasks. Zapier Starter allows 750 tasks/month — you'd need to upgrade to Professional ($49/month) or switch to Make."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "Which platform is free to run if you self-host on a VPS?",
      "options": ["Zapier", "Make", "n8n", "Trigger.dev"],
      "correctAnswer": 2,
      "explanation": "n8n is open-source and free to self-host. A $5-10/month VPS (DigitalOcean, Vultr, Hetzner) runs n8n with unlimited workflows."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "Trigger.dev is the best choice for non-technical founders who want automations running in 10 minutes.",
      "correctAnswer": false,
      "explanation": "False. Trigger.dev requires TypeScript code — it's for developers only. Non-technical founders should start with Zapier (easiest) or Make (more powerful)."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "Make Core costs $10.59/month and includes 10,000 operations. Zapier Starter costs $19.99/month and includes 750 tasks. At 5 steps per automation run, how many times can each platform run automations per month?",
      "options": [
        "Make: 2,000 runs. Zapier: 150 runs.",
        "Make: 1,000 runs. Zapier: 750 runs.",
        "Make: 10,000 runs. Zapier: 750 runs.",
        "Make: 2,000 runs. Zapier: 750 runs."
      ],
      "correctAnswer": 0,
      "explanation": "Make: 10,000 ops ÷ 5 steps = 2,000 runs. Zapier: 750 tasks ÷ 5 steps = 150 runs. Make gives you 13x more automation runs at half the price."
    }
  ]
}
```
