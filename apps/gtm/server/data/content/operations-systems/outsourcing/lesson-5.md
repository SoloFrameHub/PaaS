---
title: "SOP 3: Prospect Research Tasks"
duration: "50 min"
track: "Operations & Systems"
course: "Course 43: Outsourcing & VAs"
lesson: 5
---

## Research Is the Difference Between Generic and Resonant

The fastest way to kill a cold outreach sequence is to send a message that could have been sent to anyone. "I help companies like yours grow revenue" lands in a delete folder. "I noticed Priya just joined as VP of Sales at Rowantech after three years at Salesforce — she probably inherited a pipeline visibility problem" gets a reply.

That level of personalization requires research. And research takes time — 15 to 30 minutes per prospect when you're doing it yourself. At $75/hour, that's $19-38 worth of your time per prospect before you've sent a single word.

This is exactly where a VA with a clear research SOP transforms your economics. A trained VA researching prospects at $6/hour — even with an AI assist — costs $1.50 to $3 per Prospect Brief. The same research, reliably documented, formatted the same way every time.

<InsightCard icon="🔍" title="Research Directly Drives Revenue">
Personalized outreach that references a specific trigger (job change, funding, product launch, published content) generates 3-5x higher reply rates than generic messaging. Your VA's job is to find those triggers and surface them before you write a single word of outreach.
</InsightCard>

## The Prospect Brief: Your Standard Research Deliverable

Every VA research session produces exactly one thing: a completed Prospect Brief. This is a single-page (or structured CRM record) summary of everything you need to send a relevant, personalized outreach message.

<FlipCard
  front="What makes a Prospect Brief useful?"
  back="A Prospect Brief is useful when it tells you something specific you can reference in outreach that the prospect will recognize as real interest in them — not a template. 'I saw your recent LinkedIn post about enterprise sales cycles' is useful. 'You work in sales' is not."
/>

<FlipCard
  front="What makes a Prospect Brief a waste of time?"
  back="A brief that contains only public information you could have found in 30 seconds (name, title, company) doesn't earn its research time. The value is in the trigger, the talking point, and the ICP fit score — the things that require synthesizing multiple sources."
/>

<FlipCard
  front="How long should research take per prospect?"
  back="Target: 10-15 minutes per Prospect Brief. A VA with AI assistance (ChatGPT or Perplexity for company summaries) can hit 8-10 minutes. Above 20 minutes means the SOP isn't specific enough, or the prospect is too obscure to research efficiently."
/>

## The Prospect Brief Template

<TemplateBuilder
  title="Prospect Brief Template"
  persistKey="outsourcing-L5-brief"
  sections={[
    {
      id: "contact",
      title: "Contact Details",
      fields: [
        { id: "name", label: "Full Name", placeholder: "e.g., Priya Sharma", type: "text" },
        { id: "title", label: "Current Title", placeholder: "e.g., VP Sales Operations", type: "text" },
        { id: "company", label: "Company", placeholder: "e.g., Rowantech", type: "text" },
        { id: "linkedin", label: "LinkedIn URL", placeholder: "e.g., linkedin.com/in/priyasharma", type: "text" },
        { id: "email", label: "Email (if found)", placeholder: "e.g., priya@rowantech.com or [not found]", type: "text" }
      ]
    },
    {
      id: "company-context",
      title: "Company Context",
      fields: [
        { id: "size", label: "Company Size (headcount)", placeholder: "e.g., 50-100 employees (LinkedIn estimate)", type: "text" },
        { id: "industry", label: "Industry", placeholder: "e.g., B2B SaaS — Sales Tech", type: "text" },
        { id: "funding", label: "Funding Stage (if applicable)", placeholder: "e.g., Series A ($8M, Dec 2025) — Crunchbase", type: "text" },
        { id: "recent-news", label: "Recent Company News (last 90 days)", placeholder: "e.g., Launched new enterprise tier in January. Posted 3 sales-focused job openings this month.", type: "textarea" }
      ]
    },
    {
      id: "trigger",
      title: "Research Trigger",
      fields: [
        { id: "trigger-type", label: "Trigger Type", placeholder: "e.g., Job Change / Funding / Product Launch / Recent Post / Podcast Appearance / Hiring Signal", type: "text" },
        { id: "trigger-detail", label: "Trigger Detail (specific + sourced)", placeholder: "e.g., Priya joined Rowantech 3 months ago from Salesforce (LinkedIn). This is her first VP role.", type: "textarea" },
        { id: "source", label: "Source Link(s)", placeholder: "e.g., linkedin.com/in/priyasharma, crunchbase.com/rowantech", type: "textarea" }
      ]
    },
    {
      id: "outreach",
      title: "Outreach Intelligence",
      fields: [
        { id: "icp-score", label: "ICP Fit Score (1-10)", placeholder: "e.g., 8/10 — Matches on company size, industry, hiring signals. Deducted for unclear budget stage.", type: "text" },
        { id: "talking-point", label: "Suggested Talking Point", placeholder: "e.g., 'Noticed you joined Rowantech three months ago from Salesforce — new VP roles often come with a mandate to fix inherited pipeline problems. Happy to share how we helped two other SaaS VPs in your situation.'", type: "textarea" },
        { id: "objections", label: "Likely Objections", placeholder: "e.g., 'We're still evaluating our tools' (early tenure), 'We just implemented something' (unknown CRM status)", type: "textarea" }
      ]
    }
  ]}
/>

## Research Sources: Priority Order

Your VA should work through sources in this order. Earlier sources are faster and more reliable. Later sources are used only when earlier sources don't yield enough information:

<ProgressiveReveal title="VA Research Source Priority" persistKey="outsourcing-L5-sources">

<RevealSection title="Source 1: LinkedIn (Always First)">

**Why first:** Most reliable, most up-to-date, most relevant for B2B outreach.

**What to check:**
- Current role and title (date started — recent = job change trigger)
- Previous companies and roles (career path context)
- Recent posts and activity (interests, priorities, what they share)
- Company page (headcount, recent activity, open roles)
- Mutual connections (potential warm intro paths)

**Time budget:** 4-5 minutes per prospect on LinkedIn.

**Key trigger to find:** Job change in the last 6 months. New VPs have 3-6 months to make their mark — they're open to tools that help them look good quickly.

</RevealSection>

<RevealSection title="Source 2: Company Website">

**Why:** Company website reveals positioning, messaging priorities, and what the company cares about right now.

**What to check:**
- About page (mission, team, founding story)
- Blog (recent posts, what topics they publish on)
- Press/news page (announcements, launches, partnerships)
- Careers page (what roles are open — a sales hiring surge signals growth + budget)

**Time budget:** 3-4 minutes. Focus on blog and careers — these change most often.

**Key trigger to find:** Product launch, partnership announcement, major hire, or aggressive sales team growth.

</RevealSection>

<RevealSection title="Source 3: Google News / Search">

**Why:** Surfaces news that companies don't announce on their own website.

**Search format:** "[Company name] news 2025" and "[Prospect full name] [company]"

**What to look for:** Press mentions, podcast appearances, industry awards, customer case studies they were featured in, keynote appearances.

**Time budget:** 2-3 minutes.

</RevealSection>

<RevealSection title="Source 4: Crunchbase (For Funded Companies)">

**Why:** Funding data tells you budget stage and growth velocity.

**What to check:** Funding history and dates, total raised, investor names, headcount trend.

**Triggers:**
- Raised in last 12 months → Growth mode, likely spending on tools
- Series A or B → Sales infrastructure investment phase
- Recently hired known sales-tech investors → Signal of planned sales investment

**Time budget:** 1-2 minutes — just check the snapshot page.

</RevealSection>

<RevealSection title="Source 5: AI-Assisted Synthesis (Perplexity or ChatGPT)">

**Why:** Summarizes public information quickly so VA can move faster.

**Prompt template for VA:** "Research [Company Name]. Give me: 1) What they do in one sentence. 2) Company size and funding stage if public. 3) Any significant news from the last 90 days. Keep it under 100 words and cite sources."

**Critical rule:** VA must verify every AI-generated claim against a primary source before entering it into the Prospect Brief. AI hallucinations about funding rounds or company size are embarrassing in outreach.

**Time budget:** 1-2 minutes with verification. This supplements sources 1-4, never replaces them.

</RevealSection>

</ProgressiveReveal>

## The Batch Research Workflow

Individual research is inefficient. Here's the system that makes research a predictable, scheduled operation rather than an ad-hoc task:

<SlideNavigation>
<Slide title="Monday: Founder Provides the List">

Every Monday morning, you give your VA a list of 10-20 prospects to research for the week. This list can come from:
- Your ICP prospecting spreadsheet (built in Course 40)
- LinkedIn Sales Navigator saved leads
- Attendee lists from events or webinars
- Warm referrals from your network
- Inbound leads that need research before you respond

Format: Name, Company, LinkedIn URL (if known), any context you already have.

You send this to your VA via Slack or a shared Google Sheet.

</Slide>

<Slide title="Tuesday-Wednesday: VA Researches and Delivers Briefs">

VA works through the list using the research SOP. Each brief takes 10-15 minutes. A 10-prospect list takes 2-3 hours.

VA delivers completed briefs by Wednesday EOD in your agreed format — either a Notion database, a Google Sheet, or directly in your CRM as enriched contact records.

**Quality check before delivery:** VA reviews each brief against the quality standards (all required fields completed, trigger has a source link, suggested talking point is specific not generic).

</Slide>

<Slide title="Thursday-Friday: Founder Reviews and Personalizes Outreach">

You review the briefs and write outreach using the talking points as inspiration — not as copy-paste. Your VA has done the research; you add your voice.

For any briefs that need additional research (prospect isn't on LinkedIn, company is private with minimal online presence), you flag them back to VA with specific questions.

If the brief quality is consistently below standard in certain areas (ICP score too generous, talking points too generic), you update the SOP with clearer examples rather than giving general feedback.

</Slide>
</SlideNavigation>

## ICP Fit Scoring: Teach Your VA Your Criteria

The ICP Fit Score (1-10) is only useful if your VA is scoring against consistent criteria. Vague scoring ("seems like a good fit") is worthless. Specific criteria ("deduct 2 points if company has under 10 employees") is valuable.

<ConceptReframe
  concept="ICP Fit Scoring"
  defaultLens="solo-founder"
  lenses={[
    {
      id: "solo-founder",
      label: "Solo Founder Perspective",
      explanation: "You know your ICP intuitively — you can feel whether a prospect is right in 30 seconds. But your VA doesn't have that intuition. ICP scoring forces you to make your gut explicit, so your VA can apply it consistently. A VA with clear scoring criteria produces better-qualified prospect lists than you could produce alone at scale."
    },
    {
      id: "va",
      label: "VA Perspective",
      explanation: "Without explicit criteria, every scoring decision requires judgment that only the founder has. This means the VA either scores incorrectly or asks questions constantly. Clear ICP criteria (company size range, industry, role seniority, tech stack, growth signals) let the VA score confidently without interrupting the founder for every edge case."
    },
    {
      id: "scale",
      label: "At Scale",
      explanation: "When your VA researches 50+ prospects per week, inconsistent ICP scoring means you spend your Thursday review time re-qualifying everyone instead of writing outreach. Consistent criteria mean the Thursday session is reviewing briefs, not re-doing research. This is the difference between a system and a task."
    }
  ]}
/>

Use this to define your ICP scoring criteria for your VA:

<TemplateBuilder
  title="ICP Scoring Criteria for Your VA"
  persistKey="outsourcing-L5-icp"
  sections={[
    {
      id: "positive",
      title: "Positive Score Signals (+1 to +3 points each)",
      fields: [
        { id: "size", label: "Company Size Range That Earns Points", placeholder: "e.g., 10-100 employees = +2 points. 100-500 = +1 point.", type: "text" },
        { id: "industry", label: "Industries That Earn Points", placeholder: "e.g., B2B SaaS = +2. Professional services = +1.", type: "text" },
        { id: "role", label: "Roles/Titles That Earn Points", placeholder: "e.g., VP Sales, CRO, Head of Revenue = +2. Sales Manager = +1.", type: "text" },
        { id: "triggers", label: "Growth Signals That Earn Points", placeholder: "e.g., Recent funding = +2. Hiring surge in sales = +2. New leadership = +1.", type: "text" }
      ]
    },
    {
      id: "negative",
      title: "Negative Score Signals (-1 to -3 points each)",
      fields: [
        { id: "too-small", label: "Company Signals That Lose Points", placeholder: "e.g., Under 5 employees = -3. No LinkedIn company page = -1.", type: "text" },
        { id: "wrong-stage", label: "Stage Signals That Lose Points", placeholder: "e.g., Pre-revenue = -2. No visible sales function = -1.", type: "text" },
        { id: "wrong-role", label: "Role Signals That Lose Points", placeholder: "e.g., Individual contributor (no budget authority) = -2.", type: "text" }
      ]
    }
  ]}
/>

## Quality Standards: What "Good Research" Looks Like

<SwipeDecision
  title="Good Brief vs. Poor Brief"
  description="Review each research output and judge: acceptable quality or needs revision?"
  optionA="Needs Revision"
  optionB="Acceptable Quality"
  persistKey="outsourcing-L5-swipe"
  cards={[
    { id: "1", content: "Suggested talking point: 'I noticed you work in sales at a growing company. We help sales teams like yours improve their process.'", correctOption: "a", explanation: "This is completely generic — it could apply to any sales professional at any company. Not acceptable. The talking point must reference something specific to this person." },
    { id: "2", content: "Suggested talking point: 'Noticed you posted last week about pipeline forecasting accuracy — we worked with a similar-stage SaaS company that cut forecast variance by 40%. Happy to share what changed.'", correctOption: "b", explanation: "Specific, sourced (LinkedIn post), relevant. This shows real research and gives the prospect a reason to reply." },
    { id: "3", content: "Recent trigger: 'Company is growing.' Source: N/A.", correctOption: "a", explanation: "Not acceptable. 'Company is growing' with no source is guesswork, not research. The trigger must have a specific source link — a Crunchbase funding round, a LinkedIn jobs page showing new openings, a press release." },
    { id: "4", content: "ICP Score: 8/10. Rationale: 'Series B SaaS company, 80 employees, VP of Sales hired 3 months ago. Deducted 2 for unknown tech stack — can't confirm CRM use.'", correctOption: "b", explanation: "This is good scoring — specific, criteria-referenced, honest about what's unknown. The VA is applying the scoring rubric, not guessing." },
    { id: "5", content: "Prospect Brief completed in 8 minutes. All fields filled. Trigger sourced from LinkedIn activity. ICP score includes reasoning.", correctOption: "b", explanation: "Efficient and complete. This is what a trained VA produces by week three." }
  ]}
/>

## AI-Assisted Research: Speed Without Sacrificing Accuracy

Your VA can use AI tools to accelerate research — but only with strict verification requirements:

<InsightCard icon="🤖" title="The VA + AI Research Combination">
Perplexity or ChatGPT can summarize a company's background in 60 seconds. That's 3-4 minutes of VA browsing time saved per prospect. But AI models hallucinate funding rounds, company sizes, and personnel details. The rule is: AI generates the draft, VA verifies every factual claim against a primary source before it enters the Prospect Brief.
</InsightCard>

<MiniRoleplay
  scenario="Your VA comes to you on Slack: 'I researched TechCorp using ChatGPT and it says they raised a $12M Series A in 2024. But I can't find a press release or Crunchbase entry confirming this. Should I include it in the brief?'"
  role="You (the founder)"
  persistKey="outsourcing-L5-roleplay"
  modelResponse="Do not include unverified funding information. If you can't find a primary source (Crunchbase, TechCrunch, company press release, or SEC filing) confirming the funding round, mark it as 'Funding: Not publicly confirmed.' You can note that ChatGPT suggested a Series A but could not verify it. We never put unverified financial claims in outreach material — if the prospect knows it's wrong, we lose credibility immediately. For this brief, use the company size and growth signals you can verify from their LinkedIn jobs page and website instead."
/>

<InteractiveChecklist
  title="Your Action Items Before Lesson 6"
  persistKey="outsourcing-L5-actions"
  items={[
    "Complete your Prospect Brief template in the TemplateBuilder above",
    "Define your ICP Scoring Criteria with specific point values for each signal",
    "Write the research source priority list for your VA (which sources to check, in what order)",
    "Set your quality standards: what does an unacceptable brief look like vs. an acceptable one?",
    "Create your Monday research request format (how you'll send the prospect list to your VA each week)",
    "Read Lesson 6 to learn how to hire, onboard, and manage your VA without micromanaging"
  ]}
/>

## What's Next

In **Lesson 6**, you'll move from SOPs to execution: how to write a job post that attracts qualified candidates, how to design a paid test task that filters applicants, and how to run a 4-week onboarding that gets your VA to 90% accuracy without you babysitting every output.

You now have three SOPs. The next step is getting the right person to run them.
