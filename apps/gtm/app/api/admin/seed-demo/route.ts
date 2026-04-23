import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import pg from 'pg';
import { logger } from '@/lib/logger';
import { checkAdminSecret } from '@/lib/api/admin-auth';

/**
 * POST /api/admin/seed-demo
 * Runs the demo seed data SQL script. Protected by admin secret.
 * Idempotent: uses ON CONFLICT DO NOTHING.
 */
export async function POST(req: NextRequest) {
  if (!checkAdminSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL not set' }, { status: 500 });
  }

  try {
    // Read seed SQL from file
    const sqlPath = join(process.cwd(), 'scripts', 'seed-demo-data.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    // Execute directly with pg pool (not Drizzle) for raw SQL
    const pool = new pg.Pool({ connectionString: DATABASE_URL });
    await pool.query(sql);
    await pool.end();

    return NextResponse.json({ success: true, message: 'Demo data seeded successfully' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    logger.error('[seed-demo] Error', { error: message });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
