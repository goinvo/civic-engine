import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for demo deployment */
  output: 'export',

  /* Image optimization for static export */
  images: {
    unoptimized: true,
  },

  /* i18n configuration (future multilingual support) */
  // Note: i18n with static export requires manual routing
  // Will implement custom locale detection and routing

  /* Trailing slash for consistent URLs */
  trailingSlash: true,

  /* Base path if deploying to subdirectory (optional) */
  // basePath: '/most-of-us',
};

export default nextConfig;
