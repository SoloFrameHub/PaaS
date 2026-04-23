---
title: "Deal Tracking & Custom Fields"
duration: "50 min"
track: "Operations & Systems"
course: "Course 40: Advanced CRM Setup"
lesson: 6
---

## The $47K Deal That Disappeared

Sarah had been nurturing a deal for six weeks. The prospect was engaged, the demos went well, and the pricing conversation felt warm. Then... silence.

She searched her CRM. The deal was still there, marked "Proposal Sent," but when she clicked into it, she found:
- A blank "Next Steps" field
- Three free-text notes that said things like "good call" and "follow up next week"
- No record of which competitor they were evaluating
- No indication of who the decision-maker actually was
- No timeline for when they'd decide

The deal had been sitting there for 18 days. No flags. No alerts. No AI agent could have helped her because **the CRM had no structured data to reason on**.

She lost the deal. Not because her product was wrong, but because her CRM was a memory with amnesia.

<InsightCard icon="🧠" title="The Core Problem">
Most CRMs are glorified spreadsheets. They store data, but they don't **enable action**. Every field you create should answer one question: "What decision does this help me make?"
</InsightCard>

Today, you're going to build a deal tracking system that doesn't just remember — it **thinks with you**.

---

## Section 1: Deal Record Architecture (The Non-Negotiables)

Every deal in your CRM needs a foundation. These fields are **mandatory** — without them, you're not tracking deals, you're collecting wish lists.

### The Core Deal Fields

<FlipCard 
  front="Deal Name" 
  back="Format: [Company Name] - [Product/Service]. Example: 'Acme Corp - Annual Plan'. Makes pipeline scanning instant." 
/>

<FlipCard 
  front="Deal Amount" 
  back="Expected revenue. Even if you don't know exact pricing yet, estimate. Blank amounts = invisible to forecasting." 
/>

<FlipCard 
  front="Close Date" 
  back="When you expect to close. Not a wish — a realistic target based on their buying timeline. Update weekly." 
/>

<FlipCard 
  front="Stage" 
  back="Where the deal sits in your pipeline. From Lesson 4: Lead → Contacted → Engaged → Meeting → Proposal → Won/Lost." 
/>

<FlipCard 
  front="Owner" 
  back="Who's responsible. For solo founders, it's you. For teams, this prevents 'I thought you were handling it' disasters." 
/>

<FlipCard 
  front="Associated Contacts" 
  back="Link every person involved. Champion, decision-maker, influencer, blocker. Multi-threading starts here." 
/>

<FlipCard 
  front="Associated Company" 
  back="Link to the company record. Keeps all deals with the same org connected. Critical for upsells and renewals." 
/>

### Why These Matter for AI

An AI agent can't help you if it doesn't know:
- **What** you're selling (deal name + amount)
- **When** it needs to close (close date)
- **Where** it is in the process (stage)
- **Who** is involved (contacts + company)

Without these, your AI is blind.

<RangeSlider 
  label="How many of your current deals have ALL 7 core fields filled out?" 
  min={0} 
  max={100} 
  lowLabel="None (0%)" 
  highLabel="All (100%)" 
  persistKey="crm-setup-L6-core-fields" 
/>

---

## Section 2: Custom Fields That Earn Their Place

Now we get to the fields that **differentiate** your CRM from a basic spreadsheet. But here's the rule:

**Every custom field must pass the "Would I Act on This?" test.**

If the answer is "maybe" or "it's nice to know," delete it. You're a solo founder. You don't have time for vanity metrics.

### The Essential Custom Fields

<SlideNavigation>
<Slide title="Lead Source">

**What it is:** Where this deal originated (LinkedIn DM, cold email, referral, inbound demo request, content download).

**Why it matters:** You need to know which channels produce revenue, not just leads. If 80% of your closed deals come from referrals but you're spending 80% of your time on cold email, you're misallocating effort.

**How to structure it:** Dropdown with 5-8 options. Examples:
- Inbound - Website Demo Request
- Outbound - Cold Email
- Outbound - LinkedIn DM
- Referral - Customer
- Referral - Partner
- Content - Webinar Attendee

**AI benefit:** Agents can prioritize leads from high-converting sources and deprioritize low-converters.

</Slide>

<Slide title="ICP Fit Score">

**What it is:** A 1-10 rating of how well this prospect matches your Ideal Customer Profile.

**Why it matters:** Not all deals are created equal. A 9/10 fit is worth 3x the effort of a 4/10 fit. This field lets you triage ruthlessly.

**How to structure it:** Number field (1-10) or dropdown (Low/Medium/High). Base it on:
- Company size (employee count or revenue)
- Industry match
- Role/title of buyer
- Tech stack (for SaaS)
- Budget signals

**AI benefit:** Agents can auto-score new leads and flag low-fit deals for disqualification.

</Slide>

<Slide title="Deal Priority">

**What it is:** Hot/Warm/Cold classification based on urgency and engagement.

**Why it matters:** When you have 20 open deals, you need to know which 5 to focus on **today**. Priority is your daily action filter.

**How to structure it:** Dropdown with 3 options:
- **Hot**: Active engagement, near-term close date, high intent signals
- **Warm**: Engaged but slower timeline, needs nurturing
- **Cold**: Low engagement, far-out close date, or stalled

**AI benefit:** Agents surface Hot deals first in daily briefings and auto-flag deals that drop from Hot to Cold.

</Slide>

<Slide title="Next Action & Date">

**What it is:** The specific next step you need to take, and when.

**Why it matters:** Deals without next actions die 2x faster (InsideSales.com). This field is your forcing function.

**How to structure it:** 
- **Next Action**: Text field (e.g., "Send case study," "Schedule demo," "Follow up on pricing question")
- **Next Action Date**: Date field (when you'll do it)

**AI benefit:** Agents can auto-generate daily task lists and flag overdue actions.

</Slide>

<Slide title="Competitor Mentioned">

**What it is:** Which competitors the prospect is evaluating.

**Why it matters:** If they're comparing you to Competitor X, you need to know X's weaknesses and your differentiation. This field triggers battle card lookup.

**How to structure it:** Multi-select dropdown with your top 5-10 competitors. Include "None" and "Unknown."

**AI benefit:** Agents can pull competitor-specific objection handling and differentiation talking points.

</Slide>

<Slide title="Champion Identified">

**What it is:** Yes/No — have you identified an internal advocate?

**Why it matters:** Deals with champions close at 3x the rate of deals without (Gartner). This is a leading indicator.

**How to structure it:** Checkbox (Yes/No) or dropdown (Yes/No/Searching).

**AI benefit:** Agents flag deals in late stages (Meeting, Proposal) without a champion as high-risk.

</Slide>

<Slide title="Decision Timeline">

**What it is:** When the prospect plans to make a decision (not when you hope to close).

**Why it matters:** Your close date should align with their decision timeline. Misalignment = missed forecasts.

**How to structure it:** Date field. Ask explicitly: "When do you need to have this decision made?"

**AI benefit:** Agents compare Decision Timeline to Close Date and flag mismatches.

</Slide>

<Slide title="Loss Reason">

**What it is:** Why you lost the deal (if you did).

**Why it matters:** Pattern recognition. If 60% of losses are "Price too high," you have a pricing problem, not a sales problem.

**How to structure it:** Dropdown with 8-12 options:
- Price too high
- Chose competitor X
- No budget
- Timing not right
- Feature gap
- Champion left company
- Went dark / No response
- Other (specify)

**AI benefit:** Agents analyze loss patterns and suggest positioning or pricing adjustments.

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Field Audit: Which of These Do You Actually Need?" 
  persistKey="crm-setup-L6-field-audit" 
  items={[
    "Lead Source (to measure channel ROI)",
    "ICP Fit Score (to prioritize ruthlessly)",
    "Deal Priority (Hot/Warm/Cold for daily focus)",
    "Next Action + Date (to prevent deals from dying)",
    "Competitor Mentioned (to trigger battle cards)",
    "Champion Identified (to flag risky deals)",
    "Decision Timeline (to align close dates)",
    "Loss Reason (to learn from failures)"
  ]} 
/>

---

## Section 3: The AI-Ready Schema (Designing for Machines)

Here's the truth: **free-text notes are invisible to AI**.

When you write "Had a great call, they're interested, follow up next week," an AI agent can't extract:
- What made the call great
- What specific interest they expressed
- What the actual next step is
- When "next week" is

You need **structured fields** that machines can reason on.

### The AI-Ready Field Schema Template

<TemplateBuilder
  title="Your AI-Ready Deal Schema"
  persistKey="crm-setup-L6-schema"
  sections={[
    {
      id: "contact-fields",
      title: "Contact-Level Fields",
      fields: [
        { id: "name", label: "Full Name", placeholder: "e.g., Sarah Chen", type: "text" },
        { id: "email", label: "Email", placeholder: "e.g., sarah@company.com", type: "text" },
        { id: "company", label: "Company Name", placeholder: "e.g., Acme Corp", type: "text" },
        { id: "role", label: "Job Title", placeholder: "e.g., VP of Marketing", type: "text" },
        { id: "linkedin", label: "LinkedIn URL", placeholder: "e.g., linkedin.com/in/sarahchen", type: "text" },
        { id: "icp-fit", label: "ICP Fit Score (1-10)", placeholder: "e.g., 8", type: "number" },
        { id: "disc", label: "DISC Type", placeholder: "e.g., D (Dominant)", type: "text" },
        { id: "lead-source", label: "Lead Source", placeholder: "e.g., LinkedIn DM", type: "text" },
        { id: "first-contact", label: "First Contact Date", placeholder: "e.g., 2025-01-15", type: "date" }
      ]
    },
    {
      id: "deal-fields",
      title: "Deal-Level Fields",
      fields: [
        { id: "deal-name", label: "Deal Name", placeholder: "e.g., Acme Corp - Annual Plan", type: "text" },
        { id: "amount", label: "Deal Amount ($)", placeholder: "e.g., 12000", type: "number" },
        { id: "stage", label: "Pipeline Stage", placeholder: "e.g., Meeting", type: "text" },
        { id: "close-date", label: "Expected Close Date", placeholder: "e.g., 2025-02-28", type: "date" },
        { id: "priority", label: "Priority (Hot/Warm/Cold)", placeholder: "e.g., Hot", type: "text" },
        { id: "lead-source-deal", label: "Lead Source", placeholder: "e.g., Referral - Customer", type: "text" },
        { id: "competitor", label: "Competitor Mentioned", placeholder: "e.g., Competitor X", type: "text" },
        { id: "champion", label: "Champion Identified (Y/N)", placeholder: "e.g., Yes", type: "text" },
        { id: "decision-timeline", label: "Decision Timeline", placeholder: "e.g., 2025-02-15", type: "date" }
      ]
    },
    {
      id: "event-log",
      title: "Event Log Fields (Per Interaction)",
      fields: [
        { id: "event-type", label: "Event Type", placeholder: "e.g., email_sent, call, meeting", type: "text" },
        { id: "event-date", label: "Event Date", placeholder: "e.g., 2025-01-20", type: "date" },
        { id: "event-outcome", label: "Outcome (Positive/Neutral/Negative)", placeholder: "e.g., Positive", type: "text" },
        { id: "next-action", label: "Next Action", placeholder: "e.g., Send case study", type: "textarea" },
        { id: "next-action-date", label: "Next Action Date", placeholder: "e.g., 2025-01-25", type: "date" }
      ]
    },
    {
      id: "health-indicators",
      title: "Health Indicator Fields (Auto-Calculated)",
      fields: [
        { id: "days-since-contact", label: "Days Since Last Contact", placeholder: "e.g., 3", type: "number" },
        { id: "avg-response-time", label: "Avg Response Time (hours)", placeholder: "e.g., 12", type: "number" },
        { id: "engagement-trend", label: "Engagement Trend (Up/Flat/Down)", placeholder: "e.g., Up", type: "text" },
        { id: "meetings-held", label: "Meetings Held (count)", placeholder: "e.g., 2", type: "number" },
        { id: "emails-exchanged", label: "Emails Exchanged (count)", placeholder: "e.g., 8", type: "number" }
      ]
    }
  ]}
/>

### Why This Schema Works for AI

1. **Structured Event Logs**: Instead of "Had a call," you log `event_type: call`, `event_outcome: positive`, `next_action: Send pricing`, `next_action_date: 2025-01-25`. An AI can parse this.

2. **Health Indicators**: Auto-calculated fields like "Days Since Last Contact" and "Engagement Trend" give AI agents **signals** to act on. If `days_since_contact > 14` and `engagement_trend = down`, the agent flags it.

3. **Categorical Tags**: Dropdowns (not free-text) for things like Priority, Stage, Competitor. AI can filter and group.

4. **Temporal Data**: Dates everywhere (first contact, close date, decision timeline, next action date). AI can build timelines and predict outcomes.

<ExampleCard label="AI Agent Query Example">
**Human:** "Which deals should I focus on today?"

**AI Agent (reasoning on structured CRM data):**
- Deal 1: Acme Corp - Annual Plan
  - Priority: Hot
  - Stage: Proposal
  - Next Action: Follow up on pricing question (due today)
  - Days Since Last Contact: 2
  - Champion Identified: Yes
  - **Recommendation:** Top priority. They're engaged, you have a champion, and pricing question is the last blocker.

- Deal 2: Beta Inc - Starter Plan
  - Priority: Warm
  - Stage: Meeting
  - Next Action: Send case study (due 2 days ago)
  - Days Since Last Contact: 9
  - Champion Identified: No
  - **Recommendation:** Medium priority. Overdue action, no champion yet. Send case study + ask for intro to decision-maker.

- Deal 3: Gamma LLC - Enterprise Plan
  - Priority: Cold
  - Stage: Engaged
  - Next Action: None
  - Days Since Last Contact: 18
  - Champion Identified: No
  - **Recommendation:** Low priority. Stalled. Send break-up email or move to Lost.

**Without structured data, the AI can't do this.**
</ExampleCard>

---

## Section 4: Structured Notes vs Free-Text (The Battle for AI Legibility)

Let's compare two ways to log the same sales call.

### Approach A: Free-Text Note

```
Had a good call with Sarah. She's interested in the annual plan. 
Mentioned they're also looking at Competitor X. Need to follow up 
next week with a case study. She seemed positive.
```

**What an AI can extract:** Almost nothing. "Good call" is subjective. "Interested" is vague. "Next week" is ambiguous. "Seemed positive" is a feeling, not data.

### Approach B: Structured Fields

| Field | Value |
|-------|-------|
| Event Type | Call |
| Event Date | 2025-01-20 |
| Event Outcome | Positive |
| Key Topics Discussed | Pricing (Annual Plan), Competitor Comparison |
| Objections Raised | Price vs Competitor X |
| Champion Identified | No (Sarah is influencer, not decision-maker) |
| Next Action | Send case study comparing us to Competitor X |
| Next Action Date | 2025-01-27 |
| Decision Timeline | End of Q1 (2025-03-31) |

**What an AI can extract:** Everything. It knows:
- The call was positive
- Pricing and competitor comparison are hot topics
- Sarah is an influencer, not the champion
- The next action is specific and dated
- The decision timeline is Q1

<ComparisonBuilder
  title="Convert Your Last Sales Call to Structured Data"
  persistKey="crm-setup-L6-structured-notes"
  prompt="Paste your most recent free-text sales note"
  expertExample="Event: Call | Date: 2025-01-20 | Outcome: Positive | Topics: Pricing, Competitor X | Objections: Price | Champion: No | Next Action: Send case study | Next Action Date: 2025-01-27 | Decision Timeline: Q1 2025"
  criteria={[
    "Event type and date specified",
    "Outcome categorized (Positive/Neutral/Negative)",
    "Next action is specific and dated",
    "Champion status clarified"
  ]}
/>

### The "Would an Agent Understand This?" Test

Before you save any note, ask:

> Could a GPT-4 class model extract the key insight from this field **without additional context**?

If the answer is no, structure it.

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Think of structured fields as **API parameters**. Free-text notes are like passing unstructured JSON to an endpoint — the agent has to guess what each field means. Structured fields are like a well-documented API with typed parameters. The agent knows exactly what to do.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches & Consultants">
Structured fields are like **intake forms** for your clients. Instead of asking them to "tell you about their challenges" (free-text), you ask specific questions: "What's your current revenue? What's your target? What's blocking you?" Same principle for CRM — structure the questions so the answers are actionable.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Creators">
Think of structured fields as **content tags**. When you tag a YouTube video with "SEO," "Tutorial," "Beginner," the algorithm knows what to do with it. Free-text descriptions are invisible to the algorithm. Same with CRM — tag your deals so AI can route them correctly.
</ContextualNote>

---

## Section 5: Activity Timeline (The AI Reasoning Chain)

Every interaction with a prospect should be logged as an **event** in a timeline. This timeline becomes the **reasoning chain** for AI agents.

### What to Log (and How)

<SlideNavigation>
<Slide title="Email Sent">

**Event Type:** `email_sent`  
**Required Fields:**
- Date/time
- Subject line
- Outcome (opened/clicked/no response)
- Next action triggered (if any)

**Why it matters:** AI can track email cadence and flag if you're over-emailing or under-following-up.

</Slide>

<Slide title="Email Received">

**Event Type:** `email_received`  
**Required Fields:**
- Date/time
- Sentiment (positive/neutral/negative/objection)
- Key topics mentioned
- Next action triggered

**Why it matters:** AI can detect engagement trends. If sentiment shifts from positive to neutral to negative, it flags the deal as at-risk.

</Slide>

<Slide title="Call">

**Event Type:** `call`  
**Required Fields:**
- Date/time
- Duration
- Outcome (positive/neutral/negative)
- Key topics discussed
- Objections raised
- Next action agreed

**Why it matters:** AI can correlate call frequency with close rates and suggest optimal call cadence.

</Slide>

<Slide title="Meeting (Demo, Discovery, Proposal Review)">

**Event Type:** `meeting`  
**Required Fields:**
- Date/time
- Meeting type (discovery/demo/proposal/close)
- Attendees (with roles)
- Outcome
- Next action agreed
- Decision timeline confirmed

**Why it matters:** AI can track multi-threading (how many stakeholders you've met) and flag deals with only one contact as risky.

</Slide>

<Slide title="Note (Manual Context)">

**Event Type:** `note`  
**Required Fields:**
- Date/time
- Note type (insight/objection/competitor-mention/champion-identified)
- Structured content (not free-text)

**Why it matters:** Even manual notes should be categorized so AI can filter and surface them.

</Slide>
</SlideNavigation>

### The Timeline in Action

Imagine this sequence of events for a deal:

1. **2025-01-10**: `email_sent` → No response
2. **2025-01-13**: `email_sent` (follow-up) → Opened, clicked
3. **2025-01-15**: `email_received` → Positive sentiment, requested demo
4. **2025-01-18**: `meeting` (demo) → Positive outcome, 3 attendees, next action: send proposal
5. **2025-01-20**: `email_sent` (proposal) → Opened
6. **2025-01-22**: `call` → Neutral outcome, objection raised (price), next action: send ROI calculator
7. **2025-01-25**: `email_sent` (ROI calculator) → No response yet
8. **2025-01-28**: `note` → Champion identified (Sarah, VP Marketing)

**What an AI agent can infer from this timeline:**

- The deal is **progressing** (moved from email to demo to proposal in 10 days)
- There's **engagement** (opened emails, attended demo with 3 people)
- There's a **blocker** (price objection on 2025-01-22)
- There's a **champion** (Sarah, identified on 2025-01-28)
- The **next action** is overdue (ROI calculator sent 3 days ago, no response)

**AI recommendation:** "Follow up on ROI calculator. Reference Sarah (champion) in the email. If no response in 2 days, escalate to a call."

<InsightCard icon="⚡" title="The Power of Timelines">
A timeline isn't just a log — it's a **story**. AI agents read stories to predict outcomes. The richer your timeline, the smarter your agents.
</InsightCard>

---

## Section 6: Field Naming Conventions (API-Ready from Day 1)

If you're going to build AI agents in Course 27, your field names need to be **machine-readable**.

### The Rules

1. **Prefix with category**: `fit_score`, `signal_last_email_opened`, `deal_priority`, `note_objection_type`
2. **Use snake_case**: `lead_source`, not `Lead Source` or `leadSource`
3. **Keep display names human-readable**: The field name in the database is `fit_score`, but the label you see in the UI is "ICP Fit Score (1-10)"
4. **Avoid spaces and special characters**: `next_action_date`, not `Next Action (Date)`
5. **Be consistent**: If you use `_date` for dates, use it everywhere (`first_contact_date`, `close_date`, `next_action_date`)

### Example Field Naming Schema

| Display Name | Field Name (Database) | Type |
|--------------|----------------------|------|
| ICP Fit Score (1-10) | `fit_score` | Number |
| Lead Source | `lead_source` | Dropdown |
| Deal Priority | `deal_priority` | Dropdown |
| Champion Identified | `champion_identified` | Checkbox |
| Next Action | `next_action` | Text |
| Next Action Date | `next_action_date` | Date |
| Days Since Last Contact | `health_days_since_contact` | Number (auto-calculated) |
| Engagement Trend | `health_engagement_trend` | Dropdown (auto-calculated) |

<LinterFeedback
  title="Field Name Linter"
  persistKey="crm-setup-L6-field-linter"
  inputLabel="Paste your field names (one per line)"
  rules={[
    { 
      id: "snake-case", 
      label: "Uses snake_case", 
      description: "All lowercase, words separated by underscores", 
      keywords: ["_"], 
      antiKeywords: [" ", "-", "camelCase"] 
    },
    { 
      id: "category-prefix", 
      label: "Has category prefix", 
      description: "Starts with fit_, signal_, deal_, note_, health_", 
      keywords: ["fit_", "signal_", "deal_", "note_", "health_"], 
      antiKeywords: [] 
    },
    { 
      id: "no-special-chars", 
      label: "No special characters", 
      description: "Only letters, numbers, and underscores", 
      keywords: [], 
      antiKeywords: ["(", ")", "!", "@", "#", "$", "%", "^", "&", "*"] 
    }
  ]}
/>

---

## Section 7: Putting It All Together (Your AI-Ready Deal Schema)

You've learned:
1. The 7 non-negotiable core fields
2. The 8 custom fields that earn their place
3. How to structure notes instead of free-texting
4. How to log events in a timeline
5. How to name fields for API compatibility

Now it's time to **build your schema**.

<InteractiveChecklist 
  title="Your AI-Ready Deal Schema Checklist" 
  persistKey="crm-setup-L6-schema-checklist" 
  items={[
    "Core fields configured: Deal Name, Amount, Close Date, Stage, Owner, Contacts, Company",
    "Custom fields added: Lead Source, ICP Fit Score, Priority, Next Action + Date, Competitor, Champion, Decision Timeline, Loss Reason",
    "Event log structure defined: event_type, event_date, event_outcome, next_action, next_action_date",
    "Health indicators planned: days_since_contact, avg_response_time, engagement_trend, meetings_held, emails_exchanged",
    "Field names follow snake_case convention with category prefixes",
    "Structured dropdowns replace free-text fields wherever possible",
    "Timeline logging is part of your daily workflow (log every email, call, meeting)",
    "Schema documented in a shareable format (spreadsheet or JSON) for Course 27 agent setup"
  ]} 
/>

### The Schema Export

Your final artifact for this lesson is a **Field Schema Document** that you can export as JSON and feed to AI agents in Course 27.

Here's what it should include:

```json
{
  "contact_fields": [
    { "name": "name", "type": "text", "required": true },
    { "name": "email", "type": "text", "required": true },
    { "name": "company", "type": "text", "required": true },
    { "name": "role", "type": "text", "required": false },
    { "name": "linkedin_url", "type": "url", "required": false },
    { "name": "fit_score", "type": "number", "range": [1, 10], "required": false },
    { "name": "disc_type", "type": "dropdown", "options": ["D", "I", "S", "C"], "required": false },
    { "name": "lead_source", "type": "dropdown", "options": ["Inbound - Website", "Outbound - Email", "Outbound - LinkedIn", "Referral - Customer", "Referral - Partner", "Content - Webinar"], "required": true },
    { "name": "first_contact_date", "type": "date", "required": true }
  ],
  "deal_fields": [
    { "name": "deal_name", "type": "text", "required": true },
    { "name": "amount", "type": "number", "required": true },
    { "name": "stage", "type": "dropdown", "options": ["Lead", "Contacted", "Engaged", "Meeting", "Proposal", "Won", "Lost"], "required": true },
    { "name": "close_date", "type": "date", "required": true },
    { "name": "deal_priority", "type": "dropdown", "options": ["Hot", "Warm", "Cold"], "required": true },
    { "name": "lead_source", "type": "dropdown", "options": ["Inbound - Website", "Outbound - Email", "Outbound - LinkedIn", "Referral - Customer", "Referral - Partner", "Content - Webinar"], "required": true },
    { "name": "competitor_mentioned", "type": "multi-select", "options": ["Competitor A", "Competitor B", "Competitor C", "None", "Unknown"], "required": false },
    { "name": "champion_identified", "type": "checkbox", "required": false },
    { "name": "decision_timeline", "type": "date", "required": false }
  ],
  "event_log_fields": [
    { "name": "event_type", "type": "dropdown", "options": ["email_sent", "email_received", "call", "meeting", "note"], "required": true },
    { "name": "event_date", "type": "datetime", "required": true },
    { "name": "event_outcome", "type": "dropdown", "options": ["positive", "neutral", "negative"], "required": true },
    { "name": "next_action", "type": "textarea", "required": false },
    { "name": "next_action_date", "type": "date", "required": false }
  ],
  "health_indicators": [
    { "name": "health_days_since_contact", "type": "number", "auto_calculated": true },
    { "name": "health_avg_response_time", "type": "number", "auto_calculated": true },
    { "name": "health_engagement_trend", "type": "dropdown", "options": ["up", "flat", "down"], "auto_calculated": true },
    { "name": "health_meetings_held", "type": "number", "auto_calculated": true },
    { "name": "health_emails_exchanged", "type": "number", "auto_calculated": true }
  ]
}
```

<ExampleCard label="How This Schema Powers AI Agents">
In Course 27, you'll build AI agents that:
- **Prioritize your day**: "Show me all Hot deals with overdue next actions"
- **Flag risks**: "Which deals are in Proposal stage without a champion?"
- **Suggest actions**: "Deal X has been in Engaged for 14 days with no next action. Recommend: Send break-up email or schedule call."
- **Analyze patterns**: "60% of losses are 'Price too high.' Consider testing a lower-tier offering."

**All of this requires structured data.** The schema you build today is the foundation for every AI agent you'll deploy tomorrow.
</ExampleCard>

---

## Summary: Your AI-Ready Deal Tracking System

You've just designed a CRM schema that doesn't just **store** data — it **enables action**.

Here's what you built:

1. **Core Deal Fields**: The 7 non-negotiables that every deal must have
2. **Custom Fields That Earn Their Place**: 8 fields that pass the "Would I Act on This?" test
3. **Structured Event Logs**: A timeline of every interaction, categorized and dated
4. **Health Indicators**: Auto-calculated signals that AI agents can reason on
5. **API-Ready Field Names**: snake_case with category prefixes for Course 27 integration

<InsightCard icon="🎯" title="The Real Win">
Sarah's $47K deal disappeared because her CRM had no structure. Your deals won't. You've built a system that **thinks with you** — and soon, AI agents will too.
</InsightCard>

<InteractiveChecklist 
  title="Your Action Items" 
  persistKey="crm-setup-L6-actions" 
  items={[
    "Audit your current CRM: which core fields are missing?",
    "Add the 8 custom fields that earn their place (or justify why you don't need them)",
    "Convert your last 3 sales notes from free-text to structured fields",
    "Set up event logging for emails, calls, and meetings",
    "Export your field schema as JSON for Course 27",
    "Test your schema: can an AI agent answer 'What should I do today?' from your CRM data alone?"
  ]} 
/>

---

## Quiz: Test Your Understanding

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "What is the 'Would I Act on This?' test?",
      "options": [
        "A test to see if a field triggers a decision or automation",
        "A test to see if a field looks professional",
        "A test to see if a field is required by the CRM",
        "A test to see if a field can be auto-filled"
      ],
      "correctAnswer": 0,
      "explanation": "Every custom field must pass this test: if the answer doesn't trigger a decision or automation, delete it. Solo founders don't have time for vanity metrics."
    },
    {
      "id": "q2",
      "question": "Why are free-text notes problematic for AI agents?",
      "options": [
        "They take too long to write",
        "They're invisible to AI — agents can't extract structured insights",
        "They're not searchable",
        "They require too much storage"
      ],
      "correctAnswer": 1,
      "explanation": "Free-text notes like 'Had a good call' are subjective and unstructured. AI agents need categorical fields (event_type, event_outcome, next_action) to reason on."
    },
    {
      "id": "q3",
      "question": "What's the benefit of logging events in a timeline (vs. just updating deal stage)?",
      "options": [
        "It looks more professional",
        "It creates a reasoning chain for AI agents to predict outcomes",
        "It's required by most CRMs",
        "It makes reports prettier"
      ],
      "correctAnswer": 1,
      "explanation": "A timeline of events (email_sent → email_received → call → meeting) tells a story. AI agents read stories to predict outcomes and suggest next actions."
    },
    {
      "id": "q4",
      "question": "Why use snake_case field names (e.g., 'fit_score') instead of 'Fit Score'?",
      "options": [
        "It's a CRM best practice",
        "It's required for API compatibility and Course 27 agent integration",
        "It saves storage space",
        "It's easier to type"
      ],
      "correctAnswer": 1,
      "explanation": "snake_case with category prefixes (fit_score, deal_priority, health_days_since_contact) makes fields machine-readable for AI agents and API integrations."
    },
    {
      "id": "q5",
      "question": "Which of these is a 'health indicator' field?",
      "options": [
        "Deal Name",
        "Days Since Last Contact",
        "Lead Source",
        "Competitor Mentioned"
      ],
      "correctAnswer": 1,
      "explanation": "Health indicators are auto-calculated signals like 'Days Since Last Contact,' 'Engagement Trend,' and 'Avg Response Time.' They give AI agents real-time deal health data."
    }
  ]
}