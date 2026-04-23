/**
 * Create Postgres tables (user, session, profile). Run when DATABASE_URL is set.
 * Usage: npx tsx scripts/db-migrate.ts
 */

import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL not set. Skipping migrate.');
  process.exit(0);
}

const SQL = `
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY NOT NULL,
  "email" text NOT NULL UNIQUE,
  "hashed_password" text NOT NULL,
  "role" text DEFAULT 'user' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Add role column to existing installs (idempotent)
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "role" text DEFAULT 'user' NOT NULL;

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

CREATE TABLE IF NOT EXISTS "forum_bookmark" (
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "discussion_id" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  PRIMARY KEY ("user_id", "discussion_id")
);

CREATE TABLE IF NOT EXISTS "lesson_feedback" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "course_id" text NOT NULL,
  "lesson_id" text NOT NULL,
  "rating" integer NOT NULL,
  "category" text NOT NULL,
  "message" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "mood_entry" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "date" timestamp with time zone NOT NULL,
  "mood_rating" integer NOT NULL,
  "anxiety_level" integer NOT NULL,
  "sleep_quality" integer NOT NULL,
  "energy_level" integer NOT NULL,
  "notes" text,
  "coping_techniques_used" jsonb,
  "triggers" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "coach_session" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "transcript" jsonb NOT NULL,
  "topic" text,
  "crisis_detected" integer DEFAULT 0,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "moderation_log" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "content_type" text NOT NULL,
  "content_snippet" text NOT NULL,
  "risk_level" integer NOT NULL,
  "categories" jsonb,
  "action" text NOT NULL,
  "reasoning" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- ── Provider Portal Tables ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "provider_profile" (
  "user_id" text PRIMARY KEY NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "display_name" text NOT NULL,
  "credentials" text,
  "specialty" text,
  "license_number" text,
  "npi_number" text,
  "practice_id" text,
  "bio" text,
  "verification_status" text DEFAULT 'pending' NOT NULL,
  "verification_method" text,
  "verification_notes" text,
  "npi_data" jsonb,
  "verified_at" timestamp with time zone,
  "verified_by" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Idempotent columns for existing provider_profile installs
ALTER TABLE "provider_profile" ADD COLUMN IF NOT EXISTS "npi_number" text;
ALTER TABLE "provider_profile" ADD COLUMN IF NOT EXISTS "verification_status" text DEFAULT 'pending' NOT NULL;
ALTER TABLE "provider_profile" ADD COLUMN IF NOT EXISTS "verification_method" text;
ALTER TABLE "provider_profile" ADD COLUMN IF NOT EXISTS "verification_notes" text;
ALTER TABLE "provider_profile" ADD COLUMN IF NOT EXISTS "npi_data" jsonb;
ALTER TABLE "provider_profile" ADD COLUMN IF NOT EXISTS "verified_at" timestamp with time zone;
ALTER TABLE "provider_profile" ADD COLUMN IF NOT EXISTS "verified_by" text;

CREATE TABLE IF NOT EXISTS "provider_patient" (
  "id" serial PRIMARY KEY NOT NULL,
  "provider_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "patient_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "display_name" text,
  "notes" text,
  "status" text DEFAULT 'active' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE("provider_id", "patient_id")
);

CREATE TABLE IF NOT EXISTS "patient_assignment" (
  "id" serial PRIMARY KEY NOT NULL,
  "provider_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "patient_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "course_id" text NOT NULL,
  "lesson_id" text,
  "due_date" timestamp with time zone,
  "note" text,
  "completed_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "provider_invite" (
  "code" text PRIMARY KEY NOT NULL,
  "provider_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "used_by" text REFERENCES "user"("id") ON DELETE SET NULL,
  "used_at" timestamp with time zone,
  "expires_at" timestamp with time zone NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "content_embedding" (
  "id" serial PRIMARY KEY NOT NULL,
  "source_type" text NOT NULL,
  "source_id" text NOT NULL,
  "chunk_index" integer NOT NULL,
  "title" text NOT NULL,
  "body" text NOT NULL,
  "embedding" jsonb NOT NULL,
  "metadata" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Index for faster embedding lookups by source
CREATE INDEX IF NOT EXISTS content_embedding_source_idx ON "content_embedding" ("source_type", "source_id");

-- ── Distress event enhancements ───────────────────────────────────────────────
-- Create with all columns (fresh installs)
CREATE TABLE IF NOT EXISTS "distress_event" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" text REFERENCES "user"("id") ON DELETE SET NULL,
  "level" text NOT NULL,
  "confidence" real NOT NULL,
  "context" text NOT NULL,
  "course_id" text,
  "lesson_id" text,
  "provider_alerted" boolean DEFAULT false NOT NULL,
  "resolved_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Idempotent backfill for existing installs missing provider-portal columns
ALTER TABLE "distress_event" ADD COLUMN IF NOT EXISTS "course_id" text;
ALTER TABLE "distress_event" ADD COLUMN IF NOT EXISTS "lesson_id" text;
ALTER TABLE "distress_event" ADD COLUMN IF NOT EXISTS "provider_alerted" boolean DEFAULT false NOT NULL;
ALTER TABLE "distress_event" ADD COLUMN IF NOT EXISTS "resolved_at" timestamp with time zone;

-- ── Maia AI Classification Layer (Finding 5: 4 missing tables) ────────────────

-- Unified audit log for all Maia classifier results
CREATE TABLE IF NOT EXISTS "ai_classification_event" (
  "id" serial PRIMARY KEY NOT NULL,
  "classifier" text NOT NULL,
  "user_id" text REFERENCES "user"("id") ON DELETE SET NULL,
  "source_type" text NOT NULL,
  "source_id" text,
  "primary_label" text NOT NULL,
  "confidence" real NOT NULL,
  "result" jsonb NOT NULL,
  "processing_ms" real,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Forum topic classification (denormalized for fast queries)
CREATE TABLE IF NOT EXISTS "forum_topic_classification" (
  "discussion_id" text PRIMARY KEY NOT NULL,
  "topic" text NOT NULL,
  "topic_confidence" real NOT NULL,
  "routing" text NOT NULL,
  "needs_provider" boolean DEFAULT false NOT NULL,
  "provider_reviewed" boolean DEFAULT false NOT NULL,
  "classified_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Content quality scores for lessons (therapeutic language quality)
CREATE TABLE IF NOT EXISTS "content_quality_score" (
  "id" serial PRIMARY KEY NOT NULL,
  "course_id" text NOT NULL,
  "lesson_id" text NOT NULL,
  "section_index" integer,
  "quality" text NOT NULL,
  "confidence" real NOT NULL,
  "publish_ready" boolean DEFAULT false NOT NULL,
  "all_labels" jsonb,
  "scored_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- Content atomization tags for marketing extraction
CREATE TABLE IF NOT EXISTS "content_atomization_tag" (
  "id" serial PRIMARY KEY NOT NULL,
  "course_id" text NOT NULL,
  "lesson_id" text NOT NULL,
  "section_index" integer NOT NULL,
  "section_text" text NOT NULL,
  "tag" text NOT NULL,
  "confidence" real NOT NULL,
  "extractable" boolean DEFAULT false NOT NULL,
  "tagged_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- ── HIPAA Audit Trail Compliance (Finding 8) ──────────────────────────────────

-- Fix FK cascade to preserve audit logs when users are deleted
-- HIPAA requires 6-year retention regardless of account status

-- moderation_log: change cascade to set null
ALTER TABLE "moderation_log" DROP CONSTRAINT IF EXISTS "moderation_log_user_id_user_id_fk";
ALTER TABLE "moderation_log" ALTER COLUMN "user_id" DROP NOT NULL;
ALTER TABLE "moderation_log" ADD CONSTRAINT "moderation_log_user_id_user_id_fk"
  FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL;

-- lesson_feedback: change cascade to set null
ALTER TABLE "lesson_feedback" DROP CONSTRAINT IF EXISTS "lesson_feedback_user_id_user_id_fk";
ALTER TABLE "lesson_feedback" ALTER COLUMN "user_id" DROP NOT NULL;
ALTER TABLE "lesson_feedback" ADD CONSTRAINT "lesson_feedback_user_id_user_id_fk"
  FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL;
`;

async function main() {
  const pool = new pg.Pool({ connectionString });
  try {
    await pool.query(SQL);
    console.log('Tables created or already exist.');
  } catch (e) {
    console.error('Migration failed:', e);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();