---
title: "CAC, LTV, and Payback Period for Bootstrapped Founders"
duration: "55 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 5
---

## The $40K Mistake

Meet Jordan. Six months into their SaaS journey, they're celebrating 50 customers. The dashboard shows green everywhere: MRR climbing, conversion rates solid, pipeline full.

Then their accountant asks: "How much did each customer cost to acquire?"

Jordan does the math. Tools: $200/month. Ads: $500/month. Their own time (80 hours/month at $100/hour): $8,000/month. Total: $8,700/month for 8 new customers.

**CAC: $1,087 per customer.**

Average customer pays $49/month and churns after 11 months.

**LTV: $539.**

Jordan had been losing $548 on every customer for six months. The "growth" was a $40,000 hole disguised as success.

This lesson teaches you the three numbers that prevent this disaster: **Customer Acquisition Cost (CAC), Lifetime Value (LTV), and Payback Period**. You'll build a calculator that shows whether your acquisition actually works — before you burn through your runway.

---

## Section 1: Customer Acquisition Cost (The Real Number)

Most founders calculate CAC wrong. They count tool costs and ad spend, but forget the biggest expense: **their time**.

### The Full CAC Formula

<InsightCard icon="💰" title="True CAC Includes Everything">
CAC = (Tool Costs + Ad Spend + Your Time × Hourly Rate) / New Customers Acquired
</InsightCard>

**Example:**
- Tools (CRM, enrichment, email): $200/month
- LinkedIn ads: $300/month
- Your time: 60 hours/month at $100/hour = $6,000/month
- New customers: 5

**CAC = ($200 + $300 + $6,000) / 5 = $1,300 per customer**

That "free" outbound channel? It cost you $6,000 in time.

<FlipCard 
  front="Why does time matter if I'm not paying myself?" 
  back="Because opportunity cost is real. Those 60 hours could have been spent building product, serving customers, or working a contract that pays actual money. Time has value even if cash doesn't leave your account." 
/>

### Time-Adjusted CAC by Channel

Different channels have wildly different time costs:

<ExampleCard label="Channel Time Reality Check">
**Outbound Email (Clay + Smartlead):**
- Setup: 8 hours
- Weekly maintenance: 3 hours
- Monthly time cost: 20 hours × $100 = $2,000
- Tool cost: $150
- Total monthly cost: $2,150

**LinkedIn Content:**
- Writing posts: 10 hours/month
- Engagement: 15 hours/month
- Monthly time cost: 25 hours × $100 = $2,500
- Tool cost: $0
- Total monthly cost: $2,500

**Paid Ads:**
- Setup + optimization: 5 hours/month
- Monthly time cost: 5 hours × $100 = $500
- Ad spend: $1,000
- Total monthly cost: $1,500
</ExampleCard>

The "free" LinkedIn channel costs more than paid ads when you count your time.

<RangeSlider 
  label="How many hours per week do you spend on acquisition?" 
  min={0} 
  max={40} 
  lowLabel="0 hours" 
  highLabel="40+ hours" 
  persistKey="analytics-L5-acq-hours" 
/>

### Your CAC Calculation Exercise

<TemplateBuilder
  title="Calculate Your True CAC"
  persistKey="analytics-L5-cac-calc"
  sections={[
    {
      id: "tools",
      title: "Tool Costs (Monthly)",
      fields: [
        { id: "crm", label: "CRM", placeholder: "e.g., $50", type: "text" },
        { id: "enrichment", label: "Enrichment (Clay/Apollo)", placeholder: "e.g., $100", type: "text" },
        { id: "email", label: "Email automation", placeholder: "e.g., $50", type: "text" },
        { id: "other", label: "Other tools", placeholder: "e.g., $50", type: "text" }
      ]
    },
    {
      id: "paid",
      title: "Paid Spend (Monthly)",
      fields: [
        { id: "ads", label: "Ads (LinkedIn, Google, etc.)", placeholder: "e.g., $500", type: "text" },
        { id: "sponsorships", label: "Sponsorships/communities", placeholder: "e.g., $200", type: "text" }
      ]
    },
    {
      id: "time",
      title: "Your Time",
      fields: [
        { id: "hours", label: "Hours per month on acquisition", placeholder: "e.g., 60", type: "text" },
        { id: "rate", label: "Your effective hourly rate", placeholder: "e.g., $100", type: "text" }
      ]
    },
    {
      id: "customers",
      title: "Results",
      fields: [
        { id: "new", label: "New customers last month", placeholder: "e.g., 5", type: "text" }
      ]
    }
  ]}
/>

Once you fill this out, calculate:
- **Total Monthly Cost** = Tools + Paid + (Hours × Rate)
- **CAC** = Total Monthly Cost / New Customers

<InsightCard icon="🎯" title="Bootstrapped Founder Reality">
If your CAC is above $500 and your product is under $100/month, you're in trouble. You need either higher prices, lower costs, or better conversion rates.
</InsightCard>

---

## Section 2: Lifetime Value (How Much They're Actually Worth)

LTV is the total revenue you'll earn from a customer over their entire relationship with you.

### The LTV Formula (For Subscriptions)

<InsightCard icon="📊" title="Simple LTV Formula">
LTV = Average Revenue Per User (ARPU) / Monthly Churn Rate
</InsightCard>

**Example:**
- ARPU: $99/month
- Monthly churn: 5% (0.05)

**LTV = $99 / 0.05 = $1,980**

This customer will pay you roughly $1,980 before they cancel.

<FlipCard 
  front="What if I don't have churn data yet?" 
  back="Use industry benchmarks: SMB SaaS averages 3-7% monthly churn. Start with 5% and adjust as you get real data. For services/coaching, estimate average customer lifespan (e.g., 12 months) and multiply by monthly revenue." 
/>

### LTV for Non-Subscription Models

<SlideNavigation>
<Slide title="Project-Based Services">
**LTV = Average Project Value × Repeat Purchase Rate**

Example:
- Average project: $5,000
- 40% of clients return for a second project
- 20% return for a third

LTV = $5,000 + ($5,000 × 0.40) + ($5,000 × 0.20) = $8,000
</Slide>

<Slide title="Coaching/Consulting">
**LTV = Monthly Retainer × Average Retention (Months)**

Example:
- Monthly retainer: $2,000
- Average client stays 8 months

LTV = $2,000 × 8 = $16,000
</Slide>

<Slide title="One-Time Products">
**LTV = Average Order Value × (1 + Repeat Purchase Rate)**

Example:
- Average order: $200
- 30% buy again within a year

LTV = $200 × (1 + 0.30) = $260
</Slide>
</SlideNavigation>

### Churn Rate Benchmarks

<ExampleCard label="What's Normal Churn?">
**SMB SaaS (under $100/month):**
- Below average: 7%+ monthly (57%+ annual)
- Average: 3-7% monthly (31-57% annual)
- Good: 2-3% monthly (22-31% annual)
- Excellent: &lt;2% monthly (&lt;22% annual)

**Mid-Market SaaS ($100-500/month):**
- Average: 2-5% monthly
- Good: 1-2% monthly

**Enterprise SaaS ($500+/month):**
- Average: 1-3% monthly
- Good: &lt;1% monthly

**Services/Coaching:**
- Average retention: 6-12 months
- Good retention: 12-24 months
</ExampleCard>

<RangeSlider 
  label="What's your current monthly churn rate?" 
  min={0} 
  max={15} 
  lowLabel="0%" 
  highLabel="15%+" 
  persistKey="analytics-L5-churn-rate" 
/>

### Your LTV Calculation

<TemplateBuilder
  title="Calculate Your LTV"
  persistKey="analytics-L5-ltv-calc"
  sections={[
    {
      id: "subscription",
      title: "For Subscription/SaaS",
      fields: [
        { id: "arpu", label: "Average Revenue Per User (monthly)", placeholder: "e.g., $99", type: "text" },
        { id: "churn", label: "Monthly churn rate (%)", placeholder: "e.g., 5", type: "text" }
      ]
    },
    {
      id: "services",
      title: "For Services/Coaching",
      fields: [
        { id: "monthly", label: "Average monthly revenue per client", placeholder: "e.g., $2,000", type: "text" },
        { id: "months", label: "Average retention (months)", placeholder: "e.g., 8", type: "text" }
      ]
    },
    {
      id: "project",
      title: "For Project-Based",
      fields: [
        { id: "project-value", label: "Average project value", placeholder: "e.g., $5,000", type: "text" },
        { id: "repeat", label: "Repeat purchase rate (%)", placeholder: "e.g., 40", type: "text" }
      ]
    }
  ]}
/>

**Calculate:**
- **Subscription LTV** = ARPU / (Churn Rate / 100)
- **Services LTV** = Monthly Revenue × Months
- **Project LTV** = Project Value × (1 + Repeat Rate / 100)

---

## Section 3: The LTV:CAC Ratio (The Health Check)

The ratio of LTV to CAC tells you if your business model works.

<InsightCard icon="⚖️" title="The Golden Ratio">
**Healthy SaaS: LTV:CAC of 3:1 or higher**

For every $1 you spend acquiring a customer, you should earn at least $3 back.
</InsightCard>

### What Different Ratios Mean

<ClassifyExercise
  title="Classify These LTV:CAC Scenarios"
  persistKey="analytics-L5-ratio-classify"
  categories={[
    { id: "dying", label: "Business is Dying", color: "#ef4444" },
    { id: "struggling", label: "Struggling", color: "#f59e0b" },
    { id: "healthy", label: "Healthy", color: "#10b981" },
    { id: "excellent", label: "Excellent", color: "#3b82f6" }
  ]}
  items={[
    { 
      id: "1", 
      content: "LTV: $500, CAC: $600 (Ratio: 0.83:1)", 
      correctCategory: "dying",
      explanation: "You're losing money on every customer. This is unsustainable." 
    },
    { 
      id: "2", 
      content: "LTV: $1,200, CAC: $1,000 (Ratio: 1.2:1)", 
      correctCategory: "struggling",
      explanation: "Barely profitable. No room for error or growth investment." 
    },
    { 
      id: "3", 
      content: "LTV: $3,000, CAC: $900 (Ratio: 3.3:1)", 
      correctCategory: "healthy",
      explanation: "Solid unit economics. Room to invest in growth." 
    },
    { 
      id: "4", 
      content: "LTV: $5,000, CAC: $800 (Ratio: 6.25:1)", 
      correctCategory: "excellent",
      explanation: "Exceptional. You can afford to scale aggressively." 
    },
    { 
      id: "5", 
      content: "LTV: $2,400, CAC: $1,200 (Ratio: 2:1)", 
      correctCategory: "struggling",
      explanation: "Below the 3:1 threshold. Need to improve conversion or reduce costs." 
    }
  ]}
/>

### The Ratio Diagnostic

<FlipCard 
  front="LTV:CAC below 3:1 — What's broken?" 
  back="Three possible problems: (1) CAC too high (poor targeting, expensive channels, low conversion), (2) LTV too low (high churn, low ARPU, no expansion), or (3) Both. Fix the easier one first — usually CAC." 
/>

<StrategyDuel
  title="Fix LTV or Fix CAC?"
  persistKey="analytics-L5-fix-strategy"
  scenario="Your LTV:CAC is 2:1. You have 3 months of runway. What do you prioritize?"
  strategyA={{ 
    name: "Reduce CAC", 
    description: "Improve targeting, kill expensive channels, optimize conversion", 
    pros: ["Faster results (weeks)", "Direct control", "Immediate cash flow impact"], 
    cons: ["May reduce volume", "Requires discipline to kill channels"] 
  }}
  strategyB={{ 
    name: "Increase LTV", 
    description: "Reduce churn, add upsells, increase prices", 
    pros: ["Compounds over time", "Higher long-term value"], 
    cons: ["Takes 3-6 months to see impact", "Risky with short runway"] 
  }}
  expertVerdict="With 3 months of runway, fix CAC first. You need immediate cash flow improvement. Increase LTV in parallel, but don't bet survival on it."
/>

### Benchmark Comparison

<ExampleCard label="LTV:CAC Benchmarks by Stage">
**Bootstrapped / Pre-Revenue:**
- Target: 5:1 or higher
- Why: No margin for error, need profitability immediately

**Small Raise ($100K-500K):**
- Target: 3:1 minimum
- Why: Limited runway, need sustainable growth

**Seed ($500K-2M):**
- Target: 3:1, can tolerate 2:1 temporarily
- Why: Some room to invest in growth

**Series A+ ($2M+):**
- Target: 3:1 long-term, can tolerate 1.5:1 during blitz-scaling
- Why: Prioritizing growth over profitability
</ExampleCard>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Your instinct is to optimize the product to reduce churn (increase LTV). That's good long-term, but if your LTV:CAC is broken, fix CAC first. Better targeting and conversion are faster wins.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches/Consultants">
Your LTV is naturally high (long client relationships). Your CAC challenge is time-intensive channels (networking, content). Track time-adjusted CAC ruthlessly — your time is your scarcest resource.
</ContextualNote>

---

## Section 4: Payback Period (When Do You Break Even?)

Payback Period is the number of months it takes to recover your CAC from a customer's revenue.

<InsightCard icon="⏱️" title="Payback Period Formula">
Payback Period (Months) = CAC / Monthly Revenue Per Customer
</InsightCard>

**Example:**
- CAC: $900
- Monthly revenue per customer: $99

**Payback = $900 / $99 = 9.1 months**

You'll recover your acquisition cost after 9 months of subscription payments.

### Why Payback Period Matters More Than LTV:CAC for Bootstrapped Founders

<FlipCard 
  front="Why does payback matter if LTV:CAC is healthy?" 
  back="Because cash flow. A 3:1 LTV:CAC with 18-month payback means you're profitable eventually, but you'll run out of cash before you get there. Bootstrapped founders need fast payback to survive." 
/>

### Payback Period Targets

<SlideNavigation>
<Slide title="Bootstrapped / Pre-Revenue">
**Target: 1-3 months**

You have no runway. Every dollar spent on acquisition must come back within a quarter.

**Implications:**
- High-touch sales won't work (too slow)
- Self-serve or low-touch only
- Aggressive pricing (high ARPU) or ultra-low CAC
</Slide>

<Slide title="Small Raise ($100K-500K)">
**Target: 3-6 months**

You have limited runway. Payback must happen before you run out of cash.

**Implications:**
- Can afford some sales-assisted deals
- Need predictable, repeatable acquisition
- Monthly burn must be covered by payback within 6 months
</Slide>

<Slide title="Seed ($500K-2M)">
**Target: 6-9 months**

You have 12-18 months of runway. Can invest in growth.

**Implications:**
- Can build outbound teams
- Can test channels with longer payback
- Still need path to profitability
</Slide>

<Slide title="Series A+ ($2M+)">
**Target: 9-18 months**

You're optimizing for growth, not profitability.

**Implications:**
- Can afford enterprise sales cycles
- Can invest heavily in brand/content
- Payback is secondary to growth rate
</Slide>
</SlideNavigation>

<RangeSlider 
  label="How many months of runway do you have?" 
  min={0} 
  max={24} 
  lowLabel="0 months" 
  highLabel="24+ months" 
  persistKey="analytics-L5-runway" 
/>

### The Payback-Runway Mismatch

<ExampleCard label="Case Study: The 12-Month Payback Trap">
**Founder:** Alex, B2B SaaS, $200K seed round

**Numbers:**
- CAC: $1,200
- ARPU: $99/month
- Payback: 12 months
- Monthly burn: $15,000
- Runway: 13 months

**The Problem:**
Alex acquires 10 customers/month. That's $12,000 in CAC spend. After 12 months:
- Total CAC spent: $144,000
- Revenue collected: $59,400 (10 customers × $99 × 6 average months)
- Cash position: $200,000 - $180,000 burn - $144,000 CAC + $59,400 revenue = **-$64,600**

Alex ran out of money before payback kicked in.

**The Fix:**
Reduce CAC to $400 (3-month payback) or increase ARPU to $300 (4-month payback). Either change makes the unit economics work within the runway.
</ExampleCard>

### Your Payback Calculation

<ScenarioSimulator
  title="Payback Period Calculator"
  persistKey="analytics-L5-payback-sim"
  levers={[
    { id: "cac", label: "CAC ($)", min: 100, max: 5000, step: 100, defaultValue: 1000 },
    { id: "arpu", label: "Monthly ARPU ($)", min: 10, max: 500, step: 10, defaultValue: 99 },
    { id: "runway", label: "Runway (months)", min: 0, max: 24, step: 1, defaultValue: 12 }
  ]}
  outputs={[
    { id: "payback", label: "Payback Period", formula: "cac / arpu", unit: " months", precision: 1 },
    { id: "safe", label: "Safe for your runway?", formula: "(cac / arpu) < (runway * 0.5) ? 'Yes' : 'No'", unit: "", precision: 0 }
  ]}
  insight="Your payback is `{payback}` months. With `{runway}` months of runway, you need payback under {runway * 0.5} months to be safe. Status: `{safe}`"
/>

<InsightCard icon="🚨" title="The 50% Rule">
Your payback period should be less than **50% of your runway**. If you have 12 months of runway, you need payback under 6 months. This gives you buffer for mistakes and growth.
</InsightCard>

---

## Section 5: CAC by Channel (Where to Double Down)

Not all channels have the same CAC. Track CAC separately for each acquisition source.

### Channel CAC Calculation

<InsightCard icon="📊" title="Channel CAC Formula">
Channel CAC = (Channel Spend + Time on Channel × Hourly Rate) / New Customers from Channel
</InsightCard>

**Example: Outbound Email**
- Tool cost: $150/month
- Time: 20 hours/month × $100/hour = $2,000
- New customers: 3

**Channel CAC = ($150 + $2,000) / 3 = $717**

**Example: LinkedIn Content**
- Tool cost: $0
- Time: 25 hours/month × $100/hour = $2,500
- New customers: 2

**Channel CAC = $2,500 / 2 = $1,250**

Even though LinkedIn is "free," it has higher CAC because of time investment.

### Typical Channel CAC Ranges

<ExampleCard label="Channel CAC Benchmarks (SMB SaaS)">
**Referrals:**
- CAC: $50-300
- Why: Low effort, high trust
- Limitation: Hard to scale

**Outbound Email (Well-Targeted):**
- CAC: $300-800
- Why: Scalable, predictable
- Limitation: Deliverability risk

**LinkedIn (Organic):**
- CAC: $500-1,500
- Why: High time cost
- Limitation: Slow to scale

**Content/Inbound:**
- CAC: $200-600 (after 6-12 months)
- Why: Compounds over time
- Limitation: Long ramp-up

**Paid Ads (LinkedIn, Google):**
- CAC: $800-2,500
- Why: Fast, scalable
- Limitation: Expensive, requires budget

**Communities/Partnerships:**
- CAC: $300-1,000
- Why: High trust, targeted
- Limitation: Relationship-dependent
</ExampleCard>

<ClassifyExercise
  title="Which Channel Should You Kill?"
  persistKey="analytics-L5-channel-kill"
  categories={[
    { id: "keep", label: "Keep & Scale", color: "#10b981" },
    { id: "optimize", label: "Optimize First", color: "#f59e0b" },
    { id: "kill", label: "Kill Immediately", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Referrals: CAC $200, LTV $3,000, 2 customers/month", 
      correctCategory: "keep",
      explanation: "Excellent LTV:CAC (15:1). Build a referral program to scale this." 
    },
    { 
      id: "2", 
      content: "Outbound: CAC $600, LTV $1,980, 5 customers/month", 
      correctCategory: "keep",
      explanation: "Healthy LTV:CAC (3.3:1) and scalable. Keep going." 
    },
    { 
      id: "3", 
      content: "LinkedIn: CAC $1,200, LTV $1,980, 2 customers/month", 
      correctCategory: "optimize",
      explanation: "LTV:CAC is 1.65:1 (below 3:1). Either reduce time or improve conversion before scaling." 
    },
    { 
      id: "4", 
      content: "Paid Ads: CAC $2,500, LTV $1,980, 3 customers/month", 
      correctCategory: "kill",
      explanation: "You're losing $520 per customer. Kill this immediately unless you can 3x conversion." 
    },
    { 
      id: "5", 
      content: "Content: CAC $800, LTV $1,980, 1 customer/month (started 2 months ago)", 
      correctCategory: "optimize",
      explanation: "Content takes 6-12 months to ramp. Give it time, but track monthly improvement." 
    }
  ]}
/>

### Your Channel CAC Analysis

<TemplateBuilder
  title="Calculate CAC by Channel"
  persistKey="analytics-L5-channel-cac"
  sections={[
    {
      id: "channel1",
      title: "Channel 1",
      fields: [
        { id: "name1", label: "Channel name", placeholder: "e.g., Outbound Email", type: "text" },
        { id: "spend1", label: "Monthly spend ($)", placeholder: "e.g., 150", type: "text" },
        { id: "hours1", label: "Hours per month", placeholder: "e.g., 20", type: "text" },
        { id: "rate1", label: "Hourly rate ($)", placeholder: "e.g., 100", type: "text" },
        { id: "customers1", label: "New customers last month", placeholder: "e.g., 3", type: "text" }
      ]
    },
    {
      id: "channel2",
      title: "Channel 2",
      fields: [
        { id: "name2", label: "Channel name", placeholder: "e.g., LinkedIn", type: "text" },
        { id: "spend2", label: "Monthly spend ($)", placeholder: "e.g., 0", type: "text" },
        { id: "hours2", label: "Hours per month", placeholder: "e.g., 25", type: "text" },
        { id: "rate2", label: "Hourly rate ($)", placeholder: "e.g., 100", type: "text" },
        { id: "customers2", label: "New customers last month", placeholder: "e.g., 2", type: "text" }
      ]
    },
    {
      id: "channel3",
      title: "Channel 3",
      fields: [
        { id: "name3", label: "Channel name", placeholder: "e.g., Referrals", type: "text" },
        { id: "spend3", label: "Monthly spend ($)", placeholder: "e.g., 0", type: "text" },
        { id: "hours3", label: "Hours per month", placeholder: "e.g., 5", type: "text" },
        { id: "rate3", label: "Hourly rate ($)", placeholder: "e.g., 100", type: "text" },
        { id: "customers3", label: "New customers last month", placeholder: "e.g., 2", type: "text" }
      ]
    }
  ]}
/>

**For each channel, calculate:**
- **Total Cost** = Spend + (Hours × Rate)
- **Channel CAC** = Total Cost / Customers
- **LTV:CAC Ratio** = Your LTV / Channel CAC

**Decision rules:**
- **LTV:CAC > 5:1** → Scale aggressively
- **LTV:CAC 3-5:1** → Keep going, optimize
- **LTV:CAC 1.5-3:1** → Optimize before scaling
- **LTV:CAC < 1.5:1** → Kill or fix immediately

---

## Section 6: The Unit Economics Dashboard

Now you build the dashboard that ties it all together.

### The 5-Metric Unit Economics View

<InsightCard icon="📊" title="Your Unit Economics Dashboard">
Track these 5 numbers monthly:

1. **CAC** (overall and by channel)
2. **LTV** (overall and by cohort)
3. **LTV:CAC Ratio**
4. **Payback Period**
5. **Gross Margin** (revenue - COGS, as %)
</InsightCard>

### Building Your Dashboard

<TemplateBuilder
  title="Unit Economics Dashboard Template"
  persistKey="analytics-L5-dashboard"
  sections={[
    {
      id: "inputs",
      title: "Monthly Inputs",
      fields: [
        { id: "new-customers", label: "New customers this month", placeholder: "e.g., 8", type: "text" },
        { id: "total-acq-cost", label: "Total acquisition cost ($)", placeholder: "e.g., 6,500", type: "text" },
        { id: "arpu", label: "Average revenue per user ($)", placeholder: "e.g., 99", type: "text" },
        { id: "churn", label: "Monthly churn rate (%)", placeholder: "e.g., 5", type: "text" },
        { id: "cogs", label: "Cost of goods sold (% of revenue)", placeholder: "e.g., 20", type: "text" }
      ]
    },
    {
      id: "calculated",
      title: "Calculated Metrics",
      fields: [
        { id: "cac-result", label: "CAC", placeholder: "Auto-calculated", type: "text", disabled: true },
        { id: "ltv-result", label: "LTV", placeholder: "Auto-calculated", type: "text", disabled: true },
        { id: "ratio-result", label: "LTV:CAC Ratio", placeholder: "Auto-calculated", type: "text", disabled: true },
        { id: "payback-result", label: "Payback Period (months)", placeholder: "Auto-calculated", type: "text", disabled: true },
        { id: "margin-result", label: "Gross Margin (%)", placeholder: "Auto-calculated", type: "text", disabled: true }
      ]
    }
  ]}
/>

**Formulas:**
- CAC = Total Acquisition Cost / New Customers
- LTV = ARPU / (Churn Rate / 100)
- LTV:CAC = LTV / CAC
- Payback = CAC / ARPU
- Gross Margin = 100 - COGS%

### Dashboard Health Checks

<ComparisonBuilder
  title="How Do Your Numbers Compare?"
  persistKey="analytics-L5-benchmark-compare"
  prompt="Enter your calculated metrics"
  expertExample="CAC: $600 | LTV: $1,980 | LTV:CAC: 3.3:1 | Payback: 6 months | Gross Margin: 80%"
  criteria={[
    "LTV:CAC ratio is 3:1 or higher",
    "Payback period is under 50% of runway",
    "Gross margin is above 70%"
  ]}
/>

<PredictionGate
  question="A founder has CAC $800, LTV $2,400, and 6 months of runway. What happens if they don't change anything?"
  persistKey="analytics-L5-prediction"
  type="choice"
  choices={[
    { id: "a", text: "They'll be profitable in 6 months" },
    { id: "b", text: "They'll run out of money" },
    { id: "c", text: "They'll break even" }
  ]}
  correctId="b"
>
**They'll run out of money.**

Payback period is 8 months ($800 / $100 ARPU). With only 6 months of runway, they'll burn through cash before customers pay back their acquisition cost.

**The fix:** Reduce CAC to $300 (3-month payback) or increase ARPU to $267 (3-month payback).
</PredictionGate>

---

## Section 7: Improving Your Unit Economics

You've calculated your numbers. Now what?

### The Improvement Levers

<SlideNavigation>
<Slide title="Lever 1: Reduce CAC">
**Tactics:**
- Kill channels with CAC > LTV
- Improve targeting (tighter ICP = higher conversion)
- Automate manual processes (reduce time cost)
- Improve conversion rates at each funnel stage
- Negotiate better tool pricing

**Impact:** 10% CAC reduction = 10% improvement in LTV:CAC and payback
</Slide>

<Slide title="Lever 2: Increase LTV">
**Tactics:**
- Reduce churn (better onboarding, customer success)
- Add upsells and cross-sells (expansion revenue)
- Increase prices (higher ARPU)
- Improve product value (stickiness)
- Annual contracts (upfront cash, lower churn)

**Impact:** 10% LTV increase = 10% improvement in LTV:CAC
</Slide>

<Slide title="Lever 3: Improve Gross Margin">
**Tactics:**
- Reduce COGS (cheaper infrastructure, better vendor deals)
- Increase prices (more revenue per unit cost)
- Automate delivery (reduce labor cost)
- Optimize infrastructure (reduce cloud costs)

**Impact:** Higher margin = more cash to reinvest in acquisition
</Slide>

<Slide title="Lever 4: Accelerate Payback">
**Tactics:**
- Annual upfront payment (12 months cash immediately)
- Quarterly payment (3 months cash upfront)
- Higher ARPU (faster payback per month)
- Lower CAC (less to pay back)

**Impact:** Faster payback = better cash flow = more growth capacity
</Slide>
</SlideNavigation>

### The Compound Effect

<ScenarioSimulator
  title="Unit Economics Improvement Simulator"
  persistKey="analytics-L5-improvement-sim"
  levers={[
    { id: "cac-improve", label: "CAC Reduction (%)", min: 0, max: 50, step: 5, defaultValue: 0 },
    { id: "ltv-improve", label: "LTV Increase (%)", min: 0, max: 50, step: 5, defaultValue: 0 },
    { id: "base-cac", label: "Starting CAC ($)", min: 100, max: 3000, step: 100, defaultValue: 1000 },
    { id: "base-ltv", label: "Starting LTV ($)", min: 500, max: 10000, step: 100, defaultValue: 2000 }
  ]}
  outputs={[
    { id: "new-cac", label: "New CAC", formula: "base-cac * (1 - cac-improve / 100)", unit: "$", precision: 0 },
    { id: "new-ltv", label: "New LTV", formula: "base-ltv * (1 + ltv-improve / 100)", unit: "$", precision: 0 },
    { id: "new-ratio", label: "New LTV:CAC", formula: "(base-ltv * (1 + ltv-improve / 100)) / (base-cac * (1 - cac-improve / 100))", unit: ":1", precision: 2 }
  ]}
  insight="A {cac-improve}% CAC reduction + {ltv-improve}% LTV increase improves your LTV:CAC from {base-ltv / base-cac}:1 to {new-ratio}:1. Small improvements compound."
/>

<InsightCard icon="🎯" title="The 10-10-10 Rule">
Improving CAC by 10%, LTV by 10%, and conversion by 10% doesn't give you 30% better unit economics — it gives you **33% better** because the effects multiply.
</InsightCard>

### Your 90-Day Improvement Plan

<InteractiveChecklist 
  title="Unit Economics Improvement Sprint" 
  persistKey="analytics-L5-improvement-plan" 
  items={[
    "Identify your #1 CAC bottleneck (highest-cost, lowest-ROI channel)",
    "Kill or pause that channel for 30 days",
    "Reallocate time/budget to your best-performing channel",
    "Implement one churn reduction tactic (better onboarding, check-in cadence, or feature education)",
    "Test a 10-20% price increase on new customers",
    "Add one upsell or expansion offer to existing customers",
    "Negotiate better pricing on your top 3 tool costs",
    "Automate one manual acquisition process (research, outreach, or follow-up)",
    "Track weekly: CAC, LTV, LTV:CAC, and payback period",
    "Review monthly: compare to last month, identify next bottleneck"
  ]} 
/>

---

## Summary: The Numbers That Matter

You now know the three metrics that determine whether your business survives:

1. **CAC (Customer Acquisition Cost)** — Include your time. Track by channel. Kill anything with CAC > LTV.

2. **LTV (Lifetime Value)** — Revenue per customer over their entire relationship. Increase it by reducing churn and adding expansion.

3. **Payback Period** — Months to recover CAC. Must be under 50% of your runway or you'll run out of cash.

**The health check:**
- LTV:CAC ≥ 3:1 (healthy)
- Payback ≤ 50% of runway (safe)
- Gross margin ≥ 70% (sustainable)

**Next lesson:** You'll track MRR segmented by new, expansion, and churned revenue — the waterfall that shows exactly where your growth comes from.

<InteractiveChecklist 
  title="Your Action Items" 
  persistKey="analytics-L5-actions" 
  items={[
    "Calculate your true CAC (including time cost) for last month",
    "Calculate your LTV using your actual churn rate or industry benchmark",
    "Calculate your LTV:CAC ratio — is it above 3:1?",
    "Calculate your payback period — is it under 50% of your runway?",
    "Calculate CAC separately for each acquisition channel",
    "Identify your best channel (lowest CAC, highest LTV:CAC) and your worst",
    "Build your Unit Economics Dashboard using the template",
    "Choose one improvement lever to focus on for the next 30 days",
    "Set a calendar reminder to review these metrics on the first Friday of every month"
  ]} 
/>