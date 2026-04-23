import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { aboutYouSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const body = await request.json();
    const result = aboutYouSchema.safeParse(body);
    if (!result.success) {
        return errorResponse(result.error);
    }

    await profileService.saveAboutYou(userId, {
        ageRange: result.data.ageRange,
        lifeStage: result.data.lifeStage,
        livingSituation: result.data.livingSituation,
        supportNetworkStrength: result.data.supportNetworkStrength,
        hasTrustedPerson: result.data.hasTrustedPerson,
        comfortWithGroupActivities: result.data.comfortWithGroupActivities,
    });

    return successResponse({ success: true });
});
