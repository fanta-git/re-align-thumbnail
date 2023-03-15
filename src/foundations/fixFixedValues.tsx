import { SIZE_FORM_LABELS } from "@/consts/form";
import { SizeFormLabels, SizeFormValues } from "@/types/form";
import { orgCeil, orgFloor } from "@/util/number";

export default {
    [SIZE_FORM_LABELS.GRID]: v => ({
        columns: orgCeil(v.outputWidth / v.width, 0),
        rows: orgCeil(v.outputHeight / v.height, 0)
    }),
    [SIZE_FORM_LABELS.THUMBNAIL]: v => ({
        width: orgCeil(v.outputWidth / v.columns, 2),
        height: orgCeil(v.outputHeight / v.rows, 2)
    }),
    [SIZE_FORM_LABELS.OUTPUT]: v => ({
        outputWidth: orgFloor(v.width * v.columns, 0),
        outputHeight: orgFloor(v.height * v.rows, 0)
    })
} satisfies Record<SizeFormLabels, (v: SizeFormValues) => Partial<SizeFormValues>>
