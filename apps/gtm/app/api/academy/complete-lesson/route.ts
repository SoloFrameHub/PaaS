import { NextRequest } from "next/server";
import { profileService } from "@/lib/services/profileService";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { completeLessonSchema } from "@/lib/validations/academy";
import { logger } from "@/lib/logger";
import { hasDatabase, getDb, schema } from "@/lib/db";
import { streakService } from "@/lib/services/streakService";
import { badgeService } from "@/lib/services/badgeService";
import { getLevel } from "@/lib/data/xp-levels";
import { getCourse } from "@/lib/data/curriculum";
import { AppError } from "@/lib/api/errors";
import type { Celebrations } from "@/types/profile";

export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const { courseId, courseNumber, lessonId, xpEarned, isLastLesson, timezone } =
    await validateBody(request, completeLessonSchema);

  // Validate courseId exists in curriculum to prevent data corruption
  if (courseId && !getCourse(courseId)) {
    throw new AppError(`Unknown course: ${courseId}`, 400, "INVALID_COURSE");
  }

  // Support mock mode logging
  if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
    logger.info("Processing mock progress update", {
      userId,
      courseId,
      courseNumber,
      lessonId,
      isLastLesson,
    });
  }

  // Get XP level before update for level-up detection
  const profileBefore = await profileService.getProfile(userId);
  const xpBefore = profileBefore?.progress?.xpTotal || 0;
  const levelBefore = getLevel(xpBefore);

  // Update progress in profile
  await profileService.updateProgress(userId, {
    currentCourse: courseNumber,
    completedCourse: isLastLesson ? courseNumber : undefined,
    completedLesson: courseId ? { courseId, lessonId } : undefined,
    xpEarned: 25, // Server-enforced XP value — standardized across all lesson types
  });

  // Log analytics event for Metabase time-series tracking
  if (hasDatabase() && courseId) {
    try {
      const db = getDb();
      if (db) {
        await db.insert(schema.lessonEvent).values({
          id: `le_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          userId,
          courseId,
          lessonId,
          eventType: "completed",
          xpEarned: 25,
        });
      }
    } catch (err) {
      logger.error("Failed to log lesson event", {
        err,
        userId,
        courseId,
        lessonId,
      });
    }
  }

  // ── Gamification orchestration ──
  const celebrations: Celebrations = {};

  try {
    // 1. Calculate streak
    const streakResult = await streakService.calculateStreak(userId, timezone);
    if (streakResult.milestone) {
      celebrations.streakMilestone = streakResult.milestone;
    }

    // 2. Check XP level-up (re-read profile to get actual DB value)
    const profileAfter = await profileService.getProfile(userId);
    const xpAfter = profileAfter?.progress?.xpTotal || xpBefore + 25;
    const levelAfter = getLevel(xpAfter);
    if (levelAfter.level > levelBefore.level) {
      celebrations.levelUp = {
        from: levelBefore.level,
        to: levelAfter.level,
        title: levelAfter.title,
      };
    }

    // 3. Check badge triggers
    const newBadges = await badgeService.checkAllTriggers(userId, {
      type: isLastLesson ? "course_completed" : "lesson_completed",
      data: { courseId, lessonId, courseNumber, isLastLesson },
    });
    if (newBadges.length > 0) {
      celebrations.badges = newBadges;
    }

    // 4. Course completion celebration
    if (isLastLesson) {
      celebrations.courseCompleted = courseId;
    }

    // 5. Certification check — runs on every course completion (idempotent)
    if (isLastLesson) {
      try {
        const { certificationService } =
          await import("@/lib/services/certificationService");
        await certificationService.checkAndAward(userId);
      } catch (certErr) {
        logger.error("Certification check failed (non-blocking)", {
          certErr,
          userId,
        });
      }
    }
  } catch (err) {
    logger.error("Gamification orchestration error (non-blocking)", {
      err,
      userId,
    });
  }

  // 5. Existing milestone service (posts to pod forum)
  if (isLastLesson) {
    try {
      const { milestoneService } =
        await import("@/lib/services/milestoneService");
      const { getCourse } = await import("@/lib/data/curriculum");
      const course = courseId ? getCourse(courseId) : null;
      const totalLessons = course?.lessons?.length ?? 0;
      const profileForMilestone = await profileService.getProfile(userId);
      const completedLessons = courseId
        ? (profileForMilestone?.progress?.completedLessons?.[courseId]
            ?.length ?? 0)
        : 0;
      await milestoneService.checkMilestoneTriggers(userId, {
        type: "lesson_completed",
        data: {
          courseId,
          totalLessons,
          completedLessons,
          courseTitle: course?.title ?? courseId,
        },
      });
    } catch {
      // milestoneService may not be available
    }

    // 6. Trigger mini-assessment at milestones (awaited so it completes before serverless shutdown)
    try {
      const profile = await profileService.getProfile(userId);
      const completedCount = profile?.progress?.completedCourses?.length ?? 0;
      const MILESTONES = [3, 6, 9, 12, 15, 18];
      if (MILESTONES.includes(completedCount) && profile?.assessment) {
        const { openaiMiniAssessment } = await import("@/lib/ai/openai-flows");
        const totalLessonsCompleted = Object.values(
          profile.progress.completedLessons || {},
        ).reduce(
          (sum, lessons) => sum + (Array.isArray(lessons) ? lessons.length : 0),
          0,
        );

        const snapshotGeneratedAt = profile.assessment.generatedAt;
        try {
          const result = await openaiMiniAssessment({
            originalAssessment: {
              overallReadiness: profile.assessment.overallReadiness,
              scores: { ...profile.assessment.scores } as Record<
                string,
                number
              >,
              quickWins: profile.assessment.quickWins,
              criticalGaps: profile.assessment.criticalGaps,
              recommendedPath: profile.assessment.recommendedPath,
            },
            completedCourses: profile.progress.completedCourses,
            totalLessonsCompleted,
            founderContext: {
              businessModel: profile.businessModel || undefined,
              stage: profile.stage || undefined,
              industry: profile.questionnaire?.industry,
              founderDescription: profile.questionnaire?.founder_description,
              discPrimary: profile.questionnaire?.disc_profile?.primary,
              learningStyle: profile.questionnaire?.learning_style || undefined,
            },
          });
          // Re-read profile to avoid overwriting newer assessment data
          const freshProfile = await profileService.getProfile(userId);
          if (freshProfile?.assessment?.generatedAt !== snapshotGeneratedAt) {
            logger.info(
              "Mini-assessment skipped save — assessment was updated since trigger",
              { userId },
            );
          } else {
            const updatedAssessment = {
              ...freshProfile.assessment!,
              overallReadiness: result.overallReadiness,
              scores: result.updatedScores,
              quickWins:
                result.newQuickWins.length > 0
                  ? result.newQuickWins.map((qw) => ({
                      ...qw,
                      addressedInCourse: undefined,
                    }))
                  : freshProfile.assessment!.quickWins.filter(
                      (qw) => !result.completedQuickWins.includes(qw.title),
                    ),
              personalizedInsight: result.progressInsight,
              recommendedStartCourse:
                result.recommendedNextCourse ??
                freshProfile.assessment!.recommendedStartCourse,
              generatedAt: new Date().toISOString(),
            };
            await profileService.updateProfile(userId, {
              assessment: updatedAssessment,
            });
            logger.info("Mini-assessment auto-completed", {
              userId,
              completedCount,
              newReadiness: result.overallReadiness,
            });
          }
        } catch (err) {
          logger.error("Mini-assessment auto-trigger failed (non-blocking)", {
            err,
            userId,
          });
        }
      }
    } catch (err) {
      logger.error("Mini-assessment check failed (non-blocking)", {
        err,
        userId,
      });
    }
  }

  const hasCelebrations =
    celebrations.badges ||
    celebrations.streakMilestone ||
    celebrations.levelUp ||
    celebrations.courseCompleted;

  return successResponse({
    success: true,
    ...(hasCelebrations ? { celebrations } : {}),
  });
});
