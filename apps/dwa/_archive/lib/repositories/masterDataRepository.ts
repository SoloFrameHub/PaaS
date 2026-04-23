import { Industry, ClientRole, FounderCategory, DiscPattern } from '@/types/roleplay';

export interface IMasterDataRepository {
    getIndustries(): Promise<Industry[]>;
    getIndustryById(id: string): Promise<Industry | null>;
    getClientRolesByIndustry(industryId: string): Promise<ClientRole[]>;
    getClientRoleById(id: string): Promise<ClientRole | null>;
    getFounderCategoryById(id: string): Promise<FounderCategory | null>;
    getDiscPatternById(id: string): Promise<DiscPattern | null>;
}
