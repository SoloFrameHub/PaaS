import { FounderProfile } from "@/types/profile";
import { IProfileRepository } from "./profileRepository";
import fs from "fs";
import path from "path";
import os from "os";

export class MockProfileRepository implements IProfileRepository {
  private mockProfiles: Record<string, FounderProfile> = {};
  private mockFilePath = path.join(
    os.tmpdir(),
    "soloframehub_mock_profiles.json",
  );

  private isLoaded = false;
  private loadPromise: Promise<void> | null = null;

  private async loadMockProfiles() {
    if (this.isLoaded) return;
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      for (let i = 0; i < 5; i++) {
        try {
          if (fs.existsSync(this.mockFilePath)) {
            const data = await fs.promises.readFile(this.mockFilePath, "utf-8");
            if (data.trim()) {
              this.mockProfiles = JSON.parse(data);
            }
          }
          this.isLoaded = true;
          return;
        } catch (e) {
          if (i === 4)
            console.error(
              "❌ Failed to load mock profiles after 5 attempts:",
              e,
            );
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      }
    })();

    return this.loadPromise;
  }

  private async saveMockProfiles() {
    for (let i = 0; i < 5; i++) {
      try {
        const tempPath = this.mockFilePath + ".tmp";
        await fs.promises.writeFile(
          tempPath,
          JSON.stringify(this.mockProfiles, null, 2),
        );
        await fs.promises.rename(tempPath, this.mockFilePath);
        return;
      } catch (e) {
        if (i === 4)
          console.error("❌ Failed to save mock profiles after 5 attempts:", e);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
  }

  async getById(id: string): Promise<FounderProfile | null> {
    // Always reload from disk to pick up changes from other processes/requests
    this.isLoaded = false;
    this.loadPromise = null;
    await this.loadMockProfiles();
    return this.mockProfiles[id] || null;
  }

  async save(id: string, profile: Partial<FounderProfile>): Promise<void> {
    await this.loadMockProfiles();
    this.mockProfiles[id] = {
      ...this.mockProfiles[id],
      ...profile,
    } as FounderProfile;
    await this.saveMockProfiles();
  }

  async update(id: string, updates: Record<string, any>): Promise<void> {
    await this.loadMockProfiles();
    const profile = this.mockProfiles[id];
    if (!profile) return;

    // Apply updates (naive dot-notation support)
    for (const [key, value] of Object.entries(updates)) {
      let target = profile as any;
      let finalKey = key;

      if (key.includes(".")) {
        const parts = key.split(".");
        finalKey = parts.pop()!;
        for (const part of parts) {
          if (!target[part]) target[part] = {};
          target = target[part];
        }
      }

      // Handle FieldValue operations
      if (
        value &&
        typeof value === "object" &&
        value.constructor.name === "FieldValue"
      ) {
        const method = (value as any)._methodName || "";
        if (method === "FieldValue.increment") {
          const amount = (value as any)._operand || 0;
          target[finalKey] = (target[finalKey] || 0) + amount;
        } else if (method === "FieldValue.arrayUnion") {
          const elements = (value as any)._elements || [];
          const currentArray = Array.isArray(target[finalKey])
            ? target[finalKey]
            : [];
          target[finalKey] = Array.from(
            new Set([...currentArray, ...elements]),
          );
        } else if (method === "FieldValue.arrayRemove") {
          const elements = (value as any)._elements || [];
          const currentArray = Array.isArray(target[finalKey])
            ? target[finalKey]
            : [];
          target[finalKey] = currentArray.filter(
            (e: any) => !elements.includes(e),
          );
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

  async acquireAnalysisLock(
    id: string,
    _staleLockMinutes = 5,
  ): Promise<boolean> {
    await this.loadMockProfiles();
    const profile = this.mockProfiles[id];
    if (!profile) return false;
    if ((profile as any).analysisStatus === "analyzing") return false;
    (profile as any).analysisStatus = "analyzing";
    (profile as any).updatedAt = new Date().toISOString();
    await this.saveMockProfiles();
    return true;
  }

  async getByEmail(email: string): Promise<FounderProfile | null> {
    await this.loadMockProfiles();
    return (
      Object.values(this.mockProfiles).find((p) => p.email === email) || null
    );
  }

  async getCertifiedFounders(): Promise<
    import("./profileRepository").CertifiedFounderEntry[]
  > {
    await this.loadMockProfiles();
    return Object.values(this.mockProfiles)
      .filter((p) => p.progress?.certificationEarned)
      .map((p) => {
        const cert = p.progress.certificationEarned!;
        return {
          certId: cert.certId,
          name: p.name || "Anonymous",
          businessName: p.businessName || "",
          badgrAssertionUrl: cert.badgrAssertionUrl,
          earnedAt: cert.earnedAt,
        };
      });
  }

  async delete(id: string): Promise<void> {
    await this.loadMockProfiles();
    delete this.mockProfiles[id];
    await this.saveMockProfiles();
  }
}
