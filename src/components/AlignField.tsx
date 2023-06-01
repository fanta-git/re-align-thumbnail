import align from "@/foundations/align";
import { useLoadable } from "@/hooks/useLoadable";
import { FormContents } from "@/types/form";
import { Suspense } from "react";
import AlignedImage from "./AlignedImage";

type Props = {
  formData: FormContents
}

export default function AlignField (props: Props) {
  const { formData } = props
  const { outputWidth, outputHeight } = formData
  const loadImageUrl = useLoadable(align(formData))

  return (
    <Suspense fallback={<>loading...</>}>
      <AlignedImage loadImageUrl={loadImageUrl} width={outputWidth} height={outputHeight} />
    </Suspense>
  )
}
