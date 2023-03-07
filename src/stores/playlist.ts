import * as fetchListData from "@/foundations/fetchListData";
import { FailedPlaylistContents, PlaylistContents } from "@/types/cafeapi";
import { PlaylistBase } from "@/types/playlist";
import { atom, selector, selectorFamily } from "recoil";
import { RECOIL_KEYS } from "../consts/recoilKey";

export const playlistState = selectorFamily<PlaylistContents | FailedPlaylistContents | undefined, PlaylistBase | undefined>({
    key: RECOIL_KEYS.PLAYLIST,
    get: base => async () => {
        if (base === undefined) return
        const { type, id } = base
        const response = await fetchListData[type](id)
        if (response == null) return
        if (response.status < 200 || 300 <= response.status) return
        return response.data
    }
})

export const currentPlaylistBaseState = atom<PlaylistBase | undefined>({
    key: RECOIL_KEYS.CURRENT_ID,
    default: undefined
})

export const currentPlaylistState = selector<PlaylistContents | FailedPlaylistContents | undefined>({
    key: RECOIL_KEYS.CURRENT_PLAYLIST,
    get: ({ get }) => {
        const base = get(currentPlaylistBaseState)
        return get(playlistState(base))
    }
})
