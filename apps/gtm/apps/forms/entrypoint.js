const MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS form_submission (
  id TEXT PRIMARY KEY,
  form_slug TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  data JSONB NOT NULL,
  score INTEGER,
  score_breakdown JSONB,
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  ip_address TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS form_workflow_log (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL REFERENCES form_submission(id) ON DELETE CASCADE,
  workflow_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  response_data JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_form_submission_slug ON form_submission(form_slug);
CREATE INDEX IF NOT EXISTS idx_form_submission_email ON form_submission(email);
CREATE INDEX IF NOT EXISTS idx_form_submission_status ON form_submission(status);
CREATE INDEX IF NOT EXISTS idx_form_submission_created ON form_submission(created_at);
CREATE INDEX IF NOT EXISTS idx_form_workflow_log_submission ON form_workflow_log(submission_id);
`;

async function migrate() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log('[entrypoint] No DATABASE_URL, skipping migration');
    return;
  }
  try {
    const postgres = (await import('postgres')).default;
    const sql = postgres(url, { max: 1 });
    await sql.unsafe(MIGRATION_SQL);
    await sql.end();
    console.log('[entrypoint] Migration complete');
  } catch (err) {
    console.error('[entrypoint] Migration error:', err.message);
  }
}

async function main() {
  await migrate();
  console.log('[entrypoint] Starting server...');
  require('./server.js');
}

main();
