import { ReactNode } from 'react';

interface ScenarioCardProps {
    title?: string;
    children: ReactNode;
}

export default function ScenarioCard({ title, children }: ScenarioCardProps) {
    return (
        <div className="not-prose my-8 rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 overflow-hidden">
            <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5" role="img" aria-hidden="true">
                        💡
                    </span>
                    <div className="min-w-0 flex-1">
                        {title && (
                            <p className="font-bold text-amber-900 dark:text-amber-100 text-sm mb-2">
                                {title}
                            </p>
                        )}
                        <div className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:mt-1 [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:mt-1 [&_li]:mb-1">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
