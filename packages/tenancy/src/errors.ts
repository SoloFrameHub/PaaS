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
