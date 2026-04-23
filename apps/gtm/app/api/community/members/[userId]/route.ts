import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { profileCoreService } from '@/lib/services/profileCoreService';

// GET: Member profile (public view)
export const GET = withAuth(async (request: NextRequest, _user, context) => {
    const { userId: targetUserId } = await context.params;

    const profile = await profileCoreService.getProfile(targetUserId);
    if (!profile) {
        return successResponse({ found: false });
    }

    // Return only public-facing info
    return successResponse({
        found: true,
        name: profile.name || 'Academy Member',
        businessType: profile.businessModel || null,
        industry: profile.inferred?.industryVertical || profile.questionnaire?.industry || null,
        currentCourse: profile.progress?.currentCourse || 0,
        xp: profile.progress?.xpTotal || 0,
        badges: (profile.progress?.badges || []).map((b: any) =>
            typeof b === 'string' ? b : b.id
        ),
        joinedAt: profile.onboardingCompletedAt || null,
    });
});
