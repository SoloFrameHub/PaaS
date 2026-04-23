/**
 * GET   /api/provider/profile  — get provider profile + verification status
 * POST  /api/provider/profile  — create/update provider profile
 *
 * Verification flow on POST:
 *   1. If NPI number supplied → call NPPES registry
 *      - NPI valid + strong name match → status = 'verified', method = 'npi_auto'
 *      - NPI valid + partial/no name match → status = 'manual_review', method = 'npi_auto'
 *      - NPI invalid / API down → status = 'manual_review', method = 'admin_manual'
 *   2. If no NPI → status = 'manual_review', method = 'admin_manual'
 *   3. Role is ONLY set to 'provider' once verificationStatus = 'verified'
 *      (manual_review stays as 'user' until admin approves)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
import { providerProfile, user } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { verifyProviderNPI } from '@/lib/services/npiService';
import { logger } from '@/lib/logger';

const profileSchema = z.object({
  displayName:   z.string().min(1).max(100),
  credentials:   z.string().max(50).optional(),
  specialty:     z.string().max(100).optional(),
  licenseNumber: z.string().max(50).optional(),
  npiNumber:     z.string().max(20).optional(),
  bio:           z.string().max(1000).optional(),
});

export const GET = withAuth(async (_req, { userId }) => {
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  const [prof] = await db
    .select()
    .from(providerProfile)
    .where(eq(providerProfile.userId, userId));

  if (!prof) return NextResponse.json({ profile: null });
  return NextResponse.json({ profile: prof });
});

export const POST = withAuth(async (req, { userId }) => {
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { displayName, credentials, specialty, licenseNumber, npiNumber, bio } = parsed.data;

  // ── Verification ────────────────────────────────────────────────────────────
  let verificationStatus: string = 'manual_review';
  let verificationMethod: string = 'admin_manual';
  let verificationNotes: string | null = null;
  let npiData: Record<string, unknown> | null = null;
  let verifiedAt: Date | null = null;

  if (npiNumber) {
    try {
      const npiResult = await verifyProviderNPI(npiNumber.trim(), displayName);
      npiData = npiResult.rawData;

      if (npiResult.autoVerifiable && npiResult.nameMatch === 'strong') {
        // SECURITY (Finding 10): Even strong name matches require manual review.
        // NPPES is a PUBLIC registry — attackers can look up any provider's NPI and
        // register under their real name. Require identity binding (email verification,
        // mail-to-registered-address, or signed domain) before auto-approval.
        verificationStatus  = 'manual_review';
        verificationMethod  = 'npi_auto';
        verificationNotes   = `NPI ${npiNumber} verified via NPPES registry. Name match: strong. Registry name: "${npiResult.name}". **Pending admin identity verification (Finding 10).**`;
        // verifiedAt removed — only set on manual admin approval

        logger.info('provider_npi_strong_match_pending_review', {
          userId,
          npiNumber: npiResult.npiNumber,
          registryName: npiResult.name,
          nameMatch: npiResult.nameMatch,
          specialty: npiResult.specialty,
          securityNote: 'Manual review required despite strong match (Finding 10)',
        });
      } else if (npiResult.valid && (npiResult.nameMatch === 'partial' || npiResult.nameMatch === 'none')) {
        // NPI is real but name is only a partial or no match → manual review required
        const matchDesc = npiResult.nameMatch === 'partial' ? 'only partially matches' : 'does not match';
        verificationStatus  = 'manual_review';
        verificationMethod  = 'npi_auto';
        verificationNotes   = `NPI ${npiNumber} is valid in NPPES (Registry: "${npiResult.name}") but ${matchDesc} the supplied name "${displayName}". Please verify identity.`;

        logger.info('provider_npi_partial_match', {
          userId,
          npiNumber: npiResult.npiNumber,
          registryName: npiResult.name,
          suppliedName: displayName,
        });
      } else {
        // NPI not found in registry or API error
        verificationStatus  = 'manual_review';
        verificationMethod  = 'admin_manual';
        verificationNotes   = `NPI ${npiNumber} not found in NPPES registry: ${npiResult.error ?? 'not found'}. Queued for manual review.`;

        logger.warn('provider_npi_not_found', {
          userId,
          npiNumber,
          error: npiResult.error,
        });
      }
    } catch (err) {
      // NPI lookup threw — don't block sign-up, queue for manual review
      logger.error('provider_npi_lookup_error', { userId, error: err });
      verificationStatus  = 'manual_review';
      verificationMethod  = 'admin_manual';
      verificationNotes   = 'NPI lookup service unavailable. Queued for manual review.';
    }
  } else {
    // No NPI provided — manual review
    verificationNotes = 'No NPI number provided. Queued for manual review.';
  }

  // ── Upsert provider profile ─────────────────────────────────────────────────
  await db
    .insert(providerProfile)
    .values({
      userId,
      displayName,
      credentials:        credentials ?? null,
      specialty:          specialty ?? null,
      licenseNumber:      licenseNumber ?? null,
      npiNumber:          npiNumber ?? null,
      bio:                bio ?? null,
      verificationStatus,
      verificationMethod: verificationMethod ?? null,
      verificationNotes:  verificationNotes ?? null,
      npiData:            npiData ?? undefined,
      verifiedAt:         verifiedAt ?? undefined,
    })
    .onConflictDoUpdate({
      target: providerProfile.userId,
      set: {
        displayName,
        credentials:        credentials ?? null,
        specialty:          specialty ?? null,
        licenseNumber:      licenseNumber ?? null,
        npiNumber:          npiNumber ?? null,
        bio:                bio ?? null,
        verificationStatus,
        verificationMethod: verificationMethod ?? null,
        verificationNotes:  verificationNotes ?? null,
        npiData:            npiData ?? undefined,
        verifiedAt:         verifiedAt ?? undefined,
      },
    });

  // ── Role elevation — only on verified ───────────────────────────────────────
  if (verificationStatus === 'verified') {
    await db.update(user).set({ role: 'provider' }).where(eq(user.id, userId));
  }
  // manual_review stays as 'user' until admin approves

  return NextResponse.json({
    success: true,
    verificationStatus,
    message: verificationStatus === 'verified'
      ? 'Your credentials were verified automatically. You now have provider access.'
      : 'Your application has been submitted for review. You\'ll be notified once approved.',
  });
});
