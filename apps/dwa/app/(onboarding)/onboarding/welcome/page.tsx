'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'

export default function WelcomePage() {
    const router = useRouter()
    const { data, updateData, setCurrentStep } = useOnboarding()
    const [displayName, setDisplayName] = useState(data.displayName || '')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        updateData({
            displayName: displayName.trim() || undefined,
            onboardingStartedAt: new Date().toISOString(),
        })

        // Save to server if user has a display name
        if (displayName.trim()) {
            try {
                const res = await fetch('/api/onboarding/basic-info', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ displayName: displayName.trim() }),
                })
                if (!res.ok) throw new Error('Failed to save')
            } catch (err) {
                console.error('Error saving display name:', err)
                setError('Failed to save your info. Please try again.')
                return
            }
        }

        setCurrentStep(2)
        router.push('/onboarding/symptoms')
    }

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={1} totalSteps={8} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-xl w-full">
                        {/* Welcome Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Welcome to Wellness Academy
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                Your journey to better mental wellness starts here.
                            </p>
                        </div>

                        {/* What to Expect Card */}
                        <div className="bg-violet-50 dark:bg-violet-900/20 rounded-2xl p-6 mb-8">
                            <h2 className="font-semibold text-violet-900 dark:text-violet-100 mb-3">
                                What to expect
                            </h2>
                            <ul className="space-y-2 text-violet-800 dark:text-violet-200 text-sm">
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Evidence-based courses on anxiety, depression, sleep, and more</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Practical coping techniques you can use right away</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>AI wellness coach for personalized support</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Track your progress and celebrate your growth</span>
                                </li>
                            </ul>
                        </div>

                        {/* Important Notice */}
                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mb-8 border border-amber-200 dark:border-amber-800">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-amber-800 dark:text-amber-200">
                                    <strong>Please note:</strong> This is an educational platform, not a substitute for professional mental health treatment. If you&apos;re in crisis, call 988 or 911.
                                </p>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Optional Name Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="display-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    What would you like us to call you? <span className="text-gray-400">(optional)</span>
                                </label>
                                <input
                                    id="display-name"
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Enter a name or nickname"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    This is just for personalizing your experience. You can skip this.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98]"
                            >
                                Let&apos;s Get Started
                            </button>
                        </form>

                        {/* Time Estimate */}
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                            This takes about 3-5 minutes
                        </p>
                    </div>
                </div>

                {/* Crisis Resources Footer - Always Visible */}
                <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-4">
                    <div className="max-w-xl mx-auto flex items-center justify-center gap-4 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Need immediate help?</span>
                        <a
                            href="tel:988"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call/Text 988
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}
