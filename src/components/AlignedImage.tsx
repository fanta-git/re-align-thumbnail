import { Loadable } from "@/util/Loadable";
import { Image } from "@chakra-ui/react";
import { useEffect } from "react";

type Props = {
  loadableUrl: Loadable<string | undefined>
}

export default function AlignedImage (props: Props) {
  const { loadableUrl } = props
  const url = loadableUrl.load()

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url)
  }, [url])

  if  (url === undefined) return <>Error!</>

  return <Image src={url} alt={""} />
}
