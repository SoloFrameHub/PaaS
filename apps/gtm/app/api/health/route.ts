import { NextResponse } from 'next/server';

/**
 * Health check for Dokploy / load balancers.
 * GET /api/health → 200 when the app is up.
 */
export async function GET() {
  return NextResponse.json(
    { status: 'ok', service: 'soloframehub-academy' },
    { status: 200 }
  );
}
