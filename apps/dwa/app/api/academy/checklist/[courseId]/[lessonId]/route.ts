import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { NotFoundError } from '@/lib/api/errors';
import { profileService } from '@/lib/services/profileService';
import { getChecklistForLesson } from '@/lib/checklists';
import type { ChecklistProgress, ChecklistLoadResponse, ChecklistSaveResponse } from '@/types/checklist';

/**
 * GET - Load checklist config + user's existing progress
 */
export const GET = withAuth(async (_request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;
    const config = getChecklistForLesson(courseId, lessonId);

    if (!config) {
        throw new NotFoundError('No checklist for this lesson');
    }

    const profile = await profileService.getProfile(userId);
    const allChecklists: ChecklistProgress[] = profile?.progress?.checklists ?? [];
    const progress = allChecklists.find(c => c.checklistId === config.id) ?? null;

    const response: ChecklistLoadResponse = { config, progress };
    return successResponse(response);
});

/**
 * PUT - Save/update checklist progress (auto-save)
 */
export const PUT = withAuth(async (request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;
    const config = getChecklistForLesson(courseId, lessonId);

    if (!config) {
        throw new NotFoundError('No checklist for this lesson');
    }

    const body = await request.json();
    const items: Record<string, boolean> = body.items ?? {};
    const values: Record<string, string | number> = body.values ?? {};

    // Check if all checkbox items are checked
    const checkboxItems = config.items.filter(i => i.type === 'checkbox');
    const allChecked = checkboxItems.length > 0 && checkboxItems.every(i => items[i.id] === true);

    // Load existing progress
    const profile = await profileService.getProfile(userId);
    const allChecklists: ChecklistProgress[] = profile?.progress?.checklists ?? [];
    const existingIndex = allChecklists.findIndex(c => c.checklistId === config.id);
    const existing = existingIndex >= 0 ? allChecklists[existingIndex] : null;

    const wasAlreadyComplete = !!existing?.completedAt;
    const now = new Date().toISOString();

    const progress: ChecklistProgress = {
        checklistId: config.id,
        courseId,
        lessonId,
        items,
        values,
        completedAt: allChecked ? (existing?.completedAt ?? now) : undefined,
        updatedAt: now,
    };

    // Update the checklists array
    const updatedChecklists = [...allChecklists];
    if (existingIndex >= 0) {
        updatedChecklists[existingIndex] = progress;
    } else {
        updatedChecklists.push(progress);
    }

    await profileService.updateProfile(userId, {
        'progress.checklists': updatedChecklists,
    });

    // Award XP on first completion only
    let xpAwarded: number | undefined;
    if (allChecked && !wasAlreadyComplete) {
        await profileService.updateProgress(userId, { xpEarned: 10 });
        xpAwarded = 10;
    }

    const response: ChecklistSaveResponse = { progress, xpAwarded };
    return successResponse(response);
});
