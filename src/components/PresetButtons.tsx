import { SIZEFORM_PRESETS } from "@/consts/form"
import { settingFormContentsState, sizeFormContentsState } from "@/stores/playlist"
import { FormContents, SizeFormPreset } from "@/types/form"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { startTransition, useCallback } from "react"
import { useFormContext } from "react-hook-form"
import { useSetRecoilState } from "recoil"

export default function PresetButtons () {
  const { setValue, getValues } = useFormContext<FormContents>()
  const setSize = useSetRecoilState(sizeFormContentsState)
  const setSetting = useSetRecoilState(settingFormContentsState)

  const onclickCurry = useCallback((preset: SizeFormPreset) => () => {
    const { size } = preset
    const settings = {
      ...getValues('setting'),
      thumbnailWidth: size.outputWidth / size.columns,
      thumbnailHeight: size.outputHeight / size.rows,
    }

    setValue('size', size)
    setValue('setting', { ...settings })
    setSetting(settings)
    startTransition(() =>
      setSize(size)
    )
  }, [getValues, setSetting, setSize, setValue])

  return (
    <ButtonGroup variant={"outline"} isAttached>
      {SIZEFORM_PRESETS.map((v, i) =>
        <Button key={i} onClick={onclickCurry(v)}>{v.name}</Button>
      )}
    </ButtonGroup>
  )
}
