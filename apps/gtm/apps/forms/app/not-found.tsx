import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">404</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Form not found.</p>
        <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          View all forms
        </Link>
      </div>
    </div>
  );
}
