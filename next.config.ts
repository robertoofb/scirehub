import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb", // Limita el tamaño de las solicitudes para server actions
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // Aceptar solo imágenes seguras
        hostname: "**", // Permitir cualquier dominio
        pathname: "**", // Permitir cualquier ruta
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora ESLint durante el build
  },
};

export default nextConfig;
