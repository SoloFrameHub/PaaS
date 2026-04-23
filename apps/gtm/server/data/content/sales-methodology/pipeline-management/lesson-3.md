---
title: "The Stalled Deal Diagnostic: CPR for Your Pipeline"
duration: "55 min"
track: "Sales Methodology"
course: "Course 20: Sales Pipeline Management"
lesson: 3
---

# The Stalled Deal Diagnostic: CPR for Your Pipeline

Not every silent deal is a Ghost. Some are simply **Stalled**—meaning the desire is there, but a specific blocker has stopped the motion. In 2026, 45% of stalled deals can be revived by applying the **CPR Diagnostic**. (2026 Research on Solo Sales Recovery).

Don't let a great deal die because you didn't know which button to press.

<RangeSlider 
  label="How many deals in your pipeline have gone silent in the last 30 days?" 
  min={0} 
  max={10} 
  lowLabel="None" 
  highLabel="10+" 
  persistKey="pipeline-management-L3-silent-deals" 
/>

---

## 1. The 3 Causes of Cardiac Arrest (Stalls)

Deals stall for three primary reasons:
1.  **Complexity Shock:** The buyer realized the implementation is harder than they thought.
2.  **Stakeholder Mutiny:** A member of the "Shadow Committee" (Security/IT) raised a concern the Champion can't answer.
3.  **Priority Shift:** A surprise project (Internal Fires) took precedence.

<ClassifyExercise
  title="Diagnose the Stall Type"
  persistKey="pipeline-management-L3-classify"
  categories={[
    { id: "complexity", label: "Complexity Shock", color: "#ef4444" },
    { id: "stakeholder", label: "Stakeholder Mutiny", color: "#f59e0b" },
    { id: "priority", label: "Priority Shift", color: "#3b82f6" }
  ]}
  items={[
    { id: "1", content: "Champion says: 'Our CTO just raised some concerns about the integration'", correctCategory: "stakeholder" },
    { id: "2", content: "Prospect replies: 'We just got hit with a major product launch and need to focus on that first'", correctCategory: "priority" },
    { id: "3", content: "Champion goes quiet after seeing the implementation timeline", correctCategory: "complexity" },
    { id: "4", content: "IT director blocks the deal citing security review requirements", correctCategory: "stakeholder" },
    { id: "5", content: "Prospect says: 'This looks more complicated than we thought'", correctCategory: "complexity" }
  ]}
/>

---

## 2. The CPR Framework (Context, Pressure, Resolution)

*   **Context (The Re-Anchor):** Re-identify why they started the project.
*   **Pressure (The Cost of Delay):** Gently remind them what they are losing by waiting.
*   **Resolution (The Micro-Next-Step):** Offer a path with zero risk.

<SlideNavigation>
<Slide title="C: Context (The Re-Anchor)">

**Goal:** Reconnect them to their original pain point.

**Example Script:**
*"When we first spoke in January, you mentioned that manual reporting was costing your team 15 hours per week. Is that still the case, or has something changed?"*

**Why it works:** People forget their own pain when distracted. Re-anchoring reminds them why they started this journey.

</Slide>

<Slide title="P: Pressure (The Cost of Delay)">

**Goal:** Quantify what they're losing by waiting.

**Example Script:**
*"Just to put it in perspective—if we're still at 15 hours per week of manual work, that's roughly 60 hours per month. At your team's blended rate, that's about $6,000 in lost productivity each month we delay."*

**Why it works:** Abstract pain becomes concrete when you attach numbers and timelines.

</Slide>

<Slide title="R: Resolution (The Micro-Next-Step)">

**Goal:** Offer the smallest possible next step with zero perceived risk.

**Example Script:**
*"What if we just schedule a 20-minute call with your CTO to walk through the security documentation? No commitment—just to get their questions answered so you're not stuck playing telephone."*

**Why it works:** Big commitments feel risky. Micro-steps feel safe and actionable.

</Slide>
</SlideNavigation>

<TemplateBuilder
  title="Build Your CPR Revival Message"
  persistKey="pipeline-management-L3-cpr-builder"
  sections={[
    {
      id: "context",
      title: "Context: Re-Anchor to Original Pain",
      fields: [
        { id: "original-pain", label: "What pain point did they mention initially?", placeholder: "e.g., Manual reporting taking 15 hours/week", type: "textarea" },
        { id: "context-question", label: "Your re-anchoring question", placeholder: "e.g., Is that manual reporting still eating up your team's time?", type: "textarea" }
      ]
    },
    {
      id: "pressure",
      title: "Pressure: Quantify Cost of Delay",
      fields: [
        { id: "time-cost", label: "Time being wasted (per week/month)", placeholder: "e.g., 15 hours per week = 60 hours/month", type: "text" },
        { id: "dollar-cost", label: "Dollar cost of delay", placeholder: "e.g., $6,000/month in lost productivity", type: "text" }
      ]
    },
    {
      id: "resolution",
      title: "Resolution: Micro-Next-Step",
      fields: [
        { id: "micro-step", label: "What's the smallest next step you can offer?", placeholder: "e.g., 20-minute call with CTO to answer security questions", type: "textarea" },
        { id: "zero-risk", label: "How do you frame it as zero-risk?", placeholder: "e.g., No commitment needed—just to get questions answered", type: "text" }
      ]
    }
  ]}
/>

---

## 3. The "Unstalling" Scripts

**Scenario A: Complexity Shock**
*   *Pivot:* *"I know the migration piece can feel like a mountain. What if we just do a 2-hour 'Pilot Prep' session where I walk your tech lead through the automated script? No commitment needed, just to see if it's as big a lift as you fear."*

**Scenario B: Stakeholder Mutiny**
*   *Pivot:* *"It sounds like your IT director has some valid concerns about the API. Can I record a 3-minute video walk-through of the documentation for them? Or better yet, can I join a 10-minute bridge call to answer their questions directly so you don't have to play middle-man?"*

<RewriteExercise
  title="Rewrite This Generic Follow-Up"
  persistKey="pipeline-management-L3-rewrite"
  original="Hi, just checking in to see if you've had a chance to review our proposal. Let me know if you have any questions!"
  hint="Use the CPR framework: re-anchor to their pain, add pressure with cost of delay, offer a micro-next-step"
  expertRewrite="Hi [Name], when we last spoke, you mentioned the manual data entry was costing your team 20 hours/week. That's roughly $8K/month in lost productivity. I know the implementation timeline gave you pause—what if we start with just a 30-minute technical walkthrough with your ops lead to show how simple the setup actually is? No commitment, just clarity."
  criteria={["Re-anchors to original pain point", "Quantifies cost of delay", "Offers specific micro-next-step", "Removes risk/pressure"]}
/>

---

## 4. The "Last Chance" Lever: The Risk-Free Pilot

In 2026, **Zero-Risk Entry** is the ultimate unstaller. (2025 State of Sales).
*   **The Script:** *"We seem to be stuck at the security gate. How about this: We do a 14-day 'Sandbox' run with anonymized data. If after 14 days the security team isn't happy and the value isn't there, we part ways with zero cost. Does that remove the barrier?"*

<InsightCard icon="🔓" title="Why Risk-Free Pilots Work">
Modern buyers suffer from "Commitment Phobia." A pilot allows them to validate the product in their own environment, which often provides the evidence needed to convince the "Shadow Committee" gatekeepers. It transforms "Should we buy this?" into "Let's just test it and see."
</InsightCard>

<DecisionTree
  title="Navigate the Stalled Deal"
  persistKey="pipeline-management-L3-decision-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Your champion hasn't responded in 2 weeks. What's your first move?", 
      choices: [
        { label: "Send a CPR message (Context + Pressure + Resolution)", nextNodeId: "cpr" },
        { label: "Ask if they want to cancel", nextNodeId: "cancel" },
        { label: "Wait another week", nextNodeId: "wait" }
      ]
    },
    { 
      id: "cpr", 
      content: "They reply: 'Our IT team is concerned about the integration.' What do you do?", 
      choices: [
        { label: "Offer a 10-min call with IT to answer questions", nextNodeId: "it-call" },
        { label: "Send documentation and hope they read it", nextNodeId: "docs" }
      ]
    },
    { 
      id: "it-call", 
      content: "IT joins the call, you address concerns, and they approve. Deal moves forward.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "docs", 
      content: "They don't read the docs. Deal stays stalled.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "cancel", 
      content: "They say 'Yes, let's cancel.' You've lost the deal by asking.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "wait", 
      content: "Another week passes. Still no response. Deal is now a ghost.", 
      isTerminal: true, 
      outcome: "negative" 
    }
  ]}
/>

<InteractiveChecklist 
  title="Your Stalled Deal Revival Checklist" 
  persistKey="pipeline-management-L3-actions" 
  items={[
    "Identify 2-3 stalled deals in your pipeline right now",
    "Classify each stall type (Complexity, Stakeholder, Priority)",
    "Draft a CPR message for your highest-value stalled deal",
    "Identify what 'micro-next-step' you can offer (pilot, demo, technical call)",
    "Send your CPR message within 24 hours",
    "If no response in 3 days, offer a risk-free pilot or sandbox",
    "Track which revival tactic worked best for future deals"
  ]} 
/>

---

## Quiz: The Stalled Deal

```json
{
  "quizId": "stalled-deals-2026",
  "title": "Reviving Deal Momentum",
  "questions": [
    {
      "id": "sd20031",
      "type": "multiple-choice",
      "text": "What is the primary objective of the CPR (Context, Pressure, Resolution) framework?",
      "options": [
        { "id": "a", "text": "To sell a more expensive product." },
        { "id": "b", "text": "To re-anchor the prospect to their initial pain-point while offering a low-risk micro-step to remove the specific blocker causing the stall." },
        { "id": "c", "text": "To complain about the slow progress." },
        { "id": "d", "text": "To ask for an early deposit." }
      ],
      "correctAnswer": "b",
      "explanation": "Stalls happen because the'Effort' of moving forward suddenly feels higher than the'Benefit'. CPR lowers the effort (Resolution) while reminding them of the benefit (Context)."
    },
    {
      "id": "sd20032",
      "type": "multiple-choice",
      "text": "Why is offering a 'Risk-Free Pilot' or 'Sandbox' run such an effective unstaller in 2026?",
      "options": [
        { "id": "a", "text": "Because it's a way to give away the product for free." },
        { "id": "b", "text": "Because it bypasses high-friction approval processes (Legal/Security) by defining a limited, low-stakes scope where the buyer can see value before committing to the full contract." },
        { "id": "c", "text": "Because it makes the prospect feel guilty if they don't buy." },
        { "id": "d", "text": "To delay the close on your own terms." }
      ],
      "correctAnswer": "b",
      "explanation": "Modern buyers suffer from'Commitment Phobia'. A pilot allows them to validate the product in their own environment, which often provides the evidence needed to convince the'Shadow Committee' gatekeepers."
    }
  ]
}