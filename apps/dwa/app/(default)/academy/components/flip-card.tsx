'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useComponentState, hashText } from './use-component-state';

interface FlipCardProps {
    front: string;
    back: string;
    frontIcon?: string;
    persistKey?: string;
}

export default function FlipCard({ front, back, frontIcon, persistKey }: FlipCardProps) {
    const key = persistKey ?? `fc-${hashText(front)}`;
    const { state, markFlipCardReviewed } = useComponentState();
    const [isFlipped, setIsFlipped] = useState(false);

    const wasReviewed = state?.flipCards?.reviewed?.includes(key) ?? false;

    const handleFlip = useCallback(() => {
        setIsFlipped(prev => !prev);
        if (!isFlipped) {
            markFlipCardReviewed(key);
        }
    }, [isFlipped, key, markFlipCardReviewed]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
        }
    }, [handleFlip]);

    return (
        <div className="not-prose my-6">
            <div
                className="relative w-full cursor-pointer"
                style={{ perspective: '1000px' }}
                onClick={handleFlip}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label={isFlipped ? 'Showing answer. Click to see question.' : 'Click to reveal answer.'}
            >
                <motion.div
                    className="relative w-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Front face */}
                    <div
                        className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <div className="flex items-start gap-3">
                            {frontIcon && (
                                <span className="text-2xl flex-shrink-0 mt-0.5">{frontIcon}</span>
                            )}
                            <div className="flex-1">
                                <p className="text-gray-800 dark:text-gray-100 font-medium leading-relaxed">
                                    {front}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">
                                Tap to reveal
                            </span>
                            {wasReviewed && !isFlipped && (
                                <span className="text-xs text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Reviewed
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Back face */}
                    <div
                        className="absolute inset-0 w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
                            {back}
                        </p>
                        <div className="mt-4">
                            <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">
                                Tap to flip back
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
