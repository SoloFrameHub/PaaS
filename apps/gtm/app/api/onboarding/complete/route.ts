import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    await profileService.updateProfile(userId, {
        onboardingCompleted: true,
        onboardingCompletedAt: new Date().toISOString()
    });

    return successResponse({ success: true });
});
