import { getCourse, getAllCourses } from '@/lib/data/curriculum';
import { getMatchingSymptomsForCourse } from '@/lib/utils/personalization';
import Link from 'next/link';
import type { WellnessProfile } from '@/types/wellness-profile';
import { SYMPTOM_COURSE_MAPPING } from '@/types/wellness-profile';
import type { WellnessScores, PrioritizedWellnessAction, WellnessAlert } from '@/types/wellness-scores';
import type { PathCourse } from '@/components/ui/learning-path-timeline';
import WellnessHealth from './components/wellness-health';
import NextSteps from './components/next-steps';
import WellnessAlertsDisplay from './components/wellness-alerts-display';
import DashboardPathPreview from './components/dashboard-path-preview';
import {
    computeOverallScoreFromSymptoms,
    computeAreasForGrowthFromSymptoms,
    computeStrengthsFromQuestionnaire,
    computePersonalizedInsight,
} from '@/lib/utils/onboarding-assessment';

/** Capitalize a symptom slug for display */
function formatSymptom(s: string): string {
    return s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}


interface AcademyDashboardProps {
    profile: WellnessProfile;
    scores: WellnessScores;
    actions: PrioritizedWellnessAction[];
    alerts: WellnessAlert[];
}

export default async function AcademyDashboard({ profile, scores, actions, alerts }: AcademyDashboardProps) {
    console.log('[AcademyDashboard] Render start');
    const currentCourseId = profile.progress?.currentCourse || null;
    const currentCourse = currentCourseId ? getCourse(currentCourseId) : null;
    console.log('[AcademyDashboard] Data ready:', { currentCourseId, currentCourseFound: !!currentCourse });

    // Check if onboarding is truly complete (has wellness data)
    const hasQuestionnaireData = profile.questionnaire?.primarySymptoms?.length;
    const hasAssessment = profile.assessment?.overallWellnessScore != null;
    const isSetupIncomplete = !profile.onboardingCompleted && (!hasQuestionnaireData || !hasAssessment);

    // Check if expanded profile (new onboarding steps) is complete
    const hasExpandedProfile = !!(
        profile.questionnaire?.ageRange ||
        profile.questionnaire?.currentCopingStrategies?.length ||
        profile.questionnaire?.goodDayDescription
    );
    const showExpandedProfilePrompt = !profile.onboardingCompleted && !hasExpandedProfile;

    // Build learning path data for the path preview
    const completedCourses = new Set(profile.progress?.completedCourses ?? []);
    const completedLessonsMap = profile.progress?.completedLessons ?? {};
    const userSymptoms = (profile.questionnaire?.primarySymptoms ?? []).map(s => s.category);
    const primarySymptom = profile.questionnaire?.primarySymptoms?.find(s => s.isPrimary);

    // Use stored recommendations, pad with on-the-fly scoring.
    // Guarantee at least one course per symptom the user selected — don't let
    // a high-scoring primary symptom crowd out secondary symptoms entirely.
    let recommendedCourseIds = [...(profile.assessment?.recommendedCourses ?? [])];
    {
        const existing = new Set(recommendedCourseIds);
        const courseScores: Record<string, number> = {};
        const symptomBestCourse: Record<string, { id: string; score: number }> = {};

        if (userSymptoms.length > 0) {
            for (const symptom of profile.questionnaire?.primarySymptoms ?? []) {
                const courses = SYMPTOM_COURSE_MAPPING[symptom.category] ?? SYMPTOM_COURSE_MAPPING['other'];
                const sevMul = symptom.severity === 'severe' ? 3 : symptom.severity === 'moderate' ? 2 : 1;
                const priMul = symptom.isPrimary ? 2 : 1;
                const score = sevMul * priMul;
                for (const c of courses) {
                    if (!existing.has(c)) courseScores[c] = (courseScores[c] || 0) + score;
                }
                // Track the best course per symptom so we can guarantee representation
                const best = courses.find(c => !existing.has(c));
                if (best && (!symptomBestCourse[symptom.category] || score > symptomBestCourse[symptom.category].score)) {
                    symptomBestCourse[symptom.category] = { id: best, score };
                }
            }
        } else {
            const focusCategories = profile.assessment?.priorityFocus ?? [];
            for (const category of (focusCategories.length > 0 ? focusCategories : ['other' as const])) {
                const courses = SYMPTOM_COURSE_MAPPING[category] ?? SYMPTOM_COURSE_MAPPING['other'];
                for (const c of courses) if (!existing.has(c)) courseScores[c] = (courseScores[c] || 0) + 2;
            }
        }

        if (Object.keys(courseScores).length > 0) {
            // First ensure every symptom has at least one course represented
            const guaranteed = new Set<string>();
            for (const { id } of Object.values(symptomBestCourse)) {
                if (!existing.has(id)) guaranteed.add(id);
            }

            // Then fill remaining slots by score
            const sorted = Object.entries(courseScores)
                .sort((a, b) => b[1] - a[1])
                .map(([id]) => id)
                .filter(id => !existing.has(id) && !guaranteed.has(id));

            const targetCount = Math.max(5, guaranteed.size + 2); // at least 5, more if many symptoms
            const remaining = targetCount - recommendedCourseIds.length - guaranteed.size;
            const additional = [...guaranteed, ...sorted.slice(0, Math.max(0, remaining))];
            recommendedCourseIds = [...recommendedCourseIds, ...additional];
        }
    }

    const pathCourses: PathCourse[] = recommendedCourseIds
        .map(id => {
            const course = getCourse(id);
            if (!course) return null;
            const matching = getMatchingSymptomsForCourse(id, userSymptoms);
            return {
                id: course.id,
                title: course.title,
                description: course.description,
                duration: course.duration,
                lessonCount: course.lessons.length,
                matchingSymptoms: matching.map(formatSymptom),
                completedLessonCount: completedLessonsMap[course.id]?.length ?? 0,
                isCompleted: completedCourses.has(course.id),
                isCurrent: course.id === currentCourseId,
            };
        })
        .filter(Boolean) as PathCourse[];
    const pathCompletedCount = pathCourses.filter(c => c.isCompleted).length;
    const pathProgressPct = pathCourses.length > 0
        ? Math.round((pathCompletedCount / pathCourses.length) * 100)
        : 0;

    // ── Assessment display data ─────────────────────────────────────────────
    // For users who onboarded before these fields were computed, derive them
    // on the fly from the saved symptom data. New users will have these stored.
    const symptoms = profile.questionnaire?.primarySymptoms ?? [];
    const storedAreasForGrowth = profile.assessment?.areasForGrowth ?? [];
    const needsFallback = storedAreasForGrowth.length === 0 && symptoms.length > 0;

    const displayAreasForGrowth = needsFallback
        ? computeAreasForGrowthFromSymptoms(symptoms)
        : storedAreasForGrowth;

    // Guard against 0 (old hardcoded value) in addition to null/undefined
    const displayOverallScore = needsFallback
        ? computeOverallScoreFromSymptoms(symptoms)
        : (profile.assessment?.overallWellnessScore || computeOverallScoreFromSymptoms(symptoms) || 50);

    const displayInsight =
        (profile.assessment?.personalizedInsight || null) ??
        (symptoms.length > 0 ? computePersonalizedInsight(symptoms) : null);

    const storedStrengths = profile.assessment?.strengthsIdentified ?? [];
    const displayStrengths = storedStrengths.length > 0
        ? storedStrengths
        : (symptoms.length > 0 ? computeStrengthsFromQuestionnaire(profile.questionnaire) : []);

    // ── Onboarding data for personalized display ───────────────────────────
    const q = profile.questionnaire;
    const allSymptoms = q?.primarySymptoms ?? [];
    const goals = q?.wellnessGoals ?? [];
    const copingStrategies = q?.currentCopingStrategies ?? [];
    const triggers = q?.knownTriggers ?? [];
    const biggestChallenge = q?.biggestChallenge;
    const goodDay = q?.goodDayDescription;
    const hopedSupport = q?.hopedSupportDescription;
    const therapyHistory = q?.therapyHistory;
    const hasRichProfile = allSymptoms.length > 0 || goals.length > 0;

    const GOAL_LABELS: Record<string, string> = {
        'reduce-anxiety': 'Reduce anxiety', 'improve-mood': 'Improve mood',
        'sleep-better': 'Sleep better', 'better-sleep': 'Sleep better',
        'manage-stress': 'Manage stress', 'build-confidence': 'Build confidence',
        'social-confidence': 'Social confidence', 'understand-feelings': 'Understand feelings',
        'develop-coping-skills': 'Develop coping skills', 'learn-coping-skills': 'Develop coping skills',
        'improve-relationships': 'Improve relationships', 'increase-motivation': 'Increase motivation',
        'practice-self-care': 'Practice self-care', 'manage-panic': 'Manage panic',
        'process-trauma': 'Process trauma', 'manage-thoughts': 'Manage intrusive thoughts',
        'anger-management': 'Manage anger', 'cope-with-grief': 'Cope with grief',
        'general-wellness': 'General wellness',
    };
    const SEVERITY_LABELS: Record<string, string> = { 'mild': 'Mild', 'moderate': 'Moderate', 'severe': 'Significant' };

    // ── Welcome subtitle ─────────────────────────────────────────────────────
    const scoredDimensionCount = Object.values(scores.dimensions).filter(d => d.score !== null).length;
    let welcomeSubtitle: string;
    if (isSetupIncomplete) {
        welcomeSubtitle = "This is your wellness hub. First, let\u2019s complete your profile to personalize your learning path.";
    } else if (scoredDimensionCount === 5) {
        welcomeSubtitle = "You\u2019re actively working on your wellness across all five areas. Every step forward counts.";
    } else if (scoredDimensionCount > 0) {
        welcomeSubtitle = "Here\u2019s a look at your wellness across five areas. Your path is unique \u2014 take it at your own pace.";
    } else {
        welcomeSubtitle = "Everything below is shaped by what you shared during onboarding. This is your space.";
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

            {/* ── Setup Incomplete Banner ─────────────────────────────── */}
            {isSetupIncomplete && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
                                <span className="text-2xl">{'\u26A0\uFE0F'}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-1">Complete Your Setup</h3>
                                <p className="text-amber-700 dark:text-amber-200 text-sm">
                                    {!hasQuestionnaireData && "Your wellness profile is incomplete. "}
                                    {!hasAssessment && "Complete your wellness assessment to unlock personalized guidance and content."}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={!hasQuestionnaireData ? "/onboarding/symptoms" : "/onboarding/assessment"}
                            className="btn bg-amber-500 hover:bg-amber-600 text-white whitespace-nowrap"
                        >
                            {!hasQuestionnaireData ? "Complete Questionnaire" : "Run Analysis"}
                        </Link>
                    </div>
                </div>
            )}

            {/* ── Expanded Profile Prompt ─────────────────────────────── */}
            {showExpandedProfilePrompt && (
                <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-500/30 rounded-2xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                                <span className="text-2xl">{'\u2728'}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-violet-900 dark:text-violet-100 mb-1">Personalize Your Coaching</h3>
                                <p className="text-violet-700 dark:text-violet-200 text-sm">
                                    Answer a few more questions so your AI wellness coach can give you more relevant, personalized guidance.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/onboarding/about-you"
                            className="btn bg-violet-500 hover:bg-violet-600 text-white whitespace-nowrap"
                        >
                            Tell Us More
                        </Link>
                    </div>
                </div>
            )}

            {/* ── Welcome Banner ──────────────────────────────────────── */}
            <div className="relative bg-gradient-to-br from-primary-500 to-violet-500 dark:from-primary-600 dark:to-violet-600 p-8 rounded-3xl mb-6 overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome{profile.name ? `, ${profile.name}` : ''}! {'\uD83D\uDC4B'}</h1>
                    <p className="text-primary-100 text-lg max-w-2xl">{welcomeSubtitle}</p>
                    {(isSetupIncomplete || showExpandedProfilePrompt) && (
                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 text-primary-200">
                                <span className={hasQuestionnaireData ? "text-green-300" : "text-amber-300"}>
                                    {hasQuestionnaireData ? "\u2713" : "\u25CB"}
                                </span>
                                Wellness Profile
                            </div>
                            <div className="flex items-center gap-2 text-primary-200">
                                <span className={hasAssessment ? "text-green-300" : "text-amber-300"}>
                                    {hasAssessment ? "\u2713" : "\u25CB"}
                                </span>
                                Wellness Assessment
                            </div>
                            <div className="flex items-center gap-2 text-primary-200">
                                <span className={hasExpandedProfile ? "text-green-300" : "text-amber-300"}>
                                    {hasExpandedProfile ? "\u2713" : "\u25CB"}
                                </span>
                                Personalized Coaching
                            </div>
                        </div>
                    )}
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-400 opacity-20 rounded-full" />
                <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-40 h-40 bg-primary-400 opacity-20 rounded-full" />
            </div>

            {/* ── Your Profile — visual card with onboarding data ──────── */}
            {hasRichProfile && (
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-700/60 overflow-hidden mb-6">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
                        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Your Wellness Profile</h2>
                        <Link href="/onboarding/symptoms" className="text-sm text-primary-500 hover:text-primary-600 font-medium">
                            Update &rarr;
                        </Link>
                    </div>

                    {/* Top row: Symptoms + Goals side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700/60">

                        {/* What you&apos;re working on */}
                        {allSymptoms.length > 0 && (
                            <div className="p-6">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">What you&apos;re working on</h3>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {allSymptoms.map((s, i) => (
                                        <span key={i} className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-full ${
                                            s.severity === 'severe'
                                                ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-500/30'
                                                : s.severity === 'moderate'
                                                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-500/30'
                                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-600'
                                        }`}>
                                            {s.isPrimary && <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />}
                                            {formatSymptom(s.category)}
                                            <span className="opacity-60">&middot; {SEVERITY_LABELS[s.severity] || s.severity}</span>
                                        </span>
                                    ))}
                                </div>
                                {q?.worstTimeOfDay && q.worstTimeOfDay !== 'varies' && (
                                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                        Hardest time: <span className="font-semibold text-gray-700 dark:text-gray-300">{q.worstTimeOfDay}s</span>
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Goals + preferences */}
                        {goals.length > 0 && (
                            <div className="p-6">
                                <div className="flex items-center gap-2.5 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Your goals</h3>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {goals.map((g, i) => (
                                        <span key={i} className="inline-block text-sm font-semibold bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300 px-3.5 py-2 rounded-full ring-1 ring-primary-200 dark:ring-primary-500/30">
                                            {GOAL_LABELS[g] || g.replace(/-/g, ' ')}
                                        </span>
                                    ))}
                                </div>
                                {/* Inline preferences */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {q?.learningStyle && (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 px-3 py-1.5 rounded-full">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                            {q.learningStyle === 'self-paced' ? 'Self-paced' : q.learningStyle === 'guided' ? 'Guided' : 'Intensive'}
                                        </span>
                                    )}
                                    {q?.timeCommitment && (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 px-3 py-1.5 rounded-full">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {q.timeCommitment === '5-10-min' ? '5\u201310 min/day' : q.timeCommitment === '15-20-min' ? '15\u201320 min/day' : '30+ min/day'}
                                        </span>
                                    )}
                                    {therapyHistory && (
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/30 px-3 py-1.5 rounded-full">
                                            {therapyHistory === 'currently-in-therapy' ? 'In therapy' : therapyHistory === 'past' ? 'Past therapy' : 'New to therapy'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom row: coping + triggers + in-your-words */}
                    {(copingStrategies.length > 0 || triggers.length > 0 || biggestChallenge || goodDay || hopedSupport) && (
                        <div className="border-t border-gray-100 dark:border-gray-700/60">
                            {/* Coping & triggers row */}
                            {(copingStrategies.length > 0 || triggers.length > 0) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-gray-700/60">
                                    {copingStrategies.length > 0 && (
                                        <div className="px-6 py-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                                                    <svg className="w-3.5 h-3.5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Already doing</h3>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {copingStrategies.slice(0, 5).map((s, i) => (
                                                    <span key={i} className="text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-lg">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {triggers.length > 0 && (
                                        <div className="px-6 py-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-6 h-6 rounded bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                                                    <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                                                </div>
                                                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Known triggers</h3>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {triggers.slice(0, 5).map((t, i) => (
                                                    <span key={i} className="text-sm font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-lg">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* In your own words */}
                            {(biggestChallenge || goodDay || hopedSupport) && (
                                <div className="border-t border-gray-100 dark:border-gray-700/60 px-6 py-5">
                                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4">In your words</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {biggestChallenge && (
                                            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/30 dark:to-gray-700/10 rounded-xl px-5 py-4 border border-gray-100 dark:border-gray-700/40">
                                                <div className="absolute top-3 left-3.5 text-4xl leading-none text-gray-200 dark:text-gray-600 font-serif">&ldquo;</div>
                                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 pl-6">Biggest challenge</p>
                                                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed pl-6">{biggestChallenge}</p>
                                            </div>
                                        )}
                                        {goodDay && (
                                            <div className="relative bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-900/10 dark:to-emerald-900/5 rounded-xl px-5 py-4 border border-green-100/60 dark:border-green-800/20">
                                                <div className="absolute top-3 left-3.5 text-4xl leading-none text-green-200 dark:text-green-800 font-serif">&ldquo;</div>
                                                <p className="text-xs font-bold text-green-500/70 dark:text-green-500/50 uppercase tracking-wider mb-2 pl-6">A good day</p>
                                                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed pl-6">{goodDay}</p>
                                            </div>
                                        )}
                                        {hopedSupport && (
                                            <div className="relative bg-gradient-to-br from-primary-50/50 to-violet-50/30 dark:from-primary-900/10 dark:to-violet-900/5 rounded-xl px-5 py-4 border border-primary-100/60 dark:border-primary-800/20">
                                                <div className="absolute top-3 left-3.5 text-4xl leading-none text-primary-200 dark:text-primary-800 font-serif">&ldquo;</div>
                                                <p className="text-xs font-bold text-primary-400/70 dark:text-primary-500/50 uppercase tracking-wider mb-2 pl-6">What you hope for</p>
                                                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed pl-6">{hopedSupport}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* ── Wellness Alerts ─────────────────────────────────────── */}
            <WellnessAlertsDisplay alerts={alerts} />

            {/* ── Learning Path + Sidebar ─────────────────────────────── */}
            {pathCourses.length > 0 && (
                <div className="grid grid-cols-12 gap-6 mb-8">
                    {/* Main learning path — full onboarding-style journey view */}
                    <div className="col-span-full xl:col-span-8">
                        <DashboardPathPreview
                            pathCourses={pathCourses}
                            completedCount={pathCompletedCount}
                        />
                    </div>

                    {/* Sidebar: continue course + progress stats */}
                    <div className="col-span-full xl:col-span-4 space-y-5">

                        {/* Quick Tools — shown to new users with no completed lessons */}
                        {completedCourses.size === 0 && (
                            <div className="bg-gradient-to-br from-violet-50 to-primary-50 dark:from-violet-950/30 dark:to-primary-950/30 border border-violet-100 dark:border-violet-800/40 rounded-2xl p-5">
                                <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-3">Try a Quick Tool</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">No course needed — try one of these right now.</p>
                                <div className="space-y-2">
                                    <Link
                                        href="/academy/anxiety-management/1"
                                        className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-violet-100 dark:border-violet-800/30 hover:border-violet-300 dark:hover:border-violet-600 transition-all text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        <span className="text-lg">🌬️</span>
                                        <span>Box Breathing (2 min)</span>
                                    </Link>
                                    <Link
                                        href="/academy/anxiety-toolkit-foundations/1"
                                        className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-violet-100 dark:border-violet-800/30 hover:border-violet-300 dark:hover:border-violet-600 transition-all text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        <span className="text-lg">🧠</span>
                                        <span>Understand Your Anxiety</span>
                                    </Link>
                                    <Link
                                        href="/academy/sleep-insomnia/1"
                                        className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-violet-100 dark:border-violet-800/30 hover:border-violet-300 dark:hover:border-violet-600 transition-all text-sm font-medium text-gray-700 dark:text-gray-200"
                                    >
                                        <span className="text-lg">😴</span>
                                        <span>Better Sleep Tonight</span>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Continue Course */}
                        {currentCourse && (
                            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">Continue</h2>
                                    <span className="text-xs font-semibold text-primary-500 bg-primary-50 dark:bg-primary-500/10 px-2.5 py-1 rounded-full">
                                        In Progress
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1 leading-snug">{currentCourse.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                                    {currentCourse.description}
                                </p>
                                {(profile.questionnaire?.learningStyle || profile.questionnaire?.timeCommitment) && (
                                    <div className="flex items-center gap-2 flex-wrap mb-4">
                                        {profile.questionnaire?.learningStyle && (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 rounded-lg">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                                {profile.questionnaire.learningStyle === 'self-paced' ? 'Self-Paced' : profile.questionnaire.learningStyle === 'guided' ? 'Guided' : 'Intensive'}
                                            </span>
                                        )}
                                        {profile.questionnaire?.timeCommitment && (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10 px-2 py-0.5 rounded-lg">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {profile.questionnaire.timeCommitment === '5-10-min' ? '5–10 min/day' : profile.questionnaire.timeCommitment === '15-20-min' ? '15–20 min/day' : '30+ min/day'}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <Link
                                    href={`/academy/${currentCourse.id}`}
                                    className="btn bg-primary-500 text-white hover:bg-primary-600 px-6 w-full text-center block"
                                >
                                    Resume Course
                                </Link>
                            </div>
                        )}

                        {/* Progress Stats */}
                        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-5 border border-gray-100 dark:border-gray-700/60">
                            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-4">Your Stats</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 dark:bg-gray-700/30 p-3.5 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-primary-500 mb-0.5">{profile.progress?.xpTotal || 0}</div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">XP Earned</div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700/30 p-3.5 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-primary-500 mb-0.5">{profile.progress?.badges?.length || 0}</div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Badges</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-gray-500 dark:text-gray-400">Academy Completion</span>
                                        <span className="font-bold text-gray-700 dark:text-gray-200">
                                            {Math.round((profile.progress?.completedCourses?.length || 0) / getAllCourses().length * 100)}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary-500 rounded-full transition-all duration-700"
                                            style={{ width: `${(profile.progress?.completedCourses?.length || 0) / getAllCourses().length * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* ── Wellness Health + Smart Actions ─────────────────────── */}
            <div className="grid grid-cols-12 gap-6 mb-8">
                <div className="col-span-full xl:col-span-7">
                    <WellnessHealth scores={scores} />
                </div>
                <div className="col-span-full xl:col-span-5">
                    <NextSteps actions={actions} />
                </div>
            </div>

            {/* ── Assessment Insights + Coach ──────────────────────────── */}
            <div className="grid grid-cols-12 gap-6">

                {/* Baseline Assessment — show when assessment exists OR when we have symptom data to display */}
                {(profile.assessment || displayAreasForGrowth.length > 0) && (
                    <div className="col-span-full md:col-span-6 xl:col-span-4 bg-gray-900 shadow-sm rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-white">Baseline Assessment</h2>
                            <span className="text-xs text-gray-500 font-medium">Starting point</span>
                        </div>

                        {/* Score */}
                        <div className="text-center mb-4">
                            <div className="text-5xl font-black text-primary-400 mb-1">{displayOverallScore}%</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Wellness Score</div>
                        </div>

                        {/* Personalized insight */}
                        {displayInsight && (
                            <p className="text-sm text-gray-400 italic text-center leading-relaxed mb-5 px-1">
                                &ldquo;{displayInsight}&rdquo;
                            </p>
                        )}

                        {/* Focus areas */}
                        {displayAreasForGrowth.length > 0 && (
                            <div className="mb-4">
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2.5">Focus areas</p>
                                <div className="space-y-2">
                                    {displayAreasForGrowth.slice(0, 3).map((area, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-300">
                                            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full shrink-0" />
                                            <span>{area}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Strengths */}
                        {displayStrengths.length > 0 && (
                            <div className="mb-5">
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2.5">Your strengths</p>
                                <div className="space-y-2">
                                    {displayStrengths.slice(0, 2).map((strength, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-400">
                                            <span className="text-green-400 text-xs mt-0.5 shrink-0">✓</span>
                                            <span>{strength}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Link
                            href="/academy"
                            className="block w-full text-center py-2.5 px-4 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 text-sm font-semibold rounded-lg transition-colors"
                        >
                            Start Learning &rarr;
                        </Link>
                    </div>
                )}

                {/* AI Coaching Card */}
                <div className={`col-span-full ${(profile.assessment || displayAreasForGrowth.length > 0) ? 'md:col-span-6 xl:col-span-8' : ''} bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-8 border border-gray-100 dark:border-gray-700/60 overflow-hidden relative`}>
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex-1">
                            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 italic">Wellness Coach</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg">
                                Get personalized guidance and learn coping techniques tailored to your wellness journey.
                            </p>
                        </div>
                        <div className="mt-auto">
                            <Link
                                href="/coach"
                                className="inline-flex items-center gap-2 text-primary-500 font-bold hover:gap-3 transition-all"
                            >
                                Talk to your wellness coach &rarr;
                            </Link>
                        </div>
                    </div>
                    <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-5 dark:opacity-10 scale-150 pointer-events-none">
                        <svg width="240" height="240" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
