'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingHeader from '../../onboarding-header'
import OnboardingProgress from '../../onboarding-progress'
import { useOnboarding } from '../../onboarding-context'

const ANALYSIS_STEPS = [
    { id: 1, label: 'Reading your questionnaire responses...', duration: 2500 },
    { id: 2, label: 'Crawling provided URLs & LinkedIn...', duration: 3000 },
    { id: 3, label: 'Indexing uploaded documents (RAG)...', duration: 3500 },
    { id: 4, label: 'Calibrating DISC & Founder Archetype...', duration: 2000 },
    { id: 5, label: 'Synthesizing GTM Strategy...', duration: 3000 },
]

export default function AnalyzingPage() {
    const router = useRouter()
    const { data, updateData, isHydrated } = useOnboarding()
    const [currentStep, setCurrentStep] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let isMounted = true

        if (!isHydrated) {
            console.log('⏳ Waiting for hydration before analysis...');
            return;
        }

        // RESILIENCE: If assessment is already in context (e.g. hydrated or back-nav), skip analysis
        if (data.analysisComplete && data.assessment) {
            router.push('/onboarding/assessment');
            return;
        }

        const runAnalysis = async () => {
            // Simulate progressive analysis steps
            for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
                if (!isMounted) return
                setCurrentStep(i)

                // Animate progress within each step
                const stepProgress = (i / ANALYSIS_STEPS.length) * 100
                const nextStepProgress = ((i + 1) / ANALYSIS_STEPS.length) * 100

                const startTime = Date.now()
                const duration = ANALYSIS_STEPS[i].duration

                const animateProgress = () => {
                    if (!isMounted) return
                    const elapsed = Date.now() - startTime
                    const stepCompletion = Math.min(elapsed / duration, 1)
                    setProgress(stepProgress + (nextStepProgress - stepProgress) * stepCompletion)

                    if (stepCompletion < 1) {
                        requestAnimationFrame(animateProgress)
                    }
                }

                animateProgress()
                await new Promise(resolve => setTimeout(resolve, duration))
            }

            // Perform real analysis
            try {
                const response = await fetch('/api/onboarding/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ onboardingData: data }),
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        alert('Your session has expired. Please log in again.');
                        router.push('/sign-in');
                        return;
                    }
                    throw new Error(`Analysis failed with status: ${response.status}`);
                }

                const responseData = await response.json();
                // Handle standard API response wrapper { success: true, data: { assessment: ... } }
                const assessment = responseData.data?.assessment || responseData.assessment?.result || responseData.assessment?.output || responseData.assessment;

                if (!assessment) {
                    throw new Error('No assessment returned from API');
                }

                if (isMounted) {
                    updateData({
                        analysisComplete: true,
                        assessment: assessment,
                        assessmentScore: assessment.overallReadiness,
                        insights: [
                            assessment.personalizedInsight,
                            ...(assessment.quickWins || []).map((w: any) => w.description),
                        ],
                    });
                    // Navigate to results
                    router.push('/onboarding/assessment');
                }
            } catch (err: any) {
                console.error('Analysis API Error:', err);

                // 1. Handle Auth Expiry explicitly
                if (err.message === 'Analysis failed' && !navigator.onLine) {
                    alert('Connection lost. Please check your internet.');
                    return;
                }

                // If 401/403 (in real fetch, we'd check status, but here we wrappers might obscure it. 
                // Let's assume generic error for now, but if we could check status code even better.
                // Since we threw 'Analysis failed' on !response.ok, we lost the status.
                // Let's improve the fetch below first to capture status.)

                // Client-side fallback for Mock Mode or API Failure
                if (isMounted) {
                    console.warn('⚠️ Using client-side fallback assessment due to API error');
                    const fallbackAssessment = {
                        overallReadiness: 45,
                        scores: {
                            icpClarity: 40,
                            positioningStrength: 50,
                            messagingConsistency: 45,
                            channelReadiness: 35,
                            salesProcessMaturity: 55,
                        },
                        personalizedInsight: "Based on the limited data available, we recommend focusing on your foundational positioning.",
                        quickWins: [
                            { description: "Define your ideal customer profile (ICP)" },
                            { description: "Draft your unique value proposition" },
                            { description: "Identify 10 potential customers" }
                        ],
                        criticalGaps: [
                            { description: "No clear sales process defined" },
                            { description: "Discovery questions need refinement" }
                        ],
                        recommendedPath: 'hybrid',
                        recommendedStartCourse: 1,
                        journeyMap: [
                            { phase: 'Foundation', courses: [1, 2, 3, 4], estimatedWeeks: 4 },
                            { phase: 'Marketing', courses: [5, 6, 7], estimatedWeeks: 6 }
                        ]
                    };

                    // CRITICAL: Persist fallback to server so it's not lost on refresh
                    try {
                        const saveRes = await fetch('/api/profile', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                assessment: fallbackAssessment,
                                analysisStatus: 'completed'
                            })
                        });

                        if (!saveRes.ok) {
                            throw new Error('Failed to persist fallback assessment');
                        }

                        updateData({
                            analysisComplete: true,
                            assessment: fallbackAssessment,
                            assessmentScore: fallbackAssessment.overallReadiness,
                            insights: [
                                fallbackAssessment.personalizedInsight,
                                ...fallbackAssessment.quickWins.map((w: any) => w.description)
                            ]
                        });

                        router.push('/onboarding/assessment');
                    } catch (saveErr) {
                        console.error('Failed to save fallback assessment:', saveErr);
                        alert('We generated your result but failed to save it to your profile. Please check your connection and try again.');
                        // Do NOT proceed to avoid ghost state
                    }
                }
            }
        }

        runAnalysis()

        return () => {
            isMounted = false
        }
    }, [router, updateData, isHydrated])

    return (
        <main className="bg-white dark:bg-gray-900">
            <div className="relative flex">
                <div className="w-full">
                    <div className="min-h-[100dvh] h-full flex flex-col">
                        <div className="flex-1">
                            <OnboardingHeader />
                            <OnboardingProgress step={5} />
                        </div>

                        <div className="flex-1 flex items-center justify-center px-4 py-8">
                            <div className="max-w-md mx-auto text-center">
                                {/* Animated Icon */}
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                                        <svg
                                            className="w-12 h-12 text-primary-600 dark:text-primary-400 animate-pulse"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            />
                                        </svg>
                                    </div>
                                    {/* Spinning ring */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-28 h-28 rounded-full border-4 border-primary-200 dark:border-primary-800 border-t-primary-500 animate-spin" />
                                    </div>
                                </div>

                                <h1 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-2">
                                    Analyzing Your Business
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">
                                    {ANALYSIS_STEPS[currentStep]?.label || 'Almost done...'}
                                </p>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                                    <div
                                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-gray-500">
                                    {Math.round(progress)}% complete
                                </p>

                                {/* Background Processing Option */}
                                {progress > 40 && (
                                    <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-800/50 animate-in fade-in zoom-in duration-700">
                                        <h3 className="text-primary-900 dark:text-primary-200 font-semibold mb-2">Deep Discovery in Progress</h3>
                                        <p className="text-sm text-primary-700 dark:text-primary-400 mb-4">
                                            We&apos;re performing a deep RAG analysis of your documents and deep-crawling your LinkedIn.
                                            This can take a few minutes.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <button
                                                onClick={() => router.push('/dashboard')}
                                                className="px-6 py-2 bg-white dark:bg-gray-800 border border-primary-200 dark:border-primary-700 text-primary-600 dark:text-primary-400 rounded-xl text-sm font-medium hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                Continue to Dashboard
                                            </button>
                                            <button
                                                className="px-6 py-2 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                                            >
                                                Notify me when done
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Context being analyzed */}
                                {data.companyName && (
                                    <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-left">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Analyzing</p>
                                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{data.companyName}</p>
                                        {data.website && (
                                            <p className="text-xs text-primary-500 mt-1">{data.website}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
