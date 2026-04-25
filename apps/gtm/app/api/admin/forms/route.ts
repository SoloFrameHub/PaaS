/**
 * GET /api/admin/forms — List form submissions with filters
 *
 * Query params: slug, status, page (default 1), limit (default 20)
 * Auth: ADMIN_API_SECRET header
 *
 * Cross-tenant view — runs as platform_system to bypass RLS on
 * `form_submission` (D-7).
 */

import { NextRequest, NextResponse } from 'next/server';
import { hasDatabase, schema } from '@/lib/db';
import { withSystemAdminApp } from '@/lib/db/with-tenant';
import { eq, and, desc, sql } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import { checkAdminSecret } from '@/lib/api/admin-auth';

export async function GET(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasDatabase()) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  const params = request.nextUrl.searchParams;
  const slug = params.get('slug');
  const status = params.get('status');
  const page = Math.max(1, parseInt(params.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(params.get('limit') || '20', 10)));
  const offset = (page - 1) * limit;

  try {
    const conditions = [];
    if (slug) conditions.push(eq(schema.formSubmission.formSlug, slug));
    if (status) conditions.push(eq(schema.formSubmission.status, status));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const { submissions, total } = await withSystemAdminApp(async (tx) => {
      const [submissions, countResult] = await Promise.all([
        tx
          .select()
          .from(schema.formSubmission)
          .where(where)
          .orderBy(desc(schema.formSubmission.createdAt))
          .limit(limit)
          .offset(offset),
        tx
          .select({ count: sql<number>`count(*)::int` })
          .from(schema.formSubmission)
          .where(where),
      ]);
      return { submissions, total: countResult[0]?.count || 0 };
    });

    return NextResponse.json({
      submissions,
      total,
      page,
      pageSize: limit,
    });
  } catch (error) {
    logger.error('Admin forms list error', { error });
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
