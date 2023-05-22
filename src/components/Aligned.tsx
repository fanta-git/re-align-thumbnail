import { imageUrlState } from "@/stores/playlist"
import Image from "next/image"
import { useRecoilValue } from "recoil"

export default function Aligned() {
  const imgUrl = useRecoilValue(imageUrlState)

  if (!imgUrl) return <></>

  return (
    <Image width={1600} height={900} alt={""} src={imgUrl} />
  )
}
