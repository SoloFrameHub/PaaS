---
title: "Multi-Channel Sequence Design (B2B Framing)"
duration: "55 min"
track: "AI-Powered Acquisition"
course: "Course 24: AI Outreach Automation"
lesson: 4
---

## The $47K Mistake

Sarah launched her first multi-channel sequence in January 2025. Email + LinkedIn + voice notes. Seven touches over 21 days. She was proud of the sophistication.

By March, her LinkedIn account was restricted. Her email domain reputation had tanked. And she'd burned through her top 500 prospects with a 2% reply rate.

The problem wasn't the tools. It was the **sequence architecture**.

She'd made three critical errors:
1. **Too many touches, too fast** — 7 touches in 21 days across 3 channels felt like harassment
2. **No channel logic** — LinkedIn connection request on Day 1, email on Day 2, voice note on Day 5 (before they even knew who she was)
3. **Generic personalization** — AI-generated first lines that referenced "your company's growth" (every company grows)

The $47K? That's the pipeline value of those 500 prospects she can never reach again with credibility.

**This lesson teaches you to build sequences that work** — not just sequences that send.

<InsightCard icon="⚡" title="The Core Truth">
Multi-channel done wrong is worse than email-only done right. More channels = more ways to screw up. This lesson gives you the architecture to do it correctly.
</InsightCard>

---

## Section 1: B2B Sequence Architecture Fundamentals

Most founders think "more touches = more replies." That's only true up to a point.

The data from 2025-2026 shows a clear pattern:

<FlipCard 
  front="The 5-7 Touch Sweet Spot" 
  back="80% of B2B replies come from touches 2-5. Touch 1 gets ~30%, Touch 2 gets ~25%, Touches 3-5 get ~25% combined. Beyond Touch 7, you're adding &lt;5% incremental replies while increasing annoyance risk." 
/>

### The Three Sequence Archetypes

<SlideNavigation>
<Slide title="Email-Only (5 touches, 21 days)">

**Best for:**
- Low-to-mid ticket ($1K-5K ACV)
- High-volume outreach (500+ prospects/month)
- Budget-conscious solo founders (&lt;$50/mo tools)

**Structure:**
- Day 1: Personalized problem-focused opener
- Day 4: Different angle on same problem + mini case study
- Day 8: Value-add (resource, insight, data)
- Day 14: Social proof + direct CTA
- Day 21: Warm breakup

**Expected performance:**
- 12-21% cumulative reply rate
- 3-5% meeting conversion
- Cost: $37/mo (Instantly Growth)

</Slide>

<Slide title="Email + LinkedIn (7 touches, 28 days)">

**Best for:**
- Mid-ticket ($5K-15K ACV)
- LinkedIn-active industries (SaaS, consulting, agencies)
- Relationship-first sales

**Structure:**
- Day 1: LinkedIn profile view
- Day 2: Email #1 (personalized opener)
- Day 4: LinkedIn connection request
- Day 7: Email #2 (different angle)
- Day 12: LinkedIn message (if connected) OR Email #3
- Day 18: Email with value-add + social proof
- Day 25: Warm breakup

**Expected performance:**
- 15-25% cumulative reply rate
- 5-8% meeting conversion
- Cost: $97-116/mo (Instantly + HeyReach OR Lemlist Multichannel)

</Slide>

<Slide title="Full Multi-Channel (10 touches, 35 days)">

**Best for:**
- High-ticket ($15K+ ACV)
- Complex sales (multiple stakeholders)
- Tier A prospects only (top 20%)

**Structure:**
- Day 1: LinkedIn profile view
- Day 2: Email #1 (research-based)
- Day 4: LinkedIn connection request
- Day 7: LinkedIn message (if connected)
- Day 9: Email #2 (different angle)
- Day 14: Voice note (Loom/BombBomb)
- Day 18: Email #3 (case study)
- Day 23: LinkedIn comment on their post
- Day 28: Email #4 (social proof)
- Day 35: Warm breakup

**Expected performance:**
- 20-35% cumulative reply rate
- 10-15% meeting conversion
- Cost: $150-200/mo (Lemlist + Loom + HeyReach)

</Slide>
</SlideNavigation>

<RangeSlider 
  label="What's your average deal size (ACV)?" 
  min={500} 
  max={50000} 
  step={500}
  lowLabel="$500" 
  highLabel="$50K+" 
  persistKey="ai-outreach-automation-L4-acv" 
/>

<ContextualNote showWhen={{ acv: { min: 0, max: 5000 } }} variant="personalized" title="For Your Deal Size">
Stick with **Email-Only (5 touches)**. Multi-channel adds cost and complexity without proportional ROI at this ACV. Master email first, then experiment with LinkedIn for Tier A only.
</ContextualNote>

<ContextualNote showWhen={{ acv: { min: 5001, max: 15000 } }} variant="personalized" title="For Your Deal Size">
**Email + LinkedIn (7 touches)** is your sweet spot. The 20-30% reply rate boost from LinkedIn justifies the $60-80/mo incremental cost. Use Lemlist Multichannel ($99/mo) or Instantly + HeyReach ($116/mo).
</ContextualNote>

<ContextualNote showWhen={{ acv: { min: 15001, max: 100000 } }} variant="personalized" title="For Your Deal Size">
**Full Multi-Channel (10 touches)** makes sense for Tier A prospects. But don't use it for everyone — segment your list. Top 20% get the full treatment, middle 50% get Email + LinkedIn, bottom 30% get email-only or disqualified.
</ContextualNote>

---

## Section 2: The Angle Rotation Principle

Here's where most sequences fail: **every email says the same thing in different words**.

Bad sequence:
- Email 1: "We help companies like yours grow revenue"
- Email 2: "Following up on my last email about growing revenue"
- Email 3: "Still interested in growing revenue?"

This is **repetition**, not **rotation**.

<FlipCard 
  front="The Angle Rotation Principle" 
  back="Each touch should approach the SAME problem from a DIFFERENT angle. Problem → Evidence → Insight → Proof → Exit. Never repeat the same angle twice." 
/>

### The 5-Angle Framework

<TemplateBuilder
  title="Build Your 5-Angle Sequence"
  persistKey="ai-outreach-automation-L4-angles"
  sections={[
    {
      id: "angle1",
      title: "Angle 1: Problem Statement (Day 1)",
      fields: [
        { 
          id: "problem", 
          label: "What specific problem does your ICP face?", 
          placeholder: "e.g., Manual data entry eating 10+ hours/week", 
          type: "textarea" 
        },
        { 
          id: "impact", 
          label: "What's the measurable impact of this problem?", 
          placeholder: "e.g., Costs $2K+/month in labor, delays reporting by 5 days", 
          type: "text" 
        }
      ]
    },
    {
      id: "angle2",
      title: "Angle 2: Solution Evidence (Day 4)",
      fields: [
        { 
          id: "evidence", 
          label: "What proof do you have that your solution works?", 
          placeholder: "e.g., 3 similar companies reduced data entry by 80%", 
          type: "textarea" 
        },
        { 
          id: "metric", 
          label: "What's the key metric?", 
          placeholder: "e.g., 10 hours → 2 hours per week", 
          type: "text" 
        }
      ]
    },
    {
      id: "angle3",
      title: "Angle 3: Industry Insight (Day 8)",
      fields: [
        { 
          id: "insight", 
          label: "What industry trend or data point is relevant?", 
          placeholder: "e.g., 67% of agencies still use spreadsheets for client reporting", 
          type: "textarea" 
        },
        { 
          id: "resource", 
          label: "What resource can you share?", 
          placeholder: "e.g., Link to benchmark report, template, or tool", 
          type: "text" 
        }
      ]
    },
    {
      id: "angle4",
      title: "Angle 4: Social Proof (Day 14)",
      fields: [
        { 
          id: "testimonial", 
          label: "What's a specific customer result?", 
          placeholder: "e.g., 'We saved 12 hours/week and our clients love the new dashboards' — Sarah, VP Ops", 
          type: "textarea" 
        },
        { 
          id: "cta", 
          label: "What's the direct CTA?", 
          placeholder: "e.g., 15-minute demo, send you a sample report, free audit", 
          type: "text" 
        }
      ]
    },
    {
      id: "angle5",
      title: "Angle 5: Warm Breakup (Day 21)",
      fields: [
        { 
          id: "exit", 
          label: "How do you close the loop without burning bridges?", 
          placeholder: "e.g., 'Totally understand if now's not the time. Mind if I check back in Q3?'", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

<ExampleCard label="Real Example: Angle Rotation Done Right">

**Company:** DataPulse (automated reporting for agencies)  
**ICP:** Marketing agencies, 10-50 employees, manual client reporting

**Email 1 (Day 1) — Problem:**
> Hi `{first_name}`,
> 
> Noticed your team posts monthly client reports on LinkedIn — looks like a lot of manual work pulling data from 5+ platforms.
> 
> Most agencies we work with were spending 10-15 hours/month on this before automating. Does that sound familiar?

**Email 2 (Day 4) — Evidence:**
> Hi `{first_name}`,
> 
> Quick follow-up: we helped 3 agencies similar to yours (10-20 clients, multi-platform reporting) cut reporting time from 12 hours to 2 hours per month.
> 
> The key was automating the data pull + template generation. Happy to show you how it works — 15 minutes?

**Email 3 (Day 8) — Insight:**
> Hi `{first_name}`,
> 
> Saw this stat and thought of you: 67% of agencies still use spreadsheets for client reporting (2025 Agency Benchmark Report).
> 
> We built a free template that pulls GA4 + Meta + LinkedIn data into one dashboard. Want me to send it over? No strings attached.

**Email 4 (Day 14) — Proof:**
> Hi `{first_name}`,
> 
> One more thing: Sarah at BrightPath Agency (similar size to yours) said this after switching:
> 
> *"We saved 12 hours/week and our clients love the new dashboards. Wish we'd done this a year ago."*
> 
> If you're curious, I can send you a sample report we'd build for your top client. Takes me 10 minutes.

**Email 5 (Day 21) — Exit:**
> Hi `{first_name}`,
> 
> I know you're busy, so I'll stop filling your inbox. If reporting automation isn't a priority right now, totally get it.
> 
> Mind if I check back in Q3? Things usually shift after mid-year planning.

</ExampleCard>

<InsightCard icon="🎯" title="Why This Works">
Each email gives a NEW reason to reply. Email 1: "Yes, we spend too much time on this." Email 2: "Show me the proof." Email 3: "I want the free template." Email 4: "I want to see a sample." Email 5: "Actually, let's talk now before you go away."
</InsightCard>

---

## Section 3: Channel Timing & Logic

Adding LinkedIn to your sequence isn't just "send an email, then send a LinkedIn message." There's a **logic** to when and why you use each channel.

<FlipCard 
  front="The Channel Hierarchy" 
  back="LinkedIn View (passive signal) → Email (primary pitch) → LinkedIn Connect (relationship request) → LinkedIn Message (if connected) OR Email Follow-up (if not). Never reverse this order." 
/>

### The Multi-Channel Decision Tree

<DecisionTree
  title="Should You Add This LinkedIn Touch?"
  persistKey="ai-outreach-automation-L4-linkedin-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "You're building a sequence. Should you add LinkedIn touches?", 
      choices: [
        { label: "My ICP is active on LinkedIn (posts 1x/week+)", nextNodeId: "active" },
        { label: "My ICP rarely uses LinkedIn", nextNodeId: "skip" }
      ]
    },
    { 
      id: "active", 
      content: "Good. Are you willing to spend $79-99/mo on LinkedIn automation (HeyReach or Lemlist)?", 
      choices: [
        { label: "Yes, budget allows", nextNodeId: "budget-yes" },
        { label: "No, need to stay under $50/mo", nextNodeId: "budget-no" }
      ]
    },
    { 
      id: "skip", 
      content: "Stick with email-only. LinkedIn won't add meaningful lift if your ICP doesn't engage there.", 
      isTerminal: true, 
      outcome: "neutral" 
    },
    { 
      id: "budget-yes", 
      content: "Perfect. Use this sequence: Day 1 LinkedIn view → Day 2 Email → Day 4 LinkedIn connect → Day 7 Email follow-up → Day 12 LinkedIn message (if connected).", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "budget-no", 
      content: "Do manual LinkedIn touches for Tier A only (top 20%). View their profile before sending Email 1. Connect after Email 2 if they don't reply. Keep the rest email-only.", 
      isTerminal: true, 
      outcome: "positive" 
    }
  ]}
/>

### The 3-4-5 Spacing Rule

<FlipCard 
  front="The 3-4-5 Spacing Rule" 
  back="Early touches: 3 days apart (urgency). Middle touches: 4 days apart (persistence). Late touches: 5-7 days apart (respect). Never send 2 emails within 48 hours unless they replied." 
/>

Here's why spacing matters:

**Too fast (every 2 days):**
- Feels aggressive
- Triggers spam filters (high send frequency from new domain)
- Doesn't give them time to process

**Too slow (every 7+ days):**
- They forget who you are
- Loses momentum
- Takes 6+ weeks to complete a 5-touch sequence

**Just right (3-4-5 pattern):**
- Balances urgency and respect
- Stays top-of-mind without harassment
- Completes in 21-28 days (optimal B2B cycle)

<ScenarioSimulator
  title="Sequence Timing Calculator"
  persistKey="ai-outreach-automation-L4-timing"
  levers={[
    { id: "touches", label: "Number of touches", min: 3, max: 10, step: 1, defaultValue: 5 },
    { id: "spacing", label: "Average days between touches", min: 2, max: 7, step: 1, defaultValue: 4 }
  ]}
  outputs={[
    { 
      id: "duration", 
      label: "Total sequence duration", 
      formula: "(touches - 1) * spacing", 
      unit: " days", 
      precision: 0 
    },
    { 
      id: "emails-per-month", 
      label: "Emails sent per prospect per month", 
      formula: "Math.round((30 / ((touches - 1) * spacing)) * touches * 10) / 10", 
      unit: "", 
      precision: 1 
    }
  ]}
  insight="At `{duration}` days total, you'll complete the sequence in {Math.round(duration / 7)} weeks. If you're sending to 100 prospects/month, that's {Math.round(touches * 100)} total emails across all sequences."
/>

---

## Section 4: LinkedIn Integration Points

Let's get specific about **when** and **how** to use LinkedIn in your sequence.

### The 4 LinkedIn Touch Types

<SlideNavigation>
<Slide title="1. Profile View (Passive Signal)">

**When:** Day 1, before first email  
**Purpose:** Trigger a notification, create familiarity  
**Risk:** Low (viewing is normal behavior)  
**Tool:** HeyReach, Lemlist, or manual

**How it works:**
- They get a notification: "`{Your Name}` viewed your profile"
- 30-40% will view your profile back
- When they see your email the next day, you're not a total stranger

**Best practice:**
- View their profile 12-24 hours before sending Email 1
- Don't view multiple times (looks stalker-ish)
- Make sure your LinkedIn profile is optimized (clear headline, professional photo)

</Slide>

<Slide title="2. Connection Request (Relationship Ask)">

**When:** Day 4, after Email 1 sent  
**Purpose:** Build relationship, unlock messaging  
**Risk:** Medium (can be ignored or rejected)  
**Tool:** HeyReach, Lemlist, or manual

**How it works:**
- Send a personalized connection note (300 characters max)
- 25-35% acceptance rate for cold requests
- If accepted, you can now send LinkedIn messages

**Best practice:**
- Reference something specific: "Saw your post on [topic]" or "We're both in [industry]"
- Don't pitch in the connection note
- If they don't accept within 7 days, continue with email-only

**Example connection note:**
> Hi `{first_name}`, I'm reaching out to marketing agency leaders about reporting automation. Would love to connect and share some insights from our work with similar teams.

</Slide>

<Slide title="3. LinkedIn Message (Direct Pitch)">

**When:** Day 12, if they accepted your connection request  
**Purpose:** Different channel, same conversation  
**Risk:** Medium (can be ignored, reported as spam)  
**Tool:** HeyReach, Lemlist, or manual

**How it works:**
- Only send if they accepted your connection
- Keep it short (3-4 sentences max)
- Reference your email conversation: "I sent you an email last week about..."

**Best practice:**
- Don't repeat your email verbatim
- Use a different angle (if Email 2 was evidence, LinkedIn message could be insight)
- Include a soft CTA: "Curious to hear your thoughts"

**Example LinkedIn message:**
> Hi `{first_name}`, thanks for connecting! I sent you an email last week about automating client reporting. Thought you might find this relevant: we just published a benchmark report showing 67% of agencies still use manual processes. Want me to send it over?

</Slide>

<Slide title="4. Post Engagement (Social Signal)">

**When:** Day 18-23, if they're active on LinkedIn  
**Purpose:** Stay visible, show genuine interest  
**Risk:** Low (engagement is normal)  
**Tool:** Manual only (don't automate likes/comments)

**How it works:**
- Find a recent post they published
- Leave a thoughtful comment (2-3 sentences)
- Don't pitch, just add value

**Best practice:**
- Only do this if they post regularly (1x/week+)
- Comment should stand alone (valuable even if they don't know you)
- Don't tag them in your own post (too aggressive)

**Example comment:**
> Great point about the shift to first-party data. We're seeing the same trend with our agency clients — the ones who invested in owned data infrastructure early are way ahead now. Curious how you're thinking about attribution in this new model?

</Slide>
</SlideNavigation>

<ClassifyExercise
  title="Classify These LinkedIn Touches"
  persistKey="ai-outreach-automation-L4-classify"
  categories={[
    { id: "good", label: "Good Practice", color: "#10b981" },
    { id: "risky", label: "Risky", color: "#f59e0b" },
    { id: "bad", label: "Bad Practice", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "View their profile on Day 1, send email on Day 2", 
      correctCategory: "good",
      explanation: "Perfect timing. The view creates familiarity before the email arrives."
    },
    { 
      id: "2", 
      content: "Send connection request with a pitch in the note", 
      correctCategory: "bad",
      explanation: "Never pitch in the connection note. It's the fastest way to get ignored or reported."
    },
    { 
      id: "3", 
      content: "Send LinkedIn message to someone who didn't accept your connection", 
      correctCategory: "bad",
      explanation: "You can't message non-connections unless you have InMail credits. And even then, it's aggressive."
    },
    { 
      id: "4", 
      content: "Comment on their post without mentioning your product", 
      correctCategory: "good",
      explanation: "Genuine engagement builds familiarity. Just don't pitch in the comment."
    },
    { 
      id: "5", 
      content: "View their profile 5 times in one week", 
      correctCategory: "bad",
      explanation: "Looks like stalking. One view is enough."
    },
    { 
      id: "6", 
      content: "Send LinkedIn message on Day 12 if they accepted connection on Day 5", 
      correctCategory: "good",
      explanation: "Good timing. You've given them a week to see your emails, now you're adding a LinkedIn touch."
    },
    { 
      id: "7", 
      content: "Use HeyReach to auto-like their last 10 posts", 
      correctCategory: "risky",
      explanation: "Automated engagement can trigger LinkedIn's spam detection. Do this manually for Tier A only."
    },
    { 
      id: "8", 
      content: "Send connection request on Day 1, before any email", 
      correctCategory: "risky",
      explanation: "Not terrible, but better to send email first so they know who you are when the connection request arrives."
    }
  ]}
/>

---

## Section 5: The Warm Exit Framework

Most founders screw up the last email. They either:
1. **Ghost** — Just stop emailing (leaves a bad taste)
2. **Guilt-trip** — "I guess you're not interested..." (passive-aggressive)
3. **Beg** — "Please just give me 5 minutes..." (desperate)

None of these work.

<FlipCard 
  front="The Warm Exit Framework" 
  back="Acknowledge they may not be interested → Leave the door open → Offer to reconnect later → No guilt, no pressure. 10-20% of breakup emails get replies." 
/>

### The 4-Part Breakup Email

<TemplateBuilder
  title="Build Your Warm Exit Email"
  persistKey="ai-outreach-automation-L4-breakup"
  sections={[
    {
      id: "acknowledge",
      title: "Part 1: Acknowledge",
      fields: [
        { 
          id: "acknowledge-text", 
          label: "Acknowledge they may not be interested (no guilt)", 
          placeholder: "e.g., I know you're busy, so I'll stop filling your inbox.", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "door-open",
      title: "Part 2: Leave the Door Open",
      fields: [
        { 
          id: "door-text", 
          label: "Make it clear they can reply anytime", 
          placeholder: "e.g., If reporting automation becomes a priority down the road, feel free to reach out.", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "reconnect",
      title: "Part 3: Offer to Reconnect",
      fields: [
        { 
          id: "reconnect-text", 
          label: "Suggest a future touchpoint (3-6 months)", 
          placeholder: "e.g., Mind if I check back in Q3? Things usually shift after mid-year planning.", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "value-add",
      title: "Part 4: Optional Value-Add",
      fields: [
        { 
          id: "value-text", 
          label: "Offer something useful with no strings (optional)", 
          placeholder: "e.g., In the meantime, here's that free template I mentioned — might save you a few hours.", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

<ExampleCard label="Real Breakup Email That Got a Reply">

**Subject:** Closing the loop

> Hi Sarah,
> 
> I know you're busy, so I'll stop filling your inbox.
> 
> If reporting automation isn't a priority right now, totally get it. Most agencies we work with waited 6-12 months before making the switch.
> 
> Mind if I check back in Q3? Things usually shift after mid-year planning.
> 
> In the meantime, here's that free GA4 + Meta dashboard template I mentioned — might save you a few hours even if you don't use our tool.
> 
> [Link to template]
> 
> Best,  
> Alex

**Result:** Sarah replied 3 days later: "Actually, let's talk. We just lost a client over a reporting mistake and I'm done with manual processes."

</ExampleCard>

<InsightCard icon="💡" title="Why Breakup Emails Work">
They trigger FOMO ("This is my last chance") + remove pressure ("No guilt if I ignore this") + demonstrate respect ("They're not desperate"). 10-20% of breakup emails get replies, often from people who were interested but busy.
</InsightCard>

---

## Section 6: Sequence Variants by Deal Size

Not all sequences should be the same length. Your ACV determines how much effort is justified.

<StrategyDuel
  title="5-Touch vs 10-Touch Sequences"
  persistKey="ai-outreach-automation-L4-duel"
  scenario="You're deciding how many touches to include in your sequence. Your ACV is $8K."
  strategyA={{ 
    name: "5-Touch Email-Only", 
    description: "Simple, fast, scalable. 21 days, email-only, AI personalization.", 
    pros: ["Lower cost ($37/mo)", "Faster to build", "Can run 500+ prospects/month"], 
    cons: ["Lower reply rate (12-15%)", "Misses LinkedIn-active prospects"] 
  }}
  strategyB={{ 
    name: "10-Touch Multi-Channel", 
    description: "Email + LinkedIn + voice notes. 35 days, manual personalization for Tier A.", 
    pros: ["Higher reply rate (20-30%)", "Better for relationship sales"], 
    cons: ["Higher cost ($150/mo)", "Slower (200 prospects/month max)", "More complex"] 
  }}
  expertVerdict="At $8K ACV, go with **7-Touch Email + LinkedIn** (the middle option). 5-touch leaves money on the table, 10-touch is overkill. Use Lemlist Multichannel ($99/mo) or Instantly + HeyReach ($116/mo). Save the 10-touch sequence for $15K+ deals."
/>

### The ACV-to-Sequence Matrix

| ACV | Recommended Touches | Channels | Duration | Personalization | Tool Cost |
|-----|-------------------|----------|----------|----------------|-----------|
| &lt;$1K | 3-4 | Email only | 14 days | Template + segment | $37/mo |
| $1-5K | 5 | Email only | 21 days | AI first-line | $37/mo |
| $5-15K | 7 | Email + LinkedIn | 28 days | AI research-based | $99-116/mo |
| $15K+ | 10 | Email + LinkedIn + voice | 35 days | AI + manual Tier A | $150-200/mo |

<RangeSlider 
  label="Refine: What's your average deal size?" 
  min={500} 
  max={50000} 
  step={500}
  lowLabel="$500" 
  highLabel="$50K+" 
  persistKey="ai-outreach-automation-L4-acv-refine" 
/>

---

## Section 7: Build Your First Multi-Channel Sequence

Time to put it all together. You're going to build a complete sequence using the frameworks from this lesson.

<TemplateBuilder
  title="Your Multi-Channel Sequence Blueprint"
  persistKey="ai-outreach-automation-L4-sequence"
  sections={[
    {
      id: "basics",
      title: "Sequence Basics",
      fields: [
        { 
          id: "name", 
          label: "Sequence name", 
          placeholder: "e.g., Agency Reporting Automation - Q2 2026", 
          type: "text" 
        },
        { 
          id: "icp", 
          label: "Target ICP", 
          placeholder: "e.g., Marketing agencies, 10-50 employees, manual client reporting", 
          type: "textarea" 
        },
        { 
          id: "acv", 
          label: "Average deal size", 
          placeholder: "e.g., $8,000", 
          type: "text" 
        },
        { 
          id: "touches", 
          label: "Number of touches", 
          placeholder: "e.g., 7", 
          type: "text" 
        },
        { 
          id: "channels", 
          label: "Channels used", 
          placeholder: "e.g., Email + LinkedIn", 
          type: "text" 
        }
      ]
    },
    {
      id: "touch1",
      title: "Touch 1: LinkedIn Profile View (Day 1)",
      fields: [
        { 
          id: "t1-action", 
          label: "Action", 
          placeholder: "View their LinkedIn profile", 
          type: "text" 
        },
        { 
          id: "t1-purpose", 
          label: "Purpose", 
          placeholder: "Create familiarity before email", 
          type: "text" 
        }
      ]
    },
    {
      id: "touch2",
      title: "Touch 2: Email #1 (Day 2)",
      fields: [
        { 
          id: "t2-subject", 
          label: "Subject line", 
          placeholder: "e.g., Your monthly client reports", 
          type: "text" 
        },
        { 
          id: "t2-angle", 
          label: "Angle", 
          placeholder: "e.g., Problem statement", 
          type: "text" 
        },
        { 
          id: "t2-body", 
          label: "Email body (first draft)", 
          placeholder: "Write your email here...", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "touch3",
      title: "Touch 3: LinkedIn Connection Request (Day 4)",
      fields: [
        { 
          id: "t3-note", 
          label: "Connection note (300 characters max)", 
          placeholder: "e.g., Hi `{first_name}`, I'm reaching out to agency leaders about reporting automation. Would love to connect.", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "touch4",
      title: "Touch 4: Email #2 (Day 7)",
      fields: [
        { 
          id: "t4-subject", 
          label: "Subject line", 
          placeholder: "e.g., Re: Your monthly client reports", 
          type: "text" 
        },
        { 
          id: "t4-angle", 
          label: "Angle", 
          placeholder: "e.g., Solution evidence", 
          type: "text" 
        },
        { 
          id: "t4-body", 
          label: "Email body", 
          placeholder: "Write your email here...", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "touch5",
      title: "Touch 5: LinkedIn Message OR Email #3 (Day 12)",
      fields: [
        { 
          id: "t5-channel", 
          label: "Channel (LinkedIn if connected, Email if not)", 
          placeholder: "e.g., LinkedIn message", 
          type: "text" 
        },
        { 
          id: "t5-angle", 
          label: "Angle", 
          placeholder: "e.g., Industry insight", 
          type: "text" 
        },
        { 
          id: "t5-body", 
          label: "Message body", 
          placeholder: "Write your message here...", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "touch6",
      title: "Touch 6: Email #4 (Day 18)",
      fields: [
        { 
          id: "t6-subject", 
          label: "Subject line", 
          placeholder: "e.g., How BrightPath Agency saved 12 hours/week", 
          type: "text" 
        },
        { 
          id: "t6-angle", 
          label: "Angle", 
          placeholder: "e.g., Social proof", 
          type: "text" 
        },
        { 
          id: "t6-body", 
          label: "Email body", 
          placeholder: "Write your email here...", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "touch7",
      title: "Touch 7: Warm Breakup Email (Day 25)",
      fields: [
        { 
          id: "t7-subject", 
          label: "Subject line", 
          placeholder: "e.g., Closing the loop", 
          type: "text" 
        },
        { 
          id: "t7-body", 
          label: "Email body (use Warm Exit Framework)", 
          placeholder: "Write your breakup email here...", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

<InsightCard icon="🎯" title="Next Step">
Once you've filled out this blueprint, you'll configure it in your outreach tool (Instantly, Lemlist, or HeyReach) in the next lesson. For now, focus on getting the **architecture** right: timing, angles, and channel logic.
</InsightCard>

---

## Section 8: Common Sequence Mistakes (And How to Avoid Them)

Let's look at the mistakes that tank sequences — and how to fix them.

<SwipeDecision
  title="Good Sequence or Bad Sequence?"
  description="Swipe right for well-designed sequences, left for broken ones"
  optionA="Broken"
  optionB="Well-Designed"
  persistKey="ai-outreach-automation-L4-swipe"
  cards={[
    { 
      id: "1", 
      content: "7 touches in 14 days (every 2 days)", 
      correctOption: "a", 
      explanation: "Too fast. Feels aggressive and doesn't give prospects time to process. Use 3-4-5 spacing instead." 
    },
    { 
      id: "2", 
      content: "5 touches over 21 days (Days 1, 4, 8, 14, 21)", 
      correctOption: "b", 
      explanation: "Perfect spacing. Balances urgency and respect." 
    },
    { 
      id: "3", 
      content: "Every email says 'following up on my last email'", 
      correctOption: "a", 
      explanation: "No angle rotation. Each email should approach the problem from a different angle, not just repeat the ask." 
    },
    { 
      id: "4", 
      content: "LinkedIn connection request on Day 1, email on Day 2", 
      correctOption: "a", 
      explanation: "Backwards. Email first, then LinkedIn. They need to know who you are before the connection request." 
    },
    { 
      id: "5", 
      content: "LinkedIn view on Day 1, email on Day 2, LinkedIn connect on Day 4", 
      correctOption: "b", 
      explanation: "Perfect LinkedIn integration. View → Email → Connect is the right sequence." 
    },
    { 
      id: "6", 
      content: "Final email: 'I guess you're not interested...'", 
      correctOption: "a", 
      explanation: "Passive-aggressive breakup. Use the Warm Exit Framework instead: acknowledge, leave door open, offer to reconnect." 
    },
    { 
      id: "7", 
      content: "10 touches for a $2K ACV product", 
      correctOption: "a", 
      explanation: "Overkill. 10 touches is for $15K+ deals. Use 5 touches for $2K ACV." 
    },
    { 
      id: "8", 
      content: "5 touches for a $20K ACV product", 
      correctOption: "a", 
      explanation: "Leaving money on the table. $20K deals justify 10 touches with manual personalization for Tier A." 
    },
    { 
      id: "9", 
      content: "Email 1: Problem. Email 2: Evidence. Email 3: Insight. Email 4: Proof. Email 5: Breakup.", 
      correctOption: "b", 
      explanation: "Perfect angle rotation. Each email approaches the same problem from a different angle." 
    },
    { 
      id: "10", 
      content: "Breakup email offers a free resource with no strings attached", 
      correctOption: "b", 
      explanation: "Great warm exit. Leaves the door open and provides value even if they don't buy." 
    }
  ]}
/>

---

## Summary & Action Items

You now have the architecture for multi-channel sequences that work. Here's what you learned:

1. **The 5-7 Touch Sweet Spot** — 80% of replies come from touches 2-5; beyond 7 touches shows diminishing returns
2. **The Angle Rotation Principle** — Each email should approach the same problem from a different angle (Problem → Evidence → Insight → Proof → Exit)
3. **The 3-4-5 Spacing Rule** — Early touches: 3 days apart. Middle: 4 days. Late: 5-7 days.
4. **LinkedIn Integration Logic** — View → Email → Connect → Message (if connected). Never reverse this order.
5. **The Warm Exit Framework** — Acknowledge → Leave door open → Offer to reconnect → Optional value-add
6. **ACV-to-Sequence Matrix** — Low-ticket: 5 touches. Mid-ticket: 7 touches. High-ticket: 10 touches.

<InteractiveChecklist 
  title="Your Action Items" 
  persistKey="ai-outreach-automation-L4-actions" 
  items={[
    "Complete the Multi-Channel Sequence Blueprint above (all 7 touches)",
    "Review your sequence against the 3-4-5 Spacing Rule — adjust timing if needed",
    "Check that each email uses a different angle (no repetition)",
    "Verify LinkedIn touches follow the correct order (View → Email → Connect → Message)",
    "Write your Warm Exit email using the 4-part framework",
    "Calculate total sequence cost based on your chosen tools and ACV",
    "Identify your Tier A prospects (top 20%) who will get the full sequence",
    "Set up a reminder to build this sequence in your outreach tool (next lesson)"
  ]} 
/>

---

## Mini-Quiz: Test Your Sequence Design Skills

<details>
<summary><strong>Question 1:</strong> You're building a sequence for a $6K ACV product. How many touches should you include?</summary>

**Answer:** 5-7 touches. At $6K ACV, you're in the mid-ticket range. 5 touches (email-only) is the minimum, but 7 touches (email + LinkedIn) will give you 20-30% higher reply rates and justify the incremental cost.

**Why not 3-4 touches?** You'd be leaving money on the table. Mid-ticket deals justify more effort.

**Why not 10 touches?** Overkill for $6K. Save 10-touch sequences for $15K+ deals.

</details>

<details>
<summary><strong>Question 2:</strong> Your prospect didn't accept your LinkedIn connection request. What should you do on Day 12?</summary>

**Answer:** Send Email #3 instead of a LinkedIn message. You can't message non-connections (unless you have InMail credits, which are expensive). Stick with email for prospects who don't connect.

**Why not send another connection request?** LinkedIn limits how many pending requests you can have. Don't waste slots on people who already ignored you once.

**Why not skip Day 12 entirely?** You still need to maintain the sequence cadence. Just use email instead of LinkedIn.

</details>

<details>
<summary><strong>Question 3:</strong> What's wrong with this breakup email? "I've reached out several times and haven't heard back. I guess you're not interested. Let me know if that changes."</summary>

**Answer:** It's passive-aggressive and guilt-trippy. The Warm Exit Framework says: (1) Acknowledge without guilt, (2) Leave the door open, (3) Offer to reconnect, (4) Optional value-add.

**Better version:** "I know you're busy, so I'll stop filling your inbox. If reporting automation becomes a priority down the road, feel free to reach out. Mind if I check back in Q3?"

**Why does this matter?** Passive-aggressive breakups burn bridges. You might need to reach out again in 6 months when their situation changes.

</details>

---

**Next Lesson:** You'll take this sequence blueprint and configure it in your outreach tool (Instantly, Lemlist, or HeyReach). We'll cover campaign settings, A/B test setup, daily send limits, and deliverability safeguards.