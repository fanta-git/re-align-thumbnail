export type SizeFormContents = {
    columns: number,
    rows: number,
    width: number,
    height: number,
    outputWidth: number,
    outputHeight: number
}

export type FormContents = {
    url: string,
    isFixed: boolean
} & SizeFormContents
