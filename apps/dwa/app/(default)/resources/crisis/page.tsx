import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crisis Resources - Mental Health Education',
  description: 'If you or someone you know is in crisis, help is available 24/7. Find immediate support resources here.',
}

const CRISIS_LINES = [
  {
    name: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential 24/7 support for people in distress. Call or text.',
    contact: '988',
    href: 'tel:988',
    type: 'Call or Text',
  },
  {
    name: 'Crisis Text Line',
    description: 'Free, 24/7 crisis support via text message. Text HOME to connect with a trained counselor.',
    contact: '741741',
    href: 'sms:741741&body=HOME',
    type: 'Text',
  },
  {
    name: 'National Domestic Violence Hotline',
    description: 'Confidential support for anyone affected by domestic violence.',
    contact: '1-800-799-7233',
    href: 'tel:18007997233',
    type: 'Call',
  },
  {
    name: 'SAMHSA National Helpline',
    description: 'Free referral and information service for substance abuse and mental health disorders.',
    contact: '1-800-662-4357',
    href: 'tel:18006624357',
    type: 'Call',
  },
  {
    name: 'Trevor Project (LGBTQ+ Youth)',
    description: 'Crisis intervention and suicide prevention for LGBTQ+ young people.',
    contact: '1-866-488-7386',
    href: 'tel:18664887386',
    type: 'Call',
  },
  {
    name: 'Veterans Crisis Line',
    description: 'Connects veterans and their loved ones with qualified responders.',
    contact: '988 (press 1)',
    href: 'tel:988',
    type: 'Call',
  },
]

const ONLINE_RESOURCES = [
  {
    name: 'IMAlive Online Crisis Chat',
    url: 'https://www.imalive.org',
    description: 'Free online crisis chat with trained volunteers.',
  },
  {
    name: '7 Cups',
    url: 'https://www.7cups.com',
    description: 'Free emotional support from trained listeners.',
  },
  {
    name: 'NAMI (National Alliance on Mental Illness)',
    url: 'https://www.nami.org/help',
    description: 'Education, support groups, and resources for individuals and families.',
  },
]

export default function CrisisResourcesPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      {/* Urgent banner */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <svg className="shrink-0 fill-current text-red-500 mt-0.5 mr-3" width="20" height="20" viewBox="0 0 16 16">
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm0 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V4a1 1 0 1 1 2 0v4Z" />
          </svg>
          <div>
            <h1 className="text-xl font-bold text-red-800 dark:text-red-300 mb-1">
              If you are in immediate danger, call 911
            </h1>
            <p className="text-red-700 dark:text-red-400">
              You are not alone. Help is available 24 hours a day, 7 days a week.
            </p>
          </div>
        </div>
      </div>

      {/* Crisis hotlines */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Crisis Hotlines
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {CRISIS_LINES.map((line) => (
            <a
              key={line.name}
              href={line.href}
              className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 hover:border-red-300 dark:hover:border-red-700 transition duration-150 ease-in-out group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition">
                  {line.name}
                </h3>
                <span className="text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                  {line.type}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {line.description}
              </p>
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {line.contact}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Online resources */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Online Support
        </h2>
        <div className="space-y-3">
          {ONLINE_RESOURCES.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-xl p-5 hover:border-primary-300 dark:hover:border-primary-700 transition duration-150 ease-in-out group"
            >
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary-500 transition">
                  {resource.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {resource.description}
                </p>
              </div>
              <svg className="shrink-0 fill-current text-gray-400 ml-3" width="16" height="16" viewBox="0 0 16 16">
                <path d="M14 2H9a1 1 0 0 0 0 2h2.586L7.293 8.293a1 1 0 1 0 1.414 1.414L13 5.414V8a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1ZM12 16H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h3a1 1 0 0 0 0 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3a1 1 0 0 0 2 0v3a3 3 0 0 1-3 3Z" />
              </svg>
            </a>
          ))}
        </div>
      </section>

      {/* Self-care reminder */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/10 dark:to-blue-900/10 border border-primary-200 dark:border-primary-800/30 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
          Remember
        </h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-primary-500 mr-2 mt-0.5">&#10003;</span>
            It is okay to ask for help. Reaching out is a sign of strength.
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2 mt-0.5">&#10003;</span>
            Crisis counselors are trained professionals who are there for you without judgment.
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2 mt-0.5">&#10003;</span>
            If someone you know is in crisis, stay with them and help them connect with support.
          </li>
        </ul>
      </section>
    </div>
  )
}
