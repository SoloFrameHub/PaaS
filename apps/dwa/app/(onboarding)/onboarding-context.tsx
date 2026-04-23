'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type {
    SymptomCategory,
    Severity,
    WellnessGoal,
    CrisisRiskLevel,
    AgeRange,
    LifeStage,
    LivingSituation,
    SupportNetworkStrength,
    GroupPreference,
    TherapyHistory,
    TimeOfDay
} from '@/types/wellness-profile'

export interface SymptomSelection {
    category: SymptomCategory
    severity: Severity
    isPrimary: boolean
}

export interface CrisisScreeningData {
    hasCurrentSuicidalThoughts: boolean
    hasSelfHarmThoughts: boolean
    hasImmediateDangerConcern: boolean
    hasPlanOrMeans: boolean
    riskLevel: CrisisRiskLevel
    acknowledged988Resources: boolean
    screenedAt?: string
}

export interface OnboardingData {
    // Step 1: Welcome
    userName: string
    displayName: string

    // Step 2: Symptom Selection
    primarySymptoms: SymptomSelection[]
    otherSymptomDescription: string

    // Step 3: Crisis Screening
    crisisScreening: CrisisScreeningData | null
    crisisScreeningCompleted: boolean

    // Step 4: Wellness Goals & Preferences
    wellnessGoals: WellnessGoal[]
    personalGoalDescription: string
    learningStyle: 'self-paced' | 'guided' | 'interactive' | ''
    timeCommitment: '5-10min' | '15-20min' | '30min+' | ''

    // Step 5: About You — Life situation & social support
    ageRange: AgeRange | ''
    lifeStage: LifeStage | ''
    livingSituation: LivingSituation | ''
    supportNetworkStrength: SupportNetworkStrength | ''
    hasTrustedPerson: boolean | null
    comfortWithGroupActivities: GroupPreference | ''

    // Step 6: Your Experience — Coping history & triggers
    currentCopingStrategies: string[]
    unhealthyCopingToChange: string[]
    therapyHistory: TherapyHistory | ''
    previousSelfHelpExperience: boolean | null
    knownTriggers: string[]
    worstTimeOfDay: TimeOfDay | ''
    seasonalPatterns: boolean | null

    // Step 7: In Your Own Words — Free-text reflections
    goodDayDescription: string
    biggestChallenge: string
    hopedSupportDescription: string
    personalPatterns: string
    anythingElse: string

    // Assessment & Recommendations
    assessmentCompleted: boolean
    recommendedCourses: string[]
    priorityFocus: SymptomCategory[]

    // Status tracking
    currentStep: number
    onboardingStartedAt: string | null
}

const defaultCrisisScreening: CrisisScreeningData = {
    hasCurrentSuicidalThoughts: false,
    hasSelfHarmThoughts: false,
    hasImmediateDangerConcern: false,
    hasPlanOrMeans: false,
    riskLevel: 'none',
    acknowledged988Resources: false,
}

const defaultOnboardingData: OnboardingData = {
    userName: '',
    displayName: '',

    primarySymptoms: [],
    otherSymptomDescription: '',

    crisisScreening: null,
    crisisScreeningCompleted: false,

    wellnessGoals: [],
    personalGoalDescription: '',
    learningStyle: '',
    timeCommitment: '',

    ageRange: '',
    lifeStage: '',
    livingSituation: '',
    supportNetworkStrength: '',
    hasTrustedPerson: null,
    comfortWithGroupActivities: '',

    currentCopingStrategies: [],
    unhealthyCopingToChange: [],
    therapyHistory: '',
    previousSelfHelpExperience: null,
    knownTriggers: [],
    worstTimeOfDay: '',
    seasonalPatterns: null,

    goodDayDescription: '',
    biggestChallenge: '',
    hopedSupportDescription: '',
    personalPatterns: '',
    anythingElse: '',

    assessmentCompleted: false,
    recommendedCourses: [],
    priorityFocus: [],

    currentStep: 1,
    onboardingStartedAt: null,
}

interface OnboardingContextType {
    data: OnboardingData
    updateData: (updates: Partial<OnboardingData>) => void
    resetData: () => void
    currentStep: number
    setCurrentStep: (step: number) => void
    isHydrated: boolean

    // Helper functions for symptom selection
    addSymptom: (symptom: SymptomSelection) => void
    removeSymptom: (category: SymptomCategory) => void
    updateSymptomSeverity: (category: SymptomCategory, severity: Severity) => void
    setPrimarySymptom: (category: SymptomCategory) => void

    // Crisis screening helpers
    updateCrisisScreening: (updates: Partial<CrisisScreeningData>) => void
    calculateCrisisRisk: () => CrisisRiskLevel
}

const OnboardingContext = createContext<OnboardingContextType | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<OnboardingData>(defaultOnboardingData)
    const [currentStep, setCurrentStep] = useState(1)
    const [isHydrated, setIsHydrated] = useState(false)

    // Load from LocalStorage first, then hydrate from server
    useEffect(() => {
        const hydrate = async () => {
            try {
                // 1. Try LocalStorage first (immediate)
                const saved = localStorage.getItem('wellness_onboarding_draft')
                if (saved) {
                    try {
                        const parsed = JSON.parse(saved)
                        setData(prev => ({ ...prev, ...parsed }))
                        if (parsed.currentStep) {
                            setCurrentStep(parsed.currentStep)
                        }
                    } catch (e) {
                        console.warn('Failed to parse local storage draft', e)
                    }
                }

                // 2. Fetch from Server (authoritative) if user is logged in
                const res = await fetch('/api/profile')
                if (res.ok) {
                    const { data: responseData } = await res.json()
                    const profileData = responseData?.profile || responseData
                    if (profileData) {
                        const q = profileData.questionnaire
                        setData(prev => ({
                            ...prev,
                            userName: profileData.name || prev.userName,
                            displayName: profileData.displayName || prev.displayName,
                            primarySymptoms: q?.primarySymptoms || prev.primarySymptoms,
                            otherSymptomDescription: q?.otherSymptomDescription || prev.otherSymptomDescription,
                            wellnessGoals: q?.wellnessGoals || prev.wellnessGoals,
                            learningStyle: q?.learningStyle || prev.learningStyle,
                            timeCommitment: q?.timeCommitment || prev.timeCommitment,
                            // About You (step 5)
                            ageRange: q?.ageRange || prev.ageRange,
                            lifeStage: q?.lifeStage || prev.lifeStage,
                            livingSituation: q?.livingSituation || prev.livingSituation,
                            supportNetworkStrength: q?.supportNetworkStrength || prev.supportNetworkStrength,
                            hasTrustedPerson: q?.hasTrustedPerson ?? prev.hasTrustedPerson,
                            comfortWithGroupActivities: q?.comfortWithGroupActivities || prev.comfortWithGroupActivities,
                            // Your Experience (step 6)
                            currentCopingStrategies: q?.currentCopingStrategies || prev.currentCopingStrategies,
                            unhealthyCopingToChange: q?.unhealthyCopingToChange || prev.unhealthyCopingToChange,
                            therapyHistory: q?.therapyHistory || prev.therapyHistory,
                            previousSelfHelpExperience: q?.previousSelfHelpExperience ?? prev.previousSelfHelpExperience,
                            knownTriggers: q?.knownTriggers || prev.knownTriggers,
                            worstTimeOfDay: q?.worstTimeOfDay || prev.worstTimeOfDay,
                            seasonalPatterns: q?.seasonalPatterns ?? prev.seasonalPatterns,
                            // In Your Own Words (step 7)
                            goodDayDescription: q?.goodDayDescription || prev.goodDayDescription,
                            biggestChallenge: q?.biggestChallenge || prev.biggestChallenge,
                            hopedSupportDescription: q?.hopedSupportDescription || prev.hopedSupportDescription,
                            personalPatterns: q?.personalPatterns || prev.personalPatterns,
                            anythingElse: q?.anythingElse || prev.anythingElse,
                            // Screening & assessment
                            crisisScreeningCompleted: q?.crisisScreeningCompleted || false,
                            assessmentCompleted: !!profileData.assessment,
                            recommendedCourses: profileData.assessment?.recommendedCourses || [],
                            priorityFocus: profileData.assessment?.priorityFocus || [],
                        }))
                    }
                }
            } catch (err) {
                console.warn('Failed to hydrate onboarding context:', err)
            } finally {
                setIsHydrated(true)
            }
        }
        hydrate()
    }, [])

    // Persist to LocalStorage on change
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('wellness_onboarding_draft', JSON.stringify({ ...data, currentStep }))
        }
    }, [data, currentStep, isHydrated])

    const updateData = (updates: Partial<OnboardingData>) => {
        setData(prev => ({ ...prev, ...updates }))
    }

    const resetData = () => {
        setData(defaultOnboardingData)
        setCurrentStep(1)
        localStorage.removeItem('wellness_onboarding_draft')
    }

    // Symptom selection helpers
    const addSymptom = (symptom: SymptomSelection) => {
        setData(prev => {
            const existing = prev.primarySymptoms.find(s => s.category === symptom.category)
            if (existing) return prev

            // If this is the first symptom, make it primary
            const isPrimary = prev.primarySymptoms.length === 0 || symptom.isPrimary
            return {
                ...prev,
                primarySymptoms: [...prev.primarySymptoms, { ...symptom, isPrimary }]
            }
        })
    }

    const removeSymptom = (category: SymptomCategory) => {
        setData(prev => ({
            ...prev,
            primarySymptoms: prev.primarySymptoms.filter(s => s.category !== category)
        }))
    }

    const updateSymptomSeverity = (category: SymptomCategory, severity: Severity) => {
        setData(prev => ({
            ...prev,
            primarySymptoms: prev.primarySymptoms.map(s =>
                s.category === category ? { ...s, severity } : s
            )
        }))
    }

    const setPrimarySymptom = (category: SymptomCategory) => {
        setData(prev => ({
            ...prev,
            primarySymptoms: prev.primarySymptoms.map(s => ({
                ...s,
                isPrimary: s.category === category
            }))
        }))
    }

    // Crisis screening helpers
    const updateCrisisScreening = (updates: Partial<CrisisScreeningData>) => {
        setData(prev => ({
            ...prev,
            crisisScreening: {
                ...(prev.crisisScreening || defaultCrisisScreening),
                ...updates
            }
        }))
    }

    const calculateCrisisRisk = (): CrisisRiskLevel => {
        const screening = data.crisisScreening
        if (!screening) return 'none'

        // Immediate crisis indicators
        if (screening.hasPlanOrMeans || screening.hasImmediateDangerConcern) {
            return 'immediate'
        }

        // High risk
        if (screening.hasCurrentSuicidalThoughts && screening.hasSelfHarmThoughts) {
            return 'high'
        }

        // Moderate risk
        if (screening.hasCurrentSuicidalThoughts || screening.hasSelfHarmThoughts) {
            return 'moderate'
        }

        // Low risk
        if (screening.hasImmediateDangerConcern) {
            return 'low'
        }

        return 'none'
    }

    return (
        <OnboardingContext.Provider value={{
            data,
            updateData,
            resetData,
            currentStep,
            setCurrentStep,
            isHydrated,
            addSymptom,
            removeSymptom,
            updateSymptomSeverity,
            setPrimarySymptom,
            updateCrisisScreening,
            calculateCrisisRisk,
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
