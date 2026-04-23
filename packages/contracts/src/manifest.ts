import { z } from 'zod';
import { RoleZ } from './roles.js';
import { EventNameZ } from './events.js';

// Blueprint §7.2 — vertical manifest schema.

export const ManifestKindZ = z.enum(['first_party', 'licensed', 'self_serve']);
export type ManifestKind = z.infer<typeof ManifestKindZ>;

export const ModuleEnablementZ = z
  .object({
    content: z.object({ rootPath: z.string() }).optional(),
    assessments: z.object({}).optional(),
    artifacts: z
      .object({ exporters: z.array(z.enum(['pdf', 'csv', 'json'])).optional() })
      .optional(),
    knowledge: z
      .object({ vector: z.enum(['pgvector', 'qdrant']).default('pgvector') })
      .optional(),
    roleplay: z.object({ voice: z.boolean().default(false) }).optional(),
    voice: z.object({}).optional(),
    community: z
      .object({ provider: z.enum(['flarum', 'nodebb', 'native']) })
      .optional(),
    workflows: z.object({}).optional(),
    gamification: z
      .object({ xpLevels: z.array(z.number().int()).optional() })
      .optional(),
    classifier: z.object({ provider: z.enum(['maia', 'openai-mod']) }).optional(),
    billing: z.object({}).optional(),
  })
  .strict();
export type ModuleEnablement = z.infer<typeof ModuleEnablementZ>;

export const CompliancePolicyZ = z
  .object({
    phi: z.boolean().default(false),
    gdpr: z.boolean().default(true),
    dataRetentionDays: z.number().int().positive().default(395),
    redactPromptsInAudit: z.boolean().default(false),
  })
  .strict();
export type CompliancePolicy = z.infer<typeof CompliancePolicyZ>;

export const AIConfigZ = z
  .object({
    modelOverrides: z.record(z.string()).default({}),
    temperature: z.record(z.number()).default({}),
    guardrails: z.array(z.string()).default([]),
  })
  .strict();
export type AIConfig = z.infer<typeof AIConfigZ>;

export const VerticalManifestZ = z
  .object({
    $schema: z.literal('https://platform.tld/schemas/vertical-manifest/v1'),
    id: z.string().regex(/^[a-z][a-z0-9-]{1,30}$/),
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    kind: ManifestKindZ,
    parentManifest: z.string().optional(),
    displayName: z.string().min(1).max(80),
    modules: ModuleEnablementZ,
    compliance: CompliancePolicyZ,
    ai: AIConfigZ,
    branding: z.object({ themePath: z.string().default('./branding/theme.json') }),
    navigation: z.object({ path: z.string().default('./navigation.json') }),
    prompts: z.array(
      z.object({ task: z.string(), path: z.string(), version: z.string() }),
    ),
    knowledge: z.array(
      z.object({ id: z.string(), path: z.string(), version: z.string() }),
    ),
    scenarios: z
      .array(z.object({ id: z.string(), path: z.string(), version: z.string() }))
      .default([]),
    assessments: z
      .array(
        z.object({
          id: z.string(),
          path: z.string(),
          version: z.string(),
          instrumentRef: z.string().optional(),
        }),
      )
      .default([]),
    artifacts: z
      .array(z.object({ id: z.string(), path: z.string(), version: z.string() }))
      .default([]),
    workflows: z
      .array(z.object({ id: z.string(), path: z.string(), version: z.string() }))
      .default([]),
    events: z.array(EventNameZ),
    roles: z.array(RoleZ),
    billingPlans: z.array(z.string()),
    features: z.record(z.boolean()).default({}),
    extensions: z
      .array(z.object({ id: z.string(), path: z.string() }))
      .default([]),
  })
  .strict();
export type VerticalManifest = z.infer<typeof VerticalManifestZ>;

// Lock file — §7.3
export const ManifestLockZ = z.object({
  manifest: z.object({
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
  }),
  engines: z.record(z.string()),
  assets: z.record(z.string().regex(/^sha256:[a-f0-9]{64}$/)),
});
export type ManifestLock = z.infer<typeof ManifestLockZ>;
