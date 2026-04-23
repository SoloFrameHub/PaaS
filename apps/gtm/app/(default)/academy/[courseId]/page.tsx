import {
  getCourse,
  getAllCourses,
  getCourseDuration,
} from "@/lib/data/curriculum";
import { isContentPublished } from "@/lib/data/content-status";
import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  const courses = getAllCourses().filter((course) =>
    isContentPublished(course.id),
  );
  return courses.map((course) => ({
    courseId: course.id,
  }));
}

export default async function CoursePage(props: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await props.params;
  const course = getCourse(courseId);
  if (!course) notFound();

  // Short-circuit for courses without content
  if (!isContentPublished(courseId)) notFound();

  const { user, profile } = await getAuthContext();
  if (!user) redirect("/signin");
  if (!profile) redirect("/onboarding/welcome");

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== "active") redirect("/subscribe");

  const t = await getTranslations("academy");

  const isCompleted = profile.progress?.completedCourses?.includes(
    course.number,
  );
  const isCurrent = profile.progress?.currentCourse === course.number;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-primary-500 hover:text-primary-600 flex items-center gap-2 mb-4"
        >
          ← {t("backToDashboard")}
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {t("course")} {course.number}
              </span>
              {isCompleted && (
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                  {t("completed")}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-gray-100">
              {course.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/academy/${course.id}/${course.lessons[0].id}`}
              className="btn bg-primary-500 text-white hover:bg-primary-600 px-8 py-3 text-lg"
            >
              {isCurrent ? t("continueLearning") : t("startCourse")}
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-full xl:col-span-8">
          {/* Objectives / Outcomes */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700/60 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              {t("whatYoullMaster")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1.5 w-5 h-5 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      className="w-3 h-3 text-primary-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              {t("courseCurriculum")}
            </h2>
            {course.lessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                data-testid="lesson-link"
                href={`/academy/${course.id}/${lesson.id}`}
                className="group flex items-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 hover:border-primary-500 dark:hover:border-primary-500 transition-all shadow-sm"
              >
                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700/50 group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 rounded-xl flex items-center justify-center mr-4 transition-colors">
                  <span className="text-sm font-bold text-gray-400 group-hover:text-primary-500">
                    {idx + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500 transition-all">
                    {lesson.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {lesson.duration}
                  </span>
                </div>
                <div className="text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="col-span-full xl:col-span-4 space-y-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 text-center border border-gray-200 dark:border-gray-800">
            <div className="mb-4">
              <div className="text-3xl font-black text-gray-800 dark:text-gray-100">
                {course.lessons.length}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                {t("totalLessons")}
              </div>
            </div>
            <div className="h-px bg-gray-200 dark:bg-gray-800 w-1/2 mx-auto mb-4" />
            <div className="mb-4">
              <div className="text-3xl font-black text-gray-800 dark:text-gray-100">
                {getCourseDuration(course)}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                {t("estDuration")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
