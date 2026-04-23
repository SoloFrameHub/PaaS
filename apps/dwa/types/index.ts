// Re-export all types for convenience
// Note: wellness-profile.ts exports FounderProfile as alias to WellnessProfile for backwards compatibility
// Explicitly import from profile.ts to avoid conflicts with wellness-profile.ts
export type {
    BusinessModel, Stage, PrimaryGoal, DocumentType, DISCType, AcquisitionPath, Impact,
    ConfidenceScores, LinkedinAnalysis, RagSignals, InferredContext,
    DocumentExtraction, ProfileDocument, ArtifactHistory, VersionedArtifact,
    DISCProfile, ObjectionEntry, ICPDocument, ValuePropCanvas, ListCriteria,
    DiscoveryPlaybook, EmailSequence, PersonalPlaybook, ProfileArtifacts,
    AssessmentScores, AssessmentItem, JourneyPhase, SourceAudit, Assessment, Progress
} from './profile';
export * from './wellness-profile';
export * from './course';
export * from './ai';
