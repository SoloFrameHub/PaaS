---
title: "Reference Stack 1: Lean Email-First (~$120/month)"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 24: AI Outreach Automation"
lesson: 10
---

## The $120 Question

You've spent 9 lessons learning platforms, sequences, personalization, and compliance. Now comes the moment of truth: **What do you actually buy?**

Here's the reality: Most solo founders waste their first $200/month on the wrong stack. They buy Lemlist for multi-channel ($99), add Apollo for enrichment ($49), throw in Loom for video ($15), and suddenly they're at $163/month before they've sent a single email. Then they realize they need warmup, so they add Instantly ($37), and now they're at $200 with overlapping tools and zero emails sent.

**The smarter path?** Start lean. Prove the channel works. Scale when revenue justifies it.

This lesson gives you three battle-tested reference stacks, each under $200/month, each optimized for a specific founder type and outreach volume. You'll walk away with a shopping list, setup sequence, and 30-day ramp plan.

<InsightCard icon="💰" title="The Stack Paradox">
The best outreach stack isn't the one with the most features — it's the one you'll actually use consistently for 90 days.
</InsightCard>

---

## Reference Stack 1: Lean Email-First (~$120/month)

**Who this is for:**
- Solo founders doing &lt;500 emails/week
- Testing cold email for the first time
- Budget-conscious ($100-150/month max)
- Email-only strategy (no LinkedIn automation yet)

**The Philosophy:** Email is the highest-ROI channel for solo founders. Master it before adding complexity. This stack gives you everything you need to send personalized, deliverable cold emails at scale — and nothing you don't.

### The Stack Breakdown

<SlideNavigation>
<Slide title="Core Platform: Instantly Growth ($37/mo)">

**What you get:**
- Unlimited email accounts (connect 3-5 domains)
- 5,000 active contacts
- 5,000 emails/month (enough for 250/week across 2 campaigns)
- Built-in unlimited warmup (no extra cost)
- A/B testing (up to 26 variants per step)
- Basic AI writer for first lines
- Lead Finder (1,000 B2B leads/month)

**Why Instantly over Smartlead?**
- $2/month cheaper
- Simpler UI (faster to learn)
- Better built-in A/B testing
- Lead Finder included (saves $39-49/mo on Apollo)

**Setup time:** 2-3 hours (domain connection + warmup config)

<ExampleCard label="Real Setup: Technical Founder">
Alex connected 3 domains (main + 2 secondaries), started warmup on Day 1, waited 14 days, then launched at 25 emails/day per domain. By Week 4, sending 375/week with 8% reply rate. Total cost: $37/month.
</ExampleCard>

</Slide>

<Slide title="Enrichment: Apollo Free + Clay Free ($0/mo)">

**Apollo.io Free Plan:**
- 50 mobile credits/month
- 60 export credits/month
- Unlimited email credits
- Basic filters (industry, company size, tech stack)

**How to use it:**
1. Build lists in Apollo (use all filters)
2. Export 60 contacts/month (your Tier A prospects)
3. Use email credits for Tier B (no export, just email addresses)

**Clay Free Plan:**
- 100 credits/month
- Enough for 100 AI-personalized first lines
- Waterfall enrichment (Apollo → Hunter → Clearbit)

**Strategy:** Use Apollo for list building, Clay for personalizing your top 100 prospects/month. For the other 400, use Instantly's AI writer.

<InsightCard icon="🎯" title="The 80/20 Enrichment Rule">
Spend enrichment credits on your Tier A (top 20%). Use template personalization for Tier B. This keeps costs at $0 while maximizing reply rates where it matters.
</InsightCard>

</Slide>

<Slide title="Domains: Namecheap Secondaries ($24/year = $2/mo each)">

**The Setup:**
- Main domain: yourbrand.com (keep clean, no cold email)
- Secondary 1: yourbrand.co ($12/year)
- Secondary 2: yourbrand.io ($12/year)

**Why secondaries?**
- Protect main domain reputation
- Spread sending across multiple IPs
- If one gets flagged, others stay clean

**DNS Setup (per domain):**
- SPF: `v=spf1 include:_spf.instantly.ai ~all`
- DKIM: Instantly auto-generates, you copy to DNS
- DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@yourbrand.com`
- Custom tracking domain: track.yourbrand.co

**Cost:** $24/year for 2 domains = $2/month

</Slide>

<Slide title="Email Accounts: Google Workspace ($12/mo)">

**The Lean Setup:**
- 2 Google Workspace accounts ($6/user/month)
- alex@yourbrand.co
- hello@yourbrand.io

**Why Google Workspace over Gmail?**
- Better deliverability (Google trusts Workspace more)
- Custom domain email
- Admin controls for security

**Alternative (even leaner):** Use Zoho Mail ($1/user/month) for secondaries. Total: $2/month for 2 accounts. But Google has better deliverability.

**Warmup Strategy:**
- Connect both to Instantly
- Enable warmup immediately
- Wait 14 days before sending cold emails
- Start at 25 sends/day per account, scale to 50-75 over 2 weeks

</Slide>

<Slide title="Optional Add-Ons (Stay Under $150)">

**Loom Free ($0/mo):**
- 25 videos/month
- Use for Tier A follow-ups only
- Personal video = 2-3x reply rate boost

**Hunter.io Free ($0/mo):**
- 25 email verifications/month
- Use for high-value prospects when Apollo doesn't have email

**ChatGPT Plus ($20/mo) — Optional:**
- Better AI personalization than Instantly's built-in
- Paste 10 prospects → generate custom first lines
- Only add if you're maxing out Clay's 100 credits

**Total with ChatGPT:** $37 + $12 + $2 + $20 = **$71/month**
**Total without:** $37 + $12 + $2 = **$51/month**

</Slide>
</SlideNavigation>

### Stack 1 Total Cost Breakdown

<InteractiveChecklist 
  title="Your Lean Stack Shopping List" 
  persistKey="ai-outreach-automation-L10-stack1-checklist"
  items={[
    "Instantly Growth plan ($37/mo) — Core platform",
    "Google Workspace (2 accounts @ $6/mo each = $12/mo) — Email accounts",
    "Namecheap domains (2 @ $12/year = $2/mo) — Secondary domains",
    "Apollo Free + Clay Free ($0/mo) — Enrichment",
    "Loom Free ($0/mo) — Video messages for Tier A",
    "Optional: ChatGPT Plus ($20/mo) — Better AI personalization"
  ]}
/>

**Total Monthly Cost:**
- **Minimum:** $51/month (Instantly + Google + Domains)
- **Recommended:** $71/month (add ChatGPT Plus)
- **Maximum capacity:** 500 emails/week, 2,000/month

---

## The 30-Day Ramp Plan

You've bought the tools. Now what? Here's the exact sequence to go from $0 to sending 500 personalized emails/week.

<TemplateBuilder
  title="Your 30-Day Launch Plan"
  persistKey="ai-outreach-automation-L10-ramp-plan"
  sections={[
    {
      id: "week1",
      title: "Week 1: Infrastructure Setup",
      fields: [
        { 
          id: "domains", 
          label: "Domains Purchased", 
          placeholder: "e.g., mybrand.co, mybrand.io", 
          type: "text" 
        },
        { 
          id: "workspace", 
          label: "Google Workspace Accounts Created", 
          placeholder: "e.g., alex@mybrand.co, hello@mybrand.io", 
          type: "text" 
        },
        { 
          id: "dns", 
          label: "DNS Records Configured (SPF, DKIM, DMARC)", 
          placeholder: "Paste confirmation or 'Done'", 
          type: "textarea" 
        },
        { 
          id: "instantly", 
          label: "Instantly Account + Inboxes Connected", 
          placeholder: "Number of inboxes connected", 
          type: "text" 
        }
      ]
    },
    {
      id: "week2",
      title: "Week 2: Warmup Period",
      fields: [
        { 
          id: "warmup-start", 
          label: "Warmup Started (Date)", 
          placeholder: "e.g., Jan 15, 2026", 
          type: "text" 
        },
        { 
          id: "warmup-settings", 
          label: "Warmup Settings (Emails/day per inbox)", 
          placeholder: "e.g., Start at 10/day, increase by 5 every 3 days", 
          type: "textarea" 
        },
        { 
          id: "list-building", 
          label: "First 500 Prospects Identified (Apollo + Clay)", 
          placeholder: "Describe your ICP and list source", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "week3",
      title: "Week 3: Sequence Creation + Testing",
      fields: [
        { 
          id: "sequence", 
          label: "First Sequence Built (5-step email-only)", 
          placeholder: "Paste sequence structure or link", 
          type: "textarea" 
        },
        { 
          id: "ab-test", 
          label: "A/B Test Configured (Subject lines or first lines)", 
          placeholder: "Describe your test variants", 
          type: "textarea" 
        },
        { 
          id: "test-batch", 
          label: "Test Batch Sent (50 emails to validate deliverability)", 
          placeholder: "Results: open rate, reply rate, spam rate", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "week4",
      title: "Week 4: Full Launch",
      fields: [
        { 
          id: "daily-volume", 
          label: "Daily Send Volume (Start at 25/inbox, scale to 50-75)", 
          placeholder: "e.g., 50 emails/day across 2 inboxes = 100/day", 
          type: "text" 
        },
        { 
          id: "monitoring", 
          label: "Monitoring Setup (Daily checks on open/reply/bounce rates)", 
          placeholder: "What metrics are you tracking?", 
          type: "textarea" 
        },
        { 
          id: "first-results", 
          label: "Week 4 Results (Emails sent, replies, meetings booked)", 
          placeholder: "e.g., 350 sent, 28 replies (8%), 5 meetings", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

<InsightCard icon="⚡" title="The Critical Week 2 Mistake">
Most founders skip warmup or cut it short. **Don't.** Sending cold emails on a fresh domain without 14 days of warmup is the #1 cause of deliverability disasters. Your patience in Week 2 determines your success in Months 2-6.
</InsightCard>

---

## When to Upgrade This Stack

This lean stack works beautifully up to **500 emails/week**. But you'll know it's time to upgrade when:

<ClassifyExercise
  title="Classify These Upgrade Signals"
  persistKey="ai-outreach-automation-L10-upgrade-signals"
  categories={[
    { id: "upgrade-now", label: "Upgrade Now", color: "#ef4444" },
    { id: "upgrade-soon", label: "Upgrade Soon (1-2 months)", color: "#f59e0b" },
    { id: "stay-lean", label: "Stay Lean", color: "#10b981" }
  ]}
  items={[
    { 
      id: "1", 
      content: "You're consistently hitting 5,000 emails/month and want to send more", 
      correctCategory: "upgrade-now",
      explanation: "You've maxed out Instantly Growth. Upgrade to Hypergrowth ($97/mo) for 100K emails/month."
    },
    { 
      id: "2", 
      content: "Your reply rate is 12%+ and you're booking 8+ meetings/month from email alone", 
      correctCategory: "upgrade-soon",
      explanation: "Email is working. Consider adding LinkedIn (Lemlist or LGM) to boost by another 20-30%."
    },
    { 
      id: "3", 
      content: "You're spending 10+ hours/week on manual personalization", 
      correctCategory: "upgrade-now",
      explanation: "Add Clay Pro ($149/mo) or upgrade ChatGPT to automate research and first-line generation."
    },
    { 
      id: "4", 
      content: "You're getting 2-3% reply rates and struggling to book meetings", 
      correctCategory: "stay-lean",
      explanation: "The problem isn't your stack — it's your targeting, messaging, or offer. Fix those first."
    },
    { 
      id: "5", 
      content: "You want to add LinkedIn outreach but haven't mastered email yet", 
      correctCategory: "stay-lean",
      explanation: "Master one channel before adding another. Multi-channel adds complexity, not magic."
    },
    { 
      id: "6", 
      content: "Your ACV increased from $2K to $8K and you're targeting fewer, higher-value accounts", 
      correctCategory: "upgrade-soon",
      explanation: "High-ticket needs multi-channel. Add Lemlist ($99) or LGM ($100) for email + LinkedIn sequences."
    }
  ]}
/>

---

## Stack 1 vs Stack 2 vs Stack 3: Decision Tree

You've seen Stack 1 (Lean Email-First). But how do you know if it's right for you? Let's compare all three reference stacks side-by-side.

<DecisionTree
  title="Which Stack Should You Choose?"
  persistKey="ai-outreach-automation-L10-stack-decision"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "What's your current outreach volume goal?", 
      choices: [
        { label: "Testing cold email for the first time (&lt;500/week)", nextNodeId: "stack1" },
        { label: "Scaling proven email strategy (500-1500/week)", nextNodeId: "volume-check" },
        { label: "High-volume or multi-channel (1500+/week)", nextNodeId: "stack3" }
      ]
    },
    { 
      id: "volume-check", 
      content: "Do you need LinkedIn outreach in addition to email?", 
      choices: [
        { label: "Yes, my ICP is active on LinkedIn", nextNodeId: "stack2" },
        { label: "No, email-only is working fine", nextNodeId: "stack1-scale" }
      ]
    },
    { 
      id: "stack1", 
      content: "**Stack 1: Lean Email-First ($51-71/mo)** is perfect for you. Start here, prove the channel, then scale.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "stack1-scale", 
      content: "Upgrade to **Instantly Hypergrowth ($97/mo)** but keep the lean stack. You don't need multi-channel yet.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "stack2", 
      content: "**Stack 2: Multi-Channel Growth (~$160/mo)** is your best fit. You'll get email + LinkedIn in one platform (Lemlist or LGM).", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "stack3", 
      content: "**Stack 3: High-Volume Multi-Channel (~$200/mo)** is what you need. Instantly Hypergrowth + HeyReach for LinkedIn at scale.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

---

## Stack Comparison Matrix

<ComparisonBuilder
  title="Compare Your Stack to the Reference"
  persistKey="ai-outreach-automation-L10-stack-compare"
  prompt="List the tools you're currently using or planning to buy (one per line)"
  expertExample="Instantly Growth ($37), Google Workspace 2 accounts ($12), Namecheap domains ($2), Apollo Free ($0), Clay Free ($0)"
  criteria={[
    "Total monthly cost under $150",
    "Includes email warmup (built-in or separate tool)",
    "Supports at least 500 emails/week",
    "Has enrichment for personalization (Apollo, Clay, or similar)",
    "No overlapping tools (e.g., don't pay for both Instantly and Smartlead)"
  ]}
/>

---

## The Setup Sequence: Step-by-Step

You've decided on Stack 1. Here's the exact order to set it up without missing critical steps.

<ProgressiveReveal title="Stack 1 Setup Checklist (Expand Each Step)" persistKey="ai-outreach-automation-L10-setup-reveal">

<RevealSection title="Step 1: Buy Domains (Day 1)">

**Where to buy:** Namecheap, Porkbun, or Google Domains

**What to buy:**
- 2 secondary domains (.co, .io, or .net)
- Enable privacy protection (free on Namecheap)
- Set nameservers to Cloudflare (free, better DNS management)

**Cost:** $24/year total ($12 per domain)

**Time:** 15 minutes

<ExampleCard label="Example Domain Strategy">
Main brand: **soloframehub.com** (keep clean, no cold email)
Secondary 1: **soloframehub.co** (cold email domain 1)
Secondary 2: **soloframehub.io** (cold email domain 2)
</ExampleCard>

</RevealSection>

<RevealSection title="Step 2: Set Up Google Workspace (Day 1)">

**Go to:** workspace.google.com

**Create:**
- 2 users on your secondary domains
- alex@yourbrand.co
- hello@yourbrand.io

**Cost:** $12/month ($6 per user)

**Configuration:**
- Enable 2FA for security
- Set up email forwarding to your main inbox (optional, for monitoring)
- Create email signatures (keep simple, no images for deliverability)

**Time:** 30 minutes

</RevealSection>

<RevealSection title="Step 3: Configure DNS Records (Day 1-2)">

**For each domain, add these DNS records:**

**SPF Record:**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.google.com include:_spf.instantly.ai ~all
TTL: 3600
```

**DKIM Record (Google):**
1. Go to Google Workspace Admin → Apps → Gmail → Authenticate email
2. Generate DKIM key
3. Copy TXT record to your DNS

**DKIM Record (Instantly):**
1. Go to Instantly → Settings → Email Accounts → Select account
2. Copy DKIM record
3. Add to DNS

**DMARC Record:**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@yourbrand.com
TTL: 3600
```

**Custom Tracking Domain (Instantly):**
```
Type: CNAME
Name: track
Value: track.instantly.ai
TTL: 3600
```

**Verification:** Use MXToolbox.com to verify all records are correct

**Time:** 1 hour (DNS propagation takes 24-48 hours)

</RevealSection>

<RevealSection title="Step 4: Create Instantly Account + Connect Inboxes (Day 2)">

**Sign up:** instantly.ai

**Plan:** Growth ($37/month)

**Connect email accounts:**
1. Settings → Email Accounts → Add Account
2. Choose "Google Workspace"
3. Authenticate with OAuth (easier than SMTP)
4. Repeat for second account

**Enable warmup:**
1. For each account, toggle "Warmup" to ON
2. Set warmup emails/day: Start at 10, increase by 5 every 3 days
3. Enable "Randomize send times" and "Mark as important"

**Time:** 30 minutes

</RevealSection>

<RevealSection title="Step 5: Wait 14 Days (Warmup Period)">

**What happens during warmup:**
- Instantly sends emails to other Instantly users' warmup pools
- Emails are opened, replied to, marked as important
- Your domain builds sending reputation with Gmail/Outlook

**What you should do:**
- Build your first prospect list (500 contacts in Apollo)
- Write your first sequence (5-step email-only)
- Set up Clay for AI personalization (100 credits/month)
- Create A/B test variants for subject lines and first lines

**DO NOT:**
- Send cold emails during warmup
- Skip warmup to "save time"
- Send from your main domain

**Time:** 14 days (passive)

</RevealSection>

<RevealSection title="Step 6: Build Your First List (Days 3-14)">

**Use Apollo Free:**
1. Go to apollo.io → Search → People
2. Apply filters:
   - Job titles (e.g., "Founder", "CEO", "VP Marketing")
   - Company size (e.g., 10-50 employees)
   - Industry (e.g., "Computer Software")
   - Location (if relevant)
3. Save as list (500 contacts)
4. Export 60/month (your Tier A)
5. For Tier B, just grab email addresses (unlimited)

**Use Clay Free (for Tier A personalization):**
1. Import your 60 Tier A prospects
2. Add enrichment columns:
   - Recent LinkedIn post
   - Company news
   - Tech stack
3. Add AI column for personalized first line (use prompt from Lesson 6)
4. Export to CSV

**Time:** 3-5 hours (spread over 2 weeks)

</RevealSection>

<RevealSection title="Step 7: Create Your First Sequence (Days 10-14)">

**In Instantly:**
1. Campaigns → New Campaign
2. Name: "Test Batch - [ICP Segment]"
3. Add 5 steps (see Lesson 4 for templates):
   - Step 1: Personalized opener (Day 1)
   - Step 2: Different angle (Day 4)
   - Step 3: Value-add (Day 8)
   - Step 4: Social proof (Day 14)
   - Step 5: Breakup (Day 21)

**Configure A/B test:**
- 2 subject line variants for Step 1
- 2 first-line variants for Step 1
- Instantly will auto-split traffic 50/50

**Set daily limits:**
- 25 emails/day per inbox (start conservative)
- Sending window: 8am-5pm recipient timezone
- Randomize send times: Yes

**Time:** 2 hours

</RevealSection>

<RevealSection title="Step 8: Launch Test Batch (Day 15)">

**Import 50 contacts:**
- 25 Tier A (Clay-personalized)
- 25 Tier B (Instantly AI-personalized)

**Launch campaign:**
- Start at 25/day per inbox (50/day total)
- Monitor for 7 days

**What to track:**
- Open rate (target: 40-60%)
- Reply rate (target: 5-15%)
- Bounce rate (must be &lt;2%)
- Spam complaints (must be 0%)

**If bounce rate >2% or spam >0:** STOP. Fix your list quality or messaging.

**Time:** 30 minutes setup, 7 days monitoring

</RevealSection>

<RevealSection title="Step 9: Scale to Full Volume (Days 22-30)">

**If test batch results are good:**
- Increase to 50 emails/day per inbox (100/day total)
- Import remaining 450 contacts
- Launch full campaign

**Week 4 target:**
- 500 emails sent
- 25-75 replies (5-15% reply rate)
- 5-15 meetings booked

**If results are bad (&lt;3% reply rate):**
- Don't scale yet
- Revisit targeting (Lesson 2) and messaging (Lesson 4)
- Run new A/B tests

**Time:** Ongoing

</RevealSection>

</ProgressiveReveal>

---

## Common Setup Mistakes (And How to Avoid Them)

<SwipeDecision
  title="Setup Mistake or Smart Move?"
  description="Swipe right for smart moves, left for mistakes"
  optionA="Mistake"
  optionB="Smart Move"
  persistKey="ai-outreach-automation-L10-mistakes"
  cards={[
    { 
      id: "1", 
      content: "Sending cold emails from your main domain (yourbrand.com)", 
      correctOption: "a", 
      explanation: "MISTAKE. Always use secondary domains for cold email. If your main domain gets flagged, your entire business email is affected." 
    },
    { 
      id: "2", 
      content: "Waiting 14 days for warmup before sending any cold emails", 
      correctOption: "b", 
      explanation: "SMART. Patience in warmup = deliverability for months. Rushing = spam folder." 
    },
    { 
      id: "3", 
      content: "Starting at 100 emails/day per inbox on Day 1", 
      correctOption: "a", 
      explanation: "MISTAKE. Start at 25/day, scale to 50-75 over 2 weeks. Sudden volume spikes trigger spam filters." 
    },
    { 
      id: "4", 
      content: "Using Instantly's AI writer for all 500 emails instead of Clay", 
      correctOption: "b", 
      explanation: "SMART for Tier B. Save Clay credits for Tier A. Instantly AI is good enough for middle-tier prospects." 
    },
    { 
      id: "5", 
      content: "Buying Lemlist ($99) and Instantly ($37) at the same time", 
      correctOption: "a", 
      explanation: "MISTAKE. You're paying for overlapping features. Pick one email platform, master it, then consider multi-channel." 
    },
    { 
      id: "6", 
      content: "Connecting 5 email accounts to Instantly Growth plan", 
      correctOption: "b", 
      explanation: "SMART. Instantly Growth allows unlimited inboxes. Spread sending across multiple accounts for better deliverability." 
    },
    { 
      id: "7", 
      content: "Skipping DMARC setup because 'it's optional'", 
      correctOption: "a", 
      explanation: "MISTAKE. DMARC is required for good deliverability in 2025-2026. Gmail and Outlook prioritize authenticated senders." 
    },
    { 
      id: "8", 
      content: "Exporting all 500 contacts from Apollo on Day 1", 
      correctOption: "a", 
      explanation: "MISTAKE. Apollo Free only gives 60 exports/month. Export your Tier A (60), use email credits for Tier B." 
    }
  ]}
/>

---

## Stack 1 ROI Calculator

Let's run the numbers. What does this $51-71/month stack actually return?

<ScenarioSimulator
  title="Stack 1 ROI Calculator"
  persistKey="ai-outreach-automation-L10-roi-simulator"
  levers={[
    { id: "emails", label: "Emails per week", min: 50, max: 500, step: 50, defaultValue: 250 },
    { id: "replyRate", label: "Reply rate (%)", min: 2, max: 20, step: 1, defaultValue: 8 },
    { id: "meetingRate", label: "Reply → Meeting rate (%)", min: 10, max: 50, step: 5, defaultValue: 25 },
    { id: "closeRate", label: "Meeting → Close rate (%)", min: 5, max: 40, step: 5, defaultValue: 20 },
    { id: "acv", label: "Average Contract Value ($)", min: 500, max: 20000, step: 500, defaultValue: 3000 }
  ]}
  outputs={[
    { id: "replies", label: "Replies per month", formula: "(emails * 4 * (replyRate / 100))", unit: "", precision: 0 },
    { id: "meetings", label: "Meetings per month", formula: "(emails * 4 * (replyRate / 100) * (meetingRate / 100))", unit: "", precision: 1 },
    { id: "customers", label: "New customers per month", formula: "(emails * 4 * (replyRate / 100) * (meetingRate / 100) * (closeRate / 100))", unit: "", precision: 1 },
    { id: "revenue", label: "Monthly revenue", formula: "(emails * 4 * (replyRate / 100) * (meetingRate / 100) * (closeRate / 100) * acv)", unit: "$", precision: 0 },
    { id: "roi", label: "ROI (Revenue / Stack Cost)", formula: "((emails * 4 * (replyRate / 100) * (meetingRate / 100) * (closeRate / 100) * acv) / 71)", unit: "x", precision: 1 }
  ]}
  insight="At `{customers}` customers/month and $`{acv}` ACV, you're generating $`{revenue}`/month from a ${71}/month stack. That's a `{roi}`x return on your outreach investment."
/>

**Realistic Benchmarks for Stack 1:**
- Reply rate: 5-12% (with good targeting and personalization)
- Reply → Meeting: 20-30% (with strong discovery questions)
- Meeting → Close: 15-25% (depends on your offer and sales skills)

**Example:** 250 emails/week, 8% reply rate, 25% meeting rate, 20% close rate, $3K ACV = **1.6 customers/month = $4,800/month revenue from $71/month stack = 68x ROI**

---

## Your Stack 1 Action Plan

You've learned the stack. Now commit to the build.

<InteractiveChecklist 
  title="Your Next 7 Days (Stack 1 Setup Sprint)" 
  persistKey="ai-outreach-automation-L10-action-plan"
  items={[
    "Day 1: Buy 2 secondary domains ($24/year) and set up Google Workspace ($12/mo)",
    "Day 1: Configure DNS records (SPF, DKIM, DMARC) for both domains",
    "Day 2: Sign up for Instantly Growth ($37/mo) and connect both email accounts",
    "Day 2: Enable warmup on both accounts (10 emails/day, increase by 5 every 3 days)",
    "Days 3-7: Build first prospect list in Apollo (500 contacts, export 60 Tier A)",
    "Days 3-7: Set up Clay Free and create AI personalization for 60 Tier A prospects",
    "Days 8-14: Write 5-step email sequence and configure A/B test in Instantly",
    "Day 15: Launch test batch (50 emails) and monitor for 7 days",
    "Days 22-30: Scale to full volume (500/week) if test results are good"
  ]}
/>

---

## Summary: The Lean Stack Philosophy

Stack 1 isn't about having every feature. It's about having **exactly what you need** to send 500 personalized, deliverable emails per week for under $75/month.

**What you get:**
- Unlimited email accounts (Instantly)
- Built-in warmup (no extra cost)
- AI personalization (Instantly + Clay Free)
- B2B lead database (Apollo Free + Instantly Lead Finder)
- A/B testing (up to 26 variants)
- Enough capacity for 2,000 emails/month

**What you don't get (and don't need yet):**
- LinkedIn automation
- Advanced enrichment (save for Stack 2)
- High-volume sending (>500/week)
- White-label or API access

**When to upgrade:**
- You're consistently hitting 500/week and want more volume → Instantly Hypergrowth
- Email is working (8%+ reply rate) and you want to add LinkedIn → Stack 2
- You're spending 10+ hours/week on manual personalization → Clay Pro

**The bottom line:** Start here. Prove the channel. Scale when revenue justifies it. Most solo founders never need more than Stack 1.

<FlipCard 
  front="The Stack 1 Promise" 
  back="If you execute this stack consistently for 90 days — 500 emails/week, 8% reply rate, 25% meeting conversion — you'll generate 8-12 new customers and $24K-36K in revenue from a $213 investment (3 months × $71). That's a 113-169x return." 
/>

---

## Next Lesson Preview

You've built Stack 1 (Lean Email-First). In **Lesson 11**, we'll cover **Stack 2: Multi-Channel Growth (~$160/month)** — for founders ready to add LinkedIn to their proven email strategy. You'll learn when multi-channel justifies the cost, how to integrate Lemlist or La Growth Machine, and the exact sequences that combine email + LinkedIn for 20-30% higher reply rates.

**Coming up:** Stack 2 breakdown, Lemlist vs LGM comparison, multi-channel sequence templates, and the "Email First, LinkedIn Second" ramp plan.