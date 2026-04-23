import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { hasDatabase, getDb, schema } from '@/lib/db';
import { checkAdminSecret } from '@/lib/api/admin-auth';

const contentVersionSchema = z.object({
    entityType: z.enum(['curriculum', 'lesson', 'course', 'quiz', 'manuscript']),
    entityId: z.string().min(1),
    versionLabel: z.string().min(1),
    changeSummary: z.string().min(1),
    changedBy: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
});

/**
 * POST /api/admin/content-version
 * Logs a content/manuscript change for Metabase analytics tracking.
 * Protected by admin secret.
 */
export async function POST(request: NextRequest) {
    if (!checkAdminSecret(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabase()) {
        return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    try {
        const body = await request.json();
        const data = contentVersionSchema.parse(body);
        const db = getDb();

        if (!db) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        await db.insert(schema.contentVersion).values({
            id: `cv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
            entityType: data.entityType,
            entityId: data.entityId,
            versionLabel: data.versionLabel,
            changeSummary: data.changeSummary,
            changedBy: data.changedBy ?? null,
            metadata: data.metadata ?? null,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
        }
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to log content version' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/admin/content-version
 * Lists recent content versions for display.
 */
export async function GET(request: NextRequest) {
    if (!checkAdminSecret(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabase()) {
        return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    try {
        const db = getDb();
        if (!db) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 503 });
        }

        const versions = await db.select()
            .from(schema.contentVersion)
            .orderBy(schema.contentVersion.createdAt)
            .limit(50);

        return NextResponse.json({ versions });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch content versions' },
            { status: 500 }
        );
    }
}
