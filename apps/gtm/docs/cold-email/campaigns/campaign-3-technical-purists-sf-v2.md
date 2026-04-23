# Campaign 3 v2: Technical Purists -- SF Bay Area

**List:** 1,174 ZeroBounce-validated leads from `sf-technical-purists-v2-clean.csv`
**Original list:** 1,318 unsent leads → 1,174 after ZeroBounce validation + cleanup
**Daily send volume:** 40/day (reduced from 60 — rebuilding sender reputation after v1 bounce rate hit 10%)
**Philosophy:** Give first. The book is the free lead magnet. The OS is the product. Both appear in Email 1, but the CTA is always low-friction ("reply send it" for the PDF). Reviews come from grateful readers. The OS sells itself once they see the value.

---

## Audience

| Trait       | This Campaign                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| Who         | Developers, engineers, founders at small SF companies (1-50 people)                                     |
| Identity    | Builder/engineer who may also sell                                                                      |
| Framing     | "Builder to builder" — don't assume they personally do sales                                            |
| Key insight | Frame as "if your company is at the stage where the product is ahead of revenue, these frameworks help" |

---

## Personalization Variables (from CSV)

| Instantly Variable    | CSV Column        | Notes                                                |
| --------------------- | ----------------- | ---------------------------------------------------- |
| `{{firstName}}`       | `First Name`      | Auto-mapped by Instantly                             |
| `{{lastName}}`        | `Last Name`       | Auto-mapped                                          |
| `{{companyName}}`     | `companyName`     | Custom variable                                      |
| `{{website}}`         | `website`         | Custom variable                                      |
| `{{location}}`        | `location`        | Custom variable                                      |
| `{{job}}`             | `job`             | Custom variable                                      |
| `{{headline}}`        | `headline`        | Custom variable                                      |
| `{{icebreaker}}`      | `icebreaker`      | AI-generated: observation about their company        |
| `{{painPoint}}`       | `painPoint`       | AI-generated: company-specific acquisition challenge |
| `{{personalization}}` | `personalization` | AI-generated: chapter/framework reference            |

---

## 3-Email Sequence

### Email 1 -- Day 0: A/B Test (Two Complete Variants)

Both variants go to all 1,174 leads. Instantly splits traffic 50/50 and tracks separately.

---

#### VARIANT A: Give-First (Book leads, OS mentioned at end)

**Subject Line A/B within variant:**

- `{{firstName}}, the engineering approach to getting customers`
- `why 50% of your sales effort is wasted (the data)`

**Body:**

```
Hey {{firstName}},

{{icebreaker}}

Here's a number that should bother any systems thinker: 50% of prospects in a typical sales pipeline are unqualified. Half the effort, half the calls, half the follow-ups — wasted on people who were never going to buy.

For a small team, that's not a rounding error. That's the difference between runway and shutdown.

The fix is upstream, not downstream. Three qualifying questions before anyone gets on a call:

1. Can we genuinely help them?
2. Will they pay what we need to charge?
3. Will they be good to work with?

Simple filter. Cuts the pipeline in half — but the half that remains converts at 7x the rate.

I put this framework (and 14 others) in a book for technical teams building their acquisition engine without a sales department. Happy to send you the PDF — just reply "send it."

— Mike

PS — I've built revenue engines at five companies from scratch — the last one went from struggling public company to nearly $1B market cap. Now I build tools for founders doing it solo. The book is the system. The Solo GTM OS (ai-solo-gtm-os.soloframehub.com) is the system applied to you.
```

**Why this variant works:** The body is pure give. The OS mention is in the PS where curious people look but it doesn't feel like a pitch. The CTA is still just "send it" for the free book.

---

#### VARIANT C: Full Picture (Book + OS presented together upfront)

**Subject Line A/B within variant:**

- `{{firstName}}, two things I built for technical teams`
- `a book and an OS for teams that hate selling`

**Body:**

```
Hey {{firstName}},

{{icebreaker}}

Over the past year I built two things for technical founders and small teams who need customers but don't have (or want) a sales department:

1. A book — 15 chapters covering the complete acquisition system: ICP targeting, discovery calls, objection handling, pricing psychology, automation sequencing. Free PDF if you want it.

2. An AI-powered OS — takes the book's frameworks and applies them to YOUR situation. It analyzes your website and positioning, scores your acquisition readiness across 5 dimensions, then routes you to the exact fix. The part technical teams like: you can practice discovery calls against AI buyer personas with different DISC personalities before the real conversation. It pushes back with realistic objections.

The book gives you the system. The Solo GTM OS (ai-solo-gtm-os.soloframehub.com) compresses the timeline.

If either is useful for what {{companyName}} is building, reply "send it" and I'll send you the book PDF. No strings.

— Mike

PS — Not a marketing guy. I've spent 30 years building revenue engines from scratch — five companies, one to nearly $1B market cap. Built this because I kept seeing technical founders make the same avoidable mistakes.
```

**Why this variant works:** Leads who want a tool more than a book see the OS immediately. The framing is "here's what I built and why" rather than "buy my thing." CTA is still the free book PDF — low friction.

---

### Email 2 -- Day 3: Two Branches

#### BRANCH A: Replied to Email 1 (they asked for the PDF)

**Subject:** `hope it's useful, {{firstName}}`

**Body:**

```
Hey {{firstName}},

Hope you've had a chance to flip through the book. If you're short on time, the highest-leverage chapters for a team at {{companyName}}'s stage:

- Ch 2: ICP Framework — stops you from chasing the wrong buyers
- Ch 4: Discovery Calls — turns sales conversations into diagnostic sessions
- Ch 7: Automation — what to automate first (and what to never automate)

If you find it genuinely useful, an honest Amazon review would mean a lot — it's a new book and discoverability is brutal without reviews. You know how it goes.

https://www.amazon.com/dp/B0GMP2T8QH

Either way, if anything in the book connects to what {{companyName}} is working on, happy to talk through it.

— Mike
```

---

#### BRANCH B: Opened but didn't reply

**Subject A/B:**

- `the automation mistake most small teams make`
- `what to automate first (not what you'd think)`

**Body:**

```
Hey {{firstName}},

One more thought from me.

When small teams start building sales systems, the instinct is to automate outreach first — email sequences, LinkedIn bots, auto-follow-ups. It's the most tedious part, so it makes sense.

But it's the wrong place to start. Automating outreach before nailing your ICP means you're sending the wrong message to the wrong people faster. You've scaled a broken system.

The right sequence: targeting first (who), then messaging (what), then conversations (how), THEN automation (scale). Most teams do it backwards.

I cover the full sequence in a book for technical teams building acquisition without a sales department — and I built the Solo GTM OS that walks you through each step with your actual product and market (ai-solo-gtm-os.soloframehub.com).

The book PDF is free. Reply "send it" if you want it.

— Mike
```

**Note:** This branch also mentions the OS, but naturally — "I wrote a book AND built a tool" rather than pitching one or the other.

---

### Email 3 -- Day 7: Engaged Contacts Only

**Send only to:** People who replied to ANY previous email.

**Subject:** `one more thing for {{companyName}}`

**Body:**

```
{{firstName}} — since you were interested in the acquisition frameworks, one last thing.

If you tried the Solo GTM OS (ai-solo-gtm-os.soloframehub.com), the AI roleplay simulator is the part most technical teams spend the most time in. You pick a buyer persona — analytical, driver, expressive, supportive — and practice your discovery call. The AI pushes back with real objections specific to your product and market.

The point isn't scripting. It's that the real call isn't the first time you hear "we don't have budget" or "we're already talking to [competitor]." You've already worked through it.

Worth trying if {{painPoint}} is an active problem for {{companyName}}.

— Mike

PS — And if you haven't left that Amazon review yet: https://www.amazon.com/dp/B0GMP2T8QH — even a short one helps a lot.
```

---

## Instantly Configuration

**Campaign name:** `Technical Purists SF v2 - Mar 2026`
**Upload list:** `sf-technical-purists-v2-clean.csv` (1,174 leads, 11 columns)
**Daily limit:** 40 emails/day (increase to 60 after 2 weeks if bounce < 2%)
**Send window:** 9am - 1pm PST, weekdays only
**Sending accounts:** Rotate across all domains

### Sequence Setup

| Step | Day | Who receives            | Content                                                                        |
| ---- | --- | ----------------------- | ------------------------------------------------------------------------------ |
| 1    | 0   | All 1,174 leads         | Email 1 — A/B test Variant A vs Variant C (subject lines also A/B within each) |
| 2A   | 3   | Replied to Step 1       | Email 2 Branch A (review ask)                                                  |
| 2B   | 3   | Opened but didn't reply | Email 2 Branch B (automation insight + OS mention)                             |
| —    | —   | No open, no reply       | Stop sequence                                                                  |
| 3    | 7   | Replied to ANY email    | Email 3 (roleplay feature + review reminder)                                   |

### A/B Test Setup in Instantly

Email 1 has two complete variants (A and C). Within Instantly's sequence editor:

1. Add Email 1 Variant A (give-first body + its subject lines)
2. Click "Add Variant" to create Variant C (full-picture body + its subject lines)
3. Instantly auto-splits 50/50

**Kill the loser after ~200 sends per variant** (400 total). Look at reply rate, not open rate — opens are unreliable with Apple Mail Privacy.

### Auto-Reply / PDF Delivery

**Trigger:** Reply containing "send" OR any positive reply
**Action:** Auto-send:

```
Here you go: https://files.soloframehub.com/share/caa-playbook

Highest-leverage chapters for small teams:
- Ch 2: ICP Framework (who to target)
- Ch 4: Discovery Calls (how to run the conversation)
- Ch 7: Automation Stack (what to automate and in what order)

— Mike
```

### Stop Conditions

- Stop if replied (move to appropriate branch)
- Stop if bounced
- Stop if unsubscribed
- If no open AND no reply after Email 1 → do NOT send Email 2

### Tags

| Tag             | Applied when                             |
| --------------- | ---------------------------------------- |
| `pdf-requested` | They reply asking for the PDF            |
| `engaged`       | Substantive reply (not just "send it")   |
| `review-asked`  | They receive Email 2 Branch A            |
| `os-introduced` | They receive any email mentioning the OS |

---

## Reply Handling Templates

**"Send it" / PDF request:**

> [Auto-reply fires with PDF link above]

**Positive response after reading:**

> Glad it connected, {{firstName}}. If any chapter maps to what {{companyName}} is building right now, happy to dig in. And if you get a chance to drop an Amazon review (https://www.amazon.com/dp/B0GMP2T8QH), it genuinely helps. No pressure.

**"I'm not the founder / I'm an engineer":**

> Totally fair — I wasn't sure from your profile if you're involved in the GTM side. The book might still be useful for understanding how your company's acquisition system works (or should work). And if your founder/CEO is the one doing sales, feel free to forward the PDF. Either way, appreciate you reading this far.

**"We already have a sales process":**

> Good — that puts you ahead of most teams your size. The book might still be worth a skim for the automation chapter (Ch 7) and the retention framework (Ch 6). Both are designed for teams that have traction and need to systematize it. Either way, the PDF is yours: https://files.soloframehub.com/share/caa-playbook

**Skeptical / "is this spam?":**

> Fair question. I'm Mike Sullivan — I reached out because {{icebreaker}} and I thought the frameworks might be relevant. The book is 15 chapters covering customer acquisition for small technical teams. It's real, it's free, and you can read it online at ai-solo-gtm-os.soloframehub.com/book before deciding if it's useful. No hard feelings if it's not your thing.

---

## What Changed from v1

| v1 Problem                             | v2 Fix                                                       |
| -------------------------------------- | ------------------------------------------------------------ |
| All about Mike ("I wrote a book")      | About them — their company, their pain                       |
| No value in the email itself           | Email 1 teaches the 3-question qualifying framework          |
| Book teased but never given            | Book PDF sent immediately on reply                           |
| OS buried in Email 3, only to repliers | OS appears in Email 1 (both variants), Email 2B, and Email 3 |
| No social proof                        | PS establishes 30 years + specific deal sizes                |
| Cosmetic personalization               | Icebreaker + painPoint tied to their actual company          |
| Marketing funnel crammed into 3 emails | Conversation sequence: give → deepen → invite                |
| "I wrote a book" = homework            | "Reply send it" = zero friction                              |
| Feature lists and link dumps           | One insight per email, one CTA per email                     |
| Same template across all segments      | "Builder to builder" framing for technical audience          |
