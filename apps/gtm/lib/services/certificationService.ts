/**
 * Certification Service — Certified Solo GTM Practitioner
 *
 * Eligibility criteria:
 *  1. All courses in Track 1 (Foundations): course numbers 0–4
 *  2. All courses in Track 3 (Sales Methodology): course numbers 13–20
 *  3. Roleplay average score ≥ 75
 *
 * On award:
 *  - Stores certificationEarned on profile.progress (idempotent)
 *  - Issues Badgr assertion (gracefully degrades if Badgr unconfigured)
 */

import { randomUUID } from "crypto";
import { profileCoreService } from "./profileCoreService";
import { profileRepository } from "@/lib/repositories/profileRepository";
import { badgrClient } from "@/lib/badgr/client";
import { logger } from "@/lib/logger";
import type { CertificationEarned } from "@/types/profile";

// Course numbers for each required track
const TRACK_1_COURSES = [0, 1, 2, 3, 4];
const TRACK_3_COURSES = [13, 14, 15, 16, 17, 18, 19, 20];
const ROLEPLAY_SCORE_THRESHOLD = 75;

export interface EligibilityResult {
  eligible: boolean;
  reasons: {
    track1Complete: boolean;
    track3Complete: boolean;
    roleplayScoreMet: boolean;
  };
}

class CertificationService {
  checkEligibility(
    completedCourses: number[],
    roleplayAvgScore: number,
  ): EligibilityResult {
    const completed = new Set(completedCourses);
    const track1Complete = TRACK_1_COURSES.every((n) => completed.has(n));
    const track3Complete = TRACK_3_COURSES.every((n) => completed.has(n));
    const roleplayScoreMet = roleplayAvgScore >= ROLEPLAY_SCORE_THRESHOLD;

    return {
      eligible: track1Complete && track3Complete && roleplayScoreMet,
      reasons: { track1Complete, track3Complete, roleplayScoreMet },
    };
  }

  /**
   * Check eligibility for a user and, if met and not yet awarded, issue the cert.
   * Idempotent — safe to call on every course completion.
   */
  async checkAndAward(
    userId: string,
    locale: "en" | "es" = "en",
  ): Promise<{ awarded: boolean; cert: CertificationEarned | null }> {
    try {
      const profile = await profileCoreService.getProfile(userId);
      if (!profile) return { awarded: false, cert: null };

      // Already certified — return existing
      if (profile.progress?.certificationEarned) {
        return { awarded: false, cert: profile.progress.certificationEarned };
      }

      const completedCourses = profile.progress?.completedCourses ?? [];
      const roleplayAvgScore = profile.progress?.roleplayStats?.avgScore ?? 0;
      const result = this.checkEligibility(completedCourses, roleplayAvgScore);

      if (!result.eligible) {
        return { awarded: false, cert: null };
      }

      const certId = randomUUID();
      const email = profile.email;

      // Issue Badgr badge (non-blocking failure — we store cert locally regardless)
      const assertion = await badgrClient.issueAssertion(email, locale, certId);
      if (!assertion) {
        logger.warn("Badgr issuance failed — cert stored locally", {
          userId,
          certId,
        });
      }

      const cert: CertificationEarned = {
        certId,
        badgrAssertionUrl: assertion?.assertionUrl ?? null,
        earnedAt: new Date().toISOString(),
        locale,
      };

      await profileRepository.update(userId, {
        "progress.certificationEarned": cert,
      });

      logger.info("Certification awarded", { userId, certId });
      return { awarded: true, cert };
    } catch (error) {
      console.error("[checkAndAward] failed:", error);
      throw error;
    }
  }
}

export const certificationService = new CertificationService();
