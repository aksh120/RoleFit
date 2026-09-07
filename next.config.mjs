/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Server external packages for native or commonjs modules
  serverExternalPackages: ['pdf-parse', 'mammoth'],
};

export default nextConfig;
