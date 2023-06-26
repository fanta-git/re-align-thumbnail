import { Loadable } from "@/util/Loadable";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
  loadableUrl: Loadable<string>
  width: number
  height: number
}

export default function AlignedImage (props: Props) {
  const { loadableUrl, width, height } = props
  const url = loadableUrl.load()

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url)
  }, [url])

  return <Image src={url} alt={""} width={width} height={height} />
}
