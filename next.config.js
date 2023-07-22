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
      },
      {
        source: '/@thumbnail/soundcloud/:name',
        destination: 'https://i1.sndcdn.com/:name',
      },
      {
        source: '/@thumbnail/bandcamp/:name',
        destination: 'https://f4.bcbits.com/img/:name',
      },
      {
        source: '/@thumbnail/vimeo/:name',
        destination: 'http://i.vimeocdn.com/video/:name',
      },
    ];
  },
}

module.exports = nextConfig
