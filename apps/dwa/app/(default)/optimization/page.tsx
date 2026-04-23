import { OPTIMIZATION_CURRICULUM } from '@/lib/data/optimization-curriculum';
import { getAuthContext } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Optimization School - Five Pillars of Human Performance',
    description: 'Evidence-based courses for peak performance, resilience, and wellbeing',
}

export default async function OptimizationSchoolPage() {
    const { user, profile } = await getAuthContext();

    // TEMP: Skip auth for testing
    // if (!user) {
    //     redirect('/signin');
    // }

    // if (!profile) {
    //     redirect('/onboarding/welcome');
    // }

    const completedLessons: Record<string, string[]> = profile?.progress?.completedLessons || {};

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <main className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
                {/* Header */}
                <header className="mb-16 text-center">
                    <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                        Optimization School
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Evidence-based education for peak performance, resilience, and human optimization.
                        The Five Pillars approach to building your best life.
                    </p>
                </header>

                {/* Tracks/Pillars */}
                <div className="space-y-16">
                    {OPTIMIZATION_CURRICULUM.map((track) => (
                        <section key={track.id} className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                                    {track.title}
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    {track.description}
                                </p>
                            </div>

                            {/* Courses in this pillar */}
                            <div className="grid gap-6 md:grid-cols-2">
                                {track.courses.length > 0 ? (
                                    track.courses.map((course) => {
                                        const completed = completedLessons[course.id]?.length ?? 0;
                                        const total = course.lessons.length;
                                        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

                                        return (
                                            <Link
                                                key={course.id}
                                                href={`/optimization/${course.id}`}
                                                className="block p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all bg-white dark:bg-gray-900 hover:shadow-lg group"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                        {course.title}
                                                    </h3>
                                                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-bold flex-shrink-0">
                                                        {course.number}
                                                    </span>
                                                </div>

                                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                                    {course.description}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {course.lessons.length} lessons
                                                    </span>
                                                    {course.duration && (
                                                        <>
                                                            <span className="text-gray-300 dark:text-gray-600">•</span>
                                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                {course.duration}
                                                            </span>
                                                        </>
                                                    )}
                                                    {course.evidenceBadge && (
                                                        <>
                                                            <span className="text-gray-300 dark:text-gray-600">•</span>
                                                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                                                {course.evidenceBadge}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Progress Bar */}
                                                {completionRate > 0 && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                Progress
                                                            </span>
                                                            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                                                                {completionRate}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all"
                                                                style={{ width: `${completionRate}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-2 p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-center">
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Courses coming soon for this pillar
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
}
