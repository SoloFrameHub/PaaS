---
title: "Usage-Based Expansion Triggers (SaaS)"
duration: "50 min"
track: "Customer Success"
course: "Course 38: Expansion & Upsell"
lesson: 2
---

## The $18K Email That Never Got Sent

Marcus ran a project management SaaS at $12K MRR. One Tuesday, he noticed something in his analytics: a customer had created 47 projects in the last 30 days. Their plan limit? 50 projects.

He meant to reach out. He added it to his to-do list. He got busy with a product bug.

Three days later, the customer hit the wall. They couldn't create new projects. They opened a support ticket, frustrated. By the time Marcus responded with an upgrade path, they'd already started evaluating competitors.

They churned two weeks later.

The math: that customer was paying $149/month. The Pro plan they needed was $299/month. Over their projected 12-month lifetime, Marcus lost $1,800 in expansion revenue. He lost the entire $1,788 base revenue when they left. And he lost the referral they would have given (worth an estimated $14K based on his average customer acquisition pattern).

**Total cost of not having a usage trigger system: $18K.**

The ironic part? His product already tracked the data. He just wasn't watching it systematically.

<InsightCard icon="📊" title="The Core Insight">
Usage-based expansion triggers are **objective signals** that a customer is ready for (and would benefit from) an upgrade. You don't need to guess. You don't need to "feel it out." The product tells you exactly when to start the conversation.
</InsightCard>

## What Makes a Trigger "Usage-Based"?

Usage triggers are specific, measurable product behaviors that indicate expansion readiness. They're different from outcome triggers (which we'll cover in Lesson 3) because they're tied to **how the customer uses the product**, not what results they achieve.

<FlipCard 
  front="Usage Trigger Definition" 
  back="A measurable product usage pattern that indicates a customer would benefit from (and is likely to purchase) a higher-tier plan or additional capacity." 
/>

The key characteristics:

1. **Objective** — No interpretation required. "Used 42 of 50 seats" is objective. "Seems like they're growing" is not.
2. **Measurable** — You can track it in your database, analytics, or billing system
3. **Predictive** — Historically correlates with successful upgrades
4. **Timely** — Fires before frustration, not after the customer hits a wall

<RangeSlider 
  label="How systematically do you currently track usage patterns for expansion opportunities?" 
  min={1} 
  max={10} 
  lowLabel="Not at all" 
  highLabel="Fully automated" 
  persistKey="expansion-L2-tracking-current" 
/>

## The 5 SaaS Usage Triggers

Let's break down the five most reliable usage-based expansion triggers. These work across nearly every SaaS business model.

<SlideNavigation>
<Slide title="Trigger 1: Plan Limit Approach">

### The 80% Rule

When a customer hits **80% of any plan limit** — seats, storage, API calls, projects, contacts — it's the optimal time to initiate an expansion conversation.

**Why 80%, not 100%?**

- At 80%, they have breathing room. The conversation feels helpful, not desperate.
- At 100%, they're frustrated. You're reacting to a problem instead of preventing one.
- Conversion rates: 40-60% at 80% threshold vs. 15-25% after they hit the wall.

**Detection method:**
- **SaaS with usage-based billing:** Your billing system (Stripe, Chargebee) already tracks this
- **Seat-based SaaS:** Count active users vs. plan limit in your database
- **API/storage limits:** Track via your infrastructure monitoring

**Example threshold alerts:**
- Seats: 4 of 5 seats occupied
- Storage: 8GB of 10GB used
- API calls: 80,000 of 100,000 monthly calls consumed
- Projects: 40 of 50 projects created

<ExampleCard label="Real Example: The Design Agency">
A design collaboration tool noticed a customer at 4 of 5 seats. They sent this email:

*"Hi Sarah — I noticed your team is using 4 of your 5 seats on the Pro plan. As you bring on your next designer, you'll want to make sure they have access too. Our Team plan gives you 15 seats at $X/month (works out to $Y per seat vs. $Z on Pro). Want me to set that up for you?"*

**Result:** Customer upgraded within 24 hours. No friction, no hard sell. Just helpful timing.
</ExampleCard>

</Slide>

<Slide title="Trigger 2: Power Feature Discovery">

### When They Try What They Can't Have

This trigger fires when a customer repeatedly attempts to use a feature that's gated behind a higher plan tier.

**Common scenarios:**
- Trying to export data in a format only available on Pro
- Attempting to create an automation that requires the Business plan
- Clicking on "Advanced Analytics" 3+ times
- Trying to add an integration beyond their plan limit

**Detection method:**
- Track feature gate interactions in your product analytics (Mixpanel, Amplitude, PostHog)
- Set threshold: 3+ attempts at a gated feature within 7 days

**The psychology:** They've already decided they want it. They're just discovering they need to pay for it. Your job is to make that path clear and frictionless.

<InsightCard icon="💡" title="The Discovery Moment">
Power feature discovery is the highest-intent expansion signal. They're not browsing — they're trying to accomplish something specific and hitting a wall. Strike while the intent is hot.
</InsightCard>

**Outreach template:**

*"Hi [Name] — I noticed you've been exploring [Feature]. That's one of our most popular Pro features. It's designed for [use case]. Would it be helpful if I showed you how it works and what upgrading would look like? Here's a quick overview: [link]"*

</Slide>

<Slide title="Trigger 3: Multi-Team Usage">

### When One Department Becomes Three

This trigger fires when you detect usage patterns from multiple departments or distinct teams within the same organization.

**Detection signals:**
- 3+ different job titles/roles in user profiles
- Login activity from different office locations
- Distinct project naming patterns (e.g., "Marketing_Q1" and "Sales_Deck_v2")
- Email domains showing different departments (@marketing.company.com, @sales.company.com)

**Why this matters:** Multi-team usage means:
1. The product has proven value across use cases
2. Internal word-of-mouth is working
3. They need team/enterprise features (permissions, shared workspaces, admin controls)

**The upgrade path:**
- From individual plans → Team plan with shared workspaces
- From Team plan → Enterprise with department-level permissions

<ExampleCard label="Case Study: The Spreadsheet Escape">
A data visualization tool noticed a customer had users with titles: "Marketing Analyst," "Sales Ops Manager," and "Finance Director."

They sent: *"I noticed your team spans Marketing, Sales, and Finance — that's exactly what our Enterprise plan is built for. You'd get department-level workspaces, unified billing, and cross-team dashboards. Want to see a demo?"*

**Result:** $299/month → $1,200/month upgrade. The customer didn't even know cross-team features existed until the email.
</ExampleCard>

</Slide>

<Slide title="Trigger 4: Integration Expansion">

### Building a Stack Around You

When a customer connects 3+ integrations to your product, they're signaling two things:

1. Your product is central to their workflow
2. They're invested enough to build infrastructure around it

**Detection method:**
- Track integration connections in your database
- Threshold: 3+ active integrations (or approaching your plan's integration limit)

**Why this triggers expansion:**
- High integration count = high switching cost (they're locked in)
- They're likely power users who need advanced features
- If they're near the integration limit, they'll need a higher tier soon

**Outreach approach:**

*"Hi [Name] — I see you've connected [Integration A], [Integration B], and [Integration C]. You're building a powerful stack around [Product]. Our Pro plan gives you unlimited integrations plus [other relevant features]. Most customers at your integration level find the upgrade pays for itself in time saved. Want to explore that?"*

</Slide>

<Slide title="Trigger 5: Consistent Usage Spikes">

### The Power User Pattern

This trigger fires when a customer consistently operates at 90%+ of their usage limits, even if they haven't hit the wall yet.

**Detection signals:**
- 3+ months of 90%+ usage of any metric (seats, storage, API calls)
- Frequent "near-limit" warnings in their dashboard
- Month-over-month growth in usage (trending toward limits)

**Why this matters:**
- They're not just approaching limits — they're growing
- Proactive upgrades prevent future frustration
- Shows you're paying attention to their success

**The conversation:**

*"Hi [Name] — I've been watching your usage over the last few months, and you're consistently running at 90%+ of your [metric] limit. That tells me two things: (1) you're getting serious value from [Product], and (2) you're about to need more capacity. Let's get ahead of that. Here's what the next tier looks like: [details]. Want me to set it up so you never hit a wall?"*

<InsightCard icon="🎯" title="The Proactive Advantage">
Customers who upgrade proactively (before hitting limits) have 35% higher retention than those who upgrade reactively (after frustration). Timing matters.
</InsightCard>

</Slide>
</SlideNavigation>

## Building Your Trigger Detection System

You don't need Gainsight or a $50K/year CS platform. Here's how to build a usage trigger system as a solo founder with &lt;$200/month budget.

<TemplateBuilder
  title="Your Usage Trigger System"
  persistKey="expansion-L2-trigger-system"
  sections={[
    {
      id: "trigger1",
      title: "Trigger 1: Plan Limit Approach",
      fields: [
        { id: "metric", label: "What metric has a plan limit?", placeholder: "e.g., seats, storage, API calls", type: "text" },
        { id: "threshold", label: "80% threshold value", placeholder: "e.g., 4 of 5 seats", type: "text" },
        { id: "detection", label: "How will you detect this?", placeholder: "e.g., Stripe webhook, database query, analytics event", type: "textarea" },
        { id: "action", label: "What happens when triggered?", placeholder: "e.g., Zapier → Slack alert → email to customer", type: "textarea" }
      ]
    },
    {
      id: "trigger2",
      title: "Trigger 2: Power Feature Discovery",
      fields: [
        { id: "feature", label: "What gated feature do customers want?", placeholder: "e.g., Advanced Analytics, Custom Exports", type: "text" },
        { id: "detection", label: "How will you track attempts?", placeholder: "e.g., Mixpanel event: 'clicked_gated_feature'", type: "textarea" },
        { id: "threshold", label: "How many attempts = trigger?", placeholder: "e.g., 3 attempts in 7 days", type: "text" }
      ]
    },
    {
      id: "trigger3",
      title: "Trigger 3: Multi-Team Usage",
      fields: [
        { id: "signal", label: "What signals multi-team usage in your product?", placeholder: "e.g., different job titles, multiple departments in user profiles", type: "textarea" },
        { id: "threshold", label: "Threshold for trigger", placeholder: "e.g., 3+ distinct roles/departments", type: "text" }
      ]
    }
  ]}
/>

## The Outreach Cadence

Trigger fires. Now what? Here's the proven cadence for converting usage triggers into expansion revenue.

<SlideNavigation>
<Slide title="Day 0: Trigger Fires">

**Internal action:**
- Automated alert to you (Slack, email, dashboard notification)
- Customer record tagged with trigger type and timestamp
- Outreach email drafted (can be automated with templates)

**Do NOT email immediately.** Wait 24-48 hours. Instant outreach feels surveillance-creepy.

</Slide>

<Slide title="Day 1-2: Initial Outreach">

Send the contextual email. Structure:

1. **Observation** (not accusation): "I noticed you're using X of Y [metric]"
2. **Interpretation**: "That tells me [positive thing about their usage]"
3. **Value proposition**: "Here's how [upgrade] helps with that"
4. **Soft CTA**: "Want to explore what that looks like?"

**Example:**

*Subject: Your [Product] usage*

*Hi [Name],*

*I noticed you're using 42 of your 50 projects on the Pro plan. That's awesome — it means you're getting real value from [Product].*

*Most customers at this usage level find they need the Team plan within a month or two. It gives you 200 projects, shared workspaces, and team permissions at $299/month (vs. $149 for Pro).*

*Want me to walk you through what upgrading would look like? I can also answer any questions about how the migration works.*

*[Your Name]*

</Slide>

<Slide title="Day 7: Follow-Up (If No Response)">

**If they haven't replied:**

Send a follow-up with a case study or social proof.

*Hi [Name],*

*Following up on my note about upgrading to the Team plan. I wanted to share a quick example:*

*[Customer Name] was in the same spot — hitting project limits on Pro. They upgraded to Team and within 2 months had onboarded their entire design team (8 people). The shared workspaces alone saved them ~5 hours/week in handoffs.*

*Here's a 2-minute overview of what you'd get: [link]*

*Worth a conversation?*

</Slide>

<Slide title="Day 14: Personal Note">

**If still no response:**

Brief, personal, low-pressure check-in.

*Hi [Name],*

*Just checking in — want to make sure you have everything you need as you scale up your usage of [Product]. If the Team plan isn't the right fit right now, no worries. But if you have questions about it, I'm here.*

*[Your Name]*

</Slide>

<Slide title="Day 30: Stop Outreach">

**If still no response after 3 touches:**

- Stop outreach for this trigger instance
- Re-trigger if they hit a new threshold (e.g., 90% instead of 80%)
- Tag account as "expansion-aware but not ready"

**Do NOT:**
- Keep emailing weekly (that's spam)
- Get pushy or create urgency where none exists
- Assume they're not interested forever (circumstances change)

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Outreach Cadence Checklist" 
  persistKey="expansion-L2-cadence-checklist" 
  items={[
    "Set up trigger detection for at least one usage metric",
    "Create email templates for Day 1, Day 7, and Day 14",
    "Configure Zapier/Make automation: trigger → Slack alert → draft email",
    "Test the system with a fake trigger to verify the flow works",
    "Document your cadence rules (when to stop, when to re-trigger)"
  ]} 
/>

## Automation for Solo Founders

You can't manually check usage metrics daily. Here's how to automate trigger detection with &lt;$50/month tools.

### Option 1: Stripe + Zapier (for usage-based billing)

**If your plan limits are tied to Stripe subscriptions:**

1. **Stripe webhook** → fires when usage approaches threshold
2. **Zapier** catches webhook → sends Slack alert + creates draft email in Gmail
3. **You** review draft, personalize, send

**Cost:** Zapier Starter ($19.99/mo) + Stripe (free webhooks)

### Option 2: Database Query + Make.com (for custom metrics)

**If you track usage in your own database:**

1. **Daily cron job** queries database for accounts at 80%+ of limits
2. **Make.com** receives query results → sends Slack alert + populates email template
3. **You** review and send

**Cost:** Make.com free tier (1,000 operations/mo) or $9/mo for more

### Option 3: Product Analytics + Webhooks (for feature discovery)

**For tracking gated feature attempts:**

1. **Mixpanel/PostHog** tracks "clicked_gated_feature" events
2. **Webhook** fires when user hits 3+ events in 7 days
3. **Zapier/Make** catches webhook → alert + email draft

**Cost:** PostHog free tier (1M events/mo) + Zapier/Make

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can build this entire system with a 50-line Python script + cron job. Query your database, check thresholds, send alerts via Slack API, draft emails via Gmail API. No Zapier needed. Total cost: $0.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches">
Your "usage triggers" are different — they're outcome-based (covered in Lesson 3). But the automation pattern is the same: detect signal → alert yourself → personalized outreach. You might track "completed module 8 of 10" instead of "used 40 of 50 seats."
</ContextualNote>

## Practice: Classify These Signals

Let's test your trigger recognition. For each scenario, identify which of the 5 usage triggers applies (if any).

<ClassifyExercise
  title="Identify the Usage Trigger"
  persistKey="expansion-L2-classify"
  categories={[
    { id: "limit", label: "Plan Limit Approach", color: "#ef4444" },
    { id: "feature", label: "Power Feature Discovery", color: "#f59e0b" },
    { id: "team", label: "Multi-Team Usage", color: "#3b82f6" },
    { id: "integration", label: "Integration Expansion", color: "#8b5cf6" },
    { id: "spike", label: "Consistent Usage Spikes", color: "#10b981" },
    { id: "none", label: "Not a Usage Trigger", color: "#6b7280" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Customer has used 47 of 50 projects in their plan", 
      correctCategory: "limit",
      explanation: "Classic plan limit approach trigger — 94% of limit reached."
    },
    { 
      id: "2", 
      content: "Customer clicked 'Export to Excel' 5 times (feature requires Pro plan)", 
      correctCategory: "feature",
      explanation: "Power feature discovery — repeated attempts at a gated feature."
    },
    { 
      id: "3", 
      content: "Customer mentioned in a support ticket that their team loves the product", 
      correctCategory: "none",
      explanation: "Positive signal, but not a usage trigger. This is qualitative feedback, not measurable behavior."
    },
    { 
      id: "4", 
      content: "Customer has connected Slack, Google Drive, Salesforce, and Zapier integrations", 
      correctCategory: "integration",
      explanation: "Integration expansion — 4 integrations suggests they're building a stack around your product."
    },
    { 
      id: "5", 
      content: "Customer has users with titles: 'Marketing Manager,' 'Sales Director,' 'Product Lead'", 
      correctCategory: "team",
      explanation: "Multi-team usage — three distinct departments using the product."
    },
    { 
      id: "6", 
      content: "Customer has been at 92-98% of API call limit for 4 consecutive months", 
      correctCategory: "spike",
      explanation: "Consistent usage spikes — sustained high usage trending toward limits."
    },
    { 
      id: "7", 
      content: "Customer left a 5-star review on G2", 
      correctCategory: "none",
      explanation: "Great for advocacy (Course 39), but not a usage trigger for expansion."
    },
    { 
      id: "8", 
      content: "Customer has 9 of 10 seats filled and just posted a job listing for a new team member", 
      correctCategory: "limit",
      explanation: "Plan limit approach + external signal (hiring) = high-intent expansion opportunity."
    }
  ]}
/>

## Rewrite Practice: Generic → Contextual

Now let's practice writing trigger-based outreach. Take this generic expansion email and rewrite it to be specific to a usage trigger.

<RewriteExercise
  title="Transform Generic Outreach into Trigger-Based Outreach"
  persistKey="expansion-L2-rewrite"
  original="Hi [Name], I wanted to reach out about upgrading your plan. Our Pro plan has a lot of great features that I think you'd find valuable. Let me know if you'd like to learn more!"
  hint="Pick one of the 5 triggers and make the email specific to that signal. Reference the actual usage data."
  expertRewrite="Hi Sarah — I noticed you're using 8 of your 10 seats on the Team plan, and your usage has grown 30% over the last 2 months. That's exactly the growth pattern we see before customers need the Business plan (50 seats + advanced permissions). Want to get ahead of hitting the limit? I can walk you through what upgrading looks like and make sure the transition is seamless."
  criteria={[
    "References specific usage data (numbers, not vague 'you're growing')",
    "Identifies which trigger is firing",
    "Explains the benefit in terms of avoiding future pain, not just 'more features'",
    "Includes a clear, low-pressure CTA"
  ]}
/>

## The Trigger → Revenue Simulator

Let's model what systematic usage trigger outreach could generate for your business.

<ScenarioSimulator
  title="Usage Trigger Revenue Impact"
  persistKey="expansion-L2-simulator"
  levers={[
    { id: "customers", label: "Total active customers", min: 10, max: 500, step: 10, defaultValue: 50 },
    { id: "triggerRate", label: "% hitting triggers monthly", min: 5, max: 30, step: 5, defaultValue: 15 },
    { id: "conversionRate", label: "Trigger → upgrade conversion %", min: 20, max: 60, step: 5, defaultValue: 40 },
    { id: "avgExpansion", label: "Average expansion MRR per upgrade", min: 50, max: 500, step: 50, defaultValue: 150 }
  ]}
  outputs={[
    { 
      id: "monthlyExpansion", 
      label: "Monthly expansion MRR", 
      formula: "(customers * (triggerRate / 100) * (conversionRate / 100) * avgExpansion)", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "annualExpansion", 
      label: "Annual expansion revenue", 
      formula: "(customers * (triggerRate / 100) * (conversionRate / 100) * avgExpansion * 12)", 
      unit: "$", 
      precision: 0 
    },
    { 
      id: "nrrImpact", 
      label: "NRR contribution (assuming $50K base MRR)", 
      formula: "((customers * (triggerRate / 100) * (conversionRate / 100) * avgExpansion) / 50000 * 100)", 
      unit: "%", 
      precision: 1 
    }
  ]}
  insight="At {monthlyExpansion} in monthly expansion MRR, you'd add {annualExpansion} in annual expansion revenue. That's a {nrrImpact} boost to NRR from usage triggers alone."
/>

## Common Mistakes (and How to Avoid Them)

<SlideNavigation>
<Slide title="Mistake 1: Waiting Until They Hit the Wall">

**The mistake:** Only reaching out after the customer has hit their limit and is frustrated.

**Why it fails:** You're reacting to a problem instead of preventing it. The conversation feels like damage control, not value delivery.

**The fix:** Set triggers at 80%, not 100%. Proactive > reactive.

**Conversion impact:** 40-60% at 80% vs. 15-25% at 100%.

</Slide>

<Slide title="Mistake 2: Generic 'Upgrade Now' Emails">

**The mistake:** Sending the same upgrade pitch to everyone, regardless of their specific usage pattern.

**Why it fails:** Customers ignore messages that don't feel relevant to their situation.

**The fix:** Every outreach email should reference the specific trigger: "I noticed you're using X of Y seats" or "I see you've tried to export to Excel 5 times."

**Conversion impact:** Contextual emails convert 3-5x better than generic ones.

</Slide>

<Slide title="Mistake 3: Over-Automating the Conversation">

**The mistake:** Fully automated upgrade emails with no human review or personalization.

**Why it fails:** Expansion conversations are high-value. A little personalization (30 seconds per email) dramatically increases conversion.

**The fix:** Automate the trigger detection and draft creation. Manually review and personalize before sending.

**Conversion impact:** Personalized emails convert 2-3x better than fully automated ones.

</Slide>

<Slide title="Mistake 4: No Follow-Up System">

**The mistake:** Sending one email and giving up if there's no response.

**Why it fails:** Customers are busy. First email open rates are 20-30%. You need 2-3 touches.

**The fix:** Use the Day 1 → Day 7 → Day 14 cadence. Then stop.

**Conversion impact:** 60-70% of conversions happen on touch 2 or 3, not touch 1.

</Slide>

<Slide title="Mistake 5: Ignoring Trigger Combinations">

**The mistake:** Treating each trigger independently instead of recognizing when multiple triggers fire simultaneously.

**Why it fails:** A customer at 80% of seat limit + 4 integrations connected + multi-team usage is a MUCH higher-intent opportunity than a single trigger.

**The fix:** Flag accounts with 2+ active triggers as "high-priority expansion opportunities."

**Conversion impact:** Multi-trigger accounts convert at 60-80% vs. 40% for single triggers.

</Slide>
</SlideNavigation>

## Your Expansion Trigger System (Build It Now)

Let's build your first usage trigger system. This is the artifact you'll use starting this week.

<TemplateBuilder
  title="Your First Usage Trigger"
  persistKey="expansion-L2-first-trigger"
  sections={[
    {
      id: "trigger",
      title: "Trigger Definition",
      fields: [
        { id: "name", label: "Trigger name", placeholder: "e.g., Seat Limit Approach", type: "text" },
        { id: "metric", label: "What metric triggers this?", placeholder: "e.g., active seats vs. plan limit", type: "text" },
        { id: "threshold", label: "Threshold value", placeholder: "e.g., 80% of plan limit (4 of 5 seats)", type: "text" },
        { id: "why", label: "Why does this signal expansion readiness?", placeholder: "e.g., Customer is growing their team and will need more capacity soon", type: "textarea" }
      ]
    },
    {
      id: "detection",
      title: "Detection Method",
      fields: [
        { id: "source", label: "Where does this data live?", placeholder: "e.g., Stripe subscription metadata, database user table, Mixpanel events", type: "text" },
        { id: "how", label: "How will you detect when threshold is crossed?", placeholder: "e.g., Daily cron job queries database, Stripe webhook fires, Mixpanel alert", type: "textarea" },
        { id: "alert", label: "How will you be notified?", placeholder: "e.g., Slack message, email alert, dashboard notification", type: "text" }
      ]
    },
    {
      id: "outreach",
      title: "Outreach Template",
      fields: [
        { id: "subject", label: "Email subject line", placeholder: "e.g., Your [Product] usage", type: "text" },
        { id: "body", label: "Email body (use [Name], [Metric], [Threshold] as variables)", placeholder: "Hi [Name],\n\nI noticed you're using [Metric] of your [Threshold]...", type: "textarea", rows: 8 },
        { id: "cta", label: "Call to action", placeholder: "e.g., Want to explore what upgrading looks like?", type: "text" }
      ]
    },
    {
      id: "cadence",
      title: "Follow-Up Cadence",
      fields: [
        { id: "day1", label: "Day 1-2 action", placeholder: "e.g., Send initial email", type: "text" },
        { id: "day7", label: "Day 7 action (if no response)", placeholder: "e.g., Send follow-up with case study", type: "text" },
        { id: "day14", label: "Day 14 action (if no response)", placeholder: "e.g., Send brief personal check-in", type: "text" },
        { id: "stop", label: "When to stop outreach", placeholder: "e.g., After Day 14 if no response; re-trigger if new threshold hit", type: "text" }
      ]
    }
  ]}
/>

## Action Items

<InteractiveChecklist 
  title="This Week's Expansion Trigger Tasks" 
  persistKey="expansion-L2-actions" 
  items={[
    "Identify your top 1-2 usage metrics that have plan limits (seats, storage, API calls, etc.)",
    "Set up detection for at least ONE trigger at the 80% threshold",
    "Write your first trigger-based outreach email using the template builder above",
    "Configure automation: trigger detection → Slack/email alert → draft email",
    "Review your current customer base: who's already at 80%+ of a limit? Send them the email this week.",
    "Document your follow-up cadence (Day 1, 7, 14) and set reminders",
    "Test the system: manually fire a fake trigger and verify the alert + email draft works"
  ]} 
/>

## What's Next

You now have a systematic approach to **usage-based expansion triggers** for SaaS products. In **Lesson 3**, we'll cover **outcome-based expansion triggers** for services and coaching businesses — where the signals come from client results, not product usage.

The pattern is the same: detect signal → personalized outreach → structured follow-up. But the triggers are completely different.

**Preview of Lesson 3:**
- The 5 outcome-based triggers (first success milestone, goal completion, business growth, new challenge, time milestone)
- The "What's Next?" conversation framework
- Retainer expansion for service businesses
- Program laddering for coaches

---

**Quick Self-Check:**

<RangeSlider 
  label="How confident are you in setting up your first usage trigger this week?" 
  min={1} 
  max={10} 
  lowLabel="Not confident" 
  highLabel="Very confident" 
  persistKey="expansion-L2-confidence" 
/>

If you're below a 7, revisit the "Automation for Solo Founders" section and pick the simplest option (Stripe + Zapier for most SaaS founders). Start with ONE trigger, not five. You can always add more later.