import Link from 'next/link';
import { BookOpen, Database, Layout, Server, Shield, Users } from 'lucide-react';

export default function DocsPage() {
  const sections = [
    {
      title: 'Architecture',
      description: 'System architecture, stack, data flow, and deployment',
      icon: Layout,
      href: '/docs/architecture',
      items: ['Overview', 'Routes', 'Security', 'Deployment'],
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation with request/response examples',
      icon: Server,
      href: '/docs/api',
      items: ['Endpoints', 'Database Schema', 'Authentication', 'Error Handling'],
    },
    {
      title: 'Platform Capabilities',
      description: 'Clinical features, AI/ML, provider tools, and community',
      icon: BookOpen,
      href: '/docs/platform',
      items: ['Clinical Features', 'AI & ML', 'Provider Tools', 'Safety & Crisis'],
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          Platform Documentation
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Complete technical documentation for the Digital Wellness Academy platform
        </p>
      </div>

      {/* Documentation sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {section.description}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-500 dark:text-gray-500 flex items-center"
                  >
                    <span className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </Link>
          );
        })}
      </div>

      {/* Quick stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">72</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Application Routes</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">53</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">API Endpoints</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">18</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Database Tables</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">30+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Courses</div>
        </div>
      </div>
    </div>
  );
}
