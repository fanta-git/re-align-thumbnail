import { FormContents, SizeFormContents } from "@/types/form";
import adjusters from "./adjusters";

type WatchTargets = "columns" | "rows" | "outputWidth" | "outputHeight"
const targets = {
  columns: isFixed => isFixed ? "outputWidth" : "thumbnailWidth",
  rows: isFixed => isFixed ? "outputHeight" : "thumbnailHeight",
  outputWidth: isFixed => isFixed ? "columns" : "thumbnailWidth",
  outputHeight: isFixed => isFixed ? "rows" : "thumbnailHeight"
} satisfies Record<WatchTargets, (isFixed: boolean) => keyof SizeFormContents>

export default function updateValues(fields: FormContents, name: keyof FormContents | undefined) {
    if (name === undefined) return
    if (name === "columns" || name === "rows" || name === "outputWidth" || name === "outputHeight") {
        const target = targets[name](fields.isFixed)
        const adjusted = adjusters[target](fields)
        if (adjusted !== fields[target]) return {
            ...fields,
            [target]: adjusted
        }
    }
    return fields
}
