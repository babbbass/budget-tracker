import type { NextConfig } from "next"
import withPWA from "@ducanh2912/next-pwa"

const nextConfig: NextConfig = {
  // Your other Next.js config options go here
}

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
}

export default withPWA(pwaConfig)(nextConfig)
