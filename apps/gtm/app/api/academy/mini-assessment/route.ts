import { NextRequest, NextResponse } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { openaiMiniAssessment } from '@/lib/ai/openai-flows';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { logger } from '@/lib/logger';

/**
 * Mini-assessment endpoint — triggered after course completions to dynamically
 * adjust the learning path based on progress.
 *
 * Triggers at: every 3 completed courses (courses 3, 6, 9, 12, 15, 18)
 */

// Milestones that trigger a re-assessment (every 3 courses)
const MILESTONE_THRESHOLDS = [3, 6, 9, 12, 15, 18];

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const profile = await profileService.getProfile(userId);
    if (!profile || !profile.assessment) {
        return NextResponse.json(
            { error: 'Profile or initial assessment not found' },
            { status: 404 }
        );
    }

    const completedCourses = profile.progress.completedCourses || [];

    // Check if at a milestone
    const atMilestone = MILESTONE_THRESHOLDS.includes(completedCourses.length);
    if (!atMilestone) {
        return successResponse({
            skipped: true,
            message: `Not at a milestone (${completedCourses.length} courses completed). Milestones at: ${MILESTONE_THRESHOLDS.join(', ')}`,
        });
    }

    try {
        // Calculate total lessons completed
        const totalLessonsCompleted = Object.values(profile.progress.completedLessons || {})
            .reduce((sum, lessons) => sum + (Array.isArray(lessons) ? lessons.length : 0), 0);

        const result = await openaiMiniAssessment({
            originalAssessment: {
                overallReadiness: profile.assessment.overallReadiness,
                scores: { ...profile.assessment.scores } as Record<string, number>,
                quickWins: profile.assessment.quickWins,
                criticalGaps: profile.assessment.criticalGaps,
                recommendedPath: profile.assessment.recommendedPath,
            },
            completedCourses,
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

        // Update the assessment with new scores and quick wins
        const updatedAssessment = {
            ...profile.assessment,
            overallReadiness: result.overallReadiness,
            scores: result.updatedScores,
            quickWins: result.newQuickWins.length > 0
                ? result.newQuickWins.map(qw => ({ ...qw, addressedInCourse: undefined }))
                : profile.assessment.quickWins.filter(
                    qw => !result.completedQuickWins.includes(qw.title)
                ),
            personalizedInsight: result.progressInsight,
            recommendedStartCourse: result.recommendedNextCourse ?? profile.assessment.recommendedStartCourse,
            generatedAt: new Date().toISOString(),
        };

        // Persist updated assessment
        await profileService.updateProfile(userId, {
            assessment: updatedAssessment,
        });

        logger.info('Mini-assessment completed', {
            userId,
            completedCourses: completedCourses.length,
            oldReadiness: profile.assessment.overallReadiness,
            newReadiness: result.overallReadiness,
            skipSuggestions: result.skipSuggestions.length,
        });

        return successResponse({
            assessment: result,
            completedQuickWins: result.completedQuickWins,
            skipSuggestions: result.skipSuggestions,
            progressInsight: result.progressInsight,
        });
    } catch (error) {
        logger.error('Mini-assessment failed', {
            error: error instanceof Error ? error.message : String(error),
            userId,
        });
        // Non-fatal — don't block progress
        return successResponse({
            skipped: true,
            message: 'Mini-assessment could not be generated at this time.',
        });
    }
});
