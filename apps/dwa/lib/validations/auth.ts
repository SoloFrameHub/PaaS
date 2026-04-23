import { z } from 'zod';

// These schemas document the auth API contract for OpenAPI generation.
// The actual auth routes use inline validation — these are not imported at runtime.

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  name: z.string().max(100).optional(),
});
