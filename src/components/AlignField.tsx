import align from "@/foundations/align";
import { formContentsSelector } from "@/stores/playlist";
import { Loadable } from "@/util/Loadable";
import { Suspense, useMemo } from "react";
import { useRecoilValue } from "recoil";
import AlignedImage from "./AlignedImage";

export default function AlignField () {
  const formData = useRecoilValue(formContentsSelector)
  const loadableUrl = useMemo(() => new Loadable(align(formData)), [formData])
  const { outputWidth, outputHeight } = formData.size

  return (
    <Suspense fallback={<>loading...</>}>
      <AlignedImage loadableUrl={loadableUrl} width={outputWidth} height={outputHeight} />
    </Suspense>
  )
}
