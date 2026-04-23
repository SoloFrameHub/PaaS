import Link from 'next/link'
import { FeatureScreenshot } from './feature-screenshot'

export default function ForPracticesPage() {
  return (
    <div className="overflow-hidden">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative">
        {/* Background gradient */}
        <div className="pointer-events-none absolute -top-32 left-1/2 ml-[580px] -translate-x-1/2" aria-hidden="true">
          <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-primary-400 to-violet-400 opacity-30 blur-[160px] will-change-[filter]" />
        </div>
        <div className="absolute inset-0 rounded-bl-[100px] bg-violet-50/60 pointer-events-none -z-10" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">Revenue Share Model • HIPAA Compliant • Proven Results</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                Grow Your Practice with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-violet-500">
                  Licensed Mental Health Education
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed">
                A complete platform combining clinical treatment education, peak performance optimization,
                provider coordination, and real-time safety monitoring. License it for your practice,
                customize it to your brand, and share subscription revenue.
              </p>

              {/* Stats */}
              <div className="inline-flex items-center gap-4 md:gap-8 text-center border-y border-gray-200/80 py-4 px-2 mb-8 flex-wrap justify-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">592</div>
                  <div className="text-sm text-gray-500">Lessons</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">2 Schools</div>
                  <div className="text-sm text-gray-500">Therapeutic + Optimization</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">10 Tracks</div>
                  <div className="text-sm text-gray-500">Wellness Pathways</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <div className="text-2xl font-bold text-emerald-600">HIPAA</div>
                  <div className="text-sm text-gray-500">Compliant</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center text-base font-medium text-white bg-gradient-to-t from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 rounded-full px-8 py-3.5 shadow-lg shadow-primary-500/25 transition-all"
                >
                  Schedule a Demo
                  <span className="ml-2 tracking-normal text-primary-200 transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center text-base font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-full px-8 py-3.5 border border-gray-200 transition"
                >
                  See Features
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Platform Features ───────────────────────────────────────── */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Engage and Support Your Patients
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              A picture is worth a thousand words. Here's what the platform looks like in action.
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1: Provider Portal Dashboard */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <FeatureScreenshot
                  imagePath="/images/practices/01-provider-dashboard.png"
                  alt="Provider dashboard showing patient roster and progress tracking"
                  gradientFrom="from-blue-50"
                  gradientTo="to-indigo-50"
                  iconBg="bg-blue-500"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  }
                  fallbackTitle="[Provider Dashboard Screenshot]"
                  fallbackDescription="Patient roster, progress tracking, alerts"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #1
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Provider Portal Dashboard
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  See all your patients in one place. Track their progress through courses, monitor mood trends,
                  and identify who might need extra support. The dashboard shows completion rates, engagement metrics,
                  and recent activity at a glance.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Real-time patient roster with engagement status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Progress tracking across therapeutic and optimization schools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Quick access to patient details, session prep, and notes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2: Real-time Distress Detection */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #2
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Real-Time Distress Detection &amp; Crisis Alerts
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our DistilBERT-powered classifier analyzes journal entries, assessments, and forum posts in real-time
                  to detect signs of distress. When a patient shows concerning patterns, you're notified immediately
                  so you can reach out proactively.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>AI-powered distress detection (DistilBERT classifier)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Instant provider alerts for high-risk patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Automatic 988 Lifeline display for users in crisis</span>
                  </li>
                </ul>
              </div>
              <div>
                <FeatureScreenshot
                  imagePath="/images/practices/03-distress-alerts.png"
                  alt="Real-time distress detection alerts for patient safety monitoring"
                  gradientFrom="from-red-50"
                  gradientTo="to-orange-50"
                  iconBg="bg-red-500"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  }
                  fallbackTitle="[Distress Alert Screenshot]"
                  fallbackDescription="Real-time AI safety monitoring"
                />
              </div>
            </div>

            {/* Feature 3: Interactive Therapeutic Lessons */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <FeatureScreenshot
                  imagePath="/images/practices/07-interactive-lesson.png"
                  alt="Interactive lesson with CBT exercises and therapeutic tools"
                  gradientFrom="from-purple-50"
                  gradientTo="to-pink-50"
                  iconBg="bg-purple-500"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  }
                  fallbackTitle="[Interactive Lesson Screenshot]"
                  fallbackDescription="CBT exercises, thought records, breathing techniques"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #3
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Interactive Therapeutic Lessons
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Not just videos and text. Every lesson includes interactive components like breathing exercises,
                  exposure hierarchy builders, thought records, CBT diagrams, and mindfulness practices. Patients
                  learn by doing, not just reading.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Guided breathing exercises with visual pacing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Thought records and cognitive restructuring tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Exposure hierarchy builders, grounding techniques, skill practice</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 4: Two-School Architecture */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #4
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Two Schools: Clinical + Peak Performance
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  <strong>Therapeutic School:</strong> Clinical mental health education for anxiety, depression, trauma, OCD, and more.<br/>
                  <strong>Optimization School:</strong> Five Pillars of peak performance — Physical Vitality, Social Connection,
                  Mental Clarity, Emotional Resilience, Purpose &amp; Meaning.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>217 therapeutic lessons + 375 optimization lessons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Serve both clinical patients and wellness-focused clients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Expand TAM: clinical + corporate wellness opportunities</span>
                  </li>
                </ul>
              </div>
              <div>
                <FeatureScreenshot
                  imagePath="/images/practices/09-course-catalog.png"
                  alt="Two-school architecture showing therapeutic and optimization tracks"
                  gradientFrom="from-indigo-50"
                  gradientTo="to-blue-50"
                  iconBg="bg-indigo-500"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  }
                  fallbackTitle="[Two-School Dashboard]"
                  fallbackDescription="Therapeutic + Optimization tracks"
                />
              </div>
            </div>

            {/* Feature 5: Patient Progress Analytics */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <FeatureScreenshot
                  imagePath="/images/practices/10-analytics.png"
                  alt="Patient progress analytics and engagement metrics dashboard"
                  gradientFrom="from-emerald-50"
                  gradientTo="to-teal-50"
                  iconBg="bg-emerald-500"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  }
                  fallbackTitle="[Analytics Dashboard Screenshot]"
                  fallbackDescription="Completion rates, quiz scores, engagement trends"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #5
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Data-Driven Patient Analytics
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  See which lessons are most effective, track completion rates, monitor quiz performance, and identify
                  patterns across your patient population. Use real data to inform treatment plans and measure outcomes.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Course completion rates and engagement metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Quiz scores and learning outcomes tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Metabase integration for custom reporting (coming soon)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 6: Revenue Share Model */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #6
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Practice Growth Revenue Model
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  License the platform for your practice and share subscription revenue. You promote it to your patients,
                  they subscribe, you earn recurring income. No customer acquisition cost on your end — you already have
                  the relationship.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Revenue share on patient subscriptions (e.g., 70/30 split)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Licensing fee + customization options available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Real-time revenue dashboard showing your subscription performance</span>
                  </li>
                </ul>
              </div>
              <div>
                <FeatureScreenshot
                  imagePath="/images/practices/06-revenue-dashboard.png"
                  alt="Revenue dashboard showing subscription tracking and performance"
                  gradientFrom="from-amber-50"
                  gradientTo="to-yellow-50"
                  iconBg="bg-amber-500"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  fallbackTitle="[Revenue Dashboard Screenshot]"
                  fallbackDescription="Subscription tracking, revenue share reporting"
                />
              </div>
            </div>

            {/* Feature 7: HIPAA-Compliant Infrastructure */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <FeatureScreenshot
                  imagePath="/images/practices/11-security.png"
                  alt="HIPAA-compliant security architecture and data protection"
                  gradientFrom="from-gray-50"
                  gradientTo="to-slate-50"
                  iconBg="bg-gray-700"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                  fallbackTitle="[Security Architecture]"
                  fallbackDescription="HIPAA-compliant infrastructure, encrypted data"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #7
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  HIPAA-Compliant Security
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Built on HIPAA-compliant infrastructure with encrypted data storage, secure provider-patient coordination,
                  and NPI verification for providers. Patient data is protected with industry-standard security measures.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>HIPAA-compliant infrastructure (Google Cloud BAA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>NPI verification for provider authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Encrypted patient data, secure session management (Lucia auth)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 8: AI Wellness Coach */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #8
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  AI Wellness Coach Integration
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Patients can practice coping techniques with an AI wellness coach between sessions. The coach provides
                  guided support, reinforces skills learned in lessons, and helps patients apply therapeutic concepts to
                  their daily lives.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>24/7 AI coaching for skill practice and reinforcement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Context-aware based on patient progress and lessons completed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Extends care between sessions without adding provider workload</span>
                  </li>
                </ul>
              </div>
              <div>
                <FeatureScreenshot
                  imagePath="/images/practices/08-ai-coach.png"
                  alt="AI wellness coach interface with therapeutic guidance"
                  gradientFrom="from-violet-50"
                  gradientTo="to-purple-50"
                  iconBg="bg-violet-500"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  }
                  fallbackTitle="[AI Coach Interface]"
                  fallbackDescription="Guided support, skill practice, therapeutic reinforcement"
                />
              </div>
            </div>

            {/* Feature 9: Community Forum */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <FeatureScreenshot
                  imagePath="/images/practices/12-forum.png"
                  alt="Community forum with peer support and moderated discussions"
                  gradientFrom="from-cyan-50"
                  gradientTo="to-blue-50"
                  iconBg="bg-cyan-500"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                  fallbackTitle="[Community Forum (Coming Soon)]"
                  fallbackDescription="Peer support, moderated discussions, engagement"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block bg-cyan-100 text-cyan-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #9 (Coming Soon)
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Community Forum &amp; Peer Support
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Patients can connect with others on similar journeys through moderated forum discussions. Peer support
                  increases engagement, reduces isolation, and provides real-world feedback signals for improving content.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Moderated peer support discussions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Distress detection on forum posts for safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Engagement signals for content improvement (analytics moat)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 10: White-Label Customization */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Feature #10
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  White-Label &amp; Customization
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Brand the platform as your own. Customize colors, logos, domain, and welcome messaging to match your
                  practice identity. Patients see your brand, you maintain the relationship.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Custom branding: logos, colors, domain names</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>White-label optimization school content (rebrand for corporate wellness)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Maintain practice identity and patient relationship</span>
                  </li>
                </ul>
              </div>
              <div>
                <FeatureScreenshot
                  imagePath="/images/practices/13-customization.png"
                  alt="White-label customization dashboard with branding options"
                  gradientFrom="from-pink-50"
                  gradientTo="to-rose-50"
                  iconBg="bg-pink-500"
                  fallbackIcon={
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  }
                  fallbackTitle="[Customization Dashboard]"
                  fallbackDescription="Branding, logos, colors, domain setup"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why This Works ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Practices Choose This Platform
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              The only platform built specifically for practice licensing with revenue share.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recurring Revenue</h3>
              <p className="text-gray-600 leading-relaxed">
                Share subscription revenue from your patients. You promote, they subscribe, you earn. No CAC on your end.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Patient Safety</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time distress detection alerts you when patients need support. HIPAA-compliant infrastructure.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven Outcomes</h3>
              <p className="text-gray-600 leading-relaxed">
                Track engagement, completion rates, and learning outcomes. Use real data to measure patient progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative bg-gradient-to-r from-primary-600 to-violet-600 rounded-3xl p-10 md:p-16 text-center overflow-hidden shadow-2xl">
            {/* Glow effect */}
            <div className="absolute bottom-0 left-1/2 -z-0 -translate-x-1/2 translate-y-1/2" aria-hidden="true">
              <div className="h-56 w-[480px] rounded-full border-[20px] border-white/20 blur-3xl opacity-50 will-change-[filter]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to see it in action?
              </h2>
              <p className="text-primary-100 text-lg mb-10 max-w-xl mx-auto">
                Schedule a demo to see the provider portal, interactive lessons, and analytics dashboard.
                Learn how the revenue share model works for your practice.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center text-base font-medium text-primary-600 bg-white hover:bg-gray-50 rounded-full px-8 py-3.5 shadow-lg transition-all"
                >
                  Schedule a Demo
                  <span className="ml-2 tracking-normal transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
                <a
                  href="mailto:aistartuplaunch@gmail.com"
                  className="inline-flex items-center justify-center text-base font-medium text-white border-2 border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 rounded-full px-8 py-3.5 transition backdrop-blur-sm"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
