/**
 * WellnessHealth — 5-dimension wellness display card.
 *
 * Shows each dimension as a progress bar with tier coloring and delta arrows,
 * or a gentle "Start here" prompt when no data exists.
 */

import Link from 'next/link';
import type { WellnessScores, WellnessDimension, WellnessTier } from '@/types/wellness-scores';
import { DIMENSION_KEYS } from '@/types/wellness-scores';
import { getDimensionColor, getTierLabel } from '@/lib/utils/wellness-scores';
import { DIMENSION_ASSESSMENT_MAP, DIMENSION_COURSE_MAP } from '@/lib/data/curriculum';

interface WellnessHealthProps {
    scores: WellnessScores;
}

function DeltaIndicator({ delta }: { delta: number | null }) {
    if (delta === null) return null;
    if (delta === 0) return <span className="text-xs text-gray-400">&mdash;</span>;

    const isPositive = delta > 0;
    return (
        <span className={`text-xs font-medium ${isPositive ? 'text-teal-600' : 'text-rose-500'}`}>
            {isPositive ? '\u2191' : '\u2193'}{Math.abs(delta)}
        </span>
    );
}

function DimensionRow({ dimension }: { dimension: WellnessDimension }) {
    const colors = getDimensionColor(dimension.tier);
    const tierLabel = getTierLabel(dimension.tier);

    // No data state — show a gentle "Start here" prompt
    if (dimension.score === null) {
        const assessments = DIMENSION_ASSESSMENT_MAP[dimension.key];
        const entryAssessment = assessments?.[0];
        const entryCourse = entryAssessment?.courseId ?? DIMENSION_COURSE_MAP[dimension.key]?.[0];
        const href = entryCourse ? `/academy/${entryCourse}` : '/academy';

        return (
            <div className="py-3">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {dimension.label}
                    </span>
                    <Link
                        href={href}
                        className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
                    >
                        Start here &rarr;
                    </Link>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-200 dark:bg-gray-600 rounded-full w-0" />
                </div>
            </div>
        );
    }

    return (
        <div className="py-3">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {dimension.label}
                </span>
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${colors.text}`}>
                        {tierLabel}
                    </span>
                    <DeltaIndicator delta={dimension.delta} />
                </div>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colors.bar} rounded-full transition-all duration-1000`}
                    style={{ width: `${dimension.score}%` }}
                />
            </div>
        </div>
    );
}

export default function WellnessHealth({ scores }: WellnessHealthProps) {
    const scoredCount = DIMENSION_KEYS.filter(k => scores.dimensions[k]?.score !== null).length;
    const overallTier: WellnessTier | null = scores.overallScore !== null
        ? (scores.overallScore >= 70 ? 'thriving' : scores.overallScore >= 40 ? 'growing' : 'needs-attention')
        : null;
    const overallColors = getDimensionColor(overallTier);
    const overallLabel = getTierLabel(overallTier);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">
                Your Wellness
            </h2>

            <div className="divide-y divide-gray-100 dark:divide-gray-700/40">
                {DIMENSION_KEYS.map(key => {
                    const dim = scores.dimensions[key];
                    if (!dim) return null;
                    return <DimensionRow key={key} dimension={dim} />;
                })}
            </div>

            {/* Overall summary */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/40">
                {scores.overallScore !== null ? (
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Overall wellness
                        </span>
                        <span className={`text-sm font-semibold ${overallColors.text}`}>
                            {overallLabel}
                        </span>
                    </div>
                ) : scoredCount === 0 ? (
                    <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
                        Complete your first check-in to see your wellness picture
                    </p>
                ) : (
                    <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
                        {5 - scoredCount} more area{5 - scoredCount === 1 ? '' : 's'} to explore
                    </p>
                )}
            </div>
        </div>
    );
}
