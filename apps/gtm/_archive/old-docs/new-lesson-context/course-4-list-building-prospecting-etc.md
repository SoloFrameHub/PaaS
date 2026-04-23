# Course 4: List Building & Prospecting Infrastructure
## Google Antigravity Content Generation Package

**Academy:** Solo Founder's Customer Acquisition Academy  
**Track:** Foundations (Track 1)  
**Position:** 4 of 33  
**Prerequisites:** Course 1 (ICP Builder Workshop), Course 2 (Positioning & Value Proposition), Course 3 (Choose Your Acquisition Path)

---

## COURSE OVERVIEW

### Course Description

You can't email prospects you can't find. Before you can reach ideal customers, you need to know who they are, where to find them, and how to contact them—all while staying compliant with email regulations and maintaining deliverability. This course teaches systematic list building using LinkedIn Sales Navigator, Apollo, and free research methods to build targeted prospect lists that match your ICP. You'll also set up the technical infrastructure for outreach: domains, email authentication, and CRM foundations.

Quality trumps quantity in list building. 100 perfect-fit prospects with validated emails outperform 10,000 random contacts. This course teaches the systematic approach to building lists that maintain deliverability, enable personalization, and convert at higher rates than bulk approaches.

The infrastructure you build in this course becomes the foundation for Course 7 (LinkedIn Growth), Course 8 (Cold Email), and Course 14 (Discovery). Get this right, and everything downstream works better. Get it wrong, and you'll spend months fighting deliverability issues and chasing bad-fit prospects.

### Why This Course Matters

**Founder Pain Points Addressed:**
- "I have an ICP but don't know how to find actual people who match it"
- "My emails keep landing in spam"
- "I bought a list and wasted $500 on bad data"
- "I don't understand SPF, DKIM, DMARC—it's too technical"
- "I'm spending 80% of my time researching and 20% actually outreaching"
- "I'm worried about violating GDPR or CAN-SPAM"

**The Core Insight:** List building is not about volume—it's about translation. You're translating your ICP from a document into actual names, titles, and contact information. The more precisely you translate, the higher your response rates and the fewer wasted conversations.

### Learning Outcomes

By the end of this course, you will be able to:

1. **Translate your ICP into Boolean search strings** that produce targeted prospect lists
2. **Set up complete cold email infrastructure** including domains, authentication (SPF/DKIM/DMARC), and warmup protocols
3. **Use LinkedIn Sales Navigator** for prospect identification, saved searches, and job change alerts
4. **Enrich prospect data** using Apollo, Clay, and free research methods
5. **Select and configure a CRM** appropriate for your deal volume (<50 active opportunities)
6. **Maintain list hygiene** through verification, decay management, and regular updates
7. **Ensure compliance** with CAN-SPAM and GDPR requirements
8. **Create a sustainable prospecting system** with weekly rhythms and volume targets

---

## SOURCE FRAMEWORKS AND RESEARCH

### From Book Manuscript (Chapter 3: Cutting Through the Noise)

**The Infrastructure Requirement:**
> "Never send cold outreach from your primary domain. If that domain gets blacklisted, your transactional emails (invoices, receipts, customer communications) will fail too. Set up separate domains for cold outreach. I use 5 domains, each with slight variations on my main domain—things like 'get[company].com' or 'try[company].com'. Each domain needs its own email accounts, proper authentication, and a warmup period of 3-4 weeks before you start sending real campaigns."

**The Math:**
> "100 generic emails with 1% response equals 1 conversation. 20 personalized emails with 20% response equals 4 conversations. Which approach do you want?"

**Mike's Stack:**
- 5-domain cold email infrastructure (250/day capacity)
- LinkedIn Navigator → Kanbox → Gemini personalization pipeline
- Listmonk + Mailgun for email automation
- All AI systems configured via API from Cursor IDE

### From LinkedIn Research

**Sales Navigator (2025 Pricing & Features):**
- Sales Navigator Core: $99.99/mo (or $79.99/mo annually)
- "This is the only tier a solo founder needs"
- Includes 50 InMails, advanced filters, saved searches

**Boolean Search Mastery:**
- Use OR to broaden: `SaaS OR Software OR Tech`
- Use AND to narrow: `Founder AND "New York"`
- Use NOT to clean: `Founder NOT "Co-Founder"`
- Use Parentheses for complex: `(Coach OR Consultant) AND (Fitness OR Wellness) AND "Owner"`

**"Spotlight" Filters (Low-Hanging Fruit):**
- "Changed Jobs in Past 90 Days": New execs are 3x more likely to buy
- "Posted on LinkedIn in Past 30 Days": Filters out zombie accounts

### From Outreach Research

**2024/2025 Technical Requirements:**
1. **SPF (Sender Policy Framework):** "I am allowed to send mail from this IP"
2. **DKIM (DomainKeys Identified Mail):** "This email was not tampered with"
3. **DMARC (Domain-based Message Authentication):** "If the ID or seal is broken, reject this email"
- Google requires DMARC policy of at least `p=none` for all senders
- Strict alignment for bulk senders (>5K/day)

**Domain Warmup Protocol:**
- Week 1: 5-10 emails/day
- Week 3: 30-50 emails/day
- 3-4 weeks minimum before real campaigns

**Tools & Pricing (Solo Founder Tier):**
| Tool | Best For | 2025 Pricing | Notes |
|------|----------|--------------|-------|
| Smartlead.ai | High Volume | $39/mo | Unlimited inboxes, includes warmup |
| Instantly.ai | All-in-One | $37/mo | "Unibox" for reply management |
| Mailforge | Infrastructure | ~$3/mailbox | Automates domain/inbox creation |

**Volume Benchmarks:**
- Safe sending: 30-50 emails/day per domain
- Spam complaint threshold: <0.1% (1 in 1,000)
- At 0.3%, Google blocks your domain

### From CRM Research

**The Solo CRM Thesis:**
- Goal is "cognitive offloading," not "reporting compliance"
- Until you have 50 active opportunities, you don't need a $100/mo enterprise CRM
- You need a system that minimizes data entry so you can maximize "time-on-task"

**Category A: Sales Process CRMs (B2B High Volume):**
- Close ($49/mo): Best for solo founders who hate admin, automates logging
- Pipedrive ($14-34/mo): Visual thinkers, enforces discipline

**Category B: Workspace CRMs (Creators & Relationships):**
- Folk ($19/mo): Feels like Notion, acts like CRM. "Magic Field" AI enrichment
- Notion (Free/$10): Flexible but "Procrastibuilding" trap
- Airtable (Free/$20): Best if linking sales to product

**The 4-Layer Calendar (Time Allocation):**
- Layer 1: Inbox (30 min × 3/day)
- Layer 2: Active Prospecting (90 min) – Morning "Golden Hours"
- Layer 3: Maker Time (4 hours)
- Layer 4: Admin/Ops (30 min)

**Warning Sign:**
> "If you spend >50% of your 'Sales Time' on Research (finding leads) rather than Outreach (messaging leads), you are stalling."

### From Compliance Research

**CAN-SPAM (US):**
- Cold emailing businesses is legal if you provide opt-out
- Must include physical address
- Must honor unsubscribe within 10 days

**GDPR (EU):**
- Cold emailing individuals (B2C) largely illegal without consent
- B2B is gray area but stricter
- **Rule:** Stick to business emails (name@company.com), never personal (name@gmail.com)

**Google/Yahoo 2024 Requirements:**
- One-click unsubscribe required in all cold emails
- DMARC mandatory
- Spam rate must stay under 0.1%

---

## COURSE STRUCTURE (10 Lessons)

### Lesson 1: List Building Philosophy

**Duration:** 45 minutes  
**Learning Objectives:**
- Understand why quality trumps quantity in list building
- Translate ICP characteristics into searchable criteria
- Recognize the difference between "list building" and "lead generation"

**Content Outline:**

1. **The Quality vs. Quantity Equation** (8 min)
   - 100 perfect-fit prospects vs. 10,000 random contacts
   - Response rate math: 20% on 50 vs. 1% on 1,000
   - The "spray and pray" trap that burns domains and wastes time
   - Why purchased lists almost always underperform

2. **Translating ICP to Search Criteria** (12 min)
   - ICP document → Boolean search string
   - Firmographic criteria: Industry, company size, geography
   - Demographic criteria: Title, seniority, function
   - Behavioral criteria: Job changes, activity, intent signals
   - The "anti-persona": Who explicitly NOT to target

3. **List Building vs. Lead Generation** (8 min)
   - List building: Finding prospects who match criteria
   - Lead generation: Converting prospects to interested conversations
   - This course focuses on list building; Course 8 (Cold Email) focuses on conversion
   - The handoff point between list and outreach

4. **The Dual Context Reality** (10 min)
   - B2B list building: Company → Person → Contact
   - Creator list building: Community → Individual → Contact
   - Same tools, different search strings
   - Example: Finding "VP of Marketing" vs. finding "aspiring course creators"

5. **Warning Signs of Bad Lists** (7 min)
   - High bounce rates (>5%)
   - Low response rates (<5% on personalized outreach)
   - Pattern of "not a fit" responses
   - Signs your ICP translation is wrong, not your outreach

**Assessment:**
Create your ICP Translation Document: Take your ICP from Course 1 and convert each characteristic into a searchable criterion. Output: Boolean search string draft for LinkedIn Sales Navigator.

---

### Lesson 2: LinkedIn Sales Navigator Mastery

**Duration:** 55 minutes  
**Learning Objectives:**
- Navigate Sales Navigator's interface and filters effectively
- Build and save advanced Boolean searches
- Set up alerts for job changes and activity signals

**Content Outline:**

1. **Sales Navigator Tier Selection** (8 min)
   - Core ($99/mo): The only tier solo founders need
   - What Core includes: 50 InMails, advanced filters, saved searches
   - What you DON'T need: Advanced ($149/mo), Advanced Plus ($1,600/yr)
   - Free alternatives and their limitations

2. **Boolean Search Deep Dive** (15 min)
   - Basic operators: AND, OR, NOT
   - Advanced: Parentheses for complex queries
   - Example builds:
     - B2B: `(VP OR Director) AND (Marketing OR Growth) AND (SaaS OR "Software")`
     - Creator: `(Coach OR Consultant OR Founder) AND (Business OR Executive OR Leadership)`
   - Common mistakes: Overly broad, overly narrow
   - Iterating based on results

3. **Spotlight Filters (The Low-Hanging Fruit)** (10 min)
   - "Changed Jobs in Past 90 Days": New execs 3x more likely to buy new tools
   - "Posted on LinkedIn in Past 30 Days": Filters zombie accounts
   - "Follows Your Company": Already aware of you
   - Company size, funding, growth signals
   - Stacking filters for precision

4. **Saved Searches and Lead Lists** (12 min)
   - Creating reusable saved searches
   - Setting up weekly alerts for new matches
   - Building lead lists for organized outreach
   - The "drip" approach: 20-30 new prospects per week
   - Avoiding over-extraction and account limits

5. **Export Limitations and Compliant Workarounds** (10 min)
   - LinkedIn's data export restrictions
   - What you CAN do: Manual export to CRM
   - Tools that help: Phantombuster (careful with ToS), manual extraction
   - The ethical boundary: Respect platform rules
   - Consequences of violations

**Assessment:**
Build three saved searches in Sales Navigator (or simulate with free LinkedIn): One for your primary ICP, one for a secondary segment, one with "job change" filter. Document the Boolean strings used.

---

### Lesson 3: Apollo and Data Enrichment Tools

**Duration:** 50 minutes  
**Learning Objectives:**
- Use Apollo for finding emails and company data
- Understand data enrichment workflows
- Evaluate data quality and verification needs

**Content Outline:**

1. **What Is Data Enrichment?** (8 min)
   - Starting point: Name + Company from LinkedIn
   - Enrichment adds: Email, phone, company details, intent signals
   - The enrichment stack: Identification → Verification → Scoring
   - Why raw LinkedIn data isn't enough

2. **Apollo Deep Dive** (15 min)
   - Pricing tiers (Free, Basic $49/mo, Professional $99/mo)
   - Core features: Contact search, email finder, intent data
   - Building prospect lists directly in Apollo
   - Exporting and syncing with other tools
   - Accuracy rates and when to verify

3. **Alternative Enrichment Tools** (10 min)
   - Clay (~$149/mo): The power tool—scrapes, enriches, personalizes
   - Hunter.io: Email finding and verification
   - Clearbit: Company data enrichment
   - ZoomInfo: Enterprise-grade (overkill for solo)
   - Comparison: When to use which

4. **Data Verification Best Practices** (10 min)
   - Why verification matters: Bounces hurt sender reputation
   - Email verification tools: NeverBounce, ZeroBounce, MillionVerifier
   - Acceptable bounce rate: <2%
   - Catch-all emails: The gray zone
   - Re-verification cadence (every 3-6 months)

5. **Intent Signals and Prioritization** (7 min)
   - What intent signals are: Buying behavior indicators
   - Apollo's intent data: Website visits, job postings, funding
   - Prioritizing high-intent prospects
   - Warning: Intent data isn't magic—still need qualification

**Assessment:**
Create an enrichment workflow document: Source (LinkedIn) → Enrichment tool → Verification → CRM. Test with 10 prospects and document email accuracy.

---

### Lesson 4: Free Research Methods

**Duration:** 50 minutes  
**Learning Objectives:**
- Build prospect lists without paid tools
- Use community mining techniques effectively
- Develop manual research skills that improve AI-assisted work

**Content Outline:**

1. **Why Free Methods Still Matter** (8 min)
   - Budget constraints at early stages
   - Deeper understanding of prospects through manual research
   - Better personalization from hands-on research
   - Skills that improve even paid tool usage

2. **LinkedIn Free Search Techniques** (12 min)
   - Using free LinkedIn filters effectively
   - Google site search: `site:linkedin.com "VP Marketing" "SaaS"`
   - Company pages → Employees → Target titles
   - Group membership mining
   - Limitations: 100 searches/month typical

3. **Community Mining** (12 min)
   - Where your ICP gathers: Slack communities, Discord, Reddit
   - Finding active participants (not lurkers)
   - Subreddit research: Top posters, commenters
   - Industry forums and discussion boards
   - Building lists from event attendees (webinars, conferences)

4. **Public Data Sources** (10 min)
   - Crunchbase (funding, leadership changes)
   - Product Hunt (founders, early adopters)
   - Twitter/X bios and following patterns
   - Podcast guest lists (industry thought leaders)
   - Newsletter subscriber directories (some newsletters share)

5. **Manual Research for High-Value Targets** (8 min)
   - When to invest 30+ minutes on one prospect
   - The "top 20%" list that gets manual treatment
   - Company website deep dive: Press releases, team pages, blog
   - Building prospect dossiers for enterprise deals

**Assessment:**
Build a 25-prospect list using ONLY free methods. Document the source for each prospect and time spent. Compare quality to a paid-tool list.

---

### Lesson 5: Email Infrastructure Setup

**Duration:** 55 minutes  
**Learning Objectives:**
- Configure SPF, DKIM, and DMARC records correctly
- Set up dedicated outbound domains
- Understand DNS and email authentication at a practical level

**Content Outline:**

1. **Why Technical Setup Matters** (8 min)
   - Google/Yahoo 2024 requirements are mandatory
   - Without authentication: Straight to spam
   - One wrong setting can tank deliverability
   - The technical debt of skipping this step

2. **Domain Strategy** (12 min)
   - Never send cold email from primary domain
   - Buying lookalike domains: get[company].com, try[company].com
   - How many domains? 2-3 for starters, up to 5 for scale
   - Domain age considerations (older is better)
   - Mike's setup: 5 domains with 250/day capacity total

3. **SPF (Sender Policy Framework)** (10 min)
   - What it does: Authorizes IPs to send for your domain
   - DNS record format: TXT record
   - Including your sending tools (Instantly, Smartlead, etc.)
   - Common mistakes: Too many includes, syntax errors
   - Testing: MXToolbox SPF checker

4. **DKIM (DomainKeys Identified Mail)** (10 min)
   - What it does: Cryptographic signature proving email wasn't tampered
   - Generated by your sending tool
   - Adding the DNS TXT record
   - Key rotation (most tools handle automatically)
   - Testing: DKIM validators

5. **DMARC (Domain-based Message Authentication)** (10 min)
   - What it does: Instructions for receiving servers
   - Policy levels: none, quarantine, reject
   - Starting point: `v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com`
   - Monitoring reports to catch issues
   - Progression: none → quarantine → reject over time

6. **Step-by-Step Setup Checklist** (5 min)
   - Domain registrar (Namecheap, Cloudflare)
   - DNS access and record creation
   - Verification tools and tests
   - Documentation for future reference

**Assessment:**
Complete the Email Infrastructure Checklist: Purchase one lookalike domain, configure SPF, DKIM, DMARC. Verify all three using MXToolbox. Screenshot results.

---

### Lesson 6: Domain Warming Strategy

**Duration:** 50 minutes  
**Learning Objectives:**
- Execute proper domain warmup protocols
- Use automated warmup tools effectively
- Recognize signs of warmup issues and how to address them

**Content Outline:**

1. **Why Warmup Is Non-Negotiable** (8 min)
   - New domains have no sending reputation
   - Sending volume too fast = spam folder
   - ISPs watch sending patterns for new domains
   - Warmup period: 3-4 weeks minimum

2. **The Warmup Protocol** (12 min)
   - Week 1: 5-10 emails/day
   - Week 2: 15-25 emails/day
   - Week 3: 30-50 emails/day
   - Week 4: Ramp to target volume (50-100/day per domain)
   - Gradual increase is key—sudden spikes trigger filters

3. **Automated Warmup Tools** (12 min)
   - What they do: Send emails between members of a warmup network
   - Open, reply, mark as "not spam" to build reputation
   - Built-in: Smartlead, Instantly (included in subscription)
   - Standalone: Warmbox, Mailwarm
   - Running warmup alongside real sending (continue warmup indefinitely)

4. **Warmup Monitoring and Adjustment** (10 min)
   - Metrics to watch: Inbox placement rate, bounce rate, reply rate
   - Signs of trouble: Sudden drop in inbox placement
   - Recovery: Reduce volume, increase warmup ratio
   - When to pause and reset

5. **The "Drip Start" Approach** (8 min)
   - Even after warmup, don't go from 0 to 100
   - Start real campaigns at 20% of target volume
   - Increase 10-20% per week as metrics hold
   - Building sustainable sending habits

**Assessment:**
Create a Domain Warmup Calendar: 4-week schedule showing daily send volume targets, warmup tool configuration, and milestone checkpoints.

---

### Lesson 7: CRM Selection and Setup

**Duration:** 55 minutes  
**Learning Objectives:**
- Select the right CRM for your deal volume and context
- Configure essential fields and stages
- Avoid "procrastibuilding" while maintaining usability

**Content Outline:**

1. **The Solo Founder CRM Philosophy** (10 min)
   - Goal: Cognitive offloading, not reporting compliance
   - Rule of 50: Until 50 active opportunities, keep it simple
   - Time saved on data entry = time for actual outreach
   - The "procrastibuilding" trap: Building perfect system vs. using imperfect one

2. **CRM Categories and Recommendations** (12 min)
   - **Sales Process CRMs (B2B High Volume):**
     - Close ($49/mo): Automates logging, hates admin
     - Pipedrive ($14-34/mo): Visual, enforces discipline
   - **Workspace CRMs (Creator/Relationships):**
     - Folk ($19/mo): Like Notion + CRM, "Magic Field" enrichment
     - Notion (Free/$10): Flexible but setup overhead
     - Airtable (Free/$20): Best for linking sales to product
   - Matching CRM to context from Course 3

3. **Essential Configuration** (12 min)
   - Pipeline stages (aligned with Course 20: Pipeline Management):
     - Lead/Identified → Contacted → Discovery → Proposal → Closing → Won/Lost
   - Required fields (keep minimal):
     - Name, Company, Email, Source, Stage, Next Action
   - Custom fields for your context (max 3-5)
   - Deal values and forecasting basics

4. **Integration Essentials** (12 min)
   - Email sync: Automatic logging of correspondence
   - Calendar integration: Meeting scheduling
   - LinkedIn connection (where available)
   - Zapier/Make for additional connections
   - Which integrations to set up first (email sync wins)

5. **The "15-Minute CRM" Routine** (9 min)
   - Daily: Update stages on active deals (5 min)
   - Weekly: Clean up, add new prospects, archive stale (10 min)
   - Monthly: Pipeline review, data hygiene
   - If it takes longer than 15 min/day, you're overcomplicating

**Assessment:**
Configure your CRM (selected tool): Set up pipeline stages, essential fields, and email sync. Import your 25-prospect list from Lesson 4. Document your 15-minute routine.

---

### Lesson 8: List Hygiene and Maintenance

**Duration:** 45 minutes  
**Learning Objectives:**
- Maintain list quality over time
- Handle email decay and invalid contacts
- Build sustainable list management practices

**Content Outline:**

1. **The List Decay Problem** (8 min)
   - Email addresses decay at ~2-3% per month
   - People change jobs, companies shut down
   - Sending to invalid addresses hurts reputation
   - The maintenance tax: Required ongoing work

2. **Email Verification Cadence** (10 min)
   - Before first send: 100% verification
   - Every 3 months: Re-verify active lists
   - Before any large campaign: Spot-check verification
   - Tools: NeverBounce, ZeroBounce (~$0.003/email)
   - Acceptable bounce rate target: <2%

3. **Handling Bounces and Opt-Outs** (10 min)
   - Hard bounces: Remove immediately
   - Soft bounces: Retry once, then remove
   - Unsubscribes: Immediate removal (legal requirement)
   - Complaint handling: Never email again
   - The suppression list: Keeping track of who NOT to email

4. **List Segmentation and Organization** (10 min)
   - Segments by ICP tier (perfect fit, good fit, maybe)
   - Segments by stage (new, contacted, engaged, dead)
   - Segments by source (LinkedIn, Apollo, referral)
   - When to archive vs. delete
   - Avoiding "list bloat" that clutters workflow

5. **The Monthly List Audit** (7 min)
   - Check: List size growth vs. decay
   - Check: Bounce rates by segment
   - Check: Response rates by source
   - Action: Prune dead segments
   - Action: Refresh high-priority segments

**Assessment:**
Perform a list audit on your 25-prospect list: Verify all emails, segment by fit, document any issues found. Create your monthly audit checklist.

---

### Lesson 9: Compliance: CAN-SPAM and GDPR

**Duration:** 50 minutes  
**Learning Objectives:**
- Understand and comply with CAN-SPAM requirements
- Navigate GDPR considerations for B2B outreach
- Build compliant processes from the start

**Content Outline:**

1. **Why Compliance Matters Beyond Law** (8 min)
   - Legal risk: Fines and penalties
   - Reputation risk: Brand damage
   - Deliverability risk: ISPs punish non-compliance
   - The "don't be a jerk" principle: Good compliance = good practices

2. **CAN-SPAM Requirements (US)** (12 min)
   - Applies to: Commercial email to US recipients
   - Key requirements:
     - Clear identification of sender
     - Physical mailing address
     - Honest subject lines
     - Unsubscribe mechanism (honor within 10 days)
     - No harvested or purchased lists (technically)
   - B2B cold email is legal under CAN-SPAM with opt-out
   - Penalties: Up to $50,000+ per violation

3. **GDPR Considerations (EU)** (12 min)
   - Applies to: EU residents, regardless of your location
   - B2B vs. B2C distinction:
     - B2C: Requires prior consent (cold email largely illegal)
     - B2B: Gray area—"legitimate interest" basis possible
   - Practical guidance:
     - Only email business addresses (name@company.com)
     - Never email personal addresses (name@gmail.com) cold
     - Document your legitimate interest basis
     - Provide clear opt-out

4. **The One-Click Unsubscribe Requirement** (8 min)
   - Google/Yahoo 2024 mandate
   - List-Unsubscribe header in every email
   - Most sending tools handle automatically
   - Testing that it works

5. **Building Compliant Processes** (10 min)
   - Suppression list management
   - Record-keeping: When contact was added, source, consent
   - Audit trail: Proving compliance if challenged
   - Template compliance checklist

**Assessment:**
Complete the Compliance Checklist: Verify your sending tool includes unsubscribe, add physical address to templates, configure suppression list. Document your GDPR legitimate interest basis (if emailing EU).

---

### Lesson 10: Your Prospecting System

**Duration:** 55 minutes  
**Learning Objectives:**
- Design a sustainable weekly prospecting rhythm
- Set appropriate volume targets for your context
- Build the habit that generates consistent pipeline

**Content Outline:**

1. **The Prospecting Problem** (8 min)
   - Feast or famine: Intense periods followed by nothing
   - Why founders avoid prospecting (fear, distraction, "more important" work)
   - The compound effect: Consistent activity beats sporadic intensity
   - Research benchmark: 90 minutes/day of prospecting produces results

2. **Time Allocation by Context** (10 min)
   - **B2B SaaS:** 15-20 hours/week on acquisition
     - Research/list building: 3-4 hours
     - Outreach execution: 8-10 hours
     - Follow-up and admin: 3-4 hours
   - **Creator/Coach:** 10-15 hours/week on acquisition
     - Content creation: 5-7 hours
     - Engagement and DMs: 3-5 hours
     - List building: 2-3 hours
   - **Service:** 8-12 hours/week on acquisition
     - Relationship maintenance: 4-5 hours
     - Targeted outreach: 3-4 hours
     - Content: 2-3 hours

3. **The Weekly Rhythm Template** (12 min)
   - **Monday:** Prospect identification (add 20-30 new to CRM)
   - **Tuesday-Thursday:** Outreach and engagement
   - **Friday:** Follow-up, admin, next week prep
   - The "90-minute morning block": Prospecting before email
   - Protecting prospecting time from "urgent" distractions

4. **Volume Targets and Benchmarks** (12 min)
   - **Cold email:** 30-50/day per domain (sustainable)
   - **LinkedIn:** 20-30 touches/day (connections + messages)
   - **High-touch outreach:** 5-10/day for premium targets
   - Response rate benchmarks:
     - Cold email: 10-20% positive response
     - Warm LinkedIn: 30%+ response
   - Pipeline math: Work backward from revenue goal

5. **Building the Habit** (8 min)
   - Calendar blocking: Treat it like a meeting with your most important client
   - Minimum viable prospecting: Even 30 min is better than zero
   - Accountability: Tracking weekly metrics
   - The 90-day commitment: Don't evaluate strategy until you've executed consistently

6. **Bringing It All Together** (5 min)
   - Your complete prospecting infrastructure:
     - ICP → Boolean searches → Data enrichment → Verification
     - Domains → Authentication → Warmup → CRM
     - Weekly rhythm → Volume targets → Metrics
   - The system is now ready for Course 8 (Cold Email) and Course 7 (LinkedIn)

**Assessment:**
Create your Personal Prospecting System document: Weekly calendar with time blocks, volume targets by channel, 90-day metric goals. First week of prospecting logged with results.

---

## CONTENT GENERATION PROMPTS

### Universal Context Block

```
You are creating educational content for Course 4: List Building & Prospecting Infrastructure

CONTEXT:
- Platform: SoloFrameHub (Customer Acquisition Academy)
- Audience: Solo founders selling both B2B products/services AND creator offers
- Voice: Practitioner with 30+ years experience (Mike's voice)
  - Technical credibility: Built 5-domain cold email infrastructure
  - Specific stack references: LinkedIn Navigator → Kanbox → Gemini pipeline, Listmonk + Mailgun
  - Humble, direct: "Here's what I've set up" not "Here's the only way"

CORE THESIS:
Quality trumps quantity in list building. 100 perfect-fit prospects outperform 10,000 random contacts. The goal is translation—converting your ICP into actual names and contacts.

DUAL CONTEXT REQUIREMENT:
Every lesson must include examples from BOTH:
1. B2B context (e.g., finding "VP of Marketing at SaaS companies")
2. Creator context (e.g., finding "aspiring course creators in business coaching")

TECHNICAL DEPTH:
This course requires technical accuracy. SPF, DKIM, DMARC must be explained correctly. Boolean syntax must be accurate. Tool pricing must be current (use 2025 pricing from research).

AVOID:
- Encouraging purchased lists or scraped data
- Suggesting ToS-violating extraction tools
- Oversimplifying technical requirements
- Generic advice without specific steps
- Enterprise examples with large teams
```

### Lesson 1 Prompt

```
LESSON: 1 - List Building Philosophy
FOCUS: Establish the quality-over-quantity mindset and ICP translation concept

SOURCE FRAMEWORKS:
- "100 perfect-fit vs. 10,000 random contacts" math from book manuscript
- "spray and pray" trap
- ICP translation concept

CONTENT REQUIREMENTS:
1. Open with the quality equation: Response rate math showing quality wins
2. ICP Translation: Document → Search criteria → Real prospects
3. Differentiate list building (finding) from lead generation (converting)
4. Dual context: B2B vs. Creator list building approaches
5. Warning signs of bad lists (bounce rates, wrong-fit responses)

PRACTITIONER VOICE:
"When I first started doing outreach, I bought a list of 5,000 'marketing decision-makers.' Within a week, my domain was flagged for spam. Now I build lists manually, 50 prospects at a time. Response rates went from 1% to 20%."

OUTPUT FORMAT:
- 1100-1300 words
- Clear ICP translation framework (table format)
- Key takeaways: 4-5 bullets
- Assessment: ICP Translation Document with Boolean search string draft
```

### Lesson 2 Prompt

```
LESSON: 2 - LinkedIn Sales Navigator Mastery
FOCUS: Practical Sales Navigator usage with Boolean search mastery

SOURCE FRAMEWORKS:
- Sales Navigator pricing: Core $99/mo (only tier solo founders need)
- Boolean operators: AND, OR, NOT, Parentheses
- "Spotlight" filters: Job changes (3x more likely), Posted in 30 days
- 50 InMails included in Core

CONTENT REQUIREMENTS:
1. Tier selection: Why Core is enough, what you don't need
2. Boolean search deep dive with example builds for B2B AND Creator contexts
3. Spotlight filters as low-hanging fruit
4. Saved searches and lead lists for organized prospecting
5. Export limitations and ethical workarounds

DUAL EXAMPLES:
- B2B Boolean: `(VP OR Director) AND (Marketing OR Growth) AND (SaaS OR "Software")`
- Creator Boolean: `(Coach OR Consultant OR Founder) AND (Business OR Executive)`

TECHNICAL ACCURACY:
Boolean syntax must be correct. Use quotes for exact phrases. Test examples before including.

OUTPUT FORMAT:
- 1300-1500 words
- Boolean search examples (code-formatted)
- Key takeaways: 5 bullets
- Assessment: Three saved searches with documented Boolean strings
```

### Lesson 3 Prompt

```
LESSON: 3 - Apollo and Data Enrichment Tools
FOCUS: Data enrichment workflows and tool selection

SOURCE FRAMEWORKS:
- Apollo pricing (Free, Basic $49/mo, Professional $99/mo)
- Clay (~$149/mo) for power users
- Verification tools: NeverBounce, ZeroBounce (~$0.003/email)
- Acceptable bounce rate: <2%

CONTENT REQUIREMENTS:
1. What enrichment adds: Name + Company → Email, phone, company data, intent
2. Apollo deep dive: Features, pricing, accuracy considerations
3. Alternative tools and when to use each
4. Verification best practices and acceptable bounce rates
5. Intent signals and prioritization

PRACTITIONER NOTE:
"I use Apollo for bulk enrichment and Clay for high-value prospects where I need deeper research. The extra $100/month for Clay pays for itself if it helps me close one additional deal."

OUTPUT FORMAT:
- 1200-1400 words
- Tool comparison table (pricing, features, best for)
- Key takeaways: 5 bullets
- Assessment: Enrichment workflow document with 10-prospect test
```

### Lesson 4 Prompt

```
LESSON: 4 - Free Research Methods
FOCUS: Building lists without paid tools

SOURCE FRAMEWORKS:
- Google site search: `site:linkedin.com "VP Marketing" "SaaS"`
- Community mining: Slack, Discord, Reddit, forums
- Public data: Crunchbase, Product Hunt, Twitter bios, podcast guests
- Newsletter subscriber directories

CONTENT REQUIREMENTS:
1. Why free methods matter even with budget
2. LinkedIn free search techniques with Google site search
3. Community mining strategies for finding active participants
4. Public data sources and how to use them
5. Manual research for high-value "top 20%" targets

DUAL EXAMPLES:
- B2B: Mining SaaS-focused Slack communities for marketing leaders
- Creator: Finding active commenters in entrepreneurship subreddits

OUTPUT FORMAT:
- 1200-1400 words
- Source-by-source guide
- Key takeaways: 5 bullets
- Assessment: 25-prospect list using ONLY free methods with source documentation
```

### Lesson 5 Prompt

```
LESSON: 5 - Email Infrastructure Setup
FOCUS: Technical email authentication (SPF, DKIM, DMARC)

SOURCE FRAMEWORKS:
- Google/Yahoo 2024 requirements (mandatory)
- SPF: TXT record authorizing sending IPs
- DKIM: Cryptographic signature
- DMARC: Policy for handling failures
- Domain strategy: 2-5 lookalike domains

CONTENT REQUIREMENTS:
1. Why technical setup matters (without it = spam folder)
2. Domain strategy: Never use primary domain, buy lookalikes
3. SPF explanation and setup (TXT record format)
4. DKIM explanation and setup (generated by sending tool)
5. DMARC explanation and setup (start with p=none)
6. Step-by-step checklist with verification tools

PRACTITIONER CREDIBILITY:
"My setup: 5 domains—getsoloframehub.com, trysoloframehub.com, and three others. Each has its own Google Workspace account, proper authentication, and warmup. Total capacity: 250 emails/day."

TECHNICAL ACCURACY:
DNS record formats must be correct. Reference MXToolbox for testing. Include common mistakes to avoid.

OUTPUT FORMAT:
- 1300-1500 words
- SPF/DKIM/DMARC explanation (technical but accessible)
- Setup checklist (step-by-step)
- Key takeaways: 5 bullets
- Assessment: Configure one domain with all three, verify with MXToolbox screenshots
```

### Lesson 6 Prompt

```
LESSON: 6 - Domain Warming Strategy
FOCUS: Proper warmup protocols to establish sender reputation

SOURCE FRAMEWORKS:
- Warmup protocol: Week 1 (5-10/day) → Week 4 (50-100/day)
- Automated tools: Smartlead warmup, Instantly warmup (included)
- 3-4 weeks minimum before real campaigns
- Continue warmup indefinitely alongside sending

CONTENT REQUIREMENTS:
1. Why warmup is non-negotiable (new domains have no reputation)
2. Week-by-week warmup protocol with specific volumes
3. Automated warmup tools and how they work
4. Monitoring metrics: Inbox placement, bounce rate
5. The "drip start" approach for real campaigns

PRACTITIONER NOTE:
"I've burned two domains by getting impatient and skipping warmup. Now I treat the 4-week warmup as sacred. It's boring, but it's the foundation everything else depends on."

OUTPUT FORMAT:
- 1100-1300 words
- 4-week warmup calendar (table format)
- Key takeaways: 4-5 bullets
- Assessment: Domain Warmup Calendar with daily targets and milestones
```

### Lesson 7 Prompt

```
LESSON: 7 - CRM Selection and Setup
FOCUS: Choosing and configuring appropriate CRM for solo founder context

SOURCE FRAMEWORKS:
- CRM categories: Sales Process (Close, Pipedrive) vs. Workspace (Folk, Notion, Airtable)
- Close: $49/mo, best for admin-haters
- Pipedrive: $14-34/mo, visual enforcement
- Folk: $19/mo, Notion-feel with CRM function
- "Rule of 50": Until 50 opportunities, keep it simple
- "Procrastibuilding" trap

CONTENT REQUIREMENTS:
1. Solo founder CRM philosophy: Cognitive offloading, not reporting
2. CRM categories with recommendations by context (B2B vs. Creator)
3. Essential configuration: Stages, fields (keep minimal)
4. Integration priorities: Email sync first
5. The "15-minute CRM" routine

PRACTITIONER WARNING:
"I spent 3 weeks building a 'perfect' Notion CRM with 50 custom properties. Then I realized I'd sent zero emails in those 3 weeks. Now I use Pipedrive with 6 fields. Less elegant, way more effective."

OUTPUT FORMAT:
- 1300-1500 words
- CRM comparison table (pricing, best for, key features)
- Minimal field configuration example
- Key takeaways: 5 bullets
- Assessment: Configure CRM, import prospects, document 15-minute routine
```

### Lesson 8 Prompt

```
LESSON: 8 - List Hygiene and Maintenance
FOCUS: Maintaining list quality over time

SOURCE FRAMEWORKS:
- Email decay: ~2-3% per month
- Verification cadence: Before first send, every 3 months
- Bounce rate target: <2%
- Hard vs. soft bounces
- Suppression list management

CONTENT REQUIREMENTS:
1. The decay problem: Addresses go bad constantly
2. Verification cadence and tools (NeverBounce, ZeroBounce)
3. Handling bounces and opt-outs (legal requirements)
4. Segmentation strategies
5. Monthly audit process

OUTPUT FORMAT:
- 1000-1200 words
- Monthly audit checklist
- Key takeaways: 4-5 bullets
- Assessment: Audit 25-prospect list, verify, segment, document issues
```

### Lesson 9 Prompt

```
LESSON: 9 - Compliance: CAN-SPAM and GDPR
FOCUS: Legal compliance for email outreach

SOURCE FRAMEWORKS:
- CAN-SPAM: US requirements (sender ID, physical address, unsubscribe, honest subjects)
- GDPR: EU requirements (B2B gray area, legitimate interest basis)
- One-click unsubscribe: Google/Yahoo 2024 mandate
- B2B vs. B2C distinctions

CONTENT REQUIREMENTS:
1. Why compliance matters beyond law (reputation, deliverability)
2. CAN-SPAM requirements with practical application
3. GDPR considerations (B2B vs. B2C, legitimate interest)
4. One-click unsubscribe requirement
5. Building compliant processes from start

LEGAL DISCLAIMER:
"This is practical guidance, not legal advice. If you're sending at significant volume or targeting heavily regulated industries, consult with an attorney."

OUTPUT FORMAT:
- 1200-1400 words
- CAN-SPAM checklist
- GDPR decision tree
- Key takeaways: 5 bullets
- Assessment: Complete compliance checklist, document GDPR basis
```

### Lesson 10 Prompt

```
LESSON: 10 - Your Prospecting System
FOCUS: Building sustainable weekly rhythm with appropriate volume targets

SOURCE FRAMEWORKS:
- Time allocation by context (B2B 15-20 hrs, Creator 10-15 hrs, Service 8-12 hrs)
- Weekly rhythm: Monday (research) → Tue-Thu (outreach) → Friday (follow-up)
- Volume targets: 30-50 cold emails/day, 20-30 LinkedIn touches/day
- 90-minute morning block research
- The compound effect of consistency

CONTENT REQUIREMENTS:
1. The feast-or-famine problem and why consistency wins
2. Time allocation templates by context
3. Weekly rhythm template
4. Volume targets and response rate benchmarks
5. Building the habit: Calendar blocking, minimum viable prospecting
6. Summary: Complete infrastructure ready for Course 7 and 8

PRACTITIONER VOICE:
"For two years, my prospecting was inconsistent—intense bursts followed by weeks of nothing. Revenue was a rollercoaster. Now I protect 90 minutes every morning before checking email. Pipeline is steady, and so is revenue."

OUTPUT FORMAT:
- 1300-1500 words
- Weekly rhythm template (table by day)
- Volume targets by context (table)
- Key takeaways: 5 bullets
- Assessment: Personal Prospecting System document with first-week log
```

---

## QUALITY CHECKLIST

Content must be verified against:

- [ ] Technical accuracy: SPF/DKIM/DMARC records formatted correctly
- [ ] Boolean syntax: Quotes, operators, parentheses used properly
- [ ] Tool pricing: Reflects 2025 rates from research
- [ ] Dual context: Both B2B and Creator examples in each lesson
- [ ] Compliance: CAN-SPAM and GDPR requirements stated accurately
- [ ] Volume benchmarks: Consistent with research (30-50/day safe)
- [ ] Mike's practitioner voice: Stack references, specific numbers, humble tone
- [ ] No ToS violations: LinkedIn extraction stays within guidelines
- [ ] Step-by-step clarity: Technical setups have clear instructions
- [ ] Assessment practicality: Each exercise produces tangible artifact
- [ ] Course connections: References to Course 1 (ICP), Course 7 (LinkedIn), Course 8 (Cold Email)
- [ ] Warning signs: Each lesson includes what-can-go-wrong guidance
- [ ] Time estimates: Realistic for solo founder execution
- [ ] No purchased lists: Quality-over-quantity message consistent

---

## CONNECTION TO OTHER COURSES

### Builds On (Prerequisites)

**Course 1: ICP Builder Workshop**
- List building is ICP translation—can't build lists without defined ICP
- Reference: "Take your ICP from Course 1 and convert each characteristic into a searchable criterion"

**Course 2: Positioning & Value Proposition**
- Positioning determines how you talk about yourself in outreach
- Reference: "Your positioning informs your LinkedIn profile optimization and email messaging"

**Course 3: Choose Your Acquisition Path**
- Context determines volume and channel priorities
- Reference: "Your context from Course 3 sets your prospecting time allocation and tool choices"

### Feeds Into (Downstream Courses)

**Course 7: LinkedIn Growth Engine**
- Uses Sales Navigator setup from Lesson 2
- Uses prospect lists for engagement campaigns
- Reference: "The saved searches you built in Course 4 become your engagement targets"

**Course 8: Cold Email Mastery**
- Uses infrastructure from Lessons 5-6 (domains, warmup)
- Uses verified lists from Lessons 3-4
- Reference: "Course 4 built your infrastructure. Course 8 teaches what to say."

**Course 14: Discovery Framework**
- Prospect lists become discovery call candidates
- CRM setup supports deal tracking
- Reference: "The prospects you identify here become discovery conversations"

**Course 20: Sales Pipeline Management**
- CRM configuration from Lesson 7 feeds pipeline tracking
- List quality affects pipeline quality

---

## ARTIFACTS CREATED BY THIS COURSE

1. **ICP Translation Document** (Lesson 1)
   - ICP characteristics mapped to search criteria
   - Boolean search string draft

2. **Sales Navigator Saved Searches** (Lesson 2)
   - Primary ICP search
   - Secondary segment search
   - Job change filter search

3. **Enrichment Workflow Document** (Lesson 3)
   - Source → Enrichment → Verification → CRM flow
   - 10-prospect test results

4. **Free Methods Prospect List** (Lesson 4)
   - 25 prospects with documented sources
   - Time analysis comparison

5. **Email Infrastructure Checklist** (Lesson 5)
   - Domain purchase confirmation
   - SPF/DKIM/DMARC verification screenshots

6. **Domain Warmup Calendar** (Lesson 6)
   - 4-week daily volume targets
   - Milestone checkpoints

7. **CRM Configuration Guide** (Lesson 7)
   - Pipeline stages
   - Essential fields
   - 15-minute routine documentation

8. **Compliance Checklist** (Lesson 9)
   - CAN-SPAM requirements verified
   - GDPR legitimate interest basis documented

9. **Personal Prospecting System** (Lesson 10)
   - Weekly calendar with time blocks
   - Volume targets by channel
   - First-week activity log

**Completion Badge:** "List Builder" - 150 XP

---

## FILE PATH MAPPING

### Lesson Content Output Paths

```
server/data/content/foundations/list-building/lesson-1.md   # List Building Philosophy
server/data/content/foundations/list-building/lesson-2.md   # LinkedIn Sales Navigator Mastery
server/data/content/foundations/list-building/lesson-3.md   # Apollo and Data Enrichment Tools
server/data/content/foundations/list-building/lesson-4.md   # Free Research Methods
server/data/content/foundations/list-building/lesson-5.md   # Email Infrastructure Setup
server/data/content/foundations/list-building/lesson-6.md   # Domain Warming Strategy
server/data/content/foundations/list-building/lesson-7.md   # CRM Selection and Setup
server/data/content/foundations/list-building/lesson-8.md   # List Hygiene and Maintenance
server/data/content/foundations/list-building/lesson-9.md   # Compliance: CAN-SPAM and GDPR
server/data/content/foundations/list-building/lesson-10.md  # Your Prospecting System
```

### Quiz JSON Output Paths

```
server/data/quizzes/foundations/list-building/lesson-1.json
server/data/quizzes/foundations/list-building/lesson-2.json
server/data/quizzes/foundations/list-building/lesson-3.json
server/data/quizzes/foundations/list-building/lesson-4.json
server/data/quizzes/foundations/list-building/lesson-5.json
server/data/quizzes/foundations/list-building/lesson-6.json
server/data/quizzes/foundations/list-building/lesson-7.json
server/data/quizzes/foundations/list-building/lesson-8.json
server/data/quizzes/foundations/list-building/lesson-9.json
server/data/quizzes/foundations/list-building/lesson-10.json
```

### Artifact Output Paths

```
server/data/artifacts/foundations/list-building/icp-translation-document.json
server/data/artifacts/foundations/list-building/sales-navigator-searches.json
server/data/artifacts/foundations/list-building/enrichment-workflow.json
server/data/artifacts/foundations/list-building/free-methods-prospect-list.json
server/data/artifacts/foundations/list-building/email-infrastructure-checklist.json
server/data/artifacts/foundations/list-building/domain-warmup-calendar.json
server/data/artifacts/foundations/list-building/crm-configuration-guide.json
server/data/artifacts/foundations/list-building/compliance-checklist.json
server/data/artifacts/foundations/list-building/personal-prospecting-system.json
```

---

## QUIZ JSON TEMPLATE

Each lesson requires a quiz with **5 multiple choice questions + 1 reflection question**.

### Schema Structure

```json
{
  "courseId": "course-04-list-building-prospecting",
  "lessonId": "lesson-X",
  "lessonTitle": "Lesson Title Here",
  "track": "foundations",
  "version": "1.0.0",
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "Question text here?",
      "options": [
        { "id": "a", "text": "Option A text" },
        { "id": "b", "text": "Option B text" },
        { "id": "c", "text": "Option C text" },
        { "id": "d", "text": "Option D text" }
      ],
      "correctAnswer": "b",
      "explanation": "Explanation of why B is correct and why other options are incorrect.",
      "difficulty": "foundational",
      "xpValue": 10
    },
    {
      "id": "q2",
      "type": "multiple_choice",
      "question": "...",
      "options": [...],
      "correctAnswer": "...",
      "explanation": "...",
      "difficulty": "application",
      "xpValue": 15
    },
    {
      "id": "q3",
      "type": "multiple_choice",
      "question": "...",
      "options": [...],
      "correctAnswer": "...",
      "explanation": "...",
      "difficulty": "application",
      "xpValue": 15
    },
    {
      "id": "q4",
      "type": "multiple_choice",
      "question": "...",
      "options": [...],
      "correctAnswer": "...",
      "explanation": "...",
      "difficulty": "synthesis",
      "xpValue": 20
    },
    {
      "id": "q5",
      "type": "multiple_choice",
      "question": "...",
      "options": [...],
      "correctAnswer": "...",
      "explanation": "...",
      "difficulty": "synthesis",
      "xpValue": 20
    },
    {
      "id": "reflection",
      "type": "reflection",
      "question": "Open-ended reflection question that connects lesson content to the founder's specific situation.",
      "promptHints": [
        "Consider your current business context",
        "Think about specific examples from your experience",
        "How does this apply to your ICP?"
      ],
      "minimumWords": 50,
      "xpValue": 25,
      "aiEvaluationCriteria": {
        "requiresSpecificity": true,
        "requiresPersonalContext": true,
        "requiresActionableInsight": true
      }
    }
  ],
  "passingScore": 70,
  "totalXP": 105,
  "metadata": {
    "estimatedTime": "8-10 minutes",
    "prerequisiteQuizzes": ["lesson-X-1"],
    "unlocks": ["lesson-X+1"]
  }
}
```

### Difficulty Levels

| Level | Description | XP Value | Questions Per Quiz |
|-------|-------------|----------|-------------------|
| **foundational** | Direct recall of key concepts | 10 XP | 1 |
| **application** | Applying concepts to scenarios | 15 XP | 2 |
| **synthesis** | Combining multiple concepts, judgment calls | 20 XP | 2 |
| **reflection** | Open-ended, personal application | 25 XP | 1 |

### Course 4 Quiz Content Guidelines

**Lesson 1 Quiz Focus:** Quality vs. quantity, ICP translation concept
- Q1 (foundational): Response rate math (quality vs. volume)
- Q2-Q3 (application): ICP characteristic → search criteria translation
- Q4-Q5 (synthesis): Warning signs of bad lists, list building vs. lead generation
- Reflection: "Translate one ICP characteristic to a search criterion"

**Lesson 2 Quiz Focus:** Sales Navigator features, Boolean search syntax
- Q1 (foundational): Sales Navigator Core pricing/features
- Q2-Q3 (application): Boolean operator usage, Spotlight filter selection
- Q4-Q5 (synthesis): Complex Boolean string construction, search refinement
- Reflection: "Write a Boolean search string for your ICP"

**Lesson 3 Quiz Focus:** Data enrichment workflow, tool selection
- Q1 (foundational): What enrichment adds to raw LinkedIn data
- Q2-Q3 (application): Tool selection for specific needs, verification decisions
- Q4-Q5 (synthesis): Intent signal interpretation, enrichment workflow design
- Reflection: "Design your enrichment workflow"

**Lesson 4 Quiz Focus:** Free research methods, community mining
- Q1 (foundational): Google site search syntax
- Q2-Q3 (application): Community mining tactics, source selection
- Q4-Q5 (synthesis): When to invest in manual research, quality comparison
- Reflection: "Identify 3 communities where your ICP gathers"

**Lesson 5 Quiz Focus:** SPF, DKIM, DMARC technical understanding
- Q1 (foundational): What SPF does
- Q2-Q3 (application): Domain strategy decisions, authentication troubleshooting
- Q4-Q5 (synthesis): Complete infrastructure setup decisions, verification
- Reflection: "Document your planned domain strategy"

**Lesson 6 Quiz Focus:** Warmup protocols, reputation building
- Q1 (foundational): Minimum warmup period
- Q2-Q3 (application): Volume progression decisions, tool configuration
- Q4-Q5 (synthesis): Warmup problem diagnosis, recovery strategies
- Reflection: "Create your warmup calendar timeline"

**Lesson 7 Quiz Focus:** CRM selection, configuration best practices
- Q1 (foundational): "Rule of 50" concept
- Q2-Q3 (application): CRM selection by context, field configuration
- Q4-Q5 (synthesis): Integration priorities, avoiding procrastibuilding
- Reflection: "Define your essential CRM fields (max 6)"

**Lesson 8 Quiz Focus:** List hygiene, decay management
- Q1 (foundational): Email decay rate
- Q2-Q3 (application): Verification cadence, bounce handling
- Q4-Q5 (synthesis): Segmentation decisions, audit process design
- Reflection: "Design your monthly list audit checklist"

**Lesson 9 Quiz Focus:** CAN-SPAM, GDPR compliance
- Q1 (foundational): CAN-SPAM unsubscribe requirement
- Q2-Q3 (application): B2B vs. B2C GDPR decisions, compliant process design
- Q4-Q5 (synthesis): Gray area navigation, compliance trade-offs
- Reflection: "Document your GDPR legitimate interest basis"

**Lesson 10 Quiz Focus:** Prospecting rhythm, volume targets
- Q1 (foundational): Safe sending volume per domain
- Q2-Q3 (application): Time allocation by context, weekly rhythm design
- Q4-Q5 (synthesis): Pipeline math, habit building strategies
- Reflection: "Commit to your weekly prospecting schedule"

### Example Quiz: Lesson 5

```json
{
  "courseId": "course-04-list-building-prospecting",
  "lessonId": "lesson-5",
  "lessonTitle": "Email Infrastructure Setup",
  "track": "foundations",
  "version": "1.0.0",
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "What does SPF (Sender Policy Framework) accomplish in email authentication?",
      "options": [
        { "id": "a", "text": "Encrypts the email content so only the recipient can read it" },
        { "id": "b", "text": "Authorizes which IP addresses are allowed to send email on behalf of your domain" },
        { "id": "c", "text": "Provides instructions for what to do when authentication fails" },
        { "id": "d", "text": "Creates a cryptographic signature proving the email wasn't tampered with" }
      ],
      "correctAnswer": "b",
      "explanation": "SPF (Sender Policy Framework) is like an ID card—it tells receiving servers which IP addresses are authorized to send email for your domain. DKIM provides the cryptographic signature (option D), and DMARC provides the failure instructions (option C).",
      "difficulty": "foundational",
      "xpValue": 10
    },
    {
      "id": "q2",
      "type": "multiple_choice",
      "question": "You're setting up cold email infrastructure. Your primary domain is acmesoftware.com. Which approach is correct?",
      "options": [
        { "id": "a", "text": "Send cold emails from hello@acmesoftware.com to maintain brand consistency" },
        { "id": "b", "text": "Purchase lookalike domains like getacme.com and tryacme.com for cold outreach" },
        { "id": "c", "text": "Use a free Gmail account to avoid domain issues entirely" },
        { "id": "d", "text": "Send from a subdomain like outreach.acmesoftware.com" }
      ],
      "correctAnswer": "b",
      "explanation": "Never send cold email from your primary domain. If it gets blacklisted, your transactional emails (invoices, customer communications) will fail too. Lookalike domains isolate the risk. Subdomains (option D) still share reputation with the primary domain, making them risky.",
      "difficulty": "application",
      "xpValue": 15
    },
    {
      "id": "q3",
      "type": "multiple_choice",
      "question": "After setting up SPF and DKIM, you run a test and both pass. However, emails are still landing in spam. What's the most likely missing element?",
      "options": [
        { "id": "a", "text": "You need to upgrade to a paid email service" },
        { "id": "b", "text": "DMARC policy is not configured or set incorrectly" },
        { "id": "c", "text": "Your email content contains spam trigger words" },
        { "id": "d", "text": "The recipient's spam filter is too aggressive" }
      ],
      "correctAnswer": "b",
      "explanation": "All three authentication methods (SPF, DKIM, DMARC) work together. Google's 2024 requirements mandate DMARC at minimum 'p=none'. Without DMARC, receiving servers don't know what to do when SPF or DKIM have issues, often defaulting to spam filtering.",
      "difficulty": "application",
      "xpValue": 15
    },
    {
      "id": "q4",
      "type": "multiple_choice",
      "question": "You're a solo founder planning to send 100 cold emails per day. How should you structure your domain infrastructure?",
      "options": [
        { "id": "a", "text": "One domain sending 100/day is efficient and simple" },
        { "id": "b", "text": "Two domains at 50/day each provides redundancy and stays within safe limits" },
        { "id": "c", "text": "Ten domains at 10/day each maximizes deliverability" },
        { "id": "d", "text": "Domain count doesn't matter if authentication is correct" }
      ],
      "correctAnswer": "b",
      "explanation": "Safe sending is 30-50 emails/day per domain. At 100/day total, you need at least 2 domains (50 each). More domains provide redundancy—if one has issues, the other continues working. Ten domains at 10/day (option C) is overkill and adds unnecessary management overhead.",
      "difficulty": "synthesis",
      "xpValue": 20
    },
    {
      "id": "q5",
      "type": "multiple_choice",
      "question": "A founder skipped the warmup phase and sent 50 cold emails on day one from a new domain. What's the most likely consequence?",
      "options": [
        { "id": "a", "text": "Higher response rates because the domain is 'fresh'" },
        { "id": "b", "text": "No impact—authentication matters more than warmup" },
        { "id": "c", "text": "Emails landing in spam and potential domain blacklisting" },
        { "id": "d", "text": "Temporary delays but normal delivery after 24 hours" }
      ],
      "correctAnswer": "c",
      "explanation": "New domains have no sending reputation. ISPs watch sending patterns—sudden volume from a new domain is a spam signal. The warmup period (3-4 weeks minimum) builds reputation gradually. Skipping it almost always results in spam folder placement and can lead to permanent domain blacklisting.",
      "difficulty": "synthesis",
      "xpValue": 20
    },
    {
      "id": "reflection",
      "type": "reflection",
      "question": "Design your cold email domain strategy: How many domains will you purchase? What naming convention will you use? What's your target daily sending volume per domain? Explain your reasoning based on your business context and outreach goals.",
      "promptHints": [
        "Consider your total target volume and safe limits per domain",
        "Think about brand consistency in domain names",
        "Factor in budget for domain purchases and email hosting"
      ],
      "minimumWords": 50,
      "xpValue": 25,
      "aiEvaluationCriteria": {
        "requiresSpecificity": true,
        "requiresPersonalContext": true,
        "requiresActionableInsight": true
      }
    }
  ],
  "passingScore": 70,
  "totalXP": 105,
  "metadata": {
    "estimatedTime": "8-10 minutes",
    "prerequisiteQuizzes": ["lesson-4"],
    "unlocks": ["lesson-6"]
  }
}
```
