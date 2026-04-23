-- Migration: Add Missing Database Indexes
-- Date: 2026-04-20
-- Audit Finding: P0 Finding 1 - Missing Database Indexes on Foreign Keys
-- Impact: Performance/Availability - prevents table scans, improves query speed 10-100x

-- ============================================================================
-- DISTRESS EVENT INDEXES
-- Used by: Provider alerts, patient safety monitoring
-- ============================================================================

-- Basic foreign key index for user lookups
CREATE INDEX IF NOT EXISTS idx_distress_event_user_id
ON distress_event(user_id);

-- Composite index for provider alert queries (unresolved crisis/mild events)
-- Optimizes: WHERE user_id IN (...) AND resolved_at IS NULL AND level IN ('crisis', 'mild')
CREATE INDEX IF NOT EXISTS idx_distress_event_user_level_resolved
ON distress_event(user_id, level, resolved_at);

-- Index for time-series queries (recent events)
CREATE INDEX IF NOT EXISTS idx_distress_event_created_at
ON distress_event(created_at DESC);

-- ============================================================================
-- MOOD ENTRY INDEXES
-- Used by: Patient detail view, mood tracking charts
-- ============================================================================

-- Basic foreign key index
CREATE INDEX IF NOT EXISTS idx_mood_entry_user_id
ON mood_entry(user_id);

-- Composite index for time-series queries (most recent mood entries first)
-- Optimizes: WHERE user_id = ? ORDER BY date DESC LIMIT 30
CREATE INDEX IF NOT EXISTS idx_mood_entry_user_date
ON mood_entry(user_id, date DESC);

-- ============================================================================
-- PROVIDER-PATIENT RELATIONSHIP INDEXES
-- Used by: Provider roster, patient lookup, assignment checks
-- ============================================================================

-- Provider roster query: all patients for a provider
CREATE INDEX IF NOT EXISTS idx_provider_patient_provider_id
ON provider_patient(provider_id);

-- Patient lookup: which provider(s) is this patient assigned to?
CREATE INDEX IF NOT EXISTS idx_provider_patient_patient_id
ON provider_patient(patient_id);

-- Active assignments only (most common query)
-- Optimizes: WHERE provider_id = ? AND status = 'active'
CREATE INDEX IF NOT EXISTS idx_provider_patient_provider_status
ON provider_patient(provider_id, status);

-- ============================================================================
-- PATIENT ASSIGNMENT INDEXES
-- Used by: Course assignments, due date tracking
-- ============================================================================

-- Composite index for provider + patient assignment queries
-- Optimizes: WHERE provider_id = ? AND patient_id = ?
CREATE INDEX IF NOT EXISTS idx_patient_assignment_provider_patient
ON patient_assignment(provider_id, patient_id);

-- Patient's assigned courses (for patient dashboard)
CREATE INDEX IF NOT EXISTS idx_patient_assignment_patient_id
ON patient_assignment(patient_id);

-- Due date tracking (upcoming assignments)
-- Optimizes: WHERE due_date > NOW() AND completed_at IS NULL
CREATE INDEX IF NOT EXISTS idx_patient_assignment_due_date
ON patient_assignment(due_date)
WHERE completed_at IS NULL;

-- ============================================================================
-- CLINICAL COMPONENT DATA INDEXES
-- Used by: useClinicalStorage hook, therapeutic exercises
-- ============================================================================

-- Basic user lookup
CREATE INDEX IF NOT EXISTS idx_clinical_component_user_id
ON clinical_component_data(user_id);

-- Composite index for component lookup (already has unique index, but add for performance)
-- The existing unique index covers this, but explicit index helps query planner
-- Note: Unique constraint on (user_id, component_type, component_id) already exists

-- Course-scoped queries (all components for a course)
CREATE INDEX IF NOT EXISTS idx_clinical_component_course
ON clinical_component_data(user_id, course_id)
WHERE course_id IS NOT NULL;

-- ============================================================================
-- CONTENT EMBEDDING INDEXES (RAG)
-- Used by: Provider resource search, RAG queries
-- ============================================================================

-- Source lookup (find all chunks for a course/assessment)
CREATE INDEX IF NOT EXISTS idx_content_embedding_source
ON content_embedding(source_type, source_id);

-- Chunk ordering
CREATE INDEX IF NOT EXISTS idx_content_embedding_source_chunk
ON content_embedding(source_type, source_id, chunk_index);

-- ============================================================================
-- FORUM BOOKMARK INDEXES
-- Used by: User's bookmarked discussions
-- ============================================================================

-- User's bookmarks (for "My Bookmarks" page)
CREATE INDEX IF NOT EXISTS idx_forum_bookmark_user_id
ON forum_bookmark(user_id);

-- ============================================================================
-- LESSON FEEDBACK INDEXES
-- Used by: Platform improvement analytics
-- ============================================================================

-- Feedback by course/lesson (for analytics)
CREATE INDEX IF NOT EXISTS idx_lesson_feedback_course_lesson
ON lesson_feedback(course_id, lesson_id);

-- User's feedback history
CREATE INDEX IF NOT EXISTS idx_lesson_feedback_user_id
ON lesson_feedback(user_id);

-- ============================================================================
-- COACH SESSION INDEXES
-- Used by: AI coaching history, crisis detection monitoring
-- ============================================================================

-- User's coaching sessions
CREATE INDEX IF NOT EXISTS idx_coach_session_user_id
ON coach_session(user_id);

-- Crisis detection monitoring
CREATE INDEX IF NOT EXISTS idx_coach_session_crisis
ON coach_session(crisis_detected, created_at DESC)
WHERE crisis_detected = 1;

-- ============================================================================
-- MODERATION LOG INDEXES
-- Used by: Forum moderation audit trail
-- ============================================================================

-- Audit trail by user
CREATE INDEX IF NOT EXISTS idx_moderation_log_user_id
ON moderation_log(user_id);

-- High-risk content tracking
CREATE INDEX IF NOT EXISTS idx_moderation_log_risk_level
ON moderation_log(risk_level, created_at DESC)
WHERE risk_level >= 2;

-- ============================================================================
-- AI CLASSIFICATION EVENT INDEXES
-- Used by: Maia classifier audit log, analytics
-- ============================================================================

-- User's classification history
CREATE INDEX IF NOT EXISTS idx_ai_classification_user_id
ON ai_classification_event(user_id);

-- Classifier type + label queries (analytics)
CREATE INDEX IF NOT EXISTS idx_ai_classification_classifier_label
ON ai_classification_event(classifier, primary_label);

-- Time-series analytics
CREATE INDEX IF NOT EXISTS idx_ai_classification_created_at
ON ai_classification_event(created_at DESC);

-- ============================================================================
-- VERIFICATION AND TESTING
-- ============================================================================

-- After running this migration, verify indexes with:
-- SELECT tablename, indexname, indexdef
-- FROM pg_indexes
-- WHERE schemaname = 'public'
-- ORDER BY tablename, indexname;

-- Check index usage after deployment:
-- SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
-- FROM pg_stat_user_indexes
-- WHERE schemaname = 'public'
-- ORDER BY idx_scan;
