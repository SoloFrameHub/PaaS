import { z } from 'zod';

// Blueprint §5.1 — tenant data model.
export const TenantKindZ = z.enum(['first_party', 'licensed', 'self_serve']);
export type TenantKind = z.infer<typeof TenantKindZ>;

export const TenantTierZ = z.enum(['pooled', 'isolated', 'dedicated']);
export type TenantTier = z.infer<typeof TenantTierZ>;

export const TenantStatusZ = z.enum(['active', 'suspended', 'archived']);
export type TenantStatus = z.infer<typeof TenantStatusZ>;

export const PlanRefZ = z.object({
  code: z.string().min(1),
  period: z.enum(['monthly', 'annual', 'custom']).default('monthly'),
});
export type PlanRef = z.infer<typeof PlanRefZ>;

export const TenantDomainsZ = z.object({
  primary: z.string().min(1),
  aliases: z.array(z.string().min(1)).optional(),
});
export type TenantDomains = z.infer<typeof TenantDomainsZ>;

export const TenantZ = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z][a-z0-9-]{1,62}$/),
  kind: TenantKindZ,
  tier: TenantTierZ,
  parentManifestId: z.string().optional(),
  manifestVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
  status: TenantStatusZ,
  domains: TenantDomainsZ,
  region: z.enum(['shared-eu', 'shared-us', 'dedicated']),
  pii: z.object({
    phi: z.boolean(),
    gdpr: z.boolean(),
  }),
  plan: PlanRefZ,
  createdAt: z.coerce.date(),
  ownerUserId: z.string().uuid(),
});
export type Tenant = z.infer<typeof TenantZ>;

export const TenantMemberZ = z.object({
  tenantId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['super_admin', 'tenant_admin', 'operator', 'member', 'external_partner']),
  createdAt: z.coerce.date(),
});
export type TenantMember = z.infer<typeof TenantMemberZ>;

// Audit (§6.4)
export const AuditActorKindZ = z.enum(['user', 'system', 'workflow', 'api_key']);
export const AuditOutcomeZ = z.enum(['ok', 'denied', 'error']);

export const TenantAuditZ = z.object({
  id: z.bigint().optional(),
  tenantId: z.string().uuid(),
  occurredAt: z.coerce.date(),
  userId: z.string().uuid().nullable(),
  actorKind: AuditActorKindZ,
  action: z.string().min(1),
  resourceKind: z.string().min(1),
  resourceId: z.string().optional(),
  outcome: AuditOutcomeZ,
  meta: z.record(z.unknown()).default({}),
  redacted: z.boolean().default(false),
});
export type TenantAudit = z.infer<typeof TenantAuditZ>;

// Metering (§6.5)
export const BillingMeterEventZ = z.object({
  id: z.bigint().optional(),
  tenantId: z.string().uuid(),
  occurredAt: z.coerce.date(),
  metric: z.enum([
    'ai.tokens.in',
    'ai.tokens.out',
    'storage.bytes',
    'mau',
    'emails.outbound',
  ]),
  dimensions: z.record(z.string()).default({}),
  amount: z.bigint(),
  unit: z.enum(['token', 'byte', 'user', 'email']),
});
export type BillingMeterEvent = z.infer<typeof BillingMeterEventZ>;
