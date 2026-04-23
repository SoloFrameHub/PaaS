'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

interface StreakToastProps {
    streak: number | null;
    onDone: () => void;
}

export default function StreakToast({ streak, onDone }: StreakToastProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (streak) {
            const show = setTimeout(() => setVisible(true), 100);
            const hide = setTimeout(() => {
                setVisible(false);
                setTimeout(onDone, 300);
            }, 3000);
            return () => { clearTimeout(show); clearTimeout(hide); };
        }
    }, [streak, onDone]);

    if (!streak) return null;

    return (
        <div className={`fixed top-6 right-6 z-[90] transition-all duration-300 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-orange-200 dark:border-orange-500/30 p-4 flex items-center gap-3 min-w-[240px]">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center shrink-0">
                    <span className="text-xl">🔥</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                        {isEs ? `¡Racha de ${streak} días!` : `${streak}-Day Streak!`}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isEs ? "¡Sigue el ritmo!" : "Keep the momentum going"}
                    </p>
                </div>
            </div>
        </div>
    );
}
