import Link from 'next/link'

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Platform Architecture
            </h1>
            <p className="text-xl text-gray-300">
              HIPAA-compliant infrastructure built for mental health practices
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Technology Stack
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Next.js 16 (React framework)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Tailwind CSS 4 (styling)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  MDX (interactive lessons)
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  PostgreSQL (primary database)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Redis (caching + sessions)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Drizzle ORM
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI/ML</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  DistilBERT (distress classifier)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  FastAPI (ML service)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  Claude API (AI coach)
                </li>
              </ul>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-gray-50 rounded-2xl p-12 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              System Architecture
            </h3>
            <div className="space-y-6">
              {/* Layer 1: Client */}
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="font-bold text-blue-900 mb-2">Client Layer</div>
                <div className="text-sm text-blue-700">Next.js 16 • React • Tailwind CSS • MDX Interactive Components</div>
              </div>

              <div className="flex justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Layer 2: API */}
              <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200">
                <div className="font-bold text-emerald-900 mb-2">API Layer</div>
                <div className="text-sm text-emerald-700">Next.js API Routes • Lucia Auth • HIPAA Logging • Rate Limiting</div>
              </div>

              <div className="flex justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Layer 3: Services */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                  <div className="font-bold text-purple-900 mb-2">AI Services</div>
                  <div className="text-sm text-purple-700">DistilBERT Classifier • Claude API Coach • RAG Pipeline</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
                  <div className="font-bold text-amber-900 mb-2">Data Services</div>
                  <div className="text-sm text-amber-700">PostgreSQL • Redis • Drizzle ORM • Migrations</div>
                </div>
                <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                  <div className="font-bold text-red-900 mb-2">External Services</div>
                  <div className="text-sm text-red-700">Polar Payments • Email • SMS • Analytics</div>
                </div>
              </div>

              <div className="flex justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              {/* Layer 4: Infrastructure */}
              <div className="bg-gray-900 rounded-xl p-6 border-2 border-gray-700 text-white">
                <div className="font-bold mb-2">Infrastructure Layer</div>
                <div className="text-sm text-gray-300">Dokploy Hosting • HIPAA-Compliant Cloud • Encrypted Storage • Automated Backups</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIPAA Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            HIPAA Compliance
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security Measures</h3>
              <ul className="space-y-3">
                {[
                  'End-to-end encryption for patient data',
                  'Encrypted database storage (AES-256)',
                  'Secure session management (Lucia auth)',
                  'NPI verification for provider authentication',
                  'Role-based access control (RBAC)',
                  'Audit logging for all PHI access',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Privacy Controls</h3>
              <ul className="space-y-3">
                {[
                  'Patient consent tracking and management',
                  'Data retention policies (configurable)',
                  'Secure data deletion workflows',
                  'PHI access logs and monitoring',
                  'Provider-patient data segregation',
                  'Incident response protocols',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Systems */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            AI/ML Systems
          </h2>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
              <h3 className="text-2xl font-bold text-red-900 mb-4">Distress Classifier (DistilBERT)</h3>
              <p className="text-red-800 mb-4">
                Real-time analysis of journal entries, assessments, and forum posts to detect signs of mental distress.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-red-900">Model</div>
                  <div className="text-red-700">DistilBERT (distilled BERT)</div>
                </div>
                <div>
                  <div className="font-semibold text-red-900">Deployment</div>
                  <div className="text-red-700">FastAPI service on Dokploy</div>
                </div>
                <div>
                  <div className="font-semibold text-red-900">Response Time</div>
                  <div className="text-red-700">&lt;500ms average</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border-2 border-purple-200">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">AI Wellness Coach (Claude)</h3>
              <p className="text-purple-800 mb-4">
                Context-aware therapeutic guidance using RAG (Retrieval-Augmented Generation) with course content and patient progress.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-purple-900">Model</div>
                  <div className="text-purple-700">Claude 3.5 Sonnet</div>
                </div>
                <div>
                  <div className="font-semibold text-purple-900">Context</div>
                  <div className="text-purple-700">Patient progress + course content</div>
                </div>
                <div>
                  <div className="font-semibold text-purple-900">Safety</div>
                  <div className="text-purple-700">Built-in crisis protocols</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Flow */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Data Flow & Processing
          </h2>

          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="space-y-8">
              {/* User Action */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Patient Interaction</h3>
                  <p className="text-gray-600">Patient completes lesson, quiz, journal entry, or uses AI coach</p>
                </div>
              </div>

              {/* Data Capture */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Data Capture & Storage</h3>
                  <p className="text-gray-600">Encrypted data stored in PostgreSQL with audit logging</p>
                </div>
              </div>

              {/* Analysis */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">AI Analysis (if applicable)</h3>
                  <p className="text-gray-600">Distress classifier analyzes text for safety concerns</p>
                </div>
              </div>

              {/* Provider Alert */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Provider Notification</h3>
                  <p className="text-gray-600">If distress detected, provider receives instant alert in dashboard</p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Analytics Aggregation</h3>
                  <p className="text-gray-600">De-identified data aggregated for completion rates, quiz scores, engagement metrics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Questions About the Architecture?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Schedule a technical deep dive with our team
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-xl px-8 py-4 shadow-lg transition-all"
          >
            Schedule Technical Demo
          </Link>
        </div>
      </section>
    </div>
  )
}
