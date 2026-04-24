/**
 * GET /api/provider/session-prep/[patientId]
 *
 * Generates a pre-session brief for the provider using patient data + LLM synthesis.
 * Never returns patient PII — all references use displayName alias.
 *
 * Finding 12: Added pagination and time-based filtering
 * Query params:
 *   - days: number of days to include (default: 90, max: 180)
 *   - assignmentLimit: max assignments to include (default: 20, max: 50)
 */

import { NextRequest, NextResponse } from 'next/server';
import { withProviderAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
import { providerPatient, profile, distressEvent, moodEntry, patientAssignment } from '@/lib/db/schema';
import { eq, and, desc, isNull, inArray, gte } from 'drizzle-orm';
import { generateSessionPrepBrief, type SessionPrepContext } from '@/lib/ai/rag';
import { CURRICULUM } from '@/lib/data/curriculum';
import { logger } from '@/lib/logger';
import { isRateLimited, AI_RATE_LIMIT } from '@/lib/security';
import type { WellnessProfile } from '@/types/wellness-profile';

function courseTitle(courseId: string): string {
  for (const track of CURRICULUM) {
    const course = track.courses.find(c => c.id === courseId);
    if (course) return course.title;
  }
  return courseId;
}

export const GET = withProviderAuth(async (req, { userId: providerId }, context) => {
  const patientId = context.params.patientId as string;

  // (slice 01 fix) Gate the LLM call behind the AI rate limit keyed per
  // (provider, patient) pair. A rogue client can't hammer session-prep
  // generation.
  const { limited, remaining, reset } = await isRateLimited(
    `${providerId}:${patientId}`,
    AI_RATE_LIMIT,
    'session-prep',
  );
  if (limited) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(AI_RATE_LIMIT.limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      },
    );
  }

  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  // Parse pagination params (Finding 12: DoS prevention)
  const searchParams = req.nextUrl.searchParams;
  const days = Math.min(parseInt(searchParams.get('days') || '90'), 180);
  const assignmentLimit = Math.min(parseInt(searchParams.get('assignmentLimit') || '20'), 50);

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  // Verify relationship AND that it is active. (B-040.)
  const [link] = await db
    .select({ displayName: providerPatient.displayName, notes: providerPatient.notes })
    .from(providerPatient)
    .where(and(
      eq(providerPatient.providerId, providerId),
      eq(providerPatient.patientId, patientId),
      eq(providerPatient.status, 'active'),
    ));

  if (!link) return NextResponse.json({ error: 'Patient not found' }, { status: 404 });

  const alias = link.displayName ?? `Patient ${patientId.slice(-4)}`;

  // Profile (Finding 15: properly typed, no 'as any')
  const [patientProfile] = await db
    .select({ data: profile.data })
    .from(profile)
    .where(eq(profile.userId, patientId));
  const p = (patientProfile?.data ?? {}) as Partial<WellnessProfile>;

  // Latest mood (within time window - Finding 12)
  const [latestMood] = await db
    .select({ moodRating: moodEntry.moodRating, anxietyLevel: moodEntry.anxietyLevel, sleepQuality: moodEntry.sleepQuality })
    .from(moodEntry)
    .where(and(
      eq(moodEntry.userId, patientId),
      gte(moodEntry.date, cutoffDate)
    ))
    .orderBy(desc(moodEntry.date))
    .limit(1);

  // Recent unresolved distress (within time window - Finding 12)
  const recentAlerts = await db
    .select({ level: distressEvent.level, createdAt: distressEvent.createdAt })
    .from(distressEvent)
    .where(
      and(
        eq(distressEvent.userId, patientId),
        isNull(distressEvent.resolvedAt),
        inArray(distressEvent.level, ['crisis', 'mild']),
        gte(distressEvent.createdAt, cutoffDate)
      )
    )
    .orderBy(desc(distressEvent.createdAt))
    .limit(5);

  // Assignments (limited - Finding 12)
  const assignments = await db
    .select({ courseId: patientAssignment.courseId, lessonId: patientAssignment.lessonId, completedAt: patientAssignment.completedAt, dueDate: patientAssignment.dueDate })
    .from(patientAssignment)
    .where(and(eq(patientAssignment.providerId, providerId), eq(patientAssignment.patientId, patientId)))
    .orderBy(desc(patientAssignment.createdAt))
    .limit(assignmentLimit);

  const pendingAssignments = assignments
    .filter(a => !a.completedAt)
    .map(a => a.lessonId ? `${courseTitle(a.courseId)} — Lesson ${a.lessonId}` : courseTitle(a.courseId));

  const completedCourses = (p.progress?.completedCourses ?? []).map(courseTitle);
  const currentCourse = p.progress?.currentCourse ? courseTitle(p.progress.currentCourse) : null;

  const ctx: SessionPrepContext = {
    patientAlias:        alias,
    recentAlerts:        recentAlerts.map(a => `${a.level} (${new Date(a.createdAt).toLocaleDateString()})`),
    completedCourses,
    currentCourse,
    latestMoodRating:    latestMood?.moodRating ?? null,
    latestAnxietyLevel:  latestMood?.anxietyLevel ?? null,
    latestSleepQuality:  latestMood?.sleepQuality ?? null,
    pendingAssignments,
    providerNotes:       link.notes ?? null,
  };

  try {
    const brief = await generateSessionPrepBrief(ctx);
    return NextResponse.json({ patientAlias: alias, brief, generatedAt: new Date().toISOString() });
  } catch (err) {
    logger.error('Session prep generation error', {
      providerId,
      patientId,
      patientAlias: alias,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json({ error: 'Failed to generate session prep' }, { status: 500 });
  }
});
