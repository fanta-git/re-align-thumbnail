/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  async rewrites() {
    return [
      {
        source: '/@thumbnail/youtube/:ids*',
        destination: 'https://img.youtube.com/vi/:ids*',
      },
      {
        source: '/@thumbnail/nicovideo/:ids*',
        destination: 'http://nicovideo.cdn.nimg.jp/thumbnails/:ids*',
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
