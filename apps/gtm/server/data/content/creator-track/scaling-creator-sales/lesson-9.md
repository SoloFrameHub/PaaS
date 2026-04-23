---
title: "Systems and SOPs for Sales Teams"
duration: "50 min"
track: "Creator Economy"
course: "Course 27: Scaling Creator Sales"
lesson: 9
---

# Systems and SOPs for Sales Teams

A solo creator can keep their sales process in their head. A team cannot. The moment you have two or more people involved in selling, everything that was intuitive for you must become documented, trackable, and repeatable. This is not bureaucracy -- it is the infrastructure that turns a group of talented individuals into a machine that consistently generates revenue.

This lesson covers the operational systems that make a sales team function.

<InsightCard icon="⚙️" title="The System Paradox">
The more you systematize, the more creative freedom your team has. Systems don't constrain talent — they free it by eliminating decision fatigue on routine tasks.
</InsightCard>

---

## CRM Setup for Teams

Your CRM (Customer Relationship Management tool) is the central nervous system of your sales operation. When you were solo, maybe you tracked deals in a spreadsheet or your head. With a team, a proper CRM is non-negotiable.

### What Your CRM Must Do

At minimum, your CRM needs to:

1. **Track every lead** from first touch to closed deal (or disqualification)
2. **Assign leads** to specific setters and closers
3. **Log every interaction** -- calls, emails, DMs, notes
4. **Automate follow-up sequences** -- reminders, drip emails, no-show recovery
5. **Report on key metrics** -- by person, by time period, by lead source

### Recommended Tools for Creator Businesses

**For teams of 1-3 sales people:**
- **GoHighLevel (GHL)**: Built for agencies and coaches. Includes CRM, pipeline management, automation, call tracking, and funnel building in one platform. $97-$297/month.
- **Close.com**: Excellent calling and email features built into the CRM. Clean interface. $59-$149/month per user.

**For growing teams of 4+:**
- **HubSpot Sales Hub**: Robust reporting and automation. Free tier available, paid tiers at $50-$120/month per user.
- **Pipedrive**: Visual pipeline management that sales teams love. $15-$99/month per user.

The best CRM is the one your team actually uses. A $300/month tool with 100% adoption beats a $50/month tool that your closer avoids because the interface frustrates them.

<SwipeDecision
  title="CRM Selection: Right or Wrong?"
  description="Swipe right for good CRM decisions, left for common mistakes"
  optionA="Wrong Move"
  optionB="Smart Choice"
  persistKey="scaling-creator-sales-L9-crm-swipe"
  cards={[
    { id: "1", content: "Choose the CRM with the most features, even if your team finds it overwhelming", correctOption: "a", explanation: "Feature bloat kills adoption. Pick the tool your team will actually use daily." },
    { id: "2", content: "Start with a free tier and upgrade as your team grows", correctOption: "b", explanation: "This lets you test fit before committing budget, and most free tiers handle 1-3 users well." },
    { id: "3", content: "Let each closer use their preferred tool to maximize comfort", correctOption: "a", explanation: "Fragmented data makes reporting impossible. One CRM for the whole team, non-negotiable." },
    { id: "4", content: "Choose a CRM that integrates with your existing calendar and email tools", correctOption: "b", explanation: "Integration reduces manual data entry and increases adoption." }
  ]}
/>

### Pipeline Stages

Configure your CRM with these standard pipeline stages:

| Stage | Owner | Definition |
|-------|-------|------------|
| New Lead | System | Lead entered the system (form fill, DM, etc.) |
| Contacted | Setter | Setter has made first contact |
| Qualified | Setter | Lead meets ICP criteria, call booked |
| Appointment Set | Setter | Call confirmed on closer's calendar |
| Showed | Closer | Prospect attended the call |
| Proposal Made | Closer | Offer presented, prospect considering |
| Closed Won | Closer | Deal closed, payment collected |
| Closed Lost | Closer | Prospect declined, with reason logged |
| No Show | Setter | Prospect did not attend, requires follow-up |
| Nurture | Setter | Not ready now, long-term follow-up sequence |

Every lead must live in exactly one stage at all times. The pipeline becomes meaningless if leads get stuck in limbo or are not updated after calls.

---

## Call Recording and Review Processes

Call recording is the single most valuable operational tool in a sales organization. It is how you train, troubleshoot, and improve. If your closers are not recording every call, you are flying blind.

### Recording Setup

Use your CRM's built-in recording feature or a dedicated tool:
- **Zoom** (with cloud recording enabled): Works for video calls
- **Dialpad or Aircall**: For phone-based calls with automatic recording
- **Otter.ai or Fathom**: Transcription services that join calls automatically

**Legal note**: Depending on your jurisdiction, you may need to inform the prospect that the call is being recorded. Most creators handle this by having the closer say at the start: "Just a heads up, we record our calls for quality and training purposes. Is that okay with you?" This is both legally compliant in most jurisdictions and actually builds trust -- it signals professionalism.

### The Call Review Framework

You cannot review every call once your team grows. Here is a prioritized review system:

**Review every call during**: The first 30 days of a new closer's tenure. No exceptions. This is your highest-leverage training period.

**After the ramp period, review:**
- 1-2 calls per week per closer (random selection)
- Every lost deal above a certain value threshold (e.g., deals worth $5K+)
- Any call flagged by the closer as unusual or difficult
- Any call where the prospect gave negative feedback

### The Call Scorecard

Score reviewed calls on a consistent rubric:

| Dimension | 1-5 Score | Notes |
|-----------|-----------|-------|
| Opening and rapport | | Did they build connection in the first 3 minutes? |
| Discovery depth | | Did they uncover real pain, or stay surface-level? |
| Offer presentation | | Was it clear, benefit-driven, and matched to the prospect's stated needs? |
| Objection handling | | Did they address concerns empathetically and effectively? |
| Close | | Did they ask for the commitment confidently? |
| Brand alignment | | Did it sound consistent with our brand voice? |
| Compliance | | Did they follow the script and process? |

Share the scorecard with the closer in your weekly one-on-one. Focus on patterns, not individual incidents. If their discovery depth scores a 2 three weeks in a row, that is a coaching priority.

<LinterFeedback
  title="Call Review Linter: Score a Sales Call"
  persistKey="scaling-creator-sales-L9-call-linter"
  inputLabel="Paste notes or transcript from a recent sales call"
  rules={[
    { id: "rapport", label: "Rapport Building", description: "Opening includes personal connection or reference", keywords: ["noticed", "saw that", "congrats on", "I read"], antiKeywords: ["let's get started", "jumping right in"] },
    { id: "discovery", label: "Discovery Questions", description: "Asks about current situation and pain points", keywords: ["what's", "how are you", "tell me about", "what happens when"], antiKeywords: ["our solution", "we offer"] },
    { id: "pain", label: "Pain Identification", description: "Uncovers specific, measurable pain", keywords: ["costing you", "losing", "missing out", "frustrated"], antiKeywords: [] },
    { id: "offer", label: "Tailored Offer", description: "Connects solution to stated pain", keywords: ["based on what you said", "for your situation", "specifically"], antiKeywords: ["everyone", "all our clients"] },
    { id: "close", label: "Clear Ask", description: "Ends with specific commitment request", keywords: ["ready to", "let's get you started", "which option"], antiKeywords: ["think about it", "let me know"] }
  ]}
/>

---

## Pipeline Management

A well-managed pipeline tells you exactly where your revenue is coming from, where it is getting stuck, and what needs to happen next.

### The Weekly Pipeline Review

Every Monday morning, the sales team reviews the pipeline together. This meeting should be 30 minutes or less and follow a fixed format:

**1. Numbers check (5 minutes)**: How many leads entered last week? How many calls were booked? How many calls happened? How many deals closed?

**2. Stuck deals (10 minutes)**: Which prospects have been in the "Proposal Made" stage for more than 7 days? What is the plan for each?

**3. This week's calendar (10 minutes)**: How many calls are booked this week? Are there any high-value opportunities that need special preparation?

**4. Process issues (5 minutes)**: Did anything break last week? Are there lead source issues, tech problems, or process bottlenecks to address?

<SlideNavigation>
<Slide title="Numbers Check (5 min)">

**What to review:**
- Total leads entered last week
- Calls booked by each setter
- Calls completed (show rate)
- Deals closed and revenue

**Red flags:**
- Lead volume down >20% week-over-week
- Show rate below 70%
- Zero closes from a closer who had 5+ calls

</Slide>
<Slide title="Stuck Deals (10 min)">

**Focus on:**
- Any deal in "Proposal Made" for 7+ days
- Any deal in "Qualified" for 14+ days

**For each stuck deal, ask:**
- What's the blocker?
- What's the next action?
- Who owns it?
- When will it happen?

</Slide>
<Slide title="This Week's Calendar (10 min)">

**Review:**
- Total calls booked this week
- High-value opportunities (>$5K deals)
- Any calls needing special prep

**Assign:**
- Who's doing pre-call research for VIP prospects
- Any team members shadowing calls for training

</Slide>
<Slide title="Process Issues (5 min)">

**Surface problems:**
- Tech issues (CRM bugs, recording failures)
- Lead quality concerns
- Bottlenecks in handoffs

**Assign owners and deadlines** for each issue.

</Slide>
</SlideNavigation>

### Pipeline Health Metrics

Track these metrics weekly:

- **Lead-to-Booking Rate**: What percentage of new leads get booked on a call? Target: 30-50%.
- **Show Rate**: What percentage of booked calls actually happen? Target: 75-85%.
- **Close Rate**: What percentage of shown calls result in a sale? Target: 25-40% (varies by offer price).
- **Average Days to Close**: How long from first contact to closed deal? Creator economy norm: 3-14 days.
- **Pipeline Value**: Total potential revenue in active pipeline stages. This is your leading indicator -- it tells you what revenue looks like 2-4 weeks from now.

<ScenarioSimulator
  title="Pipeline Health Calculator"
  persistKey="scaling-creator-sales-L9-pipeline-sim"
  levers={[
    { id: "leads", label: "New leads per week", min: 10, max: 200, step: 10, defaultValue: 50 },
    { id: "bookingRate", label: "Lead-to-booking rate (%)", min: 10, max: 60, step: 5, defaultValue: 35 },
    { id: "showRate", label: "Show rate (%)", min: 50, max: 95, step: 5, defaultValue: 80 },
    { id: "closeRate", label: "Close rate (%)", min: 10, max: 50, step: 5, defaultValue: 30 },
    { id: "avgDeal", label: "Average deal value ($)", min: 500, max: 10000, step: 500, defaultValue: 2000 }
  ]}
  outputs={[
    { id: "bookings", label: "Calls booked/week", formula: "(leads * (bookingRate / 100))", unit: "", precision: 0 },
    { id: "shows", label: "Calls shown/week", formula: "(leads * (bookingRate / 100) * (showRate / 100))", unit: "", precision: 0 },
    { id: "closes", label: "Deals closed/week", formula: "(leads * (bookingRate / 100) * (showRate / 100) * (closeRate / 100))", unit: "", precision: 1 },
    { id: "revenue", label: "Weekly revenue", formula: "(leads * (bookingRate / 100) * (showRate / 100) * (closeRate / 100) * avgDeal)", unit: "$", precision: 0 }
  ]}
  insight="At {closes} closes per week, you're generating ${revenue} weekly or roughly ${revenue * 4.3} monthly. Your biggest leverage point: improving {showRate < 75 ? 'show rate' : closeRate < 25 ? 'close rate' : bookingRate < 30 ? 'booking rate' : 'average deal value'}."
/>

---

## Daily Standups

For teams of 2+ salespeople, a brief daily standup keeps everyone aligned and accountable. This is not a meeting -- it is a 10-minute check-in.

### The Standup Format

Each person answers three questions:

1. **What did I close/advance yesterday?** (results)
2. **What am I focused on today?** (priorities)
3. **Is anything blocking me?** (obstacles)

Run the standup at the same time every day. Standing up (literally, if in person) keeps it brief. For remote teams, do it via Slack or a shared thread -- even faster.

### What Daily Standups Prevent

- **Lead neglect**: If a closer mentions they have 3 proposals outstanding and zero follow-ups planned, you catch it immediately.
- **Isolation**: Sales can be lonely, especially remote. The daily touchpoint creates team cohesion.
- **Sandbagging**: Some closers hide deals in their pipeline to "surprise" you with a big week. Daily visibility makes the pipeline transparent.

---

## Performance Dashboards

Your sales team should never have to ask "how am I doing?" The data should be visible, real-time, and shared.

### The Essential Dashboard

Build a dashboard (in your CRM, a Google Sheet, or a tool like Databox) that shows:

**For each closer:**
- Calls taken this week/month
- Close rate (rolling 30 days)
- Revenue closed this week/month
- Average deal value
- Refund rate (rolling 30 days)

**For each setter:**
- Leads contacted this week/month
- Bookings set this week/month
- Show rate (rolling 30 days)
- Average qualification score

**For the team overall:**
- Total pipeline value
- Revenue closed vs. target
- Lead flow by source
- Overall conversion funnel (lead → booking → show → close)

### Making Dashboards Work

Three rules for effective sales dashboards:

1. **Update in real-time or daily.** A dashboard that is updated weekly is a report, not a tool. Real-time data from your CRM integration is ideal. At worst, update every morning before the standup.

2. **Keep it visible.** Pin it in your team Slack channel. Make it the first thing discussed in standups. If the dashboard is buried in a spreadsheet no one opens, it serves no purpose.

3. **Act on the data.** A dashboard is useless if no one changes behavior based on what it shows. If close rate drops for two consecutive weeks, that triggers a coaching conversation. If show rate drops, that triggers a setter process review. Data without action is decoration.

<ClassifyExercise
  title="Dashboard Red Flags: Classify the Issue"
  persistKey="scaling-creator-sales-L9-classify"
  categories={[
    { id: "setter", label: "Setter Issue", color: "#3b82f6" },
    { id: "closer", label: "Closer Issue", color: "#8b5cf6" },
    { id: "system", label: "System/Process Issue", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Lead-to-booking rate dropped from 40% to 22% in two weeks", correctCategory: "setter" },
    { id: "2", content: "Show rate is 85% but close rate dropped from 35% to 18%", correctCategory: "closer" },
    { id: "3", content: "Pipeline value is growing but no deals are closing", correctCategory: "closer" },
    { id: "4", content: "Lead volume dropped 60% week-over-week", correctCategory: "system" },
    { id: "5", content: "Three different closers all have 50%+ no-show rates", correctCategory: "setter" },
    { id: "6", content: "CRM shows 20 deals in 'Proposal Made' for 14+ days", correctCategory: "closer" }
  ]}
/>

---

## Documenting SOPs

Standard Operating Procedures (SOPs) are the written playbooks that let your team operate consistently without asking you how to handle every situation.

### The Five Essential Sales SOPs

1. **Lead Response SOP**: How quickly to respond, what to say in the first message, when to escalate to a phone call, how to log the interaction.

2. **Qualification SOP**: The exact questions to ask, the criteria that qualify or disqualify a prospect, how to handle edge cases, when to escalate to a senior team member.

3. **No-Show Recovery SOP**: What to do when a prospect misses a call -- the exact sequence of follow-ups (text, email, call), timing between attempts, and when to move the lead to nurture.

4. **Objection Handling SOP**: The 5-10 most common objections with word-for-word response frameworks. Not rigid scripts, but flexible templates the closer can adapt.

5. **Post-Close SOP**: What happens after a deal closes -- payment processing, onboarding handoff, CRM updates, and follow-up sequences.

### How to Write SOPs That Get Used

- Keep them short. One page per SOP. If it is longer, split it.
- Use bullet points and numbered steps, not paragraphs.
- Include screenshots and examples where possible.
- Store them in a shared, searchable location (Google Drive, Notion, your CRM's documents section).
- Review and update quarterly. An outdated SOP is worse than no SOP because it teaches the wrong process.

<TemplateBuilder
  title="Build Your No-Show Recovery SOP"
  persistKey="scaling-creator-sales-L9-sop-template"
  sections={[
    {
      id: "immediate",
      title: "Immediate Response (Within 5 Minutes)",
      fields: [
        { id: "text", label: "Text Message Template", placeholder: "e.g., Hey [Name], just tried calling for our 2pm. Everything okay? I have 10 min now if you're available.", type: "textarea" },
        { id: "email", label: "Email Subject Line", placeholder: "e.g., Missed you on our call — reschedule?", type: "text" }
      ]
    },
    {
      id: "followup1",
      title: "Follow-Up #1 (2 Hours Later)",
      fields: [
        { id: "channel", label: "Channel to Use", placeholder: "e.g., Email or DM", type: "text" },
        { id: "message", label: "Message Template", placeholder: "e.g., No worries if today didn't work. I have slots tomorrow at 10am and 3pm — which works better?", type: "textarea" }
      ]
    },
    {
      id: "followup2",
      title: "Follow-Up #2 (Next Day)",
      fields: [
        { id: "channel", label: "Channel to Use", placeholder: "e.g., Phone call", type: "text" },
        { id: "voicemail", label: "Voicemail Script", placeholder: "e.g., Hey [Name], [Your Name] here. Wanted to make sure we connect this week. Call me back at [number] or book directly at [link].", type: "textarea" }
      ]
    },
    {
      id: "final",
      title: "Final Attempt (3 Days After No-Show)",
      fields: [
        { id: "breakup", label: "Breakup Email Template", placeholder: "e.g., Hey [Name], haven't heard back so I'm assuming now's not the right time. I'll move you to our nurture list. Reply if you want to reconnect.", type: "textarea" },
        { id: "crmAction", label: "CRM Action", placeholder: "e.g., Move to 'Nurture' stage, tag with 'No-Show-Unresponsive'", type: "text" }
      ]
    }
  ]}
/>

<InteractiveChecklist 
  title="Your Systems Implementation Checklist" 
  persistKey="scaling-creator-sales-L9-actions" 
  items={[
    "Choose and set up a CRM with all 10 pipeline stages configured",
    "Enable call recording on your primary sales tool (Zoom, Dialpad, etc.)",
    "Create the 7-dimension call scorecard template",
    "Schedule your first weekly pipeline review (30 min, Mondays)",
    "Set up daily standup time (10 min, same time daily)",
    "Build your essential dashboard with closer, setter, and team metrics",
    "Document your No-Show Recovery SOP using the template above",
    "Write your Lead Response SOP (response time, first message, logging)"
  ]} 
/>

---

## Lesson Summary

- A CRM (GoHighLevel, Close.com, HubSpot, or Pipedrive) is non-negotiable for team-based sales -- track every lead from first touch to close
- Configure 10 pipeline stages from New Lead through Closed Won/Lost and Nurture
- Record every call; review all calls during ramp-up, then 1-2 random calls per closer per week
- Use a call scorecard with seven dimensions for consistent coaching feedback
- Run weekly pipeline reviews (30 min) and daily standups (10 min) to maintain visibility and accountability
- Build real-time dashboards showing individual and team metrics; act on the data
- Document five essential SOPs: lead response, qualification, no-show recovery, objection handling, and post-close