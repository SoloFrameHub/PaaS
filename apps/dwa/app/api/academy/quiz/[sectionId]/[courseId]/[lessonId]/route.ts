import { NextRequest } from 'next/server';
import { loadQuiz, evaluateAnswers } from '@/lib/services/quizService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse, validateBody } from '@/lib/api/response-utils';
import { NotFoundError } from '@/lib/api/errors';
import { profileService } from '@/lib/services/profileService';
import { quizSubmissionSchema } from '@/lib/validations/academy';

/**
 * GET - Load quiz for a lesson
 */
export const GET = withAuth(async (request: NextRequest, { userId }, context) => {
    const { sectionId, courseId, lessonId } = await context.params;
    const quiz = loadQuiz(sectionId, courseId, lessonId);

    if (!quiz) {
        throw new NotFoundError('No quiz for this lesson');
    }

    return successResponse({ quiz });
});

/**
 * POST - Submit quiz answers and get evaluation
 */
export const POST = withAuth(async (request: NextRequest, { userId }, context) => {
    const { sectionId, courseId, lessonId } = await context.params;
    const { answers } = await validateBody(request, quizSubmissionSchema);

    // Get auth context for wellness personalization
    const profile = await profileService.getProfile(userId);

    // Extract wellness context from profile
    const wellnessContext = profile ? {
        primarySymptom: profile.questionnaire?.primarySymptoms?.find(s => s.isPrimary)?.category,
        wellnessGoals: profile.questionnaire?.wellnessGoals?.slice(0, 3),
        areasForGrowth: profile.assessment?.areasForGrowth?.slice(0, 3)
    } : undefined;

    const result = await evaluateAnswers(sectionId, courseId, lessonId, answers, wellnessContext);

    if (!result.success) {
        throw new NotFoundError(result.error || 'Failed to evaluate quiz');
    }

    // Handle progress tracking if quiz is passed
    if (result.results?.passed) {
        await profileService.updateProgress(userId, {
            completedLesson: { courseId, lessonId },
            xpEarned: 100 // Award XP for completing a quiz
        });
    }

    return successResponse({ results: result.results });
});
