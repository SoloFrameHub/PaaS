import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import type { SymptomCategory } from '@/types/wellness-profile';
import {
    computeOverallScoreFromSymptoms,
    computeDimensionScoreFromSymptoms,
    computeAreasForGrowthFromSymptoms,
    computeStrengthsFromQuestionnaire,
    computePersonalizedInsight,
} from '@/lib/utils/onboarding-assessment';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    // Optionally accept assessment data to save atomically with completion
    let assessmentBody: Record<string, unknown> | null = null;
    try {
        const body = await request.json();
        if (body && body.recommendedCourses) {
            assessmentBody = body;
        }
    } catch {
        // No body or invalid JSON — that's fine, just complete onboarding
    }

    if (assessmentBody) {
        // Load the already-saved profile so we can compute scores from real symptom data
        const savedProfile = await profileService.getProfile(userId);
        const symptoms = savedProfile?.questionnaire?.primarySymptoms ?? [];
        const questionnaire = savedProfile?.questionnaire;

        const recommendedCourses = (assessmentBody.recommendedCourses as string[]) || [];
        const startCourse = (assessmentBody.selectedStartCourse as string) || recommendedCourses[0] || '';

        // Derive all assessment fields from actual symptom severity — never hardcode
        const overallWellnessScore = computeOverallScoreFromSymptoms(symptoms);
        const anxietyScore = computeDimensionScoreFromSymptoms(symptoms, ['anxiety', 'panic', 'social-anxiety', 'ocd']);
        const moodScore = computeDimensionScoreFromSymptoms(symptoms, ['depression', 'grief', 'anger']);
        const sleepScore = computeDimensionScoreFromSymptoms(symptoms, ['sleep']);
        const stressScore = computeDimensionScoreFromSymptoms(symptoms, ['stress', 'trauma']);

        const areasForGrowth = computeAreasForGrowthFromSymptoms(symptoms);
        const strengthsIdentified = computeStrengthsFromQuestionnaire(questionnaire);
        const personalizedInsight = computePersonalizedInsight(symptoms);

        const assessment = {
            recommendedCourses,
            recommendedStartCourse: startCourse,
            priorityFocus: (assessmentBody.priorityFocus as SymptomCategory[]) || [],
            overallWellnessScore,
            anxietyScore,
            moodScore,
            sleepScore,
            stressScore,
            personalizedInsight,
            strengthsIdentified,
            areasForGrowth,
        };

        await profileService.saveAssessment(userId, assessment);

        // Set the starting course as the current course so it appears on the dashboard
        if (startCourse) {
            await profileService.updateProgress(userId, { currentCourse: startCourse });
        }
    }

    // Mark onboarding as complete (sets onboardingCompleted, onboardingCompletedAt, questionnaire.completedAt)
    await profileService.completeOnboarding(userId);

    return successResponse({ success: true });
});
