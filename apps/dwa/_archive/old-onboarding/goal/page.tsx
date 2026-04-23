'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'
import type { Stage } from '@/types/profile'

const REVENUE_GOALS = [
    { id: 'first-10k', label: 'First $10K/month', description: 'Get to consistent revenue' },
    { id: '10k-50k', label: '$10K → $50K/month', description: 'Scale what\'s working' },
    { id: '50k-100k', label: '$50K → $100K/month', description: 'Build systems and team' },
    { id: '100k-plus', label: '$100K+/month', description: 'Optimize and expand' },
]

const TIMELINES = [
    { id: '3-months', label: '3 months' },
    { id: '6-months', label: '6 months' },
    { id: '12-months', label: '12 months' },
    { id: 'flexible', label: 'Flexible' },
]

const STAGES: { id: Stage; label: string }[] = [
    { id: 'idea', label: 'Idea Stage' },
    { id: 'pre-launch', label: 'Pre-Launch' },
    { id: 'pre-revenue', label: 'Launched, No Revenue' },
    { id: '0-10k', label: '$0-10K MRR' },
    { id: '10k-100k', label: '$10K-100K MRR' },
    { id: 'scaling', label: '$100K+ MRR' },
]

export default function GoalPage() {
    const router = useRouter()
    const { data, updateData } = useOnboarding()
    const [revenueGoal, setRevenueGoal] = useState(data.revenueGoal)
    const [timeline, setTimeline] = useState(data.timeline)
    const [stage, setStage] = useState<Stage | ''>(data.stage)

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // 1. Update data in context
            updateData({ revenueGoal, timeline, stage })

            // 2. Save Goal & Stage Info
            await fetch('/api/onboarding/goal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    primaryGoal: revenueGoal,
                    stage: stage,
                    // timeline: timeline, // timeline isn't in GoalInfo type but we could add it
                }),
            });

            router.push('/onboarding/context')
        } catch (error) {
            console.error('Error saving goal data:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="bg-white dark:bg-gray-900">
            <div className="relative flex">
                <div className="w-full">
                    <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
                        <div className="flex-1">
                            <OnboardingHeader />
                            <OnboardingProgress step={3} />
                        </div>

                        <div className="px-4 py-8">
                            <div className="max-w-xl mx-auto">
                                <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">
                                    What are your goals? 🎯
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    We&apos;ll tailor lessons and AI coaching to your specific situation.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    {/* Current Stage */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Where are you now?
                                        </label>
                                        <select
                                            value={stage}
                                            onChange={(e) => setStage(e.target.value as Stage)}
                                            className="form-select w-full"
                                            required
                                        >
                                            <option value="">Select your stage...</option>
                                            {STAGES.map((s) => (
                                                <option key={s.id} value={s.id}>{s.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Revenue Goal */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Your primary goal
                                        </label>
                                        <div className="space-y-2">
                                            {REVENUE_GOALS.map((goal) => (
                                                <label key={goal.id} className="relative block cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="revenue-goal"
                                                        value={goal.id}
                                                        checked={revenueGoal === goal.id}
                                                        onChange={() => setRevenueGoal(goal.id)}
                                                        className="peer sr-only"
                                                    />
                                                    <div className="flex items-center justify-between bg-white text-sm p-3 rounded-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 transition">
                                                        <span className="font-medium text-gray-800 dark:text-gray-100">{goal.label}</span>
                                                        <span className="text-xs text-gray-500">{goal.description}</span>
                                                    </div>
                                                    <div className="absolute inset-0 border-2 border-transparent peer-checked:border-primary-400 dark:peer-checked:border-primary-500 rounded-lg pointer-events-none" />
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Target timeline
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {TIMELINES.map((t) => (
                                                <button
                                                    key={t.id}
                                                    type="button"
                                                    onClick={() => setTimeline(t.id)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${timeline === t.id
                                                        ? 'bg-primary-500 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    {t.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() => router.push('/onboarding/business')}
                                            className="btn border-gray-200 dark:border-gray-700/60 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!stage || !revenueGoal || loading}
                                            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Saving...' : 'Next Step →'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
