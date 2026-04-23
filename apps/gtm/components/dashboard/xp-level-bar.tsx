'use client';

import { useLocale } from 'next-intl';
import { getLevelProgress } from '@/lib/data/xp-levels';

interface XPLevelBarProps {
    xp: number;
}

export default function XPLevelBar({ xp }: XPLevelBarProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    const { current, next, progressPercent, xpToNext } = getLevelProgress(xp);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60 h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">{isEs ? "Nivel XP" : "XP Level"}</h3>
                <span className="text-xs font-bold text-gray-400">Lv. {current.level}</span>
            </div>

            <div className="text-center mb-4">
                <div className="text-lg font-black text-primary-500 mb-0.5">
                    {current.title}
                </div>
                <div className="text-3xl font-black text-gray-800 dark:text-gray-100">
                    {xp.toLocaleString()} <span className="text-sm font-bold text-gray-400">XP</span>
                </div>
            </div>

            {next ? (
                <div>
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400 font-semibold">Lv. {current.level}</span>
                        <span className="text-gray-400 font-semibold">Lv. {next.level}</span>
                    </div>
                    <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full transition-all duration-1000"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <div className="text-xs text-gray-400 mt-1.5 text-center font-semibold">
                        {isEs
                          ? `${xpToNext.toLocaleString()} XP para ${next.title}`
                          : `${xpToNext.toLocaleString()} XP to ${next.title}`}
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="h-2.5 w-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full" />
                    <div className="text-xs text-primary-500 mt-1.5 font-bold">{isEs ? "¡Nivel máximo alcanzado!" : "Max Level Reached!"}</div>
                </div>
            )}
        </div>
    );
}
