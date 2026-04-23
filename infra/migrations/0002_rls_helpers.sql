-- 0002_rls_helpers.sql
-- Implementation Blueprint §6.2 Layer 2.
-- Defines:
--   * apply_tenant_policies(table) — drops & recreates the canonical
--     `tenant_isolation` and `system_bypass` policies on a tenant-scoped table.
--   * Applies them to the tenancy tables created in 0001.

BEGIN;

-- Helper: enable RLS + force RLS + add tenant_isolation + system_bypass.
-- Tables MUST have a `tenant_id UUID NOT NULL` column.
CREATE OR REPLACE FUNCTION apply_tenant_policies(target_table regclass)
RETURNS void
LANGUAGE plpgsql
AS $fn$
DECLARE
  tname text := target_table::text;
BEGIN
  EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', tname);
  EXECUTE format('ALTER TABLE %s FORCE ROW LEVEL SECURITY', tname);

  EXECUTE format('DROP POLICY IF EXISTS tenant_isolation ON %s', tname);
  EXECUTE format($p$
    CREATE POLICY tenant_isolation ON %s
      USING (tenant_id = current_setting('app.tenant_id', true)::uuid)
      WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid)
  $p$, tname);

  EXECUTE format('DROP POLICY IF EXISTS system_bypass ON %s', tname);
  EXECUTE format($p$
    CREATE POLICY system_bypass ON %s
      TO platform_system
      USING (true) WITH CHECK (true)
  $p$, tname);
END;
$fn$;

-- Apply to the tenant-scoped tenancy tables from 0001.
SELECT apply_tenant_policies('tenant_member');
SELECT apply_tenant_policies('tenant_audit');
SELECT apply_tenant_policies('tenant_quota_counter');
SELECT apply_tenant_policies('billing_meter_event');
SELECT apply_tenant_policies('billing_meter_daily');

-- event_outbox is dual-purpose (system + tenant); allow tenant-scoped insert
-- but require tenant_id IS NOT NULL or platform_system role.
ALTER TABLE event_outbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_outbox FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS event_outbox_tenant_scope ON event_outbox;
CREATE POLICY event_outbox_tenant_scope ON event_outbox
  USING (
    tenant_id IS NULL
    OR tenant_id = current_setting('app.tenant_id', true)::uuid
  )
  WITH CHECK (
    tenant_id = current_setting('app.tenant_id', true)::uuid
  );

DROP POLICY IF EXISTS event_outbox_system_bypass ON event_outbox;
CREATE POLICY event_outbox_system_bypass ON event_outbox
  TO platform_system
  USING (true) WITH CHECK (true);

-- The `tenant` table itself: tenants can SELECT their own row; system manages all.
ALTER TABLE tenant ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS tenant_self_read ON tenant;
CREATE POLICY tenant_self_read ON tenant
  FOR SELECT
  TO platform_tenant
  USING (id = current_setting('app.tenant_id', true)::uuid);

DROP POLICY IF EXISTS tenant_system_all ON tenant;
CREATE POLICY tenant_system_all ON tenant
  TO platform_system
  USING (true) WITH CHECK (true);

-- system_audit and event_dispatch_log are system-only: only platform_system can touch.
ALTER TABLE system_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_audit FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS system_audit_system_only ON system_audit;
CREATE POLICY system_audit_system_only ON system_audit
  TO platform_system
  USING (true) WITH CHECK (true);

ALTER TABLE event_dispatch_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_dispatch_log FORCE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS event_dispatch_log_system_only ON event_dispatch_log;
CREATE POLICY event_dispatch_log_system_only ON event_dispatch_log
  TO platform_system
  USING (true) WITH CHECK (true);

COMMIT;
