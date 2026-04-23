---
title: "Gmail & Yahoo Requirements (SPF/DKIM/DMARC)"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 2
---

# Gmail & Yahoo Requirements (SPF/DKIM/DMARC)

## The $40K Email That Never Arrived

Sarah had just closed her biggest deal yet — a $40K annual contract with a mid-market SaaS company. The client signed on Friday. On Monday morning, she sent the onboarding email with login credentials, implementation timeline, and her personal cell number.

The client never received it.

Tuesday: "Hey, did you get my email?" Silence.

Wednesday: She called. "Oh, we never got anything. Check your spam folder?"

It wasn't in spam. It wasn't anywhere. Microsoft Outlook had silently filtered it into the void — no bounce, no notification, nothing. Her sending domain had zero authentication records. To Outlook's filters, she looked identical to a Nigerian prince.

She lost 6 hours rebuilding trust, resending via a personal Gmail account, and explaining why her "professional" email system had failed at the worst possible moment.

**The lesson:** Authentication isn't optional anymore. It's the difference between "delivered" and "actually received."

---

## Why February 2024 Changed Everything

<InsightCard icon="🚨" title="The Enforcement Inflection Point">
Google and Yahoo simultaneously announced that starting February 1, 2024, all bulk senders (5,000+ emails/day) MUST have SPF, DKIM, and DMARC configured. Non-compliant senders would be rejected or sent to spam automatically.

Microsoft followed in May 2025 with identical requirements.

This wasn't a suggestion. It was a hard cutoff.
</InsightCard>

Even if you're sending 200-400 emails/day (well below the 5,000 threshold), **you still need full authentication**. Here's why:

1. **Reputation is shared across volume tiers** — ISPs don't separate "small sender" and "bulk sender" reputation pools
2. **Silent filtering is worse than rejection** — Your emails vanish without bounces; you never know you're in spam
3. **One complaint can cascade** — A single spam report from an authenticated domain is forgiven; from an unauthenticated domain, it's a red flag

<RangeSlider 
  label="How confident are you that your current email setup is fully authenticated?" 
  min={1} 
  max={10} 
  lowLabel="No idea" 
  highLabel="100% certain" 
  persistKey="email-deliverability-L2-auth-confidence" 
/>

---

## The Three-Layer Authentication Stack

Think of email authentication like airport security:

- **SPF** = Your boarding pass (proves you're allowed to send from this domain)
- **DKIM** = Your passport (proves the message hasn't been tampered with)
- **DMARC** = The TSA checkpoint (tells ISPs what to do if SPF or DKIM fail)

All three are required. Missing even one layer means your emails are treated as suspicious.

<FlipCard 
  front="What does SPF actually do?" 
  back="SPF (Sender Policy Framework) is a DNS record that lists which mail servers are authorized to send email on behalf of your domain. If an email comes from an unauthorized server, it fails SPF and gets flagged." 
/>

<FlipCard 
  front="What does DKIM actually do?" 
  back="DKIM (DomainKeys Identified Mail) adds a cryptographic signature to your emails. The receiving server checks this signature against a public key in your DNS. If they match, the email hasn't been altered in transit." 
/>

<FlipCard 
  front="What does DMARC actually do?" 
  back="DMARC (Domain-based Message Authentication, Reporting and Conformance) tells receiving servers what to do when SPF or DKIM fail: deliver anyway (p=none), quarantine (p=quarantine), or reject (p=reject). It also sends you reports about authentication failures." 
/>

---

## SPF: Who Can Send Email for Your Domain

### The Basics

SPF is a single TXT record in your DNS that looks like this:

```
v=spf1 include:_spf.google.com include:sendgrid.net ~all
```

Let's decode it:

- `v=spf1` — SPF version 1 (the only version)
- `include:_spf.google.com` — Google Workspace is authorized to send for this domain
- `include:sendgrid.net` — SendGrid is authorized to send for this domain
- `~all` — Softfail everything else (treat unauthorized senders as suspicious but don't reject)

### The 10-Lookup Limit (The Hidden Trap)

Here's where most people break SPF without realizing it: **SPF has a maximum of 10 DNS lookups**. Each `include:` statement triggers at least one lookup, and some services (like Salesforce) trigger multiple nested lookups.

<ExampleCard label="Real-World SPF Failure">
A founder using Google Workspace + Instantly + Smartlead + Mailchimp + HubSpot ended up with 14 DNS lookups. Their SPF record was technically invalid, causing 30% of their emails to fail authentication.

They didn't know until they ran an SPF checker and saw "PermError: Too many DNS lookups."
</ExampleCard>

**Solution:** SPF flattening. Tools like [AutoSPF](https://autospf.com) or [dmarcian](https://dmarcian.com) can flatten your SPF record by replacing `include:` statements with the actual IP addresses, reducing lookup count.

<InsightCard icon="⚠️" title="Common SPF Mistakes">
1. **Multiple SPF records** — You can only have ONE SPF record per domain. Two records = both are ignored.
2. **Using `-all` too early** — Start with `~all` (softfail) during setup, then switch to `-all` (hardfail) after validation.
3. **Forgetting to update SPF when adding tools** — Every new sending service needs to be added to your SPF record.
</InsightCard>

### Your SPF Setup Checklist

<InteractiveChecklist 
  title="SPF Configuration Steps" 
  persistKey="email-deliverability-L2-spf-checklist" 
  items={[
    "List all services that send email as your domain (Google Workspace, Instantly, Smartlead, etc.)",
    "Build your SPF record with all necessary include: statements",
    "Check DNS lookup count using MXToolbox SPF checker",
    "If >10 lookups, flatten your SPF record using AutoSPF or dmarcian",
    "Add SPF record to your DNS (one TXT record at the root domain)",
    "Wait 15-60 minutes for DNS propagation",
    "Verify with MXToolbox: https://mxtoolbox.com/spf.aspx",
    "Send a test email to mail-tester.com and confirm SPF passes"
  ]} 
/>

---

## DKIM: Cryptographic Proof Your Email Is Authentic

### How DKIM Works

DKIM adds an invisible signature to every email you send. The receiving server checks this signature against a public key stored in your DNS. If they match, the email is verified as authentic and unaltered.

**The process:**

1. Your email provider (Google Workspace, Instantly, etc.) generates a **private key** (kept secret)
2. You publish the corresponding **public key** in your DNS as a TXT record
3. Every outbound email gets signed with the private key
4. Receiving servers verify the signature using your public key

<FlipCard 
  front="Why 2048-bit keys?" 
  back="Google deprecated 1024-bit DKIM keys in 2024 because they're vulnerable to modern computing power. 2048-bit keys are now the minimum standard. Old keys silently fail validation." 
/>

### Setting Up DKIM (Google Workspace Example)

**Step 1: Generate your DKIM key**

1. Go to Google Admin Console → Apps → Google Workspace → Gmail → Authenticate email
2. Click "Generate new record"
3. Prefix: `google` (or any selector name you want)
4. Key length: **2048 bits** (required)
5. Copy the TXT record value (looks like `v=DKIM1; k=rsa; p=MIIBIjANBg...`)

**Step 2: Add DKIM record to DNS**

Create a TXT record:
- **Name:** `google._domainkey` (or `yourprefix._domainkey`)
- **Value:** The full TXT record from Google Admin

**Step 3: Verify**

1. Wait 15-60 minutes for DNS propagation
2. In Google Admin, click "Start authentication"
3. Google will verify the DNS record and activate DKIM signing

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can generate your own DKIM keys using OpenSSL:

```bash
openssl genrsa -out private.key 2048
openssl rsa -in private.key -pubout -out public.key
```

Then format the public key for DNS and configure your sending tool to use the private key. Most founders should use their email provider's built-in DKIM generator instead.
</ContextualNote>

### DKIM for Multiple Sending Tools

If you're using Google Workspace + Instantly + Smartlead, you need **separate DKIM records for each service**:

```
google._domainkey     TXT "v=DKIM1; k=rsa; p=[GOOGLE_KEY]"
instantly._domainkey  TXT "v=DKIM1; k=rsa; p=[INSTANTLY_KEY]"
smartlead._domainkey  TXT "v=DKIM1; k=rsa; p=[SMARTLEAD_KEY]"
```

Each service uses a different **selector** (the prefix before `._domainkey`). This allows multiple tools to sign emails from the same domain without conflicts.

<InteractiveChecklist 
  title="DKIM Configuration Steps" 
  persistKey="email-deliverability-L2-dkim-checklist" 
  items={[
    "Generate DKIM key in Google Workspace (or your email provider)",
    "Ensure key length is 2048 bits minimum",
    "Add DKIM TXT record to DNS with correct selector name",
    "If using multiple sending tools, generate separate DKIM keys for each",
    "Add all DKIM records to DNS (one per service)",
    "Wait 15-60 minutes for DNS propagation",
    "Verify each DKIM record using MXToolbox DKIM checker",
    "Send test emails and confirm DKIM signature passes"
  ]} 
/>

---

## DMARC: The Policy Enforcement Layer

### What DMARC Does

DMARC ties SPF and DKIM together and tells receiving servers what to do when authentication fails. It also sends you **reports** about who's sending email claiming to be from your domain.

A basic DMARC record looks like this:

```
_dmarc.yourdomain.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100"
```

Let's decode it:

- `v=DMARC1` — DMARC version 1
- `p=none` — Policy: monitor only (don't reject or quarantine failures)
- `rua=mailto:dmarc@yourdomain.com` — Send aggregate reports here
- `pct=100` — Apply this policy to 100% of emails

### The DMARC Escalation Path (Critical)

**Never start with `p=reject`.** You'll break legitimate email flows you didn't know existed (automated invoices, support tickets, etc.).

The correct escalation sequence:

<SlideNavigation>
<Slide title="Step 1: p=none (Monitoring)">
**Duration:** 2-4 weeks

```
v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100
```

**What happens:** All emails are delivered normally. You receive weekly reports showing which emails pass/fail SPF and DKIM.

**Action:** Review reports. Fix any legitimate sources failing authentication (forgotten services, third-party tools).
</Slide>

<Slide title="Step 2: p=quarantine pct=10">
**Duration:** 1-2 weeks

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=10
```

**What happens:** 10% of emails failing authentication go to spam. 90% still delivered normally.

**Action:** Monitor reports. Confirm no legitimate email is being quarantined.
</Slide>

<Slide title="Step 3: p=quarantine pct=100">
**Duration:** 2-4 weeks

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=100
```

**What happens:** All emails failing authentication go to spam.

**Action:** Monitor reports. Ensure spam folder isn't filling with legitimate email.
</Slide>

<Slide title="Step 4: p=reject pct=10">
**Duration:** 1-2 weeks

```
v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; pct=10
```

**What happens:** 10% of emails failing authentication are rejected entirely (not delivered at all).

**Action:** Final safety check. Confirm no critical systems are broken.
</Slide>

<Slide title="Step 5: p=reject pct=100 (Final State)">
**Duration:** Permanent

```
v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; pct=100
```

**What happens:** All emails failing authentication are rejected. Your domain is now fully protected against spoofing.

**Action:** Continue monitoring reports monthly.
</Slide>
</SlideNavigation>

<InsightCard icon="🎯" title="Why This Matters">
At `p=reject`, spammers can't send emails pretending to be you. This protects your brand reputation and prevents phishing attacks using your domain.

But rushing to `p=reject` without testing can break critical email flows (invoices, support tickets, automated reports). The escalation path prevents this.
</InsightCard>

### DMARC Alignment (The Hidden Requirement)

DMARC doesn't just check if SPF and DKIM pass — it checks if they **align** with the "From" domain.

**Alignment modes:**

- **Relaxed alignment** — Subdomains are allowed (e.g., email from `mail.yourdomain.com` passes for `yourdomain.com`)
- **Strict alignment** — Exact domain match required

Most senders use relaxed alignment:

```
v=DMARC1; p=quarantine; aspf=r; adkim=r; rua=mailto:dmarc@yourdomain.com
```

- `aspf=r` — Relaxed SPF alignment
- `adkim=r` — Relaxed DKIM alignment

<InteractiveChecklist 
  title="DMARC Configuration Steps" 
  persistKey="email-deliverability-L2-dmarc-checklist" 
  items={[
    "Create a dedicated email address for DMARC reports (e.g., dmarc@yourdomain.com)",
    "Add initial DMARC record with p=none to DNS",
    "Wait 24-48 hours for first reports to arrive",
    "Review reports using Postmark DMARC or dmarcian (free tiers available)",
    "Fix any legitimate sources failing SPF/DKIM",
    "After 2-4 weeks, escalate to p=quarantine pct=10",
    "Monitor for 1-2 weeks, then escalate to p=quarantine pct=100",
    "After 2-4 weeks, escalate to p=reject pct=10",
    "Final escalation to p=reject pct=100 after confirming no issues"
  ]} 
/>

---

## Putting It All Together: The Complete DNS Setup

Here's what a fully authenticated sending domain looks like in DNS:

<TemplateBuilder
  title="Complete DNS Record Set"
  persistKey="email-deliverability-L2-dns-template"
  sections={[
    {
      id: "domain",
      title: "Your Domain",
      fields: [
        { id: "domain", label: "Sending Domain", placeholder: "e.g., getacme.com", type: "text" }
      ]
    },
    {
      id: "provider",
      title: "Email Provider",
      fields: [
        { id: "provider", label: "Email Provider", placeholder: "e.g., Google Workspace, Microsoft 365", type: "text" }
      ]
    },
    {
      id: "tools",
      title: "Sending Tools",
      fields: [
        { id: "tools", label: "Additional Sending Tools", placeholder: "e.g., Instantly, Smartlead, Mailchimp", type: "textarea" }
      ]
    }
  ]}
/>

**Example output for `getacme.com` using Google Workspace + Instantly:**

```
; MX Records (Google Workspace)
@ MX 1 aspmx.l.google.com.
@ MX 5 alt1.aspmx.l.google.com.
@ MX 5 alt2.aspmx.l.google.com.
@ MX 10 alt3.aspmx.l.google.com.
@ MX 10 alt4.aspmx.l.google.com.

; SPF Record
@ TXT "v=spf1 include:_spf.google.com include:spf.instantly.ai ~all"

; DKIM Records
google._domainkey TXT "v=DKIM1; k=rsa; p=[YOUR_GOOGLE_2048_BIT_KEY]"
instantly._domainkey TXT "v=DKIM1; k=rsa; p=[YOUR_INSTANTLY_2048_BIT_KEY]"

; DMARC Record (start with p=none)
_dmarc TXT "v=DMARC1; p=none; rua=mailto:dmarc@getacme.com; pct=100"
```

---

## Verification: How to Know It's Working

Don't assume your DNS records are correct. **Verify everything.**

### Tool 1: MXToolbox SuperTool

**URL:** https://mxtoolbox.com/SuperTool.aspx

**What to check:**
1. SPF Record Lookup — Should show your SPF record with all includes
2. DKIM Record Lookup — Enter `google._domainkey.yourdomain.com` (or your selector)
3. DMARC Record Lookup — Should show your DMARC policy
4. DNS Propagation — Confirms records are live globally

<InsightCard icon="✅" title="Green Means Go">
MXToolbox shows green checkmarks for valid records. Yellow or red = something's broken.

Common errors:
- "SPF PermError: Too many DNS lookups" → Flatten your SPF
- "DKIM record not found" → Check selector name and DNS propagation
- "DMARC record not found" → Verify `_dmarc.yourdomain.com` TXT record exists
</InsightCard>

### Tool 2: mail-tester.com

**URL:** https://www.mail-tester.com

**How it works:**
1. Send an email to the address shown on mail-tester.com
2. Wait 10 seconds
3. Click "Then check your score"
4. You'll get a score out of 10 with detailed feedback

**What to look for:**
- **10/10 score** = Perfect authentication
- **8-9/10** = Minor issues (usually content-related, not authentication)
- **&lt;8/10** = Authentication problems or spam triggers

mail-tester checks:
- SPF pass/fail
- DKIM signature validity
- DMARC policy
- Spam content patterns
- Blacklist status
- Email formatting

<RangeSlider 
  label="What score did you get on mail-tester.com?" 
  min={0} 
  max={10} 
  lowLabel="0/10" 
  highLabel="10/10" 
  persistKey="email-deliverability-L2-mailtester-score" 
/>

### Tool 3: Google Admin Toolbox (for Google Workspace users)

**URL:** https://toolbox.googleapps.com/apps/checkmx/

**What it does:**
- Validates MX records for Google Workspace
- Checks SPF and DKIM configuration
- Tests email delivery to Gmail

**How to use:**
1. Enter your domain
2. Click "Check MX records"
3. Review results — should show all 5 Google MX records
4. Click "Check SPF" and "Check DKIM" tabs
5. Fix any errors shown

---

## Common Mistakes and How to Fix Them

<ClassifyExercise
  title="Classify These DNS Configurations"
  persistKey="email-deliverability-L2-classify-configs"
  categories={[
    { id: "correct", label: "Correct", color: "#10b981" },
    { id: "broken", label: "Broken", color: "#ef4444" },
    { id: "risky", label: "Risky but works", color: "#f59e0b" }
  ]}
  items={[
    { 
      id: "1", 
      content: "SPF: v=spf1 include:_spf.google.com ~all | DKIM: 2048-bit | DMARC: p=none", 
      correctCategory: "correct",
      explanation: "Perfect starting configuration. SPF includes only Google, DKIM is strong, DMARC is in monitoring mode."
    },
    { 
      id: "2", 
      content: "SPF: v=spf1 include:_spf.google.com include:sendgrid.net include:mailchimp.com include:hubspot.com include:salesforce.com ~all (14 DNS lookups)", 
      correctCategory: "broken",
      explanation: "Exceeds 10 DNS lookup limit. SPF will fail with PermError. Needs flattening."
    },
    { 
      id: "3", 
      content: "SPF: v=spf1 include:_spf.google.com -all | DKIM: none | DMARC: p=reject", 
      correctCategory: "broken",
      explanation: "Missing DKIM entirely and DMARC is at p=reject without testing. Will break legitimate email."
    },
    { 
      id: "4", 
      content: "SPF: v=spf1 include:_spf.google.com ~all | DKIM: 1024-bit | DMARC: p=none", 
      correctCategory: "risky",
      explanation: "1024-bit DKIM keys are deprecated by Google. Will fail validation soon. Upgrade to 2048-bit."
    },
    { 
      id: "5", 
      content: "Two SPF records: v=spf1 include:_spf.google.com ~all AND v=spf1 include:sendgrid.net ~all", 
      correctCategory: "broken",
      explanation: "Multiple SPF records = both are ignored. Combine into one record."
    },
    { 
      id: "6", 
      content: "SPF: v=spf1 include:_spf.google.com ~all | DKIM: 2048-bit | DMARC: p=quarantine (after 1 day of monitoring)", 
      correctCategory: "risky",
      explanation: "Escalating DMARC too fast. Should monitor at p=none for 2-4 weeks first."
    }
  ]}
/>

---

## The DNS Config Coach (AI-Powered Validation)

Paste your current DNS records below and get instant feedback on what's broken and how to fix it.

<LinterFeedback
  title="DNS Configuration Linter"
  persistKey="email-deliverability-L2-dns-linter"
  inputLabel="Paste your DNS records (SPF, DKIM, DMARC)"
  placeholder="Example:
@ TXT 'v=spf1 include:_spf.google.com ~all'
google._domainkey TXT 'v=DKIM1; k=rsa; p=MIIBIjAN...'
_dmarc TXT 'v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com'"
  rules={[
    { 
      id: "spf-exists", 
      label: "SPF record exists", 
      description: "Must have exactly one SPF TXT record", 
      keywords: ["v=spf1"], 
      antiKeywords: [] 
    },
    { 
      id: "spf-softfail", 
      label: "SPF uses ~all (softfail)", 
      description: "Should use ~all during setup, -all after validation", 
      keywords: ["~all"], 
      antiKeywords: ["-all"] 
    },
    { 
      id: "dkim-exists", 
      label: "DKIM record exists", 
      description: "Must have at least one DKIM TXT record", 
      keywords: ["v=DKIM1", "k=rsa"], 
      antiKeywords: [] 
    },
    { 
      id: "dkim-2048", 
      label: "DKIM uses 2048-bit key", 
      description: "Key length must be 2048 bits minimum", 
      keywords: ["p=MIIBIjAN"], 
      antiKeywords: ["p=MIGfMA0"] 
    },
    { 
      id: "dmarc-exists", 
      label: "DMARC record exists", 
      description: "Must have DMARC TXT record at _dmarc subdomain", 
      keywords: ["v=DMARC1"], 
      antiKeywords: [] 
    },
    { 
      id: "dmarc-reporting", 
      label: "DMARC has reporting address", 
      description: "Should include rua= for aggregate reports", 
      keywords: ["rua=mailto:"], 
      antiKeywords: [] 
    }
  ]}
/>

---

## Your Action Plan

<InteractiveChecklist 
  title="Complete Authentication Setup" 
  persistKey="email-deliverability-L2-action-plan" 
  items={[
    "Audit current DNS records using MXToolbox",
    "Set up SPF record with all authorized senders",
    "Verify SPF has &lt;10 DNS lookups (flatten if needed)",
    "Generate 2048-bit DKIM keys for each sending service",
    "Add all DKIM records to DNS",
    "Create DMARC monitoring email address",
    "Add DMARC record starting with p=none",
    "Send test email to mail-tester.com and achieve 10/10 score",
    "Monitor DMARC reports for 2-4 weeks",
    "Escalate DMARC policy following the 5-step path",
    "Set calendar reminder to review DMARC reports monthly"
  ]} 
/>

---

## What's Next

You now have the authentication foundation. But DNS records alone don't guarantee inbox placement.

In **Lesson 3**, we'll tackle **Microsoft Outlook's unique filtering challenges** — why Outlook is harsher than Gmail, how to monitor your Outlook reputation with SNDS, and the content patterns that trigger Outlook's Junk folder.

Then in **Lesson 4**, we'll design your **multi-domain architecture** — why you need 3-5 sending domains, how to name them, and how to allocate sending volume across them.

Authentication is the price of entry. Domain strategy is how you scale safely.

---

## Quick Knowledge Check

```json
{
  "quizTitle": "SPF/DKIM/DMARC Fundamentals",
  "questions": [
    {
      "id": "q1",
      "question": "What happens if you have two SPF records on the same domain?",
      "options": [
        "The first one takes priority",
        "They merge automatically",
        "Both are ignored and SPF fails",
        "The most recent one is used"
      ],
      "correctIndex": 2,
      "explanation": "DNS only allows one SPF record per domain. If multiple exist, all are ignored and SPF validation fails."
    },
    {
      "id": "q2",
      "question": "What is the minimum DKIM key length required by Google as of 2024?",
      "options": [
        "1024 bits",
        "2048 bits",
        "4096 bits",
        "512 bits"
      ],
      "correctIndex": 1,
      "explanation": "Google deprecated 1024-bit keys in 2024. 2048-bit keys are now the minimum standard."
    },
    {
      "id": "q3",
      "question": "What should your initial DMARC policy be?",
      "options": [
        "p=reject (maximum protection)",
        "p=quarantine (moderate protection)",
        "p=none (monitoring only)",
        "No DMARC record needed initially"
      ],
      "correctIndex": 2,
      "explanation": "Always start with p=none to monitor authentication without affecting delivery. Escalate gradually after reviewing reports."
    },
    {
      "id": "q4",
      "question": "What is the maximum number of DNS lookups allowed in an SPF record?",
      "options": [
        "5",
        "10",
        "15",
        "Unlimited"
      ],
      "correctIndex": 1,
      "explanation": "SPF has a hard limit of 10 DNS lookups. Exceeding this causes a PermError and SPF fails."
    },
    {
      "id": "q5",
      "question": "What does DMARC alignment check?",
      "options": [
        "Whether SPF and DKIM both pass",
        "Whether the From domain matches the SPF/DKIM domain",
        "Whether the email content is spam",
        "Whether the sending IP is blacklisted"
      ],
      "correctIndex": 1,
      "explanation": "DMARC alignment ensures the visible From domain matches the domain authenticated by SPF and DKIM. This prevents spoofing."
    }
  ]
}