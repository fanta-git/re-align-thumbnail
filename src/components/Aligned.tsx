import { playlistState } from "@/stores/playlist"
import { useRecoilValue } from "recoil"

export default function Aligned() {
  const playlist = useRecoilValue(playlistState)

  return (
    <>{JSON.stringify(playlist)}</>
  )
}
