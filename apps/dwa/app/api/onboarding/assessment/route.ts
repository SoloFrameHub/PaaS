import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { assessmentSchema } from '@/lib/validations/onboarding';
import type { SymptomCategory } from '@/types/wellness-profile';
import {
    computeOverallScoreFromSymptoms,
    computeDimensionScoreFromSymptoms,
    computeAreasForGrowthFromSymptoms,
    computeStrengthsFromQuestionnaire,
    computePersonalizedInsight,
} from '@/lib/utils/onboarding-assessment';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const body = await request.json();
    const result = assessmentSchema.safeParse(body);
    if (!result.success) {
        return errorResponse(result.error);
    }

    // Load the saved profile to compute real scores from actual symptom data
    const savedProfile = await profileService.getProfile(userId);
    const symptoms = savedProfile?.questionnaire?.primarySymptoms ?? [];

    const overallWellnessScore = computeOverallScoreFromSymptoms(symptoms);
    const anxietyScore = computeDimensionScoreFromSymptoms(symptoms, ['anxiety', 'panic', 'social-anxiety', 'ocd'] as SymptomCategory[]);
    const moodScore = computeDimensionScoreFromSymptoms(symptoms, ['depression', 'grief', 'anger'] as SymptomCategory[]);
    const sleepScore = computeDimensionScoreFromSymptoms(symptoms, ['sleep'] as SymptomCategory[]);
    const stressScore = computeDimensionScoreFromSymptoms(symptoms, ['stress', 'trauma'] as SymptomCategory[]);
    const areasForGrowth = computeAreasForGrowthFromSymptoms(symptoms);
    const strengthsIdentified = computeStrengthsFromQuestionnaire(savedProfile?.questionnaire);
    const personalizedInsight = computePersonalizedInsight(symptoms);

    const assessment = {
        recommendedCourses: result.data.recommendedCourses,
        recommendedStartCourse: result.data.recommendedCourses[0] || '',
        priorityFocus: result.data.priorityFocus,
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

    return successResponse({ success: true });
});
