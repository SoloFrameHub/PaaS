import { getCourseByNumber } from '@/lib/data/curriculum';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import type { JourneyPhase } from '@/types/profile';

interface JourneyMapProps {
    phases: JourneyPhase[];
    completedCourses: number[];
    currentCourse: number | null;
    recommendedPath?: string;
}

export default async function JourneyMap({ phases, completedCourses, currentCourse, recommendedPath }: JourneyMapProps) {
    const locale = await getLocale();
    const isEs = locale === 'es';

    const completed = new Set(completedCourses);

    // Calculate overall journey progress
    const totalCourses = phases.reduce((sum, p) => sum + p.courses.length, 0);
    const totalCompleted = phases.reduce((sum, p) => sum + p.courses.filter(cn => completed.has(cn)).length, 0);

    // Determine which phase is active (first incomplete one)
    const activePhaseIndex = phases.findIndex(p => !p.courses.every(cn => completed.has(cn)));

    const pathLabel = isEs
        ? (recommendedPath === 'inbound' ? 'Inbound'
            : recommendedPath === 'outbound' ? 'Outbound'
            : recommendedPath === 'hybrid' ? 'Híbrido'
            : null)
        : (recommendedPath === 'inbound' ? 'Inbound'
            : recommendedPath === 'outbound' ? 'Outbound'
            : recommendedPath === 'hybrid' ? 'Hybrid'
            : null);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{isEs ? "Tu Ruta de Aprendizaje" : "Your Learning Path"}</h2>
                {pathLabel && (
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-500 bg-primary-50 dark:bg-primary-500/10 px-3 py-1 rounded-full">
                        {isEs ? `Ruta ${pathLabel}` : `${pathLabel} Path`}
                    </span>
                )}
            </div>

            {/* Overall progress bar */}
            <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                    <span>{isEs ? `${totalCompleted} de ${totalCourses} cursos` : `${totalCompleted} of ${totalCourses} courses`}</span>
                    <span>{totalCourses > 0 ? Math.round((totalCompleted / totalCourses) * 100) : 0}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary-500 to-indigo-500 rounded-full transition-all duration-1000"
                        style={{ width: `${totalCourses > 0 ? (totalCompleted / totalCourses) * 100 : 0}%` }}
                    />
                </div>
            </div>

            {/* Phase timeline */}
            <div className="space-y-0">
                {phases.map((phase, i) => {
                    const phaseCompleted = phase.courses.filter(cn => completed.has(cn)).length;
                    const phaseTotal = phase.courses.length;
                    const isComplete = phaseCompleted === phaseTotal;
                    const isActive = i === activePhaseIndex;
                    const isLocked = i > activePhaseIndex && activePhaseIndex >= 0;

                    return (
                        <div key={i} className="relative">
                            {/* Connector line between phases */}
                            {i > 0 && (
                                <div className={`absolute left-[15px] -top-0 w-0.5 h-4 ${
                                    i <= activePhaseIndex ? 'bg-primary-400' : 'bg-gray-200 dark:bg-gray-700'
                                }`} />
                            )}

                            <div className={`flex gap-4 py-3 ${isLocked ? 'opacity-50' : ''}`}>
                                {/* Phase indicator */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                                    isComplete
                                        ? 'bg-green-500 text-white'
                                        : isActive
                                            ? 'bg-primary-500 text-white ring-4 ring-primary-100 dark:ring-primary-500/20'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                }`}>
                                    {isComplete ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        i + 1
                                    )}
                                </div>

                                {/* Phase content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between gap-2 mb-1">
                                        <h3 className={`text-sm font-bold truncate ${
                                            isActive ? 'text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                            {phase.phase}
                                        </h3>
                                        <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
                                            ~{phase.estimatedWeeks}w
                                        </span>
                                    </div>

                                    {/* Course pills */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {phase.courses.map(cn => {
                                            const course = getCourseByNumber(cn);
                                            const isDone = completed.has(cn);
                                            const isCurrent = cn === currentCourse;

                                            return (
                                                <Link
                                                    key={cn}
                                                    href={course ? `/academy/${course.id}` : '#'}
                                                    className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full transition-colors ${
                                                        isDone
                                                            ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                                                            : isCurrent
                                                                ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-400 ring-1 ring-primary-300 dark:ring-primary-500/40'
                                                                : isLocked
                                                                    ? 'bg-gray-100 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 cursor-default'
                                                                    : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    {isDone && (
                                                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                    {course?.title ? (course.title.length > 25 ? course.title.slice(0, 25) + '...' : course.title) : (isEs ? `Curso ${cn}` : `Course ${cn}`)}
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    {/* Phase progress micro-bar */}
                                    {!isComplete && !isLocked && (
                                        <div className="h-1 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                                            <div
                                                className="h-full bg-primary-400 rounded-full transition-all"
                                                style={{ width: `${phaseTotal > 0 ? (phaseCompleted / phaseTotal) * 100 : 0}%` }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
