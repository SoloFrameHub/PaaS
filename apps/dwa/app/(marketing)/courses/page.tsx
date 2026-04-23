'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CURRICULUM } from '@/lib/data/curriculum'
import { OPTIMIZATION_CURRICULUM } from '@/lib/data/optimization-curriculum'

/* ── Track visual config ─────────────────────────────────────────────── */
const TRACK_CONFIG: Record<string, { gradient: string; badge: string; icon: string }> = {
  // Therapeutic School Tracks
  'anxiety-and-fear': {
    gradient: 'from-blue-500 to-indigo-600',
    badge: 'bg-blue-100 text-blue-700',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z', // lightning bolt
  },
  'mood-emotional-health': {
    gradient: 'from-violet-500 to-purple-600',
    badge: 'bg-violet-100 text-violet-700',
    icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // face
  },
  'sleep-recovery': {
    gradient: 'from-indigo-500 to-blue-600',
    badge: 'bg-indigo-100 text-indigo-700',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z', // moon
  },
  'stress-resilience': {
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'bg-emerald-100 text-emerald-700',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', // shield
  },
  'nutrition-brain-health': {
    gradient: 'from-amber-500 to-orange-600',
    badge: 'bg-amber-100 text-amber-700',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', // heart
  },
  // Optimization School (5 Pillars)
  'physical-vitality': {
    gradient: 'from-green-500 to-emerald-600',
    badge: 'bg-green-100 text-green-700',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z', // lightning (energy)
  },
  'social-connection': {
    gradient: 'from-blue-500 to-cyan-600',
    badge: 'bg-blue-100 text-blue-700',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', // people
  },
  'mental-clarity': {
    gradient: 'from-purple-500 to-pink-600',
    badge: 'bg-purple-100 text-purple-700',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', // lightbulb
  },
  'emotional-resilience': {
    gradient: 'from-orange-500 to-red-600',
    badge: 'bg-orange-100 text-orange-700',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', // shield
  },
  'purpose-meaning': {
    gradient: 'from-rose-500 to-purple-600',
    badge: 'bg-rose-100 text-rose-700',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', // star
  },
}

const TRACK_LABELS: Record<string, string> = {
  // Therapeutic School
  'anxiety-and-fear': 'Anxiety & Fear',
  'mood-emotional-health': 'Mood & Emotions',
  'sleep-recovery': 'Sleep & Recovery',
  'stress-resilience': 'Stress & Resilience',
  'nutrition-brain-health': 'Nutrition & Brain',
  // Optimization School (5 Pillars)
  'physical-vitality': 'Physical Vitality',
  'social-connection': 'Social Connection',
  'mental-clarity': 'Mental Clarity',
  'emotional-resilience': 'Emotional Resilience',
  'purpose-meaning': 'Purpose & Meaning',
}

/* ── Combine both schools ─────────────────────────────────────────────── */
const COMBINED_CURRICULUM = [...CURRICULUM, ...OPTIMIZATION_CURRICULUM]

/* ── Flatten all courses with track metadata ─────────────────────────── */
const allCourses = COMBINED_CURRICULUM.flatMap((track) =>
  track.courses.map((course) => ({
    ...course,
    trackId: track.id,
    trackTitle: TRACK_LABELS[track.id] ?? track.title,
  }))
)

const totalLessons = allCourses.reduce((sum, c) => sum + c.lessons.length, 0)
const therapeuticLessons = CURRICULUM.flatMap(t => t.courses).reduce((sum, c) => sum + c.lessons.length, 0)
const optimizationLessons = OPTIMIZATION_CURRICULUM.flatMap(t => t.courses).reduce((sum, c) => sum + c.lessons.length, 0)

export default function CoursesPage() {
  const [activeSchool, setActiveSchool] = useState<'all' | 'therapeutic' | 'optimization'>('all')
  const [activeTrack, setActiveTrack] = useState<string>('all')

  // Filter by school first
  const schoolFiltered =
    activeSchool === 'all' ? allCourses :
    activeSchool === 'therapeutic' ? allCourses.filter(c => CURRICULUM.some(t => t.id === c.trackId)) :
    allCourses.filter(c => OPTIMIZATION_CURRICULUM.some(t => t.id === c.trackId))

  // Then filter by track
  const filtered =
    activeTrack === 'all'
      ? schoolFiltered
      : schoolFiltered.filter((c) => c.trackId === activeTrack)

  // Get available tracks based on school filter
  const availableTracks = activeSchool === 'all' ? COMBINED_CURRICULUM :
    activeSchool === 'therapeutic' ? CURRICULUM : OPTIMIZATION_CURRICULUM

  return (
    <div className="overflow-hidden">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative">
        {/* Background gradient orbs */}
        <div className="pointer-events-none absolute -top-32 left-1/2 ml-[580px] -translate-x-1/2" aria-hidden="true">
          <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-primary-400 to-violet-400 opacity-30 blur-[160px] will-change-[filter]" />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-[420px] ml-[380px] -translate-x-1/2" aria-hidden="true">
          <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-violet-400 to-primary-300 opacity-25 blur-[160px] will-change-[filter]" />
        </div>
        <div className="absolute inset-0 rounded-bl-[100px] bg-violet-50/60 pointer-events-none -z-10" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                Two Paths to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-violet-500">
                  Wellness & Peak Performance
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                <strong>Therapeutic School:</strong> Clinical treatment for anxiety, depression, sleep, and stress.<br/>
                <strong>Optimization School:</strong> Five Pillars of peak performance and thriving.
              </p>

              {/* Stats */}
              <div className="inline-flex items-center gap-4 md:gap-8 text-center border-y border-gray-200/80 py-4 px-2 mb-8 flex-wrap justify-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{allCourses.length}</div>
                  <div className="text-sm text-gray-500">Total Courses</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{therapeuticLessons}</div>
                  <div className="text-sm text-gray-500">Therapeutic</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">{optimizationLessons}</div>
                  <div className="text-sm text-gray-500">Optimization</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{COMBINED_CURRICULUM.length}</div>
                  <div className="text-sm text-gray-500">Wellness Tracks</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-500">Free</div>
                </div>
              </div>

              {/* School Filter */}
              <div className="flex items-center gap-3 justify-center mb-8">
                <button
                  onClick={() => { setActiveSchool('all'); setActiveTrack('all'); }}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition ${
                    activeSchool === 'all'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Courses
                </button>
                <button
                  onClick={() => { setActiveSchool('therapeutic'); setActiveTrack('all'); }}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition ${
                    activeSchool === 'therapeutic'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  Therapeutic School
                </button>
                <button
                  onClick={() => { setActiveSchool('optimization'); setActiveTrack('all'); }}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition ${
                    activeSchool === 'optimization'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  Optimization School (5 Pillars)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Track filter tabs ───────────────────────────────────────── */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
            <button
              onClick={() => setActiveTrack('all')}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTrack === 'all'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {activeSchool === 'therapeutic' ? 'All Therapeutic' :
               activeSchool === 'optimization' ? 'All Pillars' :
               'All Tracks'}
            </button>
            {availableTracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTrack === track.id
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {TRACK_LABELS[track.id] ?? track.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course card grid ────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Track description when filtered */}
          {activeTrack !== 'all' && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {TRACK_LABELS[activeTrack]}
              </h2>
              <p className="text-gray-500 max-w-2xl">
                {CURRICULUM.find((t) => t.id === activeTrack)?.description}
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => {
              const config = TRACK_CONFIG[course.trackId] ?? {
                gradient: 'from-gray-500 to-gray-600',
                badge: 'bg-gray-100 text-gray-700',
                icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
              }

              return (
                <Link
                  key={course.id}
                  href="/signup"
                  className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Gradient header with icon */}
                  <div className={`relative h-44 bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                    {/* Decorative circles */}
                    <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10" />
                    <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full bg-white/10" />
                    <div className="absolute top-10 left-10 w-6 h-6 rounded-full bg-white/5" />

                    <svg
                      className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={config.icon} />
                    </svg>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Track badge */}
                    <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${config.badge}`}>
                      {course.trackTitle}
                    </span>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">
                      {course.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ~20 min/lesson
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {course.lessons.length} lessons
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative bg-gray-900 rounded-2xl p-10 md:p-16 text-center overflow-hidden shadow-xl">
            {/* Glow effect */}
            <div className="absolute bottom-0 left-1/2 -z-0 -translate-x-1/2 translate-y-1/2" aria-hidden="true">
              <div className="h-56 w-[480px] rounded-full border-[20px] border-primary-500 blur-3xl opacity-50 will-change-[filter]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4 border-y border-gray-700/50 py-4">
                Ready to start learning?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                All {allCourses.length} courses are completely free. Create an account to track your progress,
                earn XP, and get personalized recommendations.
              </p>
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center text-base font-medium text-white bg-gradient-to-t from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 rounded-full px-8 py-3.5 shadow-lg shadow-primary-500/25 transition-all"
              >
                <span className="relative inline-flex items-center">
                  Get Started — It&apos;s Free
                  <span className="ml-2 tracking-normal text-primary-200 transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
