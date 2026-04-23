import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import Link from 'next/link'
import Image from 'next/image'
import { CURRICULUM, getCourseTier } from '@/lib/data/curriculum'

const TRACK_COLORS: Record<string, { gradient: string; badge: string; text: string; bg: string; icon: string }> = {
  'anxiety-and-fear': { gradient: 'from-blue-500 to-primary-500', badge: 'bg-blue-50 text-blue-700 ring-blue-200', text: 'text-blue-600', bg: 'bg-blue-50', icon: 'text-blue-500' },
  'mood-and-emotions': { gradient: 'from-violet-500 to-purple-500', badge: 'bg-violet-50 text-violet-700 ring-violet-200', text: 'text-violet-600', bg: 'bg-violet-50', icon: 'text-violet-500' },
  'nutrition-and-brain-health': { gradient: 'from-amber-500 to-orange-500', badge: 'bg-amber-50 text-amber-700 ring-amber-200', text: 'text-amber-600', bg: 'bg-amber-50', icon: 'text-amber-500' },
  'sleep-and-recovery': { gradient: 'from-primary-500 to-blue-500', badge: 'bg-primary-50 text-primary-700 ring-primary-200', text: 'text-primary-600', bg: 'bg-primary-50', icon: 'text-primary-500' },
  'stress-and-resilience': { gradient: 'from-green-500 to-teal-500', badge: 'bg-green-50 text-green-700 ring-green-200', text: 'text-green-600', bg: 'bg-green-50', icon: 'text-green-500' },
}

const TIER_STYLES: Record<string, string> = {
  Essentials: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Skills: 'bg-blue-50 text-blue-700 ring-blue-200',
  Mastery: 'bg-purple-50 text-purple-700 ring-purple-200',
}

const TRACK_ICONS: Record<string, string> = {
  'anxiety-and-fear': 'M13 10V3L4 14h7v7l9-11h-7z',
  'mood-and-emotions': 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'nutrition-and-brain-health': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  'sleep-and-recovery': 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
  'stress-and-resilience': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
}

const totalCourses = CURRICULUM.reduce((n, t) => n + t.courses.length, 0)
const totalLessons = CURRICULUM.reduce((n, t) => n + t.courses.reduce((m, c) => m + c.lessons.length, 0), 0)


export default async function LandingPage() {
  const session = await getServerSession()
  if (session?.uid) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-violet-500 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-gray-900 tracking-tight">Wellness Academy</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="#courses" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition px-3 py-2">
                Courses
              </a>
              <Link href="/signin" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition px-3 py-2">
                Sign In
              </Link>
              <Link href="/signup" className="text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 transition shadow-sm">
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white" aria-hidden="true" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30" aria-hidden="true">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-300 rounded-full blur-[120px]" />
            <div className="absolute top-20 left-0 w-72 h-72 bg-violet-300 rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary-700">Free &middot; Evidence-based &middot; Self-paced</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                Your path to understanding{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-violet-500">
                  your mental health
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
                Learn practical coping techniques backed by CBT, DBT, and mindfulness research.
                Free courses on anxiety, depression, stress, and more.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
                <Link
                  href="/signup"
                  className="group w-full sm:w-auto inline-flex items-center justify-center font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl px-8 py-3.5 shadow-lg shadow-primary-500/20 transition-all text-base"
                >
                  Start Learning Free
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a
                  href="#courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-xl px-8 py-3.5 border border-gray-200 transition text-base"
                >
                  Browse Courses
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tabular-nums">{totalCourses}</div>
                  <div className="text-sm font-medium text-gray-400 mt-1">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tabular-nums">{totalLessons}+</div>
                  <div className="text-sm font-medium text-gray-400 mt-1">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tabular-nums">{CURRICULUM.length}</div>
                  <div className="text-sm font-medium text-gray-400 mt-1">Tracks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-primary-500">100%</div>
                  <div className="text-sm font-medium text-gray-400 mt-1">Evidence-Based</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section id="features" className="py-20 sm:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Built for your wellness journey
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Everything you need to understand your mental health and build lasting coping skills.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Structured Courses',
                  desc: 'Step-by-step learning paths covering anxiety, depression, sleep, OCD, trauma, and more.',
                  icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
                  color: 'bg-primary-500',
                  iconColor: 'text-primary-500',
                  bgColor: 'bg-primary-50',
                },
                {
                  title: 'AI Wellness Coach',
                  desc: 'Get personalized guidance and practice coping techniques with a supportive AI companion.',
                  icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                  color: 'bg-violet-500',
                  iconColor: 'text-violet-500',
                  bgColor: 'bg-violet-50',
                },
                {
                  title: 'Interactive Exercises',
                  desc: 'Breathing exercises, thought records, grounding techniques, and mood tracking built right in.',
                  icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
                  color: 'bg-emerald-500',
                  iconColor: 'text-emerald-500',
                  bgColor: 'bg-emerald-50',
                },
                {
                  title: 'Private & Safe',
                  desc: 'Your data stays private. Learn at your own pace without judgment, in a space designed for you.',
                  icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                  color: 'bg-amber-500',
                  iconColor: 'text-amber-500',
                  bgColor: 'bg-amber-50',
                },
              ].map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 ${f.bgColor} rounded-2xl flex items-center justify-center mb-5`}>
                    <svg className={`w-7 h-7 ${f.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Wellness Tracks ─── */}
        <section className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Five wellness tracks, one complete journey
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                {totalCourses} evidence-based courses with {totalLessons}+ interactive lessons, exercises, and assessments.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CURRICULUM.map((track) => {
                const colors = TRACK_COLORS[track.id] ?? TRACK_COLORS['anxiety-and-fear']
                const iconPath = TRACK_ICONS[track.id] ?? TRACK_ICONS['anxiety-and-fear']
                return (
                  <a
                    key={track.id}
                    href={`#track-${track.id}`}
                    className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient accent top */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`} />
                    <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <svg className={`w-6 h-6 ${colors.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{track.title.replace(/^\d+\.\s*/, '')}</h3>
                    <p className="text-sm text-gray-400 font-medium">{track.courses.length} courses</p>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Course Catalog ─── */}
        <section id="courses" className="py-20 sm:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Browse our courses
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                All {totalCourses} courses are free and self-paced. Pick a topic that speaks to you and start learning today.
              </p>
            </div>

            <div className="space-y-20">
              {CURRICULUM.map((track) => {
                const colors = TRACK_COLORS[track.id] ?? TRACK_COLORS['anxiety-and-fear']
                return (
                  <div key={track.id} id={`track-${track.id}`} className="scroll-mt-24">
                    {/* Track heading */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`} />
                      <h3 className="text-2xl font-bold text-gray-900">{track.title.replace(/^\d+\.\s*/, '')}</h3>
                      <span className="text-sm text-gray-400 font-medium bg-gray-100 rounded-full px-3 py-0.5">{track.courses.length} courses</span>
                    </div>
                    <p className="text-gray-500 mb-8 max-w-3xl">{track.description}</p>

                    {/* Course cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {track.courses.map((course) => {
                        const tier = getCourseTier(course.id)
                        return (
                          <Link
                            key={course.id}
                            href={`/academy/${course.id}`}
                            className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                          >
                            {/* Course thumbnail — 16:9 */}
                            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                              <Image
                                src={`/images/courses/${course.id}.webp`}
                                alt={course.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`} />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                              {/* Badges */}
                              <div className="flex items-center gap-2 mb-3">
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ring-1 ring-inset ${TIER_STYLES[tier]}`}>
                                  {tier}
                                </span>
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ring-1 ring-inset ${colors.badge}`}>
                                  {track.title.replace(/^\d+\.\s*/, '')}
                                </span>
                              </div>
                              <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                                {course.title}
                              </h4>
                              <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                                {course.description}
                              </p>
                              {/* Meta */}
                              <div className="flex items-center gap-4 text-sm text-gray-400 font-medium pt-4 border-t border-gray-100">
                                <span className="flex items-center gap-1.5">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  ~20 min each
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                  {course.lessons.length} lessons
                                </span>
                                <span className="ml-auto text-primary-500 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                                  Start
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Testimonial ─── */}
        <section className="py-20 sm:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-violet-500 rounded-2xl mb-8 shadow-lg shadow-primary-500/20">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <blockquote className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-6">
              &ldquo;Understanding your mind is the first step toward feeling better.{' '}
              <span className="text-gray-400 font-normal italic">You don&rsquo;t have to figure it out alone.</span>&rdquo;
            </blockquote>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              This platform is built on evidence-based approaches like CBT, DBT, and mindfulness — the same techniques used by therapists worldwide.
            </p>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-20 sm:py-28 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-14 text-center">
              Common questions
            </h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
              {[
                { q: 'Is this a replacement for therapy?', a: 'No. This is an educational platform that teaches evidence-based coping techniques. It\'s a complement to professional care, not a substitute.' },
                { q: 'Is it really free?', a: 'Yes. All courses and interactive exercises are completely free. We believe mental health education should be accessible to everyone.' },
                { q: 'Is my information private?', a: 'Absolutely. Your progress and personal data are kept private. We don\'t sell data or share your information with third parties.' },
                { q: 'What topics are covered?', a: 'We cover anxiety, depression, sleep, stress management, OCD, trauma, and more. Each track includes multiple courses with interactive exercises.' },
                { q: 'What if I\'m in crisis?', a: 'If you\'re in immediate danger, please call 911. For crisis support, the 988 Suicide & Crisis Lifeline is available 24/7 — call or text 988.' },
                { q: 'How long do courses take?', a: 'Each lesson takes 10-20 minutes. You can go at your own pace — there\'s no rush. Your progress is saved automatically.' },
              ].map((item) => (
                <div key={item.q}>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">{item.q}</h4>
                  <p className="text-gray-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="relative bg-gray-900 rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
              {/* Glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" aria-hidden="true">
                <div className="h-56 w-[480px] rounded-full border-[20px] border-primary-500 blur-3xl opacity-40 will-change-[filter]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                  You&apos;re in the right place
                </h2>
                <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                  Whether you&apos;re just starting to learn about mental health or looking for new coping strategies, there&apos;s something here for you.
                </p>
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl px-8 py-4 shadow-lg shadow-primary-500/25 transition-all text-lg"
                >
                  Get Started — It&apos;s Free
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-violet-500 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Wellness Academy</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400">Crisis support:</span>
              <a href="tel:988" className="inline-flex items-center gap-1.5 text-red-600 font-semibold hover:text-red-700 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                988 Lifeline
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
