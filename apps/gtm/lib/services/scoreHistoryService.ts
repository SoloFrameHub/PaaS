import { hasDatabase, getDb, schema } from '@/lib/db';
import { eq, desc } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import type { AssessmentScores } from '@/types/profile';

export interface ScoreSnapshot {
    overallReadiness: number;
    scores: AssessmentScores;
    createdAt: string;
}

/**
 * Fetch the previous assessment scores for a user (the second-most-recent snapshot).
 * Returns null if no previous snapshot exists or if DB is unavailable.
 */
export async function getPreviousScores(userId: string): Promise<AssessmentScores | null> {
    if (!hasDatabase()) return null;

    try {
        const db = getDb();
        if (!db) return null;

        // Get the two most recent snapshots: current + previous
        const rows = await db
            .select({
                icpClarity: schema.assessmentSnapshot.icpClarity,
                positioningStrength: schema.assessmentSnapshot.positioningStrength,
                messagingConsistency: schema.assessmentSnapshot.messagingConsistency,
                channelReadiness: schema.assessmentSnapshot.channelReadiness,
                salesProcessMaturity: schema.assessmentSnapshot.salesProcessMaturity,
            })
            .from(schema.assessmentSnapshot)
            .where(eq(schema.assessmentSnapshot.userId, userId))
            .orderBy(desc(schema.assessmentSnapshot.createdAt))
            .limit(2);

        // We need at least 2 snapshots to show a delta
        if (rows.length < 2) return null;

        // The second row is the previous assessment
        const prev = rows[1];
        return {
            icpClarity: Number(prev.icpClarity),
            positioningStrength: Number(prev.positioningStrength),
            messagingConsistency: Number(prev.messagingConsistency),
            channelReadiness: Number(prev.channelReadiness),
            salesProcessMaturity: Number(prev.salesProcessMaturity),
        };
    } catch (err) {
        logger.error('Failed to fetch previous scores', { err, userId });
        return null;
    }
}

/**
 * Get full score history for a user (for future charts/trends).
 */
export async function getScoreHistory(userId: string, limit = 10): Promise<ScoreSnapshot[]> {
    if (!hasDatabase()) return [];

    try {
        const db = getDb();
        if (!db) return [];

        const rows = await db
            .select({
                overallReadiness: schema.assessmentSnapshot.overallReadiness,
                icpClarity: schema.assessmentSnapshot.icpClarity,
                positioningStrength: schema.assessmentSnapshot.positioningStrength,
                messagingConsistency: schema.assessmentSnapshot.messagingConsistency,
                channelReadiness: schema.assessmentSnapshot.channelReadiness,
                salesProcessMaturity: schema.assessmentSnapshot.salesProcessMaturity,
                createdAt: schema.assessmentSnapshot.createdAt,
            })
            .from(schema.assessmentSnapshot)
            .where(eq(schema.assessmentSnapshot.userId, userId))
            .orderBy(desc(schema.assessmentSnapshot.createdAt))
            .limit(limit);

        return rows.map(row => ({
            overallReadiness: Number(row.overallReadiness),
            scores: {
                icpClarity: Number(row.icpClarity),
                positioningStrength: Number(row.positioningStrength),
                messagingConsistency: Number(row.messagingConsistency),
                channelReadiness: Number(row.channelReadiness),
                salesProcessMaturity: Number(row.salesProcessMaturity),
            },
            createdAt: row.createdAt.toISOString(),
        }));
    } catch (err) {
        logger.error('Failed to fetch score history', { err, userId });
        return [];
    }
}
