import Link from 'next/link'

export default function Logo() {
  return (
    <Link className="block" href="/">
      <div className="flex items-center gap-2">
        {/* Wellness Icon */}
        <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-violet-500 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <span className="font-bold text-lg text-gray-800 dark:text-gray-100 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 whitespace-nowrap">
          Wellness Academy
        </span>
      </div>
    </Link>
  )
}
