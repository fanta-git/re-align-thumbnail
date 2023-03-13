import { FormContents, SizeFormItemData } from "@/types/form"

export const sizeFormHeads = ["自動入力", "横", "縦"]
export const sizeFormItemData: SizeFormItemData[] = [{
    label: "グリッド数",
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
    label: "サムネイル",
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
}, {
    label: "出力画像",
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
    label: "数値の自動入力を行わない",
    item: []
}]

export const fieldNames = ["columns", "rows", "width", "height", "outputWidth", "outputHeight"] as const satisfies readonly (keyof FormContents)[]
