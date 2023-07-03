import align from "@/foundations/align";
import useHold from "@/hooks/useHold";
import { optionFormContentsState, playlistsContentsState, sizeFormContentsState } from "@/stores/playlist";
import { Loadable } from "@/util/Loadable";
import { Suspense } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE as useRecoilValue } from "recoil";
import AlignedImage from "./AlignedImage";

export default function AlignField () {
  const playlists = useRecoilValue(playlistsContentsState)
  const size = useRecoilValue(sizeFormContentsState)
  const option = useRecoilValue(optionFormContentsState)

  const loadableUrl = useHold(
    () => new Loadable(align(playlists, size, option))
  , [playlists, size, option])

  return (
    <Suspense fallback={<>loading...</>}>
      <AlignedImage loadableUrl={loadableUrl} />
    </Suspense>
  )
}
