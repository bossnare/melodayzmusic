import withPWAInit from '@ducanh2912/next-pwa';
import type { NextConfig } from 'next';

// PWA config
const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
    maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50MB hoan'ny file
  },
});

const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Atsahatra tanteraka ny lint amin'ny build
  },

  // cache controle
  async headers() {
    return [
      {
        source: '/api/v1/song/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
} satisfies NextConfig; // ** type-safe with TS

export default withPWA(nextConfig);
