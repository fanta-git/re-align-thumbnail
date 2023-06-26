import align from "@/foundations/align";
import useHold from "@/hooks/useHold";
import { optionFormContentsState, playlistContentsState, sizeFormContentsState } from "@/stores/playlist";
import { Loadable } from "@/util/Loadable";
import { Suspense } from "react";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE as useRecoilValue } from "recoil";
import AlignedImage from "./AlignedImage";

export default function AlignField () {
  const playlist = useRecoilValue(playlistContentsState)
  const size = useRecoilValue(sizeFormContentsState)
  const option = useRecoilValue(optionFormContentsState)

  const loadableUrl = useHold(
    () => playlist && new Loadable(align(playlist, size, option))
  , [playlist, size, option])

  if (loadableUrl === undefined) return <>Error!</>

  return (
    <Suspense fallback={<>loading...</>}>
      <AlignedImage
        loadableUrl={loadableUrl}
        width={size.outputWidth}
        height={size.outputHeight}
      />
    </Suspense>
  )
}
