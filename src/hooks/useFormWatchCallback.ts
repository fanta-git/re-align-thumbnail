import { PLAYLIST_TYPE_CHECKERS } from "@/consts/playlist";
import adjusters from "@/foundations/adjust";
import matchByChekers from "@/foundations/matchByChekers";
import { playlistBasesState, settingFormContentsState, sizeFormContentsState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { PlaylistBase } from "@/types/playlist";
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
                .map(({ type, match: [, id] }): PlaylistBase => ({ type, id }))

            setPlaylistBases(v =>
                zipAll(v, bases).every(([a, b]) => a?.type === b?.type && a?.id === b?.id)
                    ? v
                    : bases
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
