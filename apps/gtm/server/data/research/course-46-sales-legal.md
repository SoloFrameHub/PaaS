# Course 46: Sales Legal & Contracts — Research Package

**Track:** Operations & Systems (Track 7)
**Duration:** 7 lessons | ~5.5 hours total
**Budget Constraint:** <$50/month tool budget (most needs handled with free tools)
**Time Constraint:** Solo founder — self-serve 80% of contract needs
**Primary Output Artifact:** Clause Library + Quoting Templates
**Core Interactions:** Contract selector wizard, clause customizer, redline simulator

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Know which contract template to use: MSA, SOW, SaaS Terms, or simple engagement letter | Lesson 1 | Contract Type Decision Tree |
| Customize scope, payment terms, IP, and termination clauses without counsel | Lessons 2, 3 | Clause Library (editable) |
| Set up e-signature workflows under $20/month | Lesson 4 | E-Signature Workflow Map |
| Identify redline patterns and know what to push back on vs accept | Lesson 5 | Redline Cheat Sheet |
| Know when to involve legal counsel vs handle it yourself (the 80/20 rule) | Lesson 6 | Counsel Trigger Checklist |
| Assemble a complete contract templates library ready for use | Lesson 7 | Complete Contract Templates Library |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + annotated contract excerpts explaining the core concept
2. **Guided Build Session** — Clause-by-clause construction of contract templates with AI suggestions + linters
3. **Simulation/Roleplay** — Where applicable (Lessons 5, 6): redline negotiation and "call the lawyer?" scenarios
4. **Implementation Sprint** — Course culminates in a complete contract templates library ready for immediate use (Lesson 7)

---

## LESSON 1: Contract Types: MSA, SOW, SaaS Terms, Engagement Letters (50 min)

### Key Topics

1. **The Four Contract Types Solo Founders Need** — Master Service Agreement (MSA), Statement of Work (SOW), SaaS Terms of Service, and Engagement Letters — when to use each
2. **MSA: The Umbrella Agreement** — Governs the ongoing relationship; covers liability, IP ownership, confidentiality, dispute resolution. Used when you expect multiple projects or an ongoing engagement with the same client
3. **SOW: The Project-Specific Document** — Defines scope, deliverables, timeline, payment for a specific engagement. Always attached to an MSA or standalone for one-off projects
4. **SaaS Terms of Service** — Click-wrap or sign-wrap agreement covering subscription access, data handling, uptime SLAs, acceptable use. Required for any software product with recurring billing
5. **Engagement Letters** — Lightweight 1-3 page agreements for consulting, coaching, and small service engagements under $10K. Combines key MSA and SOW elements into a single document
6. **The Contract Decision Tree** — Flowchart: What are you selling? → Is it recurring? → Is it over $10K? → Are there multiple deliverables? → Choose template

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| 60% of small business disputes arise from poorly defined scope | American Bar Association (SMB Survey) | Scope clarity is the #1 contract priority |
| Solo founders who use templated contracts close 25-40% faster than those who draft from scratch | Freelance industry surveys | Templates eliminate back-and-forth |
| 83% of B2B SaaS companies use click-wrap Terms of Service for sub-$500/month plans | SaaS contract studies | Standard practice — no signature needed |
| Average time to close a deal increases 2-3 weeks when contracts are drafted from scratch | DocuSign CLM data | Templates accelerate close |
| 72% of freelancers and consultants have experienced scope creep due to vague contracts | AND CO / Fiverr freelancer survey | Engagement letters prevent this |

### Frameworks & Models

- **Contract Type Decision Tree:**
  - Selling software (recurring)? → SaaS Terms of Service
  - Selling services (ongoing, multiple projects)? → MSA + SOW per project
  - Selling services (one-off, <$10K)? → Engagement Letter
  - Selling services (one-off, >$10K)? → Standalone SOW or MSA + SOW
  - Any deal >$50K or involving IP transfer? → MSA + SOW + legal review

- **The "Envelope Test"**: If the deal terms cannot be summarized on a single envelope back, the contract is overcomplicated for a solo founder's needs.

### Tools to Reference

| Tool | Category | Pricing | Solo Founder Fit |
|------|----------|---------|------------------|
| Bonsai Contracts | Template library + e-sign | $21/mo (Starter) | High (freelancers/consultants) |
| LawDepot | Template generator | Free (basic) / $7.99/mo | High |
| Shake | Mobile contract creation | Free / $15/mo | Medium |
| Docracy | Open-source legal templates | Free | High (reference only — verify templates) |
| Stripe Billing (Terms) | Built-in SaaS terms acceptance | Included with Stripe | High (SaaS founders) |

### Artifact Component

**Contract Type Decision Tree** — Visual flowchart mapping business type, deal size, and engagement type to the correct contract template.

### Interactive Element

**Concept Capsule Quiz:** Given 5 business scenarios (SaaS product, consulting retainer, one-off project, coaching engagement, enterprise software deal), students select the correct contract type and justify their choice. AI coach explains why each answer is correct or incorrect.

**Build Session:** AI wizard asks about the student's business model, typical deal size, and engagement type, then recommends which 1-2 contract templates they should build first.

---

## LESSON 2: What to Customize: Scope, Payment, IP, Termination (55 min)

### Key Topics

1. **The Four Clauses That Matter Most** — Scope, Payment, IP Ownership, and Termination are where 90% of disputes originate
2. **Scope Definition** — Writing clear deliverables with acceptance criteria, defining what is explicitly excluded, change order processes for scope additions
3. **Payment Terms Architecture** — Milestone-based vs time-based vs subscription; deposit structures (25-50% upfront is standard for services); what happens when client doesn't pay
4. **IP Ownership Clauses** — Work-for-hire (client owns everything), license model (you retain IP, client gets usage rights), hybrid (client owns deliverables, you retain pre-existing IP and methodologies)
5. **Termination Clauses** — Termination for cause vs convenience; notice periods (14-30 days typical); what happens to unpaid work and IP upon termination; kill fees (25-50% of remaining contract value)
6. **Limitation of Liability** — Cap liability at 1-2x the contract value (never unlimited); carve-outs for IP infringement and confidentiality breaches; mutual indemnification basics

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| 45% of freelancer payment disputes relate to unclear milestone definitions | Bonsai Freelance Report | Milestone clarity prevents payment holdups |
| Average days-to-payment for invoices with Net 30 terms: 45 days actual | Fundbox SMB data | Always assume 1.5x stated terms |
| 68% of service providers have never negotiated IP clauses and default to work-for-hire | Independent contractor surveys | Founders often give away IP unnecessarily |
| Contracts with explicit termination-for-convenience clauses resolve 3x faster than those without | Legal industry studies | Clear exit reduces hostility |
| 50% upfront deposit collection eliminates 80% of non-payment risk | Freelance billing studies | Deposits are the single best protection |

### Frameworks & Models

- **The Clause Priority Matrix:**
  - Must customize for every deal: Scope, Payment terms, Termination
  - Customize once, reuse: IP ownership, Confidentiality, Liability cap
  - Use template language: Governing law, Dispute resolution, Force majeure

- **IP Ownership Decision Framework:**
  - Building a custom product for one client → Work-for-hire (charge more)
  - Delivering methodology/frameworks to many clients → License model (retain IP)
  - Using your existing tools/code in client work → Hybrid (client owns deliverable, you keep underlying tools)

- **Payment Structure Templates:**
  - SaaS: Monthly/annual subscription, billed in advance
  - Services (<$10K): 50% upfront, 50% on delivery
  - Services ($10-50K): 33% upfront, 33% midpoint, 34% on delivery
  - Services (>$50K): Monthly milestones with payment within 14 days of acceptance

### Artifact Component

**Clause Library v1** — Editable clause templates for Scope, Payment, IP, Termination, Liability with fill-in variables (deal size, payment schedule, IP model).

### Interactive Element

**Guided Build:** Students select their business model and typical deal size. AI generates customized clause language for each of the four critical areas. Students edit and refine with "Contract Linter" providing feedback on vagueness, missing protections, and overly aggressive terms.

---

## LESSON 3: Payment Terms: Net 7/14/30 and Late Fees (45 min)

### Key Topics

1. **Payment Term Options** — Net 7 (small projects, coaching), Net 14 (mid-size services), Net 30 (enterprise, larger contracts), Net 0 / Due on Receipt (SaaS, digital products)
2. **Choosing the Right Terms** — Solo founders should default to Net 14 for services; Net 30 only when required by larger clients; SaaS should always be prepaid (monthly or annual)
3. **Late Payment Fees** — Industry standard: 1.5%/month (18% annualized); must be stated in the contract to be enforceable; some jurisdictions cap late fees — check state/country law
4. **Deposit and Prepayment Structures** — 25-50% upfront for services, 100% prepaid for digital products and courses, annual prepaid discount (typically 15-20% off monthly) for SaaS
5. **Collections Escalation Ladder** — Day 1: Automated reminder → Day 7: Personal email → Day 14: Phone call → Day 21: Final notice with late fee → Day 30+: Collections or write-off decision
6. **Currency, Payment Methods, and International Considerations** — Accept USD as default; Stripe/PayPal handle currency conversion; international wire fees ($15-50); specify payment currency in contract

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average B2B invoice is paid in 8 days past terms (Net 30 = ~38 days actual) | Fundbox / Dun & Bradstreet | Build buffer into cash flow planning |
| 1.5%/month late fee is the most common contractual rate in US B2B | Legal industry standard | Courts generally uphold this rate |
| Invoices with "Due on Receipt" are paid 2x faster than Net 30 | FreshBooks data | Shorter terms = faster payment |
| Automated payment reminders recover 25-30% of overdue invoices without human intervention | Stripe / Chargebee data | Automation pays for itself |
| Annual prepaid SaaS contracts have 15-25% lower churn than monthly | SaaS benchmarks (ProfitWell) | Incentivize annual with 15-20% discount |
| 60% of small businesses have experienced cash flow problems due to late payments | QuickBooks SMB survey | Payment terms directly impact survival |

### Frameworks & Models

- **Payment Term Selection Guide:**

  | Client Type | Recommended Terms | Deposit | Late Fee |
  |-------------|------------------|---------|----------|
  | Small business / startup | Net 14 | 50% upfront | 1.5%/month |
  | Mid-market company | Net 14-30 | 25-33% upfront | 1.5%/month |
  | Enterprise / government | Net 30-45 | None (they won't) | Per contract |
  | Coaching / consulting | Due on receipt or Net 7 | 100% or 50% | 1.5%/month |
  | SaaS subscription | Prepaid (monthly/annual) | N/A | Auto-retry + dunning |
  | Digital products / courses | Due on receipt | 100% | N/A |

- **The Late Fee Clause Template:**
  "Invoices not paid within [NET TERMS] days of the invoice date shall accrue interest at the rate of 1.5% per month (18% per annum) or the maximum rate permitted by applicable law, whichever is less."

- **Collections Escalation Ladder:**
  - Day 0: Invoice sent (automated)
  - Day +1 past due: Friendly automated reminder
  - Day +7: Personal email ("Just checking in — noticed this is past due")
  - Day +14: Direct phone call or voice message
  - Day +21: Formal notice with late fee applied
  - Day +30: Final demand letter — pause work if ongoing
  - Day +45: Small claims court ($5-10K), collections agency, or write-off

### Tools to Reference

| Tool | Function | Pricing | Solo Founder Fit |
|------|----------|---------|------------------|
| Stripe Billing | Automated invoicing + dunning | 2.9% + $0.30/transaction (no monthly fee) | High (SaaS) |
| FreshBooks | Invoicing + payment tracking | $17/mo (Lite) | High (services) |
| Wave | Free invoicing + accounting | Free | High (bootstrapped) |
| PayPal Business | Invoicing + payments | 2.9% + $0.30/transaction | Medium |
| Harvest | Time tracking + invoicing | $11/mo (Solo) | High (hourly billing) |

### Artifact Component

**Payment Terms Clause Set** — Pre-written payment terms for each client type, late fee language, deposit structures, and collections escalation SOP.

### Interactive Element

**Scenario Simulator:** Students are presented with 5 client scenarios (startup asking for Net 60, enterprise requiring Net 45, coaching client wanting to pay after results, etc.) and must propose payment terms. AI scores their terms on cash flow protection, client friendliness, and enforceability.

---

## LESSON 4: E-Signature Workflows and Contract Management (45 min)

### Key Topics

1. **E-Signature Tools Compared** — DocuSign ($10/mo Starter, industry standard), SignWell ($8/mo, simple and affordable), PandaDoc ($19/mo, proposals + contracts + e-sign), Dropbox Sign (formerly HelloSign, $15/mo), Adobe Acrobat Sign (free tier available, limited to 2 transactions/month)
2. **Setting Up Your E-Signature Workflow** — Template creation → variable fields (name, date, scope, price) → send for signature → countersign → auto-file to storage → notify CRM
3. **Contract Management for Solo Founders** — Where to store contracts: Google Drive (free, organized by client/year), Notion (free, searchable database), Airtable (free tier, structured tracking). Enterprise tools like Ironclad are NOT recommended — overkill and expensive ($$$)
4. **Contract Tracking System** — Spreadsheet or Notion database with: Client name, Contract type, Start date, End date/renewal, Value, Status (Draft/Sent/Signed/Active/Expired)
5. **Renewal and Expiration Alerts** — Set calendar reminders 30/60/90 days before contract expiration; automate renewal notices; annual contract review cadence
6. **Version Control and Audit Trail** — Never edit a signed contract; amendments as separate documents referencing original; keep all versions in a dated folder structure

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| E-signatures reduce contract close time by 80% (from ~5 days to ~1 day) | DocuSign data | Eliminates print-sign-scan friction |
| 44 countries legally recognize e-signatures (ESIGN Act in US, eIDAS in EU) | Legal compliance data | E-signatures are legally binding everywhere you likely operate |
| DocuSign processes 1.5+ billion envelopes annually | DocuSign | Industry standard — clients trust it |
| Solo founders spend an average of 3-5 hours/month managing contracts manually | Freelance workflow studies | A tracking system saves 50%+ of this time |
| 28% of contract value is lost due to missed renewals | World Commerce & Contracting | Renewal alerts directly protect revenue |

### Frameworks & Models

- **E-Signature Tool Comparison:**

  | Tool | Monthly Cost | Key Strengths | Limitations | Best For |
  |------|-------------|---------------|-------------|----------|
  | DocuSign | $10/mo (Personal) / $25/mo (Standard) | Industry standard, mobile app, integrations | Pricier; Personal plan = 5 envelopes/mo | High-volume signing, enterprise clients |
  | SignWell | $8/mo (Personal, unlimited) | Cheapest unlimited, simple UI, API | Fewer integrations | Budget-conscious solo founders |
  | PandaDoc | $19/mo (Essentials) | Proposals + contracts + e-sign combined | Higher price for just e-sign | Proposal-heavy workflows |
  | Dropbox Sign | $15/mo (Essentials) | Clean UI, Dropbox integration | No free tier anymore | Dropbox ecosystem users |
  | Adobe Acrobat Sign | Free (2/mo) / $12.99/mo | Free tier exists, PDF-native | Free tier very limited | Occasional use, PDF-heavy |

- **Recommended Contract Management Setup (Free):**
  1. Google Drive folder structure: `Contracts / [Client Name] / [Year] / [Contract-Type-YYYY-MM-DD.pdf]`
  2. Notion database with properties: Client, Type, Status, Start Date, End Date, Value, Renewal Alert
  3. Google Calendar reminders at 90/60/30 days before expiration

- **E-Signature Workflow (5 Steps):**
  1. Load template in e-sign tool
  2. Fill variable fields (client name, scope, price, dates)
  3. Add signature/initial fields for both parties
  4. Send to client with personal note
  5. Upon completion: auto-save to Drive, log in Notion/tracker, update CRM deal stage

### Tools to Reference

| Tool | Function | Pricing | Solo Founder Fit |
|------|----------|---------|------------------|
| DocuSign | E-signature | $10/mo (Personal, 5 envelopes) / $25/mo (Standard) | High |
| SignWell | E-signature | $8/mo (unlimited) | High |
| PandaDoc | Proposals + E-signature | $19/mo (Essentials) | High (if doing proposals) |
| Dropbox Sign | E-signature | $15/mo (Essentials) | Medium |
| Adobe Acrobat Sign | E-signature | Free (2/mo) / $12.99/mo | Medium (occasional use) |
| Google Drive | Contract storage | Free | High |
| Notion | Contract tracking database | Free | High |
| Airtable | Contract tracking | Free (up to 1,000 records) | High |

### Artifact Component

**E-Signature Workflow Map** — Complete workflow from template → variable fill → send → countersign → file → CRM update, with tool-specific setup instructions for SignWell (recommended budget pick) and DocuSign (recommended standard pick).

### Interactive Element

**Guided Build:** Students set up a contract tracking database (Notion template provided). AI wizard asks about their typical deal flow and recommends which e-signature tool to start with, then walks through creating their first template with merge fields.

---

## LESSON 5: Redlines: What to Push Back On (50 min)

### Key Topics

1. **What Is Redlining?** — The process of marking up a contract with proposed changes; standard in B2B sales; Word Track Changes or PDF markup; not adversarial — it's negotiation
2. **The 5 Most Common Redline Requests** — (1) Unlimited liability → counter with cap at 1-2x contract value, (2) Work-for-hire on all IP → counter with license or hybrid, (3) Net 60/90 payment → counter with Net 30 or 50% upfront, (4) Auto-renewal without opt-out → counter with 30-day notice, (5) Non-compete clauses → push back hard unless compensated
3. **The "Accept / Negotiate / Walk" Framework** — For each redline: Is this a deal-breaker? What's the business impact? What's my counter-proposal? What's my walk-away point?
4. **Redlines You Should Always Push Back On** — Unlimited liability, non-competes without compensation, IP ownership of pre-existing tools/methods, payment terms >45 days, unilateral termination without notice or payment for work done
5. **Redlines You Can Usually Accept** — Reasonable confidentiality terms, mutual indemnification, governing law (their state is usually fine), insurance requirements (get general liability if you don't have it), reasonable data handling requirements
6. **How to Redline Professionally** — Use Track Changes, add comments explaining your reasoning, propose alternatives (don't just reject), respond within 48-72 hours, be willing to have a call for complex redlines

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| 70% of contract negotiations involve 3 or fewer rounds of redlines | DocuSign / Ironclad CLM data | Most deals resolve quickly if you're reasonable |
| Unlimited liability clauses are the #1 most-negotiated term in B2B contracts | World Commerce & Contracting | Always cap your liability |
| Non-compete clauses in contractor agreements are unenforceable in California and increasingly other states | FTC / state law trends (2024-2025) | Know your jurisdiction |
| Average redline cycle takes 5-12 business days per round | Legal ops benchmarks | Budget time for 1-2 rounds in deal timeline |
| Solo founders who accept unlimited liability face average dispute costs of $15-50K | Small business litigation data | Liability caps are non-negotiable protection |

### Frameworks & Models

- **The Accept / Negotiate / Walk Framework:**

  | Redline Category | Accept | Negotiate | Walk Away |
  |-----------------|--------|-----------|-----------|
  | Liability | Mutual, capped at 1-2x value | Uncapped but with carve-outs | Unlimited, one-sided |
  | IP Ownership | License for deliverables | Work-for-hire on deliverables only (retain pre-existing) | All IP including your methodologies |
  | Payment Terms | Net 14-30 | Net 45 with deposit | Net 60+ with no deposit |
  | Termination | Mutual, 30-day notice | 14-day notice with payment for completed work | Immediate, no payment for WIP |
  | Non-Compete | Industry-standard 6-month, narrow scope | 12-month with compensation | Broad, multi-year, uncompensated |
  | Confidentiality | Mutual, 2-3 year term | One-sided but reasonable scope | Perpetual, overly broad |

- **Professional Redline Response Template:**
  "Thank you for the proposed changes. I've reviewed the redlines and have a few comments:
  1. [Clause X]: I'd suggest [counter-proposal] because [business reasoning].
  2. [Clause Y]: This works for me — accepted.
  3. [Clause Z]: Could we discuss this on a call? I want to make sure we're aligned on [concern].
  Happy to jump on a quick call to resolve the open items."

### Artifact Component

**Redline Cheat Sheet** — Reference card with the 10 most common redline requests, recommended counter-positions, and sample language for each.

### Interactive Element

**Simulation:** Students receive a contract with 5 redline requests from a fictional client. For each redline, they must decide Accept/Negotiate/Walk and draft a counter-proposal. AI scores responses on business protection, client relationship preservation, and legal soundness. System reveals consequences of each choice.

---

## LESSON 6: When to Involve Legal Counsel (40 min)

### Key Topics

1. **The 80/20 Rule of Solo Founder Legal** — 80% of your contracts can be handled with good templates and common sense; 20% require professional review. Knowing which is which is the skill.
2. **Always Involve Counsel For:** — (1) Deals over $50K in total value, (2) IP transfers or assignments (not licenses), (3) Non-standard liability or indemnification beyond your template, (4) International contracts (different legal systems), (5) Equity or revenue-share arrangements, (6) Government contracts
3. **Usually Safe to Self-Serve:** — (1) Standard SaaS Terms of Service (use a good template), (2) Simple engagement letters under $10K, (3) SOWs using your tested MSA as the base, (4) Standard NDAs (mutual), (5) Invoicing and payment terms within your template
4. **How to Work with a Lawyer Efficiently** — Flat-fee reviews ($300-800 for a contract review), not hourly; send your draft with specific questions marked; batch reviews (2-3 contracts at once); build a relationship with one attorney, not a firm
5. **Finding Affordable Legal Help** — Solo practitioner attorneys ($150-300/hr vs BigLaw $500-1,000+/hr), LegalZoom / Rocket Lawyer ($39-49/mo for basic templates + attorney access), Lawtrades / UpCounsel (marketplace for freelance attorneys), SCORE mentors (free guidance, not legal advice)
6. **The "Legal Budget" Mindset** — Budget $1,000-3,000/year for legal review; think of it as insurance, not expense; one bad contract can cost 10-100x your annual legal budget

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Average cost of a business contract dispute: $25,000-$100,000 | American Bar Association | Prevention is 10-100x cheaper than litigation |
| Solo practitioner attorney review: $300-800 per contract | Legal marketplace data (UpCounsel, Lawtrades) | Flat-fee is always better than hourly for reviews |
| 67% of small businesses that faced a legal dispute did not have their contracts reviewed by an attorney | NFIB legal survey | Don't be in this group for important deals |
| LegalZoom business plan: $39/mo includes 30-min attorney consultations | LegalZoom (2025) | Good for quick questions, not complex deals |
| Average startup spends $3,000-5,000/year on legal in year 1-2 | Startup legal benchmarks | Solo founders can start at $1,000-2,000/year |

### Frameworks & Models

- **The Counsel Trigger Checklist:**

  | Trigger | Action | Estimated Cost |
  |---------|--------|----------------|
  | Deal value >$50K | Full contract review | $500-800 |
  | IP transfer (not license) | Review IP clauses | $300-500 |
  | Non-standard liability/indemnity | Review risk clauses | $300-500 |
  | International contract | Full review + jurisdiction analysis | $800-1,500 |
  | Equity/revenue share deal | Full review + structure advice | $1,000-2,500 |
  | Government/regulated industry | Specialized review | $1,000-3,000 |
  | Template creation (first time) | Draft or review your master templates | $500-1,500 |
  | Everything else | Self-serve with tested templates | $0 |

- **Efficient Attorney Engagement Template:**
  "Hi [Attorney Name],
  I need a flat-fee review of the attached [contract type]. My specific questions are:
  1. [Specific concern about Clause X]
  2. Is the liability cap adequate for a deal of this size?
  3. Any red flags I'm missing?
  Budget: $[amount]. Timeline: [X] business days.
  Can you confirm availability and fee?"

### Tools to Reference

| Tool | Function | Pricing | Solo Founder Fit |
|------|----------|---------|------------------|
| UpCounsel | Freelance attorney marketplace | Pay per project ($300-1,500 typical) | High |
| Lawtrades | Freelance attorney marketplace | Pay per project | High |
| LegalZoom | Templates + attorney access | $39/mo (Business) | Medium (good for questions) |
| Rocket Lawyer | Templates + attorney access | $49/mo (Premium) | Medium |
| SCORE | Free mentoring (not legal advice) | Free | High (for guidance) |
| Clerky | Startup legal docs (incorporation, etc.) | $99-799 per document | Medium (incorporation/equity) |

### Artifact Component

**Counsel Trigger Checklist** — Decision framework for when to self-serve vs involve counsel, with budget estimates and recommended attorney engagement templates.

### Interactive Element

**Simulation:** Students are presented with 8 contract scenarios of varying complexity and risk. For each, they decide "Self-Serve" or "Involve Counsel" and estimate the budget. AI reveals the correct answer with reasoning. Scenarios include: $5K coaching engagement (self-serve), $75K enterprise SaaS deal (counsel), international consulting contract (counsel), standard NDA (self-serve), IP licensing deal (counsel), etc.

---

## LESSON 7: Your Contract Templates Library (45 min)

### Key Topics

1. **Library Assembly** — Compiling all artifacts from Lessons 1-6 into a single, organized, ready-to-use contract system
2. **Template Customization Checklist** — For each template: replace all placeholder variables, add your company name and details, adjust payment terms to your defaults, review IP clause against your business model, set your standard termination terms
3. **The 5-Template Starter Kit** — (1) Mutual NDA (1 page), (2) Engagement Letter (2-3 pages, for sub-$10K services), (3) Master Service Agreement (4-6 pages), (4) Statement of Work template (2-3 pages, pairs with MSA), (5) SaaS Terms of Service (for software products)
4. **Quality Assurance Pass** — Read every template aloud for clarity; have a non-legal friend read and summarize each clause; check all cross-references and defined terms; verify your jurisdiction and governing law
5. **Quarterly Review Cadence** — Review templates every 90 days; update pricing, terms, and clauses based on lessons learned; track common client redlines and pre-address them in templates
6. **Version Control** — Date every template version (v1.0-2024-01, v1.1-2024-04); never edit signed contracts; amendments as separate documents

### Frameworks & Models

- **Contract Templates Library Structure:**

  ```
  📁 Contract Templates/
  ├── 📄 Mutual-NDA-v1.0.docx
  ├── 📄 Engagement-Letter-v1.0.docx
  ├── 📄 MSA-v1.0.docx
  ├── 📄 SOW-Template-v1.0.docx
  ├── 📄 SaaS-ToS-v1.0.docx
  ├── 📁 Clause Library/
  │   ├── 📄 Payment-Terms-Clauses.docx
  │   ├── 📄 IP-Ownership-Clauses.docx
  │   ├── 📄 Termination-Clauses.docx
  │   └── 📄 Liability-Cap-Clauses.docx
  ├── 📁 Reference/
  │   ├── 📄 Redline-Cheat-Sheet.pdf
  │   ├── 📄 Counsel-Trigger-Checklist.pdf
  │   └── 📄 Payment-Terms-Guide.pdf
  └── 📁 Signed/
      └── 📁 [Client Name]/
          └── 📄 [Contract-YYYY-MM-DD-signed.pdf]
  ```

- **Quarterly Review Checklist:**
  1. Were there any client redlines that came up more than once? → Pre-address in template
  2. Did any payment terms cause problems? → Adjust defaults
  3. Were there scope disputes? → Clarify deliverable language
  4. Any new business lines or deal types? → Create new template if needed
  5. Legal landscape changes? → Update compliance clauses

### Artifact Component

**Complete Contract Templates Library** (Primary Course Artifact) — All 5 templates customized to the student's business, plus clause library, redline cheat sheet, counsel trigger checklist, and contract tracking database.

### Interactive Element

**Implementation Sprint Launcher:** AI generates a personalized 5-day checklist:
- Day 1: Customize NDA and Engagement Letter templates
- Day 2: Customize MSA and SOW templates
- Day 3: Set up e-signature workflow and contract tracking database
- Day 4: Build clause library with payment, IP, and termination variants
- Day 5: Quality assurance pass — read aloud, peer review, file organization

AI reviews completed templates for common issues (vague scope language, missing liability caps, inconsistent defined terms) and provides feedback.

---

## TOOL PRICING SUMMARY

### Tier 1: Free ($0/mo)
Google Drive (storage) + Notion (tracking) + Google Docs (drafting) + Adobe Acrobat Sign free tier (2 signatures/mo)

### Tier 2: Budget ($8-10/mo)
SignWell ($8/mo unlimited) + Google Drive + Notion

### Tier 3: Standard ($19-25/mo)
DocuSign Standard ($25/mo) or PandaDoc Essentials ($19/mo) + Google Drive + Notion

### Annual Legal Budget
$1,000-3,000/year for attorney reviews of high-value or complex contracts

---

## ALL ARTIFACTS CREATED

1. Contract Type Decision Tree (L1)
2. Clause Library v1 — Scope, Payment, IP, Termination (L2)
3. Payment Terms Clause Set (L3)
4. E-Signature Workflow Map (L4)
5. Redline Cheat Sheet (L5)
6. Counsel Trigger Checklist (L6)
7. Complete Contract Templates Library (L7) — compiles all above

**Completion Badge:** "Contract Commander" — 150 XP
