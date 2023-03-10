import { isImageLoadingState, playlistBaseState } from "@/stores/playlist"
import Image from "next/image"
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

export default function Aligned() {
  const playlist = useRecoilValue(playlistBaseState)
  const setIsImageLoading = useSetRecoilState(isImageLoadingState)
  const imgUrl = playlist && `/api/playlist/image?type=${playlist.type}&id=${playlist.id}`

  useEffect(() => {
    if (imgUrl) setIsImageLoading(true)
  }, [imgUrl, setIsImageLoading])

  if (imgUrl === undefined) return <></>

  return (
    <Image width={1600} height={900} alt={""} src={imgUrl} onLoadingComplete={() => setIsImageLoading(false)}  />
  )
}
