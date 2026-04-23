'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'
import LearningPathTimeline, { type PathCourse } from '@/components/ui/learning-path-timeline'
import { SYMPTOM_COURSE_MAPPING, type SymptomCategory } from '@/types/wellness-profile'

// Course metadata for display — IDs must match actual curriculum in lib/data/curriculum.ts
const COURSE_INFO: Record<string, { title: string; description: string; icon: string; duration: string; lessonCount: number }> = {
    'anxiety-management': {
        title: 'Understanding & Managing Anxiety',
        description: 'Master evidence-based techniques to understand anxiety and build lasting resilience',
        icon: '🧠',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'anxiety-toolkit-foundations': {
        title: 'Anxiety Toolkit - CBT Foundations',
        description: 'Learn core CBT skills: thinking traps, thought records, and the thought-feeling-action cycle',
        icon: '💭',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'anxiety-toolkit-skills': {
        title: 'Anxiety Toolkit - Crisis Skills & Exposure',
        description: 'Master grounding, DBT distress tolerance, and graduated exposure therapy',
        icon: '⚓',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'panic-disorder': {
        title: 'Managing Panic Attacks',
        description: 'Understand panic physiology, break the fear cycle, and learn interoceptive exposure',
        icon: '🌬️',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'social-anxiety': {
        title: 'Social Anxiety: Building Confidence',
        description: 'Overcome fear of judgment with cognitive restructuring and graduated exposure',
        icon: '🤝',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'depression-action': {
        title: 'Depression: From Understanding to Action',
        description: 'Break the depression cycle using behavioral activation and cognitive skills',
        icon: '☀️',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'sleep-insomnia': {
        title: 'Sleep & Insomnia',
        description: 'Improve your sleep quality with proven CBT-I techniques',
        icon: '😴',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'sleep-mastery': {
        title: 'Sleep Mastery',
        description: 'Advanced sleep optimization with tracking and lifestyle strategies',
        icon: '🌙',
        duration: '5-6 hours',
        lessonCount: 8,
    },
    'stress-burnout': {
        title: 'Stress & Burnout Recovery',
        description: 'Build resilience and recover from chronic stress and burnout',
        icon: '🌿',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'trauma-recovery': {
        title: 'Trauma Recovery',
        description: 'Learn grounding, stabilization, and evidence-based trauma coping skills',
        icon: '🛡️',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'ocd-toolkit': {
        title: 'OCD Toolkit',
        description: 'Understand the OCD cycle and prepare for evidence-based ERP treatment',
        icon: '🔄',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'anger-management': {
        title: 'Anger Management',
        description: 'Understand anger triggers and learn healthy expression techniques',
        icon: '🔥',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'emotional-dysregulation': {
        title: 'Emotional Regulation',
        description: 'Develop skills to manage intense emotions using DBT-based approaches',
        icon: '🎯',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'grief-loss': {
        title: 'Grief & Loss',
        description: 'Navigate grief with compassion-focused coping strategies',
        icon: '💜',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'anxiety-toolkit-resilience': {
        title: 'Anxiety Toolkit - Social Skills & Resilience',
        description: 'Build social confidence, assertive communication, and long-term resilience',
        icon: '💪',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'low-self-esteem': {
        title: 'Low Self-Esteem & Self-Worth',
        description: 'Challenge negative core beliefs and build lasting self-worth using CBT and compassion-focused therapy',
        icon: '🌱',
        duration: '4-5 hours',
        lessonCount: 8,
    },
    'managing-perfectionism': {
        title: 'Managing Perfectionism',
        description: 'Break free from perfectionism that fuels anxiety and burnout using CBT and self-compassion techniques',
        icon: '⭐',
        duration: '4-5 hours',
        lessonCount: 8,
    },
}


function formatSymptom(s: string): string {
    return s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function calculateRecommendedCourses(symptoms: { category: string; severity: string; isPrimary: boolean }[]): string[] {
    const courseScores: Record<string, number> = {}

    for (const symptom of symptoms) {
        const courses = SYMPTOM_COURSE_MAPPING[symptom.category as SymptomCategory] ?? SYMPTOM_COURSE_MAPPING['other']
        const severityMultiplier = symptom.severity === 'severe' ? 3 : symptom.severity === 'moderate' ? 2 : 1
        const primaryMultiplier = symptom.isPrimary ? 2 : 1

        for (const course of courses) {
            courseScores[course] = (courseScores[course] || 0) + severityMultiplier * primaryMultiplier
        }
    }

    return Object.entries(courseScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([course]) => course)
}

/** Get which of the user's symptoms map to a course */
function getMatchingSymptomsForCourse(courseId: string, userSymptoms: string[]): string[] {
    return userSymptoms.filter(symptom =>
        SYMPTOM_COURSE_MAPPING[symptom as SymptomCategory]?.includes(courseId)
    )
}

/** Estimate total hours from course durations like "4-5 hours" */
function estimateTotalDuration(courseIds: string[]): string {
    let minHours = 0
    let maxHours = 0
    for (const id of courseIds) {
        const info = COURSE_INFO[id]
        if (!info) continue
        const match = info.duration.match(/(\d+)-?(\d+)?/)
        if (match) {
            minHours += parseInt(match[1], 10)
            maxHours += parseInt(match[2] || match[1], 10)
        }
    }
    if (minHours === maxHours) return `${minHours} hours`
    return `${minHours}-${maxHours} hours`
}

export default function AssessmentPage() {
    const router = useRouter()
    const { data, updateData, setCurrentStep, isHydrated } = useOnboarding()
    const [recommendedCourses, setRecommendedCourses] = useState<string[]>([])
    const [selectedStartCourse, setSelectedStartCourse] = useState<string>('')
    const [completing, setCompleting] = useState(false)

    useEffect(() => {
        if (!isHydrated) return

        // Calculate recommendations based on symptoms
        const courses = calculateRecommendedCourses(data.primarySymptoms || [])
        setRecommendedCourses(courses)
        setSelectedStartCourse(courses[0] || '')

        // Update local state
        updateData({
            recommendedCourses: courses,
            assessmentCompleted: true,
        })
    }, [isHydrated, data.primarySymptoms])

    const [error, setError] = useState<string | null>(null)

    const handleComplete = async () => {
        setCompleting(true)
        setError(null)
        try {
            // Save assessment and complete onboarding in a single atomic call
            const completeRes = await fetch('/api/onboarding/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recommendedCourses,
                    selectedStartCourse: selectedStartCourse || recommendedCourses[0],
                    priorityFocus: data.primarySymptoms?.filter(s => s.isPrimary).map(s => s.category) || [],
                }),
            })

            if (!completeRes.ok) {
                throw new Error('Failed to complete onboarding')
            }

            // Clear the draft so returning to onboarding won't restore old state
            localStorage.removeItem('wellness_onboarding_draft')

            // Use hard navigation to bypass Next.js Router Cache
            window.location.href = '/dashboard'
        } catch (err) {
            console.error('Failed to complete onboarding:', err)
            setError('Something went wrong. Please try again.')
            setCompleting(false)
        }
    }

    const handleBack = () => {
        setCurrentStep(7)
        router.push('/onboarding/in-your-words')
    }

    if (!isHydrated) {
        return (
            <main className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-violet-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Creating your personalized plan...</p>
                </div>
            </main>
        )
    }

    const primarySymptom = data.primarySymptoms?.find(s => s.isPrimary)
    const userSymptomCategories = (data.primarySymptoms || []).map(s => s.category)

    // Build timeline data
    const pathCourses: PathCourse[] = recommendedCourses.map(courseId => {
        const info = COURSE_INFO[courseId] || {
            title: courseId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            description: 'Evidence-based wellness course',
            icon: '📚',
            duration: '4-5 hours',
            lessonCount: 8,
        }
        const matching = getMatchingSymptomsForCourse(courseId, userSymptomCategories)
        return {
            id: courseId,
            title: info.title,
            description: info.description,
            duration: info.duration,
            lessonCount: info.lessonCount,
            matchingSymptoms: matching.map(formatSymptom),
        }
    })

    const totalDuration = estimateTotalDuration(recommendedCourses)

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={8} totalSteps={8} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-2xl w-full">
                        {/* Journey Header */}
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Your Learning Path
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                                Based on everything you&apos;ve shared, we&apos;ve built a step-by-step path
                                designed specifically for you. Each course builds on the last to help you
                                develop lasting skills.
                            </p>
                        </div>

                        {/* Primary Focus Summary */}
                        {primarySymptom && (
                            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-2xl p-5 mb-8 border border-violet-200 dark:border-violet-800">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-violet-100 dark:bg-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-violet-900 dark:text-violet-100 mb-1">
                                            Your Primary Focus: {formatSymptom(primarySymptom.category)}
                                        </h2>
                                        <p className="text-sm text-violet-800 dark:text-violet-200">
                                            Your journey starts with courses that directly address this area, then
                                            expands to build complementary skills. You can adjust your starting
                                            point below.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Visual Learning Path */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                Your Personalized Path
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                                Tap any course to choose it as your starting point:
                            </p>

                            <LearningPathTimeline
                                courses={pathCourses}
                                selectedCourseId={selectedStartCourse}
                                onSelectCourse={setSelectedStartCourse}
                                variant="full"
                            />
                        </div>

                        {/* What to Expect */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
                            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                What&apos;s Included
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-primary-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">Evidence-Based Lessons</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Learn techniques backed by clinical research</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-primary-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">AI Wellness Coach</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Get personalized support whenever you need it</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-primary-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">Progress Tracking</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">See your growth and celebrate milestones</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">Crisis Support Always Available</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Quick access to 988 and professional resources</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Skip to dashboard fallback */}
                        <div className="mb-4 text-center">
                            <a
                                href="/dashboard"
                                className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline transition"
                            >
                                Skip for now — go to dashboard
                            </a>
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
                                onClick={handleComplete}
                                disabled={completing}
                                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-violet-500 hover:from-primary-600 hover:to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center gap-2"
                            >
                                {completing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Setting up...
                                    </>
                                ) : (
                                    <>
                                        Start My Journey
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
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
