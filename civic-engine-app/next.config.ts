import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image optimization */
  images: {
    unoptimized: true,
  },

  /* Base path if deploying to subdirectory (optional) */
  // basePath: '/most-of-us',
};

export default nextConfig;
