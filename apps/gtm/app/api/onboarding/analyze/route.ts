import { NextRequest } from "next/server";
import { profileService } from "@/lib/services/profileService";
import {
  openaiWebsiteAnalysis,
  openaiLinkedinAnalysis,
  openaiRagIndexer,
  openaiAssessment,
} from "@/lib/ai/openai-flows";
import { fetchWebsiteText, fetchLinkedinSnippet } from "@/lib/ai/fetch-helpers";
import { withAuth } from "@/lib/api/with-auth";
import { successResponse, validateBody } from "@/lib/api/response-utils";
import { analysisSchema } from "@/lib/validations/onboarding";
import { Stage, Impact, Assessment, AcquisitionPath } from "@/types/profile";
import { logger } from "@/lib/logger";
import { profileRepository } from "@/lib/repositories/profileRepository";
import { isRateLimited, EXPENSIVE_RATE_LIMIT } from "@/lib/security";

// Fallback assessment for mock mode or when AI is unavailable
function createMockAssessment(profile: any) {
  const hasDocuments = profile.documents && profile.documents.length > 0;
  const hasWebsite = !!profile.websiteUrl;
  const hasLinkedin = !!profile.linkedinUrl;
  const businessName = profile.businessName || "your business";
  const businessModel = profile.businessModel || "B2B";

  let baseScore = 45;
  if (hasDocuments) baseScore += 10;
  if (hasWebsite) baseScore += 5;
  if (hasLinkedin) baseScore += 5;

  const quickWins = [
    {
      category: "ICP",
      title: "Define your ideal customer profile",
      description: "Clearly identify who you serve best",
      impact: "high" as Impact,
      addressedInCourse: 1,
      actionableStep: "Complete Course 1 exercises",
    },
    {
      category: "Positioning",
      title: "Craft your value proposition",
      description: "Articulate why customers choose you",
      impact: "high" as Impact,
      addressedInCourse: 2,
      actionableStep: "Use the Value Prop Canvas",
    },
  ];

  if (hasDocuments) {
    quickWins.unshift({
      category: "Context",
      title: "Leverage existing assets",
      description: `Utilize insights from your ${profile.documents.length} uploaded document(s)`,
      impact: "high" as Impact,
      addressedInCourse: 3,
      actionableStep: "Audit your content library",
    });
  }

  if (hasWebsite) {
    quickWins.push({
      category: "Digital Presence",
      title: "Optimize your website message",
      description: `Align ${profile.websiteUrl} with your new value prop`,
      impact: "medium" as Impact,
      addressedInCourse: 6,
      actionableStep: "Update landing page header",
    });
  }

  if (hasLinkedin) {
    quickWins.push({
      category: "Authority",
      title: "Optimize LinkedIn for conversion",
      description: "Turn your profile into a landing page for prospects",
      impact: "high" as Impact,
      addressedInCourse: 5,
      actionableStep: "Update your LinkedIn headline",
    });
  }

  const finalQuickWins = quickWins.slice(0, 3);

  return {
    overallReadiness: 50,
    scores: {
      icpClarity: 50,
      positioningStrength: 50,
      messagingConsistency: 50,
      channelReadiness: 50,
      salesProcessMaturity: 50,
    },
    scoreReasoning: {
      icpClarity: "Fallback score due to analysis failure.",
      positioningStrength: "Fallback score due to analysis failure.",
      messagingConsistency: "Fallback score due to analysis failure.",
      channelReadiness: "Fallback score due to analysis failure.",
      salesProcessMaturity: "Fallback score due to analysis failure.",
    },
    quickWins: finalQuickWins,
    criticalGaps: [
      {
        category: "Sales Process",
        title: "No defined sales process",
        description: "Create a repeatable sales workflow",
        impact: "high" as Impact,
        addressedInCourse: 12,
        actionableStep: "Map your sales stages",
      },
      {
        category: "Discovery",
        title: "Weak discovery framework",
        description: "Improve qualification conversations",
        impact: "high" as Impact,
        addressedInCourse: 14,
        actionableStep: "Practice BANT/MEDDIC",
      },
    ],
    recommendedPath: "hybrid" as AcquisitionPath,
    recommendedStartCourse: 1,
    journeyMap: [
      { phase: "Foundation", courses: [1, 2, 3, 4], estimatedWeeks: 4 },
      {
        phase: "Marketing Engine",
        courses: [5, 6, 7, 8, 9, 10, 11],
        estimatedWeeks: 6,
      },
      {
        phase: "Sales Methodology",
        courses: [12, 13, 14, 15, 16, 17, 18, 19],
        estimatedWeeks: 8,
      },
    ],
    personalizedInsight: hasLinkedin
      ? `We've noted your LinkedIn profile and ${hasWebsite ? "website" : "business details"}. ${businessName} has a strong starting point for personal branding. We'll help you leverage your existing network to scale ${businessModel} sales.`
      : hasDocuments
        ? `We analyzed your uploaded documents and website. ${businessName} shows promise, particularly in its initial product definition. However, to scale ${businessModel} sales effectively, you need to sharpen your dismissal of non-ideal prospects.`
        : `Based on your ${businessModel} model, ${businessName} has a solid foundation. Focus on defining your ICP first, then move to crafting compelling messaging. The academy will guide you through each step.`,
    sourceAudits: [
      ...(hasWebsite
        ? [
            {
              source: "website" as const,
              title: "Conversion Optimization Audit",
              critique: `Your website at ${profile.websiteUrl} has a solid technical foundation, but the value proposition is buried below the fold. Visitors may struggle to understand exactly who the product is for within the first 5 seconds.`,
              recommendations: [
                "Clarify hero headline",
                "Add social proof above fold",
                "Simplify primary CTA",
              ],
            },
          ]
        : []),
      ...(hasLinkedin
        ? [
            {
              source: "linkedin" as const,
              title: "Professional Authority Audit",
              critique:
                "Your LinkedIn profile is structured more like a resume than a sales landing page. To attract high-level clients, you need to shift the focus from 'what you've done' to 'what you can do for them'.",
              recommendations: [
                "Update headline for ICP",
                'Optimize "Featured" section',
                "Refine about section for growth",
              ],
            },
          ]
        : []),
      ...(hasDocuments
        ? [
            {
              source: "documents" as const,
              title: "Strategic Asset Audit",
              critique: `Analysis of your ${profile.documents.length} uploaded documents reveals a slight misalignment between your 90-day goals and your current resource allocation. The vision is clear, but the execution path needs more detail.`,
              recommendations: [
                "Codify sales process",
                "Refine pricing strategy",
                "Map customer journey",
              ],
            },
          ]
        : []),
    ],
  };
}

async function runWithFallback<T>(
  flowName: string,
  requestId: string,
  fn: () => Promise<T>,
  fallback: T | null = null,
  timeoutMs: number = 45000,
): Promise<T | null> {
  logger.info("Orchestrating Flow", { flowName, requestId });
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () =>
          reject(new Error(`Flow ${flowName} timed out after ${timeoutMs}ms`)),
        timeoutMs,
      );
    });
    const result = await Promise.race([fn(), timeoutPromise]);
    return result ?? fallback;
  } catch (err) {
    logger.error("Flow failed", { flowName, requestId, error: err, timeoutMs });
    return fallback;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export const POST = withAuth(
  async (request: NextRequest, { userId, email }) => {
    const { limited } = await isRateLimited(
      userId,
      EXPENSIVE_RATE_LIMIT,
      "analyze",
    );
    if (limited) {
      return successResponse(
        { error: "Rate limit exceeded. Please try again later." },
        429,
      );
    }

    const requestId = Math.random().toString(36).substring(7);
    logger.info("Analyze request received", { requestId, userId });

    const { onboardingData } = await validateBody(request, analysisSchema);
    const isMockMode = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";

    // Fetch and migrate profile
    let initialProfile = await profileService.getOrCreateProfile(userId, email);

    // Sync profile state safely - Only update fields that are provided and valid
    if (onboardingData) {
      const updates: Record<string, any> = {};
      if (onboardingData.userName) updates.name = onboardingData.userName;
      if (onboardingData.companyName)
        updates.businessName = onboardingData.companyName;
      if (onboardingData.businessModel)
        updates.businessModel = onboardingData.businessModel;
      if (onboardingData.website) updates.websiteUrl = onboardingData.website;
      if (onboardingData.pitch) updates.elevatorPitch = onboardingData.pitch;
      if (onboardingData.targetAudience)
        updates.targetAudience = onboardingData.targetAudience;
      if (onboardingData.revenueGoal)
        updates.primaryGoal = onboardingData.revenueGoal;
      if (onboardingData.stage) updates.stage = onboardingData.stage;
      if (onboardingData.linkedinUrl)
        updates.linkedinUrl = onboardingData.linkedinUrl;
      if (onboardingData.linkedinAbout)
        updates.linkedinAbout = onboardingData.linkedinAbout;
      if (onboardingData.questionnaire) {
        updates.questionnaire = onboardingData.questionnaire;
        // Calculate disc_profile from disc_answers so backend consumers have the right field
        const discAnswers = onboardingData.questionnaire.disc_answers as
          | Record<string, string>
          | undefined;
        if (
          discAnswers &&
          typeof discAnswers === "object" &&
          Object.keys(discAnswers).length > 0
        ) {
          const { onboardingService: onbSvc } =
            await import("@/lib/services/onboardingService");
          const disc = onbSvc.calculateDiscProfile(discAnswers);
          updates.questionnaire = {
            ...updates.questionnaire,
            disc_profile: { primary: disc.primary, secondary: disc.secondary },
          };
        }
      }

      if (Object.keys(updates).length > 0) {
        await profileService.updateProfile(userId, updates);
        initialProfile =
          (await profileService.getProfile(userId)) || initialProfile;
      }
    }

    // Allow re-analysis: only return cache if the user hasn't provided new data
    // (i.e., this is a navigation-back, not a fresh onboarding submission)
    const hasNewData = !!(
      onboardingData?.website ||
      onboardingData?.linkedinUrl ||
      onboardingData?.linkedinAbout ||
      (onboardingData?.uploadedDocuments &&
        onboardingData.uploadedDocuments.length > 0) ||
      onboardingData?.questionnaire
    );
    if (
      initialProfile.assessment &&
      initialProfile.onboardingCompleted &&
      !hasNewData
    ) {
      return successResponse({
        assessment: initialProfile.assessment,
        fromCache: true,
      });
    }

    // Atomic lock: prevents concurrent analysis via SQL WHERE condition
    const lockAcquired = await profileRepository.acquireAnalysisLock(userId, 5);
    if (!lockAcquired) {
      logger.warn("Blocked concurrent analysis request (atomic lock)", {
        userId,
        requestId,
      });
      return successResponse({
        status: "analyzing",
        message: "Analysis already in progress",
      });
    }

    try {
      // Execute analyzers sequentially to prevent race conditions in profile updates
      // 1. Website Analysis (fetch + OpenAI)
      if (initialProfile.websiteUrl) {
        try {
          const websiteText = await fetchWebsiteText(initialProfile.websiteUrl);
          logger.info("Website fetch result", {
            requestId,
            url: initialProfile.websiteUrl,
            textLength: websiteText.length,
            hasContent: websiteText.length >= 100,
          });
          const analysis = await runWithFallback(
            `WebsiteAnalyzer`,
            requestId,
            () =>
              openaiWebsiteAnalysis({
                url: initialProfile.websiteUrl!,
                businessModel: initialProfile.businessModel || "other",
                stage: (initialProfile.stage || "idea") as string,
                websiteText,
              }),
          );
          if (analysis) {
            logger.info("Website analysis completed", {
              requestId,
              hasIcp: !!analysis.icpSummary,
              hasValueProp: !!analysis.valueProposition,
              confidence: analysis.confidence,
            });
            await profileService.saveInferredContext(userId, analysis);
          }
        } catch (e) {
          logger.error("Website Analysis Failed", { error: e });
        }
      } else {
        logger.info("No website URL provided, skipping website analysis", {
          requestId,
        });
      }

      // 2. LinkedIn Analysis (fetch + pasted text + OpenAI)
      const linkedinAbout =
        (initialProfile as any).linkedinAbout ||
        onboardingData?.linkedinAbout ||
        "";
      const hasLinkedinInput = initialProfile.linkedinUrl || linkedinAbout;
      if (hasLinkedinInput && onboardingData?.linkedinPermission) {
        try {
          // Try scraping if URL provided, but don't depend on it
          let snippet = { title: "", description: "", rawSnippet: "" };
          if (initialProfile.linkedinUrl) {
            snippet = await fetchLinkedinSnippet(initialProfile.linkedinUrl);
            const scrapedUsable = !!(snippet.title || snippet.description);
            logger.info("LinkedIn scrape result", {
              requestId,
              url: initialProfile.linkedinUrl,
              scrapedUsable,
              hasPastedText: !!linkedinAbout,
            });
          }

          const analysis = await runWithFallback(
            `LinkedinAnalyzer`,
            requestId,
            () =>
              openaiLinkedinAnalysis({
                url: initialProfile.linkedinUrl || "",
                businessModel: initialProfile.businessModel || "other",
                ...snippet,
                pastedText: linkedinAbout,
              }),
          );
          if (analysis && analysis.confidence > 0) {
            await profileService.saveLinkedinAnalysis(userId, analysis);
          } else {
            logger.warn("LinkedIn analysis returned zero confidence", {
              requestId,
            });
          }
        } catch (e) {
          logger.error("LinkedIn Analysis Failed", { error: e });
        }
      }

      // 3. Document Analysis (RAG) – OpenAI
      if (
        onboardingData?.uploadedDocuments &&
        onboardingData.uploadedDocuments.length > 0
      ) {
        const validDocs = onboardingData.uploadedDocuments.filter(
          (d: { content?: string }) => d.content,
        );
        if (validDocs.length > 0) {
          try {
            const ragSignals = await runWithFallback(
              `RagIndexer`,
              requestId,
              () =>
                openaiRagIndexer({
                  documents: validDocs.map(
                    (d: { id: string; name: string; content?: string }) => ({
                      id: d.id,
                      name: d.name,
                      content: d.content ?? "",
                    }),
                  ),
                  businessModel: initialProfile.businessModel || "other",
                }),
            );
            if (ragSignals) {
              await profileService.updateProfile(userId, {
                "inferred.ragSignals": ragSignals,
                rag_metadata: {
                  total_chunks: validDocs.length,
                  index_name: "onboarding-rag",
                  last_indexed_at: new Date().toISOString(),
                },
              });
            }
          } catch (e) {
            logger.error("RAG Indexing Failed", { error: e });
          }
        }
      }

      const updatedProfile =
        (await profileService.getProfile(userId)) || initialProfile;

      logger.info("DEBUG: Profile State Before Assessment", {
        hasQuestionnaire: !!updatedProfile.questionnaire,
        hasInferred: !!updatedProfile.inferred,
        ragSignals: !!updatedProfile.inferred?.ragSignals,
        icpSummary: !!updatedProfile.inferred?.icpSummary,
        docCount: updatedProfile.documents?.length,
      });

      const assessment = await runWithFallback<Omit<Assessment, "generatedAt">>(
        `AssessmentGenerator`,
        requestId,
        () =>
          openaiAssessment(
            profileService.getSafeContext(updatedProfile, {
              highFidelity: true,
            }) as unknown as Partial<typeof updatedProfile>,
          ),
        isMockMode ? createMockAssessment(updatedProfile) : null,
        60000, // Assessment needs longer timeout (complex JSON output)
      );

      if (assessment) {
        await profileService.saveAssessment(userId, assessment);
        await profileService.updateProfile(userId, {
          analysisStatus: "completed",
        });
        return successResponse({ assessment });
      } else {
        // Explicit failure if AI fails and no mock fallback
        await profileService.updateProfile(userId, {
          analysisStatus: "failed",
        });
        throw new Error("Assessment generation failed to return a result");
      }
    } catch (error) {
      logger.error("API System Error (analyze)", { requestId, error, userId });
      try {
        await profileService.updateProfile(userId, {
          analysisStatus: "failed",
        });
      } catch (lockErr) {
        logger.error("Failed to release analysis lock after error", {
          lockErr,
          userId,
        });
      }
      throw error;
    }
  },
);
