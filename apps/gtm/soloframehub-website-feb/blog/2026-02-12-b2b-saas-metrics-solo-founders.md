---
title: "The Only 5 B2B SaaS Metrics Solo Founders Need"
slug: "b2b-saas-metrics-solo-founders"
description: "VCs track 47 metrics. Solo founders need five. Here are the exact B2B SaaS metrics that predict revenue when you're doing everything yourself."
author: "Mike Sullivan"
publishedAt: "2026-02-12"
updatedAt: "2026-02-12"
tags: ["B2B SaaS", "metrics", "solo founders", "revenue growth", "pipeline management"]
category: "strategy"
primaryKeyword: "B2B SaaS metrics for startups"
relatedBook: "chapter-14-metrics-systems"
relatedCourse: "Sales Pipeline Management"
image: null
readingTime: null
---

# The Only 5 B2B SaaS Metrics Solo Founders Need

There's a Sequoia Capital slide deck that recommends tracking 47 SaaS metrics. Forty-seven. That advice is built for companies with a data team, a RevOps lead, and a CFO who does nothing but stare at dashboards all day.

You are one person. You are building the product, running the marketing, closing the deals, and handling support. You do not need 47 metrics. You need five.

After 30 years in enterprise tech and closing $3.7M+ in deals, I can tell you exactly which five B2B SaaS metrics for startups actually drive revenue when you're operating solo. The rest is noise.

## The Vanity Metrics Trap

First, let's kill some sacred cows.

Followers, page views, email subscribers, social media impressions, podcast downloads -- these are not business metrics. They are vanity metrics. They feel good. They go up and to the right on a chart. And they tell you absolutely nothing about whether your business will survive the next quarter.

Here's the test: if a metric goes up by 20%, what specific action do you take? If a metric drops by 30%, what do you change? If you can't answer both questions in under ten seconds, stop tracking that metric. It's entertainment, not intelligence.

A founder I mentored last year had 14,000 email subscribers and was celebrating. Revenue? $1,800/month. Her conversion rate from subscriber to paying customer was 0.04%. She was optimizing a metric that had almost zero correlation with the number that kept the lights on.

Let's talk about the five numbers that actually matter.

## 1. Customer Acquisition Cost (CAC)

**What it is:** The total cost to acquire one new paying customer.

**How to calculate it:**

```
CAC = Total Sales & Marketing Spend / Number of New Customers Acquired
```

Here's where solo founders get this wrong: they forget to include their own time. If you spent 40 hours this month on sales and marketing activities, and your reasonable hourly rate is $150, that's $6,000 in labor cost. Add your ad spend, tool subscriptions, and any contractor costs. Divide by new customers.

**What "good" looks like:** Your CAC should be recoverable within 3 months of customer revenue. If you're charging $99/month and your CAC is $400, you're in trouble -- it takes over 4 months just to break even on acquisition before you've earned a single dollar of profit from that customer. If your CAC exceeds 3 months of revenue, your unit economics are broken and no amount of growth will fix it.

**Track it simply:**

```
=SUM(ad_spend, tool_costs, contractor_costs, hours_spent * hourly_rate) / new_customers
```

Update this monthly. That's it.

## 2. Pipeline Velocity

**What it is:** The speed at which revenue moves through your sales pipeline. This is the single most predictive metric in B2B SaaS. If you track nothing else, track this.

**How to calculate it:**

```
Pipeline Velocity = (Number of Opportunities x Average Deal Size x Win Rate) / Average Sales Cycle Length (days)
```

This gives you a daily revenue velocity number. Multiply by 30 for a monthly projection.

**Example:** You have 20 qualified opportunities, your average deal is $2,400/year ($200/month), your win rate is 25%, and your average sales cycle is 30 days.

```
Pipeline Velocity = (20 x $2,400 x 0.25) / 30 = $400/day = ~$12,000/month
```

**What "good" looks like:** The absolute number matters less than the trend. You want this number growing month over month. If it stalls, diagnose which input dropped -- are you generating fewer opportunities, has your deal size shrunk, is your win rate declining, or is your sales cycle getting longer? Each diagnosis points to a different fix.

**Track it simply:**

```
=(opportunities * avg_deal_size * win_rate) / avg_cycle_days
```

This is the metric we build an entire tracking system around in the Sales Pipeline Management course inside Customer Acquisition Academy. Pipeline velocity is the number that tells you whether you'll make rent three months from now.

## 3. Lead-to-Customer Conversion Rate (by Channel)

**What it is:** The percentage of leads that become paying customers, broken down by acquisition channel.

**How to calculate it:**

```
Conversion Rate = (New Customers from Channel / Total Leads from Channel) x 100
```

The "by channel" part is non-negotiable. Your blended conversion rate is useless. What you need to know is that LinkedIn outreach converts at 4.2%, cold email converts at 1.8%, and content marketing converts at 6.1%. That tells you where to double down and what to cut.

**What "good" looks like:** Any channel below 2% conversion for B2B SaaS needs to be either fixed within 30 days or killed. Your time is the scarcest resource you have. A channel converting at 0.8% is not "building awareness" -- it's burning hours you don't have.

For reference, solid B2B SaaS benchmarks by channel:
- Organic/content: 5-8%
- Referrals: 8-15%
- Outbound (cold email/LinkedIn): 2-5%
- Paid ads: 2-4%

**Track it simply:** One spreadsheet tab per channel. Two columns: leads in, customers out. Calculate the ratio monthly. No fancy attribution software needed.

```
=COUNTIF(customers_channel, "linkedin") / COUNTIF(leads_channel, "linkedin") * 100
```

## 4. Monthly Recurring Revenue (MRR) + Growth Rate

**What it is:** Your predictable monthly revenue from subscriptions, and the rate at which it's growing.

**How to calculate it:**

```
MRR = Sum of all active monthly subscription values
MRR Growth Rate = ((Current Month MRR - Previous Month MRR) / Previous Month MRR) x 100
```

Break MRR into components for clarity:
- **New MRR:** Revenue from brand-new customers
- **Expansion MRR:** Upgrades and add-ons from existing customers
- **Churned MRR:** Revenue lost from cancellations
- **Net New MRR:** New + Expansion - Churned

**What "good" looks like:** 10% month-over-month growth is the bar for early-stage B2B SaaS. That compounds to 3.1x annual growth. Below 5% month-over-month, and you need to fundamentally rethink your acquisition or retention strategy. Above 15%, you're in strong territory -- focus on not breaking what's working.

**Track it simply:**

```
MRR Growth = (current_mrr - previous_mrr) / previous_mrr * 100
```

One row per month. Watch the trajectory, not just the number. $8,000 MRR growing at 12% month-over-month is a better business than $15,000 MRR growing at 2%.

## 5. Net Revenue Retention (NRR)

**What it is:** The percentage of revenue retained from your existing customer base over a period, including expansions, contractions, and churn.

**How to calculate it:**

```
NRR = ((Beginning MRR + Expansion MRR - Churned MRR - Contraction MRR) / Beginning MRR) x 100
```

**What "good" looks like:** Above 100% means your existing customers are generating more revenue over time than you're losing to churn. You grow even if you stop acquiring new customers entirely. For solo-founded B2B SaaS, aim for 95%+ and work toward breaking 100%.

The best SaaS companies in the world run 120-140% NRR. You won't hit that immediately, but understanding this metric early shapes how you build your product and pricing.

**Track it simply:**

```
=((start_mrr + expansion - churn - contraction) / start_mrr) * 100
```

If NRR is below 90%, stop all acquisition efforts and fix retention. You're pouring water into a leaking bucket.

## The Monday Ritual: 15 Minutes, 5 Numbers

Every Monday morning, before you open email, before you check Slack, before you write a single line of code, spend 15 minutes reviewing these five numbers.

Open your tracking spreadsheet. Update last week's data. Look at the trend lines. Ask yourself:

1. Is my CAC sustainable?
2. Is pipeline velocity increasing or decreasing?
3. Which channels are converting and which need to be cut?
4. Is MRR growth rate above 10%?
5. Is NRR above 95%?

Write down one action item based on what you see. Just one. Then close the spreadsheet and go execute.

This entire process takes less time than reading your average SaaS thought leadership newsletter. And it produces infinitely more actionable insight.

## What NOT to Track

Stop tracking these unless they're directly tied to one of the five metrics above:

- **Website traffic** -- unless you can tie it to lead generation conversion
- **Social media followers** -- unless you can prove they become pipeline
- **Email open rates** -- unless you're A/B testing subject lines tied to conversion
- **Feature usage metrics** -- unless you're correlating them to NRR
- **NPS scores** -- unless you're using detractor feedback to reduce churn

None of these are inherently bad metrics. They're bad metrics for a solo founder with 24 hours in a day and a business to run.

## The Meta-Metric

There's one rule that governs all of this: **if you can't explain what specific action you'd take if a metric moves up or down, stop tracking it.**

Every number you look at should have a decision attached to it. CAC too high? Cut your worst-performing channel. Pipeline velocity dropping? Increase outbound activity or tighten qualification criteria. Conversion rate falling on a channel? Fix the messaging or kill the channel. MRR growth stalling? Diagnose whether it's an acquisition problem or a churn problem. NRR below target? Interview churned customers this week.

Metrics without decisions are just numbers. Numbers without decisions are just decoration.

I cover the complete system for building and automating these tracking workflows in *The Solo Founder's Customer Acquisition Playbook* (Chapter 14). But you don't need a system to start. You need a spreadsheet with five columns and 15 minutes every Monday.

Start this week. Track the five. Ignore the rest. Your business will tell you what's working and what's not -- if you're measuring the right things.
