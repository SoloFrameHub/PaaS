/**
 * POST /api/provider/invite      — generate an invite code
 * PUT  /api/provider/invite      — patient redeems invite code to link to provider
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withProviderAuth, withAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
import { providerInvite, providerPatient, user } from '@/lib/db/schema';
import { eq, and, isNull, gt } from 'drizzle-orm';
import { isRateLimited, AUTH_RATE_LIMIT, getClientIp } from '@/lib/security';

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, b => chars[b % chars.length]).join('');
}

export const POST = withProviderAuth(async (_req, { userId: providerId }) => {
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await db.insert(providerInvite).values({ code, providerId, expiresAt });

  return NextResponse.json({ code, expiresAt });
});

const redeemSchema = z.object({ code: z.string().min(6).max(10) });

export const PUT = withAuth(async (req, { userId: patientId }) => {
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  // (slice 01 fix) Rate-limit redemptions by IP+user so the 32^8 code space
  // can't be brute-forced from a single attacker. AUTH_RATE_LIMIT (5 per
  // 15 min) is strict enough here.
  const ip = getClientIp(req);
  const { limited, remaining, reset } = await isRateLimited(
    `${ip}:${patientId}`,
    AUTH_RATE_LIMIT,
    'invite:redeem',
  );
  if (limited) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(AUTH_RATE_LIMIT.limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      },
    );
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = redeemSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const now = new Date();
  const codeUpper = parsed.data.code.toUpperCase();

  // (slice 01 fix) Atomic claim: the conditional UPDATE ... RETURNING is
  // the only step that can succeed for a given code. The previous shape
  // (SELECT → check → UPDATE) was a TOCTOU race — two simultaneous
  // redemptions of the same code both passed the isNull check and both
  // created providerPatient rows (different PKs, so onConflictDoNothing
  // didn't merge them), linking the provider to two patients from one
  // invite.
  const claimed = await db
    .update(providerInvite)
    .set({ usedBy: patientId, usedAt: now })
    .where(
      and(
        eq(providerInvite.code, codeUpper),
        isNull(providerInvite.usedBy),
        gt(providerInvite.expiresAt, now),
      ),
    )
    .returning({ providerId: providerInvite.providerId });

  if (claimed.length === 0) {
    return NextResponse.json({ error: 'Invalid or expired invite code' }, { status: 400 });
  }

  const { providerId } = claimed[0]!;

  // Prevent a provider from redeeming their own invite code. Do this after
  // the atomic claim (we own the row now), and release it — anyone else who
  // tried concurrently already got "Invalid or expired" above.
  if (providerId === patientId) {
    await db
      .update(providerInvite)
      .set({ usedBy: null, usedAt: null })
      .where(eq(providerInvite.code, codeUpper));
    return NextResponse.json({ error: 'Cannot redeem your own invite code' }, { status: 400 });
  }

  // Create the provider-patient link
  await db.insert(providerPatient).values({
    providerId,
    patientId,
    status: 'active',
  }).onConflictDoNothing();

  return NextResponse.json({ success: true, providerId });
});
