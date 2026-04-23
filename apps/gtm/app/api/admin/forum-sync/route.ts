import { NextRequest, NextResponse } from 'next/server';
import { syncForumData } from '@/lib/services/forumSyncService';
import { checkAdminSecret } from '@/lib/api/admin-auth';

/**
 * POST /api/admin/forum-sync
 * Triggers a sync of NodeBB forum data into PostgreSQL for Metabase analytics.
 * Protected by admin secret (for n8n cron or manual invocation).
 */
export async function POST(request: NextRequest) {
    if (!checkAdminSecret(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const result = await syncForumData();
        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Sync failed' },
            { status: 500 }
        );
    }
}
