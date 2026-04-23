'use client';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import type { TrackingLogEntry, TrackingField } from '@/types/tracking-log';

interface TrackingTrendChartProps {
    entries: TrackingLogEntry[];
    fields: TrackingField[];
}

const LINE_COLORS = ['#14b8a6', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function TrackingTrendChart({ entries, fields }: TrackingTrendChartProps) {
    // Only chart numeric/rating fields
    const chartableFields = fields.filter(f => f.type === 'rating' || f.type === 'number').slice(0, 3);

    if (chartableFields.length === 0 || entries.length < 2) return null;

    // Sort chronologically (entries come newest-first)
    const sorted = [...entries].reverse();

    const data = sorted.map(entry => {
        const point: Record<string, string | number> = {
            date: new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        };
        for (const f of chartableFields) {
            const val = entry.values[f.id];
            if (typeof val === 'number') point[f.id] = val;
            else if (typeof val === 'string' && val !== '') point[f.id] = Number(val);
        }
        return point;
    });

    // Compute Y domain
    let yMin = Infinity;
    let yMax = -Infinity;
    for (const f of chartableFields) {
        if (f.min !== undefined) yMin = Math.min(yMin, f.min);
        if (f.max !== undefined) yMax = Math.max(yMax, f.max);
        for (const d of data) {
            const v = d[f.id];
            if (typeof v === 'number') {
                yMin = Math.min(yMin, v);
                yMax = Math.max(yMax, v);
            }
        }
    }
    if (!isFinite(yMin)) yMin = 0;
    if (!isFinite(yMax)) yMax = 10;

    return (
        <div className="mt-6 p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
                Trends
            </h4>
            <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            domain={[Math.max(0, yMin - 1), yMax + 1]}
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
                        />
                        {chartableFields.map((f, i) => (
                            <Line
                                key={f.id}
                                type="monotone"
                                dataKey={f.id}
                                name={f.label}
                                stroke={LINE_COLORS[i % LINE_COLORS.length]}
                                strokeWidth={2.5}
                                dot={{ fill: LINE_COLORS[i % LINE_COLORS.length], strokeWidth: 2, r: 3 }}
                                activeDot={{ r: 5 }}
                                connectNulls
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
                {chartableFields.map((f, i) => (
                    <span key={f.id} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: LINE_COLORS[i % LINE_COLORS.length] }}
                        />
                        {f.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
