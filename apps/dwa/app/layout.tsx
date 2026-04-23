import './css/style.css'

import { Inter } from 'next/font/google'
import Theme from './theme-provider'
import AppProvider from './app-provider'
import ErrorBoundary from '@/components/error-boundary'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Wellness Academy | Mental Health Education Platform',
  description: 'Evidence-based mental wellness education. Learn coping techniques, understand your symptoms, and build lasting mental health habits with AI-guided support.',
  keywords: 'mental health education, anxiety management, wellness coaching, CBT techniques, stress relief, mindfulness, mental wellness, self-help',
  openGraph: {
    type: 'website',
    url: 'https://mental-health-education.soloframehub.com/',
    title: 'Wellness Academy | Mental Health Education',
    description: 'Evidence-based mental wellness education with AI-guided support. Learn practical coping techniques and build lasting mental health habits.',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wellness Academy | Mental Health Education',
    description: 'Evidence-based mental wellness education with AI-guided support. Learn practical coping techniques and build lasting mental health habits.',
    images: [],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

import PWARegistration from '@/components/pwa-registration'
import QueryProvider from '@/components/query-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>{/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <body className="font-inter antialiased bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400" suppressHydrationWarning>
        <PWARegistration />
        <ErrorBoundary>
          <QueryProvider>
            <Theme>
              <AppProvider>
                {children}
              </AppProvider>
            </Theme>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
