/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },

  basePath: "/crosstime",
  assetPrefix: "/crosstime",
};

export default nextConfig;
