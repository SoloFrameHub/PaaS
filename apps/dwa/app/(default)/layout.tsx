import Sidebar from '@/components/ui/sidebar'
import Header from '@/components/ui/header'
import FlyoutChat from '@/components/ai/flyout-chat'
import { CURRICULUM, getCourse } from '@/lib/data/curriculum'
import ErrorBoundary from '@/components/error-boundary'
import { getAuthContext } from '@/lib/auth'
import { SYMPTOM_COURSE_MAPPING } from '@/types/wellness-profile'

// Layout uses cookies() via getAuthContext — force dynamic to avoid build-time noise
export const dynamic = 'force-dynamic'

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let profile: Awaited<ReturnType<typeof getAuthContext>>['profile'] = null;
  try {
    const ctx = await getAuthContext();
    profile = ctx.profile;
  } catch (e) {
    // Only swallow "no user" — a DB error that kills profile loading
    // should surface, not silently render an empty sidebar.
    const msg = e instanceof Error ? e.message : '';
    if (msg.includes('No database connection')) throw e;
    // Otherwise render with empty profile (user not logged in, etc.)
  }

  const completedCourses = new Set(profile?.progress?.completedCourses ?? []);
  const currentCourse = profile?.progress?.currentCourse ?? null;
  const recommendedCourses = new Set(profile?.assessment?.recommendedCourses ?? []);
  const completedLessonsMap = profile?.progress?.completedLessons ?? {};

  // Build path course IDs — stored recommendations, padded with on-the-fly scoring
  let pathCourseIds = [...(profile?.assessment?.recommendedCourses ?? [])];
  if (profile?.questionnaire?.primarySymptoms?.length) {
    const existing = new Set(pathCourseIds);
    const courseScores: Record<string, number> = {};
    const symptomBest: Record<string, string> = {};
    for (const s of profile.questionnaire.primarySymptoms) {
      const mapped = SYMPTOM_COURSE_MAPPING[s.category] ?? [];
      const score = (s.severity === 'severe' ? 3 : s.severity === 'moderate' ? 2 : 1) * (s.isPrimary ? 2 : 1);
      for (const c of mapped) if (!existing.has(c)) courseScores[c] = (courseScores[c] || 0) + score;
      const best = mapped.find(c => !existing.has(c));
      if (best && !symptomBest[s.category]) symptomBest[s.category] = best;
    }
    // Guarantee at least one course per symptom, then fill by score
    const guaranteed = new Set(Object.values(symptomBest).filter(id => !existing.has(id)));
    const sorted = Object.entries(courseScores).sort((a, b) => b[1] - a[1]).map(([id]) => id).filter(id => !existing.has(id) && !guaranteed.has(id));
    const target = Math.max(5, guaranteed.size + 2);
    const remaining = target - pathCourseIds.length - guaranteed.size;
    pathCourseIds = [...pathCourseIds, ...guaranteed, ...sorted.slice(0, Math.max(0, remaining))];
  }

  // Build sidebar path courses (same shape as track courses for consistent rendering)
  const sidebarPathCourses = pathCourseIds.map(id => {
    const course = getCourse(id);
    if (!course) return null;
    return {
      id: course.id,
      title: course.title,
      isCompleted: completedCourses.has(course.id),
      isCurrent: course.id === currentCourse,
      isRecommended: true,
      lessonCount: course.lessons.length,
      completedLessonCount: completedLessonsMap[course.id]?.length ?? 0,
    };
  }).filter(Boolean);

  // Simplify curriculum for sidebar to reduce client bundle size
  const sidebarTracks = CURRICULUM.map(track => ({
    id: track.id,
    title: track.title,
    magnetComponent: track.magnetComponent,
    courses: track.courses.map(course => ({
      id: course.id,
      title: course.title,
      isCompleted: completedCourses.has(course.id),
      isCurrent: course.id === currentCourse,
      isRecommended: recommendedCourses.has(course.id),
      lessonCount: course.lessons.length,
      completedLessonCount: completedLessonsMap[course.id]?.length ?? 0,
    }))
  }))

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar tracks={sidebarTracks} pathCourses={sidebarPathCourses} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header />

        <main className="grow [&>*:first-child]:scroll-mt-16">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>

      </div>

      <FlyoutChat />

    </div>
  )
}
