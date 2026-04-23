import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Platforms & Networks | Digital Wellness Academy',
  description: 'White-label a complete wellness layer for your digital health platform, provider network, or member portal. Launch in weeks, not years. Proven content with 6+ months of engagement data.',
}

export default function ForPlatformsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-200 text-sm font-medium mb-6 border border-emerald-400/30">
              For Platforms & Networks
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Launch wellness in weeks, not years
            </h1>

            <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-10">
              White-label a complete digital wellness layer for your platform, network, or member portal.
              Proven content, turnkey infrastructure, and 6+ months of engagement data included.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg text-base"
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
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Building a wellness content library takes 12-18 months and $500K-$2M
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Creating evidence-based courses, interactive components, onboarding flows, analytics infrastructure,
              and AI systems requires a dedicated team and significant capital investment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-red-200">
              <div className="text-4xl font-bold text-red-600 mb-2">12-18</div>
              <div className="text-sm font-medium text-gray-600">Months to build from scratch</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-orange-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">$500K+</div>
              <div className="text-sm font-medium text-gray-600">Development and content costs</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-amber-200">
              <div className="text-4xl font-bold text-amber-600 mb-2">6-12</div>
              <div className="text-sm font-medium text-gray-600">Months to gather engagement data</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              License turnkey wellness infrastructure
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Deploy proven content, infrastructure, and engagement systems in days. Integrate via API,
              white-label under your brand, and start driving member engagement immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl border border-emerald-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What You Get</h3>
              <ul className="space-y-3">
                {[
                  '592 evidence-based lessons across clinical and optimization schools',
                  'Personalized onboarding with 30+ data points collected',
                  'Interactive components (breathing, thought records, assessments)',
                  '24/7 AI wellness coach with privacy-first architecture',
                  'Analytics dashboard with completion rates, engagement metrics',
                  'Proven content with 6+ months of real-world usage data',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why This Matters</h3>
              <ul className="space-y-3">
                {[
                  'Launch wellness offering in weeks, not 12-18 months',
                  'Differentiate from competitors without building',
                  'Proven content eliminates product-market fit risk',
                  'White-label customization maintains your brand identity',
                  'Flexible licensing: SaaS, revenue-share, or full licensing',
                  'Ongoing updates and new content included',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Integrate however you need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              RESTful API, SSO via SAML/OAuth, webhooks for real-time events, embeddable iframe, or full white-label deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* API Integration */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">RESTful API</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Create users, assign courses, pull progress data, sync analytics. Full API documentation included.
              </p>
            </div>

            {/* SSO */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">SSO Integration</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                SAML 2.0 and OAuth 2.0 support. Members sign in once and access wellness content seamlessly.
              </p>
            </div>

            {/* Webhooks */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Webhooks</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Real-time notifications for course completions, quiz scores, crisis alerts, and user milestones.
              </p>
            </div>

            {/* Embeddable */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Embeddable Iframe</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Embed courses directly in your portal. Fully responsive, matches your brand theme automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Who licenses Digital Wellness Academy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Digital Health Platforms */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Digital Health Platforms</h3>
              <p className="text-gray-600 leading-relaxed">
                Add wellness education to telehealth platforms, mental health apps, or patient portals.
                Differentiate from competitors without building from scratch.
              </p>
            </div>

            {/* Provider Networks */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Provider Networks</h3>
              <p className="text-gray-600 leading-relaxed">
                Offer wellness education to members across your network. Track engagement, measure outcomes,
                and create stickiness beyond appointment scheduling.
              </p>
            </div>

            {/* Insurance & Payers */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Insurance & Payers</h3>
              <p className="text-gray-600 leading-relaxed">
                Add preventive wellness education to member portals. Drive engagement beyond claims,
                reduce utilization, and improve member satisfaction scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Models */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Flexible revenue models
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the licensing model that aligns with your business. All options include full platform access
              and ongoing content updates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* White-Label SaaS */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">White-Label SaaS</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Monthly or annual license fee per member. Includes hosting, updates, support, and white-label customization.
                Terms negotiable based on volume.
              </p>
              <div className="text-sm font-medium text-blue-600">Most common for platforms</div>
            </div>

            {/* Revenue Share */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Revenue Share</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Split subscription or transaction revenue. Align incentives — you succeed when we succeed.
                Typical splits: 70/30 or 60/40.
              </p>
              <div className="text-sm font-medium text-purple-600">Ideal for early-stage platforms</div>
            </div>

            {/* Full Licensing */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Full Licensing</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                License content and infrastructure outright. Self-host, customize deeply, own deployment.
                Includes source code and ongoing updates for a defined period.
              </p>
              <div className="text-sm font-medium text-emerald-600">Enterprise-scale platforms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Let's discuss your integration
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Schedule a technical demo to review API documentation, white-label customization,
            and licensing options for your platform.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg text-lg"
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
