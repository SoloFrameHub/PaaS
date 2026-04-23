---
title: "Security, PII, and Compliance for Solo Ops"
duration: "45 min"
track: "AI-Powered Acquisition"
course: "Course 27: Building Custom AI Sales Agents"
lesson: 10
---

## The $47,000 Mistake

Meet Jordan, a technical founder who built a beautiful AI sales agent system. It researched prospects, drafted emails, enriched CRM records — all running smoothly for 3 months.

Then the email arrived: "We're filing a GDPR complaint. You stored my data without consent and sent it to a third-party AI service."

The fine? €43,000 ($47,000 USD). The real cost? 6 weeks of legal fees, a damaged reputation, and the complete shutdown of their AI agent infrastructure while they rebuilt it "the right way."

Jordan's mistake wasn't malicious. They just didn't know that:
- Storing LinkedIn data in a CRM without explicit consent violates GDPR
- Sending PII to OpenAI's API without a Data Processing Agreement (DPA) violates CCPA
- Keeping API keys in plain text in n8n workflows is a security disaster waiting to happen

**Here's the truth:** As a solo founder running AI agents, you're handling more sensitive data than most small companies. Prospect names, emails, LinkedIn profiles, company information, conversation history — all of it is Personally Identifiable Information (PII). And all of it is governed by laws that carry real penalties.

This lesson is your compliance survival guide. No legal jargon. Just the 6 critical systems you need to run AI agents safely, legally, and without paranoia.

<InsightCard icon="⚖️" title="The Solo Founder Compliance Reality">
You don't need a legal team. You need a checklist, 3 technical safeguards, and 1 hour of setup time. This lesson gives you all three.
</InsightCard>

---

## Section 1: The PII You're Actually Handling

Let's start by identifying what data your AI agents touch. Most solo founders underestimate this.

<FlipCard 
  front="What counts as PII in sales agents?" 
  back="Any data that can identify a person: name, email, phone, LinkedIn URL, IP address, company + role combination, conversation history, even timezone + industry if combined with other fields." 
/>

### The 4 PII Categories in Your Agent System

**Category 1: Direct Identifiers**
- Names, emails, phone numbers, LinkedIn URLs
- **Where it lives:** CRM, enrichment API responses, email drafts, research briefs
- **Risk level:** HIGH — this is what GDPR/CCPA protect most

**Category 2: Derived Identifiers**
- Company + role + location (can identify a person even without name)
- Conversation history, email thread context
- **Where it lives:** Agent memory, CRM notes, LLM context windows
- **Risk level:** MEDIUM-HIGH — often overlooked but still PII

**Category 3: Behavioral Data**
- Email opens, link clicks, LinkedIn profile views
- Meeting attendance, call recordings
- **Where it lives:** Email tracking pixels, calendar integrations, call transcription services
- **Risk level:** MEDIUM — requires consent in most jurisdictions

**Category 4: Inferred Data**
- ICP scores, intent signals, "likely to churn" flags
- AI-generated personality assessments (DISC types)
- **Where it lives:** CRM custom fields, agent outputs
- **Risk level:** LOW-MEDIUM — but can become discriminatory if misused

<RangeSlider 
  label="How much of this data are you currently tracking?" 
  min={1} 
  max={4} 
  lowLabel="Only names/emails" 
  highLabel="All 4 categories" 
  persistKey="custom-ai-agents-L10-pii-tracking" 
/>

### Where PII Leaks Happen in AI Agent Systems

<ClassifyExercise
  title="Classify These PII Risks"
  persistKey="custom-ai-agents-L10-classify-risks"
  categories={[
    { id: "critical", label: "Critical Risk", color: "#ef4444" },
    { id: "moderate", label: "Moderate Risk", color: "#f59e0b" },
    { id: "low", label: "Low Risk", color: "#3b82f6" }
  ]}
  items={[
    { id: "1", content: "Storing API keys in n8n workflow JSON (visible in UI)", correctCategory: "critical" },
    { id: "2", content: "Sending prospect names to Claude API without a DPA", correctCategory: "critical" },
    { id: "3", content: "Keeping enrichment data in CRM for 2 years", correctCategory: "moderate" },
    { id: "4", content: "Using a prospect's LinkedIn post in an email without attribution", correctCategory: "low" },
    { id: "5", content: "Storing unencrypted email drafts in a public GitHub repo", correctCategory: "critical" },
    { id: "6", content: "Caching research briefs in Redis without encryption", correctCategory: "moderate" }
  ]}
/>

**The 3 Most Common Leaks:**

1. **LLM API calls with PII in prompts** — Every time you send a prospect brief to Claude/GPT, you're transmitting PII to a third party. Without a Data Processing Agreement (DPA), this violates GDPR.

2. **Unencrypted data at rest** — CRM databases, n8n workflow variables, agent memory stores. If your VPS gets compromised, all PII is exposed.

3. **Third-party enrichment APIs** — Apollo, Clearbit, Hunter — all process PII. You need DPAs with each, and you need to disclose this in your privacy policy.

<ExampleCard label="Case Study: The Clearbit GDPR Violation">
A solo founder used Clearbit to enrich 5,000 EU contacts without consent. Clearbit's terms require you to have consent before sending them PII. The founder didn't. A single GDPR complaint triggered an audit. Result: €12,000 fine + mandatory data deletion + 3-month sales freeze while they rebuilt their list with proper consent.

**The fix:** Add a consent checkbox to your lead magnet forms. Update your privacy policy to list all enrichment providers. Only enrich contacts who opted in.
</ExampleCard>

---

## Section 2: The 3 Legal Frameworks You Must Know

You don't need to become a lawyer. But you do need to understand 3 laws and how they apply to AI sales agents.

### Framework 1: GDPR (EU + UK)

**Who it applies to:** Any business that processes data of EU/UK residents, regardless of where you're based.

**Key requirements for AI agents:**
1. **Lawful basis for processing** — You need consent, legitimate interest, or contract. For cold outreach, "legitimate interest" is your best bet (but it's contested).
2. **Data minimization** — Only collect what you need. Don't enrich 50 fields if you only use 5.
3. **Right to erasure** — If someone requests deletion, you must remove their data from CRM, agent memory, and LLM logs within 30 days.
4. **Data Processing Agreements (DPAs)** — Required with every vendor that processes PII (OpenAI, Anthropic, Apollo, etc.).
5. **Privacy policy disclosure** — Must list all AI tools and data processors.

**Penalties:** Up to €20M or 4% of global revenue (whichever is higher). For solo founders: typically €5K-50K for first violations.

<FlipCard 
  front="Can I use 'legitimate interest' for cold email in the EU?" 
  back="Yes, but it's risky. You must prove the outreach is relevant, non-intrusive, and the recipient could reasonably expect it. B2B outreach to decision-makers usually qualifies. Mass scraping + spray-and-pray does not. Document your reasoning." 
/>

### Framework 2: CCPA (California, USA)

**Who it applies to:** Businesses that serve California residents AND meet one of: (A) $25M+ revenue, (B) 50K+ consumers/households/devices, or (C) 50%+ revenue from selling personal info.

**Most solo founders are exempt** — but if you're selling a data product or have >50K contacts, you're in scope.

**Key requirements:**
1. **Right to know** — Users can request what data you have on them.
2. **Right to delete** — Same as GDPR.
3. **Right to opt-out of sale** — If you sell data (e.g., selling enriched lists), you must offer opt-out.
4. **Privacy policy** — Must disclose data collection and sharing.

**Penalties:** $2,500 per unintentional violation, $7,500 per intentional. Class-action lawsuits are common.

### Framework 3: CAN-SPAM (USA)

**Who it applies to:** Any commercial email sent to US recipients.

**Key requirements:**
1. **Accurate "From" and subject lines** — No deceptive headers.
2. **Physical address** — Must include your business address in footer.
3. **Unsubscribe link** — Must honor within 10 business days.
4. **No false claims** — Can't lie about who you are or what you're offering.

**Penalties:** $50,120 per violation (yes, per email). Rarely enforced for small-scale B2B, but ISPs will blacklist you.

<InsightCard icon="🛡️" title="The Solo Founder Safe Harbor">
If you follow these 5 rules, you're 95% compliant:
1. Only email people who opted in OR fit a narrow B2B ICP
2. Include unsubscribe link + physical address in every email
3. Sign DPAs with OpenAI/Anthropic/Apollo
4. Delete data within 30 days of request
5. Publish a privacy policy listing all AI tools
</InsightCard>

<InteractiveChecklist 
  title="Compliance Foundations Checklist" 
  persistKey="custom-ai-agents-L10-compliance-foundations" 
  items={[
    "Privacy policy published and lists all AI/enrichment tools",
    "DPA signed with OpenAI or Anthropic (available in account settings)",
    "DPA signed with Apollo/Clearbit/Hunter (request via support)",
    "Unsubscribe link + physical address in email templates",
    "CRM has 'consent_date' and 'data_source' fields",
    "Process documented for handling deletion requests (30-day SLA)"
  ]} 
/>

---

## Section 3: Securing API Keys and Secrets

API keys are the keys to your kingdom. If they leak, an attacker can:
- Drain your OpenAI/Anthropic credits ($1,000s in minutes)
- Access your entire CRM database
- Send emails as you (destroying your domain reputation)
- Steal your prospect data

**The average API key leak costs solo founders $2,000-5,000** in fraudulent usage, cleanup, and reputation damage.

### The 5 API Key Security Rules

<SlideNavigation>
<Slide title="Rule 1: Never Store Keys in Code">

**Bad:**
```javascript
const OPENAI_KEY = "sk-proj-abc123..."; // NEVER DO THIS
```

**Good:**
```javascript
const OPENAI_KEY = process.env.OPENAI_API_KEY; // Load from environment
```

**Why:** Code gets committed to Git, shared in screenshots, copied to forums. Keys in code = keys in the wild.

**Action:** Use environment variables (.env files) or secret managers (Railway Secrets, Vercel Environment Variables, AWS Secrets Manager).

</Slide>

<Slide title="Rule 2: Use Separate Keys per Environment">

Don't use the same API key for development, staging, and production.

**Why:** If your dev key leaks (e.g., in a debug log), it doesn't compromise production.

**Action:** Create 3 keys in OpenAI/Anthropic:
- `dev-key` (low rate limit, low spend cap)
- `staging-key` (medium limits)
- `prod-key` (full limits, monitored)

</Slide>

<Slide title="Rule 3: Set Spend Limits">

OpenAI and Anthropic allow you to set monthly spend caps.

**Action:**
- OpenAI: Settings → Billing → Usage limits → Set hard cap ($50-100/month for solo founders)
- Anthropic: Workspace settings → Billing → Set budget alert

**Why:** If a key leaks, the attacker can only burn through your cap, not your entire credit card.

</Slide>

<Slide title="Rule 4: Rotate Keys Quarterly">

Treat API keys like passwords. Change them every 90 days.

**Action:** Set a calendar reminder. Generate new keys, update .env files, delete old keys.

**Why:** Reduces the window of exposure if a key was compromised without your knowledge.

</Slide>

<Slide title="Rule 5: Use Read-Only Keys Where Possible">

Some services (Apollo, CRMs) offer read-only API keys.

**Action:** For agents that only read data (research, enrichment), use read-only keys. Reserve write keys for agents that update CRM.

**Why:** Limits blast radius if a key leaks.

</Slide>
</SlideNavigation>

### Where Keys Leak in AI Agent Systems

<SwipeDecision
  title="Safe or Unsafe Key Storage?"
  description="Swipe right for safe practices, left for unsafe"
  optionA="Unsafe"
  optionB="Safe"
  persistKey="custom-ai-agents-L10-key-storage"
  cards={[
    { 
      id: "1", 
      content: "Storing OpenAI key in n8n credential store (encrypted)", 
      correctOption: "b", 
      explanation: "n8n encrypts credentials at rest. This is safe." 
    },
    { 
      id: "2", 
      content: "Hardcoding API key in a Python script committed to GitHub", 
      correctOption: "a", 
      explanation: "GitHub scans for leaked keys. Bots will find and exploit this within hours." 
    },
    { 
      id: "3", 
      content: "Passing API key as URL parameter (?key=sk-...)", 
      correctOption: "a", 
      explanation: "URL parameters are logged in server logs, browser history, and analytics. Never put secrets in URLs." 
    },
    { 
      id: "4", 
      content: "Using Railway's secret management for environment variables", 
      correctOption: "b", 
      explanation: "Railway encrypts secrets and injects them at runtime. This is best practice." 
    },
    { 
      id: "5", 
      content: "Storing keys in a .env file and adding .env to .gitignore", 
      correctOption: "b", 
      explanation: "Standard practice. Just make sure .gitignore is committed BEFORE you add .env." 
    }
  ]}
/>

<ExampleCard label="Real Leak: The $4,200 OpenAI Bill">
A solo founder built an AI email agent and deployed it to a VPS. They stored the OpenAI API key in a config.json file. The VPS had a misconfigured firewall — port 8080 was open to the internet.

A bot scraped the config file, extracted the key, and ran a crypto-mining LLM loop (generating and re-prompting nonsense to burn tokens). In 36 hours, the key racked up $4,200 in charges.

**The fix:** (1) Never expose config files via HTTP. (2) Set a $100/month spend cap. (3) Use environment variables, not config files.
</ExampleCard>

---

## Section 4: Data Encryption and Storage

Your AI agents store data in 3 places:
1. **CRM** (HubSpot, Airtable, Notion)
2. **Orchestrator** (n8n, Zapier, Make)
3. **Agent memory** (Redis, PostgreSQL, JSON files)

All three must be encrypted. Here's how.

### Encryption at Rest

**What it means:** Data is encrypted when stored on disk. If someone steals your hard drive (or hacks your VPS), they can't read the data without the encryption key.

**Where to enable it:**

<TemplateBuilder
  title="Encryption Checklist"
  persistKey="custom-ai-agents-L10-encryption"
  sections={[
    {
      id: "crm",
      title: "CRM Encryption",
      fields: [
        { 
          id: "crm-platform", 
          label: "CRM Platform", 
          placeholder: "e.g., HubSpot, Airtable, Notion", 
          type: "text" 
        },
        { 
          id: "crm-encryption", 
          label: "Encryption Status", 
          placeholder: "Check: Settings → Security → Encryption at rest", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "orchestrator",
      title: "Orchestrator Encryption",
      fields: [
        { 
          id: "orch-platform", 
          label: "Orchestrator", 
          placeholder: "e.g., n8n, Zapier, Make", 
          type: "text" 
        },
        { 
          id: "orch-encryption", 
          label: "Credential Storage", 
          placeholder: "n8n: encrypted by default. Zapier: encrypted. Make: encrypted.", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "database",
      title: "Agent Memory Database",
      fields: [
        { 
          id: "db-type", 
          label: "Database Type", 
          placeholder: "e.g., PostgreSQL, Redis, JSON files", 
          type: "text" 
        },
        { 
          id: "db-encryption", 
          label: "Encryption Method", 
          placeholder: "PostgreSQL: enable pgcrypto. Redis: use TLS. JSON: encrypt with GPG.", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

**For self-hosted databases (PostgreSQL, Redis):**
- **PostgreSQL:** Enable `pgcrypto` extension and encrypt sensitive columns (emails, names).
- **Redis:** Use TLS for connections and enable `requirepass` authentication.
- **JSON files:** Encrypt with GPG or use an encrypted filesystem (LUKS on Linux).

**For cloud databases (Railway, Supabase, PlanetScale):**
- All major providers encrypt at rest by default. Verify in security settings.

### Encryption in Transit

**What it means:** Data is encrypted when moving between systems (e.g., from n8n to OpenAI API).

**How to ensure it:**
- **Always use HTTPS** for API calls (not HTTP).
- **Check TLS version:** Most APIs require TLS 1.2+. Your orchestrator handles this automatically.
- **For self-hosted n8n:** Enable SSL with Let's Encrypt (free).

<InsightCard icon="🔒" title="The 2-Minute Encryption Test">
1. Check your CRM security settings — is "encryption at rest" enabled?
2. Check your orchestrator — are credentials stored encrypted?
3. Check your database — is TLS enabled for connections?

If all 3 are yes, you're 90% secure.
</InsightCard>

---

## Section 5: Data Retention and Deletion

GDPR and CCPA both require you to delete data when:
1. A user requests deletion ("right to erasure")
2. The data is no longer needed for its original purpose
3. The retention period expires

**The solo founder problem:** Your data is scattered across 5+ systems (CRM, n8n, OpenAI logs, enrichment APIs, email provider). Deleting it all is a nightmare.

### The 30-Day Deletion Workflow

<DecisionTree
  title="Handling a Deletion Request"
  persistKey="custom-ai-agents-L10-deletion-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "You receive a deletion request via email: 'Please delete all my data under GDPR.'", 
      choices: [
        { label: "Verify identity first", nextNodeId: "verify" },
        { label: "Delete immediately", nextNodeId: "delete-fail" }
      ]
    },
    { 
      id: "verify", 
      content: "You ask for proof of identity (email confirmation or account login). They verify.", 
      choices: [
        { label: "Delete from all systems", nextNodeId: "delete-all" },
        { label: "Delete from CRM only", nextNodeId: "partial-delete" }
      ]
    },
    { 
      id: "delete-fail", 
      content: "You delete without verifying. Later, you realize it was a phishing attempt to delete a competitor's data. Legal liability.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "partial-delete", 
      content: "You delete from CRM but forget n8n logs and OpenAI context. GDPR auditor finds residual data. Fine: €5,000.", 
      isTerminal: true, 
      outcome: "negative" 
    },
    { 
      id: "delete-all", 
      content: "You delete from: (1) CRM, (2) n8n workflow history, (3) email provider, (4) enrichment API cache (contact Apollo/Clearbit support). You confirm deletion within 30 days.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

### The 7-System Deletion Checklist

When you receive a deletion request, you must remove data from:

<InteractiveChecklist 
  title="Deletion Request Checklist" 
  persistKey="custom-ai-agents-L10-deletion-checklist" 
  items={[
    "CRM: Delete contact record + all notes/history",
    "Email provider: Remove from suppression list (if applicable)",
    "n8n/Zapier: Clear workflow execution history containing their data",
    "OpenAI/Anthropic: Request log deletion (via support ticket)",
    "Apollo/Clearbit: Request cache deletion (via support ticket)",
    "Backup systems: Delete from any CRM backups or exports",
    "Confirm deletion to requester within 30 days"
  ]} 
/>

### Automated Retention Policies

Instead of waiting for deletion requests, set up automatic data expiration:

**Example retention policy:**
- **Active prospects:** Keep data for 12 months after last interaction
- **Churned customers:** Keep data for 24 months (for win-back campaigns)
- **Unresponsive leads:** Delete after 6 months of no engagement

**How to implement:**
- **CRM:** Use workflows to tag records older than X months, then bulk delete quarterly.
- **n8n:** Set workflow execution history to auto-delete after 90 days (Settings → Executions).
- **LLM logs:** OpenAI retains logs for 30 days by default. Anthropic: 90 days. Request deletion via API if needed.

---

## Section 6: Building a Compliance Dashboard

You can't manage what you don't measure. A compliance dashboard gives you visibility into:
1. How much PII you're storing
2. Where it's stored
3. When it expires
4. Outstanding deletion requests

### The 5-Metric Compliance Dashboard

<ScenarioSimulator
  title="Compliance Risk Calculator"
  persistKey="custom-ai-agents-L10-risk-calculator"
  levers={[
    { id: "contacts", label: "Total contacts in CRM", min: 100, max: 50000, step: 100, defaultValue: 5000 },
    { id: "euPercent", label: "% EU/UK contacts", min: 0, max: 100, step: 5, defaultValue: 20 },
    { id: "consentPercent", label: "% with explicit consent", min: 0, max: 100, step: 5, defaultValue: 40 },
    { id: "retentionMonths", label: "Average data age (months)", min: 1, max: 36, step: 1, defaultValue: 12 }
  ]}
  outputs={[
    { 
      id: "gdprRisk", 
      label: "GDPR-exposed contacts", 
      formula: "(contacts * (euPercent / 100) * (1 - consentPercent / 100))", 
      unit: "", 
      precision: 0 
    },
    { 
      id: "staleData", 
      label: "Stale data (>12mo old)", 
      formula: "(retentionMonths > 12 ? contacts * 0.3 : 0)", 
      unit: "", 
      precision: 0 
    },
    { 
      id: "riskScore", 
      label: "Compliance risk score", 
      formula: "((gdprRisk / contacts) * 50 + (staleData / contacts) * 30 + (100 - consentPercent) * 0.2)", 
      unit: "/100", 
      precision: 1 
    }
  ]}
  insight="Risk score >30: High risk. Prioritize consent collection and data cleanup. Risk score 15-30: Moderate risk. Audit retention policies. Risk score &lt;15: Low risk. Maintain current practices."
/>

### What to Track

**Metric 1: PII Volume**
- Total contacts with PII
- Breakdown by source (opt-in, scraped, purchased, enriched)

**Metric 2: Consent Rate**
- % of contacts with explicit consent
- % relying on "legitimate interest" (riskier)

**Metric 3: Data Age**
- Average age of contact records
- % of records older than 12 months (should be &lt;20%)

**Metric 4: Deletion Requests**
- Total requests received
- Average response time (target: &lt;7 days)
- % completed within 30 days (target: 100%)

**Metric 5: Vendor DPAs**
- List of all vendors processing PII
- DPA status (signed, pending, not required)

### Building the Dashboard (15 Minutes)

**Option 1: Airtable (No-Code)**
1. Create a base with 3 tables: Contacts, Vendors, Deletion Requests
2. Add formulas for consent rate, data age, risk score
3. Use Airtable's chart blocks for visualization

**Option 2: Google Sheets + Data Studio (Free)**
1. Export CRM data to Google Sheets weekly (via Zapier/n8n)
2. Add columns for consent status, data age, EU flag
3. Connect to Google Data Studio for dashboards

**Option 3: Metabase + PostgreSQL (Self-Hosted)**
1. Store compliance metrics in a PostgreSQL table
2. Use Metabase (open-source BI tool) to build dashboards
3. Cost: $0 (self-hosted) or $85/mo (Metabase Cloud)

<ExampleCard label="Solo Founder Dashboard Example">
**Sarah's Compliance Dashboard (Airtable):**
- **Total Contacts:** 3,200
- **EU Contacts:** 640 (20%)
- **Consent Rate:** 65% (2,080 consented, 1,120 legitimate interest)
- **Average Data Age:** 8 months
- **Stale Records (>12mo):** 480 (15%)
- **Deletion Requests (Last 90 Days):** 3 (all completed in &lt;14 days)
- **Vendor DPAs:** 4/5 signed (pending: Hunter.io)
- **Risk Score:** 22/100 (Moderate — needs consent campaign)

**Action:** Sarah runs a re-consent campaign to move 500 contacts from "legitimate interest" to "explicit consent," dropping her risk score to 12/100.
</ExampleCard>

---

## Section 7: The Solo Founder Compliance Playbook

Let's bring it all together. Here's your step-by-step implementation plan.

### Week 1: Foundations (2 hours)

<InteractiveChecklist 
  title="Week 1: Compliance Foundations" 
  persistKey="custom-ai-agents-L10-week1" 
  items={[
    "Audit all systems storing PII (CRM, n8n, databases, email provider)",
    "Sign DPAs with OpenAI/Anthropic (available in account settings)",
    "Request DPAs from Apollo, Clearbit, Hunter (via support tickets)",
    "Add 'consent_date' and 'data_source' fields to CRM",
    "Update email templates: add unsubscribe link + physical address",
    "Publish privacy policy (use a template from TermsFeed or Iubenda)"
  ]} 
/>

### Week 2: Security Hardening (3 hours)

<InteractiveChecklist 
  title="Week 2: Security Hardening" 
  persistKey="custom-ai-agents-L10-week2" 
  items={[
    "Move all API keys to environment variables (no hardcoded keys)",
    "Set spend limits on OpenAI ($100/mo) and Anthropic ($50/mo)",
    "Enable encryption at rest for self-hosted databases (PostgreSQL, Redis)",
    "Rotate all API keys (generate new, update .env, delete old)",
    "Enable 2FA on all critical accounts (CRM, orchestrator, LLM providers)",
    "Set up API key monitoring (alerts for unusual usage spikes)"
  ]} 
/>

### Week 3: Data Cleanup (4 hours)

<InteractiveChecklist 
  title="Week 3: Data Cleanup" 
  persistKey="custom-ai-agents-L10-week3" 
  items={[
    "Identify contacts older than 12 months with no engagement",
    "Tag EU/UK contacts in CRM (use country field or IP geolocation)",
    "Run consent audit: mark contacts as 'consented' or 'legitimate interest'",
    "Delete stale records (>18 months, no engagement, no consent)",
    "Set up automated retention policy (delete after 12 months of inactivity)",
    "Export compliance metrics to dashboard (Airtable or Google Sheets)"
  ]} 
/>

### Week 4: Monitoring and Maintenance (1 hour/week ongoing)

<InteractiveChecklist 
  title="Ongoing Compliance Maintenance" 
  persistKey="custom-ai-agents-L10-ongoing" 
  items={[
    "Review compliance dashboard weekly (10 min)",
    "Process deletion requests within 7 days (respond within 24 hours)",
    "Rotate API keys quarterly (set calendar reminder)",
    "Audit vendor DPAs annually (check for new vendors)",
    "Run consent re-engagement campaign every 6 months (for 'legitimate interest' contacts)",
    "Update privacy policy when adding new AI tools or vendors"
  ]} 
/>

---

## Section 8: Common Compliance Mistakes (and How to Avoid Them)

Let's close with the 5 mistakes that trip up 80% of solo founders.

<StrategyDuel
  title="Consent vs. Legitimate Interest"
  persistKey="custom-ai-agents-L10-consent-duel"
  scenario="You want to email 1,000 B2B prospects scraped from LinkedIn. Which legal basis should you use?"
  strategyA={{ 
    name: "Explicit Consent", 
    description: "Send a double opt-in email asking for permission before any sales outreach", 
    pros: ["Legally bulletproof", "Higher engagement from consented contacts"], 
    cons: ["90% won't opt in", "Kills cold outreach velocity"] 
  }}
  strategyB={{ 
    name: "Legitimate Interest", 
    description: "Email them directly, citing 'legitimate interest' under GDPR Article 6(1)(f)", 
    pros: ["Allows cold outreach", "Standard B2B practice"], 
    cons: ["Legally contested", "Must prove relevance and necessity"] 
  }}
  expertVerdict="For B2B cold outreach to decision-makers: Legitimate Interest is standard practice, but you must (1) target a narrow ICP, (2) personalize every email, (3) offer easy opt-out, and (4) document your reasoning. For broad consumer outreach: Explicit Consent is required."
/>

### Mistake 1: Assuming "B2B = Exempt"

**The myth:** "GDPR doesn't apply to B2B sales."

**The reality:** GDPR applies to all personal data, including business emails. The exemption is narrow: you can email work addresses under "legitimate interest," but only if the outreach is relevant and expected.

**The fix:** Target a specific ICP. Document why your outreach is relevant to their role. Personalize every email.

### Mistake 2: Ignoring Data Processor Agreements

**The myth:** "I'm just using OpenAI's API. I don't need a contract."

**The reality:** Under GDPR, you're the "data controller" and OpenAI is the "data processor." You're legally required to have a Data Processing Agreement (DPA) in place.

**The fix:** Sign DPAs with every vendor that processes PII. OpenAI, Anthropic, Apollo, Clearbit, and most major providers offer standard DPAs in their account settings or via support.

### Mistake 3: Storing PII in LLM Prompts Forever

**The myth:** "Once I send data to Claude, it's gone."

**The reality:** OpenAI and Anthropic retain API logs for 30-90 days. If you're sending PII in prompts (prospect names, emails, company details), that data is stored on their servers.

**The fix:** (1) Sign a DPA (which includes data retention terms). (2) Use Anthropic's "zero data retention" option (available for Enterprise customers). (3) Anonymize PII in prompts where possible (e.g., use "[Company A]" instead of "Acme Corp").

### Mistake 4: No Deletion Process

**The myth:** "No one will ever request deletion."

**The reality:** Deletion requests are increasing. In 2025, 3-5% of B2B contacts will request deletion at some point.

**The fix:** Set up a deletion workflow now (before you get your first request). Document the 7-system checklist. Test it quarterly.

### Mistake 5: Treating Compliance as One-Time Setup

**The myth:** "I'll set this up once and forget about it."

**The reality:** Compliance is ongoing. You add new vendors, new data sources, new contacts. Your risk profile changes.

**The fix:** Schedule quarterly compliance reviews (1 hour). Update your dashboard, rotate keys, audit vendors, clean stale data.

<LinterFeedback
  title="Compliance Linter: Score Your Setup"
  persistKey="custom-ai-agents-L10-linter"
  inputLabel="Describe your current compliance setup (privacy policy, DPAs, encryption, retention policy)"
  rules={[
    { 
      id: "privacy-policy", 
      label: "Privacy Policy", 
      description: "Published and lists all AI/enrichment vendors", 
      keywords: ["privacy policy", "published", "vendors", "OpenAI", "Anthropic"], 
      antiKeywords: ["none", "not yet", "planning to"] 
    },
    { 
      id: "dpas", 
      label: "Data Processing Agreements", 
      description: "Signed with all vendors processing PII", 
      keywords: ["DPA", "signed", "OpenAI", "Anthropic", "Apollo"], 
      antiKeywords: ["pending", "not signed", "none"] 
    },
    { 
      id: "encryption", 
      label: "Encryption at Rest", 
      description: "Enabled for CRM, database, and orchestrator", 
      keywords: ["encrypted", "encryption", "TLS", "SSL"], 
      antiKeywords: ["plaintext", "unencrypted", "not enabled"] 
    },
    { 
      id: "retention", 
      label: "Data Retention Policy", 
      description: "Automated deletion of stale data", 
      keywords: ["retention", "delete", "12 months", "automated"], 
      antiKeywords: ["keep forever", "no policy", "manual"] 
    },
    { 
      id: "deletion", 
      label: "Deletion Workflow", 
      description: "Process for handling deletion requests", 
      keywords: ["deletion", "workflow", "30 days", "checklist"], 
      antiKeywords: ["no process", "ad hoc", "not documented"] 
    }
  ]}
/>

---

## Summary: Your Compliance Action Plan

You've learned the 6 critical systems for running AI agents safely and legally:

1. **PII Identification** — Know what data you're handling and where it lives
2. **Legal Frameworks** — GDPR, CCPA, CAN-SPAM compliance basics
3. **API Key Security** — Environment variables, spend limits, rotation
4. **Data Encryption** — At rest and in transit
5. **Retention and Deletion** — 30-day deletion workflow + automated retention
6. **Compliance Dashboard** — 5 metrics to track risk

**The bottom line:** Compliance isn't a blocker. It's a 4-week setup project + 1 hour/week maintenance. Do it right, and you'll never worry about a GDPR fine or API key leak again.

<InteractiveChecklist 
  title="Your Next Steps" 
  persistKey="custom-ai-agents-L10-next-steps" 
  items={[
    "Complete Week 1 checklist (foundations: DPAs, privacy policy, CRM fields)",
    "Complete Week 2 checklist (security: API keys, encryption, 2FA)",
    "Complete Week 3 checklist (data cleanup: audit, delete stale records, set retention policy)",
    "Build compliance dashboard (Airtable or Google Sheets)",
    "Schedule quarterly compliance review (1 hour, recurring calendar event)",
    "Document deletion workflow and test with a mock request"
  ]} 
/>

---

## Quiz: Security and Compliance Fundamentals

Test your understanding of the key concepts from this lesson.

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Which of the following is NOT considered PII under GDPR?",
      "options": [
        "Email address",
        "Company name + job title",
        "Industry category (e.g., 'SaaS')",
        "LinkedIn profile URL"
      ],
      "correctAnswer": 2,
      "explanation": "Industry category alone is not PII. However, company name + job title CAN identify a person (e.g., 'CEO at Acme Corp' likely identifies one person), making it PII."
    },
    {
      "id": "q2",
      "question": "You're using Claude API to generate prospect research briefs. What's the minimum compliance requirement?",
      "options": [
        "Nothing — API usage is exempt from GDPR",
        "Sign a Data Processing Agreement (DPA) with Anthropic",
        "Get explicit consent from every prospect before researching them",
        "Only use anonymized data in prompts"
      ],
      "correctAnswer": 1,
      "explanation": "Under GDPR, you're the data controller and Anthropic is the data processor. You must have a DPA in place. Anthropic provides a standard DPA in account settings."
    },
    {
      "id": "q3",
      "question": "A prospect requests deletion of their data. What's your legal deadline to comply under GDPR?",
      "options": [
        "24 hours",
        "7 days",
        "30 days",
        "90 days"
      ],
      "correctAnswer": 2,
      "explanation": "GDPR requires deletion 'without undue delay' and within 30 days. Best practice: respond within 24 hours, complete deletion within 7-14 days."
    },
    {
      "id": "q4",
      "question": "Where should you NEVER store API keys?",
      "options": [
        "Environment variables (.env file)",
        "Railway Secrets or Vercel Environment Variables",
        "Hardcoded in a Python script committed to GitHub",
        "n8n credential store (encrypted)"
      ],
      "correctAnswer": 2,
      "explanation": "Never hardcode API keys in code that gets committed to version control. GitHub bots scan for leaked keys and will exploit them within hours."
    },
    {
      "id": "q5",
      "question": "You're sending cold emails to 500 EU-based B2B prospects scraped from LinkedIn. Which legal basis should you use?",
      "options": [
        "Explicit consent (double opt-in)",
        "Legitimate interest (GDPR Article 6(1)(f))",
        "Contract performance",
        "No legal basis needed for B2B"
      ],
      "correctAnswer": 1,
      "explanation": "For B2B cold outreach, 'legitimate interest' is the standard legal basis. You must prove the outreach is relevant, targeted, and non-intrusive. Document your ICP and personalization strategy."
    },
    {
      "id": "q6",
      "question": "What's the recommended maximum monthly spend limit for OpenAI API keys used by solo founders?",
      "options": [
        "$10-20",
        "$50-100",
        "$200-500",
        "No limit needed"
      ],
      "correctAnswer": 1,
      "explanation": "$50-100/month is a safe cap for solo founders. If a key leaks, the attacker can only burn through your cap. You can always increase it if you hit the limit legitimately."
    },
    {
      "id": "q7",
      "question": "How often should you rotate API keys?",
      "options": [
        "Weekly",
        "Monthly",
        "Quarterly (every 90 days)",
        "Annually"
      ],
      "correctAnswer": 2,
      "explanation": "Quarterly (90 days) is the recommended rotation schedule. It balances security (limits exposure window) with operational overhead (not too frequent)."
    },
    {
      "id": "q8",
      "question": "You're using Apollo to enrich 1,000 contacts. What compliance step is required?",
      "options": [
        "Nothing — Apollo handles compliance",
        "Sign a DPA with Apollo",
        "Get consent from all 1,000 contacts before enriching",
        "Only enrich contacts who visited your website"
      ],
      "correctAnswer": 1,
      "explanation": "Apollo is a data processor. You must have a DPA in place. Request it via Apollo support. You also need a lawful basis (consent or legitimate interest) to enrich the contacts."
    },
    {
      "id": "q9",
      "question": "What's the primary risk of storing PII in unencrypted JSON files on a VPS?",
      "options": [
        "Slower performance",
        "If the VPS is compromised, all PII is exposed in plaintext",
        "JSON files can't be backed up",
        "It violates CAN-SPAM"
      ],
      "correctAnswer": 1,
      "explanation": "Unencrypted data at rest is a critical vulnerability. If an attacker gains access to your VPS (via SSH brute force, misconfigured firewall, etc.), they can read all PII. Always encrypt sensitive data."
    },
    {
      "id": "q10",
      "question": "What should your data retention policy be for unengaged B2B prospects?",
      "options": [
        "Keep forever — you might re-engage them later",
        "Delete after 6-12 months of no engagement",
        "Delete after 3 years",
        "Only delete if they request it"
      ],
      "correctAnswer": 1,
      "explanation": "GDPR's 'data minimization' principle requires you to delete data when it's no longer needed. For unengaged prospects, 6-12 months is reasonable. After that, the data is stale and the legal basis weakens."
    }
  ]
}