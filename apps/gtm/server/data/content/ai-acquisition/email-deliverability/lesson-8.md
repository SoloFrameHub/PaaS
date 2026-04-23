---
title: "Content Patterns That Trigger Filters in 2026"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 22: Email Deliverability & Infrastructure"
lesson: 8
---

You've set up your domains. Your DNS records are perfect. Your warmup is complete. You hit send on your first real campaign and... 12% inbox placement.

What happened?

**Your authentication was flawless. Your content was spam.**

In 2026, email filters don't just check your SPF records — they read your message like a skeptical human would. And they're getting scary good at it.

## The Filter Evolution: From Keywords to Context

Remember when you could just avoid "FREE!!!" and "ACT NOW" and sail into the inbox?

Those days died around 2019.

<InsightCard icon="🤖" title="The 2026 Reality">
Modern spam filters use the same large language models that power ChatGPT. They understand context, tone, intent, and manipulation tactics. They can tell the difference between "I noticed you posted about X" (researched) and "I noticed you posted about X" (template).
</InsightCard>

Google's Postmaster team confirmed in late 2024 that Gmail now uses semantic analysis on **every** email. Microsoft followed suit in early 2025. Yahoo's SmartScreen has been doing it since 2023.

What does this mean for you?

**The filter reads your email the way your prospect would.** If it feels mass-produced, manipulative, or irrelevant — spam folder.

<FlipCard 
  front="The Content Paradox" 
  back="AI makes it easier than ever to write personalized emails at scale. Filters use AI to detect exactly that. The only winning move: actual research + genuine relevance." 
/>

Let's break down the 8 content patterns that trigger filters in 2026 — and what to do instead.

---

## Pattern 1: Template Language That Screams "Mass Send"

Here's what filters flag instantly:

```
Hi {{firstName}},

I came across {{companyName}} and was impressed by {{vague compliment}}.

I wanted to reach out because we help companies like yours...
```

**Why it triggers:**
- Merge tag artifacts (`{{` visible in some clients if tags fail)
- Generic structure that appears in millions of emails daily
- "I came across" / "I wanted to reach out" = template phrases in filter training data
- "Companies like yours" = zero actual research

<ExampleCard label="Real Example: The $40K Domain Burn">
A SaaS founder sent 2,000 emails in one day using a template with "I came across your company" as the opener. Gmail's filter had seen that exact phrase in 847,000 emails that month. Inbox placement: 8%. Domain reputation: destroyed. Recovery time: 4 months.

The kicker? He had actual research on each company. He just buried it under template language.
</ExampleCard>

### What to Do Instead

**Write like you're sending one email, not 200.**

<ComparisonBuilder
  title="Template Language vs. Research-First"
  persistKey="email-deliverability-L8-template"
  prompt="Rewrite this opener to sound researched, not templated"
  expertExample="Saw your post about moving from HubSpot to Salesforce — we built a migration tool that cuts the timeline from 6 weeks to 8 days. Worth a 10-minute call?"
  criteria={[
    "References something specific and recent",
    "No template phrases ('reach out', 'came across', 'wanted to')",
    "Clear value tied to their actual situation",
    "Conversational tone (contractions, short sentences)"
  ]}
/>

**The Research-First Framework:**
1. Find one specific, recent thing (post, hire, funding, product launch)
2. Connect it to a concrete problem your product solves
3. State the outcome in their terms (time saved, revenue gained, risk avoided)
4. Ask for a specific next step

No "I wanted to reach out." No "companies like yours." Just signal.

---

## Pattern 2: Hype Words and Exaggeration

Filters in 2026 don't just flag "FREE" and "GUARANTEED." They flag **any language that oversells.**

<ClassifyExercise
  title="Classify These Phrases"
  persistKey="email-deliverability-L8-hype"
  categories={[
    { id: "safe", label: "Safe (Neutral)", color: "#10b981" },
    { id: "risky", label: "Risky (Hype)", color: "#f59e0b" },
    { id: "spam", label: "Spam Trigger", color: "#ef4444" }
  ]}
  items={[
    { id: "1", content: "Revolutionary AI platform", correctCategory: "spam" },
    { id: "2", content: "Cuts reporting time by 40%", correctCategory: "safe" },
    { id: "3", content: "Game-changing solution", correctCategory: "risky" },
    { id: "4", content: "Industry-leading technology", correctCategory: "risky" },
    { id: "5", content: "Automates your weekly reports", correctCategory: "safe" },
    { id: "6", content: "10x your revenue", correctCategory: "spam" },
    { id: "7", content: "Saves 5 hours per week", correctCategory: "safe" },
    { id: "8", content: "Best-in-class platform", correctCategory: "risky" }
  ]}
/>

**Why hype triggers filters:**
- Training data: spam emails use superlatives 8x more than legitimate business emails
- Semantic analysis: "revolutionary" and "game-changing" correlate with low engagement (people don't reply)
- Credibility signals: specific claims (40% faster) outperform vague claims (much faster) in A/B tests — filters learned this

### The Specificity Rule

Replace every superlative with a number or concrete example.

| Hype Language | Specific Alternative |
|---------------|---------------------|
| "Revolutionary platform" | "Automates 80% of manual data entry" |
| "Game-changing solution" | "Cuts onboarding from 6 weeks to 9 days" |
| "Industry-leading" | "Used by 40% of Series B SaaS companies" |
| "Incredible results" | "Customers see 23% higher close rates" |
| "Best-in-class" | "Rated 4.8/5 by 200+ agencies" |

<InsightCard icon="📊" title="The Data Behind This">
Validity's 2025 study analyzed 50,000 cold emails. Messages with 3+ superlatives had 67% lower inbox placement than messages with zero superlatives but specific metrics. Filters are trained on engagement data — and people don't engage with hype.
</InsightCard>

---

## Pattern 3: Too Many Links (Especially Shortened URLs)

**The 2026 link rules:**
- Maximum 1-2 links in a cold email
- Zero URL shorteners (bit.ly, t.ly, tinyurl = instant spam flag)
- No tracking pixels in first email
- Calendar links are safer than generic CTAs

<RangeSlider 
  label="How many links are in your typical cold email?" 
  min={0} 
  max={10} 
  lowLabel="0 links" 
  highLabel="10+ links" 
  persistKey="email-deliverability-L8-links" 
/>

**Why links trigger filters:**

1. **Shortened URLs are spam's favorite tool.** Bit.ly and similar services hide the destination. Filters assume malicious intent.

2. **Multiple links = newsletter or promotion.** Gmail's Promotions tab algorithm specifically looks for 3+ links as a classification signal.

3. **Tracking pixels count as "links."** Most email tools add invisible 1x1 pixel images to track opens. Outlook blocks these aggressively.

4. **Link-to-text ratio matters.** If 30% of your email is hyperlinked text, filters flag it as promotional.

### What to Do Instead

<TemplateBuilder
  title="Link Strategy for Cold Email"
  persistKey="email-deliverability-L8-link-strategy"
  sections={[
    {
      id: "primary",
      title: "Primary CTA",
      fields: [
        { 
          id: "cta-type", 
          label: "What's your main CTA?", 
          placeholder: "e.g., Book a call, View case study, Download resource", 
          type: "text" 
        },
        { 
          id: "link-choice", 
          label: "Best link type for this CTA", 
          placeholder: "Calendar link (Calendly) > Case study page > Resource download", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "secondary",
      title: "Secondary Link (Optional)",
      fields: [
        { 
          id: "secondary-link", 
          label: "Do you need a second link?", 
          placeholder: "Only if essential (e.g., unsubscribe). Otherwise, skip it.", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "tracking",
      title: "Tracking Strategy",
      fields: [
        { 
          id: "tracking-decision", 
          label: "Open tracking on first email?", 
          placeholder: "Recommendation: OFF for first email, ON for follow-ups after reply", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

**The safest link structure:**
- First email: 1 calendar link (Calendly, Cal.com) + unsubscribe link in footer
- No open tracking on first send
- No URL shorteners ever
- If linking to content: use your actual domain, not a redirect

---

## Pattern 4: Attachments and Images in First Contact

**The rule:** Never send attachments or images in your first cold email.

<PredictionGate
  question="What happens to inbox placement when you include a PDF attachment in a cold email?"
  persistKey="email-deliverability-L8-attachment"
  type="choice"
  choices={[
    { id: "a", text: "No impact — filters don't care" },
    { id: "b", text: "Minor drop (5-10%)" },
    { id: "c", text: "Major drop (30-50%)" },
    { id: "d", text: "Instant spam folder (80%+)" }
  ]}
  correctId="c"
>
**Attachments in cold email drop inbox placement by 30-50%.**

Why? Malware distribution. Phishing attacks. Filters treat unknown senders with attachments as high-risk by default.

GlockApps tested this in 2024: identical email content, one with a PDF attachment, one without. The attachment version had 47% lower inbox placement across Gmail, Outlook, and Yahoo.
</PredictionGate>

**Images are almost as bad:**
- Large images (>100KB) trigger promotional classification
- Multiple images = newsletter format
- Images with no alt text = accessibility red flag (filters penalize)
- Outlook blocks images by default anyway

### What to Do Instead

**First email: plain text or minimal HTML, zero attachments, zero images.**

If you need to share a resource:
1. Link to it on your website (not a PDF)
2. Offer to send it *after* they reply
3. Use a follow-up email (after engagement) to share materials

<ExampleCard label="Case Study: The Image Experiment">
A B2B consultant tested two versions of the same cold email:

**Version A:** Plain text, no images, 1 calendar link
**Version B:** Company logo at top, product screenshot, PDF case study attached

Results (500 sends each):
- Version A: 78% inbox placement, 6.2% reply rate
- Version B: 34% inbox placement, 1.8% reply rate

The image/attachment version looked more "professional" — and performed 3x worse.
</ExampleCard>

---

## Pattern 5: Long Emails (The 125-Word Rule)

Filters in 2026 use email length as a spam signal.

**The data:**
- Emails under 125 words: 72% average inbox placement
- Emails 125-200 words: 58% average inbox placement
- Emails 200+ words: 41% average inbox placement

(Source: Validity 2025 Deliverability Benchmark)

**Why length matters:**
1. Spam emails are historically long (trying to cram in every sales point)
2. Legitimate business emails are short (busy people write concisely)
3. Mobile optimization: long emails get truncated, users bounce
4. Engagement signals: short emails get higher reply rates → filters learn this pattern

<LinterFeedback
  title="Email Length Linter"
  persistKey="email-deliverability-L8-length"
  inputLabel="Paste your cold email draft"
  rules={[
    { 
      id: "word-count", 
      label: "Word Count", 
      description: "Under 125 words", 
      keywords: [], 
      antiKeywords: [],
      customCheck: "wordCount <= 125"
    },
    { 
      id: "paragraph-length", 
      label: "Paragraph Length", 
      description: "No paragraph over 3 lines", 
      keywords: [], 
      antiKeywords: []
    },
    { 
      id: "single-idea", 
      label: "Single Core Idea", 
      description: "One clear value proposition, not multiple pitches", 
      keywords: ["one thing", "specifically"], 
      antiKeywords: ["also", "additionally", "furthermore"]
    }
  ]}
/>

### The 125-Word Framework

**Structure for maximum impact in minimum words:**

1. **Opener (1 sentence, 10-15 words):** Specific research signal
2. **Problem (1 sentence, 15-20 words):** The pain point you solve
3. **Solution (1-2 sentences, 25-35 words):** What you do + outcome
4. **Proof (1 sentence, 15-20 words):** Social proof or metric
5. **CTA (1 sentence, 10-15 words):** Specific ask

**Total: 75-105 words.** Add a sign-off and you're at 90-120.

<RewriteExercise
  title="Cut This Email to 125 Words"
  persistKey="email-deliverability-L8-rewrite"
  original="Hi Sarah,

I hope this email finds you well. I wanted to reach out because I came across your company and was really impressed by what you're doing in the marketing automation space.

We work with a lot of companies like yours who are struggling with the challenge of personalizing outreach at scale. It's a common problem — you want to send personalized messages, but you don't have the time to research and write custom emails for every prospect.

That's where our platform comes in. We use AI to analyze your prospects' recent activity, generate personalized first lines, and help you build sequences that feel one-to-one even when you're reaching hundreds of people.

Our customers typically see a 3x increase in reply rates and save about 10 hours per week on prospecting. We've worked with over 200 companies, including some big names like Acme Corp and Widget Inc.

I'd love to show you how it works. Would you be open to a quick 15-minute call next week? I have some time on Tuesday or Thursday if either works for you.

Looking forward to hearing from you!

Best,
John"
  hint="Keep the research signal, the outcome, and the CTA. Cut everything else."
  expertRewrite="Sarah — saw your post about scaling outreach without losing personalization.

We built an AI tool that researches prospects and writes custom first lines automatically. Customers save 10 hours/week and see 3x higher reply rates.

Worth a 15-minute call Tuesday or Thursday?"
  criteria={[
    "Under 125 words (target: 75-100)",
    "Keeps specific research signal",
    "States outcome clearly",
    "Removes all filler ('hope this finds you well', 'wanted to reach out')",
    "Single, clear CTA"
  ]}
/>

---

## Pattern 6: Salesy Language and Pressure Tactics

Filters are trained on billions of emails. They know what high-pressure sales language looks like.

**Instant spam triggers:**
- "Limited time offer"
- "Act now"
- "Don't miss out"
- "Exclusive opportunity"
- "Only X spots left"
- "This week only"

**Why these work in spam but not cold email:**

Spam emails use urgency because they're selling to strangers with zero relationship. The tactic works on 0.01% of recipients — but spammers send to millions.

You're not a spammer. You're building relationships at scale.

<SwipeDecision
  title="Salesy or Professional?"
  description="Swipe right for professional language, left for salesy triggers"
  optionA="Salesy (Spam Risk)"
  optionB="Professional (Safe)"
  persistKey="email-deliverability-L8-swipe"
  cards={[
    { 
      id: "1", 
      content: "I have a limited-time offer for you", 
      correctOption: "a", 
      explanation: "Classic pressure tactic — filters flag this immediately" 
    },
    { 
      id: "2", 
      content: "I noticed you're hiring a sales team", 
      correctOption: "b", 
      explanation: "Research-based observation, no pressure" 
    },
    { 
      id: "3", 
      content: "Don't miss this exclusive opportunity", 
      correctOption: "a", 
      explanation: "Urgency + exclusivity = spam language" 
    },
    { 
      id: "4", 
      content: "Would a 15-minute call next week work?", 
      correctOption: "b", 
      explanation: "Specific, low-pressure ask" 
    },
    { 
      id: "5", 
      content: "Act now before spots fill up", 
      correctOption: "a", 
      explanation: "Artificial scarcity — classic spam tactic" 
    },
    { 
      id: "6", 
      content: "Our customers typically see 3x ROI", 
      correctOption: "b", 
      explanation: "Specific outcome, no hype" 
    }
  ]}
/>

### The Professional Alternative

Replace urgency with **relevance.**

| Salesy Language | Professional Alternative |
|-----------------|-------------------------|
| "Limited time offer" | "We're opening 5 new client slots in Q2" |
| "Act now" | "If timing works, let's connect this week" |
| "Don't miss out" | "This might be relevant given your recent hire" |
| "Exclusive opportunity" | "We typically work with Series A-B companies" |
| "Only 3 spots left" | "We're selective about clients — worth a conversation?" |

**The key:** Specificity and context replace pressure.

---

## Pattern 7: Poor Grammar and Formatting

This one seems obvious, but AI-generated emails often have subtle issues that trigger filters.

**Common AI-generated red flags:**
- Overly formal language ("I am writing to inquire...")
- Inconsistent tone (formal → casual → formal)
- Run-on sentences (AI loves complex clauses)
- Missing contractions (humans use "you're," AI writes "you are")
- Perfect grammar (too perfect = bot-written)

<InsightCard icon="✍️" title="The Paradox of Perfect Grammar">
Emails with zero grammatical errors actually perform worse than emails with 1-2 minor imperfections. Why? Filters know humans make small mistakes. Perfect grammar = likely AI-generated = likely mass send.

This doesn't mean write poorly. It means write naturally. Use contractions. Start sentences with "And" or "But." Break grammar rules the way you would in conversation.
</InsightCard>

### The Formatting Rules

**Safe formatting:**
- Plain text or minimal HTML
- No colored text (looks like spam)
- No centered text (newsletters do this)
- No ALL CAPS (obvious)
- No excessive bolding (1-2 bold phrases max)
- Line breaks between paragraphs (mobile readability)

**Dangerous formatting:**
- Tables (promotional email signal)
- Background colors (spam classic)
- Multiple font sizes (newsletter format)
- Bullet points with 5+ items (looks like a pitch deck)

<ContextualNote showWhen={{ founderType: "technical" }} variant="personalized" title="For Technical Founders">
Your instinct might be to write like documentation — clear, structured, bulleted. Resist this in cold email. Write like you're messaging a colleague on Slack: casual, conversational, one idea at a time.
</ContextualNote>

<ContextualNote showWhen={{ founderType: "coach" }} variant="personalized" title="For Coaches">
Your warm, encouraging tone works great in cold email — but avoid coaching language like "I'd love to support you" or "Let's explore this together." It reads as overly familiar to strangers. Stick to direct value: "This might help with X problem."
</ContextualNote>

---

## Pattern 8: Generic Subject Lines

Subject lines don't just affect open rates — they affect deliverability.

**Spam-triggering subject lines:**
- "Quick question"
- "Following up"
- "Checking in"
- "Thoughts?"
- "[First Name] + [Your Name]"
- "Re: [anything]" (when it's not actually a reply)

**Why these trigger filters:**

Gmail analyzed subject line patterns in 2024 and found that these exact phrases appear in 40%+ of spam emails. They're template defaults. Filters flag them.

**The 2026 subject line rules:**

1. **Reference something specific** (their company, a post, a hire, a product launch)
2. **Keep it under 50 characters** (mobile truncation + spam correlation with long subjects)
3. **No clickbait** ("You won't believe this...")
4. **No ALL CAPS or excessive punctuation** (obvious)
5. **No emojis in B2B cold email** (consumer marketing tactic, B2B spam signal)

<TemplateBuilder
  title="Subject Line Builder"
  persistKey="email-deliverability-L8-subject"
  sections={[
    {
      id: "research",
      title: "Research Signal",
      fields: [
        { 
          id: "specific-thing", 
          label: "What specific thing did you notice?", 
          placeholder: "e.g., Their LinkedIn post, recent hire, product launch, funding round", 
          type: "text" 
        }
      ]
    },
    {
      id: "connection",
      title: "Connection to Value",
      fields: [
        { 
          id: "value-prop", 
          label: "How does your solution relate?", 
          placeholder: "e.g., 'We automate that process' or 'We solve that exact problem'", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "subject-draft",
      title: "Draft Subject Line",
      fields: [
        { 
          id: "subject", 
          label: "Your subject line (under 50 characters)", 
          placeholder: "e.g., 'Your Salesforce migration post' or 'Re: hiring SDRs'", 
          type: "text" 
        }
      ]
    }
  ]}
/>

**Good subject line examples:**

| Subject Line | Why It Works |
|--------------|--------------|
| "Your post about HubSpot reporting" | Specific, under 50 chars, relevant |
| "Saw you're hiring SDRs" | Direct, research-based |
| "Acme's Series B announcement" | Timely, specific |
| "Your Salesforce migration timeline" | References their exact pain point |
| "Quick win for your Q2 launch" | Specific timeframe + outcome |

**Bad subject line examples:**

| Subject Line | Why It Fails |
|--------------|--------------|
| "Quick question" | Generic template, appears in millions of emails |
| "Following up" | No context, spam signal |
| "Thoughts?" | Vague, clickbait-adjacent |
| "Re: our conversation" | Fake reply thread (filters detect this) |
| "🚀 Grow your business 10x" | Emoji + hype = instant spam |

---

## The Content Safety Checklist

Before you send any cold email, run it through this filter:

<InteractiveChecklist 
  title="Pre-Send Content Audit" 
  persistKey="email-deliverability-L8-checklist" 
  items={[
    "Email is under 125 words",
    "Zero template phrases ('reach out', 'came across', 'wanted to')",
    "No hype words (revolutionary, game-changing, best-in-class)",
    "Maximum 1-2 links, no URL shorteners",
    "No attachments or images",
    "No salesy pressure language (limited time, act now, don't miss)",
    "Natural grammar (contractions, occasional imperfections)",
    "Plain text or minimal HTML formatting",
    "Subject line is specific and under 50 characters",
    "References something concrete and recent about the recipient"
  ]} 
/>

---

## The AI Content Trap

Here's the irony: AI makes it easier than ever to write personalized emails at scale. But filters use AI to detect exactly that.

**The tell-tale signs of AI-generated cold email:**
- Overly formal tone
- Perfect grammar (no contractions)
- Generic compliments ("impressed by your work")
- Structured in 3-5 paragraphs with topic sentences
- Ends with "Looking forward to connecting"

<MiniRoleplay
  scenario="You're reviewing an AI-generated cold email draft. It's grammatically perfect, well-structured, and completely generic. How do you fix it?"
  role="You are the founder editing the draft"
  persistKey="email-deliverability-L8-roleplay"
  modelResponse="I'd start by adding one hyper-specific detail from their LinkedIn (recent post, job change, company milestone). Then I'd rewrite in my actual voice — shorter sentences, contractions, maybe start with 'Saw your post about X' instead of 'I hope this email finds you well.' Finally, I'd cut it to under 100 words and remove any phrase that sounds like a template."
/>

**The solution:** Use AI for research, not writing.

1. **AI researches the prospect** (recent posts, job changes, company news)
2. **AI suggests a personalization angle** (which signal to reference)
3. **You write the email** (in your voice, with your tone)
4. **AI checks for spam triggers** (Sales Linter, Deliverability Linter)

This keeps the human touch while leveraging AI's research speed.

---

## Testing Your Content (Before You Burn a Domain)

Never send a new email template to your full list. Test first.

<ScenarioSimulator
  title="Content Risk Calculator"
  persistKey="email-deliverability-L8-simulator"
  levers={[
    { id: "wordCount", label: "Word count", min: 50, max: 300, step: 10, defaultValue: 120 },
    { id: "links", label: "Number of links", min: 0, max: 5, step: 1, defaultValue: 1 },
    { id: "hypeWords", label: "Hype words (revolutionary, game-changing, etc.)", min: 0, max: 5, step: 1, defaultValue: 0 }
  ]}
  outputs={[
    { 
      id: "riskScore", 
      label: "Spam Risk Score", 
      formula: "((wordCount > 125 ? 20 : 0) + (links * 15) + (hypeWords * 25))", 
      unit: "%", 
      precision: 0 
    },
    { 
      id: "inboxPlacement", 
      label: "Estimated Inbox Placement", 
      formula: "(100 - ((wordCount > 125 ? 20 : 0) + (links * 15) + (hypeWords * 25)))", 
      unit: "%", 
      precision: 0 
    }
  ]}
  insight="At {riskScore}% risk, your estimated inbox placement is {inboxPlacement}%. Target: under 20% risk for 80%+ inbox placement."
/>

**The testing protocol:**

1. **Send to 10-20 test contacts first** (people who know you, will reply)
2. **Check GlockApps placement** (should be 80%+ inbox)
3. **Monitor reply rate for 3 days** (should be 3%+ for good content)
4. **Check Google Postmaster** (domain reputation should stay green)
5. **If all green: scale to 50/day, monitor for 1 week**
6. **If still green: scale to target volume**

**Red flags that mean "pause and revise":**
- Inbox placement below 70%
- Reply rate below 2%
- Google Postmaster reputation drops
- Sudden increase in unsubscribes (>1%)

---

## Your Action Items

<InteractiveChecklist 
  title="This Week's Deliverability Actions" 
  persistKey="email-deliverability-L8-actions" 
  items={[
    "Audit your current email template against the 8 content patterns",
    "Rewrite your opener to remove all template language",
    "Cut your email to under 125 words",
    "Remove all hype words and replace with specific metrics",
    "Reduce links to maximum 2 (calendar + unsubscribe)",
    "Test your revised email with mail-tester.com (target: 8+/10 score)",
    "Send to 10 test contacts and monitor inbox placement",
    "Set up a content review checklist for all future campaigns"
  ]} 
/>

---

## Next Lesson Preview

You've learned what content triggers filters. Next up: **Lesson 9 — Monitoring & Troubleshooting Deliverability Issues**.

You'll learn:
- How to set up Google Postmaster Tools and Microsoft SNDS
- Daily monitoring workflows (5 minutes/day)
- How to diagnose sudden inbox placement drops
- The difference between temporary dips and permanent damage

See you there.