-- Community tables: NodeBB user mapping + activity events
-- Run this migration against your Postgres database

CREATE TABLE IF NOT EXISTS nodebb_user_map (
    user_id TEXT PRIMARY KEY REFERENCES "user"(id) ON DELETE CASCADE,
    nodebb_uid INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_event (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_event_user ON activity_event(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_event_type ON activity_event(event_type);
CREATE INDEX IF NOT EXISTS idx_activity_event_created ON activity_event(created_at DESC);
