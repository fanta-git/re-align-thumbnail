import { Loadable } from "@/util/Loadable";
import Image from "next/image";

type Props = {
  loadableUrl: Loadable<string | undefined>
  width: number
  height: number
};
export default function AlignedImage (props: Props) {
  const { loadableUrl, width, height } = props

  const url = loadableUrl.load()
  if (url == null) return (<>Error!</>)

  return <Image src={url} alt={""} width={width} height={height} />
}
