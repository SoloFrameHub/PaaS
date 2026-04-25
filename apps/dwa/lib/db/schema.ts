/**
 * Drizzle schema for Postgres. Used when DATABASE_URL is set (e.g. Coolify).
 * Tables: user (Lucia), session (Lucia), profile (wellness profile JSONB).
 */

import { pgTable, text, timestamp, jsonb, integer, serial, boolean, real, uuid, primaryKey, uniqueIndex } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  hashedPassword: text('hashed_password').notNull(),
  role: text('role').default('user').notNull(), // 'user' | 'provider' | 'admin'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }), // Soft delete with 30-day grace period (Finding 9)
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

/**
 * Profile table stores WellnessProfile as JSONB
 * See types/wellness-profile.ts for the full type definition
 */
export const profile = pgTable('profile', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  data: jsonb('data').notNull().$type<Record<string, unknown>>(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Mood entries for daily check-ins
 * Stored separately for efficient querying and analytics
 */
export const moodEntry = pgTable('mood_entry', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  date: timestamp('date', { withTimezone: true }).notNull(),
  moodRating: integer('mood_rating').notNull(), // 1-10
  anxietyLevel: integer('anxiety_level').notNull(), // 1-10
  sleepQuality: integer('sleep_quality').notNull(), // 1-10
  energyLevel: integer('energy_level').notNull(), // 1-10
  notes: text('notes'),
  copingTechniquesUsed: jsonb('coping_techniques_used').$type<string[]>(),
  triggers: jsonb('triggers').$type<string[]>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Wellness coach conversation sessions
 * For tracking AI coaching interactions
 */
export const coachSession = pgTable('coach_session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  transcript: jsonb('transcript').notNull().$type<{ role: string; content: string }[]>(),
  topic: text('topic'), // e.g., 'anxiety', 'breathing-exercise', 'crisis-support'
  crisisDetected: integer('crisis_detected').default(0), // boolean as int
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Lesson feedback for troubleshooting and platform improvement
 */
export const lessonFeedback = pgTable('lesson_feedback', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'set null' }), // Finding 8: preserve feedback on account deletion
  courseId: text('course_id').notNull(),
  lessonId: text('lesson_id').notNull(),
  rating: integer('rating').notNull(), // 1-5
  category: text('category').notNull(), // 'content' | 'technical' | 'suggestion' | 'other'
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Forum bookmarks — tracks which discussions a user has bookmarked
 */
export const forumBookmark = pgTable('forum_bookmark', {
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  discussionId: text('discussion_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
}, (table) => [
  primaryKey({ columns: [table.userId, table.discussionId] }),
]);

/**
 * Distress classifier event log — HIPAA audit trail
 *
 * IMPORTANT: text content is NEVER stored here.
 * Stores only the classification result and metadata.
 * Required for HIPAA audit logging of safety events.
 * Provider alert system reads this table for crisis notifications.
 */
export const distressEvent = pgTable('distress_event', {
  id:               serial('id').primaryKey(),
  userId:           text('user_id').references(() => user.id, { onDelete: 'set null' }), // nullable — anonymous users allowed
  level:            text('level').notNull(),     // 'none' | 'mild' | 'crisis'
  confidence:       real('confidence').notNull(), // 0.0–1.0
  context:          text('context').notNull(),    // 'journal' | 'assessment' | 'forum' | 'checkin'
  courseId:         text('course_id'),            // if triggered during a lesson
  lessonId:         text('lesson_id'),
  providerAlerted:  boolean('provider_alerted').default(false).notNull(),
  resolvedAt:       timestamp('resolved_at', { withTimezone: true }), // null = unresolved
  createdAt:        timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Provider profile — extended info for practitioners
 * Created when a user upgrades to the 'provider' role
 */
export const providerProfile = pgTable('provider_profile', {
  userId:      text('user_id').primaryKey().references(() => user.id, { onDelete: 'cascade' }),
  displayName: text('display_name').notNull(),
  credentials: text('credentials'),          // e.g. 'MD', 'LCSW', 'PhD'
  specialty:   text('specialty'),            // e.g. 'Anxiety & OCD', 'Trauma'
  licenseNumber: text('license_number'),     // state license (non-NPI)
  npiNumber:   text('npi_number'),           // 10-digit US NPI (optional)
  practiceId:  text('practice_id'),          // for future multi-tenant
  bio:         text('bio'),
  // ── Verification ──────────────────────────────────────────────────────────
  verificationStatus: text('verification_status').default('pending').notNull(),
  // 'pending' | 'verified' | 'rejected' | 'manual_review'
  verificationMethod: text('verification_method'),
  // 'npi_auto' | 'admin_manual' | 'practice_code'
  verificationNotes:  text('verification_notes'), // admin notes / rejection reason
  npiData:            jsonb('npi_data').$type<Record<string, unknown>>(), // raw NPPES response
  verifiedAt:  timestamp('verified_at', { withTimezone: true }),
  verifiedBy:  text('verified_by'),          // admin userId if manually approved
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Links providers to their patients.
 * Patients are linked by invitation code or direct assignment.
 */
export const providerPatient = pgTable('provider_patient', {
  id:         serial('id').primaryKey(),
  providerId: text('provider_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  patientId:  text('patient_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  displayName: text('display_name'),         // provider-set nickname (not real name)
  notes:      text('notes'),                 // private provider notes
  status:     text('status').default('active').notNull(), // 'active' | 'discharged'
  createdAt:  timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
}, (table) => [
  uniqueIndex('provider_patient_unique').on(table.providerId, table.patientId),
]);

/**
 * Course/lesson assignments from provider to patient
 */
export const patientAssignment = pgTable('patient_assignment', {
  id:          serial('id').primaryKey(),
  providerId:  text('provider_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  patientId:   text('patient_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  courseId:    text('course_id').notNull(),
  lessonId:    text('lesson_id'),             // null = entire course
  dueDate:     timestamp('due_date', { withTimezone: true }),
  note:        text('note'),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Invite codes — patient scans/enters to link themselves to a provider
 */
export const providerInvite = pgTable('provider_invite', {
  code:       text('code').primaryKey(),           // short alphanumeric
  providerId: text('provider_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  usedBy:     text('used_by').references(() => user.id, { onDelete: 'set null' }),
  usedAt:     timestamp('used_at', { withTimezone: true }),
  expiresAt:  timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt:  timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * RAG content embeddings — course chunks for provider resource search
 * Embedding stored as JSONB float array (no pgvector dependency required)
 */
export const contentEmbedding = pgTable('content_embedding', {
  id:        serial('id').primaryKey(),
  sourceType: text('source_type').notNull(),  // 'course' | 'assessment' | 'clinical'
  sourceId:  text('source_id').notNull(),     // courseId or assessmentId
  chunkIndex: integer('chunk_index').notNull(),
  title:     text('title').notNull(),
  body:      text('body').notNull(),          // raw chunk text (for display)
  embedding: jsonb('embedding').notNull().$type<number[]>(), // float32 vector
  metadata:  jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * AI moderation audit log for forum content
 */
export const moderationLog = pgTable('moderation_log', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'set null' }), // Finding 8: HIPAA requires 6-year audit retention
  contentType: text('content_type').notNull(), // 'discussion' | 'post'
  contentSnippet: text('content_snippet').notNull(),
  riskLevel: integer('risk_level').notNull(),
  categories: jsonb('categories').$type<string[]>(),
  action: text('action').notNull(), // 'allowed' | 'blocked' | 'flagged'
  reasoning: text('reasoning'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Maia AI Classification Layer ─────────────────────────────────────────────

/**
 * Unified audit log for all Maia classifier results.
 * Text is NEVER stored — only classification metadata.
 */
export const aiClassificationEvent = pgTable('ai_classification_event', {
  id: serial('id').primaryKey(),
  classifier: text('classifier').notNull(), // 'distress' | 'forum-topic' | 'content-quality' | 'content-atomization'
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  sourceType: text('source_type').notNull(), // 'forum-discussion' | 'forum-post' | 'lesson-section' | 'journal' | 'assessment'
  sourceId: text('source_id'), // ID of the source content
  primaryLabel: text('primary_label').notNull(), // Top label for quick queries
  confidence: real('confidence').notNull(),
  result: jsonb('result').$type<Record<string, unknown>>().notNull(), // Full classifier response
  processingMs: real('processing_ms'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Forum topic classification — denormalized for fast forum queries.
 * One row per discussion, updated if re-classified.
 */
export const forumTopicClassification = pgTable('forum_topic_classification', {
  discussionId: text('discussion_id').primaryKey(),
  topic: text('topic').notNull(), // anxiety | depression | relationships | medication | coping-strategies | crisis | general-wellness | optimization
  topicConfidence: real('topic_confidence').notNull(),
  routing: text('routing').notNull(), // needs-provider | community-handles | informational
  needsProvider: boolean('needs_provider').default(false).notNull(),
  providerReviewed: boolean('provider_reviewed').default(false).notNull(),
  classifiedAt: timestamp('classified_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Content quality scores for lessons.
 * Tracks therapeutic language quality per lesson section.
 */
export const contentQualityScore = pgTable('content_quality_score', {
  id: serial('id').primaryKey(),
  courseId: text('course_id').notNull(),
  lessonId: text('lesson_id').notNull(),
  sectionIndex: integer('section_index'), // null = whole lesson
  quality: text('quality').notNull(), // clinically-appropriate | needs-revision | potentially-harmful | overly-clinical | missing-validation
  confidence: real('confidence').notNull(),
  publishReady: boolean('publish_ready').default(false).notNull(),
  allLabels: jsonb('all_labels').$type<Array<{ label: string; score: number }>>(),
  scoredAt: timestamp('scored_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Content atomization tags for marketing content extraction.
 * Tags lesson sections for blog, email, and social media extraction.
 * sectionText IS stored here — lesson content is non-PHI educational material.
 */
export const contentAtomizationTag = pgTable('content_atomization_tag', {
  id: serial('id').primaryKey(),
  courseId: text('course_id').notNull(),
  lessonId: text('lesson_id').notNull(),
  sectionIndex: integer('section_index').notNull(),
  sectionText: text('section_text').notNull(),
  tag: text('tag').notNull(), // standalone-blog-excerpt | email-teaser | social-snippet | needs-full-context | not-extractable
  confidence: real('confidence').notNull(),
  extractable: boolean('extractable').default(false).notNull(),
  taggedAt: timestamp('tagged_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

/**
 * Clinical component data — therapeutic exercises saved by users.
 * Used by provider portal for patient progress monitoring.
 *
 * PRIVACY: If user has no assigned provider, data should be localStorage-only.
 * If provider-assigned, data syncs here for clinical review.
 *
 * Component types: thought-record | trigger-map | exposure-hierarchy |
 *                  breathing-log | mood-checkin | compassion-letter
 */
export const clinicalComponentData = pgTable('clinical_component_data', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  componentType: text('component_type').notNull(),
  componentId: text('component_id').notNull(), // unique ID for this specific instance
  courseId: text('course_id'),
  lessonId: text('lesson_id'),
  data: jsonb('data').notNull().$type<Record<string, unknown>>(), // flexible structure per component type
  lastModified: timestamp('last_modified', { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  tenantId: uuid('tenant_id').notNull(), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
}, (table) => [
  uniqueIndex('clinical_component_unique').on(table.userId, table.componentType, table.componentId),
]);
