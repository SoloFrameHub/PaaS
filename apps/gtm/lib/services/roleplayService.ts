// Roleplay Service (Client-Side) - 3D Matrix Integration
// Part 4.2 of 3d-matrix-integration.md (Client Bridge)

import type { FounderCategory, Industry, ClientRole, DiscPattern } from '@/types/roleplay';
import { logger } from '@/lib/logger';

/**
 * Gets available roles filtered by industry.
 * Calls the unified roles API for Dimension 11 parity.
 */
export async function getRolesForIndustry(industryId: string): Promise<ClientRole[]> {
    try {
        const res = await fetch(`/api/roleplay/roles?industryId=${industryId}`);
        if (!res.ok) throw new Error('Unable to load roleplay options. Please refresh.');
        return await res.json();
    } catch (err) {
        logger.error('Error in getRolesForIndustry', { industryId, err });
        return [];
    }
}

// Re-export types for convenience
export * from '@/types/roleplay';
