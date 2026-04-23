import { getAuthContext, getSubscriptionStatus } from "@/lib/auth";
import { getLocale } from "next-intl/server";
import { CURRICULUM, getCourseDuration } from "@/lib/data/curriculum";
import {
  getAllQuickWinLessons,
  getQuickWinPath,
  QUICK_WIN_MAP,
} from "@/lib/data/quick-win";
import { unlockService } from "@/lib/services/unlockService";
import { getContentStatus } from "@/lib/data/content-status";
import { getLevelProgress } from "@/lib/data/xp-levels";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Courses - SoloFrameHub",
  description: "Browse all courses in the Solo GTM OS",
};

export default async function AcademyPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { user, profile } = await getAuthContext();
  const locale = await getLocale();
  const isEs = locale === "es";

  if (!user) {
    redirect("/signin");
  }

  if (!profile) {
    redirect("/onboarding/welcome");
  }

  const subStatus = await getSubscriptionStatus(user.uid);
  if (subStatus !== "active") {
    redirect("/subscribe");
  }

  const completedCourses = profile.progress?.completedCourses || [];
  const completedLessonCount = Object.keys(
    profile.progress?.completedLessons || {},
  ).length;
  const totalCourses = CURRICULUM.flatMap((t) => t.courses).length;
  const unlockedCourses = unlockService.getUnlockedCourses(profile);
  const recommendedCourses = new Set(
    unlockService.getRecommendedCourses(profile),
  );
  const xp = profile.progress?.xpTotal || 0;
  const levelInfo = getLevelProgress(xp);

  // Mode: default to quick-wins for brand-new users, full-os for returning users
  const params = await searchParams;
  const isNewUser = completedLessonCount === 0;
  const mode = params.mode ?? (isNewUser ? "quick-wins" : "full-os");
  const isQuickWinMode = mode === "quick-wins";

  // Quick win course set (for track/course filtering)
  const quickWinCoursesIds = new Set(
    getAllQuickWinLessons().map((l) => l.courseId),
  );

  // First quick-win lesson for the "Start here" CTA
  const firstQuickWin = isNewUser
    ? getQuickWinPath(
        (profile.assessment?.scores as unknown as Record<string, number>) ||
          Object.fromEntries(Object.keys(QUICK_WIN_MAP).map((k) => [k, 50])),
      )[0]
    : null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {isEs ? "Cursos" : "Courses"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
            {isEs ? (
              <>Tu hub de aprendizaje personalizado. Los cursos se desbloquean según tus resultados de evaluación. Busca los badges{" "}<span className="text-primary-500 font-semibold">Recomendado</span>{" "}— esos abordan tus áreas de mejora.</>
            ) : (
              <>Your personalized learning hub. Courses are unlocked based on your assessment results and progress. Look for{" "}<span className="text-primary-500 font-semibold">Recommended</span>{" "}badges — those target your specific gaps.</>
            )}
          </p>
        </div>
        {/* Mode toggle */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shrink-0">
          <Link
            href="/academy?mode=quick-wins"
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              isQuickWinMode
                ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {isEs ? "Victorias rápidas" : "Quick Wins"}
          </Link>
          <Link
            href="/academy?mode=full-os"
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              !isQuickWinMode
                ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {isEs ? "OS completo" : "Full OS"}
          </Link>
        </div>
      </div>

      {/* Start here CTA for new users */}
      {isNewUser && firstQuickWin && (
        <div className="bg-gradient-to-r from-indigo-600 to-primary-600 rounded-2xl p-6 mb-8 text-white flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">
              {isEs ? "¿Eres nuevo? Empieza en 30 minutos" : "New here? Start in 30 minutes"}
            </p>
            <h2 className="text-xl font-bold">{firstQuickWin.title}</h2>
            <p className="text-sm text-indigo-200 mt-1">{firstQuickWin.why}</p>
          </div>
          <Link
            href={`/academy/${firstQuickWin.courseId}/${firstQuickWin.lessonId}`}
            className="shrink-0 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition"
          >
            {isEs ? "Empezar aquí →" : "Start here →"}
          </Link>
        </div>
      )}

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-primary-500 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium opacity-90 mb-1">
              {isEs ? "Tu progreso" : "Your Progress"}
            </div>
            <div className="text-3xl font-bold">
              {completedCourses.length} / {totalCourses} {isEs ? "Cursos" : "Courses"}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm font-medium opacity-90 mb-1">
                Level {levelInfo.current.level}
              </div>
              <div className="text-xl font-bold">{levelInfo.current.title}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium opacity-90 mb-1">
                {isEs ? "XP total" : "Total XP"}
              </div>
              <div className="text-3xl font-bold">{xp}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-1000"
            style={{
              width: `${(completedCourses.length / totalCourses) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Tracks and Courses */}
      <div className="space-y-8">
        {CURRICULUM.filter((track) =>
          isQuickWinMode
            ? track.courses.some((c) => quickWinCoursesIds.has(c.id))
            : true,
        ).map((track) => (
          <div
            key={track.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/60 overflow-hidden"
          >
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
                    {track.courses.length} {isEs ? "Cursos" : "Courses"}
                  </span>
                </div>
              </div>
            </div>

            {/* Course List */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700/60">
              {track.courses
                .filter((c) =>
                  isQuickWinMode ? quickWinCoursesIds.has(c.id) : true,
                )
                .map((course) => {
                  const isCompleted = completedCourses.includes(course.number);
                  const isUnlocked = unlockedCourses.has(course.number);
                  const isRecommended = recommendedCourses.has(course.number);
                  const isCurrent =
                    course.number === (profile.progress?.currentCourse || 0);
                  const contentStatus = getContentStatus(course.id);
                  const isComingSoon = contentStatus === "coming-soon";
                  const isLocked = !isUnlocked && !isCompleted;
                  const isAccessible =
                    (isUnlocked || isCompleted) && !isComingSoon;

                  return (
                    <div
                      key={course.id}
                      data-testid="course-card"
                      className={`p-6 transition-colors ${
                        isLocked || isComingSoon
                          ? "opacity-50"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700/20"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Course Number Badge */}
                        <div
                          className={`
                                                w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg
                                                ${
                                                  isCompleted
                                                    ? "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400"
                                                    : isCurrent
                                                      ? "bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400"
                                                      : isComingSoon
                                                        ? "bg-purple-100 dark:bg-purple-500/20 text-purple-400 dark:text-purple-500"
                                                        : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                                                }
                                            `}
                        >
                          {isCompleted ? "✓" : course.number}
                        </div>

                        {/* Course Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
                                {course.title}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {isCurrent && (
                                  <span className="inline-block text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-2 py-1 rounded-full">
                                    {isEs ? "En progreso" : "In Progress"}
                                  </span>
                                )}
                                {isRecommended && !isCompleted && (
                                  <span className="inline-block text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-indigo-500 px-2 py-1 rounded-full">
                                    {isEs ? "Recomendado para ti" : "Recommended for You"}
                                  </span>
                                )}
                                {isComingSoon && (
                                  <span className="inline-block text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-2 py-1 rounded-full">
                                    {isEs ? "Próximamente" : "Coming Soon"}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-gray-400 whitespace-nowrap">
                              {getCourseDuration(course)}
                            </span>
                          </div>

                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                            {course.description}
                          </p>

                          {/* Outcomes */}
                          {course.outcomes &&
                            course.outcomes.length > 0 &&
                            !isComingSoon && (
                              <div className="mb-4">
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                  {isEs ? "Lo que aprenderás" : "What You'll Learn"}
                                </div>
                                <ul className="space-y-1">
                                  {course.outcomes
                                    .slice(0, 3)
                                    .map((outcome, idx) => (
                                      <li
                                        key={idx}
                                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                                      >
                                        <span className="text-primary-500 mt-1">
                                          •
                                        </span>
                                        <span>{outcome}</span>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            )}

                          {/* Lessons Count & CTA */}
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>{course.lessons.length} {isEs ? "lecciones" : "lessons"}</span>
                            {isAccessible && (
                              <Link
                                href={`/academy/${course.id}`}
                                className={`
                                                                font-semibold transition-colors
                                                                ${
                                                                  isCurrent
                                                                    ? "text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                                                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                                                }
                                                            `}
                              >
                                {isCompleted
                                  ? (isEs ? "Revisar curso" : "Review Course")
                                  : isCurrent
                                    ? (isEs ? "Continuar" : "Continue")
                                    : (isEs ? "Comenzar curso" : "Start Course")}{" "}
                                →
                              </Link>
                            )}
                            {isLocked && !isComingSoon && (
                              <span className="text-gray-400">
                                {isEs ? "Completa los cursos previos para desbloquear" : "Complete prerequisite courses to unlock"}
                              </span>
                            )}
                            {isComingSoon && (
                              <span className="text-purple-400">
                                {isEs ? "Contenido disponible próximamente" : "Content launching soon"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
