import { getAuthContext } from '@/lib/auth';
import { getAllCourses } from '@/lib/data/curriculum';
import { getMatchingSymptomsForCourse } from '@/lib/utils/personalization';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LearningPathTimeline, { type PathCourse } from '@/components/ui/learning-path-timeline';
import { SYMPTOM_COURSE_MAPPING } from '@/types/wellness-profile';

/** Capitalize a symptom slug for display */
function formatSymptom(s: string): string {
    return s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}



export const metadata = {
    title: 'My Learning Path - Wellness Academy',
    description: 'Your personalized learning path based on your wellness profile',
};

export default async function MyPathPage() {
    const { user, profile } = await getAuthContext();

    if (!user) redirect('/signin');
    if (!profile) redirect('/onboarding/welcome');

    const completedCourses = new Set(profile.progress?.completedCourses ?? []);
    const currentCourse = profile.progress?.currentCourse ?? null;
    const completedLessonsMap = profile.progress?.completedLessons ?? {};
    const userSymptoms = (profile.questionnaire?.primarySymptoms ?? []).map(s => s.category);
    const primarySymptom = profile.questionnaire?.primarySymptoms?.find(s => s.isPrimary);
    const allCourses = getAllCourses();

    // Use stored recommendations, pad with on-the-fly scoring if fewer than 5
    let recommendedCourseIds = profile.assessment?.recommendedCourses ?? [];
    if (recommendedCourseIds.length < 5) {
        const existing = new Set(recommendedCourseIds);
        const courseScores: Record<string, number> = {};
        if (userSymptoms.length > 0) {
            for (const symptom of profile.questionnaire?.primarySymptoms ?? []) {
                const courses = SYMPTOM_COURSE_MAPPING[symptom.category] ?? SYMPTOM_COURSE_MAPPING['other'];
                const sevMul = symptom.severity === 'severe' ? 3 : symptom.severity === 'moderate' ? 2 : 1;
                const priMul = symptom.isPrimary ? 2 : 1;
                for (const c of courses) if (!existing.has(c)) courseScores[c] = (courseScores[c] || 0) + sevMul * priMul;
            }
        } else {
            // Fallback: use priorityFocus categories stored during onboarding
            const focusCategories = profile.assessment?.priorityFocus ?? [];
            for (const category of (focusCategories.length > 0 ? focusCategories : ['other' as const])) {
                const courses = SYMPTOM_COURSE_MAPPING[category] ?? SYMPTOM_COURSE_MAPPING['other'];
                for (const c of courses) if (!existing.has(c)) courseScores[c] = (courseScores[c] || 0) + 2;
            }
        }
        if (Object.keys(courseScores).length > 0) {
            const additional = Object.entries(courseScores)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5 - recommendedCourseIds.length)
                .map(([id]) => id);
            recommendedCourseIds = [...recommendedCourseIds, ...additional];
        }
    }

    // Build path courses from recommended list
    const pathCourses: PathCourse[] = recommendedCourseIds
        .map(id => {
            const course = allCourses.find(c => c.id === id);
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
                isCurrent: course.id === currentCourse,
            };
        })
        .filter(Boolean) as PathCourse[];

    const completedCount = pathCourses.filter(c => c.isCompleted).length;
    // If no path exists, show CTA to complete onboarding
    if (pathCourses.length === 0) {
        return (
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-3xl mx-auto">
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">No Learning Path Yet</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        Complete the wellness assessment to get a personalized learning path based on your needs.
                    </p>
                    <Link
                        href="/onboarding/symptoms"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition"
                    >
                        Start Assessment
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-violet-500 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            My Learning Path
                        </h1>
                    </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
                    Your personalized journey based on your wellness profile. Each course is selected to
                    address your specific needs and builds on the skills from previous courses.
                </p>
            </div>

            {/* Progress Banner */}
            <div className="bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl p-6 mb-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium opacity-90 mb-1">Path Progress</div>
                        <div className="text-3xl font-bold">{completedCount} / {pathCourses.length} courses</div>
                    </div>
                    {primarySymptom && (
                        <div className="text-right">
                            <div className="text-sm font-medium opacity-90 mb-1">Primary Focus</div>
                            <div className="text-lg font-bold">{formatSymptom(primarySymptom.category)}</div>
                        </div>
                    )}
                </div>
                <div
                    className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={completedCount}
                    aria-valuemin={0}
                    aria-valuemax={pathCourses.length}
                    aria-label="Learning path progress"
                >
                    <div
                        className="h-full bg-white rounded-full transition-all duration-1000"
                        style={{ width: `${pathCourses.length > 0 ? (completedCount / pathCourses.length) * 100 : 0}%` }}
                    />
                </div>
            </div>

            {/* Learning Path Timeline */}
            <div className="mb-8">
                <LearningPathTimeline
                    courses={pathCourses}
                    variant="full"
                    showLinks
                />
            </div>

            {/* Browse Full Catalog */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Want to explore more?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Browse all {allCourses.length} courses across every wellness track in the full Academy catalog.
                </p>
                <Link
                    href="/academy"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition"
                >
                    Browse Full Academy
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
