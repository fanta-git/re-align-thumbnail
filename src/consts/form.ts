import { SizeFormContents, SizeFormItemData } from "@/types/form"

export const sizeFormHeads = ["", "横", "縦"] as const
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
        adjust: { output: "outputWidth", thumbnail: "width" },
        inputProps: {
            min: 1
        }
    }, {
        register: "rows",
        prefix: "行",
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
        adjust: { output: "columns", thumbnail: "width" },
        inputProps: {
            min: 1
        }
    }, {
        register: "outputHeight",
        prefix: "px",
        adjust: { output: "rows", thumbnail: "height" },
        inputProps: {
            min: 1
        }
    }]
}]
export const sizeFormDefaults = {
    columns: 10,
    rows: 10,
    outputWidth: 1600,
    outputHeight: 900,
    width: 160,
    height: 90,
} satisfies SizeFormContents
