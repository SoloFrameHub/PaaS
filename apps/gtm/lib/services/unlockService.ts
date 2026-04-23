import { CURRICULUM } from "@/lib/data/curriculum";
import { isContentPublished } from "@/lib/data/content-status";
import type { FounderProfile } from "@/types/profile";

/**
 * Smart Unlock Service
 *
 * Determines which courses a user can access based on:
 * 1. Course 0 always unlocked
 * 2. Assessment-driven: recommendedStartCourse + quickWin/criticalGap courses
 * 3. Sequential within track: complete Course N to unlock Course N+1
 * 4. Cross-track: completing Course 3 unlocks recommended path track
 * 5. Journey map phases
 */

// Track boundaries: [firstCourseNumber, lastCourseNumber]
const TRACKS: Array<{ id: string; start: number; end: number }> = [
  { id: "foundations", start: 0, end: 4 },
  { id: "marketing-engine", start: 5, end: 12 },
  { id: "sales-methodology", start: 13, end: 20 },
  { id: "ai-acquisition", start: 21, end: 27 },
  { id: "creator-economy", start: 28, end: 35 },
  { id: "customer-success", start: 36, end: 39 },
  { id: "operations-systems", start: 40, end: 48 },
];

function getTrackForCourse(
  courseNumber: number,
): (typeof TRACKS)[0] | undefined {
  return TRACKS.find((t) => courseNumber >= t.start && courseNumber <= t.end);
}

export class UnlockService {
  /**
   * Get the full set of course numbers this user can access.
   */
  getUnlockedCourses(profile: FounderProfile): Set<number> {
    const unlocked = new Set<number>();
    const completed = new Set(profile.progress.completedCourses);

    // Rule 1: Course 0 always unlocked
    unlocked.add(0);

    // Rule 2: All completed courses are unlocked (for review)
    profile.progress.completedCourses.forEach((cn) => unlocked.add(cn));

    // Rule 3: Sequential within track — completing Course N unlocks Course N+1
    for (const track of TRACKS) {
      for (let cn = track.start; cn <= track.end; cn++) {
        if (completed.has(cn) && cn + 1 <= track.end) {
          unlocked.add(cn + 1);
        }
      }
    }

    // Rule 4: Assessment-driven unlocks
    if (profile.assessment) {
      const assessment = profile.assessment;

      // Unlock the recommended start course
      if (assessment.recommendedStartCourse !== undefined) {
        unlocked.add(assessment.recommendedStartCourse);
      }

      // Unlock courses referenced by quick wins and critical gaps
      for (const item of [
        ...(assessment.quickWins || []),
        ...(assessment.criticalGaps || []),
      ]) {
        if (item.addressedInCourse !== undefined) {
          unlocked.add(item.addressedInCourse);
        }
      }

      // Rule 5: Cross-track unlock after Course 3 (Choose Your Acquisition Path)
      if (completed.has(3)) {
        // Default to 'hybrid' if recommendedPath is missing to prevent soft-lock
        const path = assessment.recommendedPath || "hybrid";
        switch (path) {
          case "inbound":
            unlocked.add(5); // First course of Marketing Engine
            break;
          case "outbound":
            unlocked.add(13); // First course of Sales Methodology
            break;
          case "hybrid":
          default:
            unlocked.add(5);
            unlocked.add(13);
            break;
        }
      }

      // Rule 6: Journey map phase unlocks
      if (assessment.journeyMap && assessment.journeyMap.length > 0) {
        for (let i = 0; i < assessment.journeyMap.length; i++) {
          const phase = assessment.journeyMap[i];

          if (i === 0) {
            // First phase: unlock first course of each group
            for (const cn of phase.courses) {
              unlocked.add(cn);
            }
          } else {
            // Later phases: unlock if all previous phase courses completed
            const prevPhase = assessment.journeyMap[i - 1];
            const prevComplete = prevPhase.courses.every((cn) =>
              completed.has(cn),
            );
            if (prevComplete) {
              for (const cn of phase.courses) {
                unlocked.add(cn);
              }
            }
          }
        }
      }
    }

    // Rule 6b: If any course in a track is unlocked, also unlock the track's first course
    for (const track of TRACKS) {
      const hasUnlockedInTrack = Array.from(unlocked).some(
        (cn) => cn >= track.start && cn <= track.end,
      );
      if (hasUnlockedInTrack) {
        unlocked.add(track.start);
      }
    }

    // Rule 7: Current course is always unlocked
    if (profile.progress.currentCourse !== null) {
      unlocked.add(profile.progress.currentCourse);
    }

    return unlocked;
  }

  /**
   * Check if a specific course is unlocked for this user.
   */
  isCourseUnlocked(profile: FounderProfile, courseNumber: number): boolean {
    return this.getUnlockedCourses(profile).has(courseNumber);
  }

  /**
   * Get courses specifically recommended for this user based on assessment gaps.
   */
  getRecommendedCourses(profile: FounderProfile): number[] {
    if (!profile.assessment) return [];

    const recommended = new Set<number>();

    for (const item of [
      ...(profile.assessment.quickWins || []),
      ...(profile.assessment.criticalGaps || []),
    ]) {
      if (item.addressedInCourse !== undefined) {
        recommended.add(item.addressedInCourse);
      }
    }

    if (profile.assessment.recommendedStartCourse !== undefined) {
      recommended.add(profile.assessment.recommendedStartCourse);
    }

    // Filter out completed courses
    const completed = new Set(profile.progress.completedCourses);
    return Array.from(recommended).filter((cn) => !completed.has(cn));
  }

  /**
   * Check if course content is actually available (not "coming soon").
   */
  isCourseAccessible(courseId: string): boolean {
    return isContentPublished(courseId);
  }
}

export const unlockService = new UnlockService();
