/**
 * Digest Service
 * Collects all data needed for the daily digest email.
 */

import { getDb, schema } from "@/lib/db";
import { eq, and, gte, desc } from "drizzle-orm";
import { outreachService } from "./outreachService";
import { pipelineService } from "./pipelineService";
import type { DigestContext } from "@/types/execute";
import type { FounderProfile } from "@/types/profile";

/**
 * Build digest context for a user. Returns null if zero meaningful activity in 48h
 * (meaning no lessons, no outreach, no deal changes — skip sending).
 */
export async function generateDigestContext(
  userId: string,
  profile: FounderProfile,
): Promise<DigestContext | null> {
  try {
    const db = getDb();
    if (!db) return null;

    const since24h = new Date();
    since24h.setHours(since24h.getHours() - 24);

    // Recent lessons (24h)
    const lessonRows = await db
      .select({
        courseId: schema.lessonEvent.courseId,
        lessonId: schema.lessonEvent.lessonId,
        xpEarned: schema.lessonEvent.xpEarned,
      })
      .from(schema.lessonEvent)
      .where(
        and(
          eq(schema.lessonEvent.userId, userId),
          gte(schema.lessonEvent.createdAt, since24h),
        ),
      )
      .orderBy(desc(schema.lessonEvent.createdAt));

    const recentLessons = lessonRows.map((r) => ({
      courseId: r.courseId,
      lessonId: r.lessonId,
      xpEarned: r.xpEarned || 0,
    }));

    // Outreach stats (last 24h for digest, 7d for context)
    const outreachStats = await outreachService.getOutreachStats(userId, 1);
    const pipelineStats = await pipelineService.getPipelineStats(userId);

    // If zero activity across all dimensions, skip
    const hasActivity =
      recentLessons.length > 0 || outreachStats.totalActions > 0;
    // Still send if they have active pipeline deals (remind them to act)
    const hasActivePipeline =
      pipelineStats.totalDeals >
      pipelineStats.byStage.won.count + pipelineStats.byStage.lost.count;
    if (!hasActivity && !hasActivePipeline) return null;

    const assessment = profile.assessment;
    const progress = profile.progress;
    const questionnaire = profile.questionnaire;

    return {
      userId,
      userName: profile.name || "Founder",
      email: "", // filled by the cron endpoint
      recentLessons,
      outreachStats,
      pipelineStats,
      streak: {
        current: progress?.currentStreak || 0,
        longest: progress?.longestStreak || 0,
      },
      assessmentScores: assessment?.scores
        ? {
            overallReadiness: assessment.overallReadiness,
            ...assessment.scores,
          }
        : null,
      discPrimary: questionnaire?.disc_profile?.primary || null,
    };
  } catch (error) {
    console.error("[generateDigestContext] failed:", error);
    throw error;
  }
}
