'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

interface LevelUpOverlayProps {
    levelUp: { from: number; to: number; title: string } | null;
    onDone: () => void;
}

export default function LevelUpOverlay({ levelUp, onDone }: LevelUpOverlayProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    const [phase, setPhase] = useState<'hidden' | 'entering' | 'visible' | 'exiting'>('hidden');

    useEffect(() => {
        if (levelUp) {
            setPhase('entering');
            const show = setTimeout(() => setPhase('visible'), 50);
            const exit = setTimeout(() => setPhase('exiting'), 2500);
            const done = setTimeout(() => {
                setPhase('hidden');
                onDone();
            }, 3000);
            return () => { clearTimeout(show); clearTimeout(exit); clearTimeout(done); };
        }
    }, [levelUp, onDone]);

    if (!levelUp || phase === 'hidden') return null;

    return (
        <div className={`fixed inset-0 z-[110] flex items-center justify-center pointer-events-none transition-opacity duration-500 ${phase === 'entering' || phase === 'exiting' ? 'opacity-0' : 'opacity-100'}`}>
            {/* Radial gradient background */}
            <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 to-transparent" />

            <div className={`relative text-center transform transition-all duration-700 ${phase === 'visible' ? 'scale-100' : 'scale-50'}`}>
                <div className="text-6xl font-black text-primary-500 mb-2 animate-pulse">
                    {isEs ? `Nivel ${levelUp.to}` : `Level ${levelUp.to}`}
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                    {levelUp.title}
                </div>
                <div className="text-sm text-gray-500">
                    {isEs ? `Nivel ${levelUp.from} → Nivel ${levelUp.to}` : `Level ${levelUp.from} → Level ${levelUp.to}`}
                </div>
            </div>
        </div>
    );
}
