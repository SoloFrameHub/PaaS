const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Monorepo: tell Next.js where the workspace root lives so standalone
  // output traces files from @platform/* workspace packages.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  async headers() {
    const sharedSecurityHeaders = [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "origin-when-cross-origin" },
    ];
    const marketingCSP =
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://code.iconify.design https://www.googletagmanager.com https://app.visitortracking.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https:; connect-src 'self' https: https://www.google-analytics.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://forms.soloframehub.com;";
    return [
      {
        // Marketing HTML pages (direct .html access)
        source: "/:path*.html",
        headers: [
          ...sharedSecurityHeaders,
          { key: "Content-Security-Policy", value: marketingCSP },
        ],
      },
      {
        // Marketing rewrites: /blog and /es (middleware rewrites to .html)
        source: "/blog",
        headers: [
          ...sharedSecurityHeaders,
          { key: "Content-Security-Policy", value: marketingCSP },
        ],
      },
      {
        source: "/es",
        headers: [
          ...sharedSecurityHeaders,
          { key: "Content-Security-Policy", value: marketingCSP },
        ],
      },
      {
        // Static assets - long cache (1 year for immutable assets)
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/src/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/tailwind_theme/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // App routes (exclude .html, /blog, /es)
        source: "/((?!.*\\.html$|blog$|blog/|es$|es/).*)",
        headers: [
          ...sharedSecurityHeaders,
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; frame-src 'self'; connect-src 'self' https://api.openai.com https://fonts.gstatic.com https://www.google-analytics.com;",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // S3/MinIO images served through the app or directly
    remotePatterns: [],
  },
  serverExternalPackages: ["pdf-parse", "@node-rs/argon2", "resend"],
  outputFileTracingIncludes: {
    "/academy/\\[courseId\\]/\\[lessonId\\]": ["./server/data/content/**/*"],
    "/**": ["./messages/**/*"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
