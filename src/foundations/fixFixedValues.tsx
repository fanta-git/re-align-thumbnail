import { SizeFormValues } from "@/types/form";
import { orgCeil, orgFloor } from "@/util/number";

export default {
    '0': v => ({
        columns: orgCeil(v.outputWidth / v.width, 0),
        rows: orgCeil(v.outputHeight / v.height, 0)
    }),
    '1': v => ({
        width: orgCeil(v.outputWidth / v.columns, 2),
        height: orgCeil(v.outputHeight / v.rows, 2)
    }),
    '2': v => ({
        outputWidth: orgFloor(v.width * v.columns, 0),
        outputHeight: orgFloor(v.height * v.rows, 0)
    }),
    '3': v => ({})
} satisfies Record<string, (v: SizeFormValues) => Partial<SizeFormValues>>
