import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, errorResponse, validateBody } from '@/lib/api/response-utils';
import { getDb } from '@/lib/db';
import { clinicalComponentData, providerPatient } from '@/lib/db/schema';
import { clinicalDataSaveSchema } from '@/lib/validations/clinical';
import { eq, and } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import { sanitizeJsonb } from '@/lib/utils/sanitize-jsonb';

/**
 * POST - Save clinical component data
 * PRIVACY: Only saves to Postgres if user has assigned provider
 * HIPAA: Tenant-isolated via userId check
 */
export const POST = withAuth(async (request: NextRequest, { userId }) => {
  const db = getDb();
  if (!db) {
    return errorResponse('Database unavailable', 503);
  }

  const { componentType, componentId, courseId, lessonId, data } = await validateBody(
    request,
    clinicalDataSaveSchema
  );

  try {
    // Verify user has an assigned provider before saving
    const providerLink = await db
      .select({ id: providerPatient.id })
      .from(providerPatient)
      .where(
        and(
          eq(providerPatient.patientId, userId),
          eq(providerPatient.status, 'active')
        )
      )
      .limit(1);

    if (providerLink.length === 0) {
      return errorResponse(
        'Clinical data storage requires provider assignment. Data is private and stored locally only.',
        403
      );
    }

    // Sanitize JSONB data to prevent prototype pollution and DoS
    const sanitizedData = sanitizeJsonb(data);

    // Upsert clinical data
    await db
      .insert(clinicalComponentData)
      .values({
        userId,
        componentType,
        componentId,
        courseId: courseId ?? null,
        lessonId: lessonId ?? null,
        data: sanitizedData,
        lastModified: new Date(),
      })
      .onConflictDoUpdate({
        target: [
          clinicalComponentData.userId,
          clinicalComponentData.componentType,
          clinicalComponentData.componentId,
        ],
        set: {
          data: sanitizedData,
          lastModified: new Date(),
          courseId: courseId ?? null,
          lessonId: lessonId ?? null,
        },
      });

    return successResponse({ saved: true });
  } catch (error) {
    logger.error('Error saving clinical data', {
      userId,
      componentType,
      componentId,
      error: error instanceof Error ? error.message : String(error),
    });
    return errorResponse('Failed to save clinical data', 500);
  }
});
