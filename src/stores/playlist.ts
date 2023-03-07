import { fetchListData } from "@/foundations/fetchListData";
import { PlaylistContents } from "@/types/cafeapi";
import { atom, selector } from "recoil";
import { RECOIL_KEYS } from "./recoilKey";

export const playlistIdState = atom<string>({
    key: RECOIL_KEYS.PLAYLIST_ID,
    default: ''
})

export const playlistState = selector<PlaylistContents | undefined>({
    key: RECOIL_KEYS.PLAYLIST,
    get: async ({ get }) => {
        const id = get(playlistIdState)
        if (!id) return
        const playlist = await fetchListData(id)
        return playlist
    }
})
