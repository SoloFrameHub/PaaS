---
title: "Speed Discovery Practice"
duration: "50 min"
track: "Sales Methodology"
course: "Course 15: Discovery Call Simulations"
lesson: 8
---

# Speed Discovery: Mastering the 15-Minute Filter

In an ideal world, every discovery call is a leisurely 45-minute deep dive. In the real world of solo founders, you often have 15 minutes. Maybe individual leads are flooding in from a product launch, or you've caught a busy executive between meetings. 

Most founders panic and speak faster. **This is a disaster.** Speed discovery is not a "rushed" conversation; it is a **Compressed Diagnostic**. (2025 State of Sales). It requires higher precision, sharper questions, and the authority to interrupt. (2026 Acquisition Trends).

<InsightCard icon="⚡" title="The Speed Paradox">
In a 15-minute call, you must speak MORE (54-58% talk time), not less. You're the guardian of the agenda—wandering kills velocity.
</InsightCard>

---

## 1. High-Velocity Protocols

### Extreme Agenda Setting (The First 30 Seconds)
You must take control immediately.
*   **The Script:** *"John, I know we only have 15 minutes. My goal is simple: I want to diagnose if [Problem] is a top-3 priority for your board today. If it is, we'll schedule a deep dive. If not, I'll give you 10 minutes back. Fair?"*

<TemplateBuilder
  title="Your 30-Second Agenda Script"
  persistKey="course-15-discovery-simulations-L8-agenda"
  sections={[
    {
      id: "opening",
      title: "Opening Control Statement",
      fields: [
        { id: "name", label: "Prospect Name", placeholder: "e.g., Sarah", type: "text" },
        { id: "timeframe", label: "Time Available", placeholder: "e.g., 15 minutes", type: "text" },
        { id: "problem", label: "Core Problem to Diagnose", placeholder: "e.g., CAC efficiency", type: "text" },
        { id: "outcome", label: "Binary Outcome", placeholder: "e.g., Schedule deep dive OR give you 10 minutes back", type: "textarea" }
      ]
    }
  ]}
/>

### The Binary Fork
In speed discovery, do not ask broad open-ended questions. Use **Binary Questions** to force a priority check.
*   **The Script:** *"Is solving [Pain X] a strategic initiative for this quarter, or are you just gathering information for 2027?"*
*   **The Result:** If they say 2027, disqualify immediately. Call over. You just saved your most valuable asset: **Focus**. (2025 State of Buyer Behavior).

<SwipeDecision
  title="Binary Fork Practice"
  description="Swipe right if this response indicates HIGH INTENT (book deep dive), left if LOW INTENT (politely end call)"
  optionA="Low Intent - End Call"
  optionB="High Intent - Book Deep Dive"
  persistKey="course-15-discovery-simulations-L8-binary"
  cards={[
    { id: "1", content: "Prospect: 'We're exploring options for next year's budget cycle.'", correctOption: "a", explanation: "Classic information-gathering. No urgency. Politely end and follow up in Q4." },
    { id: "2", content: "Prospect: 'Our board wants this solved by end of quarter—it's costing us $15K/month.'", correctOption: "b", explanation: "Clear urgency, quantified pain, executive mandate. This is a qualified opportunity." },
    { id: "3", content: "Prospect: 'I'm just curious what tools are out there.'", correctOption: "a", explanation: "No pain, no timeline. This is research, not buying intent." },
    { id: "4", content: "Prospect: 'We tried solving this internally but it's not working. Need a solution ASAP.'", correctOption: "b", explanation: "Failed internal attempt + urgency = high buying intent." }
  ]}
/>

### The "Cost of Inaction" (COI) Sprint
You have 5 minutes to put a dollar figure on the pain.
*   **The Script:** *"If you don't fix this by [Date], what is the daily leak in terms of CAC or churn? Is it closer to $500 or $5,000?"*

<FlipCard front="Why anchor with a range ($500 or $5,000)?" back="Anchoring forces quantification. Prospects who can't ballpark the cost aren't feeling real pain—they're just complaining. Real pain has a number." />

---

## 2. Talk-Time Metrics in the Sprint
Counter-intuitively, in a speed call, your talk time should remain high (**54-58%**). (2025 Benchmarks).
*   **Why?** Because you don't have time for the prospect to wander. You must lead, summarize, and prescribe with high velocity. You are the "Guardian of the Agenda."
*   **The Question Intensity:** You must maintain a **High Question-to-Statement Ratio** to keep the prospect engaged in the compression.

<RangeSlider label="In your last 15-minute call, what % of the time did YOU talk?" min={0} max={100} lowLabel="0% (all listening)" highLabel="100% (all talking)" persistKey="course-15-discovery-simulations-L8-talktime" />

---

## 3. Simulation Drills: The Elevator Filter

### Drill 1: The "Busy Exec"
*   **Scenario:** You catch a CEO who is "running to another meeting" in 10 minutes. 
*   **Your Task:** Qualify the **Economic Impact** and book a follow-up in under 600 seconds.

### Drill 2: The "Just Browsing" Inbound
*   **Scenario:** A lead says, *"I just wanted to see what you guys do."*
*   **Your Task:** Use **Intent Throttling** to uncover a hidden pain point that justifies a real discovery call.

<MiniRoleplay
  scenario="A prospect says: 'I'm just browsing—wanted to see what you guys offer.'"
  role="You are the founder responding to uncover intent"
  persistKey="course-15-discovery-simulations-L8-roleplay"
  modelResponse="That's totally fair. Quick question—what triggered you to look at solutions like ours right now? Most people who reach out are either dealing with [Pain A] or [Pain B]. Which one sounds closer to your situation?"
/>

<TimedChallenge
  title="The 10-Minute CEO Sprint"
  persistKey="course-15-discovery-simulations-L8-timed"
  timeLimit={120}
  items={[
    { id: "1", prompt: "CEO says: 'We're losing deals to competitors.' Your first question?", correctAnswer: "quantify", explanation: "Ask: 'How many deals per month? What's the average deal size?' You need economic impact immediately." },
    { id: "2", prompt: "CEO says: 'Our sales team is overwhelmed.' Your response?", correctAnswer: "binary", explanation: "Ask: 'Is fixing this a Q1 priority with budget, or are you exploring for later?' Force the fork." },
    { id: "3", prompt: "CEO says: 'I have 3 minutes left.' Your move?", correctAnswer: "coi-sprint", explanation: "Ask: 'If you don't solve this by [date], what's the monthly cost in lost revenue or wasted payroll?' Get a number, then book the deep dive." }
  ]}
/>

<InteractiveChecklist title="Your Speed Discovery Checklist" persistKey="course-15-discovery-simulations-L8-actions" items={["Practice your 30-second agenda script out loud 5 times", "Record your next 15-minute call and measure your talk-time %", "Create 3 binary fork questions for your top pain points", "Build a COI anchoring range for your primary use case (e.g., '$500 or $5,000 per month?')", "Role-play the 'Just Browsing' scenario with a peer or record yourself"]} />

---

## Quiz: The Engineering of the 15-Minute Call

```json
{
  "quizId": "speed-discovery-2026",
  "title": "Precision Under Pressure",
  "questions": [
    {
      "id": "sd1581",
      "type": "multiple-choice",
      "text": "What is the primary goal of the first 30 seconds of a speed discovery call?",
      "options": [
        { "id": "a", "text": "To tell the prospect about your background." },
        { "id": "b", "text": "To establish the 'Upfront Contract'—setting the agenda, time constraint, and binary outcome (Fit or No Fit)." },
        { "id": "c", "text": "To ask about their weekend." },
        { "id": "d", "text": "To show your pricing deck." }
      ],
      "correctAnswer": "b",
      "explanation": "In high-velocity sales, you have zero time for rapport-building fluff. Establishing control and a clear outcome in the first 30 seconds signals that you are an expert who respects their time, which immediately lowers their guard."
    },
    {
      "id": "sd1582",
      "type": "multiple-choice",
      "text": "Why is the 'Binary Fork' question useful in a 15-minute filter?",
      "options": [
        { "id": "a", "text": "It makes you look decisive." },
        { "id": "b", "text": "It forces the prospect to categorize their urgency immediately, allowing you to disqualify 'information seekers' and focus only on 'high-intent' buyers." },
        { "id": "c", "text": "It's a way to ask about their budget." },
        { "id": "d", "text": "It confuses the prospect into saying yes." }
      ],
      "correctAnswer": "b",
      "explanation": "You cannot afford to'wait and see' in a 15-minute call. By forcing a choice between'Fixing it now' or'Researching for later', you protect your calendar from low-velocity deals that would otherwise sit in your pipeline for months."
    }
  ]
}
```

**Next Lesson:** [Session Review and Pattern Analysis](/sales-methodology/course-15-discovery-simulations/lesson-9)