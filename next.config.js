/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['api.dicebear.com', 'xsgames.co'],
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize for faster builds
  webpack: (config, { isServer }) => {
    // Optimize file watching
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
}

module.exports = nextConfig
