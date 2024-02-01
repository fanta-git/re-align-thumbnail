import align from "@/foundations/align";
import { optionFormContentsState, playlistBasesState, sizeFormContentsState } from "@/stores/playlist";
import { Loadable } from "@/util/Loadable";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE as useRecoilValue } from "recoil";
import AlignedImage from "./AlignedImage";
import ErrorFallback from "./ErrorFallback";
import Loading from "./Loading";

export default function AlignField () {
  const playlistBases = useRecoilValue(playlistBasesState)
  const size = useRecoilValue(sizeFormContentsState)
  const option = useRecoilValue(optionFormContentsState)

  const [loadableFile, setLoadableFile] = useState<Loadable<File | null>>(
    () => new Loadable(Promise.resolve(null))
  )

  useEffect(() => (
    setLoadableFile(new Loadable(align(playlistBases, size, option)))
  ), [playlistBases, size, option])

  return (
    <ErrorBoundary fallbackRender={ErrorFallback} resetKeys={[loadableFile]}>
      <Suspense fallback={<Loading />} >
        <AlignedImage loadableFile={loadableFile} />
      </Suspense>
    </ErrorBoundary>
  )
}
