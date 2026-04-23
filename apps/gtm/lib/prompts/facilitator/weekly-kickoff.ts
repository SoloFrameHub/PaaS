/**
 * Monday weekly kickoff prompt for the AI Facilitator.
 */

export interface WeeklyKickoffContext {
  podName: string;
  weekNumber: number;
  curriculumStage: string;
  memberContexts: Record<
    string,
    {
      name: string;
      curriculumProgress: string;
      recentActivity: string;
      engagementLevel: string;
    }
  >;
  lastWeekHighlights: string[];
}

const STAGE_THEMES: Record<string, string[]> = {
  foundation: [
    "defining your ideal customer profile with razor precision",
    "understanding the psychology behind why people buy",
    "crafting a positioning statement that stops prospects mid-scroll",
    "identifying your unique differentiators vs competitors",
    "mapping your customer's decision-making journey",
  ],
  lead_gen: [
    "writing cold emails that actually get replies",
    "building a LinkedIn presence that attracts inbound",
    "creating a prospecting system that runs on autopilot",
    "qualifying leads before you waste time on calls",
    "testing subject lines and CTAs with real data",
  ],
  sales_conv: [
    "running discovery calls that uncover real pain",
    'handling the "we don\'t have budget" objection',
    "moving from demo to close without being pushy",
    "building urgency without artificial deadlines",
    "asking for the close when the moment is right",
  ],
};

export function buildWeeklyKickoffPrompt(
  context: WeeklyKickoffContext,
): string {
  const themes =
    STAGE_THEMES[context.curriculumStage] || STAGE_THEMES.foundation;
  const weekTheme = themes[(context.weekNumber - 1) % themes.length];

  const memberSummaries = Object.entries(context.memberContexts)
    .map(
      ([id, m]) =>
        `- ${m.name}: ${m.curriculumProgress}. Recent: ${m.recentActivity}. Engagement: ${m.engagementLevel}.`,
    )
    .join("\n");

  const highlights =
    context.lastWeekHighlights.length > 0
      ? `Last week's highlights:\n${context.lastWeekHighlights.map((h) => `- ${h}`).join("\n")}`
      : "This is the pod's first week together.";

  return `You are the AI Facilitator for the "${context.podName}" peer learning pod in the SoloFrameHub Solo GTM OS.

YOUR ROLE: Kick off Week ${context.weekNumber} with a warm, personalized post that sets the week's focus and gets members talking.

POD CONTEXT:
- Curriculum stage: ${context.curriculumStage}
- Week: ${context.weekNumber}
- This week's theme: ${weekTheme}

MEMBER STATUS:
${memberSummaries}

${highlights}

INSTRUCTIONS:
1. Welcome the pod to Week ${context.weekNumber}
2. Reference at least 2 specific members by name and something they did or are working on
3. Set the weekly focus: "${weekTheme}"
4. Ask 1-2 specific discussion questions tied to the theme
5. If any member has low engagement, gently invite them in without calling them out negatively

CONSTRAINTS:
- 150-250 words
- Write as a warm but focused forum post (no markdown headers, no bullet-point-only posts)
- Use member names naturally in sentences
- Sound like a knowledgeable peer, not a corporate facilitator
- No emojis except 1-2 maximum if it feels natural
- End with a clear call to action`;
}
