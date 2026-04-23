# CLAUDE CODE PROMPT: KANBOX → INSTANTLY.AI EMAIL PERSONALIZATION

## CONTEXT

You are generating hyper-personalized cold emails for Mike, founder of SoloFrameHub, who is launching an AI-powered Customer Acquisition Academy for bootstrap founders. Mike is doing a "building in public" launch and looking for 10-20 beta testers.

**Key Facts:**
- Platform: SoloFrameHub.com (AI-native customer acquisition academy)
- Price: $49/mo (offering free beta access + book for feedback)
- Launch: Week of February 8, 2026 (happening now)
- Mike's Background: 14 years Upwork, 20 years in startups focused on enterprise tech (GE, Unisys, Intel partnerships)
- Target: Bootstrap founders (0-2 years in role, early-stage, US-based)
- Approach: Teaching technical founders to get first 100 customers without ad spend or sales team

## INPUT

You will receive a CSV file exported from Kanbox with these key columns:
- `firstname_cleaned`, `lastname_cleaned`
- `email_enrich` (the Kanbox-enriched email address)
- `company_cleaned`
- `headline` (LinkedIn headline)
- `company_description` (company description)
- `company_specialties` (list of specialties)
- `all_skills` (comma-separated skills)
- `job` (current job title)
- `industry`

## YOUR TASK

For each row in the CSV:

1. **Analyze the prospect's context** using:
   - Their `headline`
   - Their `company_description`
   - Their `company_specialties`
   - Their `all_skills`
   - Their `job` title

2. **Infer their founder type** (choose ONE):
   - **Agency Owner**: Builds acquisition systems for clients (keywords: agency, marketing services, lead generation, client acquisition, ads, funnel, growth marketing)
   - **SaaS Founder**: Building software product (keywords: SaaS, software, platform, app, API, product, technology)
   - **Coach/Consultant**: High-ticket services, personal brand (keywords: coaching, consulting, advisor, expert, speaker, training, transformation)
   - **Solo Developer**: Technical founder, code-first (keywords: developer, engineer, freelance, technical, programming, software development)
   - **Default**: If unclear, use generic bootstrap founder language

3. **Generate personalized fields for a 3-email sequence:**
   - **Subject / Opener**: Email 1 — reference what their company does (see SUBJECT LINE RULES / OPENER RULES below)
   - **Subject2 / Opener2**: Email 2 — reference their specialties, skills, or a different angle (see SEQUENCE RULES below)
   - **Subject3 / Opener3**: Email 3 — reference their background, industry, or personal journey (see SEQUENCE RULES below)
   - **Personalization**: A unique per-contact closing line (see PERSONALIZATION RULES below)

4. **Output one CSV row** with: Email, FirstName, LastName, Company, Subject, Opener, Subject2, Opener2, Subject3, Opener3, Personalization, InferredType

The email templates live in Instantly's campaign editor (see INSTANTLY.AI CAMPAIGN TEMPLATES section below) — the CSV only carries the variable data.

---

## SUBJECT LINE RULES

**Generate a unique subject line for each contact** that references something specific about them while connecting to the academy offer. The subject line should feel like it was written for them, not pulled from a template.

**Guidelines:**
- Max 60 characters (for mobile preview)
- Reference their company name, what they do, or their domain — not their personal name
- Connect their work to customer acquisition or the academy concept
- Tone: peer-to-peer, founder-to-founder, casual but not gimmicky
- No clickbait, no ALL CAPS, no excessive punctuation

**Source data to draw from:** `headline`, `company_cleaned`, `company_description`, `job`

**Examples (showing the pattern, not to be reused verbatim):**

| Prospect Context | Subject Line |
|---|---|
| Agency owner scaling coaches with ads | Profit Dynamo + customer acquisition — testing something live |
| SaaS founder building claims AI | TurboClaim and getting first customers — compare notes? |
| Coach helping with passive investing | Gold Dragon Investments — how I'm acquiring customers in public |
| BD consultant, outsourced sales | Harbor BD builds pipelines — I'm building one live |

**Anti-patterns (do NOT generate lines like these):**
- Generic: "Quick question about your business"
- Clickbait: "You won't believe what I built"
- Salesy: "Exclusive beta access for you!"
- Too long: "I noticed you're the founder of X and I thought you'd be interested in..."

---

## OPENER RULES

**Generate a unique opening sentence for each contact** that immediately signals "I looked at what you do" before transitioning into the email body. This replaces the generic first line.

**Guidelines:**
- One sentence only (keep it under 30 words)
- Reference something specific: their headline, what their company does, their specialties, or their role
- Natural bridge into "I'm building something in the same space"
- Tone: observational, not flattering — state what they do, don't compliment them
- Do NOT use "I noticed..." or "I came across..." or "I saw your profile..." — these are overused cold email openers

**Source data to draw from:** `headline`, `company_description`, `company_specialties`, `job`, `industry`

**Examples (showing the pattern, not to be reused verbatim):**

| Prospect Context | Opener |
|---|---|
| "Scaling Coaches, Consultants, and SAAS Companies With Ads" | You're building acquisition systems for coaches and SaaS companies at Profit Dynamo — I'm building a system that teaches founders to do it themselves. |
| "Bringing AI to the Claims World \| GTM @ TurboClaim" | You're doing GTM for an AI product at TurboClaim — I'm doing the same thing for an AI-powered academy and documenting every step. |
| "Helping You Win the Game of Passive Investing! \| Founder & CEO" | You're running Gold Dragon Investments and helping people build passive income — I'm teaching founders how to build their customer acquisition engine the same way. |
| "Founder & President of Harbor BD" (outsourced BDR agency) | You're building outbound sales systems for startups at Harbor BD — I'm testing my own outbound system right now and sharing results publicly. |

**Anti-patterns (do NOT generate lines like these):**
- Flattery: "I'm really impressed by what you're doing at X"
- Vague: "I see you're a founder too"
- Stalker: "I've been following your work closely"
- Question opener: "Have you ever struggled with customer acquisition?"

---

## SEQUENCE RULES (Emails 2 and 3)

Each email in the sequence must reference a **different detail** from the prospect's data. Do NOT repeat angles across emails.

**Email 1** (Subject / Opener): What their company does — drawn from `company_description`, `headline`, `job`
**Email 2** (Subject2 / Opener2): Their specialties or skills — drawn from `company_specialties`, `all_skills`, or a specific capability from their headline
**Email 3** (Subject3 / Opener3): Their background, industry context, or personal angle — drawn from `industry`, `summary`, or any unique detail in their profile

### Subject2 / Subject3 Rules
- Same rules as Subject (max 60 chars, no clickbait, peer-to-peer tone)
- Must reference a DIFFERENT aspect than Subject used
- Should still connect to the book / academy / customer acquisition theme

### Opener2 / Opener3 Rules
- Same rules as Opener (one sentence, under 30 words, observational, no "I noticed...")
- Must reference DIFFERENT details than the previous Opener(s) used
- Opener2 tone: lighter follow-up, acknowledge this is a second email
- Opener3 tone: final touch, shorter, direct

**Example for Clayton Gilvar (Harbor BD, agency_owner):**

| Email | Subject | Opener |
|---|---|---|
| 1 | Harbor BD's outbound systems and customer acquisition | You're building and managing outbound lead gen systems for small businesses and startups at Harbor BD. |
| 2 | Cold email and appointment setting — comparing notes | Your team handles ICP research, cold calling, and appointment booking — I'm testing a similar outbound system right now for my own launch. |
| 3 | Fortune 500 sales to bootstrap BDR — sound familiar? | You went from Fortune 500 sales leadership to building Harbor BD — I made a similar leap from enterprise tech to teaching founders. |

---

## PERSONALIZATION RULES (Closing Line)

**Generate a unique closing line for each contact** that references something specific about their business. Do NOT reuse the same line across contacts.

**Pattern:** "You'd give me good feedback since you're [specific thing they do from their data]."

**Guidelines:**
- One sentence, reference their company name or what they specifically build/do
- Draw from `headline`, `company_description`, `company_specialties`, `job`
- Do NOT repeat the Opener — reference a different detail or angle
- Used in Email 1 only; Emails 2 and 3 have their own static closing in the template

**Examples by type (not to be reused verbatim):**

| Type | Example |
|---|---|
| agency_owner | You'd give me good feedback since you're building outbound sales systems for startups at Harbor BD. |
| saas_founder | You'd give me good feedback since you're getting insurance companies to adopt AI automation at unLocked AI. |
| coach_consultant | You'd give me good feedback since you're selling fractional HR transformation to growing companies at GOHRSolutions. |
| solo_developer | You'd give me good feedback since you're figuring out adoption for open-source RL environments at Benchflow. |
| default | You'd give me good feedback since you're growing a short-term rental business across multiple states at Roam Properties. |

## INFERENCE LOGIC

Use this keyword matching to determine founder type:

**Agency Owner** - Look for:
- Company description mentions: "agency", "marketing services", "lead generation", "client acquisition", "growth marketing", "ads", "funnel", "clients"
- Headline mentions: "agency", "helping", "scaling", "growing"
- Specialties mention: "paid advertising", "funnel", "lead gen", "client", "marketing"

**SaaS Founder** - Look for:
- Company description mentions: "SaaS", "software", "platform", "app", "API", "product", "technology", "cloud"
- Headline mentions: "founder", "building", "product", "software"
- Industry: "Computer Software", "Information Technology"

**Coach/Consultant** - Look for:
- Company description mentions: "coaching", "consulting", "advisor", "training", "transformation", "expert"
- Headline mentions: "coach", "consultant", "helping", "speaker", "expert"
- Skills mention: "coaching", "consulting", "speaking", "training"

**Solo Developer** - Look for:
- Job title: "developer", "engineer", "freelance", "technical"
- Skills: "programming", "software development", "web development"
- Headline mentions: "freelance", "independent", "developer", "engineer"

**Default** - If none of the above patterns match strongly

---

## OUTPUT FORMAT (Instantly.ai CSV)

The email template lives in Instantly's campaign editor (see INSTANTLY CAMPAIGN TEMPLATE below). The CSV only contains the merge-tag variable data.

Generate a CSV with these columns (in this exact order):

```
Email,FirstName,LastName,Company,Subject,Opener,Subject2,Opener2,Subject3,Opener3,Personalization,InferredType
```

### Column Specifications:

1. **Email**: Copy from input `email_enrich` column — Instantly predefined **Email**
2. **FirstName**: Copy from input `firstname_cleaned` — Instantly predefined **First name**
3. **LastName**: Copy from input `lastname_cleaned` — Instantly predefined **Last name**
4. **Company**: Copy from input `company_cleaned` — Instantly predefined **Company name**
5. **Subject**: Email 1 subject line (what their company does) — Instantly **Custom variable**
6. **Opener**: Email 1 opening sentence (what their company does) — Instantly **Custom variable**
7. **Subject2**: Email 2 subject line (their specialties/skills) — Instantly **Custom variable**
8. **Opener2**: Email 2 opening sentence (their specialties/skills) — Instantly **Custom variable**
9. **Subject3**: Email 3 subject line (their background/industry) — Instantly **Custom variable**
10. **Opener3**: Email 3 opening sentence (their background/industry) — Instantly **Custom variable**
11. **Personalization**: Unique per-contact closing line (Email 1 only) — Instantly **Custom variable**
12. **InferredType**: Classification — **Do Not Import** or keep for tracking

### Instantly.ai Header Requirements:

- Headers must start with a capital letter
- Headers must be under 20 characters
- Headers must be unique
- First row is headers only (no data)

### CSV Formatting Rules:

- Wrap fields in quotes if they contain commas
- Escape any literal quotes with `""`
- No line breaks within fields

---

## QUALITY CONTROL RULES

**Skip rows if:**
- `email_enrich` is empty or invalid (no @ symbol)
- `email_enrich` is a generic address (info@, contact@, admin@, hello@, support@)
- `firstname_cleaned` is empty

**Flag for manual review (add to separate CSV):**
- Unable to confidently infer founder type (too ambiguous)

---

## EXAMPLE OUTPUT ROW

**Input row:**
```
firstname_cleaned: Nemanja
lastname_cleaned: Kilibarda
email_enrich: nemanja@profitsdynamo.com
company_cleaned: Profit Dynamo
headline: Scaling Coaches, Consultants, and SAAS Companies With Ads
company_description: We build and manage your entire client acquisition system, not just ads...
company_specialties: ['Funnel Design & Build', 'Paid Advertising', 'Lead Generation'...]
```

**Output row:**
```csv
Email,FirstName,LastName,Company,Subject,Opener,Subject2,Opener2,Subject3,Opener3,Personalization,InferredType
nemanja@profitsdynamo.com,Nemanja,Kilibarda,Profit Dynamo,"Profit Dynamo + customer acquisition — testing something live","You're building acquisition systems for coaches and SaaS companies at Profit Dynamo — I'm building a system that teaches founders to do it themselves.","Funnel design and paid ads — comparing acquisition notes","Your team runs funnel builds and paid advertising across Meta, YouTube, and TikTok — I'm testing whether AI-personalized cold email can compete.","From agency to acquisition system — a familiar path?","You went from managing client ad spend to building a full acquisition system — I did something similar going from Upwork to building an academy.","You'd give me good feedback since you're managing the full client acquisition lifecycle at Profit Dynamo — from funnel design to paid media to lead gen.",agency_owner
```

---

## INSTANTLY.AI CAMPAIGN TEMPLATES

Paste each email into its corresponding step in Instantly's sequence editor.

---

### Email 1 — Initial Outreach

**Subject:** `{{Subject}}`

**Body:**
```
{{FirstName}},

{{Opener}}

I spent 14 years on Upwork and 20 years in startups focused on enterprise tech (GE, Unisys, Intel partnerships). Now I'm teaching technical founders how to get their first 100 customers without ad spend or a sales team.

I just finished writing the book—"The Solo Founder's AI Customer Acquisition Playbook"—appearing on Amazon this week, and I'm offering free copies in exchange for honest reviews. I'm also taking applications for beta testers on the Solo Founder's AI Customer Acquisition Academy.

I'm testing this hyper-personalization approach using AI—so if this email landed well, that's a good sign. If not, I truly apologize and welcome your feedback.

Interested in seeing what I built? {{Personalization}}

As I say in my book, I'm "Marketing in Public"—care to follow the journey?

Mike Sullivan
Author / Practitioner / Founder
SoloFrameHub.com
```

---

### Email 2 — Follow-Up (3-5 days later)

**Subject:** `{{Subject2}}`

**Body:**
```
{{FirstName}},

{{Opener2}}

The book just went live on Amazon — "The Solo Founder's AI Customer Acquisition Playbook." I'm giving away free copies to founders who'll leave an honest review.

No strings attached. If the book's useful, great. If not, I want to know that too.

Want me to send you a copy?

Mike Sullivan
Author / Practitioner / Founder
SoloFrameHub.com
```

---

### Email 3 — Final Touch (5-7 days later)

**Subject:** `{{Subject3}}`

**Body:**
```
{{FirstName}},

{{Opener3}}

Last note on this — the free book offer is still open, and I'm closing beta tester applications for the academy soon.

Either way, I appreciate you reading this far. Marketing in Public means some emails land and some don't.

Mike Sullivan
Author / Practitioner / Founder
SoloFrameHub.com
```

---

**Column mapping on upload:**
| CSV Column | Instantly Mapping |
|---|---|
| Email | Predefined → Email |
| FirstName | Predefined → First name |
| LastName | Predefined → Last name |
| Company | Predefined → Company name |
| Subject | Custom variable |
| Opener | Custom variable |
| Subject2 | Custom variable |
| Opener2 | Custom variable |
| Subject3 | Custom variable |
| Opener3 | Custom variable |
| Personalization | Custom variable |
| InferredType | Do Not Import (or Custom variable for tracking) |

---

## EXECUTION INSTRUCTIONS

1. Read the input CSV file
2. Process each row following the inference logic
3. Generate personalized emails with appropriate closing
4. Output two CSV files:
   - `personalized_emails.csv` (ready for Instantly.ai upload)
   - `flagged_for_review.csv` (rows that need manual review)
5. Print summary statistics:
   - Total rows processed
   - Valid emails generated
   - Flagged for review
   - Breakdown by inferred_type

---

## SCOPE

- This prompt is designed to work across all 14 Kanbox enriched lists
- For the current iteration, **process only the first 50 contacts** in the input CSV
- Expect iteration on classification accuracy and output quality before scaling to all lists

---

## READY TO PROCESS

When you receive the CSV file, follow these steps exactly and generate both output files.