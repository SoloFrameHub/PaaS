import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { questionnaireSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId, email }) => {
    const { questionnaire } = await validateBody(request, questionnaireSchema);

    // Ensure profile exists
    await profileService.getOrCreateProfile(userId, email);

    // Save questionnaire data
    await profileService.updateProfile(userId, { questionnaire });

    return successResponse({ success: true });
});
