import Link from 'next/link';
import { FORM_DEFINITIONS } from '@/lib/forms/definitions';

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ form?: string }> }) {
  const { form } = await searchParams;
  const formDef = form ? FORM_DEFINITIONS[form] : null;
  const message = formDef?.settings.successMessage || 'Your submission has been received!';

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Thank You!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex flex-col gap-3 items-center">
          <Link href="https://soloframehub.com" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Back to SoloFrameHub
          </Link>
          {(form === 'beta-tester' || form === 'caa-waitlist') && (
            <Link
              href="https://ai-solo-gtm-os.soloframehub.com/signin"
              className="text-sm text-gray-500 dark:text-gray-500 hover:underline"
            >
              Already approved? Sign in to the Academy &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
