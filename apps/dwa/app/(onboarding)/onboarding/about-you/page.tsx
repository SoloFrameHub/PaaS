'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'
import type {
    AgeRange,
    LifeStage,
    LivingSituation,
    SupportNetworkStrength,
    GroupPreference
} from '@/types/wellness-profile'

const AGE_RANGES: { id: AgeRange; label: string }[] = [
    { id: 'under-18', label: 'Under 18' },
    { id: '18-24', label: '18-24' },
    { id: '25-34', label: '25-34' },
    { id: '35-44', label: '35-44' },
    { id: '45-54', label: '45-54' },
    { id: '55-64', label: '55-64' },
    { id: '65-plus', label: '65+' },
]

const LIFE_STAGES: { id: LifeStage; label: string; description: string }[] = [
    { id: 'student', label: 'Student', description: 'In school or university' },
    { id: 'working', label: 'Working', description: 'Employed or self-employed' },
    { id: 'unemployed', label: 'Between jobs', description: 'Currently seeking work' },
    { id: 'stay-at-home', label: 'Caregiver', description: 'Stay-at-home parent or caregiver' },
    { id: 'retired', label: 'Retired', description: 'No longer working' },
    { id: 'other', label: 'Other', description: 'Something else' },
]

const LIVING_SITUATIONS: { id: LivingSituation; label: string }[] = [
    { id: 'alone', label: 'I live alone' },
    { id: 'with-partner', label: 'With a partner/spouse' },
    { id: 'with-family', label: 'With family' },
    { id: 'with-roommates', label: 'With roommates' },
    { id: 'other', label: 'Other' },
]

const SUPPORT_LEVELS: { id: SupportNetworkStrength; label: string; description: string }[] = [
    { id: 'none', label: 'No support', description: 'I don\'t have people I can turn to' },
    { id: 'weak', label: 'Limited', description: 'A few people, but I don\'t lean on them much' },
    { id: 'moderate', label: 'Moderate', description: 'Some supportive people in my life' },
    { id: 'strong', label: 'Strong', description: 'Solid network of supportive people' },
]

const GROUP_PREFERENCES: { id: GroupPreference; label: string; description: string }[] = [
    { id: 'prefer-individual', label: 'Individual', description: 'I prefer working on things on my own' },
    { id: 'open-to-group', label: 'Open to either', description: 'I\'m flexible with individual or group' },
    { id: 'prefer-group', label: 'Group', description: 'I prefer learning with others' },
]

export default function AboutYouPage() {
    const router = useRouter()
    const { data, updateData, setCurrentStep } = useOnboarding()

    const [ageRange, setAgeRange] = useState<AgeRange | ''>(data.ageRange || '')
    const [lifeStage, setLifeStage] = useState<LifeStage | ''>(data.lifeStage || '')
    const [livingSituation, setLivingSituation] = useState<LivingSituation | ''>(data.livingSituation || '')
    const [supportNetwork, setSupportNetwork] = useState<SupportNetworkStrength | ''>(data.supportNetworkStrength || '')
    const [hasTrustedPerson, setHasTrustedPerson] = useState<boolean | null>(data.hasTrustedPerson)
    const [groupPreference, setGroupPreference] = useState<GroupPreference | ''>(data.comfortWithGroupActivities || '')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        updateData({
            ageRange,
            lifeStage,
            livingSituation,
            supportNetworkStrength: supportNetwork,
            hasTrustedPerson,
            comfortWithGroupActivities: groupPreference,
        })

        // Save to server
        try {
            const res = await fetch('/api/onboarding/about-you', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ageRange: ageRange || undefined,
                    lifeStage: lifeStage || undefined,
                    livingSituation: livingSituation || undefined,
                    supportNetworkStrength: supportNetwork || undefined,
                    hasTrustedPerson,
                    comfortWithGroupActivities: groupPreference || undefined,
                }),
            })
            if (!res.ok) throw new Error('Failed to save')
        } catch (err) {
            console.error('Error saving about you:', err)
            setError('Failed to save your info. Please try again.')
            return
        }

        setCurrentStep(6)
        router.push('/onboarding/your-experience')
    }

    const handleBack = () => {
        setCurrentStep(4)
        router.push('/onboarding/goals')
    }

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={5} totalSteps={8} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-2xl w-full">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Tell us a bit about you
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                This helps us better personalize your AI Coaching experience. All fields are optional — share only what you&apos;re comfortable with.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Age Range */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                    Age range <span className="text-gray-400 font-normal text-sm">(optional)</span>
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {AGE_RANGES.map((age) => (
                                        <button
                                            key={age.id}
                                            type="button"
                                            onClick={() => setAgeRange(ageRange === age.id ? '' : age.id)}
                                            className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${ageRange === age.id
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            {age.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Life Stage */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                    Current life stage <span className="text-gray-400 font-normal text-sm">(optional)</span>
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {LIFE_STAGES.map((stage) => (
                                        <button
                                            key={stage.id}
                                            type="button"
                                            onClick={() => setLifeStage(lifeStage === stage.id ? '' : stage.id)}
                                            className={`p-3 rounded-xl border-2 text-left transition-all ${lifeStage === stage.id
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <span className={`block font-medium text-sm ${lifeStage === stage.id ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                {stage.label}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {stage.description}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Living Situation */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                    Living situation <span className="text-gray-400 font-normal text-sm">(optional)</span>
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {LIVING_SITUATIONS.map((situation) => (
                                        <button
                                            key={situation.id}
                                            type="button"
                                            onClick={() => setLivingSituation(livingSituation === situation.id ? '' : situation.id)}
                                            className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${livingSituation === situation.id
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            {situation.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Support Network */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                    How would you describe your support network? <span className="text-gray-400 font-normal text-sm">(optional)</span>
                                </h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {SUPPORT_LEVELS.map((level) => (
                                        <button
                                            key={level.id}
                                            type="button"
                                            onClick={() => setSupportNetwork(supportNetwork === level.id ? '' : level.id)}
                                            className={`p-3 rounded-xl border-2 text-left transition-all ${supportNetwork === level.id
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <span className={`block font-medium text-sm ${supportNetwork === level.id ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                {level.label}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {level.description}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Trusted Person */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                    Do you have someone you trust to talk to about how you feel? <span className="text-gray-400 font-normal text-sm">(optional)</span>
                                </h2>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setHasTrustedPerson(hasTrustedPerson === true ? null : true)}
                                        className={`flex-1 p-3 rounded-xl border-2 text-center font-medium transition-all ${hasTrustedPerson === true
                                            ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setHasTrustedPerson(hasTrustedPerson === false ? null : false)}
                                        className={`flex-1 p-3 rounded-xl border-2 text-center font-medium transition-all ${hasTrustedPerson === false
                                            ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        Not really
                                    </button>
                                </div>
                            </div>

                            {/* Group Preference */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                    Learning preference <span className="text-gray-400 font-normal text-sm">(optional)</span>
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {GROUP_PREFERENCES.map((pref) => (
                                        <button
                                            key={pref.id}
                                            type="button"
                                            onClick={() => setGroupPreference(groupPreference === pref.id ? '' : pref.id)}
                                            className={`p-3 rounded-xl border-2 text-left transition-all ${groupPreference === pref.id
                                                ? 'border-primary-500 bg-violet-50 dark:bg-violet-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <span className={`block font-medium text-sm ${groupPreference === pref.id ? 'text-violet-700 dark:text-violet-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                {pref.label}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {pref.description}
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
