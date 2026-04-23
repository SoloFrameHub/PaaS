---
title: "Universal Pipeline Stages Setup"
duration: "50 min"
track: "Operations & Systems"
course: "Course 40: Advanced CRM Setup"
lesson: 4
---

## The $47K Pipeline That Lived in Someone's Head

Meet Jordan, a technical founder who'd been selling his dev tool for 8 months. When I asked to see his pipeline, he opened a spreadsheet with 73 rows and columns labeled "Status," "Vibes," and "Maybe Soon?"

"How many deals are actually close to closing?" I asked.

He scrolled for 30 seconds. "Uh... five? Maybe eight if you count the ones that went quiet but might come back?"

His CRM had a pipeline feature. He'd never set it up. "I know where everything is," he said, tapping his forehead.

Two weeks later, Jordan's "hot deal" — the one he'd mentally marked as 80% likely to close — went dark. Turns out the champion had left the company a month ago. Jordan never logged it because "I was going to follow up soon."

**The cost of that invisible pipeline: $47K ARR and 6 months of wasted nurture effort.**

After we rebuilt his pipeline with clear stages and exit criteria, Jordan closed 3 deals in the next 45 days. Not because his product improved. Because he could finally **see** what needed to happen next.

Your pipeline isn't a report card. It's a **decision engine**. Every stage should answer one question: *What does this prospect need from me right now?*

Let's build yours.

---

## Why the 6-Stage Pipeline Works Universally

Most founders either over-complicate pipelines (12 stages with names like "Qualification - Technical Fit Confirmed") or under-build them (just "Talking" and "Closed").

The 6-stage pipeline hits the sweet spot: **specific enough to drive action, simple enough to maintain solo.**

<FlipCard 
  front="Why exactly 6 stages?" 
  back="Fewer than 6 and you lose visibility into where deals stall. More than 6 and you spend more time moving cards than closing deals. Six stages map to the natural rhythm of B2B buying: awareness → interest → evaluation → decision → close." 
/>

Here's the universal structure:

**Stage 1: Lead** — New contact, ICP-fit confirmed, no outreach yet  
**Stage 2: Contacted** — First message sent (email, DM, call), awaiting response  
**Stage 3: Engaged** — Prospect replied, showed interest, or clicked  
**Stage 4: Meeting** — Discovery call or demo scheduled/completed  
**Stage 5: Proposal** — Pricing, terms, or offer document sent  
**Stage 6: Won/Lost** — Deal closed with reason logged

<InsightCard icon="🎯" title="The Stage Transition Test">
If you can't point to a specific observable event that moved a deal from one stage to the next, your stages are too vague. "They seem interested" isn't an event. "They replied asking for pricing" is.
</InsightCard>

Let's map your actual sales process to these stages.

<TemplateBuilder
  title="Map Your Sales Process to Stages"
  persistKey="crm-setup-L4-process-map"
  sections={[
    {
      id: "lead-to-contacted",
      title: "Lead → Contacted Transition",
      fields: [
        { 
          id: "first-touch", 
          label: "What's your typical first outreach?", 
          placeholder: "e.g., Cold email, LinkedIn DM, referral intro", 
          type: "text" 
        },
        { 
          id: "contacted-trigger", 
          label: "What event moves a lead to 'Contacted'?", 
          placeholder: "e.g., Email sent, connection request accepted", 
          type: "text" 
        }
      ]
    },
    {
      id: "contacted-to-engaged",
      title: "Contacted → Engaged Transition",
      fields: [
        { 
          id: "engagement-signal", 
          label: "What counts as 'engaged' for you?", 
          placeholder: "e.g., Replied to email, clicked calendar link, asked a question", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "engaged-to-meeting",
      title: "Engaged → Meeting Transition",
      fields: [
        { 
          id: "meeting-type", 
          label: "What's your first meeting format?", 
          placeholder: "e.g., 15-min discovery, 30-min demo, async Loom", 
          type: "text" 
        }
      ]
    }
  ]}
/>

---

## Stage Definitions with Exit Criteria

Here's where most pipelines break: **vague stage names with no exit rules.**

"Qualified" means different things to different people. "Proposal Sent" could mean you sent pricing or a full SOW. Without exit criteria, your pipeline becomes a guessing game.

<SlideNavigation>
<Slide title="Stage 1: Lead">

### Definition
A contact who matches your ICP but hasn't been contacted yet.

### Entry Criteria
- Added to CRM (manual or automated)
- ICP fit confirmed (role, company size, industry match)
- Contact info verified (email valid, LinkedIn profile found)

### Exit Criteria
**Move to Contacted when:** First outreach sent (email, DM, call logged)

### Typical Time in Stage
0-7 days (if longer, your research process is too slow)

### Automation Triggers
- Auto-enrich contact data (Apollo, Attio)
- Auto-assign to owner
- Auto-create "First Outreach" task due in 48 hours

<ExampleCard label="Real Example: Lead Stage">
**Contact:** Sarah Chen, VP Marketing at 50-person SaaS company  
**How she entered:** Scraped from LinkedIn Sales Navigator filter  
**ICP fit:** ✅ Role matches, company size matches, uses tech stack we integrate with  
**Exit event:** Cold email sent via Instantly sequence on Tuesday 9am
</ExampleCard>

</Slide>

<Slide title="Stage 2: Contacted">

### Definition
First outreach sent, awaiting response.

### Entry Criteria
- Email sent, DM sent, or call logged
- Outreach logged in CRM with timestamp

### Exit Criteria
**Move to Engaged when:** Prospect replies, clicks link, or books meeting  
**Move to Lost when:** 3 follow-ups sent over 14 days with no response

### Typical Time in Stage
3-7 days (B2B), 1-3 days (warm referrals)

### Automation Triggers
- Auto-schedule follow-up #1 at Day 3
- Auto-schedule follow-up #2 at Day 7
- Auto-flag as "No Response" at Day 14

<InsightCard icon="⚠️" title="The Follow-Up Trap">
Don't let deals rot in "Contacted" for 30+ days. If they haven't engaged after 3 touches over 2 weeks, move them to Lost with reason "No Response." You can always re-engage later with a new trigger event.
</InsightCard>

</Slide>

<Slide title="Stage 3: Engaged">

### Definition
Prospect showed interest — replied, clicked, or asked a question.

### Entry Criteria
- Replied to outreach (even if just "not now")
- Clicked calendar link or pricing page
- Engaged with content (downloaded resource, watched demo video)

### Exit Criteria
**Move to Meeting when:** Call/demo scheduled or completed  
**Move to Lost when:** Explicit "not interested" or 21 days no activity after engagement

### Typical Time in Stage
3-10 days

### Automation Triggers
- Auto-create "Book Meeting" task
- Auto-send meeting scheduler link if not already sent
- Auto-flag if no meeting booked within 10 days

<ExampleCard label="Real Example: Engaged Stage">
**Contact:** Sarah Chen replied: "Interesting timing — we're actually evaluating tools right now. Can you send pricing?"  
**Action taken:** Sent pricing doc + Calendly link  
**Exit event:** She booked a 30-min demo for Thursday 2pm  
**Time in stage:** 4 days
</ExampleCard>

</Slide>

<Slide title="Stage 4: Meeting">

### Definition
Discovery call, demo, or evaluation meeting scheduled or completed.

### Entry Criteria
- Meeting on calendar (scheduled)
- OR meeting completed and logged

### Exit Criteria
**Move to Proposal when:** Pricing/terms sent after meeting  
**Move to Engaged when:** Need to schedule follow-up meeting  
**Move to Lost when:** Explicit rejection or 30 days no-show/reschedule

### Typical Time in Stage
7-14 days (includes meeting + follow-up)

### Automation Triggers
- Auto-create "Send Proposal" task after meeting marked complete
- Auto-send post-meeting follow-up email template
- Auto-flag if proposal not sent within 7 days of meeting

<InsightCard icon="🎯" title="The Meeting Completion Ritual">
Immediately after every meeting, log: (1) Next step agreed, (2) Decision timeline, (3) Champion identified (Y/N), (4) Objections raised. This becomes your AI agent's reasoning chain in Course 27.
</InsightCard>

</Slide>

<Slide title="Stage 5: Proposal">

### Definition
Pricing, terms, or formal offer sent.

### Entry Criteria
- Pricing doc, proposal, or contract sent
- Logged in CRM with send date

### Exit Criteria
**Move to Won when:** Contract signed, payment received, or verbal "yes" + onboarding started  
**Move to Lost when:** Explicit rejection or 30 days no response to proposal

### Typical Time in Stage
7-21 days (varies by deal size)

### Automation Triggers
- Auto-schedule follow-up call 3 days after proposal sent
- Auto-flag if no response within 14 days
- Auto-create "Negotiation" task if prospect requests changes

<ExampleCard label="Real Example: Proposal Stage">
**Contact:** Sarah Chen  
**Proposal sent:** Custom pricing for 50-seat annual plan ($18K)  
**Follow-up:** Called 4 days later — she's reviewing with CFO  
**Exit event:** Signed contract on Day 12  
**Time in stage:** 12 days
</ExampleCard>

</Slide>

<Slide title="Stage 6: Won/Lost">

### Definition
Deal closed — either customer or dead.

### Entry Criteria (Won)
- Contract signed, payment received, or onboarding started
- Deal marked "Closed Won" with close date

### Entry Criteria (Lost)
- Explicit rejection
- Went with competitor
- No response after multiple follow-ups
- Budget/timing not aligned

### Exit Criteria
None — terminal stage

### Required Fields
- **Close Date:** When deal closed
- **Close Reason (Won):** Why they bought (for pattern analysis)
- **Loss Reason (Lost):** Why they didn't buy (for objection handling)
- **Competitor (Lost):** Who they chose instead (if applicable)

### Automation Triggers (Won)
- Auto-create onboarding tasks
- Auto-send welcome email
- Auto-notify team in Slack

### Automation Triggers (Lost)
- Auto-tag for re-engagement in 90 days
- Auto-add to "Lost Deals" report for monthly review

<InsightCard icon="📊" title="Why Loss Reasons Matter">
Your lost deals are a goldmine. If 60% of losses are "went with competitor X," you have a positioning problem. If 40% are "budget," you have a qualification problem. Track loss reasons religiously.
</InsightCard>

</Slide>
</SlideNavigation>

Now let's test your understanding of when to move deals between stages.

<ClassifyExercise
  title="Classify These Stage Transitions"
  persistKey="crm-setup-L4-classify"
  categories={[
    { id: "correct", label: "Correct Transition", color: "#10b981" },
    { id: "too-early", label: "Too Early", color: "#f59e0b" },
    { id: "too-late", label: "Too Late", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Prospect replied 'Thanks, will review' → Move to Engaged", 
      correctCategory: "correct",
      explanation: "Any reply = engagement, even if lukewarm" 
    },
    { 
      id: "2", 
      content: "Sent cold email → Move to Proposal", 
      correctCategory: "too-early",
      explanation: "You skipped Contacted, Engaged, and Meeting stages" 
    },
    { 
      id: "3", 
      content: "Had great demo call, they loved it → Keep in Meeting stage for 2 weeks", 
      correctCategory: "too-late",
      explanation: "Should move to Proposal immediately after meeting if next step is pricing" 
    },
    { 
      id: "4", 
      content: "Prospect no-showed meeting twice → Move to Lost", 
      correctCategory: "correct",
      explanation: "Two no-shows = not a real opportunity" 
    },
    { 
      id: "5", 
      content: "Sent proposal, they asked for discount → Keep in Proposal stage", 
      correctCategory: "correct",
      explanation: "Negotiation happens in Proposal stage until signed" 
    },
    { 
      id: "6", 
      content: "Prospect said 'maybe next quarter' → Keep in Engaged for 90 days", 
      correctCategory: "too-late",
      explanation: "Move to Lost with reason 'Timing' and re-engage in Q+1" 
    }
  ]}
/>

---

## Pipeline Variants: B2B vs Creator

The 6-stage pipeline works for most B2B sales. But if you're a coach, consultant, or creator selling high-ticket programs, you need a variant.

<ComparisonBuilder
  title="Design Your Pipeline Variant"
  persistKey="crm-setup-L4-variant"
  prompt="Describe your sales process from first touch to payment"
  expertExample="**Creator Pipeline:** Follower → Subscriber → Application Submitted → Call Booked → Call Completed → Enrolled/Lost. Stage 3 (Application) acts as a qualifier — only serious prospects get a call."
  criteria={[
    "Stages map to observable events",
    "Includes a qualification gate before high-touch stages",
    "Terminal stage captures win/loss reason"
  ]}
/>

Here are the two most common variants:

### B2B Volume Pipeline (for outbound-heavy founders)
**Lead → Contacted → Replied → Qualified → Meeting → Proposal → Won/Lost**

The "Qualified" stage sits between "Replied" and "Meeting" — you ask 2-3 qualifying questions via email before booking a call. Saves you from wasting time on tire-kickers.

### Creator/Coach Pipeline (for application funnels)
**Follower → Subscriber → Applicant → Call Booked → Call Completed → Enrolled/Lost**

The "Applicant" stage is your filter. Only people who fill out your application form (with budget/commitment questions) get a call. Typical conversion: 40-60% of applicants book, 20-40% of calls enroll.

<InsightCard icon="🎯" title="The Multi-Pipeline Trap">
Solo founders ask: "Should I have separate pipelines for inbound vs outbound?" Answer: **No.** Use one pipeline with a "Lead Source" field (Inbound, Outbound, Referral). Multiple pipelines = fragmented reporting and double the maintenance.
</InsightCard>

---

## Stage-Based Automation Triggers

Here's where your CRM becomes a **system of action** instead of a passive database.

Every stage should trigger at least one automation. These automations do two things:
1. **Remind you what to do next** (tasks, notifications)
2. **Flag deals that are stalling** (time-based alerts)

<SlideNavigation>
<Slide title="Lead Stage Automations">

### When a contact enters "Lead" stage:
- ✅ Auto-enrich contact data (Apollo, Attio, Clay)
- ✅ Auto-create task: "Research + send first outreach" (due in 48 hours)
- ✅ Auto-assign to owner (if you have a team, otherwise auto-assign to you)

### Time-based triggers:
- 🚨 If in Lead stage for 7+ days → Flag yellow ("Research backlog")

<ExampleCard label="Automation Recipe: Lead Stage">
**Trigger:** New contact created with tag "ICP-fit"  
**Action 1:** Enrich via Apollo API (company size, tech stack, recent funding)  
**Action 2:** Create task "Send first outreach" assigned to you, due in 2 days  
**Action 3:** If still in Lead after 7 days, send Slack notification "Backlog alert: 12 leads not contacted"
</ExampleCard>

</Slide>

<Slide title="Contacted Stage Automations">

### When a deal moves to "Contacted":
- ✅ Auto-schedule follow-up task at Day 3 ("Send follow-up #1")
- ✅ Auto-schedule follow-up task at Day 7 ("Send follow-up #2")
- ✅ Auto-log outreach in activity timeline

### Time-based triggers:
- 🚨 If in Contacted stage for 14+ days with no reply → Auto-move to Lost with reason "No Response"

<InsightCard icon="⚡" title="The 3-Touch Rule">
If someone doesn't reply after 3 touches over 14 days, they're not interested **right now**. Move them to Lost and re-engage in 90 days with a new trigger event (product update, case study, industry news). Don't let them rot in "Contacted" for months.
</InsightCard>

</Slide>

<Slide title="Engaged Stage Automations">

### When a deal moves to "Engaged":
- ✅ Auto-create task: "Book meeting" (due in 3 days)
- ✅ Auto-send meeting scheduler link (if not already sent)
- ✅ Auto-log engagement event (replied, clicked, downloaded)

### Time-based triggers:
- 🚨 If in Engaged stage for 10+ days with no meeting booked → Flag yellow ("Stalled engagement")
- 🚨 If in Engaged stage for 21+ days → Auto-move to Lost with reason "Engagement faded"

</Slide>

<Slide title="Meeting Stage Automations">

### When a deal moves to "Meeting":
- ✅ Auto-create task: "Prepare for meeting" (due 1 day before meeting)
- ✅ Auto-send meeting reminder 24 hours before
- ✅ Auto-create task: "Send proposal" (due 2 days after meeting)

### After meeting marked complete:
- ✅ Auto-send post-meeting follow-up email template
- ✅ Auto-create task: "Log meeting notes" (due same day)

### Time-based triggers:
- 🚨 If meeting completed but no proposal sent within 7 days → Flag red ("Proposal overdue")
- 🚨 If meeting scheduled but no-show → Auto-create task "Reschedule or close lost"

</Slide>

<Slide title="Proposal Stage Automations">

### When a deal moves to "Proposal":
- ✅ Auto-create task: "Follow up on proposal" (due 3 days after send)
- ✅ Auto-log proposal send date and amount
- ✅ Auto-notify team in Slack (if applicable)

### Time-based triggers:
- 🚨 If in Proposal stage for 14+ days with no response → Flag yellow ("Proposal ghosted")
- 🚨 If in Proposal stage for 30+ days → Auto-create task "Close lost or negotiate"

<ExampleCard label="Automation Recipe: Proposal Stage">
**Trigger:** Deal moved to Proposal stage  
**Action 1:** Create task "Call to discuss proposal" due in 3 days  
**Action 2:** If no activity logged within 14 days, send email: "Hey [Name], following up on the proposal I sent. Any questions?"  
**Action 3:** If still no response at Day 30, auto-flag for manual review
</ExampleCard>

</Slide>

<Slide title="Won/Lost Stage Automations">

### When a deal moves to "Won":
- ✅ Auto-create onboarding tasks (kickoff call, send welcome email, add to customer Slack)
- ✅ Auto-update contact lifecycle stage to "Customer"
- ✅ Auto-notify team in Slack with deal value

### When a deal moves to "Lost":
- ✅ Auto-tag contact for re-engagement in 90 days
- ✅ Auto-add to "Lost Deals" monthly review report
- ✅ Auto-send (optional) feedback request: "What made you choose [competitor]?"

</Slide>
</SlideNavigation>

Now let's build your automation plan.

<TemplateBuilder
  title="Your Stage Automation Plan"
  persistKey="crm-setup-L4-automations"
  sections={[
    {
      id: "contacted",
      title: "Contacted Stage Automations",
      fields: [
        { 
          id: "followup-1", 
          label: "When should follow-up #1 trigger?", 
          placeholder: "e.g., 3 days after first outreach", 
          type: "text" 
        },
        { 
          id: "followup-2", 
          label: "When should follow-up #2 trigger?", 
          placeholder: "e.g., 7 days after first outreach", 
          type: "text" 
        },
        { 
          id: "auto-close", 
          label: "When should you auto-close as Lost?", 
          placeholder: "e.g., 14 days no response after 3 touches", 
          type: "text" 
        }
      ]
    },
    {
      id: "meeting",
      title: "Meeting Stage Automations",
      fields: [
        { 
          id: "post-meeting", 
          label: "What should happen immediately after a meeting?", 
          placeholder: "e.g., Send thank-you email, create proposal task", 
          type: "textarea" 
        },
        { 
          id: "proposal-deadline", 
          label: "How many days after a meeting should a proposal be sent?", 
          placeholder: "e.g., 2-3 days", 
          type: "text" 
        }
      ]
    }
  ]}
/>

---

## Pipeline Hygiene Rules

Your pipeline is only useful if it's **accurate**. Garbage in = garbage decisions out.

Here are the non-negotiable hygiene rules:

### Rule 1: Max 30 Days in Any Stage
If a deal sits in one stage for 30+ days, it's either dead or you're avoiding a hard conversation. Review it and either advance it, close it as lost, or schedule a specific next action.

### Rule 2: Every Deal Has a Next Action with a Date
No deal should exist without a task attached. "Waiting on them" isn't a task. "Follow up on proposal" with a due date is.

### Rule 3: Lost Deals Must Have a Reason Code
Don't just mark deals as "Lost" — log **why**. Your loss reasons become your product roadmap and positioning guide.

Common loss reasons:
- Went with competitor (name them)
- Budget/pricing
- Timing (not ready now)
- No response (ghosted)
- Not a fit (ICP mismatch)
- Champion left company

### Rule 4: Weekly Pipeline Sweep (15 Minutes)
Every Friday (or Monday), review:
1. Deals with no activity in 14+ days
2. Deals without a next action
3. Deals that should move stages
4. New duplicates to merge

<InteractiveChecklist 
  title="Your Weekly Pipeline Hygiene Ritual" 
  persistKey="crm-setup-L4-hygiene" 
  items={[
    "Filter deals with no activity in 14+ days and update or close",
    "Verify every open deal has a next action with a due date",
    "Move deals that hit exit criteria to the next stage",
    "Close obviously dead deals with a loss reason",
    "Check for duplicate contacts and merge",
    "Review lost deals from this week for patterns"
  ]} 
/>

Let's practice pipeline hygiene with a simulation.

<MiniRoleplay
  scenario="You're reviewing your pipeline on Friday. You see a deal in 'Proposal' stage for 28 days. The prospect hasn't replied to your last two follow-ups. What do you do?"
  role="You are the founder making a decision"
  persistKey="crm-setup-L4-hygiene-roleplay"
  modelResponse="I'd move it to Lost with reason 'No Response - Proposal.' Then I'd tag the contact for re-engagement in 90 days with a new trigger (product update, case study). Keeping it in Proposal gives me false hope and clutters my pipeline. If they come back, I can reopen the deal."
/>

---

## Your Pipeline Setup Checklist

You've learned the theory. Now let's build it.

<ProgressiveReveal title="Pipeline Setup Steps" persistKey="crm-setup-L4-reveal">

<RevealSection title="Step 1: Create Your 6 Stages">

In your CRM (HubSpot, Attio, Pipedrive, etc.), create these stages:

1. **Lead** (or "New")
2. **Contacted** (or "Outreach Sent")
3. **Engaged** (or "Replied")
4. **Meeting** (or "Demo Scheduled")
5. **Proposal** (or "Offer Sent")
6. **Won** and **Lost** (separate or combined depending on CRM)

**HubSpot:** Settings → Objects → Deals → Pipelines → Edit stages  
**Attio:** Lists → Deals → Configure stages  
**Pipedrive:** Settings → Pipelines → Edit stages  

</RevealSection>

<RevealSection title="Step 2: Define Exit Criteria for Each Stage">

For each stage, write down:
- **What event moves a deal INTO this stage?**
- **What event moves a deal OUT of this stage?**
- **How long should a deal typically stay here?**

Use the definitions from earlier in this lesson as your template.

</RevealSection>

<RevealSection title="Step 3: Set Up Time-Based Flags">

Configure automations (or manual reminders) for:
- Contacted stage: 14 days no activity → flag or auto-close
- Engaged stage: 21 days no meeting booked → flag
- Meeting stage: 7 days post-meeting, no proposal → flag
- Proposal stage: 30 days no response → flag

**HubSpot Starter:** Workflows → Create time-based task  
**Attio:** Automations → Time-based triggers  
**Pipedrive:** Workflow Automation → Time-based conditions  

</RevealSection>

<RevealSection title="Step 4: Create Standard Tasks for Each Stage">

Build task templates that auto-create when a deal enters a stage:

- **Lead → Contacted:** "Research + send first outreach" (due in 48 hours)
- **Contacted → Engaged:** "Book meeting" (due in 3 days)
- **Engaged → Meeting:** "Prepare for call" (due 1 day before meeting)
- **Meeting → Proposal:** "Send proposal" (due 2 days after meeting)
- **Proposal → Won/Lost:** "Log close reason" (due same day)

</RevealSection>

<RevealSection title="Step 5: Add Required Fields for Won/Lost">

Make these fields **required** when closing a deal:

**Won:**
- Close date
- Close reason (why they bought)
- Deal value (if not already tracked)

**Lost:**
- Close date
- Loss reason (dropdown: competitor, budget, timing, no response, not a fit)
- Competitor name (if applicable)

This data becomes your strategic intelligence in Course 41 (Analytics).

</RevealSection>

<RevealSection title="Step 6: Import Your Existing Deals">

If you have deals in a spreadsheet or another CRM:

1. Export to CSV
2. Map columns to your new pipeline stages
3. Import and manually verify 10% of records
4. Delete the spreadsheet (seriously — one source of truth)

</RevealSection>

</ProgressiveReveal>

---

## Test Your Pipeline Design

Let's make sure your pipeline will actually work in practice.

<SwipeDecision
  title="Good Pipeline or Bad Pipeline?"
  description="Swipe right for well-designed pipelines, left for broken ones"
  optionA="Broken"
  optionB="Well-Designed"
  persistKey="crm-setup-L4-swipe"
  cards={[
    { 
      id: "1", 
      content: "Stages: Prospect → Talking → Interested → Closing → Closed", 
      correctOption: "a", 
      explanation: "Too vague. 'Talking' and 'Interested' have no clear exit criteria." 
    },
    { 
      id: "2", 
      content: "Stages: Lead → Contacted → Engaged → Meeting → Proposal → Won/Lost", 
      correctOption: "b", 
      explanation: "Clear, observable transitions at every stage." 
    },
    { 
      id: "3", 
      content: "Stages: Cold → Warm → Hot → Closed", 
      correctOption: "a", 
      explanation: "Temperature metaphors are subjective. What's 'warm' to you vs. me?" 
    },
    { 
      id: "4", 
      content: "12 stages including 'Qualification - Budget Confirmed' and 'Proposal - Legal Review'", 
      correctOption: "a", 
      explanation: "Over-engineered. Solo founders don't need enterprise-level granularity." 
    },
    { 
      id: "5", 
      content: "Stages: Subscriber → Applicant → Call Booked → Enrolled/Lost", 
      correctOption: "b", 
      explanation: "Perfect for a creator/coach pipeline with application funnel." 
    }
  ]}
/>

---

## Action Items: Build Your Pipeline This Week

<InteractiveChecklist 
  title="Your Pipeline Setup Sprint" 
  persistKey="crm-setup-L4-actions" 
  items={[
    "Create 6 pipeline stages in your CRM with clear names",
    "Write exit criteria for each stage (what moves a deal forward)",
    "Set up 3 time-based flags (Contacted 14d, Engaged 21d, Proposal 30d)",
    "Create task templates for each stage transition",
    "Make close reason a required field for Won/Lost deals",
    "Import your existing deals and map them to stages",
    "Schedule your first weekly pipeline hygiene review (15 min)"
  ]} 
/>

**Next Lesson:** We'll set up email logging and contact enrichment so your pipeline is fed with accurate, AI-ready data.

---

## Quiz: Pipeline Stages Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "A prospect replies to your cold email saying 'Not interested right now.' What stage should this deal be in?",
      "options": [
        "Contacted (they haven't really engaged)",
        "Engaged (any reply counts as engagement)",
        "Lost (they said not interested)",
        "Meeting (schedule a follow-up)"
      ],
      "correctAnswer": 1,
      "explanation": "Any reply = engagement, even if negative. Move to Engaged, then follow up in 90 days with a new trigger. Don't close as Lost unless they explicitly say 'never contact me again.'"
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "How long should a deal typically stay in the 'Contacted' stage before you take action?",
      "options": [
        "3-7 days with follow-ups, then close as Lost if no response by Day 14",
        "30 days minimum to give them time to think",
        "Keep following up weekly for 90 days",
        "Move to Lost immediately if they don't reply in 24 hours"
      ],
      "correctAnswer": 0,
      "explanation": "The 3-touch rule: follow up at Day 3 and Day 7. If no response by Day 14, move to Lost with reason 'No Response.' You can re-engage later with a new trigger."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "What's the most important field to require when closing a deal as Lost?",
      "options": [
        "Deal value",
        "Loss reason",
        "Competitor name",
        "Last contact date"
      ],
      "correctAnswer": 1,
      "explanation": "Loss reason is strategic intelligence. If 60% of your losses are 'went with competitor X,' you have a positioning problem. Track this religiously."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "Solo founders should use separate pipelines for inbound vs. outbound leads.",
      "correctAnswer": false,
      "explanation": "False. Use one pipeline with a 'Lead Source' field. Multiple pipelines fragment your reporting and double your maintenance work."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "A prospect had a great demo call and asked you to send pricing. What stage should this deal move to?",
      "options": [
        "Keep in Meeting stage until they confirm interest",
        "Move to Proposal stage immediately",
        "Move to Engaged stage to nurture more",
        "Move to Won stage (they're clearly interested)"
      ],
      "correctAnswer": 1,
      "explanation": "Pricing sent = Proposal stage. Don't wait. The exit criteria for Meeting stage is 'proposal sent' — move it immediately and create a follow-up task."
    }
  ]
}