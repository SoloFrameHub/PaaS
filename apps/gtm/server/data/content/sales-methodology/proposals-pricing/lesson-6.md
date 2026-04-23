---
title: "Negotiation Fundamentals"
duration: "55 min"
track: "Sales Methodology"
course: "Course 18: Proposals, Pricing & Negotiation"
lesson: 6
---

# Negotiation Fundamentals: The "Give-Get" Protocol

Negotiation is not a battle of wills; it is a collaborative problem-solving exercise. In 2026, every B2B prospect is under pressure to "Do more with less." (Gartner Research). If they are negotiating with you, they have already decided they want your solution—they are now just trying to manage their internal **Shadow Committee** risks.

The goal is to reach an agreement that is sustainable for you and high-velocity for the prospect. This requires moving from "Haggling" to **Principled Negotiation**.

<InsightCard icon="🤝" title="The Negotiation Mindset Shift">
If they're negotiating, they've already chosen you. They're not shopping anymore—they're managing internal risk and budget constraints.
</InsightCard>

---

## 1. BATNA: Your Invisible Power

**BATNA** (Best Alternative to a Negotiated Agreement) is your absolute walk-away point. (Sandler Research).
*   **The Power Source:** If you have 3 other deals in the pipeline, your BATNA is strong. If you *need* this deal to pay rent, your BATNA is weak.
*   **The Rule:** Never accept a deal that is worse than your BATNA. In 2026, a "Bad Fit" client who negotiated your price down by 50% will consume 200% of your support time. (2025 Benchmarks).

<RangeSlider 
  label="How strong is your current BATNA?" 
  min={1} 
  max={10} 
  lowLabel="Desperate (need this deal)" 
  highLabel="Strong (multiple options)" 
  persistKey="proposals-pricing-L6-batna" 
/>

<ConceptReframe
  concept="BATNA"
  defaultLens="technical-founder"
  lenses={[
    { id: "technical-founder", label: "Technical Founder", explanation: "BATNA is like having fallback infrastructure. If your primary server fails, you need a backup. In sales, your backup is other deals in the pipeline or the option to walk away and focus on product." },
    { id: "coach", label: "Coach", explanation: "BATNA is your 'Plan B' confidence. If a client isn't the right fit, you have other clients who value your methodology. That confidence shows in how you negotiate." },
    { id: "creator", label: "Creator", explanation: "BATNA is like having multiple revenue streams. If one sponsor lowballs you, you can walk because you have courses, affiliates, or other partnerships. That leverage shows." }
  ]}
/>

---

## 2. Positions vs. Interests

Buyers often lead with a **Position** (a demand). Your job is to uncover the **Interest** (the "Why").

| Prospect Position | The Hidden Interest | The Founder Response |
| :--- | :--- | :--- |
| *"We need a 20% discount."* | *"My CFO gave me a strict budget cap of $10k."* | *"If we shift $2k to the next budget cycle, can we start today?"* |
| *"We need a 30-day exit clause."* | *"I was burned by a slow vendor last year."* | *"What specifically are you worried about in our first 30 days?"* |
| *"Your setup fee is too high."* | *"I want to see value before I commit capital."* | *"If we defer the fee until Goal X is hit, does that lower the risk?"* |

<SwipeDecision
  title="Position or Interest?"
  description="Swipe right if this is the REAL interest (the why), left if it's just the surface position"
  optionA="Surface Position"
  optionB="Real Interest"
  persistKey="proposals-pricing-L6-swipe"
  cards={[
    { id: "1", content: "We need a 15% discount", correctOption: "a", explanation: "This is a position. The interest might be budget constraints, internal approval thresholds, or competitive benchmarking." },
    { id: "2", content: "My CFO won't approve anything over $12k without board review", correctOption: "b", explanation: "This reveals the real constraint—a specific approval threshold you can work around." },
    { id: "3", content: "Your implementation timeline is too long", correctOption: "a", explanation: "This is a position. The interest might be: 'We need results before Q3 board meeting' or 'I'm worried about team bandwidth.'" },
    { id: "4", content: "I need to show ROI within 60 days or my boss will kill the project", correctOption: "b", explanation: "This is the real interest—a specific timeline pressure you can address with milestones." }
  ]}
/>

<MiniRoleplay
  scenario="Prospect says: 'We need a 20% discount to make this work.'"
  role="You are the founder. Uncover the interest behind this position."
  persistKey="proposals-pricing-L6-roleplay"
  modelResponse="I understand budget is tight. Can I ask—is the $20k total outside your approved range, or is there a specific threshold your CFO set? Sometimes we can restructure the payment schedule or shift costs to next quarter rather than discount the value."
/>

---

## 3. The "Give-Get" Protocol

Never give a concession for free. In 2026, professional buyers respect negotiators who hold their value. Every "Give" from you must be met with a "Get" from them.

**The "If-Then" Script:**
*   **If** you need a 10% discount, **Then** we need to remove the custom onboarding and move to self-service.
*   **If** you need Net-60 payment terms, **Then** we need a 2-year commitment instead of 1.
*   **If** you want a lower price, **Then** you must agree to be a public case study for our Q3 launch.

<TemplateBuilder
  title="Your Give-Get Scenarios"
  persistKey="proposals-pricing-L6-giveget"
  sections={[
    {
      id: "scenario1",
      title: "Scenario 1: Discount Request",
      fields: [
        { id: "give1", label: "What they're asking for (the Give)", placeholder: "e.g., 15% discount", type: "text" },
        { id: "get1", label: "What you'll ask in return (the Get)", placeholder: "e.g., Annual payment upfront instead of quarterly", type: "text" },
        { id: "script1", label: "Your If-Then script", placeholder: "If we reduce the price by 15%, then we'll need...", type: "textarea" }
      ]
    },
    {
      id: "scenario2",
      title: "Scenario 2: Terms Request",
      fields: [
        { id: "give2", label: "What they're asking for", placeholder: "e.g., Net-60 payment terms", type: "text" },
        { id: "get2", label: "What you'll ask in return", placeholder: "e.g., 2-year contract instead of 1-year", type: "text" },
        { id: "script2", label: "Your If-Then script", placeholder: "If we extend to Net-60, then we'll need...", type: "textarea" }
      ]
    },
    {
      id: "scenario3",
      title: "Scenario 3: Scope Request",
      fields: [
        { id: "give3", label: "What they're asking for", placeholder: "e.g., Add extra user seats", type: "text" },
        { id: "get3", label: "What you'll ask in return", placeholder: "e.g., Testimonial video and logo on website", type: "text" },
        { id: "script3", label: "Your If-Then script", placeholder: "If we include 5 extra seats, then we'll need...", type: "textarea" }
      ]
    }
  ]}
/>

<ExampleCard label="Real Example: The Case Study Trade">
A SaaS founder was asked for a 20% discount by a well-known brand. Instead of just saying yes, she responded: "If we reduce the annual price by 20%, then we'll need you to commit to a video testimonial and joint webinar within 90 days of going live. That brand visibility is worth more to us than the discount costs you."

The prospect agreed. The founder got a marquee case study that closed 3 more deals in the next quarter—worth 10x the discount she gave.
</ExampleCard>

---

## 4. The "Solo Founder" Negotiation Lever

As a solo founder, your greatest negotiation lever isn't price; it's **Implementation Velocity**.
*   **The Reframe:** *"I can't match the price of [Big Legacy Vendor]. But they will spend 3 months in 'Discovery' with junior analysts. I can have you live and recovering revenue in 14 days. Which is more valuable to your Q3 number: a $2k discount or $20k in recovered revenue?"* (2026 Acquisition Trends).

<ScenarioSimulator
  title="Velocity vs. Discount Calculator"
  persistKey="proposals-pricing-L6-simulator"
  levers={[
    { id: "discount", label: "Discount % they're requesting", min: 5, max: 30, step: 5, defaultValue: 15 },
    { id: "dealSize", label: "Deal size ($)", min: 5000, max: 100000, step: 5000, defaultValue: 20000 },
    { id: "monthlyValue", label: "Monthly value to customer ($)", min: 2000, max: 50000, step: 2000, defaultValue: 10000 },
    { id: "competitorDelay", label: "Competitor's implementation (months)", min: 1, max: 6, step: 1, defaultValue: 3 },
    { id: "yourDelay", label: "Your implementation (weeks)", min: 1, max: 8, step: 1, defaultValue: 2 }
  ]}
  outputs={[
    { id: "discountCost", label: "Cost of discount", formula: "dealSize * (discount / 100)", unit: "$", precision: 0 },
    { id: "timeAdvantage", label: "Months you're faster", formula: "competitorDelay - (yourDelay / 4)", unit: " months", precision: 1 },
    { id: "velocityValue", label: "Value of speed advantage", formula: "monthlyValue * (competitorDelay - (yourDelay / 4))", unit: "$", precision: 0 }
  ]}
  insight="The velocity advantage is worth ${velocityValue} vs. a ${discountCost} discount. That's a {(velocityValue / discountCost).toFixed(1)}x better value proposition."
/>

<InteractiveChecklist 
  title="Your Negotiation Prep Checklist" 
  persistKey="proposals-pricing-L6-actions" 
  items={[
    "Calculate my BATNA for this deal (what's my walk-away point?)",
    "Identify 3 potential 'Gets' I can request if they ask for concessions",
    "Prepare my velocity value prop (how much faster am I than alternatives?)",
    "Script 2-3 'If-Then' responses for common discount requests",
    "Research their budget cycle and approval thresholds",
    "Prepare questions to uncover interests behind positions"
  ]} 
/>

---

## Quiz: Protecting the Margin

```json
{
  "quizId": "negotiation-fundamentals-2026",
  "title": "Strategy over Compromise",
  "questions": [
    {
      "id": "p1861",
      "type": "multiple-choice",
      "text": "What is the 'Give-Get' Protocol?",
      "options": [
        { "id": "a", "text": "Giving the customer whatever they want to get the deal." },
        { "id": "b", "text": "The rule that every concession you provide (the 'Give') must be exchanged for a concession from the buyer (the 'Get')." },
        { "id": "c", "text": "Getting a signature before giving the demo." },
        { "id": "d", "text": "A way to ask for more money." }
      ],
      "correctAnswer": "b",
      "explanation": "Free concessions invite more demands. By requiring a'Get' (like a faster signature, a longer term, or a case study) in exchange for a price'Give', you maintain your professional authority and ensure the trade is balanced."
    },
    {
      "id": "p1862",
      "type": "multiple-choice",
      "text": "Why is 'Implementation Velocity' a powerful negotiation lever for solo founders?",
      "options": [
        { "id": "a", "text": "Because it shows you are a fast worker." },
        { "id": "b", "text": "Because the economic value of 'Time-to-Result' often outweighs a small percentage discount, especially for high-interest 2026 budgets." },
        { "id": "c", "text": "Because it makes the proposal shorter." },
        { "id": "d", "text": "It isn't; price is all that matters." }
      ],
      "correctAnswer": "b",
      "explanation": "If a legacy vendor takes 6 months to start and you take 2 weeks, you are giving the customer 5.5 extra months of revenue/savings. That delta is almost always worth more than a 10-15% discount on the license fee."
    }
  ]
}
```

**Next Lesson:** [Handling Discount Requests](/sales-methodology/proposals-pricing/lesson-7)