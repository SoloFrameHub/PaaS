import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { checkAdminSecret } from '@/lib/api/admin-auth';
import { podService } from '@/lib/services/podService';

function getPodId(request: NextRequest): string {
  const segments = request.nextUrl.pathname.split('/');
  return segments[segments.indexOf('pods') + 1];
}

/**
 * GET /api/community/pods/:podId
 * Pod details including members and health. Must be a pod member.
 */
export const GET = withAuth(async (request, { userId }) => {
  const podId = getPodId(request);
  const pod = await podService.getPod(podId);
  if (!pod) return NextResponse.json({ error: 'Pod not found' }, { status: 404 });

  // Verify user is a member
  const userPods = await podService.getPodsByUser(userId);
  if (!userPods.some((p) => p.id === podId)) {
    return NextResponse.json({ error: 'Not a pod member' }, { status: 403 });
  }

  const members = await podService.getPodMembers(podId);
  const health = await podService.getPodHealth(podId);
  const activity = await podService.getRecentActivity(podId, 10);

  return successResponse({ pod, members, health, activity });
});

/**
 * PUT /api/community/pods/:podId
 * Update pod (admin only).
 */
export async function PUT(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const podId = getPodId(request);
    const body = await request.json();
    await podService.updatePod(podId, body);
    return successResponse({ updated: true });
  } catch (error) {
    return errorResponse(error);
  }
}

/**
 * DELETE /api/community/pods/:podId
 * Delete pod (admin only).
 */
export async function DELETE(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const podId = getPodId(request);
    await podService.deletePod(podId);
    return successResponse({ deleted: true });
  } catch (error) {
    return errorResponse(error);
  }
}
