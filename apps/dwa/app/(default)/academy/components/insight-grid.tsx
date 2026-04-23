import { ReactNode } from 'react';

interface InsightItemProps {
    icon?: string;
    title: string;
    children: ReactNode;
}

interface InsightGridProps {
    children: ReactNode;
}

export function InsightItem({ icon, title, children }: InsightItemProps) {
    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-4 sm:p-5 transition-all hover:shadow-md hover:-translate-y-0.5">
            {icon && (
                <span className="text-2xl mb-3 block" role="img" aria-hidden="true">
                    {icon}
                </span>
            )}
            <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-2">
                {title}
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed [&_p]:mb-1 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-gray-800 dark:[&_strong]:text-gray-200">
                {children}
            </div>
        </div>
    );
}

export function InsightGrid({ children }: InsightGridProps) {
    return (
        <div className="not-prose my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {children}
        </div>
    );
}
