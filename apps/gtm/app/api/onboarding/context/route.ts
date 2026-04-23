import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { contextWithDocsSchema } from '@/lib/validations/onboarding';

export const POST = withAuth(async (request: NextRequest, { userId, email }) => {
    const { linkedinUrl, linkedinAbout, linkedinPermission, documents } = await validateBody(request, contextWithDocsSchema);

    // Ensure profile exists
    await profileService.getOrCreateProfile(userId, email);

    // Save linkedin URL, pasted about text, and permission flag
    const linkedinUpdates: Record<string, unknown> = {};
    if (linkedinUrl) linkedinUpdates.linkedinUrl = linkedinUrl;
    if (linkedinAbout) linkedinUpdates.linkedinAbout = linkedinAbout;
    if (linkedinPermission !== undefined) linkedinUpdates.linkedinPermission = linkedinPermission;
    if (Object.keys(linkedinUpdates).length > 0) {
        await profileService.updateProfile(userId, linkedinUpdates);
    }

    // Documents are already saved by the /upload route — no need to re-create them here.
    // The context page sends document IDs for reference only.

    return successResponse({ success: true });
});
