---
title: "Incident Playbook: When a Domain Hits Spam"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 10
---

# Incident Playbook: When a Domain Hits Spam

## The 3am Slack Message

It's Tuesday morning. You wake up to a Slack notification from your monitoring bot:

> ⚠️ **ALERT**: getacme.com inbox placement dropped to 12% (Gmail). Spam folder: 88%. Immediate action required.

Your stomach drops. Yesterday, this domain was at 85% inbox placement. You sent 180 emails across 6 inboxes. Now nearly all of them are landing in spam.

**What happened? And more importantly: what do you do in the next 60 minutes?**

This lesson is your incident response playbook. Not theory — the exact diagnostic steps, recovery protocols, and damage control tactics that separate founders who recover in 48 hours from those who lose domains permanently.

<InsightCard icon="🚨" title="The Reality of Spam Incidents">
Every sender hits spam eventually. The difference between amateurs and professionals isn't avoiding incidents — it's detecting them within 24 hours and executing a recovery protocol that works.
</InsightCard>

---

## The Anatomy of a Spam Incident

Before we fix it, you need to understand what "hitting spam" actually means.

### What Just Happened to Your Domain

When inbox placement suddenly drops, one of four things occurred:

1. **Spam Trap Hit** — You sent to a recycled or pristine spam trap address (most common)
2. **Complaint Spike** — Multiple recipients marked your email as spam in a short window
3. **Content Filter Trigger** — Your email matched a spam pattern (links, keywords, formatting)
4. **IP/Domain Reputation Drop** — Accumulated negative signals crossed a threshold

<FlipCard 
  front="What's a Spam Trap?" 
  back="An email address that exists only to catch spammers. No real person uses it. If you send to one, ISPs know you're not validating your list properly. There are two types: pristine (never used) and recycled (abandoned for 12+ months)." 
/>

### The Three Severity Levels

Not all spam incidents are equal. Your response depends on severity:

<SlideNavigation>
<Slide title="Level 1: Yellow Alert (60-80% placement)">

**Symptoms:**
- Inbox placement dropped 10-20 percentage points
- Still getting some opens and replies
- Google Postmaster shows "Low" reputation (not "Bad")

**Likely Cause:** Content pattern or minor list quality issue

**Recovery Time:** 3-7 days with protocol

**Action:** Pause, audit, adjust content, resume at 50% volume

</Slide>

<Slide title="Level 2: Orange Alert (30-60% placement)">

**Symptoms:**
- Inbox placement dropped 30-50 percentage points
- Open rates near zero
- Google Postmaster shows "Bad" reputation
- Microsoft SNDS shows yellow or red

**Likely Cause:** Spam trap hit or multiple complaints

**Recovery Time:** 14-30 days

**Action:** Full stop on domain, investigate list source, rest domain 14+ days

</Slide>

<Slide title="Level 3: Red Alert (&lt;30% placement)">

**Symptoms:**
- Inbox placement below 30%
- Bounces increasing
- Domain may be blacklisted (check MXToolbox)
- Postmaster data stops updating (too few delivered)

**Likely Cause:** Multiple spam traps, blacklist addition, or sustained complaint rate

**Recovery Time:** 30-90 days (or domain retirement)

**Action:** Immediate full stop, blacklist removal requests, consider domain retirement

</Slide>
</SlideNavigation>

<PredictionGate
  question="A founder's domain drops from 82% to 45% inbox placement overnight. They immediately send 200 more emails to 'test if it's real.' What happens next?"
  persistKey="email-deliverability-L10-predict-test"
  type="choice"
  choices={[
    { id: "a", text: "Placement recovers as ISPs see engagement" },
    { id: "b", text: "Placement drops further to &lt;20%" },
    { id: "c", text: "Nothing changes, stays at 45%" }
  ]}
  correctId="b"
>

**Placement dropped to 18% within 24 hours.**

Sending more volume during an incident is like accelerating when your engine light comes on. Every email that lands in spam **reinforces** the negative reputation signal. ISPs interpret continued sending as "this sender doesn't care about spam complaints."

The correct move: **immediate full stop** on that domain.

</PredictionGate>

---

## The 60-Minute Diagnostic Protocol

When you detect a spam incident, you have a 60-minute window to gather data before deciding on a response. Here's the exact checklist:

<InteractiveChecklist 
  title="Spam Incident Diagnostic (Complete Within 60 Minutes)" 
  persistKey="email-deliverability-L10-diagnostic"
  items={[
    "Check Google Postmaster Tools — note domain reputation score and spam rate",
    "Check Microsoft SNDS — note color status (green/yellow/red)",
    "Run GlockApps or MailReach inbox placement test — get current Gmail/Outlook/Yahoo breakdown",
    "Check MXToolbox blacklist status — search for your sending domain and IP",
    "Review last 48 hours of sends — identify any new list sources, content changes, or volume spikes",
    "Check complaint rate in sending tool (Instantly/Smartlead) — calculate percentage",
    "Review bounce rate — sudden increase suggests list quality issue",
    "Check warmup tool status — confirm warmup emails still delivering",
    "Document baseline metrics — save screenshots of Postmaster, SNDS, GlockApps for comparison",
    "Pause all cold sending from affected domain immediately"
  ]}
/>

### Reading the Signals

Each data point tells you something specific:

<ClassifyExercise
  title="Classify These Diagnostic Signals"
  persistKey="email-deliverability-L10-classify-signals"
  categories={[
    { id: "spam-trap", label: "Spam Trap Hit", color: "#ef4444" },
    { id: "complaints", label: "Complaint Spike", color: "#f59e0b" },
    { id: "content", label: "Content Filter", color: "#3b82f6" },
    { id: "list-quality", label: "List Quality Issue", color: "#8b5cf6" }
  ]}
  items={[
    { id: "1", content: "Bounce rate jumped from 2% to 18% overnight", correctCategory: "list-quality" },
    { id: "2", content: "Gmail placement fine, but Outlook dropped to 15%", correctCategory: "content" },
    { id: "3", content: "Google Postmaster spam rate went from 0.02% to 0.8% in one day", correctCategory: "complaints" },
    { id: "4", content: "Placement dropped exactly after importing a new 500-contact list", correctCategory: "spam-trap" },
    { id: "5", content: "All metrics fine except one inbox — that inbox at 5% placement", correctCategory: "spam-trap" },
    { id: "6", content: "MXToolbox shows domain on Spamhaus blacklist", correctCategory: "spam-trap" }
  ]}
/>

---

## Recovery Protocol by Severity Level

Now that you've diagnosed the issue, here's what to do:

### Level 1 Recovery: Yellow Alert (60-80% placement)

<ProgressiveReveal title="7-Day Yellow Alert Recovery Plan" persistKey="email-deliverability-L10-yellow-recovery">

<RevealSection title="Day 1: Immediate Actions">

**Hour 1:**
- Pause all cold sending from affected domain
- Keep warmup running (warmup emails help rebuild reputation)
- Document current metrics (Postmaster, SNDS, GlockApps)

**Hour 2-24:**
- Audit last 100 emails sent for content issues:
  - Count links per email (should be ≤2)
  - Check for spam trigger words ("free," "guarantee," "limited time")
  - Review personalization quality (generic = spam signal)
- Check list source: any new imports in last 48 hours?
- Review complaint rate: if >0.1%, identify which segment complained

</RevealSection>

<RevealSection title="Days 2-3: Content and List Fixes">

**Content Adjustments:**
- Reduce links to 1 per email (excluding unsubscribe)
- Switch to plain text or minimal HTML
- Shorten emails to &lt;100 words
- Increase personalization depth (reference specific company details)

**List Cleanup:**
- Remove any contacts added in last 48 hours if source is questionable
- Run email validation on entire list (NeverBounce, ZeroBounce)
- Remove all bounces and unsubscribes immediately

**Testing:**
- Send 5 test emails to seed addresses (Gmail, Outlook, Yahoo)
- Check placement with GlockApps
- If placement >70%, proceed to Day 4. If not, extend rest period.

</RevealSection>

<RevealSection title="Days 4-7: Gradual Resume">

**Volume Ramp:**
- Day 4: Resume at 25% of previous volume (e.g., 50/day → 12/day)
- Day 5: If placement holds, increase to 40%
- Day 6: Increase to 60%
- Day 7: Return to 80-100% if all metrics green

**Monitoring:**
- Check Postmaster daily
- Run GlockApps test every other day
- If placement drops below 75% at any point, pause again for 48 hours

</RevealSection>

</ProgressiveReveal>

### Level 2 Recovery: Orange Alert (30-60% placement)

This is serious. You likely hit a spam trap or had multiple complaints.

<TemplateBuilder
  title="Orange Alert Recovery Plan"
  persistKey="email-deliverability-L10-orange-plan"
  sections={[
    {
      id: "immediate",
      title: "Immediate Actions (Day 1)",
      fields: [
        { id: "pause-confirm", label: "Confirm full stop on domain", placeholder: "Yes, all cold sending paused", type: "text" },
        { id: "warmup-status", label: "Warmup tool status", placeholder: "e.g., MailReach still running", type: "text" },
        { id: "blacklist-check", label: "Blacklist status (MXToolbox)", placeholder: "e.g., Clean / Listed on Spamhaus", type: "text" },
        { id: "postmaster-score", label: "Google Postmaster reputation", placeholder: "e.g., Bad / Low", type: "text" }
      ]
    },
    {
      id: "investigation",
      title: "Root Cause Investigation (Days 2-3)",
      fields: [
        { id: "list-source", label: "Where did your list come from?", placeholder: "e.g., Apollo export, LinkedIn scrape, purchased list", type: "textarea" },
        { id: "new-contacts", label: "Any new contacts added in last 7 days?", placeholder: "e.g., 200 contacts from new Apollo search", type: "textarea" },
        { id: "complaint-rate", label: "Complaint rate from sending tool", placeholder: "e.g., 0.15% (3 complaints out of 2,000 sends)", type: "text" },
        { id: "content-changes", label: "Any content or template changes recently?", placeholder: "e.g., Added 3 links, changed CTA", type: "textarea" }
      ]
    },
    {
      id: "recovery",
      title: "Recovery Actions (Days 4-14)",
      fields: [
        { id: "rest-period", label: "Domain rest period", placeholder: "e.g., 14 days full rest", type: "text" },
        { id: "list-cleanup", label: "List cleanup actions taken", placeholder: "e.g., Removed 200 new contacts, validated entire list with NeverBounce", type: "textarea" },
        { id: "content-fixes", label: "Content changes for resume", placeholder: "e.g., Plain text only, 1 link max, &lt;75 words", type: "textarea" },
        { id: "resume-volume", label: "Resume volume plan", placeholder: "e.g., Start at 10/day, increase by 5/day if placement >60%", type: "textarea" }
      ]
    }
  ]}
/>

**Key Orange Alert Rules:**

1. **Minimum 14-day rest** — No cold sending. Warmup only.
2. **Full list re-validation** — Every contact must pass email validation.
3. **Content reset** — Plain text, minimal links, maximum personalization.
4. **50% volume reduction** — When you resume, stay at half your previous volume for 30 days.

### Level 3 Recovery: Red Alert (&lt;30% placement)

At this severity, you're deciding between aggressive recovery or domain retirement.

<DecisionTree
  title="Red Alert: Recover or Retire?"
  persistKey="email-deliverability-L10-red-decision"
  startNodeId="start"
  nodes={[
    {
      id: "start",
      content: "Your domain is at &lt;30% placement. First question: Is it blacklisted?",
      choices: [
        { label: "Yes, on Spamhaus or similar", nextNodeId: "blacklisted" },
        { label: "No, clean on MXToolbox", nextNodeId: "not-blacklisted" }
      ]
    },
    {
      id: "blacklisted",
      content: "Blacklisted domains are very hard to recover. How old is this domain?",
      choices: [
        { label: "Less than 6 months old", nextNodeId: "retire-young" },
        { label: "6+ months, has sent successfully before", nextNodeId: "delist-attempt" }
      ]
    },
    {
      id: "not-blacklisted",
      content: "Not blacklisted is good. What's your Google Postmaster reputation?",
      choices: [
        { label: "Bad (red)", nextNodeId: "bad-reputation" },
        { label: "Low (yellow) or no data", nextNodeId: "low-reputation" }
      ]
    },
    {
      id: "retire-young",
      content: "**Recommendation: Retire this domain.** Young domains that hit blacklists rarely recover. Cost to replace: $12. Time to recover: 60-90 days. Not worth it.",
      isTerminal: true,
      outcome: "negative"
    },
    {
      id: "delist-attempt",
      content: "**Attempt delisting.** Submit removal request to Spamhaus/SURBL. Rest domain 30 days. If delisted, follow 60-day recovery protocol. If denied, retire domain.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "bad-reputation",
      content: "**60-day recovery protocol required.** Full stop for 30 days. Warmup only. Then resume at 10/day with perfect content. Monitor daily. 40% chance of recovery.",
      isTerminal: true,
      outcome: "neutral"
    },
    {
      id: "low-reputation",
      content: "**30-day recovery possible.** Rest 14 days, audit list completely, resume at 20% volume. Better odds than 'Bad' reputation.",
      isTerminal: true,
      outcome: "positive"
    }
  ]}
/>

<ExampleCard label="Case Study: The $12 Decision">

**Founder:** Jamie, B2B SaaS, $8K MRR

**Incident:** Imported 500 contacts from a "verified B2B list" purchased on Fiverr. Within 48 hours, domain dropped to 22% placement. Blacklisted on Spamhaus.

**Decision Point:** Spend 60-90 days trying to recover the domain, or retire it and spin up a new one?

**Jamie's Choice:** Retired the domain immediately. Reasoning:
- Domain was only 3 months old (low sunk cost)
- Blacklist removal success rate: ~30%
- Recovery time: 60-90 days minimum
- New domain cost: $12 + 14 days warmup

**Outcome:** New domain (tryjamie.com) operational in 16 days. Lost 2 weeks vs. potentially 3 months.

**Lesson:** Sometimes the fastest path forward is a fresh start.

</ExampleCard>

---

## The Blacklist Removal Process

If your domain lands on a blacklist, here's the step-by-step removal protocol:

<SlideNavigation>
<Slide title="Step 1: Identify Which Blacklist">

**Check MXToolbox Blacklist Status:**
- Go to https://mxtoolbox.com/blacklists.aspx
- Enter your sending domain
- Note which blacklists show your domain

**Common Blacklists:**
- **Spamhaus** (most impactful for Gmail/Outlook)
- **SURBL** (URL-based, triggered by links in emails)
- **Barracuda** (affects corporate email filters)
- **SpamCop** (community-driven, less critical)

</Slide>

<Slide title="Step 2: Submit Removal Request">

**For Spamhaus:**
1. Go to https://check.spamhaus.org/
2. Enter your domain or IP
3. Click "lookup"
4. If listed, click the listing for removal instructions
5. Fill out removal form (requires explanation of what you fixed)

**For SURBL:**
1. Go to http://www.surbl.org/surbl-analysis
2. Check if your domain is listed
3. Submit removal via their contact form
4. Explain: "Removed offending links, implemented list validation"

**Typical Response Time:** 24-72 hours

</Slide>

<Slide title="Step 3: Fix Root Cause">

**Before submitting removal, you MUST fix the issue:**

- Remove all purchased or scraped lists
- Validate entire list with NeverBounce/ZeroBounce
- Implement double opt-in for new contacts
- Reduce links to 1 per email
- Add prominent unsubscribe link

**Blacklists check if you fixed the problem.** If you submit removal without changes, they'll deny or re-list you immediately.

</Slide>

<Slide title="Step 4: Monitor Post-Removal">

**After removal:**
- Wait 48 hours for DNS propagation
- Test with GlockApps
- Resume sending at 10% volume
- Check blacklist status daily for 14 days
- If re-listed, retire the domain

**Re-listing Rate:** ~20% within 30 days if root cause not fully addressed

</Slide>
</SlideNavigation>

---

## Content Forensics: What Triggered the Filter?

Sometimes the issue isn't your list — it's your email content. Here's how to audit:

<LinterFeedback
  title="Spam Content Linter"
  persistKey="email-deliverability-L10-content-linter"
  inputLabel="Paste the email that triggered the spam incident"
  rules={[
    {
      id: "link-count",
      label: "Link Count",
      description: "Should have ≤2 links total (including unsubscribe)",
      keywords: ["http://", "https://"],
      threshold: 2,
      severity: "high"
    },
    {
      id: "spam-words",
      label: "Spam Trigger Words",
      description: "Avoid: free, guarantee, limited time, act now, click here",
      antiKeywords: ["free", "guarantee", "limited time", "act now", "click here", "buy now", "order now"],
      severity: "high"
    },
    {
      id: "personalization",
      label: "Personalization Depth",
      description: "Should reference specific company/person details",
      keywords: ["{{", "noticed", "saw that", "your recent"],
      threshold: 1,
      severity: "medium"
    },
    {
      id: "length",
      label: "Email Length",
      description: "Cold emails should be &lt;125 words",
      maxWords: 125,
      severity: "medium"
    },
    {
      id: "images",
      label: "Image Count",
      description: "Avoid images in cold outreach",
      keywords: ["<img", "!["],
      threshold: 0,
      severity: "medium"
    },
    {
      id: "all-caps",
      label: "ALL CAPS Usage",
      description: "Avoid words in all caps",
      pattern: /\b[A-Z]{4,}\b/g,
      threshold: 0,
      severity: "low"
    }
  ]}
/>

### The "Before and After" Content Fix

<ComparisonBuilder
  title="Rewrite Your Spam-Triggering Email"
  persistKey="email-deliverability-L10-content-rewrite"
  prompt="Rewrite the email that triggered spam placement"
  expertExample="Hi {{firstName}},

Noticed {{companyName}} posted about scaling your content team last week.

Most agencies we work with hit a wall at 50 posts/month — manual QA becomes the bottleneck.

We built a tool that cuts QA time by 60% using AI-assisted review. {{competitorName}} went from 50 to 120 posts/month in 6 weeks.

Worth a 15-minute demo?

Best,
[Your name]"
  criteria={[
    "Under 100 words",
    "Maximum 1 link (excluding unsubscribe)",
    "Specific company/person reference",
    "No spam trigger words",
    "Clear, single CTA"
  ]}
/>

---

## The Domain Retirement Decision Matrix

Sometimes recovery isn't worth it. Here's when to retire a domain:

<StrategyDuel
  title="Recover vs. Retire Decision"
  persistKey="email-deliverability-L10-retire-duel"
  scenario="Your domain hit &lt;30% placement. It's been sending for 2 months. You have 4 other sending domains."
  strategyA={{
    name: "Attempt Recovery",
    description: "60-day recovery protocol: 30 days rest, 30 days gradual ramp",
    pros: [
      "Preserve domain age (2 months invested)",
      "Learn recovery process for future",
      "Avoid $12 domain replacement cost"
    ],
    cons: [
      "60-90 days before full volume",
      "40% success rate",
      "Ongoing monitoring burden",
      "Risk of re-listing"
    ]
  }}
  strategyB={{
    name: "Retire and Replace",
    description: "Abandon domain, register new one, 14-day warmup",
    pros: [
      "Back to full volume in 14 days",
      "Clean slate, no blacklist risk",
      "Minimal cost ($12 domain)",
      "Less monitoring stress"
    ],
    cons: [
      "Lose 2 months of domain age",
      "Need to configure DNS again",
      "Slightly higher spam risk for first 30 days (new domain)"
    ]
  }}
  expertVerdict="**Retire and replace.** For solo founders, time is more valuable than $12. A 2-month-old domain has minimal age benefit. The 60-day recovery timeline means you're essentially starting over anyway — but with a tainted domain. Fresh domain = fresh start in 14 days vs. 60-90 days of uncertain recovery."
/>

### The Retirement Checklist

<InteractiveChecklist
  title="Domain Retirement Protocol"
  persistKey="email-deliverability-L10-retirement"
  items={[
    "Export all contacts from retired domain's campaigns",
    "Pause all campaigns using retired domain",
    "Remove retired domain from sending rotation in Instantly/Smartlead",
    "Keep domain registered (don't let it expire — someone else might buy it and damage your brand)",
    "Set up 301 redirect from retired domain to main domain",
    "Register replacement domain (follow naming strategy from Lesson 4)",
    "Configure DNS for replacement domain (SPF, DKIM, DMARC)",
    "Start 14-day warmup on replacement domain",
    "Document incident in your deliverability log (what happened, what you learned)",
    "Update your monitoring dashboard to track replacement domain"
  ]}
/>

---

## Prevention: The 7 Rules to Never Hit Spam Again

Recovery is hard. Prevention is easier. Commit to these 7 rules:

<FlipCard front="Rule 1: Never Buy Lists" back="Purchased lists are 90% spam traps and dead emails. One $50 list can kill a $12 domain and cost you 60 days. Not worth it." />

<FlipCard front="Rule 2: Validate Before Sending" back="Run every new contact through NeverBounce or ZeroBounce before adding to campaigns. Cost: $0.008/email. Spam trap hit cost: $12 domain + 60 days. ROI: 1000x." />

<FlipCard front="Rule 3: Monitor Daily" back="Check Google Postmaster and GlockApps every single day during active campaigns. Catch incidents at 70% placement, not 20%." />

<FlipCard front="Rule 4: Respect Unsubscribes Instantly" back="Remove unsubscribes within 1 hour. One person who unsubscribes and still gets email = guaranteed spam complaint." />

<FlipCard front="Rule 5: Keep Warmup Running Forever" back="Warmup isn't a one-time thing. Keep 15-20 warmup emails/day running even at cruise speed. It's reputation insurance." />

<FlipCard front="Rule 6: Rotate Domains Proactively" back="Every 90 days, rest one domain for 14 days while another comes off warmup. Prevents reputation fatigue." />

<FlipCard front="Rule 7: Content > Volume" back="Sending 200 highly personalized emails beats 400 generic ones. Quality content = fewer complaints = better long-term reputation." />

---

## Your Incident Response Playbook

Let's build your custom playbook based on your setup:

<TemplateBuilder
  title="My Spam Incident Response Playbook"
  persistKey="email-deliverability-L10-playbook"
  sections={[
    {
      id: "monitoring",
      title: "Daily Monitoring Checklist",
      fields: [
        { id: "tools", label: "Tools I check daily", placeholder: "e.g., Google Postmaster, Microsoft SNDS, GlockApps", type: "textarea" },
        { id: "alert-threshold", label: "Placement drop that triggers investigation", placeholder: "e.g., Drop below 75%", type: "text" },
        { id: "notification", label: "How I get alerted", placeholder: "e.g., Slack bot, email digest, manual check", type: "text" }
      ]
    },
    {
      id: "yellow-alert",
      title: "Yellow Alert Response (60-80% placement)",
      fields: [
        { id: "yellow-pause", label: "Immediate action", placeholder: "e.g., Pause domain, keep warmup running", type: "text" },
        { id: "yellow-audit", label: "What I audit first", placeholder: "e.g., Last 100 emails for content issues, check list source", type: "textarea" },
        { id: "yellow-resume", label: "Resume criteria", placeholder: "e.g., Placement back above 75% for 48 hours", type: "text" }
      ]
    },
    {
      id: "orange-alert",
      title: "Orange Alert Response (30-60% placement)",
      fields: [
        { id: "orange-rest", label: "Rest period", placeholder: "e.g., 14 days minimum", type: "text" },
        { id: "orange-cleanup", label: "List cleanup actions", placeholder: "e.g., Re-validate entire list, remove last 7 days of imports", type: "textarea" },
        { id: "orange-resume", label: "Resume volume", placeholder: "e.g., Start at 25% of previous volume", type: "text" }
      ]
    },
    {
      id: "red-alert",
      title: "Red Alert Response (&lt;30% placement)",
      fields: [
        { id: "red-decision", label: "Recover or retire decision criteria", placeholder: "e.g., If blacklisted + &lt;6 months old = retire. Otherwise attempt 60-day recovery.", type: "textarea" },
        { id: "red-replacement", label: "Replacement domain naming", placeholder: "e.g., Next in rotation: useacme.com", type: "text" },
        { id: "red-timeline", label: "Expected timeline to full volume", placeholder: "e.g., 14 days if retire, 60-90 days if recover", type: "text" }
      ]
    },
    {
      id: "contacts",
      title: "Emergency Contacts & Resources",
      fields: [
        { id: "dns-access", label: "Who has DNS access", placeholder: "e.g., Me + VA backup", type: "text" },
        { id: "blacklist-links", label: "Blacklist removal links", placeholder: "e.g., Spamhaus: https://check.spamhaus.org/", type: "textarea" },
        { id: "backup-domains", label: "Backup domains ready to activate", placeholder: "e.g., useacme.com (warmed), hiacme.com (in warmup)", type: "textarea" }
      ]
    }
  ]}
/>

---

## Simulation: The Friday Afternoon Incident

Let's practice. It's Friday at 4pm. You're about to log off for the weekend.

<MiniRoleplay
  scenario="You check your monitoring dashboard. One domain dropped from 78% to 52% placement in the last 6 hours. You sent 90 emails today across 3 inboxes on that domain. What's your immediate response?"
  role="You are the founder making the call"
  persistKey="email-deliverability-L10-friday-roleplay"
  modelResponse="Immediate actions:

1. **Pause all campaigns on that domain** — Don't send another email until Monday.
2. **Keep warmup running** — Warmup helps rebuild reputation.
3. **Check Google Postmaster** — Note current reputation score.
4. **Run GlockApps test** — Get exact Gmail/Outlook/Yahoo breakdown.
5. **Document metrics** — Screenshot everything for Monday comparison.
6. **Set Monday calendar block** — 60-minute diagnostic session first thing.

**Do NOT:**
- Send more emails to 'test' if it's real
- Panic and change DNS records
- Import a new list to 'make up' for lost volume

**Weekend plan:** Let the domain rest. Check metrics Monday morning. If still below 70%, execute Orange Alert protocol."
/>

---

## Summary: Your Spam Incident Survival Kit

<InteractiveChecklist
  title="Post-Lesson Action Items"
  persistKey="email-deliverability-L10-actions"
  items={[
    "Set up daily monitoring alerts for all sending domains (Google Postmaster + GlockApps)",
    "Create a 'Spam Incident Response' doc with your custom playbook from this lesson",
    "Add calendar reminder: Weekly domain health check (15 min every Monday)",
    "Identify your 'retire vs. recover' threshold (e.g., &lt;30% placement + blacklisted = retire)",
    "Prepare one backup domain in warmup status (insurance policy)",
    "Save blacklist removal links (Spamhaus, SURBL) in your playbook",
    "Run a test incident drill: Pause one domain, execute diagnostic protocol, document time taken",
    "Review last 30 days of sends — identify any patterns that could trigger future incidents"
  ]}
/>

### Key Takeaways

1. **Detection speed matters more than prevention perfection** — You will hit spam eventually. Catching it at 70% vs. 20% is the difference between 7 days and 60 days recovery.

2. **The 60-minute diagnostic protocol is non-negotiable** — Gather data before making decisions. Panic responses make things worse.

3. **Sometimes retirement beats recovery** — For domains &lt;6 months old, a fresh start is often faster and cheaper than a 60-90 day recovery attempt.

4. **Content quality prevents 80% of incidents** — Most spam hits come from generic content + poor list quality, not technical issues.

5. **Keep warmup running forever** — It's not a one-time setup. Ongoing warmup is reputation insurance.

---

## What's Next

In **Lesson 11: Advanced Monitoring & Reputation Management**, you'll build a complete monitoring dashboard that tracks all your domains in real-time, sets up automated alerts, and gives you early warning before incidents happen.

You'll learn:
- How to build a custom monitoring dashboard (Google Sheets + Zapier)
- Setting up automated alerts (Slack/email when placement drops)
- Reading Google Postmaster trends (not just current score)
- Proactive reputation management (rotating domains before issues)
- The "reputation budget" concept (how much risk you can take)

**Before next lesson:** Run the 60-minute diagnostic protocol on all your current sending domains, even if they're healthy. Practice makes perfect.