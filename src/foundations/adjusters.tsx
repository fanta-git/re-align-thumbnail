import { SizeFormContents } from "@/types/form";

export default {
    columns: v => Math.round(v.outputWidth / v.width),
    rows: v => Math.round(v.outputHeight / v.height),
    width: v => v.outputWidth / v.columns,
    height: v => v.outputHeight / v.rows,
    outputWidth: v => Math.round(v.width * v.columns),
    outputHeight: v => Math.round(v.height * v.rows)
} satisfies Record<keyof SizeFormContents, (v: SizeFormContents) => number>
