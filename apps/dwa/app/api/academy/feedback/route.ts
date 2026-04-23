import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { lessonFeedbackSchema } from '@/lib/validations/academy';
import { logger } from '@/lib/logger';
import { getDb } from '@/lib/db';
import { lessonFeedback } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

async function ensureLessonFeedbackTable(db: NonNullable<ReturnType<typeof getDb>>) {
    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS lesson_feedback (
            id serial PRIMARY KEY,
            user_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
            course_id text NOT NULL,
            lesson_id text NOT NULL,
            rating integer NOT NULL,
            category text NOT NULL,
            message text NOT NULL,
            created_at timestamp with time zone DEFAULT now() NOT NULL
        )
    `);
}

export const POST = withAuth(async (request: NextRequest, { userId }) => {
    const data = await validateBody(request, lessonFeedbackSchema);

    const db = getDb();
    if (!db) {
        logger.info('Lesson feedback (no DB)', {
            userId,
            courseId: data.courseId,
            lessonId: data.lessonId,
            rating: data.rating,
            category: data.category,
            message: data.message,
        });
        return successResponse({ success: true });
    }

    try {
        await db.insert(lessonFeedback).values({
            userId,
            courseId: data.courseId,
            lessonId: data.lessonId,
            rating: data.rating,
            category: data.category,
            message: data.message,
        });
    } catch (insertErr: any) {
        // Table missing (first deploy before migration runs) — create it and retry
        if (insertErr?.code === '42P01') {
            await ensureLessonFeedbackTable(db);
            await db.insert(lessonFeedback).values({
                userId,
                courseId: data.courseId,
                lessonId: data.lessonId,
                rating: data.rating,
                category: data.category,
                message: data.message,
            });
        } else {
            throw insertErr;
        }
    }

    logger.info('Lesson feedback submitted', {
        userId,
        courseId: data.courseId,
        lessonId: data.lessonId,
        rating: data.rating,
        category: data.category,
    });

    return successResponse({ success: true });
});
