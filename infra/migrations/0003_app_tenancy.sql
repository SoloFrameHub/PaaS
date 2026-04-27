-- 0003_app_tenancy.sql
-- B-009 phase 2 — bring DWA and GTM app tables under the platform multi-tenant model.
-- Plan: docs/Paas/B-009-migration-plan.md
--
-- This migration is **idempotent across deployments**: each `ALTER TABLE`
-- carries `IF EXISTS` so DBs that only have DWA tables (or only GTM, or
-- both) all converge cleanly. The plan's D-3 decision is "wipe app-data
-- tables on dev — no nullable column phase," so a TRUNCATE block runs
-- BEFORE the ALTER ADD NOT NULL.
--
-- Excluded from this migration (per plan):
--   * `user`, `session` — Lucia auth identity. Stay app-local until
--     `@platform/identity` claims them in a separate migration.
--   * `book_search_index` (GTM) — system-only catalog content; reads
--     via `withSystemAdmin`. Gets `system_bypass` policy only.
--
-- Requires:
--   * 0001_tenancy.sql applied (creates `tenant`, roles, `apply_tenant_policies()`-receiving infra)
--   * 0002_rls_helpers.sql applied (defines `apply_tenant_policies()`)

BEGIN;

-- ────────────────────────────────────────────────────────────────────
-- Phase A — TRUNCATE existing dev/test rows.
--
-- Per D-3: dev rows are throwaway. Wipe so `ADD COLUMN tenant_id uuid
-- NOT NULL` succeeds without backfill. CASCADE so FK chains don't block
-- the truncate. If you hit this migration with production data, STOP
-- and write a backfill plan — don't truncate prod.
-- ────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename IN (
        -- DWA app tables (17)
        'profile','mood_entry','coach_session','lesson_feedback','forum_bookmark',
        'distress_event','provider_profile','provider_patient','patient_assignment',
        'provider_invite','content_embedding','moderation_log','ai_classification_event',
        'forum_topic_classification','content_quality_score','content_atomization_tag',
        'clinical_component_data',
        -- GTM app tables (31; 'profile' + 'lesson_feedback' overlap with DWA)
        'subscription','roleplay_session','lesson_event','chat_session','chat_message',
        'assessment_snapshot','forum_topic_sync','forum_post_sync','content_version',
        'pod','pod_member','member_matching_profile','pod_activity','facilitator_context',
        'persona_activity','forum_analytics_event','nodebb_user_map','activity_event',
        'social_signal','book_purchase','book_reading_event','seo_research',
        'form_submission','user_component_state','form_workflow_log','connected_account',
        'outreach_log','pipeline_deal','document_embedding'
      )
  LOOP
    EXECUTE format('TRUNCATE TABLE %I CASCADE', t);
  END LOOP;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- Phase B — ADD COLUMN tenant_id (NOT NULL, FK to tenant.id).
--
-- ON DELETE RESTRICT — deleting a tenant must explicitly cascade through
-- the onboarding/offboarding tooling. We do NOT silently delete app
-- rows when a tenant row goes away.
-- ────────────────────────────────────────────────────────────────────

-- DWA tables
ALTER TABLE IF EXISTS profile                     ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS mood_entry                  ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS coach_session               ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS lesson_feedback             ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS forum_bookmark              ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS distress_event              ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS provider_profile            ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS provider_patient            ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS patient_assignment          ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS provider_invite             ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS content_embedding           ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS moderation_log              ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS ai_classification_event     ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS forum_topic_classification  ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS content_quality_score       ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS content_atomization_tag     ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS clinical_component_data     ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;

-- GTM tables (excluding overlap with DWA above)
ALTER TABLE IF EXISTS subscription                ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS roleplay_session            ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS lesson_event                ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS chat_session                ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS chat_message                ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS assessment_snapshot         ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS forum_topic_sync            ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS forum_post_sync             ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS content_version             ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS pod                         ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS pod_member                  ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS member_matching_profile     ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS pod_activity                ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS facilitator_context         ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS persona_activity            ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS forum_analytics_event       ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS nodebb_user_map             ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS activity_event              ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS social_signal               ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS book_purchase               ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS book_reading_event          ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS seo_research                ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS form_submission             ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS user_component_state        ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS form_workflow_log           ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS connected_account           ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS outreach_log                ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS pipeline_deal               ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;
ALTER TABLE IF EXISTS document_embedding          ADD COLUMN IF NOT EXISTS tenant_id uuid NOT NULL REFERENCES tenant(id) ON DELETE RESTRICT;

-- ────────────────────────────────────────────────────────────────────
-- Phase C — apply RLS policies via the helper from 0002.
--
-- `apply_tenant_policies('<table>')` enables + forces RLS, drops any
-- pre-existing `tenant_isolation` and `system_bypass` policies, and
-- recreates them with the canonical shape (B-005: clause order is
-- `FOR <op>` before `TO <role>` — the helper's CREATE POLICY uses
-- the default `FOR ALL` so this is safe).
--
-- Wrapped in a DO block with IF EXISTS check so partial DBs (only DWA
-- or only GTM tables) skip the missing tables instead of erroring.
-- ────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename IN (
        -- DWA app tables (17)
        'profile','mood_entry','coach_session','lesson_feedback','forum_bookmark',
        'distress_event','provider_profile','provider_patient','patient_assignment',
        'provider_invite','content_embedding','moderation_log','ai_classification_event',
        'forum_topic_classification','content_quality_score','content_atomization_tag',
        'clinical_component_data',
        -- GTM app tables (31; profile + lesson_feedback dedup with DWA)
        'subscription','roleplay_session','lesson_event','chat_session','chat_message',
        'assessment_snapshot','forum_topic_sync','forum_post_sync','content_version',
        'pod','pod_member','member_matching_profile','pod_activity','facilitator_context',
        'persona_activity','forum_analytics_event','nodebb_user_map','activity_event',
        'social_signal','book_purchase','book_reading_event','seo_research',
        'form_submission','user_component_state','form_workflow_log','connected_account',
        'outreach_log','pipeline_deal','document_embedding'
      )
  LOOP
    PERFORM apply_tenant_policies(t::regclass);
  END LOOP;
END $$;

-- `book_search_index` is system-only (public catalog content shared
-- across all tenants). No `tenant_id`; no `tenant_isolation` policy.
-- Reads happen via `withSystemAdmin` (role = platform_system).
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'book_search_index') THEN
    EXECUTE 'ALTER TABLE book_search_index ENABLE ROW LEVEL SECURITY';
    EXECUTE 'ALTER TABLE book_search_index FORCE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS system_bypass ON book_search_index';
    EXECUTE $p$
      CREATE POLICY system_bypass ON book_search_index
        TO platform_system
        USING (true) WITH CHECK (true)
    $p$;
    -- Public-read for tenants — same content for all, no isolation.
    EXECUTE 'DROP POLICY IF EXISTS public_read ON book_search_index';
    EXECUTE $p$
      CREATE POLICY public_read ON book_search_index
        FOR SELECT
        TO platform_tenant
        USING (true)
    $p$;
  END IF;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- Phase D — tenant_id-leading composite indexes.
--
-- RLS forces `tenant_id = X` as a predicate on every query. Without a
-- tenant_id-leading index, the planner falls back to a seq scan + filter
-- — which is fine on a small tenant but degrades fast at scale.
--
-- Strategy:
--   * Single-column `(tenant_id)` for every migrated table.
--   * `(tenant_id, user_id)` for tables whose existing access pattern
--     is `WHERE user_id = $1` (most app tables).
--   * Specialized composites only where the existing schema already
--     had a non-tenant index for the same column — we mirror those.
--
-- All `IF NOT EXISTS` so re-runs are idempotent.
-- ────────────────────────────────────────────────────────────────────

-- Base (tenant_id) indexes for every table — covers the "no other
-- predicate" baseline access path.
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename IN (
        'profile','mood_entry','coach_session','lesson_feedback','forum_bookmark',
        'distress_event','provider_profile','provider_patient','patient_assignment',
        'provider_invite','content_embedding','moderation_log','ai_classification_event',
        'forum_topic_classification','content_quality_score','content_atomization_tag',
        'clinical_component_data',
        'subscription','roleplay_session','lesson_event','chat_session','chat_message',
        'assessment_snapshot','forum_topic_sync','forum_post_sync','content_version',
        'pod','pod_member','member_matching_profile','pod_activity','facilitator_context',
        'persona_activity','forum_analytics_event','nodebb_user_map','activity_event',
        'social_signal','book_purchase','book_reading_event','seo_research',
        'form_submission','user_component_state','form_workflow_log','connected_account',
        'outreach_log','pipeline_deal','document_embedding'
      )
  LOOP
    EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I (tenant_id)',
                   'idx_' || t || '_tenant', t);
  END LOOP;
END $$;

-- (tenant_id, user_id) composites for tables that filter by user_id.
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename IN (
        -- DWA tables with user_id (or providerId/patientId acting as user_id)
        'profile','mood_entry','coach_session','lesson_feedback','forum_bookmark',
        'distress_event','provider_profile',
        -- GTM tables with user_id
        'subscription','roleplay_session','lesson_event','chat_session','chat_message',
        'assessment_snapshot','book_purchase','book_reading_event','form_submission',
        'user_component_state','document_embedding'
      )
  LOOP
    -- Use information_schema to verify user_id column exists before creating index;
    -- some tables we list might already use providerId/patientId terminology and
    -- not have a literal user_id column.
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = t AND column_name = 'user_id'
    ) THEN
      EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON %I (tenant_id, user_id)',
                     'idx_' || t || '_tenant_user', t);
    END IF;
  END LOOP;
END $$;

-- ────────────────────────────────────────────────────────────────────
-- Phase E — GRANTs.
--
-- 0001 already granted `SELECT, INSERT, UPDATE, DELETE` on the
-- tenancy-spine tables to platform_system + platform_tenant. App
-- tables predate that grant pass — fix that here.
-- ────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename IN (
        'profile','mood_entry','coach_session','lesson_feedback','forum_bookmark',
        'distress_event','provider_profile','provider_patient','patient_assignment',
        'provider_invite','content_embedding','moderation_log','ai_classification_event',
        'forum_topic_classification','content_quality_score','content_atomization_tag',
        'clinical_component_data',
        'subscription','roleplay_session','lesson_event','chat_session','chat_message',
        'assessment_snapshot','forum_topic_sync','forum_post_sync','content_version',
        'pod','pod_member','member_matching_profile','pod_activity','facilitator_context',
        'persona_activity','forum_analytics_event','nodebb_user_map','activity_event',
        'social_signal','book_purchase','book_search_index','book_reading_event',
        'seo_research','form_submission','user_component_state','form_workflow_log',
        'connected_account','outreach_log','pipeline_deal','document_embedding'
      )
  LOOP
    EXECUTE format(
      'GRANT SELECT, INSERT, UPDATE, DELETE ON %I TO platform_tenant, platform_system',
      t
    );
  END LOOP;
END $$;

-- Sequence grants for `serial` PKs (lesson_feedback in DWA, etc.) —
-- 0001 already covered "ALL SEQUENCES IN SCHEMA public" with USAGE+SELECT
-- but new sequences created since then need explicit grants. The
-- ALL-sequences grant in 0001 only applies to existing sequences at
-- the time it ran; safer to re-run it here to cover any sequences
-- that the app migrations created later.
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO platform_system, platform_tenant;

COMMIT;

-- Verification (run manually after applying):
--   SELECT relname FROM pg_class
--   WHERE relrowsecurity = true AND relkind = 'r'
--   ORDER BY relname;
-- Should include every migrated table above.
--
--   SELECT tablename, policyname FROM pg_policies
--   WHERE schemaname = 'public'
--   ORDER BY tablename, policyname;
-- Should show `tenant_isolation` + `system_bypass` per table (or
-- `public_read` + `system_bypass` for `book_search_index`).
