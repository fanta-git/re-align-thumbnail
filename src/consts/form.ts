import { FormContents, SizeFormPreset } from "@/types/form"

export const formContentsDefaults = {
    list: { urls: "" },
    size: {
        columns: 10,
        rows: 10,
        outputWidth: 1600,
        outputHeight: 900
    },
    setting: {
        thumbnailWidth: 160,
        thumbnailHeight: 90,
        isFixed: true
    },
    option: {
        background: "#000000",
        fileType: "jpeg"
    }
} satisfies FormContents

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
