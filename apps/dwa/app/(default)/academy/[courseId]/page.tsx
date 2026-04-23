import { getCourse, getAllCourses, getCourseDimension, getCourseTier } from '@/lib/data/curriculum';
import { getAuthContext } from '@/lib/auth';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { computeDimensionScores, getDimensionLabel, getTierLabel } from '@/lib/utils/wellness-scores';
import { buildRelevanceMessage, getNextCourseSuggestion } from '@/lib/utils/personalization';
import CoursePresentation from '../components/gamma-presentation';

export async function generateStaticParams() {
    const courses = getAllCourses();
    return courses.map((course) => ({
        courseId: course.id,
    }));
}

export default async function CoursePage(props: {
    params: Promise<{ courseId: string }>
}) {
    const { courseId } = await props.params;
    const course = getCourse(courseId);
    if (!course) notFound();

    const { user, profile } = await getAuthContext();
    if (!user) redirect('/signin');
    if (!profile) redirect('/onboarding/welcome');

    const isCompleted = profile.progress?.completedCourses?.includes(course.id);
    const isCurrent = profile.progress?.currentCourse === course.id;
    const isRecommended = profile.assessment?.recommendedCourses?.includes(course.id);

    // Personalization (pure, no I/O) — wrapped defensively so a bad profile
    // never takes down the whole page
    let scores: ReturnType<typeof computeDimensionScores> | null = null;
    let relevanceMessage: string | null = null;
    let nextSuggestion: ReturnType<typeof getNextCourseSuggestion> = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dimensionScore: any = null;
    let tier: string | null = null;

    try {
        scores = computeDimensionScores(profile);
        relevanceMessage = buildRelevanceMessage(courseId, profile, scores);
        nextSuggestion = getNextCourseSuggestion(courseId, profile, scores);
        const dimension = getCourseDimension(courseId);
        tier = getCourseTier(courseId);
        dimensionScore = dimension && scores ? scores.dimensions[dimension] : null;
    } catch (e) {
        console.error('[CoursePage] Personalization error:', e);
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
            {/* Relevance Banner */}
            {(relevanceMessage || isRecommended) && (
                <div className="mb-4 bg-gradient-to-r from-primary-500 to-violet-500 text-white text-sm font-medium px-5 py-3 rounded-xl flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {relevanceMessage ?? 'Matched to your wellness profile'}
                </div>
            )}

            <div className="mb-8">
                <Link
                    href="/dashboard"
                    className="text-sm font-medium text-primary-500 hover:text-primary-600 flex items-center gap-2 mb-4"
                >
                    ← Back to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Course {course.number}</span>
                            {isCompleted && (
                                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded uppercase tracking-wider">Completed</span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-gray-100">{course.title}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {course.lessons.length > 0 && (
                            <Link
                                href={`/academy/${course.id}/${course.lessons[0].id}`}
                                className="btn bg-primary-500 text-white hover:bg-primary-600 px-8 py-3 text-lg"
                            >
                                {isCurrent ? 'Continue Learning' : 'Start Course'}
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="col-span-full xl:col-span-8">
                    {/* Objectives / Outcomes */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/60 mb-8">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">What you&apos;ll master in this course</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {course.outcomes.map((outcome, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="mt-1.5 w-5 h-5 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{outcome}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Course Overview Presentation */}
                    {course.presentationFile && (
                        <CoursePresentation file={course.presentationFile} title={course.title} />
                    )}

                    {/* Lesson List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Course Curriculum</h2>
                        {course.lessons.map((lesson, idx) => (
                            <Link
                                key={lesson.id}
                                data-testid="lesson-link"
                                href={`/academy/${course.id}/${lesson.id}`}
                                className="group flex items-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 hover:border-primary-500 dark:hover:border-primary-500 transition-all shadow-sm"
                            >
                                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700/50 group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 rounded-xl flex items-center justify-center mr-4 transition-colors">
                                    <span className="text-sm font-bold text-gray-400 group-hover:text-primary-500">{idx + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500 transition-all">{lesson.title}</h4>
                                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                                </div>
                                <div className="text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* What's Next Suggestion */}
                    {nextSuggestion && (
                        <div className="mt-8 bg-violet-50 dark:bg-violet-500/10 rounded-2xl p-6 border border-violet-100 dark:border-violet-500/20">
                            <h3 className="text-sm font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-2">What&apos;s Next</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{nextSuggestion.reason}</p>
                            <Link
                                href={`/academy/${nextSuggestion.courseId}`}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
                            >
                                {nextSuggestion.title}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="col-span-full xl:col-span-4 space-y-8">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 text-center border border-gray-200 dark:border-gray-800">
                        <div className="mb-4">
                            <div className="text-3xl font-black text-gray-800 dark:text-gray-100">{course.lessons.length}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Lessons</div>
                        </div>
                        <div className="h-px bg-gray-200 dark:bg-gray-800 w-1/2 mx-auto mb-4" />
                        <div className="mb-4">
                            <div className="text-3xl font-black text-gray-800 dark:text-gray-100">~20 min</div>
                            <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Per Lesson</div>
                        </div>
                    </div>

                    {/* Evidence Info */}
                    {(course.evidenceBadge || course.clinicalFramework || course.clinicalCaveat) && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700/60 space-y-3">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Evidence Base</div>
                            {course.evidenceBadge && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium px-2 py-1 rounded-lg text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-500/10">
                                        {course.evidenceBadge}
                                    </span>
                                </div>
                            )}
                            {course.clinicalFramework && (
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold text-gray-600 dark:text-gray-300">Framework:</span> {course.clinicalFramework}
                                </div>
                            )}
                            {course.clinicalCaveat === 'medication-required' && (
                                <div className="flex items-start gap-2 pt-1">
                                    <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">Clinical guidance required — medication is a standard part of treatment for this condition.</span>
                                </div>
                            )}
                            {course.clinicalCaveat === 'consult-provider' && (
                                <div className="flex items-start gap-2 pt-1">
                                    <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-xs text-blue-700 dark:text-blue-400 font-medium">Consult your provider before making significant changes based on this course.</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Dimension Score */}
                    {dimensionScore && dimensionScore.score !== null && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700/60">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                {dimensionScore.label}
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-3xl font-black text-gray-800 dark:text-gray-100">{Math.round(dimensionScore.score)}</span>
                                <span className="text-sm text-gray-400">/100</span>
                            </div>
                            {dimensionScore.tier && (
                                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-lg mb-3 ${
                                    dimensionScore.tier === 'thriving'
                                        ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10'
                                        : dimensionScore.tier === 'growing'
                                            ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
                                            : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10'
                                }`}>
                                    {getTierLabel(dimensionScore.tier)}
                                </span>
                            )}
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-2">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${
                                        dimensionScore.tier === 'thriving'
                                            ? 'bg-green-500'
                                            : dimensionScore.tier === 'growing'
                                                ? 'bg-amber-500'
                                                : 'bg-red-500'
                                    }`}
                                    style={{ width: `${dimensionScore.score}%` }}
                                />
                            </div>
                            <div className="text-xs text-gray-400">
                                Course level: <span className="font-semibold text-gray-500">{tier}</span>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
