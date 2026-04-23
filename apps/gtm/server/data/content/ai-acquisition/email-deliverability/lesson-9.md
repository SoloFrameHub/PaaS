---
title: "Monitoring & Troubleshooting (GlockApps, MailReach)"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 9
---

# Monitoring & Troubleshooting (GlockApps, MailReach)

## The 3am Wake-Up Call

It's Tuesday morning. You check your Instantly dashboard over coffee and your stomach drops.

Yesterday: 42% reply rate across your campaigns.
Today: 4%.

Your first thought: "Did I accidentally send to the wrong list?"

You check. Nope. Same segments. Same messaging. Same everything.

But your emails have vanished. Not bouncing. Not in spam (as far as you know). Just... gone.

This is the nightmare scenario every solo founder faces eventually: **silent deliverability failure**. Your sending infrastructure didn't break loudly with error messages. It broke quietly, routing your carefully crafted outreach into the void.

The difference between founders who recover in 48 hours and those who lose 30 days of momentum? **Monitoring systems that catch problems before they become catastrophic.**

<InsightCard icon="🚨" title="The Invisible Crisis">
Microsoft Outlook silently filters 58% of non-authenticated cold email. Gmail's Promotions tab swallows another 30%. You can have a 0% bounce rate and still be 100% invisible to your prospects.
</InsightCard>

Today you're building the early-warning system that prevents this scenario. By the end of this lesson, you'll have:

1. **Daily monitoring dashboards** tracking inbox placement across Gmail, Outlook, and Yahoo
2. **Automated alerts** that notify you within hours of deliverability drops
3. **Diagnostic playbooks** for the 5 most common failure modes
4. **Recovery protocols** that get you back to inbox within 48-72 hours

Let's start with the fundamental truth about email deliverability in 2025-2026:

**If you're not actively monitoring, you're already failing.**

---

## The Monitoring Stack: What You Actually Need

Here's what most guides get wrong: they tell you to "monitor deliverability" without explaining what that means operationally.

Deliverability monitoring has **three distinct layers**, and you need all three:

### Layer 1: Inbox Placement Testing
**What it measures:** Where your emails actually land (inbox vs spam vs promotions)
**How often:** Daily during warmup, 2-3x/week at cruise speed
**Tools:** GlockApps ($59/mo), MailReach ($25/mo per inbox)

### Layer 2: Sender Reputation Monitoring
**What it measures:** How ISPs view your sending domains and IPs
**How often:** Daily checks, weekly deep dives
**Tools:** Google Postmaster (free), Microsoft SNDS (free), MXToolbox (free)

### Layer 3: Engagement Metrics
**What it measures:** Open rates, reply rates, spam complaints, unsubscribes
**How often:** Real-time via your sending platform
**Tools:** Instantly/Smartlead built-in analytics, HubSpot CRM

<FlipCard 
  front="Why Three Layers?" 
  back="Inbox placement tells you WHERE emails land. Reputation tells you WHY. Engagement tells you IF IT MATTERS. Miss any layer and you're flying blind." 
/>

Let's build each layer, starting with the most critical: **inbox placement testing**.

---

## GlockApps: Your Inbox Placement X-Ray

GlockApps is the industry standard for one reason: it shows you **exactly where your emails land across 30+ email providers**, updated in real-time.

Here's how it works:

1. You send a test email to a unique GlockApps address
2. GlockApps has seed inboxes at Gmail, Outlook, Yahoo, Apple Mail, etc.
3. Within 2-3 minutes, you get a report showing inbox vs spam vs promotions placement
4. You see domain reputation scores, authentication pass/fail, and spam filter triggers

<ExampleCard label="Real Founder Data: The Outlook Surprise">
Marcus was celebrating 87% inbox placement on Gmail. Then he checked GlockApps.

**Gmail:** 87% inbox, 13% promotions
**Yahoo:** 82% inbox, 18% spam
**Outlook:** 23% inbox, 77% spam

His target market? B2B SaaS buyers. 64% use Outlook.

He'd been optimizing for the wrong provider. One GlockApps test saved him from burning his entire domain.
</ExampleCard>

### Setting Up GlockApps (Step-by-Step)

<SlideNavigation>
<Slide title="Step 1: Create Account & Get Test Address">

1. Sign up at glockapps.com ($59/mo Basic plan)
2. Navigate to "Spam Testing" → "Create New Test"
3. Copy your unique test email address (looks like `test-abc123@glockapps.com`)
4. Save this address — you'll use it repeatedly

**Pro tip:** Create a saved contact in your sending tool with this address for quick testing.

</Slide>

<Slide title="Step 2: Send Your First Test">

From one of your warmed-up sending inboxes:

1. Compose an email using your actual cold outreach template
2. Include your typical subject line, first line, body, and CTA
3. Send to your GlockApps test address
4. Wait 2-3 minutes for results

**Critical:** Test your REAL emails, not generic "test" messages. Filters react to content patterns.

</Slide>

<Slide title="Step 3: Interpret Results">

GlockApps shows:

- **Inbox Placement %** by provider (Gmail, Outlook, Yahoo, etc.)
- **Authentication Status** (SPF, DKIM, DMARC pass/fail)
- **Spam Score** (0-10 scale, lower is better)
- **Spam Filter Triggers** (specific words/patterns that flagged)

**Green zone:** 80%+ inbox across all major providers
**Yellow zone:** 60-80% inbox — investigate and optimize
**Red zone:** &lt;60% inbox — stop sending immediately

</Slide>

<Slide title="Step 4: Set Up Weekly Testing Schedule">

Create a recurring calendar event:

- **Monday 9am:** Test Domain A (primary sending domain)
- **Wednesday 9am:** Test Domain B (secondary)
- **Friday 9am:** Test Domain C (rotation)

During warmup: test daily.
At cruise speed: test 2-3x/week minimum.

**Automation tip:** Some founders use Zapier to auto-send test emails on schedule.

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="GlockApps Setup Checklist" 
  persistKey="email-deliverability-L9-glockapps-setup"
  items={[
    "Create GlockApps account and save test email address",
    "Send first test from each sending domain",
    "Document baseline inbox placement % per provider",
    "Set up weekly testing calendar reminders",
    "Create 'acceptable threshold' alert (e.g., &lt;75% inbox = investigate)"
  ]} 
/>

Now let's add the second monitoring layer: **MailReach**.

---

## MailReach: Continuous Inbox Monitoring + Warmup

GlockApps is a snapshot. MailReach is a **continuous heart monitor** for your inboxes.

Here's what makes MailReach different:

1. **Automated Daily Testing:** Sends test emails from your inbox every day, checks placement automatically
2. **Warmup Integration:** Runs your warmup protocol while monitoring (kills two birds with one tool)
3. **Trend Tracking:** Shows inbox placement over time, not just point-in-time snapshots
4. **Instant Alerts:** Emails/Slack notifications when placement drops below your threshold

At $25/month per inbox, it's the best value in deliverability monitoring.

### MailReach Setup & Configuration

<TemplateBuilder
  title="MailReach Inbox Configuration"
  persistKey="email-deliverability-L9-mailreach-config"
  sections={[
    {
      id: "inbox-details",
      title: "Inbox Details",
      fields: [
        { 
          id: "domain", 
          label: "Sending Domain", 
          placeholder: "e.g., getacme.com", 
          type: "text" 
        },
        { 
          id: "email", 
          label: "Full Email Address", 
          placeholder: "e.g., founder@getacme.com", 
          type: "text" 
        },
        { 
          id: "provider", 
          label: "Email Provider", 
          placeholder: "Google Workspace / Microsoft 365", 
          type: "text" 
        }
      ]
    },
    {
      id: "monitoring-settings",
      title: "Monitoring Settings",
      fields: [
        { 
          id: "alert-threshold", 
          label: "Alert Threshold (inbox %)", 
          placeholder: "e.g., 75% — alert if placement drops below", 
          type: "number" 
        },
        { 
          id: "test-frequency", 
          label: "Test Frequency", 
          placeholder: "Daily / Every 12 hours", 
          type: "text" 
        },
        { 
          id: "notification-channel", 
          label: "Notification Channel", 
          placeholder: "Email / Slack / Both", 
          type: "text" 
        }
      ]
    },
    {
      id: "warmup-settings",
      title: "Warmup Settings (if applicable)",
      fields: [
        { 
          id: "warmup-stage", 
          label: "Current Warmup Stage", 
          placeholder: "Week 1 / Week 2 / Cruise / Not warming", 
          type: "text" 
        },
        { 
          id: "daily-warmup-volume", 
          label: "Daily Warmup Volume", 
          placeholder: "e.g., 15 emails/day", 
          type: "number" 
        }
      ]
    }
  ]}
/>

### Reading Your MailReach Dashboard

MailReach's dashboard shows three critical metrics:

1. **Inbox Score (0-100):** Composite score across Gmail, Outlook, Yahoo
   - 90-100: Excellent
   - 75-89: Good
   - 60-74: Caution — investigate
   - &lt;60: Critical — stop sending

2. **Placement Breakdown:** % landing in inbox vs spam vs promotions per provider

3. **7-Day Trend:** Line graph showing score over time

<InsightCard icon="📊" title="The Trend Matters More Than The Score">
An inbox score of 82 that's been stable for 2 weeks? You're fine.
An inbox score of 88 that dropped from 95 in 3 days? Red alert.

Watch the **direction and velocity** of change, not just the absolute number.
</InsightCard>

<RangeSlider 
  label="What inbox placement % would trigger your 'investigate immediately' alarm?" 
  min={50} 
  max={90} 
  lowLabel="50%" 
  highLabel="90%" 
  persistKey="email-deliverability-L9-threshold" 
/>

Most experienced senders set their threshold at **75%**. Below that, something's broken.

---

## Google Postmaster Tools: The Gmail Reputation Dashboard

GlockApps and MailReach tell you where emails land. **Google Postmaster Tools** tells you why Gmail is making those decisions.

It's free, directly from Google, and shows data Gmail uses internally to filter your emails.

### What Google Postmaster Shows

1. **Domain Reputation:** High / Medium / Low / Bad
2. **IP Reputation:** High / Medium / Low / Bad (if you have a dedicated IP)
3. **Spam Rate:** % of your emails marked as spam by recipients
4. **Feedback Loop:** User-reported spam complaints
5. **Authentication:** SPF/DKIM/DMARC pass rates
6. **Encryption:** TLS encryption status

<FlipCard 
  front="Why 'Medium' Reputation Isn't Medium" 
  back="Google's scale is: High = inbox. Medium = promotions tab. Low = spam. Bad = blocked. 'Medium' means you're already being filtered." 
/>

### Setting Up Google Postmaster Tools

<ProgressiveReveal title="Google Postmaster Setup Guide" persistKey="email-deliverability-L9-postmaster-reveal">
<RevealSection title="Step 1: Add Your Domain">

1. Go to postmaster.google.com
2. Click "Add Domain" (bottom right)
3. Enter your sending domain (e.g., `getacme.com`)
4. Google provides a DNS TXT record to verify ownership
5. Add the TXT record to your DNS (via Cloudflare/Namecheap)
6. Click "Verify" in Postmaster Tools

**Wait time:** Verification takes 24-48 hours. DNS propagation + Google's verification cycle.

</RevealSection>

<RevealSection title="Step 2: Wait for Data">

Google Postmaster requires **minimum daily volume** to show data:

- Domain reputation: 100+ emails/day to Gmail addresses
- IP reputation: 1,000+ emails/day (dedicated IP only)
- Spam rate: 100+ emails/day

**During warmup:** You may not see data for 1-2 weeks. That's normal.

**At cruise speed:** With 200-400 sends/day, you'll see domain reputation and spam rate.

</RevealSection>

<RevealSection title="Step 3: Interpret Your Reputation">

**Domain Reputation Scale:**

- **High:** Green — inbox placement, good standing
- **Medium:** Yellow — promotions tab likely, watch closely
- **Low:** Orange — spam folder likely, fix immediately
- **Bad:** Red — blocked or heavily filtered, domain may be burned

**Spam Rate Scale:**

- **&lt;0.1%:** Excellent — target zone
- **0.1-0.3%:** Acceptable — monitor
- **>0.3%:** Danger — Google may start blocking

**What to do if reputation drops:**

1. Check spam rate — if spiking, pause sends immediately
2. Review recent email content for spam triggers
3. Check authentication (SPF/DKIM/DMARC) — any failures?
4. Reduce volume by 50% for 3-5 days
5. Re-test with GlockApps to confirm recovery

</RevealSection>

<RevealSection title="Step 4: Set Up Weekly Review Ritual">

Every Monday morning:

1. Check domain reputation (should be "High")
2. Check spam rate (should be &lt;0.1%)
3. Check authentication (should be 100% pass)
4. Screenshot and log in a spreadsheet

**Why log it?** Trends over time reveal problems before they become crises.

</RevealSection>
</ProgressiveReveal>

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
You can query Postmaster data via the Gmail Postmaster Tools API. Build a dashboard that pulls reputation scores daily and alerts via Slack when thresholds are crossed. API docs: developers.google.com/gmail/postmaster
</ContextualNote>

---

## Microsoft SNDS: The Outlook Reputation System

If Google Postmaster is the Gmail dashboard, **Microsoft SNDS (Smart Network Data Services)** is the Outlook equivalent.

It's clunkier, less visual, but just as critical — especially since Outlook is the harshest filter in 2025-2026.

### What SNDS Shows

1. **Sender Reputation Color Code:**
   - **Green:** Good standing
   - **Yellow:** Caution — some filtering
   - **Red:** Blocked or heavily filtered

2. **Spam Trap Hits:** How many Microsoft spam traps you've hit (should be zero)

3. **Complaint Rate:** % of recipients marking your email as spam

4. **Data Volume:** How many emails you're sending to Microsoft domains

### Setting Up Microsoft SNDS

1. Go to sendersupport.olc.protection.outlook.com/snds/
2. Click "Request Access"
3. Verify IP ownership (via SMTP test or DNS TXT record)
4. Wait 24-48 hours for approval
5. Log in and check your IP reputation

**Critical limitation:** SNDS only works if you have a **dedicated sending IP**. If you're using shared IPs (Google Workspace, most email providers), you won't see data.

**Workaround:** Use GlockApps to monitor Outlook placement instead. It's more actionable for solo founders on shared IPs.

<InsightCard icon="⚠️" title="Outlook's Silent Filtering Problem">
Unlike Gmail (which shows in Postmaster) and Yahoo (which bounces), Outlook silently routes emails to Junk. You see "delivered" in your sending tool, but the recipient never sees it.

**Solution:** GlockApps is the only reliable way to know if you're landing in Outlook inboxes.
</InsightCard>

---

## The 5 Most Common Deliverability Failures (And How to Diagnose Each)

Now that your monitoring stack is live, let's walk through the **5 failure modes** you'll encounter and the exact diagnostic steps for each.

<ClassifyExercise
  title="Classify These Deliverability Scenarios"
  persistKey="email-deliverability-L9-classify-failures"
  categories={[
    { id: "auth-failure", label: "Authentication Failure", color: "#ef4444" },
    { id: "content-spam", label: "Content Spam Triggers", color: "#f59e0b" },
    { id: "reputation-drop", label: "Reputation Drop", color: "#3b82f6" },
    { id: "volume-spike", label: "Volume Spike", color: "#8b5cf6" },
    { id: "list-quality", label: "List Quality Issue", color: "#ec4899" }
  ]}
  items={[
    { 
      id: "1", 
      content: "GlockApps shows 'DKIM: FAIL' and inbox placement dropped from 85% to 12% overnight", 
      correctCategory: "auth-failure",
      explanation: "DKIM failure means your email signature is broken. Check DNS records immediately."
    },
    { 
      id: "2", 
      content: "Inbox placement fine on Gmail (82%) but Outlook shows 18% inbox, 82% spam", 
      correctCategory: "content-spam",
      explanation: "Outlook's content filters are stricter. Likely too many links, heavy HTML, or spam trigger words."
    },
    { 
      id: "3", 
      content: "Google Postmaster domain reputation dropped from 'High' to 'Medium' over 5 days", 
      correctCategory: "reputation-drop",
      explanation: "Gradual reputation decline suggests engagement issues or rising spam complaints."
    },
    { 
      id: "4", 
      content: "You increased from 30/day to 80/day per inbox and placement dropped from 88% to 61%", 
      correctCategory: "volume-spike",
      explanation: "Too-fast volume ramp triggers ISP filters. Roll back to previous volume and ramp slower."
    },
    { 
      id: "5", 
      content: "Bounce rate jumped from 2% to 18% and spam complaints spiked", 
      correctCategory: "list-quality",
      explanation: "Bad list data — old emails, spam traps, or purchased lists. Clean your list immediately."
    }
  ]}
/>

Let's build diagnostic playbooks for each failure mode.

---

## Failure Mode 1: Authentication Failure

**Symptoms:**
- GlockApps shows SPF/DKIM/DMARC failures
- Inbox placement drops suddenly (often 50%+ drop in 24 hours)
- Google Postmaster shows authentication pass rate &lt;100%

**Root Causes:**
- DNS records changed or deleted (common after domain transfers)
- DKIM key rotated but DNS not updated
- SPF record exceeded 10 DNS lookups
- DMARC policy too strict (p=reject) without proper alignment

**Diagnostic Steps:**

<SlideNavigation>
<Slide title="Step 1: Check DNS Records">

Use MXToolbox to verify all three records:

1. Go to mxtoolbox.com/SuperTool.aspx
2. Enter your domain
3. Select "SPF Record Lookup" → verify record exists and is valid
4. Select "DKIM Lookup" → enter your selector (e.g., `google._domainkey.yourdomain.com`)
5. Select "DMARC Lookup" → verify policy

**Common issues:**
- SPF: Multiple SPF records (only one allowed)
- DKIM: Selector name mismatch between DNS and email headers
- DMARC: Typo in record syntax

</Slide>

<Slide title="Step 2: Test Email Headers">

Send a test email to mail-tester.com:

1. Go to mail-tester.com
2. Send an email to the provided address
3. Check authentication results
4. Look for "SPF: PASS", "DKIM: PASS", "DMARC: PASS"

**If any fail:**
- SPF fail → Check sending IP is in SPF record
- DKIM fail → Regenerate DKIM key and update DNS
- DMARC fail → Check alignment (From domain must match SPF/DKIM domain)

</Slide>

<Slide title="Step 3: Fix and Re-Test">

1. Update DNS records with correct values
2. Wait 15-60 minutes for propagation (set TTL to 300 for faster updates)
3. Re-test with MXToolbox and mail-tester.com
4. Send GlockApps test to confirm inbox placement recovery

**Recovery time:** 2-24 hours after DNS fix, depending on ISP caching.

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Authentication Failure Recovery Checklist" 
  persistKey="email-deliverability-L9-auth-failure"
  items={[
    "Verify SPF record via MXToolbox (no syntax errors, &lt;10 lookups)",
    "Verify DKIM record via MXToolbox (correct selector, 2048-bit key)",
    "Verify DMARC record via MXToolbox (valid syntax, rua/ruf set)",
    "Send test to mail-tester.com and confirm all three PASS",
    "Send GlockApps test and confirm inbox placement >75%",
    "Monitor Google Postmaster authentication rate (should be 100%)"
  ]} 
/>

---

## Failure Mode 2: Content Spam Triggers

**Symptoms:**
- Authentication passes (SPF/DKIM/DMARC all green)
- Inbox placement varies wildly by provider (Gmail fine, Outlook terrible)
- GlockApps flags specific spam trigger words/patterns

**Root Causes:**
- Too many links (>2 in cold email)
- Spam trigger words ("free," "guarantee," "limited time")
- Heavy HTML formatting (tables, colors, large images)
- URL shorteners (bit.ly, t.ly)
- All-caps subject lines or excessive punctuation

**Diagnostic Steps:**

<RewriteExercise
  title="Rewrite This Spam-Triggering Email"
  persistKey="email-deliverability-L9-rewrite-spam"
  original="Subject: FREE DEMO - Limited Time Offer!!!

Hi there,

I wanted to reach out about our AMAZING platform that GUARANTEES 10x ROI in 30 days or your money back!

Click here to claim your FREE trial: [bit.ly/freetrial]

Don't miss out on this LIMITED TIME offer!

Best,
Sender"
  hint="Remove spam triggers, reduce links, make it conversational and specific"
  expertRewrite="Subject: Quick question about [Company]'s content workflow

Hi [Name],

I noticed [Company] publishes 15+ posts/month on LinkedIn. Do you handle that manually or have a system?

We built a tool that cuts content production time by 60% for teams your size. Worth a 15-minute call?

[Calendar link]

Best,
[Your name]"
  criteria={[
    "Subject line is specific and conversational (no all-caps, no spam words)",
    "Body references something specific about the recipient",
    "Maximum 1 link (excluding unsubscribe)",
    "No spam trigger words (free, guarantee, limited time)",
    "Plain text or minimal HTML formatting"
  ]}
/>

**Content Spam Audit Checklist:**

<LinterFeedback
  title="Email Spam Linter"
  persistKey="email-deliverability-L9-spam-linter"
  inputLabel="Paste your email copy (subject + body)"
  rules={[
    { 
      id: "spam-words", 
      label: "Spam Trigger Words", 
      description: "Avoid: free, guarantee, limited time, act now, click here, amazing, incredible", 
      keywords: [], 
      antiKeywords: ["free", "guarantee", "limited time", "act now", "click here", "amazing", "incredible", "!!!"] 
    },
    { 
      id: "link-count", 
      label: "Link Count", 
      description: "Maximum 2 links total (1 CTA + 1 unsubscribe)", 
      keywords: ["http://", "https://"], 
      maxCount: 2 
    },
    { 
      id: "personalization", 
      label: "Personalization", 
      description: "Must reference something specific about recipient", 
      keywords: ["noticed", "saw that", "read your", "your recent"], 
      antiKeywords: ["dear sir", "to whom it may concern"] 
    },
    { 
      id: "formatting", 
      label: "Formatting", 
      description: "Plain text or minimal HTML (no tables, no heavy CSS)", 
      keywords: [], 
      antiKeywords: ["<table", "<style", "background-color", "font-size"] 
    }
  ]}
/>

**Recovery Steps:**

1. Identify spam triggers via GlockApps report
2. Rewrite email to remove triggers
3. Test new version with GlockApps
4. If placement improves, update all active sequences
5. Monitor for 3-5 days to confirm sustained improvement

---

## Failure Mode 3: Reputation Drop

**Symptoms:**
- Google Postmaster domain reputation drops from "High" to "Medium" or "Low"
- Gradual inbox placement decline over 5-10 days
- Spam complaint rate rising (>0.1%)

**Root Causes:**
- Low engagement (recipients ignoring emails)
- Rising spam complaints (recipients marking as spam)
- Sending to unengaged contacts repeatedly
- Poor list hygiene (old/stale contacts)

**Diagnostic Steps:**

<DecisionTree
  title="Reputation Drop Diagnosis"
  persistKey="email-deliverability-L9-reputation-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Google Postmaster shows domain reputation dropped to 'Medium'. What do you check first?", 
      choices: [
        { label: "Spam complaint rate", nextNodeId: "spam-rate" },
        { label: "Open/reply rates", nextNodeId: "engagement" },
        { label: "Authentication status", nextNodeId: "auth" }
      ]
    },
    { 
      id: "spam-rate", 
      content: "Spam rate is 0.18% (up from 0.04% last week). This is your primary issue. Pause sends immediately and investigate list quality.", 
      isTerminal: true, 
      outcome: "positive",
      explanation: "Rising spam complaints directly damage reputation. Pause, clean list, reduce volume."
    },
    { 
      id: "engagement", 
      content: "Open rate dropped from 38% to 12% over 10 days. Your list is stale or targeting is off. Segment and re-engage.", 
      isTerminal: true, 
      outcome: "positive",
      explanation: "Low engagement signals to ISPs that recipients don't want your emails. Improve targeting or clean list."
    },
    { 
      id: "auth", 
      content: "Authentication is 100% pass. Not the issue. Check spam rate and engagement instead.", 
      isTerminal: true, 
      outcome: "neutral",
      explanation: "Authentication failures cause sudden drops, not gradual ones. Look at engagement and complaints."
    }
  ]}
/>

**Recovery Protocol:**

1. **Immediate:** Reduce volume by 50% for 5-7 days
2. **Day 1-2:** Audit list quality
   - Remove bounces (>2% bounce rate = bad list)
   - Remove unengaged contacts (no opens in 30+ days)
   - Check for spam traps (sudden complaint spike from unknown addresses)
3. **Day 3-5:** Improve targeting
   - Segment list by engagement level (hot/warm/cold)
   - Send only to hot/warm for 1 week
   - Improve personalization (use AI research for first lines)
4. **Day 6-7:** Test and monitor
   - Send GlockApps test
   - Check Google Postmaster reputation (should stabilize or improve)
   - If stable, gradually increase volume back to normal

**Recovery time:** 7-14 days to return to "High" reputation.

---

## Failure Mode 4: Volume Spike

**Symptoms:**
- Inbox placement drops immediately after increasing send volume
- Google Postmaster shows reputation stable but placement drops
- No authentication or content issues

**Root Cause:**
- Increased volume too quickly (e.g., 30/day → 80/day in one jump)
- ISPs flag sudden volume changes as suspicious

**Diagnostic Steps:**

<ScenarioSimulator
  title="Volume Ramp Safety Calculator"
  persistKey="email-deliverability-L9-volume-simulator"
  levers={[
    { id: "current", label: "Current daily volume (per inbox)", min: 10, max: 100, step: 5, defaultValue: 30 },
    { id: "target", label: "Target daily volume (per inbox)", min: 20, max: 150, step: 5, defaultValue: 60 },
    { id: "rampDays", label: "Ramp period (days)", min: 3, max: 21, step: 1, defaultValue: 7 }
  ]}
  outputs={[
    { 
      id: "dailyIncrease", 
      label: "Daily increase", 
      formula: "((target - current) / rampDays)", 
      unit: " emails/day", 
      precision: 1 
    },
    { 
      id: "safetyScore", 
      label: "Safety score", 
      formula: "(dailyIncrease <= 3 ? 'Safe' : dailyIncrease <= 5 ? 'Moderate risk' : 'High risk')", 
      unit: "", 
      precision: 0 
    }
  ]}
  insight="Safe ramp: increase by 2-3 emails/day every 2-3 days. Your plan: {dailyIncrease} emails/day increase = {safetyScore}."
/>

**Recovery Steps:**

1. **Immediately:** Roll back to previous volume (before the spike)
2. **Wait 3-5 days** for reputation to stabilize
3. **Re-test with GlockApps** to confirm placement recovered
4. **Ramp slowly:** Increase by 2-3 emails/day every 2-3 days
5. **Monitor daily** with MailReach during ramp

**Prevention:** Never increase volume by more than 20% in a single day.

---

## Failure Mode 5: List Quality Issue

**Symptoms:**
- Bounce rate suddenly spikes (>5%)
- Spam complaint rate spikes
- Inbox placement drops across all providers
- Google Postmaster shows spam trap hits

**Root Causes:**
- Purchased or scraped lists
- Old/stale contact data (>12 months old)
- Spam traps in list
- Unverified email addresses

**Diagnostic Steps:**

1. **Check bounce rate by list source:**
   - Manually researched: &lt;2% bounce rate
   - Apollo/LinkedIn export: 2-5% bounce rate
   - Purchased list: 10-30% bounce rate (never use)

2. **Identify spam traps:**
   - Sudden complaint spike from addresses you don't recognize
   - Bounces from domains that look fake (e.g., `test@example.com`)

3. **Verify list freshness:**
   - When was data collected?
   - Have you validated emails recently?

**Recovery Steps:**

<InteractiveChecklist 
  title="List Quality Recovery Protocol" 
  persistKey="email-deliverability-L9-list-quality"
  items={[
    "Stop all sends immediately (do not send to bad list again)",
    "Export full contact list and segment by source",
    "Run email verification (NeverBounce, ZeroBounce) on entire list",
    "Remove all invalid/risky emails (bounces, catch-alls, spam traps)",
    "Remove all contacts >12 months old without recent engagement",
    "Restart sends at 50% previous volume with clean list only",
    "Monitor bounce rate (should drop to &lt;2%) and spam rate (&lt;0.1%)",
    "Gradually increase volume if metrics hold steady for 5-7 days"
  ]} 
/>

**Cost of list verification:** $5-10 per 1,000 emails (NeverBounce, ZeroBounce)

**Recovery time:** 7-14 days to rebuild reputation after list cleaning.

---

## Building Your Deliverability Dashboard

You now have 5+ monitoring tools running. Let's consolidate them into a **single weekly review dashboard**.

<TemplateBuilder
  title="Weekly Deliverability Review Dashboard"
  persistKey="email-deliverability-L9-dashboard"
  sections={[
    {
      id: "inbox-placement",
      title: "Inbox Placement (GlockApps + MailReach)",
      fields: [
        { id: "gmail-inbox", label: "Gmail inbox %", placeholder: "e.g., 87%", type: "number" },
        { id: "outlook-inbox", label: "Outlook inbox %", placeholder: "e.g., 72%", type: "number" },
        { id: "yahoo-inbox", label: "Yahoo inbox %", placeholder: "e.g., 81%", type: "number" },
        { id: "mailreach-score", label: "MailReach overall score", placeholder: "e.g., 84/100", type: "number" }
      ]
    },
    {
      id: "reputation",
      title: "Sender Reputation",
      fields: [
        { id: "postmaster-domain", label: "Google Postmaster domain reputation", placeholder: "High / Medium / Low", type: "text" },
        { id: "postmaster-spam-rate", label: "Google Postmaster spam rate", placeholder: "e.g., 0.08%", type: "number" },
        { id: "snds-status", label: "Microsoft SNDS status", placeholder: "Green / Yellow / Red (or N/A)", type: "text" }
      ]
    },
    {
      id: "engagement",
      title: "Engagement Metrics (Instantly/Smartlead)",
      fields: [
        { id: "open-rate", label: "Open rate (7-day avg)", placeholder: "e.g., 42%", type: "number" },
        { id: "reply-rate", label: "Reply rate (7-day avg)", placeholder: "e.g., 8%", type: "number" },
        { id: "bounce-rate", label: "Bounce rate (7-day avg)", placeholder: "e.g., 1.2%", type: "number" },
        { id: "unsubscribe-rate", label: "Unsubscribe rate (7-day avg)", placeholder: "e.g., 0.3%", type: "number" }
      ]
    },
    {
      id: "volume",
      title: "Sending Volume",
      fields: [
        { id: "daily-volume", label: "Daily send volume (all inboxes)", placeholder: "e.g., 280", type: "number" },
        { id: "per-inbox-avg", label: "Per-inbox average", placeholder: "e.g., 35/day", type: "number" }
      ]
    },
    {
      id: "alerts",
      title: "Alerts & Actions",
      fields: [
        { id: "issues", label: "Issues detected this week", placeholder: "List any red flags", type: "textarea" },
        { id: "actions", label: "Actions taken", placeholder: "What did you do to address issues?", type: "textarea" }
      ]
    }
  ]}
/>

**Review schedule:**
- **Monday 9am:** Fill out dashboard with latest data
- **Monday 9:30am:** Review trends (compare to last week)
- **Monday 10am:** Take action on any red flags

**Thresholds for immediate action:**

| Metric | Green Zone | Yellow Zone | Red Zone (Act Now) |
|--------|-----------|-------------|-------------------|
| Gmail inbox % | >80% | 70-80% | &lt;70% |
| Outlook inbox % | >75% | 60-75% | &lt;60% |
| Postmaster reputation | High | Medium | Low/Bad |
| Spam rate | &lt;0.1% | 0.1-0.3% | >0.3% |
| Bounce rate | &lt;2% | 2-5% | >5% |
| Open rate | >35% | 25-35% | &lt;25% |

---

## The Deliverability Fire Drill: Practice Under Pressure

Let's simulate a real deliverability crisis and practice your response.

<TimedChallenge
  title="Deliverability Fire Drill"
  persistKey="email-deliverability-L9-fire-drill"
  timeLimit={180}
  items={[
    { 
      id: "1", 
      prompt: "It's Tuesday 10am. You check MailReach and see inbox score dropped from 88 to 52 overnight. First action?", 
      correctAnswer: "pause-sends",
      options: ["pause-sends", "check-dns", "increase-volume", "ignore-it"],
      explanation: "Always pause sends first when placement drops >20 points. Prevents further damage while you diagnose."
    },
    { 
      id: "2", 
      prompt: "You paused sends. Next step?", 
      correctAnswer: "check-glockapps",
      options: ["check-glockapps", "restart-warmup", "change-content", "buy-new-domain"],
      explanation: "GlockApps shows WHERE placement dropped (Gmail vs Outlook) and WHY (auth vs content vs reputation)."
    },
    { 
      id: "3", 
      prompt: "GlockApps shows 'DKIM: FAIL' and Gmail inbox 18%. What's the issue?", 
      correctAnswer: "dns-broken",
      options: ["dns-broken", "content-spam", "list-quality", "volume-spike"],
      explanation: "DKIM failure = DNS record issue. Check MXToolbox immediately and fix the DKIM record."
    },
    { 
      id: "4", 
      prompt: "You fixed DKIM. How long before you resume sends?", 
      correctAnswer: "2-24-hours",
      options: ["immediately", "2-24-hours", "7-days", "never"],
      explanation: "Wait 2-24 hours for DNS propagation and ISP cache refresh. Test with GlockApps before resuming."
    },
    { 
      id: "5", 
      prompt: "GlockApps now shows 82% inbox. Resume at what volume?", 
      correctAnswer: "50-percent",
      options: ["100-percent", "75-percent", "50-percent", "25-percent"],
      explanation: "Resume at 50% volume for 3-5 days to rebuild reputation gradually. Monitor daily."
    }
  ]}
/>

**Post-drill debrief:**

The fire drill teaches the **5-step crisis response protocol**:

1. **Pause** — Stop sending immediately when placement drops >20%
2. **Diagnose** — Use GlockApps + Postmaster + MXToolbox to identify root cause
3. **Fix** — Address the specific issue (DNS, content, list, volume)
4. **Test** — Verify fix with GlockApps before resuming
5. **Ramp** — Resume at 50% volume, monitor for 3-5 days, then return to normal

**Time to recovery:** 2-7 days depending on issue severity.

---

## Your Monitoring Routine (Daily, Weekly, Monthly)

Let's lock in the exact monitoring cadence that keeps you ahead of problems.

### Daily (5 minutes)

<InteractiveChecklist 
  title="Daily Deliverability Check" 
  persistKey="email-deliverability-L9-daily-routine"
  items={[
    "Check MailReach inbox score (should be >75)",
    "Review Instantly/Smartlead bounce rate (should be &lt;2%)",
    "Scan for any alert emails from MailReach or Postmaster",
    "Spot-check open rates (sudden drops = investigate)"
  ]} 
/>

### Weekly (20 minutes)

<InteractiveChecklist 
  title="Weekly Deliverability Review" 
  persistKey="email-deliverability-L9-weekly-routine"
  items={[
    "Run GlockApps test on each sending domain",
    "Fill out Weekly Deliverability Dashboard (template above)",
    "Check Google Postmaster domain reputation and spam rate",
    "Review 7-day engagement trends (opens, replies, bounces)",
    "Document any issues and actions taken in dashboard"
  ]} 
/>

### Monthly (60 minutes)

<InteractiveChecklist 
  title="Monthly Deliverability Audit" 
  persistKey="email-deliverability-L9-monthly-routine"
  items={[
    "Deep-dive GlockApps test: check all 30+ providers",
    "Review DMARC reports (via Postmark or dmarcian)",
    "Audit list quality: remove unengaged contacts (no opens in 60+ days)",
    "Rotate DKIM keys (every 6-12 months)",
    "Review and update content templates (remove any new spam triggers)",
    "Test new email copy with GlockApps before deploying to campaigns"
  ]} 
/>

---

## Summary: Your Monitoring & Troubleshooting System

You've built a complete early-warning system that catches deliverability problems before they become catastrophic.

**Your monitoring stack:**

1. **GlockApps** — Weekly inbox placement testing across 30+ providers ($59/mo)
2. **MailReach** — Daily automated monitoring + warmup ($25/mo per inbox)
3. **Google Postmaster** — Gmail reputation dashboard (free)
4. **Microsoft SNDS** — Outlook reputation (free, if you have dedicated IP)
5. **MXToolbox** — DNS and authentication validation (free)

**Your diagnostic playbooks:**

1. **Authentication Failure** → Check DNS, fix SPF/DKIM/DMARC, re-test
2. **Content Spam** → Remove triggers, rewrite, test with Spam Linter
3. **Reputation Drop** → Reduce volume, clean list, improve engagement
4. **Volume Spike** → Roll back, wait, ramp slowly
5. **List Quality** → Verify emails, remove stale contacts, rebuild reputation

**Your monitoring routine:**

- **Daily:** 5-minute MailReach check + bounce rate scan
- **Weekly:** 20-minute dashboard review + GlockApps test
- **Monthly:** 60-minute deep audit + list cleaning

**Recovery times:**

- Authentication fix: 2-24 hours
- Content optimization: 3-5 days
- Reputation recovery: 7-14 days
- List quality recovery: 7-14 days

The difference between founders who maintain 80%+ inbox placement and those who burn domains every 60 days? **Consistent monitoring and fast response.**

You now have both.

<InteractiveChecklist 
  title="Lesson 9 Action Items" 
  persistKey="email-deliverability-L9-actions"
  items={[
    "Set up GlockApps account and run first test on each sending domain",
    "Configure MailReach for at least 3 primary sending inboxes",
    "Add all sending domains to Google Postmaster Tools",
    "Create Weekly Deliverability Dashboard template (copy template above)",
    "Set calendar reminders: Daily check (5 min), Weekly review (20 min), Monthly audit (60 min)",
    "Document your 'red zone' thresholds (when to pause sends immediately)",
    "Run through the Deliverability Fire Drill simulation at least once",
    "Save diagnostic playbooks (5 failure modes) for quick reference during incidents"
  ]} 
/>

---

## Quiz: Monitoring & Troubleshooting Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Your MailReach inbox score drops from 88 to 64 overnight. What's your first action?",
      "options": [
        "Immediately pause all sends from that inbox",
        "Increase warmup volume to rebuild reputation",
        "Change your email content",
        "Buy a new domain"
      ],
      "correctAnswer": 0,
      "explanation": "Always pause first when placement drops >20 points. Prevents further damage while you diagnose the root cause."
    },
    {
      "id": "q2",
      "question": "GlockApps shows 'DKIM: FAIL' and inbox placement dropped to 15%. What's the issue?",
      "options": [
        "Your email content has spam triggers",
        "Your DNS DKIM record is broken or missing",
        "You're sending too much volume",
        "Your list quality is poor"
      ],
      "correctAnswer": 1,
      "explanation": "DKIM failure is always a DNS configuration issue. Check your DKIM record in MXToolbox and regenerate if needed."
    },
    {
      "id": "q3",
      "question": "Google Postmaster shows your spam complaint rate is 0.22%. What should you do?",
      "options": [
        "Nothing, that's acceptable",
        "Monitor it but keep sending",
        "Reduce volume by 50% immediately and investigate list quality",
        "Increase volume to dilute the complaint rate"
      ],
      "correctAnswer": 2,
      "explanation": "0.22% is in the danger zone (Google blocks at 0.3%). Reduce volume immediately and clean your list to prevent domain damage."
    },
    {
      "id": "q4",
      "question": "You increased from 30/day to 75/day per inbox and placement dropped from 85% to 58%. What happened?",
      "options": [
        "Authentication failure",
        "Content spam triggers",
        "Volume spike triggered ISP filters",
        "List quality issue"
      ],
      "correctAnswer": 2,
      "explanation": "Sudden volume increases (>20% in one day) trigger ISP suspicion. Roll back to previous volume and ramp slowly (2-3 emails/day increase)."
    },
    {
      "id": "q5",
      "question": "Your bounce rate jumped from 2% to 14% overnight. What's the most likely cause?",
      "options": [
        "DNS authentication failure",
        "Bad list data (old emails or spam traps)",
        "Content spam triggers",
        "Sending too fast"
      ],
      "correctAnswer": 1,
      "explanation": "Sudden bounce rate spikes indicate list quality issues — old data, purchased lists, or spam traps. Clean your list immediately."
    },
    {
      "id": "q6",
      "question": "How often should you run GlockApps tests during the warmup phase?",
      "options": [
        "Once at the beginning",
        "Once per week",
        "Daily",
        "Only when you see problems"
      ],
      "correctAnswer": 2,
      "explanation": "During warmup, test daily to catch issues early. At cruise speed, 2-3x per week is sufficient."
    },
    {
      "id": "q7",
      "question": "Gmail inbox placement is 88% but Outlook is 22%. What's the issue?",
      "options": [
        "Authentication failure (affects all providers equally)",
        "Content spam triggers (Outlook filters are stricter)",
        "Volume spike (affects all providers equally)",
        "List quality (affects all providers equally)"
      ],
      "correctAnswer": 1,
      "explanation": "Provider-specific placement differences indicate content issues. Outlook penalizes links, HTML, and spam words more heavily than Gmail."
    },
    {
      "id": "q8",
      "question": "What's the safe maximum increase in daily sending volume per inbox?",
      "options": [
        "Double it overnight",
        "Increase by 50% per week",
        "Increase by 2-3 emails/day every 2-3 days",
        "Increase by 10 emails/day every day"
      ],
      "correctAnswer": 2,
      "explanation": "Safe ramp: 2-3 emails/day increase every 2-3 days. Faster increases trigger ISP filters and damage reputation."
    },
    {
      "id": "q9",
      "question": "Google Postmaster domain reputation dropped from 'High' to 'Medium'. How long does recovery typically take?",
      "options": [
        "24 hours",
        "3-5 days",
        "7-14 days",
        "30+ days"
      ],
      "correctAnswer": 2,
      "explanation": "Reputation recovery takes 7-14 days of reduced volume, improved engagement, and clean list hygiene. Patience is critical."
    },
    {
      "id": "q10",
      "question": "What's the minimum daily volume needed for Google Postmaster to show domain reputation data?",
      "options": [
        "10 emails/day",
        "50 emails/day",
        "100+ emails/day",
        "1,000+ emails/day"
      ],
      "correctAnswer": 2,
      "explanation": "Google Postmaster requires 100+ daily emails to Gmail addresses to display domain reputation. Below that, you won't see data."
    }
  ]
}