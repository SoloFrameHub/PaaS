/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async headers() {
        const isProd = process.env.NODE_ENV === 'production';
        const securityHeaders = [
            {
                key: 'X-DNS-Prefetch-Control',
                value: 'on'
            },
            {
                key: 'X-XSS-Protection',
                value: '1; mode=block'
            },
            {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN'
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff'
            },
            {
                key: 'Referrer-Policy',
                value: 'origin-when-cross-origin'
            },
            {
                key: 'Content-Security-Policy',
                value: [
                    "default-src 'self'",
                    isProd
                        ? "script-src 'self'"
                        : "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                    "img-src 'self' data: https: blob:",
                    "font-src 'self' https://fonts.gstatic.com",
                    "frame-src 'self' https://mhe-forum.soloframehub.com",
                    "frame-ancestors 'self'",
                    "connect-src 'self' ws: wss: https://mhe-forum.soloframehub.com",
                    "object-src 'none'",
                    "worker-src 'self' blob:",
                    "base-uri 'self'",
                    "form-action 'self'",
                ].join('; ')
            }
        ];

        // Only send HSTS in production — Chrome caches it permanently
        // and will block localhost if it sees HSTS on a dev server
        if (isProd) {
            securityHeaders.push({
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload'
            });
        }

        return [
            {
                source: '/(.*)',
                headers: securityHeaders
            },
            {
                source: '/presentations/:path*.pdf',
                headers: [
                    {
                        key: 'Content-Disposition',
                        value: 'inline'
                    }
                ]
            }
        ];
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        // S3/MinIO images served through the app or directly
        // Flarum forum user avatars
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mhe-forum.soloframehub.com',
                pathname: '/assets/**',
            },
            {
                protocol: 'http',
                hostname: 'mhe-forum.soloframehub.com',
                pathname: '/assets/**',
            },
        ],
    },
    serverExternalPackages: ['pdf-parse'],
    turbopack: {},
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
}

if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true })
    module.exports = withBundleAnalyzer(nextConfig)
} else {
    module.exports = nextConfig
}
