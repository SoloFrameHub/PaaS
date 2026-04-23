---
title: "SOP 1: Inbox Triage (Lead/Customer/Admin/Noise)"
duration: "50 min"
track: "Operations & Systems"
course: "Course 43: Outsourcing & VAs"
lesson: 3
---

## Why Inbox Triage Is the First SOP to Write

Your inbox is where revenue opportunity and admin chaos live in the same space. A lead inquiry can sit three emails below a vendor invoice and never get a reply because you ran out of energy sorting through everything above it.

Inbox triage is the highest-leverage task to delegate first — and the one that most directly protects revenue. A VA who can reliably sort your inbox into four categories and flag leads immediately is worth their monthly cost in the first week alone.

Response time to new leads is one of the most important variables in B2B sales. Research consistently shows that leads contacted within one hour are 7 times more likely to engage than leads contacted after an hour, and dramatically more likely to engage than leads reached after 24 hours. Your VA running the inbox triage SOP means leads get flagged the moment they arrive — not after you've cleared 40 other emails.

<InsightCard icon="📬" title="The Inbox Problem">
The average solo founder receives 50-150 emails per day. Approximately 30-40% of those are noise (spam, newsletters, irrelevant) even after standard filters. Without a triage system, every email sits in the same queue — leads compete for attention with LinkedIn notifications and vendor invoices. A VA with a clear SOP resolves this in 15-20 minutes per day.
</InsightCard>

## The Four Categories

Every incoming email belongs to exactly one category. Your VA's job is to make that classification call quickly and accurately:

<SlideNavigation>
<Slide title="Category 1: Lead">

**Definition:** A message from someone who is or could become a paying customer.

**Indicators:**
- Sender mentions your product, service, or pricing
- Sender requests a call, demo, or proposal
- Sender comes from a company that matches your Ideal Customer Profile (ICP)
- Sender was referred by a current customer or partner
- Sender responds to previous outreach with interest

**Lead subcategories:**
- **High priority:** Explicit interest, pricing question, meeting request → Flag immediately → Founder responds within 4 hours
- **Low priority:** General interest, early curiosity, inbound from unknown ICP-adjacent company → Tag in CRM → Add to nurture sequence

**What your VA should do:** Create or update a CRM contact, log the email as activity, and flag for your attention with a note: "Lead: [reason for classification]."

</Slide>

<Slide title="Category 2: Customer">

**Definition:** A message from someone already paying you.

**Indicators:**
- Sender email matches a known customer domain in your CRM
- Sender references an existing project, subscription, or engagement
- Sender was previously closed (CRM shows "Customer" or "Closed Won" stage)

**What your VA should do:** Log in CRM against the customer record. If it's a support question or feedback, route to you with context. If it's a scheduling request, handle directly using your Calendly link.

</Slide>

<Slide title="Category 3: Admin">

**Definition:** Internal, operational, or vendor communication that requires action but not sales attention.

**Indicators:**
- Invoices, receipts, or billing notifications
- Software tool notifications (Slack emails, GitHub alerts, calendar invites)
- Team or contractor updates
- Partnership or vendor communications

**What your VA should do:** File in the appropriate label/folder. If the email requires action (pay this invoice, approve this deliverable), create a task with a due date and flag for your weekly admin review.

</Slide>

<Slide title="Category 4: Noise">

**Definition:** Emails that require no action and add no value.

**Indicators:**
- Newsletters you're subscribed to but don't read
- Cold outreach spam (especially if clearly automated and low-quality)
- Promotional emails from tools you use
- Social media notification emails

**What your VA should do:** Archive or delete immediately. No CRM logging needed. If a newsletter looks valuable, move it to a "Read Later" folder rather than deleting.

</Slide>
</SlideNavigation>

## The Triage Decision Tree

Your VA should follow this logic for every incoming email:

<DecisionTree
  title="Inbox Triage Decision Tree"
  persistKey="outsourcing-L3-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "Is the sender a known customer (found in CRM as 'Customer' or 'Closed Won')?",
      choices: [
        { label: "Yes — known customer", nextNodeId: "customer" },
        { label: "No — not in CRM or not a customer", nextNodeId: "check-lead" }
      ]
    },
    {
      id: "customer",
      content: "Category: CUSTOMER. Log email against CRM record. Does it require founder response?",
      choices: [
        { label: "Yes — needs founder attention", nextNodeId: "customer-flag" },
        { label: "No — scheduling or routine question", nextNodeId: "customer-handle" }
      ]
    },
    {
      id: "customer-flag",
      content: "Flag for founder with context note. Log full email in CRM. VA done.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "customer-handle",
      content: "VA handles with approved template (e.g., Calendly link, standard response). Log in CRM. Done.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "check-lead",
      content: "Is the sender asking about your product, service, or pricing? Or requesting a meeting?",
      choices: [
        { label: "Yes — product/pricing/meeting interest", nextNodeId: "lead-high" },
        { label: "No — not an explicit lead signal", nextNodeId: "check-icp" }
      ]
    },
    {
      id: "lead-high",
      content: "Category: LEAD (High Priority). Create CRM contact immediately. Flag for founder with 4-hour response target. Note classification reason.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "check-icp",
      content: "Does the sender come from an ICP-matching company (check LinkedIn/website briefly)?",
      choices: [
        { label: "Yes — ICP match, even if not explicit interest", nextNodeId: "lead-low" },
        { label: "No — unclear or not ICP", nextNodeId: "check-admin" }
      ]
    },
    {
      id: "lead-low",
      content: "Category: LEAD (Low Priority). Create CRM contact. Add to nurture tag. Flag for weekly review rather than immediate response.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "check-admin",
      content: "Is this an invoice, vendor email, tool notification, or internal communication?",
      choices: [
        { label: "Yes — admin or operational", nextNodeId: "admin" },
        { label: "No — unclear or promotional", nextNodeId: "noise" }
      ]
    },
    {
      id: "admin",
      content: "Category: ADMIN. File in appropriate folder. If action required, create a task with due date. Flag for weekly admin review if needed.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "noise",
      content: "Category: NOISE. Archive or delete. No CRM logging needed. If unsure, tag as 'Unsure' and flag for founder review.",
      isTerminal: true,
      outcome: "neutral"
    }
  ]}
/>

## Building Your Triage SOP

Now let's build the actual document your VA will follow. A good SOP has six components: Purpose, Trigger, Steps, Decision Rules, Templates, and Escalation.

<TemplateBuilder
  title="Your Inbox Triage SOP"
  persistKey="outsourcing-L3-sop"
  sections={[
    {
      id: "purpose",
      title: "Purpose & Trigger",
      fields: [
        { id: "purpose", label: "SOP Purpose", placeholder: "e.g., Ensure every incoming email is categorized within 2 hours of arrival, leads are flagged immediately, and admin items are actioned or filed.", type: "textarea" },
        { id: "trigger", label: "When to Execute", placeholder: "e.g., Every morning (9 AM) and every afternoon (2 PM). Check inbox at these two times daily.", type: "text" },
        { id: "time", label: "Time Budget per Session", placeholder: "e.g., 15-20 minutes per session, 30-40 minutes total per day", type: "text" }
      ]
    },
    {
      id: "lead-rules",
      title: "Lead Classification Rules",
      fields: [
        { id: "lead-keywords", label: "Keywords That Signal a Lead", placeholder: "e.g., 'pricing', 'demo', 'call', 'interested in', 'how does', 'can you help'", type: "textarea" },
        { id: "icp-domains", label: "Known ICP Company Domains or Characteristics", placeholder: "e.g., SaaS companies with 10-100 employees, marketing agencies, e-commerce brands", type: "textarea" },
        { id: "lead-response-time", label: "Lead Response Time Target", placeholder: "e.g., High-priority leads: founder responds within 4 hours. Low-priority: reviewed at weekly pipeline meeting.", type: "text" }
      ]
    },
    {
      id: "customer-rules",
      title: "Customer Identification",
      fields: [
        { id: "customer-domains", label: "Known Customer Domains (or where VA checks)", placeholder: "e.g., Check CRM first. If in doubt, search sender email in HubSpot before classifying.", type: "textarea" },
        { id: "customer-routing", label: "How Customer Emails Are Routed", placeholder: "e.g., Support questions → flag for founder. Scheduling requests → VA sends Calendly link. Invoices → log and file.", type: "textarea" }
      ]
    },
    {
      id: "escalation",
      title: "Escalation Protocol",
      fields: [
        { id: "unsure", label: "When to Escalate (Unsure Cases)", placeholder: "e.g., If classification is unclear after 2 minutes of research, tag as 'Unsure' and flag for founder with full email quoted.", type: "textarea" },
        { id: "escalate-how", label: "How to Escalate", placeholder: "e.g., Send Slack message in #va-channel with: 'Escalation needed: [sender] — [reason uncertain]'", type: "text" }
      ]
    }
  ]}
/>

## Response Templates for Common Scenarios

Your VA should have pre-approved responses they can send directly — this removes the bottleneck of waiting for your approval on routine communication.

<ProgressiveReveal title="VA Response Templates" persistKey="outsourcing-L3-templates">

<RevealSection title="Template 1: Acknowledging an Inbound Lead">

**When to use:** Lead sends an inquiry email. You need to respond quickly while the lead is warm, but founder hasn't seen it yet. VA sends this to buy time.

---

Subject: Re: [Original Subject]

Hi [First Name],

Thank you for reaching out — I've passed your note along to [Founder Name] and they'll be in touch shortly.

In the meantime, if you'd like to book a brief call directly, you can grab a time here: [Calendly link]

Looking forward to connecting.

[Founder Name's Team]

---

**VA instructions:** Only use this template after flagging the email to the founder. Never promise a specific response timeframe you haven't confirmed.

</RevealSection>

<RevealSection title="Template 2: Meeting Scheduling for Existing Customers">

**When to use:** An existing customer asks to schedule a call, check-in, or discussion.

---

Subject: Re: [Original Subject]

Hi [First Name],

Happy to set up a time! Here's a link to [Founder Name]'s calendar — feel free to grab a slot that works best for you:

[Calendly link]

Looking forward to it.

[Founder Name's Team]

---

**VA instructions:** After sending, log the email in CRM against the customer record and note "Meeting requested — Calendly link sent."

</RevealSection>

<RevealSection title="Template 3: Sending Information to a Prospect">

**When to use:** A prospect asks for materials, case studies, or general information about your offer. Founder has pre-approved a specific set of collateral for this.

---

Subject: Re: [Original Subject]

Hi [First Name],

Thanks for your interest! I wanted to make sure you had the right resources to review:

[Insert pre-approved collateral link — case study, deck, etc.]

[Founder Name] will follow up with you [timeframe, if applicable]. In the meantime, if you have specific questions, feel free to reply here.

Best,

[Founder Name's Team]

---

**VA instructions:** Only send collateral that has been pre-approved by founder. If the prospect asks for something not in the approved list, escalate.

</RevealSection>

</ProgressiveReveal>

## QA: Checking Your VA's Triage Accuracy

A new VA will make mistakes, especially in weeks one and two. Your job is to catch errors early with spot-checks rather than reviewing every email.

<InteractiveChecklist
  title="Weekly Triage QA Checklist"
  persistKey="outsourcing-L3-qa"
  items={[
    "Review 10 random emails your VA categorized this week — check classification accuracy",
    "Check CRM: are all inbound leads from this week logged as contacts?",
    "Verify 'Unsure' tags were escalated and handled (no unsure emails left unresolved)",
    "Spot-check 3 emails in the 'Noise' or 'Archive' folder — did anything important get filed there?",
    "Review VA response templates sent this week — do they sound right? Any tone issues?",
    "Check that no Lead emails remained un-flagged for more than 4 hours"
  ]}
/>

## Train Your VA on Your Specific Context

The decision tree above is universal, but your VA needs to know YOUR specifics to classify accurately from day one:

<RewriteExercise
  title="VA Briefing Document"
  persistKey="outsourcing-L3-rewrite"
  original="Please sort my inbox. Leads should be flagged. Admin stuff should be filed. Noise can be deleted. Let me know if you're unsure about something."
  hint="A VA briefing document should give enough specifics that the VA can classify 90%+ of emails without asking you. Include: who your ICP is, known customer domains, lead signals specific to your business, and what 'Unsure' looks like."
  expertRewrite="You'll be triaging my inbox twice daily (9 AM and 2 PM). Here's what to look for: LEADS — anyone asking about [specific service], pricing for [offer], or requesting a call/demo. Also flag anyone from companies that match this profile: [ICP description]. Known customer domains include: [list]. ADMIN — invoices from [tools], contractor updates, calendar notifications. NOISE — newsletters (anything from Substack, beehiiv), cold outreach that's clearly templated, tool promotional emails. If you see an email and aren't sure within 2 minutes, tag it 'Unsure' and message me in Slack. I'd rather review 5 uncertain emails than miss a lead."
  criteria={[
    "Defines ICP characteristics clearly enough for a new VA to recognize",
    "Lists specific lead signal keywords or phrases",
    "Provides known customer domain examples",
    "Gives clear escalation guidance for uncertain cases",
    "Sets a response time expectation for high-priority leads"
  ]}
/>

## Practice: Classify These Real Inbox Scenarios

<TimedChallenge
  title="Triage Speed Drill"
  persistKey="outsourcing-L3-timed"
  timeLimit={120}
  items={[
    { id: "1", prompt: "Email from 'sarah@acmecorp.com' with subject: 'Question about your consulting services'", correctAnswer: "lead", explanation: "This is a Lead — explicit inquiry about your services from an unknown sender. Create CRM contact and flag for founder immediately." },
    { id: "2", prompt: "Email from Stripe: 'Your monthly invoice is ready'", correctAnswer: "admin", explanation: "Admin — billing notification. File under invoices/receipts. No CRM action needed." },
    { id: "3", prompt: "Email from 'john@currentclient.com' with subject: 'Can we move Tuesday's call?'", correctAnswer: "customer", explanation: "Customer — scheduling request from existing client. VA handles by sending Calendly link and logging in CRM." },
    { id: "4", prompt: "Email from Mailchimp: '5 tips for your next email campaign'", correctAnswer: "noise", explanation: "Noise — promotional content from a tool you use. Archive immediately, no action needed." },
    { id: "5", prompt: "Email from 'info@randomstartup.io' with subject: 'Partnership opportunity'", correctAnswer: "lead", explanation: "Potentially Lead — inbound partnership inquiry. Check LinkedIn to see if company matches ICP. If unclear, tag as Low Priority Lead and flag for weekly review." }
  ]}
/>

<InsightCard icon="🎯" title="The Goal: 90% Accuracy by Week 4">
A new VA won't triage perfectly in week one — and that's expected. Your job during onboarding is to catch errors early and update the SOP with specific examples. By week four, target 90%+ accuracy across all categories. Track this with your weekly QA spot-check.
</InsightCard>

<InteractiveChecklist
  title="Your Action Items Before Lesson 4"
  persistKey="outsourcing-L3-actions"
  items={[
    "Complete the Inbox Triage SOP using the TemplateBuilder above",
    "Write your Lead Classification Rules with specific keywords for your business",
    "List all known customer domains your VA should recognize immediately",
    "Finalize your VA response templates (acknowledging leads, scheduling, sending collateral)",
    "Set up a 'VA Inbox' label/folder system in Gmail or Outlook for categorization",
    "Read Lesson 4 to write SOP 2: CRM Updates"
  ]}
/>

## What's Next

In **Lesson 4**, you'll write your CRM Update SOP — the document that turns your VA into a daily pipeline manager. You'll define exactly how your VA updates deal stages, verifies next actions, and maintains CRM data quality. By the end of Lesson 4, your pipeline will never be stale again.
