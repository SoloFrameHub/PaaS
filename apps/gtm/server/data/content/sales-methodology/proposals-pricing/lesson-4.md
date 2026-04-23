---
title: "Value-Based Pricing"
duration: "55 min"
track: "Sales Methodology"
course: "Course 18: Proposals, Pricing & Negotiation"
lesson: 4
---

# Value-Based Pricing: Charging for Outcomes, Not Hours

Most founders price their products based on **Cost-Plus** (hours + margin) or **Competitor-Based** (market average). Both are flawed. They commoditize your unique expertise and leave massive amounts of money on the table. (Gartner Research).

**Value-Based Pricing** ties your price to the **Economic Impact** you create for the customer. In 2026, the primary metric for every CFO is **Capital Efficiency**. If you solve a $100,000 problem, a $10,000 price isn't "expensive"—it's a 90% discount on the value created. (2025 State of Sales).

<RangeSlider label="How do you currently price your product/service?" min={1} max={5} lowLabel="Cost-Plus (hours + margin)" highLabel="Value-Based (tied to outcomes)" persistKey="proposals-pricing-L4-current-method" />

---

## 1. The Value-Based Formula

There is a logical, 3-step protocol for arriving at a value-based price.

<SlideNavigation>
<Slide title="Step 1: Quantify the Cost of Inaction (COI)">

Before you talk about price, you must quantify the "Leaking Bucket." This is extracted during discovery.
*   **Wasted Capacity:** [Hours wasted] × [Hourly Rate] × [Employees affected].
*   **Revenue Leakage:** [Qualified Leads Lost] × [Average Deal Value] × [Conversion Rate Gap].
*   **Example:** A team of 5 spends 10 hours each week on manual reconciliation. At $100/hr, that is **$260,000/year** in "Human Capital Friction."

</Slide>

<Slide title="Step 2: Quantify the Transformation Value">

What is the "Future State" worth?
*   **Hard ROI:** Direct cost savings or revenue generation.
*   **Soft ROI:** Risk mitigation (legal/security) or talent retention (reducing burnout).
*   **Example:** By automating reconciliation, you recover $200,000 in capacity and reduce data entry errors by 90%, avoiding a potential $20,000 audit fine. Total Value: **$220,000.**

</Slide>

<Slide title="Step 3: Price as a Fraction of Value (The 10x Rule)">

Your target price should generally be **10-20% of the quantified value**. (2025 Benchmarks).
*   If the value created is $220,000, a $25,000 fee represents a **nearly 9x ROI**.
*   **The Logic:** When you can show an ROI of 10x or more, the decision becomes a simple math problem rather than a "budget battle."

</Slide>
</SlideNavigation>

<ScenarioSimulator
  title="Value-Based Pricing Calculator"
  persistKey="proposals-pricing-L4-calculator"
  levers={[
    { id: "hoursWasted", label: "Hours wasted per week (per employee)", min: 1, max: 40, step: 1, defaultValue: 10 },
    { id: "hourlyRate", label: "Average hourly rate ($)", min: 25, max: 200, step: 5, defaultValue: 100 },
    { id: "employees", label: "Number of employees affected", min: 1, max: 50, step: 1, defaultValue: 5 },
    { id: "additionalValue", label: "Additional value (risk mitigation, etc.) ($)", min: 0, max: 100000, step: 5000, defaultValue: 20000 }
  ]}
  outputs={[
    { id: "annualCost", label: "Annual Cost of Inaction", formula: "(hoursWasted * hourlyRate * employees * 52)", unit: "$", precision: 0 },
    { id: "totalValue", label: "Total Transformation Value", formula: "(hoursWasted * hourlyRate * employees * 52) + additionalValue", unit: "$", precision: 0 },
    { id: "suggestedPrice", label: "Suggested Price (15% of value)", formula: "((hoursWasted * hourlyRate * employees * 52) + additionalValue) * 0.15", unit: "$", precision: 0 },
    { id: "roi", label: "Customer ROI", formula: "(((hoursWasted * hourlyRate * employees * 52) + additionalValue) / (((hoursWasted * hourlyRate * employees * 52) + additionalValue) * 0.15))", unit: "x", precision: 1 }
  ]}
  insight="At ${suggestedPrice}, the customer gets a {roi}x return. This makes the decision a 'math problem' rather than a budget battle."
/>

---

## 2. Co-Authoring the Business Case

In 2026, you don't send a business case; you **Co-Author** it with your Champion.
*   **The Script:** *"To ensure your CFO sees the same logic we do, let's walk through the math. Based on your numbers, we're seeing [X] leakage. If we fix that, the return is [Y]. Does that math feel conservative enough for your finance team?"*
*   **Why it works:** When the Champion helps build the model, they will defend it to the "Shadow Committee" as if it were their own. (2026 Acquisition Trends).

<TemplateBuilder
  title="Co-Authored Business Case Template"
  persistKey="proposals-pricing-L4-business-case"
  sections={[
    {
      id: "current-state",
      title: "Current State (Cost of Inaction)",
      fields: [
        { id: "problem", label: "Primary Problem", placeholder: "e.g., Manual reconciliation consuming 50 hours/week", type: "textarea" },
        { id: "quantified-cost", label: "Quantified Annual Cost", placeholder: "e.g., $260,000 in wasted capacity", type: "text" }
      ]
    },
    {
      id: "future-state",
      title: "Future State (Transformation Value)",
      fields: [
        { id: "hard-roi", label: "Hard ROI (direct savings/revenue)", placeholder: "e.g., $200,000 capacity recovered", type: "text" },
        { id: "soft-roi", label: "Soft ROI (risk mitigation, retention)", placeholder: "e.g., $20,000 audit risk avoided", type: "text" },
        { id: "total-value", label: "Total Transformation Value", placeholder: "e.g., $220,000", type: "text" }
      ]
    },
    {
      id: "investment",
      title: "Investment & ROI",
      fields: [
        { id: "price", label: "Your Price", placeholder: "e.g., $25,000", type: "text" },
        { id: "roi-multiple", label: "ROI Multiple", placeholder: "e.g., 8.8x", type: "text" },
        { id: "payback-period", label: "Payback Period", placeholder: "e.g., 6 weeks", type: "text" }
      ]
    }
  ]}
/>

<InsightCard icon="🤝" title="Why Co-Authoring Works">
When your Champion builds the ROI model with you, it becomes "their number" not "the vendor's number." They will defend it with 10x more conviction when presenting to the CFO and Shadow Committee.
</InsightCard>

---

## 3. Shifting Your Metrics

Move away from "Legacy Metrics" toward **Outcome-Based Tiers**:
*   **Obsolete Metric:** *"Billed per user seat."*
*   **2026 Metric:** *"Billed per successfully automated workflow"* or *"Billed as a % of recovered revenue."*

<SwipeDecision
  title="Legacy vs. Outcome-Based Metrics"
  description="Swipe right for outcome-based metrics that align with value, left for legacy metrics that commoditize your solution"
  optionA="Legacy (Commoditized)"
  optionB="Outcome-Based (Value-Aligned)"
  persistKey="proposals-pricing-L4-metrics"
  cards={[
    { id: "1", content: "Billed per user seat", correctOption: "a", explanation: "This is a legacy SaaS metric that doesn't reflect actual value delivered. It encourages customers to minimize seats rather than maximize outcomes." },
    { id: "2", content: "Billed per successfully automated workflow", correctOption: "b", explanation: "This ties directly to the value created. The more workflows automated, the more value delivered, and the more you earn." },
    { id: "3", content: "Billed per hour of consulting", correctOption: "a", explanation: "Hourly billing penalizes efficiency. The faster you solve the problem, the less you earn—creating perverse incentives." },
    { id: "4", content: "Billed as % of recovered revenue", correctOption: "b", explanation: "Perfect alignment: you only win when the customer wins. This is the gold standard for value-based pricing." },
    { id: "5", content: "Flat monthly retainer", correctOption: "a", explanation: "While predictable, this doesn't scale with value. A client getting 10x ROI pays the same as one getting 2x ROI." },
    { id: "6", content: "Tiered pricing based on outcomes achieved", correctOption: "b", explanation: "As the customer achieves more value (more workflows, more revenue, more savings), your pricing scales proportionally." }
  ]}
/>

<ComparisonBuilder
  title="Reframe Your Pricing Metric"
  persistKey="proposals-pricing-L4-reframe"
  prompt="Take your current pricing metric and reframe it as an outcome-based metric"
  expertExample="OLD: $99/month per user seat → NEW: $499/month per automated department workflow (unlimited users)"
  criteria={["Ties to a measurable outcome", "Scales with customer value", "Removes arbitrary constraints (seats, hours, etc.)"]}
/>

<InteractiveChecklist title="Value-Based Pricing Action Items" persistKey="proposals-pricing-L4-actions" items={["Calculate the Cost of Inaction for your top 3 prospects using real discovery data", "Build a co-authored ROI model template you can use with Champions", "Identify one legacy pricing metric you're using and reframe it as outcome-based", "Practice the 'Co-Authoring Script' with a colleague or mentor", "Review your last 5 proposals—did you quantify value before presenting price?"]} />

---

## Quiz: The Math of Value

```json
{
  "quizId": "value-based-pricing-2026",
  "title": "Decoupling Fees from Labor",
  "questions": [
    {
      "id": "p1841",
      "type": "multiple-choice",
      "text": "What is the '10x Rule' in value-based pricing?",
      "options": [
        { "id": "a", "text": "Talking 10 times more than the prospect." },
        { "id": "b", "text": "Ensuring that the quantified economic value you create is at least 10 times the price you are charging, making the purchase a 'Logical No-Brainer'." },
        { "id": "c", "text": "Increasing your price by 10% every year." },
        { "id": "d", "text": "Hiring 10 employees." }
      ],
      "correctAnswer": "b",
      "explanation": "If you solve a $100k problem for $10k, the customer keeps $90k in profit. The higher the ROI ratio, the less resistance you will face from the 'Shadow Committee' (Legal/Finance), as the cost of NOT buying becomes the biggest risk."
    },
    {
      "id": "p1842",
      "type": "multiple-choice",
      "text": "Why should you 'Co-Author' the ROI model with your Champion?",
      "options": [
        { "id": "a", "text": "Because they are better at math than you." },
        { "id": "b", "text": "To ensure they feel ownership over the data, which makes them a more effective advocate when they present the case internally to the CFO." },
        { "id": "c", "text": "To save time writing the proposal." },
        { "id": "d", "text": "Because it is required by law in 2026." }
      ],
      "correctAnswer": "b",
      "explanation": "Selling in 2026 is a 'Consensus Sport'. If you provide an ROI model, it's 'the vendor's number'. If the Champion builds it with you, it's 'their number', and they will fight for it with much higher conviction."
    }
  ]
}
```

**Next Lesson:** [Price Presentation Techniques](/sales-methodology/proposals-pricing/lesson-5)