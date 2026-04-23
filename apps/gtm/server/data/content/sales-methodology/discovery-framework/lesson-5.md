---
title: "Authority: Mapping Decision-Makers"
duration: "55 min"
track: "Sales Methodology"
course: "Course 14: Discovery Framework - BANT/MEDDIC"
lesson: 5
---

# Authority: Mapping Decision-Makers

You’ve had a brilliant call with a Head of Engineering. They love the tool, they see the value, and they say they're ready to buy. You send the contract. Two weeks later, you get an email: *"Hey, our CFO isn't sure about the vendor security review. We're going to hold off for now."*

**You just lost a deal to a person you never met.**

In the 2026 enterprise landscape, "Authority" isn't a single person; it is a **Consensus Ecosystem**. (2026 Acquisition Trends). To close, you must map the entire decision unit and move from the "Champion" to the "Economic Buyer."

---

## 1. The 3 Types of Authority

To navigate the "Shadow Committee," you must identify these three roles in every deal over $5k:

<SlideNavigation><Slide title="The Champion (Internal Seller)">

**Definition:** The person who feels the pain daily and wants your solution.
**The Trap:** Thinking the Champion has the power to sign. They don't.
**Your Job:** Give them the "Ammunition" (ROI docs/Slides) to sell for you when you aren't in the room.

</Slide><Slide title="The Economic Buyer (Wallet Holder)">

**Definition:** The person with the P&L (Profit & Loss) responsibility. They care about **Metrics** and **Risk**.
**The Test:** If you haven't spoken to them or seen their direct feedback, the deal is at "High Risk."

</Slide><Slide title="The Gatekeeper (Technical Blockers)">

**Definition:** Security, Legal, or IT managers. They don't have the power to say "Yes," but they have absolute power to say "No."
**Your Job:** Proactively address their Decision Criteria early to prevent the "Last-Minute Veto."

</Slide></SlideNavigation>

### The Champion (The Internal Seller)
*   **Definition:** The person who feels the pain daily and wants your solution.
*   **The Trap:** Thinking the Champion has the power to sign. They don't.
*   **Your Job:** Give them the "Ammunition" (ROI docs/Slides) to sell for you when you aren't in the room.

### The Economic Buyer (The Wallet Holder)
*   **Definition:** The person with the P&L (Profit & Loss) responsibility. They care about **Metrics** and **Risk**. (2025 State of Sales).
*   **The Test:** If you haven't spoken to them or seen their direct feedback, the deal is at "High Risk."

### The Gatekeeper (The Technical Blockers)
*   **Definition:** Security, Legal, or IT managers. They don't have the power to say "Yes," but they have absolute power to say "No."
*   **Your Job:** Proactively address their Decision Criteria early to prevent the "Last-Minute Veto."

---

## 2. Converting a "Coach" into a "Champion"

Many founders confuse a **Coach** (someone who is friendly and gives you info) with a **Champion** (someone who will spend political capital to get you hired).

<DecisionTree title="Coach or Champion? The Litmus Test" persistKey="discovery-L5-tree" startNodeId="start"
  nodes={[{ id: "start", content: "You ask your contact: 'Can you help me get 15 minutes on the CFO's calendar to go over the ROI math?'",
    choices: [{ label: "They say: 'Absolutely, let me set that up for Thursday.'", nextNodeId: "champion" },
      { label: "They say: 'Oh, the CFO is really busy. Just talk to me, I'll pass it along.'", nextNodeId: "coach" }]},
    { id: "champion", content: "You have a Champion. They are willing to spend political capital to get you in front of the Economic Buyer. This deal has real momentum.", isTerminal: true, outcome: "positive" },
    { id: "coach", content: "You have a Coach, not a Champion. They like you but have no power or willingness to fight internally. This deal is at high risk of dying in 'No Decision.'",
      choices: [{ label: "Ask for a different path to the EB: 'Is there another stakeholder who could introduce us?'", nextNodeId: "pivot" },
        { label: "Accept it and hope for the best", nextNodeId: "hope" }]},
    { id: "pivot", content: "Smart. You're multi-threading the deal. Even if this contact can't champion you, finding another path to the EB keeps the deal alive.", isTerminal: true, outcome: "positive" },
    { id: "hope", content: "The deal dies in 'No Decision' 3 months later. The Coach sends a friendly email: 'Sorry, timing wasn't right.' You wasted a quarter.", isTerminal: true, outcome: "negative" }]}
/>

**The Champion Test:**
*"To make sure the CFO sees the ROI of this by Friday, I'll need a 15-minute slot on their calendar to go over the math. Can you help me set that up?"* (2025 State of Buyer Behavior).
*   **If they say Yes:** You have a Champion.
*   **If they say No:** You have a Coach.

---

## 3. Navigating the "Hidden Buyer" (Spouses and Partners)

In the Creator or Agency space, the "Hidden Buyer" is often a spouse or a business partner. Failing to acknowledge them is the #1 reason for "I need to talk to my wife" ghosting.
*   **The Script:** *"Is this a decision you usually make solo, or is there a partner or peer whose input you'd want to run this by before we finalize the launch date?"*

---

## 4. Key Takeaways

<InteractiveChecklist title="Authority Mapping Checklist" persistKey="discovery-L5-actions" items={["Identify the Economic Buyer: 'Whose budget does this come from?'", "Avoid Single-Threading: get 2+ stakeholder relationships", "Arm your Champion with ROI docs and security whitepapers", "Test your Champion: ask for something slightly difficult", "Address the Hidden Buyer (spouse/partner in SMB/creator deals)", "Proactively address Gatekeeper concerns before they veto"]} />

1.  **Identify the EB early.** Ask: *"Whose budget will this purchase ultimately come out of?"*
2.  **Avoid the "Single Thread" Trap.** One person saying "Yes" is a high-risk deal. You need at least two "Yeses" for confidence. (2026 Acquisition Trends).
3.  **Arm your Champion.** Give them the ROI projections and security docs they need to look like an expert to their boss.

<RangeSlider label="How well do you map authority in your current deals?" min={1} max={10} lowLabel="I mostly talk to one person" highLabel="I always map the full committee" persistKey="discovery-L5-mapping" />

---

## Quiz: Mapping Authority

```json
{
  "quizId": "authority-mastery-2026",
  "title": "Mastering the Decision Unit",
  "questions": [
    {
      "id": "am51",
      "type": "multiple-choice",
      "text": "What is the primary difference between a 'Coach' and a 'Champion'?",
      "options": [
        { "id": "a", "text": "A Champion is higher ranking than a Coach." },
        { "id": "b", "text": "A Coach gives you information; a Champion takes internal action and risks their reputation to advocate for your solution." },
        { "id": "c", "text": "A Coach works in sales; a Champion works in engineering." },
        { "id": "d", "text": "There is no difference." }
      ],
      "correctAnswer": "b",
      "explanation": "Many founders are'ghosted' because they think a friendly manager (a Coach) is pushing the deal forward, when in reality that person has zero internal influence to get the signature from the Economic Buyer."
    },
    {
      "id": "am52",
      "type": "multiple-choice",
      "text": "Why is 'Single-Threading' dangerous for a solo founder's pipeline?",
      "options": [
        { "id": "a", "text": "It makes the calls too short." },
        { "id": "b", "text": "Because if your one point of contact gets sick, changes jobs, or loses internal favor, the entire deal dies instantly." },
        { "id": "c", "text": "Because LinkedIn only allows you to talk to one person at a time." },
        { "id": "d", "text": "It isn't; you should always focus on just one person." }
      ],
      "correctAnswer": "b",
      "explanation": "Multi-threading (having relationships with at least 2-3 stakeholders) is your insurance policy. In 2026, employee turnover is high, and a deal anchored to one person is inherently fragile."
    },
    {
      "id": "am53",
      "type": "multiple-choice",
      "text": "How do you identify the 'Economic Buyer' without sounding rude?",
      "options": [
        { "id": "a", "text": "Ask 'Are you the one who actually pays for things?'" },
        { "id": "b", "text": "Ask 'Whose department budget will this purchase ultimately be allocated to, so I can ensure the ROI math is aligned for them?'" },
        { "id": "c", "text": "Don't ask; just wait for the invoice." },
        { "id": "d", "text": "Guess based on their LinkedIn title." }
      ],
      "correctAnswer": "b",
      "explanation": "This approach frames the question as an act of service. You aren't questioning the prospect's power; you are ensuring that the final 'Value Case' is tailored for the person responsible for the P&L."
    }
  ]
}
```

**Next Lesson:** [Need: Uncovering Real Pain](/sales-methodology/discovery-framework/lesson-6)
