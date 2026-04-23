---
title: "Playbook: Starting from Zero (0 Customers)"
duration: "55 min"
track: "Operations & Systems"
course: "Course 44: The Sales Playbook"
lesson: 2
---

## The Zero Trap

Here's what most founders do when they're starting from zero: they build systems.

They set up an Apollo account. They write a 5-email cold sequence. They create a LinkedIn content calendar. They install a CRM. They design an outreach dashboard.

After two weeks of "setup," they have zero customers and zero conversations. But their systems look great.

This is the zero trap. You're optimizing for the *appearance* of doing sales while avoiding the vulnerability of actually talking to people.

The Starting from Zero playbook isn't about systems. It's about conversations. Before you've had 50 real conversations with your target customer, you don't know enough to build a system. You're guessing. The playbook forces you to stop guessing and start learning.

<InsightCard icon="🔍" title="The Zero-to-Ten Mindset">
Your first 10 customers don't come from systems. They come from hustle, courage, and manual effort. The playbook for zero is fundamentally different from the playbook for scaling. Do not try to automate a process you haven't validated by hand.
</InsightCard>

## Who This Playbook Is For

<PredictionGate
  question="At what customer count should you switch from this 'Starting from Zero' playbook to a more systematic approach?"
  persistKey="playbook-L2-predict"
  type="choice"
  choices={[
    { id: "a", text: "After your first customer" },
    { id: "b", text: "After 10 customers" },
    { id: "c", text: "After 50 customers" },
    { id: "d", text: "After 100 customers" }
  ]}
  correctId="b"
>
Ten customers is the threshold. At 10 customers, you have enough signal to know what's working, who's buying, and why. Before 10 customers, you're still in discovery mode — every conversation is a learning opportunity, not just a sales opportunity. After 10 customers, you can start building repeatable systems. The Scaling playbook (Lesson 6) starts at 50 customers when you have enough data to optimize.
</PredictionGate>

Rate where you are right now:

<RangeSlider
  label="Current customer count (approximate)"
  min={0}
  max={50}
  lowLabel="0 customers"
  highLabel="50+ customers"
  persistKey="playbook-L2-customers"
/>

If you're below 10, this is your playbook. If you're between 10 and 50, this playbook plus the B2B SaaS or Coach/Consultant playbook (depending on your model) is your guide. If you're above 50, proceed to Lesson 6.

## The Starting from Zero Playbook

<TemplateBuilder
  title="Starting from Zero Playbook"
  persistKey="playbook-L2-template"
  sections={[
    {
      id: "who",
      title: "WHO — Dream 25 + ICP Contacts",
      fields: [
        { id: "dream25", label: "My Dream 25 (existing network)", placeholder: "List 25 people from your network who fit your ICP. Former colleagues, LinkedIn connections, friends-of-friends. These get personal outreach in Week 1.", type: "textarea" },
        { id: "icp50", label: "50 ICP Contacts from Communities", placeholder: "After Dream 25, identify 50 people from communities (Reddit, Slack, LinkedIn groups, Discord) who match your ICP. These get community-based outreach.", type: "textarea" },
        { id: "signals", label: "Buyer Signal Criteria", placeholder: "How do you recognize a buyer? e.g., They post about [problem], they've tried [solution] and failed, they've asked for recommendations for [category]", type: "text" }
      ]
    },
    {
      id: "how",
      title: "HOW — 100% Manual Outreach",
      fields: [
        { id: "primary", label: "Primary: Personal Direct Outreach", placeholder: "Personal emails and DMs to Dream 25. No templates. Customize every message to reference something specific about the person.", type: "textarea" },
        { id: "secondary", label: "Secondary: Community Participation", placeholder: "Name 2-3 communities where your ICP hangs out. Your strategy: answer questions, add value, start conversations — not pitch.", type: "textarea" },
        { id: "tertiary", label: "Tertiary: LinkedIn Content + Engagement", placeholder: "1-2 posts per week sharing your learning journey and insights. Comment thoughtfully on ICP's posts. No automation.", type: "text" }
      ]
    },
    {
      id: "what",
      title: "WHAT — The Conversation Starter",
      fields: [
        { id: "frame", label: "Conversation Framing (NOT a pitch)", placeholder: "e.g., 'I'm building [X] to solve [Y]. I've been talking to people like you to understand the problem better. Would you be open to a 15-minute conversation?'", type: "textarea" },
        { id: "variant1", label: "Warm Network Variant (more personal)", placeholder: "For Dream 25: Reference your connection, their work, something specific. 3-4 sentences max.", type: "textarea" },
        { id: "variant2", label: "Community Variant (slightly colder)", placeholder: "For community contacts: Reference their post/comment, acknowledge their expertise, ask for perspective. 4-5 sentences max.", type: "textarea" }
      ]
    },
    {
      id: "measured",
      title: "MEASURED — Learning Velocity, Not Revenue",
      fields: [
        { id: "leading", label: "Leading Metrics (weekly)", placeholder: "Conversations initiated: 5-10/week\nConversations held: 3-5/week\n'Would you pay for this?' responses: track every positive signal", type: "textarea" },
        { id: "lagging", label: "Lagging Metrics (monthly)", placeholder: "Total conversations held\nPeople who expressed genuine buying interest\nFirst paying customers\nPrimary objections learned", type: "textarea" }
      ]
    },
    {
      id: "commitment",
      title: "COMMITMENT — 90 Days of Daily Outreach",
      fields: [
        { id: "daily", label: "Daily Commitment (weekdays)", placeholder: "Send 3-5 personal, customized outreach messages every weekday. No days off. No 'I'll double up tomorrow.' 3-5 messages, 5 days, 90 days.", type: "text" },
        { id: "weekly", label: "Weekly Commitment", placeholder: "Hold 3-5 customer conversations. Participate in 1-2 community discussions. Review what you learned and adjust your conversation approach.", type: "text" },
        { id: "targets", label: "90-Day Totals", placeholder: "Messages sent: 270-450 (3-5/day × 5 days × 18 weeks)\nConversations held: 54-90 (at 20-30% response rate)\nFirst customers: 4-9 (at 10% conversion from conversation)", type: "textarea" }
      ]
    }
  ]}
/>

## The Dream 25 Framework

Seventy percent of first B2B customers come from the founder's existing network. Not from cold outreach. Not from ads. Not from viral content. From people who already know you.

This is the most underutilized asset in your entire business.

<ExampleCard label="Case Study: The Wrong Kind of Cold">
Alex spent three months setting up cold email sequences. Apollo account, custom domain warmed, 5-email sequences, 200 prospects per week. His reply rate: 1.2%.

Meanwhile, his cofounder Sarah spent the first month reaching out personally to 30 former colleagues and LinkedIn connections who fit their ICP. Her reply rate: 47%. Her conversation rate: 31%. Their first 8 customers all came from Sarah's warm network.

"Cold email works," Alex now says. "But it's a tool for scaling, not a tool for starting. We should have done the warm network first."
</ExampleCard>

The Dream 25 list has three criteria:

<SlideNavigation>
<Slide title="Criterion 1: They Fit Your ICP">

They match your ideal customer profile from Course 1. Title, company type, company size, pain point — at least 3 of 4 criteria.

Don't include people just because you like them. Your college roommate who works in a completely unrelated field doesn't belong on this list. Your former manager who runs the exact type of company you're targeting does.

Quality over quantity. 25 near-perfect matches outperform 100 mediocre ones.

</Slide>
<Slide title="Criterion 2: You Have Some Connection">

First-degree LinkedIn connections. Former colleagues. Friends-of-friends where you have a mutual connection who can introduce you. People you've interacted with in communities, at events, or online.

You don't need to be close friends. But there should be *something* that makes "Hi, I'm reaching out because..." feel natural rather than cold. Even "we're both in [LinkedIn group]" is enough of a hook.

</Slide>
<Slide title="Criterion 3: They're Reachable">

You have their email, LinkedIn profile, or Twitter/X handle. Or you can get a warm introduction from a mutual connection.

The Dream 25 doesn't include "the CEO of Company X that I've never interacted with." That's cold outreach with a fancy name. The Dream 25 is warm outreach to people you can legitimately contact.

</Slide>
</SlideNavigation>

## The Conversation Starter Message

The single biggest mistake at the zero stage: pitching instead of learning.

When you send a pitch, you're asking for money. When you start a learning conversation, you're asking for wisdom. Wisdom requests have 3-5x higher response rates than money requests.

<ComparisonBuilder
  title="Conversation Starter vs. Pitch"
  persistKey="playbook-L2-compare"
  prompt="Write your conversation starter message for someone from your Dream 25 list"
  expertExample="Hi [Name], I noticed you've been at [Company] for a few years now — I remember following your work when you were at [Previous Company] and thinking you were building something interesting.

I'm working on a project to help [ICP description] solve [specific problem you saw them mention or that's common in their role]. I've been talking to about a dozen people in your position to understand how they're handling this today before I build anything.

Would you be open to a 15-minute call? I'd love to understand your perspective — no pitch, I'm genuinely still in research mode. [Specific time slot], or whenever works for you."
  criteria={["Acknowledges a genuine personal connection", "States what you're building and who it helps", "Explicitly positions as research/learning, not sales", "Specific, low-commitment ask (15 minutes)", "No features, no pricing, no 'revolutionary platform'"]}
/>

## Learning vs. Selling at Zero

A critical distinction that changes how your conversations feel:

<StrategyDuel
  title="Two Approaches to First Conversations"
  persistKey="playbook-L2-duel"
  scenario="You're talking to your 5th potential customer. They're engaged and asking good questions. How do you run this conversation?"
  strategyA={{
    name: "The Sales Mode",
    description: "Present your solution, handle objections, try to close",
    pros: ["Efficient if they're ready to buy", "Moves toward revenue faster", "Tests your pitch"],
    cons: ["Kills the conversation if they sense pressure", "Prevents you from learning what they actually want", "Low close rates at zero proof"]
  }}
  strategyB={{
    name: "The Learning Mode",
    description: "Ask about their current process, pain, attempts, budget — then share what you're building",
    pros: ["Reveals what to actually build", "Builds trust before pitch", "Produces insights you can't get from data", "Closes naturally if fit exists"],
    cons: ["Slower path to revenue", "Requires comfort with ambiguity", "Some people expect a pitch"]
  }}
  expertVerdict="At zero customers, always default to Learning Mode. The information you gather in 50 learning conversations is worth more than 3 early closes to the wrong customers. Learning conversations often turn into sales anyway — when you understand their problem deeply and then describe your solution, it closes itself. The pitch approach at zero just produces premature closes to customers who churn."
/>

## The Math Behind the Commitment

Here's why the daily outreach commitment works, even when it feels like nothing is happening:

<ScenarioSimulator
  title="90-Day Starting from Zero Math"
  persistKey="playbook-L2-sim"
  levers={[
    { id: "dailyMessages", label: "Daily outreach messages (weekdays)", min: 1, max: 10, step: 1, defaultValue: 4 },
    { id: "responseRate", label: "Response rate (%)", min: 5, max: 50, step: 5, defaultValue: 25 },
    { id: "conversionRate", label: "Conversation-to-customer rate (%)", min: 5, max: 30, step: 5, defaultValue: 10 }
  ]}
  outputs={[
    { id: "totalMessages", label: "Total messages in 90 days", formula: "dailyMessages * 5 * 18", unit: " messages", precision: 0 },
    { id: "conversations", label: "Conversations held", formula: "totalMessages * responseRate / 100", unit: " conversations", precision: 0 },
    { id: "customers", label: "Estimated first customers", formula: "conversations * conversionRate / 100", unit: " customers", precision: 0 }
  ]}
  insight="At these activity levels, you can expect approximately `{customers}` first customers from `{conversations}` conversations over 90 days. Most founders underestimate how many conversations it takes — and overestimate how quickly conversations happen without consistent daily outreach."
/>

## Community Participation Without Pitching

Your secondary channel at zero is community participation. But there's a fatal mistake hiding here: using communities as a broadcast channel.

<DecisionTree
  title="Community Participation Decision Framework"
  persistKey="playbook-L2-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "You see a post in a Slack community where someone asks: 'Has anyone found a good way to handle [problem your product solves]?'",
      choices: [
        { label: "Reply with: 'Yes! Check out my product [link]'", nextNodeId: "pitch" },
        { label: "Reply with a genuinely helpful answer, then mention you're working on this space", nextNodeId: "helpful" },
        { label: "DM them privately after writing a helpful public reply", nextNodeId: "dm" }
      ]
    },
    {
      id: "pitch",
      content: "❌ Wrong. This is spam. Community members see through it immediately. You'll get ignored or banned, and you'll burn your reputation with everyone who sees it.",
      isTerminal: true,
      outcome: "negative"
    },
    {
      id: "helpful",
      content: "✅ Better. A helpful public reply builds your reputation. Mentioning you're 'working on something in this space' is honest positioning that invites curiosity without pitching.",
      choices: [
        { label: "Leave it there and see if they respond", nextNodeId: "wait" },
        { label: "End the reply with: 'Would love to hear more about your situation — would a quick chat be useful?'", nextNodeId: "cta" }
      ]
    },
    {
      id: "dm",
      content: "✅ Even better. Help publicly (builds reputation), then DM privately ('I wrote a longer answer but didn't want to hijack the thread — can I share it?'). Private conversations convert 3-5x better than public ones.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "wait",
      content: "✅ Acceptable. Some people will reach out. But you're leaving conversion to chance. A gentle CTA at the end dramatically increases conversation rates.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "cta",
      content: "✅ Best public approach. You've provided value, established credibility, and made a specific low-commitment ask. This is the optimal community sequence.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

## Your Zero-to-Ten Tracking System

At zero customers, your CRM is a spreadsheet. Don't overcomplicate this. You need to track:

<InsightCard icon="📋" title="The Minimal Tracking System">
At zero customers, track: (1) Name and contact info, (2) Where you found them, (3) Date of last contact, (4) Conversation status, (5) Key insight from the conversation, (6) Buying signal strength (1-5).

That's it. Six columns in a Google Sheet. When you have 10 customers and 50 warm conversations tracked, you'll upgrade to a real CRM (Course 40). Until then, don't let CRM setup become a distraction from actual outreach.
</InsightCard>

## Conversation Debrief Ritual

After every learning conversation, spend 5 minutes writing down:

<InteractiveChecklist
  title="Post-Conversation Debrief (do this after every call)"
  persistKey="playbook-L2-debrief"
  items={[
    "The exact words they used to describe their problem (quote them directly)",
    "What they're currently doing to solve it (their workaround)",
    "What they've already tried that didn't work",
    "How much time or money this problem costs them",
    "Their buying signal strength: 1 (just curious) to 5 (ready to pay now)",
    "One thing that surprised you about the conversation",
    "What you'll do differently in the next conversation"
  ]}
/>

After 20 conversations, look for patterns. What exact words do multiple people use? What failed solutions come up repeatedly? What would make them switch from their current workaround? This is your messaging research — worth more than any copywriting course.

## The Hardest Part: Showing Up Every Day

Consistency is the variable that separates founders who get their first 10 customers from founders who don't. Not strategy. Not messaging. Not channel selection.

Every weekday. Three to five personal messages. No exceptions.

<ExampleCard label="The 90-Day Proof">
Sarah, an executive coach, committed to 4 personal outreach messages every weekday for 90 days. She used this exact playbook.

- Week 1: 20 messages. 4 responses. 2 conversations. 0 clients.
- Week 4: 80 total messages. 22 responses. 14 conversations. 1 client signed.
- Week 8: 160 total messages. 45 conversations. 3 clients signed.
- Week 12: 240 total messages. 72 conversations. 6 clients signed.

"The thing about daily outreach," she says, "is that nothing happens for the first two weeks and you want to quit. But at Week 4, you suddenly have 4 conversations in one day and it feels like things exploded out of nowhere. It didn't explode — it compounded."
</ExampleCard>

<InteractiveChecklist
  title="Your Action Items This Week"
  persistKey="playbook-L2-actions"
  items={[
    "Complete the Starting from Zero Playbook template above",
    "Build your Dream 25 list in a Google Sheet with name, connection type, and ICP fit score",
    "Write your warm network conversation starter (use the ComparisonBuilder above as a guide)",
    "Write your community conversation starter for a colder context",
    "Identify 2-3 communities where your ICP is active and join them",
    "Send your first 5 Dream 25 messages this week",
    "Set up your 6-column tracking spreadsheet"
  ]}
/>

## What's Next

In **Lesson 3**, you'll get the B2B SaaS Founder playbook — designed for founders who have an MVP and initial validation, and need to build a repeatable outbound engine. Even if you're still at zero, read it to understand where you're headed.

The shift from zero to systematic happens faster than you think when you execute the zero playbook consistently. Most founders who do 4 outreach messages per day for 60 days have their first customer before Day 60 ends.
