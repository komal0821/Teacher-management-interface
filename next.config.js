/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Teacher-management-interface' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Teacher-management-interface' : '',
}

module.exports = nextConfig
