import updateValues from "@/foundations/updateValues";
import { listFormContentsState, optionFormContentsState, playlistContentsState, sizeFormContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { Splited, WatchWithDefault } from "@/types/reactHookForm";
import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import OptionsForm from "./OptionsForm";
import SizeForm from "./SizeForm";
import UrlForm from "./UrlForm";
import fetchPlaylist from "@/foundations/fetchPlaylist";

export default function Forms() {
  const [list, setList] = useRecoilState(listFormContentsState)
  const [size, setSize] = useRecoilState(sizeFormContentsState)
  const [option, setOption] = useRecoilState(optionFormContentsState)
  const setPlaylist = useSetRecoilState(playlistContentsState)

  const formMethods = useForm<FormContents>({ defaultValues: { list, size, option } })
  const { watch, getValues, setValue } = formMethods

  useEffect(() =>
    (watch as WatchWithDefault<typeof watch>)(async (data, { name }) => {
      if (name === undefined) return
      const [group, item] = name.split(".") as Splited<typeof name>
      if (item === undefined) return

      if (group === "list") {
        setList({ ...data.list })
        const playlist = await fetchPlaylist(data.list.url)
        if (playlist === undefined) return
        setPlaylist(playlist)
      }

      if (group === "size") {
        const isFixed = getValues("option.isFixed")
        const updated = updateValues(data.size, item, isFixed)
        if (updated === undefined) {
          setSize({ ...data.size })
        } else {
          setValue("size", updated)
        }
      }

      if (group === "option") {
        setOption({ ...data.option })
      }
    }).unsubscribe
  , [watch, getValues, setValue, setList, setSize, setOption, setPlaylist])

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
