'use client';

import dynamic from 'next/dynamic';

const CopingStrategyRanker = dynamic(
    () => import('./coping-strategy-ranker'),
    {
        ssr: false,
        loading: () => (
            <figure className="my-10 not-prose">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/80 dark:border-emerald-800/60 p-6 shadow-sm">
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                    <div className="h-4 w-72 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-4" />
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-16 bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700 animate-pulse" />
                        ))}
                    </div>
                </div>
            </figure>
        ),
    }
);

export default CopingStrategyRanker;
