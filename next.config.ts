import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/member-cutout",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.showroom-live.com",
      },
      {
        protocol: "https",
        hostname: "cdn.idn.media",
      },
      {
        protocol: "https",
        hostname: "jkt48.com",
      },
    ],
  },
};

export default nextConfig;
