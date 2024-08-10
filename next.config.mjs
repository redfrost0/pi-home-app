/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8440/:path*' // Proxy to Backend
      }
    ]
  },
  output: "standalone",
};

export default nextConfig;
