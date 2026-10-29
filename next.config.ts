import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // One canonical host: www.columbushb.com/* goes straight to columbushb.com/* in a single permanent hop.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.columbushb.com" }],
        destination: "https://columbushb.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Logo, video posters and videos never change under the same name, so browsers can keep them for a year.
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
