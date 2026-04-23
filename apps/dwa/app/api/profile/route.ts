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

export const PUT = withAuth(async (request: NextRequest, { userId }) => {
    let body;
    try {
        body = await request.json();
    } catch {
        throw new ValidationError('Invalid JSON body');
    }

    if (!body || typeof body !== 'object') {
        throw new ValidationError('Invalid request body');
    }

    // STRICT VALIDATION: Define allowed fields explicitly to prevent prototype pollution or mass assignment
    // Use Zod? Or just manual allowlist for now per the existing pattern, but stricter.
    const ALLOWED_FIELDS = new Set([
        'name', 'onboardingCompleted', 'questionnaire'
    ]);

    const updates: Record<string, any> = {};
    for (const [key, value] of Object.entries(body)) {
        if (ALLOWED_FIELDS.has(key)) {
            updates[key] = value;
        }
    }

    if (Object.keys(updates).length === 0) {
        throw new ValidationError('No valid fields to update');
    }

    // Perform update
    await profileService.updateProfile(userId, updates);

    return successResponse({ success: true });
});
