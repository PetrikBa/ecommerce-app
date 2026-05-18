import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://m.stripe.network https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://m.stripe.network",
              "font-src 'self' https://fonts.gstatic.com https://m.stripe.network",
              "img-src 'self' data: blob: https://*.stripe.com https://img.clerk.com https://res.cloudinary.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://m.stripe.network https://clerk.com https://*.clerk.com",
              "worker-src 'self' blob:",
              "connect-src 'self' http://localhost:8000 http://localhost:8001 http://localhost:8002 https://product-service-1f2s.onrender.com https://order-service-v5v9.onrender.com https://payment-service-yjqo.onrender.com https://api.stripe.com https://clerk.com https://*.clerk.com wss://*.clerk.com https://*.clerk.accounts.dev wss://*.clerk.accounts.dev",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
