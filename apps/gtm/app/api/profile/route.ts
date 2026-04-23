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

    // Ensure we return the expanded structure for FounderContext
    // If 'profile' variable is the raw FounderProfile (fallback), wrap it.
    const responseData = (profile as any).profile ? profile : {
        profile,
        founderCategory: null,
        industry: null,
        targetRoles: []
    };

    // Self-healing: deduplicate documents by fileName (fixes historical duplication bug)
    const rawProfile = (responseData as any).profile || responseData;
    if (rawProfile.documents?.length > 0) {
        const seen = new Map<string, any>();
        for (const doc of rawProfile.documents) {
            seen.set(doc.fileName || doc.name, doc);
        }
        const deduped = Array.from(seen.values());
        if (deduped.length < rawProfile.documents.length) {
            rawProfile.documents = deduped;
            // Persist the cleanup so it doesn't repeat every request
            await profileService.updateProfile(userId, { documents: deduped });
        }
    }

    return successResponse(responseData);
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
        'name', 'businessName', 'websiteUrl', 'elevatorPitch', 'targetAudience',
        'stage', 'businessModel', 'onboardingCompleted', 'questionnaire'
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
