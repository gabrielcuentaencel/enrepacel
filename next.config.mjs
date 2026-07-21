/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <--- ESTA LÍNEA ES LA CLAVE
  // ... cualquier otra configuración que ya tuvieras
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
