import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { yourExperienceSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const body = await request.json();
    const result = yourExperienceSchema.safeParse(body);
    if (!result.success) {
        return errorResponse(result.error);
    }

    await profileService.saveYourExperience(userId, {
        currentCopingStrategies: result.data.currentCopingStrategies,
        unhealthyCopingToChange: result.data.unhealthyCopingToChange,
        therapyHistory: result.data.therapyHistory,
        previousSelfHelpExperience: result.data.previousSelfHelpExperience,
        knownTriggers: result.data.knownTriggers,
        worstTimeOfDay: result.data.worstTimeOfDay,
    });

    return successResponse({ success: true });
});
