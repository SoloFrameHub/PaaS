'use client';

import { useLocale } from 'next-intl';

interface PlaybookProgressProps {
    completed: number;
    total: number;
}

export default function PlaybookProgress({ completed, total }: PlaybookProgressProps) {
    const locale = useLocale();
    const isEs = locale === 'es';

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="bg-gradient-to-r from-primary-500 to-indigo-600 rounded-2xl p-6 text-white mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                    <div className="text-sm font-medium opacity-90 mb-1">{isEs ? "Tu Sales Playbook" : "Your Sales Playbook"}</div>
                    <div className="text-3xl font-bold">{completed} / {total} {isEs ? "Artefactos" : "Artifacts"}</div>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-black">{percent}%</div>
                    <div className="text-sm opacity-90">{isEs ? "Completo" : "Complete"}</div>
                </div>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white rounded-full transition-all duration-1000"
                    style={{ width: `${percent}%` }}
                />
            </div>
            {completed === total && total > 0 && (
                <p className="text-sm mt-3 font-semibold opacity-90">
                    {isEs ? "¡Tu playbook está completo! Siempre puedes refinar artefactos revisitando los cursos." : "Your playbook is complete! You can always refine artifacts by revisiting courses."}
                </p>
            )}
        </div>
    );
}
