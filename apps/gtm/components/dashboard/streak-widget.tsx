'use client';

import { useLocale } from 'next-intl';

interface StreakWidgetProps {
    currentStreak: number;
    longestStreak: number;
}

export default function StreakWidget({ currentStreak, longestStreak }: StreakWidgetProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60 h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">{isEs ? "Racha de aprendizaje" : "Learning Streak"}</h3>
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🔥</span>
                </div>
            </div>

            <div className="text-center mb-4">
                <div className={`text-5xl font-black mb-1 ${currentStreak > 0 ? 'text-orange-500' : 'text-gray-300 dark:text-gray-600'}`}>
                    {currentStreak}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                    {isEs
                      ? (currentStreak === 1 ? 'Día seguido' : 'Días seguidos')
                      : (currentStreak === 1 ? 'Day' : 'Days') + ' in a row'}
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/60">
                <span className="text-xs text-gray-400 font-semibold">{isEs ? "Mejor racha" : "Best Streak"}</span>
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{longestStreak} {isEs ? "días" : "days"}</span>
            </div>

            {currentStreak === 0 && (
                <p className="text-xs text-gray-400 mt-3 text-center">
                    {isEs ? "¡Completa una lección hoy para comenzar tu racha!" : "Complete a lesson today to start your streak!"}
                </p>
            )}
        </div>
    );
}
