import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://*.stripe.com https://img.clerk.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://clerk.com https://*.clerk.com",
              "worker-src 'self' blob:",
              "connect-src 'self' http://localhost:8002 https://api.stripe.com https://clerk.com https://*.clerk.com wss://*.clerk.com https://*.clerk.accounts.dev wss://*.clerk.accounts.dev",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
