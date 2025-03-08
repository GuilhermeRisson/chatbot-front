/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilita o middleware
  experimental: {
    instrumentationHook: true
  }
};

export default nextConfig;
