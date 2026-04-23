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
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

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