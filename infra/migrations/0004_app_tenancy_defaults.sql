-- 0004_app_tenancy_defaults.sql
--
-- B-009 Phase 9 fix: set DEFAULT current_setting('app.tenant_id', true)::uuid
-- on every tenant_id column added by 0003_app_tenancy.sql.
--
-- Why: 0003 declared tenant_id NOT NULL but no default. withTenantApp sets
-- the app.tenant_id GUC for RLS enforcement, but inserts that omit the column
-- still fail with a NOT NULL violation. Setting the column default to read
-- from the GUC makes the implicit tenant context fill the column on insert,
-- matching the Drizzle schema's `.default(sql`...`)` clause.
--
-- The `, true` flag in current_setting makes "missing GUC" return NULL rather
-- than erroring. NULL into NOT NULL still errors at insert time, which is
-- the correct behavior for cross-tenant routes that must specify tenantId
-- explicitly (e.g., admin/content-version, signup-bootstrap).

BEGIN;

ALTER TABLE IF EXISTS profile                     ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS mood_entry                  ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS coach_session               ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS lesson_feedback             ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS forum_bookmark              ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS distress_event              ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS provider_profile            ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS provider_patient            ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS patient_assignment          ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS provider_invite             ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS content_embedding           ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS moderation_log              ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS ai_classification_event     ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS forum_topic_classification  ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS content_quality_score       ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS content_atomization_tag    ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS clinical_component_data     ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;

-- GTM tables (31)
ALTER TABLE IF EXISTS subscription                ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS roleplay_session            ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS lesson_event                ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS chat_session                ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS chat_message                ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS assessment_snapshot         ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS forum_topic_sync            ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS forum_post_sync             ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS content_version             ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS pod                         ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS pod_member                  ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS member_matching_profile     ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS pod_activity                ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS facilitator_context         ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS persona_activity            ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS forum_analytics_event       ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS nodebb_user_map             ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS activity_event              ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS social_signal               ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS book_purchase               ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS book_reading_event          ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS seo_research                ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS form_submission             ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS user_component_state        ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS form_workflow_log           ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS connected_account           ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS outreach_log                ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS pipeline_deal               ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;
ALTER TABLE IF EXISTS document_embedding          ALTER COLUMN tenant_id SET DEFAULT current_setting('app.tenant_id', true)::uuid;

COMMIT;
