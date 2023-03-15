import { SizeFormItemData } from "@/types/form"

export const sizeFormHeads = ["自動入力", "横", "縦"] as const
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
        inputProps: {
            type: "number",
            defaultValue: 10,
            min: 1
        }
    }, {
        register: "rows",
        prefix: "行",
        inputProps: {
            type: "number",
            defaultValue: 10,
            min: 1
        }
    }]
}, {
    label: SIZE_FORM_LABELS.OUTPUT,
    item: [{
        register: "outputWidth",
        prefix: "px",
        inputProps: {
            type: "number",
            defaultValue: 1600,
            min: 1
        }
    }, {
        register: "outputHeight",
        prefix: "px",
        inputProps: {
            type: "number",
            defaultValue: 900,
            min: 1
        }
    }]
}, {
    label: SIZE_FORM_LABELS.THUMBNAIL,
    item: [{
        register: "width",
        prefix: "px",
        inputProps: {
            type: "number",
            defaultValue: 160,
            min: 1
        }
    }, {
        register: "height",
        prefix: "px",
        inputProps: {
            type: "number",
            defaultValue: 90,
            min: 1
        }
    }]
}]
