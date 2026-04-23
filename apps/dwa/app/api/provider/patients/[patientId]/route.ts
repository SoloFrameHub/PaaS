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
import { getDb } from '@/lib/db';
import { providerPatient, profile, distressEvent, moodEntry, patientAssignment } from '@/lib/db/schema';
import { eq, and, desc, gte } from 'drizzle-orm';
import type { WellnessProfile } from '@/types/wellness-profile';

export const GET = withProviderAuth(async (req, { userId: providerId }, context) => {
  const patientId = context.params.patientId as string;
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  // Parse pagination params (Finding 12: DoS prevention)
  const searchParams = req.nextUrl.searchParams;
  const days = Math.min(parseInt(searchParams.get('days') || '90'), 365);
  const moodLimit = Math.min(parseInt(searchParams.get('moodLimit') || '30'), 100);
  const alertLimit = Math.min(parseInt(searchParams.get('alertLimit') || '20'), 50);
  const assignmentLimit = Math.min(parseInt(searchParams.get('assignmentLimit') || '50'), 100);

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  // Verify this patient belongs to this provider
  const [link] = await db
    .select()
    .from(providerPatient)
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.patientId, patientId)));

  if (!link) return NextResponse.json({ error: 'Patient not found' }, { status: 404 });

  // Profile
  const [patientProfile] = await db
    .select({ data: profile.data })
    .from(profile)
    .where(eq(profile.userId, patientId));

  // Type profile data properly (Finding 15: no more 'as any')
  const profileData = (patientProfile?.data ?? {}) as Partial<WellnessProfile>;

  // Recent mood entries (time-filtered + limited - Finding 12)
  const recentMoods = await db
    .select()
    .from(moodEntry)
    .where(and(
      eq(moodEntry.userId, patientId),
      gte(moodEntry.date, cutoffDate)
    ))
    .orderBy(desc(moodEntry.date))
    .limit(moodLimit);

  // Distress history (time-filtered + limited - Finding 12)
  const distressHistory = await db
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
  const assignments = await db
    .select()
    .from(patientAssignment)
    .where(and(eq(patientAssignment.providerId, providerId), eq(patientAssignment.patientId, patientId)))
    .orderBy(desc(patientAssignment.createdAt))
    .limit(assignmentLimit);

  return NextResponse.json({
    patientId,
    displayName:  link.displayName ?? `Patient ${patientId.slice(-4)}`,
    notes:        link.notes,
    status:       link.status,
    linkedAt:     link.createdAt,
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
    recentMoods: recentMoods.map(m => ({
      date:         m.date,
      moodRating:   m.moodRating,
      anxietyLevel: m.anxietyLevel,
      sleepQuality: m.sleepQuality,
      energyLevel:  m.energyLevel,
    })),
    distressHistory,
    assignments,
  });
});

const patchSchema = z.object({
  displayName: z.string().optional(),
  notes: z.string().optional(),
});

export const PATCH = withProviderAuth(async (req, { userId: providerId }, context) => {
  const patientId = context.params.patientId as string;
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  await db
    .update(providerPatient)
    .set({ ...(parsed.data.displayName !== undefined ? { displayName: parsed.data.displayName } : {}), ...(parsed.data.notes !== undefined ? { notes: parsed.data.notes } : {}) })
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.patientId, patientId)));

  return NextResponse.json({ success: true });
});
