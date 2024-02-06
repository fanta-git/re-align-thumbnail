import { ThumbnailSizesDefault, formContentsDefaults } from "@/consts/form";
import { OptionFormContents, SettingFormContents, SizeFormContents, ThumbnailSizes } from "@/types/form";
import { PlaylistBase } from "@/types/playlist";
import { atom } from "recoil";
import { RECOIL_KEYS } from "../consts/recoilKey";

export const playlistBasesState = atom<PlaylistBase[]>({
    key: RECOIL_KEYS.PLAYLIST_BASES,
    default: []
})

export const sizeFormContentsState = atom<SizeFormContents>({
    key: RECOIL_KEYS.SIZE_FORM_CONTENTS,
    default: formContentsDefaults.size
})

export const settingFormContentsState = atom<SettingFormContents>({
    key: RECOIL_KEYS.SETTING_FORM_CONTENTS,
    default: formContentsDefaults.setting
})

export const optionFormContentsState = atom<OptionFormContents>({
    key: RECOIL_KEYS.OPTION_FORM_CONTENTS,
    default: formContentsDefaults.option
})

export const thumbnailSizesState = atom<ThumbnailSizes>({
    key: RECOIL_KEYS.THUMBNAIL_SIZES,
    default: ThumbnailSizesDefault
})

export const alignedImageFileState = atom<File | null>({
    key: RECOIL_KEYS.ALIGNED_IMAGE_FILE,
    default: null
})
