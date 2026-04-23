---
title: "Automation 4: Contract & Invoice Chaser"
duration: "45 min"
track: "Operations & Systems"
course: "Course 42: Sales Automation"
lesson: 5
---

You've done the hard part. You had the discovery call, delivered the demo, handled the objections, and sent the proposal. The prospect said "this looks great — I'll sign it this week."

That was 12 days ago.

The contract is sitting in their inbox, unsigned. You haven't followed up because it feels awkward to chase someone who already said yes. So you wait. And wait.

Every day the contract sits unsigned is a day your cash flow is delayed, your confidence erodes, and a competing priority might take over their decision.

The Contract Chaser eliminates the awkwardness. A system follows up — not you personally — and you follow up on the system's prompts when necessary.

---

## The Revenue Gap at the Closing Stage

Most founder automation thinking focuses on top-of-funnel: capturing leads, logging meetings, chasing cold prospects. But the biggest revenue leaks often happen at the bottom.

<InsightCard icon="💸" title="The Closing Stage Reality">
Average B2B contract signing time for SMB deals: 5-14 days. Beyond 14 days, the deal is at significant risk — competing priorities, budget reallocation, or lost momentum. 63% of proposals are signed within 3 days if followed up immediately. With no follow-up, that drops sharply.

On the invoice side: 30-40% of B2B invoices are paid late. Automated payment reminders reduce late payments by 30%.
</InsightCard>

<ExampleCard label="Case Study: The $18K That Almost Didn't Close">
Marco sent a $6,000/month proposal to a prospect who verbally committed. He didn't follow up because "they said they'd sign it." After 18 days of silence, he finally sent a check-in email.

The reply: "Oh, I meant to follow up — our legal team wanted one clarification. Can you add [simple clause] to the contract?"

It was a 10-minute fix. The contract was signed the next day.

**$6,000/month deal, nearly lost to an unsigned contract and two weeks of awkward silence.**

If his Contract Chaser had been running, he would have known about the legal question on Day 3.
</ExampleCard>

---

## The Contract Chaser Pattern

The Contract Chaser mirrors the Day 3/7/14 Follow-Up Reminder from Lesson 4 — but it targets the "Proposal Sent" stage instead of the "Contacted" stage.

<ProgressiveReveal title="The Contract Chaser Flow" persistKey="automation-L5-flow">

<RevealSection title="Trigger: Proposal Sent Stage">

The chain starts when your CRM deal moves to "Proposal" (or "Proposal Sent") stage.

**Alternative triggers:**
- E-signature tool sends a "Document Sent" webhook (DocuSign, SignWell, PandaDoc all support this)
- You manually move a CRM deal to "Proposal" stage

**The cleanest trigger:** Your e-signature tool (DocuSign/PandaDoc/SignWell) sends a webhook when a document is sent for signature. This is more specific than a CRM stage change and gives you the document URL to include in your notifications.

</RevealSection>

<RevealSection title="Day 3: Internal Reminder to You">

Three days after sending the proposal with no signature, you need a nudge.

**Action:** Create a CRM task OR send yourself a Slack message:

> 📋 Contract Check: [Deal Name] — $[Amount]
> Sent: [Date] | 3 days unsigned
> Direct link: [Document link] | CRM: [Deal link]
> Suggested action: Send a brief "Any questions?" email

**Why internal-only at Day 3:** Three days is normal. You're not harassing anyone. This is your internal awareness prompt. You decide whether to reach out or wait.

</RevealSection>

<RevealSection title="Day 7: Prospect Nudge (Task or Auto-Send)">

Seven days unsigned is approaching concerning territory. Time to reach out to the prospect.

**Task option (recommended):** Create a CRM task — "Contract follow-up: [Name] — Day 7". You write and send a personalized message.

**Auto-send option (e-signature tool):** PandaDoc and SignWell have built-in reminder features that auto-send a "reminder to sign" email from the platform. Enable these if available — they're cleaner than sending your own email.

**Template if sending manually:**
> Subject: Quick check on the [Company] proposal
>
> Hi [Name], just circling back on the proposal I sent on [date]. Happy to hop on a quick call if there are any questions or if the contract language needs any adjustments.
>
> Here's the signing link: [link]

</RevealSection>

<RevealSection title="Day 14: Escalation">

Fourteen days unsigned without explanation is a serious signal. Something is blocking the signature.

**Action:** Create a high-priority task to the founder:

> 🚨 Contract Escalation: [Deal Name] — 14 days unsigned
> Amount: $[Value] | Client: [Company]
> Action required: Call to identify blockers or close the deal as Lost — Stalled
> Suggested talk track: "I want to make sure we address any concerns before the proposal expires. Is there something specific holding things up?"

**Key decision:** After 14 days, you need to either identify the blocker and move forward, or close the deal as Lost and stop pursuing it. A deal that stays in "Proposal Sent" stage for 21+ days is not a pipeline asset — it's a false hope that inflates your forecast.

</RevealSection>

<RevealSection title="Stop Conditions">

The chain stops when any of these occur:
1. **Document signed** — e-signature tool sends a "Completed" webhook → stop chain, trigger onboarding automation
2. **Deal closed won** — CRM stage advances to "Closed Won"
3. **Deal closed lost** — CRM stage moves to "Closed Lost" or "Lost — Stalled"
4. **Manual pause** — You set a "Contract Chase Paused" flag (e.g., prospect said "signing next Monday")

</RevealSection>

</ProgressiveReveal>

---

## Build It: E-Signature Tool → Zapier/Make → Slack

<SlideNavigation>
<Slide title="Step 1: Trigger on Proposal Sent">

**If using PandaDoc:**
1. In Zapier: Trigger = "PandaDoc — Document Status Changed"
2. Status: "Sent for Signature"
3. Data available: recipient name, email, document name, document URL, expiration date

**If using SignWell:**
1. In Zapier: Trigger = "SignWell — New Document Request Completed" (choose "Document Sent" status)
2. Same data structure as PandaDoc

**If using DocuSign:**
1. In Zapier: Trigger = "DocuSign — Envelope Status Changed"
2. Status filter: "Sent"

**If no e-signature tool (manual contracts):**
1. Trigger = HubSpot/Pipedrive deal stage changed to "Proposal Sent"
2. This is less precise but functional

</Slide>

<Slide title="Step 2: Log to CRM and Start Timer">

After the trigger fires:
1. **Find the CRM deal:** Search by contact email (from the e-signature recipient field)
2. **Log CRM activity:** Create activity — type "Proposal Sent," date: today, notes: include document link
3. **Set a field on the deal:** "Proposal Sent Date" = today (you'll use this for reporting)
4. **Start the chaser:** Schedule Day 3, Day 7, and Day 14 follow-up tasks (using the same delay pattern from Lesson 4)

</Slide>

<Slide title="Step 3: Day 3 Internal Slack Alert">

Three days after the "Proposal Sent" trigger:
1. Add Delay step: 3 days
2. Check stop condition: Is deal still in "Proposal Sent" stage? If stage changed → stop
3. Send Slack message to yourself:
   > 📋 Contract unsealed: [Contact Name] at [Company] | $[Deal Amount]
   > Proposal sent 3 days ago — still unsigned
   > Document: [signing link] | CRM: [deal link]
4. Create CRM task: "Contract check-in — Day 3" due today

</Slide>

<Slide title="Step 4: Day 7 Prospect Outreach Task">

Seven days after proposal sent:
1. Add second Delay: 4 more days (total 7)
2. Check stop condition: Is deal still in "Proposal Sent" stage?
3. Create CRM task: "Day 7 contract follow-up — [Name]" due today
4. Include in task notes: Contract URL, original proposal date, deal amount
5. Optional Slack: "7-day contract follow-up task created for [Name] — take action today"

</Slide>

<Slide title="Step 5: Day 14 Escalation">

Fourteen days after proposal sent:
1. Add final Delay: 7 more days (total 14)
2. Check stop condition: Is deal still in "Proposal Sent" stage?
3. Create high-priority CRM task: "🚨 Contract escalation — 14 days unsigned: [Name]"
4. Task notes: "Either identify the blocker today or move to Lost — Stalled. Don't let this sit longer."
5. Slack: "Contract for [Name] ($[Amount]) is 14 days unsigned. Immediate action required."

</Slide>
</SlideNavigation>

---

## The Invoice Chaser: Same Pattern, Different Context

If you issue invoices (services, consulting, one-time projects), the same pattern applies to unpaid invoices.

<FlipCard
  front="Contract Chaser vs Invoice Chaser: What's different?"
  back="The Contract Chaser targets unsigned proposals (pre-revenue). The Invoice Chaser targets unpaid invoices (post-delivery, money owed). The emotional tone shifts: contract chasing is about keeping deals moving, invoice chasing is about collecting what you've already earned. Both use the Day 3/7/14 pattern."
/>

<FlipCard
  front="Invoice Chaser trigger: When does it start?"
  back="When an invoice is sent and payment is not received. Trigger from your invoicing tool (QuickBooks, FreshBooks, Stripe, Wave, Invoice Ninja) when invoice status = 'Sent' or 'Due.' Day 3: internal reminder. Day 7: automated payment reminder email (most invoicing tools do this natively). Day 14: personal follow-up call task. Day 30: pause service or escalate to collections."
/>

**Invoice template (Day 7 auto-send, via invoicing tool):**
> Subject: Invoice #[number] — Friendly reminder
>
> Hi [Name], just a quick reminder that invoice #[number] for $[amount] was due on [date]. You can pay via: [payment link].
>
> If there's an issue with the invoice or a question, just reply here.

**Day 14 escalation template (personal, via you):**
> Hi [Name], I'm following up on invoice #[number] — now 14 days past due. Is there an issue I can help resolve? I want to make sure we're squared up before [next deliverable/meeting].

---

## Connecting to Your E-Signature Tool

If you're not already using an e-signature tool, here's a quick comparison:

<ClassifyExercise
  title="E-Signature Tool: Best Use Case"
  persistKey="automation-L5-esig-classify"
  categories={[
    { id: "pandadoc", label: "PandaDoc", color: "#3b82f6" },
    { id: "signwell", label: "SignWell", color: "#10b981" },
    { id: "docusign", label: "DocuSign", color: "#f59e0b" },
    { id: "manual", label: "Manual PDF (no tool)", color: "#6b7280" }
  ]}
  items={[
    { id: "1", content: "You need built-in proposal templates with pricing tables and rich formatting", correctCategory: "pandadoc" },
    { id: "2", content: "You need the lowest-cost e-signature tool with Zapier integration ($8/month)", correctCategory: "signwell" },
    { id: "3", content: "Your enterprise clients require DocuSign specifically for legal compliance", correctCategory: "docusign" },
    { id: "4", content: "You sign fewer than 2 contracts per month and cost is the primary concern", correctCategory: "manual" },
    { id: "5", content: "You want built-in payment collection after signature (single-click payment on sign)", correctCategory: "pandadoc" },
    { id: "6", content: "You need a simple, reliable signature tool with a generous free tier (3 docs/month)", correctCategory: "signwell" }
  ]}
/>

---

## The Onboarding Trigger: What Happens When They Sign

The Contract Chaser is a stop-gap that handles delays. But when a signature comes in, you also need an onboarding trigger.

<InsightCard icon="🎉" title="The Deal Won Moment">
When the e-signature tool sends a "Document Completed" webhook, you can trigger:
1. A Slack celebration message to yourself (dopamine reinforcement — it matters)
2. A CRM stage update to "Closed Won"
3. A new customer onboarding task list in your CRM or project management tool
4. An automated welcome email to the new client

This is separate from the Contract Chaser — it's the happy path. Build it alongside the chaser so the completion event is handled as well as the delay events.
</InsightCard>

<TemplateBuilder
  title="My Contract Chaser Configuration"
  persistKey="automation-L5-config"
  sections={[
    {
      id: "tools",
      title: "Tools in My Stack",
      fields: [
        {
          id: "esig_tool",
          label: "E-signature tool (or 'Manual contracts')",
          placeholder: "e.g., PandaDoc, SignWell, DocuSign, or Manual PDF",
          type: "text"
        },
        {
          id: "invoice_tool",
          label: "Invoicing tool (if applicable)",
          placeholder: "e.g., QuickBooks, FreshBooks, Stripe, Wave, or N/A",
          type: "text"
        },
        {
          id: "automation_platform",
          label: "Automation platform connecting everything",
          placeholder: "e.g., Zapier Starter, Make Core",
          type: "text"
        }
      ]
    },
    {
      id: "timing",
      title: "Chaser Timing Configuration",
      fields: [
        {
          id: "day3",
          label: "Day 3 action",
          placeholder: "e.g., Slack internal alert only (don't contact prospect yet)",
          type: "text"
        },
        {
          id: "day7",
          label: "Day 7 action",
          placeholder: "e.g., Create CRM task to send personalized follow-up email",
          type: "text"
        },
        {
          id: "day14",
          label: "Day 14 action",
          placeholder: "e.g., High-priority CRM task: call to identify blocker or mark Lost",
          type: "text"
        }
      ]
    },
    {
      id: "stop_conditions",
      title: "Stop Conditions Configured",
      fields: [
        {
          id: "conditions",
          label: "List the stop conditions you've implemented",
          placeholder: "e.g., Document signed (PandaDoc webhook), Deal stage = Closed Won, Deal stage = Closed Lost, Manual 'Pause' CRM field",
          type: "textarea"
        }
      ]
    },
    {
      id: "onboarding",
      title: "Deal Won Trigger",
      fields: [
        {
          id: "won_actions",
          label: "What happens automatically when the contract is signed?",
          placeholder: "e.g., Slack celebration → CRM update to Closed Won → Create onboarding task list → Send welcome email template",
          type: "textarea"
        }
      ]
    }
  ]}
/>

---

## Testing the Contract Chaser

<InteractiveChecklist
  title="Contract Chaser Test Protocol"
  persistKey="automation-L5-test-checklist"
  items={[
    "Send a test document to yourself via your e-signature tool — verify the trigger fires in Zapier/Make",
    "Verify CRM activity created with 'Proposal Sent' type and correct deal association",
    "Verify 'Proposal Sent Date' field set on the deal",
    "Wait for Day 3 delay (or manually trigger in test mode) — verify Slack alert received",
    "Simulate signing the document — verify the chain stops and 'Deal Won' actions fire",
    "Simulate moving deal to 'Closed Lost' — verify chain stops",
    "For invoice chaser: send a test invoice and verify Day 7 reminder sends correctly",
    "Check that your contract template's Zapier/Make webhook connection is active and authorized"
  ]}
/>

---

## Your Action Items

<InteractiveChecklist
  title="Lesson 5 Action Items"
  persistKey="automation-L5-actions"
  items={[
    "If you don't use an e-signature tool, choose one: SignWell (free tier, $8/month paid) or PandaDoc (free tier)",
    "Build the Contract Chaser: e-signature 'Document Sent' → CRM log → Day 3/7/14 task chain",
    "Add all stop conditions: document signed, deal closed won, deal closed lost, manual pause",
    "Build the Deal Won trigger: signature → Slack celebration → CRM update → onboarding tasks",
    "If you issue invoices: configure the Invoice Chaser (Day 3/7/14 pattern for unpaid invoices)",
    "Run the 8-step test protocol above",
    "Audit your current pipeline: how many proposals have been sitting unsigned for >7 days?"
  ]}
/>

---

## What's Next

In **Lesson 6** (already built), you learned Deal Notifications — the Slack/email alerts that keep you informed about key pipeline events without living inside your CRM.

In **Lesson 7**, you'll build the most technically interesting automation: wiring reply detection to CRM updates and tasks. When a prospect replies to your outreach, the automation should update their CRM stage, pause any active sequences, and create a response task — all without you touching a button.

---

## Quiz: Contract & Invoice Chaser

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "How long does the average B2B SMB contract take to sign?",
      "options": ["1-3 days", "5-14 days", "30-60 days", "90+ days"],
      "correctAnswer": 1,
      "explanation": "Average B2B SMB contract signing time is 5-14 days. Beyond 14 days, the deal is at significant risk of stalling or losing momentum to competing priorities."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "What should the Day 3 Contract Chaser action be?",
      "options": [
        "Auto-send a follow-up email to the prospect",
        "Internal reminder to you only — don't contact the prospect yet",
        "Call the prospect directly",
        "Cancel the proposal and resend it"
      ],
      "correctAnswer": 1,
      "explanation": "Day 3 is normal. An internal reminder only — you decide if action is needed. Auto-sending a follow-up at Day 3 is premature and can feel pushy."
    },
    {
      "id": "q3",
      "type": "true-false",
      "question": "A deal that has been in 'Proposal Sent' stage for 21 days is a strong pipeline asset.",
      "correctAnswer": false,
      "explanation": "False. A deal unsigned for 21+ days is not a reliable pipeline asset — it inflates your forecast with deals that are likely stalled or dead. The Contract Chaser's Day 14 escalation should trigger a decision: identify the blocker or close as Lost."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "What additional automation should you trigger when a contract is signed?",
      "options": [
        "Nothing — the chaser stops automatically",
        "Another follow-up sequence",
        "A Deal Won trigger: CRM update + celebration notification + onboarding tasks",
        "A new proposal for a bigger deal"
      ],
      "correctAnswer": 2,
      "explanation": "When the contract is signed, trigger: Slack celebration, CRM stage update to Closed Won, and a new customer onboarding task list. The 'happy path' automation handles completion just as the Contract Chaser handles delays."
    }
  ]
}
```
