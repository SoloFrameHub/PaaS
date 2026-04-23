import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { symptomsSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const body = await request.json();
    const result = symptomsSchema.safeParse(body);
    if (!result.success) {
        return errorResponse(result.error);
    }

    await profileService.saveSymptomSelection(userId, {
        primarySymptoms: result.data.primarySymptoms,
        otherSymptomDescription: result.data.otherSymptomDescription,
    });

    return successResponse({ success: true });
});
