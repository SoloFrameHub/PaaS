import { NextRequest } from 'next/server';
import { profileService } from '@/lib/services/profileService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { NotFoundError, ValidationError } from '@/lib/api/errors';
import { z } from 'zod';

export const GET = withAuth(async (request: NextRequest, { userId, email }) => {
    // Ensure user profile exists (Self-healing for new/mock users)
    await profileService.getOrCreateProfile(userId, email);

    // Use getProfile directly if getExpandedProfile causes issues with missing master data
    // For editing, we mostly need the raw stored data anyway
    const profile = await profileService.getExpandedProfile(userId) || await profileService.getProfile(userId);

    if (!profile) {
        throw new NotFoundError(`Profile not found for user ${userId}`);
    }

    const responseData = (profile as any).profile ? profile : {
        profile,
    };

    return successResponse({ data: responseData });
});

// (slice 01 fix) Previously this route's allowlist included
// `onboardingCompleted` and `questionnaire`, both of which are clinically
// significant. A user could PUT `onboardingCompleted=true` to skip
// onboarding, and PUT arbitrary `questionnaire` JSONB to rewrite their own
// symptom severities, which feeds provider-dashboard wellness scores.
// Both have dedicated endpoints (`/api/onboarding/complete`,
// `/api/onboarding/questionnaire`) that apply the correct Zod schemas —
// this generic PUT is now narrowed to cosmetic fields only.
const updateProfileSchema = z.object({
    name: z.string().trim().min(1).max(120).optional(),
});

export const PUT = withAuth(async (request: NextRequest, { userId }) => {
    let body;
    try {
        body = await request.json();
    } catch {
        throw new ValidationError('Invalid JSON body');
    }

    const parsed = updateProfileSchema.safeParse(body);
    if (!parsed.success) {
        throw new ValidationError(parsed.error.message);
    }

    // Zod.strip() keeps only known keys; an empty object means nothing to do.
    const updates = parsed.data;
    if (Object.keys(updates).length === 0) {
        throw new ValidationError('No valid fields to update');
    }

    await profileService.updateProfile(userId, updates);

    return successResponse({ success: true });
});
