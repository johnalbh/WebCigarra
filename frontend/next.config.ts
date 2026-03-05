import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://*.paypal.com https://*.epayco.co https://vercel.live",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live",
            "img-src 'self' data: blob: https: http://localhost:1337",
            "font-src 'self' https://fonts.gstatic.com https://vercel.live",
            "connect-src 'self' https://www.paypal.com https://*.paypal.com https://*.epayco.co http://localhost:1337 https://vercel.live wss://ws-us3.pusher.com",
            "frame-src https://www.paypal.com https://*.paypal.com https://*.epayco.co https://checkout.epayco.co https://vercel.live",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self' https://www.paypal.com https://*.epayco.co",
          ].join('; '),
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
