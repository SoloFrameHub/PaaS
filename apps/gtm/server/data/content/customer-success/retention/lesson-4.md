---
title: "SMB Churn Benchmarks & NRR Targets"
duration: "45 min"
track: "Customer Success"
course: "Course 37: Retention & Churn Prevention"
lesson: 4
---

You're tracking health scores. You've identified churn signals. You're intervening on at-risk accounts.

But here's the question that keeps you up at night: **Is your churn actually good or bad?**

You lost 4 customers last month. Is that a crisis or normal? Your NRR is 94%. Should you celebrate or panic?

Without benchmarks, you're flying blind. You don't know if you're winning or losing.

## The Benchmark Reality Check

Here's what happened to Marcus, a solo founder running a $28K MRR project management tool for creative agencies:

He was losing 6-8 customers per month out of 180 total. It felt like a lot. He spent sleepless nights wondering if his product was fundamentally broken.

Then he ran the numbers against industry benchmarks.

His monthly logo churn: **3.9%**  
Industry median for SMB SaaS: **5.2%**  
Best-in-class: **&lt;3%**

He wasn't failing. He was *above average*. Not great yet, but not broken.

More importantly: he now knew his target. Get from 3.9% to 2.8% over the next 6 months, and he'd be best-in-class.

That clarity changed everything. Instead of panic, he had a roadmap.

<InsightCard icon="📊" title="Why Benchmarks Matter">
Without context, every lost customer feels like failure. With benchmarks, you know whether you're fighting a product problem, an onboarding problem, or just normal market dynamics.
</InsightCard>

## The Three Metrics That Actually Matter

Most founders track too many metrics and understand none of them. For solo founders, three metrics tell you everything:

1. **Monthly Logo Churn** — What percentage of customers cancel each month?
2. **Monthly Revenue Churn** — What percentage of MRR do you lose each month?
3. **Net Revenue Retention (NRR)** — Are you growing revenue from existing customers faster than you're losing it?

Let's break down each one.

<FlipCard 
  front="Logo Churn vs Revenue Churn — What's the Difference?" 
  back="Logo churn counts customers. Revenue churn counts dollars. If you lose 5 small customers ($50/mo each) but upsell 2 large ones (+$200/mo each), logo churn looks bad (5 lost) but revenue churn is actually negative (you gained $150 net)." 
/>

### Monthly Logo Churn: The Customer Count

**Formula:** (Customers lost this month / Customers at start of month) × 100

If you started March with 100 customers and lost 4, your monthly logo churn is 4%.

<ScenarioSimulator
  title="Logo Churn Calculator"
  persistKey="retention-L4-logo-churn"
  levers={[
    { id: "startCustomers", label: "Customers at month start", min: 10, max: 500, step: 10, defaultValue: 100 },
    { id: "lostCustomers", label: "Customers lost", min: 0, max: 50, step: 1, defaultValue: 4 }
  ]}
  outputs={[
    { id: "logoChurn", label: "Monthly logo churn", formula: "(lostCustomers / startCustomers) * 100", unit: "%", precision: 1 },
    { id: "annualRetention", label: "Implied annual retention", formula: "Math.pow(1 - (lostCustomers / startCustomers), 12) * 100", unit: "%", precision: 1 }
  ]}
  insight="At {logoChurn}% monthly churn, you'll retain {annualRetention}% of customers over 12 months. That means the average customer lifetime is roughly {(1 / (lostCustomers / startCustomers)).toFixed(1)} months."
/>

**SMB SaaS Benchmarks:**
- Starting point (normal): 5-8% monthly
- Good (6-month target): 3-5% monthly
- Great (12-month target): &lt;3% monthly

### Monthly Revenue Churn: The Dollar Impact

**Formula:** (MRR lost this month / MRR at start of month) × 100

This is where things get interesting. Revenue churn can be *lower* than logo churn if you're losing small customers, or *higher* if you're losing big ones.

<ExampleCard label="Case Study: The Deceptive Logo Churn">
Sarah's SaaS had 5% monthly logo churn — right at the median. But her revenue churn was 8%.

Why? She was losing her highest-paying customers ($500/mo) while retaining the lowest tier ($50/mo).

Logo churn said "you're average." Revenue churn said "you're bleeding high-value accounts."

She dug into the data: her $500/mo tier had terrible onboarding. They signed up, got overwhelmed, and churned within 60 days.

Fix: She built a white-glove onboarding flow for $500+ customers. Revenue churn dropped to 3% in 3 months.
</ExampleCard>

**SMB SaaS Benchmarks:**
- Starting point: 4-6% monthly
- Good: 2-4% monthly
- Great: &lt;2% monthly

### Net Revenue Retention (NRR): The Growth Engine

This is the metric that separates good businesses from great ones.

**Formula:** (Starting MRR + Expansion - Contraction - Churn) / Starting MRR × 100

Let's say you start the month with $40,000 MRR:
- You upsell 3 customers: +$1,200
- You downgrade 2 customers: -$300
- You lose 4 customers: -$1,600

**NRR = ($40,000 + $1,200 - $300 - $1,600) / $40,000 × 100 = 97.5%**

<FlipCard 
  front="What Does NRR >100% Mean?" 
  back="It means you're growing revenue from existing customers faster than you're losing it to churn. You could stop acquiring new customers entirely and still grow. Best-in-class SaaS companies have NRR of 120-130%. For solo founders, 100%+ is the target." 
/>

<ScenarioSimulator
  title="NRR Calculator"
  persistKey="retention-L4-nrr"
  levers={[
    { id: "startingMRR", label: "Starting MRR ($)", min: 5000, max: 100000, step: 1000, defaultValue: 40000 },
    { id: "expansion", label: "Expansion MRR ($)", min: 0, max: 5000, step: 100, defaultValue: 1200 },
    { id: "contraction", label: "Contraction MRR ($)", min: 0, max: 2000, step: 100, defaultValue: 300 },
    { id: "churn", label: "Churned MRR ($)", min: 0, max: 5000, step: 100, defaultValue: 1600 }
  ]}
  outputs={[
    { id: "nrr", label: "Net Revenue Retention", formula: "((startingMRR + expansion - contraction - churn) / startingMRR) * 100", unit: "%", precision: 1 },
    { id: "netChange", label: "Net MRR change", formula: "expansion - contraction - churn", unit: "$", precision: 0 }
  ]}
  insight="Your NRR is `{nrr}`%. {nrr >= 100 ? 'You're growing from existing customers alone — this is the holy grail.' : 'You need ' + ((startingMRR * 0.01) - (expansion - contraction - churn)).toFixed(0) + ' more in expansion to hit 100% NRR.'}"
/>

**SMB SaaS Benchmarks:**
- Starting point: 85-95%
- Good: 95-100%
- Great: 100%+

## The Solo Founder Reality: Your Actual Targets

Here's the truth: you're not competing with VC-backed SaaS companies that have 10-person CS teams.

You're a solo founder. Your benchmarks are different.

<InsightCard icon="🎯" title="Realistic Solo Founder Benchmarks">
If you're at 5-8% monthly churn right now, you're *normal*. Your goal isn't to match enterprise SaaS (1-2% churn) in 6 months. Your goal is to get to 3-5% in 6 months, then &lt;3% in 12 months.
</InsightCard>

<TemplateBuilder
  title="Your Benchmark Targets"
  persistKey="retention-L4-targets"
  sections={[
    {
      id: "current",
      title: "Current State",
      fields: [
        { id: "customers", label: "Total Customers", placeholder: "e.g., 150", type: "number" },
        { id: "mrr", label: "Total MRR ($)", placeholder: "e.g., 25000", type: "number" },
        { id: "logoChurn", label: "Monthly Logo Churn (%)", placeholder: "e.g., 6", type: "number" },
        { id: "revenueChurn", label: "Monthly Revenue Churn (%)", placeholder: "e.g., 5", type: "number" }
      ]
    },
    {
      id: "targets",
      title: "6-Month Targets",
      fields: [
        { id: "logoTarget", label: "Logo Churn Target (%)", placeholder: "e.g., 3.5", type: "number" },
        { id: "revenueTarget", label: "Revenue Churn Target (%)", placeholder: "e.g., 2.5", type: "number" },
        { id: "nrrTarget", label: "NRR Target (%)", placeholder: "e.g., 98", type: "number" }
      ]
    }
  ]}
/>

## Cohort Analysis: The Hidden Truth About Your Churn

Here's a question that will change how you think about retention:

**Are you getting better or worse at keeping customers?**

You can't answer that by looking at overall churn. You need cohort analysis.

A cohort is a group of customers who signed up in the same month. Cohort analysis tracks: how many customers from each signup month are still with you after 1 month, 3 months, 6 months, 12 months?

<ExampleCard label="Case Study: The Improving Churn">
David's SaaS had 5% monthly churn. Looked stable.

But when he ran cohort analysis, he discovered:
- January cohort: 40% churned in first month, 60% retained at month 6
- March cohort (after onboarding improvements): 20% churned in first month, 75% retained at month 6

Overall churn was the same, but *new* customers were retaining much better. His improvements were working — it just took time to show up in the aggregate numbers.
</ExampleCard>

The cohort table looks like this:

| Signup Month | Month 1 | Month 2 | Month 3 | Month 6 | Month 12 |
|--------------|---------|---------|---------|---------|----------|
| January      | 100%    | 60%     | 50%     | 40%     | 35%      |
| February     | 100%    | 65%     | 55%     | 45%     | —        |
| March        | 100%    | 80%     | 70%     | —       | —        |

If March > February > January, you're improving. If the trend is flat or declining, your retention work isn't landing.

<SlideNavigation>
<Slide title="Reading Cohort Tables">

**What to look for:**

1. **The First-Month Cliff** — Where's the biggest drop? If 40% churn in month 1, that's an onboarding problem.
2. **The Steady State** — Where does retention flatten? If it flattens at 60% after month 3, that's your natural retention rate.
3. **The Trend** — Are newer cohorts retaining better than older ones? That's the only number that matters.

</Slide>

<Slide title="Building Your First Cohort Table">

You don't need fancy tools. A Google Sheet works:

**Columns:** Month 0, Month 1, Month 2... Month 12  
**Rows:** Each signup month (Jan 2024, Feb 2024, etc.)  
**Formula:** =COUNTIF(customers, "still active at month X") / COUNTIF(customers, "signed up in cohort month")

Update it monthly. Watch for the trend.

</Slide>

<Slide title="What Good Looks Like">

**Healthy cohort retention:**
- Month 1: 80-90% (10-20% first-month churn)
- Month 3: 70-80%
- Month 6: 60-75%
- Month 12: 55-70%

**Red flags:**
- Month 1 retention &lt;60% (onboarding is broken)
- Retention keeps dropping after month 6 (product-market fit issue)
- Newer cohorts retain *worse* than older ones (you're regressing)

</Slide>
</SlideNavigation>

## The Break-Even Churn Rate: Your Growth Ceiling

Here's a metric most founders don't track but should:

**Break-Even Churn Rate = New MRR / Total MRR**

This is the maximum monthly churn you can sustain and still grow.

Example: You have $40K MRR. You add $2K in new MRR each month.

Break-even churn = $2K / $40K = **5%**

If your churn is below 5%, you grow. If it's above 5%, you shrink.

<ScenarioSimulator
  title="Break-Even Churn Calculator"
  persistKey="retention-L4-breakeven"
  levers={[
    { id: "totalMRR", label: "Total MRR ($)", min: 5000, max: 100000, step: 1000, defaultValue: 40000 },
    { id: "newMRR", label: "New MRR per month ($)", min: 500, max: 10000, step: 500, defaultValue: 2000 }
  ]}
  outputs={[
    { id: "breakeven", label: "Break-even churn rate", formula: "(newMRR / totalMRR) * 100", unit: "%", precision: 1 },
    { id: "growthRate", label: "Growth rate if churn = 3%", formula: "((newMRR - (totalMRR * 0.03)) / totalMRR) * 100", unit: "%", precision: 1 }
  ]}
  insight="Your break-even churn is `{breakeven}`%. If you're below that, you grow. If you're above it, you shrink. At 3% churn, you'd grow {growthRate}% monthly."
/>

<InsightCard icon="⚠️" title="The Growth Trap">
Many founders focus obsessively on acquisition while ignoring churn. They add $3K/month in new MRR but lose $2.5K to churn. Net growth: $500/month. That's 12 months to add $6K MRR.

If they cut churn in half (to $1.25K), net growth becomes $1.75K/month — 3.5x faster growth with *zero* change to acquisition.

Retention is a growth lever, not just a cost-saving measure.
</InsightCard>

## Benchmarking by ARPU: Why Price Tier Matters

Not all churn rates are created equal. Your acceptable churn depends heavily on your ARPU (Average Revenue Per User).

<ClassifyExercise
  title="Classify These Churn Rates"
  persistKey="retention-L4-classify"
  categories={[
    { id: "good", label: "Good for this ARPU", color: "#10b981" },
    { id: "acceptable", label: "Acceptable", color: "#f59e0b" },
    { id: "bad", label: "Too high", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "$50/mo ARPU, 6% monthly churn", correctCategory: "acceptable", explanation: "Low ARPU products have structurally higher churn. 6% is median for this tier." },
    { id: "2", content: "$500/mo ARPU, 6% monthly churn", correctCategory: "bad", explanation: "At $500/mo, you should be &lt;3%. 6% means you're losing high-value customers too fast." },
    { id: "3", content: "$100/mo ARPU, 3% monthly churn", correctCategory: "good", explanation: "3% is best-in-class for this ARPU tier." },
    { id: "4", content: "$50/mo ARPU, 10% monthly churn", correctCategory: "bad", explanation: "Even for low ARPU, 10% is unsustainable." },
    { id: "5", content: "$200/mo ARPU, 2% monthly churn", correctCategory: "good", explanation: "Excellent retention for mid-market ARPU." }
  ]}
/>

**Churn Benchmarks by ARPU:**

| ARPU Tier | Acceptable Monthly Churn | Good Monthly Churn | Great Monthly Churn |
|-----------|-------------------------|-------------------|---------------------|
| &lt;$100/mo  | 4-8%                    | 3-5%              | &lt;3%                 |
| $100-500  | 2-5%                    | 2-3%              | &lt;2%                 |
| $500+     | 1-3%                    | 1-2%              | &lt;1%                 |

Why does ARPU matter? Higher-paying customers have:
- More decision-makers (harder to cancel impulsively)
- Longer contracts (annual vs monthly)
- More integration/switching costs
- Higher expectations (but also higher tolerance for price if value is clear)

## Putting It All Together: Your Benchmark Dashboard

You don't need a fancy BI tool. A simple spreadsheet updated monthly is enough.

<TemplateBuilder
  title="Monthly Retention Dashboard"
  persistKey="retention-L4-dashboard"
  sections={[
    {
      id: "snapshot",
      title: "Monthly Snapshot",
      fields: [
        { id: "month", label: "Month", placeholder: "e.g., March 2025", type: "text" },
        { id: "startCustomers", label: "Customers (start)", placeholder: "e.g., 150", type: "number" },
        { id: "startMRR", label: "MRR (start)", placeholder: "e.g., 25000", type: "number" },
        { id: "newCustomers", label: "New customers", placeholder: "e.g., 12", type: "number" },
        { id: "lostCustomers", label: "Lost customers", placeholder: "e.g., 5", type: "number" },
        { id: "expansion", label: "Expansion MRR", placeholder: "e.g., 800", type: "number" },
        { id: "contraction", label: "Contraction MRR", placeholder: "e.g., 200", type: "number" },
        { id: "churnedMRR", label: "Churned MRR", placeholder: "e.g., 1200", type: "number" }
      ]
    },
    {
      id: "calculated",
      title: "Calculated Metrics",
      fields: [
        { id: "logoChurn", label: "Logo Churn (%)", placeholder: "Auto-calculated", type: "number" },
        { id: "revenueChurn", label: "Revenue Churn (%)", placeholder: "Auto-calculated", type: "number" },
        { id: "nrr", label: "NRR (%)", placeholder: "Auto-calculated", type: "number" }
      ]
    }
  ]}
/>

**Update this monthly. Track trends over 6-12 months.**

## Your Action Plan

<InteractiveChecklist 
  title="Benchmark Implementation Checklist" 
  persistKey="retention-L4-actions" 
  items={[
    "Calculate your current monthly logo churn and revenue churn",
    "Calculate your NRR for the last 3 months",
    "Build a simple cohort retention table (last 6 signup months)",
    "Set 6-month targets for logo churn, revenue churn, and NRR",
    "Calculate your break-even churn rate",
    "Create a monthly dashboard template and commit to updating it",
    "Identify your biggest gap: logo churn, revenue churn, or expansion"
  ]} 
/>

## The Truth About Benchmarks

Benchmarks aren't goals. They're context.

If you're at 6% monthly churn and the benchmark is 3%, that doesn't mean you're failing. It means you have a 3-percentage-point opportunity.

The real question isn't "Am I better than the benchmark?" It's "Am I improving?"

If your churn was 8% six months ago and it's 6% now, you're winning. If it's been stuck at 6% for a year, you need to change your approach.

**Benchmarks give you direction. Trends tell you if you're moving.**

---

**Next Lesson:** Reactivation Sequences (No Login in 10 Days) — where you'll learn to intervene *before* customers mentally check out.