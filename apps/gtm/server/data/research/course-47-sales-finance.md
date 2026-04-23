# Course 47: Sales Finance & Tax — Research Package

**Track:** Operations & Systems (Track 7)
**Duration:** 7 lessons | ~5.5 hours total
**Budget Constraint:** <$100/month tool budget (Stripe processing fees are the main cost)
**Time Constraint:** Solo founder — automate everything possible, review weekly
**Primary Output Artifact:** Tax/Booking Checklists + Financial Models
**Core Interactions:** Revenue dashboard builder, CAC calculator, cash flow simulator

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Set up standardized invoicing with automated reminders (7/14/30 days overdue) | Lessons 1, 2 | Invoicing SOP + Dunning Workflow |
| Track MRR: new vs expansion vs churned revenue | Lesson 3 | MRR Tracking Dashboard |
| Calculate and target CAC payback period (1-3 months bootstrapped, 6-9 months funded) | Lesson 4 | CAC Payback Calculator |
| Manage cash flow for lumpy revenue patterns without panic | Lesson 5 | Cash Flow Forecast Template |
| Understand basic sales tax, VAT, and revenue recognition for solo businesses | Lesson 6 | Tax/Compliance Checklist |
| Assemble a complete finance dashboard for weekly review | Lesson 7 | Complete Finance Dashboard |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + annotated financial examples explaining the core concept
2. **Guided Build Session** — Dashboard and model construction with AI suggestions + financial linters
3. **Simulation/Roleplay** — Where applicable (Lessons 4, 5): cash flow stress tests and CAC modeling
4. **Implementation Sprint** — Course culminates in a complete finance dashboard ready for weekly use (Lesson 7)

---

## LESSON 1: Invoicing Systems: Stripe, Chargebee, PayPal (45 min)

### Key Topics

1. **Why Invoicing Matters More Than You Think** — Professional invoicing reduces payment friction, creates audit trails, enables automated collections, and signals legitimacy to clients. Poor invoicing is the #1 self-inflicted cash flow wound for solo founders.
2. **Stripe Billing Deep Dive** — Included with Stripe account (2.9% + $0.30 per transaction); built-in recurring billing, invoicing, customer portal, and dunning; best for SaaS and subscription businesses; Stripe Tax add-on ($0.50/transaction) handles sales tax automatically
3. **Chargebee for Subscription Management** — Free for <$250K revenue (Launch plan); $249/mo for Rise plan; advanced subscription logic (trials, coupons, usage-based); integrates with Stripe/Braintree as payment processor; best for complex subscription models (metered, tiered, usage-based)
4. **PayPal Business Invoicing** — 2.9% + $0.30 per transaction (US); built-in invoicing and payment links; widely recognized by international clients; higher fees for international (4.4% + fixed fee); good as a secondary payment method
5. **FreshBooks for Service Businesses** — $17/mo (Lite, 5 clients) / $30/mo (Plus, 50 clients); time tracking + invoicing + expenses in one tool; excellent for consultants and service providers; limited for SaaS/subscriptions
6. **Wave: The Free Option** — Completely free invoicing and accounting; payment processing: 2.9% + $0.60 (credit card) or 1% for bank payments; best for bootstrapped founders who need accounting + invoicing in one free tool; limited automation and integrations

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Stripe processes $1+ trillion in payment volume annually | Stripe | Industry standard for SaaS billing |
| 2.9% + $0.30 is the standard US online payment processing rate | Stripe / PayPal / Square | This is table stakes — don't overpay |
| Chargebee serves 25,000+ businesses including early-stage startups | Chargebee | Free tier makes it accessible |
| Solo founders using automated invoicing get paid 2x faster than manual invoicers | FreshBooks data | Automation pays for itself |
| 47% of invoices globally are paid late | Atradius Payment Practices Barometer | Assume late payment and plan accordingly |
| Wave users save an average of $200/month vs paid alternatives | Wave user data | Free is hard to beat at the start |

### Frameworks & Models

- **Invoicing Tool Selection Matrix:**

  | Business Model | Primary Tool | Backup/Secondary | Monthly Cost |
  |---------------|-------------|-----------------|--------------|
  | SaaS (subscription) | Stripe Billing | — | $0 + 2.9% + $0.30/txn |
  | SaaS (complex pricing) | Chargebee + Stripe | — | $0-249/mo + processing |
  | Consulting / Services | FreshBooks | PayPal | $17-30/mo |
  | Coaching / Courses | Stripe Billing | PayPal | $0 + processing |
  | Bootstrapped (any) | Wave | PayPal | $0 + processing |
  | International clients | Stripe + PayPal (backup) | Wise (wire alternative) | Processing only |

- **Invoice Anatomy (Required Fields):**
  1. Your company name, address, and tax ID (EIN or equivalent)
  2. Client company name and billing contact
  3. Invoice number (sequential: INV-2026-001, INV-2026-002)
  4. Invoice date and due date (Net 7/14/30)
  5. Line items with descriptions, quantities, rates
  6. Subtotal, tax (if applicable), total
  7. Payment methods accepted and instructions
  8. Late fee terms (reference your contract)

### Tools to Reference

| Tool | Function | Pricing | Solo Founder Fit |
|------|----------|---------|------------------|
| Stripe Billing | Subscription billing + invoicing | $0 + 2.9% + $0.30/txn | High (SaaS, digital) |
| Chargebee | Subscription management | Free (<$250K rev) / $249/mo (Rise) | High (complex subscriptions) |
| PayPal Business | Invoicing + payments | 2.9% + $0.30/txn | Medium (secondary option) |
| FreshBooks | Invoicing + time tracking + expenses | $17/mo (Lite) / $30/mo (Plus) | High (services) |
| Wave | Free invoicing + accounting | Free (2.9% + $0.60 for CC payments) | High (bootstrapped) |
| Harvest | Time tracking + invoicing | $11/mo (Solo) | High (hourly billing) |
| Wise | International transfers | ~0.5-1.5% conversion fee | High (international clients) |

### Artifact Component

**Invoicing SOP** — Tool selection based on business model, invoice template with all required fields, numbering system, and payment method configuration guide.

### Interactive Element

**Build Session:** AI wizard asks about the student's business model, pricing structure, and client types, then recommends the optimal invoicing tool and walks through setting up their first invoice template with all required fields.

---

## LESSON 2: Automated Collections & Overdue Reminders (45 min)

### Key Topics

1. **The Dunning Problem** — "Dunning" = the process of contacting customers about overdue payments. Manual dunning is soul-crushing and inefficient. Automate it completely.
2. **Stripe Dunning (Built-In)** — Smart Retries: Stripe automatically retries failed payments at optimal times; Dunning emails: automated emails on failed payment (configurable); Revenue Recovery: recovers 10-25% of otherwise-lost revenue; Setup: Dashboard → Settings → Billing → Subscriptions → Smart Retries ON
3. **Baremetrics Recover** — $50/mo+ (based on MRR); adds personalized dunning emails, in-app notifications, and credit card update prompts on top of Stripe; recovers an additional 5-15% beyond Stripe's built-in dunning; best for SaaS founders with >$5K MRR
4. **FreshBooks / Wave Automated Reminders** — Both support automated payment reminders; Configure: send reminder at 1 day before due, on due date, 3 days after, 7 days after, 14 days after; Personal touch: add a custom message ("Just a friendly reminder...")
5. **The Collections Escalation Ladder** — Day 1 past due: Automated friendly reminder → Day 3: Second automated reminder → Day 7: Personal email from you → Day 14: Phone call → Day 21: Formal notice + late fee applied → Day 30: Pause work + final demand → Day 45+: Small claims or write-off
6. **Failed Payment Recovery for SaaS** — Involuntary churn (failed payments) accounts for 20-40% of all SaaS churn; pre-dunning: notify 7 days before card expiry; in-app banners for expired cards; offer alternative payment methods

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Stripe Smart Retries recover 10-25% of initially failed subscription payments | Stripe documentation | Turn this on immediately — it's free |
| Involuntary churn (failed payments) = 20-40% of total SaaS churn | ProfitWell / Baremetrics | This is recoverable revenue |
| Baremetrics Recover users report recovering an additional 5-15% of failed payments beyond Stripe | Baremetrics case studies | Worth it above $5K MRR |
| 82% of late invoice payments are resolved with a single follow-up reminder | Xero / FreshBooks data | Most late payments are forgetfulness, not malice |
| The optimal retry pattern for failed payments: 1, 3, 5, 7 days after initial failure | Stripe / ProfitWell research | Retry timing matters more than retry count |
| Companies that send pre-expiry card update notifications reduce involuntary churn by 30-40% | SaaS dunning studies | Prevention beats recovery |

### Frameworks & Models

- **Dunning Automation Stack:**

  | Layer | Tool | Cost | What It Does |
  |-------|------|------|-------------|
  | Payment retry | Stripe Smart Retries | Free (included) | Retries failed payments at optimal times |
  | Email dunning | Stripe Billing emails | Free (included) | Sends automated failed payment notifications |
  | Advanced dunning | Baremetrics Recover | $50/mo+ | Personalized emails, in-app prompts, analytics |
  | Invoice reminders | FreshBooks / Wave | $0-17/mo | Automated overdue invoice reminders |
  | Card update prompts | Stripe Customer Portal | Free (included) | Lets customers update payment methods |

- **Service Business Collections Timeline:**

  | Day | Action | Channel | Tone |
  |-----|--------|---------|------|
  | -1 (before due) | Payment reminder | Automated email | Friendly ("Reminder: invoice due tomorrow") |
  | +1 | Overdue notice | Automated email | Neutral ("Your invoice is now past due") |
  | +3 | Second reminder | Automated email | Slightly firmer ("Please process at your earliest convenience") |
  | +7 | Personal follow-up | Personal email | Warm but direct ("Checking in on this — any issues?") |
  | +14 | Phone call | Phone/Zoom | Empathetic but clear ("Let's get this resolved") |
  | +21 | Formal notice | Email + letter | Professional ("Late fee of 1.5% applied per agreement") |
  | +30 | Work pause + final demand | Email | Firm ("Work paused pending payment resolution") |
  | +45 | Collection decision | Internal | Business ("Write off, small claims, or collections agency") |

### Tools to Reference

| Tool | Function | Pricing | Solo Founder Fit |
|------|----------|---------|------------------|
| Stripe Smart Retries | Failed payment recovery | Free (included with Stripe) | High |
| Stripe Customer Portal | Self-serve card updates | Free (included with Stripe) | High |
| Baremetrics Recover | Advanced dunning | $50/mo+ (based on MRR) | High (>$5K MRR) |
| Churnkey | Cancellation + dunning flows | $100/mo+ | Medium (>$10K MRR) |
| FreshBooks Reminders | Invoice reminders | Included with plan ($17-30/mo) | High (services) |
| Wave Reminders | Invoice reminders | Free | High (bootstrapped) |

### Artifact Component

**Dunning Workflow** — Complete automated collections setup for both SaaS (Stripe dunning + optional Recover) and services (escalation ladder with email templates at each stage).

### Interactive Element

**Guided Build:** Students configure their collections automation step-by-step. SaaS founders set up Stripe Smart Retries and email dunning. Service founders build their escalation ladder with email templates. AI reviews the setup and identifies gaps.

---

## LESSON 3: Revenue Tracking: New, Expansion, and Churned MRR (50 min)

### Key Topics

1. **Why MRR Decomposition Matters** — Total MRR hides the health of your business. You need to see: New MRR (new customers), Expansion MRR (upgrades, upsells), Contraction MRR (downgrades), Churned MRR (cancellations). The formula: Net New MRR = New + Expansion - Contraction - Churned.
2. **New MRR Tracking** — Revenue from customers who started paying this month; tracks acquisition effectiveness; benchmark: growing 10-20% month-over-month in early stage
3. **Expansion MRR Tracking** — Revenue increase from existing customers (upgrades, seat additions, usage overages); the cheapest revenue you can get; benchmark: expansion should be 20-40% of net new MRR for healthy SaaS
4. **Churned MRR Tracking** — Revenue lost from cancellations; split into voluntary churn (customer chose to leave) and involuntary churn (failed payments); benchmark: <3% monthly logo churn, <5% monthly revenue churn for SMB SaaS
5. **Net Revenue Retention (NRR)** — NRR = (Starting MRR + Expansion - Contraction - Churned) / Starting MRR. Target: >100% (meaning existing customers grow enough to offset churn). Top SaaS companies: 110-130% NRR. Solo founder target: 95-110% NRR.
6. **Tracking Tools for Solo Founders** — ProfitWell (free, connects to Stripe), ChartMogul ($100/mo for up to $10K MRR, then scales), Baremetrics ($50/mo+), or a simple Google Sheets dashboard for early stage

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Median SMB SaaS monthly logo churn: 3-7% | ProfitWell / OpenView benchmarks | <3% is excellent for SMB |
| Companies with NRR >100% grow 2-3x faster than those below 100% | SaaS Capital / Bessemer | Expansion offsets churn |
| Expansion revenue is 3-5x cheaper to acquire than new customer revenue | Pacific Crest SaaS Survey | Prioritize upsells |
| Average B2B SaaS NRR: 100-110% for SMB, 110-130% for enterprise | OpenView / Bessemer | Context matters — SMB churn is higher |
| 40-60% of SaaS revenue growth for top performers comes from expansion | Gainsight / SaaS benchmarks | Expansion is not optional at scale |
| ProfitWell tracks over $28 billion in subscription revenue | ProfitWell | Free tool with massive data |

### Frameworks & Models

- **MRR Decomposition Template:**

  | Metric | This Month | Last Month | Change | Trend |
  |--------|-----------|------------|--------|-------|
  | Starting MRR | $X | — | — | — |
  | + New MRR | $X | $X | +/-% | ↑↓ |
  | + Expansion MRR | $X | $X | +/-% | ↑↓ |
  | - Contraction MRR | ($X) | ($X) | +/-% | ↑↓ |
  | - Churned MRR | ($X) | ($X) | +/-% | ↑↓ |
  | = Net New MRR | $X | $X | +/-% | ↑↓ |
  | **Ending MRR** | **$X** | **$X** | **+/-%** | **↑↓** |
  | NRR | X% | X% | — | — |

- **Revenue Health Scorecard:**

  | Metric | Red (Danger) | Yellow (Watch) | Green (Healthy) |
  |--------|-------------|----------------|-----------------|
  | Monthly logo churn | >7% | 3-7% | <3% |
  | Monthly revenue churn | >10% | 5-10% | <5% |
  | NRR | <90% | 90-100% | >100% |
  | Expansion % of net new | 0% | 1-20% | >20% |
  | New MRR growth | Declining 2+ months | Flat | Growing |

- **Service Business Revenue Tracking:**
  For non-SaaS (consulting, coaching): Track Monthly Recurring Revenue (retainers), Monthly Project Revenue (one-off), Pipeline Value (committed future revenue), Revenue Concentration (% from top 3 clients — should be <50%)

### Tools to Reference

| Tool | Function | Pricing | Solo Founder Fit |
|------|----------|---------|------------------|
| ProfitWell (by Paddle) | MRR analytics + benchmarks | Free | High (best free option) |
| Baremetrics | MRR analytics + dunning + forecasting | $50/mo (up to $10K MRR) | High (>$3K MRR) |
| ChartMogul | MRR analytics + segmentation | $100/mo (up to $10K MRR) | Medium (more features than needed early) |
| Stripe Dashboard | Basic MRR and revenue reports | Free (included with Stripe) | High (starting point) |
| Google Sheets | Manual MRR tracking | Free | High (early stage, <20 customers) |
| QuickBooks Online | Accounting + revenue reports | $15/mo (Simple Start) / $30/mo (Essentials) | High (general accounting) |

### Artifact Component

**MRR Tracking Dashboard** — Either a ProfitWell setup guide (recommended) or a Google Sheets template with MRR decomposition, NRR calculation, and Revenue Health Scorecard.

### Interactive Element

**KPI Simulator:** Students input their current revenue data (or sample data). The simulator calculates MRR decomposition, NRR, and assigns a Revenue Health Score. Students then adjust variables (reduce churn by 1%, add 5% expansion) to see compounding impact over 12 months.

---

## LESSON 4: CAC Payback: Bootstrapped vs VC Benchmarks (50 min)

### Key Topics

1. **Customer Acquisition Cost (CAC)** — Total sales + marketing spend / new customers acquired. For solo founders: include tool costs, ad spend, AND your time valued at a reasonable rate ($50-150/hr depending on your market).
2. **CAC Payback Period** — Months of revenue needed to recover the cost of acquiring a customer. Formula: CAC / (ARPU x Gross Margin %). Bootstrapped target: 1-3 months. Funded target: 6-9 months. Anything over 12 months is dangerous even with funding.
3. **LTV:CAC Ratio** — Lifetime Value / Customer Acquisition Cost. Healthy: 3:1 or higher. At 1:1 you're losing money. At 5:1+ you're probably under-investing in growth.
4. **Bootstrapped vs Funded Benchmarks** — Bootstrapped founders must recover CAC fast because cash is finite. Funded startups can afford longer payback but still have limits. The #1 killer of bootstrapped startups: CAC payback > cash runway.
5. **Blended vs Channel-Specific CAC** — Track both. Blended CAC = total spend / total new customers. Channel CAC = spend on specific channel / customers from that channel. You need channel-specific to know where to invest.
6. **Reducing CAC** — Improve conversion rates (cheaper than more traffic), increase referrals (near-zero CAC), optimize ad targeting, improve sales process efficiency, content marketing compounds over time (CAC decreases as library grows)

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Median SaaS CAC payback: 15-18 months (funded) | OpenView Partners / SaaS Capital | Bootstrapped founders can't afford this |
| Bootstrapped SaaS with <3 month payback grow more sustainably | Baremetrics / indie SaaS studies | Cash efficiency trumps growth rate |
| LTV:CAC ratio of 3:1 is the minimum threshold for healthy unit economics | David Skok / For Entrepreneurs | Below 3:1, you're losing money in the long run |
| Organic channels (SEO, content, referrals) have 60-70% lower CAC than paid channels | HubSpot State of Marketing | Invest in content early — it compounds |
| Average B2B SaaS CAC: $200-500 for SMB, $2,000-15,000 for mid-market | ProfitWell / Pacific Crest | Solo founders should target the low end |
| Companies that track channel-specific CAC allocate budget 25% more efficiently | Marketing analytics studies | Don't just track blended CAC |

### Frameworks & Models

- **CAC Payback Calculator:**

  | Input | Your Value | Benchmark |
  |-------|-----------|-----------|
  | Monthly tool spend (sales + marketing) | $____ | $100-300 |
  | Monthly ad spend | $____ | $0-500 |
  | Your time on sales/marketing (hours/month) | ____ hrs | 20-30 hrs |
  | Your hourly rate (for CAC calculation) | $____/hr | $50-150 |
  | **Total monthly acquisition spend** | **$____** | **$1,000-5,000** |
  | New customers acquired this month | ____ | 2-10 |
  | **CAC (spend / customers)** | **$____** | **$200-1,000** |
  | Average Monthly Revenue Per Customer (ARPU) | $____ | $50-500 |
  | Gross Margin % | ____% | 70-90% |
  | **CAC Payback (months)** | **____** | **1-3 (bootstrapped)** |

- **CAC Payback Health Zones:**

  | Payback Period | Bootstrapped Assessment | Funded Assessment |
  |---------------|------------------------|-------------------|
  | <1 month | Excellent — invest more | Excellent — scale fast |
  | 1-3 months | Healthy | Very healthy |
  | 3-6 months | Caution — optimize | Healthy |
  | 6-9 months | Danger — fix before scaling | Acceptable |
  | 9-12 months | Unsustainable | Caution |
  | >12 months | Stop and fix | Danger |

- **The "Time Tax" CAC Adjustment:**
  Solo founders often calculate CAC as just tool + ad spend. But your time has value. If you spend 20 hours on sales this month and value your time at $100/hr, that's $2,000 of "time cost" that should be included. Ignoring this leads to false confidence in unit economics.

### Tools to Reference

| Tool | Function | Pricing | Solo Founder Fit |
|------|----------|---------|------------------|
| ProfitWell | LTV, churn, MRR analytics | Free | High |
| Baremetrics | CAC, LTV, MRR, forecasting | $50/mo+ | High (>$3K MRR) |
| Google Sheets | Custom CAC calculator | Free | High (early stage) |
| HubSpot CRM | Attribution + source tracking | Free / $20/mo (Starter) | High |
| Mixpanel / Amplitude | Product analytics for conversion funnels | Free tier / $20-25/mo | Medium (product-led) |

### Artifact Component

**CAC Payback Calculator** — Google Sheets model with inputs for spend, time, customers, ARPU, and gross margin. Auto-calculates CAC, payback period, LTV:CAC ratio, and health zone. Includes channel-specific CAC tracking.

### Interactive Element

**KPI Simulator:** Students input their real (or projected) numbers. The simulator shows current CAC payback and LTV:CAC ratio, then lets them adjust variables (improve conversion rate by 10%, add referral channel, reduce ad spend) to see the impact. AI coach identifies the single highest-leverage improvement.

---

## LESSON 5: Cash Flow Management for Lumpy Revenue (45 min)

### Key Topics

1. **The Lumpy Revenue Problem** — Solo founders rarely have smooth, predictable monthly revenue. Project-based work creates feast-or-famine cycles. Even SaaS revenue is lumpy in early stages with small customer counts. Cash flow management is survival skill #1.
2. **The Cash Buffer Rule** — Maintain 2-3 months of operating expenses in reserve at all times. Operating expenses = tools + subscriptions + contractors + personal draw. If buffer drops below 2 months, pause discretionary spending and focus on closing.
3. **Revenue Smoothing Strategies** — (1) Transition project clients to retainers, (2) Offer annual prepay with 15-20% discount, (3) Build a subscription/recurring component alongside projects, (4) Stagger project start dates, (5) Diversify client base (no single client >30% of revenue)
4. **The 13-Week Cash Flow Forecast** — Week-by-week projection of cash in and cash out for the next quarter. Updated every Friday. Reveals problems 6-8 weeks before they hit. The single most important financial tool for a solo founder.
5. **Managing Seasonal Patterns** — B2B: slowdowns in December, July-August; budget freezes at fiscal year-end. Creator: launch cycles create natural peaks/valleys. Plan 3-6 months ahead for known slow periods.
6. **Emergency Protocols** — When cash drops below 1 month: cut all non-essential tools, reduce personal draw, accelerate collections, offer prepay discounts to pipeline prospects, consider bridge revenue (freelance projects, consulting).

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| 82% of small businesses fail due to cash flow problems | US Bank / CB Insights | Cash flow kills more businesses than bad products |
| Average freelancer/consultant has 45 days of cash reserves | Freelancers Union survey | 2-3 months is the target |
| Annual prepay reduces churn by 15-25% compared to monthly billing | ProfitWell | Smooths revenue AND improves retention |
| 60% of B2B invoices are paid late (average 8 days past terms) | Fundbox | Build late payment into your forecast |
| Solo businesses with a cash flow forecast are 30% less likely to run out of cash | SMB financial studies | The forecast itself changes behavior |
| Revenue concentration risk: if >30% from one client, you're one email from crisis | Business continuity studies | Diversification is risk management |

### Frameworks & Models

- **13-Week Cash Flow Forecast Template:**

  | Week | Expected Cash In | Expected Cash Out | Net Cash Flow | Running Balance |
  |------|-----------------|-------------------|---------------|-----------------|
  | Week 1 (Mar 3) | $X (client A invoice) | $X (tools + rent + draw) | +/- $X | $X |
  | Week 2 (Mar 10) | $X (SaaS revenue) | $X (contractor + tools) | +/- $X | $X |
  | ... | ... | ... | ... | ... |
  | Week 13 (May 26) | $X | $X | +/- $X | $X |

  **Color coding:** Green (>3 months buffer), Yellow (1-3 months), Red (<1 month)

- **Revenue Smoothing Priority:**
  1. Convert top 2-3 project clients to monthly retainers (highest impact)
  2. Offer annual prepay to existing SaaS/subscription customers
  3. Build pipeline of 2-3 months ahead (never stop prospecting during feasts)
  4. Keep personal draw consistent (don't inflate lifestyle during peaks)
  5. Set aside 10-20% of all revenue into cash buffer until it hits 3 months

- **Emergency Cash Protocol (STAR):**
  - **S**lash: Cut all non-essential expenses immediately
  - **T**ighten: Accelerate all outstanding collections
  - **A**ccelerate: Offer prepay discounts, close pipeline fast
  - **R**evenue bridge: Take short-term consulting/freelance to stabilize

### Artifact Component

**Cash Flow Forecast Template** — 13-week Google Sheets forecast with automated color coding, revenue smoothing tracker, and emergency protocol checklist.

### Interactive Element

**Cash Flow Simulator:** Students input their current revenue mix (recurring vs project), expense structure, and client concentration. The simulator runs 3 scenarios: (1) Normal — everything goes as planned, (2) Stress — largest client cancels and 2 invoices are late, (3) Growth — 3 new customers but cash needed for onboarding. AI identifies vulnerabilities and recommends the single most impactful revenue smoothing action.

---

## LESSON 6: Sales Tax, VAT, and Compliance Basics (45 min)

### Key Topics

1. **US Sales Tax: The Nexus Problem** — "Nexus" = sufficient presence in a state to require tax collection. Physical nexus (office, employee) and economic nexus (revenue threshold, usually $100K/year or 200 transactions in a state). Post-Wayfair (2018), all states can enforce economic nexus on digital goods.
2. **SaaS and Digital Product Tax Rules (US)** — ~25 states tax SaaS/digital products, others exempt them. Rules change frequently. You must track where your customers are located, not where you are. Stripe Tax ($0.50/transaction) handles this automatically.
3. **EU VAT for Digital Products** — If you sell digital products to EU consumers, you must collect VAT regardless of where you're based. Rates vary: 17-27% depending on country. One-Stop Shop (OSS) simplifies filing. Stripe Tax and Paddle handle this automatically.
4. **Tools That Handle Tax Automatically** — Stripe Tax ($0.50/transaction, covers US + international), Paddle (reseller model — they handle ALL tax, 5% + $0.50/txn), TaxJar ($19/mo+, integrates with various platforms), Avalara (enterprise, NOT recommended for solo founders)
5. **Revenue Recognition Basics** — Recognize revenue when it's earned, not when payment is received. Annual prepay: recognize 1/12 per month. Milestone-based projects: recognize on milestone completion. Cash-basis vs accrual-basis: most solo founders use cash-basis until revenue exceeds $5-10M.
6. **Record Keeping and Tax Prep** — Keep all invoices, receipts, and bank statements organized by month. QuickBooks ($15-30/mo) or Wave (free) for bookkeeping. Categorize expenses correctly (tools, contractors, travel, home office). Work with a CPA for annual taxes ($500-1,500 for a solo business).

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| 46 US states (+ DC) have sales tax; ~25 tax SaaS/digital products | Tax Foundation / State tax codes | Rules vary wildly by state |
| Economic nexus threshold: typically $100K revenue or 200 transactions in a state | South Dakota v. Wayfair (2018) | Most solo founders hit this in only 1-3 states initially |
| Stripe Tax covers 50+ countries and all US states | Stripe documentation | $0.50/transaction is worth the compliance savings |
| Paddle acts as Merchant of Record — handles ALL tax obligations | Paddle | Simplest option but higher processing fees (5% + $0.50) |
| EU VAT rates range from 17% (Luxembourg) to 27% (Hungary) | EU VAT Directive | Must be collected from day 1 of EU sales |
| Average cost of a CPA for solo business annual taxes: $500-1,500 | CPA industry surveys | Worth it to avoid audit risk |
| Non-compliance with sales tax can result in penalties of 5-25% of unpaid tax + interest | State tax enforcement data | The risk of ignoring this is real |

### Frameworks & Models

- **Sales Tax Decision Tree:**

  1. Do you sell digital products/SaaS? → Yes → Check if customer's state taxes digital goods
  2. Do you have economic nexus in the customer's state ($100K+ or 200+ transactions)? → Yes → Must collect
  3. Do you sell to EU consumers? → Yes → Must collect VAT (use OSS or reseller)
  4. Do you sell to businesses only (B2B) in the EU? → May be exempt under reverse charge mechanism
  5. Are you overwhelmed? → Use Stripe Tax or Paddle and let them handle it

- **Tax Tool Comparison:**

  | Tool | Model | Pricing | Covers | Solo Founder Fit |
  |------|-------|---------|--------|------------------|
  | Stripe Tax | Tax calculation + collection | $0.50/transaction | US + 50+ countries | High |
  | Paddle | Merchant of Record (reseller) | 5% + $0.50/txn | All countries | High (simplest, but pricier) |
  | TaxJar | Tax calculation + filing | $19/mo (Starter) | US only | Medium |
  | Avalara | Enterprise tax compliance | $50/mo+ (custom pricing) | Global | NOT recommended (overkill) |
  | Lemon Squeezy | Merchant of Record | 5% + $0.50/txn | All countries | High (similar to Paddle) |

- **Record Keeping Checklist (Monthly):**
  1. Reconcile bank accounts in QuickBooks/Wave
  2. Categorize all expenses
  3. File all invoices (sent and received)
  4. Record any cash/personal expenses that were business-related
  5. Check Stripe/PayPal reports match your accounting
  6. Back up data (export or cloud sync)
  7. Time: ~1-2 hours/month

### Tools to Reference

| Tool | Function | Pricing | Solo Founder Fit |
|------|----------|---------|------------------|
| Stripe Tax | Automated sales tax/VAT calculation + collection | $0.50/transaction | High |
| Paddle | Merchant of Record (handles all tax) | 5% + $0.50/txn | High (simplest compliance) |
| Lemon Squeezy | Merchant of Record | 5% + $0.50/txn | High (alternative to Paddle) |
| TaxJar | US sales tax calculation + filing | $19/mo (Starter) | Medium |
| QuickBooks Online | Bookkeeping + tax prep | $15/mo (Simple Start) / $30/mo (Essentials) | High |
| Wave | Free bookkeeping + invoicing | Free | High (bootstrapped) |
| Xero | Bookkeeping (popular outside US) | $15/mo (Starter) | Medium |

### Artifact Component

**Tax/Compliance Checklist** — Decision tree for sales tax obligations, tool selection guide, monthly bookkeeping checklist, and annual tax prep timeline.

### Interactive Element

**Concept Capsule Quiz:** Students answer 8 scenarios: "Do I need to collect sales tax in this situation?" covering SaaS sold to US customers in different states, digital products sold to EU consumers, B2B services sold internationally, etc. AI explains the answer and references the applicable law.

---

## LESSON 7: Your Finance Dashboard (45 min)

### Key Topics

1. **Dashboard Assembly** — Compiling all artifacts from Lessons 1-6 into a single, weekly-reviewable financial system
2. **The 5 Numbers You Check Every Friday** — (1) Cash balance and 13-week forecast status, (2) MRR (new + expansion - contraction - churned), (3) Outstanding invoices and days-to-payment, (4) CAC payback period (trailing 3-month average), (5) Revenue concentration (% from top 3 clients)
3. **Weekly Finance Review Ritual (30 min)** — Every Friday: check the 5 numbers, update 13-week forecast, review overdue invoices, scan upcoming renewals, note any red flags for Monday action
4. **Monthly Deep Dive (2 hours)** — First week of each month: reconcile books, calculate MRR decomposition, update CAC payback, review revenue health scorecard, plan next month's cash flow, file taxes if applicable
5. **Annual Financial Planning** — Set revenue targets by quarter, budget for tool upgrades and legal reviews, plan for tax obligations, review pricing (annual increase?), evaluate hiring readiness
6. **Common Solo Founder Finance Mistakes** — (1) Not tracking time as a cost, (2) Ignoring sales tax until audit, (3) No cash buffer, (4) Revenue concentration, (5) Not raising prices annually, (6) Mixing personal and business finances

### Frameworks & Models

- **The "Friday Five" Dashboard:**

  | # | Metric | Where to Find It | Red Flag |
  |---|--------|------------------|----------|
  | 1 | Cash balance + 13-week status | Bank + Forecast sheet | <2 months buffer |
  | 2 | MRR (net new) | ProfitWell / Stripe / Sheet | Negative net new 2+ months |
  | 3 | Outstanding invoices | FreshBooks / Stripe / Sheet | >$X or >30 days overdue |
  | 4 | CAC payback (3-month trailing) | CAC calculator sheet | >3 months (bootstrapped) |
  | 5 | Revenue concentration | Revenue sheet | >30% from one client |

- **Monthly Review Template:**
  - [ ] Reconcile bank accounts in QuickBooks/Wave
  - [ ] Calculate MRR decomposition (new / expansion / contraction / churned)
  - [ ] Update NRR
  - [ ] Update trailing 3-month CAC payback
  - [ ] Review Revenue Health Scorecard
  - [ ] Update 13-week cash flow forecast
  - [ ] Check for upcoming contract renewals (60-day window)
  - [ ] File any required sales tax (quarterly states)
  - [ ] Back up all financial data

- **Annual Planning Calendar:**

  | Month | Key Financial Action |
  |-------|---------------------|
  | January | Annual tax prep, set yearly revenue target |
  | March/April | Q1 review, file annual taxes (or extension) |
  | June | Mid-year review, pricing evaluation |
  | September | Q3 review, plan Q4 (budget season for clients) |
  | October | Annual price increase notice to clients (effective Jan 1) |
  | December | Year-end close, tax prep begins |

### Artifact Component

**Complete Finance Dashboard** (Primary Course Artifact) — Combines all lesson artifacts: Invoicing SOP, Dunning Workflow, MRR Tracking Dashboard, CAC Payback Calculator, Cash Flow Forecast, Tax/Compliance Checklist, and Weekly/Monthly review templates.

### Interactive Element

**Implementation Sprint Launcher:** AI generates a personalized 7-day setup checklist:
- Day 1: Set up invoicing tool (Stripe/FreshBooks/Wave) and create first invoice template
- Day 2: Configure automated dunning (Stripe Smart Retries or invoice reminders)
- Day 3: Set up MRR tracking (ProfitWell connection or Google Sheets template)
- Day 4: Build CAC payback calculator with real numbers
- Day 5: Create 13-week cash flow forecast
- Day 6: Sales tax assessment — do you need to collect? Set up Stripe Tax if yes
- Day 7: Assemble Friday Five dashboard and schedule weekly review

AI reviews the completed dashboard and identifies any missing components or blind spots.

---

## TOOL PRICING SUMMARY

### Tier 1: Free ($0/mo + processing fees)
Stripe Billing (2.9% + $0.30/txn) + Wave (free accounting/invoicing) + ProfitWell (free MRR analytics) + Google Sheets (free dashboards)

### Tier 2: Essential ($15-30/mo + processing fees)
Stripe Billing + QuickBooks Simple Start ($15/mo) + ProfitWell (free)

### Tier 3: Growth ($65-100/mo + processing fees)
Stripe Billing + Stripe Tax ($0.50/txn) + QuickBooks Essentials ($30/mo) + Baremetrics ($50/mo)

### Tax Compliance Options
- DIY: Stripe Tax ($0.50/txn) + QuickBooks + annual CPA ($500-1,500)
- Hands-off: Paddle or Lemon Squeezy (5% + $0.50/txn — they handle everything)

---

## ALL ARTIFACTS CREATED

1. Invoicing SOP (L1)
2. Dunning Workflow (L2)
3. MRR Tracking Dashboard (L3)
4. CAC Payback Calculator (L4)
5. Cash Flow Forecast Template (L5)
6. Tax/Compliance Checklist (L6)
7. Complete Finance Dashboard (L7) — compiles all above

**Completion Badge:** "Revenue Architect" — 150 XP
