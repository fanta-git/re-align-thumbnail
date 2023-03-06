import { PlaylistContents } from "@/app/types/cafeapi";
import { atom } from "recoil";
import { RECOIL_KEYS } from "./recoilKey";

export const playlistState = atom<PlaylistContents | undefined>({
    key: RECOIL_KEYS.PLAYLIST,
    default: undefined
})
