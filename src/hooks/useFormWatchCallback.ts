import adjusters from "@/foundations/adjust";
import fetchPlaylistMaster from "@/foundations/fetchPlaylistMaster";
import { playlistsContentsState, settingFormContentsState, sizeFormContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { Splited, WatchWithDefault } from "@/types/reactHookForm";
import { startTransition, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSetRecoilState } from "recoil";

export default function useWatchCallback(formMethods: UseFormReturn<FormContents, any, undefined>) {
    const { watch, setValue } = formMethods
    const setPlaylists = useSetRecoilState(playlistsContentsState)
    const setSize = useSetRecoilState(sizeFormContentsState)
    const setSetting = useSetRecoilState(settingFormContentsState)

    type WatchWithDefaultCallback = Parameters<WatchWithDefault<typeof watch>>[0];

    return useCallback<WatchWithDefaultCallback>(async ({ lists, size, setting }, { name, type }) => {
        if (name === undefined) return
        const [group, item] = name.split(".") as Splited<typeof name>

        if (group === "lists") {
            if (item === undefined) {
                setPlaylists(v => v.slice(0, lists.length))
            } else {
                const index = Number(item)
                const playlist = await fetchPlaylistMaster(lists[index].url)
                if (playlist === undefined) return
                setPlaylists(v => {
                    const playlists = [...v]
                    playlists[index] = playlist
                    return playlists
                })
            }
        }

        if (group === "size") {
            if (item === undefined || type !== "change") return
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
    }, [setValue, setSize, setSetting, setPlaylists])
}
