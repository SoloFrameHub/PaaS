import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse, validateBody } from '@/lib/api/response-utils';
import { ValidationError } from '@/lib/api/errors';
import { getDb, schema } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const VALID_TYPES = ['checklist', 'assessment', 'coach', 'workshop', 'persona'] as const;

const putSchema = z.object({
  componentType: z.enum(VALID_TYPES),
  persistKey: z.string().min(1).max(200),
  state: z.record(z.unknown()),
});

export const GET = withAuth(async (request: NextRequest, { userId }) => {
  const { searchParams } = new URL(request.url);
  const componentType = searchParams.get('type');
  const persistKey = searchParams.get('key');

  if (!componentType || !persistKey) {
    throw new ValidationError('Missing type or key query params');
  }

  const db = getDb();
  if (!db) return successResponse({ data: null });

  const [row] = await db.select()
    .from(schema.userComponentState)
    .where(and(
      eq(schema.userComponentState.userId, userId),
      eq(schema.userComponentState.componentType, componentType),
      eq(schema.userComponentState.persistKey, persistKey),
    ))
    .limit(1);

  return successResponse({
    data: row ? { state: row.state, updatedAt: row.updatedAt.toISOString() } : null,
  });
});

export const PUT = withAuth(async (request: NextRequest, { userId }) => {
  const body = await validateBody(request, putSchema);

  const db = getDb();
  if (!db) return successResponse({ success: true });

  const now = new Date();

  await db.insert(schema.userComponentState).values({
    id: randomUUID(),
    userId,
    componentType: body.componentType,
    persistKey: body.persistKey,
    state: body.state as Record<string, unknown>,
    createdAt: now,
    updatedAt: now,
  }).onConflictDoUpdate({
    target: [schema.userComponentState.userId, schema.userComponentState.componentType, schema.userComponentState.persistKey],
    set: {
      state: body.state as Record<string, unknown>,
      updatedAt: now,
    },
  });

  return successResponse({ success: true });
});
