import { fetchListData } from "@/foundations/fetchListData";
import { PlaylistContents } from "@/types/cafeapi";
import { atom, selector, selectorFamily } from "recoil";
import { RECOIL_KEYS } from "./recoilKey";

export const playlistState = selectorFamily<PlaylistContents | undefined, string>({
    key: RECOIL_KEYS.PLAYLIST,
    get: id => async () => {
        if (!id) return
        const playlist = await fetchListData(id)
        return playlist
    }
})

export const currentPlaylistIdState = atom<string>({
    key: RECOIL_KEYS.CURRENT_ID,
    default: ''
})

export const currentPlaylistState = selector<PlaylistContents | undefined>({
    key: RECOIL_KEYS.CURRENT_PLAYLIST,
    get: ({ get }) => {
        const id = get(currentPlaylistIdState)
        return get(playlistState(id))
    }
})
