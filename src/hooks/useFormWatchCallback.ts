import fetchPlaylist from "@/foundations/fetchPlaylist";
import updateValues from "@/foundations/updateValues";
import { optionFormContentsState, playlistContentsState, settingFormContentsState, sizeFormContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { Splited, WatchWithDefault } from "@/types/reactHookForm";
import { startTransition, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSetRecoilState } from "recoil";

export default function useWatchCallback(formMethods: UseFormReturn<FormContents, any, undefined>) {
    const { watch, getValues, setValue } = formMethods
    const setPlaylist = useSetRecoilState(playlistContentsState)
    const setSize = useSetRecoilState(sizeFormContentsState)
    const setSetting = useSetRecoilState(settingFormContentsState)
    const setOption = useSetRecoilState(optionFormContentsState)

    type WatchWithDefaultCallback = Parameters<WatchWithDefault<typeof watch>>[0];

    return useCallback<WatchWithDefaultCallback>(async (data, { name, type }) => {
            if (name === undefined || type !== "change") return
            const [group, item] = name.split(".") as Splited<typeof name>
            if (item === undefined) return

            if (group === "list") {
                const playlist = await fetchPlaylist(data.list.url)
                if (playlist === undefined) return
                setPlaylist(playlist)
            }

            if (group === "size") {
                const isFixed = getValues("setting.isFixed")
                const updated = updateValues(data.size, item, isFixed)
                if (updated === undefined) return

                const [target, value] = updated
                setValue(`size.${target}`, value)
                startTransition(() =>
                    setSize({ ...data.size }
                ))
            }

            if (group === "setting") {
                setSetting({ ...data.setting })
            }

            // if (group === "option") {
            //     setOption({ ...data.option })
            // }
        }
    , [getValues, setValue, setSize, setSetting/* , setOption */, setPlaylist])
}
