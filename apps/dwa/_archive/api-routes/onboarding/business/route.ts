import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { businessInfoSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId, email }) => {
    const data = await validateBody(request, businessInfoSchema);

    // Ensure profile exists
    await profileService.getOrCreateProfile(userId, email);
    await profileService.saveBusinessInfo(userId, data);

    return successResponse({ success: true });
});
