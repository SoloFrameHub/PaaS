---
title: "Comprehensive Discovery with Cooperative Prospects"
duration: "60 min"
track: "Sales Methodology"
course: "Course 15: Discovery Call Simulations"
lesson: 3
---

# Comprehensive Discovery with Cooperative Prospects

BANT (Budget, Authority, Need, Timeline) tells you whether a prospect **can** buy from you. But it doesn't always tell you whether they **will** buy. For solo founders selling complex solutions, you need a deeper diagnostic tool: the **PID Model** (Pain, Impact, and Decision). (2025 State of Sales).

Think of BANT as an X-ray (Is anything broken?) and PID as an MRI (What is the root cause and strategic consequence?). In this lesson, you will practice comprehensive discovery with the **High-C (Conscientious)** personality—the logical, detail-oriented buyer who speaks "Excel."

<InsightCard icon="🔬" title="The Diagnostic Shift">
BANT = X-ray (Can they buy?)
PID = MRI (Will they buy?)
</InsightCard>

---

## 1. The PID Model: The Strategic MRI

<SlideNavigation>
<Slide title="Level 1: Root Cause Pain">

### Level 1: Root Cause Pain (The 'P')
Industrial-age selling stops at surface pain (*"We need better security"*). 2026 methodology digs for the catalyst. (2026 Acquisition Trends).
*   **The Script:** *"Walk me through the specific technical failure that led your team to prioritize this infrastructure change today."*

<ExampleCard label="Surface vs. Root Cause">
**Surface Pain:** "We need better security."
**Root Cause:** "Our SOC 2 audit failed because we can't prove access controls, which blocks our enterprise pipeline worth $2M ARR."
</ExampleCard>

</Slide>

<Slide title="Level 2: Quantified Impact">

### Level 2: Quantified Impact (The 'I')
Pain without a number is just a complaint. You must move from "annoyance" to **Cost of Inaction (COI)**. (2025 State of Buyer Behavior).
*   **The Script:** *"If conversion stays at 2% for another quarter, what does that math look like in terms of lost P&L revenue compared to your Q1 targets?"*

<ScenarioSimulator
  title="Cost of Inaction Calculator"
  persistKey="course-15-discovery-simulations-L3-coi"
  levers={[
    { id: "currentConversion", label: "Current conversion rate (%)", min: 1, max: 10, step: 0.5, defaultValue: 2 },
    { id: "targetConversion", label: "Target conversion rate (%)", min: 2, max: 15, step: 0.5, defaultValue: 5 },
    { id: "monthlyTraffic", label: "Monthly qualified leads", min: 100, max: 5000, step: 100, defaultValue: 1000 },
    { id: "avgDealSize", label: "Average deal size ($)", min: 1000, max: 50000, step: 1000, defaultValue: 10000 }
  ]}
  outputs={[
    { id: "currentRevenue", label: "Current monthly revenue", formula: "(monthlyTraffic * (currentConversion / 100) * avgDealSize)", unit: "$", precision: 0 },
    { id: "targetRevenue", label: "Target monthly revenue", formula: "(monthlyTraffic * (targetConversion / 100) * avgDealSize)", unit: "$", precision: 0 },
    { id: "quarterlyGap", label: "Quarterly revenue gap", formula: "((monthlyTraffic * (targetConversion / 100) * avgDealSize) - (monthlyTraffic * (currentConversion / 100) * avgDealSize)) * 3", unit: "$", precision: 0 }
  ]}
  insight="At this gap, every month of delay costs ${(monthlyTraffic * ((targetConversion - currentConversion) / 100) * avgDealSize).toFixed(0)} in lost revenue."
/>

</Slide>

<Slide title="Level 3: Decision Landscape">

### Level 3: Decision Landscape (The 'D')
You must map the **Decision Criteria** (the grading rubric) and the **Decision Process** (the paper trail).
*   **The Script:** *"Besides the technical specs, what are the three economic criteria your CFO will use to justify the payback period of this investment?"*

<TemplateBuilder
  title="Decision Landscape Map"
  persistKey="course-15-discovery-simulations-L3-decision"
  sections={[
    {
      id: "criteria",
      title: "Decision Criteria",
      fields: [
        { id: "technical", label: "Technical Requirements", placeholder: "e.g., Must integrate with Salesforce API", type: "text" },
        { id: "economic", label: "Economic Criteria", placeholder: "e.g., ROI within 6 months", type: "text" },
        { id: "strategic", label: "Strategic Priorities", placeholder: "e.g., Supports Q2 enterprise push", type: "text" }
      ]
    },
    {
      id: "process",
      title: "Decision Process",
      fields: [
        { id: "stakeholders", label: "Key Stakeholders", placeholder: "e.g., CTO, CFO, VP Sales", type: "text" },
        { id: "timeline", label: "Decision Timeline", placeholder: "e.g., Vendor selection by March 15", type: "text" },
        { id: "approval", label: "Approval Steps", placeholder: "e.g., Tech eval → CFO review → Board approval", type: "textarea" }
      ]
    }
  ]}
/>

</Slide>
</SlideNavigation>

---

## 2. The High-C Profile (Logical Compass / Slow Motor)

When configuring your practice session:
*   **Tone:** Analytical, skeptical of hyperbole, and detail-obsessed.
*   **The Strategy:** Do not use "raport-building" fluff. Lead with **Data and Logic**.
*   **The Benchmark:** Maintain the **Expert Frame**. Top-performing reps talk **54-58% of the time** because they are providing the structural summary and peer benchmarks that the High-C craves. (2025 Benchmarks).

<FlipCard 
  front="Why do top reps talk MORE with High-C buyers?" 
  back="High-C personalities value expertise over rapport. They want consultative summaries, industry benchmarks, and logical frameworks—not small talk. Your 54-58% talk time establishes the Expert Frame they trust." 
/>

<RangeSlider 
  label="How comfortable are you leading with data instead of rapport?" 
  min={1} 
  max={10} 
  lowLabel="Prefer relationship-first" 
  highLabel="Data-first is natural" 
  persistKey="course-15-discovery-simulations-L3-comfort" 
/>

---

## 3. Simulation Drills: The MRI Deep Dive

### Drill 1: The "Gap Analysis"
*   **Scenario:** A tech lead (High-C) has a working but "messy" system.
*   **Your Task:** Uncover the **Hidden Risk**. Ask: *"What happens to the deployment velocity if your single point of failure (Employee X) leaves the company next month?"*

<MiniRoleplay
  scenario="Tech Lead: 'Our current system works fine, it's just a bit messy.'"
  role="You are uncovering hidden risk"
  persistKey="course-15-discovery-simulations-L3-roleplay1"
  modelResponse="I hear you. When you say 'messy,' I'm curious—what happens to your deployment velocity if [Employee X who built this] leaves next month? Most teams we work with discover that 'messy but working' becomes 'broken and blocking' when knowledge walks out the door. Have you quantified that bus factor risk?"
/>

### Drill 2: "Poisoning the Well"
*   **Scenario:** The prospect is comparing you to a cheaper competitor.
*   **Your Task:** Add a **Decision Criterion** that favors you. Ask: *"How critical is Real-Time Sync to your team? I ask because if the dashboard has a 24-hour lag, the ROI on your daily optimization drops by 30%."*

<RewriteExercise
  title="Add a Decision Criterion"
  persistKey="course-15-discovery-simulations-L3-rewrite"
  original="Prospect: 'We're also looking at [Cheaper Competitor].' You: 'Well, we have better features.'"
  hint="Introduce a specific criterion that exposes the competitor's weakness"
  expertRewrite="That's smart to compare. One question before you decide: How critical is real-time sync to your optimization workflow? I ask because if your dashboard has a 24-hour data lag, your team loses the ability to adjust campaigns mid-day—which our clients tell us costs about 30% of the ROI. Does [Competitor] offer sub-hour refresh?"
  criteria={["Introduces a specific technical criterion", "Quantifies the business impact", "Frames as a question, not a claim"]}
/>

<InteractiveChecklist 
  title="Your Discovery Prep Checklist" 
  persistKey="course-15-discovery-simulations-L3-prep" 
  items={[
    "Research prospect's tech stack to identify single points of failure",
    "Prepare 3 industry benchmarks relevant to their vertical",
    "Draft 2-3 'poisoning the well' questions that highlight your differentiators",
    "Map likely decision criteria (technical, economic, strategic)",
    "Identify the CFO's typical ROI requirements for this type of investment",
    "Practice quantifying Cost of Inaction with real numbers"
  ]} 
/>

---

## Quiz: Leading the Logical Buyer

```json
{
  "quizId": "pid-logical-2026",
  "title": "Mastering the Strategic MRI",
  "questions": [
    {
      "id": "pl1531",
      "type": "multiple-choice",
      "text": "What is the primary objective of 'Impact' quantification in the PID model?",
      "options": [
        { "id": "a", "text": "To make the prospect feel bad about their business." },
        { "id": "b", "text": "To move the conversation from tactical 'features' to economic 'consequences,' creating a quantifiable business case for the CFO." },
        { "id": "c", "text": "To justify a higher price than your competitors." },
        { "id": "d", "text": "To see if the prospect is good at math." }
      ],
      "correctAnswer": "b",
      "explanation": "Pain is emotional; Impact is logical. By getting the prospect to agree that a problem costs $X per month, you are co-authoring the justification for your solution's price before you even show the demo."
    },
    {
      "id": "pl1532",
      "type": "multiple-choice",
      "text": "How should you adapt your talk-time ratio when speaking to a High-C (Conscientious) prospect?",
      "options": [
        { "id": "a", "text": "Talk even less (20%) to let them analyze." },
        { "id": "b", "text": "Maintain your 54-58% talk time by providing high-value summaries, industry benchmarks, and logical evidence that validates their internal analysis." },
        { "id": "c", "text": "Focus 100% on small talk and hobbies to make them like you." },
        { "id": "d", "text": "Read your technical documentation out loud." }
      ],
      "correctAnswer": "b",
      "explanation": "High-C types value expertise above all else. They don't want a 'friend'; they want a consultant. By summarizing their complex pain into a logical business impact and providing prescriptive next steps, you establish the Expert Frame they trust."
    }
  ]
}
```

**Next Lesson:** [Handling Guarded Prospects](/sales-methodology/course-15-discovery-simulations/lesson-4)