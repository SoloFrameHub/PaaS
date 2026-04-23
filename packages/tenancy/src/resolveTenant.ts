// Blueprint §6.3 — tenant resolver entry point.
// The real implementation reads tenant by host (subdomain or custom-domain map)
// and is called from each app's middleware.ts. This stub documents the shape;
// actual resolution is wired in Commit 9 (§12) when tenant rows exist.

export interface ResolvedTenant {
  id: string;
  slug: string;
  manifestId: string;
  manifestVersion: string;
}

export interface TenantResolveRequest {
  host: string;
  path?: string;
}

export async function resolveTenant(
  _req: TenantResolveRequest,
): Promise<ResolvedTenant | null> {
  return null;
}
