---
title: "AI-Generated 1-Page Prospect Briefs"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 25: LinkedIn AI Applications"
lesson: 7
---

<InsightCard icon="⚡" title="The Research Bottleneck">
You found 50 perfect prospects in Sales Navigator. Now you need to research each one before reaching out. At 15-30 minutes per prospect, that's 12-25 hours of work. **You have 2 hours this week.**

This is why most LinkedIn outreach fails. Not because the targeting is wrong — because personalization doesn't scale with manual research.
</InsightCard>

## The $10K Research Problem

Sarah, a B2B SaaS founder, had this exact problem. She'd built a perfect Sales Navigator search: 200 VP Marketing prospects at Series A companies who'd posted about attribution challenges in the last 30 days.

She researched the first 5 prospects manually:
- Checked their LinkedIn profiles
- Read their last 10 posts
- Googled their company for recent news
- Looked up mutual connections
- Drafted personalized connection requests

**Time invested:** 2 hours, 15 minutes
**Connection acceptance rate:** 80% (4 of 5)
**DM reply rate:** 75% (3 of 4)
**Meetings booked:** 2

The math was beautiful. At this rate, 200 prospects would yield 80+ meetings. But the time math was brutal: 200 prospects × 25 min/prospect = **83 hours of research**.

She had 5-7 hours per week total for acquisition.

<PredictionGate
  question="What did Sarah do next?"
  persistKey="linkedin-ai-L7-predict"
  type="choice"
  choices={[
    { id: "a", text: "Hired a VA to do the research" },
    { id: "b", text: "Sent generic messages to save time" },
    { id: "c", text: "Built an AI research workflow" }
  ]}
  correctId="c"
>
Sarah built an **AI-assisted prospect brief system** that reduced research time from 25 minutes to **3 minutes per prospect** — while maintaining 70%+ of the personalization quality.

The result: 60 researched prospects per week instead of 12. Same time investment, 5x the output.
</PredictionGate>

## What Is a Prospect Brief?

A prospect brief is a **1-page AI-generated summary** of everything you need to know about a prospect before reaching out.

Think of it as your pre-call research document, but created in 3 minutes instead of 30.

<FlipCard 
  front="The Traditional Research Process" 
  back="LinkedIn profile (5 min) → Recent posts (5 min) → Company website (5 min) → Google News (3 min) → Mutual connections (2 min) → Crunchbase (3 min) → Draft personalized note (7 min) = 30 minutes total" 
/>

<FlipCard 
  front="The AI Brief Process" 
  back="Copy LinkedIn profile URL → Paste into AI prompt → Review 1-page brief → Highlight 2-3 connection points → Draft personalized note = 3 minutes total" 
/>

### The Brief Template Structure

Every prospect brief follows the same 5-section format:

1. **Prospect Overview** — Role, company, tenure, background
2. **Company Context** — Size, stage, recent news, funding, growth signals
3. **Content Analysis** — What they post about, their positions, pain points they mention
4. **Connection Points** — Mutual connections, shared interests, common background, events
5. **Outreach Angle** — Recommended approach based on the above data

<ExampleCard label="Sample Brief: VP Marketing at Series A SaaS">
**Prospect Overview**
- Name: Jessica Chen
- Role: VP Marketing at DataFlow (Series A analytics platform)
- Tenure: 8 months (joined from competitor)
- Background: 10+ years in B2B SaaS marketing, previously at Segment

**Company Context**
- DataFlow: 50 employees, $15M Series A (6 months ago)
- Product: Customer data platform for e-commerce
- Recent news: Launched new attribution feature (2 weeks ago)
- Hiring: 3 open marketing roles (growth signal)

**Content Analysis**
- Posts 2-3x/week about attribution challenges
- Recent post: "Still can't prove which channels drive revenue" (47 likes)
- Shares content about multi-touch attribution, CAC optimization
- Frustrated with current analytics stack (mentioned in comments)

**Connection Points**
- Mutual connection: Mike Johnson (former colleague at Segment)
- Both attended SaaStr Annual 2025
- Shared interest: Data-driven marketing, attribution modeling

**Outreach Angle**
Reference her recent post about attribution challenges. Mention you saw DataFlow's new attribution feature launch and have a case study of a similar Series A company that solved this exact problem. Ask if she'd be open to a 15-min conversation about their approach.
</ExampleCard>

<RangeSlider 
  label="How much time do you currently spend researching each prospect?" 
  min={0} 
  max={60} 
  lowLabel="0 min (no research)" 
  highLabel="60+ min" 
  persistKey="linkedin-ai-L7-research-time" 
/>

## The AI Brief Workflow

Here's the complete system for generating prospect briefs at scale.

<SlideNavigation>
<Slide title="Step 1: Gather Raw Data">
You need 4 data sources for a quality brief:

1. **LinkedIn Profile** — Copy the full profile text (About, Experience, Education)
2. **Recent Posts** — Copy their last 5-10 posts (text only, skip images)
3. **Company Website** — Copy the About page and any recent blog posts
4. **Crunchbase/News** — Copy funding info and recent news mentions

**Time investment:** 2-3 minutes of copy-paste work

**Pro tip:** Use a browser extension like "Copy All" to grab LinkedIn profile text in one click. For posts, just copy the text — AI doesn't need images or engagement counts.
</Slide>

<Slide title="Step 2: Use the AI Brief Prompt">
Paste this prompt template into ChatGPT or Claude:

```
You are a B2B sales research assistant. Generate a 1-page prospect brief following this exact structure:

## PROSPECT OVERVIEW
- Name, role, company, tenure
- Previous roles and career trajectory
- Key background details

## COMPANY CONTEXT
- Company size, stage, funding
- Product/service description
- Recent news or milestones
- Growth signals (hiring, expansion, etc.)

## CONTENT ANALYSIS
- What topics they post about
- Positions they've taken publicly
- Pain points or challenges mentioned
- Engagement patterns

## CONNECTION POINTS
- Mutual connections
- Shared interests or communities
- Common background (schools, companies, events)
- Relevant experiences to reference

## OUTREACH ANGLE
- Recommended approach for first contact
- Specific hook based on recent activity
- Suggested value proposition angle

---

Here is the prospect data:

[PASTE LINKEDIN PROFILE]

[PASTE RECENT POSTS]

[PASTE COMPANY INFO]

[PASTE NEWS/FUNDING DATA]

---

Focus on: connection points I can reference, recent activities that suggest timing, and a concrete outreach angle. Keep the brief to 400-500 words max.
```

**Time investment:** 30 seconds to paste and run
</Slide>

<Slide title="Step 3: Review and Highlight">
AI generates the brief in 10-20 seconds. Your job:

1. **Scan for accuracy** — Does the role/company match? Any hallucinations?
2. **Highlight 2-3 connection points** — What will you actually reference?
3. **Note the outreach angle** — Does it feel right for this prospect?

**Time investment:** 1-2 minutes of review

**Common AI errors to watch for:**
- Mixing up similar company names
- Inferring pain points that weren't explicitly stated
- Suggesting outreach angles that are too generic

If the brief feels off, add more specific data to the prompt and regenerate.
</Slide>

<Slide title="Step 4: Store in Your CRM">
Copy the brief into your CRM as a contact note. Options:

- **HubSpot (Free):** Paste into the "Notes" section
- **Attio:** Create a "Research Brief" field
- **Notion/Google Docs:** Simple prospect database with brief column
- **Obsidian:** Markdown file per prospect

**Why store it:** You'll reference this brief before every touchpoint — connection request, DM, follow-up, call prep.

**Time investment:** 30 seconds to paste and save
</Slide>

<Slide title="Step 5: Draft Your Outreach">
Use the brief's "Outreach Angle" section to draft your connection request or DM.

**Connection request formula:**
[Specific reference to their content/activity] + [Shared context] + [Reason to connect that benefits THEM]

**Example based on Jessica's brief:**
"Hi Jessica — saw your post about attribution challenges and noticed DataFlow just launched a new feature in this space. I work with Series A companies on this exact problem and have a case study that might be relevant. Would you be open to connecting?"

**Time investment:** 2-3 minutes to draft and personalize

**Total time per prospect:** 3 minutes research + 3 minutes drafting = **6 minutes end-to-end**
</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Your First Brief Workflow" 
  persistKey="linkedin-ai-L7-workflow" 
  items={[
    "Pick 1 prospect from your Sales Navigator saved search",
    "Copy their LinkedIn profile, last 5 posts, and company About page",
    "Paste into the AI brief prompt template",
    "Review the generated brief for accuracy",
    "Highlight 2-3 connection points to reference",
    "Store the brief in your CRM",
    "Draft a personalized connection request using the outreach angle"
  ]} 
/>

## Batch Brief Generation

The real power comes from **batching** this process. Instead of researching prospects one-by-one as you reach out, dedicate one 60-90 minute block per week to generate 10-25 briefs.

### The Weekly Brief Sprint

**Monday morning (60-90 min):**

1. Open your Sales Navigator saved search
2. Export top 25 prospects for the week (use Evaboot if needed)
3. Open 5 browser tabs at a time
4. Copy-paste data into AI prompt
5. Generate 5 briefs
6. Review and store in CRM
7. Repeat 5x

**Output:** 25 researched prospects ready for outreach

**Time per brief:** 3-4 minutes in batch mode (faster than one-by-one)

<ScenarioSimulator
  title="Brief Generation ROI Calculator"
  persistKey="linkedin-ai-L7-simulator"
  levers={[
    { id: "prospects", label: "Prospects researched per week", min: 5, max: 50, step: 5, defaultValue: 20 },
    { id: "timePerBrief", label: "Minutes per brief", min: 2, max: 30, step: 1, defaultValue: 3 },
    { id: "acceptanceRate", label: "Connection acceptance rate (%)", min: 20, max: 80, step: 5, defaultValue: 40 },
    { id: "replyRate", label: "DM reply rate (%)", min: 10, max: 50, step: 5, defaultValue: 25 }
  ]}
  outputs={[
    { id: "timeInvested", label: "Weekly time invested", formula: "(prospects * timePerBrief)", unit: " min", precision: 0 },
    { id: "connections", label: "New connections per week", formula: "(prospects * (acceptanceRate / 100))", unit: "", precision: 1 },
    { id: "conversations", label: "Active conversations per week", formula: "(prospects * (acceptanceRate / 100) * (replyRate / 100))", unit: "", precision: 1 },
    { id: "monthlyConversations", label: "Monthly conversations", formula: "(prospects * (acceptanceRate / 100) * (replyRate / 100) * 4)", unit: "", precision: 0 }
  ]}
  insight="At {timeInvested} minutes per week, you're generating {monthlyConversations} qualified conversations per month. That's {monthlyConversations / (timeInvested / 60)} conversations per hour invested."
/>

### Batch Workflow Tips

<InsightCard icon="🎯" title="The 5-Tab Rule">
Never open more than 5 prospect tabs at once. Your brain can't context-switch efficiently beyond that. Do 5, close all tabs, do the next 5.
</InsightCard>

<InsightCard icon="⚡" title="Template Your Data Collection">
Create a simple text file template:

```
PROSPECT: [Name]
---
LINKEDIN PROFILE:
[paste]

RECENT POSTS:
[paste]

COMPANY INFO:
[paste]

NEWS/FUNDING:
[paste]
```

Fill this out for 5 prospects, then batch-generate all 5 briefs at once.
</InsightCard>

<InsightCard icon="🔄" title="Reuse Company Research">
If you're targeting multiple people at the same company, you only need to research the company once. The "Company Context" section stays the same; only "Prospect Overview" and "Content Analysis" change per person.
</InsightCard>

## The FRESH Research Framework

Not all prospects are created equal. The best briefs focus on **FRESH** signals — recent events that create timing and relevance.

<FlipCard 
  front="F.R.E.S.H." 
  back="Funding or financial events | Recent role change or promotion | Engagement with relevant content topics | Shared connections or communities | Hiring signals (job posts = growth = budget)" 
/>

### Prioritizing Prospects by FRESH Score

When you have 50+ prospects in your saved search, use FRESH to decide who gets a full brief vs. a template-only approach.

<ClassifyExercise
  title="FRESH Score These Prospects"
  persistKey="linkedin-ai-L7-classify"
  categories={[
    { id: "high", label: "High FRESH (Full Brief)", color: "#22c55e" },
    { id: "medium", label: "Medium FRESH (Quick Brief)", color: "#f59e0b" },
    { id: "low", label: "Low FRESH (Template Only)", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "VP Marketing, posted yesterday about attribution challenges, company just raised Series A", 
      correctCategory: "high",
      explanation: "Recent content + funding event = perfect timing"
    },
    { 
      id: "2", 
      content: "Director of Sales, no recent posts, company stable, no mutual connections", 
      correctCategory: "low",
      explanation: "No timing signals — use template personalization only"
    },
    { 
      id: "3", 
      content: "CMO, changed jobs 2 months ago, mutual connection with your co-founder", 
      correctCategory: "high",
      explanation: "Job change + warm intro path = high priority"
    },
    { 
      id: "4", 
      content: "Marketing Manager, posts weekly, company hiring 3 marketing roles", 
      correctCategory: "medium",
      explanation: "Hiring signal + content activity = worth a quick brief"
    },
    { 
      id: "5", 
      content: "VP Growth, attended same conference as you last month, posted about it", 
      correctCategory: "high",
      explanation: "Shared experience + recent content = strong connection point"
    }
  ]}
/>

### The Research Depth Pyramid

<InsightCard icon="📊" title="The 20-50-30 Rule">
**Top 20%** of prospects (highest FRESH score): Full AI brief + manual review + custom outreach (10-15 min total)

**Middle 50%** of prospects (medium FRESH): AI brief only, minimal review (3-5 min total)

**Bottom 30%** of prospects (low FRESH): Template personalization only, no brief (1-2 min total)

This lets you research 25 prospects in 90 minutes while maintaining quality where it matters most.
</InsightCard>

## Building Your Brief Template Library

Over time, you'll notice patterns in your briefs. Certain industries, roles, or company stages have similar contexts. Build a **template library** to speed up the process.

<TemplateBuilder
  title="Your Brief Template Library"
  persistKey="linkedin-ai-L7-templates"
  sections={[
    {
      id: "industry",
      title: "Industry-Specific Templates",
      fields: [
        { 
          id: "saas", 
          label: "B2B SaaS Template", 
          placeholder: "Common pain points: attribution, CAC, churn. Growth signals: hiring, funding, product launches.", 
          type: "textarea" 
        },
        { 
          id: "agency", 
          label: "Agency Template", 
          placeholder: "Common pain points: client reporting, scaling delivery, pricing. Growth signals: new clients, team expansion.", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "role",
      title: "Role-Specific Templates",
      fields: [
        { 
          id: "vp-marketing", 
          label: "VP Marketing Template", 
          placeholder: "Typical responsibilities: demand gen, attribution, team management. Common challenges: proving ROI, scaling programs.", 
          type: "textarea" 
        },
        { 
          id: "founder", 
          label: "Founder Template", 
          placeholder: "Typical focus: product-market fit, fundraising, hiring. Common challenges: time constraints, wearing multiple hats.", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

### When to Use Templates vs. Custom Briefs

**Use a template when:**
- The prospect fits a pattern you've seen 10+ times
- They have low FRESH score (no recent timing signals)
- You're doing high-volume outreach (50+ per week)

**Generate a custom brief when:**
- High FRESH score (recent job change, funding, content activity)
- High-value prospect (dream customer, large deal size)
- Warm introduction path (mutual connection)

## Common Brief Generation Mistakes

<SwipeDecision
  title="Good Brief or Bad Brief?"
  description="Swipe right for well-researched briefs, left for low-quality ones"
  optionA="Needs Work"
  optionB="Good Brief"
  persistKey="linkedin-ai-L7-swipe"
  cards={[
    { 
      id: "1", 
      content: "Brief says: 'Jessica is a marketing leader with experience in SaaS. She cares about growth and ROI.'", 
      correctOption: "a", 
      explanation: "Too generic. Could apply to 10,000 people. No specific connection points or timing signals." 
    },
    { 
      id: "2", 
      content: "Brief says: 'Jessica posted 3 days ago about attribution challenges. DataFlow raised $15M 6 months ago and is hiring 3 marketing roles. Mutual connection: Mike Johnson.'", 
      correctOption: "b", 
      explanation: "Specific, timely, actionable. Clear connection points and outreach angle." 
    },
    { 
      id: "3", 
      content: "Brief says: 'Jessica went to Stanford and worked at Google before Segment. She likes data-driven marketing.'", 
      correctOption: "a", 
      explanation: "Background is interesting but not actionable. No recent activity or connection points to reference." 
    },
    { 
      id: "4", 
      content: "Brief says: 'Jessica's recent post about multi-touch attribution got 47 likes. She mentioned frustration with current analytics stack in comments. Recommend referencing this post in outreach.'", 
      correctOption: "b", 
      explanation: "Specific content reference with clear outreach angle. This is actionable." 
    }
  ]}
/>

### The 3 Brief Quality Checks

Before you use a brief for outreach, run these checks:

1. **Specificity Check:** Could this brief apply to 100 other people, or is it unique to this prospect?
2. **Recency Check:** Does it reference something from the last 30 days, or is it all historical background?
3. **Action Check:** Does the "Outreach Angle" give you a concrete hook to reference, or is it generic advice?

If any check fails, add more data to the prompt and regenerate.

## Advanced Brief Techniques

### Multi-Prospect Briefs for Account-Based Outreach

When you're targeting multiple people at the same company (account-based approach), create a **company brief** first, then individual prospect briefs that reference it.

**Company Brief Template:**
```
## COMPANY OVERVIEW
- Name, industry, size, stage
- Product/service description
- Recent news, funding, milestones

## STRATEGIC CONTEXT
- Market position and competitors
- Growth trajectory and signals
- Technology stack (if known)

## ORGANIZATIONAL STRUCTURE
- Key decision-makers and their roles
- Reporting relationships
- Buying committee composition

## OUTREACH STRATEGY
- Primary entry point (which role to contact first)
- Value proposition angle for this company
- Potential objections or concerns
```

Then reference this in individual prospect briefs: "See Company Brief for DataFlow for full context."

### Using Briefs for Multi-Touch Sequences

A good brief supports **multiple touchpoints**, not just the first connection request.

**Touch 1 (Connection Request):** Reference their recent post
**Touch 2 (First DM after acceptance):** Reference mutual connection
**Touch 3 (Follow-up DM):** Reference company milestone
**Touch 4 (Loom video):** Reference specific pain point from their content

Each touch uses a different connection point from the brief. This is why you need 3-5 connection points per brief, not just one.

<ProgressiveReveal title="The 5-Touch Brief Strategy" persistKey="linkedin-ai-L7-reveal">
<RevealSection title="Touch 1: Content Reference">
"Saw your post about attribution challenges — this resonates with what I'm hearing from other Series A marketing leaders."

**Why it works:** Shows you're paying attention, not mass-messaging.
</RevealSection>

<RevealSection title="Touch 2: Mutual Connection">
"I noticed we're both connected to Mike Johnson — he mentioned you're doing interesting work at DataFlow."

**Why it works:** Social proof and warm introduction signal.
</RevealSection>

<RevealSection title="Touch 3: Company Milestone">
"Congrats on the Series A and the new attribution feature launch — that's a big milestone."

**Why it works:** Shows you understand their business context.
</RevealSection>

<RevealSection title="Touch 4: Specific Pain Point">
"You mentioned in a comment thread that your current analytics stack isn't cutting it — we've helped 3 similar companies solve this exact problem."

**Why it works:** Demonstrates deep research and relevant expertise.
</RevealSection>

<RevealSection title="Touch 5: Value Offer">
"I put together a quick Loom walking through how [Similar Company] solved the attribution challenge you posted about. No pitch, just thought it might be useful."

**Why it works:** Gives value before asking for anything.
</RevealSection>
</ProgressiveReveal>

## Storing and Organizing Briefs

Your brief system is only as good as your ability to **find and reference** briefs when you need them.

### CRM Storage Options

<ComparisonBuilder
  title="Your Brief Storage System"
  persistKey="linkedin-ai-L7-storage"
  prompt="Describe your current system for storing prospect research (or 'none' if you don't have one)"
  expertExample="I use HubSpot's Notes field with a 'BRIEF:' prefix. Each brief is tagged with the prospect's company and role. I can search by keyword to find all briefs mentioning 'attribution' or 'Series A' when I need similar examples."
  criteria={[
    "Easy to find when you need it",
    "Searchable by keyword or tag",
    "Accessible during outreach (not buried in files)",
    "Synced with your outreach workflow"
  ]}
/>

### The Brief Naming Convention

Use a consistent naming format so you can search and filter:

**Format:** `[Company] - [Name] - [Role] - [Date]`

**Example:** `DataFlow - Jessica Chen - VP Marketing - 2026-01-15`

This lets you:
- Search by company to find all briefs for an account
- Sort by date to see which briefs are stale (30+ days old)
- Filter by role to find similar prospects

### Brief Refresh Cadence

Briefs go stale. If you generated a brief 60+ days ago and haven't reached out yet, **regenerate it** before you do.

**Why:** Their recent posts have changed, company news has updated, and your original outreach angle may no longer be timely.

**Quick refresh workflow:**
1. Open the old brief
2. Copy the prospect's last 5 new posts
3. Paste into AI prompt with instruction: "Update this brief with new information"
4. Review changes and update CRM

**Time investment:** 2-3 minutes

## Your Implementation Sprint

<InteractiveChecklist 
  title="Week 1: Build Your Brief System" 
  persistKey="linkedin-ai-L7-sprint" 
  items={[
    "Day 1: Set up your brief storage system (CRM notes or Notion database)",
    "Day 1: Save the AI brief prompt template for easy access",
    "Day 2: Generate 5 practice briefs from your Sales Navigator saved search",
    "Day 2: Review briefs for quality using the 3-check framework",
    "Day 3: Use 2 briefs to draft personalized connection requests",
    "Day 4: Send connection requests and track acceptance rate",
    "Day 5: Generate 10 more briefs in a batch session (60 min)",
    "Day 6: Draft DMs for accepted connections using brief connection points",
    "Day 7: Review your week — how many briefs generated, how many used, what worked"
  ]} 
/>

## Key Takeaways

<InsightCard icon="🎯" title="The Brief Advantage">
AI-generated prospect briefs reduce research time by 70-80% while maintaining quality. The key is **batch generation** (10-25 per week) and **strategic use** (full briefs for high-FRESH prospects, templates for the rest).
</InsightCard>

<InsightCard icon="⚡" title="FRESH Signals Win">
The best briefs focus on recent activity: Funding, Role changes, Engagement, Shared connections, Hiring. These create timing and relevance that generic background research can't match.
</InsightCard>

<InsightCard icon="🔄" title="Briefs Enable Multi-Touch">
A good brief supports 5+ touchpoints, not just one. Each connection point (content, mutual connection, company milestone, pain point) becomes a different touch in your sequence.
</InsightCard>

---

## Quiz: Prospect Brief Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "What is the primary time-saving benefit of AI-generated prospect briefs?",
      "options": [
        "They eliminate the need for personalization",
        "They reduce research time from 25 minutes to 3 minutes per prospect",
        "They automate the entire outreach process",
        "They guarantee higher response rates"
      ],
      "correctAnswer": 1,
      "explanation": "AI briefs reduce research time by 70-80%, from 25-30 minutes of manual research to 3-5 minutes of AI-assisted research and review."
    },
    {
      "id": "q2",
      "question": "What does the 'F' in the FRESH framework stand for?",
      "options": [
        "First-time buyer",
        "Funding or financial events",
        "Frequent poster",
        "Formal introduction"
      ],
      "correctAnswer": 1,
      "explanation": "FRESH = Funding, Recent role change, Engagement, Shared connections, Hiring. These are timing signals that make outreach more relevant."
    },
    {
      "id": "q3",
      "question": "According to the 20-50-30 rule, what percentage of prospects should get a full AI brief with manual review?",
      "options": [
        "100% (all prospects)",
        "50% (medium FRESH score)",
        "20% (highest FRESH score)",
        "30% (lowest FRESH score)"
      ],
      "correctAnswer": 2,
      "explanation": "Top 20% with highest FRESH scores get full briefs (10-15 min), middle 50% get AI-only briefs (3-5 min), bottom 30% get template personalization (1-2 min)."
    },
    {
      "id": "q4",
      "question": "What is the recommended batch size for weekly brief generation?",
      "options": [
        "5 briefs per week",
        "10-25 briefs per week",
        "50+ briefs per week",
        "100 briefs per week"
      ],
      "correctAnswer": 1,
      "explanation": "10-25 briefs per week in a single 60-90 minute batch session is the sweet spot for solo founders with 5-7 hours/week on acquisition."
    },
    {
      "id": "q5",
      "question": "When should you regenerate a prospect brief?",
      "options": [
        "Every week regardless of age",
        "Never — briefs are permanent",
        "After 60+ days if you haven't reached out yet",
        "Only if the prospect changes companies"
      ],
      "correctAnswer": 2,
      "explanation": "Briefs go stale after 60+ days. Recent posts, company news, and timing signals change, so regenerate before reaching out to old prospects."
    },
    {
      "id": "q6",
      "question": "Which of these is a HIGH FRESH score signal?",
      "options": [
        "Prospect has 10+ years of experience",
        "Prospect posted yesterday about a relevant pain point",
        "Prospect works at a large company",
        "Prospect has a complete LinkedIn profile"
      ],
      "correctAnswer": 1,
      "explanation": "Recent content engagement is a FRESH signal (the 'E' in FRESH). Experience level and company size are background context, not timing signals."
    },
    {
      "id": "q7",
      "question": "What is the main purpose of the 'Outreach Angle' section in a prospect brief?",
      "options": [
        "To list all possible connection points",
        "To provide a recommended approach for first contact",
        "To summarize the prospect's career history",
        "To calculate the prospect's budget"
      ],
      "correctAnswer": 1,
      "explanation": "The Outreach Angle section recommends a specific approach based on FRESH signals and connection points — it's the actionable conclusion of the brief."
    },
    {
      "id": "q8",
      "question": "How many connection points should a quality brief include?",
      "options": [
        "1 connection point is enough",
        "2-3 connection points minimum",
        "3-5 connection points for multi-touch sequences",
        "10+ connection points for thoroughness"
      ],
      "correctAnswer": 2,
      "explanation": "3-5 connection points support multi-touch sequences (each touch uses a different point). More than 5 is overkill; fewer than 3 limits your options."
    }
  ]
}