/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Temporary while the games and blog sections are parked: the pages are kept
  // in app/ but stay unreachable. Non-permanent so browsers don't cache it.
  async redirects() {
    return [
      { source: "/games", destination: "/", permanent: false },
      { source: "/blog", destination: "/", permanent: false },
      { source: "/blog/:slug", destination: "/", permanent: false },
    ]
  },
}

export default nextConfig
