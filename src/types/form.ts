export type SizeFormContents = {
    columns: number,
    rows: number,
    thumbnailWidth: number,
    thumbnailHeight: number,
    outputWidth: number,
    outputHeight: number
}

export type ListFormContents = {
    url: string
}

export type OptionFormContents = {
    isFixed: boolean
}

export type FormContents = {
    list: ListFormContents,
    size: SizeFormContents,
    option: OptionFormContents
}
