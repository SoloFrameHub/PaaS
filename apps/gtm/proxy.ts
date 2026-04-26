import { NextResponse, type NextRequest } from "next/server";
import { resolveTenantSlugFromHost } from "@platform/tenancy/middleware";

// Subdomains that serve the platform (redirect to /welcome instead of marketing page)
const PLATFORM_SUBDOMAINS = new Set([
  "ai-solo-gtm-os",
  "ai-customer-acquisition-academy",
]);

const TENANT_ROOT_DOMAINS = (process.env.TENANT_ROOT_DOMAINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Reserved subdomains — extends the defaults with this app's own platform
// subdomains so they never get picked up as tenant slugs.
const RESERVED_SUBDOMAINS = [
  "www",
  "api",
  "admin",
  "n8n",
  "metabase",
  "docs",
  "status",
  "assets",
  "static",
  "cdn",
  "mail",
  "auth",
  ...PLATFORM_SUBDOMAINS,
];

// B-030 — headers the client must never be allowed to supply. Middleware is
// the only source of truth for tenant scoping; without this strip, a request
// could carry `x-tenant-slug: <any>` and a downstream handler calling
// `requireTenantContext` would trust it.
const TENANT_HEADERS = ['x-tenant-slug', 'x-tenant-id'] as const;

function attachTenantSlug(
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  const tenantSlug = resolveTenantSlugFromHost(request.headers.get("host"), {
    rootDomains: TENANT_ROOT_DOMAINS,
    reservedSubdomains: RESERVED_SUBDOMAINS,
  });
  // Always strip any inbound tenant headers, even when we don't reattach one.
  for (const h of TENANT_HEADERS) response.headers.delete(h);
  if (tenantSlug) response.headers.set("x-tenant-slug", tenantSlug);
  return response;
}

// B-031: Next 16 renamed this convention from `middleware.ts` + `middleware()`
// to `proxy.ts` + `proxy()`. The old name still works but emits a deprecation
// warning. Both apps in this monorepo stay on `proxy.ts` + `proxy()`.
export function proxy(request: NextRequest) {
  // www → non-www redirect (301 for SEO canonical)
  const host = request.headers.get("host") ?? "";
  if (host.startsWith("www.")) {
    const newUrl = new URL(request.url);
    newUrl.host = host.replace("www.", "");
    return NextResponse.redirect(newUrl, 301);
  }

  const pathname = request.nextUrl.pathname;

  // Root URL routing
  if (pathname === "/") {
    // Lucia names the session cookie 'session' (see lib/auth-lucia.ts)
    const hasSession = request.cookies.has("session");
    if (hasSession) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Platform subdomains: serve welcome page (language chooser)
    const subdomain = host.split(".")[0];
    if (PLATFORM_SUBDOMAINS.has(subdomain)) {
      return attachTenantSlug(
        request,
        NextResponse.rewrite(new URL("/welcome", request.url)),
      );
    }

    // Marketing lives at soloframehub.com (tidy-next, already deployed).
    // Send unauthenticated visitors there; `gtm.soloframehub.com` is the
    // app, not a marketing site. Signin/signup pages under /signin, /signup
    // still work — only the bare `/` redirects out.
    return NextResponse.redirect("https://soloframehub.com/", 307);
  }

  // 301 redirect: old academy URL → new OS URL
  if (pathname === "/solo-founders-ai-customer-acquisition-academy.html") {
    return NextResponse.redirect(
      new URL("/solo-founders-ai-client-acquisition-os.html", request.url),
      301,
    );
  }
  if (pathname === "/es/solo-founders-ai-customer-acquisition-academy.html") {
    return NextResponse.redirect(
      new URL("/es/solo-founders-ai-client-acquisition-os.html", request.url),
      301,
    );
  }

  // Directory index rewrites for static HTML directories
  if (pathname === "/blog" || pathname === "/blog/") {
    return attachTenantSlug(
      request,
      NextResponse.rewrite(new URL("/blog/index.html", request.url)),
    );
  }
  if (pathname === "/es" || pathname === "/es/") {
    return attachTenantSlug(
      request,
      NextResponse.rewrite(new URL("/es/index.html", request.url)),
    );
  }

  // Default: continue. We always build `requestHeaders` from scratch with
  // the tenant-control headers stripped, so a request can never present a
  // spoofed slug to downstream handlers. Setting `x-tenant-slug` is then
  // the one-way write from middleware → route.
  const requestHeaders = new Headers(request.headers);
  for (const h of TENANT_HEADERS) requestHeaders.delete(h);

  const tenantSlug = resolveTenantSlugFromHost(host, {
    rootDomains: TENANT_ROOT_DOMAINS,
    reservedSubdomains: RESERVED_SUBDOMAINS,
  });
  if (tenantSlug) requestHeaders.set("x-tenant-slug", tenantSlug);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  for (const h of TENANT_HEADERS) response.headers.delete(h);
  if (tenantSlug) response.headers.set("x-tenant-slug", tenantSlug);
  return response;
}

// B-031: the matcher previously excluded `/api/*`, which meant API routes
// never received the middleware-set `x-tenant-slug`. With the strip in place
// above, `/api/*` would then receive any client-supplied tenant header
// unchallenged. Include `/api/*` in the matcher so the strip + rewrite runs
// for every tenant-reachable surface. We still exclude `_next` and static
// asset folders (the regex exclusion list) for performance.
export const config = {
  matcher: ["/", "/((?!_next|assets|images|src|tailwind_theme|fonts).*)"],
};
