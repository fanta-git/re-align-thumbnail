import { SizeFormContents } from "@/types/form";
import { orgCeil, orgFloor } from "@/util/number";

export default {
    columns: v => orgCeil(v.outputWidth / v.width, 0),
    rows: v => orgCeil(v.outputHeight / v.height, 0),
    width: v => orgCeil(v.outputWidth / v.columns, 2),
    height: v => orgCeil(v.outputHeight / v.rows, 2),
    outputWidth: v => orgFloor(v.width * v.columns, 0),
    outputHeight: v => orgFloor(v.height * v.rows, 0)
} satisfies Record<keyof SizeFormContents, (v: SizeFormContents) => number>
