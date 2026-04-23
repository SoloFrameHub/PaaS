---
title: "Tools for VA Collaboration"
duration: "45 min"
track: "Operations & Systems"
course: "Course 43: Outsourcing & VAs"
lesson: 7
---

## The Difference Between Managing and Micromanaging

The tools you choose for VA collaboration determine whether you spend 30 minutes per week maintaining a delegation system or 2 hours per day approving everything your VA does before it goes anywhere.

Good collaboration tools enable three things: your VA can work independently without interrupting you for every small decision, you can monitor quality without reviewing every output, and you can update training materials when processes change without scheduling another call.

This lesson covers the five tools in your VA collaboration stack, how to set each one up, and the QA system that keeps quality high after onboarding is done.

<InsightCard icon="🛠️" title="Your Full Stack Costs Under $30/Month">
The entire VA collaboration stack (Slack, Notion, Loom, Google Drive) runs on free tiers for most solo founders. The free tiers are sufficient until your VA relationship is well-established and the ROI of upgrading is obvious. Start free, upgrade when you have a specific reason.
</InsightCard>

## The Five Tools in Your Stack

<SlideNavigation>
<Slide title="Tool 1: Slack — Daily Communication">

**What it does:** Real-time messaging and async communication between you and your VA. Your VA's daily home base.

**Setup:**
- Create a dedicated #va-channel where all task-related communication happens
- Set communication norms: VA posts start-of-shift and end-of-shift updates in the channel
- Add your VA as a multi-channel guest (free tier) to avoid paying a full user seat
- @mention for anything urgent, message in channel for everything else

**The rule:** No task-related communication in DMs. Everything goes through #va-channel so you have a searchable record and can review conversation history in your weekly QA.

**Free tier:** 90 days of message history. More than sufficient for daily VA collaboration.

**When to upgrade:** If you hire a second VA or need to integrate Slack with tools (Zapier, HubSpot) that require paid Slack.

</Slide>

<Slide title="Tool 2: Notion — SOPs and Documentation">

**What it does:** Your VA's single source of truth for all procedures, templates, and reference materials.

**Setup — your Notion VA Hub structure:**
- **SOPs folder:** Inbox Triage SOP, CRM Update SOP, Prospect Research SOP
- **Templates folder:** Response templates, Prospect Brief template, Meeting Note template
- **Reference folder:** ICP description, CRM field definitions, tool login reference (not passwords — just which tool does what)
- **FAQ page:** Answers to questions your VA has asked before (saves you from answering the same thing twice)
- **Escalation page:** Who to contact, how, and for what situation

**The practice:** When your VA asks a question via Slack, answer in Slack AND add the answer to the FAQ page in Notion. After 4 weeks, your VA should be able to solve 80%+ of uncertainty by checking Notion before messaging you.

**Free tier:** Unlimited pages and blocks for personal use. No upgrade needed.

</Slide>

<Slide title="Tool 3: Loom — Async Video Training">

**What it does:** Record screen walkthroughs of your SOPs so your VA can watch, rewatch, and reference the training at their own pace.

**Why video beats written SOPs for training:**
- Written SOPs describe what to do. Video shows how to do it in context.
- VA can see exactly where you click in HubSpot, exactly how you evaluate an email
- Your VA can pause and rewatch difficult steps without asking you
- Studies show VA onboarding is 40% faster with video than written-only documentation

**Your Loom library structure:**
- Video 1: Inbox triage walkthrough (10-12 min) — open Gmail, show a real example of each category
- Video 2: CRM update walkthrough (8-10 min) — show how to update a stage, log a note, flag a missing next action
- Video 3: Prospect research walkthrough (12-15 min) — research a real prospect together, complete the brief in real time

**Recording tips:**
- Do each video in one take with real data (blur or anonymize sensitive info)
- Narrate your thinking, not just your actions ("I'm choosing Lead over Admin here because...")
- Keep videos under 15 minutes — longer and VAs stop rewatching

**Free tier:** 25 videos, 5 minutes max per video. Sufficient for initial SOP library if you're concise. Creator plan at $15/month removes limits.

</Slide>

<Slide title="Tool 4: Tango or Scribe — Auto-Generated SOPs">

**What they do:** Automatically capture your screen clicks and generate step-by-step visual guides. You do the task; the tool writes the SOP.

**Tango:**
- Chrome extension that records your workflow as you do it
- Generates annotated screenshots with descriptions for each step
- Free tier: 25 workflow captures per user

**Scribe:**
- Similar to Tango but with AI-generated written descriptions
- Free tier: unlimited basic guides (with Scribe watermark)
- Paid ($23/user/mo) for export, branding, and team features

**When to use them:** Use Tango or Scribe to create the written SOP and Loom to create the video walkthrough. The two formats are complementary — written SOP for reference, video for training.

**Workflow:** Do your normal CRM update routine with Tango/Scribe recording. Share the exported guide with your VA as the SOP. Record a Loom video walking through the same steps with your narration of the why behind each step.

</Slide>

<Slide title="Tool 5: 1Password or LastPass — Secure Credential Sharing">

**What it does:** Lets you share tool credentials with your VA without sending passwords in Slack or email.

**Why this is non-negotiable:**
- Passwords sent via Slack or email can be screenshot, forwarded, or compromised
- If you end the VA relationship, you need to revoke access — not reset every password
- A password manager lets you update a credential once and it syncs for both of you

**Setup:**
- Create a "VA Shared" vault in 1Password ($3/month for families plan, which covers up to 5 members) or LastPass
- Add all tool credentials your VA needs: CRM, email delegation, Notion, any tools they access
- Share the vault with your VA's account
- If relationship ends: remove VA from vault. Credentials rotate. Done.

**1Password Business:** $4/user/month. Worth it if you have sensitive client or financial tool access.

</Slide>
</SlideNavigation>

## Setting Up Your Notion VA Hub

Your Notion VA Hub is where your VA starts every shift. It should answer "what do I do?" and "how do I do it?" for every task in the job.

<TemplateBuilder
  title="Notion VA Hub Structure"
  persistKey="outsourcing-L7-notion"
  sections={[
    {
      id: "sop-pages",
      title: "SOP Pages to Create",
      fields: [
        { id: "sop1", label: "Inbox Triage SOP page — key sections to include", placeholder: "e.g., Purpose, Daily schedule, 4-category decision tree, Routing rules, Response templates, Escalation protocol, QA checklist", type: "textarea" },
        { id: "sop2", label: "CRM Update SOP page — key sections to include", placeholder: "e.g., Daily checklist (5 steps), Stage update rules with evidence examples, Meeting note template, Flagging protocol for ambiguous cases", type: "textarea" },
        { id: "sop3", label: "Prospect Research SOP page — key sections to include", placeholder: "e.g., Research source priority order, Prospect Brief template, ICP scoring criteria, Quality standards with good/poor examples, Batch workflow schedule", type: "textarea" }
      ]
    },
    {
      id: "reference",
      title: "Reference Pages",
      fields: [
        { id: "icp", label: "ICP Description page — what to include", placeholder: "e.g., Company size range, industries, roles, growth signals, disqualifying signals, examples of good-fit and bad-fit prospects", type: "textarea" },
        { id: "faq", label: "FAQ page — first questions to add", placeholder: "e.g., 'What if I see an email that could be Lead or Admin?' 'When should I message you vs. handle it myself?' 'What do I do if a prospect replies in Spanish?'", type: "textarea" }
      ]
    }
  ]}
/>

## The QA Scorecard: Measuring Quality Without Reviewing Everything

Your QA scorecard is the tool that tells you whether your VA's performance is improving, stable, or degrading — without you reviewing every output.

<TemplateBuilder
  title="VA QA Scorecard"
  persistKey="outsourcing-L7-qa"
  sections={[
    {
      id: "metrics",
      title: "Weekly QA Metrics",
      fields: [
        { id: "triage", label: "Inbox Triage Accuracy Target and Measurement", placeholder: "e.g., Target: 90%+. Measurement: Spot-check 10 random triage decisions. Score = correct classifications / 10.", type: "textarea" },
        { id: "crm", label: "CRM Update Completeness Target and Measurement", placeholder: "e.g., Target: 95%+. Measurement: Pull 5 random active deals — check that stage is current, next action exists with a date, and recent email activity is logged.", type: "textarea" },
        { id: "research", label: "Prospect Brief Quality Target and Measurement", placeholder: "e.g., Target: 80%+. Measurement: Review 3 briefs. Score each on: all fields complete (30%), trigger has source link (30%), talking point is specific not generic (40%).", type: "textarea" },
        { id: "escalation", label: "Escalation Response Time Target", placeholder: "e.g., Target: Founder responds to escalations within 2 hours during business hours.", type: "text" }
      ]
    },
    {
      id: "review",
      title: "Review Process",
      fields: [
        { id: "frequency", label: "How Often You Run QA", placeholder: "e.g., Weekly during 30-minute Friday 1:1. I review outputs before the call; we discuss scores and SOP updates during the call.", type: "text" },
        { id: "track", label: "How You Track Scores Over Time", placeholder: "e.g., Simple Google Sheet: date, triage score, CRM score, research score, notes on error patterns.", type: "text" }
      ]
    }
  ]}
/>

## Slack Communication Norms

The biggest source of VA management time-drain is unstructured communication — messages that interrupt your day, questions you have to answer immediately, status checks that happen at random times.

The fix is communication norms. Your VA follows them; you follow them too.

<ExampleCard label="VA Communication Protocol">
**Start-of-shift message (posted in #va-channel):**
"Hi Mike — starting my shift. Today's plan: inbox triage (45 min), CRM updates (30 min), research for the 3 prospects you assigned on Monday (2 hrs). I'll post my end-of-shift update around 5 PM. One question from yesterday still open in Notion FAQ — checking there first."

**How to ask questions:**
"Question about [SOP name], step [X]: [describe the situation you encountered]. My best guess is [your interpretation]. Is this correct, or should I handle it differently?"

VA always includes their best guess. This forces active thinking before escalating, and gives you something to react to rather than an open-ended question.

**End-of-shift message:**
As described in Lesson 6 — tasks completed, escalations flagged, what's coming tomorrow.

**Urgent escalation:**
"URGENT: Lead email from [name] @ [company] with a pricing question. Arrived 20 minutes ago. You requested same-day response on leads — flagging now. Email quoted in thread below."
</ExampleCard>

## When Performance Drops: A Diagnostic

After a strong onboarding, most VA performance issues are one of three things:

<PredictionGate
  question="Your VA's inbox triage accuracy drops from 92% to 78% in week 6. Before investigating, what's most likely causing the drop?"
  persistKey="outsourcing-L7-predict"
  type="choice"
  choices={[
    { id: "effort", text: "The VA is getting lazy and not trying as hard" },
    { id: "sop", text: "Something in the email patterns changed that the SOP doesn't cover" },
    { id: "burnout", text: "The VA is burned out from too many hours" }
  ]}
  correctId="sop"
>
In most cases, a performance drop after a strong start means the SOP is missing a rule for a new situation. Your email patterns changed (new lead source, different type of admin email, unexpected category of prospect) and the VA is making judgment calls without guidance. The first step is always: review the specific errors, identify the pattern, add a rule to the SOP. If errors span multiple SOP sections, schedule a 30-minute retraining session before assuming it's a motivation issue.
</PredictionGate>

## Full Stack Cost Summary

<ScenarioSimulator
  title="VA Collaboration Stack Cost"
  persistKey="outsourcing-L7-sim"
  levers={[
    { id: "loom_paid", label: "Loom: Paid ($15/mo) or Free (0)?", min: 0, max: 1, step: 1, defaultValue: 0 },
    { id: "notion_paid", label: "Notion: Paid ($10/mo) or Free (0)?", min: 0, max: 1, step: 1, defaultValue: 0 },
    { id: "slack_paid", label: "Slack: Paid ($8.75/mo) or Free (0)?", min: 0, max: 1, step: 1, defaultValue: 0 },
    { id: "password_mgr", label: "1Password Business ($4/user/mo)?", min: 0, max: 1, step: 1, defaultValue: 1 }
  ]}
  outputs={[
    { id: "tool_cost", label: "Monthly Tool Cost", formula: "(loom_paid * 15) + (notion_paid * 10) + (slack_paid * 8.75) + (password_mgr * 8)", unit: "$/mo", precision: 0 },
    { id: "free_cost", label: "Cost on All-Free Tiers", formula: "4 * 2", unit: "$/mo (1Password only)", precision: 0 }
  ]}
  insight="Your VA collaboration tool stack costs $`{tool_cost}`/month at current settings. On all-free tiers except 1Password, total tool cost is $8/month. The free tiers of Slack, Notion, and Loom are sufficient for a single VA relationship during the first 3-6 months."
/>

<InteractiveChecklist
  title="VA Collaboration Stack Setup Checklist"
  persistKey="outsourcing-L7-setup"
  items={[
    "Slack: Create #va-channel, set communication norms, invite VA as multi-channel guest",
    "Notion: Create VA Hub with SOP pages for all three SOPs from Lessons 3-5",
    "Notion: Add FAQ page, ICP reference page, and escalation contact page",
    "Loom: Record SOP walkthrough videos (Inbox Triage, CRM Updates, Prospect Research)",
    "Tango or Scribe: Auto-generate written SOP documents by recording yourself doing each task",
    "1Password: Create shared vault, add all tool credentials, invite VA",
    "QA Scorecard: Set up simple Google Sheet to track weekly quality metrics",
    "Slack norms: Communicate start-of-shift, end-of-shift, and question format to VA"
  ]}
/>

## What's Next

In **Lesson 8**, you'll pull everything together into your Delegation Playbook — the complete artifact that combines the Hiring Threshold Calculator, the VA vs. SDR Decision Matrix, all three SOPs, your Hiring and Onboarding Checklist, and the QA Scorecard into one document you can hand to a new VA or hand off to a team lead when you scale.

You'll also run the 7-Day Delegation Sprint — a structured plan to go from zero to your first VA hired and producing output in one week.
