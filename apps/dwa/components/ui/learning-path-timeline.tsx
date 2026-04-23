'use client'

import Link from 'next/link'

export interface PathCourse {
    id: string
    title: string
    description: string
    duration: string
    lessonCount: number
    /** Formatted symptom names that match the user, e.g. ["Anxiety", "Panic"] */
    matchingSymptoms?: string[]
    completedLessonCount?: number
    isCompleted?: boolean
    isCurrent?: boolean
}

interface LearningPathTimelineProps {
    courses: PathCourse[]
    /** For onboarding: which course is selected to start */
    selectedCourseId?: string
    /** For onboarding: callback when user clicks a course to select it */
    onSelectCourse?: (id: string) => void
    /** 'full' shows descriptions + symptoms. 'compact' for dashboard. */
    variant?: 'full' | 'compact'
    /** Show clickable links to course pages */
    showLinks?: boolean
    /** Summary text like "~22 hours total" */
    totalDuration?: string
}

export default function LearningPathTimeline({
    courses,
    selectedCourseId,
    onSelectCourse,
    variant = 'full',
    showLinks = false,
    totalDuration,
}: LearningPathTimelineProps) {
    if (courses.length === 0) return null

    const isSelectable = !!onSelectCourse

    return (
        <div>
            {/* Summary stats — focus on bite-sized lessons, not bulk hours */}
            {variant === 'full' && (
                <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {courses.length} courses
                    </span>
                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ~15-20 min per lesson
                    </span>
                </div>
            )}

            {/* Timeline */}
            <div className="relative">
                {courses.map((course, index) => {
                    const isLast = index === courses.length - 1
                    const isSelected = selectedCourseId === course.id
                    const progressPct =
                        course.lessonCount > 0 && (course.completedLessonCount ?? 0) > 0
                            ? Math.round(((course.completedLessonCount ?? 0) / course.lessonCount) * 100)
                            : 0

                    // Node visual state
                    let nodeState: 'completed' | 'current' | 'selected' | 'upcoming'
                    if (course.isCompleted) nodeState = 'completed'
                    else if (course.isCurrent) nodeState = 'current'
                    else if (isSelected && isSelectable) nodeState = 'selected'
                    else nodeState = 'upcoming'

                    const nodeSize = variant === 'compact' ? 'w-8 h-8' : 'w-10 h-10'
                    const textSize = variant === 'compact' ? 'text-xs' : 'text-sm'

                    // Card content (used in both modes)
                    const cardContent = (
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h3 className={`font-bold ${variant === 'compact' ? 'text-sm' : 'text-base'} ${
                                    nodeState === 'completed'
                                        ? 'text-green-700 dark:text-green-400'
                                        : nodeState === 'current' || nodeState === 'selected'
                                            ? 'text-gray-900 dark:text-gray-100'
                                            : 'text-gray-700 dark:text-gray-300'
                                }`}>
                                    {course.title}
                                </h3>
                                {index === 0 && isSelectable && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-primary-500 text-white rounded-full">
                                        Recommended
                                    </span>
                                )}
                                {nodeState === 'completed' && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-full">
                                        Completed
                                    </span>
                                )}
                                {nodeState === 'current' && !isSelectable && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 rounded-full">
                                        In Progress
                                    </span>
                                )}
                                {isSelected && isSelectable && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 rounded-full">
                                        Start Here
                                    </span>
                                )}
                            </div>

                            {/* Symptom match badges — full variant only */}
                            {variant === 'full' && course.matchingSymptoms && course.matchingSymptoms.length > 0 && (
                                <p className="text-xs text-violet-600 dark:text-violet-400 font-medium mb-1.5">
                                    Matches: {course.matchingSymptoms.join(', ')}
                                </p>
                            )}

                            {/* Description — full variant only */}
                            {variant === 'full' && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                                    {course.description}
                                </p>
                            )}

                            {/* Meta row — per-lesson time feels achievable */}
                            <div className={`flex items-center gap-3 ${textSize} text-gray-400 dark:text-gray-500`}>
                                <span>{course.lessonCount} lessons</span>
                                <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                                <span>~20 min each</span>
                            </div>

                            {/* Progress bar for in-progress courses */}
                            {nodeState === 'current' && progressPct > 0 && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                                        <span>{course.completedLessonCount}/{course.lessonCount} lessons</span>
                                        <span>{progressPct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary-500 rounded-full transition-all duration-500"
                                            style={{ width: `${progressPct}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Course link — non-selectable mode only */}
                            {showLinks && !isSelectable && !course.isCompleted && (
                                <div className="mt-2">
                                    <Link
                                        href={`/academy/${course.id}`}
                                        className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                                    >
                                        {course.isCurrent ? 'Continue' : 'Start Course'} &rarr;
                                    </Link>
                                </div>
                            )}
                            {showLinks && course.isCompleted && (
                                <div className="mt-2">
                                    <Link
                                        href={`/academy/${course.id}`}
                                        className="text-sm font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    >
                                        Review &rarr;
                                    </Link>
                                </div>
                            )}
                        </div>
                    )

                    return (
                        <div key={course.id} className={`relative flex gap-4 ${variant === 'compact' ? 'gap-3' : 'gap-4'}`}>
                            {/* Left column: node + connector */}
                            <div className="flex flex-col items-center">
                                {/* Circle node */}
                                <div
                                    className={`
                                        relative z-10 ${nodeSize} rounded-full flex items-center justify-center shrink-0
                                        border-2 font-bold ${textSize} transition-all
                                        ${nodeState === 'completed'
                                            ? 'bg-green-100 dark:bg-green-500/20 border-green-500 text-green-600 dark:text-green-400'
                                            : nodeState === 'current'
                                                ? 'bg-primary-100 dark:bg-primary-500/20 border-primary-500 text-primary-600 dark:text-primary-400 ring-4 ring-primary-500/20'
                                                : nodeState === 'selected'
                                                    ? 'bg-violet-100 dark:bg-violet-500/20 border-violet-500 text-violet-600 dark:text-violet-400 ring-4 ring-violet-500/20'
                                                    : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                                        }
                                    `}
                                >
                                    {nodeState === 'completed' ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                    {nodeState === 'current' && (
                                        <span className="absolute inset-0 rounded-full animate-ping bg-primary-500/20 pointer-events-none" />
                                    )}
                                </div>

                                {/* Connector line */}
                                {!isLast && (
                                    <div
                                        className={`w-0.5 flex-1 min-h-6 ${
                                            nodeState === 'completed'
                                                ? 'bg-green-300 dark:bg-green-500/40'
                                                : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                    />
                                )}
                            </div>

                            {/* Right column: course card */}
                            <div className={`flex-1 ${isLast ? 'pb-0' : variant === 'compact' ? 'pb-4' : 'pb-6'}`}>
                                {isSelectable ? (
                                    <button
                                        type="button"
                                        onClick={() => onSelectCourse?.(course.id)}
                                        className={`
                                            w-full text-left p-4 rounded-xl border-2 transition-all
                                            ${isSelected
                                                ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 shadow-sm'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        {cardContent}
                                    </button>
                                ) : showLinks ? (
                                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-800/50">
                                        {cardContent}
                                    </div>
                                ) : (
                                    <div className={variant === 'compact' ? '' : 'pt-1'}>
                                        {cardContent}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
