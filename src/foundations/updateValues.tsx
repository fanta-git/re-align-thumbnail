import { SizeFormContents } from "@/types/form";
import adjusters from "./adjusters";

type WatchTargets = "columns" | "rows" | "outputWidth" | "outputHeight"
const targets = {
  columns: isFixed => isFixed ? "outputWidth" : "thumbnailWidth",
  rows: isFixed => isFixed ? "outputHeight" : "thumbnailHeight",
  outputWidth: isFixed => isFixed ? "columns" : "thumbnailWidth",
  outputHeight: isFixed => isFixed ? "rows" : "thumbnailHeight"
} satisfies Record<WatchTargets, (isFixed: boolean) => keyof SizeFormContents>

export default function updateValues(fields: SizeFormContents, name: keyof SizeFormContents | undefined, isFixed: boolean) {
    if (name === undefined || name === "thumbnailWidth" || name === "thumbnailHeight") return
    const target = targets[name](isFixed)
    const adjusted = adjusters[target](fields)
    if (adjusted === fields[target]) return
    return {
        ...fields,
        [target]: adjusted
    }
}
