import { getAuthContext } from '@/lib/auth';
import { CURRICULUM, getAllCourses, getCourseDimension, getCourseTier, DIMENSION_COURSE_MAP } from '@/lib/data/curriculum';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { computeDimensionScores, getDimensionLabel, getWeakDimensions } from '@/lib/utils/wellness-scores';
import { getMatchingSymptomsForCourse } from '@/lib/utils/personalization';

/** Capitalize a symptom slug for display (e.g. "social-anxiety" -> "Social Anxiety") */
function formatSymptom(s: string): string {
    return s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export const metadata = {
    title: 'Academy - Wellness Academy',
    description: 'Browse all courses in the Wellness Academy',
}

export default async function AcademyPage() {
    const { user, profile } = await getAuthContext();

    if (!user) {
        redirect('/signin');
    }

    if (!profile) {
        redirect('/onboarding/welcome');
    }

    const completedCourses = profile.progress?.completedCourses || [];
    const completedLessons: Record<string, string[]> = profile.progress?.completedLessons || {};
    const currentCourse = profile.progress?.currentCourse || 'anxiety-management';
    const totalCourses = CURRICULUM.flatMap(t => t.courses).length;

    // Wellness intelligence (pure, no I/O)
    let scores: ReturnType<typeof computeDimensionScores> | null = null;
    try {
        scores = computeDimensionScores(profile);
    } catch (e) {
        console.error('[Academy] Wellness score computation failed:', e);
    }
    const userSymptoms = (profile.questionnaire?.primarySymptoms ?? []).map(s => s.category);

    // Recommended courses from onboarding assessment; fall back to weak-dimension courses
    const recommendedCourseIds = profile.assessment?.recommendedCourses ?? [];
    const allCourses = getAllCourses();
    let resolvedRecommendedIds = recommendedCourseIds;
    if (resolvedRecommendedIds.length === 0 && scores) {
        const completed = new Set(completedCourses);
        const weak = getWeakDimensions(scores).slice(0, 3);
        const fallbackIds: string[] = [];
        for (const dim of weak) {
            const dimCourses = DIMENSION_COURSE_MAP[dim.key] ?? [];
            const first = dimCourses.find(id => !completed.has(id));
            if (first) fallbackIds.push(first);
        }
        if (fallbackIds.length === 0) {
            // Last resort: first 3 uncompleted courses
            for (const c of allCourses) {
                if (!completed.has(c.id) && fallbackIds.length < 3) fallbackIds.push(c.id);
            }
        }
        resolvedRecommendedIds = fallbackIds;
    }
    const recommendedSet = new Set(resolvedRecommendedIds);
    const recommendedCourses = resolvedRecommendedIds
        .map(id => allCourses.find(c => c.id === id))
        .filter(Boolean) as typeof allCourses;

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Wellness Academy
                </h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
                    This is your central learning hub. Here you can track your progress across all {totalCourses} courses,
                    resume where you left off, and explore evidence-based tracks covering anxiety, depression, sleep,
                    and more. Each track is built to be sequential, but you can jump to specific topics that
                    match your current needs.
                </p>
            </div>

            {/* Progress Summary */}
            <div className="bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl p-6 mb-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium opacity-90 mb-1">Courses Completed</div>
                        <div className="text-3xl font-bold">{completedCourses.length} / {totalCourses}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-medium opacity-90 mb-1">XP Earned</div>
                        <div className="text-3xl font-bold">{profile.progress?.xpTotal || 0}</div>
                    </div>
                </div>
                <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-1000"
                        style={{ width: `${(completedCourses.length / totalCourses) * 100}%` }}
                    />
                </div>
            </div>

            {/* Recommended for You */}
            {recommendedCourses.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            Recommended for You
                        </h2>
                        <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2.5 py-1 rounded-lg">
                            Based on your wellness profile
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {recommendedCourses.map((course) => {
                            const isCompleted = completedCourses.includes(course.id);
                            const isCurrent = course.id === currentCourse;
                            const matchingSymptoms = getMatchingSymptomsForCourse(course.id, userSymptoms);
                            const dimension = getCourseDimension(course.id);
                            const tier = getCourseTier(course.id);
                            return (
                                <Link
                                    key={course.id}
                                    href={`/academy/${course.id}`}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl border border-primary-100 dark:border-primary-500/20 p-5 hover:border-primary-300 dark:hover:border-primary-500/40 transition-all hover:shadow-md"
                                >
                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2 py-0.5 rounded-lg">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Recommended
                                        </span>
                                        {dimension && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                {getDimensionLabel(dimension)} · {tier}
                                            </span>
                                        )}
                                        {course.evidenceBadge && (
                                            <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-lg text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10">
                                                {course.evidenceBadge}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {course.title}
                                    </h3>
                                    {matchingSymptoms.length > 0 && (
                                        <p className="text-xs text-violet-500 dark:text-violet-400 font-medium mb-2">
                                            Matches: {matchingSymptoms.map(formatSymptom).join(', ')}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                                        {course.description}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>{course.lessons.length} lessons</span>
                                        <span>~20 min each</span>
                                    </div>
                                    {(isCompleted || isCurrent) && (
                                        <div className="mt-3">
                                            {isCompleted ? (
                                                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-lg">
                                                    Completed
                                                </span>
                                            ) : (
                                                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2 py-0.5 rounded-lg">
                                                    In Progress
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Tracks and Courses */}
            <div className="space-y-8">
                {CURRICULUM.map((track, trackIndex) => {
                    const trackCompleted = track.courses.filter(c => completedCourses.includes(c.id)).length;
                    return (
                    <div key={track.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 overflow-hidden">
                        {/* Track Header */}
                        <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-4 border-b border-gray-100 dark:border-gray-700/60">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        {track.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {track.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        {trackCompleted}/{track.courses.length} Courses
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Course List */}
                        <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
                            {track.courses.map((course, courseIndex) => {
                                const doneLessons = completedLessons[course.id]?.length ?? 0;
                                const totalLessons = course.lessons.length;
                                // Source of truth: all lessons actually completed (not just the flag)
                                const isCompleted = doneLessons >= totalLessons && totalLessons > 0;
                                const isInProgress = doneLessons > 0 && !isCompleted;
                                const isCurrent = course.id === currentCourse;
                                const isRecommended = recommendedSet.has(course.id);
                                const tier = getCourseTier(course.id);

                                return (
                                    <div
                                        key={course.id}
                                        data-testid="course-card"
                                        className="p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/20"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Course Number Badge */}
                                            <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg
                        ${isCompleted
                                                    ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400'
                                                    : isInProgress
                                                        ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                                                }
                      `}>
                                                {isCompleted ? '✓' : course.number}
                                            </div>

                                            {/* Course Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
                                                            {course.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                                            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-lg ${
                                                                tier === 'Essentials'
                                                                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10'
                                                                    : tier === 'Techniques'
                                                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                                                                        : 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10'
                                                            }`}>
                                                                {tier}
                                                            </span>
                                                            {course.evidenceBadge && (
                                                                <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-lg text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10">
                                                                    {course.evidenceBadge}
                                                                </span>
                                                            )}
                                                            {course.clinicalCaveat === 'medication-required' && (
                                                                <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-lg text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10">
                                                                    Clinical guidance required
                                                                </span>
                                                            )}
                                                            {isInProgress && (
                                                                <span className="inline-block text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2 py-0.5 rounded-lg">
                                                                    In Progress
                                                                </span>
                                                            )}
                                                            {isRecommended && !isCurrent && (
                                                                <span className="inline-block text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 rounded-lg">
                                                                    Matched for You
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-400 whitespace-nowrap">
                                                        {course.lessons.length} lessons
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                                                    {course.description}
                                                </p>

                                                {/* Outcomes */}
                                                {course.outcomes && course.outcomes.length > 0 && (
                                                    <div className="mb-4">
                                                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                                            What You&apos;ll Learn
                                                        </div>
                                                        <ul className="space-y-1">
                                                            {course.outcomes.slice(0, 3).map((outcome, idx) => (
                                                                <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                                                    <span className="text-primary-500 mt-1">•</span>
                                                                    <span>{outcome}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Lessons Count */}
                                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                                    {isInProgress ? (
                                                        <span className="text-primary-600 dark:text-primary-400 font-medium">
                                                            {doneLessons} of {totalLessons} lessons complete
                                                        </span>
                                                    ) : (
                                                        <span>{totalLessons} lessons</span>
                                                    )}
                                                    <Link
                                                        href={`/academy/${course.id}`}
                                                        className={`
                                font-semibold transition-colors
                                ${isInProgress || isCurrent
                                                                ? 'text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
                                                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                                                            }
                              `}
                                                    >
                                                        {isCompleted ? 'Review Course' : isInProgress ? 'Continue' : 'Start Course'} →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    );
}
