/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  async redirects() {
    return [
      {
        source: '/birthday.html',
        destination: '/birthday',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
