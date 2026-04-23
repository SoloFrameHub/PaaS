---
title: "Session Review and Pattern Analysis"
duration: "55 min"
track: "Sales Methodology"
course: "Course 15: Discovery Call Simulations"
lesson: 9
---

# Session Review & Pattern Analysis: The 'Game Tape' Protocol

If you've completed the previous 8 lessons, you've run dozens of simulated calls. But doing the calls is only half the battle. To reach the level where discovery feels effortless, you must learn to **Analyze the Tape.**

In professional sports, elite athletes spend more time in the video room than on the field. Your sales practice is no different. The **SoloFrame Hub 3D Matrix** provides you with DASH scoring, talk-time ratios, and intent tracking. This lesson teaches you how to identify your behavioral "bugs" and patch them before you burn real leads. (2025 State of Sales).

<InsightCard icon="📊" title="The Video Room Principle">
Elite athletes spend 60% of their improvement time reviewing tape, not practicing. Your discovery calls deserve the same rigor—the data reveals patterns your gut feeling will miss.
</InsightCard>

---

## 1. The Cognitive Gap: Data > Feelings

You are a terrible judge of your own performance. This is the **Dunning-Kruger Effect**—thinking you "crushed" a call because the rapport was good, while the data shows you failed to qualify. (Gartner Research).

<RangeSlider 
  label="How accurately can you judge your own call performance without data?" 
  min={1} 
  max={10} 
  lowLabel="Completely blind" 
  highLabel="Perfect accuracy" 
  persistKey="course-15-discovery-simulations-L9-self-awareness" 
/>

### The 2026 Audit Protocol:
1.  **Talk-Time Consistency:** Did you maintain the **54-58% range**? (2025 Benchmarks). If your talk time spiked to 70% during a "Resistant" scenario, you were **Reaction Pitching** out of insecurity.
2.  **Question Intensity:** Did you ask **39% more questions** than your baseline? Successful discovery is built on inquiry, not statements.
3.  **Linguistic Matching:** Did you match the prospect's pace (Motor) and focus (Compass) within the first 3 minutes?

<ScenarioSimulator
  title="Talk-Time Impact Calculator"
  persistKey="course-15-discovery-simulations-L9-talktime"
  levers={[
    { id: "talkTime", label: "Your talk-time (%)", min: 30, max: 90, step: 5, defaultValue: 65 },
    { id: "questions", label: "Questions asked", min: 5, max: 25, step: 1, defaultValue: 12 }
  ]}
  outputs={[
    { id: "expertFrame", label: "Expert Frame Score", formula: "talkTime > 58 ? Math.max(0, 100 - (talkTime - 58) * 3) : Math.min(100, 100 - Math.abs(54 - talkTime) * 2)", unit: "%", precision: 0 },
    { id: "questionIntensity", label: "Question Intensity vs Baseline", formula: "((questions - 15) / 15) * 100", unit: "%", precision: 0 }
  ]}
  insight="At {talkTime}% talk-time with {questions} questions, your Expert Frame Score is {expertFrame}%. The sweet spot is 54-58% talk-time with 20+ questions."
/>

---

## 2. Personality-Matching Analysis (3D Matrix)

Identify your "Nemesis Type." Which personality causes you to abandon your methodology?

<ClassifyExercise
  title="Identify Your Behavioral Breakdown Pattern"
  persistKey="course-15-discovery-simulations-L9-nemesis"
  categories={[
    { id: "high-d", label: "High-D (Fast/Logical)", color: "#ef4444" },
    { id: "high-i", label: "High-I (Fast/Emotional)", color: "#f59e0b" },
    { id: "high-s", label: "High-S (Slow/Emotional)", color: "#3b82f6" },
    { id: "high-c", label: "High-C (Slow/Logical)", color: "#8b5cf6" }
  ]}
  items={[
    { id: "1", content: "You start talking faster and lose the Expert Frame", correctCategory: "high-d" },
    { id: "2", content: "You get distracted by their stories and miss clinical data", correctCategory: "high-i" },
    { id: "3", content: "You get impatient and try to Hard-Close them", correctCategory: "high-s" },
    { id: "4", content: "You feel under-prepared and start bluffing technical details", correctCategory: "high-c" }
  ]}
/>

*   **The High-D (Fast/Logical):** Do you get intimidated and start talking faster? (Symptom: You lose the "Expert Frame").
*   **The High-I (Fast/Emotional):** Do you get distracted by their stories? (Symptom: You miss clinical data).
*   **The High-S (Slow/Emotional):** Do you get impatient and "Hard-Close" them? (Symptom: They ghost you).
*   **The High-C (Slow/Logical):** Do you feel under-prepared and bluff? (Symptom: You lose technical credibility).

<TemplateBuilder
  title="Your Nemesis Type Recovery Plan"
  persistKey="course-15-discovery-simulations-L9-recovery"
  sections={[
    {
      id: "nemesis",
      title: "Nemesis Identification",
      fields: [
        { id: "type", label: "My Nemesis Type", placeholder: "e.g., High-D (Fast/Logical)", type: "text" },
        { id: "symptom", label: "My Breakdown Symptom", placeholder: "e.g., I start talking faster and lose control", type: "textarea" }
      ]
    },
    {
      id: "trigger",
      title: "Trigger Recognition",
      fields: [
        { id: "earlyWarning", label: "Early Warning Sign", placeholder: "e.g., When they challenge my price aggressively", type: "textarea" },
        { id: "physicalCue", label: "Physical Cue I Notice", placeholder: "e.g., My shoulders tense up, I lean forward", type: "text" }
      ]
    },
    {
      id: "intervention",
      title: "Intervention Protocol",
      fields: [
        { id: "pause", label: "My Pause Technique", placeholder: "e.g., Take a breath, write down their objection", type: "textarea" },
        { id: "redirect", label: "My Redirect Question", placeholder: "e.g., 'Help me understand what's driving that concern?'", type: "textarea" }
      ]
    }
  ]}
/>

---

## 3. The "AI Coach" Feedback Loop

Your simulator provides an automated evaluation. Look for these specific signals:
*   **Momentum Spikes:** Where did the prospect's sentiment move to Positive? (Usually, this is when you validated their pain).
*   **Throttling Failures:** Did you give the price before diagnosing the criteria?
*   **Disqualification Gaps:** Did you pursue a "no-fit" lead because they were friendly?

<SwipeDecision
  title="Good Pattern or Bad Pattern?"
  description="Swipe right for healthy discovery patterns, left for red flags"
  optionA="Red Flag"
  optionB="Healthy Pattern"
  persistKey="course-15-discovery-simulations-L9-patterns"
  cards={[
    { id: "1", content: "Prospect sentiment spiked positive when you validated their pain point", correctOption: "b", explanation: "This shows you're building trust through empathy and understanding, not pitching." },
    { id: "2", content: "You gave pricing details in minute 8 before understanding their decision criteria", correctOption: "a", explanation: "Throttling failure—you anchored on price before establishing value context." },
    { id: "3", content: "You continued pursuing a friendly prospect who clearly didn't fit your ICP", correctOption: "a", explanation: "Disqualification gap—likeability bias overrode your qualification criteria." },
    { id: "4", content: "You asked 23 questions and maintained 56% talk-time throughout", correctOption: "b", explanation: "Perfect execution of the Expert Diagnostician role." },
    { id: "5", content: "Your talk-time jumped to 72% when the prospect went silent", correctOption: "a", explanation: "Reaction Pitching—you filled silence with pitching instead of staying in diagnostic mode." }
  ]}
/>

<InteractiveChecklist 
  title="Post-Call Analysis Checklist" 
  persistKey="course-15-discovery-simulations-L9-analysis" 
  items={[
    "Review DASH scoring for all 8 simulated calls",
    "Calculate average talk-time ratio across all calls",
    "Identify which personality type caused your worst performance",
    "Document 3 specific moments where you abandoned methodology",
    "Write your recovery protocol for your Nemesis Type",
    "Compare your self-assessment to AI Coach feedback on last 3 calls",
    "Schedule 2 more practice calls targeting your weakest pattern"
  ]} 
/>

---

## Quiz: Behavioral Self-Correction

```json
{
  "quizId": "analysis-review-2026",
  "title": "Optimizing Your Sales Engine",
  "questions": [
    {
      "id": "ar1591",
      "type": "multiple-choice",
      "text": "If your talk-time ratio spikes to 75% when a prospect challenges your price, what is the diagnosis?",
      "options": [
        { "id": "a", "text": "You are giving a high-value explanation." },
        { "id": "b", "text": "Reaction Pitching: You are trying to 'convince' the prospect out of your own defensiveness, thereby losing the Expert Frame." },
        { "id": "c", "text": "The prospect is listening intently." },
        { "id": "d", "text": "You should talk even more to win the argument." }
      ],
      "correctAnswer": "b",
      "explanation": "When pressured, amateur founders revert to 'Pitching'. Professionals lean back, ask a diagnostic question, and maintain their 54-58% talk-time benchmark. Defensive talking signals a lack of conviction in your price and value."
    },
    {
      "id": "ar1592",
      "type": "multiple-choice",
      "text": "Why is 'Question Intensity' (asking 39% more questions) a predictor of success in 2025?",
      "options": [
        { "id": "a", "text": "It keeps the prospect busy so they don't think about the price." },
        { "id": "b", "text": "It proves you are in the 'Expert Diagnostician' role, digging for the root cause rather than accepting surface-level symptoms." },
        { "id": "c", "text": "It fulfills the SDR's quota." },
        { "id": "d", "text": "Prospects find lots of questions relaxing." }
      ],
      "correctAnswer": "b",
      "explanation": "Modern B2B buyers have already done 70% of their research. They don't need a demo of what they've already seen on your site. They need someone who can ask the hard questions they haven't asked themselves yet, uncovering the true 'Cost of Inaction'."
    }
  ]
}
```

**Next Lesson:** [Discovery Certification Challenge](/sales-methodology/course-15-discovery-simulations/lesson-10)