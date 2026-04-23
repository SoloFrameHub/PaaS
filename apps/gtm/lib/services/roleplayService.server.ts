// Roleplay Service (Server-Side) for 12-Dimensional Strategic Audit
// Dimension 11: Production Parity & Dimension 12: Privacy

import { masterDataRepository } from "@/lib/repositories/masterDataRepositoryFactory";
import { profileService } from "./profileService";
import { logger } from "@/lib/logger";
import type {
  FounderCategory,
  Industry,
  ClientRole,
  DiscPattern,
  RoleplayContext,
} from "@/types/roleplay";

/**
 * Builds the complete context for a roleplay session (Server-side)
 */
export async function buildRoleplayContext(
  userId: string,
  industryId: string,
  roleId: string,
  locale?: "en" | "es",
  countryCode?: string,
): Promise<RoleplayContext> {
  try {
    const profile = await profileService.getProfile(userId);
    if (!profile) throw new Error("Profile not found");

    const founderCategoryId =
      profile.questionnaire?.founder_description || "reluctant_seller";

    const extractedDisc = roleId.split("_high_")[1]?.toUpperCase();
    const validDiscTypes = ["D", "I", "S", "C"] as const;
    const discType: "D" | "I" | "S" | "C" = validDiscTypes.includes(
      extractedDisc as any,
    )
      ? (extractedDisc as "D" | "I" | "S" | "C")
      : (profile.questionnaire?.disc_profile?.primary as
          | "D"
          | "I"
          | "S"
          | "C") || "S";

    const [initialFounder, industry, clientRole, discPattern] =
      await Promise.all([
        masterDataRepository.getFounderCategoryById(founderCategoryId),
        masterDataRepository.getIndustryById(industryId),
        masterDataRepository.getClientRoleById(roleId),
        masterDataRepository.getDiscPatternById(discType),
      ]);

    // Fallback if questionnaire founder_description doesn't match seed data
    const founder =
      !initialFounder && founderCategoryId !== "reluctant_seller"
        ? await masterDataRepository.getFounderCategoryById("reluctant_seller")
        : initialFounder;

    if (!founder || !industry || !clientRole || !discPattern) {
      logger.error("Missing roleplay dimensions", {
        founder: !!founder,
        industry: !!industry,
        clientRole: !!clientRole,
        discPattern: !!discPattern,
        founderCategoryId,
        industryId,
        roleId,
        discType,
      });
      throw new Error("Incomplete roleplay dimension data");
    }

    const difficulty = calculateDifficulty(founder, discType, clientRole);
    const scenario = generateScenario(industry, clientRole);

    // 7. Dimension 12 & 13: Safe Context Extraction (Token Optimized)
    const safeContext = profileService.getSafeContext(profile);
    const ragSignals = safeContext.inferred?.ragSignals || null;

    return {
      founder,
      industry,
      clientRole,
      discPattern,
      scenario,
      difficulty,
      ragSignals,
      locale: locale || "en",
      countryCode: countryCode || undefined,
    };
  } catch (error) {
    console.error("[buildRoleplayContext] failed:", error);
    throw error;
  }
}

/**
 * Saves a completed roleplay session to Postgres (when DATABASE_URL set) and updates profile stats.
 */
export async function saveRoleplaySession(
  userId: string,
  sessionData: {
    industryId: string;
    roleId: string;
    discType: string;
    transcript: { role: "user" | "assistant"; content: string }[];
    evaluation: {
      score: number;
      strengths: string[];
      improvements: string[];
      coachingMessage: string;
    };
  },
) {
  try {
    const { getDb, schema, hasDatabase } = await import("@/lib/db");
    if (hasDatabase()) {
      const db = getDb();
      if (db) {
        const id = `rp_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
        await db.insert(schema.roleplaySession).values({
          id,
          userId,
          industryId: sessionData.industryId,
          roleId: sessionData.roleId,
          discType: sessionData.discType,
          transcript: sessionData.transcript,
          evaluation: sessionData.evaluation,
        });
      }
    }

    const calculateNewAvg = (
      currentSessions: number,
      currentAvg: number,
      newScore: number,
    ) => {
      const totalScore = currentAvg * currentSessions + newScore;
      return Number((totalScore / (currentSessions + 1)).toFixed(1));
    };

    // Re-read profile just before writing to narrow the race window
    // (similar to badge service pattern — another session may have updated stats concurrently)
    const freshProfile = await profileService.getProfile(userId);
    if (!freshProfile) return;

    const stats = freshProfile.progress.roleplayStats || {
      totalSessions: 0,
      avgScore: 0,
      byDiscType: {},
    };

    const discKey = sessionData.discType;
    const discStats = stats.byDiscType[discKey] || { sessions: 0, avgScore: 0 };

    const updatedStats = {
      totalSessions: stats.totalSessions + 1,
      avgScore: calculateNewAvg(
        stats.totalSessions,
        stats.avgScore,
        sessionData.evaluation.score,
      ),
      byDiscType: {
        ...stats.byDiscType,
        [discKey]: {
          sessions: discStats.sessions + 1,
          avgScore: calculateNewAvg(
            discStats.sessions,
            discStats.avgScore,
            sessionData.evaluation.score,
          ),
        },
      },
    };

    await profileService.updateProfile(userId, {
      "progress.roleplayStats": updatedStats,
      "progress.lastActivityAt": new Date().toISOString(),
    });
  } catch (error) {
    console.error("[saveRoleplaySession] failed:", error);
    throw error;
  }
}

function calculateDifficulty(
  founder: FounderCategory,
  discType: "D" | "I" | "S" | "C",
  role: ClientRole,
): "beginner" | "intermediate" | "advanced" {
  if (founder.struggle_disc_types.includes(discType)) {
    return founder.default_difficulty === "beginner"
      ? "intermediate"
      : "advanced";
  }
  if (["vp", "c_suite"].includes(role.seniority_level)) {
    return founder.default_difficulty === "beginner"
      ? "intermediate"
      : "advanced";
  }
  return founder.default_difficulty;
}

function generateScenario(industry: Industry, role: ClientRole): string {
  const templates = industry.scenario_templates || [];
  if (templates.length === 0) {
    return `You're meeting with a ${role.display_name} at a ${industry.display_name} company. They're evaluating solutions for ${industry.pain_points?.[0]?.pain || "operational challenges"}.`;
  }
  const simpleTemplates = templates.filter(
    (t) => !t.complexity || t.complexity === "single_stakeholder",
  );
  const pool = simpleTemplates.length > 0 ? simpleTemplates : templates;
  const template = pool[Math.floor(Math.random() * pool.length)];
  const templateStr =
    typeof template === "string" ? template : template.template;
  return templateStr
    .replace(/\{\{role\}\}/g, role.display_name)
    .replace(
      /\{\{company_size\}\}/g,
      industry.typical_company_sizes?.[0] || "50-200",
    )
    .replace(
      /\{\{pain_point\}\}/g,
      industry.pain_points?.[0]?.pain || "efficiency challenges",
    )
    .replace(
      /\{\{trigger\}\}/g,
      industry.buying_triggers?.[0] || "a recent initiative",
    );
}
