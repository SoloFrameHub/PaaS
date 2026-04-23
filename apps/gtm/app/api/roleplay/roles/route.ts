import { NextRequest } from 'next/server';
import { masterDataRepository } from '@/lib/repositories/masterDataRepositoryFactory';
import { withAuth } from '@/lib/api/with-auth';
import { successResponse } from '@/lib/api/response-utils';
import { ValidationError } from '@/lib/api/errors';

export const GET = withAuth(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const industryId = searchParams.get('industryId');

    if (!industryId) {
        throw new ValidationError('Industry ID required');
    }

    const roles = await masterDataRepository.getClientRolesByIndustry(industryId);

    return successResponse(roles);
});
