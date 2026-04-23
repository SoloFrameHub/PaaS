import { IMasterDataRepository } from './masterDataRepository';
import { FileMasterDataRepository } from './fileMasterDataRepository';
import { MockMasterDataRepository } from './mockMasterDataRepository';

export const masterDataRepository: IMasterDataRepository =
    process.env.NEXT_PUBLIC_MOCK_AUTH === 'true'
        ? new MockMasterDataRepository()
        : new FileMasterDataRepository();
