/**
 * Quick Win Path — maps readiness score dimensions to high-impact starter lessons.
 *
 * Each dimension maps to exactly 3 lesson references (courseId + lessonId).
 * `getQuickWinPath` selects lessons from the user's lowest-scoring dimensions.
 */

export interface QuickWinLesson {
  courseId: string;
  lessonId: string;
  title: string;
  why: string;
}

/** Map from readiness dimension key → 3 quick-win lessons */
export const QUICK_WIN_MAP: Record<string, QuickWinLesson[]> = {
  icpClarity: [
    {
      courseId: "icp-builder",
      lessonId: "1",
      title: "What Is an Ideal Customer Profile?",
      why: "Define who you're selling to before anything else.",
    },
    {
      courseId: "icp-builder",
      lessonId: "3",
      title: "The 12 ICP Attributes",
      why: "Go beyond demographics to behavioural and psychographic fit.",
    },
    {
      courseId: "icp-builder",
      lessonId: "5",
      title: "Finding Your Golden Segment",
      why: "Narrow to the one beachhead market most likely to convert.",
    },
  ],
  positioningStrength: [
    {
      courseId: "positioning-value",
      lessonId: "1",
      title: "Why Positioning Fails for Technical Founders",
      why: "Diagnose the root cause of your messaging problems.",
    },
    {
      courseId: "positioning-value",
      lessonId: "2",
      title: "The Value Proposition Framework",
      why: "Build a one-sentence value proposition that resonates.",
    },
    {
      courseId: "positioning-value",
      lessonId: "3",
      title: "Messaging for ICP Personas",
      why: "Translate positioning into copy that converts.",
    },
  ],
  contentEngine: [
    {
      courseId: "technical-content",
      lessonId: "1",
      title: "Content Strategy for Technical Founders",
      why: "Build content that attracts your ICP instead of everyone.",
    },
    {
      courseId: "technical-content",
      lessonId: "2",
      title: "The Minimal Content System",
      why: "One format, one cadence — sustainable for a solo founder.",
    },
    {
      courseId: "seo-aeo",
      lessonId: "1",
      title: "SEO + AEO Fundamentals",
      why: "Make your content findable without paid distribution.",
    },
  ],
  channelReadiness: [
    {
      courseId: "choose-path",
      lessonId: "1",
      title: "Choosing Your Acquisition Channel",
      why: "Stop spreading thin — pick the one channel that fits your ICP.",
    },
    {
      courseId: "linkedin-engine",
      lessonId: "1",
      title: "LinkedIn for Founders",
      why: "The highest-ROI outbound channel for B2B solo founders.",
    },
    {
      courseId: "cold-email-mastery",
      lessonId: "1",
      title: "Cold Email That Gets Replies",
      why: "Write emails that earn responses, not spam reports.",
    },
  ],
  salesProcessMaturity: [
    {
      courseId: "sales-psychology",
      lessonId: "5",
      title: "The Reframe That Actually Works",
      why: "Shift from 'selling' to 'diagnosing' — removes resistance.",
    },
    {
      courseId: "disc-personas",
      lessonId: "1",
      title: "DISC Buyer Personalities",
      why: "Match your communication style to how each buyer makes decisions.",
    },
    {
      courseId: "discovery-framework",
      lessonId: "1",
      title: "The Discovery Call Framework",
      why: "Structure conversations so prospects convince themselves.",
    },
  ],
  objectionHandling: [
    {
      courseId: "objection-handling",
      lessonId: "1",
      title: "Why Objections Happen",
      why: "Objections are buying signals — learn to read them correctly.",
    },
    {
      courseId: "objection-handling",
      lessonId: "2",
      title: "The LAER Framework",
      why: "A repeatable four-step process for any objection.",
    },
    {
      courseId: "objection-handling",
      lessonId: "3",
      title: "Price, Timing & Budget Objections",
      why: "The three objections that kill the most deals for solo founders.",
    },
  ],
  aiReadiness: [
    {
      courseId: "ai-acquisition-strategy",
      lessonId: "1",
      title: "AI-Native Sales Strategy",
      why: "Map where AI adds the most leverage in your acquisition funnel.",
    },
    {
      courseId: "ai-lead-research",
      lessonId: "1",
      title: "AI-Powered Lead Research",
      why: "Cut prospect research time from hours to minutes.",
    },
    {
      courseId: "ai-outreach-automation",
      lessonId: "1",
      title: "AI Outreach Automation",
      why: "Scale personalised outreach without losing authenticity.",
    },
  ],
  pipelineTracking: [
    {
      courseId: "pipeline-management",
      lessonId: "1",
      title: "Pipeline Fundamentals",
      why: "A visible pipeline is the difference between guessing and knowing.",
    },
    {
      courseId: "crm-setup",
      lessonId: "1",
      title: "CRM Setup for Solo Founders",
      why: "The minimal CRM setup that takes 30 minutes and actually gets used.",
    },
    {
      courseId: "analytics",
      lessonId: "1",
      title: "Acquisition Metrics That Matter",
      why: "Track only the 3 numbers that predict revenue.",
    },
  ],
};

/**
 * Given the user's assessment scores, return 3 quick-win lessons targeting
 * the lowest-scoring dimensions.
 *
 * @param scores - Record of dimension key → score (0-100)
 * @returns Array of exactly 3 QuickWinLesson objects
 */
export function getQuickWinPath(
  scores: Record<string, number>,
): QuickWinLesson[] {
  const dimensionKeys = Object.keys(QUICK_WIN_MAP);

  // Sort dimensions by score ascending (lowest first)
  const sorted = dimensionKeys
    .filter((k) => k in scores)
    .sort((a, b) => (scores[a] ?? 100) - (scores[b] ?? 100));

  // Pick top-2 weakest dimensions, then take 1 lesson from each + 1 from the third
  const picks: QuickWinLesson[] = [];
  const [dim1, dim2, dim3] = sorted;

  if (dim1) picks.push(QUICK_WIN_MAP[dim1][0]);
  if (dim2) picks.push(QUICK_WIN_MAP[dim2][0]);
  if (dim3) picks.push(QUICK_WIN_MAP[dim3][0]);

  // Fallback: if fewer than 3 dimensions scored, fill from the first available
  while (picks.length < 3) {
    const fallback = QUICK_WIN_MAP["icpClarity"][picks.length];
    if (fallback) picks.push(fallback);
    else break;
  }

  return picks.slice(0, 3);
}

/** All quick-win lesson references in a flat array (for Academy filter). */
export function getAllQuickWinLessons(): QuickWinLesson[] {
  return Object.values(QUICK_WIN_MAP).flatMap((lessons) => lessons);
}
