---
title: "Managing Your First Sales Rep"
duration: "50 min"
track: "Operations & Systems"
course: "Course 45: Scaling to First Sales Hire"
lesson: 8
---

## The Management Paradox

You hired to free up time. Now you're managing.

This is the part nobody warns you about. In Month 1, you're spending 5–7 hours per week on onboarding. Month 2: 3–4 hours on supervision and coaching. Month 3+: 1–2 hours if things are going well, more if they're not.

The good news: this investment decreases sharply as your hire ramps. The bad news: most founders manage wrong in the early months and create problems that compound later — either by micromanaging (which kills initiative and makes your hire dependent) or by under-managing (which lets bad habits form that are hard to break).

This lesson gives you a management framework that invests your time where it generates the most return: coaching on the specific skills that drive results, not supervising activity for its own sake.

<InsightCard icon="🎯" title="The Management Insight">
70% of sales rep underperformance is due to management gaps, not talent gaps. This is not a comfortable statistic for founders who want to blame the hire. The question is not always "is this the right person?" It's also "am I managing them the right way?" Before you make a fire decision, audit your own management quality.
</InsightCard>

## The Three Management Failure Modes

Founders who have never managed a sales rep make predictable mistakes. Know yours before you make it.

<SlideNavigation>
<Slide title="Failure Mode 1: The Absentee Manager">

**What it looks like:** You hired to get off the phone. So now you're off the phone — and also out of your hire's day-to-day. No weekly 1:1s, no call reviews, no specific feedback. You check the meeting count at the end of the month and wonder why it's low.

**Why it fails:** SDRs (especially early-career ones) need frequent, specific coaching to improve. Without feedback on their messages and calls, bad habits solidify. The first 90 days of management determine the next 9 months of performance.

**The cost:** 3 months of salary and opportunity cost while your hire develops habits that will take months to unlearn.

**The fix:** Weekly 30-minute 1:1, 2 call reviews per week, and a specific coaching focus each week (not general "be better" — one specific skill).

</Slide>
<Slide title="Failure Mode 2: The Micromanager">

**What it looks like:** You review every email before it goes out. You join every call. You correct every small deviation from the template. Your hire can't sneeze without your approval.

**Why it fails:** Micromanagement creates dependency. Your hire stops developing judgment because they know you'll catch everything. They stop taking initiative because initiative gets corrected. They slow down because everything needs your approval.

**The cost:** Your hire never becomes truly independent. You're still spending 5+ hours per week on management at Month 6, which defeats the entire purpose of the hire.

**The fix:** Pre-review in Week 1–2, then spot-check in Week 3–4, then metrics-only from Month 2. Explicitly communicate when you're reducing oversight and why: "I'm stopping pre-review of your messages. I'll spot-check 3 per week. You've earned that autonomy."

</Slide>
<Slide title="Failure Mode 3: The Feedback Avoider">

**What it looks like:** You notice problems but avoid addressing them because it feels uncomfortable, you're busy, or you hope they'll self-correct. You tell them "great job" even when it wasn't. You soften feedback to the point where they don't understand what's wrong.

**Why it fails:** Problems that aren't named get bigger, not smaller. A hire who thinks they're doing well when they're not will be blindsided at the 90-day review. And by that point, you've waited too long to fix the issue — the decision becomes fire or not fire, when coaching could have solved it weeks earlier.

**The cost:** A hire who could have been salvaged isn't, because the feedback never landed clearly enough to change behavior.

**The fix:** Name problems specifically and early. "Your message quality was strong this week" is useless. "Your personalization rate is 40% — I want to see 70% by next Monday" is actionable. Specific, early, direct.

</Slide>
</SlideNavigation>

## The Weekly 1:1: Your Core Management Tool

Research from CEB/Gartner shows that weekly 1:1s improve rep performance by 20–30%. This isn't about accountability theater — it's about creating a predictable coaching cadence where your hire knows they'll get specific feedback every week.

Here's the exact 30-minute structure:

<TemplateBuilder
  title="Weekly 1:1 Agenda Template"
  persistKey="scale-L8-oneononone"
  sections={[
    {
      id: "wins",
      title: "Segment 1: Wins (2 min)",
      fields: [
        {
          id: "wins-prompt",
          label: "Your question for this segment",
          placeholder: "e.g., 'What went well this week? Tell me about one win, even a small one.'",
          type: "text"
        },
        {
          id: "wins-why",
          label: "Why you start with wins",
          placeholder: "e.g., Sets a positive tone. Helps you understand what they think 'good' looks like. Occasionally reveals wins you didn't know about.",
          type: "textarea"
        }
      ]
    },
    {
      id: "pipeline",
      title: "Segment 2: Pipeline Review (10 min)",
      fields: [
        { id: "pipeline-q1", label: "Question 1 (active meetings)", placeholder: "e.g., 'Walk me through your top 3 deals — where are they and what's the next step?'", type: "text" },
        { id: "pipeline-q2", label: "Question 2 (blockers)", placeholder: "e.g., 'Which deal feels stuck? What's your diagnosis of why?'", type: "text" },
        { id: "pipeline-q3", label: "Question 3 (upcoming activities)", placeholder: "e.g., 'What's your outreach plan for next week — which accounts and what's the hook?'", type: "text" }
      ]
    },
    {
      id: "metrics",
      title: "Segment 3: Metrics Review (5 min)",
      fields: [
        { id: "metrics-tracked", label: "Which metrics you review each week", placeholder: "e.g., Emails sent, LinkedIn messages sent, reply rate, meetings booked, show rate", type: "textarea" },
        { id: "metrics-question", label: "Your framing question", placeholder: "e.g., 'Your reply rate dropped from 5.4% to 3.1% this week. What's your hypothesis?'", type: "text" }
      ]
    },
    {
      id: "coaching",
      title: "Segment 4: One Coaching Moment (10 min)",
      fields: [
        { id: "coaching-source", label: "Where your coaching moment comes from each week", placeholder: "e.g., I review 2 call recordings before the 1:1 and pick one specific moment to analyze", type: "text" },
        { id: "coaching-format", label: "How you deliver feedback", placeholder: "e.g., 'At [timestamp] in your call on Thursday, you said X. I want to try Y instead because Z. Let's roleplay it.'", type: "textarea" }
      ]
    },
    {
      id: "blockers",
      title: "Segment 5: Blockers + Action Items (3 min)",
      fields: [
        { id: "blocker-q", label: "Your blockers question", placeholder: "e.g., 'What's preventing you from hitting your number this week? What do you need from me?'", type: "text" },
        { id: "action-items", label: "How you close the 1:1", placeholder: "e.g., Both of us state our 3 commitments for next week. I write them down and reference them at the next 1:1.", type: "textarea" }
      ]
    }
  ]}
/>

## Call Coaching: The Highest-Leverage Management Activity

Call recordings are the most valuable management tool you have. A rep who receives weekly call feedback ramps 40% faster than one who doesn't.

Here's the framework for making call coaching actually work:

<ProgressiveReveal title="The Call Coaching Framework" persistKey="scale-L8-coaching">

<RevealSection title="Step 1: Pick the Right Calls">
Don't review every call — you don't have time and your hire will feel surveilled. Pick 2–3 calls per week using this prioritization: (1) Meetings that didn't convert to a second call (highest learning value), (2) Deals that have stalled (diagnosis value), (3) One successful call (model what good looks like). Avoid reviewing only the difficult calls — your hire needs to see what they're doing right as much as what to improve.
</RevealSection>

<RevealSection title="Step 2: Take Timestamped Notes">
Don't try to remember what you observed — take notes in real time with timestamps. Format: "[4:23] — Asked a great discovery question, prospect opened up about budget." "[7:14] — When prospect objected on price, you skipped acknowledgment and went straight to defending value. Try LARA here instead."

These timestamps allow you to give hyper-specific feedback without summarizing from memory.
</RevealSection>

<RevealSection title="Step 3: Ask for Self-Assessment First">
Before sharing your observations, ask your hire to assess their own call. "Before I share what I noticed, what did you think went well and what would you do differently?"

Two outcomes: (1) Their self-assessment matches yours — high self-awareness, coaching reinforces what they already know. (2) Their self-assessment is completely different from yours — this is the most valuable management signal. The gap between self-perception and actual performance predicts coachability.
</RevealSection>

<RevealSection title="Step 4: One Improvement Focus Per Week">
Don't give 7 pieces of feedback in one session. Research on learning consistently shows that single-focus feedback drives more improvement than multi-focus feedback. Pick the one thing that would most improve their performance if they fixed it this week. Frame it: "This week I want you to focus specifically on [X]. Everything else can wait."

Rotate focus areas: discovery in Week 1, objection handling in Week 2, next steps in Week 3, and back to discovery in Week 4 (to see if it held).
</RevealSection>

<RevealSection title="Step 5: Close with a Micro-Commitment">
After every coaching session, get a specific commitment: "So, in your next 3 calls, you're going to ask the budget question before you show the demo. Can I hear your version of how you'll phrase it?"

Practice the specific thing in the session. Don't just talk about it — roleplay it. A hire who practices the skill right after the coaching session retains it 60% better than one who just receives verbal feedback.
</RevealSection>

</ProgressiveReveal>

## Managing Metrics Without Micromanaging

The right metrics tell you whether your hire is on track without requiring you to supervise their every action.

<SlideNavigation>
<Slide title="Daily Metrics (Review Yourself, Don't Ask Them)">

**What to track:** Activity output — emails sent, LinkedIn messages sent, calls made (if applicable).

**How:** Pull from your sequencing tool (HubSpot Sequences, Outreach, Apollo) each morning. 2 minutes of review, not a status check.

**What you're looking for:** Activity below 60% of daily target for 3 consecutive days is a flag. Below 40% for a week is a conversation.

**What you're not doing:** Asking your hire "how many emails did you send today?" — that's micromanagement. The tools give you the answer.

</Slide>
<Slide title="Weekly Metrics (Review Together in 1:1)">

**What to track:** Reply rate, meeting booking rate (meetings/outreach attempts), show rate (shows/bookings).

**How:** Pull from your sequencing tool weekly. Show the numbers in the 1:1 — don't just tell them.

**What you're looking for:** Trends, not point-in-time data. A reply rate that goes 2% → 3% → 4.5% over 3 weeks is a great trend even if the absolute number is still below target. A rate that goes 4% → 3.5% → 3% is a concern even if the absolute number looks okay.

</Slide>
<Slide title="Monthly Metrics (Formal Review)">

**What to track:** Meetings booked vs. ramp quota, meeting quality (conversion from meeting to SQL or deal), pipeline generated by their activities.

**How:** Monthly 45-minute formal review. Not a 1:1 — a performance review with a written summary.

**What you're looking for:** Is the ramp trajectory on track with the benchmarks from Lesson 7? Are meetings converting into deals at the expected rate? Are you seeing quality improvement month over month?

</Slide>
</SlideNavigation>

## The Accountability vs. Support Balance

The hardest part of managing a first sales hire as a founder is holding someone accountable while also being their coach, cheerleader, and manager — sometimes in the same conversation.

<StrategyDuel
  title="When Your SDR Misses Their Month 2 Target"
  persistKey="scale-L8-duel"
  scenario="It's the end of Month 2. Your SDR's ramp quota was 7 meetings. They booked 4. They're apologetic but have several explanations: the holidays, a prospect who went dark, and a week of low reply rates. What do you do?"
  strategyA={{
    name: "Accountability First",
    description: "Focus on the gap: they're at 57% of ramp quota, which is below the 80% threshold for a 'normal ramp' signal. Set a clear expectation: 7 meetings in Month 3 or we have a performance conversation.",
    pros: [
      "Sets clear expectations and avoids ambiguity",
      "Prevents the problem from drifting into Month 3 without acknowledgment",
      "Treats them as a professional who can handle direct feedback",
      "Creates urgency that may drive better Month 3 performance"
    ],
    cons: [
      "May create anxiety that hurts performance rather than helping it",
      "Doesn't address the root cause (was it skill, effort, or circumstances?)",
      "Can damage trust if the miss was partially due to factors outside their control",
      "Pure accountability without coaching leaves them without a clear path to improvement"
    ]
  }}
  strategyB={{
    name: "Diagnosis First, Accountability Second",
    description: "Start by diagnosing the cause: 'Help me understand what happened. Walk me through your week-by-week plan and where things broke down.' Then set expectations based on the diagnosis.",
    pros: [
      "Distinguishes between skill gaps (coachable) and effort gaps (accountability issue)",
      "Shows you care about the root cause, not just the number",
      "Gives you information to provide actually useful coaching",
      "Maintains the relationship while still holding them accountable"
    ],
    cons: [
      "Takes longer — diagnosis conversation is 20+ minutes",
      "Explanations can feel like excuses if you're not careful",
      "Requires you to make a judgment call on the explanation's validity",
      "Could be perceived as soft if you don't follow through with clear expectations"
    ]
  }}
  expertVerdict="Always diagnose before you hold accountable. The conversation is: (1) 'Walk me through the month — help me understand where the shortfall came from.' (2) Listen to distinguish skill gap from effort gap. (3) 'Based on what you've said, here's my diagnosis.' (4) 'Here's what I need to see in Month 3: [specific targets].' (5) 'What do you need from me to get there?' Diagnosis-then-accountability prevents you from applying the wrong intervention — coaching a person who needs accountability or pressuring a person who needs coaching."
/>

## The Celebration Protocol

You can't only show up to your hire's day when things are wrong. Celebrating wins — even small ones — is part of effective sales management.

<InsightCard icon="🎉" title="What Deserves Celebration">
Every first: first reply, first booked meeting, first showed meeting, first deal that came from their pipeline (even if you closed it). Weekly wins: hitting activity targets for the first time, a reply rate week above their previous best, a message they wrote that you'd use verbatim. Acknowledge these in real-time, not just at the monthly review.

A 30-second Slack message ("Saw that reply rate hit 7% this week — that's your best yet, and the subject line change you made on Tuesday is why") costs you nothing and drives performance more than any comp adjustment.
</InsightCard>

## Practice the Hard Conversation

<MiniRoleplay
  scenario="Your SDR is in Month 3. Their quota is 9 meetings. They've booked 4 in 3 weeks with 1 week left. They're sending the right volume of outreach but the reply rates have dropped. They're frustrated and a little defensive. You need to diagnose the problem and set clear expectations for the final week — and for Month 4 if the trend doesn't reverse."
  role="Founder managing Month 3 performance"
  persistKey="scale-L8-roleplay"
  modelResponse="Here's how to open this conversation: 'I want to talk about where we're at with 1 week left. You're at 4 of 9, which is below where we need to be. Before we talk about next steps, I want to understand what's happening. Walk me through your week — what does your outreach look like, and what are you seeing in terms of responses?' [Listen carefully.] 'Here's what I'm observing: your volume is right, but your reply rate dropped from 6% to 2.8% over the past 2 weeks. That's usually a message quality or targeting issue, not an effort issue. Let's look at 5 of your messages from this week together. [Review together.] I see the problem — you've shifted away from the specific opener and back to a more generic format. That's the change. Can we rewrite 3 of these together right now?' [Fix it.] 'For Month 4: I need to see 8 meetings. If we're below 5 by the end of Week 2, we need to have a different conversation about fit. I'm not saying that to threaten you — I'm saying it because I want you to know exactly where the line is.'"
/>

## Your Management Cadence Plan

<InteractiveChecklist
  title="Lesson 8 Action Items"
  persistKey="scale-L8-actions"
  items={[
    "Set up recurring weekly 1:1 in your calendar — 30 min, same time every week",
    "Create your 1:1 agenda template (customize the template from this lesson for your specific context)",
    "Establish your call review routine — which 2 calls will you review each week and when?",
    "Set up metrics dashboards in HubSpot (or your sequencing tool) so you can pull weekly data in 2 minutes",
    "Write your 'celebration protocol' — how will you acknowledge wins in real-time?",
    "Practice the diagnosis conversation from the StrategyDuel — you'll need it before Month 3 ends",
    "Document your management style: are you tendency-toward-absentee or tendency-toward-micromanaging? Build in guardrails."
  ]}
/>

## What's Next

In Lesson 9, you'll face the hardest management decision: what to do when the first hire doesn't work out. You'll build a performance improvement plan, learn when to use it and when to skip straight to separation, and design an off-boarding process that protects your pipeline, your reputation, and your next hire's success.
