import { SIZEFORM_PRESETS } from "@/consts/form"
import { sizeFormContentsState, thumbnailSizesState } from "@/stores/playlist"
import { FormContents, SizeFormPreset } from "@/types/form"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { startTransition, useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { useSetRecoilState } from "recoil"

export default function PresetButtons () {
  const { setValue } = useFormContext<FormContents>()
  const setSize = useSetRecoilState(sizeFormContentsState)
  const setThumbnailSizes = useSetRecoilState(thumbnailSizesState)

  const onclickCurry = useCallback((preset: SizeFormPreset) => () => {
    const { size } = preset
    const thumbnailSizes = {
      thumbnailWidth: size.outputWidth / size.columns,
      thumbnailHeight: size.outputHeight / size.rows,
    }

    setValue('size', size)
    setThumbnailSizes(thumbnailSizes)
    startTransition(() =>
      setSize(size)
    )
  }, [setThumbnailSizes, setSize, setValue])

  return (
    <ButtonGroup variant={"outline"} isAttached>
      {SIZEFORM_PRESETS.map((v, i) =>
        <Button key={i} onClick={onclickCurry(v)}>{v.name}</Button>
      )}
    </ButtonGroup>
  )
}
