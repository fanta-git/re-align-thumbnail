import { Loadable } from "@/util/Loadable";
import { Image } from "@chakra-ui/react";
import { useEffect } from "react";

type Props = {
  loadableUrl: Loadable<string>
}

export default function AlignedImage (props: Props) {
  const { loadableUrl } = props
  const url = loadableUrl.load()

  useEffect(() => () => URL.revokeObjectURL(url), [url])

  return <Image src={url} alt={""} />
}
