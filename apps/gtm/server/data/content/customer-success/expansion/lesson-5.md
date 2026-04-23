---
title: "Done-for-You & Consulting Upsell Paths"
duration: "50 min"
track: "Customer Success"
course: "Course 38: Expansion & Upsell"
lesson: 5
---

You've just wrapped a customer call. They love your product. They're getting results. And then they say the magic words:

**"This is great, but honestly... I just don't have time to do this myself."**

Most founders miss this moment. They nod sympathetically, maybe offer a tutorial link, and move on.

But what they just heard was: **"I will pay you 3-10x more to do this for me."**

Done-for-you (DFY) services and consulting upsells are the highest-margin expansion path available to solo founders. You're already the expert. The customer already trusts you. They just need you to execute instead of teach.

This lesson shows you exactly how to identify DFY opportunities, structure offers that don't destroy your time, and convert customers from self-serve to premium implementation.

---

## The DFY Premium: Why Customers Pay 3-10x More

<InsightCard icon="💰" title="The Time-Value Equation">
A $200/month SaaS subscription becomes a $2,000/month managed service. A $2,000 course becomes a $10,000 implementation package. Same outcome, different execution model — and customers happily pay the premium.
</InsightCard>

The math is simple: **time-constrained customers value implementation more than tools.**

Your SaaS customer doesn't need another dashboard to manage. Your coaching client doesn't need another framework to execute. They need **results without the work.**

<FlipCard 
  front="Why DFY Commands Premium Pricing" 
  back="You're not just selling expertise — you're selling back their time, eliminating their learning curve, and guaranteeing execution. That's worth 3-10x the self-serve price." 
/>

### The Three DFY Archetypes

<SlideNavigation>
<Slide title="SaaS → DFY Implementation">

**The Pattern:** Customer subscribes to your tool but struggles with setup, configuration, or ongoing management.

**The Offer:** "You have the tool. I'll set it up, configure it for your use case, and manage it for you."

**Common Examples:**
- Marketing automation setup + management
- CRM implementation + data migration
- Analytics dashboard configuration + monthly reporting
- SEO tool setup + ongoing optimization

**Pricing Multiple:** 3-5x the SaaS subscription

</Slide>

<Slide title="Coaching → DFY Execution">

**The Pattern:** Student completes your program, understands the framework, but lacks time or confidence to execute.

**The Offer:** "You've learned the system. For clients who want me to execute it for them, here's my done-for-you package."

**Common Examples:**
- Content strategy course → content writing service
- Sales framework training → outbound campaign execution
- Positioning workshop → messaging + website copywriting
- LinkedIn growth program → profile optimization + ghostwriting

**Pricing Multiple:** 5-10x the course/program price

</Slide>

<Slide title="Consulting → Productized DFY">

**The Pattern:** You offer custom consulting but want to package repeatable deliverables into fixed-scope offers.

**The Offer:** Standardized packages with clear deliverables, timelines, and pricing — no hourly rates, no scope creep.

**Common Examples:**
- "Website Audit + Action Plan: $2,500"
- "Go-to-Market Strategy Sprint: $5,000"
- "Sales Process Build: $7,500"
- "Content System Setup: $3,000"

**Pricing Multiple:** 30-40% higher close rate than custom proposals

</Slide>
</SlideNavigation>

<ExampleCard label="Case Study: The $50K DFY Pivot">

**Before:** Alex sold a $200/month marketing automation SaaS. Average customer lifetime: 8 months. LTV: $1,600.

**The Signal:** In support tickets, customers kept asking: "Can you just set this up for me?" and "Do you offer consulting?"

**The Offer:** "Managed Marketing Automation: $2,000/month. I'll configure your campaigns, manage your sequences, and optimize performance monthly."

**After:** 15% of SaaS customers upgraded to managed service. Average managed service lifetime: 18 months. LTV jumped from $1,600 to $36,000 for managed clients.

**The Math:** 15 managed clients at $2K/month = $30K MRR from DFY alone, with only 5-7 hours/week of execution time per client after initial setup.

</ExampleCard>

---

## Identifying DFY Opportunities in Your Customer Base

Not every customer is a DFY candidate. The best signals come from **behavior, not demographics.**

<RangeSlider 
  label="How often do customers ask for implementation help?" 
  min={1} 
  max={10} 
  lowLabel="Never" 
  highLabel="Constantly" 
  persistKey="expansion-L5-help-requests" 
/>

### The 5 DFY Trigger Signals

<InteractiveChecklist 
  title="DFY Opportunity Signals" 
  persistKey="expansion-L5-signals" 
  items={[
    "Customer explicitly asks: 'Can you do this for me?' or 'Do you offer consulting?'",
    "Customer is slow to implement despite high engagement (watches content, attends calls, but doesn't execute)",
    "Customer mentions time constraints: 'I'm too busy' or 'My team doesn't have bandwidth'",
    "Customer achieves initial results but stalls at the next complexity level",
    "Customer is in a high-value segment (executive, agency owner, funded startup) where time > money"
  ]} 
/>

<ClassifyExercise
  title="Classify These Customer Scenarios"
  persistKey="expansion-L5-classify"
  categories={[
    { id: "hot", label: "Hot DFY Lead", color: "#ef4444" },
    { id: "warm", label: "Warm DFY Lead", color: "#f59e0b" },
    { id: "cold", label: "Not a DFY Fit", color: "#3b82f6" }
  ]}
  items={[
    { id: "1", content: "SaaS customer on month 3, using 80% of features, just hired a marketing manager", correctCategory: "cold" },
    { id: "2", content: "Coaching client completed program, got first results, says 'I need help executing the next phase'", correctCategory: "hot" },
    { id: "3", content: "SaaS customer on month 1, submitted 5 support tickets asking 'How do I configure X?'", correctCategory: "warm" },
    { id: "4", content: "Course student watched all modules, hasn't started implementation, mentions 'running a team of 15'", correctCategory: "hot" },
    { id: "5", content: "Free trial user exploring features, no engagement with support or community", correctCategory: "cold" }
  ]}
/>

---

## Structuring DFY Offers That Don't Destroy Your Time

The DFY trap: you sell premium services, then realize you've bought yourself a high-paying job with no leverage.

**The solution:** Productize, scope-limit, and cap capacity from day one.

<InsightCard icon="⚠️" title="The Capacity Rule">
As a solo founder, cap DFY clients at **3-5 simultaneously**. Beyond that, you're no longer building a business — you're running a consultancy with no exit.
</InsightCard>

### The Productized DFY Framework

<TemplateBuilder
  title="Your DFY Package Template"
  persistKey="expansion-L5-package"
  sections={[
    {
      id: "basics",
      title: "Package Basics",
      fields: [
        { id: "name", label: "Package Name", placeholder: "e.g., Managed LinkedIn Outreach", type: "text" },
        { id: "outcome", label: "Promised Outcome", placeholder: "e.g., 20 qualified meetings per month", type: "text" },
        { id: "price", label: "Monthly Price", placeholder: "e.g., $3,000/month", type: "text" }
      ]
    },
    {
      id: "scope",
      title: "What's Included (3-5 deliverables max)",
      fields: [
        { id: "deliverable1", label: "Deliverable 1", placeholder: "e.g., Weekly campaign setup and optimization", type: "text" },
        { id: "deliverable2", label: "Deliverable 2", placeholder: "e.g., Bi-weekly performance report", type: "text" },
        { id: "deliverable3", label: "Deliverable 3", placeholder: "e.g., Monthly strategy call", type: "text" }
      ]
    },
    {
      id: "boundaries",
      title: "What's NOT Included (critical for scope control)",
      fields: [
        { id: "exclusion1", label: "Exclusion 1", placeholder: "e.g., Content creation beyond templates", type: "text" },
        { id: "exclusion2", label: "Exclusion 2", placeholder: "e.g., Ad-hoc requests outside monthly scope", type: "text" }
      ]
    },
    {
      id: "timeline",
      title: "Timeline & Commitment",
      fields: [
        { id: "setup", label: "Setup Timeline", placeholder: "e.g., 2 weeks to full deployment", type: "text" },
        { id: "commitment", label: "Minimum Commitment", placeholder: "e.g., 3-month minimum", type: "text" }
      ]
    }
  ]}
/>

### Pricing Your DFY Offers

<ScenarioSimulator
  title="DFY Pricing Calculator"
  persistKey="expansion-L5-pricing"
  levers={[
    { id: "selfServe", label: "Self-serve product price ($/mo)", min: 50, max: 500, step: 50, defaultValue: 200 },
    { id: "hoursPerMonth", label: "Hours you'll spend per client/month", min: 5, max: 40, step: 5, defaultValue: 15 },
    { id: "targetHourly", label: "Your target hourly rate ($)", min: 100, max: 500, step: 50, defaultValue: 250 }
  ]}
  outputs={[
    { id: "minPrice", label: "Minimum DFY price", formula: "(hoursPerMonth * targetHourly)", unit: "$", precision: 0 },
    { id: "multiple", label: "Price multiple vs self-serve", formula: "(hoursPerMonth * targetHourly) / selfServe", unit: "x", precision: 1 }
  ]}
  insight="At {minPrice}/month, you're charging `{multiple}`x your self-serve price. If that feels high, remember: you're selling outcomes + time savings, not just your hours."
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Your instinct will be to underprice DFY because you can execute faster than most. **Resist this.** Price for the customer's outcome and time saved, not your execution speed. Your efficiency is your margin, not their discount.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches">
DFY is your natural upsell from group programs. Students who complete your framework but lack execution capacity are perfect DFY candidates. Price at 5-10x your program cost — you're delivering the transformation they paid to learn.
</ContextualNote>

---

## The DFY Upsell Conversation

Timing and framing determine whether this feels like a natural evolution or a pushy sales pitch.

### When to Initiate the DFY Conversation

<SwipeDecision
  title="Good Timing or Bad Timing?"
  description="Swipe right for good timing to pitch DFY, left for bad timing"
  optionA="Too Early/Wrong Context"
  optionB="Perfect Timing"
  persistKey="expansion-L5-timing"
  cards={[
    { 
      id: "1", 
      content: "Customer just signed up for your SaaS 3 days ago, still exploring features", 
      correctOption: "a", 
      explanation: "Way too early. Let them experience the product first and hit a real implementation challenge." 
    },
    { 
      id: "2", 
      content: "Coaching client completed your program 2 weeks ago, just reported their first win, mentions 'scaling this is going to be hard'", 
      correctOption: "b", 
      explanation: "Perfect. They've proven the framework works and just identified the next bottleneck." 
    },
    { 
      id: "3", 
      content: "SaaS customer on month 4, submitted 3 support tickets this week asking for setup help", 
      correctOption: "b", 
      explanation: "Clear signal they're struggling with implementation despite being engaged." 
    },
    { 
      id: "4", 
      content: "Customer churned last month, now asking if you offer consulting", 
      correctOption: "a", 
      explanation: "They already left. Win them back first, then discuss DFY as part of re-engagement." 
    }
  ]}
/>

### The DFY Pitch Framework

<MiniRoleplay
  scenario="A SaaS customer says: 'I love the tool, but I'm drowning in setup. Do you offer any help with this?'"
  role="You are the founder responding"
  persistKey="expansion-L5-roleplay1"
  modelResponse="Absolutely — this is exactly why we created our Managed Implementation package. Instead of you spending 10-15 hours setting this up, I handle the entire configuration, integrate it with your stack, and manage ongoing optimization. Most clients are fully deployed within 2 weeks and see [specific outcome] within 30 days. The investment is $X/month. Want me to walk you through what that looks like for your use case?"
/>

**The 4-Part DFY Pitch Structure:**

1. **Acknowledge the pain:** "I hear you — setup is the hardest part, and most people underestimate the time it takes."
2. **Position the DFY offer:** "That's why we offer [package name]: I handle [specific deliverables] so you get [outcome] without the implementation burden."
3. **Quantify the value:** "Most clients spend 15-20 hours on this. At your hourly value, that's $X in opportunity cost. My package is $Y and delivers [result] in [timeline]."
4. **Soft close:** "Does that sound like it would solve the problem you're facing?"

<RewriteExercise
  title="Rewrite This Weak DFY Pitch"
  persistKey="expansion-L5-rewrite"
  original="Yeah, I can help with that. My consulting rate is $200/hour. Just let me know how many hours you need."
  hint="Make it outcome-focused, productized, and value-framed"
  expertRewrite="Great question. I offer a Done-for-You Setup package: I'll configure your entire system, migrate your data, and train your team — fully deployed in 2 weeks. The investment is $3,500 flat, and most clients see ROI within the first month from time saved alone. Want me to send over the details?"
  criteria={[
    "Productized (fixed scope and price, not hourly)",
    "Outcome-focused (what they get, not what you do)",
    "Value-framed (ROI or time savings mentioned)"
  ]}
/>

---

## Handling Common DFY Objections

<ProgressiveReveal title="The 5 Most Common DFY Objections" persistKey="expansion-L5-objections">

<RevealSection title="'That's too expensive'">

**What they're really saying:** "I don't see the value relative to the price."

**Your response:** "I get it — let me break down the math. You'd spend 15-20 hours doing this yourself. At your hourly value of $X, that's $Y in opportunity cost. Plus, most people take 2-3x longer than they expect because they hit technical issues. My package delivers the outcome in 2 weeks for $Z, and you stay focused on [their core business]. Does that math make sense?"

**The reframe:** Price against their **time cost**, not your **execution cost**.

</RevealSection>

<RevealSection title="'Can I just hire someone cheaper on Upwork?'">

**What they're really saying:** "I'm comparing you to commodity labor."

**Your response:** "You absolutely could — and some clients do. The difference is I already know your business, your use case, and the exact outcome you need. A freelancer will need onboarding, revisions, and oversight. Most clients who try that route come back after spending more time managing the freelancer than if they'd done it themselves. I'm offering a done-for-you outcome, not just labor hours."

**The reframe:** You're selling **expertise + context**, not just execution.

</RevealSection>

<RevealSection title="'I'll just do it myself when I have time'">

**What they're really saying:** "I don't prioritize this enough to pay for it."

**Your response:** "That's totally fair — and I respect that. Just know that 'when I have time' usually means 3-6 months from now, and in the meantime, you're leaving [specific outcome] on the table. If that timeline works for your goals, no problem. But if you need this live in the next 30 days, the DFY route is the only way that happens."

**The reframe:** Make the **cost of delay** visible.

</RevealSection>

<RevealSection title="'What if I don't like the result?'">

**What they're really saying:** "I'm worried about risk."

**Your response:** "Great question. Here's how we de-risk this: I'll show you a draft/preview at the halfway point. If it's not what you need, we'll revise before final delivery. And if for some reason it's completely off-base — which hasn't happened yet — I'll refund 50% of the package price. You're not locked into something you don't want."

**The reframe:** Offer a **milestone review** and a **partial satisfaction guarantee**.

</RevealSection>

<RevealSection title="'Can you just give me a discount?'">

**What they're really saying:** "I want this but I'm testing your pricing confidence."

**Your response:** "I don't discount the package price because the scope and deliverables are fixed — you're getting the full value either way. What I *can* do is offer a payment plan: 3 monthly installments instead of upfront. Or, if you commit to a 6-month engagement, I'll lock in this rate even if I raise prices later. Does one of those work better?"

**The reframe:** Offer **payment flexibility** or **rate lock**, not discounts.

</RevealSection>

</ProgressiveReveal>

---

## The Graduation Path: DFY to Self-Serve

The best DFY engagements have a **built-in exit.**

<InsightCard icon="🎓" title="The Graduation Mindset">
Your goal is NOT to keep DFY clients forever. Your goal is to deliver the outcome, train them to maintain it, and graduate them back to self-serve (or to their own team). This builds trust and creates advocacy.
</InsightCard>

### Why Graduation Matters

1. **Capacity constraint:** You can only handle 3-5 DFY clients. Graduation frees up slots for new high-value engagements.
2. **Customer success:** Clients who learn to maintain the system are more successful long-term than those dependent on you.
3. **Advocacy:** Graduated clients become your best referral sources because you helped them become self-sufficient.

### The Graduation Conversation Script

**Timing:** 60-90 days into a DFY engagement, once the system is stable and delivering results.

**Script:**
"We've built a great system here — you're consistently hitting [outcome]. At this point, the system is stable enough that you (or someone on your team) could manage the day-to-day. I'm happy to continue managing it if you want, but I also want to make sure you're not overpaying for something you could handle internally. Here are three options:

1. **Continue DFY:** I keep managing everything at the current rate.
2. **Hybrid:** I transition to monthly advisory — you manage day-to-day, I handle strategy and optimization. Price drops to $X.
3. **Graduate:** I train you/your team to take over fully, then you move back to the self-serve plan. I'm available for ad-hoc consulting if needed.

What makes the most sense for where you're at?"

<InteractiveChecklist 
  title="Graduation Readiness Signals" 
  persistKey="expansion-L5-graduation" 
  items={[
    "System has been stable for 60+ days with consistent results",
    "Customer has hired internal team member who could manage this",
    "Customer is asking questions about 'how this works' instead of 'can you do this?'",
    "Customer's business has grown to the point where they need full-time ownership",
    "You're at capacity and need to free up a DFY slot for a higher-value client"
  ]} 
/>

---

## Your DFY Upsell Playbook

<TemplateBuilder
  title="Build Your DFY Offer"
  persistKey="expansion-L5-playbook"
  sections={[
    {
      id: "trigger",
      title: "DFY Trigger Signals (when to pitch)",
      fields: [
        { id: "signal1", label: "Signal 1", placeholder: "e.g., Customer asks 'Can you do this for me?'", type: "text" },
        { id: "signal2", label: "Signal 2", placeholder: "e.g., Customer slow to implement despite engagement", type: "text" },
        { id: "signal3", label: "Signal 3", placeholder: "e.g., Customer mentions time constraints", type: "text" }
      ]
    },
    {
      id: "offer",
      title: "Your DFY Package",
      fields: [
        { id: "packageName", label: "Package Name", placeholder: "e.g., Managed Implementation", type: "text" },
        { id: "outcome", label: "Promised Outcome", placeholder: "e.g., Fully deployed system in 2 weeks", type: "text" },
        { id: "price", label: "Price", placeholder: "e.g., $3,500 one-time or $2,000/month", type: "text" },
        { id: "scope", label: "What's Included (3-5 items)", placeholder: "e.g., Setup, configuration, training, 30-day support", type: "textarea" },
        { id: "exclusions", label: "What's NOT Included", placeholder: "e.g., Ongoing content creation, ad-hoc requests", type: "textarea" }
      ]
    },
    {
      id: "pitch",
      title: "Your DFY Pitch Script",
      fields: [
        { id: "acknowledge", label: "Acknowledge the pain", placeholder: "e.g., I hear you — setup is the hardest part", type: "text" },
        { id: "position", label: "Position the offer", placeholder: "e.g., That's why we offer [package]", type: "text" },
        { id: "quantify", label: "Quantify the value", placeholder: "e.g., Most clients spend 20 hours on this. At your rate, that's $X.", type: "textarea" },
        { id: "close", label: "Soft close", placeholder: "e.g., Does that sound like it would solve your problem?", type: "text" }
      ]
    }
  ]}
/>

---

## Action Items

<InteractiveChecklist 
  title="Your DFY Implementation Checklist" 
  persistKey="expansion-L5-actions" 
  items={[
    "Review your last 20 customer conversations for DFY trigger signals (asks for help, mentions time constraints, slow to implement)",
    "Identify 1-3 DFY package opportunities based on common customer struggles",
    "Build your first DFY package using the template above (name, outcome, price, scope, exclusions)",
    "Write your DFY pitch script and practice it with AI roleplay",
    "Set a capacity limit (3-5 DFY clients max) and stick to it",
    "Create a graduation conversation script for when DFY clients are ready to transition",
    "Add DFY trigger detection to your weekly customer review process"
  ]} 
/>

---

## Key Takeaways

<FlipCard 
  front="The DFY Opportunity" 
  back="20-30% of engaged customers will pay 3-10x more for done-for-you execution. The signal is simple: 'I don't have time to do this myself.'" 
/>

<FlipCard 
  front="Productize or Die" 
  back="DFY without fixed scope and pricing becomes a high-paying job with no leverage. Package it, cap capacity at 3-5 clients, and build graduation paths." 
/>

<FlipCard 
  front="Price for Outcomes, Not Hours" 
  back="Customers pay for time saved and results delivered, not your execution speed. Your efficiency is your margin, not their discount." 
/>

**Next up:** Lesson 6 covers upgraded retainer conversations — how to expand existing service engagements without triggering price shock or churn.