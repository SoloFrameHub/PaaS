import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { sql as rawSql } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import { checkAdminSecret } from '@/lib/api/admin-auth';
import { getDb, hasDatabase } from '@/lib/db';

/**
 * POST /api/admin/seed-demo
 * Runs the demo seed data SQL script. Protected by admin secret.
 * Idempotent: uses ON CONFLICT DO NOTHING.
 *
 * B-038: previous version opened (and discarded) a pg.Pool per request.
 * Goes through the shared `getDb()` pool now — same lifetime as the rest
 * of the app.
 */
export async function POST(req: NextRequest) {
  if (!checkAdminSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasDatabase()) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 });
  }
  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });
  }

  try {
    const sqlPath = join(process.cwd(), 'scripts', 'seed-demo-data.sql');
    const seed = readFileSync(sqlPath, 'utf-8');
    // The SQL file is committed to the repo, not user input — raw execution
    // is acceptable. `sql.raw` preserves multi-statement semantics.
    await db.execute(rawSql.raw(seed));
    return NextResponse.json({
      success: true,
      message: 'Demo data seeded successfully',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    logger.error('[seed-demo] Error', { error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
