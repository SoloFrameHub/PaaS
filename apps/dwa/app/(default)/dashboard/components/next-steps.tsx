/**
 * NextSteps — Smart prioritized action cards for the dashboard.
 *
 * Shows up to 4 actions with source badges, warm descriptions,
 * and clear call-to-action links.
 */

import Link from 'next/link';
import type { PrioritizedWellnessAction, WellnessActionSource } from '@/types/wellness-scores';

interface NextStepsProps {
    actions: PrioritizedWellnessAction[];
}

const SOURCE_STYLES: Record<WellnessActionSource, { bg: string; text: string }> = {
    'quick-checkin': { bg: 'bg-teal-100 dark:bg-teal-500/20', text: 'text-teal-700 dark:text-teal-300' },
    'practice': { bg: 'bg-primary-100 dark:bg-primary-500/20', text: 'text-primary-700 dark:text-primary-300' },
    'deep-dive': { bg: 'bg-violet-100 dark:bg-violet-500/20', text: 'text-violet-700 dark:text-violet-300' },
    'talk-to-coach': { bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-300' },
};

function ActionCard({ action }: { action: PrioritizedWellnessAction }) {
    const style = SOURCE_STYLES[action.source];
    const isPrimary = action.urgency === 'primary';

    return (
        <Link
            href={action.href}
            className={`block p-4 rounded-xl border transition-all hover:shadow-md ${
                isPrimary
                    ? 'border-primary-200 dark:border-primary-500/30 bg-white dark:bg-gray-800'
                    : 'border-gray-100 dark:border-gray-700/60 bg-white dark:bg-gray-800'
            }`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                    {action.badgeLabel}
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                    {action.durationLabel}
                </span>
            </div>
            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-1">
                {action.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {action.description}
            </p>
        </Link>
    );
}

export default function NextSteps({ actions }: NextStepsProps) {
    if (actions.length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-4">
                Your Next Steps
            </h2>
            <div className="space-y-3">
                {actions.map(action => (
                    <ActionCard key={action.id} action={action} />
                ))}
            </div>
        </div>
    );
}
