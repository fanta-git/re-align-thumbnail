import { settingFormContentsState, thumbnailSizesState } from "@/stores/playlist";
import { FormContents } from "@/types/form";
import { FieldPath } from "react-hook-form";
import { useRecoilValue } from "recoil";

export default function useSizeFormStep (name: FieldPath<FormContents["size"]>) {
    const { isFixed } = useRecoilValue(settingFormContentsState)
    const { thumbnailHeight, thumbnailWidth } = useRecoilValue(thumbnailSizesState)

    switch (name) {
        case "columns":
            return 1
        case "rows":
            return 1
        case "outputWidth":
            return isFixed ? thumbnailWidth : 10
        case "outputHeight":
            return isFixed ? thumbnailHeight : 10
    }
}
