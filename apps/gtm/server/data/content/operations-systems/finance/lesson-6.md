---
title: "Sales Tax, VAT, and Compliance Basics"
duration: "45 min"
track: "Operations & Systems"
course: "Course 47: Sales Finance & Tax"
lesson: 6
---

## The Tax Problem You Didn't Know You Had

Most solo founders discover their sales tax problem one of two ways: they get a letter from a state tax authority, or they do their first real accounting review and realize they've been under-collecting for months.

Neither is pleasant. The first results in back taxes plus penalties (typically 5-25% of unpaid tax plus interest). The second requires an uncomfortable conversation with clients who already paid you — and now you're asking them to true up an amount they thought was settled.

The solution is not to become a tax expert. The solution is to understand when you have an obligation, and set up automation that handles it before you ever have to think about it.

<InsightCard icon="💰" title="The Prevention Math">
Non-compliance penalties: 5-25% of unpaid tax plus interest. Stripe Tax: $0.50/transaction. The math is not complicated. Set up automated tax handling before you need it, not after.
</InsightCard>

## US Sales Tax: Understanding Nexus

"Nexus" is the legal concept that determines when you have an obligation to collect sales tax in a state. If you have nexus in a state and you're selling taxable goods or services there, you must collect and remit sales tax.

<SlideNavigation>
<Slide title="Physical Nexus">

**What it is:** You have physical presence in a state — an office, employees, a warehouse, or even a home office where you regularly work on client business.

**The rule:** If you're physically located somewhere, you have nexus there. This is straightforward.

**For most solo founders:** You have physical nexus in your home state only. That's the starting point.

</Slide>

<Slide title="Economic Nexus — The Wayfair Rule">

In 2018, the Supreme Court ruling in South Dakota v. Wayfair changed everything. States can now require you to collect sales tax based on your economic activity in the state — even if you're not physically there.

**The typical threshold:** $100,000 in revenue OR 200 transactions with customers in that state within a 12-month period.

**Why this matters:** If you sell a $500/month SaaS product to 25 customers in Texas, you have 300 transactions per year. You've crossed the Texas economic nexus threshold. You must register and collect Texas sales tax.

**The good news:** Most early-stage solo founders only cross economic nexus thresholds in 1-3 states initially. As you grow, you cross more.

</Slide>

<Slide title="SaaS and Digital Product Tax Rules">

This is where it gets complicated: approximately 25 states tax SaaS and digital products; others exempt them entirely. Rules change frequently and vary dramatically.

**Examples:**
- Texas: SaaS is taxable (6.25% state rate + local)
- California: SaaS is NOT taxable (exempt)
- New York: SaaS is taxable for certain uses
- Florida: SaaS taxability depends on the type of software

You cannot reliably track this manually across 50 states. This is exactly what automated tools are built to solve.

</Slide>
</SlideNavigation>

## EU VAT: If You Sell to European Customers

If you sell digital products or SaaS to customers in the European Union — regardless of where you are based — you must collect VAT at the customer's local rate.

<FlipCard front="EU VAT Rate Range" back="17% (Luxembourg) to 27% (Hungary). The rate depends on the customer's country, not yours. A German customer pays 19% VAT. A Swedish customer pays 25% VAT. You collect the amount and remit it." />

<FlipCard front="The One-Stop Shop (OSS)" back="The EU's simplified filing system. Instead of registering in each EU country separately, you register for OSS in one EU member state and file one quarterly return covering all EU sales. If you're outside the EU, use the non-union OSS scheme." />

<FlipCard front="B2B vs B2C EU Sales" back="For B2B sales (business to business), the 'reverse charge' mechanism usually applies — the customer handles the VAT, not you. For B2C sales (to individual consumers), you collect and remit. This is why it matters whether your customers are businesses or individuals." />

<FlipCard front="Stripe Tax Handles This" back="$0.50/transaction. Stripe Tax knows the VAT rate for every EU country and calculates it automatically at checkout. You get tax-inclusive pricing or tax-exclusive with automatic addition. Files reports quarterly." />

## The Tool Decision: How to Handle Tax Compliance

You have three options:

<SlideNavigation>
<Slide title="Option 1: Stripe Tax ($0.50/transaction)">

**Best for:** SaaS and digital product founders using Stripe as their payment processor

**What it does:** Automatically calculates and collects the correct sales tax or VAT at checkout for US and 50+ countries. You don't touch it. You get a quarterly report for filing.

**Setup:** Go to Stripe Dashboard → Tax → Enable. Takes 5 minutes. Add your registered states (US) and enable automatic calculation.

**Filing:** Stripe doesn't file on your behalf — it calculates and collects. You (or your accountant) still file the returns with each state. But Stripe gives you clean reports that make filing straightforward.

**Cost at scale:** At $20,000/month in revenue, you might process 100-200 transactions. At $0.50 each, that's $50-100/month. Cheap for the compliance coverage.

</Slide>

<Slide title="Option 2: Paddle or Lemon Squeezy (Merchant of Record)">

**Best for:** Founders who want to completely outsource tax compliance

**What they do:** Paddle and Lemon Squeezy act as the "Merchant of Record" — legally, they are the seller of record for your product. They handle ALL tax obligations: calculation, collection, filing, remittance, in every jurisdiction.

**The tradeoff:** 5% + $0.50 per transaction (vs Stripe's 2.9% + $0.30). That's roughly double the processing cost.

**When it's worth it:** When your customers are globally distributed and the tax complexity of managing Stripe Tax across 30+ jurisdictions is more expensive than the premium Paddle/Lemon Squeezy charges.

**Many indie SaaS founders choose Paddle or Lemon Squeezy specifically for this reason.** The higher fee is the cost of never thinking about tax compliance again.

</Slide>

<Slide title="Option 3: TaxJar or DIY Tracking (US Only)">

**TaxJar:** $19/month (Starter). Calculates US sales tax, integrates with many platforms, and can auto-file returns in registered states (AutoFile feature).

**DIY:** For very small businesses or those with minimal multi-state exposure, you can track manually. This requires knowing which states have economic nexus thresholds you've crossed, registering in those states, and filing quarterly.

**Avalara:** Do NOT use this. It's enterprise-level pricing ($50-500+/month) for a complexity level you don't have. Overkill and overpriced for solo founders.

</Slide>
</SlideNavigation>

<DecisionTree
  title="Which Tax Tool Do I Need?"
  persistKey="finance-L6-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "Are you using Stripe as your payment processor?",
      choices: [
        { label: "Yes", nextNodeId: "stripe" },
        { label: "No — different processor or billing", nextNodeId: "nostripe" }
      ]
    },
    {
      id: "stripe",
      content: "Do you have customers in multiple US states or EU countries?",
      choices: [
        { label: "Yes — multiple states and/or EU", nextNodeId: "stripetax" },
        { label: "No — primarily one state, US only", nextNodeId: "simple" }
      ]
    },
    {
      id: "stripetax",
      content: "Enable Stripe Tax ($0.50/transaction). It handles US state tax and EU VAT automatically. For complex EU requirements or hands-off compliance, evaluate Paddle or Lemon Squeezy as an alternative.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "simple",
      content: "Start with Stripe Tax anyway — it's $0.50/transaction and handles the compliance automatically as you grow. Cheaper than thinking about it when you cross new state thresholds.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "nostripe",
      content: "Do you want complete tax compliance outsourced?",
      choices: [
        { label: "Yes — hands-off is worth the higher fee", nextNodeId: "paddle" },
        { label: "No — I'll manage it actively", nextNodeId: "taxjar" }
      ]
    },
    {
      id: "paddle",
      content: "Use Paddle or Lemon Squeezy as your Merchant of Record. They handle all tax calculation, collection, and remittance globally. Higher fees (5% + $0.50) but zero ongoing tax management.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "taxjar",
      content: "Use TaxJar ($19/mo) for US sales tax calculation and filing. For EU VAT, you'll need additional setup (VAT registration or a Merchant of Record for EU sales).",
      isTerminal: true,
      outcome: "neutral"
    }
  ]}
/>

## Revenue Recognition: The Basics

Revenue recognition determines when you report income — not just when you receive payment.

<SlideNavigation>
<Slide title="Cash vs Accrual Basis">

**Cash basis** (most solo founders): Report revenue when you receive payment. Simple. Most tax authorities allow this for small businesses.

**Accrual basis**: Report revenue when it's earned, regardless of payment. Required above certain revenue thresholds in some jurisdictions. Gives a more accurate picture of business health.

**Which to use:** Cash basis is almost always appropriate for solo founders under $5-10M in revenue. Ask your accountant if you're unsure.

</Slide>

<Slide title="Deferred Revenue for Prepaid Contracts">

If a client pays $12,000 upfront for a year of service, you haven't "earned" all $12,000 on the payment date. You earn 1/12 per month as you deliver the service.

**In accrual accounting:** $12,000 received goes to "Deferred Revenue" (a liability). You recognize $1,000/month as revenue.

**In cash accounting:** You report $12,000 as income in the month received.

**Why it matters:** If you're on accrual basis, large prepayments can distort your monthly P&L. If you're on cash basis, large prepayments look like spikes in taxable income.

**Practical implication:** Large annual prepayments received in December may create a significant tax event. Ask your accountant how to structure the timing.

</Slide>
</SlideNavigation>

## Monthly Record Keeping: Your 6-Step Process

Good tax compliance starts with good bookkeeping. One hour per month prevents 20 hours of pain at tax time.

<InteractiveChecklist
  title="Monthly Bookkeeping Checklist"
  persistKey="finance-L6-monthly"
  items={[
    "Reconcile bank accounts in QuickBooks Online or Wave (compare bank statement to accounting records)",
    "Categorize all expenses correctly: tools, contractors, advertising, travel, home office",
    "File all invoices — sent and received — in your Google Drive folder",
    "Record any personal expenses that were business-related (home office allocation, business phone, etc.)",
    "Verify Stripe/PayPal reports match your accounting records (spot discrepancies immediately)",
    "Back up all financial data (cloud sync is sufficient if enabled)"
  ]}
/>

<InsightCard icon="💰" title="Bookkeeping Tools">
QuickBooks Online Simple Start is $15/month and handles everything a solo founder needs: bank reconciliation, expense categorization, basic P&L and balance sheet reports, and invoice tracking. Wave is completely free and does the same core functions.

The right tool: whichever one you'll actually use consistently. Both integrate with Stripe and can import bank transactions automatically.
</InsightCard>

## The Annual Tax Timeline

<SlideNavigation>
<Slide title="US Estimated Taxes (Quarterly)">

If you're a US sole proprietor or single-member LLC, you owe estimated taxes quarterly. Miss them and you pay underpayment penalties.

**Quarterly due dates:**
- Q1 (Jan 1 - Mar 31): Due April 15
- Q2 (Apr 1 - May 31): Due June 15
- Q3 (Jun 1 - Aug 31): Due September 15
- Q4 (Sep 1 - Dec 31): Due January 15 (next year)

**Estimate:** Pay 100% of last year's tax liability (split across 4 quarters) and you're safe from underpayment penalties, regardless of your actual income this year.

</Slide>

<Slide title="Annual Tax Prep">

**Timeline:**
- **January:** Collect all 1099s (you'll receive 1099s from Stripe, PayPal, and any clients who paid you $600+)
- **February-March:** Work with your CPA to prepare your return
- **April 15:** Individual tax return due (or file an extension to October 15)

**Cost:** $500-1,500 for a CPA to prepare a solo business return. Worth every dollar — they'll find deductions you'd miss and ensure you're not overpaying.

**Key deductions for solo founders:** Home office (proportional), tools and software (100%), professional development (courses, books), business travel, health insurance premiums (self-employed deduction), retirement contributions (SEP-IRA up to 25% of net earnings).

</Slide>
</SlideNavigation>

## Build Your Tax Compliance Plan

<TemplateBuilder
  title="My Tax Compliance Setup"
  persistKey="finance-L6-template"
  sections={[
    {
      id: "tool",
      title: "My Tax Automation Tool",
      fields: [
        { id: "tool", label: "Tax calculation tool", placeholder: "e.g., Stripe Tax enabled ($0.50/transaction) / Paddle as MOR / TaxJar for US only", type: "text" },
        { id: "setup_status", label: "Setup status", placeholder: "e.g., Stripe Tax enabled — need to add registered states / Not set up yet — this week", type: "text" }
      ]
    },
    {
      id: "nexus",
      title: "My Tax Nexus Assessment",
      fields: [
        { id: "home_state", label: "My home state (physical nexus)", placeholder: "e.g., California — I have nexus here by default", type: "text" },
        { id: "other_states", label: "States where I may have economic nexus", placeholder: "e.g., Texas (30 customers) — possibly over threshold. Need to check.", type: "text" },
        { id: "eu_sales", label: "Do I sell to EU customers?", placeholder: "e.g., Yes — using Stripe Tax for EU VAT / No — US only", type: "text" }
      ]
    },
    {
      id: "bookkeeping",
      title: "My Bookkeeping System",
      fields: [
        { id: "tool_books", label: "Bookkeeping tool", placeholder: "e.g., Wave (free) / QuickBooks Simple Start ($15/mo)", type: "text" },
        { id: "review_day", label: "Monthly reconciliation day", placeholder: "e.g., First Saturday of every month — 1-2 hours", type: "text" },
        { id: "cpa", label: "My CPA for annual taxes", placeholder: "e.g., Jane Smith CPA, handles solo business returns — or: need to find one this quarter", type: "text" }
      ]
    }
  ]}
/>

## Lesson 6 Completions

<InteractiveChecklist
  title="Tax Compliance Foundations"
  persistKey="finance-L6-actions"
  items={[
    "Assess my nexus: which states have I crossed the $100K or 200-transaction threshold?",
    "Enable Stripe Tax (or set up Paddle/Lemon Squeezy if hands-off compliance is preferred)",
    "Determine if I'm selling to EU customers — if yes, confirm VAT handling is set up",
    "Set up QuickBooks or Wave for monthly bookkeeping",
    "Schedule monthly reconciliation time (first week of each month, 1-2 hours)",
    "Find or confirm my CPA relationship for annual tax prep",
    "Set quarterly estimated tax reminders in Google Calendar"
  ]}
/>

## What's Next

In **Lesson 7**, you'll assemble everything from this course into a complete Finance Dashboard — the Friday Five numbers you check weekly, the monthly deep dive cadence, and the annual planning calendar. By the end of this lesson, you'll have a financial system that runs your business, not the other way around.
