'use client';

import { User } from '@/types/user';
import { useLocale } from 'next-intl';

interface RoleplayStatsProps {
    user: User;
}

export default function RoleplayStats({ user }: RoleplayStatsProps) {
    const locale = useLocale();
    const isEs = locale === 'es';
    const stats = user.founder_profile?.roleplay_stats;

    if (!stats || stats.total_sessions === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/60 h-full flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{isEs ? 'Sin datos de simulación aún' : 'No Simulation Data Yet'}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{isEs ? 'Completa tu primer roleplay para ver tus métricas de rendimiento en la Matriz 3D.' : 'Complete your first roleplay to see your performance metrics across the 3D Matrix.'}</p>
                <a href="/roleplay" className="text-sm font-bold text-primary-500 hover:text-primary-600">{isEs ? 'Iniciar primera sesión →' : 'Start First Session →'}</a>
            </div>
        );
    }

    // Prepare data for dimensions
    const discTypes = Object.entries(stats.by_disc_type || {}).map(([type, data]) => ({ type, ...data }));
    const topDisc = discTypes.sort((a, b) => b.avg_score - a.avg_score)[0];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/60 h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{isEs ? 'Habilidades de batalla' : 'Battle Skills'}</h2>
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">{stats.total_sessions} {isEs ? 'sesiones' : 'Sessions'}</span>
            </div>

            <div className="space-y-6">
                {/* DISC Resonance */}
                <div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                        <span>{isEs ? 'Resonancia psicológica' : 'Psychological Resonance'}</span>
                        {topDisc && <span className="text-primary-500">{isEs ? `Más fuerte: ${topDisc.type}` : `Strongest: ${topDisc.type}`}</span>}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {['D', 'I', 'S', 'C'].map((type) => {
                            const data = (stats.by_disc_type as any)[type] || { avg_score: 0 };
                            const height = Math.max((data.avg_score / 10) * 100, 5);
                            return (
                                <div key={type} className="flex flex-col items-center">
                                    <div className="w-full h-24 bg-gray-50 dark:bg-gray-900 rounded-lg relative overflow-hidden flex flex-col justify-end">
                                        <div
                                            className="w-full bg-primary-500 rounded-b-lg transition-all duration-1000"
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black mt-2 text-gray-500">{type}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dimensions Summary */}
                <div className="grid grid-cols-1 gap-3">
                    {stats.by_industry && Object.keys(stats.by_industry).length > 0 && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700/60">
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{isEs ? 'Industria principal' : 'Top Industry'}</div>
                            <div className="text-sm font-bold text-gray-800 dark:text-gray-100">
                                {Object.entries(stats.by_industry).sort((a, b) => b[1].avg_score - a[1].avg_score)[0][0].replace('_', ' ')}
                            </div>
                        </div>
                    )}
                </div>

                {/* Insight */}
                <div className="pt-2">
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed italic">
                        {topDisc
                            ? isEs
                                ? `Tu rendimiento contra compradores Alto-${topDisc.type} es excepcional.${user.founder_profile?.founder_category ? ` Tu metodología ${user.founder_profile.founder_category.replace('_', ' ')} resuena bien aquí.` : ''}`
                                : `Your performance against High-${topDisc.type} buyers is exceptional.${user.founder_profile?.founder_category ? ` Your ${user.founder_profile.founder_category.replace('_', ' ')} methodology resonates well here.` : ''}`
                            : isEs
                                ? "Sigue practicando en diferentes industrias para construir tu mapa de rendimiento 3D."
                                : "Keep practicing across different industries to build your 3D performance map."}
                    </p>
                </div>
            </div>
        </div>
    );
}
