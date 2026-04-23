import { getAuthContext } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { computeDimensionScores, emptyScores } from '@/lib/utils/wellness-scores'
import { getAllCourses } from '@/lib/data/curriculum'
import Datepicker from '@/components/datepicker'
import AnalyticsCard01 from './analytics-card-01'
import AnalyticsCard02 from './analytics-card-02'
import AnalyticsCard03 from './analytics-card-03'
import AnalyticsCard04 from './analytics-card-04'
import AnalyticsCard05 from './analytics-card-05'
import AnalyticsCard06 from './analytics-card-06'
import AnalyticsCard07 from './analytics-card-07'
import AnalyticsCard08 from './analytics-card-08'
import AnalyticsCard09 from './analytics-card-09'
import AnalyticsCard10 from './analytics-card-10'
import AnalyticsCard11 from './analytics-card-11'

export const metadata = {
  title: 'Analytics - Wellness Academy',
  description: 'Learning analytics and wellness progress insights',
}

export default async function Analytics() {
  const { user, profile } = await getAuthContext()

  if (!user) {
    redirect('/signin')
  }

  if (!profile || !profile.onboardingCompleted) {
    redirect('/onboarding/welcome')
  }

  // Compute real stats from the user's profile
  let scores: ReturnType<typeof computeDimensionScores>;
  try {
    scores = computeDimensionScores(profile);
  } catch (e) {
    console.error('[Analytics] Wellness score computation failed:', e);
    scores = emptyScores();
  }
  const allCourses = getAllCourses()

  const completedCourseCount = profile.progress?.completedCourses?.length ?? 0
  const totalLessonsCompleted = Object.values(profile.progress?.completedLessons ?? {})
    .reduce((sum, lessons) => sum + (lessons?.length ?? 0), 0)
  const totalCourses = allCourses.length
  const completionRate = totalCourses > 0
    ? Math.round((completedCourseCount / totalCourses) * 100)
    : 0
  const streakDays = profile.progress?.streakDays ?? 0
  const xpTotal = profile.progress?.xpTotal ?? 0
  const overallScore = scores.overallScore

  // Build score history for the chart (from wellnessScoreHistory snapshots)
  const scoreHistory = (profile.wellnessScoreHistory ?? []).map(s => ({
    date: s.snapshotAt,
    score: s.overallScore,
  }))

  const summaryStats = {
    completedCourseCount,
    totalLessonsCompleted,
    completionRate,
    streakDays,
    xpTotal,
    overallScore,
    scoreHistory,
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">

      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Analytics</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

          {/* Datepicker built with React Day Picker */}
          <Datepicker />

        </div>

      </div>

      {/* Real user summary banner */}
      <div className="bg-gradient-to-r from-primary-50 to-violet-50 dark:from-primary-900/20 dark:to-violet-900/20 border border-primary-100 dark:border-primary-500/20 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalLessonsCompleted}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Lessons Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completedCourseCount}/{totalCourses}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Courses Finished</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{overallScore !== null ? `${overallScore}%` : '--'}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Wellness Score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{streakDays}d</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Current Streak</div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">

        {/* Line chart (Learning Analytics) */}
        <AnalyticsCard01 />
        {/* Line chart (Active Learners Right Now) */}
        <AnalyticsCard02 />
        {/* Stacked bar chart (Enrollment Sources) */}
        <AnalyticsCard03 />
        {/* Horizontal bar chart (New vs Returning Learners) */}
        <AnalyticsCard04 />
        {/* Report card (Top Referral Sources) */}
        <AnalyticsCard05 />
        {/* Report card (Top Course Pages) */}
        <AnalyticsCard06 />
        {/* Report card (Learner Regions) */}
        <AnalyticsCard07 />
        {/* Doughnut chart (Learning Sessions By Device) */}
        <AnalyticsCard08 />
        {/* Doughnut chart (Learners By Age Group) */}
        <AnalyticsCard09 />
        {/* Polar chart (Learning Style Preference) */}
        <AnalyticsCard10 />
        {/* Table (Top Wellness Courses) */}
        <AnalyticsCard11 />

      </div>
    </div>
  )
}
