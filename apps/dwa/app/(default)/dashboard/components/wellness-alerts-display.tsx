/**
 * WellnessAlertsDisplay — Gentle alert banners for the dashboard.
 *
 * Alert kinds and their visual treatment:
 *  - reassess: primary-50 (indigo tint)
 *  - inactivity: violet-50
 *  - stagnation: primary-50
 *  - clinical-flag: rose-50 (soft, NOT red — red is crisis-only)
 *
 * No dismiss button — alerts persist until the underlying condition resolves.
 */

import Link from 'next/link';
import type { WellnessAlert, WellnessAlertKind } from '@/types/wellness-scores';

interface WellnessAlertsDisplayProps {
    alerts: WellnessAlert[];
}

const ALERT_STYLES: Record<WellnessAlertKind, {
    border: string;
    bg: string;
    iconBg: string;
    titleColor: string;
    textColor: string;
    btnBg: string;
    icon: string;
}> = {
    'clinical-flag': {
        border: 'border-l-rose-400',
        bg: 'bg-rose-50 dark:bg-rose-900/20',
        iconBg: 'bg-rose-100 dark:bg-rose-500/20',
        titleColor: 'text-rose-900 dark:text-rose-100',
        textColor: 'text-rose-700 dark:text-rose-200',
        btnBg: 'bg-rose-500 hover:bg-rose-600',
        icon: '\u2764\uFE0F',
    },
    'reassess': {
        border: 'border-l-primary-400',
        bg: 'bg-primary-50 dark:bg-primary-900/20',
        iconBg: 'bg-primary-100 dark:bg-primary-500/20',
        titleColor: 'text-primary-900 dark:text-primary-100',
        textColor: 'text-primary-700 dark:text-primary-200',
        btnBg: 'bg-primary-500 hover:bg-primary-600',
        icon: '\u2728',
    },
    'inactivity': {
        border: 'border-l-violet-400',
        bg: 'bg-violet-50 dark:bg-violet-900/20',
        iconBg: 'bg-violet-100 dark:bg-violet-500/20',
        titleColor: 'text-violet-900 dark:text-violet-100',
        textColor: 'text-violet-700 dark:text-violet-200',
        btnBg: 'bg-violet-500 hover:bg-violet-600',
        icon: '\uD83D\uDC4B',
    },
    'stagnation': {
        border: 'border-l-primary-400',
        bg: 'bg-primary-50 dark:bg-primary-900/20',
        iconBg: 'bg-primary-100 dark:bg-primary-500/20',
        titleColor: 'text-primary-900 dark:text-primary-100',
        textColor: 'text-primary-700 dark:text-primary-200',
        btnBg: 'bg-primary-500 hover:bg-primary-600',
        icon: '\uD83D\uDCA1',
    },
};

function AlertBanner({ alert }: { alert: WellnessAlert }) {
    const style = ALERT_STYLES[alert.kind];

    return (
        <div className={`${style.bg} border-l-4 ${style.border} rounded-r-2xl p-4 mb-3`}>
            <div className="flex items-start gap-3">
                <div className={`w-8 h-8 ${style.iconBg} rounded-lg flex items-center justify-center shrink-0 text-base`}>
                    {style.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-semibold ${style.titleColor} mb-0.5`}>
                        {alert.title}
                    </h3>
                    <p className={`text-xs ${style.textColor} mb-2 leading-relaxed`}>
                        {alert.message}
                    </p>
                    <Link
                        href={alert.ctaHref}
                        className={`inline-flex items-center text-xs font-medium text-white ${style.btnBg} px-3 py-1.5 rounded-lg transition-colors`}
                    >
                        {alert.ctaLabel}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function WellnessAlertsDisplay({ alerts }: WellnessAlertsDisplayProps) {
    if (alerts.length === 0) return null;

    return (
        <div className="mb-6">
            {alerts.map(alert => (
                <AlertBanner key={alert.id} alert={alert} />
            ))}
        </div>
    );
}
