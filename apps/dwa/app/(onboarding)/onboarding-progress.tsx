'use client'

import Link from 'next/link'

const STEPS = [
    { id: 1, name: 'Welcome', shortName: 'Welcome', path: '/onboarding/welcome' },
    { id: 2, name: 'Symptoms', shortName: 'Symptoms', path: '/onboarding/symptoms' },
    { id: 3, name: 'Safety', shortName: 'Safety', path: '/onboarding/safety' },
    { id: 4, name: 'Goals', shortName: 'Goals', path: '/onboarding/goals' },
    { id: 5, name: 'About You', shortName: 'About', path: '/onboarding/about-you' },
    { id: 6, name: 'Experience', shortName: 'Experience', path: '/onboarding/your-experience' },
    { id: 7, name: 'Reflect', shortName: 'Reflect', path: '/onboarding/in-your-words' },
    { id: 8, name: 'Your Plan', shortName: 'Plan', path: '/onboarding/assessment' },
]

interface OnboardingProgressProps {
    step?: number
    totalSteps?: number
}

export default function OnboardingProgress({ step = 1 }: OnboardingProgressProps) {
    const totalSteps = STEPS.length
    const progressPercent = Math.min(((step - 1) / (totalSteps - 1)) * 100, 100)

    return (
        <nav className="px-4 pt-6 pb-4" aria-label="Onboarding Progress">
            <div className="max-w-3xl mx-auto w-full">
                {/* Compact progress bar for small screens */}
                <div className="lg:hidden">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {STEPS[step - 1]?.name}
                            {step <= 3 && (
                                <span className="ml-2 text-[10px] font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">Required</span>
                            )}
                            {step >= 4 && step <= 7 && (
                                <span className="ml-2 text-[10px] font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded uppercase tracking-wider">Optional</span>
                            )}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {step} / {totalSteps}
                        </span>
                    </div>
                    {/* Two-section bar: required (3 steps) + optional (4 steps) + plan (1 step) */}
                    <div className="flex gap-1 items-center">
                        <div className="relative h-2 rounded-full overflow-hidden flex-[3] bg-gray-200 dark:bg-gray-700/60">
                            <div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(((step - 1) / 2) * 100, 100)}%` }}
                            />
                        </div>
                        <span className="text-[9px] text-gray-400 font-medium shrink-0">Optional</span>
                        <div className="relative h-2 rounded-full overflow-hidden flex-[4] bg-gray-200 dark:bg-gray-700/60">
                            <div
                                className="absolute inset-y-0 left-0 bg-violet-400/70 rounded-full transition-all duration-500"
                                style={{ width: step >= 4 ? `${Math.min(((step - 3) / 4) * 100, 100)}%` : '0%' }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="text-[9px] text-gray-400">Steps 1–3 required</span>
                        <span className="text-[9px] text-gray-400">Steps 4–7 optional</span>
                    </div>
                </div>

                {/* Step circles for large screens and up */}
                <div className="hidden lg:block">
                    <div className="relative">
                        {/* Progress Line Background */}
                        <div
                            className="absolute left-0 top-[14px] w-full h-0.5 bg-gray-200 dark:bg-gray-700/60"
                            aria-hidden="true"
                        />
                        {/* Filled Progress Line */}
                        <div
                            className="absolute left-0 top-[14px] h-0.5 bg-gradient-to-r from-primary-500 to-violet-500 transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                            aria-hidden="true"
                        />

                        <ul className="relative flex justify-between w-full">
                            {STEPS.map((s) => {
                                const isCompleted = step > s.id
                                const isCurrent = step === s.id
                                const isClickable = step >= s.id

                                return (
                                    <li key={s.id} className="flex flex-col items-center w-0 flex-1">
                                        {isClickable ? (
                                            <Link
                                                href={s.path}
                                                aria-current={isCurrent ? 'step' : undefined}
                                                aria-label={`Step ${s.id}: ${s.name}${isCompleted ? ' (Completed)' : ''}`}
                                                className={`flex items-center justify-center w-7 h-7 shrink-0 rounded-full text-[10px] font-bold transition-all ${isCurrent
                                                    ? 'bg-gradient-to-r from-primary-500 to-violet-500 text-white shadow-lg shadow-primary-500/30 ring-4 ring-primary-500/20'
                                                    : isCompleted
                                                        ? 'bg-primary-500 text-white'
                                                        : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    s.id
                                                )}
                                            </Link>
                                        ) : (
                                            <span
                                                aria-label={`Step ${s.id}: ${s.name} (Upcoming)`}
                                                className="flex items-center justify-center w-7 h-7 shrink-0 rounded-full text-[10px] font-bold bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700"
                                            >
                                                {s.id}
                                            </span>
                                        )}
                                        <span
                                            className={`mt-1.5 text-[10px] leading-tight text-center truncate max-w-full transition-colors ${isCurrent
                                                ? 'text-primary-600 dark:text-violet-400 font-semibold'
                                                : isClickable
                                                    ? 'text-gray-600 dark:text-gray-400'
                                                    : 'text-gray-400 dark:text-gray-500'
                                                }`}
                                            aria-hidden="true"
                                        >
                                            {s.shortName}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
