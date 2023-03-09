import * as fetchListData from "@/foundations/api/fetchPlaylist";
import { Playlist, PlaylistBase } from "@/types/playlist";
import { atom, selector, selectorFamily } from "recoil";
import { RECOIL_KEYS } from "../consts/recoilKey";

export const playlistState = selectorFamily<Playlist | undefined, PlaylistBase | undefined>({
    key: RECOIL_KEYS.PLAYLIST,
    get: base => async () => {
        if (base === undefined) return
        const { type, id } = base
        const playlist = await fetchListData[type](id)
        return playlist
    }
})

export const currentPlaylistBaseState = atom<PlaylistBase | undefined>({
    key: RECOIL_KEYS.CURRENT_ID,
    default: undefined
})

export const currentPlaylistState = selector<Playlist | undefined>({
    key: RECOIL_KEYS.CURRENT_PLAYLIST,
    get: ({ get }) => {
        const base = get(currentPlaylistBaseState)
        return get(playlistState(base))
    }
})
