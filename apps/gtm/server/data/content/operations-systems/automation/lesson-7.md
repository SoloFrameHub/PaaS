---
title: "Wiring Reply Detection → CRM → Tasks"
duration: "50 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 7
---

A prospect just replied to the cold email you sent four days ago. The reply is two sentences: "This actually looks interesting. Do you have any case studies for companies our size?"

Right now, what happens?

If you're lucky, you'll see it in your email within the hour and respond. But while you're reading it, your Instantly sequence is preparing to send a Day 7 follow-up. Your CRM still shows this contact as "Contacted." There's no task reminding you to respond. And you have 12 other emails in your inbox competing for attention.

The reply gets a good response — eventually. But the window of peak interest is closing.

The reply routing automation changes all of this. When the prospect replies, your CRM updates instantly, the follow-up sequence pauses, and a high-priority task appears in your CRM within seconds.

---

## The Reply Routing Problem

Most founders have solved the outbound side of their sales process — sequences, follow-ups, automations. But the inbound side (what happens when prospects reply) is still largely manual.

<InsightCard icon="⚠️" title="The Reply Gap">
30-50% of positive replies go unanswered within 24 hours. That's not because founders don't want to respond — it's because replies arrive in a separate channel (email) from where deals live (CRM), and there's no system bridging them.

Average reply-to-response time for solo founders: 6-12 hours. Target: under 4 hours for warm leads.
</InsightCard>

<FlipCard
  front="What happens when a reply is not detected?"
  back="Your follow-up sequence keeps running — you send a Day 7 follow-up to someone who already replied on Day 4. Your CRM still shows 'Contacted' even though the deal is now 'Engaged.' No task exists to prompt you to respond. The prospect feels like you're not paying attention."
/>

<FlipCard
  front="What happens when reply detection works perfectly?"
  back="Within 60 seconds of the reply: CRM stage updates to 'Engaged.' All active sequences for this contact pause. A task appears: 'Reply from [Name] — Respond within 4 hours.' You receive a Slack notification. The follow-up chain from Lesson 4 stops. You respond to a warm lead with full context, fast."
/>

---

## Reply Detection Methods

There is no single "reply detection" solution. Which method you use depends on your email setup:

<SlideNavigation>
<Slide title="Method 1: CRM Email Sync (Best)">

If your CRM natively syncs with your email inbox, it can detect inbound replies automatically.

**HubSpot:** The Gmail/Outlook integration (free) syncs inbound emails. When a tracked contact replies, HubSpot logs the activity and can trigger a workflow (HubSpot Starter required for workflows).

**Attio:** Built-in email sync detects replies automatically and updates contact activity timelines. Workflow automation available on Pro plan.

**Pipedrive:** Pipedrive's Smart Email BCC or native Gmail/Outlook sync logs replies. Pipedrive automations can trigger on email received.

**Setup:** Connect your email inbox to your CRM. Enable two-way sync. Verify that inbound emails from tracked contacts appear as activity records.

</Slide>

<Slide title="Method 2: Outreach Tool Webhooks (Most Common)">

If you use a dedicated outreach tool (Instantly, Smartlead, Lemlist, Reply.io), these tools detect replies because they're in the email sending path.

**Instantly:** Sends a webhook when a reply is detected. Trigger in Zapier: "New Reply in Instantly" → automation fires.

**Smartlead:** Same pattern — webhook on reply detected. Zapier integration available.

**Lemlist:** Built-in "Reply detected" trigger in Zapier.

**Reply.io:** Webhook support for reply events.

This is the cleanest method if you use a dedicated outreach tool. The tool sits in the email path and can definitively say "this contact replied to this sequence."

</Slide>

<Slide title="Method 3: Gmail/Outlook Filters + Zapier">

If you send outreach directly from Gmail or Outlook (without a dedicated tool), you can use email filtering.

**Gmail approach:**
1. Apply a label to all outbound prospecting emails (e.g., "Outreach")
2. In Zapier: Trigger = "Gmail — New Email Matching Search" where search = "label:outreach-replied is:inbox"
3. When a reply arrives in a thread tagged with "Outreach," Zapier fires

**The limitation:** This requires labeling outgoing emails and relying on Gmail's threading to connect replies. It works but is less reliable than methods 1 and 2.

</Slide>

<Slide title="Method 4: Manual BCC (Simplest Fallback)">

If none of the above are feasible:
1. BCC your CRM's BCC address on every outbound email
2. Your CRM logs the outbound email
3. When a reply comes in, manually log it in CRM and update the stage

This is not automation — but it's a documented process that prevents data loss. If you're not ready to automate reply detection, at least have the manual process.

</Slide>
</SlideNavigation>

---

## The Reply Routing Flow

Once you have reply detection working, here's the full automation:

<ProgressiveReveal title="The Reply Routing Automation" persistKey="automation-L7-flow">

<RevealSection title="Step 1: Reply Detected (Trigger)">

Method 1: CRM email sync detects inbound email from a tracked contact
Method 2: Outreach tool sends "Reply Detected" webhook to Zapier/Make
Method 3: Gmail filter matches a reply thread
Method 4: Manually triggered (fallback only)

The trigger fires with: contact email, reply content (if available), reply date/time, and sequence name (if from an outreach tool).

</RevealSection>

<RevealSection title="Step 2: Update CRM Stage">

Find the contact in your CRM (by email). Find their most recent open deal.

Update the deal stage:
- From: "Contacted" → To: "Engaged"
- If already at "Engaged" or beyond: don't downgrade — keep current stage
- If at "Lost": don't update — a reply to a lost deal may need manual review

Add a CRM activity record: type "Email," direction "Inbound," date: now, notes: include first 200 chars of reply if you have it.

</RevealSection>

<RevealSection title="Step 3: Pause Active Sequences">

If the contact is enrolled in an active outreach sequence (Instantly, Smartlead, Lemlist), pause or stop the sequence immediately.

**In Instantly:** Use Instantly's API or native reply detection (Instantly auto-pauses sequences on reply if you enable "Stop on Reply" in settings — verify this is enabled).

**In Smartlead:** Same — "Stop on Reply" setting in your campaign. Verify it's active.

**In Zapier/Make:** If your outreach tool doesn't auto-pause, add an action step to call the tool's API and pause the sequence for this email.

**Critical:** Test this step explicitly. A positive reply followed by a scheduled follow-up email is a common failure mode that damages relationships.

</RevealSection>

<RevealSection title="Step 4: Stop Follow-Up Reminder Chain">

The Day 3/7/14 chain from Lesson 4 should stop when a reply is detected.

If you implemented the chain with filters that check "last reply date," this should happen automatically. Verify by checking whether any active follow-up tasks exist for this contact after a reply is logged.

If the chain doesn't stop automatically:
- In Zapier: The filter condition "no reply logged" should return false → chain stops
- In Make: The filter at the start of each Day scenario should exclude contacts with recent reply activity

</RevealSection>

<RevealSection title="Step 5: Create Response Task">

Create a CRM task:

- **Subject:** "Reply from [Contact Name] — Respond within 4 hours"
- **Due date:** Now + 4 hours
- **Priority:** High
- **Notes:** [First 200 chars of reply content, if available] | [Original sequence name]

The 4-hour window creates urgency without being impossible for a solo founder.

</RevealSection>

<RevealSection title="Step 6: Slack Notification">

Send a high-priority Slack DM to yourself:

> 🔔 Reply from [Contact Name] at [Company]
> "[First 100 chars of reply...]"
> → CRM: [Deal link] | Respond by: [4 hours from now]

If the reply is from a high-value deal (deal amount > your threshold), add an 🚨 emoji and escalate to your phone via Slack notification settings.

</RevealSection>

</ProgressiveReveal>

---

## AI Reply Classification (Advanced)

The basic Reply Router treats all replies the same way. But replies are not all the same:

- **Positive:** "Yes, I'm interested. Can we schedule a call?"
- **Negative:** "Not interested, please don't contact me again."
- **Out of office:** "I'm on vacation until March 15. Please contact me after that."
- **Question:** "Do you have a case study for companies our size?"
- **Referral:** "I'm not the right person — you should talk to [Name]."

<InsightCard icon="🤖" title="AI Classification for Reply Routing">
You can use Make's AI module or a Zapier → OpenAI step to classify reply sentiment. Send the reply text to GPT-4o-mini with a prompt: "Classify this sales reply as: POSITIVE, NEGATIVE, OUT_OF_OFFICE, QUESTION, or REFERRAL. Reply with only the category label." Use the classification to route differently.

AI classification accuracy: 85-95%. Good enough for routing — not for auto-responding.
</InsightCard>

<DecisionTree
  title="Reply Classification → Routing Action"
  persistKey="automation-L7-routing-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "A reply has been detected from a prospect. AI has classified it. What does the routing do?",
      choices: [
        { label: "POSITIVE (interest expressed)", nextNodeId: "positive" },
        { label: "NEGATIVE (not interested / unsubscribe)", nextNodeId: "negative" },
        { label: "OUT_OF_OFFICE", nextNodeId: "ooo" },
        { label: "QUESTION (asks for more info)", nextNodeId: "question" },
        { label: "REFERRAL (wrong person)", nextNodeId: "referral" }
      ]
    },
    {
      id: "positive",
      content: "Priority response task (due: 2 hours). Update stage to Engaged. Slack DM with 🟢 indicator. Send to high-priority Slack channel if deal value > threshold.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "negative",
      content: "Update CRM: add tag 'Unsubscribed.' Update deal stage to 'Lost — Not Interested.' Pause all sequences. Create task: 'Review unsubscribe request — remove from all lists.' No response task created.",
      isTerminal: true,
      outcome: "negative"
    },
    {
      id: "ooo",
      content: "Parse return date from email (if available). Create task: 'Follow up with [Name] after [return date].' Pause sequences until return date. Update CRM: 'OOO until [date]' in notes.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "question",
      content: "Response task (due: 4 hours). Include question text in task notes. Update stage to Engaged. Slack notification with question highlighted. Normal priority.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "referral",
      content: "Parse referral name/contact from email (if available). Create task: 'Contact [referral name] at [company] — referred by [original contact].' Update CRM: 'Referred to [name].' Create new lead for the referred contact.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

---

## Building the AI Classification Step

Here's how to add AI classification to your reply routing automation:

<ExampleCard label="Make Scenario: Reply → AI → Route">
Scenario structure in Make:

1. **Webhook trigger** (from Instantly or your email tool)
2. **HTTP module** → OpenAI API → Chat Completions
   - Model: gpt-4o-mini
   - Prompt: "Classify this sales email reply into ONE of these categories: POSITIVE, NEGATIVE, OUT_OF_OFFICE, QUESTION, REFERRAL. Reply with ONLY the category label, nothing else. Reply text: [email body]"
3. **Router** → 5 branches based on AI response
4. Each branch → specific CRM updates + task creation + Slack notification

Cost per classification: ~$0.001 (gpt-4o-mini pricing). For 200 replies/month: $0.20. Negligible.
</ExampleCard>

<SwipeDecision
  title="Reply Scenario: How Should the Automation Route This?"
  description="Based on the reply content, decide how your automation should respond."
  optionA="Low-priority task (24hr response window)"
  optionB="High-priority task (2-4hr response window)"
  persistKey="automation-L7-swipe"
  cards={[
    {
      id: "1",
      content: "Reply: 'Thanks for reaching out. We're currently under contract with a competitor but let's reconnect in Q3.'",
      correctOption: "a",
      explanation: "Future interest but no immediate need. Low-priority task: 'Schedule Q3 follow-up' with reminder in 90 days. Don't waste a 4-hour window on a Q3 prospect."
    },
    {
      id: "2",
      content: "Reply: 'Actually, we've been looking for a solution like this. Can we hop on a call this week?'",
      correctOption: "b",
      explanation: "Active buying intent. High-priority task (2 hours). This prospect is ready to move — respond fast with a Calendly link and specific times."
    },
    {
      id: "3",
      content: "Reply: 'I'm not the right person for this. You should reach out to Sarah Chen, our VP of Operations.'",
      correctOption: "a",
      explanation: "Referral — valuable but not urgent. Create a new CRM contact for Sarah Chen with 'Referred by [contact]' as lead source. Normal priority task: 'Contact Sarah Chen — referral from [contact].'"
    },
    {
      id: "4",
      content: "Reply: 'This is interesting. What does pricing look like for a 15-person team?'",
      correctOption: "b",
      explanation: "Specific question with buying signal (team size given). High priority — they're evaluating. Respond within 4 hours with pricing and a soft call invitation."
    }
  ]}
/>

---

## Testing Your Reply Routing

<InteractiveChecklist
  title="Reply Routing Test Protocol"
  persistKey="automation-L7-test-checklist"
  items={[
    "Send a test outreach email from your outreach tool to a test email address you control",
    "Reply from the test address — verify the reply is detected by your automation trigger",
    "Verify CRM contact stage updated from 'Contacted' to 'Engaged'",
    "Verify active sequence paused for this contact in your outreach tool",
    "Verify CRM task created with 4-hour due window",
    "Verify Slack notification received with reply preview and deal link",
    "Verify Follow-Up Reminder chain stopped for this contact",
    "Test with a 'not interested' reply — verify deal moves to Lost, sequence paused, no response task created",
    "Test with an out-of-office reply — verify future follow-up task created with correct date"
  ]}
/>

---

## The Sequence Pause Verification

This is the most important test. If your sequences don't pause on reply, you're risking relationship damage.

<MiniRoleplay
  scenario="You sent a 5-email outreach sequence via Smartlead. The prospect replied positively on Day 4 (after email 2). Your reply routing fires and creates a task. But you forgot to verify the Smartlead 'Stop on Reply' setting. Email 3 goes out 6 hours later anyway."
  role="The prospect reading email 3"
  persistKey="automation-L7-roleplay"
  modelResponse="From the prospect's perspective: 'I replied to this person expressing interest, and they immediately sent me another generic follow-up like I hadn't said anything. Either they're not reading replies, or they have a completely automated system that doesn't care what I say.' This is one of the most common and damaging automation failures. The fix: (1) Enable 'Stop on Reply' in your outreach tool's settings — verify this is ON before running any sequence. (2) Add an explicit API call in your reply routing automation to pause the sequence for this email address as a backup check. (3) Test it: send yourself a test email, reply to it, and verify the next scheduled email does NOT go out."
/>

---

## Your Reply Routing Configuration

<TemplateBuilder
  title="My Reply Routing Blueprint"
  persistKey="automation-L7-blueprint"
  sections={[
    {
      id: "detection",
      title: "Reply Detection Method",
      fields: [
        {
          id: "method",
          label: "Primary detection method",
          placeholder: "e.g., Instantly webhook → Zapier, or HubSpot email sync",
          type: "text"
        },
        {
          id: "tools",
          label: "Tools involved in the detection chain",
          placeholder: "e.g., Instantly (sends reply webhook) → Zapier → HubSpot (update stage) → Slack (notify)",
          type: "textarea"
        }
      ]
    },
    {
      id: "routing",
      title: "Routing Rules",
      fields: [
        {
          id: "positive",
          label: "Positive reply action",
          placeholder: "e.g., Stage → Engaged, task due 2 hours, Slack DM with 🟢",
          type: "text"
        },
        {
          id: "negative",
          label: "Negative/unsubscribe reply action",
          placeholder: "e.g., Stage → Lost, tag 'Unsubscribed', all sequences paused, no task",
          type: "text"
        },
        {
          id: "ai_enabled",
          label: "AI classification enabled? (y/n) If yes, which model?",
          placeholder: "e.g., Yes — OpenAI gpt-4o-mini via Make HTTP module",
          type: "text"
        }
      ]
    },
    {
      id: "sequence_pause",
      title: "Sequence Pause Configuration",
      fields: [
        {
          id: "auto_pause",
          label: "Does your outreach tool auto-pause on reply? (verify this in settings)",
          placeholder: "e.g., Instantly: Stop on Reply = ENABLED (verified 2026-02-24)",
          type: "text"
        },
        {
          id: "backup_pause",
          label: "Backup API pause step in your automation?",
          placeholder: "e.g., Yes — Make HTTP module calls Instantly API to pause sequence as backup",
          type: "text"
        }
      ]
    }
  ]}
/>

---

## Your Action Items

<InteractiveChecklist
  title="Lesson 7 Action Items"
  persistKey="automation-L7-actions"
  items={[
    "Choose your reply detection method: CRM email sync, outreach tool webhook, or Gmail filter",
    "Verify 'Stop on Reply' is enabled in your outreach tool (Instantly/Smartlead/Lemlist settings)",
    "Build the basic reply routing: detection → CRM stage update → task creation → Slack notification",
    "Test with a positive reply AND a negative reply — verify different routing behavior",
    "Add AI classification if you want to route by sentiment (optional but powerful)",
    "Run the 9-step test protocol — specifically test the sequence pause step",
    "Monitor for the first 2 weeks: check that no sequences fire after a reply is detected"
  ]}
/>

---

## What's Next

In **Lesson 8**, you'll audit your complete automation budget against the $100/month target. You'll see exactly what you're spending across all five automations plus reply routing, identify where you can optimize costs, and calculate the real ROI of your automation stack.

---

## Quiz: Reply Detection and Routing

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What percentage of positive replies go unanswered within 24 hours?",
      "options": ["5-10%", "15-20%", "30-50%", "70-80%"],
      "correctAnswer": 2,
      "explanation": "30-50% of positive replies go unanswered within 24 hours. This is the biggest revenue leak in outbound — reply routing automation fixes it."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "What is the most critical step in the reply routing automation?",
      "options": [
        "Creating the Slack notification",
        "Updating the CRM stage",
        "Pausing active outreach sequences",
        "Classifying reply sentiment with AI"
      ],
      "correctAnswer": 2,
      "explanation": "Pausing active sequences is the most critical step. A positive reply followed by a scheduled follow-up email (because the sequence kept running) is one of the most damaging automation failures."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "AI reply classification should be used to automatically send responses without human review.",
      "correctAnswer": false,
      "explanation": "False. AI classification accuracy is 85-95% — good for routing (creating different tasks) but not reliable enough for auto-responding. Always keep human review in the response step."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "Which reply type requires the LOWEST urgency response task?",
      "options": [
        "Positive interest expressed",
        "Pricing question with team size specified",
        "Out-of-office with return date in 90 days",
        "Question about case studies"
      ],
      "correctAnswer": 2,
      "explanation": "Out-of-office with a 90-day return date requires a scheduled follow-up task, not an immediate response. The other three all indicate active engagement that warrants a 2-4 hour response."
    }
  ]
}
```
