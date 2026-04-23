import { getOptimizationCourse } from '@/lib/data/optimization-curriculum';
import { getAuthContext } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

export default async function OptimizationCoursePage(props: {
    params: Promise<{ courseId: string }>
}) {
    const { courseId } = await props.params;
    const course = getOptimizationCourse(courseId);

    if (!course) notFound();

    const { user, profile } = await getAuthContext();
    // TEMP: Skip auth for testing
    // if (!user) redirect('/signin');
    // if (!profile) redirect('/onboarding/welcome');

    const completedLessons = profile?.progress?.completedLessons?.[courseId] ?? [];
    const completionRate = course.lessons.length > 0
        ? Math.round((completedLessons.length / course.lessons.length) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <main className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
                {/* Header */}
                <header className="mb-12">
                    <Link
                        href="/optimization"
                        className="text-sm font-medium text-gray-500 hover:text-primary-500 mb-4 inline-flex items-center gap-2"
                    >
                        ← Back to Optimization School
                    </Link>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4 mt-6">
                        {course.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        {course.description}
                    </p>

                    {/* Course Metadata */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                            {course.lessons.length} Lessons
                        </span>
                        {course.duration && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                {course.duration}
                            </span>
                        )}
                        {course.evidenceBadge && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                                {course.evidenceBadge}
                            </span>
                        )}
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            {completionRate}% Complete
                        </span>
                    </div>
                </header>

                {/* Learning Outcomes */}
                {course.outcomes && course.outcomes.length > 0 && (
                    <div className="mb-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                            What You'll Learn
                        </h2>
                        <ul className="space-y-2">
                            {course.outcomes.map((outcome, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Lessons List */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                        Course Lessons
                    </h2>
                    <div className="space-y-3">
                        {course.lessons.map((lesson) => {
                            const isCompleted = completedLessons.includes(lesson.id);
                            return (
                                <Link
                                    key={lesson.id}
                                    href={`/optimization/${courseId}/${lesson.id}`}
                                    className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all bg-white dark:bg-gray-900 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-bold">
                                                    {lesson.id}
                                                </span>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                                                    {lesson.title}
                                                </h3>
                                            </div>
                                            {lesson.duration && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 ml-11">
                                                    {lesson.duration}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex-shrink-0">
                                            {isCompleted ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Completed
                                                </span>
                                            ) : (
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Continue/Start Button */}
                <div className="mt-12">
                    {completedLessons.length > 0 && completedLessons.length < course.lessons.length ? (
                        <Link
                            href={`/optimization/${courseId}/${course.lessons.find(l => !completedLessons.includes(l.id))?.id ?? '1'}`}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                        >
                            Continue Course
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    ) : completedLessons.length === course.lessons.length ? (
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Course Complete!
                            </span>
                            <Link
                                href={`/optimization/${courseId}/1`}
                                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                            >
                                Review lessons
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href={`/optimization/${courseId}/1`}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                        >
                            Start Course
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    )}
                </div>
            </main>
        </div>
    );
}
