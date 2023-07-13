/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.thirdwebcdn.com', 'lh3.googleusercontent.com', 'i.seadn.io'],
  },
}

module.exports = nextConfig
