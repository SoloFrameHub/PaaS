'use client'

import Link from 'next/link'
import { ArrowRight, CircleCheck, Zap, Star } from 'lucide-react'

export function LayoutHero() {
    return (
        <section id="wellness" className="md:px-12 border-white/5 border-b pt-24 pr-6 pb-20 pl-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] blur-[120px] rounded-full" style={{ backgroundColor: '#001276' }}></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                {/* Launch Badge */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[11px] font-bold tracking-widest uppercase mb-8 animate-fade-in">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                    </span>
                    3 Courses · Evidence-Based · AI Coach
                </div>

                <div className="space-y-4 mb-8">
                    <h2 className="text-sky-400 font-medium tracking-[0.2em] text-sm uppercase">Your Mental Wellness Journey</h2>
                    <h1 className="text-5xl md:text-8xl font-serif font-normal text-white tracking-tight leading-[0.9]">
                        Mental Wellness <br />
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-primary-400">Academy</span>
                    </h1>
                </div>

                <p className="md:text-2xl text-lg font-light text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-10">
                    Build lasting resilience with <span className="text-white font-medium">evidence-based wellness education</span>, AI-powered coaching, and courses grounded in CBT, mindfulness, and behavioral science.
                </p>

                {/* Timeline Progress */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <CircleCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-medium text-emerald-300">3 COURSES AVAILABLE</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
                        <Zap className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-medium text-sky-300">MORE COURSES COMING SOON</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <Star className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-medium text-indigo-300">AI WELLNESS COACH</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                    <Link href="/signup" className="w-full sm:w-auto">
                        <button className="w-full h-16 px-10 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-white/10">
                            Start Your Journey
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <Link href="#curriculum" className="w-full sm:w-auto h-16 px-10 rounded-full border border-white/10 text-white text-lg font-medium hover:bg-white/5 transition-all flex items-center justify-center">
                        Explore Courses
                    </Link>
                </div>
            </div>
        </section>
    )
}
