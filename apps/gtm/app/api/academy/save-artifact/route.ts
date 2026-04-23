import { NextRequest } from 'next/server';
import { profileCoreService } from '@/lib/services/profileCoreService';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { saveArtifactSchema } from '@/lib/validations/academy';
import { logger } from '@/lib/logger';
import { badgeService } from '@/lib/services/badgeService';
import type { Celebrations } from '@/types/profile';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const { artifactType, sectionId, courseNumber, data } = await validateBody(request, saveArtifactSchema);

    // Merge section data into existing artifact content
    const profile = await profileCoreService.getProfile(userId);
    const existingArtifact = profile?.artifacts?.[artifactType as keyof typeof profile.artifacts] as any;
    const existingContent = existingArtifact?.content || {};

    // Deep merge: section fields go into the right place in the artifact content
    const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
    const mergedContent = { ...existingContent };
    for (const [key, value] of Object.entries(data)) {
        // Support nested keys like "decisionMaker.title" or "a.b.c"
        if (key.includes('.')) {
            const parts = key.split('.');
            if (parts.some(p => DANGEROUS_KEYS.has(p))) continue;
            let current = mergedContent;
            for (let i = 0; i < parts.length - 1; i++) {
                if (!(parts[i] in current) || typeof current[parts[i]] !== 'object' || current[parts[i]] === null) {
                    current[parts[i]] = {};
                } else {
                    current[parts[i]] = { ...current[parts[i]] };
                }
                current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = value;
        } else {
            if (DANGEROUS_KEYS.has(key)) continue;
            mergedContent[key] = value;
        }
    }

    await profileCoreService.saveArtifact(userId, artifactType, mergedContent, courseNumber);

    logger.info('Artifact saved', { userId, artifactType, sectionId, courseNumber });

    // Check badge triggers for artifact creation
    const celebrations: Celebrations = {};
    try {
        const newBadges = await badgeService.checkAllTriggers(userId, {
            type: 'artifact_saved',
            data: { artifactType, sectionId, courseNumber },
        });
        if (newBadges.length > 0) {
            celebrations.badges = newBadges;
        }
    } catch (err) {
        logger.error('Badge check failed after artifact save (non-blocking)', { err, userId });
    }

    const hasCelebrations = celebrations.badges && celebrations.badges.length > 0;

    return successResponse({
        success: true,
        artifactType,
        version: (existingArtifact?.version || 0) + 1,
        ...(hasCelebrations ? { celebrations } : {}),
    });
});
