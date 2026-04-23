/**
 * GET/PATCH /api/admin/forms/[id] — Submission detail + status update
 *
 * Auth: ADMIN_API_SECRET header
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDb, schema } from '@/lib/db';
import { eq, desc } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import { checkAdminSecret } from '@/lib/api/admin-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  const { id } = await params;

  try {
    const [submission] = await db
      .select()
      .from(schema.formSubmission)
      .where(eq(schema.formSubmission.id, id))
      .limit(1);

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const workflowLogs = await db
      .select()
      .from(schema.formWorkflowLog)
      .where(eq(schema.formWorkflowLog.submissionId, id))
      .orderBy(desc(schema.formWorkflowLog.createdAt));

    return NextResponse.json({ submission, workflowLogs });
  } catch (error) {
    logger.error('Admin form detail error', { error });
    return NextResponse.json({ error: 'Failed to fetch submission' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (body.status && ['new', 'reviewed', 'qualified', 'rejected', 'contacted'].includes(body.status)) {
      updates.status = body.status;
    }
    if (body.adminNotes !== undefined) {
      updates.adminNotes = body.adminNotes;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    await db
      .update(schema.formSubmission)
      .set(updates)
      .where(eq(schema.formSubmission.id, id));

    return NextResponse.json({ updated: true });
  } catch (error) {
    logger.error('Admin form update error', { error });
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
