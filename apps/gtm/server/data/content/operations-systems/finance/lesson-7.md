---
title: "Your Finance Dashboard"
duration: "45 min"
track: "Operations & Systems"
course: "Course 47: Sales Finance & Tax"
lesson: 7
---

## From Six Systems to One Dashboard

You've built the components. Now you build the dashboard that ties them together.

After this lesson, every Friday you'll spend 20-30 minutes reviewing five numbers that tell you everything you need to know about your business's financial health. Once a month, you'll spend 2 hours on a deeper review. And once a year, you'll do a full planning session.

That's it. That's the entire financial operating system for a solo founder.

The most common finance mistake among solo founders isn't getting the accounting wrong. It's not having a routine. They check numbers when they're worried, ignore them when things feel good, and spend enormous mental energy on financial anxiety that a simple weekly ritual would eliminate.

<InsightCard icon="💰" title="The Routine That Replaces Anxiety">
Solo businesses with a consistent weekly financial review spend 70% less time worrying about money — not because their numbers are better, but because they're never surprised. You can only fix what you're watching. What you're not watching becomes a crisis.
</InsightCard>

## The Friday Five

Every Friday. 20-30 minutes. Five numbers. That's your weekly financial review.

<SlideNavigation>
<Slide title="Number 1: Cash Balance and 13-Week Status">

**What to check:** Your actual bank balance today, and where your 13-week forecast says you'll be in 4, 8, and 13 weeks.

**Where to find it:** Your bank's online portal + your Google Sheets 13-week forecast (from Lesson 5).

**Red flag:** Running balance projecting below your 2-month expense floor at any point in the next 8 weeks.

**Action trigger:** Yellow or red projections anywhere in the next 4 weeks → begin STAR protocol immediately. Yellow projections 5-8 weeks out → begin revenue acceleration now.

**Time:** 5 minutes.

</Slide>

<Slide title="Number 2: Net New MRR">

**What to check:** This week's new subscriptions or retainers started, minus any cancellations, plus any upgrades.

**Where to find it:** Stripe Dashboard → Revenue → MRR movement. Or ProfitWell. Or your MRR decomposition spreadsheet (from Lesson 3).

**Red flag:** Net New MRR negative for 2+ consecutive months. Or New MRR declining while Churned MRR holds steady — a sign your top of funnel is weakening.

**Action trigger:** Check your NRR. If below 100%, identify which component is off: too much churn, not enough expansion, or weak new acquisition. Each has a different solution.

**Time:** 5 minutes.

</Slide>

<Slide title="Number 3: Outstanding Invoices">

**What to check:** Total outstanding invoice balance and which invoices are overdue (and by how many days).

**Where to find it:** FreshBooks dashboard, Wave dashboard, or Stripe Invoicing.

**Red flag:** Any invoice over 21 days past due. Total outstanding balance more than 30% of your monthly revenue.

**Action trigger:** Any invoice 7+ days past due that hasn't received a personal email → send one now. Any invoice 14+ days past due → call today. Use your collections escalation ladder from Lesson 2.

**Time:** 5 minutes.

</Slide>

<Slide title="Number 4: CAC Payback (3-Month Trailing Average)">

**What to check:** Your rolling 3-month average CAC Payback Period. This smooths out month-to-month noise.

**Where to find it:** Your CAC calculation spreadsheet (from Lesson 4). Calculate monthly, track trailing average.

**Red flag:** Payback creeping above 3 months for bootstrapped. Above 6 months, stop scaling and fix first.

**Action trigger:** Rising payback → check which cost is increasing (time, tools, or ads) or which conversion metric is declining (close rate, show rate, pipeline volume). Fix the root cause.

**Time:** 5 minutes.

</Slide>

<Slide title="Number 5: Revenue Concentration">

**What to check:** What percentage of this month's revenue came from your top 3 clients.

**Where to find it:** A simple calculation from your invoice records.

**Red flag:** Any single client over 30% of total revenue, or top 3 clients over 60%.

**Action trigger:** Concentration above 30% for any single client → reprioritize new business development this week, regardless of how busy you are. One lost client should never threaten your survival.

**Time:** 2 minutes.

</Slide>
</SlideNavigation>

## Your Weekly Review Ritual

<TemplateBuilder
  title="My Friday Finance Review Ritual"
  persistKey="finance-L7-ritual"
  sections={[
    {
      id: "schedule",
      title: "When and Where",
      fields: [
        { id: "time", label: "My weekly review time", placeholder: "e.g., Friday 4:00-4:30pm — blocked on calendar as 'Finance Review'", type: "text" },
        { id: "tools", label: "The tabs/apps I'll have open", placeholder: "e.g., Bank portal, Google Sheets (forecast), Stripe/ProfitWell, FreshBooks", type: "text" }
      ]
    },
    {
      id: "thresholds",
      title: "My Personal Red Flags",
      fields: [
        { id: "cash_red", label: "Cash buffer red flag threshold", placeholder: "e.g., Projected balance below $8,500 (1.5 months floor) within 4 weeks", type: "text" },
        { id: "mrr_red", label: "MRR red flag", placeholder: "e.g., Net New MRR negative for 2+ months / NRR below 95%", type: "text" },
        { id: "invoice_red", label: "Invoice red flag", placeholder: "e.g., Any invoice over 14 days past due / Outstanding total over $5,000", type: "text" }
      ]
    }
  ]}
/>

## The Monthly Deep Dive

First week of each month. 2 hours. This is where you do the detailed work that the weekly 30-minute review can't cover.

<ProgressiveReveal title="Monthly Deep Dive Agenda" persistKey="finance-L7-monthly">

<RevealSection title="Step 1: Reconcile Books (30 min)">

Open QuickBooks or Wave. Reconcile all bank accounts: verify every transaction in your accounting software matches your bank statement. Categorize any uncategorized expenses. Fix any mis-categorizations from last month.

This is the single most important step for accurate financial reporting. Unreconciled books make everything else meaningless.

</RevealSection>

<RevealSection title="Step 2: Calculate Full MRR Decomposition (15 min)">

For the month that just ended, calculate:
- Starting MRR
- New MRR
- Expansion MRR
- Contraction MRR
- Churned MRR
- Ending MRR
- NRR

Update your MRR tracking spreadsheet or verify your ProfitWell numbers. Note any anomalies — a spike in churn, unexpected expansion, or a sudden drop in New MRR.

</RevealSection>

<RevealSection title="Step 3: Update CAC and Review Revenue Health (15 min)">

Calculate last month's CAC (tool spend + time cost + ad spend / new customers). Update your 3-month trailing average.

Review the Revenue Health Scorecard:
- Logo churn: Green / Yellow / Red?
- Revenue churn: Green / Yellow / Red?
- NRR: Green / Yellow / Red?
- Expansion rate: Green / Yellow / Red?

If any metric is red, that's your #1 financial priority for the coming month.

</RevealSection>

<RevealSection title="Step 4: Update 13-Week Forecast (20 min)">

Roll your forecast forward: remove the completed month, add the next 4 weeks of projections. Update:
- Any confirmed new contracts
- Any known client exits
- Any upcoming large expenses (annual renewals, contractor changes)
- Revise revenue projections based on current pipeline

</RevealSection>

<RevealSection title="Step 5: Contract Renewal Review (15 min)">

Check your Notion contract tracker. Are any contracts expiring in the next 60 days?

For each upcoming expiration: Do you want to renew? At the same rate? Is this a good time to raise prices? Does the client know the renewal is coming?

Missed renewals lose 28% of contract value on average. This 15-minute review prevents that.

</RevealSection>

<RevealSection title="Step 6: Tax and Compliance Check (15 min)">

Review your Stripe Tax or TaxJar reports. Are you approaching economic nexus thresholds in any new states?

File any quarterly sales tax returns due this month.

Check if any estimated tax payment is due this quarter. Add to your expense forecast if so.

</RevealSection>

</ProgressiveReveal>

## The Annual Financial Planning Calendar

<SlideNavigation>
<Slide title="January">

- Collect 1099s from Stripe, PayPal, and clients who paid you $600+
- Begin gathering annual tax documents
- Set annual revenue target by quarter
- Review all tool subscriptions — cancel unused; negotiate better rates on annual renewals
- Offer annual prepay option to any monthly clients who didn't take it in Q4

</Slide>

<Slide title="March / April">

- Q1 review: how did you track vs target?
- File annual taxes with your CPA (or file extension to October)
- Pay Q1 estimated taxes (April 15)
- Pricing review: when did you last raise prices? If it's been 12+ months, evaluate an increase.

</Slide>

<Slide title="June">

- Q2 / mid-year review: are you on track for annual revenue target?
- Evaluate hiring or contractor readiness: can you afford to expand? Does your CAC payback support the investment?
- Review your top 3 tools — are you getting ROI proportional to their cost?

</Slide>

<Slide title="September / October">

- Q3 review: plan Q4 (B2B clients start budget planning; this is your best window to land new contracts)
- October: send annual price increase notice to clients effective January 1
- Begin year-end tax planning with your CPA: any equipment purchases, retirement contributions, or expense timing optimizations before December 31

</Slide>

<Slide title="December">

- Year-end close: make final expense and revenue decisions with tax implications in mind
- Offer annual prepay to all monthly clients — December is when B2B clients have budget to spend
- Plan Q1 of next year: what contracts are renewing? What new deals are in pipeline?
- Back up all financial data for the year

</Slide>
</SlideNavigation>

## The 7 Most Common Solo Founder Finance Mistakes

<SwipeDecision
  title="Finance Habit Audit"
  description="For each behavior, honestly assess whether this describes you."
  optionA="This is me — need to fix"
  optionB="Not me — this is handled"
  persistKey="finance-L7-audit"
  cards={[
    {
      id: "1",
      content: "I calculate my CAC as just tool costs and ad spend — I don't include my time.",
      correctOption: "a",
      explanation: "This leads to false confidence. Your time is a real cost. If you spend 25 hours/month on sales and marketing, that's a $2,500+ cost at any reasonable hourly rate. Add it to your CAC."
    },
    {
      id: "2",
      content: "I've never checked whether I have economic nexus obligations in states where I have many customers.",
      correctOption: "a",
      explanation: "The Wayfair ruling means this isn't optional. If you have 200+ transactions or $100K+ revenue in any state, you may owe sales tax. Check this now and enable Stripe Tax before you cross the threshold, not after."
    },
    {
      id: "3",
      content: "My operating expenses and personal finances are in the same bank account.",
      correctOption: "a",
      explanation: "Mixing personal and business finances is the accounting mistake that causes the most downstream pain. Open a separate business checking account if you haven't. It makes bookkeeping, tax prep, and cash flow management dramatically cleaner."
    },
    {
      id: "4",
      content: "I don't have a cash buffer — I spend revenue as it comes in.",
      correctOption: "a",
      explanation: "One lost client, one delayed payment, one unexpected expense. Without a 2-3 month buffer, any of these becomes a crisis. Start building your buffer immediately: 15-20% of every payment goes into a separate savings account until you hit 2 months of expenses."
    },
    {
      id: "5",
      content: "I review my financials on a consistent weekly and monthly schedule.",
      correctOption: "b",
      explanation: "You're ahead of most solo founders. A consistent review ritual is the foundation of financial control. The Friday Five review takes 30 minutes and prevents 95% of financial surprises."
    },
    {
      id: "6",
      content: "I haven't raised my prices in over 12 months.",
      correctOption: "a",
      explanation: "Inflation, increased expertise, and market positioning all argue for annual price increases. A 5-10% annual increase is expected and rarely causes client churn when communicated professionally with 60-90 days notice."
    }
  ]}
/>

## Building Your Complete Finance Dashboard

The complete Finance Dashboard brings together every artifact from this course:

<ProgressiveReveal title="Your 7-Day Implementation Sprint" persistKey="finance-L7-sprint">

<RevealSection title="Day 1: Invoicing System">

Set up your primary invoicing tool (Stripe Billing for SaaS, FreshBooks or Wave for services). Create your first invoice template with all 8 required fields. Configure your invoice numbering system.

Test: Send yourself a sample invoice. Does it look professional? Are all payment links working?

</RevealSection>

<RevealSection title="Day 2: Automated Collections">

Enable Stripe Smart Retries (if on Stripe). Configure automated invoice reminders at -1 day, +1, +3, +7, +14 days in your invoicing tool. Write your personal Day +7 and Day +21 follow-up email templates.

Test: Verify automation is active by checking your invoicing tool's reminder settings.

</RevealSection>

<RevealSection title="Day 3: MRR Tracking">

Connect ProfitWell to Stripe (5 minutes, free). Or build your MRR decomposition spreadsheet using the formula from Lesson 3. Enter your current numbers as baseline.

Calculate your current NRR. Is it above or below 100%?

</RevealSection>

<RevealSection title="Day 4: CAC Calculator">

Build your CAC calculation in Google Sheets. Add: tool spend, estimated time cost, ad spend, new customers acquired. Calculate CAC, Payback Period, and LTV:CAC.

Note your current payback period. Compare to the bootstrapped benchmark (under 3 months).

</RevealSection>

<RevealSection title="Day 5: 13-Week Cash Flow Forecast">

Build your 13-week forecast in Google Sheets. Start with your current bank balance. Add all expected cash in for the next 13 weeks. Add all expected cash out. Apply color coding.

Look at the result: are there yellow or red periods in the next 8 weeks?

</RevealSection>

<RevealSection title="Day 6: Tax Compliance">

Enable Stripe Tax (or confirm Paddle/Lemon Squeezy handles your tax). Assess economic nexus in states where you have meaningful customer concentration. Set up QuickBooks or Wave for bookkeeping if not already done.

Set quarterly estimated tax payment reminders in Google Calendar.

</RevealSection>

<RevealSection title="Day 7: Assemble the Friday Five Dashboard">

Create a Google Sheets tab titled "Friday Five" that shows:
1. Cash balance and 13-week status (link to forecast)
2. Net New MRR this month (link to ProfitWell or MRR spreadsheet)
3. Outstanding invoices and oldest overdue (link to FreshBooks/Wave/Stripe)
4. Trailing 3-month CAC payback (link to CAC calculator)
5. Revenue concentration: % from top 3 clients

Block 30 minutes on your calendar every Friday: "Finance Review."

</RevealSection>

</ProgressiveReveal>

<RangeSlider
  label="How ready do you feel to run your business finances systematically after this course?"
  min={1}
  max={10}
  lowLabel="Still overwhelmed"
  highLabel="Completely in control"
  persistKey="finance-L7-ready"
/>

## Course 47 Completion Checklist

<InteractiveChecklist
  title="Revenue Architect Certification — Final Checklist"
  persistKey="finance-L7-actions"
  items={[
    "Invoicing system live: all 8 required fields, automated reminders configured",
    "Dunning automation configured: Stripe Smart Retries (SaaS) or invoice reminder sequences (services)",
    "MRR decomposition tracked monthly: New + Expansion - Contraction - Churned = Net New",
    "NRR calculated and compared to target (>100% is healthy)",
    "CAC Payback Period calculated with time cost included (target &lt;3 months bootstrapped)",
    "LTV:CAC ratio calculated (target >3:1)",
    "13-week cash flow forecast built and updated weekly every Friday",
    "Cash buffer assessed: how many months of operating expenses are in reserve?",
    "Tax compliance in place: Stripe Tax enabled or Paddle/Lemon Squeezy as Merchant of Record",
    "Monthly bookkeeping routine established (QuickBooks or Wave, first week of each month)",
    "Friday Five dashboard assembled and weekly review block on calendar",
    "CPA relationship confirmed for annual tax filing"
  ]}
/>

Completing this course earns you the **Revenue Architect** badge. You now have the complete financial operating system for a solo founder — built to scale from your first $10K month to your first $100K month and beyond.
