---
title: "Multi-Channel Sequence Design (Creator Framing)"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 24: AI Outreach Automation"
lesson: 5
---

You've just sent 200 cold emails to YouTube creators in your niche. Open rate: 42%. Reply rate: 0.5%.

One creator did reply: *"Thanks, but I get 50+ pitches like this every week. What makes you different?"*

Here's the truth: **Creator outreach isn't cold outreach. It's relationship-building at scale.**

The difference? Cold B2B outreach assumes strangers. Creator outreach assumes *they already have an audience watching their every move*. Your pitch isn't private — it's potentially screenshot-able, quote-tweetable, "look at this cringe DM I got" content.

This lesson rewrites the multi-channel playbook specifically for reaching creators: YouTubers, podcasters, newsletter writers, LinkedIn thought leaders, and Instagram educators. You'll learn the sequences that work, the platforms that matter, and the one rule that separates partnership-worthy outreach from spam.

---

## The Creator Outreach Reality Check

<InsightCard icon="📊" title="The Creator Inbox Problem">
A creator with 10K+ followers receives **50-200 pitch DMs per week**. Most are generic. Most get ignored. The ones that break through have one thing in common: they prove the sender actually consumed the content.
</InsightCard>

Let's start with a self-assessment:

<RangeSlider 
  label="How often do you engage with a creator's content BEFORE pitching them?" 
  min={0} 
  max={10} 
  lowLabel="Never" 
  highLabel="Always" 
  persistKey="ai-outreach-automation-L5-engagement-frequency" 
/>

If you scored below 7, you're doing cold outreach to warm audiences — and it shows in your reply rates.

### Why Creator Outreach Is Different

<FlipCard 
  front="The Audience Awareness Factor" 
  back="Creators think in public. Every pitch is evaluated through the lens: 'Would my audience respect this partnership?' Generic vendor pitches fail this test instantly." 
/>

<FlipCard 
  front="The Platform-First Mindset" 
  back="Creators live on their platforms. Email is where partnerships go to die slowly. Start where they're already engaged: YouTube comments, Instagram DMs, Substack notes." 
/>

<FlipCard 
  front="The Partnership vs. Vendor Divide" 
  back="Creators don't want vendors. They want collaborators who understand their audience, respect their voice, and bring genuine value to the table." 
/>

Here's the data that matters:

<ExampleCard label="Response Rate Reality (2025-2026 Data)">
**Cold email to creators:** 5-10% response rate  
**Warm DM (after engagement):** 15-30% response rate  
**Partnership-framed outreach:** 20-40% response rate  

The difference? **Earning the right to ask** before you ask.
</ExampleCard>

---

## The "Earn the Right" Framework

Before you write a single message, you need to understand the creator outreach hierarchy:

<SlideNavigation>
<Slide title="Step 1: Consume Their Content (Genuinely)">

Not just watching — **actually consuming**. Take notes. Find the moment that made you think "this is exactly what my audience needs."

**Time investment:** 30-60 minutes per creator  
**Output:** 2-3 specific references you can use in outreach

<ContextualNote showWhen={{ founderType: "creator" }} variant="personalized" title="For Fellow Creators">
You know how obvious it is when someone hasn't watched your content. Don't be that person to other creators.
</ContextualNote>

</Slide>

<Slide title="Step 2: Engage Publicly">

Comment on their posts. Share their content with your take. Reply to their newsletter. **Be visible in their world before you slide into DMs.**

**Minimum engagement:** 3-5 genuine interactions over 7-14 days  
**Goal:** Become a familiar name, not a stranger

**Good engagement examples:**
- "The framework at 12:34 solved a problem I've had for months — just implemented it with my team"
- "This data point (screenshot) is going in my next client presentation. Mind if I credit you?"
- "Your take on [topic] is the counter-narrative the industry needs right now"

**Bad engagement examples:**
- "Great post!" (generic)
- "I love your content!" (empty)
- "Check out my stuff too" (self-promotional)

</Slide>

<Slide title="Step 3: Provide Value First">

Before you ask for anything, **give something valuable**:
- Industry data they'd find useful
- An intro to someone in their network
- A thoughtful answer to a question they posed
- A case study relevant to their audience

**Time investment:** 15-30 minutes  
**Impact:** Shifts the dynamic from "stranger asking" to "peer offering"

</Slide>

<Slide title="Step 4: Make the Ask (Partnership-Framed)">

Only now — after Steps 1-3 — do you pitch. And it's not a pitch. It's a **collaboration proposal**.

**Formula:**  
"I help [similar creators] achieve [outcome]. I noticed [specific opportunity] in your [content/business]. Would exploring [collaboration type] make sense?"

</Slide>
</SlideNavigation>

<InteractiveChecklist 
  title="Pre-Outreach Checklist" 
  persistKey="ai-outreach-automation-L5-pre-outreach" 
  items={[
    "Watched/read at least 3 pieces of their content",
    "Engaged publicly with 3-5 posts/videos/newsletters",
    "Identified a specific collaboration angle (not generic)",
    "Drafted a partnership-framed message (not a vendor pitch)",
    "Prepared to give value before asking for anything"
  ]} 
/>

---

## Platform-Specific Sequence Design

Different creator types live on different platforms. Your sequence must adapt.

### YouTube Creators

<TemplateBuilder
  title="YouTube Creator Outreach Sequence"
  persistKey="ai-outreach-automation-L5-youtube-sequence"
  sections={[
    {
      id: "warmup",
      title: "Warm-Up Phase (Days -7 to -1)",
      fields: [
        { 
          id: "videos", 
          label: "Which 3 videos will you watch and comment on?", 
          placeholder: "e.g., 'How I Built a $50K/mo Newsletter' (timestamp 8:45 had the insight I needed)", 
          type: "textarea" 
        },
        { 
          id: "engagement", 
          label: "What value can you add in comments?", 
          placeholder: "e.g., Share a related data point, answer a question they posed, add a case study", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "initial",
      title: "Initial Outreach (Day 1)",
      fields: [
        { 
          id: "channel", 
          label: "Which channel? (Email usually in description, or Instagram DM)", 
          placeholder: "e.g., Email from About page", 
          type: "text" 
        },
        { 
          id: "hook", 
          label: "Specific content reference (video title + timestamp or key point)", 
          placeholder: "e.g., Your video on 'Scaling to 100K subs' — the part about consistency over virality (12:34) resonated", 
          type: "textarea" 
        },
        { 
          id: "collaboration", 
          label: "Partnership angle (not vendor pitch)", 
          placeholder: "e.g., I help creators like you automate sponsor outreach. Would a quick chat about streamlining your sponsorship pipeline be interesting?", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "followup",
      title: "Follow-Up (Day 5)",
      fields: [
        { 
          id: "value-add", 
          label: "What value can you provide (no ask)?", 
          placeholder: "e.g., Industry data on creator sponsorship rates, intro to a potential sponsor, case study from similar creator", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "close",
      title: "Final Touch (Day 12)",
      fields: [
        { 
          id: "specific-idea", 
          label: "Concrete collaboration idea", 
          placeholder: "e.g., I noticed you manually track sponsors in a spreadsheet (from your BTS video). We built a tool that automates that. 15-min demo?", 
          type: "textarea" 
        }
      ]
    }
  ]}
/>

**Expected timeline:** 18-21 days from first engagement to ask  
**Expected response rate:** 15-25% (vs. 5-10% for cold email)

---

### Newsletter Writers (Substack, beehiiv, ConvertKit)

<ComparisonBuilder
  title="Newsletter Writer Outreach Message"
  persistKey="ai-outreach-automation-L5-newsletter-compare"
  prompt="Write your outreach message to a newsletter writer"
  expertExample="Hi [Name],

Your last edition on [specific topic] was the best breakdown I've seen on [subtopic]. I shared it with my team and we implemented [specific tactic] immediately.

I work with newsletter writers doing 5K-50K subs to [specific outcome]. [One sentence about a result with a similar writer].

Would a quick chat about [specific collaboration idea] be interesting? No pitch — genuinely curious about your take on [topic].

[Signature]"
  criteria={[
    "References a specific newsletter edition (not just 'your newsletter')",
    "Shows you actually read it (mentions a specific point or tactic)",
    "Partnership-framed (not vendor pitch)",
    "Gives before asking (shares how you used their content)",
    "Ends with curiosity, not a hard CTA"
  ]}
/>

**Best initial channel:** Reply to their newsletter (they read replies) or Substack note/comment  
**Second channel:** Email (usually in newsletter footer or About page)  
**Avoid:** LinkedIn DM (most newsletter writers ignore LinkedIn)

---

### LinkedIn Thought Leaders

LinkedIn creators are different: they're **already in B2B mode**. But they're also drowning in vendor pitches.

<ClassifyExercise
  title="LinkedIn Outreach: Good vs. Cringe"
  persistKey="ai-outreach-automation-L5-linkedin-classify"
  categories={[
    { id: "good", label: "Good Outreach", color: "#10b981" },
    { id: "cringe", label: "Cringe Outreach", color: "#ef4444" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Your post on AI sales agents got 400+ comments. The debate in the replies about human-in-the-loop was fascinating. I run a similar system — would love to compare notes.", 
      correctCategory: "good",
      explanation: "Specific post reference + engagement with comments + peer-to-peer framing"
    },
    { 
      id: "2", 
      content: "I love your content on LinkedIn! I think we could collaborate.", 
      correctCategory: "cringe",
      explanation: "Generic compliment + vague collaboration = instant ignore"
    },
    { 
      id: "3", 
      content: "Saw you're hiring SDRs (from your post last week). We help companies like yours automate outbound. 15-min call?", 
      correctCategory: "cringe",
      explanation: "Vendor pitch disguised as relevance. They know you're selling."
    },
    { 
      id: "4", 
      content: "Your framework for cold email subject lines (from your carousel) is now our team's standard. We added one tweak that increased opens 12% — happy to share if useful.", 
      correctCategory: "good",
      explanation: "Shows you implemented their advice + offers value back"
    },
    { 
      id: "5", 
      content: "I noticed you post about [topic] weekly. I have data from 500+ companies on this exact issue. Would you find a 1-pager summary useful for a future post?", 
      correctCategory: "good",
      explanation: "Gives value first (data) + helps them create content"
    }
  ]}
/>

**LinkedIn sequence structure:**

1. **Day -7 to -1:** Engage with 3-5 posts (thoughtful comments, not "great post!")
2. **Day 1:** LinkedIn DM referencing a specific post + offering value
3. **Day 5:** Email (if no reply) with different angle
4. **Day 12:** Final LinkedIn message with concrete collaboration idea

---

### Instagram Creators

Instagram is the **highest-friction platform** for cold outreach (DMs filtered, low open rates unless you're a follower). But it's also where many creators are most active.

<DecisionTree
  title="Instagram Outreach Decision Tree"
  persistKey="ai-outreach-automation-L5-instagram-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Do you already follow this creator and engage with their content?", 
      choices: [
        { label: "Yes, I've been engaging for 2+ weeks", nextNodeId: "warm" },
        { label: "No, I just found them", nextNodeId: "cold" }
      ]
    },
    { 
      id: "warm", 
      content: "Good. Your DM will land in their primary inbox. Send a DM referencing a specific story or post from the last 48 hours.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "cold", 
      content: "Your DM will land in 'Message Requests' (low open rate). Better strategy: Follow → Engage with 5-7 posts/stories over 10-14 days → Then DM.", 
      choices: [
        { label: "I'll warm up first (recommended)", nextNodeId: "warmup" },
        { label: "I'll DM anyway (risky)", nextNodeId: "risky" }
      ]
    },
    { 
      id: "warmup", 
      content: "Smart. After 10-14 days of genuine engagement, your DM open rate will be 3-5x higher.", 
      isTerminal: true, 
      outcome: "positive" 
    },
    { 
      id: "risky", 
      content: "Your DM will likely be ignored or marked as spam. Expected response rate: &lt;5%.", 
      isTerminal: true, 
      outcome: "negative" 
    }
  ]}
/>

**Instagram-specific rules:**
- Never DM without following and engaging first
- Reference a story or post from the last 24-48 hours (proves you're current)
- Keep initial DM under 3 sentences (Instagram DMs are mobile-first)
- Use voice notes for follow-ups (higher engagement than text)

---

## The "3 Before You Ask" Rule in Action

Let's make this concrete with a timed exercise:

<TimedChallenge
  title="Spot the Premature Pitch"
  persistKey="ai-outreach-automation-L5-timed"
  timeLimit={90}
  items={[
    { 
      id: "1", 
      prompt: "A founder sends a cold DM to a YouTuber: 'Hey, love your channel! Want to try our tool?' — What's wrong?", 
      correctAnswer: "No engagement history, no specific content reference, vendor pitch not partnership",
      explanation: "Violated all 3 rules: didn't consume content, didn't engage publicly, didn't provide value first"
    },
    { 
      id: "2", 
      prompt: "A founder comments on 3 LinkedIn posts, then DMs: 'I've been following your content. Let's chat about a partnership.' — What's missing?", 
      correctAnswer: "No specific collaboration idea, no value provided first",
      explanation: "Engagement is good, but the ask is vague and one-sided"
    },
    { 
      id: "3", 
      prompt: "A founder replies to a newsletter: 'Great edition! I have data on this topic. Want to see it?' — Is this good?", 
      correctAnswer: "Yes, if the data is genuinely useful",
      explanation: "Provides value first, no ask, relevant to their content"
    },
    { 
      id: "4", 
      prompt: "A founder watches 5 YouTube videos, comments thoughtfully, then emails: 'Your video on [topic] inspired me to build [thing]. Here's what I learned. Would you be open to a quick call to discuss a collaboration?' — Good or bad?", 
      correctAnswer: "Good",
      explanation: "Consumed content, engaged publicly, provided value (shared learning), partnership-framed ask"
    }
  ]}
/>

---

## Multi-Channel Sequence Templates (Creator-Specific)

Now let's build complete sequences for each creator type:

<SlideNavigation>
<Slide title="YouTube Creator Sequence (18 days)">

| Day | Channel | Action | Purpose |
|-----|---------|--------|---------|
| -7 to -1 | YouTube | Watch 3 videos, leave thoughtful comments | Warm-up |
| 1 | Email | Personalized email referencing specific video + partnership angle | Primary touch |
| 5 | Email | Value-add (industry data, case study, intro) | Give before asking |
| 12 | Instagram DM | Short follow-up + specific collaboration idea | Second channel |
| 18 | Email | Warm exit ("Totally understand if timing isn't right. Happy to reconnect in 3-6 months.") | Close loop |

**Expected response rate:** 15-25%  
**Best for:** Creators with 10K-100K subscribers

</Slide>

<Slide title="Newsletter Writer Sequence (14 days)">

| Day | Channel | Action | Purpose |
|-----|---------|--------|---------|
| -7 to -1 | Substack/Email | Read 2-3 editions, reply with value-add comments | Warm-up |
| 1 | Reply to newsletter | Reference specific edition + share how you used their advice | Primary touch |
| 5 | Email | Different angle + concrete collaboration idea | Follow-up |
| 10 | Substack note | Public comment on recent post (if no reply) | Social proof |
| 14 | Email | Warm exit | Close loop |

**Expected response rate:** 20-30%  
**Best for:** Newsletter writers with 5K-50K subscribers

</Slide>

<Slide title="LinkedIn Thought Leader Sequence (16 days)">

| Day | Channel | Action | Purpose |
|-----|---------|--------|---------|
| -7 to -1 | LinkedIn | Engage with 5 posts (thoughtful comments) | Warm-up |
| 1 | LinkedIn DM | Reference specific post + offer value (data, intro, case study) | Primary touch |
| 5 | Email | Different angle + partnership framing | Second channel |
| 10 | LinkedIn | Comment on new post (if no reply) | Stay visible |
| 16 | LinkedIn DM | Warm exit + offer to reconnect later | Close loop |

**Expected response rate:** 15-25%  
**Best for:** LinkedIn creators with 5K+ followers

</Slide>

<Slide title="Instagram Creator Sequence (21 days)">

| Day | Channel | Action | Purpose |
|-----|---------|--------|---------|
| -14 to -1 | Instagram | Follow + engage with 7-10 posts/stories | Warm-up (critical) |
| 1 | Instagram DM | Reference recent story + partnership angle (under 3 sentences) | Primary touch |
| 5 | Instagram DM | Voice note with value-add | Personal touch |
| 12 | Email | Different angle + concrete collaboration idea | Second channel |
| 21 | Instagram DM | Warm exit | Close loop |

**Expected response rate:** 10-20% (lower due to platform friction)  
**Best for:** Instagram creators with 10K-100K followers

</Slide>
</SlideNavigation>

---

## Creator-Specific Objection Handling

Creators have unique objections. Let's roleplay:

<MiniRoleplay
  scenario="A creator replies: 'I don't do B2B stuff. My audience is mostly consumers.'"
  role="You are the founder responding"
  persistKey="ai-outreach-automation-L5-roleplay-1"
  modelResponse="Totally get it. I'm not pitching a B2B partnership — I'm thinking more along the lines of [specific consumer-facing angle]. For example, [similar creator] used our tool to [outcome their audience cared about]. Would that be more relevant?"
/>

<MiniRoleplay
  scenario="A creator replies: 'I already have sponsors/partners for this.'"
  role="You are the founder responding"
  persistKey="ai-outreach-automation-L5-roleplay-2"
  modelResponse="That makes sense. I'm not looking to replace what's working. I noticed [specific gap or opportunity] in your current setup. Would a quick chat about [specific improvement] be useful? No pitch — genuinely curious about your take."
/>

<MiniRoleplay
  scenario="A creator replies: 'My audience won't care about this.'"
  role="You are the founder responding"
  persistKey="ai-outreach-automation-L5-roleplay-3"
  modelResponse="Fair point. I might be wrong about the fit. Can I ask: when you think about [topic], what would make it relevant to your audience? I'm trying to understand if there's a different angle that would resonate."
/>

---

## Quality Control: The Creator Safety Linter

Before you send any creator outreach, run it through this checklist:

<LinterFeedback
  title="Creator Outreach Linter"
  persistKey="ai-outreach-automation-L5-linter"
  inputLabel="Paste your creator outreach message"
  rules={[
    { 
      id: "specific-content", 
      label: "Specific Content Reference", 
      description: "Mentions a specific video/post/newsletter edition (not just 'your content')", 
      keywords: ["video", "post", "edition", "episode", "newsletter"], 
      antiKeywords: ["your content", "what you do", "your work"] 
    },
    { 
      id: "engagement-proof", 
      label: "Engagement Proof", 
      description: "Shows you consumed their content (timestamp, quote, specific point)", 
      keywords: ["noticed", "saw that", "the part about", "at 12:34"], 
      antiKeywords: [] 
    },
    { 
      id: "partnership-frame", 
      label: "Partnership Framing", 
      description: "Positions as collaboration, not vendor pitch", 
      keywords: ["collaborate", "partnership", "work together", "curious about your take"], 
      antiKeywords: ["our tool", "our platform", "we help companies", "we offer"] 
    },
    { 
      id: "value-first", 
      label: "Value-First", 
      description: "Gives something before asking (data, intro, case study, insight)", 
      keywords: ["I have data", "I can intro you", "here's what I learned", "happy to share"], 
      antiKeywords: ["can we chat", "15-min call", "quick call"] 
    },
    { 
      id: "no-generic", 
      label: "No Generic Compliments", 
      description: "Avoids 'love your content' and other empty praise", 
      keywords: [], 
      antiKeywords: ["love your content", "big fan", "I love what you're doing", "amazing work"] 
    }
  ]}
/>

---

## Tools for Creator Outreach

<StrategyDuel
  title="Email-Only vs. Multi-Channel for Creators"
  persistKey="ai-outreach-automation-L5-duel"
  scenario="You have 20 hours this month for creator outreach. You've identified 50 target creators."
  strategyA={{ 
    name: "Email-Only (Instantly)", 
    description: "Send personalized emails to all 50 creators using Instantly's AI personalization", 
    pros: ["Reach all 50 creators", "Lower time per creator (15-20 min)", "Easier to track and follow up"], 
    cons: ["Lower response rate (5-10%)", "Misses platform-native engagement", "Feels more transactional"] 
  }}
  strategyB={{ 
    name: "Multi-Channel (Manual + Lemlist)", 
    description: "Deep engagement with 15-20 creators across their native platforms, then email", 
    pros: ["Higher response rate (15-25%)", "Builds genuine relationships", "Platform-native engagement"], 
    cons: ["Reach fewer creators", "Higher time per creator (45-60 min)", "Harder to scale"] 
  }}
  expertVerdict="For creators, quality beats quantity. Multi-channel wins. 5 genuine partnerships from 20 deep touches beats 2 lukewarm replies from 50 cold emails."
/>

**Recommended stack for creator outreach (under $100/mo):**

| Tool | Function | Pricing | Use Case |
|------|----------|---------|----------|
| Instantly | Email sequences | $37/mo | Follow-ups after warm-up |
| Loom | Video messages | Free (25 videos) | Personal touch for Tier A creators |
| ManyChat | Instagram DM automation | $15/mo (Pro) | Comment-to-DM flows (advanced) |
| Substack | Direct engagement | Free | For newsletter writers |
| LinkedIn Sales Nav | Advanced search | $80/mo (optional) | For LinkedIn thought leaders |

**Total: $37-52/mo (without Sales Nav) or $117-132/mo (with Sales Nav)**

---

## Your Creator Outreach Action Plan

<InteractiveChecklist 
  title="Your Next Steps" 
  persistKey="ai-outreach-automation-L5-actions" 
  items={[
    "Identify 10-15 target creators in your niche (use the ICP work from earlier courses)",
    "For each creator, consume 2-3 pieces of content and take notes on specific references",
    "Engage publicly with 3-5 posts/videos/newsletters over the next 7-14 days",
    "Draft partnership-framed outreach messages using the templates above",
    "Run each message through the Creator Outreach Linter before sending",
    "Set up a simple tracking system (spreadsheet or CRM) to log engagement and follow-ups",
    "Send your first 5 creator outreach messages this week",
    "Review response rates after 14 days and adjust your approach"
  ]} 
/>

---

## Final Thought: The Screenshot Test

Before you hit send on any creator outreach, ask yourself:

**"If this creator screenshot my message and posted it with the caption 'Look at this pitch I got,' would I be proud or embarrassed?"**

If the answer is embarrassed, rewrite it.

Creators have audiences. Your outreach is never truly private. Make it something you'd be proud to have public.

---

## Quiz: Creator Outreach Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What's the primary difference between B2B cold outreach and creator outreach?",
      "options": [
        "Creators prefer email over LinkedIn",
        "Creators evaluate pitches through the lens of 'Would my audience respect this?'",
        "Creators respond faster",
        "Creators don't care about personalization"
      ],
      "correctAnswer": 1,
      "explanation": "Creators think in public. Every partnership is evaluated through audience perception, not just personal benefit."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "According to the '3 Before You Ask' rule, what should you do BEFORE pitching a creator?",
      "options": [
        "Send 3 emails",
        "Consume content, engage publicly, provide value",
        "Connect on 3 platforms",
        "Wait 3 weeks"
      ],
      "correctAnswer": 1,
      "explanation": "The framework is: (1) Consume their content, (2) Engage publicly, (3) Provide value first, (4) Then make the ask."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "What's the expected response rate for warm DMs to creators (after engagement) vs. cold emails?",
      "options": [
        "5-10% vs. 15-30%",
        "15-30% vs. 5-10%",
        "Both are 5-10%",
        "Both are 15-30%"
      ],
      "correctAnswer": 1,
      "explanation": "Warm DMs (after engagement) achieve 15-30% response rates, while cold emails to creators get 5-10%."
    },
    {
      "id": "q4",
      "type": "multiple-choice",
      "question": "For Instagram creators, what's the recommended warm-up period before sending a DM?",
      "options": [
        "1-3 days",
        "5-7 days",
        "10-14 days",
        "No warm-up needed"
      ],
      "correctAnswer": 2,
      "explanation": "Instagram filters DMs from non-followers into 'Message Requests.' A 10-14 day warm-up period (follow + engage) dramatically increases open rates."
    },
    {
      "id": "q5",
      "type": "true-false",
      "question": "True or False: For creator outreach, email-only sequences outperform multi-channel sequences.",
      "correctAnswer": false,
      "explanation": "False. Multi-channel sequences (platform-native engagement + email) achieve 15-25% response rates vs. 5-10% for email-only. Quality beats quantity with creators."
    },
    {
      "id": "q6",
      "type": "multiple-choice",
      "question": "Which phrase is a red flag in creator outreach (according to the Creator Outreach Linter)?",
      "options": [
        "'Your video on [topic] at timestamp 12:34 resonated with me'",
        "'I love your content!'",
        "'I noticed you mentioned [specific point] in your last newsletter'",
        "'I have data on this topic that might be useful for a future post'"
      ],
      "correctAnswer": 1,
      "explanation": "'I love your content!' is a generic compliment with no substance. It signals you didn't actually engage deeply with their work."
    },
    {
      "id": "q7",
      "type": "multiple-choice",
      "question": "A creator replies: 'I already have sponsors for this.' What's the best response?",
      "options": [
        "'Our solution is better than theirs'",
        "'Can I send you our pricing anyway?'",
        "'That makes sense. I noticed [specific gap]. Would a chat about [specific improvement] be useful? No pitch — genuinely curious.'",
        "'Let me know if anything changes'"
      ],
      "correctAnswer": 2,
      "explanation": "Acknowledge their current setup, identify a specific gap or opportunity, and frame it as curiosity (not a pitch). This keeps the door open without being pushy."
    },
    {
      "id": "q8",
      "type": "multiple-choice",
      "question": "What's the 'Screenshot Test' for creator outreach?",
      "options": [
        "Always include a screenshot in your outreach",
        "Screenshot their content before messaging",
        "Ask yourself: 'If they screenshot my message and post it publicly, would I be proud or embarrassed?'",
        "Take a screenshot of your message for your records"
      ],
      "correctAnswer": 2,
      "explanation": "The Screenshot Test reminds you that creator outreach is never truly private. If you'd be embarrassed by your message being public, rewrite it."
    }
  ]
}