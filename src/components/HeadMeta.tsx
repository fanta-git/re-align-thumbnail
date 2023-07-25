import { DESCRIPTION, IMG_URL, SITE_URL, TITLE } from "@/consts/page";
import Head from "next/head";

export default function HeadMeta () {
  return (
    <Head>
      <title>{TITLE}</title>

      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content={IMG_URL} />
      <meta property="og:site_name" content={TITLE} />
      <meta name="twitter:card" content="summary" />
    </Head>
  )
}
