---
title: "Automation 3: Follow-Up Reminder (Day 3/7/14 Chain)"
duration: "50 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 4
---

You sent outreach to 30 prospects last week. One replied immediately. The other 29 are silent.

Statistically, 80% of sales require 5+ follow-ups to close. But 44% of salespeople give up after the first attempt.

As a solo founder managing 20-50 active conversations simultaneously, the problem isn't willingness — it's memory. You can't hold 29 follow-up schedules in your head while running your business.

The Follow-Up Reminder chain solves this. It creates tasks at Day 3, Day 7, and Day 14 after your outreach — automatically stopping when a prospect replies or advances in your pipeline. Nothing falls through the cracks. Nothing gets abandoned too early.

---

## Why 80% of Deals Require 5+ Follow-Ups

This statistic deserves a moment of reflection.

<InsightCard icon="📈" title="The Follow-Up Math">
If 80% of sales require 5+ follow-ups, and 44% of salespeople give up after 1 follow-up, then nearly half of salespeople are abandoning 80% of their potential deals.

The math: if your outreach generates 20% response rate on follow-up 1, Day 3 follow-up generates another 15%, Day 7 adds another 12%, and Day 14 adds another 8% — you're leaving 35% of your replies on the table by not following up past day 1.
</InsightCard>

The reason most founders don't follow up isn't laziness. It's that manual follow-up tracking is cognitively exhausting at scale. When you're managing 30+ conversations, you can't track which ones need a Day 7 follow-up this Thursday while also writing new outreach and preparing for today's discovery call.

The Follow-Up Reminder chain removes the cognitive load. You still write the follow-up — but the system tells you exactly who, when, and with what context.

<RangeSlider
  label="How many active conversations are you currently tracking (prospects who haven't said no yet)?"
  min={0}
  max={100}
  lowLabel="None"
  highLabel="100+"
  persistKey="automation-L4-conversations"
/>

---

## The Day 3/7/14 Cadence

The three follow-up points are chosen deliberately based on research into reply timing:

<SlideNavigation>
<Slide title="Day 3: The Quick Check-In">

**Why Day 3?** Inboxes move fast. Your original email is 3 days old. A brief check-in at this point has a 2-3x higher open rate than the original — because it appears above the original, giving a second chance at attention without feeling pushy.

**Tone:** Brief, low-pressure. You're not apologizing for following up. You're adding a tiny bit of value or simply making it easy to respond.

**Template:**
> Subject: Re: [Original subject line]
>
> Just following up on my note from [day of week]. Happy to hop on a quick 15-min call if easier than email — [Calendly link].

**What the automation does:** Creates a task: "Day 3 follow-up — [Name]" due today. You review the contact's history in CRM, personalize the template, and send.

</Slide>

<Slide title="Day 7: The Value Add">

**Why Day 7?** A week has passed. If they were interested but busy, this is the right moment to re-engage with something new — not just another check-in. The Day 7 email should add value: a relevant case study, a trigger event you noticed, or a different framing of your offer.

**Tone:** Slightly more specific. Reference something you noticed about them or their company.

**Template:**
> Subject: Quick thought on [their company/industry]
>
> I was reading about [industry trend / trigger event] and thought of our conversation.
>
> Given that [their situation], this might be relevant: [one-sentence insight or resource].
>
> Still happy to chat if the timing is right — [Calendly link].

**What the automation does:** Creates a task: "Day 7 follow-up — [Name]" due today. You personalize with the trigger event or resource.

</Slide>

<Slide title="Day 14: The Break-Up Email">

**Why Day 14?** If 14 days have passed with no reply, one of three things is true: (1) they're not interested, (2) they're too busy and need permission to say no, or (3) this is genuinely bad timing.

The break-up email gives them permission to say "not now" — which paradoxically often generates replies because it removes pressure.

**Tone:** Low-pressure, respectful closure with an open door.

**Template:**
> Subject: Closing the loop
>
> I'll assume the timing isn't right and close the loop here.
>
> If things change — especially around [specific trigger, e.g., 'Q2 budget opens up' or 'your team grows past 10 people'] — feel free to reach out. I'll be here.
>
> Wishing you well.

**What the automation does:** Creates a task: "Day 14 break-up email — [Name]" due today. After sending, mark the deal as "Lost — Timing" in your CRM. This keeps your pipeline clean.

</Slide>
</SlideNavigation>

---

## The Stop Conditions: When to Kill the Chain

The most important part of the Follow-Up Reminder chain is knowing when to stop.

<InsightCard icon="🛑" title="Stop Conditions Are Non-Negotiable">
A follow-up chain without stop conditions is harassment automation. If a prospect replies "not interested" and your automation keeps creating follow-up tasks, you've built a system that damages your reputation and wastes your time.

Build the stop conditions before you go live.
</InsightCard>

The four stop conditions:

<DecisionTree
  title="Should the Follow-Up Chain Continue?"
  persistKey="automation-L4-stop-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "A contact is in the follow-up chain. Before creating the next task, check:",
      choices: [
        { label: "Has the prospect replied since the last outreach?", nextNodeId: "replied" },
        { label: "No reply detected — continue checking", nextNodeId: "stage" }
      ]
    },
    {
      id: "replied",
      content: "STOP the chain. Reply detected. Move to reply routing (Lesson 7). If positive reply: advance deal stage. If negative: update CRM to Lost and remove from chain. Do NOT send follow-up tasks when a reply exists.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "stage",
      content: "Has the deal stage advanced beyond 'Contacted' (to Engaged, Meeting, Proposal, etc.)?",
      choices: [
        { label: "Yes — deal has advanced", nextNodeId: "advanced" },
        { label: "No — still in Contacted stage", nextNodeId: "lost" }
      ]
    },
    {
      id: "advanced",
      content: "STOP the chain. Stage advancement means contact is active. Follow-up reminders are no longer needed — the relationship has progressed.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "lost",
      content: "Is the deal marked as Lost or Closed Lost?",
      choices: [
        { label: "Yes — marked lost", nextNodeId: "stop_lost" },
        { label: "No — still open", nextNodeId: "pause" }
      ]
    },
    {
      id: "stop_lost",
      content: "STOP the chain. Never follow up on deals marked Lost. If you want to re-engage later, do it manually with a personalized message.",
      isTerminal: true,
      outcome: "negative"
    },
    {
      id: "pause",
      content: "Is a 'Pause Follow-Up' flag set manually by you?",
      choices: [
        { label: "Yes — manually paused", nextNodeId: "stop_paused" },
        { label: "No — no pause flag", nextNodeId: "continue" }
      ]
    },
    {
      id: "stop_paused",
      content: "STOP the chain. You've manually flagged this contact to pause follow-up (e.g., they asked you to check back in 60 days). Respect the flag.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "continue",
      content: "CONTINUE the chain. No stop conditions met. Create the next follow-up task (Day 3, 7, or 14 depending on where in the chain you are).",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

---

## Building the Day 3/7/14 Chain

Here's how to implement the chain in Zapier and Make:

<ProgressiveReveal title="Technical Implementation Guide" persistKey="automation-L4-build">

<RevealSection title="Zapier Implementation (Starter+ Required)">

The Follow-Up Reminder chain requires multi-step Zaps with Delay steps, which require Zapier Starter ($19.99/month) or higher.

**Step 1: Trigger**
- Trigger: HubSpot "New Contact in List" (create a "Recently Contacted" list) or "Deal Stage Changed to Contacted"
- Alternative: Trigger on CRM task completion (when outreach email is logged as an activity)

**Step 2: Delay Until Day 3**
- Add "Delay" step
- Type: "Delay For"
- Duration: 3 days

**Step 3: Check for Stop Conditions**
- Add "HubSpot — Get Contact" step: pull the latest contact data
- Add "Filter" step: continue only if (last_reply_date is empty OR before trigger date) AND deal_stage = "Contacted" AND deal_status ≠ "Lost"

**Step 4: Create Day 3 Task**
- Add "HubSpot — Create Task" step
- Subject: "Day 3 follow-up: `{{Contact Name}}`"
- Due date: Today
- Associate with contact and deal

**Step 5: Repeat for Day 7 and Day 14**
- Add another "Delay For" step: 4 more days (total = 7)
- Add same filter check
- Create Day 7 task
- Add another "Delay For": 7 more days (total = 14)
- Add same filter check
- Create Day 14 task

**Limitation:** Long-running Zaps (2 weeks) can sometimes time out or fail to resume after delays. Monitor the first 30 days closely.

</RevealSection>

<RevealSection title="Make Implementation (Core+ Recommended)">

Make handles time-delayed scenarios more reliably than Zapier for long chains.

**Scenario 1: Chain Initiator**
- Trigger: HubSpot "Watch Events" → Deal stage changed to "Contacted"
- Action: Make API — Schedule three webhook calls at +3 days, +7 days, +14 days using Make's built-in scheduling

**Alternative: Three Separate Scenarios**

This is cleaner and more reliable:

**Scenario A (Day 3):**
- Trigger: Daily schedule (run every morning at 8am)
- Action: HubSpot — Search contacts where (last_outreach_date = 3 days ago) AND (last_reply_date is null) AND (deal_stage = Contacted)
- For each result: Create follow-up task for today

**Scenario B (Day 7):** Same pattern, filter for 7 days ago

**Scenario C (Day 14):** Same pattern, filter for 14 days ago

**Why daily schedule triggers work better:** Instead of waiting for a specific Zap to resume 3 days later, you run a daily check that finds ALL contacts needing Day 3, 7, or 14 follow-up. This is more reliable and easier to debug.

</RevealSection>

<RevealSection title="CRM-Native Implementation (Simplest)">

If you use Pipedrive (Essential plan, $14/month), you can implement the Day 3/7/14 chain natively without any automation platform:

**Pipedrive Workflow Automations:**
1. Trigger: Deal stage changes to "Contacted"
2. Wait: 3 days
3. Condition: No activity logged in last 3 days (proxy for no reply)
4. Action: Create activity — "Day 3 follow-up — {`{deal.person_name}`}"

Repeat for 7 days and 14 days.

**HubSpot Free:** HubSpot Free does NOT include workflow automation with delays. You need HubSpot Starter ($15/month) or use Zapier/Make for the delay logic.

**Attio:** Similar limitations — check your plan's automation capabilities.

</RevealSection>

</ProgressiveReveal>

---

## Tasks vs Auto-Send: A Critical Distinction

<StrategyDuel
  title="Follow-Up Delivery: Task (Human Reviews) vs Auto-Send"
  persistKey="automation-L4-duel"
  scenario="You have 15 prospects in your Day 7 follow-up bucket. You need to reach out to all of them today. Should the automation create tasks for you to review and send, or should it auto-send the follow-up emails directly?"
  strategyA={{
    name: "Auto-Send",
    description: "Automation writes and sends the Day 7 email without human review",
    pros: ["Zero time investment", "100% consistency — no one gets skipped", "Scales to unlimited volume"],
    cons: ["No personalization — same template for everyone", "Risk of bad timing (e.g., sends while prospect is out of office from a different campaign)", "Tone-deaf if their situation changed", "Higher unsubscribe risk from robotic messaging"]
  }}
  strategyB={{
    name: "Task (Human Gate)",
    description: "Automation creates a task; you review and personalize before sending",
    pros: ["Full personalization for each prospect", "You can incorporate new context (trigger events, news, replies to other threads)", "Lower unsubscribe risk", "Quality control over every message"],
    cons: ["Requires 1-3 minutes per follow-up", "You can still skip tasks if you're overwhelmed", "Doesn't scale to 100+ conversations without more time investment"]
  }}
  expertVerdict="For solo founders at &lt;50 active conversations, always use the task approach. The personalization advantage is significant — reply rates on personalized Day 7 follow-ups are 3-5x higher than templated auto-sends. If you scale beyond 50 active conversations, consider auto-send for Day 14 break-up emails only (these are low-risk and highly templated) while keeping Day 3 and Day 7 as tasks."
/>

---

## Personalizing Your Follow-Ups

The automation creates the task. You do the work. Here's how to personalize efficiently without spending 10 minutes per follow-up:

<ExampleCard label="Case Study: The 90-Second Personalization System">
Jordan had 22 prospects in his Day 7 follow-up queue every Monday morning. The automation created tasks for all of them over the weekend.

His process: open the CRM, filter by "Day 7 follow-up task due today." For each contact:
1. Check the CRM activity timeline (15 seconds) — what was the original outreach topic?
2. Open LinkedIn (15 seconds) — any trigger events? New post, job change, company news?
3. Write the follow-up (60 seconds) using the trigger event found

Average time per follow-up: 90 seconds. 22 follow-ups = 33 minutes on Monday morning.

Before the system, he spent 45 minutes remembering who needed follow-up and often missed 30-40% of them.
</ExampleCard>

<LinterFeedback
  title="Follow-Up Email Linter"
  persistKey="automation-L4-linter"
  inputLabel="Paste your Day 7 follow-up email draft here"
  rules={[
    {
      id: "r1",
      label: "References something specific",
      description: "The email should mention something specific about the prospect, their company, or a trigger event — not a generic 'checking in'",
      keywords: ["noticed", "saw", "read about", "your", "company", "industry", "you mentioned", "relevant"],
      antiKeywords: ["just checking in", "following up on my previous", "hope you're well", "wanted to touch base"]
    },
    {
      id: "r2",
      label: "Short and easy to respond to",
      description: "Day 7 follow-ups should be 3-5 sentences max. Long emails get ignored.",
      keywords: [],
      antiKeywords: ["Additionally,", "Furthermore,", "I wanted to take a moment to"]
    },
    {
      id: "r3",
      label: "Single clear CTA",
      description: "One call-to-action only — a link, a yes/no question, or a calendar link. Not multiple options.",
      keywords: ["calendly", "15 min", "quick call", "yes or no", "worth a conversation"],
      antiKeywords: ["let me know what works for you", "feel free to", "or alternatively"]
    }
  ]}
/>

---

## Monitoring Your Chain

After launching the Follow-Up Reminder chain, monitor these metrics weekly:

<TemplateBuilder
  title="Follow-Up Chain Performance Tracker"
  persistKey="automation-L4-tracker"
  sections={[
    {
      id: "volume",
      title: "Weekly Volume",
      fields: [
        {
          id: "tasks_created",
          label: "Follow-up tasks created this week (Day 3 + 7 + 14 combined)",
          placeholder: "e.g., 18 tasks created across all three days",
          type: "text"
        },
        {
          id: "tasks_completed",
          label: "Follow-up tasks completed (emails actually sent)",
          placeholder: "e.g., 15 of 18 completed (83% completion rate)",
          type: "text"
        }
      ]
    },
    {
      id: "performance",
      title: "Reply Rates by Follow-Up Day",
      fields: [
        {
          id: "day3_reply",
          label: "Day 3 reply rate (replies / tasks sent)",
          placeholder: "e.g., 3 replies from 8 Day 3 follow-ups = 37.5%",
          type: "text"
        },
        {
          id: "day7_reply",
          label: "Day 7 reply rate",
          placeholder: "e.g., 2 replies from 6 Day 7 follow-ups = 33%",
          type: "text"
        },
        {
          id: "day14_reply",
          label: "Day 14 reply rate",
          placeholder: "e.g., 1 reply from 4 Day 14 follow-ups = 25%",
          type: "text"
        }
      ]
    },
    {
      id: "optimization",
      title: "Optimization Notes",
      fields: [
        {
          id: "stop_conditions",
          label: "Stop conditions working? (Any chains that should have stopped but didn't?)",
          placeholder: "e.g., 1 chain continued after a reply — fixed the filter condition",
          type: "textarea"
        },
        {
          id: "template_changes",
          label: "Template improvements based on this week's data",
          placeholder: "e.g., Day 7 template updated to reference LinkedIn posts instead of news",
          type: "textarea"
        }
      ]
    }
  ]}
/>

---

## Testing the Chain Before Going Live

<InteractiveChecklist
  title="Follow-Up Reminder Chain Test Protocol"
  persistKey="automation-L4-test-checklist"
  items={[
    "Create a test contact in your CRM and move them to 'Contacted' stage",
    "Verify the chain initiates (Day 3 task scheduled or scenario queued)",
    "Simulate a reply: log an inbound email activity on the test contact — verify the chain stops",
    "Simulate a stage change: advance the deal to 'Engaged' — verify the chain stops",
    "Mark the deal as Lost — verify the chain stops",
    "Let the chain run to Day 3 without replies — verify the task is created with correct due date",
    "Verify task is linked to the correct contact and deal in CRM",
    "Run a full end-to-end test with a real email to yourself — simulate being a prospect"
  ]}
/>

---

## Your Action Items

<InteractiveChecklist
  title="Lesson 4 Action Items"
  persistKey="automation-L4-actions"
  items={[
    "Choose your implementation method: Zapier delay steps, Make daily schedule, or CRM-native automations",
    "Build the Day 3 task creator first — test it end-to-end before adding Days 7 and 14",
    "Add all four stop conditions: reply detected, stage advanced, deal lost, manual pause flag",
    "Run the 8-step test protocol — specifically test that stop conditions work correctly",
    "Audit your current pipeline: how many deals in 'Contacted' stage have had zero follow-up?",
    "Write your three follow-up templates (Day 3, Day 7, Day 14) and save them in your CRM or a doc",
    "Set a personal goal: complete 90%+ of follow-up tasks within 24 hours of them being created"
  ]}
/>

---

## What's Next

In **Lesson 5**, you'll build the Contract and Invoice Chaser — the automation that reminds you (and optionally nudges prospects) when proposals sit unsigned and invoices go unpaid. It follows the same Day 3/7/14 pattern but targets your closing stage instead of your outreach stage.

---

## Quiz: The Follow-Up Reminder Chain

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What percentage of sales require 5+ follow-ups to close?",
      "options": ["30%", "50%", "65%", "80%"],
      "correctAnswer": 3,
      "explanation": "80% of sales require 5+ follow-ups. The Day 3/7/14 chain gets you to 3 follow-ups — a minimum floor. Some deals need 5-8 touchpoints before they respond."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Which is NOT a valid stop condition for the follow-up chain?",
      "options": [
        "Prospect replied to your email",
        "Deal stage advanced beyond Contacted",
        "Deal marked as Lost",
        "Prospect opened your email but didn't reply"
      ],
      "correctAnswer": 3,
      "explanation": "Email opens are not a valid stop condition. Email open tracking is unreliable, and an open without a reply means the conversation hasn't progressed. Only replies and CRM stage changes should stop the chain."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "The Follow-Up Reminder chain should automatically send the follow-up emails without human review.",
      "correctAnswer": false,
      "explanation": "False. For Days 3 and 7, the automation should create tasks — you review and personalize before sending. This maintains conversation quality and allows you to incorporate new context. Day 14 break-up emails can be considered for auto-send due to their low-risk, templated nature."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "What is the purpose of the Day 14 break-up email?",
      "options": [
        "To aggressively close the deal",
        "To give the prospect permission to say 'not now' while keeping the door open",
        "To mark the deal as lost in your CRM automatically",
        "To transfer the deal to a different sales rep"
      ],
      "correctAnswer": 1,
      "explanation": "The break-up email removes pressure by giving the prospect permission to say 'not now' — which paradoxically often generates replies. It also keeps the door open for future timing."
    }
  ]
}
```
