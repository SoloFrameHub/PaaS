/**
 * Docker entrypoint: runs database migration then starts the Next.js server.
 * Migration is idempotent (CREATE TABLE IF NOT EXISTS).
 */
const { execSync } = require("child_process");

const DATABASE_URL = process.env.DATABASE_URL;

const SQL = `
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY NOT NULL,
  "email" text NOT NULL UNIQUE,
  "hashed_password" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Add email verification columns (idempotent for existing DBs)
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "email_verified" boolean DEFAULT false NOT NULL;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "email_verification_code" text;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "email_verification_expires_at" timestamp with time zone;

-- Add password reset columns (idempotent for existing DBs)
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "password_reset_code" text;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "password_reset_expires_at" timestamp with time zone;

CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "expires_at" timestamp with time zone NOT NULL
);

CREATE TABLE IF NOT EXISTS "profile" (
  "user_id" text PRIMARY KEY NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "data" jsonb NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Subscription tracking (Polar.sh payments)
CREATE TABLE IF NOT EXISTS "subscription" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL UNIQUE REFERENCES "user"("id") ON DELETE CASCADE,
  "polar_customer_id" text,
  "polar_product_id" text,
  "polar_subscription_id" text,
  "status" text NOT NULL DEFAULT 'inactive',
  "current_period_end" timestamp with time zone,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_subscription_user" ON "subscription"("user_id");
CREATE INDEX IF NOT EXISTS "idx_subscription_polar_customer" ON "subscription"("polar_customer_id");

CREATE TABLE IF NOT EXISTS "roleplay_session" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "industry_id" text NOT NULL,
  "role_id" text NOT NULL,
  "disc_type" text NOT NULL,
  "transcript" jsonb NOT NULL,
  "evaluation" jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Analytics: lesson-level event tracking for time-series analysis
CREATE TABLE IF NOT EXISTS "lesson_event" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "course_id" text NOT NULL,
  "lesson_id" text NOT NULL,
  "event_type" text NOT NULL,
  "xp_earned" integer DEFAULT 0,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_lesson_event_user_course" ON "lesson_event"("user_id", "course_id");
CREATE INDEX IF NOT EXISTS "idx_lesson_event_created" ON "lesson_event"("created_at");

-- Analytics: persist AI coaching chat sessions
CREATE TABLE IF NOT EXISTS "chat_session" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "context_course_id" text,
  "context_lesson_id" text,
  "context_section_id" text,
  "message_count" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "ended_at" timestamp with time zone
);
CREATE INDEX IF NOT EXISTS "idx_chat_session_user" ON "chat_session"("user_id");

CREATE TABLE IF NOT EXISTS "chat_message" (
  "id" text PRIMARY KEY NOT NULL,
  "session_id" text NOT NULL REFERENCES "chat_session"("id") ON DELETE CASCADE,
  "role" text NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_chat_message_session" ON "chat_message"("session_id");

-- Analytics: historical assessment snapshots
CREATE TABLE IF NOT EXISTS "assessment_snapshot" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "overall_readiness" numeric NOT NULL,
  "icp_clarity" numeric NOT NULL,
  "positioning_strength" numeric NOT NULL,
  "messaging_consistency" numeric NOT NULL,
  "channel_readiness" numeric NOT NULL,
  "sales_process_maturity" numeric NOT NULL,
  "recommended_path" text NOT NULL,
  "recommended_start_course" integer NOT NULL,
  "quick_wins_count" integer NOT NULL,
  "critical_gaps_count" integer NOT NULL,
  "full_assessment" jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_assessment_snapshot_user" ON "assessment_snapshot"("user_id");

-- Analytics: NodeBB forum data mirror
CREATE TABLE IF NOT EXISTS "forum_topic_sync" (
  "nodebb_tid" integer PRIMARY KEY NOT NULL,
  "title" text NOT NULL,
  "category_name" text,
  "slug" text,
  "user_name" text,
  "post_count" integer DEFAULT 0,
  "view_count" integer DEFAULT 0,
  "vote_count" integer DEFAULT 0,
  "timestamp_ms" bigint NOT NULL,
  "last_post_timestamp_ms" bigint,
  "synced_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "forum_post_sync" (
  "nodebb_pid" integer PRIMARY KEY NOT NULL,
  "nodebb_tid" integer NOT NULL REFERENCES "forum_topic_sync"("nodebb_tid") ON DELETE CASCADE,
  "user_name" text,
  "content_preview" text,
  "vote_count" integer DEFAULT 0,
  "timestamp_ms" bigint NOT NULL,
  "synced_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_forum_post_tid" ON "forum_post_sync"("nodebb_tid");

-- Analytics: manuscript/curriculum version tracking
CREATE TABLE IF NOT EXISTS "content_version" (
  "id" text PRIMARY KEY NOT NULL,
  "entity_type" text NOT NULL,
  "entity_id" text NOT NULL,
  "version_label" text NOT NULL,
  "change_summary" text NOT NULL,
  "changed_by" text,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_content_version_entity" ON "content_version"("entity_type", "entity_id");

-- Seed initial curriculum version
INSERT INTO "content_version" ("id", "entity_type", "entity_id", "version_label", "change_summary", "created_at")
SELECT 'cv_initial', 'curriculum', 'v3', '1.0.0', 'Initial curriculum with MAGNET framework across 6 tracks', now()
WHERE NOT EXISTS (SELECT 1 FROM "content_version" WHERE "id" = 'cv_initial');

-- Cohort Forum: Pods
CREATE TABLE IF NOT EXISTS "pod" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "status" text NOT NULL DEFAULT 'active',
  "curriculum_stage" text NOT NULL,
  "deal_size_tier" text,
  "nodebb_category_id" integer,
  "max_members" integer NOT NULL DEFAULT 6,
  "current_member_count" integer NOT NULL DEFAULT 0,
  "week_number" integer NOT NULL DEFAULT 1,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_pod_status" ON "pod"("status");

CREATE TABLE IF NOT EXISTS "pod_member" (
  "id" text PRIMARY KEY NOT NULL,
  "pod_id" text NOT NULL REFERENCES "pod"("id") ON DELETE CASCADE,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "status" text NOT NULL DEFAULT 'active',
  "joined_at" timestamp with time zone DEFAULT now() NOT NULL,
  "last_active_at" timestamp with time zone,
  "post_count" integer DEFAULT 0,
  "engagement_score" integer DEFAULT 0
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_pod_member_unique" ON "pod_member"("pod_id", "user_id");
CREATE INDEX IF NOT EXISTS "idx_pod_member_user" ON "pod_member"("user_id");
CREATE INDEX IF NOT EXISTS "idx_pod_member_pod" ON "pod_member"("pod_id");

CREATE TABLE IF NOT EXISTS "member_matching_profile" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL UNIQUE REFERENCES "user"("id") ON DELETE CASCADE,
  "curriculum_stage" text NOT NULL,
  "business_context" jsonb NOT NULL,
  "disc_profile" jsonb NOT NULL,
  "time_commitment" text NOT NULL,
  "learning_goals" jsonb,
  "pain_points" jsonb,
  "matched_pod_id" text REFERENCES "pod"("id"),
  "survey_completed_at" timestamp with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "pod_activity" (
  "id" text PRIMARY KEY NOT NULL,
  "pod_id" text NOT NULL REFERENCES "pod"("id") ON DELETE CASCADE,
  "user_id" text REFERENCES "user"("id") ON DELETE SET NULL,
  "event_type" text NOT NULL,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_pod_activity_pod" ON "pod_activity"("pod_id");
CREATE INDEX IF NOT EXISTS "idx_pod_activity_created" ON "pod_activity"("created_at");

CREATE TABLE IF NOT EXISTS "facilitator_context" (
  "id" text PRIMARY KEY NOT NULL,
  "pod_id" text NOT NULL REFERENCES "pod"("id") ON DELETE CASCADE,
  "week_number" integer NOT NULL,
  "member_contexts" jsonb NOT NULL,
  "pod_health_score" integer,
  "ai_summary" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_facilitator_pod_week" ON "facilitator_context"("pod_id", "week_number");

CREATE TABLE IF NOT EXISTS "persona_activity" (
  "id" text PRIMARY KEY NOT NULL,
  "pod_id" text NOT NULL REFERENCES "pod"("id") ON DELETE CASCADE,
  "persona_id" text NOT NULL,
  "post_count" integer NOT NULL DEFAULT 0,
  "last_posted_at" timestamp with time zone,
  "fade_out_status" text DEFAULT 'active',
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_persona_pod_unique" ON "persona_activity"("pod_id", "persona_id");

CREATE TABLE IF NOT EXISTS "forum_analytics_event" (
  "id" text PRIMARY KEY NOT NULL,
  "event_type" text NOT NULL,
  "user_id" text REFERENCES "user"("id") ON DELETE SET NULL,
  "pod_id" text REFERENCES "pod"("id") ON DELETE SET NULL,
  "nodebb_category_id" integer,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_forum_analytics_type" ON "forum_analytics_event"("event_type");
CREATE INDEX IF NOT EXISTS "idx_forum_analytics_pod" ON "forum_analytics_event"("pod_id");

-- User component state persistence (MDX interactive components)
CREATE TABLE IF NOT EXISTS "user_component_state" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "component_type" text NOT NULL,
  "persist_key" text NOT NULL,
  "state" jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_component_state_user_key"
  ON "user_component_state"("user_id", "component_type", "persist_key");
CREATE INDEX IF NOT EXISTS "idx_component_state_user"
  ON "user_component_state"("user_id");

-- Intelligence: social media signal tracking
CREATE TABLE IF NOT EXISTS "social_signal" (
  "id" text PRIMARY KEY NOT NULL,
  "platform" text NOT NULL,
  "signal_type" text NOT NULL,
  "content_preview" text,
  "author" text,
  "url" text,
  "sentiment" text DEFAULT 'neutral',
  "relevance_score" integer DEFAULT 50,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_social_signal_platform" ON "social_signal"("platform");
CREATE INDEX IF NOT EXISTS "idx_social_signal_created" ON "social_signal"("created_at");

-- Intelligence: SEO research / NeuronWriter data
CREATE TABLE IF NOT EXISTS "seo_research" (
  "id" text PRIMARY KEY NOT NULL,
  "keyword" text NOT NULL,
  "search_volume" integer,
  "difficulty" integer,
  "current_position" integer,
  "target_url" text,
  "content_score" integer,
  "recommendations" jsonb,
  "source" text DEFAULT 'neuronwriter',
  "metadata" jsonb,
  "researched_at" timestamp with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_seo_keyword" ON "seo_research"("keyword");

-- Book: standalone one-time purchases (separate from subscription)
CREATE TABLE IF NOT EXISTS "book_purchase" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "polar_order_id" text,
  "polar_customer_id" text,
  "polar_product_id" text,
  "status" text NOT NULL DEFAULT 'active',
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_book_purchase_user" ON "book_purchase"("user_id");
CREATE INDEX IF NOT EXISTS "idx_book_purchase_polar_order" ON "book_purchase"("polar_order_id");

-- Book: full-text search index
CREATE TABLE IF NOT EXISTS "book_search_index" (
  "chapter_id" text PRIMARY KEY NOT NULL,
  "chapter_title" text NOT NULL,
  "is_free" boolean NOT NULL DEFAULT false,
  "plain_text" text NOT NULL,
  "search_vector" tsvector,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_book_search_vector" ON "book_search_index" USING GIN("search_vector");

-- Book: reading progress events
CREATE TABLE IF NOT EXISTS "book_reading_event" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "chapter_id" text NOT NULL,
  "event_type" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_book_reading_user" ON "book_reading_event"("user_id");
CREATE INDEX IF NOT EXISTS "idx_book_reading_chapter" ON "book_reading_event"("chapter_id");

-- Native Forms: submission storage
CREATE TABLE IF NOT EXISTS "form_submission" (
  "id" text PRIMARY KEY NOT NULL,
  "form_slug" text NOT NULL,
  "email" text NOT NULL,
  "name" text,
  "data" jsonb NOT NULL,
  "score" integer,
  "score_breakdown" jsonb,
  "status" text NOT NULL DEFAULT 'new',
  "admin_notes" text,
  "ip_address" text,
  "user_agent" text,
  "utm_source" text,
  "utm_medium" text,
  "utm_campaign" text,
  "referrer" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_form_submission_slug" ON "form_submission"("form_slug");
CREATE INDEX IF NOT EXISTS "idx_form_submission_email" ON "form_submission"("email");
CREATE INDEX IF NOT EXISTS "idx_form_submission_status" ON "form_submission"("status");
CREATE INDEX IF NOT EXISTS "idx_form_submission_created" ON "form_submission"("created_at");

-- Native Forms: workflow execution log
CREATE TABLE IF NOT EXISTS "form_workflow_log" (
  "id" text PRIMARY KEY NOT NULL,
  "submission_id" text NOT NULL REFERENCES "form_submission"("id") ON DELETE CASCADE,
  "workflow_type" text NOT NULL,
  "status" text NOT NULL DEFAULT 'pending',
  "response_data" jsonb,
  "error_message" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_form_workflow_submission" ON "form_workflow_log"("submission_id");

-- Community: NodeBB user mapping
CREATE TABLE IF NOT EXISTS "nodebb_user_map" (
  "user_id" text PRIMARY KEY NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "nodebb_uid" integer NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Community: activity events (gamification feed)
CREATE TABLE IF NOT EXISTS "activity_event" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "event_type" text NOT NULL,
  "title" text NOT NULL,
  "description" text,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Connected Accounts (Attio, Notion integrations)
CREATE TABLE IF NOT EXISTS "connected_account" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "provider" text NOT NULL,
  "access_token_encrypted" text NOT NULL,
  "refresh_token_encrypted" text,
  "token_expires_at" timestamp with time zone,
  "provider_account_id" text,
  "provider_metadata" jsonb,
  "status" text NOT NULL DEFAULT 'active',
  "last_synced_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "idx_connected_account_unique" ON "connected_account"("user_id", "provider");
CREATE INDEX IF NOT EXISTS "idx_connected_account_user" ON "connected_account"("user_id");

-- Outreach Log (manual daily activity tracking)
CREATE TABLE IF NOT EXISTS "outreach_log" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "prospect_name" text NOT NULL,
  "prospect_company" text,
  "channel" text NOT NULL,
  "action" text NOT NULL,
  "notes" text,
  "outcome" text,
  "deal_id" text,
  "metadata" jsonb,
  "logged_at" timestamp with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_outreach_log_user" ON "outreach_log"("user_id");
CREATE INDEX IF NOT EXISTS "idx_outreach_log_logged_at" ON "outreach_log"("logged_at");
CREATE INDEX IF NOT EXISTS "idx_outreach_log_user_channel" ON "outreach_log"("user_id", "channel");

-- Pipeline Deals (Kanban board, later syncs with Attio)
CREATE TABLE IF NOT EXISTS "pipeline_deal" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "prospect_name" text NOT NULL,
  "prospect_company" text,
  "prospect_email" text,
  "prospect_linkedin" text,
  "stage" text NOT NULL DEFAULT 'lead',
  "deal_value" integer,
  "currency" text DEFAULT 'USD',
  "probability" integer,
  "expected_close_date" timestamp with time zone,
  "loss_reason" text,
  "attio_record_id" text,
  "notes" text,
  "metadata" jsonb,
  "stage_changed_at" timestamp with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_pipeline_deal_user" ON "pipeline_deal"("user_id");
CREATE INDEX IF NOT EXISTS "idx_pipeline_deal_user_stage" ON "pipeline_deal"("user_id", "stage");

-- Lesson feedback (thumbs up/down + optional comment)
CREATE TABLE IF NOT EXISTS "lesson_feedback" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "course_id" text NOT NULL,
  "lesson_id" text NOT NULL,
  "sentiment" text NOT NULL,
  "category" text,
  "comment" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "idx_lesson_feedback_lesson" ON "lesson_feedback"("course_id", "lesson_id");
CREATE INDEX IF NOT EXISTS "idx_lesson_feedback_user" ON "lesson_feedback"("user_id");

-- pgvector extension for RAG document embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Document embeddings for RAG pipeline
CREATE TABLE IF NOT EXISTS "document_embedding" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "document_id" text NOT NULL,
  "chunk_index" integer NOT NULL,
  "chunk_text" text NOT NULL,
  "embedding" vector(1536) NOT NULL,
  "source" text NOT NULL DEFAULT 'document',
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE "document_embedding" ADD COLUMN IF NOT EXISTS "source" text NOT NULL DEFAULT 'document';
CREATE INDEX IF NOT EXISTS "idx_doc_embedding_user" ON "document_embedding"("user_id");
CREATE INDEX IF NOT EXISTS "idx_doc_embedding_doc" ON "document_embedding"("user_id", "document_id");
`;

const VIEWS_SQL = `
-- Metabase view: flattened user progress
CREATE OR REPLACE VIEW v_user_progress AS
SELECT
  p.user_id,
  u.email,
  u.created_at AS user_created_at,
  (p.data->>'name') AS name,
  (p.data->>'businessModel') AS business_model,
  (p.data->>'stage') AS stage,
  (p.data->'progress'->>'currentCourse')::integer AS current_course,
  (p.data->'progress'->>'xpTotal')::integer AS xp_total,
  jsonb_array_length(COALESCE(p.data->'progress'->'completedCourses', '[]'::jsonb)) AS completed_courses_count,
  (p.data->'progress'->>'lastActivityAt')::timestamp AS last_activity_at,
  (p.data->>'onboardingCompleted')::boolean AS onboarding_completed,
  (p.data->>'onboardingCompletedAt')::timestamp AS onboarding_completed_at,
  p.updated_at AS profile_updated_at
FROM profile p
JOIN "user" u ON u.id = p.user_id;

-- Metabase view: one row per completed lesson
CREATE OR REPLACE VIEW v_completed_lessons_flat AS
SELECT
  p.user_id,
  course_kv.key AS course_id,
  lesson_id.value #>> '{}' AS lesson_id
FROM profile p,
  jsonb_each(COALESCE(p.data->'progress'->'completedLessons', '{}'::jsonb)) AS course_kv(key, value),
  jsonb_array_elements(course_kv.value) AS lesson_id(value);

-- Metabase view: flattened assessment scores
CREATE OR REPLACE VIEW v_assessment_scores AS
SELECT
  p.user_id,
  (p.data->'assessment'->>'overallReadiness')::numeric AS overall_readiness,
  (p.data->'assessment'->'scores'->>'icpClarity')::numeric AS icp_clarity,
  (p.data->'assessment'->'scores'->>'positioningStrength')::numeric AS positioning_strength,
  (p.data->'assessment'->'scores'->>'messagingConsistency')::numeric AS messaging_consistency,
  (p.data->'assessment'->'scores'->>'channelReadiness')::numeric AS channel_readiness,
  (p.data->'assessment'->'scores'->>'salesProcessMaturity')::numeric AS sales_process_maturity,
  (p.data->'assessment'->>'recommendedPath') AS recommended_path,
  (p.data->'assessment'->>'recommendedStartCourse')::integer AS recommended_start_course,
  (p.data->'assessment'->>'generatedAt')::timestamp AS assessment_generated_at
FROM profile p
WHERE p.data->'assessment' IS NOT NULL AND p.data->>'assessment' != 'null';

-- Metabase view: roleplay session analysis
CREATE OR REPLACE VIEW v_roleplay_analysis AS
SELECT
  rs.id,
  rs.user_id,
  rs.industry_id,
  rs.role_id,
  rs.disc_type,
  (rs.evaluation->>'score')::numeric AS score,
  rs.evaluation->'strengths' AS strengths,
  rs.evaluation->'improvements' AS improvements,
  jsonb_array_length(rs.transcript) AS message_count,
  rs.created_at
FROM roleplay_session rs;

-- Metabase view: pod health overview
CREATE OR REPLACE VIEW v_pod_health AS
SELECT
  p.id AS pod_id,
  p.name,
  p.status,
  p.curriculum_stage,
  p.current_member_count,
  p.week_number,
  p.created_at,
  COUNT(DISTINCT pa.id) FILTER (WHERE pa.created_at > now() - interval '30 days') AS activities_30d,
  COUNT(DISTINCT pm.user_id) FILTER (WHERE pm.last_active_at > now() - interval '7 days') AS active_members_7d,
  COUNT(DISTINCT pm.user_id) FILTER (WHERE pm.status = 'active') AS total_active_members
FROM pod p
LEFT JOIN pod_member pm ON pm.pod_id = p.id
LEFT JOIN pod_activity pa ON pa.pod_id = p.id
WHERE p.status = 'active'
GROUP BY p.id;

-- Metabase view: questionnaire data extraction
CREATE OR REPLACE VIEW v_questionnaire_data AS
SELECT
  p.user_id,
  p.data->'questionnaire'->>'industry' AS industry,
  p.data->'questionnaire'->>'founder_description' AS founder_category,
  p.data->'questionnaire'->>'deal_size' AS deal_size,
  p.data->'questionnaire'->>'sales_journey' AS sales_journey,
  p.data->'questionnaire'->>'revenue_range' AS revenue_range,
  p.data->'questionnaire'->>'time_commitment' AS time_commitment,
  p.data->'questionnaire'->>'learning_style' AS learning_style,
  p.data->'questionnaire'->'disc_profile'->>'primary' AS disc_primary,
  p.data->'questionnaire'->'disc_profile'->>'secondary' AS disc_secondary
FROM profile p
WHERE p.data->'questionnaire' IS NOT NULL;

-- Metabase view: social signals summary
CREATE OR REPLACE VIEW v_social_signals_summary AS
SELECT
  platform,
  sentiment,
  date_trunc('day', created_at) AS signal_date,
  COUNT(*) AS signal_count,
  AVG(relevance_score) AS avg_relevance
FROM social_signal
GROUP BY platform, sentiment, date_trunc('day', created_at);

-- Metabase view: SEO performance
CREATE OR REPLACE VIEW v_seo_performance AS
SELECT
  keyword,
  search_volume,
  difficulty,
  current_position,
  content_score,
  target_url,
  source,
  researched_at
FROM seo_research
ORDER BY search_volume DESC;

-- Metabase view: outreach activity summary
CREATE OR REPLACE VIEW v_outreach_summary AS
SELECT
  ol.user_id,
  ol.channel,
  ol.action,
  ol.outcome,
  date_trunc('day', ol.logged_at) AS outreach_date,
  COUNT(*) AS action_count
FROM outreach_log ol
GROUP BY ol.user_id, ol.channel, ol.action, ol.outcome, date_trunc('day', ol.logged_at);

-- Metabase view: pipeline overview
CREATE OR REPLACE VIEW v_pipeline_overview AS
SELECT
  pd.user_id,
  pd.stage,
  COUNT(*) AS deal_count,
  SUM(pd.deal_value) AS total_value_cents,
  AVG(pd.probability) AS avg_probability,
  MIN(pd.stage_changed_at) AS oldest_in_stage,
  MAX(pd.stage_changed_at) AS newest_in_stage
FROM pipeline_deal pd
GROUP BY pd.user_id, pd.stage;

-- Metabase view: form submission analytics
CREATE OR REPLACE VIEW v_form_submissions AS
SELECT
  fs.id,
  fs.form_slug,
  fs.email,
  fs.name,
  fs.score,
  fs.status,
  fs.utm_source,
  fs.utm_medium,
  fs.utm_campaign,
  fs.referrer,
  fs.created_at,
  date_trunc('day', fs.created_at) AS submission_date
FROM form_submission fs
ORDER BY fs.created_at DESC;
`;

async function migrate() {
  if (!DATABASE_URL) {
    console.log("[entrypoint] DATABASE_URL not set, skipping migration.");
    return;
  }
  console.log("[entrypoint] Running database migration...");
  const { Pool } = require("pg");
  const pool = new Pool({ connectionString: DATABASE_URL });
  try {
    await pool.query("BEGIN");
    await pool.query(SQL);
    console.log("[entrypoint] Tables ready, creating views...");
    await pool.query(VIEWS_SQL);
    await pool.query("COMMIT");
    console.log("[entrypoint] Migration complete - tables and views ready.");
  } catch (err) {
    await pool.query("ROLLBACK").catch(() => {});
    console.error("[entrypoint] Migration failed:", err.message);
    throw err;
  } finally {
    await pool.end();
  }
}

async function main() {
  await migrate();
  console.log("[entrypoint] Starting Next.js server...");
  require("./server.js");
}

main();
