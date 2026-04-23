import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody, errorResponse } from '@/lib/api/response-utils';
import { checkAdminSecret } from '@/lib/api/admin-auth';
import { createPodSchema } from '@/lib/validations/community';
import { podService } from '@/lib/services/podService';

/**
 * GET /api/community/pods
 * List the authenticated user's pods.
 */
export const GET = withAuth(async (_request, { userId }) => {
  const pods = await podService.getPodsByUser(userId);
  return successResponse({ pods });
});

/**
 * POST /api/community/pods
 * Create a new pod (admin only).
 */
export async function POST(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await validateBody(request, createPodSchema);
    const pod = await podService.createPod(data);
    return successResponse({ pod }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
