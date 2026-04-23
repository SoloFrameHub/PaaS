---
title: "Automation 2: Meeting Logger (Call → CRM → Follow-Up)"
duration: "50 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 3
---

You just finished a 45-minute discovery call. It went well. The prospect asked detailed questions about pricing, mentioned a specific pain point you can solve, and said "send me something to review."

Now you need to log the meeting in your CRM, update the deal stage, send a follow-up email, and create a task to check in next week.

That's 15 minutes of admin work after every meeting.

If you're having 8-12 meetings per month, that's 2 hours of post-meeting admin — time that could be spent on your next outreach sequence.

The Meeting Logger eliminates it.

---

## Why Post-Meeting Admin Is a Revenue Problem

It's not just about the time. It's about what happens when you skip the admin.

<InsightCard icon="⚠️" title="The Meeting Admin Gap">
Only 44% of sales meetings receive a follow-up within 24 hours. Most solo founders have good intentions but bad systems — they finish a meeting, plan to "log it later," then get pulled into email and forget. That deal never gets a follow-up. It dies quietly.

The Meeting Logger makes forgetting impossible.
</InsightCard>

<FlipCard
  front="What happens when you don't log meetings in your CRM?"
  back="Your pipeline velocity data is wrong (you can't track stage durations without activity timestamps). Your forecast is based on incomplete information. Your follow-up tasks exist only in your memory or inbox. Deals stall because there's no system tracking them."
/>

<FlipCard
  front="What does a properly logged meeting create?"
  back="A CRM activity record with date, type, duration, and attendee. An updated deal stage. A follow-up task with a specific due date. An optional thank-you email sent automatically. A data trail that feeds your Course 41 velocity analytics."
/>

---

## The Meeting Logger Pattern

The Meeting Logger fires after every discovery call, demo, or sales meeting. Here's the complete flow:

<ProgressiveReveal title="The Meeting Logger Flow" persistKey="automation-L3-flow">

<RevealSection title="Step 1: Trigger — Meeting Ended">

**Best triggers:**

1. **Calendly "Invitee Created" + time delay** — When someone books a Calendly event, schedule the automation to run when the meeting time has passed. Zapier's Delay step or Make's Sleep module handles this.

2. **Google Calendar event ended** — If you use Google Calendar (not Calendly), trigger on calendar events matching specific criteria (e.g., event name contains "Discovery" or "Demo").

3. **CRM deal stage manual change** — If you're not using Calendly, you can trigger on a manual CRM stage change as a fallback. Less automated, but still better than no logging.

**Recommendation:** Use Calendly + time delay. It's the most reliable trigger because Calendly has a dedicated webhook event for completed appointments.

</RevealSection>

<RevealSection title="Step 2: Create CRM Activity">

Create an activity record linked to the contact and deal:

- **Activity Type:** Meeting
- **Subject:** "Discovery Call — [Contact Name]"
- **Date:** Meeting date/time (from Calendly event data)
- **Duration:** Meeting length (from Calendly event type — e.g., 30 or 45 minutes)
- **Outcome:** Leave blank initially — you'll fill this in manually after reviewing your notes
- **Notes:** Pull any Calendly custom question answers if you collected them

Link the activity to both the contact record and the associated deal.

</RevealSection>

<RevealSection title="Step 3: Update Deal Stage">

After a meeting is held, the deal should advance from "Engaged" or "Meeting Scheduled" to "Meeting Held."

In your CRM, find the deal associated with this contact (by email) and update the stage. This keeps your funnel dashboard accurate — you'll see exactly when deals advance through your pipeline.

**Warning:** Only advance the stage if the meeting was a discovery/sales call, not just a check-in. For Calendly, you can use the event type name to filter — only update stage for "Discovery Call" or "Demo" event types, not for "Follow-Up Call" types.

</RevealSection>

<RevealSection title="Step 4: Create Follow-Up Task">

Auto-create a CRM task:

- **Task Name:** "Follow up with [Contact Name] post-meeting"
- **Due Date:** Meeting date + 24 hours
- **Priority:** High
- **Notes:** "Discovery call held on [date]. Add meeting notes and send follow-up materials."

The 24-hour window is critical. Research shows that following up within 24 hours of a meeting increases close rates by 25%. The automation ensures you always hit this window.

</RevealSection>

<RevealSection title="Step 5 (Optional): Send Thank-You Email">

Trigger a simple thank-you email 30-60 minutes after the meeting ends. Keep it short:

> Hi [Name],
>
> Great speaking with you today about [topic from Calendly questions]. I'll [specific next step] by [date].
>
> Looking forward to continuing the conversation.
>
> [Your name]

**When to use:** Always, if you have a CRM email integration or Zapier → Gmail/Outlook connection.

**When to skip:** If your follow-up is always highly personalized and you'd rewrite the template anyway, skip the auto-send and just use the task reminder to write a custom email.

</RevealSection>

</ProgressiveReveal>

---

## Build It: Calendly → HubSpot → Slack

Here's the step-by-step build for the most common setup:

<SlideNavigation>
<Slide title="Step 1: Trigger on Calendly Booking">

**In Zapier:**
1. Create a new Zap
2. Trigger: "Calendly" → "Invitee Created"
3. Connect your Calendly account
4. Select your event type (or "All event types")
5. Test: Verify sample data includes event name, invitee email, event start time

**Why "Invitee Created" instead of "Event Ended"?**

Zapier doesn't reliably trigger on meeting end. The workaround: trigger on booking creation, then add a Delay step that waits until the meeting would have ended.

Example: If the meeting is at 2pm and is 45 minutes long, the delay fires at approximately 2:50pm.

In Make, use the same trigger — "Watch Events" → "Invitee Created."

</Slide>

<Slide title="Step 2: Add a Time Delay">

**In Zapier (Starter tier required):**
1. Add "Delay" step
2. Type: "Delay Until"
3. Date/time: Calendly event start time + meeting duration
4. Timezone: Use the invitee's timezone from Calendly data

Example delay formula: `Event Start Time + 45 minutes`

**In Make:**
1. Add a "Sleep" module
2. Duration: Set to minutes equal to your typical meeting length (30 or 45 minutes) from the event start time

**Alternative (if you can't use delays):** Trigger on "Invitee Created" without a delay and accept that the CRM activity will be logged at booking time, not meeting completion time. Less accurate but functional.

</Slide>

<Slide title="Step 3: Find or Create HubSpot Contact">

After the delay fires:
1. Add action: "HubSpot — Find Contact by Email"
2. Email: Calendly invitee email
3. If found: proceed to log activity
4. If not found: the Lead Catcher from Lesson 2 should have already created them — but add a fallback "Create Contact" step just in case

**Link the contact to a deal:**
After finding the contact, find their most recent open deal using "HubSpot — Search for Deals" filtered by contact ID and stage ≠ "Closed Won" or "Closed Lost."

</Slide>

<Slide title="Step 4: Create CRM Activity + Update Stage">

**Create activity:**
1. HubSpot action: "Create Engagement" (or "Log Activity")
2. Type: "MEETING"
3. Subject: "Discovery Call — `{{Invitee Name}}`"
4. Body: "Calendly meeting held. Duration: `{{Event Duration}}` minutes."
5. Timestamp: Event start time from Calendly
6. Associate with: Contact ID (from Step 3) + Deal ID (from Step 3)

**Update deal stage:**
1. HubSpot action: "Update Deal"
2. Deal ID: From search in Step 3
3. Stage: "Meeting Held" (or your equivalent stage name)

</Slide>

<Slide title="Step 5: Create Follow-Up Task + Notify via Slack">

**Create follow-up task:**
1. HubSpot action: "Create Task"
2. Subject: "Follow up with `{{Invitee Name}}` post-meeting"
3. Due date: Event start time + 24 hours
4. Owner: Your HubSpot user ID
5. Associate with: Contact ID + Deal ID

**Slack notification (optional but recommended):**
1. Add Slack action: "Send Message"
2. Channel: Your personal DM or #meetings channel
3. Message: "✅ Meeting logged: `{{Invitee Name}}` at `{{Company}}` | Stage updated to Meeting Held | Follow-up task due: `{{Tomorrow's Date}}` → `{{HubSpot Deal Link}}`"

</Slide>
</SlideNavigation>

---

## Handling Meeting Variations

Not every meeting follows the same pattern. Here's how to handle the common variations:

<ClassifyExercise
  title="Meeting Type → Automation Action"
  persistKey="automation-L3-classify"
  categories={[
    { id: "full", label: "Full Meeting Logger Flow", color: "#3b82f6" },
    { id: "partial", label: "Partial Flow (Skip Stage Update)", color: "#f59e0b" },
    { id: "skip", label: "Skip Automation Entirely", color: "#6b7280" }
  ]}
  items={[
    { id: "1", content: "First discovery call with a new prospect", correctCategory: "full" },
    { id: "2", content: "Follow-up check-in call with an existing customer", correctCategory: "skip" },
    { id: "3", content: "Product demo after initial discovery call", correctCategory: "full" },
    { id: "4", content: "Internal team meeting (not a sales call)", correctCategory: "skip" },
    { id: "5", content: "Second discovery call with the same prospect", correctCategory: "partial" },
    { id: "6", content: "Contract negotiation call", correctCategory: "partial" }
  ]}
/>

To implement these rules, use a filter in your automation:
- Trigger only fires for Calendly event types containing "Discovery" or "Demo" in the name
- For follow-up calls, use a separate Calendly event type that doesn't trigger the full Meeting Logger

---

## The Thank-You Email Template

When you enable auto-send of the thank-you email, use this template as your starting point:

<RewriteExercise
  title="Improve This Thank-You Email Template"
  persistKey="automation-L3-rewrite"
  original="Hi [Name], Thanks for meeting with me. I'll send you some information soon. Let me know if you have questions."
  hint="A great post-meeting email references something specific from the call, commits to a concrete next step with a deadline, and makes it easy for them to respond with one word."
  expertRewrite="Hi [Name], Great speaking with you today about [specific pain point they mentioned]. As discussed, I'll send over [specific deliverable — proposal, case study, demo recording] by [specific date — e.g., Thursday EOD]. One question to make sure I tailor it right: [one specific question about their situation]. Looking forward to continuing from here. [Your name]"
  criteria={[
    "References something specific from the call (not generic 'great meeting')",
    "Commits to a concrete next step with a specific deadline",
    "Asks one focused question to maintain momentum",
    "Short enough to read in 10 seconds"
  ]}
/>

---

## Testing Your Meeting Logger

<InteractiveChecklist
  title="Meeting Logger Test Protocol"
  persistKey="automation-L3-test-checklist"
  items={[
    "Book a test Calendly appointment with a personal email address",
    "Wait for the delay to fire (or manually trigger the automation in test mode)",
    "Verify CRM activity created with correct date, type, and contact association",
    "Verify deal stage updated to 'Meeting Held' (or your equivalent)",
    "Verify follow-up task created with correct due date (meeting + 24 hours)",
    "Verify Slack notification received with correct deal link",
    "Check that the activity is linked to both the contact AND the deal (not just one)",
    "Book a second test with the same email — verify no duplicate contact created"
  ]}
/>

---

## The Manual Fallback

Even with the Meeting Logger running, some meetings won't trigger the automation:
- Phone calls scheduled outside Calendly
- In-person meetings
- Impromptu calls from prospects who replied to your email

For these, create a simple manual logging habit:

<InsightCard icon="📝" title="The 2-Minute Post-Meeting Habit">
Immediately after any non-Calendly meeting: open your CRM on mobile, log a "Meeting" activity (takes 30 seconds), update the deal stage, and add one line of notes. The automation handles the Calendly meetings. You handle the rest — but only the cases the automation misses.
</InsightCard>

<MiniRoleplay
  scenario="You just finished a 30-minute call with a warm referral that wasn't booked through Calendly — they called your mobile directly. The call went well; they want to see a proposal. Your Meeting Logger automation didn't fire because there was no Calendly trigger."
  role="You — needing to log this meeting without the automation"
  persistKey="automation-L3-roleplay"
  modelResponse="Open HubSpot/Pipedrive on mobile (takes 10 seconds). Find the contact — they should already exist if Lead Catcher captured them from your initial outreach reply. Log a meeting activity: type 'Meeting', subject 'Discovery Call — Inbound Referral', date/time: now, duration: 30 min, notes: 'Warm referral from [X]. Discussed [Y pain point]. Requested proposal by [date]. Next step: send proposal by Friday.' Update deal stage to 'Meeting Held'. Create task: 'Send proposal — [Name]' due date Friday. Done in 3 minutes. The automation handles the Calendly bookings; you handle the edge cases."
/>

---

## Integrating with Your Analytics

The Meeting Logger creates data that directly feeds your Course 41 velocity dashboard.

<ExampleCard label="Case Study: The Velocity Insight">
Before the Meeting Logger, Carlos had no idea how long deals sat in each pipeline stage. He knew when deals closed, but not when meetings happened.

After 60 days of Meeting Logger data, he could see his analytics clearly:
- Average time from Lead Catcher to first meeting: 8.3 days
- Average time from meeting to proposal: 4.1 days (target: 3-7 days — on track)
- Average time from proposal to close: 18.7 days (target: 5-14 days — **too slow**)

That 18.7-day proposal-to-close time was the insight he needed. He built a Contract Chaser automation (Lesson 5) and cut it to 11.2 days in 90 days.

**He only found the bottleneck because the Meeting Logger was creating timestamped activity records.**
</ExampleCard>

---

## Your Meeting Logger Blueprint

<TemplateBuilder
  title="My Meeting Logger Blueprint"
  persistKey="automation-L3-blueprint"
  sections={[
    {
      id: "trigger",
      title: "My Trigger Configuration",
      fields: [
        {
          id: "trigger_tool",
          label: "Trigger tool",
          placeholder: "e.g., Calendly",
          type: "text"
        },
        {
          id: "event_types",
          label: "Which event types should trigger the Meeting Logger?",
          placeholder: "e.g., 'Discovery Call (30 min)', 'Product Demo (45 min)' — NOT 'Follow-Up Call' or 'Customer Check-In'",
          type: "textarea"
        },
        {
          id: "delay",
          label: "Delay duration (how long after booking does the automation run?)",
          placeholder: "e.g., Trigger fires 45 minutes after event start time",
          type: "text"
        }
      ]
    },
    {
      id: "crm_actions",
      title: "CRM Actions",
      fields: [
        {
          id: "activity_type",
          label: "Activity type name in your CRM",
          placeholder: "e.g., 'Meeting' or 'Call'",
          type: "text"
        },
        {
          id: "stage_after_meeting",
          label: "Deal stage to advance to after meeting",
          placeholder: "e.g., 'Meeting Held' or 'Demo Complete'",
          type: "text"
        },
        {
          id: "task_due",
          label: "Follow-up task due date (hours after meeting)",
          placeholder: "e.g., 24 hours after meeting end",
          type: "text"
        }
      ]
    },
    {
      id: "thank_you",
      title: "Thank-You Email (optional)",
      fields: [
        {
          id: "enabled",
          label: "Enabled or disabled?",
          placeholder: "e.g., Enabled — auto-sent 30 minutes after meeting end via HubSpot template",
          type: "text"
        },
        {
          id: "template",
          label: "Email template subject line",
          placeholder: "e.g., 'Following up from our call today'",
          type: "text"
        }
      ]
    }
  ]}
/>

---

## Your Action Items

<InteractiveChecklist
  title="Meeting Logger Action Items"
  persistKey="automation-L3-actions"
  items={[
    "Build the Calendly trigger → delay → CRM activity creation flow",
    "Add the deal stage update step (advance to 'Meeting Held')",
    "Add the follow-up task creation step (due 24 hours after meeting)",
    "Configure the optional Slack notification with a direct deal link",
    "Run the 8-step test protocol above — verify all checks pass",
    "Audit your last 10 meetings — how many have activity records in your CRM? (This is your baseline)",
    "After 30 days, check your velocity analytics — can you now see average days from meeting to proposal?"
  ]}
/>

---

## What's Next

In **Lesson 4**, you'll build the Follow-Up Reminder: a Day 3/7/14 chain that creates tasks when prospects haven't replied, automatically stops when they do, and ensures nothing falls through the cracks across your entire active pipeline.

---

## Quiz: The Meeting Logger

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What percentage of sales meetings receive a follow-up within 24 hours?",
      "options": ["87%", "44%", "62%", "29%"],
      "correctAnswer": 1,
      "explanation": "Only 44% of sales meetings receive a follow-up within 24 hours. The Meeting Logger ensures you're always in that group by auto-creating a follow-up task."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "Why should you trigger the Meeting Logger on 'Invitee Created' rather than 'Event Ended' in Calendly?",
      "options": [
        "Calendly doesn't have an 'Event Ended' trigger",
        "Automation platforms can't detect when meetings end reliably",
        "It's faster and requires less setup",
        "Calendly only sends data on booking, not on completion"
      ],
      "correctAnswer": 1,
      "explanation": "Automation platforms like Zapier and Make don't reliably receive a webhook when a Calendly meeting ends. The workaround is to trigger on booking creation and add a delay step equal to the meeting duration."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "The Meeting Logger should fire for all Calendly event types, including customer check-ins and internal meetings.",
      "correctAnswer": false,
      "explanation": "False. Filter to only fire for sales-related event types (Discovery Call, Demo). Check-ins with existing customers and internal meetings should not advance deal stages or create sales follow-up tasks."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "What is the primary analytics benefit of the Meeting Logger?",
      "options": [
        "It reduces your CRM cost",
        "It creates timestamped activity records that enable velocity tracking",
        "It automatically closes deals when meetings go well",
        "It replaces manual note-taking"
      ],
      "correctAnswer": 1,
      "explanation": "The Meeting Logger creates timestamped activity records that feed your Course 41 pipeline velocity dashboard. Without it, you can't accurately measure how long deals spend in each stage."
    }
  ]
}
```
