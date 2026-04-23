// Privileged surface for engines inside `@platform/*`. Apps must not import
// from this subpath — `@platform/eslint-plugin/no-direct-db-access` blocks it.
// All tenant-scoped work goes through `withTenant(ctx, fn)` from the package
// root, which sets the role + `app.tenant_id` GUC on the returned tx.

export { getDb, getPool, __closePool, schema } from './db.js';
export type { PlatformDb, Schema } from './db.js';
