import { SIZE_FORM_TYPE, SIZE_FORM_LABELS } from "@/consts/form"
import { InputProps } from "@chakra-ui/react"
import { ValuesObj } from "./util"

export type FormContents = {
    url: string
} & SizeFormContents

export type SizeFormContents = {
    columns: string,
    rows: string,
    width: string,
    height: string,
    outputWidth: string,
    outputHeight: string
}

export type SizeFormLabels = ValuesObj<typeof SIZE_FORM_LABELS>

export type SizeFormType = ValuesObj<typeof SIZE_FORM_TYPE>

export type SizeFormItemData = {
    label: SizeFormLabels,
    item: {
        type: SizeFormType,
        register: keyof SizeFormContents,
        prefix: string,
        defaultValue: string,
        inputProps: InputProps,
    }[]
}
