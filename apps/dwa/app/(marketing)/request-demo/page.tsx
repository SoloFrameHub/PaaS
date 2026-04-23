import { Metadata } from 'next'
import DemoRequestForm from '@/components/forms/demo-request-form'

export const metadata: Metadata = {
  title: 'Request Demo | Digital Wellness Academy',
  description: 'Request a demo of the Digital Wellness Academy platform. Get complementary access to explore courses, provider tools, and analytics.',
}

export default function RequestDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-700">Complementary Demo Access</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Experience the Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get full access to explore the course library, provider coordination tools,
            analytics dashboard, and AI wellness coach. No credit card required.
          </p>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What's Included in Your Demo
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Full Course Access</h3>
              <p className="text-gray-600 text-sm">
                Browse 40+ courses across clinical and optimization schools. Experience interactive lessons, quizzes, and exercises.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Provider Tools</h3>
              <p className="text-gray-600 text-sm">
                See the provider dashboard, assignment system, progress tracking, and analytics (if you're a practitioner).
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Wellness Coach</h3>
              <p className="text-gray-600 text-sm">
                Try the 24/7 AI coach, see crisis detection in action, and experience personalized support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Request Your Demo Access
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Fill out the form below and we'll email you login credentials within minutes.
            </p>

            <DemoRequestForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Common Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg border border-gray-200 p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                How long does demo access last?
                <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                Your demo access is valid for 14 days. If you need more time to evaluate the platform, contact us and we'll extend it.
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                What happens after the demo period?
                <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                Your demo account will remain active with read-only access. To license the platform for your practice or organization, we'll schedule a call to discuss pricing and deployment options.
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                Can I invite my team to try the demo?
                <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                Yes! Once you have demo access, you can request additional demo accounts for colleagues. Contact us with their details and we'll set them up.
              </p>
            </details>

            <details className="bg-white rounded-lg border border-gray-200 p-6 group">
              <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                Is there a credit card required?
                <svg className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-600 mt-4">
                No. Demo access is completely free with no credit card required. This is a full-featured trial so you can properly evaluate the platform.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  )
}
