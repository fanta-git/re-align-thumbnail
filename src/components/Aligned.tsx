import { imageUrlState, isImageLoadingState } from "@/stores/playlist"
import Image from "next/image"
import { useRecoilValue, useSetRecoilState } from "recoil"

export default function Aligned() {
  const setIsImageLoading = useSetRecoilState(isImageLoadingState)
  const imgUrl = useRecoilValue(imageUrlState)

  if (!imgUrl) return <></>

  return (
    <Image width={1600} height={900} alt={""} src={imgUrl} onLoadingComplete={() => setIsImageLoading(false)}  />
  )
}
