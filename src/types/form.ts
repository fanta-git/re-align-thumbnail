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

export type SettingFormContents = {
    isFixed: boolean
}

export type OptionFormContents = {
}

export type FormContents = {
    list: ListFormContents,
    size: SizeFormContents,
    setting: SettingFormContents,
    option: OptionFormContents
}
