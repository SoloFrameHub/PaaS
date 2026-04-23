/**
 * Pod Matching Service
 * Generates matching profiles from entrance survey data and assigns users to optimal pods.
 * Matching algorithm uses hard constraints (curriculum stage, time commitment) and
 * soft scoring (DISC diversity, deal-size clustering, industry diversity, pod health).
 */

import { getDb, hasDatabase, schema } from "@/lib/db";
import { eq, and, ne, sql, inArray } from "drizzle-orm";
import { podService } from "./podService";
import { logger } from "@/lib/logger";
import { getPersonaBots } from "@/lib/data/forum-bots";
import type { EntranceSurveyData } from "@/lib/validations/community";

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Curriculum stages in order (for ±1 matching)
const STAGE_ORDER = ["foundation", "lead_gen", "sales_conv"] as const;

// Compatible time commitments
const TIME_COMPAT: Record<string, string[]> = {
  "5-10h": ["5-10h", "10-15h"],
  "10-15h": ["5-10h", "10-15h", "15-20h"],
  "15-20h": ["10-15h", "15-20h", "20h+"],
  "20h+": ["15-20h", "20h+"],
};

// Pod name adjectives and nouns for auto-generation
const ADJECTIVES = [
  "Relentless",
  "Strategic",
  "Bold",
  "Agile",
  "Fearless",
  "Tenacious",
  "Focused",
  "Driven",
  "Sharp",
  "Steady",
  "Resilient",
  "Dynamic",
  "Adaptive",
  "Precise",
  "Ambitious",
];
const NOUNS = [
  "Closers",
  "Prospectors",
  "Builders",
  "Pioneers",
  "Catalysts",
  "Architects",
  "Navigators",
  "Trailblazers",
  "Strategists",
  "Achievers",
];

function randomPodName(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj} ${noun}`;
}

export class PodMatchingService {
  private getDb() {
    if (!hasDatabase()) throw new Error("Database not available");
    const db = getDb();
    if (!db) throw new Error("Database connection failed");
    return db;
  }

  /**
   * Creates a matching profile from entrance survey data.
   */
  async generateMatchingProfile(
    userId: string,
    surveyData: EntranceSurveyData,
  ): Promise<typeof schema.memberMatchingProfile.$inferSelect> {
    try {
      const db = this.getDb();
      const id = generateId("mmp");

      const [profile] = await db
        .insert(schema.memberMatchingProfile)
        .values({
          id,
          userId,
          curriculumStage: surveyData.learningGoals.curriculumStage,
          businessContext: surveyData.businessContext,
          discProfile: surveyData.discProfile,
          timeCommitment: surveyData.timeCommitment,
          learningGoals: [surveyData.learningGoals.curriculumStage],
          painPoints: surveyData.learningGoals.painPoints,
        })
        .onConflictDoUpdate({
          target: schema.memberMatchingProfile.userId,
          set: {
            curriculumStage: surveyData.learningGoals.curriculumStage,
            businessContext: surveyData.businessContext,
            discProfile: surveyData.discProfile,
            timeCommitment: surveyData.timeCommitment,
            learningGoals: [surveyData.learningGoals.curriculumStage],
            painPoints: surveyData.learningGoals.painPoints,
            surveyCompletedAt: new Date(),
          },
        })
        .returning();

      logger.info("Matching profile generated", {
        userId,
        stage: surveyData.learningGoals.curriculumStage,
      });
      return profile;
    } catch (error) {
      console.error("[generateMatchingProfile] failed:", error);
      throw error;
    }
  }

  /**
   * Main matching algorithm. Finds the optimal pod for a user.
   * Returns null if no suitable pod exists (threshold < 0.4).
   */
  async findOptimalPod(userId: string): Promise<{
    podId: string;
    matchScore: number;
    reason: string;
  } | null> {
    try {
      const db = this.getDb();

      // Get user's matching profile
      const [userProfile] = await db
        .select()
        .from(schema.memberMatchingProfile)
        .where(eq(schema.memberMatchingProfile.userId, userId));

      if (!userProfile) {
        logger.warn("No matching profile found for user", { userId });
        return null;
      }

      // Find active pods with open slots
      const candidatePods = await db
        .select()
        .from(schema.pod)
        .where(
          and(
            eq(schema.pod.status, "active"),
            sql`${schema.pod.currentMemberCount} < ${schema.pod.maxMembers}`,
          ),
        );

      if (candidatePods.length === 0) return null;

      // Score each candidate pod
      const scored: { podId: string; score: number; reason: string }[] = [];

      for (const pod of candidatePods) {
        // ── Hard constraints ──
        // Curriculum stage must be within ±1
        const userStageIdx = STAGE_ORDER.indexOf(
          userProfile.curriculumStage as (typeof STAGE_ORDER)[number],
        );
        const podStageIdx = STAGE_ORDER.indexOf(
          pod.curriculumStage as (typeof STAGE_ORDER)[number],
        );
        if (
          userStageIdx === -1 ||
          podStageIdx === -1 ||
          Math.abs(userStageIdx - podStageIdx) > 1
        ) {
          continue; // Skip: stage mismatch
        }

        // Time commitment must be compatible
        const compatTimes = TIME_COMPAT[userProfile.timeCommitment] ?? [];
        // We can't check pod members' time commitments without querying all their profiles,
        // so we skip this hard constraint for pods (it's enforced at matching profile level)

        // ── Soft scoring ──
        let score = 0;
        const reasons: string[] = [];

        // 1. DISC diversity (30%) - prefer pods where user's DISC type is underrepresented
        const podMembers = await db
          .select()
          .from(schema.podMember)
          .innerJoin(
            schema.memberMatchingProfile,
            eq(schema.memberMatchingProfile.userId, schema.podMember.userId),
          )
          .where(
            and(
              eq(schema.podMember.podId, pod.id),
              eq(schema.podMember.status, "active"),
            ),
          );

        const existingDiscTypes = podMembers
          .map(
            (m) =>
              (m.member_matching_profile.discProfile as { primary: string })
                ?.primary,
          )
          .filter(Boolean);

        const userDiscType = (userProfile.discProfile as { primary: string })
          ?.primary;
        const discTypeCount = existingDiscTypes.filter(
          (d) => d === userDiscType,
        ).length;
        const discDiversityScore =
          discTypeCount === 0 ? 1.0 : discTypeCount === 1 ? 0.5 : 0.2;
        score += discDiversityScore * 0.3;
        if (discDiversityScore > 0.5) reasons.push("good DISC diversity");

        // 2. Deal-size clustering (25%) - prefer same tier
        const userDealSize = (
          userProfile.businessContext as { dealSize: string }
        )?.dealSize;
        const dealSizeMatch = pod.dealSizeTier === userDealSize ? 1.0 : 0.3;
        score += dealSizeMatch * 0.25;
        if (dealSizeMatch > 0.5) reasons.push("matching deal size");

        // 3. Industry diversity (20%) - prefer different industries
        const userIndustry = (
          userProfile.businessContext as { industry: string }
        )?.industry;
        const existingIndustries = podMembers
          .map(
            (m) =>
              (
                m.member_matching_profile.businessContext as {
                  industry: string;
                }
              )?.industry,
          )
          .filter(Boolean);
        const industryIsNew = !existingIndustries.includes(userIndustry);
        score += (industryIsNew ? 1.0 : 0.4) * 0.2;
        if (industryIsNew) reasons.push("industry diversity");

        // 4. Pod fill ratio (15%) - prefer pods with 2-4 members (sweet spot)
        const memberCount = pod.currentMemberCount;
        const fillScore =
          memberCount >= 2 && memberCount <= 4
            ? 1.0
            : memberCount === 1
              ? 0.7
              : memberCount === 5
                ? 0.5
                : 0.3;
        score += fillScore * 0.15;

        // 5. Stage proximity (10%) - prefer exact match over ±1
        const stageScore = userStageIdx === podStageIdx ? 1.0 : 0.5;
        score += stageScore * 0.1;
        if (stageScore === 1.0) reasons.push("exact stage match");

        scored.push({
          podId: pod.id,
          score,
          reason: reasons.length > 0 ? reasons.join(", ") : "acceptable match",
        });
      }

      if (scored.length === 0) return null;

      // Sort by score descending
      scored.sort((a, b) => b.score - a.score);
      const best = scored[0];

      // Threshold: only match if score >= 0.4
      if (best.score < 0.4) return null;

      return { podId: best.podId, matchScore: best.score, reason: best.reason };
    } catch (error) {
      console.error("[findOptimalPod] failed:", error);
      throw error;
    }
  }

  /**
   * Creates a new pod when no suitable match exists.
   * Determines AI persona count based on initial human count (1).
   */
  async formNewPod(userId: string): Promise<string> {
    try {
      const db = this.getDb();

      // Get user's matching profile
      const [userProfile] = await db
        .select()
        .from(schema.memberMatchingProfile)
        .where(eq(schema.memberMatchingProfile.userId, userId));

      if (!userProfile) throw new Error("No matching profile found");

      const name = randomPodName();
      const pod = await podService.createPod({
        name,
        curriculumStage: userProfile.curriculumStage,
        dealSizeTier: (userProfile.businessContext as { dealSize: string })
          ?.dealSize,
      });

      // Add user as first member
      await podService.addMemberToPod(pod.id, userId);

      // Determine AI persona count: 1 human = 3 personas
      const personaCount = this.determineAIPersonaCount(1);
      const userDiscType = (userProfile.discProfile as { primary: string })
        ?.primary;
      const selectedPersonas = this.selectPersonas(personaCount, [
        userDiscType,
      ]);

      // Initialize persona_activity records
      for (const personaId of selectedPersonas) {
        await db
          .insert(schema.personaActivity)
          .values({
            id: generateId("pact"),
            podId: pod.id,
            personaId,
            postCount: 0,
            fadeOutStatus: "active",
          })
          .onConflictDoUpdate({
            target: [
              schema.personaActivity.podId,
              schema.personaActivity.personaId,
            ],
            set: { fadeOutStatus: "active", updatedAt: new Date() },
          });
      }

      logger.info("New pod formed", {
        podId: pod.id,
        name,
        personaCount,
        personas: selectedPersonas,
      });
      return pod.id;
    } catch (error) {
      console.error("[formNewPod] failed:", error);
      throw error;
    }
  }

  /**
   * Determine how many AI personas to include based on human count.
   */
  private determineAIPersonaCount(humanCount: number): number {
    if (humanCount <= 1) return 3;
    if (humanCount <= 2) return 2;
    if (humanCount <= 3) return 1;
    return 0; // 4+ humans, facilitator only
  }

  /**
   * Select persona IDs that maximize DISC diversity.
   * Avoids personas whose DISC type overlaps with existing members.
   */
  private selectPersonas(count: number, existingDiscTypes: string[]): string[] {
    const personaBots = getPersonaBots();
    // Map: persona id -> DISC type
    const personaDisc: Record<string, string> = {
      "alex-skeptic": "D",
      "jordan-builder": "I",
      "morgan-perfectionist": "C",
      "sam-mentor": "S",
    };

    // Sort personas: those filling DISC gaps first
    const sorted = personaBots
      .map((b) => ({
        id: b.id,
        disc: personaDisc[b.id] || "",
        isGapFill: !existingDiscTypes.includes(personaDisc[b.id] || ""),
      }))
      .sort((a, b) => (b.isGapFill ? 1 : 0) - (a.isGapFill ? 1 : 0));

    return sorted.slice(0, count).map((p) => p.id);
  }
}

export const podMatchingService = new PodMatchingService();
