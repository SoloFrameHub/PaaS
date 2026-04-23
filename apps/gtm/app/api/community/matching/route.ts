import { NextRequest, NextResponse } from 'next/server';
import { validateBody, successResponse, errorResponse } from '@/lib/api/response-utils';
import { checkAdminSecret } from '@/lib/api/admin-auth';
import { matchingTriggerSchema } from '@/lib/validations/community';
import { podMatchingService } from '@/lib/services/podMatchingService';
import { podService } from '@/lib/services/podService';

/**
 * POST /api/community/matching
 * Manually trigger pod matching for a specific user (admin only).
 * Body: { userId: string }
 */
export async function POST(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = await validateBody(request, matchingTriggerSchema);

    const match = await podMatchingService.findOptimalPod(userId);

    let podId: string;
    let isNewPod = false;

    if (match && match.matchScore >= 0.4) {
      podId = match.podId;
      await podService.addMemberToPod(podId, userId);
    } else {
      podId = await podMatchingService.formNewPod(userId);
      isNewPod = true;
    }

    return successResponse({
      podId,
      matchScore: match?.matchScore ?? 0,
      isNewPod,
      reason: match?.reason ?? 'new pod created',
    });
  } catch (error) {
    return errorResponse(error);
  }
}
