-- 0001_tenancy.sql
-- Implementation Blueprint §6.1, §6.4, §6.5, §6.7.
-- Creates: Postgres roles, tenant/tenant_member/tenant_audit/tenant_quota_counter,
--          billing_meter_event/billing_meter_daily, event_outbox/event_dispatch_log,
--          plus the helper SET LOCAL plumbing.
--
-- This file is idempotent enough for first apply but is NOT a re-runnable
-- migration: production runs through Drizzle's migration runner from
-- packages/tenancy/src/schema/. This SQL is the canonical reference.

BEGIN;

-- ────────────────────────────────────────────────────────────────────
-- Extensions
-- ────────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS pgcrypto;  -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS vector;    -- pgvector for knowledge_chunk later

-- ────────────────────────────────────────────────────────────────────
-- Roles (§6.7)
-- ────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'platform_system') THEN
    CREATE ROLE platform_system NOBYPASSRLS NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'platform_tenant') THEN
    CREATE ROLE platform_tenant NOBYPASSRLS NOLOGIN;
  END IF;
END $$;

-- The application login role inherits both; SET LOCAL ROLE switches per tx.
-- Provisioned out-of-band (passwords live in Dokploy env): we only ensure it
-- inherits from the two policy roles if it already exists.
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_user') THEN
    GRANT platform_system, platform_tenant TO app_user;
  END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- Global tables (§6.1) — no tenant_id
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS tenant (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z][a-z0-9-]{1,62}$'),
  kind               TEXT NOT NULL CHECK (kind IN ('first_party','licensed','self_serve')),
  tier               TEXT NOT NULL CHECK (tier IN ('pooled','isolated','dedicated')),
  parent_manifest_id TEXT,
  manifest_version   TEXT NOT NULL CHECK (manifest_version ~ '^\d+\.\d+\.\d+$'),
  status             TEXT NOT NULL CHECK (status IN ('active','suspended','archived')),
  domains            JSONB NOT NULL DEFAULT '{}',
  region             TEXT NOT NULL CHECK (region IN ('shared-eu','shared-us','dedicated')),
  pii                JSONB NOT NULL DEFAULT '{"phi":false,"gdpr":true}',
  plan               JSONB NOT NULL DEFAULT '{}',
  owner_user_id      UUID NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS tenant_kind_status_idx ON tenant (kind, status);

CREATE TABLE IF NOT EXISTS tenant_member (
  tenant_id  UUID NOT NULL REFERENCES tenant(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL,
  role       TEXT NOT NULL CHECK (role IN
              ('super_admin','tenant_admin','operator','member','external_partner')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, user_id)
);
CREATE INDEX IF NOT EXISTS tenant_member_user_idx ON tenant_member (user_id);

-- §6.4 — audit log (partitioning deferred to ops; pg_partman later)
CREATE TABLE IF NOT EXISTS tenant_audit (
  id            BIGSERIAL PRIMARY KEY,
  tenant_id     UUID NOT NULL,
  occurred_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id       UUID,
  actor_kind    TEXT NOT NULL CHECK (actor_kind IN ('user','system','workflow','api_key')),
  action        TEXT NOT NULL,
  resource_kind TEXT NOT NULL,
  resource_id   TEXT,
  outcome       TEXT NOT NULL CHECK (outcome IN ('ok','denied','error')),
  meta          JSONB NOT NULL DEFAULT '{}',
  redacted      BOOLEAN NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS tenant_audit_tenant_time_idx
  ON tenant_audit (tenant_id, occurred_at DESC);

CREATE TABLE IF NOT EXISTS system_audit (
  id            BIGSERIAL PRIMARY KEY,
  occurred_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id       UUID,
  actor_kind    TEXT NOT NULL CHECK (actor_kind IN ('user','system','workflow','api_key')),
  action        TEXT NOT NULL,
  resource_kind TEXT NOT NULL,
  resource_id   TEXT,
  outcome       TEXT NOT NULL CHECK (outcome IN ('ok','denied','error')),
  meta          JSONB NOT NULL DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS system_audit_time_idx ON system_audit (occurred_at DESC);

-- §6.5 — quota counters (Redis is the hot-path; this is the reconciliation table)
CREATE TABLE IF NOT EXISTS tenant_quota_counter (
  tenant_id UUID NOT NULL,
  metric    TEXT NOT NULL,
  period    TEXT NOT NULL,  -- 'day' | 'month' | 'billing_cycle'
  window_start DATE NOT NULL,
  amount    BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (tenant_id, metric, period, window_start)
);

-- §6.5 — metering raw events
CREATE TABLE IF NOT EXISTS billing_meter_event (
  id          BIGSERIAL PRIMARY KEY,
  tenant_id   UUID NOT NULL,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metric      TEXT NOT NULL CHECK (metric IN
                ('ai.tokens.in','ai.tokens.out','storage.bytes','mau','emails.outbound')),
  dimensions  JSONB NOT NULL DEFAULT '{}',
  amount      BIGINT NOT NULL,
  unit        TEXT NOT NULL CHECK (unit IN ('token','byte','user','email'))
);
CREATE INDEX IF NOT EXISTS billing_meter_tenant_metric_time_idx
  ON billing_meter_event (tenant_id, metric, occurred_at);

CREATE TABLE IF NOT EXISTS billing_meter_daily (
  tenant_id UUID NOT NULL,
  day       DATE NOT NULL,
  metric    TEXT NOT NULL,
  amount    BIGINT NOT NULL,
  PRIMARY KEY (tenant_id, day, metric)
);

-- §C.4 — Postgres-as-event-bus: outbox + dispatch log
CREATE TABLE IF NOT EXISTS event_outbox (
  id           BIGSERIAL PRIMARY KEY,
  tenant_id    UUID,                            -- nullable for system events
  name         TEXT NOT NULL,
  occurred_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  payload      JSONB NOT NULL DEFAULT '{}',
  trace_id     TEXT,
  dispatched_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS event_outbox_undispatched_idx
  ON event_outbox (occurred_at)
  WHERE dispatched_at IS NULL;

CREATE TABLE IF NOT EXISTS event_dispatch_log (
  id            BIGSERIAL PRIMARY KEY,
  outbox_id     BIGINT NOT NULL REFERENCES event_outbox(id) ON DELETE CASCADE,
  subscriber    TEXT NOT NULL,
  attempted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  outcome       TEXT NOT NULL CHECK (outcome IN ('ok','retry','dead')),
  error         TEXT
);
CREATE INDEX IF NOT EXISTS event_dispatch_log_outbox_idx
  ON event_dispatch_log (outbox_id);

-- LISTEN/NOTIFY trigger so in-process workers can wake on insert.
CREATE OR REPLACE FUNCTION notify_event_outbox() RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('event_outbox', NEW.id::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS event_outbox_notify ON event_outbox;
CREATE TRIGGER event_outbox_notify
  AFTER INSERT ON event_outbox
  FOR EACH ROW EXECUTE FUNCTION notify_event_outbox();

-- ────────────────────────────────────────────────────────────────────
-- Grants (RLS policies live in 0002_rls_helpers.sql)
-- ────────────────────────────────────────────────────────────────────

GRANT USAGE ON SCHEMA public TO platform_system, platform_tenant;
GRANT SELECT, INSERT, UPDATE, DELETE ON
  tenant, tenant_member, tenant_audit, system_audit, tenant_quota_counter,
  billing_meter_event, billing_meter_daily, event_outbox, event_dispatch_log
  TO platform_system;
GRANT SELECT, INSERT, UPDATE, DELETE ON
  tenant_member, tenant_audit, tenant_quota_counter,
  billing_meter_event, billing_meter_daily, event_outbox
  TO platform_tenant;
GRANT SELECT ON tenant TO platform_tenant;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public
  TO platform_system, platform_tenant;

COMMIT;
