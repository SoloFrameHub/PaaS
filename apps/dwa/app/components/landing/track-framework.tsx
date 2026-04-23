'use client'

import { ACADEMY_TRACKS } from '@/lib/data/landing-curriculum'

export function TrackFramework() {
    return (
        <section className="py-24 md:px-12 border-b border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="max-w-6xl mx-auto mb-32 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">The 7-Track Sales Protocol</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        We broken customer acquisition down into 7 logical tracks. Move from foundations to AI-powered scale in a structured, engineering-first path.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {ACADEMY_TRACKS.map((track) => (
                        <div key={track.id} className={`group gradient-border p-6 rounded-2xl bg-zinc-900/20 backdrop-blur-sm hover:bg-zinc-900/40 transition-all ${track.isLargest ? 'lg:col-span-2' : ''}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${track.color}-500/10 text-${track.color}-400 border border-${track.color}-500/20`}>
                                    <span className="font-mono text-lg font-bold">{track.id}</span>
                                </div>
                                {track.isNew && (
                                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-bold tracking-widest uppercase">New</span>
                                )}
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">{track.title}</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-6">{track.description}</p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span className="text-xs text-zinc-500 uppercase tracking-wider">{track.totalCourses} Courses</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="flex h-1.5 w-12 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-${track.color}-500`}
                                            style={{ width: `${(track.readyCourses || 0) / track.totalCourses * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[10px] text-zinc-400">{track.readyCourses || 0}/{track.totalCourses}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
