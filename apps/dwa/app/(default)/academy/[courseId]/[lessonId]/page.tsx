import { getCourse, getLesson, getTrackIdForCourse, getAllCourses } from '@/lib/data/curriculum';
import { getLessonContent } from '@/lib/lessons';
import { getAuthContext } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getNextCourseSuggestion } from '@/lib/utils/personalization';
import { computeDimensionScores } from '@/lib/utils/wellness-scores';
import CompleteButton from '../../components/complete-button';
import { getLessonEngagement } from '@/lib/utils/lesson-engagement';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import LessonQuiz from '@/app/(default)/academy/components/lesson-quiz';
import LikertAssessment from '@/app/(default)/academy/components/likert-assessment';
import TrackingLog from '@/app/(default)/academy/components/tracking-log';
import ThoughtRecord from '@/app/(default)/academy/components/thought-record';
import Checklist from '@/app/(default)/academy/components/checklist';
import EngagementSummary from '@/app/(default)/academy/components/engagement-summary';
import InteractiveCheckbox from '@/components/ui/interactive-checkbox';
import { BoxBreathingDiagram, CBTTriangleDiagram, ThoughtFlowDiagram } from '@/app/(default)/academy/components/lesson-diagrams';
import InteractiveBreathingExercise from '@/app/(default)/academy/components/interactive-breathing';
import ExposureHierarchyBuilder from '@/app/(default)/academy/components/exposure-hierarchy';
import CopingStrategyRanker from '@/app/(default)/academy/components/coping-strategy-ranker-dynamic';
import MindfulnessTimer from '@/app/(default)/academy/components/mindfulness-timer';
import Checkin from '@/app/(default)/academy/components/checkin';
import ExposureLog from '@/app/(default)/academy/components/exposure-log';
import ExposurePlanWorksheet from '@/app/(default)/academy/components/exposure-plan-worksheet';
import Callout from '@/app/(default)/academy/components/callout';
import { InsightGrid, InsightItem } from '@/app/(default)/academy/components/insight-grid';
import { StepByStep, Step } from '@/app/(default)/academy/components/step-by-step';
import ScenarioCard from '@/app/(default)/academy/components/scenario-card';
import FlipCard from '@/app/(default)/academy/components/flip-card';
import EnhancedAccordion, { AccordionItem } from '@/app/(default)/academy/components/enhanced-accordion';
import { SlideNavigation, Slide } from '@/app/(default)/academy/components/slide-navigation';
import InteractiveScenario, { Choice } from '@/app/(default)/academy/components/interactive-scenario';
import BodyMap from '@/app/(default)/academy/components/body-map';
import GuidedGrounding from '@/app/(default)/academy/components/guided-grounding';
import ToolkitCard from '@/app/(default)/academy/components/toolkit-card';
import LessonFeedback from '../../components/lesson-feedback';

export async function generateStaticParams() {
    const courses = getAllCourses();
    const params = courses.flatMap(course =>
        course.lessons.map(lesson => ({
            courseId: course.id,
            lessonId: lesson.id
        }))
    );
    return params;
}

export default async function LessonPage(props: {
    params: Promise<{ courseId: string; lessonId: string }>
}) {
    const { courseId, lessonId } = await props.params;
    const course = getCourse(courseId);
    const lesson = getLesson(courseId, lessonId);
    const trackId = getTrackIdForCourse(courseId);

    if (!course || !lesson || !trackId) notFound();

    const { user, profile } = await getAuthContext();
    if (!user) redirect('/signin');
    if (!profile) redirect('/onboarding/welcome');

    const lessonData = await getLessonContent(trackId, courseId, lessonId);
    if (!lessonData) notFound();

    const currentIndex = course.lessons.findIndex(l => l.id === lessonId);
    const nextLesson = currentIndex >= 0 ? course.lessons[currentIndex + 1] ?? null : null;
    const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] ?? null : null;

    let engagement: ReturnType<typeof getLessonEngagement> | null = null;
    try {
        engagement = getLessonEngagement(trackId, courseId, lessonId, profile);
    } catch (e) {
        console.error('[Lesson] Engagement check failed:', e);
    }

    let nextCourseSuggestion: ReturnType<typeof getNextCourseSuggestion> = null;
    if (!nextLesson) {
        try {
            const scores = computeDimensionScores(profile);
            nextCourseSuggestion = getNextCourseSuggestion(courseId, profile, scores);
        } catch (e) {
            console.error('[Lesson] Next course suggestion failed:', e);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
            {/* Removed FounderContextPanel */}

            {/* Lesson Sidebar (Navigation) */}
            <aside className="lg:w-80 border-r border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/50 p-6 hidden lg:block overflow-y-auto max-h-[calc(100vh-64px)] sticky top-16">
                <div className="mb-6">
                    <Link
                        href={`/academy/${course.id}`}
                        className="text-sm font-bold text-gray-400 hover:text-primary-500 flex items-center gap-2 mb-4"
                    >
                        ← {course.title}
                    </Link>
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Lessons</h3>
                </div>
                <div className="space-y-1">
                    {course.lessons.map((l, idx) => (
                        <Link
                            key={l.id}
                            href={`/academy/${course.id}/${l.id}`}
                            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${l.id === lessonId
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${l.id === lessonId ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                                }`}>
                                {idx + 1}
                            </span>
                            <span className="truncate">{l.title}</span>
                        </Link>
                    ))}
                </div>
            </aside>

            {/* Main Content Area */}
            <main data-testid="lesson-content" className="flex-1 px-4 sm:px-8 lg:px-12 py-6 sm:py-12 max-w-4xl mx-auto">
                <div className="mb-8 sm:mb-12">
                    <div className="flex items-center gap-2 text-primary-500 text-xs font-black uppercase tracking-widest mb-4">
                        <span>Course {course.number}</span>
                        <span className="text-gray-300">•</span>
                        <span>Lesson {currentIndex + 1}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
                        {lesson.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {lesson.duration}
                        </span>
                    </div>
                </div>

                {/* Lesson Content Rendering */}
                <article
                    className="prose prose-base sm:prose-lg dark:prose-invert max-w-none
                    prose-headings:font-black prose-headings:tracking-tight
                    prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 sm:prose-h2:mt-12 prose-h2:mb-4 sm:prose-h2:mb-6
                    prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
                    prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-800 dark:prose-strong:text-gray-100
                    prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
                    prose-pre:bg-gray-900 prose-pre:rounded-2xl
                    prose-img:rounded-3xl prose-img:shadow-2xl
                ">
                    <MDXRemote
                        source={lessonData.content}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                            }
                        }}
                        components={{
                            BoxBreathingDiagram,
                            CBTTriangleDiagram,
                            ThoughtFlowDiagram,
                            InteractiveBreathingExercise,
                            ExposureHierarchyBuilder,
                            CopingStrategyRanker,
                            MindfulnessTimer,
                            Checkin,
                            ExposureLog,
                            ExposurePlanWorksheet,
                            Callout,
                            InsightGrid,
                            InsightItem,
                            StepByStep,
                            Step,
                            ScenarioCard,
                            FlipCard,
                            EnhancedAccordion,
                            AccordionItem,
                            SlideNavigation,
                            Slide,
                            InteractiveScenario,
                            Choice,
                            BodyMap,
                            GuidedGrounding,
                            ToolkitCard,
                            // MDX-compatible wrappers for components that are also rendered outside MDX with different props
                            ThoughtRecord: ({ situation, thought }: { situation?: string; thought?: string }) => (
                                situation || thought ? (
                                    <div className="not-prose my-6 p-5 rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                                        <div className="flex items-center gap-2 mb-3">
                                            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                                            <h4 className="font-bold text-blue-800 dark:text-blue-200 text-base">{situation || 'Thought Record'}</h4>
                                        </div>
                                        {thought && <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{thought}</p>}
                                    </div>
                                ) : null
                            ),
                            Checklist: ({ title, items }: { title?: string; items?: string[] }) => (
                                title || items ? (
                                    <div className="not-prose my-6 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20">
                                        {title && <h4 className="font-bold text-emerald-800 dark:text-emerald-200 text-base mb-3">{title}</h4>}
                                        {items && items.length > 0 && (
                                            <ul className="space-y-2">
                                                {items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <span className="mt-0.5 w-4 h-4 rounded border border-emerald-300 dark:border-emerald-700 flex-shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ) : null
                            ),
                            TrackingLog: ({ category, fields }: { category?: string; fields?: string[] }) => (
                                category || fields ? (
                                    <div className="not-prose my-6 p-5 rounded-2xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20">
                                        {category && <h4 className="font-bold text-purple-800 dark:text-purple-200 text-base mb-3">{category}</h4>}
                                        {fields && fields.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {fields.map((field, i) => (
                                                    <span key={i} className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">{field}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : null
                            ),
                            li: (props: React.ComponentProps<'li'>) => {
                                const { children, ...rest } = props;

                                // Type guard to check for MDX checkbox structure
                                const isCheckbox = (node: any): node is { props: { type: 'checkbox'; checked: boolean } } => {
                                    return node && typeof node === 'object' && node.props?.type === 'checkbox';
                                };

                                const firstChild = Array.isArray(children) ? children[0] : children;

                                if (isCheckbox(firstChild)) {
                                    return (
                                        <InteractiveCheckbox checked={firstChild.props.checked}>
                                            {Array.isArray(children) ? children.slice(1) : null}
                                        </InteractiveCheckbox>
                                    );
                                }
                                return <li {...rest}>{children}</li>;
                            }
                        }}
                    />
                </article>

                {/* Self-Assessment (if mapped to this lesson) */}
                <LikertAssessment courseId={courseId} lessonId={lessonId} />

                {/* Tracking Log (if mapped to this lesson) */}
                <TrackingLog courseId={courseId} lessonId={lessonId} />

                {/* Thought Record (if mapped to this lesson) */}
                <ThoughtRecord courseId={courseId} lessonId={lessonId} />

                {/* Checklist (if mapped to this lesson) */}
                <Checklist courseId={courseId} lessonId={lessonId} />

                {/* Quiz Section */}
                <LessonQuiz sectionId={trackId} courseId={courseId} lessonId={lessonId} />

                {/* Lesson Feedback */}
                <LessonFeedback courseId={courseId} lessonId={lessonId} lessonTitle={lesson.title} />

                {/* Engagement Summary — client component that updates when exercises are completed */}
                {engagement && engagement.totalAvailable > 0 && (
                    <EngagementSummary available={engagement.available} completed={engagement.completed} />
                )}

                {/* Lesson Footer Navigation */}
                <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between">
                    {prevLesson ? (
                        <Link
                            href={`/academy/${course.id}/${prevLesson.id}`}
                            className="flex flex-col p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-500 transition-all text-left group"
                        >
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Previous Lesson</span>
                            <span className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500">{prevLesson.title}</span>
                        </Link>
                    ) : <div />}

                    {nextLesson ? (
                        <CompleteButton
                            courseId={course.id}
                            lessonId={lesson.id}
                            nextLessonId={nextLesson.id}
                        />
                    ) : (
                        <div className="flex flex-col items-end gap-4">
                            {nextCourseSuggestion && (
                                <div className="bg-violet-50 dark:bg-violet-500/10 rounded-2xl p-4 border border-violet-100 dark:border-violet-500/20 text-left w-full sm:max-w-sm">
                                    <p className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-1">Up Next After This Course</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{nextCourseSuggestion.reason}</p>
                                    <Link
                                        href={`/academy/${nextCourseSuggestion.courseId}`}
                                        className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                                    >
                                        {nextCourseSuggestion.title} →
                                    </Link>
                                </div>
                            )}
                            <CompleteButton
                                courseId={course.id}
                                lessonId={lesson.id}
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

