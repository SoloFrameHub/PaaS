---
title: "Debugging Broken Automations"
duration: "45 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 9
---

Your Lead Catcher automation has been running for three weeks. Yesterday, a prospect submitted your contact form. You got no Slack notification. The contact isn't in your CRM.

You found out because the prospect sent a follow-up email two days later asking if you received their inquiry.

This is the automation failure scenario every solo founder eventually faces. The automation you depend on silently breaks, and you only find out when a deal is already cold.

This lesson gives you a systematic approach to diagnosing and fixing broken automations — and monitoring setups that catch failures before they cost you deals.

---

## Automation Failures Are Normal

Before the anxiety sets in: automations break. This is not a sign that you chose wrong tools or built things incorrectly.

<InsightCard icon="🔧" title="The Failure Reality">
The average Zapier automation fails 1-3 times per month. 60% of failures are auth-related (expired OAuth tokens). 25% are data format mismatches. 15% are trigger changes or API updates.

You cannot prevent all failures. You can build monitoring to catch them fast and a protocol to fix them in under 10 minutes.
</InsightCard>

<FlipCard
  front="Why do working automations suddenly break?"
  back="Five common reasons: (1) OAuth token expires — the app disconnects and needs to be re-authorized. (2) The app's API changes — endpoints move, field names change, or deprecated features stop working. (3) A form field was renamed — your field mapping now points to a field that doesn't exist. (4) Rate limits hit — you sent too many API calls too fast. (5) Webhook URL changes — the app's webhook points to an old URL that no longer works."
/>

---

## The 5-Step Debug Protocol

When an automation breaks, don't start randomly clicking things. Work through this protocol in order — it resolves 90% of failures.

<ProgressiveReveal title="The 5-Step Debug Protocol" persistKey="automation-L9-protocol">

<RevealSection title="Step 1: Read the Error Log">

Every automation platform has a run history. Find the failed run and read the error message.

**In Zapier:**
- Go to "Zap History" in the left sidebar
- Filter by "Error" status
- Click the failed run
- Read the error message — it's usually specific: "401 Unauthorized," "404 Not Found," "Missing required field: email"

**In Make:**
- Go to the scenario's "History" tab
- Filter by "Error" status
- Click the failed execution
- Expand the failed module — read the error response from the API

**In n8n:**
- Workflow executions panel → filter by "Error"
- Click the failed execution → read the node output

**Most errors are self-explanatory if you read them carefully.** "401 Unauthorized" means reconnect the app. "404 Not Found" means the endpoint changed or the record was deleted. "Missing required field" means your field mapping has a gap.

**Time: 2-3 minutes. Resolves: 40-50% of failures at this step.**

</RevealSection>

<RevealSection title="Step 2: Test the Trigger">

If the error log doesn't point to a specific step, verify the trigger is still firing correctly.

**In Zapier:**
- Open the Zap editor
- Click on the trigger step
- Click "Test trigger"
- Verify sample data is returned
- If the test fails: the trigger app needs to be reconnected

**In Make:**
- Open the scenario editor
- Right-click the trigger module
- Select "Run this module only"
- Check if data is returned

**If trigger test fails:** The most common cause is that the app's connection has been revoked (OAuth) or the webhook URL has changed.

**Fix:** Click "Reconnect" or "Reauthorize" on the trigger app. If it's a webhook, regenerate the webhook URL in your automation platform and update it in the source app.

**Time: 3-5 minutes. Resolves: additional 20-25% of failures.**

</RevealSection>

<RevealSection title="Step 3: Check Each Action Step">

Walk through each action step in order, testing each one with the sample data from Step 2.

**What to look for:**
- Does the step receive the data it expects? (Check input mappings)
- Does any field show `undefined` or `[empty]` where it should have a value?
- Is a required field missing from the source data?

**In Zapier:** Turn the Zap off, click into each action step, verify the field mappings are still correct (especially after any form or CRM changes).

**In Make:** Use the "Run once" feature to step through the scenario and see data at each module boundary.

**Common issues at this step:**
- You renamed a Typeform field → Zapier still references the old field name → empty value sent to CRM
- You added a required field to HubSpot → the automation doesn't send it → API rejects the request
- Date format changed (e.g., Calendly sends time in UTC but CRM expects local time)

**Time: 5-10 minutes. Resolves: additional 15-20% of failures.**

</RevealSection>

<RevealSection title="Step 4: Verify App Authentication">

If the trigger fires correctly but actions are failing, check that each connected app has a valid authentication.

**In Zapier:**
- Go to Settings → Connected Accounts
- Look for any apps showing "Reconnect" or "Expired"
- Click "Reconnect" and re-authorize via OAuth

**In Make:**
- Go to Connections in the left sidebar
- Look for connections marked with a warning icon
- Click "Verify" then "Reauthorize" if needed

**Why this happens:** OAuth tokens expire (typically every 30-90 days depending on the app). Some apps also revoke tokens when you change your password, enable 2FA, or update security settings.

**Fix:** Reauthorize the connection. Takes 30 seconds. The automation will work again immediately.

**Time: 1-3 minutes. Resolves: most auth-related failures (60% of all failures).**

</RevealSection>

<RevealSection title="Step 5: Test End-to-End with Fresh Input">

After identifying and fixing the specific issue, run a complete end-to-end test:

1. Submit a real test input (new form submission, or manually trigger the automation with sample data)
2. Watch each step execute in the run history
3. Verify the output at the end (CRM contact created? Slack notification received? Task created?)
4. If all steps complete successfully: the automation is fixed

**Don't just fix the error and assume it works.** Run the full test. Some fixes reveal a second issue downstream.

**Time: 5 minutes. Confirms fix is complete.**

</RevealSection>

</ProgressiveReveal>

---

## Common Error Patterns and Fixes

<ClassifyExercise
  title="Error Code → Root Cause"
  persistKey="automation-L9-errors"
  categories={[
    { id: "auth", label: "Authentication Error (Reconnect App)", color: "#ef4444" },
    { id: "data", label: "Data Format Error (Fix Mapping)", color: "#f59e0b" },
    { id: "rate", label: "Rate Limit Error (Add Delay)", color: "#3b82f6" },
    { id: "endpoint", label: "API Change (Update Endpoint/Field)", color: "#6b7280" }
  ]}
  items={[
    { id: "1", content: "Error: '401 Unauthorized' from HubSpot API", correctCategory: "auth" },
    { id: "2", content: "Error: '400 Bad Request — email field expects valid email format, received undefined'", correctCategory: "data" },
    { id: "3", content: "Error: '429 Too Many Requests — retry after 60 seconds'", correctCategory: "rate" },
    { id: "4", content: "Error: '404 Not Found — the requested resource does not exist'", correctCategory: "endpoint" },
    { id: "5", content: "Error: 'Invalid date format — expected ISO 8601, received MM/DD/YYYY'", correctCategory: "data" },
    { id: "6", content: "Error: '403 Forbidden — OAuth token has been revoked'", correctCategory: "auth" }
  ]}
/>

### Specific Fixes by Error Type

<SlideNavigation>
<Slide title="401/403 Authentication Errors">

**Cause:** OAuth token expired or revoked. Happens when you change password, enable 2FA, update security settings, or the token reaches its expiry date (30-90 days for most apps).

**Fix in Zapier:**
1. Settings → Connected Accounts
2. Find the affected app
3. Click "Reconnect"
4. Complete OAuth flow (log in, authorize)
5. Return to Zap — it should work immediately

**Fix in Make:**
1. Connections sidebar
2. Find connection with warning icon
3. Click "Verify" → "Reauthorize"

**Prevention:** Set a calendar reminder every 60 days to reauthorize all app connections as preventive maintenance. Takes 5 minutes total.

</Slide>

<Slide title="400 Bad Request / Data Format Errors">

**Cause:** The data your automation sends doesn't match what the API expects. Common causes: field renamed in source app, required field missing, wrong data type (string sent to number field), date in wrong format.

**Diagnosis:**
1. Read the error message carefully — it usually specifies which field is the problem
2. Open the failing action step
3. Check what value is being sent to the problematic field
4. Trace back to where that value comes from in your mapping

**Fix examples:**
- Field renamed in Typeform → re-test trigger to get new field names → update mappings
- Date format wrong → add a Formatter step to convert "March 15, 2026" to "2026-03-15"
- Missing required field → add a static value or make the field optional in your CRM

</Slide>

<Slide title="429 Rate Limit Errors">

**Cause:** You're calling an API too many times too fast. APIs have rate limits (e.g., HubSpot Free: 100 requests/10 seconds, 40,000/day). Automations with loops or aggregators can exceed these.

**Fix:**
- In Zapier: Not a common issue with normal automation flows. If hitting limits: add a Delay step between batch operations.
- In Make: Add a Sleep module (1-2 second delay) between API calls in loops. Or reduce the number of records processed per scenario run.

**Prevention:** If you're processing large batches (100+ records), add explicit delays between calls.

</Slide>

<Slide title="404 Not Found Errors">

**Cause:** The API endpoint changed (app updated their API), or the record being referenced was deleted.

**If endpoint changed:**
1. Check the app's API changelog or release notes
2. Update the URL in your HTTP request module
3. Or wait for the integration to update (Zapier/Make maintain their own app integrations)

**If record deleted:**
1. The deal, contact, or task being referenced no longer exists
2. Add error handling to skip gracefully when a record isn't found
3. In Make: Add an error handler module → route "404" errors to a "log and skip" path

</Slide>
</SlideNavigation>

---

## Building Monitoring Into Your Stack

The 5-step protocol fixes broken automations. Monitoring catches them before you lose deals.

<InsightCard icon="🔔" title="The Monitoring Principle">
You should know an automation failed within 24 hours — not when a prospect emails you 3 days later asking why you never responded. Build monitoring in once, benefit from it indefinitely.
</InsightCard>

**Three monitoring layers:**

<ProgressiveReveal title="Automation Monitoring Setup" persistKey="automation-L9-monitoring">

<RevealSection title="Layer 1: Platform Email Alerts">

Both Zapier and Make can email you when an automation fails.

**In Zapier:**
- Settings → Notifications
- Enable "Email me when a Zap is turned off due to errors"
- Zapier automatically turns off Zaps after 10 consecutive failures and sends you an email

**In Make:**
- Organization Settings → Notifications
- Enable "Send me an email when a scenario has an error"

**Where the alert goes:** Your email inbox. Response time: same day (depending on how often you check email).

**Limitation:** You'll only be notified after failures accumulate — not on the first failure.

</RevealSection>

<RevealSection title="Layer 2: Zapier/Make → Slack Error Channel">

Set up an automation that sends you a Slack notification whenever another automation fails.

**In Make:**
1. Create a new scenario
2. Trigger: Make "Watch Scenario Errors" (available in Make's Monitoring module)
3. Action: Slack "Send Message" → your #automation-alerts channel
4. Message: "🚨 Automation Error: [Scenario Name] — [Error Message]"

**In Zapier:**
1. Use Zapier's built-in error handling
2. In any Zap, click "Error Handler" → route errors to a Slack notification action

This gives you real-time Slack alerts for every automation failure. Check #automation-alerts during your Friday review.

</RevealSection>

<RevealSection title="Layer 3: Weekly Canary Test">

A canary test is a simple, expected automation run that you trigger manually every week. If it works, your stack is healthy. If it fails, you know something is broken.

**Setup:**
1. Create a "Weekly Automation Canary" calendar event every Monday morning
2. Submit a test form entry with a specific email (canary@yourdomain.com)
3. Verify you receive a Slack notification within 2 minutes
4. If not: run the 5-step debug protocol immediately

**Time investment:** 3 minutes per week. **Value:** Catch failures within 7 days instead of when a prospect complains.

</RevealSection>

</ProgressiveReveal>

---

## Versioning and Rollback

Before editing any working automation, protect yourself with a version backup.

<FlipCard
  front="The Versioning Rule"
  back="Before editing a working automation: duplicate it. Name the duplicate with a date (e.g., 'Lead Catcher v2 — 2026-02-24'). Keep the original active. If your edit breaks the automation, deactivate the new version and reactivate the original. No data loss, no downtime."
/>

<FlipCard
  front="When should you rebuild instead of patch?"
  back="If an automation has been patched 3+ times with workarounds, rebuild from scratch. Patched automations accumulate technical debt — each workaround depends on the previous one, making the next failure harder to debug. A clean rebuild takes 30-60 minutes and produces a more reliable automation."
/>

**Versioning steps in Zapier:**
1. Open the Zap you want to edit
2. Click the three-dot menu → "Copy Zap"
3. Rename the copy to include today's date: "Lead Catcher v3 — 2026-02-26"
4. Edit the copy, test it
5. If working: turn off the old version, activate the new one
6. Keep the old version for 30 days as a rollback option

**In Make:**
1. Click the scenario → "Create a copy"
2. Add date suffix to the copy name
3. Edit and test the copy
4. If working: deactivate original, activate copy

---

## The Rebuild vs Patch Decision

<SwipeDecision
  title="Rebuild or Patch?"
  description="For each scenario, decide whether to patch the existing automation or rebuild from scratch."
  optionA="Patch"
  optionB="Rebuild"
  persistKey="automation-L9-swipe"
  cards={[
    {
      id: "1",
      content: "Your Lead Catcher was working perfectly for 2 months. A Typeform field was renamed. The CRM field mapping is now incorrect.",
      correctOption: "a",
      explanation: "Patch. A field rename is a simple fix — re-test the trigger, update the mapping. No need to rebuild the entire automation."
    },
    {
      id: "2",
      content: "Your Follow-Up Reminder chain has been patched 4 times. There are duplicate trigger conditions, a workaround for a bug in the original delay logic, and stop conditions that sometimes don't work correctly.",
      correctOption: "b",
      explanation: "Rebuild. Four patches on a delay-based automation indicates accumulated complexity that makes debugging harder than rebuilding. A clean 30-minute rebuild will be more reliable."
    },
    {
      id: "3",
      content: "Your Meeting Logger stopped working because your Calendly OAuth token expired.",
      correctOption: "a",
      explanation: "Patch. Token expiry is a 1-minute fix — reconnect the app. Don't rebuild a working automation for a routine maintenance issue."
    },
    {
      id: "4",
      content: "Your original automation used a deprecated Zapier feature that Zapier is removing next month. The feature affects 6 of 8 steps in the automation.",
      correctOption: "b",
      explanation: "Rebuild. If 6 of 8 steps need to change, patching isn't realistic. Build the replacement cleanly before the deprecated feature is removed."
    }
  ]}
/>

---

## Building Your Debugging Playbook

Document your past failures so future-you spends less time diagnosing the same issues.

<TemplateBuilder
  title="My Debugging Playbook"
  persistKey="automation-L9-playbook"
  sections={[
    {
      id: "known_issues",
      title: "Known Issues and Fixes",
      fields: [
        {
          id: "issue1",
          label: "Past failure 1: What broke and how you fixed it",
          placeholder: "e.g., Lead Catcher broke on 2026-02-10. Cause: HubSpot OAuth expired. Fix: Reconnected HubSpot in Zapier Settings → Connected Accounts. Time to fix: 3 minutes.",
          type: "textarea"
        },
        {
          id: "issue2",
          label: "Past failure 2 (if any)",
          placeholder: "e.g., Meeting Logger stopped logging activities. Cause: Calendly field name changed from 'start_time' to 'event_start_time' after a Calendly update. Fix: Re-tested trigger, updated field mapping. Time to fix: 8 minutes.",
          type: "textarea"
        }
      ]
    },
    {
      id: "maintenance",
      title: "Preventive Maintenance Schedule",
      fields: [
        {
          id: "weekly",
          label: "Weekly check (what you verify every Friday)",
          placeholder: "e.g., Submit canary test form entry, verify Slack notification received. Check #automation-alerts Slack channel for any errors.",
          type: "textarea"
        },
        {
          id: "monthly",
          label: "Monthly check (first Monday of each month)",
          placeholder: "e.g., Review all automation run histories for errors. Reauthorize OAuth connections for all 5 automations. Check operation/task usage vs plan limits.",
          type: "textarea"
        }
      ]
    },
    {
      id: "contacts",
      title: "Escalation (When You Can't Fix It)",
      fields: [
        {
          id: "resources",
          label: "Resources to consult when stuck",
          placeholder: "e.g., Zapier Community (community.zapier.com), Make Community (community.make.com), Reddit r/zapier",
          type: "text"
        },
        {
          id: "support",
          label: "Support channels for each platform",
          placeholder: "e.g., Zapier chat support (Starter+), Make chat support (Core+), n8n community forum",
          type: "text"
        }
      ]
    }
  ]}
/>

---

## The Debugging Simulation

Let's practice. You'll diagnose five broken automations using the 5-step protocol.

<TimedChallenge
  title="Automation Debug Challenge"
  persistKey="automation-L9-timed"
  timeLimit={120}
  items={[
    {
      id: "1",
      prompt: "Error: '401 Unauthorized — invalid_token' from Slack API. The Deal Notification Zap last worked 3 days ago.",
      correctAnswer: "reconnect slack oauth",
      explanation: "401 Unauthorized = OAuth token issue. Fix: go to Zapier → Connected Accounts → Slack → Reconnect. Takes 60 seconds."
    },
    {
      id: "2",
      prompt: "Error: 'Required field missing: email — received undefined.' The Lead Catcher stopped working after you edited your Typeform form.",
      correctAnswer: "remap typeform email field",
      explanation: "Form edit changes field IDs. Fix: re-test the Typeform trigger to get updated field names → update the email field mapping in the HubSpot action step."
    },
    {
      id: "3",
      prompt: "No error in the log, but your Follow-Up Reminder tasks are being created even for contacts who have replied. Stop conditions appear to be failing.",
      correctAnswer: "check reply filter condition logic",
      explanation: "No error = the automation is running successfully, but the logic is wrong. Fix: check the filter step — the 'last reply date is empty' condition may be checking the wrong field or using incorrect operators."
    },
    {
      id: "4",
      prompt: "Error: '429 Too Many Requests — please wait 60 seconds.' Your Meeting Logger runs correctly for the first 3 meetings per day but fails on the 4th and beyond.",
      correctAnswer: "add delay between api calls",
      explanation: "429 = rate limit hit. Fix: add a Delay or Sleep module (2-3 seconds) between the CRM activity creation and deal stage update steps to spread out API calls."
    }
  ]}
/>

---

## Your Action Items

<InteractiveChecklist
  title="Lesson 9 Action Items"
  persistKey="automation-L9-actions"
  items={[
    "Enable email notifications for automation failures in Zapier and/or Make (Settings → Notifications)",
    "Create a #automation-alerts Slack channel and configure error routing to it",
    "Set up a weekly canary test: calendar event every Monday to submit a test form entry",
    "Add 'Automation Health Check' to your Friday review agenda (5 min check of error log)",
    "Duplicate each of your 5 automations as versioned backups with today's date in the name",
    "Start your Debugging Playbook — document any past failures you remember",
    "Bookmark your platform's error log URL for fast access when debugging"
  ]}
/>

---

## What's Next

In **Lesson 10**, you'll compile everything into your complete Automation Stack Blueprint — a visual map of all six automations, their connections, trigger sources, and the 7-day implementation sprint that gets your full stack live by end of week.

---

## Quiz: Debugging Automations

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What percentage of automation failures are auth-related (expired OAuth tokens)?",
      "options": ["15%", "25%", "60%", "90%"],
      "correctAnswer": 2,
      "explanation": "60% of automation failures are auth-related. OAuth tokens expire, apps revoke access when passwords change, and 2FA enablement can break connections. Reconnecting the app resolves these in under a minute."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "What is the first step of the 5-step debug protocol?",
      "options": [
        "Test the trigger with a sample event",
        "Reconnect all app authentications",
        "Read the error log and error message",
        "Rebuild the automation from scratch"
      ],
      "correctAnswer": 2,
      "explanation": "Always read the error log first. The error message often tells you exactly what's wrong — '401 Unauthorized' means reconnect, '400 Bad Request — missing field: email' means fix your mapping. Reading the log resolves 40-50% of issues immediately."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "You should rebuild an automation whenever it fails, to start fresh.",
      "correctAnswer": false,
      "explanation": "False. Most failures are fixed in under 10 minutes with the 5-step protocol. Rebuild only when an automation has been patched 3+ times and has accumulated complexity that makes debugging harder than rebuilding."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "What should you do BEFORE editing a working automation?",
      "options": [
        "Turn off the automation first",
        "Duplicate it with a date suffix as a versioned backup",
        "Export the automation configuration to a file",
        "Nothing — just edit it directly"
      ],
      "correctAnswer": 1,
      "explanation": "Always duplicate a working automation before editing. Name the duplicate with today's date. If your edit breaks the automation, reactivate the original version. This prevents data loss and downtime."
    }
  ]
}
```
