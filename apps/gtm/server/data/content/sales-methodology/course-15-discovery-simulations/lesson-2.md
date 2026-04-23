---
title: "Qualification with Cooperative Prospects (BANT-Style)"
duration: "60 min"
track: "Sales Methodology"
course: "Course 15: Discovery Call Simulations"
lesson: 2
---

# Qualification with Cooperative Prospects (BANT-Style)

Before you can handle a skeptical CFO or a resistant technical lead, you must master the mechanics of the conversation with prospects who *actually want to help you.* 

Cooperative prospects are the hidden gem of sales practice. These are the people who answer your questions fully, volunteer information, and maintain a supportive tone. However, they are also the most dangerous for solo founders because they trigger **Happy Ears**—the assumption that friendliness equals buying intent. (2025 State of Sales).

<InsightCard icon="⚠️" title="The Cooperative Trap">
Friendly prospects are easy to talk to, but they often lack the 'Pain Magnitude' or 'Budgetary Power' to close. If you don't use BANT to qualify them rigorously, you waste time on a 'Ghost Deal' that feels good but never pays.
</InsightCard>

In this lesson, you will use the **BANT Framework** (Budget, Authority, Need, Timeline) as a diagnostic rhythm to filter for "Real Deals" versus "Nice Chats."

---

## 1. The Cooperative Profile (High-I / High-S)

When configuring your practice session, set the prospect behavior to **Cooperative.**
*   **Response Depth:** They tell stories and share context.
*   **The Trap:** Because the conversation is pleasant, you might forget to ask about "The Money" (Budget) or "The Final Boss" (Economic Buyer).
*   **The Goal:** Maintain a 54-58% talk time while asking **39% more questions** to extract the hard data. (2025 Benchmarks).

<RangeSlider 
  label="How often do you qualify Budget and Authority with friendly prospects?" 
  min={1} 
  max={10} 
  lowLabel="Rarely/Never" 
  highLabel="Every call" 
  persistKey="course-15-discovery-simulations-L2-qualify-frequency" 
/>

---

## 2. The BANT Diagnostic Rhythm

<SlideNavigation>
<Slide title="Need: Validating the Problem">

### Need: Validating the Problem
*   **The 2026 Script:** *"You've lived with this [Pain] for 6 months. Why did today become the day you decided it was worth your time to fix it?"* (2026 Acquisition Trends).
*   **Strategy:** Find the **Catalyst**. If there is no trigger, there is no urgency.

<FlipCard 
  front="The Catalyst Question" 
  back="'Why did TODAY become the day you decided this was worth fixing?' — This reveals whether there's real urgency or just casual browsing." 
/>

</Slide>

<Slide title="Timeline: Identifying the Urgency">

### Timeline: Identifying the Urgency
*   **The 2026 Script:** *"If we don't solve this by [Date], what is the hard cost to the business in terms of lost revenue or team efficiency?"*
*   **Strategy:** Anchor to their specific go-live date. (2025 State of Buyer Behavior).

</Slide>

<Slide title="Authority: Mapping the Decision Ecosystem">

### Authority: Mapping the Decision Ecosystem
*   **The 2026 Script:** *"Besides yourself, who else would be upset if we launched this project without their specific input?"*
*   **Strategy:** Identify the "Shadow Committee" (Legal, Security, Finance).

</Slide>

<Slide title="Budget: Qualifying Financial Reality">

### Budget: Qualifying Financial Reality
*   **The 2026 Script:** *"Have you already set aside resources for this, or are we in the 'exploratory' phase where we'd need to build a business case for the CFO?"*
*   **Strategy:** Determine if the money exists or needs to be "created."

</Slide>
</SlideNavigation>

---

## 3. Simulation Drills: The Foundation

### Drill 1: The "Happy Ears" Filter
*   **Scenario:** A prospect "loves" your demo.
*   **Your Task:** Pivot to Budget and Authority immediately. *"Glad you love it! Usually, for a project of this scale, the finance team needs to see a specific ROI projection. How does your procurement process typically handle that?"*

<MiniRoleplay
  scenario="A prospect says: 'This looks amazing! I love what you've built here.'"
  role="You are the founder responding. Pivot to Budget and Authority."
  persistKey="course-15-discovery-simulations-L2-happy-ears"
  modelResponse="I'm glad it resonates! Usually for a project of this scale, the finance team needs to see a specific ROI projection. How does your procurement process typically handle that? And besides yourself, who else would need to sign off on this?"
/>

### Drill 2: The "Why Now?" Deep Dive
*   **Scenario:** A prospect has a vague need to "be more productive."
*   **Your Task:** Dig for Level 2 (Business) and Level 3 (Personal) pain.

<RewriteExercise
  title="Transform Vague Pain into Specific Urgency"
  persistKey="course-15-discovery-simulations-L2-why-now"
  original="Prospect: 'We just want to be more productive.'"
  hint="Ask about the catalyst, the timeline, and the personal/business cost of inaction"
  expertRewrite="'I hear you. You've been dealing with this productivity challenge for a while—what changed recently that made this a priority now? And if we don't solve this by [specific date], what's the hard cost to the business in terms of lost revenue or team efficiency?'"
  criteria={[
    "Asks about the catalyst/trigger event",
    "Anchors to a specific timeline or date",
    "Quantifies business or personal cost of inaction"
  ]}
/>

---

## Practice: BANT Question Bank

<TemplateBuilder
  title="Your BANT Question Script"
  persistKey="course-15-discovery-simulations-L2-bant-script"
  sections={[
    {
      id: "need",
      title: "Need Questions",
      fields: [
        { 
          id: "catalyst", 
          label: "Catalyst Question", 
          placeholder: "e.g., 'You've lived with this for 6 months. Why did today become the day you decided to fix it?'", 
          type: "textarea" 
        },
        { 
          id: "pain-level", 
          label: "Pain Magnitude Question", 
          placeholder: "e.g., 'On a scale of 1-10, how painful is this problem right now?'", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "timeline",
      title: "Timeline Questions",
      fields: [
        { 
          id: "urgency", 
          label: "Urgency Question", 
          placeholder: "e.g., 'If we don't solve this by [Date], what's the hard cost to the business?'", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "authority",
      title: "Authority Questions",
      fields: [
        { 
          id: "decision-map", 
          label: "Decision Mapping Question", 
          placeholder: "e.g., 'Besides yourself, who else would be upset if we launched this without their input?'", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "budget",
      title: "Budget Questions",
      fields: [
        { 
          id: "budget-status", 
          label: "Budget Reality Question", 
          placeholder: "e.g., 'Have you already set aside resources for this, or are we in the exploratory phase?'", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## Your Action Plan

<InteractiveChecklist 
  title="Post-Lesson Actions" 
  persistKey="course-15-discovery-simulations-L2-actions" 
  items={[
    "Review your last 3 'friendly' prospect calls and identify where you skipped Budget or Authority questions",
    "Practice the 'Why Now?' catalyst question with at least 2 prospects this week",
    "Create a BANT checklist to review before ending every discovery call",
    "Role-play the 'Happy Ears' pivot with a peer or mentor",
    "Track your qualification rate: How many cooperative prospects actually had budget and authority?"
  ]} 
/>

---

## Quiz: Filtering Cooperative Intent

```json
{
  "quizId": "bant-cooperative-2026",
  "title": "Uncovering the Truth Behind the Smile",
  "questions": [
    {
      "id": "bc1521",
      "type": "multiple-choice",
      "text": "What is the biggest danger of a 'Cooperative' prospect for a solo founder?",
      "options": [
        { "id": "a", "text": "They will stay on the call too long." },
        { "id": "b", "text": "'Happy Ears'—mistaking their friendliness and rapport for actual buying intent and financial authority." },
        { "id": "c", "text": "They will ask too many technical questions." },
        { "id": "d", "text": "There is no danger; cooperative prospects are the best leads." }
      ],
      "correctAnswer": "b",
      "explanation": "Friendly prospects are easy to talk to, but they often lack the'Pain Magnitude' or'Budgetary Power' to close. If you don't use BANT to qualify them rigorously, you waste time on a'Ghost Deal' that feels good but never pays."
    },
    {
      "id": "bc1522",
      "type": "multiple-choice",
      "text": "How should you ask about Authority without offending a friendly prospect?",
      "options": [
        { "id": "a", "text": "Ask 'Are you actually allowed to sign this?'" },
        { "id": "b", "text": "Ask 'Who else would be upset if we launched this without their input?' to map the entire decision unit as an act of service." },
        { "id": "c", "text": "Don't ask; just assume they are the boss." },
        { "id": "d", "text": "Wait until the contract is sent to find out." }
      ],
      "correctAnswer": "b",
      "explanation": "This phrasing (from Course 14) frames the question as a way to protect the project's success. It acknowledges the prospect's role while uncovering the'Shadow Committee' (Legal/IT/CFO) who could veto the deal later."
    }
  ]
}
```

**Next Lesson:** [Comprehensive Discovery with Cooperative Prospects](/sales-methodology/course-15-discovery-simulations/lesson-3)