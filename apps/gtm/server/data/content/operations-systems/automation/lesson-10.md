---
title: "Your Automation Stack Blueprint"
duration: "45 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 10
---

You've spent nine lessons building the infrastructure that most solo founders never build. You have a Lead Catcher, a Meeting Logger, a Follow-Up Reminder chain, a Contract Chaser, Deal Notifications, and Reply Routing — all working together as a connected system.

Right now, this is still a collection of individual automations. This final lesson turns it into a **stack** — a connected, monitored, documented system that operates reliably in the background while you focus on what requires a human: relationships, strategy, and closing.

Let's audit what you've built, install the 7-day sprint for anyone still filling gaps, and chart the path to where automation ends and outsourcing begins.

---

## Your Complete Automation Inventory

Before you can call this a stack, you need to verify it's complete.

<InteractiveChecklist
  title="Automation Stack Audit"
  persistKey="automation-L10-audit"
  items={[
    "Automation 1: Lead Catcher — Form/Calendly → CRM contact creation → Lead Source tagged → Slack notification",
    "Automation 2: Meeting Logger — Calendly trigger → CRM activity logged → Deal stage updated → Follow-up task created",
    "Automation 3: Follow-Up Reminder — Day 3/7/14 task chain with stop conditions (reply, stage change, lost, manual pause)",
    "Automation 4: Contract Chaser — Proposal sent → Day 3/7/14 reminders → Signed trigger fires onboarding actions",
    "Automation 5: Deal Notifications — Stage changes, won/lost events, high-score leads → Slack/email routing",
    "Automation 6: Reply Routing — Reply detected → CRM stage updated → Sequence paused → Response task created → Slack DM",
    "Budget: Total automation spend under $100/month (ideally $20-50/month)",
    "Monitoring: Platform error alerts enabled + weekly canary test configured",
    "Debugging Playbook: Past failures documented + 5-step protocol bookmarked",
    "Versioning: All automations duplicated with date suffix as rollback backups"
  ]}
/>

---

## The Process Automation Map

This is the primary artifact of the entire course. Every automation you've built should appear in this diagram:

<InsightCard icon="🗺️" title="Your Automation Map">
The Process Automation Map shows every automation, its trigger, its actions, and how it connects to other automations and tools. It's your single-source documentation — what you'd hand to a VA or fractional ops hire in Course 43.
</InsightCard>

Here's how the complete automation stack connects:

```
[Form/Website] ──────────────────► Lead Catcher ──► [CRM: New Lead] ──► Slack Notification
[Calendly Booking] ─────────────►                ──► [CRM: Deal Created]

[Calendly Meeting End] ──────────► Meeting Logger ──► [CRM: Activity Logged]
                                                   ──► [CRM: Stage → Meeting Held]
                                                   ──► [CRM: Follow-Up Task +24hrs]

[CRM: Outreach Sent] ────────────► Follow-Up Chain ──► [Task: Day 3 Follow-Up]
   └─► No reply in 3 days ────────►                ──► [Task: Day 7 Follow-Up]
   └─► No reply in 7 days ────────►                ──► [Task: Day 14 Break-Up]
   └─► Reply detected ──────────────────────────────► STOP CHAIN

[E-Signature: Document Sent] ────► Contract Chaser ──► [Internal Alert: Day 3]
                                                    ──► [Task: Day 7 Prospect Nudge]
                                                    ──► [Task: Day 14 Escalation]
   └─► Document Signed ──────────────────────────────► STOP + Onboarding Trigger

[CRM: Stage Changed] ────────────► Deal Notifications ──► [Slack: High priority stages]
[CRM: Deal Won] ─────────────────►                    ──► [Slack: Celebration message]
[CRM: Deal Lost] ────────────────►                    ──► [Slack: Loss reason prompt]

[Email: Reply Received] ─────────► Reply Router ──► [CRM: Stage → Engaged]
                                               ──► [Sequence: Pause immediately]
                                               ──► [Task: Respond within 4 hours]
                                               ──► [Slack: High-priority DM]
                                               ──► Follow-Up Chain: STOP
```

<TemplateBuilder
  title="My Process Automation Map"
  persistKey="automation-L10-map"
  sections={[
    {
      id: "tools",
      title: "My Tool Stack",
      fields: [
        {
          id: "form",
          label: "Form tool (Lead Catcher trigger)",
          placeholder: "e.g., Typeform, Tally, HubSpot Forms",
          type: "text"
        },
        {
          id: "calendar",
          label: "Calendar/booking tool (Meeting Logger trigger)",
          placeholder: "e.g., Calendly",
          type: "text"
        },
        {
          id: "crm",
          label: "CRM (data destination for all automations)",
          placeholder: "e.g., HubSpot Free, Pipedrive Essential, Attio Pro",
          type: "text"
        },
        {
          id: "esig",
          label: "E-signature tool (Contract Chaser trigger)",
          placeholder: "e.g., SignWell, PandaDoc, DocuSign, or Manual",
          type: "text"
        },
        {
          id: "outreach",
          label: "Outreach tool for reply detection",
          placeholder: "e.g., Instantly, Smartlead, Gmail direct",
          type: "text"
        },
        {
          id: "automation_platform",
          label: "Automation platform",
          placeholder: "e.g., Make Core ($10.59/month), Zapier Starter ($19.99/month)",
          type: "text"
        },
        {
          id: "notification",
          label: "Notification channel",
          placeholder: "e.g., Slack #leads channel + personal DM",
          type: "text"
        }
      ]
    },
    {
      id: "monthly_impact",
      title: "Monthly Impact",
      fields: [
        {
          id: "leads",
          label: "Leads auto-captured per month (via Lead Catcher)",
          placeholder: "e.g., 22 leads/month captured automatically",
          type: "text"
        },
        {
          id: "meetings",
          label: "Meetings auto-logged per month (via Meeting Logger)",
          placeholder: "e.g., 8 meetings/month logged automatically",
          type: "text"
        },
        {
          id: "tasks",
          label: "Follow-up tasks auto-created per month",
          placeholder: "e.g., 35 tasks/month (Day 3/7/14 chain)",
          type: "text"
        },
        {
          id: "hours_saved",
          label: "Estimated hours saved per month",
          placeholder: "e.g., 19 hours/month across all 6 automations",
          type: "text"
        },
        {
          id: "total_cost",
          label: "Total monthly automation cost",
          placeholder: "e.g., $10.59/month (Make Core only)",
          type: "text"
        }
      ]
    }
  ]}
/>

---

## The 7-Day Automation Build Sprint

If you're reading this lesson before building all your automations, here's the week-by-week sprint to get your full stack live:

<SlideNavigation>
<Slide title="Day 1: Platform Setup">

**Goal:** Your automation platform is live and connected to your CRM.

**Actions:**
1. Choose your platform (Make Core, Zapier Starter, or n8n)
2. Create an account and complete setup
3. Connect your CRM (HubSpot, Pipedrive, or Attio) as your first integration
4. Connect Slack for notifications
5. Verify both connections work with a simple test (get contact list from CRM, send test Slack message)

**Time:** 60-90 minutes

**Output:** Platform live, CRM and Slack connected.

</Slide>

<Slide title="Day 2: Lead Catcher">

**Goal:** Every new lead from every source lands in your CRM with Lead Source tagged and a Slack notification sent.

**Actions:**
1. Connect your form tool (Typeform, Tally, or HubSpot Forms)
2. Build the form → CRM contact creation flow with field mapping
3. Add Lead Source field (static value matching your form name)
4. Add Slack notification with contact name, company, and CRM link
5. Test: submit a real test entry, verify contact appears in CRM and Slack fires

**Time:** 60-90 minutes

**Output:** Lead Catcher live for at least your primary form source.

</Slide>

<Slide title="Day 3: Meeting Logger">

**Goal:** Every Calendly booking is automatically logged in CRM, updates the deal stage, and creates a follow-up task.

**Actions:**
1. Connect Calendly to your automation platform
2. Add time delay (meeting duration after event start)
3. Build CRM activity creation + deal stage update + follow-up task creation
4. Test: book a test appointment, verify all three CRM actions fire

**Time:** 60-90 minutes

**Output:** Meeting Logger live for your primary Calendly event type.

</Slide>

<Slide title="Day 4: Follow-Up Reminder Chain">

**Goal:** Day 3/7/14 tasks created automatically for all active outreach prospects.

**Actions:**
1. Build the trigger (deal stage = Contacted OR outreach email logged)
2. Add Day 3 check + task creation
3. Add Day 7 check + task creation
4. Add Day 14 check + task creation
5. Add all four stop conditions (reply, stage advance, lost, manual pause)
6. Test: create a test contact, verify Day 3 task fires, verify chain stops when stage advances

**Time:** 90-120 minutes (most complex automation)

**Output:** Follow-Up Reminder Chain live with all stop conditions working.

</Slide>

<Slide title="Day 5: Contract Chaser + Deal Notifications">

**Goal:** Unsigned contracts are automatically chased. Key deal events generate Slack notifications.

**Actions:**
1. Connect e-signature tool (SignWell, PandaDoc, or DocuSign)
2. Build Contract Chaser: document sent → Day 3/7/14 reminders + stop on signature
3. Add the Deal Won trigger (signature → CRM update + onboarding tasks)
4. Build 3 Deal Notifications: new lead, deal won, deal lost
5. Test each with a sample event

**Time:** 90 minutes

**Output:** Contract Chaser live, 3 key notifications active.

</Slide>

<Slide title="Day 6: Reply Routing">

**Goal:** Prospect replies automatically update CRM, pause sequences, and create priority tasks.

**Actions:**
1. Choose reply detection method (CRM email sync, outreach tool webhook, or Gmail filter)
2. Verify "Stop on Reply" is enabled in your outreach tool
3. Build the reply routing flow: detect → CRM stage update → sequence pause → task creation → Slack DM
4. Test: send a test email from your outreach tool to yourself, reply to it, verify all steps fire
5. Optional: add AI classification for positive/negative/OOO routing

**Time:** 90 minutes

**Output:** Reply Router live with sequence pausing verified.

</Slide>

<Slide title="Day 7: Integration Test + Monitoring">

**Goal:** Full end-to-end test of all automations. Monitoring configured. First health check complete.

**Actions:**
1. Run the full test protocol for each automation
2. Submit a test form → verify Lead Catcher fires
3. Book a test Calendly appointment → verify Meeting Logger fires
4. Move a test deal to "Contacted" → verify Follow-Up Chain triggers
5. Send a test e-signature document → verify Contract Chaser triggers
6. Reply to a test outreach email → verify Reply Router fires
7. Configure error monitoring (email alerts + Slack #automation-alerts)
8. Set up weekly canary test in your calendar

**Time:** 2-3 hours

**Output:** Full stack validated, monitoring live.

</Slide>
</SlideNavigation>

---

## The Automation-First Decision Framework

Every time you identify a repetitive task, run this question through the framework before doing it manually:

<DecisionTree
  title="Should I Automate This?"
  persistKey="automation-L10-framework"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "You've identified a repetitive task. Does it happen at least 4 times per month?",
      choices: [
        { label: "Yes — it's frequent", nextNodeId: "predictable" },
        { label: "No — it's rare (1-3x/month)", nextNodeId: "too_rare" }
      ]
    },
    {
      id: "too_rare",
      content: "Don't automate. The setup cost exceeds the time savings. Document the process as an SOP and do it manually.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "predictable",
      content: "Is the task predictable — same steps, same tools, same outcome every time?",
      choices: [
        { label: "Yes — same process every time", nextNodeId: "automate" },
        { label: "No — requires judgment each time", nextNodeId: "delegate" }
      ]
    },
    {
      id: "delegate",
      content: "Don't automate — automate what you can and delegate the judgment part. In Course 43 (Outsourcing), you'll hire a VA for judgment-heavy tasks. Document the process as an SOP first.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "automate",
      content: "Does the task touch one of your core automation areas (lead capture, meeting logging, follow-up, contract/invoice, notifications, reply routing)?",
      choices: [
        { label: "Yes — it's a core sales automation", nextNodeId: "build_now" },
        { label: "No — it's a different workflow", nextNodeId: "backlog" }
      ]
    },
    {
      id: "build_now",
      content: "Build it now. You have the platform, the integrations, and the patterns. Adding a new automation to an existing stack takes 30-60 minutes.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "backlog",
      content: "Add it to your automation backlog (a running list of future automation ideas). Build it during your next monthly review when you have space. Don't let the perfect be the enemy of the good.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

---

## The Handoff to Course 43: When Automation Isn't Enough

Automation handles predictable, rule-based work. But there are tasks that require human judgment:
- Writing personalized outreach messages
- Making strategic decisions about which leads to pursue
- Conducting discovery calls
- Negotiating contract terms
- Building relationships with key accounts

These tasks cannot be automated — but they can be delegated.

<InsightCard icon="🤝" title="The Automation → Delegation Boundary">
Your automation stack frees up 15-25 hours per month of admin. Some of that time goes back to high-value selling activities. Some of it reveals tasks that are too judgment-heavy for automation but too low-value for your personal time.

That's the sweet spot for a virtual assistant (VA) or fractional sales coordinator. Course 43 (Hiring and Outsourcing) covers exactly this: what to delegate, how to write SOPs, how to hire your first VA, and how to manage them without adding management overhead.

Your automation stack becomes the SOP for the VA's tasks. The automations create the tasks; the VA executes the judgment calls.
</InsightCard>

<ExampleCard label="The Founder Who Scaled Past Automation">
After building his complete automation stack, Diego could see exactly where automation ended and human judgment was needed.

His automations handled: lead capture (100%), meeting logging (100%), follow-up task creation (100%), contract reminders (100%), and deal notifications (100%).

But the actual writing of personalized follow-up emails still took him 3-4 hours per week. The automations created the tasks; he wrote every email.

He hired a part-time VA for 10 hours/week using Course 43's process. The VA handled email drafts (Diego approved them), outreach research, and calendar management. His effective selling time doubled.

**The automation stack became the VA's operating manual.** Every task the VA needed to handle already had a CRM record, context notes, and a due date — created automatically.
</ExampleCard>

---

## The Integration Health Dashboard

Add a simple integration health section to your weekly Friday review from Course 41:

<TemplateBuilder
  title="Weekly Automation Health Review Template"
  persistKey="automation-L10-health-review"
  sections={[
    {
      id: "status",
      title: "Automation Status (5 minutes every Friday)",
      fields: [
        {
          id: "lead_catcher",
          label: "Lead Catcher: Leads captured this week (should match CRM new contacts)",
          placeholder: "e.g., 7 form submissions → 7 new CRM contacts (100% capture rate) ✓",
          type: "text"
        },
        {
          id: "meeting_logger",
          label: "Meeting Logger: Meetings logged this week",
          placeholder: "e.g., 4 Calendly meetings → 4 CRM activities logged ✓",
          type: "text"
        },
        {
          id: "followup",
          label: "Follow-Up Chain: Tasks created vs tasks in-progress-or-done",
          placeholder: "e.g., 12 tasks created, 11 completed (92% completion rate) ✓",
          type: "text"
        },
        {
          id: "contract",
          label: "Contract Chaser: Any alerts fired this week?",
          placeholder: "e.g., 1 Day 3 alert fired — [Deal Name] still unsigned, action taken ✓",
          type: "text"
        },
        {
          id: "errors",
          label: "Errors this week (from #automation-alerts Slack channel)",
          placeholder: "e.g., 0 errors ✓ | or: 1 error — Lead Catcher 401 on Monday, fixed by reconnecting HubSpot",
          type: "text"
        }
      ]
    },
    {
      id: "ops",
      title: "Operation Volume (monthly, first Friday)",
      fields: [
        {
          id: "ops_used",
          label: "Operations/tasks used this month vs plan limit",
          placeholder: "e.g., 2,340 / 10,000 ops used (23% of Make Core plan)",
          type: "text"
        },
        {
          id: "budget",
          label: "Total automation spend this month",
          placeholder: "e.g., $10.59 (Make Core only — well under $100 target)",
          type: "text"
        }
      ]
    }
  ]}
/>

---

## Your Completion Assessment

You've spent this course building six automations. Let's verify you can apply the core concepts under pressure:

<PredictionGate
  question="A founder completes this course and implements all 6 automations. They save 20 hours per month. How does this change their business trajectory?"
  persistKey="automation-L10-predict"
  type="choice"
  choices={[
    { id: "a", text: "It mostly just saves time — the automation stack is an operational improvement, not a growth driver" },
    { id: "b", text: "It directly accelerates growth by making them faster, more consistent, and able to handle more volume without more hours" },
    { id: "c", text: "It creates too much complexity and should only be done once revenue exceeds $10K MRR" }
  ]}
  correctId="b"
>

**The answer is B — and here's why it's more profound than it seems.**

Saving 20 hours per month doesn't just free up time. It changes what's possible:

1. **Reply speed improves.** Prospect replies get a response task within minutes, not hours. Close rates on warm leads increase because you're the first responder.

2. **Nothing falls through the cracks.** The follow-up chain ensures every prospect gets 3 touches. The contract chaser ensures every proposal gets 3 reminders. Revenue that would have been lost to negligence is recovered.

3. **You can handle 2-3x the volume without more hours.** 50 active conversations instead of 20. More pipeline means more revenue at the same close rate.

4. **Your data improves.** CRM activities are logged consistently. Velocity analytics become meaningful. You can see exactly where deals stall and fix it.

The automation stack is not a nice-to-have. It's the infrastructure that makes scaling possible without hiring.

</PredictionGate>

---

## Congratulations: You're an Automation Architect

You started this course unsure which platform to choose. You're finishing it with:

- A Lead Catcher that captures every lead automatically
- A Meeting Logger that documents every call without manual effort
- A Follow-Up Reminder chain that ensures 0 deals fall through the cracks
- A Contract Chaser that recovers revenue that would have been lost to delay
- Deal Notifications that keep you informed without living in your CRM
- A Reply Router that turns prospect responses into priority tasks instantly
- A budget under $100/month and a monitoring system that catches failures fast
- A Debugging Playbook that resolves most failures in under 10 minutes

That's a professional-grade automation stack. Most VC-backed companies don't have all of this working in their first year.

**In Course 43 (Hiring and Outsourcing)**, you'll learn what to delegate now that automation has freed your time — and how to hire your first VA using your automation blueprints as SOPs.

See you there.

---

## Quiz: The Automation Stack Blueprint

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is the primary output artifact of Course 42?",
      "options": [
        "A list of automation tools with their pricing",
        "A Process Automation Map showing all 6 automations, triggers, and connections",
        "A Zapier account with 5 Zaps configured",
        "A budget spreadsheet for automation tools"
      ],
      "correctAnswer": 1,
      "explanation": "The Process Automation Map is your complete documentation of the 6 automations, their triggers, actions, data flows, and tool connections. It's also the SOP you'll hand to a VA in Course 43."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "According to the Automation-First Decision Framework, which tasks should NOT be automated?",
      "options": [
        "Tasks that happen more than 4 times per month",
        "Tasks that require human judgment each time",
        "Tasks that take less than 5 minutes each",
        "Tasks that involve your CRM"
      ],
      "correctAnswer": 1,
      "explanation": "Tasks requiring judgment each time cannot be automated reliably. They should be documented as SOPs and delegated to a VA (Course 43). Automation handles predictable, rule-based work; humans handle judgment-based work."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "Your automation blueprints can serve as SOPs when you hire a VA in Course 43.",
      "correctAnswer": true,
      "explanation": "True. Your automation blueprints document exactly what happens when each trigger fires, which tools are involved, and what the expected outputs are. A VA working on related tasks can use these as their operating manual."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "What is the recommended way to add automation health to your Course 41 weekly review?",
      "options": [
        "Replace 15 minutes of the metrics review with automation debugging",
        "Add a separate 2-hour weekly automation review session",
        "Add 5 minutes to Friday review: check each automation's last successful run",
        "Review automation health only when a deal is lost"
      ],
      "correctAnswer": 2,
      "explanation": "Add 5 minutes to your weekly Friday review to check each automation's last successful run date. This catches failures within 7 days without adding significant time to your existing review ritual."
    }
  ]
}
```
