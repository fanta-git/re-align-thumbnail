import align from "@/foundations/align";
import useHold from "@/hooks/useHold";
import { optionFormContentsState, playlistBasesState, sizeFormContentsState } from "@/stores/playlist";
import { Loadable } from "@/util/Loadable";
import { Suspense } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE as useRecoilValue } from "recoil";
import AlignedImage from "./AlignedImage";

export default function AlignField () {
  const playlistBases = useRecoilValue(playlistBasesState)
  const size = useRecoilValue(sizeFormContentsState)
  const option = useRecoilValue(optionFormContentsState)

  const loadableUrl = useHold(
    () => new Loadable(align(playlistBases, size, option))
  , [playlistBases, size, option])

  return (
    <Suspense fallback={<>loading...</>}>
      <AlignedImage loadableUrl={loadableUrl} />
    </Suspense>
  )
}
