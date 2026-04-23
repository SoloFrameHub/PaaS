---
title: "Agent 3: CRM Enrichment Agent"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 5
---

# Agent 3: CRM Enrichment Agent

## The $3,000 Mistake

Sarah had been running cold outreach for 6 weeks. Her reply rate was stuck at 2%. She couldn't figure out why — her emails looked good, her targeting seemed right, her value prop was clear.

Then she ran a data audit.

**47% of her "VP Marketing" contacts weren't VPs anymore.** They'd changed jobs 3-8 months ago. Her CRM was a graveyard of stale data, and she'd been emailing ghosts.

The cost? 6 weeks of sending time. Roughly 1,500 emails to wrong people. At a 10% reply rate to the *right* people, she'd missed ~75 conversations. At her $2K ACV and 20% close rate, that's **$3,000 in lost revenue** from data decay alone.

<InsightCard icon="⚠️" title="The Hidden Tax">
CRM data decays at 2-3% per month. Without enrichment, 25-36% of your records go stale in a year. Every stale record is a wasted send, a damaged sender reputation point, and a missed opportunity.
</InsightCard>

Today you're building the agent that prevents this: **the CRM Enrichment Agent**. It keeps your data fresh, fills in missing fields, and flags problems before they cost you deals.

---

## What Is CRM Enrichment?

**Enrichment** = automatically filling in missing data fields and updating changed information in your CRM.

When you add a contact, you typically have:
- Name
- Email (maybe)
- Company (maybe)
- Role (maybe)

An enrichment agent adds:
- **Company data**: employee count, funding stage, tech stack, industry, HQ location
- **Contact verification**: email validity, LinkedIn URL, phone, timezone
- **Activity signals**: last LinkedIn post, job tenure, recent company news
- **Fit scoring**: ICP match score, priority tier, recommended channel

<FlipCard 
  front="Why Not Just Enrich Once?" 
  back="Because data changes. People switch jobs (15-20% annually), companies get acquired, emails bounce, phone numbers change. Enrichment is a continuous process, not a one-time task." 
/>

### The Two Enrichment Modes

<SlideNavigation>
<Slide title="Event-Driven Enrichment">

**Trigger:** New contact added to CRM

**What it does:**
- Runs immediately when a contact is created
- Fills in all missing fields using waterfall sources
- Verifies email deliverability
- Calculates ICP fit score
- Tags for priority/channel

**Best for:** Keeping new leads ready for outreach within minutes

**Example flow:**
1. You import 50 contacts from LinkedIn
2. Agent runs on each within 5 minutes
3. 45/50 get full company data
4. 42/50 get verified emails
5. All 50 get ICP scores and priority tags
6. High-priority contacts trigger research agent (Agent 1)

</Slide>

<Slide title="Scheduled Enrichment">

**Trigger:** Weekly/monthly cron job

**What it does:**
- Refreshes records older than 90 days
- Re-verifies emails that haven't been checked in 60 days
- Updates company data (funding, size, news)
- Flags contacts who changed jobs
- Removes duplicates

**Best for:** Maintaining data quality over time

**Example flow:**
1. Every Sunday at 2am, agent runs
2. Selects all contacts with `last_enriched < 90 days ago`
3. Re-checks company size, funding, job titles
4. Finds 12 contacts who changed companies
5. Tags them "Needs Re-qualification"
6. Sends you a Slack summary

</Slide>
</SlideNavigation>

---

## The Waterfall Enrichment Pattern

No single data source has 100% coverage. The trick is **waterfall enrichment**: try Source A → if missing, try Source B → if missing, try Source C.

<ExampleCard label="Real Coverage Numbers">

**Email enrichment waterfall:**
- Apollo.io: 60-70% coverage (free tier: 10K/month)
- Hunter.io: +10-15% coverage (free: 25/month, paid: $49/mo)
- Snov.io: +5% coverage ($39/mo)
- **Total coverage: 75-90%**

**Company data waterfall:**
- Apollo.io: 65% coverage (free)
- Clearbit: +20% coverage ($99/mo)
- Google search scraping: +10% coverage (free, slower)
- **Total coverage: 85-95%**

</ExampleCard>

The waterfall maximizes coverage while minimizing cost. You only hit paid APIs when free ones fail.

<RangeSlider 
  label="What's your current CRM data completeness?" 
  min={0} 
  max={100} 
  lowLabel="0% (just names)" 
  highLabel="100% (fully enriched)" 
  persistKey="custom-ai-agents-L5-completeness" 
/>

---

## Enrichment Fields: What to Collect

### B2B SaaS / Service Business

<TemplateBuilder
  title="B2B Enrichment Schema"
  persistKey="custom-ai-agents-L5-b2b-schema"
  sections={[
    {
      id: "company",
      title: "Company Fields",
      fields: [
        { id: "size", label: "Employee Count", placeholder: "e.g., 50-200", type: "text" },
        { id: "funding", label: "Funding Stage", placeholder: "e.g., Series A, Bootstrapped", type: "text" },
        { id: "industry", label: "Industry", placeholder: "e.g., SaaS, E-commerce", type: "text" },
        { id: "tech_stack", label: "Tech Stack (if relevant)", placeholder: "e.g., Salesforce, HubSpot, Stripe", type: "textarea" }
      ]
    },
    {
      id: "contact",
      title: "Contact Fields",
      fields: [
        { id: "title_verified", label: "Title Verification", placeholder: "Current title from LinkedIn", type: "text" },
        { id: "tenure", label: "Job Tenure", placeholder: "e.g., 2 years 3 months", type: "text" },
        { id: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/...", type: "text" },
        { id: "timezone", label: "Timezone", placeholder: "e.g., America/New_York", type: "text" }
      ]
    },
    {
      id: "activity",
      title: "Activity Signals",
      fields: [
        { id: "last_post", label: "Last LinkedIn Post Date", placeholder: "e.g., 2025-01-15", type: "text" },
        { id: "posting_freq", label: "Posting Frequency", placeholder: "e.g., 2-3x/week", type: "text" },
        { id: "recent_news", label: "Recent Company News", placeholder: "Funding, acquisition, product launch", type: "textarea" }
      ]
    }
  ]}
/>

### Creator / Coach / Consultant

<TemplateBuilder
  title="Creator Enrichment Schema"
  persistKey="custom-ai-agents-L5-creator-schema"
  sections={[
    {
      id: "audience",
      title: "Audience Fields",
      fields: [
        { id: "size", label: "Audience Size", placeholder: "e.g., 15K Twitter, 8K email", type: "text" },
        { id: "platforms", label: "Primary Platforms", placeholder: "e.g., Twitter, YouTube, Newsletter", type: "text" },
        { id: "niche", label: "Content Niche", placeholder: "e.g., SaaS marketing, productivity", type: "text" }
      ]
    },
    {
      id: "monetization",
      title: "Monetization Signals",
      fields: [
        { id: "model", label: "Revenue Model", placeholder: "e.g., Courses, Coaching, Sponsorships", type: "text" },
        { id: "products", label: "Known Products", placeholder: "e.g., $500 course, $2K coaching", type: "textarea" }
      ]
    },
    {
      id: "activity",
      title: "Activity Signals",
      fields: [
        { id: "frequency", label: "Content Frequency", placeholder: "e.g., Daily tweets, weekly newsletter", type: "text" },
        { id: "recent_launch", label: "Recent Launch", placeholder: "New product, community, partnership", type: "textarea" }
      ]
    }
  ]}
/>

<InsightCard icon="🎯" title="The 80/20 Rule">
Focus on the 5-7 fields that actually impact your outreach quality. More data ≠ better outreach. **Relevant** data = better outreach.
</InsightCard>

---

## Building the Enrichment Agent: Step-by-Step

<ProgressiveReveal title="The 6-Step Enrichment Flow" persistKey="custom-ai-agents-L5-flow">

<RevealSection title="Step 1: Email Verification">

**Why it matters:** 15-25% of emails in purchased/scraped lists are invalid. Sending to them damages your sender reputation.

**How it works:**
1. Check email syntax (regex validation)
2. Verify domain has MX records (DNS lookup)
3. Check against known disposable email domains
4. Optionally: SMTP verification (risky — can trigger spam filters)

**Tools:**
- **MillionVerifier** ($8/1K emails, 99% accuracy)
- **NeverBounce** ($8/1K emails)
- **Zerobounce** ($16/1K emails, includes spam trap detection)
- **Free option:** EmailListVerify (100 free/day)

**Output fields:**
- `email_status`: "valid" | "invalid" | "risky" | "unknown"
- `email_verified_date`: timestamp
- `verification_source`: "MillionVerifier"

**Code snippet (n8n HTTP Request node):**

```javascript
// MillionVerifier API call
{
  "method": "GET",
  "url": "https://api.millionverifier.com/api/v3/",
  "qs": {
    "api": "YOUR_API_KEY",
    "email": "{{$json.email}}",
    "timeout": "10"
  }
}

// Response parsing
{
  "email_status": "{{$json.result}}", // "ok", "invalid", "catch_all", "unknown"
  "email_verified_date": "{{$now}}",
  "verification_source": "MillionVerifier"
}
```

</RevealSection>

<RevealSection title="Step 2: Company Data Enrichment">

**Why it matters:** Company size, stage, and tech stack determine ICP fit and personalization angles.

**Waterfall sequence:**

1. **Apollo.io** (free tier: 10K lookups/month)
   - Input: company domain
   - Output: employee count, industry, funding, technologies
   - Coverage: ~65%

2. **Clearbit** (if Apollo fails, $99/mo)
   - Input: company domain
   - Output: employee count, funding, category, description
   - Coverage: +20%

3. **Google search scraping** (if both fail, free but slow)
   - Input: company name + "employees" or "funding"
   - Output: scraped employee count from LinkedIn company page
   - Coverage: +10%

**Code snippet (n8n workflow):**

```javascript
// Node 1: Apollo Company Lookup
IF company_data is empty:
  HTTP Request → Apollo API
  Parse response → company_size, funding_stage, industry, tech_stack

// Node 2: Clearbit Fallback (only if Apollo failed)
IF company_size is still empty:
  HTTP Request → Clearbit Enrichment API
  Parse response → company_size, funding_stage

// Node 3: Google Fallback (only if both failed)
IF company_size is still empty:
  HTTP Request → Google Custom Search API
  Extract employee count from LinkedIn company page snippet
```

**Output fields:**
- `company_size`: integer (employee count)
- `funding_stage`: "Seed" | "Series A" | "Series B+" | "Bootstrapped" | "Public"
- `industry`: string
- `tech_stack`: array of strings (e.g., ["Salesforce", "HubSpot"])
- `company_enriched_date`: timestamp

</RevealSection>

<RevealSection title="Step 3: Contact Data Enrichment">

**Why it matters:** LinkedIn URLs enable activity tracking. Phone numbers enable multi-channel outreach. Timezone enables send-time optimization.

**What to collect:**

1. **LinkedIn URL**
   - Source: Apollo, Hunter, or Google search for "[Name] [Company] LinkedIn"
   - Validation: check URL returns 200, profile is public
   - Fallback: manual search prompt if automated fails

2. **Phone Number** (optional, for high-value prospects)
   - Source: Apollo (5 mobile credits/month on free tier)
   - Use case: only for prospects with ICP score ≥8
   - Compliance: check against DNC lists if calling

3. **Timezone**
   - Source: derive from company HQ location or contact's stated location
   - Tool: `moment-timezone` library or Google Timezone API
   - Use case: send emails at 9am *their* time, not yours

**Code snippet:**

```javascript
// LinkedIn URL finder (Google Custom Search)
{
  "method": "GET",
  "url": "https://www.googleapis.com/customsearch/v1",
  "qs": {
    "key": "YOUR_API_KEY",
    "cx": "YOUR_SEARCH_ENGINE_ID",
    "q": "{{$json.name}} {{$json.company}} LinkedIn"
  }
}

// Extract first result that contains "linkedin.com/in/"
linkedin_url = results.items[0].link

// Timezone detection
{
  "method": "GET",
  "url": "https://maps.googleapis.com/maps/api/timezone/json",
  "qs": {
    "location": "{{$json.company_hq_lat}},{{$json.company_hq_lng}}",
    "timestamp": "{{Math.floor(Date.now() / 1000)}}",
    "key": "YOUR_API_KEY"
  }
}

timezone = response.timeZoneId // e.g., "America/New_York"
```

</RevealSection>

<RevealSection title="Step 4: Activity Signal Collection">

**Why it matters:** Recent LinkedIn activity = engagement signal. Job tenure = stability/authority indicator. Recent company news = trigger event for outreach.

**What to collect:**

1. **Last LinkedIn Post Date**
   - Source: LinkedIn profile scraping (Phantombuster, Apify) or manual check
   - Frequency: check every 30 days
   - Signal: posted in last 7 days = "active," 30+ days = "inactive"

2. **Job Tenure**
   - Source: LinkedIn profile (start date of current role)
   - Calculation: `today - start_date`
   - Signal: &lt;6 months = "new to role," 2+ years = "established"

3. **Recent Company News**
   - Source: Google News API, Crunchbase, company blog RSS
   - Lookback: last 30 days
   - Keywords: "funding," "acquisition," "launch," "hiring," "expansion"

**Code snippet (Google News API):**

```javascript
{
  "method": "GET",
  "url": "https://newsapi.org/v2/everything",
  "qs": {
    "q": "{{$json.company}}",
    "from": "{{$now.minus({days: 30}).toISODate()}}",
    "sortBy": "publishedAt",
    "apiKey": "YOUR_API_KEY"
  }
}

// Parse top 3 articles
recent_news = response.articles.slice(0, 3).map(a => ({
  title: a.title,
  url: a.url,
  date: a.publishedAt
}))
```

</RevealSection>

<RevealSection title="Step 5: ICP Fit Scoring">

**Why it matters:** Not all enriched contacts are worth reaching out to. Score them so you prioritize the best fits.

**Scoring rubric (example for B2B SaaS):**

| Criterion | Points | Logic |
|-----------|--------|-------|
| Company size in range | 3 | 10-500 employees = 3, else 0 |
| Funding stage matches | 2 | Seed/Series A = 2, else 0 |
| Tech stack overlap | 2 | Uses 1+ of your integrations = 2 |
| Recent trigger event | 2 | Funding/launch in last 60 days = 2 |
| Decision-maker title | 1 | VP/Director/Head = 1, else 0 |
| **Total** | **10** | |

**Code snippet:**

```javascript
let score = 0

// Company size
if (company_size >= 10 && company_size <= 500) score += 3

// Funding stage
if (["Seed", "Series A"].includes(funding_stage)) score += 2

// Tech stack overlap
const target_stack = ["Salesforce", "HubSpot", "Stripe"]
if (tech_stack.some(t => target_stack.includes(t))) score += 2

// Recent news (funding/launch)
if (recent_news.some(n => n.title.match(/funding|launch|raises/i))) score += 2

// Title
if (title.match(/VP|Director|Head|Chief/i)) score += 1

// Save score
icp_score = score
priority = score >= 7 ? "High" : score >= 4 ? "Medium" : "Low"
```

</RevealSection>

<RevealSection title="Step 6: CRM Update & Notification">

**Why it matters:** Enrichment is useless if it doesn't flow back into your CRM and trigger next actions.

**What to update:**

1. **All enriched fields** (company_size, email_status, linkedin_url, etc.)
2. **Metadata fields**:
   - `last_enriched`: timestamp
   - `next_refresh`: timestamp (today + 90 days)
   - `enrichment_source`: "Apollo + MillionVerifier"
3. **Tags**:
   - Priority tier: "High Priority" | "Medium Priority" | "Low Priority"
   - Status flags: "Invalid Email" | "Changed Jobs" | "Stale Data"

**What to notify:**

- **Slack/Email:** High-priority contacts (ICP score ≥8)
- **Slack/Email:** Invalid emails or job changes (so you can replace/re-qualify)
- **Dashboard:** Weekly summary (X contacts enriched, Y high-priority, Z issues)

**Code snippet (n8n CRM update + Slack notification):**

```javascript
// CRM Update (HubSpot example)
{
  "method": "PATCH",
  "url": "https://api.hubapi.com/crm/v3/objects/contacts/{{$json.contact_id}}",
  "headers": {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
  },
  "body": {
    "properties": {
      "company_size": "{{$json.company_size}}",
      "funding_stage": "{{$json.funding_stage}}",
      "email_status": "{{$json.email_status}}",
      "icp_score": "{{$json.icp_score}}",
      "last_enriched": "{{$now}}"
    }
  }
}

// Slack Notification (if high-priority)
IF icp_score >= 8:
  {
    "method": "POST",
    "url": "https://slack.com/api/chat.postMessage",
    "headers": {
      "Authorization": "Bearer YOUR_SLACK_TOKEN"
    },
    "body": {
      "channel": "#sales-alerts",
      "text": "🎯 High-fit prospect enriched: {{$json.name}} ({{$json.company}}) — ICP Score: {{$json.icp_score}}/10"
    }
  }
```

</RevealSection>

</ProgressiveReveal>

---

## Cost & Token Economics

<ScenarioSimulator
  title="Enrichment Cost Calculator"
  persistKey="custom-ai-agents-L5-cost-calc"
  levers={[
    { id: "contacts", label: "New contacts per week", min: 10, max: 500, step: 10, defaultValue: 50 },
    { id: "emailVerify", label: "Email verification rate (%)", min: 0, max: 100, step: 10, defaultValue: 100 },
    { id: "companyPaid", label: "% needing paid company API", min: 0, max: 50, step: 5, defaultValue: 20 }
  ]}
  outputs={[
    { id: "emailCost", label: "Email verification cost/week", formula: "(contacts * (emailVerify / 100) * 0.008)", unit: "$", precision: 2 },
    { id: "companyCost", label: "Company data cost/week", formula: "(contacts * (companyPaid / 100) * 0.05)", unit: "$", precision: 2 },
    { id: "totalWeekly", label: "Total weekly cost", formula: "(emailCost + companyCost)", unit: "$", precision: 2 },
    { id: "totalMonthly", label: "Total monthly cost", formula: "(totalWeekly * 4)", unit: "$", precision: 2 }
  ]}
  insight="At `{contacts}` contacts/week, your enrichment costs ~${totalMonthly}/month. Apollo's free tier (10K/month) covers {contacts * 4} contacts, so you're within the free limit."
/>

**Key cost drivers:**

| Service | Free Tier | Paid Tier | When to Upgrade |
|---------|-----------|-----------|-----------------|
| Apollo.io | 10K contacts/mo | $49/mo (Unlimited) | When you exceed 10K/mo |
| MillionVerifier | None | $8/1K emails | Always needed for verification |
| Clearbit | None | $99/mo | Only if Apollo coverage &lt;80% |
| Google News API | 100 requests/day | N/A | Sufficient for most |

**Solo founder budget:** $10-30/month for enrichment (mostly email verification). Apollo free tier + MillionVerifier covers 90% of use cases.

---

## Building Your Enrichment Agent

<InteractiveChecklist 
  title="Enrichment Agent Build Checklist" 
  persistKey="custom-ai-agents-L5-build-checklist" 
  items={[
    "Define your enrichment schema (5-7 critical fields)",
    "Sign up for Apollo.io (free tier) and MillionVerifier",
    "Set up n8n workflow: Trigger = New CRM contact",
    "Configure waterfall: Apollo → Clearbit (if needed) → Google",
    "Add email verification step (MillionVerifier API)",
    "Build ICP scoring logic (10-point rubric)",
    "Map enriched fields to CRM custom properties",
    "Set up Slack notification for high-priority contacts",
    "Configure scheduled refresh (weekly, for records >90 days old)",
    "Test with 10 sample contacts and verify accuracy"
  ]} 
/>

### Live Build: n8n Enrichment Workflow

Let's build the actual workflow together. You'll create this in n8n (or adapt to Zapier/Make).

<TemplateBuilder
  title="n8n Enrichment Workflow Spec"
  persistKey="custom-ai-agents-L5-workflow-spec"
  sections={[
    {
      id: "trigger",
      title: "Trigger Configuration",
      fields: [
        { id: "trigger_type", label: "Trigger Type", placeholder: "Webhook, CRM new contact, Schedule", type: "text" },
        { id: "trigger_source", label: "Source", placeholder: "HubSpot, Pipedrive, Airtable", type: "text" }
      ]
    },
    {
      id: "email_verify",
      title: "Email Verification Step",
      fields: [
        { id: "verify_service", label: "Service", placeholder: "MillionVerifier, NeverBounce", type: "text" },
        { id: "verify_threshold", label: "Minimum confidence", placeholder: "e.g., 95%", type: "text" }
      ]
    },
    {
      id: "company_enrich",
      title: "Company Enrichment Step",
      fields: [
        { id: "primary_source", label: "Primary Source", placeholder: "Apollo.io", type: "text" },
        { id: "fallback_source", label: "Fallback Source", placeholder: "Clearbit, Google", type: "text" },
        { id: "required_fields", label: "Required Fields", placeholder: "company_size, funding_stage, industry", type: "textarea" }
      ]
    },
    {
      id: "scoring",
      title: "ICP Scoring Logic",
      fields: [
        { id: "size_range", label: "Target Company Size", placeholder: "e.g., 10-500 employees", type: "text" },
        { id: "funding_stages", label: "Target Funding Stages", placeholder: "e.g., Seed, Series A", type: "text" },
        { id: "tech_stack", label: "Target Tech Stack", placeholder: "e.g., Salesforce, HubSpot", type: "textarea" },
        { id: "high_score_threshold", label: "High-Priority Threshold", placeholder: "e.g., 7/10", type: "text" }
      ]
    },
    {
      id: "output",
      title: "Output Configuration",
      fields: [
        { id: "crm_fields", label: "CRM Fields to Update", placeholder: "company_size, icp_score, last_enriched", type: "textarea" },
        { id: "notification_channel", label: "Notification Channel", placeholder: "Slack, Email, None", type: "text" },
        { id: "notification_threshold", label: "Notify When ICP Score ≥", placeholder: "e.g., 8", type: "text" }
      ]
    }
  ]}
/>

---

## Quality Control & Monitoring

Enrichment agents can fail silently. You need monitoring.

<ClassifyExercise
  title="Classify These Enrichment Failures"
  persistKey="custom-ai-agents-L5-classify-failures"
  categories={[
    { id: "data_source", label: "Data Source Issue", color: "#ef4444" },
    { id: "logic_error", label: "Logic Error", color: "#f59e0b" },
    { id: "api_limit", label: "API Limit Hit", color: "#3b82f6" }
  ]}
  items={[
    { id: "1", content: "Apollo returns 'company not found' for 40% of lookups", correctCategory: "data_source" },
    { id: "2", content: "ICP score is always 0 even for perfect-fit contacts", correctCategory: "logic_error" },
    { id: "3", content: "Email verification stops working after 1,000 contacts", correctCategory: "api_limit" },
    { id: "4", content: "LinkedIn URLs are broken (404 errors)", correctCategory: "data_source" },
    { id: "5", content: "Timezone is always 'UTC' regardless of location", correctCategory: "logic_error" }
  ]}
/>

### Weekly Monitoring Checklist

<InteractiveChecklist 
  title="Weekly Enrichment Health Check" 
  persistKey="custom-ai-agents-L5-health-check" 
  items={[
    "Check enrichment success rate (target: >80%)",
    "Review 10 random enriched records for accuracy",
    "Verify email verification is running (check last_verified dates)",
    "Check API usage vs limits (Apollo, MillionVerifier)",
    "Review high-priority contact notifications (any false positives?)",
    "Spot-check ICP scores against manual assessment",
    "Check for duplicate records created by enrichment",
    "Review failed enrichments (what data sources failed?)",
    "Update ICP scoring rubric if needed (based on closed deals)",
    "Archive or delete contacts with invalid emails >90 days old"
  ]} 
/>

---

## Common Failure Modes & Fixes

<StrategyDuel
  title="Enrichment Failure: What Went Wrong?"
  persistKey="custom-ai-agents-L5-failure-duel"
  scenario="Your enrichment agent ran on 200 contacts. Only 40 got company data. What's the likely cause?"
  strategyA={{ 
    name: "Data Source Coverage Issue", 
    description: "Apollo doesn't have data for these companies (small/new/international)", 
    pros: ["Most common cause", "Easy to diagnose"], 
    cons: ["Requires adding fallback sources"] 
  }}
  strategyB={{ 
    name: "API Configuration Error", 
    description: "Your API key is invalid or you hit rate limits", 
    pros: ["Easy to fix once identified"], 
    cons: ["Less common than coverage gaps"] 
  }}
  expertVerdict="Data source coverage is the #1 cause. Apollo covers ~65% of companies. Add Clearbit or Google fallback to reach 85-90%."
/>

### Fix Guide

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| &lt;50% company data coverage | Single data source (Apollo only) | Add Clearbit or Google fallback |
| Email verification always "unknown" | API key invalid or service down | Check API key, test with curl |
| ICP scores all 0 or all 10 | Scoring logic broken | Review scoring code, test with known contacts |
| LinkedIn URLs 404 | Scraping old/cached data | Re-scrape or use Apollo's LinkedIn field |
| Timezone always UTC | Not deriving from location | Use Google Timezone API with lat/lng |
| Enrichment stops after N contacts | API rate limit hit | Implement rate limiting or upgrade plan |
| Duplicate contacts created | Webhook firing twice | Add deduplication check before enrichment |

---

## Advanced: Multi-Source Enrichment Orchestration

For technical founders who want maximum coverage and accuracy.

<DecisionTree
  title="Enrichment Source Selection"
  persistKey="custom-ai-agents-L5-source-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "New contact added. What data is missing?", 
      choices: [
        { label: "Email only", nextNodeId: "email_only" },
        { label: "Company data only", nextNodeId: "company_only" },
        { label: "Both email and company", nextNodeId: "both" }
      ]
    },
    { 
      id: "email_only", 
      content: "Run email waterfall: Apollo → Hunter → Snov. Coverage: 75-90%.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "company_only", 
      content: "Run company waterfall: Apollo → Clearbit → Google. Coverage: 85-95%.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "both", 
      content: "Run both waterfalls in parallel. Total time: 5-10 seconds.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

### Parallel Enrichment Pattern (n8n)

Instead of sequential waterfall (slow), run sources in parallel and merge results.

**Pseudocode:**

```javascript
// Node 1: Split into parallel branches
[New Contact] → [Split into 3 branches]

// Branch A: Email enrichment
→ Apollo email lookup
→ Hunter email lookup (if Apollo fails)
→ Merge results

// Branch B: Company enrichment
→ Apollo company lookup
→ Clearbit company lookup (if Apollo fails)
→ Merge results

// Branch C: Activity enrichment
→ Google News search
→ LinkedIn profile scrape (if URL available)
→ Merge results

// Node 2: Merge all branches
[Merge A + B + C] → [ICP Scoring] → [CRM Update] → [Notification]
```

**Benefit:** Reduces total enrichment time from 15-30 seconds (sequential) to 5-10 seconds (parallel).

---

## Your Enrichment Agent Spec

Time to build your own.

<TemplateBuilder
  title="Your CRM Enrichment Agent Specification"
  persistKey="custom-ai-agents-L5-final-spec"
  sections={[
    {
      id: "overview",
      title: "Agent Overview",
      fields: [
        { id: "name", label: "Agent Name", placeholder: "e.g., CRM Enrichment Agent v1", type: "text" },
        { id: "purpose", label: "Primary Purpose", placeholder: "e.g., Keep CRM data fresh and complete", type: "textarea" },
        { id: "trigger", label: "Trigger(s)", placeholder: "e.g., New contact added, Weekly schedule", type: "text" }
      ]
    },
    {
      id: "data_sources",
      title: "Data Sources",
      fields: [
        { id: "email_sources", label: "Email Enrichment Sources", placeholder: "e.g., Apollo (primary), Hunter (fallback)", type: "textarea" },
        { id: "company_sources", label: "Company Enrichment Sources", placeholder: "e.g., Apollo, Clearbit, Google", type: "textarea" },
        { id: "activity_sources", label: "Activity Signal Sources", placeholder: "e.g., Google News, LinkedIn", type: "textarea" }
      ]
    },
    {
      id: "enrichment_fields",
      title: "Enrichment Fields (5-7 critical fields)",
      fields: [
        { id: "field_1", label: "Field 1", placeholder: "e.g., company_size", type: "text" },
        { id: "field_2", label: "Field 2", placeholder: "e.g., funding_stage", type: "text" },
        { id: "field_3", label: "Field 3", placeholder: "e.g., email_status", type: "text" },
        { id: "field_4", label: "Field 4", placeholder: "e.g., linkedin_url", type: "text" },
        { id: "field_5", label: "Field 5", placeholder: "e.g., icp_score", type: "text" }
      ]
    },
    {
      id: "icp_scoring",
      title: "ICP Scoring Rubric",
      fields: [
        { id: "criterion_1", label: "Criterion 1 (points)", placeholder: "e.g., Company size 10-500 (3 points)", type: "text" },
        { id: "criterion_2", label: "Criterion 2 (points)", placeholder: "e.g., Funding stage Seed/A (2 points)", type: "text" },
        { id: "criterion_3", label: "Criterion 3 (points)", placeholder: "e.g., Tech stack overlap (2 points)", type: "text" },
        { id: "high_threshold", label: "High-Priority Threshold", placeholder: "e.g., 7/10", type: "text" }
      ]
    },
    {
      id: "output",
      title: "Output & Notifications",
      fields: [
        { id: "crm_update", label: "CRM Fields to Update", placeholder: "List all fields", type: "textarea" },
        { id: "notification_channel", label: "Notification Channel", placeholder: "Slack, Email, Dashboard", type: "text" },
        { id: "notification_trigger", label: "Notification Trigger", placeholder: "e.g., ICP score ≥8", type: "text" }
      ]
    },
    {
      id: "quality_control",
      title: "Quality Control",
      fields: [
        { id: "monitoring_frequency", label: "Monitoring Frequency", placeholder: "e.g., Weekly manual review of 10 records", type: "text" },
        { id: "success_threshold", label: "Success Threshold", placeholder: "e.g., >80% enrichment success rate", type: "text" },
        { id: "failure_handling", label: "Failure Handling", placeholder: "e.g., Tag 'Enrichment Failed' and retry in 7 days", type: "textarea" }
      ]
    }
  ]}
/>

---

## Summary & Next Steps

You've learned how to build a CRM Enrichment Agent that:

✅ Automatically fills in missing contact and company data
✅ Verifies email deliverability before you send
✅ Scores prospects for ICP fit
✅ Keeps data fresh with scheduled refreshes
✅ Costs $10-30/month for most solo founders

<InsightCard icon="🚀" title="The Compounding Effect">
Every week your enrichment agent runs, your CRM gets smarter. After 3 months, you'll have the richest, most accurate prospect database in your niche — and you'll barely have lifted a finger.
</InsightCard>

<InteractiveChecklist 
  title="Your Action Items" 
  persistKey="custom-ai-agents-L5-actions" 
  items={[
    "Complete your Enrichment Agent Spec (use the template above)",
    "Sign up for Apollo.io (free tier) and MillionVerifier",
    "Build your first n8n enrichment workflow (or Zapier/Make equivalent)",
    "Test with 10 sample contacts and verify accuracy",
    "Set up weekly monitoring (success rate, spot-check 10 records)",
    "Configure Slack notifications for high-priority contacts",
    "Schedule your first refresh run (for records >90 days old)",
    "Document your ICP scoring rubric (you'll refine it over time)"
  ]} 
/>

**Next Lesson:** Agent 4: Meeting Prep Agent — automatically generate 1-page prep docs 30 minutes before every sales call.