/**
 * GET /api/admin/forms/export — CSV export of form submissions
 *
 * Query params: slug (required), status (optional)
 * Auth: ADMIN_API_SECRET header
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb, schema } from '@/lib/db';
import { eq, and, desc } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import { checkAdminSecret } from '@/lib/api/admin-auth';

function escapeCsv(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  const params = request.nextUrl.searchParams;
  const slug = params.get('slug');
  const status = params.get('status');

  if (!slug) {
    return NextResponse.json({ error: 'slug parameter is required' }, { status: 400 });
  }

  try {
    const conditions = [eq(schema.formSubmission.formSlug, slug)];
    if (status) conditions.push(eq(schema.formSubmission.status, status));

    const submissions = await db
      .select()
      .from(schema.formSubmission)
      .where(and(...conditions))
      .orderBy(desc(schema.formSubmission.createdAt));

    if (submissions.length === 0) {
      return new NextResponse('No submissions found', { status: 404 });
    }

    // Build CSV header from fixed columns + dynamic data keys
    const fixedCols = ['id', 'email', 'name', 'score', 'status', 'utm_source', 'utm_medium', 'utm_campaign', 'created_at'];
    const dataKeys = new Set<string>();
    for (const sub of submissions) {
      if (sub.data && typeof sub.data === 'object') {
        for (const key of Object.keys(sub.data as Record<string, unknown>)) {
          if (key !== 'email' && key !== 'name') dataKeys.add(key);
        }
      }
    }
    const dynamicCols = Array.from(dataKeys).sort();
    const allCols = [...fixedCols, ...dynamicCols];

    const rows = [allCols.join(',')];
    for (const sub of submissions) {
      const data = (sub.data || {}) as Record<string, unknown>;
      const row = [
        escapeCsv(sub.id),
        escapeCsv(sub.email),
        escapeCsv(sub.name),
        escapeCsv(sub.score),
        escapeCsv(sub.status),
        escapeCsv(sub.utmSource),
        escapeCsv(sub.utmMedium),
        escapeCsv(sub.utmCampaign),
        escapeCsv(sub.createdAt),
        ...dynamicCols.map((key) => escapeCsv(data[key])),
      ];
      rows.push(row.join(','));
    }

    const csv = rows.join('\n');
    const filename = `${slug}-submissions-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    logger.error('Admin forms export error', { error });
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
