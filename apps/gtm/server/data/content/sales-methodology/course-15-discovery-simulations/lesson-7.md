---
title: "Multi-Stakeholder Discovery Scenarios"
duration: "55 min"
track: "Sales Methodology"
course: "Course 15: Discovery Call Simulations"
lesson: 7
---

# Multi-Stakeholder Discovery Scenarios: The Consensus Ecosystem

In the early days of a solo venture, you might speak directly to the founder. But as your deals increase in size, you will run into the **Consensus Ecosystem**. (2025 State of Sales). This is the point where a single "Yes" isn't enough to close a deal, but a single "No" is enough to kill it.

<InsightCard icon="⚠️" title="The Solo Founder's Trap">
The #1 mistake solo founders make is treating every person on the call the same. You cannot give a technical deep-dive to a CEO, nor can you talk broad ROI to a Security Lead.
</InsightCard>

This lesson focuses on **Multiplexing** your discovery for multiple roles.

<RangeSlider 
  label="How often do you encounter multi-stakeholder buying committees?" 
  min={1} 
  max={10} 
  lowLabel="Rarely" 
  highLabel="Every deal" 
  persistKey="course-15-discovery-simulations-L7-frequency" 
/>

---

## 1. Mapping the Roles & Motivations

<SlideNavigation>
<Slide title="The Economic Buyer (CFO / CEO)">

### The Economic Buyer (CFO / CEO)
*   **Compass:** Logical (Excel-Focused).
*   **Motivation:** ROI, Risk Mitigation, Payback Period.
*   **The Trap:** Do not talk features. Talk **Capital Efficiency**. (2026 Acquisition Trends).

<FlipCard 
  front="What does the Economic Buyer care about most?" 
  back="Capital Efficiency: They only sign if $1 invested returns $5+ to the business. In high-interest rate environments, ROI and payback period dominate every decision." 
/>

</Slide>

<Slide title="The Technical Gatekeeper (CTO / Security Lead)">

### The Technical Gatekeeper (CTO / Security Lead)
*   **Compass:** Logical (Specs-Focused).
*   **Motivation:** Stability, Security, "Do I have to maintain this?"
*   **The Trap:** They possession the power of Veto. You must satisfy their **Decision Criteria** early.

<ExampleCard label="Real Scenario: The Security Veto">
A solo founder spent 3 months nurturing a $50K deal with the VP of Marketing. On the final call, the Security Lead asked: "Where are your SOC 2 docs?" The founder didn't have them. Deal dead in 30 seconds.
</ExampleCard>

</Slide>

<Slide title="The Champion (The Internal Seller)">

### The Champion (The Internal Seller)
*   **Compass:** Emotional (Morale/Reputation).
*   **Motivation:** Solving their personal burnout or looking like a hero to the CEO.
*   **The Champion Test:** Ask them for a specific internal document (e.g., Security Questionnaire). If they won't do it, they are a **Coach**, not a Champion. (2025 State of Buyer Behavior).

<SwipeDecision
  title="Champion or Coach?"
  description="Swipe right for true Champions, left for Coaches"
  optionA="Coach"
  optionB="Champion"
  persistKey="course-15-discovery-simulations-L7-champion-test"
  cards={[
    { 
      id: "1", 
      content: "Contact says: 'I love this! I'll mention it to my boss next week.'", 
      correctOption: "a", 
      explanation: "This is passive support. A Coach gives information but won't take action or risk political capital." 
    },
    { 
      id: "2", 
      content: "Contact says: 'Let me set up a call with our CFO and I'll prep her on why we need this.'", 
      correctOption: "b", 
      explanation: "This is active selling. A Champion uses their internal reputation to pull the deal through." 
    },
    { 
      id: "3", 
      content: "Contact says: 'I can send you our security questionnaire so you can get ahead of that.'", 
      correctOption: "b", 
      explanation: "Taking concrete action that requires internal effort = Champion behavior." 
    },
    { 
      id: "4", 
      content: "Contact says: 'Yeah, the CTO would probably like this. You should reach out to him.'", 
      correctOption: "a", 
      explanation: "Deflecting responsibility instead of making the introduction = Coach, not Champion." 
    }
  ]}
/>

</Slide>
</SlideNavigation>

---

## 2. The "Bridge" Technique

When both the CEO and CTO are on a call, you must "Multiplex" your communication. Use the **Bridge Pattern**:
1.  **Direct Answer:** Answer the CTO's technical question.
2.  **Strategic Pivot:** Immediately tie that answer to the CEO's business goal.

**The Script:** *"Sarah (CTO), yes, we use GraphQL to handle that latency. John (CEO), for your team, that means the 30% drop in user conversion we talked about earlier is eliminated at the source."*

<RewriteExercise
  title="Practice the Bridge Technique"
  persistKey="course-15-discovery-simulations-L7-bridge-rewrite"
  original="CTO asks: 'How does your API handle rate limiting?' You answer: 'We use token bucket algorithm with configurable thresholds.'"
  hint="Add a strategic pivot that connects to the CEO's business concern about uptime and customer retention"
  expertRewrite="CTO: 'How does your API handle rate limiting?' You: 'Sarah, we use a token bucket algorithm with configurable thresholds—you can set those in the dashboard. John, for your team, that means the 99.9% uptime SLA you need for enterprise customers is protected at the infrastructure level, not just promised in a contract.'"
  criteria={[
    "Answers the technical question directly",
    "Names both stakeholders by name",
    "Connects technical answer to CEO's business outcome",
    "Uses specific metrics or outcomes"
  ]}
/>

---

## 3. Simulation Drills: The Boardroom Close

### Drill 1: The "Champion Test"
*   **Scenario:** A manager (High-I) loves your tool and says they can "get it through."
*   **Your Task:** Test their authority. *"I appreciate the enthusiasm. Usually, for a project of this scale, the CFO needs to see a specific risk audit. Can you introduce me to the finance lead so we can co-author that business case?"*

<MiniRoleplay
  scenario="A mid-level manager says: 'I love this tool! I can definitely get budget approval for this.'"
  role="You are the founder testing if they're a true Champion"
  persistKey="course-15-discovery-simulations-L7-roleplay-champion"
  modelResponse="That's great to hear! In my experience, for a project at this investment level, the CFO usually wants to see a specific business case around ROI and risk mitigation. Would you be comfortable introducing me to your finance lead so we can co-author that together? I can bring the template and data."
/>

### Drill 2: Handling the "No" Gatekeeper
*   **Scenario:** A security lead is blocking you because you're a "small vendor."
*   **Your Task:** Use **Solo Founder Differentiators** (Speed/Agility). (2025 Benchmarks).

<MiniRoleplay
  scenario="Security Lead says: 'We typically only work with enterprise vendors. You're a solo founder—what happens if you get hit by a bus?'"
  role="You are the founder turning size into an advantage"
  persistKey="course-15-discovery-simulations-L7-roleplay-gatekeeper"
  modelResponse="That's a fair concern. Here's how three of our enterprise clients think about it: First, all code is in escrow with Iron Mountain—you own it if anything happens to me. Second, because I'm solo, you get 4-hour response times instead of 4-day ticket queues. When [Enterprise Client] had a critical security patch needed, I shipped it same-day. Their previous vendor took 6 weeks. The 'bus risk' is real, but so is the 'bureaucracy risk' with large vendors. Which risk is more expensive for your team?"
/>

---

## Your Multi-Stakeholder Action Plan

<InteractiveChecklist 
  title="Multi-Stakeholder Discovery Checklist" 
  persistKey="course-15-discovery-simulations-L7-actions" 
  items={[
    "Map the buying committee for your next deal (Economic Buyer, Technical Gatekeeper, Champion)",
    "Test your current 'champion' with a concrete ask (e.g., 'Can you introduce me to the CFO?')",
    "Prepare a 'Bridge' script for your next multi-stakeholder call",
    "Document your solo founder differentiators for handling 'small vendor' objections",
    "Create a stakeholder-specific one-pager (CEO version vs. CTO version of your pitch)"
  ]} 
/>

---

## Quiz: Navigating the Buying Committee

```json
{
  "quizId": "multi-stakeholder-2026",
  "title": "Mastering the Consensus Map",
  "questions": [
    {
      "id": "ms1571",
      "type": "multiple-choice",
      "text": "What is the primary motivation of the 'Economic Buyer' in 2026?",
      "options": [
        { "id": "a", "text": "They want the 'coolest' new features." },
        { "id": "b", "text": "They want to minimize spending while maximizing ROI and business stability." },
        { "id": "c", "text": "They want to be friends with the founder." },
        { "id": "d", "text": "They don't care about the price if the product is good." }
      ],
      "correctAnswer": "b",
      "explanation": "In high-interest rate environments (2025/2026), Economic Buyers are obsessed with'Capital Efficiency'. They sign the checks, and they only do so if you can prove that $1 invested in your solution returns $5+ to the business."
    },
    {
      "id": "ms1572",
      "type": "multiple-choice",
      "text": "How do you distinguish a 'Coach' from a 'Champion'?",
      "options": [
        { "id": "a", "text": "A Champion is more senior." },
        { "id": "b", "text": "A Champion is willing to take action and use their internal reputation to pull the deal through, whereas a Coach only gives you information." },
        { "id": "c", "text": "A Coach is usually in HR." },
        { "id": "d", "text": "There is no difference in MEDDIC." }
      ],
      "correctAnswer": "b",
      "explanation": "Testing is critical. If your contact says 'I'm your champion' but won't introduce you to the Economic Buyer, they are a Coach. You are single-threaded and the deal is high-risk."
    }
  ]
}
```

**Next Lesson:** [Speed Discovery Practice](/sales-methodology/course-15-discovery-simulations/lesson-8)