// Drizzle schema mirroring infra/migrations/0001_tenancy.sql.
// Source of truth for runtime schema is the SQL migration; this file gives
// the engines a typed query surface and is what `withTenant` returns from.

import {
  bigint,
  bigserial,
  boolean,
  date,
  index,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const tenant = pgTable(
  'tenant',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    kind: text('kind').notNull(),
    tier: text('tier').notNull(),
    parentManifestId: text('parent_manifest_id'),
    manifestVersion: text('manifest_version').notNull(),
    status: text('status').notNull(),
    domains: jsonb('domains').notNull().default({}),
    region: text('region').notNull(),
    pii: jsonb('pii').notNull().default({ phi: false, gdpr: true }),
    plan: jsonb('plan').notNull().default({}),
    ownerUserId: uuid('owner_user_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => ({
    kindStatusIdx: index('tenant_kind_status_idx').on(t.kind, t.status),
  }),
);

export const tenantMember = pgTable(
  'tenant_member',
  {
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenant.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').notNull(),
    role: text('role').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tenantId, t.userId] }),
    userIdx: index('tenant_member_user_idx').on(t.userId),
  }),
);

export const tenantAudit = pgTable(
  'tenant_audit',
  {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    tenantId: uuid('tenant_id').notNull(),
    occurredAt: timestamp('occurred_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    userId: uuid('user_id'),
    actorKind: text('actor_kind').notNull(),
    action: text('action').notNull(),
    resourceKind: text('resource_kind').notNull(),
    resourceId: text('resource_id'),
    outcome: text('outcome').notNull(),
    meta: jsonb('meta').notNull().default({}),
    redacted: boolean('redacted').notNull().default(false),
  },
  (t) => ({
    tenantTimeIdx: index('tenant_audit_tenant_time_idx').on(
      t.tenantId,
      t.occurredAt,
    ),
  }),
);

export const systemAudit = pgTable(
  'system_audit',
  {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    occurredAt: timestamp('occurred_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    userId: uuid('user_id'),
    actorKind: text('actor_kind').notNull(),
    action: text('action').notNull(),
    resourceKind: text('resource_kind').notNull(),
    resourceId: text('resource_id'),
    outcome: text('outcome').notNull(),
    meta: jsonb('meta').notNull().default({}),
  },
  (t) => ({
    timeIdx: index('system_audit_time_idx').on(t.occurredAt),
  }),
);

export const tenantQuotaCounter = pgTable(
  'tenant_quota_counter',
  {
    tenantId: uuid('tenant_id').notNull(),
    metric: text('metric').notNull(),
    period: text('period').notNull(),
    windowStart: date('window_start').notNull(),
    // B-032: SQL migration declares this BIGINT NOT NULL DEFAULT 0. The prior
    // `bigserial` binding implied an auto-increment sequence that doesn't
    // exist on this column — inserts that omitted `amount` would fail.
    amount: bigint('amount', { mode: 'bigint' }).notNull().default(0n),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.tenantId, t.metric, t.period, t.windowStart],
    }),
  }),
);

export const billingMeterEvent = pgTable(
  'billing_meter_event',
  {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    tenantId: uuid('tenant_id').notNull(),
    occurredAt: timestamp('occurred_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    metric: text('metric').notNull(),
    dimensions: jsonb('dimensions').notNull().default({}),
    // B-032: SQL declares this BIGINT NOT NULL (caller supplies amount) —
    // bigserial implies an auto-increment sequence that doesn't exist.
    amount: bigint('amount', { mode: 'bigint' }).notNull(),
    unit: text('unit').notNull(),
  },
  (t) => ({
    tenantMetricTimeIdx: index('billing_meter_tenant_metric_time_idx').on(
      t.tenantId,
      t.metric,
      t.occurredAt,
    ),
  }),
);

export const billingMeterDaily = pgTable(
  'billing_meter_daily',
  {
    tenantId: uuid('tenant_id').notNull(),
    day: date('day').notNull(),
    metric: text('metric').notNull(),
    // B-032: same fix as tenantQuotaCounter.amount.
    amount: bigint('amount', { mode: 'bigint' }).notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tenantId, t.day, t.metric] }),
  }),
);

export const eventOutbox = pgTable(
  'event_outbox',
  {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    tenantId: uuid('tenant_id'),
    name: text('name').notNull(),
    occurredAt: timestamp('occurred_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    payload: jsonb('payload').notNull().default({}),
    traceId: text('trace_id'),
    dispatchedAt: timestamp('dispatched_at', { withTimezone: true }),
  },
  (t) => ({
    undispatchedIdx: index('event_outbox_undispatched_idx').on(t.occurredAt),
  }),
);

export const eventDispatchLog = pgTable(
  'event_dispatch_log',
  {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    // B-032: outbox_id is a FK to event_outbox(id), not a new sequence.
    outboxId: bigint('outbox_id', { mode: 'bigint' }).notNull(),
    subscriber: text('subscriber').notNull(),
    attemptedAt: timestamp('attempted_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    outcome: text('outcome').notNull(),
    error: text('error'),
  },
  (t) => ({
    outboxIdx: index('event_dispatch_log_outbox_idx').on(t.outboxId),
  }),
);
