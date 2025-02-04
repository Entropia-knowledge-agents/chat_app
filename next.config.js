// @ts-check

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  assetPrefix: '/',
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

module.exports = nextConfig;