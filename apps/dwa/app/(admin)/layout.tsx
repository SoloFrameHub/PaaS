import { getServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session?.uid) redirect('/signin');
  if (session.role !== 'admin') redirect('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
          Admin Console
          <span className="ml-2 text-xs font-normal text-gray-400">Wellness Academy</span>
        </span>
        <a href="/dashboard" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          Exit admin →
        </a>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
