import { NextRequest, NextResponse } from 'next/server';
import { validateBody, successResponse, errorResponse } from '@/lib/api/response-utils';
import { checkAdminSecret } from '@/lib/api/admin-auth';
import { facilitatorTriggerSchema } from '@/lib/validations/community';
import { facilitatorService } from '@/lib/services/facilitatorService';

/**
 * POST /api/admin/facilitator
 * Triggers weekly facilitator posts for all active pods.
 * Designed to be called by n8n cron job (Mon/Wed/Fri).
 * Protected by ADMIN_API_SECRET.
 */
export async function POST(request: NextRequest) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { dayOfWeek } = await validateBody(request, facilitatorTriggerSchema);
    const result = await facilitatorService.runWeeklyRhythm(dayOfWeek);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
}
