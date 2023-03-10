import { PlaylistBase } from "@/types/playlist";
import { atom } from "recoil";
import { RECOIL_KEYS } from "../consts/recoilKey";

export const playlistBaseState = atom<PlaylistBase | undefined>({
    key: RECOIL_KEYS.CURRENT_ID,
    default: undefined
})

export const isImageLoadingState = atom<boolean>({
    key: RECOIL_KEYS.IS_IMAGE_LOADED,
    default: false
})
