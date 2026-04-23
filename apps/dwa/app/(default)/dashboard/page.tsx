import AcademyDashboard from './academy-dashboard';
import { getAuthContext } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { computeDimensionScores, emptyScores } from '@/lib/utils/wellness-scores';
import { buildWellnessActions } from '@/lib/utils/wellness-actions';
import { computeWellnessAlerts } from '@/lib/utils/wellness-alerts';
import { profileRepository } from '@/lib/repositories/profileRepository';
import { invalidateCache } from '@/lib/redis';
import type { WellnessScoreSnapshot } from '@/types/wellness-scores';
import { DIMENSION_KEYS } from '@/types/wellness-scores';
import type { SymptomCategory } from '@/types/wellness-profile';
import {
  computeOverallScoreFromSymptoms,
  computeDimensionScoreFromSymptoms,
  computeAreasForGrowthFromSymptoms,
  computeStrengthsFromQuestionnaire,
  computePersonalizedInsight,
} from '@/lib/utils/onboarding-assessment';

export const metadata = {
  title: 'Dashboard | Wellness Academy',
  description: 'Your Wellness Journey Progress',
}

export default async function DashboardPage() {
  console.log('[Dashboard] Render start');

  let user: Awaited<ReturnType<typeof getAuthContext>>['user'] = null;
  let profile: Awaited<ReturnType<typeof getAuthContext>>['profile'] = null;

  try {
    const ctx = await getAuthContext();
    user = ctx.user;
    profile = ctx.profile;
    console.log('[Dashboard] Auth:', { hasUser: !!user, hasProfile: !!profile, onboardingCompleted: profile?.onboardingCompleted });
  } catch (e) {
    // Only redirect to signin for auth errors, not DB errors.
    // A DB error should surface as an error page, not silently
    // redirect to onboarding (which falsely tells the user to redo it).
    console.error('[Dashboard] getAuthContext threw:', e);
    throw e;
  }

  // 1. Not authenticated -> signin
  if (!user) {
    redirect('/signin');
  }

  // 2. Authenticated but no profile OR onboarding not complete -> onboarding
  if (!profile || !profile.onboardingCompleted) {
    redirect('/onboarding/welcome');
  }

  // ── Lazy assessment migration ────────────────────────────────────────────
  // Runs for any user whose assessment data is missing or has the old hardcoded
  // values (areasForGrowth: [], overallWellnessScore: 50, assessment: null).
  // Saves corrected values to the DB non-blocking so subsequent visits are instant.
  // Also patches the in-memory profile so THIS render is already correct.
  try {
    const symptoms = profile.questionnaire?.primarySymptoms ?? [];
    const hasSymptoms = symptoms.length > 0;

    // Trigger when: assessment is null/undefined, OR areasForGrowth is empty with symptoms present
    const assessmentMissing = profile.assessment == null; // covers both null and undefined
    const assessmentStale =
      !assessmentMissing &&
      (profile.assessment!.areasForGrowth?.length ?? 0) === 0 &&
      hasSymptoms;
    const needsMigration = (assessmentMissing || assessmentStale) && hasSymptoms;

    if (needsMigration) {
      const overallWellnessScore = computeOverallScoreFromSymptoms(symptoms);
      const anxietyScore = computeDimensionScoreFromSymptoms(symptoms, ['anxiety', 'panic', 'social-anxiety', 'ocd'] as SymptomCategory[]);
      const moodScore = computeDimensionScoreFromSymptoms(symptoms, ['depression', 'grief', 'anger'] as SymptomCategory[]);
      const sleepScore = computeDimensionScoreFromSymptoms(symptoms, ['sleep'] as SymptomCategory[]);
      const stressScore = computeDimensionScoreFromSymptoms(symptoms, ['stress', 'trauma'] as SymptomCategory[]);
      const areasForGrowth = computeAreasForGrowthFromSymptoms(symptoms);
      const strengthsIdentified = computeStrengthsFromQuestionnaire(profile.questionnaire);
      const personalizedInsight = computePersonalizedInsight(symptoms);

      if (assessmentMissing) {
        // Build a complete assessment object from scratch — existing assessment is null/missing
        const newAssessment = {
          overallWellnessScore,
          anxietyScore,
          moodScore,
          sleepScore,
          stressScore,
          areasForGrowth,
          strengthsIdentified,
          personalizedInsight,
          recommendedCourses: [],
          recommendedStartCourse: '',
          priorityFocus: symptoms.filter(s => s.isPrimary).map(s => s.category),
          generatedAt: new Date().toISOString(),
        };
        profileRepository.update(user.uid, { assessment: newAssessment })
          .catch(e => console.error('[Dashboard] Assessment creation failed:', e));
        // Invalidate AI coach context cache so coach sees the new data immediately
        invalidateCache(`ai:ctx:${user.uid}`).catch(() => {});
        profile = { ...profile, assessment: newAssessment };
      } else {
        // Patch stale fields — merge at top level to preserve recommendedCourses, assessmentHistory etc.
        // Must NOT use dot-paths here: jsonb_set silently fails through a JSON null intermediate key.
        profileRepository.update(user.uid, {
          assessment: {
            ...profile.assessment!,
            overallWellnessScore,
            anxietyScore,
            moodScore,
            sleepScore,
            stressScore,
            areasForGrowth,
            strengthsIdentified,
            personalizedInsight,
          },
        }).catch(e => console.error('[Dashboard] Assessment migration failed:', e));
        // Invalidate AI coach context cache so coach sees the corrected data immediately
        invalidateCache(`ai:ctx:${user.uid}`).catch(() => {});
        profile = {
          ...profile,
          assessment: {
            ...profile.assessment!,
            overallWellnessScore,
            anxietyScore,
            moodScore,
            sleepScore,
            stressScore,
            areasForGrowth,
            strengthsIdentified,
            personalizedInsight,
          },
        };
      }

      console.log('[Dashboard] Assessment migrated for user', user.uid,
        assessmentMissing ? '(created)' : '(patched)');
    }
  } catch (e) {
    // Migration is non-critical — log and continue
    console.error('[Dashboard] Assessment migration threw:', e);
  }

  // Compute wellness intelligence server-side (pure functions, no I/O)
  let scores: ReturnType<typeof computeDimensionScores>;
  let actions: ReturnType<typeof buildWellnessActions> = [];
  let alerts: ReturnType<typeof computeWellnessAlerts> = [];
  try {
    scores = computeDimensionScores(profile);
    actions = buildWellnessActions(profile, scores);
    alerts = computeWellnessAlerts(profile, scores);
    console.log('[Dashboard] Scores computed:', { overallScore: scores.overallScore, actionCount: actions.length, alertCount: alerts.length });
  } catch (e) {
    console.error('[Dashboard] Wellness score computation failed:', e);
    scores = emptyScores();
  }

  // Persist a score snapshot once per 24 hours (non-blocking)
  try {
    const lastSnapshot = profile.wellnessScoreHistory?.at(-1);
    const hoursSinceLastSnapshot = lastSnapshot
      ? (Date.now() - new Date(lastSnapshot.snapshotAt).getTime()) / 3_600_000
      : Infinity;

    if (hoursSinceLastSnapshot > 24 && scores.overallScore !== null) {
      const newSnapshot: WellnessScoreSnapshot = {
        scores: Object.fromEntries(
          DIMENSION_KEYS.map(k => [k, scores.dimensions[k]?.score ?? null])
        ) as Record<typeof DIMENSION_KEYS[number], number | null>,
        overallScore: scores.overallScore,
        snapshotAt: scores.computedAt,
      };
      profileRepository.update(user.uid, {
        wellnessScoreHistory: [
          ...(profile.wellnessScoreHistory ?? []).slice(-11),
          newSnapshot,
        ],
      }).catch(() => { /* non-critical */ });
    }
  } catch { /* snapshot persistence is non-critical */ }

  // Render the dashboard — call as function to catch errors in its body
  console.log('[Dashboard] Rendering AcademyDashboard');
  try {
    const content = await AcademyDashboard({ profile, scores, actions, alerts });
    console.log('[Dashboard] Render complete');
    return content;
  } catch (e) {
    // This catches errors in AcademyDashboard's function body.
    // Rethrow so error.tsx can handle it, but log the FULL error server-side first.
    console.error('[Dashboard] AcademyDashboard CRASHED:', e);
    console.error('[Dashboard] Profile keys:', Object.keys(profile));
    console.error('[Dashboard] Profile.progress:', JSON.stringify(profile.progress).slice(0, 500));
    console.error('[Dashboard] Profile.assessment:', JSON.stringify(profile.assessment).slice(0, 500));
    console.error('[Dashboard] Profile.questionnaire:', JSON.stringify(profile.questionnaire).slice(0, 500));
    throw e;
  }
}
