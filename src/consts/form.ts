import { SizeFormContents, SizeFormItemData } from "@/types/form"
import { orgRound } from "@/util/number"

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
        type: SIZE_FORM_TYPE.H,
        defaultValue: 10,
        adjust: { output: "outputWidth", thumbnail: "width" },
        inputProps: {
            min: 1
        }
    }, {
        register: "rows",
        prefix: "行",
        type: SIZE_FORM_TYPE.V,
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
        type: SIZE_FORM_TYPE.H,
        defaultValue: 1600,
        adjust: { output: "columns", thumbnail: "width" },
        inputProps: {
            min: 1
        }
    }, {
        register: "outputHeight",
        prefix: "px",
        type: SIZE_FORM_TYPE.V,
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
        type: SIZE_FORM_TYPE.H,
        defaultValue: 160,
        inputProps: {
            isDisabled: true
        }
    }, {
        register: "height",
        prefix: "px",
        type: SIZE_FORM_TYPE.V,
        defaultValue: 90,
        inputProps: {
            isDisabled: true
        }
    }]
}]
export const sizeFormItems = sizeFormItemData.flatMap(v => v.item)
export const adjusters: Record<keyof SizeFormContents, (values: SizeFormContents) => number> = {
    outputWidth: values => orgRound(values.columns * values.width, 2),
    outputHeight: values => orgRound(values.rows * values.height, 2),
    columns: values => orgRound(values.outputWidth / values.width),
    rows: values => orgRound(values.outputHeight / values.height),
    width: values => orgRound(values.outputWidth / values.columns, 2),
    height: values => orgRound(values.outputHeight / values.rows, 2)
}
