import Head from "next/head";

const title = "Re:AlignThumbnail"
const description = "複数の動画のサムネイルを並べて一枚の画像にまとめるWebアプリ"
const url = "https://re-align-thumbnail.vercel.app/"
const imgUrl = "/favicons/android-chrome-512x512.png"

export default function HeadMeta () {
  return (
    <Head>
      <title>{title}</title>

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
    </Head>
  )
}
