import Link from 'next/link';
import { FORM_DEFINITIONS } from '@/lib/forms/definitions';
import { getLocale } from 'next-intl/server';

export const metadata = {
  title: 'Thank You | SoloFrameHub',
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>;
}) {
  const { form: formSlug } = await searchParams;
  const locale = await getLocale();
  const isEs = locale === 'es';
  const formDef = formSlug ? FORM_DEFINITIONS[formSlug] : null;
  const message = formDef?.settings.successMessage || (isEs ? '¡Tu respuesta ha sido recibida!' : 'Your submission has been received!');

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{isEs ? '¡Gracias!' : 'Thank You!'}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{message}</p>
        <Link
          href="/"
          className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
        >
          {isEs ? 'Volver al inicio' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
