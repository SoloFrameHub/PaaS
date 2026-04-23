import fs from 'fs';
import path from 'path';
import { Industry, ClientRole, FounderCategory, DiscPattern } from '@/types/roleplay';
import { IMasterDataRepository } from './masterDataRepository';

export class MockMasterDataRepository implements IMasterDataRepository {
    private seedDir = path.join(process.cwd(), 'seed-data');

    private async readJsonFile<T>(filename: string): Promise<T[]> {
        const filePath = path.join(this.seedDir, filename);
        if (!fs.existsSync(filePath)) return [];
        const content = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    }

    async getIndustries(): Promise<Industry[]> {
        const industriesDir = path.join(this.seedDir, 'industries');
        if (!fs.existsSync(industriesDir)) {
            // Fallback for minimal testing
            return [{ industry_id: 'devtools', display_name: 'DevTools' } as any];
        }
        const files = fs.readdirSync(industriesDir).filter(f => f.endsWith('.json'));
        const industries: Industry[] = [];
        for (const file of files) {
            const content = fs.readFileSync(path.join(industriesDir, file), 'utf-8');
            industries.push(JSON.parse(content));
        }
        return industries;
    }

    async getIndustryById(id: string): Promise<Industry | null> {
        const industries = await this.getIndustries();
        return industries.find(i => i.industry_id === id) || null;
    }

    async getClientRolesByIndustry(industryId: string): Promise<ClientRole[]> {
        const roles = await this.readJsonFile<ClientRole>('clientRoles.json');
        return roles.filter(r => r.applicable_industries.includes(industryId));
    }

    async getClientRoleById(id: string): Promise<ClientRole | null> {
        const roles = await this.readJsonFile<ClientRole>('clientRoles.json');
        return roles.find(r => r.role_id === id) || null;
    }

    async getFounderCategoryById(id: string): Promise<FounderCategory | null> {
        const categories = await this.readJsonFile<FounderCategory>('founderCategories.json');
        return categories.find(c => c.category_id === id) || null;
    }

    async getDiscPatternById(id: string): Promise<DiscPattern | null> {
        const patterns = await this.readJsonFile<DiscPattern>('discPatterns.json');
        return patterns.find(p => p.disc_type === id) || null;
    }
}
