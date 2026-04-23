---
title: "Automation 1: Lead Catcher (Form → CRM → Notify)"
duration: "50 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 2
---

A prospect just submitted your contact form. They're interested, they took action, and they want to hear from you.

Right now, what happens next?

If the answer is "I'll see it when I check my email later" — you're leaving deals on the table. 78% of deals go to the first responder. Responding within 5 minutes makes you 100x more likely to connect than responding after an hour.

But you can't respond in 5 minutes if you don't know the lead exists.

The Lead Catcher is your fix. It captures every new lead from every source — forms, Calendly, email replies — creates a CRM contact, tags the lead source, assigns a score, and pings you via Slack within 30 seconds. By the time you finish this lesson, no lead will fall through the cracks again.

---

## The Lead Catcher Pattern

Before you build anything, understand the pattern you're implementing. Every Lead Catcher automation follows the same six-step structure regardless of which platform you're using.

<ProgressiveReveal title="The Lead Catcher Flow" persistKey="automation-L2-flow">

<RevealSection title="Step 1: Trigger — New Lead Source Event">

The automation wakes up when something specific happens. The three most common triggers for solo founders:

1. **Form submission** — Typeform, Tally, Jotform, Google Forms, or your CRM's native form submits a new entry
2. **Calendly booking** — A prospect books a discovery call or demo
3. **Email reply** — A prospect replies to your outreach campaign (requires email tool webhook, e.g., Instantly or Smartlead)

You need at least one trigger active. Most founders start with their contact form and Calendly.

</RevealSection>

<RevealSection title="Step 2: Create or Update CRM Contact">

The trigger sends data (name, email, company, role) to your automation platform. Your automation maps those fields to your CRM and creates a new contact — or updates an existing one if the email already exists.

Field mapping checklist:
- First name → CRM First Name
- Last name → CRM Last Name
- Email → CRM Email (primary)
- Company → CRM Company
- Message/notes → CRM Notes (first activity)

</RevealSection>

<RevealSection title="Step 3: Set Metadata on the Contact">

Three fields that must be set automatically (never manually):

1. **Lead Source** — What trigger fired? "Typeform — Website" or "Calendly — Discovery Call" or "Outreach Reply — Instantly"
2. **Pipeline Stage** — Set to "Lead" (your first pipeline stage)
3. **Date Entered** — Timestamp of when the lead was captured

These three fields feed your funnel analytics from Course 41. If you skip them, your attribution data will be broken.

</RevealSection>

<RevealSection title="Step 4: Optional Enrichment">

After creating the CRM contact, you can trigger an Apollo or Hunter lookup to fill in missing data — company size, LinkedIn URL, job title, industry, phone number.

The tradeoff: enrichment adds 15-30 seconds of delay before your notification fires. For most founders, this is worth it. You get a richer notification with context instead of just an email address.

If you use Apollo, the enrichment step costs Apollo credits. Budget: 1 credit per lead enrichment.

</RevealSection>

<RevealSection title="Step 5: Score the Lead">

Based on the form responses or enriched data, calculate a rough ICP fit score. A simple scoring system:

- Company size matches your ICP: +3 points
- Role matches your ICP (decision-maker): +3 points
- Described a specific problem you solve: +2 points
- Timeline < 30 days: +2 points

Total: 1-10 scale. Score ≥7 = high priority (immediate Slack alert). Score &lt;7 = daily digest batch.

You don't need AI for this. A simple filter or number calculation in Zapier/Make handles it.

</RevealSection>

<RevealSection title="Step 6: Notify the Founder">

The final step sends you a notification with everything you need to act. The ideal notification format:

**Slack message:**
> 🟢 New Lead: [Name] at [Company]
> Role: [Title] | Score: [X/10]
> Source: [Form name / Calendly / Outreach]
> Message: "[First 100 chars of their message]"
> → [Direct CRM link]

**Why Slack?** Because you're more likely to see it immediately than an email notification buried in your inbox. If you don't use Slack, a push notification via email or SMS works.

</RevealSection>

</ProgressiveReveal>

<InsightCard icon="⚡" title="Speed Is the Lever">
Companies responding within 5 minutes are 100x more likely to connect with leads versus responding after 60 minutes. The Lead Catcher doesn't automatically respond — it makes YOU aware fast enough to respond while the lead is still warm.
</InsightCard>

---

## Build It: Typeform → HubSpot → Slack

Here's the step-by-step build for the most common solo founder stack. Adapt the steps to your specific tools.

<SlideNavigation>
<Slide title="Step 1: Connect Your Form">

**In Zapier:**
1. Click "Create Zap"
2. Trigger: Select "Typeform" (or your form tool)
3. Event: "New Entry"
4. Connect your Typeform account (OAuth login)
5. Select your form (e.g., "Contact Us" or "Book a Demo")
6. Click "Test trigger" — Zapier will pull your most recent submission as a sample

**In Make:**
1. Create a new scenario
2. Add a Typeform "Watch Responses" module
3. Connect your account, select your form
4. Set polling interval: every 15 minutes (free tier) or 5 minutes (Core tier)
5. Run once to capture a sample response

</Slide>

<Slide title="Step 2: Create the HubSpot Contact">

**In Zapier:**
1. Add action: Select "HubSpot"
2. Event: "Create or Update Contact"
3. Map fields:
   - Email → Typeform field: "Email"
   - First Name → Typeform field: "First Name" (or parse from "Full Name")
   - Last Name → Typeform field: "Last Name"
   - Company → Typeform field: "Company"
   - Lead Source → Static value: "Typeform — [Form Name]"
   - Lifecycle Stage → Static value: "Lead"
   - Notes → Typeform field: "Message"

**Test:** Click "Test step" — verify the contact appears in HubSpot.

</Slide>

<Slide title="Step 3: Set Pipeline Stage">

**In Zapier:**
1. Add action: "HubSpot — Create Deal"
2. Deal name: "[Contact Name] — [Company]"
3. Pipeline: Your active pipeline
4. Stage: "Lead" (first stage)
5. Associate with: Contact ID from Step 2
6. Amount: Leave blank (or $0)
7. Close date: 60 days from now (placeholder)

This creates a deal in your pipeline automatically. If you prefer to add deals manually, skip this step and just create the contact.

</Slide>

<Slide title="Step 4: Send Slack Notification">

**In Zapier:**
1. Add action: "Slack — Send Channel Message"
2. Channel: #leads (or DM yourself)
3. Message text (customize this):
```
🟢 New Lead: {{First Name}} {{Last Name}} at {{Company}}
Role: {{Job Title}} | Source: Typeform — Contact Form
Message: {{Message (first 150 chars)}}
→ HubSpot: {{Contact URL}}
```
4. Test: Verify the Slack message appears with real data

**Pro tip:** Add a filter step before the Slack notification. If the email domain is gmail.com, yahoo.com, or hotmail.com (personal email), route to a lower-priority notification. B2B leads should have company email addresses.

</Slide>
</SlideNavigation>

---

## The Calendly Variant

Calendly bookings are a different trigger but follow the same pattern. Here's the adaptation:

<FlipCard
  front="Calendly Trigger: What data do you get?"
  back="Calendly sends: invitee name, email, event name, scheduled time, cancellation URL, and any questions you asked in the booking form. You do NOT get their company or job title unless you added those as custom questions in your Calendly event."
/>

<FlipCard
  front="Best practice: Add custom questions to Calendly"
  back="Add 2-3 questions to every Calendly event type: 'What's your company name?', 'What's your role?', 'What are you hoping to get out of this call?' These answers populate your CRM and make your pre-call research instant."
/>

For the Calendly version, the flow is identical with two changes:

1. **Trigger:** Zapier "Calendly — Invitee Created" (not "Event Ended" — you want to know as soon as they book)
2. **Lead Source:** Set to "Calendly — [Event Type Name]" (e.g., "Calendly — 30-Min Discovery Call")

The Slack notification should also include the scheduled meeting time so you can prepare:

> 📅 New Discovery Call Booked: [Name] at [Company]
> Time: [Date] at [Time] ([Timezone])
> Question responses: [Custom answers]
> → HubSpot: [Link] | Calendly: [Link]

---

## Testing Your Lead Catcher

Don't deploy without testing. Here's the protocol:

<InteractiveChecklist
  title="Lead Catcher Test Protocol"
  persistKey="automation-L2-test-checklist"
  items={[
    "Submit a test entry to your form using a test email address",
    "Verify contact created in CRM with correct name, email, and company",
    "Verify Lead Source is set correctly (e.g., 'Typeform — Contact Form')",
    "Verify Pipeline Stage is set to 'Lead'",
    "Verify Slack notification received within 60 seconds",
    "Verify Slack message contains direct link to the CRM contact",
    "Book a test Calendly appointment and verify the same flow works",
    "Submit a duplicate test entry — verify CRM updates existing contact instead of creating duplicate"
  ]}
/>

The last item matters. If your automation creates duplicate contacts instead of updating existing ones, you'll have data quality problems that corrupt your analytics from Course 41. Use "Create or Update" (not just "Create") in your CRM action.

---

## Adding Lead Scoring (Optional but Powerful)

Once your basic Lead Catcher is working, add a score to prioritize your response.

<ExampleCard label="Case Study: The Scoring Advantage">
Before lead scoring, Nadia responded to leads in the order they arrived. A freelancer looking for a one-month engagement got the same priority as a 50-person company with a $50K budget.

After adding scoring to her Lead Catcher:
- Leads scoring 7-10: Slack DM to herself (immediate action)
- Leads scoring 4-6: Channel notification (respond within 4 hours)
- Leads scoring 1-3: Daily digest email (respond within 24 hours)

Her conversion rate on high-score leads doubled because she was responding within minutes, not hours.
</ExampleCard>

To implement scoring in Zapier:
1. Add a "Formatter" step after contact creation
2. Use "Numbers — Perform Math" to calculate score based on form field values
3. Add a "Paths" step (Zapier Professional required) or "Filter" to route differently by score

In Make, use a Router module with filter conditions on score value. This is easier in Make than Zapier and doesn't require the Professional tier.

---

## The Multi-Source Lead Catcher

Advanced version: one notification hub that catches leads from all sources.

<MiniRoleplay
  scenario="You have three lead sources active simultaneously: website form (Typeform), demo booking (Calendly), and outreach replies (Instantly). A prospect you emailed last week just replied positively. You also have a new form submission from someone else. Both hit within 10 minutes."
  role="You — the solo founder managing your automation"
  persistKey="automation-L2-roleplay"
  modelResponse="The multi-source Lead Catcher handles this automatically. The outreach reply triggers the Lead Catcher via Instantly's webhook → Zapier/Make, creating or updating a CRM contact with Lead Source = 'Outreach Reply — Instantly' and sending a high-priority Slack DM (positive reply = high score). The Typeform submission fires simultaneously, creating a separate contact with Lead Source = 'Typeform — Website Form'. You receive two distinct Slack notifications within seconds, each with a direct CRM link. You respond to the outreach reply first (warm lead, higher priority), then handle the new form submission. No manual checking, no missed leads, no confusion about source."
/>

---

## Troubleshooting the Lead Catcher

<ProgressiveReveal title="Common Lead Catcher Problems and Fixes" persistKey="automation-L2-debug">

<RevealSection title="Problem: Duplicate contacts being created">

**Root cause:** Your CRM action is set to "Create Contact" instead of "Create or Update Contact."

**Fix:** Change the action to "Create or Update Contact" in Zapier, or use the HubSpot "Upsert Contact" action. In Make, use HubSpot's "Create or Update Contact" module. The email address is the deduplication key.

</RevealSection>

<RevealSection title="Problem: Slack notification not firing">

**Root cause:** Usually an authentication error (Slack app needs to be reinstalled or re-authorized) or the Zapier/Make → Slack connection expired.

**Fix:** In Zapier, go to Connected Accounts and reconnect Slack. Test the Slack step in isolation. If it works in test mode but not in live mode, check your filter conditions — they may be too restrictive.

</RevealSection>

<RevealSection title="Problem: Typeform data not mapping correctly">

**Root cause:** Typeform field IDs change when you edit your form. After any form edit, re-test the trigger in Zapier/Make to get fresh field mappings.

**Fix:** Open your Zap/scenario, re-run the trigger test, and re-map all fields to the new field IDs. Take 5 minutes to verify all mappings are correct after any form change.

</RevealSection>

<RevealSection title="Problem: Lead Source not being set">

**Root cause:** The Lead Source field is not being sent to your CRM. Check that you have a step that explicitly sets this field with a static value matching your source.

**Fix:** Add a CRM action step that specifically sets Lead Source to a static value (e.g., "Typeform — Contact Form"). Don't leave it empty or rely on CRM defaults.

</RevealSection>

</ProgressiveReveal>

---

## Your Lead Catcher Blueprint

Document your completed automation for future reference and troubleshooting:

<TemplateBuilder
  title="My Lead Catcher Blueprint"
  persistKey="automation-L2-blueprint"
  sections={[
    {
      id: "triggers",
      title: "My Trigger Sources",
      fields: [
        {
          id: "source1",
          label: "Trigger 1 (Form tool and form name)",
          placeholder: "e.g., Typeform — 'Contact Us' form on homepage",
          type: "text"
        },
        {
          id: "source2",
          label: "Trigger 2 (Calendar/booking tool)",
          placeholder: "e.g., Calendly — '30-Min Discovery Call' event type",
          type: "text"
        },
        {
          id: "source3",
          label: "Trigger 3 (if applicable)",
          placeholder: "e.g., Instantly — outreach reply webhook",
          type: "text"
        }
      ]
    },
    {
      id: "crm",
      title: "CRM Configuration",
      fields: [
        {
          id: "crm_tool",
          label: "CRM tool",
          placeholder: "e.g., HubSpot Free",
          type: "text"
        },
        {
          id: "lead_source_values",
          label: "Lead Source values I'm using (list all)",
          placeholder: "e.g., 'Typeform — Contact Form', 'Calendly — Discovery Call', 'Outreach Reply — Instantly'",
          type: "textarea"
        },
        {
          id: "first_stage",
          label: "First pipeline stage name",
          placeholder: "e.g., Lead",
          type: "text"
        }
      ]
    },
    {
      id: "notification",
      title: "Notification Setup",
      fields: [
        {
          id: "channel",
          label: "Notification channel (Slack channel or email)",
          placeholder: "e.g., #leads channel in Slack",
          type: "text"
        },
        {
          id: "format",
          label: "Notification format (paste your message template)",
          placeholder: "e.g., 🟢 New Lead: {{Name}} at {{Company}} | Score: {{Score}} | → {{CRM Link}}",
          type: "textarea"
        }
      ]
    }
  ]}
/>

---

## Your Action Items

<InteractiveChecklist
  title="Lead Catcher Action Items"
  persistKey="automation-L2-actions"
  items={[
    "Build the basic Lead Catcher (form trigger → CRM contact → Slack notification)",
    "Add the Calendly variant (booking trigger → same CRM flow → notification with meeting time)",
    "Run the 8-step test protocol above — verify all checks pass",
    "Add Lead Source field to CRM and verify it's being set on every lead",
    "Set a filter to route high-priority leads (business email + specific role) to immediate Slack DM",
    "Document your blueprint in the template above",
    "Submit a real test lead and time the response: how long from submission to Slack notification?"
  ]}
/>

---

## What's Next

In **Lesson 3**, you'll build the Meeting Logger: the automation that captures every Calendly or Google Calendar meeting to your CRM as an activity, updates the deal stage, creates a follow-up task, and optionally sends a thank-you email — all within minutes of the meeting ending.

---

## Quiz: The Lead Catcher

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is the most important reason to respond to leads within 5 minutes?",
      "options": [
        "It looks professional",
        "Research shows you're 100x more likely to connect than if you wait an hour",
        "Leads get deleted after 10 minutes",
        "Your CRM requires it"
      ],
      "correctAnswer": 1,
      "explanation": "InsideSales.com research shows responding within 5 minutes makes you 100x more likely to connect versus waiting an hour. Speed is the #1 conversion lever the Lead Catcher enables."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Which CRM action should you use to prevent duplicate contacts?",
      "options": [
        "Create Contact",
        "Create or Update Contact",
        "Find Contact",
        "Delete and Recreate Contact"
      ],
      "correctAnswer": 1,
      "explanation": "Always use 'Create or Update Contact' (or 'Upsert'). It checks if a contact with that email already exists and updates it instead of creating a duplicate. This is essential for data quality."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "The Lead Catcher should auto-send a response email to the prospect immediately.",
      "correctAnswer": false,
      "explanation": "False. The Lead Catcher notifies YOU so you can respond personally. Auto-responses often feel robotic and reduce conversion. The human response should be personalized — the automation just makes sure you respond within minutes."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "Which three metadata fields must be set automatically on every new lead?",
      "options": [
        "Name, Email, Phone",
        "Lead Source, Pipeline Stage, Date Entered",
        "Lead Source, Deal Size, Close Date",
        "Company, Role, LinkedIn URL"
      ],
      "correctAnswer": 1,
      "explanation": "Lead Source (for attribution), Pipeline Stage (for funnel tracking), and Date Entered (for velocity tracking) must be set automatically. These feed your Course 41 analytics dashboards."
    }
  ]
}
```
