import Link from "next/link";

export default function DocsFooter() {
  return (
    <footer className="border-t border-slate-200 pt-8 dark:border-slate-800">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <div className="shrink-0 flex flex-col md:flex-row items-center">
            <Link href="/docs" className="inline-flex items-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#6366F1" width="32" height="32" rx="16" />
              </svg>
              <span className="ml-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                Solo GTM OS
              </span>
            </Link>
            <div className="text-sm text-slate-500 ml-4">
              Copyright &copy; SoloFrameHub {new Date().getFullYear()}
              <span className="md:hidden lg:inline">
                . All rights reserved.
              </span>
            </div>
          </div>
        </div>
        <ul className="inline-flex space-x-2">
          <li>
            <a
              className="flex justify-center items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
              href="https://x.com/soloframehub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-8 h-8 fill-current"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="flex justify-center items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
              href="https://www.linkedin.com/company/soloframehub"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                className="w-8 h-8 fill-current"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
