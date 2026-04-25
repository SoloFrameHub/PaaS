import { NextRequest } from 'next/server';
import { requireTenantContext } from '@platform/tenancy';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { lessonFeedbackSchema } from '@/lib/validations/academy';
import { logger } from '@/lib/logger';
import { hasDatabase, schema } from '@/lib/db';
import { withTenantApp } from '@/lib/db/with-tenant';
import { getCourse } from '@/lib/data/curriculum';
import { AppError } from '@/lib/api/errors';

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const { courseId, lessonId, sentiment, category, comment } = await validateBody(request, lessonFeedbackSchema);

    if (!getCourse(courseId)) {
        throw new AppError(`Unknown course: ${courseId}`, 400, 'INVALID_COURSE');
    }

    if (hasDatabase()) {
        const ctx = await requireTenantContext(request, { userId });
        await withTenantApp(ctx, async (tx) =>
            tx.insert(schema.lessonFeedback).values({
                id: `lf_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
                userId,
                courseId,
                lessonId,
                sentiment,
                category: category ?? null,
                comment: comment ?? null,
            })
        );
    } else {
        logger.info('Lesson feedback (no-db mode)', { userId, courseId, lessonId, sentiment, category });
    }

    return successResponse({ success: true });
});
