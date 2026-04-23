import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { goalsSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const body = await request.json();
    const result = goalsSchema.safeParse(body);
    if (!result.success) {
        return errorResponse(result.error);
    }

    await profileService.saveWellnessGoals(userId, {
        goals: result.data.goals,
        personalGoalDescription: result.data.personalGoalDescription,
        learningStyle: result.data.learningStyle,
        timeCommitment: result.data.timeCommitment,
    });

    return successResponse({ success: true });
});
