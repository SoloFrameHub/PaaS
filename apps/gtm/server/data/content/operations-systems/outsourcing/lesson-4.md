---
title: "SOP 2: CRM Updates (Stage, Amount, Next Steps)"
duration: "45 min"
track: "Operations & Systems"
course: "Course 43: Outsourcing & VAs"
lesson: 4
---

## The CRM That Runs Itself (Almost)

A CRM that you update is better than no CRM. A CRM that your VA updates is better still. But the goal isn't just to have current data — it's to have data that tells you exactly what to do next without you having to think about it.

In this lesson, you'll build the CRM Update SOP: the exact procedure your VA follows every day to keep your pipeline accurate, your next steps current, and your deal data AI-ready. When this SOP is running well, you can open your CRM at any moment and trust what you see.

Without a CRM Update SOP, what typically happens is this: you're great at updating the CRM right after a call because the energy is high. But three days later, after 15 other things have happened, that deal's stage is wrong, the next step date is yesterday, and the amount is whatever you guessed six weeks ago. Your pipeline report becomes fiction.

<InsightCard icon="🗄️" title="Why CRM Data Hygiene Is a Revenue Issue">
91% of CRM data goes stale within 12 months without active maintenance. Deals without documented next actions die twice as fast as deals with clear next steps. And if you're building AI agents (Course 27), stale or unstructured CRM data makes those agents unreliable. Your VA running a 20-minute daily CRM routine is the lowest-cost fix for all three problems.
</InsightCard>

## What Your VA Will Update Daily

The CRM Update SOP has five components, each taking 3-5 minutes. Total time: 15-20 minutes per day.

<SlideNavigation>
<Slide title="Step 1: Email-to-Stage Updates (5 min)">

Your VA checks your inbox (already triaged per Lesson 3 SOP) for emails that indicate deal progress. For each email that represents activity on an open deal, they update the corresponding CRM record.

**Stage update rules (define these for your specific pipeline):**
- Email sent to prospect → deal moves to "Contacted" if it was in "New"
- Prospect replies with interest → deal moves to "Engaged"
- Meeting confirmed → deal moves to "Meeting Scheduled"
- Proposal sent → deal moves to "Proposal Sent"
- Contract sent → deal moves to "Contract Out"

**The cardinal rule:** VA only updates stages when the evidence is clear. If the email is ambiguous — a quick reply that doesn't confirm next steps — the VA logs the email as activity but does NOT move the stage. Ambiguous stage moves get flagged with a note: "Possible Engaged — founder to confirm."

</Slide>

<Slide title="Step 2: Next Actions Audit (3 min)">

Every active deal in your pipeline must have a "Next Action" field with a specific date. This is non-negotiable.

Your VA runs this filter daily: **"Show all active deals where Next Action date is missing or in the past."**

For each deal that surfaces:
- **Missing next action:** VA flags with note: "No next step — founder to assign."
- **Overdue next action:** VA flags with note: "Next step overdue since [date] — please review."

The VA never assigns next actions themselves — they only flag. You set the actions; the VA monitors whether they exist and are current.

</Slide>

<Slide title="Step 3: Amount and Close Date Updates (3 min)">

When pricing is discussed explicitly in email correspondence, your VA updates the deal amount. When a prospect mentions a timeline ("we need this by Q2"), your VA updates the expected close date.

**The rule:** VA only updates based on explicit information. Never estimate, never guess.

- "We're working with a $15K budget" → Update deal amount to $15,000
- "We need this in place by April 15" → Update close date to April 15
- "We're looking at a few options" → No amount update (ambiguous)

Amount and close date accuracy directly affects your pipeline value calculation and your revenue forecasting. Over-optimistic estimates here create false confidence.

</Slide>

<Slide title="Step 4: Meeting Note Entry (5 min)">

After your calls, you'll have raw notes — bullet points, fragments, things you jotted while the prospect was talking. Your VA takes these and enters them into CRM in a structured format.

**The meeting note template:**
- **Attendees:** Full names and roles
- **Topics Discussed:** Key themes from the conversation
- **Prospect's Priorities:** What matters most to them right now
- **Next Steps:** Who does what by when (specific)
- **Follow-Up Owner:** You, VA, or someone else

You send your raw notes to your VA via Slack or a shared Notion page. VA formats them using the template and enters into CRM. This should take under 5 minutes per meeting for a trained VA.

</Slide>

<Slide title="Step 5: Data Quality Spot-Check (4 min)">

Weekly (not daily), your VA runs a 5-record quality check: pull 5 random CRM contacts and verify each has the required fields populated.

**Required fields per contact (define yours):**
- Full name
- Company name
- Email (primary)
- Lead source
- ICP fit score (1-10)
- Last interaction date

For any contacts missing required fields, VA either fills them (if the information is findable in existing emails or LinkedIn) or flags them with a note: "Missing [field] — verify or delete contact."

</Slide>
</SlideNavigation>

## Defining Your Stage Update Rules

Your pipeline stages are unique to your business. The SOP only works if your VA knows exactly what evidence justifies moving a deal from one stage to the next.

<TemplateBuilder
  title="CRM Stage Update Rules"
  persistKey="outsourcing-L4-stages"
  sections={[
    {
      id: "stages",
      title: "Your Pipeline Stages",
      fields: [
        { id: "stage1", label: "Stage 1 Name + Move-Forward Evidence", placeholder: "e.g., New → Contacted: Evidence = outbound email sent to prospect from your address", type: "textarea" },
        { id: "stage2", label: "Stage 2 Name + Move-Forward Evidence", placeholder: "e.g., Contacted → Engaged: Evidence = prospect replies with any interest signal", type: "textarea" },
        { id: "stage3", label: "Stage 3 Name + Move-Forward Evidence", placeholder: "e.g., Engaged → Meeting Scheduled: Evidence = calendar invite accepted, both parties confirmed", type: "textarea" },
        { id: "stage4", label: "Stage 4 Name + Move-Forward Evidence", placeholder: "e.g., Meeting Scheduled → Proposal: Evidence = proposal document sent via email", type: "textarea" },
        { id: "stage5", label: "Stage 5 Name + Move-Forward Evidence", placeholder: "e.g., Proposal → Closed Won: Evidence = signed contract or payment received", type: "textarea" }
      ]
    },
    {
      id: "ambiguous",
      title: "Ambiguous Situations",
      fields: [
        { id: "flag-rule", label: "When Should VA Flag Instead of Update?", placeholder: "e.g., If it's unclear whether a reply is interest or just acknowledgment, VA logs email as activity but does NOT move the stage. Flags with 'Founder to confirm stage.'", type: "textarea" }
      ]
    }
  ]}
/>

## Practice: Can Your VA Make This Call?

<SwipeDecision
  title="Stage Update Judgment Calls"
  description="For each email scenario, decide: should the VA update the stage, or flag for founder review?"
  optionA="VA Flags for Founder"
  optionB="VA Updates Stage"
  persistKey="outsourcing-L4-swipe"
  cards={[
    { id: "1", content: "Email: 'Hey, got your message. Will check with my team and get back to you.' Deal is currently in 'Contacted'.", correctOption: "a", explanation: "Ambiguous — not a clear interest signal. VA logs email as activity but does NOT move to 'Engaged.' Flag as 'Possible interest — founder to confirm.'" },
    { id: "2", content: "Email: 'Yes, I'd love to see a demo. Does Thursday work?' Deal is currently in 'Contacted'.", correctOption: "b", explanation: "Clear signal — explicit meeting request. VA updates to 'Meeting Scheduled' and logs the email." },
    { id: "3", content: "Email: 'Our budget is around $12,000. Can you make that work?' Deal has no amount set.", correctOption: "b", explanation: "Explicit budget information. VA updates deal amount to $12,000 and notes source email in CRM." },
    { id: "4", content: "Email: 'We might be interested in something like this down the road.' Deal is currently in 'New'.", correctOption: "a", explanation: "Vague future interest. VA logs email as activity. No stage change — 'down the road' does not constitute engagement." },
    { id: "5", content: "Email: 'Attached is the signed contract. Payment incoming.' Deal is in 'Contract Out'.", correctOption: "b", explanation: "Crystal clear — closed won. VA updates stage to 'Closed Won', logs date, adds note. Alerts founder." }
  ]}
/>

## The Meeting Note Template

One of the highest-value things your VA does is transform your post-call scribbles into structured CRM records. Here's what that process looks like in practice:

<ExampleCard label="Example: Raw Notes vs. Structured CRM Entry">
**What you send your VA (raw notes):**
"Called Priya @ Rowantech. Good call. She runs sales ops, 12-person team. They're using Salesforce but it's a mess, nobody updates it. Big pain around pipeline visibility. Budget seems fine, mentioned $15-20K range. Q2 timeline. Wants to see a sample audit first. Send her the case study. Follow up Friday."

**What your VA enters in CRM:**

Attendees: Priya Sharma (VP Sales Operations, Rowantech) | Mike Chen (Founder)

Topics Discussed: Current Salesforce implementation, pipeline visibility challenges, data hygiene issues across 12-person sales team

Prospect's Priorities: Clean, reliable pipeline data that leadership can trust; faster reporting; reducing manual work for SDR team

Next Steps: [Founder] Send Rowantech case study by EOD today. [Founder] Follow up call Friday to discuss findings and proposal timeline.

Expected Timeline: Q2 implementation target
Budget Indication: $15,000-20,000
Follow-Up Owner: Founder
</ExampleCard>

## The Daily CRM Routine in Practice

<ScenarioSimulator
  title="VA Time Investment vs. Founder Time Saved"
  persistKey="outsourcing-L4-sim"
  levers={[
    { id: "deals", label: "Active Deals in Pipeline", min: 10, max: 80, step: 5, defaultValue: 40 },
    { id: "meetings", label: "Calls per Week (needing note entry)", min: 0, max: 20, step: 1, defaultValue: 5 },
    { id: "va_rate", label: "VA Hourly Rate ($)", min: 3, max: 35, step: 1, defaultValue: 6 }
  ]}
  outputs={[
    { id: "va_daily_min", label: "VA Daily CRM Time", formula: "15 + (deals * 0.2) + (meetings * 5)", unit: "min", precision: 0 },
    { id: "founder_saved_hrs", label: "Founder Hours Saved (Monthly)", formula: "((15 + (deals * 0.2) + (meetings * 5)) / 60) * 20", unit: "hrs", precision: 1 },
    { id: "va_monthly_cost", label: "VA Monthly Cost for This Task", formula: "((15 + (deals * 0.2) + (meetings * 5)) / 60) * va_rate * 20", unit: "$", precision: 0 }
  ]}
  insight="Your VA spends `{va_daily_min}` minutes/day on CRM updates, saving you `{founder_saved_hrs}` hours per month at a cost of $`{va_monthly_cost}`. If your time is worth $75/hour, that's ${founder_saved_hrs * 75} in founder time for $`{va_monthly_cost}` in VA cost."
/>

## Handling Edge Cases: When the VA Isn't Sure

Your VA will encounter situations your SOP doesn't explicitly cover. Here's how to handle them:

<ProgressiveReveal title="Common CRM Update Edge Cases" persistKey="outsourcing-L4-edge">

<RevealSection title="Edge Case 1: Email Thread with Multiple Deals">

A prospect emails about two different services in one thread. What stage gets updated?

**Rule:** Create separate deals if they're genuinely different offerings. Log the email as activity on both. Flag for founder to confirm whether to pursue both or prioritize one.

</RevealSection>

<RevealSection title="Edge Case 2: Deal Moved Backward">

A deal was in "Proposal Sent" but the prospect emails asking to restart the conversation from scratch. Does the stage move back?

**Rule:** VA does NOT move stages backward. Only founders move deals backward — backward movement requires judgment about whether this is a reset or a delay. VA flags with note: "Prospect email suggests possible reset — founder review needed for stage."

</RevealSection>

<RevealSection title="Edge Case 3: New Contact Replies to Old Campaign">

Someone replies to a cold email you sent six months ago, but you don't have them in your CRM. What happens?

**Rule:** VA creates a new CRM contact, logs the email as "Reply to cold outreach," and flags for founder as a Lead. Date the contact creation accurately and note it's a delayed reply.

</RevealSection>

<RevealSection title="Edge Case 4: Prospect Sends a Referral">

A current customer forwards an email introducing you to a new prospect.

**Rule:** VA creates a new contact for the referred prospect, links them in CRM to the referring customer, and flags as a high-priority Lead with note: "Referred by [customer name] — warm intro."

</RevealSection>

</ProgressiveReveal>

## Quality Standards and QA

<InteractiveChecklist
  title="Weekly CRM Update QA Checklist"
  persistKey="outsourcing-L4-qa"
  items={[
    "Spot-check 5 random deals — are stages accurate based on most recent email activity?",
    "Verify every active deal has a Next Action date that is not in the past",
    "Check 3 recent meeting notes — are they structured correctly and complete?",
    "Run 'Deals with no activity in 14 days' filter — are all of these flagged?",
    "Verify deal amounts were updated when pricing was discussed in email",
    "Check 5 random contacts for required field completeness"
  ]}
/>

<InsightCard icon="📈" title="Target: 95% CRM Completeness">
By week four, your VA should maintain 95%+ completeness on required fields and next actions. Track this with your weekly QA spot-check. If you're consistently seeing gaps in the same area, the SOP needs a clearer rule — not a better VA.
</InsightCard>

<InteractiveChecklist
  title="Your Action Items Before Lesson 5"
  persistKey="outsourcing-L4-actions"
  items={[
    "Define your pipeline stages and the specific evidence needed to move each stage forward",
    "Write your meeting note template in a shared Notion or Google Doc for VA reference",
    "Complete the CRM Stage Update Rules using the TemplateBuilder above",
    "Identify the required fields every CRM contact must have in your system",
    "Set up a process for sending your VA raw meeting notes (Slack message, Notion page, or shared doc)",
    "Read Lesson 5 to build SOP 3: Prospect Research"
  ]}
/>

## What's Next

In **Lesson 5**, you'll build the Prospect Research SOP — the document that tells your VA exactly how to research a target prospect and produce a one-page Prospect Brief before you send outreach. This is where delegation starts generating pipeline quality, not just saving admin time.
