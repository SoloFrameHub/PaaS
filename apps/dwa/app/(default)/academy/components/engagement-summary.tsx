'use client';

import { useState, useEffect } from 'react';

type ExerciseType = 'quiz' | 'checklist' | 'assessment' | 'trackingLog' | 'thoughtRecord' | 'checkin';

interface EngagementSummaryProps {
    available: Record<ExerciseType, boolean>;
    completed: Record<ExerciseType, boolean>;
}

const LABELS: Record<ExerciseType, string> = {
    quiz: 'Lesson quiz — scroll up to complete it',
    checklist: 'Checklist / worksheet — scroll up to fill it in',
    assessment: 'Self-assessment — scroll up to fill it in',
    trackingLog: 'Tracking log — scroll up to add an entry',
    thoughtRecord: 'Thought record — scroll up to complete it',
    checkin: 'Reflection prompts — scroll up and tap any to respond',
};

export default function EngagementSummary({ available, completed: initialCompleted }: EngagementSummaryProps) {
    const [completed, setCompleted] = useState(initialCompleted);

    useEffect(() => {
        const handler = (e: Event) => {
            const type = (e as CustomEvent<{ type: ExerciseType }>).detail.type;
            setCompleted(prev => ({ ...prev, [type]: true }));
        };
        window.addEventListener('exercise-completed', handler);
        return () => window.removeEventListener('exercise-completed', handler);
    }, []);

    const types: ExerciseType[] = ['quiz', 'assessment', 'checklist', 'trackingLog', 'thoughtRecord', 'checkin'];
    const totalAvailable = types.filter(t => available[t]).length;
    const totalCompleted = types.filter(t => available[t] && completed[t]).length;

    if (totalAvailable === 0 || totalCompleted >= totalAvailable) return null;

    return (
        <div className="mt-10 p-4 sm:p-5 rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <span className="text-sm font-bold text-amber-800 dark:text-amber-300">
                    {totalCompleted === 0
                        ? 'You haven\u2019t completed the interactive exercises yet'
                        : `${totalCompleted} of ${totalAvailable} exercises completed`}
                </span>
            </div>
            <div className="space-y-1.5 text-sm">
                {types.map(type => available[type] && !completed[type] && (
                    <div key={type} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <span className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600 flex-shrink-0" />
                        <span>{LABELS[type]}</span>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                You can still continue, but completing these exercises makes the course more effective.
            </p>
        </div>
    );
}
