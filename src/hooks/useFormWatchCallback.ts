import adjusters from "@/foundations/adjust";
import fetchPlaylistMaster from "@/foundations/fetchPlaylistMaster";
import matchByChekers from "@/foundations/matchByChekers";
import { playlistBasesState, settingFormContentsState, sizeFormContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { Checker, PlaylistTypes } from "@/types/playlist";
import { WatchWithDefault } from "@/types/reactHookForm";
import { Split } from "@/types/util";
import { zipAll } from "@/util/arrays";
import { startTransition, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSetRecoilState } from "recoil";

export default function useWatchCallback(formMethods: UseFormReturn<FormContents, any, undefined>) {
    const { watch, setValue } = formMethods
    const setPlaylistBases = useSetRecoilState(playlistBasesState)
    const setSize = useSetRecoilState(sizeFormContentsState)
    const setSetting = useSetRecoilState(settingFormContentsState)

    type WatchWithDefaultCallback = Parameters<WatchWithDefault<typeof watch>>[0];

    return useCallback<WatchWithDefaultCallback>(async ({ list, size, setting }, { name, type }) => {
        if (name === undefined) return
        const [group, item] = name.split(".") as Split<typeof name, ".">

        if (group === "list") {
            const bases = matchByChekers(list.urls, PLAYLIST_TYPE_CHECKERS)
                .map(({ type, match: [, id] }) => ({ type, id }))

            setPlaylistBases(v =>
                zipAll(v, bases).every(([a, b]) => a?.type === b?.type && a?.id === b?.id)
                    ? v
                    : bases.map(v => ({ ...v, fetching: fetchPlaylistMaster(v.type, v.id)}))
            )
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

export const PLAYLIST_TYPE_CHECKERS = [
    {
        type: "kiite",
        regexp: /https:\/\/kiite\.jp\/playlist\/(\w{10})/g
    },
    {
        type: "nicovideo",
        regexp: /https:\/\/(?:www\.nicovideo\.jp\/(?:my\/|user\/\d+\/)?|sp\.nicovideo\.jp\/(?:my\/)?)mylist\/(\d+)/g
    },
    {
        type: "youtube",
        regexp: /https:\/\/(?:www\.|m\.)?youtube\.com\/playlist[/?](?:.*&)?list=([-\w]+)/g
    },
    {
        type: "vocadb",
        regexp: /https:\/\/vocadb\.net\/L\/(\d+)/g
    }
] satisfies Checker<PlaylistTypes>[]
