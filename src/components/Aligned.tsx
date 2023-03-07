import { currentPlaylistState } from "@/stores/playlist"
import { useRecoilValue } from "recoil"

export default function Aligned() {
  const playlist = useRecoilValue(currentPlaylistState)

  return (
    <>{JSON.stringify(playlist)}</>
  )
}
