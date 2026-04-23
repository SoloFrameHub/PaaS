import Link from "next/link";
import DocsSearch from "./docs-search";
import DocsThemeToggle from "./docs-theme-toggle";

export default function DocsHeader() {
  return (
    <header className="fixed w-full z-30">
      <div
        className="absolute inset-0 bg-white/70 border-b border-slate-200 backdrop-blur-sm -z-10 dark:bg-slate-900 dark:border-slate-800"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="grow">
            <div className="flex items-center">
              <Link
                className="inline-flex items-center"
                href="/docs"
                aria-label="Solo GTM OS Docs"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      x1="28.538%"
                      y1="20.229%"
                      x2="100%"
                      y2="108.156%"
                      id="logo-a"
                    >
                      <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                      <stop stopColor="#6366F1" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="88.638%"
                      y1="29.267%"
                      x2="22.42%"
                      y2="100%"
                      id="logo-b"
                    >
                      <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                      <stop stopColor="#38BDF8" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#6366F1" width="32" height="32" rx="16" />
                  <path
                    d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                    fill="url(#logo-a)"
                  />
                  <path
                    d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                    fill="url(#logo-b)"
                  />
                </svg>
                <span className="ml-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Solo GTM OS
                </span>
              </Link>
              <DocsSearch />
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="flex">
            <ul className="flex grow justify-end flex-wrap items-center">
              <li className="ml-4">
                <Link
                  className="btn-sm inline-flex items-center text-slate-100 bg-blue-600 hover:bg-blue-700 shadow-xs rounded-full text-sm px-3 py-2"
                  href="/"
                >
                  Back to App
                </Link>
              </li>
              <li>
                <DocsThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
