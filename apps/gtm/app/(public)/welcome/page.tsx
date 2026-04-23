'use client'

import Image from 'next/image'

export default function WelcomePage() {
  const setLocaleAndNavigate = (locale: string, path: string) => {
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`
    window.location.href = path
  }

  return (
    <main className="min-h-[100dvh] bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center h-20 px-6">
        <Image
          src="/images/soloframehub-logo-main.png"
          alt="SoloFrameHub"
          width={200}
          height={52}
          className="h-10 w-auto brightness-0 invert"
        />
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-500/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-violet-500/6 rounded-full blur-[120px] pointer-events-none" />

        {/* Icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
          </div>
          <div className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-sky-400/60 animate-pulse" />
          <div className="absolute -bottom-2 -left-4 w-3 h-3 rounded-full bg-violet-400/50 animate-pulse [animation-delay:1s]" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">Solo GTM OS</h1>

        {/* Bilingual description */}
        <p className="text-gray-400 text-center max-w-md mb-2 text-base leading-relaxed">
          AI-powered frameworks, coaching, and simulations to help solo founders master customer acquisition.
        </p>
        <p className="text-gray-500 text-center max-w-md mb-10 text-sm leading-relaxed">
          Frameworks, coaching y simulaciones con IA para que fundadores independientes dominen la adquisicion de clientes.
        </p>

        {/* Stats */}
        <div className="flex gap-8 mb-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-gray-500 mt-1">Courses / Cursos</div>
          </div>
          <div className="w-px bg-gray-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">100+</div>
            <div className="text-xs text-gray-500 mt-1">Lessons / Lecciones</div>
          </div>
          <div className="w-px bg-gray-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">AI</div>
            <div className="text-xs text-gray-500 mt-1">Coaching</div>
          </div>
        </div>

        {/* Language selection cards */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
          {/* English */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm p-6 flex flex-col items-center text-center">
            <div className="text-3xl mb-3">🇺🇸</div>
            <h2 className="text-lg font-semibold mb-1">English</h2>
            <p className="text-gray-400 text-sm mb-5">Continue in English</p>
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => setLocaleAndNavigate('en', '/signup')}
                className="btn w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Sign Up Free
              </button>
              <button
                onClick={() => setLocaleAndNavigate('en', '/signin')}
                className="btn w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-lg transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Latin American Edition */}
          <div className="rounded-2xl border border-sky-800/50 bg-gray-900/60 backdrop-blur-sm p-6 flex flex-col items-center text-center">
            <div className="text-3xl mb-3">🌎</div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold">Latinoamérica</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded px-1.5 py-0.5">Edición Regional</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Ejemplos, objeciones y contexto</p>
            <p className="text-gray-400 text-sm mb-5">diseñados para fundadores LatAm</p>
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => setLocaleAndNavigate('es', '/signup')}
                className="btn w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Crear Cuenta Gratis
              </button>
              <button
                onClick={() => setLocaleAndNavigate('es', '/signin')}
                className="btn w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-lg transition-colors"
              >
                Iniciar Sesion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-600">
        &copy; {new Date().getFullYear()} SoloFrameHub. All rights reserved.
      </footer>
    </main>
  )
}
