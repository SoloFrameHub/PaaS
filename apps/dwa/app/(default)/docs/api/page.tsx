import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function APIReferencePage() {
  const endpoints = [
    {
      category: 'Authentication',
      items: [
        { method: 'POST', path: '/api/auth/signin', description: 'Login with email and password' },
        { method: 'POST', path: '/api/auth/signup', description: 'Register new user account' },
        { method: 'POST', path: '/api/auth/signout', description: 'Logout current user' },
        { method: 'GET', path: '/api/auth/session', description: 'Validate current session' },
      ],
    },
    {
      category: 'Onboarding',
      items: [
        { method: 'POST', path: '/api/onboarding/symptoms', description: 'Save symptom selections' },
        { method: 'POST', path: '/api/onboarding/assessment', description: 'Submit GAD-7 + PHQ-9 + crisis screening' },
        { method: 'POST', path: '/api/onboarding/complete', description: 'Complete onboarding, generate recommendations' },
      ],
    },
    {
      category: 'Academy',
      items: [
        { method: 'POST', path: '/api/academy/complete-lesson', description: 'Mark lesson as completed' },
        { method: 'POST', path: '/api/academy/quiz/[...params]', description: 'Submit quiz answers' },
        { method: 'POST', path: '/api/academy/assessment/[...params]', description: 'Submit assessment responses' },
        { method: 'POST', path: '/api/academy/thought-record/[...params]', description: 'Save CBT thought record' },
        { method: 'POST', path: '/api/academy/feedback', description: 'Submit lesson feedback' },
      ],
    },
    {
      category: 'AI Features',
      items: [
        { method: 'POST', path: '/api/ai/chat', description: 'AI wellness coach conversation (streaming)' },
        { method: 'POST', path: '/api/ai/voice/tts', description: 'Text-to-speech synthesis' },
        { method: 'POST', path: '/api/ai/voice/stt', description: 'Speech-to-text transcription' },
      ],
    },
    {
      category: 'Safety',
      items: [
        { method: 'POST', path: '/api/safety/classify', description: 'Distress/crisis classification' },
      ],
    },
    {
      category: 'Provider Portal',
      items: [
        { method: 'GET', path: '/api/provider/patients', description: 'Get provider\'s patient roster' },
        { method: 'GET', path: '/api/provider/patients/[id]', description: 'Get patient details and progress' },
        { method: 'POST', path: '/api/provider/patients/[id]/assign', description: 'Assign course or lesson to patient' },
        { method: 'GET', path: '/api/provider/alerts', description: 'Get unresolved distress alerts' },
        { method: 'POST', path: '/api/provider/alerts/[id]/resolve', description: 'Mark alert as resolved' },
        { method: 'POST', path: '/api/provider/session-prep/[id]', description: 'Generate AI session preparation notes' },
        { method: 'GET', path: '/api/provider/rag', description: 'RAG search clinical resources' },
      ],
    },
    {
      category: 'Forum',
      items: [
        { method: 'GET', path: '/api/forum/discussions', description: 'List forum discussions' },
        { method: 'POST', path: '/api/forum/discussions', description: 'Create new discussion' },
        { method: 'POST', path: '/api/forum/posts', description: 'Post reply to discussion' },
      ],
    },
    {
      category: 'Health',
      items: [
        { method: 'GET', path: '/api/health', description: 'Service health check (DB, Redis, AI)' },
      ],
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <Link
        href="/docs"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Documentation
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">API Reference</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Complete reference of all 53 API endpoints
        </p>
      </div>

      <div className="space-y-8">
        {endpoints.map((category) => (
          <div key={category.category} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {category.category}
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {category.items.map((endpoint, idx) => (
                <div key={idx} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded ${
                            endpoint.method === 'GET'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {endpoint.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
        <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
          Authentication Required
        </h3>
        <p className="text-sm text-indigo-800 dark:text-indigo-200">
          All endpoints except <code>/api/auth/*</code> and <code>/api/health</code> require valid Lucia session authentication.
          Include session cookie in requests.
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/docs/api/database"
          className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors block"
        >
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Database Schema</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">View complete database schema with 18 tables</p>
        </Link>
      </div>
    </div>
  );
}
