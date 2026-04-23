# GEMINI CONTINUATION PROMPT: Hyper-Personalized Email Campaign for SoloFrameHub

## WHAT THIS PROJECT IS

Mike Sullivan is the founder of SoloFrameHub.com — an AI-powered Customer Acquisition Academy for bootstrap founders. He also wrote "The Solo Founder's AI Customer Acquisition Playbook" which is appearing on Amazon the week of February 8, 2026.

He is running a hyper-personalized cold email campaign using:
- **LinkedIn Sales Navigator** → **Kanbox** (for lead enrichment) → **Claude Code** (for AI personalization) → **Instantly.ai** (for email delivery)

The campaign targets bootstrap founders (0-2 years in role, early-stage, US-based) and offers free book copies for honest reviews + beta tester applications for the academy.

## WHAT HAS BEEN DONE

### 1. Prompt Engineering (Complete)
The full personalization prompt is in `email-marketing/hyper-personalization-prompt.md`. It contains:
- Founder type classification system (5 types: agency_owner, saas_founder, coach_consultant, solo_developer, default)
- Subject line, opener, and personalization generation rules
- 3-email sequence rules (each email uses a different angle from the prospect's data)
- Instantly.ai CSV formatting requirements
- All 3 email templates with merge tags
- Quality control and flagging rules

### 2. First Batch of 50 Contacts (Complete)
- Source: `email-marketing/round-1-navigator_1-298.csv` (298 contacts from Kanbox, rows 1-76 processed)
- Output: `email-marketing/1st-50-personalized_emails.csv` (50 qualified contacts)
- Flagged: `email-marketing/flagged_for_review.csv` (17 contacts set aside)
- Next unprocessed row: **row 77**

### 3. Instantly.ai Formatting Guide
- `email-marketing/instantly.io-formatting.md` contains Instantly's CSV requirements

## CURRENT CSV STRUCTURE (12 columns)

```
Email,FirstName,LastName,Company,Subject,Opener,Subject2,Opener2,Subject3,Opener3,Personalization,InferredType
```

- **Subject / Opener**: Email 1 — references what their company does
- **Subject2 / Opener2**: Email 2 — references their specialties, skills, or a different capability
- **Subject3 / Opener3**: Email 3 — references their background, industry, or personal angle
- **Personalization**: Unique per-contact closing line used in Email 1 only

## THE 3 EMAIL TEMPLATES (for Instantly.ai)

### Email 1 — Initial Outreach
**Subject:** `{{Subject}}`
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

### Email 2 — Follow-Up (3-5 days later)
**Subject:** `{{Subject2}}`
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

### Email 3 — Final Touch (5-7 days later)
**Subject:** `{{Subject3}}`
```
{{FirstName}},

{{Opener3}}

Last note on this — the free book offer is still open, and I'm closing beta tester applications for the academy soon.

Either way, I appreciate you reading this far. Marketing in Public means some emails land and some don't.

Mike Sullivan
Author / Practitioner / Founder
SoloFrameHub.com
```

## WHAT NEEDS TO HAPPEN NEXT

### Immediate (after first 50 are sent via Instantly)
1. **Monitor campaign performance** — open rates, reply rates, bounces by InferredType
2. **Iterate on templates** based on what's working (which subject lines get opens, which openers get replies)
3. **Review the 17 flagged contacts** in `flagged_for_review.csv` and decide which to include

### Scaling
4. **Process remaining contacts** from `round-1-navigator_1-298.csv` (rows 77-298, ~220 remaining)
5. **Process all 14 Kanbox enriched lists** through the same prompt (the screenshot `kanbox-enriched-email-lists.png` shows all 14 lists)
6. Process until target batch size is met (don't stop at a fixed row count — skip unqualified contacts and keep going until you have the target number)

### Quality Rules Learned During First Batch
- **Skip corporate emails** (google.com, salesforce.com, qlik.com, bbdo.com, etc.) — these bounce or get spam-filtered
- **Skip contacts with no personalization data** (empty company_description AND company_specialties AND all_skills)
- **Skip non-founders** (student orgs, pure employees, non-profits without a business angle)
- The `email` column in Kanbox CSV is mostly empty — always use `email_enrich` for the actual email address
- The `no_match_reasons` column flags "Wrong company size" on ~99% of rows — ignore this, solo founders at small companies ARE the target audience
- "Default" classification is OK for founders with clear businesses that just don't fit the other 4 categories
- Coach/consultant with a secondary focus (e.g., non-profit primary + coaching secondary) is acceptable

## KEY FILES

| File | Purpose |
|---|---|
| `email-marketing/hyper-personalization-prompt.md` | The full prompt with all rules, templates, and examples |
| `email-marketing/round-1-navigator_1-298.csv` | Source data (298 Kanbox-enriched contacts) |
| `email-marketing/1st-50-personalized_emails.csv` | First batch output (50 contacts, 12 columns, ready for Instantly) |
| `email-marketing/flagged_for_review.csv` | 17 contacts that were too ambiguous to classify confidently |
| `email-marketing/instantly.io-formatting.md` | Instantly.ai CSV formatting requirements |
| `email-marketing/kanbox-enriched-email-lists.png` | Screenshot showing all 14 available Kanbox lists |

## MIKE'S PREFERENCES

- Tone: peer-to-peer, founder-to-founder, casual but credible
- He calls his approach "Marketing in Public"
- He prefers concrete product names over generic references (say "The Solo Founder's AI Customer Acquisition Playbook" not "the book")
- Sign-off: "Mike Sullivan / Author / Practitioner / Founder / SoloFrameHub.com"
- The academy is in beta, the book is launching on Amazon week of Feb 8, 2026
- His background: 14 years on Upwork, 20 years in startups focused on enterprise tech (GE, Unisys, Intel partnerships)
- Target: first 100 customers without ad spend or a sales team

## CONTEXT LINKS

- Academy: https://soloframehub.com/solo-founders-ai-customer-acquisition-academy.html
- Book: https://soloframehub.com/solo-founders-ai-customer-acquisition-playbook.html
