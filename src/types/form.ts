export type SizeFormContents = {
    columns: number,
    rows: number,
    outputWidth: number,
    outputHeight: number
}

export type ListFormContents = {
    url: string
}

export type SettingFormContents = {
    isFixed: boolean,
    thumbnailWidth: number,
    thumbnailHeight: number
}

export type OptionFormContents = {
}

export type FormContents = {
    list: ListFormContents,
    size: SizeFormContents,
    setting: SettingFormContents,
    option: OptionFormContents
}
