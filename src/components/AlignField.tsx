import align from "@/foundations/align";
import { formContentsState } from "@/stores/playlist";
import { Loadable } from "@/util/Loadable";
import { Suspense, useMemo } from "react";
import { useRecoilValue } from "recoil";
import AlignedImage from "./AlignedImage";

export default function AlignField () {
  const formData = useRecoilValue(formContentsState)
  const loadableUrl = useMemo(() => new Loadable(align(formData)), [formData])
  const { outputWidth, outputHeight } = formData

  return (
    <Suspense fallback={<>loading...</>}>
      <AlignedImage loadableUrl={loadableUrl} width={outputWidth} height={outputHeight} />
    </Suspense>
  )
}
