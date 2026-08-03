/** @type {import('next').NextConfig} */

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const emmaApiUrl = process.env.NEXT_PUBLIC_EMMA_API_URL;

const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
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
            value: `
              default-src 'self';
              
              connect-src 'self'
                ${backendUrl}
                ${emmaApiUrl || ""}
                https://${projectId}.supabase.co
                https://api.stripe.com
                https://*.stripe.com
                http://localhost:4000
                https://cecille-pendente-alondra.ngrok-free.dev
                https://cdn.jsdelivr.net;
              
              img-src 'self' data: https:;
              
              script-src 'self' 'unsafe-inline' 'unsafe-eval'
                https://js.stripe.com
                https://*.stripe.com;
              
              script-src-elem 'self' 'unsafe-inline'
                https://js.stripe.com
                https://*.stripe.com;
              
              style-src 'self' 'unsafe-inline';
              
              frame-src 'self'
                https://js.stripe.com
                https://hooks.stripe.com
                https://${projectId}.supabase.co;
              
              font-src 'self' data:;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
