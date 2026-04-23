---
title: "Revenue Tracking: New, Expansion, and Churned MRR"
duration: "50 min"
track: "Operations & Systems"
course: "Course 47: Sales Finance & Tax"
lesson: 3
---

## Total MRR Is a Lie (Sort Of)

Here's a scenario: Your MRR was $10,000 last month. It's $10,000 this month. Nothing changed — right?

Wrong. Everything might have changed.

Maybe you added $3,000 in new customers, lost $2,000 to churn, and gained $1,000 from existing customers upgrading. Net result: $12,000 starts, net change zero, ending at $10,000. But your business is in completely different shape depending on whether that's the story.

Or maybe you kept all your existing customers and added no new ones. That's a growth problem hiding behind a stable number.

**Total MRR tells you where you are. MRR decomposition tells you why you're there and where you're going.**

This lesson teaches you to decompose your revenue correctly, interpret the health signals, and build a tracking system that gives you early warning before problems become crises.

<InsightCard icon="💰" title="The Compounding Math of Revenue Health">
Companies with Net Revenue Retention above 100% grow 2-3x faster than those below 100%. This is because existing customers are contributing to growth — not just replacement. Understanding NRR starts with understanding MRR decomposition.
</InsightCard>

## The Four Revenue Components

Every change in your MRR falls into exactly one of these four categories:

<SlideNavigation>
<Slide title="New MRR">

**Definition:** Revenue from customers who started paying you this month for the first time.

**Formula:** Sum of first-month subscription fees from all new customers who signed up this month.

**What it tells you:** How effectively you're acquiring new customers. This is the output of everything in your acquisition funnel — lead generation, sales calls, conversion rates.

**Benchmark:** Growing 10-20% month-over-month in early stage (first $50K MRR). At $10K MRR, adding $1K-2K in New MRR per month is healthy.

**Example:** 5 new customers at $200/month = $1,000 New MRR.

</Slide>

<Slide title="Expansion MRR">

**Definition:** Revenue increase from existing customers — upgrades, additional seats, add-ons, usage overages.

**Formula:** Sum of MRR increases for all existing customers in this month.

**What it tells you:** How well you're monetizing your existing base. Expansion MRR is the cheapest revenue you can acquire — these customers already trust you and are actively using your product.

**Benchmark:** Expansion MRR should be 20-40% of net new MRR for a healthy business. If you're growing entirely through new customers and getting nothing from expansion, you have an untapped revenue stream.

**Example:** 2 customers upgrade from $200/month to $400/month = $400 Expansion MRR.

</Slide>

<Slide title="Contraction MRR">

**Definition:** Revenue decrease from existing customers who downgraded or reduced usage.

**Formula:** Sum of MRR decreases for all existing customers in this month (excluding full cancellations).

**What it tells you:** Customer satisfaction signals and pricing pressure. If contraction is rising, customers are finding your pricing harder to justify — often an early warning of eventual churn.

**Benchmark:** Contraction should be less than 50% of Expansion MRR for a healthy business.

**Example:** 3 customers downgrade from $400/month to $200/month = -$600 Contraction MRR.

</Slide>

<Slide title="Churned MRR">

**Definition:** Revenue lost from customers who cancelled entirely this month.

**Formula:** Sum of MRR from all customers who cancelled in this month.

**What it tells you:** Retention health. Churned MRR is the most critical metric to watch. High churn means you're trying to fill a leaky bucket — every dollar of new MRR gets partially offset by churn.

**Benchmark:** Less than 3% monthly logo churn (percentage of customers cancelling), less than 5% monthly revenue churn. At $10K MRR, losing more than $500/month to churn is a red flag.

**Example:** 2 customers at $300/month cancel = -$600 Churned MRR.

</Slide>
</SlideNavigation>

## The MRR Formula

**Net New MRR = New MRR + Expansion MRR - Contraction MRR - Churned MRR**

**Ending MRR = Starting MRR + Net New MRR**

**Net Revenue Retention (NRR) = (Starting MRR + Expansion - Contraction - Churned) / Starting MRR × 100%**

Let's walk through an example:

Starting MRR: $10,000
+ New MRR: $2,000
+ Expansion MRR: $800
- Contraction MRR: ($300)
- Churned MRR: ($600)
= Net New MRR: $1,900
= Ending MRR: $11,900

NRR = ($10,000 + $800 - $300 - $600) / $10,000 = $9,900 / $10,000 = 99%

That's a healthy NRR — just below 100%. The business is nearly able to sustain itself without new customers, which means new customers represent pure growth.

## The Revenue Health Scorecard

<SlideNavigation>
<Slide title="Monthly Logo Churn">

**How to calculate:** Customers who cancelled this month / Customers at start of month × 100%

**Red (Danger):** Greater than 7%
**Yellow (Watch):** 3-7%
**Green (Healthy):** Less than 3%

At 7% monthly logo churn, you're losing 58% of your customers every year. The business is a churn machine. At 3%, you're losing 31% per year — better, but still requiring significant new customer acquisition to grow.

</Slide>

<Slide title="Net Revenue Retention (NRR)">

**How to calculate:** (Starting MRR + Expansion - Contraction - Churned) / Starting MRR × 100%

**Red (Danger):** Less than 90%
**Yellow (Watch):** 90-100%
**Green (Healthy):** Greater than 100%

NRR above 100% means your existing customer base is growing, even without any new customers. This is the hallmark of best-in-class SaaS businesses. Solo founder target: 95-110% NRR.

</Slide>

<Slide title="Expansion Rate">

**How to calculate:** Expansion MRR / (Net New MRR) × 100%

**Red:** 0% (no expansion from existing customers)
**Yellow:** 1-20% (some expansion)
**Green:** Greater than 20% (expansion is a meaningful driver)

Expansion revenue is 3-5x cheaper to acquire than new customer revenue. If you're getting 0% expansion, you likely have an upsell problem — good products often naturally expand if pricing tiers are well designed.

</Slide>
</SlideNavigation>

## Simulate Your Revenue Health

<ScenarioSimulator
  title="MRR Decomposition Calculator"
  persistKey="finance-L3-sim"
  levers={[
    { id: "startingMRR", label: "Starting MRR ($)", min: 1000, max: 50000, step: 500, defaultValue: 10000 },
    { id: "newMRR", label: "New MRR This Month ($)", min: 0, max: 10000, step: 100, defaultValue: 2000 },
    { id: "expansionMRR", label: "Expansion MRR ($)", min: 0, max: 5000, step: 100, defaultValue: 500 },
    { id: "contractionMRR", label: "Contraction MRR ($)", min: 0, max: 3000, step: 100, defaultValue: 200 },
    { id: "churnedMRR", label: "Churned MRR ($)", min: 0, max: 5000, step: 100, defaultValue: 400 }
  ]}
  outputs={[
    { id: "netNew", label: "Net New MRR", formula: "newMRR + expansionMRR - contractionMRR - churnedMRR", unit: "$", precision: 0 },
    { id: "endingMRR", label: "Ending MRR", formula: "startingMRR + newMRR + expansionMRR - contractionMRR - churnedMRR", unit: "$", precision: 0 },
    { id: "nrr", label: "Net Revenue Retention (NRR)", formula: "((startingMRR + expansionMRR - contractionMRR - churnedMRR) / startingMRR) * 100", unit: "%", precision: 1 },
    { id: "growthRate", label: "MRR Growth Rate", formula: "((newMRR + expansionMRR - contractionMRR - churnedMRR) / startingMRR) * 100", unit: "%", precision: 1 }
  ]}
  insight="Starting at {startingMRR}, your business ends the month at {endingMRR} — a {growthRate}% growth rate. Your NRR of `{nrr}`% shows how well you're retaining and expanding existing revenue."
/>

## Tracking Tools for Solo Founders

<SlideNavigation>
<Slide title="ProfitWell (Free — Start Here)">

**Cost:** Free (ProfitWell by Paddle)

**Setup:** Connect your Stripe account in about 5 minutes. ProfitWell reads your billing data and automatically calculates MRR decomposition, NRR, churn rates, and LTV.

**Best for:** SaaS founders using Stripe. You get a professional revenue dashboard for $0.

**Limitation:** Works best with Stripe. If you're on Chargebee or a different processor, the integration requires more setup.

**Bottom line:** If you're on Stripe and not using ProfitWell, set it up today. It's the best free analytics tool in SaaS.

</Slide>

<Slide title="Baremetrics ($50/mo+)">

**Cost:** $50/month (Grow plan, up to $10K MRR)

**Best for:** SaaS founders who want deeper analytics — cohort analysis, forecasting, customer-level drill-down, dunning (Recover feature)

**When to upgrade from ProfitWell:** When you have $5K+ MRR and want to understand *which* customers are churning and *why*, rather than just the aggregate metrics

**Limitation:** Cost may not be justified below $5K MRR

</Slide>

<Slide title="Google Sheets (Early Stage and Service Businesses)">

**Cost:** Free

**Best for:** Early-stage SaaS (under 20 customers), service businesses without subscription revenue

**Setup:** Build a simple MRR decomposition spreadsheet with the formula from this lesson. Update it on the first of each month.

**Service business adaptation:** Track monthly retainer revenue as "recurring MRR," one-off project revenue as "non-recurring revenue," and calculate concentration risk (% revenue from top 3 clients).

**Template structure:**
- Column A: Month
- Column B: Starting MRR
- Columns C-F: New / Expansion / Contraction / Churned
- Column G: Net New MRR (formula)
- Column H: Ending MRR (formula)
- Column I: NRR (formula)

</Slide>
</SlideNavigation>

## Service Business Revenue Tracking

If you're not SaaS, you still need revenue decomposition — just adapted for your model:

<FlipCard front="Recurring Revenue (Retainers)" back="Monthly retainer income from ongoing clients. Track month-over-month changes: new retainers started, retainers that ended, and rate changes. This is your 'MRR equivalent.'" />

<FlipCard front="Project Revenue" back="One-off project fees. Track the pipeline of committed future projects, not just current month. Revenue concentration risk: if one project represents >30% of monthly revenue, you have concentration risk." />

<FlipCard front="Revenue Concentration" back="What percentage of your revenue comes from your top 3 clients? Over 50% is dangerous — one lost client creates a cash crisis. Target: no single client over 30% of revenue." />

<FlipCard front="Pipeline Revenue" back="Committed future revenue from signed contracts not yet invoiced. Tracking this gives you 30-90 days of forward visibility on your income." />

## Build Your MRR Tracking System

<TemplateBuilder
  title="My Revenue Tracking Setup"
  persistKey="finance-L3-template"
  sections={[
    {
      id: "tool",
      title: "My Tracking Tool",
      fields: [
        { id: "tool", label: "My primary MRR tracking tool", placeholder: "e.g., ProfitWell (connected to Stripe) / Google Sheets / Baremetrics", type: "text" },
        { id: "frequency", label: "How often I'll review MRR decomposition", placeholder: "e.g., First Monday of every month — 30 minutes", type: "text" }
      ]
    },
    {
      id: "benchmarks",
      title: "My Revenue Health Targets",
      fields: [
        { id: "churn_target", label: "Monthly logo churn target", placeholder: "e.g., Under 3% — currently at 5%, working to reduce", type: "text" },
        { id: "nrr_target", label: "NRR target", placeholder: "e.g., 100%+ — want existing customers to grow", type: "text" },
        { id: "expansion_target", label: "Expansion MRR target", placeholder: "e.g., 25% of net new MRR — need to build upsell path", type: "text" }
      ]
    },
    {
      id: "concentration",
      title: "Revenue Concentration (for service businesses)",
      fields: [
        { id: "top_client", label: "My largest client as % of total revenue", placeholder: "e.g., Client A represents 35% of revenue — above my 30% target", type: "text" },
        { id: "action", label: "My action to reduce concentration risk", placeholder: "e.g., Close 2 new mid-size clients this quarter to dilute concentration below 25%", type: "text" }
      ]
    }
  ]}
/>

## Lesson 3 Completions

<InteractiveChecklist
  title="Revenue Tracking Setup"
  persistKey="finance-L3-actions"
  items={[
    "Connect ProfitWell to Stripe (takes 5 minutes, completely free)",
    "Or build MRR decomposition spreadsheet in Google Sheets using the formula: Net New = New + Expansion - Contraction - Churned",
    "Calculate my current NRR and compare to target (>100% is healthy)",
    "Calculate my monthly logo churn rate — is it in the green zone (under 3%)?",
    "Identify my revenue concentration risk — what % does my largest client represent?",
    "Set a monthly review date for MRR decomposition (first week of each month)"
  ]}
/>

## What's Next

In **Lesson 4**, you'll calculate your Customer Acquisition Cost (CAC) and CAC Payback Period — the metrics that tell you whether your growth is economically sustainable. We'll cover the bootstrapped vs funded benchmarks and why the difference matters more than you think.
