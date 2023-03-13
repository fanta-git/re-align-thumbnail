import { FormContents } from "@/types/form";
import { atom } from "recoil";
import { RECOIL_KEYS } from "../consts/recoilKey";

export const formContentsState = atom<FormContents | undefined>({
    key: RECOIL_KEYS.FORM_CONTENTS,
    default: undefined
})

export const isImageLoadingState = atom<boolean>({
    key: RECOIL_KEYS.IS_IMAGE_LOADED,
    default: false
})
