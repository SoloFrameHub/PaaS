/**
 * GET  /api/provider/patients  — list all patients for the authenticated provider
 * POST /api/provider/patients  — manually add a patient by userId (admin/testing)
 *
 * Finding 12: Added pagination to prevent DoS
 * Query params:
 *   - limit: max patients to return (default: 100, max: 500)
 *   - offset: skip N patients (default: 0)
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withProviderAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
import { providerPatient, user, profile, distressEvent, moodEntry, patientAssignment } from '@/lib/db/schema';
import { eq, and, desc, count, inArray, isNull, gte } from 'drizzle-orm';
import type { WellnessProfile } from '@/types/wellness-profile';

export const GET = withProviderAuth(async (req, { userId: providerId }) => {
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  // Parse pagination params (Finding 12: DoS prevention)
  const searchParams = req.nextUrl.searchParams;
  const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500);
  const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
  const days = Math.min(parseInt(searchParams.get('days') || '30'), 90);

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  // Fetch active provider-patient links (paginated - Finding 12)
  const links = await db
    .select({
      patientId:   providerPatient.patientId,
      displayName: providerPatient.displayName,
      notes:       providerPatient.notes,
      status:      providerPatient.status,
      linkedAt:    providerPatient.createdAt,
    })
    .from(providerPatient)
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.status, 'active')))
    .orderBy(desc(providerPatient.createdAt))
    .limit(limit)
    .offset(offset);

  if (links.length === 0) {
    return NextResponse.json({ patients: [] });
  }

  const patientIds = links.map(l => l.patientId);

  // Batch-fetch profile data
  const profiles = await db
    .select({ userId: profile.userId, data: profile.data })
    .from(profile)
    .where(inArray(profile.userId, patientIds));

  // Type profile data properly (Finding 15: no more 'as any')
  const profileMap = new Map(profiles.map(p => [p.userId, p.data as Partial<WellnessProfile>]));

  // Latest mood entry per patient (time-filtered - Finding 12)
  const latestMoods = await db
    .select({
      userId:       moodEntry.userId,
      moodRating:   moodEntry.moodRating,
      anxietyLevel: moodEntry.anxietyLevel,
      sleepQuality: moodEntry.sleepQuality,
      date:         moodEntry.date,
    })
    .from(moodEntry)
    .where(and(
      inArray(moodEntry.userId, patientIds),
      gte(moodEntry.date, cutoffDate)
    ))
    .orderBy(desc(moodEntry.date));

  const moodMap = new Map<string, typeof latestMoods[0]>();
  for (const m of latestMoods) {
    if (!moodMap.has(m.userId)) moodMap.set(m.userId, m);
  }

  // Unresolved crisis events per patient
  const crisisRows = await db
    .select({ userId: distressEvent.userId, cnt: count() })
    .from(distressEvent)
    .where(
      and(
        inArray(distressEvent.userId, patientIds),
        eq(distressEvent.level, 'crisis'),
        isNull(distressEvent.resolvedAt),
      )
    )
    .groupBy(distressEvent.userId);

  const crisisMap = new Map(crisisRows.map(r => [r.userId, Number(r.cnt)]));

  // Pending assignments per patient
  const assignments = await db
    .select({ patientId: patientAssignment.patientId, courseId: patientAssignment.courseId, lessonId: patientAssignment.lessonId, completedAt: patientAssignment.completedAt })
    .from(patientAssignment)
    .where(eq(patientAssignment.providerId, providerId));

  const assignMap = new Map<string, typeof assignments>();
  for (const a of assignments) {
    if (!assignMap.has(a.patientId)) assignMap.set(a.patientId, []);
    assignMap.get(a.patientId)!.push(a);
  }

  const patients = links.map(link => {
    const p = profileMap.get(link.patientId) ?? {};
    const mood = moodMap.get(link.patientId);
    const unresolvedCrises = crisisMap.get(link.patientId) ?? 0;
    const patientAssignments = assignMap.get(link.patientId) ?? [];
    const pendingAssignments = patientAssignments.filter(a => !a.completedAt).length;

    return {
      patientId:          link.patientId,
      displayName:        link.displayName ?? `Patient ${link.patientId.slice(-4)}`,
      status:             link.status,
      linkedAt:           link.linkedAt,
      unresolvedCrises,
      pendingAssignments,
      latestMood: mood ? {
        moodRating:   mood.moodRating,
        anxietyLevel: mood.anxietyLevel,
        sleepQuality: mood.sleepQuality,
        date:         mood.date,
      } : null,
      progress: {
        currentCourse:    p.progress?.currentCourse ?? null,
        completedCourses: (p.progress?.completedCourses ?? []).length,
      },
    };
  });

  return NextResponse.json({ patients });
});

const addPatientSchema = z.object({
  patientId:   z.string().min(1),
  displayName: z.string().optional(),
  notes:       z.string().optional(),
});

export const POST = withProviderAuth(async (req, { userId: providerId }) => {
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = addPatientSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { patientId, displayName, notes } = parsed.data;

  // Verify patient exists
  const [patientUser] = await db.select({ id: user.id }).from(user).where(eq(user.id, patientId));
  if (!patientUser) return NextResponse.json({ error: 'Patient not found' }, { status: 404 });

  await db.insert(providerPatient).values({
    providerId,
    patientId,
    displayName: displayName ?? null,
    notes: notes ?? null,
    status: 'active',
  }).onConflictDoNothing();

  return NextResponse.json({ success: true });
});
