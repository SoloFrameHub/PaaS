import { IMasterDataRepository } from './masterDataRepository';
import { FileMasterDataRepository } from './fileMasterDataRepository';
import { MockMasterDataRepository } from './mockMasterDataRepository';

const getMasterDataRepository = (): IMasterDataRepository => {
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true') {
        // B-028: NEXT_PUBLIC_* is client-visible and baked into the build,
        // so it must never silently switch server-side modes in production.
        // Match auth.ts/security.ts: NODE_ENV alone, never VERCEL_ENV (B-044).
        if (process.env.NODE_ENV === 'production') {
            throw new Error('CRITICAL: Mock auth cannot be enabled in production');
        }
        return new MockMasterDataRepository();
    }
    return new FileMasterDataRepository();
};

export const masterDataRepository: IMasterDataRepository = getMasterDataRepository();
