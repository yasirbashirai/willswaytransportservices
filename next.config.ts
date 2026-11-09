import type { NextConfig } from "next";

// Images are all local; serve modern formats
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 85] },
};

export default nextConfig;
