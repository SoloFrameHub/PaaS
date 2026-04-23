---
title: "Automation 5: Deal Notifications (Slack/Email Alerts)"
duration: "45 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 6
---

You're in a discovery call. The prospect is interested. You wrap up, promise to send a proposal by end of day, and dive back into work.

Three hours later, you check your CRM. The deal is still sitting in "Discovery" stage. You forgot to move it. You forgot to create the proposal task. And you definitely forgot to send that Slack message to your co-founder about the $15K opportunity.

**This is the notification gap.**

Most solo founders live in 3-5 tools simultaneously: email, calendar, CRM, Slack, and whatever they're building. Critical deal events happen in the CRM, but you're not sitting there refreshing it every 10 minutes.

The solution? **Bring the CRM to you.** When something important happens, it should tap you on the shoulder — via Slack, email, or even SMS — with all the context you need to act immediately.

This lesson covers the fifth and final core automation: **Deal Notifications**. You'll learn which events deserve real-time alerts, how to design notifications that don't create fatigue, and how to wire them up so you never miss a critical moment again.

---

## The Notification Paradox

<InsightCard icon="🔔" title="The Notification Paradox">
The more notifications you receive, the less you pay attention to any single one. The goal isn't "notify everything" — it's "notify what matters, when it matters."
</InsightCard>

Here's the challenge: your CRM tracks dozens of events every day. Leads created. Emails opened. Stages changed. Tasks completed. Notes added. If you get a Slack ping for every single one, you'll mute the channel within a week.

The art of deal notifications is **priority routing**:

- **High-priority events** → Real-time Slack/email with rich formatting
- **Medium-priority events** → Daily digest email at 6pm
- **Low-priority events** → Weekly summary or no notification at all

<RangeSlider 
  label="How often do you currently check your CRM?" 
  min={1} 
  max={20} 
  lowLabel="Once a day" 
  highLabel="Every 30 minutes" 
  persistKey="automation-L6-crm-frequency" 
/>

If you answered "1-3 times per day," you're missing critical windows. A lead submits a form at 10am. You check the CRM at 2pm. That's a 4-hour response delay — enough for them to book a call with a competitor.

Notifications close that gap. The lead submits the form → Slack pings you within 30 seconds → You reply within 5 minutes → You're the first responder.

---

## The 5 Essential Notifications

Not all CRM events are created equal. Here are the five that every solo founder should wire up first:

<SlideNavigation>
<Slide title="1. New High-Score Lead">

**Trigger:** Lead Catcher creates a new contact with ICP fit score ≥7

**Why it matters:** High-fit leads are rare. When one appears, you want to know immediately — not 4 hours later when you check the CRM.

**Notification format:**
```
🎯 New High-Score Lead: Sarah Chen (Score: 8/10)
Company: DataPulse (Series A SaaS, 50 employees)
Source: Website form
Pain: "Struggling with churn prediction"
👉 View in CRM | Add to Sequence
```

**Channel:** Slack (real-time) + optional SMS for scores ≥9

</Slide>

<Slide title="2. Deal Won">

**Trigger:** Deal stage moves to "Closed Won"

**Why it matters:** Celebration + immediate onboarding kickoff. This is the moment to send the welcome email, create onboarding tasks, and notify your team (if you have one).

**Notification format:**
```
🎉 Deal Won: $12,000 Annual Contract
Customer: Acme Corp
Close Date: Feb 24, 2026
Next Step: Send onboarding email within 24 hours
👉 View Deal | Start Onboarding
```

**Channel:** Slack (real-time) with confetti emoji + email summary

**Bonus:** This notification is pure dopamine. It reinforces the sales habit and keeps you motivated during dry spells.

</Slide>

<Slide title="3. Deal Lost">

**Trigger:** Deal stage moves to "Closed Lost"

**Why it matters:** Every loss is a learning opportunity. The notification should prompt you to log the loss reason and schedule a post-mortem.

**Notification format:**
```
❌ Deal Lost: Acme Corp ($8,000)
Stage: Proposal
Loss Reason: [Click to add]
Days in Pipeline: 23
👉 Log Loss Reason | Schedule Post-Mortem
```

**Channel:** Slack (real-time) + weekly loss summary email

**Action:** The notification should create a task: "Log loss reason and identify improvement" due within 24 hours.

</Slide>

<Slide title="4. Deal Stage Changed">

**Trigger:** Any deal moves from one stage to another (except Won/Lost, which have dedicated notifications)

**Why it matters:** Stage changes indicate momentum. "Discovery → Proposal" means you need to send the proposal. "Proposal → Negotiation" means they're engaged.

**Notification format:**
```
📊 Stage Change: Acme Corp
Old Stage: Discovery
New Stage: Proposal
Deal Value: $8,000
Next Action: Send proposal by EOD
👉 View Deal
```

**Channel:** Daily digest email (batched) unless deal value >$10K (then real-time Slack)

</Slide>

<Slide title="5. High-Value Deal Enters Pipeline">

**Trigger:** New deal created with value ≥$10,000 (or your threshold)

**Why it matters:** Big deals deserve extra attention from day one. You want to know immediately so you can prioritize research and outreach.

**Notification format:**
```
💰 High-Value Deal Created: $15,000
Company: DataPulse
Contact: Sarah Chen
Source: Referral from Mike
Stage: Discovery
👉 View Deal | Research Company
```

**Channel:** Slack (real-time) + optional SMS for deals ≥$25K

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Which notifications do you need?" 
  persistKey="automation-L6-notification-needs" 
  items={[
    "New high-score lead (≥7)",
    "Deal won",
    "Deal lost",
    "Deal stage changed (high-value only)",
    "High-value deal enters pipeline"
  ]} 
/>

---

## Notification Design: Rich vs. Plain

A plain notification looks like this:

```
New lead: Sarah Chen
```

A **rich notification** looks like this:

```
🎯 New High-Score Lead: Sarah Chen (Score: 8/10)
Company: DataPulse (Series A SaaS, 50 employees)
Source: Website form
Pain: "Struggling with churn prediction"
👉 View in CRM | Add to Sequence
```

The difference? **Actionable context.** The rich notification tells you:
- **Who** (name + company)
- **Why it matters** (score, company size, funding stage)
- **What they need** (pain point)
- **What to do next** (view in CRM, add to sequence)

All without opening the CRM.

<FlipCard 
  front="Why use Slack blocks instead of plain text?" 
  back="Slack blocks support formatting (bold, links, buttons), color-coding (green for won, red for lost), and interactive elements (one-click actions). Plain text notifications get ignored." 
/>

### Slack Block Example (Deal Won)

Here's what a Slack block notification looks like in Zapier or Make:

```json
{
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🎉 Deal Won: $12,000 Annual Contract"
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*Customer:*\nAcme Corp"
        },
        {
          "type": "mrkdwn",
          "text": "*Close Date:*\nFeb 24, 2026"
        }
      ]
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Next Step:* Send onboarding email within 24 hours"
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "View Deal"
        },
        "url": "https://crm.com/deals/12345"
      }
    }
  ]
}
```

Don't worry — Zapier and Make have visual Slack block builders. You don't need to write JSON by hand.

<ExampleCard label="Case Study: The $40K Deal That Almost Slipped">

Mark runs a B2B SaaS consultancy. He had a $40K deal sitting in "Proposal" stage for 9 days. No notification. No reminder. He only noticed when he ran his weekly pipeline review.

By then, the prospect had signed with a competitor.

After wiring up deal notifications, Mark got a Slack ping on Day 3: "Proposal for Acme Corp hasn't been signed yet. Follow up today?"

He called. The prospect had questions about implementation. Mark answered them. The deal closed 2 days later.

**The notification saved the deal.**

</ExampleCard>

---

## Preventing Notification Fatigue

<InsightCard icon="⚠️" title="The 20-Alert Threshold">
Research shows notification fatigue sets in above 20 alerts per day. Beyond that, people start ignoring or muting channels.
</InsightCard>

Here's how to stay under the threshold:

### 1. Use Priority Routing

Not every event deserves real-time Slack. Use this matrix:

<ComparisonBuilder
  title="Notification Priority Matrix"
  persistKey="automation-L6-priority-matrix"
  prompt="Classify these CRM events by priority"
  expertExample="High: New lead (score ≥7), Deal won, Deal lost, High-value deal created. Medium: Stage change (>$5K deals). Low: Email opened, task completed, note added."
  criteria={[
    "High-priority events get real-time Slack",
    "Medium-priority events get daily digest",
    "Low-priority events get weekly summary or no notification"
  ]}
/>

### 2. Batch Low-Priority Events

Instead of 15 separate "Email opened" notifications, send one daily digest at 6pm:

```
📧 Email Activity Summary (Feb 24)
- 12 emails opened
- 3 links clicked
- 2 replies received
👉 View Full Report
```

### 3. Use Conditional Logic

Only notify if the event meets specific criteria:

- New lead → Only if score ≥7
- Stage change → Only if deal value ≥$5,000
- Email opened → Only if opened 3+ times (high intent signal)

<TemplateBuilder
  title="Your Notification Rules"
  persistKey="automation-L6-notification-rules"
  sections={[
    {
      id: "high-priority",
      title: "High-Priority (Real-Time Slack)",
      fields: [
        { 
          id: "lead-threshold", 
          label: "New lead score threshold", 
          placeholder: "e.g., ≥7", 
          type: "text" 
        },
        { 
          id: "deal-threshold", 
          label: "High-value deal threshold", 
          placeholder: "e.g., ≥$10,000", 
          type: "text" 
        }
      ]
    },
    {
      id: "medium-priority",
      title: "Medium-Priority (Daily Digest)",
      fields: [
        { 
          id: "stage-change", 
          label: "Stage change notification rule", 
          placeholder: "e.g., Only for deals >$5K", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "low-priority",
      title: "Low-Priority (Weekly Summary or None)",
      fields: [
        { 
          id: "email-activity", 
          label: "Email activity notification rule", 
          placeholder: "e.g., Weekly summary only", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## Building Your First Notification (Guided Build)

Let's wire up the most important notification: **New High-Score Lead**.

### Step 1: Choose Your Notification Channel

<ClassifyExercise
  title="Which channel for which notification?"
  persistKey="automation-L6-channel-classify"
  categories={[
    { id: "slack", label: "Slack (Real-Time)", color: "#4A154B" },
    { id: "email", label: "Email Digest", color: "#EA4335" },
    { id: "sms", label: "SMS (Emergency Only)", color: "#34A853" }
  ]}
  items={[
    { 
      id: "1", 
      content: "New lead with score ≥9", 
      correctCategory: "slack" 
    },
    { 
      id: "2", 
      content: "Email opened (no reply)", 
      correctCategory: "email" 
    },
    { 
      id: "3", 
      content: "Deal won (>$50K)", 
      correctCategory: "slack" 
    },
    { 
      id: "4", 
      content: "Task completed", 
      correctCategory: "email" 
    },
    { 
      id: "5", 
      content: "Critical deal at risk (no activity in 14 days, value >$25K)", 
      correctCategory: "sms" 
    }
  ]}
/>

### Step 2: Set Up the Trigger

In Zapier or Make:

1. **Trigger:** CRM contact created (or Lead Catcher automation completes)
2. **Filter:** Only continue if `icp_fit_score ≥ 7`
3. **Action:** Send Slack message to #sales channel

### Step 3: Design the Notification

Use Slack's Block Kit Builder (https://api.slack.com/block-kit) to design the message visually, then copy the JSON into Zapier/Make.

**Required fields:**
- Lead name
- Company name
- ICP fit score
- Lead source
- Primary pain point (from form or enrichment)
- Direct CRM link
- One-click action button ("Add to Sequence")

<RewriteExercise
  title="Rewrite This Generic Notification"
  persistKey="automation-L6-notification-rewrite"
  original="New lead: Sarah Chen from DataPulse"
  hint="Add score, source, pain point, and CRM link"
  expertRewrite="🎯 New High-Score Lead: Sarah Chen (Score: 8/10)\nCompany: DataPulse (Series A SaaS, 50 employees)\nSource: Website form\nPain: 'Struggling with churn prediction'\n👉 View in CRM | Add to Sequence"
  criteria={[
    "Includes ICP fit score",
    "Shows lead source",
    "Highlights pain point",
    "Provides direct CRM link",
    "Suggests next action"
  ]}
/>

### Step 4: Test the Notification

Create a test lead in your CRM with score ≥7. Verify:
- ✅ Slack notification appears within 30 seconds
- ✅ All fields populate correctly
- ✅ CRM link works
- ✅ Action button works (if applicable)

<InteractiveChecklist 
  title="Notification Testing Checklist" 
  persistKey="automation-L6-testing-checklist" 
  items={[
    "Create test lead with score ≥7",
    "Verify Slack notification appears",
    "Check all fields populate correctly",
    "Test CRM link",
    "Test action button (if applicable)",
    "Verify notification doesn't trigger for score &lt;7"
  ]} 
/>

---

## Multi-Channel Notifications: When to Use What

<StrategyDuel
  title="Slack vs. Email vs. SMS"
  persistKey="automation-L6-channel-duel"
  scenario="You have a $20K deal that just moved to 'Proposal' stage. How should you be notified?"
  strategyA={{
    name: "Real-Time Slack",
    description: "Instant Slack message with deal details and next action",
    pros: ["Immediate awareness", "Rich formatting", "One-click CRM access"],
    cons: ["Can be disruptive if you're in deep work", "Requires Slack to be open"]
  }}
  strategyB={{
    name: "Daily Email Digest",
    description: "Batched with other stage changes in 6pm email",
    pros: ["Less disruptive", "Batch processing mindset", "Email is always accessible"],
    cons: ["Delayed awareness (up to 24 hours)", "Less urgency", "Easy to ignore"]
  }}
  expertVerdict="For high-value deals (≥$10K), use real-time Slack. For smaller deals, batch into daily digest. The $20K deal deserves immediate attention."
/>

### Channel Decision Matrix

| Event Type | Deal Value | Channel | Timing |
|-----------|-----------|---------|--------|
| New high-score lead | Any | Slack | Real-time |
| Deal won | Any | Slack + Email | Real-time |
| Deal lost | Any | Slack | Real-time |
| Stage change | &lt;$5K | Email | Daily digest |
| Stage change | $5K-$10K | Slack | Real-time |
| Stage change | >$10K | Slack + SMS | Real-time |
| Email opened | Any | Email | Weekly summary |
| Task completed | Any | None | No notification |

<RangeSlider 
  label="What's your high-value deal threshold?" 
  min={1000} 
  max={50000} 
  step={1000}
  lowLabel="$1K" 
  highLabel="$50K" 
  persistKey="automation-L6-deal-threshold" 
/>

---

## Advanced: Interactive Notifications (Slack Buttons)

Slack supports **interactive buttons** that trigger actions without opening the CRM.

Example: "Add to Sequence" button on a new lead notification.

When clicked, the button:
1. Triggers a Zapier webhook
2. Adds the contact to your outreach sequence (Instantly, Smartlead, etc.)
3. Updates the Slack message: "✅ Added to Sequence: Cold Outreach v3"

This requires:
- Zapier webhook trigger
- Slack interactive message configuration
- CRM/outreach tool API integration

**Is it worth it?** For high-volume lead flow (10+ leads/day), yes. For low volume (1-2 leads/day), the manual click to open CRM is fine.

<PredictionGate
  question="What happens if you add interactive buttons to every notification?"
  persistKey="automation-L6-button-predict"
  type="choice"
  choices={[
    { id: "a", text: "Saves tons of time" },
    { id: "b", text: "Creates accidental clicks and errors" },
    { id: "c", text: "Requires complex webhook setup that breaks often" }
  ]}
  correctId="b"
>

**Answer: B (and a bit of C).**

Interactive buttons are powerful but risky. Accidental clicks can add the wrong lead to a sequence or mark a deal as won prematurely.

**Best practice:** Use buttons only for low-risk actions ("View in CRM," "Snooze for 1 hour"). For high-risk actions ("Add to sequence," "Mark as won"), require a manual CRM visit.

</PredictionGate>

---

## Notification Monitoring: Are They Working?

Once your notifications are live, track:

1. **Notification volume:** How many per day? (Should be &lt;20 for solo founders)
2. **Response time:** How long from notification to action? (Goal: &lt;1 hour for high-priority)
3. **False positives:** Notifications that didn't require action (tune your filters)
4. **Missed events:** Critical events that didn't trigger a notification (add new rules)

<ScenarioSimulator
  title="Notification Volume Calculator"
  persistKey="automation-L6-volume-simulator"
  levers={[
    { 
      id: "leads", 
      label: "New leads per week", 
      min: 0, 
      max: 50, 
      step: 5, 
      defaultValue: 10 
    },
    { 
      id: "scoreThreshold", 
      label: "Score threshold for notification", 
      min: 5, 
      max: 10, 
      step: 1, 
      defaultValue: 7 
    },
    { 
      id: "deals", 
      label: "Active deals", 
      min: 0, 
      max: 50, 
      step: 5, 
      defaultValue: 15 
    },
    { 
      id: "stageChanges", 
      label: "Stage changes per week", 
      min: 0, 
      max: 20, 
      step: 2, 
      defaultValue: 8 
    }
  ]}
  outputs={[
    { 
      id: "weeklyNotifications", 
      label: "Notifications per week", 
      formula: "(leads * (11 - scoreThreshold) / 10) + stageChanges + (deals * 0.1)", 
      unit: "", 
      precision: 0 
    },
    { 
      id: "dailyNotifications", 
      label: "Notifications per day", 
      formula: "weeklyNotifications / 7", 
      unit: "", 
      precision: 1 
    }
  ]}
  insight="At {dailyNotifications} notifications/day, you're {dailyNotifications > 20 ? 'above' : 'below'} the fatigue threshold. {dailyNotifications > 20 ? 'Increase your score threshold or batch more events into digests.' : 'You have room to add more real-time notifications if needed.'}"
/>

---

## Team Notifications (Future-Proofing)

Right now, you're a solo founder. All notifications go to you.

But when you hire (Course 45: Building Your First Sales Team), these same automations scale to team channels:

- **#sales-leads** → New high-score leads
- **#sales-wins** → Deal won celebrations
- **#sales-losses** → Deal lost post-mortems
- **#sales-pipeline** → Stage changes and high-value deals

The automation doesn't change. Only the recipient does.

<ContextualNote 
  showWhen={{ founderType: "technical" }} 
  variant="personalized" 
  title="For Technical Founders"
>

If you're comfortable with webhooks and APIs, consider building a custom notification router:

1. CRM event → Webhook to your server
2. Server logic: route based on event type, deal value, and team member assignment
3. Send to appropriate Slack channel or individual DM

This gives you full control over routing logic and avoids Zapier task consumption for high-volume events.

Tools: n8n (self-hosted), Trigger.dev (code-first), or a simple Express.js server on Railway/Render.

</ContextualNote>

---

## Your Notification Blueprint

<InteractiveChecklist 
  title="Build Your Notification System" 
  persistKey="automation-L6-build-checklist" 
  items={[
    "Choose notification channel (Slack, email, or both)",
    "Set up 'New High-Score Lead' notification (score ≥7)",
    "Set up 'Deal Won' notification with celebration format",
    "Set up 'Deal Lost' notification with loss reason prompt",
    "Configure 'High-Value Deal' notification (≥$10K)",
    "Set up daily digest for medium-priority events",
    "Test all notifications with sample CRM data",
    "Monitor notification volume for 1 week and adjust thresholds"
  ]} 
/>

---

## Summary: The Notification Mindset

Notifications aren't about **seeing everything**. They're about **seeing what matters, when it matters**.

The goal is to:
- ✅ Respond to high-intent leads within 5 minutes
- ✅ Celebrate wins immediately (dopamine reinforcement)
- ✅ Learn from losses within 24 hours
- ✅ Never let a high-value deal slip through the cracks
- ✅ Stay under 20 notifications/day to avoid fatigue

When done right, notifications turn your CRM from a **place you visit** into a **system that taps you on the shoulder** at exactly the right moment.

Next lesson: **Wiring Reply Detection → CRM → Tasks** — the automation that ensures no prospect reply goes unanswered.

---

## Quiz: Notification Design

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What's the primary risk of notifying every CRM event in real-time?",
      "options": [
        "It costs too much in Zapier tasks",
        "It creates notification fatigue and you start ignoring all alerts",
        "It slows down your CRM",
        "It violates GDPR"
      ],
      "correctAnswer": 1,
      "explanation": "Notification fatigue sets in above 20 alerts/day. When everything is urgent, nothing is urgent."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Which event should trigger a real-time Slack notification?",
      "options": [
        "Email opened (no reply)",
        "Task completed",
        "New lead with ICP fit score = 9",
        "Note added to CRM contact"
      ],
      "correctAnswer": 2,
      "explanation": "High-score leads (≥7) deserve immediate attention. Email opens and task completions can be batched into daily digests."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "What's the benefit of using Slack blocks instead of plain text notifications?",
      "options": [
        "They're easier to set up",
        "They support rich formatting, color-coding, and interactive buttons",
        "They consume fewer Zapier tasks",
        "They work without an internet connection"
      ],
      "correctAnswer": 1,
      "explanation": "Slack blocks support formatting, colors, and buttons — making notifications actionable without opening the CRM."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "When should you use SMS notifications?",
      "options": [
        "For every new lead",
        "For all deal stage changes",
        "Only for critical, high-value events (e.g., $25K+ deal at risk)",
        "Never — email and Slack are enough"
      ],
      "correctAnswer": 2,
      "explanation": "SMS is for emergencies only. Overuse creates fatigue and costs money. Reserve it for critical, high-value events."
    },
    {
      "id": "q5",
      "type": "true-false",
      "question": "True or False: You should add interactive 'Mark as Won' buttons to all deal notifications to save time.",
      "correctAnswer": false,
      "explanation": "False. Interactive buttons for high-risk actions (like marking deals as won) can lead to accidental clicks. Use buttons only for low-risk actions like 'View in CRM.'"
    }
  ]
}