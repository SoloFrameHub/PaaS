import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse } from '@/lib/api/response-utils';
import { NotFoundError } from '@/lib/api/errors';
import { getDb } from '@/lib/db';
import { clinicalComponentData, providerPatient, user } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { logger } from '@/lib/logger';

/**
 * GET - Load clinical component data
 * HIPAA: Tenant-isolated - users can only access their own data
 * Providers can access their assigned patients' data via ?userId= query param
 */
export const GET = withAuth(async (request: NextRequest, { userId, role }, context) => {
  const db = getDb();
  if (!db) {
    return errorResponse('Database unavailable', 503);
  }

  const { componentType, componentId } = await context.params;

  // Check if provider is requesting patient data
  const targetUserId = request.nextUrl.searchParams.get('userId') || userId;

  try {
    // If provider is accessing patient data, verify assignment
    if (role === 'provider' && targetUserId !== userId) {
      const [link] = await db
        .select()
        .from(providerPatient)
        .where(
          and(
            eq(providerPatient.providerId, userId),
            eq(providerPatient.patientId, targetUserId),
            eq(providerPatient.status, 'active')
          )
        )
        .limit(1);

      if (!link) {
        logger.warn('Provider unauthorized patient access attempt', {
          providerId: userId,
          patientId: targetUserId,
          componentType,
        });
        return errorResponse('Not authorized to access this patient', 403);
      }

      // Log provider access for HIPAA audit trail
      logger.info('Provider accessed patient clinical data', {
        providerId: userId,
        patientId: targetUserId,
        componentType,
        componentId,
      });
    }

    const results = await db
      .select()
      .from(clinicalComponentData)
      .where(
        and(
          eq(clinicalComponentData.userId, targetUserId),
          eq(clinicalComponentData.componentType, componentType),
          eq(clinicalComponentData.componentId, componentId)
        )
      )
      .limit(1);

    if (results.length === 0) {
      throw new NotFoundError('Clinical data not found');
    }

    return successResponse({
      data: results[0].data,
      lastModified: results[0].lastModified,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return errorResponse(error.message, 404);
    }
    logger.error('Error loading clinical data', {
      userId,
      targetUserId,
      componentType,
      componentId,
      error: error instanceof Error ? error.message : String(error),
    });
    return errorResponse('Failed to load clinical data', 500);
  }
});

/**
 * DELETE - Remove clinical component data
 * HIPAA: Tenant-isolated - users can only delete their own data
 */
export const DELETE = withAuth(async (request: NextRequest, { userId }, context) => {
  const db = getDb();
  if (!db) {
    return errorResponse('Database unavailable', 503);
  }

  const { componentType, componentId } = await context.params;

  try {
    await db
      .delete(clinicalComponentData)
      .where(
        and(
          eq(clinicalComponentData.userId, userId),
          eq(clinicalComponentData.componentType, componentType),
          eq(clinicalComponentData.componentId, componentId)
        )
      );

    return successResponse({ deleted: true });
  } catch (error) {
    logger.error('Error deleting clinical data', {
      userId,
      componentType,
      componentId,
      error: error instanceof Error ? error.message : String(error),
    });
    return errorResponse('Failed to delete clinical data', 500);
  }
});
