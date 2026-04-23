---
title: "The Marketing Dashboard: Managing by the Numbers"
duration: "50 min"
track: "Marketing Engine"
course: "Course 12: Marketing Automation & Analytics"
lesson: 9
---

# Managing by the Numbers: Your Marketing Dashboard

"If you can't measure it, you can't improve it." — Peter Drucker.

Most solo founders fail at measurement in one of two ways. They either track **everything** (and drown in data they don't understand) or they track **nothing** (and run their business on "vibes").

<InsightCard icon="📊" title="The Real Problem">
Your goal isn't to have more data; it's to have a **Decision-Support System.** You need a simple dashboard that tells you, at a glance: (1) Is my engine healthy? (2) Where is the leak? (3) Where should I spend my next $100 or hour?
</InsightCard>

In this lesson, we will separate the "Vanity Metrics" (ego) from the "Sanity Metrics" (profit) and build a dashboard you will actually use.

<RangeSlider 
  label="How confident are you in your current metrics tracking?" 
  min={1} 
  max={10} 
  lowLabel="Flying blind" 
  highLabel="Data-driven" 
  persistKey="course-12-marketing-automation-analytics-L9-confidence" 
/>

---

## 1. The Metric Hierarchy (The 4 Tiers)

To avoid overwhelm, we categorize metrics into four tiers based on their impact on your bank account.

<SlideNavigation>
<Slide title="Tier 1: Business Outcomes (Lagging Indicators)">

These tell you what *happened*. They are the scorecard.
*   **Revenue (MRR/Sales):** The ultimate validator.
*   **New Customers Acquired:** The raw count of wins.
*   **Net Profit:** Revenue minus Cost. (Don't just track top-line!).

</Slide>

<Slide title="Tier 2: Pipeline Health (Leading Indicators)">

These tell you what *will happen* next month. If these drop today, revenue drops in 30 days.
*   **MQLs Generated:** The volume of *qualified* contacts entering the system.
*   **Pipeline Value:** The total potential revenue of active, qualified deals.
*   **Close Velocity:** The average days to turn a lead into a customer. (Is the cycle speeding up or slowing down?).

</Slide>

<Slide title="Tier 3: Channel Efficiency (Optimization)">

These tell you *what's working* and where to invest.
*   **Traffic by Source:** Where is the attention coming from (SEO vs. LinkedIn vs. Ads)?
*   **Conversion by Source:** Which source produces *customers*? (e.g., LinkedIn might bring less traffic than SEO, but higher conversion).
*   **CAC (Customer Acquisition Cost):** How much do you spend to get one buyer?

</Slide>

<Slide title="Tier 4: Engagement Hygiene (Content Quality)">

These tell you if your content is boring.
*   **Email Open/Click Rates:** Are they reading? (Target: >30% Open, >2% Click).
*   **Landing Page Conversion:** What % of visitors sign up? (Target: >5-10% for warm traffic).

</Slide>
</SlideNavigation>

---

## 2. All Metrics Are Ratios (The Golden Rule)

Raw numbers lie. Ratios tell the truth.

<FlipCard 
  front="Raw Number: 'We got 10,000 page views!'" 
  back="Ratio: 'But we only got 5 leads.' (0.05% Conversion Rate). That is a disaster." 
/>

Always view your metrics as a funnel ratio:
1.  **Visitor-to-Lead:** (Is my website persuasive?)
2.  **Lead-to-MQL:** (Is my traffic qualified?)
3.  **MQL-to-Win:** (Is my sales process effective?)

**The Diagnostic Strategy:**
*   If **Visitor-to-Lead** is low: Fix your Copy/Offer.
*   If **Lead-to-MQL** is low: Fix your Traffic Source (targeting wrong people).
*   If **MQL-to-Win** is low: Fix your Sales Skills/Pricing.

<ClassifyExercise
  title="Diagnose the Funnel Leak"
  persistKey="course-12-marketing-automation-analytics-L9-diagnose"
  categories={[
    { id: "top", label: "Top of Funnel (Traffic/Offer)", color: "#3b82f6" },
    { id: "middle", label: "Middle of Funnel (Targeting)", color: "#f59e0b" },
    { id: "bottom", label: "Bottom of Funnel (Sales/Pricing)", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Visitor-to-Lead conversion is 0.5%", correctCategory: "top" },
    { id: "2", content: "Lead-to-MQL conversion is 10%", correctCategory: "middle" },
    { id: "3", content: "MQL-to-Customer conversion is 2%", correctCategory: "bottom" },
    { id: "4", content: "Landing page has 50% bounce rate", correctCategory: "top" },
    { id: "5", content: "Trial users don't convert to paid", correctCategory: "bottom" }
  ]}
/>

---

## 3. The 3 Financial Formulas You Must Know

You cannot scale without mastering these three equations.

**1. Customer Acquisition Cost (CAC):**
> `(Total Sales & Marketing Spend) / (Number of New Customers Acquired)`
> *   *Example:* Spent $1,000 on ads + $500 on tools. Got 10 customers. CAC = $150.

**2. Customer Lifetime Value (LTV):**
> `(Average Revenue Per Customer) x (Average Length of Relationship)`
> *   *Example:* Customers pay $100/mo and stay for 10 months. LTV = $1,000.

**3. The LTV:CAC Ratio (The Holy Grail):**
> `LTV / CAC`
> *   *Target:* **3:1 or higher.** (Make $3 for every $1 spent).
> *   *Danger Zone:* 1:1. (Trading dollars. You will go bankrupt on overhead).
> *   *Hyper-Growth:* 5:1. (You are under-investing; spend more to grow faster).

<ScenarioSimulator
  title="LTV:CAC Calculator"
  persistKey="course-12-marketing-automation-analytics-L9-simulator"
  levers={[
    { id: "avgRevenue", label: "Average Revenue Per Customer ($)", min: 50, max: 500, step: 10, defaultValue: 100 },
    { id: "avgMonths", label: "Average Customer Lifespan (months)", min: 1, max: 24, step: 1, defaultValue: 10 },
    { id: "marketingSpend", label: "Monthly Marketing Spend ($)", min: 500, max: 10000, step: 100, defaultValue: 1500 },
    { id: "newCustomers", label: "New Customers Per Month", min: 5, max: 100, step: 5, defaultValue: 10 }
  ]}
  outputs={[
    { id: "ltv", label: "Customer Lifetime Value (LTV)", formula: "(avgRevenue * avgMonths)", unit: "$", precision: 0 },
    { id: "cac", label: "Customer Acquisition Cost (CAC)", formula: "(marketingSpend / newCustomers)", unit: "$", precision: 0 },
    { id: "ratio", label: "LTV:CAC Ratio", formula: "((avgRevenue * avgMonths) / (marketingSpend / newCustomers))", unit: ":1", precision: 2 }
  ]}
  insight="Your LTV:CAC ratio is {ratio}:1. Target is 3:1 or higher. Below 3:1 means you need to either increase customer value or reduce acquisition costs."
/>

---

## 4. The "Vanity Graveyard": What to Ignore

Founders obsess over numbers that feed the ego but starve the wallet.

**Delete these from your mental RAM:**
1.  **Social Followers:** A "Follow" is a vanity metric. A "Click" is intent. A "Lead" is an asset. Never optimize for followers; optimize for leads.
2.  **Total Page Views:** Without conversion context, this is noise.
3.  **Total Email List Size:** An inactive list of 20,000 is worse than an active list of 500. (The large list costs more and hurts deliverability).
4.  **"Likes":** Viral posts often attract low-quality traffic.

<SwipeDecision
  title="Vanity Metric or Sanity Metric?"
  description="Swipe right for metrics that matter, left for vanity metrics"
  optionA="Vanity (Ignore)"
  optionB="Sanity (Track)"
  persistKey="course-12-marketing-automation-analytics-L9-swipe"
  cards={[
    { id: "1", content: "Total Instagram followers", correctOption: "a", explanation: "Followers don't pay bills. Track lead generation instead." },
    { id: "2", content: "Email list conversion rate", correctOption: "b", explanation: "This directly impacts revenue and shows content quality." },
    { id: "3", content: "LinkedIn post likes", correctOption: "a", explanation: "Likes are ego fuel. Track profile visits and DMs instead." },
    { id: "4", content: "MQL-to-Customer conversion rate", correctOption: "b", explanation: "This reveals sales process effectiveness and directly predicts revenue." },
    { id: "5", content: "Total page views", correctOption: "a", explanation: "Without conversion context, this is meaningless. Track visitor-to-lead instead." },
    { id: "6", content: "Customer Acquisition Cost (CAC)", correctOption: "b", explanation: "Essential for understanding profitability and scaling potential." }
  ]}
/>

---

## 5. Building Your Dashboard: The 3 Levels

Don't buy expensive software yet. Match the tool to your stage.

### Level 1: The "Monday Spreadsheet" ($0 - $10k MRR)
*   **Tool:** Google Sheets.
*   **Process:** Create 52 rows (Weeks). Create columns for your Tier 1 & 2 metrics.
*   **Action:** Every Monday morning, spend 15 minutes manually opening your tools (Stripe, ConvertKit, Analytics) and typing the numbers in.
*   **Why Manual?** The physical act of typing "0 new leads" hurts. It forces you to confront reality.

### Level 2: The "Notion Hub" ($10k - $50k MRR)
*   **Tool:** Notion Database.
*   **Process:** Use Zapier to auto-populate basic stats (New Subscribers), but keep financial entry manual during your Weekly Review.
*   **Action:** View trends alongside your "Weekly Tasks."

### Level 3: The "Automated Command Center" ($50k+ MRR)
*   **Tool:** Looker Studio, Geckoboard, or Plausible.
*   **Process:** Connect data sources via API.
*   **Action:** TV dashboard on the wall. (Or a pinned browser tab). Real-time visibility.

---

## 6. The Review Rhythm: When to Look

Data is useless without a "Decision Ritual."

1.  **Daily (Pulse Check):** Check *only* Revenue and New MQLs. (2 minutes).
2.  **Weekly (The Review):** Monday Morning. Review Tier 1 & 2. Ask: *"Are we on track for the month?"* If no, adjust this week's plan.
3.  **Monthly (The Deep Dive):** Review Tier 3 & 4. Ask: *"Is LinkedIn still working? Should we kill the blog?"* Update your strategy.

---

## 7. Dual Context Examples

<ExampleCard label="Scenario A: B2B SaaS (The Dev Tool)">

**The Problem:** High traffic, Low Sales.

**The Dashboard Diagnosis:**
*   *Visitor-to-Lead:* 8% (Good).
*   *Lead-to-Trial:* 20% (Good).
*   *Trial-to-Paid:* **2% (CRITICAL FAILURE).**

**The Fix:** Use the data to isolate the bottleneck. The trial onboarding was broken. The founder focused 100% of effort on fixing the "First 5 Minutes" of the product. Conversion jumped to 10%. Revenue doubled without adding new traffic.

</ExampleCard>

<ExampleCard label="Scenario B: Creator/Coach (The Course Creator)">

**The Problem:** "Ads aren't working."

**The Dashboard Diagnosis:**
*   *CAC:* $250.
*   *Course Price:* $197.
*   *LTV:* $197.
*   *LTV:CAC Ratio:* **0.8:1 (Losing money).**

**The Fix:** The dashboard showed negative ROI. The founder added a "Backend Membership" upsell ($50/mo). LTV increased to $600. Ratio became 2.4:1. Ads became profitable.

</ExampleCard>

---

## 8. Summary Checklist

<InteractiveChecklist 
  title="Your Marketing Dashboard Action Items" 
  persistKey="course-12-marketing-automation-analytics-L9-actions" 
  items={[
    "Track Revenue, Pipeline, and Leads weekly",
    "Look at conversion percentages, not just totals",
    "Calculate your LTV:CAC ratio (target: >3:1)",
    "Stop tracking vanity metrics (Likes, Followers)",
    "Set up a calendar invite for 'Metric Review' every Monday",
    "Create your Monday Spreadsheet with the 6 core columns",
    "Identify your current bottleneck metric (the 'Red' number)",
    "Write down ONE action to fix your weakest metric this week"
  ]} 
/>

---

## 9. Practice Exercise: Build Your "Monday Sheet"

Create a simple spreadsheet today.

<TemplateBuilder
  title="Your Monday Metrics Spreadsheet"
  persistKey="course-12-marketing-automation-analytics-L9-template"
  sections={[
    {
      id: "baseline",
      title: "Last 4 Weeks Baseline",
      fields: [
        { id: "week1-revenue", label: "Week 1 Revenue ($)", placeholder: "e.g., 2500", type: "text" },
        { id: "week1-traffic", label: "Week 1 Traffic (Visits)", placeholder: "e.g., 1200", type: "text" },
        { id: "week1-mqls", label: "Week 1 New MQLs", placeholder: "e.g., 15", type: "text" },
        { id: "week1-customers", label: "Week 1 New Customers", placeholder: "e.g., 3", type: "text" }
      ]
    },
    {
      id: "insight",
      title: "Your Key Insight",
      fields: [
        { id: "trend", label: "What's the trend? (Flat, Up, or Down)", placeholder: "e.g., Revenue flat but MQLs declining", type: "textarea" },
        { id: "red-metric", label: "Which metric is 'Red' (broken)?", placeholder: "e.g., MQL-to-Customer conversion is only 5%", type: "textarea" }
      ]
    },
    {
      id: "action",
      title: "This Week's Fix",
      fields: [
        { id: "one-action", label: "ONE action to fix the Red metric", placeholder: "e.g., Rewrite sales email sequence to address top objection", type: "textarea" }
      ]
    }
  ]}
/>

---

## Quiz: Marketing Analytics Mastery

```json
{
  "quizId": "marketing-analytics",
  "title": "Mastering Your Marketing Dashboard",
  "questions": [
    {
      "id": "ma1",
      "type": "multiple-choice",
      "text": "What is the difference between a Leading Indicator and a Lagging Indicator?",
      "options": [
        { "id": "a", "text": "One is faster." },
        { "id": "b", "text": "Lagging tells you what happened (Revenue); Leading predicts what will happen (Pipeline/Leads)." },
        { "id": "c", "text": "Leading is better." },
        { "id": "d", "text": "There is no difference." }
      ],
      "correctAnswer": "b",
      "explanation": "You can't change Lagging indicators (history). You CAN change Leading indicators (future). Focus your daily effort on Leading indicators (generating MQLs) to influence tomorrow's revenue."
    },
    {
      "id": "ma2",
      "type": "multiple-choice",
      "text": "What is the target LTV:CAC ratio for a healthy, scalable business?",
      "options": [
        { "id": "a", "text": "1:1" },
        { "id": "b", "text": "3:1" },
        { "id": "c", "text": "10:1" },
        { "id": "d", "text": "0:1" }
      ],
      "correctAnswer": "b",
      "explanation": "3:1 is the industry standard. It means you make enough profit to cover the cost of acquisition, overhead, and service delivery, while still having margin to grow."
    },
    {
      "id": "ma3",
      "type": "true-false",
      "text": "True or False: 'Total Page Views' is a critical metric for business health.",
      "correctAnswer": "false",
      "explanation": "False. It is a vanity metric. You can have 1 million views and $0 revenue. Focus on Conversion Rate and Qualified Leads instead."
    },
    {
      "id": "ma4",
      "type": "multiple-choice",
      "text": "Why do we recommend manual data entry for early-stage founders (Level 1)?",
      "options": [
        { "id": "a", "text": "Founders are bad at automation." },
        { "id": "b", "text": "The pain of typing '0' forces you to confront reality and act." },
        { "id": "c", "text": "Software is too expensive." },
        { "id": "d", "text": "Spreadsheets look nicer." }
      ],
      "correctAnswer": "b",
      "explanation": "Automation breeds complacency in the early days. Manual entry creates a visceral connection to your performance."
    },
    {
      "id": "ma5",
      "type": "multiple-choice",
      "text": "If you have high traffic and high leads, but low sales, where is the leak?",
      "options": [
        { "id": "a", "text": "Top of Funnel (Ads)." },
        { "id": "b", "text": "Bottom of Funnel (Sales/Pricing)." },
        { "id": "c", "text": "Middle of Funnel." },
        { "id": "d", "text": "Your logo." }
      ],
      "correctAnswer": "b",
      "explanation": "The bottleneck is at the conversion step (MQL -> Customer). This usually points to a pricing issue, a trust issue, or a poor closing process."
    }
  ]
}
```

**Next Lesson:** [Attribution Modeling for Solopreneurs](/academy/course-12-marketing-automation-analytics/10)