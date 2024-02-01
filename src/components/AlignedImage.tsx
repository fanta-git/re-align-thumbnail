import { Loadable } from "@/util/Loadable";
import { Image } from "@chakra-ui/react";
import { useEffect } from "react";

type Props = {
  loadableFile: Loadable<File | null>
}

export default function AlignedImage (props: Props) {
  const { loadableFile } = props
  const file = loadableFile.load()
  const url = file ? URL.createObjectURL(file) : ""

  useEffect(() => (
    () => URL.revokeObjectURL(url)
  ), [url])

  if (!file) return null
  return <Image src={url} alt={file.name} />
}
