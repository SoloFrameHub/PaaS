/**
 * GET   /api/provider/patients/[patientId]  — full patient detail for provider
 * PATCH /api/provider/patients/[patientId]  — update displayName or notes
 *
 * Finding 12: Added pagination and time-based filtering
 * Query params:
 *   - days: number of days to fetch (default: 90, max: 365)
 *   - moodLimit: max mood entries (default: 30, max: 100)
 *   - alertLimit: max distress alerts (default: 20, max: 50)
 *   - assignmentLimit: max assignments (default: 50, max: 100)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withProviderAuth } from '@/lib/api/with-auth';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
import { providerPatient, profile, distressEvent, moodEntry, patientAssignment } from '@/lib/db/schema';
import { eq, and, desc, gte } from 'drizzle-orm';
import type { WellnessProfile } from '@/types/wellness-profile';

export const GET = withProviderAuth(async (req, { userId: providerId }, context) => {
  const patientId = context.params.patientId as string;
  const ctx = await requireTenantContext(req, { userId: providerId });

  // Parse pagination params (Finding 12: DoS prevention)
  const searchParams = req.nextUrl.searchParams;
  const days = Math.min(parseInt(searchParams.get('days') || '90'), 365);
  const moodLimit = Math.min(parseInt(searchParams.get('moodLimit') || '30'), 100);
  const alertLimit = Math.min(parseInt(searchParams.get('alertLimit') || '20'), 50);
  const assignmentLimit = Math.min(parseInt(searchParams.get('assignmentLimit') || '50'), 100);

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const result = await withTenantApp(ctx, async (tx) => {
    // Verify this patient belongs to this provider AND the link is active.
    // Dropping the `status='active'` filter would let an ex-provider keep
    // reading PHI after the patient revoked the relationship. (B-040.)
    const [link] = await tx
      .select()
      .from(providerPatient)
      .where(and(
        eq(providerPatient.providerId, providerId),
        eq(providerPatient.patientId, patientId),
        eq(providerPatient.status, 'active'),
      ));

    if (!link) return { status: 'not_found' as const };

    // Profile
    const [patientProfile] = await tx
      .select({ data: profile.data })
      .from(profile)
      .where(eq(profile.userId, patientId));

    // Recent mood entries (time-filtered + limited - Finding 12)
    const recentMoods = await tx
      .select()
      .from(moodEntry)
      .where(and(
        eq(moodEntry.userId, patientId),
        gte(moodEntry.date, cutoffDate)
      ))
      .orderBy(desc(moodEntry.date))
      .limit(moodLimit);

    // Distress history (time-filtered + limited - Finding 12)
    const distressHistory = await tx
      .select({
        id:              distressEvent.id,
        level:           distressEvent.level,
        confidence:      distressEvent.confidence,
        context:         distressEvent.context,
        courseId:        distressEvent.courseId,
        lessonId:        distressEvent.lessonId,
        providerAlerted: distressEvent.providerAlerted,
        resolvedAt:      distressEvent.resolvedAt,
        createdAt:       distressEvent.createdAt,
      })
      .from(distressEvent)
      .where(and(
        eq(distressEvent.userId, patientId),
        gte(distressEvent.createdAt, cutoffDate)
      ))
      .orderBy(desc(distressEvent.createdAt))
      .limit(alertLimit);

    // Assignments from this provider to this patient (limited - Finding 12)
    const assignments = await tx
      .select()
      .from(patientAssignment)
      .where(and(eq(patientAssignment.providerId, providerId), eq(patientAssignment.patientId, patientId)))
      .orderBy(desc(patientAssignment.createdAt))
      .limit(assignmentLimit);

    return { status: 'ok' as const, link, patientProfile, recentMoods, distressHistory, assignments };
  });

  if (result.status === 'not_found') return NextResponse.json({ error: 'Patient not found' }, { status: 404 });

  // Type profile data properly (Finding 15: no more 'as any')
  const profileData = (result.patientProfile?.data ?? {}) as Partial<WellnessProfile>;

  return NextResponse.json({
    patientId,
    displayName:  result.link.displayName ?? `Patient ${patientId.slice(-4)}`,
    notes:        result.link.notes,
    status:       result.link.status,
    linkedAt:     result.link.createdAt,
    profile: {
      onboardingCompleted: profileData.onboardingCompleted ?? false,
      currentCourse:       profileData.progress?.currentCourse ?? null,
      completedCourses:    profileData.progress?.completedCourses ?? [],
      completedLessons:    profileData.progress?.completedLessons ?? {},
      assessment: {
        overallWellnessScore: profileData.assessment?.overallWellnessScore ?? null,
        areasForGrowth:       profileData.assessment?.areasForGrowth ?? [],
        primarySymptoms:      profileData.questionnaire?.primarySymptoms?.map(s => ({
          category: s.category,
          severity: s.severity,
          isPrimary: s.isPrimary,
        })) ?? [],
      },
    },
    recentMoods: result.recentMoods.map(m => ({
      date:         m.date,
      moodRating:   m.moodRating,
      anxietyLevel: m.anxietyLevel,
      sleepQuality: m.sleepQuality,
      energyLevel:  m.energyLevel,
    })),
    distressHistory: result.distressHistory,
    assignments: result.assignments,
  });
});

const patchSchema = z.object({
  displayName: z.string().optional(),
  notes: z.string().optional(),
});

export const PATCH = withProviderAuth(async (req, { userId: providerId }, context) => {
  const patientId = context.params.patientId as string;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const ctx = await requireTenantContext(req, { userId: providerId });

  // PATCH must also require an active link — an inactive link should
  // not be editable. (B-040.)
  const result = await withTenantApp(ctx, async (tx) =>
    tx
      .update(providerPatient)
      .set({ ...(parsed.data.displayName !== undefined ? { displayName: parsed.data.displayName } : {}), ...(parsed.data.notes !== undefined ? { notes: parsed.data.notes } : {}) })
      .where(and(
        eq(providerPatient.providerId, providerId),
        eq(providerPatient.patientId, patientId),
        eq(providerPatient.status, 'active'),
      ))
      .returning({ patientId: providerPatient.patientId }),
  );

  if (result.length === 0) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
});
