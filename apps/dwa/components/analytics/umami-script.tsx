'use client';

import Script from 'next/script';

/**
 * Umami Analytics Script Component
 *
 * Add this to app/layout.tsx to enable page view tracking.
 * Set NEXT_PUBLIC_UMAMI_WEBSITE_ID in environment variables.
 *
 * To get the website ID:
 * 1. Go to https://analytics.soloframehub.com
 * 2. Create a new website for the academy
 * 3. Copy the website ID and set it in Coolify env vars
 */
export default function UmamiScript() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL || 'https://analytics.soloframehub.com';

  // Don't render script if no website ID is configured
  if (!websiteId) {
    return null;
  }

  return (
    <Script
      src={`${umamiUrl}/script.js`}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  );
}
