import Forms from "@/components/Forms";
import { playlistState } from "@/stores/playlist";
import { useRecoilValue } from "recoil";

export default function Home() {
  const playlist = useRecoilValue(playlistState)

  return (
    <main>
      <Forms />
      {JSON.stringify(playlist)}
    </main>
  )
}
