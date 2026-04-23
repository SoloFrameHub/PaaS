---
title: "Playbook: B2B SaaS Founder"
duration: "55 min"
track: "Operations & Systems"
course: "Course 44: The Sales Playbook"
lesson: 3
---

## The Repeatability Problem

You've got an MVP. You've validated it with 5-20 customers — probably through the kind of manual hustle described in Lesson 2. You have proof that someone will pay for this.

Now you're facing a different problem: how do you get more customers without also manually hunting for each one?

This is the repeatability problem, and it's where most B2B SaaS founders stall. They know how to get customers through personal network and elbow grease. They don't know how to build a machine that generates customers at predictable volume.

The B2B SaaS Founder playbook is that machine. It's designed for founders who have:

- A working product (at minimum, a shippable MVP)
- 5-20 customers who are using and paying for it
- An ICP that's specific enough to build a prospect list from
- 5-7 hours per week to dedicate to acquisition
- A budget of $100-300/month for tools

If you're still at zero customers, finish the Lesson 2 playbook first. If you have 50+ customers and $50K+ MRR, the Scaling playbook in Lesson 6 is more appropriate.

<RangeSlider
  label="How many paying customers do you currently have?"
  min={0}
  max={100}
  lowLabel="0 customers"
  highLabel="100+ customers"
  persistKey="playbook-L3-customers"
/>

## The Pipeline Math That Drives Everything

Before building your playbook, you need to understand your math. Every activity target in this playbook derives from working backward from your revenue goal.

<ScenarioSimulator
  title="B2B SaaS Pipeline Math Calculator"
  persistKey="playbook-L3-sim"
  levers={[
    { id: "revenueGoal", label: "Monthly revenue goal ($K)", min: 5, max: 100, step: 5, defaultValue: 20 },
    { id: "acv", label: "Average contract value ($K/year)", min: 1, max: 50, step: 1, defaultValue: 10 },
    { id: "closeRate", label: "Meeting-to-close rate (%)", min: 10, max: 50, step: 5, defaultValue: 25 },
    { id: "meetingRate", label: "Reply-to-meeting rate (%)", min: 20, max: 80, step: 10, defaultValue: 50 },
    { id: "replyRate", label: "Email reply rate (%)", min: 2, max: 20, step: 1, defaultValue: 7 }
  ]}
  outputs={[
    { id: "dealsNeeded", label: "New deals needed per month", formula: "revenueGoal / (acv / 12)", unit: " deals", precision: 1 },
    { id: "meetingsNeeded", label: "Discovery meetings needed per month", formula: "dealsNeeded / (closeRate / 100)", unit: " meetings", precision: 0 },
    { id: "repliesNeeded", label: "Replies needed per month", formula: "meetingsNeeded / (meetingRate / 100)", unit: " replies", precision: 0 },
    { id: "emailsNeeded", label: "Cold emails needed per month", formula: "repliesNeeded / (replyRate / 100)", unit: " emails", precision: 0 }
  ]}
  insight="To hit your revenue goal, you need to send approximately {emailsNeeded} cold emails per month. That's {emailsNeeded} emails divided by ~20 working days = {emailsNeeded} ÷ 20 per day. This is your minimum viable outreach volume. If this number feels impossibly high, adjust your close rate, meeting rate, or increase your ACV."
/>

## The B2B SaaS Founder Playbook

<TemplateBuilder
  title="B2B SaaS Founder Playbook"
  persistKey="playbook-L3-template"
  sections={[
    {
      id: "who",
      title: "WHO — ICP-Filtered Prospect List",
      fields: [
        { id: "title", label: "Job Title / Role", placeholder: "e.g., VP of Sales, Head of Operations, CTO — be specific to who has the pain AND the budget", type: "text" },
        { id: "company", label: "Company Firmographics", placeholder: "Company size: [range]. Industry: [specific]. Revenue stage: [range]. Tech stack: [relevant tools they use]", type: "textarea" },
        { id: "pain", label: "Specific Pain Point (quantified)", placeholder: "e.g., Spending 3+ hours/week on manual [task]. Losing [X]% of leads due to [problem]. Has failed to solve this with [tool they already tried].", type: "textarea" },
        { id: "list", label: "Prospect List Source", placeholder: "e.g., Apollo.io with filters: [your specific filters]. LinkedIn Sales Navigator with: [your search parameters]. Target: 100-200 new prospects per month.", type: "textarea" }
      ]
    },
    {
      id: "how",
      title: "HOW — Outbound Email + LinkedIn System",
      fields: [
        { id: "primary", label: "Primary: Cold Email System", placeholder: "Tool: [Apollo/Instantly/Lemlist]. Volume: [X] emails/week. Sequence: [X]-email sequence with [X]-day gaps. Personalization: [what you customize per prospect].", type: "textarea" },
        { id: "secondary", label: "Secondary: LinkedIn Strategy", placeholder: "Content: [X] posts/week on [topics]. DMs: [X] personalized DMs/week to [who]. Connection requests: [X]/week with [type of note].", type: "textarea" },
        { id: "tools", label: "Tool Stack ($100-300/month)", placeholder: "e.g., Apollo.io Basic ($49/mo) for prospecting + Instantly ($37/mo) for email sending + HubSpot Free for CRM", type: "textarea" }
      ]
    },
    {
      id: "what",
      title: "WHAT — Problem-First Messaging",
      fields: [
        { id: "subject", label: "Cold Email Subject Line Formula", placeholder: "e.g., 'Quick question about [specific pain]' or '[Competitor they use] alternative for [company type]' or '[mutual connection] suggested I reach out'", type: "text" },
        { id: "opener", label: "Personalized First Line Formula", placeholder: "e.g., 'Saw your post about [topic] — [specific observation]' or 'You're using [tool] — I've been talking to [role]s about [pain] that comes with it'", type: "textarea" },
        { id: "body", label: "PAS Framework Body (2-3 sentences)", placeholder: "Problem: Most [ICP] struggle with [specific problem].\nAgitate: This means [consequence], which costs [time/money].\nSolution: [Company] helps [ICP] [outcome] in [timeframe]. [1 proof point].", type: "textarea" },
        { id: "cta", label: "Call to Action", placeholder: "e.g., 'Worth a 15-minute call to see if this is relevant for [Company]?' — always low-commitment, always question-format", type: "text" }
      ]
    },
    {
      id: "measured",
      title: "MEASURED — Weekly Pipeline Math",
      fields: [
        { id: "leading", label: "Weekly Leading Metrics", placeholder: "Emails sent: [target]\nEmail reply rate: [target %]\nLinkedIn DM reply rate: [target %]\nMeetings booked: [target]\nMeetings held: [target]", type: "textarea" },
        { id: "lagging", label: "Monthly Lagging Metrics", placeholder: "Deals closed: [target]\nNew MRR: $[target]\nCAC: $[target]\nSales cycle length: [target days]", type: "textarea" }
      ]
    },
    {
      id: "commitment",
      title: "COMMITMENT — The B2B Weekly Rhythm",
      fields: [
        { id: "monday", label: "Monday (90 min)", placeholder: "Prospect research + target account list building. Add [X] new prospects to CRM with firmographic data and personalization notes.", type: "text" },
        { id: "tuesday", label: "Tuesday (60 min)", placeholder: "Email sequence creation + launch. Write personalized openers for new prospects. Import to email tool. Launch new sequences.", type: "text" },
        { id: "wednesday", label: "Wednesday (45 min)", placeholder: "Follow-ups + sequence monitoring. Reply to all email responses. Check reply rates. Adjust subject lines if below [X]%.", type: "text" },
        { id: "thursday", label: "Thursday (90 min)", placeholder: "Discovery calls + LinkedIn engagement. Hold [X] discovery calls. Engage on LinkedIn (comments, DMs, posts). Connect with [X] new ICP contacts.", type: "text" },
        { id: "friday", label: "Friday (45 min)", placeholder: "Metrics review + CRM cleanup. Update pipeline. Log call notes. Review this week's leading metrics. Set next week's priorities.", type: "text" }
      ]
    }
  ]}
/>

## The 5-Email Sequence Architecture

Most B2B founders either send one cold email (too few) or blast 10-message sequences (too many). The research-backed sweet spot is a 5-email sequence with specific timing and escalating value.

<SlideNavigation>
<Slide title="Email 1: The Value-Led Opener (Day 1)">

**Goal:** Start a conversation, not make a sale.

**Structure:**
- Personalized first line referencing their specific situation (1 sentence)
- Problem framing that matches their reality (2 sentences)
- What you do + one proof point (2 sentences)
- Low-commitment CTA question (1 sentence)

**Length:** 80-120 words

**Tone:** Peer-to-peer, not vendor-to-prospect. You're a founder talking to another founder.

**What NOT to do:** Don't list features. Don't say "I wanted to reach out." Don't use "quick call" (everyone says quick call). Don't attach a deck.

</Slide>
<Slide title="Email 2: The Insight Share (Day 3)">

**Goal:** Demonstrate expertise without pushing for a meeting.

**Structure:**
- Brief reference to Email 1 (1 sentence, not "just following up")
- A specific insight, statistic, or finding relevant to their situation (3-4 sentences)
- How this connects to what you do (1-2 sentences)
- Gentle CTA: "Does this resonate with what you're seeing?"

**Length:** 100-150 words

**Why this works:** You're giving before asking. The insight positions you as someone worth talking to, not just another vendor chasing a commission.

</Slide>
<Slide title="Email 3: The Social Proof (Day 7)">

**Goal:** Build credibility through specific customer results.

**Structure:**
- Brief: "Wanted to share a quick story"
- Customer result: "[Similar company type] was dealing with [same pain]. Within [timeframe], they [specific outcome with metrics]."
- Connection to their situation (1 sentence)
- CTA: "Would you be open to learning how they did it?"

**Length:** 100-130 words

**The specificity rule:** "Increased revenue by 30%" is weak. "Reduced time-to-close from 45 days to 28 days for a [industry] company with a team of [size]" is strong. Specificity signals truth.

</Slide>
<Slide title="Email 4: The Objection Anticipator (Day 14)">

**Goal:** Address the most common reason they haven't responded.

**The most common reasons B2B buyers don't respond:**
- They're not sure it's relevant to their specific situation
- They don't have time for another tool evaluation
- They tried something similar that didn't work

**Pick one and address it directly:** "I know [objection] — here's why [our approach is different]."

**Length:** 80-100 words

**Tone:** Empathetic and direct. Not defensive or desperate.

</Slide>
<Slide title="Email 5: The Clean Break (Day 21)">

**Goal:** One last genuine attempt, leave the door open permanently.

**Structure:**
- "I don't want to keep cluttering your inbox"
- Brief final value proposition
- Long-term open door: "If [problem] becomes a priority in Q[X], happy to connect then"
- No hard close, no guilt, no pressure

**Why this works:** The "clean break" email actually gets more replies than Email 3 or 4 in most sequences. The psychological safety of "you're off the hook" removes the friction of responding.

</Slide>
</SlideNavigation>

## LinkedIn as the Warming Layer

Cold email gets you in the door. LinkedIn keeps you warm while the sequence runs.

<InsightCard icon="💼" title="The LinkedIn Warming Strategy">
When your cold email sequence is running to a prospect, your LinkedIn activity creates familiarity. They see your name in their inbox AND they see your insights in their LinkedIn feed. By Email 3, you're not a stranger — you're someone they recognize. This "recognition bonus" increases your sequence reply rate by 15-25%.
</InsightCard>

Your LinkedIn content strategy for B2B SaaS has three content types:

<FlipCard
  front="Content Type 1: Problem Posts"
  back="Posts that describe a problem your ICP experiences in vivid, accurate detail. Not your solution. Just the problem. These get high engagement from people who have the problem — which is exactly your ICP."
/>

<FlipCard
  front="Content Type 2: Behind-the-Build Posts"
  back="Authentic updates on what you're building and what you're learning. 'We just discovered that [ICP] are doing [workaround] because [root cause]. Here's what that means for how we're building [feature].' These build trust and invite inbound."
/>

<FlipCard
  front="Content Type 3: Social Proof Posts"
  back="Customer results, with permission. Specific metrics, specific outcomes, ideally a direct quote. 'We helped [Company type] reduce [metric] from [X] to [Y]. Here's what made it work.' These close deals for prospects already in your sequence."
/>

## Discovery Call: The 15-Minute Structure

When your emails convert to meetings, you need a discovery call framework that qualifies efficiently and creates pipeline.

<ProgressiveReveal title="The 15-Minute Discovery Call Framework" persistKey="playbook-L3-reveal">

<RevealSection title="Minutes 0-2: Context Setting">

"Thanks for making time. I want to make this valuable for you — I'll ask a few questions about your current situation, share what we're doing, and by the end you'll know clearly if it's relevant. Sound good?"

This sets expectations, positions you as thoughtful, and signals you won't waste their time.

</RevealSection>

<RevealSection title="Minutes 2-7: Situation Questions">

Three core discovery questions from your Course 13 work, tailored to your ICP:

1. "How are you currently handling [problem your product solves]?"
2. "What's the biggest frustration with that approach?"
3. "What would you need to see to feel confident moving forward with [category of solution]?"

Listen more than you talk. Take notes. Use their exact words later.

</RevealSection>

<RevealSection title="Minutes 7-11: Tailored Positioning">

Using what they just told you, position your product with their exact language: "So what you're dealing with is [their words]. That's exactly why we built [feature]. [Customer X] had the same issue — here's what happened when they used it: [specific result]."

Don't recite features. Connect each capability directly to what they just described.

</RevealSection>

<RevealSection title="Minutes 11-14: Qualification">

"Based on what you've shared — is this something you're looking to solve in the next 30-60 days, or is it more of a longer-term consideration?"

This BANT qualification (Budget, Authority, Need, Timeline) reveals if they're a near-term opportunity or a future nurture. Don't skip it.

</RevealSection>

<RevealSection title="Minute 14-15: Clear Next Step">

Always end with a specific next step agreed in the call, not a vague "I'll follow up."

Options: "Let's set up a 30-minute demo for Thursday at 2 PM." Or: "I'll send you a case study from [company type] and we can reconnect next week to discuss." No open-ended endings.

</RevealSection>

</ProgressiveReveal>

## Messaging Quality Test

<RewriteExercise
  title="Rewrite This Cold Email Opener"
  persistKey="playbook-L3-rewrite"
  original="Hi [Name], I hope this email finds you well! I'm reaching out because I think our platform could be a great fit for your company. We help businesses like yours improve their sales process and drive revenue growth. Would you be open to a quick chat?"
  hint="Eliminate all generic language. Start with something specific to THEM. Name the exact problem. Skip the pleasantries. End with a question, not a statement."
  expertRewrite="Hi [Name], Saw your LinkedIn post about struggling with [specific pain] — you're not alone. Most [role]s at [company type] are dealing with the same issue: [specific problem]. [Company] helps [ICP] [specific outcome] — [Customer Name] went from [before metric] to [after metric] in [timeframe]. Worth 15 minutes to see if we could do the same for you?"
  criteria={["No 'I hope this finds you well' or equivalent", "References something specific about the recipient", "Names the exact problem without softening it", "Includes one concrete proof point with metrics", "Ends with a question, not a statement", "Under 100 words"]}
/>

## The Weekly Rhythm in Practice

The B2B SaaS playbook requires roughly 5.5 hours per week of focused work. Not scattered throughout the day — blocked, focused work sessions.

<ExampleCard label="Case Study: The Rhythm That Built $30K MRR">
Marcus, a B2B SaaS founder, followed this exact weekly rhythm for 6 months. Before the rhythm: $8K MRR, growing at roughly $500/month. After 6 months of the rhythm: $31K MRR, growing at $4,500/month.

The turning point wasn't a new channel or better messaging — it was consistency. "I treated Tuesday email creation like an appointment I couldn't cancel," he says. "Even when I didn't want to write emails, I wrote emails. Even when my Monday prospecting list felt thin, I filled it. The rhythm created momentum that individual effort never did."

His week 26 metrics: 180 cold emails sent, 8.3% reply rate, 7 meetings held, 2 deals closed. Month-over-month, these numbers improved slightly every single week for 6 months.
</ExampleCard>

<InteractiveChecklist
  title="Your Action Items This Week"
  persistKey="playbook-L3-actions"
  items={[
    "Complete the B2B SaaS Founder Playbook template above",
    "Run the Pipeline Math Calculator with your real revenue goal and current metrics",
    "Build or update your ICP-filtered prospect list (100+ prospects minimum before launching sequences)",
    "Write your 5-email sequence following the architecture in this lesson",
    "Schedule your B2B Weekly Rhythm blocks in your calendar for next week",
    "Set up reply rate tracking — if you can't measure it, you can't optimize it",
    "Write 1 LinkedIn post this week using one of the three content types above"
  ]}
/>

## What's Next

In **Lesson 4**, you'll get the Coach/Consultant playbook — a completely different acquisition model built on content, relationships, and high-touch enrollment conversations. If your business model involves selling expertise rather than software, this is your playbook.

Even if you're a SaaS founder, read Lesson 4. Many of the relationship-building and content principles apply to B2B SaaS founders building a personal brand alongside their product.
