import { SizeFormContents, SettingFormContents, ThumbnailSizes } from "@/types/form";

type Result = {
    target: keyof SizeFormContents,
    value: number
}

export default function adjust(changed: keyof SizeFormContents, size: SizeFormContents, thumbnailSizes: ThumbnailSizes): Result {
    switch (changed) {
        case "columns":
            return {
                target: "outputWidth",
                value: Math.round(thumbnailSizes.thumbnailWidth * size.columns)
            }
        case "rows":
            return {
                target: "outputHeight",
                value: Math.round(thumbnailSizes.thumbnailHeight * size.rows)
            }
        case "outputWidth":
            return {
                target: "columns",
                value: Math.round(size.outputWidth / thumbnailSizes.thumbnailWidth)
            }
        case "outputHeight":
            return {
                target: "rows",
                value: Math.round(size.outputHeight / thumbnailSizes.thumbnailHeight)
            }
    }
}
