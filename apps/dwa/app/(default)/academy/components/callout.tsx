import { ReactNode } from 'react';

interface CalloutProps {
    type?: 'info' | 'warning' | 'tip' | 'example' | 'reflection';
    title?: string;
    children: ReactNode;
}

const config = {
    info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-800',
        accent: 'bg-blue-500',
        iconColor: 'text-blue-600 dark:text-blue-400',
        titleColor: 'text-blue-900 dark:text-blue-100',
        textColor: '[&_p]:text-blue-800 dark:[&_p]:text-blue-200 [&_li]:text-blue-800 dark:[&_li]:text-blue-200',
        defaultTitle: 'Good to Know',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
    },
    warning: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800',
        accent: 'bg-amber-500',
        iconColor: 'text-amber-600 dark:text-amber-400',
        titleColor: 'text-amber-900 dark:text-amber-100',
        textColor: '[&_p]:text-amber-800 dark:[&_p]:text-amber-200 [&_li]:text-amber-800 dark:[&_li]:text-amber-200',
        defaultTitle: 'Important',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        ),
    },
    tip: {
        bg: 'bg-teal-50 dark:bg-teal-900/20',
        border: 'border-teal-200 dark:border-teal-800',
        accent: 'bg-teal-500',
        iconColor: 'text-teal-600 dark:text-teal-400',
        titleColor: 'text-teal-900 dark:text-teal-100',
        textColor: '[&_p]:text-teal-800 dark:[&_p]:text-teal-200 [&_li]:text-teal-800 dark:[&_li]:text-teal-200',
        defaultTitle: 'Helpful Tip',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        ),
    },
    example: {
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        border: 'border-indigo-200 dark:border-indigo-800',
        accent: 'bg-indigo-500',
        iconColor: 'text-indigo-600 dark:text-indigo-400',
        titleColor: 'text-indigo-900 dark:text-indigo-100',
        textColor: '[&_p]:text-indigo-800 dark:[&_p]:text-indigo-200 [&_li]:text-indigo-800 dark:[&_li]:text-indigo-200',
        defaultTitle: 'Example',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        ),
    },
    reflection: {
        bg: 'bg-rose-50 dark:bg-rose-900/20',
        border: 'border-rose-200 dark:border-rose-800',
        accent: 'bg-rose-500',
        iconColor: 'text-rose-600 dark:text-rose-400',
        titleColor: 'text-rose-900 dark:text-rose-100',
        textColor: '[&_p]:text-rose-800 dark:[&_p]:text-rose-200 [&_li]:text-rose-800 dark:[&_li]:text-rose-200',
        defaultTitle: 'Reflect',
        icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        ),
    },
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
    const c = config[type];

    return (
        <div className={`not-prose my-8 rounded-xl border ${c.bg} ${c.border} overflow-hidden`}>
            <div className="flex gap-4 p-5">
                <div className={`flex-shrink-0 mt-0.5`}>
                    <svg className={`w-5 h-5 ${c.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {c.icon}
                    </svg>
                </div>
                <div className="min-w-0 flex-1">
                    <p className={`font-semibold text-sm ${c.titleColor} mb-1`}>
                        {title || c.defaultTitle}
                    </p>
                    <div className={`text-sm leading-relaxed ${c.textColor} [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:mt-1 [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:mt-1 [&_li]:mb-1`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
