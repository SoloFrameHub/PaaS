---
title: "Autopilot vs Copilot Modes"
duration: "45 min"
track: "AI-Powered Acquisition"
course: "Course 26: Autonomous SDR Systems"
lesson: 2
---

# Autopilot vs Copilot Modes

## The $75,000 Email

Sarah launched her AI SDR on a Friday afternoon. Full autopilot mode. She'd configured her ICP, loaded 500 prospects, and hit "Start Campaign."

Monday morning, she woke up to 47 unread emails. Twelve were angry. Three threatened legal action. One was from a prospect she'd been nurturing for six months — now completely ghosting her.

The AI had sent a generic pitch to everyone, including the warm prospect. It misclassified his polite "not right now" as "not interested" and auto-sent a breakup email. Deal size: $75,000. Status: dead.

**The mistake?** Sarah treated "autonomous" as "set it and forget it."

<InsightCard icon="⚠️" title="The Autopilot Trap">
AI SDR platforms market themselves as "autonomous." But for solo founders, full autopilot is a loaded gun pointed at your brand reputation. One misfire can cost you months of pipeline.
</InsightCard>

This lesson teaches you the difference between autopilot and copilot modes, when each is appropriate, and how to graduate from one to the other without blowing up your business.

---

## What "Autopilot" Actually Means

Autopilot mode means the AI SDR runs **independently**:

1. **Selects prospects** from your database or built-in lists
2. **Researches each one** using enrichment APIs and web scraping
3. **Writes personalized emails** based on templates and AI generation
4. **Sends them** according to your schedule
5. **Handles replies** by classifying intent and auto-responding
6. **Books meetings** when someone says yes

You review a **daily summary** and handle **escalations** (angry replies, confused prospects, pricing questions).

### Who Uses Autopilot?

- **Sales teams** with 3+ SDRs running 500-2,000 contacts/day
- **Companies with proven playbooks** (6+ months of validated messaging)
- **Organizations with tolerance for error** (brand damage from 1-2% of sends is acceptable)

<ExampleCard label="Autopilot in Action: Enterprise SaaS">
A Series B SaaS company runs 11x (Alice) in autopilot. They send 1,200 emails/day across 4 segments. Alice handles 85% of replies automatically. The SDR manager reviews the 15% flagged as "needs human" — about 25 replies/day.

**Why it works for them:** High volume, proven messaging, dedicated SDR manager with time to supervise, $100K+ deal sizes justify occasional errors.

**Why it wouldn't work for you (yet):** You're sending 50-150/day, still testing messaging, no backup team, and one angry prospect could kill a $10K deal.
</ExampleCard>

<RangeSlider 
  label="How much of your outreach would you trust an AI to send without review?" 
  min={0} 
  max={100} 
  lowLabel="0% (review everything)" 
  highLabel="100% (full autopilot)" 
  persistKey="autonomous-sdr-L2-autopilot-comfort" 
/>

---

## What "Copilot" Actually Means

Copilot mode means the AI SDR **assists** you:

1. **Suggests prospects** based on your ICP filters
2. **Drafts emails** with personalization and research
3. **Recommends next actions** (follow-up timing, channel switch)
4. **Classifies replies** and drafts responses
5. **You approve/edit before every send**

Think of it as **AI-powered drafting + human-powered quality control**.

### Who Uses Copilot?

- **Solo founders** (that's you)
- **Early-stage companies** still validating messaging
- **Anyone prioritizing quality over volume**
- **High-ticket offers** where one bad email costs thousands

<FlipCard 
  front="The Copilot-First Rule" 
  back="ALWAYS start in copilot mode. Minimum 30 days of supervised operation before considering any autopilot features. Your brand reputation is not worth the time savings." 
/>

<ExampleCard label="Copilot in Action: B2B Consultant">
Marcus uses AiSDR in copilot mode. Every morning, the AI drafts 10 personalized emails based on his ICP. He reviews each one (takes 15 minutes), edits 3-4, approves the rest. When replies come in, the AI classifies them and drafts responses. Marcus reviews every reply before sending.

**Results:** 8-12 meetings/month, zero brand damage incidents, 90%+ satisfaction with AI output quality.

**Time investment:** 20-30 minutes/day. Worth it for $15K average deal size.
</ExampleCard>

---

## The Sleep Test

Here's the simplest decision framework:

**If you'd lose sleep over an AI-sent email going wrong with this prospect, review it manually.**

**If you wouldn't notice a bad email to this prospect, it can auto-send.**

<SwipeDecision
  title="Autopilot or Copilot?"
  description="Swipe right for Copilot (human review), left for Autopilot (AI sends)"
  optionA="Autopilot"
  optionB="Copilot"
  persistKey="autonomous-sdr-L2-sleep-test"
  cards={[
    {
      id: "1",
      content: "First email to a warm referral from your best customer",
      correctOption: "b",
      explanation: "High-value relationship. One bad email kills trust. Always review."
    },
    {
      id: "2",
      content: "Follow-up #3 to a cold prospect who hasn't replied",
      correctOption: "a",
      explanation: "Low relationship risk. If the AI messes up, you just lose a cold lead."
    },
    {
      id: "3",
      content: "Reply to someone asking about pricing",
      correctOption: "b",
      explanation: "Financial discussion. Misquote = lost deal or legal issue. Always review."
    },
    {
      id: "4",
      content: "Breakup email to someone who said 'not interested'",
      correctOption: "a",
      explanation: "Low risk. Standard template. AI can handle."
    },
    {
      id: "5",
      content: "First email to a prospect in your top 10 target accounts",
      correctOption: "b",
      explanation: "High-value target. First impression matters. Review it."
    },
    {
      id: "6",
      content: "Auto-reply to an out-of-office message",
      correctOption: "a",
      explanation: "Zero risk. Just logging and rescheduling. AI handles fine."
    }
  ]}
/>

---

## What You Can Safely Put on Autopilot

Even in copilot-first mode, some tasks are **low-risk, high-time-savings**. Automate these immediately:

### ✅ Safe Autopilot Tasks

1. **Data enrichment** — AI pulls job titles, company info, tech stack from Apollo/Clearbit
2. **Email verification** — AI checks deliverability before adding to sequence
3. **CRM field updates** — AI logs opens, clicks, replies to your CRM
4. **Internal notifications** — AI alerts you when high-priority prospects engage
5. **Meeting scheduling** — AI sends calendar link after you approve the reply
6. **Bounce processing** — AI removes hard bounces from your list
7. **List deduplication** — AI flags duplicates before you send

<InsightCard icon="🎯" title="The Automation Sweet Spot">
These tasks consume 30-40% of traditional SDR time but carry near-zero brand risk. Automate them on day one.
</InsightCard>

---

## What Should NEVER Be on Autopilot (For Solo Founders)

These tasks carry **high brand risk** or **high financial risk**. Keep them human-controlled:

### 🚫 Never Autopilot

1. **First outreach emails** — Brand risk. One generic blast = reputation damage.
2. **Reply handling to interested prospects** — Misclassification risk. AI might send breakup to warm lead.
3. **LinkedIn messages** — Ban risk. LinkedIn restricts 32M+ accounts/year for automation.
4. **Pricing discussions** — Financial risk. AI might misquote or promise wrong terms.
5. **Any message to a prospect you've spoken to** — Relationship risk. Context matters.
6. **Complaint handling** — Legal risk. Angry prospects need human empathy, not AI templates.

<ClassifyExercise
  title="Classify These AI SDR Tasks"
  persistKey="autonomous-sdr-L2-classify-tasks"
  categories={[
    { id: "autopilot", label: "Safe for Autopilot", color: "#10b981" },
    { id: "copilot", label: "Needs Human Review", color: "#f59e0b" },
    { id: "never", label: "Never Automate", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Enriching prospect job titles from LinkedIn", correctCategory: "autopilot" },
    { id: "2", content: "Sending first email to a new prospect", correctCategory: "copilot" },
    { id: "3", content: "Replying to 'What's your pricing?'", correctCategory: "never" },
    { id: "4", content: "Removing hard bounces from email list", correctCategory: "autopilot" },
    { id: "5", content: "Sending LinkedIn connection request", correctCategory: "never" },
    { id: "6", content: "Drafting follow-up email #2", correctCategory: "copilot" },
    { id: "7", content: "Logging email opens to CRM", correctCategory: "autopilot" },
    { id: "8", content: "Responding to 'Please remove me'", correctCategory: "autopilot" },
    { id: "9", content: "Sending calendar link after meeting request", correctCategory: "copilot" },
    { id: "10", content: "Handling angry complaint email", correctCategory: "never" }
  ]}
/>

---

## The Graduated Autonomy Model

You don't stay in full copilot forever. As your AI SDR proves itself, you **gradually** increase autonomy.

Here's the safe graduation path:

<SlideNavigation>
<Slide title="Weeks 1-4: Full Copilot">

**Review level:** Every email, every reply
**Auto-send:** 0%
**Daily time:** 30-45 minutes

### What You're Doing

- Learning how the AI thinks
- Calibrating prompts and templates
- Building trust in output quality
- Identifying edge cases

### Success Criteria to Graduate

- ✅ 90%+ of AI drafts need zero edits
- ✅ Zero brand damage incidents
- ✅ Reply classification accuracy >95%
- ✅ You understand the AI's failure modes

</Slide>

<Slide title="Weeks 5-8: Selective Autopilot">

**Review level:** Top 70% of prospects
**Auto-send:** Bottom 30% (low-value, cold)
**Daily time:** 20-30 minutes

### What You're Doing

- Auto-sending to prospects you'd barely notice if it went wrong
- Still reviewing high-value targets and all replies
- Monitoring for quality drift

### How to Segment

**Auto-send tier (bottom 30%):**
- Cold prospects outside ideal ICP
- Follow-up #4+ with no engagement
- Low deal size (&lt;$2K)

**Review tier (top 70%):**
- Ideal ICP matches
- Warm referrals
- Active conversations
- Deal size >$5K

</Slide>

<Slide title="Weeks 9-12: Expanded Autopilot">

**Review level:** Top 50% of prospects
**Auto-send:** Bottom 50%
**Daily time:** 15-20 minutes

### What You're Doing

- Auto-sending to most cold prospects
- Reviewing only high-value targets and positive replies
- Spot-checking autopilot output weekly

### Red Flags to Pause Graduation

- ⚠️ Reply rate drops >20%
- ⚠️ Complaint rate rises >0.05%
- ⚠️ You catch a misclassified reply
- ⚠️ Bounce rate spikes >5%

</Slide>

<Slide title="Week 13+: Max Solo Autopilot">

**Review level:** Top 30% of prospects
**Auto-send:** Bottom 70%
**Daily time:** 10-15 minutes

### What You're Doing

- Auto-sending to most prospects
- Reviewing only: (1) Positive replies, (2) Top 10 target accounts, (3) Warm referrals
- Weekly calibration sessions

### The 70% Ceiling

**Never go above 70% autopilot as a solo founder.**

Why? Because 30% of your prospects should always be high-value enough to deserve your personal attention. If they're not, your ICP is too broad.

</Slide>
</SlideNavigation>

<RangeSlider 
  label="After reading this, what % autopilot feels right for you in month 1?" 
  min={0} 
  max={100} 
  lowLabel="0% (full copilot)" 
  highLabel="100% (full autopilot)" 
  persistKey="autonomous-sdr-L2-month1-target" 
/>

---

## The Daily Review Workflow (Copilot Mode)

Here's what your morning routine looks like in copilot mode:

### 15-Minute Daily Review Block

**Minutes 1-5: Reply Queue**
- Check all new replies (AI has classified them)
- Review AI-drafted responses
- Approve/edit/reject each one

**Minutes 6-10: Today's Planned Sends**
- Review first-touch emails to new prospects
- Scan for personalization quality (FASP test)
- Check for hallucinations or off-brand language

**Minutes 11-13: Anomaly Scan**
- Bounce rate normal? (&lt;2%)
- Complaint rate normal? (&lt;0.05%)
- Send volume as expected?

**Minutes 14-15: Approve/Edit/Reject**
- Click approve on good drafts
- Quick edits on 80% good drafts
- Reject and rewrite the 5-10% that miss

<InsightCard icon="⏱️" title="Time Investment Reality Check">
15 minutes/day = 1.75 hours/week. For a solo founder doing $10K+ deals, this prevents $75K mistakes. The ROI is infinite.
</InsightCard>

---

## Copilot vs Autopilot: The Data

Let's look at what solo founders actually experience:

<ScenarioSimulator
  title="Copilot vs Autopilot Outcomes"
  persistKey="autonomous-sdr-L2-mode-simulator"
  levers={[
    { id: "volume", label: "Emails per day", min: 20, max: 200, step: 10, defaultValue: 50 },
    { id: "dealSize", label: "Average deal size ($)", min: 1000, max: 50000, step: 1000, defaultValue: 10000 }
  ]}
  outputs={[
    { 
      id: "copilotTime", 
      label: "Copilot: Daily time (min)", 
      formula: "(volume * 0.3)", 
      unit: "min", 
      precision: 0 
    },
    { 
      id: "autopilotTime", 
      label: "Autopilot: Daily time (min)", 
      formula: "(volume * 0.1)", 
      unit: "min", 
      precision: 0 
    },
    { 
      id: "copilotErrors", 
      label: "Copilot: Errors/month", 
      formula: "(volume * 30 * 0.005)", 
      unit: "", 
      precision: 1 
    },
    { 
      id: "autopilotErrors", 
      label: "Autopilot: Errors/month", 
      formula: "(volume * 30 * 0.15)", 
      unit: "", 
      precision: 1 
    },
    { 
      id: "errorCost", 
      label: "Autopilot: Error cost/month", 
      formula: "(volume * 30 * 0.15 * dealSize * 0.1)", 
      unit: "$", 
      precision: 0 
    }
  ]}
  insight="At `{volume}` emails/day with ${dealSize} deals, copilot takes {copilotTime} min/day but prevents ${errorCost} in potential lost pipeline from autopilot errors."
/>

### What the Numbers Show

**Copilot Mode:**
- ✅ 90%+ satisfaction with output quality
- ✅ &lt;1% error rate (caught before sending)
- ✅ Zero brand damage incidents
- ⏱️ 15-30 min/day review time

**Autopilot Mode (Solo Founders):**
- ⚠️ 40-60% satisfaction (quality anxiety)
- ⚠️ 5-20% error rate (misclassifications, hallucinations)
- ⚠️ 1 in 4 users report brand damage in first 90 days
- ⏱️ 5-10 min/day review time

**The Trade:** Save 10-20 min/day, risk $500-5,000 in lost pipeline per error.

---

## When Autopilot Makes Sense

Autopilot isn't always wrong. Here's when it's appropriate:

### ✅ Good Autopilot Scenarios

1. **You've run copilot for 60+ days** with 90%+ approval rate
2. **You're segmenting properly** (autopilot for bottom 30-50%, review top 50-70%)
3. **You have kill switches configured** (can pause instantly if things go wrong)
4. **Your deal size justifies the risk** (if errors cost &lt;1% of monthly revenue, acceptable)
5. **You're monitoring daily** (not "set it and forget it")

<StrategyDuel
  title="Copilot vs Selective Autopilot"
  persistKey="autonomous-sdr-L2-strategy-duel"
  scenario="You're a solo founder sending 100 emails/day. You've run copilot mode for 8 weeks with 95% approval rate. Should you graduate to selective autopilot?"
  strategyA={{
    name: "Stay Full Copilot",
    description: "Review every email before sending",
    pros: ["Zero risk of brand damage", "Maintain quality control", "Catch edge cases"],
    cons: ["30 min/day review time", "Slower to scale", "AI doesn't learn from approvals"]
  }}
  strategyB={{
    name: "Graduate to Selective Autopilot",
    description: "Auto-send bottom 30%, review top 70%",
    pros: ["Save 10 min/day", "Scale to 150+ emails/day", "AI learns from patterns"],
    cons: ["5-10% error risk on auto-send tier", "Need to monitor closely", "Requires good segmentation"]
  }}
  expertVerdict="Graduate to selective autopilot IF: (1) You've segmented properly (auto-send only to low-value cold prospects), (2) You have kill switches ready, (3) You commit to daily monitoring. The time savings (10 min/day = 60 hours/year) justify the small risk if you're supervising properly."
/>

---

## The Copilot-to-Autopilot Decision Tree

Use this decision tree for every AI SDR task:

<DecisionTree
  title="Should This Be Autopilot or Copilot?"
  persistKey="autonomous-sdr-L2-decision-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "Is this the first touchpoint with this prospect?",
      choices: [
        { label: "Yes", nextNodeId: "first-touch" },
        { label: "No", nextNodeId: "relationship" }
      ]
    },
    {
      id: "first-touch",
      content: "Is this prospect in your top 20% by deal size or strategic value?",
      choices: [
        { label: "Yes", nextNodeId: "copilot-high-value" },
        { label: "No", nextNodeId: "first-touch-low" }
      ]
    },
    {
      id: "first-touch-low",
      content: "Have you run copilot mode for 60+ days with 90%+ approval rate?",
      choices: [
        { label: "Yes", nextNodeId: "autopilot-ok" },
        { label: "No", nextNodeId: "copilot-calibration" }
      ]
    },
    {
      id: "relationship",
      content: "Have you had a conversation (call, meeting, or 3+ email exchanges) with this person?",
      choices: [
        { label: "Yes", nextNodeId: "copilot-relationship" },
        { label: "No", nextNodeId: "reply-type" }
      ]
    },
    {
      id: "reply-type",
      content: "What type of message is this?",
      choices: [
        { label: "Reply to interested prospect", nextNodeId: "copilot-interested" },
        { label: "Follow-up to no response", nextNodeId: "followup-check" },
        { label: "Administrative (unsubscribe, bounce)", nextNodeId: "autopilot-admin" }
      ]
    },
    {
      id: "followup-check",
      content: "Is this follow-up #4 or later with zero engagement?",
      choices: [
        { label: "Yes", nextNodeId: "autopilot-ok" },
        { label: "No", nextNodeId: "copilot-early-followup" }
      ]
    },
    {
      id: "copilot-high-value",
      content: "✋ COPILOT MODE — High-value first touch. Review before sending.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "copilot-calibration",
      content: "✋ COPILOT MODE — Still calibrating. Review everything for 60 days first.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "copilot-relationship",
      content: "✋ COPILOT MODE — Active relationship. Always review.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "copilot-interested",
      content: "✋ COPILOT MODE — Interested prospect. Never auto-send replies.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "copilot-early-followup",
      content: "✋ COPILOT MODE — Early follow-up. Review for quality.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "autopilot-ok",
      content: "✅ AUTOPILOT OK — Low-risk, proven system. Auto-send with monitoring.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "autopilot-admin",
      content: "✅ AUTOPILOT OK — Administrative task. Zero brand risk.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

---

## Your Autopilot/Copilot Operating Manual

Let's build your decision framework:

<TemplateBuilder
  title="Your AI SDR Mode Configuration"
  persistKey="autonomous-sdr-L2-mode-config"
  sections={[
    {
      id: "current-state",
      title: "Current State",
      fields: [
        { 
          id: "experience", 
          label: "How long have you been running AI SDR?", 
          placeholder: "e.g., 2 weeks, 3 months, haven't started", 
          type: "text" 
        },
        { 
          id: "volume", 
          label: "Current daily send volume", 
          placeholder: "e.g., 50 emails/day", 
          type: "text" 
        },
        { 
          id: "approval-rate", 
          label: "What % of AI drafts do you approve without edits?", 
          placeholder: "e.g., 85%, don't know yet", 
          type: "text" 
        }
      ]
    },
    {
      id: "risk-tolerance",
      title: "Risk Tolerance",
      fields: [
        { 
          id: "deal-size", 
          label: "Average deal size", 
          placeholder: "e.g., $10,000", 
          type: "text" 
        },
        { 
          id: "error-cost", 
          label: "What would one lost deal cost you?", 
          placeholder: "e.g., $10K in revenue + 3 months of pipeline", 
          type: "textarea" 
        },
        { 
          id: "brand-sensitivity", 
          label: "How brand-sensitive is your market?", 
          placeholder: "e.g., Very (finance/legal), Moderate (SaaS), Low (ecommerce)", 
          type: "text" 
        }
      ]
    },
    {
      id: "mode-decision",
      title: "Your Mode Decision",
      fields: [
        { 
          id: "starting-mode", 
          label: "What mode will you start in?", 
          placeholder: "Full copilot / Selective autopilot / Other", 
          type: "text" 
        },
        { 
          id: "graduation-criteria", 
          label: "What criteria must be met before you increase autopilot %?", 
          placeholder: "e.g., 90%+ approval rate for 30 days, zero brand incidents, reply rate stable", 
          type: "textarea" 
        },
        { 
          id: "never-autopilot", 
          label: "What will you NEVER put on autopilot?", 
          placeholder: "e.g., First touches to top 20% prospects, pricing discussions, LinkedIn DMs", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## Summary: The Copilot-First Manifesto

Here's what you need to remember:

<InteractiveChecklist 
  title="Your Autopilot vs Copilot Action Items" 
  persistKey="autonomous-sdr-L2-actions" 
  items={[
    "Start in FULL COPILOT mode — review every email for 30-60 days minimum",
    "Use the Sleep Test: if you'd lose sleep over an error, review it manually",
    "Automate low-risk tasks immediately: enrichment, verification, CRM updates, bounce processing",
    "NEVER autopilot: first touches to high-value prospects, pricing, LinkedIn, active relationships",
    "Graduate to selective autopilot only after 60+ days with 90%+ approval rate",
    "Never exceed 70% autopilot as a solo founder — top 30% always deserve human attention",
    "Configure kill switches BEFORE launching any autopilot features",
    "Commit to 15 min/day review even in autopilot mode — it's not 'set it and forget it'",
    "Monitor daily for red flags: bounce rate >5%, complaint rate >0.05%, reply rate drops >20%",
    "Document your mode decision in your AI SDR Operating Manual (you'll build this in Lesson 7)"
  ]} 
/>

---

## What's Next

In **Lesson 3**, we'll do a deep dive on the major AI SDR platforms: 11x, Artisan, AiSDR, and Salesforge. You'll learn:

- Feature-by-feature comparison
- Pricing and contract terms
- Solo founder fit scores
- Vendor survival risk assessment

You'll walk away with a **Platform Evaluation Scorecard** to make an informed decision about which (if any) AI SDR platform is right for you.

But first, let's test your understanding:

---

```json
{
  "quizTitle": "Autopilot vs Copilot Mode Check",
  "questions": [
    {
      "id": "q1",
      "question": "What is the primary difference between autopilot and copilot mode?",
      "options": [
        "Autopilot is faster, copilot is more accurate",
        "Autopilot runs independently, copilot requires human approval before sending",
        "Autopilot costs more, copilot is cheaper",
        "Autopilot uses better AI models, copilot uses basic templates"
      ],
      "correctAnswer": 1,
      "explanation": "Autopilot mode means the AI sends emails independently with human review only of summaries and escalations. Copilot mode means the AI drafts but humans approve before every send."
    },
    {
      "id": "q2",
      "question": "According to the Copilot-First Rule, how long should you run copilot mode before considering autopilot?",
      "options": [
        "1 week minimum",
        "2 weeks minimum",
        "30 days minimum",
        "90 days minimum"
      ],
      "correctAnswer": 2,
      "explanation": "The Copilot-First Rule states: ALWAYS start in copilot mode for a minimum of 30 days of supervised operation before considering any autopilot features."
    },
    {
      "id": "q3",
      "question": "Which of these tasks is SAFE to put on autopilot immediately?",
      "options": [
        "First email to a new prospect",
        "Reply to someone asking about pricing",
        "Email verification and bounce processing",
        "LinkedIn connection requests"
      ],
      "correctAnswer": 2,
      "explanation": "Email verification and bounce processing are low-risk, high-time-savings tasks. They carry near-zero brand risk and should be automated immediately."
    },
    {
      "id": "q4",
      "question": "What is the maximum autopilot percentage recommended for solo founders?",
      "options": [
        "50%",
        "70%",
        "90%",
        "100%"
      ],
      "correctAnswer": 1,
      "explanation": "Never go above 70% autopilot as a solo founder. The top 30% of your prospects should always be high-value enough to deserve your personal attention."
    },
    {
      "id": "q5",
      "question": "Solo founders using full autopilot report what satisfaction rate with output quality?",
      "options": [
        "90%+ satisfaction",
        "70-80% satisfaction",
        "40-60% satisfaction",
        "20-30% satisfaction"
      ],
      "correctAnswer": 2,
      "explanation": "Solo founders using full autopilot report 40-60% satisfaction due to quality concerns, compared to 90%+ for those using copilot mode."
    },
    {
      "id": "q6",
      "question": "According to the Sleep Test, when should you use copilot mode?",
      "options": [
        "For all prospects in your database",
        "Only for prospects you've already spoken to",
        "For prospects where you'd lose sleep if an AI email went wrong",
        "Only during the first 30 days of using AI SDR"
      ],
      "correctAnswer": 2,
      "explanation": "The Sleep Test: If you'd lose sleep over an AI-sent email going wrong with this prospect, review it manually (copilot). If you wouldn't notice a bad email, it can auto-send (autopilot)."
    },
    {
      "id": "q7",
      "question": "What is the estimated error rate for autopilot mode?",
      "options": [
        "0-1%",
        "5-20%",
        "25-40%",
        "50%+"
      ],
      "correctAnswer": 1,
      "explanation": "Autopilot mode has a 5-20% error rate (misclassifications, hallucinations) depending on the platform, compared to &lt;1% for copilot mode where humans catch errors before sending."
    },
    {
      "id": "q8",
      "question": "Which of these should NEVER be on autopilot for solo founders?",
      "options": [
        "CRM field updates",
        "Email verification",
        "Reply handling to interested prospects",
        "Bounce processing"
      ],
      "correctAnswer": 2,
      "explanation": "Reply handling to interested prospects should NEVER be on autopilot. Misclassification risk is too high — the AI might send a breakup email to a warm lead, killing the deal."
    }
  ]
}