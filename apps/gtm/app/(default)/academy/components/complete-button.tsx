'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { GA4Events } from '@/lib/analytics/ga4';
import { useCelebration } from '@/components/celebrations/celebration-provider';

interface CompleteButtonProps {
    courseId: string;
    courseNumber: number;
    lessonId: string;
    nextLessonId?: string;
}

export default function CompleteButton({
    courseId,
    courseNumber,
    lessonId,
    nextLessonId
}: CompleteButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const locale = useLocale();
    const isEs = locale === 'es';
    const { celebrate } = useCelebration();

    const handleComplete = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await fetch('/api/academy/complete-lesson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId,
                    courseNumber,
                    lessonId,
                    xpEarned: 10,
                    isLastLesson: !nextLessonId,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                }),
            });

            if (!response.ok) throw new Error('Failed to complete lesson');

            const data = await response.json();

            // Trigger celebrations if any
            if (data.data?.celebrations) {
                celebrate(data.data.celebrations);
            }

            GA4Events.lessonCompleted(courseId, lessonId, '');

            // Keep loading=true during delay to prevent double-clicks
            const delay = data.data?.celebrations ? 800 : 0;
            setTimeout(() => {
                if (nextLessonId) {
                    router.push(`/academy/${courseId}/${nextLessonId}`);
                } else {
                    router.push(`/academy/${courseId}`);
                }
            }, delay);
        } catch (error) {
            console.error('Error completing lesson:', error);
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleComplete}
            disabled={loading}
            data-testid="complete-lesson-button"
            className={`flex flex-col p-6 rounded-2xl ${nextLessonId
                ? 'bg-primary-500 hover:bg-primary-600 shadow-primary-500/20'
                : 'bg-green-500 hover:bg-green-600 shadow-green-500/20'
                } text-white shadow-xl transition-all text-right group min-w-[240px] disabled:opacity-50`}
        >
            <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${nextLessonId ? 'text-white/60' : 'text-white/80'
                }`}>
                {loading
                    ? (isEs ? 'Guardando...' : 'Saving...')
                    : (nextLessonId
                        ? (isEs ? 'Terminar y siguiente' : 'Finish & Next Lesson')
                        : (isEs ? 'Terminar curso 🎯' : 'Finish Course 🎯'))}
            </span>
            <span className="text-xl font-black">
                {nextLessonId ? (isEs ? 'Siguiente →' : 'Next Step →') : (isEs ? 'Completar curso' : 'Complete Course')}
            </span>
        </button>
    );
}
