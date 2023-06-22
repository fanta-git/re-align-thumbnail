import { sizeFormDefaults } from "@/consts/form";
import { FormContents, ListFormContents, OptionFormContents, SizeFormContents } from "@/types/form";
import { atom, selector } from "recoil";
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

export const formContentsSelector = selector<FormContents>({
    key: RECOIL_KEYS.FORM_CONTENTS,
    get: ({ get }) => ({
        list: get(listFormContentsState),
        size: get(sizeFormContentsState),
        option: get(optionFormContentsState),
    })
})
