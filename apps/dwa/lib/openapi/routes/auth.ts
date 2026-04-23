import { z } from 'zod';
import { registry } from '../registry';
import { signinSchema, signupSchema } from '@/lib/validations/auth';

export function registerAuthRoutes() {
  registry.registerPath({
    method: 'post',
    path: '/api/auth/signin',
    summary: 'Sign in with email and password',
    tags: ['Auth'],
    request: {
      body: { content: { 'application/json': { schema: signinSchema } } },
    },
    responses: {
      200: {
        description: 'Sign in successful, sets session cookie',
        content: {
          'application/json': {
            schema: z.object({
              ok: z.literal(true),
              redirect: z.string(),
            }),
          },
        },
      },
      400: { description: 'Invalid credentials' },
      429: { description: 'Rate limited' },
      503: { description: 'Auth not configured (no database)' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/auth/signup',
    summary: 'Create a new account',
    tags: ['Auth'],
    request: {
      body: { content: { 'application/json': { schema: signupSchema } } },
    },
    responses: {
      200: {
        description: 'Account created, session cookie set',
        content: {
          'application/json': {
            schema: z.object({
              ok: z.literal(true),
              redirect: z.string(),
              userId: z.string(),
            }),
          },
        },
      },
      400: { description: 'Validation error or email already in use' },
      429: { description: 'Rate limited' },
      503: { description: 'Auth not configured (no database)' },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/auth/signout',
    summary: 'Sign out and invalidate session',
    tags: ['Auth'],
    responses: {
      200: { description: 'Signed out, session cookie cleared' },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/auth/session',
    summary: 'Get current session user',
    tags: ['Auth'],
    responses: {
      200: {
        description: 'Current authenticated user or null',
        content: {
          'application/json': {
            schema: z.object({
              user: z.object({
                uid: z.string(),
                email: z.string(),
              }).nullable(),
            }),
          },
        },
      },
    },
  });
}
