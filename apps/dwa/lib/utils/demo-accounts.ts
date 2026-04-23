/**
 * Demo account utilities
 * Handles creation of temporary demo/trial accounts for prospect evaluation
 */

import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { getDb, schema } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { logger } from '@/lib/logger';

/**
 * Generates a secure random password for demo accounts
 * Format: 3 words + 3 digits (e.g., "forest-mountain-river-742")
 */
export function generateDemoPassword(): string {
  const words = [
    'forest', 'mountain', 'river', 'ocean', 'desert', 'valley', 'meadow', 'garden',
    'sunset', 'sunrise', 'starlight', 'moonlight', 'thunder', 'breeze', 'shadow',
    'crystal', 'silver', 'golden', 'amber', 'azure', 'crimson', 'emerald',
  ];

  const word1 = words[Math.floor(Math.random() * words.length)];
  const word2 = words[Math.floor(Math.random() * words.length)];
  const word3 = words[Math.floor(Math.random() * words.length)];
  const digits = Math.floor(100 + Math.random() * 900); // 100-999

  return `${word1}-${word2}-${word3}-${digits}`;
}

export interface CreateDemoUserInput {
  email: string;
  fullName: string;
  organization: string;
  role: string;
  organizationType: 'practice' | 'employer' | 'platform' | 'university' | 'other';
  phone?: string;
  message?: string;
  demoExpiryDays?: number; // defaults to 14
}

export interface CreateDemoUserResult {
  success: boolean;
  userId?: string;
  email?: string;
  password?: string;
  expiresAt?: string;
  error?: string;
}

/**
 * Creates a demo user account with auto-generated password
 * Returns credentials for email delivery
 */
export async function createDemoUser(input: CreateDemoUserInput): Promise<CreateDemoUserResult> {
  const db = getDb();
  if (!db) {
    return { success: false, error: 'Database not available' };
  }

  try {
    // Check if email already exists
    const existing = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.email, input.email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      return {
        success: false,
        error: 'An account with this email already exists. Please check your inbox or contact support.'
      };
    }

    // Generate credentials
    const password = generateDemoPassword();
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const userId = generateIdFromEntropySize(10);

    // Calculate expiry date
    const demoExpiryDays = input.demoExpiryDays || 14;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + demoExpiryDays);

    // Create user account
    await db.insert(schema.user).values({
      id: userId,
      email: input.email.toLowerCase(),
      hashedPassword: passwordHash,
      role: 'user', // demo users are regular users (can add 'demo' role later if needed)
    });

    // Create profile with demo metadata
    await db.insert(schema.profile).values({
      userId,
      data: {
        fullName: input.fullName,
        organization: input.organization,
        userRole: input.role,
        organizationType: input.organizationType,
        phone: input.phone,
        message: input.message,
        accountType: 'demo',
        demoExpiresAt: expiresAt.toISOString(),
        demoCreatedAt: new Date().toISOString(),
        requestSource: 'digitalwellness.academy',
      },
    });

    logger.info('Demo user created', {
      userId,
      email: input.email,
      organization: input.organization,
      organizationType: input.organizationType,
      expiresAt: expiresAt.toISOString(),
    });

    return {
      success: true,
      userId,
      email: input.email.toLowerCase(),
      password,
      expiresAt: expiresAt.toISOString(),
    };
  } catch (err) {
    logger.error('Demo user creation failed', {
      email: input.email,
      error: err instanceof Error ? err.message : String(err),
    });
    return {
      success: false,
      error: 'Failed to create demo account. Please try again or contact support.',
    };
  }
}

/**
 * Checks if a user is a demo account and whether it has expired
 */
export async function isDemoAccountExpired(userId: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;

  try {
    const profile = await db
      .select()
      .from(schema.profile)
      .where(eq(schema.profile.userId, userId))
      .limit(1);

    if (profile.length === 0) return false;

    const data = profile[0].data as any;
    if (data.accountType !== 'demo') return false;

    const expiresAt = data.demoExpiresAt;
    if (!expiresAt) return false;

    return new Date(expiresAt) < new Date();
  } catch (err) {
    logger.error('Error checking demo expiry', { userId, error: String(err) });
    return false;
  }
}
