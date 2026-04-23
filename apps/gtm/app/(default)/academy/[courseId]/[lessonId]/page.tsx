import {
  getCourse,
  getLesson,
  getTrackIdForCourse,
  getAllCourses,
} from "@/lib/data/curriculum";
import { getLessonContent } from "@/lib/lessons";
import { isContentPublished } from "@/lib/data/content-status";
import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import CompleteButton from "../../components/complete-button";
import LessonFeedback from "../../components/lesson-feedback";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import LessonQuiz from "@/app/(default)/academy/components/lesson-quiz";
import InteractiveCheckbox from "@/components/ui/interactive-checkbox";
import { mdxComponents } from "@/components/mdx";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  const courses = getAllCourses().filter((course) =>
    isContentPublished(course.id),
  );
  const params = courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      courseId: course.id,
      lessonId: lesson.id,
    })),
  );
  return params;
}

export default async function LessonPage(props: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await props.params;
  const course = getCourse(courseId);
  const lesson = getLesson(courseId, lessonId);
  const trackId = getTrackIdForCourse(courseId);

  if (!course || !lesson || !trackId) notFound();

  // Short-circuit for courses without content to avoid ENOENT errors
  if (!isContentPublished(courseId)) notFound();

  const { user, profile } = await getAuthContext();
  if (!user) redirect("/signin");
  if (!profile) redirect("/onboarding/welcome");

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== "active") redirect("/subscribe");

  const locale = await getLocale();
  const t = await getTranslations("academy");
  const lessonData = await getLessonContent(
    trackId,
    courseId,
    lessonId,
    locale,
  );
  if (!lessonData) notFound();

  const currentIndex = course.lessons.findIndex((l) => l.id === lessonId);
  if (currentIndex === -1) notFound();
  const nextLesson = course.lessons[currentIndex + 1];
  const prevLesson = course.lessons[currentIndex - 1];

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
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
            {t("lessons")}
          </h3>
        </div>
        <div className="space-y-1">
          {course.lessons.map((l, idx) => (
            <Link
              key={l.id}
              href={`/academy/${course.id}/${l.id}`}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${
                l.id === lessonId
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  l.id === lessonId
                    ? "bg-white/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                }`}
              >
                {idx + 1}
              </span>
              <span className="truncate">{l.title}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main
        data-testid="lesson-content"
        className="flex-1 px-4 lg:px-12 py-12 max-w-4xl mx-auto"
      >
        <div className="mb-12">
          <div className="flex items-center gap-2 text-primary-500 text-xs font-black uppercase tracking-widest mb-4">
            <span>
              {t("course")} {course.number}
            </span>
            <span className="text-gray-300">•</span>
            <span>
              {t("lesson")} {currentIndex + 1}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-800 dark:text-gray-100 mb-6 leading-tight">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {lesson.duration}
            </span>
          </div>
        </div>

        {/* Lesson Content Rendering */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-black prose-headings:tracking-tight 
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                    prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
                    prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-800 dark:prose-strong:text-gray-100
                    prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-500/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
                    prose-pre:bg-gray-900 prose-pre:rounded-2xl
                    prose-img:rounded-3xl prose-img:shadow-2xl
                "
        >
          <MDXRemote
            source={lessonData.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={{
              ...mdxComponents,
              li: (props: React.ComponentProps<"li">) => {
                const { children, ...rest } = props;

                // Type guard to check for MDX checkbox structure
                const isCheckbox = (
                  node: any,
                ): node is {
                  props: { type: "checkbox"; checked: boolean };
                } => {
                  return (
                    node &&
                    typeof node === "object" &&
                    node.props?.type === "checkbox"
                  );
                };

                const firstChild = Array.isArray(children)
                  ? children[0]
                  : children;

                if (isCheckbox(firstChild)) {
                  return (
                    <InteractiveCheckbox checked={firstChild.props.checked}>
                      {Array.isArray(children) ? children.slice(1) : null}
                    </InteractiveCheckbox>
                  );
                }
                return <li {...rest}>{children}</li>;
              },
            }}
          />
        </article>

        {/* Quiz Section */}
        <LessonQuiz
          sectionId={trackId}
          courseId={courseId}
          lessonId={lessonId}
        />

        {/* Lesson Feedback */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <LessonFeedback
            courseId={courseId}
            lessonId={lessonId}
            courseTitle={course.title}
            lessonTitle={lesson.title}
          />
        </div>

        {/* Lesson Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between">
          {prevLesson ? (
            <Link
              href={`/academy/${course.id}/${prevLesson.id}`}
              className="flex flex-col p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-500 transition-all text-left group"
            >
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                {t("prevLesson")}
              </span>
              <span className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500">
                {prevLesson.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <CompleteButton
              courseId={course.id}
              courseNumber={course.number}
              lessonId={lesson.id}
              nextLessonId={nextLesson.id}
            />
          ) : (
            <CompleteButton
              courseId={course.id}
              courseNumber={course.number}
              lessonId={lesson.id}
            />
          )}
        </div>
      </main>
    </div>
  );
}
