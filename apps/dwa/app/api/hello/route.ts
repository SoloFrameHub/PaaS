import { NextRequest } from 'next/server';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';

export const GET = withAuth(async (request: NextRequest) => {
  return successResponse({ message: 'Hello, Wellness Academy!' });
});
