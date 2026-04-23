'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

/** Reusable confetti celebration hook for XP-earning moments */
export function useConfetti() {
    const fireConfetti = useCallback((options?: { intensity?: 'small' | 'medium' | 'large' }) => {
        const intensity = options?.intensity ?? 'medium';

        const base = {
            origin: { y: 0.7 },
            disableForReducedMotion: true,
        };

        switch (intensity) {
            case 'small':
                // Subtle burst for small achievements (log entry, checklist item)
                confetti({
                    ...base,
                    particleCount: 30,
                    spread: 50,
                    startVelocity: 20,
                    scalar: 0.8,
                    colors: ['#14b8a6', '#6366f1', '#8b5cf6'],
                });
                break;

            case 'medium':
                // Standard celebration (assessment complete, checklist done)
                confetti({
                    ...base,
                    particleCount: 60,
                    spread: 70,
                    startVelocity: 30,
                    colors: ['#14b8a6', '#6366f1', '#8b5cf6', '#f59e0b', '#22c55e'],
                });
                break;

            case 'large':
                // Big celebration (course complete, major milestone)
                const duration = 1500;
                const end = Date.now() + duration;

                const frame = () => {
                    confetti({
                        particleCount: 3,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0, y: 0.7 },
                        colors: ['#14b8a6', '#6366f1', '#f59e0b'],
                        disableForReducedMotion: true,
                    });
                    confetti({
                        particleCount: 3,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1, y: 0.7 },
                        colors: ['#8b5cf6', '#22c55e', '#ef4444'],
                        disableForReducedMotion: true,
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                };
                frame();
                break;
        }
    }, []);

    return { fireConfetti };
}
