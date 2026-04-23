import { describe, expect, it } from 'vitest';

import {
  getTenantContextFromHeaders,
  resolveTenantSlugFromHost,
} from '../src/middleware.js';

describe('resolveTenantSlugFromHost', () => {
  const opts = { rootDomains: ['soloframehub.com'] };

  it('returns null for empty / missing host', () => {
    expect(resolveTenantSlugFromHost(null, opts)).toBe(null);
    expect(resolveTenantSlugFromHost('', opts)).toBe(null);
  });

  it('returns null for bare localhost / loopback', () => {
    expect(resolveTenantSlugFromHost('localhost', opts)).toBe(null);
    expect(resolveTenantSlugFromHost('localhost:3000', opts)).toBe(null);
    expect(resolveTenantSlugFromHost('127.0.0.1', opts)).toBe(null);
  });

  it('returns null at the apex of a root domain', () => {
    expect(resolveTenantSlugFromHost('soloframehub.com', opts)).toBe(null);
  });

  it('returns the slug for a tenant subdomain under a root', () => {
    expect(resolveTenantSlugFromHost('acme.soloframehub.com', opts)).toBe('acme');
    expect(resolveTenantSlugFromHost('ACME.SoloFrameHub.COM', opts)).toBe(
      'acme',
    );
    expect(resolveTenantSlugFromHost('acme.soloframehub.com:443', opts)).toBe(
      'acme',
    );
  });

  it('refuses reserved subdomains', () => {
    expect(resolveTenantSlugFromHost('www.soloframehub.com', opts)).toBe(null);
    expect(resolveTenantSlugFromHost('api.soloframehub.com', opts)).toBe(null);
    expect(resolveTenantSlugFromHost('n8n.soloframehub.com', opts)).toBe(null);
    expect(resolveTenantSlugFromHost('metabase.soloframehub.com', opts)).toBe(
      null,
    );
  });

  it('honors a custom reservedSubdomains override', () => {
    expect(
      resolveTenantSlugFromHost('www.soloframehub.com', {
        rootDomains: ['soloframehub.com'],
        reservedSubdomains: [], // caller says www is a tenant slug
      }),
    ).toBe('www');
  });

  it('refuses multi-label subdomains', () => {
    expect(
      resolveTenantSlugFromHost('a.b.soloframehub.com', opts),
    ).toBe(null);
  });

  it('refuses slugs that do not match the pattern', () => {
    expect(
      resolveTenantSlugFromHost('1acme.soloframehub.com', opts), // must start with letter
    ).toBe(null);
    expect(
      resolveTenantSlugFromHost('-acme.soloframehub.com', opts),
    ).toBe(null);
    expect(
      resolveTenantSlugFromHost('a.soloframehub.com', opts), // too short (min 2)
    ).toBe(null);
  });

  it('supports the <sub>.localhost dev pattern', () => {
    expect(resolveTenantSlugFromHost('acme.localhost', opts)).toBe('acme');
    expect(resolveTenantSlugFromHost('acme.localhost:3000', opts)).toBe('acme');
    expect(resolveTenantSlugFromHost('www.localhost', opts)).toBe(null);
  });

  it('returns null for hosts outside the configured roots', () => {
    expect(
      resolveTenantSlugFromHost('acme.other-domain.com', opts),
    ).toBe(null);
  });

  it('picks up on multiple root domains', () => {
    const multi = { rootDomains: ['soloframehub.com', 'solofame.dev'] };
    expect(resolveTenantSlugFromHost('acme.soloframehub.com', multi)).toBe(
      'acme',
    );
    expect(resolveTenantSlugFromHost('acme.solofame.dev', multi)).toBe('acme');
  });
});

describe('getTenantContextFromHeaders', () => {
  it('returns null when x-tenant-id is absent', () => {
    expect(getTenantContextFromHeaders(new Headers())).toBe(null);
    expect(getTenantContextFromHeaders({})).toBe(null);
  });

  it('builds a tenant context from Headers object', () => {
    const h = new Headers({
      'x-tenant-id': '00000000-0000-0000-0000-000000000042',
    });
    expect(getTenantContextFromHeaders(h, 'user-id')).toEqual({
      tenantId: '00000000-0000-0000-0000-000000000042',
      userId: 'user-id',
      role: 'tenant',
    });
  });

  it('builds a tenant context from a plain record', () => {
    const h = { 'x-tenant-id': '00000000-0000-0000-0000-000000000001' };
    expect(getTenantContextFromHeaders(h)).toEqual({
      tenantId: '00000000-0000-0000-0000-000000000001',
      userId: null,
      role: 'tenant',
    });
  });
});
