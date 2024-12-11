import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  //swcMinify: true,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  experimental: {
    //optimizeCss: true,
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  poweredByHeader: false,
  generateEtags: true,
};

export default nextConfig;
