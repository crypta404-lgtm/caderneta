import type { NextConfig } from "next";

// Sem "output: export": a tela de novo lançamento usa Server Action,
// que precisa do servidor do Next (npm run dev, npm start ou Vercel).
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
