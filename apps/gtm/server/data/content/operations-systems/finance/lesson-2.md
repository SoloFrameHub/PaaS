---
title: "Automated Collections & Overdue Reminders"
duration: "45 min"
track: "Operations & Systems"
course: "Course 47: Sales Finance & Tax"
lesson: 2
---

## Dunning: The Word That Defines Your Cash Flow

"Dunning" is the centuries-old term for following up on overdue payments. In the pre-software era, it meant physical letters, phone calls, and courthouse visits. For solo founders today, it should mean nearly none of that — because the right system handles it automatically.

**82% of late invoice payments are resolved with a single follow-up reminder.** Most overdue invoices are not clients trying to avoid payment — they're people who got busy, forgot, or assumed someone else on their team handled it. Your automated system catches them before a non-payment becomes a relationship problem.

The goal of this lesson: build a dunning system that recovers late payments without your emotional involvement, preserves client relationships, and eliminates the soul-crushing experience of manually chasing invoices.

<InsightCard icon="💰" title="The Stakes of Getting This Wrong">
For SaaS businesses: involuntary churn (failed payments) accounts for 20-40% of all SaaS churn. Most of those customers didn't mean to cancel — their card expired or a payment failed and no one caught it. Dunning automation is the single highest-ROI system you'll build in this course.
</InsightCard>

## The Two Different Dunning Problems

SaaS founders and service business founders face fundamentally different collections challenges. Know which one you are:

<SlideNavigation>
<Slide title="SaaS / Subscription: The Failed Payment Problem">

**The problem:** Credit cards expire, banks decline transactions for fraud protection, card numbers change. These are not client behavior problems — they're system problems that dunning automation solves.

**The solution stack:**
1. Stripe Smart Retries (free, built-in) — retries failed payments at the optimal time
2. Stripe Customer Portal (free) — lets customers update their own payment methods
3. Pre-expiry card notifications — alert customers 7 days before their card expires
4. Baremetrics Recover ($50/mo+) — adds personalized emails and in-app notifications on top of Stripe

**The result:** Stripe Smart Retries alone recover **10-25% of initially failed payments**. Adding Baremetrics Recover on top recovers an additional 5-15%. For a $10K MRR SaaS, this is $1,500-4,000 in revenue per month that would otherwise disappear.

</Slide>

<Slide title="Service Business: The Invoice Overdue Problem">

**The problem:** Clients pay late — sometimes due to internal approval processes, sometimes due to forgetfulness, occasionally due to cash flow issues of their own.

**The solution stack:**
1. Automated invoice reminders (FreshBooks, Wave, or Stripe Invoicing) — send at -1 day, +1 day, +3 days, +7 days, +14 days
2. Personal email at +7 days from you
3. Phone call at +14 days
4. Formal notice with late fee at +21 days
5. Work pause + final demand at +30 days

**The result:** With automated reminders, 82% of late invoices resolve before you make a personal call. The remaining 18% require escalating human intervention — which the escalation ladder addresses.

</Slide>
</SlideNavigation>

## Setting Up Stripe Smart Retries

If you're on Stripe and you don't have Smart Retries enabled, do this now. It takes 3 minutes and will likely recover thousands of dollars per year.

<ProgressiveReveal title="Stripe Smart Retries Setup" persistKey="finance-L2-reveal">

<RevealSection title="Step 1: Enable Smart Retries">

Navigate to: Stripe Dashboard → Settings → Billing → Subscriptions

Find "Smart Retries" and toggle it ON.

That's it. Stripe will now automatically retry failed subscription payments at optimal times (research shows the optimal retry pattern is: 1, 3, 5, and 7 days after initial failure).

</RevealSection>

<RevealSection title="Step 2: Configure Dunning Emails">

Still in Stripe Billing settings, find "Customer emails" and configure:
- "Payment failed" email: ON (immediately notify customer)
- "Invoice finalized" email: ON (confirmation when invoice is generated)
- "Invoice upcoming" email: ON (advance notice of upcoming charge)

These emails go out automatically from Stripe. Customize the email template with your logo and a friendly tone in Dashboard → Settings → Emails.

</RevealSection>

<RevealSection title="Step 3: Enable Customer Portal">

Stripe Customer Portal lets your subscribers update their payment methods, view invoices, and manage their subscription — without involving you.

Go to: Stripe Dashboard → Settings → Billing → Customer portal → Enable

Add a "Manage billing" link to your product dashboard or in your dunning emails. This is the most effective way to get customers to update their payment method — make it self-serve.

</RevealSection>

<RevealSection title="Step 4: Configure Subscription Pause on Failure">

You can configure Stripe to automatically pause or cancel subscriptions after repeated failed payments.

Recommended setting: Pause (not cancel) after 14 days of failed retries. This gives the customer time to fix their payment method without losing their subscription entirely. Set up an email at pause time: "Your account has been paused due to a payment issue — update your card here to restore access."

Go to: Stripe Dashboard → Settings → Billing → Subscriptions → "Pause subscriptions after failure" → 14 days

</RevealSection>

</ProgressiveReveal>

## The Service Business Collections Ladder

Build this ladder once. Then follow it consistently every time an invoice goes overdue.

<SlideNavigation>
<Slide title="Automated Phase (Days -1 to +3)">

**Day -1 (before due date):** Automated reminder
"Reminder: Invoice [#] for $[X] is due tomorrow. Pay here: [link]"
This single automated touch recovers a significant portion of potentially late invoices — especially for clients who pay promptly when reminded.

**Day +1 (one day past due):** Automated overdue notice
"Your invoice is past due. Invoice [#] for $[X] was due [date]. Pay here: [link]"
Tone: neutral and factual. Not accusatory.

**Day +3:** Second automated reminder
"A second reminder that Invoice [#] remains outstanding. If you've already sent payment, please disregard. If not, you can pay here: [link]. Reach out if there's a question on this invoice."

Configure all three in FreshBooks, Wave, or Stripe Invoicing. Takes 15 minutes to set up. Runs automatically for every overdue invoice thereafter.

</Slide>

<Slide title="Personal Phase (Days +7 to +14)">

**Day +7:** Personal email from you

This should come from your email, not your invoicing tool. One to three sentences. Warm, direct, and problem-solving in tone:

"Hi [Name], just following up on Invoice [#] for $[X] — wanted to make sure it didn't slip through the cracks. Let me know if there's anything on your end I can help with to get this processed."

This opens the door for the client to tell you there's an issue: a new approver, an invoice that went to the wrong email, a budget freeze. Most of the time, this email resolves it.

**Day +14:** Phone call or Zoom

Don't be passive. Pick up the phone. The goal is not confrontation — it's information. Is there a process issue? A dispute with the invoice? A cash flow problem on their end?

"Hi [Name], I'm calling to follow up on Invoice [#] — it's now two weeks past due. I want to make sure we can get this resolved. Is there anything holding up processing on your end?"

Listen first. Then solve.

</Slide>

<Slide title="Formal Phase (Days +21 to +45)">

**Day +21:** Formal notice with late fee
Written notice (email + letter if the amount warrants it). Apply late fee per your contract.

"Dear [Name], this is a formal notice that Invoice [#] for $[X] remains unpaid as of [date]. A late fee of 1.5% per month ($[X]) has been applied per our contract dated [date]. Updated total: $[X]. Please remit payment within 5 business days."

**Day +30:** Pause work + final demand
If you have ongoing work with this client, pause it. State this clearly in your final demand.

**Day +45:** Escalation decision
Three paths: small claims court (under $10K, no attorney needed), collections agency (25-40% fee, appropriate for larger amounts), or write-off (for small amounts where recovery cost exceeds benefit). Document the write-off for tax purposes.

</Slide>
</SlideNavigation>

## Advanced: Baremetrics Recover

For SaaS founders with $5K+ MRR, the jump from Stripe's built-in dunning to Baremetrics Recover is worth evaluating.

<StrategyDuel
  title="Stripe Built-In vs Baremetrics Recover"
  persistKey="finance-L2-duel"
  scenario="You're a SaaS founder with $8,000 MRR and losing approximately $400/month to failed payments (5% involuntary churn). Is Baremetrics Recover worth $50/month?"
  strategyA={{ name: "Stripe Built-In (Free)", description: "Smart Retries + automated emails + Customer Portal", pros: ["Free — no monthly cost", "Already set up if you're on Stripe", "Recovers 10-25% of failed payments on its own"], cons: ["Generic email templates", "No in-app banners or notifications", "Limited analytics on dunning performance"] }}
  strategyB={{ name: "Baremetrics Recover ($50/mo)", description: "Personalized dunning emails, in-app prompts, and detailed analytics on top of Stripe", pros: ["Recovers additional 5-15% beyond Stripe alone", "Personalized email sequences with customer name and plan", "Analytics showing exactly which dunning step recovers customers"], cons: ["$50/month additional cost", "Takes setup time to configure properly", "ROI requires $3K+ MRR in failed payment exposure"] }}
  expertVerdict="At $8K MRR with $400/month in failed payments, Stripe Smart Retries likely recovers $60-100/month for free. Baremetrics adds another $20-60/month in recovery. At $50/month cost, it's borderline. The real tipping point is $10K+ MRR. Below that, optimize Stripe's built-in dunning first — it's free and covers most of the recovery potential."
/>

## Email Templates for Every Stage

<TemplateBuilder
  title="My Dunning Email Templates"
  persistKey="finance-L2-template"
  sections={[
    {
      id: "automated",
      title: "Automated Reminder Templates",
      fields: [
        { id: "reminder", label: "Day -1 reminder (automated)", placeholder: "e.g., Subject: Payment reminder — Invoice [#] due tomorrow\nHi [Name], just a friendly reminder that Invoice [#] for $[X] is due tomorrow...", type: "textarea" },
        { id: "overdue1", label: "Day +1 overdue notice (automated)", placeholder: "e.g., Subject: Invoice [#] is now past due\nHi [Name], Invoice [#] for $[X] was due [date] and remains outstanding...", type: "textarea" }
      ]
    },
    {
      id: "personal",
      title: "Personal Follow-Up Templates",
      fields: [
        { id: "day7", label: "Day +7 personal email", placeholder: "e.g., Hi [Name], just checking in on Invoice [#]...", type: "textarea" },
        { id: "formal", label: "Day +21 formal notice", placeholder: "e.g., Dear [Name], this is formal notice that Invoice [#]...", type: "textarea" }
      ]
    }
  ]}
/>

## Test Your Dunning Logic

<SwipeDecision
  title="Collections Response Game"
  description="For each scenario, choose the right collections action."
  optionA="Escalate Immediately"
  optionB="Follow the Standard Ladder"
  persistKey="finance-L2-swipe"
  cards={[
    {
      id: "1",
      content: "Invoice is 3 days overdue. Client is a long-term customer with a spotless payment history.",
      correctOption: "b",
      explanation: "Follow the standard ladder. Automated reminders on Days +1 and +3 are the right response. A prompt call to a reliable client would be premature and may feel aggressive."
    },
    {
      id: "2",
      content: "Invoice is 7 days overdue. Client mentioned in a meeting last week that their company is 'going through some financial changes.'",
      correctOption: "a",
      explanation: "Escalate faster. The mention of financial changes is a signal. Make the personal call at Day +7 (rather than waiting for Day +14) and ask directly about the situation. You may need to negotiate a payment plan rather than wait 30 more days."
    },
    {
      id: "3",
      content: "SaaS subscription payment failed. Card declined. Customer has been with you for 8 months.",
      correctOption: "b",
      explanation: "Follow the standard ladder: Stripe Smart Retries first, then automated email with Customer Portal link. Don't make a personal call for a first-time card failure — it's usually a system issue, not intent."
    },
    {
      id: "4",
      content: "Invoice is 21 days overdue. Client has not responded to Day +7 email or Day +14 call.",
      correctOption: "a",
      explanation: "Escalate. Non-responsiveness at Day +21 is a red flag. Send the formal notice with late fee applied, and if you have ongoing work, pause it. This is the point where you evaluate the relationship and potential collections."
    }
  ]}
/>

<RangeSlider
  label="How much of your current collections process is automated vs manual?"
  min={1}
  max={10}
  lowLabel="100% manual — I do everything"
  highLabel="Fully automated — system handles it"
  persistKey="finance-L2-automation"
/>

## Lesson 2 Completions

<InteractiveChecklist
  title="Collections Automation Checklist"
  persistKey="finance-L2-actions"
  items={[
    "Enable Stripe Smart Retries (Dashboard → Settings → Billing → Subscriptions) if on Stripe",
    "Enable Stripe Customer Portal for self-serve payment method updates",
    "Configure automated invoice reminders in FreshBooks or Wave (Day -1, +1, +3, +7, +14)",
    "Write personal follow-up email templates for Day +7 and Day +21",
    "Define my escalation decision rule: when do I pause work? When do I involve collections?",
    "Set up late fee application at Day +21 — make sure your invoicing tool supports this"
  ]}
/>

## What's Next

In **Lesson 3**, you'll learn to track your revenue properly — not just as a total number, but decomposed into New MRR, Expansion MRR, Contraction, and Churned MRR. Understanding this breakdown reveals whether your business is actually healthy under the surface.
