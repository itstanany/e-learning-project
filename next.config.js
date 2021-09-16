const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  pwa: {
    dest: 'public',
    // disable: false,
    skipWaiting: true,
    clientsClaim: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});
