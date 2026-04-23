export class TenancyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TenancyError';
  }
}

export class CrossTenantAccessError extends TenancyError {
  constructor(
    public readonly requestedTenant: string,
    public readonly sessionTenant: string,
  ) {
    super(
      `cross-tenant access refused: requested=${requestedTenant} session=${sessionTenant}`,
    );
    this.name = 'CrossTenantAccessError';
  }
}

/**
 * Thrown by `requireTenantContext` when the authenticated user is not a
 * member of the resolved tenant. Distinct from `CrossTenantAccessError`
 * (which models "session says A but request says B") — here there's no
 * session→tenant binding at all, the user simply doesn't belong.
 *
 * Typical handler response: HTTP 403.
 */
export class NotATenantMemberError extends TenancyError {
  constructor(
    public readonly tenantId: string,
    public readonly userId: string,
  ) {
    super(
      `user ${userId} is not a member of tenant ${tenantId}`,
    );
    this.name = 'NotATenantMemberError';
  }
}
