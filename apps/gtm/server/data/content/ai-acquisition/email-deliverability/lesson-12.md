---
title: "Your Deliverability Checklist"
duration: "45 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 12
---

# Your Deliverability Checklist

You've spent 11 lessons building the knowledge. You know SPF from DKIM. You understand why Microsoft is harsher than Gmail. You've mapped out your multi-domain strategy and planned your warmup timeline.

Now comes the moment of truth: **actually setting it all up.**

This lesson is your implementation sprint. No new concepts. Just a comprehensive, step-by-step checklist that walks you through deploying a production-ready email infrastructure that can safely send 200-400 cold emails per day without destroying your sender reputation.

By the end of this lesson, you'll have:
- A complete DNS configuration across all sending domains
- Verified SPF, DKIM, and DMARC records
- Active monitoring dashboards for Gmail, Yahoo, and Outlook
- A 30-day warmup schedule in motion
- Incident response playbooks ready to deploy

Let's build.

---

## The Reality Check

<InsightCard icon="⚠️" title="The $10,000 Mistake">
A technical founder once told me: "I spent $10,000 on Apollo credits and Instantly subscriptions before realizing my emails were going to spam. I had zero monitoring. I burned through 5,000 leads and got 3 replies."

The problem wasn't his offer. It wasn't his copy. It was infrastructure he never validated.
</InsightCard>

Most solo founders approach deliverability like this:
1. Buy a domain
2. Connect it to Instantly
3. Start sending
4. Wonder why nobody replies

The correct sequence:
1. Buy domains (plural)
2. Configure DNS correctly
3. Verify with multiple tools
4. Warmup for 30 days
5. Monitor continuously
6. Then start sending

The difference between these two paths? **80% inbox placement vs. 15%.**

<RangeSlider 
  label="How confident are you that your current setup would pass a full deliverability audit?" 
  min={1} 
  max={10} 
  lowLabel="Not confident" 
  highLabel="Very confident" 
  persistKey="email-deliverability-L12-confidence" 
/>

---

## Phase 1: Pre-Flight Domain Audit

Before you configure anything new, let's audit what you already have.

<InteractiveChecklist 
  title="Domain Inventory Audit" 
  persistKey="email-deliverability-L12-inventory" 
  items={[
    "List all domains you currently own (main + any sending domains)",
    "Check which domains have Google Workspace or Microsoft 365 configured",
    "Identify which domains you've already sent cold email from",
    "Run MXToolbox check on each domain (mxtoolbox.com/SuperTool.aspx)",
    "Check Google Postmaster Tools for any existing reputation data",
    "Verify you have admin access to DNS for all domains"
  ]} 
/>

### The Domain Health Scanner

<LinterFeedback
  title="Domain Health Scanner"
  persistKey="email-deliverability-L12-health"
  inputLabel="Paste your domain name"
  rules={[
    {
      id: "spf",
      label: "SPF Record Exists",
      description: "Domain has a valid SPF record",
      keywords: ["v=spf1"],
      antiKeywords: []
    },
    {
      id: "dkim",
      label: "DKIM Configured",
      description: "At least one DKIM selector exists",
      keywords: ["._domainkey"],
      antiKeywords: []
    },
    {
      id: "dmarc",
      label: "DMARC Policy Set",
      description: "DMARC record exists at _dmarc subdomain",
      keywords: ["v=DMARC1"],
      antiKeywords: []
    },
    {
      id: "mx",
      label: "MX Records Valid",
      description: "MX records point to email provider",
      keywords: ["google.com", "outlook.com", "protection.outlook"],
      antiKeywords: []
    }
  ]}
/>

**What to do with the results:**

- **All green?** You're ready to proceed to warmup verification.
- **Missing SPF/DKIM/DMARC?** Complete Phase 2 before sending any email.
- **Domain already sending with poor config?** Stop sending immediately. Rest the domain for 14 days while you fix DNS.

<ExampleCard label="Case Study: The Burned Domain Recovery">
Marcus had been sending 100 emails/day from his main domain for 3 months. No SPF. No DKIM. No DMARC. His reply rate dropped from 8% to 0.3% over 6 weeks.

When he finally ran a deliverability test, his emails were landing in spam 92% of the time.

**The fix:**
1. Stopped all sending immediately
2. Configured SPF, DKIM, and DMARC correctly
3. Rested the domain for 60 days (no cold email)
4. Started a fresh warmup protocol
5. Took 4 months to recover to 75% inbox placement

**The lesson:** Prevention costs 2 hours. Recovery costs 4 months.
</ExampleCard>

---

## Phase 2: DNS Configuration Sprint

This is where most people get stuck. DNS feels intimidating. It's not.

You're going to configure **one domain completely**, verify it works, then copy-paste the same records to your other domains.

### Step 1: Choose Your First Domain

<FlipCard 
  front="Which domain should you configure first?" 
  back="Start with a NEW sending domain (not your main domain). If it's misconfigured, you haven't risked your brand. Once verified, apply the same config to other domains." 
/>

### Step 2: The Complete DNS Record Set

<TemplateBuilder
  title="DNS Configuration Template"
  persistKey="email-deliverability-L12-dns"
  sections={[
    {
      id: "basic",
      title: "Basic Information",
      fields: [
        { 
          id: "domain", 
          label: "Sending Domain", 
          placeholder: "e.g., getacme.com", 
          type: "text" 
        },
        { 
          id: "provider", 
          label: "Email Provider", 
          placeholder: "Google Workspace or Microsoft 365", 
          type: "select",
          options: ["Google Workspace", "Microsoft 365"]
        },
        { 
          id: "tools", 
          label: "Sending Tools", 
          placeholder: "e.g., Instantly, Smartlead", 
          type: "text" 
        }
      ]
    },
    {
      id: "mx",
      title: "MX Records (Email Routing)",
      fields: [
        { 
          id: "mx-records", 
          label: "MX Record Set", 
          placeholder: "Will auto-generate based on provider", 
          type: "textarea",
          rows: 6
        }
      ]
    },
    {
      id: "spf",
      title: "SPF Record",
      fields: [
        { 
          id: "spf-record", 
          label: "SPF TXT Record", 
          placeholder: "v=spf1 include:_spf.google.com ~all", 
          type: "textarea",
          rows: 2
        }
      ]
    },
    {
      id: "dkim",
      title: "DKIM Record",
      fields: [
        { 
          id: "dkim-selector", 
          label: "DKIM Selector", 
          placeholder: "e.g., google, instantly1", 
          type: "text" 
        },
        { 
          id: "dkim-key", 
          label: "DKIM Public Key", 
          placeholder: "Paste from Google Admin or provider", 
          type: "textarea",
          rows: 4
        }
      ]
    },
    {
      id: "dmarc",
      title: "DMARC Record",
      fields: [
        { 
          id: "dmarc-email", 
          label: "DMARC Report Email", 
          placeholder: "dmarc-reports@yourdomain.com", 
          type: "text" 
        },
        { 
          id: "dmarc-policy", 
          label: "DMARC Policy", 
          placeholder: "Start with 'none', escalate to 'quarantine' after 2 weeks", 
          type: "select",
          options: ["none", "quarantine", "reject"]
        }
      ]
    }
  ]}
/>

### Step 3: Copy-Paste Records to DNS

<SlideNavigation>
<Slide title="Cloudflare DNS Setup">

**If you're using Cloudflare for DNS:**

1. Log into Cloudflare → select your domain
2. Click **DNS** in the left sidebar
3. Click **Add record** for each record type
4. **MX Records:** Type = MX, Name = @, Mail server = [from template], Priority = [from template]
5. **SPF Record:** Type = TXT, Name = @, Content = [your SPF record]
6. **DKIM Record:** Type = TXT, Name = [selector]._domainkey, Content = [your DKIM key]
7. **DMARC Record:** Type = TXT, Name = _dmarc, Content = [your DMARC policy]
8. Set TTL to **Auto** for all records
9. Click **Save**

**Propagation time:** 5-15 minutes with Cloudflare.

</Slide>

<Slide title="Namecheap DNS Setup">

**If you're using Namecheap:**

1. Log into Namecheap → **Domain List** → **Manage** next to your domain
2. Click **Advanced DNS** tab
3. Click **Add New Record** for each type
4. **MX Records:** Type = MX Record, Host = @, Value = [mail server], Priority = [number]
5. **SPF Record:** Type = TXT Record, Host = @, Value = [your SPF record]
6. **DKIM Record:** Type = TXT Record, Host = [selector]._domainkey, Value = [your DKIM key]
7. **DMARC Record:** Type = TXT Record, Host = _dmarc, Value = [your DMARC policy]
8. TTL = **Automatic** for all
9. Click **Save All Changes**

**Propagation time:** 30 minutes to 2 hours with Namecheap.

</Slide>

<Slide title="GoDaddy DNS Setup">

**If you're using GoDaddy:**

1. Log into GoDaddy → **My Products** → **DNS** next to your domain
2. Scroll to **Records** section
3. Click **Add** for each record
4. **MX Records:** Type = MX, Name = @, Value = [mail server], Priority = [number], TTL = 1 Hour
5. **SPF Record:** Type = TXT, Name = @, Value = [your SPF record], TTL = 1 Hour
6. **DKIM Record:** Type = TXT, Name = [selector]._domainkey, Value = [your DKIM key], TTL = 1 Hour
7. **DMARC Record:** Type = TXT, Name = _dmarc, Value = [your DMARC policy], TTL = 1 Hour
8. Click **Save**

**Propagation time:** 1-4 hours with GoDaddy (slower than Cloudflare).

</Slide>
</SlideNavigation>

### Step 4: Verification

Don't trust that it worked. Verify.

<InteractiveChecklist 
  title="DNS Verification Checklist" 
  persistKey="email-deliverability-L12-verify" 
  items={[
    "Run MXToolbox SuperTool check (mxtoolbox.com/SuperTool.aspx)",
    "Verify SPF record passes (green checkmark)",
    "Verify DKIM record exists and validates",
    "Verify DMARC record exists with correct policy",
    "Send test email to mail-tester.com (aim for 9/10 or higher)",
    "Check DNS propagation globally (whatsmydns.net)",
    "Verify MX records point to correct email provider",
    "Confirm no DNS errors or warnings in registrar panel"
  ]} 
/>

<InsightCard icon="🎯" title="The 9/10 Rule">
mail-tester.com scores your email out of 10. **9/10 or higher = production-ready.** 8/10 = fixable issues. Below 8 = do not send until fixed.

Common reasons for losing points:
- Missing DMARC record (-0.5)
- SPF alignment issue (-0.5 to -1.0)
- Content triggers spam filters (-0.5 to -2.0)
- Sending from a brand-new domain with no reputation (-0.5)
</InsightCard>

---

## Phase 3: Monitoring Dashboard Setup

DNS is configured. Now you need eyes on your reputation.

### The 3-Platform Monitoring Stack

<ComparisonBuilder
  title="Your Monitoring Setup vs. Expert Setup"
  persistKey="email-deliverability-L12-monitoring"
  prompt="List the tools you're currently using to monitor deliverability"
  expertExample="Google Postmaster Tools (Gmail reputation), Microsoft SNDS (Outlook reputation), GlockApps (inbox placement testing), MailReach (warmup + monitoring), Postmark DMARC Digests (authentication reports)"
  criteria={[
    "Covers Gmail reputation monitoring",
    "Covers Outlook/Microsoft reputation monitoring",
    "Includes inbox placement testing",
    "Monitors DMARC authentication reports",
    "Provides alerts for reputation drops"
  ]}
/>

### Setup Sequence

<ProgressiveReveal title="Monitoring Setup Steps" persistKey="email-deliverability-L12-reveal">

<RevealSection title="Step 1: Google Postmaster Tools">

**What it does:** Shows your Gmail sender reputation, spam rate, domain reputation, and IP reputation.

**Setup:**
1. Go to https://postmaster.google.com
2. Click **Add domain** (use the + button)
3. Enter your sending domain (e.g., getacme.com)
4. Google provides a TXT record to verify ownership
5. Add that TXT record to your DNS (same process as DMARC)
6. Wait 24-48 hours for verification
7. Return to Postmaster Tools → you'll see reputation data once you send 100+ emails/day

**What to monitor:**
- **Domain reputation:** Should be "High" (green). "Medium" = warning. "Low" or "Bad" = stop sending.
- **IP reputation:** Should be "High." If "Low," your sending IP is flagged.
- **Spam rate:** Should be &lt;0.1%. Above 0.3% = immediate action required.

**Check frequency:** Daily during warmup. Weekly after reaching cruise speed.

</RevealSection>

<RevealSection title="Step 2: Microsoft SNDS">

**What it does:** Shows your Outlook/Hotmail/Live sender reputation by IP address.

**Setup:**
1. Go to https://sendersupport.olc.protection.outlook.com/snds/
2. Click **Request Access**
3. Enter your sending IP addresses (find via "what is my IP" from your email provider)
4. Microsoft sends a verification code to postmaster@yourdomain.com
5. Enter the code to verify
6. SNDS shows color-coded reputation: Green = good, Yellow = caution, Red = blocked

**What to monitor:**
- **Trap hits:** Any number above 0 is bad. Trap hits = you're sending to spam traps.
- **Complaint rate:** Should be &lt;0.1%.
- **Filter result:** Shows percentage of your mail going to Junk.

**Check frequency:** Every 2-3 days during warmup. Weekly after.

</RevealSection>

<RevealSection title="Step 3: GlockApps Inbox Placement">

**What it does:** Sends test emails to seed inboxes across Gmail, Outlook, Yahoo, and shows where they land (Inbox vs. Spam vs. Promotions).

**Setup:**
1. Sign up at https://glockapps.com ($59/mo for Basic plan)
2. Create a test campaign
3. GlockApps provides a unique email address
4. Send your actual cold email template to that address
5. GlockApps shows placement across 20+ inbox providers

**What to monitor:**
- **Inbox placement rate:** Target 80%+ for Gmail, 70%+ for Outlook, 75%+ for Yahoo.
- **Spam placement:** Should be &lt;10%. Above 20% = major issue.
- **Authentication results:** Confirms SPF, DKIM, DMARC all pass.

**Check frequency:** Weekly during warmup. Bi-weekly after. Run a test whenever you change email content significantly.

</RevealSection>

<RevealSection title="Step 4: DMARC Monitoring">

**What it does:** Sends you weekly reports showing which emails passed/failed DMARC authentication, and who's sending email claiming to be from your domain.

**Setup (using Postmark DMARC):**
1. Sign up at https://dmarc.postmarkapp.com (free)
2. Add your domain
3. Update your DMARC record to include Postmark's reporting address:
   ```
   v=DMARC1; p=none; rua=mailto:re+[your-token]@dmarc.postmarkapp.com; pct=100
   ```
4. Postmark sends weekly digests showing authentication results

**What to monitor:**
- **DMARC pass rate:** Should be 100%. Anything less = configuration issue.
- **SPF alignment failures:** Indicates SPF record doesn't cover all your sending sources.
- **DKIM alignment failures:** Indicates DKIM selector mismatch or missing key.
- **Unauthorized senders:** Shows if anyone is spoofing your domain.

**Check frequency:** Review weekly digest. Investigate any failures immediately.

</RevealSection>

</ProgressiveReveal>

---

## Phase 4: Warmup Execution

Your DNS is perfect. Your monitoring is live. Now: warmup.

### The 30-Day Warmup Protocol

<ScenarioSimulator
  title="Warmup Volume Calculator"
  persistKey="email-deliverability-L12-warmup-calc"
  levers={[
    { 
      id: "inboxes", 
      label: "Number of inboxes", 
      min: 3, 
      max: 20, 
      step: 1, 
      defaultValue: 12 
    },
    { 
      id: "startVolume", 
      label: "Starting volume per inbox/day", 
      min: 3, 
      max: 10, 
      step: 1, 
      defaultValue: 5 
    },
    { 
      id: "targetVolume", 
      label: "Target volume per inbox/day", 
      min: 20, 
      max: 50, 
      step: 5, 
      defaultValue: 35 
    }
  ]}
  outputs={[
    { 
      id: "week1", 
      label: "Week 1 total daily volume", 
      formula: "inboxes * startVolume", 
      unit: " emails/day", 
      precision: 0 
    },
    { 
      id: "week4", 
      label: "Week 4 total daily volume", 
      formula: "inboxes * targetVolume", 
      unit: " emails/day", 
      precision: 0 
    },
    { 
      id: "capacity", 
      label: "Full capacity (if all inboxes at target)", 
      formula: "inboxes * targetVolume", 
      unit: " emails/day", 
      precision: 0 
    }
  ]}
  insight="At `{week4}` emails/day with a 5% reply rate, you'll get roughly {week4 * 0.05} replies/day, or ~{week4 * 0.05 * 7} replies/week."
/>

### Warmup Tool Configuration

<StrategyDuel
  title="Warmup Tool: Built-in vs. Dedicated"
  persistKey="email-deliverability-L12-warmup-tool"
  scenario="You have 12 inboxes to warm up. Which approach?"
  strategyA={{
    name: "Use Instantly's Built-in Warmup",
    description: "Included in $37/mo plan, unlimited inboxes",
    pros: [
      "No additional cost",
      "Integrated with sending platform",
      "Simple setup"
    ],
    cons: [
      "Less control over warmup content",
      "Fewer monitoring features",
      "Shared warmup pool (lower quality)"
    ]
  }}
  strategyB={{
    name: "Use MailReach ($25/inbox/mo)",
    description: "Dedicated warmup service with monitoring",
    pros: [
      "Higher quality warmup emails",
      "Better inbox placement monitoring",
      "More granular control",
      "Dedicated support"
    ],
    cons: [
      "Costs $300/mo for 12 inboxes",
      "Separate platform to manage",
      "Overkill if budget-constrained"
    ]
  }}
  expertVerdict="For solo founders: Start with Instantly's built-in warmup. If inbox placement is below 70% after 2 weeks, upgrade 3-4 key inboxes to MailReach. Total cost: $37 + $75-100 = ~$112-137/mo."
/>

### Daily Warmup Checklist

<InteractiveChecklist 
  title="Daily Warmup Monitoring (Weeks 1-4)" 
  persistKey="email-deliverability-L12-daily-warmup" 
  items={[
    "Check Google Postmaster Tools for any reputation drops",
    "Review Microsoft SNDS for any yellow/red flags",
    "Verify warmup emails are being sent (check sent folder)",
    "Confirm warmup reply rate is 30-50% (in warmup tool dashboard)",
    "Check for any bounce messages or delivery failures",
    "Increase daily volume by 2-3 emails per inbox (every 2-3 days)",
    "If inbox placement drops below 80%, freeze volume for 3 days",
    "Document any issues in warmup log"
  ]} 
/>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Build a simple monitoring script that hits Google Postmaster API + SNDS daily and sends you a Slack notification if reputation drops below "High" or spam rate exceeds 0.05%. Automate the monitoring you'd otherwise do manually.

Example: Use Zapier or Make.com to pull Postmaster data → check thresholds → send alert if triggered.
</ContextualNote>

---

## Phase 5: Incident Response Playbooks

Things will go wrong. A domain will hit spam. A complaint rate will spike. You need playbooks ready.

### Playbook 1: Inbox Placement Suddenly Drops

<DecisionTree
  title="Inbox Placement Drop Response"
  persistKey="email-deliverability-L12-placement-drop"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "Your inbox placement drops from 85% to 45% overnight. What's your first action?",
      choices: [
        { label: "Check Google Postmaster Tools for reputation change", nextNodeId: "postmaster" },
        { label: "Immediately stop all sending", nextNodeId: "stop" },
        { label: "Run a GlockApps test to confirm", nextNodeId: "test" }
      ]
    },
    {
      id: "postmaster",
      content: "Postmaster shows 'Low' domain reputation and 0.15% spam rate. What now?",
      choices: [
        { label: "Stop sending immediately and investigate", nextNodeId: "investigate" },
        { label: "Reduce volume by 50% and monitor", nextNodeId: "reduce" }
      ]
    },
    {
      id: "stop",
      content: "Good instinct, but you need data first. Run diagnostics before stopping.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "test",
      content: "GlockApps confirms 48% spam placement. Postmaster shows 'Low' reputation.",
      choices: [
        { label: "Stop sending and investigate root cause", nextNodeId: "investigate" },
        { label: "Switch to different sending domains", nextNodeId: "switch" }
      ]
    },
    {
      id: "investigate",
      content: "You discover a spam trap in your list from a bad data source. You remove it, rest the domain 14 days, and restart warmup. Reputation recovers in 30 days.",
      isTerminal: true,
      outcome: "positive"
    },
    {
      id: "reduce",
      content: "Volume reduction helps slightly, but reputation continues declining. You should have stopped entirely.",
      isTerminal: true,
      outcome: "negative"
    },
    {
      id: "switch",
      content: "Switching domains without fixing the root cause just burns more domains. Bad move.",
      isTerminal: true,
      outcome: "negative"
    }
  ]}
/>

### Playbook 2: Spam Complaint Spike

**Trigger:** Spam complaint rate exceeds 0.1% (Google Postmaster or SNDS).

**Immediate Actions:**
1. **Stop all sending from affected domain immediately**
2. **Identify the source:** Which campaign? Which list? Which email content?
3. **Audit the list:** Remove any purchased/scraped contacts
4. **Review email content:** Check for spam trigger words, misleading subject lines, missing unsubscribe
5. **Check unsubscribe functionality:** Ensure one-click unsubscribe works
6. **Rest the domain:** 14-30 days minimum before resuming

**Recovery Timeline:**
- Week 1-2: No sending, monitor reputation daily
- Week 3-4: Resume warmup at 50% of previous volume
- Week 5-6: Gradually increase if reputation holds
- Week 7-8: Return to normal volume if all metrics green

### Playbook 3: DMARC Alignment Failure

**Trigger:** DMARC reports show &lt;100% pass rate.

**Diagnosis Steps:**
1. Check which authentication method failed (SPF or DKIM)
2. **If SPF failed:** Verify sending IP is in SPF record; check for SPF lookup limit (max 10)
3. **If DKIM failed:** Verify DKIM selector matches between email provider and DNS; check key hasn't expired
4. **If both failed:** DNS propagation issue or incorrect record format

**Fix:**
1. Correct the DNS record
2. Wait 24 hours for propagation
3. Send test email to mail-tester.com
4. Verify DMARC report shows 100% pass in next weekly digest

---

## Phase 6: The Final Pre-Launch Checklist

You're about to go live with cold outreach. This is your final safety check.

<InteractiveChecklist 
  title="Pre-Launch Deliverability Audit" 
  persistKey="email-deliverability-L12-prelaunch" 
  items={[
    "All sending domains have SPF, DKIM, and DMARC configured and verified",
    "MXToolbox shows green checkmarks for all authentication records",
    "mail-tester.com score is 9/10 or higher for test emails from each domain",
    "Google Postmaster Tools shows 'High' domain reputation (or no data yet if brand new)",
    "Microsoft SNDS shows green status (or domain not yet registered if new)",
    "GlockApps inbox placement test shows 75%+ inbox rate",
    "All inboxes have completed minimum 21 days of warmup",
    "Warmup reply rate is 30-50% (confirms warmup is working)",
    "Monitoring dashboards are set up and checked daily",
    "Incident response playbooks are documented and accessible",
    "Unsubscribe functionality is tested and working (one-click + email reply)",
    "Sending volume is set to 30-40 emails/day per inbox (not maxed out)",
    "You have a backup domain in warmup (for rotation if needed)",
    "Your main domain is NOT being used for cold outreach"
  ]} 
/>

<InsightCard icon="🚀" title="The Green Light Criteria">
If you checked all 14 items above, you're ready to send.

If you're missing even one, **do not start sending.** Fix it first. The cost of launching with broken infrastructure is 10x the cost of waiting 3 more days to fix it properly.
</InsightCard>

---

## Your 7-Day Implementation Sprint

This lesson isn't theoretical. It's a sprint. Here's your execution plan.

<SlideNavigation>
<Slide title="Day 1: Domain Audit & Purchase">

**Tasks:**
- Run MXToolbox check on all existing domains
- Identify which domains are safe to use vs. need to be retired
- Purchase 3-5 new sending domains (if needed)
- Point all domains to Cloudflare for DNS management

**Time required:** 2-3 hours

**Deliverable:** List of domains with health status + new domains registered

</Slide>

<Slide title="Day 2: DNS Configuration (Domain 1)">

**Tasks:**
- Configure complete DNS record set for first sending domain
- Add MX records for email provider
- Generate and add DKIM key
- Create SPF record including all sending services
- Add DMARC record (p=none)
- Verify with MXToolbox and mail-tester.com

**Time required:** 1-2 hours

**Deliverable:** First domain scoring 9/10 on mail-tester.com

</Slide>

<Slide title="Day 3: DNS Configuration (Domains 2-4)">

**Tasks:**
- Copy DNS configuration from Domain 1 to remaining domains
- Adjust DKIM selectors (unique per domain)
- Verify each domain with MXToolbox
- Send test emails to mail-tester.com from each

**Time required:** 2-3 hours

**Deliverable:** All domains configured and verified

</Slide>

<Slide title="Day 4: Monitoring Setup">

**Tasks:**
- Add all domains to Google Postmaster Tools
- Register sending IPs with Microsoft SNDS
- Set up Postmark DMARC monitoring
- Create GlockApps account and run first placement test
- Set up daily monitoring routine (calendar reminder)

**Time required:** 1-2 hours

**Deliverable:** All monitoring dashboards live

</Slide>

<Slide title="Day 5: Warmup Launch">

**Tasks:**
- Connect all inboxes to warmup tool (Instantly or MailReach)
- Configure warmup settings (start at 5/day, 30-50% reply rate)
- Verify warmup emails are sending
- Document baseline metrics (day 1 of warmup)

**Time required:** 1 hour

**Deliverable:** Warmup running on all inboxes

</Slide>

<Slide title="Day 6: Incident Playbook Creation">

**Tasks:**
- Document the 3 incident response playbooks
- Create a shared doc or Notion page with step-by-step instructions
- Set up alerts (email or Slack) for reputation drops
- Test unsubscribe functionality

**Time required:** 1-2 hours

**Deliverable:** Incident response playbooks ready to deploy

</Slide>

<Slide title="Day 7: Final Audit & Documentation">

**Tasks:**
- Complete the Pre-Launch Deliverability Audit checklist
- Run final GlockApps placement test
- Document your infrastructure setup (for future reference)
- Schedule Week 2 warmup volume increase

**Time required:** 1 hour

**Deliverable:** Green light to start sending (after warmup completes)

</Slide>
</SlideNavigation>

---

## The Ongoing Maintenance Routine

Infrastructure isn't "set and forget." It's "set and monitor."

### Weekly Maintenance Checklist

<InteractiveChecklist 
  title="Weekly Deliverability Maintenance" 
  persistKey="email-deliverability-L12-weekly" 
  items={[
    "Check Google Postmaster Tools for all domains (5 min)",
    "Review Microsoft SNDS for any yellow/red flags (3 min)",
    "Review DMARC weekly digest from Postmark (5 min)",
    "Run GlockApps placement test if content changed (10 min)",
    "Check warmup tool dashboard for any paused inboxes (2 min)",
    "Review reply rates and bounce rates in sending platform (5 min)",
    "Audit unsubscribe requests and process them (5 min)",
    "Update warmup volume if in ramp phase (2 min)"
  ]} 
/>

**Total time:** ~30-40 minutes per week.

### Monthly Deep Audit

Once per month, run a comprehensive audit:

<InteractiveChecklist 
  title="Monthly Deliverability Deep Audit" 
  persistKey="email-deliverability-L12-monthly" 
  items={[
    "Run full GlockApps test on all active sending domains",
    "Review 30-day trend in Google Postmaster (reputation, spam rate)",
    "Check for any new blacklist listings (MXToolbox Blacklist Check)",
    "Audit email content for spam trigger words (use mail-tester.com)",
    "Review list quality (bounce rate should be &lt;2%)",
    "Rotate DKIM keys if 6+ months old",
    "Test unsubscribe functionality end-to-end",
    "Review incident log and update playbooks if needed",
    "Consider rotating one domain to rest if heavily used"
  ]} 
/>

**Total time:** ~2 hours per month.

---

## The Deliverability Mindset

Here's the truth: **deliverability is never "done."**

It's not a one-time setup. It's an ongoing practice.

The best cold emailers in the world:
- Check their Postmaster Tools daily
- Run placement tests weekly
- Treat their sender reputation like their most valuable asset
- Would rather send 0 emails than send from a misconfigured domain

<FlipCard 
  front="What's the #1 deliverability mistake solo founders make?" 
  back="Treating infrastructure as a blocker to 'get past' instead of a foundation to build on. They rush the setup, skip monitoring, and wonder why nobody replies. The setup IS the work." 
/>

You now have everything you need:
- ✅ Complete DNS configuration templates
- ✅ Monitoring dashboards across Gmail, Yahoo, and Outlook
- ✅ A 30-day warmup protocol
- ✅ Incident response playbooks
- ✅ Weekly and monthly maintenance routines

**Your job:** Execute the 7-day sprint. Don't skip steps. Don't rush warmup.

The founders who do this right send 200-400 emails/day for years without a single spam incident.

The founders who skip it burn through domains every 3 months and blame "cold email being dead."

Which one will you be?

---

## Summary: Your Action Items

<InteractiveChecklist 
  title="Post-Lesson Action Items" 
  persistKey="email-deliverability-L12-actions" 
  items={[
    "Run domain health audit on all current domains (Phase 1)",
    "Purchase 3-5 sending domains if needed",
    "Configure DNS for first domain and verify with mail-tester.com (Phase 2)",
    "Set up Google Postmaster Tools, Microsoft SNDS, and DMARC monitoring (Phase 3)",
    "Launch warmup on all inboxes at 5 emails/day (Phase 4)",
    "Document incident response playbooks (Phase 5)",
    "Complete pre-launch deliverability audit checklist (Phase 6)",
    "Schedule daily monitoring routine for next 30 days",
    "Set calendar reminder for weekly maintenance checks",
    "Commit to NOT sending cold email until warmup completes (21+ days)"
  ]} 
/>

---

**Next Steps:**

You've completed Course 22: Email Deliverability & Infrastructure.

Your infrastructure is production-ready. Your monitoring is live. Your warmup is running.

In **Course 23: AI Lead Research & Enrichment**, you'll learn how to build lists that are actually worth sending to — using Clay, Apollo, and AI to find high-intent leads at scale.

But first: execute this 7-day sprint. Your future self (and your sender reputation) will thank you.