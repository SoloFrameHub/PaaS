---
title: "Channel Attribution: Which Source Drives Wins?"
duration: "50 min"
track: "Operations & Systems"
course: "Course 41: Sales Analytics & BI"
lesson: 7
---

## The $40,000 Question

You spent 6 months building your acquisition engine. Outbound email sequences running daily. LinkedIn posts three times a week. A content hub with 20 articles. A referral program. Community engagement. Paid ads on a $500/month budget.

This month you closed 8 deals worth $40,000 in new MRR.

**Which channel deserves the credit?**

Without attribution data, you're flying blind. You might double down on LinkedIn because it *feels* like where deals happen — while your actual revenue driver is the content piece that brought them in 3 months ago. Or you might kill outbound email because "no one replies" — missing that 60% of your closed deals started there.

Attribution is the difference between **guessing** and **knowing** where to invest your limited time and budget.

<InsightCard icon="💰" title="The Attribution Blindness Tax">
Solo founders without attribution waste 30-40% of their acquisition effort on channels that don't convert. That's 12-16 hours per week — or $2,000-3,200/month of your time — spent on activities that don't drive revenue.
</InsightCard>

---

## Why Attribution Matters (Especially for Solo Founders)

You have **5-7 hours per week** for acquisition. Maybe a **$100-200/month** tool budget. Every hour and every dollar must count.

Attribution tells you:
- **Which channel to scale** (highest ROI)
- **Which channel to kill** (negative ROI)
- **Where to focus your time** (highest conversion rate)
- **Which messaging works** (channel-specific patterns)

Without it, you're optimizing in the dark.

<FlipCard 
  front="The Multi-Touch Reality" 
  back="Most B2B deals involve 3-7 touchpoints across multiple channels before closing. A lead might discover you via content, engage on LinkedIn, and close via email. Attribution helps you understand the full journey." 
/>

### The Data That Changes Everything

<ExampleCard label="Case Study: The Content Surprise">
Marcus ran a dev tools company. He spent 15 hours/week on LinkedIn and 2 hours/week writing technical blog posts.

When he finally tracked attribution:
- **LinkedIn**: 40 leads/month, 5% close rate, 2 wins
- **Blog content**: 8 leads/month, 25% close rate, 2 wins

Same number of wins. But content took 87% less time and produced 5x higher close rates.

He shifted to 10 hours/week writing, 5 hours/week on LinkedIn. Revenue doubled in 90 days.
</ExampleCard>

<RangeSlider 
  label="How confident are you that you know which channel drives your best deals?" 
  min={1} 
  max={10} 
  lowLabel="Total guess" 
  highLabel="I have the data" 
  persistKey="analytics-L7-confidence" 
/>

---

## First-Touch vs Last-Touch Attribution

There are dozens of attribution models. For solo founders, you need exactly **one**: **first-touch attribution**.

### First-Touch Attribution
**Credit goes to the channel that first brought the lead into your world.**

- Lead fills out a content download form → **Content/Inbound**
- You send a cold email and they reply → **Outbound Email**
- They connect with you on LinkedIn → **LinkedIn**
- A customer refers them → **Referral**

**Why first-touch?** Because you're making **acquisition decisions**, not marketing mix optimization. You need to know: *which channel is best at bringing new people into my pipeline?*

### Last-Touch Attribution
**Credit goes to the final touchpoint before they bought.**

This is useful for understanding *conversion tactics* but misleading for *channel investment decisions*.

Example: A lead discovers you via a blog post (first touch), engages on LinkedIn for 2 months, then closes after a demo email (last touch). Last-touch would credit "email" — but without the blog post, they never would have existed.

<FlipCard 
  front="Why Not Multi-Touch?" 
  back="Multi-touch attribution (spreading credit across all touchpoints) is theoretically better but practically impossible for solo founders. You'd need marketing automation, pixel tracking, and hours of analysis. First-touch is 80% as good with 5% of the effort." 
/>

<SwipeDecision
  title="First-Touch or Last-Touch?"
  description="For each scenario, decide which attribution model makes more sense for a solo founder"
  optionA="First-Touch"
  optionB="Last-Touch"
  persistKey="analytics-L7-swipe"
  cards={[
    {
      id: "1",
      content: "You want to know which channel to spend more time on next month",
      correctOption: "a",
      explanation: "First-touch tells you which channels are best at bringing new leads in — the acquisition decision you need to make."
    },
    {
      id: "2",
      content: "You want to know which closing tactic works best",
      correctOption: "b",
      explanation: "Last-touch shows which final action triggered the purchase — useful for conversion optimization."
    },
    {
      id: "3",
      content: "You have a $500/month budget and need to allocate it across 3 channels",
      correctOption: "a",
      explanation: "First-touch shows which channels deliver the most pipeline per dollar spent."
    },
    {
      id: "4",
      content: "You're testing two different demo formats",
      correctOption: "b",
      explanation: "Last-touch reveals which demo format converts better at the end of the funnel."
    }
  ]}
/>

---

## Simple Attribution Setup (The 15-Minute Version)

You don't need marketing automation or pixel tracking. You need **one required field** in your CRM.

### Step 1: Add "Lead Source" Field to Your CRM

Every CRM has this. Make it **required** when creating a new contact.

**Standard categories:**
- Outbound Email
- LinkedIn (Outbound)
- LinkedIn (Inbound — they reached out)
- Content/Inbound (blog, guide, webinar)
- Referral
- Community (Slack, forum, etc.)
- Paid Ads
- Event (conference, meetup)
- Other

<InsightCard icon="🔒" title="Make It Required">
If "Lead Source" is optional, you'll forget to fill it 60% of the time. Make it required. Force yourself to answer "How did this person first enter my world?" before you can save the contact.
</InsightCard>

### Step 2: Enforce the Discipline

Every time you add a contact:
1. Ask yourself: "How did I first encounter this person?"
2. Select the channel
3. Add a note if it's unclear (e.g., "Found via LinkedIn comment on Sarah's post")

**This takes 5 seconds per contact.** Over a month, that's 2-3 minutes of extra work for data that will save you 10+ hours of wasted effort.

### Step 3: Track It Weekly

Every Friday, pull a simple report:
- **Leads added this week by source**
- **Meetings booked this week by source**
- **Deals won this month by source**

That's it. Three numbers per channel.

<TemplateBuilder
  title="Your Lead Source Tracker"
  persistKey="analytics-L7-tracker"
  sections={[
    {
      id: "setup",
      title: "CRM Setup",
      fields: [
        { 
          id: "crm", 
          label: "Which CRM are you using?", 
          placeholder: "e.g., HubSpot, Pipedrive, Attio", 
          type: "text" 
        },
        { 
          id: "field", 
          label: "What will you name the Lead Source field?", 
          placeholder: "e.g., Lead Source, Acquisition Channel", 
          type: "text" 
        }
      ]
    },
    {
      id: "categories",
      title: "Your Lead Source Categories",
      fields: [
        { 
          id: "sources", 
          label: "List your 5-8 lead sources (one per line)", 
          placeholder: "Outbound Email\nLinkedIn Outbound\nContent/Inbound\nReferral\nCommunity\nPaid Ads", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## Channel ROI: The Only Metric That Matters

Once you have attribution data, you can calculate **channel ROI**:

**Channel ROI = Revenue from Channel / (Cost of Channel + Time Spent × Hourly Rate)**

This reveals the **true cost** of "free" channels.

### Example: The LinkedIn Time Trap

**Channel:** LinkedIn Outbound  
**Monthly Stats:**
- 20 hours spent (connection requests, DMs, engagement)
- Tool cost: $0 (free LinkedIn)
- Your hourly rate: $100/hr
- Leads generated: 15
- Meetings booked: 3
- Deals won: 1 ($2,000 MRR)

**Total Cost:** $0 + (20 hours × $100/hr) = **$2,000**  
**Revenue (first month):** $2,000  
**ROI:** 1:1 (breakeven)

Now compare to **Outbound Email**:

**Channel:** Outbound Email  
**Monthly Stats:**
- 8 hours spent (list building, sequence setup, replies)
- Tool cost: $50/month (Apollo + Instantly)
- Your hourly rate: $100/hr
- Leads generated: 40
- Meetings booked: 4
- Deals won: 1 ($2,000 MRR)

**Total Cost:** $50 + (8 hours × $100/hr) = **$850**  
**Revenue (first month):** $2,000  
**ROI:** 2.4:1

**Outbound email is 2.4x more efficient** — even though LinkedIn "feels" more personal.

<ScenarioSimulator
  title="Channel ROI Calculator"
  persistKey="analytics-L7-simulator"
  levers={[
    { id: "hours", label: "Hours spent per month", min: 2, max: 40, step: 2, defaultValue: 10 },
    { id: "toolCost", label: "Tool cost per month ($)", min: 0, max: 500, step: 25, defaultValue: 50 },
    { id: "hourlyRate", label: "Your hourly rate ($)", min: 50, max: 300, step: 25, defaultValue: 100 },
    { id: "leads", label: "Leads generated per month", min: 5, max: 100, step: 5, defaultValue: 20 },
    { id: "closeRate", label: "Close rate (%)", min: 1, max: 30, step: 1, defaultValue: 5 },
    { id: "dealSize", label: "Average deal size ($)", min: 500, max: 10000, step: 500, defaultValue: 2000 }
  ]}
  outputs={[
    { id: "totalCost", label: "Total monthly cost", formula: "toolCost + (hours * hourlyRate)", unit: "$", precision: 0 },
    { id: "revenue", label: "Monthly revenue generated", formula: "leads * (closeRate / 100) * dealSize", unit: "$", precision: 0 },
    { id: "roi", label: "ROI", formula: "revenue / (toolCost + (hours * hourlyRate))", unit: ":1", precision: 1 }
  ]}
  insight="At `{roi}`:1 ROI, this channel generates $`{revenue}` from ${totalCost} in costs. Channels below 2:1 ROI should be reconsidered."
/>

---

## The Channel Attribution Matrix

Different channels have **wildly different** performance profiles. Here's what the data shows:

<FlipCard 
  front="Channel Performance Benchmarks" 
  back="Outbound Email: High volume, 2-5% close rate, medium CAC. LinkedIn: Medium volume, 5-15% close rate, high time cost. Content: Low→High volume, 10-20% close rate, low long-term CAC. Referral: Low volume, 30-50% close rate, very low CAC. Community: Low-Medium volume, 10-25% close rate, high time cost. Paid Ads: Medium-High volume, 1-3% close rate, high CAC." 
/>

### What This Means for You

**If you need volume fast:** Outbound email or paid ads  
**If you need high close rates:** Referrals or content  
**If you need relationship depth:** LinkedIn or community  
**If you're bootstrapped:** Content and referrals (lowest CAC)  
**If you have runway:** Paid ads (fastest to scale)

<ClassifyExercise
  title="Match Channel to Goal"
  persistKey="analytics-L7-classify"
  categories={[
    { id: "volume", label: "Best for Volume", color: "#3b82f6" },
    { id: "quality", label: "Best for Quality", color: "#10b981" },
    { id: "speed", label: "Best for Speed", color: "#f59e0b" }
  ]}
  items={[
    { id: "1", content: "Outbound Email", correctCategory: "volume" },
    { id: "2", content: "Referrals", correctCategory: "quality" },
    { id: "3", content: "Paid Ads", correctCategory: "speed" },
    { id: "4", content: "Content/Inbound", correctCategory: "quality" },
    { id: "5", content: "LinkedIn Outbound", correctCategory: "volume" },
    { id: "6", content: "Community Engagement", correctCategory: "quality" }
  ]}
/>

---

## Multi-Touch Reality: The Dark Social Problem

Here's the truth: **most deals involve 3-7 touchpoints** before closing.

A typical journey:
1. **First touch:** Read a blog post (Content/Inbound)
2. Connect on LinkedIn after seeing a post
3. Engage with 3-4 LinkedIn posts over 2 months
4. Reply to an outbound email sequence
5. Book a meeting via email
6. Close after a demo

**Which channel gets credit?**

With first-touch attribution: **Content/Inbound**. Because that's where the relationship started.

But there's a problem: **dark social**.

### Dark Social = Attribution Blind Spots

**Dark social** refers to traffic and conversions that happen through private channels where you can't track the source:

- Someone shares your content in a private Slack channel
- A referral happens via text message
- A LinkedIn DM leads to a direct website visit (looks like "Direct" traffic)
- Someone mentions you in a podcast, listener Googles you

These all look like **"Direct"** or **"Other"** in your attribution data — but they're actually referrals or content-driven.

<InsightCard icon="🕵️" title="The 'How Did You Hear About Us?' Question">
Add this to your intake form or first call: "How did you first hear about us?" 

61% of B2B deals involve some form of word-of-mouth that doesn't show up in attribution data. Asking directly captures what your tracking misses.
</InsightCard>

<ExampleCard label="Case Study: The Invisible Referral Network">
Jenna ran a coaching business. Her attribution data showed:
- Content: 40% of leads
- LinkedIn: 30% of leads
- Direct: 30% of leads

She added "How did you hear about us?" to her intake form.

Turns out:
- 80% of "Direct" traffic was actually **referrals** (clients sharing her content in private communities)
- 50% of "Content" leads first heard about her from a **podcast mention** (not tracked)

Her real attribution:
- Referrals: 50%
- Content: 30%
- LinkedIn: 20%

She doubled down on client referral incentives and podcast outreach. Revenue grew 3x in 6 months.
</ExampleCard>

---

## Building Your Channel Attribution Tracker

Let's build the artifact that will guide your channel decisions for the next 12 months.

### The 5-Column Attribution Report

Pull this from your CRM weekly:

| Lead Source | Leads Added | Meetings Booked | Deals Won | Revenue |
|-------------|-------------|-----------------|-----------|---------|
| Outbound Email | 25 | 5 | 1 | $2,000 |
| LinkedIn | 12 | 4 | 1 | $3,000 |
| Content/Inbound | 8 | 3 | 2 | $5,000 |
| Referral | 3 | 2 | 1 | $4,000 |
| **Total** | **48** | **14** | **5** | **$14,000** |

From this, calculate:

**Lead → Meeting Rate:**
- Outbound Email: 5/25 = **20%**
- LinkedIn: 4/12 = **33%**
- Content: 3/8 = **38%**
- Referral: 2/3 = **67%**

**Meeting → Win Rate:**
- Outbound Email: 1/5 = **20%**
- LinkedIn: 1/4 = **25%**
- Content: 2/3 = **67%**
- Referral: 1/2 = **50%**

**Overall Lead → Win Rate:**
- Outbound Email: 1/25 = **4%**
- LinkedIn: 1/12 = **8%**
- Content: 2/8 = **25%**
- Referral: 1/3 = **33%**

**Revenue per Lead:**
- Outbound Email: $2,000 / 25 = **$80**
- LinkedIn: $3,000 / 12 = **$250**
- Content: $5,000 / 8 = **$625**
- Referral: $4,000 / 3 = **$1,333**

<InsightCard icon="📊" title="The Insight">
Referrals produce 16x more revenue per lead than outbound email. Content produces 8x more. But outbound produces 3x the volume.

The answer isn't "kill outbound." It's "invest in referral systems and content while using outbound for volume."
</InsightCard>

<TemplateBuilder
  title="Your Channel Attribution Report"
  persistKey="analytics-L7-report"
  sections={[
    {
      id: "data",
      title: "This Month's Data",
      fields: [
        { id: "channel1", label: "Channel 1 Name", placeholder: "e.g., Outbound Email", type: "text" },
        { id: "channel1Leads", label: "Leads Added", placeholder: "e.g., 25", type: "number" },
        { id: "channel1Meetings", label: "Meetings Booked", placeholder: "e.g., 5", type: "number" },
        { id: "channel1Wins", label: "Deals Won", placeholder: "e.g., 1", type: "number" },
        { id: "channel1Revenue", label: "Revenue ($)", placeholder: "e.g., 2000", type: "number" },
        { id: "channel2", label: "Channel 2 Name", placeholder: "e.g., LinkedIn", type: "text" },
        { id: "channel2Leads", label: "Leads Added", placeholder: "e.g., 12", type: "number" },
        { id: "channel2Meetings", label: "Meetings Booked", placeholder: "e.g., 4", type: "number" },
        { id: "channel2Wins", label: "Deals Won", placeholder: "e.g., 1", type: "number" },
        { id: "channel2Revenue", label: "Revenue ($)", placeholder: "e.g., 3000", type: "number" }
      ]
    },
    {
      id: "analysis",
      title: "Your Analysis",
      fields: [
        { id: "topChannel", label: "Which channel has the highest revenue per lead?", placeholder: "e.g., Referral", type: "text" },
        { id: "scaleChannel", label: "Which channel should you scale next month?", placeholder: "e.g., Content — high conversion, can increase volume", type: "textarea" },
        { id: "killChannel", label: "Which channel should you reduce or kill?", placeholder: "e.g., Paid Ads — low ROI, high cost", type: "textarea" }
      ]
    }
  ]}
/>

---

## The Attribution Decision Framework

Now that you have the data, how do you decide where to invest?

### The 3-Question Framework

**Question 1: Which channel has the highest revenue per lead?**  
→ This is your **quality** signal. Double down here if you can increase volume.

**Question 2: Which channel has the highest volume?**  
→ This is your **scale** signal. Optimize conversion here to unlock more revenue.

**Question 3: Which channel has the lowest cost (time + money)?**  
→ This is your **efficiency** signal. Prioritize if you're time-constrained.

<StrategyDuel
  title="Scale Quality or Optimize Volume?"
  persistKey="analytics-L7-duel"
  scenario="You have 10 hours/week for acquisition. Your data shows: Content (8 leads, 25% close rate, 2 hours/week). Outbound Email (40 leads, 5% close rate, 8 hours/week)."
  strategyA={{
    name: "Scale Content",
    description: "Shift to 8 hours/week content, 2 hours/week email",
    pros: ["Higher close rate", "Compounds over time", "Lower long-term CAC"],
    cons: ["Slower volume growth", "6-12 month lag", "Requires consistency"]
  }}
  strategyB={{
    name: "Optimize Email",
    description: "Keep 8 hours/week email, improve targeting to 10% close rate",
    pros: ["Faster results", "Predictable volume", "Easier to measure"],
    cons: ["Higher CAC", "Doesn't compound", "Requires constant effort"]
  }}
  expertVerdict="For bootstrapped founders: Scale content. The 25% close rate and compounding effect will outperform optimized email within 6 months. For funded founders with &lt;12 months runway: Optimize email for predictable near-term pipeline."
/>

---

## Tracking Attribution in Your CRM

Let's make this concrete. Here's how to set up attribution tracking in the 3 most common solo founder CRMs.

### HubSpot (Free)

1. Go to **Settings → Properties → Contact Properties**
2. Find "Original Source" (built-in field)
3. Customize the dropdown values:
   - Outbound Email
   - LinkedIn Outbound
   - LinkedIn Inbound
   - Content/Inbound
   - Referral
   - Community
   - Paid Ads
   - Event
   - Other
4. Make it **required** when creating contacts
5. Create a **report**: Contacts by Original Source → Deals Won by Original Source

### Pipedrive

1. Go to **Settings → Data Fields → Add Custom Field**
2. Create "Lead Source" (Single Option field)
3. Add your channel options
4. Make it **required** for new contacts
5. Use **Insights** to create a report: Deals Won by Lead Source

### Attio

1. Go to **Settings → Attributes → Add Attribute**
2. Create "Lead Source" (Select field)
3. Add your channel options
4. Make it **required**
5. Create a **View**: Group by Lead Source, filter by Status = Won

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
If you're using a database-backed CRM or custom system, add a `lead_source` column to your contacts table. Use an ENUM or foreign key to a `channels` table. Then run a simple SQL query:

```sql
SELECT lead_source, COUNT(*) as deals_won, SUM(deal_value) as revenue
FROM deals
WHERE status = 'won'
GROUP BY lead_source
ORDER BY revenue DESC;
```

This gives you instant attribution reporting.
</ContextualNote>

---

## The Weekly Attribution Review

Every Friday, spend **5 minutes** reviewing attribution:

1. **Pull the report:** Leads, meetings, wins by source (this week)
2. **Calculate conversion rates:** Lead→Meeting, Meeting→Win per channel
3. **Identify the pattern:** Which channel is trending up? Which is flat?
4. **Make one decision:** Scale, optimize, or kill one channel

<InteractiveChecklist 
  title="Your Weekly Attribution Review Checklist" 
  persistKey="analytics-L7-checklist" 
  items={[
    "Pull this week's attribution report (leads, meetings, wins by source)",
    "Calculate lead→meeting and meeting→win rates per channel",
    "Identify which channel had the highest revenue per lead this week",
    "Identify which channel had the highest volume this week",
    "Make one decision: scale, optimize, or reduce one channel",
    "Update your channel time allocation for next week",
    "Add 'How did you hear about us?' to your intake process if you haven't already"
  ]} 
/>

---

## Advanced: Cohort Attribution Analysis

Once you have 3-6 months of data, you can do **cohort analysis** — tracking how different lead source cohorts perform over time.

### Why Cohorts Matter

**Example:** Content leads might have a **6-month sales cycle** while outbound email leads close in **30 days**.

If you only look at monthly attribution, content looks weak in Month 1-5 (few wins) but explodes in Month 6+ (high wins from old leads).

Cohort analysis reveals this pattern.

### How to Build a Cohort Report

1. Tag each lead with **Month Added** and **Lead Source**
2. Track **Deals Won** by cohort (e.g., "January Content Leads")
3. Calculate **Win Rate by Cohort** over time

**Example Cohort Table:**

| Lead Source | Month Added | Leads | Wins (Month 1) | Wins (Month 3) | Wins (Month 6) | Total Win Rate |
|-------------|-------------|-------|----------------|----------------|----------------|----------------|
| Content | Jan 2025 | 10 | 0 | 1 | 3 | 30% |
| Outbound | Jan 2025 | 30 | 2 | 3 | 3 | 10% |

**Insight:** Content has 3x the long-term win rate, but outbound delivers faster.

<InsightCard icon="⏳" title="The Lag Effect">
Content and referrals often have 3-6 month lags before they show ROI. If you judge them on 30-day attribution, you'll kill your best long-term channels.

Cohort analysis prevents this mistake.
</InsightCard>

---

## Putting It All Together: Your Channel Attribution Playbook

You now have everything you need to answer: **Which channel drives wins?**

Here's your implementation plan:

### Week 1: Setup
- Add "Lead Source" field to CRM (required)
- Define your 5-8 channel categories
- Backfill attribution for existing contacts (best guess)

### Week 2-5: Data Collection
- Enforce attribution discipline on every new contact
- Pull weekly reports (leads, meetings, wins by source)
- Don't make decisions yet — just collect data

### Week 6: First Analysis
- Calculate revenue per lead by channel
- Calculate lead→meeting and meeting→win rates
- Identify your #1 quality channel and #1 volume channel

### Week 7: First Decision
- Scale your highest-ROI channel (add 2-3 hours/week)
- Reduce or kill your lowest-ROI channel (cut 2-3 hours/week)
- Track the impact over the next 4 weeks

### Month 3: Cohort Analysis
- Review 90-day cohorts by channel
- Identify lag effects (channels that take 60-90 days to convert)
- Adjust your attribution model to account for lag

<TimedChallenge
  title="Attribution Speed Drill"
  persistKey="analytics-L7-timed"
  timeLimit={90}
  items={[
    { 
      id: "1", 
      prompt: "A lead fills out a content download form. What's the lead source?", 
      correctAnswer: "Content/Inbound", 
      explanation: "First touch was content." 
    },
    { 
      id: "2", 
      prompt: "You send a cold email, they reply and book a meeting. What's the lead source?", 
      correctAnswer: "Outbound Email", 
      explanation: "First touch was your outbound email." 
    },
    { 
      id: "3", 
      prompt: "Someone connects with you on LinkedIn after seeing a post. What's the lead source?", 
      correctAnswer: "LinkedIn Inbound", 
      explanation: "They initiated the connection (inbound)." 
    },
    { 
      id: "4", 
      prompt: "A client refers someone who emails you directly. What's the lead source?", 
      correctAnswer: "Referral", 
      explanation: "First touch was the referral, even though they emailed." 
    },
    { 
      id: "5", 
      prompt: "You send a LinkedIn connection request, they accept and reply. What's the lead source?", 
      correctAnswer: "LinkedIn Outbound", 
      explanation: "You initiated (outbound)." 
    }
  ]}
/>

---

## Summary: The Attribution Advantage

Attribution isn't about perfect data. It's about **making better decisions** with imperfect data.

**The 3 core principles:**

1. **First-touch attribution is good enough** — Track where leads first entered your world
2. **Revenue per lead is the key metric** — Not volume, not meetings, but revenue
3. **Review weekly, decide monthly** — Consistent small adjustments beat big pivots

**The outcome:**

You'll know exactly which channel to scale, which to optimize, and which to kill. You'll stop wasting 30-40% of your acquisition time on channels that don't convert.

And you'll have the data to back up every decision.

<InteractiveChecklist 
  title="Your Attribution Action Plan" 
  persistKey="analytics-L7-actions" 
  items={[
    "Add 'Lead Source' field to your CRM and make it required",
    "Define your 5-8 lead source categories",
    "Backfill attribution for your existing contacts (best guess)",
    "Set a Friday calendar reminder for weekly attribution review",
    "Add 'How did you hear about us?' to your intake form or first call",
    "Pull your first attribution report (leads, meetings, wins by source)",
    "Calculate revenue per lead for each channel",
    "Identify your #1 quality channel and #1 volume channel",
    "Make one decision: scale, optimize, or kill one channel this month"
  ]} 
/>

---

## Quiz: Channel Attribution Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "question": "Why is first-touch attribution better than last-touch for solo founders making channel investment decisions?",
      "options": [
        "It's more accurate",
        "It tells you which channel is best at bringing new leads in",
        "It's easier to track",
        "It gives credit to all touchpoints"
      ],
      "correctIndex": 1,
      "explanation": "First-touch attribution reveals which channels are best at acquisition — the decision solo founders need to make when allocating limited time and budget."
    },
    {
      "id": "q2",
      "question": "A lead discovers you via a blog post, engages on LinkedIn for 2 months, then closes after an email. Using first-touch attribution, which channel gets credit?",
      "options": [
        "Email",
        "LinkedIn",
        "Content/Inbound",
        "All three equally"
      ],
      "correctIndex": 2,
      "explanation": "First-touch attribution credits the channel that first brought the lead into your world — in this case, the blog post (Content/Inbound)."
    },
    {
      "id": "q3",
      "question": "What is 'dark social' in the context of attribution?",
      "options": [
        "Leads from paid ads",
        "Traffic from private channels you can't track (Slack, text, DMs)",
        "Leads who don't convert",
        "Anonymous website visitors"
      ],
      "correctIndex": 1,
      "explanation": "Dark social refers to conversions that happen through private, untrackable channels like Slack messages, texts, or private DMs — often showing up as 'Direct' traffic."
    },
    {
      "id": "q4",
      "question": "You spend 20 hours/month on LinkedIn (free tool) and generate 1 deal worth $2,000. Your hourly rate is $100. What's your channel ROI?",
      "options": [
        "Infinite (free tool)",
        "1:1 (breakeven)",
        "2:1",
        "10:1"
      ],
      "correctIndex": 1,
      "explanation": "Total cost = $0 (tool) + (20 hours × $100/hr) = $2,000. Revenue = $2,000. ROI = $2,000 / $2,000 = 1:1 (breakeven). Your time is a cost."
    },
    {
      "id": "q5",
      "question": "Which metric is most important when deciding which channel to scale?",
      "options": [
        "Total leads generated",
        "Meetings booked",
        "Revenue per lead",
        "Time spent per lead"
      ],
      "correctIndex": 2,
      "explanation": "Revenue per lead reveals which channel produces the highest-quality leads. This is the key metric for scaling decisions."
    },
    {
      "id": "q6",
      "question": "Why might content marketing look weak in Month 1-3 but strong in Month 6+ of attribution analysis?",
      "options": [
        "Content quality improves over time",
        "Content has a 3-6 month sales cycle lag",
        "More content gets published",
        "SEO rankings improve"
      ],
      "correctIndex": 1,
      "explanation": "Content-sourced leads often have longer sales cycles (3-6 months). Cohort analysis reveals this pattern and prevents you from killing content too early."
    },
    {
      "id": "q7",
      "question": "What should you do if a channel has high volume but low revenue per lead?",
      "options": [
        "Kill it immediately",
        "Scale it for more volume",
        "Optimize targeting and messaging to improve conversion",
        "Ignore it and focus on other channels"
      ],
      "correctIndex": 2,
      "explanation": "High volume + low conversion = optimization opportunity. Improve targeting, messaging, or qualification to unlock the volume's potential."
    },
    {
      "id": "q8",
      "question": "How often should solo founders review attribution data?",
      "options": [
        "Daily",
        "Weekly",
        "Monthly",
        "Quarterly"
      ],
      "correctIndex": 1,
      "explanation": "Weekly reviews (5 minutes) keep you aware of trends. Monthly deep dives (30 minutes) drive channel allocation decisions."
    }
  ]
}