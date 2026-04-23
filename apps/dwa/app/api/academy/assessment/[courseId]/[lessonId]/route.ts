import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { NotFoundError, ValidationError } from '@/lib/api/errors';
import { profileService } from '@/lib/services/profileService';
import { profileRepository } from '@/lib/repositories/profileRepository';
import { invalidateCache } from '@/lib/redis';
import { getAssessmentForLesson, scoreAssessment } from '@/lib/assessments';
import type { AssessmentConfigClient, AssessmentResult, AssessmentLoadResponse, AssessmentSubmitResponse } from '@/types/assessment';

/**
 * GET - Load assessment config for a lesson + user's previous results
 */
export const GET = withAuth(async (_request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;
    const fullConfig = getAssessmentForLesson(courseId, lessonId);

    if (!fullConfig) {
        throw new NotFoundError('No assessment for this lesson');
    }

    // Strip scoring bands from client response to prevent gaming
    const config: AssessmentConfigClient = {
        id: fullConfig.id,
        title: fullConfig.title,
        description: fullConfig.description,
        instructions: fullConfig.instructions,
        timeframe: fullConfig.timeframe,
        questions: fullConfig.questions,
        scale: fullConfig.scale,
        disclaimer: fullConfig.disclaimer,
        crisisItemIds: fullConfig.crisisItemIds,
        questionCount: fullConfig.questions.length,
        maxScore: fullConfig.scoring.maxScore,
    };

    // Get user's previous results for this assessment
    const profile = await profileService.getProfile(userId);
    const previousResults = (profile?.assessment?.assessmentHistory ?? [])
        .filter((r: AssessmentResult) => r.assessmentId === fullConfig.id)
        .sort((a: AssessmentResult, b: AssessmentResult) =>
            new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );

    const response: AssessmentLoadResponse = { config, previousResults };
    return successResponse(response);
});

/**
 * POST - Submit assessment responses, calculate score, store result
 */
export const POST = withAuth(async (request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;
    const fullConfig = getAssessmentForLesson(courseId, lessonId);

    if (!fullConfig) {
        throw new NotFoundError('No assessment for this lesson');
    }

    const body = await request.json();
    const responses: Record<string, number> = body.responses;

    // Validate all questions are answered
    for (const q of fullConfig.questions) {
        if (responses[q.id] === undefined || responses[q.id] === null) {
            throw new ValidationError(`Missing response for question ${q.id}`);
        }
        const value = responses[q.id];
        if (value < fullConfig.scale.min || value > fullConfig.scale.max) {
            throw new ValidationError(`Invalid response value for question ${q.id}`);
        }
    }

    // Score the assessment
    const scored = scoreAssessment(fullConfig, responses);

    const result: AssessmentResult = {
        assessmentId: fullConfig.id,
        courseId,
        lessonId,
        responses,
        totalScore: scored.totalScore,
        maxScore: scored.maxScore,
        severity: scored.severity,
        severityLabel: scored.severityLabel,
        severityDescription: scored.severityDescription,
        severityColor: scored.severityColor,
        completedAt: new Date().toISOString(),
        crisisItemTriggered: scored.crisisItemTriggered,
    };

    // Get existing profile and history
    const profile = await profileService.getProfile(userId);
    const existingHistory: AssessmentResult[] = profile?.assessment?.assessmentHistory ?? [];

    // Find previous result for comparison
    const previousResult = existingHistory
        .filter(r => r.assessmentId === fullConfig.id)
        .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0];

    // Append to history and save.
    // IMPORTANT: Must NOT use dot-path 'assessment.assessmentHistory' here.
    // If profile.assessment is JSON null in the DB, jsonb_set silently fails
    // through a null intermediate key and the result is lost. Instead, merge
    // the full assessment object at the top level so the DB write always succeeds.
    const updatedHistory = [...existingHistory, result];
    const existingAssessment = profile?.assessment ?? null;
    await profileRepository.update(userId, {
        assessment: {
            ...(existingAssessment ?? {
                overallWellnessScore: 70,
                anxietyScore: 70,
                moodScore: 70,
                sleepScore: 70,
                stressScore: 70,
                recommendedCourses: [],
                recommendedStartCourse: '',
                priorityFocus: [],
                personalizedInsight: '',
                strengthsIdentified: [],
                areasForGrowth: [],
                generatedAt: new Date().toISOString(),
            }),
            assessmentHistory: updatedHistory,
        },
    });
    // Invalidate AI coach context so next chat uses fresh assessment data
    invalidateCache(`ai:ctx:${userId}`).catch(() => {});

    // Award XP for completing an assessment
    await profileService.updateProgress(userId, { xpEarned: 25 });

    const response: AssessmentSubmitResponse = {
        result,
        previousResult,
        scoringBands: fullConfig.scoring.bands,
    };

    return successResponse(response);
});
