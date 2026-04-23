# Campaign 4 v2: Solo Founders -- West Coast, Self-Employed

**List:** Remaining 506 unsent leads from `founder-0-2years-software-west-coast-self-employed_1-610.csv`
**Daily send volume:** 50/day (lower volume = better deliverability for new templates)
**Philosophy:** Give first. Ask nothing in Email 1 except "want the PDF?" Book reviews come from grateful readers. OS comes after trust.

---

## What Changed from v1

| v1 Problem                          | v2 Fix                                                                       |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| 80% about Mike, 20% about them      | Inverted -- every email leads with their world                               |
| "I wrote a book" framing            | Book is never announced -- it's offered as a tool for their specific problem |
| No value delivered in the email     | Email 1 teaches a usable insight they can act on today                       |
| Feature lists and link dumps        | One CTA per email, one link max                                              |
| Escalating sales pitch to strangers | Sequential trust: give > give > mention OS exists                            |
| "Academy" positioning (outdated)    | OS positioning only in Email 3, and only to engaged contacts                 |
| Fake "re:" subject lines            | Honest subject lines only                                                    |
| 3 links in final email              | Single link per email                                                        |

---

## Personalization Variables

### From CSV (Direct)

| Instantly Variable | CSV Column  |
| ------------------ | ----------- |
| `{{firstName}}`    | `firstname` |
| `{{company}}`      | `company`   |
| `{{headline}}`     | `headline`  |
| `{{location}}`     | `location`  |

### AI-Generated (existing enrichment from v1)

| Instantly Variable    | CSV Column        | Purpose                                                                               |
| --------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `{{icebreaker}}`      | `icebreaker`      | One specific observation about their company/product tied to an acquisition challenge |
| `{{painPoint}}`       | `painPoint`       | A concrete, product-specific acquisition problem                                      |
| `{{personalization}}` | `personalization` | Chapter/framework reference tied to their situation                                   |

**Note:** v1 enrichment uses `painPoint` and `personalization` (not `specificPain`/`frameworkHook`). Templates below use actual CSV column names so they work without re-enrichment.

---

## 3-Email Sequence

### Email 1 -- Day 0: The Give

**Goal:** Deliver genuine value. Get a reply by offering the PDF. That's it.

**Subject Line A:** `{{firstName}}, quick thought on {{company}}`

**Subject Line B:** `the 50% pipeline problem (and how to fix it)`

**Body:**

```
Hey {{firstName}},

{{icebreaker}}.

One thing I've seen wreck solo founders at your stage: spending half your pipeline effort on people who were never going to buy. Research backs this up -- 50% of a typical pipeline is unqualified prospects. For a solo founder, that's not just wasted time, it's the difference between making rent and not.

The fix isn't better pitching. It's three questions before you ever get on a call:

1. Can I genuinely help this person?
2. Will they pay what I need to charge?
3. Will they be good to work with?

All three have to overlap. Miss one and you get burnout, broke clients, or a bad reputation.

I put the full framework (and 14 more) in a book for founders doing this solo. Happy to send you the PDF if it'd be useful -- just reply "send it" and I'll get it over.

-- Mike

PS -- I've built revenue engines at five companies from scratch — the last one went from struggling public company to nearly $1B market cap. This book is everything I'd tell a younger version of myself.
```

**Why this works:**

- Opens with THEIR company, not Mike's product
- Teaches something actionable in the email itself (the 3-question filter)
- The "send it" reply is the lowest-friction CTA possible
- No links in the email body (better deliverability, forces reply)
- PS establishes credibility without bragging in the main body
- Never says "I wrote a book" as the lead -- the book is offered as a tool after demonstrating the insight

**Character count:** ~850

---

### Email 2 -- Day 3: Two Branches

**BRANCH A: They replied to Email 1 (Instantly auto-sent the PDF)**

Wait 3 days after PDF delivery, then send:

**Subject Line:** `hope the book is useful, {{firstName}}`

**Body:**

```
Hey {{firstName}},

Hope you've had a chance to look through the book (or at least the chapter list -- Ch 2 on ICP targeting and Ch 4 on discovery calls are where most founders start).

Quick ask: if you find it genuinely useful, an honest Amazon review would mean a lot. It's a new book and visibility is the hardest part of launching something solo -- you know how that goes.

Here's the direct link: https://www.amazon.com/dp/B0GMP2T8QH

Either way, if anything in the book sparks a question about {{painPoint}}, happy to talk through it. I'm not selling anything here -- I just like this stuff.

-- Mike
```

**Why this works:**

- Acknowledges they took action (replied)
- Points them to the highest-value chapters (doesn't assume they read cover to cover)
- Review ask is framed with empathy ("you know how that goes") -- founder to founder
- Single link (Amazon review)
- Explicitly says "not selling anything" and means it -- no product mention

---

**BRANCH B: They opened Email 1 but didn't reply**

**Subject Line A:** `the discovery call reframe ({{firstName}})`

**Subject Line B:** `why the best founders never "pitch"`

**Body:**

```
Hey {{firstName}},

One more thought, then I'll leave you alone.

Most solo founders dread sales calls because they think they have to perform -- pitch, persuade, overcome objections. That framing is wrong, and it's why technical founders freeze up.

The reframe: a discovery call is a diagnosis, not a performance. You're a doctor figuring out if you can help, not a salesperson trying to close. You ask questions. You listen. If the fit is there, you prescribe. If it's not, you say so.

That single mindset shift -- selling is diagnosis, not performance -- is from Ch 1 of a book I wrote for founders in exactly your position.

I can send you the PDF if you want it. Just reply "send it."

-- Mike
```

**Why this works:**

- Different insight from Email 1 (identity threat / sales psychology)
- Still gives value in the email body
- Doesn't repeat the same pitch
- Same low-friction CTA
- Shorter than Email 1

**Character count:** ~650

---

### Email 3 -- Day 7: The OS Mention (Engaged Contacts Only)

**Send only to:** People who replied to Email 1 or Email 2 (requested PDF, or engaged in conversation). Do NOT send to cold contacts who never engaged.

**Subject Line:** `one more thing that might help with {{company}}`

**Body:**

```
{{firstName}} -- one last thing, since you seemed interested in the acquisition frameworks.

The book gives you the system. But I also built something that puts the system to work on YOUR specific situation:

It's called the AI Client Acquisition OS. It analyzes your website, LinkedIn, and positioning to diagnose where your acquisition engine is broken across 5 dimensions -- then routes you to the exact framework, workshop, or tool to fix it.

The part founders like most: you can practice discovery calls against AI buyer personas with different personalities (analytical, driver, expressive, supportive) before the real conversation. No scripts. An AI that actually pushes back.

If you want to see it: ai-solo-gtm-os.soloframehub.com

No pressure. The book alone has everything you need to build your own system from scratch. The OS just makes it faster.

-- Mike
```

**Why this works:**

- Only goes to warm contacts (they asked for the book)
- Frames OS as an accelerator, not a replacement for the free book
- "The book alone has everything you need" removes pressure
- Single link
- No pricing in cold email -- let the site handle conversion
- Describes what the OS DOES (diagnose, route, practice) not what it IS (48 courses, 7 tracks)

**Character count:** ~700

---

## Instantly.ai Configuration

**Campaign name:** `Solo Founders West Coast v2 - Mar 2026`
**Daily limit:** 50 emails/day
**Send window:** 9am - 12pm PST (weekdays only)
**Sending accounts:** Rotate across all domains

### Sequence Setup

**Step 1:** Email 1 (Day 0) -- sent to all 506 remaining leads
**Step 2:** Branch based on behavior:

- **Replied to Step 1:** Auto-send PDF link, then Email 2 Branch A on Day 3
- **Opened but no reply:** Email 2 Branch B on Day 3
- **No open, no reply:** Stop sequence (do not send Email 2)
  **Step 3:** Email 3 on Day 7 -- ONLY to contacts who replied to ANY previous email

### Auto-Reply / PDF Delivery

Configure an auto-reply trigger in Instantly:

- **Trigger:** Any reply to Email 1 containing "send" OR any positive reply
- **Action:** Auto-send this reply:

```
Here you go: https://files.soloframehub.com/share/caa-playbook

If you want to start with the highest-leverage chapters:
- Ch 2: ICP Framework (who to target)
- Ch 4: Discovery Calls (how to have the conversation)
- Ch 1: Sales Psychology (the mindset shift that makes everything else work)

-- Mike
```

### Stop Conditions

- Replied (any reply -- move to appropriate branch)
- Bounced
- Unsubscribed
- Completed sequence with no engagement (move to "dead" list -- do not re-contact)

### Tags

- `pdf-requested` -- replied to Email 1 asking for PDF
- `engaged` -- replied to any email with substantive response
- `review-asked` -- received Email 2 Branch A (track review conversion)
- `os-introduced` -- received Email 3

---

## Reply Handling Templates

**"Send it" / "Yes please" / PDF request:**

> [Auto-reply with PDF link -- see above]

**Positive response after reading:**

> Glad it resonated, {{firstName}}. If any specific chapter connects to what you're working on at {{company}}, I'm happy to dig deeper on it. And if you get a chance to leave an Amazon review (https://www.amazon.com/dp/B0GMP2T8QH), it genuinely helps other founders find the book. No pressure either way.

**Questions about specific content:**

> Good question. [Answer directly using book content]. That's covered in more detail in Ch [X]. If you want to go deeper, the Solo GTM OS at ai-solo-gtm-os.soloframehub.com has an AI coaching tool that can walk you through applying it to {{company}}'s specific situation -- but honestly the book chapter might be enough.

**"Not the right time":**

> Totally get it. The PDF is yours whenever you want it: https://files.soloframehub.com/share/caa-playbook. Good luck with {{company}} -- {{painPoint}} is a real challenge but you're clearly building something solid.

**Skeptical / "is this spam?":**

> Fair. I'm Mike Sullivan -- 30 years in enterprise tech sales, most recently building SoloFrameHub. This isn't a mass blast -- I reached out because {{icebreaker}}. The book is real (15 chapters, free to read at soloframehub.com/book) and I genuinely think the frameworks map to what you're building at {{company}}. But if this isn't useful, no worries at all.

---

## AI Enrichment Prompt (Updated for v2)

```
You are generating personalized cold email fields for a PEER outreach campaign. Mike is a solo founder reaching out to other solo founders (0-2 years in, self-employed, software, West Coast). The tone is founder-to-founder, not salesperson-to-prospect.

Mike wrote "The Solo Founder's AI-Powered Customer Acquisition Playbook" and built the Solo GTM OS at ai-solo-gtm-os.soloframehub.com.

RECIPIENT DATA:
- Name: {{firstName}} {{lastName}}
- Headline: {{headline}}
- Summary: {{summary}}
- Company: {{company}}
- Company Description: {{company_description}}
- Job Title: {{job}}
- Company Size: {{company_employee_range}}
- Location: {{location}}

Generate these fields as JSON:

1. "icebreaker": A specific observation about their company or founder journey that connects to a customer acquisition challenge. NOT a compliment. An observation that shows you understand their situation. If they left a larger company to go solo, reference the transition. If they're building a specific product, reference the market challenge. Must feel like something a human who spent 2 minutes on their LinkedIn would say. Max 25 words.

2. "specificPain": Their most likely customer acquisition challenge RIGHT NOW, specific to their product and market. NOT generic ("getting customers"). SPECIFIC ("converting free-tier users of your ML tool to paid plans" or "getting property managers to take a demo of your maintenance platform"). Base this on company_description. 8-15 words.

3. "frameworkHook": Which framework from the book would help them most and a 1-sentence reason why. Available frameworks: ICP Framework (targeting), MVQ Qualification (qualifying prospects), DISC Selling (adapting to buyer personality), Prescription Frame (diagnostic selling), Diagnostic Discovery (running calls), Zero-to-Ten Sprint (first 10 customers), Proof Ladder (building credibility), Retention Flywheel (keeping customers), MAGNETS (7-system growth). Pick ONE. Max 20 words.

Return ONLY valid JSON. No explanation.
```
