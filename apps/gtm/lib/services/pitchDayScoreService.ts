/**
 * Pitch Day Readiness Score Service
 *
 * Per research (D3): Composite formula for Demo Day readiness:
 * - Readiness Score (30%): from assessment overallReadiness (0-100)
 * - Artifact Completion (25%): completed / 8 total artifacts
 * - Pipeline Value (20%): total active deal value, normalized ($10K+ = 100)
 * - Roleplay Average (25%): from roleplaySession scores (1-10 → 0-100)
 *
 * Graduation thresholds per D3:
 * - 4-week cohort: roleplay ≥ 55
 * - 6-week cohort: roleplay ≥ 65
 * - Certification: roleplay ≥ 75
 *
 * "Listo para el Demo Day" at composite ≥ 75.
 */

import { getDb, schema } from "@/lib/db";
import { eq, and, notInArray, desc } from "drizzle-orm";
import { profileService } from "./profileService";

/** The 8 artifacts per D3 cohort blueprint */
const ARTIFACT_KEYS = [
  "icp",
  "positioning",
  "valueProposition",
  "acquisitionPath",
  "discoveryPlaybook",
  "emailSequences",
  "objectionLibrary",
  "personalPlaybook",
] as const;

export interface PitchDayBreakdown {
  readiness: number; // 0-100
  artifacts: number; // 0-100
  pipeline: number; // 0-100
  roleplay: number; // 0-100
}

export interface PitchDayScore {
  composite: number; // 0-100
  breakdown: PitchDayBreakdown;
  artifactDetails: { key: string; completed: boolean }[];
  eligible: boolean; // true if in final cohort weeks or solo learner
  label: string; // "Listo para el Demo Day" or "Preparándote..."
  topDeals: { name: string; company: string | null; value: number | null }[];
  roleplaySessions: number;
}

export async function computePitchDayScore(
  userId: string,
  locale: string = "en",
): Promise<PitchDayScore> {
  const [profile, roleplayScores, dealStats, podInfo] = await Promise.all([
    profileService.getProfile(userId),
    getRoleplayScores(userId),
    getDealStats(userId),
    getUserPodInfo(userId),
  ]);

  // 1. Readiness Score (30%) — from assessment
  const readiness = profile?.assessment?.scores
    ? Math.round(
        Object.values(profile.assessment.scores).reduce(
          (sum: number, v: unknown) => sum + (typeof v === "number" ? v : 0),
          0,
        ) /
          Math.max(
            Object.values(profile.assessment.scores).filter(
              (v) => typeof v === "number",
            ).length,
            1,
          ),
      )
    : 0;

  // 2. Artifact Completion (25%) — from profile.artifacts
  const profileArtifacts = profile?.artifacts || {} as Record<string, unknown>;
  const ARTIFACT_MAP: Record<string, string> = {
    icp: "icpDocument",
    positioning: "positioningStatement",
    valueProposition: "valuePropositionCanvas",
    acquisitionPath: "acquisitionPath",
    discoveryPlaybook: "discoveryPlaybook",
    emailSequences: "listBuildingCriteria", // closest artifact
    objectionLibrary: "objectionLibrary",
    personalPlaybook: "discProfile", // closest artifact
  };
  const artifactDetails = ARTIFACT_KEYS.map((key) => ({
    key,
    completed: !!(profileArtifacts as Record<string, unknown>)[ARTIFACT_MAP[key]],
  }));
  const artifactCount = artifactDetails.filter((a) => a.completed).length;
  const artifacts = Math.round((artifactCount / ARTIFACT_KEYS.length) * 100);

  // 3. Pipeline Value (20%) — normalized: $10K+ = 100
  const pipelineNormalized = Math.min(
    100,
    Math.round((dealStats.totalValue / 1000000) * 100), // dealValue in cents, $10K = 1000000 cents
  );

  // 4. Roleplay Average (25%) — 1-10 scale → 0-100
  const roleplayNormalized =
    roleplayScores.avgScore > 0
      ? Math.round(roleplayScores.avgScore * 10)
      : 0;

  // Composite
  const composite = Math.round(
    readiness * 0.3 +
      artifacts * 0.25 +
      pipelineNormalized * 0.2 +
      roleplayNormalized * 0.25,
  );

  // Eligibility — show in final 2 weeks of cohort, or always for solo learners
  const eligible =
    !podInfo ||
    !podInfo.totalWeeks ||
    podInfo.weekNumber >= podInfo.totalWeeks - 1;

  const isEs = locale === "es";
  const label =
    composite >= 75
      ? isEs
        ? "Listo para el Demo Day"
        : "Ready for Demo Day"
      : isEs
        ? "Preparándote para el Demo Day"
        : "Preparing for Demo Day";

  return {
    composite,
    breakdown: {
      readiness,
      artifacts,
      pipeline: pipelineNormalized,
      roleplay: roleplayNormalized,
    },
    artifactDetails,
    eligible,
    label,
    topDeals: dealStats.topDeals,
    roleplaySessions: roleplayScores.totalSessions,
  };
}

async function getRoleplayScores(
  userId: string,
): Promise<{ avgScore: number; totalSessions: number }> {
  const db = getDb();
  if (!db) return { avgScore: 0, totalSessions: 0 };

  const rows = await db
    .select({ evaluation: schema.roleplaySession.evaluation })
    .from(schema.roleplaySession)
    .where(eq(schema.roleplaySession.userId, userId))
    .orderBy(desc(schema.roleplaySession.createdAt))
    .limit(20);

  if (rows.length === 0) return { avgScore: 0, totalSessions: 0 };

  const scores = rows
    .map((r) => {
      const eval_ = r.evaluation as { score?: number } | null;
      return eval_?.score ?? 0;
    })
    .filter((s) => s > 0);

  const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  return { avgScore: avg, totalSessions: scores.length };
}

async function getDealStats(
  userId: string,
): Promise<{
  totalValue: number;
  topDeals: { name: string; company: string | null; value: number | null }[];
}> {
  const db = getDb();
  if (!db) return { totalValue: 0, topDeals: [] };

  const deals = await db
    .select({
      prospectName: schema.pipelineDeal.prospectName,
      prospectCompany: schema.pipelineDeal.prospectCompany,
      dealValue: schema.pipelineDeal.dealValue,
      stage: schema.pipelineDeal.stage,
    })
    .from(schema.pipelineDeal)
    .where(
      and(
        eq(schema.pipelineDeal.userId, userId),
        notInArray(schema.pipelineDeal.stage, ["lost"]),
      ),
    );

  const totalValue = deals.reduce((sum, d) => sum + (d.dealValue || 0), 0);
  const topDeals = [...deals]
    .sort((a, b) => (b.dealValue || 0) - (a.dealValue || 0))
    .slice(0, 3)
    .map((d) => ({
      name: d.prospectName,
      company: d.prospectCompany,
      value: d.dealValue,
    }));

  return { totalValue, topDeals };
}

/** Default cohort length if not specified in pod metadata */
const DEFAULT_TOTAL_WEEKS = 6;

async function getUserPodInfo(
  userId: string,
): Promise<{ weekNumber: number; totalWeeks: number } | null> {
  const db = getDb();
  if (!db) return null;

  const memberRows = await db
    .select({ podId: schema.podMember.podId })
    .from(schema.podMember)
    .where(
      and(
        eq(schema.podMember.userId, userId),
        eq(schema.podMember.status, "active"),
      ),
    )
    .limit(1);

  if (memberRows.length === 0) return null;

  const pod = await db
    .select({
      weekNumber: schema.pod.weekNumber,
      metadata: schema.pod.metadata,
    })
    .from(schema.pod)
    .where(eq(schema.pod.id, memberRows[0].podId))
    .limit(1);

  if (pod.length === 0) return null;

  const meta = pod[0].metadata as Record<string, unknown> | null;
  const totalWeeks =
    typeof meta?.totalWeeks === "number"
      ? meta.totalWeeks
      : DEFAULT_TOTAL_WEEKS;

  return { weekNumber: pod[0].weekNumber, totalWeeks };
}
