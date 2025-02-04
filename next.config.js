// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
  assetPrefix: '/',
  // swcMinify: true,
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

  // Configuración de headers para CORS en las rutas API
  async headers() {
    return [
      {
        // Se aplicará a todas las rutas que empiecen con /api
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            // **Atención:** Aquí se especifica un único origen permitido.
            // Si requieres permitir más de un origen (por ejemplo, local y producción),
            // lo recomendable es gestionar esta lógica de forma dinámica mediante un middleware.
            key: 'Access-Control-Allow-Origin',
            value: 'https://dev-iadb.pantheonsite.io',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST',
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
