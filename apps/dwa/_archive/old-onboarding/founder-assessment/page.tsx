'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/app-provider'
import {
    ASSESSMENT_QUESTIONS,
    DISC_SCENARIOS
} from '@/lib/data/onboarding-data'
import {
    getIndustries,
    completeOnboarding
} from '@/lib/api/onboarding-client'
import type { Industry } from '@/types/roleplay'
import type { UserFounderProfile } from '@/types/user'
import OnboardingHeader from '../onboarding-header'
import OnboardingProgress from '../onboarding-progress'

export default function FounderAssessmentPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [industries, setIndustries] = useState<Industry[]>([])
    const [isLoading, setIsLoading] = useState(false)

    // Form State
    const [categoryAnswers, setCategoryAnswers] = useState<Record<string, string>>({})
    const [discAnswers, setDiscAnswers] = useState<Record<string, string>>({})
    const [businessContext, setBusinessContext] = useState<UserFounderProfile['business_context']>({
        industry: '',
        company_stage: 'idea',
        target_customer_type: 'b2b',
        typical_deal_size: 'smb',
        target_roles: []
    })

    useEffect(() => {
        const fetchIndustries = async () => {
            const data = await getIndustries()
            setIndustries(data)
        }
        fetchIndustries()
    }, [])

    const handleComplete = async () => {
        if (!user) return
        setIsLoading(true)
        try {
            await completeOnboarding(
                user.uid,
                categoryAnswers,
                businessContext,
                discAnswers
            )
            router.push('/dashboard')
        } catch (error) {
            // Log to structured logger via API if needed, but don't console.error in production
            alert('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-[2rem] shadow-2xl shadow-indigo-500/10 border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                    {/* Header Section */}
                    <div className="px-8 pt-10 pb-6 text-center border-b border-gray-50 dark:border-gray-700/30">
                        <OnboardingHeader />

                        <div className="mt-8 flex justify-center gap-3">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${step === s
                                        ? 'w-8 bg-indigo-500'
                                        : step > s
                                            ? 'w-4 bg-indigo-500/40'
                                            : 'w-4 bg-gray-200 dark:bg-gray-700'
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="mt-4 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">
                            Milestone {step} of 3
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="px-8 py-10 md:px-12" aria-live="polite" aria-atomic="true">
                        {step === 1 && (
                            <FounderCategoryStep
                                answers={categoryAnswers}
                                onChange={setCategoryAnswers}
                                onNext={() => setStep(2)}
                            />
                        )}
                        {step === 2 && (
                            <BusinessContextStep
                                industries={industries}
                                data={businessContext}
                                onChange={setBusinessContext}
                                onNext={() => setStep(3)}
                                onBack={() => setStep(1)}
                            />
                        )}
                        {step === 3 && (
                            <DiscAssessmentStep
                                answers={discAnswers}
                                onChange={setDiscAnswers}
                                onComplete={handleComplete}
                                onBack={() => setStep(2)}
                                isSubmitting={isLoading}
                            />
                        )}
                    </div>
                </div>

                {/* Footer Help */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400 font-medium">
                        Secure and private. Your data is used exclusively to personalize your coaching experience.
                    </p>
                </div>
            </div>
        </main>
    )
}

// Proper interfaces for step components
interface FounderCategoryStepProps {
    answers: Record<string, string>;
    onChange: (answers: Record<string, string>) => void;
    onNext: () => void;
}

interface BusinessContextStepProps {
    industries: Industry[];
    data: UserFounderProfile['business_context'];
    onChange: (data: UserFounderProfile['business_context']) => void;
    onNext: () => void;
    onBack: () => void;
}

interface DiscAssessmentStepProps {
    answers: Record<string, string>;
    onChange: (answers: Record<string, string>) => void;
    onComplete: () => void;
    onBack: () => void;
    isSubmitting: boolean;
}

function FounderCategoryStep({ answers, onChange, onNext }: FounderCategoryStepProps) {
    const isComplete = ASSESSMENT_QUESTIONS.every(q => answers[q.id])

    return (
        <div>
            <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">Who are you as a founder?</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">This helps us adapt our coaching tone to your natural style.</p>

            <div className="space-y-8">
                {ASSESSMENT_QUESTIONS.map((q) => (
                    <div key={q.id}>
                        <label htmlFor={q.id} className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{q.question}</label>
                        <select
                            id={q.id}
                            className="form-select w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={answers[q.id] || ""}
                            onChange={(e) => onChange({ ...answers, [q.id]: e.target.value })}
                        >
                            <option value="" disabled>Select an answer...</option>
                            {q.options.map((option) => (
                                <option key={option.text} value={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-end">
                <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50"
                    onClick={onNext}
                    disabled={!isComplete}
                >
                    Next Step -&gt;
                </button>
            </div>
        </div>
    )
}

function BusinessContextStep({ industries, data, onChange, onNext, onBack }: BusinessContextStepProps) {
    const isComplete = data.industry && data.target_roles.length > 0

    const handleRoleToggle = (roleId: string) => {
        const roles = data.target_roles.includes(roleId)
            ? data.target_roles.filter((r: string) => r !== roleId)
            : [...data.target_roles, roleId]
        onChange({ ...data, target_roles: roles })
    }

    // Simplified roles for beta selection
    const rolesList = [
        { id: 'ceo_founder', name: 'CEO / Founder' },
        { id: 'cto_skeptic', name: 'CTO / VP Engineering' },
        { id: 'vp_sales', name: 'VP Sales' },
        { id: 'dir_engineering', name: 'Director of Engineering' }
    ]

    return (
        <div>
            <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">What are you selling?</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">This data trains our AI agents to provide hyper-realistic simulations of high-stakes sales encounters in your specific industry.</p>

            <div className="space-y-6">
                <div>
                    <label htmlFor="industry" className="block text-sm font-medium mb-1">Target Industry</label>
                    <select
                        id="industry"
                        className="form-select w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        value={data.industry}
                        onChange={(e) => onChange({ ...data, industry: e.target.value })}
                    >
                        <option value="">Select an industry...</option>
                        {industries.map((ind: Industry) => (
                            <option key={ind.industry_id} value={ind.industry_id}>{ind.display_name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="deal_size" className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">Typical Deal Size</label>
                    <select
                        id="deal_size"
                        className="form-select w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        value={data.typical_deal_size}
                        onChange={(e) => onChange({ ...data, typical_deal_size: e.target.value as 'transactional' | 'smb' | 'mid_market' | 'enterprise' })}
                    >
                        {['transactional', 'smb', 'mid_market', 'enterprise'].map((size) => (
                            <option key={size} value={size}>
                                {size.replace('_', ' ').toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-3 text-gray-800 dark:text-gray-100">Who do you usually sell to? (Select all that apply)</label>
                    <div className="grid grid-cols-1 gap-3">
                        {rolesList.map((role) => (
                            <div
                                key={role.id}
                                onClick={() => handleRoleToggle(role.id)}
                                className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${data.target_roles.includes(role.id)
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                                    : 'border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800 hover:border-gray-300'
                                    }`}
                            >
                                <div className={`flex items-center justify-center w-5 h-5 rounded border ${data.target_roles.includes(role.id)
                                    ? 'bg-indigo-500 border-indigo-500 text-white'
                                    : 'border-gray-300 dark:border-gray-600'
                                    }`}>
                                    {data.target_roles.includes(role.id) && (
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="ml-3 text-sm font-medium text-gray-800 dark:text-gray-100">{role.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-10 flex justify-between">
                <button className="text-gray-500 hover:text-gray-600 underline" onClick={onBack}>Back</button>
                <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50"
                    onClick={onNext}
                    disabled={!isComplete}
                >
                    Next Step -&gt;
                </button>
            </div>
        </div>
    )
}

function DiscAssessmentStep({ answers, onChange, onComplete, onBack, isSubmitting }: DiscAssessmentStepProps) {
    const isComplete = DISC_SCENARIOS.every(s => answers[s.id])

    return (
        <div>
            <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2">How do you communicate?</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">This helps us baseline your selling style to track your growth.</p>

            <div className="space-y-8">
                {DISC_SCENARIOS.map((s) => (
                    <div key={s.id}>
                        <label htmlFor={s.id} className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{s.scenario}</label>
                        <select
                            id={s.id}
                            className="form-select w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={answers[s.id] || ""}
                            onChange={(e) => onChange({ ...answers, [s.id]: e.target.value })}
                        >
                            <option value="" disabled>Select a response...</option>
                            {s.options.map((option) => (
                                <option key={option.text} value={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
                <button className="text-gray-500 hover:text-gray-600 underline" onClick={onBack}>Back</button>
                <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50 flex items-center"
                    onClick={onComplete}
                    disabled={!isComplete || isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Finalizing...
                        </>
                    ) : 'Complete Onboarding!'}
                </button>
            </div>
        </div>
    )
}
