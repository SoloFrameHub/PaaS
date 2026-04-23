---
title: "What to Customize: Scope, Payment, IP, Termination"
duration: "55 min"
track: "Operations & Systems"
course: "Course 46: Sales Legal & Contracts"
lesson: 2
---

## The Four Clauses That Determine Everything

You downloaded a contract template. It looks professional. It has seventeen sections, legal jargon in every paragraph, and a definition of "Force Majeure" that took three reads to understand.

Here's the truth: you could ignore fifteen of those seventeen sections and lose nothing that matters.

But four clauses? Those four will determine whether you get paid, who owns what you built, and how cleanly you can exit if things go wrong. Get those right. The rest is boilerplate.

<InsightCard icon="⚖️" title="The 90% Rule">
90% of contract disputes originate in four clauses: Scope, Payment, IP Ownership, and Termination. Everything else — governing law, force majeure, integration clauses — almost never comes up in practice. Master these four.
</InsightCard>

## Where Are You Starting From?

<RangeSlider
  label="How confident are you in your current contract clauses?"
  min={1}
  max={10}
  lowLabel="I use whatever template I found"
  highLabel="Every clause is intentional"
  persistKey="legal-L2-confidence"
/>

## Clause 1: Scope

Scope is the single most important clause in any services contract. It's the difference between "I'll redesign your website" (a dispute waiting to happen) and a clear, bounded definition of exactly what you will and will not deliver.

<SlideNavigation>
<Slide title="What Makes Scope Clauses Fail">

**Vague scope language (what not to write):**
- "Social media management services"
- "Marketing support as needed"
- "Website improvements"

These sentences describe a category of work, not a scope of work. When the client asks for their seventh round of revisions or wants you to "quickly" add a new feature, there's nothing in the contract to refer to.

**45% of freelancer payment disputes relate to unclear milestone definitions.** Scope ambiguity is the cause — payment is just where the fight breaks out.

</Slide>

<Slide title="What Strong Scope Language Looks Like">

**Scope clause anatomy:**

1. **Deliverables list** — Specific, enumerable outputs (5 landing pages, 12 blog posts, 1 integration with Salesforce)
2. **Acceptance criteria** — What "done" means (client approves each deliverable within 5 business days, or it's deemed accepted)
3. **Revision rounds** — How many rounds of changes are included (2 rounds of revisions per deliverable; additional rounds billed at $150/hour)
4. **Explicit exclusions** — What is NOT included ("This SOW does not include mobile app development, third-party integrations, or ongoing maintenance")
5. **Change order process** — How out-of-scope requests get handled ("Any work outside this scope requires a written Change Order with revised pricing before commencement")

</Slide>

<Slide title="The Change Order Clause">

This one clause eliminates scope creep entirely — or at minimum, ensures you get paid for it.

**Template language:**
"Any work not explicitly described in this Statement of Work is considered out of scope. Client may request additional work in writing. Consultant will provide a Change Order with revised timeline and pricing within 48 hours. No out-of-scope work will commence without a signed Change Order."

Without this clause, a client's "can you just also..." becomes your unpaid overtime. With this clause, it becomes a new project or a billable addition.

</Slide>
</SlideNavigation>

<ExampleCard label="Case Study: The Scope Creep Trap">
A UX designer signed a $12,000 contract to "redesign the client's mobile app." The contract had no deliverables list, no revision limits, and no change order process.

Three months in, the client had added a desktop web version, three new feature flows, and a design system. The designer had done $30,000 worth of work for $12,000.

When she pushed back, the client said, "But it's all part of the app redesign — that's what we agreed to."

She couldn't prove otherwise. The contract said "redesign the mobile app." That was all it said.

**The fix:** A three-line deliverables list and a change order clause would have resolved this before it started.
</ExampleCard>

## Clause 2: Payment

Payment terms are where your cash flow either works or doesn't. Most solo founders inherit whatever terms the client suggests. That's backwards — you should have default terms and hold them.

<SlideNavigation>
<Slide title="Payment Structures by Deal Type">

| Services Under $10K | Services $10-50K | Services Over $50K |
|---------------------|------------------|--------------------|
| 50% upfront, 50% on delivery | 33% upfront, 33% midpoint, 34% on delivery | Monthly milestones, paid within 14 days of acceptance |

**SaaS/Recurring:**
- Monthly billing: charged on the 1st of each period, in advance
- Annual prepaid: billed upfront with a 15-20% discount
- No payment, no access: SaaS can suspend service for non-payment without a messy clause

**The deposit rule:** A 50% upfront deposit eliminates 80% of non-payment risk. When a client has paid you, they're invested. When they haven't paid you anything, walking away costs them nothing.

</Slide>

<Slide title="Late Fee Language">

Your contract must specify late fees for them to be enforceable. A verbal agreement about late fees is almost worthless in a dispute.

**Standard late fee clause:**
"Invoices not paid within [NET TERMS] days of the invoice date shall accrue interest at the rate of 1.5% per month (18% per annum) or the maximum rate permitted by applicable law, whichever is less."

1.5%/month (18% annualized) is the most common contractual rate in US B2B contracts and the rate courts most reliably uphold. Some jurisdictions cap late fees — check your state.

**Note:** You don't have to enforce the late fee every time. Having it in the contract is what matters — it gives you leverage and a reason to call.

</Slide>

<Slide title="Payment Method Specifics">

Your contract should specify:
- **Accepted payment methods:** Wire transfer, ACH, credit card (specify if you pass on processing fees)
- **Payment currency:** USD is default; specify if you're accepting other currencies
- **Invoice delivery method:** Email to billing contact (specify the email address in the contract)
- **Wire fee responsibility:** International wire fees ($15-50) — client typically bears these costs

**For international clients:** State that all amounts are in USD and that the client is responsible for any currency conversion costs. Stripe and PayPal handle this automatically when you invoice in USD.

</Slide>
</SlideNavigation>

## Clause 3: IP Ownership

This is the clause most solo founders skip or accept as written without realizing what they're giving away.

<InsightCard icon="⚖️" title="The IP Trap">
68% of service providers have never negotiated IP clauses and default to work-for-hire — meaning they give the client ownership of everything. For many businesses, this includes your methodologies, frameworks, code libraries, and templates that you use across dozens of clients. That's giving away your core asset.
</InsightCard>

<SlideNavigation>
<Slide title="The Three IP Models">

**Model 1: Work-for-hire (client owns everything)**
- Client owns all deliverables and all underlying materials used to create them
- This is the default in many templates — read carefully
- When to use: Custom work that is genuinely built only for this client and has no reuse value for you
- Pricing note: Work-for-hire warrants higher pricing since you can't reuse the work

**Model 2: License model (you retain IP, client gets usage rights)**
- You retain ownership of the IP; client gets a perpetual, non-exclusive license to use the deliverable
- You can reuse frameworks, code, templates, and methodologies across clients
- When to use: When you deliver similar work to multiple clients (methodology, templates, frameworks, code libraries)

**Model 3: Hybrid (client owns deliverables, you keep underlying tools)**
- Client owns the specific deliverable (the website, the marketing plan)
- You retain ownership of pre-existing tools, code, frameworks, and methodologies used to build it
- This is usually the right answer for most solo founders

</Slide>

<Slide title="The IP Decision Framework">

Which model should you use?

- **Building something custom that is only useful to this client?** → Work-for-hire (charge accordingly)
- **Delivering a methodology or framework you use with all your clients?** → License model (retain your IP)
- **Using your code libraries, templates, or tools in client work?** → Hybrid (client gets the deliverable, you keep your tools)

**Key language for the hybrid model:**
"Consultant grants Client ownership of all deliverables specified in this SOW upon receipt of full payment. Client acknowledges that Consultant retains ownership of all pre-existing Intellectual Property, including but not limited to methodologies, templates, frameworks, code libraries, and tools used to create the deliverables."

</Slide>
</SlideNavigation>

<SwipeDecision
  title="IP Clause: Accept or Push Back?"
  description="For each clause a client sends you, decide whether to accept it as written or push back."
  optionA="Push Back"
  optionB="Accept"
  persistKey="legal-L2-swipe"
  cards={[
    {
      id: "1",
      content: "Client's redline: 'All work product, including any tools, methodologies, or materials developed during this engagement, shall be the sole property of Client.'",
      correctOption: "a",
      explanation: "Push back. This is a work-for-hire clause that claims your underlying IP — including your reusable tools and frameworks. Counter with the hybrid model: they own the deliverable, you keep your pre-existing IP."
    },
    {
      id: "2",
      content: "Client's clause: 'Client shall own all custom code specifically written for this project. Consultant retains ownership of any pre-existing code libraries and frameworks.'",
      correctOption: "b",
      explanation: "Accept. This is the hybrid model — exactly what you want. Client gets the custom deliverable, you keep your reusable tools. This is reasonable and standard."
    },
    {
      id: "3",
      content: "Client's clause: 'Consultant grants Client a perpetual, worldwide, exclusive license to the methodology framework delivered under this engagement.'",
      correctOption: "a",
      explanation: "Push back on 'exclusive.' An exclusive license means you can't use the same methodology with other clients. Counter with 'non-exclusive' — Client gets full use, but you retain the right to use the methodology with others."
    }
  ]}
/>

## Clause 4: Termination

A clear termination clause is not pessimistic — it's the clause that makes disputes resolve quickly and cleanly when things go wrong.

<SlideNavigation>
<Slide title="Termination Types">

**Termination for cause:**
Either party can terminate immediately (or with short notice) if the other materially breaches the agreement — fails to pay, delivers nothing, etc.

**Termination for convenience:**
Either party can end the engagement with advance notice (typically 14-30 days), regardless of fault. This is what makes clients and vendors willing to sign long-term contracts — everyone knows there's a clean exit.

**The key principle:** Contracts with explicit termination-for-convenience clauses resolve 3x faster than those without. When the exit is clear, there's no need to fight about it.

</Slide>

<Slide title="Kill Fees and WIP Payments">

When a client terminates for convenience, what happens to work in progress?

**Kill fee structure (standard for project work):**
- Work completed and accepted: Paid in full
- Work in progress at termination: Paid at [50-75]% of the applicable rate
- Remaining unpaid balance for completed milestones: Due immediately upon termination

**What happens to IP on termination?**
Generally: Client owns deliverables for work they've paid for. Deliverables not yet paid for revert to Consultant until payment is made.

**Notice periods:**
- Standard: 30 days written notice
- For small engagements: 14 days is reasonable
- Enterprise/long-term: 60-90 days

</Slide>
</SlideNavigation>

## Putting It Together: The Clause Priority Matrix

Not all clauses need the same level of customization every deal.

<SlideNavigation>
<Slide title="Customize for Every Deal">

These three clauses change with every project:

**Scope** — Different deliverables, different exclusions, different revision limits. Always write this fresh.

**Payment terms** — Different amounts, deposit structures, milestone schedules. Always customize.

**Termination notice period** — Sometimes 14 days, sometimes 30. Match to deal size and duration.

</Slide>

<Slide title="Customize Once, Reuse">

Set these defaults once in your master template, then only change when a client specifically pushes back:

**IP ownership** — Set your standard model (usually hybrid) and use it unless the client has a specific reason to deviate.

**Liability cap** — Set at 1-2x contract value in your template. Almost always appropriate.

**Confidentiality** — Mutual NDA language can be standard in every contract.

</Slide>

<Slide title="Use Template Language">

These rarely need customization and are almost never the source of disputes:

**Governing law** — Your state is fine as a default. Enterprise clients may insist on theirs; that's usually acceptable.

**Dispute resolution** — Mediation before litigation is standard and sensible.

**Force majeure** — Standard language is fine. You will almost never invoke this.

</Slide>
</SlideNavigation>

## Build Your Clause Library

<TemplateBuilder
  title="My Standard Contract Clauses"
  persistKey="legal-L2-template"
  sections={[
    {
      id: "scope",
      title: "My Standard Scope Clause Elements",
      fields: [
        { id: "deliverables", label: "How I define deliverables", placeholder: "e.g., numbered list with specific outputs, file formats, quantities", type: "textarea" },
        { id: "revisions", label: "Standard revision rounds I include", placeholder: "e.g., 2 rounds of revisions per deliverable; additional at $150/hr", type: "text" },
        { id: "exclusions", label: "Standard exclusions for my work", placeholder: "e.g., ongoing support, third-party integrations, mobile development", type: "textarea" }
      ]
    },
    {
      id: "payment",
      title: "My Default Payment Terms",
      fields: [
        { id: "deposit", label: "Standard deposit for services", placeholder: "e.g., 50% upfront for projects under $10K", type: "text" },
        { id: "terms", label: "Net payment terms", placeholder: "e.g., Net 14 for most clients, Net 30 for enterprise", type: "text" },
        { id: "latefee", label: "Late fee rate", placeholder: "e.g., 1.5%/month (18% per annum)", type: "text" }
      ]
    },
    {
      id: "ip",
      title: "My IP Ownership Model",
      fields: [
        { id: "model", label: "Which IP model fits my business?", placeholder: "e.g., Hybrid — client owns deliverables, I retain pre-existing frameworks and code", type: "text" },
        { id: "preexisting", label: "My pre-existing IP to protect", placeholder: "e.g., my sales methodology, code libraries, design templates, training materials", type: "textarea" }
      ]
    },
    {
      id: "termination",
      title: "My Termination Terms",
      fields: [
        { id: "notice", label: "Standard notice period", placeholder: "e.g., 30 days written notice for convenience termination", type: "text" },
        { id: "wip", label: "Kill fee for work in progress", placeholder: "e.g., 50% of rate for work completed but not yet accepted at termination", type: "text" }
      ]
    }
  ]}
/>

## Lesson 2 Completions

<InteractiveChecklist
  title="Your Clause Library Foundations"
  persistKey="legal-L2-actions"
  items={[
    "Identify which IP model fits your business (work-for-hire, license, or hybrid)",
    "Write your standard scope clause template with deliverables list, revision rounds, and exclusion language",
    "Set your default payment terms: deposit percentage, net terms, and late fee rate",
    "Write your standard termination clause with notice period and WIP payment terms",
    "Add a change order clause to your contract templates",
    "Complete the My Standard Contract Clauses builder above",
    "Move to Lesson 3 to go deeper on payment terms and collections structure"
  ]}
/>

## What's Next

In **Lesson 3**, you'll drill into payment terms specifically — Net 7, 14, and 30, late fee structures, deposit mechanics, and the collections escalation ladder you'll use when clients don't pay on time.
