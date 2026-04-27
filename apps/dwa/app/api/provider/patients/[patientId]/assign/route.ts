/**
 * POST   /api/provider/patients/[patientId]/assign — assign a course or lesson
 * DELETE /api/provider/patients/[patientId]/assign — remove an assignment
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withProviderAuth } from '@/lib/api/with-auth';
import { requireTenantContext } from '@platform/tenancy';
import { withTenantApp } from '@/lib/db/with-tenant';
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

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = assignSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const { courseId, lessonId, dueDate, note } = parsed.data;

  const ctx = await requireTenantContext(req, { userId: providerId });

  const result = await withTenantApp(ctx, async (tx) => {
    // Verify relationship AND that it is active. (B-040.)
    const [link] = await tx
      .select({ patientId: providerPatient.patientId })
      .from(providerPatient)
      .where(and(
        eq(providerPatient.providerId, providerId),
        eq(providerPatient.patientId, patientId),
        eq(providerPatient.status, 'active'),
      ));
    if (!link) return { status: 'not_found' as const };

    const [inserted] = await tx.insert(patientAssignment).values({
      providerId,
      patientId,
      courseId,
      lessonId: lessonId ?? null,
      dueDate:  dueDate ? new Date(dueDate) : null,
      note:     note ?? null,
    }).returning({ id: patientAssignment.id });

    return { status: 'ok' as const, id: inserted.id };
  });

  if (result.status === 'not_found') return NextResponse.json({ error: 'Patient not found' }, { status: 404 });

  return NextResponse.json({ success: true, assignmentId: result.id });
});

export const DELETE = withProviderAuth(async (req, { userId: providerId }, context) => {
  const patientId = context.params.patientId as string;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = deleteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const ctx = await requireTenantContext(req, { userId: providerId });

  await withTenantApp(ctx, async (tx) =>
    tx
      .delete(patientAssignment)
      .where(
        and(
          eq(patientAssignment.id, parsed.data.assignmentId),
          eq(patientAssignment.providerId, providerId),
          eq(patientAssignment.patientId, patientId),
        )
      ),
  );

  return NextResponse.json({ success: true });
});
