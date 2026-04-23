'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import type { BusinessModel, Stage } from '@/types/profile'

export interface OnboardingData {
    // Simplified steps (kept for backward compatibility where needed)
    userName: string
    companyName: string
    businessModel: BusinessModel | ''
    website: string
    pitch: string
    targetAudience: string
    revenueGoal: string
    timeline: string
    stage: Stage | ''
    uploadedDocuments: { name: string; id: string; content?: string; type?: string; status?: 'pending' | 'ready' | 'processing' | 'indexed' | 'failed' }[]
    linkedinUrl: string
    linkedinAbout: string
    linkedinPermission: boolean

    // --- NEW QUESTIONNAIRE STRUCTURE ---
    questionnaire: {
        // Section 1: Business Context
        target_roles: string[]
        industry: string
        deal_size: 'transactional' | 'smb' | 'mid_market' | 'enterprise' | ''

        // Section 2: Current State
        sales_journey: string
        revenue_range: string
        customer_count: string

        // Section 3: Founder Profile
        founder_description: string
        barriers: string[]

        // Section 4: DISC Assessment
        disc_answers: Record<string, string>

        // Section 5: Learning Priorities
        urgency: string
        channels: string[]

        // Section 6: Engagement Capacity
        time_commitment: string
        learning_style: 'aggressive' | 'assistive' | 'adaptive' | ''

        // Section 7: Goals & Success
        success_90_days: string
        has_icp_docs: string

        // Section 8: Creator Economy (conditional, shown only for creator-coach)
        creator_offer_type: 'courses' | 'coaching-1on1' | 'coaching-group' | 'membership' | 'community' | 'hybrid' | ''
        creator_price_point: 'low-ticket' | 'mid-ticket' | 'high-ticket' | 'premium' | ''
        creator_acquisition: string[]
        creator_platforms: string[]
        creator_email_list_size: 'under-500' | '500-2000' | '2000-10000' | '10000-plus' | ''
        creator_sales_call_status: 'self-close' | 'team' | 'automated' | 'want-to-start' | ''
        creator_has_value_ladder: 'yes' | 'no' | 'unsure' | ''
        creator_launch_model: 'live' | 'evergreen' | 'hybrid' | 'not-yet' | ''
    }

    // AI Analysis State
    analysisComplete: boolean
    analysisStatus: 'idle' | 'analyzing' | 'indexing' | 'crawling' | 'completed' | 'failed'

    // Assessment Results
    assessment: any
    assessmentScore: number
    insights: string[]
}


const defaultOnboardingData: OnboardingData = {
    userName: '',
    companyName: '',
    businessModel: '',
    website: '',
    pitch: '',
    targetAudience: '',
    revenueGoal: '',
    timeline: '',
    stage: '',
    uploadedDocuments: [],
    linkedinUrl: '',
    linkedinAbout: '',
    linkedinPermission: false,
    questionnaire: {
        target_roles: [],
        industry: '',
        deal_size: '',
        sales_journey: '',
        revenue_range: '',
        customer_count: '',
        founder_description: '',
        barriers: [],
        disc_answers: {},
        urgency: '',
        channels: [],
        time_commitment: '',
        learning_style: '',
        success_90_days: '',
        has_icp_docs: '',
        // Creator economy defaults
        creator_offer_type: '',
        creator_price_point: '',
        creator_acquisition: [],
        creator_platforms: [],
        creator_email_list_size: '',
        creator_sales_call_status: '',
        creator_has_value_ladder: '',
        creator_launch_model: ''
    },
    analysisComplete: false,
    analysisStatus: 'idle',
    assessment: null,
    assessmentScore: 0,
    insights: []
}


interface OnboardingContextType {
    data: OnboardingData
    updateData: (updates: Partial<OnboardingData>) => void
    resetData: () => void
    currentStep: number
    setCurrentStep: (step: number) => void
    isHydrated: boolean
}

/** Deduplicate documents by name, keeping the latest (last) entry for each name */
function deduplicateDocs<T extends { name: string }>(docs: T[]): T[] {
    const seen = new Map<string, T>();
    for (const doc of docs) {
        seen.set(doc.name, doc);
    }
    return Array.from(seen.values());
}

const OnboardingContext = createContext<OnboardingContextType | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<OnboardingData>(defaultOnboardingData)
    const [currentStep, setCurrentStep] = useState(1)
    const [isHydrated, setIsHydrated] = useState(false)

    // Load from LocalStorage first, then hydrate from server
    useEffect(() => {
        const hydrate = async () => {
            // Helper: use server value when present (even empty string), else fall back to prev
            const pick = <T,>(serverVal: T | null | undefined, prevVal: T): T =>
                serverVal !== null && serverVal !== undefined ? serverVal : prevVal;

            try {
                // 1. Try LocalStorage first (immediate — gives instant UX while server loads)
                const saved = localStorage.getItem('onboarding_draft');
                if (saved) {
                    try {
                        const parsed = JSON.parse(saved);
                        setData(prev => ({ ...prev, ...parsed }));
                    } catch (e) {
                        console.warn('Failed to parse local storage draft', e);
                    }
                }

                // 2. Fetch from Server (authoritative — overwrites localStorage values)
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const { data: responseData } = await res.json();
                    const profileData = responseData?.profile || responseData;
                    if (profileData) {
                        setData(prev => ({
                            ...prev,
                            userName: pick(profileData.name, prev.userName),
                            companyName: pick(profileData.businessName, prev.companyName),
                            website: pick(profileData.websiteUrl, prev.website),
                            pitch: pick(profileData.elevatorPitch, prev.pitch),
                            targetAudience: pick(profileData.targetAudience, prev.targetAudience),
                            stage: pick(profileData.stage, prev.stage),
                            businessModel: pick(profileData.businessModel, prev.businessModel),
                            linkedinUrl: pick(profileData.linkedinUrl, prev.linkedinUrl),
                            linkedinAbout: pick(profileData.linkedinAbout, prev.linkedinAbout),
                            linkedinPermission: profileData.linkedinPermission ?? prev.linkedinPermission,
                            uploadedDocuments: profileData.documents?.length
                                ? deduplicateDocs(profileData.documents.map((d: any) => ({
                                    id: d.id,
                                    name: d.fileName || d.name,
                                    content: d.content,
                                    status: 'ready' as const,
                                })))
                                : prev.uploadedDocuments,
                            questionnaire: profileData.questionnaire
                                ? { ...prev.questionnaire, ...profileData.questionnaire }
                                : prev.questionnaire,
                            assessment: profileData.assessment ?? prev.assessment,
                            assessmentScore: profileData.assessment?.overallReadiness ?? prev.assessmentScore,
                            analysisComplete: !!profileData.assessment
                        }));
                    }
                }
            } catch (err) {
                console.warn('Failed to hydrate onboarding context:', err);
            } finally {
                setIsHydrated(true);
            }
        };
        hydrate();
    }, []);

    // Persist to LocalStorage on change
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('onboarding_draft', JSON.stringify(data));
        }
    }, [data, isHydrated]);

    const updateData = useCallback((updates: Partial<OnboardingData>) => {
        setData(prev => ({ ...prev, ...updates }))
    }, [])

    const resetData = useCallback(() => {
        setData(defaultOnboardingData)
        setCurrentStep(1)
        localStorage.removeItem('onboarding_draft')
    }, [])

    return (
        <OnboardingContext.Provider value={{
            data,
            updateData,
            resetData,
            currentStep,
            setCurrentStep,
            isHydrated
        }}>
            {children}
        </OnboardingContext.Provider>
    )
}

export function useOnboarding() {
    const context = useContext(OnboardingContext)
    if (!context) {
        throw new Error('useOnboarding must be used within OnboardingProvider')
    }
    return context
}
