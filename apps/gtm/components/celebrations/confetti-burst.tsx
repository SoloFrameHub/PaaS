'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiBurstProps {
    variant?: 'default' | 'gold' | 'stars';
}

export function useConfetti() {
    const fire = useCallback((variant: ConfettiBurstProps['variant'] = 'default') => {
        switch (variant) {
            case 'gold':
                // Gold burst for course completion
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FFD700', '#FFA500', '#FF8C00', '#DAA520'],
                });
                break;

            case 'stars':
                // Star shapes for badge earn
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.5 },
                    shapes: ['star'],
                    colors: ['#FFD700', '#FFA500', '#3B82F6', '#8B5CF6'],
                });
                break;

            default:
                // Default celebration
                const duration = 1500;
                const end = Date.now() + duration;

                const frame = () => {
                    confetti({
                        particleCount: 3,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                    });
                    confetti({
                        particleCount: 3,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                };
                frame();
                break;
        }
    }, []);

    return { fire };
}
