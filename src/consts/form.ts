import { SizeFormItemData } from "@/types/form"

export const sizeFormHeads = ["", "横", "縦"] as const
export const SIZE_FORM_TYPE = {
    V: "vertical",
    H: "horizontal"
} as const
export const SIZE_FORM_LABELS = {
    GRID: "グリッド数",
    THUMBNAIL: "サムネイル",
    OUTPUT: "出力画像"
} as const
export const sizeFormItemData: SizeFormItemData[] = [{
    label: SIZE_FORM_LABELS.GRID,
    item: [{
        register: "columns",
        prefix: "列",
        defaultValue: 10,
        adjust: { output: "outputWidth", thumbnail: "width" },
        inputProps: {
            min: 1
        }
    }, {
        register: "rows",
        prefix: "行",
        defaultValue: 10,
        adjust: { output: "outputHeight", thumbnail: "height" },
        inputProps: {
            min: 1
        }
    }]
}, {
    label: SIZE_FORM_LABELS.OUTPUT,
    item: [{
        register: "outputWidth",
        prefix: "px",
        defaultValue: 1600,
        adjust: { output: "columns", thumbnail: "width" },
        inputProps: {
            min: 1
        }
    }, {
        register: "outputHeight",
        prefix: "px",
        defaultValue: 900,
        adjust: { output: "rows", thumbnail: "height" },
        inputProps: {
            min: 1
        }
    }]
}, {
    label: SIZE_FORM_LABELS.THUMBNAIL,
    item: [{
        register: "width",
        prefix: "px",
        defaultValue: 160,
        inputProps: {
            isDisabled: true
        }
    }, {
        register: "height",
        prefix: "px",
        defaultValue: 90,
        inputProps: {
            isDisabled: true
        }
    }]
}]
export const sizeFormItems = sizeFormItemData.flatMap(v => v.item)
