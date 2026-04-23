import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody, errorResponse } from '@/lib/api/response-utils';
import { entranceSurveySchema } from '@/lib/validations/community';
import { podMatchingService } from '@/lib/services/podMatchingService';
import { podService } from '@/lib/services/podService';
import { logger } from '@/lib/logger';

/**
 * POST /api/community/entrance-survey
 * Submit entrance survey, generate matching profile, and assign to a pod.
 */
export const POST = withAuth(async (request, { userId }) => {
  const data = await validateBody(request, entranceSurveySchema);

  // Generate matching profile
  await podMatchingService.generateMatchingProfile(userId, data);

  // Attempt to find optimal pod
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

  logger.info('Entrance survey completed', {
    userId,
    podId,
    matchScore: match?.matchScore ?? 0,
    isNewPod,
  });

  return successResponse({
    podId,
    matchScore: match?.matchScore ?? 0,
    isNewPod,
    reason: match?.reason ?? 'new pod created',
  });
});
