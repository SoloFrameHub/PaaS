---
title: "Trial Closes: Checking for Pulse"
duration: "50 min"
track: "Sales Methodology"
course: "Course 16: Demo Architecture"
lesson: 6
---

# Trial Closes: Checking for Pulse

You finish your 45-minute demo. You stop sharing your screen. 
*   **You:** *"So, what do you think?"*
*   **Prospect:** *"Yeah, it looks interesting. We'll get back to you."*

**The deal is dead.** (2025 State of Sales). You flew blind for 45 minutes with no idea if they were bored or excited. To prevent this, we use **Trial Closes**—micro-questions asked *during* the demo to check the pulse of the transaction. (Sandler Research).

<InsightCard icon="🎯" title="The Real Problem">
Most founders wait until the end to ask "What do you think?" By then, it's too late. Trial closes are diagnostic checkpoints that prevent you from presenting irrelevant features for 30 minutes while the prospect mentally checks out.
</InsightCard>

---

## 1. The 3 Types of Trial Closes

<SlideNavigation>
<Slide title="Level 1: The Comprehension Check">

Use this after explaining a technical workflow.
*   **Script:** *"Does that logic align with how your data is structured today?"*
*   **Goal:** Ensure they aren't lost in technical noise.

<ExampleCard label="When to Use">
After showing a complex integration or data flow. If they say "Not exactly," you've just discovered a critical gap before wasting 20 more minutes on the wrong architecture.
</ExampleCard>

</Slide>

<Slide title="Level 2: The Value Check">

Use this after showing a "Wow Moment." (Course 16, Lesson 3).
*   **Script:** *"If your team had this view tomorrow, how would it change your weekly reporting routine?"*
*   **Goal:** Force them to verbalize the **Transformation**. (2025 Benchmarks).

<ExampleCard label="Why This Works">
When a prospect says "We'd save 4 hours every Monday," they're selling themselves. That sentence becomes your close: "So if we can get you those 4 hours back starting next week, what needs to happen on your end?"
</ExampleCard>

</Slide>

<Slide title="Level 3: The 'Temperature' Check">

Use this halfway through the call.
*   **Script:** *"I've shown you the core automation and the reporting. Based on what you've seen so far, how does this compare to how you expected it to look?"*
*   **Goal:** Uncover hidden objections *before* the final slide.

<ExampleCard label="Reading the Response">
If they say "It's more technical than I thought," you now know to simplify. If they say "I expected more customization," you know to pivot to your API capabilities. This is real-time course correction.
</ExampleCard>

</Slide>
</SlideNavigation>

<TemplateBuilder
  title="Your Trial Close Scripts"
  persistKey="demo-architecture-L6-scripts"
  sections={[
    {
      id: "comprehension",
      title: "Comprehension Check (After Technical Section)",
      fields: [
        { id: "context", label: "What technical concept did you just explain?", placeholder: "e.g., Our webhook-based sync process", type: "text" },
        { id: "script", label: "Your trial close question", placeholder: "e.g., Does that sync frequency match how often your data updates?", type: "textarea" }
      ]
    },
    {
      id: "value",
      title: "Value Check (After Wow Moment)",
      fields: [
        { id: "feature", label: "What feature did you just demo?", placeholder: "e.g., Automated reconciliation dashboard", type: "text" },
        { id: "script", label: "Your trial close question", placeholder: "e.g., If your team had this view tomorrow, how would it change your month-end close?", type: "textarea" }
      ]
    },
    {
      id: "temperature",
      title: "Temperature Check (Midpoint)",
      fields: [
        { id: "script", label: "Your midpoint check-in question", placeholder: "e.g., Based on what you've seen so far, how does this align with what you were hoping to solve?", type: "textarea" }
      ]
    }
  ]}
/>

---

## 2. Reading Digital Body Language

In a remote-first 2026 sales world, you must look for subtle signals: (2026 Acquisition Trends).
*   **The "Slack Glance":** If their eyes dart to the bottom left repeatedly, they are multitasking.
    *   **Fix:** Use their name immediately. *"David, notice how this specifically affects the territory you mentioned..."*
*   **The "Video Off" Protocol:** If they turn video off, you are at high risk.
    *   **Fix:** Stop your screen share for 30 seconds. *"I'm going to pause the demo for a second so we can just chat face-to-face about this next part."* This forces the camera back on. (2025 State of Buyer Behavior).

<ClassifyExercise
  title="Classify These Engagement Signals"
  persistKey="demo-architecture-L6-signals"
  categories={[
    { id: "engaged", label: "Engaged", color: "#10b981" },
    { id: "neutral", label: "Neutral", color: "#f59e0b" },
    { id: "disengaged", label: "Disengaged", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Prospect asks: 'Can you show that workflow again?'", correctCategory: "engaged" },
    { id: "2", content: "Prospect says: 'Uh-huh' while typing", correctCategory: "disengaged" },
    { id: "3", content: "Prospect turns video off mid-demo", correctCategory: "disengaged" },
    { id: "4", content: "Prospect says: 'That's interesting' with no follow-up question", correctCategory: "neutral" },
    { id: "5", content: "Prospect leans forward and says: 'Wait, how does that integrate with Salesforce?'", correctCategory: "engaged" },
    { id: "6", content: "Prospect's eyes dart to bottom-left screen repeatedly", correctCategory: "disengaged" }
  ]}
/>

---

## 3. The Power of the "4-Second Pause"

Founders fear silence. They talk to fill the void. But silence is where the prospect **thinks**. (Gartner Research).

**The Tactic:**
1.  Show the "Wow" moment (e.g., the Automated Reconciliation).
2.  Say: *"Imagine sending this to your CFO on Monday."*
3.  **Shut up.** Count to 4.
4.  If you wait, they will often say: *"Wow. That would actually be huge."*
**That sentence is the sale happening.** Do not interrupt it with more features.

<TimedChallenge
  title="Practice the 4-Second Pause"
  persistKey="demo-architecture-L6-pause"
  timeLimit={30}
  items={[
    { id: "1", prompt: "After showing a key feature, you say: 'Imagine having this data in real-time.' What do you do next?", correctAnswer: "pause", explanation: "Pause for 4 seconds. Let them process and respond. Most founders ruin the moment by immediately adding 'And it also does X, Y, Z...'" },
    { id: "2", prompt: "Prospect says: 'Hmm, interesting.' You should:", correctAnswer: "pause", explanation: "Pause again. 'Interesting' is neutral. Silence often prompts them to elaborate: 'Actually, we've been struggling with exactly this...'" },
    { id: "3", prompt: "After a 4-second pause, prospect says nothing. You should:", correctAnswer: "trial-close", explanation: "Use a trial close: 'I'm getting the sense this might not be a top priority—am I reading that right?' This forces clarity instead of guessing." }
  ]}
/>

<RangeSlider 
  label="How comfortable are you with 4+ seconds of silence during a demo?" 
  min={1} 
  max={10} 
  lowLabel="Very uncomfortable" 
  highLabel="Totally comfortable" 
  persistKey="demo-architecture-L6-silence" 
/>

<MiniRoleplay
  scenario="You just showed the automated reporting dashboard. You say: 'Imagine sending this to your board on Monday.' Then you pause for 4 seconds. The prospect says: 'Yeah, that would save us a ton of time.'"
  role="You are the founder. What do you say next?"
  persistKey="demo-architecture-L6-roleplay"
  modelResponse="'A ton of time'—can you put a number on that? Like, how many hours per week does your team spend on this manually right now?"
/>

<InteractiveChecklist 
  title="Your Trial Close Action Plan" 
  persistKey="demo-architecture-L6-actions" 
  items={[
    "Write 3 trial close scripts (comprehension, value, temperature) for your next demo",
    "Practice the 4-second pause with a colleague or recording",
    "Identify 3 digital body language signals you'll watch for in your next remote demo",
    "Add trial close checkpoints to your demo script at 15-min, 30-min, and 40-min marks",
    "Record your next demo and count how many trial closes you actually used"
  ]} 
/>

---

## Quiz: Monitoring Engagement

```json
{
  "quizId": "trial-closes-2026",
  "title": "Diagnosis in Motion",
  "questions": [
    {
      "id": "da1661",
      "type": "multiple-choice",
      "text": "Why should you STOP a demo if a prospect responds with 'It looks fine' to a trial close?",
      "options": [
        { "id": "a", "text": "Because they were being rude." },
        { "id": "b", "text": "Because 'Fine' is a polite 'No'. It signals that the current feature is irrelevant to their pain, and you are wasting their time by continuing the current arc." },
        { "id": "d", "text": "Because it's time to end the call anyway." }
      ],
      "correctAnswer": "b",
      "explanation": "Expert status is built on diagnostic accuracy. If a feature isn't landing, continuing to talk about it creates friction. A proactive founder will say: 'I'm getting the sense this isn't a top-tier priority; should we pivot back to the API topic you brought up earlier?' This demonstrates you value their time more than your script."
    },
    {
      "id": "da1662",
      "type": "multiple-choice",
      "text": "What is the goal of the 'Virtual Close' trial question near the end of the demo?",
      "options": [
        { "id": "a", "text": "To get them to sign the contract immediately." },
        { "id": "b", "text": "To walk the prospect through a hypothetical 'Success Path' (e.g., 'If we sent the contract today, what happens next internally?') to uncover the real 'Shadow Committee' hurdles." },
        { "id": "c", "text": "To ask for credit card info." },
        { "id": "d", "text": "To explain the pricing tiers again." }
      ],
      "correctAnswer": "b",
      "explanation": "The 'Virtual Close' is a diagnostic tool. When a prospect says 'Well, then it goes to Legal', you now know that 'Legal' is the next blocker you must account for in your timeline. It helps you map the 'Decision Process' (PID Model) while the demo momentum is still high."
    }
  ]
}
```

**Next Lesson:** [The Demo Dojo: Using AI Roleplay for High-Stakes Mastery](/sales-methodology/demo-architecture/lesson-7)