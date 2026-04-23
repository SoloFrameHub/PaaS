import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { basicInfoSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const body = await request.json();
    const result = basicInfoSchema.safeParse(body);
    if (!result.success) {
        return errorResponse(result.error);
    }

    await profileService.saveBasicInfo(userId, {
        name: result.data.name,
        displayName: result.data.displayName,
    });

    return successResponse({ success: true });
});
