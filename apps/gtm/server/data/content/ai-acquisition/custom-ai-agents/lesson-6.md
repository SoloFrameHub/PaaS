---
title: "Agent 4: Meeting Prep Agent"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 6
---

# Agent 4: Meeting Prep Agent

## The 30-Minute Panic

You're 5 minutes from a discovery call. You open your CRM. The prospect's name is there. Their company. An email address. That's it.

You scramble to LinkedIn. Scan their profile. Google the company. Check if they've posted anything recently. You're piecing together context while your calendar reminder pings again. **2 minutes.**

You join the call half-prepared, asking generic questions, missing the fact that they just raised Series A last week — the perfect hook for your conversation.

**This happens to every solo founder.** You're juggling 5-10 calls per week, each requiring 15-30 minutes of prep to be effective. That's 2-4 hours of research time you don't have.

The Meeting Prep Agent solves this: **30 minutes before every scheduled call, it generates a 1-page brief** with everything you need — refreshed prospect data, talking points tied to their pain signals, discovery questions, objection prep, and relevant proof points.

You walk into every meeting like you've been tracking them for weeks.

<InsightCard icon="🎯" title="The Real Win">
It's not just time saved. It's **confidence**. When you reference their recent LinkedIn post or their company's Q3 hiring spike in the first 60 seconds, you signal: "I did my homework. This isn't spam."
</InsightCard>

---

## What This Agent Does (And Doesn't Do)

<FlipCard 
  front="Meeting Prep Agent: Core Function" 
  back="Automatically generates a 1-page meeting brief 30 minutes before each scheduled call, pulling fresh data from CRM, calendar, email threads, and live sources (LinkedIn, news)." 
/>

### The Agent's Job

**Input:** Calendar event (30 min warning) + CRM record + email thread + fresh web data

**Output:** 1-page prep document with:
1. **Quick Refresh** — Key facts from the original research brief (Agent 1)
2. **Meeting Objective** — What you want to achieve (discovery, demo, close, etc.)
3. **Talking Points** — 3-5 bullets tied to their specific pain signals
4. **Discovery Questions** — 5-7 questions to ask, ordered by priority
5. **Objection Prep** — Top 2-3 likely objections with LARA-based responses
6. **Relevant Proof** — Case study or testimonial to reference

**Delivery:** Slack DM, email, or CRM dashboard — 30 minutes before the call

<RangeSlider 
  label="How often do you walk into calls unprepared?" 
  min={1} 
  max={10} 
  lowLabel="Never" 
  highLabel="Every time" 
  persistKey="custom-ai-agents-L6-prep-frequency" 
/>

### What It Doesn't Do

- **It doesn't join the call.** You're still the human running the conversation.
- **It doesn't make decisions.** It surfaces options; you choose the approach.
- **It doesn't replace discovery skills.** It gives you better questions to ask, but you still need to listen and adapt (see Course 13).

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Think of this agent as a **pre-commit hook for sales calls**. It runs automatically before the "event" (the meeting), validates your context, and surfaces warnings (stale data, missing fields, new trigger events).
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches/Consultants">
This agent is your **session prep assistant**. It pulls together everything you'd manually review before a client call — their intake form, past session notes, recent activity — and structures it for quick review.
</ContextualNote>

---

## The Prep Document Template

Here's the exact structure the agent generates. You'll customize this in the build session.

<SlideNavigation>
<Slide title="Section 1: Quick Refresh">

### Quick Refresh (30 seconds to scan)

```
PROSPECT: Sarah Chen, VP of Marketing @ DataPulse
COMPANY: Series A SaaS, 45 employees, $3M ARR
LAST CONTACT: Email exchange 3 days ago (she asked about pricing)
ICP SCORE: 8/10 (high fit)
DEAL STAGE: Discovery scheduled
```

**Recent Activity:**
- Posted on LinkedIn 2 days ago about attribution challenges
- Company announced Series A ($8M) last week
- Hiring 3 marketing roles (signal: scaling team)

**Key Pain Signals:**
- Can't attribute revenue to content marketing
- Manual reporting takes 10+ hours/week
- Current tool (HubSpot) missing multi-touch attribution

This section is **auto-generated from CRM + fresh data sources**. The agent checks LinkedIn, Google News, and Crunchbase for updates since the original research brief.

</Slide>

<Slide title="Section 2: Meeting Objective">

### Meeting Objective

```
PRIMARY GOAL: Qualify fit and uncover budget/timeline
SECONDARY GOAL: Get commitment to technical demo next week
SUCCESS METRIC: Clear next step scheduled before call ends
```

The agent infers this from the deal stage in your CRM. You can override it manually if needed.

<ExampleCard label="Example: Different Objectives by Stage">
- **Discovery call:** Qualify fit, uncover pain depth, get demo commitment
- **Demo call:** Show specific feature solving their pain, handle objections, propose trial
- **Closing call:** Negotiate terms, address final concerns, get signature
</ExampleCard>

</Slide>

<Slide title="Section 3: Talking Points">

### Talking Points (Reference These Early)

```
1. "I saw your post about attribution challenges — that's exactly what we solve."
   → Ties to their recent LinkedIn activity

2. "Congrats on the Series A. Most companies at your stage hit the same reporting wall."
   → Acknowledges their growth stage, positions you as expert

3. "You mentioned HubSpot lacks multi-touch attribution. Our customers see that gap cost them 20-30% of their marketing budget."
   → Agitates the pain with a specific number

4. "With 3 marketing roles opening, you'll need automated reporting even more."
   → Ties to their hiring signal

5. "We helped a similar Series A company (Acme Corp) cut reporting time from 12 hours to 30 minutes per week."
   → Social proof, specific outcome
```

These are **AI-generated based on the research brief + fresh data**. The agent pulls from:
- Recent LinkedIn posts (pain signals)
- Company news (funding, hiring, launches)
- Email thread context (what they've already said)
- Your value proposition (from Course 2 artifact)

</Slide>

<Slide title="Section 4: Discovery Questions">

### Discovery Questions (Ask in This Order)

```
SITUATION (Understand current state):
1. "Walk me through your current reporting process — who's involved, how long does it take?"
2. "What tools are you using for attribution today?"

PROBLEM (Dig into pain):
3. "What's the biggest gap in your current setup?"
4. "How much time does your team spend on manual reporting each week?"

IMPLICATION (Explore cost of inaction):
5. "If this doesn't get solved in the next quarter, what happens?"
6. "How does the lack of attribution affect your budget decisions?"

NEED-PAYOFF (Get them to articulate value):
7. "If you could automate this, what would your team do with the extra 10 hours/week?"
```

This follows the **SPIN framework** (from Course 13). The agent orders questions by priority based on the deal stage and known pain signals.

</Slide>

<Slide title="Section 5: Objection Prep">

### Objection Prep (Top 3 Likely)

```
OBJECTION 1: "We're already using HubSpot."
LARA RESPONSE:
- Listen: "That makes sense — HubSpot is solid for a lot of things."
- Acknowledge: "The gap most teams hit is multi-touch attribution."
- Reframe: "Think of us as the layer that sits on top of HubSpot, filling that specific gap."
- Ask: "Does HubSpot currently show you which touchpoints drive revenue?"

OBJECTION 2: "We don't have budget right now."
LARA RESPONSE:
- Listen: "I get it — Series A is all about prioritization."
- Acknowledge: "The question is whether the cost of not solving this is higher than the tool cost."
- Reframe: "If manual reporting costs 10 hours/week at $75/hour, that's $3K/month in labor. Our tool is $500/month."
- Ask: "What's the threshold where this becomes a priority?"

OBJECTION 3: "Can we start with a free trial?"
LARA RESPONSE:
- Listen: "Absolutely — we offer a 14-day trial."
- Acknowledge: "The key is making sure you see value in those 14 days."
- Reframe: "Let's define what success looks like upfront, so you know if it's working."
- Ask: "What would you need to see in the trial to move forward?"
```

The agent **predicts objections based on deal stage, company size, and past patterns** in your CRM. It generates LARA-based responses (from Course 14).

</Slide>

<Slide title="Section 6: Relevant Proof">

### Relevant Proof (Reference During Call)

```
CASE STUDY: Acme Corp (Series A SaaS, 50 employees)
CHALLENGE: Spent 12 hours/week on manual attribution reporting
SOLUTION: Implemented our multi-touch attribution dashboard
OUTCOME: Reduced reporting time to 30 min/week, reallocated 2 team members to campaign work
QUOTE: "We finally know which channels actually drive revenue." — CMO

TESTIMONIAL: "DataPulse helped us prove marketing ROI to our board." — VP Marketing, SimilarCo
```

The agent **matches case studies to the prospect's profile** (company size, stage, industry, pain signal). It pulls from your case study library (stored in CRM or a doc).

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Prep Document Sections Checklist" 
  persistKey="custom-ai-agents-L6-sections" 
  items={[
    "Quick Refresh (prospect + company + recent activity)",
    "Meeting Objective (primary goal + success metric)",
    "Talking Points (3-5, tied to pain signals)",
    "Discovery Questions (5-7, SPIN-ordered)",
    "Objection Prep (top 2-3 with LARA responses)",
    "Relevant Proof (case study or testimonial)"
  ]} 
/>

---

## How the Agent Works (Architecture)

<InsightCard icon="⚙️" title="Trigger Logic">
The agent runs **30 minutes before a calendar event** tagged as "prospect call" or "discovery call." It checks your CRM for the attendee's email, pulls their record, and generates the brief.
</InsightCard>

### Step-by-Step Flow

```
[TRIGGER: Calendar event in 30 minutes]
    ↓
[1. Identify Prospect]
    - Extract attendee email from calendar event
    - Look up CRM record by email
    - If no match → send alert ("No CRM record for this meeting")
    ↓
[2. Gather Context]
    - Pull research brief (Agent 1 output)
    - Pull email thread (last 3-5 exchanges)
    - Pull deal stage, ICP score, last contact date
    ↓
[3. Refresh Data]
    - Check LinkedIn for new posts (last 7 days)
    - Check Google News for company mentions (last 30 days)
    - Check Crunchbase for funding/hiring updates
    ↓
[4. Generate Prep Document]
    - LLM call with structured prompt (see pseudocode below)
    - Output: 1-page markdown document
    ↓
[5. Deliver]
    - Send to Slack DM
    - OR email to your inbox
    - OR save to CRM dashboard
    ↓
[6. Post-Meeting Prompt]
    - After call ends, send Slack message: "How'd it go? Add notes?"
    - User replies → agent updates CRM deal stage + notes
```

<FlipCard 
  front="Why 30 Minutes Before?" 
  back="Too early (2 hours) and you forget the details. Too late (5 minutes) and you're rushed. 30 minutes gives you time to read, internalize, and adjust your approach." 
/>

### Data Sources (Inputs)

<ComparisonBuilder
  title="Your Meeting Prep Data Sources"
  persistKey="custom-ai-agents-L6-data-sources"
  prompt="List the data sources you'll connect to this agent"
  expertExample="CRM (HubSpot), Calendar (Google Calendar), Email (Gmail API), LinkedIn (manual paste or Evaboot), News (Google News API), Case Studies (Notion doc)"
  criteria={[
    "CRM system specified",
    "Calendar integration identified",
    "Fresh data sources included (LinkedIn, news)",
    "Case study/proof library location defined"
  ]}
/>

---

## Building Your Meeting Prep Agent

Now you'll spec out your own agent. This is the artifact you'll implement in Lesson 12's sprint.

<TemplateBuilder
  title="Meeting Prep Agent Specification"
  persistKey="custom-ai-agents-L6-spec"
  sections={[
    {
      id: "trigger",
      title: "Trigger Configuration",
      fields: [
        { 
          id: "timing", 
          label: "How many minutes before the meeting?", 
          placeholder: "e.g., 30 minutes", 
          type: "text" 
        },
        { 
          id: "event-filter", 
          label: "What calendar event keywords trigger this agent?", 
          placeholder: "e.g., 'discovery', 'demo', 'prospect call'", 
          type: "text" 
        },
        { 
          id: "delivery", 
          label: "Where should the prep doc be delivered?", 
          placeholder: "e.g., Slack DM, email, CRM dashboard", 
          type: "text" 
        }
      ]
    },
    {
      id: "data-sources",
      title: "Data Sources",
      fields: [
        { 
          id: "crm", 
          label: "CRM system", 
          placeholder: "e.g., HubSpot, Pipedrive, Airtable", 
          type: "text" 
        },
        { 
          id: "calendar", 
          label: "Calendar system", 
          placeholder: "e.g., Google Calendar, Outlook", 
          type: "text" 
        },
        { 
          id: "email", 
          label: "Email system (for thread context)", 
          placeholder: "e.g., Gmail, Outlook", 
          type: "text" 
        },
        { 
          id: "fresh-data", 
          label: "Fresh data sources", 
          placeholder: "e.g., LinkedIn, Google News, Crunchbase", 
          type: "textarea" 
        },
        { 
          id: "proof-library", 
          label: "Where are your case studies/testimonials stored?", 
          placeholder: "e.g., Notion doc, CRM custom field, Google Doc", 
          type: "text" 
        }
      ]
    },
    {
      id: "output-format",
      title: "Output Format Preferences",
      fields: [
        { 
          id: "sections", 
          label: "Which sections do you want in the prep doc?", 
          placeholder: "e.g., Quick Refresh, Talking Points, Discovery Questions, Objection Prep, Proof", 
          type: "textarea" 
        },
        { 
          id: "length", 
          label: "Max length (words or pages)?", 
          placeholder: "e.g., 1 page, 500 words", 
          type: "text" 
        },
        { 
          id: "tone", 
          label: "Tone/style preference", 
          placeholder: "e.g., concise bullets, conversational, technical", 
          type: "text" 
        }
      ]
    },
    {
      id: "customization",
      title: "Custom Rules",
      fields: [
        { 
          id: "disc-integration", 
          label: "Do you want DISC personality notes included? (yes/no)", 
          placeholder: "e.g., yes — if DISC type is in CRM", 
          type: "text" 
        },
        { 
          id: "objection-library", 
          label: "Do you have a custom objection library? Where?", 
          placeholder: "e.g., Notion doc with LARA responses", 
          type: "text" 
        },
        { 
          id: "special-instructions", 
          label: "Any other custom instructions?", 
          placeholder: "e.g., always include competitor comparison if known", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## The Prompt Template (Core Logic)

Here's the LLM prompt that powers the agent. You'll customize this based on your spec above.

```python
# Meeting Prep Agent Prompt Template

SYSTEM_PROMPT = """
You are a meeting prep assistant for a solo founder.
Your job: generate a concise, actionable 1-page brief for an upcoming sales call.

RULES:
1. Be specific — reference actual data from the prospect's record
2. Prioritize recent activity (last 7-30 days) over old data
3. Tie talking points to pain signals, not generic features
4. Order discovery questions by SPIN framework (Situation → Problem → Implication → Need-Payoff)
5. Generate LARA-based objection responses (Listen, Acknowledge, Reframe, Ask)
6. Match case studies to prospect profile (size, stage, industry, pain)
7. If data is missing, state "Not available" — do not hallucinate
8. Keep total output under 500 words
"""

USER_PROMPT = f"""
Generate a meeting prep document for this call:

CALENDAR EVENT:
- Title: {event.title}
- Time: {event.start_time}
- Attendees: {event.attendees}

PROSPECT RECORD (from CRM):
{crm_record}

RESEARCH BRIEF (from Agent 1):
{research_brief}

EMAIL THREAD (last 3 exchanges):
{email_thread}

FRESH DATA (last 7 days):
- LinkedIn: {linkedin_activity}
- News: {company_news}
- Crunchbase: {crunchbase_updates}

MEETING STAGE: {deal_stage}
ICP SCORE: {icp_score}/10

YOUR VALUE PROPOSITION:
{value_prop}

CASE STUDY LIBRARY:
{case_studies}

OUTPUT FORMAT:
1. Quick Refresh (key facts + recent activity)
2. Meeting Objective (primary goal + success metric)
3. Talking Points (3-5, tied to pain signals)
4. Discovery Questions (5-7, SPIN-ordered)
5. Objection Prep (top 2-3 with LARA responses)
6. Relevant Proof (1 case study or testimonial)

Generate the prep document now.
"""
```

<FlipCard 
  front="Why Include the Email Thread?" 
  back="Context from recent exchanges prevents you from asking questions they've already answered. It also surfaces objections they've raised, so you can prep responses." 
/>

### Pseudocode: Full Agent Flow

```python
# Agent 4: Meeting Prep Agent
# Trigger: Calendar event in 30 minutes

def meeting_prep_agent(event):
    # Step 1: Identify prospect
    attendee_email = extract_attendee_email(event)
    crm_record = crm.lookup_by_email(attendee_email)
    
    if not crm_record:
        notify_slack(f"⚠️ No CRM record for meeting: {event.title}")
        return
    
    # Step 2: Gather context
    research_brief = crm_record.get("research_brief")  # From Agent 1
    email_thread = fetch_email_thread(attendee_email, limit=5)
    deal_stage = crm_record.get("deal_stage")
    icp_score = crm_record.get("icp_score")
    
    # Step 3: Refresh data (check for updates since last research)
    linkedin_activity = get_linkedin_posts(crm_record.linkedin_url, days=7)
    company_news = search_news(crm_record.company, days=30)
    crunchbase_updates = check_crunchbase(crm_record.company)
    
    # Step 4: Load supporting data
    value_prop = load_value_proposition()  # From Course 2 artifact
    case_studies = load_case_studies()     # From your library
    
    # Step 5: Build prompt
    prompt = USER_PROMPT.format(
        event=event,
        crm_record=crm_record,
        research_brief=research_brief,
        email_thread=email_thread,
        linkedin_activity=linkedin_activity,
        company_news=company_news,
        crunchbase_updates=crunchbase_updates,
        deal_stage=deal_stage,
        icp_score=icp_score,
        value_prop=value_prop,
        case_studies=case_studies
    )
    
    # Step 6: Generate prep document
    prep_doc = call_llm(
        model="claude-sonnet-4",
        system=SYSTEM_PROMPT,
        prompt=prompt,
        max_tokens=1000,
        temperature=0.3  # Low temp for factual accuracy
    )
    
    # Step 7: Deliver
    send_to_slack(prep_doc)
    # OR: send_email(prep_doc)
    # OR: crm.update_contact(crm_record.id, {"meeting_prep": prep_doc})
    
    # Step 8: Schedule post-meeting follow-up
    schedule_message(
        time=event.end_time + 5_minutes,
        message=f"How'd the call with {crm_record.name} go? Reply with notes and I'll update the CRM.",
        channel="slack_dm"
    )
    
    return prep_doc
```

<InsightCard icon="💡" title="The Post-Meeting Hook">
The agent's job doesn't end when the call starts. After the meeting, it prompts you for notes. You reply in Slack: "Good call. Moving to demo stage. Objection: budget. Follow up in 3 days." The agent parses this and updates the CRM automatically.
</InsightCard>

---

## Token Economics & Cost

<ScenarioSimulator
  title="Meeting Prep Agent Cost Calculator"
  persistKey="custom-ai-agents-L6-cost-sim"
  levers={[
    { id: "meetings", label: "Meetings per week", min: 1, max: 20, step: 1, defaultValue: 5 },
    { id: "model", label: "Model choice", min: 1, max: 3, step: 1, defaultValue: 2, options: ["Haiku ($)", "Sonnet ($$)", "GPT-4o ($$$)"] }
  ]}
  outputs={[
    { 
      id: "weekly-cost", 
      label: "Weekly cost", 
      formula: "model === 1 ? meetings * 0.002 : model === 2 ? meetings * 0.02 : meetings * 0.04", 
      unit: "$", 
      precision: 2 
    },
    { 
      id: "monthly-cost", 
      label: "Monthly cost", 
      formula: "model === 1 ? meetings * 4 * 0.002 : model === 2 ? meetings * 4 * 0.02 : meetings * 4 * 0.04", 
      unit: "$", 
      precision: 2 
    }
  ]}
  insight="At `{meetings}` meetings/week with {model === 1 ? 'Haiku' : model === 2 ? 'Sonnet' : 'GPT-4o'}, you're spending ~${monthly-cost}/month on meeting prep. Compare that to 15-30 min of manual prep per call (2.5-10 hours/week = $125-500 in opportunity cost)."
/>

### Token Breakdown (Per Prep Doc)

| Model | Input Tokens (~) | Output Tokens (~) | Cost/Prep Doc |
|-------|------------------|-------------------|---------------|
| Claude Haiku | ~2,500 | ~800 | ~$0.002 |
| Claude Sonnet 4 | ~2,500 | ~800 | ~$0.02 |
| GPT-4o | ~2,500 | ~800 | ~$0.03-0.04 |
| GPT-4o-mini | ~2,500 | ~800 | ~$0.002 |

**Input tokens include:** CRM record, research brief, email thread, fresh data (LinkedIn/news), value prop, case studies.

**Output tokens:** The 500-word prep document.

At **5 meetings/week**, you're looking at:
- **Haiku:** $0.01/week = $0.50/month
- **Sonnet:** $0.10/week = $5/month
- **GPT-4o:** $0.15-0.20/week = $8/month

**Negligible cost.** The time saved (15-30 min per call × 5 calls = 75-150 min/week) is worth $75-150 in opportunity cost.

---

## Advanced: DISC Personality Integration

If you've completed **Course 13 (Sales Psychology & DISC)**, you can add personality-based prep notes to the agent.

<FlipCard 
  front="DISC in Meeting Prep" 
  back="If the prospect's DISC type is stored in your CRM, the agent includes communication style notes: pace, detail level, decision-making approach, and objection handling tips." 
/>

### Example: DISC-Enhanced Prep Section

```
DISC TYPE: High D (Dominant)

COMMUNICATION STYLE:
- Pace: Fast — get to the point quickly
- Detail: Low — skip the backstory, focus on outcomes
- Decision-making: Decisive — they'll say yes or no fast
- Objection style: Direct — "Why should I care?" or "Prove it."

MEETING APPROACH:
- Lead with the bottom line: "We help companies like yours cut reporting time by 80%."
- Skip the small talk — they'll appreciate directness
- Be ready for pushback — High Ds challenge to test you
- End with a clear next step — they want momentum

OBJECTION HANDLING:
- If they say "Prove it" → share a specific metric from a case study
- If they say "Why should I care?" → tie to their revenue/growth goal
- Don't take it personally — this is how they vet solutions
```

The agent pulls this from a **DISC prompt library** you create (stored in your CRM or a doc). Each DISC type gets a custom section.

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches">
This is especially powerful for client onboarding calls. If you know their DISC type from an intake form, the agent tailors your approach — e.g., High S clients need reassurance and relationship-building; High C clients need data and process clarity.
</ContextualNote>

---

## Testing Your Agent (Simulation)

Before you deploy this agent live, test it with past meetings.

<MiniRoleplay
  scenario="You have a discovery call in 30 minutes with a VP of Marketing at a Series A SaaS company. They posted on LinkedIn last week about attribution challenges. Your CRM shows they replied to your cold email asking about pricing. The agent generates a prep doc. Review it and identify: (1) What's useful? (2) What's missing? (3) What would you change?"
  role="You are the solo founder reviewing the prep doc"
  persistKey="custom-ai-agents-L6-roleplay"
  modelResponse="Useful: Talking point about their LinkedIn post, SPIN questions, objection prep for 'already using HubSpot.' Missing: No case study matched to their profile (Series A SaaS). Change: Add a question about their team's bandwidth for implementation."
/>

### Test Checklist

<InteractiveChecklist 
  title="Meeting Prep Agent Test Checklist" 
  persistKey="custom-ai-agents-L6-test" 
  items={[
    "Run agent on 3 past meetings (use old calendar events + CRM records)",
    "Check: Does it pull fresh data correctly? (LinkedIn, news)",
    "Check: Are talking points specific to the prospect?",
    "Check: Are discovery questions SPIN-ordered?",
    "Check: Are objections realistic for the deal stage?",
    "Check: Does the case study match the prospect profile?",
    "Check: Is the output under 500 words?",
    "Check: Does it flag missing data instead of hallucinating?",
    "Adjust prompt based on test results",
    "Deploy to production (30-min trigger on real calendar)"
  ]} 
/>

---

## Common Failure Modes (And How to Fix Them)

<ClassifyExercise
  title="Classify These Meeting Prep Failures"
  persistKey="custom-ai-agents-L6-classify"
  categories={[
    { id: "data", label: "Data Issue", color: "#ef4444" },
    { id: "prompt", label: "Prompt Issue", color: "#f59e0b" },
    { id: "integration", label: "Integration Issue", color: "#3b82f6" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Agent generates talking points about a LinkedIn post the prospect never made", 
      correctCategory: "data",
      explanation: "LinkedIn scraper failed or returned wrong profile. Fix: Add URL validation."
    },
    { 
      id: "2", 
      content: "Prep doc is 1,200 words instead of 500", 
      correctCategory: "prompt",
      explanation: "LLM ignored length constraint. Fix: Add 'Maximum 500 words. Stop after Relevant Proof section.'"
    },
    { 
      id: "3", 
      content: "Agent doesn't trigger for a calendar event labeled 'Client Call'", 
      correctCategory: "integration",
      explanation: "Trigger filter only looks for 'discovery' or 'demo'. Fix: Add 'client call' to keyword list."
    },
    { 
      id: "4", 
      content: "Discovery questions are generic, not tied to prospect's pain", 
      correctCategory: "prompt",
      explanation: "Prompt doesn't emphasize using research brief. Fix: Add 'Base questions on pain signals from research brief.'"
    },
    { 
      id: "5", 
      content: "Case study doesn't match prospect's industry", 
      correctCategory: "data",
      explanation: "Case study library lacks metadata (industry, size, stage). Fix: Add tags to case studies."
    }
  ]}
/>

### Top 5 Failure Modes

| Failure | Cause | Fix |
|---------|-------|-----|
| **Hallucinated data** | LLM invents facts when data is missing | Add anti-hallucination instruction: "If data unavailable, write 'Not found'" |
| **Generic talking points** | Prompt doesn't emphasize specificity | Add: "Reference actual data from prospect record. No generic statements." |
| **Wrong case study** | No matching logic in prompt | Add prospect profile to prompt: "Match case study to `{company_size}`, `{stage}`, `{industry}`" |
| **Prep doc too long** | LLM ignores length constraint | Add hard stop: "Maximum 500 words. End after Relevant Proof section." |
| **Agent doesn't trigger** | Calendar keyword mismatch | Expand trigger keywords: "discovery", "demo", "call", "meeting", "prospect" |

---

## Post-Meeting: Closing the Loop

The agent's job doesn't end when the call starts. After the meeting, it helps you **capture notes and update the CRM**.

### Post-Meeting Flow

```
[Meeting ends]
    ↓
[5 minutes later: Slack message]
"How'd the call with Sarah Chen go? Reply with notes and I'll update the CRM."
    ↓
[You reply]
"Good call. Moving to demo stage. Objection: budget concerns. Follow up in 3 days with ROI calculator."
    ↓
[Agent parses your message]
- Deal stage: Discovery → Demo
- Next step: Send ROI calculator
- Follow-up date: Today + 3 days
- Objection: Budget
    ↓
[Agent updates CRM]
- Stage = "Demo"
- Next task = "Send ROI calculator" (due in 3 days)
- Notes = "Objection: budget concerns. Needs ROI justification."
    ↓
[Agent schedules reminder]
Slack reminder in 3 days: "Follow up with Sarah Chen — send ROI calculator"
```

This **closes the loop** from prep → meeting → follow-up without manual CRM data entry.

<InsightCard icon="🔄" title="The Feedback Loop">
Over time, the agent learns which talking points work (based on deal progression) and which objections come up most often (based on your notes). You can use this data to refine your prompts.
</InsightCard>

---

## Your Implementation Plan

You've now spec'd your Meeting Prep Agent. Here's how to build it in **Lesson 12's implementation sprint**.

<InteractiveChecklist 
  title="Meeting Prep Agent Build Plan" 
  persistKey="custom-ai-agents-L6-build-plan" 
  items={[
    "Week 1, Day 1: Set up calendar integration (Google Calendar API or Zapier)",
    "Week 1, Day 2: Connect CRM (pull research brief, deal stage, email thread)",
    "Week 1, Day 3: Add fresh data sources (LinkedIn, Google News, Crunchbase)",
    "Week 1, Day 4: Write and test the LLM prompt (use 3 past meetings)",
    "Week 1, Day 5: Build the delivery mechanism (Slack, email, or CRM dashboard)",
    "Week 2, Day 1: Add post-meeting note capture (Slack prompt + CRM update)",
    "Week 2, Day 2: Test end-to-end with 5 upcoming meetings",
    "Week 2, Day 3: Refine prompt based on test results",
    "Week 2, Day 4: Deploy to production (30-min trigger on all prospect calls)",
    "Week 2, Day 5: Monitor for 1 week, collect feedback, iterate"
  ]} 
/>

---

## Summary: What You've Learned

<FlipCard 
  front="Meeting Prep Agent: Core Value" 
  back="Saves 15-30 min of manual research per call, surfaces fresh data (LinkedIn, news) automatically, generates SPIN questions and LARA objection responses, and closes the loop with post-meeting CRM updates." 
/>

You now know:
1. **What the agent does** — Generates 1-page prep docs 30 min before calls
2. **How it works** — Pulls CRM + fresh data, runs LLM prompt, delivers to Slack/email
3. **The prompt template** — Structured output with 6 sections (Refresh, Objective, Talking Points, Questions, Objections, Proof)
4. **Token economics** — $0.002-0.04 per prep doc (negligible cost)
5. **Failure modes** — Hallucination, generic output, wrong case study, length issues
6. **Post-meeting loop** — Captures notes, updates CRM, schedules follow-ups

**Next lesson:** Agent 5 (Post-Call Summary Agent) — automatically generates call summaries, action items, and CRM updates from meeting transcripts.

<InteractiveChecklist 
  title="Your Next Steps" 
  persistKey="custom-ai-agents-L6-next-steps" 
  items={[
    "Complete your Meeting Prep Agent spec (TemplateBuilder above)",
    "Identify 3 past meetings to use as test cases",
    "Draft your custom prompt template (copy the pseudocode and adapt)",
    "Decide: Slack, email, or CRM dashboard delivery?",
    "Add this agent to your Lesson 12 implementation sprint plan"
  ]} 
/>

---

## Quiz: Meeting Prep Agent Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "Why does the Meeting Prep Agent trigger 30 minutes before a call (instead of 2 hours or 5 minutes)?",
      "options": [
        "To reduce API costs by batching requests",
        "To give you time to read and internalize without forgetting details",
        "Because calendar APIs only support 30-minute intervals",
        "To avoid overwhelming you with too many prep docs"
      ],
      "correctAnswer": 1,
      "explanation": "30 minutes is the sweet spot: early enough to review without rushing, recent enough that you retain the details during the call."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "What's the primary purpose of including fresh data (LinkedIn posts, news) in the prep doc?",
      "options": [
        "To make the doc longer and more impressive",
        "To surface recent trigger events for personalized talking points",
        "To test if the data sources are working correctly",
        "To replace the original research brief"
      ],
      "correctAnswer": 1,
      "explanation": "Fresh data (last 7-30 days) gives you timely hooks — e.g., 'I saw your post about attribution challenges' — that make your outreach feel current and relevant."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "Why does the agent generate 3 talking points instead of 10?",
      "options": [
        "To save tokens and reduce cost",
        "Because 3 is easier to remember and use in conversation",
        "Because the LLM can't generate more than 3 reliably",
        "To force you to prioritize manually"
      ],
      "correctAnswer": 1,
      "explanation": "3-5 talking points is the optimal range: enough variety to adapt to the conversation, few enough to remember and deploy naturally."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "What framework does the agent use to order discovery questions?",
      "options": [
        "BANT (Budget, Authority, Need, Timeline)",
        "SPIN (Situation, Problem, Implication, Need-Payoff)",
        "MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion)",
        "AIDA (Attention, Interest, Desire, Action)"
      ],
      "correctAnswer": 1,
      "explanation": "SPIN is the discovery framework taught in Course 13. The agent orders questions from Situation (current state) → Problem (pain) → Implication (cost) → Need-Payoff (value)."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "What happens if the agent can't find a matching case study for the prospect?",
      "options": [
        "It generates a fake case study to fill the gap",
        "It skips the Relevant Proof section entirely",
        "It writes 'No matching case study available' and suggests creating one",
        "It uses a generic testimonial instead"
      ],
      "correctAnswer": 2,
      "explanation": "The anti-hallucination instruction tells the agent to flag missing data rather than invent it. This prompts you to add a case study for that profile."
    },
    {
      "id": "q6",
      "type": "true-false",
      "question": "The Meeting Prep Agent should join the call and take notes in real-time.",
      "correctAnswer": false,
      "explanation": "False. This agent generates a prep doc before the call. The Post-Call Summary Agent (Lesson 7) handles transcription and note-taking."
    },
    {
      "id": "q7",
      "type": "true-false",
      "question": "Including the email thread in the prompt helps prevent asking questions the prospect already answered.",
      "correctAnswer": true,
      "explanation": "True. The email thread provides context on what's already been discussed, so you don't repeat questions or miss objections they've raised."
    },
    {
      "id": "q8",
      "type": "multiple-choice",
      "question": "At 5 meetings/week with Claude Sonnet, what's the approximate monthly cost for this agent?",
      "options": [
        "$0.50",
        "$5",
        "$50",
        "$500"
      ],
      "correctAnswer": 1,
      "explanation": "$5/month. At ~$0.02 per prep doc × 5 meetings/week × 4 weeks = $0.40-0.50/month. Negligible compared to the time saved (75-150 min/week)."
    }
  ]
}