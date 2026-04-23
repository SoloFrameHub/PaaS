---
title: "Prospecting & List Building with AI + Data Tools"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 21: AI Acquisition Strategy"
lesson: 2
---

You've mapped the AI acquisition landscape. Now it's time to build your first real asset: a list of prospects who actually match your ICP.

Here's the problem most solo founders face: they know *who* they want to reach, but translating "mid-market SaaS CTOs struggling with data integration" into an actual list of 200 qualified contacts feels like alchemy.

It's not. It's a repeatable system. And in 2026, AI tools can do 70% of the heavy lifting—if you know how to orchestrate them.

## The ICP-to-List Translation Problem

<InsightCard icon="🎯" title="The Translation Gap">
Your ICP document says "B2B SaaS companies, 50-200 employees, using Salesforce, recently raised Series A." Apollo's search interface has 47 filter options. Which ones matter? In what combination? And how do you avoid the 10,000-result trap where 95% are garbage?
</InsightCard>

Most founders waste 3-5 hours per week on manual prospecting because they're missing the translation layer between strategy and execution.

**The AI-native approach:** Use LLMs to convert your ICP into precise Boolean search strings, then layer enrichment waterfalls to fill gaps.

<FlipCard 
  front="What is a 'waterfall enrichment'?" 
  back="A sequential data lookup strategy: Try Source A for email → if no result, try Source B → if still nothing, try Source C. Clay automates this across 75+ providers, stopping when it finds valid data." 
/>

Let's build your system step by step.

---

## Step 1: From ICP to Search Filters

You already defined your ICP in Course 1. Now we translate it into tool-specific filters.

<TemplateBuilder
  title="ICP-to-Filter Translation Matrix"
  persistKey="ai-acquisition-strategy-L2-icp-filters"
  sections={[
    {
      id: "firmographic",
      title: "Firmographic Criteria",
      fields: [
        { id: "industry", label: "Industry/Vertical", placeholder: "e.g., B2B SaaS, E-commerce, Healthcare Tech", type: "text" },
        { id: "size", label: "Company Size (employees)", placeholder: "e.g., 50-200", type: "text" },
        { id: "revenue", label: "Revenue Range (if known)", placeholder: "e.g., $5M-50M ARR", type: "text" },
        { id: "location", label: "Geographic Focus", placeholder: "e.g., US, UK, Remote-first", type: "text" }
      ]
    },
    {
      id: "technographic",
      title: "Tech Stack Signals",
      fields: [
        { id: "tools", label: "Tools They Use", placeholder: "e.g., Salesforce, HubSpot, Stripe", type: "textarea" },
        { id: "antiTools", label: "Tools They DON'T Use (gaps)", placeholder: "e.g., No marketing automation", type: "textarea" }
      ]
    },
    {
      id: "intent",
      title: "Intent Signals",
      fields: [
        { id: "triggers", label: "Trigger Events", placeholder: "e.g., Recent funding, job changes, product launch", type: "textarea" },
        { id: "behavior", label: "Behavioral Signals", placeholder: "e.g., Posted about [topic], attended [event]", type: "textarea" }
      ]
    }
  ]}
/>

Once you've filled this out, we'll use it to generate Apollo filters, LinkedIn Sales Navigator searches, and Clay enrichment recipes.

---

## Step 2: Apollo Deep Dive for Solo Founders

Apollo is the workhorse for solo founders. Here's why:

- **Free tier:** 10,000 records/month, 5 mobile credits (enough to test)
- **Basic plan ($49/mo):** Unlimited email credits, 1,200 mobile credits, export up to 10K contacts
- **Data accuracy:** 85-92% for business emails (industry average)

<ExampleCard label="Real Numbers: Apollo Free vs. Paid">
**Scenario:** You need 200 qualified prospects/month.

- **Free tier:** 10K records = plenty. But only 5 mobile credits = almost no direct dials. Email-only outreach.
- **Basic ($49/mo):** Unlimited emails + 1,200 mobile credits = 6 calls/day if you want. Most solo founders stay here for 6-12 months.

**When to upgrade to Pro ($99/mo):** You're doing 500+ outreach/month AND need intent data (who's researching competitors, visiting your site).
</ExampleCard>

### Building Your First Apollo List

<SlideNavigation>
<Slide title="Step 1: Set Core Filters">

Start with the obvious:
- **Industry:** Use Apollo's taxonomy (they have 150+ categories)
- **Company Size:** Employees (not revenue—revenue data is spotty)
- **Location:** Country or state-level

**Pro tip:** Don't use more than 5 filters in your first pass. Over-filtering = zero results.

</Slide>

<Slide title="Step 2: Add Tech Stack Filters">

Apollo tracks 10,000+ technologies. This is gold for niche targeting.

Example filters:
- Uses Salesforce (CRM signal)
- Uses Stripe (payment processing = likely SaaS)
- Does NOT use HubSpot (gap you can fill)

**Warning:** Tech stack data is 60-70% accurate. Use it to *prioritize*, not exclude.

</Slide>

<Slide title="Step 3: Layer Intent Signals">

Apollo Pro includes intent data:
- Recently visited competitor sites
- Researching keywords related to your category
- Job changes in past 90 days

<ContextualNote showWhen={{ budget: "basic" }} variant="warning" title="On Basic Plan?">
Skip intent filters in Apollo. You'll add them manually via LinkedIn and news monitoring in Step 4.
</ContextualNote>

</Slide>

<Slide title="Step 4: Export & Verify">

Apollo gives you:
- Name, title, company
- Email (business email, 85-92% accuracy)
- LinkedIn URL
- Phone (if you have credits)

**Critical step:** Verify emails before sending. Use MillionVerifier (~$0.003/email) or NeverBounce.

Email decay rate: **2-3% per month**. A 90-day-old list is 6-9% invalid.

</Slide>
</SlideNavigation>

<RangeSlider 
  label="How confident are you in building Apollo searches right now?" 
  min={1} 
  max={10} 
  lowLabel="Lost" 
  highLabel="Ready to build" 
  persistKey="ai-acquisition-strategy-L2-apollo-confidence" 
/>

---

## Step 3: Clay Waterfall Enrichment

Apollo gives you the basics. Clay fills the gaps.

**The waterfall model:** Check 75+ data sources sequentially until you find what you need.

<FlipCard 
  front="Why not just use Apollo for everything?" 
  back="Apollo's data is 85-92% accurate. That means 8-15% of your list has bad emails. Clay's waterfall checks multiple providers (Hunter, Snov.io, RocketReach, Clearbit) to find the 'freshest' data, dramatically improving accuracy." 
/>

### Clay Pricing Reality Check

| Plan | Cost | Credits/Month | Use Case |
|------|------|---------------|----------|
| Free | $0 | 100 credits | Testing only (10-20 enrichments) |
| Starter | $149/mo | 2,000 credits | 200-400 enrichments/month |
| Explorer | $349/mo | 10,000 credits | 1,000-2,000 enrichments/month |

**Solo founder sweet spot:** Start with Apollo + free Clay for 1-2 months. Upgrade to Starter ($149) when you're sending 200+ emails/week consistently.

### Building a Clay Waterfall

<TemplateBuilder
  title="Your Clay Enrichment Recipe"
  persistKey="ai-acquisition-strategy-L2-clay-recipe"
  sections={[
    {
      id: "inputs",
      title: "Input Data (from Apollo)",
      fields: [
        { id: "name", label: "Full Name", placeholder: "e.g., Sarah Chen", type: "text" },
        { id: "company", label: "Company Name", placeholder: "e.g., Acme Corp", type: "text" },
        { id: "linkedin", label: "LinkedIn URL", placeholder: "e.g., linkedin.com/in/sarahchen", type: "text" }
      ]
    },
    {
      id: "enrichments",
      title: "Enrichment Sequence",
      fields: [
        { id: "email", label: "Email Waterfall", placeholder: "1. Hunter.io → 2. Apollo → 3. RocketReach", type: "textarea" },
        { id: "phone", label: "Phone Waterfall (optional)", placeholder: "1. Apollo → 2. Lusha", type: "textarea" },
        { id: "signals", label: "Intent Signals", placeholder: "Recent LinkedIn posts, company news, job changes", type: "textarea" }
      ]
    },
    {
      id: "personalization",
      title: "AI Personalization Inputs",
      fields: [
        { id: "icebreaker", label: "Icebreaker Source", placeholder: "e.g., Recent LinkedIn post, company blog, podcast appearance", type: "textarea" }
      ]
    }
  ]}
/>

**The magic:** Clay can scrape LinkedIn posts, company news, podcast guest lists, and feed them into AI icebreaker prompts—all automatically.

---

## Step 4: LinkedIn Sales Navigator + AI Research

Sales Navigator is the premium prospecting layer. At $99.99/month (or $79.99/year), it's expensive but powerful.

<InsightCard icon="💡" title="When to Add Sales Nav">
Add it when:
1. You're consistently sending 100+ emails/week
2. Your ICP is senior (VP+) and hard to find via Apollo
3. You need real-time intent signals (job changes, posts, engagement)

Skip it if you're still testing your ICP or budget is tight.
</InsightCard>

### Sales Navigator's Unique Advantages

1. **Advanced Boolean Search:** Combine title, industry, company size, keywords in ways Apollo can't
2. **Job Change Alerts:** Prospects who changed jobs in past 90 days are **3x more likely to buy**
3. **Engagement Signals:** See who's posting about your category, engaging with competitors
4. **Saved Searches:** Auto-update daily with new matches

### The AI Research Layer

Here's where ChatGPT/Claude/Perplexity come in.

**Workflow:**
1. Export 50 leads from Sales Navigator
2. Feed LinkedIn URLs into ChatGPT with this prompt:

```
You are a B2B sales researcher. For each LinkedIn profile URL, extract:
- Current role and company
- Recent posts (last 30 days) about [your category]
- Career trajectory (promotions, job changes)
- Potential pain points based on role

Format as JSON.
```

3. Use output to prioritize top 20% for manual personalization

<RangeSlider 
  label="How much time per week can you dedicate to manual prospect research?" 
  min={0} 
  max={10} 
  lowLabel="0 hours" 
  highLabel="10+ hours" 
  persistKey="ai-acquisition-strategy-L2-research-time" 
/>

---

## Step 5: Free & Low-Cost Data Sources

You don't need expensive tools for everything. Here are underrated free sources:

<SlideNavigation>
<Slide title="Crunchbase (Free Tier)">

**What you get:**
- Funding announcements (trigger event!)
- Company size, industry, location
- Founder/exec names

**How to use:** Search for "recently funded" + your industry. Export to CSV (limited to 50/month on free tier).

**Pro tip:** Companies that raised in the last 90 days are **2-5x more likely** to invest in new tools.

</Slide>

<Slide title="Product Hunt">

**What you get:**
- Founders launching products (high intent!)
- Early adopters commenting on launches
- Tech stack signals (what they're building with)

**How to use:** Search for products in your category. Scrape founder profiles. Reach out with "Congrats on the launch" angle.

</Slide>

<Slide title="Reddit & Niche Communities">

**What you get:**
- People actively asking for solutions
- Pain points in their own words
- Buying signals ("What tool should I use for X?")

**How to use:** Monitor subreddits like r/SaaS, r/Entrepreneur, r/marketing. Use Perplexity to summarize threads and identify prospects.

</Slide>

<Slide title="Podcast Guest Lists">

**What you get:**
- Experts in your space (potential partners or customers)
- Their LinkedIn profiles
- Topics they care about (personalization gold)

**How to use:** Find podcasts your ICP listens to. Scrape guest lists. Reach out with "Loved your episode on X" angle.

</Slide>
</SlideNavigation>

---

## Step 6: Your Prospect Research SOP

Time to systematize everything you've learned.

<InteractiveChecklist 
  title="Your Prospect Research SOP" 
  persistKey="ai-acquisition-strategy-L2-sop" 
  items={[
    "Define ICP criteria (firmographic, technographic, intent)",
    "Build Apollo search with 3-5 core filters",
    "Export 200-500 prospects to CSV",
    "Upload to Clay for waterfall enrichment (email, phone, signals)",
    "Run AI research on LinkedIn URLs (top 20% only)",
    "Verify emails with MillionVerifier or NeverBounce",
    "Score leads using Fit + Signal + Friction model (Lesson 4)",
    "Import to CRM with tags (segment, score, source)",
    "Set up weekly refresh cadence (new leads every Monday)"
  ]} 
/>

### The Research Depth Pyramid

Not all prospects deserve equal research time.

<FlipCard 
  front="The Research Depth Pyramid" 
  back="Top 20% (score 8-10): 30+ min manual research. Middle 50% (score 5-7): 5 min AI-assisted. Bottom 30% (score 1-4): Template + segment personalization only." 
/>

This is how you stay under 5-7 hours/week while maintaining quality.

---

## Guided Build: Your First AI-Powered List

Let's build a real list right now.

<TemplateBuilder
  title="Build Your First 50-Prospect List"
  persistKey="ai-acquisition-strategy-L2-first-list"
  sections={[
    {
      id: "icp",
      title: "ICP Snapshot",
      fields: [
        { id: "target", label: "Target Customer (1 sentence)", placeholder: "e.g., B2B SaaS founders doing $10K-50K MRR", type: "text" },
        { id: "pain", label: "Primary Pain Point", placeholder: "e.g., Can't scale outbound without hiring", type: "text" }
      ]
    },
    {
      id: "apollo",
      title: "Apollo Search Strategy",
      fields: [
        { id: "filters", label: "Top 3 Filters", placeholder: "e.g., Industry: SaaS, Employees: 10-50, Location: US", type: "textarea" },
        { id: "keywords", label: "Job Title Keywords", placeholder: "e.g., Founder, CEO, Head of Growth", type: "text" }
      ]
    },
    {
      id: "enrichment",
      title: "Enrichment Plan",
      fields: [
        { id: "sources", label: "Data Sources (in order)", placeholder: "e.g., 1. Apollo, 2. Hunter.io, 3. LinkedIn", type: "textarea" },
        { id: "signals", label: "Intent Signals to Track", placeholder: "e.g., Recent funding, job change, posted about hiring", type: "textarea" }
      ]
    },
    {
      id: "timeline",
      title: "Execution Timeline",
      fields: [
        { id: "deadline", label: "Target Completion Date", placeholder: "e.g., Friday this week", type: "text" },
        { id: "volume", label: "Target List Size", placeholder: "e.g., 50 prospects", type: "text" }
      ]
    }
  ]}
/>

---

## Common Pitfalls (And How to Avoid Them)

<ClassifyExercise
  title="Good List vs. Bad List"
  persistKey="ai-acquisition-strategy-L2-classify"
  categories={[
    { id: "good", label: "Good List", color: "#10b981" },
    { id: "bad", label: "Bad List", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "200 B2B SaaS founders, 10-50 employees, raised seed in last 6 months", correctCategory: "good" },
    { id: "2", content: "10,000 'small business owners' from Apollo with no filters", correctCategory: "bad" },
    { id: "3", content: "50 prospects from LinkedIn who posted about your category in last 30 days", correctCategory: "good" },
    { id: "4", content: "500 emails scraped from a conference attendee list (no permission)", correctCategory: "bad" },
    { id: "5", content: "100 prospects enriched with recent LinkedIn posts + company news", correctCategory: "good" },
    { id: "6", content: "1,000 prospects with 40% invalid emails (not verified)", correctCategory: "bad" }
  ]}
/>

---

## Your Action Items

<InteractiveChecklist 
  title="This Week's Prospecting Sprint" 
  persistKey="ai-acquisition-strategy-L2-actions" 
  items={[
    "Complete ICP-to-Filter Translation Matrix",
    "Build your first Apollo search (aim for 200-500 results)",
    "Export 50 prospects and verify emails",
    "Set up a Clay account (free tier to start)",
    "Run AI research on top 10 prospects (LinkedIn URLs → ChatGPT)",
    "Document your Research SOP in a Google Doc or Notion",
    "Schedule 90 minutes next Monday for weekly list refresh"
  ]} 
/>

---

## What's Next

You now have a repeatable system for building high-quality prospect lists in 2-3 hours/week instead of 10+.

In **Lesson 3**, we'll tackle the next layer: **AI Personalization at Scale**. You'll learn the "Draft + Human Gate" model—how to use AI to generate personalized icebreakers for 100+ prospects while maintaining authenticity and avoiding the "creepy AI" trap.

**Preview question:** If AI can write personalized emails at scale, why do 87% of recipients still ignore them? The answer isn't "better prompts." It's understanding the difference between *personalization* and *relevance*.

See you in Lesson 3.