import { profileRepository } from "@/lib/repositories/profileRepository";
import { FounderProfile } from "@/types/profile";
import { flattenObject } from "@/lib/utils/object";

export class ProfileCoreService {
  private readonly CURRENT_VERSION = 2;

  async getOrCreateProfile(
    userId: string,
    email: string,
  ): Promise<FounderProfile> {
    try {
      let profile = await profileRepository.getById(userId);

      if (!profile) {
        profile = this.createEmptyProfile(userId, email);
        await profileRepository.save(userId, profile);
      }

      return this.migrateProfile(profile);
    } catch (error) {
      console.error("[getOrCreateProfile] failed:", error);
      throw error;
    }
  }

  async getProfile(userId: string): Promise<FounderProfile | null> {
    try {
      const profile = await profileRepository.getById(userId);
      return profile ? this.migrateProfile(profile) : null;
    } catch (error) {
      console.error("[getProfile] failed:", error);
      throw error;
    }
  }

  async updateProfile(
    userId: string,
    updates: Record<string, any>,
  ): Promise<void> {
    try {
      // Flatten nested objects to ensure partial updates work correctly in Firestore
      // (e.g. { inferred: { ragSignals: ... } } becomes { 'inferred.ragSignals': ... })
      const flattenedUpdates = flattenObject(updates);

      await profileRepository.update(userId, {
        ...flattenedUpdates,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[updateProfile] failed:", error);
      throw error;
    }
  }

  migrateProfile(profile: FounderProfile): FounderProfile {
    if ((profile.profileVersion ?? 0) >= this.CURRENT_VERSION) return profile;

    // Migration logic
    const migrated: FounderProfile = {
      ...profile,
      profileVersion: this.CURRENT_VERSION,
      updatedAt: new Date().toISOString(),
    };

    // Add missing fields for older versions
    if (!migrated.progress) {
      migrated.progress = {
        completedCourses: [],
        completedLessons: {},
        currentCourse: null,
        xpTotal: 0,
        badges: [],
        currentStreak: 0,
        longestStreak: 0,
        streakUpdatedAt: migrated.updatedAt,
        lastActivityAt: migrated.updatedAt,
      };
    }

    return migrated;
  }

  async updateProgress(
    userId: string,
    update: {
      completedCourse?: number;
      completedLesson?: { courseId: string; lessonId: string };
      currentCourse?: number;
      xpEarned?: number;
      badge?: string;
    },
  ): Promise<void> {
    try {
      const profile = await this.getProfile(userId);
      if (!profile) return;

      const updates: Record<string, any> = {
        "progress.lastActivityAt": new Date().toISOString(),
      };

      if (
        update.completedCourse !== undefined &&
        !profile.progress.completedCourses.includes(update.completedCourse)
      ) {
        updates["progress.completedCourses"] = [
          ...(profile.progress.completedCourses || []),
          update.completedCourse,
        ];
      }

      let lessonIsNew = false;
      if (update.completedLesson) {
        const { courseId, lessonId } = update.completedLesson;
        const currentLessons =
          (profile.progress.completedLessons ?? {})[courseId] || [];
        if (!currentLessons.includes(lessonId)) {
          updates[`progress.completedLessons.${courseId}`] = [
            ...currentLessons,
            lessonId,
          ];
          lessonIsNew = true;
        }
      }

      if (update.currentCourse !== undefined)
        updates["progress.currentCourse"] = update.currentCourse;
      // Track last visited lesson for coaching context
      if (update.completedLesson) {
        updates["progress.lastVisitedLesson"] = {
          courseId: update.completedLesson.courseId,
          lessonId: update.completedLesson.lessonId,
          at: new Date().toISOString(),
        };
      }
      // Only award XP for new completions to prevent double-counting on retry
      if (update.xpEarned && (lessonIsNew || !update.completedLesson)) {
        updates["progress.xpTotal"] =
          (profile.progress.xpTotal || 0) + update.xpEarned;
      }
      if (
        update.badge &&
        !(profile.progress.badges || []).some(
          (b) => (typeof b === "string" ? b : b.id) === update.badge,
        )
      ) {
        updates["progress.badges"] = [
          ...(profile.progress.badges || []),
          { id: update.badge, earnedAt: new Date().toISOString() },
        ];
      }

      await profileRepository.update(userId, updates);
    } catch (error) {
      console.error("[updateProgress] failed:", error);
      throw error;
    }
  }

  async saveArtifact(
    userId: string,
    artifactType: string,
    data: Record<string, any>,
    courseNumber: number,
  ): Promise<void> {
    try {
      const now = new Date().toISOString();
      const profile = await this.getProfile(userId);
      const existing = profile?.artifacts?.[
        artifactType as keyof typeof profile.artifacts
      ] as any;

      if (existing && existing.version !== undefined) {
        // Update existing versioned artifact — push current to history, increment version
        const history = [
          ...(existing.history || []),
          {
            version: existing.version,
            content: existing.content,
            courseId: existing.createdInCourse,
            timestamp: existing.createdAt || now,
          },
        ];

        await profileRepository.update(userId, {
          [`artifacts.${artifactType}`]: {
            version: existing.version + 1,
            content: data,
            createdInCourse: courseNumber,
            createdAt: now,
            history: history.slice(-5), // Keep last 5 versions
          },
          updatedAt: now,
        });
      } else {
        // Create new versioned artifact
        await profileRepository.update(userId, {
          [`artifacts.${artifactType}`]: {
            version: 1,
            content: data,
            createdInCourse: courseNumber,
            createdAt: now,
            history: [],
          },
          updatedAt: now,
        });
      }
    } catch (error) {
      console.error("[saveArtifact] failed:", error);
      throw error;
    }
  }

  private createEmptyProfile(userId: string, email: string): FounderProfile {
    const now = new Date().toISOString();
    return {
      id: userId,
      userId,
      name: "",
      email,
      businessName: "",
      websiteUrl: null,
      stage: null,
      businessModel: null,
      primaryGoal: null,
      biggestChallenge: null,
      elevatorPitch: null,
      targetAudience: null,
      linkedinUrl: null,
      linkedinAbout: null,
      onboardingCompleted: false,
      onboardingCompletedAt: null,
      profileVersion: this.CURRENT_VERSION,
      inferred: {
        icpSummary: null,
        valueProposition: null,
        competitivePositioning: null,
        pricingStructure: null,
        industryVertical: null,
        commonObjections: [],
        typicalUseCases: [],
        voiceSample: null,
        competitorMentions: [],
        confidence: {
          icpClarity: 0,
          positioningStrength: 0,
          messagingConsistency: 0,
          valueArticulation: 0,
        },
        extractedFrom: {
          websiteAnalyzedAt: null,
          linkedinAnalyzedAt: null,
          documentsAnalyzed: [],
          lastUpdated: now,
        },
      },
      documents: [],
      artifacts: {
        icpDocument: null,
        positioningStatement: null,
        valuePropositionCanvas: null,
        acquisitionPath: null,
        listBuildingCriteria: null,
        discProfile: null,
        discoveryPlaybook: null,
        objectionLibrary: null,
        emailSequences: null,
        personalPlaybook: null,
      },
      assessment: null,
      progress: {
        completedCourses: [],
        completedLessons: {},
        currentCourse: null,
        xpTotal: 0,
        badges: [],
        currentStreak: 0,
        longestStreak: 0,
        streakUpdatedAt: now,
        lastActivityAt: now,
      },
      questionnaire: {
        target_roles: [],
        industry: "",
        deal_size: "",
        sales_journey: "",
        revenue_range: "",
        customer_count: "",
        founder_description: "",
        barriers: [],
        disc_answers: {},
        urgency: "",
        channels: [],
        time_commitment: "",
        learning_style: "",
        success_90_days: "",
        has_icp_docs: "",
        creator_offer_type: "",
        creator_price_point: "",
        creator_acquisition: [],
        creator_platforms: [],
        creator_email_list_size: "",
        creator_sales_call_status: "",
        creator_has_value_ladder: "",
        creator_launch_model: "",
      },
      createdAt: now,
      updatedAt: now,
    };
  }
}

export const profileCoreService = new ProfileCoreService();
