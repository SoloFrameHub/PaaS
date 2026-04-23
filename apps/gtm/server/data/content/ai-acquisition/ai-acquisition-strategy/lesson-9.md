---
title: "Economics: AI Stack vs Junior SDR"
duration: "45 min"
track: "AI-Powered Acquisition"
course: "Course 21: AI Acquisition Strategy"
lesson: 9
---

## The $70K Question

You're at $15K MRR. Your AI-assisted outreach is working — 12% reply rate, 3-4 discovery calls per week, closing 1-2 deals monthly. Your founder friends keep asking: "When are you hiring an SDR?"

The math seems simple: a junior SDR costs $4-5K/month. Your AI stack costs $197/month. That's a 20-25x difference.

But here's what nobody tells you: **the real cost comparison isn't $5K vs $200. It's $7,700-11,425 vs $400-800.**

And the output comparison? It's not even close to what you'd expect.

<InsightCard icon="💰" title="The Hidden Economics">
Most founders compare base salary to tool costs and think hiring is "only" 20x more expensive. The real multiplier is 15-25x when you include benefits, taxes, tools, management time, training, and turnover costs. And that's before you account for ramp time and quota attainment rates.
</InsightCard>

In this lesson, you'll build a complete economic model comparing your AI stack to hiring. By the end, you'll know your exact breakeven point and when (if ever) hiring makes sense for your business.

---

## The True Cost of a Junior SDR

Let's start with what a junior SDR actually costs. Most founders only think about base salary. That's a $40K mistake.

### Base Compensation Reality Check

<RangeSlider 
  label="What do you think a junior SDR costs per month (base salary)?" 
  min={2000} 
  max={8000} 
  step={500}
  lowLabel="$2K/mo" 
  highLabel="$8K/mo" 
  persistKey="ai-acquisition-strategy-L9-sdr-guess" 
/>

**2025-2026 Market Rates:**
- Junior SDR base salary: **$40K-55K/year** ($3,300-4,600/month)
- With benefits and taxes (20-30% loaded cost): **$55K-75K/year** ($4,600-6,250/month)

But that's just the beginning.

### The Full Cost Stack

<FlipCard 
  front="What else costs money beyond salary?" 
  back="Tools ($200-500/mo), management time (10-15 hrs/mo @ $150/hr = $1,500-2,250), training/onboarding (amortized $500-1K/mo), recruiting costs (amortized $300-500/mo), and turnover replacement costs." 
/>

Let's build the complete picture:

<TemplateBuilder
  title="True SDR Cost Calculator"
  persistKey="ai-acquisition-strategy-L9-sdr-cost"
  sections={[
    {
      id: "compensation",
      title: "Compensation & Benefits",
      fields: [
        { id: "base", label: "Base Salary (annual)", placeholder: "45000", type: "number" },
        { id: "benefits", label: "Benefits/Taxes % (typically 20-30%)", placeholder: "25", type: "number" }
      ]
    },
    {
      id: "tools",
      title: "Tools & Infrastructure",
      fields: [
        { id: "toolCost", label: "Monthly tool cost per seat", placeholder: "350", type: "number", helpText: "SalesLoft/Outreach ($100-150) + Apollo/ZoomInfo ($100-200) + CRM seat ($50-100) + dialer ($50-100)" }
      ]
    },
    {
      id: "management",
      title: "Management & Training",
      fields: [
        { id: "mgmtHours", label: "Management hours per month", placeholder: "12", type: "number" },
        { id: "hourlyRate", label: "Your hourly rate (founder time)", placeholder: "150", type: "number" },
        { id: "trainingCost", label: "Training/onboarding (amortized monthly)", placeholder: "750", type: "number", helpText: "First 3-6 months of reduced productivity + training time" }
      ]
    }
  ]}
/>

**Industry Benchmarks:**

| Cost Category | Monthly Amount | Annual Amount |
|--------------|----------------|---------------|
| Base compensation | $3,300-4,600 | $40K-55K |
| Benefits/taxes (25%) | $825-1,150 | $10K-14K |
| Tools per seat | $200-500 | $2,400-6,000 |
| Management time (12 hrs @ $150/hr) | $1,800 | $21,600 |
| Training (amortized) | $500-1,000 | $6K-12K |
| Recruiting/turnover (amortized) | $300-500 | $3,600-6,000 |
| **TOTAL** | **$6,925-9,750** | **$83K-117K** |

<InsightCard icon="⏰" title="The Ramp Time Tax">
Bridge Group data shows junior SDRs take 3-6 months to ramp to full productivity. During that time, you're paying full cost for 30-60% output. Factor this into your first-year economics: you're really paying for 6-9 months of productive work, not 12.
</InsightCard>

### The Invisible Costs

Beyond the spreadsheet, there are costs that don't show up in your P&L:

<InteractiveChecklist 
  title="Hidden SDR Costs" 
  persistKey="ai-acquisition-strategy-L9-hidden-costs" 
  items={[
    "Context switching: 10-15 hours/month managing vs building product",
    "Emotional labor: performance management, motivation, conflict resolution",
    "Opportunity cost: could those management hours go to high-value sales calls?",
    "Risk of bad hire: 6 months of cost + restart recruiting process",
    "Cultural fit challenges: first hire sets tone for future team",
    "Compliance and HR: employment law, benefits admin, performance documentation"
  ]} 
/>

**The Turnover Reality:**
- Average SDR tenure: **14-18 months** (Bridge Group, Bravado)
- Average quota attainment: **~60%** (SalesHacker)
- Percentage who hit quota consistently: **~40%**

This means there's a 60% chance your first SDR hire underperforms, and a 50%+ chance they leave within 18 months.

---

## The True Cost of Your AI Stack

Now let's calculate what you're actually spending on AI-powered acquisition.

### Direct Tool Costs

<TemplateBuilder
  title="Your AI Stack Cost"
  persistKey="ai-acquisition-strategy-L9-ai-cost"
  sections={[
    {
      id: "tools",
      title: "Current Tool Stack",
      fields: [
        { id: "apollo", label: "Apollo.io", placeholder: "49", type: "number" },
        { id: "instantly", label: "Instantly.ai / Smartlead", placeholder: "37", type: "number" },
        { id: "salesNav", label: "LinkedIn Sales Navigator", placeholder: "80", type: "number" },
        { id: "chatgpt", label: "ChatGPT Plus / Claude Pro", placeholder: "20", type: "number" },
        { id: "verification", label: "Email verification (amortized)", placeholder: "4", type: "number" },
        { id: "automation", label: "Zapier / Make", placeholder: "7", type: "number" },
        { id: "chatbot", label: "Chatbase / Tidio (optional)", placeholder: "19", type: "number" },
        { id: "other", label: "Other tools", placeholder: "0", type: "number" }
      ]
    }
  ]}
/>

**Reference Stacks:**

| Stack Tier | Tools | Monthly Cost |
|-----------|-------|-------------|
| **Essential** | Apollo Basic + Instantly + ChatGPT | $106 |
| **Recommended** | Essential + Sales Nav + Verification + Zapier | $197 |
| **Extended** | Recommended + Chatbase + Clay Explorer | $365 |

### Your Time Investment

The AI stack isn't free — it requires your time. But the ratio is dramatically different from managing an SDR.

<RangeSlider 
  label="Hours per week you spend on AI-assisted acquisition" 
  min={2} 
  max={15} 
  step={1}
  lowLabel="2 hrs/week" 
  highLabel="15 hrs/week" 
  persistKey="ai-acquisition-strategy-L9-time-investment" 
/>

**Typical Time Breakdown (5-7 hours/week):**
- Research & list building: 90 min
- Personalization review & editing: 60 min
- Follow-up & sequences: 45 min
- Discovery calls: 90 min
- Metrics & optimization: 45 min

**Total monthly time cost:** 20-28 hours @ $150/hr = **$3,000-4,200**

But here's the key difference: **this time is high-leverage founder work** — you're talking to customers, learning about the market, refining positioning. Managing an SDR is pure overhead.

<ComparisonBuilder
  title="Time Quality Comparison"
  persistKey="ai-acquisition-strategy-L9-time-quality"
  prompt="Describe what you actually do during your 5-7 hours of AI-assisted acquisition"
  expertExample="I spend 90 minutes researching high-fit prospects and learning about their challenges. Another 90 minutes on discovery calls where I validate positioning and gather product feedback. The rest is reviewing AI-generated personalization and optimizing sequences based on reply data. Every hour teaches me something about the market."
  criteria={[
    "Direct customer interaction time",
    "Market learning and insight generation",
    "Strategic decision-making vs tactical execution",
    "Skill development that compounds over time"
  ]}
/>

### Setup and Maintenance

<FlipCard 
  front="One-time setup cost?" 
  back="20-40 hours to configure tools, build initial sequences, create templates, and establish workflows. Amortized over 12 months = ~2-3 hours/month equivalent." 
/>

**Ongoing Maintenance:**
- Weekly optimization: 30-60 min
- Monthly tool updates: 30 min
- Quarterly strategy review: 2 hours

**Total monthly maintenance:** ~4-6 hours

---

## Output Comparison: What Do You Actually Get?

This is where the economics get interesting. Let's compare what a junior SDR produces vs what you produce with an AI stack.

### Junior SDR Output (Industry Benchmarks)

<ExampleCard label="Typical Junior SDR Performance">
**Month 1-3 (Ramp):**
- Emails sent: 200-400/month
- Reply rate: 3-8%
- Conversations: 8-20/month
- Meetings booked: 4-10/month
- Pipeline created: $15K-40K

**Month 4-12 (Full Productivity):**
- Emails sent: 800-1,200/month
- Reply rate: 5-12%
- Conversations: 40-80/month
- Meetings booked: 15-30/month
- Pipeline created: $60K-150K

**Reality Check:** Only 60% of SDRs hit these numbers consistently.
</ExampleCard>

### Solo Founder + AI Stack Output

<ExampleCard label="Typical Solo Founder + AI Performance">
**Month 1-2 (Learning):**
- Emails sent: 300-600/month
- Reply rate: 5-15% (better targeting)
- Conversations: 15-45/month
- Meetings booked: 8-20/month
- Pipeline created: $30K-80K

**Month 3-6 (Optimized):**
- Emails sent: 600-1,000/month
- Reply rate: 8-18%
- Conversations: 48-120/month
- Meetings booked: 20-40/month
- Pipeline created: $80K-200K

**Key Difference:** Higher reply rates due to better targeting and founder credibility. Lower volume but higher quality.
</ExampleCard>

<InsightCard icon="🎯" title="The Quality vs Quantity Paradox">
SDRs optimize for volume. Founders optimize for conversion. A founder sending 500 highly-targeted emails often outperforms an SDR sending 1,200 generic ones. The AI stack amplifies founder quality at SDR-like scale.
</InsightCard>

### The Conversion Advantage

Here's what the data shows about founder-led outreach:

<SlideNavigation>
<Slide title="Reply Rate Advantage">
**Founder-led outreach:** 8-18% reply rate
**SDR outreach:** 5-12% reply rate

Why? Founders can:
- Speak with authority about product vision
- Make real-time decisions on pricing/scope
- Build genuine relationships, not just book meetings
- Leverage personal brand and credibility
</Slide>

<Slide title="Meeting-to-Close Advantage">
**Founder discovery calls:** 25-40% close rate
**SDR-booked meetings:** 15-25% close rate

Why? Founders:
- Qualify better (they know the product deeply)
- Can pivot positioning in real-time
- Build trust faster (decision-maker on the call)
- Gather better product feedback
</Slide>

<Slide title="Deal Size Advantage">
**Founder-closed deals:** Often 20-50% larger
**SDR-sourced deals:** Tend toward lower end of range

Why? Founders can:
- Upsell based on deep product knowledge
- Customize solutions on the spot
- Build strategic partnerships, not just transactions
</Slide>
</SlideNavigation>

---

## The Economic Model: Side-by-Side

Let's build your complete comparison model.

<ScenarioSimulator
  title="SDR vs AI Stack Economics"
  persistKey="ai-acquisition-strategy-L9-economics"
  levers={[
    { id: "mrr", label: "Current MRR", min: 5000, max: 100000, step: 5000, defaultValue: 15000, unit: "$" },
    { id: "aiStackCost", label: "AI Stack Monthly Cost", min: 100, max: 500, step: 50, defaultValue: 197, unit: "$" },
    { id: "aiHours", label: "Your Hours/Week on Acquisition", min: 3, max: 15, step: 1, defaultValue: 6, unit: " hrs" },
    { id: "hourlyRate", label: "Your Hourly Rate", min: 100, max: 300, step: 25, defaultValue: 150, unit: "$" },
    { id: "sdrBaseSalary", label: "SDR Base Salary (annual)", min: 35000, max: 65000, step: 5000, defaultValue: 45000, unit: "$" },
    { id: "sdrToolCost", label: "SDR Tool Cost/Month", min: 200, max: 600, step: 50, defaultValue: 350, unit: "$" }
  ]}
  outputs={[
    { id: "aiTotalCost", label: "AI Stack Total Monthly Cost", formula: "aiStackCost + (aiHours * 4.33 * hourlyRate)", unit: "$", precision: 0 },
    { id: "sdrTotalCost", label: "SDR Total Monthly Cost", formula: "(sdrBaseSalary * 1.25 / 12) + sdrToolCost + (12 * hourlyRate) + 750", unit: "$", precision: 0 },
    { id: "costRatio", label: "SDR Cost / AI Cost Ratio", formula: "sdrTotalCost / aiTotalCost", unit: "x", precision: 1 },
    { id: "breakeven", label: "Breakeven MRR (to justify SDR)", formula: "sdrTotalCost * 6", unit: "$", precision: 0 }
  ]}
  insight="At your current MRR of $`{mrr}`, the AI stack costs ${aiTotalCost}/month vs ${sdrTotalCost}/month for an SDR — a {costRatio}x difference. You'd need to reach ~$`{breakeven}` MRR before the economics of hiring make sense (assuming SDR can generate 6x their cost in pipeline)."
/>

### The Breakeven Framework

When does hiring an SDR make economic sense?

<TemplateBuilder
  title="SDR Hiring Breakeven Calculator"
  persistKey="ai-acquisition-strategy-L9-breakeven"
  sections={[
    {
      id: "current",
      title: "Current State",
      fields: [
        { id: "currentMRR", label: "Current MRR", placeholder: "15000", type: "number" },
        { id: "aiPipeline", label: "Monthly pipeline from AI stack", placeholder: "80000", type: "number" },
        { id: "aiCost", label: "Total AI stack cost (tools + time)", placeholder: "4000", type: "number" }
      ]
    },
    {
      id: "sdr",
      title: "SDR Projection",
      fields: [
        { id: "sdrCost", label: "Total SDR monthly cost", placeholder: "8500", type: "number" },
        { id: "sdrPipeline", label: "Expected SDR monthly pipeline (after ramp)", placeholder: "100000", type: "number" },
        { id: "rampMonths", label: "Months to full productivity", placeholder: "4", type: "number" }
      ]
    }
  ]}
/>

**The Rule of Thumb:**

Don't hire an SDR until:
1. **MRR > $30K** (you can afford the risk)
2. **AI pipeline is maxed** (you're at capacity with current system)
3. **Founder time is the bottleneck** (not targeting, messaging, or conversion)
4. **You have 10+ hours/week** to manage them effectively
5. **You've documented your playbook** (so they can execute it)

<InsightCard icon="🚀" title="The Hybrid Future">
The best outcome isn't "AI vs SDR." It's "AI + SDR." When you do hire, they inherit the AI stack you've built. Your $197/month in tools becomes their force multiplier. They can focus on high-touch conversations while AI handles research, personalization, and follow-up. A well-equipped SDR with your AI playbook can outperform 2-3 traditional SDRs.
</InsightCard>

---

## The Invisible ROI: What You Learn

There's one massive advantage to the AI-assisted approach that doesn't show up in any spreadsheet: **market learning.**

<FlipCard 
  front="What do you learn doing your own AI-assisted outreach?" 
  back="Which segments convert best. What messaging resonates. What objections come up. What features matter most. What pricing is acceptable. What competitors are mentioned. What pain points are urgent vs nice-to-have. This intelligence is worth 10x what you pay an SDR." 
/>

### The Founder Learning Curve

<ProgressiveReveal title="What 6 Months of AI-Assisted Outreach Teaches You" persistKey="ai-acquisition-strategy-L9-learning">
<RevealSection title="Month 1-2: Targeting Clarity">
You discover which ICP segments actually reply. Your initial hypothesis was "agencies with 10-50 employees." Reality: agencies with 20-35 employees in specific verticals (e-commerce, SaaS) reply 3x more. You wouldn't learn this if an SDR was doing the outreach.
</RevealSection>

<RevealSection title="Month 3-4: Messaging Refinement">
You test 5 different value props. "Save 10 hours/week" gets 6% replies. "Reduce client churn by 15%" gets 14% replies. You pivot your entire positioning based on real conversation data. An SDR would just execute the script you gave them.
</RevealSection>

<RevealSection title="Month 5-6: Product-Market Fit Signals">
You notice prospects keep asking about a feature you don't have. Three separate conversations mention the same integration need. You build it. It becomes your #1 differentiator. This insight came from being in the conversations, not reading SDR call summaries.
</RevealSection>
</ProgressiveReveal>

**The Compounding Effect:**

Every conversation makes you better at:
- Positioning
- Objection handling
- Feature prioritization
- Pricing strategy
- Competitive differentiation

An SDR learns to book meetings. You learn to build a better business.

---

## Real-World Case Studies

Let's look at three founders who made different decisions.

<SlideNavigation>
<Slide title="Case 1: The Premature Hire">
**Sarah, B2B SaaS, $12K MRR**

Hired an SDR at $12K MRR because "everyone said to." 

**Results:**
- Month 1-3: SDR ramping, $0 pipeline
- Month 4-6: $40K pipeline created, 2 deals closed ($8K)
- Month 7: SDR quit for a bigger company
- Total cost: $51K (6 months × $8.5K)
- Total revenue: $8K
- **ROI: -84%**

**Lesson:** Hiring too early meant burning cash during ramp with no safety net. The SDR left right when they became productive.
</Slide>

<Slide title="Case 2: The AI-First Approach">
**Marcus, Technical Founder, $18K MRR**

Built AI stack instead of hiring.

**Results:**
- Month 1-2: $30K pipeline (learning phase)
- Month 3-6: $80-120K pipeline/month
- Month 7-12: $150K+ pipeline/month
- Total cost: $197/mo tools + ~$3.5K/mo time = $4K/mo
- 12-month cost: $48K
- Revenue generated: $180K (15 deals @ $12K avg)
- **ROI: +275%**

**Lesson:** Stayed lean, learned the market, scaled gradually. Hit $45K MRR before considering hiring.
</Slide>

<Slide title="Case 3: The Hybrid Model">
**Jen, Creator-Founder, $35K MRR**

Used AI stack for 8 months, then hired SDR to execute her proven playbook.

**Results:**
- Months 1-8 (AI only): Built to $35K MRR, documented playbook
- Month 9: Hired SDR, gave them AI stack + playbook
- Months 10-12: SDR generated $200K pipeline using founder's system
- SDR cost: $8K/mo
- SDR + AI stack output: 2.5x typical SDR performance
- **ROI: SDR paid for themselves in Month 10**

**Lesson:** AI-first approach created a playbook worth copying. When she hired, the SDR had a proven system to execute.
</Slide>
</SlideNavigation>

---

## Decision Framework: Should You Hire?

Let's build your personalized decision model.

<DecisionTree
  title="Should You Hire an SDR?"
  persistKey="ai-acquisition-strategy-L9-decision"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "What's your current MRR?", 
      choices: [
        { label: "Under $20K", nextNodeId: "too-early" },
        { label: "$20K-40K", nextNodeId: "check-pipeline" },
        { label: "Over $40K", nextNodeId: "check-capacity" }
      ]
    },
    { 
      id: "too-early", 
      content: "At under $20K MRR, focus on AI-assisted founder-led sales. You need the market learning and can't afford the risk of a bad hire.", 
      isTerminal: true, 
      outcome: "negative",
      recommendation: "Build your AI stack. Revisit hiring at $30K+ MRR."
    },
    { 
      id: "check-pipeline", 
      content: "Is your AI-assisted pipeline consistently generating 3-5x your monthly revenue target?", 
      choices: [
        { label: "Yes, pipeline is strong", nextNodeId: "check-capacity" },
        { label: "No, pipeline is inconsistent", nextNodeId: "fix-pipeline" }
      ]
    },
    { 
      id: "fix-pipeline", 
      content: "Don't hire to fix a pipeline problem. An SDR will just execute a broken system faster. Fix targeting, messaging, and conversion first.", 
      isTerminal: true, 
      outcome: "negative",
      recommendation: "Optimize your AI stack and playbook before hiring."
    },
    { 
      id: "check-capacity", 
      content: "Are you turning down qualified conversations because you don't have time?", 
      choices: [
        { label: "Yes, I'm at capacity", nextNodeId: "check-playbook" },
        { label: "No, I can handle more", nextNodeId: "not-yet" }
      ]
    },
    { 
      id: "not-yet", 
      content: "If you have capacity, keep doing founder-led sales. The market learning is invaluable and your conversion rates are likely higher than an SDR's would be.", 
      isTerminal: true, 
      outcome: "neutral",
      recommendation: "Scale your AI stack. Hire when you're truly at capacity."
    },
    { 
      id: "check-playbook", 
      content: "Do you have a documented, repeatable playbook an SDR could execute?", 
      choices: [
        { label: "Yes, it's documented", nextNodeId: "ready-to-hire" },
        { label: "No, it's all in my head", nextNodeId: "document-first" }
      ]
    },
    { 
      id: "document-first", 
      content: "Document your playbook first. An SDR can't replicate what you haven't systematized. Spend 2-4 weeks creating: ICP definitions, sequence templates, objection handling scripts, discovery call frameworks.", 
      isTerminal: true, 
      outcome: "neutral",
      recommendation: "Document playbook, then hire in 30-60 days."
    },
    { 
      id: "ready-to-hire", 
      content: "You're ready. You have the revenue, the pipeline, the capacity constraint, and the playbook. Hire an SDR and give them your AI stack as their force multiplier.", 
      isTerminal: true, 
      outcome: "positive",
      recommendation: "Start recruiting. Budget $8-10K/mo all-in. Expect 3-6 month ramp."
    }
  ]}
/>

---

## Your Economic Model

Let's build your personalized comparison sheet — the final artifact for this lesson.

<TemplateBuilder
  title="My SDR vs AI Economics Model"
  persistKey="ai-acquisition-strategy-L9-final-model"
  sections={[
    {
      id: "current",
      title: "Current State (AI Stack)",
      fields: [
        { id: "mrr", label: "Current MRR", placeholder: "15000", type: "number" },
        { id: "toolCost", label: "Monthly tool cost", placeholder: "197", type: "number" },
        { id: "weeklyHours", label: "Hours/week on acquisition", placeholder: "6", type: "number" },
        { id: "hourlyRate", label: "Your hourly rate", placeholder: "150", type: "number" },
        { id: "monthlyPipeline", label: "Monthly pipeline created", placeholder: "80000", type: "number" },
        { id: "monthlyDeals", label: "Deals closed/month", placeholder: "2", type: "number" }
      ]
    },
    {
      id: "sdr",
      title: "SDR Projection",
      fields: [
        { id: "sdrBase", label: "SDR base salary (annual)", placeholder: "45000", type: "number" },
        { id: "sdrTools", label: "SDR tool cost/month", placeholder: "350", type: "number" },
        { id: "mgmtHours", label: "Management hours/month", placeholder: "12", type: "number" },
        { id: "expectedPipeline", label: "Expected SDR pipeline/month (post-ramp)", placeholder: "100000", type: "number" },
        { id: "rampMonths", label: "Ramp time (months)", placeholder: "4", type: "number" }
      ]
    },
    {
      id: "decision",
      title: "Decision Criteria",
      fields: [
        { id: "targetMRR", label: "MRR target to consider hiring", placeholder: "30000", type: "number" },
        { id: "cashReserve", label: "Months of runway you're comfortable with", placeholder: "12", type: "number" },
        { id: "hireDate", label: "Projected hire date (if applicable)", placeholder: "Q3 2026", type: "text" }
      ]
    }
  ]}
/>

### Your Action Plan

Based on your inputs, here's your personalized recommendation:

<InteractiveChecklist 
  title="My SDR Hiring Roadmap" 
  persistKey="ai-acquisition-strategy-L9-roadmap" 
  items={[
    "Calculate my true AI stack cost (tools + time) and compare to SDR all-in cost",
    "Track monthly pipeline and conversion metrics for next 90 days",
    "Document my current playbook (sequences, scripts, objection handling)",
    "Set a clear 'hire trigger' (MRR threshold + capacity constraint)",
    "Build a 6-month financial model showing SDR ramp and breakeven",
    "If hiring soon: draft job description and interview scorecard",
    "If not hiring: optimize AI stack to increase output by 30-50%",
    "Revisit this decision quarterly as MRR and capacity change"
  ]} 
/>

---

## Summary: The Economic Reality

Let's recap the key insights:

<InsightCard icon="📊" title="The Real Numbers">
**AI Stack:** $100-500/mo tools + 5-7 hrs/week founder time = $400-800/mo all-in

**Junior SDR:** $4-6K salary + $1-2K benefits/taxes + $200-500 tools + $1.5-2.5K management time + $500-1K training = $7,700-11,425/mo all-in

**Cost Ratio:** 15-25x difference, not the 20x most founders assume
</InsightCard>

<InsightCard icon="🎯" title="The Output Reality">
**AI Stack (Founder-Led):**
- Higher reply rates (8-18% vs 5-12%)
- Better qualification (founder knows product)
- Faster iteration (no communication lag)
- Compounding market learning

**SDR:**
- Higher volume (after ramp)
- Frees founder time (if managed well)
- Scalable (can hire more)
- Requires proven playbook to succeed
</InsightCard>

<InsightCard icon="💡" title="The Strategic Decision">
**Use AI Stack When:**
- MRR < $30K
- Still learning market/positioning
- Pipeline is inconsistent
- Playbook isn't documented
- Want to preserve cash

**Hire SDR When:**
- MRR > $30K
- Pipeline is proven and consistent
- You're at capacity (turning down calls)
- Playbook is documented
- 10+ hours/week to manage effectively
</InsightCard>

The right answer isn't "AI vs SDR forever." It's "AI first, then AI + SDR when the economics and capacity justify it."

Most solo founders should plan to run AI-assisted founder-led sales until $30-50K MRR, then hire an SDR to execute the playbook they've proven.

**Next Lesson:** We'll take everything you've learned across all 9 lessons and build your complete AI Acquisition System Blueprint — the master playbook that ties together strategy, tools, workflows, and economics into a single executable system.