/**
 * WellnessProfile Types
 * Comprehensive schema for wellness user profiles, symptom tracking, and progress
 */

// ============================================================================
// CORE ENUMS AND TYPES
// ============================================================================

/** Primary symptom categories users can select */
export type SymptomCategory =
  | 'anxiety'
  | 'depression'
  | 'sleep'
  | 'panic'
  | 'social-anxiety'
  | 'trauma'
  | 'stress'
  | 'ocd'
  | 'anger'
  | 'grief'
  | 'other';

/** Severity levels for symptoms */
export type Severity = 'mild' | 'moderate' | 'severe';

/** Duration of symptom experience */
export type SymptomDuration =
  | 'less-than-2-weeks'
  | '2-4-weeks'
  | '1-3-months'
  | '3-6-months'
  | '6-12-months'
  | 'more-than-1-year';

/** Crisis risk levels */
export type CrisisRiskLevel = 'none' | 'low' | 'moderate' | 'high' | 'immediate';

/** Wellness goals users can select */
export type WellnessGoal =
  | 'reduce-anxiety'
  | 'improve-mood'
  | 'sleep-better'
  | 'manage-stress'
  | 'build-confidence'
  | 'understand-feelings'
  | 'develop-coping-skills'
  | 'improve-relationships'
  | 'increase-motivation'
  | 'practice-self-care'
  // Legacy aliases for backward compatibility
  | 'better-sleep'
  | 'manage-panic'
  | 'social-confidence'
  | 'process-trauma'
  | 'manage-thoughts'
  | 'anger-management'
  | 'cope-with-grief'
  | 'general-wellness'
  | 'learn-coping-skills';

/** Learning preferences */
export type LearningStyle = 'self-paced' | 'guided' | 'intensive';

/** Time commitment levels */
export type TimeCommitment = '5-10-min' | '15-20-min' | '30-plus-min';

// ============================================================================
// SYMPTOM & ASSESSMENT TYPES
// ============================================================================

/** Individual symptom selection with severity */
export interface SymptomSelection {
  category: SymptomCategory;
  severity: Severity;
  duration?: SymptomDuration;
  isPrimary: boolean;
}

/** GAD-7 style anxiety assessment */
export interface AnxietyAssessment {
  // GAD-7 Questions (0-3 scale: not at all, several days, more than half, nearly every day)
  nervousAnxious: number;
  cantStopWorrying: number;
  worryingTooMuch: number;
  troubleRelaxing: number;
  restless: number;
  easilyAnnoyed: number;
  afraidSomethingAwful: number;
  // Calculated
  totalScore: number; // 0-21
  severity: 'minimal' | 'mild' | 'moderate' | 'severe'; // 0-4, 5-9, 10-14, 15-21
  assessedAt: string;
}

/** PHQ-9 style depression screening (simplified) */
export interface DepressionScreening {
  littleInterest: number;
  feelingDown: number;
  sleepProblems: number;
  littleEnergy: number;
  appetiteProblems: number;
  feelingBad: number;
  troubleConcentrating: number;
  movingSlowly: number;
  betterOffDead: number; // Critical - triggers crisis protocol
  totalScore: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'moderately-severe' | 'severe';
  assessedAt: string;
}

/** Crisis screening results */
export interface CrisisScreening {
  hasCurrentSuicidalThoughts: boolean;
  hasSelfHarmThoughts: boolean;
  hasImmediateDangerConcern: boolean;
  hasPlanOrMeans: boolean;
  riskLevel: CrisisRiskLevel;
  screenedAt: string;
  acknowledged988Resources: boolean;
  safetyPlanOffered?: boolean;
}

/** Combined wellness assessment */
export interface WellnessAssessment {
  // Symptom-based scores (0-100)
  overallWellnessScore: number;
  anxietyScore: number;
  moodScore: number;
  sleepScore: number;
  stressScore: number;

  // Assessments
  anxietyAssessment?: AnxietyAssessment;
  depressionScreening?: DepressionScreening;
  crisisScreening?: CrisisScreening;

  // Self-assessment history (GAD-7, PHQ-9, etc.)
  assessmentHistory?: import('./assessment').AssessmentResult[];

  // Recommendations
  recommendedCourses: string[];
  recommendedStartCourse: string;
  priorityFocus: SymptomCategory[];

  // Personalization
  personalizedInsight: string;
  strengthsIdentified: string[];
  areasForGrowth: string[];

  generatedAt: string;
}

// ============================================================================
// PROGRESS & TRACKING TYPES
// ============================================================================

/** Daily mood check-in entry */
export interface MoodEntry {
  id: string;
  date: string;
  moodRating: number; // 1-10
  anxietyLevel: number; // 1-10
  sleepQuality: number; // 1-10
  energyLevel: number; // 1-10
  notes?: string;
  copingTechniquesUsed: string[];
  triggers?: string[];
}

/** Coping technique practice log */
export interface TechniquePractice {
  techniqueId: string;
  techniqueName: string;
  practicedAt: string;
  duration: number; // minutes
  effectivenessRating: number; // 1-5
  notes?: string;
}

/** Course and lesson progress */
export interface WellnessProgress {
  completedCourses: string[];
  completedLessons: Record<string, string[]>; // courseId -> lessonIds[]
  completedQuizzes?: Record<string, string[]>; // courseId -> lessonIds where quiz was passed
  currentCourse: string | null;

  // Gamification
  xpTotal: number;
  streakDays: number;
  longestStreak: number;
  badges: string[];

  // Technique mastery
  techniquesPracticed: Record<string, number>; // techniqueId -> practice count
  favoritesTechniques: string[];

  // Mood tracking
  moodEntries: MoodEntry[];
  techniquePractices: TechniquePractice[];

  // Tracking logs (Sleep Diary, Activity-Mood Log, etc.)
  trackingLogs?: import('./tracking-log').TrackingLogEntry[];

  // Thought records (CBT cognitive restructuring worksheets)
  thoughtRecords?: import('./thought-record').ThoughtRecordEntry[];

  // Persistent checklists (Sleep Hygiene, Bedroom Audit, Lifestyle Audit, etc.)
  checklists?: import('./checklist').ChecklistProgress[];

  // Interactive component state (FlipCards, Accordions, Slides)
  componentStates?: import('./component-state').LessonComponentState[];

  lastActivityAt: string;
}

// ============================================================================
// QUESTIONNAIRE TYPES
// ============================================================================

/** Life stage options */
export type AgeRange = 'under-18' | '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65-plus';
export type LifeStage = 'student' | 'working' | 'unemployed' | 'stay-at-home' | 'retired' | 'other';
export type LivingSituation = 'alone' | 'with-partner' | 'with-family' | 'with-roommates' | 'other';
export type SupportNetworkStrength = 'none' | 'weak' | 'moderate' | 'strong';
export type GroupPreference = 'prefer-individual' | 'open-to-group' | 'prefer-group';
export type TherapyHistory = 'never' | 'past' | 'currently-in-therapy';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night' | 'varies';

/** Wellness onboarding questionnaire data */
export interface WellnessQuestionnaire {
  // Step 1: What brings you here
  primarySymptoms: SymptomSelection[];
  otherSymptomDescription?: string;

  // Step 2: Duration & Impact
  symptomDuration: SymptomDuration;
  impactOnDailyLife: 'minimal' | 'somewhat' | 'significant' | 'severe';
  currentlyReceivingTreatment: boolean;
  treatmentType?: string[];

  // Step 3: Goals
  wellnessGoals: WellnessGoal[];
  personalGoalDescription?: string;

  // Step 4: Learning preferences
  learningStyle: LearningStyle;
  timeCommitment: TimeCommitment;
  preferredContentTypes: ('reading' | 'video' | 'audio' | 'interactive')[];

  // Step 5: About You — Life situation & social support
  ageRange?: AgeRange;
  lifeStage?: LifeStage;
  livingSituation?: LivingSituation;
  supportNetworkStrength?: SupportNetworkStrength;
  hasTrustedPerson?: boolean;
  comfortWithGroupActivities?: GroupPreference;

  // Step 6: Your Experience — Coping history & triggers
  currentCopingStrategies?: string[];
  unhealthyCopingToChange?: string[];
  therapyHistory?: TherapyHistory;
  previousSelfHelpExperience?: boolean;
  knownTriggers?: string[];
  worstTimeOfDay?: TimeOfDay;
  seasonalPatterns?: boolean;

  // Step 7: In Your Own Words — Free-text reflections
  goodDayDescription?: string;
  biggestChallenge?: string;
  hopedSupportDescription?: string;
  personalPatterns?: string;
  anythingElse?: string;

  // Step 8: Crisis screening (always performed)
  crisisScreeningCompleted: boolean;
  crisisScreeningResult?: CrisisScreening;

  // Metadata
  completedAt: string;
}

// ============================================================================
// MAIN PROFILE TYPE
// ============================================================================

/**
 * WellnessProfile - Main user profile for wellness platform
 * Replaces FounderProfile for mental health education context
 */
export interface WellnessProfile {
  id: string;
  userId: string;

  // Core identity
  name: string;
  email: string;
  displayName?: string; // Optional anonymous display name

  // Onboarding state
  onboardingCompleted: boolean;
  onboardingCompletedAt: string | null;
  profileVersion: number;

  // Wellness questionnaire data
  questionnaire?: WellnessQuestionnaire;

  // Assessment results
  assessment: WellnessAssessment | null;

  // Wellness score history (snapshots for delta computation)
  wellnessScoreHistory?: import('./wellness-scores').WellnessScoreSnapshot[];

  // Progress tracking
  progress: WellnessProgress;

  // Preferences
  preferences: {
    emailReminders: boolean;
    dailyCheckInTime?: string; // HH:MM format
    darkMode?: boolean;
    contentAccessibility?: {
      largeText: boolean;
      highContrast: boolean;
      reducedMotion: boolean;
    };
  };

  // Crisis & Safety
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  has988Acknowledged: boolean;
  lastCrisisScreeningAt?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// BACKWARD COMPATIBILITY - Alias for gradual migration
// ============================================================================

/**
 * @deprecated Use WellnessProfile instead. Kept for backward compatibility during migration.
 */
export type FounderProfile = WellnessProfile;

// ============================================================================
// HELPER TYPES
// ============================================================================

export interface OnboardingStatus {
  profileCompleteness: number; // 0-100
  hasSymptomSelection: boolean;
  hasAssessment: boolean;
  hasCrisisScreening: boolean;
  isOnboarded: boolean;
  missingSteps: string[];
}

export interface PersonalizationContext {
  primarySymptom: SymptomCategory | null;
  severity: Severity | null;
  recommendedCourses: string[];
  hasContext: boolean;
}

/** Symptom routing - maps symptoms to recommended courses (actual curriculum IDs) */
export const SYMPTOM_COURSE_MAPPING: Record<SymptomCategory, string[]> = {
  'anxiety': ['anxiety-management', 'anxiety-toolkit-foundations', 'anxiety-toolkit-skills', 'anxiety-toolkit-resilience', 'panic-disorder'],
  'depression': ['depression-action', 'emotional-dysregulation', 'low-self-esteem', 'anxiety-toolkit-foundations', 'managing-perfectionism'],
  'sleep': ['sleep-insomnia', 'sleep-mastery', 'stress-burnout', 'anxiety-management', 'anxiety-toolkit-foundations'],
  'panic': ['panic-disorder', 'anxiety-management', 'anxiety-toolkit-foundations', 'anxiety-toolkit-skills', 'anxiety-toolkit-resilience'],
  'social-anxiety': ['social-anxiety', 'anxiety-toolkit-resilience', 'anxiety-toolkit-foundations', 'anxiety-management', 'anxiety-toolkit-skills'],
  'trauma': ['trauma-recovery', 'stress-burnout', 'anxiety-toolkit-skills', 'anxiety-toolkit-foundations', 'anxiety-management'],
  'stress': ['stress-burnout', 'anxiety-management', 'anxiety-toolkit-skills', 'anxiety-toolkit-foundations', 'trauma-recovery'],
  'ocd': ['ocd-toolkit', 'anxiety-toolkit-foundations', 'anxiety-toolkit-skills', 'anxiety-management', 'anxiety-toolkit-resilience'],
  'anger': ['anger-management', 'emotional-dysregulation', 'stress-burnout', 'anxiety-toolkit-foundations', 'depression-action'],
  'grief': ['grief-loss', 'depression-action', 'emotional-dysregulation', 'low-self-esteem', 'anxiety-toolkit-foundations'],
  'other': ['anxiety-management', 'anxiety-toolkit-foundations', 'stress-burnout', 'depression-action', 'emotional-dysregulation'],
};

/** GAD-7 severity interpretation */
export function interpretGAD7Score(score: number): AnxietyAssessment['severity'] {
  if (score <= 4) return 'minimal';
  if (score <= 9) return 'mild';
  if (score <= 14) return 'moderate';
  return 'severe';
}

/** PHQ-9 severity interpretation */
export function interpretPHQ9Score(score: number): DepressionScreening['severity'] {
  if (score <= 4) return 'minimal';
  if (score <= 9) return 'mild';
  if (score <= 14) return 'moderate';
  if (score <= 19) return 'moderately-severe';
  return 'severe';
}
