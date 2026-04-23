import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { completeLessonSchema } from '@/lib/validations/academy';
import { logger } from '@/lib/logger';
import type { WellnessProfile } from '@/types/wellness-profile';

/**
 * Badge definitions with award criteria.
 * Each badge is awarded at most once (checked by profileCoreService).
 */
function computeNewBadge(profile: WellnessProfile, courseId: string, isLastLesson: boolean): string | undefined {
    const progress = profile.progress;
    const badges = progress?.badges ?? [];
    const completedLessons = progress?.completedLessons ?? {};

    // Count total lessons completed across all courses (before this one is added)
    const totalLessons = Object.values(completedLessons).reduce(
        (sum, lessons) => sum + (lessons?.length ?? 0), 0
    );
    // This lesson will be totalLessons + 1
    const newTotal = totalLessons + 1;

    const completedCourses = progress?.completedCourses ?? [];

    // First lesson ever completed
    if (newTotal === 1 && !badges.includes('first-lesson')) {
        return 'first-lesson';
    }

    // Completed a full course
    if (isLastLesson && !badges.includes(`course-complete-${courseId}`)) {
        return `course-complete-${courseId}`;
    }

    // 5 lessons milestone
    if (newTotal >= 5 && !badges.includes('five-lessons')) {
        return 'five-lessons';
    }

    // 10 lessons milestone
    if (newTotal >= 10 && !badges.includes('ten-lessons')) {
        return 'ten-lessons';
    }

    // 25 lessons milestone
    if (newTotal >= 25 && !badges.includes('twenty-five-lessons')) {
        return 'twenty-five-lessons';
    }

    // 50 lessons milestone
    if (newTotal >= 50 && !badges.includes('fifty-lessons')) {
        return 'fifty-lessons';
    }

    // Completed 3 courses
    const newCourseCount = completedCourses.length + (isLastLesson ? 1 : 0);
    if (newCourseCount >= 3 && !badges.includes('three-courses')) {
        return 'three-courses';
    }

    return undefined;
}

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const { courseId, lessonId, isLastLesson } = await validateBody(request, completeLessonSchema);

    try {
        // Fetch current profile to compute badge eligibility
        const profile = await profileService.getProfile(userId);
        const badge = profile ? computeNewBadge(profile, courseId, !!isLastLesson) : undefined;

        await profileService.updateProgress(userId, {
            currentCourse: courseId,
            completedCourse: isLastLesson ? courseId : undefined,
            completedLesson: courseId ? { courseId, lessonId } : undefined,
            xpEarned: 10,
            badge,
        });
    } catch (err: any) {
        // Progress tracking must never block navigation — log and continue
        logger.error('complete-lesson: updateProgress failed', {
            userId, courseId, lessonId,
            error: err?.message,
            code: err?.code,
            stack: err?.stack,
        });
    }

    return successResponse({ success: true });
});
