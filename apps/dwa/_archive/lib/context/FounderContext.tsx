'use client'

// Founder Context Provider for 3D Roleplay Matrix
// Part 4.4 of 3d-matrix-integration.md

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { FounderCategory, Industry, ClientRole } from '@/types/roleplay'
import { logger } from '@/lib/logger'

interface FounderContextData {
    isLoading: boolean
    founderCategory: FounderCategory | null
    industry: Industry | null
    targetRoles: ClientRole[]

    // Helper for lesson personalization
    getPersonalizedExample: (genericExample: string) => string
}

const FounderContext = createContext<FounderContextData | null>(null)

interface FounderProviderProps {
    children: ReactNode
    userId?: string | null
}

export function FounderProvider({ children, userId }: FounderProviderProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [founderCategory, setFounderCategory] = useState<FounderCategory | null>(null)
    const [industry, setIndustry] = useState<Industry | null>(null)
    const [targetRoles, setTargetRoles] = useState<ClientRole[]>([])

    useEffect(() => {
        if (!userId) {
            setIsLoading(false)
            return
        }

        const loadFounderContext = async () => {
            setIsLoading(true)

            try {
                const response = await fetch('/api/profile');
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error?.message || `Failed to fetch profile: ${response.status}`);
                }

                const { data } = await response.json();

                if (data && data.profile) {
                    setFounderCategory(data.founderCategory);
                    setIndustry(data.industry);
                    setTargetRoles(data.targetRoles);
                }
            } catch (error) {
                logger.error('Error loading founder context', {
                    message: error instanceof Error ? error.message : String(error),
                    error
                })
            }

            setIsLoading(false)
        }

        loadFounderContext()
    }, [userId])

    // Helper function for lesson personalization
    const getPersonalizedExample = (genericExample: string): string => {
        if (!industry || !targetRoles.length) return genericExample

        let personalized = genericExample

        // Replace generic terms with user's context
        personalized = personalized
            .replace(/\[industry\]/gi, industry.display_name)
            .replace(/\[buyer role\]/gi, targetRoles[0]?.display_name || 'your prospect')
            .replace(/\[pain point\]/gi, industry.pain_points?.[0]?.pain || 'their challenges')
            .replace(/\[terminology\]/gi, industry.terminology?.[0]?.term || 'industry terms')

        return personalized
    }

    return (
        <FounderContext.Provider value={{
            isLoading,
            founderCategory,
            industry,
            targetRoles,
            getPersonalizedExample
        }}>
            {children}
        </FounderContext.Provider>
    )
}

export function useFounderContext() {
    const context = useContext(FounderContext)
    if (!context) {
        throw new Error('useFounderContext must be used within FounderProvider')
    }
    return context
}

/**
 * Safe hook that doesn't throw if used outside provider
 * (useful for optional personalization)
 */
export function useFounderContextSafe(): FounderContextData | null {
    return useContext(FounderContext)
}
