---
title: "When the First Hire Doesn't Work Out"
duration: "45 min"
track: "Operations & Systems"
course: "Course 45: Scaling to First Sales Hire"
lesson: 9
---

## The Statistic You Need to Prepare For

50% of sales hires fail within 18 months. That number, from SalesHacker and Bravado, is not a commentary on the quality of candidates or the competence of founders. It's a reflection of how hard it is to match a person's skills and motivations to a specific sales role at a specific stage of company growth.

This means: if you hire one person, there's a coin-flip chance it doesn't work. If you hire two people over the next three years, it's likely that at least one will need to be replaced. Plan for this outcome, not as a failure of your judgment, but as a statistical reality of the talent market.

The founders who handle this well have one thing in common: they decide quickly once it's clear, they handle the transition respectfully, and they document what went wrong so the next hire is better. The founders who handle it poorly do the opposite: they wait too long, they avoid the conversation, and they make the same hiring mistake again.

<InsightCard icon="⚠️" title="The Cost of Waiting">
The average time to fire a bad sales hire is 6–9 months. The optimal decision window is 60–90 days — enough data to make a fair judgment, not so much sunk cost that you're making an emotional decision. Every month you wait after it's clear costs you: $4,600–6,250 in salary, 3–5 hours in management time, and the opportunity cost of deals that didn't close while you were managing a failing hire.
</InsightCard>

## Red Flags vs. Yellow Flags

Not every performance problem is a fire decision. Learn to distinguish the signals.

<SlideNavigation>
<Slide title="Red Flags: Act Within 30 Days">

These signals don't get better with coaching. They indicate either a fundamental mismatch or an integrity problem.

**1. Consistent activity below 50% of target.**
Not a bad week. Not a family emergency. Three weeks or more where they're sending 30 emails when the target is 60. This is not a skill problem — it's a motivation or fit problem.

**2. Refusal to follow the playbook.**
"I have my own style." "That approach doesn't feel authentic to me." "I've had success doing it differently." If they're 6 weeks in and still not running your sequences, the playbook isn't the problem. The match is.

**3. Zero improvement in quality after 3+ coaching sessions on the same skill.**
You've told them 3 times to stop leading with the product before discovery. You've shown them the recordings. You've roleplayed it together. The next call they do it again. This is a coachability red flag, not a skill gap.

**4. Attitude: blaming everything external.**
"The product is too expensive." "The leads are bad." "This market doesn't buy over email." A hire who cannot own their performance — even partially — will not improve regardless of coaching. Accountability is not coachable; it's character.

**5. Integrity issues.**
Logging meetings as "held" when they didn't happen. Claiming credit for deals they didn't generate. Any dishonesty in how they report results. Non-negotiable — immediate action.

</Slide>
<Slide title="Yellow Flags: Coach for 30 Days Before Deciding">

These signals indicate problems that are real but potentially fixable with the right support.

**1. Hitting activity targets but missing outcome targets.**
They're sending the emails, but nothing is converting. This is usually a message quality or targeting problem — both coachable. Review 10 messages, identify the pattern, give specific feedback, and check again in 2 weeks.

**2. Good weeks followed by inconsistent weeks.**
Some weeks 8 meetings, some weeks 3. The capability exists but the consistency doesn't. This is a process problem — help them build a daily routine that removes variation from their activity.

**3. Resistant to feedback but trying to implement it.**
They argue about the feedback in the 1:1, but the next week you can see they tried to apply it (imperfectly). This is ego, not disrespect. Name it directly: "I notice you push back on feedback initially but then try to implement it. I appreciate the implementation — let's skip the debate step."

**4. Slow improvement curve.**
They're improving month over month, just slower than your benchmark. The trajectory matters more than the absolute number. A hire who goes from 3 meetings in Month 1 to 5 in Month 2 to 7 in Month 3 is showing a clear and improving arc, even if Month 3 is below full quota.

**5. High activity, unqualified pipeline.**
Lots of meetings booked, but the meetings don't convert because they're off-ICP. This is a targeting problem, not a motivation problem. Go back to ICP training and tighten the qualification criteria.

</Slide>
</SlideNavigation>

## The Performance Review Framework

Use this at your 90-day checkpoint to make an objective keep/PIP/fire decision.

<TemplateBuilder
  title="90-Day Performance Review"
  persistKey="scale-L9-review"
  sections={[
    {
      id: "metrics",
      title: "Objective Metrics (Last 30 Days)",
      fields: [
        { id: "meetings", label: "Meetings booked vs. ramp quota", placeholder: "e.g., 6 of 9 = 67% of quota", type: "text" },
        { id: "activity", label: "Activity level vs. target", placeholder: "e.g., 42 emails/day avg vs. 50 target = 84% of target", type: "text" },
        { id: "reply-rate", label: "Reply rate trend (is it improving?)", placeholder: "e.g., Month 1: 2.1% → Month 2: 3.8% → Month 3: 5.1% (improving trend)", type: "text" },
        { id: "show-rate", label: "Meeting show rate", placeholder: "e.g., 78% — meetings are qualified, most show", type: "text" }
      ]
    },
    {
      id: "qualitative",
      title: "Qualitative Assessment",
      fields: [
        { id: "coachability", label: "Coachability rating (Green/Yellow/Red) + evidence", placeholder: "e.g., Yellow — implements feedback after initial pushback. Last 3 coaching sessions: 2 of 3 changes stuck.", type: "textarea" },
        { id: "accountability", label: "Accountability rating (Green/Yellow/Red) + evidence", placeholder: "e.g., Green — owns their results, doesn't make excuses. When they missed Week 3 target, they diagnosed it themselves.", type: "textarea" },
        { id: "playbook", label: "Playbook adherence rating (Green/Yellow/Red) + evidence", placeholder: "e.g., Yellow — follows email sequences but personalizes CTAs in ways that reduce conversion. Coaching ongoing.", type: "textarea" },
        { id: "trend", label: "Overall trend (improving, flat, or declining?)", placeholder: "e.g., Improving — all three metrics show month-over-month improvement even if below full quota.", type: "text" }
      ]
    },
    {
      id: "decision",
      title: "Decision",
      fields: [
        { id: "recommendation", label: "Keep, PIP (30-day Performance Improvement Plan), or Separate?", placeholder: "e.g., PIP — metrics below threshold but improving trend. 30-day PIP with specific targets.", type: "text" },
        { id: "rationale", label: "Rationale for your decision", placeholder: "e.g., Decided on PIP rather than separation because: (1) improving trend, (2) coachability is present, (3) no integrity issues. PIP gives us 30 more days of data.", type: "textarea" },
        { id: "next-steps", label: "Next steps and timeline", placeholder: "e.g., Share written PIP by this Friday. 30-day check-in on [date]. If 7+ meetings in Month 4, we continue. If below 5, we separate.", type: "textarea" }
      ]
    }
  ]}
/>

## The 30-Day Performance Improvement Plan

A PIP is not a formality before firing — it's a genuine attempt to give a struggling hire a clear path to success. Done right, it results in improvement 20–30% of the time.

A PIP that works has four elements: specific targets, increased check-in frequency, written documentation, and clear consequences.

<ProgressiveReveal title="How to Write an Effective PIP" persistKey="scale-L9-pip">

<RevealSection title="Element 1: Specific, Measurable Targets">
"Improve performance" is not a PIP target. "Book 8 qualified meetings in the next 30 days, with a reply rate above 5%, and all prospects matching ICP criteria (company size 50–500, VP or above)" is a PIP target.

Every target in a PIP should pass the SMART test: Specific, Measurable, Achievable, Relevant, Time-bound. Vague targets protect no one — they allow both sides to reinterpret what happened.
</RevealSection>

<RevealSection title="Element 2: Daily Check-Ins for the PIP Period">
During the PIP, check-in cadence increases from weekly to bi-weekly (twice per week, 15 minutes each). Not micromanagement — it's support. "You're on a PIP because results have been low. I'm investing more time in your success, not less."

The bi-weekly check-in asks: (1) What did you do since we last talked? (2) What's working? (3) What's the plan for the next 3 days?
</RevealSection>

<RevealSection title="Element 3: Written Agreement">
The PIP must be in writing, signed by both parties. Not because you're building a legal case — because a written document removes ambiguity. Both parties can see exactly what was agreed to, when, and what the consequences are.

Include: the specific targets, the check-in schedule, the timeline, and the consequence if targets are not met (continuation with new quarterly targets, OR separation).
</RevealSection>

<RevealSection title="Element 4: Clear Consequences">
"If we don't hit these targets, we'll need to part ways" — said out loud, in the meeting, before the PIP starts. Not as a threat. As professional clarity.

The hire needs to understand: this is a decision point, not a formality. If they hit the targets, employment continues. If they don't, you separate. Both outcomes are fair. The ambiguity that kills morale is not knowing which outcome you're heading toward.
</RevealSection>

</ProgressiveReveal>

## The Difficult Conversation Script

The most important conversation you'll have with an underperforming hire is the one where you name the problem directly for the first time. Most founders avoid this until it's too late.

<MiniRoleplay
  scenario="It's the end of Month 3. Your SDR has booked 4 of 9 required meetings. Activity levels have been adequate but quality and targeting have been consistently off despite 3 rounds of coaching on the same issues. You need to name the problem clearly and set expectations for the next 30 days."
  role="Founder having the first performance intervention conversation"
  persistKey="scale-L9-roleplay"
  modelResponse="Here's the script: 'I want to be completely direct with you, because I think you deserve that. We're at the end of Month 3 and you're at 44% of quota. We've worked on [specific skill] in 3 of our 1:1s and I haven't seen a change in the results yet. I want to understand your perspective first: how do you see the last month? [Listen.] Here's what I'm seeing: [specific metrics + specific behavioral pattern]. I've given this feedback before, and I'm not seeing it change. That tells me we either have a coaching problem — I'm not explaining it well enough — or a fit problem, where this specific skill set isn't matching what this role needs. I don't know which yet. What I do know is that we need a different 30-day plan. Here's what that looks like: [specific PIP targets]. If we hit these by [date], we continue. If we don't, we'll need to move on. I know that's not easy to hear. I'd rather be honest now than pretend things are fine and make a harder decision in another 60 days. Do you have questions about what I'm asking for?'"
/>

## When to Skip the PIP and Separate Immediately

Some situations don't warrant a PIP. These are the conditions where you should move directly to separation:

<SwipeDecision
  title="PIP or Immediate Separation?"
  description="Swipe right for PIP (give 30 more days), swipe left for immediate separation"
  optionA="Separate Now"
  optionB="30-Day PIP"
  persistKey="scale-L9-swipe"
  cards={[
    {
      id: "1",
      content: "Month 3 SDR: 55% of quota, improving trend month over month, coachable, one skill still developing",
      correctOption: "b",
      explanation: "Improving trend + coachability = PIP candidate. Give 30 days with specific targets."
    },
    {
      id: "2",
      content: "Month 2 SDR: Logged 3 meetings as 'completed' in CRM that never happened. Admitted it when confronted.",
      correctOption: "a",
      explanation: "Integrity issue. Non-negotiable. Immediate separation regardless of performance metrics."
    },
    {
      id: "3",
      content: "Month 3 SDR: Same coaching note given 4 times. Each week: 'I hear you' in the 1:1, no change in behavior.",
      correctOption: "a",
      explanation: "Four coaching sessions on the same issue with zero behavioral change = coachability failure. PIP won't help — the pattern will repeat."
    },
    {
      id: "4",
      content: "Month 2 SDR: High activity but low reply rates. Diagnosed the message quality issue themselves in the 1:1.",
      correctOption: "b",
      explanation: "Self-diagnosis is a green flag. This is a coachable skill problem, not a motivation or integrity problem. Targeted coaching will likely work."
    },
    {
      id: "5",
      content: "Month 3 SDR: Refuses to use your email sequences. 'I have a better system.' Has been told 3 times this is not negotiable.",
      correctOption: "a",
      explanation: "Refusal to follow the playbook after explicit instruction is not coachable. You can't scale a person who won't execute the system."
    }
  ]}
/>

## The Separation Process

When separation is the right call, do it quickly, respectfully, and cleanly. The worst separations are the ones that drag on — they're painful for everyone and create lingering resentment.

<InteractiveChecklist
  title="Separation Checklist"
  persistKey="scale-L9-separation"
  items={[
    "Confirm the legal requirements in your state/country (notice period, final paycheck timing)",
    "Calculate all owed compensation: base through last day, any earned variable comp not yet paid, any accrued PTO",
    "Prepare to pay all owed compensation on the last day or within legal requirements",
    "Remove CRM access, email access, and tool access on the day of separation",
    "Export all prospect data, CRM notes, and sequence data before revoking access",
    "Prepare a transition document: active prospects, open sequences, booked meetings that need to be covered",
    "Send a brief, professional note to the rep after the conversation confirming the terms in writing",
    "If appropriate: offer to be a reference for their next role (only if you genuinely would recommend them)"
  ]}
/>

## Learning From the Failed Hire

Every failed hire teaches you something. Extract the lesson before you hire again.

<TemplateBuilder
  title="Post-Hire Retrospective"
  persistKey="scale-L9-retro"
  sections={[
    {
      id: "diagnosis",
      title: "What Went Wrong",
      fields: [
        { id: "root-cause", label: "Root cause of the hire failure (skill, motivation, fit, timing, onboarding?)", placeholder: "e.g., Skill mismatch — we needed a high-volume outbound SDR, but hired someone with a background in inbound and warm leads. Their personalization was excellent but volume was structurally low.", type: "textarea" },
        { id: "early-signs", label: "What early signs did you see that you should have acted on sooner?", placeholder: "e.g., Week 3: they sent 22 emails/day consistently when the target was 50. I attributed it to onboarding. It was the pattern.", type: "textarea" }
      ]
    },
    {
      id: "process",
      title: "What You'd Change",
      fields: [
        { id: "jd-change", label: "What would you change about the job description?", placeholder: "e.g., Be explicit about the volume requirement in the JD — '50+ outreach activities per day' rather than 'high activity'", type: "textarea" },
        { id: "interview-change", label: "What would you change about the interview process?", placeholder: "e.g., Add a volume-focused question in the roleplay: 'Show me how you'd structure a day where you need to send 60 personalized emails'", type: "textarea" },
        { id: "onboarding-change", label: "What would you change about onboarding or management?", placeholder: "e.g., Set activity floor expectations on Day 1 and check them daily in Week 1–2, not weekly", type: "textarea" }
      ]
    },
    {
      id: "next-hire",
      title: "Profile for the Next Hire",
      fields: [
        { id: "must-have", label: "What's the #1 must-have for the next hire that wasn't sufficiently tested?", placeholder: "e.g., Must demonstrate high-volume outbound experience with verifiable metrics from prior role (meetings booked/month or emails sent/day)", type: "textarea" }
      ]
    }
  ]}
/>

## Your Lesson 9 Checklist

<InteractiveChecklist
  title="Lesson 9 Action Items"
  persistKey="scale-L9-actions"
  items={[
    "Review the Red Flags vs. Yellow Flags list — do any apply to your current hire?",
    "If you're at Month 3 with a struggling hire, complete the 90-Day Performance Review template now",
    "Practice the difficult conversation script in the MiniRoleplay",
    "If separation is the right call: complete the Separation Checklist before the conversation",
    "If PIP is the right call: write the PIP document this week, share it by Friday",
    "Complete the Post-Hire Retrospective before hiring again — the lesson is only useful if you capture it"
  ]}
/>

## What's Next

In Lesson 10, you'll compile everything from this course into a complete, reusable Hiring Playbook — the document that makes your next hire better than this one, and the one after that better still. You'll also build the 14-day hiring sprint plan to move from decision to first day in two weeks.
