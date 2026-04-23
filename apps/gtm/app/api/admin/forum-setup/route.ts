import { NextRequest, NextResponse } from 'next/server';
import { forumStructureService } from '@/lib/services/forumStructureService';
import { checkAdminSecret } from '@/lib/api/admin-auth';

/**
 * POST /api/admin/forum-setup
 * One-time admin endpoint to initialize the NodeBB forum category structure
 * and bot accounts. Safe to call multiple times (idempotent where possible).
 * Protected by ADMIN_API_SECRET.
 */
export async function POST(request: NextRequest) {
    if (!checkAdminSecret(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await forumStructureService.setupFullStructure();
        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Forum setup failed' },
            { status: 500 }
        );
    }
}
