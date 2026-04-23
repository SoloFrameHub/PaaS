'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding, SymptomSelection } from '../../onboarding-context'
import type { SymptomCategory, Severity } from '@/types/wellness-profile'

const SYMPTOM_OPTIONS: { id: SymptomCategory; label: string; description: string; icon: string }[] = [
    { id: 'anxiety', label: 'Anxiety / Worry', description: 'Excessive worry, nervousness, or feeling on edge', icon: '😰' },
    { id: 'depression', label: 'Low Mood / Depression', description: 'Feeling sad, hopeless, or losing interest in things', icon: '😔' },
    { id: 'sleep', label: 'Sleep Problems', description: 'Trouble falling asleep, staying asleep, or sleeping too much', icon: '😴' },
    { id: 'panic', label: 'Panic Attacks', description: 'Sudden intense fear with physical symptoms', icon: '💓' },
    { id: 'social-anxiety', label: 'Social Anxiety', description: 'Fear of social situations or being judged', icon: '🙈' },
    { id: 'trauma', label: 'Trauma / PTSD', description: 'Distress from past experiences, flashbacks', icon: '🌪️' },
    { id: 'stress', label: 'Stress / Burnout', description: 'Overwhelm from work, life, or responsibilities', icon: '🔥' },
    { id: 'ocd', label: 'Obsessive Thoughts', description: 'Unwanted repetitive thoughts or compulsive behaviors', icon: '🔄' },
    { id: 'anger', label: 'Anger / Irritability', description: 'Difficulty managing anger or feeling easily frustrated', icon: '😤' },
    { id: 'grief', label: 'Grief / Loss', description: 'Processing loss of a loved one or significant change', icon: '💔' },
    { id: 'other', label: 'Something Else', description: 'Other concerns not listed above', icon: '💭' },
]

const SEVERITY_OPTIONS: { id: Severity; label: string; description: string }[] = [
    { id: 'mild', label: 'Mild', description: 'Noticeable but manageable' },
    { id: 'moderate', label: 'Moderate', description: 'Affecting daily life' },
    { id: 'severe', label: 'Severe', description: 'Significantly impacting functioning' },
]

export default function SymptomsPage() {
    const router = useRouter()
    const { data, updateData, addSymptom, removeSymptom, setPrimarySymptom, setCurrentStep } = useOnboarding()
    const [selectedSymptoms, setSelectedSymptoms] = useState<Map<SymptomCategory, Severity>>(
        new Map(data.primarySymptoms.map(s => [s.category, s.severity]))
    )
    const [primarySymptom, setPrimary] = useState<SymptomCategory | null>(
        data.primarySymptoms.find(s => s.isPrimary)?.category || null
    )
    const [otherDescription, setOtherDescription] = useState(data.otherSymptomDescription || '')
    const [showSeverityFor, setShowSeverityFor] = useState<SymptomCategory | null>(null)
    const [error, setError] = useState<string | null>(null)

    const toggleSymptom = (symptomId: SymptomCategory) => {
        const newSelected = new Map(selectedSymptoms)

        if (newSelected.has(symptomId)) {
            newSelected.delete(symptomId)
            if (primarySymptom === symptomId) {
                // Set new primary to first remaining symptom
                const remaining = Array.from(newSelected.keys())
                setPrimary(remaining.length > 0 ? remaining[0] : null)
            }
            setShowSeverityFor(null)
        } else {
            // Show severity selector
            setShowSeverityFor(symptomId)
        }

        setSelectedSymptoms(newSelected)
    }

    const selectSeverity = (symptomId: SymptomCategory, severity: Severity) => {
        const newSelected = new Map(selectedSymptoms)
        newSelected.set(symptomId, severity)
        setSelectedSymptoms(newSelected)
        setShowSeverityFor(null)

        // If this is the first symptom, make it primary
        if (!primarySymptom) {
            setPrimary(symptomId)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (selectedSymptoms.size === 0) return

        // Build symptom selections
        const symptoms: SymptomSelection[] = Array.from(selectedSymptoms.entries()).map(([category, severity]) => ({
            category,
            severity,
            isPrimary: category === primarySymptom,
        }))

        updateData({
            primarySymptoms: symptoms,
            otherSymptomDescription: selectedSymptoms.has('other') ? otherDescription : '',
        })

        // Save to server
        try {
            const res = await fetch('/api/onboarding/symptoms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    primarySymptoms: symptoms,
                    otherSymptomDescription: selectedSymptoms.has('other') ? otherDescription : undefined,
                }),
            })
            if (!res.ok) throw new Error('Failed to save')
        } catch (err) {
            console.error('Error saving symptoms:', err)
            setError('Failed to save your selections. Please try again.')
            return
        }

        setCurrentStep(3)
        router.push('/onboarding/safety')
    }

    const handleBack = () => {
        setCurrentStep(1)
        router.push('/onboarding/welcome')
    }

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={2} totalSteps={8} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-2xl w-full">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                What brings you here today?
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Select the areas you&apos;d like to work on. This helps us recommend the right courses for you.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Symptom Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                {SYMPTOM_OPTIONS.map((symptom) => {
                                    const isSelected = selectedSymptoms.has(symptom.id)
                                    const isPrimary = primarySymptom === symptom.id
                                    const severity = selectedSymptoms.get(symptom.id)

                                    return (
                                        <div key={symptom.id} className="relative">
                                            <button
                                                type="button"
                                                onClick={() => toggleSymptom(symptom.id)}
                                                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected
                                                    ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className="text-2xl" role="img" aria-hidden="true">{symptom.icon}</span>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`font-medium ${isSelected ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                                {symptom.label}
                                                            </span>
                                                            {isPrimary && (
                                                                <span className="text-xs px-2 py-0.5 bg-primary-500 text-white rounded-full">
                                                                    Primary
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                                            {symptom.description}
                                                        </p>
                                                        {isSelected && severity && (
                                                            <p className="text-xs text-primary-600 dark:text-violet-400 mt-1 font-medium">
                                                                Severity: {severity}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {isSelected && (
                                                        <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </button>

                                            {/* Severity Selector Popup */}
                                            {showSeverityFor === symptom.id && (
                                                <div className="absolute z-10 left-0 right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        How would you describe the intensity?
                                                    </p>
                                                    <div className="space-y-2">
                                                        {SEVERITY_OPTIONS.map((sev) => (
                                                            <button
                                                                key={sev.id}
                                                                type="button"
                                                                onClick={() => selectSeverity(symptom.id, sev.id)}
                                                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                                            >
                                                                <span className="font-medium text-gray-900 dark:text-gray-100">{sev.label}</span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">- {sev.description}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Other Description */}
                            {selectedSymptoms.has('other') && (
                                <div className="mb-6">
                                    <label htmlFor="other-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Please tell us more about what you&apos;re experiencing:
                                    </label>
                                    <textarea
                                        id="other-description"
                                        value={otherDescription}
                                        onChange={(e) => setOtherDescription(e.target.value)}
                                        placeholder="Describe your concerns..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none min-h-[100px]"
                                    />
                                </div>
                            )}

                            {/* Primary Selection */}
                            {selectedSymptoms.size > 1 && (
                                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Which is your main concern right now?
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from(selectedSymptoms.keys()).map((symptomId) => {
                                            const symptom = SYMPTOM_OPTIONS.find(s => s.id === symptomId)
                                            if (!symptom) return null
                                            return (
                                                <button
                                                    key={symptomId}
                                                    type="button"
                                                    onClick={() => setPrimary(symptomId)}
                                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${primarySymptom === symptomId
                                                        ? 'bg-primary-500 text-white'
                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                                        }`}
                                                >
                                                    {symptom.icon} {symptom.label}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
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
                                    disabled={selectedSymptoms.size === 0}
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
