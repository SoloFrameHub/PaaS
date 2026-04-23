'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Demo carousel features
const DEMO_FEATURES = [
  {
    id: 1,
    title: 'Provider Dashboard',
    description: 'Complete patient roster with real-time engagement tracking',
    image: '/images/practices/01-provider-dashboard.png',
  },
  {
    id: 2,
    title: 'Distress Alerts',
    description: 'AI-powered safety monitoring with instant provider notifications',
    image: '/images/practices/03-distress-alerts.png',
  },
  {
    id: 3,
    title: 'Interactive Lessons',
    description: '592 lessons with embedded CBT exercises and therapeutic tools',
    image: '/images/practices/07-interactive-lesson.png',
  },
  {
    id: 4,
    title: 'Patient Analytics',
    description: 'Track completion rates, quiz scores, and learning outcomes',
    image: '/images/practices/10-analytics.png',
  },
  {
    id: 5,
    title: 'Course Catalog',
    description: 'Two schools: Therapeutic + Optimization with 10 wellness tracks',
    image: '/images/practices/09-course-catalog.png',
  },
]

export default function ApplicationPage() {
  const [activeDemoSlide, setActiveDemoSlide] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-violet-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Complete Mental Health Education Platform for Practice Licensing
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Clinical education + peak performance optimization + provider coordination + real-time safety monitoring — unified into one HIPAA-compliant platform
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center text-base font-semibold text-primary-600 bg-white hover:bg-gray-50 rounded-xl px-8 py-4 shadow-lg transition-all"
              >
                Schedule Demo
              </Link>
              <Link
                href="#compare"
                className="inline-flex items-center justify-center text-base font-semibold text-white border-2 border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 rounded-xl px-8 py-4 transition backdrop-blur-sm"
              >
                Compare Options
              </Link>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold">592</div>
                <div className="text-primary-200 text-sm mt-1">Total Lessons</div>
              </div>
              <div>
                <div className="text-3xl font-bold">AI Safety</div>
                <div className="text-primary-200 text-sm mt-1">Distress Detection</div>
              </div>
              <div>
                <div className="text-3xl font-bold">HIPAA</div>
                <div className="text-primary-200 text-sm mt-1">Compliant</div>
              </div>
              <div>
                <div className="text-3xl font-bold">Free</div>
                <div className="text-primary-200 text-sm mt-1">Beta Pricing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem: Fragmented Tools */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Does This Need to Exist?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Without This Platform</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Education: YouTube + PDFs</div>
                    <div className="text-sm text-gray-600">No tracking, no interactivity, no outcomes data</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Safety: Email + Phone Tag</div>
                    <div className="text-sm text-gray-600">React after crisis, no early detection</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Coordination: Spreadsheets</div>
                    <div className="text-sm text-gray-600">Manual tracking, no automation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Revenue: One-time fees only</div>
                    <div className="text-sm text-gray-600">No recurring income from education</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">With This Platform</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Education: Interactive + Tracked</div>
                    <div className="text-sm text-gray-600">592 lessons, quizzes, exercises, outcomes data</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Safety: AI Distress Detection</div>
                    <div className="text-sm text-gray-600">Proactive alerts, early intervention</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Coordination: Unified Dashboard</div>
                    <div className="text-sm text-gray-600">HIPAA-compliant, automated workflows</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Revenue: 70/30 Split</div>
                    <div className="text-sm text-gray-600">Recurring monthly income per patient</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Core Layers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Five Integrated Layers
            </h2>
            <p className="text-xl text-gray-600">
              Not just education. A vertically-integrated practice growth platform.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { title: 'Education', desc: '592 interactive lessons across 2 schools', color: 'bg-blue-500' },
              { title: 'Safety', desc: 'AI-powered distress detection', color: 'bg-red-500' },
              { title: 'Coordination', desc: 'Provider dashboard + patient roster', color: 'bg-purple-500' },
              { title: 'Community', desc: 'Forum + peer support (coming soon)', color: 'bg-emerald-500' },
              { title: 'Revenue', desc: '70/30 subscription split', color: 'bg-amber-500' },
            ].map((layer, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 ${layer.color} rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4`}>
                  {idx + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{layer.title}</h3>
                <p className="text-sm text-gray-600">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your First 15 Minutes - Demo Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your First 15 Minutes
            </h2>
            <p className="text-xl text-gray-600">
              See how providers use the platform to coordinate care and track patient progress
            </p>
          </div>

          {/* Carousel */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Image */}
            <div className="relative bg-gray-100 aspect-[16/9]">
              <Image
                src={DEMO_FEATURES[activeDemoSlide].image}
                alt={DEMO_FEATURES[activeDemoSlide].title}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {activeDemoSlide + 1} / {DEMO_FEATURES.length}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex border-t border-gray-200">
              {DEMO_FEATURES.map((feature, idx) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveDemoSlide(idx)}
                  className={`flex-1 p-6 text-left transition-all border-r border-gray-200 last:border-r-0 hover:bg-gray-50 ${
                    activeDemoSlide === idx ? 'bg-primary-50 border-t-4 border-primary-500' : ''
                  }`}
                >
                  <div className="font-semibold text-gray-900">{feature.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{feature.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Two Schools */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Two-School Architecture</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Therapeutic School</h3>
                <p className="text-blue-800 mb-4">Clinical mental health treatment for anxiety, depression, trauma, OCD, and stress management.</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-blue-900">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    217 lessons across 5 tracks
                  </li>
                  <li className="flex items-center gap-2 text-blue-900">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    CBT, DBT, exposure therapy
                  </li>
                  <li className="flex items-center gap-2 text-blue-900">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Interactive exercises built-in
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-2xl p-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">Optimization School</h3>
                <p className="text-purple-800 mb-4">Five Pillars of peak performance and human optimization for thriving, not just surviving.</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-purple-900">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    375 lessons across 5 pillars
                  </li>
                  <li className="flex items-center gap-2 text-purple-900">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Physical, Social, Mental, Emotional, Purpose
                  </li>
                  <li className="flex items-center gap-2 text-purple-900">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Corporate wellness ready
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section id="compare" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Compare Your Options
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">DIY Resources</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
              <p className="text-gray-600 mb-6">YouTube + PDFs + Spreadsheets</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  No patient tracking
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  No safety monitoring
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  No recurring revenue
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Traditional Platforms</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">$500+</div>
              <p className="text-gray-600 mb-6">Per month, per provider</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Basic patient management
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  No education content
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Practice pays, not patients
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-violet-600 rounded-2xl p-8 shadow-2xl text-white border-4 border-primary-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                BEST VALUE
              </div>
              <h3 className="text-xl font-bold mb-4">This Platform</h3>
              <div className="text-4xl font-bold mb-2">Free*</div>
              <p className="text-primary-100 mb-6">Beta pricing + revenue share</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Complete patient management
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  592 interactive lessons
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  70/30 revenue split on subscriptions
                </li>
              </ul>
              <p className="text-xs text-primary-100">*Free during beta. Licensing fee + revenue share after launch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-violet-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to License the Platform?
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Schedule a 30-minute demo to see the provider portal, education content, and revenue model.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center text-base font-semibold text-primary-600 bg-white hover:bg-gray-50 rounded-xl px-8 py-4 shadow-lg transition-all"
          >
            Schedule Demo →
          </Link>
        </div>
      </section>
    </div>
  )
}
