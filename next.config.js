/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/@cafeapi/:path*',
        destination: 'https://cafeapi.kiite.jp/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
