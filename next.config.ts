import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,  
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  }
  
};

export default nextConfig;
