import { currentPlaylistBaseState } from "@/stores/playlist"
import Image from "next/image"
import { useRecoilValue } from "recoil"

export default function Aligned() {
  const playlist = useRecoilValue(currentPlaylistBaseState)
  if (playlist === undefined) return <>please input playlist url</>
  const imgUrl = `/api/playlist/image?type=${playlist.type}&id=${playlist.id}`

  return (
    <>
      {imgUrl}
      <Image width={1600} height={900} alt={""} src={imgUrl} />
    </>
  )
}
