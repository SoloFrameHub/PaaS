import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { NotFoundError, AppError } from '@/lib/api/errors';
import { profileService } from '@/lib/services/profileService';
import {
    getTrackingLogForLesson,
    computeDerivedMetrics,
    generateEntryId,
    filterAndSortEntries,
} from '@/lib/tracking-logs';
import type { TrackingLogEntry, TrackingLogLoadResponse, TrackingLogSubmitResponse } from '@/types/tracking-log';

/**
 * GET - Load tracking log config + user's existing entries
 */
export const GET = withAuth(async (_request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;
    const config = getTrackingLogForLesson(courseId, lessonId);

    if (!config) {
        throw new NotFoundError('No tracking log for this lesson');
    }

    const profile = await profileService.getProfile(userId);
    const allEntries: TrackingLogEntry[] = profile?.progress?.trackingLogs ?? [];
    const entries = filterAndSortEntries(allEntries, config.id);

    const response: TrackingLogLoadResponse = { config, entries };
    return successResponse(response);
});

/**
 * POST - Submit a new tracking log entry
 */
export const POST = withAuth(async (request: NextRequest, { userId }, context) => {
    const { courseId, lessonId } = await context.params;
    const config = getTrackingLogForLesson(courseId, lessonId);

    if (!config) {
        throw new NotFoundError('No tracking log for this lesson');
    }

    const body = await request.json();
    const values: Record<string, string | number | boolean> = body.values;
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

    // Compute derived metrics
    const derivedValues = computeDerivedMetrics(config, values);

    const entry: TrackingLogEntry = {
        id: generateEntryId(),
        logId: config.id,
        courseId,
        lessonId,
        date,
        values,
        derivedValues: Object.keys(derivedValues).length > 0 ? derivedValues : undefined,
        createdAt: new Date().toISOString(),
    };

    // Append to profile's tracking logs
    const profile = await profileService.getProfile(userId);
    const existingLogs: TrackingLogEntry[] = profile?.progress?.trackingLogs ?? [];
    const updatedLogs = [...existingLogs, entry];

    await profileService.updateProfile(userId, {
        'progress.trackingLogs': updatedLogs,
    });

    // Award XP for logging
    await profileService.updateProgress(userId, { xpEarned: 10 });

    const response: TrackingLogSubmitResponse = { entry };
    return successResponse(response);
});
