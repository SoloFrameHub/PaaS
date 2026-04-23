'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useConfetti } from './confetti-burst';
import BadgeEarnedModal from './badge-earned-modal';
import StreakToast from './streak-toast';
import LevelUpOverlay from './level-up-overlay';
import type { BadgeEarned, Celebrations } from '@/types/profile';

interface CelebrationContextType {
    celebrate: (celebrations: Celebrations) => void;
}

const CelebrationContext = createContext<CelebrationContextType>({
    celebrate: () => {},
});

export function useCelebration() {
    return useContext(CelebrationContext);
}

export default function CelebrationProvider({ children }: { children: ReactNode }) {
    const { fire: fireConfetti } = useConfetti();
    const [badgeQueue, setBadgeQueue] = useState<BadgeEarned[]>([]);
    const [currentBadge, setCurrentBadge] = useState<BadgeEarned | null>(null);
    const badgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [streakMilestone, setStreakMilestone] = useState<number | null>(null);
    const [levelUp, setLevelUp] = useState<{ from: number; to: number; title: string } | null>(null);

    const celebrate = useCallback((celebrations: Celebrations) => {
        // Fire confetti for any celebration
        if (celebrations.courseCompleted) {
            fireConfetti('gold');
        } else if (celebrations.badges && celebrations.badges.length > 0) {
            fireConfetti('stars');
        } else if (celebrations.levelUp) {
            fireConfetti('default');
        }

        // Queue badges for sequential display
        if (celebrations.badges && celebrations.badges.length > 0) {
            const newBadges = celebrations.badges;
            setCurrentBadge(prev => {
                if (prev === null) {
                    // No badge showing — show first, queue rest
                    setBadgeQueue(q => [...q, ...newBadges.slice(1)]);
                    return newBadges[0];
                }
                // Badge already showing — queue all
                setBadgeQueue(q => [...q, ...newBadges]);
                return prev;
            });
        }

        // Show streak toast
        if (celebrations.streakMilestone) {
            setStreakMilestone(celebrations.streakMilestone);
        }

        // Show level up overlay
        if (celebrations.levelUp) {
            setLevelUp(celebrations.levelUp);
        }
    }, [fireConfetti]);

    // Cleanup badge timer on unmount
    useEffect(() => {
        return () => {
            if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current);
        };
    }, []);

    const handleBadgeClose = useCallback(() => {
        setCurrentBadge(null);
        // Show next badge in queue after a short delay
        setBadgeQueue(prev => {
            if (prev.length > 0) {
                const nextBadge = prev[0];
                const rest = prev.slice(1);
                badgeTimerRef.current = setTimeout(() => setCurrentBadge(nextBadge), 300);
                return rest;
            }
            return prev;
        });
    }, []);

    return (
        <CelebrationContext.Provider value={{ celebrate }}>
            {children}
            <BadgeEarnedModal badge={currentBadge} onClose={handleBadgeClose} />
            <StreakToast streak={streakMilestone} onDone={() => setStreakMilestone(null)} />
            <LevelUpOverlay levelUp={levelUp} onDone={() => setLevelUp(null)} />
        </CelebrationContext.Provider>
    );
}
