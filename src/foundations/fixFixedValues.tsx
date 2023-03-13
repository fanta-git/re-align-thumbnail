import { SizeFormValues } from "@/types/form";

export default {
    '0': v => ({
        columns: v.outputWidth / v.width | 0,
        rows: v.outputHeight / v.height | 0
    }),
    '1': v => ({
        width: v.outputWidth / v.columns | 0,
        height: v.outputHeight / v.rows | 0
    }),
    '2': v => ({
        outputWidth: v.width * v.columns | 0,
        outputHeight: v.height * v.rows | 0
    }),
    '3': v => ({})
} satisfies Record<string, (v: SizeFormValues) => Partial<SizeFormValues>>
