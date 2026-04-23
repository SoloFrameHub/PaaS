import { FounderProfile } from "@/types/profile";

export interface SafeContext {
  name: string;
  businessName: string;
  businessModel: string | null;
  stage: string | null;
  websiteUrl: string | null;
  linkedinUrl: string | null;
  primaryGoal: string | null;
  biggestChallenge: string | null;
  elevatorPitch: string | null;
  targetAudience: string | null;
  questionnaire: {
    industry: string | undefined;
    target_roles: string[] | undefined;
    deal_size: string | undefined;
    urgency: string | undefined;
    sales_journey?: string;
    revenue_range?: string;
    customer_count?: string;
    founder_description?: string;
    barriers?: string[];
    disc_profile?: { primary: string; secondary?: string };
    channels?: string[];
    time_commitment?: string;
    learning_style?: string;
    success_90_days?: string;
    creator_offer_type?: string;
    creator_price_point?: string;
    creator_acquisition?: string[];
  };
  inferred: {
    icpSummary: string | null;
    valueProposition: string | null;
    competitivePositioning: string | null;
    pricingStructure: string | null;
    linkedinAnalysis: string | null;
    ragSignals: any | null;
  };
  artifacts?: {
    icpDocument?: string | null;
    positioningStatement?: string | null;
    valueProposition?: string | null;
    acquisitionPath?: string | null;
    discoveryPlaybook?: string | null;
  };
  assessment?: {
    overallReadiness: number;
    scores: Record<string, number>;
    scoreReasoning?: Record<string, string>;
    quickWins?: {
      title: string;
      category: string;
      description: string;
      impact: string;
    }[];
    criticalGaps?: {
      title: string;
      category: string;
      description: string;
      impact: string;
    }[];
    recommendedPath?: string;
    personalizedInsight?: string;
  };
  progress?: {
    completedCourses: number[];
    totalLessonsCompleted: number;
    currentCourse: number | null;
    xpTotal: number;
    currentStreak: number;
  };
}

export class ProfileContextService {
  /**
   * Extracts ONLY business-relevant data for AI prompts, stripping PII and compressing tokens.
   */
  getSafeContext(
    profile: FounderProfile,
    options: {
      ultraLean?: boolean;
      highFidelity?: boolean;
      coaching?: boolean;
    } = {},
  ): SafeContext {
    const truncate = (str: string | null | undefined, maxLen = 500) => {
      if (!str) return null;
      if (str.length <= maxLen) return str;
      return str.substring(0, maxLen) + "... [truncated]";
    };

    const context: SafeContext = {
      name: profile.name,
      businessName: profile.businessName,
      businessModel: profile.businessModel,
      stage: profile.stage,
      websiteUrl: profile.websiteUrl,
      linkedinUrl: profile.linkedinUrl,
      primaryGoal: truncate(profile.primaryGoal, 200),
      biggestChallenge: truncate(profile.biggestChallenge, 200),
      elevatorPitch: truncate(profile.elevatorPitch, 300),
      targetAudience: truncate(profile.targetAudience, 250),
      questionnaire: {
        industry: profile.questionnaire?.industry,
        target_roles: profile.questionnaire?.target_roles,
        deal_size: profile.questionnaire?.deal_size,
        urgency: profile.questionnaire?.urgency,
        ...(options.highFidelity || options.coaching
          ? {
              sales_journey: profile.questionnaire?.sales_journey,
              revenue_range: profile.questionnaire?.revenue_range,
              customer_count: profile.questionnaire?.customer_count,
              founder_description: profile.questionnaire?.founder_description,
              barriers: profile.questionnaire?.barriers,
              disc_profile: profile.questionnaire?.disc_profile,
              channels: profile.questionnaire?.channels,
              time_commitment: profile.questionnaire?.time_commitment,
              learning_style: profile.questionnaire?.learning_style,
              success_90_days: profile.questionnaire?.success_90_days,
              creator_offer_type: profile.questionnaire?.creator_offer_type,
              creator_price_point: profile.questionnaire?.creator_price_point,
              creator_acquisition: profile.questionnaire?.creator_acquisition,
            }
          : {}),
      },
      inferred: {
        icpSummary: truncate(
          profile.inferred?.icpSummary,
          options.highFidelity ? 800 : 400,
        ),
        valueProposition: truncate(
          profile.inferred?.valueProposition,
          options.highFidelity ? 800 : 400,
        ),
        competitivePositioning: truncate(
          profile.inferred?.competitivePositioning,
          300,
        ),
        pricingStructure: profile.inferred?.pricingStructure ?? null,
        linkedinAnalysis: truncate(
          JSON.stringify(profile.inferred?.linkedinAnalysis ?? null),
          options.highFidelity ? 2000 : 1000,
        ),
        ragSignals: options.ultraLean
          ? null
          : profile.inferred?.ragSignals
            ? {
                aggregatedInsights: truncate(
                  profile.inferred.ragSignals.aggregatedInsights,
                  options.highFidelity ? 1500 : options.coaching ? 800 : 400,
                ),
                valuePropSignals: (
                  profile.inferred.ragSignals.valuePropSignals || []
                ).slice(
                  0,
                  options.highFidelity ? 15 : options.coaching ? 10 : 5,
                ),
                icpSignals: (
                  profile.inferred.ragSignals.icpSignals || []
                ).slice(
                  0,
                  options.highFidelity ? 15 : options.coaching ? 10 : 5,
                ),
                competitiveSignals: (
                  profile.inferred.ragSignals.competitiveSignals || []
                ).slice(
                  0,
                  options.highFidelity ? 15 : options.coaching ? 10 : 5,
                ),
                ...(options.coaching || options.highFidelity
                  ? {
                      documentSummaries: (
                        profile.inferred.ragSignals.documentSummaries || []
                      ).map((ds) => ({
                        fileName: ds.fileName,
                        summary: truncate(ds.summary, 200),
                        keySignals: ds.keySignals.slice(0, 3),
                        relevantTo: ds.relevantTo,
                      })),
                    }
                  : {}),
              }
            : null,
      },
    };

    // Include artifact summaries for richer AI coaching (always for coaching and highFidelity modes)
    if (
      (options.coaching || options.highFidelity || !options.ultraLean) &&
      profile.artifacts
    ) {
      const a = profile.artifacts;
      // Coaching mode gets fuller artifact content for deeper advice
      const artLen = options.coaching ? 800 : options.highFidelity ? 600 : 300;
      context.artifacts = {
        icpDocument: a.icpDocument?.content
          ? truncate(
              typeof a.icpDocument.content === "string"
                ? a.icpDocument.content
                : JSON.stringify(a.icpDocument.content),
              artLen,
            )
          : null,
        positioningStatement: a.positioningStatement?.content
          ? truncate(
              typeof a.positioningStatement.content === "string"
                ? a.positioningStatement.content
                : JSON.stringify(a.positioningStatement.content),
              artLen,
            )
          : null,
        valueProposition: a.valuePropositionCanvas?.content
          ? truncate(JSON.stringify(a.valuePropositionCanvas.content), artLen)
          : null,
        acquisitionPath: a.acquisitionPath
          ? `${a.acquisitionPath.primary} via ${(a.acquisitionPath.channels || []).join(", ")}`
          : null,
        discoveryPlaybook: a.discoveryPlaybook?.content
          ? truncate(JSON.stringify(a.discoveryPlaybook.content), artLen)
          : null,
      };
    }

    // Include assessment data for coaching (scores, gaps, quick wins)
    if ((options.coaching || options.highFidelity) && profile.assessment) {
      const a = profile.assessment;
      context.assessment = {
        overallReadiness: a.overallReadiness,
        scores: { ...a.scores } as Record<string, number>,
        ...(options.coaching
          ? {
              scoreReasoning: a.scoreReasoning,
              quickWins: a.quickWins?.map((w) => ({
                title: w.title,
                category: w.category,
                description: w.description,
                impact: w.impact,
              })),
              criticalGaps: a.criticalGaps?.map((g) => ({
                title: g.title,
                category: g.category,
                description: g.description,
                impact: g.impact,
              })),
              recommendedPath: a.recommendedPath,
              personalizedInsight: a.personalizedInsight,
            }
          : {}),
      };
    }

    // Include progress data for coaching (what they've completed)
    if ((options.coaching || options.highFidelity) && profile.progress) {
      const p = profile.progress;
      const totalLessons = Object.values(p.completedLessons || {}).reduce(
        (sum, lessons) => sum + (Array.isArray(lessons) ? lessons.length : 0),
        0,
      );
      context.progress = {
        completedCourses: p.completedCourses || [],
        totalLessonsCompleted: totalLessons,
        currentCourse: p.currentCourse ?? null,
        xpTotal: p.xpTotal || 0,
        currentStreak: p.currentStreak || 0,
      };
    }

    if (options.ultraLean) {
      const typedContext = context as Record<string, any>;
      Object.keys(typedContext).forEach((key) => {
        if (typedContext[key] === null) delete typedContext[key];
        if (
          typeof typedContext[key] === "object" &&
          typedContext[key] !== null
        ) {
          Object.keys(typedContext[key]).forEach((subKey) => {
            if (typedContext[key][subKey] === null)
              delete typedContext[key][subKey];
          });
        }
      });
    }

    return context;
  }
}

export const profileContextService = new ProfileContextService();
