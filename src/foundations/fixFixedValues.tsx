import { SizeFormContents } from "@/types/form";
import { orgCeil, orgFloor } from "@/util/number";

export default {
    columns: v => String(orgCeil(Number(v.outputWidth) / Number(v.width), 0)),
    rows: v => String(orgCeil(Number(v.outputHeight) / Number(v.height), 0)),
    width: v => String(orgCeil(Number(v.outputWidth) / Number(v.columns), 2)),
    height: v => String(orgCeil(Number(v.outputHeight) / Number(v.rows), 2)),
    outputWidth: v => String(orgFloor(Number(v.width) * Number(v.columns), 0)),
    outputHeight: v => String(orgFloor(Number(v.height) * Number(v.rows), 0))
} satisfies Record<keyof SizeFormContents, (v: SizeFormContents) => string>
