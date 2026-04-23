import Link from 'next/link'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute w-full z-30">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-violet-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-gray-800">Wellness Academy</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/for-practices"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                For Clinics
              </Link>
              <Link
                href="/for-employers"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                For Employers
              </Link>
              <Link
                href="/courses"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                Courses
              </Link>
              <Link
                href="/request-demo"
                className="text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-lg px-5 py-2.5 transition shadow-sm"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-violet-500 rounded flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Wellness Academy</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400">Crisis support:</span>
              <a
                href="tel:988"
                className="inline-flex items-center gap-1.5 text-red-600 font-medium hover:text-red-700 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                988 Lifeline
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
