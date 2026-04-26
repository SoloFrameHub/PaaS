// Admin debug endpoint: read recent `system_audit` rows from the platform
// DB. Gated behind `Authorization: Bearer $ADMIN_API_SECRET`. Exists so ops
// schedules (run via Dokploy's scheduler) can write their output via
// `run-and-trace` into system_audit, and we can read it externally without
// SSH'ing to the VPS. Remove when the ops runner has a proper log surface.

import { NextResponse, type NextRequest } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { sql } from 'drizzle-orm';
import { withSystemAdmin } from '@platform/tenancy';

export const runtime = 'nodejs';

function unauthorized() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) return unauthorized();

  const header = request.headers.get('authorization') ?? '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  const presented = match?.[1] ?? '';
  // B-036: plain `!==` leaks timing info. Fixed-length compare via
  // timingSafeEqual after an up-front length guard (timingSafeEqual throws
  // on length mismatch).
  if (!presented || presented.length !== secret.length) return unauthorized();
  if (!timingSafeEqual(Buffer.from(presented), Buffer.from(secret))) {
    return unauthorized();
  }

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20', 10) || 20, 200);
  const action = url.searchParams.get('action');

  const rows = await withSystemAdmin(async (tx) => {
    const res = await tx.execute<{
      id: string;
      occurred_at: string;
      actor_kind: string;
      action: string;
      resource_kind: string;
      outcome: string;
      meta: Record<string, unknown>;
    }>(
      action
        ? sql`SELECT id::text, occurred_at, actor_kind, action, resource_kind, outcome, meta
              FROM system_audit WHERE action = ${action}
              ORDER BY id DESC LIMIT ${limit}`
        : sql`SELECT id::text, occurred_at, actor_kind, action, resource_kind, outcome, meta
              FROM system_audit ORDER BY id DESC LIMIT ${limit}`,
    );
    return res.rows;
  });

  // Decode any base64 payloads in meta.out_b64 for readability.
  const decoded = rows.map((r) => {
    const meta = r.meta as Record<string, unknown>;
    const b64 = meta['out_b64'];
    if (typeof b64 === 'string') {
      try {
        meta['out'] = Buffer.from(b64, 'base64').toString('utf8');
      } catch {
        // leave as-is
      }
    }
    return r;
  });

  return NextResponse.json({ count: decoded.length, rows: decoded });
}
