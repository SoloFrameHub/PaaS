'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'

const BASE_SECTIONS = [
    { id: 'context', title: 'Business Context' },
    { id: 'state', title: 'Current State' },
    { id: 'profile', title: 'Founder Profile' },
    { id: 'disc', title: 'Behavioral Styles (DISC)' },
    { id: 'priorities', title: 'Learning Priorities' },
    { id: 'capacity', title: 'Engagement Capacity' },
    { id: 'goals', title: 'Goals & Success' },
]

const CREATOR_SECTION = { id: 'creator', title: 'Creator Business' }

export default function QuestionnairePage() {
    const router = useRouter()
    const { data, updateData } = useOnboarding()
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
    const [loading, setLoading] = useState(false)

    // Dynamically include creator section for creator-coach business model
    const SECTIONS = useMemo(() => {
        if (data.businessModel === 'creator-coach') {
            // Insert creator section after 'profile' (index 2)
            return [
                ...BASE_SECTIONS.slice(0, 3),
                CREATOR_SECTION,
                ...BASE_SECTIONS.slice(3)
            ]
        }
        return BASE_SECTIONS
    }, [data.businessModel])

    const currentSection = SECTIONS[currentSectionIndex]

    const handleNext = async () => {
        if (currentSectionIndex < SECTIONS.length - 1) {
            setCurrentSectionIndex(currentSectionIndex + 1)
            window.scrollTo(0, 0)
        } else {
            handleSubmit()
        }
    }

    const handleBack = () => {
        if (currentSectionIndex > 0) {
            setCurrentSectionIndex(currentSectionIndex - 1)
            window.scrollTo(0, 0)
        } else {
            router.back()
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/onboarding/questionnaire', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questionnaire: data.questionnaire }),
            })

            if (!response.ok) throw new Error('Failed to save questionnaire')

            router.push('/onboarding/context')
        } catch (error) {
            console.error('Error saving questionnaire:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateQ = (updates: any) => {
        updateData({
            questionnaire: {
                ...data.questionnaire,
                ...updates
            }
        })
    }

    return (
        <main className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="relative flex flex-col min-h-screen">
                <OnboardingHeader />
                <OnboardingProgress step={3} />

                <div className="flex-1 flex flex-col items-center px-4 py-8">
                    <div className="max-w-2xl w-full">
                        {/* Section Header */}
                        <div className="mb-8">
                            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold uppercase tracking-wider">
                                Section {currentSectionIndex + 1} of {SECTIONS.length}
                            </span>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                                {currentSection.title}
                            </h1>
                        </div>

                        {/* Section Content */}
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {currentSection.id === 'context' && (
                                <>
                                    <div className="space-y-4">
                                        <label htmlFor="q1-pitch" className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q1. What are you building? (e.g. B2B SaaS for HR teams)
                                        </label>
                                        <textarea
                                            id="q1-pitch"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none min-h-[100px]"
                                            placeholder="Describe your product, industry, and target customer..."
                                            value={data.pitch}
                                            onChange={(e) => updateData({ pitch: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label htmlFor="q3-industry" className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q2. Who are you selling to? (Target Market / Industry)
                                        </label>
                                        <p className="text-sm text-gray-500 mb-2" id="q3-desc">Select the primary industry of your ideal customer.</p>
                                        <select
                                            id="q3-industry"
                                            aria-describedby="q3-desc"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
                                            value={data.questionnaire.industry}
                                            onChange={(e) => updateQ({ industry: e.target.value })}
                                        >
                                            <option value="">Select an industry...</option>
                                            <option value="saas">SaaS / Software</option>
                                            <option value="ecommerce">E-commerce / DTC</option>
                                            <option value="services">Professional Services / Consulting</option>
                                            <option value="coaching">Coaching / Courses / Education</option>
                                            <option value="agency">Agency / Freelance</option>
                                            <option value="healthcare">Healthcare / Wellness</option>
                                            <option value="fintech">Fintech / Finance</option>
                                            <option value="ai">AI / Tech Tools</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="q4-label">
                                        <h2 id="q4-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q3. Target Deal Size (Monthly or Annual Value)
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'transactional', label: 'Under $100/mo (Self-serve)' },
                                                { id: 'smb', label: '$100 - $1K/mo (SMB)' },
                                                { id: 'mid_market', label: '$1K - $5K/mo (Mid-market)' },
                                                { id: 'enterprise', label: '$50K+/year (Enterprise)' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ deal_size: opt.id })}
                                                    aria-pressed={data.questionnaire.deal_size === opt.id}
                                                    className={`px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.deal_size === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    <div className="font-semibold">{opt.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {currentSection.id === 'state' && (
                                <>
                                    <div className="space-y-4" role="group" aria-labelledby="q5-label">
                                        <h2 id="q5-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q4. Where are you in your sales journey?
                                        </h2>
                                        <div className="space-y-3">
                                            {[
                                                "Haven't started outreach yet",
                                                'Doing outreach, no meetings booked',
                                                'Getting meetings, struggling to close',
                                                'Closing some deals, want to systematize',
                                                'Have a process, optimizing for scale',
                                            ].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => updateQ({ sales_journey: opt })}
                                                    aria-pressed={data.questionnaire.sales_journey === opt}
                                                    className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.sales_journey === opt
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="q6-label">
                                        <h2 id="q6-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q5. Current Monthly Revenue (MRR)
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                'Pre-revenue / $0',
                                                'Under $1K',
                                                '$1K - $5K',
                                                '$5K - $20K',
                                                '$20K+',
                                            ].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => updateQ({ revenue_range: opt })}
                                                    aria-pressed={data.questionnaire.revenue_range === opt}
                                                    className={`px-4 py-3 text-center rounded-xl border-2 transition-all ${data.questionnaire.revenue_range === opt
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Add more sections here or in a separate call to avoid huge blocks */}
                            {currentSection.id === 'profile' && (
                                <div className="space-y-8">
                                    <div className="space-y-4" role="group" aria-labelledby="q8-label">
                                        <h2 id="q8-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q6. Which description fits you best?
                                        </h2>
                                        <div className="space-y-3">
                                            {[
                                                { id: 'tech', label: 'Technical founder - I built the product, now need to sell it' },
                                                { id: 'expert', label: 'Domain expert - I know the industry, learning to productize' },
                                                { id: 'service', label: 'Service provider - Running an agency/consulting, want to scale' },
                                                { id: 'creator', label: 'Creator/Coach - Building audience-driven business' },
                                                { id: 'returning', label: 'Returning founder - Did this before, starting fresh' },
                                                { id: 'side', label: 'Side project founder - Building while employed full-time' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ founder_description: opt.label })}
                                                    aria-pressed={data.questionnaire.founder_description === opt.label}
                                                    className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.founder_description === opt.label
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Creator Business Section - Only shown for creator-coach */}
                            {currentSection.id === 'creator' && (
                                <div className="space-y-8">
                                    <div className="space-y-4" role="group" aria-labelledby="creator-sell-label">
                                        <h2 id="creator-sell-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q7. What do you primarily sell?
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { id: 'courses', label: 'Courses / Digital Products' },
                                                { id: 'coaching-1on1', label: '1:1 Coaching' },
                                                { id: 'coaching-group', label: 'Group Coaching Programs' },
                                                { id: 'membership', label: 'Memberships / Subscriptions' },
                                                { id: 'community', label: 'Community Access' },
                                                { id: 'hybrid', label: 'Hybrid (Multiple Offer Types)' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ creator_offer_type: opt.id })}
                                                    aria-pressed={data.questionnaire.creator_offer_type === opt.id}
                                                    className={`px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.creator_offer_type === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-price-label">
                                        <h2 id="creator-price-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q8. What's your primary offer price point?
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[
                                                { id: 'low-ticket', label: '$0-$97', sub: 'Low-ticket' },
                                                { id: 'mid-ticket', label: '$197-$997', sub: 'Mid-ticket' },
                                                { id: 'high-ticket', label: '$1K-$5K', sub: 'High-ticket' },
                                                { id: 'premium', label: '$5K+', sub: 'Premium' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ creator_price_point: opt.id })}
                                                    aria-pressed={data.questionnaire.creator_price_point === opt.id}
                                                    className={`px-4 py-4 text-center rounded-xl border-2 transition-all ${data.questionnaire.creator_price_point === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    <p className={`font-bold ${data.questionnaire.creator_price_point === opt.id ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-gray-100'}`}>{opt.label}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{opt.sub}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-acq-label">
                                        <h2 id="creator-acq-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q9. How do you primarily acquire customers? <span className="text-gray-400 text-sm">(Select all that apply)</span>
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {[
                                                { id: 'webinar', label: 'Webinars' },
                                                { id: 'challenge', label: 'Challenge Launches' },
                                                { id: 'dm-selling', label: 'DM Selling' },
                                                { id: 'email', label: 'Email Sequences' },
                                                { id: 'organic', label: 'Organic Content' },
                                                { id: 'paid', label: 'Paid Ads' },
                                                { id: 'referrals', label: 'Referrals' },
                                            ].map((opt) => {
                                                const isSelected = data.questionnaire.creator_acquisition?.includes(opt.id)
                                                return (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => {
                                                            const current = data.questionnaire.creator_acquisition || []
                                                            updateQ({
                                                                creator_acquisition: isSelected
                                                                    ? current.filter(c => c !== opt.id)
                                                                    : [...current, opt.id]
                                                            })
                                                        }}
                                                        aria-pressed={isSelected}
                                                        className={`px-4 py-3 text-center rounded-xl border-2 transition-all ${isSelected
                                                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                            : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                            }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-plat-label">
                                        <h2 id="creator-plat-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q10. What platforms drive your audience? <span className="text-gray-400 text-sm">(Select all that apply)</span>
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {[
                                                { id: 'youtube', label: 'YouTube' },
                                                { id: 'instagram', label: 'Instagram' },
                                                { id: 'tiktok', label: 'TikTok' },
                                                { id: 'twitter', label: 'Twitter/X' },
                                                { id: 'linkedin', label: 'LinkedIn' },
                                                { id: 'podcast', label: 'Podcast' },
                                                { id: 'substack', label: 'Substack/Newsletter' },
                                                { id: 'other', label: 'Other' },
                                            ].map((opt) => {
                                                const isSelected = data.questionnaire.creator_platforms?.includes(opt.id)
                                                return (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => {
                                                            const current = data.questionnaire.creator_platforms || []
                                                            updateQ({
                                                                creator_platforms: isSelected
                                                                    ? current.filter(c => c !== opt.id)
                                                                    : [...current, opt.id]
                                                            })
                                                        }}
                                                        aria-pressed={isSelected}
                                                        className={`px-4 py-3 text-center rounded-xl border-2 transition-all ${isSelected
                                                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                            : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                            }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-list-label">
                                        <h2 id="creator-list-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q11. How big is your email list?
                                        </h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[
                                                { id: 'under-500', label: 'Under 500' },
                                                { id: '500-2000', label: '500 - 2,000' },
                                                { id: '2000-10000', label: '2,000 - 10,000' },
                                                { id: '10000-plus', label: '10,000+' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ creator_email_list_size: opt.id })}
                                                    aria-pressed={data.questionnaire.creator_email_list_size === opt.id}
                                                    className={`px-4 py-3 text-center rounded-xl border-2 transition-all ${data.questionnaire.creator_email_list_size === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4" role="group" aria-labelledby="creator-sales-label">
                                        <h2 id="creator-sales-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q12. Do you currently do sales calls?
                                        </h2>
                                        <div className="space-y-3">
                                            {[
                                                { id: 'self-close', label: 'Yes - I close all my own sales' },
                                                { id: 'team', label: 'Yes - I have a setter/closer team' },
                                                { id: 'automated', label: 'No - I sell through automated funnels only' },
                                                { id: 'want-to-start', label: 'No - but I want to start doing calls' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ creator_sales_call_status: opt.id })}
                                                    aria-pressed={data.questionnaire.creator_sales_call_status === opt.id}
                                                    className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.creator_sales_call_status === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section DISC placeholder for now */}
                            {currentSection.id === 'disc' && (
                                <div className="space-y-8">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        How do you handle these common sales scenarios? This helps us tailor your coaching tone.
                                    </p>
                                    <div className="space-y-6" role="group" aria-labelledby="disc-scenario-label">
                                        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                            <p id="disc-scenario-label" className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                                                Scenario: A prospect starts drilling into technical details you don't know perfectly. Do you:
                                            </p>
                                            <div className="space-y-3">
                                                {[
                                                    { id: 'D', text: 'Confidently redirect to business outcomes you can speak to' },
                                                    { id: 'I', text: 'Engage enthusiastically and promise to get them answers' },
                                                    { id: 'S', text: 'Honestly admit the gap and offer to follow up with specifics' },
                                                    { id: 'C', text: 'Ask clarifying questions to understand exactly what they need' },
                                                ].map((opt) => (
                                                    <button
                                                        key={opt.id}
                                                        type="button"
                                                        onClick={() => updateQ({ disc_answers: { ...data.questionnaire.disc_answers, q10: opt.id } })}
                                                        aria-pressed={data.questionnaire.disc_answers.q10 === opt.id}
                                                        className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.disc_answers.q10 === opt.id
                                                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                            : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 bg-white dark:bg-gray-900'
                                                            }`}
                                                    >
                                                        {opt.text}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentSection.id === 'priorities' && (
                                <div className="space-y-8">
                                    <div className="space-y-4" role="group" aria-labelledby="q15-label">
                                        <h2 id="q15-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q13. What feels most urgent right now?
                                        </h2>
                                        <div className="space-y-3">
                                            {[
                                                'Building my prospect list (finding WHO to sell to)',
                                                'Getting responses to outreach (LinkedIn, cold email)',
                                                'Running better discovery calls',
                                                'Giving demos that convert',
                                                'Handling objections and closing deals',
                                                'Systemizing what\'s working',
                                            ].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => updateQ({ urgency: opt })}
                                                    aria-pressed={data.questionnaire.urgency === opt}
                                                    className={`w-full px-4 py-3 text-left rounded-xl border-2 transition-all ${data.questionnaire.urgency === opt
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentSection.id === 'capacity' && (
                                <div className="space-y-8">
                                    <div className="space-y-4" role="group" aria-labelledby="q18-label">
                                        <h2 id="q18-label" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q14. Learning style preference
                                        </h2>
                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { id: 'aggressive', label: 'Give me frameworks, I\'ll figure it out (Aggressive)', sub: 'Fast-paced, high autonomy' },
                                                { id: 'assistive', label: 'Guide me step by step (Assistive)', sub: 'Structured, detailed guidance' },
                                                { id: 'adaptive', label: 'Mix of both depending on topic (Adaptive)', sub: 'Balanced based on complexity' },
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => updateQ({ learning_style: opt.id as any })}
                                                    aria-pressed={data.questionnaire.learning_style === opt.id}
                                                    className={`px-6 py-4 text-left rounded-xl border-2 transition-all ${data.questionnaire.learning_style === opt.id
                                                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'
                                                        }`}
                                                >
                                                    <p className={`font-semibold ${data.questionnaire.learning_style === opt.id ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                                        {opt.label}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">{opt.sub}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentSection.id === 'goals' && (
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label htmlFor="q19-success" className="block text-lg font-medium text-gray-800 dark:text-gray-200">
                                            Q15. What does success look like in 90 days?
                                        </label>
                                        <textarea
                                            id="q19-success"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none min-h-[120px]"
                                            placeholder="Be specific. e.g. Close 3 enterprise deals, or set up a predictable pipeline of 10 meetings/month..."
                                            value={data.questionnaire.success_90_days}
                                            onChange={(e) => updateQ({ success_90_days: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-12 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <button
                                onClick={handleBack}
                                className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors"
                            >
                                {currentSectionIndex === 0 ? 'Back to Intro' : 'Previous Section'}
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={loading}
                                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        {currentSectionIndex === SECTIONS.length - 1 ? 'Complete Questionnaire' : 'Next Section'}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
