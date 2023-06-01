import Image from "next/image";

type Props = {
  loadImageUrl: () => string | undefined
  width: number
  height: number
};
export default function AlignedImage (props: Props) {
  const { loadImageUrl, width, height } = props

  const url = loadImageUrl()
  if (url == null) return (<>Error!</>)

  return <Image src={url} alt={""} width={width} height={height} />
}
