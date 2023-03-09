import { PlaylistBase } from "@/types/playlist";
import { atom, selector, selectorFamily } from "recoil";
import { RECOIL_KEYS } from "../consts/recoilKey";

export const currentPlaylistBaseState = atom<PlaylistBase | undefined>({
    key: RECOIL_KEYS.CURRENT_ID,
    default: undefined
})
