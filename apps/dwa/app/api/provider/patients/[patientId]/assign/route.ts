/**
 * POST   /api/provider/patients/[patientId]/assign — assign a course or lesson
 * DELETE /api/provider/patients/[patientId]/assign — remove an assignment
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withProviderAuth } from '@/lib/api/with-auth';
import { getDb } from '@/lib/db';
import { patientAssignment, providerPatient } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

const assignSchema = z.object({
  courseId: z.string().min(1),
  lessonId: z.string().optional(),
  dueDate:  z.string().datetime().optional(), // ISO string
  note:     z.string().max(500).optional(),
});

const deleteSchema = z.object({
  assignmentId: z.number().int().positive(),
});

export const POST = withProviderAuth(async (req, { userId: providerId }, context) => {
  const patientId = context.params.patientId as string;
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  // Verify relationship
  const [link] = await db
    .select({ patientId: providerPatient.patientId })
    .from(providerPatient)
    .where(and(eq(providerPatient.providerId, providerId), eq(providerPatient.patientId, patientId)));
  if (!link) return NextResponse.json({ error: 'Patient not found' }, { status: 404 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = assignSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { courseId, lessonId, dueDate, note } = parsed.data;

  const [result] = await db.insert(patientAssignment).values({
    providerId,
    patientId,
    courseId,
    lessonId: lessonId ?? null,
    dueDate:  dueDate ? new Date(dueDate) : null,
    note:     note ?? null,
  }).returning({ id: patientAssignment.id });

  return NextResponse.json({ success: true, assignmentId: result.id });
});

export const DELETE = withProviderAuth(async (req, { userId: providerId }, context) => {
  const patientId = context.params.patientId as string;
  const db = getDb();
  if (!db) return NextResponse.json({ error: 'No database' }, { status: 503 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = deleteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  await db
    .delete(patientAssignment)
    .where(
      and(
        eq(patientAssignment.id, parsed.data.assignmentId),
        eq(patientAssignment.providerId, providerId),
        eq(patientAssignment.patientId, patientId),
      )
    );

  return NextResponse.json({ success: true });
});
