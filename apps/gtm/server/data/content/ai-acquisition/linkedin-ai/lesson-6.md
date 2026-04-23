---
title: "Sales Navigator + AI: The Bootstrapped Workflow"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 25: LinkedIn AI Applications"
lesson: 6
---

<InsightCard icon="💰" title="The $100/Month Prospecting Stack">
Sales Navigator ($99.99/mo) + ChatGPT ($20/mo) = a prospecting system that would have cost $10K+ in SDR time just 3 years ago. But only if you build the workflow correctly.
</InsightCard>

## The Bootstrapped Reality

You're a solo founder. You don't have a team of SDRs doing research, a marketing ops person managing lists, or a sales engineer building prospect briefs.

You have **5-7 hours per week** for acquisition. Maybe 90 minutes on Monday morning. 30 minutes Tuesday through Thursday. An hour on Friday.

The question isn't "Should I use Sales Navigator?" — it's "How do I extract maximum value from Sales Nav in minimum time using AI to do the heavy lifting?"

Here's what that looks like in practice:

**Sarah, a B2B SaaS founder**, spent her first 3 months on LinkedIn manually searching for prospects. She'd spend 2 hours finding 10 qualified leads, then another hour researching each one before reaching out. **Total: 12 hours for 10 personalized connection requests.**

After implementing the Sales Nav + AI workflow you're about to learn, she now processes 25 prospects per week in 2.5 hours total. Her connection acceptance rate went from 18% to 47%. Her DM reply rate jumped from 8% to 31%.

The difference? She stopped doing what AI does better (research, pattern matching, draft generation) and focused on what only she can do (strategic decisions, authentic relationship building, closing deals).

<RangeSlider 
  label="How many hours per week do you currently spend on LinkedIn prospecting?" 
  min={0} 
  max={20} 
  lowLabel="0 hours" 
  highLabel="20+ hours" 
  persistKey="linkedin-ai-L6-time-spent" 
/>

---

## Section 1: Sales Navigator Core Features (The Foundation)

Sales Navigator isn't just "LinkedIn with better search." It's a prospecting database with 900M+ profiles, updated in real-time, with intent signals baked in.

Here's what you're paying $99.99/month for:

### Advanced Search (Boolean Logic)

Standard LinkedIn search: "Marketing Manager" in "Software" with "500-1000 employees"

Sales Navigator search: 
```
(CMO OR "VP Marketing" OR "Head of Growth") 
AND (B2B OR SaaS OR "enterprise software") 
AND NOT agency 
AND "Changed jobs in past 90 days"
```

That last filter — **"Changed jobs in past 90 days"** — is worth the entire subscription. New-in-role prospects are **3x more likely to respond** to outreach. They're evaluating vendors, building their stack, and haven't been bombarded yet.

<FlipCard 
  front="Why are 'Changed Jobs' prospects 3x more responsive?" 
  back="New role = new budget, new priorities, no existing vendor relationships. They're in evaluation mode for the next 90-180 days. After that, they've made their choices and gone dark." 
/>

### Saved Searches (Auto-Updated)

You build a search once. Sales Navigator updates it daily with new matches. Every Monday morning, you have 10-50 fresh prospects who fit your exact ICP.

No more "let me spend 2 hours finding leads." You spend 2 hours **once**, then harvest results weekly.

### Lead Lists (Organized Prospecting)

Think of these as CRM-lite. You can:
- Save prospects to lists ("Q1 Outreach," "Engaged with Content," "Sent Connection Request")
- Add notes and tags
- Track activity (job changes, company news, content posts)
- Set reminders for follow-up

The workflow: Saved Search → Review new matches → Add top 25 to "This Week's Outreach" list → AI research layer (next section) → Engage and connect.

### InMail Credits (50/month on Core Plan)

InMail = message anyone on LinkedIn, even if you're not connected.

**Open rates: 10-25%** for well-targeted, personalized InMails. Compare that to cold email (1-3% for unknown addresses) or cold LinkedIn connection requests without a note (15-25% acceptance).

The catch: You only get 50/month. Use them strategically — high-value prospects, decision-makers you can't reach any other way, or warm leads who haven't accepted your connection request.

<ExampleCard label="InMail vs. Connection Request Strategy">
**Scenario:** You want to reach the VP of Sales at a 200-person B2B SaaS company.

**Option A (Connection Request):** 30-50% acceptance rate if you have a personalized note and mutual connections. If accepted, you can DM unlimited. Cost: $0.

**Option B (InMail):** 15-25% open rate, but you can reach them immediately without waiting for acceptance. Cost: 1 of your 50 monthly credits.

**The hybrid approach:** Send connection request with personalized note. If no acceptance in 7 days, follow up with InMail referencing your connection request. This shows persistence without being spammy.
</ExampleCard>

### Account Mapping (See the Org Chart)

Sales Navigator shows you who else works at the target company, their roles, and how they're connected. This is gold for:
- Multi-threading (reaching multiple stakeholders)
- Finding warm intro paths (mutual connections)
- Understanding decision-making structure

<InteractiveChecklist 
  title="Sales Navigator Setup Checklist" 
  persistKey="linkedin-ai-L6-setup" 
  items={[
    "Upgrade to Sales Navigator Core ($99.99/mo or $79.99/mo annual)",
    "Complete your own LinkedIn profile (headline, about, experience) — prospects will check",
    "Set up 3-5 saved searches based on your ICP",
    "Create lead lists: 'This Week,' 'Engaged,' 'Connected,' 'In Conversation'",
    "Install Evaboot browser extension for CSV exports (optional, $29/mo)"
  ]} 
/>

---

## Section 2: ICP to Sales Nav Filters (The Translation Layer)

You have an ICP document from Course 21. It says something like:

> **Target:** B2B SaaS companies, 50-200 employees, Series A-B funded, selling to mid-market, with a marketing team of 5-15 people, struggling with attribution and pipeline visibility.

Now you need to translate that into Sales Navigator filters. This is where AI becomes your research assistant.

### The Boolean Builder Prompt

Copy this into ChatGPT or Claude:

```
Given this ICP:

[PASTE YOUR ICP DOCUMENT]

Generate 3 Sales Navigator Boolean search strings optimized for finding prospects who match this profile. 

For each search string:
1. Include job titles (use OR logic for variations)
2. Include company characteristics (industry, size, funding stage)
3. Include exclusion terms (NOT logic) to filter out poor fits
4. Suggest 2-3 intent signals to layer on (job changes, company growth, recent posts)

Format as copy-paste ready Boolean strings.
```

<TemplateBuilder
  title="ICP to Boolean Search Builder"
  persistKey="linkedin-ai-L6-boolean"
  sections={[
    {
      id: "icp",
      title: "Your ICP Summary",
      fields: [
        { id: "role", label: "Target Job Titles", placeholder: "e.g., VP Marketing, CMO, Head of Growth", type: "text" },
        { id: "company", label: "Company Characteristics", placeholder: "e.g., B2B SaaS, 50-200 employees, Series A-B", type: "textarea" },
        { id: "pain", label: "Primary Pain Point", placeholder: "e.g., Can't attribute revenue to marketing spend", type: "textarea" }
      ]
    },
    {
      id: "filters",
      title: "Sales Nav Filter Ideas (AI-Generated)",
      fields: [
        { id: "boolean", label: "Boolean Search String", placeholder: "AI will generate this based on your ICP above", type: "textarea", readonly: true },
        { id: "intent", label: "Intent Signals to Add", placeholder: "e.g., Changed jobs in past 90 days, Posted in past 30 days", type: "textarea", readonly: true }
      ]
    }
  ]}
/>

### Example Translation

**ICP Input:**
> Marketing leaders at B2B SaaS companies, 50-200 employees, Series A-B funded, struggling with attribution.

**AI-Generated Boolean String:**
```
(CMO OR "VP Marketing" OR "Head of Marketing" OR "Director of Marketing") 
AND ("B2B SaaS" OR "enterprise software" OR "B2B software") 
AND (Series A OR Series B OR "venture backed") 
NOT (agency OR consultant OR freelance)
```

**Intent Signal Filters to Add:**
- Changed jobs in past 90 days (new role = new priorities)
- Company headcount growth 10%+ in past year (scaling = budget)
- Posted on LinkedIn in past 30 days (active on platform)

### The 3 Saved Search Archetypes

Don't build one giant search. Build 3 targeted ones:

1. **High-Intent Prospects** — Changed jobs recently + company growth signals + posted about relevant topics
2. **Engaged Prospects** — Liked/commented on your posts or posts in your niche
3. **Lookalike Prospects** — Similar to your best current customers (use "Similar to" feature in Sales Nav)

<SlideNavigation>
<Slide title="Search 1: High-Intent">
**Filters:**
- Job title: Your ICP roles
- Company size: Your ICP range
- Changed jobs: Past 90 days
- Company growth: 10%+ headcount increase

**Why it works:** New role + growing company = budget and urgency.

**Expected volume:** 10-30 new matches per week.
</Slide>

<Slide title="Search 2: Engaged">
**Filters:**
- Job title: Your ICP roles
- Engaged with your content: Yes
- OR: Posted about [your topic] in past 30 days

**Why it works:** They already know who you are or care about the problem you solve.

**Expected volume:** 5-15 new matches per week.
</Slide>

<Slide title="Search 3: Lookalike">
**Filters:**
- Similar to: [Your best customer's LinkedIn profile]
- Job title: Same as best customer
- Company size: Same range

**Why it works:** If they look like your best customer, they probably have similar needs.

**Expected volume:** 20-50 new matches per week.
</Slide>
</SlideNavigation>

---

## Section 3: The AI Research Layer (The Efficiency Multiplier)

Sales Navigator finds the prospects. AI researches them. You make the strategic decisions and build the relationships.

Here's the weekly rhythm:

### Monday Morning (30 minutes): Review & Select

1. Open your 3 saved searches
2. Review new matches (50-100 total across all searches)
3. Scan profiles for 30 seconds each
4. Add top 25 to "This Week's Outreach" list

**What you're looking for in those 30 seconds:**
- Profile photo (real person, not logo or blank)
- Headline matches ICP (not generic "Helping businesses grow")
- Recent activity (posted in past 30 days)
- Shared connections or interests

<RangeSlider 
  label="How many prospects can you realistically research and reach out to per week?" 
  min={5} 
  max={50} 
  lowLabel="5 prospects" 
  highLabel="50+ prospects" 
  persistKey="linkedin-ai-L6-capacity" 
/>

### Tuesday-Thursday (20 minutes per day): AI Research + Engagement

For each of your top 25 prospects, you need to know:
1. What they care about (recent posts, company priorities)
2. Why they might need your solution (pain points, recent changes)
3. How to start a conversation (connection points, shared interests)

**Manual research:** 15-30 minutes per prospect = 6-12 hours for 25 people. Impossible.

**AI-assisted research:** 2-3 minutes per prospect = 50-75 minutes for 25 people. Doable.

### The AI Prospect Brief Workflow

**Step 1:** Copy prospect's LinkedIn profile summary (name, headline, about section, recent posts)

**Step 2:** Paste into this ChatGPT prompt:

```
You are a sales research assistant. Given the following LinkedIn profile information, generate a 1-page prospect brief (300-500 words) following this structure:

1. PROSPECT OVERVIEW
   - Role, company, tenure
   - Key responsibilities (inferred from headline/about)

2. COMPANY CONTEXT
   - Size, stage, recent news/funding
   - Growth signals or challenges

3. CONTENT ANALYSIS
   - What they post about (topics, tone)
   - Their stated positions or priorities

4. CONNECTION POINTS
   - Mutual connections (if any)
   - Shared interests, background, or communities
   - Recent activity that suggests timing

5. OUTREACH ANGLE
   - Recommended approach based on above
   - Specific reference point for personalization
   - Likely pain point to address

Here's the prospect information:

[PASTE PROFILE DATA]
```

**Step 3:** Review AI-generated brief, highlight 2-3 key points for your connection request note

**Step 4:** Engage with their content (like, comment) for 2-3 days before sending connection request

<ExampleCard label="AI Prospect Brief Example">
**Prospect:** Jessica Chen, VP of Marketing at DataFlow (Series B SaaS, 120 employees)

**AI-Generated Brief (Excerpt):**

**PROSPECT OVERVIEW**
Jessica Chen is VP of Marketing at DataFlow, a B2B SaaS platform for data pipeline automation. She joined 4 months ago from a similar role at a smaller startup. Her headline emphasizes "data-driven growth" and "pipeline attribution."

**CONTENT ANALYSIS**
Recent posts focus on:
- Attribution challenges (posted 2 weeks ago about "black box marketing spend")
- Team scaling (hiring 3 new marketers this quarter)
- Event marketing ROI (questioning trade show spend)

**CONNECTION POINTS**
- Mutual connection: Tom Rivera (former colleague at her previous company)
- Shared interest: Posted about "Predictable Revenue" book
- Recent activity: Commented on a post about marketing attribution tools

**OUTREACH ANGLE**
Reference her recent post about attribution challenges. Mention you saw her comment on the attribution tools thread. Offer a specific framework or case study related to pipeline visibility for Series B SaaS companies. Timing is ideal — she's 4 months into the role and actively evaluating solutions.
</ExampleCard>

### The Engagement Sequence (Before Connection Request)

Don't cold-connect. Warm them up first:

**Day 1:** Like their most recent post
**Day 2:** Comment substantively on a post (use AI to draft, then edit for authenticity)
**Day 3:** Like + comment on another post or article
**Day 4:** Send connection request with personalized note

This 3-day engagement window increases acceptance rates from 30% to 50%+.

<ComparisonBuilder
  title="Connection Request Note"
  persistKey="linkedin-ai-L6-connection-note"
  prompt="Write a connection request note for your top prospect (max 300 characters)"
  expertExample="Hi Jessica — saw your post on attribution challenges. We're solving exactly that for Series B SaaS teams. Tom Rivera suggested I reach out. Would love to connect."
  criteria={[
    "References specific content or activity",
    "Mentions mutual connection or shared context",
    "States clear reason to connect that benefits them",
    "Under 300 characters (LinkedIn limit)"
  ]}
/>

---

## Section 4: The Weekly Sales Nav + AI Rhythm (The Operating System)

This is your repeatable weekly workflow. It takes **2.5-3 hours per week** and generates **10-25 new qualified connections** and **3-8 conversations** that can turn into meetings.

<SlideNavigation>
<Slide title="Monday (30 min): Harvest & Select">
**Tasks:**
1. Open 3 saved searches
2. Review 50-100 new matches
3. Quick-scan profiles (30 sec each)
4. Add top 25 to "This Week's Outreach" list
5. Export to CSV with Evaboot (optional)

**Output:** 25 prospects queued for research
</Slide>

<Slide title="Tuesday (60 min): Research & Engage">
**Tasks:**
1. Generate AI prospect briefs for top 10 (20 min)
2. Engage with their content (like + comment on 2-3 posts each) (30 min)
3. Add notes to Sales Nav lead cards (10 min)

**Output:** 10 prospects warmed up, ready for connection requests tomorrow
</Slide>

<Slide title="Wednesday (60 min): Research & Engage (Batch 2)">
**Tasks:**
1. Generate AI prospect briefs for next 10 (20 min)
2. Engage with their content (30 min)
3. Send connection requests to Tuesday's batch with personalized notes (10 min)

**Output:** 10 more prospects warmed up, 10 connection requests sent
</Slide>

<Slide title="Thursday (30 min): Final Batch + Follow-Up">
**Tasks:**
1. Quick research on final 5 prospects (10 min)
2. Engage with their content (10 min)
3. Send connection requests to Wednesday's batch (10 min)

**Output:** 5 more prospects engaged, 10 more connection requests sent
</Slide>

<Slide title="Friday (30 min): Accept & Respond">
**Tasks:**
1. Accept incoming connection requests (5 min)
2. Review accepted connections from this week (10 min)
3. Send value-first DMs to newly accepted connections (15 min)

**Output:** 5-15 new conversations started

**Value-first DM template:**
"Thanks for connecting, [Name]! I saw your post about [topic] — we're working on exactly that with [similar companies]. Would you be open to a quick 15-min call to share what's working for us?"
</Slide>
</SlideNavigation>

### The Numbers (What to Expect)

Based on this workflow:

- **25 prospects researched per week** = 100/month
- **25 connection requests sent per week** = 100/month
- **Connection acceptance rate: 30-50%** = 30-50 new connections/month
- **DM reply rate: 20-40%** = 6-20 conversations/month
- **Conversation-to-meeting rate: 25-40%** = 2-8 meetings/month

**At a 20% close rate, that's 0.4-1.6 new customers per month from LinkedIn alone.**

For a $5K ACV product, that's **$2K-8K MRR** from 2.5 hours/week of effort.

<ScenarioSimulator
  title="LinkedIn Prospecting ROI Calculator"
  persistKey="linkedin-ai-L6-roi"
  levers={[
    { id: "prospects", label: "Prospects researched per week", min: 10, max: 50, step: 5, defaultValue: 25 },
    { id: "acceptance", label: "Connection acceptance rate (%)", min: 20, max: 60, step: 5, defaultValue: 40 },
    { id: "reply", label: "DM reply rate (%)", min: 10, max: 50, step: 5, defaultValue: 30 },
    { id: "meeting", label: "Conversation-to-meeting rate (%)", min: 15, max: 50, step: 5, defaultValue: 30 },
    { id: "close", label: "Meeting-to-close rate (%)", min: 10, max: 40, step: 5, defaultValue: 20 },
    { id: "acv", label: "Average Contract Value ($)", min: 1000, max: 20000, step: 1000, defaultValue: 5000 }
  ]}
  outputs={[
    { id: "connections", label: "New connections/month", formula: "(prospects * 4 * (acceptance / 100))", unit: "", precision: 0 },
    { id: "conversations", label: "Conversations/month", formula: "(prospects * 4 * (acceptance / 100) * (reply / 100))", unit: "", precision: 0 },
    { id: "meetings", label: "Meetings/month", formula: "(prospects * 4 * (acceptance / 100) * (reply / 100) * (meeting / 100))", unit: "", precision: 1 },
    { id: "customers", label: "New customers/month", formula: "(prospects * 4 * (acceptance / 100) * (reply / 100) * (meeting / 100) * (close / 100))", unit: "", precision: 1 },
    { id: "mrr", label: "Monthly new MRR", formula: "(prospects * 4 * (acceptance / 100) * (reply / 100) * (meeting / 100) * (close / 100) * acv)", unit: "$", precision: 0 }
  ]}
  insight="At `{meetings}` meetings/month and a `{close}`% close rate, you're generating $`{mrr}`/month in new MRR. That's a {(mrr / 120).toFixed(0)}x ROI on your $120/month tool spend (Sales Nav + ChatGPT)."
/>

---

## Section 5: InMail vs. Connection Request Strategy (The Decision Framework)

You have 50 InMail credits per month. When do you use them vs. connection requests?

### Use Connection Requests When:

✅ You have mutual connections (warm intro path)
✅ You've engaged with their content for 3+ days
✅ They're active on LinkedIn (posted in past 30 days)
✅ You're targeting mid-level roles (managers, directors)
✅ You have time to wait 3-7 days for acceptance

**Acceptance rate: 30-50% with personalized note**

### Use InMail When:

✅ No mutual connections and cold outreach
✅ Targeting C-level or VPs (harder to connect with)
✅ Time-sensitive opportunity (event, funding announcement, job change)
✅ They haven't accepted your connection request in 7+ days
✅ High-value prospect worth the credit

**Open rate: 10-25% for well-targeted InMail**

### The Hybrid Approach (Best Practice)

1. Send connection request with personalized note
2. If no acceptance in 7 days, send InMail referencing your connection request
3. InMail message: "Hi [Name], I sent a connection request last week but wanted to reach out directly. [Value proposition]. Would you be open to a quick call?"

This shows persistence without being spammy. It also gives you two chances to get their attention.

<DecisionTree
  title="InMail or Connection Request?"
  persistKey="linkedin-ai-L6-decision-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "You've identified a high-value prospect. What's your first move?", 
      choices: [
        { label: "Check for mutual connections", nextNodeId: "mutual" },
        { label: "Send InMail immediately", nextNodeId: "inmail-early" }
      ]
    },
    { 
      id: "mutual", 
      content: "You have 2 mutual connections. What do you do?", 
      choices: [
        { label: "Engage with their content for 3 days, then send connection request", nextNodeId: "engage" },
        { label: "Ask mutual connection for intro", nextNodeId: "intro" }
      ]
    },
    { 
      id: "engage", 
      content: "You've engaged with their content. They accepted your connection request. What's next?", 
      isTerminal: true, 
      outcome: "positive",
      feedback: "Perfect! Now send a value-first DM. Your engagement warmed them up."
    },
    { 
      id: "intro", 
      content: "Mutual connection introduces you. They accept and reply to your DM.", 
      isTerminal: true, 
      outcome: "positive",
      feedback: "Warm intros are gold. This is the highest-converting path."
    },
    { 
      id: "inmail-early", 
      content: "You sent InMail without warming them up. Open rate: 8%. No reply.", 
      isTerminal: true, 
      outcome: "negative",
      feedback: "InMail works better when you've engaged first or have no other path. Try the connection request + engagement approach next time."
    }
  ]}
/>

---

## Section 6: Saved Search Strategies (The Intent Signal Playbook)

Not all saved searches are created equal. Here are the 5 highest-converting search strategies:

### 1. Changed Jobs in Past 90 Days

**Why it works:** New role = new priorities, new budget, no existing vendor relationships. They're in evaluation mode.

**Filters:**
- Job title: Your ICP roles
- Changed jobs: Past 90 days
- Company size: Your ICP range

**Expected conversion:** 3x higher response rate than static prospects

### 2. Posted in Past 30 Days

**Why it works:** Active on LinkedIn = more likely to see and respond to your outreach. Also signals they care about the topics they post about.

**Filters:**
- Job title: Your ICP roles
- Posted on LinkedIn: Past 30 days
- Keywords in posts: [Your solution category]

**Expected conversion:** 2x higher acceptance rate

### 3. Company Headcount Growth 10%+

**Why it works:** Growing companies = hiring = budget = need for tools to scale.

**Filters:**
- Job title: Your ICP roles
- Company headcount growth: 10%+ in past year
- Company size: Your ICP range

**Expected conversion:** 2.5x higher meeting booking rate

### 4. Shares Connections

**Why it works:** Mutual connections = warm intro path = trust signal.

**Filters:**
- Job title: Your ICP roles
- Shares connections: Yes (2+ mutual connections)
- Company size: Your ICP range

**Expected conversion:** 50-70% connection acceptance rate (vs. 30-40% for cold)

### 5. Similar to Best Customer

**Why it works:** If they look like your best customer, they probably have similar needs.

**Filters:**
- Similar to: [Your best customer's profile]
- Job title: Same as best customer
- Company size: Same range

**Expected conversion:** 1.5-2x higher close rate (better fit)

<ClassifyExercise
  title="Classify These Prospects by Intent Level"
  persistKey="linkedin-ai-L6-classify"
  categories={[
    { id: "hot", label: "Hot (Reach out now)", color: "#ef4444" },
    { id: "warm", label: "Warm (Engage first)", color: "#f59e0b" },
    { id: "cold", label: "Cold (Low priority)", color: "#3b82f6" }
  ]}
  items={[
    { 
      id: "1", 
      content: "VP Marketing, changed jobs 30 days ago, company grew 25% headcount, posted about attribution challenges", 
      correctCategory: "hot",
      explanation: "Multiple high-intent signals: new role, growth, active on platform, stated pain point. Reach out immediately."
    },
    { 
      id: "2", 
      content: "Director of Sales, same role for 3 years, company static size, hasn't posted in 6 months", 
      correctCategory: "cold",
      explanation: "No intent signals. Low priority unless you have a specific reason to reach out."
    },
    { 
      id: "3", 
      content: "CMO, posted 2 weeks ago about marketing ops, 1 mutual connection, company raised Series B 4 months ago", 
      correctCategory: "warm",
      explanation: "Good signals (active, funding, mutual connection) but not urgent. Engage with content first, then connect."
    },
    { 
      id: "4", 
      content: "Head of Growth, changed jobs 60 days ago, company hiring 5 marketers this quarter, liked your recent post", 
      correctCategory: "hot",
      explanation: "New role + hiring = budget and urgency. Already aware of you. Reach out now."
    },
    { 
      id: "5", 
      content: "Marketing Manager, same company 5 years, posted about industry trends (not pain points), no mutual connections", 
      correctCategory: "warm",
      explanation: "Active on platform but no strong intent signals. Engage with content to build familiarity before connecting."
    }
  ]}
/>

---

## Section 7: CRM Integration & Lead Tracking (The System)

Sales Navigator is great for finding prospects. But you need a system to track them through the pipeline.

### The Minimum Viable CRM Stack

**Option 1: Sales Navigator + Google Sheets (Free)**
- Export leads to CSV with Evaboot ($29/mo)
- Track status in Google Sheets (columns: Name, Company, Status, Last Touch, Next Action)
- Manual but functional

**Option 2: Sales Navigator + HubSpot Free CRM**
- Sync leads with Surfe browser extension ($29/mo)
- Automatic activity tracking
- Email integration
- Pipeline view

**Option 3: Sales Navigator + Attio ($29/mo)**
- Modern CRM built for solo founders
- LinkedIn integration
- Relationship intelligence
- Clean UI

### The Lead Status Workflow

Every prospect moves through these stages:

1. **Identified** — Found in saved search, added to list
2. **Researched** — AI brief generated, notes added
3. **Engaged** — Liked/commented on their content
4. **Connected** — Connection request sent
5. **Accepted** — They accepted, now in your network
6. **Conversation** — DM exchange started
7. **Meeting Booked** — Call scheduled
8. **Opportunity** — Qualified, in active sales process
9. **Customer** — Closed deal
10. **Disqualified** — Not a fit, archived

<InteractiveChecklist 
  title="Your Weekly CRM Hygiene Tasks" 
  persistKey="linkedin-ai-L6-crm-tasks" 
  items={[
    "Update lead status for all prospects you engaged with this week",
    "Add notes from any DM conversations or calls",
    "Set follow-up reminders for prospects who went dark",
    "Archive disqualified leads (not a fit, wrong timing)",
    "Review pipeline: How many in each stage? Where are bottlenecks?"
  ]} 
/>

---

## Your Action Items

You've learned the workflow. Now it's time to build it.

<InteractiveChecklist 
  title="Implementation Sprint (This Week)" 
  persistKey="linkedin-ai-L6-actions" 
  items={[
    "Upgrade to Sales Navigator Core (or start 30-day trial)",
    "Build 3 saved searches based on your ICP (high-intent, engaged, lookalike)",
    "Generate AI prospect briefs for your top 10 prospects using the prompt template",
    "Engage with content from 10 prospects (like + substantive comment)",
    "Send 5 connection requests with personalized notes",
    "Set up your CRM tracking system (Google Sheets, HubSpot, or Attio)",
    "Block 2.5 hours on your calendar for next week's prospecting rhythm"
  ]} 
/>

---

## Quiz: Sales Navigator + AI Workflow

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What is the #1 highest-converting intent signal in Sales Navigator?",
      "options": [
        "Posted in past 30 days",
        "Changed jobs in past 90 days",
        "Company headcount growth 10%+",
        "Shares mutual connections"
      ],
      "correctAnswer": 1,
      "explanation": "Prospects who changed jobs in the past 90 days are 3x more likely to respond. They're in evaluation mode for new tools and haven't built vendor relationships yet."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "How long should you engage with a prospect's content before sending a connection request?",
      "options": [
        "Same day (no warm-up needed)",
        "1-2 days",
        "3-4 days",
        "7+ days"
      ],
      "correctAnswer": 2,
      "explanation": "3-4 days of engagement (likes + comments) increases acceptance rates from 30% to 50%+. It shows genuine interest and makes you familiar before you ask to connect."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "When should you use InMail instead of a connection request?",
      "options": [
        "Always — InMail has higher open rates",
        "For C-level prospects with no mutual connections",
        "Never — connection requests are always better",
        "Only after they've ignored 3+ connection requests"
      ],
      "correctAnswer": 1,
      "explanation": "InMail works best for hard-to-reach prospects (C-level, VPs) with no mutual connections or when you need immediate attention (time-sensitive opportunity). Use your 50 monthly credits strategically."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "What's the ideal weekly prospecting volume for a solo founder using this workflow?",
      "options": [
        "5-10 prospects",
        "25-30 prospects",
        "50-75 prospects",
        "100+ prospects"
      ],
      "correctAnswer": 1,
      "explanation": "25-30 prospects per week is sustainable in 2.5-3 hours. Quality over quantity. Each prospect gets AI research, content engagement, and personalized outreach."
    },
    {
      "id": "q5",
      "type": "true-false",
      "question": "True or False: AI-generated prospect briefs should be used as-is without editing.",
      "correctAnswer": false,
      "explanation": "False. AI briefs save 70-80% of research time, but you must review and highlight the 2-3 key points that matter for YOUR outreach. The AI doesn't know your positioning or offer — you do."
    }
  ]
}