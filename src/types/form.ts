import { SIZE_FORM_LABELS } from "@/consts/form"
import { InputProps } from "@chakra-ui/react"
import { ValuesObj } from "./util"

export type FormContents = {
    url: string,
    columns: string,
    rows: string,
    width: string,
    height: string,
    outputWidth: string,
    outputHeight: string
}

export type SizeFormLabels = ValuesObj<typeof SIZE_FORM_LABELS>

export type SizeFormItemData = {
    label: SizeFormLabels,
    item: {
        register: keyof FormContents,
        prefix: string,
        inputProps: InputProps,
    }[]
}

export type SizeFormValues = Record<keyof FormContents, number>
