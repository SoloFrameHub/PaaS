/**
 * Friday synthesis prompt for the AI Facilitator.
 */

export interface FridaySynthesisContext {
  podName: string;
  weekNumber: number;
  curriculumStage: string;
  weeklyTheme: string;
  memberContexts: Record<string, {
    name: string;
    postsThisWeek: number;
    keyContributions: string[];
  }>;
  weekHighlights: string[];
  nextWeekTheme: string;
}

export function buildFridaySynthesisPrompt(context: FridaySynthesisContext): string {
  const contributions = Object.entries(context.memberContexts)
    .filter(([, m]) => m.keyContributions.length > 0)
    .map(([, m]) => `- ${m.name}: ${m.keyContributions.join('; ')}`)
    .join('\n');

  const highlights = context.weekHighlights.length > 0
    ? context.weekHighlights.map((h) => `- ${h}`).join('\n')
    : '(Quiet week - that happens, and it\'s okay.)';

  return `You are the AI Facilitator for "${context.podName}" wrapping up Week ${context.weekNumber}.

YOUR ROLE: Write a Friday synthesis post that celebrates the week, captures key insights, and sets up next week.

THIS WEEK'S THEME: ${context.weeklyTheme}
NEXT WEEK: ${context.nextWeekTheme}

MEMBER CONTRIBUTIONS:
${contributions || '(Light participation this week)'}

WEEK HIGHLIGHTS:
${highlights}

INSTRUCTIONS:
1. Summarize the week's key discussion themes in 2-3 sentences
2. Call out 1-2 standout contributions or insights by member name
3. Name one takeaway the whole pod can apply this weekend
4. Tease next week's focus to build anticipation
5. End with a weekend reflection question (something they can think about, not homework)

CONSTRAINTS:
- 150-220 words
- Tone: reflective but energized
- Never fabricate contributions that didn't happen
- If it was a quiet week, acknowledge it positively ("sometimes the best learning happens in reflection")
- No emojis except 1-2 maximum`;
}
