/**
 * GET  /api/admin/providers         — list all provider applications
 * POST /api/admin/providers/[id]    — approve or reject an application
 *
 * Admin-only. Role must be 'admin'.
 *
 * Cross-tenant view — runs as platform_system to bypass RLS on
 * `provider_profile` (D-7).
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAdminAuth } from '@/lib/api/with-auth';
import { withSystemAdminApp } from '@/lib/db/with-tenant';
import { providerProfile, user } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

export const GET = withAdminAuth(async (_req, { userId: adminId }) => {

  const applications = await withSystemAdminApp(async (tx) =>
    tx
      .select({
        userId:             providerProfile.userId,
        displayName:        providerProfile.displayName,
        credentials:        providerProfile.credentials,
        specialty:          providerProfile.specialty,
        licenseNumber:      providerProfile.licenseNumber,
        npiNumber:          providerProfile.npiNumber,
        verificationStatus: providerProfile.verificationStatus,
        verificationMethod: providerProfile.verificationMethod,
        verificationNotes:  providerProfile.verificationNotes,
        npiData:            providerProfile.npiData,
        verifiedAt:         providerProfile.verifiedAt,
        verifiedBy:         providerProfile.verifiedBy,
        createdAt:          providerProfile.createdAt,
        email:              user.email,
      })
      .from(providerProfile)
      .innerJoin(user, eq(user.id, providerProfile.userId))
      .orderBy(desc(providerProfile.createdAt))
  );

  return NextResponse.json({ applications });
});
