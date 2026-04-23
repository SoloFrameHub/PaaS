'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { getBadgeDefinition, TIER_ORDER } from '@/lib/data/badges';
import type { BadgeEarned } from '@/types/profile';

const TIER_COLORS = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-gray-300 to-gray-500',
    gold: 'from-yellow-400 to-amber-500',
    platinum: 'from-purple-400 to-indigo-600',
} as const;

const TIER_BORDER = {
    bronze: 'border-amber-500/30',
    silver: 'border-gray-400/30',
    gold: 'border-yellow-400/30',
    platinum: 'border-purple-400/30',
} as const;

interface BadgeEarnedModalProps {
    badge: BadgeEarned | null;
    onClose: () => void;
}

export default function BadgeEarnedModal({ badge, onClose }: BadgeEarnedModalProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (badge) {
            // Small delay for entrance animation
            const timer = setTimeout(() => setVisible(true), 50);
            // Auto-close after 4 seconds
            const autoClose = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300);
            }, 4000);
            return () => { clearTimeout(timer); clearTimeout(autoClose); };
        } else {
            setVisible(false);
        }
    }, [badge, onClose]);

    if (!badge) return null;

    const definition = getBadgeDefinition(badge.id);
    if (!definition) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setVisible(false); setTimeout(onClose, 300); }} />

            {/* Modal */}
            <div className={`relative transform transition-all duration-500 ${visible ? 'scale-100 translate-y-0' : 'scale-75 translate-y-8'}`}>
                <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center max-w-sm mx-4 border ${TIER_BORDER[definition.tier]}`}>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${TIER_COLORS[definition.tier]} opacity-5`} />

                    <div className="relative">
                        {/* Badge icon */}
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${TIER_COLORS[definition.tier]} flex items-center justify-center shadow-lg`}>
                            <span className="text-4xl">{definition.icon}</span>
                        </div>

                        {/* Title */}
                        <p className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-2">
                            {isEs ? "Insignia Obtenida" : "Badge Earned"}
                        </p>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                            {definition.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {definition.description}
                        </p>

                        {/* Tier */}
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize bg-gradient-to-r ${TIER_COLORS[definition.tier]} text-white`}>
                            {definition.tier}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
