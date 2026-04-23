'use client'

import Link from 'next/link'
import Logo from '@/components/ui/logo'
import { useLocale } from 'next-intl'

export default function OnboardingHeader() {
  const locale = useLocale()
  const isEs = locale === 'es'

  return (
    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      <Logo />
      <div className="text-sm">
        <Link className="font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" href="/dashboard">
          {isEs ? 'Ir al Panel' : 'Skip to Dashboard'}
        </Link>
      </div>
    </div>
  )
}
