import { getCourseByNumber } from "@/lib/data/curriculum";
import { getQuickWinPath, QUICK_WIN_MAP } from "@/lib/data/quick-win";
import { getLevelProgress } from "@/lib/data/xp-levels";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import RoleplayStats from "./roleplay-stats";
import StreakWidget from "@/components/dashboard/streak-widget";
import BadgeShowcase from "@/components/dashboard/badge-showcase";
import XPLevelBar from "@/components/dashboard/xp-level-bar";
import JourneyMap from "@/components/dashboard/journey-map";
import AcquisitionHealth from "@/components/dashboard/acquisition-health";
import NextActions from "@/components/dashboard/next-actions";
import ArtifactStatus from "@/components/dashboard/artifact-status";
import OutreachStatsWidget from "@/components/dashboard/outreach-stats-widget";
import PipelineSummaryWidget from "@/components/dashboard/pipeline-summary-widget";
import CoachingNudges from "@/components/dashboard/coaching-nudges";
import WelcomeGuide from "@/components/dashboard/welcome-guide";
import { PitchDayScoreWidget } from "@/components/dashboard/pitch-day-score";
import { outreachService } from "@/lib/services/outreachService";
import { pipelineService } from "@/lib/services/pipelineService";
import { generateNudges } from "@/lib/services/coachingNudgeService";
import type { FounderProfile, AssessmentScores } from "@/types/profile";

interface AcademyDashboardProps {
  profile: FounderProfile;
  previousScores?: AssessmentScores | null;
}

export default async function AcademyDashboard({
  profile,
  previousScores,
}: AcademyDashboardProps) {
  const locale = await getLocale();
  const isEs = locale === "es";
  const currentCourseNum = profile.progress?.currentCourse || 0;
  const currentCourse = getCourseByNumber(currentCourseNum);
  const xp = profile.progress?.xpTotal || 0;
  const levelInfo = getLevelProgress(xp);

  // Check if onboarding is truly complete (has questionnaire data)
  const hasQuestionnaireData =
    profile.questionnaire?.industry ||
    profile.questionnaire?.target_roles?.length;
  const hasAssessment = profile.assessment?.overallReadiness != null;
  const isSetupIncomplete = !hasQuestionnaireData || !hasAssessment;

  // Certification
  const cert = profile.progress?.certificationEarned ?? null;

  // Quick Win path — show only for users with < 3 lessons completed
  const completedLessonCount = Object.keys(
    profile.progress?.completedLessons || {},
  ).length;
  const showQuickWin = !isSetupIncomplete && completedLessonCount < 3;
  const quickWinLessons = showQuickWin
    ? getQuickWinPath(
        (profile.assessment?.scores as unknown as Record<string, number>) ||
          Object.fromEntries(Object.keys(QUICK_WIN_MAP).map((k) => [k, 50])),
      )
    : [];

  // Fetch execute-layer data in parallel (graceful fallback if DB unavailable)
  const [outreachStats, pipelineStats, nudges] = await Promise.all([
    outreachService.getOutreachStats(profile.userId, 7).catch(() => ({
      totalActions: 0,
      byChannel: {
        whatsapp: 0,
        instagram_dm: 0,
        email: 0,
        phone: 0,
        linkedin: 0,
        event: 0,
        facebook_messenger: 0,
        twitter: 0,
        sms: 0,
        other: 0,
      },
      byAction: {
        initial_outreach: 0,
        follow_up: 0,
        meeting_booked: 0,
        meeting_held: 0,
        proposal_sent: 0,
        voice_note: 0,
        other: 0,
      },
      byOutcome: { positive: 0, neutral: 0, negative: 0, pending: 0 },
    })),
    pipelineService.getPipelineStats(profile.userId).catch(() => ({
      totalDeals: 0,
      totalValue: 0,
      conversionRate: 0,
      byStage: {
        lead: { count: 0, value: 0 },
        contacted: { count: 0, value: 0 },
        meeting: { count: 0, value: 0 },
        proposal: { count: 0, value: 0 },
        won: { count: 0, value: 0 },
        lost: { count: 0, value: 0 },
      },
    })),
    generateNudges(profile.userId, profile).catch(() => []),
  ]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Certification Earned Banner */}
      {cert && (
        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-black text-xl">
                GTM
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-yellow-100 mb-0.5">
                  {isEs ? "Certificación obtenida" : "Certification Earned"}
                </p>
                <h3 className="text-xl font-black">
                  {isEs ? "Profesional Certificado Solo GTM" : "Certified Solo GTM Practitioner"}
                </h3>
                <p className="text-sm text-yellow-100 mt-0.5">
                  {isEs ? "Obtenido el " : "Earned "}
                  {new Date(cert.earnedAt).toLocaleDateString(isEs ? "es-MX" : "en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              {cert.badgrAssertionUrl && (
                <a
                  href={cert.badgrAssertionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition"
                >
                  {isEs ? "Ver insignia" : "View Badge"}
                </a>
              )}
              <a
                href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=Certified+Solo+GTM+Practitioner&organizationId=&issueYear=${new Date(cert.earnedAt).getFullYear()}&issueMonth=${new Date(cert.earnedAt).getMonth() + 1}${cert.badgrAssertionUrl ? `&certUrl=${encodeURIComponent(cert.badgrAssertionUrl)}` : ""}&certId=${encodeURIComponent(cert.certId)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold bg-white text-amber-600 hover:bg-yellow-50 px-4 py-2 rounded-xl transition shadow"
              >
                {isEs ? "Agregar a LinkedIn →" : "Add to LinkedIn →"}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Setup Incomplete Banner */}
      {isSetupIncomplete && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-2xl">&#9888;&#65039;</span>
              </div>
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-1">
                  {isEs ? "Completa tu configuración" : "Complete Your Setup"}
                </h3>
                <p className="text-amber-700 dark:text-amber-200 text-sm">
                  {!hasQuestionnaireData &&
                    (isEs ? "Tu perfil de negocio está incompleto. " : "Your business profile is incomplete. ")}
                  {!hasAssessment &&
                    (isEs ? "Completa tu análisis de negocio para desbloquear coaching personalizado y contenido." : "Complete your business analysis to unlock personalized coaching and content.")}
                </p>
              </div>
            </div>
            <Link
              href={
                !hasQuestionnaireData
                  ? "/onboarding/questionnaire"
                  : "/onboarding/analyzing"
              }
              className="btn bg-amber-500 hover:bg-amber-600 text-white whitespace-nowrap"
            >
              {!hasQuestionnaireData
                ? (isEs ? "Completar cuestionario" : "Complete Questionnaire")
                : (isEs ? "Ejecutar análisis" : "Run Analysis")}
            </Link>
          </div>
        </div>
      )}

      {/* Welcome Banner with Level */}
      <div className="relative bg-primary-500 dark:bg-primary-600 p-8 rounded-3xl mb-8 overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isEs ? `¡Hola${profile.name ? `, ${profile.name}` : ""}!` : `Welcome${profile.name ? `, ${profile.name}` : ""}!`}
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl">
              {isSetupIncomplete
                ? (isEs ? "Este es tu centro de mando. Primero, completemos tu configuración para personalizar todo tu currículo." : "This is your command center. First, let's complete your setup to personalize your entire curriculum.")
                : (isEs ? "Tu centro de mando de adquisición. Ve la salud de tu sistema, toma la próxima acción y rastrea lo que has construido." : "Your acquisition command center. See your system health, take the next action, and track what you've built.")}
            </p>
            {isSetupIncomplete && (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-primary-200">
                  <span
                    className={
                      hasQuestionnaireData ? "text-green-300" : "text-amber-300"
                    }
                  >
                    {hasQuestionnaireData ? "\u2713" : "\u25CB"}
                  </span>
                  {isEs ? "Perfil de negocio" : "Business Profile"}
                </div>
                <div className="flex items-center gap-2 text-primary-200">
                  <span
                    className={
                      hasAssessment ? "text-green-300" : "text-amber-300"
                    }
                  >
                    {hasAssessment ? "\u2713" : "\u25CB"}
                  </span>
                  {isEs ? "Análisis de negocio" : "Business Analysis"}
                </div>
              </div>
            )}
          </div>
          {!isSetupIncomplete && (
            <div className="text-right shrink-0">
              <div className="text-sm font-medium text-primary-200 mb-0.5">
                Level {levelInfo.current.level}
              </div>
              <div className="text-xl font-bold text-white">
                {levelInfo.current.title}
              </div>
            </div>
          )}
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-400 opacity-20 rounded-full" />
        <div className="absolute bottom-0 right-0 -mr-10 -mb-10 w-40 h-40 bg-primary-400 opacity-20 rounded-full" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* ── Onboarding Checklist (always visible until all steps done) ── */}
        <WelcomeGuide
          profileComplete={!!hasQuestionnaireData}
          assessmentComplete={hasAssessment}
          lessonsCompleted={completedLessonCount}
          roleplaysDone={profile.progress?.roleplayStats?.totalSessions || 0}
        />

        {/* ── Quick Win Path (new users only) ── */}
        {showQuickWin && quickWinLessons.length > 0 && (
          <div className="col-span-full bg-gradient-to-r from-indigo-600 to-primary-600 rounded-2xl p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">
                  {isEs ? "Tu ruta de victorias rápidas en 90 minutos" : "Your 90-Minute Quick Win Path"}
                </p>
                <h2 className="text-xl font-bold">
                  {isEs ? "Empieza aquí — basado en tus mayores brechas" : "Start here — based on your biggest gaps"}
                </h2>
              </div>
              <Link
                href="/academy"
                className="text-xs font-medium text-white/70 hover:text-white whitespace-nowrap"
              >
                {isEs ? "Ver todos los cursos →" : "Browse all courses →"}
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {quickWinLessons.map((lesson, i) => (
                <Link
                  key={`${lesson.courseId}-${lesson.lessonId}`}
                  href={`/academy/${lesson.courseId}/${lesson.lessonId}`}
                  className="bg-white/10 hover:bg-white/20 transition rounded-xl p-4"
                >
                  <div className="text-xs font-bold text-indigo-200 mb-1">
                    {isEs ? `Paso ${i + 1}` : `Step ${i + 1}`}
                  </div>
                  <div className="font-semibold text-sm mb-1">
                    {lesson.title}
                  </div>
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    {lesson.why}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Coaching Nudges (proactive) ── */}
        {!isSetupIncomplete && nudges.length > 0 && (
          <CoachingNudges nudges={nudges} />
        )}

        {/* ── Row 1: Acquisition Health + What to Do Next ── */}
        {!isSetupIncomplete && profile.assessment && (
          <>
            <div className="col-span-full xl:col-span-4">
              <AcquisitionHealth
                scores={profile.assessment.scores}
                previousScores={previousScores}
              />
            </div>
            <div className="col-span-full xl:col-span-8">
              <NextActions profile={profile} />
            </div>
          </>
        )}

        {/* ── Row 2: Continue Course + Roleplay Stats ── */}
        <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {isEs ? "Continúa tu recorrido" : "Continue Your Journey"}
            </h2>
            <span className="text-sm font-medium text-primary-500 bg-primary-50 dark:bg-primary-500/10 px-3 py-1 rounded-full">
              Track {Math.floor(currentCourseNum / 8) + 1}
            </span>
          </div>

          {currentCourse && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                  {currentCourse.number}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
                  {currentCourse.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                  {currentCourse.description}
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/academy/${currentCourse.id}`}
                    className="btn bg-primary-500 text-white hover:bg-primary-600 px-6"
                  >
                    {isEs ? "Retomar curso" : "Resume Course"}
                  </Link>
                  <span className="text-sm text-gray-400">
                    {currentCourse.duration} {isEs ? "duración total" : "total duration"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-full xl:col-span-4">
          <RoleplayStats user={profile as any} />
        </div>

        {/* ── Row 3: Journey Map ── */}
        {profile.assessment &&
          profile.assessment.journeyMap &&
          profile.assessment.journeyMap.length > 0 && (
            <div className="col-span-full">
              <JourneyMap
                phases={profile.assessment.journeyMap}
                completedCourses={profile.progress?.completedCourses || []}
                currentCourse={profile.progress?.currentCourse ?? null}
                recommendedPath={profile.assessment.recommendedPath}
              />
            </div>
          )}

        {/* ── Row 4: Artifact Status + Progress + AI Coach ── */}
        <div className="col-span-full xl:col-span-4">
          <ArtifactStatus artifacts={profile.artifacts} />
        </div>

        <div className="col-span-full xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">
            {isEs ? "Progreso de aprendizaje" : "Learning Progress"}
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-gray-400">
                  {isEs ? "Completado del curso" : "Academy Completion"}
                </span>
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  {Math.round(
                    ((profile.progress?.completedCourses?.length || 0) / 34) *
                      100,
                  )}
                  %
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                  style={{
                    width: `${((profile.progress?.completedCourses?.length || 0) / 34) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary-500 mb-1">
                  {profile.progress?.completedCourses?.length || 0}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  {isEs ? "Cursos completos" : "Courses Done"}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary-500 mb-1">
                  {Object.values(
                    profile.progress?.completedLessons || {},
                  ).reduce((sum, arr) => sum + arr.length, 0)}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  {isEs ? "Lecciones completas" : "Lessons Done"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-8 border border-gray-100 dark:border-gray-700/60 overflow-hidden relative">
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-2 italic">
                Solo Advisor AI
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg">
                &quot;{profile.assessment?.personalizedInsight?.slice(0, 180)}
                ...&quot;
              </p>
            </div>
            <div className="mt-auto">
              <Link
                href="/coach"
                className="inline-flex items-center gap-2 text-primary-500 font-bold hover:gap-3 transition-all"
              >
                {isEs ? "Hazle una pregunta a tu asesor →" : "Ask your coach a question →"}
              </Link>
            </div>
          </div>
          <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-5 dark:opacity-10 scale-150 pointer-events-none">
            <svg
              width="240"
              height="240"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* ── Execute Layer: Outreach + Pipeline ── */}
        <div className="col-span-full md:col-span-6 xl:col-span-3">
          <OutreachStatsWidget stats={outreachStats} />
        </div>
        <div className="col-span-full md:col-span-6 xl:col-span-3">
          <PipelineSummaryWidget stats={pipelineStats} />
        </div>

        {/* ── Pitch Day Readiness Score (shown during final cohort weeks) ── */}
        <div className="col-span-full xl:col-span-6">
          <PitchDayScoreWidget />
        </div>

        {/* ── Row 5: Gamification (Streak + XP + Badges) ── */}
        <div className="col-span-full md:col-span-6 xl:col-span-3">
          <StreakWidget
            currentStreak={profile.progress?.currentStreak || 0}
            longestStreak={profile.progress?.longestStreak || 0}
          />
        </div>

        <div className="col-span-full md:col-span-6 xl:col-span-3">
          <XPLevelBar xp={xp} />
        </div>

        <div className="col-span-full xl:col-span-6">
          <BadgeShowcase earnedBadges={profile.progress?.badges || []} />
        </div>
      </div>
    </div>
  );
}
