/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["example.com", "images.unsplash.com"],
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
  env: {
    VERCEL_URL: process.env.VERCEL_URL || "",
  },
  output: "standalone",
};

module.exports = nextConfig;
