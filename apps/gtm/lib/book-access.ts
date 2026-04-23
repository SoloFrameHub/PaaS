import { getServerSession, getSubscriptionStatus } from './auth';
import { getDb } from './db';
import { bookPurchase } from './db/schema';
import { eq, and } from 'drizzle-orm';

export interface BookAccessResult {
  hasAccess: boolean;
  reason: 'free' | 'subscriber' | 'purchased' | 'none';
  userId: string | null;
}

/**
 * Check whether the current user can access paid book content.
 * Returns immediately for free chapters. For paid chapters, checks:
 * 1. Active academy subscription
 * 2. Standalone book purchase
 */
export async function checkBookAccess(
  chapterIsFree?: boolean
): Promise<BookAccessResult> {
  if (chapterIsFree) {
    return { hasAccess: true, reason: 'free', userId: null };
  }

  const session = await getServerSession();
  if (!session?.uid) {
    return { hasAccess: false, reason: 'none', userId: null };
  }

  // Check active subscription (includes book access)
  const subStatus = await getSubscriptionStatus(session.uid);
  if (subStatus === 'active') {
    return { hasAccess: true, reason: 'subscriber', userId: session.uid };
  }

  // Check standalone book purchase
  const db = getDb();
  if (db) {
    const purchases = await db
      .select()
      .from(bookPurchase)
      .where(
        and(
          eq(bookPurchase.userId, session.uid),
          eq(bookPurchase.status, 'active')
        )
      )
      .limit(1);

    if (purchases.length > 0) {
      return { hasAccess: true, reason: 'purchased', userId: session.uid };
    }
  }

  return { hasAccess: false, reason: 'none', userId: session.uid };
}
