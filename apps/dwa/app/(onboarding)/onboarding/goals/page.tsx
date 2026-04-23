'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'
import type { WellnessGoal } from '@/types/wellness-profile'

const WELLNESS_GOALS: { id: WellnessGoal; label: string; icon: string }[] = [
    { id: 'reduce-anxiety', label: 'Reduce anxiety and worry', icon: '🧘' },
    { id: 'improve-mood', label: 'Improve my mood', icon: '☀️' },
    { id: 'sleep-better', label: 'Sleep better', icon: '😴' },
    { id: 'manage-stress', label: 'Manage stress', icon: '🌿' },
    { id: 'build-confidence', label: 'Build confidence', icon: '💪' },
    { id: 'understand-feelings', label: 'Understand my feelings', icon: '🧠' },
    { id: 'develop-coping-skills', label: 'Develop coping skills', icon: '🛠️' },
    { id: 'improve-relationships', label: 'Improve relationships', icon: '❤️' },
    { id: 'increase-motivation', label: 'Increase motivation', icon: '🚀' },
    { id: 'practice-self-care', label: 'Practice better self-care', icon: '🌸' },
]

const LEARNING_STYLES = [
    { id: 'self-paced', label: 'Self-Paced', description: 'I prefer to learn on my own schedule' },
    { id: 'guided', label: 'Guided', description: 'I like structured lessons with clear steps' },
    { id: 'interactive', label: 'Interactive', description: 'I learn best with exercises and practice' },
]

const TIME_COMMITMENTS = [
    { id: '5-10min', label: '5-10 minutes', description: 'Quick daily practice' },
    { id: '15-20min', label: '15-20 minutes', description: 'Moderate daily commitment' },
    { id: '30min+', label: '30+ minutes', description: 'Deeper learning sessions' },
]

export default function GoalsPage() {
    const router = useRouter()
    const { data, updateData, setCurrentStep } = useOnboarding()

    const [selectedGoals, setSelectedGoals] = useState<Set<WellnessGoal>>(
        new Set(data.wellnessGoals || [])
    )
    const [personalGoal, setPersonalGoal] = useState(data.personalGoalDescription || '')
    const [learningStyle, setLearningStyle] = useState(data.learningStyle || '')
    const [timeCommitment, setTimeCommitment] = useState(data.timeCommitment || '')
    const [error, setError] = useState<string | null>(null)

    const toggleGoal = (goalId: WellnessGoal) => {
        const newSelected = new Set(selectedGoals)
        if (newSelected.has(goalId)) {
            newSelected.delete(goalId)
        } else {
            newSelected.add(goalId)
        }
        setSelectedGoals(newSelected)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (selectedGoals.size === 0) return

        const goalsArray = Array.from(selectedGoals) as WellnessGoal[]

        updateData({
            wellnessGoals: goalsArray,
            personalGoalDescription: personalGoal,
            learningStyle: learningStyle as 'self-paced' | 'guided' | 'interactive' | '',
            timeCommitment: timeCommitment as '5-10min' | '15-20min' | '30min+' | '',
        })

        // Save to server
        try {
            const res = await fetch('/api/onboarding/goals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    goals: goalsArray,
                    personalGoalDescription: personalGoal || undefined,
                    learningStyle: learningStyle || undefined,
                    timeCommitment: timeCommitment || undefined,
                }),
            })
            if (!res.ok) throw new Error('Failed to save')
        } catch (err) {
            console.error('Error saving goals:', err)
            setError('Failed to save your goals. Please try again.')
            return
        }

        setCurrentStep(5)
        router.push('/onboarding/about-you')
    }

    const handleBack = () => {
        setCurrentStep(3)
        router.push('/onboarding/safety')
    }

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={4} totalSteps={8} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-2xl w-full">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                What are your wellness goals?
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Select the goals that resonate with you. This helps us personalize your journey.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Goals Selection */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    I want to... <span className="text-gray-400 font-normal text-sm">(select all that apply)</span>
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {WELLNESS_GOALS.map((goal) => {
                                        const isSelected = selectedGoals.has(goal.id)
                                        return (
                                            <button
                                                key={goal.id}
                                                type="button"
                                                onClick={() => toggleGoal(goal.id)}
                                                className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                                    ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                    }`}
                                            >
                                                <span className="text-2xl" role="img" aria-hidden="true">{goal.icon}</span>
                                                <span className={`font-medium ${isSelected ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                    {goal.label}
                                                </span>
                                                {isSelected && (
                                                    <svg className="w-5 h-5 text-primary-500 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Personal Goal */}
                            <div>
                                <label htmlFor="personal-goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Anything else you&apos;d like to achieve? <span className="text-gray-400">(optional)</span>
                                </label>
                                <textarea
                                    id="personal-goal"
                                    value={personalGoal}
                                    onChange={(e) => setPersonalGoal(e.target.value)}
                                    placeholder="Share any specific goals or what success looks like for you..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none min-h-[80px]"
                                />
                            </div>

                            {/* Learning Style */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    How do you prefer to learn?
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {LEARNING_STYLES.map((style) => (
                                        <button
                                            key={style.id}
                                            type="button"
                                            onClick={() => setLearningStyle(style.id)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${learningStyle === style.id
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <span className={`block font-medium ${learningStyle === style.id ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                {style.label}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {style.description}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Commitment */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    How much time can you commit daily?
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {TIME_COMMITMENTS.map((time) => (
                                        <button
                                            key={time.id}
                                            type="button"
                                            onClick={() => setTimeCommitment(time.id)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${timeCommitment === time.id
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <span className={`block font-medium ${timeCommitment === time.id ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                {time.label}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {time.description}
                                            </span>
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
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={selectedGoals.size === 0}
                                    className="px-8 py-3 bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue →
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
