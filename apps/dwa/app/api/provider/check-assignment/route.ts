import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { getDb } from '@/lib/db';
import { providerPatient } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { logger } from '@/lib/logger';

/**
 * GET - Check if current user has an assigned provider
 * Used by useClinicalStorage to determine storage strategy
 */
export const GET = withAuth(async (request: NextRequest, { userId }) => {
  const db = getDb();
  if (!db) {
    return errorResponse('Database unavailable', 503);
  }

  try {
    // Check if user is linked to any active provider
    const links = await db
      .select({ id: providerPatient.id })
      .from(providerPatient)
      .where(
        and(
          eq(providerPatient.patientId, userId),
          eq(providerPatient.status, 'active')
        )
      )
      .limit(1);

    return successResponse({
      hasProvider: links.length > 0,
    });
  } catch (error) {
    logger.error('Error checking provider assignment', {
      userId,
      error: error instanceof Error ? error.message : String(error),
    });
    return errorResponse('Failed to check provider assignment', 500);
  }
});
