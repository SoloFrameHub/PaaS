import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody, errorResponse } from '@/lib/api/response-utils';
import { checkAdminSecret } from '@/lib/api/admin-auth';
import { addMemberSchema } from '@/lib/validations/community';
import { podService } from '@/lib/services/podService';

function getPodId(request: NextRequest): string {
  const segments = request.nextUrl.pathname.split('/');
  return segments[segments.indexOf('pods') + 1];
}

/**
 * GET /api/community/pods/:podId/members
 * List pod members. Must be a pod member.
 */
export const GET = withAuth(async (request, { userId }) => {
  const podId = getPodId(request);

  // Verify user is a member
  const userPods = await podService.getPodsByUser(userId);
  if (!userPods.some((p) => p.id === podId)) {
    return NextResponse.json({ error: 'Not a pod member' }, { status: 403 });
  }

  const members = await podService.getPodMembers(podId);
  return successResponse({ members });
});

/**
 * POST /api/community/pods/:podId/members
 * Add a member to a pod (admin only).
 */
export async function POST(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const podId = getPodId(request);
    const { userId } = await validateBody(request, addMemberSchema);
    await podService.addMemberToPod(podId, userId);
    return successResponse({ added: true }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}

/**
 * DELETE /api/community/pods/:podId/members
 * Remove a member from a pod (admin only).
 * Body: { userId: string }
 */
export async function DELETE(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const podId = getPodId(request);
    const { userId } = await validateBody(request, addMemberSchema);
    await podService.removeMemberFromPod(podId, userId);
    return successResponse({ removed: true });
  } catch (error) {
    return errorResponse(error);
  }
}
