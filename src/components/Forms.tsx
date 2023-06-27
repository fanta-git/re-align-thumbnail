import { sizeFormDefaults } from "@/consts/form";
import fetchPlaylist from "@/foundations/fetchPlaylist";
import updateValues from "@/foundations/updateValues";
import { optionFormContentsState, playlistContentsState, sizeFormContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { Splited, WatchWithDefault } from "@/types/reactHookForm";
import { VStack } from "@chakra-ui/react";
import { startTransition, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import OptionsForm from "./OptionsForm";
import SizeForm from "./SizeForm";
import UrlForm from "./UrlForm";

export default function Forms() {
  const setSize = useSetRecoilState(sizeFormContentsState)
  const setOption = useSetRecoilState(optionFormContentsState)
  const setPlaylist = useSetRecoilState(playlistContentsState)

  const formMethods = useForm<FormContents>({ defaultValues: sizeFormDefaults })
  const { watch, getValues, setValue } = formMethods

  useEffect(() =>
    (watch as WatchWithDefault<typeof watch>)(async (data, { name, type }) => {
      if (name === undefined || type !== 'change') return
      const [group, item] = name.split(".") as Splited<typeof name>
      if (item === undefined) return

      if (group === "list") {
        const playlist = await fetchPlaylist(data.list.url)
        if (playlist === undefined) return
        setPlaylist(playlist)
      }

      if (group === "size") {
        const isFixed = getValues("option.isFixed")
        const updated = updateValues(data.size, item, isFixed)
        if (updated === undefined) return

        const [target, value] = updated
        setValue(`size.${target}`, value)
        startTransition(() => setSize({ ...data.size }))
      }

      if (group === "option") {
        setOption({ ...data.option })
      }
    }).unsubscribe
  , [watch, getValues, setValue, setSize, setOption, setPlaylist])

  return (
    <FormProvider {...formMethods}>
      <form style={{ width: "100%" }}>
        <VStack>
          <UrlForm />
          <SizeForm />
          <OptionsForm />
        </VStack>
      </form>
    </FormProvider>
  )
}
