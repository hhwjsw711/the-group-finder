import { createMDX } from "fumadocs-mdx/next";
import { ProxyAgent } from "undici";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

if (process.env.NODE_ENV === "development") {
  const proxyAgent = new ProxyAgent("http://127.0.0.1:7890/");

  const PROXY_DOMAINS = [
    "oauth2.googleapis.com",
    "openidconnect.googleapis.com",
    "lh3.googleusercontent.com",
    "r2.cloudflarestorage.com",
    "github.com",
    "api.github.com"
  ];

  const originalFetch = global.fetch;

  global.fetch = function (url, opts = {}) {
    const urlStr = url instanceof Request ? url.url :
      url instanceof URL ? url.toString() :
        String(url);

    const needsProxy = PROXY_DOMAINS.some(domain => urlStr.includes(domain));

    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];

    if (needsProxy) {
      console.log(`[${timestamp}] 🔀 Proxied: ${urlStr}`);
      opts.dispatcher = proxyAgent;
    } else {
      console.log(`[${timestamp}] ⚡ Direct: ${urlStr}`);
    }

    try {
      return originalFetch(url, opts);
    } catch (error) {
      console.error(`Fetch error for ${urlStr}:`, error);
      throw error;
    }
  };

  console.log("✅ Proxy setup completed for Google OAuth");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  serverExternalPackages: ["@aws-sdk/s3-request-presigner"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.thegroupfinder.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "thegroupfinder.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
        port: "",
        pathname: "**",
      }
    ],
  },
};

const withMDX = createMDX();

export default withNextIntl(withMDX(nextConfig));
