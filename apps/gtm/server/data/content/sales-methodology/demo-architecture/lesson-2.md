---
title: "The Tell-Show-Tell Framework"
duration: "55 min"
track: "Sales Methodology"
course: "Course 16: Demo Architecture"
lesson: 2
---

# The Tell-Show-Tell Framework: Curating the Cognitive Spotlight

You share your screen on a Zoom call. Suddenly, your prospect's brain is hit with a tsunami of visual data: sidebars, dashboard colors, and icons. In the first 10 seconds of a screen share, the prospect's "Cognitive Load" spikes and their IQ effectively drops. (2025 State of Sales). If you start "selling" while they are disoriented, you lose.

To fix this, professional founders use the **Tell-Show-Tell** framework (Context-Demo-Value). It is the only way to focus the "Cognitive Spotlight" where you want it. (Gartner Research).

<RangeSlider 
  label="How often do you currently use a structured framework during demos?" 
  min={1} 
  max={10} 
  lowLabel="Never / Wing it" 
  highLabel="Always structured" 
  persistKey="demo-architecture-L2-framework-usage" 
/>

---

## 1. The Biology of Focus

The human brain consumes 20% of your body's energy. When you present "Noise" (a busy screen without guidance), the brain has to work overtime. To conserve energy, the prospect literally **zones out**. (2025 State of Buyer Behavior).

**The Tell-Show-Tell Protocol:**
1.  **TELL (The Set-up):** Direct the "flashlight" of their attention.
2.  **SHOW (The Proof):** Turn on the lights and execute the action.
3.  **TELL (The Tie-down):** Explain why the result matters to their specific P&L.

<InsightCard icon="🧠" title="The Cognitive Load Trap">
In the first 10 seconds of a screen share, your prospect's brain is processing visual data at maximum capacity. Any selling during this window is wasted — they literally cannot process complex verbal logic while their visual cortex is overloaded.
</InsightCard>

---

## 2. Step 1: TELL (The Context)

Never click a button before you say *why* you are clicking it. You must state the **Pain** and the **Promise** before the visual appears. (Sandler Research).

**The Script:** *"Remember how you mentioned that your team spends 4 hours every Monday manually exporting CSVs? [Wait for nod]. I'm going to show you the 'Board-Ready' View. It takes that 4-hour manual slog and turns it into a one-click execution. Watch this..."*

<TemplateBuilder
  title="Your Tell-Show-Tell Script"
  persistKey="demo-architecture-L2-script"
  sections={[
    {
      id: "tell1",
      title: "TELL #1: The Context",
      fields: [
        { id: "pain", label: "Reference their specific pain point", placeholder: "Remember how you mentioned that your team spends 4 hours every Monday manually exporting CSVs?", type: "textarea" },
        { id: "promise", label: "State what you're about to show", placeholder: "I'm going to show you the 'Board-Ready' View that turns that 4-hour manual slog into a one-click execution.", type: "textarea" }
      ]
    },
    {
      id: "show",
      title: "SHOW: The Proof",
      fields: [
        { id: "action", label: "What specific action will you demonstrate?", placeholder: "Click 'Export Board Report' button", type: "text" }
      ]
    },
    {
      id: "tell2",
      title: "TELL #2: The Tie-Down",
      fields: [
        { id: "question", label: "Your open-ended value question", placeholder: "How would your team use those extra 4 hours every Monday if they weren't wrangling CSVs?", type: "textarea" }
      ]
    }
  ]}
/>

---

## 3. Step 2: SHOW (The Proof)

Now, and only now, do you execute the action. In 2026, **Mouse Hygiene** is a marker of professional authority. (2026 Acquisition Trends).
*   **Park the Mouse:** When you are talking, take your hand off the mouse. Cursor movement distracts from your voice.
*   **The Zero-Latency Rule:** If a feature takes >3 seconds to load, you fail. Have your tabs pre-loaded.
*   **No Circles:** Do not circle a button 15 times. Point once, click once. (2025 Benchmarks).

<SwipeDecision
  title="Demo Hygiene: Good or Bad?"
  description="Swipe right for professional demo behaviors, left for amateur mistakes"
  optionA="Amateur Mistake"
  optionB="Professional Move"
  persistKey="demo-architecture-L2-hygiene"
  cards={[
    { 
      id: "1", 
      content: "You circle a button 8 times with your cursor while explaining what it does", 
      correctOption: "a", 
      explanation: "Cursor movement triggers the brain's tracking mechanism, displacing capacity to process your verbal explanation. Point once, click once." 
    },
    { 
      id: "2", 
      content: "You rest your hand off the mouse while delivering the context statement", 
      correctOption: "b", 
      explanation: "Parking the mouse keeps the prospect's visual attention on the screen content, not cursor movement, allowing them to process your words." 
    },
    { 
      id: "3", 
      content: "You click a feature that takes 8 seconds to load while the prospect watches the loading spinner", 
      correctOption: "a", 
      explanation: "The Zero-Latency Rule: anything >3 seconds kills momentum. Pre-load all tabs and features before the call." 
    },
    { 
      id: "4", 
      content: "You have all demo tabs pre-loaded in separate browser windows before the call starts", 
      correctOption: "b", 
      explanation: "Professional preparation. No loading delays = no cognitive breaks = maintained narrative flow." 
    },
    {
      id: "5",
      content: "You start clicking through features immediately after screen share, while the prospect is still orienting to your interface",
      correctOption: "a",
      explanation: "In the first 10 seconds, their brain is processing visual layout. Any selling during this window is wasted. Always TELL before you SHOW."
    }
  ]}
/>

---

## 4. Step 3: TELL (The Value Tie-Down)

After the chart appears, **Stop moving.** Now you must force the prospect to verbalize the value.
*   **The Script:** *"So, that was the automated sync. Instead of 4 hours, it took 4 seconds. How would your team use those extra 4 hours every Monday if they weren't wrangling CSVs?"*
*   **The Psychology:** If *you* say it saves time, it's a claim. If *they* say it saves time, it's a fact.

<FlipCard 
  front="Why must the prospect verbalize the value?" 
  back="Confirmation bias is a powerful tool. When a prospect answers 'What would you do with those 4 extra hours?', they mentally move themselves into the 'Future State' you promised. They have effectively closed themselves on that specific feature's value. Your claim becomes their accepted fact." 
/>

<MiniRoleplay
  scenario="You just showed a feature that automates a 2-hour weekly task. The prospect is silent, looking at the screen."
  role="You are the founder delivering the Tie-Down"
  persistKey="demo-architecture-L2-tiedown"
  modelResponse="So that automation just turned 2 hours into 30 seconds. If your team had those 2 hours back every week, what would they focus on instead?"
/>

<InteractiveChecklist 
  title="Your Demo Prep Checklist" 
  persistKey="demo-architecture-L2-prep" 
  items={[
    "Pre-load all demo tabs/features (Zero-Latency Rule)",
    "Write out TELL #1 script referencing their specific pain",
    "Identify the single action you'll demonstrate in SHOW",
    "Prepare your TELL #2 tie-down question",
    "Practice parking the mouse during verbal explanations",
    "Test all features to ensure <3 second load times",
    "Have backup demo environment ready in case of technical issues"
  ]} 
/>

---

## Quiz: Engineering the Narrative Flow

```json
{
  "quizId": "tell-show-tell-2026",
  "title": "Mastering the Demo Loop",
  "questions": [
    {
      "id": "da1621",
      "type": "multiple-choice",
      "text": "Why is 'Parking the Mouse' critical in a 2026 demo?",
      "options": [
        { "id": "a", "text": "To prevent your hand from getting tired." },
        { "id": "b", "text": "Because the human eye is biologically programmed to follow movement; if the cursor is wiggling, the prospect is watching the cursor instead of listening to your value proposition." },
        { "id": "d", "text": "To show that your internet is fast." }
      ],
      "correctAnswer": "b",
      "explanation": "Attention is the most expensive currency in 2026. Neuro-marketing research shows that micro-movements on screen (like mouse wiggling or frantic circling) trigger the brain's tracking mechanism, displacing the capacity to process complex verbal logic."
    },
    {
      "id": "da1622",
      "type": "multiple-choice",
      "text": "What is the primary goal of the second 'TELL' (the Tie-down) in the framework?",
      "options": [
        { "id": "a", "text": "To describe the technical specs of the feature." },
        { "id": "b", "text": "To force the prospect to verbalize the benefit in their own context, transforming your claim into an accepted fact." },
        { "id": "c", "text": "To ask for the sale immediately." },
        { "id": "d", "text": "To fill the silence while the page loads." }
      ],
      "correctAnswer": "b",
      "explanation": "Confirmation bias is a powerful tool. When a prospect answers 'What would you do with those 4 extra hours?', they are mentally moving themselves into the 'Future State' you promised. They have effectively closed themselves on that specific feature's value."
    }
  ]
}
```

**Next Lesson:** [Reverse Engineering the WOW](/sales-methodology/demo-architecture/lesson-3)