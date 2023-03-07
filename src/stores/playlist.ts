import { fetchListData } from "@/foundations/fetchListData";
import { FailedPlaylistContents, PlaylistContents } from "@/types/cafeapi";
import { atom, selector, selectorFamily } from "recoil";
import { RECOIL_KEYS } from "./recoilKey";

export const playlistState = selectorFamily<PlaylistContents | FailedPlaylistContents | undefined, string>({
    key: RECOIL_KEYS.PLAYLIST,
    get: id => async () => {
        if (!id) return
        const response = await fetchListData(id)
        if (response == null) return
        if (response.status < 200 || 300 <= response.status) return
        return response.data
    }
})

export const currentPlaylistIdState = atom<string>({
    key: RECOIL_KEYS.CURRENT_ID,
    default: ''
})

export const currentPlaylistState = selector<PlaylistContents | FailedPlaylistContents | undefined>({
    key: RECOIL_KEYS.CURRENT_PLAYLIST,
    get: ({ get }) => {
        const id = get(currentPlaylistIdState)
        return get(playlistState(id))
    }
})
