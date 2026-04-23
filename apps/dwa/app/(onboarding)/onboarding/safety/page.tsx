'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'
import type { CrisisRiskLevel } from '@/types/wellness-profile'

export default function SafetyPage() {
    const router = useRouter()
    const { data, updateCrisisScreening, calculateCrisisRisk, updateData, setCurrentStep } = useOnboarding()

    const [hasThoughtsSuicide, setHasThoughtsSuicide] = useState<boolean | null>(null)
    const [hasThoughtsSelfHarm, setHasThoughtsSelfHarm] = useState<boolean | null>(null)
    const [hasImmediateDanger, setHasImmediateDanger] = useState(false)
    const [hasPlanOrMeans, setHasPlanOrMeans] = useState(false)
    const [acknowledged988, setAcknowledged988] = useState(false)
    const [showCrisisModal, setShowCrisisModal] = useState(false)
    const [crisisLevel, setCrisisLevel] = useState<CrisisRiskLevel>('none')
    const [error, setError] = useState<string | null>(null)

    // Calculate risk level whenever answers change
    useEffect(() => {
        let level: CrisisRiskLevel = 'none'

        if (hasPlanOrMeans || hasImmediateDanger) {
            level = 'immediate'
        } else if (hasThoughtsSuicide && hasThoughtsSelfHarm) {
            level = 'high'
        } else if (hasThoughtsSuicide || hasThoughtsSelfHarm) {
            level = 'moderate'
        }

        setCrisisLevel(level)

        // Show crisis modal for high/immediate risk
        if (level === 'immediate' || level === 'high') {
            setShowCrisisModal(true)
        }
    }, [hasThoughtsSuicide, hasThoughtsSelfHarm, hasImmediateDanger, hasPlanOrMeans])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Update crisis screening data
        updateCrisisScreening({
            hasCurrentSuicidalThoughts: hasThoughtsSuicide ?? false,
            hasSelfHarmThoughts: hasThoughtsSelfHarm ?? false,
            hasImmediateDangerConcern: hasImmediateDanger,
            hasPlanOrMeans,
            riskLevel: crisisLevel,
            acknowledged988Resources: acknowledged988 || crisisLevel === 'none',
            screenedAt: new Date().toISOString(),
        })

        updateData({ crisisScreeningCompleted: true })

        // Save to server
        try {
            const res = await fetch('/api/onboarding/crisis-screening', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hasCurrentSuicidalThoughts: hasThoughtsSuicide ?? false,
                    hasSelfHarmThoughts: hasThoughtsSelfHarm ?? false,
                    hasImmediateDangerConcern: hasImmediateDanger,
                    hasPlanOrMeans,
                    riskLevel: crisisLevel,
                    acknowledged988Resources: acknowledged988 || crisisLevel === 'none',
                }),
            })
            if (!res.ok) throw new Error('Failed to save')
        } catch (err) {
            console.error('Error saving crisis screening:', err)
            setError('Failed to save your responses. Please try again.')
            return
        }

        setCurrentStep(4)
        router.push('/onboarding/goals')
    }

    const handleBack = () => {
        setCurrentStep(2)
        router.push('/onboarding/symptoms')
    }

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={3} totalSteps={8} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-xl w-full">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Your Safety Matters
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Before we continue, we want to make sure you have the right support. These questions help us connect you with appropriate resources.
                            </p>
                        </div>

                        {/* Safety Check Notice */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-8 border border-blue-200 dark:border-blue-800">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    Your responses are confidential and help us ensure you have access to the right resources. There are no wrong answers.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Safety Questions */}
                            <div className="space-y-4">
                                <p className="font-medium text-gray-900 dark:text-gray-100">
                                    In the past two weeks, have you experienced any of the following?
                                </p>

                                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <div className="mb-3">
                                        <span className="block font-medium text-gray-900 dark:text-gray-100">
                                            Thoughts of suicide or ending your life
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Including fleeting thoughts or more persistent ones
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setHasThoughtsSuicide(true)}
                                            className={`px-5 py-2 rounded-lg text-sm font-medium border transition ${hasThoughtsSuicide === true ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-400 dark:border-amber-600 text-amber-800 dark:text-amber-200' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setHasThoughtsSuicide(false)}
                                            className={`px-5 py-2 rounded-lg text-sm font-medium border transition ${hasThoughtsSuicide === false ? 'bg-violet-100 dark:bg-violet-900/40 border-violet-400 dark:border-violet-600 text-violet-800 dark:text-violet-200' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <div className="mb-3">
                                        <span className="block font-medium text-gray-900 dark:text-gray-100">
                                            Thoughts of hurting yourself
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            Including self-harm or self-injury
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setHasThoughtsSelfHarm(true)}
                                            className={`px-5 py-2 rounded-lg text-sm font-medium border transition ${hasThoughtsSelfHarm === true ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-400 dark:border-amber-600 text-amber-800 dark:text-amber-200' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setHasThoughtsSelfHarm(false)}
                                            className={`px-5 py-2 rounded-lg text-sm font-medium border transition ${hasThoughtsSelfHarm === false ? 'bg-violet-100 dark:bg-violet-900/40 border-violet-400 dark:border-violet-600 text-violet-800 dark:text-violet-200' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {(hasThoughtsSuicide || hasThoughtsSelfHarm) && (
                                    <>
                                        <label className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 cursor-pointer transition">
                                            <input
                                                type="checkbox"
                                                checked={hasPlanOrMeans}
                                                onChange={(e) => setHasPlanOrMeans(e.target.checked)}
                                                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <div>
                                                <span className="block font-medium text-amber-900 dark:text-amber-100">
                                                    Do you have a specific plan or access to means?
                                                </span>
                                                <span className="text-sm text-amber-700 dark:text-amber-300">
                                                    This helps us understand how best to support you
                                                </span>
                                            </div>
                                        </label>

                                        <label className="flex items-start gap-3 p-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 cursor-pointer transition">
                                            <input
                                                type="checkbox"
                                                checked={hasImmediateDanger}
                                                onChange={(e) => setHasImmediateDanger(e.target.checked)}
                                                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <div>
                                                <span className="block font-medium text-red-900 dark:text-red-100">
                                                    Are you in immediate danger right now?
                                                </span>
                                                <span className="text-sm text-red-700 dark:text-red-300">
                                                    If yes, please call 988 or 911 immediately
                                                </span>
                                            </div>
                                        </label>
                                    </>
                                )}
                            </div>

                            {/* 988 Resources Card - Always Show */}
                            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-red-200 dark:border-red-800">
                                <h3 className="font-bold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    988 Suicide & Crisis Lifeline
                                </h3>
                                <p className="text-red-800 dark:text-red-200 mb-4 text-sm">
                                    Free, confidential support is available 24/7 for anyone experiencing emotional distress.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="tel:988"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Call 988
                                    </a>
                                    <a
                                        href="sms:988"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-900/70 text-red-700 dark:text-red-200 rounded-lg font-semibold transition"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Text 988
                                    </a>
                                    <a
                                        href="https://988lifeline.org/chat/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-900/70 text-red-700 dark:text-red-200 rounded-lg font-semibold transition"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Chat Online
                                    </a>
                                </div>
                            </div>

                            {/* Acknowledgment for elevated risk */}
                            {(hasThoughtsSuicide || hasThoughtsSelfHarm) && (
                                <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={acknowledged988}
                                        onChange={(e) => setAcknowledged988(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                        required
                                    />
                                    <div>
                                        <span className="block font-medium text-gray-900 dark:text-gray-100">
                                            I understand that 988 support is available
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            I acknowledge that I can call, text, or chat with 988 if I need immediate support
                                        </span>
                                    </div>
                                </label>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={hasThoughtsSuicide === null || hasThoughtsSelfHarm === null || ((hasThoughtsSuicide || hasThoughtsSelfHarm) && !acknowledged988)}
                                    className="px-8 py-3 bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue →
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Crisis Modal */}
            {showCrisisModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                We&apos;re Here for You
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                What you&apos;re going through sounds really difficult. You don&apos;t have to face this alone.
                            </p>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 mb-6">
                            <p className="text-red-800 dark:text-red-200 font-medium mb-3">
                                Please consider reaching out to the 988 Suicide & Crisis Lifeline:
                            </p>
                            <div className="flex flex-col gap-2">
                                <a
                                    href="tel:988"
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call or Text 988
                                </a>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                            Trained counselors are available 24/7, free and confidential.
                        </p>

                                        <a
                            href="/dashboard"
                            className="block w-full px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold text-center transition mb-3"
                        >
                            Go to Dashboard (skip setup)
                        </a>
                        <button
                            onClick={() => setShowCrisisModal(false)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm"
                        >
                            I understand, continue with setup
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}
