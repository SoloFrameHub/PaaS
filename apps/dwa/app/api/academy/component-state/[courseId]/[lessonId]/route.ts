import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { profileService } from '@/lib/services/profileService';
import type {
    LessonComponentState,
    ComponentStateLoadResponse,
    ComponentStateSaveRequest,
    ComponentStateSaveResponse,
} from '@/types/component-state';

/**
 * GET - Load component interaction state for a lesson
 */
export const GET = withAuth(async (_request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;

    const profile = await profileService.getProfile(userId);
    const allStates: LessonComponentState[] = profile?.progress?.componentStates ?? [];
    const state = allStates.find(
        s => s.courseId === courseId && s.lessonId === lessonId
    ) ?? null;

    const response: ComponentStateLoadResponse = { state };
    return successResponse(response);
});

/**
 * PUT - Save/merge component interaction state for a lesson
 * Merges incoming partial state with existing (deduplicates arrays, shallow-merges slides)
 */
export const PUT = withAuth(async (request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;
    const body: ComponentStateSaveRequest = await request.json();

    const profile = await profileService.getProfile(userId);
    const allStates: LessonComponentState[] = profile?.progress?.componentStates ?? [];
    const existingIndex = allStates.findIndex(
        s => s.courseId === courseId && s.lessonId === lessonId
    );
    const existing = existingIndex >= 0 ? allStates[existingIndex] : null;

    // Merge: deduplicate arrays, shallow-merge objects, replace array-value fields
    const merged: LessonComponentState = {
        courseId,
        lessonId,
        flipCards: {
            reviewed: Array.from(new Set([
                ...(existing?.flipCards?.reviewed ?? []),
                ...(body.flipCards?.reviewed ?? []),
            ])),
        },
        accordions: {
            opened: Array.from(new Set([
                ...(existing?.accordions?.opened ?? []),
                ...(body.accordions?.opened ?? []),
            ])),
        },
        slides: {
            ...(existing?.slides ?? {}),
            ...(body.slides ?? {}),
        },
        // New component state fields: shallow-merge Record keys, incoming values are authoritative
        checkins: { ...(existing?.checkins ?? {}), ...(body.checkins ?? {}) },
        scenarios: { ...(existing?.scenarios ?? {}), ...(body.scenarios ?? {}) },
        bodyMaps: { ...(existing?.bodyMaps ?? {}), ...(body.bodyMaps ?? {}) },
        groundingExercises: { ...(existing?.groundingExercises ?? {}), ...(body.groundingExercises ?? {}) },
        copingRanker: { ...(existing?.copingRanker ?? {}), ...(body.copingRanker ?? {}) },
        exposureHierarchy: { ...(existing?.exposureHierarchy ?? {}), ...(body.exposureHierarchy ?? {}) },
        exposureLogs: { ...(existing?.exposureLogs ?? {}), ...(body.exposureLogs ?? {}) },
        exposurePlans: { ...(existing?.exposurePlans ?? {}), ...(body.exposurePlans ?? {}) },
        updatedAt: new Date().toISOString(),
    };

    // Upsert into the array
    const updatedStates = [...allStates];
    if (existingIndex >= 0) {
        updatedStates[existingIndex] = merged;
    } else {
        updatedStates.push(merged);
    }

    await profileService.updateProfile(userId, {
        'progress.componentStates': updatedStates,
    });

    const response: ComponentStateSaveResponse = { state: merged };
    return successResponse(response);
});
