import { FounderProfile } from "@/types/profile";
import { MockProfileRepository } from "./mockProfileRepository";
import { PostgresProfileRepository } from "./postgresProfileRepository";
import { hasDatabase } from "@/lib/db";

export interface CertifiedFounderEntry {
  certId: string;
  name: string;
  businessName: string;
  badgrAssertionUrl: string | null;
  earnedAt: string;
}

export interface IProfileRepository {
  getById(id: string): Promise<FounderProfile | null>;
  save(id: string, profile: Partial<FounderProfile>): Promise<void>;
  update(id: string, updates: Record<string, any>): Promise<void>;
  getByEmail(email: string): Promise<FounderProfile | null>;
  /** Atomic lock: sets analysisStatus='analyzing' only if not already locked. Returns true if acquired. */
  acquireAnalysisLock(id: string, staleLockMinutes?: number): Promise<boolean>;
  /** Returns all profiles where certificationEarned is set, ordered by earnedAt desc. */
  getCertifiedFounders(): Promise<CertifiedFounderEntry[]>;
}

const getProfileRepository = (): IProfileRepository => {
  // Prefer Postgres when available — mock auth controls authentication bypass,
  // not data storage. This ensures E2E tests exercise the real DB pipeline.
  if (hasDatabase()) {
    return new PostgresProfileRepository();
  }
  return new MockProfileRepository();
};

export const profileRepository = getProfileRepository();
