/**
 * Drizzle schema for Postgres. Used when DATABASE_URL is set (e.g. Dokploy).
 * Tables: user (Lucia), session (Lucia), profile (founder profile JSONB).
 */

import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  jsonb,
  integer,
  numeric,
  bigint,
  uniqueIndex,
  boolean,
  index,
  serial,
  uuid,
  vector,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  emailVerificationCode: text("email_verification_code"),
  emailVerificationExpiresAt: timestamp("email_verification_expires_at", {
    withTimezone: true,
  }),
  passwordResetCode: text("password_reset_code"),
  passwordResetExpiresAt: timestamp("password_reset_expires_at", {
    withTimezone: true,
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export const profile = pgTable("profile", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  data: jsonb("data").notNull().$type<Record<string, unknown>>(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Subscription (Polar.sh) ─────────────────────────────────────────────

export const subscription = pgTable("subscription", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  polarCustomerId: text("polar_customer_id"),
  polarProductId: text("polar_product_id"),
  polarSubscriptionId: text("polar_subscription_id"),
  status: text("status").notNull().default("inactive"),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const roleplaySession = pgTable("roleplay_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  industryId: text("industry_id").notNull(),
  roleId: text("role_id").notNull(),
  discType: text("disc_type").notNull(),
  transcript: jsonb("transcript")
    .notNull()
    .$type<{ role: string; content: string }[]>(),
  evaluation: jsonb("evaluation").notNull().$type<{
    score: number;
    strengths: string[];
    improvements: string[];
    coachingMessage: string;
  }>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Analytics tables ──────────────────────────────────────────────────

export const lessonEvent = pgTable("lesson_event", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  courseId: text("course_id").notNull(),
  lessonId: text("lesson_id").notNull(),
  eventType: text("event_type").notNull(),
  xpEarned: integer("xp_earned").default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const chatSession = pgTable("chat_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  contextCourseId: text("context_course_id"),
  contextLessonId: text("context_lesson_id"),
  contextSectionId: text("context_section_id"),
  messageCount: integer("message_count").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const chatMessage = pgTable("chat_message", {
  id: text("id").primaryKey(),
  sessionId: text("session_id")
    .notNull()
    .references(() => chatSession.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const assessmentSnapshot = pgTable("assessment_snapshot", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  overallReadiness: numeric("overall_readiness").notNull(),
  icpClarity: numeric("icp_clarity").notNull(),
  positioningStrength: numeric("positioning_strength").notNull(),
  messagingConsistency: numeric("messaging_consistency").notNull(),
  channelReadiness: numeric("channel_readiness").notNull(),
  salesProcessMaturity: numeric("sales_process_maturity").notNull(),
  recommendedPath: text("recommended_path").notNull(),
  recommendedStartCourse: integer("recommended_start_course").notNull(),
  quickWinsCount: integer("quick_wins_count").notNull(),
  criticalGapsCount: integer("critical_gaps_count").notNull(),
  fullAssessment: jsonb("full_assessment").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const forumTopicSync = pgTable("forum_topic_sync", {
  nodebbTid: integer("nodebb_tid").primaryKey(),
  title: text("title").notNull(),
  categoryName: text("category_name"),
  slug: text("slug"),
  userName: text("user_name"),
  postCount: integer("post_count").default(0),
  viewCount: integer("view_count").default(0),
  voteCount: integer("vote_count").default(0),
  timestampMs: bigint("timestamp_ms", { mode: "number" }).notNull(),
  lastPostTimestampMs: bigint("last_post_timestamp_ms", { mode: "number" }),
  syncedAt: timestamp("synced_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const forumPostSync = pgTable("forum_post_sync", {
  nodebbPid: integer("nodebb_pid").primaryKey(),
  nodebbTid: integer("nodebb_tid")
    .notNull()
    .references(() => forumTopicSync.nodebbTid, { onDelete: "cascade" }),
  userName: text("user_name"),
  contentPreview: text("content_preview"),
  voteCount: integer("vote_count").default(0),
  timestampMs: bigint("timestamp_ms", { mode: "number" }).notNull(),
  syncedAt: timestamp("synced_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const contentVersion = pgTable("content_version", {
  id: text("id").primaryKey(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  versionLabel: text("version_label").notNull(),
  changeSummary: text("change_summary").notNull(),
  changedBy: text("changed_by"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Cohort Forum: Pods ──────────────────────────────────────────────

export const pod = pgTable("pod", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  status: text("status").notNull().default("active"),
  curriculumStage: text("curriculum_stage").notNull(),
  dealSizeTier: text("deal_size_tier"),
  nodebbCategoryId: integer("nodebb_category_id"),
  maxMembers: integer("max_members").default(6).notNull(),
  currentMemberCount: integer("current_member_count").default(0).notNull(),
  weekNumber: integer("week_number").default(1).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const podMember = pgTable(
  "pod_member",
  {
    id: text("id").primaryKey(),
    podId: text("pod_id")
      .notNull()
      .references(() => pod.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("active"),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    lastActiveAt: timestamp("last_active_at", { withTimezone: true }),
    postCount: integer("post_count").default(0),
    engagementScore: integer("engagement_score").default(0),
    tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
  },
  (table) => ({
    uniqueMember: uniqueIndex("idx_pod_member_unique").on(
      table.podId,
      table.userId,
    ),
  }),
);

export const memberMatchingProfile = pgTable("member_matching_profile", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  curriculumStage: text("curriculum_stage").notNull(),
  businessContext: jsonb("business_context")
    .$type<{
      product: string;
      businessModel: string;
      dealSize: string;
      industry: string;
    }>()
    .notNull(),
  discProfile: jsonb("disc_profile")
    .$type<{
      primary: "D" | "I" | "S" | "C";
      secondary: "D" | "I" | "S" | "C" | null;
    }>()
    .notNull(),
  timeCommitment: text("time_commitment").notNull(),
  learningGoals: jsonb("learning_goals").$type<string[]>(),
  painPoints: jsonb("pain_points").$type<string[]>(),
  matchedPodId: text("matched_pod_id").references(() => pod.id),
  surveyCompletedAt: timestamp("survey_completed_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const podActivity = pgTable("pod_activity", {
  id: text("id").primaryKey(),
  podId: text("pod_id")
    .notNull()
    .references(() => pod.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  eventType: text("event_type").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const facilitatorContext = pgTable(
  "facilitator_context",
  {
    id: text("id").primaryKey(),
    podId: text("pod_id")
      .notNull()
      .references(() => pod.id, { onDelete: "cascade" }),
    weekNumber: integer("week_number").notNull(),
    memberContexts: jsonb("member_contexts")
      .$type<
        Record<
          string,
          {
            name: string;
            curriculumProgress: string;
            recentActivity: string;
            engagementLevel: string;
          }
        >
      >()
      .notNull(),
    podHealthScore: integer("pod_health_score"),
    aiSummary: text("ai_summary"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
  },
  (table) => ({
    uniquePodWeek: uniqueIndex("idx_facilitator_pod_week").on(
      table.podId,
      table.weekNumber,
    ),
  }),
);

export const personaActivity = pgTable(
  "persona_activity",
  {
    id: text("id").primaryKey(),
    podId: text("pod_id")
      .notNull()
      .references(() => pod.id, { onDelete: "cascade" }),
    personaId: text("persona_id").notNull(),
    postCount: integer("post_count").default(0).notNull(),
    lastPostedAt: timestamp("last_posted_at", { withTimezone: true }),
    fadeOutStatus: text("fade_out_status").default("active"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
  },
  (table) => ({
    uniquePodPersona: uniqueIndex("idx_persona_pod_unique").on(
      table.podId,
      table.personaId,
    ),
  }),
);

export const forumAnalyticsEvent = pgTable("forum_analytics_event", {
  id: text("id").primaryKey(),
  eventType: text("event_type").notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  podId: text("pod_id").references(() => pod.id, { onDelete: "set null" }),
  nodebbCategoryId: integer("nodebb_category_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Community: NodeBB user mapping + activity events ────────────────

export const nodebbUserMap = pgTable("nodebb_user_map", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  nodebbUid: integer("nodebb_uid").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

export const activityEvent = pgTable("activity_event", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  eventType: text("event_type").notNull(), // lesson_completed | badge_earned | course_completed | artifact_created | streak_milestone | community_post
  title: text("title").notNull(),
  description: text("description"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Intelligence: Social Media Signals ──────────────────────────────

export const socialSignal = pgTable("social_signal", {
  id: text("id").primaryKey(),
  platform: text("platform").notNull(),
  signalType: text("signal_type").notNull(),
  contentPreview: text("content_preview"),
  author: text("author"),
  url: text("url"),
  sentiment: text("sentiment").default("neutral"),
  relevanceScore: integer("relevance_score").default(50),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Book: One-time purchases ────────────────────────────────────────

export const bookPurchase = pgTable("book_purchase", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  polarOrderId: text("polar_order_id"),
  polarCustomerId: text("polar_customer_id"),
  polarProductId: text("polar_product_id"),
  status: text("status").notNull().default("active"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Book: Full-text search index ────────────────────────────────────

export const bookSearchIndex = pgTable("book_search_index", {
  chapterId: text("chapter_id").primaryKey(),
  chapterTitle: text("chapter_title").notNull(),
  isFree: boolean("is_free").notNull().default(false),
  plainText: text("plain_text").notNull(),
  // search_vector is tsvector in Postgres (created via migration SQL)
  // Drizzle has limited tsvector support, so we define it as text here
  // and use raw SQL for search queries
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ── Book: Reading progress events ───────────────────────────────────

export const bookReadingEvent = pgTable("book_reading_event", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  chapterId: text("chapter_id").notNull(),
  eventType: text("event_type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Intelligence: SEO Research (NeuronWriter) ───────────────────────

export const seoResearch = pgTable("seo_research", {
  id: text("id").primaryKey(),
  keyword: text("keyword").notNull(),
  searchVolume: integer("search_volume"),
  difficulty: integer("difficulty"),
  currentPosition: integer("current_position"),
  targetUrl: text("target_url"),
  contentScore: integer("content_score"),
  recommendations: jsonb("recommendations").$type<Record<string, unknown>>(),
  source: text("source").default("neuronwriter"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  researchedAt: timestamp("researched_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Native Forms ──────────────────────────────────────────────
export const formSubmission = pgTable("form_submission", {
  id: text("id").primaryKey(),
  formSlug: text("form_slug").notNull(),
  email: text("email").notNull(),
  name: text("name"),
  data: jsonb("data").notNull().$type<Record<string, unknown>>(),
  score: integer("score"),
  scoreBreakdown: jsonb("score_breakdown").$type<Record<string, number>>(),
  status: text("status").notNull().default("new"),
  adminNotes: text("admin_notes"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Component State Persistence ─────────────────────────────────────
export const userComponentState = pgTable(
  "user_component_state",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    componentType: text("component_type").notNull(),
    persistKey: text("persist_key").notNull(),
    state: jsonb("state").notNull().$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
  },
  (table) => ({
    uniqueUserComponent: uniqueIndex("idx_user_component_state_unique").on(
      table.userId,
      table.componentType,
      table.persistKey,
    ),
    userIdx: index("idx_user_component_state_user").on(table.userId),
  }),
);

export const formWorkflowLog = pgTable("form_workflow_log", {
  id: text("id").primaryKey(),
  submissionId: text("submission_id")
    .notNull()
    .references(() => formSubmission.id, { onDelete: "cascade" }),
  workflowType: text("workflow_type").notNull(),
  status: text("status").notNull().default("pending"),
  responseData: jsonb("response_data").$type<Record<string, unknown>>(),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
});

// ── Connected Accounts (Attio, Notion, Hunter, Pipedrive, Brevo, WhatsApp) ──

export const connectedAccount = pgTable(
  "connected_account",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(), // 'attio' | 'notion' | 'hunter' | 'pipedrive' | 'brevo' | 'whatsapp'
    accessTokenEncrypted: text("access_token_encrypted").notNull(),
    refreshTokenEncrypted: text("refresh_token_encrypted"),
    tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }),
    providerAccountId: text("provider_account_id"),
    providerMetadata:
      jsonb("provider_metadata").$type<Record<string, unknown>>(),
    status: text("status").notNull().default("active"), // 'active' | 'expired' | 'revoked'
    lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
  },
  (table) => ({
    uniqueUserProvider: uniqueIndex("idx_connected_account_unique").on(
      table.userId,
      table.provider,
    ),
    userIdx: index("idx_connected_account_user").on(table.userId),
  }),
);

// ── Outreach Log ────────────────────────────────────────────────────

export const outreachLog = pgTable(
  "outreach_log",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    prospectName: text("prospect_name").notNull(),
    prospectCompany: text("prospect_company"),
    channel: text("channel").notNull(), // 'email' | 'linkedin' | 'phone' | 'twitter' | 'event' | 'other'
    action: text("action").notNull(), // 'initial_outreach' | 'follow_up' | 'meeting_booked' | 'meeting_held' | 'proposal_sent' | 'other'
    notes: text("notes"),
    outcome: text("outcome"), // 'positive' | 'neutral' | 'negative' | null
    dealId: text("deal_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    loggedAt: timestamp("logged_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
  },
  (table) => ({
    userIdx: index("idx_outreach_log_user").on(table.userId),
    loggedAtIdx: index("idx_outreach_log_logged_at").on(table.loggedAt),
    userChannelIdx: index("idx_outreach_log_user_channel").on(
      table.userId,
      table.channel,
    ),
  }),
);

// ── Pipeline Deals (Kanban) ─────────────────────────────────────────

export const pipelineDeal = pgTable(
  "pipeline_deal",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    prospectName: text("prospect_name").notNull(),
    prospectCompany: text("prospect_company"),
    prospectEmail: text("prospect_email"),
    prospectLinkedin: text("prospect_linkedin"),
    stage: text("stage").notNull().default("lead"), // 'lead' | 'contacted' | 'meeting' | 'proposal' | 'won' | 'lost'
    dealValue: integer("deal_value"), // in cents
    currency: text("currency").default("USD"),
    probability: integer("probability"), // 0-100
    expectedCloseDate: timestamp("expected_close_date", { withTimezone: true }),
    lossReason: text("loss_reason"),
    attioRecordId: text("attio_record_id"),
    notes: text("notes"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    stageChangedAt: timestamp("stage_changed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
  },
  (table) => ({
    userIdx: index("idx_pipeline_deal_user").on(table.userId),
    userStageIdx: index("idx_pipeline_deal_user_stage").on(
      table.userId,
      table.stage,
    ),
  }),
);

// ── Lesson Feedback ──────────────────────────────────────────────────
export const lessonFeedback = pgTable(
  "lesson_feedback",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull(),
    lessonId: text("lesson_id").notNull(),
    sentiment: text("sentiment").notNull(), // 'positive' | 'negative'
    category: text("category"), // e.g. 'confusing', 'outdated', 'great_examples', etc.
    comment: text("comment"), // optional free-text
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
  },
  (table) => ({
    lessonIdx: index("idx_lesson_feedback_lesson").on(
      table.courseId,
      table.lessonId,
    ),
    userIdx: index("idx_lesson_feedback_user").on(table.userId),
  }),
);

// ---------------------------------------------------------------------------
// Document embeddings — pgvector RAG pipeline
// ---------------------------------------------------------------------------

export const documentEmbedding = pgTable(
  "document_embedding",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    documentId: text("document_id").notNull(),
    chunkIndex: integer("chunk_index").notNull(),
    chunkText: text("chunk_text").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }).notNull(),
    source: text("source").default("document").notNull(), // 'document' | 'lesson'
    metadata: jsonb("metadata").$type<{
      fileName?: string;
      documentType?: string;
      trackId?: string;
      courseId?: string;
      lessonId?: string;
      lessonTitle?: string;
      courseTitle?: string;
      charStart?: number;
      charEnd?: number;
    }>(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    tenantId: uuid("tenant_id")
    .notNull()
    .default(sql`current_setting('app.tenant_id', true)::uuid`), // FK enforced by Postgres in 0003_app_tenancy.sql; cross-package import blocked by B-035 ESLint rule.
  },
  (table) => ({
    userIdx: index("idx_doc_embedding_user").on(table.userId),
    docIdx: index("idx_doc_embedding_doc").on(table.userId, table.documentId),
  }),
);
