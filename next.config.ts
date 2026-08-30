import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites from a sub-path:
 *   https://<user>.github.io/<repo>/
 * Set NEXT_PUBLIC_BASE_PATH in the deploy workflow (or .env.production)
 * to "/<repo>" so all internal links and assets resolve correctly.
 * Leave it empty for a user/org page (https://<user>.github.io/) or
 * for local preview builds.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
