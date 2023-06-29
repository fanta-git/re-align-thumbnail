import { Loadable } from "@/util/Loadable";
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

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={""} width={width} height={height} />
}
