'use client';

import { useState } from 'react';

const BOOK_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_BOOK_PRODUCT_ID ?? '';

export default function BuyBookButton({
  email,
  userId,
  className,
}: {
  email?: string;
  userId?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  if (!BOOK_PRODUCT_ID) return null;

  function handleBuy() {
    setLoading(true);
    const url = new URL('/api/checkout', window.location.origin);
    url.searchParams.set('products', BOOK_PRODUCT_ID);
    if (email) url.searchParams.set('customerEmail', email);
    if (userId) url.searchParams.set('customerExternalId', userId);
    window.location.href = url.toString();
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className={
        className ??
        'inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:border-primary-500 hover:text-primary-500 transition-colors disabled:opacity-50'
      }
    >
      {loading ? 'Redirecting...' : 'Buy the Book — $29'}
    </button>
  );
}
