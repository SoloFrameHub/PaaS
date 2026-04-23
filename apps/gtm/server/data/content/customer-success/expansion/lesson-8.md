---
title: "Your Expansion Playbook"
duration: "45 min"
track: "Customer Success"
course: "Course 38: Expansion & Upsell"
lesson: 8
---

## The $127K Mistake

Meet Jordan, a solo founder running a project management SaaS at $18K MRR. Solid product. Happy customers. Growing 8% month-over-month from new acquisition.

Jordan spent 6 months obsessing over acquisition: cold email, LinkedIn, content. Hired a VA to manage outreach. Built a referral program. Ran ads.

Then Jordan's co-founder (who'd been quietly tracking metrics) dropped a spreadsheet on the table:

**"We left $127,000 on the table this year."**

How? Twelve customers had grown from 3 seats to 15+ seats organically — and never upgraded their plans. Eight customers had asked about "done-for-you setup" — and Jordan said "we don't offer that." Five customers hit their annual renewal and churned because Jordan never had a conversation about what's next.

Jordan had built a **leaky expansion bucket**. Revenue was flowing in the top (acquisition) and leaking out the bottom (missed expansion).

Today, you're plugging that leak. You're building your complete expansion system — the playbook that turns your existing customer base into a compounding growth engine.

<InsightCard icon="📊" title="The Expansion Reality">
A 106% NRR means your existing customers grow your business 6% per month even if you stop acquiring new customers entirely. That compounds to ~100% annual growth from your base alone. Acquisition becomes a bonus, not a requirement.
</InsightCard>

## Your Expansion System: The Complete Picture

You've learned the pieces across 7 lessons. Now we're assembling them into **one cohesive system** that runs alongside your weekly customer success routine.

Here's what you're building today:

1. **NRR Baseline & Tracking** — Know where you stand, measure monthly
2. **Expansion Trigger Library** — 5-8 specific signals that mean "ready to expand"
3. **Outreach Playbook** — Templates and scripts for each trigger
4. **Pricing Scenarios** — How to handle upgrades, rate increases, and new tiers
5. **Monthly Expansion Review** — 15-minute ritual to identify and act on opportunities
6. **7-Day Implementation Sprint** — Launch the system this week

<FlipCard 
  front="What is an 'Expansion System'?" 
  back="A documented, repeatable process for identifying expansion opportunities in your customer base and converting them to additional revenue. It runs on triggers (not guesswork) and integrates into your existing CS workflow." 
/>

## Step 1: Calculate Your NRR Baseline

Before you can improve expansion, you need to know where you are.

**Net Revenue Retention (NRR)** is the single most important expansion metric. It answers: "If I stopped acquiring new customers today, would my revenue grow or shrink?"

<TemplateBuilder
  title="Your NRR Baseline Calculator"
  persistKey="expansion-L8-nrr-baseline"
  sections={[
    {
      id: "current",
      title: "Current Month Data",
      fields: [
        { id: "startMRR", label: "Starting MRR (beginning of month)", placeholder: "e.g., 50000", type: "number" },
        { id: "expansionMRR", label: "Expansion MRR (upgrades, upsells, seat adds)", placeholder: "e.g., 8000", type: "number" },
        { id: "contractionMRR", label: "Contraction MRR (downgrades)", placeholder: "e.g., 2000", type: "number" },
        { id: "churnMRR", label: "Churned MRR (cancellations)", placeholder: "e.g., 3000", type: "number" }
      ]
    },
    {
      id: "calculation",
      title: "Your NRR",
      fields: [
        { id: "endMRR", label: "Ending MRR", placeholder: "Auto-calculated", type: "text", readonly: true },
        { id: "nrr", label: "Net Revenue Retention (%)", placeholder: "Auto-calculated", type: "text", readonly: true },
        { id: "interpretation", label: "What This Means", placeholder: "Auto-calculated", type: "textarea", readonly: true }
      ]
    }
  ]}
/>

**Formula:**
- Ending MRR = Starting MRR + Expansion - Contraction - Churn
- NRR = (Ending MRR / Starting MRR) × 100

**Targets:**
- **&lt;100% NRR** — Your base is shrinking. Expansion isn't covering churn. Priority: fix retention first (Course 37), then expansion.
- **100-110% NRR** — Healthy for SMB solo founders. Expansion is covering churn with modest growth.
- **110-120% NRR** — Excellent. Your base is a growth engine.
- **>120% NRR** — Best-in-class. Typically requires enterprise customers or very high expansion rates.

<RangeSlider 
  label="What's your NRR target for 6 months from now?" 
  min={90} 
  max={130} 
  step={5}
  lowLabel="90%" 
  highLabel="130%" 
  persistKey="expansion-L8-nrr-target" 
/>

## Step 2: Build Your Expansion Trigger Library

Expansion doesn't happen by accident. It happens when you **detect specific signals** and act on them.

Your trigger library is 5-8 concrete scenarios that mean "this customer is ready for an expansion conversation."

<SlideNavigation>
<Slide title="SaaS Triggers">

If you run a SaaS product, use **usage-based triggers**:

1. **Plan Limit Approach** — Customer hits 80%+ of seats, storage, API calls, or any plan limit
2. **Power Feature Discovery** — Customer tries a gated feature 3+ times (they want it but don't have access)
3. **Multi-Team Usage** — 3+ departments or distinct user roles are active
4. **Integration Expansion** — Customer connects 3+ integrations (building a stack around your product)
5. **Usage Spikes** — Consistently hitting 90%+ of usage limits or peak windows

**Detection:** Billing system alerts, product analytics, database queries, Zapier automations

</Slide>

<Slide title="Services/Coaching Triggers">

If you run services or coaching, use **outcome-based triggers**:

1. **First Success Milestone** — Client achieves a quantifiable win (first 10 customers, first $10K month, etc.)
2. **Goal Completion** — Original scope delivered; natural "what's next?" moment
3. **Business Growth Signal** — Client's revenue increases, they hire, they launch a new product
4. **New Challenge Emergence** — Client mentions a new problem in conversation
5. **Time Milestone** — 90 days, 6 months, annual review

**Detection:** Client check-ins, Slack mentions, invoice milestones, calendar reminders

</Slide>

<Slide title="Hybrid Triggers">

If you run a hybrid model (SaaS + services, coaching + community), combine both:

1. Usage triggers for the product side
2. Outcome triggers for the service/coaching side
3. **Cross-sell trigger** — Customer succeeds with one offering, ready for the other

Example: A customer completes your group coaching program (outcome trigger) AND starts using your SaaS tool heavily (usage trigger) → pitch 1:1 coaching + premium SaaS plan as a bundle.

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Define Your Expansion Triggers" 
  persistKey="expansion-L8-triggers" 
  items={[
    "List 5-8 specific expansion triggers for your business model",
    "Define the detection method for each trigger (analytics, billing, manual check)",
    "Set the threshold for each trigger (80% of limit, 3+ feature attempts, etc.)",
    "Document where you'll track active triggers (spreadsheet, CRM, Notion)"
  ]} 
/>

## Step 3: Write Your Outreach Playbook

For each trigger, you need a **conversation script or email template** that feels natural, not salesy.

The pattern:
1. **Acknowledge the signal** — "I noticed you're using X feature a lot" or "Congrats on hitting Y milestone"
2. **Connect to their goal** — "That usually means [pain/opportunity]"
3. **Introduce the expansion** — "Here's how [upgrade/service] helps with that"
4. **Low-pressure CTA** — "Want me to walk you through it?" or "Should I send over details?"

<ComparisonBuilder
  title="Expansion Outreach: Your Version vs. Expert Example"
  persistKey="expansion-L8-outreach-compare"
  prompt="Write an expansion email for ONE of your triggers"
  expertExample="Subject: You're hitting the 5-seat limit — here's what's next

Hi [Name],

I noticed your team just added the 5th user to [Product] — congrats on the growth!

Most teams at this stage start needing shared workspaces and admin controls to keep everyone coordinated. Our Team plan (up to 15 seats) includes those features plus priority support.

The upgrade is $X/month (vs. your current $Y), and I can migrate you over in about 10 minutes.

Want me to send over a quick comparison of what you'd get?

Best,
[Your Name]"
  criteria={[
    "Acknowledges the specific trigger signal",
    "Connects upgrade to a real pain/opportunity",
    "Includes concrete pricing and next step",
    "Feels helpful, not pushy"
  ]}
/>

**Template Structure for Each Trigger:**

| Trigger | Email Subject | Opening Line | Expansion Pitch | CTA |
|---------|--------------|--------------|----------------|-----|
| Plan limit (80%) | "You're approaching the [X] limit" | "I noticed you're using Y of Z [seats/storage/calls]" | "Here's how [next tier] unlocks more capacity + [bonus features]" | "Want me to walk you through the upgrade?" |
| Power feature discovery | "Unlock [Feature] with Pro" | "I saw you've been exploring [Feature]" | "That feature is included in our Pro plan, which also gives you [A, B, C]" | "Should I send over a trial link?" |
| Outcome milestone | "Congrats on [Milestone]!" | "Amazing work hitting [result]" | "Now that you've achieved that, most clients find they need [next service]" | "Want to talk about what's next?" |

<ExampleCard label="Real Example: The Seat Expansion Email That Converted at 67%">
A solo founder running a team collaboration SaaS sent this email to 15 customers who'd hit 80% of their seat limit:

**Subject:** Your team is growing — let's make sure [Product] keeps up

**Body:**
Hi [Name],

I noticed your team just added user #8 (out of your 10-seat plan) — congrats on the growth!

Quick heads-up: when teams hit 8-9 seats, things can get chaotic fast. Our 20-seat plan includes:
- Shared workspaces (so teams don't step on each other)
- Admin controls (manage permissions in one place)
- Priority support (because you're running a bigger operation now)

The upgrade is $299/month (vs. your current $199), and I can flip the switch in about 5 minutes.

Want me to send over a quick comparison?

Best,
Jordan

**Result:** 10 of 15 customers upgraded within 7 days. 67% conversion rate. $1,500 expansion MRR from one email.
</ExampleCard>

## Step 4: Pricing Scenarios & Communication Templates

You need **pre-built answers** to common expansion pricing questions:

1. **Seat/volume expansion** — How much per additional seat/unit?
2. **Tier upgrades** — What's the price difference and what do they get?
3. **Rate increases** — How do you communicate annual rate adjustments?
4. **Grandfathering** — Do existing customers keep old pricing when you raise prices?
5. **Done-for-you premium** — What's the multiplier for DFY vs. self-serve?

<TemplateBuilder
  title="Your Pricing Scenarios"
  persistKey="expansion-L8-pricing-scenarios"
  sections={[
    {
      id: "seat-expansion",
      title: "Seat/Volume Expansion",
      fields: [
        { id: "basePrice", label: "Current per-seat/unit price", placeholder: "e.g., $50/seat", type: "text" },
        { id: "volumeDiscount", label: "Bulk discount (if any)", placeholder: "e.g., 10% off for 5+ seats", type: "text" },
        { id: "expansionEmail", label: "Seat expansion email template", placeholder: "Subject + body", type: "textarea" }
      ]
    },
    {
      id: "tier-upgrade",
      title: "Tier Upgrade",
      fields: [
        { id: "currentTier", label: "Current tier name & price", placeholder: "e.g., Basic - $99/mo", type: "text" },
        { id: "nextTier", label: "Next tier name & price", placeholder: "e.g., Pro - $199/mo", type: "text" },
        { id: "tierDiff", label: "What they get in the upgrade", placeholder: "List 3-5 key features/benefits", type: "textarea" }
      ]
    },
    {
      id: "rate-increase",
      title: "Rate Increase Communication",
      fields: [
        { id: "increasePercent", label: "Planned increase (%)", placeholder: "e.g., 10%", type: "text" },
        { id: "noticeWindow", label: "Advance notice period", placeholder: "e.g., 60 days", type: "text" },
        { id: "increaseReason", label: "Reason for increase", placeholder: "e.g., new features, market rates, cost increases", type: "textarea" },
        { id: "increaseEmail", label: "Rate increase email template", placeholder: "Subject + body", type: "textarea" }
      ]
    }
  ]}
/>

<InsightCard icon="💡" title="The Grandfather Decision">
When you raise prices, you have 3 options for existing customers:

1. **Full grandfather** — They keep old pricing forever (generous but limits revenue)
2. **Temporary grandfather** — They keep old pricing for 6-12 months, then transition (balanced)
3. **Immediate transition** — Everyone moves to new pricing (aggressive, high churn risk)

**Recommendation for solo founders:** Temporary grandfather for 6 months. Communicate it as: "As a thank-you for being an early customer, you'll keep your current rate through [date]. After that, your rate will adjust to [new price], which is still below our standard rate for new customers."
</InsightCard>

## Step 5: The Monthly Expansion Review Ritual

Expansion doesn't happen in a big quarterly push. It happens in **small, consistent actions** every month.

Add this 15-minute ritual to your weekly customer success review:

**The Monthly Expansion Review (15 minutes):**

1. **Pull Green health score accounts** (from Course 36) — These are your expansion candidates
2. **Check for active triggers** — Which accounts have hit usage thresholds, outcome milestones, or time-based reviews?
3. **Prioritize top 3-5 opportunities** — Highest revenue potential or easiest conversation
4. **Execute outreach** — Send emails or schedule calls for those 3-5 accounts
5. **Log in expansion pipeline** — Track trigger → outreach → outcome

<InteractiveChecklist 
  title="Monthly Expansion Review Checklist" 
  persistKey="expansion-L8-monthly-review" 
  items={[
    "Filter for Green health score accounts (healthy, engaged, not at risk)",
    "Check each account against expansion trigger library",
    "Identify 3-5 accounts with active triggers",
    "Send expansion outreach emails or schedule calls",
    "Log opportunities in expansion pipeline tracker",
    "Update NRR calculation with new expansion MRR"
  ]} 
/>

**Where to track:**
- **Minimal:** Google Sheet with columns: Account | Trigger | Outreach Date | Response | Outcome | Expansion MRR
- **Better:** Notion database with same fields + linked to customer health scores
- **Best:** CRM with expansion pipeline stage (if you're already using one)

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Build a simple script that pulls usage data from your database and flags accounts hitting trigger thresholds. Export to CSV weekly. This takes the manual work out of trigger detection.
</ContextualNote>

## Step 6: The 4-Metric Expansion Dashboard

Track these 4 metrics monthly:

<ScenarioSimulator
  title="Expansion Metrics Simulator"
  persistKey="expansion-L8-metrics-simulator"
  levers={[
    { id: "startMRR", label: "Starting MRR", min: 5000, max: 100000, step: 5000, defaultValue: 20000 },
    { id: "expansionMRR", label: "Expansion MRR", min: 0, max: 10000, step: 500, defaultValue: 2000 },
    { id: "contractionMRR", label: "Contraction MRR", min: 0, max: 5000, step: 250, defaultValue: 500 },
    { id: "churnMRR", label: "Churned MRR", min: 0, max: 5000, step: 250, defaultValue: 1000 }
  ]}
  outputs={[
    { id: "nrr", label: "Net Revenue Retention", formula: "((startMRR + expansionMRR - contractionMRR - churnMRR) / startMRR * 100)", unit: "%", precision: 1 },
    { id: "expansionPct", label: "Expansion as % of Growth", formula: "(expansionMRR / (expansionMRR + (startMRR * 0.08)) * 100)", unit: "%", precision: 1 },
    { id: "netGrowth", label: "Net MRR Growth", formula: "(expansionMRR - contractionMRR - churnMRR)", unit: "$", precision: 0 }
  ]}
  insight="At `{nrr}`% NRR, your existing customer base is {'growing' if nrr > 100 else 'shrinking'}. Expansion contributes {expansionPct}% of total growth. Target: NRR ≥100%, expansion ≥20% of growth."
/>

**The 4 Metrics:**

1. **Net Revenue Retention (NRR)** — Target: ≥100% for SMB solo founders
2. **Expansion MRR as % of Total Growth** — Target: 20-30% (expansion should be a meaningful growth driver, not an afterthought)
3. **Expansion Conversion Rate** — (Expansion conversations → closed upsells) — Target: 30-50%
4. **Average Expansion Revenue Per Account Per Year** — Target: 10-20% of initial contract value

**Example:**
- Starting MRR: $20K
- Expansion MRR: $2K
- Contraction: $500
- Churn: $1K
- **NRR:** ($20K + $2K - $500 - $1K) / $20K = 102.5% ✅
- **Expansion as % of growth:** $2K expansion / ($2K expansion + $1.6K new MRR from acquisition) = 55% ✅
- **Expansion conversion rate:** 5 conversations → 3 closed = 60% ✅
- **Avg expansion per account:** $2K expansion / 10 accounts = $200/account/month = $2,400/year = 12% of $20K annual contract ✅

## Step 7: The 7-Day Implementation Sprint

You've built the playbook. Now you're launching it.

<ProgressiveReveal title="Your 7-Day Expansion System Launch" persistKey="expansion-L8-sprint-reveal">

<RevealSection title="Day 1: Calculate NRR Baseline">

**Task:** Calculate your current NRR using last month's data.

**Deliverable:** NRR percentage + interpretation (above/below 100%, what it means)

**Time:** 30 minutes

**How:**
1. Pull MRR data from billing system (Stripe, Baremetrics, ProfitWell)
2. Identify expansion MRR (upgrades, upsells, seat adds)
3. Identify contraction MRR (downgrades)
4. Identify churned MRR (cancellations)
5. Calculate: (Starting MRR + Expansion - Contraction - Churn) / Starting MRR × 100
6. Document in your expansion tracker

</RevealSection>

<RevealSection title="Day 2: Define 5-8 Expansion Triggers">

**Task:** Write down your specific expansion triggers with detection methods and thresholds.

**Deliverable:** Expansion trigger library (5-8 triggers documented)

**Time:** 45 minutes

**How:**
1. Review Lessons 2-3 trigger frameworks
2. Pick 3-5 usage triggers (if SaaS) or outcome triggers (if services/coaching)
3. For each trigger, define:
   - Signal description
   - Detection method (analytics, billing, manual check)
   - Threshold (80% of limit, 3+ feature attempts, etc.)
   - Ideal timing for outreach
4. Document in Notion, Google Doc, or spreadsheet

</RevealSection>

<RevealSection title="Day 3: Write Outreach Templates">

**Task:** Create email/script templates for each trigger.

**Deliverable:** 5-8 expansion outreach templates

**Time:** 60 minutes

**How:**
1. For each trigger, write:
   - Email subject line
   - Opening line (acknowledges the signal)
   - Expansion pitch (connects to their goal)
   - CTA (low-pressure next step)
2. Use the comparison builder from Step 3 to refine
3. Save templates in your email tool or Notion

</RevealSection>

<RevealSection title="Day 4: Set Up Trigger Automations">

**Task:** Automate trigger detection where possible.

**Deliverable:** Zapier/Make automations OR manual check calendar reminders

**Time:** 60 minutes

**How:**
1. **For SaaS:** Set up Zapier automation: Stripe/billing event (seat added, usage threshold hit) → Slack alert to you + email to customer
2. **For services/coaching:** Set calendar reminders for time-based triggers (90-day check-in, 6-month review)
3. **For manual triggers:** Add weekly task to check analytics/database for usage patterns

**Mid-Sprint Check-In:** You're halfway through. You have triggers defined, templates written, and detection set up. Tomorrow you'll start executing.

</RevealSection>

<RevealSection title="Day 5: Pricing Scenarios & Communication">

**Task:** Document your pricing scenarios and communication templates.

**Deliverable:** Pricing scenarios document (seat expansion, tier upgrade, rate increase)

**Time:** 45 minutes

**How:**
1. Fill out the pricing scenarios template from Step 4
2. Write rate increase communication template (even if you're not raising prices yet — you will eventually)
3. Decide on grandfather policy for future price changes
4. Save in your expansion playbook

</RevealSection>

<RevealSection title="Day 6: Review Green Accounts for Opportunities">

**Task:** Pull all Green health score accounts and check for active triggers.

**Deliverable:** Expansion pipeline with 3-5 immediate opportunities

**Time:** 45 minutes

**How:**
1. Filter customer list for Green health scores (from Course 36)
2. Check each account against your trigger library
3. Identify 3-5 accounts with active triggers
4. Prioritize by revenue potential or ease of conversation
5. Log in expansion pipeline tracker

</RevealSection>

<RevealSection title="Day 7: Execute First 3 Expansion Conversations">

**Task:** Send expansion emails or schedule calls for your top 3 opportunities.

**Deliverable:** 3 expansion conversations initiated + outcomes logged

**Time:** 60 minutes

**How:**
1. Send expansion emails using your templates (personalize for each account)
2. OR schedule 15-minute expansion calls
3. Log outreach date, customer response, and outcome in tracker
4. Celebrate: Your expansion system is live! 🎉

**Sprint Completion Review:** Calculate how much expansion MRR you've generated (even if it's $0 — you've built the system that will generate it monthly from now on).

</RevealSection>

</ProgressiveReveal>

<InteractiveChecklist 
  title="7-Day Sprint Completion Checklist" 
  persistKey="expansion-L8-sprint-complete" 
  items={[
    "Day 1: NRR baseline calculated and documented",
    "Day 2: 5-8 expansion triggers defined with detection methods",
    "Day 3: Outreach templates written for each trigger",
    "Day 4: Trigger automations set up (or manual check reminders)",
    "Day 5: Pricing scenarios and communication templates documented",
    "Day 6: Green accounts reviewed, 3-5 expansion opportunities identified",
    "Day 7: First 3 expansion conversations executed and logged",
    "Bonus: Expansion system integrated into monthly CS review ritual"
  ]} 
/>

## Connecting Expansion to Advocacy (Course 39 Preview)

Here's the beautiful part: **successfully expanded customers are your best advocacy candidates**.

Why? They've voted with their wallet twice:
1. They bought initially (trust established)
2. They expanded (trust deepened, value proven)

A customer who upgraded from Basic to Pro, or added 10 seats, or hired you for done-for-you services is **3-5x more likely** to:
- Give you a testimonial
- Refer a peer
- Write a case study
- Become a vocal advocate

In Course 39 (Customer Advocacy & Referrals), you'll learn how to turn these expanded customers into a referral engine. But the foundation is built here: **deliver value → expand → deepen relationship → advocacy**.

<FlipCard 
  front="Why do expanded customers make the best advocates?" 
  back="They've experienced compounding value. They didn't just buy once — they bought again. That second purchase is proof (to them and to prospects) that your product/service delivers ongoing, increasing value." 
/>

## Your Expansion Playbook: The One-Page Summary

Here's everything on one page:

**Expansion System Components:**

1. **NRR Baseline:** [Your current NRR %] — Target: ≥100%
2. **Expansion Triggers:** [5-8 specific signals with detection methods]
3. **Outreach Templates:** [Email/script for each trigger]
4. **Pricing Scenarios:** [Seat expansion, tier upgrade, rate increase, DFY premium]
5. **Monthly Review:** [15-minute ritual to identify and act on opportunities]
6. **4-Metric Dashboard:** [NRR, expansion %, conversion rate, avg expansion per account]

**Monthly Workflow:**

- **Week 1:** Pull Green accounts, check for active triggers
- **Week 2:** Execute 3-5 expansion conversations
- **Week 3:** Follow up on conversations, log outcomes
- **Week 4:** Calculate monthly NRR, update dashboard

**Expansion Revenue Targets:**

- **Month 1:** $[X] expansion MRR (set realistic based on current base)
- **Month 3:** $[Y] expansion MRR
- **Month 6:** $[Z] expansion MRR
- **Year 1:** [Target NRR %]

<TemplateBuilder
  title="Your One-Page Expansion Playbook"
  persistKey="expansion-L8-one-pager"
  sections={[
    {
      id: "baseline",
      title: "Current State",
      fields: [
        { id: "currentNRR", label: "Current NRR (%)", placeholder: "e.g., 98%", type: "text" },
        { id: "currentExpansionMRR", label: "Current monthly expansion MRR", placeholder: "e.g., $1,500", type: "text" },
        { id: "targetNRR", label: "6-month NRR target", placeholder: "e.g., 105%", type: "text" }
      ]
    },
    {
      id: "triggers",
      title: "My Expansion Triggers",
      fields: [
        { id: "trigger1", label: "Trigger 1", placeholder: "e.g., Customer hits 80% of seat limit", type: "text" },
        { id: "trigger2", label: "Trigger 2", placeholder: "e.g., Customer achieves first success milestone", type: "text" },
        { id: "trigger3", label: "Trigger 3", placeholder: "e.g., 90-day check-in reveals new challenge", type: "text" },
        { id: "trigger4", label: "Trigger 4 (optional)", placeholder: "", type: "text" },
        { id: "trigger5", label: "Trigger 5 (optional)", placeholder: "", type: "text" }
      ]
    },
    {
      id: "workflow",
      title: "Monthly Workflow",
      fields: [
        { id: "reviewDay", label: "Monthly review day", placeholder: "e.g., First Monday of each month", type: "text" },
        { id: "outreachTarget", label: "Monthly outreach target", placeholder: "e.g., 5 expansion conversations", type: "text" },
        { id: "trackingLocation", label: "Where I track expansion pipeline", placeholder: "e.g., Google Sheet, Notion, CRM", type: "text" }
      ]
    }
  ]}
/>

## The Expansion Mindset Shift

Before we wrap, let's talk about the mental shift required to make expansion work.

**Old mindset:** "I'm grateful they're paying me. I don't want to seem greedy by asking for more."

**New mindset:** "I'm looking for opportunities to deliver more value and capture more revenue. If they're getting results, they'll want more. If they're not, I need to fix that first."

Expansion is NOT about extracting more money from customers. It's about **serving them more deeply** as their needs grow.

- A customer who grows from 3 seats to 15 seats has a growing team. They NEED more capacity.
- A coaching client who achieves their initial goal has new challenges. They NEED the next level of support.
- A SaaS customer who's using advanced features has outgrown their plan. They NEED the upgrade.

Your job is to **notice these signals and offer the solution**. If you don't, they'll either:
1. Hit a wall and get frustrated (churn risk)
2. Find the solution elsewhere (lost revenue)

<RangeSlider 
  label="How comfortable are you initiating expansion conversations?" 
  min={1} 
  max={10} 
  lowLabel="Very uncomfortable" 
  highLabel="Very comfortable" 
  persistKey="expansion-L8-comfort" 
/>

If you scored below 7, here's the reframe:

**You're not "upselling." You're noticing a need and offering help.**

Practice this language:
- "I noticed [signal]. That usually means [pain/opportunity]. Here's how [expansion] helps."
- "Congrats on [milestone]! Most clients at this stage find they need [next step]. Want to talk about that?"
- "You're hitting the limit on [feature]. Let me show you how [upgrade] unlocks that."

It's consultative, not salesy. You're diagnosing and prescribing, not pitching.

## Your Action Items

<InteractiveChecklist 
  title="Post-Lesson Action Items" 
  persistKey="expansion-L8-actions" 
  items={[
    "Complete the 7-Day Implementation Sprint (or schedule it for next week)",
    "Calculate your current NRR baseline",
    "Define 5-8 expansion triggers specific to your business",
    "Write outreach templates for each trigger",
    "Set up trigger detection (automations or manual reminders)",
    "Document pricing scenarios and communication templates",
    "Review Green health score accounts and identify 3-5 immediate expansion opportunities",
    "Execute your first 3 expansion conversations",
    "Add monthly expansion review to your calendar (15 minutes, recurring)",
    "Set 6-month NRR target and track monthly progress"
  ]} 
/>

## What's Next: Course 39 — Customer Advocacy & Referrals

You've built the expansion engine. Now you're going to turn your best customers into a **referral machine**.

In Course 39, you'll learn:
- How to identify advocacy candidates (hint: expanded customers are prime targets)
- The 5 types of advocacy (testimonials, case studies, referrals, reviews, co-marketing)
- How to ask for referrals without being awkward
- Building a referral program that runs on autopilot
- Turning advocates into co-creators (user-generated content, community leaders)

Expansion and advocacy are the **compounding growth duo**. Expansion grows revenue per customer. Advocacy grows customer count at near-zero CAC.

Together, they create a business that grows exponentially while you sleep.

---

**You've completed Course 38: Expansion & Upsell.**

Your expansion system is built. Your NRR baseline is calculated. Your triggers are defined. Your templates are written.

Now go execute. Review your Green accounts. Send those first 3 expansion emails. Watch your NRR climb above 100%.

Your existing customer base is about to become your best growth channel.