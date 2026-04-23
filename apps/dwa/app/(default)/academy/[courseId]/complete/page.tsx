import { getCourse } from '@/lib/data/curriculum';
import { getAuthContext } from '@/lib/auth';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { computeDimensionScores } from '@/lib/utils/wellness-scores';
import { getNextCourseSuggestion } from '@/lib/utils/personalization';

export default async function CourseCompletePage(props: {
    params: Promise<{ courseId: string }>
}) {
    const { courseId } = await props.params;
    const course = getCourse(courseId);
    if (!course) notFound();

    const { user, profile } = await getAuthContext();
    if (!user) redirect('/signin');
    if (!profile) redirect('/onboarding/welcome');

    let nextSuggestion: ReturnType<typeof getNextCourseSuggestion> = null;
    try {
        const scores = computeDimensionScores(profile);
        nextSuggestion = getNextCourseSuggestion(courseId, profile, scores);
    } catch (e) {
        console.error('[CourseComplete] Personalization error:', e);
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-12 w-full max-w-3xl mx-auto text-center">
            {/* Celebration Header */}
            <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-gray-100 mb-3">
                    Course Complete!
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                    You&apos;ve finished <span className="font-semibold text-gray-700 dark:text-gray-300">{course.title}</span>. The techniques you&apos;ve learned are real tools you can use every day.
                </p>
            </div>

            {/* What's Next */}
            {nextSuggestion && (
                <div className="bg-violet-50 dark:bg-violet-500/10 rounded-2xl p-6 border border-violet-100 dark:border-violet-500/20 mb-6 text-left">
                    <h2 className="text-sm font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-2">What&apos;s Next</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{nextSuggestion.reason}</p>
                    <Link
                        href={`/academy/${nextSuggestion.courseId}`}
                        className="inline-flex items-center gap-2 btn bg-violet-500 text-white hover:bg-violet-600 px-6 py-2.5"
                    >
                        {nextSuggestion.title}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            )}

            {/* Fallback Links */}
            <div className="flex items-center justify-center gap-4">
                <Link
                    href="/dashboard"
                    className="btn bg-primary-500 text-white hover:bg-primary-600 px-6 py-2.5"
                >
                    Back to Dashboard
                </Link>
                <Link
                    href="/academy"
                    className="btn border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30 px-6 py-2.5"
                >
                    Browse All Courses
                </Link>
            </div>
        </div>
    );
}
