import { SizeFormContents } from "@/types/form";

export default {
    columns: v => Math.round(v.outputWidth / v.thumbnailWidth),
    rows: v => Math.round(v.outputHeight / v.thumbnailHeight),
    thumbnailWidth: v => v.outputWidth / v.columns,
    thumbnailHeight: v => v.outputHeight / v.rows,
    outputWidth: v => Math.round(v.thumbnailWidth * v.columns),
    outputHeight: v => Math.round(v.thumbnailHeight * v.rows)
} satisfies Record<keyof SizeFormContents, (v: SizeFormContents) => number>
