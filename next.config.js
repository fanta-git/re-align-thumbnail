/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  async rewrites() {
    return [
      {
        source: '/@kiite-api/:path*',
        destination: 'https://kiite.jp/api/:path*',
      },
      {
        source: '/@thumbnail-yt/:id',
        destination: 'https://img.youtube.com/vi/:id/default.jpg',
      },
      {
        source: '/@thumbnail-nv/:ids*',
        destination: 'http://nicovideo.cdn.nimg.jp/thumbnails/:ids*',
      }
    ];
  },
}

module.exports = nextConfig
