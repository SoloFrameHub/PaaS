import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/theme-toggle';

export const metadata = {
  title: "The Solo Founder's Customer Acquisition Playbook | SoloFrameHub",
  description:
    'A practical, research-backed guide to customer acquisition for bootstrapped solo founders. Read free preview chapters online.',
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Minimal book header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700/60">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Book title */}
            <div className="flex items-center gap-4">
              <Link href="/" className="shrink-0">
                <Image
                  src="/images/soloframehub-logo-main.png"
                  alt="SoloFrameHub"
                  width={140}
                  height={38}
                  className="h-8 w-auto"
                />
              </Link>
              <span className="hidden sm:block text-gray-300 dark:text-gray-600">|</span>
              <Link
                href="/book"
                className="hidden sm:block text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
              >
                The Book
              </Link>
            </div>

            {/* Right: Theme toggle + auth links */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/signin"
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/subscribe"
                className="text-sm font-semibold bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Get Full Access
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
