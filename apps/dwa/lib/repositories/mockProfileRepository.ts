import { WellnessProfile } from '@/types/wellness-profile';
import { IProfileRepository } from './profileRepository';
import fs from 'fs';

export class MockProfileRepository implements IProfileRepository {
    private mockProfiles: Record<string, WellnessProfile> = {};
    private mockFilePath = '/tmp/wellness_academy_mock_profiles.json';

    private isLoaded = false;
    private loadPromise: Promise<void> | null = null;

    private async loadMockProfiles() {
        if (this.isLoaded) return;
        if (this.loadPromise) return this.loadPromise;

        this.loadPromise = (async () => {
            for (let i = 0; i < 5; i++) {
                try {
                    if (fs.existsSync(this.mockFilePath)) {
                        const data = await fs.promises.readFile(this.mockFilePath, 'utf-8');
                        if (data.trim()) {
                            this.mockProfiles = JSON.parse(data);
                        }
                    }
                    this.isLoaded = true;
                    return;
                } catch (e) {
                    if (i === 4) console.error('❌ Failed to load mock profiles after 5 attempts:', e);
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
        })();

        return this.loadPromise;
    }

    private async saveMockProfiles() {
        for (let i = 0; i < 5; i++) {
            try {
                const tempPath = this.mockFilePath + '.tmp';
                await fs.promises.writeFile(tempPath, JSON.stringify(this.mockProfiles, null, 2));
                await fs.promises.rename(tempPath, this.mockFilePath);
                return;
            } catch (e) {
                if (i === 4) console.error('❌ Failed to save mock profiles after 5 attempts:', e);
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
    }

    async getById(id: string): Promise<WellnessProfile | null> {
        // Always reload from disk to pick up changes from other processes/requests
        this.isLoaded = false;
        this.loadPromise = null;
        await this.loadMockProfiles();
        return this.mockProfiles[id] || null;
    }

    async save(id: string, profile: Partial<WellnessProfile>): Promise<void> {
        await this.loadMockProfiles();
        this.mockProfiles[id] = { ...this.mockProfiles[id], ...profile } as WellnessProfile;
        await this.saveMockProfiles();
    }

    async update(id: string, updates: Record<string, unknown>): Promise<void> {
        await this.loadMockProfiles();
        const profile = this.mockProfiles[id];
        if (!profile) return;

        // Apply updates (naive dot-notation support)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type MutableRecord = Record<string, any>;

        for (const [key, value] of Object.entries(updates)) {
            let target: MutableRecord = profile as unknown as MutableRecord;
            let finalKey = key;

            if (key.includes('.')) {
                const parts = key.split('.');
                finalKey = parts.pop()!;
                for (const part of parts) {
                    if (!target[part]) target[part] = {};
                    target = target[part];
                }
            }

            // Handle FieldValue operations (from Firebase compatibility)
            if (value && typeof value === 'object' && 'constructor' in value && value.constructor.name === 'FieldValue') {
                const fieldValue = value as MutableRecord;
                const method = fieldValue._methodName || '';
                if (method === 'FieldValue.increment') {
                    const amount = fieldValue._operand || 0;
                    target[finalKey] = (target[finalKey] || 0) + amount;
                } else if (method === 'FieldValue.arrayUnion') {
                    const elements = fieldValue._elements || [];
                    const currentArray = Array.isArray(target[finalKey]) ? target[finalKey] : [];
                    target[finalKey] = Array.from(new Set([...currentArray, ...elements]));
                } else if (method === 'FieldValue.arrayRemove') {
                    const elements = fieldValue._elements || [];
                    const currentArray = Array.isArray(target[finalKey]) ? target[finalKey] : [];
                    target[finalKey] = currentArray.filter((e: unknown) => !elements.includes(e));
                } else {
                    target[finalKey] = value;
                }
            } else {
                target[finalKey] = value;
            }
        }
        this.mockProfiles[id] = { ...profile, updatedAt: new Date().toISOString() };
        await this.saveMockProfiles();
    }

    async getByEmail(email: string): Promise<WellnessProfile | null> {
        await this.loadMockProfiles();
        return Object.values(this.mockProfiles).find(p => p.email === email) || null;
    }

    async delete(id: string): Promise<void> {
        await this.loadMockProfiles();
        delete this.mockProfiles[id];
        await this.saveMockProfiles();
    }
}
