import { InputProps } from "@chakra-ui/react"

export type FormContents = {
    url: string,
    columns: string,
    rows: string,
    width: string,
    height: string,
    outputWidth: string,
    outputHeight: string
}

export type SizeFormItemData = {
    label: string,
    item: {
        register: keyof FormContents,
        prefix: string,
        inputProps: InputProps,
    }[]
}
