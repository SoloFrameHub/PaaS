'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CompleteButtonProps {
    courseId: string;
    lessonId: string;
    nextLessonId?: string;
}

export default function CompleteButton({
    courseId,
    lessonId,
    nextLessonId
}: CompleteButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleComplete = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/academy/complete-lesson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId,
                    lessonId,
                    xpEarned: 10,
                    isLastLesson: !nextLessonId
                }),
            });

            if (response.ok) {
                if (nextLessonId) {
                    router.push(`/academy/${courseId}/${nextLessonId}`);
                } else {
                    router.push(`/academy/${courseId}/complete`);
                }
            } else if (response.status === 401) {
                // Session expired — redirect to sign in
                setError('Session expired. Redirecting...');
                setTimeout(() => router.push('/signin'), 1500);
            } else {
                const json = await response.json().catch(() => null);
                const msg = json?.error?.message || json?.error || 'Could not save progress';
                setError(msg);
            }
        } catch {
            setError('Network error. Check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-2">
            {error && (
                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-3 sm:px-4 py-2 max-w-[260px] sm:max-w-[300px] text-right">
                    {error}
                    <button
                        onClick={() => setError(null)}
                        className="ml-2 underline text-xs hover:no-underline"
                    >
                        dismiss
                    </button>
                </div>
            )}
            <button
                onClick={handleComplete}
                disabled={loading}
                data-testid="complete-lesson-button"
                className={`flex flex-col p-4 sm:p-6 rounded-2xl ${nextLessonId
                    ? 'bg-primary-500 hover:bg-primary-600 shadow-primary-500/20'
                    : 'bg-green-500 hover:bg-green-600 shadow-green-500/20'
                    } text-white shadow-xl transition-all text-right group min-w-0 sm:min-w-[240px] disabled:opacity-50`}
            >
                <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${nextLessonId ? 'text-white/60' : 'text-white/80'
                    }`}>
                    {loading ? 'Saving...' : (nextLessonId ? 'Finish & Next Lesson' : 'Finish Course 🎯')}
                </span>
                <span className="text-xl font-black">
                    {nextLessonId ? 'Next Step →' : 'Complete Course'}
                </span>
            </button>
        </div>
    );
}
