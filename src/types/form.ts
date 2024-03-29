import { IMAGE_MIMETYPE } from "@/consts/image"
import { Values } from "./util"

export type SizeFormContents = {
    columns: number,
    rows: number,
    outputWidth: number,
    outputHeight: number
}

export type ListFormContents = {
    urls: string
}

export type SettingFormContents = {
    isFixed: boolean
}

export type OptionFormContents = {
    background: string,
    fileType: Values<typeof IMAGE_MIMETYPE>
}

export type FormContents = {
    list: ListFormContents,
    size: SizeFormContents,
    setting: SettingFormContents,
    option: OptionFormContents
}

export type ThumbnailSizes = {
    thumbnailWidth: number,
    thumbnailHeight: number
}

export type SizeFormPreset = {
    name: string,
    size: SizeFormContents
}
