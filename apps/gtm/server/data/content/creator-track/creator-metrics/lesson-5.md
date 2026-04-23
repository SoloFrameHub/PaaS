---
title: "Launch vs Evergreen Metrics"
duration: "50 min"
track: "Creator Economy"
course: "Course 26: Creator Metrics That Matter"
lesson: 5
---

# Launch vs Evergreen Metrics

There are two fundamentally different business models in the creator economy, and they require completely different metrics. The **launch model** generates revenue in concentrated bursts -- you open the doors, sell hard for 5-14 days, then close. The **evergreen model** generates revenue continuously -- your funnel runs daily, selling to people as they enter your ecosystem.

Most creators start with launches and eventually transition to evergreen (or a hybrid). But here is the problem: they keep measuring their evergreen system with launch metrics, or they try to apply evergreen standards to their launches. This mismatch leads to panic, bad decisions, and premature pivots.

This lesson gives you the right metrics for each model and a framework for deciding when to switch.

<RangeSlider 
  label="Which model are you currently using?" 
  min={1} 
  max={3} 
  lowLabel="Pure Launch" 
  midLabel="Hybrid" 
  highLabel="Pure Evergreen" 
  persistKey="creator-metrics-L5-model" 
/>

---

## Launch Model Metrics

A launch is a time-bound sales event. You build up anticipation, open enrollment, and close the doors on a specific date. The compressed timeline creates urgency and allows you to concentrate your energy.

### The 6 Launch Metrics That Matter

<SlideNavigation>
<Slide title="1. Registration Rate">

The percentage of your audience who registers for your launch event (webinar, challenge, workshop, video series).

**Benchmark:** 5-15% of your email list should register for your launch event

**Formula:** Total Registrants / Total Email List Size x 100

If you have a list of 5,000 and 400 register, that is 8% -- healthy. If only 150 register (3%), your launch hook is weak or your list is fatigued.

</Slide>

<Slide title="2. Show-Up Rate">

Covered in depth in Lesson 2. For launch-specific events:

**Benchmark:** 30-45% for free webinars, 50-70% for paid workshops ($27-97), 60-80% for challenges (Day 1)

</Slide>

<Slide title="3. Offer Conversion Rate">

The percentage of attendees who purchase during the launch window.

**Benchmark by mechanism:**
- Webinar to course ($200-$997): 5-15% of attendees
- Webinar to high-ticket ($2,000+): 2-8% of attendees (who then book calls)
- Challenge to course: 3-10% of Day 1 attendees
- Workshop to program: 8-20% of attendees (higher because paid attendees are more committed)

</Slide>

<Slide title="4. Cart Page Conversion Rate">

Of people who visit your sales/checkout page, how many actually complete the purchase?

**Benchmark:** 10-25% cart page conversion rate

If your cart page conversion is below 10%, common causes include:
- Price shock (the price was not mentioned during the event)
- Too many options/packages causing decision paralysis
- Checkout friction (too many form fields, no payment plan option, unclear guarantee)

</Slide>

<Slide title="5. Revenue Per Registrant (RPR)">

This is your launch-specific version of Revenue Per Subscriber.

**Formula:** Total Launch Revenue / Total Registrants

**Benchmark:**
- Low-ticket launch ($200-500 offer): $10-40 RPR
- Mid-ticket launch ($500-2,000 offer): $30-100 RPR
- High-ticket launch ($2,000+ offer): $50-200 RPR

RPR is the single number that tells you whether your entire launch system is working. Track it across launches to see if your launch performance is improving or declining.

</Slide>

<Slide title="6. Cart Close Urgency Curve">

This tracks when sales happen during your launch window:

**Typical distribution for a 7-day launch:**
- Day 1 (open cart): 25-35% of total sales
- Days 2-5: 10-20% of total sales (the "dead zone")
- Day 6: 15-20% of total sales (urgency kicks in)
- Day 7 (cart close): 30-40% of total sales

If you do not see a spike on the final day, your deadline is not credible. If more than 40% of sales happen on Day 1, your audience is warm but your launch sequence is not adding value during the middle days.

</Slide>
</SlideNavigation>

<ScenarioSimulator
  title="Launch Revenue Calculator"
  persistKey="creator-metrics-L5-launch-calc"
  levers={[
    { id: "listSize", label: "Email list size", min: 1000, max: 50000, step: 1000, defaultValue: 5000 },
    { id: "regRate", label: "Registration rate (%)", min: 3, max: 15, step: 1, defaultValue: 8 },
    { id: "showRate", label: "Show-up rate (%)", min: 20, max: 60, step: 5, defaultValue: 35 },
    { id: "convRate", label: "Offer conversion rate (%)", min: 2, max: 15, step: 1, defaultValue: 8 },
    { id: "price", label: "Offer price ($)", min: 200, max: 3000, step: 100, defaultValue: 497 }
  ]}
  outputs={[
    { id: "registrants", label: "Registrants", formula: "(listSize * (regRate / 100))", unit: "", precision: 0 },
    { id: "attendees", label: "Attendees", formula: "(listSize * (regRate / 100) * (showRate / 100))", unit: "", precision: 0 },
    { id: "buyers", label: "Buyers", formula: "(listSize * (regRate / 100) * (showRate / 100) * (convRate / 100))", unit: "", precision: 0 },
    { id: "revenue", label: "Total revenue", formula: "(listSize * (regRate / 100) * (showRate / 100) * (convRate / 100) * price)", unit: "$", precision: 0 },
    { id: "rpr", label: "Revenue per registrant", formula: "((listSize * (regRate / 100) * (showRate / 100) * (convRate / 100) * price) / (listSize * (regRate / 100)))", unit: "$", precision: 2 }
  ]}
  insight="At {buyers} buyers × ${price}, your RPR is ${rpr}. Industry benchmark for a ${price} offer is $30-100 RPR."
/>

---

## Evergreen Model Metrics

An evergreen funnel runs continuously. There is no "launch day" -- someone can enter your funnel today and reach the purchase point 3-14 days from now, every day of the year.

### The 6 Evergreen Metrics That Matter

<ProgressiveReveal title="The 6 Evergreen Metrics" persistKey="creator-metrics-L5-evergreen">
<RevealSection title="1. Daily Opt-In Rate">

How many new leads enter your funnel each day?

**Benchmark by traffic source:**
- Organic content (social, SEO, podcast): 5-30 per day depending on audience size
- Paid ads: depends entirely on budget, but target $3-15 per opt-in for most creator niches

**Formula:** Total New Opt-Ins This Week / 7

This is your "fuel gauge." If daily opt-ins drop below your minimum viable number, revenue will decline 7-14 days later (once the pipeline dries up).

</RevealSection>

<RevealSection title="2. Automated Webinar View Rate">

If you use an automated/on-demand webinar as your primary conversion event:

**Benchmark:** 25-40% of opt-ins watch the webinar within 7 days

Below 25% means your email sequence is not compelling enough to drive people to watch. Above 40% indicates strong lead quality and effective nurture emails.

</RevealSection>

<RevealSection title="3. Sales Per Day (SPD)">

The most important evergreen metric. How many sales do you make per day, on average?

**Formula:** Total Sales This Month / 30

**Why it matters:** SPD is your evergreen "heartbeat." It tells you whether your funnel is healthy at a glance. Track it on a rolling 7-day and 30-day average to smooth out daily variance.

**Example targets:**
- 1 sale/day of a $497 product = $14,910/month
- 0.5 sales/day of a $2,000 product = $30,000/month
- 0.2 sales/day of a $5,000 coaching package = $30,000/month

</RevealSection>

<RevealSection title="4. Time-to-Purchase (TTP)">

The average number of days between someone opting in and making their first purchase.

**Benchmark:**
- Low-ticket ($50-200): 1-7 days
- Mid-ticket ($200-1,000): 7-21 days
- High-ticket ($1,000+): 14-45 days

TTP helps you set realistic expectations for cash flow. If your TTP is 21 days, money you spend on ads today will not return for 3 weeks. Plan your cash flow accordingly.

</RevealSection>

<RevealSection title="5. Email Sequence Conversion Rate">

The percentage of people who opt in and eventually purchase through your email sequence.

**Benchmark:**
- Basic welcome sequence (3-5 emails): 0.5-2% conversion
- Full nurture sequence (7-14 emails): 1-5% conversion
- Sequence with automated webinar: 2-8% conversion

</RevealSection>

<RevealSection title="6. Funnel ROI (for paid traffic)">

**Formula:** (Revenue from Funnel - Ad Spend) / Ad Spend x 100

**Benchmark:**
- 0-50% ROI in the first 30 days: Acceptable if you have a backend (upsells, recurring)
- 50-100% ROI in 30 days: Good
- 100%+ ROI in 30 days: Strong
- 200%+ ROI in 30 days: Scale aggressively

Many successful evergreen funnels break even on the front end (0% ROI at 30 days) and make their profit on the backend through upsells, order bumps, and recurring revenue. If you only measure front-end ROI, you will kill profitable funnels prematurely.

</RevealSection>
</ProgressiveReveal>

<InsightCard icon="💡" title="The SPD Advantage">
Sales Per Day is the single most powerful evergreen metric because it normalizes variance. A launch might generate $50K in one week and $0 the next three weeks. An evergreen funnel generating 0.5 sales/day of a $2K offer produces $30K/month consistently -- easier to forecast, easier to scale.
</InsightCard>

---

## When to Switch From Launch to Evergreen

The launch model is not inherently better or worse than evergreen. Each has advantages:

<StrategyDuel
  title="Launch vs Evergreen: Which Model Fits You?"
  persistKey="creator-metrics-L5-duel"
  scenario="You have a proven $497 course and 8,000 email subscribers. You've done 3 successful launches averaging $35K each."
  strategyA={{
    name: "Stay Launch",
    description: "Continue doing 4 launches per year",
    pros: [
      "Concentrated energy and attention",
      "Revenue spikes help with cash flow planning",
      "Cohort-based delivery creates community",
      "Launch events re-engage dormant subscribers"
    ],
    cons: [
      "Emotional roller coaster of launch cycles",
      "Revenue gaps between launches",
      "Requires constant new content/hooks",
      "Burnout risk from repeated intensity"
    ]
  }}
  strategyB={{
    name: "Go Evergreen",
    description: "Build an automated funnel running daily",
    pros: [
      "Predictable monthly revenue",
      "No burnout from launch cycles",
      "Scales with traffic (not your energy)",
      "Works while you sleep/travel"
    ],
    cons: [
      "Requires proven webinar/sales process",
      "Needs consistent daily traffic (20+ opt-ins/day)",
      "Less community/cohort energy",
      "Harder to re-engage cold subscribers"
    ]
  }}
  expertVerdict="At 8K subscribers with proven launch data, you're ready for evergreen. Start with a hybrid: evergreen funnel for baseline revenue ($15-20K/month), plus 2 launches/year for growth spurts and list re-engagement."
/>

### Stay with Launches When:
- Your audience is small (under 5,000 email subscribers) -- launches concentrate attention
- Your offer is new and unproven -- launches give you fast feedback
- You enjoy the energy and intensity of launch periods
- Your offer benefits from cohort-based delivery (group programs, live courses)
- You are still refining your messaging and positioning

### Switch to Evergreen When:
- You have proven launch data (at least 2-3 successful launches with the same offer)
- Your audience is large enough to generate consistent daily opt-ins (20+ per day)
- You are burning out from the launch cycle (the emotional roller coaster is unsustainable)
- Your offer works as well self-paced as it does live
- You want predictable monthly revenue instead of revenue spikes

### The Hybrid Model
Many successful creators use both: an evergreen funnel that runs daily, plus 2-4 launches per year that create revenue spikes and re-engage dormant subscribers. The evergreen funnel provides the baseline; launches provide the growth spurts.

**Hybrid benchmark:** Your evergreen revenue should be 60-70% of your total annual revenue, with launches contributing 30-40%.

<ClassifyExercise
  title="Classify These Creators by Best Model"
  persistKey="creator-metrics-L5-classify"
  categories={[
    { id: "launch", label: "Launch Model", color: "#ef4444" },
    { id: "evergreen", label: "Evergreen Model", color: "#3b82f6" },
    { id: "hybrid", label: "Hybrid Model", color: "#8b5cf6" }
  ]}
  items={[
    { 
      id: "1", 
      content: "2,000 subscribers, first course launch, cohort-based program", 
      correctCategory: "launch",
      explanation: "Small list + unproven offer + cohort delivery = launch model is best"
    },
    { 
      id: "2", 
      content: "15,000 subscribers, 3 successful launches, self-paced course, generating 40 opt-ins/day organically", 
      correctCategory: "evergreen",
      explanation: "Large list + proven offer + consistent traffic + self-paced = ready for evergreen"
    },
    { 
      id: "3", 
      content: "10,000 subscribers, evergreen funnel doing $20K/month, wants to re-engage cold subscribers", 
      correctCategory: "hybrid",
      explanation: "Working evergreen base + desire to spike revenue and re-engage = add launches to hybrid"
    },
    { 
      id: "4", 
      content: "8,000 subscribers, proven webinar converting at 12%, but only getting 5 opt-ins/day", 
      correctCategory: "launch",
      explanation: "Proven offer but insufficient daily traffic for evergreen sustainability"
    },
    { 
      id: "5", 
      content: "20,000 subscribers, successful evergreen funnel, wants to test a new high-ticket offer", 
      correctCategory: "hybrid",
      explanation: "Keep evergreen base running, use launches to test new offers with concentrated attention"
    }
  ]}
/>

---

## The Transition Framework

If you are moving from launch to evergreen, here is the data you need first:

1. **Your proven webinar or sales event** -- the exact presentation that has converted at 5%+ during at least two launches
2. **Your email sequence** -- at least 7 emails with open rates above 25% and click rates above 3%
3. **Your front-end offer metrics** -- price, conversion rate, and average order value including upsells
4. **Your traffic plan** -- how you will generate 10-30 daily opt-ins without launch energy driving them

Do not try to build an evergreen funnel from scratch. Take what worked in your launches and automate it. The webinar becomes an on-demand webinar. The email sequence becomes an automated nurture sequence. The cart close deadline becomes an automated deadline (tools like Deadline Funnel create real per-person deadlines).

<TemplateBuilder
  title="Evergreen Transition Checklist"
  persistKey="creator-metrics-L5-transition"
  sections={[
    {
      id: "proven-assets",
      title: "Proven Assets",
      fields: [
        { 
          id: "webinar", 
          label: "Webinar/sales event that converted at 5%+ in launches", 
          placeholder: "e.g., 'The 5-Step Framework' webinar - 8% conversion in last 2 launches", 
          type: "textarea" 
        },
        { 
          id: "emails", 
          label: "Email sequence with strong engagement metrics", 
          placeholder: "e.g., 7-email sequence, avg 28% open rate, 4% click rate", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "offer-metrics",
      title: "Offer Metrics",
      fields: [
        { 
          id: "price", 
          label: "Front-end offer price", 
          placeholder: "e.g., $497", 
          type: "text" 
        },
        { 
          id: "conversion", 
          label: "Launch conversion rate (attendees to buyers)", 
          placeholder: "e.g., 8% of webinar attendees", 
          type: "text" 
        },
        { 
          id: "aov", 
          label: "Average order value (including upsells/bumps)", 
          placeholder: "e.g., $612 with order bump", 
          type: "text" 
        }
      ]
    },
    {
      id: "traffic-plan",
      title: "Traffic Plan",
      fields: [
        { 
          id: "sources", 
          label: "How will you generate 20+ daily opt-ins?", 
          placeholder: "e.g., YouTube SEO (10/day) + Facebook ads ($50/day budget, $5 CPA = 10/day)", 
          type: "textarea" 
        },
        { 
          id: "timeline", 
          label: "When will you have consistent traffic?", 
          placeholder: "e.g., YouTube content publishing for 90 days, ads launch in 30 days", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

---

## Action Items

<InteractiveChecklist 
  title="Your Launch vs Evergreen Action Items" 
  persistKey="creator-metrics-L5-actions" 
  items={[
    "Identify your current model: Are you running launches, evergreen, or hybrid? Write it down.",
    "Track the right 6 metrics: Based on your model, set up tracking for the 6 metrics that apply to you.",
    "Calculate your RPR or SPD: If you launch, calculate Revenue Per Registrant from your last launch. If you're evergreen, calculate Sales Per Day for the last 30 days.",
    "Assess transition readiness: If you're launch-only, review the 'Switch to Evergreen When' criteria. How many do you meet?",
    "If transitioning to evergreen: Complete the Evergreen Transition Checklist above to identify gaps in your proven assets, offer metrics, or traffic plan."
  ]} 
/>

---

**Next Lesson:** [Audience-to-Revenue Ratio](/creator-track/creator-metrics/lesson-6)