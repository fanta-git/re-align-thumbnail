import { SIZE_FORM_LABELS, SIZE_FORM_TYPE } from "@/consts/form"
import { NumberInputProps } from "@chakra-ui/react"
import { ValuesObj } from "./util"

export type FormContents = {
    url: string,
    isFixed: boolean
} & SizeFormContents

export type SizeFormContents = {
    columns: number,
    rows: number,
    width: number,
    height: number,
    outputWidth: number,
    outputHeight: number
}

export type SizeFormLabels = ValuesObj<typeof SIZE_FORM_LABELS>

export type SizeFormType = ValuesObj<typeof SIZE_FORM_TYPE>

export type SizeFormItemData = {
    label: SizeFormLabels,
    item: {
        register: keyof SizeFormContents,
        prefix: string,
        defaultValue: number,
        adjust?: Record<"output" | "thumbnail", keyof SizeFormContents>,
        inputProps: NumberInputProps,
    }[]
}
