---
title: "SDR vs AE vs Fractional vs VA: First Hire Matrix"
duration: "55 min"
track: "Operations & Systems"
course: "Course 45: Scaling to First Sales Hire"
lesson: 2
---

## The Decision That Determines Everything

You've passed the readiness test from Lesson 1. Now comes the second critical decision: who do you actually hire?

Get this wrong and you'll spend $30K+ on someone who can't solve your actual problem. A founder who needs pipeline and hires a closer will keep having pipeline problems. A founder who needs a strategic thinking partner and hires a junior SDR will be more overwhelmed than before.

The good news: there are only four realistic options for your first hire, and each one solves a specific bottleneck. Your job in this lesson is to match your bottleneck to the right role.

<InsightCard icon="🎯" title="The Core Insight">
Every first sales hire solves exactly one problem. Before you pick the role, you have to name the problem. Is your constraint pipeline (not enough meetings), close rate (meetings that don't convert), process (you don't know what's working), or capacity (you're closing well but can't handle more deals alone)?
</InsightCard>

## The Four Options

Let's be specific about what each role actually does — and doesn't do.

<SlideNavigation>
<Slide title="Option 1: Fractional Sales Leader">

**What they are:** An experienced sales leader (former VP Sales, Head of Sales, or successful AE) working part-time at multiple companies simultaneously.

**Monthly cost:** $2,000–5,000/month for 5–15 hours per week

**What they do:**
- Diagnose your sales process and identify the bottlenecks you can't see
- Build or refine your playbook, scripts, and sequences
- Coach you on your own calls and meetings
- May conduct some prospecting or calls themselves (at senior rates)
- Help you hire and onboard your next full-time rep

**What they don't do:** Replace an SDR or AE in terms of activity volume. They're a force multiplier on your own selling, not a replacement for it.

**Revenue threshold:** $10K+ MRR (you can afford $2–5K/month)

**Best for:** Founders who are strong closers but need process help; founders preparing for their first full-time hire and wanting to set it up for success.

<ExampleCard label="Case Study: The Fractional Bridge">
Rachel was at $15K MRR, closing 35% of her meetings, but had no system — every deal felt like starting from scratch. She hired a fractional sales leader at $3,500/month for 10 hours per week.

In 90 days, the fractional helped her: document her playbook, set up a follow-up cadence in HubSpot, create an objection handling database, and define her ICP more tightly.

Revenue went from $15K to $27K MRR. She then used the documented process to onboard a part-time SDR.
</ExampleCard>

</Slide>
<Slide title="Option 2: Part-Time SDR">

**What they are:** A dedicated prospector working 15–25 hours per week. Often a newer sales professional building their career, a freelancer, or someone looking for flexible work.

**Monthly cost:** $1,500–3,000/month ($20–30/hour on platforms like Upwork or part-time job boards)

**What they do:**
- Run your outbound sequences — email, LinkedIn, cold calls
- Research and build prospect lists from your ICP criteria
- Handle all follow-up and sequence maintenance
- Book meetings directly onto your calendar
- Keep your CRM updated with activity data

**What they don't do:** Close deals or handle complex buyer conversations. They hand qualified meetings to you and you close them.

**Revenue threshold:** $15K+ MRR

**Best for:** Founders who close well (35%+ close rate) but don't have time to prospect consistently. You're the bottleneck on outbound activity, not skill.

</Slide>
<Slide title="Option 3: Full-Time SDR">

**What they are:** A full-time dedicated prospector, typically early-career (1–3 years experience), with the energy and capacity to run a complete outbound function.

**Monthly cost:** $4,600–6,250/month fully loaded
- Base salary: $40,000–55,000/year ($3,333–4,583/month)
- Variable compensation: $4,000–11,000/year on top
- Taxes + benefits (25–35% uplift on base): adds $833–1,600/month
- Tools (sequencing, data): $200–500/month

**What they do:** Everything a part-time SDR does, but at full volume. A strong SDR running 40 hours per week should book 8–15 qualified meetings per month in B2B markets.

**What they don't do:** Close. They hand you qualified pipeline, and you or a future AE closes it.

**Revenue threshold:** $25K+ MRR

**Best for:** Founders who have proven outbound sequences and need full-time pipeline generation capacity. You close well, and pipeline is the only constraint on your growth.

</Slide>
<Slide title="Option 4: Full-Time AE">

**What they are:** A full-cycle sales professional who can take a lead from first contact all the way through close. This is the senior-most first hire option.

**Monthly cost:** $7,500–12,000/month fully loaded
- Base salary: $60,000–80,000/year ($5,000–6,667/month)
- Variable (OTE): $78,000–120,000/year total
- Taxes + benefits: adds $1,250–1,667/month
- OTE at full quota: $7,500–12,000/month fully loaded

**What they do:** Own the entire sales cycle — prospecting (sometimes), discovery, demos, proposals, negotiation, and close. You hand them the playbook and they run it.

**What they don't do:** Create the playbook. An AE hired before you have a mature, documented motion will revert to their old habits from previous jobs — which may not fit your ICP at all.

**Revenue threshold:** $50K+ MRR

**Best for:** Founders with mature playbooks who want to exit the selling seat entirely and focus on product, operations, or growth.

</Slide>
</SlideNavigation>

## The Role Decision Matrix

Here's how the four options compare across every dimension that matters:

<ComparisonBuilder
  title="First Hire Role Comparison"
  persistKey="scale-L2-compare"
  prompt="Based on your specific bottleneck and revenue, which role is right for you? Write your reasoning below."
  expertExample="My bottleneck is pipeline — I close 38% of meetings but only hold 6/month because outreach takes all my time. At $31K MRR, I can afford a full-time SDR ($5K/month fully loaded = 16% of MRR). My playbook is documented from Course 44. I'm hiring a full-time SDR and targeting 12 meetings/month by week 8."
  criteria={[
    "My bottleneck is clearly pipeline (not close rate or process)",
    "My MRR is at least 4x the monthly cost of the hire",
    "My playbook is written and ready to hand to someone",
    "I have time to manage and onboard this person (3–5 hrs/week minimum)",
    "I've considered whether part-time would meet my needs first"
  ]}
/>

## What's Your Real Bottleneck?

You can't pick the right role until you've named the real problem. Let's diagnose it.

<DecisionTree
  title="What Is Your Sales Bottleneck?"
  persistKey="scale-L2-bottleneck"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "How many qualified meetings are you holding per month?",
      choices: [
        { label: "Fewer than 8 — I can't get enough meetings", nextNodeId: "pipeline-problem" },
        { label: "8 or more — but most don't convert", nextNodeId: "close-problem" },
        { label: "8 or more — and I'm closing well but overwhelmed", nextNodeId: "capacity-problem" }
      ]
    },
    {
      id: "pipeline-problem",
      content: "Is your outreach documented and tested (sequences, templates, ICP lists)?",
      choices: [
        { label: "Yes — I have proven sequences, just not enough time to run them", nextNodeId: "need-sdr" },
        { label: "No — I'm not sure what outreach works", nextNodeId: "need-fractional" }
      ]
    },
    {
      id: "need-sdr",
      content: "Your bottleneck is outbound capacity. You need an SDR (part-time or full-time depending on MRR). They'll run your proven sequences at higher volume while you focus on closing.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "need-fractional",
      content: "Your bottleneck is process clarity, not headcount. A fractional sales leader will help you figure out what's working before you scale it with an SDR. Hire process help first.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "close-problem",
      content: "Do you know why prospects don't convert after your meetings?",
      choices: [
        { label: "Yes — I know exactly where deals die (price, fit, urgency)", nextNodeId: "coaching" },
        { label: "No — they just go quiet and I don't know why", nextNodeId: "playbook-gap" }
      ]
    },
    {
      id: "coaching",
      content: "You understand the problem and need coaching to solve it. A fractional sales leader can review your calls and help you close the gaps. Don't hire an SDR — more meetings won't help if you can't close them.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "playbook-gap",
      content: "You have a diagnosis problem, not a headcount problem. Complete your playbook (Course 44) and objection handling (Course 17) before hiring anyone.",
      isTerminal: true,
      outcome: "negative"
    },
    {
      id: "capacity-problem",
      content: "What's your MRR right now?",
      choices: [
        { label: "Under $30K MRR", nextNodeId: "pt-sdr" },
        { label: "$30K–$50K MRR", nextNodeId: "ft-sdr" },
        { label: "$50K+ MRR", nextNodeId: "ae-option" }
      ]
    },
    {
      id: "pt-sdr",
      content: "Start with a part-time SDR to expand pipeline capacity without overextending your budget. At $1,500–3,000/month, you get meaningful help without betting the business on a single hire.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "ft-sdr",
      content: "You have the revenue to support a full-time SDR. This hire will own all outbound, freeing you to focus exclusively on closing. Proceed to Lesson 3 (job description).",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "ae-option",
      content: "At $50K+ MRR with a proven motion, you can consider a full-time AE who takes the entire sales cycle off your plate. This is the highest-leverage hire if your playbook is mature.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

## Compensation Numbers You Need to Know

Use this simulator to calculate the real cost of each hire option and whether your revenue can support it.

<ScenarioSimulator
  title="Hire Cost vs. Revenue Calculator"
  persistKey="scale-L2-sim"
  levers={[
    { id: "mrr", label: "Your Current MRR ($)", min: 5000, max: 100000, step: 1000, defaultValue: 25000 },
    { id: "meetings", label: "Meetings/Month from Hire", min: 4, max: 20, step: 1, defaultValue: 10 },
    { id: "close_rate", label: "Your Close Rate (%)", min: 10, max: 60, step: 5, defaultValue: 30 },
    { id: "acv", label: "Average Contract Value ($)", min: 500, max: 20000, step: 500, defaultValue: 3000 }
  ]}
  outputs={[
    { id: "monthly_revenue_from_hire", label: "Monthly Revenue From Hire", formula: "meetings * (close_rate / 100) * (acv / 12)", unit: "$", precision: 0 },
    { id: "pt_sdr_cost", label: "Part-Time SDR Monthly Cost", formula: "2200", unit: "$", precision: 0 },
    { id: "ft_sdr_cost", label: "Full-Time SDR Monthly Cost", formula: "5400", unit: "$", precision: 0 },
    { id: "mrr_percent_pt", label: "PT SDR as % of MRR", formula: "(2200 / mrr) * 100", unit: "%", precision: 1 },
    { id: "mrr_percent_ft", label: "FT SDR as % of MRR", formula: "(5400 / mrr) * 100", unit: "%", precision: 1 }
  ]}
  insight="At your current MRR, a full-time SDR would cost `{mrr_percent_ft}`% of revenue. General rule: a sales hire should cost less than 25% of current MRR and be expected to generate 2-3x their cost in new revenue."
/>

## The Progression Path Most Founders Should Follow

There's a logical order to building your first sales team. Most founders who skip steps regret it.

<ProgressiveReveal title="The Recommended Hire Sequence" persistKey="scale-L2-sequence">

<RevealSection title="Step 1: Fractional Sales Leader (3–6 months at $10K+ MRR)">
Use a fractional to document your process, sharpen your playbook, and fix the gaps you can't see. Think of this as the foundation layer. A fractional costs $2–5K/month and saves you from a $30K+ bad hire by helping you hire right the first time.

Skip this step only if your playbook is already fully documented and tested (Course 44 complete).
</RevealSection>

<RevealSection title="Step 2: Part-Time SDR (3–6 months at $15K+ MRR)">
Test the SDR model with lower commitment and cost. A part-time SDR running your proven sequences will show you whether pipeline generation can scale — before you bet $60K/year on a full-time hire.

If the part-time SDR books consistent meetings that you close, you have proof that a full-time SDR will generate positive ROI.
</RevealSection>

<RevealSection title="Step 3: Full-Time SDR (6–12 months at $25K+ MRR)">
Upgrade from part-time to full-time once you've validated that outbound SDR work generates ROI. Full-time gives you more volume, more consistency, and the ability to run multi-channel sequences simultaneously.
</RevealSection>

<RevealSection title="Step 4: Full-Time AE (when you want to exit selling)">
Only hire an AE when you're ready to fully exit the sales seat, your playbook is mature, and your MRR supports the cost. An AE without a mature playbook will either fail or revert to their own methods — which may not fit your ICP.
</RevealSection>

</ProgressiveReveal>

## Two Strategies, Head-to-Head

<StrategyDuel
  title="Part-Time SDR vs. Full-Time SDR as First Hire"
  persistKey="scale-L2-duel"
  scenario="You're at $28K MRR with a proven outbound motion. You close 30% of your meetings. Your bottleneck is that you can only run outreach 5 hours per week. You're choosing your first hire."
  strategyA={{
    name: "Part-Time SDR",
    description: "Hire a part-time SDR at $2,200/month for 20 hours per week to run your outreach sequences.",
    pros: [
      "Lower cost — 8% of your MRR vs. 19% for a full-time SDR",
      "Lower risk — easy to adjust or end the engagement if it doesn't work",
      "Proves the model before you commit to full-time salary and benefits",
      "Frees up your 5 hours for closing, not prospecting"
    ],
    cons: [
      "Half the volume — 20 hrs/week produces fewer meetings than 40",
      "Less commitment from the hire — part-time reps often have competing priorities",
      "Management overhead still exists — you're still managing someone",
      "May need to upgrade in 3–6 months anyway"
    ]
  }}
  strategyB={{
    name: "Full-Time SDR",
    description: "Hire a full-time SDR at $5,400/month fully loaded for 40 hours per week of dedicated outbound.",
    pros: [
      "Full capacity — 40 hours per week of focused prospecting",
      "More accountability — full-time hire has more skin in the game",
      "Faster ramp to quota — full-time focus accelerates learning",
      "Better long-term economics if they hit quota"
    ],
    cons: [
      "19% of your MRR — leaves less margin for error",
      "3–6 month ramp before they hit full productivity",
      "Higher cost of a bad hire — $25–40K if it doesn't work out",
      "Requires full-time management infrastructure"
    ]
  }}
  expertVerdict="At $28K MRR, start part-time. The economics don't clearly favor full-time until you've validated the hire generates ROI. Run a part-time SDR for 90 days. If they consistently book 6+ qualified meetings per month at $2,200/month, you've proven the model. Then upgrade to full-time with confidence. Going straight to full-time at $28K MRR is a reasonable bet — but only if your playbook is rock-solid and you can afford 6 months of ramp costs while revenue normalizes."
/>

## Hiring Platforms: Where to Find Each Role

Different platforms attract different candidate types. Match the platform to the role.

<FlipCard
  front="Where to find a Fractional Sales Leader"
  back="LinkedIn (search 'fractional VP Sales'), Toptal, Hire an Advisor, Pavilion network. Budget $2–5K/month. Expect candidates with 10+ years experience and startup backgrounds."
/>

<FlipCard
  front="Where to find a Part-Time SDR"
  back="Upwork (filter for sales development, outbound), AngelList/Wellfound (post as part-time remote), LinkedIn (post as part-time contractor). Budget $20–30/hour."
/>

<FlipCard
  front="Where to find a Full-Time SDR"
  back="Bravado (vetted sales community with peer reviews), LinkedIn Jobs ($0 basic, $300+ sponsored), AngelList/Wellfound (free, startup-savvy candidates), RepVue (SDRs research companies here — make sure your profile is clean)."
/>

<FlipCard
  front="Where to find a Full-Time AE"
  back="Bravado, LinkedIn, Pavilion network, RepVue. AEs research comp benchmarks on RepVue before applying — make sure your OTE is competitive ($78–120K). Budget for 3–6 month ramp."
/>

## Your First Hire Decision

Now make the call.

<TemplateBuilder
  title="My First Hire Decision"
  persistKey="scale-L2-decision"
  sections={[
    {
      id: "diagnosis",
      title: "My Situation",
      fields: [
        { id: "mrr", label: "Current MRR", placeholder: "e.g., $27,000", type: "text" },
        { id: "bottleneck", label: "My #1 sales bottleneck (pipeline, close rate, process, or capacity)", placeholder: "e.g., Pipeline — I close 32% but only hold 5 meetings/month", type: "textarea" },
        { id: "playbook-status", label: "Playbook status (documented, partial, or not written)", placeholder: "e.g., Fully documented — Course 44 complete", type: "text" }
      ]
    },
    {
      id: "decision",
      title: "My Decision",
      fields: [
        { id: "role", label: "Role I'm hiring (fractional, PT SDR, FT SDR, or AE)", placeholder: "e.g., Part-time SDR", type: "text" },
        { id: "budget", label: "Monthly budget for this hire", placeholder: "e.g., $2,200/month", type: "text" },
        { id: "platform", label: "Platform I'll use to find candidates", placeholder: "e.g., Upwork + LinkedIn", type: "text" },
        { id: "success-metric", label: "How I'll measure if this hire is working (Month 2)", placeholder: "e.g., 8+ qualified meetings booked per month", type: "textarea" }
      ]
    }
  ]}
/>

## Lesson 2 Checklist

<InteractiveChecklist
  title="Lesson 2 Action Items"
  persistKey="scale-L2-actions"
  items={[
    "Run the Bottleneck Decision Tree and identify your constraint (pipeline, close, process, capacity)",
    "Use the Hire Cost Simulator to verify your MRR supports your target hire",
    "Complete the First Hire Decision template above",
    "Review the four platforms relevant to your chosen role type",
    "Read Lesson 3 to write the job description for your chosen role"
  ]}
/>

## What's Next

In Lesson 3, you'll write the job description for the role you just chose. You'll learn why most startup JDs repel the best candidates — and how to write one that attracts exactly the type of person you need, with transparent compensation and a specific call to action that filters out low-effort applicants before they waste your time.
