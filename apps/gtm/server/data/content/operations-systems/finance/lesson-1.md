---
title: "Invoicing Systems: Stripe, Chargebee, PayPal"
duration: "45 min"
track: "Operations & Systems"
course: "Course 47: Sales Finance & Tax"
lesson: 1
---

## The Invoice You Send Is a Statement About Your Business

Your invoice is the last impression in the sales process and the first impression in the financial relationship. A professional, automated invoicing system says: "I run a real business. I know what I'm doing. Pay me."

A manually crafted PDF attached to a vague email says the opposite.

More importantly: how you invoice determines how fast you get paid. Solo founders using automated invoicing get paid **2x faster** than those doing it manually. That's not a small efficiency gain — that's the difference between a cash flow problem and a healthy bank balance.

This lesson is about choosing the right invoicing tool for your business model and setting it up so that invoices go out instantly and payment is as frictionless as possible.

<InsightCard icon="💰" title="The Problem You're Solving">
47% of invoices globally are paid late. That's not a client behavior problem — it's largely an invoicing process problem. Invoices that are unclear, slow to arrive, hard to pay, or missing required fields get deprioritized in every AP queue. This lesson fixes that.
</InsightCard>

## Tool Selection: Match the Tool to Your Model

The best invoicing tool is the one that fits your business model, not the one with the most features. Here's how to choose:

<SlideNavigation>
<Slide title="Stripe Billing — Best for SaaS and Digital Products">

**Cost:** $0/month + 2.9% + $0.30 per transaction (standard Stripe rate)

**Best for:** SaaS founders, subscription businesses, course creators, any recurring billing

**What it does:** Recurring billing, automated invoicing, customer portal (where customers manage their own subscriptions), built-in dunning, revenue reporting

**Key advantage:** It's already in Stripe, which most digital businesses use for payments anyway. No separate tool to set up.

**Stripe Tax add-on:** $0.50/transaction handles US sales tax and international VAT automatically. If you have customers in multiple states or countries, this is worth adding immediately.

**Limitation:** Less suited for service businesses where each invoice is custom (different amounts, different scope). Better for recurring, predictable billing.

</Slide>

<Slide title="Chargebee — Best for Complex Subscriptions">

**Cost:** Free (Launch plan, under $250K annual revenue) | $249/month (Rise plan)

**Best for:** SaaS businesses with complex pricing models: usage-based, tiered, add-ons, trials, coupons

**What it does:** Advanced subscription logic that Stripe's native billing can't handle — metered billing (charge per API call), tiered pricing (first 100 users at $X, next 900 at $Y), multi-currency, entitlement management

**Key advantage:** Chargebee runs as a layer on top of Stripe (or Braintree). You keep Stripe as your payment processor; Chargebee handles the subscription complexity.

**Limitation:** If your pricing is simple (one price, one plan), Chargebee is overkill. Use Stripe's native billing. Start Chargebee when Stripe's built-in subscription features are limiting you.

</Slide>

<Slide title="FreshBooks — Best for Service Businesses">

**Cost:** $17/month (Lite, 5 clients) | $30/month (Plus, 50 clients)

**Best for:** Consultants, agencies, coaches — any business that invoices clients different amounts for different work

**What it does:** Time tracking (bill by the hour), project-based invoicing, expense tracking, client portal for payment, automated reminders, basic accounting

**Key advantage:** Time tracking + invoicing in one tool is particularly valuable for hourly billing. The client portal is clean — clients pay without needing to log in.

**Limitation:** Not ideal for SaaS or recurring billing. The subscription management is basic. If your revenue is recurring and standardized, Stripe is better.

</Slide>

<Slide title="Wave — Best for Bootstrapped Founders">

**Cost:** Free (invoicing + accounting) | Payment processing: 2.9% + $0.60 per credit card transaction, 1% for bank payments

**Best for:** Early-stage founders watching every dollar; businesses that need invoicing AND accounting in one free tool

**What it does:** Professional invoicing, payment links, automatic payment reminders, double-entry accounting, expense tracking, and basic financial reports

**Key advantage:** It's completely free for the core features. You only pay when you get paid (the processing fee). For a bootstrapped founder doing $5K/month in revenue, Wave saves $200/month vs paid alternatives.

**Limitation:** Automation and integrations are more limited than paid tools. The payment processing fee ($0.60 vs $0.30 at Stripe) adds up at high volume. At $30K+/month in revenue, a paid tool typically becomes worth it.

</Slide>
</SlideNavigation>

## The Invoicing Tool Selection Matrix

<PredictionGate
  question="You're a solo SaaS founder with 45 customers on a flat $99/month plan. Which invoicing tool is your primary system?"
  persistKey="finance-L1-predict"
  type="choice"
  choices={[
    { id: "a", text: "FreshBooks — best for client billing" },
    { id: "b", text: "Stripe Billing — subscription and recurring billing built in" },
    { id: "c", text: "Chargebee — handles SaaS subscriptions well" },
    { id: "d", text: "Wave — free and handles invoicing" }
  ]}
  correctId="b"
>
Stripe Billing is correct for this scenario. Flat-rate subscriptions are exactly what Stripe's native billing handles — it's already your payment processor, there's no monthly fee, and you get automated recurring billing, customer portal, and dunning. Chargebee would be valuable if you had complex pricing (usage-based, tiered). Wave and FreshBooks are better for service businesses with variable invoices.
</PredictionGate>

## Invoice Anatomy: What Every Invoice Must Include

A missing field on an invoice is not just unprofessional — it can make the invoice legally unenforceable or cause it to get stuck in a client's AP queue for weeks.

<ProgressiveReveal title="The 8 Required Invoice Fields" persistKey="finance-L1-reveal">

<RevealSection title="Fields 1-4: Who and When">

**1. Your company name, address, and tax ID (EIN)**
Your legal entity name — not your brand name, your LLC or Corp name. If you're a sole proprietor, your name and SSN are not required on most invoices, but your EIN is better.

**2. Client company name and billing contact**
The name of the company AND the specific person who approves invoices. Most payment delays happen because the invoice went to the wrong person.

**3. Invoice number (sequential)**
Use a consistent system: INV-2026-001, INV-2026-002. Sequential numbering creates an audit trail and helps both parties track payment status.

**4. Invoice date and due date**
State both explicitly: "Invoice Date: February 26, 2026 — Due Date: March 12, 2026 (Net 14)." Never make the client calculate when payment is due.

</RevealSection>

<RevealSection title="Fields 5-8: What and How">

**5. Line items with descriptions, quantities, and rates**
Specific enough that the approving manager can verify the work. Not "consulting services" — rather "Strategy session (2 hours @ $250/hour) — Jan 15" and "Discovery report — Jan 22."

**6. Subtotal, taxes (if applicable), and total**
If you're required to collect sales tax, show it as a separate line item. If not, make that clear (a note "No sales tax — service exempt in [State]" can prevent questions).

**7. Payment methods and instructions**
List every accepted payment method with clear instructions. "Pay by credit card: [link]. Pay by ACH: [link]. Wire transfer: [provide bank details]." Remove friction from the payment decision.

**8. Late fee terms**
"Invoices not paid within 14 days will accrue interest at 1.5%/month per the terms of our contract dated [date]." The invoice is the reminder that the clause exists.

</RevealSection>

</ProgressiveReveal>

## Setting Up Your Invoice Numbering System

<FlipCard front="Why Invoice Numbers Matter" back="Sequential invoice numbers create a permanent audit trail. Your accountant needs them for bookkeeping. Your client's AP team needs them to match purchase orders. Courts need them as evidence in payment disputes. A consistent numbering system is non-negotiable." />

<FlipCard front="Recommended Format: INV-[YEAR]-[SEQUENCE]" back="INV-2026-001, INV-2026-002... This format sorts chronologically in any file system, includes the year for easy annual record review, and resets each year. Most invoicing tools support custom numbering formats." />

<FlipCard front="Never Reuse Invoice Numbers" back="Even if a client cancels a project and you cancel the invoice, don't reuse that number. Mark it 'VOID' and continue your sequence. Reused numbers create accounting confusion and look unprofessional in audits." />

## PayPal as a Secondary Option

PayPal Business invoicing is worth understanding even if it's not your primary system:

<InsightCard icon="💰" title="When PayPal Makes Sense">
PayPal is widely recognized by international clients who may not have ACH access or US banking relationships. It's a good secondary payment option — not a replacement for your primary invoicing system, but a "I can accept PayPal if that's easier" option that removes friction for certain clients.

Fees: 2.9% + $0.30 US transactions. 4.4% + fixed fee for international. Higher than Stripe, but clients who prefer PayPal will convert better when it's available.
</InsightCard>

## The Invoice Workflow

Once your tool is set up, your invoicing workflow should be nearly automatic:

<SlideNavigation>
<Slide title="For SaaS / Recurring Billing">

1. Customer signs up → Stripe automatically creates subscription
2. Invoice generated automatically on billing date
3. Email sent automatically to customer
4. Failed payments trigger Stripe Smart Retries (covered in Lesson 2)
5. Paid invoices appear in Stripe dashboard and connect to your accounting software

Your ongoing task: review monthly revenue report, investigate any failed payments, handle plan changes.

</Slide>

<Slide title="For Service Businesses">

1. Project milestone reached or monthly retainer date arrives
2. Open FreshBooks/Wave, start from saved template for this client
3. Update line items for this period's work
4. Review and send (takes 3-5 minutes with a template)
5. Automated reminders handle follow-up
6. Payment received → logged automatically in accounting

Your ongoing task: send invoices promptly when milestones are hit. Don't accumulate unbilled work.

</Slide>
</SlideNavigation>

## Build Your Invoicing SOP

<TemplateBuilder
  title="My Invoicing System Setup"
  persistKey="finance-L1-template"
  sections={[
    {
      id: "tool",
      title: "My Invoicing Tool",
      fields: [
        { id: "primary", label: "Primary invoicing tool", placeholder: "e.g., Stripe Billing for my SaaS / FreshBooks for my consulting / Wave (bootstrapped)", type: "text" },
        { id: "secondary", label: "Secondary payment method offered", placeholder: "e.g., PayPal for international clients, ACH for US clients preferring bank transfer", type: "text" }
      ]
    },
    {
      id: "numbering",
      title: "Invoice Numbering",
      fields: [
        { id: "format", label: "My invoice numbering format", placeholder: "e.g., INV-2026-001, INV-2026-002", type: "text" },
        { id: "current", label: "My current invoice number (pick up from here)", placeholder: "e.g., INV-2026-001 (starting fresh) or INV-2026-023 (continuing)", type: "text" }
      ]
    },
    {
      id: "template",
      title: "My Standard Invoice Fields",
      fields: [
        { id: "legal_name", label: "My legal entity name for invoices", placeholder: "e.g., Smith Consulting LLC (not 'Smith Consulting')", type: "text" },
        { id: "terms", label: "Standard payment terms on invoices", placeholder: "e.g., Net 14 — Due March 12, 2026", type: "text" },
        { id: "late_fee", label: "Late fee notice language", placeholder: "e.g., Invoices not paid within 14 days accrue 1.5%/month per contract", type: "textarea" }
      ]
    }
  ]}
/>

## Lesson 1 Completions

<InteractiveChecklist
  title="Invoicing System Setup"
  persistKey="finance-L1-actions"
  items={[
    "Choose and sign up for my primary invoicing tool based on business model (Stripe/FreshBooks/Wave)",
    "Create my first invoice template with all 8 required fields",
    "Set my invoice numbering system (INV-[YEAR]-[SEQUENCE] format)",
    "Add late fee notice to my standard invoice template",
    "Set up at least two payment methods (e.g., credit card + ACH)",
    "Test by sending myself a sample invoice — verify all fields and payment links work",
    "Connect invoicing tool to my accounting software (or set up Wave as both)"
  ]}
/>

## What's Next

In **Lesson 2**, you'll configure automated collections — the dunning system that follows up on overdue invoices without you lifting a finger. We'll cover Stripe Smart Retries for SaaS and the complete collections escalation ladder for service businesses.
