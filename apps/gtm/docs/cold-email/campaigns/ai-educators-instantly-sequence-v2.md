# AI Educators SF Book Launch — Instantly Sequence v2

**List:** `Al Educators SF Book Launch - validated by zerobounce.csv`
**Records:** 1,202 ZeroBounce-validated
**Campaign name in Instantly:** `AI Educators SF - GTM OS Relaunch Mar 2026`
**Daily limit:** 30/day (conservative restart after pause)
**Send window:** 8am-12pm recipient timezone, weekdays only
**Sending accounts:** Rotate across all warmed domains

---

## Custom Variables (map in Instantly)

| Instantly Variable    | CSV Column                 |
| --------------------- | -------------------------- |
| `{{firstName}}`       | `First Name` (auto-mapped) |
| `{{lastName}}`        | `Last Name` (auto-mapped)  |
| `{{companyName}}`     | `companyName`              |
| `{{headline}}`        | `headline`                 |
| `{{location}}`        | `location`                 |
| `{{icebreaker}}`      | `icebreaker`               |
| `{{painPoint}}`       | `painPoint`                |
| `{{personalization}}` | `personalization`          |

---

## Email 1 — Day 0

**Subject Line A:**

```
{{firstName}}, I built a full GTM operating system with Claude Code
```

**Subject Line B:**

```
one founder, no engineering team, an entire OS
```

**Body:**

```
Hey {{firstName}},

{{icebreaker}}

I used Claude Code to build an entire GTM operating system — no engineering team, no agency, just me and a terminal.

48 courses across 7 tracks. An AI sales roleplay simulator where you practice discovery calls against buyer personas who push back with real objections. AI coaching personalized to your business. Pipeline and outreach tracking. CRM sync. The works.

The AI roleplay is the part founders spend the most time in. You pick a buyer persona — analytical, driver, expressive, supportive (DISC framework). The AI pushes back: "we don't have budget," "we're already talking to a competitor," "send me more data." The real call isn't the first time you hear those objections.

The tech: Next.js 16, Drizzle ORM, PostgreSQL, Claude/GPT for the AI layer, n8n for automation, NodeBB for community. Self-hosted on a VPS. Under $100/month infrastructure.

I also wrote the book behind it — 98,000 words on customer acquisition for technical founders. Free to read online: ai-solo-gtm-os.soloframehub.com/book

Given what you're building at {{companyName}}, thought you'd find either the tech or the frameworks useful.

Happy to send a PDF of the book — just reply "send it."

— Mike
```

---

## Email 2 — Day 3 (skip if replied)

**Subject Line A:**

```
the part of the OS founders use most
```

**Subject Line B:**

```
re: the Claude Code GTM build
```

**Body:**

```
Hey {{firstName}},

Quick follow-up on the Solo GTM OS I mentioned.

The feature that gets the most usage is the discovery call simulator — and the reason is simple: most founders lose deals in the first five minutes. Not because the product is wrong. Because they pitch before they diagnose.

Three qualifying questions before anyone gets on a call:

1. Can we genuinely help them?
2. Will they pay what we need to charge?
3. Will they be good to work with?

Miss one and you get burnout, broke clients, or a bad reputation. This filter cuts the pipeline in half — but the half that remains converts at 7x the rate.

The simulator lets you practice this against AI buyer personas that actually fight back. The analytical type wants a spreadsheet before they'll talk. The driver wants to know ROI in the first 30 seconds. The expressive wants to hear the vision, not the spec sheet.

{{personalization}}

The whole OS is free during beta: ai-solo-gtm-os.soloframehub.com

— Mike
```

---

## Email 3 — Day 7 (skip if replied)

**Subject Line A:**

```
last note — 5 minutes to find your blind spot
```

**Subject Line B:**

```
closing the loop, {{firstName}}
```

**Body:**

```
Hey {{firstName}},

Last message from me.

If anything about the Claude Code build or the acquisition frameworks resonated, three quick links:

1. Readiness Score (5 min, no signup) — tells you exactly where your acquisition system breaks down: ai-solo-gtm-os.soloframehub.com/readiness-score

2. The book (free, 15 chapters, 98K words): ai-solo-gtm-os.soloframehub.com/book

3. The Solo GTM OS (free during beta): ai-solo-gtm-os.soloframehub.com

If the timing isn't right, totally get it. If you ever want to compare notes on building with Claude Code or acquisition for technical products — I'm easy to find.

— Mike
```

---

## Sequence Configuration in Instantly

### Timing

| Step    | Day   | Condition                       |
| ------- | ----- | ------------------------------- |
| Email 1 | Day 0 | All 1,202 leads                 |
| Email 2 | Day 3 | Skip if replied to Email 1      |
| Email 3 | Day 7 | Skip if replied to any previous |

### A/B Testing

- Email 1: Two subject lines (A/B split automatic in Instantly)
- Email 2: Two subject lines (A/B split)
- Email 3: Two subject lines (A/B split)
- Kill underperforming variant after 200 sends. Measure by reply rate, not open rate.

### Stop Conditions

- Replied (any reply)
- Bounced
- Unsubscribed
- Completed sequence with no engagement → move to "re-engage Q3" list

---

## Auto-Reply (Instantly auto-responder)

**Trigger:** Reply containing "send" OR any positive reply

**Auto-reply:**

```
Here you go: https://files.soloframehub.com/share/caa-playbook

If you're short on time, highest-leverage chapters:
- Ch 2: ICP Framework — stops you from chasing wrong-fit buyers
- Ch 4: Discovery Calls — turns sales conversations into diagnostic sessions
- Ch 7: Automation Stack — what to automate first (and what to never automate)

And if you want to see where your biggest acquisition gaps are, the Readiness Score takes 5 minutes:
ai-solo-gtm-os.soloframehub.com/readiness-score

— Mike
```

### Tags to Apply

| Tag              | When                                      |
| ---------------- | ----------------------------------------- |
| `pdf-requested`  | They reply asking for PDF                 |
| `engaged`        | Substantive reply beyond "send it"        |
| `readiness-sent` | Auto-reply sent with Readiness Score link |

---

## Reply Handling Templates

**Positive interest / wants to learn more:**

```
Glad it connected, {{firstName}}. The Readiness Score is the fastest way to see what the OS does — takes 5 minutes and tells you exactly where your acquisition system breaks down: ai-solo-gtm-os.soloframehub.com/readiness-score

If any chapter from the book maps to what {{companyName}} is building right now, happy to dig in. And if you get a chance to leave an Amazon review, it genuinely helps — new book, discoverability is brutal: https://www.amazon.com/dp/B0GMP2T8QH
```

**Questions about the Claude Code build / technical stack:**

```
Happy to get into it. The full stack: Next.js 16 with Turbopack, Drizzle ORM on PostgreSQL, Claude and GPT for the AI coaching and roleplay layers, DISC-based persona engine for the buyer simulations, n8n for background automation, NodeBB for community with AI-facilitated discussions. Self-hosted on a single VPS — Dokploy for deployment, Traefik for routing, Let's Encrypt for TLS.

Claude Code handled probably 90% of the implementation. I designed the architecture and the frameworks, Claude Code built the features. It reasons across files, manages state, debugs its own output. For a semi-technical founder it's the difference between "I have an idea" and "I shipped a platform."

We're in beta — if you want to poke at it and tell me what breaks, I'd genuinely appreciate that: ai-solo-gtm-os.soloframehub.com
```

**Content collaboration / "can I share this with my audience":**

```
That would be great. A few ideas:

1. I could write a guest piece on the Claude Code build process — what worked, what didn't, what I'd do differently
2. We could do a joint livestream walking through the AI roleplay feature live
3. I can offer your audience free beta access to the Solo GTM OS

What sounds most interesting?
```

**"Not the right time" / too busy:**

```
Totally understand. The book stays free online whenever you want it: ai-solo-gtm-os.soloframehub.com/book

Best of luck with {{companyName}}.
```

**Skeptical / "is this spam?":**

```
Fair question. I'm Mike Sullivan — reached out because {{icebreaker}} and I thought either the tech build or the acquisition frameworks might be relevant. The book is 15 chapters, free to read online: ai-solo-gtm-os.soloframehub.com/book. The OS is a real product, free during beta.

No hard feelings if it's not your thing.
```

---

## Monitoring Targets

| Metric              | Target | Action if missed                      |
| ------------------- | ------ | ------------------------------------- |
| Bounce rate         | < 2%   | Pause campaign, check list quality    |
| Open rate           | > 35%  | If < 20%, test shorter subject lines  |
| Reply rate          | > 5%   | If < 3%, shorten emails, simplify CTA |
| Positive reply rate | > 2%   | If < 1%, reassess ICP match           |
| Unsubscribe rate    | < 0.5% | If > 1%, reduce send volume           |

Check metrics daily for first week. Weekly after that.

---

## Pre-Launch Checklist

- [ ] Verify sending domains are warmed (check Instantly warmup dashboard)
- [ ] Confirm auto-reply is configured with PDF link
- [ ] Test custom variable mapping with 1-2 test sends
- [ ] Verify ZeroBounce "valid" status on all 1,202 records (already done)
- [ ] Set workspace-level dedup to prevent re-contacting leads from other campaigns
- [ ] Set daily limit to 30/day across rotating domains
- [ ] Schedule campaign start for next business day after warmup verification
