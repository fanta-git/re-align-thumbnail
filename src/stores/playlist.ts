import { sizeFormDefaults } from "@/consts/form";
import { FormContents } from "@/types/form";
import { atom } from "recoil";
import { RECOIL_KEYS } from "../consts/recoilKey";

export const formContentsState = atom<FormContents>({
    key: RECOIL_KEYS.FORM_CONTENTS,
    default: sizeFormDefaults
})

