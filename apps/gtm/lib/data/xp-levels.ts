export interface XPLevel {
    level: number;
    title: string;
    minXP: number;
}

export const XP_LEVELS: XPLevel[] = [
    { level: 1,  title: 'Beginner',          minXP: 0 },
    { level: 2,  title: 'Novice',            minXP: 100 },
    { level: 3,  title: 'Apprentice',        minXP: 300 },
    { level: 4,  title: 'Journeyman',        minXP: 600 },
    { level: 5,  title: 'Practitioner',      minXP: 1000 },
    { level: 6,  title: 'Expert',            minXP: 1500 },
    { level: 7,  title: 'Master',            minXP: 2500 },
    { level: 8,  title: 'Grandmaster',       minXP: 4000 },
    { level: 9,  title: 'Legend',            minXP: 6000 },
    { level: 10, title: 'Academy Champion',  minXP: 10000 },
];

export function getLevel(xp: number): XPLevel {
    for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
        if (xp >= XP_LEVELS[i].minXP) return XP_LEVELS[i];
    }
    return XP_LEVELS[0];
}

export function getNextLevel(xp: number): XPLevel | null {
    const current = getLevel(xp);
    const nextIdx = XP_LEVELS.findIndex(l => l.level === current.level) + 1;
    return nextIdx < XP_LEVELS.length ? XP_LEVELS[nextIdx] : null;
}

export function getLevelProgress(xp: number): { current: XPLevel; next: XPLevel | null; progressPercent: number; xpToNext: number } {
    const current = getLevel(xp);
    const next = getNextLevel(xp);

    if (!next) {
        return { current, next: null, progressPercent: 100, xpToNext: 0 };
    }

    const xpInLevel = xp - current.minXP;
    const xpNeeded = next.minXP - current.minXP;
    const progressPercent = Math.round((xpInLevel / xpNeeded) * 100);

    return { current, next, progressPercent, xpToNext: next.minXP - xp };
}
