import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { buildActionRoute } from '@/lib/utils/action-routing';
import type { FounderProfile } from '@/types/profile';

interface NextActionsProps {
    profile: FounderProfile;
}

interface PrioritizedAction {
    title: string;
    description: string;
    href: string;
    label: string;
    framework?: string;
    priority: number;
    source: 'quickWin' | 'criticalGap' | 'course' | 'roleplay';
}

function buildActions(profile: FounderProfile): PrioritizedAction[] {
    const actions: PrioritizedAction[] = [];
    const assessment = profile.assessment;

    // 1. Quick wins with action routing (highest priority)
    if (assessment?.quickWins) {
        for (const win of assessment.quickWins) {
            const route = buildActionRoute(win.actionType, win.actionTarget, win.addressedInCourse);
            if (route) {
                actions.push({
                    title: win.title,
                    description: win.description,
                    href: route.href,
                    label: route.label,
                    framework: win.frameworkRef,
                    priority: win.impact === 'high' ? 1 : 2,
                    source: 'quickWin',
                });
            }
        }
    }

    // 2. Critical gaps (second priority)
    if (assessment?.criticalGaps) {
        for (const gap of assessment.criticalGaps) {
            const route = buildActionRoute(gap.actionType, gap.actionTarget, gap.addressedInCourse);
            if (route) {
                actions.push({
                    title: gap.title,
                    description: gap.description,
                    href: route.href,
                    label: route.label,
                    framework: gap.frameworkRef,
                    priority: 3,
                    source: 'criticalGap',
                });
            }
        }
    }

    // 3. Roleplay suggestion if sales process is low
    const salesScore = assessment?.scores?.salesProcessMaturity ?? 100;
    if (salesScore < 40) {
        actions.push({
            title: 'Practice a Discovery Call',
            description: 'Your sales process score is low. Practice with an AI buyer persona before your next real call.',
            href: '/roleplay',
            label: 'Start Roleplay',
            framework: 'Diagnostic Discovery',
            priority: 4,
            source: 'roleplay',
        });
    }

    // Sort by priority, take top 4
    return actions.sort((a, b) => a.priority - b.priority).slice(0, 4);
}

const SOURCE_DOTS: Record<string, string> = {
    quickWin: 'bg-green-500',
    criticalGap: 'bg-red-500',
    course: 'bg-blue-500',
    roleplay: 'bg-purple-500',
};

export default async function NextActions({ profile }: NextActionsProps) {
    const locale = await getLocale();
    const isEs = locale === 'es';
    const actions = buildActions(profile);

    if (actions.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">{isEs ? "Qué hacer a continuación" : "What to Do Next"}</h2>
                <p className="text-sm text-gray-500">{isEs ? "Completa tu evaluación para obtener próximas acciones personalizadas." : "Complete your assessment to get personalized next actions."}</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700/60">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">{isEs ? "Qué hacer a continuación" : "What to Do Next"}</h2>
            <div className="space-y-3">
                {actions.map((action, idx) => {
                    const dot = SOURCE_DOTS[action.source] ?? SOURCE_DOTS.course;
                    const sourceBadgeLabels: Record<string, string> = {
                        quickWin: isEs ? 'Victoria rápida' : 'Quick Win',
                        criticalGap: isEs ? 'Brecha' : 'Gap',
                        course: isEs ? 'Curso' : 'Course',
                        roleplay: isEs ? 'Práctica' : 'Practice',
                    };
                    const badgeLabel = sourceBadgeLabels[action.source] ?? (isEs ? 'Curso' : 'Course');
                    const displayTitle = isEs && action.source === 'roleplay'
                        ? 'Practica una llamada de descubrimiento'
                        : action.title;
                    const displayDescription = isEs && action.source === 'roleplay'
                        ? 'Tu puntaje de proceso de ventas es bajo. Practica con un comprador IA antes de tu próxima llamada real.'
                        : action.description;
                    const displayLabel = isEs && action.source === 'roleplay'
                        ? 'Iniciar roleplay'
                        : action.label;
                    return (
                        <div key={idx} className="flex items-start gap-3 group">
                            <span className={`w-2 h-2 rounded-full shrink-0 mt-2 ${dot}`} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{displayTitle}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
                                        {badgeLabel}
                                    </span>
                                    {action.framework && (
                                        <span className="text-[10px] px-1.5 py-0.5 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded">
                                            {action.framework}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{displayDescription}</p>
                                <Link
                                    href={action.href}
                                    className="inline-block mt-1 text-xs font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                                >
                                    {displayLabel} &rarr;
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
