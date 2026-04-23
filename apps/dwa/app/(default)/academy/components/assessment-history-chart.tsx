'use client';

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceArea,
    CartesianGrid,
} from 'recharts';
import type { AssessmentResult, SeverityBand } from '@/types/assessment';

interface AssessmentHistoryChartProps {
    results: AssessmentResult[];
    bands: SeverityBand[];
    maxScore: number;
    latestResult?: AssessmentResult;
}

const BAND_FILL: Record<string, string> = {
    green: 'rgba(34,197,94,0.08)',
    yellow: 'rgba(234,179,8,0.08)',
    orange: 'rgba(249,115,22,0.08)',
    red: 'rgba(239,68,68,0.08)',
};

export default function AssessmentHistoryChart({
    results,
    bands,
    maxScore,
    latestResult,
}: AssessmentHistoryChartProps) {
    // Need at least 2 data points for a meaningful chart
    const allResults = latestResult
        ? [...results, latestResult]
        : results;

    if (allResults.length < 2) return null;

    // Sort chronologically and deduplicate
    const sorted = [...allResults]
        .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());

    const data = sorted.map(r => ({
        date: new Date(r.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: r.totalScore,
        severity: r.severityLabel,
    }));

    return (
        <div className="mt-6 p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
                Score History
            </h4>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

                        {/* Severity band backgrounds */}
                        {bands.map(band => (
                            <ReferenceArea
                                key={band.severity}
                                y1={band.min}
                                y2={band.max + 1}
                                fill={BAND_FILL[band.color] || BAND_FILL.green}
                                ifOverflow="extendDomain"
                            />
                        ))}

                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            domain={[0, maxScore]}
                            tick={{ fontSize: 11, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '13px',
                            }}
                            formatter={(value: any, _name: any, props: any) => [
                                `${value} / ${maxScore} (${props?.payload?.severity ?? ''})`,
                                'Score',
                            ]}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#6366f1"
                            strokeWidth={2.5}
                            fill="rgba(99,102,241,0.1)"
                            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#6366f1' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
                {data.length} assessment{data.length !== 1 ? 's' : ''} over time
                {sorted[0].totalScore > sorted[sorted.length - 1].totalScore && (
                    <span className="text-green-500 font-medium ml-1">
                        — trending lower (improvement)
                    </span>
                )}
                {sorted[0].totalScore < sorted[sorted.length - 1].totalScore && (
                    <span className="text-orange-500 font-medium ml-1">
                        — trending higher
                    </span>
                )}
            </p>
        </div>
    );
}
