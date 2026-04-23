// User type extension for 3D Roleplay Matrix
// Part 3 of 3d-matrix-integration.md

export interface UserFounderProfile {
    // Assigned during onboarding
    founder_category: string              // e.g., "technical_purist"
    category_confidence: number           // 0-100
    category_assessed_at: string          // ISO timestamp

    // Business context (onboarding step 2)
    business_context: {
        industry: string                    // e.g., "fintech"
        company_stage: 'idea' | 'pre_revenue' | 'early_revenue' | 'scaling'
        target_customer_type: 'b2b' | 'b2c' | 'hybrid'
        typical_deal_size: 'transactional' | 'smb' | 'mid_market' | 'enterprise'
        target_roles: string[]              // e.g., ["cto", "dir_engineering"]
    }

    // User's own DISC (onboarding step 3)
    disc_profile: {
        primary: 'D' | 'I' | 'S' | 'C'
        secondary: 'D' | 'I' | 'S' | 'C' | null
        assessed_at: string
    }

    // Performance tracking (populated over time)
    roleplay_stats: {
        total_sessions: number
        by_disc_type: Record<string, { sessions: number; avg_score: number }>
        by_industry?: Record<string, { sessions: number; avg_score: number }>
        by_role?: Record<string, { sessions: number; avg_score: number }>
        strongest_pairing: string | null    // e.g., "High-I + SaaS + VP Marketing"
        weakest_pairing: string | null
    }
}

// Extended User interface (extend existing User type with this)
export interface User {
    uid: string
    email: string
    displayName?: string
    photoURL?: string
    created_at?: string
    updated_at?: string

    // 3D Roleplay Matrix profile
    founder_profile?: UserFounderProfile
}
