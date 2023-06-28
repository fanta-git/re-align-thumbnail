import { FormContents } from "@/types/form"

export const sizeFormDefaults = {
    list: {
        url: ""
    },
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
    }
} satisfies FormContents
