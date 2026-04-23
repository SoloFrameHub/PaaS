export default function AuthImage() {
  return (
    <div
      className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2 bg-gray-950 overflow-hidden"
      aria-hidden="true"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

      {/* Accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-violet-500/8 rounded-full blur-[100px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-12 text-center">
        {/* Icon cluster */}
        <div className="relative mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
              />
            </svg>
          </div>
          {/* Floating accent dots */}
          <div className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-sky-400/60 animate-pulse" />
          <div className="absolute -bottom-2 -left-4 w-3 h-3 rounded-full bg-violet-400/50 animate-pulse [animation-delay:1s]" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">Solo GTM OS</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          AI-powered frameworks, coaching, and simulations to help solo founders
          master customer acquisition.
        </p>

        {/* Stats row */}
        <div className="mt-10 flex gap-8">
          <div>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-gray-500 mt-1">Courses</div>
          </div>
          <div className="w-px bg-gray-800" />
          <div>
            <div className="text-2xl font-bold text-white">100+</div>
            <div className="text-xs text-gray-500 mt-1">Lessons</div>
          </div>
          <div className="w-px bg-gray-800" />
          <div>
            <div className="text-2xl font-bold text-white">AI</div>
            <div className="text-xs text-gray-500 mt-1">Coaching</div>
          </div>
        </div>
      </div>
    </div>
  );
}
