/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },

  basePath: isProd ? "/crosstime" : "",
  assetPrefix: isProd ? "/crosstime/" : "",
};

export default nextConfig;
