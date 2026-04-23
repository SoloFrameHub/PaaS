import { z } from 'zod';

/**
 * Validation schemas for clinical component data API
 */

export const clinicalDataSaveSchema = z.object({
  componentType: z.string().min(1).max(100),
  componentId: z.string().min(1).max(200),
  courseId: z.string().optional(),
  lessonId: z.string().optional(),
  data: z.record(z.unknown()), // flexible JSONB structure
});

export const clinicalDataParamsSchema = z.object({
  componentType: z.string().min(1).max(100),
  componentId: z.string().min(1).max(200),
});
