import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import type { AssessmentScores } from '@/types/profile';

interface AcquisitionHealthProps {
    scores: AssessmentScores;
    previousScores?: AssessmentScores | null;
}

type DimensionKey = keyof AssessmentScores;

const DIMENSIONS_EN: { key: DimensionKey; label: string; framework: string; courseNum: number }[] = [
    { key: 'icpClarity', label: 'ICP Clarity', framework: 'ICP Framework', courseNum: 1 },
    { key: 'positioningStrength', label: 'Positioning', framework: 'Prescription Frame', courseNum: 2 },
    { key: 'messagingConsistency', label: 'Messaging', framework: 'Outreach Tactics', courseNum: 7 },
    { key: 'channelReadiness', label: 'Channels', framework: 'Zero-to-Ten Sprint', courseNum: 3 },
    { key: 'salesProcessMaturity', label: 'Sales Process', framework: 'MVQ + Discovery', courseNum: 14 },
];

const DIMENSIONS_ES: { key: DimensionKey; label: string; framework: string; courseNum: number }[] = [
    { key: 'icpClarity', label: 'Claridad ICP', framework: 'Marco ICP', courseNum: 1 },
    { key: 'positioningStrength', label: 'Posicionamiento', framework: 'Marco de Prescripción', courseNum: 2 },
    { key: 'messagingConsistency', label: 'Mensajería', framework: 'Tácticas de Contacto', courseNum: 7 },
    { key: 'channelReadiness', label: 'Canales', framework: 'Sprint Cero-a-Diez', courseNum: 3 },
    { key: 'salesProcessMaturity', label: 'Proceso de Venta', framework: 'MVQ + Discovery', courseNum: 14 },
];

function scoreColor(score: number): string {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-red-500';
}

function deltaDisplay(current: number, previous: number | undefined) {
    if (previous == null) return null;
    const delta = current - previous;
    if (delta === 0) return <span className="text-gray-400 text-xs ml-1">--</span>;
    if (delta > 0) return <span className="text-green-400 text-xs ml-1">+{delta}</span>;
    return <span className="text-red-400 text-xs ml-1">{delta}</span>;
}

export default async function AcquisitionHealth({ scores, previousScores }: AcquisitionHealthProps) {
    const locale = await getLocale();
    const isEs = locale === 'es';
    const DIMENSIONS = isEs ? DIMENSIONS_ES : DIMENSIONS_EN;

    return (
        <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">{isEs ? "Salud de Adquisición" : "Acquisition Health"}</h2>
                <Link
                    href="/onboarding/assessment"
                    className="text-xs text-primary-400 hover:text-primary-300 font-semibold uppercase tracking-wider"
                >
                    {isEs ? "Reporte completo" : "Full Report"}
                </Link>
            </div>
            <div className="space-y-3">
                {DIMENSIONS.map((meta) => {
                    const score = scores[meta.key] ?? 0;
                    const prev = previousScores?.[meta.key];
                    return (
                        <div key={meta.key}>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-300">{meta.label}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-500 rounded">
                                        {meta.framework}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm font-bold text-white">{score}%</span>
                                    {deltaDisplay(score, prev)}
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${scoreColor(score)}`}
                                    style={{ width: `${Math.max(score, 2)}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
