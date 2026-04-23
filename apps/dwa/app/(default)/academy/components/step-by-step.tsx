import { ReactNode } from 'react';

interface StepProps {
    title: string;
    children: ReactNode;
}

interface StepData {
    title: string;
    content: string;
}

interface StepByStepProps {
    children?: ReactNode;
    title?: string;
    /** Alternative to <Step> children — accepts an array of {title, content} objects */
    steps?: StepData[];
}

export function Step({ title, children }: StepProps) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0 step-number" />
                <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-700 mt-2 last-step-line" />
            </div>
            <div className="pb-8 last:pb-0 min-w-0 flex-1">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1">
                    {title}
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed [&_p]:mb-1 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-gray-800 dark:[&_strong]:text-gray-200">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function StepByStep({ children, title, steps }: StepByStepProps) {
    return (
        <div className="not-prose my-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 p-4 sm:p-6 step-by-step-container">
            {title && (
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base mb-5">
                    {title}
                </h3>
            )}
            <div className="[&>.flex:last-child_.last-step-line]:hidden">
                {/* Render from steps prop if provided, otherwise use children */}
                {steps && steps.length > 0
                    ? steps.map((step, i) => (
                        <Step key={i} title={step.title}>{step.content}</Step>
                    ))
                    : children
                }
            </div>
            <style>{`
                .step-by-step-container { counter-reset: step-counter; }
                .step-number { counter-increment: step-counter; }
                .step-number::after { content: counter(step-counter); }
            `}</style>
        </div>
    );
}
