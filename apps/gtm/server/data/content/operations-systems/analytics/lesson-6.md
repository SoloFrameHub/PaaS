---
title: "Revenue Tracking: New vs Expansion vs Churned MRR"
duration: "50 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 6
---

## The $47K Mystery

Sarah stared at her bank account. $47,000 in revenue last month. Her best month ever.

This month? $39,000. Down $8K.

She panicked. "What happened? Did I lose customers? Did my outreach stop working?"

She opened her CRM. Same number of active customers: 42.

Wait. How did revenue drop if customer count stayed the same?

She spent three hours digging through invoices. The answer:

- 3 customers upgraded (+$2,400)
- 2 customers downgraded (-$1,200)
- 4 customers churned (-$9,200)
- 5 new customers joined (+$6,000)

**Net change: -$2,000**

But her "total revenue" view only showed the final number. She had no idea expansion was masking churn. She had no idea her business was bleeding.

<InsightCard icon="💡" title="The Revenue Illusion">
Total revenue is a vanity metric. It hides the truth: are you growing from new customers, or are existing customers saving you? Are upgrades masking churn? Without segmented MRR tracking, you're flying blind.
</InsightCard>

By the end of this lesson, you'll build a **MRR Waterfall Dashboard** that shows exactly where every dollar of revenue comes from — and where it goes.

---

## Why MRR Components Matter More Than Total Revenue

Most founders track one number: "How much money came in this month?"

That's like a doctor checking only your weight. Weight doesn't tell you if you're losing muscle or gaining fat.

Revenue has four components:

1. **New MRR** — First-time customers
2. **Expansion MRR** — Upgrades, add-ons, seat additions from existing customers
3. **Contraction MRR** — Downgrades from existing customers
4. **Churned MRR** — Cancellations

<FlipCard 
  front="Net New MRR Formula" 
  back="Net New MRR = New MRR + Expansion MRR - Contraction MRR - Churned MRR" 
/>

### Why This Matters for Solo Founders

You have limited time. You can't fix everything at once.

**If New MRR is low:** Your acquisition isn't working. Go back to Courses 21-27 (AI Acquisition).

**If Expansion MRR is zero:** You're leaving money on the table. Existing customers are easier to upsell than new ones to acquire.

**If Contraction MRR is high:** Your pricing tiers are wrong or your product isn't delivering value at higher tiers.

**If Churned MRR is high:** You have a retention problem. Go to Course 37 (Retention & Expansion).

<RangeSlider 
  label="How confident are you in identifying which revenue component needs the most attention?" 
  min={1} 
  max={10} 
  lowLabel="No idea" 
  highLabel="Very confident" 
  persistKey="analytics-L6-confidence" 
/>

---

## The MRR Waterfall: Your Most Important Chart

The MRR Waterfall visualizes revenue flow like water cascading down steps.

Start with last month's MRR. Add new customers. Add expansions. Subtract contractions. Subtract churn. End with this month's MRR.

Here's what Sarah's looked like:

```
Starting MRR (April):     $47,000
+ New MRR:                +$6,000
+ Expansion MRR:          +$2,400
- Contraction MRR:        -$1,200
- Churned MRR:            -$9,200
= Ending MRR (May):       $45,000
```

**Net change: -$2,000 (-4.3%)**

The waterfall instantly revealed her problem: **churn was eating her growth**.

<ExampleCard label="Case Study: The Hidden Expansion Engine">
Marcus ran a $28K/month coaching business. He thought he was stagnant — revenue had been flat for 6 months.

Then he built a waterfall. He discovered:
- New MRR: +$4K/month (consistent)
- Expansion MRR: +$3K/month (clients upgrading from 1:1 to group programs)
- Churned MRR: -$7K/month (clients finishing 3-month programs)

His business wasn't stagnant. He had a **$7K/month churn problem** masked by $7K in new + expansion revenue.

He fixed churn by adding a low-cost continuity program. Within 90 days, churn dropped to $2K/month. His MRR jumped to $38K.
</ExampleCard>

<InsightCard icon="📊" title="The Waterfall Advantage">
The waterfall shows you **where to focus**. If expansion is zero, you're ignoring your easiest revenue source. If churn is high, acquisition is a band-aid. Fix the leak before filling the bucket.
</InsightCard>

---

## Building Your MRR Waterfall (Step-by-Step)

You'll build this in Google Sheets (or your CRM if it supports custom reports).

<SlideNavigation>
<Slide title="Step 1: Define Your MRR Categories">

Create a table with these columns:

| Customer Name | Last Month MRR | This Month MRR | Category |
|---------------|----------------|----------------|----------|
| Acme Corp     | $500           | $500           | Retained |
| Beta Inc      | $0             | $300           | New      |
| Gamma LLC     | $800           | $1,200         | Expansion|
| Delta Co      | $600           | $400           | Contraction|
| Epsilon Ltd   | $400           | $0             | Churned  |

**Category rules:**
- **New**: Last month = $0, This month > $0
- **Retained**: Last month = This month (and both > $0)
- **Expansion**: This month > Last month (and both > $0)
- **Contraction**: This month < Last month (and both > $0)
- **Churned**: Last month > $0, This month = $0

</Slide>

<Slide title="Step 2: Calculate Component Totals">

Sum each category:

```
New MRR = SUM(all "New" rows, This Month MRR column)
Expansion MRR = SUM(all "Expansion" rows, delta between months)
Contraction MRR = SUM(all "Contraction" rows, delta between months)
Churned MRR = SUM(all "Churned" rows, Last Month MRR column)
```

**Example:**
- New MRR: $300 (Beta Inc)
- Expansion MRR: $400 (Gamma LLC: $1,200 - $800)
- Contraction MRR: $200 (Delta Co: $600 - $400)
- Churned MRR: $400 (Epsilon Ltd)

</Slide>

<Slide title="Step 3: Build the Waterfall">

Create a summary table:

| Component | Amount |
|-----------|--------|
| Starting MRR (Last Month) | $2,300 |
| + New MRR | +$300 |
| + Expansion MRR | +$400 |
| - Contraction MRR | -$200 |
| - Churned MRR | -$400 |
| **= Ending MRR (This Month)** | **$2,400** |

**Net New MRR: +$100 (+4.3%)**

</Slide>

<Slide title="Step 4: Visualize It">

In Google Sheets:
1. Select your summary table
2. Insert → Chart
3. Chart type: **Waterfall chart**
4. Customize: Green for New/Expansion, Red for Contraction/Churn

The chart shows revenue flowing from left to right, with gains rising and losses falling.

</Slide>
</SlideNavigation>

<TemplateBuilder
  title="Your MRR Waterfall Template"
  persistKey="analytics-L6-waterfall"
  sections={[
    {
      id: "starting",
      title: "Starting Point",
      fields: [
        { id: "lastMonthMRR", label: "Last Month's Total MRR", placeholder: "e.g., $47,000", type: "text" }
      ]
    },
    {
      id: "components",
      title: "This Month's Components",
      fields: [
        { id: "newMRR", label: "New MRR (first-time customers)", placeholder: "e.g., $6,000", type: "text" },
        { id: "expansionMRR", label: "Expansion MRR (upgrades, add-ons)", placeholder: "e.g., $2,400", type: "text" },
        { id: "contractionMRR", label: "Contraction MRR (downgrades)", placeholder: "e.g., $1,200", type: "text" },
        { id: "churnedMRR", label: "Churned MRR (cancellations)", placeholder: "e.g., $9,200", type: "text" }
      ]
    },
    {
      id: "analysis",
      title: "Quick Analysis",
      fields: [
        { id: "biggestIssue", label: "Which component needs the most attention?", placeholder: "e.g., Churn is 19.6% of starting MRR", type: "textarea" }
      ]
    }
  ]}
/>

---

## Net Revenue Retention (NRR): The Health Score

NRR answers one question: **Are your existing customers growing or shrinking?**

<FlipCard 
  front="NRR Formula" 
  back="NRR = (Starting MRR + Expansion - Contraction - Churn) / Starting MRR × 100" 
/>

### Interpreting NRR

| NRR | Meaning | Action |
|-----|---------|--------|
| **< 90%** | Existing customers are shrinking fast | **Crisis mode.** Fix retention immediately. |
| **90-100%** | Existing customers are flat or slightly shrinking | Acceptable for early-stage, but not sustainable long-term. |
| **100-110%** | Existing customers are growing slightly | **Healthy.** Expansion offsets churn. |
| **110-130%** | Existing customers are growing significantly | **Best-in-class.** You have a retention + expansion engine. |
| **> 130%** | Existing customers are growing rapidly | Rare. Usually driven by usage-based pricing or land-and-expand models. |

<InsightCard icon="🎯" title="Why NRR Matters More Than Growth Rate">
A company with 10% monthly growth and 95% NRR is **weaker** than a company with 5% monthly growth and 110% NRR. The first is filling a leaky bucket. The second has a compounding engine.
</InsightCard>

### Calculating Sarah's NRR

```
Starting MRR: $47,000
+ Expansion: +$2,400
- Contraction: -$1,200
- Churn: -$9,200
= $39,000

NRR = ($39,000 / $47,000) × 100 = 83%
```

**Sarah's existing customers shrank by 17% this month.** That's a crisis.

<RangeSlider 
  label="What do you think is a realistic NRR target for a bootstrapped solo founder in year 1?" 
  min={70} 
  max={130} 
  lowLabel="70%" 
  highLabel="130%" 
  persistKey="analytics-L6-nrr-target" 
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
NRR is the metric that matters most to investors, but for bootstrapped founders, it's your **survival indicator**. If NRR < 90%, you're burning cash on acquisition to replace churned revenue. Build retention features before scaling acquisition.
</ContextualNote>

---

## Tracking for Non-SaaS Businesses

Not everyone has monthly recurring revenue. Here's how to adapt:

### For Service Providers & Coaches

Track **monthly recurring retainer revenue** the same way:

- **New MRR**: New retainer clients
- **Expansion MRR**: Clients upgrading from basic to premium retainers
- **Contraction MRR**: Clients downgrading
- **Churned MRR**: Retainer clients who ended their contracts

**One-time projects don't count as MRR.** Track them separately as "project revenue."

### For Project-Based Businesses

You don't have MRR, but you can track:

1. **Rolling 3-Month Average Revenue** — Smooths out lumpiness
2. **Pipeline Coverage Ratio** — Pipeline value / 3-month revenue target

**Target: 3x pipeline coverage.** If your 3-month target is $30K, you need $90K in pipeline.

### For Content Creators

Track:

- **Recurring revenue** (memberships, Patreon, sponsorships with multi-month contracts)
- **One-time revenue** (course sales, affiliate commissions, one-off sponsorships)

Calculate NRR only on recurring revenue. One-time revenue is bonus, not sustainable.

<ClassifyExercise
  title="Classify These Revenue Streams"
  persistKey="analytics-L6-classify"
  categories={[
    { id: "new", label: "New MRR", color: "#10b981" },
    { id: "expansion", label: "Expansion MRR", color: "#3b82f6" },
    { id: "contraction", label: "Contraction MRR", color: "#f59e0b" },
    { id: "churn", label: "Churned MRR", color: "#ef4444" },
    { id: "notMRR", label: "Not MRR", color: "#6b7280" }
  ]}
  items={[
    { id: "1", content: "A new customer signs up for your $500/month plan", correctCategory: "new" },
    { id: "2", content: "An existing customer upgrades from $200/month to $500/month", correctCategory: "expansion" },
    { id: "3", content: "An existing customer downgrades from $500/month to $200/month", correctCategory: "contraction" },
    { id: "4", content: "A customer cancels their $500/month subscription", correctCategory: "churn" },
    { id: "5", content: "A customer buys a $2,000 one-time consulting project", correctCategory: "notMRR" },
    { id: "6", content: "A customer adds 3 more seats to their existing plan (+$150/month)", correctCategory: "expansion" }
  ]}
/>

---

## Revenue Quality Indicators

Not all revenue is equal. Track these quality metrics:

### 1. Concentration Risk

**Rule:** If any single customer is >20% of your revenue, you're fragile.

**Why:** If they churn, you lose 20%+ of your business overnight.

**Fix:** Diversify. Add more customers in the same segment, or expand to adjacent segments.

<ExampleCard label="The $60K Dependency">
Jake had 8 customers. One paid $5K/month. The other 7 paid $500/month total.

His MRR: $5,500. His concentration: **91% from one customer.**

That customer churned. Jake's MRR dropped to $500 overnight. He had to lay off his VA and go back to solo mode.

**Lesson:** Diversify before you scale.
</ExampleCard>

### 2. Revenue Mix: Recurring vs One-Time

**Healthy SaaS:** 80%+ recurring, &lt;20% one-time (setup fees, consulting).

**Healthy Services:** 50%+ recurring retainers, &lt;50% project-based.

**Why:** Recurring revenue is predictable. One-time revenue is a treadmill.

### 3. Payment Reliability

Track:
- **On-time payments** (paid within 7 days of invoice)
- **Late payments** (paid 8-30 days after invoice)
- **Overdue payments** (>30 days past due)

**Target:** 90%+ on-time.

**If late/overdue is high:** Switch to auto-billing (Stripe subscriptions) or require upfront payment.

<ScenarioSimulator
  title="Revenue Quality Simulator"
  persistKey="analytics-L6-quality"
  levers={[
    { id: "customers", label: "Total Customers", min: 5, max: 50, step: 5, defaultValue: 20 },
    { id: "topCustomerPct", label: "Top Customer % of Revenue", min: 5, max: 50, step: 5, defaultValue: 25 },
    { id: "recurringPct", label: "Recurring Revenue %", min: 30, max: 100, step: 10, defaultValue: 70 }
  ]}
  outputs={[
    { id: "concentrationRisk", label: "Concentration Risk", formula: "topCustomerPct > 20 ? 'HIGH' : 'LOW'", unit: "", precision: 0 },
    { id: "revenueMixHealth", label: "Revenue Mix Health", formula: "recurringPct >= 80 ? 'HEALTHY' : recurringPct >= 50 ? 'MODERATE' : 'RISKY'", unit: "", precision: 0 }
  ]}
  insight="If your top customer is >{topCustomerPct}% of revenue, you have high concentration risk. If recurring revenue is <{recurringPct}%, you're on a treadmill."
/>

---

## The Monthly Revenue Review Ritual

Every first Friday of the month, spend 30 minutes on this:

<InteractiveChecklist 
  title="Monthly Revenue Review Checklist" 
  persistKey="analytics-L6-review" 
  items={[
    "Calculate this month's MRR waterfall (New, Expansion, Contraction, Churn)",
    "Calculate NRR (are existing customers growing or shrinking?)",
    "Check concentration risk (is any customer >20% of revenue?)",
    "Review revenue mix (what % is recurring vs one-time?)",
    "Identify the biggest issue (low expansion? high churn? concentration risk?)",
    "Set one action item to address the biggest issue this month"
  ]} 
/>

### What to Do With the Data

| Finding | Action |
|---------|--------|
| **New MRR is low** | Go back to acquisition (Courses 21-27). Your funnel isn't converting. |
| **Expansion MRR is zero** | Build an upsell path. Add premium tiers, add-ons, or seat-based pricing. |
| **Contraction MRR is high** | Your pricing tiers are wrong. Customers are downgrading because they're not getting value at higher tiers. |
| **Churned MRR is high** | Fix retention (Course 37). Churn is killing your growth. |
| **NRR < 90%** | **Crisis mode.** Stop scaling acquisition. Fix retention first. |
| **Concentration risk >20%** | Diversify. Add more customers in the same segment or expand to adjacent segments. |

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches & Consultants">
Your biggest expansion opportunity is **continuity programs**. If clients finish a 3-month engagement and leave, you're churning 100% of them. Add a low-cost monthly mastermind or office hours program to retain them at lower MRR.
</ContextualNote>

---

## Benchmarking Your MRR Components

Here's what healthy looks like for SMB SaaS:

| Metric | Below Average | Average | Above Average |
|--------|---------------|---------|---------------|
| **New MRR Growth** | &lt;5% monthly | 5-10% monthly | >10% monthly |
| **Expansion MRR** | 0-5% of starting MRR | 5-10% of starting MRR | >10% of starting MRR |
| **Contraction MRR** | >3% of starting MRR | 1-3% of starting MRR | &lt;1% of starting MRR |
| **Churned MRR** | >7% of starting MRR | 3-7% of starting MRR | &lt;3% of starting MRR |
| **NRR** | &lt;90% | 90-100% | >100% |

<InsightCard icon="📈" title="The $1 Expansion Advantage">
According to Profitwell, **$1 of expansion revenue costs 60% less to generate than $1 of new revenue**. Existing customers already trust you. They're easier to upsell than strangers are to acquire.

If your expansion MRR is zero, you're leaving money on the table.
</InsightCard>

<ComparisonBuilder
  title="Your MRR Waterfall vs Benchmark"
  persistKey="analytics-L6-compare"
  prompt="Paste your MRR waterfall summary (Starting MRR, New, Expansion, Contraction, Churn, Ending MRR)"
  expertExample="Starting MRR: $50,000 | New: +$5,000 (10%) | Expansion: +$3,000 (6%) | Contraction: -$1,000 (2%) | Churn: -$2,000 (4%) | Ending MRR: $55,000 | NRR: 102%"
  criteria={[
    "New MRR is 5-10% of starting MRR",
    "Expansion MRR is 5-10% of starting MRR",
    "Contraction MRR is &lt;3% of starting MRR",
    "Churned MRR is &lt;7% of starting MRR",
    "NRR is ≥100%"
  ]}
/>

---

## Common MRR Tracking Mistakes

### Mistake 1: Counting One-Time Revenue as MRR

**Wrong:** A customer pays $5,000 for a one-time project. You count it as $5,000 MRR.

**Right:** One-time revenue is not MRR. Track it separately as "project revenue."

### Mistake 2: Not Tracking Expansion Separately

**Wrong:** A customer upgrades from $200/month to $500/month. You just see total MRR increase by $300.

**Right:** Track the $300 as Expansion MRR. This tells you existing customers are growing.

### Mistake 3: Ignoring Contraction

**Wrong:** A customer downgrades from $500/month to $200/month. You ignore it because they didn't churn.

**Right:** Track the -$300 as Contraction MRR. Downgrades are a leading indicator of churn.

### Mistake 4: Not Calculating NRR

**Wrong:** You track total MRR growth and assume you're healthy because it's going up.

**Right:** Calculate NRR. If it's &lt;100%, your existing customers are shrinking. You're masking it with new customer acquisition.

<SwipeDecision
  title="MRR Tracking: Right or Wrong?"
  description="Swipe right for correct MRR tracking, left for mistakes"
  optionA="Wrong"
  optionB="Right"
  persistKey="analytics-L6-swipe"
  cards={[
    { 
      id: "1", 
      content: "A customer pays $10,000 for a one-time consulting project. You count it as $10,000 MRR.", 
      correctOption: "a", 
      explanation: "One-time revenue is not MRR. Track it separately." 
    },
    { 
      id: "2", 
      content: "A customer upgrades from $100/month to $300/month. You track +$200 as Expansion MRR.", 
      correctOption: "b", 
      explanation: "Correct. Expansion MRR is the delta from upgrades." 
    },
    { 
      id: "3", 
      content: "Your total MRR grew from $40K to $45K. You assume you're healthy without checking NRR.", 
      correctOption: "a", 
      explanation: "Wrong. Total MRR growth can mask high churn. Always calculate NRR." 
    },
    { 
      id: "4", 
      content: "A customer downgrades from $500/month to $200/month. You track -$300 as Contraction MRR.", 
      correctOption: "b", 
      explanation: "Correct. Downgrades are Contraction MRR and a leading indicator of churn." 
    }
  ]}
/>

---

## Your MRR Dashboard Template

Here's the complete template you'll build in Google Sheets (or your CRM):

### Section 1: Customer-Level Data

| Customer Name | Last Month MRR | This Month MRR | Category | Delta |
|---------------|----------------|----------------|----------|-------|
| Acme Corp     | $500           | $500           | Retained | $0    |
| Beta Inc      | $0             | $300           | New      | +$300 |
| Gamma LLC     | $800           | $1,200         | Expansion| +$400 |
| Delta Co      | $600           | $400           | Contraction| -$200 |
| Epsilon Ltd   | $400           | $0             | Churned  | -$400 |

### Section 2: MRR Waterfall Summary

| Component | Amount | % of Starting MRR |
|-----------|--------|-------------------|
| Starting MRR | $2,300 | 100% |
| + New MRR | +$300 | +13% |
| + Expansion MRR | +$400 | +17% |
| - Contraction MRR | -$200 | -9% |
| - Churned MRR | -$400 | -17% |
| **= Ending MRR** | **$2,400** | **+4%** |

### Section 3: Key Metrics

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Net New MRR | +$100 | 5-10% monthly | ✅ On track |
| NRR | 87% | ≥100% | ⚠️ Below target |
| Churn Rate | 17% | &lt;7% | 🚨 Crisis |
| Expansion Rate | 17% | 5-10% | ✅ Above average |

### Section 4: Revenue Quality

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Top Customer % | 21% | &lt;20% | ⚠️ Concentration risk |
| Recurring Revenue % | 85% | >80% | ✅ Healthy |
| On-Time Payment % | 92% | >90% | ✅ Healthy |

<LinterFeedback
  title="MRR Dashboard Linter"
  persistKey="analytics-L6-linter"
  inputLabel="Paste your MRR waterfall summary (Starting MRR, New, Expansion, Contraction, Churn, Ending MRR, NRR)"
  rules={[
    { 
      id: "nrr", 
      label: "Healthy NRR", 
      description: "NRR should be ≥100%", 
      keywords: ["NRR", "100%", "110%", "120%"], 
      antiKeywords: ["90%", "80%", "70%"] 
    },
    { 
      id: "churn", 
      label: "Acceptable Churn", 
      description: "Churned MRR should be &lt;7% of starting MRR", 
      keywords: ["3%", "5%", "6%"], 
      antiKeywords: ["10%", "15%", "20%"] 
    },
    { 
      id: "expansion", 
      label: "Expansion Present", 
      description: "Expansion MRR should be >0", 
      keywords: ["Expansion", "+"], 
      antiKeywords: ["$0", "0%"] 
    }
  ]}
/>

---

## Action Items: Build Your MRR Waterfall This Week

<InteractiveChecklist 
  title="Your MRR Waterfall Action Items" 
  persistKey="analytics-L6-actions" 
  items={[
    "Export your customer list with last month's and this month's MRR from your CRM or billing system",
    "Categorize each customer as New, Retained, Expansion, Contraction, or Churned",
    "Calculate totals for each MRR component (New, Expansion, Contraction, Churn)",
    "Build your MRR waterfall summary table (Starting MRR → Net New MRR → Ending MRR)",
    "Calculate your NRR (are existing customers growing or shrinking?)",
    "Check concentration risk (is any customer >20% of revenue?)",
    "Identify your #1 revenue issue (low expansion? high churn? concentration risk?)",
    "Set one action item to address your #1 issue this month"
  ]} 
/>

---

## What's Next

You now have a complete view of your revenue health. You know where every dollar comes from and where it goes.

**Next lesson:** We'll tackle **channel attribution** — which acquisition source (outbound email, LinkedIn, content, referrals) produces the most wins? You'll learn to calculate ROI per channel and kill the losers.

Your MRR waterfall tells you **if** you're growing. Channel attribution tells you **which channels** are driving that growth.

See you in Lesson 7.