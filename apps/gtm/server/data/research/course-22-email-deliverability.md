# Course 22: Email Deliverability & Infrastructure — Research Package

**Track:** AI-Powered Acquisition (Track 4)
**Duration:** 12 lessons | ~10 hours total
**Budget Constraint:** <$200/month tool budget
**Time Constraint:** 5-7 hours/week on acquisition
**Sending Target:** 200-400 sends/day across 3-5 sending domains
**Primary Output Artifact:** Multi-Domain Infra Blueprint + Monitoring Dashboard
**Core Interactions:** DNS config assistant, inbox warmup planner, deliverability fire drill simulator

---

## COURSE OUTCOMES (MAPPED)

| Outcome | Lesson Coverage | Artifact Component |
|---------|----------------|-------------------|
| Configure SPF, DKIM, and DMARC correctly across 3-5 sending domains | Lessons 2, 3, 5 | DNS Config Checklist |
| Execute a 4-week warmup protocol from 5/day to 30-50/day per inbox | Lesson 6 | Warmup Schedule Template |
| Stay under Google/Yahoo/Microsoft bulk sender thresholds (<0.1% complaints) | Lessons 1, 3, 7 | Compliance Dashboard |
| Diagnose and recover from spam placement incidents | Lessons 9, 10 | Incident Recovery Playbook |
| Build a gold-standard infra template for 200-400 sends/day | Lessons 4, 7, 11, 12 | Multi-Domain Infra Blueprint |

---

## DESIGN PATTERN (APPLIED TO ALL LESSONS)

1. **Concept Capsule** (5-10 min) — Text + diagrams explaining the core concept
2. **Guided Build Session** — Artifact creation with AI suggestions + Deliverability Linter feedback
3. **Simulation/Roleplay** — Where applicable (Lessons 8, 10 — deliverability fire drills)
4. **Implementation Sprint** — Course culminates in a 7-14 day infrastructure setup sprint (Lesson 12)

---

## LESSON 1: What Changed: 2025-2026 Bulk Sender Rules (45 min)

### Key Topics

1. **The February 2024 Inflection Point** — Google and Yahoo simultaneously enforced new bulk sender requirements that changed cold email forever
2. **Google's Bulk Sender Rules (5,000+/day)** — SPF/DKIM/DMARC required, one-click unsubscribe mandatory, <0.3% spam complaint threshold (target <0.1%)
3. **Yahoo's Parallel Requirements** — Nearly identical to Google, enforced simultaneously, sharing sender reputation data
4. **Microsoft's 2025 Crackdown** — Outlook.com/Hotmail/Live now the harshest; silent filtering, no bounce-back, stricter thresholds than Google
5. **The Solo Founder Sweet Spot** — At 200-400/day you're below "bulk sender" thresholds but still need full authentication
6. **What "Compliance" Actually Means in Practice** — The gap between technical compliance and actual inbox placement

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Google requires SPF, DKIM, and DMARC for all senders as of Feb 2024 | Google Postmaster Blog | Non-compliant senders see immediate rejection/spam |
| Spam complaint rate must stay below 0.1% (danger at 0.3%) | Google/Yahoo 2024 Guidelines | At 0.3% Google begins blocking your domain entirely |
| Microsoft Outlook silently filters 58% of non-authenticated cold email | Return Path / Validity 2025 | No bounce = you never know you're in spam |
| Yahoo Mail processes 14B+ emails/day and shares reputation data with Google | Yahoo Postmaster 2025 | Reputation is cross-platform |
| 85% of all email worldwide is spam (Statista 2025) | Statista | Filters are aggressive by necessity |
| Solo founders sending <500/day rarely trigger bulk sender rules but still need full auth | Industry consensus | Sweet spot: visible enough to matter, small enough to stay nimble |
| One-click unsubscribe header now mandatory for commercial email (RFC 8058) | Google/Yahoo Feb 2024 | List-Unsubscribe-Post header required |

### Frameworks & Models

- **The Authentication Stack (3-Layer Model)**: SPF (who can send) → DKIM (message integrity) → DMARC (policy enforcement). All three required; no exceptions.
- **Reputation = Authentication + Behavior + Content**: Technical setup is necessary but not sufficient. Engagement metrics (opens, replies, clicks) build positive reputation. Content patterns trigger filters.
- **The "Invisible Spam" Problem**: Microsoft's silent filtering means you can have 0% bounce rate and still be 100% in spam. Monitoring is not optional.

### Tools to Reference

| Tool | Function | 2025-2026 Pricing | Solo Founder Fit |
|------|----------|-------------------|------------------|
| Google Postmaster Tools | Gmail reputation monitoring | Free | Essential |
| Microsoft SNDS | Outlook reputation monitoring | Free | Essential |
| MXToolbox | DNS record checker | Free (basic) / $129/mo (pro) | High (free tier) |
| GlockApps | Inbox placement testing | $59/mo (Basic) | High |
| MailReach | Email warmup + monitoring | $25/mo per inbox | High |
| Postmark DMARC Monitoring | Weekly DMARC digests | Free | High |

### Artifact Component

**2025-2026 Compliance Checklist** — Checklist of all Google/Yahoo/Microsoft requirements mapped to specific DNS records and tool settings.

### Interactive Element

**Concept Capsule Quiz:** Match sender requirements to the correct provider (Google vs Yahoo vs Microsoft); identify which authentication layer (SPF/DKIM/DMARC) solves which problem; classify scenarios as compliant vs non-compliant.

**Contextual Note:** Adapts examples based on student's sending volume (stated in onboarding) — under 100/day vs 100-500/day vs 500+/day.

---

## LESSON 2: Gmail & Yahoo Requirements (SPF/DKIM/DMARC) (55 min)

### Key Topics

1. **SPF (Sender Policy Framework) Deep Dive** — TXT record syntax, include mechanisms, the 10-lookup limit, flattening strategies
2. **DKIM (DomainKeys Identified Mail) Deep Dive** — RSA key generation (2048-bit minimum), selector naming, rotation schedule
3. **DMARC Deep Dive** — Policy levels (none → quarantine → reject), rua/ruf reporting, alignment modes (relaxed vs strict)
4. **The Correct Deployment Order** — SPF first → DKIM second → DMARC "none" third → monitor → escalate policy
5. **Common Mistakes That Break Authentication** — Multiple SPF records (only one allowed), missing DKIM alignment, DMARC at "reject" too early
6. **Verification and Testing** — Using MXToolbox, dmarcian, and mail-tester.com to validate

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| SPF has a maximum of 10 DNS lookups; exceeding causes permanent fail | RFC 7208 | Common with multiple SaaS tools (each "include" = 1+ lookups) |
| DKIM 1024-bit keys deprecated by Google in 2024; 2048-bit required | Google Workspace Admin | Old keys silently fail validation |
| DMARC adoption reached 58% of domains globally by Q4 2025 | Valimail Q4 2025 DMARC Report | Up from 28% in 2022 — rapid adoption driven by Google/Yahoo mandates |
| 80% of domains with DMARC still use p=none (monitoring only) | Valimail | "none" doesn't protect; you need to escalate to quarantine/reject |
| Emails failing DMARC alignment are 4.75x more likely to land in spam | Agari / Fortra 2024 | Alignment = the "from" domain matches SPF/DKIM domain |
| MXToolbox free tier checks: SPF, DKIM, DMARC, blacklist, DNS health | MXToolbox | Sufficient for solo founder setup |

### Technical Details

**SPF Record Format:**
```
v=spf1 include:_spf.google.com include:sendgrid.net include:mailgun.org ~all
```
- `include:` adds authorized senders (each costs 1+ DNS lookups)
- `~all` = softfail (recommended during setup); `-all` = hardfail (recommended after validation)
- Maximum 10 DNS lookups total (recursive includes count)

**DKIM Record Format:**
```
selector._domainkey.yourdomain.com IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."
```
- 2048-bit RSA key minimum (generates ~392-character base64 string)
- Selector naming: `google`, `sg1` (SendGrid), `instantly1`, etc.
- Rotate keys every 6-12 months

**DMARC Record Format:**
```
_dmarc.yourdomain.com IN TXT "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100"
```
- Start with `p=none` → monitor for 2-4 weeks → escalate to `p=quarantine` → then `p=reject`
- `rua` = aggregate report destination; `ruf` = forensic report destination
- `pct=100` = apply to all emails (can reduce during transition)

### Frameworks & Models

- **The SPF Audit Workflow**: List all services that send as your domain → count DNS lookups → flatten if >10 → test with MXToolbox → monitor with DMARC reports
- **The DMARC Escalation Path**: p=none (2-4 weeks) → p=quarantine pct=10 → p=quarantine pct=100 → p=reject pct=10 → p=reject pct=100. Never skip steps.

### Tools to Reference

| Tool | Function | Pricing | Key Feature |
|------|----------|---------|-------------|
| MXToolbox SuperTool | DNS record validation | Free | Instant SPF/DKIM/DMARC check |
| mail-tester.com | Full deliverability score | Free (3/day) | 10-point deliverability score |
| dmarcian | DMARC monitoring + reporting | Free (1 domain) / $20/mo | Visual DMARC reports |
| Postmark DMARC | Weekly DMARC digest | Free | Simplest DMARC monitoring |
| EasyDMARC | DMARC deployment + monitoring | Free tier / $35.99/mo | Guided DMARC deployment |
| Google Admin Toolbox | Google-specific DNS check | Free | Validates Google Workspace config |

### Artifact Component

**SPF/DKIM/DMARC Configuration Template** — Copy-paste DNS records for Google Workspace + Instantly + Smartlead, with verification commands.

### Interactive Element

**DNS Config Coach:** Student pastes their current SPF/DKIM/DMARC records → AI parses and flags issues with concrete "copy this record" fixes. Deliverability Linter scores the configuration 0-100.

**Progressive Reveal:** Start with SPF basics, unlock DKIM after SPF passes validation, unlock DMARC after DKIM confirmed.

---

## LESSON 3: Microsoft Outlook: Why It's Harsher (50 min)

### Key Topics

1. **Microsoft's Unique Filtering Approach** — SmartScreen + sender reputation + content heuristics; different from Gmail's approach
2. **The Silent Filtering Problem** — Outlook routes to Junk without bouncing; you see "delivered" but recipient sees nothing
3. **Outlook's 2025 Sender Requirements** — SPF/DKIM/DMARC required for >5,000/day senders (matching Google); stricter content filtering for all
4. **Outlook-Specific Deliverability Challenges** — Aggressive link tracking, image blocking by default, plain-text preference
5. **Microsoft SNDS (Smart Network Data Services)** — Free reputation monitoring for Outlook, how to set up and interpret
6. **Outlook-Specific Optimization** — Shorter emails, fewer links, plain-text variants, warmup strategies specific to Microsoft

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Microsoft Outlook/Hotmail/Live holds ~28% of B2B email market | Litmus 2025 Email Client Market Share | Second only to Gmail in B2B |
| Outlook filters 58% of non-authenticated cold email silently | Validity / Return Path 2025 | "Delivered" ≠ "In inbox" |
| Microsoft announced DMARC/SPF/DKIM enforcement for 5K+ senders (May 2025) | Microsoft Tech Community Blog | Aligning with Google/Yahoo standards |
| Outlook Junk filter considers sender IP age; new IPs penalized heavily | Microsoft SNDS documentation | Domain warming critical for Outlook |
| Plain-text emails have 25% higher inbox placement in Outlook vs HTML | Validity 2024 Study | Outlook penalizes heavy HTML formatting |
| Outlook blocks tracking pixels more aggressively than Gmail | Litmus 2025 | Open rate tracking less reliable for Outlook recipients |

### Technical Details

**Microsoft's Enforcement Thresholds (2025):**
- SPF must pass for sending IP/domain
- DKIM must pass with alignment to "From" domain
- DMARC must be at minimum `p=none` (quarantine/reject preferred)
- Complaint rate: <0.1% target (same as Google)
- Applies to Outlook.com, Hotmail, Live.com domains
- Non-compliant mail → Junk folder (not rejected)

**Microsoft SNDS Setup:**
1. Register at https://sendersupport.olc.protection.outlook.com/snds/
2. Verify IP ownership via SMTP or DNS
3. Monitor: Green = good, Yellow = caution, Red = blocked
4. Check daily during warmup period

**Outlook-Specific Content Best Practices:**
- Maximum 1 link per email (excluding unsubscribe)
- No images in first 2 emails of a sequence
- Plain-text or minimal HTML (no tables, no CSS)
- Under 125 words for cold outreach
- No URL shorteners (bit.ly, t.ly flagged heavily)

### Frameworks & Models

- **The Outlook Delivery Audit**: Send test email → check SNDS → check GlockApps Outlook placement → if Junk: reduce links, switch to plain text, increase warmup
- **Gmail vs Outlook Strategy Split**: Gmail = optimistic filtering (less spam, more promo tab). Outlook = pessimistic filtering (more junk, silent drops). Always test both.

### Tools to Reference

| Tool | Function | Pricing | Key Feature |
|------|----------|---------|-------------|
| Microsoft SNDS | Outlook reputation monitoring | Free | Only way to see Outlook reputation |
| GlockApps | Inbox placement by provider | $59/mo | Shows Gmail vs Outlook vs Yahoo separately |
| Litmus | Email rendering + deliverability | $99/mo | Render testing across 90+ clients |
| MailReach | Warmup including Outlook seeds | $25/mo per inbox | Has Outlook-specific warmup seeds |

### Artifact Component

**Outlook-Specific Deliverability Checklist** — Configuration requirements, content rules, and monitoring setup specific to Microsoft's ecosystem.

### Interactive Element

**Comparison Builder:** Side-by-side comparison of Gmail, Yahoo, and Outlook requirements. Student identifies which rules apply to their sending setup.

**Deliverability Fire Drill (Outlook):** Simulation where Outlook open rates suddenly drop to 2%. Student must choose investigative steps (SNDS check, content audit, IP reputation) and apply fixes.

---

## LESSON 4: Domain Strategy: Main + 3-5 Sending Domains (55 min)

### Key Topics

1. **Never Send Cold Email from Your Main Domain** — Your primary domain is your brand; one spam complaint can destroy it
2. **The Sending Domain Architecture** — Main domain (website + inbound) + 3-5 cold outreach domains + optional 1-2 warmup domains
3. **Domain Naming Strategy** — Variations that look legitimate: `getacme.com`, `acmehq.com`, `tryacme.com`, `useacme.com`, `hiacme.com`
4. **Domain Age and Reputation** — New domains need 2-4 weeks before sending; aged domains (6+ months) get benefit of the doubt
5. **Domain Forwarding and Branding** — Redirect outreach domains to main site; matching branding builds legitimacy
6. **Domain Retirement and Rotation** — When to rest a domain (complaint spike), how long to rest (30-60 days), when to replace

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Sending cold email from your main domain risks 100% brand reputation | Industry consensus | One spam trap hit can blacklist your primary domain |
| New domains need minimum 14 days aging before first send | Instantly + Smartlead best practices | DNS propagation + initial reputation building |
| Domain reputation recovery takes 30-90 days after a spam incident | Google Postmaster data | Prevention >>> recovery |
| .com domains have highest trust score with email filters | Return Path 2024 | Avoid .io, .xyz, .co for cold outreach |
| Each sending domain should host 2-3 inboxes maximum | Instantly best practices | More inboxes per domain = higher risk |
| Cost per sending domain: ~$10-15/year (Namecheap/Cloudflare) | Domain registrar pricing | 5 domains = ~$50-75/year |
| Google Workspace: $7.20/user/month for sending inboxes | Google Workspace pricing 2025 | 3 inboxes × 5 domains = 15 inboxes × $7.20 = ~$108/mo |

### Technical Details

**Recommended Domain Architecture (200-400/day target):**

| Domain | Purpose | Inboxes | Daily Volume |
|--------|---------|---------|-------------|
| acme.com | Main (website, inbound, replies) | N/A | 0 cold |
| getacme.com | Cold outreach A | 3 | 90-150 |
| tryacme.com | Cold outreach B | 3 | 90-150 |
| hiacme.com | Cold outreach C | 3 | 90-150 |
| useacme.com | Backup / rotation | 2 | 60-100 (or resting) |
| **Total** | | **11-14 inboxes** | **270-450/day capacity** |

**Domain Purchase Checklist:**
1. Buy .com only (avoid .io, .xyz for cold outreach)
2. Register via Namecheap or Cloudflare ($10-15/year)
3. Set up Google Workspace ($7.20/user/month) or Outlook ($6/user/month)
4. Point MX records to email provider
5. Configure SPF, DKIM, DMARC (lesson 2 records)
6. Create website redirect to main domain
7. Add a basic landing page (even a single page adds legitimacy)
8. Wait 14+ days before first warmup send

### Frameworks & Models

- **The 3-5 Domain Rule**: Minimum 3 sending domains for redundancy. Maximum 5 to keep management sane. One always in rotation/rest.
- **The Domain Health Traffic Light**: Green = <0.05% complaints, good Postmaster score. Yellow = 0.05-0.1% complaints. Red = >0.1% complaints → pause immediately, rest 30-60 days.
- **Cost Math**: 4 domains × $12/year = $48. 12 inboxes × $7.20/mo = $86.40/mo. Total: ~$90/mo for complete sending infrastructure.

### Tools to Reference

| Tool | Function | Pricing | Key Feature |
|------|----------|---------|-------------|
| Namecheap | Domain registration | $10-15/year per .com | Cheapest .com registrar |
| Cloudflare Registrar | Domain registration | At-cost ($8-12/year) | No markup pricing |
| Google Workspace | Email hosting | $7.20/user/mo (Starter) | Best Gmail deliverability |
| Microsoft 365 | Email hosting | $6/user/mo (Basic) | Lower cost alternative |
| Instantly Domain Setup | Automated DNS config | Included in $37/mo | One-click domain setup guide |

### Artifact Component

**Multi-Domain Infrastructure Blueprint** — Complete domain map with naming, inbox allocation, volume targets, DNS records per domain, and cost breakdown.

### Interactive Element

**Template Builder:** Student enters their main domain → AI generates 5 sending domain name suggestions, inbox allocation plan, DNS record templates, and monthly cost estimate.

**Decision Tree:** "Should I use Google Workspace or Microsoft 365?" based on budget, existing setup, and target recipient demographics (Gmail-heavy vs Outlook-heavy industries).

---

## LESSON 5: DNS Setup Checklist (Step by Step) (50 min)

### Key Topics

1. **The Complete DNS Setup Sequence** — Step-by-step from domain purchase to first warmup email
2. **Registrar-Specific Instructions** — Namecheap, Cloudflare, GoDaddy DNS panel walkthroughs
3. **Email Provider Configuration** — Google Workspace and Microsoft 365 MX record setup
4. **SPF Record Creation** — Building the record for your specific sending stack
5. **DKIM Key Generation and Installation** — Provider-specific key generation and DNS record creation
6. **DMARC Record Deployment** — Initial monitoring policy → escalation plan
7. **Verification and Validation** — Using MXToolbox and mail-tester.com to confirm everything works

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| DNS propagation takes 15 minutes to 48 hours depending on TTL | DNS standards | Set TTL to 300 (5 min) during setup, increase to 3600 after |
| 94% of email authentication failures are configuration errors, not attacks | Valimail 2025 | Most failures = typos or missing records |
| Average solo founder completes DNS setup in 2-3 hours per domain | Course estimate | First domain takes longest; subsequent domains ~30 min each |
| Google Workspace MX records require 5 specific records in priority order | Google Workspace Admin Help | Missing one record = intermittent delivery failures |

### Technical Details

**Complete DNS Record Set Per Sending Domain:**

```
; MX Records (Google Workspace)
@ MX 1 aspmx.l.google.com.
@ MX 5 alt1.aspmx.l.google.com.
@ MX 5 alt2.aspmx.l.google.com.
@ MX 10 alt3.aspmx.l.google.com.
@ MX 10 alt4.aspmx.l.google.com.

; SPF Record
@ TXT "v=spf1 include:_spf.google.com include:servers.mcsv.net ~all"

; DKIM Record (example — actual key from Google Admin)
google._domainkey TXT "v=DKIM1; k=rsa; p=[YOUR_2048_BIT_KEY]"

; DMARC Record
_dmarc TXT "v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com; pct=100"

; Domain redirect (if using Cloudflare)
@ A [Cloudflare IP for redirect]
www CNAME yourdomain.com
```

**Step-by-Step Setup Sequence:**
1. Purchase domain (Namecheap/Cloudflare)
2. Point nameservers to Cloudflare (recommended for easy DNS management)
3. Add MX records for email provider
4. Verify MX propagation: `dig MX yourdomain.com`
5. Create Google Workspace account, add users
6. Generate DKIM key in Google Admin console
7. Add DKIM TXT record to DNS
8. Add SPF TXT record (include all sending services)
9. Add DMARC TXT record (p=none initially)
10. Test with MXToolbox + mail-tester.com
11. Set up domain redirect to main website
12. Wait 14 days minimum before warmup

### Tools to Reference

| Tool | Function | Pricing | Key Feature |
|------|----------|---------|-------------|
| Cloudflare | DNS management + redirect | Free (DNS) | Fastest DNS propagation |
| MXToolbox | Record validation | Free | Checks all record types |
| mail-tester.com | Full deliverability test | Free (3/day) | 10-point email score |
| Google Admin Console | DKIM key generation | Included in Workspace | One-click DKIM setup |
| whatsmydns.net | DNS propagation checker | Free | Shows propagation globally |

### Artifact Component

**DNS Setup Checklist** — Per-domain checklist with exact records to create, verification steps, and common error fixes.

### Interactive Element

**DNS Config Coach:** Student pastes their domain name → AI generates exact DNS records they need based on their email provider and sending tools. Deliverability Linter validates the records and flags issues.

**Timed Challenge:** Set up a complete DNS record set in under 15 minutes (simulated). System walks through each record type and validates in real-time.

---

## LESSON 6: Warmup Timelines & Safe Volume Ramps (50 min)

### Key Topics

1. **Why Warmup Is Non-Negotiable** — New inboxes have zero reputation; ISPs treat unknown senders as potential spam
2. **The 4-Week Warmup Protocol** — From 5/day to 30-50/day per inbox, with specific daily targets
3. **Warmup Tools and How They Work** — MailReach, Instantly's built-in warmup, Warmbox — peer-to-peer open/reply simulation
4. **Manual Warmup Supplements** — Subscribing to newsletters, replying to real emails, joining mailing lists
5. **Monitoring During Warmup** — Daily inbox placement checks, Google Postmaster score tracking
6. **Warmup Red Flags** — When to pause, when to restart, when to abandon a domain

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Start warmup at 5 emails/day per inbox | Instantly/Smartlead best practices | Lower = safer for new domains |
| Increase by 2-3 emails/day every 2-3 days | MailReach documentation | Aggressive ramp = reputation damage |
| Full warmup takes 3-4 weeks to reach 30-50/day per inbox | Industry consensus | Patience = long-term deliverability |
| Warmup emails should have 30-50% reply rate (simulated) | MailReach / Warmbox | High engagement signals build reputation |
| MailReach costs $25/month per inbox for warmup + monitoring | MailReach pricing 2025 | 12 inboxes = $300/mo during warmup (reduce after) |
| Instantly includes warmup in the $37/mo Growth plan (unlimited) | Instantly pricing 2025 | Best value if already using Instantly |
| Google Postmaster needs 100+ daily messages to show data | Google Postmaster Tools | May not show data during early warmup |

### Technical Details

**4-Week Warmup Schedule (Per Inbox):**

| Week | Daily Warmup Emails | Daily Cold Emails | Total/Day | Notes |
|------|--------------------|--------------------|-----------|-------|
| Week 1 (Days 1-7) | 5 → 10 | 0 | 5-10 | Warmup only, no cold |
| Week 2 (Days 8-14) | 10 → 20 | 3 → 5 | 13-25 | Start cold at minimal volume |
| Week 3 (Days 15-21) | 15 → 25 | 5 → 15 | 20-40 | Increase cold if placement holds |
| Week 4 (Days 22-28) | 20 → 30 | 15 → 30 | 35-60 | Approaching cruise speed |
| Cruise (Day 29+) | 15-20 (maintenance) | 30-50 | 45-70 | Keep warmup running indefinitely |

**Total System Ramp (12 inboxes across 4 domains):**

| Week | Per Inbox Cold | Total Cold/Day | Notes |
|------|---------------|----------------|-------|
| Week 1 | 0 | 0 | Warmup only |
| Week 2 | 3-5 | 36-60 | Testing only |
| Week 3 | 5-15 | 60-180 | Monitor closely |
| Week 4 | 15-30 | 180-360 | Approaching target |
| Cruise | 30-50 | 360-600 capacity | Target 200-400 actual |

**Warmup Tool Configuration:**
- Set warmup reply rate: 30-50%
- Enable warmup email pulling from spam (trains filter)
- Use professional-sounding warmup content (not random text)
- Keep warmup running even after reaching cruise speed (maintenance mode)

### Frameworks & Models

- **The "Reputation Bank" Metaphor**: Each positive interaction (open, reply, move-to-inbox) deposits reputation. Each negative (spam complaint, bounce, ignore) withdraws. Start with deposits before making withdrawals.
- **The 2-3-2 Ramp Rule**: Increase by 2-3 emails every 2 days. If inbox placement drops below 80%, freeze volume for 3 days.
- **Warmup ROI Math**: 4 weeks warmup × $300/mo warmup tools = ~$300 one-time cost. Vs starting cold and burning a domain = $90/domain + 14 days lost + reputation damage.

### Tools to Reference

| Tool | Function | Pricing | Key Feature |
|------|----------|---------|-------------|
| MailReach | Dedicated warmup + monitoring | $25/mo per inbox | Most reliable warmup |
| Instantly Warmup | Built-in warmup | Included in $37/mo | Unlimited inboxes |
| Smartlead Warmup | Built-in warmup | Included in $39/mo | Unlimited inboxes |
| Warmbox | Standalone warmup | $19/mo per inbox | Budget alternative |
| Lemwarm (Lemlist) | Warmup for Lemlist users | Included in $59/mo | Lemlist ecosystem |

### Artifact Component

**30-Day Warmup Schedule** — Per-inbox daily targets, monitoring checkpoints, go/no-go decision points, with Gantt-style visual timeline.

### Interactive Element

**Warmup Planner:** Student inputs number of domains, inboxes per domain, and target daily volume → AI generates a complete warmup schedule with daily targets and milestone checkpoints.

**Prediction Gate:** "After 2 weeks of warmup, your inbox placement for one domain drops to 65%. What do you do?" Student must choose the correct investigative and remediation steps before seeing the answer.

---

## LESSON 7: Inbox Rotation & Sending Limits (<500/day) (55 min)

### Key Topics

1. **The <500/day Total Rule** — Staying under aggregate daily limits across all inboxes to avoid triggering bulk sender flags
2. **Inbox Rotation Logic** — How Instantly/Smartlead distribute sends across inboxes; round-robin vs smart rotation
3. **Per-Inbox Limits** — 30-50 cold emails/day per inbox (Google Workspace: official limit 500/day, safe limit 50 for cold)
4. **Sending Windows** — Optimal send times by timezone, spreading across 8am-2pm recipient local time
5. **Weekend and Holiday Patterns** — Lower volume on weekends, skip major holidays, Monday morning surge avoidance
6. **Reply Management** — Centralized reply inbox vs distributed; using a shared inbox for team review

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Google Workspace official sending limit: 500/day per user | Google Workspace Admin Help | But safe cold email limit is 30-50/day |
| Microsoft 365 sending limit: 10,000/day per user | Microsoft 365 documentation | Safe cold limit: 30-50/day |
| Optimal B2B send times: Tuesday-Thursday, 8am-11am recipient time | Mailchimp / HubSpot studies | 23% higher open rates vs off-hours |
| Sending more than 50 cold emails/day from one inbox: 3x spam risk | Instantly data (2025) | Spreading across inboxes is essential |
| Reply rates peak within 30 minutes of send time | Yesware data | Suggests sending during business hours |
| Inbox rotation in Instantly/Smartlead adds 15-30 second delays between sends | Platform documentation | Mimics human sending patterns |

### Technical Details

**Recommended Sending Configuration:**

| Setting | Value | Rationale |
|---------|-------|-----------|
| Max per inbox/day | 30-50 | Stay well under provider limits |
| Delay between emails | 90-300 seconds | Mimics human sending |
| Daily sending window | 8am-2pm recipient TZ | Business hours only |
| Weekend sends | Off or 50% volume | Lower engagement, higher risk |
| Inbox rotation | Round-robin or smart | Distribute evenly |
| Total daily target | 200-400 | Across all inboxes |

**Instantly Configuration Example (12 inboxes):**
- Campaign 1 (ICP Segment A): 6 inboxes, 30/day each = 180/day
- Campaign 2 (ICP Segment B): 4 inboxes, 30/day each = 120/day
- Reserve: 2 inboxes in warmup/rotation
- Total: ~300/day with headroom

**Reply Handling Architecture:**
- All inboxes forward replies to one central inbox (HubSpot or shared Gmail)
- Auto-label by sending domain
- AI categorizes: Interested / Not Interested / OOO / Bounce / Unsubscribe
- Interested → Founder notification (Slack/email) within 5 minutes

### Frameworks & Models

- **The 70% Rule**: Never run inboxes above 70% of their safe daily limit (30-50). If safe limit is 50, target 35/day for safety margin.
- **The Rotation Calendar**: Every 4th week, rest one domain entirely while another comes off warmup. Continuous rotation prevents reputation fatigue.
- **Reply Speed Priority**: Interested replies answered within 1 hour (personal). All other categories handled within 24 hours (can automate).

### Tools to Reference

| Tool | Function | Pricing | Key Feature |
|------|----------|---------|-------------|
| Instantly.ai | Inbox rotation + sending | $37/mo (Growth) | Unlimited inboxes, smart rotation |
| Smartlead.ai | Inbox rotation + sending | $39/mo (Basic) | Unlimited inboxes |
| Lemlist | Multi-channel + sending | $59/mo (Email Pro) | Built-in rotation |
| HubSpot CRM Free | Centralized reply inbox | Free | Shared inbox for replies |

### Artifact Component

**Inbox Rotation Plan** — Visual map of inbox allocation, daily volume targets, rotation schedule, and reply routing architecture.

### Interactive Element

**Scenario Simulator:** Student adjusts number of inboxes, volume per inbox, and sending windows → see projected daily capacity, risk level, and estimated cost. System flags if configuration exceeds safe thresholds.

**Classify Exercise:** Given 10 inbox configurations, classify each as "Safe," "Risky," or "Dangerous" based on volume, rotation, and send patterns.

---

## LESSON 8: Content Patterns That Trigger Filters in 2026 (50 min)

### Key Topics

1. **Spam Trigger Words and Phrases** — Updated 2026 list: "guaranteed," "act now," "limited time," "free trial," etc.
2. **Formatting Red Flags** — Excessive capitalization, multiple exclamation marks, colored text, large images
3. **Link Hygiene** — URL shorteners flagged, tracking domains flagged, too many links, unrecognized domains
4. **The HTML vs Plain Text Decision** — When to use each; cold email should always be plain text or minimal HTML
5. **Personalization Variables and Spam** — Over-reliance on merge tags can trigger filters; {first_name} alone is not enough
6. **AI-Generated Content Detection** — ISPs and email providers beginning to detect AI writing patterns; implications for cold email

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Emails with >2 links have 50% higher spam placement rate | Validity 2025 | Keep cold emails to 0-1 links |
| URL shorteners (bit.ly, t.ly) increase spam score by 15-30% | SpamAssassin documentation | Spammers use shorteners to hide destinations |
| Plain-text emails have 25% higher inbox placement vs HTML in cold outreach | Validity 2024 | HTML signals "marketing" to filters |
| Emails under 125 words have highest reply rates for cold outreach | Instantly 2025 data analysis | Short = personal = inbox |
| Exclamation marks (>1 per email) increase spam score | SpamAssassin rules | Even one "!!!" can trigger |
| Images in first cold email reduce inbox placement by 20-35% | Lemlist 2025 study | Save images for follow-ups after engagement |
| Tracking pixels flagged by Outlook; open rate data becomes less reliable | Microsoft 2025 privacy features | Apple already does this with Mail Privacy Protection |

### Technical Details

**2026 Spam Trigger Categories:**

**Category 1: High-Risk Words (avoid completely in cold email)**
- "Guaranteed results," "Act now," "Limited time offer"
- "Free," "No cost," "Zero risk"
- "Click here," "Buy now," "Order today"
- "Congratulations," "You've been selected," "Winner"

**Category 2: Medium-Risk Patterns (use sparingly)**
- Dollar amounts ("Save $500")
- Percentage claims ("300% ROI")
- Urgency language ("Only 3 spots left")
- Questions in subject lines (overused)

**Category 3: Formatting Triggers**
- ALL CAPS (even one word in subject)
- Multiple exclamation/question marks
- Colored or bold text (in HTML emails)
- Large font sizes
- Hidden text or white-on-white

**Category 4: Technical Triggers**
- URL shorteners (bit.ly, t.ly, goo.gl)
- Custom tracking domains not authenticated
- Mismatched display name and from address
- Missing physical address (CAN-SPAM)
- Missing unsubscribe link

**Safe Cold Email Template:**
```
Subject: [Personalized, no spam words, <60 chars]

Hi {first_name},

[1-2 sentences showing you researched them — specific, not generic]

[1 sentence about the problem you solve — no claims or percentages]

[1 sentence CTA — question, not command]

Best,
{your_name}
{your_title}
{company} | {website}
```

### Frameworks & Models

- **The SPAM Score Audit**: Before sending any campaign, run through SpamAssassin (open source), mail-tester.com, or GlockApps content test. Target score <2.0 (SpamAssassin) or 9+/10 (mail-tester).
- **The "Would a Human Write This?" Test**: Read the email aloud. If it sounds like a mass email, rewrite it. If it could only apply to this specific person, you're safe.
- **The Link Budget**: Cold email #1 = 0 links (reply-only CTA). Email #2 = 1 link maximum. Email #3+ = 1 link + unsubscribe.

### Tools to Reference

| Tool | Function | Pricing | Key Feature |
|------|----------|---------|-------------|
| mail-tester.com | Content spam score | Free (3/day) | Instant content analysis |
| GlockApps | Content + placement testing | $59/mo | Per-provider placement |
| SpamAssassin | Open-source spam scoring | Free | Industry standard rules |
| Hemingway Editor | Readability checker | Free (web) | Keeps copy simple |
| Instantly AI Writer | Spam-safe copy generation | Included $37/mo | Trained on deliverable emails |

### Artifact Component

**Content Safety Checklist** — Pre-send content audit template with 25-point checklist covering words, formatting, links, and technical elements.

### Interactive Element

**"Spam vs. Smart" Game:** Student sees 10 anonymized email sequences. Must classify each as "Inbox-safe" or "Spam-risky" and explain why. AI reveals deliverability scores and explains filter triggers.

**Linter Feedback:** Student pastes their draft email → Deliverability Linter scores it and highlights specific spam triggers with suggested rewrites.

---

## LESSON 9: Monitoring & Troubleshooting (GlockApps, MailReach) (50 min)

### Key Topics

1. **The Monitoring Stack** — What to monitor, how often, and which tools for each signal
2. **Google Postmaster Tools Deep Dive** — Domain reputation, IP reputation, spam rate, authentication, encryption
3. **GlockApps: Inbox Placement Testing** — Sending test emails to seed accounts across Gmail, Outlook, Yahoo; interpreting results
4. **MailReach: Continuous Monitoring** — Real-time deliverability scoring per inbox; trend alerts
5. **MXToolbox: Blacklist Monitoring** — Checking 100+ blacklists; what to do when listed
6. **The Daily/Weekly Monitoring Rhythm** — What to check and when; building a 15-minute daily routine

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| GlockApps tests placement across 30+ seed accounts per provider | GlockApps documentation | Most comprehensive placement testing |
| MailReach provides per-inbox deliverability scores updated hourly | MailReach documentation | Early warning for reputation drops |
| MXToolbox checks 100+ known blacklists simultaneously | MXToolbox Free | Instant blacklist status check |
| Google Postmaster requires 100+ daily emails to show reputation data | Google Postmaster Tools | May not work during early warmup |
| Blacklist removal takes 24 hours to 14 days depending on the list | Blacklist operator policies | Spamhaus = days; SORBS = weeks |
| 74% of deliverability issues are caught within 48 hours with daily monitoring | Email deliverability practitioners | Without monitoring, issues compound for weeks |

### Technical Details

**Daily Monitoring Checklist (15 min/day):**

| Check | Tool | Frequency | Action Threshold |
|-------|------|-----------|-----------------|
| Inbox placement score | MailReach | Daily | <90% = investigate |
| Bounce rate per campaign | Instantly/Smartlead | Daily | >3% = pause + clean list |
| Spam complaint rate | Google Postmaster | Daily | >0.05% = reduce volume |
| Blacklist status | MXToolbox | Daily | Any listing = immediate action |
| Reply rate | Instantly/Smartlead | Daily | <1% after 500 sends = content issue |
| Domain reputation | Google Postmaster | Daily | Drop from High/Medium = investigate |

**Weekly Monitoring Checklist (30 min/week):**

| Check | Tool | Action |
|-------|------|--------|
| GlockApps placement test | GlockApps | Send test to all seed accounts |
| DMARC reports review | Postmark/dmarcian | Check for unauthorized senders |
| Warmup health | MailReach/Instantly | Confirm warmup engagement rates |
| Volume trending | Spreadsheet | Track sends, opens, replies weekly |
| Competitive inbox check | GlockApps | Test if competitors are also hitting spam |

**Key Metric Thresholds:**

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| Inbox placement | >90% | 70-90% | <70% |
| Spam complaint rate | <0.05% | 0.05-0.1% | >0.1% |
| Bounce rate | <2% | 2-5% | >5% |
| DKIM pass rate | >99% | 95-99% | <95% |
| Domain reputation (Postmaster) | High | Medium | Low/Bad |

### Tools to Reference

| Tool | Function | Pricing | Monitoring Frequency |
|------|----------|---------|---------------------|
| GlockApps | Inbox placement testing | $59/mo (Basic: 2 tests/day) | 1-2x per week |
| MailReach | Per-inbox monitoring | $25/mo per inbox | Continuous (hourly) |
| Google Postmaster | Gmail reputation | Free | Daily |
| Microsoft SNDS | Outlook reputation | Free | Daily |
| MXToolbox | Blacklist + DNS monitoring | Free (manual) / $129/mo (alerts) | Daily (manual) or continuous |
| Postmark DMARC | DMARC report digests | Free | Weekly |
| dmarcian | DMARC analytics | Free (1 domain) / $20/mo | Weekly |

### Artifact Component

**Monitoring Dashboard Template** — Spreadsheet/Notion template with daily and weekly monitoring checklist, metric thresholds, and alert triggers.

### Interactive Element

**Deliverability Fire Drill:** Simulation where open rates suddenly drop across all campaigns. Student must choose the correct investigative sequence: (1) Check Postmaster, (2) Run GlockApps test, (3) Check blacklists, (4) Review DMARC reports, (5) Audit content. System reveals the root cause and scores the diagnostic approach.

**Progressive Reveal:** Start with basic monitoring setup, unlock advanced diagnostics after completing the monitoring rhythm for simulated 7 days.

---

## LESSON 10: Incident Playbook: When a Domain Hits Spam (50 min)

### Key Topics

1. **Incident Detection** — How to recognize a domain has been compromised (sudden open rate drop, GlockApps red, blacklist listing)
2. **The 4-Step Incident Response** — Pause → Diagnose → Fix → Recover
3. **Blacklist Removal Process** — Finding which list, submitting delisting requests, wait times
4. **Domain Quarantine** — When to pause a domain vs retire it permanently
5. **Volume Redistribution** — Shifting load to healthy domains during recovery
6. **Post-Incident Review** — Root cause analysis to prevent recurrence

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| Domain reputation recovery takes 30-90 days after a spam incident | Google Postmaster data | Faster recovery if caught early |
| Spamhaus removal: submit delisting → typically 24-48 hours | Spamhaus documentation | Most impactful blacklist |
| SORBS removal can take 2-4 weeks | SORBS documentation | Slower; consider domain replacement |
| Barracuda removal: automatic after 12 hours of clean behavior | Barracuda documentation | Fastest recovery |
| 72% of spam incidents traced to list quality (invalid emails, spam traps) | Return Path data | Prevention = verification |
| Domains with DMARC p=reject recover 2x faster than p=none | Agari data | DMARC protects your reputation |

### Technical Details

**The 4-Step Incident Response Protocol:**

**Step 1: PAUSE (Immediate — within 30 minutes of detection)**
- Stop all campaigns on affected domain
- Keep warmup running (maintains some positive engagement)
- Notify team if applicable
- Document: date, time, symptoms, affected campaigns

**Step 2: DIAGNOSE (Within 2 hours)**
- Check Google Postmaster: domain reputation, spam rate
- Check MXToolbox: blacklist scan (all 100+ lists)
- Check GlockApps: provider-specific placement
- Check DMARC reports: unauthorized senders?
- Review recent campaigns: content changes? List source changes? Volume spike?
- Common root causes:
  - Bad list segment (spam traps)
  - Volume spike (too fast ramp)
  - Content trigger (new template)
  - Blacklist hit (spam trap or complaint)
  - Authentication failure (DNS change broke SPF/DKIM)

**Step 3: FIX (Within 24 hours)**
- If blacklisted: submit delisting request
- If content triggered: revert to last known good template
- If list quality: remove segment, re-verify all emails (MillionVerifier/ZeroBounce)
- If authentication broke: fix DNS records, validate with MXToolbox
- If volume spike: reduce to 50% of pre-incident volume

**Step 4: RECOVER (Days 2-30+)**
- Keep domain paused from cold sending for minimum 7 days
- Continue warmup at reduced volume (50%)
- After 7 days: GlockApps test. If >80% inbox → cautious restart at 25% volume
- Increase by 25% per week until back to full volume
- Monitor daily for 30 days post-incident
- If no recovery after 30 days: retire domain, start new one

**Volume Redistribution During Recovery:**

| Scenario | Action |
|----------|--------|
| 1 of 4 domains down | Redistribute to 3 remaining (max +33% each) |
| 2 of 4 domains down | Reduce total volume 50%; activate backup domain |
| 3+ domains down | Pause all cold outreach; full infrastructure audit |

### Frameworks & Models

- **The Incident Severity Matrix**: Severity 1 (one domain, one provider) → local fix. Severity 2 (one domain, all providers) → domain quarantine. Severity 3 (multiple domains) → full infrastructure audit + pause.
- **The 30-60-90 Recovery Timeline**: Day 1-30: quarantine + warmup. Day 31-60: gradual volume ramp. Day 61-90: back to full capacity with enhanced monitoring.
- **Root Cause Categories**: List (40% of incidents), Content (25%), Volume (20%), Technical (15%).

### Tools to Reference

| Tool | Function | Pricing | Key Feature |
|------|----------|---------|-------------|
| MXToolbox Blacklist Check | Multi-blacklist scan | Free | Checks 100+ blacklists |
| Spamhaus | Major blacklist + delisting | Free (delisting) | Most impactful blacklist |
| GlockApps | Post-incident placement test | $59/mo | Per-provider results |
| MillionVerifier | Emergency list re-verification | ~$37 per 10K emails | Catch spam traps |
| ZeroBounce | List verification + scoring | $40 per 5K emails | Spam trap detection |

### Artifact Component

**Incident Response Playbook** — Step-by-step runbook for detection, diagnosis, fix, and recovery with decision trees and timeline templates.

### Interactive Element

**Deliverability Fire Drill (Extended):** Multi-step simulation where student works through a complete incident from detection to recovery. AI presents evolving symptoms; student must make correct decisions at each stage. Scored on speed, accuracy, and completeness.

**Concept Reframe:** "A spam incident is not a failure — it's a signal. Every solo founder will experience this. The difference is whether you have a playbook." Reframes the student's mindset from panic to process.

---

## LESSON 11: B2B vs Creator Infra Templates (50 min)

### Key Topics

1. **B2B Cold Outreach Infrastructure** — Multi-domain, high-volume, Instantly/Smartlead focus, formal tone
2. **Creator Warm Outreach Infrastructure** — Fewer domains, lower volume, ConvertKit/Mailchimp focus, personal tone
3. **Hybrid Infrastructure** — Creators doing B2B outreach (common in coaching/consulting)
4. **Newsletter vs Cold Email** — Different infrastructure requirements; newsletter from main domain, cold from sending domains
5. **Template Selection Guide** — Decision framework for choosing the right infrastructure setup
6. **Cost Comparison by Context** — B2B full stack vs Creator minimal vs Hybrid

### Data Points & Statistics

| Statistic | Source | Context |
|-----------|--------|---------|
| B2B cold outreach requires 3-5 sending domains for 200-400/day | Industry best practices | Creator warm outreach needs 1-2 |
| Creator newsletters average 30-50% open rates (warm audience) | ConvertKit benchmarks | vs B2B cold: 40-60% open, 5-15% reply |
| Creators sending cold DM-to-email bridges need similar infra to B2B | Industry observation | Hybrid is increasingly common |
| ConvertKit pricing: Free (1K subs) / $29/mo (1K subs, automation) | ConvertKit 2025 | Best for creators |
| Mailchimp pricing: Free (500 contacts) / $13/mo (500, automation) | Mailchimp 2025 | Good for small lists |

### Technical Details

**B2B Cold Outreach Template (~$130/mo):**

| Component | Tool | Cost | Purpose |
|-----------|------|------|---------|
| 4 sending domains | Namecheap | ~$48/year ($4/mo) | Domain protection |
| 12 inboxes | Google Workspace | $86.40/mo | Sending infrastructure |
| Sending platform | Instantly Growth | $37/mo | Sequences + rotation |
| Warmup | Instantly (included) | $0 | Included in plan |
| Monitoring | GlockApps Basic | $59/mo | Inbox placement |
| Verification | MillionVerifier | ~$4/mo (amortized) | List hygiene |
| **Total** | | **~$190/mo** | |

**Creator Warm Outreach Template (~$50/mo):**

| Component | Tool | Cost | Purpose |
|-----------|------|------|---------|
| 1 sending domain | Namecheap | ~$12/year ($1/mo) | Separate from main |
| 1-2 inboxes | Google Workspace | $7.20-14.40/mo | Warm outreach |
| Newsletter | ConvertKit | $29/mo | Warm audience nurture |
| Monitoring | mail-tester.com | Free | Spot checks |
| **Total** | | **~$50/mo** | |

**Hybrid Template (~$160/mo):**

| Component | Tool | Cost | Purpose |
|-----------|------|------|---------|
| 3 sending domains | Namecheap | ~$36/year ($3/mo) | Cold outreach |
| 9 inboxes | Google Workspace | $64.80/mo | Cold sending |
| Sending platform | Instantly Growth | $37/mo | Cold sequences |
| Newsletter | ConvertKit | $29/mo | Warm audience |
| Warmup | Instantly (included) | $0 | Included |
| Monitoring | GlockApps Basic | $59/mo | Inbox placement |
| **Total** | | **~$193/mo** | |

### Frameworks & Models

- **The Context-Infrastructure Decision Tree**:
  1. Are you sending cold outreach to strangers? → Yes: B2B template. No: Creator template.
  2. Are you also nurturing a warm audience? → Yes: Add newsletter layer.
  3. Are you doing both cold + warm? → Hybrid template.
  4. What's your daily volume? → <50: Creator. 50-200: Light B2B. 200-400: Full B2B.

### Tools to Reference

| Tool | B2B | Creator | Hybrid | Pricing |
|------|-----|---------|--------|---------|
| Instantly | Yes | No | Yes | $37/mo |
| Smartlead | Yes | No | Yes | $39/mo |
| ConvertKit | No | Yes | Yes | Free / $29/mo |
| Mailchimp | No | Yes | Yes | Free / $13/mo |
| GlockApps | Yes | Optional | Yes | $59/mo |
| MailReach | Yes | Optional | Yes | $25/mo per inbox |

### Artifact Component

**Context-Specific Infrastructure Template** — Complete setup guide based on student's context (B2B, Creator, or Hybrid) with tool selection, domain plan, and cost breakdown.

### Interactive Element

**Decision Tree:** Student answers 5 questions about their business → AI recommends the right infrastructure template with specific tool selections and cost breakdown.

**Strategy Duel:** Present B2B vs Creator infrastructure for the student's specific context. Student picks one, justifies the choice, and AI provides feedback on the decision.

---

## LESSON 12: Your Deliverability Checklist (45 min)

### Key Topics

1. **Complete Infrastructure Audit** — All 11 lessons compiled into one comprehensive checklist
2. **The Deliverability Score Card** — Self-assessment tool for current infrastructure health
3. **Implementation Sprint (7-14 Days)** — Day-by-day setup plan from domain purchase to first campaign
4. **Ongoing Maintenance Rhythm** — Daily (5 min), weekly (30 min), monthly (2 hr) maintenance routines
5. **The 90-Day Calibration Plan** — Post-launch optimization schedule
6. **Future-Proofing** — Preparing for 2027 changes (predicted: AI-based reputation, sender verification standards)

### Technical Details

**7-14 Day Implementation Sprint:**

| Day | Activity | Output | Time |
|-----|----------|--------|------|
| Day 1 | Purchase 3-5 domains + Google Workspace | Domains registered, inboxes created | 2 hrs |
| Day 2 | Configure DNS (SPF/DKIM/DMARC) for all domains | All records live, validated with MXToolbox | 3 hrs |
| Day 3 | Set up monitoring (Postmaster, GlockApps, MXToolbox) | Monitoring dashboard active | 1 hr |
| Day 4 | Configure warmup (MailReach or Instantly) | Warmup running on all inboxes | 1 hr |
| Day 5-7 | Warmup runs; prepare first campaign content | Content ready, Deliverability Linter passed | 2 hrs |
| Day 8-14 | Begin cold sends at 3-5/inbox/day alongside warmup | First responses arriving | 30 min/day |
| Day 15-28 | Ramp volume per warmup schedule | Approaching cruise speed | 15 min/day |
| Day 29+ | Full cruise speed (200-400/day) | Monitoring rhythm established | 15 min/day |

**Master Deliverability Checklist (25 items):**

1. [ ] 3-5 sending domains purchased (.com only)
2. [ ] Google Workspace/M365 set up on each domain
3. [ ] 2-3 inboxes per sending domain created
4. [ ] SPF record configured per domain
5. [ ] DKIM 2048-bit key generated and installed per domain
6. [ ] DMARC record added (p=none initially) per domain
7. [ ] MXToolbox validation passed for all domains
8. [ ] mail-tester.com score >8/10 for test emails
9. [ ] Domain redirect to main website configured
10. [ ] Google Postmaster Tools verified for each domain
11. [ ] Microsoft SNDS registered for sending IPs
12. [ ] GlockApps account set up with seed lists
13. [ ] Warmup tool configured (30-50% reply rate target)
14. [ ] Warmup running for 14+ days before first cold send
15. [ ] Sending platform (Instantly/Smartlead) connected
16. [ ] Inbox rotation configured (round-robin or smart)
17. [ ] Daily volume limits set (30-50/inbox)
18. [ ] Sending windows configured (8am-2pm recipient TZ)
19. [ ] First campaign content linted for spam triggers
20. [ ] Unsubscribe link/mechanism included
21. [ ] Physical address included (CAN-SPAM)
22. [ ] Reply handling system configured
23. [ ] Daily monitoring checklist in place (15 min/day)
24. [ ] Weekly monitoring checklist in place (30 min/week)
25. [ ] Incident response playbook documented

**5-Metric Dashboard:**
1. Inbox Placement Rate (target: >90%)
2. Spam Complaint Rate (target: <0.05%)
3. Bounce Rate (target: <2%)
4. Domain Reputation Score (target: High on Postmaster)
5. Blacklist Status (target: 0 listings)

### Frameworks & Models

- **The Infrastructure Maturity Model**: Level 1 (Basic): 1 domain, manual checks. Level 2 (Standard): 3-5 domains, daily monitoring, warmup tools. Level 3 (Advanced): Automated monitoring, incident playbooks, rotation schedules. Solo founders should target Level 2.
- **The 15/30/120 Maintenance Rule**: 15 minutes daily (check dashboards), 30 minutes weekly (GlockApps test + DMARC review), 120 minutes monthly (full audit + domain rotation review).

### Artifact Component

**Multi-Domain Infra Blueprint + Monitoring Dashboard** (Primary Course Artifact) — Compiles all 12 lesson artifacts into one comprehensive infrastructure document: domain map, DNS records, warmup schedule, rotation plan, monitoring dashboard, incident playbook, and maintenance rhythm.

### Interactive Element

**Implementation Sprint Launcher:** AI generates a personalized 14-day sprint calendar based on student's context (B2B/Creator/Hybrid), domain count, and target volume. Daily check-ins; Day 7 and Day 14 reviews with Deliverability Linter validation.

**Mini Assessment:** 15-question assessment covering all course concepts — DNS configuration, warmup protocols, monitoring thresholds, incident response. Must score 80%+ to complete course.

---

## TOOL PRICING SUMMARY

### Tier 1: Essential (~$95/mo)
Instantly Growth ($37) + Google Workspace 3 inboxes ($21.60) + 3 domains ($3/mo amortized) + MXToolbox Free + Google Postmaster Free + mail-tester.com Free + Postmark DMARC Free

### Tier 2: Recommended (~$190/mo)
Tier 1 expanded: 4 domains + 12 inboxes ($86.40) + Instantly Growth ($37) + GlockApps Basic ($59) + MillionVerifier (~$4/mo amortized) + monitoring tools (Free)

### Tier 3: Maximum Coverage (~$240/mo)
Tier 2 + MailReach for 4 priority inboxes ($100) + dmarcian ($20)

### Always-Free Tools
Google Postmaster Tools, Microsoft SNDS, MXToolbox (basic), mail-tester.com (3/day), Postmark DMARC, whatsmydns.net, SpamAssassin (self-hosted)

---

## KEY THRESHOLDS REFERENCE

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Spam complaint rate | <0.05% | 0.05-0.1% | >0.1% (Google blocks at 0.3%) |
| Bounce rate | <2% | 2-3% | >5% |
| Inbox placement | >90% | 70-90% | <70% |
| Warmup start | 5/day/inbox | — | Never start higher |
| Cruise speed per inbox | 30-50/day | — | >50 = risky |
| Total daily sends | 200-400 | — | >500 = bulk sender territory |
| Domain warmup period | 14-28 days | — | <14 days = insufficient |
| DKIM key size | 2048-bit | — | 1024-bit deprecated |
| SPF DNS lookups | <10 | 8-9 | 10+ = permanent fail |

---

## ALL ARTIFACTS CREATED

1. 2025-2026 Compliance Checklist (L1)
2. SPF/DKIM/DMARC Configuration Template (L2)
3. Outlook-Specific Deliverability Checklist (L3)
4. Multi-Domain Infrastructure Blueprint (L4)
5. DNS Setup Checklist (L5)
6. 30-Day Warmup Schedule (L6)
7. Inbox Rotation Plan (L7)
8. Content Safety Checklist (L8)
9. Monitoring Dashboard Template (L9)
10. Incident Response Playbook (L10)
11. Context-Specific Infrastructure Template (L11)
12. Multi-Domain Infra Blueprint + Monitoring Dashboard (L12) — compiles all above

**Completion Badge:** "Deliverability Architect" — 250 XP