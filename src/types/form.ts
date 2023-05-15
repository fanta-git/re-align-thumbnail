export type SizeFormContents = {
    columns: number,
    rows: number,
    thumbnailWidth: number,
    thumbnailHeight: number,
    outputWidth: number,
    outputHeight: number
}

export type FormContents = {
    url: string,
    isFixed: boolean
} & SizeFormContents
