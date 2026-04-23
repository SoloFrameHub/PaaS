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

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = redeemSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const now = new Date();

  const [invite] = await db
    .select()
    .from(providerInvite)
    .where(
      and(
        eq(providerInvite.code, parsed.data.code.toUpperCase()),
        isNull(providerInvite.usedBy),
        gt(providerInvite.expiresAt, now),
      )
    );

  if (!invite) return NextResponse.json({ error: 'Invalid or expired invite code' }, { status: 400 });

  // Prevent a provider from redeeming their own invite code
  if (invite.providerId === patientId) {
    return NextResponse.json({ error: 'Cannot redeem your own invite code' }, { status: 400 });
  }

  // Mark invite as used
  await db
    .update(providerInvite)
    .set({ usedBy: patientId, usedAt: now })
    .where(eq(providerInvite.code, invite.code));

  // Create the provider-patient link
  await db.insert(providerPatient).values({
    providerId: invite.providerId,
    patientId,
    status: 'active',
  }).onConflictDoNothing();

  return NextResponse.json({ success: true, providerId: invite.providerId });
});
