'use client';

import { useFounderContextSafe } from '@/lib/context/FounderContext';
import { useState } from 'react';

/**
 * A sidebar panel that displays the user's current 3D Matrix context.
 * Useful for coaching and personalization.
 */
export default function FounderContextPanel() {
    const context = useFounderContextSafe();
    const [isOpen, setIsOpen] = useState(false);

    if (!context || context.isLoading || !context.founderCategory) {
        return null;
    }

    const { founderCategory, industry, targetRoles } = context;

    return (
        <div className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-[calc(100%-12px)]'}`}>
            <div className="flex items-center">
                {/* Toggle tab */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-24 bg-gray-900 dark:bg-black border border-white/10 rounded-l-2xl flex items-center justify-center group shadow-2xl"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse`} />
                        <span className="[writing-mode:vertical-lr] text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                            3D Context
                        </span>
                    </div>
                </button>

                {/* Content Panel */}
                <div className="w-72 bg-gray-900 border-l border-white/10 p-6 shadow-2xl min-h-[400px]">
                    <div className="mb-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-2">My Founder Profile</h3>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <h4 className="font-bold text-white mb-1">{founderCategory.display_name}</h4>
                            <p className="text-[10px] text-gray-400 leading-relaxed">
                                {founderCategory.short_description}
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-2">Market Context</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500">Industry:</span>
                                <span className="text-white font-bold">{industry?.display_name || 'Generic'}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500">Key Role:</span>
                                <span className="text-white font-bold">{targetRoles[0]?.display_name || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary-500 mb-2">Common Objections</h3>
                        <div className="space-y-2">
                            {industry?.common_objections?.slice(0, 3).map((obj, i) => (
                                <div key={i} className="p-2 bg-white/5 rounded-xl border border-white/5 text-[10px] text-gray-400">
                                    &quot;{obj.objection}&quot;
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-[10px] text-gray-500 italic mt-auto pt-8 border-t border-white/5">
                        Your lessons and roleplays are currently tuned to this 3D Matrix context.
                    </div>
                </div>
            </div>
        </div>
    );
}
