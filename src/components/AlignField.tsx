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

  const [loadableUrl, setLoadableUrl] = useState<Loadable<string>>(
    () => new Loadable(Promise.resolve(""))
  )

  useEffect(() => (
    setLoadableUrl(new Loadable(align(playlistBases, size, option)))
  ), [playlistBases, size, option])

  return (
    <ErrorBoundary fallbackRender={ErrorFallback} resetKeys={[loadableUrl]}>
      <Suspense fallback={<Loading />} >
        <AlignedImage loadableUrl={loadableUrl} />
      </Suspense>
    </ErrorBoundary>
  )
}
