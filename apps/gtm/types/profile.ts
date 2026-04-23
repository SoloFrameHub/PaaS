/**
 * FounderProfile Types
 * Comprehensive schema for user profile, AI analysis, and versioned artifacts
 */

export type BusinessModel =
  | "b2b-saas"
  | "creator-coach"
  | "service"
  | "marketplace"
  | "other";
export type Stage =
  | "idea"
  | "pre-launch"
  | "pre-revenue"
  | "0-10k"
  | "10k-100k"
  | "scaling";
export type PrimaryGoal =
  | "first-10"
  | "first-100"
  | "conversion"
  | "systematic"
  | "other";
export type DocumentType =
  | "pitch-deck"
  | "proposal"
  | "email-thread"
  | "marketing"
  | "website-copy"
  | "other";
export type DISCType = "D" | "I" | "S" | "C";
export type AcquisitionPath = "inbound" | "outbound" | "hybrid";
export type Impact = "high" | "medium" | "low";

export interface ConfidenceScores {
  icpClarity: number;
  positioningStrength: number;
  messagingConsistency: number;
  valueArticulation: number;
}

export interface LinkedinAnalysis {
  professionalBio: string | null;
  experienceHighlights: string[];
  skills: string[];
  authorityIndicators: string[];
  perceivedExpertise: string | null;
  audienceFit: string | null;
  analyzedAt: string | null;
}

export interface DocumentSummary {
  documentId: string;
  fileName: string;
  summary: string;
  keySignals: string[];
  relevantTo: string[]; // e.g. ['icp', 'value-prop', 'competitive', 'pricing']
}

export interface RagSignals {
  aggregatedInsights: string;
  valuePropSignals: string[];
  icpSignals: string[];
  competitiveSignals?: string[];
  documentSummaries?: DocumentSummary[];
}

export interface InferredContext {
  icpSummary: string | null;
  valueProposition: string | null;
  competitivePositioning: string | null;
  pricingStructure: string | null;
  industryVertical: string | null;
  commonObjections: string[];
  typicalUseCases: string[];
  voiceSample: string | null;
  competitorMentions: string[];
  ragSignals?: RagSignals | null;
  confidence: ConfidenceScores;
  extractedFrom: {
    websiteAnalyzedAt: string | null;
    linkedinAnalyzedAt: string | null;
    documentsAnalyzed: string[];
    lastUpdated: string;
  };
  linkedinAnalysis?: LinkedinAnalysis;
}

export interface DocumentExtraction {
  summary: string;
  keyPoints: string[];
  relevantTo: string[];
}

export interface ProfileDocument {
  id: string;
  type: DocumentType;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageUrl: string;
  vectorized: boolean;
  chunkCount: number;
  extractedContext: DocumentExtraction | null;
  uploadedAt: string;
  processedAt: string | null;
}

export interface ArtifactHistory<T> {
  version: number;
  content: T;
  courseId: number;
  timestamp: string;
}

export interface VersionedArtifact<T> {
  version: number;
  content: T;
  createdInCourse: number;
  createdAt: string;
  history: ArtifactHistory<T>[];
}

export interface DISCProfile {
  selfType: DISCType | null;
  secondaryType: DISCType | null;
  prospectPreferences: {
    mostComfortable: DISCType;
    mostChallenging: DISCType;
  };
  assessedAt: string;
}

export interface ObjectionEntry {
  id: string;
  objection: string;
  category: string;
  response: string;
  effectiveness: number;
  usageCount: number;
}

// Artifact content types
export interface ICPDocument {
  summary: string;
  decisionMaker: {
    title: string;
    responsibilities: string[];
    painPoints: string[];
    goals: string[];
  };
  company: {
    size: string;
    industry: string[];
    characteristics: string[];
  };
  buyingProcess: {
    triggers: string[];
    stakeholders: string[];
    timeline: string;
    budget: string;
  };
}

export interface ValuePropCanvas {
  customerJobs: string[];
  pains: string[];
  gains: string[];
  products: string[];
  painRelievers: string[];
  gainCreators: string[];
}

export interface ListCriteria {
  sources: string[];
  filters: Record<string, string[]>;
  exclusions: string[];
  prioritization: string;
}

export interface DiscoveryPlaybook {
  openingQuestions: string[];
  painQuestions: string[];
  impactQuestions: string[];
  decisionQuestions: string[];
  closingQuestions: string[];
}

export interface EmailSequence {
  name: string;
  purpose: string;
  emails: {
    subject: string;
    body: string;
    timing: string;
  }[];
}

export interface PersonalPlaybook {
  weeklyRhythm: Record<string, string[]>;
  keyMetrics: string[];
  messageTemplates: Record<string, string>;
  processSteps: Record<string, string[]>;
}

export interface ProfileArtifacts {
  icpDocument: VersionedArtifact<ICPDocument> | null;
  positioningStatement: VersionedArtifact<string> | null;
  valuePropositionCanvas: VersionedArtifact<ValuePropCanvas> | null;
  acquisitionPath: {
    primary: AcquisitionPath;
    channels: string[];
    selectedAt: string;
  } | null;
  listBuildingCriteria: VersionedArtifact<ListCriteria> | null;
  discProfile: DISCProfile | null;
  discoveryPlaybook: VersionedArtifact<DiscoveryPlaybook> | null;
  objectionLibrary: {
    entries: ObjectionEntry[];
    lastUpdated: string;
  } | null;
  emailSequences: VersionedArtifact<EmailSequence[]> | null;
  personalPlaybook: VersionedArtifact<PersonalPlaybook> | null;
}

export interface AssessmentScores {
  icpClarity: number;
  positioningStrength: number;
  messagingConsistency: number;
  channelReadiness: number;
  salesProcessMaturity: number;
}

export type ActionType =
  | "course"
  | "artifact"
  | "workshop"
  | "coach-session"
  | "roleplay";

export interface ActionTarget {
  courseNumber?: number;
  artifactType?: string;
  workshopId?: string;
  roleplayConfig?: { discType: string; scenarioType: string };
}

export interface AssessmentItem {
  category: string;
  title: string;
  description: string;
  impact: Impact;
  addressedInCourse?: number;
  actionableStep: string;
  actionType?: ActionType;
  actionTarget?: ActionTarget;
  frameworkRef?: string;
}

export interface JourneyPhase {
  phase: string;
  courses: number[];
  estimatedWeeks: number;
}

export interface SourceAudit {
  source: "website" | "linkedin" | "documents";
  title: string;
  critique: string;
  recommendations: string[];
}

export interface Assessment {
  overallReadiness: number;
  scores: AssessmentScores;
  scoreReasoning: Record<keyof AssessmentScores, string>;
  quickWins: AssessmentItem[];
  criticalGaps: AssessmentItem[];
  recommendedPath: AcquisitionPath;
  recommendedStartCourse: number;
  journeyMap: JourneyPhase[];
  personalizedInsight: string;
  sourceAudits?: SourceAudit[];
  generatedAt: string;
}

export type BadgeTier = "bronze" | "silver" | "gold" | "platinum";
export type BadgeCategory =
  | "milestone"
  | "streak"
  | "xp"
  | "artifact"
  | "roleplay"
  | "community";

export interface BadgeEarned {
  id: string;
  earnedAt: string;
  courseId?: number;
}

export interface CertificationEarned {
  certId: string; // unique cert UUID
  badgrAssertionUrl: string | null; // null if Badgr issuance failed (stored locally anyway)
  earnedAt: string;
  locale: "en" | "es";
}

export interface Progress {
  completedCourses: number[];
  completedLessons: Record<string, string[]>; // courseId -> lessonIds[]
  currentCourse: number | null;
  xpTotal: number;
  badges: BadgeEarned[];
  currentStreak: number;
  longestStreak: number;
  streakUpdatedAt: string;
  roleplayStats?: {
    totalSessions: number;
    avgScore: number;
    byDiscType: Record<string, { sessions: number; avgScore: number }>;
  };
  certificationEarned?: CertificationEarned | null;
  lastActivityAt: string;
}

export interface Celebrations {
  badges?: BadgeEarned[];
  streakMilestone?: number;
  levelUp?: { from: number; to: number; title: string };
  courseCompleted?: string;
}

export interface FounderProfile {
  id: string;
  userId: string;

  // Core (manual)
  name: string;
  email: string;
  businessName: string;
  websiteUrl: string | null;
  stage: Stage | null;
  businessModel: BusinessModel | null;
  primaryGoal: PrimaryGoal | null;
  biggestChallenge: string | null;
  elevatorPitch: string | null;
  targetAudience: string | null;
  linkedinUrl: string | null;
  linkedinAbout: string | null;

  onboardingCompleted: boolean;
  onboardingCompletedAt: string | null;
  analysisStatus?: "idle" | "analyzing" | "completed" | "failed";
  profileVersion: number;

  // AI-extracted
  inferred: InferredContext;

  // Uploaded
  documents: ProfileDocument[];

  // Course-built
  artifacts: ProfileArtifacts;

  // Assessment
  assessment: Assessment | null;

  // Progress
  progress: Progress;

  // Expanded Questionnaire Data
  questionnaire?: {
    // Section 1: Business Context
    target_roles: string[];
    industry: string;
    deal_size: "transactional" | "smb" | "mid_market" | "enterprise" | "";

    // Section 2: Current State
    sales_journey: string;
    revenue_range: string;
    customer_count: string;

    // Section 3: Founder Profile
    founder_description: string;
    barriers: string[];

    // Section 4: DISC Assessment
    disc_answers: Record<string, string>;
    disc_profile?: {
      primary: DISCType;
      secondary?: DISCType;
    };

    // Section 5: Learning Priorities
    urgency: string;
    channels: string[];

    // Section 6: Engagement Capacity
    time_commitment: string;
    learning_style: "aggressive" | "assistive" | "adaptive" | "";

    // Section 7: Goals & Success
    success_90_days: string;
    has_icp_docs: string;

    // Section 8: Creator Economy (conditional for creator-coach)
    creator_offer_type?:
      | "courses"
      | "coaching-1on1"
      | "coaching-group"
      | "membership"
      | "community"
      | "hybrid"
      | "";
    creator_price_point?:
      | "low-ticket"
      | "mid-ticket"
      | "high-ticket"
      | "premium"
      | "";
    creator_acquisition?: string[];
    creator_platforms?: string[];
    creator_email_list_size?:
      | "under-500"
      | "500-2000"
      | "2000-10000"
      | "10000-plus"
      | "";
    creator_sales_call_status?:
      | "self-close"
      | "team"
      | "automated"
      | "want-to-start"
      | "";
    creator_has_value_ladder?: "yes" | "no" | "unsure" | "";
    creator_launch_model?: "live" | "evergreen" | "hybrid" | "not-yet" | "";
  };

  // RAG Metadata
  rag_metadata?: {
    total_chunks: number;
    index_name: string;
    last_indexed_at: string;
  };

  createdAt: string;
  updatedAt: string;
}

// Keep the old interfaces for compatibility if needed, but the above is the new source of truth
export interface OnboardingStatus {
  profileCompleteness: number; // 0-100
  documentCount: number;
  contextLevel: "minimal" | "moderate" | "good" | "elite";
  contextFeedback?: string;
  isOnboarded: boolean;
  missingFields: string[];
}

export interface PersonalizationContext {
  context: string;
  hasContext: boolean;
}
