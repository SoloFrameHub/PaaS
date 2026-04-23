/**
 * Diagnostic endpoint — runs the exact dashboard render path step by step.
 * Hit GET /api/diagnostic to see where the dashboard crashes.
 * DELETE THIS FILE once the bug is found.
 */

import { NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/auth';
import { computeDimensionScores, emptyScores } from '@/lib/utils/wellness-scores';
import { buildWellnessActions } from '@/lib/utils/wellness-actions';
import { computeWellnessAlerts } from '@/lib/utils/wellness-alerts';
import { getCourse, getAllCourses } from '@/lib/data/curriculum';
import { DIMENSION_KEYS } from '@/types/wellness-scores';
import { profileRepository } from '@/lib/repositories/profileRepository';

export const dynamic = 'force-dynamic';

export async function GET() {
  const steps: { step: string; status: 'ok' | 'error'; detail?: string; data?: unknown }[] = [];

  // Step 1: Auth context
  let user: Awaited<ReturnType<typeof getAuthContext>>['user'] = null;
  let profile: Awaited<ReturnType<typeof getAuthContext>>['profile'] = null;
  try {
    const ctx = await getAuthContext();
    user = ctx.user;
    profile = ctx.profile;
    steps.push({
      step: '1. getAuthContext()',
      status: 'ok',
      data: {
        hasUser: !!user,
        userId: user?.uid,
        hasProfile: !!profile,
        profileKeys: profile ? Object.keys(profile) : [],
        onboardingCompleted: profile?.onboardingCompleted,
        hasAssessment: !!profile?.assessment,
        hasProgress: !!profile?.progress,
        hasQuestionnaire: !!profile?.questionnaire,
      },
    });
  } catch (e) {
    steps.push({ step: '1. getAuthContext()', status: 'error', detail: String(e) });
    return NextResponse.json({ steps }, { status: 200 });
  }

  if (!user) {
    steps.push({ step: '2. Auth check', status: 'ok', detail: 'No user — would redirect to /signin' });
    return NextResponse.json({ steps }, { status: 200 });
  }

  if (!profile || !profile.onboardingCompleted) {
    steps.push({
      step: '2. Profile check',
      status: 'ok',
      detail: `No profile or onboarding incomplete — would redirect to /onboarding/welcome (profile=${!!profile}, onboardingCompleted=${profile?.onboardingCompleted})`,
    });
    return NextResponse.json({ steps }, { status: 200 });
  }

  // Step 3: Compute scores
  let scores: ReturnType<typeof computeDimensionScores>;
  let actions: ReturnType<typeof buildWellnessActions> = [];
  let alerts: ReturnType<typeof computeWellnessAlerts> = [];
  try {
    scores = computeDimensionScores(profile);
    steps.push({
      step: '3a. computeDimensionScores()',
      status: 'ok',
      data: {
        overallScore: scores.overallScore,
        dimensionScores: Object.fromEntries(
          DIMENSION_KEYS.map(k => [k, scores.dimensions[k]?.score ?? null])
        ),
      },
    });
  } catch (e) {
    steps.push({ step: '3a. computeDimensionScores()', status: 'error', detail: String(e) });
    scores = emptyScores();
  }

  try {
    actions = buildWellnessActions(profile, scores);
    steps.push({ step: '3b. buildWellnessActions()', status: 'ok', data: { count: actions.length } });
  } catch (e) {
    steps.push({ step: '3b. buildWellnessActions()', status: 'error', detail: String(e) });
  }

  try {
    alerts = computeWellnessAlerts(profile, scores);
    steps.push({ step: '3c. computeWellnessAlerts()', status: 'ok', data: { count: alerts.length } });
  } catch (e) {
    steps.push({ step: '3c. computeWellnessAlerts()', status: 'error', detail: String(e) });
  }

  // Step 4: Score snapshot persistence
  try {
    const lastSnapshot = profile.wellnessScoreHistory?.at(-1);
    const hoursSinceLastSnapshot = lastSnapshot
      ? (Date.now() - new Date(lastSnapshot.snapshotAt).getTime()) / 3_600_000
      : Infinity;
    steps.push({
      step: '4. Snapshot check',
      status: 'ok',
      data: {
        hoursSinceLastSnapshot: Math.round(hoursSinceLastSnapshot),
        wouldPersist: hoursSinceLastSnapshot > 24 && scores.overallScore !== null,
        historyLength: profile.wellnessScoreHistory?.length ?? 0,
      },
    });
  } catch (e) {
    steps.push({ step: '4. Snapshot check', status: 'error', detail: String(e) });
  }

  // Step 5: AcademyDashboard render data
  try {
    const currentCourseId = profile.progress?.currentCourse || null;
    const currentCourse = currentCourseId ? getCourse(currentCourseId) : null;
    const allCourses = getAllCourses();

    const hasQuestionnaireData = profile.questionnaire?.primarySymptoms?.length;
    const hasAssessment = profile.assessment?.overallWellnessScore != null;

    steps.push({
      step: '5a. AcademyDashboard data prep',
      status: 'ok',
      data: {
        currentCourseId,
        currentCourseFound: !!currentCourse,
        totalCourses: allCourses.length,
        hasQuestionnaireData: !!hasQuestionnaireData,
        hasAssessment,
        completedCoursesCount: profile.progress?.completedCourses?.length ?? 0,
        profileName: profile.name,
      },
    });

    // Test the potentially dangerous division
    const completedLen = profile.progress?.completedCourses?.length || 0;
    const totalLen = allCourses.length;
    const pctRaw = completedLen / totalLen * 100;
    const pctRounded = Math.round(pctRaw);
    steps.push({
      step: '5b. Progress percentage calc',
      status: 'ok',
      data: { completedLen, totalLen, pctRaw, pctRounded },
    });
  } catch (e) {
    steps.push({ step: '5. AcademyDashboard data', status: 'error', detail: String(e) });
  }

  // Step 6: Check WellnessHealth render data
  try {
    for (const key of DIMENSION_KEYS) {
      const dim = scores.dimensions[key];
      if (!dim) {
        steps.push({ step: `6. WellnessHealth dim ${key}`, status: 'error', detail: `scores.dimensions[${key}] is ${String(dim)}` });
      }
    }
    steps.push({ step: '6. WellnessHealth data', status: 'ok' });
  } catch (e) {
    steps.push({ step: '6. WellnessHealth data', status: 'error', detail: String(e) });
  }

  // Step 7: Profile data shape check
  try {
    const profileJson = JSON.stringify(profile);
    steps.push({
      step: '7. Profile serialization',
      status: 'ok',
      data: {
        profileSize: profileJson.length,
        topLevelKeys: Object.keys(profile),
        assessmentKeys: profile.assessment ? Object.keys(profile.assessment) : null,
        progressKeys: profile.progress ? Object.keys(profile.progress) : null,
        questionnaireKeys: profile.questionnaire ? Object.keys(profile.questionnaire) : null,
      },
    });
  } catch (e) {
    steps.push({ step: '7. Profile serialization', status: 'error', detail: String(e) });
  }

  // Step 8: Check for non-serializable data in profile (could crash RSC)
  try {
    const checkSerializable = (obj: unknown, path: string): string[] => {
      const issues: string[] = [];
      if (obj === null || obj === undefined) return issues;
      if (typeof obj === 'function') return [...issues, `${path}: function`];
      if (typeof obj === 'symbol') return [...issues, `${path}: symbol`];
      if (typeof obj === 'bigint') return [...issues, `${path}: bigint`];
      if (obj instanceof Date) return [...issues, `${path}: Date object (should be ISO string)`];
      if (obj instanceof Map || obj instanceof Set) return [...issues, `${path}: ${obj.constructor.name}`];
      if (typeof obj === 'object') {
        for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
          issues.push(...checkSerializable(value, `${path}.${key}`));
        }
      }
      return issues;
    };

    const issues = checkSerializable(profile, 'profile');
    if (issues.length > 0) {
      steps.push({
        step: '8. Serialization check',
        status: 'error',
        detail: `Non-serializable values found: ${issues.join('; ')}`,
      });
    } else {
      steps.push({ step: '8. Serialization check', status: 'ok' });
    }
  } catch (e) {
    steps.push({ step: '8. Serialization check', status: 'error', detail: String(e) });
  }

  return NextResponse.json({ steps, allPassed: steps.every(s => s.status === 'ok') }, { status: 200 });
}
