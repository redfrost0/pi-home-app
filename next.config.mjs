/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://sys-api.joelspi.org/:path*' // Proxy to Backend
      }
    ]
  },
  output: "standalone",
};

export default nextConfig;
