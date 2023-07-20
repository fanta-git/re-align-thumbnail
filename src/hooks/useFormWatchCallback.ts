import adjusters from "@/foundations/adjust";
import getPlaylistBase from "@/foundations/getPlaylistBase";
import { playlistBasesState, settingFormContentsState, sizeFormContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { WatchWithDefault } from "@/types/reactHookForm";
import { Split } from "@/types/util";
import { startTransition, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSetRecoilState } from "recoil";

export default function useWatchCallback(formMethods: UseFormReturn<FormContents, any, undefined>) {
    const { watch, setValue } = formMethods
    const setPlaylistBases = useSetRecoilState(playlistBasesState)
    const setSize = useSetRecoilState(sizeFormContentsState)
    const setSetting = useSetRecoilState(settingFormContentsState)

    type WatchWithDefaultCallback = Parameters<WatchWithDefault<typeof watch>>[0];

    return useCallback<WatchWithDefaultCallback>(async ({ lists, size, setting }, { name, type }) => {
        if (name === undefined) return
        const [group, item] = name.split(".") as Split<typeof name, ".">

        if (group === "lists") {
            setPlaylistBases(v => {
                if (item === undefined) return Array.from({ ...v, length: lists.length })
                const i = Number(item)
                const cuurentBase = getPlaylistBase(lists[i].url)
                if (v[i] !== cuurentBase) return v.with(i, cuurentBase)
                return v
            })
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
    }, [setValue, setSize, setSetting, setPlaylistBases])
}
