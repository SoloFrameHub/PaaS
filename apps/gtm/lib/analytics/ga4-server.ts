/**
 * Server-Side GA4 Event Tracking via Measurement Protocol
 *
 * Used for events that originate on the server (e.g., Polar purchase webhooks).
 * Requires GA4_API_SECRET env var from GA4 Admin > Data Streams > MP API secrets.
 */

import { logger } from '@/lib/logger';

const GA4_MEASUREMENT_ID = process.env.GA4_MEASUREMENT_ID || 'G-SFYRWNQKZG';
const GA4_API_SECRET = process.env.GA4_API_SECRET;
const GA4_MP_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

interface MeasurementProtocolEvent {
  name: string;
  params?: Record<string, string | number | boolean>;
}

/**
 * Send one or more events to GA4 via the Measurement Protocol.
 * @param clientId - A stable identifier for the client (use userId as fallback)
 * @param userId - Optional GA4 user_id for cross-device tracking
 * @param events - Array of events to send
 */
export async function sendServerEvent(
  clientId: string,
  userId: string | undefined,
  events: MeasurementProtocolEvent[]
): Promise<void> {
  if (!GA4_API_SECRET) {
    logger.warn('[ga4-server] GA4_API_SECRET not set, skipping server event');
    return;
  }

  const url = `${GA4_MP_ENDPOINT}?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

  const payload = {
    client_id: clientId,
    ...(userId && { user_id: userId }),
    events,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      logger.error('[ga4-server] Measurement Protocol request failed', { status: res.status });
    }
  } catch (err) {
    logger.error('[ga4-server] Measurement Protocol request error', { error: err });
  }
}

/**
 * Track a purchase event from a Polar webhook
 */
export async function trackPurchase(opts: {
  userId: string;
  orderId: string;
  productId: string;
  value: number;
  currency?: string;
}): Promise<void> {
  await sendServerEvent(opts.userId, opts.userId, [
    {
      name: 'purchase',
      params: {
        transaction_id: opts.orderId,
        value: opts.value,
        currency: opts.currency || 'USD',
        content_type: 'subscription',
        product_id: opts.productId,
      },
    },
  ]);
}
