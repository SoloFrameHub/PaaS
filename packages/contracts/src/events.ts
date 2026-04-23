import { z } from 'zod';

// ADR 0007 — declared event registry. New event names require a platform PR.
// Blueprint §B / §7.7: verticals list event names; billing + analytics depend on
// legibility across tenants.
export const EventNameZ = z.enum([
  'lesson.completed',
  'assessment.scored',
  'artifact.created',
  'artifact.updated',
  'crisis.flagged',
  'moderation.action',
  'ai.call.completed',
  'session.created',
  'user.onboarded',
  'roleplay.completed',
  'workflow.step.completed',
  'workflow.run.completed',
]);
export type EventName = z.infer<typeof EventNameZ>;

export const EVENT_NAMES: readonly EventName[] = EventNameZ.options;

export const EventEnvelopeZ = z.object({
  id: z.string().min(1),
  name: EventNameZ,
  tenantId: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  occurredAt: z.string().datetime(),
  payload: z.record(z.unknown()).default({}),
  traceId: z.string().optional(),
});
export type EventEnvelope = z.infer<typeof EventEnvelopeZ>;
