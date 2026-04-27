/**
 * GET/PATCH /api/admin/forms/[id] — Submission detail + status update
 *
 * Auth: ADMIN_API_SECRET header
 *
 * Cross-tenant view — runs as platform_system to bypass RLS on
 * `form_submission` and `form_workflow_log` (D-7, Pattern E). Mirrors
 * `apps/gtm/app/api/admin/forms/route.ts`.
 */

import { NextRequest, NextResponse } from 'next/server';
import { hasDatabase, schema } from '@/lib/db';
import { withSystemAdminApp } from '@/lib/db/with-tenant';
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

  if (!hasDatabase()) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  const { id } = await params;

  try {
    const { submission, workflowLogs } = await withSystemAdminApp(async (tx) => {
      const [submission] = await tx
        .select()
        .from(schema.formSubmission)
        .where(eq(schema.formSubmission.id, id))
        .limit(1);

      if (!submission) {
        return { submission: null, workflowLogs: [] };
      }

      const workflowLogs = await tx
        .select()
        .from(schema.formWorkflowLog)
        .where(eq(schema.formWorkflowLog.submissionId, id))
        .orderBy(desc(schema.formWorkflowLog.createdAt));

      return { submission, workflowLogs };
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

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

  if (!hasDatabase()) {
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

    await withSystemAdminApp(async (tx) => {
      await tx
        .update(schema.formSubmission)
        .set(updates)
        .where(eq(schema.formSubmission.id, id));
    });

    return NextResponse.json({ updated: true });
  } catch (error) {
    logger.error('Admin form update error', { error });
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
