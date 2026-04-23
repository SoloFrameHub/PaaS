// Blueprint Day 6 — identity extraction.
//
// Thin factory around Lucia that standardises cookie naming, the secure-flag
// derivation, and the lifecycle helper so every vertical's auth-lucia.ts
// shrinks to a config object. Apps keep their own user/session schemas for
// now (user-attribute shapes differ across verticals); canonical user schema
// migration lands separately when the first app flips on multi-tenancy.
//
// Peer-dep: `lucia` and `@lucia-auth/adapter-drizzle` are the app's
// concern — this package stays version-agnostic within major lucia.

import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';

// Lucia v3 publishes `DatabaseUserAttributes` only via module-augmentation,
// so we model the constraint structurally instead of importing the type.
type AnyAttributes = Record<string, unknown>;

// Drizzle table/db types are extraordinarily specific (tableConfig narrows to
// every column). Trying to generalize to `PgTableWithColumns<TableConfig>`
// forces the caller into an index-signature subtype relationship the concrete
// tables can't satisfy. We accept `unknown` at the boundary and rely on the
// `DrizzlePostgreSQLAdapter`'s own runtime contract — each caller's tests
// still exercise the adapter with its real tables.
type DrizzleDb = unknown;
type DrizzleTable = unknown;

export interface PlatformAuthUser {
  id: string;
  email: string;
}

export interface CreateLuciaInstanceOptions<
  Attrs extends AnyAttributes,
  PublicUser extends PlatformAuthUser = PlatformAuthUser,
> {
  /** Drizzle database handle. Ownership (Node vs Edge) is the caller's. */
  db: DrizzleDb;
  /** The session table — the `DrizzlePostgreSQLAdapter` will validate shape. */
  sessionTable: DrizzleTable;
  /** The user table — the `DrizzlePostgreSQLAdapter` will validate shape. */
  userTable: DrizzleTable;
  /**
   * Project DB user attributes to the shape your app wants on
   * `ctx.user.<…>`. Runs inside Lucia's `getUserAttributes` callback.
   */
  projectUserAttributes: (attrs: Attrs) => Omit<PublicUser, 'id'>;
  /**
   * Cookie name. Defaults to `session`. All verticals should share one name
   * so subdomain tenants can rely on cookie scoping — override only if your
   * app is sharing a parent domain with a third-party service using the
   * same name.
   */
  cookieName?: string;
  /**
   * Public app URL (NEXT_PUBLIC_APP_URL or equivalent). Used to derive the
   * `secure` flag: HTTPS → true in production; HTTP deploys (sslip.io,
   * bare VPS IPs for pre-domain deploys) → false so browsers accept the
   * cookie. Pass the URL itself; the factory parses the protocol.
   */
  appUrl?: string;
  /**
   * SameSite policy. Defaults to `lax` which is correct for OAuth returns
   * and top-level POST forms.
   */
  sameSite?: 'lax' | 'strict' | 'none';
}

export function isSecureCookieContext(appUrl: string | undefined): boolean {
  if (process.env.NODE_ENV !== 'production') return false;
  if (!appUrl) return true; // Production default: secure.
  return appUrl.startsWith('https://');
}

export function createLuciaInstance<
  Attrs extends AnyAttributes,
  PublicUser extends PlatformAuthUser = PlatformAuthUser,
>(opts: CreateLuciaInstanceOptions<Attrs, PublicUser>): Lucia {
  // The adapter requires highly specific Drizzle types that don't survive
  // generic boundaries. We intentionally erase types here so every caller
  // doesn't have to re-declare the exact HKT; the adapter validates shape
  // at construction time.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const adapter = new DrizzlePostgreSQLAdapter(
    opts.db as any,
    opts.sessionTable as any,
    opts.userTable as any,
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return new Lucia(adapter, {
    sessionCookie: {
      name: opts.cookieName ?? 'session',
      expires: false,
      attributes: {
        secure: isSecureCookieContext(opts.appUrl),
        sameSite: opts.sameSite ?? 'lax',
      },
    },
    getUserAttributes: (attrs) =>
      opts.projectUserAttributes(attrs as unknown as Attrs),
  });
}

/**
 * Memoise the Lucia instance per (db, userTable, sessionTable) triple so the
 * caller can wrap in a simple `() => getLucia()` without double-init. The key
 * is identity-based — pass the same objects on each call.
 */
export function memoizeLucia(factory: () => Lucia): () => Lucia {
  let instance: Lucia | null = null;
  return () => {
    if (!instance) instance = factory();
    return instance;
  };
}
