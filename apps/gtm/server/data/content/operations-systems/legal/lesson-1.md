---
title: "Contract Types: MSA, SOW, SaaS Terms, Engagement Letters"
duration: "50 min"
track: "Operations & Systems"
course: "Course 46: Sales Legal & Contracts"
lesson: 1
---

## Which Contract Do You Actually Need?

You just landed a new client. They're ready to move forward. Now they ask: "Can you send over the paperwork?"

And you freeze.

Do you send an MSA? A SOW? An engagement letter? Do you even know the difference? Most solo founders improvise here — they Google a template, paste in some details, and hope it holds up. That's not a legal strategy; that's a prayer.

This lesson gives you a decision framework so clear you'll know within 60 seconds of any new deal which contract type to reach for.

<InsightCard icon="⚖️" title="The Most Expensive Mistake in Sales">
60% of small business disputes arise from poorly defined scope — not from bad intent, not from dishonest clients, but from contracts that left too much to interpretation. The right contract type is the first line of defense.
</InsightCard>

## The Four Contract Types You Need to Know

There are hundreds of contract types in the world. As a solo founder, you need exactly four. Here they are:

<SlideNavigation>
<Slide title="1. Master Service Agreement (MSA)">

**What it is:** An umbrella agreement governing the entire relationship between you and a client. It covers liability, IP ownership, confidentiality, dispute resolution, and the ground rules that apply to every project you do together.

**What it does NOT cover:** Project-specific details like scope, timeline, and price. Those go in a separate SOW.

**When to use it:** When you expect multiple projects or an ongoing engagement with the same client. You sign the MSA once; then every new project just needs a lightweight SOW.

**Length:** 4-6 pages typical.

**Example:** A marketing consultant who works with five long-term clients on monthly retainers. Each client has one MSA signed upfront, and each new campaign gets a 1-page SOW attached.

</Slide>

<Slide title="2. Statement of Work (SOW)">

**What it is:** A project-specific document that defines scope, deliverables, timeline, milestones, and payment for one specific engagement. Always references or attaches to an MSA.

**What it does NOT cover:** The broader relationship terms (liability, IP, confidentiality). Those come from the MSA it's paired with.

**When to use it:** Every new project when you have an active MSA with that client. Also used as a standalone document for one-off projects when a full MSA is overkill.

**Length:** 1-3 pages typical.

**Example:** You have an MSA with a client. They ask for a new website redesign. You send a 2-page SOW covering deliverables (5 pages, 3 rounds of revisions), timeline (6 weeks), and price ($8,000 with 50% upfront).

</Slide>

<Slide title="3. SaaS Terms of Service">

**What it is:** A click-wrap or sign-wrap agreement covering access to your software product. Governs subscription terms, data handling, uptime SLAs, acceptable use, and what happens if either party wants to end the relationship.

**Key feature:** Typically accepted by clicking "I agree" rather than signing — this is legally binding in all major jurisdictions.

**When to use it:** Any time you're selling a software product with recurring billing. Required for any SaaS business.

**Length:** 3-8 pages typical (longer for enterprise clients who need data processing agreements).

**Example:** 83% of B2B SaaS companies use click-wrap Terms of Service for sub-$500/month plans. If you're charging $99/month for your tool, a sign-up checkbox acceptance is sufficient.

</Slide>

<Slide title="4. Engagement Letter">

**What it is:** A lightweight 1-3 page agreement that combines the key elements of an MSA and SOW into a single document. Covers the basics: what you'll do, what they'll pay, when you'll deliver, and what happens if things go sideways.

**When to use it:** Consulting, coaching, and small service engagements under $10K. When the relationship is simple enough that a full MSA + SOW would be overkill.

**Length:** 1-3 pages. If it's getting longer, you probably need an MSA + SOW instead.

**Example:** A business coach who runs a $3,500 8-week coaching engagement. One engagement letter covers everything: weekly session structure, payment terms (50% upfront), cancellation policy, and confidentiality. Done.

</Slide>
</SlideNavigation>

## The Contract Decision Tree

This is the framework you'll use every single time. Run through it in 60 seconds.

<DecisionTree
  title="Which Contract Do I Need?"
  persistKey="legal-L1-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "What are you selling?",
      choices: [
        { label: "Software product with recurring billing", nextNodeId: "saas" },
        { label: "Services (consulting, coaching, design, etc.)", nextNodeId: "services" }
      ]
    },
    {
      id: "saas",
      content: "SaaS Terms of Service is your foundation. For sub-$500/month plans, click-wrap acceptance is standard. For enterprise deals (>$10K/year), consider adding a signed Order Form referencing your Terms.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "services",
      content: "Is this deal over $10,000 in total value?",
      choices: [
        { label: "Yes, over $10K", nextNodeId: "highvalue" },
        { label: "No, under $10K", nextNodeId: "lowvalue" }
      ]
    },
    {
      id: "highvalue",
      content: "Do you expect to work with this client again after this project?",
      choices: [
        { label: "Yes — ongoing relationship", nextNodeId: "msa" },
        { label: "No — one-off project", nextNodeId: "sow-standalone" }
      ]
    },
    {
      id: "msa",
      content: "MSA + SOW is your structure. Sign the MSA upfront to cover the relationship. Attach an SOW for this specific project. Every future project gets a new SOW only — no need to re-sign the MSA.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "sow-standalone",
      content: "Standalone SOW (comprehensive) covers this project. Include the key terms you'd find in an MSA — liability cap, IP ownership, termination. It's a single-document deal.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "lowvalue",
      content: "Engagement Letter covers everything for this deal. Keep it to 1-3 pages. If the work involves IP transfer or unusual terms, consider upgrading to a full SOW.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

## Why This Matters: The Numbers

<SlideNavigation>
<Slide title="Speed">

Solo founders who use templated contracts **close 25-40% faster** than those who draft from scratch. Every time you send a ready-to-sign contract instead of "I'll get something together," you compress your sales cycle.

Average time to close a deal increases **2-3 weeks** when contracts are drafted from scratch. That's two to three additional weeks of cash not hitting your account.

</Slide>

<Slide title="Protection">

60% of small business disputes arise from poorly defined scope. The contract type you choose determines how much scope protection you have.

An engagement letter that says "website redesign — $5,000" gives a judge almost nothing to work with. An SOW with five bullet-point deliverables, three revision rounds, and an explicit "out of scope" clause gives you a clear line to stand behind.

</Slide>

<Slide title="Speed to Reuse">

The MSA + SOW structure pays dividends over time. After you sign an MSA with a recurring client, every new project is just a 1-2 page SOW. You go from 30 minutes of contract prep to 10 minutes.

Build the right structure now, and it compounds into hours saved every quarter.

</Slide>
</SlideNavigation>

## Test Your Understanding: Five Scenarios

Let's make sure the framework is locked in. For each scenario, predict which contract type is correct before revealing the answer.

<PredictionGate
  question="Scenario 1: You're launching a $99/month project management tool for marketing agencies. Customers sign up on your website with a checkbox accepting your terms. Which contract type?"
  persistKey="legal-L1-predict1"
  type="choice"
  choices={[
    { id: "a", text: "Master Service Agreement" },
    { id: "b", text: "SaaS Terms of Service" },
    { id: "c", text: "Engagement Letter" },
    { id: "d", text: "Statement of Work" }
  ]}
  correctId="b"
>
SaaS Terms of Service is correct. You're selling a software product with recurring billing. Click-wrap acceptance is standard for this price point. 83% of B2B SaaS companies use this approach for sub-$500/month plans.
</PredictionGate>

<PredictionGate
  question="Scenario 2: A mid-market company wants to hire you for a $35,000 brand strategy project. They've mentioned they'll likely want ongoing consulting after. Which contract structure?"
  persistKey="legal-L1-predict2"
  type="choice"
  choices={[
    { id: "a", text: "Engagement Letter" },
    { id: "b", text: "Standalone SOW" },
    { id: "c", text: "MSA + SOW" },
    { id: "d", text: "SaaS Terms of Service" }
  ]}
  correctId="c"
>
MSA + SOW is correct. The deal is over $10K and the client has signaled an ongoing relationship. The MSA governs the relationship; the SOW covers this project. Future projects will only need new SOWs — you never re-sign the MSA.
</PredictionGate>

<PredictionGate
  question="Scenario 3: A startup founder wants 8 weekly coaching sessions at $500 each ($4,000 total). One-off engagement, no ongoing work expected. Which contract type?"
  persistKey="legal-L1-predict3"
  type="choice"
  choices={[
    { id: "a", text: "Master Service Agreement" },
    { id: "b", text: "Statement of Work" },
    { id: "c", text: "Engagement Letter" },
    { id: "d", text: "SaaS Terms of Service" }
  ]}
  correctId="c"
>
Engagement Letter is correct. Under $10K, one-off engagement, simple scope. A 2-page engagement letter covers session structure, payment terms (50% upfront), cancellation policy, and confidentiality. That's all you need.
</PredictionGate>

## The Tools That Make This Easy

You don't need to draft these from scratch. Here's where to get solid templates:

<SlideNavigation>
<Slide title="Free Options">

**Docracy** — Open-source legal templates contributed by lawyers. Great for reference and starting points. Verify any template with a lawyer before using for large deals.

**LawDepot** — Free basic templates for common contract types. The free tier gives you access to engagement letters, NDAs, and basic service agreements. $7.99/month for advanced features.

**Stripe Billing (Terms)** — If you're building a SaaS product on Stripe, they provide standard Terms of Service acceptance built into the checkout flow. Free with your Stripe account.

</Slide>

<Slide title="Paid Options ($8-21/mo)">

**Bonsai Contracts** — $21/month Starter plan. Excellent for freelancers and consultants. Includes proposal + contract + e-sign in one workflow. Templates are written in plain English.

**LawDepot Premium** — $7.99/month for full template library access plus customization. Good upgrade from the free tier.

**Shake** — Free to $15/month. Mobile-first contract creation. Good for simple engagement letters signed on the spot.

</Slide>
</SlideNavigation>

## The Envelope Test

Before you send any contract, apply this quick sanity check:

**If the deal terms cannot be summarized on the back of an envelope, the contract is overcomplicated for a solo founder's needs.**

For a $5,000 engagement: Who does what, by when, for how much, and what happens if something goes wrong. If your contract answers these four questions clearly, you're in good shape.

<InsightCard icon="⚖️" title="The Key Insight">
Your goal with contracts is not to win a dispute — it's to prevent one. The clearest contracts are the ones that make everyone's expectations so explicit that there's nothing to argue about. Start there.
</InsightCard>

## Flip Cards: Lock In the Definitions

<FlipCard front="Master Service Agreement (MSA)" back="An umbrella agreement governing the overall relationship — liability, IP, confidentiality, dispute resolution. Signed once; applies to all future SOWs. Use for ongoing client relationships." />

<FlipCard front="Statement of Work (SOW)" back="Project-specific document covering scope, deliverables, timeline, and payment for one engagement. Always pairs with an MSA, or used standalone for one-off deals over $10K." />

<FlipCard front="SaaS Terms of Service" back="Click-wrap or sign-wrap agreement for software products. Governs subscription access, data handling, acceptable use. Required for any recurring billing product." />

<FlipCard front="Engagement Letter" back="Lightweight 1-3 page agreement combining MSA and SOW elements. Best for services under $10K. If it's getting longer than 3 pages, upgrade to MSA + SOW." />

<FlipCard front="Click-wrap Agreement" back="Acceptance by clicking 'I agree.' Legally binding in the US (ESIGN Act), EU (eIDAS), and most major jurisdictions. Standard for SaaS products under $500/month." />

## Your Contract Foundation

Use this builder to document which templates you need based on your business:

<TemplateBuilder
  title="My Contract Template Plan"
  persistKey="legal-L1-template"
  sections={[
    {
      id: "business",
      title: "My Business Model",
      fields: [
        { id: "model", label: "What do you primarily sell?", placeholder: "e.g., B2B SaaS at $299/month, consulting retainers, coaching programs", type: "text" },
        { id: "dealsize", label: "Typical deal size", placeholder: "e.g., $2,000-8,000 per project, $500/month recurring", type: "text" }
      ]
    },
    {
      id: "templates",
      title: "Templates I Need to Build",
      fields: [
        { id: "primary", label: "Primary contract type for most deals", placeholder: "e.g., Engagement Letter for coaching, SaaS Terms for my product", type: "text" },
        { id: "secondary", label: "Secondary contract type for larger deals", placeholder: "e.g., MSA + SOW for enterprise clients over $15K", type: "text" },
        { id: "nda", label: "Do I need a standard NDA?", placeholder: "e.g., Yes — I share confidential methodology with clients", type: "text" }
      ]
    },
    {
      id: "priority",
      title: "Build Order",
      fields: [
        { id: "first", label: "Build first (most urgent)", placeholder: "e.g., Engagement Letter — needed for deal I'm closing this week", type: "text" },
        { id: "second", label: "Build second", placeholder: "e.g., MSA + SOW template for enterprise pipeline", type: "text" }
      ]
    }
  ]}
/>

## Action Items for This Lesson

<InteractiveChecklist
  title="Lesson 1 Completions"
  persistKey="legal-L1-actions"
  items={[
    "Run your current deal pipeline through the Contract Decision Tree — does each deal have the right contract type?",
    "Identify the 1-2 contract templates you need most urgently based on your business model",
    "Bookmark your template source: Bonsai, LawDepot, or Docracy (based on budget)",
    "Complete the My Contract Template Plan builder above",
    "Move on to Lesson 2 to learn what to customize inside each template"
  ]}
/>

## What's Next

In **Lesson 2**, you'll open up each contract type and learn which clauses actually matter. Scope, payment, IP, and termination are where 90% of disputes originate — and where a few careful edits protect you from years of headaches.
