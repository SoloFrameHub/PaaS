import { z } from 'zod';
import { registry } from '../registry';

const tags = ['Health'];

export function registerHealthRoutes() {
  registry.registerPath({
    method: 'get',
    path: '/api/health',
    summary: 'Health check for load balancers and monitoring',
    description: 'Returns app and database status. Use ?diag=ai for AI service readiness, ?diag=ai-test for live connectivity test.',
    tags,
    request: {
      query: z.object({
        diag: z.enum(['ai', 'ai-test']).optional(),
      }),
    },
    responses: {
      200: {
        description: 'All systems healthy',
        content: {
          'application/json': {
            schema: z.object({
              status: z.literal('ok'),
              service: z.literal('wellness-academy'),
              checks: z.record(z.string(), z.string()),
            }),
          },
        },
      },
      503: {
        description: 'Degraded — database or service unavailable',
        content: {
          'application/json': {
            schema: z.object({
              status: z.literal('degraded'),
              service: z.literal('wellness-academy'),
              checks: z.record(z.string(), z.string()),
            }),
          },
        },
      },
    },
  });
}
