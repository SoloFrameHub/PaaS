/**
 * NPPES NPI Registry Verification Service
 *
 * The NPPES (National Plan & Provider Enumeration System) registry is a free,
 * public API maintained by CMS that contains all US licensed healthcare providers.
 *
 * API docs: https://npiregistry.cms.hhs.gov/api-page
 * No API key required. Rate limit: ~1000 req/day per IP.
 *
 * NPI numbers are 10-digit identifiers assigned to all US practitioners
 * who bill Medicare/Medicaid. Almost every licensed clinician has one.
 */

const NPPES_API = 'https://npiregistry.cms.hhs.gov/api/?version=2.1';
const TIMEOUT_MS = 8000;

export interface NPIResult {
  valid: boolean;
  npiNumber: string;
  name: string | null;           // "Dr. Jane Smith"
  credentials: string | null;    // "MD", "LCSW", etc.
  specialty: string | null;      // Primary taxonomy description
  state: string | null;          // License state
  city: string | null;
  entityType: 'individual' | 'organization' | null;
  rawData: Record<string, unknown>;
  error?: string;
}

/**
 * Look up a 10-digit NPI number and return structured practitioner info.
 * Returns { valid: false } if not found or if the API is unavailable.
 */
export async function lookupNPI(npiNumber: string): Promise<NPIResult> {
  const cleaned = npiNumber.replace(/\D/g, '');

  if (!/^\d{10}$/.test(cleaned)) {
    return {
      valid: false,
      npiNumber: cleaned,
      name: null, credentials: null, specialty: null,
      state: null, city: null, entityType: null,
      rawData: {},
      error: 'NPI must be exactly 10 digits',
    };
  }

  const url = `${NPPES_API}&number=${cleaned}&enumeration_type=&taxonomy_description=&name_purpose=&first_name=&use_first_name_alias=&last_name=&organization_name=&address_purpose=&city=&state=&postal_code=&country_code=&limit=1&skip=0&pretty=`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 0 }, // never cache — live registry
    });
    clearTimeout(timer);

    if (!res.ok) {
      return notFound(cleaned, `NPPES API returned ${res.status}`);
    }

    const data = await res.json();
    const results: any[] = data?.results ?? [];

    if (results.length === 0) {
      return notFound(cleaned, 'NPI number not found in registry');
    }

    const entry = results[0];
    const basic = entry.basic ?? {};
    const entityType: 'individual' | 'organization' =
      entry.enumeration_type === 'NPI-1' ? 'individual' : 'organization';

    // Name
    let name: string | null = null;
    if (entityType === 'individual') {
      const parts = [basic.first_name, basic.middle_name, basic.last_name]
        .filter(Boolean).join(' ');
      const credential = basic.credential ? `, ${basic.credential}` : '';
      name = parts ? `${parts}${credential}` : null;
    } else {
      name = basic.organization_name ?? null;
    }

    // Credentials from basic record
    const credentials: string | null = basic.credential ?? null;

    // Primary taxonomy (specialty)
    const primaryTaxonomy = (entry.taxonomies ?? []).find((t: any) => t.primary);
    const specialty: string | null = primaryTaxonomy?.desc ?? null;

    // Primary address
    const primaryAddr = (entry.addresses ?? []).find((a: any) => a.address_purpose === 'LOCATION')
      ?? entry.addresses?.[0]
      ?? null;
    const state: string | null = primaryAddr?.state ?? null;
    const city: string | null = primaryAddr?.city ?? null;

    return {
      valid: true,
      npiNumber: cleaned,
      name,
      credentials,
      specialty,
      state,
      city,
      entityType,
      rawData: entry,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return notFound(cleaned, msg.includes('abort') ? 'NPPES API timeout' : `Lookup failed: ${msg}`);
  }
}

/**
 * Verify that an NPI exists AND the name roughly matches the supplied display name.
 * Returns the full NPIResult plus a `nameMatch` confidence flag.
 *
 * Used for auto-verification: if NPI is valid + name matches → auto-approve.
 * If NPI is valid but name doesn't match → flag for manual review.
 */
export interface NPIVerificationResult extends NPIResult {
  nameMatch: 'strong' | 'partial' | 'none' | 'skipped';
  autoVerifiable: boolean;
}

export async function verifyProviderNPI(
  npiNumber: string,
  suppliedName: string,
): Promise<NPIVerificationResult> {
  const result = await lookupNPI(npiNumber);

  if (!result.valid) {
    return { ...result, nameMatch: 'none', autoVerifiable: false };
  }

  const nameMatch = scoreNameMatch(result.name ?? '', suppliedName);
  // Auto-verify on strong OR partial match — partial still means last name matched,
  // which is meaningful for clinical identity. Admin can override if needed.
  const autoVerifiable = result.entityType === 'individual' && nameMatch !== 'none';

  return { ...result, nameMatch, autoVerifiable };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function notFound(npiNumber: string, error: string): NPIResult {
  return {
    valid: false,
    npiNumber,
    name: null, credentials: null, specialty: null,
    state: null, city: null, entityType: null,
    rawData: {},
    error,
  };
}

/**
 * Fuzzy name matching — checks if any word in the registry name appears in
 * the supplied name (case-insensitive). Returns:
 *   'strong'  — last name + first name both match
 *   'partial' — last name only matches
 *   'none'    — no match found
 */
function scoreNameMatch(
  registryName: string,
  suppliedName: string,
): 'strong' | 'partial' | 'none' {
  if (!registryName || !suppliedName) return 'none';

  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);

  const regWords  = normalize(registryName);
  const suppWords = normalize(suppliedName);

  // Remove common honorifics and credentials from matching
  const SKIP = new Set(['dr', 'mr', 'mrs', 'ms', 'phd', 'md', 'lcsw', 'lpc', 'psyd', 'np', 'rn']);
  const regFiltered  = regWords.filter(w => !SKIP.has(w));
  const suppFiltered = suppWords.filter(w => !SKIP.has(w));

  if (regFiltered.length === 0 || suppFiltered.length === 0) return 'none';

  const matching = regFiltered.filter(w => suppFiltered.includes(w));

  if (matching.length >= 2) return 'strong';
  if (matching.length === 1) return 'partial';
  return 'none';
}
