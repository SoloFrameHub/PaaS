'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'
import type { TherapyHistory, TimeOfDay } from '@/types/wellness-profile'

const COPING_STRATEGIES = [
    { id: 'exercise', label: 'Exercise / movement' },
    { id: 'meditation', label: 'Meditation / mindfulness' },
    { id: 'journaling', label: 'Journaling' },
    { id: 'talking-to-others', label: 'Talking to friends / family' },
    { id: 'music-art', label: 'Music / creative expression' },
    { id: 'deep-breathing', label: 'Deep breathing' },
    { id: 'outdoors', label: 'Spending time outdoors' },
    { id: 'reading', label: 'Reading / learning' },
    { id: 'prayer-spirituality', label: 'Prayer / spirituality' },
    { id: 'other-coping', label: 'Other' },
]

const UNHEALTHY_COPING = [
    { id: 'avoidance', label: 'Avoidance / procrastination' },
    { id: 'isolation', label: 'Isolation / withdrawal' },
    { id: 'substance-use', label: 'Substance use' },
    { id: 'emotional-eating', label: 'Emotional eating' },
    { id: 'oversleeping', label: 'Oversleeping' },
    { id: 'excessive-screen-time', label: 'Excessive screen time' },
    { id: 'other-unhealthy', label: 'Other' },
]

const THERAPY_OPTIONS: { id: TherapyHistory; label: string; description: string }[] = [
    { id: 'never', label: 'Never tried', description: 'I haven\'t been to therapy' },
    { id: 'past', label: 'In the past', description: 'I\'ve had therapy before' },
    { id: 'currently-in-therapy', label: 'Currently in therapy', description: 'I\'m seeing a therapist now' },
]

const KNOWN_TRIGGERS = [
    { id: 'work-school', label: 'Work / school stress' },
    { id: 'relationships', label: 'Relationship issues' },
    { id: 'social-situations', label: 'Social situations' },
    { id: 'financial', label: 'Financial stress' },
    { id: 'health', label: 'Health concerns' },
    { id: 'family', label: 'Family dynamics' },
    { id: 'loneliness', label: 'Loneliness' },
    { id: 'change-uncertainty', label: 'Change / uncertainty' },
    { id: 'news-media', label: 'News / social media' },
    { id: 'other-trigger', label: 'Other' },
]

const TIME_OF_DAY_OPTIONS: { id: TimeOfDay; label: string }[] = [
    { id: 'morning', label: 'Morning' },
    { id: 'afternoon', label: 'Afternoon' },
    { id: 'evening', label: 'Evening' },
    { id: 'night', label: 'Night' },
    { id: 'varies', label: 'It varies' },
]

export default function YourExperiencePage() {
    const router = useRouter()
    const { data, updateData, setCurrentStep } = useOnboarding()

    const [copingStrategies, setCopingStrategies] = useState<Set<string>>(
        new Set(data.currentCopingStrategies || [])
    )
    const [unhealthyCoping, setUnhealthyCoping] = useState<Set<string>>(
        new Set(data.unhealthyCopingToChange || [])
    )
    const [therapyHistory, setTherapyHistory] = useState<TherapyHistory | ''>(data.therapyHistory || '')
    const [previousSelfHelp, setPreviousSelfHelp] = useState<boolean | null>(data.previousSelfHelpExperience)
    const [triggers, setTriggers] = useState<Set<string>>(
        new Set(data.knownTriggers || [])
    )
    const [worstTime, setWorstTime] = useState<TimeOfDay | ''>(data.worstTimeOfDay || '')
    const [error, setError] = useState<string | null>(null)

    const toggleItem = (set: Set<string>, setFn: (s: Set<string>) => void, item: string) => {
        const next = new Set(set)
        if (next.has(item)) {
            next.delete(item)
        } else {
            next.add(item)
        }
        setFn(next)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        updateData({
            currentCopingStrategies: Array.from(copingStrategies),
            unhealthyCopingToChange: Array.from(unhealthyCoping),
            therapyHistory,
            previousSelfHelpExperience: previousSelfHelp,
            knownTriggers: Array.from(triggers),
            worstTimeOfDay: worstTime,
        })

        // Save to server
        try {
            const res = await fetch('/api/onboarding/your-experience', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentCopingStrategies: Array.from(copingStrategies),
                    unhealthyCopingToChange: Array.from(unhealthyCoping),
                    therapyHistory: therapyHistory || undefined,
                    previousSelfHelpExperience: previousSelfHelp,
                    knownTriggers: Array.from(triggers),
                    worstTimeOfDay: worstTime || undefined,
                }),
            })
            if (!res.ok) throw new Error('Failed to save')
        } catch (err) {
            console.error('Error saving your experience:', err)
            setError('Failed to save your experience. Please try again.')
            return
        }

        setCurrentStep(7)
        router.push('/onboarding/in-your-words')
    }

    const handleBack = () => {
        setCurrentStep(5)
        router.push('/onboarding/about-you')
    }

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={6} totalSteps={8} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-2xl w-full">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Your experience so far
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Understanding your current coping patterns and triggers helps your AI Coach guide you more effectively. Everything here is optional.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Current Coping Strategies */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    What do you currently do to cope?
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    Select any strategies you already use <span className="text-gray-400">(optional)</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {COPING_STRATEGIES.map((strategy) => (
                                        <button
                                            key={strategy.id}
                                            type="button"
                                            onClick={() => toggleItem(copingStrategies, setCopingStrategies, strategy.id)}
                                            className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${copingStrategies.has(strategy.id)
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            {strategy.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Things to Change */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    Any patterns you&apos;d like to change?
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    No judgment — this helps us suggest better alternatives <span className="text-gray-400">(optional)</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {UNHEALTHY_COPING.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => toggleItem(unhealthyCoping, setUnhealthyCoping, item.id)}
                                            className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${unhealthyCoping.has(item.id)
                                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Therapy History */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                    Therapy experience <span className="text-gray-400 font-normal text-sm">(optional)</span>
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {THERAPY_OPTIONS.map((option) => (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => setTherapyHistory(therapyHistory === option.id ? '' : option.id)}
                                            className={`p-3 rounded-xl border-2 text-left transition-all ${therapyHistory === option.id
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <span className={`block font-medium text-sm ${therapyHistory === option.id ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                {option.label}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {option.description}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Previous Self-Help */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                    Have you tried self-help resources before? <span className="text-gray-400 font-normal text-sm">(optional)</span>
                                </h2>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPreviousSelfHelp(previousSelfHelp === true ? null : true)}
                                        className={`flex-1 p-3 rounded-xl border-2 text-center font-medium transition-all ${previousSelfHelp === true
                                            ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPreviousSelfHelp(previousSelfHelp === false ? null : false)}
                                        className={`flex-1 p-3 rounded-xl border-2 text-center font-medium transition-all ${previousSelfHelp === false
                                            ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        No, this is new for me
                                    </button>
                                </div>
                            </div>

                            {/* Known Triggers */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    Do you notice any common triggers?
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    Situations or things that tend to make you feel worse <span className="text-gray-400">(optional)</span>
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {KNOWN_TRIGGERS.map((trigger) => (
                                        <button
                                            key={trigger.id}
                                            type="button"
                                            onClick={() => toggleItem(triggers, setTriggers, trigger.id)}
                                            className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${triggers.has(trigger.id)
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            {trigger.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Worst Time of Day */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                    When do symptoms tend to be worst? <span className="text-gray-400 font-normal text-sm">(optional)</span>
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {TIME_OF_DAY_OPTIONS.map((time) => (
                                        <button
                                            key={time.id}
                                            type="button"
                                            onClick={() => setWorstTime(worstTime === time.id ? '' : time.id)}
                                            className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${worstTime === time.id
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            {time.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

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
                                    &larr; Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98]"
                                >
                                    Continue &rarr;
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
