import Link from 'next/link';
import { FORM_DEFINITIONS } from '@/lib/forms/definitions';

export default function HomePage() {
  const forms = Object.values(FORM_DEFINITIONS);
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">SoloFrameHub Forms</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Select a form below.</p>
        <div className="space-y-3">
          {forms.map((form) => (
            <Link
              key={form.slug}
              href={`/forms/${form.slug}`}
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <h2 className="font-medium text-gray-800 dark:text-gray-100">{form.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{form.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
