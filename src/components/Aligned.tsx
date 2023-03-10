import { currentPlaylistBaseState } from "@/stores/playlist"
import Image from "next/image"
import { useRecoilValue } from "recoil"

export default function Aligned() {
  const playlist = useRecoilValue(currentPlaylistBaseState)
  if (playlist === undefined) return <></>
  const imgUrl = `/api/playlist/image?type=${playlist.type}&id=${playlist.id}`

  return (
    <Image width={1600} height={900} alt={""} src={imgUrl} />
  )
}
