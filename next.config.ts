import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/FindFood",
  assetPrefix: "/FindFood/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
