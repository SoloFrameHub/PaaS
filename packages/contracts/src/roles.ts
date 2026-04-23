import { z } from 'zod';

// ADR 0007 — fixed role registry. New roles require a platform PR.
// Blueprint §B: a vertical *enables* roles, doesn't *define* them.
export const RoleZ = z.enum([
  'super_admin',
  'tenant_admin',
  'operator',
  'member',
  'external_partner',
]);
export type Role = z.infer<typeof RoleZ>;

export const ROLES: readonly Role[] = RoleZ.options;
