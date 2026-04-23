---
title: "Price Presentation Techniques"
duration: "50 min"
track: "Sales Methodology"
course: "Course 18: Proposals, Pricing & Negotiation"
lesson: 5
---

# Price Presentation: The Art of the Reveal

Timing is everything. In 2026, a price presented before value is an "Expense"; a price presented after value is an **"Investment Opportunity"**. (Sandler Research).

Most founders reveal their price too early because they are uncomfortable with the tension. This lesson teaches you the **"Earn the Right"** principle—you do not have the right to state your price until you have established the **Cost of Inaction (COI)**.

<RangeSlider 
  label="How comfortable are you with silence after stating your price?" 
  min={1} 
  max={10} 
  lowLabel="Very uncomfortable" 
  highLabel="Totally comfortable" 
  persistKey="proposals-pricing-L5-silence-comfort" 
/>

---

## 1. Handling the Premature "Ballpark" Request

Prospects often ask for price in the first 5 minutes to see if they can disqualify you. Handle this without being evasive.
*   **The 2026 Redirect:** *"I want to give you a number that is actually relevant to your P&L. Our implementations typically range from **$5k to $25k** depending on the automation depth. To give you a specific quote rather than a guess, I need to understand your current [Volume/Pain] first. Can we take 10 minutes for that?"*
*   **Why it works:** You provide a range (anchoring high) but maintain control of the diagnostic agenda. (2025 State of Buyer Behavior).

<SwipeDecision
  title="Good Redirect or Bad Redirect?"
  description="Swipe right for effective price deflections, left for weak ones"
  optionA="Weak Response"
  optionB="Strong Response"
  persistKey="proposals-pricing-L5-redirect-swipe"
  cards={[
    { 
      id: "1", 
      content: "It depends on what you need. Can you tell me more about your requirements?", 
      correctOption: "a", 
      explanation: "Too vague. No anchoring range, no clear diagnostic path. Sounds evasive." 
    },
    { 
      id: "2", 
      content: "Our solutions range from $8k to $30k depending on automation complexity. To give you a precise number, I need 15 minutes to understand your current workflow costs. Does that work?", 
      correctOption: "b", 
      explanation: "Provides anchoring range, justifies the diagnostic, maintains control of the conversation." 
    },
    { 
      id: "3", 
      content: "I can't give you a price without knowing more.", 
      correctOption: "a", 
      explanation: "Sounds defensive. No range provided, no value framing. Prospect feels stonewalled." 
    },
    { 
      id: "4", 
      content: "Most clients in your industry invest $12k-$20k. To dial in your specific number, let's spend 10 minutes on your current pain points. Sound fair?", 
      correctOption: "b", 
      explanation: "Industry-specific anchoring, clear diagnostic agenda, collaborative framing." 
    }
  ]}
/>

---

## 2. The Economic Recap Script

When it's time to reveal the price on a call, use the **Economic Recap** pattern. This ensures the last thing the prospect hears before the price is the **Pain** they are solving.

1.  **The Pain Recap:** *"You mentioned that [Manual Gap] is costing the team **$124,000 per year** in lost billable productivity."*
2.  **The Solution Bridge:** *"Our Accelerator Tier automates 80% of that workflow, effectively recovering $100,000 of that loss."*
3.  **The Price Statement:** *"The investment for that annually is **$10,000**."*
4.  **The 4-Second Pause:** (Stay silent. Let them process the 10x ROI).

**The Rule of Silence:** The first person to speak after the price is stated is the one who makes the first concession. **Do not fill the void with justifications.** (2025 Benchmarks).

<TemplateBuilder
  title="Your Economic Recap Script"
  persistKey="proposals-pricing-L5-recap"
  sections={[
    {
      id: "pain",
      title: "Pain Recap",
      fields: [
        { 
          id: "problem", 
          label: "The quantified problem", 
          placeholder: "e.g., Manual reporting is costing your team $80,000 per year in lost productivity", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "solution",
      title: "Solution Bridge",
      fields: [
        { 
          id: "benefit", 
          label: "The specific value recovery", 
          placeholder: "e.g., Our Pro tier automates 75% of that workflow, recovering $60,000 annually", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "price",
      title: "Price Statement",
      fields: [
        { 
          id: "investment", 
          label: "The investment amount", 
          placeholder: "e.g., The annual investment for that is $8,000", 
          type: "text" 
        }
      ]
    }
  ]}
/>

<InsightCard icon="⏱️" title="The 4-Second Rule">
After stating your price, count to 4 in your head. The silence feels uncomfortable, but it's doing critical work: the prospect is calculating ROI. If you jump in with justifications ("...and we can include support" or "...we're flexible on price"), you signal that YOU don't believe in your own value. That triggers immediate negotiation mode.
</InsightCard>

<TimedChallenge
  title="Practice the Silence"
  persistKey="proposals-pricing-L5-silence-drill"
  timeLimit={30}
  items={[
    { 
      id: "1", 
      prompt: "You state: 'The investment is $15,000.' The prospect is quiet. What do you do?", 
      correctAnswer: "wait", 
      explanation: "Stay silent. Let them process. The first to speak makes the first concession." 
    },
    { 
      id: "2", 
      prompt: "After 3 seconds of silence, you feel the urge to say 'We can work on payment terms.' Should you?", 
      correctAnswer: "no", 
      explanation: "No. You're filling the void with a concession before they've even objected. Wait for them to respond." 
    },
    { 
      id: "3", 
      prompt: "The prospect says 'Hmm, that's higher than I expected.' What's your first move?", 
      correctAnswer: "clarify", 
      explanation: "Ask: 'What were you expecting?' or 'What's your budget range?' Don't immediately discount." 
    }
  ]}
/>

---

## 3. Presenting Tiers Verbally

When presenting your 3-Tier model (from Lesson 3), guide the prospect toward the **Strategic** option.
*   **The Script:** *"Based on the volume you shared, the **Foundation tier** covers the basics, but the **Strategic tier** includes the [Benefit X] we discussed as a priority. Most companies at your stage find the Strategic tier at $15k to be the highest 'Price-to-Value' choice. Does that alignment work for you?"*

<MiniRoleplay
  scenario="A prospect asks: 'Can you just tell me the price for each tier?'"
  role="You are the founder presenting tiers"
  persistKey="proposals-pricing-L5-tier-roleplay"
  modelResponse="Absolutely. Foundation is $8k and covers [Core Features]. Strategic is $15k and adds [Priority Benefit] we discussed. Based on your [Volume/Pain], Strategic delivers the highest ROI. Does that match your expectations?"
/>

<InteractiveChecklist 
  title="Price Presentation Checklist" 
  persistKey="proposals-pricing-L5-checklist" 
  items={[
    "Practice your Economic Recap script out loud 3 times",
    "Set a timer and practice 4 seconds of silence after stating a price",
    "Write your tier guidance script for your top 2 customer segments",
    "Record yourself doing a full price reveal and listen back for filler words",
    "Prepare your 'ballpark redirect' script with your actual price range"
  ]} 
/>

<FlipCard 
  front="What is the 'Earn the Right' principle?" 
  back="You do not have the right to state your price until you have established the Cost of Inaction (COI). Price without context is an expense. Price after quantified pain is an investment opportunity." 
/>

---

## Quiz: Controlling the Narrative Tension

```json
{
  "quizId": "price-presentation-2026",
  "title": "Timing the Investment",
  "questions": [
    {
      "id": "p1851",
      "type": "multiple-choice",
      "text": "What is the 'Rule of Silence' in price presentation?",
      "options": [
        { "id": "a", "text": "Turning off your microphone during a demo." },
        { "id": "b", "text": "Staying silent for at least 4 seconds after stating your price to allow the prospect to process the value and respond first." },
        { "id": "c", "text": "Not talking about price until the customer brings it up." },
        { "id": "d", "text": "Hanging up the call if the prospect doesn't like the price." }
      ],
      "correctAnswer": "b",
      "explanation": "Human brains need time to process 'Choice Architecture'. If you jump in with excuses ('...and we can include support' or '...we can move on price'), you signal that you are uncomfortable with your own value, which triggers an immediate negotiation response from the buyer."
    },
    {
      "id": "p1852",
      "type": "multiple-choice",
      "text": "What should be stated immediately BEFORE the price in a verbal reveals?",
      "options": [
        { "id": "a", "text": "A list of your technical specifications." },
        { "id": "b", "text": "The quantified Cost of Inaction (COI) or the value to be recovered." },
        { "id": "c", "text": "Your company's founding story." },
        { "id": "d", "text": "An apology for the high cost." }
      ],
      "correctAnswer": "b",
      "explanation": "Value-Based Pricing only works if the context of the problem is fresh. By recapping that the problem costs $100k right before stating a $10k price, you frame the investment as a logic-based opportunity rather than an emotional expense."
    }
  ]
}
```

**Next Lesson:** [Negotiation Fundamentals](/sales-methodology/proposals-pricing/lesson-6)