import { NextResponse, type NextRequest } from "next/server";

// Subdomains that serve the platform (redirect to /welcome instead of marketing page)
const PLATFORM_SUBDOMAINS = new Set([
  "ai-solo-gtm-os",
  "ai-customer-acquisition-academy",
]);

export function middleware(request: NextRequest) {
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
      return NextResponse.rewrite(new URL("/welcome", request.url));
    }

    // Serve marketing homepage for unauthenticated visitors
    return NextResponse.rewrite(new URL("/home.html", request.url));
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
    return NextResponse.rewrite(new URL("/blog/index.html", request.url));
  }
  if (pathname === "/es" || pathname === "/es/") {
    return NextResponse.rewrite(new URL("/es/index.html", request.url));
  }
}

export const config = {
  matcher: ["/", "/((?!_next|api|assets|images|src|tailwind_theme|fonts).*)"],
};
