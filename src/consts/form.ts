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
        type: SIZE_FORM_TYPE.H,
        defaultValue: '10',
        inputProps: {
            type: "number",
            min: 1
        }
    }, {
        register: "rows",
        prefix: "行",
        type: SIZE_FORM_TYPE.V,
        defaultValue: '10',
        inputProps: {
            type: "number",
            min: 1
        }
    }]
}, {
    label: SIZE_FORM_LABELS.OUTPUT,
    item: [{
        register: "outputWidth",
        prefix: "px",
        type: SIZE_FORM_TYPE.H,
        defaultValue: '1600',
        inputProps: {
            type: "number",
            min: 1
        }
    }, {
        register: "outputHeight",
        prefix: "px",
        type: SIZE_FORM_TYPE.V,
        defaultValue: '900',
        inputProps: {
            type: "number",
            min: 1
        }
    }]
}, {
    label: SIZE_FORM_LABELS.THUMBNAIL,
    item: [{
        register: "width",
        prefix: "px",
        type: SIZE_FORM_TYPE.H,
        defaultValue: '160',
        inputProps: {
            type: "number",
            isDisabled: true
        }
    }, {
        register: "height",
        prefix: "px",
        type: SIZE_FORM_TYPE.V,
        defaultValue: '90',
        inputProps: {
            type: "number",
            isDisabled: true
        }
    }]
}]
export const sizeFormItems = sizeFormItemData.flatMap(v => v.item);

