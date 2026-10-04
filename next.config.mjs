const nextConfig = {
  output: 'standalone',
  // Keep Mongoose out of the bundle; it is loaded from node_modules at runtime
  serverExternalPackages: ['mongoose'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
