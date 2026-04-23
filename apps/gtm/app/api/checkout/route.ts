import { Checkout } from '@polar-sh/nextjs';
import type { NextRequest } from 'next/server';

// Lazy handler init. Building the Polar Checkout handler at module load
// would crash `next build`'s "collecting page data" phase on any environment
// that hasn't set the env vars (e.g., the Dockerfile builder stage).
// Throwing at first request instead gives a readable 500 to ops without
// breaking CI/CD builds.
let handler: ReturnType<typeof Checkout> | undefined;

function getHandler() {
  if (handler) return handler;
  const accessToken = process.env.POLAR_ACCESS_TOKEN;
  const successUrl = process.env.POLAR_SUCCESS_URL;
  if (!accessToken || !successUrl) {
    throw new Error(
      '/api/checkout is misconfigured: POLAR_ACCESS_TOKEN and POLAR_SUCCESS_URL are required.',
    );
  }
  handler = Checkout({
    accessToken,
    successUrl,
    server:
      (process.env.POLAR_MODE as 'sandbox' | 'production') || 'sandbox',
  });
  return handler;
}

export async function GET(request: NextRequest) {
  return getHandler()(request);
}
