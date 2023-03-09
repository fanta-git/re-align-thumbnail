import { currentPlaylistBaseState } from "@/stores/playlist"
import { useRecoilValue } from "recoil"

export default function Aligned() {
  const playlist = useRecoilValue(currentPlaylistBaseState)

  return (
    <>{JSON.stringify(playlist)}</>
  )
}
