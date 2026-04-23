import { z } from 'zod';
import { registry } from './registry';

export const SuccessResponseSchema = z.object({
  data: z.any(),
}).openapi('SuccessResponse');

export const ErrorResponseSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
    details: z.any().optional(),
  }),
}).openapi('ErrorResponse');

export const UnauthorizedResponseSchema = z.object({
  error: z.object({
    message: z.literal('Unauthorized'),
    code: z.literal('UNAUTHORIZED'),
  }),
}).openapi('UnauthorizedResponse');

registry.register('SuccessResponse', SuccessResponseSchema);
registry.register('ErrorResponse', ErrorResponseSchema);
registry.register('UnauthorizedResponse', UnauthorizedResponseSchema);
