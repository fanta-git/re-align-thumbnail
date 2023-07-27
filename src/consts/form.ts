import { FormContents, SizeFormPreset, ThumbnailSizes } from "@/types/form"

export const formContentsDefaults = {
    list: { urls: "" },
    size: {
        columns: 10,
        rows: 10,
        outputWidth: 1600,
        outputHeight: 900
    },
    setting: {
        isFixed: true
    },
    option: {
        background: "#000000",
        fileType: "jpeg"
    }
} satisfies FormContents

export const ThumbnailSizesDefault = {
    thumbnailWidth: formContentsDefaults.size.outputWidth / formContentsDefaults.size.columns,
    thumbnailHeight:  formContentsDefaults.size.outputHeight / formContentsDefaults.size.rows,
} satisfies ThumbnailSizes

export const SIZEFORM_PRESETS = [
    {
        name: "100選",
        size: {
            columns: 10,
            rows: 10,
            outputWidth: 1600,
            outputHeight: 900
        }
    },
    {
        name: "Twitterヘッダー",
        size: {
            columns: 10,
            rows: 10,
            outputWidth: 1500,
            outputHeight: 500
        }
    },
] satisfies SizeFormPreset[]
