/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Cloudflare Pages
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
