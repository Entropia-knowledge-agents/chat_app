// @ts-check

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  assetPrefix: '/',
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  experimental: {
    // optimizeCss: true,
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  poweredByHeader: false,
  generateEtags: true,

  /**
   * Define headers a nivel de servidor Next.js
   */
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true', // habilitar credenciales (cookies, etc.)
          },
          {
            // ORIGEN permitido: aquí solo se permite 'https://dev-iadb.pantheonsite.io'
            // Si necesitas permitir múltiples orígenes, ve la nota abajo.
            key: 'Access-Control-Allow-Origin',
            value: 'https://dev-iadb.pantheonsite.io',
          },
          {
            key: 'Access-Control-Allow-Methods',
            // Incluye todos los métodos que usarás, incluyendo OPTIONS
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
