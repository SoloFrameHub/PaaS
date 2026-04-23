---
title: "Minimum Viable Marketing Stack: The $150 Toolkit"
duration: "55 min"
track: "Marketing Engine"
course: "Course 12: Marketing Automation & Analytics"
lesson: 5
---

# Minimum Viable Marketing Stack: The $150 Toolkit

One of the most common excuses for not having a sophisticated marketing system is: *"I can't afford the tools."*

Founders look at Enterprise platforms like Salesforce, Marketo, or HubSpot Enterprise, see the $3,000/month price tag, and assume they are priced out of automation.
They assume they are doomed to manual spreadsheets and random Gmail follow-ups.

They are wrong.

<InsightCard icon="💡" title="The Golden Age of Micro-SaaS">
We are living in the golden age of the **"Micro-SaaS Free Tier."** You can build a marketing stack that rivals a Fortune 500 setup for less than the cost of a daily latte.
</InsightCard>

Your goal is a **Minimum Viable Stack (MVS)**—the smallest collection of tools that allows you to capture, nurture, score, and close leads without manual friction.

In this lesson, I will give you the specific roadmap at three budget levels: $0, $50, and $150.

---

## 1. The Core Philosophy: "The Single Source of Truth"

Before we pick tools, we must pick a philosophy.
The biggest mistake founders make is "Data Silos."
*   Your email list is in Mailchimp.
*   Your deal pipeline is in a Spreadsheet.
*   Your meeting notes are in Notion.
*   Your forms are in Typeform.

**None of these talk to each other.**
This means you have no idea if *Subscriber A* is also *Prospect B*.

<FlipCard front="Rule #1: The Central Brain" back="You must have a Central Brain (CRM) where all data eventually flows. Every tool in your stack must answer to the Brain. No exceptions." />

---

## 2. Phase 1: The $0/Month "Validation" Stack

If you have $0 budget, you can still have a professional automation system.

<SlideNavigation>
<Slide title="The Brain (CRM): HubSpot Free">
**Why:** It is the only free CRM that gives you unlimited users and 1 million contacts. It allows you to track email opens and log meetings automatically.

**What you get:** Contact management, deal pipeline, email tracking, meeting logging.
</Slide>

<Slide title="The Face (Landing Page): Carrd">
**Why:** You can build a high-converting one-page site in 30 minutes.

**What you get:** Simple, fast landing pages with forms that can connect to your CRM.
</Slide>

<Slide title="The Voice (Email): MailerLite">
**Why:** Unlike Mailchimp, their free plan includes *Automation* (sequences), which is critical for us.

**What you get:** Up to 1,000 subscribers, automated email sequences, basic segmentation.
</Slide>

<Slide title="The Calendar: Calendly">
**Why:** One event type is free. Perfect for "Book a Demo."

**What you get:** Automated scheduling, calendar sync, email reminders.
</Slide>

<Slide title="The Analytics: Google Analytics 4">
**Why:** Industry standard.

**What you get:** Traffic tracking, conversion events, audience insights.
</Slide>
</SlideNavigation>

**Total Cost: $0.**
**Capabilities:** You can capture a lead, send an automated welcome sequence, allow them to book a meeting, and track the deal stage—all for zero dollars.

---

## 3. Phase 2: The $50/Month "Professional" Stack

Once you are making >$500/mo, you should pay to save time and remove "Powered by" branding.

*   **The Brain:** **HubSpot Free** (Still good enough).
*   **The Glue:** **Zapier Starter** ($20/mo).
    *   *Why:* This connects your tools. *Example:* When someone fills out a Typeform, Zapier creates a Deal in HubSpot and sends you a Slack notification.
*   **The Face:** **Carrd Pro** ($19/YEAR) or **Framer** ($5-10/mo).
    *   *Why:* Custom domain name (no more `.carrd.co`), better design controls.
*   **The Intelligence:** **Plausible Analytics** ($9/mo).
    *   *Why:* Google Analytics is ugly and invasive. Plausible is privacy-friendly, lightweight, and beautiful.
*   **The Voice:** **ConvertKit Creator** ($29/mo).
    *   *Why:* If you are a Creator/Coach, ConvertKit handles "Tagging" better than MailerLite.

**Total Cost: ~$58/month.**
**Capabilities:** Custom domain, multi-step zaps (automation), better segmentation.

<ScenarioSimulator
  title="Stack ROI Calculator"
  persistKey="course-12-marketing-automation-analytics-L5-roi"
  levers={[
    { id: "budget", label: "Monthly tool budget ($)", min: 0, max: 200, step: 10, defaultValue: 50 },
    { id: "leads", label: "Leads per month", min: 10, max: 500, step: 10, defaultValue: 100 },
    { id: "conversionBoost", label: "Automation conversion boost (%)", min: 0, max: 50, step: 5, defaultValue: 20 }
  ]}
  outputs={[
    { id: "extraDeals", label: "Extra deals from automation", formula: "(leads * (conversionBoost / 100) * 0.1)", unit: "", precision: 1 },
    { id: "costPerDeal", label: "Cost per extra deal", formula: "(budget / (leads * (conversionBoost / 100) * 0.1))", unit: "$", precision: 0 }
  ]}
  insight="At {extraDeals} extra deals per month, you're paying ${costPerDeal} per deal. If your average deal value is >$500, this stack pays for itself 10x over."
/>

---

## 4. Phase 3: The $150/Month "Scale" Stack

When you are generating >$5k/mo, you need tools that help you **Convert** and **Operate**.

*   **The Brain:** **HubSpot Starter** ($15-20/mo).
    *   *Why:* Removes HubSpot branding, adds simple automation inside the CRM, and unlocks email health insights.
*   **The Video Weapon:** **Loom** ($12.50/mo) or **Vimeo** ($20/mo).
    *   *Why:* Sending personal video replies to leads increases conversion by 30-50%.
*   **The Social Proof:** **Senja.io** ($19/mo).
    *   *Why:* Automates the collection of testimonials and creates "Wall of Love" widgets for your site.
*   **The Automation:** **Make.com** ($9-20/mo).
    *   *Why:* Cheaper and more powerful than Zapier for complex workflows.
*   **The Scheduler:** **SavvyCal** ($12/mo).
    *   *Why:* Better user experience than Calendly (overlays on your calendar).

**Total Cost: ~$100-$150/month.**
**Capabilities:** Full "RevOps" engine. Automated testimonial collection, video selling, robust CRM reporting.

---

## 5. Tool Selection Criteria (How to Choose)

Don't buy tools because they are "Cool." Buy them to solve problems.

<ProgressiveReveal title="The 3 Rules of Tool Selection" persistKey="course-12-marketing-automation-analytics-L5-rules">
<RevealSection title="Rule 1: Native Integration First">
If Tool A talks to HubSpot natively, use it. If Tool B requires a Zapier hack to talk to HubSpot, avoid it. Native integrations are faster and don't break.

**Why it matters:** Zapier costs money per task and can break when APIs change. Native integrations are built into the product and maintained by the vendor.
</RevealSection>

<RevealSection title="Rule 2: The 'Export' Rule">
Never put data into a tool that doesn't let you export it as a CSV. You need to own your data.

**Why it matters:** Vendor lock-in is real. If you can't export your contacts, you're trapped. Always verify export capability before committing.
</RevealSection>

<RevealSection title="Rule 3: Avoid 'All-in-One' Traps">
Tools like "ClickFunnels" or "Kajabi" try to do everything (Email + Website + CRM). They usually do all of them mediocrily.

I prefer a **"Best-in-Breed"** stack (Best CRM + Best Email) connected by APIs. It is more flexible and cheaper in the long run.

**Why it matters:** When one piece of your stack needs upgrading, you can swap it out without rebuilding everything.
</RevealSection>
</ProgressiveReveal>

---

## 6. Dual Context Examples

<StrategyDuel
  title="B2B SaaS vs. Creator Stack"
  persistKey="course-12-marketing-automation-analytics-L5-duel"
  scenario="You have $60/month to spend on your marketing stack."
  strategyA={{
    name: "B2B SaaS Stack",
    description: "Framer + Supabase + HubSpot Free + Webhooks",
    pros: ["Code-friendly", "Product data integrated", "Scalable architecture"],
    cons: ["Requires technical setup", "More moving parts"]
  }}
  strategyB={{
    name: "Creator Stack",
    description: "Carrd + ConvertKit + LemonSqueezy",
    pros: ["No-code setup", "Strong email tagging", "Tax handling built-in"],
    cons: ["Less CRM depth", "Limited product analytics"]
  }}
  expertVerdict="Choose based on your core skill. Devs should leverage Supabase webhooks. Creators need ConvertKit's tagging and LemonSqueezy's merchant-of-record tax handling."
/>

### Scenario A: B2B SaaS (The Bootstrapped Dev)
*   **Stack:** $60/mo.
*   **Website:** Framer (Best for design).
*   **Auth/Data:** Supabase (Product DB).
*   **CRM:** HubSpot Free.
*   **Connection:** When a user signs up (Supabase), a Webhook fires to HubSpot to create a Contact.
*   **Why:** The dev wants to stay in code, but needs sales data in a CRM.

### Scenario B: Creator/Coach (The Newsletter Writer)
*   **Stack:** $40/mo.
*   **Website:** Carrd ($19/yr).
*   **Email:** ConvertKit ($29/mo).
*   **Commerce:** LemonSqueezy (Handles Tax).
*   **Why:** The Creator needs "Merchant of Record" (Tax handling) and strong email tagging. CRM matters less.

---

## 7. Summary Checklist

<InteractiveChecklist 
  title="Your Stack Health Check" 
  persistKey="course-12-marketing-automation-analytics-L5-checklist" 
  items={[
    "Central Brain: I have one place (HubSpot/ConvertKit) where ALL contacts live",
    "No Silos: My form tool sends data to my Brain automatically",
    "Budget Check: I've audited my subscriptions and canceled unused 'Pro' features",
    "Calendar: I have a booking link to avoid 'When are you free' emails",
    "Agility: I can swap out my website tool without losing my email list (decoupled stack)",
    "Export Ready: Every tool I use allows CSV export of my data"
  ]} 
/>

---

## 8. Practice Exercise: The Stack Audit

<TemplateBuilder
  title="Your Stack Audit"
  persistKey="course-12-marketing-automation-analytics-L5-audit"
  sections={[
    {
      id: "current-tools",
      title: "Step 1: List Your Current Tools",
      fields: [
        { id: "tool1", label: "Tool 1", placeholder: "e.g., Mailchimp - $29/mo", type: "text" },
        { id: "tool2", label: "Tool 2", placeholder: "e.g., Calendly Pro - $12/mo", type: "text" },
        { id: "tool3", label: "Tool 3", placeholder: "e.g., Webflow - $16/mo", type: "text" },
        { id: "tool4", label: "Tool 4 (optional)", placeholder: "Add more if needed", type: "text" },
        { id: "totalCost", label: "Total Monthly Cost", placeholder: "$___", type: "text" }
      ]
    },
    {
      id: "data-flow",
      title: "Step 2: Map the Data Flow",
      fields: [
        { id: "formToCrm", label: "Website Form → CRM", placeholder: "e.g., Typeform → Manual CSV → HubSpot (BROKEN)", type: "textarea" },
        { id: "emailToCrm", label: "Email Tool → CRM", placeholder: "e.g., Mailchimp → No connection (SILO)", type: "textarea" },
        { id: "breaks", label: "Where are the breaks?", placeholder: "List any manual export/import steps", type: "textarea" }
      ]
    },
    {
      id: "optimization",
      title: "Step 3: The Cuts & Fixes",
      fields: [
        { id: "downgrade", label: "Tool to downgrade/cancel", placeholder: "e.g., Calendly Pro → Free (save $12/mo)", type: "text" },
        { id: "fixSilo", label: "Silo to fix", placeholder: "e.g., Add Zapier to connect Typeform → HubSpot", type: "text" },
        { id: "savings", label: "Estimated monthly savings", placeholder: "$___", type: "text" }
      ]
    }
  ]}
/>

<RangeSlider 
  label="How confident are you in your current stack architecture?" 
  min={1} 
  max={10} 
  lowLabel="Total mess" 
  highLabel="Perfectly optimized" 
  persistKey="course-12-marketing-automation-analytics-L5-confidence" 
/>

---

## Quiz: Stack Architecture

```json
{
  "quizId": "tech-stack-basics",
  "title": "Building the Minimum Viable Stack",
  "questions": [
    {
      "id": "ts1",
      "type": "multiple-choice",
      "text": "What is the 'Central Brain' of your marketing stack?",
      "options": [
        { "id": "a", "text": "Your Twitter account." },
        { "id": "b", "text": "The CRM (Customer Relationship Management) system." },
        { "id": "c", "text": "Excel." },
        { "id": "d", "text": "Your inbox." }
      ],
      "correctAnswer": "b",
      "explanation": "The CRM (like HubSpot) is the single source of truth. All leads, history, and deal data must live there so you can track the relationship."
    },
    {
      "id": "ts2",
      "type": "multiple-choice",
      "text": "Why should you avoid 'All-in-One' platforms (like high-end enterprise suites) at the start?",
      "options": [
        { "id": "a", "text": "They are too cheap." },
        { "id": "b", "text": "They are usually mediocre at everything and create 'Vendor Lock-in'." },
        { "id": "c", "text": "They don't have good colors." },
        { "id": "d", "text": "They are illegal." }
      ],
      "correctAnswer": "b",
      "explanation": "Best-in-Breed stacks (connecting the best email tool to the best CRM) give you more flexibility and power for less money."
    },
    {
      "id": "ts3",
      "type": "true-false",
      "text": "True or False: You need to pay at least $500/month to have professional marketing automation.",
      "correctAnswer": "false",
      "explanation": "False. With tools like HubSpot Free, MailerLite, and Zapier, you can build a world-class system for &lt;$50/mo."
    },
    {
      "id": "ts4",
      "type": "multiple-choice",
      "text": "What is the primary benefit of using a tool like Calendly/SavvyCal?",
      "options": [
        { "id": "a", "text": "It looks cool." },
        { "id": "b", "text": "It eliminates the 'When are you free?' email ping-pong, reducing friction to book a meeting." },
        { "id": "c", "text": "It sends video." },
        { "id": "d", "text": "It tracks revenue." }
      ],
      "correctAnswer": "b",
      "explanation": "Friction kills deals. If it takes 4 emails to find a time, you will lose 20% of your meetings. Calendar links solve this."
    },
    {
      "id": "ts5",
      "type": "multiple-choice",
      "text": "Why do we prefer 'Native Integrations' over Zapier?",
      "options": [
        { "id": "a", "text": "They are usually free, faster, and less prone to breaking." },
        { "id": "b", "text": "They are more expensive." },
        { "id": "c", "text": "Zapier is evil." },
        { "id": "d", "text": "No reason." }
      ],
      "correctAnswer": "a",
      "explanation": "Zapier is great glue, but it costs money and can break if an API changes. Native (built-in) integration is always the first choice."
    }
  ]
}
```

**Next Lesson:** [Lead Scoring: Identifying the Hot 10%](/marketing-engine/course-12-marketing-automation-analytics/lesson-6)