---
title: "Lesson 3: The 80/20 Content Mix"
lesson: 3
description: "Stop the content hamster wheel. Build evergreen assets that compound while you sleep."
---

# Lesson 3: The 80/20 Content Mix

Let's talk about "Sarah."

Sarah is a solo founder who launched a time-tracking tool for lawyers. She is a content machine. Every morning, she wakes up, checks the news, and writes a "hot take" on the latest legal tech trend or a viral LinkedIn post. For six months, her engagement was through the roof. She was getting hundreds of likes and comments. She felt like a star.

But then, Sarah got sick. She took two weeks off to recover. When she came back, her traffic had dropped to **zero**. Her inbox was empty. Because 100% of her content was **Timely**, it had a "shelf life" of about 24 hours. The moment she stopped feeding the monster, the monster died.

Sarah was on the **Content Hamster Wheel**. She didn't have a marketing engine; she had a marketing job—and it was a job she couldn't quit.

<InsightCard icon="⚠️" title="The Content Trap">
If your traffic drops to zero when you stop posting, you don't have a marketing engine—you have a marketing job.
</InsightCard>

In this lesson, we are going to implement the **80/20 Content Mix**. We are going to shift your energy away from "disposable" content and toward **Evergreen Assets** that compound in value while you sleep, eat, and take vacations.

<RangeSlider 
  label="What percentage of your current content is still valuable 6 months later?" 
  min={0} 
  max={100} 
  lowLabel="0% (All timely)" 
  highLabel="100% (All evergreen)" 
  persistKey="technical-content-L3-evergreen-current" 
/>

---

## 1. The Physics of Content Decay: Understanding "Half-Life"

Every piece of content you post has a "Half-Life"— the amount of time it takes for it to lose 50% of its value (views and engagement).

*   **The Tweet/X Post:** Half-life of **18 minutes**. If it doesn't go viral, it's buried in the noise before you finish your coffee.
*   **The LinkedIn Post:** Half-life of **24 hours**. By day 3, it's gone from the feed.
*   **The Blog Post (Evergreen):** Half-life of **2 years**. A well-written, SEO-optimized guide can actually *increase* in value over time as it gains authority.

If you spend 4 hours writing a LinkedIn post, you are buying 24 hours of visibility. That is a terrible ROI. If you spend those same 4 hours writing an evergreen guide, you are buying 700+ days of visibility. 

As a solo founder, you must be a **Value Investor**, not a Day Trader.

<ScenarioSimulator
  title="Content ROI Calculator"
  persistKey="technical-content-L3-roi-sim"
  levers={[
    { id: "hours", label: "Hours spent creating", min: 1, max: 8, step: 0.5, defaultValue: 4 },
    { id: "halfLife", label: "Content half-life (days)", min: 1, max: 730, step: 1, defaultValue: 1 }
  ]}
  outputs={[
    { id: "totalDays", label: "Effective visibility days", formula: "(halfLife * 3)", unit: " days", precision: 0 },
    { id: "hourPerDay", label: "Hours invested per day of visibility", formula: "(hours / (halfLife * 3))", unit: " hrs/day", precision: 2 }
  ]}
  insight="At {hourPerDay} hours per day of visibility, you're {hourPerDay > 0.1 ? 'on the hamster wheel' : 'building compounding assets'}."
/>

---

## 2. Evergreen Content: The Compounding Asset

**Evergreen content** is content that stays relevant for 12, 18, or even 36 months. It solves fundamental, structural problems that your ICP has today and will still have next year. 

Think of Evergreen content as **Employee Zero**. It's the 24/7 salesperson who never gets tired, never asks for a raise, and never forgets the script.

### The 3 Archetypes of Evergreen Content:

<SlideNavigation>
<Slide title="1. The Tactical 'How-To'">

A definitive guide to solving a recurring technical problem.

**Example:** "How to set up DMARC and SPF for a new domain to ensure 99% email deliverability."

**Why it works:** People will be searching for this specific technical solution for years.

</Slide>

<Slide title="2. The Fundamental Framework">

A proprietary way of thinking about a broad challenge.

**Example:** "The 3-Tier Reply System for LinkedIn Engagement."

**Why it works:** It establishes you as a "Master of Methodology."

</Slide>

<Slide title="3. The Comparison/Review">

Helping someone make a buying decision.

**Example:** "Apollo vs. Sales Navigator: A Comparison for Bootstrapped Founders."

**Why it works:** High-intent buyers look for these comparisons right before they pull out their credit card.

</Slide>
</SlideNavigation>

<ClassifyExercise
  title="Classify These Content Ideas"
  persistKey="technical-content-L3-classify"
  categories={[
    { id: "evergreen", label: "Evergreen (12+ months)", color: "#10b981" },
    { id: "timely", label: "Timely (< 30 days)", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "My reaction to today's OpenAI announcement", correctCategory: "timely" },
    { id: "2", content: "The complete guide to cold email deliverability", correctCategory: "evergreen" },
    { id: "3", content: "What I learned at SaaStr 2024", correctCategory: "timely" },
    { id: "4", content: "How to build your first sales sequence from scratch", correctCategory: "evergreen" },
    { id: "5", content: "Why the new Google algorithm update changes everything", correctCategory: "timely" },
    { id: "6", content: "Notion vs. Airtable: Which CRM for solo founders?", correctCategory: "evergreen" }
  ]}
/>

---

## 3. Timely Content: The Engagement Spark

If evergreen content is the fuel, **timely content** is the spark. You cannot ignore the "Now" entirely, or you will look like a bot. Timely content shows that you are an active practitioner who is "in the arena" today.

### The Strategic Use of Timely Content:

*   **Newsjacking:** Providing a unique, practitioner-level perspective on a major industry event. (e.g., "What the Google Antitrust ruling means for independent SaaS founders.")
*   **Event Reflections:** Sharing 3 specific takeaways from a conference you attended.
*   **Seasonal Trends:** Preparing your audience for Q4 or the new year.
*   **The "Hot Take":** Challenging a trending opinion to spark debate and show individual thought.

**The Golden Rule of Timely Content:** Never just report the news. **Contextualize the news.** Anyone can say "X happened." Only you can say "X happened, and here is exactly how it will impact YOUR revenue next month."

---

## 4. The 80/20 Mix: Balancing Your Portfolio

The goal is to reach a **"Golden Ratio"** where 80% of your total content library is Evergreen and 20% is Timely. 

However, your ratio will shift depending on your current track:

| Stage | Evergreen | Timely | Rationale |
| :--- | :--- | :--- | :--- |
| **Pre-Traction (0-10 Sales)** | 100% | 0% | You have no authority yet. You need to build a library of "proof" that yours is the right solution. |
| **Early Traction** | 90% | 10% | Start introducing your voice into the current industry conversations. |
| **Established (Track 2+)** | 80% | 20% | You have a foundation of traffic. You use the 20% timely content to keep your brand "fresh" and "relevant." |

---

## 5. Reframing: Moving from Timely to Evergreen

One of the most powerful skills a solo founder can develop is the ability to **Reframe**. Most "Timely" ideas can be rewritten as "Evergreen" assets with just a small shift in focus.

<RewriteExercise
  title="Reframe Timely → Evergreen"
  persistKey="technical-content-L3-reframe"
  original="My thoughts on the new ChatGPT update (May 2024)."
  hint="Focus on the underlying skill or lesson, not the specific event"
  expertRewrite="How to use LLMs to automate 80% of your customer support documentation."
  criteria={["Removes date-specific references", "Focuses on fundamental skill/problem", "Will be relevant in 12+ months"]}
/>

**More Examples:**

*   **Timely (Weak):** *"Why I'm excited to go to SaaStr next week."*
*   **Evergreen (Strong):** *"The Solo Founder's Guide to Networking at Huge Conferences Without Burning Out."*

By focusing on the **Lesson** rather than the **Event**, you create an asset that lives forever.

---

## 6. The Content Inventory Audit (CIA)

If you have been creating content for a while, you likely have a "Graveyard" of old posts. Some of these are Timely fossils (e.g., "Our 2022 Roadmap"), but many are "Hidden Evergreen" assets that just need a fresh coat of paint.

**The Audit Workflow:**
1.  **Examine your analytics from 12 months ago.** Look for posts that are still getting *any* traffic today. These are your true evergreen winners.
2.  **Update the "Leads."** If a post is still ranking, check if the Call to Action (CTA) is still relevant. Is it linking to an old product version or a dead lead magnet?
3.  **The 20% Refresh.** You don't need to rewrite the whole piece. Update a few data points, add a new case study, and update the "Publish Date." This "Freshness Signal" can often double the traffic to an evergreen post overnight.

By performing a CIA every six months, you ensure your "Passive Acquisition Engine" is always optimized and contributing to your bottom line.

<InteractiveChecklist 
  title="Your Content Inventory Audit (CIA) Checklist" 
  persistKey="technical-content-L3-cia-checklist" 
  items={[
    "Pull analytics for all content from 12+ months ago",
    "Identify posts still getting traffic (your hidden evergreen winners)",
    "Check CTAs on evergreen posts—are they still relevant?",
    "Update 3-5 data points in your top evergreen post",
    "Add a recent case study or example to refresh credibility",
    "Update publish date to signal freshness",
    "Schedule next CIA for 6 months from now"
  ]} 
/>

---

## 7. Dual Context Strategy

### B2B SaaS Founder: The "Migration" Method
*   **Evergreen:** "The Ultimate Guide to Moving from Legacy Databases to [Your Product]."
*   **Timely:** "How the recent [Competitor] data breach proves that [Your Method] is the only safe option."
*   **The Result:** You use the timely event to drive people into your evergreen "How-To" authority.

### Creator/Coach Founder: The "Mindset" Method
*   **Evergreen:** "The 5-Step Framework for Managing Founder Burnout."
*   **Timely:** "Reflections on why [Famous Founder] just quit their company, and what we can learn about long-term sustainability."
*   **The Result:** You capitalize on a trending story to prove that your evergreen framework is necessary.

<StrategyDuel
  title="Timely vs. Evergreen: Which Gets More Long-Term Value?"
  persistKey="technical-content-L3-duel"
  scenario="You have 4 hours this week to create content. You can write one piece."
  strategyA={{ 
    name: "Timely Hot Take", 
    description: "React to this week's industry news with a strong opinion piece", 
    pros: ["High immediate engagement", "Shows you're current", "Easy to write quickly"], 
    cons: ["Dead in 48 hours", "Doesn't build authority", "Requires constant feeding"] 
  }}
  strategyB={{ 
    name: "Evergreen Guide", 
    description: "Write 'The Complete Guide to [Fundamental Problem]'", 
    pros: ["Compounds for 12-24 months", "Builds authority", "Ranks in search"], 
    cons: ["Slower initial traction", "Requires more research", "Less immediate dopamine"] 
  }}
  expertVerdict="Evergreen wins for solo founders. One great guide can generate leads for 2 years. Ten hot takes generate leads for 2 days."
/>

---

## 7. Key Takeaways

1.  **Stop Day-Trading your time.** Invest it in assets that compound.
2.  **Every Timely Post is a Leak.** If it dies in 24 hours, it didn't help you build a sustainable machine.
3.  **Evergreen is Employee Zero.** It sells for you while you sleep.
4.  **The 80/20 Ratio is your North Star.** Ensure the vast majority of your work is still valuable 12 months from now.
5.  **Reframing is a Superpower.** Always look for the evergreen lesson hidden inside the timely event.

---

## 8. Practice Exercise: The Portfolio Audit

<TemplateBuilder
  title="Your Content Portfolio Audit"
  persistKey="technical-content-L3-portfolio"
  sections={[
    {
      id: "analysis",
      title: "Last 10 Posts Analysis",
      fields: [
        { id: "evergreen-count", label: "How many were Evergreen (still valuable next year)?", placeholder: "e.g., 3", type: "text" },
        { id: "timely-count", label: "How many were Timely (useless in 30 days)?", placeholder: "e.g., 7", type: "text" },
        { id: "current-ratio", label: "Your Current Evergreen %", placeholder: "e.g., 30%", type: "text" }
      ]
    },
    {
      id: "reframe",
      title: "The Reframe Challenge",
      fields: [
        { id: "timely-1", label: "Popular Timely Post #1 (original title)", placeholder: "e.g., My thoughts on the new AI update", type: "text" },
        { id: "evergreen-1", label: "Reframed as Evergreen", placeholder: "e.g., How to integrate AI into your workflow without breaking things", type: "textarea" },
        { id: "timely-2", label: "Popular Timely Post #2 (original title)", placeholder: "e.g., What I learned at this week's conference", type: "text" },
        { id: "evergreen-2", label: "Reframed as Evergreen", placeholder: "e.g., The solo founder's guide to conference networking", type: "textarea" }
      ]
    },
    {
      id: "seeds",
      title: "3 Evergreen Seed Topics",
      fields: [
        { id: "seed-1", label: "Fundamental Problem #1", placeholder: "e.g., How to write cold emails that get replies", type: "text" },
        { id: "seed-2", label: "Fundamental Problem #2", placeholder: "e.g., How to build a lead list from scratch", type: "text" },
        { id: "seed-3", label: "Fundamental Problem #3", placeholder: "e.g., How to automate follow-ups without sounding robotic", type: "text" }
      ]
    }
  ]}
/>

---

## Quiz: The 80/20 Content Portfolio

```json
{
  "quizId": "80-20-content-deep-v1",
  "title": "Strategy: Timely vs. Evergreen",
  "questions": [
    {
      "id": "tm1",
      "type": "multiple-choice",
      "text": "What is the primary danger of over-indexing on 'Timely' content?",
      "options": [
        { "id": "a", "text": "It makes you look too unprofessional." },
        { "id": "b", "text": "It has a short half-life, meaning you have to stay on a 'content hamster wheel' to remain visible." },
        { "id": "c", "text": "People on LinkedIn don't like reading the news." },
        { "id": "d", "text": "It is harder to write than evergreen content." }
      ],
      "correctAnswer": "b",
      "explanation": "Timely content loses its value quickly. If you only produce timely content, your marketing engine stops the moment you stop creating."
    },
    {
      "id": "tm2",
      "type": "multiple-choice",
      "text": "Which of the following is an example of 'Evergreen' content?",
      "options": [
        { "id": "a", "text": "A reaction to today's interest rate announcement." },
        { "id": "b", "text": "A photo of what you had for lunch at a conference." },
        { "id": "c", "text": "A 2,000-word definitive guide on 'How to automate your first B2B sales sequence'." },
        { "id": "d", "text": "A 'Hot Take' on a viral meme from this morning." }
      ],
      "correctAnswer": "c",
      "explanation": "Evergreen content solves fundamental, long-term problems. The 'How-To' guide will be just as relevant in a year as it is today."
    },
    {
      "id": "tm3",
      "type": "multiple-choice",
      "text": "What should be your ratio of Evergreen content during the 'Pre-Traction' phase?",
      "options": [
        { "id": "a", "text": "50% Evergreen / 50% Timely" },
        { "id": "b", "text": "20% Evergreen / 80% Timely" },
        { "id": "c", "text": "100% Evergreen" },
        { "id": "d", "text": "0% Evergreen / 100% Timely" }
      ],
      "correctAnswer": "c",
      "explanation": "When you have no authority, you cannot afford to waste time on content that disappears. You must spend 100% of your energy building a library of compounding assets."
    }
  ]
}
```

**Next Lesson:** [Pillar 2: The "Practitioner Voice" Blueprint](/marketing-engine/technical-content/lesson-4)