import adjusters from "@/foundations/adjust";
import fetchPlaylistMaster from "@/foundations/fetchPlaylistMaster";
import { optionFormContentsState, playlistContentsState, settingFormContentsState, sizeFormContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { Splited, WatchWithDefault } from "@/types/reactHookForm";
import { startTransition, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSetRecoilState } from "recoil";

export default function useWatchCallback(formMethods: UseFormReturn<FormContents, any, undefined>) {
    const { watch, setValue } = formMethods
    const setPlaylist = useSetRecoilState(playlistContentsState)
    const setSize = useSetRecoilState(sizeFormContentsState)
    const setSetting = useSetRecoilState(settingFormContentsState)
    const setOption = useSetRecoilState(optionFormContentsState)

    type WatchWithDefaultCallback = Parameters<WatchWithDefault<typeof watch>>[0];

    return useCallback<WatchWithDefaultCallback>(async ({ list, size, setting, option }, { name, type }) => {
        if (name === undefined || type !== "change") return
        const [group, item] = name.split(".") as Splited<typeof name>
        if (item === undefined) return

        if (group === "list") {
            const playlist = await fetchPlaylistMaster(list.url)
            if (playlist === undefined) return
            setPlaylist(playlist)
        }

        if (group === "size") {
            if (setting.isFixed) {
                const { target, value } = adjusters(item, size, setting)
                setValue(`size.${target}`, value)
            } else {
                setSetting({
                    ...setting,
                    thumbnailWidth: size.outputWidth / size.columns,
                    thumbnailHeight: size.outputHeight / size.rows,
                })
            }
            startTransition(() =>
                setSize({ ...size })
            )
        }

        if (group === "setting") {
            setSetting({ ...setting })
        }

        // if (group === "option") {
        //     setOption({ ...option })
        // }
    }, [setValue, setSize, setSetting/* , setOption */, setPlaylist])
}
