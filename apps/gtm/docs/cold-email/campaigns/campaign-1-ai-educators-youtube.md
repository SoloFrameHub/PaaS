# Campaign 1: AI Educators + YouTube

**List:** `filtered - AI Educator AND Youtube_1-114.csv`
**Records:** 2,930
**Daily send volume:** 30/day
**Depletion time:** ~14 weeks at current volume

---

## Audience Profile

These prospects are **AI educators and content creators** with YouTube presence. They teach others how to use AI tools, build AI products, or implement AI strategies. Many run courses, consulting practices, or SaaS products alongside their content.

**Key insight:** These people already _understand_ AI. They don't need to be sold on AI-powered tools — they need to see how YOUR specific AI implementation solves a problem they personally face (customer acquisition) or a problem their audience faces.

**Primary angle:** "You teach people how to use AI — here's an AI system that solves the customer acquisition problem your audience keeps asking about."

**Secondary angle:** "You're building an audience, but converting that audience to paying customers is the hard part."

---

## Personalization Variables

### From CSV (Direct)

| Instantly.ai Variable | CSV Column  | Example                                     |
| --------------------- | ----------- | ------------------------------------------- |
| `{{firstName}}`       | `firstname` | Jacob                                       |
| `{{company}}`         | `company`   | Assertion AI                                |
| `{{headline}}`        | `headline`  | CoFounder/Managing Director @ AI2 Incubator |
| `{{location}}`        | `location`  | Seattle, Washington                         |

### AI-Generated (via n8n enrichment)

| Instantly.ai Variable | Generated From                    | Example                                                                                                                                                |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{{icebreaker}}`      | `headline` + `summary`            | "Your work at AI2 Incubator turning AI research into real companies is exactly the zero-to-one problem I wrote about"                                  |
| `{{painPoint}}`       | `summary` + `company_description` | "helping AI startups get their first customers after the tech is built"                                                                                |
| `{{personalizedPs}}`  | `company` + `industry`            | "PS — I'd be curious how AI2 portfolio companies handle their first 10 sales conversations. The frameworks in Ch 4 were built for exactly that stage." |

---

## 3-Email Sequence

### Email 1 — Day 0: The Hook

**Subject Line A:** `{{firstName}}, quick question about your AI content`

**Subject Line B:** `the customer acquisition gap in AI education`

**Body:**

```
Hey {{firstName}},

{{icebreaker}}.

I wrote a book on customer acquisition specifically for solo technical founders — the ones who can build anything but struggle to sell it. It covers frameworks for ICP targeting, discovery calls, objection handling, and pipeline automation.

I also built an AI-powered operating system (Solo GTM OS) that applies these frameworks to your specific situation — it scores your acquisition readiness, lets you practice discovery calls against AI buyer personas with different DISC personalities, and builds your actual playbook artifacts as you learn.

Given your audience of AI-focused builders, I thought you might find it useful — either for your own work or as a resource for your community.

The full book is free to read online: ai-solo-gtm-os.soloframehub.com/book

Happy to send a PDF copy if you prefer. No strings.

— Mike

{{personalizedPs}}
```

**Character count:** ~750 (under recommended 800 for cold email)

---

### Email 2 — Day 3: The Framework

**Subject Line A:** `the AI roleplay thing I mentioned`

**Subject Line B:** `re: AI-powered sales practice`

**Body:**

```
Hey {{firstName}},

Quick follow-up — wanted to share one specific thing from the platform that might resonate with your audience:

The Solo GTM OS includes an AI roleplay system where founders practice discovery calls against buyer personas built on the DISC behavioral framework. Each persona reacts differently — the Analytical buyer wants data, the Driver wants ROI, the Expressive buyer wants vision.

Founders practice before the real conversation. No scripts, no role-playing with a friend who's too nice. An AI that actually pushes back with realistic objections.

If {{painPoint}} is something your audience deals with, this might be worth a look or even a content piece.

Either way — curious what you think.

— Mike
```

**Character count:** ~600

---

### Email 3 — Day 7: The Last Touch

**Subject Line A:** `last note from me, {{firstName}}`

**Subject Line B:** `closing the loop`

**Body:**

```
Hey {{firstName}},

Last message from me on this — I know your inbox is busy.

Three quick links if any of this is relevant:

1. Free online book: ai-solo-gtm-os.soloframehub.com/book (all 15 chapters, ungated)
2. Solo GTM OS (free during beta): ai-solo-gtm-os.soloframehub.com
3. Free Readiness Score (5 min, no signup): ai-solo-gtm-os.soloframehub.com/readiness-score

If the timing isn't right, totally understand. If you ever want to chat about AI in customer acquisition — for your audience or your own projects — I'm easy to find.

— Mike
```

**Character count:** ~450

---

## Instantly.ai Configuration

**Campaign name:** `AI Educators YouTube - Book Launch Feb 2026`
**Sending accounts:** Rotate across all 5 domains
**Daily limit:** 30 emails/day
**Timezone:** Recipient's timezone (if available) or PST
**Send window:** 8am - 12pm (weekdays only)

**Sequence timing:**

- Email 1: Day 0
- Email 2: Day 3 (skip if replied)
- Email 3: Day 7 (skip if replied)

**Stop conditions:**

- Replied (any reply)
- Bounced
- Unsubscribed
- Opened Email 3 but didn't reply (move to "re-engage" list for Month 2)

---

## Reply Handling Templates

**Positive interest:**

> Thanks for the interest, {{firstName}}! Here's the PDF — [link]. The Solo GTM OS is free during beta if you want to try the AI roleplay and coaching: ai-solo-gtm-os.soloframehub.com. Would love your honest take on both.

**Content collaboration inquiry:**

> That would be awesome. A few ideas: (1) I could write a guest piece for your audience on [specific framework], (2) we could do a joint livestream walking through the AI roleplay feature, (3) I can offer your audience free beta access to the Solo GTM OS. What sounds most interesting?

**Not now / too busy:**

> Totally understand — timing is everything. I'll keep building. If you're ever curious down the road, the book stays free online at ai-solo-gtm-os.soloframehub.com/book. Best of luck with [their project].

---

## AI Enrichment Prompt (for n8n workflow)

```
You are generating personalized cold email fields for an outreach campaign. The sender (Mike) wrote a book called "The Solo Founder's AI-Powered Customer Acquisition Playbook" and built the Solo GTM OS — an AI-powered operating system for solo founders to systematize customer acquisition.

The recipient is an AI educator/content creator. Generate personalized fields based on their profile.

RECIPIENT DATA:
- Name: {{firstName}} {{lastName}}
- Headline: {{headline}}
- Summary: {{summary}}
- Company: {{company}}
- Company Description: {{company_description}}
- Location: {{location}}

Generate these fields as JSON:

1. "icebreaker": A genuine, specific 1-sentence observation about their work that connects to customer acquisition, AI, or building products. Reference something specific from their headline or summary. Do NOT be generic. Do NOT compliment — observe. Max 25 words.

2. "painPoint": A brief phrase (5-12 words) describing the customer acquisition challenge most relevant to them based on their profile. Frame it as something "their audience" deals with if they're an educator, or something they personally face if they're a founder.

3. "personalizedPs": A 1-2 sentence PS that connects something specific about their company or work to a specific chapter or framework from the book. Reference a chapter number or framework name. Max 30 words.

Return ONLY valid JSON with these three fields. No explanation.
```
