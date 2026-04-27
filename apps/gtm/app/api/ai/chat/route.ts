import { NextRequest, NextResponse } from "next/server";
import { profileService } from "@/lib/services/profileService";
import { openaiCoachingReply } from "@/lib/ai/openai-coaching";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { chatSchema } from "@/lib/validations/ai";
import { logger } from "@/lib/logger";
import { isRateLimited, AI_RATE_LIMIT } from "@/lib/security";
import { schema } from "@/lib/db";
import { requireTenantContext } from "@platform/tenancy";
import { withTenantApp } from "@/lib/db/with-tenant";
import { sql } from "drizzle-orm";
import { getCourse, getCourseByNumber, getLesson } from "@/lib/data/curriculum";
import type { FounderProfile } from "@/types/profile";
import { outreachService } from "@/lib/services/outreachService";
import { pipelineService } from "@/lib/services/pipelineService";
import { buildRagContext } from "@/lib/services/ragService";

/** Map DISC primary type to coaching tone instructions */
function getDiscCoachingTone(discPrimary?: string): string {
  switch (discPrimary) {
    case "D":
      return `Founder's DISC type is D (Dominant). Be direct, results-focused, and action-oriented. Skip small talk. Lead with outcomes and bottom-line impact. Challenge them with bold goals.`;
    case "I":
      return `Founder's DISC type is I (Influencer). Be enthusiastic and vision-focused. Use storytelling and big-picture framing. Keep energy high. Celebrate wins before diving into improvements.`;
    case "S":
      return `Founder's DISC type is S (Steady). Be supportive and process-oriented. Provide step-by-step guidance. Acknowledge their effort before suggesting changes. Don't rush them.`;
    case "C":
      return `Founder's DISC type is C (Conscientious). Be analytical and detail-rich. Provide data, frameworks, and logical reasoning. Respect their need for thoroughness. Back claims with evidence.`;
    default:
      return "";
  }
}

function buildContextString(
  profile: FounderProfile | null,
  context?: { courseId?: string; lessonId?: string; sectionId?: string },
  lessonContext?: {
    courseTitle: string;
    lessonTitle: string;
    courseDescription: string;
    outcomes: string[];
  } | null,
) {
  const safeProfile = profile
    ? profileService.getSafeContext(profile, { coaching: true })
    : null;

  // Build profile section
  const profileText = safeProfile
    ? `Founder Profile Context: ${JSON.stringify(safeProfile)}`
    : "Founder Profile context not available.";

  // Build RAG signals section
  const ragText = safeProfile?.inferred?.ragSignals
    ? `\nStrategic RAG Signals (from founder's uploaded documents): ${JSON.stringify(safeProfile.inferred.ragSignals)}`
    : "";

  // Build artifact section with explicit presence/absence for framework guidance
  let artifactText = "";
  if (safeProfile?.artifacts) {
    const artParts = [
      `\nFOUNDER ARTIFACTS (reference their actual content in advice):`,
    ];
    const a = safeProfile.artifacts;
    artParts.push(
      a.icpDocument
        ? `  - ICP Document: ${a.icpDocument}`
        : `  - ICP Document: NOT YET CREATED — suggest building via Course 1`,
    );
    artParts.push(
      a.positioningStatement
        ? `  - Positioning Statement: ${a.positioningStatement}`
        : `  - Positioning Statement: NOT YET CREATED — suggest building via Course 2`,
    );
    artParts.push(
      a.valueProposition
        ? `  - Value Proposition Canvas: ${a.valueProposition}`
        : `  - Value Proposition Canvas: NOT YET CREATED — suggest building via Course 2`,
    );
    artParts.push(
      a.acquisitionPath
        ? `  - Acquisition Path: ${a.acquisitionPath}`
        : `  - Acquisition Path: NOT YET CREATED — suggest building via Course 3`,
    );
    artParts.push(
      a.discoveryPlaybook
        ? `  - Discovery Playbook: ${a.discoveryPlaybook}`
        : `  - Discovery Playbook: NOT YET CREATED — suggest building via Course 14`,
    );
    artifactText = artParts.join("\n");
  } else {
    artifactText = `\nFOUNDER ARTIFACTS: None created yet. Suggest building artifacts as concrete next steps — start with ICP Document (Course 1).`;
  }

  // Build DISC coaching tone
  const discTone = getDiscCoachingTone(
    safeProfile?.questionnaire?.disc_profile?.primary,
  );
  const discText = discTone ? `\nCOACHING TONE: ${discTone}` : "";

  // Build learning style instruction
  const learningStyle = safeProfile?.questionnaire?.learning_style;
  const learningText = learningStyle
    ? `\nLEARNING STYLE: Founder prefers "${learningStyle}" mode. ${
        learningStyle === "aggressive"
          ? "Give frameworks and let them figure it out. Be concise."
          : learningStyle === "assistive"
            ? "Provide detailed step-by-step guidance. Be thorough."
            : "Adapt based on topic complexity. Use frameworks for simple topics, step-by-step for complex ones."
      }`
    : "";

  // Build assessment section (scores, gaps, quick wins, framework mapping)
  let assessmentText = "";
  if (safeProfile?.assessment) {
    const a = safeProfile.assessment;
    const parts = [
      `\nASSESSMENT BASELINE:`,
      `- Overall Readiness: ${a.overallReadiness}/100`,
      `- Scores: ${Object.entries(a.scores)
        .map(([k, v]) => `${k}: ${v}/100`)
        .join(", ")}`,
    ];
    if (a.scoreReasoning)
      parts.push(`- Score Reasoning: ${JSON.stringify(a.scoreReasoning)}`);
    if (a.quickWins?.length)
      parts.push(
        `- Quick Wins: ${a.quickWins.map((w) => `${w.title} (${w.impact} impact)`).join("; ")}`,
      );
    if (a.criticalGaps?.length)
      parts.push(
        `- Critical Gaps: ${a.criticalGaps.map((g) => `${g.title} (${g.impact} impact)`).join("; ")}`,
      );
    if (a.recommendedPath)
      parts.push(`- Recommended Path: ${a.recommendedPath}`);

    // Framework-to-dimension mapping for proactive coaching
    const scores = a.scores as Record<string, number>;
    const weakDimensions: string[] = [];
    if ((scores.icpClarity ?? 0) < 40)
      weakDimensions.push(
        `ICP Clarity is ${scores.icpClarity}/100 — prioritize ICP Framework, guide toward ICP Document artifact (Course 1)`,
      );
    if ((scores.positioningStrength ?? 0) < 40)
      weakDimensions.push(
        `Positioning is ${scores.positioningStrength}/100 — prioritize Prescription Frame, guide toward Positioning Statement artifact (Course 2)`,
      );
    if ((scores.messagingConsistency ?? 0) < 40)
      weakDimensions.push(
        `Messaging is ${scores.messagingConsistency}/100 — flag contradictions between website/LinkedIn/artifacts, use Outreach Tactics framework`,
      );
    if ((scores.channelReadiness ?? 0) < 40)
      weakDimensions.push(
        `Channel Readiness is ${scores.channelReadiness}/100 — prioritize Playbook Selection + Zero-to-Ten Sprint, guide toward Acquisition Path artifact (Course 3)`,
      );
    if ((scores.salesProcessMaturity ?? 0) < 40)
      weakDimensions.push(
        `Sales Process is ${scores.salesProcessMaturity}/100 — prioritize MVQ + Diagnostic Discovery frameworks, suggest roleplay practice, guide toward Discovery Playbook artifact (Course 14)`,
      );
    if (weakDimensions.length > 0) {
      parts.push(
        `\nWEAK DIMENSIONS (proactively address with named frameworks when topic arises):`,
      );
      weakDimensions.forEach((d) => parts.push(`  - ${d}`));
    }

    parts.push(
      `Reference these scores and gaps in your coaching. If the founder asks about a topic related to a critical gap, prioritize it. Celebrate progress on quick wins.`,
    );
    assessmentText = parts.join("\n");
  }

  // Build progress section
  let progressText = "";
  if (safeProfile?.progress) {
    const p = safeProfile.progress;
    progressText = `\nPROGRESS: ${p.completedCourses.length} courses completed, ${p.totalLessonsCompleted} lessons | Current course: ${p.currentCourse ?? "none"} | XP: ${p.xpTotal} | Streak: ${p.currentStreak} days
Acknowledge what they've learned and build on completed coursework.`;
  }

  // Build lesson context section
  let lessonText = "";
  if (lessonContext) {
    lessonText = `\nCURRENT LESSON CONTEXT:
- Course: ${lessonContext.courseTitle}
- Lesson: ${lessonContext.lessonTitle}
- Course Description: ${lessonContext.courseDescription}
- Course Outcomes: ${lessonContext.outcomes.join("; ")}
When the founder asks questions, connect your advice to the concepts in this lesson. Reference specific lesson topics when relevant.`;
  } else if (context) {
    lessonText = `\nCurrent Context: Course ${context.courseId ?? "—"}, Lesson ${context.lessonId ?? "—"}, Section: ${context.sectionId ?? "—"}`;
  }

  return `${profileText}${ragText}${artifactText}${discText}${learningText}${assessmentText}${progressText}${lessonText}`;
}

async function buildExecuteContext(userId: string): Promise<string> {
  try {
    const [outreachStats, pipelineStats] = await Promise.all([
      outreachService.getOutreachStats(userId, 7),
      pipelineService.getPipelineStats(userId),
    ]);

    const parts: string[] = [];

    if (outreachStats.totalActions > 0) {
      const channels = Object.entries(outreachStats.byChannel)
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `${v} ${k}`)
        .join(", ");
      parts.push(
        `\nOUTREACH ACTIVITY (last 7 days): ${outreachStats.totalActions} total actions (${channels}). Response rate: ${outreachStats.byOutcome.positive}/${outreachStats.totalActions} positive.`,
      );
    } else {
      parts.push(
        `\nOUTREACH ACTIVITY: No outreach logged in the last 7 days. If they have prospects, nudge them to start outreach.`,
      );
    }

    const activeDeals =
      pipelineStats.totalDeals -
      pipelineStats.byStage.won.count -
      pipelineStats.byStage.lost.count;
    if (pipelineStats.totalDeals > 0) {
      parts.push(
        `PIPELINE STATE: ${pipelineStats.totalDeals} total deals (${activeDeals} active). By stage: ${Object.entries(
          pipelineStats.byStage,
        )
          .filter(([, v]) => v.count > 0)
          .map(([k, v]) => `${k}: ${v.count}`)
          .join(
            ", ",
          )}. Win rate: ${(pipelineStats.conversionRate * 100).toFixed(0)}%.${pipelineStats.totalValue > 0 ? ` Total value: $${(pipelineStats.totalValue / 100).toLocaleString()}.` : ""}`,
      );
    }

    return parts.join("\n");
  } catch {
    return "";
  }
}

function genId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const { limited } = await isRateLimited(userId, AI_RATE_LIMIT, "ai:chat");
  if (limited) {
    return NextResponse.json(
      { error: "You are sending messages too quickly. Please wait a moment." },
      { status: 429 },
    );
  }

  const {
    message,
    history = [],
    context,
    sessionId: incomingSessionId,
  } = await validateBody(request, chatSchema);
  const ctx = await requireTenantContext(request, { userId });
  const profile = await profileService.getProfile(userId);

  const validHistory = history.filter(
    (m) => m.role === "user" || m.role === "assistant",
  ) as { role: "user" | "assistant"; content: string }[];

  try {
    // Fetch lesson content if courseId is provided
    let lessonContext: {
      courseTitle: string;
      lessonTitle: string;
      courseDescription: string;
      outcomes: string[];
    } | null = null;
    if (context?.courseId != null) {
      const courseIdStr = String(context.courseId);
      // Try slug lookup first, then numeric lookup (AILessonCoach sends course number)
      const course =
        getCourse(courseIdStr) ??
        (/^\d+$/.test(courseIdStr)
          ? getCourseByNumber(parseInt(courseIdStr, 10))
          : null);
      if (course) {
        lessonContext = {
          courseTitle: course.title,
          courseDescription: course.description,
          outcomes: course.outcomes,
          lessonTitle: "",
        };
        if (context.lessonId) {
          const lesson = getLesson(course.id, context.lessonId);
          if (lesson) {
            lessonContext.lessonTitle = lesson.title;
          }
        }
      }
    }

    // Fallback: use last-visited lesson from coaching chat context
    if (!lessonContext && context?.lastVisitedCourseId) {
      const course = getCourse(context.lastVisitedCourseId);
      if (course) {
        lessonContext = {
          courseTitle: course.title,
          courseDescription: course.description,
          outcomes: course.outcomes,
          lessonTitle: "",
        };
        if (context.lastVisitedLessonId) {
          const lesson = getLesson(course.id, context.lastVisitedLessonId);
          if (lesson) {
            lessonContext.lessonTitle = lesson.title;
          }
        }
      }
    }

    const [baseContext, executeContext, ragContext] = await Promise.all([
      Promise.resolve(
        buildContextString(profile ?? null, context, lessonContext),
      ),
      buildExecuteContext(userId),
      buildRagContext(userId, message, { maxChunks: 3, maxChars: 2000 }).catch(
        () => "",
      ),
    ]);
    const ragSection = ragContext
      ? `\nRELEVANT DOCUMENT EXCERPTS (from founder's uploads):\n${ragContext}`
      : "";
    const contextString = baseContext + executeContext + ragSection;
    const response = await openaiCoachingReply({
      message,
      history: validHistory,
      contextString,
    });

    // Persist chat session + messages for Metabase analytics. The LLM call
    // above (`openaiCoachingReply`) ran outside any DB tx — we only open the
    // tenant tx for the local DB writes, so the connection isn't held open
    // across external HTTP I/O.
    let sessionId = incomingSessionId;
    try {
      await withTenantApp(ctx, async (tx) => {
        // Create session if none exists
        if (!sessionId) {
          sessionId = genId("cs");
          await tx.insert(schema.chatSession).values({
            id: sessionId,
            userId,
            contextCourseId: context?.courseId ?? null,
            contextLessonId: context?.lessonId ?? null,
            contextSectionId: context?.sectionId ?? null,
            messageCount: 0,
          });
        }

        // Insert user message + assistant response
        await tx.insert(schema.chatMessage).values([
          { id: genId("cm"), sessionId, role: "user", content: message },
          {
            id: genId("cm"),
            sessionId,
            role: "assistant",
            content: response,
          },
        ]);

        // Increment message count
        await tx
          .update(schema.chatSession)
          .set({ messageCount: sql`${schema.chatSession.messageCount} + 2` })
          .where(sql`${schema.chatSession.id} = ${sessionId}`);
      });
    } catch (err) {
      logger.error("Failed to persist chat messages", { err, userId });
    }

    return successResponse({ message: response, sessionId });
  } catch (error) {
    logger.error("Solo Advisor AI Error", {
      error: error instanceof Error ? error.message : String(error),
      userId,
      hasOpenAiKey: !!process.env.OPENAI_API_KEY,
    });
    return NextResponse.json(
      {
        error: {
          message:
            "AI service temporarily unavailable. Please try again in a moment.",
          code: "AI_UNAVAILABLE",
        },
      },
      { status: 503 },
    );
  }
});
