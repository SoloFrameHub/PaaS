'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'

const PROMPTS = [
    {
        id: 'goodDayDescription',
        label: 'What does a good day look like for you?',
        placeholder: 'Describe what a day feels like when things are going well — your mood, energy, activities...',
        hint: 'This helps us understand what you\'re working toward.',
    },
    {
        id: 'biggestChallenge',
        label: 'What\'s been your biggest mental health challenge recently?',
        placeholder: 'Share what\'s been weighing on you the most, in whatever way feels comfortable...',
        hint: 'We\'ll use this to tailor guidance to what matters most right now.',
    },
    {
        id: 'hopedSupportDescription',
        label: 'What kind of support are you hoping to get here?',
        placeholder: 'For example: learning coping techniques, having someone to check in with, understanding my feelings better...',
        hint: 'This shapes how your wellness coach interacts with you.',
    },
    {
        id: 'personalPatterns',
        label: 'Have you noticed any patterns in what helps you feel better or worse?',
        placeholder: 'For example: "I feel worse after scrolling social media at night" or "Walking always helps clear my head"...',
        hint: 'Your personal insights help us give more relevant suggestions.',
    },
    {
        id: 'anythingElse',
        label: 'Anything else you\'d like your wellness coach to know?',
        placeholder: 'Share anything that feels important — your background, preferences, concerns, or hopes for this journey...',
        hint: 'This is your space. Nothing is too small or too big to mention.',
    },
] as const

type PromptId = typeof PROMPTS[number]['id']

export default function InYourWordsPage() {
    const router = useRouter()
    const { data, updateData, setCurrentStep } = useOnboarding()

    const [responses, setResponses] = useState<Record<PromptId, string>>({
        goodDayDescription: data.goodDayDescription || '',
        biggestChallenge: data.biggestChallenge || '',
        hopedSupportDescription: data.hopedSupportDescription || '',
        personalPatterns: data.personalPatterns || '',
        anythingElse: data.anythingElse || '',
    })
    const [showAllPrompts, setShowAllPrompts] = useState(false)

    // Auto-expand if any additional prompts have prior data
    useEffect(() => {
        const hasAdditionalData = responses.biggestChallenge || responses.hopedSupportDescription || responses.personalPatterns || responses.anythingElse
        if (hasAdditionalData) setShowAllPrompts(true)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const updateResponse = (id: PromptId, value: string) => {
        setResponses(prev => ({ ...prev, [id]: value }))
    }

    const [error, setError] = useState<string | null>(null)
    const filledCount = Object.values(responses).filter(v => v.trim().length > 0).length

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        updateData({
            goodDayDescription: responses.goodDayDescription.trim(),
            biggestChallenge: responses.biggestChallenge.trim(),
            hopedSupportDescription: responses.hopedSupportDescription.trim(),
            personalPatterns: responses.personalPatterns.trim(),
            anythingElse: responses.anythingElse.trim(),
        })

        // Save to server
        try {
            const res = await fetch('/api/onboarding/in-your-words', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goodDayDescription: responses.goodDayDescription.trim() || undefined,
                    biggestChallenge: responses.biggestChallenge.trim() || undefined,
                    hopedSupportDescription: responses.hopedSupportDescription.trim() || undefined,
                    personalPatterns: responses.personalPatterns.trim() || undefined,
                    anythingElse: responses.anythingElse.trim() || undefined,
                }),
            })
            if (!res.ok) throw new Error('Failed to save')
        } catch (err) {
            console.error('Error saving reflections:', err)
            setError('Failed to save your reflections. Please try again.')
            return
        }

        // If user already completed onboarding (existing user enhancing profile),
        // go back to dashboard instead of the assessment step
        if (data.assessmentCompleted) {
            router.push('/dashboard')
        } else {
            setCurrentStep(8)
            router.push('/onboarding/assessment')
        }
    }

    const handleBack = () => {
        setCurrentStep(6)
        router.push('/onboarding/your-experience')
    }

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={7} totalSteps={8} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-2xl w-full">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                In your own words
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                These reflections help your AI Coach understand you as a person, not just a set of symptoms, so it can better personalize your coaching experience. Answer as many or as few as you like.
                            </p>
                            {filledCount > 0 && (
                                <p className="mt-2 text-sm text-primary-600 dark:text-violet-400">
                                    {filledCount} of {PROMPTS.length} answered
                                </p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* First (required) prompt — always visible */}
                            {[PROMPTS[0]].map((prompt) => (
                                <div key={prompt.id} className="group">
                                    <label
                                        htmlFor={prompt.id}
                                        className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-1"
                                    >
                                        {prompt.label}
                                    </label>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                                        {prompt.hint}
                                    </p>
                                    <textarea
                                        id={prompt.id}
                                        value={responses[prompt.id]}
                                        onChange={(e) => updateResponse(prompt.id, e.target.value)}
                                        placeholder={prompt.placeholder}
                                        maxLength={1000}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-y min-h-[100px] transition-colors"
                                    />
                                    {responses[prompt.id].length > 0 && (
                                        <p className="text-xs text-gray-400 mt-1 text-right">
                                            {responses[prompt.id].length}/1000
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* Additional prompts — expandable */}
                            {!showAllPrompts ? (
                                <button
                                    type="button"
                                    onClick={() => setShowAllPrompts(true)}
                                    className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add more context (optional — {PROMPTS.length - 1} more questions)
                                </button>
                            ) : (
                                PROMPTS.slice(1).map((prompt, index) => (
                                    <div key={prompt.id} className="group">
                                        <label
                                            htmlFor={prompt.id}
                                            className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-1"
                                        >
                                            {prompt.label}
                                        </label>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                                            {prompt.hint}
                                        </p>
                                        <textarea
                                            id={prompt.id}
                                            value={responses[prompt.id]}
                                            onChange={(e) => updateResponse(prompt.id, e.target.value)}
                                            placeholder={prompt.placeholder}
                                            maxLength={1000}
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-y min-h-[80px] transition-colors"
                                        />
                                        {responses[prompt.id].length > 0 && (
                                            <p className="text-xs text-gray-400 mt-1 text-right">
                                                {responses[prompt.id].length}/1000
                                            </p>
                                        )}
                                    </div>
                                ))
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Privacy note */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    <span className="font-medium">Your privacy matters.</span> Your responses are used only to personalize your wellness coaching experience. They are never shared with third parties or used for advertising.
                                </p>
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition"
                                >
                                    &larr; Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98]"
                                >
                                    {data.assessmentCompleted ? 'Save & Return to Dashboard' : 'See My Recommendations'} &rarr;
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Crisis Resources Footer */}
                <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-4">
                    <div className="max-w-xl mx-auto flex items-center justify-center gap-4 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Need immediate help?</span>
                        <a
                            href="tel:988"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                        >
                            Call/Text 988
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}
