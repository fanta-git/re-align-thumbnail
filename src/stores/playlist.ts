import { sizeFormDefaults } from "@/consts/form";
import { ListFormContents, OptionFormContents, SizeFormContents } from "@/types/form";
import { Playlist } from "@/types/playlist";
import { atom } from "recoil";
import { RECOIL_KEYS } from "../consts/recoilKey";

export const listFormContentsState = atom<ListFormContents>({
    key: RECOIL_KEYS.LIST_FORM_CONTENTS,
    default: sizeFormDefaults.list
})

export const sizeFormContentsState = atom<SizeFormContents>({
    key: RECOIL_KEYS.SIZE_FORM_CONTENTS,
    default: sizeFormDefaults.size
})

export const optionFormContentsState = atom<OptionFormContents>({
    key: RECOIL_KEYS.OPTION_FORM_CONTENTS,
    default: sizeFormDefaults.option
})

export const playlistContentsState = atom<Playlist | undefined>({
    key: RECOIL_KEYS.PLAYLIST_CONTENTS,
    default: undefined
})
