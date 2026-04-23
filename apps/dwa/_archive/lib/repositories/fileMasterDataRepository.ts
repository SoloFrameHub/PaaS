/**
 * Master data from seed-data JSON files. No Firestore/Google.
 */

import fs from 'fs';
import path from 'path';
import { Industry, ClientRole, FounderCategory, DiscPattern } from '@/types/roleplay';
import { IMasterDataRepository } from './masterDataRepository';

const SEED_DATA = path.join(process.cwd(), 'seed-data');

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function readJsonSafe<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    return readJson<T>(filePath);
  } catch {
    return null;
  }
}

export class FileMasterDataRepository implements IMasterDataRepository {
  private industries: Industry[] | null = null;
  private clientRoles: ClientRole[] | null = null;
  private founderCategories: FounderCategory[] | null = null;
  private discPatterns: DiscPattern[] | null = null;

  async getIndustries(): Promise<Industry[]> {
    if (this.industries) return this.industries;
    const dir = path.join(SEED_DATA, 'industries');
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
    this.industries = files.map((f) => readJson<Industry>(path.join(dir, f)));
    return this.industries;
  }

  async getIndustryById(id: string): Promise<Industry | null> {
    const list = await this.getIndustries();
    return list.find((i) => (i as { industry_id?: string }).industry_id === id) || null;
  }

  async getClientRolesByIndustry(industryId: string): Promise<ClientRole[]> {
    const list = await this.getClientRoles();
    return list.filter((r) => {
      const industries = (r as { applicable_industries?: string[] }).applicable_industries;
      return Array.isArray(industries) && industries.includes(industryId);
    });
  }

  private async getClientRoles(): Promise<ClientRole[]> {
    if (this.clientRoles) return this.clientRoles;
    const data = readJsonSafe<ClientRole[]>(path.join(SEED_DATA, 'clientRoles.json'));
    this.clientRoles = Array.isArray(data) ? data : [];
    return this.clientRoles;
  }

  async getClientRoleById(id: string): Promise<ClientRole | null> {
    const list = await this.getClientRoles();
    return list.find((r) => (r as { role_id?: string }).role_id === id) || null;
  }

  async getFounderCategoryById(id: string): Promise<FounderCategory | null> {
    if (!this.founderCategories) {
      const data = readJsonSafe<FounderCategory[]>(path.join(SEED_DATA, 'founderCategories.json'));
      this.founderCategories = Array.isArray(data) ? data : [];
    }
    return (
      this.founderCategories.find((c) => (c as { category_id?: string }).category_id === id) || null
    );
  }

  async getDiscPatternById(id: string): Promise<DiscPattern | null> {
    if (!this.discPatterns) {
      const data = readJsonSafe<DiscPattern[]>(path.join(SEED_DATA, 'discPatterns.json'));
      this.discPatterns = Array.isArray(data) ? data : [];
    }
    return (
      this.discPatterns.find((d) => (d as { disc_type?: string }).disc_type === id) || null
    );
  }
}
