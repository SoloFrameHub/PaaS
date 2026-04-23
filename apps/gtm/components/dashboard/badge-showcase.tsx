'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { BadgeEarned } from '@/types/profile';
import { BADGE_DEFINITIONS, getBadgeDefinition, TIER_ORDER } from '@/lib/data/badges';

interface BadgeShowcaseProps {
    earnedBadges: BadgeEarned[];
}

const TIER_COLORS = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-gray-300 to-gray-500',
    gold: 'from-yellow-400 to-amber-500',
    platinum: 'from-indigo-400 to-purple-500',
} as const;

const TIER_BORDER = {
    bronze: 'border-amber-300 dark:border-amber-600/40',
    silver: 'border-gray-300 dark:border-gray-500/40',
    gold: 'border-yellow-300 dark:border-yellow-500/40',
    platinum: 'border-indigo-300 dark:border-purple-500/40',
} as const;

export default function BadgeShowcase({ earnedBadges }: BadgeShowcaseProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    const earnedIds = new Set(earnedBadges.map(b => b.id));

    // Sort: earned first (by tier desc), then unearned (by tier desc)
    const sortedBadges = [...BADGE_DEFINITIONS].sort((a, b) => {
        const aEarned = earnedIds.has(a.id);
        const bEarned = earnedIds.has(b.id);
        if (aEarned !== bEarned) return aEarned ? -1 : 1;
        return TIER_ORDER[b.tier] - TIER_ORDER[a.tier];
    });

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
                    {isEs ? "Insignias" : "Badges"}
                </h3>
                <span className="text-xs font-bold text-primary-500 bg-primary-50 dark:bg-primary-500/10 px-2.5 py-1 rounded-full">
                    {earnedBadges.length} / {BADGE_DEFINITIONS.length}
                </span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {sortedBadges.slice(0, 12).map((badge) => {
                    const isEarned = earnedIds.has(badge.id);
                    return (
                        <div
                            key={badge.id}
                            className={`shrink-0 w-16 flex flex-col items-center gap-1.5 group ${!isEarned ? 'opacity-30' : ''}`}
                            title={`${badge.name}: ${badge.description}`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${
                                isEarned ? TIER_BORDER[badge.tier] : 'border-gray-200 dark:border-gray-700'
                            } ${isEarned ? 'bg-gradient-to-br ' + TIER_COLORS[badge.tier] : 'bg-gray-100 dark:bg-gray-700'}`}>
                                <span className={`text-xl ${isEarned ? '' : 'grayscale'}`}>{badge.icon}</span>
                            </div>
                            <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 text-center leading-tight line-clamp-2">
                                {badge.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {BADGE_DEFINITIONS.length > 12 && (
                <div className="mt-3 text-center">
                    <Link href="/dashboard/badges" className="text-xs font-bold text-primary-500 hover:text-primary-600">
                        {isEs ? "Ver todas las insignias →" : "View All Badges →"}
                    </Link>
                </div>
            )}
        </div>
    );
}
