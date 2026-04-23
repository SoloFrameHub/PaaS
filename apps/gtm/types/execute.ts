/**
 * Types for the Execute & Measure layers
 * (outreach logging, pipeline tracking, integrations, exports, coaching nudges)
 */

// ── Outreach ────────────────────────────────────────────────────────

export type OutreachChannel =
  | "whatsapp"
  | "instagram_dm"
  | "email"
  | "phone"
  | "linkedin"
  | "event"
  | "facebook_messenger"
  | "twitter"
  | "sms"
  | "other";
export type OutreachAction =
  | "initial_outreach"
  | "follow_up"
  | "meeting_booked"
  | "meeting_held"
  | "proposal_sent"
  | "voice_note"
  | "other";
export type OutreachOutcome = "positive" | "neutral" | "negative";

export interface OutreachLog {
  id: string;
  userId: string;
  prospectName: string;
  prospectCompany: string | null;
  channel: OutreachChannel;
  action: OutreachAction;
  notes: string | null;
  outcome: OutreachOutcome | null;
  dealId: string | null;
  metadata: Record<string, unknown> | null;
  loggedAt: string;
  createdAt: string;
}

export interface OutreachStats {
  totalActions: number;
  byChannel: Record<OutreachChannel, number>;
  byAction: Record<OutreachAction, number>;
  byOutcome: Record<OutreachOutcome | "pending", number>;
}

// ── Pipeline ────────────────────────────────────────────────────────

export type DealStage =
  | "lead"
  | "contacted"
  | "meeting"
  | "proposal"
  | "won"
  | "lost";

export const DEAL_STAGES: DealStage[] = [
  "lead",
  "contacted",
  "meeting",
  "proposal",
  "won",
  "lost",
];

export const DEAL_STAGE_LABELS: Record<DealStage, string> = {
  lead: "Lead",
  contacted: "Contacted",
  meeting: "Meeting",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};

export interface PipelineDeal {
  id: string;
  userId: string;
  prospectName: string;
  prospectCompany: string | null;
  prospectEmail: string | null;
  prospectLinkedin: string | null;
  stage: DealStage;
  dealValue: number | null;
  currency: string;
  probability: number | null;
  expectedCloseDate: string | null;
  lossReason: string | null;
  attioRecordId: string | null;
  notes: string | null;
  metadata: Record<string, unknown> | null;
  stageChangedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStats {
  totalDeals: number;
  totalValue: number;
  byStage: Record<DealStage, { count: number; value: number }>;
  conversionRate: number; // won / (won + lost), 0 if no closed deals
}

// ── Connected Accounts ──────────────────────────────────────────────

export type IntegrationProvider =
  | "attio"
  | "notion"
  | "hunter"
  | "pipedrive"
  | "brevo"
  | "whatsapp";

export type ConnectionStatus = "active" | "expired" | "revoked";

export interface ConnectedAccount {
  id: string;
  userId: string;
  provider: IntegrationProvider;
  providerAccountId: string | null;
  providerMetadata: Record<string, unknown> | null;
  status: ConnectionStatus;
  lastSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ── Export ───────────────────────────────────────────────────────────

export type ExportFormat = "markdown" | "csv" | "html";

export type ExportableArtifact =
  | "icpDocument"
  | "positioningStatement"
  | "valuePropositionCanvas"
  | "listBuildingCriteria"
  | "discoveryPlaybook"
  | "objectionLibrary"
  | "emailSequences"
  | "personalPlaybook";

export interface ExportResult {
  data: string;
  mimeType: string;
  fileName: string;
}

// ── Coaching Nudges ─────────────────────────────────────────────────

export type NudgeType =
  | "outreach_gap"
  | "pipeline_stale"
  | "assessment_weakness"
  | "artifact_missing"
  | "streak_risk"
  | "milestone_approaching";

export interface CoachingNudge {
  id: string;
  type: NudgeType;
  title: string;
  message: string;
  priority: number; // 1-5, 5 = highest
  actionUrl?: string;
  actionLabel?: string;
}

// ── Daily Digest ────────────────────────────────────────────────────

export interface DigestContext {
  userId: string;
  userName: string;
  email: string;
  recentLessons: { courseId: string; lessonId: string; xpEarned: number }[];
  outreachStats: OutreachStats;
  pipelineStats: PipelineStats;
  streak: { current: number; longest: number };
  assessmentScores: {
    overallReadiness: number;
    icpClarity: number;
    positioningStrength: number;
    messagingConsistency: number;
    channelReadiness: number;
    salesProcessMaturity: number;
  } | null;
  discPrimary: string | null;
}
