---
title: "Your CRM Setup Checklist"
duration: "45 min"
track: "Operations & Systems"
course: "Course 40: Advanced CRM Setup"
lesson: 10
---

You've spent nine lessons learning CRM philosophy, comparing tools, designing pipelines, and building AI-ready schemas. Now it's time to **actually set the thing up**.

This isn't a victory lap. This is the implementation sprint that separates founders who "learned about CRMs" from founders who **have a working CRM that drives revenue**.

By the end of this lesson, you'll have a complete, personalized 7-day setup plan. You'll verify every integration. You'll test your schema with real data. And you'll score your AI-readiness so you know exactly what Course 41 (Analytics) and Course 27 (AI Agents) can build on top of your foundation.

## The Setup Reality Check

<InsightCard icon="⚠️" title="The 48-Hour Window">
If you don't configure your CRM within 48 hours of choosing it, you probably never will. The "I'll do it next week" trap has killed more CRM projects than bad tool choices ever did.
</InsightCard>

Here's what actually happens when solo founders delay CRM setup:

1. **Week 1**: "I'll set it up this weekend"
2. **Week 2**: "I'm too busy with client work"
3. **Week 3**: "Maybe I should reconsider which CRM to use"
4. **Week 4**: Back to spreadsheets and sticky notes

The research is clear: **CRM adoption drops 60% for every week of delay after the purchase decision**. You chose your tool in Lesson 8. You have the schema from Lesson 6. You have the pipeline from Lesson 4.

Now you execute.

<RangeSlider 
  label="How ready are you to configure your CRM this week?" 
  min={1} 
  max={10} 
  lowLabel="Still researching" 
  highLabel="Ready now" 
  persistKey="crm-setup-L10-readiness" 
/>

## The 7-Day CRM Sprint

This isn't a "work on it when you have time" project. This is a **structured sprint** with daily milestones. Each day builds on the previous one. Skip a day, and the whole thing falls apart.

<SlideNavigation>
<Slide title="Day 1: Account Setup">

### What You're Building
- CRM account created and verified
- Email connected for authentication
- Basic profile configured
- Any collaborators invited (if applicable)

### Time Required
30-45 minutes

### Step-by-Step

**For HubSpot Free/Starter:**
1. Go to hubspot.com/products/crm
2. Sign up with your primary work email
3. Verify email and complete onboarding wizard
4. Connect Gmail/Outlook for email sync (Settings → Integrations → Email)
5. Set your timezone and currency (Settings → General)

**For Attio Plus:**
1. Go to attio.com
2. Sign up and choose Plus plan ($29/mo)
3. Connect Gmail/Outlook during onboarding
4. Import contacts from existing sources (CSV, Google Contacts)
5. Configure workspace settings

**For Folk Standard:**
1. Go to folk.app
2. Sign up and choose Standard ($20/mo)
3. Install Chrome extension
4. Connect Gmail
5. Import initial contacts from LinkedIn/Gmail

**For Close Startup:**
1. Go to close.com
2. Sign up for Startup plan ($29/mo)
3. Connect email and calendar
4. Set up calling number (if using built-in dialer)
5. Configure notification preferences

**For Pipedrive Essential:**
1. Go to pipedrive.com
2. Sign up for Essential ($14/mo)
3. Connect email via Smart Email BCC or sync
4. Set currency and timezone
5. Configure mobile app

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Resist the urge to explore every API endpoint on Day 1. You'll build integrations on Day 6. Today is just account setup.
</ContextualNote>

</Slide>

<Slide title="Day 2: Pipeline Configuration">

### What You're Building
Your 6-stage pipeline with exit criteria and stage-based automations

### Time Required
45-60 minutes

### The Universal 6-Stage Pipeline

Remember from Lesson 4:

1. **Lead** — New contact, ICP-fit confirmed, no outreach yet
2. **Contacted** — First message sent, awaiting response
3. **Engaged** — Prospect replied or showed interest
4. **Meeting** — Discovery call or demo scheduled/completed
5. **Proposal** — Pricing/terms/offer sent
6. **Won/Lost** — Deal closed with reason logged

### Configuration Steps

**HubSpot:**
- Go to Settings → Objects → Deals → Pipelines
- Rename default pipeline or create new one
- Add 6 stages with exact names above
- Set probability % for each stage (Lead: 10%, Contacted: 20%, Engaged: 40%, Meeting: 60%, Proposal: 80%, Won: 100%, Lost: 0%)
- Configure required properties per stage (e.g., Proposal stage requires "Close Date" and "Amount")

**Attio:**
- Go to Settings → Lists & Pipelines
- Create new pipeline
- Add 6 stages as statuses
- Configure automation triggers per stage (covered Day 6)

**Pipedrive:**
- Go to Settings → Pipelines
- Edit default pipeline or create new
- Add 6 stages with win probability %
- Set expected duration per stage (Lead: 7 days, Contacted: 3 days, Engaged: 7 days, Meeting: 14 days, Proposal: 7 days)

**Close:**
- Go to Settings → Pipelines
- Create pipeline with 6 stages
- Set probability and expected close date per stage

**Folk:**
- Folk uses tags instead of formal pipelines
- Create 6 tags: "Stage: Lead", "Stage: Contacted", etc.
- You'll manually update tags as deals progress

<ExampleCard label="Creator/Coach Variant">
If you're running an enrollment funnel, your stages might be:

1. **Follower** — In audience, not yet engaged
2. **Subscriber** — Email list or community member
3. **Applicant** — Filled out application or inquiry
4. **Call Booked** — Discovery/enrollment call scheduled
5. **Enrolled** — Paid and onboarded
6. **Won/Lost** — Completed program or churned

Configure these instead of the B2B stages.
</ExampleCard>

</Slide>

<Slide title="Day 3: Email Sync & Enrichment">

### What You're Building
- Bidirectional email sync (sent + received emails logged automatically)
- Contact enrichment automation (new contact → auto-populate company, role, LinkedIn)

### Time Required
60-90 minutes

### Email Sync Setup

**HubSpot:**
- Settings → Integrations → Email → Connect Gmail/Outlook
- Enable "Log emails automatically" for all folders
- Set default logging preferences (log all vs. selective)
- Install HubSpot Sales Chrome extension for one-click logging
- Test: send an email to yourself, verify it appears in timeline

**Attio:**
- Email sync is automatic after connecting Gmail/Outlook on Day 1
- Go to Settings → Email to configure sync rules
- Enable "Auto-create contacts from email" (optional)
- Test: send/receive email with a contact, verify it logs

**Pipedrive:**
- Settings → Email Sync (requires Advanced plan for full sync)
- If on Essential, use Smart Email BCC: Settings → Personal → Email → BCC address
- Add BCC address to every outbound email (or use Gmail/Outlook plugin)
- Test: send BCC'd email, verify it appears in deal timeline

**Close:**
- Email sync is built-in
- Settings → Email → Connect inbox
- Enable automatic logging
- Test: send email via Close interface, verify it logs

**Folk:**
- Install Chrome extension (done Day 1)
- Extension auto-logs emails when you view them in Gmail
- No additional configuration needed
- Test: open a Gmail thread, verify Folk sidebar shows contact

### Enrichment Automation

**Option A: CRM Native Enrichment (HubSpot, Attio)**

HubSpot:
- Settings → Properties → Contact Properties
- Enable "Company domain" and "Company name" auto-enrichment
- HubSpot will auto-populate from email domain

Attio:
- Enrichment is automatic for all contacts
- Settings → Enrichment to configure which fields auto-populate
- Attio pulls from LinkedIn, Crunchbase, Clearbit

**Option B: Apollo.io Integration (All CRMs)**

1. Sign up for Apollo.io free tier (10K enrichments/month)
2. Go to Integrations → find your CRM
3. Connect via API key (HubSpot, Pipedrive, Close) or Zapier (Folk, Attio)
4. Configure enrichment rules: new contact created → Apollo lookup → populate company size, industry, role, LinkedIn URL
5. Test: create a contact with just email → verify enrichment runs

**Option C: Zapier/Make Recipe (Manual Setup)**

Trigger: New contact created in CRM
Action 1: Apollo.io "Find Person" (requires paid Apollo or API key)
Action 2: Update CRM contact with enriched data
Action 3: (Optional) Slack notification if high-value contact detected

<TemplateBuilder
  title="Enrichment Field Mapping"
  persistKey="crm-setup-L10-enrichment"
  sections={[
    {
      id: "fields",
      title: "Which Fields to Enrich",
      fields: [
        { id: "company", label: "Company Name", placeholder: "Auto-populate from email domain", type: "text" },
        { id: "role", label: "Job Title", placeholder: "e.g., VP Marketing", type: "text" },
        { id: "linkedin", label: "LinkedIn URL", placeholder: "Auto-find profile", type: "text" },
        { id: "size", label: "Company Size", placeholder: "Employee count", type: "text" },
        { id: "industry", label: "Industry", placeholder: "e.g., SaaS, Agency", type: "text" }
      ]
    }
  ]}
/>

</Slide>

<Slide title="Day 4: AI-Ready Schema Deployment">

### What You're Building
The complete field schema from Lesson 6, deployed as custom properties in your CRM

### Time Required
90-120 minutes (this is the longest day)

### Schema Reminder

From Lesson 6, your AI-ready schema includes:

**Contact Fields:**
- `icp_fit_score` (1-10 number)
- `lead_source` (dropdown: Outbound, Inbound, Referral, Event, Content)
- `disc_type` (dropdown: D, I, S, C, Unknown)
- `linkedin_url` (URL)
- `first_contact_date` (date)
- `engagement_score` (number, calculated)

**Deal Fields:**
- `deal_priority` (dropdown: Hot, Warm, Cold)
- `competitor_mentioned` (multi-select: Competitor A, Competitor B, None)
- `champion_identified` (yes/no)
- `decision_timeline` (date)
- `loss_reason` (dropdown: Price, Timing, No Budget, Chose Competitor, Ghosted)

**Event/Activity Fields:**
- `event_type` (dropdown: Email Sent, Email Received, Call, Meeting, Note)
- `event_outcome` (dropdown: Positive, Neutral, Negative)
- `next_action` (text)
- `next_action_date` (date)

**Health Indicators (Calculated or Manual):**
- `days_since_last_contact` (number, auto-calculated)
- `avg_response_time_hours` (number)
- `engagement_trend` (dropdown: Up, Flat, Down)
- `meetings_held_count` (number)

### Creating Custom Properties

**HubSpot:**
1. Settings → Properties → Contact Properties → Create Property
2. For each field above:
   - Internal name: use snake_case (e.g., `icp_fit_score`)
   - Label: human-readable (e.g., "ICP Fit Score")
   - Field type: Number, Dropdown, Date, etc.
   - For dropdowns: add all options
3. Repeat for Deal Properties
4. For calculated fields (days_since_last_contact): use Workflows (Starter plan) or manual update

**Attio:**
1. Settings → Attributes
2. Create custom attributes for each field
3. Attio's flexible data model makes this easier than HubSpot
4. Use "Formula" attributes for calculated fields

**Pipedrive:**
1. Settings → Data Fields → Add Custom Field
2. Choose object type (Person, Deal, Organization)
3. Create each field with appropriate type
4. For calculated fields: use Pipedrive's automation or Zapier

**Close:**
1. Settings → Custom Fields
2. Add fields to Contact or Opportunity objects
3. Close has fewer field type options; use text for complex data

**Folk:**
1. Folk uses flexible tags and notes instead of rigid custom fields
2. Create tags for categorical data (e.g., "ICP: High Fit", "Priority: Hot")
3. Use structured notes for other data

<InsightCard icon="🤖" title="Why This Matters for AI">
Every field you create now becomes a data point for AI agents in Course 27. An agent can't prioritize outreach if `icp_fit_score` doesn't exist. It can't personalize if `disc_type` is missing. Structure now = intelligence later.
</InsightCard>

</Slide>

<Slide title="Day 5: Data Import & Migration">

### What You're Building
All existing contacts and deals imported into your new CRM with proper field mapping

### Time Required
60-90 minutes

### Pre-Import Checklist

Before you import anything:

1. **Clean your source data** — Remove duplicates, fix formatting, verify emails
2. **Map fields** — Match your old column names to new CRM properties
3. **Test with 20 records** — Always test import before full upload
4. **Backup everything** — Export your source data as CSV before touching it

### Import Sources

**From Spreadsheet (CSV):**

HubSpot:
- Contacts → Import → File from computer
- Upload CSV
- Map columns to HubSpot properties
- Review and import

Attio:
- Import → CSV
- Drag and drop file
- Map columns to attributes
- Import

Pipedrive:
- Import Data → Choose file
- Map fields
- Import

Close:
- Settings → Import/Export → Import Contacts
- Upload CSV
- Map fields

Folk:
- Import → CSV or Google Sheets
- Map columns
- Import

**From Another CRM:**

HubSpot → Attio: Use Attio's native HubSpot import (Settings → Import → HubSpot)

Pipedrive → HubSpot: Use HubSpot's Pipedrive import tool

Close → Pipedrive: Export from Close as CSV, import to Pipedrive

Folk → Any: Export as CSV, import to target CRM

**From Email/LinkedIn:**

HubSpot: Install HubSpot Sales extension, import from Gmail contacts

Attio: Auto-imports from connected Gmail/Outlook

Folk: Chrome extension imports from LinkedIn, Gmail, Twitter

### Field Mapping Template

<ComparisonBuilder
  title="Map Your Old Fields to New Schema"
  persistKey="crm-setup-L10-mapping"
  prompt="List your old field names (e.g., 'Status', 'Company', 'Notes')"
  expertExample="Old: 'Status' → New: 'deal_priority' (Hot/Warm/Cold)
Old: 'Company' → New: 'company_name' (text)
Old: 'Last Contact' → New: 'first_contact_date' (date)"
  criteria={["Every old field maps to a new property", "No data loss", "Types match (text→text, date→date)"]}
/>

### Post-Import Validation

After importing:

1. **Spot-check 10% of records** — Open 10-20 contacts/deals, verify data accuracy
2. **Check totals** — Does deal pipeline value match your source?
3. **Verify relationships** — Are contacts linked to correct companies/deals?
4. **Test search** — Search for a known contact, verify it appears
5. **Check for duplicates** — Run dedupe tool, merge any duplicates

</Slide>

<Slide title="Day 6: Automation Configuration">

### What You're Building
3 core automations that keep your CRM healthy and actionable

### Time Required
60-90 minutes

### Automation 1: Stale Deal Flagging

**Purpose:** Auto-flag deals with no activity in 14+ days

**HubSpot (Starter plan required):**
1. Automation → Workflows → Create workflow
2. Trigger: Deal property "Last activity date" is more than 14 days ago
3. Action: Set "Deal Priority" to "Cold"
4. Action: Create task "Follow up on stale deal" assigned to owner
5. Activate workflow

**Attio:**
1. Automations → Create automation
2. Trigger: Deal status unchanged for 14 days
3. Action: Add tag "Stale"
4. Action: Send Slack notification (optional)

**Pipedrive:**
1. Workflow Automation → Create workflow
2. Trigger: Deal not updated in 14 days
3. Action: Change label to "Stale"
4. Action: Create activity "Review stale deal"

**Zapier (for CRMs without native automation):**
1. Trigger: Schedule (daily)
2. Action: CRM API → Find deals with last_activity > 14 days ago
3. Action: Update deal → set priority to "Cold"
4. Action: Create task in CRM

### Automation 2: Follow-Up Reminders

**Purpose:** Auto-create follow-up task 3 days after first contact

**HubSpot:**
1. Workflow trigger: Deal enters "Contacted" stage
2. Delay: 3 days
3. Action: Create task "Send follow-up email" due today

**Attio:**
1. Trigger: Deal status changes to "Contacted"
2. Delay: 3 days
3. Action: Create reminder

**Pipedrive:**
1. Trigger: Deal moves to "Contacted" stage
2. Delay: 3 days
3. Action: Create activity "Follow up"

### Automation 3: New Contact Enrichment

**Purpose:** Auto-enrich new contacts with company data

(Already configured on Day 3 if using Apollo/Attio native enrichment)

If not yet configured:
1. Trigger: New contact created
2. Action: Apollo.io "Find Person" or Clearbit enrichment
3. Action: Update contact with enriched data
4. Action: Calculate ICP fit score based on company size + industry

<TimedChallenge
  title="Automation Quick Build"
  persistKey="crm-setup-L10-automation"
  timeLimit={300}
  items={[
    { id: "1", prompt: "Which automation prevents deals from going dark?", correctAnswer: "Stale deal flagging", explanation: "Flags deals with no activity in 14+ days" },
    { id: "2", prompt: "When should a follow-up reminder trigger?", correctAnswer: "3 days after first contact", explanation: "Gives prospect time to respond without letting them forget" },
    { id: "3", prompt: "What's the risk of over-automating?", correctAnswer: "Losing human touch", explanation: "Automate admin, not relationships" }
  ]}
/>

</Slide>

<Slide title="Day 7: Integration Testing & Validation">

### What You're Building
End-to-end verification that everything works with real data

### Time Required
45-60 minutes

### Test Scenario: The 5-Contact Sprint

You're going to process 5 real contacts through your entire CRM system to verify every component works.

**Step 1: Add 5 Contacts**

Choose 5 real people from your network:
- 2 warm leads (people you've talked to recently)
- 2 cold prospects (people you want to reach out to)
- 1 existing customer

Add them manually or import from LinkedIn/email.

**Step 2: Verify Enrichment**

For each contact:
- Check if company name auto-populated
- Verify LinkedIn URL was found
- Confirm industry/role data is accurate
- If any field is blank, manually enrich or check your Apollo integration

**Step 3: Create Deals**

For the 4 non-customers:
- Create a deal for each
- Set appropriate stage (Lead, Contacted, or Engaged)
- Add deal amount (estimate)
- Set close date (30-60 days out)
- Assign priority (Hot/Warm/Cold)

**Step 4: Log Activity**

For each deal:
- Send a real email (or log a past email)
- Verify email appears in CRM timeline
- Add a note with structured data (e.g., "Objection: Price too high")
- Create a next action task with due date

**Step 5: Test Automations**

- Move one deal to "Contacted" stage → verify follow-up task created in 3 days (check workflow history)
- Manually set one deal's last activity to 15 days ago → verify it gets flagged as stale
- Add a new contact → verify enrichment runs

**Step 6: Run Reports**

- View pipeline summary → verify total deal value is correct
- Check contact list → verify all 5 contacts appear
- Review activity timeline → verify emails and notes logged
- Test search → search for a contact by company name

<InteractiveChecklist 
  title="Day 7 Validation Checklist" 
  persistKey="crm-setup-L10-validation" 
  items={[
    "5 contacts added and enriched",
    "4 deals created with proper stages",
    "Email sync verified (sent email appears in timeline)",
    "At least 1 note logged per deal",
    "Follow-up automation triggered",
    "Stale deal automation triggered",
    "Pipeline report shows correct totals",
    "Search works for contacts and deals"
  ]} 
/>

</Slide>
</SlideNavigation>

## AI-Readiness Audit

You've built your CRM. Now let's score how ready it is for AI agents (Course 27).

An AI agent needs **structured, consistent, complete data** to reason effectively. Free-text notes are invisible to AI. Missing fields break agent logic. Inconsistent naming confuses models.

<LinterFeedback
  title="AI-Readiness Linter"
  persistKey="crm-setup-L10-ai-linter"
  inputLabel="Describe your CRM setup (paste field names, automation rules, data completeness)"
  rules={[
    { 
      id: "structured-events", 
      label: "Structured Event Logging", 
      description: "Activities logged with type, date, outcome (not just free-text notes)", 
      keywords: ["event_type", "event_outcome", "activity type"], 
      antiKeywords: ["notes only", "free text"] 
    },
    { 
      id: "health-indicators", 
      label: "Health Indicators Present", 
      description: "Fields like days_since_last_contact, engagement_score, response_time", 
      keywords: ["days_since", "engagement", "health", "score"], 
      antiKeywords: [] 
    },
    { 
      id: "categorical-fields", 
      label: "Categorical Fields (not free-text)", 
      description: "Dropdowns for priority, stage, source, loss_reason", 
      keywords: ["dropdown", "select", "priority", "stage"], 
      antiKeywords: ["text field for priority"] 
    },
    { 
      id: "consistent-naming", 
      label: "Consistent Field Naming", 
      description: "snake_case or camelCase, not mixed", 
      keywords: ["snake_case", "camelCase", "consistent"], 
      antiKeywords: ["mixed case", "spaces in field names"] 
    },
    { 
      id: "automation-coverage", 
      label: "Automation Coverage", 
      description: "At least 3 automations running (stale flags, follow-ups, enrichment)", 
      keywords: ["automation", "workflow", "trigger"], 
      antiKeywords: ["manual only"] 
    }
  ]}
/>

### AI-Readiness Score Interpretation

**1-3 (Not Ready):**
- Mostly free-text notes
- No structured event logging
- Missing health indicators
- No automations

**Action:** Revisit Lesson 6 and rebuild your schema with structured fields.

**4-6 (Partially Ready):**
- Some structured fields
- Basic pipeline configured
- Email sync working
- 1-2 automations

**Action:** Add health indicators and convert free-text notes to structured fields.

**7-8 (Ready):**
- Full AI-ready schema deployed
- Structured event logging
- Health indicators present
- 3+ automations running

**Action:** You're ready for Course 27. Test with a simple AI query: "Which 3 contacts should I prioritize this week?"

**9-10 (Optimized):**
- Schema + automations + tested with AI agent queries
- Every field has a clear purpose
- Data completeness >90%
- Weekly hygiene routine established

**Action:** You're ahead of the curve. Start building custom agents in Course 27 immediately.

## The Weekly CRM Rhythm

Your CRM is set up. Now you need a **sustainable maintenance routine** to keep it healthy.

<FlipCard 
  front="The 15-Minute Weekly Sweep" 
  back="Monday: Review pipeline (15 min). Wednesday: Log meeting notes as they happen. Friday: 15-minute hygiene sweep (stale deals, duplicates, next actions)." 
/>

### Monday: Pipeline Review (15 minutes)

1. Open pipeline view
2. Sort by "Last Activity Date" (oldest first)
3. For each deal with no activity in 7+ days:
   - Update stage or close as lost
   - Add next action with specific date
   - Send follow-up if appropriate
4. Review "Hot" deals: are they actually moving?
5. Check pipeline total vs. monthly target

### Wednesday: Real-Time Logging

- After every call or meeting: immediately log notes in CRM (2 min per meeting)
- Use structured fields: event_type, event_outcome, next_action
- Don't wait until Friday — you'll forget details

### Friday: Hygiene Sweep (15 minutes)

1. Run duplicate detection → merge any duplicates
2. Check for deals without next actions → add them
3. Review "Stale" flagged deals → advance or close
4. Verify email sync is working (check recent sent emails)
5. Spot-check 5 random contacts for data accuracy

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches & Consultants">
Your CRM rhythm might be lighter (10 min Monday, 10 min Friday) because you have fewer deals but deeper relationships. Focus on logging call notes and tracking referral sources.
</ContextualNote>

## Integration Verification

Your CRM doesn't live in isolation. It connects to:

- **Email** (Gmail, Outlook) — for logging and sequences
- **Calendar** (Google Calendar, Outlook) — for meeting scheduling
- **Outreach tools** (Instantly, Lemlist, Smartlead) — for cold email campaigns
- **Enrichment** (Apollo, Clearbit) — for contact data
- **Automation** (Zapier, Make) — for custom workflows
- **Analytics** (Course 41 dashboards) — for reporting

### Integration Checklist

<InteractiveChecklist 
  title="Integration Verification" 
  persistKey="crm-setup-L10-integrations" 
  items={[
    "Email sync: sent and received emails log automatically",
    "Calendar sync: meetings appear in CRM timeline",
    "Outreach tool connected (if using Instantly, Lemlist, etc.)",
    "Enrichment running (Apollo, Clearbit, or CRM native)",
    "Zapier/Make recipes tested (if using custom automations)",
    "Mobile app installed and syncing",
    "Browser extension installed (HubSpot, Folk, etc.)"
  ]} 
/>

## Handoff to Course 41: Analytics & Dashboards

Your CRM is now the **single source of truth** for all acquisition metrics.

Course 41 will teach you to build dashboards that answer:
- How many leads entered the pipeline this week?
- What's the average time-to-close by source?
- Which outreach sequences have the highest reply rates?
- What's the projected revenue for next month based on current pipeline?

But those dashboards only work if your CRM data is **clean, structured, and complete**.

<InsightCard icon="📊" title="The Analytics Foundation">
Every dashboard in Course 41 pulls from CRM fields you configured today. If `lead_source` is inconsistent, your source attribution report will be garbage. If `close_date` is missing, your revenue forecast will be wrong. Clean data now = accurate insights later.
</InsightCard>

## Your Complete CRM Setup Artifact

You've now completed all 10 lessons of Course 40. Time to compile everything into your **Complete CRM Setup Checklist** — the primary artifact for this course.

<TemplateBuilder
  title="Complete CRM Setup Checklist"
  persistKey="crm-setup-L10-complete"
  sections={[
    {
      id: "tool-choice",
      title: "1. CRM Tool Choice",
      fields: [
        { id: "crm", label: "Chosen CRM", placeholder: "HubSpot Free, Attio Plus, Folk, Close, Pipedrive", type: "text" },
        { id: "reason", label: "Why this CRM?", placeholder: "Sales motion, budget, integrations, AI-readiness", type: "textarea" },
        { id: "tier", label: "Plan/Tier", placeholder: "Free, Starter, Plus, Essential", type: "text" },
        { id: "cost", label: "Monthly Cost", placeholder: "$0, $14, $20, $29", type: "text" }
      ]
    },
    {
      id: "philosophy",
      title: "2. CRM Philosophy (from Lesson 1)",
      fields: [
        { id: "principle1", label: "Guiding Principle 1", placeholder: "e.g., Fewer fields, more automations", type: "text" },
        { id: "principle2", label: "Guiding Principle 2", placeholder: "e.g., Log context, not just data", type: "text" },
        { id: "principle3", label: "Guiding Principle 3", placeholder: "e.g., Review weekly, not daily", type: "text" },
        { id: "not-tracking", label: "What I'm NOT tracking", placeholder: "e.g., Vanity metrics, fields I won't act on", type: "textarea" }
      ]
    },
    {
      id: "pipeline",
      title: "3. Pipeline Configuration (from Lesson 4)",
      fields: [
        { id: "stages", label: "Pipeline Stages", placeholder: "Lead → Contacted → Engaged → Meeting → Proposal → Won/Lost", type: "text" },
        { id: "variant", label: "Pipeline Variant", placeholder: "B2B standard, Creator enrollment, Custom", type: "text" },
        { id: "automations", label: "Stage-Based Automations", placeholder: "e.g., Contacted → 3-day follow-up task", type: "textarea" }
      ]
    },
    {
      id: "schema",
      title: "4. AI-Ready Field Schema (from Lesson 6)",
      fields: [
        { id: "contact-fields", label: "Contact Fields", placeholder: "icp_fit_score, lead_source, disc_type, linkedin_url, first_contact_date", type: "textarea" },
        { id: "deal-fields", label: "Deal Fields", placeholder: "deal_priority, competitor_mentioned, champion_identified, decision_timeline, loss_reason", type: "textarea" },
        { id: "event-fields", label: "Event/Activity Fields", placeholder: "event_type, event_outcome, next_action, next_action_date", type: "textarea" },
        { id: "health-fields", label: "Health Indicators", placeholder: "days_since_last_contact, engagement_trend, meetings_held_count", type: "textarea" }
      ]
    },
    {
      id: "integrations",
      title: "5. Integrations Configured",
      fields: [
        { id: "email", label: "Email Sync", placeholder: "Gmail, Outlook, BCC logging", type: "text" },
        { id: "enrichment", label: "Enrichment Source", placeholder: "Apollo, Clearbit, CRM native", type: "text" },
        { id: "outreach", label: "Outreach Tool", placeholder: "Instantly, Lemlist, Smartlead, None", type: "text" },
        { id: "automation", label: "Automation Platform", placeholder: "Zapier, Make, CRM native workflows", type: "text" }
      ]
    },
    {
      id: "hygiene",
      title: "6. Hygiene Routine (from Lesson 7)",
      fields: [
        { id: "weekly", label: "Weekly Tasks", placeholder: "Monday: pipeline review, Friday: hygiene sweep", type: "textarea" },
        { id: "monthly", label: "Monthly Tasks", placeholder: "Dedupe check, data verification, enrichment refresh", type: "textarea" },
        { id: "quarterly", label: "Quarterly Tasks", placeholder: "Schema review, automation audit, integration check", type: "textarea" }
      ]
    },
    {
      id: "ai-readiness",
      title: "7. AI-Readiness Score",
      fields: [
        { id: "score", label: "Current Score (1-10)", placeholder: "7", type: "text" },
        { id: "gaps", label: "Gaps to Address", placeholder: "e.g., Need to add engagement_trend field", type: "textarea" },
        { id: "next-steps", label: "Next Steps for AI Agents", placeholder: "e.g., Test with Course 27 agent query", type: "textarea" }
      ]
    }
  ]}
/>

## Final Action Items

You've configured your CRM. You've tested it with real data. You've scored your AI-readiness.

Now commit to the **Weekly CRM Rhythm** for the next 30 days. This is where most solo founders fail — not in setup, but in **sustained use**.

<InteractiveChecklist 
  title="30-Day CRM Commitment" 
  persistKey="crm-setup-L10-commitment" 
  items={[
    "Add CRM hygiene sweep to calendar (Mondays & Fridays, 15 min each)",
    "Set up mobile app and test logging on the go",
    "Log every email, call, and meeting for 30 days (build the habit)",
    "Review pipeline weekly and update deal stages",
    "Run monthly dedupe and data verification",
    "Share CRM access with accountability partner or co-founder (if applicable)",
    "Schedule Course 41 (Analytics) to start in 2 weeks"
  ]} 
/>

<InsightCard icon="🎯" title="The Real Test">
Your CRM isn't "done" when you finish Day 7. It's done when you've used it consistently for 90 days and it's become your default system for managing relationships. The setup is 10% of the work. The habit is 90%.
</InsightCard>

---

## Quiz: CRM Setup Mastery

```json
{
  "questions": [
    {
      "id": "crm-setup-q1",
      "question": "What's the biggest reason solo founders abandon CRMs?",
      "options": [
        "Wrong tool choice",
        "Over-engineering (too many fields) or under-using (glorified spreadsheet)",
        "Lack of integrations",
        "Cost"
      ],
      "correctAnswer": 1,
      "explanation": "Most CRM failures come from over-customization (too complex to maintain) or under-adoption (not using it consistently). Tool choice matters less than usage discipline."
    },
    {
      "id": "crm-setup-q2",
      "question": "What's the universal 6-stage pipeline?",
      "options": [
        "Prospect → Qualified → Demo → Proposal → Negotiation → Closed",
        "Lead → Contacted → Engaged → Meeting → Proposal → Won/Lost",
        "Awareness → Interest → Decision → Action → Retention → Advocacy",
        "Cold → Warm → Hot → Meeting → Proposal → Won"
      ],
      "correctAnswer": 1,
      "explanation": "Lead → Contacted → Engaged → Meeting → Proposal → Won/Lost works universally because it maps to observable actions, not subjective judgments."
    },
    {
      "id": "crm-setup-q3",
      "question": "Why is structured data critical for AI agents?",
      "options": [
        "AI can't read free-text notes effectively",
        "Structured fields enable reasoning, categorization, and prioritization",
        "Dropdowns are faster to fill out than text fields",
        "Both A and B"
      ],
      "correctAnswer": 3,
      "explanation": "AI agents need structured, categorical data to reason. Free-text notes are invisible to AI. Structured fields (dropdowns, numbers, dates) enable agents to prioritize, personalize, and recommend actions."
    },
    {
      "id": "crm-setup-q4",
      "question": "What's the 'Would I Act on This?' test?",
      "options": [
        "For every custom field: if the answer is no, delete it",
        "For every automation: if it doesn't save time, turn it off",
        "For every contact: if they're not ICP-fit, archive them",
        "For every deal: if it's not moving, close it"
      ],
      "correctAnswer": 0,
      "explanation": "Every custom field must earn its place by triggering a decision or action. If you wouldn't act on the data, don't track it."
    },
    {
      "id": "crm-setup-q5",
      "question": "What's the recommended weekly CRM hygiene routine?",
      "options": [
        "Daily: log everything. Weekly: review pipeline. Monthly: dedupe.",
        "Monday: pipeline review (15 min). Friday: hygiene sweep (15 min). Real-time: log meetings.",
        "Weekly: update all deals. Monthly: full audit. Quarterly: migration.",
        "Daily: check for new leads. Weekly: send follow-ups. Monthly: close lost deals."
      ],
      "correctAnswer": 1,
      "explanation": "Monday pipeline review + Friday hygiene sweep + real-time meeting logging is the sustainable rhythm for solo founders. Daily CRM admin is overkill; monthly-only is too infrequent."
    },
    {
      "id": "crm-setup-q6",
      "question": "Which CRM is best for high-volume outbound B2B sales?",
      "options": [
        "Folk (relationship-first)",
        "HubSpot Free (limited automation)",
        "Close (built-in calling + sequences)",
        "Attio (modern UX)"
      ],
      "correctAnswer": 2,
      "explanation": "Close is purpose-built for high-volume outbound with built-in calling, SMS, and sequences. Folk is for relationship selling. HubSpot Free lacks automation. Attio is great for AI-readiness but not volume-optimized."
    },
    {
      "id": "crm-setup-q7",
      "question": "What's the #1 integration to verify on Day 7?",
      "options": [
        "Calendar sync",
        "Email sync (sent and received emails log automatically)",
        "Enrichment (Apollo, Clearbit)",
        "Zapier/Make automations"
      ],
      "correctAnswer": 1,
      "explanation": "Email sync is the foundation. Without it, your CRM has amnesia. Calendar, enrichment, and automations are important but secondary to email logging."
    },
    {
      "id": "crm-setup-q8",
      "question": "What's the AI-Readiness Score range for 'Ready for Course 27'?",
      "options": [
        "1-3",
        "4-6",
        "7-8",
        "9-10"
      ],
      "correctAnswer": 2,
      "explanation": "7-8 means full AI-ready schema deployed, structured event logging, health indicators present, and 3+ automations running. That's the threshold for building AI agents in Course 27."
    },
    {
      "id": "crm-setup-q9",
      "question": "What happens if you delay CRM setup by 1 week after choosing a tool?",
      "options": [
        "Nothing — you can set it up anytime",
        "Adoption drops 60% for every week of delay",
        "You forget which tool you chose",
        "Your free trial expires"
      ],
      "correctAnswer": 1,
      "explanation": "Research shows CRM adoption drops 60% for every week of delay after the purchase decision. The 48-hour window is real."
    },
    {
      "id": "crm-setup-q10",
      "question": "What's the primary output artifact of Course 40?",
      "options": [
        "CRM Comparison Scorecard",
        "Pipeline Stage Map",
        "AI-Ready Field Schema",
        "Complete CRM Setup Checklist (compiles all lesson artifacts)"
      ],
      "correctAnswer": 3,
      "explanation": "The Complete CRM Setup Checklist is the culminating artifact that compiles your CRM philosophy, tool choice, pipeline, schema, integrations, hygiene routine, and AI-readiness score."
    }
  ]
}
```

---

**Completion Badge:** "CRM Architect" — 200 XP

You've built a CRM that actually works. Not a database. Not a graveyard of stale contacts. A **system of action** that tells you what to do next, remembers everything, and feeds AI agents with structured intelligence.

Now go use it. Every day. For 90 days.

That's when it becomes a revenue engine.