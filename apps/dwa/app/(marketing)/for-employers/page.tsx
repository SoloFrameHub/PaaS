import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Employers & Benefits | Digital Wellness Academy',
  description: 'Wellness employees actually use. Peak-performance framing drives 10-20x higher engagement than traditional EAPs. Reduce burnout, improve satisfaction, differentiate benefits.',
}

export default function ForEmployersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-200 text-sm font-medium mb-6 border border-purple-400/30">
              For Employers & Corporate Wellness
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Wellness your employees actually use
            </h1>

            <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mx-auto mb-10">
              Peak-performance framing drives 10-20x higher engagement than traditional EAPs.
              Deploy under your brand to reduce burnout, improve satisfaction, and differentiate your benefits package.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/request-demo"
                className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg text-base"
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
                Browse Courses
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
              Traditional EAPs get 2-5% utilization
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Employees won't use something labeled "crisis support" or "mental health assistance."
              The stigma prevents engagement, even when employees need help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-red-200">
              <div className="text-4xl font-bold text-red-600 mb-2">2-5%</div>
              <div className="text-sm font-medium text-gray-600">Average EAP utilization rate</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-orange-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">76%</div>
              <div className="text-sm font-medium text-gray-600">Report burnout symptoms annually</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-amber-200">
              <div className="text-4xl font-bold text-amber-600 mb-2">$300B+</div>
              <div className="text-sm font-medium text-gray-600">Annual cost of workplace stress in the US</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Peak-performance framing changes everything
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Frame wellness as growth, not crisis. Employees see it as professional development,
              leadership training, and performance optimization — not "mental health assistance."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What Employees Get</h3>
              <ul className="space-y-3">
                {[
                  'Focus & productivity courses (digital wellbeing, deep work, attention)',
                  'Resilience training (stress management, emotional regulation)',
                  'Sleep optimization (evidence-based CBT-I frameworks)',
                  'Leadership development (emotional intelligence, communication)',
                  'Burnout prevention (boundary-setting, energy management)',
                  'Movement & nutrition (brain health, cognitive performance)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What You Get</h3>
              <ul className="space-y-3">
                {[
                  '10-20x higher engagement than traditional EAPs',
                  'Reduced absenteeism and presenteeism',
                  'Improved employee satisfaction and retention',
                  'Differentiated benefits package for talent acquisition',
                  'Measurable outcomes (completion rates, engagement, feedback)',
                  'Deploy under your brand — looks like you built it',
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

      {/* Use Cases */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Common deployment scenarios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Organizations use Digital Wellness Academy for burnout prevention, onboarding, manager training,
              and return-to-work support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Burnout Prevention */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Burnout Prevention Program</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                High-stress teams (customer support, healthcare, tech) complete resilience, boundary-setting,
                and stress management courses. Ongoing access reduces burnout by 30-40% in pilot programs.
              </p>
              <div className="text-sm font-medium text-orange-600">
                Popular courses: Digital Wellbeing, Stress Resilience, Sleep Optimization
              </div>
            </div>

            {/* New Hire Onboarding */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">New Hire Onboarding</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Assign "Focus & Productivity" and "Workplace Resilience" courses during first 30 days.
                Shows you invest in employee growth from day one, improves retention, differentiates culture.
              </p>
              <div className="text-sm font-medium text-blue-600">
                Popular courses: Focus Fundamentals, Emotional Intelligence, Building Resilience
              </div>
            </div>

            {/* Manager Training */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Manager Resilience Training</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Managers complete emotional intelligence, communication, and stress resilience courses.
                Better-equipped leaders create healthier teams, reduce turnover, improve culture.
              </p>
              <div className="text-sm font-medium text-purple-600">
                Popular courses: Emotional Intelligence, Effective Communication, Resilience Under Pressure
              </div>
            </div>

            {/* Return-to-Work */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Return-to-Work Support</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Employees returning from medical leave or burnout access self-paced courses on stress management,
                boundary-setting, and resilience. Supports gradual reintegration without stigma.
              </p>
              <div className="text-sm font-medium text-emerald-600">
                Popular courses: Stress Management, Sleep Optimization, Building Healthy Boundaries
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Everything included in your license
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: '40+ Courses',
                desc: '592 interactive lessons covering focus, resilience, sleep, stress, movement, nutrition, and life design.',
              },
              {
                title: 'Personalized Onboarding',
                desc: '9-step onboarding recommends the right courses for each employee's role, goals, and challenges.',
              },
              {
                title: '24/7 AI Coach',
                desc: 'Practice skills anytime with MAIA, the AI wellness coach. Privacy-first architecture, no data stored.',
              },
              {
                title: 'White-Label Deployment',
                desc: 'Deploy under your brand with custom logo, colors, and domain. Looks like you built it.',
              },
              {
                title: 'Admin Dashboard',
                desc: 'Track enrollment, engagement, completion rates. Export reports for leadership and HR.',
              },
              {
                title: 'Privacy & Security',
                desc: 'Enterprise-grade security with audit logging, encryption, and privacy-first AI architecture.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Flexible licensing options
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the model that works best for your organization. All options include full platform access,
              white-label deployment, and ongoing content updates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Per-Seat Licensing */}
            <div className="bg-white p-8 rounded-xl border-2 border-purple-200 shadow-sm">
              <div className="text-sm font-semibold text-purple-600 mb-2">MOST POPULAR</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Per-Seat Licensing</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Pay per active employee per month. Ideal for organizations with 50-5,000 employees.
                Scale up or down as your team grows.
              </p>
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Starting at</div>
                <div className="text-4xl font-extrabold text-gray-900">Contact us</div>
                <div className="text-sm text-gray-500 mt-1">Volume discounts available</div>
              </div>
              <Link
                href="/request-demo"
                className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Request Pricing
              </Link>
            </div>

            {/* Enterprise Licensing */}
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-sm font-semibold text-gray-400 mb-2">ENTERPRISE</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Enterprise Licensing</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Unlimited employees, custom integrations, SSO, dedicated support, and priority feature requests.
                For organizations with 5,000+ employees.
              </p>
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Custom pricing</div>
                <div className="text-4xl font-extrabold text-gray-900">Contact us</div>
                <div className="text-sm text-gray-500 mt-1">Includes custom development</div>
              </div>
              <Link
                href="/request-demo"
                className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            See how it works for your team
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Request a demo to explore the platform, review pricing options, and discuss deployment for your organization.
          </p>
          <Link
            href="/request-demo"
            className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg text-lg"
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
