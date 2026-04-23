---
title: "Discovery Certification Challenge"
duration: "60 min"
track: "Sales Methodology"
course: "Course 15: Discovery Call Simulations"
lesson: 10
---

# Discovery Certification Challenge: The Finals

You have reached the summit of Course 15. You have practiced with the Cooperative, the Guarded, and the Resistant. You have analyzed your "nemesis" DISC types and calibrated your **DASH Score**. Now, it is time to demonstrate mastery. (2025 State of Sales).

The **Discovery Certification Challenge** is a high-stakes simulation designed to test your ability to maintain the **Expert Frame** under pressure. You must navigate a complex **Consensus Ecosystem** and provide a clear "Pursue or Disqualify" recommendation based on hard economic data.

<InsightCard icon="🎯" title="The Stakes">
This isn't about closing every deal — it's about making the right call. A clean disqualification is worth more than a forced bad-fit implementation.
</InsightCard>

---

## 1. The Challenge Protocol: "The Boardroom Ambush"

### The Scenario Config:
*   **Stakeholders:** You are facing a **Dual-Threaded** call.
    *   **John (CEO):** High-D / Logical. Impatient and focused on Q3 ROI.
    *   **Sarah (CTO):** High-C / Logical. Skeptical and protective of the stack.
*   **The Constraint:** You have **25 minutes**. If you haven't booked a firm next step (or disqualified them) by 25:00, you fail.
*   **The Hidden "No-Fit":** There is a 50% chance this deal is fundamentally flawed (e.g., mismatched tech stack or impossible budget). (2026 Acquisition Trends).

<RangeSlider 
  label="How confident are you in handling dual-stakeholder calls right now?" 
  min={1} 
  max={10} 
  lowLabel="Need practice" 
  highLabel="Ready to go" 
  persistKey="course-15-discovery-simulations-L10-confidence" 
/>

---

## 2. The DASH Scoring Rubric

To earn your **Discovery Specialist** badge, you need a score of **85/100** across these 2026 benchmarks:

<SlideNavigation>
<Slide title="Frame Management (25 pts)">

**What you're being scored on:**
- Did you set the "Upfront Contract"?
- Did you "Multiplex" the conversation between the CEO and CTO?

**Why it matters:** Without frame control, dual-stakeholder calls devolve into competing agendas. You lose diagnostic depth and end up with a vague "let's circle back."

<FlipCard 
  front="What is 'Multiplexing' in dual-stakeholder calls?" 
  back="The ability to address both stakeholders' concerns in a single answer — validating the technical gatekeeper while keeping the conversation anchored to business outcomes the economic buyer cares about." 
/>

</Slide>

<Slide title="Diagnostic Depth (35 pts)">

**What you're being scored on:**
- Did you uncover **Level 3 Personal Pain**?
- Did you quantify the **Cost of Inaction (COI)**?

**Why it matters:** Surface-level discovery leads to price-based objections. Deep discovery creates urgency and differentiation.

**Example Level 3 Pain:**
- Level 1: "Our reports are slow"
- Level 2: "We miss SLA deadlines"
- Level 3: "I got chewed out in the board meeting because we lost our biggest client over a delayed report"

</Slide>

<Slide title="Behavioral Metrics (20 pts)">

**What you're being scored on:**
- Did you maintain **54-58% talk time**?
- Did you ask **39% more questions** than a peer? (2025 Benchmarks)

**Why it matters:** Top performers let prospects talk more. They ask follow-up questions instead of pitching features.

<ExampleCard label="The Question Ratio">
Average rep: 8 questions in 25 minutes
Top performer: 11-12 questions in 25 minutes

The difference? Follow-up questions like "What happened when you tried to solve this before?" and "How does that impact your team's morale?"
</ExampleCard>

</Slide>

<Slide title="Strategic Outcome (20 pts)">

**What you're being scored on:**
- Did you make the correct "Go/No-Go" call?

**Warning:** Closers who try to "force" a bad-fit deal automatically fail.

**The two winning outcomes:**
1. **Qualified + Next Step Booked:** Clear mutual fit, champion identified, technical validation scheduled
2. **Disqualified with Clarity:** Fundamental mismatch identified, prospect agrees it's not the right time/fit, you part professionally

**The losing outcome:**
- Vague "let's stay in touch" with no clear next step or disqualification reason

</Slide>
</SlideNavigation>

<ComparisonBuilder
  title="Your Certification Strategy"
  persistKey="course-15-discovery-simulations-L10-strategy"
  prompt="Write your 3-part strategy for the Boardroom Ambush scenario"
  expertExample="1. Frame: Set 25-min upfront contract, acknowledge both stakeholders' priorities in opening
2. Diagnostic: Use 'Bridge' technique to satisfy CTO concerns while quantifying CEO's ROI gap
3. Outcome: If tech stack mismatch surfaces, disqualify cleanly with specific reason rather than force-fit"
  criteria={[
    "Addresses both stakeholders explicitly",
    "Includes specific diagnostic technique",
    "Has clear disqualification criteria"
  ]}
/>

---

## 3. Pre-Flight Strategy

*   **Audit the Motor:** Match John's fast-paced energy, but do not sacrifice the diagnostic rigor.
*   **Honor the Compass:** Speak "Excel" to both stakeholders. Give John the ROI and Sarah the Stability. (2025 State of Buyer Behavior).
*   **The Champion Test:** Identify who will fight for you when you leave the room.

<MiniRoleplay
  scenario="Sarah (CTO) interrupts: 'How does this integrate with our legacy Oracle system?' while John (CEO) is visibly impatient."
  role="You are the founder responding"
  persistKey="course-15-discovery-simulations-L10-bridge"
  modelResponse="Great question, Sarah — integration is critical. Our API handles Oracle connections through a standard REST interface, which means your team maintains control of the data flow. John, the reason that matters for Q3 is it eliminates the 2-week manual export process that's currently delaying your month-end reports. Sarah, would a 15-minute technical deep-dive with your lead engineer next week make sense to validate the specifics?"
/>

<StrategyDuel
  title="The Disqualification Decision"
  persistKey="course-15-discovery-simulations-L10-duel"
  scenario="You discover their budget is $15K but your minimum deal size is $30K. The CEO is enthusiastic."
  strategyA={{
    name: "Pitch Down",
    description: "Offer a stripped-down version at $15K to get the logo",
    pros: ["Revenue this quarter", "Potential upsell later"],
    cons: ["Sets bad pricing precedent", "Under-resourced implementation", "Likely churn"]
  }}
  strategyB={{
    name: "Disqualify Professionally",
    description: "Explain the mismatch, offer to reconnect when budget aligns",
    pros: ["Protects pricing integrity", "Avoids bad-fit customer", "Maintains expert frame"],
    cons: ["No revenue now", "Competitor might close them"]
  }}
  expertVerdict="Strategy B wins. A $15K customer who needs $30K of service will churn, leave a bad review, and consume disproportionate support resources. Professional disqualification preserves your reputation and lets you focus on qualified deals."
/>

<InteractiveChecklist 
  title="Pre-Call Certification Checklist" 
  persistKey="course-15-discovery-simulations-L10-prep" 
  items={[
    "Review DISC profiles for both John (High-D) and Sarah (High-C)",
    "Prepare 3 'Bridge' responses that satisfy technical + business concerns",
    "Define your hard disqualification criteria (budget floor, tech requirements, timeline)",
    "Script your upfront contract for dual-stakeholder calls",
    "Identify 2-3 Level 3 pain questions specific to their roles",
    "Set a timer for 25 minutes to practice time management"
  ]} 
/>

---

## Quiz: Certification Readiness

```json
{
  "quizId": "certification-challenge-2026",
  "title": "Proving Your Proficiency",
  "questions": [
    {
      "id": "cc15101",
      "type": "multiple-choice",
      "text": "What happens if you try to 'Close' a deal that has a fundamental technical no-fit?",
      "options": [
        { "id": "a", "text": "You get extra points for persistence." },
        { "id": "b", "text": "You fail the certification: A master of discovery knows that an expert disqualification is a higher-value outcome than a failed implementation." },
        { "id": "c", "text": "The AI ignores the no-fit if your rapport is high." },
        { "id": "d", "text": "You get a partial pass." }
      ],
      "correctAnswer": "b",
      "explanation": "In 2026, the cost of 'Bad Fit' customers is higher than the benefit of their revenue. Professional founders protect their reputation and resources by disqualifying deals that aren't a perfect mechanical match for their solution."
    },
    {
      "id": "cc15102",
      "type": "multiple-choice",
      "text": "How do you handle the CTO (High-C) while the CEO (High-D) is rushing you?",
      "options": [
        { "id": "a", "text": "Focus 100% on the CEO because they have the money." },
        { "id": "b", "text": "Use the 'Bridge' technique: Briefly answer the technical concern for the CTO, then immediately pivot that answer to the business outcome the CEO cares about." },
        { "id": "c", "text": "Ask the CTO to leave the call." },
        { "id": "d", "text": "Tell the CEO to be patient." }
      ],
      "correctAnswer": "b",
      "explanation": "The 'Bridge' ensures both stakeholders feel heard without derailing the meeting. It validates the technical gatekeeper's concerns while keeping the conversation focused on the 'Economic Impact' that the CEO uses to justify the purchase."
    }
  ]
}
```

**Conclusion:** You have completed Course 15. You are now equipped to navigate the most difficult discovery environments with a practitioner's voice and an engineer's precision.

**Next Course:** [Course 16: Demo Architecture](/sales-methodology/demo-architecture/lesson-1)