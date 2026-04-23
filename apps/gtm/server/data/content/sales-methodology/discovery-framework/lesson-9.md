---
title: "Decision Criteria & Process"
duration: "55 min"
track: "Sales Methodology"
course: "Course 14: Discovery Framework - BANT/MEDDIC"
lesson: 9
---

# Decision Criteria & Process: Mastering the "Rules of the Game"

You have a fantastic demo. The Champion loved it. The Budget was approved. You projected the deal to close on the last day of the quarter. Then, on the 29th, you get an email: *"Hey, just found out Legal needs 3 weeks to review the DPA. Also, Procurement is asking for a SOC2 Type II report we don't have. We'll have to push this to next quarter."*

**The deal didn't die because your product was bad. It died because you didn't understand the rules of the game.**

In the MEDDIC framework, **Decision Criteria (Dc)** and **Decision Process (Dp)** are the "Project Management" components of sales. (2025 State of Sales). While Pain and Champion are about emotion, Criteria and Process are about **Logistics and Reality**.

<InsightCard icon="⚠️" title="The Silent Deal Killer">
67% of deals that stall in "final stages" fail due to unknown process steps, not product fit. You can't close what you can't see.
</InsightCard>

---

## 1. Decision Criteria (Dc): The Grading Rubric

Decision Criteria are the specific standards the buyer uses to evaluate you against competitors or the status quo. If you don't know the rubric, you are guessing at the answers. (Gartner Research).

### The Three Layers of Criteria
1.  **Technical Criteria:** *"Does it work? Does it integrate with Snowflake? Is it SOC2 compliant?"*
2.  **Economic Criteria:** *"Is the payback period under 6 months? Does it fit our OpEx budget?"*
3.  **Relationship Criteria:** *"Can this founder support us 24/7? Do we trust a solo operator with this critical infrastructure?"*

<ClassifyExercise
  title="Classify These Evaluation Criteria"
  persistKey="discovery-framework-L9-classify-criteria"
  categories={[
    { id: "technical", label: "Technical", color: "#3b82f6" },
    { id: "economic", label: "Economic", color: "#10b981" },
    { id: "relationship", label: "Relationship", color: "#8b5cf6" }
  ]}
  items={[
    { id: "1", content: "Must have SSO with Okta integration", correctCategory: "technical" },
    { id: "2", content: "ROI must be positive within 9 months", correctCategory: "economic" },
    { id: "3", content: "Need a dedicated CSM for onboarding", correctCategory: "relationship" },
    { id: "4", content: "API rate limit must support 10K requests/min", correctCategory: "technical" },
    { id: "5", content: "Total cost of ownership under $50K annually", correctCategory: "economic" },
    { id: "6", content: "Vendor must have 24/7 support SLA", correctCategory: "relationship" }
  ]}
/>

### The "Inception" Strategy
The highest level of sales mastery isn't just *meeting* the criteria; it's **setting** the criteria. If your tool has a unique feature (e.g., Real-time Sync) that your competitor lacks, you must "poison the well" by making that feature a mandatory criterion for the prospect. (2026 Acquisition Trends).

<ExampleCard label="Case Study: The Poisoned Well">
A sales automation founder noticed their tool had real-time CRM sync while competitors batched updates every 15 minutes. During discovery, they asked: "How critical is it that your reps see lead status changes instantly? We've seen teams lose deals when two reps call the same lead because the CRM hadn't updated yet."

The prospect added "Real-time sync" to their mandatory requirements list. Two competitors were immediately disqualified.
</ExampleCard>

<TemplateBuilder
  title="Your Inception Question Framework"
  persistKey="discovery-framework-L9-inception"
  sections={[
    {
      id: "unique-feature",
      title: "Your Unique Advantage",
      fields: [
        { id: "feature", label: "What unique capability does your product have?", placeholder: "e.g., Real-time sync, AI-powered routing, native mobile app", type: "text" },
        { id: "competitor-gap", label: "What do competitors lack?", placeholder: "e.g., They batch sync every 15 min, manual routing, web-only", type: "text" }
      ]
    },
    {
      id: "pain-question",
      title: "The Inception Question",
      fields: [
        { id: "question", label: "Craft a question that makes this feature seem critical", placeholder: "e.g., 'How often do two reps accidentally contact the same lead because your CRM hadn't updated?'", type: "textarea" },
        { id: "impact", label: "What's the cost of NOT having this?", placeholder: "e.g., Lost deals, customer frustration, wasted rep time", type: "textarea" }
      ]
    }
  ]}
/>

---

## 2. Decision Process (Dp): The Paper Trail

The Decision Process is the sequence of approvals required to go from "Verbal Yes" to "Money in Bank." (2025 State of Buyer Behavior).

### The Two Processes You Must Map
1.  **The Validation Process (Getting to 'Technical Yes'):** Trials, Demos, and POCs.
2.  **The Authorization Process (Getting to 'Financial Yes'):** Legal (MSA/DPA), Security Questionnaires, and Procurement (Vendor Onboarding).

**The Founder's Rule:** Technical approval is fast; Authorization is a black hole. You must ask: *"Walk me through exactly whose desk the contract sits on after you hit 'approve'. Is there a junior legal counsel we should get ahead of today?"*

<DecisionTree
  title="Map Your Deal's Decision Process"
  persistKey="discovery-framework-L9-process-map"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Your Champion says: 'This looks great, let's move forward.' What do you ask first?", 
      choices: [
        { label: "What's the next step to get this approved?", nextNodeId: "good-start" },
        { label: "Great! When can we get the contract signed?", nextNodeId: "bad-start" }
      ]
    },
    { 
      id: "good-start", 
      content: "Champion: 'I need to get IT Security and Legal to sign off.' What do you do?", 
      choices: [
        { label: "Ask: 'Who specifically in IT Security? Can we schedule a call this week?'", nextNodeId: "proactive" },
        { label: "Say: 'No problem, let me know when they approve.'", nextNodeId: "reactive" }
      ]
    },
    { 
      id: "bad-start", 
      content: "Champion: 'Well, I need to run it by a few people first...' You've lost control of the timeline.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "proactive", 
      content: "You uncover that IT Security needs SOC2 Type II (you have it) and Legal needs a custom DPA (3-week process). You build a reverse timeline and close on schedule.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "reactive", 
      content: "Three weeks later: 'Legal is asking for a bunch of security docs we didn't know about. This is going to take a while.' Deal slips to next quarter.", 
      isTerminal: true, 
      outcome: "negative" 
    }
  ]}
/>

<SlideNavigation>
<Slide title="Step 1: Map the Validation Process">

**Questions to Ask:**
- "Who needs to see a demo besides you?"
- "What does a successful trial look like? What metrics matter?"
- "Who has veto power on the technical side?"

**Red Flag:** If they say "Just me," you don't have a real Champion. Enterprise deals require multiple stakeholders.

</Slide>
<Slide title="Step 2: Map the Authorization Process">

**Questions to Ask:**
- "After you approve, whose desk does the contract go to?"
- "What does Legal typically need? MSA? DPA? Security questionnaire?"
- "Does Procurement have a vendor onboarding process? How long does that take?"
- "Are there any compliance requirements (SOC2, GDPR, HIPAA) we should prepare for?"

**Pro Tip:** Ask for the security questionnaire NOW, even if the deal is weeks away. Fill it out proactively.

</Slide>
<Slide title="Step 3: Identify the Shadow Stakeholders">

**The People You Haven't Met:**
- Junior Legal Counsel (the person who actually reads contracts)
- IT Security Officer (the person who blocks deals without SOC2)
- Procurement Manager (the person who demands 3 vendor references)

**The Question:** "Is there anyone in Legal, Security, or Procurement I should connect with directly to make this smoother?"

</Slide>
<Slide title="Step 4: Build the Timeline">

**Work Backwards from Go-Live Date:**
1. Go-live: Oct 1
2. Onboarding/implementation: 2 weeks → Start by Sept 15
3. Contract execution: 1 week → Signed by Sept 8
4. Legal review: 3 weeks → Submitted by Aug 18
5. Security review: 1 week → Submitted by Aug 11

**Today is Aug 5. You have 6 days to get the security questionnaire done.**

</Slide>
</SlideNavigation>

---

## 3. The Reverse Timeline Close

Use the Decision Process to drive urgency without being "pushy."
1.  **Target Goal:** *"You need to be live by Oct 1st."*
2.  **Work Backwards:** *"Legal takes 3 weeks. Procurement takes 1 week. To hit Oct 1st, the contract must be submitted by Sept 1st. Today is Aug 25th. We have 5 days."*

<ScenarioSimulator
  title="Reverse Timeline Calculator"
  persistKey="discovery-framework-L9-timeline"
  levers={[
    { id: "golive", label: "Days until go-live", min: 14, max: 90, step: 7, defaultValue: 60 },
    { id: "implementation", label: "Implementation days", min: 7, max: 30, step: 7, defaultValue: 14 },
    { id: "legal", label: "Legal review days", min: 7, max: 30, step: 7, defaultValue: 21 },
    { id: "security", label: "Security review days", min: 3, max: 14, step: 1, defaultValue: 7 }
  ]}
  outputs={[
    { id: "deadline", label: "Contract must be submitted in", formula: "golive - implementation - legal - security", unit: "days", precision: 0 }
  ]}
  insight="If the deadline is negative or less than 7 days, you need to either compress timelines (get Legal to expedite) or push the go-live date. Use this math in your next call: 'To hit your Oct 1 deadline, we need to submit the contract by [date]. That's [deadline] days from now.'"
/>

<InteractiveChecklist 
  title="Your Decision Process Action Plan" 
  persistKey="discovery-framework-L9-actions" 
  items={[
    "Ask Champion: 'Walk me through every approval step from here to signature'",
    "Request the security questionnaire and compliance requirements NOW",
    "Identify the specific people in Legal, Security, and Procurement",
    "Build a reverse timeline from the go-live date",
    "Schedule intro calls with shadow stakeholders (Legal, IT Security)",
    "Prepare all compliance docs (SOC2, references, case studies) proactively",
    "Send Champion a visual timeline showing critical path and deadlines"
  ]} 
/>

---

## Quiz: The Rules of Engagement

```json
{
  "quizId": "criteria-process-2026",
  "title": "Mapping the Path to Signature",
  "questions": [
    {
      "id": "cp91",
      "type": "multiple-choice",
      "text": "What is the difference between Decision Criteria (Dc) and Decision Process (Dp)?",
      "options": [
        { "id": "a", "text": "Dc is about money; Dp is about time." },
        { "id": "b", "text": "Dc is the 'grading rubric' (what they buy); Dp is the 'steps to signature' (how they buy)." },
        { "id": "c", "text": "Dc is for the user; Dp is for the lawyer." },
        { "id": "d", "text": "There is no difference." }
      ],
      "correctAnswer": "b",
      "explanation": "Criteria is the'What' (requirements). Process is the'How' (the series of internal hurdles). You must master both to ensure a deal doesn't collapse at the last mile."
    },
    {
      "id": "cp92",
      "type": "multiple-choice",
      "text": "What is 'Poisoning the Well' in a Decision Criteria context?",
      "options": [
        { "id": "a", "text": "Talking badly about your competitors' staff." },
        { "id": "b", "text": "Using 'Inception Questions' to highlight a unique strength of your product so the prospect adds it to their 'mandatory' requirements, effectively disqualifying competitors who lack it." },
        { "id": "c", "text": "Offering a lower price than anyone else." },
        { "id": "d", "text": "Sabotaging the prospect's current tool." }
      ],
      "correctAnswer": "b",
      "explanation": "Strategic founders don't just react to a prospect's list; they influence it. By making your unique advantage a business requirement, you rig the game in your favor legally and technically."
    },
    {
      "id": "cp93",
      "type": "multiple-choice",
      "text": "Why is the Authorization Process often the 'Shadow Deal Killer'?",
      "options": [
        { "id": "a", "text": "Because lawyers and procurement officers aren't on your Zoom calls and don't care about your ROI or personal relationship with the Champion." },
        { "id": "b", "text": "Because it's expensive to buy contracts." },
        { "id": "c", "text": "Because CEOs like to sign things at the last minute." },
        { "id": "d", "text": "It isn't; once you get a verbal 'yes', the deal is done." }
      ],
      "correctAnswer": "a",
      "explanation": "Decision Process expertise is about identifying the people you *haven't* met. In 2026, Procurement and Legal are active gatekeepers who can delay a deal by weeks if they don't have the right security documentation upfront."
    }
  ]
}
```

**Next Lesson:** [Identify Pain vs. Champion](/sales-methodology/discovery-framework/lesson-10)