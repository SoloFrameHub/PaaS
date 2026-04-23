---
title: "Voice Notes & Loom Videos as Outreach Touches"
duration: "50 min"
track: "AI-Powered Acquisition"
course: "Course 25: LinkedIn AI Applications"
lesson: 8
---

## The Text Fatigue Problem

Here's what happened to Marcus, a B2B SaaS founder, in January 2026:

He spent 3 weeks crafting the "perfect" LinkedIn DM template. Personalized first line. Clear value prop. Soft CTA. He sent 47 of these to warm connections who'd engaged with his content.

**Response rate: 8.5%.**

Then he tried something different. He recorded a 45-second voice note for his next 20 prospects. Same message, same value prop — just spoken instead of typed.

**Response rate: 65%.**

The difference? **Everyone else was still typing.**

<InsightCard icon="🎙️" title="The Async Audio Advantage">
Voice notes and short videos aren't just "different formats" — they're **pattern interrupts** in a text-saturated medium. Your prospect's brain processes them differently, remembers them longer, and trusts them more.
</InsightCard>

By the end of this lesson, you'll know:
- When voice/video outperforms text (and when it doesn't)
- How to script and record async messages that convert
- The technical setup for LinkedIn voice notes and Loom videos
- AI-assisted scripting workflows that keep your voice authentic
- The "Hybrid Touch" strategy that combines text, audio, and video

---

## Why Voice & Video Work (The Psychology)

### The Three Engagement Multipliers

<FlipCard 
  front="Multiplier #1: Cognitive Load" 
  back="Listening to a 60-second voice note requires less effort than reading 200 words. Your prospect can listen while walking, driving, or between meetings. Text demands full attention." 
/>

<FlipCard 
  front="Multiplier #2: Parasocial Trust" 
  back="Hearing your voice or seeing your face activates the same neural pathways as in-person conversation. Text feels transactional. Audio/video feels relational." 
/>

<FlipCard 
  front="Multiplier #3: Novelty Signal" 
  back="In a feed of 100 text DMs, the audio waveform icon or video thumbnail stands out. Curiosity drives the click. Personalization drives the reply." 
/>

### The Data

<ExampleCard label="Engagement Benchmarks (2025-2026)">

**Text-only LinkedIn DM:**
- Open rate: 40-60%
- Reply rate: 5-15% (cold), 15-30% (warm)

**Voice note DM:**
- Open rate: 80-90%
- Reply rate: 20-40% (cold), 40-65% (warm)

**Loom video DM:**
- Click-through rate: 3x higher than text links
- Meeting booking rate: 25-40% (warm prospects)

**Source:** LinkedIn practitioner data, Loom customer studies, emerging trends research 2026
</ExampleCard>

<RangeSlider 
  label="How often do you currently use voice or video in outreach?" 
  min={0} 
  max={10} 
  lowLabel="Never" 
  highLabel="Every message" 
  persistKey="linkedin-ai-L8-current-usage" 
/>

---

## LinkedIn Voice Notes: The Native Advantage

### What They Are

LinkedIn voice notes are a **native DM feature** — no third-party tools, no automation risk, no technical setup.

**Specs:**
- Max length: 60 seconds
- Available to: 1st-degree connections only
- Format: Audio waveform with play button
- Recording: Click microphone icon in DM composer

### When to Use Voice Notes

<ClassifyExercise
  title="Voice Note or Text DM?"
  persistKey="linkedin-ai-L8-classify-voice"
  categories={[
    { id: "voice", label: "Voice Note", color: "#10b981" },
    { id: "text", label: "Text DM", color: "#3b82f6" }
  ]}
  items={[
    { 
      id: "1", 
      content: "Following up after they accepted your connection request", 
      correctCategory: "voice",
      explanation: "Perfect use case — warm connection, personal touch, stands out from text follow-ups"
    },
    { 
      id: "2", 
      content: "Cold outreach to a C-level executive you've never interacted with", 
      correctCategory: "text",
      explanation: "Too informal for first touch to senior decision-makers. Start with text, use voice later."
    },
    { 
      id: "3", 
      content: "Responding to someone who commented on your post", 
      correctCategory: "voice",
      explanation: "They've already engaged with you — voice note feels natural and appreciative"
    },
    { 
      id: "4", 
      content: "Sending the same message to 50 people", 
      correctCategory: "text",
      explanation: "Voice notes must be 1:1 personalized. Mass voice = inauthentic and detectable."
    },
    { 
      id: "5", 
      content: "Following up after no reply to your text DM", 
      correctCategory: "voice",
      explanation: "Pattern interrupt — if text didn't work, voice might. Shows extra effort."
    }
  ]}
/>

### The Voice Note Script Formula

AI can help you draft scripts, but they must sound **spoken**, not written.

<TemplateBuilder
  title="Voice Note Script Builder"
  persistKey="linkedin-ai-L8-voice-script"
  sections={[
    {
      id: "opener",
      title: "Opener (5-10 seconds)",
      fields: [
        { 
          id: "name", 
          label: "Their Name", 
          placeholder: "Sarah", 
          type: "text" 
        },
        { 
          id: "context", 
          label: "Connection Context", 
          placeholder: "I saw you commented on my post about AI outreach", 
          type: "text" 
        }
      ]
    },
    {
      id: "value",
      title: "Value Statement (20-30 seconds)",
      fields: [
        { 
          id: "insight", 
          label: "Specific Insight or Observation", 
          placeholder: "You mentioned struggling with reply rates — I had the same problem until I switched to...", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "cta",
      title: "Call-to-Action (10-15 seconds)",
      fields: [
        { 
          id: "ask", 
          label: "Soft Ask", 
          placeholder: "Would you be open to a quick 15-minute chat about what worked for me?", 
          type: "text" 
        }
      ]
    }
  ]}
/>

**AI Prompt for Script Generation:**

```
Generate a 45-second voice note script for LinkedIn DM outreach.

Context:
- Prospect: [Name, Role, Company]
- Connection point: [How you're connected or what they did]
- Value offer: [What you can help with]

Requirements:
- Conversational tone (contractions, natural pauses)
- Mention their name in first 5 seconds
- Reference something specific to them
- End with a low-pressure question
- Total: 40-50 seconds when spoken aloud
```

<MiniRoleplay
  scenario="You're recording a voice note to a prospect who accepted your connection request 2 days ago. They're a VP of Marketing at a 50-person SaaS company. You help companies reduce CAC through better positioning."
  role="Record your voice note script (write what you'd say)"
  persistKey="linkedin-ai-L8-roleplay-voice"
  modelResponse="Hey [Name], thanks for connecting! I saw on your profile you've been at [Company] for about 6 months now — congrats on the role. I noticed you're hiring for a demand gen manager, which usually means you're scaling up acquisition. I work with SaaS companies around your size on positioning that cuts CAC by 20-30%. Would you be open to a quick 15-minute call to share what's worked for others in your space? No pressure either way — just thought it might be helpful. Talk soon!"
/>

---

## Loom Videos: The Screen-Share Advantage

### What Loom Does Differently

Voice notes are audio-only. **Loom adds visual context** — your face, their website, a shared screen, a quick diagram.

**Use cases:**
- **Website/product teardown:** "I spent 5 minutes on your site and noticed..."
- **Case study walkthrough:** Screen-share a relevant result
- **Personalized demo:** Show how your tool solves their specific problem
- **Follow-up after no reply:** Video feels like more effort = more respect

### Loom Setup (Free Tier)

<ProgressiveReveal title="Loom Quick Start Guide" persistKey="linkedin-ai-L8-loom-setup">
<RevealSection title="Step 1: Install Loom">
- Go to loom.com and sign up (free)
- Install Chrome extension or desktop app
- Free tier: 25 videos, 5 min max per video
- Upgrade ($12.50/mo): unlimited videos, custom branding, video editing
</RevealSection>

<RevealSection title="Step 2: Recording Options">
- **Screen + Camera:** Best for product demos or website teardowns
- **Camera only:** Best for personal messages (like a video voice note)
- **Screen only:** Best for data/report walkthroughs

Choose "Screen + Camera" for outreach — seeing your face builds trust.
</RevealSection>

<RevealSection title="Step 3: Recording Best Practices">
- **Length:** 30-90 seconds for cold outreach, up to 3 min for warm
- **Framing:** Face in bottom-right corner, screen content fills frame
- **Lighting:** Face a window or use a desk lamp
- **Audio:** Use headphones with mic (AirPods work fine)
- **Script:** Bullet points only — don't read word-for-word
</RevealSection>

<RevealSection title="Step 4: Sharing the Link">
After recording:
- Loom generates a shareable link
- Copy link → paste in LinkedIn DM or email
- Loom tracks views (you'll know if they watched)

**Pro tip:** Use a custom thumbnail (your face + their company name) to increase click-through.
</RevealSection>
</ProgressiveReveal>

### The Loom Video Script Formula

<TemplateBuilder
  title="Loom Video Script Builder"
  persistKey="linkedin-ai-L8-loom-script"
  sections={[
    {
      id: "intro",
      title: "Intro (10 seconds)",
      fields: [
        { 
          id: "greeting", 
          label: "Greeting + Name", 
          placeholder: "Hey Sarah, I'm [Your Name]", 
          type: "text" 
        },
        { 
          id: "reason", 
          label: "Why You're Recording", 
          placeholder: "I spent a few minutes on your website and wanted to share something I noticed", 
          type: "text" 
        }
      ]
    },
    {
      id: "observation",
      title: "Observation (30-45 seconds)",
      fields: [
        { 
          id: "specific", 
          label: "Specific Thing You Noticed", 
          placeholder: "Your pricing page doesn't mention ROI or payback period — most SaaS buyers need that to justify the purchase", 
          type: "textarea" 
        },
        { 
          id: "impact", 
          label: "Why It Matters", 
          placeholder: "We've seen companies add an ROI calculator and increase trial-to-paid by 15-20%", 
          type: "textarea" 
        }
      ]
    },
    {
      id: "cta",
      title: "Call-to-Action (10-15 seconds)",
      fields: [
        { 
          id: "offer", 
          label: "What You're Offering", 
          placeholder: "I'd be happy to share the exact framework we use — it takes about 15 minutes to walk through", 
          type: "text" 
        }
      ]
    }
  ]}
/>

**AI Prompt for Loom Script:**

```
Generate a 60-second Loom video script for B2B outreach.

Context:
- Prospect: [Name, Role, Company]
- What I'm showing on screen: [Their website, a case study, a tool demo]
- Value offer: [Specific insight or help]

Requirements:
- Start with their name and why I'm recording
- Point out 1-2 specific observations (show on screen)
- Explain the impact or missed opportunity
- End with a low-friction offer (share a framework, quick call, send a resource)
- Conversational tone, not salesy
- 50-70 seconds total
```

<RewriteExercise
  title="Transform This Generic Loom Script"
  persistKey="linkedin-ai-L8-rewrite-loom"
  original="Hi, I wanted to reach out because I think our tool could help your company. We work with companies like yours to improve their marketing. Let me know if you'd like to chat."
  hint="Make it specific: mention their company by name, reference something on their website, offer a concrete insight"
  expertRewrite="Hey Sarah, I'm Alex. I was looking at the DataPulse website and noticed your case studies page doesn't include any ROI metrics — just feature descriptions. Most B2B buyers need to see payback period or cost savings to justify a purchase. We helped a similar company add an ROI calculator to their site and saw trial-to-paid conversion jump 18% in 60 days. I'd be happy to share the exact template we used — takes about 10 minutes to walk through. Let me know if that'd be useful!"
  criteria={[
    "Uses prospect's name and company name",
    "References something specific on their website",
    "Offers a concrete, valuable insight",
    "Includes a measurable outcome (18% increase)",
    "Ends with a low-friction offer (10-minute walkthrough)"
  ]}
/>

---

## The Hybrid Touch Strategy

Text, voice, and video aren't mutually exclusive. The highest-converting outreach **combines all three** in a sequence.

### The 5-Touch Hybrid Sequence

<SlideNavigation>
<Slide title="Touch 1: Connection Request (Text)">
**Format:** LinkedIn connection request with personalized note (300 characters max)

**Goal:** Get accepted

**Template:**
"Hi [Name], I saw your post about [topic] — really resonated with me. I work with [ICP] on [outcome]. Would love to connect and share what's working in [their industry]."

**AI Assist:** Generate 5 variations based on their recent activity
</Slide>

<Slide title="Touch 2: Voice Note (30-45 sec)">
**Timing:** 24-48 hours after connection acceptance

**Format:** LinkedIn voice note

**Goal:** Start a conversation

**Template:**
"Hey [Name], thanks for connecting! I saw [specific thing about them]. I've been working on [related problem] with companies like yours and thought you might find [insight] interesting. Would you be open to a quick chat about what's working?"

**Why voice:** Pattern interrupt after text connection request. Shows effort.
</Slide>

<Slide title="Touch 3: Text Follow-Up (If No Reply)">
**Timing:** 3-4 days after voice note

**Format:** Text DM

**Goal:** Re-engage with value

**Template:**
"Hey [Name], not sure if you had a chance to listen to my voice note — totally understand if you're swamped. I wanted to share [specific resource/case study/insight] that's relevant to [their situation]. No strings attached, just thought it might be helpful: [link]"

**Why text:** Some people prefer reading. Gives them an easy out.
</Slide>

<Slide title="Touch 4: Loom Video (If Still No Reply)">
**Timing:** 5-7 days after text follow-up

**Format:** Loom video (60-90 sec)

**Goal:** Maximum personalization, final attempt

**Template:**
Record a screen-share of their website, product, or LinkedIn profile with specific observations and a concrete offer.

**Why video:** Highest effort signal. If this doesn't work, move on.
</Slide>

<Slide title="Touch 5: Breakup Message (Text)">
**Timing:** 7-10 days after Loom

**Format:** Text DM

**Goal:** Close the loop, leave door open

**Template:**
"Hey [Name], I know you're busy and I don't want to be a pest. I'll stop reaching out, but if you ever want to chat about [topic], I'm here. Best of luck with [their project/goal]!"

**Why text:** Respectful exit. Sometimes this gets a reply ("Sorry, crazy month — let's talk").
</Slide>
</SlideNavigation>

<DecisionTree
  title="Choose Your Touch Strategy"
  persistKey="linkedin-ai-L8-decision-tree"
  startNodeId="start"
  nodes={[
    { 
      id: "start", 
      content: "Your prospect accepted your connection request. What's your next move?", 
      choices: [
        { label: "Send a voice note within 24 hours", nextNodeId: "voice-fast" },
        { label: "Wait 3-4 days, then send a text DM", nextNodeId: "text-slow" }
      ]
    },
    { 
      id: "voice-fast", 
      content: "They listen to your voice note but don't reply. What now?", 
      choices: [
        { label: "Send a text follow-up with a resource", nextNodeId: "text-followup" },
        { label: "Record a Loom video immediately", nextNodeId: "loom-too-soon" }
      ]
    },
    { 
      id: "text-slow", 
      content: "They don't reply to your text DM. What's next?", 
      choices: [
        { label: "Send a voice note as a pattern interrupt", nextNodeId: "voice-second" },
        { label: "Send another text DM", nextNodeId: "text-spam" }
      ]
    },
    { 
      id: "text-followup", 
      content: "They click your resource link but still don't reply. Final move?", 
      choices: [
        { label: "Record a Loom video with specific observations", nextNodeId: "loom-good" },
        { label: "Send a breakup message and move on", nextNodeId: "breakup" }
      ]
    },
    { 
      id: "loom-too-soon", 
      content: "Loom after voice feels like overkill. They don't watch it.", 
      isTerminal: true, 
      outcome: "negative",
      feedback: "Space out your touches. Voice → Text → Loom works better than Voice → Loom."
    },
    { 
      id: "voice-second", 
      content: "They listen to your voice note and reply asking for more info!", 
      isTerminal: true, 
      outcome: "positive",
      feedback: "Perfect. Voice as a pattern interrupt after text often works."
    },
    { 
      id: "text-spam", 
      content: "Two text DMs in a row feels spammy. They don't reply.", 
      isTerminal: true, 
      outcome: "negative",
      feedback: "Vary your format. Text → Voice or Text → Loom keeps it fresh."
    },
    { 
      id: "loom-good", 
      content: "They watch your Loom and reply: 'This is really helpful. Let's talk.'", 
      isTerminal: true, 
      outcome: "positive",
      feedback: "Excellent. Loom as a final high-effort touch often converts warm prospects."
    },
    { 
      id: "breakup", 
      content: "They reply to your breakup message: 'Sorry for the delay — let's chat next week.'", 
      isTerminal: true, 
      outcome: "positive",
      feedback: "Breakup messages work surprisingly well. Respectful persistence pays off."
    }
  ]}
/>

---

## AI-Assisted Scripting Workflow

You don't need to write every voice note or Loom script from scratch. AI can draft them — **but you must edit for authenticity.**

### The 3-Step AI Scripting Process

<ProgressiveReveal title="AI Scripting Workflow" persistKey="linkedin-ai-L8-ai-workflow">
<RevealSection title="Step 1: Feed AI the Context">
Paste into ChatGPT or Claude:

```
I'm recording a [voice note / Loom video] for LinkedIn outreach.

Prospect:
- Name: [Name]
- Role: [Title]
- Company: [Company name, size, industry]
- Connection point: [How you're connected or what they did]

My offer:
- I help [ICP] achieve [outcome]
- Relevant insight: [Specific observation about their situation]

Generate a [30-second voice note / 60-second Loom video] script.

Requirements:
- Conversational tone (use contractions, natural pauses)
- Mention their name in first 5 seconds
- Reference something specific to them
- End with a low-pressure question
- [For Loom: Include what I'll show on screen]
```
</RevealSection>

<RevealSection title="Step 2: AI Generates Draft">
AI output example:

"Hey Sarah, I'm Alex. I saw you just posted about struggling with LinkedIn reply rates — I've been there. I actually had the same problem until I switched from text-only DMs to voice notes like this one. Reply rates went from 8% to 40% in about two weeks. I'd love to share the exact framework I used — it's pretty simple, takes about 15 minutes to walk through. Would that be helpful? Let me know!"
</RevealSection>

<RevealSection title="Step 3: Edit for Your Voice">
**What to fix:**
- Remove AI-isms ("I'd love to," "pretty simple," "let me know")
- Add your personal speech patterns (how YOU actually talk)
- Shorten sentences (spoken language is choppier than written)
- Add a specific detail only you would know

**Edited version:**

"Hey Sarah, Alex here. Saw your post about reply rates — been there. I had the same problem til I started using voice notes instead of text. Went from 8% to 40% replies in two weeks. I can share the framework I used if you want — takes like 15 minutes. Interested?"

**Difference:** Shorter, more direct, sounds like a real person.
</RevealSection>
</ProgressiveReveal>

<LinterFeedback
  title="Voice/Video Script Linter"
  persistKey="linkedin-ai-L8-linter"
  inputLabel="Paste your voice note or Loom script"
  rules={[
    { 
      id: "name", 
      label: "Uses Prospect's Name", 
      description: "Mentions their name in first 10 seconds", 
      keywords: ["Hey [name]", "Hi [name]"], 
      antiKeywords: [] 
    },
    { 
      id: "specific", 
      label: "Specific Reference", 
      description: "Mentions something unique to them (post, company, role)", 
      keywords: ["I saw", "I noticed", "your post", "your company"], 
      antiKeywords: ["companies like yours", "businesses"] 
    },
    { 
      id: "conversational", 
      label: "Conversational Tone", 
      description: "Uses contractions and natural language", 
      keywords: ["I'm", "you're", "it's", "til", "gonna"], 
      antiKeywords: ["I would love to", "I am reaching out", "utilize"] 
    },
    { 
      id: "value", 
      label: "Clear Value Offer", 
      description: "States what they'll get (insight, framework, resource)", 
      keywords: ["share", "show you", "walk through", "send you"], 
      antiKeywords: ["our platform", "our solution"] 
    },
    { 
      id: "cta", 
      label: "Low-Pressure CTA", 
      description: "Ends with a question, not a demand", 
      keywords: ["interested?", "helpful?", "want to", "open to"], 
      antiKeywords: ["let's schedule", "book a call", "sign up"] 
    }
  ]}
/>

---

## When NOT to Use Voice/Video

Not every situation calls for async audio or video. Here's when to stick with text:

<SwipeDecision
  title="Voice/Video or Text DM?"
  description="Swipe right for voice/video, left for text"
  optionA="Text DM"
  optionB="Voice/Video"
  persistKey="linkedin-ai-L8-swipe"
  cards={[
    { 
      id: "1", 
      content: "Cold outreach to a Fortune 500 C-level executive you've never interacted with", 
      correctOption: "a", 
      explanation: "Too informal for first touch to senior decision-makers. Start with text, use voice/video later if they engage." 
    },
    { 
      id: "2", 
      content: "Following up with someone who commented on your post", 
      correctOption: "b", 
      explanation: "They've already engaged with you — voice note feels natural and appreciative." 
    },
    { 
      id: "3", 
      content: "Sending the same message to 50 people", 
      correctOption: "a", 
      explanation: "Voice/video must be 1:1 personalized. Mass voice = inauthentic and detectable. Use text templates." 
    },
    { 
      id: "4", 
      content: "Responding to a prospect who asked a specific question about pricing", 
      correctOption: "a", 
      explanation: "Factual questions need written answers they can reference. Voice/video is for relationship-building." 
    },
    { 
      id: "5", 
      content: "Following up after no reply to your text DM", 
      correctOption: "b", 
      explanation: "Pattern interrupt — if text didn't work, voice/video might. Shows extra effort." 
    },
    { 
      id: "6", 
      content: "Introducing yourself to a warm referral from a mutual connection", 
      correctOption: "b", 
      explanation: "Perfect use case — warm intro, personal touch, builds trust faster than text." 
    }
  ]}
/>

---

## Technical Setup & Best Practices

### Recording Environment

<InteractiveChecklist 
  title="Voice/Video Recording Checklist" 
  persistKey="linkedin-ai-L8-recording-checklist" 
  items={[
    "Quiet room (no background noise, echo, or interruptions)",
    "Good lighting (face a window or use a desk lamp for video)",
    "Headphones with mic (AirPods, wired earbuds, or USB mic)",
    "Script bullet points visible (don't read word-for-word)",
    "Test recording (listen/watch before sending)",
    "Smile while recording (it changes your voice tone)",
    "Keep it under 60 seconds for cold outreach",
    "Mention their name in first 5-10 seconds",
    "End with a clear, low-pressure question"
  ]} 
/>

### Common Mistakes to Avoid

<ExampleCard label="The 5 Deadly Sins of Voice/Video Outreach">

**1. Reading a script word-for-word**
- Sounds robotic and insincere
- Fix: Use bullet points, speak naturally

**2. Going over 90 seconds for cold outreach**
- Attention span drops after 60 seconds
- Fix: Trim ruthlessly. One insight, one ask.

**3. Forgetting to mention their name**
- Feels generic, not personalized
- Fix: Say their name in first 5 seconds

**4. Talking about yourself instead of them**
- "We help companies..." = instant tune-out
- Fix: Start with their situation, end with your offer

**5. Sending the same voice note to multiple people**
- Recipients can tell when it's not 1:1
- Fix: Re-record for each person, or use text templates
</ExampleCard>

---

## Measuring What Works

Track your voice/video outreach performance separately from text.

<ScenarioSimulator
  title="Voice/Video ROI Calculator"
  persistKey="linkedin-ai-L8-simulator"
  levers={[
    { id: "voiceNotes", label: "Voice notes sent per week", min: 5, max: 50, step: 5, defaultValue: 20 },
    { id: "voiceReplyRate", label: "Voice note reply rate (%)", min: 10, max: 70, step: 5, defaultValue: 40 },
    { id: "loomVideos", label: "Loom videos sent per week", min: 2, max: 20, step: 2, defaultValue: 10 },
    { id: "loomMeetingRate", label: "Loom → meeting rate (%)", min: 10, max: 50, step: 5, defaultValue: 30 }
  ]}
  outputs={[
    { id: "voiceReplies", label: "Voice note replies per week", formula: "(voiceNotes * (voiceReplyRate / 100))", unit: "", precision: 1 },
    { id: "loomMeetings", label: "Loom-sourced meetings per week", formula: "(loomVideos * (loomMeetingRate / 100))", unit: "", precision: 1 },
    { id: "totalConvos", label: "Total new conversations per week", formula: "(voiceReplies + loomMeetings)", unit: "", precision: 1 }
  ]}
  insight="At {totalConvos} new conversations per week, you're generating {totalConvos * 4} per month. If 20% convert to meetings, that's {totalConvos * 4 * 0.2} meetings monthly from voice/video alone."
/>

### What to Track

| Metric | How to Track | Benchmark |
|--------|-------------|-----------|
| Voice note send volume | Manual count or CRM log | 15-30/week for active outreach |
| Voice note listen rate | LinkedIn shows "Played" indicator | 80-90% |
| Voice note reply rate | Replies / sends | 20-40% (warm), 10-25% (cold) |
| Loom video send volume | Loom dashboard | 5-15/week |
| Loom video view rate | Loom analytics | 60-80% |
| Loom → meeting rate | Meetings booked / videos sent | 25-40% (warm) |

---

## Your Action Plan

<InteractiveChecklist 
  title="This Week's Implementation Sprint" 
  persistKey="linkedin-ai-L8-action-items" 
  items={[
    "Record 3 practice voice notes (don't send — just get comfortable)",
    "Install Loom and record 1 practice video (screen-share your own website)",
    "Use AI to generate 5 voice note scripts for your top 5 warm prospects",
    "Edit AI scripts for your voice (remove AI-isms, add personal details)",
    "Send 10 voice notes this week to connections who accepted your requests",
    "Send 3 Loom videos to prospects who didn't reply to text DMs",
    "Track: voice note reply rate, Loom view rate, meetings booked",
    "Review: which scripts got the best replies? Refine your template."
  ]} 
/>

---

## Quiz: Voice & Video Outreach Mastery

```json
{
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "question": "What's the primary psychological advantage of voice notes over text DMs?",
      "options": [
        "They're faster to record than typing",
        "They activate parasocial trust (same neural pathways as in-person conversation)",
        "They're harder for prospects to ignore",
        "They show you have expensive recording equipment"
      ],
      "correctAnswer": 1,
      "explanation": "Voice notes activate the same neural pathways as in-person conversation, building trust faster than text. The other factors matter, but parasocial trust is the core advantage."
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "question": "When should you NOT use a voice note for LinkedIn outreach?",
      "options": [
        "Following up after someone accepted your connection request",
        "Cold outreach to a C-level executive you've never interacted with",
        "Responding to someone who commented on your post",
        "Following up after no reply to a text DM"
      ],
      "correctAnswer": 1,
      "explanation": "Voice notes are too informal for first touch to senior decision-makers. Start with text, use voice later if they engage."
    },
    {
      "id": "q3",
      "type": "multiple-choice",
      "question": "What's the optimal length for a Loom video in cold outreach?",
      "options": [
        "15-30 seconds",
        "30-90 seconds",
        "2-3 minutes",
        "5+ minutes (show everything)"
      ],
      "correctAnswer": 1,
      "explanation": "30-90 seconds is ideal for cold outreach. Under 60 seconds is best. Longer videos work for warm prospects or demos."
    },
    {
      "id": "q4",
      "type": "true-false",
      "question": "True or False: You should record one great voice note and send it to 50 prospects to save time.",
      "correctAnswer": false,
      "explanation": "False. Voice notes must be 1:1 personalized. Recipients can tell when it's not specific to them. Mass voice = inauthentic."
    },
    {
      "id": "q5",
      "type": "multiple-choice",
      "question": "In the Hybrid Touch Strategy, what's the correct sequence?",
      "options": [
        "Text → Loom → Voice → Breakup",
        "Voice → Text → Loom → Breakup",
        "Text → Voice → Text → Loom → Breakup",
        "Loom → Voice → Text → Breakup"
      ],
      "correctAnswer": 2,
      "explanation": "The optimal sequence: Connection request (text) → Voice note → Text follow-up → Loom video → Breakup message. Vary formats to maintain interest."
    },
    {
      "id": "q6",
      "type": "multiple-choice",
      "question": "What's the #1 mistake people make when using AI to draft voice note scripts?",
      "options": [
        "Not including the prospect's name",
        "Making the script too short",
        "Not editing out AI-isms and making it sound like their actual voice",
        "Including too much personalization"
      ],
      "correctAnswer": 2,
      "explanation": "AI drafts are a starting point. You must edit for your voice, remove generic phrases, and add personal details. Reading AI scripts word-for-word sounds robotic."
    },
    {
      "id": "q7",
      "type": "multiple-choice",
      "question": "What's a realistic voice note reply rate for warm prospects (people who've engaged with your content)?",
      "options": [
        "5-10%",
        "15-25%",
        "40-65%",
        "80-90%"
      ],
      "correctAnswer": 2,
      "explanation": "40-65% reply rate for warm prospects is realistic. Cold prospects: 20-40%. Text-only DMs: 5-15% (cold), 15-30% (warm)."
    },
    {
      "id": "q8",
      "type": "true-false",
      "question": "True or False: Loom's free tier (25 videos, 5 min max) is sufficient for most solo founders doing outreach.",
      "correctAnswer": true,
      "explanation": "True. Most outreach videos are 30-90 seconds. 25 videos/month = 6-7 videos/week, which is plenty for targeted outreach. Upgrade only if you need unlimited or custom branding."
    }
  ]
}