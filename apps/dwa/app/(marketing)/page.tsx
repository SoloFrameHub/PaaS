import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Digital Wellness Academy | Mental Health Education Platform for Organizations',
  description: 'Complete digital wellness platform with education, AI coaching, provider tools, analytics, and community. Deploy under your brand. HIPAA-ready. White-label customization included.',
}

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full text-blue-200 text-sm font-medium mb-6 border border-blue-400/30">
              Licensable Digital Wellness Platform
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Support your patients, employees, and members with structured digital wellness education
            </h1>

            {/* Sub-headline */}
            <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-10">
              Complete digital wellness platform with education, AI coaching, provider coordination, analytics, and community. Deploy under your brand to drive engagement and outcomes with enterprise-grade privacy.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg text-base"
              >
                Request Demo
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition border border-white/30 backdrop-blur-sm text-base"
              >
                Browse Course Library
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">592</div>
                <div className="text-sm text-slate-300">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">40+</div>
                <div className="text-sm text-slate-300">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">2</div>
                <div className="text-sm text-slate-300">Schools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-1">100%</div>
                <div className="text-sm text-slate-300">Evidence-Based</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Built for organizations that care about wellness
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mental health practices, employers, platforms, and universities license Digital Wellness Academy
              to extend care, drive engagement, and improve outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Clinics & Practices */}
            <Link
              href="/for-practices"
              className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Clinics & Practitioners</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Extend patient care beyond the session. Assign courses like homework, track progress,
                and get real-time crisis alerts. HIPAA-ready infrastructure included.
              </p>
              <span className="inline-flex items-center text-blue-600 font-medium group-hover:underline">
                Learn more →
              </span>
            </Link>

            {/* Employers & Benefits */}
            <Link
              href="/for-employers"
              className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-purple-400 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Employers & Benefits</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Wellness employees actually use. Peak-performance framing drives 10-20x higher engagement
                than traditional EAPs. Reduce burnout, improve satisfaction, differentiate benefits.
              </p>
              <span className="inline-flex items-center text-purple-600 font-medium group-hover:underline">
                Learn more →
              </span>
            </Link>

            {/* Platforms & Networks */}
            <Link
              href="/for-platforms"
              className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-emerald-400 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Platforms & Networks</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                White-label a complete wellness layer for your digital health platform, provider network,
                or member portal. Launch in weeks, not years. Proven content with engagement data.
              </p>
              <span className="inline-flex items-center text-emerald-600 font-medium group-hover:underline">
                Learn more →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              What's included when you license
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A complete digital wellness solution. Deploy under your brand in days, not months.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Comprehensive Course Library */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Evidence-Based Content Library</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                592 interactive lessons across therapeutic and optimization schools. Evidence-based frameworks (CBT, DBT, ERP, ACT) with quizzes, exercises, breathing tools, thought records, and assessments built in.
              </p>
              <Link href="/courses" className="text-blue-600 font-medium hover:underline">
                Browse the full catalog →
              </Link>
            </div>

            {/* Personalized Onboarding */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Onboarding</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                9-step onboarding collects 30+ data points to recommend the right courses for each user's needs.
                No overwhelming catalogs — users get exactly what they need when they need it.
              </p>
            </div>

            {/* Provider Coordination */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Provider Coordination (Optional)</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                For clinical deployments: Assign courses like homework, track patient progress, see mood trends,
                and get real-time crisis alerts when patients need you most.
              </p>
            </div>

            {/* AI Wellness Coach */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Wellness Coach (MAIA)</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                24/7 support for skill practice between sessions or shifts. Privacy-first AI analyzes distress
                without storing text. Crisis detection with provider alerts for clinical deployments.
              </p>
            </div>

            {/* Analytics & Insights */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics & Insights</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Track engagement, completion rates, quiz scores, and outcomes. Export reports for stakeholders.
                Real-time improvement loop — courses get better based on feedback and usage data.
              </p>
            </div>

            {/* White-Label Deployment */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">White-Label Deployment</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Deploy under your brand with custom logo, colors, domain, and messaging. Looks like you built it.
                No "powered by" branding required (though available if preferred).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two-School Architecture */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Serve both clinical and wellness audiences
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Two-school architecture lets you support patients AND employees, clinical care AND peak performance — all on one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Therapeutic School */}
            <div className="bg-white p-8 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Therapeutic School</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Clinical mental health education for anxiety, depression, OCD, PTSD, sleep disorders, and more.
                Evidence-based frameworks (CBT, DBT, ERP, ACT). HIPAA-ready with provider coordination and crisis monitoring.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">Anxiety & Fear</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">Mood & Emotions</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">Sleep</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">Trauma</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">Stress</span>
              </div>
            </div>

            {/* Optimization School */}
            <div className="bg-white p-8 rounded-xl border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Optimization School</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Peak-performance education for focus, resilience, digital wellbeing, movement, nutrition, and life design.
                Stigma-free framing drives 10-20x higher engagement than crisis-labeled programs.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full">Focus & Flow</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full">Resilience</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full">Digital Wellbeing</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full">Movement</span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm font-medium rounded-full">Nutrition</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Trust Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 md:p-14 text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-400/30">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Enterprise-grade privacy and security
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              HIPAA-ready infrastructure, SOC 2 compliance in progress, audit logging, encryption in transit and at rest.
              Privacy-first AI architecture — text analysis without storage (zero-knowledge distress detection).
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                HIPAA-Ready (BAA Available)
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                SOC 2 In Progress
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Audit Logging
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Zero-Knowledge AI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Ready to see it in action?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Request a demo to explore the platform, review the course catalog, and discuss licensing options
            for your organization.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg text-lg"
          >
            Request Demo
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
