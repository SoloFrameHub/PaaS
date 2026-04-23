---
title: "CRM Hygiene: Keeping Data Clean"
duration: "45 min"
track: "Operations & Systems"
course: "Course 40: Advanced CRM Setup"
lesson: 7
---

## The $47K Deal That Died in a Spreadsheet

Meet Alex, a technical founder who'd built a beautiful CRM schema in Lesson 6. Structured fields, AI-ready event logs, the works. Three months later, their biggest deal ever — $47K annual contract — went dark.

The prospect had replied twice, shown interest, even asked for pricing. But Alex never saw those emails. Why? They were still checking a Google Sheet for "active deals" instead of their CRM. The CRM said "Contacted." The spreadsheet said "Hot Lead." Reality said "Lost to competitor who followed up."

**The lesson:** A perfect CRM schema is worthless if the data inside it is lies.

<InsightCard icon="🧹" title="The 30% Decay Problem">
Without active hygiene, your CRM data decays at roughly 30% per year. Contacts change jobs. Emails bounce. Deals go stale. In 12 months, nearly a third of your "active pipeline" is fiction.
</InsightCard>

This lesson is about the **15 minutes per week** that prevents that decay. Not sexy. Not optional.

---

## The Weekly 15-Minute Sweep

Most solo founders treat CRM hygiene like flossing — they know they should, but only do it before the dentist appointment (investor meeting, board review, tax season).

Here's the truth: **hygiene is a weekly ritual, not a quarterly cleanup project.**

The protocol takes exactly 15 minutes:

<SlideNavigation>
<Slide title="Minutes 0-3: Flag Stale Deals">

Filter your pipeline for deals with **no activity in 14+ days**. Not "no meetings" — no *activity*. No emails sent, no notes logged, no calls attempted.

In most CRMs:
- **HubSpot**: Filter by "Last Activity Date" < 14 days ago
- **Attio**: Sort by "Last Touched" ascending
- **Pipedrive**: Filter "Activities" = None in last 14 days
- **Close**: Smart View "Stale Deals" (built-in)

You're looking for deals that have **fallen through the cracks**, not deals waiting on scheduled next steps.

</Slide>

<Slide title="Minutes 3-8: Triage Each Stale Deal">

For every flagged deal, make one of four decisions:

1. **Advance** — Move to next stage if there's been progress you forgot to log
2. **Follow Up** — Create a task to re-engage (email, call, LinkedIn)
3. **Close as Lost** — If they've ghosted for 30+ days, accept it
4. **Merge** — If you found a duplicate, combine them now

The key: **every deal must have a next action with a date**. "Waiting on them" is not a next action. "Send break-up email Friday" is.

</Slide>

<Slide title="Minutes 8-11: Verify Next Actions">

Filter your entire pipeline for deals **without a scheduled next action**.

This is the most common CRM failure mode: deals sitting in "Meeting" stage with no meeting scheduled, or "Proposal" stage with no follow-up task.

For each deal missing a next action:
- Add a specific task (not "follow up" — "send case study via email")
- Set a date (not "next week" — "Thursday 2pm")
- Assign it to yourself (even though you're solo, explicit ownership matters)

</Slide>

<Slide title="Minutes 11-13: Dedupe Check">

Run your CRM's duplicate detection tool. Most have one:
- **HubSpot**: Settings → Data Management → Duplicates
- **Attio**: Automatically flags duplicates in sidebar
- **Pipedrive**: Tools → Duplicate Finder
- **Close**: Reports → Duplicate Contacts

Merge any duplicates **immediately**. Don't defer this. Duplicates corrupt your pipeline math and confuse AI agents.

</Slide>

<Slide title="Minutes 13-15: Pattern Review">

Look at your "Lost" deals from the past week. Group them by loss reason:
- Went with competitor
- No budget
- Ghosted / No response
- Timing not right
- Not a fit

If you see a pattern (e.g., 3 deals lost to "no budget" this month), that's a signal. Maybe your pricing is off. Maybe you're targeting too small. Maybe your value prop isn't landing.

**Don't just log losses. Learn from them.**

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Your Weekly Sweep Checklist" 
  persistKey="crm-setup-L7-weekly-sweep"
  items={[
    "Filter for deals with no activity in 14+ days",
    "Triage each stale deal (advance, follow up, close, or merge)",
    "Verify every deal has a next action with a date",
    "Run duplicate detection and merge any found",
    "Review lost deals for patterns"
  ]}
/>

---

## The Stale Deal Escalation Ladder

Not all stale deals are equally dead. Some are just waiting on a scheduled call. Others have been ghosting you for six weeks.

Here's the escalation protocol that keeps your pipeline honest:

<FlipCard 
  front="14 Days: Yellow Flag" 
  back="No activity for 2 weeks → Flag as 'At Risk' and create a personal follow-up task. This is your 'I haven't forgotten you' moment." 
/>

<FlipCard 
  front="30 Days: Red Flag" 
  back="No activity for a month → Flag as 'Stalled' and send a break-up email. 'Hey [Name], I haven't heard back — should I assume this isn't a priority right now?'" 
/>

<FlipCard 
  front="45 Days: Auto-Close" 
  back="No activity for 45+ days → Automatically move to Lost with reason 'Gone Dark.' Exception: deals with a scheduled future action (e.g., 'reconnect in Q2')." 
/>

This ladder does two things:

1. **Forces honesty** — Your pipeline value is real, not inflated by zombie deals
2. **Triggers action** — The 30-day break-up email often revives dead deals ("Sorry, crazy month, let's talk")

<RangeSlider 
  label="What % of your current pipeline is actually dead?" 
  min={0} 
  max={100} 
  lowLabel="0% (pristine)" 
  highLabel="100% (all zombies)" 
  persistKey="crm-setup-L7-dead-pipeline" 
/>

Industry average: **60% of deals in the typical pipeline are already dead.** If you scored above 40%, you're not alone. You just need hygiene.

---

## Duplicate Detection: The Hidden Pipeline Killer

Here's a scenario: You meet Sarah at a conference. Add her to your CRM. Two weeks later, she fills out a form on your website. Your CRM creates a *second* Sarah. Now you have:

- Sarah #1: Stage = "Contacted," Last Activity = 14 days ago
- Sarah #2: Stage = "Lead," Last Activity = today

Which one is real? **Both. And neither.**

Your pipeline now shows two Sarahs. Your AI agents will treat them as separate people. Your email sequences might send duplicate messages. Your analytics are wrong.

<ExampleCard label="Case Study: The Duplicate Disaster">

A B2B SaaS founder had 847 contacts in their CRM. After running dedupe, they had **612**. They'd been inflating their "total addressable contacts" by 38% with duplicates.

Worse: 23 active deals were duplicates. Their pipeline value was overstated by $180K. When they closed their first "big deal," they realized they'd already lost it under a different contact record.

</ExampleCard>

### How Duplicates Happen

1. **Manual entry** — You add someone, forget, add them again
2. **Form submissions** — Website form creates new contact instead of updating existing
3. **Email sync** — Different email addresses for same person (work vs personal)
4. **Imports** — CSV upload doesn't match existing records
5. **Integrations** — Zapier creates new contact instead of finding existing

### The Monthly Dedupe Ritual

Once a month (first Monday works well), run your CRM's duplicate finder and merge everything it flags.

**Merging rules:**
- Keep the record with **more complete data** (more fields filled)
- Preserve **all activity history** from both records
- Use the **most recent email address** as primary
- Merge **all associated deals** into the surviving record

<ClassifyExercise
  title="Duplicate or Different Person?"
  persistKey="crm-setup-L7-dedupe-classify"
  categories={[
    { id: "duplicate", label: "Duplicate (Merge)", color: "#ef4444" },
    { id: "different", label: "Different Person (Keep Both)", color: "#10b981" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Sarah Chen (sarah@company.com) and Sarah Chen (sarah.chen@company.com)", 
      correctCategory: "duplicate",
      explanation: "Same person, different email format. Merge and keep both emails." 
    },
    { 
      id: "2", 
      content: "John Smith at Acme Corp and John Smith at Beta Inc", 
      correctCategory: "different",
      explanation: "Common name, different companies. Likely different people." 
    },
    { 
      id: "3", 
      content: "Mike Johnson (mike@startup.io) and Michael Johnson (m.johnson@startup.io)", 
      correctCategory: "duplicate",
      explanation: "Mike = Michael, same domain. Merge." 
    },
    { 
      id: "4", 
      content: "Lisa Park (lisa@agency.com) and Lisa Park (lisa@gmail.com)", 
      correctCategory: "duplicate",
      explanation: "Same person, work vs personal email. Merge and keep both." 
    }
  ]}
/>

---

## Data Decay: The 2.3-Year Job Change Problem

Your champion at Acme Corp just changed jobs. You don't know yet. Your CRM still says "VP of Marketing at Acme Corp."

You send an email. It bounces. Or worse, it goes to their replacement, who has no idea who you are.

**The stats:**
- Average job tenure: **2.3 years** for roles below Director level
- Email decay rate: **2-3% per month** (bounces, job changes, domain changes)
- Contact data accuracy after 12 months: **~70%** without active verification

<InsightCard icon="📉" title="The Decay Curve">
Month 0: 100% accurate. Month 6: ~85% accurate. Month 12: ~70% accurate. Month 24: ~50% accurate.

Without quarterly verification, half your CRM is wrong after two years.
</InsightCard>

### Quarterly Verification Protocol

Every 90 days, verify your **active pipeline contacts** (not your entire database — that's too much work).

**Active pipeline = anyone in a deal that's not Won or Lost.**

For each active contact:

1. **Email verification** — Use Hunter.io (free tier: 25/month) or NeverBounce to check if email is valid
2. **LinkedIn check** — Visit their LinkedIn profile. Still at the same company? Same role?
3. **Enrichment refresh** — Re-run Apollo or Attio enrichment to catch job changes

If they've changed jobs:
- Update their company and role
- Check if the **new company** is still a fit for your ICP
- If yes, update the deal context ("Sarah moved to Beta Inc, still owns this problem")
- If no, close the deal as Lost ("Champion left, new company not a fit")

<TemplateBuilder
  title="Contact Verification Log"
  persistKey="crm-setup-L7-verification-log"
  sections={[
    {
      id: "contact",
      title: "Contact Details",
      fields: [
        { id: "name", label: "Contact Name", placeholder: "e.g., Sarah Chen", type: "text" },
        { id: "last-verified", label: "Last Verified Date", placeholder: "e.g., 2025-01-15", type: "date" }
      ]
    },
    {
      id: "verification",
      title: "Verification Results",
      fields: [
        { id: "email-status", label: "Email Status", placeholder: "e.g., Valid / Bounced / Catch-all", type: "text" },
        { id: "linkedin-check", label: "LinkedIn Status", placeholder: "e.g., Same role / Changed jobs to X", type: "textarea" },
        { id: "action-needed", label: "Action Required", placeholder: "e.g., Update company field, close deal, re-enrich", type: "textarea" }
      ]
    }
  ]}
/>

---

## The "One Source of Truth" Rule

You have a CRM. You also have:
- A Google Sheet with "hot leads"
- A Notion doc with "Q1 targets"
- A Slack thread with "people to follow up with"
- A notebook with scribbled names from a conference

**One of these is wrong. Probably all of them.**

The "One Source of Truth" rule is simple: **If data exists in two places, one is a lie.**

Your CRM is the authority. Everything else is a draft, a note, or a graveyard.

### Killing the Spreadsheet

The hardest part of CRM hygiene is **trusting your CRM** enough to delete the backup spreadsheet.

Here's the test: Can you answer these questions from your CRM alone?

<InteractiveChecklist 
  title="CRM Trust Test" 
  persistKey="crm-setup-L7-trust-test"
  items={[
    "How many deals are in 'Meeting' stage right now?",
    "What's my total pipeline value?",
    "Who should I follow up with this week?",
    "Which deals have gone 14+ days without activity?",
    "What's my average deal size?",
    "How many deals did I close last month?"
  ]}
/>

If you can't answer all six from your CRM in under 60 seconds, your CRM isn't your source of truth yet.

**The migration:**
1. Export your spreadsheet as CSV
2. Import into your CRM (map columns to fields)
3. Verify the import worked (spot-check 10 records)
4. **Delete the spreadsheet**

Yes, delete it. Not archive. Delete. If you keep it "just in case," you'll keep updating it, and you'll have two sources of truth again.

<FlipCard 
  front="What if I lose data?" 
  back="You won't. CRMs have export functions. You can always get your data back. But keeping a parallel spreadsheet guarantees data divergence." 
/>

---

## Hygiene Automation: Let Robots Do the Boring Parts

You don't need to manually flag every stale deal. You can automate most of the 15-minute sweep.

Here are the three automations every solo founder should set up:

### 1. Auto-Flag Stale Deals

**Trigger:** Deal has no activity for 14 days
**Action:** Add tag "At Risk" and create task "Follow up on [Deal Name]"

**How to build:**
- **HubSpot Starter**: Workflow → Deal-based → "Last Activity Date is more than 14 days ago" → Add to list "Stale Deals"
- **Attio**: Automation → "Last Touched > 14 days" → Add tag "Stale"
- **Pipedrive**: Workflow Automation → "No activity in 14 days" → Create activity "Follow up"
- **Zapier/Make**: CRM trigger → Filter "Last Activity > 14 days" → Update deal + create task

### 2. Auto-Archive Bounced Emails

**Trigger:** Email bounces (hard bounce, not soft)
**Action:** Add tag "Invalid Email" and remove from active sequences

**How to build:**
- **HubSpot**: Native — automatically marks contacts as "Bounced"
- **Attio**: Email sync detects bounces, flags contact
- **Instantly/Smartlead**: Webhook on bounce → Zapier → Update CRM contact
- **Close**: Native bounce handling

### 3. Auto-Tag Inactive Contacts

**Trigger:** Contact hasn't engaged (opened email, clicked link, replied) in 90 days
**Action:** Add tag "Inactive - 90 days"

**How to build:**
- **HubSpot**: Workflow → Contact-based → "Last Engagement Date is more than 90 days ago" → Add to list "Inactive"
- **Attio**: Automation → "Last Email Opened > 90 days" → Add tag "Inactive"
- **Pipedrive**: Filter → "Last Activity > 90 days" → Bulk tag
- **Zapier**: Scheduled trigger (weekly) → Fetch contacts → Filter by last activity → Tag

<ScenarioSimulator
  title="Hygiene Automation ROI"
  persistKey="crm-setup-L7-automation-roi"
  levers={[
    { id: "deals", label: "Active deals in pipeline", min: 10, max: 200, step: 10, defaultValue: 50 },
    { id: "staleRate", label: "% that go stale monthly", min: 10, max: 50, step: 5, defaultValue: 30 }
  ]}
  outputs={[
    { 
      id: "stalePer Month", 
      label: "Stale deals per month", 
      formula: "(deals * (staleRate / 100))", 
      unit: " deals", 
      precision: 0 
    },
    { 
      id: "timeSaved", 
      label: "Time saved per month", 
      formula: "(deals * (staleRate / 100) * 3 / 60)", 
      unit: " hours", 
      precision: 1 
    }
  ]}
  insight="At {stalePer Month} stale deals/month, automation saves you {timeSaved} hours of manual flagging. That's {timeSaved * 4} hours per quarter."
/>

---

## The Weekly CRM Rhythm

Hygiene isn't a one-time project. It's a **weekly rhythm**.

Here's the full weekly CRM ritual for solo founders:

<ProgressiveReveal title="Your Weekly CRM Rhythm" persistKey="crm-setup-L7-rhythm">

<RevealSection title="Monday Morning (15 min): Pipeline Review">

Start your week by reviewing your pipeline:
- Run the 15-minute sweep (stale deals, next actions, dedupes, loss patterns)
- Identify your **top 3 deals** for the week (highest value × highest probability)
- Block time on your calendar for those 3 deals

This is your "what matters this week" filter.

</RevealSection>

<RevealSection title="Wednesday (As-You-Go): Log Meeting Notes">

After every call or meeting, log notes **immediately**. Not at the end of the day. Not on Friday. Now.

Use structured fields, not free-text:
- **Outcome**: Positive / Neutral / Negative (dropdown)
- **Next Action**: Specific task with date
- **Key Insight**: One-sentence summary
- **Objections Raised**: Multi-select (Budget, Timing, Competitor, Fit)

This takes 2 minutes per meeting. Deferring it costs 10 minutes of "wait, what did they say?"

</RevealSection>

<RevealSection title="Friday Afternoon (15 min): Hygiene Sweep">

End your week by cleaning up:
- Run the 15-minute sweep again (yes, twice a week if your pipeline is active)
- Archive any deals that closed this week
- Update deal values if anything changed
- Review your "Lost" deals and log loss reasons

This keeps your pipeline accurate for Monday's review.

</RevealSection>

</ProgressiveReveal>

<InsightCard icon="⏱️" title="Total Time Investment">
30 minutes per week (2 sweeps × 15 min) + 2 minutes per meeting for notes.

For a solo founder with 5 meetings/week, that's **40 minutes total**. Less than 1% of your work week. But it prevents the 30% annual decay that kills pipelines.
</InsightCard>

---

## Hygiene Fire Drill: Can You Survive an Audit?

Imagine this: An investor asks to see your pipeline. Or a potential acquirer wants to verify your revenue claims. Or you're applying for a loan and need to show active deals.

Can your CRM survive an audit?

<TimedChallenge
  title="Pipeline Audit Simulation"
  persistKey="crm-setup-L7-audit-challenge"
  timeLimit={120}
  items={[
    { 
      id: "1", 
      prompt: "Deal in 'Proposal' stage for 60 days with no next action", 
      correctAnswer: "fail", 
      explanation: "Stale deal with no next step = not a real opportunity" 
    },
    { 
      id: "2", 
      prompt: "Deal in 'Meeting' stage with a call scheduled for next week", 
      correctAnswer: "pass", 
      explanation: "Active deal with clear next step" 
    },
    { 
      id: "3", 
      prompt: "Contact with bounced email still marked as 'Active Lead'", 
      correctAnswer: "fail", 
      explanation: "Invalid contact inflates your addressable market" 
    },
    { 
      id: "4", 
      prompt: "Deal closed 3 months ago still showing in 'Won' stage", 
      correctAnswer: "pass", 
      explanation: "Won deals should stay visible for reporting" 
    },
    { 
      id: "5", 
      prompt: "Two contacts with same email address in different companies", 
      correctAnswer: "fail", 
      explanation: "Duplicate that corrupts your contact count" 
    }
  ]}
/>

**Audit-ready CRM checklist:**
- No deals without next actions
- No stale deals older than 45 days (unless explicitly marked "Long Cycle")
- No duplicates
- No bounced emails in active pipeline
- Loss reasons logged for all Lost deals
- Pipeline value matches sum of deal values (no orphaned deals)

---

## Summary: The 15 Minutes That Save Your Pipeline

CRM hygiene isn't glamorous. It's not a growth hack. It won't 10x your revenue.

But it's the difference between a CRM that **tells you the truth** and a CRM that **lies to you**.

The 15-minute weekly sweep prevents:
- Zombie deals inflating your pipeline
- Duplicates corrupting your contact count
- Stale deals dying from neglect
- Data decay making your CRM useless
- Lost deals repeating the same mistakes

And it enables:
- AI agents that can reason on clean data (Course 27)
- Analytics that reflect reality (Course 41)
- Confident answers when investors ask "What's your pipeline?"

<InteractiveChecklist 
  title="Your CRM Hygiene Action Items" 
  persistKey="crm-setup-L7-actions"
  items={[
    "Schedule 15-minute CRM sweep every Monday and Friday",
    "Set up auto-flag automation for deals with no activity in 14+ days",
    "Run duplicate detection and merge any found",
    "Verify top 10 active pipeline contacts (email + LinkedIn)",
    "Implement stale deal escalation ladder (14/30/45 days)",
    "Delete any parallel spreadsheets or Notion docs tracking deals",
    "Log meeting notes immediately after calls (structured fields only)",
    "Review lost deals monthly for patterns"
  ]}
/>

---

## Quiz: CRM Hygiene Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is the primary purpose of the weekly 15-minute CRM sweep?",
      "options": [
        "To add more custom fields to your CRM",
        "To prevent data decay and keep your pipeline honest",
        "To impress investors with a clean interface",
        "To practice using CRM features"
      ],
      "correctAnswer": 1,
      "explanation": "The weekly sweep prevents the 30% annual data decay that kills pipeline accuracy. It's about truth, not aesthetics."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "At what point should a deal with no activity be automatically moved to Lost?",
      "options": [
        "7 days",
        "14 days (yellow flag)",
        "30 days (red flag)",
        "45 days (auto-close)"
      ],
      "correctAnswer": 3,
      "explanation": "The escalation ladder: 14 days = yellow flag, 30 days = red flag + break-up email, 45 days = auto-close as Lost (unless there's a scheduled future action)."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "What percentage of the average sales pipeline is typically already dead?",
      "options": [
        "10-20%",
        "30-40%",
        "60%",
        "80-90%"
      ],
      "correctAnswer": 2,
      "explanation": "Industry research shows 60% of deals in the typical pipeline are already dead. Hygiene brings this down to 20-30%."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "You should keep a backup spreadsheet of your deals 'just in case' your CRM fails.",
      "correctAnswer": false,
      "explanation": "The 'One Source of Truth' rule: if data exists in two places, one is a lie. Your CRM should be the only authority. Parallel spreadsheets guarantee data divergence."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "How often should you verify active pipeline contacts (email + LinkedIn check)?",
      "options": [
        "Weekly",
        "Monthly",
        "Quarterly (every 90 days)",
        "Annually"
      ],
      "correctAnswer": 2,
      "explanation": "Quarterly verification catches job changes and email decay before they corrupt your pipeline. Weekly is overkill; annually is too late."
    },
    {
      "id": "q6",
      "type": "multiple-choice",
      "question": "Which of these is NOT a valid reason to merge two contact records?",
      "options": [
        "Same name, same company, different email formats (sarah@co.com vs s.jones@co.com)",
        "Same name, different companies (John Smith at Acme vs John Smith at Beta)",
        "Same person, work email vs personal email",
        "Obvious typo in one record (Sara Chen vs Sarah Chen, same email)"
      ],
      "correctAnswer": 1,
      "explanation": "Same name, different companies = likely different people (especially common names like John Smith). Don't merge without verifying they're the same person."
    },
    {
      "id": "q7",
      "type": "true-false",
      "question": "Every deal in your pipeline must have a next action with a specific date.",
      "correctAnswer": true,
      "explanation": "This is the core hygiene rule. 'Waiting on them' is not a next action. 'Send follow-up email Friday at 2pm' is. Deals without next actions are dead deals in disguise."
    },
    {
      "id": "q8",
      "type": "multiple-choice",
      "question": "What's the average job tenure for roles below Director level?",
      "options": [
        "6 months",
        "1 year",
        "2.3 years",
        "5 years"
      ],
      "correctAnswer": 2,
      "explanation": "Average tenure is 2.3 years. This means your champion might change jobs mid-deal. Quarterly verification catches this before your emails bounce."
    }
  ]
}