import createNextPWA from 'next-pwa';
import type { NextConfig } from 'next';

// PWA config
const withPWA = createNextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Atsahatra tanteraka ny lint amin'ny build
  },
  // swcManify: true,
} satisfies NextConfig; // ** type-safe with TS

export default withPWA(nextConfig);
