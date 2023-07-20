/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  async rewrites() {
    return [
      {
        source: '/@thumbnail/youtube/:id/S',
        destination: 'https://img.youtube.com/vi/:id/default.jpg',
      },
      {
        source: '/@thumbnail/youtube/:id/M',
        destination: 'https://img.youtube.com/vi/:id/mqdefault.jpg',
      },
      {
        source: '/@thumbnail/nicovideo/:ids*/S',
        destination: 'http://nicovideo.cdn.nimg.jp/thumbnails/:ids*',
      },
      {
        source: '/@thumbnail/nicovideo/:ids*/M',
        destination: 'http://nicovideo.cdn.nimg.jp/thumbnails/:ids*.M',
      }
    ];
  },
}

module.exports = nextConfig
