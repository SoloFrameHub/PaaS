---
title: "Pipeline Visualizations: Beyond the Kanban"
duration: "50 min"
track: "Sales Methodology"
course: "Course 20: Sales Pipeline Management"
lesson: 9
---

# Pipeline Visualizations: Beyond the Kanban

Most founders use a standard "Kanban" board (columns for stages). While useful, Kanban is a **Static** view. In 2026, the elite solo founder uses **Multi-Dimensional Visualizations** to spot risks that columns don't show. (2026 Research on Sales Data Visualization).

You need to see the **Health**, not just the **Stage.**

<InsightCard icon="📊" title="The Visualization Shift">
Kanban shows you WHERE deals are. Advanced visualizations show you WHICH deals are dying and WHY.
</InsightCard>

<RangeSlider label="How often do you review your pipeline visually?" min={1} max={10} lowLabel="Rarely check" highLabel="Daily review" persistKey="pipeline-management-L9-review-frequency" />

---

## 1. The "Bubble" Chart: Value vs. Time

Instead of just looking at where a deal is, look at how "Heavy" it is.
*   **X-Axis:** Days in Pipeline.
*   **Y-Axis:** Deal Value.
*   **Bubble Size:** Engagement (Email volume/Call count).
*   **The Risk Zone:** Large bubbles (High value) that are far to the right (Old deals) but have small size (Low engagement) are your "Dead Whales." Kill them. (Lesson 2).

<SwipeDecision
  title="Dead Whale or Healthy Deal?"
  description="Swipe right for healthy deals, left for dead whales that should be killed"
  optionA="Dead Whale"
  optionB="Healthy Deal"
  persistKey="pipeline-management-L9-whale-swipe"
  cards={[
    { id: "1", content: "$50K deal, 90 days in pipeline, 2 emails sent in last month", correctOption: "a", explanation: "High value + old + low engagement = Dead Whale. Kill it or revive with aggressive action." },
    { id: "2", content: "$15K deal, 30 days in pipeline, 8 touchpoints this month", correctOption: "b", explanation: "Moderate age with high engagement shows active momentum." },
    { id: "3", content: "$80K deal, 120 days in pipeline, 1 call in last 6 weeks", correctOption: "a", explanation: "Massive value sitting stagnant. This is the classic Dead Whale—cut it loose." },
    { id: "4", content: "$25K deal, 45 days in pipeline, weekly calls scheduled", correctOption: "b", explanation: "Regular cadence and reasonable timeline indicate healthy progression." }
  ]}
/>

<ExampleCard label="Case Study: The $60K Dead Whale">
Marcus had a $60K enterprise deal that had been "in legal review" for 4 months. His Kanban showed it in the "Contract" stage—looked fine. But on a bubble chart, it was a massive circle far to the right with tiny engagement size. He called the champion: "We went with another vendor 6 weeks ago, just forgot to tell you." The bubble chart would have flagged this 2 months earlier.
</ExampleCard>

---

## 2. The "Sunburst" Chart: Stakeholder Coverage

For complex B2B deals, you need to visualize **Multi-Threading**. (Lesson 5).
*   **The View:** A circle divided into departments (IT, Finance, Marketing, HR).
*   **The Signal:** If a $20k deal only has one "Slice" (Marketing) lit up, you are at high risk of a "Shadow Committee" veto.
*   **The Action:** The visual tells you exactly where to go next: *"I need to connect with IT to light up that slice."*

<ClassifyExercise
  title="Stakeholder Coverage Assessment"
  persistKey="pipeline-management-L9-stakeholder-classify"
  categories={[
    { id: "high-risk", label: "High Risk (1-2 departments)", color: "#ef4444" },
    { id: "medium-risk", label: "Medium Risk (3 departments)", color: "#f59e0b" },
    { id: "well-threaded", label: "Well-Threaded (4+ departments)", color: "#10b981" }
  ]}
  items={[
    { id: "1", content: "$40K deal: Contacts in Marketing only", correctCategory: "high-risk" },
    { id: "2", content: "$25K deal: Contacts in Marketing, IT, Finance", correctCategory: "medium-risk" },
    { id: "3", content: "$60K deal: Contacts in Marketing, IT, Finance, Operations, HR", correctCategory: "well-threaded" },
    { id: "4", content: "$15K deal: Contacts in Sales and Marketing", correctCategory: "high-risk" },
    { id: "5", content: "$50K deal: Contacts in IT, Finance, Legal, Executive", correctCategory: "well-threaded" }
  ]}
/>

---

## 3. The "Flow" Diagram (Sankey): Where is the Leak?

A Sankey diagram shows you the narrow points in your pipeline.
*   **The Insight:** You might have 100 leads at the top, but a massive drop-off between "Demo" and "Proposal."
*   **The Fix:** This tells you the problem isn't your prospecting; it's your Demo Architecture. (Course 16).

<ScenarioSimulator
  title="Pipeline Flow Analyzer"
  persistKey="pipeline-management-L9-flow-simulator"
  levers={[
    { id: "leads", label: "Monthly Leads", min: 50, max: 500, step: 50, defaultValue: 200 },
    { id: "demoRate", label: "Lead → Demo (%)", min: 10, max: 50, step: 5, defaultValue: 25 },
    { id: "proposalRate", label: "Demo → Proposal (%)", min: 10, max: 70, step: 5, defaultValue: 40 },
    { id: "closeRate", label: "Proposal → Close (%)", min: 10, max: 60, step: 5, defaultValue: 30 }
  ]}
  outputs={[
    { id: "demos", label: "Monthly Demos", formula: "leads * (demoRate / 100)", unit: "", precision: 0 },
    { id: "proposals", label: "Monthly Proposals", formula: "leads * (demoRate / 100) * (proposalRate / 100)", unit: "", precision: 0 },
    { id: "closes", label: "Monthly Closes", formula: "leads * (demoRate / 100) * (proposalRate / 100) * (closeRate / 100)", unit: "", precision: 1 }
  ]}
  insight="If your Demo → Proposal rate is below 40%, you have a demo problem. If Proposal → Close is below 25%, you have a pricing/objection handling problem. Fix the bottleneck, not the top of funnel."
/>

<PredictionGate
  question="Sarah has 150 leads/month, 30% convert to demos, but only 15% of demos convert to proposals. Where should she focus her improvement efforts?"
  persistKey="pipeline-management-L9-bottleneck-predict"
  type="choice"
  choices={[
    { id: "a", text: "Get more leads—150 isn't enough" },
    { id: "b", text: "Fix her demo process—that's the bottleneck" },
    { id: "c", text: "Improve her proposal templates" },
    { id: "d", text: "Hire a sales assistant" }
  ]}
  correctId="b"
>
The bottleneck is the **Demo → Proposal conversion at 15%**. Even if she doubled her leads to 300, she'd still only get ~7 proposals (300 × 30% × 15%). But if she fixes her demo to convert at 40%, her current 150 leads would generate 18 proposals—2.5x improvement without more leads. **Always fix the narrowest point in the flow first.**
</PredictionGate>

---

## 4. The "Velocity" Dashboard (The Speedometer)

In 2026, you should have a single "Speedometer" for your pipeline. (2025 State of Sales).
*   **The Metric:** Average time to move a deal from stage A to stage B.
*   **The Red Line:** If your "Velocity" drops by more than 10% month-over-month, it's a leading indicator of a future revenue slump.

<FlipCard front="Pipeline Velocity Formula" back="Velocity = (Number of Opportunities × Average Deal Value × Win Rate) ÷ Average Sales Cycle Length. A 10% velocity drop means revenue problems in 60-90 days." />

<InteractiveChecklist title="Your Visualization Action Plan" persistKey="pipeline-management-L9-actions" items={["Audit your current pipeline for 'Dead Whales' (high value + old + low engagement)", "Map stakeholder coverage for your top 3 deals—identify missing departments", "Calculate your conversion rates at each stage to find your bottleneck", "Set up a monthly velocity tracking dashboard", "Schedule weekly 15-min pipeline visualization reviews"]} />

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Your data skills are perfect for this. Build a simple Python script or Google Sheets dashboard that auto-generates these visualizations from your CRM export. Most CRMs have terrible built-in visualization—you can build better in an afternoon.
</ContextualNote>

---

## Quiz: Pipeline Visualization

```json
{
  "quizId": "pipeline-visualization-2026",
  "title": "Mapping the Hidden Risks",
  "questions": [
    {
      "id": "pv20091",
      "type": "multiple-choice",
      "text": "Why is a 'Bubble' chart (Value vs. Time) more useful than a standard Kanban board for a busy founder?",
      "options": [
        { "id": "a", "text": "It uses more colors." },
        { "id": "b", "text": "It allows you to instantly identify 'Dead Whales'—high-value deals that have been in the pipeline too long without engagement—which a Kanban board hides in its columns." },
        { "id": "c", "text": "It helps you calculate sales tax." },
        { "id": "d", "text": "It makes you look more professional to investors." }
      ],
      "correctAnswer": "b",
      "explanation": "Kanban boards treat all deals in a column as equal. A bubble chart adds the dimension of'Time' and'Probability', highlighting which high-stakes deals are actually in danger of rotting away due to neglect or friction."
    },
    {
      "id": "pv20092",
      "type": "multiple-choice",
      "text": "What does a 'Sankey' (Flow) diagram reveal about your sales process?",
      "options": [
        { "id": "a", "text": "Exactly which step in your funnel is causing the most 'Leakage' (e.g., if you have a massive drop-off between Demo and Proposal), allowing you to fix the specific skill gap." },
        { "id": "b", "text": "The names of the best prospects." },
        { "id": "c", "text": "How many emails you've sent today." },
        { "id": "d", "text": "The total amount of money in the bank." }
      ],
      "correctAnswer": "a",
      "explanation": "Visualizing the flow allows you to see the volume of deals at each stage and where they disappear. If the'neck' is at the Demo stage, it doesn't matter how many more leads you get—you have a Demo problem that must be fixed first."
    }
  ]
}