/**
 * Coaching Nudge Service
 * Rule-based engine that generates proactive coaching nudges.
 * No AI call — just conditional logic against user state.
 */

import { getDb, schema } from "@/lib/db";
import { eq, and, gte } from "drizzle-orm";
import { outreachService } from "./outreachService";
import { pipelineService } from "./pipelineService";
import type { CoachingNudge, NudgeType, DealStage } from "@/types/execute";
import type { FounderProfile } from "@/types/profile";

const DIMENSION_COURSE_MAP: Record<
  string,
  { courseName: string; courseUrl: string }
> = {
  icpClarity: {
    courseName: "ICP Fundamentals",
    courseUrl: "/academy/course-1/lesson-1",
  },
  positioningStrength: {
    courseName: "Positioning",
    courseUrl: "/academy/course-3/lesson-1",
  },
  messagingConsistency: {
    courseName: "Messaging",
    courseUrl: "/academy/course-5/lesson-1",
  },
  channelReadiness: {
    courseName: "Channel Selection",
    courseUrl: "/academy/course-9/lesson-1",
  },
  salesProcessMaturity: {
    courseName: "Sales Process",
    courseUrl: "/academy/course-17/lesson-1",
  },
};

/**
 * Generate up to 3 coaching nudges based on user state.
 * Checks for dismissed nudges in userComponentState.
 */
export async function generateNudges(
  userId: string,
  profile: FounderProfile,
): Promise<CoachingNudge[]> {
  try {
    const candidates: CoachingNudge[] = [];

    const outreachStats = await outreachService.getOutreachStats(userId, 7);
    const pipelineStats = await pipelineService.getPipelineStats(userId);
    const progress = profile.progress;
    const assessment = profile.assessment;
    const artifacts = profile.artifacts;

    // 1. Outreach gap: no outreach in 3+ days with active deals
    const activeDeals =
      pipelineStats.totalDeals -
      pipelineStats.byStage.won.count -
      pipelineStats.byStage.lost.count;
    if (activeDeals > 0 && outreachStats.totalActions === 0) {
      const recentOutreach = await outreachService.getUserOutreachLogs(userId, {
        limit: 1,
      });
      const daysSinceOutreach =
        recentOutreach.length > 0
          ? Math.floor(
              (Date.now() - new Date(recentOutreach[0].loggedAt).getTime()) /
                (1000 * 60 * 60 * 24),
            )
          : 999;

      if (daysSinceOutreach >= 3) {
        candidates.push({
          id: "outreach_gap",
          type: "outreach_gap",
          title: "Your pipeline needs feeding",
          message: `You have ${activeDeals} active deal${activeDeals > 1 ? "s" : ""} but no outreach in ${daysSinceOutreach} days. Even 2-3 touchpoints today keeps momentum.`,
          priority: 5,
          actionUrl: "/dashboard/outreach",
          actionLabel: "Log outreach",
        });
      }
    }

    // 2. Pipeline stale: deal in same stage 7+ days
    const allDeals = await pipelineService.getUserDeals(userId, { limit: 50 });
    const staleDeal = allDeals.find((d) => {
      if (d.stage === "won" || d.stage === "lost") return false;
      const daysInStage = Math.floor(
        (Date.now() - new Date(d.stageChangedAt).getTime()) /
          (1000 * 60 * 60 * 24),
      );
      return daysInStage >= 7;
    });
    if (staleDeal) {
      const days = Math.floor(
        (Date.now() - new Date(staleDeal.stageChangedAt).getTime()) /
          (1000 * 60 * 60 * 24),
      );
      candidates.push({
        id: `pipeline_stale_${staleDeal.id}`,
        type: "pipeline_stale",
        title: `${staleDeal.prospectName} needs attention`,
        message: `This deal has been in "${staleDeal.stage}" for ${days} days. Time for a follow-up or to re-qualify.`,
        priority: 4,
        actionUrl: "/dashboard/pipeline",
        actionLabel: "View pipeline",
      });
    }

    // 3. Assessment weakness: score < 40 with no related lesson recently
    if (assessment?.scores) {
      const weakDimensions = Object.entries(assessment.scores)
        .filter(([, score]) => score < 40)
        .sort(([, a], [, b]) => a - b);

      if (weakDimensions.length > 0) {
        const [dimKey, dimScore] = weakDimensions[0];
        const courseInfo = DIMENSION_COURSE_MAP[dimKey];
        if (courseInfo) {
          candidates.push({
            id: `assessment_weakness_${dimKey}`,
            type: "assessment_weakness",
            title: `Your ${dimKey.replace(/([A-Z])/g, " $1").trim()} needs work`,
            message: `Scoring ${dimScore}% here is holding back your acquisition engine. ${courseInfo.courseName} can help.`,
            priority: 3,
            actionUrl: courseInfo.courseUrl,
            actionLabel: `Start ${courseInfo.courseName}`,
          });
        }
      }
    }

    // 4. Artifact missing: enough courses done but artifact not created
    const completedCourseCount = progress?.completedCourses?.length || 0;
    if (completedCourseCount >= 2 && artifacts) {
      if (!artifacts.icpDocument) {
        candidates.push({
          id: "artifact_missing_icp",
          type: "artifact_missing",
          title: "Build your ICP Document",
          message:
            "You've completed enough coursework to define your Ideal Customer Profile. This artifact drives everything else.",
          priority: 3,
          actionUrl: "/academy/course-1/lesson-1",
          actionLabel: "Build ICP",
        });
      } else if (!artifacts.positioningStatement && completedCourseCount >= 4) {
        candidates.push({
          id: "artifact_missing_positioning",
          type: "artifact_missing",
          title: "Create your Positioning Statement",
          message:
            "Your ICP is defined. Now articulate why prospects should choose you over alternatives.",
          priority: 2,
          actionUrl: "/academy/course-3/lesson-1",
          actionLabel: "Build positioning",
        });
      }
    }

    // 5. Streak risk: active streak but check if today has activity
    if (progress?.currentStreak && progress.currentStreak >= 3) {
      const db = getDb();
      if (db) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEvents = await db
          .select({ id: schema.lessonEvent.id })
          .from(schema.lessonEvent)
          .where(
            and(
              eq(schema.lessonEvent.userId, userId),
              gte(schema.lessonEvent.createdAt, today),
            ),
          )
          .limit(1);

        if (todayEvents.length === 0) {
          candidates.push({
            id: "streak_risk",
            type: "streak_risk",
            title: `Protect your ${progress.currentStreak}-day streak`,
            message:
              "No activity logged today yet. Complete one lesson to keep your streak alive.",
            priority: 2,
            actionUrl: "/academy",
            actionLabel: "Continue learning",
          });
        }
      }
    }

    // 6. Milestone approaching: close to next level
    if (progress?.xpTotal) {
      const levels = [200, 400, 800, 1500, 2500, 4000, 5500, 7000, 8000];
      const nextLevel = levels.find((l) => l > progress.xpTotal);
      if (nextLevel) {
        const remaining = nextLevel - progress.xpTotal;
        if (remaining <= 50) {
          candidates.push({
            id: "milestone_approaching_xp",
            type: "milestone_approaching",
            title: `${remaining} XP to next level`,
            message: `You're almost there. One more lesson could push you over.`,
            priority: 1,
            actionUrl: "/academy",
            actionLabel: "Keep going",
          });
        }
      }
    }

    // Filter dismissed nudges
    const dismissed = await getDismissedNudgeIds(userId);
    const filtered = candidates.filter((n) => !dismissed.has(n.id));

    // Sort by priority desc, return top 3
    return filtered.sort((a, b) => b.priority - a.priority).slice(0, 3);
  } catch (error) {
    console.error("[generateNudges] failed:", error);
    throw error;
  }
}

async function getDismissedNudgeIds(userId: string): Promise<Set<string>> {
  try {
    const db = getDb();
    if (!db) return new Set();

    const rows = await db
      .select({ persistKey: schema.userComponentState.persistKey })
      .from(schema.userComponentState)
      .where(
        and(
          eq(schema.userComponentState.userId, userId),
          eq(schema.userComponentState.componentType, "coaching_nudge"),
        ),
      );

    return new Set(rows.map((r) => r.persistKey));
  } catch (error) {
    console.error("[getDismissedNudgeIds] failed:", error);
    throw error;
  }
}
