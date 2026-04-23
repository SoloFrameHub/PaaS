---
title: "Identify Pain vs. Champion"
duration: "55 min"
track: "Sales Methodology"
course: "Course 14: Discovery Framework - BANT/MEDDIC"
lesson: 10
---

# Identify Pain vs. Champion

You have confirmed the Budget. You know the Decision Process. You have mapped the Criteria. Logically, the deal *should* close. But logic doesn't sign checks. **Emotion signs checks.**

In the MEDDIC framework, **Identify Pain (I)** and **Champion (C)** are the emotional engines of the deal. (2025 State of Sales).
*   **Pain** provides the "Why Change?" momentum.
*   **Champion** provides the "Who Sells?" advocacy inside the building.

Without these two, you have a "Zombie Deal"—it looks alive, but it has no heartbeat. It will eventually die of **Inertia**. (2026 Acquisition Trends).

<InsightCard icon="💀" title="The Zombie Deal">
A deal with perfect BANT/MEDDIC scores but no emotional urgency is a zombie—it looks alive in your CRM but will die of inertia before signature.
</InsightCard>

---

## 1. The 3 Levels of Pain (The 'I' in MEDDIC)

"Pain" in sales is a specific type of problem that is **unbearable enough to justify the budget**. Professional discovery must move from surface technical issues to strategic business consequences. (Sandler Research).

<SlideNavigation>
<Slide title="Level 1: Technical Pain (The Symptom)">

**What they say:** *"Our reports are slow."*

**The Trap:** This is a tactical annoyance. If you stop here, you are a "vendor."

**Your Risk:** They'll solve it with a $50/month tool or just live with it.

</Slide>

<Slide title="Level 2: Business Pain (The Impact)">

**What they say:** *"Slow reports cause a 48-hour delay in billing, costing us $10k/week in cash flow."*

**The Win:** Now you are an **ROI Partner**. You are solving a $1.2M annual problem.

**Your Leverage:** You can now justify a $50K annual contract against measurable loss.

</Slide>

<Slide title="Level 3: Personal Pain (The Stake)">

**What they say:** *"The CFO is breathing down my neck. If we don't fix this by Q4, my job is on the line."*

**The Close:** You have identified the **Dissonance Trigger**. This is the highest level of sales leverage. (2026 Acquisition Trends).

**Your Power:** This person will fight internally to get your solution approved.

</Slide>
</SlideNavigation>

<ClassifyExercise
  title="Classify the Pain Level"
  persistKey="discovery-framework-L10-pain-levels"
  categories={[
    { id: "technical", label: "Level 1: Technical", color: "#94a3b8" },
    { id: "business", label: "Level 2: Business", color: "#f59e0b" },
    { id: "personal", label: "Level 3: Personal", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "\"Our CRM doesn't integrate with Slack.\"", correctCategory: "technical" },
    { id: "2", content: "\"The integration gap costs us 15 hours/week in manual data entry—that's $30K annually in wasted labor.\"", correctCategory: "business" },
    { id: "3", content: "\"I promised the board we'd automate this by Q3. If I miss that deadline, I lose credibility with the CEO.\"", correctCategory: "personal" },
    { id: "4", content: "\"The dashboard loads slowly.\"", correctCategory: "technical" },
    { id: "5", content: "\"Slow dashboards mean our sales team misses real-time opportunities—we estimate $50K in lost deals last quarter.\"", correctCategory: "business" },
    { id: "6", content: "\"My VP keeps asking why we haven't fixed this yet. It's becoming a performance issue for me.\"", correctCategory: "personal" }
  ]}
/>

---

## 2. Testing Your Champion (The 'C' in MEDDIC)

A **Champion** is NOT just someone who likes you. That is a **Coach**.
*   **A Coach** gives you information (*"I think they liked the demo"*).
*   **A Champion** takes action (*"I scheduled the meeting with the CFO for you"*).

**The Litmus Test:**
If you ask your contact for a 15-minute sync with the Economic Buyer (EB) and they say: *"No, they're too busy, just talk to me,"* **they are a Coach.** You are currently selling to a gatekeeper. (2025 State of Buyer Behavior).

<SwipeDecision
  title="Coach or Champion?"
  description="Swipe right for Champion behaviors, left for Coach behaviors"
  optionA="Coach"
  optionB="Champion"
  persistKey="discovery-framework-L10-champion-test"
  cards={[
    { 
      id: "1", 
      content: "Contact says: \"I'll mention your solution in our next team meeting.\"", 
      correctOption: "a", 
      explanation: "Passive mention = Coach. A Champion would say: 'I'm putting you on the agenda for Thursday's leadership meeting.'" 
    },
    { 
      id: "2", 
      content: "Contact sends you the internal org chart and highlights who needs to approve the budget.", 
      correctOption: "b", 
      explanation: "Taking action to help you navigate = Champion behavior. They're spending political capital." 
    },
    { 
      id: "3", 
      content: "Contact says: \"The VP is really busy, but I can relay any questions you have.\"", 
      correctOption: "a", 
      explanation: "Blocking access to decision-makers = Coach. They don't have the influence to get you in the room." 
    },
    { 
      id: "4", 
      content: "Contact schedules a call with the CFO and says: \"I told her this could save us $200K annually—she wants to hear your pitch.\"", 
      correctOption: "b", 
      explanation: "Actively selling your solution internally + providing access = Champion." 
    },
    { 
      id: "5", 
      content: "Contact says: \"I really like your product! Let me know if you need anything.\"", 
      correctOption: "a", 
      explanation: "Enthusiasm without action = Coach. Champions do homework, not cheerleading." 
    }
  ]}
/>

<TemplateBuilder
  title="The Champion Verification Script"
  persistKey="discovery-framework-L10-champion-script"
  sections={[
    {
      id: "setup",
      title: "Setup Question",
      fields: [
        { 
          id: "context", 
          label: "Reference their pain", 
          placeholder: "e.g., You mentioned the billing delay is costing $10K/week...", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "ask",
      title: "The Ask (Test Their Influence)",
      fields: [
        { 
          id: "request", 
          label: "Specific request that requires internal action", 
          placeholder: "e.g., Could you get me 15 minutes with the CFO to walk through the ROI model?", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "fallback",
      title: "If They Block You",
      fields: [
        { 
          id: "response", 
          label: "Your response to 'They're too busy'", 
          placeholder: "e.g., I understand. Who else should I be talking to who has authority on this budget decision?", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## 3. The "Happy Ears" Trap

Founders often hear *"That's cool!"* and assume the deal is done. This is **Happy Ears**.
In the 2026 landscape, "cool" leads to "No Decision." (2026 Acquisition Trends). You must **Throttle the Intent**:
*"Glad you like it. But be honest—is it 'cool', or is solving the $10k/week billing lag a top-3 priority for the board this quarter? Because 'cool' doesn't get signatures."*

<MiniRoleplay
  scenario="Prospect says: &quot;This looks really cool! I love the interface.&quot;"
  role="You are the founder responding to avoid Happy Ears"
  persistKey="discovery-framework-L10-happy-ears"
  modelResponse="I appreciate that! But let's be honest—'cool' doesn't get budget approval. Is fixing the $10K/week billing delay a top-3 priority for your CFO this quarter? Because if it's not, we should revisit this when it is."
/>

<RangeSlider 
  label="How often do you mistake enthusiasm for buying intent?" 
  min={1} 
  max={10} 
  lowLabel="Never" 
  highLabel="Every deal" 
  persistKey="discovery-framework-L10-happy-ears-self" 
/>

---

## 4. Key Takeaways

1.  **Implicate the Pain.** Move from "how it works" to "what it costs to wait."
2.  **Verify the Champion.** Give them homework (e.g., provide security docs/org chart). If they don't do it, they aren't your Champion.
3.  **Find the Personal Stake.** Who gets "yelled at" if this project fails? That is your point of entry.

<InteractiveChecklist 
  title="Your Pain & Champion Action Items" 
  persistKey="discovery-framework-L10-actions" 
  items={[
    "Review your current pipeline—identify which deals have Level 3 (Personal) pain documented",
    "For each active deal, test if your contact is a Coach or Champion using the 'Ask Test'",
    "Draft a 'Throttle the Intent' script for the next time someone says 'That's cool!'",
    "Map the personal stakes: Who in each deal has reputation/job security tied to solving this problem?",
    "Schedule a 15-minute call with your top 3 contacts to request access to the Economic Buyer"
  ]} 
/>

---

## Quiz: The Emotional Dynamics of Sales

```json
{
  "quizId": "pain-champion-2026",
  "title": "Mastering Internal Advocacy",
  "questions": [
    {
      "id": "pc101",
      "type": "multiple-choice",
      "text": "What is the primary difference between a Coach and a Champion?",
      "options": [
        { "id": "a", "text": "A Champion is a C-level executive." },
        { "id": "b", "text": "A Coach likes you; a Champion is willing to spend their internal political capital to ensure your solution gets bought." },
        { "id": "c", "text": "A Champion is the person who signs the contract." },
        { "id": "d", "text": "There is no difference." }
      ],
      "correctAnswer": "b",
      "explanation": "Many solo founders lose deals because they spend 100% of their time with local managers (Coaches) who have no influence with the Economic Buyer. You must verify if your contact has the power to get you physically into the decision-making room."
    },
    {
      "id": "pc102",
      "type": "multiple-choice",
      "text": "Which of these is most likely to be a 'Level 3' (Personal) Pain point?",
      "options": [
        { "id": "a", "text": "'The server takes 3 seconds to load.'" },
        { "id": "b", "text": "'Our conversion rate has dropped 5%.'" },
        { "id": "c", "text": "'If we don't hit this launch date, my promotion is at risk and I'm worried about my standing with the CEO.'" },
        { "id": "d", "text": "'We need to switch to a SaaS model.'" }
      ],
      "correctAnswer": "c",
      "explanation": "Personal pain is about reputation, security, or time. Even in enterprise B2B, individuals make the final decision based on their own personal and professional stakes."
    },
    {
      "id": "pc103",
      "type": "multiple-choice",
      "text": "What is the 'Ask Test' for a Champion?",
      "options": [
        { "id": "a", "text": "Asking them to give you a discount." },
        { "id": "b", "text": "Asking them for something slightly difficult, like an internal org chart or a meeting with their boss, to verify if they have the influence they claim." },
        { "id": "c", "text": "Asking them for a cup of coffee." },
        { "id": "d", "text": "Asking them to keep the deal a secret." }
      ],
      "correctAnswer": "b",
      "explanation": "If a contact blocks you from higher-level stakeholders or refuses to share internal logistics, they are likely a Coach with no real power. Testing them early prevents you from counting on a deal that will never receive financial approval."
    }
  ]
}
```

**Next Lesson:** [Discovery Call Structure & Scaling](/sales-methodology/discovery-framework/lesson-11)