import { getListBase } from "@/foundations/getListBase"
import { isImageLoadingState, formContentsState } from "@/stores/playlist"
import Image from "next/image"
import { useEffect } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

export default function Aligned() {
  const formContents = useRecoilValue(formContentsState)
  const playlist = formContents && getListBase(formContents.url)
  const setIsImageLoading = useSetRecoilState(isImageLoadingState)
  const imgUrl = playlist && `/api/playlist/image?type=${playlist.type}&id=${playlist.id}&width=${formContents.width}&height=${formContents.height}&rows=${formContents.rows}&columns=${formContents.columns}`

  useEffect(() => {
    if (imgUrl) setIsImageLoading(true)
  }, [imgUrl, setIsImageLoading])

  if (imgUrl === undefined) return <></>

  return (
    <Image width={1600} height={900} alt={""} src={imgUrl} onLoadingComplete={() => setIsImageLoading(false)}  />
  )
}
