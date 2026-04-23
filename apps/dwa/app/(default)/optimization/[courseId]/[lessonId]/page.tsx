import { getOptimizationCourse, getOptimizationLesson, getOptimizationTrackIdForCourse, getAllOptimizationCourses } from '@/lib/data/optimization-curriculum';
import { getLessonContent } from '@/lib/lessons';
import { getAuthContext } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import CompleteButton from '../../../academy/components/complete-button';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import InteractiveBreathingExercise from '@/app/(default)/academy/components/interactive-breathing';
import Checkin from '@/app/(default)/academy/components/checkin';
import Callout from '@/app/(default)/academy/components/callout';
import { InsightGrid, InsightItem } from '@/app/(default)/academy/components/insight-grid';
import { StepByStep, Step } from '@/app/(default)/academy/components/step-by-step';
import EnhancedAccordion, { AccordionItem } from '@/app/(default)/academy/components/enhanced-accordion';
import { SlideNavigation, Slide } from '@/app/(default)/academy/components/slide-navigation';
import InteractiveScenario, { Choice } from '@/app/(default)/academy/components/interactive-scenario';
import BodyMap from '@/app/(default)/academy/components/body-map';
import LessonQuiz from '@/app/(default)/academy/components/lesson-quiz';
import LessonFeedback from '@/app/(default)/academy/components/lesson-feedback';

export async function generateStaticParams() {
    const courses = getAllOptimizationCourses();
    const params = courses.flatMap(course =>
        course.lessons.map(lesson => ({
            courseId: course.id,
            lessonId: lesson.id
        }))
    );
    return params;
}

export default async function OptimizationLessonPage(props: {
    params: Promise<{ courseId: string; lessonId: string }>
}) {
    const { courseId, lessonId } = await props.params;
    const course = getOptimizationCourse(courseId);
    const lesson = getOptimizationLesson(courseId, lessonId);
    const trackId = getOptimizationTrackIdForCourse(courseId);

    if (!course || !lesson || !trackId) notFound();

    const { user, profile } = await getAuthContext();
    // TEMP: Skip auth for testing
    // if (!user) redirect('/signin');
    // if (!profile) redirect('/onboarding/welcome');

    // Get lesson content from filesystem (server/data/content/optimization/{trackId}/{courseId}/lesson-{lessonId}.md)
    const lessonData = await getLessonContent(`optimization/${trackId}`, courseId, lessonId);
    if (!lessonData) notFound();

    const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
    const nextLesson = currentIndex >= 0 ? course.lessons[currentIndex + 1] ?? null : null;
    const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] ?? null : null;

    // Check if lesson is completed
    const completedLessons = profile?.progress?.completedLessons?.[courseId] ?? [];
    const isCompleted = completedLessons.includes(lessonId);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
            {/* Lesson Sidebar (Navigation) */}
            <aside className="lg:w-80 border-r border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/50 p-6 hidden lg:block overflow-y-auto max-h-[calc(100vh-64px)] sticky top-16">
                <div className="mb-6">
                    <Link
                        href={`/optimization/${course.id}`}
                        className="text-sm font-bold text-gray-400 hover:text-primary-500 flex items-center gap-2 mb-4"
                    >
                        ← {course.title}
                    </Link>
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Lessons
                    </h2>
                    <nav className="space-y-1.5">
                        {course.lessons.map((l) => {
                            const isCurrentLesson = l.id === lessonId;
                            const isLessonCompleted = completedLessons.includes(l.id);
                            return (
                                <Link
                                    key={l.id}
                                    href={`/optimization/${courseId}/${l.id}`}
                                    className={`block px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${isCurrentLesson
                                        ? 'bg-primary-500 text-white shadow-sm'
                                        : isLessonCompleted
                                            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/50'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium">Lesson {l.id}</span>
                                        {isLessonCompleted && !isCurrentLesson && (
                                            <span className="text-xs">✓</span>
                                        )}
                                    </div>
                                    <div className="text-xs opacity-80 line-clamp-2">{l.title}</div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <article className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                                Lesson {lesson.id} of {course.lessons.length}
                            </span>
                            {lesson.duration && (
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {lesson.duration}
                                </span>
                            )}
                            {isCompleted && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Completed
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
                            {lesson.title}
                        </h1>
                    </header>

                    {/* MDX Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-50
                        prose-p:text-gray-700 dark:prose-p:text-gray-300
                        prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                        prose-ul:text-gray-700 dark:prose-ul:text-gray-300
                        prose-ol:text-gray-700 dark:prose-ol:text-gray-300
                        prose-blockquote:border-primary-500 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                        prose-code:text-primary-600 dark:prose-code:text-primary-400
                        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950
                        prose-img:rounded-xl prose-img:shadow-lg
                    ">
                        <MDXRemote
                            source={lessonData.content}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm]
                                }
                            }}
                            components={{
                                InteractiveBreathingExercise,
                                Checkin,
                                Callout,
                                InsightGrid,
                                InsightItem,
                                StepByStep,
                                Step,
                                EnhancedAccordion,
                                AccordionItem,
                                SlideNavigation,
                                Slide,
                                InteractiveScenario,
                                Choice,
                                BodyMap,
                            }}
                        />
                    </div>

                    {/* Quiz Section */}
                    <LessonQuiz sectionId={trackId} courseId={courseId} lessonId={lessonId} />

                    {/* Lesson Feedback */}
                    <LessonFeedback courseId={courseId} lessonId={lessonId} lessonTitle={lesson.title} />

                    {/* Footer Navigation */}
                    <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            {/* Previous Lesson */}
                            <div className="flex-1 w-full">
                                {prevLesson ? (
                                    <Link
                                        href={`/optimization/${courseId}/${prevLesson.id}`}
                                        className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all"
                                    >
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <div className="text-left">
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous</div>
                                            <div className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                                                {prevLesson.title}
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="h-full" />
                                )}
                            </div>

                            {/* Complete Button */}
                            <div className="flex-shrink-0">
                                <CompleteButton
                                    courseId={courseId}
                                    lessonId={lessonId}
                                    nextLessonId={nextLesson?.id}
                                />
                            </div>

                            {/* Next Lesson */}
                            <div className="flex-1 w-full">
                                {nextLesson ? (
                                    <Link
                                        href={`/optimization/${courseId}/${nextLesson.id}`}
                                        className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all justify-end"
                                    >
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next</div>
                                            <div className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                                                {nextLesson.title}
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <Link
                                        href={`/optimization/${courseId}`}
                                        className="group flex items-center gap-3 p-4 rounded-xl border border-emerald-200 dark:border-emerald-700 hover:border-emerald-500 dark:hover:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 transition-all justify-end"
                                    >
                                        <div className="text-right">
                                            <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">Course Complete!</div>
                                            <div className="font-medium text-emerald-700 dark:text-emerald-300">
                                                Return to Course
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}
