---
title: "'Save' Plays: Downgrades, Pauses, and Recovery Calls"
duration: "50 min"
track: "Customer Success"
course: "Course 37: Retention & Churn Prevention"
lesson: 7
---

# 'Save' Plays: Downgrades, Pauses, and Recovery Calls

## The $50/Month Customer Who Almost Left

Sarah runs a project management tool for creative agencies. One Tuesday morning, she gets the notification every founder dreads: "Customer #247 has requested cancellation."

The customer: a 9-month subscriber paying $149/month. Total lifetime value so far: $1,341. If they stay another year: $3,129.

Sarah has two choices:
1. Click "Confirm Cancellation" and lose $1,788 in future revenue
2. Spend 15 minutes understanding what happened and offering a save play

She chose option 2. Ten minutes later, the customer was on a $79/month plan instead of churned. **Annual impact: $948 retained vs. $0.**

That's the power of save plays. Today, you'll learn exactly how to execute them.

<InsightCard icon="💰" title="The Save Play Economics">
A customer paying $50/month is infinitely more valuable than a churned customer paying $0. Every save play — downgrade, pause, or recovery call — beats losing them completely.
</InsightCard>

---

## The Three Save Play Options

When a customer signals intent to cancel, you have three strategic responses:

<FlipCard 
  front="Save Play #1: The Downgrade" 
  back="Reduce their plan to match reduced needs. Retains 20-40% of would-be cancellations. A $50/mo customer beats a $0 churned customer every time." 
/>

<FlipCard 
  front="Save Play #2: The Pause" 
  back="Offer 30-60 day account freeze. Data stays intact, they can restart anytime. 60-70% of paused customers reactivate vs. 5-15% of cancelled customers." 
/>

<FlipCard 
  front="Save Play #3: The Recovery Call" 
  back="For high-value accounts ($200+/mo): 10-15 minute call within 24 hours. Personal intervention saves 30-50% of at-risk accounts." 
/>

Let's break down when and how to use each one.

---

## Part 1: The Downgrade Save

### When to Offer a Downgrade

A downgrade makes sense when the customer's **need has decreased**, not disappeared:

- They're using fewer features than they're paying for
- Their team size shrunk (fewer seats needed)
- Their business volume decreased (processing fewer transactions, managing fewer projects)
- Budget constraints, but they still see value

<ExampleCard label="Real Scenario: The Seasonal Business">
A customer runs a tax preparation service. They need your invoicing tool heavily January-April, barely touch it May-December. Instead of churning in May, you offer a seasonal downgrade: $99/mo during tax season, $29/mo off-season. They stay for 3 years.

**Math**: $99×4 + $29×8 = $628/year vs. $0 churned = $1,884 over 3 years retained.
</ExampleCard>

### The Downgrade Decision Tree

<DecisionTree
  title="Should You Offer a Downgrade?"
  persistKey="retention-L7-downgrade-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "Customer signals cancellation. What's their stated reason?",
      choices: [
        { label: "Too expensive / budget cut", nextNodeId: "price" },
        { label: "Not using it enough", nextNodeId: "usage" },
        { label: "Missing a feature", nextNodeId: "feature" },
        { label: "Found a competitor", nextNodeId: "competitor" }
      ]
    },
    {
      id: "price",
      content: "Price objection. Do they still see value in the product?",
      choices: [
        { label: "Yes, just can't afford current tier", nextNodeId: "downgrade-offer" },
        { label: "No, they don't see ROI", nextNodeId: "recovery-call" }
      ]
    },
    {
      id: "usage",
      content: "Low usage. Have they ever been an active user?",
      choices: [
        { label: "Yes, but usage dropped recently", nextNodeId: "pause-offer" },
        { label: "No, never really adopted", nextNodeId: "onboarding-failure" }
      ]
    },
    {
      id: "feature",
      content: "Missing feature. Is it on your roadmap?",
      choices: [
        { label: "Yes, shipping in 1-2 months", nextNodeId: "pause-offer" },
        { label: "No, not planned", nextNodeId: "graceful-exit" }
      ]
    },
    {
      id: "competitor",
      content: "Competitor switch. What does competitor offer that you don't?",
      choices: [
        { label: "Lower price for same features", nextNodeId: "downgrade-offer" },
        { label: "Feature you don't have", nextNodeId: "recovery-call" }
      ]
    },
    {
      id: "downgrade-offer",
      content: "✅ Offer downgrade: 'Would a $X/month plan work better for your current needs?'",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "pause-offer",
      content: "✅ Offer pause: 'Would you like to pause for 30-60 days instead of cancelling?'",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "recovery-call",
      content: "✅ Schedule recovery call: 'Can I jump on a 10-minute call to understand what happened?'",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "onboarding-failure",
      content: "⚠️ Onboarding failure. Offer one-on-one setup help or graceful exit.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "graceful-exit",
      content: "✅ Graceful exit: Thank them, keep door open, ask for feedback.",
      isTerminal: true,
      outcome: "neutral"
    }
  ]}
/>

### Downgrade Offer Scripts

<TemplateBuilder
  title="Your Downgrade Offer Script"
  persistKey="retention-L7-downgrade-script"
  sections={[
    {
      id: "acknowledge",
      title: "Step 1: Acknowledge Their Situation",
      fields: [
        {
          id: "empathy",
          label: "Empathy Statement",
          placeholder: "e.g., I completely understand — budgets are tight right now.",
          type: "textarea"
        }
      ]
    },
    {
      id: "offer",
      title: "Step 2: Present the Downgrade",
      fields: [
        {
          id: "plan",
          label: "Downgrade Plan Name & Price",
          placeholder: "e.g., Starter plan at $49/month",
          type: "text"
        },
        {
          id: "features",
          label: "What They Keep",
          placeholder: "e.g., All your data, core features, just fewer seats",
          type: "textarea"
        }
      ]
    },
    {
      id: "bridge",
      title: "Step 3: Frame as Temporary",
      fields: [
        {
          id: "future",
          label: "Future Upgrade Path",
          placeholder: "e.g., You can always upgrade when business picks back up",
          type: "textarea"
        }
      ]
    }
  ]}
/>

<InsightCard icon="📊" title="Downgrade Success Rates">
**Industry benchmark**: Downgrade offers retain 20-40% of would-be cancellations. For solo founders, even 20% retention means thousands in saved revenue annually.
</InsightCard>

---

## Part 2: The Pause Offer

### Why Pauses Work Better Than Cancellations

The pause is psychologically brilliant. It reframes cancellation from **permanent loss** to **temporary break**.

<ComparisonBuilder
  title="Cancellation vs. Pause Messaging"
  persistKey="retention-L7-pause-compare"
  prompt="Write your pause offer message"
  expertExample="I noticed you're thinking of cancelling. Would pausing for 60 days work better? Your account stays intact, data is safe, and you can restart anytime with one click. No pressure — just want to make sure you have options."
  criteria={[
    "Frames pause as easier than cancellation",
    "Emphasizes data safety",
    "Removes friction to restart",
    "No guilt or pressure"
  ]}
/>

### When to Offer a Pause

<ClassifyExercise
  title="Pause or Not?"
  persistKey="retention-L7-pause-classify"
  categories={[
    { id: "pause", label: "Offer Pause", color: "#10b981" },
    { id: "downgrade", label: "Offer Downgrade", color: "#f59e0b" },
    { id: "exit", label: "Graceful Exit", color: "#ef4444" }
  ]}
  items={[
    {
      id: "1",
      content: "Customer says: 'I'm swamped with a big project for the next 2 months and won't have time to use this.'",
      correctCategory: "pause"
    },
    {
      id: "2",
      content: "Customer says: 'We're scaling back and can only afford the basic plan.'",
      correctCategory: "downgrade"
    },
    {
      id: "3",
      content: "Customer says: 'We switched to [competitor] because they have [feature you don't].'",
      correctCategory: "exit"
    },
    {
      id: "4",
      content: "Customer says: 'I achieved what I needed — my book is published, don't need the writing tool anymore.'",
      correctCategory: "exit"
    },
    {
      id: "5",
      content: "Customer says: 'Business is slow right now, might need this again in Q3.'",
      correctCategory: "pause"
    }
  ]}
/>

### The Pause Mechanics

**Technical setup:**
- Pause duration: 30-60 days (user chooses)
- Billing: automatically paused, restarts on reactivation
- Data: fully preserved, read-only access optional
- Reactivation: one-click self-service

**Communication:**
- Day 1 of pause: "Your account is paused. Here's how to restart anytime."
- Day 15 of pause: "Halfway through your pause — everything's waiting for you."
- Day 25 of pause: "Your pause ends in 5 days. Restart now or extend?"
- Day 30: Auto-reactivate OR extend pause OR convert to cancellation (user chooses)

<RangeSlider
  label="What pause duration will you offer?"
  min={14}
  max={90}
  step={7}
  lowLabel="14 days"
  highLabel="90 days"
  persistKey="retention-L7-pause-duration"
/>

<InsightCard icon="🔄" title="Pause Recovery Rates">
**60-70%** of paused customers reactivate vs. **5-15%** of cancelled customers who return. The pause is a retention superpower.
</InsightCard>

---

## Part 3: The Recovery Call

### When to Pick Up the Phone

Not every at-risk customer deserves a personal call. Use this filter:

<SlideNavigation>
<Slide title="High-Value Threshold">

**Call if:**
- Customer pays $200+/month
- Customer has been with you 6+ months
- Customer is a strategic account (referral source, case study, industry influencer)

**Don't call if:**
- Customer is &lt;$100/month AND &lt;3 months tenure
- Customer never engaged (ghost from day 1)
- Customer already accepted downgrade/pause

</Slide>

<Slide title="Timing Matters">

**Best time to call:**
- Within 24 hours of cancellation signal
- During business hours (their timezone)
- When you have 15-20 minutes of uninterrupted focus

**Worst time:**
- After they've already moved to competitor
- When you're rushed or distracted
- Via voicemail (always try live first)

</Slide>

<Slide title="Preparation Checklist">

Before the call, review:
- [ ] Their usage data (last 30 days)
- [ ] Support ticket history
- [ ] Last 3 emails from them
- [ ] Their stated cancellation reason
- [ ] What save play you'll offer

</Slide>
</SlideNavigation>

### The 15-Minute Recovery Call Script

<ProgressiveReveal title="The 5-Part Recovery Call Framework" persistKey="retention-L7-call-reveal">

<RevealSection title="Part 1: The Opening (2 min)">

**Your goal:** Set a collaborative, non-defensive tone.

**Script:**
> "Hi [Name], this is [Your Name] from [Company]. Thank you for being a customer — I really appreciate the time you've given us. I noticed [cancellation signal] and wanted to reach out personally to understand what happened. Do you have 10 minutes to talk?"

**Key moves:**
- Thank them first (gratitude disarms defensiveness)
- State the reason for the call directly
- Ask permission for their time
- Keep it short — 2 minutes max

</RevealSection>

<RevealSection title="Part 2: Discovery (4 min)">

**Your goal:** Understand the real reason, not just the stated reason.

**Questions to ask:**
1. "Can you help me understand what's not working?"
2. "When did you first start feeling like this wasn't the right fit?"
3. "What would need to change for you to stay?"

**What to listen for:**
- **Product issue** → Can you fix it?
- **Onboarding failure** → Can you re-onboard them?
- **Changed needs** → Downgrade or pause?
- **Competitor** → What do they offer that you don't?

**Critical rule:** Don't defend or explain yet. Just listen.

</RevealSection>

<RevealSection title="Part 3: The Save Offer (3 min)">

**Your goal:** Present a tailored solution based on what you just heard.

**Framework:**
> "Based on what you've shared, here's what I can offer: [specific save play]. Would that work for you?"

**Examples:**
- **Product issue:** "I can escalate this to our dev team and have a fix by [date]. Would you be willing to pause for 30 days while we solve it?"
- **Budget:** "What if we moved you to our $X plan? You'd keep [core features] at a price that works."
- **Competitor:** "They have [feature], which we don't. But we do have [your differentiator]. Is that valuable enough to stay?"

</RevealSection>

<RevealSection title="Part 4: Handle Objections (3 min)">

**Common objections and responses:**

| Objection | Response |
|-----------|----------|
| "I've already decided." | "I respect that. Can I ask what the final factor was? I want to make sure we learn from this." |
| "Your competitor is cheaper." | "That makes sense. Are there features you'd miss if you switched? Sometimes the savings aren't worth the switching cost." |
| "I just don't have time to use it." | "Would a pause work better? Your data stays safe and you can come back when things calm down." |
| "You're missing [feature]." | "You're right, we don't have that yet. It's on our roadmap for [timeframe]. Would that timeline work for you?" |

</RevealSection>

<RevealSection title="Part 5: Close (3 min)">

**If saved:**
> "Great — I'll get that set up for you today. Let me send you a confirmation email with the details. And I'll personally check in with you in [timeframe] to make sure everything's working. Sound good?"

**If not saved:**
> "I understand. I really appreciate you giving us a shot. The door is always open if your needs change. I'll make sure your cancellation is smooth and your data export is ready. Can I ask one last favor — would you be willing to share feedback on what we could have done better?"

**Critical:** End on a positive note. 15-20% of gracefully offboarded customers return within 12 months.

</RevealSection>

</ProgressiveReveal>

### Practice the Recovery Call

<MiniRoleplay
  scenario="You're calling a customer who's been with you for 8 months ($250/month plan). They submitted a cancellation request with reason: 'Not using it enough.' Their usage dropped 60% in the last 30 days."
  role="You are the founder making the recovery call"
  persistKey="retention-L7-call-roleplay"
  modelResponse="Hi [Name], this is [Founder] from [Product]. Thank you for being with us for 8 months — I've really appreciated having you as a customer. I saw you requested cancellation and wanted to understand what happened. Do you have 10 minutes? [PAUSE] I noticed your usage dropped recently. Can you help me understand what changed? [LISTEN] Based on what you're saying, it sounds like you're in a busy season. Would pausing for 60 days work better than cancelling? Your data stays intact and you can restart with one click when things calm down."
/>

---

## Part 4: The Cancellation Flow

### Don't Make It Easy AND Don't Make It Hard

The best cancellation flows balance **respect for the customer** with **opportunity to save**.

<StrategyDuel
  title="Cancellation Flow Philosophy"
  persistKey="retention-L7-flow-duel"
  scenario="A customer clicks 'Cancel My Account.' What happens next?"
  strategyA={{
    name: "Instant Cancellation",
    description: "One-click cancel, no questions asked.",
    pros: ["Respects customer autonomy", "No dark patterns"],
    cons: ["Misses 20-40% of saveable customers", "No feedback loop"]
  }}
  strategyB={{
    name: "Multi-Step Save Flow",
    description: "Ask why → offer save play → confirm → exit survey",
    pros: ["Retains 20-40% more customers", "Gathers cancellation data"],
    cons: ["Can feel manipulative if poorly executed"]
  }}
  expertVerdict="Strategy B wins IF executed with respect. The key: make each step valuable to the customer (not just you). Ask why to offer a better solution, not to guilt-trip. Offer save plays that genuinely help, not desperate discounts. Confirm clearly, don't hide the cancel button."
/>

### The 4-Step Cancellation Flow

<SlideNavigation>
<Slide title="Step 1: Ask Why (1-Click)">

**UI:** Radio buttons, not open text (reduces friction)

**Options:**
- [ ] Too expensive
- [ ] Not using it enough
- [ ] Missing a feature I need
- [ ] Found a better alternative
- [ ] Budget cut / business change
- [ ] Achieved my goal
- [ ] Other (optional text field)

**Why this works:** You get structured data + it takes 5 seconds.

</Slide>

<Slide title="Step 2: Contextual Save Offer">

**Based on their reason, show ONE save play:**

| Reason Selected | Save Offer Shown |
|----------------|------------------|
| Too expensive | "Would our $X plan work better? Same core features, lower price." |
| Not using it | "Would you like to pause for 60 days instead? Your data stays safe." |
| Missing feature | "That feature is on our roadmap for [date]. Want to pause until then?" |
| Found alternative | "We'd love to understand what they offer that we don't. 5-minute call?" |
| Budget cut | "Downgrade to $X/month or pause for 30-60 days?" |
| Achieved goal | "Congrats! 🎉 The door is always open if you need us again." |

**UI:** Big green button for save play, small gray link for "No thanks, cancel anyway."

</Slide>

<Slide title="Step 3: Confirm Cancellation">

**If they decline the save offer:**

**UI:**
> "We're sorry to see you go. Your cancellation will take effect on [date]. Your data will be available for download until [date + 30 days]."

**Buttons:**
- "Yes, cancel my account" (red, clear)
- "Actually, I'll stay" (green, secondary)

**Why this works:** Final chance to reconsider without dark patterns.

</Slide>

<Slide title="Step 4: Exit Survey">

**After cancellation confirmed:**

**Questions (optional, 2-3 max):**
1. "What could we have done differently?"
2. "Would you recommend us to others?" (Yes/No)
3. "Can we follow up in 3 months to see if your needs changed?"

**Why this works:** You get feedback + permission to re-engage later.

</Slide>
</SlideNavigation>

<InsightCard icon="🎯" title="Cancellation Flow Impact">
Companies with structured cancellation flows retain **10-15% more customers** than those with a simple "click to cancel" button. The key: respect + relevance.
</InsightCard>

---

## Part 5: Post-Churn Recovery

### The Long Game: Win-Back Campaigns

Not every customer who leaves is gone forever. **15-20% of gracefully offboarded customers return within 12 months.**

<TemplateBuilder
  title="Your 90-Day Win-Back Sequence"
  persistKey="retention-L7-winback-sequence"
  sections={[
    {
      id: "day7",
      title: "Day 7 Post-Cancel: The Check-In",
      fields: [
        {
          id: "subject",
          label: "Subject Line",
          placeholder: "e.g., How's the transition going?",
          type: "text"
        },
        {
          id: "body",
          label: "Email Body",
          placeholder: "Hi [Name], Just wanted to check in a week after your cancellation. How's the transition to [alternative] going? If anything isn't working as expected, the door is always open.",
          type: "textarea"
        }
      ]
    },
    {
      id: "day30",
      title: "Day 30 Post-Cancel: The Update",
      fields: [
        {
          id: "subject",
          label: "Subject Line",
          placeholder: "e.g., What's new at [Product]",
          type: "text"
        },
        {
          id: "body",
          label: "Email Body",
          placeholder: "Hi [Name], Wanted to share what we've shipped since you left: [new feature 1], [new feature 2]. If any of these solve problems you're facing, let's chat.",
          type: "textarea"
        }
      ]
    },
    {
      id: "day90",
      title: "Day 90 Post-Cancel: The Offer",
      fields: [
        {
          id: "subject",
          label: "Subject Line",
          placeholder: "e.g., Come back for 50% off your first month",
          type: "text"
        },
        {
          id: "body",
          label: "Email Body",
          placeholder: "Hi [Name], It's been 3 months since you left. If you're open to giving us another shot, I'd like to offer 50% off your first month back. No pressure — just wanted to extend the offer.",
          type: "textarea"
        }
      ]
    }
  ]}
/>

### The Graceful Exit Principle

**How you treat customers on the way out determines whether they come back.**

<SwipeDecision
  title="Graceful Exit or Burned Bridge?"
  description="Swipe right for graceful exits, left for burned bridges"
  optionA="Burned Bridge"
  optionB="Graceful Exit"
  persistKey="retention-L7-exit-swipe"
  cards={[
    {
      id: "1",
      content: "Customer cancels. You send: 'Sorry to see you go. Your account is now closed.'",
      correctOption: "a",
      explanation: "Too cold. No gratitude, no door left open."
    },
    {
      id: "2",
      content: "Customer cancels. You send: 'Thank you for being a customer. Your data will be available for 30 days. If your needs change, we're here.'",
      correctOption: "b",
      explanation: "Perfect. Gratitude + practical info + open door."
    },
    {
      id: "3",
      content: "Customer cancels. You send: 'Are you SURE? You'll lose all your data and can't come back!'",
      correctOption: "a",
      explanation: "Guilt trip + false urgency. Manipulative."
    },
    {
      id: "4",
      content: "Customer cancels. You send nothing.",
      correctOption: "a",
      explanation: "Radio silence feels like you don't care."
    },
    {
      id: "5",
      content: "Customer cancels. You send: 'I'm sorry we couldn't meet your needs. I'd love to learn what we could have done better. The door is always open.'",
      correctOption: "b",
      explanation: "Humble, curious, and welcoming. Perfect graceful exit."
    }
  ]}
/>

---

## Your Save Playbook Assembly

Now it's time to build your complete save playbook.

<InteractiveChecklist
  title="Your Save Playbook Checklist"
  persistKey="retention-L7-playbook-checklist"
  items={[
    "Define downgrade tiers and pricing for each",
    "Write downgrade offer scripts for each cancellation reason",
    "Set up pause mechanics (30-day and 60-day options)",
    "Write pause offer email template",
    "Create recovery call script with objection responses",
    "Define high-value threshold for recovery calls ($200+/mo or custom)",
    "Build 4-step cancellation flow (ask why → save offer → confirm → survey)",
    "Write exit survey questions (2-3 max)",
    "Create 90-day win-back email sequence (Day 7, 30, 90)",
    "Set up cancellation reason tracking in your CRM/spreadsheet"
  ]}
/>

---

## Save Play Simulation

Let's practice all three save plays in realistic scenarios.

<TimedChallenge
  title="Save Play Speed Drill"
  persistKey="retention-L7-speed-drill"
  timeLimit={120}
  items={[
    {
      id: "1",
      prompt: "Customer ($99/mo, 6 months tenure) says: 'Too expensive right now.' What's your save play?",
      correctAnswer: "Downgrade to $49/mo plan",
      explanation: "Price objection + still sees value = downgrade offer."
    },
    {
      id: "2",
      prompt: "Customer ($299/mo, 12 months tenure) says: 'Swamped with a big project, won't use this for 2 months.' What's your save play?",
      correctAnswer: "Offer 60-day pause",
      explanation: "Temporary busy period = pause, not cancellation."
    },
    {
      id: "3",
      prompt: "Customer ($499/mo, 8 months tenure) says: 'Switching to [competitor] because they have [feature].' What's your save play?",
      correctAnswer: "Schedule recovery call",
      explanation: "High-value + competitor switch = personal intervention needed."
    },
    {
      id: "4",
      prompt: "Customer ($29/mo, 2 months tenure) says: 'Never really used it.' What's your save play?",
      correctAnswer: "Graceful exit",
      explanation: "Low-value + never engaged = not worth recovery effort."
    },
    {
      id: "5",
      prompt: "Customer ($199/mo, 10 months tenure) says: 'Budget cut — can only afford $99/mo max.' What's your save play?",
      correctAnswer: "Downgrade to $99/mo plan",
      explanation: "They stated the exact price they can afford. Match it."
    }
  ]}
/>

---

## The Save Play ROI Calculator

How much revenue can save plays actually recover?

<ScenarioSimulator
  title="Save Play Revenue Impact"
  persistKey="retention-L7-roi-simulator"
  levers={[
    {
      id: "cancellations",
      label: "Monthly cancellation requests",
      min: 1,
      max: 50,
      step: 1,
      defaultValue: 10
    },
    {
      id: "arpu",
      label: "Average revenue per user ($/mo)",
      min: 20,
      max: 500,
      step: 10,
      defaultValue: 100
    },
    {
      id: "saveRate",
      label: "Save play success rate (%)",
      min: 10,
      max: 50,
      step: 5,
      defaultValue: 25
    }
  ]}
  outputs={[
    {
      id: "saved",
      label: "Customers saved per month",
      formula: "cancellations * (saveRate / 100)",
      unit: "",
      precision: 1
    },
    {
      id: "monthlyRevenue",
      label: "Monthly revenue retained",
      formula: "cancellations * (saveRate / 100) * arpu",
      unit: "$",
      precision: 0
    },
    {
      id: "annualRevenue",
      label: "Annual revenue retained",
      formula: "cancellations * (saveRate / 100) * arpu * 12",
      unit: "$",
      precision: 0
    }
  ]}
  insight="At a {saveRate}% save rate, you're retaining ${monthlyRevenue}/month or ${annualRevenue}/year. That's the cost of a full-time CS hire — funded entirely by save plays."
/>

---

## Summary: The Save Play System

You now have three powerful retention tools:

1. **Downgrade** — Retain 20-40% of price-sensitive customers by matching plan to need
2. **Pause** — Retain 60-70% of temporarily inactive customers by offering a break instead of breakup
3. **Recovery Call** — Save 30-50% of high-value at-risk accounts with personal intervention

**The key insight:** A customer paying anything is infinitely more valuable than a churned customer paying $0.

<InteractiveChecklist
  title="Your Save Play Action Items"
  persistKey="retention-L7-actions"
  items={[
    "Build your downgrade tier structure and pricing",
    "Write save play scripts for each cancellation reason",
    "Set up pause mechanics (30-day and 60-day)",
    "Create your recovery call script and practice it",
    "Design your 4-step cancellation flow",
    "Write your 90-day win-back sequence",
    "Calculate your save play ROI using the simulator above",
    "Add save play triggers to your weekly CS review (Lesson 8)"
  ]}
/>

**Next lesson:** We'll build your Weekly CS Review Block — the 2-3 hour ritual that keeps your retention system running without constant firefighting.