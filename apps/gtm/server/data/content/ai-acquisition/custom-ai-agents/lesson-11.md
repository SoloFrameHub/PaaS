---
title: "Dual-Context: B2B Discovery Prep vs Creator Nurture Agent"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 11
---

# The Tale of Two Agents

Sarah runs a B2B SaaS tool for marketing teams. Marcus runs a coaching business for creative entrepreneurs. Both have 30-minute discovery calls scheduled tomorrow.

**Sarah's problem:** She has 4 calls back-to-back. Each prospect comes from a different industry (fintech, healthcare, e-commerce, consulting). She needs to remember: their tech stack, recent funding, pain signals from the research brief, which case study to share, and what questions to ask based on their company stage.

**Marcus's problem:** His prospects are warm leads from his newsletter. They've consumed 3-12 pieces of content over 2-6 months. He needs to remember: which articles they opened, what they commented on, their stated goals from the opt-in form, and where they are in their creative journey.

Both are drowning in context. Both need an AI agent that does the remembering for them.

By the end of this lesson, you'll build **two versions of the same agent** — one optimized for B2B discovery prep, one for creator nurture conversations. Same architecture, different context windows.

<InsightCard icon="🎯" title="Why This Lesson Matters">
Most agent tutorials show you one use case. But the real skill is **adapting the same pattern to different contexts**. B2B and creator businesses have opposite data structures — yet the prep agent architecture is identical. Master this, and you can build agents for any context.
</InsightCard>

---

## The Universal Prep Agent Pattern

Whether you're prepping for a B2B discovery call or a creator nurture conversation, the agent does the same 5 things:

<FlipCard 
  front="The 5-Step Prep Pattern" 
  back="1. Gather context (CRM + fresh data). 2. Identify objective (what you want from this conversation). 3. Generate talking points (tied to their specific situation). 4. Prepare questions (discovery or deepening). 5. Anticipate objections/concerns (with responses ready)." 
/>

The **only difference** is what data you feed it and how you frame the output.

### B2B Discovery Prep Agent: What It Needs

**Input sources:**
- CRM research brief (from Agent 1)
- Calendar event (attendee names, company, meeting type)
- Email thread (last 3-5 exchanges if available)
- Fresh LinkedIn check (did they post anything in the last 7 days?)
- Fresh company news (Google News API, last 14 days)

**Output format:**
- **Quick Refresh** (3-5 key facts: role, company stage, pain signals)
- **Meeting Objective** (what you want to achieve: qualify, demo, close, discovery)
- **Talking Points** (3-5 bullets tied to their pain signals)
- **Discovery Questions** (5-7 questions, SPIN or MEDDIC framework)
- **Objection Prep** (top 2-3 likely objections with LARA responses)
- **Proof to Share** (1 relevant case study or testimonial)

### Creator Nurture Agent: What It Needs

**Input sources:**
- CRM contact record (opt-in date, stated goals, tags)
- Content engagement history (which articles/videos they consumed)
- Email open/click data (what topics resonated)
- Community activity (if applicable: Discord, Slack, comments)
- Time since last touchpoint (are they going cold?)

**Output format:**
- **Relationship Context** (how they found you, what they've consumed, engagement level)
- **Conversation Objective** (deepen relationship, qualify for offer, re-engage, close)
- **Conversation Starters** (3 references to their specific content consumption or stated goals)
- **Deepening Questions** (5-7 questions to understand their situation and readiness)
- **Offer Fit Assessment** (which of your offers matches their current stage)
- **Next Step Recommendation** (invite to workshop, send resource, pitch offer, nurture longer)

<ExampleCard label="Side-by-Side: Same Agent, Different Context">

**B2B Prep Output:**
> **Quick Refresh:** Jane Doe, VP Marketing at Acme Corp (Series B, 150 employees). Pain: can't attribute content ROI. Recently hired 3 content writers.
>
> **Objective:** Qualify budget and timeline for Q2 implementation.
>
> **Talking Point 1:** "You mentioned attribution challenges — most Series B companies we work with see a 6-week gap between content publish and revenue impact. How are you currently measuring that?"

**Creator Nurture Output:**
> **Relationship Context:** Alex joined your list 4 months ago via the "Pricing Your Coaching" guide. Opened 8/12 emails, clicked on "How to Fill a Group Program" twice. Tagged: aspiring-coach, no-clients-yet.
>
> **Objective:** Assess readiness for your "First 10 Clients" course (launches in 2 weeks).
>
> **Conversation Starter 1:** "I noticed you downloaded the pricing guide back in January and clicked through the group program article twice — are you thinking about launching a group offer soon?"

</ExampleCard>

<RangeSlider 
  label="How often do you forget key context before a call?" 
  min={1} 
  max={10} 
  lowLabel="Never" 
  highLabel="Every time" 
  persistKey="custom-ai-agents-L11-context-gap" 
/>

---

## Building the B2B Discovery Prep Agent

Let's build the B2B version first. You'll adapt it for creators in the next section.

### Step 1: Define the Trigger

The agent runs **30 minutes before** a scheduled calendar event tagged as "Discovery Call" or "Sales Call."

**Why 30 minutes?** Long enough to gather fresh data, short enough that the prep is still relevant. If you run it 24 hours early, news and LinkedIn activity might change.

**Implementation options:**
- **Zapier/Make:** Calendar event trigger → filter for event type → delay until 30 min before → run workflow
- **n8n:** Cron job checks calendar every 15 minutes → finds upcoming calls in next 30-45 min window → runs prep for each
- **Trigger.dev:** Scheduled job queries calendar API → triggers prep workflow per event

<TemplateBuilder
  title="Your B2B Prep Agent Trigger Config"
  persistKey="custom-ai-agents-L11-b2b-trigger"
  sections={[
    {
      id: "calendar",
      title: "Calendar Integration",
      fields: [
        { id: "source", label: "Calendar source", placeholder: "Google Calendar, Outlook, Calendly", type: "text" },
        { id: "event-filter", label: "Event name filter", placeholder: "e.g., 'Discovery', 'Sales', 'Demo'", type: "text" },
        { id: "timing", label: "Run X minutes before event", placeholder: "30", type: "number" }
      ]
    },
    {
      id: "delivery",
      title: "Prep Doc Delivery",
      fields: [
        { id: "channel", label: "Where to send prep doc", placeholder: "Slack DM, Email, CRM dashboard", type: "text" },
        { id: "format", label: "Format preference", placeholder: "Markdown, PDF, Notion page", type: "text" }
      ]
    }
  ]}
/>

### Step 2: Gather Context (The Data Collection Phase)

The agent pulls from 5 sources in parallel:

```
# Pseudocode: B2B Discovery Prep Agent — Data Collection

function gather_b2b_context(calendar_event):
    contact = crm.get_contact_by_email(calendar_event.attendee_email)
    
    # Source 1: CRM research brief (from Agent 1)
    research_brief = contact.research_brief
    
    # Source 2: Email thread (last 5 exchanges)
    email_thread = email_client.get_thread(contact.email, limit=5)
    
    # Source 3: Fresh LinkedIn activity (last 7 days)
    if contact.linkedin_url:
        linkedin_recent = scrape_linkedin_posts(contact.linkedin_url, days=7)
    else:
        linkedin_recent = None
    
    # Source 4: Fresh company news (last 14 days)
    company_news = google_news_search(contact.company, days=14)
    
    # Source 5: Deal stage and past interactions
    deal_stage = contact.deal_stage  # "discovery", "demo", "negotiation"
    past_notes = crm.get_notes(contact.id, limit=3)
    
    return {
        "contact": contact,
        "research_brief": research_brief,
        "email_thread": email_thread,
        "linkedin_recent": linkedin_recent,
        "company_news": company_news,
        "deal_stage": deal_stage,
        "past_notes": past_notes,
        "meeting_type": calendar_event.title
    }
```

<InsightCard icon="⚡" title="The Fresh Data Advantage">
Research briefs go stale. A prospect who was "exploring options" 2 weeks ago might have just announced a new hire (signal of budget) or posted about a pain point on LinkedIn. The 7-day LinkedIn check and 14-day news scan catch these **trigger events** that make your prep hyper-relevant.
</InsightCard>

### Step 3: Generate the Prep Document

Now we feed all that context into a structured prompt:

```
# Pseudocode: B2B Discovery Prep Agent — Prep Doc Generation

function generate_b2b_prep_doc(context):
    prompt = f"""
You are a sales prep assistant for a solo founder running a B2B SaaS business.

CONTEXT:
- Contact: {context.contact.name}, {context.contact.title} at {context.contact.company}
- Research Brief: {context.research_brief}
- Recent Email Thread: {context.email_thread}
- Recent LinkedIn Activity: {context.linkedin_recent or "None"}
- Recent Company News: {context.company_news or "None"}
- Deal Stage: {context.deal_stage}
- Past Notes: {context.past_notes}
- Meeting Type: {context.meeting_type}

TASK:
Generate a 1-page meeting prep document with these sections:

1. QUICK REFRESH (3-5 key facts to remember)
   - Role, company stage, primary pain signal
   - Any recent trigger events (new hire, funding, LinkedIn post, news)

2. MEETING OBJECTIVE (1 sentence: what you want to achieve)
   - Examples: "Qualify budget and timeline", "Demo core workflow", "Address pricing objections"

3. TALKING POINTS (3-5 bullets)
   - Each tied to a specific pain signal or trigger event from the context
   - Reference their situation, not generic value props

4. DISCOVERY QUESTIONS (5-7 questions)
   - Use SPIN framework: Situation, Problem, Implication, Need-Payoff
   - Tailor to their deal stage (early discovery vs late-stage)

5. OBJECTION PREP (top 2-3 likely objections with LARA responses)
   - Based on their company stage, past notes, and common objections for this ICP
   - LARA = Listen, Acknowledge, Reframe, Ask

6. PROOF TO SHARE (1 relevant case study or testimonial)
   - Match to their industry, company size, or pain signal
   - Include specific metric if available

CONSTRAINTS:
- Keep total length under 500 words
- Be specific — reference actual facts from the context
- If information is missing, write "Unknown — ask during call"
- Tone: confident but consultative, not salesy

OUTPUT FORMAT: Markdown
"""

    prep_doc = call_llm(
        model="claude-sonnet-4",
        prompt=prompt,
        max_tokens=1200,
        temperature=0.4  # Balanced: factual but slightly creative
    )
    
    return prep_doc
```

<FlipCard 
  front="Why SPIN Questions in the Prompt?" 
  back="SPIN (Situation, Problem, Implication, Need-Payoff) is a proven discovery framework. By instructing the AI to use SPIN, you get structured questions that move the conversation forward — not random curiosity questions." 
/>

### Step 4: Deliver the Prep Doc

The agent sends the prep doc to your preferred channel 30 minutes before the call:

- **Slack DM:** Instant notification, easy to read on mobile
- **Email:** Good if you're already in your inbox
- **CRM Dashboard:** Embedded in the contact record for reference during the call
- **Notion/Obsidian:** If you keep meeting notes there

<ComparisonBuilder
  title="Your B2B Discovery Prep Doc"
  persistKey="custom-ai-agents-L11-b2b-prep"
  prompt="Paste the context for an upcoming discovery call (contact name, company, pain signals, recent activity)"
  expertExample="**Quick Refresh:** Sarah Chen, Head of Growth at Fintech Startup (Seed, 25 employees). Pain: can't scale outbound without hiring SDRs. Just posted on LinkedIn about 'manual prospecting hell.'

**Objective:** Qualify budget for Q2 and demo automated research workflow.

**Talking Point 1:** 'I saw your LinkedIn post about manual prospecting — most seed-stage companies we work with hit that wall around 20-30 employees. How many hours/week is your team spending on research right now?'

**Discovery Question 1 (Situation):** 'Walk me through your current outbound process — who does what?'

**Objection Prep:** 'We're too early for automation' → Listen: 'That makes sense, a lot of founders think that.' Acknowledge: 'You want to stay lean.' Reframe: 'The companies that automate early actually scale faster because they don't build manual habits.' Ask: 'What would change if research took 10 minutes instead of 2 hours per prospect?'"
  criteria={[
    "References specific recent activity (LinkedIn post, news, email)",
    "Talking points tied to their pain signals",
    "Discovery questions follow SPIN framework",
    "Objections use LARA structure"
  ]}
/>

---

## Adapting for Creators: The Nurture Agent

Now let's rebuild the same agent for **creator nurture conversations**. The architecture is identical — only the inputs and framing change.

### Key Differences: B2B vs Creator Context

| Dimension | B2B Discovery Prep | Creator Nurture Prep |
|-----------|-------------------|---------------------|
| **Relationship Stage** | Cold → Warm (weeks) | Warm → Hot (months) |
| **Data Sources** | CRM, LinkedIn, news, email thread | CRM, content engagement, email opens, community activity |
| **Conversation Goal** | Qualify, demo, close | Deepen relationship, assess readiness, invite to offer |
| **Question Style** | SPIN (discovery) | Coaching questions (goals, obstacles, readiness) |
| **Objection Type** | Budget, timing, authority | Self-doubt, readiness, fit |
| **Proof Type** | Case study, ROI metric | Testimonial, transformation story |

<ConceptReframe
  concept="Prep Agent Purpose"
  defaultLens="technical-founder"
  lenses={[
    { 
      id: "technical-founder", 
      label: "B2B SaaS Founder", 
      explanation: "The prep agent is like a pre-flight checklist. You're about to take off (start the call) — it ensures you have all systems checked: fuel (context), route (objective), weather (objections), and backup plans (proof)." 
    },
    { 
      id: "coach", 
      label: "Coach/Consultant", 
      explanation: "The prep agent is like reviewing a client's intake form before a session. You need to remember: what they said in the application, what content resonated, where they're stuck, and what transformation they're ready for." 
    },
    { 
      id: "creator", 
      label: "Content Creator", 
      explanation: "The prep agent is like a relationship CRM for your audience. Before a 1-on-1 call with a subscriber, it reminds you: which videos they watched, what they commented, what they're struggling with, and which offer fits their journey." 
    }
  ]}
/>

### Step 1: Define the Creator Nurture Trigger

Same 30-minute window, but the event types are different:

- "Strategy Call"
- "1-on-1 Coaching"
- "Discovery Session"
- "Enrollment Conversation"

### Step 2: Gather Creator Context

```
# Pseudocode: Creator Nurture Agent — Data Collection

function gather_creator_context(calendar_event):
    contact = crm.get_contact_by_email(calendar_event.attendee_email)
    
    # Source 1: Opt-in context (how they joined, stated goals)
    opt_in_data = contact.opt_in_form_data  # From lead magnet or application
    
    # Source 2: Content engagement history
    content_engagement = email_platform.get_engagement(contact.email)
    # Returns: {articles_opened: [...], videos_watched: [...], click_topics: [...]}
    
    # Source 3: Email open/click data (last 90 days)
    email_activity = email_platform.get_activity(contact.email, days=90)
    
    # Source 4: Community activity (if applicable)
    if contact.in_community:
        community_activity = discord_or_slack.get_activity(contact.id, days=30)
    else:
        community_activity = None
    
    # Source 5: Time since last touchpoint
    last_interaction = contact.last_interaction_date
    days_since = (today() - last_interaction).days
    
    # Source 6: Tags and segments
    tags = contact.tags  # e.g., "aspiring-coach", "has-audience", "no-clients-yet"
    
    return {
        "contact": contact,
        "opt_in_data": opt_in_data,
        "content_engagement": content_engagement,
        "email_activity": email_activity,
        "community_activity": community_activity,
        "days_since_last_interaction": days_since,
        "tags": tags,
        "meeting_type": calendar_event.title
    }
```

### Step 3: Generate the Creator Nurture Prep Doc

```
# Pseudocode: Creator Nurture Agent — Prep Doc Generation

function generate_creator_prep_doc(context):
    prompt = f"""
You are a nurture conversation assistant for a creator/coach running a digital business.

CONTEXT:
- Contact: {context.contact.name}
- How They Joined: {context.opt_in_data.source} on {context.opt_in_data.date}
- Stated Goals: {context.opt_in_data.goals}
- Content Consumed: {context.content_engagement.articles_opened}, {context.content_engagement.videos_watched}
- Email Activity: Opened {context.email_activity.open_rate}% of emails, clicked on topics: {context.email_activity.click_topics}
- Community Activity: {context.community_activity or "Not in community"}
- Days Since Last Interaction: {context.days_since_last_interaction}
- Tags: {context.tags}
- Meeting Type: {context.meeting_type}

TASK:
Generate a 1-page conversation prep document with these sections:

1. RELATIONSHIP CONTEXT (how they found you, engagement level, time in your world)
   - Include specific content they consumed (article titles, video topics)
   - Note if they're going cold (30+ days since last interaction)

2. CONVERSATION OBJECTIVE (what you want to achieve)
   - Examples: "Deepen relationship and assess readiness for [offer]", "Re-engage and invite to [workshop]", "Qualify for [program] and close"

3. CONVERSATION STARTERS (3 references to their specific journey)
   - Tie to content they consumed or stated goals
   - Make it feel like you remember them (because you do, via this agent)

4. DEEPENING QUESTIONS (5-7 questions)
   - Focus on: current situation, obstacles, goals, readiness for change
   - Coaching-style, not interrogative

5. OFFER FIT ASSESSMENT (which of your offers matches their current stage)
   - Based on their engagement level, stated goals, and tags
   - Include: offer name, why it fits, potential objections

6. NEXT STEP RECOMMENDATION (what to propose at end of call)
   - Examples: "Invite to workshop", "Send case study", "Pitch [program]", "Nurture 30 more days with [sequence]"

CONSTRAINTS:
- Keep total length under 500 words
- Be warm and personal — this is a relationship, not a transaction
- Reference specific content by name (article titles, video topics)
- If information is missing, write "Ask during call"

OUTPUT FORMAT: Markdown
"""

    prep_doc = call_llm(
        model="claude-sonnet-4",
        prompt=prompt,
        max_tokens=1200,
        temperature=0.5  # Slightly warmer for creator context
    )
    
    return prep_doc
```

<ExampleCard label="Creator Nurture Prep Doc Example">

**Relationship Context:** Alex joined your list 4 months ago via the "Pricing Your Coaching" guide. Opened 8/12 emails (67%), clicked on "How to Fill a Group Program" twice and "Selling Without Sleaze" once. Tagged: aspiring-coach, no-clients-yet. Last interaction: 18 days ago (opened "3 Mistakes New Coaches Make").

**Objective:** Assess readiness for "First 10 Clients" course (launches in 2 weeks) and invite if qualified.

**Conversation Starter 1:** "I noticed you downloaded the pricing guide back in January and clicked through the group program article twice — are you thinking about launching a group offer soon, or are you still in 1-on-1 mode?"

**Deepening Question 1:** "What's the biggest obstacle keeping you from getting your first few clients right now?"

**Offer Fit:** **First 10 Clients** course fits well — they're in the "no clients yet" stage, engaged with pricing and program content, and the course launches in 2 weeks. Potential objection: "I don't have an audience yet" (course includes audience-building module).

**Next Step:** If they express readiness and have 5-10 hours/week to implement, pitch the course. If they're hesitant, invite to the free "Client Attraction Workshop" on Thursday as a low-commitment next step.

</ExampleCard>

<ComparisonBuilder
  title="Your Creator Nurture Prep Doc"
  persistKey="custom-ai-agents-L11-creator-prep"
  prompt="Paste the context for an upcoming nurture call (contact name, how they joined, content consumed, stated goals)"
  expertExample="**Relationship Context:** Jamie joined 6 months ago via 'Build Your First Digital Product' guide. Opened 15/20 emails (75%), watched 'Pricing Strategies' video 3 times, clicked 'Launch Playbook' link twice. Tagged: creator, has-audience (5K followers), no-product-yet. Last interaction: 12 days ago (clicked 'Product Validation' article).

**Objective:** Assess readiness for 'Product Launch Accelerator' (starts in 3 weeks) and close if qualified.

**Conversation Starter 1:** 'I saw you watched the pricing video a few times and clicked through the launch playbook — sounds like you're getting serious about creating something. What's the product idea you're thinking about?'

**Deepening Question 1:** 'What's stopping you from launching it in the next 30-60 days?'

**Offer Fit:** **Product Launch Accelerator** is a perfect fit — they have an audience, consumed product-focused content heavily, and the program starts in 3 weeks (urgency). Potential objection: 'I don't know if my idea is good enough' (program includes validation module).

**Next Step:** If they have a product idea and 8-12 hours/week to build, pitch the accelerator. If they're still ideating, send the 'Idea Validation Checklist' and schedule a follow-up in 2 weeks."
  criteria={[
    "References specific content consumed (article/video titles)",
    "Conversation starters feel personal, not generic",
    "Deepening questions focus on obstacles and readiness",
    "Offer fit is justified by engagement data and tags"
  ]}
/>

---

## The Dual-Agent Implementation

You now have **two versions of the same agent**. Here's how to implement both:

### Option 1: Single Agent with Context Switching

Build one agent that detects the meeting type and switches context:

```
# Pseudocode: Dual-Context Prep Agent

function prep_agent(calendar_event):
    # Step 1: Detect context
    if calendar_event.title in ["Discovery", "Sales", "Demo"]:
        context_type = "b2b"
    elif calendar_event.title in ["Strategy Call", "Coaching", "Enrollment"]:
        context_type = "creator"
    else:
        context_type = "unknown"  # Default to B2B
    
    # Step 2: Gather context
    if context_type == "b2b":
        context = gather_b2b_context(calendar_event)
        prep_doc = generate_b2b_prep_doc(context)
    else:
        context = gather_creator_context(calendar_event)
        prep_doc = generate_creator_prep_doc(context)
    
    # Step 3: Deliver
    deliver_prep_doc(prep_doc, channel="slack")
    
    return prep_doc
```

### Option 2: Two Separate Agents

Build two distinct workflows in your orchestrator (n8n, Zapier, Make):

- **Workflow A:** "B2B Discovery Prep" — triggers on calendar events with "Discovery" or "Sales" in title
- **Workflow B:** "Creator Nurture Prep" — triggers on calendar events with "Strategy" or "Coaching" in title

**Advantage:** Cleaner separation, easier to maintain.  
**Disadvantage:** Duplicate code/config.

<StrategyDuel
  title="Single Agent vs Dual Agents"
  persistKey="custom-ai-agents-L11-duel"
  scenario="You run both a B2B SaaS and a coaching business. You have 2-3 discovery calls and 2-3 nurture calls per week."
  strategyA={{ 
    name: "Single Agent with Context Switching", 
    description: "One workflow that detects meeting type and switches prompts", 
    pros: ["Less duplication", "Single point of maintenance"], 
    cons: ["More complex logic", "Harder to debug"] 
  }}
  strategyB={{ 
    name: "Two Separate Agents", 
    description: "Two workflows, each optimized for its context", 
    pros: ["Simpler logic per agent", "Easier to customize"], 
    cons: ["Duplicate config", "Two things to maintain"] 
  }}
  expertVerdict="For solo founders: **Two separate agents** wins. The added clarity and ease of customization outweigh the minor duplication. You can copy-paste 80% of the config and tweak the prompts."
/>

---

## Token Economics: What This Costs

Both agents are prompt-heavy but not expensive:

| Model | Input Tokens (~) | Output Tokens (~) | Cost/Prep Doc |
|-------|------------------|-------------------|---------------|
| Claude Sonnet 4 | ~2,500 | ~1,000 | ~$0.02-0.03 |
| Claude Haiku | ~2,500 | ~1,000 | ~$0.002 |
| GPT-4o | ~2,500 | ~1,000 | ~$0.03-0.05 |
| GPT-4o-mini | ~2,500 | ~1,000 | ~$0.002 |

**At 10 calls/week (5 B2B + 5 creator):**
- Claude Sonnet: $0.20-0.30/week = **$1.00-1.50/month**
- Claude Haiku: $0.02/week = **$0.10/month**

The **data collection APIs** (LinkedIn scraping, Google News, email platform) cost more than the LLM calls. Budget $10-20/month for enrichment APIs if you're running fresh data checks.

<ScenarioSimulator
  title="Prep Agent ROI Calculator"
  persistKey="custom-ai-agents-L11-roi"
  levers={[
    { id: "calls", label: "Calls per week", min: 1, max: 20, step: 1, defaultValue: 8 },
    { id: "prepTime", label: "Manual prep time (min/call)", min: 5, max: 30, step: 5, defaultValue: 15 },
    { id: "hourlyRate", label: "Your hourly rate ($)", min: 50, max: 500, step: 50, defaultValue: 150 }
  ]}
  outputs={[
    { id: "timeSaved", label: "Time saved per month (hours)", formula: "(calls * 4 * prepTime) / 60", unit: "hrs", precision: 1 },
    { id: "valueSaved", label: "Value of time saved per month ($)", formula: "(calls * 4 * prepTime / 60) * hourlyRate", unit: "$", precision: 0 }
  ]}
  insight="At {timeSaved} hours saved/month, that's ${valueSaved} of your time back. Agent cost: ~$1.50/month. ROI: {(valueSaved / 1.5).toFixed(0)}x."
/>

---

## Quality Control: Spot-Checking Your Prep Docs

AI agents hallucinate. Prep docs are high-stakes — you don't want to reference a LinkedIn post that doesn't exist or a pain signal the prospect never mentioned.

**The 10% Spot-Check Rule:** Every week, manually review 1-2 prep docs against the source data. Check:

1. **Factual accuracy:** Are the LinkedIn posts, news articles, and email references real?
2. **Relevance:** Are the talking points actually tied to their pain signals, or generic?
3. **Question quality:** Do the discovery/deepening questions make sense for their stage?
4. **Objection prep:** Are the anticipated objections realistic, or is the AI guessing?

<LinterFeedback
  title="Prep Doc Linter"
  persistKey="custom-ai-agents-L11-linter"
  inputLabel="Paste a prep doc generated by your agent"
  rules={[
    { 
      id: "specificity", 
      label: "Specificity", 
      description: "References specific content (LinkedIn post, article title, news event)", 
      keywords: ["posted on LinkedIn", "article titled", "announced", "mentioned in email"], 
      antiKeywords: ["generic", "typical", "usually"] 
    },
    { 
      id: "questions", 
      label: "Question Quality", 
      description: "Questions are open-ended and stage-appropriate", 
      keywords: ["How", "What", "Walk me through", "Tell me about"], 
      antiKeywords: ["yes/no", "Do you", "Are you"] 
    },
    { 
      id: "proof", 
      label: "Proof Relevance", 
      description: "Case study or testimonial matches their context", 
      keywords: ["similar to", "same industry", "same stage"], 
      antiKeywords: ["generic", "any company"] 
    }
  ]}
/>

---

## Implementation Sprint: Build Both Agents This Week

You've learned the pattern. Now build it.

<InteractiveChecklist 
  title="Your 7-Day Dual-Agent Build Sprint" 
  persistKey="custom-ai-agents-L11-sprint" 
  items={[
    "Day 1: Choose your orchestrator (n8n, Zapier, Make) and connect your calendar",
    "Day 2: Build the B2B Discovery Prep Agent — configure trigger, data sources, and prompt",
    "Day 3: Test the B2B agent with 3 upcoming discovery calls — spot-check for accuracy",
    "Day 4: Build the Creator Nurture Prep Agent — adapt the B2B config for creator context",
    "Day 5: Test the Creator agent with 3 upcoming nurture calls — spot-check for relevance",
    "Day 6: Set up delivery channels (Slack, email, CRM) and run both agents in parallel",
    "Day 7: Review 5 prep docs (mix of B2B and creator) — refine prompts based on quality gaps"
  ]} 
/>

---

## Summary: One Pattern, Infinite Contexts

The prep agent pattern is **universal**:
1. Gather context (CRM + fresh data)
2. Identify objective (what you want from the conversation)
3. Generate talking points (tied to their specific situation)
4. Prepare questions (discovery or deepening)
5. Anticipate objections/concerns (with responses ready)

You've built it for **B2B discovery** and **creator nurture**. But the same pattern works for:
- **Customer success check-ins** (gather usage data, identify churn risk, prepare retention questions)
- **Partnership calls** (gather company context, identify collaboration opportunities, prepare value-exchange questions)
- **Investor pitches** (gather investor portfolio, identify thesis fit, prepare objection responses)

Master this one agent, and you've unlocked a **meta-skill**: adapting AI workflows to any context.

<InsightCard icon="🎯" title="The Real Skill">
Building agents isn't about memorizing frameworks. It's about **recognizing patterns** and **adapting them to your context**. The prep agent is a pattern. B2B and creator are contexts. Once you see the pattern, you can apply it anywhere.
</InsightCard>

---

## Next Lesson Preview

In Lesson 12, you'll build the **Post-Call Follow-Up Agent** — the final piece of the sales agent stack. It listens to your call recording (or reads your notes), extracts action items, drafts a follow-up email, updates the CRM, and schedules the next touchpoint.

Then you'll assemble all 5 agents into a **complete AI-powered sales system** and run your first end-to-end sprint: prospect research → email draft → meeting prep → call → follow-up. All automated, all personalized, all in 7 days.