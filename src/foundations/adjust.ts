import { SizeFormContents, SettingFormContents } from "@/types/form";

type Result = {
    target: keyof SizeFormContents,
    value: number
}

export default function adjust(changed: keyof SizeFormContents, size: SizeFormContents, setting: SettingFormContents): Result {
    switch (changed) {
        case "columns":
            return {
                target: "outputWidth",
                value: Math.round(setting.thumbnailWidth * size.columns)
            }
        case "rows":
            return {
                target: "outputHeight",
                value: Math.round(setting.thumbnailHeight * size.rows)
            }
        case "outputWidth":
            return {
                target: "columns",
                value: Math.round(size.outputWidth / setting.thumbnailWidth)
            }
        case "outputHeight":
            return {
                target: "rows",
                value: Math.round(size.outputHeight / setting.thumbnailHeight)
            }
    }
}
