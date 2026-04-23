import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { NotFoundError, AppError } from '@/lib/api/errors';
import { profileService } from '@/lib/services/profileService';
import {
    getThoughtRecordForLesson,
    generateEntryId,
    filterAndSortEntries,
} from '@/lib/thought-records';
import type { ThoughtRecordEntry, ThoughtRecordLoadResponse, ThoughtRecordSubmitResponse } from '@/types/thought-record';

/**
 * GET - Load thought record config + user's existing entries
 */
export const GET = withAuth(async (_request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;
    const config = getThoughtRecordForLesson(courseId, lessonId);

    if (!config) {
        throw new NotFoundError('No thought record for this lesson');
    }

    const profile = await profileService.getProfile(userId);
    const allEntries: ThoughtRecordEntry[] = profile?.progress?.thoughtRecords ?? [];
    const entries = filterAndSortEntries(allEntries, config.id);

    const response: ThoughtRecordLoadResponse = { config, entries };
    return successResponse(response);
});

/**
 * POST - Submit a new thought record entry
 */
export const POST = withAuth(async (request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;
    const config = getThoughtRecordForLesson(courseId, lessonId);

    if (!config) {
        throw new NotFoundError('No thought record for this lesson');
    }

    const body = await request.json();
    const values: Record<string, string | number> = body.values;
    const date: string = body.date;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new AppError('Invalid date format (expected YYYY-MM-DD)', 400, 'VALIDATION_ERROR');
    }

    // Validate required fields
    for (const field of config.fields) {
        if (field.required && (values[field.id] === undefined || values[field.id] === '')) {
            throw new AppError(`Missing required field: ${field.label}`, 400, 'VALIDATION_ERROR');
        }
    }

    const entry: ThoughtRecordEntry = {
        id: generateEntryId(),
        recordId: config.id,
        courseId,
        lessonId,
        date,
        values,
        createdAt: new Date().toISOString(),
    };

    // Append to profile's thought records
    const profile = await profileService.getProfile(userId);
    const existing: ThoughtRecordEntry[] = profile?.progress?.thoughtRecords ?? [];
    const updated = [...existing, entry];

    await profileService.updateProfile(userId, {
        'progress.thoughtRecords': updated,
    });

    // Award XP for completing a thought record
    await profileService.updateProgress(userId, { xpEarned: 15 });

    const response: ThoughtRecordSubmitResponse = { entry };
    return successResponse(response);
});
