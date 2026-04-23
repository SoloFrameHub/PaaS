'use client'

import Link from 'next/link'
import LearningPathTimeline, { type PathCourse } from '@/components/ui/learning-path-timeline'

interface DashboardPathPreviewProps {
    pathCourses: PathCourse[]
    completedCount: number
}

export default function DashboardPathPreview({
    pathCourses,
    completedCount,
}: DashboardPathPreviewProps) {
    if (pathCourses.length === 0) return null

    const totalLessons = pathCourses.reduce((sum, c) => sum + c.lessonCount, 0)
    const completedLessons = pathCourses.reduce((sum, c) => sum + (c.completedLessonCount ?? 0), 0)

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-700/60 overflow-hidden">

            {/* Header — focus on quick wins, not bulk hours */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-violet-500 rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Your Learning Path</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {completedLessons}/{totalLessons} lessons done &middot; ~15-20 min each
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/academy/my-path"
                        className="text-xs text-primary-500 hover:text-primary-600 font-semibold whitespace-nowrap"
                    >
                        Full Path &rarr;
                    </Link>
                </div>
            </div>

            {/* Timeline */}
            <div className="p-6">
                <LearningPathTimeline
                    courses={pathCourses}
                    variant="full"
                    showLinks
                />
            </div>
        </div>
    )
}
