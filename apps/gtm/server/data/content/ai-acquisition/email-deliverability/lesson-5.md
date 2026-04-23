---
title: "DNS Setup Checklist (Step by Step)"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 5
---

You've bought your sending domains. You've chosen Google Workspace. Now comes the moment of truth: **configuring DNS records that actually work.**

Most founders hit this wall: they copy-paste records from a blog post, wait 24 hours, test with mail-tester.com, and see a score of 3/10. Their SPF record has a typo. Their DKIM key is truncated. Their DMARC policy points to an email address that doesn't exist.

**Here's what actually happens when DNS is wrong:**
- Your emails silently land in spam (no bounce, no warning)
- Google Postmaster shows "Bad" authentication status
- Outlook filters 100% of your sends to Junk
- You waste 2 weeks of warmup on a broken setup

This lesson is your step-by-step DNS configuration guide. By the end, you'll have **verified, working records** for one complete sending domain — ready for warmup.

---

## The DNS Setup Sequence (Overview)

DNS configuration isn't one task — it's **8 sequential steps** that must happen in order.

<SlideNavigation>
<Slide title="Step 1: Choose Your DNS Provider">

**Where you manage DNS ≠ where you bought the domain.**

Most founders buy domains at Namecheap or GoDaddy, then immediately point nameservers to **Cloudflare** for DNS management.

**Why Cloudflare?**
- Free DNS hosting
- 5-minute TTL (fastest propagation)
- Clean interface (no upsells)
- Built-in domain redirect (for branding)

**Alternative:** Keep DNS at your registrar if you're comfortable with their interface. The records are the same.

<InsightCard icon="⚡" title="Pro Move">
Set your DNS TTL to 300 seconds (5 minutes) during setup. After everything works, increase to 3600 (1 hour) for stability.
</InsightCard>

</Slide>

<Slide title="Step 2: Add MX Records">

**MX records tell the world where to deliver email for your domain.**

For Google Workspace, you need **exactly 5 MX records** in priority order:

```
Priority 1:  aspmx.l.google.com
Priority 5:  alt1.aspmx.l.google.com
Priority 5:  alt2.aspmx.l.google.com
Priority 10: alt3.aspmx.l.google.com
Priority 10: alt4.aspmx.l.google.com
```

**Common mistake:** Adding only the first record. Google needs all 5 for redundancy.

**Verification command:**
```bash
dig MX yourdomain.com
```

You should see all 5 records returned.

</Slide>

<Slide title="Step 3: Generate DKIM Key">

**DKIM proves your emails haven't been tampered with in transit.**

In Google Workspace Admin Console:
1. Go to Apps → Google Workspace → Gmail → Authenticate Email
2. Click "Generate New Record"
3. Select 2048-bit key (required as of 2024)
4. Copy the TXT record name and value

**The record looks like:**
```
google._domainkey.yourdomain.com
TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."
```

The `p=` value is a 392-character base64 string. **Do not truncate it.**

<ExampleCard label="Real DKIM Failure">
A founder copied their DKIM key into Namecheap's DNS panel. Namecheap's interface silently truncated the value at 255 characters. Result: 100% authentication failure for 3 days until they noticed.

**Fix:** Use Cloudflare (no character limits) or split the key into multiple TXT records if your registrar requires it.
</ExampleCard>

</Slide>

<Slide title="Step 4: Build SPF Record">

**SPF lists which servers are allowed to send email as your domain.**

Basic Google Workspace SPF:
```
v=spf1 include:_spf.google.com ~all
```

**If you're also using Instantly or Smartlead:**
```
v=spf1 include:_spf.google.com include:servers.mcsv.net ~all
```

**The `~all` vs `-all` debate:**
- `~all` = softfail (recommended during setup) — "probably not authorized"
- `-all` = hardfail (recommended after validation) — "definitely not authorized"

Start with `~all`. After 2 weeks of successful sending, change to `-all`.

<InsightCard icon="🚨" title="The 10-Lookup Limit">
SPF has a hard limit of 10 DNS lookups. Each `include:` statement counts as 1+ lookups (recursive).

If you use Google + Instantly + Mailgun + SendGrid, you might exceed 10. Solution: SPF flattening (convert includes to IP addresses). Tools: dmarcian SPF Surveyor (free).
</InsightCard>

</Slide>

<Slide title="Step 5: Deploy DMARC (Monitoring Mode)">

**DMARC tells receiving servers what to do if SPF or DKIM fail.**

Initial DMARC record (monitoring only):
```
_dmarc.yourdomain.com
TXT "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100"
```

**What this means:**
- `p=none` = don't reject anything, just send me reports
- `rua=` = where to send daily aggregate reports
- `pct=100` = apply to 100% of emails

**Create the reporting inbox:**
Set up `dmarc@yourdomain.com` as a real inbox or use a DMARC monitoring service (Postmark DMARC is free).

**Escalation path (after 2-4 weeks):**
1. `p=none` → monitor for issues
2. `p=quarantine; pct=10` → quarantine 10% of failures
3. `p=quarantine; pct=100` → quarantine all failures
4. `p=reject; pct=10` → reject 10% of failures
5. `p=reject; pct=100` → reject all failures

Never skip steps. Each transition takes 1-2 weeks.

</Slide>

<Slide title="Step 6: Set Up Domain Redirect">

**Your sending domains should redirect to your main website.**

Why? Legitimacy. If someone types `getacme.com` into a browser, they should land on `acme.com` — not see a parking page.

**In Cloudflare:**
1. Add an A record pointing to Cloudflare's redirect IP
2. Create a Page Rule: `getacme.com/*` → `https://acme.com/$1` (301 redirect)

**Alternative:** Host a simple one-page site on each sending domain with your logo and a link to the main site.

<InsightCard icon="🎯" title="Branding Matters">
Sending domains that look abandoned (no website, no branding) trigger spam filters. A simple redirect adds legitimacy at zero cost.
</InsightCard>

</Slide>

<Slide title="Step 7: Verify with MXToolbox">

**MXToolbox is your DNS validation command center.**

Go to https://mxtoolbox.com/SuperTool.aspx

Run these checks:
1. **MX Lookup** — Should show all 5 Google records
2. **SPF Record Lookup** — Should show your SPF record with no errors
3. **DKIM Lookup** — Enter `google._domainkey.yourdomain.com` — should return your key
4. **DMARC Lookup** — Enter `_dmarc.yourdomain.com` — should show your policy
5. **Blacklist Check** — Should show "Not listed in any blacklists"

**If anything fails:**
- Wait 15 minutes (DNS propagation)
- Check for typos in record names
- Verify you're checking the correct domain
- Use `whatsmydns.net` to see global propagation status

</Slide>

<Slide title="Step 8: Test with mail-tester.com">

**The final validation: send a real email and get scored.**

1. Go to https://mail-tester.com
2. Copy the unique email address they give you
3. Send an email from your new sending domain inbox to that address
4. Click "Then check your score"

**Target score: 9/10 or 10/10**

**Common deductions:**
- Missing DKIM: -3 points
- SPF softfail instead of hardfail: -0.5 points
- No DMARC: -1 point
- Spammy content (even in test emails): -1 to -3 points

**If you score below 8/10:**
- Review the detailed report
- Fix flagged issues
- Wait 15 minutes
- Test again

</Slide>
</SlideNavigation>

---

## Your DNS Configuration Assistant

Let's build your exact DNS records right now.

<TemplateBuilder
  title="DNS Record Generator"
  persistKey="email-deliverability-L5-dns"
  sections={[
    {
      id: "domain",
      title: "Domain Information",
      fields: [
        { id: "domain", label: "Sending Domain", placeholder: "e.g., getacme.com", type: "text" },
        { id: "provider", label: "Email Provider", type: "select", options: ["Google Workspace", "Microsoft 365"] },
        { id: "tools", label: "Additional Sending Tools", placeholder: "e.g., Instantly, Smartlead, Mailgun", type: "text" }
      ]
    },
    {
      id: "dmarc",
      title: "DMARC Configuration",
      fields: [
        { id: "dmarcEmail", label: "DMARC Report Email", placeholder: "e.g., dmarc@yourdomain.com", type: "text" },
        { id: "policy", label: "Initial Policy", type: "select", options: ["p=none (monitoring)", "p=quarantine", "p=reject"] }
      ]
    }
  ]}
/>

<InsightCard icon="🤖" title="AI-Generated Records">
After you fill out the form above, the system will generate your complete DNS record set with:
- All 5 MX records (Google) or 1 MX record (Microsoft)
- SPF record including your tools
- DKIM placeholder (you'll generate the actual key in your email provider)
- DMARC record with your reporting email
- Verification commands for each record type
</InsightCard>

---

## Common DNS Mistakes (And How to Fix Them)

Every founder makes at least one of these errors. Here's how to spot and fix them.

<ClassifyExercise
  title="DNS Error Diagnosis"
  persistKey="email-deliverability-L5-classify"
  categories={[
    { id: "spf", label: "SPF Issue", color: "#ef4444" },
    { id: "dkim", label: "DKIM Issue", color: "#f59e0b" },
    { id: "dmarc", label: "DMARC Issue", color: "#3b82f6" },
    { id: "mx", label: "MX Issue", color: "#8b5cf6" }
  ]}
  items={[
    { id: "1", content: "mail-tester.com shows 'SPF record not found'", correctCategory: "spf" },
    { id: "2", content: "Emails authenticate but DMARC reports show 'alignment failure'", correctCategory: "dmarc" },
    { id: "3", content: "DKIM signature verification fails with 'key not found'", correctCategory: "dkim" },
    { id: "4", content: "Inbound emails bounce with 'no MX record'", correctCategory: "mx" },
    { id: "5", content: "SPF check passes but shows 'too many DNS lookups'", correctCategory: "spf" },
    { id: "6", content: "DMARC policy is set to 'reject' but you never got reports", correctCategory: "dmarc" }
  ]}
/>

---

## The DNS Verification Checklist

Use this checklist for **every sending domain** you configure.

<InteractiveChecklist
  title="DNS Setup Verification"
  persistKey="email-deliverability-L5-checklist"
  items={[
    "Domain purchased and nameservers pointed to DNS provider",
    "All 5 MX records added (Google) or 1 MX record (Microsoft)",
    "MX records verified with `dig MX yourdomain.com`",
    "DKIM key generated in email provider admin console",
    "DKIM TXT record added to DNS (full key, not truncated)",
    "DKIM verified with MXToolbox DKIM lookup",
    "SPF TXT record added with all sending services included",
    "SPF verified with MXToolbox SPF lookup (under 10 lookups)",
    "DMARC TXT record added with monitoring policy (p=none)",
    "DMARC reporting email created and tested",
    "Domain redirect configured (to main website)",
    "Test email sent to mail-tester.com with score 9/10 or 10/10",
    "Google Postmaster Tools domain verified (if using Gmail)",
    "Microsoft SNDS registered (if targeting Outlook users)",
    "14-day waiting period started before warmup begins"
  ]}
/>

---

## Registrar-Specific Walkthroughs

DNS panels vary by provider. Here's how to add records in the three most common registrars.

<SlideNavigation>
<Slide title="Cloudflare DNS">

**Recommended for all sending domains.**

1. Log in to Cloudflare dashboard
2. Select your domain
3. Click "DNS" in the left sidebar
4. Click "Add record"

**For each record type:**
- **MX:** Type = MX, Name = @, Mail server = [Google MX record], Priority = [1, 5, or 10]
- **TXT (SPF):** Type = TXT, Name = @, Content = [your SPF record]
- **TXT (DKIM):** Type = TXT, Name = google._domainkey, Content = [your DKIM key]
- **TXT (DMARC):** Type = TXT, Name = _dmarc, Content = [your DMARC policy]

**TTL:** Set to "Auto" (Cloudflare defaults to 300 seconds)

**Proxy status:** Turn OFF the orange cloud for MX and TXT records (DNS-only mode)

</Slide>

<Slide title="Namecheap DNS">

1. Log in to Namecheap account
2. Go to Domain List → Manage
3. Click "Advanced DNS"

**For each record type:**
- **MX:** Type = MX Record, Host = @, Value = [Google MX], Priority = [1, 5, or 10]
- **TXT (SPF):** Type = TXT Record, Host = @, Value = [your SPF record]
- **TXT (DKIM):** Type = TXT Record, Host = google._domainkey, Value = [your DKIM key]
- **TXT (DMARC):** Type = TXT Record, Host = _dmarc, Value = [your DMARC policy]

**TTL:** Set to 300 (5 minutes) during setup, increase to 3600 after verification

**⚠️ Namecheap Gotcha:** TXT record values longer than 255 characters must be split with quotes. For DKIM:
```
"v=DKIM1; k=rsa; p=MIIBIjANBg..." "...rest of key"
```

</Slide>

<Slide title="GoDaddy DNS">

1. Log in to GoDaddy account
2. Go to My Products → Domains
3. Click DNS next to your domain

**For each record type:**
- **MX:** Type = MX, Name = @, Value = [Google MX], Priority = [1, 5, or 10]
- **TXT (SPF):** Type = TXT, Name = @, Value = [your SPF record]
- **TXT (DKIM):** Type = TXT, Name = google._domainkey, Value = [your DKIM key]
- **TXT (DMARC):** Type = TXT, Name = _dmarc, Value = [your DMARC policy]

**TTL:** Default is 1 hour (3600 seconds) — acceptable for production

**⚠️ GoDaddy Gotcha:** Interface is cluttered with upsells. Ignore "Email Essentials" and "Professional Email" — you're using Google Workspace.

</Slide>
</SlideNavigation>

---

## DNS Propagation: What to Expect

You've added your records. Now what?

<ProgressiveReveal title="DNS Propagation Timeline" persistKey="email-deliverability-L5-propagation">
<RevealSection title="0-15 Minutes: Local Propagation">

Your DNS provider (Cloudflare, Namecheap, etc.) updates its own servers immediately. If you query their nameservers directly, you'll see the new records.

**Check with:**
```bash
dig @ns1.cloudflare.com MX yourdomain.com
```

This should show your records instantly.

</RevealSection>

<RevealSection title="15 Minutes - 2 Hours: ISP Propagation">

Major ISPs (Google, Microsoft, Yahoo) query your nameservers and cache the results. Most updates are visible within 30-60 minutes.

**Check with:**
```bash
dig MX yourdomain.com
```

If you see your records here, 80% of the internet can see them.

</RevealSection>

<RevealSection title="2-24 Hours: Global Propagation">

Smaller ISPs and regional DNS servers update more slowly. Full global propagation can take up to 24 hours (rarely longer).

**Check with:**
https://whatsmydns.net

Enter your domain and record type. You'll see a map showing which regions have the updated records.

</RevealSection>

<RevealSection title="24-48 Hours: Cache Expiration">

If you changed an existing record (not adding a new one), old values may be cached based on the previous TTL. Wait for the old TTL to expire.

**Example:** If your old SPF record had TTL=86400 (24 hours), it could take 24 hours for all servers to see the new value.

**Solution:** Always set low TTL (300 seconds) before making changes, wait 24 hours, then make the change.

</RevealSection>
</ProgressiveReveal>

---

## The "DNS is Broken" Troubleshooting Tree

Your records aren't showing up. Here's how to diagnose.

<DecisionTree
  title="DNS Troubleshooting"
  persistKey="email-deliverability-L5-tree"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "MXToolbox shows 'Record not found.' What do you check first?",
      choices: [
        { label: "Verify the record exists in my DNS panel", nextNodeId: "panel" },
        { label: "Wait 24 hours for propagation", nextNodeId: "wait" },
        { label: "Check if I'm querying the right domain", nextNodeId: "domain" }
      ]
    },
    {
      id: "panel",
      content: "You check your DNS panel. The record is there. Next step?",
      choices: [
        { label: "Check nameservers are pointed correctly", nextNodeId: "nameservers" },
        { label: "Wait 15 minutes and check again", nextNodeId: "propagation" }
      ]
    },
    {
      id: "wait",
      content: "You wait 24 hours. Still not showing. The issue is likely not propagation.",
      isTerminal: true,
      outcome: "negative"
    },
    {
      id: "domain",
      content: "You're querying `yourdomain.com` but the record is at `_dmarc.yourdomain.com`. Fixed!",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "nameservers",
      content: "Your nameservers are pointed to GoDaddy, but you added records in Cloudflare. That's the issue.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "propagation",
      content: "After 15 minutes, MXToolbox shows the record. Propagation complete.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

---

## Real-World DNS Failure Stories

Learn from others' mistakes.

<ExampleCard label="Case Study: The Truncated DKIM Key">

**Founder:** Sarah, B2B SaaS, 4 sending domains

**Setup:** Sarah used Namecheap DNS. She copied her 2048-bit DKIM key from Google Workspace and pasted it into Namecheap's TXT record field.

**What happened:** Namecheap's interface silently truncated the key at 255 characters. Sarah didn't notice because the record showed as "added successfully."

**Result:** 100% DKIM authentication failure for 3 days. All emails landed in spam. Google Postmaster showed "Bad" authentication status.

**Discovery:** She ran `dig TXT google._domainkey.getacme.com` and saw the truncated key.

**Fix:** Moved DNS to Cloudflare (no character limits). Re-added full DKIM key. Waited 2 hours for propagation. Authentication passed.

**Lesson:** Always verify records with `dig` or MXToolbox after adding them. Don't trust the DNS panel's "success" message.

</ExampleCard>

<ExampleCard label="Case Study: The SPF Lookup Explosion">

**Founder:** Marcus, consultant, 3 sending domains

**Setup:** Marcus used Google Workspace + Instantly + Mailgun + SendGrid + HubSpot. He added all five to his SPF record:

```
v=spf1 include:_spf.google.com include:servers.mcsv.net include:mailgun.org include:sendgrid.net include:_spf.hubspot.com ~all
```

**What happened:** SPF has a 10-lookup limit. Each `include:` statement triggers recursive lookups. Marcus's record required 14 lookups total.

**Result:** SPF validation failed with "PermError: too many DNS lookups." Emails rejected or marked as spam.

**Discovery:** He used dmarcian's SPF Surveyor tool, which showed the lookup count.

**Fix:** SPF flattening. He converted some `include:` statements to direct IP addresses, reducing total lookups to 8.

**Lesson:** Count your SPF lookups before deploying. Use SPF flattening if you exceed 10.

</ExampleCard>

---

## Your DNS Setup Sprint

Here's your implementation plan for the next 2-3 hours.

<InteractiveChecklist
  title="DNS Setup Sprint (Per Domain)"
  persistKey="email-deliverability-L5-sprint"
  items={[
    "Choose DNS provider (recommend: Cloudflare)",
    "Point domain nameservers to DNS provider",
    "Add all 5 MX records (Google) or 1 MX record (Microsoft)",
    "Verify MX with `dig MX yourdomain.com`",
    "Generate DKIM key in email provider admin console",
    "Add DKIM TXT record (verify no truncation)",
    "Verify DKIM with MXToolbox DKIM lookup",
    "Build SPF record including all sending tools",
    "Verify SPF lookup count is under 10",
    "Add SPF TXT record",
    "Verify SPF with MXToolbox SPF lookup",
    "Create DMARC reporting inbox",
    "Add DMARC TXT record (p=none initially)",
    "Verify DMARC with MXToolbox DMARC lookup",
    "Set up domain redirect to main website",
    "Send test email to mail-tester.com",
    "Achieve 9/10 or 10/10 score",
    "Register domain in Google Postmaster Tools",
    "Register IP in Microsoft SNDS (if applicable)",
    "Mark calendar: 14 days from today = warmup start date"
  ]}
/>

---

## DNS Monitoring: Set It and Forget It (Mostly)

Once your DNS is configured, you need **passive monitoring** to catch issues before they break sending.

### Free Monitoring Tools

| Tool | What It Monitors | Alert Method | Setup Time |
|------|------------------|--------------|------------|
| Google Postmaster Tools | Gmail authentication status | Dashboard only (check weekly) | 5 min |
| Microsoft SNDS | Outlook reputation | Dashboard only (check weekly) | 10 min |
| Postmark DMARC | DMARC reports (weekly digest) | Email | 5 min |
| UptimeRobot | DNS record availability | Email/Slack | 10 min |

### Paid Monitoring (Optional)

| Tool | What It Monitors | Pricing | Worth It? |
|------|------------------|---------|-----------|
| dmarcian | DMARC + SPF + DKIM | $20/mo (1 domain) | If you send >1,000/day |
| MXToolbox Monitoring | All DNS records + blacklists | $129/mo | Overkill for solo founders |
| GlockApps | Inbox placement testing | $59/mo | Yes (covered in Lesson 8) |

<InsightCard icon="💡" title="Monitoring Strategy">
For solo founders sending 200-400/day:
- **Free tier:** Google Postmaster + Postmark DMARC + weekly manual MXToolbox checks
- **Paid tier:** Add GlockApps ($59/mo) for monthly inbox placement tests

Total cost: $0-59/mo for complete monitoring.
</InsightCard>

---

## What's Next: Warmup Begins in 14 Days

Your DNS is configured. Your records are verified. Now you wait.

**Why 14 days?**
- New domains have zero reputation
- ISPs treat brand-new domains as suspicious
- Waiting 14 days before sending builds initial trust
- Domains aged 14-30 days have 40% better inbox placement than 0-7 day domains

**During the waiting period:**
1. Set up your email inboxes in Google Workspace
2. Subscribe to 5-10 newsletters (builds inbound traffic)
3. Send 2-3 personal emails per day from each inbox (to real people)
4. Reply to any emails you receive
5. Prepare your warmup tool (MailReach or Instantly)

**On Day 14:**
Start the warmup protocol (covered in Lesson 6).

---

## Summary: Your DNS Checklist

<InteractiveChecklist
  title="DNS Setup Complete?"
  persistKey="email-deliverability-L5-summary"
  items={[
    "All MX records added and verified",
    "DKIM key generated and DNS record added (full key, not truncated)",
    "SPF record added with all sending tools (under 10 lookups)",
    "DMARC record added with monitoring policy (p=none)",
    "Domain redirect configured to main website",
    "Test email sent to mail-tester.com with score 9/10+",
    "Google Postmaster Tools domain verified",
    "Microsoft SNDS registered (if targeting Outlook)",
    "14-day waiting period calendar reminder set",
    "Warmup tool account created (MailReach or Instantly)"
  ]}
/>

**Next Lesson:** Warmup Timelines & Safe Volume Ramps — the 30-day protocol from 5/day to 50/day per inbox.