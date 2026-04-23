import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { profileCoreService } from '@/lib/services/profileCoreService';

export const GET = withAuth(async (_request, { userId }) => {
    const profile = await profileCoreService.getProfile(userId);
    return successResponse(profile?.artifacts || {});
});
